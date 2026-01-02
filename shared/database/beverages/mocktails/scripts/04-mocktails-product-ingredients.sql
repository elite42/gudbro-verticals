-- ============================================
-- MOCKTAILS - Product Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Clean existing product_ingredients for mocktails
DELETE FROM product_ingredients WHERE product_type = 'mocktails';

-- Insert product ingredients
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES

-- ============================================
-- VIRGIN CLASSICS
-- ============================================
-- Virgin Mojito
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_LIME_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_MINT', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_SUGAR', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_SODA_WATER', 'main', false, 4),
('mocktails', 'MCK_VIRGIN_MOJITO', 'ING_ICE', 'secondary', false, 5),

-- Virgin Margarita
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_LIME_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_ORANGE_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_AGAVE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_SALT', 'garnish', true, 4),
('mocktails', 'MCK_VIRGIN_MARGARITA', 'ING_ICE', 'secondary', false, 5),

-- Virgin Pina Colada
('mocktails', 'MCK_VIRGIN_PINA_COLADA', 'ING_PINEAPPLE_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_PINA_COLADA', 'ING_COCONUT_CREAM', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_PINA_COLADA', 'ING_COCONUT_MILK', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_PINA_COLADA', 'ING_ICE', 'secondary', false, 4),

-- Virgin Mary
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_TOMATO_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_LEMON_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_WORCESTERSHIRE_SAUCE', 'seasoning', false, 3),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_HOT_SAUCE', 'seasoning', true, 4),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_CELERY_SALT', 'seasoning', false, 5),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_BLACK_PEPPER', 'seasoning', false, 6),
('mocktails', 'MCK_VIRGIN_BLOODY_MARY', 'ING_ICE', 'secondary', false, 7),

-- Virgin Cosmopolitan
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_CRANBERRY_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_LIME_JUICE', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_ORANGE_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_SIMPLE_SYRUP', 'secondary', false, 4),
('mocktails', 'MCK_VIRGIN_COSMOPOLITAN', 'ING_ICE', 'secondary', false, 5),

-- Virgin Paloma
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_GRAPEFRUIT_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_LIME_JUICE', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_SPARKLING_WATER', 'main', false, 4),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_SALT', 'garnish', true, 5),
('mocktails', 'MCK_VIRGIN_PALOMA', 'ING_ICE', 'secondary', false, 6),

-- Virgin Moscow Mule
('mocktails', 'MCK_VIRGIN_MOSCOW_MULE', 'ING_GINGER_BEER', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MOSCOW_MULE', 'ING_LIME_JUICE', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_MOSCOW_MULE', 'ING_SIMPLE_SYRUP', 'secondary', true, 3),
('mocktails', 'MCK_VIRGIN_MOSCOW_MULE', 'ING_ICE', 'secondary', false, 4),

