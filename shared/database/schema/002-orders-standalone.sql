-- ============================================================================
-- GUDBRO Orders Schema (Standalone - No Dependencies)
-- Run this directly in Supabase SQL Editor
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ORDERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Merchant ID (optional for now - we'll use a default)
  merchant_id UUID DEFAULT '00000000-0000-0000-0000-000000000001',

  -- Order Number (human-readable, daily reset)
  order_number INTEGER NOT NULL DEFAULT 1,
  order_code VARCHAR(10) NOT NULL DEFAULT 'A-001',

  -- Customer Info (anonymous - no account required)
  customer_name VARCHAR(100),
  customer_phone VARCHAR(50),
  customer_email VARCHAR(255),

  -- Table/Service Context
  table_number VARCHAR(20),
  consumption_type VARCHAR(20) DEFAULT 'dine-in' CHECK (consumption_type IN ('dine-in', 'takeaway')),
  service_type VARCHAR(20) DEFAULT 'table-service' CHECK (service_type IN ('table-service', 'counter-pickup', 'takeaway')),

  -- Order Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'delivered',
    'cancelled'
  )),

  -- Timing
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  preparing_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,

  -- Pricing
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  discount_amount DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'VND',

  -- Payment
  payment_status VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  payment_method VARCHAR(50),

  -- Notes
  customer_notes TEXT,
  kitchen_notes TEXT,

  -- Session tracking
  session_id VARCHAR(100),
  device_fingerprint VARCHAR(255),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_submitted ON orders(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(session_id) WHERE session_id IS NOT NULL;

-- ============================================================================
-- ORDER ITEMS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  -- Menu item reference (optional)
  menu_item_id UUID,

  -- Snapshot of item at order time
  item_name JSONB NOT NULL DEFAULT '{"en": "Item"}',
  item_slug VARCHAR(100),
  item_image_url TEXT,

  -- Pricing
  unit_price DECIMAL(12,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,

  -- Extras
  extras JSONB DEFAULT '[]',
  extras_total DECIMAL(12,2) DEFAULT 0,

  -- Notes
  special_instructions TEXT,

  -- Line total
  line_total DECIMAL(12,2) NOT NULL,

  -- Status
  item_status VARCHAR(20) DEFAULT 'pending' CHECK (item_status IN (
    'pending',
    'preparing',
    'ready',
    'served'
  )),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ============================================================================
-- ORDER STATUS HISTORY
-- ============================================================================

CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  from_status VARCHAR(20),
  to_status VARCHAR(20) NOT NULL,
  changed_by UUID,
  changed_by_name VARCHAR(100),
  notes TEXT,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_status_history_order ON order_status_history(order_id);

-- ============================================================================
-- FUNCTIONS: Auto-generate order number
-- ============================================================================

CREATE OR REPLACE FUNCTION generate_order_number_standalone()
RETURNS INTEGER AS $$
DECLARE
  v_next_number INTEGER;
BEGIN
  SELECT COALESCE(MAX(order_number), 0) + 1 INTO v_next_number
  FROM orders
  WHERE DATE(submitted_at) = CURRENT_DATE;

  RETURN v_next_number;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_order_code_standalone(p_order_number INTEGER)
RETURNS VARCHAR(10) AS $$
DECLARE
  v_letter CHAR(1);
  v_group INTEGER;
BEGIN
  v_group := (p_order_number - 1) / 100;
  v_letter := CHR(65 + (v_group % 6));
  RETURN v_letter || '-' || LPAD((((p_order_number - 1) % 100) + 1)::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger function
CREATE OR REPLACE FUNCTION trigger_set_order_number_standalone()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = 1 THEN
    NEW.order_number := generate_order_number_standalone();
  END IF;

  IF NEW.order_code IS NULL OR NEW.order_code = 'A-001' THEN
    NEW.order_code := generate_order_code_standalone(NEW.order_number);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists, then create
DROP TRIGGER IF EXISTS auto_set_order_number_standalone ON orders;
CREATE TRIGGER auto_set_order_number_standalone
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_set_order_number_standalone();

-- ============================================================================
-- FUNCTIONS: Status timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION trigger_order_status_timestamps_standalone()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    CASE NEW.status
      WHEN 'confirmed' THEN NEW.confirmed_at := NOW();
      WHEN 'preparing' THEN NEW.preparing_at := NOW();
      WHEN 'ready' THEN NEW.ready_at := NOW();
      WHEN 'delivered' THEN NEW.delivered_at := NOW();
      WHEN 'cancelled' THEN NEW.cancelled_at := NOW();
      ELSE NULL;
    END CASE;

    NEW.updated_at := NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auto_order_status_timestamps_standalone ON orders;
CREATE TRIGGER auto_order_status_timestamps_standalone
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_order_status_timestamps_standalone();

-- ============================================================================
-- FUNCTIONS: Log status changes
-- ============================================================================

CREATE OR REPLACE FUNCTION trigger_log_order_status_standalone()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO order_status_history (order_id, from_status, to_status)
    VALUES (NEW.id, OLD.status, NEW.status);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auto_log_order_status_standalone ON orders;
CREATE TRIGGER auto_log_order_status_standalone
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_log_order_status_standalone();

-- ============================================================================
-- ENABLE REALTIME (for live order updates)
-- ============================================================================

-- Enable realtime for orders table
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- ============================================================================
-- DISABLE RLS for development (enable in production)
-- ============================================================================

ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history DISABLE ROW LEVEL SECURITY;

-- Grant access to anon role
GRANT ALL ON orders TO anon;
GRANT ALL ON order_items TO anon;
GRANT ALL ON order_status_history TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;

-- ============================================================================
-- TEST: Insert a test order
-- ============================================================================

-- INSERT INTO orders (customer_name, table_number, total)
-- VALUES ('Test Customer', '5', 150000);
--
-- Check: SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;
