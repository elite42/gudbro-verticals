-- ============================================
-- WATERS - Verify Import
-- Run this after all other scripts
-- ============================================

-- Count waters by category
SELECT 'Waters by Category:' as info;
SELECT category, COUNT(*) as count
FROM waters
GROUP BY category
ORDER BY count DESC;

-- Count total
SELECT 'Total Waters:' as info, COUNT(*) as count FROM waters;

-- Verify softdrinks cleanup
SELECT 'Softdrinks after cleanup:' as info, COUNT(*) as count FROM softdrinks;
SELECT 'Softdrinks product_ingredients:' as info, COUNT(*) as count
FROM product_ingredients WHERE product_type = 'softdrinks';

-- Verify product_taxonomy
SELECT 'Product Taxonomy Entry:' as info;
SELECT product_type, menu_type, service_type, display_name_en
FROM product_taxonomy
WHERE product_type = 'waters';

-- Sample waters (one per category)
SELECT 'Sample Waters (one per category):' as info;
SELECT DISTINCT ON (category)
    id, name, category, brand, carbonation, source_type, tds_mg_l, ph_level
FROM waters
ORDER BY category, popularity DESC;

-- Note: Waters don't have product_ingredients entries
-- Waters are simple products (water + natural minerals)
-- Not applicable for ingredient linking

