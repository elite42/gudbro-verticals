-- South African Cuisine - Product Ingredients
-- GUDBRO Database Standards v1.7
-- Links dishes to ingredients

-- BRAAI
-- ZA_BOEREWORS (8)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_BOEREWORS', 'ING_BEEF', 'main', 500, 'g', false),
('southafrican', 'ZA_BOEREWORS', 'ING_PORK', 'main', 300, 'g', false),
('southafrican', 'ZA_BOEREWORS', 'ING_PORK_FAT', 'secondary', 200, 'g', false),
('southafrican', 'ZA_BOEREWORS', 'ING_CORIANDER', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_BOEREWORS', 'ING_CLOVE', 'seasoning', 3, 'g', false),
('southafrican', 'ZA_BOEREWORS', 'ING_NUTMEG', 'seasoning', 3, 'g', false),
('southafrican', 'ZA_BOEREWORS', 'ING_BLACK_PEPPER', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_BOEREWORS', 'ING_VINEGAR', 'seasoning', 30, 'ml', false);

-- ZA_SOSATIES (8)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_SOSATIES', 'ING_LAMB', 'main', 600, 'g', false),
('southafrican', 'ZA_SOSATIES', 'ING_DRIED_APRICOT', 'secondary', 100, 'g', false),
('southafrican', 'ZA_SOSATIES', 'ING_ONION', 'secondary', 150, 'g', false),
('southafrican', 'ZA_SOSATIES', 'ING_CURRY_POWDER', 'seasoning', 20, 'g', false),
('southafrican', 'ZA_SOSATIES', 'ING_BROWN_SUGAR', 'seasoning', 30, 'g', false),
('southafrican', 'ZA_SOSATIES', 'ING_VINEGAR', 'seasoning', 60, 'ml', false),
('southafrican', 'ZA_SOSATIES', 'ING_GARLIC', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_SOSATIES', 'ING_BAY_LEAF', 'seasoning', 3, 'unit', false);

-- ZA_BRAAI_LAMB_CHOPS (6)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_BRAAI_LAMB_CHOPS', 'ING_LAMB_CHOPS', 'main', 800, 'g', false),
('southafrican', 'ZA_BRAAI_LAMB_CHOPS', 'ING_OLIVE_OIL', 'secondary', 30, 'ml', false),
('southafrican', 'ZA_BRAAI_LAMB_CHOPS', 'ING_ROSEMARY', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_BRAAI_LAMB_CHOPS', 'ING_GARLIC', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_BRAAI_LAMB_CHOPS', 'ING_SALT', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_BRAAI_LAMB_CHOPS', 'ING_BLACK_PEPPER', 'seasoning', 3, 'g', false);

-- ZA_PERI_PERI_CHICKEN (7)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_PERI_PERI_CHICKEN', 'ING_CHICKEN', 'main', 1000, 'g', false),
('southafrican', 'ZA_PERI_PERI_CHICKEN', 'ING_CHILI', 'main', 50, 'g', false),
('southafrican', 'ZA_PERI_PERI_CHICKEN', 'ING_GARLIC', 'seasoning', 20, 'g', false),
('southafrican', 'ZA_PERI_PERI_CHICKEN', 'ING_LEMON', 'seasoning', 60, 'ml', false),
('southafrican', 'ZA_PERI_PERI_CHICKEN', 'ING_OLIVE_OIL', 'secondary', 60, 'ml', false),
('southafrican', 'ZA_PERI_PERI_CHICKEN', 'ING_PAPRIKA', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_PERI_PERI_CHICKEN', 'ING_OREGANO', 'seasoning', 5, 'g', false);

-- ZA_BRAAIBROODJIE (6)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_BRAAIBROODJIE', 'ING_BREAD', 'main', 200, 'g', false),
('southafrican', 'ZA_BRAAIBROODJIE', 'ING_CHEDDAR', 'main', 100, 'g', false),
('southafrican', 'ZA_BRAAIBROODJIE', 'ING_TOMATO', 'secondary', 100, 'g', false),
('southafrican', 'ZA_BRAAIBROODJIE', 'ING_ONION', 'secondary', 50, 'g', false),
('southafrican', 'ZA_BRAAIBROODJIE', 'ING_BUTTER', 'secondary', 30, 'g', false),
('southafrican', 'ZA_BRAAIBROODJIE', 'ING_MANGO_CHUTNEY', 'seasoning', 20, 'g', true);

-- STEWS
-- ZA_POTJIEKOS (10)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_POTJIEKOS', 'ING_BEEF', 'main', 600, 'g', false),
('southafrican', 'ZA_POTJIEKOS', 'ING_POTATO', 'secondary', 300, 'g', false),
('southafrican', 'ZA_POTJIEKOS', 'ING_CARROT', 'secondary', 200, 'g', false),
('southafrican', 'ZA_POTJIEKOS', 'ING_ONION', 'secondary', 150, 'g', false),
('southafrican', 'ZA_POTJIEKOS', 'ING_CABBAGE', 'secondary', 150, 'g', false),
('southafrican', 'ZA_POTJIEKOS', 'ING_GREEN_BEANS', 'secondary', 100, 'g', false),
('southafrican', 'ZA_POTJIEKOS', 'ING_BEEF_STOCK', 'secondary', 250, 'ml', false),
('southafrican', 'ZA_POTJIEKOS', 'ING_RED_WINE', 'secondary', 125, 'ml', true),
('southafrican', 'ZA_POTJIEKOS', 'ING_GARLIC', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_POTJIEKOS', 'ING_BAY_LEAF', 'seasoning', 2, 'unit', false);

-- ZA_OXTAIL_POTJIE (10)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_OXTAIL', 'main', 1000, 'g', false),
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_ONION', 'secondary', 150, 'g', false),
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_CARROT', 'secondary', 150, 'g', false),
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_CELERY', 'secondary', 100, 'g', false),
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_POTATO', 'secondary', 200, 'g', false),
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_RED_WINE', 'secondary', 250, 'ml', false),
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_BEEF_STOCK', 'secondary', 500, 'ml', false),
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_TOMATO_PASTE', 'seasoning', 30, 'g', false),
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_GARLIC', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_OXTAIL_POTJIE', 'ING_THYME', 'seasoning', 5, 'g', false);

-- ZA_WATERBLOMMETJIEBREDIE (7)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_WATERBLOMMETJIEBREDIE', 'ING_LAMB', 'main', 600, 'g', false),
('southafrican', 'ZA_WATERBLOMMETJIEBREDIE', 'ING_ONION', 'secondary', 150, 'g', false),
('southafrican', 'ZA_WATERBLOMMETJIEBREDIE', 'ING_POTATO', 'secondary', 300, 'g', false),
('southafrican', 'ZA_WATERBLOMMETJIEBREDIE', 'ING_SORREL', 'secondary', 100, 'g', false),
('southafrican', 'ZA_WATERBLOMMETJIEBREDIE', 'ING_WHITE_WINE', 'secondary', 125, 'ml', false),
('southafrican', 'ZA_WATERBLOMMETJIEBREDIE', 'ING_GARLIC', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_WATERBLOMMETJIEBREDIE', 'ING_NUTMEG', 'seasoning', 2, 'g', false);

-- ZA_TOMATO_BREDIE (9)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_TOMATO_BREDIE', 'ING_LAMB', 'main', 700, 'g', false),
('southafrican', 'ZA_TOMATO_BREDIE', 'ING_TOMATO', 'main', 500, 'g', false),
('southafrican', 'ZA_TOMATO_BREDIE', 'ING_ONION', 'secondary', 200, 'g', false),
('southafrican', 'ZA_TOMATO_BREDIE', 'ING_POTATO', 'secondary', 300, 'g', false),
('southafrican', 'ZA_TOMATO_BREDIE', 'ING_SUGAR', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_TOMATO_BREDIE', 'ING_CINNAMON', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_TOMATO_BREDIE', 'ING_CARDAMOM', 'seasoning', 3, 'g', false),
('southafrican', 'ZA_TOMATO_BREDIE', 'ING_GINGER', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_TOMATO_BREDIE', 'ING_CHILI', 'seasoning', 5, 'g', true);

-- CURRIES
-- ZA_BOBOTIE (11)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_BOBOTIE', 'ING_BEEF', 'main', 500, 'g', false),
('southafrican', 'ZA_BOBOTIE', 'ING_ONION', 'secondary', 200, 'g', false),
('southafrican', 'ZA_BOBOTIE', 'ING_BREAD', 'secondary', 100, 'g', false),
('southafrican', 'ZA_BOBOTIE', 'ING_MILK', 'secondary', 200, 'ml', false),
('southafrican', 'ZA_BOBOTIE', 'ING_EGG', 'main', 2, 'unit', false),
('southafrican', 'ZA_BOBOTIE', 'ING_CURRY_POWDER', 'seasoning', 25, 'g', false),
('southafrican', 'ZA_BOBOTIE', 'ING_RAISIN', 'secondary', 50, 'g', false),
('southafrican', 'ZA_BOBOTIE', 'ING_ALMOND', 'garnish', 30, 'g', true),
('southafrican', 'ZA_BOBOTIE', 'ING_BAY_LEAF', 'seasoning', 4, 'unit', false),
('southafrican', 'ZA_BOBOTIE', 'ING_LEMON', 'seasoning', 30, 'ml', false),
('southafrican', 'ZA_BOBOTIE', 'ING_TURMERIC', 'seasoning', 5, 'g', false);

-- ZA_BUNNY_CHOW (10)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_BUNNY_CHOW', 'ING_CHICKEN', 'main', 600, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW', 'ING_BREAD', 'main', 400, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW', 'ING_ONION', 'secondary', 150, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW', 'ING_TOMATO', 'secondary', 200, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW', 'ING_POTATO', 'secondary', 200, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW', 'ING_CURRY_POWDER', 'seasoning', 30, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW', 'ING_GARAM_MASALA', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW', 'ING_GARLIC', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW', 'ING_GINGER', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW', 'ING_CHILI', 'seasoning', 15, 'g', false);

-- ZA_BUNNY_CHOW_LAMB (9)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_BUNNY_CHOW_LAMB', 'ING_LAMB', 'main', 600, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW_LAMB', 'ING_BREAD', 'main', 400, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW_LAMB', 'ING_ONION', 'secondary', 150, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW_LAMB', 'ING_TOMATO', 'secondary', 200, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW_LAMB', 'ING_CURRY_POWDER', 'seasoning', 30, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW_LAMB', 'ING_CUMIN', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW_LAMB', 'ING_CORIANDER', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW_LAMB', 'ING_GARLIC', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_BUNNY_CHOW_LAMB', 'ING_GINGER', 'seasoning', 15, 'g', false);

-- ZA_CAPE_MALAY_CURRY (10)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_CHICKEN', 'main', 800, 'g', false),
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_ONION', 'secondary', 200, 'g', false),
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_DRIED_APRICOT', 'secondary', 80, 'g', false),
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_RAISIN', 'secondary', 50, 'g', false),
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_CURRY_POWDER', 'seasoning', 25, 'g', false),
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_TURMERIC', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_CINNAMON', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_GARLIC', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_GINGER', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_CAPE_MALAY_CURRY', 'ING_COCONUT_MILK', 'secondary', 200, 'ml', true);

-- ZA_DURBAN_CURRY (10)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_DURBAN_CURRY', 'ING_CHICKEN', 'main', 800, 'g', false),
('southafrican', 'ZA_DURBAN_CURRY', 'ING_ONION', 'secondary', 200, 'g', false),
('southafrican', 'ZA_DURBAN_CURRY', 'ING_TOMATO', 'secondary', 300, 'g', false),
('southafrican', 'ZA_DURBAN_CURRY', 'ING_POTATO', 'secondary', 200, 'g', false),
('southafrican', 'ZA_DURBAN_CURRY', 'ING_CURRY_POWDER', 'seasoning', 40, 'g', false),
('southafrican', 'ZA_DURBAN_CURRY', 'ING_CHILI', 'seasoning', 30, 'g', false),
('southafrican', 'ZA_DURBAN_CURRY', 'ING_GARLIC', 'seasoning', 20, 'g', false),
('southafrican', 'ZA_DURBAN_CURRY', 'ING_GINGER', 'seasoning', 20, 'g', false),
('southafrican', 'ZA_DURBAN_CURRY', 'ING_CUMIN', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_DURBAN_CURRY', 'ING_CORIANDER', 'seasoning', 10, 'g', false);

-- SIDES
-- ZA_PAP (3)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_PAP', 'ING_CORNMEAL', 'main', 300, 'g', false),
('southafrican', 'ZA_PAP', 'ING_WATER', 'secondary', 750, 'ml', false),
('southafrican', 'ZA_PAP', 'ING_SALT', 'seasoning', 5, 'g', false);

-- ZA_CHAKALAKA (8)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_CHAKALAKA', 'ING_TOMATO', 'main', 300, 'g', false),
('southafrican', 'ZA_CHAKALAKA', 'ING_BELL_PEPPER', 'main', 150, 'g', false),
('southafrican', 'ZA_CHAKALAKA', 'ING_CARROT', 'secondary', 150, 'g', false),
('southafrican', 'ZA_CHAKALAKA', 'ING_ONION', 'secondary', 100, 'g', false),
('southafrican', 'ZA_CHAKALAKA', 'ING_BAKED_BEANS', 'secondary', 200, 'g', false),
('southafrican', 'ZA_CHAKALAKA', 'ING_CHILI', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_CHAKALAKA', 'ING_CURRY_POWDER', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_CHAKALAKA', 'ING_GARLIC', 'seasoning', 10, 'g', false);

-- ZA_SAMP_AND_BEANS (5)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_SAMP_AND_BEANS', 'ING_CORN', 'main', 300, 'g', false),
('southafrican', 'ZA_SAMP_AND_BEANS', 'ING_WHITE_BEAN', 'main', 200, 'g', false),
('southafrican', 'ZA_SAMP_AND_BEANS', 'ING_ONION', 'secondary', 100, 'g', false),
('southafrican', 'ZA_SAMP_AND_BEANS', 'ING_BUTTER', 'secondary', 30, 'g', true),
('southafrican', 'ZA_SAMP_AND_BEANS', 'ING_SALT', 'seasoning', 5, 'g', false);

-- ZA_UMNGQUSHO (5)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_UMNGQUSHO', 'ING_CORN', 'main', 400, 'g', false),
('southafrican', 'ZA_UMNGQUSHO', 'ING_WHITE_BEAN', 'main', 250, 'g', false),
('southafrican', 'ZA_UMNGQUSHO', 'ING_ONION', 'secondary', 100, 'g', false),
('southafrican', 'ZA_UMNGQUSHO', 'ING_CHILI', 'seasoning', 10, 'g', true),
('southafrican', 'ZA_UMNGQUSHO', 'ING_SALT', 'seasoning', 5, 'g', false);

-- ZA_MIELIE_PAP (5)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_MIELIE_PAP', 'ING_CORNMEAL', 'main', 200, 'g', false),
('southafrican', 'ZA_MIELIE_PAP', 'ING_MILK', 'secondary', 500, 'ml', false),
('southafrican', 'ZA_MIELIE_PAP', 'ING_BUTTER', 'secondary', 30, 'g', false),
('southafrican', 'ZA_MIELIE_PAP', 'ING_SUGAR', 'seasoning', 30, 'g', true),
('southafrican', 'ZA_MIELIE_PAP', 'ING_SALT', 'seasoning', 3, 'g', false);

-- ZA_MOROGO (5)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_MOROGO', 'ING_SPINACH', 'main', 400, 'g', false),
('southafrican', 'ZA_MOROGO', 'ING_TOMATO', 'secondary', 150, 'g', false),
('southafrican', 'ZA_MOROGO', 'ING_ONION', 'secondary', 100, 'g', false),
('southafrican', 'ZA_MOROGO', 'ING_GARLIC', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_MOROGO', 'ING_VEGETABLE_OIL', 'secondary', 30, 'ml', false);

-- SNACKS
-- ZA_BILTONG (6)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_BILTONG', 'ING_BEEF', 'main', 1000, 'g', false),
('southafrican', 'ZA_BILTONG', 'ING_CORIANDER', 'seasoning', 20, 'g', false),
('southafrican', 'ZA_BILTONG', 'ING_BLACK_PEPPER', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_BILTONG', 'ING_SALT', 'seasoning', 40, 'g', false),
('southafrican', 'ZA_BILTONG', 'ING_VINEGAR', 'seasoning', 100, 'ml', false),
('southafrican', 'ZA_BILTONG', 'ING_BROWN_SUGAR', 'seasoning', 15, 'g', true);

-- ZA_DROEWORS (6)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_DROEWORS', 'ING_BEEF', 'main', 800, 'g', false),
('southafrican', 'ZA_DROEWORS', 'ING_PORK_FAT', 'secondary', 200, 'g', false),
('southafrican', 'ZA_DROEWORS', 'ING_CORIANDER', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_DROEWORS', 'ING_CLOVE', 'seasoning', 3, 'g', false),
('southafrican', 'ZA_DROEWORS', 'ING_SALT', 'seasoning', 25, 'g', false),
('southafrican', 'ZA_DROEWORS', 'ING_VINEGAR', 'seasoning', 50, 'ml', false);

-- ZA_VETKOEK (6)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_VETKOEK', 'ING_FLOUR', 'main', 500, 'g', false),
('southafrican', 'ZA_VETKOEK', 'ING_YEAST', 'secondary', 10, 'g', false),
('southafrican', 'ZA_VETKOEK', 'ING_SUGAR', 'secondary', 30, 'g', false),
('southafrican', 'ZA_VETKOEK', 'ING_SALT', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_VETKOEK', 'ING_VEGETABLE_OIL', 'secondary', 500, 'ml', false),
('southafrican', 'ZA_VETKOEK', 'ING_WATER', 'secondary', 300, 'ml', false);

-- ZA_VETKOEK_MINCE (7)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_VETKOEK_MINCE', 'ING_FLOUR', 'main', 500, 'g', false),
('southafrican', 'ZA_VETKOEK_MINCE', 'ING_BEEF', 'main', 400, 'g', false),
('southafrican', 'ZA_VETKOEK_MINCE', 'ING_YEAST', 'secondary', 10, 'g', false),
('southafrican', 'ZA_VETKOEK_MINCE', 'ING_ONION', 'secondary', 100, 'g', false),
('southafrican', 'ZA_VETKOEK_MINCE', 'ING_CURRY_POWDER', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_VETKOEK_MINCE', 'ING_TOMATO_PASTE', 'seasoning', 30, 'g', false),
('southafrican', 'ZA_VETKOEK_MINCE', 'ING_VEGETABLE_OIL', 'secondary', 500, 'ml', false);

-- ZA_SAMOOSA (7)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_SAMOOSA', 'ING_FLOUR', 'main', 300, 'g', false),
('southafrican', 'ZA_SAMOOSA', 'ING_BEEF', 'main', 300, 'g', false),
('southafrican', 'ZA_SAMOOSA', 'ING_ONION', 'secondary', 100, 'g', false),
('southafrican', 'ZA_SAMOOSA', 'ING_POTATO', 'secondary', 150, 'g', false),
('southafrican', 'ZA_SAMOOSA', 'ING_CURRY_POWDER', 'seasoning', 15, 'g', false),
('southafrican', 'ZA_SAMOOSA', 'ING_CUMIN', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_SAMOOSA', 'ING_VEGETABLE_OIL', 'secondary', 400, 'ml', false);

-- ZA_KOEKSISTER (8)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_KOEKSISTER', 'ING_FLOUR', 'main', 500, 'g', false),
('southafrican', 'ZA_KOEKSISTER', 'ING_SUGAR', 'main', 500, 'g', false),
('southafrican', 'ZA_KOEKSISTER', 'ING_BUTTER', 'secondary', 50, 'g', false),
('southafrican', 'ZA_KOEKSISTER', 'ING_EGG', 'secondary', 2, 'unit', false),
('southafrican', 'ZA_KOEKSISTER', 'ING_BAKING_POWDER', 'secondary', 10, 'g', false),
('southafrican', 'ZA_KOEKSISTER', 'ING_CINNAMON', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_KOEKSISTER', 'ING_GINGER', 'seasoning', 3, 'g', false),
('southafrican', 'ZA_KOEKSISTER', 'ING_VEGETABLE_OIL', 'secondary', 500, 'ml', false);

-- DESSERTS
-- ZA_MALVA_PUDDING (10)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_MALVA_PUDDING', 'ING_FLOUR', 'main', 200, 'g', false),
('southafrican', 'ZA_MALVA_PUDDING', 'ING_SUGAR', 'main', 200, 'g', false),
('southafrican', 'ZA_MALVA_PUDDING', 'ING_EGG', 'main', 2, 'unit', false),
('southafrican', 'ZA_MALVA_PUDDING', 'ING_BUTTER', 'secondary', 100, 'g', false),
('southafrican', 'ZA_MALVA_PUDDING', 'ING_HEAVY_CREAM', 'secondary', 200, 'ml', false),
('southafrican', 'ZA_MALVA_PUDDING', 'ING_MILK', 'secondary', 150, 'ml', false),
('southafrican', 'ZA_MALVA_PUDDING', 'ING_APRICOT_JAM', 'secondary', 60, 'g', false),
('southafrican', 'ZA_MALVA_PUDDING', 'ING_BAKING_SODA', 'secondary', 5, 'g', false),
('southafrican', 'ZA_MALVA_PUDDING', 'ING_VINEGAR', 'secondary', 15, 'ml', false),
('southafrican', 'ZA_MALVA_PUDDING', 'ING_VANILLA', 'seasoning', 5, 'ml', false);

-- ZA_MELKTERT (8)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_MELKTERT', 'ING_FLOUR', 'main', 250, 'g', false),
('southafrican', 'ZA_MELKTERT', 'ING_MILK', 'main', 500, 'ml', false),
('southafrican', 'ZA_MELKTERT', 'ING_SUGAR', 'secondary', 150, 'g', false),
('southafrican', 'ZA_MELKTERT', 'ING_EGG', 'main', 3, 'unit', false),
('southafrican', 'ZA_MELKTERT', 'ING_BUTTER', 'secondary', 100, 'g', false),
('southafrican', 'ZA_MELKTERT', 'ING_CORNSTARCH', 'secondary', 30, 'g', false),
('southafrican', 'ZA_MELKTERT', 'ING_CINNAMON', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_MELKTERT', 'ING_VANILLA', 'seasoning', 5, 'ml', false);

-- ZA_KOEKSISTER_CAPE (9)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_KOEKSISTER_CAPE', 'ING_FLOUR', 'main', 400, 'g', false),
('southafrican', 'ZA_KOEKSISTER_CAPE', 'ING_SUGAR', 'secondary', 100, 'g', false),
('southafrican', 'ZA_KOEKSISTER_CAPE', 'ING_BUTTER', 'secondary', 60, 'g', false),
('southafrican', 'ZA_KOEKSISTER_CAPE', 'ING_EGG', 'secondary', 2, 'unit', false),
('southafrican', 'ZA_KOEKSISTER_CAPE', 'ING_COCONUT', 'garnish', 100, 'g', false),
('southafrican', 'ZA_KOEKSISTER_CAPE', 'ING_CINNAMON', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_KOEKSISTER_CAPE', 'ING_CARDAMOM', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_KOEKSISTER_CAPE', 'ING_GINGER', 'seasoning', 5, 'g', false),
('southafrican', 'ZA_KOEKSISTER_CAPE', 'ING_VEGETABLE_OIL', 'secondary', 400, 'ml', false);

-- ZA_PEPPERMINT_CRISP_TART (5)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_PEPPERMINT_CRISP_TART', 'ING_HEAVY_CREAM', 'main', 500, 'ml', false),
('southafrican', 'ZA_PEPPERMINT_CRISP_TART', 'ING_CONDENSED_MILK', 'main', 380, 'g', false),
('southafrican', 'ZA_PEPPERMINT_CRISP_TART', 'ING_CHOCOLATE', 'main', 150, 'g', false),
('southafrican', 'ZA_PEPPERMINT_CRISP_TART', 'ING_DIGESTIVE_BISCUIT', 'secondary', 200, 'g', false),
('southafrican', 'ZA_PEPPERMINT_CRISP_TART', 'ING_BUTTER', 'secondary', 80, 'g', false);

-- ZA_HERTZOGGIES (6)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_HERTZOGGIES', 'ING_FLOUR', 'main', 200, 'g', false),
('southafrican', 'ZA_HERTZOGGIES', 'ING_BUTTER', 'secondary', 100, 'g', false),
('southafrican', 'ZA_HERTZOGGIES', 'ING_APRICOT_JAM', 'main', 150, 'g', false),
('southafrican', 'ZA_HERTZOGGIES', 'ING_EGG', 'main', 2, 'unit', false),
('southafrican', 'ZA_HERTZOGGIES', 'ING_SUGAR', 'secondary', 100, 'g', false),
('southafrican', 'ZA_HERTZOGGIES', 'ING_COCONUT', 'secondary', 100, 'g', false);

-- ZA_SOETKOEKIES (9)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_SOETKOEKIES', 'ING_FLOUR', 'main', 400, 'g', false),
('southafrican', 'ZA_SOETKOEKIES', 'ING_BUTTER', 'secondary', 150, 'g', false),
('southafrican', 'ZA_SOETKOEKIES', 'ING_SUGAR', 'secondary', 150, 'g', false),
('southafrican', 'ZA_SOETKOEKIES', 'ING_EGG', 'secondary', 2, 'unit', false),
('southafrican', 'ZA_SOETKOEKIES', 'ING_WHITE_WINE', 'secondary', 60, 'ml', false),
('southafrican', 'ZA_SOETKOEKIES', 'ING_CINNAMON', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_SOETKOEKIES', 'ING_NUTMEG', 'seasoning', 3, 'g', false),
('southafrican', 'ZA_SOETKOEKIES', 'ING_GINGER', 'seasoning', 3, 'g', false),
('southafrican', 'ZA_SOETKOEKIES', 'ING_CLOVE', 'seasoning', 2, 'g', false);

-- BREADS
-- ZA_ROOSTERKOEK (6)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_ROOSTERKOEK', 'ING_FLOUR', 'main', 500, 'g', false),
('southafrican', 'ZA_ROOSTERKOEK', 'ING_YEAST', 'secondary', 10, 'g', false),
('southafrican', 'ZA_ROOSTERKOEK', 'ING_BUTTER', 'secondary', 50, 'g', false),
('southafrican', 'ZA_ROOSTERKOEK', 'ING_MILK', 'secondary', 250, 'ml', false),
('southafrican', 'ZA_ROOSTERKOEK', 'ING_SUGAR', 'secondary', 30, 'g', false),
('southafrican', 'ZA_ROOSTERKOEK', 'ING_SALT', 'seasoning', 5, 'g', false);

-- ZA_POTBROOD (6)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_POTBROOD', 'ING_FLOUR', 'main', 600, 'g', false),
('southafrican', 'ZA_POTBROOD', 'ING_YEAST', 'secondary', 10, 'g', false),
('southafrican', 'ZA_POTBROOD', 'ING_BUTTER', 'secondary', 40, 'g', false),
('southafrican', 'ZA_POTBROOD', 'ING_MILK', 'secondary', 300, 'ml', false),
('southafrican', 'ZA_POTBROOD', 'ING_SUGAR', 'secondary', 20, 'g', false),
('southafrican', 'ZA_POTBROOD', 'ING_SALT', 'seasoning', 10, 'g', false);

-- ZA_MOSBOLLETJIES (7)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_MOSBOLLETJIES', 'ING_FLOUR', 'main', 500, 'g', false),
('southafrican', 'ZA_MOSBOLLETJIES', 'ING_BUTTER', 'secondary', 100, 'g', false),
('southafrican', 'ZA_MOSBOLLETJIES', 'ING_SUGAR', 'secondary', 80, 'g', false),
('southafrican', 'ZA_MOSBOLLETJIES', 'ING_EGG', 'secondary', 1, 'unit', false),
('southafrican', 'ZA_MOSBOLLETJIES', 'ING_ANISE', 'seasoning', 10, 'g', false),
('southafrican', 'ZA_MOSBOLLETJIES', 'ING_YEAST', 'secondary', 10, 'g', false),
('southafrican', 'ZA_MOSBOLLETJIES', 'ING_MILK', 'secondary', 200, 'ml', false);

-- BEVERAGES
-- ZA_ROOIBOS_TEA (3)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_ROOIBOS_TEA', 'ING_ROOIBOS', 'main', 10, 'g', false),
('southafrican', 'ZA_ROOIBOS_TEA', 'ING_WATER', 'secondary', 250, 'ml', false),
('southafrican', 'ZA_ROOIBOS_TEA', 'ING_HONEY', 'seasoning', 10, 'g', true);

-- ZA_ROOIBOS_LATTE (4)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_ROOIBOS_LATTE', 'ING_ROOIBOS', 'main', 10, 'g', false),
('southafrican', 'ZA_ROOIBOS_LATTE', 'ING_MILK', 'main', 200, 'ml', false),
('southafrican', 'ZA_ROOIBOS_LATTE', 'ING_VANILLA', 'seasoning', 3, 'ml', true),
('southafrican', 'ZA_ROOIBOS_LATTE', 'ING_HONEY', 'seasoning', 15, 'g', true);

-- ZA_AMARULA (2)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_AMARULA', 'ING_HEAVY_CREAM', 'main', 50, 'ml', false),
('southafrican', 'ZA_AMARULA', 'ING_SUGAR', 'secondary', 20, 'g', false);

-- ZA_MAGEU (3)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_MAGEU', 'ING_CORNMEAL', 'main', 200, 'g', false),
('southafrican', 'ZA_MAGEU', 'ING_WATER', 'secondary', 1000, 'ml', false),
('southafrican', 'ZA_MAGEU', 'ING_SUGAR', 'secondary', 50, 'g', true);

-- ZA_UMQOMBOTHI (3)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES
('southafrican', 'ZA_UMQOMBOTHI', 'ING_CORNMEAL', 'main', 500, 'g', false),
('southafrican', 'ZA_UMQOMBOTHI', 'ING_SORGHUM', 'main', 200, 'g', false),
('southafrican', 'ZA_UMQOMBOTHI', 'ING_WATER', 'secondary', 2000, 'ml', false);

-- Verify count
SELECT COUNT(*) as total_links FROM product_ingredients WHERE product_type = 'southafrican';
