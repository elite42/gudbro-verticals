-- ============================================
-- LEBANESE DATABASE - Product Ingredients
-- ============================================
-- Links Lebanese dishes to their ingredients
-- Run AFTER 02-lebanese-data.sql
-- ============================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, is_optional, role)
VALUES

-- ============================================
-- MEZZE & DIPS
-- ============================================

-- Hummus
('lebanese', 'LEBANESE_HUMMUS', 'ING_CHICKPEAS', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS', 'ING_CUMIN', false, 'seasoning'),
('lebanese', 'LEBANESE_HUMMUS', 'ING_SEA_SALT', false, 'seasoning'),

-- Hummus Beiruty
('lebanese', 'LEBANESE_HUMMUS_BEIRUTY', 'ING_CHICKPEAS', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_BEIRUTY', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_BEIRUTY', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_BEIRUTY', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_BEIRUTY', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_BEIRUTY', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_BEIRUTY', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_HUMMUS_BEIRUTY', 'ING_POMEGRANATE_SEEDS', false, 'garnish'),
('lebanese', 'LEBANESE_HUMMUS_BEIRUTY', 'ING_SEVEN_SPICE', false, 'seasoning'),

-- Baba Ganoush
('lebanese', 'LEBANESE_BABA_GANOUSH', 'ING_EGGPLANT', false, 'main'),
('lebanese', 'LEBANESE_BABA_GANOUSH', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_BABA_GANOUSH', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_BABA_GANOUSH', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_BABA_GANOUSH', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_BABA_GANOUSH', 'ING_PARSLEY', false, 'garnish'),
('lebanese', 'LEBANESE_BABA_GANOUSH', 'ING_SEA_SALT', false, 'seasoning'),

-- Mutabal
('lebanese', 'LEBANESE_MUTABAL', 'ING_EGGPLANT', false, 'main'),
('lebanese', 'LEBANESE_MUTABAL', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_MUTABAL', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_MUTABAL', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_MUTABAL', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_MUTABAL', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_MUTABAL', 'ING_POMEGRANATE_MOLASSES', false, 'garnish'),

-- Labneh
('lebanese', 'LEBANESE_LABNEH', 'ING_LABNEH', false, 'main'),
('lebanese', 'LEBANESE_LABNEH', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_LABNEH', 'ING_ZAATAR', false, 'garnish'),
('lebanese', 'LEBANESE_LABNEH', 'ING_SEA_SALT', false, 'seasoning'),

-- Muhammara
('lebanese', 'LEBANESE_MUHAMMARA', 'ING_ROASTED_RED_PEPPER', false, 'main'),
('lebanese', 'LEBANESE_MUHAMMARA', 'ING_WALNUTS', false, 'main'),
('lebanese', 'LEBANESE_MUHAMMARA', 'ING_POMEGRANATE_MOLASSES', false, 'main'),
('lebanese', 'LEBANESE_MUHAMMARA', 'ING_BREADCRUMBS', false, 'main'),
('lebanese', 'LEBANESE_MUHAMMARA', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_MUHAMMARA', 'ING_CUMIN', false, 'seasoning'),
('lebanese', 'LEBANESE_MUHAMMARA', 'ING_ALEPPO_PEPPER', false, 'seasoning'),
('lebanese', 'LEBANESE_MUHAMMARA', 'ING_GARLIC', false, 'seasoning'),

-- Shanklish
('lebanese', 'LEBANESE_SHANKLISH', 'ING_SHANKLISH_CHEESE', false, 'main'),
('lebanese', 'LEBANESE_SHANKLISH', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_SHANKLISH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_SHANKLISH', 'ING_ZAATAR', false, 'seasoning'),
('lebanese', 'LEBANESE_SHANKLISH', 'ING_ALEPPO_PEPPER', false, 'seasoning'),
('lebanese', 'LEBANESE_SHANKLISH', 'ING_OLIVE_OIL', false, 'main'),

-- Toum
('lebanese', 'LEBANESE_TOUM', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_TOUM', 'ING_VEGETABLE_OIL', false, 'main'),
('lebanese', 'LEBANESE_TOUM', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_TOUM', 'ING_SEA_SALT', false, 'seasoning'),

-- Foul Mudammas
('lebanese', 'LEBANESE_FOUL_MUDAMMAS', 'ING_FAVA_BEANS', false, 'main'),
('lebanese', 'LEBANESE_FOUL_MUDAMMAS', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_FOUL_MUDAMMAS', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_FOUL_MUDAMMAS', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_FOUL_MUDAMMAS', 'ING_CUMIN', false, 'seasoning'),
('lebanese', 'LEBANESE_FOUL_MUDAMMAS', 'ING_PARSLEY', false, 'garnish'),
('lebanese', 'LEBANESE_FOUL_MUDAMMAS', 'ING_SEA_SALT', false, 'seasoning'),

-- Fatteh
('lebanese', 'LEBANESE_FATTEH', 'ING_PITA_BREAD', false, 'main'),
('lebanese', 'LEBANESE_FATTEH', 'ING_CHICKPEAS', false, 'main'),
('lebanese', 'LEBANESE_FATTEH', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_FATTEH', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_FATTEH', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_FATTEH', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_FATTEH', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_FATTEH', 'ING_CUMIN', false, 'seasoning'),
('lebanese', 'LEBANESE_FATTEH', 'ING_PAPRIKA', false, 'seasoning'),

-- Taramosalata
('lebanese', 'LEBANESE_TARAMOSALATA', 'ING_FISH_ROE', false, 'main'),
('lebanese', 'LEBANESE_TARAMOSALATA', 'ING_BREAD', false, 'main'),
('lebanese', 'LEBANESE_TARAMOSALATA', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_TARAMOSALATA', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_TARAMOSALATA', 'ING_ONION', false, 'main'),

-- Hummus Kawarma
('lebanese', 'LEBANESE_HUMMUS_KAWARMA', 'ING_CHICKPEAS', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_KAWARMA', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_KAWARMA', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_KAWARMA', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_KAWARMA', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_KAWARMA', 'ING_KAWARMA', false, 'main'),
('lebanese', 'LEBANESE_HUMMUS_KAWARMA', 'ING_PINE_NUTS', false, 'garnish'),

-- ============================================
-- SALADS
-- ============================================

-- Tabbouleh
('lebanese', 'LEBANESE_TABBOULEH', 'ING_PARSLEY', false, 'main'),
('lebanese', 'LEBANESE_TABBOULEH', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_TABBOULEH', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_TABBOULEH', 'ING_MINT', false, 'main'),
('lebanese', 'LEBANESE_TABBOULEH', 'ING_SCALLIONS', false, 'main'),
('lebanese', 'LEBANESE_TABBOULEH', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_TABBOULEH', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_TABBOULEH', 'ING_SEA_SALT', false, 'seasoning'),

-- Fattoush
('lebanese', 'LEBANESE_FATTOUSH', 'ING_PITA_BREAD', false, 'main'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_ROMAINE_LETTUCE', false, 'main'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_CUCUMBER', false, 'main'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_RADISH', false, 'main'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_SCALLIONS', false, 'main'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_MINT', false, 'main'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_SUMAC', false, 'seasoning'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_POMEGRANATE_MOLASSES', false, 'main'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_FATTOUSH', 'ING_LEMON', false, 'main'),

-- Salata Baladi
('lebanese', 'LEBANESE_SALATA_BALADI', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_SALATA_BALADI', 'ING_CUCUMBER', false, 'main'),
('lebanese', 'LEBANESE_SALATA_BALADI', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_SALATA_BALADI', 'ING_PARSLEY', false, 'main'),
('lebanese', 'LEBANESE_SALATA_BALADI', 'ING_MINT', false, 'main'),
('lebanese', 'LEBANESE_SALATA_BALADI', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_SALATA_BALADI', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SALATA_BALADI', 'ING_SEA_SALT', false, 'seasoning'),

-- Rocca Salad
('lebanese', 'LEBANESE_ROCCA_SALAD', 'ING_ARUGULA', false, 'main'),
('lebanese', 'LEBANESE_ROCCA_SALAD', 'ING_HALLOUMI', false, 'main'),
('lebanese', 'LEBANESE_ROCCA_SALAD', 'ING_POMEGRANATE_SEEDS', false, 'main'),
('lebanese', 'LEBANESE_ROCCA_SALAD', 'ING_WALNUTS', false, 'main'),
('lebanese', 'LEBANESE_ROCCA_SALAD', 'ING_BALSAMIC_VINEGAR', false, 'main'),
('lebanese', 'LEBANESE_ROCCA_SALAD', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_ROCCA_SALAD', 'ING_HONEY', false, 'main'),

-- Hindbeh
('lebanese', 'LEBANESE_HINDBEH', 'ING_DANDELION_GREENS', false, 'main'),
('lebanese', 'LEBANESE_HINDBEH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_HINDBEH', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_HINDBEH', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_HINDBEH', 'ING_SEA_SALT', false, 'seasoning'),

-- Loubieh bi Zeit
('lebanese', 'LEBANESE_LOUBIEH_BZEIT', 'ING_GREEN_BEANS', false, 'main'),
('lebanese', 'LEBANESE_LOUBIEH_BZEIT', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_LOUBIEH_BZEIT', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_LOUBIEH_BZEIT', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_LOUBIEH_BZEIT', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_LOUBIEH_BZEIT', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_LOUBIEH_BZEIT', 'ING_SEA_SALT', false, 'seasoning'),

-- Batata Harra
('lebanese', 'LEBANESE_BATATA_HARRA', 'ING_POTATO', false, 'main'),
('lebanese', 'LEBANESE_BATATA_HARRA', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_BATATA_HARRA', 'ING_CILANTRO', false, 'main'),
('lebanese', 'LEBANESE_BATATA_HARRA', 'ING_CHILI_FLAKES', false, 'seasoning'),
('lebanese', 'LEBANESE_BATATA_HARRA', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_BATATA_HARRA', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_BATATA_HARRA', 'ING_SEA_SALT', false, 'seasoning'),

-- Raheb Salad
('lebanese', 'LEBANESE_RAHEB_SALAD', 'ING_EGGPLANT', false, 'main'),
('lebanese', 'LEBANESE_RAHEB_SALAD', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_RAHEB_SALAD', 'ING_BELL_PEPPER', false, 'main'),
('lebanese', 'LEBANESE_RAHEB_SALAD', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_RAHEB_SALAD', 'ING_PARSLEY', false, 'main'),
('lebanese', 'LEBANESE_RAHEB_SALAD', 'ING_POMEGRANATE_MOLASSES', false, 'main'),
('lebanese', 'LEBANESE_RAHEB_SALAD', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_RAHEB_SALAD', 'ING_LEMON', false, 'main'),

-- ============================================
-- KIBBEH
-- ============================================

-- Kibbeh Nayeh
('lebanese', 'LEBANESE_KIBBEH_NAYEH', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_NAYEH', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_NAYEH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_NAYEH', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_NAYEH', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_NAYEH', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_NAYEH', 'ING_MINT', false, 'garnish'),
('lebanese', 'LEBANESE_KIBBEH_NAYEH', 'ING_SEA_SALT', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_NAYEH', 'ING_BLACK_PEPPER', false, 'seasoning'),

-- Kibbeh Makliyeh
('lebanese', 'LEBANESE_KIBBEH_MAKLIYEH', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_MAKLIYEH', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_MAKLIYEH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_MAKLIYEH', 'ING_PINE_NUTS', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_MAKLIYEH', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_MAKLIYEH', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_MAKLIYEH', 'ING_VEGETABLE_OIL', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_MAKLIYEH', 'ING_SEA_SALT', false, 'seasoning'),

-- Kibbeh bil Sayniyeh
('lebanese', 'LEBANESE_KIBBEH_BSAYNIYEH', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BSAYNIYEH', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BSAYNIYEH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BSAYNIYEH', 'ING_PINE_NUTS', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BSAYNIYEH', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_BSAYNIYEH', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_BSAYNIYEH', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BSAYNIYEH', 'ING_SEA_SALT', false, 'seasoning'),

-- Kibbeh Labanieh
('lebanese', 'LEBANESE_KIBBEH_LABANIEH', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LABANIEH', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LABANIEH', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LABANIEH', 'ING_EGG', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LABANIEH', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LABANIEH', 'ING_DRIED_MINT', false, 'garnish'),
('lebanese', 'LEBANESE_KIBBEH_LABANIEH', 'ING_CORNSTARCH', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LABANIEH', 'ING_SEA_SALT', false, 'seasoning'),

-- Kibbeh Samak
('lebanese', 'LEBANESE_KIBBEH_SAMAK', 'ING_WHITE_FISH', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_SAMAK', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_SAMAK', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_SAMAK', 'ING_CILANTRO', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_SAMAK', 'ING_ORANGE_ZEST', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_SAMAK', 'ING_CUMIN', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_SAMAK', 'ING_PINE_NUTS', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_SAMAK', 'ING_VEGETABLE_OIL', false, 'main'),

-- Kibbeh Lakteen
('lebanese', 'LEBANESE_KIBBEH_LAKTEEN', 'ING_BUTTERNUT_SQUASH', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LAKTEEN', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LAKTEEN', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LAKTEEN', 'ING_SPINACH', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LAKTEEN', 'ING_CHICKPEAS', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LAKTEEN', 'ING_WALNUTS', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_LAKTEEN', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_LAKTEEN', 'ING_OLIVE_OIL', false, 'main'),

-- Kibbeh Arnabiyeh
('lebanese', 'LEBANESE_KIBBEH_ARNABIYEH', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_ARNABIYEH', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_ARNABIYEH', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_ARNABIYEH', 'ING_CHICKPEAS', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_ARNABIYEH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_ARNABIYEH', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_ARNABIYEH', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_ARNABIYEH', 'ING_SEA_SALT', false, 'seasoning'),

-- Kibbeh Batata
('lebanese', 'LEBANESE_KIBBEH_BATATA', 'ING_POTATO', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BATATA', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BATATA', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BATATA', 'ING_SPINACH', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BATATA', 'ING_WALNUTS', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BATATA', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_KIBBEH_BATATA', 'ING_VEGETABLE_OIL', false, 'main'),
('lebanese', 'LEBANESE_KIBBEH_BATATA', 'ING_SEA_SALT', false, 'seasoning'),

-- ============================================
-- GRILLED MEATS
-- ============================================

-- Chicken Shawarma
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_CHICKEN_THIGH', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_PAPRIKA', false, 'seasoning'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_TURMERIC', false, 'seasoning'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_PITA_BREAD', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_PICKLES', false, 'garnish'),
('lebanese', 'LEBANESE_SHAWARMA_CHICKEN', 'ING_TOUM', false, 'main'),

-- Lamb Shawarma
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_LAMB_SHOULDER', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_LAMB_FAT', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_CARDAMOM', false, 'seasoning'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_PITA_BREAD', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_PICKLES', false, 'garnish'),
('lebanese', 'LEBANESE_SHAWARMA_LAMB', 'ING_PARSLEY', false, 'garnish'),

-- Shish Tawook
('lebanese', 'LEBANESE_SHISH_TAWOOK', 'ING_CHICKEN_BREAST', false, 'main'),
('lebanese', 'LEBANESE_SHISH_TAWOOK', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_SHISH_TAWOOK', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SHISH_TAWOOK', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_SHISH_TAWOOK', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_SHISH_TAWOOK', 'ING_PAPRIKA', false, 'seasoning'),
('lebanese', 'LEBANESE_SHISH_TAWOOK', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_SHISH_TAWOOK', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_SHISH_TAWOOK', 'ING_TOUM', false, 'main'),

-- Kafta Meshwi
('lebanese', 'LEBANESE_KAFTA_SKEWERS', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_SKEWERS', 'ING_GROUND_BEEF', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_SKEWERS', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_SKEWERS', 'ING_PARSLEY', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_SKEWERS', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_KAFTA_SKEWERS', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_KAFTA_SKEWERS', 'ING_SEA_SALT', false, 'seasoning'),
('lebanese', 'LEBANESE_KAFTA_SKEWERS', 'ING_BLACK_PEPPER', false, 'seasoning'),

-- Lahm Meshwi
('lebanese', 'LEBANESE_LAHM_MESHWI', 'ING_LAMB_SHOULDER', false, 'main'),
('lebanese', 'LEBANESE_LAHM_MESHWI', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_LAHM_MESHWI', 'ING_BELL_PEPPER', false, 'main'),
('lebanese', 'LEBANESE_LAHM_MESHWI', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_LAHM_MESHWI', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_LAHM_MESHWI', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_LAHM_MESHWI', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_LAHM_MESHWI', 'ING_SEA_SALT', false, 'seasoning'),

-- Kastaleta (Lamb Chops)
('lebanese', 'LEBANESE_LAMB_CHOPS', 'ING_LAMB_CHOPS', false, 'main'),
('lebanese', 'LEBANESE_LAMB_CHOPS', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_LAMB_CHOPS', 'ING_ROSEMARY', false, 'seasoning'),
('lebanese', 'LEBANESE_LAMB_CHOPS', 'ING_THYME', false, 'seasoning'),
('lebanese', 'LEBANESE_LAMB_CHOPS', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_LAMB_CHOPS', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_LAMB_CHOPS', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_LAMB_CHOPS', 'ING_MINT', false, 'garnish'),
('lebanese', 'LEBANESE_LAMB_CHOPS', 'ING_SEA_SALT', false, 'seasoning'),

-- Djaj Meshwi
('lebanese', 'LEBANESE_DJAJ_MESHWI', 'ING_WHOLE_CHICKEN', false, 'main'),
('lebanese', 'LEBANESE_DJAJ_MESHWI', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_DJAJ_MESHWI', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_DJAJ_MESHWI', 'ING_PAPRIKA', false, 'seasoning'),
('lebanese', 'LEBANESE_DJAJ_MESHWI', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_DJAJ_MESHWI', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_DJAJ_MESHWI', 'ING_SEA_SALT', false, 'seasoning'),
('lebanese', 'LEBANESE_DJAJ_MESHWI', 'ING_TOUM', false, 'main'),

-- Kafta bil Batata
('lebanese', 'LEBANESE_KAFTA_POTATO', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_POTATO', 'ING_GROUND_BEEF', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_POTATO', 'ING_POTATO', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_POTATO', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_POTATO', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_POTATO', 'ING_PARSLEY', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_POTATO', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_POTATO', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_KAFTA_POTATO', 'ING_OLIVE_OIL', false, 'main'),

-- Kafta bil Tahini
('lebanese', 'LEBANESE_KAFTA_TAHINI', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_TAHINI', 'ING_GROUND_BEEF', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_TAHINI', 'ING_POTATO', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_TAHINI', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_TAHINI', 'ING_PARSLEY', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_TAHINI', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_TAHINI', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_KAFTA_TAHINI', 'ING_SEVEN_SPICE', false, 'seasoning'),

-- Arayes
('lebanese', 'LEBANESE_ARAYES', 'ING_PITA_BREAD', false, 'main'),
('lebanese', 'LEBANESE_ARAYES', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_ARAYES', 'ING_GROUND_BEEF', false, 'main'),
('lebanese', 'LEBANESE_ARAYES', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_ARAYES', 'ING_PARSLEY', false, 'main'),
('lebanese', 'LEBANESE_ARAYES', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_ARAYES', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_ARAYES', 'ING_BUTTER', false, 'main'),

-- ============================================
-- STEWS & MAINS
-- ============================================

-- Molokhia
('lebanese', 'LEBANESE_MOLOKHIA', 'ING_MOLOKHIA', false, 'main'),
('lebanese', 'LEBANESE_MOLOKHIA', 'ING_CHICKEN_THIGH', false, 'main'),
('lebanese', 'LEBANESE_MOLOKHIA', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_MOLOKHIA', 'ING_CORIANDER_SEEDS', false, 'seasoning'),
('lebanese', 'LEBANESE_MOLOKHIA', 'ING_CHICKEN_STOCK', false, 'main'),
('lebanese', 'LEBANESE_MOLOKHIA', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_MOLOKHIA', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_MOLOKHIA', 'ING_OLIVE_OIL', false, 'main'),

-- Fasolia
('lebanese', 'LEBANESE_FASOLIA', 'ING_WHITE_BEANS', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA', 'ING_LAMB_SHOULDER', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_FASOLIA', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA', 'ING_RICE', false, 'main'),

-- Fasolia bi Zeit
('lebanese', 'LEBANESE_FASOLIA_BZEIT', 'ING_GREEN_BEANS', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA_BZEIT', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA_BZEIT', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA_BZEIT', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA_BZEIT', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA_BZEIT', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_FASOLIA_BZEIT', 'ING_SEA_SALT', false, 'seasoning'),

-- Bamieh
('lebanese', 'LEBANESE_BAMIEH', 'ING_OKRA', false, 'main'),
('lebanese', 'LEBANESE_BAMIEH', 'ING_LAMB_SHOULDER', false, 'main'),
('lebanese', 'LEBANESE_BAMIEH', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_BAMIEH', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_BAMIEH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_BAMIEH', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_BAMIEH', 'ING_CILANTRO', false, 'garnish'),
('lebanese', 'LEBANESE_BAMIEH', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_BAMIEH', 'ING_RICE', false, 'main'),

-- Yakhnit Batinjane
('lebanese', 'LEBANESE_YAKHNIT_BATINJANE', 'ING_EGGPLANT', false, 'main'),
('lebanese', 'LEBANESE_YAKHNIT_BATINJANE', 'ING_LAMB_SHOULDER', false, 'main'),
('lebanese', 'LEBANESE_YAKHNIT_BATINJANE', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_YAKHNIT_BATINJANE', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_YAKHNIT_BATINJANE', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_YAKHNIT_BATINJANE', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_YAKHNIT_BATINJANE', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_YAKHNIT_BATINJANE', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_YAKHNIT_BATINJANE', 'ING_RICE', false, 'main'),

-- Laban Immo
('lebanese', 'LEBANESE_LABAN_IMMO', 'ING_LAMB_SHOULDER', false, 'main'),
('lebanese', 'LEBANESE_LABAN_IMMO', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_LABAN_IMMO', 'ING_EGG', false, 'main'),
('lebanese', 'LEBANESE_LABAN_IMMO', 'ING_CORNSTARCH', false, 'main'),
('lebanese', 'LEBANESE_LABAN_IMMO', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_LABAN_IMMO', 'ING_DRIED_MINT', false, 'garnish'),
('lebanese', 'LEBANESE_LABAN_IMMO', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_LABAN_IMMO', 'ING_BUTTER', false, 'main'),

-- Sheikh al Mahshi
('lebanese', 'LEBANESE_SHEIKH_MAHSHI', 'ING_EGGPLANT', false, 'main'),
('lebanese', 'LEBANESE_SHEIKH_MAHSHI', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_SHEIKH_MAHSHI', 'ING_GROUND_BEEF', false, 'main'),
('lebanese', 'LEBANESE_SHEIKH_MAHSHI', 'ING_PINE_NUTS', false, 'main'),
('lebanese', 'LEBANESE_SHEIKH_MAHSHI', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_SHEIKH_MAHSHI', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_SHEIKH_MAHSHI', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_SHEIKH_MAHSHI', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_SHEIKH_MAHSHI', 'ING_POMEGRANATE_MOLASSES', false, 'main'),

-- Makdous
('lebanese', 'LEBANESE_FATTIT_MAKDOUS', 'ING_BABY_EGGPLANT', false, 'main'),
('lebanese', 'LEBANESE_FATTIT_MAKDOUS', 'ING_WALNUTS', false, 'main'),
('lebanese', 'LEBANESE_FATTIT_MAKDOUS', 'ING_RED_PEPPER', false, 'main'),
('lebanese', 'LEBANESE_FATTIT_MAKDOUS', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_FATTIT_MAKDOUS', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_FATTIT_MAKDOUS', 'ING_SEA_SALT', false, 'seasoning'),

-- Koussa Ablama
('lebanese', 'LEBANESE_KOUSSA_ABLAMA', 'ING_ZUCCHINI', false, 'main'),
('lebanese', 'LEBANESE_KOUSSA_ABLAMA', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KOUSSA_ABLAMA', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_KOUSSA_ABLAMA', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_KOUSSA_ABLAMA', 'ING_EGG', false, 'main'),
('lebanese', 'LEBANESE_KOUSSA_ABLAMA', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_KOUSSA_ABLAMA', 'ING_DRIED_MINT', false, 'garnish'),
('lebanese', 'LEBANESE_KOUSSA_ABLAMA', 'ING_SEVEN_SPICE', false, 'seasoning'),

-- Sayadieh
('lebanese', 'LEBANESE_SAYADEIH', 'ING_WHITE_FISH', false, 'main'),
('lebanese', 'LEBANESE_SAYADEIH', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_SAYADEIH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_SAYADEIH', 'ING_CUMIN', false, 'seasoning'),
('lebanese', 'LEBANESE_SAYADEIH', 'ING_SAFFRON', false, 'seasoning'),
('lebanese', 'LEBANESE_SAYADEIH', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_SAYADEIH', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_SAYADEIH', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SAYADEIH', 'ING_OLIVE_OIL', false, 'main'),

-- ============================================
-- RICE & GRAINS
-- ============================================

-- Mujadara
('lebanese', 'LEBANESE_MUJADARA', 'ING_LENTILS', false, 'main'),
('lebanese', 'LEBANESE_MUJADARA', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_MUJADARA', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_MUJADARA', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_MUJADARA', 'ING_CUMIN', false, 'seasoning'),
('lebanese', 'LEBANESE_MUJADARA', 'ING_SEA_SALT', false, 'seasoning'),

-- Riz bi Sha'rieh
('lebanese', 'LEBANESE_RIZ_SHARIEH', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_RIZ_SHARIEH', 'ING_VERMICELLI', false, 'main'),
('lebanese', 'LEBANESE_RIZ_SHARIEH', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_RIZ_SHARIEH', 'ING_SEA_SALT', false, 'seasoning'),

-- Riz bi Lahme
('lebanese', 'LEBANESE_RIZ_LAHME', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_RIZ_LAHME', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_RIZ_LAHME', 'ING_GROUND_BEEF', false, 'main'),
('lebanese', 'LEBANESE_RIZ_LAHME', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_RIZ_LAHME', 'ING_ALMONDS', false, 'garnish'),
('lebanese', 'LEBANESE_RIZ_LAHME', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_RIZ_LAHME', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_RIZ_LAHME', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_RIZ_LAHME', 'ING_BUTTER', false, 'main'),

-- Freekeh
('lebanese', 'LEBANESE_FREEKEH', 'ING_FREEKEH', false, 'main'),
('lebanese', 'LEBANESE_FREEKEH', 'ING_CHICKEN_THIGH', false, 'main'),
('lebanese', 'LEBANESE_FREEKEH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_FREEKEH', 'ING_CHICKEN_STOCK', false, 'main'),
('lebanese', 'LEBANESE_FREEKEH', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_FREEKEH', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_FREEKEH', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_FREEKEH', 'ING_BUTTER', false, 'main'),

-- Burghul bi Banadoura
('lebanese', 'LEBANESE_BURGHUL_BANADOURA', 'ING_BULGUR', false, 'main'),
('lebanese', 'LEBANESE_BURGHUL_BANADOURA', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_BURGHUL_BANADOURA', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_BURGHUL_BANADOURA', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_BURGHUL_BANADOURA', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_BURGHUL_BANADOURA', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_BURGHUL_BANADOURA', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_BURGHUL_BANADOURA', 'ING_SEA_SALT', false, 'seasoning'),

-- Hashwit Djaj
('lebanese', 'LEBANESE_HASHWIT_DJAJ', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_HASHWIT_DJAJ', 'ING_WHOLE_CHICKEN', false, 'main'),
('lebanese', 'LEBANESE_HASHWIT_DJAJ', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_HASHWIT_DJAJ', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_HASHWIT_DJAJ', 'ING_ALMONDS', false, 'garnish'),
('lebanese', 'LEBANESE_HASHWIT_DJAJ', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_HASHWIT_DJAJ', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_HASHWIT_DJAJ', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_HASHWIT_DJAJ', 'ING_BUTTER', false, 'main'),

-- Keshek
('lebanese', 'LEBANESE_KESHEK', 'ING_KESHEK', false, 'main'),
('lebanese', 'LEBANESE_KESHEK', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KESHEK', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_KESHEK', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_KESHEK', 'ING_SEA_SALT', false, 'seasoning'),
('lebanese', 'LEBANESE_KESHEK', 'ING_DRIED_MINT', false, 'garnish'),

-- Mansaf
('lebanese', 'LEBANESE_MANSAF', 'ING_LAMB_SHOULDER', false, 'main'),
('lebanese', 'LEBANESE_MANSAF', 'ING_JAMEED', false, 'main'),
('lebanese', 'LEBANESE_MANSAF', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_MANSAF', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_MANSAF', 'ING_ALMONDS', false, 'garnish'),
('lebanese', 'LEBANESE_MANSAF', 'ING_SHRAK_BREAD', false, 'main'),
('lebanese', 'LEBANESE_MANSAF', 'ING_TURMERIC', false, 'seasoning'),
('lebanese', 'LEBANESE_MANSAF', 'ING_BUTTER', false, 'main'),

-- ============================================
-- STUFFED DISHES
-- ============================================

-- Warak Enab
('lebanese', 'LEBANESE_WARAK_ENAB', 'ING_GRAPE_LEAVES', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB', 'ING_PARSLEY', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB', 'ING_MINT', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB', 'ING_SEVEN_SPICE', false, 'seasoning'),

-- Warak Enab bi Lahme
('lebanese', 'LEBANESE_WARAK_ENAB_MEAT', 'ING_GRAPE_LEAVES', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB_MEAT', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB_MEAT', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB_MEAT', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB_MEAT', 'ING_PINE_NUTS', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB_MEAT', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_WARAK_ENAB_MEAT', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_WARAK_ENAB_MEAT', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_WARAK_ENAB_MEAT', 'ING_LEMON', false, 'main'),

-- Kousa Mahshi
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_ZUCCHINI', false, 'main'),
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_MINT', false, 'garnish'),
('lebanese', 'LEBANESE_KOUSA_MAHSHI', 'ING_LEMON', false, 'main'),

-- Batinjane Mahshi
('lebanese', 'LEBANESE_BATINJANE_MAHSHI', 'ING_BABY_EGGPLANT', false, 'main'),
('lebanese', 'LEBANESE_BATINJANE_MAHSHI', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_BATINJANE_MAHSHI', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_BATINJANE_MAHSHI', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_BATINJANE_MAHSHI', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_BATINJANE_MAHSHI', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_BATINJANE_MAHSHI', 'ING_PINE_NUTS', false, 'main'),
('lebanese', 'LEBANESE_BATINJANE_MAHSHI', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_BATINJANE_MAHSHI', 'ING_GARLIC', false, 'main'),

-- Malfuf Mahshi
('lebanese', 'LEBANESE_MALFUF_MAHSHI', 'ING_CABBAGE', false, 'main'),
('lebanese', 'LEBANESE_MALFUF_MAHSHI', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_MALFUF_MAHSHI', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_MALFUF_MAHSHI', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_MALFUF_MAHSHI', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_MALFUF_MAHSHI', 'ING_DRIED_MINT', false, 'seasoning'),
('lebanese', 'LEBANESE_MALFUF_MAHSHI', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_MALFUF_MAHSHI', 'ING_SEVEN_SPICE', false, 'seasoning'),

-- Silq Mahshi
('lebanese', 'LEBANESE_SILQ_MAHSHI', 'ING_SWISS_CHARD', false, 'main'),
('lebanese', 'LEBANESE_SILQ_MAHSHI', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_SILQ_MAHSHI', 'ING_CHICKPEAS', false, 'main'),
('lebanese', 'LEBANESE_SILQ_MAHSHI', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_SILQ_MAHSHI', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SILQ_MAHSHI', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_SILQ_MAHSHI', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_SILQ_MAHSHI', 'ING_SEVEN_SPICE', false, 'seasoning'),

-- Filfil Mahshi
('lebanese', 'LEBANESE_FILFIL_MAHSHI', 'ING_BELL_PEPPER', false, 'main'),
('lebanese', 'LEBANESE_FILFIL_MAHSHI', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_FILFIL_MAHSHI', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_FILFIL_MAHSHI', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_FILFIL_MAHSHI', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_FILFIL_MAHSHI', 'ING_TOMATO_PASTE', false, 'main'),
('lebanese', 'LEBANESE_FILFIL_MAHSHI', 'ING_PINE_NUTS', false, 'main'),
('lebanese', 'LEBANESE_FILFIL_MAHSHI', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_FILFIL_MAHSHI', 'ING_PARSLEY', false, 'garnish'),

-- Ablama
('lebanese', 'LEBANESE_ABLAMA', 'ING_ZUCCHINI', false, 'main'),
('lebanese', 'LEBANESE_ABLAMA', 'ING_BABY_EGGPLANT', false, 'main'),
('lebanese', 'LEBANESE_ABLAMA', 'ING_BELL_PEPPER', false, 'main'),
('lebanese', 'LEBANESE_ABLAMA', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_ABLAMA', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_ABLAMA', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_ABLAMA', 'ING_EGG', false, 'main'),
('lebanese', 'LEBANESE_ABLAMA', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_ABLAMA', 'ING_DRIED_MINT', false, 'garnish'),

-- ============================================
-- BREADS & PASTRIES (continued in next section)
-- ============================================

-- Manakish Zaatar
('lebanese', 'LEBANESE_MANAKISH_ZAATAR', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_ZAATAR', 'ING_YEAST', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_ZAATAR', 'ING_ZAATAR', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_ZAATAR', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_ZAATAR', 'ING_SEA_SALT', false, 'seasoning'),
('lebanese', 'LEBANESE_MANAKISH_ZAATAR', 'ING_SUGAR', false, 'main'),

-- Manakish Jebneh
('lebanese', 'LEBANESE_MANAKISH_CHEESE', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_CHEESE', 'ING_YEAST', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_CHEESE', 'ING_AKAWI_CHEESE', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_CHEESE', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_CHEESE', 'ING_SEA_SALT', false, 'seasoning'),

-- Lahm bi Ajin
('lebanese', 'LEBANESE_MANAKISH_LAHM_BAAJIN', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_LAHM_BAAJIN', 'ING_YEAST', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_LAHM_BAAJIN', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_LAHM_BAAJIN', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_LAHM_BAAJIN', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_LAHM_BAAJIN', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_MANAKISH_LAHM_BAAJIN', 'ING_POMEGRANATE_MOLASSES', false, 'main'),
('lebanese', 'LEBANESE_MANAKISH_LAHM_BAAJIN', 'ING_SEVEN_SPICE', false, 'seasoning'),

-- Fatayer Spinach
('lebanese', 'LEBANESE_FATAYER_SPINACH', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_SPINACH', 'ING_YEAST', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_SPINACH', 'ING_SPINACH', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_SPINACH', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_SPINACH', 'ING_SUMAC', false, 'seasoning'),
('lebanese', 'LEBANESE_FATAYER_SPINACH', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_SPINACH', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_SPINACH', 'ING_PINE_NUTS', false, 'garnish'),

-- Fatayer Cheese
('lebanese', 'LEBANESE_FATAYER_CHEESE', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_CHEESE', 'ING_YEAST', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_CHEESE', 'ING_AKAWI_CHEESE', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_CHEESE', 'ING_HALLOUMI', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_CHEESE', 'ING_EGG', false, 'main'),
('lebanese', 'LEBANESE_FATAYER_CHEESE', 'ING_NIGELLA_SEEDS', false, 'garnish'),

-- Sfiha
('lebanese', 'LEBANESE_SFIHA', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_SFIHA', 'ING_YEAST', false, 'main'),
('lebanese', 'LEBANESE_SFIHA', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_SFIHA', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_SFIHA', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_SFIHA', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_SFIHA', 'ING_POMEGRANATE_MOLASSES', false, 'main'),
('lebanese', 'LEBANESE_SFIHA', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_SFIHA', 'ING_YOGURT', false, 'main'),

-- Sambousek Meat
('lebanese', 'LEBANESE_SAMBOUSEK_MEAT', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_MEAT', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_MEAT', 'ING_GROUND_LAMB', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_MEAT', 'ING_ONION', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_MEAT', 'ING_PINE_NUTS', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_MEAT', 'ING_SEVEN_SPICE', false, 'seasoning'),
('lebanese', 'LEBANESE_SAMBOUSEK_MEAT', 'ING_VEGETABLE_OIL', false, 'main'),

-- Sambousek Cheese
('lebanese', 'LEBANESE_SAMBOUSEK_CHEESE', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_CHEESE', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_CHEESE', 'ING_HALLOUMI', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_CHEESE', 'ING_AKAWI_CHEESE', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_CHEESE', 'ING_MINT', false, 'main'),
('lebanese', 'LEBANESE_SAMBOUSEK_CHEESE', 'ING_VEGETABLE_OIL', false, 'main'),

-- Kaak
('lebanese', 'LEBANESE_KAAK', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_KAAK', 'ING_YEAST', false, 'main'),
('lebanese', 'LEBANESE_KAAK', 'ING_SESAME_SEEDS', false, 'main'),
('lebanese', 'LEBANESE_KAAK', 'ING_MAHLAB', false, 'seasoning'),
('lebanese', 'LEBANESE_KAAK', 'ING_ANISE_SEEDS', false, 'seasoning'),
('lebanese', 'LEBANESE_KAAK', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_KAAK', 'ING_SEA_SALT', false, 'seasoning'),

-- Rakakat
('lebanese', 'LEBANESE_RAKAKAT', 'ING_PHYLLO', false, 'main'),
('lebanese', 'LEBANESE_RAKAKAT', 'ING_HALLOUMI', false, 'main'),
('lebanese', 'LEBANESE_RAKAKAT', 'ING_AKAWI_CHEESE', false, 'main'),
('lebanese', 'LEBANESE_RAKAKAT', 'ING_PARSLEY', false, 'main'),
('lebanese', 'LEBANESE_RAKAKAT', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_RAKAKAT', 'ING_VEGETABLE_OIL', false, 'main'),

-- ============================================
-- SEAFOOD
-- ============================================

-- Samke Harra
('lebanese', 'LEBANESE_SAMKE_HARRA', 'ING_WHITE_FISH', false, 'main'),
('lebanese', 'LEBANESE_SAMKE_HARRA', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_SAMKE_HARRA', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_SAMKE_HARRA', 'ING_CILANTRO', false, 'main'),
('lebanese', 'LEBANESE_SAMKE_HARRA', 'ING_CHILI_FLAKES', false, 'seasoning'),
('lebanese', 'LEBANESE_SAMKE_HARRA', 'ING_WALNUTS', false, 'garnish'),
('lebanese', 'LEBANESE_SAMKE_HARRA', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SAMKE_HARRA', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_SAMKE_HARRA', 'ING_PINE_NUTS', false, 'garnish'),

-- Samak Meshwi
('lebanese', 'LEBANESE_SAMAK_MESHWI', 'ING_SEA_BREAM', false, 'main'),
('lebanese', 'LEBANESE_SAMAK_MESHWI', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SAMAK_MESHWI', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_SAMAK_MESHWI', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_SAMAK_MESHWI', 'ING_PARSLEY', false, 'garnish'),
('lebanese', 'LEBANESE_SAMAK_MESHWI', 'ING_SEA_SALT', false, 'seasoning'),

-- Samak Makli
('lebanese', 'LEBANESE_SAMAK_MAKLI', 'ING_WHITE_FISH', false, 'main'),
('lebanese', 'LEBANESE_SAMAK_MAKLI', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_SAMAK_MAKLI', 'ING_CUMIN', false, 'seasoning'),
('lebanese', 'LEBANESE_SAMAK_MAKLI', 'ING_VEGETABLE_OIL', false, 'main'),
('lebanese', 'LEBANESE_SAMAK_MAKLI', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_SAMAK_MAKLI', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SAMAK_MAKLI', 'ING_GARLIC', false, 'main'),

-- Calamari Makli
('lebanese', 'LEBANESE_CALAMARI_MAKLI', 'ING_SQUID', false, 'main'),
('lebanese', 'LEBANESE_CALAMARI_MAKLI', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_CALAMARI_MAKLI', 'ING_CORNSTARCH', false, 'main'),
('lebanese', 'LEBANESE_CALAMARI_MAKLI', 'ING_VEGETABLE_OIL', false, 'main'),
('lebanese', 'LEBANESE_CALAMARI_MAKLI', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_CALAMARI_MAKLI', 'ING_TOUM', false, 'main'),

-- Kreides Provencal
('lebanese', 'LEBANESE_SHRIMP_PROVENCAL', 'ING_SHRIMP', false, 'main'),
('lebanese', 'LEBANESE_SHRIMP_PROVENCAL', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_SHRIMP_PROVENCAL', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_SHRIMP_PROVENCAL', 'ING_TOMATO', false, 'main'),
('lebanese', 'LEBANESE_SHRIMP_PROVENCAL', 'ING_WHITE_WINE', false, 'main'),
('lebanese', 'LEBANESE_SHRIMP_PROVENCAL', 'ING_PARSLEY', false, 'garnish'),
('lebanese', 'LEBANESE_SHRIMP_PROVENCAL', 'ING_CHILI_FLAKES', false, 'seasoning'),

-- Kreides bi Tahini
('lebanese', 'LEBANESE_SHRIMP_TAGINE', 'ING_SHRIMP', false, 'main'),
('lebanese', 'LEBANESE_SHRIMP_TAGINE', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_SHRIMP_TAGINE', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_SHRIMP_TAGINE', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SHRIMP_TAGINE', 'ING_PINE_NUTS', false, 'garnish'),
('lebanese', 'LEBANESE_SHRIMP_TAGINE', 'ING_PARSLEY', false, 'garnish'),
('lebanese', 'LEBANESE_SHRIMP_TAGINE', 'ING_OLIVE_OIL', false, 'main'),

-- Akhtabout Meshwi
('lebanese', 'LEBANESE_OCTOPUS_GRILLED', 'ING_OCTOPUS', false, 'main'),
('lebanese', 'LEBANESE_OCTOPUS_GRILLED', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_OCTOPUS_GRILLED', 'ING_GARLIC', false, 'main'),
('lebanese', 'LEBANESE_OCTOPUS_GRILLED', 'ING_OLIVE_OIL', false, 'main'),
('lebanese', 'LEBANESE_OCTOPUS_GRILLED', 'ING_PARSLEY', false, 'garnish'),
('lebanese', 'LEBANESE_OCTOPUS_GRILLED', 'ING_CHILI_FLAKES', false, 'seasoning'),

-- Sultan Ibrahim
('lebanese', 'LEBANESE_SULTAN_IBRAHIM', 'ING_RED_MULLET', false, 'main'),
('lebanese', 'LEBANESE_SULTAN_IBRAHIM', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_SULTAN_IBRAHIM', 'ING_VEGETABLE_OIL', false, 'main'),
('lebanese', 'LEBANESE_SULTAN_IBRAHIM', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_SULTAN_IBRAHIM', 'ING_SEA_SALT', false, 'seasoning'),

-- ============================================
-- DESSERTS
-- ============================================

-- Knafeh
('lebanese', 'LEBANESE_KNAFEH', 'ING_KNAFEH_DOUGH', false, 'main'),
('lebanese', 'LEBANESE_KNAFEH', 'ING_AKAWI_CHEESE', false, 'main'),
('lebanese', 'LEBANESE_KNAFEH', 'ING_MOZZARELLA', false, 'main'),
('lebanese', 'LEBANESE_KNAFEH', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_KNAFEH', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_KNAFEH', 'ING_ROSE_WATER', false, 'main'),
('lebanese', 'LEBANESE_KNAFEH', 'ING_ORANGE_BLOSSOM', false, 'main'),
('lebanese', 'LEBANESE_KNAFEH', 'ING_PISTACHIOS', false, 'garnish'),

-- Baklava
('lebanese', 'LEBANESE_BAKLAVA', 'ING_PHYLLO', false, 'main'),
('lebanese', 'LEBANESE_BAKLAVA', 'ING_PISTACHIOS', false, 'main'),
('lebanese', 'LEBANESE_BAKLAVA', 'ING_WALNUTS', false, 'main'),
('lebanese', 'LEBANESE_BAKLAVA', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_BAKLAVA', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_BAKLAVA', 'ING_ROSE_WATER', false, 'main'),
('lebanese', 'LEBANESE_BAKLAVA', 'ING_ORANGE_BLOSSOM', false, 'main'),
('lebanese', 'LEBANESE_BAKLAVA', 'ING_LEMON', false, 'main'),

-- Maamoul
('lebanese', 'LEBANESE_MAAMOUL', 'ING_SEMOLINA', false, 'main'),
('lebanese', 'LEBANESE_MAAMOUL', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_MAAMOUL', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_MAAMOUL', 'ING_DATES', false, 'main'),
('lebanese', 'LEBANESE_MAAMOUL', 'ING_WALNUTS', false, 'main'),
('lebanese', 'LEBANESE_MAAMOUL', 'ING_PISTACHIOS', false, 'main'),
('lebanese', 'LEBANESE_MAAMOUL', 'ING_ROSE_WATER', false, 'main'),
('lebanese', 'LEBANESE_MAAMOUL', 'ING_MAHLAB', false, 'seasoning'),
('lebanese', 'LEBANESE_MAAMOUL', 'ING_POWDERED_SUGAR', false, 'garnish'),

-- Namoura
('lebanese', 'LEBANESE_NAMOURA', 'ING_SEMOLINA', false, 'main'),
('lebanese', 'LEBANESE_NAMOURA', 'ING_YOGURT', false, 'main'),
('lebanese', 'LEBANESE_NAMOURA', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_NAMOURA', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_NAMOURA', 'ING_BAKING_POWDER', false, 'main'),
('lebanese', 'LEBANESE_NAMOURA', 'ING_ORANGE_BLOSSOM', false, 'main'),
('lebanese', 'LEBANESE_NAMOURA', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_NAMOURA', 'ING_ALMONDS', false, 'garnish'),

-- Halawet el Jibn
('lebanese', 'LEBANESE_HALAWET_JIBN', 'ING_MOZZARELLA', false, 'main'),
('lebanese', 'LEBANESE_HALAWET_JIBN', 'ING_SEMOLINA', false, 'main'),
('lebanese', 'LEBANESE_HALAWET_JIBN', 'ING_ASHTA', false, 'main'),
('lebanese', 'LEBANESE_HALAWET_JIBN', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_HALAWET_JIBN', 'ING_ROSE_WATER', false, 'main'),
('lebanese', 'LEBANESE_HALAWET_JIBN', 'ING_PISTACHIOS', false, 'garnish'),

-- Atayef
('lebanese', 'LEBANESE_ATAYEF', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_ATAYEF', 'ING_YEAST', false, 'main'),
('lebanese', 'LEBANESE_ATAYEF', 'ING_ASHTA', false, 'main'),
('lebanese', 'LEBANESE_ATAYEF', 'ING_WALNUTS', false, 'main'),
('lebanese', 'LEBANESE_ATAYEF', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_ATAYEF', 'ING_ROSE_WATER', false, 'main'),
('lebanese', 'LEBANESE_ATAYEF', 'ING_ORANGE_BLOSSOM', false, 'main'),
('lebanese', 'LEBANESE_ATAYEF', 'ING_VEGETABLE_OIL', false, 'main'),

-- Ashta
('lebanese', 'LEBANESE_ASHTA_CREAM', 'ING_ASHTA', false, 'main'),
('lebanese', 'LEBANESE_ASHTA_CREAM', 'ING_PISTACHIOS', false, 'garnish'),
('lebanese', 'LEBANESE_ASHTA_CREAM', 'ING_HONEY', false, 'main'),
('lebanese', 'LEBANESE_ASHTA_CREAM', 'ING_ROSE_WATER', false, 'main'),

-- Moghli
('lebanese', 'LEBANESE_MOGHLI', 'ING_RICE_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_MOGHLI', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_MOGHLI', 'ING_CARAWAY', false, 'seasoning'),
('lebanese', 'LEBANESE_MOGHLI', 'ING_ANISE_SEEDS', false, 'seasoning'),
('lebanese', 'LEBANESE_MOGHLI', 'ING_CINNAMON', false, 'seasoning'),
('lebanese', 'LEBANESE_MOGHLI', 'ING_WALNUTS', false, 'garnish'),
('lebanese', 'LEBANESE_MOGHLI', 'ING_ALMONDS', false, 'garnish'),
('lebanese', 'LEBANESE_MOGHLI', 'ING_PISTACHIOS', false, 'garnish'),
('lebanese', 'LEBANESE_MOGHLI', 'ING_COCONUT', false, 'garnish'),

-- Riz bi Haleeb
('lebanese', 'LEBANESE_RIZ_BHALIB', 'ING_RICE', false, 'main'),
('lebanese', 'LEBANESE_RIZ_BHALIB', 'ING_MILK', false, 'main'),
('lebanese', 'LEBANESE_RIZ_BHALIB', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_RIZ_BHALIB', 'ING_ROSE_WATER', false, 'main'),
('lebanese', 'LEBANESE_RIZ_BHALIB', 'ING_ORANGE_BLOSSOM', false, 'main'),
('lebanese', 'LEBANESE_RIZ_BHALIB', 'ING_PISTACHIOS', false, 'garnish'),
('lebanese', 'LEBANESE_RIZ_BHALIB', 'ING_CINNAMON', false, 'garnish'),

-- Sfouf
('lebanese', 'LEBANESE_SFOUF', 'ING_SEMOLINA', false, 'main'),
('lebanese', 'LEBANESE_SFOUF', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_SFOUF', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_SFOUF', 'ING_TURMERIC', false, 'seasoning'),
('lebanese', 'LEBANESE_SFOUF', 'ING_TAHINI', false, 'main'),
('lebanese', 'LEBANESE_SFOUF', 'ING_VEGETABLE_OIL', false, 'main'),
('lebanese', 'LEBANESE_SFOUF', 'ING_BAKING_POWDER', false, 'main'),
('lebanese', 'LEBANESE_SFOUF', 'ING_PINE_NUTS', false, 'garnish'),

-- Karabij
('lebanese', 'LEBANESE_KARABIJ', 'ING_SEMOLINA', false, 'main'),
('lebanese', 'LEBANESE_KARABIJ', 'ING_FLOUR', false, 'main'),
('lebanese', 'LEBANESE_KARABIJ', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_KARABIJ', 'ING_PISTACHIOS', false, 'main'),
('lebanese', 'LEBANESE_KARABIJ', 'ING_NATEF', false, 'main'),
('lebanese', 'LEBANESE_KARABIJ', 'ING_ROSE_WATER', false, 'main'),
('lebanese', 'LEBANESE_KARABIJ', 'ING_SUGAR', false, 'main'),

-- Znoud el Sit
('lebanese', 'LEBANESE_ZNOUD_ELSIT', 'ING_PHYLLO', false, 'main'),
('lebanese', 'LEBANESE_ZNOUD_ELSIT', 'ING_ASHTA', false, 'main'),
('lebanese', 'LEBANESE_ZNOUD_ELSIT', 'ING_BUTTER', false, 'main'),
('lebanese', 'LEBANESE_ZNOUD_ELSIT', 'ING_VEGETABLE_OIL', false, 'main'),
('lebanese', 'LEBANESE_ZNOUD_ELSIT', 'ING_SUGAR', false, 'main'),
('lebanese', 'LEBANESE_ZNOUD_ELSIT', 'ING_ROSE_WATER', false, 'main'),
('lebanese', 'LEBANESE_ZNOUD_ELSIT', 'ING_LEMON', false, 'main'),
('lebanese', 'LEBANESE_ZNOUD_ELSIT', 'ING_PISTACHIOS', false, 'garnish')

ON CONFLICT DO NOTHING;

-- ============================================
-- ~650 product_ingredients links created
-- Lebanese database complete!
-- ============================================
