-- =============================================
-- 074-order-item-timing-analytics.sql
-- Order Item Timing Analytics System
-- =============================================
-- Phase 1: Data Collection
-- - order_item_status_history table for tracking item status changes
-- - New columns on order_items for timestamps and station
-- - Trigger for auto-logging status changes
-- =============================================

-- =============================================
-- 1. ADD COLUMNS TO ORDER_ITEMS
-- =============================================

-- Add timing columns to order_items
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS preparing_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS ready_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS served_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS station VARCHAR(20);

-- Add index for station-based queries
CREATE INDEX IF NOT EXISTS idx_order_items_station
  ON order_items (station)
  WHERE station IS NOT NULL;

-- Add index for timing queries
CREATE INDEX IF NOT EXISTS idx_order_items_preparing_at
  ON order_items (preparing_at DESC)
  WHERE preparing_at IS NOT NULL;

COMMENT ON COLUMN order_items.preparing_at IS 'Timestamp when item started preparation';
COMMENT ON COLUMN order_items.ready_at IS 'Timestamp when item was marked ready';
COMMENT ON COLUMN order_items.served_at IS 'Timestamp when item was served to customer';
COMMENT ON COLUMN order_items.station IS 'Station that prepared the item (kitchen, bar, other)';

-- =============================================
-- 2. CREATE ORDER_ITEM_STATUS_HISTORY TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS order_item_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  -- Status change
  from_status VARCHAR(20),
  to_status VARCHAR(20) NOT NULL,

  -- Station (kitchen/bar/other)
  station VARCHAR(20),

  -- Who changed (optional, for staff attribution)
  changed_by UUID,
  changed_by_name VARCHAR(100),

  -- Timing
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  duration_from_previous_seconds INTEGER,

  -- Denormalized for fast analytics (avoids joins)
  merchant_id UUID NOT NULL,
  item_name JSONB,
  menu_item_id UUID,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. INDEXES FOR PERFORMANCE
-- =============================================

-- Primary lookup by order_item
CREATE INDEX idx_item_status_history_order_item
  ON order_item_status_history (order_item_id, changed_at DESC);

-- For analytics queries by merchant and date
CREATE INDEX idx_item_status_history_merchant_date
  ON order_item_status_history (merchant_id, changed_at DESC);

-- For station-based analytics
CREATE INDEX idx_item_status_history_station
  ON order_item_status_history (merchant_id, station, changed_at DESC)
  WHERE station IS NOT NULL;

-- For prep time analytics (preparing -> ready transitions)
CREATE INDEX idx_item_status_history_prep_complete
  ON order_item_status_history (merchant_id, changed_at DESC)
  WHERE from_status = 'preparing' AND to_status = 'ready';

-- For order-level queries
CREATE INDEX idx_item_status_history_order
  ON order_item_status_history (order_id, changed_at DESC);

COMMENT ON TABLE order_item_status_history IS 'Audit trail for order item status changes, used for prep time analytics';

-- =============================================
-- 4. TRIGGER FUNCTION: Auto-log item status changes
-- =============================================

CREATE OR REPLACE FUNCTION trigger_log_order_item_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_order_record RECORD;
  v_previous_timestamp TIMESTAMPTZ;
  v_duration_seconds INTEGER;
BEGIN
  -- Only log if status actually changed
  IF NEW.item_status IS DISTINCT FROM OLD.item_status THEN

    -- Get order info for denormalization
    SELECT id, merchant_id INTO v_order_record
    FROM orders
    WHERE id = NEW.order_id;

    -- Calculate duration from previous status change
    SELECT changed_at INTO v_previous_timestamp
    FROM order_item_status_history
    WHERE order_item_id = NEW.id
    ORDER BY changed_at DESC
    LIMIT 1;

    IF v_previous_timestamp IS NOT NULL THEN
      v_duration_seconds := EXTRACT(EPOCH FROM (NOW() - v_previous_timestamp))::INTEGER;
    END IF;

    -- Insert history record
    INSERT INTO order_item_status_history (
      order_item_id,
      order_id,
      from_status,
      to_status,
      station,
      changed_at,
      duration_from_previous_seconds,
      merchant_id,
      item_name,
      menu_item_id
    ) VALUES (
      NEW.id,
      NEW.order_id,
      OLD.item_status,
      NEW.item_status,
      NEW.station,
      NOW(),
      v_duration_seconds,
      v_order_record.merchant_id,
      NEW.item_name,
      NEW.menu_item_id
    );

    -- Auto-set timestamps based on new status
    CASE NEW.item_status
      WHEN 'preparing' THEN
        NEW.preparing_at := COALESCE(NEW.preparing_at, NOW());
      WHEN 'ready' THEN
        NEW.ready_at := COALESCE(NEW.ready_at, NOW());
      WHEN 'served' THEN
        NEW.served_at := COALESCE(NEW.served_at, NOW());
      ELSE NULL;
    END CASE;
  END IF;

  RETURN NEW;
