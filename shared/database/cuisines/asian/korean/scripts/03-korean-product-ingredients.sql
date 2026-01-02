-- ============================================
-- KOREAN DATABASE - Product Ingredients Links
-- ============================================
-- Links Korean dishes to ingredients in product_ingredients table
--
-- RUN AFTER: 00-korean-schema.sql, 01-korean-missing-ingredients.sql, 02-korean-data.sql
-- ============================================

-- BBQ (8 dishes)
-- KOREAN_SAMGYEOPSAL (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_LETTUCE', 'main', false, 1),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_SSAMJANG', 'main', false, 1),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_PERILLA_LEAVES', 'secondary', false, 2),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_GOCHUJANG', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BULGOGI (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BULGOGI', 'korean', 'ING_BEEF_SIRLOIN', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_PEAR', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2),
('KOREAN_BULGOGI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GALBI (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GALBI', 'korean', 'ING_BEEF_SHORT_RIBS', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_PEAR', 'secondary', false, 2),
('KOREAN_GALBI', 'korean', 'ING_RICE_WINE', 'secondary', false, 2),
('KOREAN_GALBI', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DWAEJI_GALBI (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_PORK_RIBS', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_GINGER', 'secondary', false, 2),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_RICE_WINE', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DAKGALBI (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DAKGALBI', 'korean', 'ING_CHICKEN_THIGH', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_CABBAGE', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_SWEET_POTATO', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_RICE_CAKES', 'secondary', false, 2),
('KOREAN_DAKGALBI', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_DAKGALBI', 'korean', 'ING_PERILLA_LEAVES', 'garnish', true, 3),
('KOREAN_DAKGALBI', 'korean', 'ING_CHEESE', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_CHADOLBAEGI (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_CHADOLBAEGI', 'korean', 'ING_BEEF_BRISKET', 'main', false, 1),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_LETTUCE', 'secondary', false, 2),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_GARLIC', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GOPCHANG (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GOPCHANG', 'korean', 'ING_BEEF_INTESTINES', 'main', false, 1),
('KOREAN_GOPCHANG', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_GOPCHANG', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_GOPCHANG', 'korean', 'ING_GARLIC', 'secondary', false, 2),
('KOREAN_GOPCHANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_GOPCHANG', 'korean', 'ING_GOCHUJANG', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_MAKCHANG (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_MAKCHANG', 'korean', 'ING_PORK_INTESTINES', 'main', false, 1),
('KOREAN_MAKCHANG', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_MAKCHANG', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_MAKCHANG', 'korean', 'ING_GARLIC', 'secondary', false, 2),
('KOREAN_MAKCHANG', 'korean', 'ING_SSAMJANG', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- RICE DISHES (8 dishes)
-- KOREAN_BIBIMBAP (11 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BIBIMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_BEEF_SIRLOIN', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_MUSHROOMS', 'secondary', false, 2),
('KOREAN_BIBIMBAP', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DOLSOT_BIBIMBAP (10 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_BEEF_SIRLOIN', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_MUSHROOMS', 'secondary', false, 2),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KIMCHI_BOKKEUMBAP (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_GOCHUGARU', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GIMBAP (10 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GIMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_NORI', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_PICKLED_RADISH', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_CUCUMBER', 'secondary', false, 2),
('KOREAN_GIMBAP', 'korean', 'ING_HAM', 'secondary', false, 2),
('KOREAN_GIMBAP', 'korean', 'ING_CRAB_STICK', 'secondary', false, 2),
('KOREAN_GIMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_CHAMCHI_GIMBAP (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_NORI', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_CANNED_TUNA', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_MAYONNAISE', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_PICKLED_RADISH', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_CARROT', 'secondary', false, 2),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_CUCUMBER', 'secondary', false, 2),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BOKKEUMBAP (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BOKKEUMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_GREEN_PEAS', 'secondary', false, 2),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_OMURICE (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_OMURICE', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_CHICKEN_BREAST', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_CARROT', 'secondary', false, 2),
('KOREAN_OMURICE', 'korean', 'ING_KETCHUP', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_BUTTER', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_GREEN_PEAS', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_NURUNGJI (2 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_NURUNGJI', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_NURUNGJI', 'korean', 'ING_WATER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- STEWS & SOUPS (10 dishes)
-- KOREAN_KIMCHI_JJIGAE (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_TOFU', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DOENJANG_JJIGAE (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_DOENJANG', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_TOFU', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_GOCHUGARU', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SUNDUBU_JJIGAE (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_SOFT_TOFU', 'main', false, 1),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_PORK_BELLY', 'secondary', false, 2),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_CLAMS', 'secondary', false, 2),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BUDAE_JJIGAE (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_SPAM', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_HOT_DOGS', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_BAKED_BEANS', 'secondary', false, 2),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_INSTANT_NOODLES', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_RICE_CAKES', 'secondary', false, 2),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_TOFU', 'secondary', false, 2),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_CHEESE', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GAMJATANG (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GAMJATANG', 'korean', 'ING_PORK_BONES', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_PERILLA_LEAVES', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_PERILLA_SEEDS', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_NAPA_CABBAGE', 'secondary', false, 2),
('KOREAN_GAMJATANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_GAMJATANG', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_DOENJANG', 'secondary', false, 2),
('KOREAN_GAMJATANG', 'korean', 'ING_GARLIC', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SAMGYETANG (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SAMGYETANG', 'korean', 'ING_WHOLE_CHICKEN', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_GLUTINOUS_RICE', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_GINSENG', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_JUJUBE', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_GINGER', 'secondary', false, 2),
('KOREAN_SAMGYETANG', 'korean', 'ING_CHESTNUTS', 'secondary', false, 2),
('KOREAN_SAMGYETANG', 'korean', 'ING_GINKGO_NUTS', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GALBITANG (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GALBITANG', 'korean', 'ING_BEEF_SHORT_RIBS', 'main', false, 1),
('KOREAN_GALBITANG', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_GALBITANG', 'korean', 'ING_GLASS_NOODLES', 'secondary', false, 2),
('KOREAN_GALBITANG', 'korean', 'ING_EGG', 'garnish', true, 3),
('KOREAN_GALBITANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_GALBITANG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_GALBITANG', 'korean', 'ING_SOY_SAUCE', 'secondary', false, 2),
('KOREAN_GALBITANG', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SEOLLEONGTANG (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_OX_BONES', 'main', false, 1),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_BEEF_BRISKET', 'main', false, 1),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_SALT', 'secondary', false, 2),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_YUKGAEJANG (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_YUKGAEJANG', 'korean', 'ING_BEEF_BRISKET', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_GOSARI', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_EGG', 'garnish', true, 3),
('KOREAN_YUKGAEJANG', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_SESAME_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DAKTORITANG (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DAKTORITANG', 'korean', 'ING_CHICKEN_PIECES', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- NOODLES (8 dishes)
-- KOREAN_JAPCHAE (10 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_JAPCHAE', 'korean', 'ING_GLASS_NOODLES', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_BEEF_SIRLOIN', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_MUSHROOMS', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_GARLIC', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_NAENGMYEON (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_NAENGMYEON', 'korean', 'ING_BUCKWHEAT_NOODLES', 'main', false, 1),
('KOREAN_NAENGMYEON', 'korean', 'ING_BEEF_BROTH', 'main', false, 1),
('KOREAN_NAENGMYEON', 'korean', 'ING_BEEF_BRISKET', 'main', false, 1),
('KOREAN_NAENGMYEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_NAENGMYEON', 'korean', 'ING_CUCUMBER', 'secondary', false, 2),
('KOREAN_NAENGMYEON', 'korean', 'ING_PICKLED_RADISH', 'secondary', false, 2),
('KOREAN_NAENGMYEON', 'korean', 'ING_ASIAN_PEAR', 'secondary', false, 2),
('KOREAN_NAENGMYEON', 'korean', 'ING_MUSTARD', 'secondary', false, 2),
('KOREAN_NAENGMYEON', 'korean', 'ING_VINEGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BIBIM_NAENGMYEON (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_BUCKWHEAT_NOODLES', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_BEEF_BRISKET', 'secondary', false, 2),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_CUCUMBER', 'secondary', false, 2),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_VINEGAR', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_SUGAR', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KALGUKSU (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KALGUKSU', 'korean', 'ING_WHEAT_NOODLES', 'main', false, 1),
('KOREAN_KALGUKSU', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1),
('KOREAN_KALGUKSU', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_KALGUKSU', 'korean', 'ING_POTATO', 'secondary', false, 2),
('KOREAN_KALGUKSU', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_KALGUKSU', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KALGUKSU', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_JAJANGMYEON (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_JAJANGMYEON', 'korean', 'ING_WHEAT_NOODLES', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_CHUNJANG', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_POTATO', 'secondary', false, 2),
('KOREAN_JAJANGMYEON', 'korean', 'ING_CUCUMBER', 'garnish', true, 3),
('KOREAN_JAJANGMYEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_JJAMPPONG (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_JJAMPPONG', 'korean', 'ING_WHEAT_NOODLES', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_SHRIMP', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_SQUID', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_MUSSELS', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_PORK_BELLY', 'secondary', false, 2),
('KOREAN_JJAMPPONG', 'korean', 'ING_NAPA_CABBAGE', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_GARLIC', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_RAMYEON (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_RAMYEON', 'korean', 'ING_INSTANT_NOODLES', 'main', false, 1),
('KOREAN_RAMYEON', 'korean', 'ING_EGG', 'secondary', false, 2),
('KOREAN_RAMYEON', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_RAMYEON', 'korean', 'ING_CHEESE', 'secondary', false, 2),
('KOREAN_RAMYEON', 'korean', 'ING_KIMCHI', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KONGGUKSU (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KONGGUKSU', 'korean', 'ING_WHEAT_NOODLES', 'main', false, 1),
('KOREAN_KONGGUKSU', 'korean', 'ING_SOY_MILK', 'main', false, 1),
('KOREAN_KONGGUKSU', 'korean', 'ING_CUCUMBER', 'garnish', true, 3),
('KOREAN_KONGGUKSU', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3),
('KOREAN_KONGGUKSU', 'korean', 'ING_SALT', 'secondary', false, 2),
('KOREAN_KONGGUKSU', 'korean', 'ING_ICE', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- PANCAKES (7 dishes)
-- KOREAN_PAJEON (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_PAJEON', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_SQUID', 'secondary', false, 2),
('KOREAN_PAJEON', 'korean', 'ING_SHRIMP', 'secondary', false, 2),
('KOREAN_PAJEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_SOY_SAUCE', 'secondary', false, 2),
('KOREAN_PAJEON', 'korean', 'ING_VINEGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HAEMUL_PAJEON (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_SQUID', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_SHRIMP', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_MUSSELS', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_OYSTERS', 'secondary', false, 2),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KIMCHI_JEON (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KIMCHI_JEON', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_PORK_BELLY', 'secondary', false, 2),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BINDAETTEOK (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BINDAETTEOK', 'korean', 'ING_MUNG_BEANS', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_BINDAETTEOK', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HOBAK_JEON (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HOBAK_JEON', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_HOBAK_JEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_HOBAK_JEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_HOBAK_JEON', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_HOBAK_JEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DONGTAE_JEON (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DONGTAE_JEON', 'korean', 'ING_POLLOCK', 'main', false, 1),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GAMJA_JEON (4 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GAMJA_JEON', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_GAMJA_JEON', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_GAMJA_JEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1),
('KOREAN_GAMJA_JEON', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- Continue with remaining dishes in separate inserts...
-- FRIED CHICKEN (8 dishes), STREET FOOD (10 dishes), BANCHAN (10 dishes), DESSERTS (8 dishes)

-- FRIED CHICKEN
-- KOREAN_YANGNYEOM_CHICKEN (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HURAIDEU_CHICKEN (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_GARLIC_POWDER', 'secondary', false, 2),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GARLIC_CHICKEN (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_RICE_WINE', 'secondary', false, 2),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HONEY_BUTTER_CHICKEN (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_BUTTER', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SNOW_CHEESE_CHICKEN (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_CHEESE_POWDER', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_SUGAR', 'secondary', false, 2),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BHC_CHICKEN (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BHC_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_ONION_POWDER', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_GARLIC_POWDER', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_CHEESE_POWDER', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_PADAK (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_PADAK', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_PADAK', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_PADAK', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_PADAK', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_PADAK', 'korean', 'ING_SOY_SAUCE', 'secondary', false, 2),
('KOREAN_PADAK', 'korean', 'ING_VINEGAR', 'secondary', false, 2),
('KOREAN_PADAK', 'korean', 'ING_SUGAR', 'secondary', false, 2),
('KOREAN_PADAK', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DAKGANGJEONG (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DAKGANGJEONG', 'korean', 'ING_CHICKEN_THIGH', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_RICE_SYRUP', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_GINGER', 'secondary', false, 2),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- STREET FOOD
-- KOREAN_TTEOKBOKKI (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_TTEOKBOKKI', 'korean', 'ING_RICE_CAKES', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_FISH_CAKES', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_RABOKKI (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_RABOKKI', 'korean', 'ING_RICE_CAKES', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_INSTANT_NOODLES', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_FISH_CAKES', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_RABOKKI', 'korean', 'ING_EGG', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_ODENG (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_ODENG', 'korean', 'ING_FISH_CAKES', 'main', false, 1),
('KOREAN_ODENG', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_ODENG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_ODENG', 'korean', 'ING_DRIED_KELP', 'main', false, 1),
('KOREAN_ODENG', 'korean', 'ING_SOY_SAUCE', 'secondary', false, 2),
('KOREAN_ODENG', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HOTTEOK (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HOTTEOK', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_HOTTEOK', 'korean', 'ING_YEAST', 'main', false, 1),
('KOREAN_HOTTEOK', 'korean', 'ING_BROWN_SUGAR', 'main', false, 1),
('KOREAN_HOTTEOK', 'korean', 'ING_CINNAMON', 'main', false, 1),
('KOREAN_HOTTEOK', 'korean', 'ING_PEANUTS', 'secondary', false, 2),
('KOREAN_HOTTEOK', 'korean', 'ING_SUNFLOWER_SEEDS', 'secondary', false, 2),
('KOREAN_HOTTEOK', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BUNGEOPPANG (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BUNGEOPPANG', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_BUNGEOPPANG', 'korean', 'ING_RED_BEAN_PASTE', 'main', false, 1),
('KOREAN_BUNGEOPPANG', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_BUNGEOPPANG', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_BUNGEOPPANG', 'korean', 'ING_BAKING_POWDER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_TWIGIM (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_TWIGIM', 'korean', 'ING_SWEET_POTATO', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_SQUID', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_SHRIMP', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_PERILLA_LEAVES', 'secondary', false, 2),
('KOREAN_TWIGIM', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SUNDAE (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SUNDAE', 'korean', 'ING_PIG_INTESTINE', 'main', false, 1),
('KOREAN_SUNDAE', 'korean', 'ING_PIG_BLOOD', 'main', false, 1),
('KOREAN_SUNDAE', 'korean', 'ING_GLASS_NOODLES', 'main', false, 1),
('KOREAN_SUNDAE', 'korean', 'ING_BARLEY', 'secondary', false, 2),
('KOREAN_SUNDAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_SUNDAE', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SUNDAE', 'korean', 'ING_SALT', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GYERANPPANG (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GYERANPPANG', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_MILK', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_BAKING_POWDER', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_BUTTER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DAKKOCHI (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DAKKOCHI', 'korean', 'ING_CHICKEN_THIGH', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_GOCHUJANG', 'secondary', false, 2),
('KOREAN_DAKKOCHI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_TORNADO_POTATO (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_TORNADO_POTATO', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_TORNADO_POTATO', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1),
('KOREAN_TORNADO_POTATO', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_TORNADO_POTATO', 'korean', 'ING_CHEESE_POWDER', 'secondary', false, 2),
('KOREAN_TORNADO_POTATO', 'korean', 'ING_ONION_POWDER', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- BANCHAN & FERMENTED
-- KOREAN_BAECHU_KIMCHI (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_NAPA_CABBAGE', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_FISH_SAUCE', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_GINGER', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_DAIKON', 'secondary', false, 2),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_SALTED_SHRIMP', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_SUGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KKAKDUGI (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KKAKDUGI', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_FISH_SAUCE', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KKAKDUGI', 'korean', 'ING_SALTED_SHRIMP', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_SUGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_NABAK_KIMCHI (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_NAPA_CABBAGE', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_GINGER', 'secondary', false, 2),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_GOCHUGARU', 'secondary', false, 2),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_SUGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KONGNAMUL (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KONGNAMUL', 'korean', 'ING_SOY_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_KONGNAMUL', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_KONGNAMUL', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_KONGNAMUL', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KONGNAMUL', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3),
('KOREAN_KONGNAMUL', 'korean', 'ING_SALT', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SIGEUMCHI_NAMUL (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_MUSAENGCHAE (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_MUSAENGCHAE', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_VINEGAR', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_FISH_SAUCE', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GYERANJJIM (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GYERANJJIM', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_GYERANJJIM', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1),
('KOREAN_GYERANJJIM', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_GYERANJJIM', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_GYERANJJIM', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_JAPCHAE_BANCHAN (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_GLASS_NOODLES', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_BEEF_SIRLOIN', 'secondary', false, 2),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_SUGAR', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_MYEOLCHI_BOKKEUM (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_DRIED_ANCHOVIES', 'main', false, 1),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_RICE_SYRUP', 'main', false, 1),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GAMJA_JORIM (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GAMJA_JORIM', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_RICE_SYRUP', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- DESSERTS
-- KOREAN_PATBINGSU (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_PATBINGSU', 'korean', 'ING_SHAVED_ICE', 'main', false, 1),
('KOREAN_PATBINGSU', 'korean', 'ING_RED_BEAN_PASTE', 'main', false, 1),
('KOREAN_PATBINGSU', 'korean', 'ING_CONDENSED_MILK', 'main', false, 1),
('KOREAN_PATBINGSU', 'korean', 'ING_MOCHI', 'secondary', false, 2),
('KOREAN_PATBINGSU', 'korean', 'ING_STRAWBERRY', 'garnish', true, 3),
('KOREAN_PATBINGSU', 'korean', 'ING_KIWI', 'garnish', true, 3),
('KOREAN_PATBINGSU', 'korean', 'ING_RICE_CAKE_PEARLS', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_INJEOLMI_BINGSU (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_SHAVED_ICE', 'main', false, 1),
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_ROASTED_SOYBEAN_POWDER', 'main', false, 1),
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_MOCHI', 'main', false, 1),
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_CONDENSED_MILK', 'main', false, 1),
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_RICE_CAKE_PEARLS', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SONGPYEON (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SONGPYEON', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_SONGPYEON', 'korean', 'ING_SESAME_SEEDS', 'main', false, 1),
('KOREAN_SONGPYEON', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_SONGPYEON', 'korean', 'ING_MUNG_BEANS', 'secondary', false, 2),
('KOREAN_SONGPYEON', 'korean', 'ING_PINE_NEEDLES', 'main', false, 1),
('KOREAN_SONGPYEON', 'korean', 'ING_SUGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_YAKGWA (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_YAKGWA', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_YAKGWA', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_YAKGWA', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_YAKGWA', 'korean', 'ING_GINGER', 'main', false, 1),
('KOREAN_YAKGWA', 'korean', 'ING_CINNAMON', 'secondary', false, 2),
('KOREAN_YAKGWA', 'korean', 'ING_PINE_NUTS', 'garnish', true, 3),
('KOREAN_YAKGWA', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DASIK (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DASIK', 'korean', 'ING_PINE_POLLEN', 'main', false, 1),
('KOREAN_DASIK', 'korean', 'ING_SESAME_SEEDS', 'secondary', false, 2),
('KOREAN_DASIK', 'korean', 'ING_MUNG_BEANS', 'secondary', false, 2),
('KOREAN_DASIK', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_DASIK', 'korean', 'ING_RICE_FLOUR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SUJEONGGWA (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SUJEONGGWA', 'korean', 'ING_CINNAMON', 'main', false, 1),
('KOREAN_SUJEONGGWA', 'korean', 'ING_GINGER', 'main', false, 1),
('KOREAN_SUJEONGGWA', 'korean', 'ING_BROWN_SUGAR', 'main', false, 1),
('KOREAN_SUJEONGGWA', 'korean', 'ING_DRIED_PERSIMMON', 'main', false, 1),
('KOREAN_SUJEONGGWA', 'korean', 'ING_PINE_NUTS', 'garnish', true, 3),
('KOREAN_SUJEONGGWA', 'korean', 'ING_WATER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SIKHYE (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SIKHYE', 'korean', 'ING_MALT_POWDER', 'main', false, 1),
('KOREAN_SIKHYE', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_SIKHYE', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_SIKHYE', 'korean', 'ING_PINE_NUTS', 'garnish', true, 3),
('KOREAN_SIKHYE', 'korean', 'ING_WATER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HWAJEON (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HWAJEON', 'korean', 'ING_GLUTINOUS_RICE_FLOUR', 'main', false, 1),
('KOREAN_HWAJEON', 'korean', 'ING_EDIBLE_FLOWERS', 'main', false, 1),
('KOREAN_HWAJEON', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_HWAJEON', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_HWAJEON', 'korean', 'ING_SALT', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- ============================================
-- Summary: ~550 product_ingredients links created for 77 Korean dishes
-- Average: ~7 ingredients per dish
-- ============================================
