-- ============================================
-- HOT BEVERAGES - Product Ingredients Link
-- GUDBRO Database Standards v1.3
-- Total: 25 hot beverages
-- ============================================

-- Delete existing links for hotbeverages (if re-running)
DELETE FROM product_ingredients WHERE product_type = 'hotbeverages';

-- ============================================
-- HOT CHOCOLATE (6 items)
-- ============================================

-- HBV_CLASSIC_HOT_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_CLASSIC_HOT_CHOCOLATE', 'ING_HOT_CHOCOLATE_MIX', 'main', false, 1),
('hotbeverages', 'HBV_CLASSIC_HOT_CHOCOLATE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_CLASSIC_HOT_CHOCOLATE', 'ING_WHIPPED_CREAM', 'garnish', true, 3),
('hotbeverages', 'HBV_CLASSIC_HOT_CHOCOLATE', 'ING_MARSHMALLOW', 'garnish', true, 4);

-- HBV_DARK_HOT_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_DARK_HOT_CHOCOLATE', 'ING_DARK_CHOCOLATE', 'main', false, 1),
('hotbeverages', 'HBV_DARK_HOT_CHOCOLATE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_DARK_HOT_CHOCOLATE', 'ING_CACAO', 'secondary', false, 3);

-- HBV_WHITE_HOT_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_WHITE_HOT_CHOCOLATE', 'ING_WHITE_CHOCOLATE', 'main', false, 1),
('hotbeverages', 'HBV_WHITE_HOT_CHOCOLATE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_WHITE_HOT_CHOCOLATE', 'ING_VANILLA', 'seasoning', false, 3),
('hotbeverages', 'HBV_WHITE_HOT_CHOCOLATE', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- HBV_MEXICAN_HOT_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_MEXICAN_HOT_CHOCOLATE', 'ING_DARK_CHOCOLATE', 'main', false, 1),
('hotbeverages', 'HBV_MEXICAN_HOT_CHOCOLATE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_MEXICAN_HOT_CHOCOLATE', 'ING_CINNAMON', 'main', false, 3),
('hotbeverages', 'HBV_MEXICAN_HOT_CHOCOLATE', 'ING_CAYENNE', 'seasoning', false, 4);

-- HBV_PEPPERMINT_HOT_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_PEPPERMINT_HOT_CHOCOLATE', 'ING_HOT_CHOCOLATE_MIX', 'main', false, 1),
('hotbeverages', 'HBV_PEPPERMINT_HOT_CHOCOLATE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_PEPPERMINT_HOT_CHOCOLATE', 'ING_PEPPERMINT_EXTRACT', 'main', false, 3),
('hotbeverages', 'HBV_PEPPERMINT_HOT_CHOCOLATE', 'ING_WHIPPED_CREAM', 'garnish', true, 4);

-- HBV_VEGAN_HOT_CHOCOLATE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_VEGAN_HOT_CHOCOLATE', 'ING_CACAO', 'main', false, 1),
('hotbeverages', 'HBV_VEGAN_HOT_CHOCOLATE', 'ING_OAT_MILK', 'main', false, 2),
('hotbeverages', 'HBV_VEGAN_HOT_CHOCOLATE', 'ING_MAPLE_SYRUP', 'seasoning', false, 3);

-- ============================================
-- TEA LATTES (7 items)
-- ============================================

-- HBV_CHAI_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_CHAI_LATTE', 'ING_BLACK_TEA', 'main', false, 1),
('hotbeverages', 'HBV_CHAI_LATTE', 'ING_CHAI_SPICE', 'main', false, 2),
('hotbeverages', 'HBV_CHAI_LATTE', 'ING_STEAMED_MILK', 'main', false, 3),
('hotbeverages', 'HBV_CHAI_LATTE', 'ING_HONEY', 'seasoning', true, 4);

-- HBV_MATCHA_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_MATCHA_LATTE', 'ING_MATCHA', 'main', false, 1),
('hotbeverages', 'HBV_MATCHA_LATTE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_MATCHA_LATTE', 'ING_HONEY', 'seasoning', true, 3);

-- HBV_LONDON_FOG
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_LONDON_FOG', 'ING_BLACK_TEA', 'main', false, 1),
('hotbeverages', 'HBV_LONDON_FOG', 'ING_VANILLA', 'main', false, 2),
('hotbeverages', 'HBV_LONDON_FOG', 'ING_STEAMED_MILK', 'main', false, 3);

-- HBV_LAVENDER_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_LAVENDER_LATTE', 'ING_BLACK_TEA', 'main', false, 1),
('hotbeverages', 'HBV_LAVENDER_LATTE', 'ING_LAVENDER', 'main', false, 2),
('hotbeverages', 'HBV_LAVENDER_LATTE', 'ING_STEAMED_MILK', 'main', false, 3),
('hotbeverages', 'HBV_LAVENDER_LATTE', 'ING_VANILLA', 'seasoning', true, 4);

-- HBV_DIRTY_CHAI
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_DIRTY_CHAI', 'ING_BLACK_TEA', 'main', false, 1),
('hotbeverages', 'HBV_DIRTY_CHAI', 'ING_CHAI_SPICE', 'main', false, 2),
('hotbeverages', 'HBV_DIRTY_CHAI', 'ING_ESPRESSO', 'main', false, 3),
('hotbeverages', 'HBV_DIRTY_CHAI', 'ING_STEAMED_MILK', 'secondary', false, 4);

-- HBV_HOJICHA_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_HOJICHA_LATTE', 'ING_TEA_GREEN', 'main', false, 1),
('hotbeverages', 'HBV_HOJICHA_LATTE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_HOJICHA_LATTE', 'ING_HONEY', 'seasoning', true, 3);

-- HBV_ROOIBOS_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_ROOIBOS_LATTE', 'ING_ROOIBOS', 'main', false, 1),
('hotbeverages', 'HBV_ROOIBOS_LATTE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_ROOIBOS_LATTE', 'ING_VANILLA', 'seasoning', true, 3);

-- ============================================
-- SPICED & GOLDEN DRINKS (6 items)
-- ============================================

-- HBV_GOLDEN_MILK
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_GOLDEN_MILK', 'ING_TURMERIC', 'main', false, 1),
('hotbeverages', 'HBV_GOLDEN_MILK', 'ING_COCONUT_MILK', 'main', false, 2),
('hotbeverages', 'HBV_GOLDEN_MILK', 'ING_GINGER', 'secondary', false, 3),
('hotbeverages', 'HBV_GOLDEN_MILK', 'ING_CINNAMON', 'secondary', false, 4),
('hotbeverages', 'HBV_GOLDEN_MILK', 'ING_BLACK_PEPPER', 'seasoning', false, 5),
('hotbeverages', 'HBV_GOLDEN_MILK', 'ING_HONEY', 'seasoning', true, 6);

-- HBV_PUMPKIN_SPICE_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_PUMPKIN_SPICE_LATTE', 'ING_PUMPKIN', 'main', false, 1),
('hotbeverages', 'HBV_PUMPKIN_SPICE_LATTE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_PUMPKIN_SPICE_LATTE', 'ING_CINNAMON', 'secondary', false, 3),
('hotbeverages', 'HBV_PUMPKIN_SPICE_LATTE', 'ING_NUTMEG', 'seasoning', false, 4),
('hotbeverages', 'HBV_PUMPKIN_SPICE_LATTE', 'ING_CLOVE', 'seasoning', false, 5),
('hotbeverages', 'HBV_PUMPKIN_SPICE_LATTE', 'ING_WHIPPED_CREAM', 'garnish', true, 6);

-- HBV_GINGERBREAD_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_GINGERBREAD_LATTE', 'ING_GINGER', 'main', false, 1),
('hotbeverages', 'HBV_GINGERBREAD_LATTE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_GINGERBREAD_LATTE', 'ING_CINNAMON', 'secondary', false, 3),
('hotbeverages', 'HBV_GINGERBREAD_LATTE', 'ING_MOLASSES', 'secondary', false, 4),
('hotbeverages', 'HBV_GINGERBREAD_LATTE', 'ING_WHIPPED_CREAM', 'garnish', true, 5);

-- HBV_CINNAMON_DOLCE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_CINNAMON_DOLCE', 'ING_CINNAMON', 'main', false, 1),
('hotbeverages', 'HBV_CINNAMON_DOLCE', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_CINNAMON_DOLCE', 'ING_BROWN_SUGAR', 'secondary', false, 3),
('hotbeverages', 'HBV_CINNAMON_DOLCE', 'ING_VANILLA', 'seasoning', true, 4);

-- HBV_MAPLE_CINNAMON
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_MAPLE_CINNAMON', 'ING_MAPLE_SYRUP', 'main', false, 1),
('hotbeverages', 'HBV_MAPLE_CINNAMON', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_MAPLE_CINNAMON', 'ING_CINNAMON', 'main', false, 3);

-- HBV_BROWN_SUGAR_OAT
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_BROWN_SUGAR_OAT', 'ING_BROWN_SUGAR_SYRUP', 'main', false, 1),
('hotbeverages', 'HBV_BROWN_SUGAR_OAT', 'ING_OAT_MILK', 'main', false, 2),
('hotbeverages', 'HBV_BROWN_SUGAR_OAT', 'ING_CINNAMON', 'garnish', true, 3);

-- ============================================
-- SPECIALTY & WELLNESS (6 items)
-- ============================================

-- HBV_MUSHROOM_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_MUSHROOM_LATTE', 'ING_REISHI', 'main', false, 1),
('hotbeverages', 'HBV_MUSHROOM_LATTE', 'ING_OAT_MILK', 'main', false, 2),
('hotbeverages', 'HBV_MUSHROOM_LATTE', 'ING_CACAO', 'secondary', true, 3),
('hotbeverages', 'HBV_MUSHROOM_LATTE', 'ING_MAPLE_SYRUP', 'seasoning', true, 4);

-- HBV_MOON_MILK
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_MOON_MILK', 'ING_ASHWAGANDHA', 'main', false, 1),
('hotbeverages', 'HBV_MOON_MILK', 'ING_STEAMED_MILK', 'main', false, 2),
('hotbeverages', 'HBV_MOON_MILK', 'ING_LAVENDER', 'secondary', false, 3),
('hotbeverages', 'HBV_MOON_MILK', 'ING_HONEY', 'seasoning', true, 4);

-- HBV_BEETROOT_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_BEETROOT_LATTE', 'ING_BEET', 'main', false, 1),
('hotbeverages', 'HBV_BEETROOT_LATTE', 'ING_OAT_MILK', 'main', false, 2),
('hotbeverages', 'HBV_BEETROOT_LATTE', 'ING_VANILLA', 'seasoning', true, 3);

-- HBV_BLUE_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_BLUE_LATTE', 'ING_SPIRULINA', 'main', false, 1),
('hotbeverages', 'HBV_BLUE_LATTE', 'ING_COCONUT_MILK', 'main', false, 2),
('hotbeverages', 'HBV_BLUE_LATTE', 'ING_VANILLA', 'seasoning', false, 3),
('hotbeverages', 'HBV_BLUE_LATTE', 'ING_HONEY', 'seasoning', true, 4);

-- HBV_SPANISH_LATTE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_SPANISH_LATTE', 'ING_CONDENSED_MILK', 'main', false, 1),
('hotbeverages', 'HBV_SPANISH_LATTE', 'ING_STEAMED_MILK', 'main', false, 2);

-- HBV_TURKISH_SALEP
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order) VALUES
('hotbeverages', 'HBV_TURKISH_SALEP', 'ING_STEAMED_MILK', 'main', false, 1),
('hotbeverages', 'HBV_TURKISH_SALEP', 'ING_CINNAMON', 'garnish', false, 2);
