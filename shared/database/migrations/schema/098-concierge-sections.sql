-- Migration 098: Concierge section toggles for accommodations
-- Phase 36: Guest Requests & Concierge Hub
--
-- Adds a JSONB column to accom_properties allowing merchants to toggle
-- which concierge sections are visible to their guests.

ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS concierge_sections JSONB
  DEFAULT '{"discover": true, "emergency": true, "safety": true, "culture": true, "transport": true}'::jsonb;

COMMENT ON COLUMN accom_properties.concierge_sections IS
  'Toggles for concierge hub sections. Keys: discover, emergency, safety, culture, transport. Values: boolean.';
