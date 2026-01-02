-- ============================================
-- GUDBRO Steaks - Missing Ingredients
-- 62 ingredients needed for steaks database
-- Execute in Supabase SQL Editor BEFORE creating product_ingredients links
-- Uses ON CONFLICT to skip existing ingredients
-- ============================================

-- =====================================================
-- BEEF CUTS (18)
-- =====================================================

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BEEF', 'beef', 'Beef', 'General beef meat', 'proteins', 'red_meat', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 250, "protein_g": 26, "fat_g": 15}', 0, true, false, 'refrigerated'),
('ING_BEEF_RIBEYE', 'beef-ribeye', 'Beef Ribeye', 'Well-marbled, flavorful steak cut from the rib section', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 291, "protein_g": 24, "fat_g": 21}', 0, true, true, 'refrigerated'),
('ING_BEEF_TENDERLOIN', 'beef-tenderloin', 'Beef Tenderloin', 'Most tender cut, lean and buttery', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 218, "protein_g": 26, "fat_g": 12}', 0, true, true, 'refrigerated'),
('ING_BEEF_STRIP', 'beef-strip', 'Beef Strip (NY Strip)', 'Flavorful strip steak with good marbling', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 271, "protein_g": 25, "fat_g": 18}', 0, true, true, 'refrigerated'),
('ING_BEEF_PORTERHOUSE', 'beef-porterhouse', 'Beef Porterhouse', 'T-bone with larger tenderloin portion', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 276, "protein_g": 24, "fat_g": 19}', 0, false, true, 'refrigerated'),
('ING_BEEF_TBONE', 'beef-tbone', 'Beef T-Bone', 'Classic steak with strip and tenderloin', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 270, "protein_g": 24, "fat_g": 19}', 0, true, true, 'refrigerated'),
('ING_BEEF_PRIME_RIB', 'beef-prime-rib', 'Beef Prime Rib', 'Standing rib roast, rich and juicy', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 295, "protein_g": 23, "fat_g": 22}', 0, false, true, 'refrigerated'),
('ING_BEEF_FLAT_IRON', 'beef-flat-iron', 'Beef Flat Iron', 'Tender shoulder cut, great value', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 215, "protein_g": 25, "fat_g": 12}', 0, true, false, 'refrigerated'),
('ING_BEEF_HANGER', 'beef-hanger', 'Beef Hanger Steak', 'Butchers cut with intense flavor', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 230, "protein_g": 26, "fat_g": 14}', 0, true, false, 'refrigerated'),
('ING_BEEF_SKIRT', 'beef-skirt', 'Beef Skirt Steak', 'Long flat cut, perfect for fajitas', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 225, "protein_g": 24, "fat_g": 14}', 0, true, false, 'refrigerated'),
('ING_BEEF_FLANK', 'beef-flank', 'Beef Flank Steak', 'Lean and flavorful, slices well', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 192, "protein_g": 27, "fat_g": 9}', 0, true, false, 'refrigerated'),
('ING_BEEF_PICANHA', 'beef-picanha', 'Beef Picanha', 'Brazilian top sirloin cap with fat cap', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 265, "protein_g": 25, "fat_g": 18}', 0, false, true, 'refrigerated'),
('ING_BEEF_SHORT_RIBS', 'beef-short-ribs', 'Beef Short Ribs', 'Meaty ribs, great for braising or grilling', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 295, "protein_g": 22, "fat_g": 23}', 0, true, false, 'refrigerated'),
('ING_BEEF_RIBS', 'beef-ribs', 'Beef Ribs', 'Large beef ribs for BBQ', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 310, "protein_g": 21, "fat_g": 25}', 0, true, false, 'refrigerated'),
('ING_BEEF_BRISKET', 'beef-brisket', 'Beef Brisket', 'Classic BBQ cut, low and slow', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 245, "protein_g": 26, "fat_g": 15}', 0, true, false, 'refrigerated'),
('ING_BEEF_CHIANINA', 'beef-chianina', 'Chianina Beef', 'Premium Tuscan breed for Fiorentina', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 250, "protein_g": 27, "fat_g": 14}', 0, false, true, 'refrigerated'),
('ING_WAGYU_BEEF', 'wagyu-beef', 'Wagyu Beef', 'Japanese premium beef with intense marbling', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 350, "protein_g": 22, "fat_g": 30}', 0, false, true, 'refrigerated'),
('ING_GROUND_BEEF', 'ground-beef', 'Ground Beef', 'Minced beef for kebabs and burgers', 'proteins', 'beef_cuts', '{"beef": true}', '{"is_meat": true}', '{"calories_per_100g": 254, "protein_g": 17, "fat_g": 20}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- =====================================================
-- LAMB CUTS (6)
-- =====================================================

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_LAMB', 'lamb', 'Lamb', 'General lamb meat', 'proteins', 'red_meat', '{}', '{"is_meat": true, "is_halal_option": true}', '{"calories_per_100g": 282, "protein_g": 25, "fat_g": 20}', 0, true, false, 'refrigerated'),
('ING_LAMB_RACK', 'lamb-rack', 'Rack of Lamb', 'Elegant French-cut rack', 'proteins', 'lamb_cuts', '{}', '{"is_meat": true, "is_halal_option": true}', '{"calories_per_100g": 290, "protein_g": 24, "fat_g": 21}', 0, false, true, 'refrigerated'),
('ING_LAMB_CHOPS', 'lamb-chops', 'Lamb Chops', 'Individual chops from the loin', 'proteins', 'lamb_cuts', '{}', '{"is_meat": true, "is_halal_option": true}', '{"calories_per_100g": 275, "protein_g": 25, "fat_g": 19}', 0, true, false, 'refrigerated'),
('ING_LAMB_SHANK', 'lamb-shank', 'Lamb Shank', 'Braising cut, rich and tender', 'proteins', 'lamb_cuts', '{}', '{"is_meat": true, "is_halal_option": true}', '{"calories_per_100g": 260, "protein_g": 26, "fat_g": 17}', 0, true, false, 'refrigerated'),
('ING_LAMB_LEG', 'lamb-leg', 'Leg of Lamb', 'Classic roasting joint', 'proteins', 'lamb_cuts', '{}', '{"is_meat": true, "is_halal_option": true}', '{"calories_per_100g": 238, "protein_g": 27, "fat_g": 14}', 0, true, false, 'refrigerated'),
('ING_GROUND_LAMB', 'ground-lamb', 'Ground Lamb', 'Minced lamb for kebabs', 'proteins', 'lamb_cuts', '{}', '{"is_meat": true, "is_halal_option": true}', '{"calories_per_100g": 282, "protein_g": 24, "fat_g": 21}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- =====================================================
-- OTHER PROTEINS (5)
-- =====================================================

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_VEAL', 'veal', 'Veal', 'Young calf meat, tender and delicate', 'proteins', 'red_meat', '{}', '{"is_meat": true}', '{"calories_per_100g": 196, "protein_g": 28, "fat_g": 9}', 0, true, false, 'refrigerated'),
('ING_VEAL_SHANK', 'veal-shank', 'Veal Shank', 'Classic for ossobuco', 'proteins', 'veal_cuts', '{}', '{"is_meat": true}', '{"calories_per_100g": 180, "protein_g": 27, "fat_g": 7}', 0, true, false, 'refrigerated'),
('ING_PORK_RIBS', 'pork-ribs', 'Pork Ribs', 'Baby back or spare ribs', 'proteins', 'pork_cuts', '{"pork": true}', '{"is_meat": true}', '{"calories_per_100g": 277, "protein_g": 23, "fat_g": 20}', 0, true, false, 'refrigerated'),
('ING_CHICKEN', 'chicken', 'Chicken', 'Whole or parts, versatile poultry', 'proteins', 'poultry', '{}', '{"is_meat": true, "is_halal_option": true}', '{"calories_per_100g": 239, "protein_g": 27, "fat_g": 14}', 0, true, false, 'refrigerated'),
('ING_TAIL_FAT', 'tail-fat', 'Lamb Tail Fat', 'Traditional Middle Eastern fat for kebabs', 'proteins', 'specialty', '{}', '{"is_meat": true}', '{"calories_per_100g": 750, "protein_g": 2, "fat_g": 82}', 0, false, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SPECIALTY ITEMS (4)
-- =====================================================

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BONE_MARROW', 'bone-marrow', 'Bone Marrow', 'Rich, buttery marrow from beef bones', 'proteins', 'offal', '{"beef": true}', '{}', '{"calories_per_100g": 780, "protein_g": 7, "fat_g": 84}', 0, false, true, 'refrigerated'),
('ING_PUFF_PASTRY', 'puff-pastry', 'Puff Pastry', 'Flaky layered pastry dough', 'grains', 'pastry', '{"gluten": true, "dairy": true}', '{}', '{"calories_per_100g": 558, "protein_g": 7, "fat_g": 38}', 0, true, false, 'frozen'),
('ING_PIDE_BREAD', 'pide-bread', 'Pide Bread', 'Turkish flatbread', 'bread', 'flatbread', '{"gluten": true}', '{}', '{"calories_per_100g": 275, "protein_g": 9, "fat_g": 3}', 0, true, false, 'room_temp'),
('ING_YOGURT', 'yogurt', 'Yogurt', 'Plain yogurt for marinades and sauces', 'dairy', 'fermented', '{"dairy": true}', '{"is_vegetarian": true}', '{"calories_per_100g": 59, "protein_g": 10, "fat_g": 0.7}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- =====================================================
-- HERBS & AROMATICS (3)
-- =====================================================

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, storage_temp)
VALUES
('ING_THYME', 'thyme', 'Fresh Thyme', 'Aromatic herb for roasts and grills', 'herbs', 'fresh_herbs', '{}', '{"is_vegan": true}', '{"calories_per_100g": 101, "protein_g": 6, "fat_g": 2}', 0, true, 'refrigerated'),
('ING_LEMON', 'lemon', 'Lemon', 'Fresh citrus for finishing and marinades', 'fruits', 'citrus', '{}', '{"is_vegan": true}', '{"calories_per_100g": 29, "protein_g": 1, "fat_g": 0.3}', 0, true, 'refrigerated'),
('ING_PEAR', 'pear', 'Pear', 'Used in Korean marinades for tenderizing', 'fruits', 'pome', '{}', '{"is_vegan": true}', '{"calories_per_100g": 57, "protein_g": 0.4, "fat_g": 0.1}', 0, true, 'room_temp')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SPICES & SEASONINGS (19)
-- =====================================================

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, storage_temp)
VALUES
('ING_COARSE_SALT', 'coarse-salt', 'Coarse Salt', 'Coarse grain salt for steaks', 'spices', 'salt', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_ALLSPICE', 'allspice', 'Allspice', 'Warm spice for jerk and Caribbean dishes', 'spices', 'whole_spices', '{}', '{"is_vegan": true}', '{}', 1, true, 'room_temp'),
('ING_CUMIN', 'cumin', 'Cumin', 'Earthy spice essential for Middle Eastern cuisine', 'spices', 'ground_spices', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_CINNAMON', 'cinnamon', 'Cinnamon', 'Sweet warm spice', 'spices', 'ground_spices', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_TURMERIC', 'turmeric', 'Turmeric', 'Golden spice for color and flavor', 'spices', 'ground_spices', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_SMOKED_PAPRIKA', 'smoked-paprika', 'Smoked Paprika', 'Spanish pimentón for smoky flavor', 'spices', 'ground_spices', '{}', '{"is_vegan": true}', '{}', 1, true, 'room_temp'),
('ING_GARLIC_POWDER', 'garlic-powder', 'Garlic Powder', 'Dried garlic for rubs', 'spices', 'ground_spices', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_CHILI_POWDER', 'chili-powder', 'Chili Powder', 'Blend of chilies and spices', 'spices', 'ground_spices', '{}', '{"is_vegan": true}', '{}', 2, true, 'room_temp'),
('ING_CARAWAY', 'caraway', 'Caraway Seeds', 'Aromatic seeds for German cuisine', 'spices', 'whole_spices', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_SUMAC', 'sumac', 'Sumac', 'Tangy Middle Eastern spice', 'spices', 'ground_spices', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_GARAM_MASALA', 'garam-masala', 'Garam Masala', 'Indian spice blend', 'spices', 'spice_blends', '{}', '{"is_vegan": true}', '{}', 1, true, 'room_temp'),
('ING_SEVEN_SPICE', 'seven-spice', 'Seven Spice (Baharat)', 'Lebanese spice blend', 'spices', 'spice_blends', '{}', '{"is_vegan": true}', '{}', 1, true, 'room_temp'),
('ING_SHAWARMA_SPICE', 'shawarma-spice', 'Shawarma Spice', 'Middle Eastern spice blend for shawarma', 'spices', 'spice_blends', '{}', '{"is_vegan": true}', '{}', 1, true, 'room_temp'),
('ING_RED_PEPPER_FLAKES', 'red-pepper-flakes', 'Red Pepper Flakes', 'Crushed dried chili peppers', 'spices', 'chili', '{}', '{"is_vegan": true}', '{}', 2, true, 'room_temp'),
('ING_KASHMIRI_CHILI', 'kashmiri-chili', 'Kashmiri Chili', 'Mild red chili for tandoori', 'spices', 'chili', '{}', '{"is_vegan": true}', '{}', 2, true, 'room_temp'),
('ING_PIRI_PIRI_CHILI', 'piri-piri-chili', 'Piri Piri Chili', 'African birds eye chili', 'spices', 'chili', '{}', '{"is_vegan": true}', '{}', 4, true, 'room_temp'),
('ING_SCOTCH_BONNET', 'scotch-bonnet', 'Scotch Bonnet Chili', 'Fiery Caribbean chili', 'spices', 'chili', '{}', '{"is_vegan": true}', '{}', 5, true, 'refrigerated'),
('ING_SAFFRON', 'saffron', 'Saffron', 'Precious spice for Persian cuisine', 'spices', 'whole_spices', '{}', '{"is_vegan": true}', '{}', 0, false, 'room_temp'),
('ING_HORSERADISH', 'horseradish', 'Horseradish', 'Pungent root for sauces', 'vegetables', 'roots', '{}', '{"is_vegan": true}', '{}', 2, true, 'refrigerated')
ON CONFLICT DO NOTHING;

-- =====================================================
-- CONDIMENTS & SAUCES (7)
-- =====================================================

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, storage_temp)
VALUES
('ING_MUSTARD', 'mustard', 'Mustard', 'Prepared yellow or whole grain mustard', 'condiments', 'mustard', '{"mustard": true}', '{"is_vegan": true}', '{}', 1, true, 'refrigerated'),
('ING_DIJON_MUSTARD', 'dijon-mustard', 'Dijon Mustard', 'French smooth mustard', 'condiments', 'mustard', '{"mustard": true}', '{"is_vegan": true}', '{}', 1, true, 'refrigerated'),
('ING_TOMATO_SAUCE', 'tomato-sauce', 'Tomato Sauce', 'Cooked tomato puree', 'sauces', 'tomato_based', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_VINEGAR', 'vinegar', 'Vinegar', 'General purpose vinegar', 'vinegars', 'wine_vinegar', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_APPLE_CIDER_VINEGAR', 'apple-cider-vinegar', 'Apple Cider Vinegar', 'Tangy fermented apple vinegar', 'vinegars', 'fruit_vinegar', '{}', '{"is_vegan": true}', '{}', 0, true, 'room_temp'),
('ING_PARMIGIANO', 'parmigiano-reggiano', 'Parmigiano Reggiano', 'Aged Italian hard cheese', 'cheese', 'hard_cheese', '{"dairy": true}', '{"is_vegetarian": true}', '{}', 0, true, 'refrigerated'),
('ING_MUSHROOMS', 'mushrooms', 'Mushrooms', 'Fresh mushrooms for duxelles and sauces', 'vegetables', 'fungi', '{}', '{"is_vegan": true}', '{}', 0, true, 'refrigerated')
ON CONFLICT DO NOTHING;

-- =====================================================
-- VERIFY COUNT
-- =====================================================
-- SELECT COUNT(*) FROM ingredients WHERE id LIKE 'ING_BEEF%' OR id LIKE 'ING_LAMB%';
-- Should add 59 new ingredients
