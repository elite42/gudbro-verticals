-- Scandinavian Cuisine - Missing Ingredients
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-24
--
-- Missing ingredients: 12 (after checking existing)
-- Already exist: ING_JUNIPER_BERRIES, ING_SWEDE (rutabaga)
--
-- New: ING_REINDEER, ING_VENDACE, ING_CLOUDBERRY, ING_BILBERRY,
--      ING_FLATBREAD, ING_LIVER_PATE, ING_PICKLED_BEET,
--      ING_PEA, ING_HERRING, ING_CURRANT, ING_RASPBERRY_JAM, ING_RYE_BREAD

INSERT INTO ingredients (id, slug, name, category, subcategory, allergens, intolerances, dietary, is_common, is_public)
VALUES

-- Game meat
('ING_REINDEER', 'reindeer', 'Reindeer Meat', 'proteins', 'game',
 '{}'::jsonb,
 '{}'::jsonb,
 '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb,
 false, true),

-- Fish
('ING_VENDACE', 'vendace', 'Vendace', 'proteins', 'fish',
 '{"fish": true}'::jsonb,
 '{}'::jsonb,
 '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb,
 false, true),

('ING_HERRING', 'herring', 'Herring', 'proteins', 'fish',
 '{"fish": true}'::jsonb,
 '{}'::jsonb,
 '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb,
 true, true),

-- Berries (category: fruits)
('ING_CLOUDBERRY', 'cloudberry', 'Cloudberry', 'fruits', 'berries',
 '{}'::jsonb,
 '{}'::jsonb,
 '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb,
 false, true),

('ING_BILBERRY', 'bilberry', 'Bilberry', 'fruits', 'berries',
 '{}'::jsonb,
 '{}'::jsonb,
 '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb,
 true, true),

('ING_CURRANT', 'currant', 'Currant', 'fruits', 'berries',
 '{}'::jsonb,
 '{}'::jsonb,
 '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb,
 true, true),

-- Bread (category: grains)
('ING_FLATBREAD', 'flatbread', 'Flatbread', 'grains', 'bread',
 '{"gluten": true}'::jsonb,
 '{}'::jsonb,
 '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false}'::jsonb,
 true, true),

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

-- Prepared foods (category: proteins for liver pate)
('ING_LIVER_PATE', 'liver-pate', 'Liver Pate', 'proteins', 'processed',
 '{}'::jsonb,
 '{}'::jsonb,
 '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": false, "gluten_free": false}'::jsonb,
 true, true),

-- Pickled vegetables (category: vegetables)
('ING_PICKLED_BEET', 'pickled-beet', 'Pickled Beet', 'vegetables', 'pickled',
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
SELECT 'Added 12 Scandinavian ingredients' AS status, COUNT(*) AS count
FROM ingredients
WHERE id IN ('ING_REINDEER', 'ING_VENDACE', 'ING_CLOUDBERRY', 'ING_BILBERRY',
             'ING_FLATBREAD', 'ING_LIVER_PATE', 'ING_PICKLED_BEET',
             'ING_PEA', 'ING_HERRING', 'ING_CURRANT', 'ING_RASPBERRY_JAM', 'ING_RYE_BREAD');
