-- ============================================================================
-- SANDWICHES CLEANUP - Remove Migrated Items
-- ============================================================================
-- ESEGUI QUESTO SCRIPT DOPO aver migrato piadine e wraps
--
-- Rimuove dalla tabella sandwiches:
-- 1. 21 piadine (migrate a tabella piadine)
-- 2. 5 wraps (migrati a tabella wraps)
-- ============================================================================

-- ============================================================================
-- STEP 1: Remove product_ingredients for piadine
-- ============================================================================

DELETE FROM product_ingredients
WHERE product_type = 'sandwiches'
AND product_id IN (
    SELECT id FROM sandwiches WHERE bread_type = 'piadina'
);

-- ============================================================================
-- STEP 2: Remove product_ingredients for wraps
-- ============================================================================

DELETE FROM product_ingredients
WHERE product_type = 'sandwiches'
AND product_id IN (
    SELECT id FROM sandwiches
    WHERE bread_type IN ('flour_tortilla', 'large_flour_tortilla', 'rice_paper', 'lavash')
);

-- ============================================================================
-- STEP 3: Remove piadine from sandwiches
-- ============================================================================

DELETE FROM sandwiches
WHERE bread_type = 'piadina';

-- ============================================================================
-- STEP 4: Remove wraps from sandwiches
-- ============================================================================

DELETE FROM sandwiches
WHERE bread_type IN ('flour_tortilla', 'large_flour_tortilla', 'rice_paper', 'lavash');

-- ============================================================================
-- STEP 5: Verify
-- ============================================================================

SELECT 'Cleanup completed' as status;
SELECT 'Remaining sandwiches: ' || COUNT(*) as result FROM sandwiches;
SELECT 'Remaining sandwich product_ingredients: ' || COUNT(*) as result
FROM product_ingredients WHERE product_type = 'sandwiches';
