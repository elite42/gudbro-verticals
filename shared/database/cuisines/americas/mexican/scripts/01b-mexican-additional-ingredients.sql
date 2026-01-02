-- ============================================
-- GUDBRO Mexican - Additional Missing Ingredients
-- Generated: 2025-12-20
-- Purpose: Add ingredients missing from original script
-- ============================================

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
-- NUTS & SEEDS
('ING_ALMONDS', 'almonds', 'Almonds', 'Sweet tree nuts used in moles and desserts.', 'nuts', 'tree_nuts', '{"nuts": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_PEPITAS', 'pepitas', 'Pepitas', 'Hulled pumpkin seeds, essential for pipián and mole verde.', 'nuts', 'seeds', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),

-- HERBS & LEAVES
('ING_BAY_LEAVES', 'bay-leaves', 'Bay Leaves', 'Aromatic dried leaves used in stews and braised meats.', 'herbs', 'dried', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_EPAZOTE', 'epazote', 'Epazote', 'Pungent Mexican herb essential for black beans and quesadillas. Distinctive flavor.', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, false, 'refrigerated'),
('ING_THYME', 'thyme', 'Thyme', 'Aromatic herb with earthy, slightly minty flavor.', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_AVOCADO_LEAF', 'avocado-leaf', 'Avocado Leaf', 'Aromatic leaf with anise flavor, used in Oaxacan cooking and barbacoa.', 'herbs', 'dried', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, true, 'room_temp'),

-- WRAPPING LEAVES
('ING_BANANA_LEAF', 'banana-leaf', 'Banana Leaf', 'Large tropical leaf used to wrap tamales and cochinita pibil.', 'other', 'wrapping', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'frozen'),
('ING_MAGUEY_LEAF', 'maguey-leaf', 'Maguey Leaf', 'Agave leaf used to wrap barbacoa for pit cooking. Imparts subtle flavor.', 'other', 'wrapping', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, true, 'refrigerated'),

-- MEATS
('ING_BEEF_SKIRT', 'beef-skirt', 'Beef Skirt Steak', 'Flavorful cut from the diaphragm, ideal for carne asada and fajitas.', 'proteins', 'beef', '{}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_BEEF_GROUND', 'beef-ground', 'Ground Beef', 'Minced beef for picadillo, tacos, and fillings.', 'proteins', 'beef', '{}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_GOAT', 'goat', 'Goat Meat', 'Lean, flavorful meat traditional for birria and cabrito.', 'proteins', 'game', '{}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true, "halal": true}', NULL, 0, false, true, 'refrigerated'),

-- FATS
('ING_LARD', 'lard', 'Lard', 'Rendered pork fat essential for authentic tamales, carnitas, and refried beans.', 'oils', 'animal_fat', '{}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_ASIENTO', 'asiento', 'Asiento', 'Unrefined pork lard with sediment, used for tlayudas in Oaxaca. Rich, porky flavor.', 'oils', 'animal_fat', '{}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, true, 'refrigerated'),

-- VEGETABLES
('ING_NOPALES', 'nopales', 'Nopales', 'Edible cactus paddles with tangy, green bean-like flavor. Iconic Mexican ingredient.', 'vegetables', 'cactus', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_SQUASH_BLOSSOM', 'squash-blossom', 'Squash Blossom', 'Delicate edible flowers from squash plants, used in quesadillas and soups.', 'vegetables', 'flowers', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, true, 'refrigerated'),
('ING_HUITLACOCHE', 'huitlacoche', 'Huitlacoche', 'Corn smut fungus, a prized Mexican delicacy with earthy, mushroom-like flavor.', 'vegetables', 'fungi', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, true, 'refrigerated'),
('ING_CORN_COB', 'corn-cob', 'Corn on the Cob', 'Fresh whole corn for elote and esquites.', 'vegetables', 'corn', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_CORN_KERNELS', 'corn-kernels', 'Corn Kernels', 'Fresh or frozen corn kernels for esquites and salsas.', 'vegetables', 'corn', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),

-- GRAINS & LEGUMES
('ING_HOMINY', 'hominy', 'Hominy', 'Dried corn kernels treated with lime, essential for pozole. Chewy texture.', 'grains', 'corn', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_PINTO_BEANS', 'pinto-beans', 'Pinto Beans', 'Speckled beans popular in northern Mexico for refried beans.', 'legumes', 'beans', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),

-- FRUITS
('ING_PLANTAIN', 'plantain', 'Plantain', 'Starchy cooking banana used in moles and as a side dish.', 'fruits', 'tropical', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_SOUR_ORANGE', 'sour-orange', 'Sour Orange', 'Bitter orange essential for Yucatecan marinades like cochinita pibil.', 'fruits', 'citrus', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, false, 'refrigerated'),
('ING_POMEGRANATE', 'pomegranate', 'Pomegranate', 'Jewel-like seeds used for chiles en nogada garnish.', 'fruits', 'berries', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_PEAR', 'pear', 'Pear', 'Sweet fruit used in picadillo for chiles en nogada.', 'fruits', 'pome', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),

-- SPICES
('ING_CLOVES', 'cloves', 'Cloves', 'Aromatic dried flower buds with warm, sweet flavor. Used in moles.', 'spices', 'whole', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),

-- OTHER
('ING_FRENCH_FRIES', 'french-fries', 'French Fries', 'Fried potato strips, essential for California burritos.', 'vegetables', 'potato', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'frozen')

ON CONFLICT DO NOTHING;

-- Verification
DO $$
DECLARE
  cnt INTEGER;
BEGIN
  SELECT COUNT(*) INTO cnt FROM ingredients WHERE id LIKE 'ING_%' AND id IN (
    'ING_ALMONDS', 'ING_PEPITAS', 'ING_BAY_LEAVES', 'ING_EPAZOTE', 'ING_THYME',
    'ING_AVOCADO_LEAF', 'ING_BANANA_LEAF', 'ING_MAGUEY_LEAF', 'ING_BEEF_SKIRT',
    'ING_BEEF_GROUND', 'ING_GOAT', 'ING_LARD', 'ING_ASIENTO', 'ING_NOPALES',
    'ING_SQUASH_BLOSSOM', 'ING_HUITLACOCHE', 'ING_CORN_COB', 'ING_CORN_KERNELS',
    'ING_HOMINY', 'ING_PINTO_BEANS', 'ING_PLANTAIN', 'ING_SOUR_ORANGE',
    'ING_POMEGRANATE', 'ING_PEAR', 'ING_CLOVES', 'ING_FRENCH_FRIES'
  );
  RAISE NOTICE 'Additional Mexican ingredients added: % of 26', cnt;
END $$;
