-- ============================================================================
-- Migration 085: Calendar Pricing (Room Blocks & Seasonal Pricing)
-- ============================================================================
-- Date: 2026-01-31
-- Description: Adds room blocking and seasonal pricing override tables for
--              the calendar & pricing management feature (Phase 22).
--              Both tables use EXCLUDE constraints to prevent overlapping
--              date ranges per room (same pattern as booking overlap in 083).
--
-- Changes:
--   - CREATE accom_room_blocks: owner can block rooms for maintenance/personal use
--   - CREATE accom_seasonal_pricing: price overrides for date ranges per room
--   - Indexes for efficient date-range lookups
--   - RLS policies (owner manages via property ownership chain)
--   - Grants for authenticated role
--
-- Depends on: 083-accommodations-v2-foundation.sql (btree_gist, accom_rooms, accom_properties)
-- ============================================================================

-- ============================================================================
-- 1. CREATE accom_room_blocks
-- ============================================================================
-- Allows property owners to block rooms from availability.
-- Half-open [) range: date_from inclusive, date_to exclusive (consistent with bookings).

CREATE TABLE accom_room_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES accom_rooms(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  reason TEXT DEFAULT 'other' CHECK (reason IN ('maintenance', 'personal_use', 'other')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (date_to > date_from),
  EXCLUDE USING GIST (
    room_id WITH =,
    daterange(date_from, date_to, '[)') WITH &&
  )
);

-- ============================================================================
-- 2. CREATE accom_seasonal_pricing
-- ============================================================================
-- Per-room price overrides for specific date ranges.
-- Half-open [) range: date_from inclusive, date_to exclusive.

CREATE TABLE accom_seasonal_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES accom_rooms(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  price_per_night INTEGER NOT NULL CHECK (price_per_night > 0),
  label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (date_to > date_from),
  EXCLUDE USING GIST (
    room_id WITH =,
    daterange(date_from, date_to, '[)') WITH &&
  )
);

-- ============================================================================
-- 3. TRIGGERS
-- ============================================================================

DROP TRIGGER IF EXISTS update_accom_seasonal_pricing_updated_at ON accom_seasonal_pricing;
CREATE TRIGGER update_accom_seasonal_pricing_updated_at
  BEFORE UPDATE ON accom_seasonal_pricing
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

CREATE INDEX idx_accom_room_blocks_room_dates ON accom_room_blocks(room_id, date_from, date_to);
CREATE INDEX idx_accom_room_blocks_property ON accom_room_blocks(property_id);
CREATE INDEX idx_accom_seasonal_pricing_room_dates ON accom_seasonal_pricing(room_id, date_from, date_to);
CREATE INDEX idx_accom_seasonal_pricing_property ON accom_seasonal_pricing(property_id);

-- ============================================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE accom_room_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_seasonal_pricing ENABLE ROW LEVEL SECURITY;

-- Room Blocks: owner manages via property_id ownership chain
CREATE POLICY accom_room_blocks_owner_manage
  ON accom_room_blocks FOR ALL TO authenticated
  USING (property_id IN (
    SELECT id FROM accom_properties
    WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  ));

-- Seasonal Pricing: owner manages via property_id ownership chain
CREATE POLICY accom_seasonal_pricing_owner_manage
  ON accom_seasonal_pricing FOR ALL TO authenticated
  USING (property_id IN (
    SELECT id FROM accom_properties
    WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  ));

-- ============================================================================
-- 6. ROLE GRANTS
-- ============================================================================

GRANT ALL ON accom_room_blocks TO authenticated;
GRANT ALL ON accom_seasonal_pricing TO authenticated;

-- ============================================================================
-- 7. COMMENTS
-- ============================================================================

COMMENT ON TABLE accom_room_blocks IS 'Room availability blocks (maintenance, personal use). EXCLUDE constraint prevents overlapping blocks per room.';
COMMENT ON TABLE accom_seasonal_pricing IS 'Per-room price overrides for date ranges. EXCLUDE constraint prevents overlapping pricing periods per room.';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
