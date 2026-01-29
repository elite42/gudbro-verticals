-- ============================================================================
-- Migration 081: Schema-API Alignment
-- ============================================================================
-- Date: 2026-01-30
-- Description: Aligns database column names with API route SELECT strings.
--              API routes SELECT columns by name (e.g., wifi_network, contact_phone,
--              sort_order). The actual DB columns have different names (e.g.,
--              wifi_ssid, host_phone, display_order). Supabase returns NULL for
--              mismatched names. This migration fixes all mismatches so the
--              existing API routes work against real data without code changes.
-- Depends on: 077-accommodations-schema.sql, 079-accommodations-phase6-extensions.sql,
--             080-accommodations-fnb-integration.sql
-- ============================================================================

-- ============================================================================
-- 1. accom_properties: COLUMN RENAMES
-- ============================================================================
-- These columns exist in DB (077) but API routes SELECT them with different names.

-- wifi_ssid -> wifi_network (verify route + property route)
ALTER TABLE accom_properties RENAME COLUMN wifi_ssid TO wifi_network;

-- host_phone -> contact_phone (verify route + property route)
ALTER TABLE accom_properties RENAME COLUMN host_phone TO contact_phone;

-- host_email -> contact_email (property route)
ALTER TABLE accom_properties RENAME COLUMN host_email TO contact_email;

-- check_out_time -> checkout_time (property route)
ALTER TABLE accom_properties RENAME COLUMN check_out_time TO checkout_time;

-- cover_image_url -> cover_image (property route)
ALTER TABLE accom_properties RENAME COLUMN cover_image_url TO cover_image;

-- country_code -> country (property route)
ALTER TABLE accom_properties RENAME COLUMN country_code TO country;

-- ============================================================================
-- 2. accom_properties: GENERATED COLUMN for `type`
-- ============================================================================
-- API routes SELECT `type` but the DB column is `property_type`.
-- We cannot rename to `type` because it is a reserved/ambiguous SQL keyword.
-- Instead, add a generated column that mirrors property_type.

ALTER TABLE accom_properties
  ADD COLUMN type TEXT GENERATED ALWAYS AS (property_type) STORED;

-- ============================================================================
-- 3. accom_properties: NEW COLUMNS
-- ============================================================================
-- API routes SELECT these columns but they do not exist in the DB yet.

-- contact_whatsapp: verify route + property route SELECT it
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS contact_whatsapp TEXT;

-- area: property route SELECTs it (neighborhood/district)
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS area TEXT;

-- rating: property route SELECTs it (future use, e.g. 4.5)
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS rating NUMERIC(2,1);

-- review_count: property route SELECTs it (future use)
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- ============================================================================
-- 4. accom_properties: TYPE CHANGE (house_rules TEXT -> JSONB)
-- ============================================================================
-- The API expects house_rules as a JSONB array of strings (houseRules: string[]).
-- Current DB stores it as plain TEXT (a single string with sentences).
-- Convert existing data: split on ". " into array elements.

ALTER TABLE accom_properties
  ALTER COLUMN house_rules TYPE JSONB USING
    CASE
      WHEN house_rules IS NULL THEN '[]'::JSONB
      WHEN house_rules::TEXT = '' THEN '[]'::JSONB
      ELSE to_jsonb(string_to_array(house_rules::TEXT, '. '))
    END;

ALTER TABLE accom_properties
  ALTER COLUMN house_rules SET DEFAULT '[]'::JSONB;

-- ============================================================================
-- 5. accom_service_categories: COLUMN RENAME
-- ============================================================================

-- display_order -> sort_order (services route SELECTs sort_order)
ALTER TABLE accom_service_categories RENAME COLUMN display_order TO sort_order;

-- ============================================================================
-- 6. accom_service_items: COLUMN RENAMES
-- ============================================================================

-- display_order -> sort_order (services route SELECTs sort_order)
ALTER TABLE accom_service_items RENAME COLUMN display_order TO sort_order;

-- image_url -> image (services route SELECTs image)
ALTER TABLE accom_service_items RENAME COLUMN image_url TO image;

-- ============================================================================
-- 7. accom_service_items: NEW COLUMNS
-- ============================================================================
-- API routes SELECT these columns but they do not exist in the DB yet.

-- currency: services route SELECTs it (default VND for Vietnamese Dong)
ALTER TABLE accom_service_items
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'VND';

-- price_type: services route SELECTs it (fixed, per_hour, per_day, etc.)
ALTER TABLE accom_service_items
  ADD COLUMN IF NOT EXISTS price_type TEXT DEFAULT 'fixed';

-- in_stock: services route SELECTs it (availability flag)
ALTER TABLE accom_service_items
  ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true;

-- ============================================================================
-- 8. COMMENTS
-- ============================================================================

-- Renamed columns on accom_properties
COMMENT ON COLUMN accom_properties.wifi_network IS 'WiFi network name (SSID). Renamed from wifi_ssid in migration 081.';
COMMENT ON COLUMN accom_properties.contact_phone IS 'Host/property contact phone. Renamed from host_phone in migration 081.';
COMMENT ON COLUMN accom_properties.contact_email IS 'Host/property contact email. Renamed from host_email in migration 081.';
COMMENT ON COLUMN accom_properties.checkout_time IS 'Check-out time (TIME). Renamed from check_out_time in migration 081.';
COMMENT ON COLUMN accom_properties.cover_image IS 'Cover image URL. Renamed from cover_image_url in migration 081.';
COMMENT ON COLUMN accom_properties.country IS 'Country code (e.g. VN). Renamed from country_code in migration 081.';

-- Generated column
COMMENT ON COLUMN accom_properties.type IS 'Generated column mirroring property_type. Avoids using reserved word as primary column name.';

-- New columns on accom_properties
COMMENT ON COLUMN accom_properties.contact_whatsapp IS 'WhatsApp number for guest contact (international format, e.g. +84905123456).';
COMMENT ON COLUMN accom_properties.area IS 'Neighborhood or district (e.g. "An Thuong", "My Khe Beach").';
COMMENT ON COLUMN accom_properties.rating IS 'Property rating (0.0-5.0). Future use for reviews system.';
COMMENT ON COLUMN accom_properties.review_count IS 'Number of reviews. Future use for reviews system. Default 0.';

-- Type change on accom_properties
COMMENT ON COLUMN accom_properties.house_rules IS 'JSONB array of house rule strings. Changed from TEXT in migration 081.';

-- Renamed columns on accom_service_categories
COMMENT ON COLUMN accom_service_categories.sort_order IS 'Display sort order. Renamed from display_order in migration 081.';

-- Renamed columns on accom_service_items
COMMENT ON COLUMN accom_service_items.sort_order IS 'Display sort order. Renamed from display_order in migration 081.';
COMMENT ON COLUMN accom_service_items.image IS 'Item image URL. Renamed from image_url in migration 081.';

-- New columns on accom_service_items
COMMENT ON COLUMN accom_service_items.currency IS 'Currency code for price (default VND). Added in migration 081.';
COMMENT ON COLUMN accom_service_items.price_type IS 'Price type: fixed, per_hour, per_day, etc. (default fixed). Added in migration 081.';
COMMENT ON COLUMN accom_service_items.in_stock IS 'Whether item is currently in stock/available (default true). Added in migration 081.';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
