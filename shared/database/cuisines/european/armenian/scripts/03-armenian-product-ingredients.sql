-- ============================================
-- ARMENIAN DATABASE - Product Ingredients
-- ============================================
-- Links 78 Armenian dishes to their ingredients
-- Run AFTER 02-armenian-data.sql
-- ============================================

-- Clear existing armenian product_ingredients
DELETE FROM product_ingredients WHERE product_type = 'armenian';

-- Insert product_ingredients for all Armenian dishes
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)

-- ============================================
-- GRILLED MEATS
-- ============================================
SELECT 'armenian', 'ARM_KHOROVATS_PORK', unnest(ARRAY['ING_PORK_SHOULDER', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_LEMON_JUICE', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_PAPRIKA']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_KHOROVATS_LAMB', unnest(ARRAY['ING_LAMB_SHOULDER', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_KHOROVATS_CHICKEN', unnest(ARRAY['ING_CHICKEN_WHOLE', 'ING_ONION', 'ING_GARLIC', 'ING_LEMON_JUICE', 'ING_PAPRIKA', 'ING_SUMAC', 'ING_OLIVE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_LULA_KEBAB', unnest(ARRAY['ING_GROUND_LAMB', 'ING_GROUND_BEEF', 'ING_ONION', 'ING_PARSLEY', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_LAMB_FAT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_TIKKA_KEBAB', unnest(ARRAY['ING_BEEF_SIRLOIN', 'ING_ONION', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_OLIVE_OIL', 'ING_PAPRIKA', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_ISHKHAN_GRILLED', unnest(ARRAY['ING_TROUT', 'ING_LEMON', 'ING_DILL', 'ING_PARSLEY', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_SALT', 'ING_BLACK_PEPPER']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_KHOROVATS_VEGETABLE', unnest(ARRAY['ING_EGGPLANT', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_PARSLEY', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_KHOROVATS_LIVER', unnest(ARRAY['ING_LAMB_LIVER', 'ING_LAMB_FAT', 'ING_ONION', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_SUMAC']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_KHOROVATS_RIBS', unnest(ARRAY['ING_PORK_RIBS', 'ING_ONION', 'ING_GARLIC', 'ING_TOMATO_PASTE', 'ING_PAPRIKA', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_HONEY']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_SHASHLIK', unnest(ARRAY['ING_BEEF_SIRLOIN', 'ING_LAMB_LEG', 'ING_ONION', 'ING_VINEGAR', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_BAY_LEAVES']), 'main', false, generate_series(1, 7)

