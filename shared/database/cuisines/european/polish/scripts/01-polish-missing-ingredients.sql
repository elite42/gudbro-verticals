-- ============================================
-- POLISH CUISINE - Missing Ingredients
-- GUDBRO Database Standards v1.7
--
-- Run this FIRST before schema/data
-- Total: 12 new ingredients
--
-- Schema: allergens JSONB, dietary JSONB
-- ============================================

-- 1. Farmers Cheese (Twarog) - essential for pierogi and sernik
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_FARMERS_CHEESE', 'farmers-cheese', 'Farmers Cheese', 'dairy',
       '{"milk": true}'::jsonb,
       '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": false, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_FARMERS_CHEESE');

-- 2. Kielbasa (Polish sausage)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_KIELBASA', 'kielbasa', 'Kielbasa Sausage', 'proteins',
       '{}'::jsonb,
       '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_KIELBASA');

-- 3. White Sausage (Biala Kielbasa) - for zurek
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_WHITE_SAUSAGE', 'white-sausage', 'White Sausage', 'proteins',
       '{}'::jsonb,
       '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_WHITE_SAUSAGE');

-- 4. Dried Forest Mushrooms
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_DRIED_MUSHROOM', 'dried-mushroom', 'Dried Forest Mushrooms', 'vegetables',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_DRIED_MUSHROOM');

-- 5. Pickled Cucumber
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_PICKLED_CUCUMBER', 'pickled-cucumber', 'Pickled Cucumber', 'vegetables',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PICKLED_CUCUMBER');

-- 6. Parsley Root (Pietruszka)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_PARSLEY_ROOT', 'parsley-root', 'Parsley Root', 'vegetables',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PARSLEY_ROOT');

-- 7. Egg Noodle
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_EGG_NOODLE', 'egg-noodle', 'Egg Noodle', 'grains',
       '{"gluten": true, "eggs": true}'::jsonb,
       '{"vegan": false, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_EGG_NOODLE');

-- 8. Oscypek (Smoked Sheep Cheese from Tatra)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_OSCYPEK', 'oscypek', 'Oscypek Cheese', 'dairy',
       '{"milk": true}'::jsonb,
       '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": false, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_OSCYPEK');

-- 9. Rose Petal Jam (for paczki)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_ROSE_JAM', 'rose-jam', 'Rose Petal Jam', 'sweeteners',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_ROSE_JAM');

-- 10. Plum Jam (Powidla)
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_PLUM_JAM', 'plum-jam', 'Plum Jam', 'sweeteners',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PLUM_JAM');

-- 11. Cranberry Jam
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_CRANBERRY_JAM', 'cranberry-jam', 'Cranberry Jam', 'sweeteners',
       '{}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CRANBERRY_JAM');

-- 12. Sesame Seeds
INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
SELECT 'ING_SESAME', 'sesame', 'Sesame Seeds', 'seeds',
       '{"sesame": true}'::jsonb,
       '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SESAME');

-- Verify insertions
SELECT id, name, category FROM ingredients
WHERE id IN (
  'ING_FARMERS_CHEESE', 'ING_KIELBASA', 'ING_WHITE_SAUSAGE',
  'ING_DRIED_MUSHROOM', 'ING_PICKLED_CUCUMBER', 'ING_PARSLEY_ROOT',
  'ING_EGG_NOODLE', 'ING_OSCYPEK', 'ING_ROSE_JAM',
  'ING_PLUM_JAM', 'ING_CRANBERRY_JAM', 'ING_SESAME'
)
ORDER BY id;