-- Virgin Daiquiri
('mocktails', 'MCK_VIRGIN_DAIQUIRI', 'ING_LIME_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_DAIQUIRI', 'ING_SIMPLE_SYRUP', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_DAIQUIRI', 'ING_ICE', 'secondary', false, 3),

-- ============================================
-- ICONIC MOCKTAILS
-- ============================================
-- Shirley Temple
('mocktails', 'MCK_SHIRLEY_TEMPLE', 'ING_GINGER_ALE', 'main', false, 1),
('mocktails', 'MCK_SHIRLEY_TEMPLE', 'ING_GRENADINE', 'main', false, 2),
('mocktails', 'MCK_SHIRLEY_TEMPLE', 'ING_MARASCHINO_CHERRY', 'garnish', false, 3),
('mocktails', 'MCK_SHIRLEY_TEMPLE', 'ING_ICE', 'secondary', false, 4),

-- Roy Rogers
('mocktails', 'MCK_ROY_ROGERS', 'ING_COLA', 'main', false, 1),
('mocktails', 'MCK_ROY_ROGERS', 'ING_GRENADINE', 'main', false, 2),
('mocktails', 'MCK_ROY_ROGERS', 'ING_MARASCHINO_CHERRY', 'garnish', false, 3),
('mocktails', 'MCK_ROY_ROGERS', 'ING_ICE', 'secondary', false, 4),

-- Arnold Palmer
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_BLACK_TEA', 'main', false, 1),
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_LEMON_JUICE', 'main', false, 2),
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_SUGAR', 'secondary', false, 3),
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_WATER', 'secondary', false, 4),
('mocktails', 'MCK_ARNOLD_PALMER', 'ING_ICE', 'secondary', false, 5),

-- Cinderella
('mocktails', 'MCK_CINDERELLA', 'ING_PINEAPPLE_JUICE', 'main', false, 1),
('mocktails', 'MCK_CINDERELLA', 'ING_ORANGE_JUICE', 'main', false, 2),
('mocktails', 'MCK_CINDERELLA', 'ING_LEMON_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_CINDERELLA', 'ING_GRENADINE', 'secondary', false, 4),
('mocktails', 'MCK_CINDERELLA', 'ING_SODA_WATER', 'secondary', false, 5),
('mocktails', 'MCK_CINDERELLA', 'ING_ICE', 'secondary', false, 6),

-- Safe Sex on the Beach
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_PEACH_NECTAR', 'main', false, 1),
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_ORANGE_JUICE', 'main', false, 2),
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_CRANBERRY_JUICE', 'main', false, 3),
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_GRENADINE', 'secondary', true, 4),
('mocktails', 'MCK_SAFE_SEX_ON_THE_BEACH', 'ING_ICE', 'secondary', false, 5),

-- Virgin Mimosa
('mocktails', 'MCK_VIRGIN_MIMOSA', 'ING_ORANGE_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MIMOSA', 'ING_SPARKLING_WATER', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_MIMOSA', 'ING_ICE', 'secondary', true, 3),

-- Virgin Bellini
('mocktails', 'MCK_VIRGIN_BELLINI', 'ING_PEACH_PUREE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_BELLINI', 'ING_SPARKLING_WATER', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_BELLINI', 'ING_ICE', 'secondary', true, 3),

-- Nojito
('mocktails', 'MCK_NOJITO', 'ING_LIME_JUICE', 'main', false, 1),
('mocktails', 'MCK_NOJITO', 'ING_MINT', 'main', false, 2),
('mocktails', 'MCK_NOJITO', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_NOJITO', 'ING_SODA_WATER', 'main', false, 4),
('mocktails', 'MCK_NOJITO', 'ING_ICE', 'secondary', false, 5),

-- ============================================
-- TROPICAL & FRUITY
-- ============================================
-- Tropical Sunrise
('mocktails', 'MCK_TROPICAL_SUNRISE', 'ING_ORANGE_JUICE', 'main', false, 1),
('mocktails', 'MCK_TROPICAL_SUNRISE', 'ING_PINEAPPLE_JUICE', 'main', false, 2),
('mocktails', 'MCK_TROPICAL_SUNRISE', 'ING_GRENADINE', 'secondary', false, 3),
('mocktails', 'MCK_TROPICAL_SUNRISE', 'ING_ICE', 'secondary', false, 4),

-- Mango Tango
('mocktails', 'MCK_MANGO_TANGO', 'ING_MANGO_PUREE', 'main', false, 1),
('mocktails', 'MCK_MANGO_TANGO', 'ING_ORANGE_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_MANGO_TANGO', 'ING_PASSION_FRUIT_PUREE', 'main', false, 3),
('mocktails', 'MCK_MANGO_TANGO', 'ING_LIME_JUICE', 'secondary', false, 4),
('mocktails', 'MCK_MANGO_TANGO', 'ING_ICE', 'secondary', false, 5),

-- Berry Blast
('mocktails', 'MCK_BERRY_BLAST', 'ING_MIXED_BERRIES', 'main', false, 1),
('mocktails', 'MCK_BERRY_BLAST', 'ING_APPLE_JUICE', 'main', false, 2),
('mocktails', 'MCK_BERRY_BLAST', 'ING_LIME_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_BERRY_BLAST', 'ING_SIMPLE_SYRUP', 'secondary', true, 4),
('mocktails', 'MCK_BERRY_BLAST', 'ING_ICE', 'secondary', false, 5),

-- Passion Fruit Fizz
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_PASSION_FRUIT_PUREE', 'main', false, 1),
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_SPARKLING_WATER', 'main', false, 4),
('mocktails', 'MCK_PASSION_FRUIT_FIZZ', 'ING_ICE', 'secondary', false, 5),

-- Watermelon Cooler
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_WATERMELON_JUICE', 'main', false, 1),
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_MINT', 'secondary', false, 3),
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_SIMPLE_SYRUP', 'secondary', true, 4),
('mocktails', 'MCK_WATERMELON_COOLER', 'ING_ICE', 'secondary', false, 5),

-- Strawberry Lemonade
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_STRAWBERRY_PUREE', 'main', false, 1),
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_LEMON_JUICE', 'main', false, 2),
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_SUGAR', 'secondary', false, 3),
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_WATER', 'secondary', false, 4),
('mocktails', 'MCK_STRAWBERRY_LEMONADE', 'ING_ICE', 'secondary', false, 5),

-- Blue Lagoon Mocktail
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_LEMON_JUICE', 'main', false, 1),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_BLUE_SPIRULINA', 'secondary', false, 4),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_LEMONADE', 'main', false, 5),
('mocktails', 'MCK_BLUE_LAGOON_MOCKTAIL', 'ING_ICE', 'secondary', false, 6),

-- Pineapple Coconut Bliss
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_PINEAPPLE_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_COCONUT_MILK', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_COCONUT_CREAM', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_SIMPLE_SYRUP', 'secondary', true, 4),
('mocktails', 'MCK_VIRGIN_PINEAPPLE_COCONUT', 'ING_ICE', 'secondary', false, 5),

-- ============================================
-- SPECIALTY
-- ============================================
-- Lavender Lemonade
('mocktails', 'MCK_LAVENDER_LEMONADE', 'ING_LEMON_JUICE', 'main', false, 1),
('mocktails', 'MCK_LAVENDER_LEMONADE', 'ING_LAVENDER_SYRUP', 'main', false, 2),
('mocktails', 'MCK_LAVENDER_LEMONADE', 'ING_WATER', 'secondary', false, 3),
('mocktails', 'MCK_LAVENDER_LEMONADE', 'ING_ICE', 'secondary', false, 4),

-- Cucumber Mint Cooler
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_CUCUMBER', 'main', false, 1),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_MINT', 'main', false, 2),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_LIME_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_SIMPLE_SYRUP', 'secondary', false, 4),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_SPARKLING_WATER', 'main', false, 5),
('mocktails', 'MCK_CUCUMBER_MINT_COOLER', 'ING_ICE', 'secondary', false, 6),

-- Ginger Lemongrass Cooler
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_GINGER', 'main', false, 1),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_LEMONGRASS', 'main', false, 2),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_LIME_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_HONEY', 'secondary', false, 4),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_SPARKLING_WATER', 'main', false, 5),
('mocktails', 'MCK_GINGER_LEMONGRASS_COOLER', 'ING_ICE', 'secondary', false, 6),

