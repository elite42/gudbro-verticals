-- ============================================================================
-- PLURAL TO SINGULAR MIGRATION
-- Date: 2025-12-26
-- Description: Standardize ingredient IDs from plural to singular form
-- Total: 25 ingredients (7 duplicates + 18 renames)
-- ============================================================================

BEGIN;

-- ============================================================================
-- GRUPPO A: DUPLICATI (7) - Merge product_ingredients + Delete plural
-- Questi ingredienti esistono sia in forma plurale che singolare
-- ============================================================================

-- 1. ING_CURRANTS → ING_CURRANT
UPDATE product_ingredients
SET ingredient_id = 'ING_CURRANT'
WHERE ingredient_id = 'ING_CURRANTS'
AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_id = product_ingredients.product_id
    AND pi2.product_type = product_ingredients.product_type
    AND pi2.ingredient_id = 'ING_CURRANT'
);
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_CURRANTS';
DELETE FROM ingredients WHERE id = 'ING_CURRANTS';

-- 2. ING_PEAS → ING_PEA
UPDATE product_ingredients
SET ingredient_id = 'ING_PEA'
WHERE ingredient_id = 'ING_PEAS'
AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_id = product_ingredients.product_id
    AND pi2.product_type = product_ingredients.product_type
    AND pi2.ingredient_id = 'ING_PEA'
);
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_PEAS';
DELETE FROM ingredients WHERE id = 'ING_PEAS';

-- 3. ING_SARDINES → ING_SARDINE
UPDATE product_ingredients
SET ingredient_id = 'ING_SARDINE'
WHERE ingredient_id = 'ING_SARDINES'
AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_id = product_ingredients.product_id
    AND pi2.product_type = product_ingredients.product_type
    AND pi2.ingredient_id = 'ING_SARDINE'
);
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_SARDINES';
DELETE FROM ingredients WHERE id = 'ING_SARDINES';

-- 4. ING_GOJI_BERRIES → ING_GOJI_BERRY
UPDATE product_ingredients
SET ingredient_id = 'ING_GOJI_BERRY'
WHERE ingredient_id = 'ING_GOJI_BERRIES'
AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_id = product_ingredients.product_id
    AND pi2.product_type = product_ingredients.product_type
    AND pi2.ingredient_id = 'ING_GOJI_BERRY'
);
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_GOJI_BERRIES';
DELETE FROM ingredients WHERE id = 'ING_GOJI_BERRIES';

-- 5. ING_PINE_NUTS → ING_PINE_NUT
UPDATE product_ingredients
SET ingredient_id = 'ING_PINE_NUT'
WHERE ingredient_id = 'ING_PINE_NUTS'
AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_id = product_ingredients.product_id
    AND pi2.product_type = product_ingredients.product_type
    AND pi2.ingredient_id = 'ING_PINE_NUT'
);
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_PINE_NUTS';
DELETE FROM ingredients WHERE id = 'ING_PINE_NUTS';

-- 6. ING_CANDIED_FRUITS → ING_CANDIED_FRUIT
UPDATE product_ingredients
SET ingredient_id = 'ING_CANDIED_FRUIT'
WHERE ingredient_id = 'ING_CANDIED_FRUITS'
AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_id = product_ingredients.product_id
    AND pi2.product_type = product_ingredients.product_type
    AND pi2.ingredient_id = 'ING_CANDIED_FRUIT'
);
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_CANDIED_FRUITS';
DELETE FROM ingredients WHERE id = 'ING_CANDIED_FRUITS';

-- 7. ING_CAPERS → ING_CAPER
UPDATE product_ingredients
SET ingredient_id = 'ING_CAPER'
WHERE ingredient_id = 'ING_CAPERS'
AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_id = product_ingredients.product_id
    AND pi2.product_type = product_ingredients.product_type
    AND pi2.ingredient_id = 'ING_CAPER'
);
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_CAPERS';
DELETE FROM ingredients WHERE id = 'ING_CAPERS';

