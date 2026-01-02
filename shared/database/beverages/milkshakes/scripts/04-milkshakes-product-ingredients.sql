-- ============================================
-- MILKSHAKES - Product Ingredients Link
-- GUDBRO Database Standards v1.3
-- Total: 25 milkshakes
-- ============================================

-- Delete existing links for milkshakes (if re-running)
DELETE FROM product_ingredients WHERE product_type = 'milkshakes';

-- ============================================
-- CLASSIC MILKSHAKES (6 items)
-- ============================================

-- MKS_VANILLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_VANILLA', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_VANILLA', 'ING_MILK', 'main', false, 2),
('milkshakes', 'MKS_VANILLA', 'ING_VANILLA', 'seasoning', false, 3),
('milkshakes', 'MKS_VANILLA', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- MKS_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_CHOCOLATE', 'ING_CHOCOLATE_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_CHOCOLATE', 'ING_MILK', 'main', false, 2),
('milkshakes', 'MKS_CHOCOLATE', 'ING_CHOCOLATE_SYRUP', 'secondary', false, 3),
('milkshakes', 'MKS_CHOCOLATE', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- MKS_STRAWBERRY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_STRAWBERRY', 'ING_STRAWBERRY_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_STRAWBERRY', 'ING_MILK', 'main', false, 2),
('milkshakes', 'MKS_STRAWBERRY', 'ING_STRAWBERRY', 'secondary', false, 3),
('milkshakes', 'MKS_STRAWBERRY', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- MKS_MALTED_VANILLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_MALTED_VANILLA', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_MALTED_VANILLA', 'ING_MILK', 'main', false, 2),
('milkshakes', 'MKS_MALTED_VANILLA', 'ING_MALT_POWDER', 'main', false, 3),
('milkshakes', 'MKS_MALTED_VANILLA', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- MKS_MALTED_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_MALTED_CHOCOLATE', 'ING_CHOCOLATE_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_MALTED_CHOCOLATE', 'ING_MILK', 'main', false, 2),
('milkshakes', 'MKS_MALTED_CHOCOLATE', 'ING_MALT_POWDER', 'main', false, 3),
('milkshakes', 'MKS_MALTED_CHOCOLATE', 'ING_CHOCOLATE_SYRUP', 'secondary', false, 4),
('milkshakes', 'MKS_MALTED_CHOCOLATE', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- MKS_NEAPOLITAN
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_NEAPOLITAN', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_NEAPOLITAN', 'ING_CHOCOLATE_ICE_CREAM', 'main', false, 2),
('milkshakes', 'MKS_NEAPOLITAN', 'ING_STRAWBERRY_ICE_CREAM', 'main', false, 3),
('milkshakes', 'MKS_NEAPOLITAN', 'ING_MILK', 'secondary', false, 4),
('milkshakes', 'MKS_NEAPOLITAN', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- ============================================
-- PREMIUM MILKSHAKES (6 items)
-- ============================================

-- MKS_COOKIES_CREAM
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_COOKIES_CREAM', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_COOKIES_CREAM', 'ING_MILK', 'main', false, 2),
('milkshakes', 'MKS_COOKIES_CREAM', 'ING_OREO_COOKIE', 'main', false, 3),
('milkshakes', 'MKS_COOKIES_CREAM', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- MKS_PEANUT_BUTTER
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_PEANUT_BUTTER', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_PEANUT_BUTTER', 'ING_PEANUT_BUTTER', 'main', false, 2),
('milkshakes', 'MKS_PEANUT_BUTTER', 'ING_MILK', 'secondary', false, 3),
('milkshakes', 'MKS_PEANUT_BUTTER', 'ING_CHOCOLATE_SYRUP', 'secondary', false, 4),
('milkshakes', 'MKS_PEANUT_BUTTER', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- MKS_SALTED_CARAMEL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_SALTED_CARAMEL', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_SALTED_CARAMEL', 'ING_CARAMEL_SAUCE', 'main', false, 2),
('milkshakes', 'MKS_SALTED_CARAMEL', 'ING_MILK', 'secondary', false, 3),
('milkshakes', 'MKS_SALTED_CARAMEL', 'ING_SALT', 'seasoning', false, 4),
('milkshakes', 'MKS_SALTED_CARAMEL', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- MKS_BROWNIE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_BROWNIE', 'ING_CHOCOLATE_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_BROWNIE', 'ING_BROWNIE', 'main', false, 2),
('milkshakes', 'MKS_BROWNIE', 'ING_MILK', 'secondary', false, 3),
('milkshakes', 'MKS_BROWNIE', 'ING_CHOCOLATE_SYRUP', 'secondary', false, 4),
('milkshakes', 'MKS_BROWNIE', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- MKS_COOKIE_DOUGH
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_COOKIE_DOUGH', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_COOKIE_DOUGH', 'ING_COOKIE_DOUGH', 'main', false, 2),
('milkshakes', 'MKS_COOKIE_DOUGH', 'ING_MILK', 'secondary', false, 3),
('milkshakes', 'MKS_COOKIE_DOUGH', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- MKS_BIRTHDAY_CAKE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_BIRTHDAY_CAKE', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_BIRTHDAY_CAKE', 'ING_MILK', 'main', false, 2),
('milkshakes', 'MKS_BIRTHDAY_CAKE', 'ING_VANILLA', 'secondary', false, 3),
('milkshakes', 'MKS_BIRTHDAY_CAKE', 'ING_SPRINKLE', 'garnish', false, 4),
('milkshakes', 'MKS_BIRTHDAY_CAKE', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- ============================================
-- SPECIALTY MILKSHAKES (6 items)
-- ============================================

-- MKS_MOCHA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_MOCHA', 'ING_CHOCOLATE_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_MOCHA', 'ING_ESPRESSO', 'main', false, 2),
('milkshakes', 'MKS_MOCHA', 'ING_MILK', 'secondary', false, 3),
('milkshakes', 'MKS_MOCHA', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- MKS_ESPRESSO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_ESPRESSO', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_ESPRESSO', 'ING_ESPRESSO', 'main', false, 2),
('milkshakes', 'MKS_ESPRESSO', 'ING_MILK', 'secondary', false, 3),
('milkshakes', 'MKS_ESPRESSO', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- MKS_MINT_CHIP
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_MINT_CHIP', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_MINT_CHIP', 'ING_MINT', 'main', false, 2),
('milkshakes', 'MKS_MINT_CHIP', 'ING_CHOCOLATE_CHIP', 'main', false, 3),
('milkshakes', 'MKS_MINT_CHIP', 'ING_MILK', 'secondary', false, 4),
('milkshakes', 'MKS_MINT_CHIP', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- MKS_BANANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_BANANA', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_BANANA', 'ING_BANANA', 'main', false, 2),
('milkshakes', 'MKS_BANANA', 'ING_STRAWBERRY', 'secondary', false, 3),
('milkshakes', 'MKS_BANANA', 'ING_CHOCOLATE_SYRUP', 'secondary', false, 4),
('milkshakes', 'MKS_BANANA', 'ING_MILK', 'secondary', false, 5),
('milkshakes', 'MKS_BANANA', 'ING_WHIPPED_CREAM', 'garnish', true, 6),
('milkshakes', 'MKS_BANANA', 'ING_MARASCHINO_CHERRY', 'garnish', true, 7);

-- MKS_BLACK_WHITE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_BLACK_WHITE', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_BLACK_WHITE', 'ING_CHOCOLATE_SYRUP', 'main', false, 2),
('milkshakes', 'MKS_BLACK_WHITE', 'ING_MILK', 'secondary', false, 3),
('milkshakes', 'MKS_BLACK_WHITE', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- MKS_MAPLE_BACON
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_MAPLE_BACON', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_MAPLE_BACON', 'ING_MAPLE_SYRUP', 'main', false, 2),
('milkshakes', 'MKS_MAPLE_BACON', 'ING_BACON', 'garnish', false, 3),
('milkshakes', 'MKS_MAPLE_BACON', 'ING_MILK', 'secondary', false, 4),
('milkshakes', 'MKS_MAPLE_BACON', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- ============================================
-- BOOZY MILKSHAKES (4 items)
-- ============================================

-- MKS_MUDSLIDE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_MUDSLIDE', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_MUDSLIDE', 'ING_KAHLUA', 'main', false, 2),
('milkshakes', 'MKS_MUDSLIDE', 'ING_IRISH_CREAM', 'main', false, 3),
('milkshakes', 'MKS_MUDSLIDE', 'ING_VODKA', 'secondary', false, 4),
('milkshakes', 'MKS_MUDSLIDE', 'ING_CHOCOLATE_SYRUP', 'garnish', true, 5),
('milkshakes', 'MKS_MUDSLIDE', 'ING_WHIPPED_CREAM', 'garnish', true, 6);

-- MKS_IRISH_COFFEE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_IRISH_COFFEE', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_IRISH_COFFEE', 'ING_IRISH_WHISKEY', 'main', false, 2),
('milkshakes', 'MKS_IRISH_COFFEE', 'ING_KAHLUA', 'secondary', false, 3),
('milkshakes', 'MKS_IRISH_COFFEE', 'ING_ESPRESSO', 'secondary', false, 4),
('milkshakes', 'MKS_IRISH_COFFEE', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- MKS_BOURBON_CARAMEL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_BOURBON_CARAMEL', 'ING_VANILLA_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_BOURBON_CARAMEL', 'ING_BOURBON', 'main', false, 2),
('milkshakes', 'MKS_BOURBON_CARAMEL', 'ING_CARAMEL_SAUCE', 'main', false, 3),
('milkshakes', 'MKS_BOURBON_CARAMEL', 'ING_MILK', 'secondary', false, 4),
('milkshakes', 'MKS_BOURBON_CARAMEL', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- MKS_SPIKED_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_SPIKED_CHOCOLATE', 'ING_CHOCOLATE_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_SPIKED_CHOCOLATE', 'ING_DARK_RUM', 'main', false, 2),
('milkshakes', 'MKS_SPIKED_CHOCOLATE', 'ING_CHOCOLATE_SYRUP', 'secondary', false, 3),
('milkshakes', 'MKS_SPIKED_CHOCOLATE', 'ING_MILK', 'secondary', false, 4);

-- ============================================
-- HEALTHY MILKSHAKES (3 items)
-- ============================================

-- MKS_PROTEIN_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_PROTEIN_CHOCOLATE', 'ING_CHOCOLATE_ICE_CREAM', 'main', false, 1),
('milkshakes', 'MKS_PROTEIN_CHOCOLATE', 'ING_WHEY_PROTEIN', 'main', false, 2),
('milkshakes', 'MKS_PROTEIN_CHOCOLATE', 'ING_MILK', 'secondary', false, 3),
('milkshakes', 'MKS_PROTEIN_CHOCOLATE', 'ING_BANANA', 'secondary', true, 4);

-- MKS_DAIRY_FREE_VANILLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_DAIRY_FREE_VANILLA', 'ING_OAT_MILK', 'main', false, 1),
('milkshakes', 'MKS_DAIRY_FREE_VANILLA', 'ING_VANILLA', 'main', false, 2),
('milkshakes', 'MKS_DAIRY_FREE_VANILLA', 'ING_BANANA', 'secondary', false, 3),
('milkshakes', 'MKS_DAIRY_FREE_VANILLA', 'ING_HONEY', 'seasoning', true, 4);

-- MKS_BANANA_DATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('milkshakes', 'MKS_BANANA_DATE', 'ING_BANANA', 'main', false, 1),
('milkshakes', 'MKS_BANANA_DATE', 'ING_DATE', 'main', false, 2),
('milkshakes', 'MKS_BANANA_DATE', 'ING_MILK', 'secondary', false, 3),
('milkshakes', 'MKS_BANANA_DATE', 'ING_VANILLA', 'seasoning', true, 4);
