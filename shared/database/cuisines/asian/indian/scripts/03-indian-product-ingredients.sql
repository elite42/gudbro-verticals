-- ============================================
-- INDIAN - Product Ingredients Junction Table
-- ============================================
-- Run this THIRD after 02-indian-complete-import.sql
-- Links Indian dishes to ingredients via product_ingredients
-- ============================================
-- DATABASE-STANDARDS v1.1 COMPLIANT
-- - Uses product_type = 'indian'
-- - sort_order for ingredient sequence
-- - is_signature for key ingredients
-- ============================================

-- First, remove any existing indian entries (for clean reimport)
DELETE FROM product_ingredients WHERE product_type = 'indian';

-- ============================================
-- CURRIES (12 dishes)
-- ============================================

-- Butter Chicken (13 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_BUTTER_CHICKEN', 'ING_CHICKEN_THIGH', 1, true),
('indian', 'IND_BUTTER_CHICKEN', 'ING_TOMATO', 2, true),
('indian', 'IND_BUTTER_CHICKEN', 'ING_BUTTER', 3, true),
('indian', 'IND_BUTTER_CHICKEN', 'ING_CREAM', 4, true),
('indian', 'IND_BUTTER_CHICKEN', 'ING_ONION', 5, false),
('indian', 'IND_BUTTER_CHICKEN', 'ING_GARLIC', 6, false),
('indian', 'IND_BUTTER_CHICKEN', 'ING_GINGER', 7, false),
('indian', 'IND_BUTTER_CHICKEN', 'ING_GARAM_MASALA', 8, true),
('indian', 'IND_BUTTER_CHICKEN', 'ING_KASHMIRI_CHILI', 9, true),
('indian', 'IND_BUTTER_CHICKEN', 'ING_CUMIN', 10, false),
('indian', 'IND_BUTTER_CHICKEN', 'ING_CORIANDER', 11, false),
('indian', 'IND_BUTTER_CHICKEN', 'ING_FENUGREEK_LEAVES', 12, true),
('indian', 'IND_BUTTER_CHICKEN', 'ING_YOGURT', 13, false);

-- Chicken Tikka Masala (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_CHICKEN_BREAST', 1, true),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_TOMATO', 2, true),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_CREAM', 3, true),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_ONION', 4, false),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_GARLIC', 5, false),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_GINGER', 6, false),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_YOGURT', 7, true),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_GARAM_MASALA', 8, true),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_CUMIN', 9, false),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_CORIANDER', 10, false),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_PAPRIKA', 11, false),
('indian', 'IND_CHICKEN_TIKKA_MASALA', 'ING_TURMERIC', 12, false);

-- Lamb Rogan Josh (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_LAMB_LEG', 1, true),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_YOGURT', 2, true),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_KASHMIRI_CHILI', 3, true),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_ONION', 4, false),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_GARLIC', 5, false),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_GINGER', 6, false),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_FENNEL_SEEDS', 7, true),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_CARDAMOM', 8, true),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_CINNAMON', 9, false),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_CLOVES', 10, false),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_BAY_LEAF', 11, false),
('indian', 'IND_LAMB_ROGAN_JOSH', 'ING_GHEE', 12, false);

-- Chicken Korma (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_CHICKEN_KORMA', 'ING_CHICKEN_THIGH', 1, true),
('indian', 'IND_CHICKEN_KORMA', 'ING_YOGURT', 2, true),
('indian', 'IND_CHICKEN_KORMA', 'ING_CREAM', 3, true),
('indian', 'IND_CHICKEN_KORMA', 'ING_CASHEWS', 4, true),
('indian', 'IND_CHICKEN_KORMA', 'ING_ALMONDS', 5, true),
('indian', 'IND_CHICKEN_KORMA', 'ING_ONION', 6, false),
('indian', 'IND_CHICKEN_KORMA', 'ING_GARLIC', 7, false),
('indian', 'IND_CHICKEN_KORMA', 'ING_GINGER', 8, false),
('indian', 'IND_CHICKEN_KORMA', 'ING_CARDAMOM', 9, true),
('indian', 'IND_CHICKEN_KORMA', 'ING_CINNAMON', 10, false),
('indian', 'IND_CHICKEN_KORMA', 'ING_CORIANDER', 11, false),
('indian', 'IND_CHICKEN_KORMA', 'ING_SAFFRON', 12, true);

-- Lamb Vindaloo (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_LAMB_VINDALOO', 'ING_LAMB_SHOULDER', 1, true),
('indian', 'IND_LAMB_VINDALOO', 'ING_VINEGAR', 2, true),
('indian', 'IND_LAMB_VINDALOO', 'ING_TOMATO', 3, false),
('indian', 'IND_LAMB_VINDALOO', 'ING_ONION', 4, false),
('indian', 'IND_LAMB_VINDALOO', 'ING_GARLIC', 5, false),
('indian', 'IND_LAMB_VINDALOO', 'ING_GINGER', 6, false),
('indian', 'IND_LAMB_VINDALOO', 'ING_RED_CHILI', 7, true),
('indian', 'IND_LAMB_VINDALOO', 'ING_CUMIN', 8, false),
('indian', 'IND_LAMB_VINDALOO', 'ING_MUSTARD_SEEDS', 9, true),
('indian', 'IND_LAMB_VINDALOO', 'ING_CINNAMON', 10, false),
('indian', 'IND_LAMB_VINDALOO', 'ING_CLOVES', 11, false),
('indian', 'IND_LAMB_VINDALOO', 'ING_TAMARIND', 12, true);

-- Chicken Madras (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_CHICKEN_MADRAS', 'ING_CHICKEN_THIGH', 1, true),
('indian', 'IND_CHICKEN_MADRAS', 'ING_TOMATO', 2, true),
('indian', 'IND_CHICKEN_MADRAS', 'ING_COCONUT_MILK', 3, true),
('indian', 'IND_CHICKEN_MADRAS', 'ING_ONION', 4, false),
('indian', 'IND_CHICKEN_MADRAS', 'ING_GARLIC', 5, false),
('indian', 'IND_CHICKEN_MADRAS', 'ING_GINGER', 6, false),
('indian', 'IND_CHICKEN_MADRAS', 'ING_RED_CHILI', 7, true),
('indian', 'IND_CHICKEN_MADRAS', 'ING_CURRY_LEAVES', 8, true),
('indian', 'IND_CHICKEN_MADRAS', 'ING_MUSTARD_SEEDS', 9, false),
('indian', 'IND_CHICKEN_MADRAS', 'ING_TAMARIND', 10, true),
('indian', 'IND_CHICKEN_MADRAS', 'ING_TURMERIC', 11, false),
('indian', 'IND_CHICKEN_MADRAS', 'ING_CORIANDER', 12, false);

-- Lamb Saag (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_LAMB_SAAG', 'ING_LAMB_SHOULDER', 1, true),
('indian', 'IND_LAMB_SAAG', 'ING_SPINACH', 2, true),
('indian', 'IND_LAMB_SAAG', 'ING_ONION', 3, false),
('indian', 'IND_LAMB_SAAG', 'ING_GARLIC', 4, false),
('indian', 'IND_LAMB_SAAG', 'ING_GINGER', 5, false),
('indian', 'IND_LAMB_SAAG', 'ING_TOMATO', 6, false),
('indian', 'IND_LAMB_SAAG', 'ING_CREAM', 7, true),
('indian', 'IND_LAMB_SAAG', 'ING_GARAM_MASALA', 8, true),
('indian', 'IND_LAMB_SAAG', 'ING_CUMIN', 9, false),
('indian', 'IND_LAMB_SAAG', 'ING_CORIANDER', 10, false),
('indian', 'IND_LAMB_SAAG', 'ING_GREEN_CHILI', 11, false),
('indian', 'IND_LAMB_SAAG', 'ING_GHEE', 12, false);

-- Chicken Chettinad (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_CHICKEN_THIGH', 1, true),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_TOMATO', 2, false),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_ONION', 3, false),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_COCONUT', 4, true),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_GARLIC', 5, false),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_GINGER', 6, false),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_BLACK_PEPPER', 7, true),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_FENNEL_SEEDS', 8, true),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_STAR_ANISE', 9, true),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_CURRY_LEAVES', 10, true),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_RED_CHILI', 11, false),
('indian', 'IND_CHICKEN_CHETTINAD', 'ING_POPPY_SEEDS', 12, true);