-- ============================================================================
-- GRUPPO B: SOLO PLURALE (18) - Rename ingredient
-- Questi ingredienti esistono solo in forma plurale, vanno rinominati
-- ORDINE: Prima disabilita FK, poi rinomina ingredient, poi aggiorna riferimenti
-- ============================================================================

-- Disabilita temporaneamente il check delle foreign key
SET session_replication_role = 'replica';

-- 8. ING_APRICOTS → ING_APRICOT
UPDATE ingredients SET id = 'ING_APRICOT', name = 'Apricot', slug = 'apricot' WHERE id = 'ING_APRICOTS';
UPDATE product_ingredients SET ingredient_id = 'ING_APRICOT' WHERE ingredient_id = 'ING_APRICOTS';

-- 9. ING_CHESTNUTS → ING_CHESTNUT
UPDATE ingredients SET id = 'ING_CHESTNUT', name = 'Chestnut', slug = 'chestnut' WHERE id = 'ING_CHESTNUTS';
UPDATE product_ingredients SET ingredient_id = 'ING_CHESTNUT' WHERE ingredient_id = 'ING_CHESTNUTS';

-- 10. ING_CRANBERRIES → ING_CRANBERRY
UPDATE ingredients SET id = 'ING_CRANBERRY', name = 'Cranberry', slug = 'cranberry' WHERE id = 'ING_CRANBERRIES';
UPDATE product_ingredients SET ingredient_id = 'ING_CRANBERRY' WHERE ingredient_id = 'ING_CRANBERRIES';

-- 11. ING_ARTICHOKE_HEARTS → ING_ARTICHOKE_HEART
UPDATE ingredients SET id = 'ING_ARTICHOKE_HEART', name = 'Artichoke Heart', slug = 'artichoke-heart' WHERE id = 'ING_ARTICHOKE_HEARTS';
UPDATE product_ingredients SET ingredient_id = 'ING_ARTICHOKE_HEART' WHERE ingredient_id = 'ING_ARTICHOKE_HEARTS';

-- 12. ING_FIGS → ING_FIG
UPDATE ingredients SET id = 'ING_FIG', name = 'Fig', slug = 'fig' WHERE id = 'ING_FIGS';
UPDATE product_ingredients SET ingredient_id = 'ING_FIG' WHERE ingredient_id = 'ING_FIGS';

-- 13. ING_FRESH_FIGS → ING_FRESH_FIG
UPDATE ingredients SET id = 'ING_FRESH_FIG', name = 'Fresh Fig', slug = 'fresh-fig' WHERE id = 'ING_FRESH_FIGS';
UPDATE product_ingredients SET ingredient_id = 'ING_FRESH_FIG' WHERE ingredient_id = 'ING_FRESH_FIGS';

-- 14. ING_FRENCH_LENTILS → ING_FRENCH_LENTIL
UPDATE ingredients SET id = 'ING_FRENCH_LENTIL', name = 'French Lentil', slug = 'french-lentil' WHERE id = 'ING_FRENCH_LENTILS';
UPDATE product_ingredients SET ingredient_id = 'ING_FRENCH_LENTIL' WHERE ingredient_id = 'ING_FRENCH_LENTILS';

-- 15. ING_GRAPES → ING_GRAPE
UPDATE ingredients SET id = 'ING_GRAPE', name = 'Grape', slug = 'grape' WHERE id = 'ING_GRAPES';
UPDATE product_ingredients SET ingredient_id = 'ING_GRAPE' WHERE ingredient_id = 'ING_GRAPES';

-- 16. ING_GREEN_WALNUTS → ING_GREEN_WALNUT
UPDATE ingredients SET id = 'ING_GREEN_WALNUT', name = 'Green Walnut', slug = 'green-walnut' WHERE id = 'ING_GREEN_WALNUTS';
UPDATE product_ingredients SET ingredient_id = 'ING_GREEN_WALNUT' WHERE ingredient_id = 'ING_GREEN_WALNUTS';

