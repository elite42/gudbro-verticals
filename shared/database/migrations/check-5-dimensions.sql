-- ============================================
-- VERIFICA 5 DIMENSIONI - Ingredienti
-- Esegui in Supabase SQL Editor
-- ============================================

-- 0. TOTALE INGREDIENTI
SELECT 'TOTALE INGREDIENTI' as check_type, COUNT(*) as count FROM ingredients;

-- ============================================
-- DIMENSIONE 1: ALLERGENI
-- Campo: allergens (JSONB)
-- Atteso: {} per ingredienti senza allergeni, {allergen: true} per quelli con
-- ============================================

SELECT '--- DIMENSIONE 1: ALLERGENI ---' as section;

-- Ingredienti con allergens NULL
SELECT 'D1: allergens IS NULL' as check_type, COUNT(*) as count
FROM ingredients WHERE allergens IS NULL;

-- Ingredienti con allergens vuoto {} (corretto per non-allergeni)
SELECT 'D1: allergens = {} (OK)' as check_type, COUNT(*) as count
FROM ingredients WHERE allergens = '{}'::jsonb;

-- Ingredienti con almeno un allergene definito
SELECT 'D1: allergens popolati' as check_type, COUNT(*) as count
FROM ingredients WHERE allergens IS NOT NULL AND allergens != '{}'::jsonb;

-- Esempi di ingredienti senza allergens (primi 10)
SELECT 'D1: Esempi NULL' as note, id, name, category, allergens
FROM ingredients WHERE allergens IS NULL LIMIT 10;

-- ============================================
-- DIMENSIONE 2: INTOLLERANZE
-- Campo: intolerances (JSONB)
-- ============================================

SELECT '--- DIMENSIONE 2: INTOLLERANZE ---' as section;

-- Ingredienti con intolerances NULL
SELECT 'D2: intolerances IS NULL' as check_type, COUNT(*) as count
FROM ingredients WHERE intolerances IS NULL;

-- Ingredienti con intolerances vuoto {}
SELECT 'D2: intolerances = {} (OK)' as check_type, COUNT(*) as count
FROM ingredients WHERE intolerances = '{}'::jsonb;

-- Ingredienti con almeno una intolleranza definita
SELECT 'D2: intolerances popolati' as check_type, COUNT(*) as count
FROM ingredients WHERE intolerances IS NOT NULL AND intolerances != '{}'::jsonb;

-- Esempi di ingredienti senza intolerances (primi 10)
SELECT 'D2: Esempi NULL' as note, id, name, category, intolerances
FROM ingredients WHERE intolerances IS NULL LIMIT 10;

-- ============================================
-- DIMENSIONE 3: DIETE
-- Campo: dietary (JSONB) - contiene vegan, vegetarian, gluten_free, etc.
-- ============================================

SELECT '--- DIMENSIONE 3: DIETE ---' as section;

-- Ingredienti con dietary NULL
SELECT 'D3: dietary IS NULL' as check_type, COUNT(*) as count
FROM ingredients WHERE dietary IS NULL;

-- Ingredienti con dietary vuoto {}
SELECT 'D3: dietary = {} (problematico)' as check_type, COUNT(*) as count
FROM ingredients WHERE dietary = '{}'::jsonb;

-- Ingredienti con dietary popolato
SELECT 'D3: dietary popolati' as check_type, COUNT(*) as count
FROM ingredients WHERE dietary IS NOT NULL AND dietary != '{}'::jsonb;

-- Esempi di ingredienti senza dietary (primi 10)
SELECT 'D3: Esempi NULL' as note, id, name, category, dietary
FROM ingredients WHERE dietary IS NULL LIMIT 10;

-- Verifica campi dietary completi (deve avere vegan, vegetarian, gluten_free, etc.)
SELECT 'D3: dietary senza vegan' as check_type, COUNT(*) as count
FROM ingredients WHERE dietary IS NOT NULL AND dietary->>'vegan' IS NULL;

SELECT 'D3: dietary senza vegetarian' as check_type, COUNT(*) as count
FROM ingredients WHERE dietary IS NOT NULL AND dietary->>'vegetarian' IS NULL;

SELECT 'D3: dietary senza gluten_free' as check_type, COUNT(*) as count
FROM ingredients WHERE dietary IS NOT NULL AND dietary->>'gluten_free' IS NULL;

