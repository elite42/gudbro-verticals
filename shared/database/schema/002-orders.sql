-- ============================================================================
-- GUDBRO Orders Management Schema
-- PostgreSQL (Compatible with Supabase, Cloud SQL, self-hosted)
--
-- This schema handles customer orders from PWA:
-- Orders → Order Items → Status Updates → Kitchen Display
--
-- Requires: 001-menu-management.sql
-- ============================================================================

-- ============================================================================
-- ORDERS (Customer orders from PWA)
-- ============================================================================

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Order Number (human-readable, daily reset)
  order_number INTEGER NOT NULL,
  order_code VARCHAR(10) NOT NULL, -- e.g., "A-042" for display

  -- Customer Info (anonymous - no account required)
  customer_name VARCHAR(100),
  customer_phone VARCHAR(50),
  customer_email VARCHAR(255),

  -- Table/Service Context
  table_number VARCHAR(20),
  consumption_type VARCHAR(20) DEFAULT 'dine-in' CHECK (consumption_type IN ('dine-in', 'takeaway')),
  service_type VARCHAR(20) DEFAULT 'table-service' CHECK (service_type IN ('table-service', 'counter-pickup', 'takeaway')),

  -- Order Status Flow: pending → confirmed → preparing → ready → delivered/cancelled
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending',      -- Just submitted, waiting for confirmation
    'confirmed',    -- Accepted by staff
    'preparing',    -- Kitchen is working on it
    'ready',        -- Ready for pickup/delivery
    'delivered',    -- Completed
    'cancelled'     -- Cancelled by staff or customer
  )),

  -- Timing
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  preparing_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,

  -- Estimated time (in minutes, set by kitchen)
  estimated_prep_time INTEGER,

  -- Pricing
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  discount_amount DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'VND',

  -- Payment
  payment_status VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  payment_method VARCHAR(50), -- 'cash', 'card', 'momo', 'zalopay', etc.
  payment_reference VARCHAR(255), -- External payment ID

  -- Notes
  customer_notes TEXT,
  kitchen_notes TEXT,
  cancellation_reason TEXT,

  -- Session tracking (for anonymous users)
  session_id VARCHAR(100),
  device_fingerprint VARCHAR(255),

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_orders_merchant ON orders(merchant_id);
CREATE INDEX idx_orders_status ON orders(merchant_id, status);
CREATE INDEX idx_orders_submitted ON orders(merchant_id, submitted_at DESC);
CREATE INDEX idx_orders_table ON orders(merchant_id, table_number) WHERE table_number IS NOT NULL;
CREATE INDEX idx_orders_today ON orders(merchant_id, submitted_at)
  WHERE submitted_at >= CURRENT_DATE;

-- Unique constraint for order_number per merchant per day
CREATE UNIQUE INDEX idx_orders_daily_number ON orders(
  merchant_id,
  DATE(submitted_at),
  order_number
);