-- Lamb Keema (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_LAMB_KEEMA', 'ING_LAMB_GROUND', 1, true),
('indian', 'IND_LAMB_KEEMA', 'ING_GREEN_PEAS', 2, true),
('indian', 'IND_LAMB_KEEMA', 'ING_TOMATO', 3, false),
('indian', 'IND_LAMB_KEEMA', 'ING_ONION', 4, false),
('indian', 'IND_LAMB_KEEMA', 'ING_GARLIC', 5, false),
('indian', 'IND_LAMB_KEEMA', 'ING_GINGER', 6, false),
('indian', 'IND_LAMB_KEEMA', 'ING_GARAM_MASALA', 7, true),
('indian', 'IND_LAMB_KEEMA', 'ING_CUMIN', 8, false),
('indian', 'IND_LAMB_KEEMA', 'ING_CORIANDER', 9, false),
('indian', 'IND_LAMB_KEEMA', 'ING_TURMERIC', 10, false),
('indian', 'IND_LAMB_KEEMA', 'ING_GREEN_CHILI', 11, false),
('indian', 'IND_LAMB_KEEMA', 'ING_CILANTRO', 12, false);

-- Kerala Fish Curry (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_FISH_CURRY', 'ING_FISH_WHITE', 1, true),
('indian', 'IND_FISH_CURRY', 'ING_COCONUT_MILK', 2, true),
('indian', 'IND_FISH_CURRY', 'ING_KOKUM', 3, true),
('indian', 'IND_FISH_CURRY', 'ING_ONION', 4, false),
('indian', 'IND_FISH_CURRY', 'ING_GARLIC', 5, false),
('indian', 'IND_FISH_CURRY', 'ING_GINGER', 6, false),
('indian', 'IND_FISH_CURRY', 'ING_CURRY_LEAVES', 7, true),
('indian', 'IND_FISH_CURRY', 'ING_MUSTARD_SEEDS', 8, false),
('indian', 'IND_FISH_CURRY', 'ING_FENUGREEK_SEEDS', 9, true),
('indian', 'IND_FISH_CURRY', 'ING_RED_CHILI', 10, false),
('indian', 'IND_FISH_CURRY', 'ING_TURMERIC', 11, false),
('indian', 'IND_FISH_CURRY', 'ING_TAMARIND', 12, false);

-- Prawn Masala (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PRAWN_MASALA', 'ING_SHRIMP', 1, true),
('indian', 'IND_PRAWN_MASALA', 'ING_TOMATO', 2, true),
('indian', 'IND_PRAWN_MASALA', 'ING_ONION', 3, false),
('indian', 'IND_PRAWN_MASALA', 'ING_GARLIC', 4, false),
('indian', 'IND_PRAWN_MASALA', 'ING_GINGER', 5, false),
('indian', 'IND_PRAWN_MASALA', 'ING_COCONUT_MILK', 6, true),
('indian', 'IND_PRAWN_MASALA', 'ING_CURRY_LEAVES', 7, true),
('indian', 'IND_PRAWN_MASALA', 'ING_GARAM_MASALA', 8, false),
('indian', 'IND_PRAWN_MASALA', 'ING_TURMERIC', 9, false),
('indian', 'IND_PRAWN_MASALA', 'ING_RED_CHILI', 10, false),
('indian', 'IND_PRAWN_MASALA', 'ING_CILANTRO', 11, false);

-- Kadai Chicken (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_KADAI_CHICKEN', 'ING_CHICKEN_THIGH', 1, true),
('indian', 'IND_KADAI_CHICKEN', 'ING_BELL_PEPPER', 2, true),
('indian', 'IND_KADAI_CHICKEN', 'ING_TOMATO', 3, true),
('indian', 'IND_KADAI_CHICKEN', 'ING_ONION', 4, false),
('indian', 'IND_KADAI_CHICKEN', 'ING_GARLIC', 5, false),
('indian', 'IND_KADAI_CHICKEN', 'ING_GINGER', 6, false),
('indian', 'IND_KADAI_CHICKEN', 'ING_KASHMIRI_CHILI', 7, true),
('indian', 'IND_KADAI_CHICKEN', 'ING_CUMIN', 8, false),
('indian', 'IND_KADAI_CHICKEN', 'ING_CORIANDER', 9, false),
('indian', 'IND_KADAI_CHICKEN', 'ING_GARAM_MASALA', 10, false),
('indian', 'IND_KADAI_CHICKEN', 'ING_FENUGREEK_LEAVES', 11, true),
('indian', 'IND_KADAI_CHICKEN', 'ING_GHEE', 12, false);

-- ============================================
-- BIRYANI & RICE (8 dishes)
-- ============================================

-- Hyderabadi Biryani (16 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_LAMB_LEG', 1, true),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_BASMATI_RICE', 2, true),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_YOGURT', 3, true),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_ONION', 4, true),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_SAFFRON', 5, true),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_GHEE', 6, true),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_GINGER_GARLIC_PASTE', 7, false),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_GREEN_CHILI', 8, false),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_MINT', 9, true),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_CILANTRO', 10, false),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_GARAM_MASALA', 11, true),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_BAY_LEAF', 12, false),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_CARDAMOM', 13, false),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_CINNAMON', 14, false),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_CLOVES', 15, false),
('indian', 'IND_HYDERABADI_BIRYANI', 'ING_ROSE_WATER', 16, true);

-- Lucknowi Biryani (13 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_LAMB_LEG', 1, true),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_BASMATI_RICE', 2, true),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_YOGURT', 3, true),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_ONION', 4, false),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_SAFFRON', 5, true),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_GHEE', 6, true),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_KEWRA_WATER', 7, true),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_ROSE_WATER', 8, true),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_CARDAMOM', 9, false),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_MACE', 10, true),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_NUTMEG', 11, false),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_MINT', 12, false),
('indian', 'IND_LUCKNOWI_BIRYANI', 'ING_MILK', 13, false);

-- Chicken Biryani (13 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_CHICKEN_BIRYANI', 'ING_CHICKEN_THIGH', 1, true),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_BASMATI_RICE', 2, true),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_YOGURT', 3, true),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_ONION', 4, false),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_TOMATO', 5, false),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_GINGER', 6, false),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_GARLIC', 7, false),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_GREEN_CHILI', 8, false),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_SAFFRON', 9, true),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_GHEE', 10, true),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_GARAM_MASALA', 11, true),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_MINT', 12, true),
('indian', 'IND_CHICKEN_BIRYANI', 'ING_CILANTRO', 13, false);

-- Kolkata Biryani (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_KOLKATA_BIRYANI', 'ING_LAMB_LEG', 1, true),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_BASMATI_RICE', 2, true),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_POTATO', 3, true),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_EGG', 4, true),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_YOGURT', 5, false),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_ONION', 6, false),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_SAFFRON', 7, true),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_GHEE', 8, true),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_KEWRA_WATER', 9, true),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_CARDAMOM', 10, false),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_NUTMEG', 11, false),
('indian', 'IND_KOLKATA_BIRYANI', 'ING_MACE', 12, false);

