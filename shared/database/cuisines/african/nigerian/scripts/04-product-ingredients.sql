-- Nigerian Cuisine - Product Ingredients
-- GUDBRO Database
-- Date: 2025-12-26
-- Links dishes to ingredients

DELETE FROM product_ingredients WHERE product_type = 'nigerian';

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES

-- EGUSI SOUP
('nigerian', 'NIG_EGUSI_SOUP', 'ING_EGUSI', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_EGUSI_SOUP', 'ING_PALM_OIL', 'main', 100, 'ml', false, 2),
('nigerian', 'NIG_EGUSI_SOUP', 'ING_SPINACH', 'secondary', 200, 'g', false, 3),
('nigerian', 'NIG_EGUSI_SOUP', 'ING_BEEF', 'secondary', 300, 'g', false, 4),
('nigerian', 'NIG_EGUSI_SOUP', 'ING_STOCKFISH', 'secondary', 100, 'g', false, 5),
('nigerian', 'NIG_EGUSI_SOUP', 'ING_CRAYFISH', 'seasoning', 30, 'g', false, 6),
('nigerian', 'NIG_EGUSI_SOUP', 'ING_ONION', 'secondary', 100, 'g', false, 7),
('nigerian', 'NIG_EGUSI_SOUP', 'ING_SCOTCH_BONNET', 'seasoning', 20, 'g', false, 8),
('nigerian', 'NIG_EGUSI_SOUP', 'ING_LOCUST_BEAN', 'seasoning', 20, 'g', true, 9),
('nigerian', 'NIG_EGUSI_SOUP', 'ING_SALT', 'seasoning', 5, 'g', false, 10),

-- OGBONO SOUP
('nigerian', 'NIG_OGBONO_SOUP', 'ING_OGBONO', 'main', 150, 'g', false, 1),
('nigerian', 'NIG_OGBONO_SOUP', 'ING_PALM_OIL', 'main', 80, 'ml', false, 2),
('nigerian', 'NIG_OGBONO_SOUP', 'ING_SPINACH', 'secondary', 150, 'g', false, 3),
('nigerian', 'NIG_OGBONO_SOUP', 'ING_BEEF', 'secondary', 250, 'g', false, 4),
('nigerian', 'NIG_OGBONO_SOUP', 'ING_DRIED_FISH', 'secondary', 100, 'g', false, 5),
('nigerian', 'NIG_OGBONO_SOUP', 'ING_CRAYFISH', 'seasoning', 30, 'g', false, 6),
('nigerian', 'NIG_OGBONO_SOUP', 'ING_ONION', 'secondary', 80, 'g', false, 7),
('nigerian', 'NIG_OGBONO_SOUP', 'ING_SCOTCH_BONNET', 'seasoning', 15, 'g', false, 8),
('nigerian', 'NIG_OGBONO_SOUP', 'ING_SALT', 'seasoning', 5, 'g', false, 9),

-- EFO RIRO
('nigerian', 'NIG_EFO_RIRO', 'ING_SPINACH', 'main', 300, 'g', false, 1),
('nigerian', 'NIG_EFO_RIRO', 'ING_PALM_OIL', 'main', 100, 'ml', false, 2),
('nigerian', 'NIG_EFO_RIRO', 'ING_TOMATO', 'secondary', 200, 'g', false, 3),
('nigerian', 'NIG_EFO_RIRO', 'ING_BELL_PEPPER', 'secondary', 100, 'g', false, 4),
('nigerian', 'NIG_EFO_RIRO', 'ING_BEEF', 'secondary', 200, 'g', false, 5),
('nigerian', 'NIG_EFO_RIRO', 'ING_STOCKFISH', 'secondary', 80, 'g', false, 6),
('nigerian', 'NIG_EFO_RIRO', 'ING_CRAYFISH', 'seasoning', 25, 'g', false, 7),
('nigerian', 'NIG_EFO_RIRO', 'ING_LOCUST_BEAN', 'seasoning', 20, 'g', true, 8),
('nigerian', 'NIG_EFO_RIRO', 'ING_SCOTCH_BONNET', 'seasoning', 20, 'g', false, 9),
('nigerian', 'NIG_EFO_RIRO', 'ING_ONION', 'secondary', 80, 'g', false, 10),
('nigerian', 'NIG_EFO_RIRO', 'ING_SALT', 'seasoning', 5, 'g', false, 11),

-- AFANG SOUP
('nigerian', 'NIG_AFANG_SOUP', 'ING_WATERLEAF', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_AFANG_SOUP', 'ING_AFANG_LEAF', 'main', 150, 'g', false, 2),
('nigerian', 'NIG_AFANG_SOUP', 'ING_PALM_OIL', 'main', 80, 'ml', false, 3),
('nigerian', 'NIG_AFANG_SOUP', 'ING_BEEF', 'secondary', 200, 'g', false, 4),
('nigerian', 'NIG_AFANG_SOUP', 'ING_PERIWINKLE', 'secondary', 100, 'g', true, 5),
('nigerian', 'NIG_AFANG_SOUP', 'ING_DRIED_FISH', 'secondary', 80, 'g', false, 6),
('nigerian', 'NIG_AFANG_SOUP', 'ING_CRAYFISH', 'seasoning', 30, 'g', false, 7),
('nigerian', 'NIG_AFANG_SOUP', 'ING_SCOTCH_BONNET', 'seasoning', 15, 'g', false, 8),
('nigerian', 'NIG_AFANG_SOUP', 'ING_SALT', 'seasoning', 5, 'g', false, 9),

-- PEPPER SOUP
('nigerian', 'NIG_PEPPER_SOUP', 'ING_GOAT', 'main', 500, 'g', false, 1),
('nigerian', 'NIG_PEPPER_SOUP', 'ING_PEPPER_SOUP_SPICE', 'main', 30, 'g', false, 2),
('nigerian', 'NIG_PEPPER_SOUP', 'ING_UZIZA_SEED', 'seasoning', 10, 'g', false, 3),
('nigerian', 'NIG_PEPPER_SOUP', 'ING_CALABASH_NUTMEG', 'seasoning', 5, 'g', false, 4),
('nigerian', 'NIG_PEPPER_SOUP', 'ING_SCOTCH_BONNET', 'seasoning', 30, 'g', false, 5),
('nigerian', 'NIG_PEPPER_SOUP', 'ING_ONION', 'secondary', 80, 'g', false, 6),
('nigerian', 'NIG_PEPPER_SOUP', 'ING_SCENT_LEAF', 'garnish', 20, 'g', false, 7),
('nigerian', 'NIG_PEPPER_SOUP', 'ING_SALT', 'seasoning', 5, 'g', false, 8),

-- OKRA SOUP
('nigerian', 'NIG_OKRA_SOUP', 'ING_OKRA', 'main', 300, 'g', false, 1),
('nigerian', 'NIG_OKRA_SOUP', 'ING_PALM_OIL', 'main', 80, 'ml', false, 2),
('nigerian', 'NIG_OKRA_SOUP', 'ING_BEEF', 'secondary', 200, 'g', false, 3),
('nigerian', 'NIG_OKRA_SOUP', 'ING_DRIED_FISH', 'secondary', 100, 'g', false, 4),
('nigerian', 'NIG_OKRA_SOUP', 'ING_CRAYFISH', 'seasoning', 30, 'g', false, 5),
('nigerian', 'NIG_OKRA_SOUP', 'ING_ONION', 'secondary', 80, 'g', false, 6),
('nigerian', 'NIG_OKRA_SOUP', 'ING_SCOTCH_BONNET', 'seasoning', 15, 'g', false, 7),
('nigerian', 'NIG_OKRA_SOUP', 'ING_SALT', 'seasoning', 5, 'g', false, 8),

-- GROUNDNUT SOUP
('nigerian', 'NIG_GROUNDNUT_SOUP', 'ING_PEANUT', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_GROUNDNUT_SOUP', 'ING_CHICKEN', 'main', 400, 'g', false, 2),
('nigerian', 'NIG_GROUNDNUT_SOUP', 'ING_TOMATO', 'secondary', 150, 'g', false, 3),
('nigerian', 'NIG_GROUNDNUT_SOUP', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('nigerian', 'NIG_GROUNDNUT_SOUP', 'ING_SCOTCH_BONNET', 'seasoning', 15, 'g', false, 5),
('nigerian', 'NIG_GROUNDNUT_SOUP', 'ING_PALM_OIL', 'secondary', 50, 'ml', false, 6),
('nigerian', 'NIG_GROUNDNUT_SOUP', 'ING_SALT', 'seasoning', 5, 'g', false, 7),

-- BANGA SOUP
('nigerian', 'NIG_BANGA_SOUP', 'ING_PALM_FRUIT', 'main', 500, 'g', false, 1),
('nigerian', 'NIG_BANGA_SOUP', 'ING_CATFISH', 'main', 300, 'g', false, 2),
('nigerian', 'NIG_BANGA_SOUP', 'ING_BEEF', 'secondary', 200, 'g', false, 3),
('nigerian', 'NIG_BANGA_SOUP', 'ING_BANGA_SPICE', 'seasoning', 20, 'g', false, 4),
('nigerian', 'NIG_BANGA_SOUP', 'ING_ONION', 'secondary', 80, 'g', false, 5),
('nigerian', 'NIG_BANGA_SOUP', 'ING_SCOTCH_BONNET', 'seasoning', 20, 'g', false, 6),
('nigerian', 'NIG_BANGA_SOUP', 'ING_SALT', 'seasoning', 5, 'g', false, 7),

-- EDIKAIKONG
('nigerian', 'NIG_EDIKAIKONG', 'ING_PUMPKIN_LEAF', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_EDIKAIKONG', 'ING_WATERLEAF', 'main', 200, 'g', false, 2),
('nigerian', 'NIG_EDIKAIKONG', 'ING_PALM_OIL', 'main', 100, 'ml', false, 3),
('nigerian', 'NIG_EDIKAIKONG', 'ING_BEEF', 'secondary', 200, 'g', false, 4),
('nigerian', 'NIG_EDIKAIKONG', 'ING_PERIWINKLE', 'secondary', 100, 'g', true, 5),
('nigerian', 'NIG_EDIKAIKONG', 'ING_DRIED_FISH', 'secondary', 80, 'g', false, 6),
('nigerian', 'NIG_EDIKAIKONG', 'ING_CRAYFISH', 'seasoning', 30, 'g', false, 7),
('nigerian', 'NIG_EDIKAIKONG', 'ING_SCOTCH_BONNET', 'seasoning', 15, 'g', false, 8),
('nigerian', 'NIG_EDIKAIKONG', 'ING_SALT', 'seasoning', 5, 'g', false, 9),

-- OHA SOUP
('nigerian', 'NIG_OHA_SOUP', 'ING_OHA_LEAF', 'main', 150, 'g', false, 1),
('nigerian', 'NIG_OHA_SOUP', 'ING_COCOYAM', 'main', 200, 'g', false, 2),
('nigerian', 'NIG_OHA_SOUP', 'ING_PALM_OIL', 'main', 80, 'ml', false, 3),
('nigerian', 'NIG_OHA_SOUP', 'ING_BEEF', 'secondary', 250, 'g', false, 4),
('nigerian', 'NIG_OHA_SOUP', 'ING_STOCKFISH', 'secondary', 80, 'g', false, 5),
('nigerian', 'NIG_OHA_SOUP', 'ING_CRAYFISH', 'seasoning', 25, 'g', false, 6),
('nigerian', 'NIG_OHA_SOUP', 'ING_OGIRI', 'seasoning', 15, 'g', true, 7),
('nigerian', 'NIG_OHA_SOUP', 'ING_SCOTCH_BONNET', 'seasoning', 15, 'g', false, 8),
('nigerian', 'NIG_OHA_SOUP', 'ING_SALT', 'seasoning', 5, 'g', false, 9),

-- SWALLOWS
('nigerian', 'NIG_POUNDED_YAM', 'ING_YAM', 'main', 500, 'g', false, 1),
('nigerian', 'NIG_POUNDED_YAM', 'ING_WATER', 'secondary', 500, 'ml', false, 2),

('nigerian', 'NIG_EBA', 'ING_GARRI', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_EBA', 'ING_WATER', 'secondary', 300, 'ml', false, 2),

('nigerian', 'NIG_AMALA', 'ING_YAM_FLOUR', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_AMALA', 'ING_WATER', 'secondary', 400, 'ml', false, 2),

('nigerian', 'NIG_FUFU', 'ING_CASSAVA', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_FUFU', 'ING_WATER', 'secondary', 300, 'ml', false, 2),

('nigerian', 'NIG_SEMOVITA', 'ING_SEMOLINA', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_SEMOVITA', 'ING_WATER', 'secondary', 400, 'ml', false, 2),

('nigerian', 'NIG_TUWO_SHINKAFA', 'ING_RICE', 'main', 300, 'g', false, 1),
('nigerian', 'NIG_TUWO_SHINKAFA', 'ING_WATER', 'secondary', 600, 'ml', false, 2),

('nigerian', 'NIG_STARCH', 'ING_CASSAVA_STARCH', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_STARCH', 'ING_WATER', 'secondary', 400, 'ml', false, 2),

-- JOLLOF RICE
('nigerian', 'NIG_JOLLOF_RICE', 'ING_RICE', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_TOMATO', 'main', 400, 'g', false, 2),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_TOMATO_PASTE', 'main', 70, 'g', false, 3),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_BELL_PEPPER', 'secondary', 150, 'g', false, 4),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_SCOTCH_BONNET', 'seasoning', 30, 'g', false, 5),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_ONION', 'secondary', 150, 'g', false, 6),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_VEGETABLE_OIL', 'secondary', 100, 'ml', false, 7),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_CHICKEN_BROTH', 'secondary', 500, 'ml', false, 8),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_THYME', 'seasoning', 5, 'g', false, 9),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_CURRY_POWDER', 'seasoning', 10, 'g', false, 10),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_BAY_LEAVES', 'seasoning', 2, 'unit', false, 11),
('nigerian', 'NIG_JOLLOF_RICE', 'ING_SALT', 'seasoning', 5, 'g', false, 12),

-- FRIED RICE
('nigerian', 'NIG_FRIED_RICE', 'ING_RICE', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_FRIED_RICE', 'ING_CARROT', 'secondary', 100, 'g', false, 2),
('nigerian', 'NIG_FRIED_RICE', 'ING_GREEN_PEAS', 'secondary', 80, 'g', false, 3),
('nigerian', 'NIG_FRIED_RICE', 'ING_GREEN_BEANS', 'secondary', 80, 'g', false, 4),
('nigerian', 'NIG_FRIED_RICE', 'ING_CORN', 'secondary', 80, 'g', false, 5),
('nigerian', 'NIG_FRIED_RICE', 'ING_SHRIMP', 'secondary', 100, 'g', false, 6),
('nigerian', 'NIG_FRIED_RICE', 'ING_LIVER', 'secondary', 100, 'g', true, 7),
('nigerian', 'NIG_FRIED_RICE', 'ING_ONION', 'secondary', 80, 'g', false, 8),
('nigerian', 'NIG_FRIED_RICE', 'ING_VEGETABLE_OIL', 'secondary', 60, 'ml', false, 9),
('nigerian', 'NIG_FRIED_RICE', 'ING_SOY_SAUCE', 'seasoning', 30, 'ml', false, 10),
('nigerian', 'NIG_FRIED_RICE', 'ING_THYME', 'seasoning', 5, 'g', false, 11),
('nigerian', 'NIG_FRIED_RICE', 'ING_CURRY_POWDER', 'seasoning', 10, 'g', false, 12),
('nigerian', 'NIG_FRIED_RICE', 'ING_SALT', 'seasoning', 5, 'g', false, 13),

-- OFADA RICE
('nigerian', 'NIG_OFADA_RICE', 'ING_OFADA_RICE', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_OFADA_RICE', 'ING_GREEN_BELL_PEPPER', 'main', 200, 'g', false, 2),
('nigerian', 'NIG_OFADA_RICE', 'ING_SCOTCH_BONNET', 'seasoning', 50, 'g', false, 3),
('nigerian', 'NIG_OFADA_RICE', 'ING_PALM_OIL', 'main', 150, 'ml', false, 4),
('nigerian', 'NIG_OFADA_RICE', 'ING_BEEF', 'secondary', 200, 'g', false, 5),
('nigerian', 'NIG_OFADA_RICE', 'ING_TRIPE', 'secondary', 100, 'g', true, 6),
('nigerian', 'NIG_OFADA_RICE', 'ING_LOCUST_BEAN', 'seasoning', 30, 'g', false, 7),
('nigerian', 'NIG_OFADA_RICE', 'ING_ONION', 'secondary', 100, 'g', false, 8),
('nigerian', 'NIG_OFADA_RICE', 'ING_CRAYFISH', 'seasoning', 20, 'g', false, 9),
('nigerian', 'NIG_OFADA_RICE', 'ING_SALT', 'seasoning', 5, 'g', false, 10),

-- COCONUT RICE
('nigerian', 'NIG_COCONUT_RICE', 'ING_RICE', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_COCONUT_RICE', 'ING_COCONUT_MILK', 'main', 400, 'ml', false, 2),
('nigerian', 'NIG_COCONUT_RICE', 'ING_ONION', 'secondary', 80, 'g', false, 3),
('nigerian', 'NIG_COCONUT_RICE', 'ING_GARLIC', 'seasoning', 10, 'g', false, 4),
('nigerian', 'NIG_COCONUT_RICE', 'ING_VEGETABLE_OIL', 'secondary', 50, 'ml', false, 5),
('nigerian', 'NIG_COCONUT_RICE', 'ING_CURRY_POWDER', 'seasoning', 5, 'g', true, 6),
('nigerian', 'NIG_COCONUT_RICE', 'ING_SALT', 'seasoning', 5, 'g', false, 7),

-- NATIVE JOLLOF
('nigerian', 'NIG_NATIVE_JOLLOF', 'ING_RICE', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_NATIVE_JOLLOF', 'ING_PALM_OIL', 'main', 100, 'ml', false, 2),
('nigerian', 'NIG_NATIVE_JOLLOF', 'ING_TOMATO', 'secondary', 300, 'g', false, 3),
('nigerian', 'NIG_NATIVE_JOLLOF', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('nigerian', 'NIG_NATIVE_JOLLOF', 'ING_SCOTCH_BONNET', 'seasoning', 30, 'g', false, 5),
('nigerian', 'NIG_NATIVE_JOLLOF', 'ING_CRAYFISH', 'seasoning', 30, 'g', false, 6),
('nigerian', 'NIG_NATIVE_JOLLOF', 'ING_DRIED_FISH', 'secondary', 80, 'g', false, 7),
('nigerian', 'NIG_NATIVE_JOLLOF', 'ING_LOCUST_BEAN', 'seasoning', 20, 'g', true, 8),
('nigerian', 'NIG_NATIVE_JOLLOF', 'ING_SALT', 'seasoning', 5, 'g', false, 9),

-- SUYA
('nigerian', 'NIG_SUYA', 'ING_BEEF', 'main', 500, 'g', false, 1),
('nigerian', 'NIG_SUYA', 'ING_SUYA_SPICE', 'main', 50, 'g', false, 2),
('nigerian', 'NIG_SUYA', 'ING_PEANUT', 'secondary', 100, 'g', false, 3),
('nigerian', 'NIG_SUYA', 'ING_VEGETABLE_OIL', 'secondary', 50, 'ml', false, 4),
('nigerian', 'NIG_SUYA', 'ING_GINGER', 'seasoning', 10, 'g', false, 5),
('nigerian', 'NIG_SUYA', 'ING_GARLIC', 'seasoning', 10, 'g', false, 6),
('nigerian', 'NIG_SUYA', 'ING_CAYENNE', 'seasoning', 15, 'g', false, 7),
('nigerian', 'NIG_SUYA', 'ING_ONION', 'garnish', 80, 'g', false, 8),
('nigerian', 'NIG_SUYA', 'ING_CABBAGE', 'garnish', 50, 'g', true, 9),
('nigerian', 'NIG_SUYA', 'ING_SALT', 'seasoning', 5, 'g', false, 10),

-- AKARA
('nigerian', 'NIG_AKARA', 'ING_BLACK_EYED_PEAS', 'main', 300, 'g', false, 1),
('nigerian', 'NIG_AKARA', 'ING_ONION', 'secondary', 80, 'g', false, 2),
('nigerian', 'NIG_AKARA', 'ING_SCOTCH_BONNET', 'seasoning', 20, 'g', false, 3),
('nigerian', 'NIG_AKARA', 'ING_VEGETABLE_OIL', 'secondary', 500, 'ml', false, 4),
('nigerian', 'NIG_AKARA', 'ING_SALT', 'seasoning', 5, 'g', false, 5),

-- MOIN MOIN
('nigerian', 'NIG_MOIN_MOIN', 'ING_BLACK_EYED_PEAS', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_MOIN_MOIN', 'ING_PALM_OIL', 'main', 80, 'ml', false, 2),
('nigerian', 'NIG_MOIN_MOIN', 'ING_ONION', 'secondary', 100, 'g', false, 3),
('nigerian', 'NIG_MOIN_MOIN', 'ING_BELL_PEPPER', 'secondary', 80, 'g', false, 4),
('nigerian', 'NIG_MOIN_MOIN', 'ING_SCOTCH_BONNET', 'seasoning', 20, 'g', false, 5),
('nigerian', 'NIG_MOIN_MOIN', 'ING_CRAYFISH', 'seasoning', 30, 'g', false, 6),
('nigerian', 'NIG_MOIN_MOIN', 'ING_EGG', 'secondary', 2, 'unit', true, 7),
('nigerian', 'NIG_MOIN_MOIN', 'ING_MACKEREL', 'secondary', 80, 'g', true, 8),
('nigerian', 'NIG_MOIN_MOIN', 'ING_SALT', 'seasoning', 5, 'g', false, 9),

-- PUFF PUFF
('nigerian', 'NIG_PUFF_PUFF', 'ING_FLOUR', 'main', 300, 'g', false, 1),
('nigerian', 'NIG_PUFF_PUFF', 'ING_SUGAR', 'main', 80, 'g', false, 2),
('nigerian', 'NIG_PUFF_PUFF', 'ING_YEAST', 'secondary', 7, 'g', false, 3),
('nigerian', 'NIG_PUFF_PUFF', 'ING_EGG', 'secondary', 1, 'unit', true, 4),
('nigerian', 'NIG_PUFF_PUFF', 'ING_WATER', 'secondary', 250, 'ml', false, 5),
('nigerian', 'NIG_PUFF_PUFF', 'ING_NUTMEG', 'seasoning', 2, 'g', false, 6),
('nigerian', 'NIG_PUFF_PUFF', 'ING_VEGETABLE_OIL', 'secondary', 500, 'ml', false, 7),
('nigerian', 'NIG_PUFF_PUFF', 'ING_SALT', 'seasoning', 3, 'g', false, 8),

-- CHIN CHIN
('nigerian', 'NIG_CHIN_CHIN', 'ING_FLOUR', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_CHIN_CHIN', 'ING_SUGAR', 'main', 100, 'g', false, 2),
('nigerian', 'NIG_CHIN_CHIN', 'ING_BUTTER', 'secondary', 60, 'g', false, 3),
('nigerian', 'NIG_CHIN_CHIN', 'ING_EGG', 'secondary', 2, 'unit', false, 4),
('nigerian', 'NIG_CHIN_CHIN', 'ING_MILK', 'secondary', 100, 'ml', false, 5),
('nigerian', 'NIG_CHIN_CHIN', 'ING_NUTMEG', 'seasoning', 3, 'g', false, 6),
('nigerian', 'NIG_CHIN_CHIN', 'ING_BAKING_POWDER', 'secondary', 5, 'g', false, 7),
('nigerian', 'NIG_CHIN_CHIN', 'ING_VEGETABLE_OIL', 'secondary', 500, 'ml', false, 8),
('nigerian', 'NIG_CHIN_CHIN', 'ING_SALT', 'seasoning', 2, 'g', false, 9),

-- KILISHI
('nigerian', 'NIG_KILISHI', 'ING_BEEF', 'main', 500, 'g', false, 1),
('nigerian', 'NIG_KILISHI', 'ING_SUYA_SPICE', 'main', 60, 'g', false, 2),
('nigerian', 'NIG_KILISHI', 'ING_PEANUT', 'secondary', 80, 'g', false, 3),
('nigerian', 'NIG_KILISHI', 'ING_GINGER', 'seasoning', 15, 'g', false, 4),
('nigerian', 'NIG_KILISHI', 'ING_GARLIC', 'seasoning', 10, 'g', false, 5),
('nigerian', 'NIG_KILISHI', 'ING_CAYENNE', 'seasoning', 20, 'g', false, 6),
('nigerian', 'NIG_KILISHI', 'ING_SALT', 'seasoning', 10, 'g', false, 7),

-- DODO
('nigerian', 'NIG_DODO', 'ING_RIPE_PLANTAIN', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_DODO', 'ING_VEGETABLE_OIL', 'secondary', 200, 'ml', false, 2),
('nigerian', 'NIG_DODO', 'ING_SALT', 'seasoning', 2, 'g', true, 3),

-- BOLI
('nigerian', 'NIG_BOLI', 'ING_RIPE_PLANTAIN', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_BOLI', 'ING_PEANUT', 'garnish', 50, 'g', true, 2),
('nigerian', 'NIG_BOLI', 'ING_PALM_OIL', 'garnish', 20, 'ml', true, 3),

-- GIZDODO
('nigerian', 'NIG_GIZDODO', 'ING_CHICKEN_GIZZARDS', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_GIZDODO', 'ING_RIPE_PLANTAIN', 'main', 300, 'g', false, 2),
('nigerian', 'NIG_GIZDODO', 'ING_TOMATO', 'secondary', 150, 'g', false, 3),
('nigerian', 'NIG_GIZDODO', 'ING_BELL_PEPPER', 'secondary', 100, 'g', false, 4),
('nigerian', 'NIG_GIZDODO', 'ING_ONION', 'secondary', 80, 'g', false, 5),
('nigerian', 'NIG_GIZDODO', 'ING_SCOTCH_BONNET', 'seasoning', 20, 'g', false, 6),
('nigerian', 'NIG_GIZDODO', 'ING_VEGETABLE_OIL', 'secondary', 100, 'ml', false, 7),
('nigerian', 'NIG_GIZDODO', 'ING_SALT', 'seasoning', 5, 'g', false, 8),

-- NKWOBI
('nigerian', 'NIG_NKWOBI', 'ING_COW_FOOT', 'main', 500, 'g', false, 1),
('nigerian', 'NIG_NKWOBI', 'ING_PALM_OIL', 'main', 100, 'ml', false, 2),
('nigerian', 'NIG_NKWOBI', 'ING_POTASH', 'secondary', 10, 'g', false, 3),
('nigerian', 'NIG_NKWOBI', 'ING_UTAZI_LEAF', 'garnish', 20, 'g', false, 4),
('nigerian', 'NIG_NKWOBI', 'ING_ONION', 'secondary', 80, 'g', false, 5),
('nigerian', 'NIG_NKWOBI', 'ING_SCOTCH_BONNET', 'seasoning', 30, 'g', false, 6),
('nigerian', 'NIG_NKWOBI', 'ING_EHURU', 'seasoning', 10, 'g', false, 7),
('nigerian', 'NIG_NKWOBI', 'ING_SALT', 'seasoning', 5, 'g', false, 8),

-- STEWS AND MAINS
('nigerian', 'NIG_CHICKEN_STEW', 'ING_CHICKEN', 'main', 800, 'g', false, 1),
('nigerian', 'NIG_CHICKEN_STEW', 'ING_TOMATO', 'main', 400, 'g', false, 2),
('nigerian', 'NIG_CHICKEN_STEW', 'ING_TOMATO_PASTE', 'secondary', 70, 'g', false, 3),
('nigerian', 'NIG_CHICKEN_STEW', 'ING_BELL_PEPPER', 'secondary', 150, 'g', false, 4),
('nigerian', 'NIG_CHICKEN_STEW', 'ING_ONION', 'secondary', 150, 'g', false, 5),
('nigerian', 'NIG_CHICKEN_STEW', 'ING_SCOTCH_BONNET', 'seasoning', 30, 'g', false, 6),
('nigerian', 'NIG_CHICKEN_STEW', 'ING_VEGETABLE_OIL', 'secondary', 150, 'ml', false, 7),
('nigerian', 'NIG_CHICKEN_STEW', 'ING_THYME', 'seasoning', 5, 'g', false, 8),
('nigerian', 'NIG_CHICKEN_STEW', 'ING_CURRY_POWDER', 'seasoning', 10, 'g', false, 9),
('nigerian', 'NIG_CHICKEN_STEW', 'ING_SALT', 'seasoning', 5, 'g', false, 10),

('nigerian', 'NIG_BEEF_STEW', 'ING_BEEF', 'main', 700, 'g', false, 1),
('nigerian', 'NIG_BEEF_STEW', 'ING_TOMATO', 'main', 400, 'g', false, 2),
('nigerian', 'NIG_BEEF_STEW', 'ING_TOMATO_PASTE', 'secondary', 70, 'g', false, 3),
('nigerian', 'NIG_BEEF_STEW', 'ING_BELL_PEPPER', 'secondary', 150, 'g', false, 4),
('nigerian', 'NIG_BEEF_STEW', 'ING_ONION', 'secondary', 150, 'g', false, 5),
('nigerian', 'NIG_BEEF_STEW', 'ING_SCOTCH_BONNET', 'seasoning', 30, 'g', false, 6),
('nigerian', 'NIG_BEEF_STEW', 'ING_VEGETABLE_OIL', 'secondary', 150, 'ml', false, 7),
('nigerian', 'NIG_BEEF_STEW', 'ING_THYME', 'seasoning', 5, 'g', false, 8),
('nigerian', 'NIG_BEEF_STEW', 'ING_SALT', 'seasoning', 5, 'g', false, 9),

('nigerian', 'NIG_PEPPERED_GOAT', 'ING_GOAT', 'main', 600, 'g', false, 1),
('nigerian', 'NIG_PEPPERED_GOAT', 'ING_SCOTCH_BONNET', 'main', 50, 'g', false, 2),
('nigerian', 'NIG_PEPPERED_GOAT', 'ING_BELL_PEPPER', 'secondary', 100, 'g', false, 3),
('nigerian', 'NIG_PEPPERED_GOAT', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('nigerian', 'NIG_PEPPERED_GOAT', 'ING_VEGETABLE_OIL', 'secondary', 80, 'ml', false, 5),
('nigerian', 'NIG_PEPPERED_GOAT', 'ING_THYME', 'seasoning', 5, 'g', false, 6),
('nigerian', 'NIG_PEPPERED_GOAT', 'ING_SALT', 'seasoning', 5, 'g', false, 7),

('nigerian', 'NIG_CATFISH_PEPPER_SOUP', 'ING_CATFISH', 'main', 600, 'g', false, 1),
('nigerian', 'NIG_CATFISH_PEPPER_SOUP', 'ING_PEPPER_SOUP_SPICE', 'main', 30, 'g', false, 2),
('nigerian', 'NIG_CATFISH_PEPPER_SOUP', 'ING_UZIZA_SEED', 'seasoning', 10, 'g', false, 3),
('nigerian', 'NIG_CATFISH_PEPPER_SOUP', 'ING_CALABASH_NUTMEG', 'seasoning', 5, 'g', false, 4),
('nigerian', 'NIG_CATFISH_PEPPER_SOUP', 'ING_SCOTCH_BONNET', 'seasoning', 30, 'g', false, 5),
('nigerian', 'NIG_CATFISH_PEPPER_SOUP', 'ING_ONION', 'secondary', 80, 'g', false, 6),
('nigerian', 'NIG_CATFISH_PEPPER_SOUP', 'ING_SCENT_LEAF', 'garnish', 20, 'g', false, 7),
('nigerian', 'NIG_CATFISH_PEPPER_SOUP', 'ING_SALT', 'seasoning', 5, 'g', false, 8),

('nigerian', 'NIG_AYAMASE', 'ING_GREEN_BELL_PEPPER', 'main', 300, 'g', false, 1),
('nigerian', 'NIG_AYAMASE', 'ING_SCOTCH_BONNET', 'main', 60, 'g', false, 2),
('nigerian', 'NIG_AYAMASE', 'ING_PALM_OIL', 'main', 200, 'ml', false, 3),
('nigerian', 'NIG_AYAMASE', 'ING_BEEF', 'secondary', 300, 'g', false, 4),
('nigerian', 'NIG_AYAMASE', 'ING_TRIPE', 'secondary', 150, 'g', true, 5),
('nigerian', 'NIG_AYAMASE', 'ING_LOCUST_BEAN', 'seasoning', 30, 'g', false, 6),
('nigerian', 'NIG_AYAMASE', 'ING_ONION', 'secondary', 100, 'g', false, 7),
('nigerian', 'NIG_AYAMASE', 'ING_CRAYFISH', 'seasoning', 20, 'g', false, 8),
('nigerian', 'NIG_AYAMASE', 'ING_SALT', 'seasoning', 5, 'g', false, 9),

('nigerian', 'NIG_PORRIDGE_YAM', 'ING_YAM', 'main', 500, 'g', false, 1),
('nigerian', 'NIG_PORRIDGE_YAM', 'ING_PALM_OIL', 'main', 80, 'ml', false, 2),
('nigerian', 'NIG_PORRIDGE_YAM', 'ING_TOMATO', 'secondary', 150, 'g', false, 3),
('nigerian', 'NIG_PORRIDGE_YAM', 'ING_ONION', 'secondary', 80, 'g', false, 4),
('nigerian', 'NIG_PORRIDGE_YAM', 'ING_SCOTCH_BONNET', 'seasoning', 15, 'g', false, 5),
('nigerian', 'NIG_PORRIDGE_YAM', 'ING_CRAYFISH', 'seasoning', 20, 'g', true, 6),
('nigerian', 'NIG_PORRIDGE_YAM', 'ING_SALT', 'seasoning', 5, 'g', false, 7),

('nigerian', 'NIG_EWA_AGOYIN', 'ING_HONEY_BEANS', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_EWA_AGOYIN', 'ING_PALM_OIL', 'main', 150, 'ml', false, 2),
('nigerian', 'NIG_EWA_AGOYIN', 'ING_DRIED_PEPPERS', 'main', 60, 'g', false, 3),
('nigerian', 'NIG_EWA_AGOYIN', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('nigerian', 'NIG_EWA_AGOYIN', 'ING_CRAYFISH', 'seasoning', 20, 'g', true, 5),
('nigerian', 'NIG_EWA_AGOYIN', 'ING_SALT', 'seasoning', 5, 'g', false, 6),

('nigerian', 'NIG_GBEGIRI', 'ING_HONEY_BEANS', 'main', 300, 'g', false, 1),
('nigerian', 'NIG_GBEGIRI', 'ING_PALM_OIL', 'main', 80, 'ml', false, 2),
('nigerian', 'NIG_GBEGIRI', 'ING_ONION', 'secondary', 80, 'g', false, 3),
('nigerian', 'NIG_GBEGIRI', 'ING_SCOTCH_BONNET', 'seasoning', 15, 'g', false, 4),
('nigerian', 'NIG_GBEGIRI', 'ING_LOCUST_BEAN', 'seasoning', 15, 'g', true, 5),
('nigerian', 'NIG_GBEGIRI', 'ING_SALT', 'seasoning', 5, 'g', false, 6),

('nigerian', 'NIG_EWEDU', 'ING_JUTE_LEAF', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_EWEDU', 'ING_LOCUST_BEAN', 'seasoning', 20, 'g', false, 2),
('nigerian', 'NIG_EWEDU', 'ING_POTASH', 'secondary', 5, 'g', true, 3),
('nigerian', 'NIG_EWEDU', 'ING_SALT', 'seasoning', 3, 'g', false, 4),

-- BEVERAGES
('nigerian', 'NIG_ZOBO', 'ING_HIBISCUS', 'main', 100, 'g', false, 1),
('nigerian', 'NIG_ZOBO', 'ING_GINGER', 'secondary', 50, 'g', false, 2),
('nigerian', 'NIG_ZOBO', 'ING_CLOVE', 'seasoning', 5, 'g', false, 3),
('nigerian', 'NIG_ZOBO', 'ING_PINEAPPLE', 'secondary', 100, 'g', true, 4),
('nigerian', 'NIG_ZOBO', 'ING_ORANGE', 'secondary', 100, 'g', true, 5),
('nigerian', 'NIG_ZOBO', 'ING_SUGAR', 'secondary', 100, 'g', false, 6),
('nigerian', 'NIG_ZOBO', 'ING_WATER', 'main', 2000, 'ml', false, 7),

('nigerian', 'NIG_KUNU', 'ING_MILLET', 'main', 300, 'g', false, 1),
('nigerian', 'NIG_KUNU', 'ING_GINGER', 'secondary', 50, 'g', false, 2),
('nigerian', 'NIG_KUNU', 'ING_CLOVE', 'seasoning', 5, 'g', false, 3),
('nigerian', 'NIG_KUNU', 'ING_SWEET_POTATO', 'secondary', 100, 'g', false, 4),
('nigerian', 'NIG_KUNU', 'ING_SUGAR', 'secondary', 80, 'g', false, 5),
('nigerian', 'NIG_KUNU', 'ING_WATER', 'main', 2000, 'ml', false, 6),

('nigerian', 'NIG_FURA_DA_NONO', 'ING_MILLET', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_FURA_DA_NONO', 'ING_YOGURT', 'main', 500, 'ml', false, 2),
('nigerian', 'NIG_FURA_DA_NONO', 'ING_GINGER', 'seasoning', 20, 'g', false, 3),
('nigerian', 'NIG_FURA_DA_NONO', 'ING_CLOVE', 'seasoning', 3, 'g', false, 4),
('nigerian', 'NIG_FURA_DA_NONO', 'ING_SUGAR', 'secondary', 50, 'g', true, 5),

('nigerian', 'NIG_PALM_WINE', 'ING_PALM_SAP', 'main', 1000, 'ml', false, 1),

('nigerian', 'NIG_TIGER_NUT_DRINK', 'ING_TIGER_NUT', 'main', 200, 'g', false, 1),
('nigerian', 'NIG_TIGER_NUT_DRINK', 'ING_DATE', 'secondary', 100, 'g', false, 2),
('nigerian', 'NIG_TIGER_NUT_DRINK', 'ING_COCONUT', 'secondary', 100, 'g', false, 3),
('nigerian', 'NIG_TIGER_NUT_DRINK', 'ING_GINGER', 'seasoning', 20, 'g', true, 4),
('nigerian', 'NIG_TIGER_NUT_DRINK', 'ING_WATER', 'main', 1000, 'ml', false, 5),

('nigerian', 'NIG_PAP', 'ING_CORN_FLOUR', 'main', 100, 'g', false, 1),
('nigerian', 'NIG_PAP', 'ING_WATER', 'main', 500, 'ml', false, 2),
('nigerian', 'NIG_PAP', 'ING_SUGAR', 'secondary', 30, 'g', false, 3),
('nigerian', 'NIG_PAP', 'ING_MILK', 'secondary', 100, 'ml', true, 4),

-- MEAT PIE & SAUSAGE ROLL
('nigerian', 'NIG_MEAT_PIE', 'ING_FLOUR', 'main', 400, 'g', false, 1),
('nigerian', 'NIG_MEAT_PIE', 'ING_BUTTER', 'main', 200, 'g', false, 2),
('nigerian', 'NIG_MEAT_PIE', 'ING_BEEF', 'main', 300, 'g', false, 3),
('nigerian', 'NIG_MEAT_PIE', 'ING_POTATO', 'secondary', 150, 'g', false, 4),
('nigerian', 'NIG_MEAT_PIE', 'ING_CARROT', 'secondary', 80, 'g', false, 5),
('nigerian', 'NIG_MEAT_PIE', 'ING_ONION', 'secondary', 80, 'g', false, 6),
('nigerian', 'NIG_MEAT_PIE', 'ING_EGG', 'secondary', 1, 'unit', false, 7),
('nigerian', 'NIG_MEAT_PIE', 'ING_THYME', 'seasoning', 5, 'g', false, 8),
('nigerian', 'NIG_MEAT_PIE', 'ING_CURRY_POWDER', 'seasoning', 5, 'g', false, 9),
('nigerian', 'NIG_MEAT_PIE', 'ING_SALT', 'seasoning', 5, 'g', false, 10),

('nigerian', 'NIG_SAUSAGE_ROLL', 'ING_FLOUR', 'main', 300, 'g', false, 1),
('nigerian', 'NIG_SAUSAGE_ROLL', 'ING_BUTTER', 'main', 150, 'g', false, 2),
('nigerian', 'NIG_SAUSAGE_ROLL', 'ING_BEEF', 'main', 250, 'g', false, 3),
('nigerian', 'NIG_SAUSAGE_ROLL', 'ING_ONION', 'secondary', 60, 'g', false, 4),
('nigerian', 'NIG_SAUSAGE_ROLL', 'ING_EGG', 'secondary', 1, 'unit', false, 5),
('nigerian', 'NIG_SAUSAGE_ROLL', 'ING_THYME', 'seasoning', 3, 'g', false, 6),
('nigerian', 'NIG_SAUSAGE_ROLL', 'ING_NUTMEG', 'seasoning', 2, 'g', false, 7),
('nigerian', 'NIG_SAUSAGE_ROLL', 'ING_SALT', 'seasoning', 3, 'g', false, 8);

SELECT 'Inserted product_ingredients for 49 Nigerian dishes' AS status;
