-- ============================================
-- CLEANUP: DROP OLD SUSHI TABLE
-- Run this ONLY after verifying migration was successful
-- ============================================

-- IMPORTANT: Before running this, verify:
-- 1. All 100 sushi records are in japanese table
-- 2. All sushi product_ingredients are migrated
-- 3. No application is still using the 'sushi' table

-- Verification queries (run these first):
SELECT 'Japanese sushi items' as check_type, COUNT(*) as count
FROM japanese WHERE id LIKE 'JPN_SUSHI_%';

SELECT 'Japanese non-sushi items' as check_type, COUNT(*) as count
FROM japanese WHERE id LIKE 'JPN_%' AND id NOT LIKE 'JPN_SUSHI_%';

SELECT 'Total Japanese items' as check_type, COUNT(*) as count
FROM japanese;

SELECT 'Sushi product_ingredients (should be 0)' as check_type, COUNT(*) as count
FROM product_ingredients WHERE product_type = 'sushi';

SELECT 'Japanese product_ingredients (sushi)' as check_type, COUNT(*) as count
FROM product_ingredients WHERE product_type = 'japanese' AND product_id LIKE 'JPN_SUSHI_%';

SELECT 'Japanese product_ingredients (non-sushi)' as check_type, COUNT(*) as count
FROM product_ingredients WHERE product_type = 'japanese' AND product_id LIKE 'JPN_%' AND product_id NOT LIKE 'JPN_SUSHI_%';

-- ============================================
-- UNCOMMENT THE FOLLOWING LINES TO DROP THE OLD TABLE
-- Only do this after verifying the above queries
-- ============================================

-- DROP TABLE IF EXISTS sushi CASCADE;
-- SELECT 'Old sushi table dropped successfully' as status;
