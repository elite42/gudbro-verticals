-- ============================================
-- GEORGIAN DATABASE - Product Ingredients
-- ============================================
-- Junction table linking Georgian dishes to ingredients
-- Run AFTER 02-georgian-data.sql
-- ============================================

-- KHACHAPURI (8 dishes)

-- GEO_KHACHAPURI_IMERULI (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHACHAPURI_IMERULI', unnest(ARRAY['ING_FLOUR', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_YOGURT', 'ING_SALT', 'ING_YEAST']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHACHAPURI_ADJARULI (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHACHAPURI_ADJARULI', unnest(ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_YOGURT', 'ING_SALT', 'ING_YEAST']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHACHAPURI_MEGRULI (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHACHAPURI_MEGRULI', unnest(ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_YOGURT', 'ING_SALT', 'ING_YEAST']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_LOBIANI (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_LOBIANI', unnest(ARRAY['ING_FLOUR', 'ING_KIDNEY_BEANS', 'ING_ONION', 'ING_BUTTER', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_YEAST']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHACHAPURI_PENOVANI (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHACHAPURI_PENOVANI', unnest(ARRAY['ING_PUFF_PASTRY', 'ING_SULGUNI_CHEESE', 'ING_EGG', 'ING_BUTTER']), 'main', false, generate_series(1, 4)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHACHAPURI_OSURI (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHACHAPURI_OSURI', unnest(ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_POTATO', 'ING_BUTTER', 'ING_SALT', 'ING_YEAST']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_ACHMA (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_ACHMA', unnest(ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_MILK', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KUBDARI (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KUBDARI', unnest(ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_ONION', 'ING_GARLIC', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_BUTTER']), 'main', false, generate_series(1, 10)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- KHINKALI (6 dishes)

-- GEO_KHINKALI_KALAKURI (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHINKALI_KALAKURI', unnest(ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_ONION', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_CUMIN', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_WATER']), 'main', false, generate_series(1, 10)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHINKALI_MTIULURI (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHINKALI_MTIULURI', unnest(ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_GROUND_LAMB', 'ING_ONION', 'ING_CUMIN', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_WATER']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHINKALI_CHEESE (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHINKALI_CHEESE', unnest(ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_SALT']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHINKALI_POTATO (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHINKALI_POTATO', unnest(ARRAY['ING_FLOUR', 'ING_POTATO', 'ING_BUTTER', 'ING_ONION', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHINKALI_MUSHROOM (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHINKALI_MUSHROOM', unnest(ARRAY['ING_FLOUR', 'ING_MUSHROOMS', 'ING_ONION', 'ING_GARLIC', 'ING_BUTTER', 'ING_PARSLEY', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHINKALI_LAMB (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHINKALI_LAMB', unnest(ARRAY['ING_FLOUR', 'ING_GROUND_LAMB', 'ING_ONION', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_WATER']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GRILLED MEATS (8 dishes)

-- GEO_MTSVADI_PORK (5 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_MTSVADI_PORK', unnest(ARRAY['ING_PORK_SHOULDER', 'ING_ONION', 'ING_POMEGRANATE_JUICE', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 5)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_MTSVADI_BEEF (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_MTSVADI_BEEF', unnest(ARRAY['ING_BEEF_SIRLOIN', 'ING_ONION', 'ING_RED_WINE', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_MTSVADI_LAMB (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_MTSVADI_LAMB', unnest(ARRAY['ING_LAMB_LEG', 'ING_ONION', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_TABAKA (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_TABAKA', unnest(ARRAY['ING_CHICKEN_WHOLE', 'ING_GARLIC', 'ING_BUTTER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_ADJIKA']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_CHKMERULI (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_CHKMERULI', unnest(ARRAY['ING_CHICKEN_WHOLE', 'ING_GARLIC', 'ING_MILK', 'ING_BUTTER', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_OJAKHURI (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_OJAKHURI', unnest(ARRAY['ING_PORK_SHOULDER', 'ING_POTATO', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_VEGETABLE_OIL']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KUCHMACHI (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KUCHMACHI', unnest(ARRAY['ING_CHICKEN_LIVER', 'ING_CHICKEN_HEARTS', 'ING_CHICKEN_GIZZARDS', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_POMEGRANATE_SEEDS', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 10)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KUPATI (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KUPATI', unnest(ARRAY['ING_GROUND_PORK', 'ING_PORK_LIVER', 'ING_ONION', 'ING_GARLIC', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_SAUSAGE_CASING']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- STEWS & MAINS (10 dishes)

-- GEO_CHAKHOKHBILI (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_CHAKHOKHBILI', unnest(ARRAY['ING_CHICKEN_WHOLE', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_BELL_PEPPER', 'ING_CILANTRO', 'ING_BASIL', 'ING_FENUGREEK', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 10)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_CHAKAPULI (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_CHAKAPULI', unnest(ARRAY['ING_LAMB_SHOULDER', 'ING_WHITE_WINE', 'ING_TARRAGON', 'ING_TKEMALI', 'ING_GREEN_ONION', 'ING_CILANTRO', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 9)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_SATSIVI (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_SATSIVI', unnest(ARRAY['ING_TURKEY', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_CINNAMON', 'ING_CLOVES', 'ING_VINEGAR', 'ING_EGG_YOLK', 'ING_SALT']), 'main', false, generate_series(1, 11)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_OSTRI (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_OSTRI', unnest(ARRAY['ING_BEEF_CHUCK', 'ING_TOMATO', 'ING_TOMATO_PASTE', 'ING_ONION', 'ING_GARLIC', 'ING_HOT_PEPPER', 'ING_CILANTRO', 'ING_ADJIKA', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 10)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_CHANAKHI (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_CHANAKHI', unnest(ARRAY['ING_LAMB_SHOULDER', 'ING_EGGPLANT', 'ING_TOMATO', 'ING_POTATO', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BASIL', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 10)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_CHASHUSHULI (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_CHASHUSHULI', unnest(ARRAY['ING_BEEF_CHUCK', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_HOT_PEPPER', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 9)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_LOBIO (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_LOBIO', unnest(ARRAY['ING_KIDNEY_BEANS', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_VINEGAR']), 'main', false, generate_series(1, 10)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_AJAPSANDALI (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_AJAPSANDALI', unnest(ARRAY['ING_EGGPLANT', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_POTATO', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BASIL', 'ING_OLIVE_OIL', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 11)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_BUGLAMA (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_BUGLAMA', unnest(ARRAY['ING_LAMB_SHOULDER', 'ING_ONION', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_TOLMA (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_TOLMA', unnest(ARRAY['ING_GRAPE_LEAVES', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_RICE', 'ING_ONION', 'ING_CILANTRO', 'ING_MINT', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 9)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- SOUPS (6 dishes)

-- GEO_KHARCHO (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHARCHO', unnest(ARRAY['ING_BEEF_CHUCK', 'ING_RICE', 'ING_WALNUTS', 'ING_TKEMALI', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_FENUGREEK', 'ING_CORIANDER', 'ING_HOT_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 11)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_CHIKHIRTMA (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_CHIKHIRTMA', unnest(ARRAY['ING_CHICKEN_WHOLE', 'ING_EGG_YOLK', 'ING_ONION', 'ING_FLOUR', 'ING_VINEGAR', 'ING_CILANTRO', 'ING_MINT', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 9)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_MATSONI_SOUP (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_MATSONI_SOUP', unnest(ARRAY['ING_MATSONI', 'ING_CUCUMBER', 'ING_GARLIC', 'ING_DILL', 'ING_MINT', 'ING_WALNUTS', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_LOBIO_SOUP (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_LOBIO_SOUP', unnest(ARRAY['ING_KIDNEY_BEANS', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_FENUGREEK', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KHASHI (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KHASHI', unnest(ARRAY['ING_BEEF_TRIPE', 'ING_BEEF_FEET', 'ING_GARLIC', 'ING_SALT', 'ING_VINEGAR', 'ING_LAVASH']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_TATARIAKHNI (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_TATARIAKHNI', unnest(ARRAY['ING_BEEF_BONES', 'ING_BEEF_CHUCK', 'ING_ONION', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- APPETIZERS (10 dishes)

-- GEO_PKHALI_SPINACH (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_PKHALI_SPINACH', unnest(ARRAY['ING_SPINACH', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_POMEGRANATE_SEEDS', 'ING_VINEGAR', 'ING_SALT']), 'main', false, generate_series(1, 9)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_PKHALI_BEET (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_PKHALI_BEET', unnest(ARRAY['ING_BEET', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_POMEGRANATE_SEEDS', 'ING_VINEGAR', 'ING_SALT']), 'main', false, generate_series(1, 9)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_PKHALI_CABBAGE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_PKHALI_CABBAGE', unnest(ARRAY['ING_CABBAGE', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_CORIANDER', 'ING_VINEGAR', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_BADRIJANI (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_BADRIJANI', unnest(ARRAY['ING_EGGPLANT', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_FENUGREEK', 'ING_CORIANDER', 'ING_POMEGRANATE_SEEDS', 'ING_VINEGAR', 'ING_VEGETABLE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 10)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_JONJOLI (5 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_JONJOLI', unnest(ARRAY['ING_JONJOLI', 'ING_ONION', 'ING_VEGETABLE_OIL', 'ING_SALT', 'ING_VINEGAR']), 'main', false, generate_series(1, 5)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_MKHALI (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_MKHALI', unnest(ARRAY['ING_SPINACH', 'ING_LEEK', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_VINEGAR', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_NIGVZIANI_BADRIJANI (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_NIGVZIANI_BADRIJANI', unnest(ARRAY['ING_EGGPLANT', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_FENUGREEK', 'ING_VEGETABLE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_GEBZHALIA (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_GEBZHALIA', unnest(ARRAY['ING_SULGUNI_CHEESE', 'ING_MATSONI', 'ING_MINT', 'ING_SALT']), 'main', false, generate_series(1, 4)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_SOKO_KETZE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_SOKO_KETZE', unnest(ARRAY['ING_MUSHROOMS', 'ING_SULGUNI_CHEESE', 'ING_BUTTER', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_ELARJI (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_ELARJI', unnest(ARRAY['ING_CORNMEAL', 'ING_SULGUNI_CHEESE', 'ING_WATER', 'ING_SALT']), 'main', false, generate_series(1, 4)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- BREADS & PASTRIES (6 dishes)

-- GEO_SHOTIS_PURI (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_SHOTIS_PURI', unnest(ARRAY['ING_FLOUR', 'ING_WATER', 'ING_YEAST', 'ING_SALT']), 'main', false, generate_series(1, 4)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_TONIS_PURI (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_TONIS_PURI', unnest(ARRAY['ING_FLOUR', 'ING_WATER', 'ING_YEAST', 'ING_SALT']), 'main', false, generate_series(1, 4)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_MCHADI (3 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_MCHADI', unnest(ARRAY['ING_CORNMEAL', 'ING_WATER', 'ING_SALT']), 'main', false, generate_series(1, 3)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_NAZUKI (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_NAZUKI', unnest(ARRAY['ING_FLOUR', 'ING_SUGAR', 'ING_BUTTER', 'ING_EGG', 'ING_RAISINS', 'ING_CINNAMON', 'ING_CLOVES', 'ING_YEAST', 'ING_MILK']), 'main', false, generate_series(1, 9)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_KADA (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_KADA', unnest(ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_SUGAR', 'ING_EGG', 'ING_YOGURT', 'ING_SALT']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_CHURCHKHELA_BREAD (5 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_CHURCHKHELA_BREAD', unnest(ARRAY['ING_FLOUR', 'ING_WATER', 'ING_YEAST', 'ING_SALT', 'ING_CHURCHKHELA']), 'main', false, generate_series(1, 5)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- SAUCES (6 dishes)

-- GEO_TKEMALI (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_TKEMALI', unnest(ARRAY['ING_TKEMALI', 'ING_GARLIC', 'ING_CILANTRO', 'ING_DILL', 'ING_PENNYROYAL', 'ING_HOT_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_ADJIKA (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_ADJIKA', unnest(ARRAY['ING_HOT_PEPPER', 'ING_GARLIC', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_DILL_SEEDS', 'ING_SALT']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_BAZHE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_BAZHE', unnest(ARRAY['ING_WALNUTS', 'ING_GARLIC', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_VINEGAR', 'ING_WATER', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_TKLAPI (2 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_TKLAPI', unnest(ARRAY['ING_PLUMS', 'ING_SUGAR']), 'main', false, generate_series(1, 2)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_SATSEBELI (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_SATSEBELI', unnest(ARRAY['ING_TOMATO', 'ING_GARLIC', 'ING_CILANTRO', 'ING_HOT_PEPPER', 'ING_VINEGAR', 'ING_SALT']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_NARSHARAB (2 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_NARSHARAB', unnest(ARRAY['ING_POMEGRANATE_JUICE', 'ING_SUGAR']), 'main', false, generate_series(1, 2)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- SALADS & SIDES (6 dishes)

-- GEO_TOMATO_CUCUMBER_SALAD (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_TOMATO_CUCUMBER_SALAD', unnest(ARRAY['ING_TOMATO', 'ING_CUCUMBER', 'ING_ONION', 'ING_CILANTRO', 'ING_BASIL', 'ING_WALNUT_OIL', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_NIGVZIANI_SALATA (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_NIGVZIANI_SALATA', unnest(ARRAY['ING_TOMATO', 'ING_CUCUMBER', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_VINEGAR', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_PICKLED_VEGETABLES (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_PICKLED_VEGETABLES', unnest(ARRAY['ING_CABBAGE', 'ING_BELL_PEPPER', 'ING_GARLIC', 'ING_CELERY', 'ING_DILL', 'ING_VINEGAR', 'ING_SALT']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_BEAN_SALAD (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_BEAN_SALAD', unnest(ARRAY['ING_KIDNEY_BEANS', 'ING_ONION', 'ING_WALNUTS', 'ING_POMEGRANATE_SEEDS', 'ING_CILANTRO', 'ING_VINEGAR', 'ING_VEGETABLE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 8)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_CHEESE_PLATE (5 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_CHEESE_PLATE', unnest(ARRAY['ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_GUDA_CHEESE', 'ING_MINT', 'ING_TARRAGON']), 'main', false, generate_series(1, 5)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_HERB_PLATTER (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_HERB_PLATTER', unnest(ARRAY['ING_TARRAGON', 'ING_BASIL', 'ING_CILANTRO', 'ING_MINT', 'ING_GREEN_ONION', 'ING_DILL']), 'main', false, generate_series(1, 6)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- DESSERTS (8 dishes)

-- GEO_CHURCHKHELA (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_CHURCHKHELA', unnest(ARRAY['ING_WALNUTS', 'ING_GRAPE_JUICE', 'ING_FLOUR', 'ING_SUGAR']), 'main', false, generate_series(1, 4)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_PELAMUSHI (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_PELAMUSHI', unnest(ARRAY['ING_GRAPE_JUICE', 'ING_FLOUR', 'ING_SUGAR', 'ING_WALNUTS']), 'main', false, generate_series(1, 4)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_GOZINAKI (3 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_GOZINAKI', unnest(ARRAY['ING_WALNUTS', 'ING_HONEY', 'ING_SUGAR']), 'main', false, generate_series(1, 3)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_TATARA (3 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_TATARA', unnest(ARRAY['ING_HONEY', 'ING_FLOUR', 'ING_BUTTER']), 'main', false, generate_series(1, 3)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_PAKHLAVA (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_PAKHLAVA', unnest(ARRAY['ING_PHYLLO_DOUGH', 'ING_WALNUTS', 'ING_BUTTER', 'ING_HONEY', 'ING_SUGAR', 'ING_CINNAMON', 'ING_CLOVES']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_FRUIT_PLATE (5 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_FRUIT_PLATE', unnest(ARRAY['ING_GRAPES', 'ING_PEACHES', 'ING_FIGS', 'ING_POMEGRANATE', 'ING_PERSIMMON']), 'main', false, generate_series(1, 5)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_MURABA (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_MURABA', unnest(ARRAY['ING_GREEN_WALNUTS', 'ING_SUGAR', 'ING_WATER', 'ING_CLOVES']), 'main', false, generate_series(1, 4)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- GEO_HONEY_CAKE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT 'georgian', 'GEO_HONEY_CAKE', unnest(ARRAY['ING_FLOUR', 'ING_HONEY', 'ING_SOUR_CREAM', 'ING_BUTTER', 'ING_EGG', 'ING_SUGAR', 'ING_BAKING_SODA']), 'main', false, generate_series(1, 7)
ON CONFLICT (product_type, product_id, ingredient_id) DO NOTHING;

-- ============================================
-- Total: 74 dishes × ~7 avg ingredients = ~518 links
-- Next: Import in Supabase SQL Editor
-- ============================================