-- Cranberry Fizz
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_CRANBERRY_JUICE', 'main', false, 1),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_ROSEMARY', 'garnish', false, 4),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_SPARKLING_WATER', 'main', false, 5),
('mocktails', 'MCK_CRANBERRY_FIZZ', 'ING_ICE', 'secondary', false, 6),

-- Chai Spiced Cider
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_APPLE_CIDER', 'main', false, 1),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_CINNAMON', 'seasoning', false, 2),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_CARDAMOM', 'seasoning', false, 3),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_GINGER', 'seasoning', false, 4),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_CLOVES', 'seasoning', false, 5),
('mocktails', 'MCK_CHAI_SPICED_CIDER', 'ING_HONEY', 'secondary', false, 6),

-- Hibiscus Cooler
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_HIBISCUS_TEA', 'main', false, 1),
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_LIME_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_ORANGE_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_SIMPLE_SYRUP', 'secondary', false, 4),
('mocktails', 'MCK_HIBISCUS_COOLER', 'ING_ICE', 'secondary', false, 5),

-- Virgin Sangria
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_GRAPE_JUICE', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_ORANGE_JUICE', 'secondary', false, 2),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_LEMON_JUICE', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_APPLE', 'garnish', false, 4),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_ORANGE', 'garnish', false, 5),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_SPARKLING_WATER', 'secondary', false, 6),
('mocktails', 'MCK_VIRGIN_SANGRIA', 'ING_ICE', 'secondary', false, 7),

