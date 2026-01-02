-- ============================================
-- GUDBRO Steaks - Product Ingredients Links
-- Execute AFTER:
--   1. steaks-missing-ingredients.sql
--   2. steaks-complete-import.sql
-- ============================================

-- Insert links from steaks.ingredient_ids array to product_ingredients junction table
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
SELECT
  'steaks' as product_type,
  s.id as product_id,
  ing.ingredient_id,
  CASE
    WHEN ing.ordinality = 1 THEN 'primary'
    ELSE 'secondary'
  END as role,
  ing.ordinality as sort_order
FROM steaks s,
LATERAL unnest(s.ingredient_ids) WITH ORDINALITY AS ing(ingredient_id, ordinality)
WHERE EXISTS (SELECT 1 FROM ingredients i WHERE i.id = ing.ingredient_id)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- Verify count
-- SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'steaks';
-- Should be ~270 links (55 steaks * ~5 ingredients each)

-- Show any missing ingredients (for debugging)
-- SELECT DISTINCT unnest(ingredient_ids) as missing_ingredient
-- FROM steaks s
-- WHERE NOT EXISTS (
--   SELECT 1 FROM ingredients i
--   WHERE i.id = ANY(s.ingredient_ids)
-- );
