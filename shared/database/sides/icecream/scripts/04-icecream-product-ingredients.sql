-- ============================================
-- ICE CREAM Product Ingredients Links
-- GUDBRO Database Standards v1.3
-- ============================================

-- Clear existing links for icecream
DELETE FROM product_ingredients WHERE product_type = 'icecream';

-- Insert product-ingredient relationships
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES

-- GELATO
('icecream', 'ICE_STRACCIATELLA', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_STRACCIATELLA', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_STRACCIATELLA', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_STRACCIATELLA', 'ING_VANILLA', 'secondary', false, 4),
('icecream', 'ICE_STRACCIATELLA', 'ING_STRACCIATELLA', 'main', false, 5),

('icecream', 'ICE_PISTACHIO_GELATO', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_PISTACHIO_GELATO', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_PISTACHIO_GELATO', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_PISTACHIO_GELATO', 'ING_PISTACHIO', 'main', false, 4),

('icecream', 'ICE_HAZELNUT_GELATO', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_HAZELNUT_GELATO', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_HAZELNUT_GELATO', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_HAZELNUT_GELATO', 'ING_HAZELNUTS', 'main', false, 4),

('icecream', 'ICE_FIOR_DI_LATTE', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_FIOR_DI_LATTE', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_FIOR_DI_LATTE', 'ING_SUGAR', 'main', false, 3),

('icecream', 'ICE_AMARENA', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_AMARENA', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_AMARENA', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_AMARENA', 'ING_CHERRY', 'main', false, 4),
('icecream', 'ICE_AMARENA', 'ING_BERRY_COMPOTE', 'secondary', false, 5),

('icecream', 'ICE_TIRAMISU_GELATO', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_TIRAMISU_GELATO', 'ING_MASCARPONE', 'main', false, 2),
('icecream', 'ICE_TIRAMISU_GELATO', 'ING_ESPRESSO', 'main', false, 3),
('icecream', 'ICE_TIRAMISU_GELATO', 'ING_COCOA_POWDER', 'secondary', false, 4),
('icecream', 'ICE_TIRAMISU_GELATO', 'ING_SUGAR', 'main', false, 5),

-- SORBET
('icecream', 'ICE_LEMON_SORBET', 'ING_LEMON', 'main', false, 1),
('icecream', 'ICE_LEMON_SORBET', 'ING_LEMON_ZEST', 'secondary', false, 2),
('icecream', 'ICE_LEMON_SORBET', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_LEMON_SORBET', 'ING_WATER', 'main', false, 4),

('icecream', 'ICE_MANGO_SORBET', 'ING_MANGO_PUREE', 'main', false, 1),
('icecream', 'ICE_MANGO_SORBET', 'ING_SUGAR', 'main', false, 2),
('icecream', 'ICE_MANGO_SORBET', 'ING_LIME', 'secondary', false, 3),

('icecream', 'ICE_RASPBERRY_SORBET', 'ING_RASPBERRY_PUREE', 'main', false, 1),
('icecream', 'ICE_RASPBERRY_SORBET', 'ING_SUGAR', 'main', false, 2),
('icecream', 'ICE_RASPBERRY_SORBET', 'ING_LEMON', 'secondary', false, 3),

('icecream', 'ICE_PASSION_FRUIT_SORBET', 'ING_PASSION_FRUIT_PUREE', 'main', false, 1),
('icecream', 'ICE_PASSION_FRUIT_SORBET', 'ING_SUGAR', 'main', false, 2),
('icecream', 'ICE_PASSION_FRUIT_SORBET', 'ING_LIME', 'secondary', false, 3),

('icecream', 'ICE_COCONUT_SORBET', 'ING_COCONUT_CREAM', 'main', false, 1),
('icecream', 'ICE_COCONUT_SORBET', 'ING_COCONUT', 'main', false, 2),
('icecream', 'ICE_COCONUT_SORBET', 'ING_SUGAR', 'main', false, 3),

-- FROZEN YOGURT
('icecream', 'ICE_VANILLA_FROYO', 'ING_GREEK_YOGURT', 'main', false, 1),
('icecream', 'ICE_VANILLA_FROYO', 'ING_VANILLA', 'main', false, 2),
('icecream', 'ICE_VANILLA_FROYO', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_VANILLA_FROYO', 'ING_MILK', 'secondary', false, 4),

('icecream', 'ICE_STRAWBERRY_FROYO', 'ING_GREEK_YOGURT', 'main', false, 1),
('icecream', 'ICE_STRAWBERRY_FROYO', 'ING_STRAWBERRY', 'main', false, 2),
('icecream', 'ICE_STRAWBERRY_FROYO', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_STRAWBERRY_FROYO', 'ING_MILK', 'secondary', false, 4),

('icecream', 'ICE_ACAI_FROYO', 'ING_GREEK_YOGURT', 'main', false, 1),
('icecream', 'ICE_ACAI_FROYO', 'ING_ACAI_PUREE', 'main', false, 2),
('icecream', 'ICE_ACAI_FROYO', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_ACAI_FROYO', 'ING_HONEY', 'secondary', false, 4),

-- CLASSIC ICE CREAM
('icecream', 'ICE_VANILLA_BEAN', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_VANILLA_BEAN', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_VANILLA_BEAN', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_VANILLA_BEAN', 'ING_VANILLA', 'main', false, 4),
('icecream', 'ICE_VANILLA_BEAN', 'ING_EGG', 'secondary', false, 5),

('icecream', 'ICE_CHOCOLATE', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_CHOCOLATE', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_CHOCOLATE', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_CHOCOLATE', 'ING_COCOA_POWDER', 'main', false, 4),
('icecream', 'ICE_CHOCOLATE', 'ING_CHOCOLATE_CHUNK', 'secondary', false, 5),

('icecream', 'ICE_STRAWBERRY', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_STRAWBERRY', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_STRAWBERRY', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_STRAWBERRY', 'ING_STRAWBERRY', 'main', false, 4),

('icecream', 'ICE_MINT_CHIP', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_MINT_CHIP', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_MINT_CHIP', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_MINT_CHIP', 'ING_PEPPERMINT_EXTRACT', 'main', false, 4),
('icecream', 'ICE_MINT_CHIP', 'ING_CHOCOLATE_CHIP', 'main', false, 5),

('icecream', 'ICE_COOKIES_CREAM', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_COOKIES_CREAM', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_COOKIES_CREAM', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_COOKIES_CREAM', 'ING_VANILLA', 'secondary', false, 4),
('icecream', 'ICE_COOKIES_CREAM', 'ING_OREO_COOKIE', 'main', false, 5),

('icecream', 'ICE_SALTED_CARAMEL', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_SALTED_CARAMEL', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_SALTED_CARAMEL', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_SALTED_CARAMEL', 'ING_CARAMEL_SAUCE', 'main', false, 4),
('icecream', 'ICE_SALTED_CARAMEL', 'ING_SALT', 'seasoning', false, 5),

('icecream', 'ICE_BUTTER_PECAN', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_BUTTER_PECAN', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_BUTTER_PECAN', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_BUTTER_PECAN', 'ING_BUTTER', 'main', false, 4),
('icecream', 'ICE_BUTTER_PECAN', 'ING_CANDIED_PECAN', 'main', false, 5),

('icecream', 'ICE_ROCKY_ROAD', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_ROCKY_ROAD', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_ROCKY_ROAD', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_ROCKY_ROAD', 'ING_COCOA_POWDER', 'main', false, 4),
('icecream', 'ICE_ROCKY_ROAD', 'ING_MARSHMALLOW', 'main', false, 5),
('icecream', 'ICE_ROCKY_ROAD', 'ING_ALMOND', 'main', false, 6),

-- SUNDAES
('icecream', 'ICE_HOT_FUDGE_SUNDAE', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_HOT_FUDGE_SUNDAE', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_HOT_FUDGE_SUNDAE', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_HOT_FUDGE_SUNDAE', 'ING_VANILLA', 'main', false, 4),
('icecream', 'ICE_HOT_FUDGE_SUNDAE', 'ING_HOT_FUDGE', 'main', false, 5),
('icecream', 'ICE_HOT_FUDGE_SUNDAE', 'ING_WHIPPED_CREAM', 'garnish', false, 6),
('icecream', 'ICE_HOT_FUDGE_SUNDAE', 'ING_MARASCHINO_CHERRY', 'garnish', false, 7),

('icecream', 'ICE_BANANA_SPLIT', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_BANANA_SPLIT', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_BANANA_SPLIT', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_BANANA_SPLIT', 'ING_BANANA', 'main', false, 4),
('icecream', 'ICE_BANANA_SPLIT', 'ING_STRAWBERRY', 'secondary', false, 5),
('icecream', 'ICE_BANANA_SPLIT', 'ING_PINEAPPLE', 'secondary', false, 6),
('icecream', 'ICE_BANANA_SPLIT', 'ING_CHOCOLATE_SYRUP', 'secondary', false, 7),
('icecream', 'ICE_BANANA_SPLIT', 'ING_WHIPPED_CREAM', 'garnish', false, 8),
('icecream', 'ICE_BANANA_SPLIT', 'ING_MARASCHINO_CHERRY', 'garnish', false, 9),

('icecream', 'ICE_BROWNIE_SUNDAE', 'ING_BROWNIE', 'main', false, 1),
('icecream', 'ICE_BROWNIE_SUNDAE', 'ING_HEAVY_CREAM', 'main', false, 2),
('icecream', 'ICE_BROWNIE_SUNDAE', 'ING_MILK', 'main', false, 3),
('icecream', 'ICE_BROWNIE_SUNDAE', 'ING_VANILLA', 'secondary', false, 4),
('icecream', 'ICE_BROWNIE_SUNDAE', 'ING_HOT_FUDGE', 'secondary', false, 5),
('icecream', 'ICE_BROWNIE_SUNDAE', 'ING_WHIPPED_CREAM', 'garnish', false, 6),

('icecream', 'ICE_AFFOGATO', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_AFFOGATO', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_AFFOGATO', 'ING_VANILLA', 'main', false, 3),
('icecream', 'ICE_AFFOGATO', 'ING_ESPRESSO', 'main', false, 4),

-- SPECIALTY
('icecream', 'ICE_MATCHA', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_MATCHA', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_MATCHA', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_MATCHA', 'ING_MATCHA_POWDER', 'main', false, 4),

('icecream', 'ICE_BLACK_SESAME', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_BLACK_SESAME', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_BLACK_SESAME', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_BLACK_SESAME', 'ING_BLACK_SESAME', 'main', false, 4),

('icecream', 'ICE_DULCE_DE_LECHE', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_DULCE_DE_LECHE', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_DULCE_DE_LECHE', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_DULCE_DE_LECHE', 'ING_DULCE_DE_LECHE', 'main', false, 4),

('icecream', 'ICE_LAVENDER_HONEY', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_LAVENDER_HONEY', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_LAVENDER_HONEY', 'ING_HONEY', 'main', false, 3),
('icecream', 'ICE_LAVENDER_HONEY', 'ING_LAVENDER', 'main', false, 4),

('icecream', 'ICE_BISCOFF', 'ING_HEAVY_CREAM', 'main', false, 1),
('icecream', 'ICE_BISCOFF', 'ING_MILK', 'main', false, 2),
('icecream', 'ICE_BISCOFF', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_BISCOFF', 'ING_COOKIE_CRUMB', 'main', false, 4),

-- VEGAN/DAIRY-FREE
('icecream', 'ICE_COCONUT_CHOCOLATE', 'ING_COCONUT_CREAM', 'main', false, 1),
('icecream', 'ICE_COCONUT_CHOCOLATE', 'ING_COCOA_POWDER', 'main', false, 2),
('icecream', 'ICE_COCONUT_CHOCOLATE', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_COCONUT_CHOCOLATE', 'ING_COCONUT', 'secondary', false, 4),

('icecream', 'ICE_CASHEW_VANILLA', 'ING_CASHEW_CREAM', 'main', false, 1),
('icecream', 'ICE_CASHEW_VANILLA', 'ING_VANILLA', 'main', false, 2),
('icecream', 'ICE_CASHEW_VANILLA', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_CASHEW_VANILLA', 'ING_COCONUT_CREAM', 'secondary', false, 4),

('icecream', 'ICE_OATMILK_STRAWBERRY', 'ING_OAT_MILK', 'main', false, 1),
('icecream', 'ICE_OATMILK_STRAWBERRY', 'ING_STRAWBERRY', 'main', false, 2),
('icecream', 'ICE_OATMILK_STRAWBERRY', 'ING_SUGAR', 'main', false, 3),
('icecream', 'ICE_OATMILK_STRAWBERRY', 'ING_COCONUT_CREAM', 'secondary', false, 4);
