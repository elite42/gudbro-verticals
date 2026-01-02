-- ============================================
-- VEGETARIAN DATABASE - Fix Missing Ingredients
-- Run this BEFORE 03-vegetarian-product-ingredients.sql
-- ============================================

-- SPICES & SEASONINGS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PEPPER', 'black-pepper', 'Black Pepper', 'Ground black peppercorns', 'spices', 'ground', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'room_temp'),
('ING_SESAME_SEEDS', 'sesame-seeds', 'Sesame Seeds', 'Small seeds with nutty flavor', 'seeds', 'seeds', '{"sesame": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_SICHUAN_PEPPERCORN', 'sichuan-peppercorn', 'Sichuan Peppercorn', 'Numbing spice essential to Sichuan cuisine', 'spices', 'whole', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 3, false, false, 'room_temp'),
('ING_SMOKED_PAPRIKA', 'smoked-paprika', 'Smoked Paprika', 'Spanish pimentón, smoky and sweet', 'spices', 'ground', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'room_temp'),
('ING_TURMERIC', 'turmeric', 'Turmeric', 'Yellow spice with earthy flavor', 'spices', 'ground', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'room_temp'),
('ING_SUGAR', 'sugar', 'Sugar', 'White granulated sugar', 'sweeteners', 'refined', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- AROMATICS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SHALLOT', 'shallot', 'Shallot', 'Mild, sweet onion variety', 'vegetables', 'alliums', '{}', '{"fodmap": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_SPINACH', 'spinach', 'Spinach', 'Leafy green vegetable, nutrient-dense', 'vegetables', 'leafy_greens', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- HERBS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SHISO_LEAF', 'shiso-leaf', 'Shiso Leaf', 'Japanese herb with minty, basil-like flavor', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_THAI_BASIL', 'thai-basil', 'Thai Basil', 'Aromatic basil with anise notes', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_THAI_CHILI', 'thai-chili', 'Thai Chili', 'Small, very hot chili peppers', 'spices', 'peppers', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 5, true, false, 'refrigerated'),
('ING_THYME', 'thyme', 'Thyme', 'Fragrant herb for Mediterranean cooking', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- PROTEINS (Vegetarian)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SMOKED_TOFU', 'smoked-tofu', 'Smoked Tofu', 'Firm tofu with smoky flavor', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TEMPEH', 'tempeh', 'Tempeh', 'Fermented soybean cake from Indonesia', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TOFU_CRUMBLES', 'tofu-crumbles', 'Tofu Crumbles', 'Crumbled tofu for ground meat substitute', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TOFU_EXTRA_FIRM', 'tofu-extra-firm', 'Extra Firm Tofu', 'Dense tofu for grilling', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_TOFU_FIRM', 'tofu-firm', 'Firm Tofu', 'Standard firm tofu for stir-fries', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_TOFU_SILKEN', 'tofu-silken', 'Silken Tofu', 'Soft, creamy tofu for soups', 'proteins', 'tofu', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- DAIRY & ALTERNATIVES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SOUR_CREAM', 'sour-cream', 'Sour Cream', 'Tangy cultured cream', 'dairy', 'cultured', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_VEGAN_BUTTER', 'vegan-butter', 'Vegan Butter', 'Plant-based butter alternative', 'dairy', 'butter_alternative', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_YOGURT', 'yogurt', 'Yogurt', 'Fermented dairy, creamy and tangy', 'dairy', 'cultured', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- VEGETABLES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SWEET_POTATO', 'sweet-potato', 'Sweet Potato', 'Orange-fleshed root vegetable', 'vegetables', 'root', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_THAI_EGGPLANT', 'thai-eggplant', 'Thai Eggplant', 'Small round eggplant for curries', 'vegetables', 'nightshade', '{}', '{"nightshade": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'refrigerated'),
('ING_TOMATO', 'tomato', 'Tomato', 'Red fruit vegetable, culinary essential', 'vegetables', 'nightshade', '{}', '{"nightshade": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_ZUCCHINI', 'zucchini', 'Zucchini', 'Green summer squash', 'vegetables', 'squash', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_WAKAME', 'wakame', 'Wakame', 'Edible seaweed for Japanese cooking', 'vegetables', 'sea_vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- GRAINS & PASTA
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SUSHI_RICE', 'sushi-rice', 'Sushi Rice', 'Short-grain Japanese rice', 'grains', 'rice', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_SWEET_POTATO_NOODLES', 'sweet-potato-noodles', 'Sweet Potato Noodles', 'Korean glass noodles (dangmyeon)', 'pasta', 'asian', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'room_temp'),
('ING_WHEAT_NOODLES', 'wheat-noodles', 'Wheat Noodles', 'Asian wheat-based noodles', 'pasta', 'asian', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_WILD_RICE', 'wild-rice', 'Wild Rice', 'Nutty aquatic grass grain', 'grains', 'rice', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, true, 'room_temp')
ON CONFLICT DO NOTHING;

-- LEGUMES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_TOOR_DAL', 'toor-dal', 'Toor Dal', 'Split pigeon peas for Indian cooking', 'legumes', 'lentils', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_YELLOW_LENTILS', 'yellow-lentils', 'Yellow Lentils', 'Yellow or moong dal', 'legumes', 'lentils', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- SAUCES & CONDIMENTS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SOY_SAUCE', 'soy-sauce', 'Soy Sauce', 'Fermented soybean sauce, umami-rich', 'sauces', 'asian', '{"soy": true, "gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_SRIRACHA', 'sriracha', 'Sriracha', 'Thai hot chili sauce', 'sauces', 'hot_sauce', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 3, true, false, 'refrigerated'),
('ING_TABBOULEH', 'tabbouleh', 'Tabbouleh', 'Lebanese parsley bulgur salad', 'condiments', 'prepared', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_TAHINI', 'tahini', 'Tahini', 'Sesame seed paste', 'condiments', 'nut_butters', '{"sesame": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_TAMARIND', 'tamarind', 'Tamarind', 'Sour tropical fruit paste', 'fruits', 'tropical', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_TEMPURA_FLOUR', 'tempura-flour', 'Tempura Flour', 'Special flour for crispy tempura', 'bread', 'flour', '{"gluten": true}', '{}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_TOMATO_SAUCE', 'tomato-sauce', 'Tomato Sauce', 'Smooth pureed tomato sauce', 'sauces', 'tomato', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_TZATZIKI', 'tzatziki', 'Tzatziki', 'Greek cucumber yogurt sauce', 'sauces', 'mediterranean', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_VINEGAR', 'vinegar', 'Vinegar', 'Acidic liquid for cooking', 'condiments', 'acids', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_WHITE_WINE', 'white-wine', 'White Wine', 'Dry white wine for cooking', 'wines', 'white', '{"sulfites": true}', '{}', '{"vegan": true, "vegetarian": true}', 0, true, false, 'refrigerated'),
('ING_ZAATAR', 'zaatar', 'Za''atar', 'Middle Eastern herb and sesame blend', 'spices', 'blends', '{"sesame": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_VEGETABLE_BROTH', 'vegetable-broth', 'Vegetable Broth', 'Savory vegetable stock', 'other', 'broths', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_VEGETABLE_OIL', 'vegetable-oil', 'Vegetable Oil', 'Neutral cooking oil', 'oils', 'neutral', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'Fix ingredients added' AS status, COUNT(*) AS total FROM ingredients WHERE id LIKE 'ING_%';
