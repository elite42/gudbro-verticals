-- ============================================
-- GREEK DATABASE - Product Ingredients Links
-- ============================================
-- ~533 links connecting 74 Greek dishes to ingredients
-- Run AFTER 02-greek-data.sql
-- ============================================

-- Clear existing greek product_ingredients
DELETE FROM product_ingredients WHERE product_type = 'greek';

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, is_optional, role)
VALUES

-- ============================================
-- GRILLED MEATS
-- ============================================

-- Pork Souvlaki
('greek', 'GREEK_SOUVLAKI_PORK', 'ING_PORK_SHOULDER', false, 'main'),
('greek', 'GREEK_SOUVLAKI_PORK', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_SOUVLAKI_PORK', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_SOUVLAKI_PORK', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_SOUVLAKI_PORK', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_SOUVLAKI_PORK', 'ING_PITA_BREAD', false, 'main'),
('greek', 'GREEK_SOUVLAKI_PORK', 'ING_ONION', false, 'garnish'),
('greek', 'GREEK_SOUVLAKI_PORK', 'ING_TOMATO', false, 'garnish'),

-- Chicken Souvlaki
('greek', 'GREEK_SOUVLAKI_CHICKEN', 'ING_CHICKEN_BREAST', false, 'main'),
('greek', 'GREEK_SOUVLAKI_CHICKEN', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_SOUVLAKI_CHICKEN', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_SOUVLAKI_CHICKEN', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_SOUVLAKI_CHICKEN', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_SOUVLAKI_CHICKEN', 'ING_PITA_BREAD', false, 'main'),
('greek', 'GREEK_SOUVLAKI_CHICKEN', 'ING_ONION', false, 'garnish'),

-- Pork Gyros
('greek', 'GREEK_GYROS_PORK', 'ING_PORK_SHOULDER', false, 'main'),
('greek', 'GREEK_GYROS_PORK', 'ING_PITA_BREAD', false, 'main'),
('greek', 'GREEK_GYROS_PORK', 'ING_YOGURT', false, 'main'),
('greek', 'GREEK_GYROS_PORK', 'ING_CUCUMBER', false, 'main'),
('greek', 'GREEK_GYROS_PORK', 'ING_TOMATO', false, 'garnish'),
('greek', 'GREEK_GYROS_PORK', 'ING_ONION', false, 'garnish'),
('greek', 'GREEK_GYROS_PORK', 'ING_POTATO', false, 'main'),
('greek', 'GREEK_GYROS_PORK', 'ING_PAPRIKA', false, 'main'),

-- Chicken Gyros
('greek', 'GREEK_GYROS_CHICKEN', 'ING_CHICKEN_THIGH', false, 'main'),
('greek', 'GREEK_GYROS_CHICKEN', 'ING_PITA_BREAD', false, 'main'),
('greek', 'GREEK_GYROS_CHICKEN', 'ING_YOGURT', false, 'main'),
('greek', 'GREEK_GYROS_CHICKEN', 'ING_CUCUMBER', false, 'main'),
('greek', 'GREEK_GYROS_CHICKEN', 'ING_TOMATO', false, 'garnish'),
('greek', 'GREEK_GYROS_CHICKEN', 'ING_ONION', false, 'garnish'),
('greek', 'GREEK_GYROS_CHICKEN', 'ING_POTATO', false, 'main'),

-- Paidakia (Lamb Chops)
('greek', 'GREEK_LAMB_CHOPS', 'ING_LAMB_CHOPS', false, 'main'),
('greek', 'GREEK_LAMB_CHOPS', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_LAMB_CHOPS', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_LAMB_CHOPS', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_LAMB_CHOPS', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_LAMB_CHOPS', 'ING_ROSEMARY', false, 'main'),
('greek', 'GREEK_LAMB_CHOPS', 'ING_SEA_SALT', false, 'main'),

-- Bifteki
('greek', 'GREEK_BIFTEKI', 'ING_GROUND_BEEF', false, 'main'),
('greek', 'GREEK_BIFTEKI', 'ING_FETA', false, 'main'),
('greek', 'GREEK_BIFTEKI', 'ING_ONION', false, 'main'),
('greek', 'GREEK_BIFTEKI', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_BIFTEKI', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_BIFTEKI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_BIFTEKI', 'ING_EGG', false, 'main'),
('greek', 'GREEK_BIFTEKI', 'ING_BREADCRUMBS', false, 'main'),

-- Kokoretsi
('greek', 'GREEK_KOKORETSI', 'ING_LAMB_OFFAL', false, 'main'),
('greek', 'GREEK_KOKORETSI', 'ING_LAMB_INTESTINES', false, 'main'),
('greek', 'GREEK_KOKORETSI', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_KOKORETSI', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_KOKORETSI', 'ING_SEA_SALT', false, 'main'),
('greek', 'GREEK_KOKORETSI', 'ING_BLACK_PEPPER', false, 'main'),

