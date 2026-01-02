-- ============================================
-- GUDBRO Mexican - Step 00: Cleanup Legacy ENUMs
-- Version: 1.0
-- Purpose: Remove old ENUM types before schema creation
-- ============================================
-- IMPORTANT: Execute this FIRST, before any other script!
-- ============================================

-- Drop table first (this releases the ENUM dependency)
DROP TABLE IF EXISTS mexican CASCADE;

-- Now drop all legacy ENUMs
DROP TYPE IF EXISTS taco_status CASCADE;
DROP TYPE IF EXISTS mexican_status CASCADE;
DROP TYPE IF EXISTS mexican_category CASCADE;
DROP TYPE IF EXISTS mexican_region CASCADE;
DROP TYPE IF EXISTS mexican_protein_type CASCADE;
DROP TYPE IF EXISTS mexican_tortilla_type CASCADE;

-- Verification message
DO $$
BEGIN
  RAISE NOTICE 'Legacy ENUMs cleanup completed. Proceed with 01-mexican-schema.sql';
END $$;
