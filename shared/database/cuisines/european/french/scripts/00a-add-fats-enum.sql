-- ============================================
-- STEP 1: ADD 'fats' TO ingredient_category ENUM
-- ============================================
-- Run this FIRST, then run 00b-migrate-fats.sql
-- PostgreSQL requires new ENUM values to be committed
-- before they can be used in UPDATE statements.
-- ============================================

ALTER TYPE ingredient_category ADD VALUE IF NOT EXISTS 'fats';

-- After running this, execute 00b-migrate-fats.sql