-- Vegetable Biryani (13 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_BASMATI_RICE', 1, true),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_PANEER', 2, true),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_CARROT', 3, false),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_GREEN_BEANS', 4, false),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_GREEN_PEAS', 5, false),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_POTATO', 6, false),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_CAULIFLOWER', 7, false),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_YOGURT', 8, true),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_ONION', 9, false),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_SAFFRON', 10, true),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_GHEE', 11, true),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_GARAM_MASALA', 12, true),
('indian', 'IND_VEGETABLE_BIRYANI', 'ING_MINT', 13, false);

-- Thalassery Biryani (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_THALASSERY_BIRYANI', 'ING_CHICKEN_THIGH', 1, true),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_JEERAKASALA_RICE', 2, true),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_COCONUT_MILK', 3, true),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_ONION', 4, false),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_TOMATO', 5, false),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_GINGER', 6, false),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_GARLIC', 7, false),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_FENNEL_SEEDS', 8, true),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_CARDAMOM', 9, false),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_CLOVES', 10, false),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_GHEE', 11, false),
('indian', 'IND_THALASSERY_BIRYANI', 'ING_CASHEWS', 12, true);

-- Jeera Rice (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_JEERA_RICE', 'ING_BASMATI_RICE', 1, true),
('indian', 'IND_JEERA_RICE', 'ING_CUMIN', 2, true),
('indian', 'IND_JEERA_RICE', 'ING_GHEE', 3, true),
('indian', 'IND_JEERA_RICE', 'ING_BAY_LEAF', 4, false),
('indian', 'IND_JEERA_RICE', 'ING_CLOVES', 5, false),
('indian', 'IND_JEERA_RICE', 'ING_CARDAMOM', 6, false),
('indian', 'IND_JEERA_RICE', 'ING_ONION', 7, false);

-- Vegetable Pulao (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PULAO', 'ING_BASMATI_RICE', 1, true),
('indian', 'IND_PULAO', 'ING_CARROT', 2, false),
('indian', 'IND_PULAO', 'ING_GREEN_PEAS', 3, false),
('indian', 'IND_PULAO', 'ING_GREEN_BEANS', 4, false),
('indian', 'IND_PULAO', 'ING_CAULIFLOWER', 5, false),
('indian', 'IND_PULAO', 'ING_ONION', 6, false),
('indian', 'IND_PULAO', 'ING_GHEE', 7, true),
('indian', 'IND_PULAO', 'ING_CUMIN', 8, true),
('indian', 'IND_PULAO', 'ING_BAY_LEAF', 9, false),
('indian', 'IND_PULAO', 'ING_CARDAMOM', 10, false),
('indian', 'IND_PULAO', 'ING_CINNAMON', 11, false),
('indian', 'IND_PULAO', 'ING_CLOVES', 12, false);

-- ============================================
-- TANDOORI (10 dishes)
-- ============================================

-- Tandoori Chicken (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_TANDOORI_CHICKEN', 'ING_CHICKEN_LEG', 1, true),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_YOGURT', 2, true),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_KASHMIRI_CHILI', 3, true),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_GINGER', 4, false),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_GARLIC', 5, false),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_LEMON_JUICE', 6, true),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_GARAM_MASALA', 7, true),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_CUMIN', 8, false),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_CORIANDER', 9, false),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_TURMERIC', 10, false),
('indian', 'IND_TANDOORI_CHICKEN', 'ING_MUSTARD_OIL', 11, true);

