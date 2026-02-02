-- ============================================================================
-- Migration 101: Order Performance Timestamps + Receipt Settings
-- ============================================================================
-- Date: 2026-02-02
-- Description: Adds per-status timestamps to service orders for performance
--              tracking (SVC-07) and receipt confirmation settings (SVC-08).
--
-- Changes:
--   - ALTER accom_service_orders: +4 timestamp columns (confirmed_at, preparing_at, ready_at, delivered_at)
--   - ALTER accom_service_orders: +2 receipt columns (receipt_confirmed_at, receipt_auto_confirm_at)
--   - ALTER accom_properties: +2 receipt config columns (receipt_enabled, receipt_auto_confirm_hours)
--   - Index on property_id + delivered_at for performance queries
-- ============================================================================

-- 1. Order status timestamps for performance tracking (SVC-07)
ALTER TABLE accom_service_orders
  ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS preparing_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS ready_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ;

-- 2. Receipt confirmation columns (SVC-08)
ALTER TABLE accom_service_orders
  ADD COLUMN IF NOT EXISTS receipt_confirmed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS receipt_auto_confirm_at TIMESTAMPTZ;

-- 3. Property-level receipt settings (SVC-08)
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS receipt_enabled BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS receipt_auto_confirm_hours INTEGER NOT NULL DEFAULT 24;

-- 4. Index for performance queries (filter by property + delivery window)
CREATE INDEX IF NOT EXISTS idx_accom_service_orders_perf
  ON accom_service_orders(property_id, delivered_at)
  WHERE delivered_at IS NOT NULL;

-- 5. Comments
COMMENT ON COLUMN accom_service_orders.confirmed_at IS 'Timestamp when order was confirmed by owner';
COMMENT ON COLUMN accom_service_orders.preparing_at IS 'Timestamp when order preparation started';
COMMENT ON COLUMN accom_service_orders.ready_at IS 'Timestamp when order was marked ready';
COMMENT ON COLUMN accom_service_orders.delivered_at IS 'Timestamp when order was delivered to guest';
COMMENT ON COLUMN accom_service_orders.receipt_confirmed_at IS 'Timestamp when guest confirmed receipt of order';
COMMENT ON COLUMN accom_service_orders.receipt_auto_confirm_at IS 'Scheduled auto-confirm time for receipt (delivery + timeout)';
COMMENT ON COLUMN accom_properties.receipt_enabled IS 'Whether guest receipt confirmation is enabled for this property';
COMMENT ON COLUMN accom_properties.receipt_auto_confirm_hours IS 'Hours after delivery before receipt auto-confirms (default 24)';
