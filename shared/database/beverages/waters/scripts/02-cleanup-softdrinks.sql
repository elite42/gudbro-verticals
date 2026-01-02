-- ============================================
-- WATERS - Cleanup Softdrinks
-- Remove water items from softdrinks table
-- ============================================

-- First, delete product_ingredients for the waters being moved
DELETE FROM product_ingredients
WHERE product_type = 'softdrinks'
AND product_id IN ('SDR_SAN_PELLEGRINO', 'SDR_PERRIER', 'SDR_SCHWEPPES_SODA');

-- Then delete the waters from softdrinks table
DELETE FROM softdrinks
WHERE id IN ('SDR_SAN_PELLEGRINO', 'SDR_PERRIER', 'SDR_SCHWEPPES_SODA');

-- Verify cleanup
SELECT 'Softdrinks after cleanup:' as info, COUNT(*) as count FROM softdrinks;
SELECT 'Product_ingredients for softdrinks:' as info, COUNT(*) as count FROM product_ingredients WHERE product_type = 'softdrinks';
