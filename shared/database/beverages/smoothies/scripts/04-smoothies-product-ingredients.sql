-- ============================================
-- SMOOTHIES - Product Ingredients Link
-- GUDBRO Database Standards v1.3
-- Total: 45 smoothies
-- ============================================

-- Delete existing links for smoothies (if re-running)
DELETE FROM product_ingredients WHERE product_type = 'smoothies';

-- ============================================
-- FRUIT SMOOTHIES (10 items)
-- ============================================

-- SMO_STRAWBERRY_BANANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_STRAWBERRY_BANANA', 'ING_STRAWBERRY', 'main', false, 1),
('smoothies', 'SMO_STRAWBERRY_BANANA', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_STRAWBERRY_BANANA', 'ING_YOGURT', 'secondary', false, 3),
('smoothies', 'SMO_STRAWBERRY_BANANA', 'ING_HONEY', 'seasoning', true, 4);

-- SMO_MIXED_BERRY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_MIXED_BERRY', 'ING_BLUEBERRY', 'main', false, 1),
('smoothies', 'SMO_MIXED_BERRY', 'ING_RASPBERRY', 'main', false, 2),
('smoothies', 'SMO_MIXED_BERRY', 'ING_BLACKBERRY', 'main', false, 3),
('smoothies', 'SMO_MIXED_BERRY', 'ING_YOGURT', 'secondary', false, 4);

-- SMO_MANGO_PASSION
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_MANGO_PASSION', 'ING_MANGO', 'main', false, 1),
('smoothies', 'SMO_MANGO_PASSION', 'ING_PASSION_FRUIT', 'main', false, 2),
('smoothies', 'SMO_MANGO_PASSION', 'ING_ORANGE', 'secondary', false, 3);

-- SMO_PEACH_MANGO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_PEACH_MANGO', 'ING_PEACH', 'main', false, 1),
('smoothies', 'SMO_PEACH_MANGO', 'ING_MANGO', 'main', false, 2),
('smoothies', 'SMO_PEACH_MANGO', 'ING_ORANGE', 'secondary', false, 3);

-- SMO_WILD_BERRY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_WILD_BERRY', 'ING_STRAWBERRY', 'main', false, 1),
('smoothies', 'SMO_WILD_BERRY', 'ING_LINGONBERRY', 'main', false, 2),
('smoothies', 'SMO_WILD_BERRY', 'ING_BLUEBERRY', 'secondary', false, 3),
('smoothies', 'SMO_WILD_BERRY', 'ING_YOGURT', 'secondary', false, 4);

-- SMO_APPLE_GINGER
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_APPLE_GINGER', 'ING_APPLE', 'main', false, 1),
('smoothies', 'SMO_APPLE_GINGER', 'ING_GINGER', 'main', false, 2),
('smoothies', 'SMO_APPLE_GINGER', 'ING_LEMON', 'secondary', false, 3);

-- SMO_PINEAPPLE_COCONUT
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_PINEAPPLE_COCONUT', 'ING_PINEAPPLE', 'main', false, 1),
('smoothies', 'SMO_PINEAPPLE_COCONUT', 'ING_COCONUT', 'main', false, 2),
('smoothies', 'SMO_PINEAPPLE_COCONUT', 'ING_COCONUT_WATER', 'secondary', false, 3);

-- SMO_WATERMELON_MINT
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_WATERMELON_MINT', 'ING_WATERMELON', 'main', false, 1),
('smoothies', 'SMO_WATERMELON_MINT', 'ING_MINT', 'secondary', false, 2),
('smoothies', 'SMO_WATERMELON_MINT', 'ING_LIME', 'garnish', true, 3);

-- SMO_CHERRY_VANILLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_CHERRY_VANILLA', 'ING_CHERRY', 'main', false, 1),
('smoothies', 'SMO_CHERRY_VANILLA', 'ING_VANILLA', 'main', false, 2),
('smoothies', 'SMO_CHERRY_VANILLA', 'ING_YOGURT', 'secondary', false, 3);

-- SMO_CITRUS_BURST
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_CITRUS_BURST', 'ING_ORANGE', 'main', false, 1),
('smoothies', 'SMO_CITRUS_BURST', 'ING_GRAPEFRUIT', 'main', false, 2),
('smoothies', 'SMO_CITRUS_BURST', 'ING_LEMON', 'secondary', false, 3);

-- ============================================
-- GREEN SMOOTHIES (8 items)
-- ============================================

-- SMO_GREEN_MACHINE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_GREEN_MACHINE', 'ING_SPINACH', 'main', false, 1),
('smoothies', 'SMO_GREEN_MACHINE', 'ING_KALE', 'main', false, 2),
('smoothies', 'SMO_GREEN_MACHINE', 'ING_BANANA', 'secondary', false, 3),
('smoothies', 'SMO_GREEN_MACHINE', 'ING_APPLE', 'secondary', false, 4),
('smoothies', 'SMO_GREEN_MACHINE', 'ING_ALMOND_MILK', 'secondary', false, 5);

-- SMO_KALE_PINEAPPLE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_KALE_PINEAPPLE', 'ING_KALE', 'main', false, 1),
('smoothies', 'SMO_KALE_PINEAPPLE', 'ING_PINEAPPLE', 'main', false, 2),
('smoothies', 'SMO_KALE_PINEAPPLE', 'ING_COCONUT_WATER', 'secondary', false, 3);

-- SMO_SPINACH_MANGO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_SPINACH_MANGO', 'ING_SPINACH', 'main', false, 1),
('smoothies', 'SMO_SPINACH_MANGO', 'ING_MANGO', 'main', false, 2),
('smoothies', 'SMO_SPINACH_MANGO', 'ING_OAT_MILK', 'secondary', false, 3);

-- SMO_CUCUMBER_CELERY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_CUCUMBER_CELERY', 'ING_CUCUMBER', 'main', false, 1),
('smoothies', 'SMO_CUCUMBER_CELERY', 'ING_CELERY', 'main', false, 2),
('smoothies', 'SMO_CUCUMBER_CELERY', 'ING_LIME', 'secondary', false, 3);

-- SMO_AVOCADO_BANANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_AVOCADO_BANANA', 'ING_AVOCADO', 'main', false, 1),
('smoothies', 'SMO_AVOCADO_BANANA', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_AVOCADO_BANANA', 'ING_ALMOND_MILK', 'secondary', false, 3),
('smoothies', 'SMO_AVOCADO_BANANA', 'ING_HONEY', 'seasoning', true, 4);

-- SMO_MATCHA_BANANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_MATCHA_BANANA', 'ING_MATCHA', 'main', false, 1),
('smoothies', 'SMO_MATCHA_BANANA', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_MATCHA_BANANA', 'ING_OAT_MILK', 'secondary', false, 3);

-- SMO_SPIRULINA_TROPICAL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_SPIRULINA_TROPICAL', 'ING_SPIRULINA', 'main', false, 1),
('smoothies', 'SMO_SPIRULINA_TROPICAL', 'ING_MANGO', 'main', false, 2),
('smoothies', 'SMO_SPIRULINA_TROPICAL', 'ING_PINEAPPLE', 'secondary', false, 3),
('smoothies', 'SMO_SPIRULINA_TROPICAL', 'ING_COCONUT_WATER', 'secondary', false, 4);

-- SMO_WHEATGRASS_APPLE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_WHEATGRASS_APPLE', 'ING_WHEATGRASS', 'main', false, 1),
('smoothies', 'SMO_WHEATGRASS_APPLE', 'ING_APPLE', 'main', false, 2),
('smoothies', 'SMO_WHEATGRASS_APPLE', 'ING_LEMON', 'secondary', false, 3);

-- ============================================
-- PROTEIN SMOOTHIES (8 items)
-- ============================================

-- SMO_PEANUT_BUTTER_BANANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_PEANUT_BUTTER_BANANA', 'ING_PEANUT_BUTTER', 'main', false, 1),
('smoothies', 'SMO_PEANUT_BUTTER_BANANA', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_PEANUT_BUTTER_BANANA', 'ING_MILK', 'secondary', false, 3),
('smoothies', 'SMO_PEANUT_BUTTER_BANANA', 'ING_HONEY', 'seasoning', true, 4);

-- SMO_CHOCOLATE_PROTEIN
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_CHOCOLATE_PROTEIN', 'ING_CACAO', 'main', false, 1),
('smoothies', 'SMO_CHOCOLATE_PROTEIN', 'ING_WHEY_PROTEIN', 'main', false, 2),
('smoothies', 'SMO_CHOCOLATE_PROTEIN', 'ING_BANANA', 'secondary', false, 3),
('smoothies', 'SMO_CHOCOLATE_PROTEIN', 'ING_MILK', 'secondary', false, 4);

-- SMO_VANILLA_ALMOND
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_VANILLA_ALMOND', 'ING_VANILLA', 'main', false, 1),
('smoothies', 'SMO_VANILLA_ALMOND', 'ING_ALMOND', 'main', false, 2),
('smoothies', 'SMO_VANILLA_ALMOND', 'ING_PROTEIN_POWDER', 'secondary', false, 3),
('smoothies', 'SMO_VANILLA_ALMOND', 'ING_ALMOND_MILK', 'secondary', false, 4);

-- SMO_GREEK_YOGURT_BERRY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_GREEK_YOGURT_BERRY', 'ING_GREEK_YOGURT', 'main', false, 1),
('smoothies', 'SMO_GREEK_YOGURT_BERRY', 'ING_BLUEBERRY', 'main', false, 2),
('smoothies', 'SMO_GREEK_YOGURT_BERRY', 'ING_RASPBERRY', 'secondary', false, 3),
('smoothies', 'SMO_GREEK_YOGURT_BERRY', 'ING_HONEY', 'seasoning', true, 4);

-- SMO_COFFEE_PROTEIN
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_COFFEE_PROTEIN', 'ING_COLD_BREW_COFFEE', 'main', false, 1),
('smoothies', 'SMO_COFFEE_PROTEIN', 'ING_PROTEIN_POWDER', 'main', false, 2),
('smoothies', 'SMO_COFFEE_PROTEIN', 'ING_BANANA', 'secondary', false, 3),
('smoothies', 'SMO_COFFEE_PROTEIN', 'ING_MILK', 'secondary', false, 4);

-- SMO_OAT_BANANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_OAT_BANANA', 'ING_ROLLED_OAT', 'main', false, 1),
('smoothies', 'SMO_OAT_BANANA', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_OAT_BANANA', 'ING_OAT_MILK', 'secondary', false, 3),
('smoothies', 'SMO_OAT_BANANA', 'ING_HONEY', 'seasoning', true, 4);

-- SMO_HEMP_BERRY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_HEMP_BERRY', 'ING_HEMP_SEED', 'main', false, 1),
('smoothies', 'SMO_HEMP_BERRY', 'ING_BLUEBERRY', 'main', false, 2),
('smoothies', 'SMO_HEMP_BERRY', 'ING_RASPBERRY', 'secondary', false, 3),
('smoothies', 'SMO_HEMP_BERRY', 'ING_ALMOND_MILK', 'secondary', false, 4);

-- SMO_COTTAGE_CHEESE_PEACH
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_COTTAGE_CHEESE_PEACH', 'ING_COTTAGE_CHEESE', 'main', false, 1),
('smoothies', 'SMO_COTTAGE_CHEESE_PEACH', 'ING_PEACH', 'main', false, 2),
('smoothies', 'SMO_COTTAGE_CHEESE_PEACH', 'ING_MILK', 'secondary', false, 3);

-- ============================================
-- SUPERFOOD SMOOTHIES (8 items)
-- ============================================

-- SMO_ACAI_BOWL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_ACAI_BOWL', 'ING_ACAI', 'main', false, 1),
('smoothies', 'SMO_ACAI_BOWL', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_ACAI_BOWL', 'ING_GRANOLA', 'garnish', false, 3),
('smoothies', 'SMO_ACAI_BOWL', 'ING_HONEY', 'seasoning', true, 4);

-- SMO_PITAYA_BOWL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_PITAYA_BOWL', 'ING_PITAYA', 'main', false, 1),
('smoothies', 'SMO_PITAYA_BOWL', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_PITAYA_BOWL', 'ING_COCONUT_WATER', 'secondary', false, 3),
('smoothies', 'SMO_PITAYA_BOWL', 'ING_MANGO', 'garnish', true, 4);

-- SMO_CHIA_BERRY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_CHIA_BERRY', 'ING_CHIA_SEED', 'main', false, 1),
('smoothies', 'SMO_CHIA_BERRY', 'ING_BLUEBERRY', 'main', false, 2),
('smoothies', 'SMO_CHIA_BERRY', 'ING_RASPBERRY', 'secondary', false, 3),
('smoothies', 'SMO_CHIA_BERRY', 'ING_ALMOND_MILK', 'secondary', false, 4);

-- SMO_GOJI_MANGO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_GOJI_MANGO', 'ING_GOJI_BERRY', 'main', false, 1),
('smoothies', 'SMO_GOJI_MANGO', 'ING_MANGO', 'main', false, 2),
('smoothies', 'SMO_GOJI_MANGO', 'ING_COCONUT_WATER', 'secondary', false, 3);

-- SMO_TURMERIC_MANGO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_TURMERIC_MANGO', 'ING_TURMERIC', 'main', false, 1),
('smoothies', 'SMO_TURMERIC_MANGO', 'ING_MANGO', 'main', false, 2),
('smoothies', 'SMO_TURMERIC_MANGO', 'ING_COCONUT_WATER', 'secondary', false, 3),
('smoothies', 'SMO_TURMERIC_MANGO', 'ING_GINGER', 'seasoning', true, 4);

-- SMO_CACAO_AVOCADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_CACAO_AVOCADO', 'ING_CACAO', 'main', false, 1),
('smoothies', 'SMO_CACAO_AVOCADO', 'ING_AVOCADO', 'main', false, 2),
('smoothies', 'SMO_CACAO_AVOCADO', 'ING_BANANA', 'secondary', false, 3),
('smoothies', 'SMO_CACAO_AVOCADO', 'ING_ALMOND_MILK', 'secondary', false, 4);

-- SMO_BEE_POLLEN
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_BEE_POLLEN', 'ING_BEE_POLLEN', 'main', false, 1),
('smoothies', 'SMO_BEE_POLLEN', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_BEE_POLLEN', 'ING_HONEY', 'secondary', false, 3),
('smoothies', 'SMO_BEE_POLLEN', 'ING_YOGURT', 'secondary', false, 4);

-- SMO_MACA_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_MACA_CHOCOLATE', 'ING_MACA', 'main', false, 1),
('smoothies', 'SMO_MACA_CHOCOLATE', 'ING_CACAO', 'main', false, 2),
('smoothies', 'SMO_MACA_CHOCOLATE', 'ING_BANANA', 'secondary', false, 3),
('smoothies', 'SMO_MACA_CHOCOLATE', 'ING_ALMOND_MILK', 'secondary', false, 4);

-- ============================================
-- TROPICAL SMOOTHIES (6 items)
-- ============================================

-- SMO_TROPICAL_PARADISE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_TROPICAL_PARADISE', 'ING_MANGO', 'main', false, 1),
('smoothies', 'SMO_TROPICAL_PARADISE', 'ING_PINEAPPLE', 'main', false, 2),
('smoothies', 'SMO_TROPICAL_PARADISE', 'ING_PAPAYA', 'main', false, 3),
('smoothies', 'SMO_TROPICAL_PARADISE', 'ING_COCONUT_WATER', 'secondary', false, 4);

-- SMO_BAHAMA_MAMA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_BAHAMA_MAMA', 'ING_STRAWBERRY', 'main', false, 1),
('smoothies', 'SMO_BAHAMA_MAMA', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_BAHAMA_MAMA', 'ING_PINEAPPLE', 'secondary', false, 3),
('smoothies', 'SMO_BAHAMA_MAMA', 'ING_COCONUT', 'secondary', false, 4);

-- SMO_CARIBBEAN_BREEZE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_CARIBBEAN_BREEZE', 'ING_PAPAYA', 'main', false, 1),
('smoothies', 'SMO_CARIBBEAN_BREEZE', 'ING_GUAVA', 'main', false, 2),
('smoothies', 'SMO_CARIBBEAN_BREEZE', 'ING_PASSION_FRUIT', 'main', false, 3);

-- SMO_COCONUT_MANGO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_COCONUT_MANGO', 'ING_COCONUT_MILK', 'main', false, 1),
('smoothies', 'SMO_COCONUT_MANGO', 'ING_MANGO', 'main', false, 2),
('smoothies', 'SMO_COCONUT_MANGO', 'ING_LIME', 'garnish', true, 3);

-- SMO_LYCHEE_ROSE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_LYCHEE_ROSE', 'ING_LYCHEE', 'main', false, 1),
('smoothies', 'SMO_LYCHEE_ROSE', 'ING_ROSE_WATER', 'main', false, 2),
('smoothies', 'SMO_LYCHEE_ROSE', 'ING_COCONUT_WATER', 'secondary', false, 3);

-- SMO_GUAVA_LIME
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_GUAVA_LIME', 'ING_GUAVA', 'main', false, 1),
('smoothies', 'SMO_GUAVA_LIME', 'ING_LIME', 'main', false, 2),
('smoothies', 'SMO_GUAVA_LIME', 'ING_ORANGE', 'secondary', false, 3);

-- ============================================
-- BOWL SMOOTHIES (5 items)
-- ============================================

-- SMO_BLUE_SPIRULINA_BOWL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_BLUE_SPIRULINA_BOWL', 'ING_SPIRULINA', 'main', false, 1),
('smoothies', 'SMO_BLUE_SPIRULINA_BOWL', 'ING_BANANA', 'main', false, 2),
('smoothies', 'SMO_BLUE_SPIRULINA_BOWL', 'ING_MANGO', 'secondary', false, 3),
('smoothies', 'SMO_BLUE_SPIRULINA_BOWL', 'ING_COCONUT_WATER', 'secondary', false, 4),
('smoothies', 'SMO_BLUE_SPIRULINA_BOWL', 'ING_GRANOLA', 'garnish', true, 5);

-- SMO_GREEN_GODDESS_BOWL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_GREEN_GODDESS_BOWL', 'ING_AVOCADO', 'main', false, 1),
('smoothies', 'SMO_GREEN_GODDESS_BOWL', 'ING_SPINACH', 'main', false, 2),
('smoothies', 'SMO_GREEN_GODDESS_BOWL', 'ING_KIWI', 'main', false, 3),
('smoothies', 'SMO_GREEN_GODDESS_BOWL', 'ING_ALMOND_MILK', 'secondary', false, 4),
('smoothies', 'SMO_GREEN_GODDESS_BOWL', 'ING_CHIA_SEED', 'garnish', true, 5);

-- SMO_CHOCOLATE_PEANUT_BOWL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_CHOCOLATE_PEANUT_BOWL', 'ING_CACAO', 'main', false, 1),
('smoothies', 'SMO_CHOCOLATE_PEANUT_BOWL', 'ING_PEANUT_BUTTER', 'main', false, 2),
('smoothies', 'SMO_CHOCOLATE_PEANUT_BOWL', 'ING_BANANA', 'secondary', false, 3),
('smoothies', 'SMO_CHOCOLATE_PEANUT_BOWL', 'ING_GRANOLA', 'garnish', false, 4),
('smoothies', 'SMO_CHOCOLATE_PEANUT_BOWL', 'ING_MILK', 'secondary', false, 5);

-- SMO_MANGO_CHIA_BOWL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_MANGO_CHIA_BOWL', 'ING_MANGO', 'main', false, 1),
('smoothies', 'SMO_MANGO_CHIA_BOWL', 'ING_CHIA_SEED', 'main', false, 2),
('smoothies', 'SMO_MANGO_CHIA_BOWL', 'ING_COCONUT_WATER', 'secondary', false, 3),
('smoothies', 'SMO_MANGO_CHIA_BOWL', 'ING_BANANA', 'secondary', false, 4);

-- SMO_BERRY_GRANOLA_BOWL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('smoothies', 'SMO_BERRY_GRANOLA_BOWL', 'ING_BLUEBERRY', 'main', false, 1),
('smoothies', 'SMO_BERRY_GRANOLA_BOWL', 'ING_RASPBERRY', 'main', false, 2),
('smoothies', 'SMO_BERRY_GRANOLA_BOWL', 'ING_GRANOLA', 'garnish', false, 3),
('smoothies', 'SMO_BERRY_GRANOLA_BOWL', 'ING_YOGURT', 'secondary', false, 4);