-- Kontosouvli
('greek', 'GREEK_KONTOSOUVLI', 'ING_PORK_SHOULDER', false, 'main'),
('greek', 'GREEK_KONTOSOUVLI', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_KONTOSOUVLI', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_KONTOSOUVLI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_KONTOSOUVLI', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_KONTOSOUVLI', 'ING_WHITE_WINE', false, 'main'),
('greek', 'GREEK_KONTOSOUVLI', 'ING_BAY_LEAVES', false, 'main'),

-- ============================================
-- BAKED CASSEROLES
-- ============================================

-- Moussaka
('greek', 'GREEK_MOUSSAKA', 'ING_EGGPLANT', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_GROUND_BEEF', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_POTATO', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_MILK', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_NUTMEG', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_MOUSSAKA', 'ING_PARMESAN', false, 'main'),

-- Vegetarian Moussaka
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_EGGPLANT', false, 'main'),
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_ZUCCHINI', false, 'main'),
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_LENTILS', false, 'main'),
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_POTATO', false, 'main'),
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_ONION', false, 'main'),
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_MILK', false, 'main'),
('greek', 'GREEK_MOUSSAKA_VEGETARIAN', 'ING_NUTMEG', false, 'main'),

-- Pastitsio
('greek', 'GREEK_PASTITSIO', 'ING_BUCATINI', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_GROUND_BEEF', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_ONION', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_MILK', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_EGG', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_PARMESAN', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_PASTITSIO', 'ING_NUTMEG', false, 'main'),

-- Giouvetsi
('greek', 'GREEK_GIOUVETSI', 'ING_LAMB_SHOULDER', false, 'main'),
('greek', 'GREEK_GIOUVETSI', 'ING_ORZO', false, 'main'),
('greek', 'GREEK_GIOUVETSI', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_GIOUVETSI', 'ING_ONION', false, 'main'),
('greek', 'GREEK_GIOUVETSI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_GIOUVETSI', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_GIOUVETSI', 'ING_CLOVES', false, 'main'),
('greek', 'GREEK_GIOUVETSI', 'ING_BAY_LEAVES', false, 'main'),
('greek', 'GREEK_GIOUVETSI', 'ING_RED_WINE', false, 'main'),
('greek', 'GREEK_GIOUVETSI', 'ING_OLIVE_OIL', false, 'main'),

-- Papoutsakia
('greek', 'GREEK_PAPOUTSAKIA', 'ING_EGGPLANT', false, 'main'),
('greek', 'GREEK_PAPOUTSAKIA', 'ING_GROUND_BEEF', false, 'main'),
('greek', 'GREEK_PAPOUTSAKIA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_PAPOUTSAKIA', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_PAPOUTSAKIA', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_PAPOUTSAKIA', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_PAPOUTSAKIA', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_PAPOUTSAKIA', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_PAPOUTSAKIA', 'ING_MILK', false, 'main'),
('greek', 'GREEK_PAPOUTSAKIA', 'ING_PARMESAN', false, 'main'),

-- Gemista
('greek', 'GREEK_GEMISTA', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_GEMISTA', 'ING_BELL_PEPPER', false, 'main'),
('greek', 'GREEK_GEMISTA', 'ING_RICE', false, 'main'),
('greek', 'GREEK_GEMISTA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_GEMISTA', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_GEMISTA', 'ING_MINT', false, 'main'),
('greek', 'GREEK_GEMISTA', 'ING_PINE_NUTS', false, 'main'),
('greek', 'GREEK_GEMISTA', 'ING_CURRANTS', false, 'main'),
('greek', 'GREEK_GEMISTA', 'ING_OLIVE_OIL', false, 'main'),

-- Imam Baildi
('greek', 'GREEK_IMAM_BAILDI', 'ING_EGGPLANT', false, 'main'),
('greek', 'GREEK_IMAM_BAILDI', 'ING_ONION', false, 'main'),
('greek', 'GREEK_IMAM_BAILDI', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_IMAM_BAILDI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_IMAM_BAILDI', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_IMAM_BAILDI', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_IMAM_BAILDI', 'ING_SUGAR', false, 'main'),

-- Briam
('greek', 'GREEK_BRIAM', 'ING_ZUCCHINI', false, 'main'),
('greek', 'GREEK_BRIAM', 'ING_EGGPLANT', false, 'main'),
('greek', 'GREEK_BRIAM', 'ING_POTATO', false, 'main'),
('greek', 'GREEK_BRIAM', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_BRIAM', 'ING_ONION', false, 'main'),
('greek', 'GREEK_BRIAM', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_BRIAM', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_BRIAM', 'ING_OLIVE_OIL', false, 'main'),

-- ============================================
-- STEWS & BRAISES
-- ============================================

-- Stifado
('greek', 'GREEK_STIFADO', 'ING_BEEF_CHUCK', false, 'main'),
('greek', 'GREEK_STIFADO', 'ING_PEARL_ONIONS', false, 'main'),
('greek', 'GREEK_STIFADO', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_STIFADO', 'ING_RED_WINE', false, 'main'),
('greek', 'GREEK_STIFADO', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_STIFADO', 'ING_CLOVES', false, 'main'),
('greek', 'GREEK_STIFADO', 'ING_BAY_LEAVES', false, 'main'),
('greek', 'GREEK_STIFADO', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_STIFADO', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_STIFADO', 'ING_RED_WINE_VINEGAR', false, 'main'),

-- Rabbit Stifado
('greek', 'GREEK_STIFADO_RABBIT', 'ING_RABBIT', false, 'main'),
('greek', 'GREEK_STIFADO_RABBIT', 'ING_PEARL_ONIONS', false, 'main'),
('greek', 'GREEK_STIFADO_RABBIT', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_STIFADO_RABBIT', 'ING_RED_WINE', false, 'main'),
('greek', 'GREEK_STIFADO_RABBIT', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_STIFADO_RABBIT', 'ING_CLOVES', false, 'main'),
('greek', 'GREEK_STIFADO_RABBIT', 'ING_BAY_LEAVES', false, 'main'),
('greek', 'GREEK_STIFADO_RABBIT', 'ING_ROSEMARY', false, 'main'),
('greek', 'GREEK_STIFADO_RABBIT', 'ING_OLIVE_OIL', false, 'main'),

-- Kleftiko
('greek', 'GREEK_KLEFTIKO', 'ING_LAMB_SHOULDER', false, 'main'),
('greek', 'GREEK_KLEFTIKO', 'ING_POTATO', false, 'main'),
('greek', 'GREEK_KLEFTIKO', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_KLEFTIKO', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_KLEFTIKO', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_KLEFTIKO', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_KLEFTIKO', 'ING_BAY_LEAVES', false, 'main'),
('greek', 'GREEK_KLEFTIKO', 'ING_FETA', false, 'main'),

-- Kokkinisto
('greek', 'GREEK_KOKKINISTO', 'ING_BEEF_CHUCK', false, 'main'),
('greek', 'GREEK_KOKKINISTO', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_KOKKINISTO', 'ING_ONION', false, 'main'),
('greek', 'GREEK_KOKKINISTO', 'ING_RED_WINE', false, 'main'),
('greek', 'GREEK_KOKKINISTO', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_KOKKINISTO', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_KOKKINISTO', 'ING_BAY_LEAVES', false, 'main'),
('greek', 'GREEK_KOKKINISTO', 'ING_CINNAMON', false, 'main'),

-- Lamb Fricassee
('greek', 'GREEK_LAMB_FRICASSEE', 'ING_LAMB_SHOULDER', false, 'main'),
('greek', 'GREEK_LAMB_FRICASSEE', 'ING_ROMAINE_LETTUCE', false, 'main'),
('greek', 'GREEK_LAMB_FRICASSEE', 'ING_DILL', false, 'main'),
('greek', 'GREEK_LAMB_FRICASSEE', 'ING_SCALLIONS', false, 'main'),
('greek', 'GREEK_LAMB_FRICASSEE', 'ING_EGG', false, 'main'),
('greek', 'GREEK_LAMB_FRICASSEE', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_LAMB_FRICASSEE', 'ING_OLIVE_OIL', false, 'main'),

-- Youvarlakia
('greek', 'GREEK_YOUVARLAKIA', 'ING_GROUND_BEEF', false, 'main'),
('greek', 'GREEK_YOUVARLAKIA', 'ING_RICE', false, 'main'),
('greek', 'GREEK_YOUVARLAKIA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_YOUVARLAKIA', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_YOUVARLAKIA', 'ING_DILL', false, 'main'),
('greek', 'GREEK_YOUVARLAKIA', 'ING_EGG', false, 'main'),
('greek', 'GREEK_YOUVARLAKIA', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_YOUVARLAKIA', 'ING_CHICKEN_STOCK', false, 'main'),

-- Lamb Yiahni
('greek', 'GREEK_LAMB_YIAHNI', 'ING_LAMB_SHOULDER', false, 'main'),
('greek', 'GREEK_LAMB_YIAHNI', 'ING_GREEN_BEANS', false, 'main'),
('greek', 'GREEK_LAMB_YIAHNI', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_LAMB_YIAHNI', 'ING_ONION', false, 'main'),
('greek', 'GREEK_LAMB_YIAHNI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_LAMB_YIAHNI', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_LAMB_YIAHNI', 'ING_OLIVE_OIL', false, 'main'),

-- ============================================
-- SEAFOOD
-- ============================================

-- Grilled Octopus
('greek', 'GREEK_GRILLED_OCTOPUS', 'ING_OCTOPUS', false, 'main'),
('greek', 'GREEK_GRILLED_OCTOPUS', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_GRILLED_OCTOPUS', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_GRILLED_OCTOPUS', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_GRILLED_OCTOPUS', 'ING_RED_WINE_VINEGAR', false, 'main'),
('greek', 'GREEK_GRILLED_OCTOPUS', 'ING_GARLIC', false, 'main'),

-- Fried Calamari
('greek', 'GREEK_CALAMARI_FRIED', 'ING_SQUID', false, 'main'),
('greek', 'GREEK_CALAMARI_FRIED', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_CALAMARI_FRIED', 'ING_VEGETABLE_OIL', false, 'main'),
('greek', 'GREEK_CALAMARI_FRIED', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_CALAMARI_FRIED', 'ING_SEA_SALT', false, 'main'),

-- Shrimp Saganaki
('greek', 'GREEK_SHRIMP_SAGANAKI', 'ING_SHRIMP', false, 'main'),
('greek', 'GREEK_SHRIMP_SAGANAKI', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_SHRIMP_SAGANAKI', 'ING_FETA', false, 'main'),
('greek', 'GREEK_SHRIMP_SAGANAKI', 'ING_OUZO', false, 'main'),
('greek', 'GREEK_SHRIMP_SAGANAKI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_SHRIMP_SAGANAKI', 'ING_ONION', false, 'main'),
('greek', 'GREEK_SHRIMP_SAGANAKI', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_SHRIMP_SAGANAKI', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_SHRIMP_SAGANAKI', 'ING_CHILI_FLAKES', false, 'main'),

-- Fried Anchovies
('greek', 'GREEK_FRIED_ANCHOVIES', 'ING_ANCHOVIES', false, 'main'),
('greek', 'GREEK_FRIED_ANCHOVIES', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_FRIED_ANCHOVIES', 'ING_VEGETABLE_OIL', false, 'main'),
('greek', 'GREEK_FRIED_ANCHOVIES', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_FRIED_ANCHOVIES', 'ING_SEA_SALT', false, 'main'),

-- Fish Plaki
('greek', 'GREEK_FISH_PLAKI', 'ING_SEA_BREAM', false, 'main'),
('greek', 'GREEK_FISH_PLAKI', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_FISH_PLAKI', 'ING_ONION', false, 'main'),
('greek', 'GREEK_FISH_PLAKI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_FISH_PLAKI', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_FISH_PLAKI', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_FISH_PLAKI', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_FISH_PLAKI', 'ING_POTATO', false, 'main'),

-- Grilled Sardines
('greek', 'GREEK_GRILLED_SARDINES', 'ING_SARDINES', false, 'main'),
('greek', 'GREEK_GRILLED_SARDINES', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_GRILLED_SARDINES', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_GRILLED_SARDINES', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_GRILLED_SARDINES', 'ING_SEA_SALT', false, 'main'),

-- Mussels Saganaki
('greek', 'GREEK_MUSSELS_SAGANAKI', 'ING_MUSSELS', false, 'main'),
('greek', 'GREEK_MUSSELS_SAGANAKI', 'ING_WHITE_WINE', false, 'main'),
('greek', 'GREEK_MUSSELS_SAGANAKI', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_MUSSELS_SAGANAKI', 'ING_FETA', false, 'main'),
('greek', 'GREEK_MUSSELS_SAGANAKI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_MUSSELS_SAGANAKI', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_MUSSELS_SAGANAKI', 'ING_OLIVE_OIL', false, 'main'),

-- Grilled Sea Bream
('greek', 'GREEK_GRILLED_SEA_BREAM', 'ING_SEA_BREAM', false, 'main'),
('greek', 'GREEK_GRILLED_SEA_BREAM', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_GRILLED_SEA_BREAM', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_GRILLED_SEA_BREAM', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_GRILLED_SEA_BREAM', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_GRILLED_SEA_BREAM', 'ING_SEA_SALT', false, 'main'),

-- ============================================
-- MEZE & APPETIZERS
-- ============================================

-- Tzatziki
('greek', 'GREEK_TZATZIKI', 'ING_YOGURT', false, 'main'),
('greek', 'GREEK_TZATZIKI', 'ING_CUCUMBER', false, 'main'),
('greek', 'GREEK_TZATZIKI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_TZATZIKI', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_TZATZIKI', 'ING_DILL', false, 'main'),
('greek', 'GREEK_TZATZIKI', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_TZATZIKI', 'ING_SEA_SALT', false, 'main'),

-- Dolmades
('greek', 'GREEK_DOLMADES', 'ING_GRAPE_LEAVES', false, 'main'),
('greek', 'GREEK_DOLMADES', 'ING_RICE', false, 'main'),
('greek', 'GREEK_DOLMADES', 'ING_ONION', false, 'main'),
('greek', 'GREEK_DOLMADES', 'ING_DILL', false, 'main'),
('greek', 'GREEK_DOLMADES', 'ING_MINT', false, 'main'),
('greek', 'GREEK_DOLMADES', 'ING_PINE_NUTS', false, 'main'),
('greek', 'GREEK_DOLMADES', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_DOLMADES', 'ING_OLIVE_OIL', false, 'main'),

-- Meat Dolmades
('greek', 'GREEK_DOLMADES_MEAT', 'ING_GRAPE_LEAVES', false, 'main'),
('greek', 'GREEK_DOLMADES_MEAT', 'ING_GROUND_BEEF', false, 'main'),
('greek', 'GREEK_DOLMADES_MEAT', 'ING_RICE', false, 'main'),
('greek', 'GREEK_DOLMADES_MEAT', 'ING_ONION', false, 'main'),
('greek', 'GREEK_DOLMADES_MEAT', 'ING_DILL', false, 'main'),
('greek', 'GREEK_DOLMADES_MEAT', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_DOLMADES_MEAT', 'ING_EGG', false, 'main'),
('greek', 'GREEK_DOLMADES_MEAT', 'ING_LEMON', false, 'main'),

-- Saganaki
('greek', 'GREEK_SAGANAKI_CHEESE', 'ING_KASSERI', false, 'main'),
('greek', 'GREEK_SAGANAKI_CHEESE', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_SAGANAKI_CHEESE', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_SAGANAKI_CHEESE', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_SAGANAKI_CHEESE', 'ING_BRANDY', false, 'main'),

-- Fava
('greek', 'GREEK_FAVA', 'ING_YELLOW_SPLIT_PEAS', false, 'main'),
('greek', 'GREEK_FAVA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_FAVA', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_FAVA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_FAVA', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_FAVA', 'ING_CAPERS', false, 'main'),

-- Taramosalata
('greek', 'GREEK_TARAMOSALATA', 'ING_FISH_ROE', false, 'main'),
('greek', 'GREEK_TARAMOSALATA', 'ING_BREAD', false, 'main'),
('greek', 'GREEK_TARAMOSALATA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_TARAMOSALATA', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_TARAMOSALATA', 'ING_ONION', false, 'main'),

-- Melitzanosalata
('greek', 'GREEK_MELITZANOSALATA', 'ING_EGGPLANT', false, 'main'),
('greek', 'GREEK_MELITZANOSALATA', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_MELITZANOSALATA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_MELITZANOSALATA', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_MELITZANOSALATA', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_MELITZANOSALATA', 'ING_RED_WINE_VINEGAR', false, 'main'),

-- Skordalia
('greek', 'GREEK_SKORDALIA', 'ING_POTATO', false, 'main'),
('greek', 'GREEK_SKORDALIA', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_SKORDALIA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_SKORDALIA', 'ING_RED_WINE_VINEGAR', false, 'main'),
('greek', 'GREEK_SKORDALIA', 'ING_ALMONDS', false, 'main'),

-- Htipiti
('greek', 'GREEK_HTIPITI', 'ING_ROASTED_RED_PEPPER', false, 'main'),
('greek', 'GREEK_HTIPITI', 'ING_FETA', false, 'main'),
('greek', 'GREEK_HTIPITI', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_HTIPITI', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_HTIPITI', 'ING_CHILI_FLAKES', false, 'main'),

-- Kolokithokeftedes
('greek', 'GREEK_KOLOKITHOKEFTEDES', 'ING_ZUCCHINI', false, 'main'),
('greek', 'GREEK_KOLOKITHOKEFTEDES', 'ING_FETA', false, 'main'),
('greek', 'GREEK_KOLOKITHOKEFTEDES', 'ING_MINT', false, 'main'),
('greek', 'GREEK_KOLOKITHOKEFTEDES', 'ING_DILL', false, 'main'),
('greek', 'GREEK_KOLOKITHOKEFTEDES', 'ING_EGG', false, 'main'),
('greek', 'GREEK_KOLOKITHOKEFTEDES', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_KOLOKITHOKEFTEDES', 'ING_ONION', false, 'main'),

-- Keftedes
('greek', 'GREEK_KEFTEDES', 'ING_GROUND_BEEF', false, 'main'),
('greek', 'GREEK_KEFTEDES', 'ING_ONION', false, 'main'),
('greek', 'GREEK_KEFTEDES', 'ING_MINT', false, 'main'),
('greek', 'GREEK_KEFTEDES', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_KEFTEDES', 'ING_EGG', false, 'main'),
('greek', 'GREEK_KEFTEDES', 'ING_BREADCRUMBS', false, 'main'),
('greek', 'GREEK_KEFTEDES', 'ING_GARLIC', false, 'main'),

-- Tirokroketes
('greek', 'GREEK_TIROKROKETES', 'ING_FETA', false, 'main'),
('greek', 'GREEK_TIROKROKETES', 'ING_KASSERI', false, 'main'),
('greek', 'GREEK_TIROKROKETES', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_TIROKROKETES', 'ING_EGG', false, 'main'),
('greek', 'GREEK_TIROKROKETES', 'ING_BREADCRUMBS', false, 'main'),
('greek', 'GREEK_TIROKROKETES', 'ING_HONEY', false, 'main'),

-- ============================================
-- PIES & PASTRIES
-- ============================================

-- Spanakopita
('greek', 'GREEK_SPANAKOPITA', 'ING_SPINACH', false, 'main'),
('greek', 'GREEK_SPANAKOPITA', 'ING_FETA', false, 'main'),
('greek', 'GREEK_SPANAKOPITA', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_SPANAKOPITA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_SPANAKOPITA', 'ING_DILL', false, 'main'),
('greek', 'GREEK_SPANAKOPITA', 'ING_EGG', false, 'main'),
('greek', 'GREEK_SPANAKOPITA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_SPANAKOPITA', 'ING_SCALLIONS', false, 'main'),

-- Tiropita
('greek', 'GREEK_TIROPITA', 'ING_FETA', false, 'main'),
('greek', 'GREEK_TIROPITA', 'ING_RICOTTA', false, 'main'),
('greek', 'GREEK_TIROPITA', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_TIROPITA', 'ING_EGG', false, 'main'),
('greek', 'GREEK_TIROPITA', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_TIROPITA', 'ING_NUTMEG', false, 'main'),

-- Kotopita
('greek', 'GREEK_KOTOPITA', 'ING_CHICKEN_BREAST', false, 'main'),
('greek', 'GREEK_KOTOPITA', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_KOTOPITA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_KOTOPITA', 'ING_MILK', false, 'main'),
('greek', 'GREEK_KOTOPITA', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_KOTOPITA', 'ING_EGG', false, 'main'),
('greek', 'GREEK_KOTOPITA', 'ING_PARSLEY', false, 'main'),
('greek', 'GREEK_KOTOPITA', 'ING_NUTMEG', false, 'main'),

-- Kreatopita
('greek', 'GREEK_KREATOPITA', 'ING_LAMB_SHOULDER', false, 'main'),
('greek', 'GREEK_KREATOPITA', 'ING_RICE', false, 'main'),
('greek', 'GREEK_KREATOPITA', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_KREATOPITA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_KREATOPITA', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_KREATOPITA', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_KREATOPITA', 'ING_MINT', false, 'main'),
('greek', 'GREEK_KREATOPITA', 'ING_OLIVE_OIL', false, 'main'),

-- Hortopita
('greek', 'GREEK_HORTOPITA', 'ING_WILD_GREENS', false, 'main'),
('greek', 'GREEK_HORTOPITA', 'ING_FETA', false, 'main'),
('greek', 'GREEK_HORTOPITA', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_HORTOPITA', 'ING_SCALLIONS', false, 'main'),
('greek', 'GREEK_HORTOPITA', 'ING_DILL', false, 'main'),
('greek', 'GREEK_HORTOPITA', 'ING_EGG', false, 'main'),
('greek', 'GREEK_HORTOPITA', 'ING_OLIVE_OIL', false, 'main'),

-- Prasopita
('greek', 'GREEK_PRASOPITA', 'ING_LEEKS', false, 'main'),
('greek', 'GREEK_PRASOPITA', 'ING_FETA', false, 'main'),
('greek', 'GREEK_PRASOPITA', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_PRASOPITA', 'ING_EGG', false, 'main'),
('greek', 'GREEK_PRASOPITA', 'ING_DILL', false, 'main'),
('greek', 'GREEK_PRASOPITA', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_PRASOPITA', 'ING_OLIVE_OIL', false, 'main'),

-- Bougatsa Savory
('greek', 'GREEK_BOUGATSA_SAVORY', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_BOUGATSA_SAVORY', 'ING_FETA', false, 'main'),
('greek', 'GREEK_BOUGATSA_SAVORY', 'ING_RICOTTA', false, 'main'),
('greek', 'GREEK_BOUGATSA_SAVORY', 'ING_EGG', false, 'main'),
('greek', 'GREEK_BOUGATSA_SAVORY', 'ING_BUTTER', false, 'main'),

-- Kalitsounia
('greek', 'GREEK_KALITSOUNIA', 'ING_MIZITHRA', false, 'main'),
('greek', 'GREEK_KALITSOUNIA', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_KALITSOUNIA', 'ING_EGG', false, 'main'),
('greek', 'GREEK_KALITSOUNIA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_KALITSOUNIA', 'ING_MINT', false, 'main'),
('greek', 'GREEK_KALITSOUNIA', 'ING_HONEY', false, 'main'),

-- ============================================
-- SALADS
-- ============================================

-- Horiatiki
('greek', 'GREEK_HORIATIKI', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_HORIATIKI', 'ING_CUCUMBER', false, 'main'),
('greek', 'GREEK_HORIATIKI', 'ING_RED_ONION', false, 'main'),
('greek', 'GREEK_HORIATIKI', 'ING_FETA', false, 'main'),
('greek', 'GREEK_HORIATIKI', 'ING_KALAMATA_OLIVES', false, 'main'),
('greek', 'GREEK_HORIATIKI', 'ING_BELL_PEPPER', false, 'main'),
('greek', 'GREEK_HORIATIKI', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_HORIATIKI', 'ING_OREGANO', false, 'main'),

-- Dakos
('greek', 'GREEK_DAKOS', 'ING_BARLEY_RUSK', false, 'main'),
('greek', 'GREEK_DAKOS', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_DAKOS', 'ING_MIZITHRA', false, 'main'),
('greek', 'GREEK_DAKOS', 'ING_KALAMATA_OLIVES', false, 'main'),
('greek', 'GREEK_DAKOS', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_DAKOS', 'ING_OREGANO', false, 'main'),
('greek', 'GREEK_DAKOS', 'ING_CAPERS', false, 'main'),

-- Marouli Salata
('greek', 'GREEK_MAROULI_SALATA', 'ING_ROMAINE_LETTUCE', false, 'main'),
('greek', 'GREEK_MAROULI_SALATA', 'ING_SCALLIONS', false, 'main'),
('greek', 'GREEK_MAROULI_SALATA', 'ING_DILL', false, 'main'),
('greek', 'GREEK_MAROULI_SALATA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_MAROULI_SALATA', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_MAROULI_SALATA', 'ING_SEA_SALT', false, 'main'),

-- Pantzaria Salata
('greek', 'GREEK_PANTZARIA_SALATA', 'ING_BEETS', false, 'main'),
('greek', 'GREEK_PANTZARIA_SALATA', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_PANTZARIA_SALATA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_PANTZARIA_SALATA', 'ING_RED_WINE_VINEGAR', false, 'main'),
('greek', 'GREEK_PANTZARIA_SALATA', 'ING_PARSLEY', false, 'main'),

-- Lahano Salata
('greek', 'GREEK_LAHANO_SALATA', 'ING_CABBAGE', false, 'main'),
('greek', 'GREEK_LAHANO_SALATA', 'ING_CARROT', false, 'main'),
('greek', 'GREEK_LAHANO_SALATA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_LAHANO_SALATA', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_LAHANO_SALATA', 'ING_SEA_SALT', false, 'main'),

-- Politiki Salata
('greek', 'GREEK_POLITIKI_SALATA', 'ING_CABBAGE', false, 'main'),
('greek', 'GREEK_POLITIKI_SALATA', 'ING_BELL_PEPPER', false, 'main'),
('greek', 'GREEK_POLITIKI_SALATA', 'ING_CARROT', false, 'main'),
('greek', 'GREEK_POLITIKI_SALATA', 'ING_CELERY', false, 'main'),
('greek', 'GREEK_POLITIKI_SALATA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_POLITIKI_SALATA', 'ING_RED_WINE_VINEGAR', false, 'main'),

-- ============================================
-- SOUPS
-- ============================================

-- Avgolemono Soup
('greek', 'GREEK_AVGOLEMONO_SOUP', 'ING_CHICKEN_BREAST', false, 'main'),
('greek', 'GREEK_AVGOLEMONO_SOUP', 'ING_CHICKEN_STOCK', false, 'main'),
('greek', 'GREEK_AVGOLEMONO_SOUP', 'ING_EGG', false, 'main'),
('greek', 'GREEK_AVGOLEMONO_SOUP', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_AVGOLEMONO_SOUP', 'ING_RICE', false, 'main'),
('greek', 'GREEK_AVGOLEMONO_SOUP', 'ING_ONION', false, 'main'),
('greek', 'GREEK_AVGOLEMONO_SOUP', 'ING_CARROT', false, 'main'),

-- Fasolada
('greek', 'GREEK_FASOLADA', 'ING_WHITE_BEANS', false, 'main'),
('greek', 'GREEK_FASOLADA', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_FASOLADA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_FASOLADA', 'ING_CARROT', false, 'main'),
('greek', 'GREEK_FASOLADA', 'ING_CELERY', false, 'main'),
('greek', 'GREEK_FASOLADA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_FASOLADA', 'ING_BAY_LEAVES', false, 'main'),
('greek', 'GREEK_FASOLADA', 'ING_PARSLEY', false, 'main'),

-- Fakes (Lentil Soup)
('greek', 'GREEK_FAKES', 'ING_LENTILS', false, 'main'),
('greek', 'GREEK_FAKES', 'ING_ONION', false, 'main'),
('greek', 'GREEK_FAKES', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_FAKES', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_FAKES', 'ING_BAY_LEAVES', false, 'main'),
('greek', 'GREEK_FAKES', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_FAKES', 'ING_RED_WINE_VINEGAR', false, 'main'),

-- Psarosoupa
('greek', 'GREEK_PSAROSOUPA', 'ING_SEA_BREAM', false, 'main'),
('greek', 'GREEK_PSAROSOUPA', 'ING_POTATO', false, 'main'),
('greek', 'GREEK_PSAROSOUPA', 'ING_CARROT', false, 'main'),
('greek', 'GREEK_PSAROSOUPA', 'ING_CELERY', false, 'main'),
('greek', 'GREEK_PSAROSOUPA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_PSAROSOUPA', 'ING_EGG', false, 'main'),
('greek', 'GREEK_PSAROSOUPA', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_PSAROSOUPA', 'ING_OLIVE_OIL', false, 'main'),

-- Kakavia
('greek', 'GREEK_KAKAVIA', 'ING_MIXED_FISH', false, 'main'),
('greek', 'GREEK_KAKAVIA', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_KAKAVIA', 'ING_ONION', false, 'main'),
('greek', 'GREEK_KAKAVIA', 'ING_POTATO', false, 'main'),
('greek', 'GREEK_KAKAVIA', 'ING_SAFFRON', false, 'main'),
('greek', 'GREEK_KAKAVIA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_KAKAVIA', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_KAKAVIA', 'ING_BAY_LEAVES', false, 'main'),

-- Trahana Soup
('greek', 'GREEK_TRAHANA_SOUP', 'ING_TRAHANA', false, 'main'),
('greek', 'GREEK_TRAHANA_SOUP', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_TRAHANA_SOUP', 'ING_TOMATO', false, 'main'),
('greek', 'GREEK_TRAHANA_SOUP', 'ING_FETA', false, 'main'),
('greek', 'GREEK_TRAHANA_SOUP', 'ING_CHICKEN_STOCK', false, 'main'),

-- Patsas
('greek', 'GREEK_PATSAS', 'ING_BEEF_TRIPE', false, 'main'),
('greek', 'GREEK_PATSAS', 'ING_GARLIC', false, 'main'),
('greek', 'GREEK_PATSAS', 'ING_RED_WINE_VINEGAR', false, 'main'),
('greek', 'GREEK_PATSAS', 'ING_BAY_LEAVES', false, 'main'),
('greek', 'GREEK_PATSAS', 'ING_SEA_SALT', false, 'main'),
('greek', 'GREEK_PATSAS', 'ING_BLACK_PEPPER', false, 'main'),

-- ============================================
-- DESSERTS
-- ============================================

-- Baklava
('greek', 'GREEK_BAKLAVA', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_BAKLAVA', 'ING_WALNUTS', false, 'main'),
('greek', 'GREEK_BAKLAVA', 'ING_PISTACHIOS', false, 'main'),
('greek', 'GREEK_BAKLAVA', 'ING_HONEY', false, 'main'),
('greek', 'GREEK_BAKLAVA', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_BAKLAVA', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_BAKLAVA', 'ING_CLOVES', false, 'main'),
('greek', 'GREEK_BAKLAVA', 'ING_SUGAR', false, 'main'),

-- Galaktoboureko
('greek', 'GREEK_GALAKTOBOUREKO', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_GALAKTOBOUREKO', 'ING_MILK', false, 'main'),
('greek', 'GREEK_GALAKTOBOUREKO', 'ING_SEMOLINA', false, 'main'),
('greek', 'GREEK_GALAKTOBOUREKO', 'ING_EGG', false, 'main'),
('greek', 'GREEK_GALAKTOBOUREKO', 'ING_SUGAR', false, 'main'),
('greek', 'GREEK_GALAKTOBOUREKO', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_GALAKTOBOUREKO', 'ING_VANILLA', false, 'main'),
('greek', 'GREEK_GALAKTOBOUREKO', 'ING_LEMON_ZEST', false, 'main'),

-- Loukoumades
('greek', 'GREEK_LOUKOUMADES', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_LOUKOUMADES', 'ING_YEAST', false, 'main'),
('greek', 'GREEK_LOUKOUMADES', 'ING_HONEY', false, 'main'),
('greek', 'GREEK_LOUKOUMADES', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_LOUKOUMADES', 'ING_WALNUTS', false, 'main'),
('greek', 'GREEK_LOUKOUMADES', 'ING_VEGETABLE_OIL', false, 'main'),

-- Bougatsa Sweet
('greek', 'GREEK_BOUGATSA_SWEET', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_BOUGATSA_SWEET', 'ING_MILK', false, 'main'),
('greek', 'GREEK_BOUGATSA_SWEET', 'ING_SEMOLINA', false, 'main'),
('greek', 'GREEK_BOUGATSA_SWEET', 'ING_EGG', false, 'main'),
('greek', 'GREEK_BOUGATSA_SWEET', 'ING_SUGAR', false, 'main'),
('greek', 'GREEK_BOUGATSA_SWEET', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_BOUGATSA_SWEET', 'ING_VANILLA', false, 'main'),
('greek', 'GREEK_BOUGATSA_SWEET', 'ING_POWDERED_SUGAR', false, 'main'),
('greek', 'GREEK_BOUGATSA_SWEET', 'ING_CINNAMON', false, 'main'),

-- Kourabiedes
('greek', 'GREEK_KOURABIEDES', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_KOURABIEDES', 'ING_ALMONDS', false, 'main'),
('greek', 'GREEK_KOURABIEDES', 'ING_POWDERED_SUGAR', false, 'main'),
('greek', 'GREEK_KOURABIEDES', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_KOURABIEDES', 'ING_EGG_YOLK', false, 'main'),
('greek', 'GREEK_KOURABIEDES', 'ING_BRANDY', false, 'main'),
('greek', 'GREEK_KOURABIEDES', 'ING_VANILLA', false, 'main'),

-- Melomakarona
('greek', 'GREEK_MELOMAKARONA', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_MELOMAKARONA', 'ING_OLIVE_OIL', false, 'main'),
('greek', 'GREEK_MELOMAKARONA', 'ING_HONEY', false, 'main'),
('greek', 'GREEK_MELOMAKARONA', 'ING_ORANGE_JUICE', false, 'main'),
('greek', 'GREEK_MELOMAKARONA', 'ING_WALNUTS', false, 'main'),
('greek', 'GREEK_MELOMAKARONA', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_MELOMAKARONA', 'ING_CLOVES', false, 'main'),
('greek', 'GREEK_MELOMAKARONA', 'ING_BRANDY', false, 'main'),

-- Ravani
('greek', 'GREEK_RAVANI', 'ING_SEMOLINA', false, 'main'),
('greek', 'GREEK_RAVANI', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_RAVANI', 'ING_SUGAR', false, 'main'),
('greek', 'GREEK_RAVANI', 'ING_YOGURT', false, 'main'),
('greek', 'GREEK_RAVANI', 'ING_EGG', false, 'main'),
('greek', 'GREEK_RAVANI', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_RAVANI', 'ING_LEMON', false, 'main'),
('greek', 'GREEK_RAVANI', 'ING_COCONUT', false, 'main'),

-- Portokalopita
('greek', 'GREEK_PORTOKALOPITA', 'ING_PHYLLO', false, 'main'),
('greek', 'GREEK_PORTOKALOPITA', 'ING_YOGURT', false, 'main'),
('greek', 'GREEK_PORTOKALOPITA', 'ING_EGG', false, 'main'),
('greek', 'GREEK_PORTOKALOPITA', 'ING_SUGAR', false, 'main'),
('greek', 'GREEK_PORTOKALOPITA', 'ING_ORANGE_JUICE', false, 'main'),
('greek', 'GREEK_PORTOKALOPITA', 'ING_ORANGE_ZEST', false, 'main'),
('greek', 'GREEK_PORTOKALOPITA', 'ING_BUTTER', false, 'main'),
('greek', 'GREEK_PORTOKALOPITA', 'ING_BAKING_POWDER', false, 'main'),

-- Rizogalo
('greek', 'GREEK_RIZOGALO', 'ING_RICE', false, 'main'),
('greek', 'GREEK_RIZOGALO', 'ING_MILK', false, 'main'),
('greek', 'GREEK_RIZOGALO', 'ING_SUGAR', false, 'main'),
('greek', 'GREEK_RIZOGALO', 'ING_VANILLA', false, 'main'),
('greek', 'GREEK_RIZOGALO', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_RIZOGALO', 'ING_LEMON_ZEST', false, 'main'),

-- Diples
('greek', 'GREEK_DIPLES', 'ING_FLOUR', false, 'main'),
('greek', 'GREEK_DIPLES', 'ING_EGG', false, 'main'),
('greek', 'GREEK_DIPLES', 'ING_ORANGE_JUICE', false, 'main'),
('greek', 'GREEK_DIPLES', 'ING_HONEY', false, 'main'),
('greek', 'GREEK_DIPLES', 'ING_WALNUTS', false, 'main'),
('greek', 'GREEK_DIPLES', 'ING_CINNAMON', false, 'main'),
('greek', 'GREEK_DIPLES', 'ING_VEGETABLE_OIL', false, 'main');

-- ============================================
-- Product ingredients links complete
-- ~533 links for 74 Greek dishes
-- Average ~7.2 ingredients per dish
--
-- Run verification query:
-- SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'greek';
-- ============================================
