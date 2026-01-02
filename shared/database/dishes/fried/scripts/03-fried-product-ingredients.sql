-- ============================================
-- GUDBRO Fried Foods - Product Ingredients Links
-- Run this AFTER 02-fried-complete-import.sql
-- Creates junction table links for ingredient relationships
-- ============================================

-- Clear existing fried links (if re-running)
DELETE FROM product_ingredients WHERE product_type = 'fried';

-- Insert all ingredient links with sort order
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order)
SELECT
  'fried',
  f.id,
  unnest(f.ingredient_ids),
  generate_series(1, array_length(f.ingredient_ids, 1))
FROM fried f
WHERE array_length(f.ingredient_ids, 1) > 0;

-- Mark first ingredient as signature for each dish
UPDATE product_ingredients
SET is_signature = true
WHERE product_type = 'fried' AND sort_order = 1;

-- ============================================
-- VERIFICATION
-- ============================================

-- Total links created
SELECT
  'Product ingredients links' AS status,
  COUNT(*) AS total_links,
  COUNT(DISTINCT product_id) AS products_with_links,
  COUNT(DISTINCT ingredient_id) AS unique_ingredients
FROM product_ingredients
WHERE product_type = 'fried';

-- Count by category (via join)
SELECT
  f.category,
  COUNT(pi.id) AS ingredient_links
FROM fried f
JOIN product_ingredients pi ON pi.product_type = 'fried' AND pi.product_id = f.id
GROUP BY f.category
ORDER BY f.category;

-- Verify signature ingredients
SELECT
  'Signature ingredients' AS status,
  COUNT(*) AS total
FROM product_ingredients
WHERE product_type = 'fried' AND is_signature = true;

-- Sample check - first 5 dishes with their ingredient counts
SELECT
  f.id,
  f.name,
  array_length(f.ingredient_ids, 1) AS expected_count,
  (SELECT COUNT(*) FROM product_ingredients pi WHERE pi.product_type = 'fried' AND pi.product_id = f.id) AS actual_count
FROM fried f
LIMIT 5;
