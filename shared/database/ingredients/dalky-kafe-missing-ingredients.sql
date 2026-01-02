-- ============================================================================
-- GUDBRO - Dalky Kafe Missing Ingredients
-- Generated: 2026-01-02
-- Purpose: Add 3 missing ingredients for Vietnamese coffee shop menu support
-- ============================================================================
--
-- CONTEXT: Analysis of Dalky Kafe (Da Nang, Vietnam) menu revealed only 3
-- missing ingredients from our 2548-ingredient database (99.9% coverage!)
--
-- INGREDIENTS TO ADD:
--   1. ING_PEACH_TEA - Peach flavored tea (for fruit teas category)
--   2. ING_LYCHEE_TEA - Lychee flavored tea (for fruit teas category)
--   3. ING_NEM_NUONG - Vietnamese grilled pork sausage (for bánh mì)
--
-- EXECUTION ORDER:
--   1. Run STEP 1: Insert ingredients
--   2. Run STEP 2: Update nutrition data
--   3. Verify with SELECT queries
--
-- ============================================================================

-- ============================================================================
-- STEP 1: INSERT NEW INGREDIENTS
-- ============================================================================

-- 1. Peach Tea (Flavored tea base for Vietnamese fruit tea drinks)
INSERT INTO ingredients (
  id, slug, name, category, subcategory,
  allergens, intolerances, dietary,
  spice_level, is_common, is_premium, storage_temp,
  created_at, updated_at
)
VALUES (
  'ING_PEACH_TEA',
  'peach-tea',
  'Peach Tea',
  'tea',
  'flavored',
  '{}'::jsonb,                    -- No allergens
  '{"caffeine":true}'::jsonb,     -- Contains caffeine (black tea base)
  '{"vegetarian":true,"vegan":true,"pescatarian":true,"gluten_free":true,"dairy_free":true,"nut_free":true}'::jsonb,
  0,                              -- No spice
  true,                           -- Common ingredient
  false,                          -- Not premium
  'room_temp',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- 2. Lychee Tea (Flavored tea base for Vietnamese fruit tea drinks)
INSERT INTO ingredients (
  id, slug, name, category, subcategory,
  allergens, intolerances, dietary,
  spice_level, is_common, is_premium, storage_temp,
  created_at, updated_at
)
VALUES (
  'ING_LYCHEE_TEA',
  'lychee-tea',
  'Lychee Tea',
  'tea',
  'flavored',
  '{}'::jsonb,                    -- No allergens
  '{"caffeine":true}'::jsonb,     -- Contains caffeine (black tea base)
  '{"vegetarian":true,"vegan":true,"pescatarian":true,"gluten_free":true,"dairy_free":true,"nut_free":true}'::jsonb,
  0,                              -- No spice
  true,                           -- Common ingredient
  false,                          -- Not premium
  'room_temp',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- 3. Nem Nướng (Vietnamese Grilled Pork Sausage - essential for bánh mì)
INSERT INTO ingredients (
  id, slug, name, category, subcategory,
  allergens, intolerances, dietary,
  spice_level, is_common, is_premium, storage_temp,
  created_at, updated_at
)
VALUES (
  'ING_NEM_NUONG',
  'nem-nuong',
  'Nem Nướng (Vietnamese Grilled Pork Sausage)',
  'sausages',                     -- Category: sausages (fresh/cooked)
  'vietnamese',                   -- Subcategory: vietnamese
  '{}'::jsonb,                    -- No major allergens (just pork)
  '{}'::jsonb,                    -- No intolerances
  '{"vegetarian":false,"vegan":false,"pescatarian":false,"gluten_free":true,"dairy_free":true,"nut_free":true,"halal":false,"non_halal":true,"kosher":false}'::jsonb,
  1,                              -- Mild spice (some recipes include chili)
  true,                           -- Common in Vietnamese cuisine
  false,                          -- Not premium
  'refrigerated',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 2: UPDATE NUTRITION DATA
-- ============================================================================
-- Nutrition values are per 100g/100ml
-- Sources:
--   - Peach Tea: https://www.mynetdiary.com/food/calories-in-peach-tea
--   - Lychee Tea: https://www.snapcalorie.com/nutrition/lychee_tea_nutrition.html
--   - Nem Nuong: https://www.snapcalorie.com/nutrition/nem_nuong_nutrition.html

-- Peach Tea (sweetened, commercial average per 100ml)
UPDATE ingredients
SET nutrition = '{
  "calories": 30,
  "protein": 0.0,
  "carbohydrates": 7.5,
  "fat": 0.0,
  "fiber": 0.0,
  "sugar": 7.0,
  "sodium": 5,
  "caffeine_mg": 15
}'::jsonb
WHERE id = 'ING_PEACH_TEA';

-- Lychee Tea (sweetened, commercial average per 100ml)
UPDATE ingredients
SET nutrition = '{
  "calories": 35,
  "protein": 0.0,
  "carbohydrates": 8.5,
  "fat": 0.0,
  "fiber": 0.0,
  "sugar": 8.0,
  "sodium": 5,
  "caffeine_mg": 15
}'::jsonb
WHERE id = 'ING_LYCHEE_TEA';

-- Nem Nướng (per 100g)
UPDATE ingredients
SET nutrition = '{
  "calories": 200,
  "protein": 13.0,
  "carbohydrates": 3.0,
  "fat": 15.0,
  "fiber": 0.0,
  "sugar": 1.0,
  "sodium": 650
}'::jsonb
WHERE id = 'ING_NEM_NUONG';

-- ============================================================================
-- STEP 3: VERIFICATION QUERIES
-- ============================================================================

-- Verify insertions
SELECT id, name, category, subcategory, is_common
FROM ingredients
WHERE id IN ('ING_PEACH_TEA', 'ING_LYCHEE_TEA', 'ING_NEM_NUONG');

-- Verify nutrition data
SELECT id, name, nutrition
FROM ingredients
WHERE id IN ('ING_PEACH_TEA', 'ING_LYCHEE_TEA', 'ING_NEM_NUONG');

-- Count total ingredients after insertion
SELECT COUNT(*) as total_ingredients FROM ingredients;

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================
-- DELETE FROM ingredients WHERE id IN ('ING_PEACH_TEA', 'ING_LYCHEE_TEA', 'ING_NEM_NUONG');