-- ============================================
-- DOLMA & SARMA
-- ============================================
UNION ALL
SELECT 'armenian', 'ARM_TOLMA_GRAPE', unnest(ARRAY['ING_GRAPE_LEAVES', 'ING_GROUND_BEEF', 'ING_GROUND_LAMB', 'ING_RICE', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_PARSLEY', 'ING_DILL', 'ING_MINT', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 11)
UNION ALL
SELECT 'armenian', 'ARM_PASUS_TOLMA', unnest(ARRAY['ING_GRAPE_LEAVES', 'ING_LENTILS', 'ING_CHICKPEAS', 'ING_BULGUR', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_PARSLEY', 'ING_MINT', 'ING_OLIVE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 10)
UNION ALL
SELECT 'armenian', 'ARM_TOLMA_CABBAGE', unnest(ARRAY['ING_CABBAGE', 'ING_GROUND_BEEF', 'ING_RICE', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_PARSLEY', 'ING_DILL', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_SUMMER_TOLMA', unnest(ARRAY['ING_BELL_PEPPER', 'ING_TOMATO', 'ING_EGGPLANT', 'ING_ZUCCHINI', 'ING_GROUND_BEEF', 'ING_RICE', 'ING_ONION', 'ING_PARSLEY', 'ING_BASIL', 'ING_SALT']), 'main', false, generate_series(1, 10)
UNION ALL
SELECT 'armenian', 'ARM_EETCH_TOLMA', unnest(ARRAY['ING_BELL_PEPPER', 'ING_BULGUR', 'ING_TOMATO', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_PARSLEY', 'ING_MINT', 'ING_OLIVE_OIL', 'ING_LEMON_JUICE', 'ING_SALT']), 'main', false, generate_series(1, 10)
UNION ALL
SELECT 'armenian', 'ARM_TOLMA_QUINCE', unnest(ARRAY['ING_QUINCE', 'ING_GROUND_LAMB', 'ING_RICE', 'ING_ONION', 'ING_CINNAMON', 'ING_ALLSPICE', 'ING_BUTTER', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_TOLMA_APPLE', unnest(ARRAY['ING_APPLE', 'ING_GROUND_LAMB', 'ING_RICE', 'ING_ONION', 'ING_CINNAMON', 'ING_HONEY', 'ING_BUTTER', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_PRASA_TOLMA', unnest(ARRAY['ING_LEEK', 'ING_GROUND_BEEF', 'ING_RICE', 'ING_ONION', 'ING_PARSLEY', 'ING_DILL', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)

-- ============================================
-- SOUPS
-- ============================================
UNION ALL
SELECT 'armenian', 'ARM_KHASH', unnest(ARRAY['ING_BEEF_FEET', 'ING_GARLIC', 'ING_SALT', 'ING_LAVASH', 'ING_RADISH', 'ING_VINEGAR']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_SPAS', unnest(ARRAY['ING_YOGURT', 'ING_WHEAT_BERRIES', 'ING_EGG', 'ING_ONION', 'ING_BUTTER', 'ING_MINT', 'ING_CILANTRO', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_BOZBASH', unnest(ARRAY['ING_LAMB_SHOULDER', 'ING_CHICKPEAS', 'ING_POTATO', 'ING_DRIED_APRICOTS', 'ING_PRUNES', 'ING_ONION', 'ING_SAFFRON', 'ING_TURMERIC', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_KOLOLAK', unnest(ARRAY['ING_GROUND_BEEF', 'ING_RICE', 'ING_EGG', 'ING_ONION', 'ING_PARSLEY', 'ING_TOMATO_PASTE', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_AVELUK_SOUP', unnest(ARRAY['ING_AVELUK', 'ING_LENTILS', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 7)
UNION ALL
SELECT 'armenian', 'ARM_TARKHANA', unnest(ARRAY['ING_TARKHANA', 'ING_BUTTER', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_MINT', 'ING_SALT']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_VOSPAPUR', unnest(ARRAY['ING_RED_LENTILS', 'ING_DRIED_APRICOTS', 'ING_ONION', 'ING_POTATO', 'ING_CUMIN', 'ING_OLIVE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 7)
UNION ALL
SELECT 'armenian', 'ARM_MATSUN_SOUP', unnest(ARRAY['ING_YOGURT', 'ING_CUCUMBER', 'ING_DILL', 'ING_MINT', 'ING_WALNUTS', 'ING_GARLIC', 'ING_SALT', 'ING_ICE']), 'main', false, generate_series(1, 8)

-- ============================================
-- DUMPLINGS
-- ============================================
UNION ALL
SELECT 'armenian', 'ARM_MANTI', unnest(ARRAY['ING_FLOUR', 'ING_EGG', 'ING_GROUND_LAMB', 'ING_ONION', 'ING_PARSLEY', 'ING_YOGURT', 'ING_GARLIC', 'ING_TOMATO_PASTE', 'ING_BUTTER', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 11)
UNION ALL
SELECT 'armenian', 'ARM_KHINKALI', unnest(ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_ONION', 'ING_CILANTRO', 'ING_CUMIN', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_BEEF_BROTH']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_BORAKI', unnest(ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_ONION', 'ING_PARSLEY', 'ING_BUTTER', 'ING_YOGURT', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_MANTAPOUR', unnest(ARRAY['ING_FLOUR', 'ING_GROUND_LAMB', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_BEEF_BROTH', 'ING_PARSLEY', 'ING_MINT', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_PELMEN', unnest(ARRAY['ING_FLOUR', 'ING_EGG', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_ONION', 'ING_BUTTER', 'ING_SOUR_CREAM', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_MANTI_LENTEN', unnest(ARRAY['ING_FLOUR', 'ING_LENTILS', 'ING_ONION', 'ING_OLIVE_OIL', 'ING_CUMIN', 'ING_PARSLEY', 'ING_SALT']), 'main', false, generate_series(1, 7)

-- ============================================
-- STEWS & MAINS
-- ============================================
UNION ALL
SELECT 'armenian', 'ARM_HARISSA', unnest(ARRAY['ING_CHICKEN_WHOLE', 'ING_WHEAT_BERRIES', 'ING_BUTTER', 'ING_SALT', 'ING_BLACK_PEPPER']), 'main', false, generate_series(1, 5)
UNION ALL
SELECT 'armenian', 'ARM_GHAPAMA', unnest(ARRAY['ING_PUMPKIN', 'ING_RICE', 'ING_DRIED_APRICOTS', 'ING_RAISINS', 'ING_PRUNES', 'ING_WALNUTS', 'ING_ALMONDS', 'ING_HONEY', 'ING_CINNAMON', 'ING_BUTTER']), 'main', false, generate_series(1, 10)
UNION ALL
SELECT 'armenian', 'ARM_KHASHLAMA', unnest(ARRAY['ING_LAMB_SHOULDER', 'ING_POTATO', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_PARSLEY', 'ING_DILL', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_TJVJIK', unnest(ARRAY['ING_BEEF_LIVER', 'ING_BEEF_HEART', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_BELL_PEPPER', 'ING_PARSLEY', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_ISHKHAN_BAKED', unnest(ARRAY['ING_TROUT', 'ING_RICE', 'ING_DILL', 'ING_PARSLEY', 'ING_LEMON', 'ING_BUTTER', 'ING_GARLIC', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_PASUTS_FASULYA', unnest(ARRAY['ING_WHITE_BEANS', 'ING_ONION', 'ING_WALNUTS', 'ING_OLIVE_OIL', 'ING_PARSLEY', 'ING_SALT']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_KYUFTA', unnest(ARRAY['ING_GROUND_BEEF', 'ING_BULGUR', 'ING_ONION', 'ING_EGG', 'ING_BUTTER', 'ING_PARSLEY', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_KCHUCH', unnest(ARRAY['ING_LAMB_SHOULDER', 'ING_POTATO', 'ING_EGGPLANT', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_DRIED_APRICOTS', 'ING_PRUNES', 'ING_GARLIC', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_TAVA', unnest(ARRAY['ING_LAMB_LEG', 'ING_POTATO', 'ING_TOMATO', 'ING_EGGPLANT', 'ING_ONION', 'ING_GARLIC', 'ING_BUTTER', 'ING_PARSLEY', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_PORANI', unnest(ARRAY['ING_SPINACH', 'ING_ONION', 'ING_EGG', 'ING_BUTTER', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 7)

-- ============================================
-- APPETIZERS & MEZZE
-- ============================================
UNION ALL
SELECT 'armenian', 'ARM_BASTURMA', unnest(ARRAY['ING_BEEF_EYE_ROUND', 'ING_FENUGREEK', 'ING_PAPRIKA', 'ING_CUMIN', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 7)
UNION ALL
SELECT 'armenian', 'ARM_LAHMAJUN', unnest(ARRAY['ING_FLOUR', 'ING_GROUND_LAMB', 'ING_TOMATO', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_PARSLEY', 'ING_PAPRIKA', 'ING_CUMIN', 'ING_LEMON', 'ING_SALT']), 'main', false, generate_series(1, 10)
UNION ALL
SELECT 'armenian', 'ARM_SOUJOUK', unnest(ARRAY['ING_GROUND_BEEF', 'ING_FENUGREEK', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT']), 'main', false, generate_series(1, 7)
UNION ALL
SELECT 'armenian', 'ARM_CHI_KOFTA', unnest(ARRAY['ING_BEEF_SIRLOIN', 'ING_BULGUR', 'ING_ONION', 'ING_PARSLEY', 'ING_PAPRIKA', 'ING_CUMIN', 'ING_OLIVE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_JINGALOV_HATS', unnest(ARRAY['ING_FLOUR', 'ING_SPINACH', 'ING_SORREL', 'ING_DILL', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_GREEN_ONION', 'ING_OLIVE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_CHEESE_BEUREG', unnest(ARRAY['ING_PHYLLO_DOUGH', 'ING_STRING_CHEESE', 'ING_FETA_CHEESE', 'ING_EGG', 'ING_PARSLEY', 'ING_BUTTER']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_TOPIK', unnest(ARRAY['ING_CHICKPEAS', 'ING_POTATO', 'ING_ONION', 'ING_TAHINI', 'ING_CUMIN', 'ING_CINNAMON', 'ING_PINE_NUTS', 'ING_CURRANTS', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_MUHAMMARA', unnest(ARRAY['ING_ROASTED_RED_PEPPER', 'ING_WALNUTS', 'ING_POMEGRANATE_MOLASSES', 'ING_ALEPPO_PEPPER', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_CUMIN', 'ING_SALT']), 'main', false, generate_series(1, 8)

-- ============================================
-- SALADS & SIDES
-- ============================================
UNION ALL
SELECT 'armenian', 'ARM_EETCH', unnest(ARRAY['ING_BULGUR', 'ING_TOMATO', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_PARSLEY', 'ING_TOMATO_PASTE', 'ING_POMEGRANATE_MOLASSES', 'ING_OLIVE_OIL', 'ING_LEMON_JUICE', 'ING_SALT']), 'main', false, generate_series(1, 10)
UNION ALL
SELECT 'armenian', 'ARM_TORSHI', unnest(ARRAY['ING_CAULIFLOWER', 'ING_CABBAGE', 'ING_CARROT', 'ING_BELL_PEPPER', 'ING_GARLIC', 'ING_DILL', 'ING_VINEGAR', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_PANCAR', unnest(ARRAY['ING_BEET', 'ING_WALNUTS', 'ING_GARLIC', 'ING_YOGURT', 'ING_DILL', 'ING_SALT']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_TUTUM', unnest(ARRAY['ING_YOGURT', 'ING_GARLIC', 'ING_SALT']), 'main', false, generate_series(1, 3)
UNION ALL
SELECT 'armenian', 'ARM_AVELUK_SALAD', unnest(ARRAY['ING_AVELUK', 'ING_WALNUTS', 'ING_GARLIC', 'ING_POMEGRANATE_SEEDS', 'ING_OLIVE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_LOBIA', unnest(ARRAY['ING_KIDNEY_BEANS', 'ING_WALNUTS', 'ING_ONION', 'ING_CILANTRO', 'ING_POMEGRANATE_MOLASSES', 'ING_OLIVE_OIL', 'ING_SALT']), 'main', false, generate_series(1, 7)

-- ============================================
-- BREADS
-- ============================================
UNION ALL
SELECT 'armenian', 'ARM_LAVASH', unnest(ARRAY['ING_FLOUR', 'ING_WATER', 'ING_SALT']), 'main', false, generate_series(1, 3)
UNION ALL
SELECT 'armenian', 'ARM_MATNAKASH', unnest(ARRAY['ING_FLOUR', 'ING_YEAST', 'ING_WATER', 'ING_MILK', 'ING_BUTTER', 'ING_SUGAR', 'ING_SALT']), 'main', false, generate_series(1, 7)
UNION ALL
SELECT 'armenian', 'ARM_TONIR_HATS', unnest(ARRAY['ING_FLOUR', 'ING_YEAST', 'ING_WATER', 'ING_SALT']), 'main', false, generate_series(1, 4)
UNION ALL
SELECT 'armenian', 'ARM_ZHINGYALOV_HATS_BREAD', unnest(ARRAY['ING_FLOUR', 'ING_SPINACH', 'ING_SORREL', 'ING_DILL', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_GREEN_ONION', 'ING_CHIVES', 'ING_SALT']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_CHOREK', unnest(ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_MILK', 'ING_EGG', 'ING_SUGAR', 'ING_YEAST', 'ING_MAHLAB', 'ING_ANISE_SEEDS', 'ING_SESAME_SEEDS']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_KATA', unnest(ARRAY['ING_FLOUR', 'ING_YEAST', 'ING_BUTTER', 'ING_WATER', 'ING_SALT']), 'main', false, generate_series(1, 5)

-- ============================================
-- RICE & GRAINS
-- ============================================
UNION ALL
SELECT 'armenian', 'ARM_PILAF_VERMICELLI', unnest(ARRAY['ING_RICE', 'ING_VERMICELLI', 'ING_BUTTER', 'ING_CHICKEN_BROTH', 'ING_SALT']), 'main', false, generate_series(1, 5)
UNION ALL
SELECT 'armenian', 'ARM_BULGUR_PILAF', unnest(ARRAY['ING_BULGUR', 'ING_ONION', 'ING_BUTTER', 'ING_CHICKEN_BROTH', 'ING_SALT']), 'main', false, generate_series(1, 5)
UNION ALL
SELECT 'armenian', 'ARM_MUJADDARA', unnest(ARRAY['ING_LENTILS', 'ING_BULGUR', 'ING_ONION', 'ING_OLIVE_OIL', 'ING_CUMIN', 'ING_SALT']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_HERISA_GRAIN', unnest(ARRAY['ING_WHEAT_BERRIES', 'ING_LAMB_SHOULDER', 'ING_BUTTER', 'ING_SALT']), 'main', false, generate_series(1, 4)
UNION ALL
SELECT 'armenian', 'ARM_PILAF_DRIED_FRUIT', unnest(ARRAY['ING_RICE', 'ING_DRIED_APRICOTS', 'ING_RAISINS', 'ING_ALMONDS', 'ING_BUTTER', 'ING_CINNAMON', 'ING_HONEY', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_SPAS_GRAIN', unnest(ARRAY['ING_BULGUR', 'ING_YOGURT', 'ING_EGG', 'ING_BUTTER', 'ING_MINT', 'ING_SALT']), 'main', false, generate_series(1, 6)

-- ============================================
-- DESSERTS
-- ============================================
UNION ALL
SELECT 'armenian', 'ARM_GATA', unnest(ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_SUGAR', 'ING_YOGURT', 'ING_EGG', 'ING_BAKING_SODA', 'ING_VANILLA', 'ING_SALT']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_NAZOOK', unnest(ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_YOGURT', 'ING_WALNUTS', 'ING_SUGAR', 'ING_EGG', 'ING_CINNAMON', 'ING_VANILLA']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_PAKHLAVA', unnest(ARRAY['ING_PHYLLO_DOUGH', 'ING_WALNUTS', 'ING_BUTTER', 'ING_HONEY', 'ING_SUGAR', 'ING_CINNAMON', 'ING_CLOVES', 'ING_LEMON_JUICE']), 'main', false, generate_series(1, 8)
UNION ALL
SELECT 'armenian', 'ARM_SUJUKH', unnest(ARRAY['ING_WALNUTS', 'ING_GRAPE_JUICE', 'ING_FLOUR', 'ING_SUGAR', 'ING_CINNAMON', 'ING_CLOVES']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_ANOUSHABOUR', unnest(ARRAY['ING_WHEAT_BERRIES', 'ING_DRIED_APRICOTS', 'ING_RAISINS', 'ING_WALNUTS', 'ING_ALMONDS', 'ING_POMEGRANATE_SEEDS', 'ING_ROSE_WATER', 'ING_SUGAR', 'ING_CINNAMON']), 'main', false, generate_series(1, 9)
UNION ALL
SELECT 'armenian', 'ARM_KADAYIF', unnest(ARRAY['ING_KNAFEH_DOUGH', 'ING_WALNUTS', 'ING_BUTTER', 'ING_SUGAR', 'ING_LEMON_JUICE', 'ING_ROSE_WATER']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_HALVA_TAHINI', unnest(ARRAY['ING_TAHINI', 'ING_SUGAR', 'ING_PISTACHIOS', 'ING_VANILLA']), 'main', false, generate_series(1, 4)
UNION ALL
SELECT 'armenian', 'ARM_ALANI', unnest(ARRAY['ING_DRIED_PEACHES', 'ING_WALNUTS', 'ING_SUGAR', 'ING_CINNAMON']), 'main', false, generate_series(1, 4)
UNION ALL
SELECT 'armenian', 'ARM_SUTLAC', unnest(ARRAY['ING_RICE', 'ING_MILK', 'ING_SUGAR', 'ING_EGG', 'ING_VANILLA', 'ING_CINNAMON']), 'main', false, generate_series(1, 6)
UNION ALL
SELECT 'armenian', 'ARM_BASTUKH', unnest(ARRAY['ING_APRICOTS', 'ING_PLUMS', 'ING_SUGAR']), 'main', false, generate_series(1, 3);

-- ============================================
-- ~580 product_ingredients links created
-- Armenian database import complete!
-- ============================================
