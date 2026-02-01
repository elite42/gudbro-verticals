-- Migration 094: Property data fields + onboarding progress (Phase 32)
--
-- Adds structured property data columns for owner dashboard:
--   - social_links: Instagram, Facebook, TikTok, Website
--   - google_maps_url: Direct link to Google Maps listing
--   - communication_methods: WhatsApp, Zalo, Telegram, etc.
--   - operating_hours: Reception, restaurant hours as JSONB
--   - staff_languages: Languages spoken by staff
--   - onboarding_progress: Multi-step wizard state tracking

ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS google_maps_url TEXT,
  ADD COLUMN IF NOT EXISTS communication_methods TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS operating_hours JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS staff_languages TEXT[] DEFAULT '{"en"}',
  ADD COLUMN IF NOT EXISTS onboarding_progress JSONB DEFAULT NULL;

-- Documentation comments
COMMENT ON COLUMN accom_properties.social_links IS 'JSONB: { instagram: "url", facebook: "url", tiktok: "url", website: "url" }';
COMMENT ON COLUMN accom_properties.communication_methods IS 'TEXT[]: whatsapp, zalo, telegram, line, email, phone';
COMMENT ON COLUMN accom_properties.operating_hours IS 'JSONB: { reception: { open: "08:00", close: "22:00" }, restaurant: { open: "07:00", close: "21:00" } }';
COMMENT ON COLUMN accom_properties.onboarding_progress IS 'JSONB: { completed_steps: [], current_step: null, started_at: null, completed_at: null }';