-- ============================================
-- DIMENSIONE 4: NUTRIZIONE
-- Campo: nutrition (JSONB)
-- ============================================

SELECT '--- DIMENSIONE 4: NUTRIZIONE ---' as section;

-- Ingredienti con nutrition NULL
SELECT 'D4: nutrition IS NULL' as check_type, COUNT(*) as count
FROM ingredients WHERE nutrition IS NULL;

-- Ingredienti con nutrition vuoto {}
SELECT 'D4: nutrition = {} (problematico)' as check_type, COUNT(*) as count
FROM ingredients WHERE nutrition = '{}'::jsonb;

-- Ingredienti con nutrition popolato
SELECT 'D4: nutrition popolati' as check_type, COUNT(*) as count
FROM ingredients WHERE nutrition IS NOT NULL AND nutrition != '{}'::jsonb;

-- Verifica campi nutrition obbligatori
SELECT 'D4: nutrition senza calories' as check_type, COUNT(*) as count
FROM ingredients WHERE nutrition IS NOT NULL AND nutrition->>'calories' IS NULL;

SELECT 'D4: nutrition senza protein' as check_type, COUNT(*) as count
FROM ingredients WHERE nutrition IS NOT NULL AND nutrition->>'protein' IS NULL;

SELECT 'D4: nutrition senza fat' as check_type, COUNT(*) as count
FROM ingredients WHERE nutrition IS NOT NULL AND nutrition->>'fat' IS NULL;

-- Esempi nutrition vuoto o incompleto
SELECT 'D4: Esempi problematici' as note, id, name, category, nutrition
FROM ingredients
WHERE nutrition IS NULL OR nutrition = '{}'::jsonb
   OR nutrition->>'calories' IS NULL
LIMIT 10;

-- ============================================
-- DIMENSIONE 5: PICCANTEZZA
-- Campo: spice_level (INTEGER 0-5)
-- ============================================

SELECT '--- DIMENSIONE 5: PICCANTEZZA ---' as section;

-- Ingredienti con spice_level NULL
SELECT 'D5: spice_level IS NULL' as check_type, COUNT(*) as count
FROM ingredients WHERE spice_level IS NULL;

-- Distribuzione spice_level
SELECT 'D5: spice_level = 0' as check_type, COUNT(*) as count
FROM ingredients WHERE spice_level = 0;

SELECT 'D5: spice_level = 1' as check_type, COUNT(*) as count
FROM ingredients WHERE spice_level = 1;

SELECT 'D5: spice_level = 2' as check_type, COUNT(*) as count
FROM ingredients WHERE spice_level = 2;

SELECT 'D5: spice_level = 3' as check_type, COUNT(*) as count
FROM ingredients WHERE spice_level = 3;

SELECT 'D5: spice_level = 4' as check_type, COUNT(*) as count
FROM ingredients WHERE spice_level = 4;

SELECT 'D5: spice_level = 5' as check_type, COUNT(*) as count
FROM ingredients WHERE spice_level = 5;

-- Ingredienti piccanti senza spice_level (possibili mancanti)
SELECT 'D5: Spezie/peperoncini con spice_level NULL' as note, id, name, category, spice_level
FROM ingredients
WHERE spice_level IS NULL
  AND (category = 'spices' OR name ILIKE '%pepper%' OR name ILIKE '%chili%' OR name ILIKE '%hot%')
LIMIT 20;

-- ============================================
-- RIEPILOGO FINALE
-- ============================================

SELECT '=== RIEPILOGO PROBLEMI ===' as section;

SELECT
  'TOTALE' as dimension,
  (SELECT COUNT(*) FROM ingredients) as total_ingredients,
  (SELECT COUNT(*) FROM ingredients WHERE allergens IS NULL) as d1_allergens_null,
  (SELECT COUNT(*) FROM ingredients WHERE intolerances IS NULL) as d2_intolerances_null,
  (SELECT COUNT(*) FROM ingredients WHERE dietary IS NULL) as d3_dietary_null,
  (SELECT COUNT(*) FROM ingredients WHERE nutrition IS NULL OR nutrition = '{}'::jsonb) as d4_nutrition_missing,
  (SELECT COUNT(*) FROM ingredients WHERE spice_level IS NULL) as d5_spice_null;
