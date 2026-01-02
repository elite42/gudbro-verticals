-- ============================================
-- GUDBRO Fried Foods - Missing Ingredients
-- Run this BEFORE 02-fried-complete-import.sql
-- Uses ON CONFLICT DO NOTHING for all constraints
-- ============================================

-- FATS & OILS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BACON_FAT', 'bacon-fat', 'Bacon Fat', 'Rendered fat from bacon, adds smoky flavor', 'oils', 'animal', '{}', '{}', '{"halal": false, "kosher": false}', 0, false, false, 'refrigerated'),
('ING_BEEF_TALLOW', 'beef-tallow', 'Beef Tallow', 'Rendered beef fat, traditional for frying', 'oils', 'animal', '{"beef": true}', '{}', '{"halal": true, "kosher": true, "vegetarian": false, "vegan": false}', 0, false, false, 'room_temp'),
('ING_VEGETABLE_OIL', 'vegetable-oil', 'Vegetable Oil', 'Neutral cooking oil for frying', 'oils', 'neutral', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_OLIVE_OIL', 'olive-oil', 'Olive Oil', 'Extra virgin olive oil for cooking', 'oils', 'neutral', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- CHICKEN
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CHICKEN_WHOLE', 'chicken-whole', 'Whole Chicken', 'Whole chicken for frying', 'proteins', 'poultry', '{}', '{}', '{"halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_CHICKEN_WINGS', 'chicken-wings', 'Chicken Wings', 'Chicken wing pieces with tips', 'proteins', 'poultry', '{}', '{}', '{"halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_CHICKEN_PIECES', 'chicken-pieces', 'Chicken Pieces', 'Mixed chicken pieces for frying', 'proteins', 'poultry', '{}', '{}', '{"halal": true, "kosher": true}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- PORK
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PORK_LOIN', 'pork-loin', 'Pork Loin', 'Lean pork loin for cutlets', 'proteins', 'pork', '{"pork": true}', '{}', '{"halal": false, "kosher": false}', 0, true, false, 'refrigerated'),
('ING_PORK_SAUSAGE', 'pork-sausage', 'Pork Sausage', 'Ground pork sausage meat', 'proteins', 'pork', '{"pork": true}', '{}', '{"halal": false, "kosher": false}', 0, true, false, 'refrigerated'),
('ING_SERRANO_HAM', 'serrano-ham', 'Serrano Ham', 'Spanish dry-cured ham', 'proteins', 'pork', '{"pork": true}', '{}', '{"halal": false, "kosher": false}', 0, false, true, 'refrigerated'),
('ING_HOT_DOG', 'hot-dog', 'Hot Dog', 'Frankfurter sausage', 'proteins', 'pork', '{"pork": true}', '{}', '{"halal": false, "kosher": false}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- BEEF & VEAL
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BEEF_RAGU', 'beef-ragu', 'Beef Ragu', 'Slow-cooked beef sauce', 'sauces', 'meat', '{"beef": true}', '{}', '{"halal": true, "kosher": false}', 0, false, false, 'refrigerated'),
('ING_VEAL', 'veal', 'Veal', 'Young calf meat for schnitzel', 'proteins', 'beef', '{"beef": true}', '{}', '{"halal": true, "kosher": true}', 0, false, true, 'refrigerated')
ON CONFLICT DO NOTHING;

-- SEAFOOD
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SHRIMP', 'shrimp', 'Shrimp', 'Fresh or frozen shrimp', 'seafood', 'crustaceans', '{"crustaceans": true}', '{}', '{"halal": true}', 0, true, false, 'refrigerated'),
('ING_SQUID', 'squid', 'Squid', 'Fresh squid for calamari', 'seafood', 'molluscs', '{"molluscs": true}', '{}', '{"halal": true}', 0, true, false, 'refrigerated'),
('ING_CRAB_MEAT', 'crab-meat', 'Crab Meat', 'Lump crab meat for cakes', 'seafood', 'crustaceans', '{"crustaceans": true}', '{}', '{"halal": true}', 0, false, true, 'refrigerated'),
('ING_SOFT_SHELL_CRAB', 'soft-shell-crab', 'Soft Shell Crab', 'Whole soft shell crab', 'seafood', 'crustaceans', '{"crustaceans": true}', '{}', '{"halal": true}', 0, false, true, 'refrigerated'),
('ING_WHITEBAIT', 'whitebait', 'Whitebait', 'Small whole fish for frying', 'seafood', 'fish', '{"fish": true}', '{}', '{"halal": true}', 0, false, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- DAIRY & CHEESE
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BUTTERMILK', 'buttermilk', 'Buttermilk', 'Fermented dairy for marinades', 'dairy', 'cultured', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true}', 0, true, false, 'refrigerated'),
('ING_BLUE_CHEESE', 'blue-cheese', 'Blue Cheese', 'Pungent blue veined cheese', 'cheese', 'soft', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true}', 0, false, false, 'refrigerated'),
('ING_CHEESE_CURDS', 'cheese-curds', 'Cheese Curds', 'Fresh squeaky cheese curds', 'cheese', 'fresh', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true}', 0, false, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- VEGETABLES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SPINACH', 'spinach', 'Spinach', 'Leafy green vegetable', 'vegetables', 'leafy_greens', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_SWEET_POTATO', 'sweet-potato', 'Sweet Potato', 'Orange-fleshed root vegetable', 'vegetables', 'root', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_ZUCCHINI', 'zucchini', 'Zucchini', 'Green summer squash', 'vegetables', 'squash', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_GREEN_TOMATO', 'green-tomato', 'Green Tomato', 'Unripe tomato for frying', 'vegetables', 'nightshade', '{}', '{"nightshade": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, false, false, 'room_temp'),
('ING_SHISHITO_PEPPER', 'shishito-pepper', 'Shishito Pepper', 'Mild Japanese pepper', 'vegetables', 'peppers', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, false, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- FLOURS & STARCHES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BAKING_POWDER', 'baking-powder', 'Baking Powder', 'Leavening agent for batters', 'other', 'leavening', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_CORNMEAL', 'cornmeal', 'Cornmeal', 'Ground dried corn for coating', 'grains', 'corn', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true, "gluten_free": true}', 0, true, false, 'room_temp'),
('ING_POTATO_STARCH', 'potato-starch', 'Potato Starch', 'Starch for light coatings', 'grains', 'starch', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true, "gluten_free": true}', 0, true, false, 'room_temp'),
('ING_CHICKPEA_FLOUR', 'chickpea-flour', 'Chickpea Flour', 'Gram flour for pakoras', 'grains', 'flour', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true, "gluten_free": true}', 0, true, false, 'room_temp'),
('ING_TEMPURA_FLOUR', 'tempura-flour', 'Tempura Flour', 'Special flour for tempura', 'bread', 'flour', '{"gluten": true}', '{}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- WRAPPERS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SPRING_ROLL_WRAPPER', 'spring-roll-wrapper', 'Spring Roll Wrapper', 'Thin wheat pastry for spring rolls', 'bread', 'pastry', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_GYOZA_WRAPPER', 'gyoza-wrapper', 'Gyoza Wrapper', 'Japanese dumpling wrapper', 'bread', 'pastry', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_LUMPIA_WRAPPER', 'lumpia-wrapper', 'Lumpia Wrapper', 'Filipino spring roll wrapper', 'bread', 'pastry', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_WHITE_BREAD', 'white-bread', 'White Bread', 'Sliced white sandwich bread', 'bread', 'sliced', '{"gluten": true}', '{}', '{"vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- SPICES & SEASONINGS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BLACK_PEPPER', 'black-pepper', 'Black Pepper', 'Ground black peppercorns', 'spices', 'ground', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 1, true, false, 'room_temp'),
('ING_CAYENNE_PEPPER', 'cayenne-pepper', 'Cayenne Pepper', 'Ground cayenne for heat', 'spices', 'ground', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 4, true, false, 'room_temp'),
('ING_CAJUN_SEASONING', 'cajun-seasoning', 'Cajun Seasoning', 'Louisiana spice blend', 'spices', 'blends', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 3, true, false, 'room_temp'),
('ING_ITALIAN_HERBS', 'italian-herbs', 'Italian Herbs', 'Blend of oregano, basil, thyme', 'spices', 'blends', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_OLD_BAY', 'old-bay', 'Old Bay Seasoning', 'Maryland seafood seasoning blend', 'spices', 'blends', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 2, true, false, 'room_temp'),
('ING_TURMERIC', 'turmeric', 'Turmeric', 'Yellow spice for color and flavor', 'spices', 'ground', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_SESAME_SEEDS', 'sesame-seeds', 'Sesame Seeds', 'Small nutty seeds', 'seeds', 'seeds', '{"sesame": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- SAUCES & CONDIMENTS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SOY_SAUCE', 'soy-sauce', 'Soy Sauce', 'Fermented soybean sauce', 'sauces', 'asian', '{"soy": true, "gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_WORCESTERSHIRE', 'worcestershire-sauce', 'Worcestershire Sauce', 'Fermented anchovy sauce', 'sauces', 'condiments', '{"fish": true}', '{}', '{"halal": false}', 0, true, false, 'room_temp'),
('ING_SWEET_CHILI_SAUCE', 'sweet-chili-sauce', 'Sweet Chili Sauce', 'Thai sweet and spicy sauce', 'sauces', 'asian', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 2, true, false, 'refrigerated'),
('ING_TONKATSU_SAUCE', 'tonkatsu-sauce', 'Tonkatsu Sauce', 'Japanese brown sauce for katsu', 'sauces', 'asian', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_MALT_VINEGAR', 'malt-vinegar', 'Malt Vinegar', 'British vinegar for fish & chips', 'condiments', 'acids', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_VINEGAR', 'vinegar', 'Vinegar', 'White or cider vinegar', 'condiments', 'acids', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- SWEETENERS & OTHER
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SUGAR', 'sugar', 'Sugar', 'White granulated sugar', 'sweeteners', 'refined', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_WATER', 'water', 'Water', 'Plain water', 'other', 'liquid', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'room_temp'),
('ING_ICE_WATER', 'ice-water', 'Ice Water', 'Very cold water for tempura', 'other', 'liquid', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_SPARKLING_WATER', 'sparkling-water', 'Sparkling Water', 'Carbonated water for batters', 'other', 'liquid', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated'),
('ING_YEAST', 'yeast', 'Yeast', 'Active dry yeast for dough', 'other', 'leavening', '{}', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'Fried ingredients added' AS status, COUNT(*) AS total
FROM ingredients
WHERE id IN (
  'ING_BACON_FAT', 'ING_BEEF_TALLOW', 'ING_BUTTERMILK', 'ING_CAJUN_SEASONING',
  'ING_CHICKEN_WINGS', 'ING_CORNMEAL', 'ING_SHRIMP', 'ING_SQUID'
);