-- ============================================================================
-- ORDER ITEMS (Line items in an order)
-- ============================================================================

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  -- Menu item reference (nullable - item might be deleted later)
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,

  -- Snapshot of item at time of order (prices/names can change)
  item_name JSONB NOT NULL, -- {"en": "Espresso", "vi": "Cà phê Espresso"}
  item_slug VARCHAR(100),
  item_image_url TEXT,

  -- Pricing (snapshot at order time)
  unit_price DECIMAL(12,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,

  -- Extras/customizations selected
  extras JSONB DEFAULT '[]', -- [{id, name, price}]
  extras_total DECIMAL(12,2) DEFAULT 0,

  -- Customization notes
  special_instructions TEXT,

  -- Line total
  line_total DECIMAL(12,2) NOT NULL,

  -- Status (for kitchen - can be prepared independently)
  item_status VARCHAR(20) DEFAULT 'pending' CHECK (item_status IN (
    'pending',
    'preparing',
    'ready',
    'served'
  )),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_menu_item ON order_items(menu_item_id);

-- ============================================================================
-- ORDER STATUS HISTORY (Audit trail)
-- ============================================================================

CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  -- Status change
  from_status VARCHAR(20),
  to_status VARCHAR(20) NOT NULL,

  -- Who made the change
  changed_by UUID REFERENCES merchant_users(id) ON DELETE SET NULL,
  changed_by_name VARCHAR(100),

  -- Notes
  notes TEXT,

  -- Timestamp
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_status_history_order ON order_status_history(order_id);

-- ============================================================================
-- FUNCTIONS: Auto-generate order number
-- ============================================================================

CREATE OR REPLACE FUNCTION generate_order_number(p_merchant_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_next_number INTEGER;
BEGIN
  -- Get next order number for this merchant today
  SELECT COALESCE(MAX(order_number), 0) + 1 INTO v_next_number
  FROM orders
  WHERE merchant_id = p_merchant_id
    AND DATE(submitted_at) = CURRENT_DATE;

  RETURN v_next_number;
END;
$$ LANGUAGE plpgsql;

-- Function to generate order code (A-001, B-042, etc.)
CREATE OR REPLACE FUNCTION generate_order_code(p_order_number INTEGER)
RETURNS VARCHAR(10) AS $$
DECLARE
  v_letter CHAR(1);
  v_group INTEGER;
BEGIN
  -- Letters cycle: A, B, C, D, E, F (every 100 orders)
  v_group := (p_order_number - 1) / 100;
  v_letter := CHR(65 + (v_group % 6)); -- A=65 in ASCII

  RETURN v_letter || '-' || LPAD((((p_order_number - 1) % 100) + 1)::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-set order_number and order_code
CREATE OR REPLACE FUNCTION trigger_set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number(NEW.merchant_id);
  END IF;

  IF NEW.order_code IS NULL THEN
    NEW.order_code := generate_order_code(NEW.order_number);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_set_order_number();

-- ============================================================================
-- FUNCTIONS: Update order totals from items
-- ============================================================================

CREATE OR REPLACE FUNCTION compute_order_totals(p_order_id UUID)
RETURNS VOID AS $$
DECLARE
  v_subtotal DECIMAL(12,2);
BEGIN
  -- Sum all line totals
  SELECT COALESCE(SUM(line_total), 0) INTO v_subtotal
  FROM order_items
  WHERE order_id = p_order_id;

  -- Update order (tax calculation can be customized per merchant)
  UPDATE orders SET
    subtotal = v_subtotal,
    total = v_subtotal - COALESCE(discount_amount, 0) + COALESCE(tax_amount, 0),
    updated_at = NOW()
  WHERE id = p_order_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to recompute totals when items change
CREATE OR REPLACE FUNCTION trigger_compute_order_totals()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM compute_order_totals(OLD.order_id);
    RETURN OLD;
  ELSE
    PERFORM compute_order_totals(NEW.order_id);
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_compute_order_totals
  AFTER INSERT OR UPDATE OR DELETE ON order_items
  FOR EACH ROW EXECUTE FUNCTION trigger_compute_order_totals();

-- ============================================================================
-- FUNCTIONS: Status change timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION trigger_order_status_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  -- Set timestamp based on new status
  IF NEW.status != OLD.status THEN
    CASE NEW.status
      WHEN 'confirmed' THEN NEW.confirmed_at := NOW();
      WHEN 'preparing' THEN NEW.preparing_at := NOW();
      WHEN 'ready' THEN NEW.ready_at := NOW();
      WHEN 'delivered' THEN NEW.delivered_at := NOW();
      WHEN 'cancelled' THEN NEW.cancelled_at := NOW();
      ELSE NULL;
    END CASE;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_order_status_timestamps
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_order_status_timestamps();

-- ============================================================================
-- FUNCTIONS: Log status changes
-- ============================================================================

CREATE OR REPLACE FUNCTION trigger_log_order_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    INSERT INTO order_status_history (order_id, from_status, to_status)
    VALUES (NEW.id, OLD.status, NEW.status);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_log_order_status
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_log_order_status();

-- ============================================================================
-- VIEWS: Orders with items count
-- ============================================================================

CREATE OR REPLACE VIEW v_orders_summary AS
SELECT
  o.*,
  m.name AS merchant_name,
  m.slug AS merchant_slug,
  (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) AS items_count,
  (SELECT SUM(quantity) FROM order_items WHERE order_id = o.id) AS total_quantity,
  EXTRACT(EPOCH FROM (
    CASE
      WHEN o.status = 'delivered' THEN o.delivered_at
      WHEN o.status = 'cancelled' THEN o.cancelled_at
      ELSE NOW()
    END - o.submitted_at
  )) / 60 AS elapsed_minutes
FROM orders o
JOIN merchants m ON m.id = o.merchant_id;

-- ============================================================================
-- RLS POLICIES (For Supabase)
-- ============================================================================

-- Enable RLS
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

-- Example policies:
-- CREATE POLICY "Staff can view own merchant orders" ON orders
--   FOR SELECT USING (merchant_id IN (
--     SELECT merchant_id FROM merchant_users WHERE auth_provider_id = auth.uid()
--   ));

-- CREATE POLICY "Customers can view own orders" ON orders
--   FOR SELECT USING (session_id = current_setting('app.session_id', true));

-- ============================================================================
-- SUPABASE REALTIME (Enable for live updates)
-- ============================================================================

-- Run this in Supabase SQL Editor to enable realtime:
-- ALTER PUBLICATION supabase_realtime ADD TABLE orders;
-- ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
