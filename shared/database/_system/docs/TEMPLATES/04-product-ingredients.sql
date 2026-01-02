-- ============================================
-- TEMPLATE: Product Ingredients Links
-- Collega prodotti agli ingredienti
-- ============================================
--
-- STRUTTURA TABELLA product_ingredients:
--   product_type  TEXT     -- nome tabella (es: 'german')
--   product_id    TEXT     -- ID prodotto (es: 'GER_SCHNITZEL')
--   ingredient_id TEXT     -- ID ingrediente (es: 'ING_VEAL')
--   role          TEXT     -- ruolo ingrediente
--   sort_order    INTEGER  -- ordine visualizzazione
--
-- RUOLI VALIDI:
--   'main'       -- Ingrediente principale
--   'secondary'  -- Ingrediente secondario
--   'seasoning'  -- Spezie/condimenti
--   'aromatic'   -- Erbe aromatiche
--   'sauce'      -- Salse
--   'garnish'    -- Guarnizione
--   'liquid'     -- Liquidi (brodo, vino)
--   'fat'        -- Grassi per cottura
--   'coating'    -- Panatura
--   'filling'    -- Ripieno
--   'topping'    -- Copertura
--   'base'       -- Base del piatto
--   'binder'     -- Legante (uova, amido)
-- ============================================

-- STEP 1: Eliminare link esistenti (sicurezza)
DELETE FROM product_ingredients WHERE product_type = '{cuisine}';

-- STEP 2: Inserire nuovi link
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
-- Prodotto 1: {PRODUCT_NAME}
('{cuisine}', '{PREFIX}_{PRODUCT}', 'ING_{MAIN}', 'main', 1),
('{cuisine}', '{PREFIX}_{PRODUCT}', 'ING_{SECONDARY}', 'secondary', 2),
('{cuisine}', '{PREFIX}_{PRODUCT}', 'ING_{SEASONING}', 'seasoning', 3),

-- Prodotto 2: ...
('{cuisine}', '{PREFIX}_{PRODUCT2}', 'ING_{MAIN}', 'main', 1);

-- ============================================
-- ESEMPIO COMPLETO: German Schnitzel
-- ============================================
/*
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
('german', 'GER_SCHNITZEL', 'ING_VEAL', 'main', 1),
('german', 'GER_SCHNITZEL', 'ING_FLOUR', 'coating', 2),
('german', 'GER_SCHNITZEL', 'ING_EGG', 'coating', 3),
('german', 'GER_SCHNITZEL', 'ING_BREADCRUMBS', 'coating', 4),
('german', 'GER_SCHNITZEL', 'ING_BUTTER', 'fat', 5),
('german', 'GER_SCHNITZEL', 'ING_LEMON', 'garnish', 6),
('german', 'GER_SCHNITZEL', 'ING_SALT', 'seasoning', 7);
*/

-- ============================================
-- VERIFICA POST-INSERT
-- ============================================
SELECT 'Links creati: ' || COUNT(*) as total
FROM product_ingredients
WHERE product_type = '{cuisine}';

-- Verifica distribuzione per prodotto
SELECT product_id, COUNT(*) as ingredient_count
FROM product_ingredients
WHERE product_type = '{cuisine}'
GROUP BY product_id
ORDER BY product_id;

-- ============================================
-- ERRORI COMUNI:
-- ============================================
--
-- 1. "duplicate key value violates unique constraint"
--    → DELETE prima di INSERT, oppure usa ON CONFLICT DO NOTHING
--
-- 2. "foreign key violation" su ingredient_id
--    → L'ingrediente non esiste: eseguire 01-missing-ingredients.sql prima
--
-- 3. Colonne sbagliate (product_table, is_primary)
--    → Usare: product_type, role, sort_order