-- 17. ING_HAZELNUTS → ING_HAZELNUT
UPDATE ingredients SET id = 'ING_HAZELNUT', name = 'Hazelnut', slug = 'hazelnut' WHERE id = 'ING_HAZELNUTS';
UPDATE product_ingredients SET ingredient_id = 'ING_HAZELNUT' WHERE ingredient_id = 'ING_HAZELNUTS';

-- 18. ING_JUNIPER_BERRIES → ING_JUNIPER_BERRY
UPDATE ingredients SET id = 'ING_JUNIPER_BERRY', name = 'Juniper Berry', slug = 'juniper-berry' WHERE id = 'ING_JUNIPER_BERRIES';
UPDATE product_ingredients SET ingredient_id = 'ING_JUNIPER_BERRY' WHERE ingredient_id = 'ING_JUNIPER_BERRIES';

-- 19. ING_MARCONA_ALMONDS → ING_MARCONA_ALMOND
UPDATE ingredients SET id = 'ING_MARCONA_ALMOND', name = 'Marcona Almond', slug = 'marcona-almond' WHERE id = 'ING_MARCONA_ALMONDS';
UPDATE product_ingredients SET ingredient_id = 'ING_MARCONA_ALMOND' WHERE ingredient_id = 'ING_MARCONA_ALMONDS';

-- 20. ING_OYSTERS → ING_OYSTER
UPDATE ingredients SET id = 'ING_OYSTER', name = 'Oyster', slug = 'oyster' WHERE id = 'ING_OYSTERS';
UPDATE product_ingredients SET ingredient_id = 'ING_OYSTER' WHERE ingredient_id = 'ING_OYSTERS';

-- 21. ING_PEANUTS → ING_PEANUT
UPDATE ingredients SET id = 'ING_PEANUT', name = 'Peanut', slug = 'peanut' WHERE id = 'ING_PEANUTS';
UPDATE product_ingredients SET ingredient_id = 'ING_PEANUT' WHERE ingredient_id = 'ING_PEANUTS';

-- 22. ING_PECANS → ING_PECAN
UPDATE ingredients SET id = 'ING_PECAN', name = 'Pecan', slug = 'pecan' WHERE id = 'ING_PECANS';
UPDATE product_ingredients SET ingredient_id = 'ING_PECAN' WHERE ingredient_id = 'ING_PECANS';

-- 23. ING_PEPITAS → ING_PEPITA
UPDATE ingredients SET id = 'ING_PEPITA', name = 'Pepita', slug = 'pepita' WHERE id = 'ING_PEPITAS';
UPDATE product_ingredients SET ingredient_id = 'ING_PEPITA' WHERE ingredient_id = 'ING_PEPITAS';

-- 24. ING_PLUMS → ING_PLUM
UPDATE ingredients SET id = 'ING_PLUM', name = 'Plum', slug = 'plum' WHERE id = 'ING_PLUMS';
UPDATE product_ingredients SET ingredient_id = 'ING_PLUM' WHERE ingredient_id = 'ING_PLUMS';

-- 25. ING_SNAILS → ING_SNAIL
UPDATE ingredients SET id = 'ING_SNAIL', name = 'Snail', slug = 'snail' WHERE id = 'ING_SNAILS';
UPDATE product_ingredients SET ingredient_id = 'ING_SNAIL' WHERE ingredient_id = 'ING_SNAILS';

-- Riabilita il check delle foreign key
SET session_replication_role = 'origin';

COMMIT;

-- ============================================================================
-- VERIFICATION QUERIES (run after migration)
-- ============================================================================
-- SELECT id, name FROM ingredients WHERE id LIKE '%S' AND id NOT LIKE '%SS' ORDER BY id;
-- SELECT COUNT(*) FROM ingredients;
