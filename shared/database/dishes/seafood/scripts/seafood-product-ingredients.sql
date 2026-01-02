-- ============================================
-- GUDBRO Seafood - Product Ingredients Links
-- Version: 1.1
-- Creates links between seafood dishes and ingredients
-- ============================================

-- Clear existing links for seafood (if re-running)
DELETE FROM product_ingredients WHERE product_type = 'seafood';

-- Insert product_ingredients links
-- Columns: product_type, product_id, ingredient_id, sort_order
-- Note: is_signature defaults to false, role defaults to 'main'
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order)
SELECT
  'seafood',
  s.id,
  unnest(s.ingredient_ids),
  generate_series(1, array_length(s.ingredient_ids, 1))
FROM seafood s
WHERE array_length(s.ingredient_ids, 1) > 0;

-- Mark first ingredient as signature for each dish
UPDATE product_ingredients pi
SET is_signature = true
WHERE pi.product_type = 'seafood'
  AND pi.sort_order = 1;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count total links created
-- SELECT COUNT(*) as total_links FROM product_ingredients WHERE product_type = 'seafood';

-- Links per dish (should match ingredient count)
-- SELECT s.id, s.name, array_length(s.ingredient_ids, 1) as expected,
--        COUNT(pi.id) as actual
-- FROM seafood s
-- LEFT JOIN product_ingredients pi ON pi.product_id = s.id AND pi.product_type = 'seafood'
-- GROUP BY s.id, s.name
-- ORDER BY s.name;

-- Check for missing ingredients (should return no rows)
-- SELECT DISTINCT pi.ingredient_id as missing
-- FROM product_ingredients pi
-- WHERE pi.product_type = 'seafood'
--   AND NOT EXISTS (SELECT 1 FROM ingredients i WHERE i.id = pi.ingredient_id);
