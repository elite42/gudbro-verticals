-- ============================================
-- GUDBRO Migration: japanese → sushi
-- Version: 1.0
-- Date: 2025-12-18
-- ============================================
--
-- PURPOSE:
-- Rename 'japanese' table to 'sushi' for naming consistency.
-- All other databases use dish type (pasta, steaks, seafood),
-- not cuisine origin (japanese, italian, french).
--
-- AFFECTS:
-- 1. Table name: japanese → sushi
-- 2. product_ingredients: product_type = 'japanese' → 'sushi'
-- 3. product_taxonomy: product_type = 'japanese' → 'sushi'
-- 4. Indexes and constraints (auto-renamed by PostgreSQL)
--
-- SAFETY:
-- - All operations in single transaction
-- - Rollback on any error
-- - No data loss
--
-- ============================================

BEGIN;

-- ============================================
-- STEP 1: Rename the table
-- ============================================

ALTER TABLE japanese RENAME TO sushi;

-- ============================================
-- STEP 2: Update product_ingredients links
-- ============================================

UPDATE product_ingredients
SET product_type = 'sushi'
WHERE product_type = 'japanese';

-- ============================================
-- STEP 3: Update product_taxonomy
-- ============================================

-- First, add 'sushi' to the category CHECK constraint
ALTER TABLE product_taxonomy DROP CONSTRAINT IF EXISTS product_taxonomy_category_check;

ALTER TABLE product_taxonomy ADD CONSTRAINT product_taxonomy_category_check
CHECK (category IN (
  'appetizer', 'first_course', 'second_course', 'side', 'dessert',
  'pizza', 'burger', 'sandwich', 'japanese', 'sushi', 'dumpling',
  'cocktail', 'wine', 'beer', 'coffee', 'tea', 'soft_drink', 'juice', 'smoothie'
));

-- Now update the taxonomy entry
UPDATE product_taxonomy
SET product_type = 'sushi',
    category = 'sushi',
    display_name_en = 'Sushi & Sashimi',
    display_name_it = 'Sushi e Sashimi',
    display_name_vi = 'Sushi',
    display_name_ko = '스시',
    display_name_ja = '寿司',
    description_en = 'Sushi, sashimi, maki rolls, and Japanese raw fish dishes'
WHERE product_type = 'japanese';

-- ============================================
-- STEP 4: Rename function (if exists)
-- ============================================

-- Rename the trigger function (wrapped in DO block for IF EXISTS logic)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_japanese_updated_at') THEN
    ALTER FUNCTION update_japanese_updated_at() RENAME TO update_sushi_updated_at;
  END IF;
END $$;

-- ============================================
-- STEP 5: Update table comment
-- ============================================

COMMENT ON TABLE sushi IS 'GUDBRO Sushi & Sashimi catalog - DATABASE-STANDARDS v1.1 (renamed from japanese 2025-12-18)';

-- ============================================
-- VERIFICATION
-- ============================================

-- These should return results:
-- SELECT COUNT(*) as sushi_count FROM sushi;
-- SELECT COUNT(*) as links_count FROM product_ingredients WHERE product_type = 'sushi';
-- SELECT * FROM product_taxonomy WHERE product_type = 'sushi';

-- These should return 0 or error:
-- SELECT COUNT(*) FROM japanese; -- Should error: table doesn't exist
-- SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'japanese'; -- Should return 0

COMMIT;

-- ============================================
-- POST-MIGRATION VERIFICATION QUERIES
-- (Run these manually after migration)
-- ============================================

-- 1. Check sushi table exists and has data
-- SELECT COUNT(*) as total_sushi_items FROM sushi;

-- 2. Check product_ingredients updated
-- SELECT COUNT(*) as sushi_links FROM product_ingredients WHERE product_type = 'sushi';
-- SELECT COUNT(*) as japanese_links FROM product_ingredients WHERE product_type = 'japanese';

-- 3. Check taxonomy updated
-- SELECT product_type, category, display_name_en FROM product_taxonomy WHERE product_type = 'sushi';

-- 4. Sample data check
-- SELECT id, name, category FROM sushi LIMIT 5;
