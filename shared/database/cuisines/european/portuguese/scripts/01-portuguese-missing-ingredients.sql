-- ============================================
-- PORTUGUESE CUISINE - Missing Ingredients
-- GUDBRO Database Standards v1.7
--
-- Run this FIRST before schema/data
-- Total: 15 new ingredients
--
-- NOTE: Uses JSONB format for allergens/dietary
-- ============================================

-- 1. Alheira (Portuguese bread sausage)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_ALHEIRA', 'alheira', 'Alheira Sausage', 'proteins',
       '{"gluten": true}'::jsonb,
       '{"vegan": false, "vegetarian": false, "gluten_free": false, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_ALHEIRA');

-- 2. Linguica (Portuguese smoked sausage)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_LINGUICA', 'linguica', 'Linguica Sausage', 'proteins',
       '{}'::jsonb,
       '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_LINGUICA');

-- 3. Piri-Piri (African Bird's Eye Chili)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_PIRI_PIRI', 'piri-piri', 'Piri-Piri Chili', 'spices',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PIRI_PIRI');

-- 4. Suckling Pig (Leitao)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_SUCKLING_PIG', 'suckling-pig', 'Suckling Pig', 'proteins',
       '{}'::jsonb,
       '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SUCKLING_PIG');

-- 5. Pepper Paste (Massa de Pimentao)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_PEPPER_PASTE', 'pepper-paste', 'Pepper Paste', 'condiments',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PEPPER_PASTE');

-- 6. Marie Biscuit
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_MARIE_BISCUIT', 'marie-biscuit', 'Marie Biscuit', 'grains',
       '{"gluten": true, "milk": true}'::jsonb,
       '{"vegan": false, "vegetarian": true, "gluten_free": false, "dairy_free": false, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_MARIE_BISCUIT');

-- 7. Wafer (for Ovos Moles)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_WAFER', 'wafer', 'Wafer Sheet', 'grains',
       '{"gluten": true}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_WAFER');

-- 8. Sardine
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_SARDINE', 'sardine', 'Sardine', 'proteins',
       '{"fish": true}'::jsonb,
       '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SARDINE');

-- 9. Fresh Cheese (Queijo Fresco)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_FRESH_CHEESE', 'fresh-cheese', 'Fresh Cheese', 'dairy',
       '{"milk": true}'::jsonb,
       '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": false, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_FRESH_CHEESE');

-- 10. Blood Sausage (Morcela)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_BLOOD_SAUSAGE', 'blood-sausage', 'Blood Sausage', 'proteins',
       '{}'::jsonb,
       '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_BLOOD_SAUSAGE');

-- 11. Clam
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_CLAM', 'clam', 'Clam', 'proteins',
       '{"mollusks": true}'::jsonb,
       '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CLAM');

-- 12. Mussel
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_MUSSEL', 'mussel', 'Mussel', 'proteins',
       '{"mollusks": true}'::jsonb,
       '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_MUSSEL');

-- 13. Pine Nut
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_PINE_NUT', 'pine-nut', 'Pine Nut', 'nuts',
       '{"nuts": true}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": false}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PINE_NUT');

-- 14. Red Bean (Kidney Bean)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_RED_BEAN', 'red-bean', 'Red Kidney Bean', 'legumes',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_RED_BEAN');

-- 15. White Bean (Cannellini)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_WHITE_BEAN', 'white-bean', 'White Bean', 'legumes',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_WHITE_BEAN');

-- Verify insertions
SELECT id, name, category FROM ingredients
WHERE id IN (
  'ING_ALHEIRA', 'ING_LINGUICA', 'ING_PIRI_PIRI', 'ING_SUCKLING_PIG',
  'ING_PEPPER_PASTE', 'ING_MARIE_BISCUIT', 'ING_WAFER', 'ING_SARDINE',
  'ING_FRESH_CHEESE', 'ING_BLOOD_SAUSAGE', 'ING_CLAM', 'ING_MUSSEL',
  'ING_PINE_NUT', 'ING_RED_BEAN', 'ING_WHITE_BEAN'
)
ORDER BY id;
