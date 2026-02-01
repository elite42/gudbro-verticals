-- ============================================================================
-- Migration 095: Service Catalog Enhancements
-- ============================================================================
-- Date: 2026-02-02
-- Description: Adds columns to support service catalog redesign and order
--              categorization for the minibar/service expansion feature.
--
--   accom_service_items.included_in_rate - complimentary items show "Included"
--   accom_service_categories.category_tag - standardized tag for grouping
--   accom_service_order_items.category_tag - denormalized tag per order item
--
-- Depends on: 077-accommodations-schema.sql (base tables)
--             086-service-automation-level.sql (automation_level)
-- ============================================================================

-- 1. included_in_rate on service items
ALTER TABLE accom_service_items
  ADD COLUMN IF NOT EXISTS included_in_rate BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN accom_service_items.included_in_rate IS
  'When true, item shows "Included" badge instead of price. Guest can order but no charge (complimentary breakfast, pool access, etc.)';

-- 2. category_tag on service categories
ALTER TABLE accom_service_categories
  ADD COLUMN IF NOT EXISTS category_tag TEXT DEFAULT 'general'
    CHECK (category_tag IN ('food', 'beverage', 'laundry', 'minibar', 'spa', 'transport', 'activity', 'general'));

COMMENT ON COLUMN accom_service_categories.category_tag IS
  'Standardized tag for grouping orders by category. Different from name which is freeform per property. Used for filtering in order list.';

-- 3. category_tag on order items (denormalized for query performance)
ALTER TABLE accom_service_order_items
  ADD COLUMN IF NOT EXISTS category_tag TEXT DEFAULT 'general';

COMMENT ON COLUMN accom_service_order_items.category_tag IS
  'Denormalized category tag from the item category at order time. Used for order-level category computation.';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
