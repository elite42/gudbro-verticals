-- Migration 092: Multi-Zone WiFi
-- Phase 29-01: Add wifi_zones JSONB to properties, WiFi overrides to rooms
-- Enables property owners to configure multiple WiFi networks by zone

BEGIN;

-- 1. Add wifi_zones JSONB column to accom_properties
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS wifi_zones JSONB DEFAULT NULL;

-- 2. Add CHECK constraint: must be NULL or a JSON array with max 8 entries
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'wifi_zones_valid'
  ) THEN
    ALTER TABLE accom_properties
      ADD CONSTRAINT wifi_zones_valid
      CHECK (
        wifi_zones IS NULL
        OR (jsonb_typeof(wifi_zones) = 'array' AND jsonb_array_length(wifi_zones) <= 8)
      );
  END IF;
END $$;

-- 3. Add WiFi override columns to accom_rooms
ALTER TABLE accom_rooms
  ADD COLUMN IF NOT EXISTS wifi_ssid_override TEXT;

ALTER TABLE accom_rooms
  ADD COLUMN IF NOT EXISTS wifi_password_override TEXT;

-- 4. Data migration: convert legacy wifi_network into first wifi_zones entry
UPDATE accom_properties
SET wifi_zones = jsonb_build_array(
  jsonb_build_object(
    'zone_id', gen_random_uuid()::TEXT,
    'label', 'Property WiFi',
    'zone_type', 'room',
    'icon', 'WifiHigh',
    'ssid', wifi_network,
    'password', COALESCE(wifi_password, ''),
    'sort_order', 0
  )
)
WHERE wifi_network IS NOT NULL
  AND wifi_network != ''
  AND wifi_zones IS NULL;

-- 5. Column comments
COMMENT ON COLUMN accom_properties.wifi_zones IS 'JSON array of WiFi zone objects [{zone_id, label, zone_type, icon, ssid, password, sort_order}]. Max 8 zones.';
COMMENT ON COLUMN accom_rooms.wifi_ssid_override IS 'Optional room-specific WiFi SSID that overrides the property-level zone assignment';
COMMENT ON COLUMN accom_rooms.wifi_password_override IS 'Optional room-specific WiFi password that overrides the property-level zone assignment';

COMMIT;
