-- Russian Cuisine - Missing Ingredients
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-25
--
-- Total new ingredients: 6

-- 1. Agar (vegetable gelatin)
INSERT INTO ingredients (id, slug, name, category, subcategory, allergens, dietary, is_common, is_public)
VALUES (
  'ING_AGAR',
  'agar',
  'Agar Agar',
  'other',
  'thickeners',
  '{}'::jsonb,
  '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb,
  false,
  true
);

-- 2. Buckwheat (groats, not noodles)
INSERT INTO ingredients (id, slug, name, category, subcategory, allergens, dietary, is_common, is_public)
VALUES (
  'ING_BUCKWHEAT',
  'buckwheat',
  'Buckwheat Groats',
  'grains',
  'whole_grains',
  '{}'::jsonb,
  '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb,
  true,
  true
);

-- 3. Kefir (fermented milk drink)
INSERT INTO ingredients (id, slug, name, category, subcategory, allergens, dietary, is_common, is_public)
VALUES (
  'ING_KEFIR',
  'kefir',
  'Kefir',
  'dairy',
  'fermented',
  '{"dairy": true}'::jsonb,
  '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": false, "nut_free": true}'::jsonb,
  true,
  true
);

-- 4. Millet (grain)
INSERT INTO ingredients (id, slug, name, category, subcategory, allergens, dietary, is_common, is_public)
VALUES (
  'ING_MILLET',
  'millet',
  'Millet',
  'grains',
  'whole_grains',
  '{}'::jsonb,
  '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb,
  false,
  true
);

-- 5. Potato Chip
INSERT INTO ingredients (id, slug, name, category, subcategory, allergens, dietary, is_common, is_public)
VALUES (
  'ING_POTATO_CHIP',
  'potato-chip',
  'Potato Chips',
  'other',
  'snacks',
  '{}'::jsonb,
  '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb,
  true,
  true
);

-- 6. Sunflower Oil
INSERT INTO ingredients (id, slug, name, category, subcategory, allergens, dietary, is_common, is_public)
VALUES (
  'ING_SUNFLOWER_OIL',
  'sunflower-oil',
  'Sunflower Oil',
  'fats',
  'oils',
  '{}'::jsonb,
  '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb,
  true,
  true
);

-- Verify
SELECT 'Russian missing ingredients added' AS status, COUNT(*) AS count
FROM ingredients
WHERE id IN ('ING_AGAR', 'ING_BUCKWHEAT', 'ING_KEFIR', 'ING_MILLET', 'ING_POTATO_CHIP', 'ING_SUNFLOWER_OIL');