-- Matcha Lemonade
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_MATCHA_POWDER', 'main', false, 1),
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_LEMON_JUICE', 'main', false, 2),
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_WATER', 'secondary', false, 4),
('mocktails', 'MCK_MATCHA_LEMONADE', 'ING_ICE', 'secondary', false, 5),

-- ============================================
-- CREAMY & FROZEN
-- ============================================
-- Virgin Mudslide
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_CHOCOLATE_SYRUP', 'main', false, 1),
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_VANILLA_ICE_CREAM', 'main', false, 2),
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_MILK', 'secondary', false, 3),
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_WHIPPED_CREAM', 'garnish', true, 4),
('mocktails', 'MCK_VIRGIN_MUDSLIDE', 'ING_ICE', 'secondary', false, 5),

-- Strawberry Dream
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_STRAWBERRY_PUREE', 'main', false, 1),
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_VANILLA_ICE_CREAM', 'main', false, 2),
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_MILK', 'secondary', false, 3),
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_WHIPPED_CREAM', 'garnish', true, 4),
('mocktails', 'MCK_STRAWBERRY_MILKSHAKE_MOCKTAIL', 'ING_ICE', 'secondary', false, 5),

-- Orange Creamsicle
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_ORANGE_JUICE', 'main', false, 1),
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_VANILLA_ICE_CREAM', 'main', false, 2),
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_MILK', 'secondary', false, 3),
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_VANILLA_EXTRACT', 'seasoning', false, 4),
('mocktails', 'MCK_ORANGE_CREAMSICLE', 'ING_ICE', 'secondary', false, 5),

-- Frozen Strawberry Daiquiri
('mocktails', 'MCK_FROZEN_STRAWBERRY_DAIQUIRI', 'ING_STRAWBERRY_PUREE', 'main', false, 1),
('mocktails', 'MCK_FROZEN_STRAWBERRY_DAIQUIRI', 'ING_LIME_JUICE', 'main', false, 2),
('mocktails', 'MCK_FROZEN_STRAWBERRY_DAIQUIRI', 'ING_SIMPLE_SYRUP', 'secondary', false, 3),
('mocktails', 'MCK_FROZEN_STRAWBERRY_DAIQUIRI', 'ING_ICE', 'secondary', false, 4),

-- Coconut Cream Dream
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_COCONUT_CREAM', 'main', false, 1),
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_COCONUT_MILK', 'main', false, 2),
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_VANILLA_EXTRACT', 'seasoning', false, 3),
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_SIMPLE_SYRUP', 'secondary', false, 4),
('mocktails', 'MCK_COCONUT_CREAM_DREAM', 'ING_ICE', 'secondary', false, 5),

-- Mango Lassi Mocktail
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_MANGO_PUREE', 'main', false, 1),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_YOGURT', 'main', false, 2),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_MILK', 'secondary', false, 3),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_HONEY', 'secondary', false, 4),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_CARDAMOM', 'seasoning', false, 5),
('mocktails', 'MCK_MANGO_LASSI_MOCKTAIL', 'ING_ICE', 'secondary', true, 6);
