-- Senegalese Cuisine - Product Ingredients
-- Links between dishes and ingredients

BEGIN;

DELETE FROM product_ingredients WHERE product_type = 'senegalese';

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES

-- SEN_THIEBOUDIENNE
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_WHITE_FISH', 'main', 500, 'g', false, 1),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_RICE', 'main', 400, 'g', false, 2),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_TOMATO_PASTE', 'secondary', 100, 'g', false, 3),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_CASSAVA', 'secondary', 200, 'g', false, 4),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_EGGPLANT', 'secondary', 150, 'g', false, 5),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_CABBAGE', 'secondary', 150, 'g', false, 6),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_CARROT', 'secondary', 100, 'g', false, 7),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_ONION', 'secondary', 100, 'g', false, 8),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_GARLIC', 'seasoning', 20, 'g', false, 9),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_VEGETABLE_OIL', 'secondary', 100, 'ml', false, 10),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_PARSLEY', 'garnish', 20, 'g', false, 11),
('senegalese', 'SEN_THIEBOUDIENNE', 'ING_CHILI', 'seasoning', 10, 'g', true, 12),

-- SEN_THIEBOU_YAPP
('senegalese', 'SEN_THIEBOU_YAPP', 'ING_BEEF', 'main', 500, 'g', false, 1),
('senegalese', 'SEN_THIEBOU_YAPP', 'ING_RICE', 'main', 400, 'g', false, 2),
('senegalese', 'SEN_THIEBOU_YAPP', 'ING_TOMATO_PASTE', 'secondary', 80, 'g', false, 3),
('senegalese', 'SEN_THIEBOU_YAPP', 'ING_ONION', 'secondary', 150, 'g', false, 4),
('senegalese', 'SEN_THIEBOU_YAPP', 'ING_CARROT', 'secondary', 100, 'g', false, 5),
('senegalese', 'SEN_THIEBOU_YAPP', 'ING_CABBAGE', 'secondary', 150, 'g', false, 6),
('senegalese', 'SEN_THIEBOU_YAPP', 'ING_GARLIC', 'seasoning', 20, 'g', false, 7),
('senegalese', 'SEN_THIEBOU_YAPP', 'ING_VEGETABLE_OIL', 'secondary', 80, 'ml', false, 8),

