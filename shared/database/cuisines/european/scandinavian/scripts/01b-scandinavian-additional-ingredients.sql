-- Scandinavian Cuisine - Additional Missing Ingredients
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-24
--
-- Additional missing: 5
-- ING_PEA, ING_HERRING, ING_CURRANT, ING_RASPBERRY_JAM, ING_RYE_BREAD

INSERT INTO ingredients (id, slug, name, category, subcategory, allergens, intolerances, dietary, is_common, is_public)
VALUES

-- Fish
('ING_HERRING', 'herring', 'Herring', 'proteins', 'fish',
 '{"fish": true}'::jsonb,
 '{}'::jsonb,
 '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb,
 true, true),

-- Berries (category: fruits)
('ING_CURRANT', 'currant', 'Currant', 'fruits', 'berries',
 '{}'::jsonb,
 '{}'::jsonb,
 '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb,
 true, true),

-- Bread (category: grains)
('ING_RYE_BREAD', 'rye-bread', 'Rye Bread', 'grains', 'bread',
 '{"gluten": true}'::jsonb,
 '{}'::jsonb,
 '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false}'::jsonb,
 true, true),

-- Vegetables
('ING_PEA', 'pea', 'Green Peas', 'vegetables', 'legumes',
 '{}'::jsonb,
 '{}'::jsonb,
 '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb,
 true, true),

-- Jams (category: sweeteners)
('ING_RASPBERRY_JAM', 'raspberry-jam', 'Raspberry Jam', 'sweeteners', null,
 '{}'::jsonb,
 '{}'::jsonb,
 '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb,
 true, true);

-- Verify
SELECT 'Added 5 additional Scandinavian ingredients' AS status, COUNT(*) AS count
FROM ingredients
WHERE id IN ('ING_PEA', 'ING_HERRING', 'ING_CURRANT', 'ING_RASPBERRY_JAM', 'ING_RYE_BREAD');
