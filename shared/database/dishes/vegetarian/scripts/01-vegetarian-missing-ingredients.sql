-- ============================================
-- VEGETARIAN DATABASE - Missing Ingredients
-- Version: 1.0 (DATABASE-STANDARDS v1.1 compliant)
-- Created: 2025-12-18
-- Total: ~86 new ingredients
-- ============================================
--
-- EXECUTION ORDER:
-- 1. Run THIS file FIRST (creates needed ingredients)
-- 2. Run 02-vegetarian-complete-import.sql SECOND (creates table + inserts products)
-- 3. Run 03-vegetarian-product-ingredients.sql THIRD (creates junction links)
-- ============================================
--
-- NOTE: Uses ON CONFLICT DO NOTHING to safely skip existing ingredients
-- ============================================

-- VEGETABLES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BAMBOO_SHOOTS', 'bamboo-shoots', 'Bamboo Shoots', 'Tender young bamboo shoots, commonly used in Asian cuisine', 'vegetables', 'shoots', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_BOK_CHOY', 'bok-choy', 'Bok Choy', 'Chinese cabbage with tender leaves and crisp white stalks', 'vegetables', 'leafy_greens', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_BROCCOLI', 'broccoli', 'Broccoli', 'Nutritious green vegetable with dense florets', 'vegetables', 'cruciferous', '{}', '{"fodmap": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_BRUSSELS_SPROUTS', 'brussels-sprouts', 'Brussels Sprouts', 'Small cabbage-like vegetables, great roasted', 'vegetables', 'cruciferous', '{}', '{"fodmap": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_BUTTERNUT_SQUASH', 'butternut-squash', 'Butternut Squash', 'Sweet, nutty-flavored winter squash', 'vegetables', 'squash', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_CAULIFLOWER', 'cauliflower', 'Cauliflower', 'Versatile cruciferous vegetable, great roasted or as rice substitute', 'vegetables', 'cruciferous', '{}', '{"fodmap": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_PORTOBELLO', 'portobello-mushroom', 'Portobello Mushroom', 'Large, meaty mushroom cap perfect for grilling', 'vegetables', 'mushrooms', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_SWEET_POTATO', 'sweet-potato', 'Sweet Potato', 'Orange-fleshed root vegetable, naturally sweet', 'vegetables', 'root', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_THAI_EGGPLANT', 'thai-eggplant', 'Thai Eggplant', 'Small round eggplant used in Thai curries', 'vegetables', 'nightshade', '{}', '{"nightshade": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TOMATO', 'tomato', 'Tomato', 'Red fruit vegetable used in cuisines worldwide', 'vegetables', 'nightshade', '{}', '{"nightshade": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_ZUCCHINI', 'zucchini', 'Zucchini', 'Green summer squash with mild flavor', 'vegetables', 'squash', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_DRUMSTICK', 'drumstick-vegetable', 'Drumstick (Moringa)', 'Long green pods used in South Indian cooking', 'vegetables', 'pods', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_MIXED_MUSHROOMS', 'mixed-mushrooms', 'Mixed Mushrooms', 'Assortment of wild and cultivated mushrooms', 'vegetables', 'mushrooms', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_KABOCHA', 'kabocha-squash', 'Kabocha Squash', 'Japanese pumpkin with sweet, dense flesh', 'vegetables', 'squash', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'room_temp'),
('ING_GREEN_PEAS', 'green-peas', 'Green Peas', 'Sweet young peas, fresh or frozen', 'vegetables', 'legumes', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'frozen')
ON CONFLICT DO NOTHING;

-- FRUITS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CRANBERRIES', 'cranberries', 'Cranberries', 'Tart red berries, fresh or dried', 'fruits', 'berries', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_CURRANTS', 'currants', 'Currants', 'Small dried grapes, sweet and tangy', 'fruits', 'dried', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_JACKFRUIT', 'jackfruit', 'Jackfruit', 'Large tropical fruit with meat-like texture when young', 'fruits', 'tropical', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TAMARIND', 'tamarind', 'Tamarind', 'Sour tropical fruit pod used in Asian cooking', 'fruits', 'tropical', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- GRAINS & PASTA
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BROWN_RICE', 'brown-rice', 'Brown Rice', 'Whole grain rice with nutty flavor and chewy texture', 'grains', 'rice', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_COUSCOUS', 'couscous', 'Couscous', 'Small steamed wheat pasta from North Africa', 'pasta', 'semolina', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_MACARONI', 'macaroni', 'Macaroni', 'Short curved pasta tubes', 'pasta', 'shaped', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_SUSHI_RICE', 'sushi-rice', 'Sushi Rice', 'Short-grain Japanese rice for sushi', 'grains', 'rice', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_SWEET_POTATO_NOODLES', 'sweet-potato-noodles', 'Sweet Potato Noodles', 'Korean glass noodles (dangmyeon) made from sweet potato starch', 'pasta', 'asian', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'room_temp'),
('ING_WHEAT_NOODLES', 'wheat-noodles', 'Wheat Noodles', 'Fresh or dried wheat-based Asian noodles', 'pasta', 'asian', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_WILD_RICE', 'wild-rice', 'Wild Rice', 'Nutty, chewy aquatic grass grain', 'grains', 'rice', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, true, 'room_temp')
ON CONFLICT DO NOTHING;

-- LEGUMES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_KIDNEY_BEANS', 'kidney-beans', 'Kidney Beans', 'Red kidney-shaped beans used in curries and chili', 'legumes', 'beans', '{}', '{"fodmap": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_LENTILS', 'lentils', 'Lentils', 'Small lens-shaped legumes, various colors', 'legumes', 'lentils', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_RED_LENTILS', 'red-lentils', 'Red Lentils', 'Quick-cooking lentils that break down into creamy texture', 'legumes', 'lentils', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_TOOR_DAL', 'toor-dal', 'Toor Dal', 'Split pigeon peas, staple in Indian cooking', 'legumes', 'lentils', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_YELLOW_LENTILS', 'yellow-lentils', 'Yellow Lentils', 'Yellow or moong dal, split lentils', 'legumes', 'lentils', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- PROTEINS (Vegetarian)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PANEER', 'paneer', 'Paneer', 'Fresh Indian cheese that doesn''t melt', 'dairy', 'cheese', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_SEITAN', 'seitan', 'Seitan', 'Wheat gluten-based meat alternative, high protein', 'proteins', 'plant_based', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_SMOKED_TOFU', 'smoked-tofu', 'Smoked Tofu', 'Firm tofu with smoky flavor', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TEMPEH', 'tempeh', 'Tempeh', 'Fermented soybean cake from Indonesia', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TOFU_CRUMBLES', 'tofu-crumbles', 'Tofu Crumbles', 'Crumbled tofu for ground meat substitute', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TOFU_EXTRA_FIRM', 'tofu-extra-firm', 'Extra Firm Tofu', 'Dense tofu that holds shape well for grilling', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_TOFU_FIRM', 'tofu-firm', 'Firm Tofu', 'Standard firm tofu for stir-fries and curries', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_TOFU_SILKEN', 'tofu-silken', 'Silken Tofu', 'Soft, creamy tofu for soups and desserts', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- DAIRY
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_GHEE', 'ghee', 'Ghee', 'Clarified butter used in Indian cooking', 'dairy', 'butter', '{"milk": true}', '{}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_PLANT_MILK', 'plant-milk', 'Plant Milk', 'Non-dairy milk alternative (oat, almond, soy)', 'dairy', 'milk_alternative', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_VEGAN_BUTTER', 'vegan-butter', 'Vegan Butter', 'Plant-based butter alternative', 'dairy', 'butter_alternative', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_YOGURT', 'yogurt', 'Yogurt', 'Fermented dairy product, creamy and tangy', 'dairy', 'cultured', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- HERBS & SPICES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CORIANDER', 'coriander-seed', 'Coriander Seeds', 'Warm, citrusy spice used in Indian and Middle Eastern cooking', 'spices', 'seeds', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'room_temp'),
('ING_CUMIN_SEEDS', 'cumin-seeds', 'Cumin Seeds', 'Whole cumin seeds for tempering', 'spices', 'seeds', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'room_temp'),
('ING_CURRY_LEAVES', 'curry-leaves', 'Curry Leaves', 'Aromatic leaves used in South Indian cooking', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_CURRY_POWDER', 'curry-powder', 'Curry Powder', 'Blend of spices for curry dishes', 'spices', 'blends', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 2, true, false, 'room_temp'),
('ING_DRIED_CHILI', 'dried-chili', 'Dried Chili', 'Whole dried red chilies for heat and flavor', 'spices', 'peppers', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 4, true, false, 'room_temp'),
('ING_HERBES_DE_PROVENCE', 'herbes-de-provence', 'Herbes de Provence', 'French herb blend with thyme, rosemary, lavender', 'spices', 'blends', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_KASURI_METHI', 'kasuri-methi', 'Kasuri Methi', 'Dried fenugreek leaves, aromatic Indian herb', 'herbs', 'dried', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'room_temp'),
('ING_MUSTARD_SEEDS', 'mustard-seeds', 'Mustard Seeds', 'Tiny seeds used for tempering in Indian cooking', 'spices', 'seeds', '{"mustard": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'room_temp'),
('ING_ONION_POWDER', 'onion-powder', 'Onion Powder', 'Dehydrated ground onion for seasoning', 'spices', 'aromatics', '{}', '{"fodmap": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_SAMBAR_POWDER', 'sambar-powder', 'Sambar Powder', 'South Indian spice blend for sambar', 'spices', 'blends', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 2, false, false, 'room_temp'),
('ING_SHISO_LEAF', 'shiso-leaf', 'Shiso Leaf', 'Japanese herb with unique minty, basil-like flavor', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_THAI_BASIL', 'thai-basil', 'Thai Basil', 'Aromatic basil variety with anise notes', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_THAI_CHILI', 'thai-chili', 'Thai Chili', 'Small, very hot chili peppers', 'spices', 'peppers', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 5, true, false, 'refrigerated'),
('ING_THYME', 'thyme', 'Thyme', 'Fragrant herb used in Mediterranean cooking', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_TURMERIC', 'turmeric', 'Turmeric', 'Yellow spice with earthy flavor, used in curries', 'spices', 'ground', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'room_temp'),
('ING_ZAATAR', 'zaatar', 'Za''atar', 'Middle Eastern herb and sesame blend', 'spices', 'blends', '{"sesame": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- SAUCES & CONDIMENTS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BECHAMEL', 'bechamel', 'Bechamel Sauce', 'Classic white sauce made with butter, flour, and milk', 'sauces', 'french', '{"milk": true, "gluten": true}', '{"lactose": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_CHIPOTLE_PEPPER', 'chipotle-pepper', 'Chipotle Pepper', 'Smoked, dried jalapeño pepper', 'condiments', 'peppers', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 3, true, false, 'room_temp'),
('ING_DOUBANJIANG', 'doubanjiang', 'Doubanjiang', 'Spicy fermented bean paste, essential in Sichuan cuisine', 'sauces', 'asian', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 4, false, false, 'refrigerated'),
('ING_FISH_SAUCE_VEGAN', 'fish-sauce-vegan', 'Vegan Fish Sauce', 'Plant-based fish sauce alternative', 'sauces', 'asian', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'room_temp'),
('ING_GREEN_CURRY_PASTE', 'green-curry-paste', 'Green Curry Paste', 'Thai curry paste made with green chilies', 'sauces', 'asian', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 3, true, false, 'refrigerated'),
('ING_KECAP_MANIS', 'kecap-manis', 'Kecap Manis', 'Indonesian sweet soy sauce', 'sauces', 'asian', '{"soy": true, "gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'room_temp'),
('ING_LIQUID_SMOKE', 'liquid-smoke', 'Liquid Smoke', 'Concentrated smoke flavoring', 'condiments', 'flavoring', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_MARINARA', 'marinara-sauce', 'Marinara Sauce', 'Classic Italian tomato sauce', 'sauces', 'italian', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_MASSAMAN_PASTE', 'massaman-paste', 'Massaman Curry Paste', 'Mild Thai curry paste with warm spices', 'sauces', 'asian', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, false, false, 'refrigerated'),
('ING_MISO', 'miso', 'Miso', 'Fermented soybean paste, savory umami flavor', 'sauces', 'asian', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_OYSTER_SAUCE_VEGAN', 'oyster-sauce-vegan', 'Vegan Oyster Sauce', 'Mushroom-based oyster sauce alternative', 'sauces', 'asian', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TAHINI', 'tahini', 'Tahini', 'Sesame seed paste, used in hummus and dressings', 'condiments', 'nut_butters', '{"sesame": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_TOMATO_SAUCE', 'tomato-sauce', 'Tomato Sauce', 'Smooth pureed tomato sauce', 'sauces', 'tomato', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_TZATZIKI', 'tzatziki', 'Tzatziki', 'Greek cucumber yogurt sauce', 'sauces', 'mediterranean', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_VINEGAR', 'vinegar', 'Vinegar', 'Acidic liquid for cooking and dressings', 'condiments', 'acids', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_WHITE_WINE', 'white-wine', 'White Wine', 'Dry white wine for cooking', 'wines', 'white', '{"sulfites": true}', '{}', '{"vegan": true, "vegetarian": true}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- PREPARED FOODS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BURGER_BUN', 'burger-bun', 'Burger Bun', 'Soft round bread for burgers', 'bread', 'rolls', '{"gluten": true}', '{}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_FALAFEL', 'falafel', 'Falafel', 'Fried chickpea fritters, Middle Eastern', 'proteins', 'prepared', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'frozen'),
('ING_PHYLLO_DOUGH', 'phyllo-dough', 'Phyllo Dough', 'Paper-thin pastry sheets', 'bread', 'pastry', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'frozen'),
('ING_PITA_BREAD', 'pita-bread', 'Pita Bread', 'Pocket flatbread from Middle East', 'bread', 'flatbread', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_TABBOULEH', 'tabbouleh', 'Tabbouleh', 'Lebanese parsley and bulgur salad', 'condiments', 'prepared', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_TEMPURA_FLOUR', 'tempura-flour', 'Tempura Flour', 'Special flour blend for light, crispy tempura batter', 'bread', 'flour', '{"gluten": true}', '{}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- NUTS & SEEDS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CASHEWS', 'cashews', 'Cashews', 'Creamy, buttery tree nuts', 'nuts', 'tree_nuts', '{"tree_nuts": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_PECANS', 'pecans', 'Pecans', 'Buttery, rich-flavored nuts', 'nuts', 'tree_nuts', '{"tree_nuts": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- SWEETENERS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_MAPLE_SYRUP', 'maple-syrup', 'Maple Syrup', 'Natural sweetener from maple tree sap', 'sweeteners', 'natural', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_SUGAR', 'sugar', 'Sugar', 'White granulated sugar', 'sweeteners', 'refined', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- OTHER ESSENTIALS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PEPPER', 'black-pepper', 'Black Pepper', 'Ground black peppercorns', 'spices', 'ground', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'room_temp'),
('ING_POTATO_STARCH', 'potato-starch', 'Potato Starch', 'Starch for thickening and coating', 'other', 'thickeners', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_VEGETABLE_BROTH', 'vegetable-broth', 'Vegetable Broth', 'Savory broth made from vegetables', 'other', 'broths', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_VEGETABLE_OIL', 'vegetable-oil', 'Vegetable Oil', 'Neutral cooking oil', 'oils', 'neutral', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_WAKAME', 'wakame', 'Wakame', 'Edible seaweed used in Japanese cooking', 'vegetables', 'sea_vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'room_temp'),
('ING_GRAPE_LEAVES', 'grape-leaves', 'Grape Leaves', 'Preserved vine leaves for stuffing', 'vegetables', 'preserved', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 'New ingredients added for vegetarian database' AS status;
