-- ============================================================================
-- Migration 080: Accommodations F&B Integration
-- ============================================================================
-- Date: 2026-01-30
-- Description: Adds F&B linking configuration to accom_properties so the
--              In-Stay Dashboard can deep-link guests to a property's
--              coffeeshop PWA (digital menu).
-- Depends on: 077-accommodations-schema.sql, 078-accommodations-seed.sql
-- ============================================================================

-- ============================================================================
-- 1. SCHEMA: F&B linking columns on accom_properties
-- ============================================================================

-- Whether this property has a linked coffeeshop/F&B PWA
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS has_linked_fnb BOOLEAN NOT NULL DEFAULT false;

-- Coffeeshop merchant slug for deep-linking (NULL when has_linked_fnb=false)
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS linked_fnb_slug TEXT;

-- ============================================================================
-- 2. SEED: Link demo property to coffeeshop PWA
-- ============================================================================

UPDATE accom_properties
SET
  has_linked_fnb = true,
  linked_fnb_slug = 'roots-danang'
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

-- ============================================================================
-- 3. COMMENTS
-- ============================================================================

COMMENT ON COLUMN accom_properties.has_linked_fnb IS 'Whether this property has a linked coffeeshop/F&B PWA for in-stay dining.';
COMMENT ON COLUMN accom_properties.linked_fnb_slug IS 'Coffeeshop merchant slug for deep-linking to the digital menu PWA. NULL when has_linked_fnb is false.';

-- ============================================================================
-- 4. ARCHITECTURAL NOTE: INT-01 (Conventions System Connection)
-- ============================================================================
-- The partner_conventions table already connects to properties via:
--   partner_id = <property UUID> AND partner_type = 'accommodation'
--
-- This polymorphic pattern (see deals/route.ts) provides property-specific
-- filtering WITHOUT a redundant property_id FK on partner_conventions.
-- Adding such a FK would create data drift risk (partner_id vs property_id
-- could diverge) with no benefit.
--
-- INT-01 is SATISFIED by the existing convention:
--   SELECT * FROM partner_conventions
--   WHERE partner_id = :propertyId AND partner_type = 'accommodation'
-- ============================================================================

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
