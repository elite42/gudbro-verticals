-- ============================================================================
-- Migration 079: Accommodations Phase 6 Extensions
-- ============================================================================
-- Date: 2026-01-29
-- Description: Schema extensions and seed data for the In-Stay Dashboard
--              Phase 6: quick actions, return guest banner, guest country,
--              and Da Nang city useful numbers.
-- Depends on: 077-accommodations-schema.sql, 078-accommodations-seed.sql,
--             073-useful-numbers.sql
-- ============================================================================

-- ============================================================================
-- 1. SCHEMA EXTENSIONS
-- ============================================================================

-- 1.1 Add quick_actions, return banner columns to accom_properties
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS quick_actions JSONB NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS return_banner_text TEXT;

ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS return_banner_url TEXT;

-- 1.2 Add guest_country to accom_bookings (ISO country code for visa info)
ALTER TABLE accom_bookings
  ADD COLUMN IF NOT EXISTS guest_country TEXT;

-- ============================================================================
-- 2. SEED DATA: Da Nang City Useful Numbers
-- ============================================================================
-- Uses existing city_useful_numbers table from migration 073.
-- Categories from CHECK constraint: taxi, pharmacy, hospital, police_local,
-- medical_guard, embassy, tourist_info, other

INSERT INTO city_useful_numbers (country_code, city_name, label, phone_number, category, sort_order, is_active)
VALUES
  ('VN', 'Da Nang', 'Police', '113', 'police_local', 1, true),
  ('VN', 'Da Nang', 'Ambulance', '115', 'hospital', 2, true),
  ('VN', 'Da Nang', 'Fire Department', '114', 'other', 3, true),
  ('VN', 'Da Nang', 'Tourist Police', '0236 3811 113', 'police_local', 4, true),
  ('VN', 'Da Nang', 'Immigration Office', '0236 3821 487', 'other', 5, true),
  ('VN', 'Da Nang', 'Da Nang General Hospital', '0236 3822 480', 'hospital', 6, true),
  ('VN', 'Da Nang', 'Taxi (Vinasun)', '0236 3 68 68 68', 'taxi', 7, true),
  ('VN', 'Da Nang', 'Taxi (Mai Linh)', '0236 3 56 56 56', 'taxi', 8, true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 3. SEED DATA: Demo Property Quick Actions & Return Banner
-- ============================================================================

UPDATE accom_properties
SET
  quick_actions = '[
    {
      "id": "room-service",
      "name": "Room Service",
      "icon": "ForkKnife",
      "whatsapp_message": "Room Service request"
    },
    {
      "id": "concierge",
      "name": "Concierge",
      "icon": "Compass",
      "whatsapp_message": "Concierge assistance"
    },
    {
      "id": "housekeeping",
      "name": "Housekeeping",
      "icon": "Broom",
      "whatsapp_message": "Housekeeping request"
    },
    {
      "id": "report-issue",
      "name": "Report Issue",
      "icon": "Warning",
      "whatsapp_message": "Issue report"
    }
  ]'::jsonb,
  return_banner_text = 'Loved your stay? Book again and get 10% off!',
  return_banner_url = 'https://wa.me/84905123456?text=I%20would%20like%20to%20book%20again'
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

-- ============================================================================
-- 4. SEED DATA: Demo Booking Guest Country
-- ============================================================================

UPDATE accom_bookings
SET guest_country = 'US'
WHERE id = 'bb000000-0000-0000-0000-000000000001';

-- ============================================================================
-- 5. COMMENTS
-- ============================================================================

COMMENT ON COLUMN accom_properties.quick_actions IS 'JSONB array of quick action buttons: [{id, name, icon, whatsapp_message}]';
COMMENT ON COLUMN accom_properties.return_banner_text IS 'Return guest banner CTA text. If NULL, banner is hidden.';
COMMENT ON COLUMN accom_properties.return_banner_url IS 'Return guest banner link (URL or WhatsApp link).';
COMMENT ON COLUMN accom_bookings.guest_country IS 'ISO country code for visa information (e.g. US, UK, DE).';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