END;
$$;

-- =============================================
-- 5. ATTACH TRIGGER TO ORDER_ITEMS
-- =============================================

-- Drop existing trigger if any
DROP TRIGGER IF EXISTS trg_log_order_item_status ON order_items;

-- Create trigger
CREATE TRIGGER trg_log_order_item_status
  BEFORE UPDATE ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION trigger_log_order_item_status();

-- =============================================
-- 6. ENABLE RLS ON NEW TABLE
-- =============================================

ALTER TABLE order_item_status_history ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY "service_role_item_status_history"
  ON order_item_status_history FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Merchants can read their own data
CREATE POLICY "merchants_read_own_item_status_history"
  ON order_item_status_history FOR SELECT
  USING (
    merchant_id IN (
      SELECT tenant_id FROM account_roles
      WHERE account_id = auth.uid()
      AND tenant_type = 'merchant'
      AND role_type IN ('owner', 'manager', 'staff')
    )
  );

-- Anyone can insert (for PWA/displays without auth)
CREATE POLICY "anyone_insert_item_status_history"
  ON order_item_status_history FOR INSERT
  WITH CHECK (true);

-- =============================================
-- 7. HELPER FUNCTION: Get item prep time
-- =============================================

CREATE OR REPLACE FUNCTION get_item_prep_time_seconds(p_order_item_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_preparing_at TIMESTAMPTZ;
  v_ready_at TIMESTAMPTZ;
BEGIN
  SELECT preparing_at, ready_at
  INTO v_preparing_at, v_ready_at
  FROM order_items
  WHERE id = p_order_item_id;

  IF v_preparing_at IS NULL OR v_ready_at IS NULL THEN
    RETURN NULL;
  END IF;

  RETURN EXTRACT(EPOCH FROM (v_ready_at - v_preparing_at))::INTEGER;
END;
$$;

COMMENT ON FUNCTION get_item_prep_time_seconds IS 'Returns prep time in seconds for a specific order item';

-- =============================================
-- 8. HELPER FUNCTION: Update item status with station
-- =============================================

CREATE OR REPLACE FUNCTION update_order_item_status(
  p_item_id UUID,
  p_new_status VARCHAR(20),
  p_station VARCHAR(20) DEFAULT NULL,
  p_changed_by UUID DEFAULT NULL,
  p_changed_by_name VARCHAR(100) DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_item RECORD;
  v_result JSONB;
BEGIN
  -- Get current item
  SELECT * INTO v_item FROM order_items WHERE id = p_item_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Item not found');
  END IF;

  -- Update the item
  UPDATE order_items
  SET
    item_status = p_new_status,
    station = COALESCE(p_station, station)
  WHERE id = p_item_id;

  -- If changed_by info provided, update the history record
  IF p_changed_by IS NOT NULL OR p_changed_by_name IS NOT NULL THEN
    UPDATE order_item_status_history
    SET
      changed_by = p_changed_by,
      changed_by_name = p_changed_by_name
    WHERE order_item_id = p_item_id
    AND changed_at = (
      SELECT MAX(changed_at)
      FROM order_item_status_history
      WHERE order_item_id = p_item_id
    );
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'item_id', p_item_id,
    'new_status', p_new_status,
    'station', p_station
  );
END;
$$;

COMMENT ON FUNCTION update_order_item_status IS 'Updates item status with optional station and staff attribution';

-- =============================================
-- 9. VERIFICATION QUERIES
-- =============================================

-- Verify columns added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'order_items'
AND column_name IN ('preparing_at', 'ready_at', 'served_at', 'station');

-- Verify table created
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_name = 'order_item_status_history'
);

-- Verify trigger attached
SELECT tgname, tgtype, tgenabled
FROM pg_trigger
WHERE tgname = 'trg_log_order_item_status';