-- Chicken Tikka (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_CHICKEN_TIKKA', 'ING_CHICKEN_BREAST', 1, true),
('indian', 'IND_CHICKEN_TIKKA', 'ING_YOGURT', 2, true),
('indian', 'IND_CHICKEN_TIKKA', 'ING_KASHMIRI_CHILI', 3, true),
('indian', 'IND_CHICKEN_TIKKA', 'ING_GINGER', 4, false),
('indian', 'IND_CHICKEN_TIKKA', 'ING_GARLIC', 5, false),
('indian', 'IND_CHICKEN_TIKKA', 'ING_LEMON_JUICE', 6, true),
('indian', 'IND_CHICKEN_TIKKA', 'ING_GARAM_MASALA', 7, true),
('indian', 'IND_CHICKEN_TIKKA', 'ING_CUMIN', 8, false),
('indian', 'IND_CHICKEN_TIKKA', 'ING_CORIANDER', 9, false),
('indian', 'IND_CHICKEN_TIKKA', 'ING_AJWAIN', 10, true),
('indian', 'IND_CHICKEN_TIKKA', 'ING_MUSTARD_OIL', 11, false);

-- Seekh Kebab (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_SEEKH_KEBAB', 'ING_LAMB_GROUND', 1, true),
('indian', 'IND_SEEKH_KEBAB', 'ING_ONION', 2, true),
('indian', 'IND_SEEKH_KEBAB', 'ING_GINGER', 3, false),
('indian', 'IND_SEEKH_KEBAB', 'ING_GARLIC', 4, false),
('indian', 'IND_SEEKH_KEBAB', 'ING_GREEN_CHILI', 5, false),
('indian', 'IND_SEEKH_KEBAB', 'ING_CILANTRO', 6, true),
('indian', 'IND_SEEKH_KEBAB', 'ING_MINT', 7, true),
('indian', 'IND_SEEKH_KEBAB', 'ING_GARAM_MASALA', 8, true),
('indian', 'IND_SEEKH_KEBAB', 'ING_CUMIN', 9, false),
('indian', 'IND_SEEKH_KEBAB', 'ING_CORIANDER', 10, false),
('indian', 'IND_SEEKH_KEBAB', 'ING_EGG', 11, false);

-- Malai Kebab (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_MALAI_KEBAB', 'ING_CHICKEN_BREAST', 1, true),
('indian', 'IND_MALAI_KEBAB', 'ING_CREAM', 2, true),
('indian', 'IND_MALAI_KEBAB', 'ING_CREAM_CHEESE', 3, true),
('indian', 'IND_MALAI_KEBAB', 'ING_YOGURT', 4, false),
('indian', 'IND_MALAI_KEBAB', 'ING_GINGER', 5, false),
('indian', 'IND_MALAI_KEBAB', 'ING_GARLIC', 6, false),
('indian', 'IND_MALAI_KEBAB', 'ING_GREEN_CARDAMOM', 7, true),
('indian', 'IND_MALAI_KEBAB', 'ING_WHITE_PEPPER', 8, true),
('indian', 'IND_MALAI_KEBAB', 'ING_MACE', 9, false),
('indian', 'IND_MALAI_KEBAB', 'ING_NUTMEG', 10, false),
('indian', 'IND_MALAI_KEBAB', 'ING_CASHEWS', 11, true);

-- Fish Tikka (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_FISH_TIKKA', 'ING_FISH_WHITE', 1, true),
('indian', 'IND_FISH_TIKKA', 'ING_YOGURT', 2, true),
('indian', 'IND_FISH_TIKKA', 'ING_AJWAIN', 3, true),
('indian', 'IND_FISH_TIKKA', 'ING_KASHMIRI_CHILI', 4, false),
('indian', 'IND_FISH_TIKKA', 'ING_GINGER', 5, false),
('indian', 'IND_FISH_TIKKA', 'ING_GARLIC', 6, false),
('indian', 'IND_FISH_TIKKA', 'ING_LEMON_JUICE', 7, true),
('indian', 'IND_FISH_TIKKA', 'ING_CUMIN', 8, false),
('indian', 'IND_FISH_TIKKA', 'ING_CORIANDER', 9, false),
('indian', 'IND_FISH_TIKKA', 'ING_TURMERIC', 10, false),
('indian', 'IND_FISH_TIKKA', 'ING_MUSTARD_OIL', 11, false);

-- Paneer Tikka (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PANEER_TIKKA', 'ING_PANEER', 1, true),
('indian', 'IND_PANEER_TIKKA', 'ING_BELL_PEPPER', 2, true),
('indian', 'IND_PANEER_TIKKA', 'ING_ONION', 3, false),
('indian', 'IND_PANEER_TIKKA', 'ING_YOGURT', 4, true),
('indian', 'IND_PANEER_TIKKA', 'ING_KASHMIRI_CHILI', 5, true),
('indian', 'IND_PANEER_TIKKA', 'ING_GINGER', 6, false),
('indian', 'IND_PANEER_TIKKA', 'ING_GARLIC', 7, false),
('indian', 'IND_PANEER_TIKKA', 'ING_GARAM_MASALA', 8, true),
('indian', 'IND_PANEER_TIKKA', 'ING_CUMIN', 9, false),
('indian', 'IND_PANEER_TIKKA', 'ING_CORIANDER', 10, false),
('indian', 'IND_PANEER_TIKKA', 'ING_LEMON_JUICE', 11, false),
('indian', 'IND_PANEER_TIKKA', 'ING_MUSTARD_OIL', 12, false);

-- Reshmi Kebab (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_RESHMI_KEBAB', 'ING_CHICKEN_BREAST', 1, true),
('indian', 'IND_RESHMI_KEBAB', 'ING_CREAM', 2, true),
('indian', 'IND_RESHMI_KEBAB', 'ING_CASHEWS', 3, true),
('indian', 'IND_RESHMI_KEBAB', 'ING_YOGURT', 4, false),
('indian', 'IND_RESHMI_KEBAB', 'ING_GINGER', 5, false),
('indian', 'IND_RESHMI_KEBAB', 'ING_GARLIC', 6, false),
('indian', 'IND_RESHMI_KEBAB', 'ING_GREEN_CARDAMOM', 7, true),
('indian', 'IND_RESHMI_KEBAB', 'ING_WHITE_PEPPER', 8, true),
('indian', 'IND_RESHMI_KEBAB', 'ING_MACE', 9, false),
('indian', 'IND_RESHMI_KEBAB', 'ING_SAFFRON', 10, true);

-- Lamb Boti Kebab (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_LAMB_LEG', 1, true),
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_YOGURT', 2, true),
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_GINGER', 3, false),
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_GARLIC', 4, false),
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_KASHMIRI_CHILI', 5, true),
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_GARAM_MASALA', 6, true),
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_CUMIN', 7, false),
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_CORIANDER', 8, false),
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_RAW_PAPAYA', 9, true),
('indian', 'IND_LAMB_BOTI_KEBAB', 'ING_MUSTARD_OIL', 10, false);

-- Tandoori Prawns (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_TANDOORI_PRAWNS', 'ING_SHRIMP_LARGE', 1, true),
('indian', 'IND_TANDOORI_PRAWNS', 'ING_YOGURT', 2, true),
('indian', 'IND_TANDOORI_PRAWNS', 'ING_KASHMIRI_CHILI', 3, true),
('indian', 'IND_TANDOORI_PRAWNS', 'ING_GINGER', 4, false),
('indian', 'IND_TANDOORI_PRAWNS', 'ING_GARLIC', 5, false),
('indian', 'IND_TANDOORI_PRAWNS', 'ING_LEMON_JUICE', 6, true),
('indian', 'IND_TANDOORI_PRAWNS', 'ING_GARAM_MASALA', 7, false),
('indian', 'IND_TANDOORI_PRAWNS', 'ING_AJWAIN', 8, true),
('indian', 'IND_TANDOORI_PRAWNS', 'ING_CUMIN', 9, false),
('indian', 'IND_TANDOORI_PRAWNS', 'ING_MUSTARD_OIL', 10, false);

-- Hariyali Tikka (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_HARIYALI_TIKKA', 'ING_CHICKEN_BREAST', 1, true),
('indian', 'IND_HARIYALI_TIKKA', 'ING_YOGURT', 2, true),
('indian', 'IND_HARIYALI_TIKKA', 'ING_MINT', 3, true),
('indian', 'IND_HARIYALI_TIKKA', 'ING_CILANTRO', 4, true),
('indian', 'IND_HARIYALI_TIKKA', 'ING_GREEN_CHILI', 5, true),
('indian', 'IND_HARIYALI_TIKKA', 'ING_GINGER', 6, false),
('indian', 'IND_HARIYALI_TIKKA', 'ING_GARLIC', 7, false),
('indian', 'IND_HARIYALI_TIKKA', 'ING_SPINACH', 8, true),
('indian', 'IND_HARIYALI_TIKKA', 'ING_LEMON_JUICE', 9, false),
('indian', 'IND_HARIYALI_TIKKA', 'ING_CUMIN', 10, false),
('indian', 'IND_HARIYALI_TIKKA', 'ING_CHAAT_MASALA', 11, false);

-- ============================================
-- BREADS (8 dishes)
-- ============================================

-- Garlic Naan (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_GARLIC_NAAN', 'ING_ALL_PURPOSE_FLOUR', 1, true),
('indian', 'IND_GARLIC_NAAN', 'ING_YEAST', 2, false),
('indian', 'IND_GARLIC_NAAN', 'ING_YOGURT', 3, false),
('indian', 'IND_GARLIC_NAAN', 'ING_GARLIC', 4, true),
('indian', 'IND_GARLIC_NAAN', 'ING_BUTTER', 5, true),
('indian', 'IND_GARLIC_NAAN', 'ING_CILANTRO', 6, true),
('indian', 'IND_GARLIC_NAAN', 'ING_MILK', 7, false),
('indian', 'IND_GARLIC_NAAN', 'ING_SUGAR', 8, false),
('indian', 'IND_GARLIC_NAAN', 'ING_SALT', 9, false);

-- Butter Naan (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_BUTTER_NAAN', 'ING_ALL_PURPOSE_FLOUR', 1, true),
('indian', 'IND_BUTTER_NAAN', 'ING_YEAST', 2, false),
('indian', 'IND_BUTTER_NAAN', 'ING_YOGURT', 3, false),
('indian', 'IND_BUTTER_NAAN', 'ING_BUTTER', 4, true),
('indian', 'IND_BUTTER_NAAN', 'ING_MILK', 5, false),
('indian', 'IND_BUTTER_NAAN', 'ING_SUGAR', 6, false),
('indian', 'IND_BUTTER_NAAN', 'ING_SALT', 7, false),
('indian', 'IND_BUTTER_NAAN', 'ING_BAKING_POWDER', 8, false);

-- Roti (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_ROTI', 'ING_WHOLE_WHEAT_FLOUR', 1, true),
('indian', 'IND_ROTI', 'ING_WATER', 2, false),
('indian', 'IND_ROTI', 'ING_SALT', 3, false),
('indian', 'IND_ROTI', 'ING_GHEE', 4, false);

-- Plain Paratha (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PARATHA', 'ING_WHOLE_WHEAT_FLOUR', 1, true),
('indian', 'IND_PARATHA', 'ING_GHEE', 2, true),
('indian', 'IND_PARATHA', 'ING_WATER', 3, false),
('indian', 'IND_PARATHA', 'ING_SALT', 4, false);

-- Aloo Paratha (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_ALOO_PARATHA', 'ING_WHOLE_WHEAT_FLOUR', 1, true),
('indian', 'IND_ALOO_PARATHA', 'ING_POTATO', 2, true),
('indian', 'IND_ALOO_PARATHA', 'ING_GREEN_CHILI', 3, false),
('indian', 'IND_ALOO_PARATHA', 'ING_ONION', 4, false),
('indian', 'IND_ALOO_PARATHA', 'ING_CILANTRO', 5, false),
('indian', 'IND_ALOO_PARATHA', 'ING_CUMIN', 6, true),
('indian', 'IND_ALOO_PARATHA', 'ING_CORIANDER', 7, false),
('indian', 'IND_ALOO_PARATHA', 'ING_RED_CHILI', 8, false),
('indian', 'IND_ALOO_PARATHA', 'ING_AMCHUR', 9, true),
('indian', 'IND_ALOO_PARATHA', 'ING_GHEE', 10, true),
('indian', 'IND_ALOO_PARATHA', 'ING_SALT', 11, false);

-- Puri (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PURI', 'ING_WHOLE_WHEAT_FLOUR', 1, true),
('indian', 'IND_PURI', 'ING_VEGETABLE_OIL', 2, true),
('indian', 'IND_PURI', 'ING_WATER', 3, false),
('indian', 'IND_PURI', 'ING_SALT', 4, false);

-- Bhatura (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_BHATURA', 'ING_ALL_PURPOSE_FLOUR', 1, true),
('indian', 'IND_BHATURA', 'ING_YOGURT', 2, true),
('indian', 'IND_BHATURA', 'ING_BAKING_POWDER', 3, false),
('indian', 'IND_BHATURA', 'ING_SEMOLINA', 4, true),
('indian', 'IND_BHATURA', 'ING_VEGETABLE_OIL', 5, true),
('indian', 'IND_BHATURA', 'ING_SUGAR', 6, false),
('indian', 'IND_BHATURA', 'ING_SALT', 7, false);

-- Amritsari Kulcha (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_KULCHA', 'ING_ALL_PURPOSE_FLOUR', 1, true),
('indian', 'IND_KULCHA', 'ING_POTATO', 2, true),
('indian', 'IND_KULCHA', 'ING_ONION', 3, false),
('indian', 'IND_KULCHA', 'ING_GREEN_CHILI', 4, false),
('indian', 'IND_KULCHA', 'ING_CILANTRO', 5, false),
('indian', 'IND_KULCHA', 'ING_POMEGRANATE_SEEDS', 6, true),
('indian', 'IND_KULCHA', 'ING_CUMIN', 7, false),
('indian', 'IND_KULCHA', 'ING_YOGURT', 8, false),
('indian', 'IND_KULCHA', 'ING_BAKING_POWDER', 9, false),
('indian', 'IND_KULCHA', 'ING_GHEE', 10, true),
('indian', 'IND_KULCHA', 'ING_SALT', 11, false);

-- ============================================
-- APPETIZERS (7 dishes)
-- ============================================

-- Samosa (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_SAMOSA', 'ING_ALL_PURPOSE_FLOUR', 1, true),
('indian', 'IND_SAMOSA', 'ING_POTATO', 2, true),
('indian', 'IND_SAMOSA', 'ING_GREEN_PEAS', 3, true),
('indian', 'IND_SAMOSA', 'ING_ONION', 4, false),
('indian', 'IND_SAMOSA', 'ING_GREEN_CHILI', 5, false),
('indian', 'IND_SAMOSA', 'ING_GINGER', 6, false),
('indian', 'IND_SAMOSA', 'ING_CUMIN', 7, true),
('indian', 'IND_SAMOSA', 'ING_CORIANDER', 8, false),
('indian', 'IND_SAMOSA', 'ING_GARAM_MASALA', 9, true),
('indian', 'IND_SAMOSA', 'ING_AMCHUR', 10, true),
('indian', 'IND_SAMOSA', 'ING_VEGETABLE_OIL', 11, false),
('indian', 'IND_SAMOSA', 'ING_CILANTRO', 12, false);

-- Onion Pakora (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_ONION_PAKORA', 'ING_CHICKPEA_FLOUR', 1, true),
('indian', 'IND_ONION_PAKORA', 'ING_ONION', 2, true),
('indian', 'IND_ONION_PAKORA', 'ING_GREEN_CHILI', 3, false),
('indian', 'IND_ONION_PAKORA', 'ING_CILANTRO', 4, false),
('indian', 'IND_ONION_PAKORA', 'ING_CUMIN', 5, true),
('indian', 'IND_ONION_PAKORA', 'ING_RED_CHILI', 6, false),
('indian', 'IND_ONION_PAKORA', 'ING_AJWAIN', 7, true),
('indian', 'IND_ONION_PAKORA', 'ING_TURMERIC', 8, false),
('indian', 'IND_ONION_PAKORA', 'ING_VEGETABLE_OIL', 9, false),
('indian', 'IND_ONION_PAKORA', 'ING_SALT', 10, false);

-- Vegetable Pakora (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_VEGETABLE_PAKORA', 'ING_CHICKPEA_FLOUR', 1, true),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_POTATO', 2, false),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_CAULIFLOWER', 3, false),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_SPINACH', 4, false),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_BELL_PEPPER', 5, false),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_GREEN_CHILI', 6, false),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_CUMIN', 7, true),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_CORIANDER', 8, false),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_TURMERIC', 9, false),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_VEGETABLE_OIL', 10, false),
('indian', 'IND_VEGETABLE_PAKORA', 'ING_SALT', 11, false);

-- Aloo Tikki (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_ALOO_TIKKI', 'ING_POTATO', 1, true),
('indian', 'IND_ALOO_TIKKI', 'ING_GREEN_PEAS', 2, true),
('indian', 'IND_ALOO_TIKKI', 'ING_ONION', 3, false),
('indian', 'IND_ALOO_TIKKI', 'ING_GREEN_CHILI', 4, false),
('indian', 'IND_ALOO_TIKKI', 'ING_GINGER', 5, false),
('indian', 'IND_ALOO_TIKKI', 'ING_CILANTRO', 6, false),
('indian', 'IND_ALOO_TIKKI', 'ING_CUMIN', 7, true),
('indian', 'IND_ALOO_TIKKI', 'ING_CORIANDER', 8, false),
('indian', 'IND_ALOO_TIKKI', 'ING_GARAM_MASALA', 9, false),
('indian', 'IND_ALOO_TIKKI', 'ING_CHAAT_MASALA', 10, true),
('indian', 'IND_ALOO_TIKKI', 'ING_VEGETABLE_OIL', 11, false);

-- Onion Bhaji (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_ONION_BHAJI', 'ING_CHICKPEA_FLOUR', 1, true),
('indian', 'IND_ONION_BHAJI', 'ING_ONION', 2, true),
('indian', 'IND_ONION_BHAJI', 'ING_CUMIN', 3, true),
('indian', 'IND_ONION_BHAJI', 'ING_CORIANDER', 4, false),
('indian', 'IND_ONION_BHAJI', 'ING_TURMERIC', 5, false),
('indian', 'IND_ONION_BHAJI', 'ING_RED_CHILI', 6, false),
('indian', 'IND_ONION_BHAJI', 'ING_BAKING_POWDER', 7, false),
('indian', 'IND_ONION_BHAJI', 'ING_VEGETABLE_OIL', 8, false),
('indian', 'IND_ONION_BHAJI', 'ING_SALT', 9, false);

-- Chicken Pakora (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_CHICKEN_PAKORA', 'ING_CHICKEN_BREAST', 1, true),
('indian', 'IND_CHICKEN_PAKORA', 'ING_CHICKPEA_FLOUR', 2, true),
('indian', 'IND_CHICKEN_PAKORA', 'ING_GINGER', 3, false),
('indian', 'IND_CHICKEN_PAKORA', 'ING_GARLIC', 4, false),
('indian', 'IND_CHICKEN_PAKORA', 'ING_CUMIN', 5, true),
('indian', 'IND_CHICKEN_PAKORA', 'ING_CORIANDER', 6, false),
('indian', 'IND_CHICKEN_PAKORA', 'ING_RED_CHILI', 7, false),
('indian', 'IND_CHICKEN_PAKORA', 'ING_GARAM_MASALA', 8, true),
('indian', 'IND_CHICKEN_PAKORA', 'ING_VEGETABLE_OIL', 9, false),
('indian', 'IND_CHICKEN_PAKORA', 'ING_LEMON_JUICE', 10, false);

-- Paneer Pakora (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PANEER_PAKORA', 'ING_PANEER', 1, true),
('indian', 'IND_PANEER_PAKORA', 'ING_CHICKPEA_FLOUR', 2, true),
('indian', 'IND_PANEER_PAKORA', 'ING_CUMIN', 3, true),
('indian', 'IND_PANEER_PAKORA', 'ING_CORIANDER', 4, false),
('indian', 'IND_PANEER_PAKORA', 'ING_RED_CHILI', 5, false),
('indian', 'IND_PANEER_PAKORA', 'ING_AJWAIN', 6, true),
('indian', 'IND_PANEER_PAKORA', 'ING_TURMERIC', 7, false),
('indian', 'IND_PANEER_PAKORA', 'ING_VEGETABLE_OIL', 8, false),
('indian', 'IND_PANEER_PAKORA', 'ING_CHAAT_MASALA', 9, false);

-- ============================================
-- DALS (6 dishes)
-- ============================================

-- Dal Makhani (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_DAL_MAKHANI', 'ING_BLACK_LENTILS', 1, true),
('indian', 'IND_DAL_MAKHANI', 'ING_KIDNEY_BEANS', 2, true),
('indian', 'IND_DAL_MAKHANI', 'ING_BUTTER', 3, true),
('indian', 'IND_DAL_MAKHANI', 'ING_CREAM', 4, true),
('indian', 'IND_DAL_MAKHANI', 'ING_TOMATO', 5, false),
('indian', 'IND_DAL_MAKHANI', 'ING_ONION', 6, false),
('indian', 'IND_DAL_MAKHANI', 'ING_GINGER', 7, false),
('indian', 'IND_DAL_MAKHANI', 'ING_GARLIC', 8, false),
('indian', 'IND_DAL_MAKHANI', 'ING_GARAM_MASALA', 9, true),
('indian', 'IND_DAL_MAKHANI', 'ING_KASHMIRI_CHILI', 10, false),
('indian', 'IND_DAL_MAKHANI', 'ING_FENUGREEK_LEAVES', 11, true);

-- Dal Tadka (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_DAL_TADKA', 'ING_TOOR_DAL', 1, true),
('indian', 'IND_DAL_TADKA', 'ING_GHEE', 2, true),
('indian', 'IND_DAL_TADKA', 'ING_CUMIN', 3, true),
('indian', 'IND_DAL_TADKA', 'ING_GARLIC', 4, true),
('indian', 'IND_DAL_TADKA', 'ING_DRIED_RED_CHILI', 5, true),
('indian', 'IND_DAL_TADKA', 'ING_ONION', 6, false),
('indian', 'IND_DAL_TADKA', 'ING_TOMATO', 7, false),
('indian', 'IND_DAL_TADKA', 'ING_TURMERIC', 8, false),
('indian', 'IND_DAL_TADKA', 'ING_CILANTRO', 9, false),
('indian', 'IND_DAL_TADKA', 'ING_ASAFOETIDA', 10, true);

-- Chana Masala (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_CHANA_MASALA', 'ING_CHICKPEAS', 1, true),
('indian', 'IND_CHANA_MASALA', 'ING_TOMATO', 2, true),
('indian', 'IND_CHANA_MASALA', 'ING_ONION', 3, false),
('indian', 'IND_CHANA_MASALA', 'ING_GINGER', 4, false),
('indian', 'IND_CHANA_MASALA', 'ING_GARLIC', 5, false),
('indian', 'IND_CHANA_MASALA', 'ING_GREEN_CHILI', 6, false),
('indian', 'IND_CHANA_MASALA', 'ING_CHOLE_MASALA', 7, true),
('indian', 'IND_CHANA_MASALA', 'ING_CUMIN', 8, false),
('indian', 'IND_CHANA_MASALA', 'ING_CORIANDER', 9, false),
('indian', 'IND_CHANA_MASALA', 'ING_AMCHUR', 10, true),
('indian', 'IND_CHANA_MASALA', 'ING_POMEGRANATE_SEEDS', 11, true),
('indian', 'IND_CHANA_MASALA', 'ING_VEGETABLE_OIL', 12, false);

-- Rajma (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_RAJMA', 'ING_KIDNEY_BEANS', 1, true),
('indian', 'IND_RAJMA', 'ING_TOMATO', 2, true),
('indian', 'IND_RAJMA', 'ING_ONION', 3, false),
('indian', 'IND_RAJMA', 'ING_GINGER', 4, false),
('indian', 'IND_RAJMA', 'ING_GARLIC', 5, false),
('indian', 'IND_RAJMA', 'ING_GREEN_CHILI', 6, false),
('indian', 'IND_RAJMA', 'ING_GARAM_MASALA', 7, true),
('indian', 'IND_RAJMA', 'ING_CUMIN', 8, false),
('indian', 'IND_RAJMA', 'ING_CORIANDER', 9, false),
('indian', 'IND_RAJMA', 'ING_KASHMIRI_CHILI', 10, true),
('indian', 'IND_RAJMA', 'ING_GHEE', 11, false),
('indian', 'IND_RAJMA', 'ING_CILANTRO', 12, false);

-- Sambar (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_SAMBAR', 'ING_TOOR_DAL', 1, true),
('indian', 'IND_SAMBAR', 'ING_TAMARIND', 2, true),
('indian', 'IND_SAMBAR', 'ING_SAMBAR_POWDER', 3, true),
('indian', 'IND_SAMBAR', 'ING_DRUMSTICK', 4, true),
('indian', 'IND_SAMBAR', 'ING_CARROT', 5, false),
('indian', 'IND_SAMBAR', 'ING_ONION', 6, false),
('indian', 'IND_SAMBAR', 'ING_TOMATO', 7, false),
('indian', 'IND_SAMBAR', 'ING_CURRY_LEAVES', 8, true),
('indian', 'IND_SAMBAR', 'ING_MUSTARD_SEEDS', 9, true),
('indian', 'IND_SAMBAR', 'ING_DRIED_RED_CHILI', 10, false),
('indian', 'IND_SAMBAR', 'ING_ASAFOETIDA', 11, true),
('indian', 'IND_SAMBAR', 'ING_COCONUT_OIL', 12, false);

-- Dal Fry (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_DAL_FRY', 'ING_TOOR_DAL', 1, true),
('indian', 'IND_DAL_FRY', 'ING_MASOOR_DAL', 2, true),
('indian', 'IND_DAL_FRY', 'ING_ONION', 3, true),
('indian', 'IND_DAL_FRY', 'ING_TOMATO', 4, true),
('indian', 'IND_DAL_FRY', 'ING_GINGER', 5, false),
('indian', 'IND_DAL_FRY', 'ING_GARLIC', 6, false),
('indian', 'IND_DAL_FRY', 'ING_GREEN_CHILI', 7, false),
('indian', 'IND_DAL_FRY', 'ING_CUMIN', 8, true),
('indian', 'IND_DAL_FRY', 'ING_TURMERIC', 9, false),
('indian', 'IND_DAL_FRY', 'ING_GARAM_MASALA', 10, false),
('indian', 'IND_DAL_FRY', 'ING_GHEE', 11, true),
('indian', 'IND_DAL_FRY', 'ING_CILANTRO', 12, false);

-- ============================================
-- VEGETARIAN (8 dishes)
-- ============================================

-- Palak Paneer (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PALAK_PANEER', 'ING_PANEER', 1, true),
('indian', 'IND_PALAK_PANEER', 'ING_SPINACH', 2, true),
('indian', 'IND_PALAK_PANEER', 'ING_ONION', 3, false),
('indian', 'IND_PALAK_PANEER', 'ING_TOMATO', 4, false),
('indian', 'IND_PALAK_PANEER', 'ING_GINGER', 5, false),
('indian', 'IND_PALAK_PANEER', 'ING_GARLIC', 6, false),
('indian', 'IND_PALAK_PANEER', 'ING_GREEN_CHILI', 7, false),
('indian', 'IND_PALAK_PANEER', 'ING_CREAM', 8, true),
('indian', 'IND_PALAK_PANEER', 'ING_CUMIN', 9, false),
('indian', 'IND_PALAK_PANEER', 'ING_GARAM_MASALA', 10, true),
('indian', 'IND_PALAK_PANEER', 'ING_GHEE', 11, false);

-- Matar Paneer (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_MATAR_PANEER', 'ING_PANEER', 1, true),
('indian', 'IND_MATAR_PANEER', 'ING_GREEN_PEAS', 2, true),
('indian', 'IND_MATAR_PANEER', 'ING_TOMATO', 3, true),
('indian', 'IND_MATAR_PANEER', 'ING_ONION', 4, false),
('indian', 'IND_MATAR_PANEER', 'ING_GINGER', 5, false),
('indian', 'IND_MATAR_PANEER', 'ING_GARLIC', 6, false),
('indian', 'IND_MATAR_PANEER', 'ING_CREAM', 7, true),
('indian', 'IND_MATAR_PANEER', 'ING_GARAM_MASALA', 8, true),
('indian', 'IND_MATAR_PANEER', 'ING_CUMIN', 9, false),
('indian', 'IND_MATAR_PANEER', 'ING_CORIANDER', 10, false),
('indian', 'IND_MATAR_PANEER', 'ING_KASHMIRI_CHILI', 11, false),
('indian', 'IND_MATAR_PANEER', 'ING_GHEE', 12, false);

-- Paneer Butter Masala (11 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_PANEER', 1, true),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_TOMATO', 2, true),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_BUTTER', 3, true),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_CREAM', 4, true),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_ONION', 5, false),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_GINGER', 6, false),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_GARLIC', 7, false),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_GARAM_MASALA', 8, true),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_KASHMIRI_CHILI', 9, true),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_FENUGREEK_LEAVES', 10, true),
('indian', 'IND_PANEER_BUTTER_MASALA', 'ING_SUGAR', 11, false);

-- Aloo Gobi (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_ALOO_GOBI', 'ING_POTATO', 1, true),
('indian', 'IND_ALOO_GOBI', 'ING_CAULIFLOWER', 2, true),
('indian', 'IND_ALOO_GOBI', 'ING_ONION', 3, false),
('indian', 'IND_ALOO_GOBI', 'ING_TOMATO', 4, false),
('indian', 'IND_ALOO_GOBI', 'ING_GINGER', 5, false),
('indian', 'IND_ALOO_GOBI', 'ING_GARLIC', 6, false),
('indian', 'IND_ALOO_GOBI', 'ING_TURMERIC', 7, true),
('indian', 'IND_ALOO_GOBI', 'ING_CUMIN', 8, true),
('indian', 'IND_ALOO_GOBI', 'ING_CORIANDER', 9, false),
('indian', 'IND_ALOO_GOBI', 'ING_GARAM_MASALA', 10, false),
('indian', 'IND_ALOO_GOBI', 'ING_GREEN_CHILI', 11, false),
('indian', 'IND_ALOO_GOBI', 'ING_VEGETABLE_OIL', 12, false);

-- Kadai Paneer (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_KADAI_PANEER', 'ING_PANEER', 1, true),
('indian', 'IND_KADAI_PANEER', 'ING_BELL_PEPPER', 2, true),
('indian', 'IND_KADAI_PANEER', 'ING_TOMATO', 3, true),
('indian', 'IND_KADAI_PANEER', 'ING_ONION', 4, false),
('indian', 'IND_KADAI_PANEER', 'ING_GINGER', 5, false),
('indian', 'IND_KADAI_PANEER', 'ING_GARLIC', 6, false),
('indian', 'IND_KADAI_PANEER', 'ING_KASHMIRI_CHILI', 7, true),
('indian', 'IND_KADAI_PANEER', 'ING_CUMIN', 8, false),
('indian', 'IND_KADAI_PANEER', 'ING_CORIANDER', 9, false),
('indian', 'IND_KADAI_PANEER', 'ING_GARAM_MASALA', 10, false),
('indian', 'IND_KADAI_PANEER', 'ING_FENUGREEK_LEAVES', 11, true),
('indian', 'IND_KADAI_PANEER', 'ING_GHEE', 12, false);

-- Shahi Paneer (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_SHAHI_PANEER', 'ING_PANEER', 1, true),
('indian', 'IND_SHAHI_PANEER', 'ING_CREAM', 2, true),
('indian', 'IND_SHAHI_PANEER', 'ING_CASHEWS', 3, true),
('indian', 'IND_SHAHI_PANEER', 'ING_ONION', 4, false),
('indian', 'IND_SHAHI_PANEER', 'ING_TOMATO', 5, false),
('indian', 'IND_SHAHI_PANEER', 'ING_GINGER', 6, false),
('indian', 'IND_SHAHI_PANEER', 'ING_GARLIC', 7, false),
('indian', 'IND_SHAHI_PANEER', 'ING_CARDAMOM', 8, true),
('indian', 'IND_SHAHI_PANEER', 'ING_CINNAMON', 9, false),
('indian', 'IND_SHAHI_PANEER', 'ING_SAFFRON', 10, true),
('indian', 'IND_SHAHI_PANEER', 'ING_GARAM_MASALA', 11, false),
('indian', 'IND_SHAHI_PANEER', 'ING_GHEE', 12, false);

-- Baingan Bharta (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_BAINGAN_BHARTA', 'ING_EGGPLANT', 1, true),
('indian', 'IND_BAINGAN_BHARTA', 'ING_ONION', 2, true),
('indian', 'IND_BAINGAN_BHARTA', 'ING_TOMATO', 3, true),
('indian', 'IND_BAINGAN_BHARTA', 'ING_GREEN_PEAS', 4, false),
('indian', 'IND_BAINGAN_BHARTA', 'ING_GINGER', 5, false),
('indian', 'IND_BAINGAN_BHARTA', 'ING_GARLIC', 6, false),
('indian', 'IND_BAINGAN_BHARTA', 'ING_GREEN_CHILI', 7, false),
('indian', 'IND_BAINGAN_BHARTA', 'ING_CUMIN', 8, true),
('indian', 'IND_BAINGAN_BHARTA', 'ING_CORIANDER', 9, false),
('indian', 'IND_BAINGAN_BHARTA', 'ING_GARAM_MASALA', 10, false),
('indian', 'IND_BAINGAN_BHARTA', 'ING_MUSTARD_OIL', 11, true),
('indian', 'IND_BAINGAN_BHARTA', 'ING_CILANTRO', 12, false);

-- Malai Kofta (13 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_MALAI_KOFTA', 'ING_PANEER', 1, true),
('indian', 'IND_MALAI_KOFTA', 'ING_POTATO', 2, true),
('indian', 'IND_MALAI_KOFTA', 'ING_CASHEWS', 3, true),
('indian', 'IND_MALAI_KOFTA', 'ING_RAISINS', 4, true),
('indian', 'IND_MALAI_KOFTA', 'ING_CREAM', 5, true),
('indian', 'IND_MALAI_KOFTA', 'ING_TOMATO', 6, false),
('indian', 'IND_MALAI_KOFTA', 'ING_ONION', 7, false),
('indian', 'IND_MALAI_KOFTA', 'ING_GINGER', 8, false),
('indian', 'IND_MALAI_KOFTA', 'ING_GARLIC', 9, false),
('indian', 'IND_MALAI_KOFTA', 'ING_GARAM_MASALA', 10, true),
('indian', 'IND_MALAI_KOFTA', 'ING_CARDAMOM', 11, false),
('indian', 'IND_MALAI_KOFTA', 'ING_GHEE', 12, false),
('indian', 'IND_MALAI_KOFTA', 'ING_VEGETABLE_OIL', 13, false);

-- ============================================
-- STREET FOOD (6 dishes)
-- ============================================

-- Pav Bhaji (13 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PAV_BHAJI', 'ING_POTATO', 1, true),
('indian', 'IND_PAV_BHAJI', 'ING_CAULIFLOWER', 2, false),
('indian', 'IND_PAV_BHAJI', 'ING_GREEN_PEAS', 3, false),
('indian', 'IND_PAV_BHAJI', 'ING_CARROT', 4, false),
('indian', 'IND_PAV_BHAJI', 'ING_BELL_PEPPER', 5, false),
('indian', 'IND_PAV_BHAJI', 'ING_TOMATO', 6, true),
('indian', 'IND_PAV_BHAJI', 'ING_ONION', 7, false),
('indian', 'IND_PAV_BHAJI', 'ING_PAV_BHAJI_MASALA', 8, true),
('indian', 'IND_PAV_BHAJI', 'ING_BUTTER', 9, true),
('indian', 'IND_PAV_BHAJI', 'ING_GINGER', 10, false),
('indian', 'IND_PAV_BHAJI', 'ING_GARLIC', 11, false),
('indian', 'IND_PAV_BHAJI', 'ING_PAV_BREAD', 12, true),
('indian', 'IND_PAV_BHAJI', 'ING_CILANTRO', 13, false);

-- Vada Pav (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_VADA_PAV', 'ING_POTATO', 1, true),
('indian', 'IND_VADA_PAV', 'ING_CHICKPEA_FLOUR', 2, true),
('indian', 'IND_VADA_PAV', 'ING_GREEN_CHILI', 3, true),
('indian', 'IND_VADA_PAV', 'ING_GINGER', 4, false),
('indian', 'IND_VADA_PAV', 'ING_GARLIC', 5, false),
('indian', 'IND_VADA_PAV', 'ING_CURRY_LEAVES', 6, true),
('indian', 'IND_VADA_PAV', 'ING_MUSTARD_SEEDS', 7, true),
('indian', 'IND_VADA_PAV', 'ING_TURMERIC', 8, false),
('indian', 'IND_VADA_PAV', 'ING_PAV_BREAD', 9, true),
('indian', 'IND_VADA_PAV', 'ING_GREEN_CHUTNEY', 10, true),
('indian', 'IND_VADA_PAV', 'ING_TAMARIND_CHUTNEY', 11, true),
('indian', 'IND_VADA_PAV', 'ING_VEGETABLE_OIL', 12, false);

-- Pani Puri (12 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_PANI_PURI', 'ING_SEMOLINA', 1, true),
('indian', 'IND_PANI_PURI', 'ING_POTATO', 2, true),
('indian', 'IND_PANI_PURI', 'ING_CHICKPEAS', 3, true),
('indian', 'IND_PANI_PURI', 'ING_ONION', 4, false),
('indian', 'IND_PANI_PURI', 'ING_MINT', 5, true),
('indian', 'IND_PANI_PURI', 'ING_CILANTRO', 6, false),
('indian', 'IND_PANI_PURI', 'ING_TAMARIND', 7, true),
('indian', 'IND_PANI_PURI', 'ING_CUMIN', 8, false),
('indian', 'IND_PANI_PURI', 'ING_BLACK_SALT', 9, true),
('indian', 'IND_PANI_PURI', 'ING_CHAAT_MASALA', 10, true),
('indian', 'IND_PANI_PURI', 'ING_GREEN_CHILI', 11, false),
('indian', 'IND_PANI_PURI', 'ING_VEGETABLE_OIL', 12, false);

-- Bhel Puri (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_BHEL_PURI', 'ING_PUFFED_RICE', 1, true),
('indian', 'IND_BHEL_PURI', 'ING_SEV', 2, true),
('indian', 'IND_BHEL_PURI', 'ING_POTATO', 3, false),
('indian', 'IND_BHEL_PURI', 'ING_ONION', 4, false),
('indian', 'IND_BHEL_PURI', 'ING_TOMATO', 5, false),
('indian', 'IND_BHEL_PURI', 'ING_GREEN_CHUTNEY', 6, true),
('indian', 'IND_BHEL_PURI', 'ING_TAMARIND_CHUTNEY', 7, true),
('indian', 'IND_BHEL_PURI', 'ING_CHAAT_MASALA', 8, true),
('indian', 'IND_BHEL_PURI', 'ING_CILANTRO', 9, false),
('indian', 'IND_BHEL_PURI', 'ING_GREEN_CHILI', 10, false);

-- Masala Dosa (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_DOSA', 'ING_RICE', 1, true),
('indian', 'IND_DOSA', 'ING_URAD_DAL', 2, true),
('indian', 'IND_DOSA', 'ING_POTATO', 3, true),
('indian', 'IND_DOSA', 'ING_ONION', 4, false),
('indian', 'IND_DOSA', 'ING_MUSTARD_SEEDS', 5, true),
('indian', 'IND_DOSA', 'ING_CURRY_LEAVES', 6, true),
('indian', 'IND_DOSA', 'ING_GREEN_CHILI', 7, false),
('indian', 'IND_DOSA', 'ING_TURMERIC', 8, false),
('indian', 'IND_DOSA', 'ING_GHEE', 9, true),
('indian', 'IND_DOSA', 'ING_ASAFOETIDA', 10, true);

-- Idli (4 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('indian', 'IND_IDLI', 'ING_RICE', 1, true),
('indian', 'IND_IDLI', 'ING_URAD_DAL', 2, true),
('indian', 'IND_IDLI', 'ING_FENUGREEK_SEEDS', 3, true),
('indian', 'IND_IDLI', 'ING_SALT', 4, false);

-- ============================================
-- Verification Queries
-- ============================================

-- Count total links
SELECT
  'Total product_ingredients links' as metric,
  COUNT(*) as count
FROM product_ingredients
WHERE product_type = 'indian';

-- Count by category (via join)
SELECT
  i.category,
  COUNT(DISTINCT pi.product_id) as dishes,
  COUNT(pi.id) as total_links
FROM product_ingredients pi
JOIN indian i ON i.id = pi.product_id
WHERE pi.product_type = 'indian'
GROUP BY i.category
ORDER BY dishes DESC;

-- Top ingredients
SELECT
  pi.ingredient_id,
  COUNT(*) as usage_count
FROM product_ingredients pi
WHERE pi.product_type = 'indian'
GROUP BY pi.ingredient_id
ORDER BY usage_count DESC
LIMIT 20;
