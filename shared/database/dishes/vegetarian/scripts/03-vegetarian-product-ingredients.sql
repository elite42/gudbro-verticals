-- ============================================
-- VEGETARIAN DATABASE - Product Ingredients Links
-- Version: 1.0 (DATABASE-STANDARDS v1.1 compliant)
-- Created: 2025-12-18
-- ============================================
--
-- EXECUTION ORDER:
-- 1. Run 01-vegetarian-missing-ingredients.sql FIRST (creates needed ingredients)
-- 2. Run 02-vegetarian-complete-import.sql SECOND (creates table + inserts products)
-- 3. Run THIS file THIRD (creates junction links)
-- ============================================

-- Clear existing links for vegetarian (in case re-running)
DELETE FROM product_ingredients WHERE product_type = 'vegetarian';

-- Insert ingredient links from vegetarian table
-- Uses unnest with generate_subscripts to preserve order
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order)
SELECT
    'vegetarian',
    v.id,
    unnest(v.ingredient_ids),
    generate_series(1, array_length(v.ingredient_ids, 1))
FROM vegetarian v
WHERE array_length(v.ingredient_ids, 1) > 0;

-- Mark first ingredient as signature for each product
UPDATE product_ingredients
SET is_signature = true
WHERE product_type = 'vegetarian'
  AND sort_order = 1;

-- ============================================
-- VERIFICATION
-- ============================================

-- Count total links
SELECT 'Total vegetarian ingredient links:' AS label, COUNT(*) AS count
FROM product_ingredients
WHERE product_type = 'vegetarian';

-- Count by category (via join)
SELECT
    v.category,
    COUNT(pi.id) AS ingredient_links
FROM vegetarian v
JOIN product_ingredients pi ON pi.product_id = v.id AND pi.product_type = 'vegetarian'
GROUP BY v.category
ORDER BY v.category;

-- Check for missing ingredients (should return empty)
SELECT DISTINCT pi.ingredient_id AS missing_ingredient
FROM product_ingredients pi
WHERE pi.product_type = 'vegetarian'
  AND NOT EXISTS (
    SELECT 1 FROM ingredients i WHERE i.id = pi.ingredient_id
  );

-- Summary stats
SELECT
    'Vegetarian Database Summary' AS report,
    (SELECT COUNT(*) FROM vegetarian) AS total_dishes,
    (SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'vegetarian') AS total_ingredient_links,
    (SELECT COUNT(DISTINCT ingredient_id) FROM product_ingredients WHERE product_type = 'vegetarian') AS unique_ingredients_used;
