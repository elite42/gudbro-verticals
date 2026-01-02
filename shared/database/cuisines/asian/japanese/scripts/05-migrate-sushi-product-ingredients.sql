-- ============================================
-- MIGRATE SUSHI PRODUCT_INGREDIENTS TO JAPANESE
-- Updates product_type and product_id references
-- ============================================

-- First, check how many sushi product_ingredients exist
SELECT 'Sushi product_ingredients before migration' as status, COUNT(*) as count
FROM product_ingredients WHERE product_type = 'sushi';

-- Update product_type and product_id for sushi items
UPDATE product_ingredients
SET
    product_type = 'japanese',
    product_id = 'JPN_SUSHI_' || UPPER(REPLACE(product_id, '-', '_'))
WHERE product_type = 'sushi';

-- Verify migration
SELECT 'Japanese product_ingredients after migration (sushi)' as status, COUNT(*) as count
FROM product_ingredients
WHERE product_type = 'japanese' AND product_id LIKE 'JPN_SUSHI_%';

-- Show total japanese product_ingredients
SELECT 'Total Japanese product_ingredients' as status, COUNT(*) as count
FROM product_ingredients WHERE product_type = 'japanese';