-- SEN_THIEBOU_GUINAAR
('senegalese', 'SEN_THIEBOU_GUINAAR', 'ING_CHICKEN', 'main', 600, 'g', false, 1),
('senegalese', 'SEN_THIEBOU_GUINAAR', 'ING_RICE', 'main', 400, 'g', false, 2),
('senegalese', 'SEN_THIEBOU_GUINAAR', 'ING_TOMATO_PASTE', 'secondary', 80, 'g', false, 3),
('senegalese', 'SEN_THIEBOU_GUINAAR', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('senegalese', 'SEN_THIEBOU_GUINAAR', 'ING_CARROT', 'secondary', 100, 'g', false, 5),
('senegalese', 'SEN_THIEBOU_GUINAAR', 'ING_POTATO', 'secondary', 150, 'g', false, 6),
('senegalese', 'SEN_THIEBOU_GUINAAR', 'ING_GARLIC', 'seasoning', 15, 'g', false, 7),
('senegalese', 'SEN_THIEBOU_GUINAAR', 'ING_VEGETABLE_OIL', 'secondary', 60, 'ml', false, 8),

-- SEN_YASSA_POULET
('senegalese', 'SEN_YASSA_POULET', 'ING_CHICKEN', 'main', 800, 'g', false, 1),
('senegalese', 'SEN_YASSA_POULET', 'ING_ONION', 'main', 500, 'g', false, 2),
('senegalese', 'SEN_YASSA_POULET', 'ING_LEMON', 'secondary', 4, 'unit', false, 3),
('senegalese', 'SEN_YASSA_POULET', 'ING_MUSTARD', 'seasoning', 30, 'g', false, 4),
('senegalese', 'SEN_YASSA_POULET', 'ING_RICE', 'secondary', 400, 'g', false, 5),
('senegalese', 'SEN_YASSA_POULET', 'ING_GARLIC', 'seasoning', 20, 'g', false, 6),
('senegalese', 'SEN_YASSA_POULET', 'ING_VEGETABLE_OIL', 'secondary', 80, 'ml', false, 7),
('senegalese', 'SEN_YASSA_POULET', 'ING_VINEGAR', 'seasoning', 30, 'ml', false, 8),
('senegalese', 'SEN_YASSA_POULET', 'ING_CHILI', 'seasoning', 10, 'g', true, 9),

-- SEN_YASSA_POISSON
('senegalese', 'SEN_YASSA_POISSON', 'ING_WHITE_FISH', 'main', 600, 'g', false, 1),
('senegalese', 'SEN_YASSA_POISSON', 'ING_ONION', 'main', 400, 'g', false, 2),
('senegalese', 'SEN_YASSA_POISSON', 'ING_LEMON', 'secondary', 3, 'unit', false, 3),
('senegalese', 'SEN_YASSA_POISSON', 'ING_MUSTARD', 'seasoning', 25, 'g', false, 4),
('senegalese', 'SEN_YASSA_POISSON', 'ING_RICE', 'secondary', 400, 'g', false, 5),
('senegalese', 'SEN_YASSA_POISSON', 'ING_GARLIC', 'seasoning', 15, 'g', false, 6),
('senegalese', 'SEN_YASSA_POISSON', 'ING_VEGETABLE_OIL', 'secondary', 60, 'ml', false, 7),

-- SEN_MAFE
('senegalese', 'SEN_MAFE', 'ING_BEEF', 'main', 500, 'g', false, 1),
('senegalese', 'SEN_MAFE', 'ING_PEANUT_BUTTER', 'main', 150, 'g', false, 2),
('senegalese', 'SEN_MAFE', 'ING_TOMATO_PASTE', 'secondary', 80, 'g', false, 3),
('senegalese', 'SEN_MAFE', 'ING_SWEET_POTATO', 'secondary', 200, 'g', false, 4),
('senegalese', 'SEN_MAFE', 'ING_CARROT', 'secondary', 150, 'g', false, 5),
('senegalese', 'SEN_MAFE', 'ING_CABBAGE', 'secondary', 150, 'g', false, 6),
('senegalese', 'SEN_MAFE', 'ING_ONION', 'secondary', 100, 'g', false, 7),
('senegalese', 'SEN_MAFE', 'ING_GARLIC', 'seasoning', 15, 'g', false, 8),
('senegalese', 'SEN_MAFE', 'ING_RICE', 'secondary', 400, 'g', false, 9),
('senegalese', 'SEN_MAFE', 'ING_VEGETABLE_OIL', 'secondary', 60, 'ml', false, 10),

-- SEN_MAFE_CHICKEN
('senegalese', 'SEN_MAFE_CHICKEN', 'ING_CHICKEN', 'main', 600, 'g', false, 1),
('senegalese', 'SEN_MAFE_CHICKEN', 'ING_PEANUT_BUTTER', 'main', 120, 'g', false, 2),
('senegalese', 'SEN_MAFE_CHICKEN', 'ING_TOMATO_PASTE', 'secondary', 60, 'g', false, 3),
('senegalese', 'SEN_MAFE_CHICKEN', 'ING_SWEET_POTATO', 'secondary', 200, 'g', false, 4),
('senegalese', 'SEN_MAFE_CHICKEN', 'ING_ONION', 'secondary', 100, 'g', false, 5),
('senegalese', 'SEN_MAFE_CHICKEN', 'ING_GARLIC', 'seasoning', 15, 'g', false, 6),
('senegalese', 'SEN_MAFE_CHICKEN', 'ING_RICE', 'secondary', 400, 'g', false, 7),

-- SEN_BASSI_SALTE
('senegalese', 'SEN_BASSI_SALTE', 'ING_LAMB', 'main', 400, 'g', false, 1),
('senegalese', 'SEN_BASSI_SALTE', 'ING_MILLET', 'main', 300, 'g', false, 2),
('senegalese', 'SEN_BASSI_SALTE', 'ING_SWEET_POTATO', 'secondary', 150, 'g', false, 3),
('senegalese', 'SEN_BASSI_SALTE', 'ING_POTATO', 'secondary', 150, 'g', false, 4),
('senegalese', 'SEN_BASSI_SALTE', 'ING_WHITE_BEAN', 'secondary', 100, 'g', false, 5),
('senegalese', 'SEN_BASSI_SALTE', 'ING_CABBAGE', 'secondary', 100, 'g', false, 6),
('senegalese', 'SEN_BASSI_SALTE', 'ING_CARROT', 'secondary', 100, 'g', false, 7),
('senegalese', 'SEN_BASSI_SALTE', 'ING_DATE', 'secondary', 50, 'g', false, 8),
('senegalese', 'SEN_BASSI_SALTE', 'ING_RAISIN', 'secondary', 30, 'g', false, 9),
('senegalese', 'SEN_BASSI_SALTE', 'ING_TOMATO_PASTE', 'secondary', 60, 'g', false, 10),
('senegalese', 'SEN_BASSI_SALTE', 'ING_ONION', 'secondary', 80, 'g', false, 11),

-- SEN_NDAMBE
('senegalese', 'SEN_NDAMBE', 'ING_BLACK_EYED_PEAS', 'main', 300, 'g', false, 1),
('senegalese', 'SEN_NDAMBE', 'ING_ONION', 'secondary', 150, 'g', false, 2),
('senegalese', 'SEN_NDAMBE', 'ING_TOMATO_PASTE', 'secondary', 50, 'g', false, 3),
('senegalese', 'SEN_NDAMBE', 'ING_GARLIC', 'seasoning', 15, 'g', false, 4),
('senegalese', 'SEN_NDAMBE', 'ING_CHILI', 'seasoning', 10, 'g', true, 5),
('senegalese', 'SEN_NDAMBE', 'ING_VEGETABLE_OIL', 'secondary', 40, 'ml', false, 6),
('senegalese', 'SEN_NDAMBE', 'ING_BAY_LEAF', 'seasoning', 2, 'unit', false, 7),

-- SEN_SUPPU_KANDIA
('senegalese', 'SEN_SUPPU_KANDIA', 'ING_OKRA', 'main', 400, 'g', false, 1),
('senegalese', 'SEN_SUPPU_KANDIA', 'ING_WHITE_FISH', 'main', 300, 'g', false, 2),
('senegalese', 'SEN_SUPPU_KANDIA', 'ING_PALM_OIL', 'secondary', 80, 'ml', false, 3),
('senegalese', 'SEN_SUPPU_KANDIA', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('senegalese', 'SEN_SUPPU_KANDIA', 'ING_TOMATO', 'secondary', 150, 'g', false, 5),
('senegalese', 'SEN_SUPPU_KANDIA', 'ING_GARLIC', 'seasoning', 15, 'g', false, 6),
('senegalese', 'SEN_SUPPU_KANDIA', 'ING_CHILI', 'seasoning', 10, 'g', true, 7),
('senegalese', 'SEN_SUPPU_KANDIA', 'ING_RICE', 'secondary', 400, 'g', false, 8),

-- SEN_CALDOU
('senegalese', 'SEN_CALDOU', 'ING_WHITE_FISH', 'main', 500, 'g', false, 1),
('senegalese', 'SEN_CALDOU', 'ING_OKRA', 'secondary', 150, 'g', false, 2),
('senegalese', 'SEN_CALDOU', 'ING_ONION', 'secondary', 100, 'g', false, 3),
('senegalese', 'SEN_CALDOU', 'ING_GARLIC', 'seasoning', 20, 'g', false, 4),
('senegalese', 'SEN_CALDOU', 'ING_LEMON', 'secondary', 2, 'unit', false, 5),
('senegalese', 'SEN_CALDOU', 'ING_CHILI', 'seasoning', 15, 'g', false, 6),
('senegalese', 'SEN_CALDOU', 'ING_RICE', 'secondary', 400, 'g', false, 7),

-- SEN_SOUPE_KANDIA
('senegalese', 'SEN_SOUPE_KANDIA', 'ING_CHICKEN', 'main', 500, 'g', false, 1),
('senegalese', 'SEN_SOUPE_KANDIA', 'ING_OKRA', 'main', 300, 'g', false, 2),
('senegalese', 'SEN_SOUPE_KANDIA', 'ING_PALM_OIL', 'secondary', 60, 'ml', false, 3),
('senegalese', 'SEN_SOUPE_KANDIA', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('senegalese', 'SEN_SOUPE_KANDIA', 'ING_TOMATO', 'secondary', 150, 'g', false, 5),
('senegalese', 'SEN_SOUPE_KANDIA', 'ING_GARLIC', 'seasoning', 15, 'g', false, 6),
('senegalese', 'SEN_SOUPE_KANDIA', 'ING_RICE', 'secondary', 400, 'g', false, 7),

-- SEN_DIBI
('senegalese', 'SEN_DIBI', 'ING_LAMB', 'main', 500, 'g', false, 1),
('senegalese', 'SEN_DIBI', 'ING_ONION', 'secondary', 150, 'g', false, 2),
('senegalese', 'SEN_DIBI', 'ING_MUSTARD', 'seasoning', 30, 'g', false, 3),
('senegalese', 'SEN_DIBI', 'ING_BLACK_PEPPER', 'seasoning', 5, 'g', false, 4),
('senegalese', 'SEN_DIBI', 'ING_BREAD', 'secondary', 200, 'g', false, 5),
('senegalese', 'SEN_DIBI', 'ING_VEGETABLE_OIL', 'secondary', 30, 'ml', false, 6),
('senegalese', 'SEN_DIBI', 'ING_GARLIC', 'seasoning', 10, 'g', false, 7),

-- SEN_DIBI_HAUSA
('senegalese', 'SEN_DIBI_HAUSA', 'ING_BEEF', 'main', 500, 'g', false, 1),
('senegalese', 'SEN_DIBI_HAUSA', 'ING_ONION', 'secondary', 100, 'g', false, 2),
('senegalese', 'SEN_DIBI_HAUSA', 'ING_CHILI', 'seasoning', 20, 'g', false, 3),
('senegalese', 'SEN_DIBI_HAUSA', 'ING_PEANUT', 'garnish', 50, 'g', true, 4),
('senegalese', 'SEN_DIBI_HAUSA', 'ING_GINGER', 'seasoning', 10, 'g', false, 5),
('senegalese', 'SEN_DIBI_HAUSA', 'ING_GARLIC', 'seasoning', 10, 'g', false, 6),

-- SEN_BROCHETTES
('senegalese', 'SEN_BROCHETTES', 'ING_BEEF', 'main', 400, 'g', false, 1),
('senegalese', 'SEN_BROCHETTES', 'ING_ONION', 'secondary', 100, 'g', false, 2),
('senegalese', 'SEN_BROCHETTES', 'ING_BELL_PEPPER', 'secondary', 100, 'g', false, 3),
('senegalese', 'SEN_BROCHETTES', 'ING_TOMATO', 'secondary', 100, 'g', false, 4),
('senegalese', 'SEN_BROCHETTES', 'ING_VEGETABLE_OIL', 'secondary', 40, 'ml', false, 5),
('senegalese', 'SEN_BROCHETTES', 'ING_GARLIC', 'seasoning', 10, 'g', false, 6),
('senegalese', 'SEN_BROCHETTES', 'ING_CUMIN', 'seasoning', 5, 'g', false, 7),

-- SEN_PASTELS
('senegalese', 'SEN_PASTELS', 'ING_WHITE_FISH', 'main', 300, 'g', false, 1),
('senegalese', 'SEN_PASTELS', 'ING_FLOUR', 'main', 250, 'g', false, 2),
('senegalese', 'SEN_PASTELS', 'ING_ONION', 'secondary', 100, 'g', false, 3),
('senegalese', 'SEN_PASTELS', 'ING_PARSLEY', 'seasoning', 20, 'g', false, 4),
('senegalese', 'SEN_PASTELS', 'ING_GARLIC', 'seasoning', 10, 'g', false, 5),
('senegalese', 'SEN_PASTELS', 'ING_TOMATO_PASTE', 'secondary', 30, 'g', false, 6),
('senegalese', 'SEN_PASTELS', 'ING_VEGETABLE_OIL', 'secondary', 500, 'ml', false, 7),
('senegalese', 'SEN_PASTELS', 'ING_CHILI', 'seasoning', 10, 'g', true, 8),

-- SEN_FATAYA
('senegalese', 'SEN_FATAYA', 'ING_BEEF', 'main', 300, 'g', false, 1),
('senegalese', 'SEN_FATAYA', 'ING_FLOUR', 'main', 300, 'g', false, 2),
('senegalese', 'SEN_FATAYA', 'ING_ONION', 'secondary', 100, 'g', false, 3),
('senegalese', 'SEN_FATAYA', 'ING_EGG', 'secondary', 1, 'unit', false, 4),
('senegalese', 'SEN_FATAYA', 'ING_PARSLEY', 'seasoning', 15, 'g', false, 5),
('senegalese', 'SEN_FATAYA', 'ING_GARLIC', 'seasoning', 10, 'g', false, 6),
('senegalese', 'SEN_FATAYA', 'ING_VEGETABLE_OIL', 'secondary', 400, 'ml', false, 7),

-- SEN_ACCARA
('senegalese', 'SEN_ACCARA', 'ING_BLACK_EYED_PEAS', 'main', 300, 'g', false, 1),
('senegalese', 'SEN_ACCARA', 'ING_ONION', 'secondary', 80, 'g', false, 2),
('senegalese', 'SEN_ACCARA', 'ING_CHILI', 'seasoning', 10, 'g', true, 3),
('senegalese', 'SEN_ACCARA', 'ING_SALT', 'seasoning', 5, 'g', false, 4),
('senegalese', 'SEN_ACCARA', 'ING_VEGETABLE_OIL', 'secondary', 400, 'ml', false, 5),

-- SEN_BEIGNETS
('senegalese', 'SEN_BEIGNETS', 'ING_FLOUR', 'main', 300, 'g', false, 1),
('senegalese', 'SEN_BEIGNETS', 'ING_SUGAR', 'secondary', 50, 'g', false, 2),
('senegalese', 'SEN_BEIGNETS', 'ING_EGG', 'secondary', 2, 'unit', false, 3),
('senegalese', 'SEN_BEIGNETS', 'ING_MILK', 'secondary', 150, 'ml', false, 4),
('senegalese', 'SEN_BEIGNETS', 'ING_YEAST', 'secondary', 7, 'g', false, 5),
('senegalese', 'SEN_BEIGNETS', 'ING_VEGETABLE_OIL', 'secondary', 400, 'ml', false, 6),
('senegalese', 'SEN_BEIGNETS', 'ING_VANILLA', 'seasoning', 5, 'ml', true, 7),

-- SEN_THIAKRY
('senegalese', 'SEN_THIAKRY', 'ING_MILLET', 'main', 200, 'g', false, 1),
('senegalese', 'SEN_THIAKRY', 'ING_YOGURT', 'main', 300, 'g', false, 2),
('senegalese', 'SEN_THIAKRY', 'ING_CONDENSED_MILK', 'secondary', 150, 'ml', false, 3),
('senegalese', 'SEN_THIAKRY', 'ING_VANILLA', 'seasoning', 5, 'ml', false, 4),
('senegalese', 'SEN_THIAKRY', 'ING_NUTMEG', 'seasoning', 2, 'g', true, 5),
('senegalese', 'SEN_THIAKRY', 'ING_RAISIN', 'garnish', 30, 'g', true, 6),
('senegalese', 'SEN_THIAKRY', 'ING_SUGAR', 'secondary', 30, 'g', false, 7),

-- SEN_SOMBI
('senegalese', 'SEN_SOMBI', 'ING_RICE', 'main', 200, 'g', false, 1),
('senegalese', 'SEN_SOMBI', 'ING_COCONUT_MILK', 'main', 400, 'ml', false, 2),
('senegalese', 'SEN_SOMBI', 'ING_SUGAR', 'secondary', 80, 'g', false, 3),
('senegalese', 'SEN_SOMBI', 'ING_SALT', 'seasoning', 2, 'g', false, 4),
('senegalese', 'SEN_SOMBI', 'ING_VANILLA', 'seasoning', 5, 'ml', true, 5),

-- SEN_LAKH
('senegalese', 'SEN_LAKH', 'ING_MILLET', 'main', 200, 'g', false, 1),
('senegalese', 'SEN_LAKH', 'ING_MILK', 'main', 300, 'ml', false, 2),
('senegalese', 'SEN_LAKH', 'ING_SUGAR', 'secondary', 60, 'g', false, 3),
('senegalese', 'SEN_LAKH', 'ING_BUTTER', 'secondary', 30, 'g', true, 4),

-- SEN_NGALAKH
('senegalese', 'SEN_NGALAKH', 'ING_MILLET', 'main', 250, 'g', false, 1),
('senegalese', 'SEN_NGALAKH', 'ING_PEANUT_BUTTER', 'main', 150, 'g', false, 2),
('senegalese', 'SEN_NGALAKH', 'ING_SUGAR', 'secondary', 100, 'g', false, 3),
('senegalese', 'SEN_NGALAKH', 'ING_ORANGE_BLOSSOM', 'seasoning', 15, 'ml', false, 4),
('senegalese', 'SEN_NGALAKH', 'ING_VANILLA', 'seasoning', 5, 'ml', true, 5),

-- SEN_BISSAP
('senegalese', 'SEN_BISSAP', 'ING_HIBISCUS', 'main', 100, 'g', false, 1),
('senegalese', 'SEN_BISSAP', 'ING_SUGAR', 'secondary', 150, 'g', false, 2),
('senegalese', 'SEN_BISSAP', 'ING_MINT', 'garnish', 20, 'g', true, 3),
('senegalese', 'SEN_BISSAP', 'ING_VANILLA', 'seasoning', 5, 'ml', true, 4),
('senegalese', 'SEN_BISSAP', 'ING_ORANGE_BLOSSOM', 'seasoning', 10, 'ml', true, 5),

-- SEN_BOUYE
('senegalese', 'SEN_BOUYE', 'ING_BAOBAB_POWDER', 'main', 100, 'g', false, 1),
('senegalese', 'SEN_BOUYE', 'ING_SUGAR', 'secondary', 100, 'g', false, 2),
('senegalese', 'SEN_BOUYE', 'ING_VANILLA', 'seasoning', 5, 'ml', true, 3),

-- SEN_GINGEMBRE
('senegalese', 'SEN_GINGEMBRE', 'ING_GINGER', 'main', 150, 'g', false, 1),
('senegalese', 'SEN_GINGEMBRE', 'ING_PINEAPPLE', 'secondary', 200, 'g', true, 2),
('senegalese', 'SEN_GINGEMBRE', 'ING_SUGAR', 'secondary', 100, 'g', false, 3),
('senegalese', 'SEN_GINGEMBRE', 'ING_LEMON', 'secondary', 1, 'unit', true, 4),

-- SEN_ATTAYA
('senegalese', 'SEN_ATTAYA', 'ING_TEA_GREEN', 'main', 30, 'g', false, 1),
('senegalese', 'SEN_ATTAYA', 'ING_SUGAR', 'secondary', 150, 'g', false, 2),
('senegalese', 'SEN_ATTAYA', 'ING_MINT', 'garnish', 30, 'g', true, 3),

-- SEN_CAFE_TOUBA
('senegalese', 'SEN_CAFE_TOUBA', 'ING_COFFEE', 'main', 30, 'g', false, 1),
('senegalese', 'SEN_CAFE_TOUBA', 'ING_GRAINS_OF_SELIM', 'seasoning', 5, 'g', false, 2),
('senegalese', 'SEN_CAFE_TOUBA', 'ING_SUGAR', 'secondary', 20, 'g', true, 3)

ON CONFLICT DO NOTHING;

COMMIT;

-- Verify counts
SELECT COUNT(*) as total_links FROM product_ingredients WHERE product_type = 'senegalese';
SELECT product_id, COUNT(*) as ingredients FROM product_ingredients WHERE product_type = 'senegalese' GROUP BY product_id ORDER BY product_id;
