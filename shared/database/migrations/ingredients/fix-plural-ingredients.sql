-- Migration: Fix Plural Ingredients → Singular
-- Date: 2025-12-26
-- Description: Consolidate duplicate plural/singular ingredients
--
-- DUPLICATI IDENTIFICATI:
-- ING_BLUEBERRIES → ING_BLUEBERRY (4 record)
-- ING_DATES → ING_DATE (3 record)
-- ING_PEACHES → ING_PEACH (1 record)
-- ING_TOMATOES → ING_TOMATO (10 record)
-- ING_POTATOES → ING_POTATO (5 record)
-- ING_CLAMS → ING_CLAM (20 record)
-- ING_MUSSELS → ING_MUSSEL (35 record)
-- ING_CHERRY_TOMATOES → ING_CHERRY_TOMATO (9 record)
--
-- TOTALE: ~87 record da aggiornare in product_ingredients

-- ============================================
-- STEP 1: Aggiorna product_ingredients (plurale → singolare)
-- ============================================

-- ING_BLUEBERRIES → ING_BLUEBERRY
UPDATE product_ingredients
SET ingredient_id = 'ING_BLUEBERRY'
WHERE ingredient_id = 'ING_BLUEBERRIES';

-- ING_DATES → ING_DATE
UPDATE product_ingredients
SET ingredient_id = 'ING_DATE'
WHERE ingredient_id = 'ING_DATES';

-- ING_PEACHES → ING_PEACH
UPDATE product_ingredients
SET ingredient_id = 'ING_PEACH'
WHERE ingredient_id = 'ING_PEACHES';

-- ING_TOMATOES → ING_TOMATO
UPDATE product_ingredients
SET ingredient_id = 'ING_TOMATO'
WHERE ingredient_id = 'ING_TOMATOES';

-- ING_POTATOES → ING_POTATO
UPDATE product_ingredients
SET ingredient_id = 'ING_POTATO'
WHERE ingredient_id = 'ING_POTATOES';

-- ING_CLAMS → ING_CLAM
UPDATE product_ingredients
SET ingredient_id = 'ING_CLAM'
WHERE ingredient_id = 'ING_CLAMS';

-- ING_MUSSELS → ING_MUSSEL
UPDATE product_ingredients
SET ingredient_id = 'ING_MUSSEL'
WHERE ingredient_id = 'ING_MUSSELS';

-- ING_CHERRY_TOMATOES → ING_CHERRY_TOMATO
UPDATE product_ingredients
SET ingredient_id = 'ING_CHERRY_TOMATO'
WHERE ingredient_id = 'ING_CHERRY_TOMATOES';

-- ============================================
-- STEP 2: Elimina ingredienti plurali duplicati
-- ============================================

DELETE FROM ingredients WHERE id = 'ING_BLUEBERRIES';
DELETE FROM ingredients WHERE id = 'ING_DATES';
DELETE FROM ingredients WHERE id = 'ING_PEACHES';
DELETE FROM ingredients WHERE id = 'ING_TOMATOES';
DELETE FROM ingredients WHERE id = 'ING_POTATOES';
DELETE FROM ingredients WHERE id = 'ING_CLAMS';
DELETE FROM ingredients WHERE id = 'ING_MUSSELS';
DELETE FROM ingredients WHERE id = 'ING_CHERRY_TOMATOES';

-- ============================================
-- STEP 3: Verifica
-- ============================================

SELECT 'Migration completed. Verification:' AS status;

-- Verifica che non ci siano più riferimenti ai plurali
SELECT 'Remaining plural references (should be 0):' AS check_type,
       COUNT(*) AS count
FROM product_ingredients
WHERE ingredient_id IN (
  'ING_BLUEBERRIES', 'ING_DATES', 'ING_PEACHES', 'ING_TOMATOES',
  'ING_POTATOES', 'ING_CLAMS', 'ING_MUSSELS', 'ING_CHERRY_TOMATOES'
);

-- Verifica che i singolari esistano
SELECT 'Singular ingredients exist:' AS check_type,
       COUNT(*) AS count
FROM ingredients
WHERE id IN (
  'ING_BLUEBERRY', 'ING_DATE', 'ING_PEACH', 'ING_TOMATO',
  'ING_POTATO', 'ING_CLAM', 'ING_MUSSEL', 'ING_CHERRY_TOMATO'
);
