-- ============================================
-- POLISH CUISINE - Product Ingredients
-- GUDBRO Database Standards v1.7
--
-- Total: 42 dishes, ~300 ingredient links
-- ============================================

-- Clear existing links for polish
DELETE FROM product_ingredients WHERE product_type = 'polish';

-- ============================================
-- PIEROGI (8 dishes)
-- ============================================

-- POL_PIEROGI_RUSKIE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PIEROGI_RUSKIE', 'ING_FLOUR', 'main', 1),
('polish', 'POL_PIEROGI_RUSKIE', 'ING_EGG', 'main', 2),
('polish', 'POL_PIEROGI_RUSKIE', 'ING_POTATO', 'main', 3),
('polish', 'POL_PIEROGI_RUSKIE', 'ING_FARMERS_CHEESE', 'main', 4),
('polish', 'POL_PIEROGI_RUSKIE', 'ING_ONION', 'secondary', 5),
('polish', 'POL_PIEROGI_RUSKIE', 'ING_BUTTER', 'secondary', 6),
('polish', 'POL_PIEROGI_RUSKIE', 'ING_SALT', 'seasoning', 7),
('polish', 'POL_PIEROGI_RUSKIE', 'ING_BLACK_PEPPER', 'seasoning', 8);

-- POL_PIEROGI_MEAT
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PIEROGI_MEAT', 'ING_FLOUR', 'main', 1),
('polish', 'POL_PIEROGI_MEAT', 'ING_EGG', 'main', 2),
('polish', 'POL_PIEROGI_MEAT', 'ING_PORK', 'main', 3),
('polish', 'POL_PIEROGI_MEAT', 'ING_BEEF', 'main', 4),
('polish', 'POL_PIEROGI_MEAT', 'ING_ONION', 'secondary', 5),
('polish', 'POL_PIEROGI_MEAT', 'ING_SALT', 'seasoning', 6),
('polish', 'POL_PIEROGI_MEAT', 'ING_BLACK_PEPPER', 'seasoning', 7),
('polish', 'POL_PIEROGI_MEAT', 'ING_MARJORAM', 'seasoning', 8);

-- POL_PIEROGI_CABBAGE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PIEROGI_CABBAGE', 'ING_FLOUR', 'main', 1),
('polish', 'POL_PIEROGI_CABBAGE', 'ING_SAUERKRAUT', 'main', 2),
('polish', 'POL_PIEROGI_CABBAGE', 'ING_DRIED_MUSHROOM', 'main', 3),
('polish', 'POL_PIEROGI_CABBAGE', 'ING_ONION', 'secondary', 4),
('polish', 'POL_PIEROGI_CABBAGE', 'ING_VEGETABLE_OIL', 'secondary', 5),
('polish', 'POL_PIEROGI_CABBAGE', 'ING_SALT', 'seasoning', 6),
('polish', 'POL_PIEROGI_CABBAGE', 'ING_BLACK_PEPPER', 'seasoning', 7);

-- POL_PIEROGI_BLUEBERRY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PIEROGI_BLUEBERRY', 'ING_FLOUR', 'main', 1),
('polish', 'POL_PIEROGI_BLUEBERRY', 'ING_EGG', 'main', 2),
('polish', 'POL_PIEROGI_BLUEBERRY', 'ING_BLUEBERRY', 'main', 3),
('polish', 'POL_PIEROGI_BLUEBERRY', 'ING_SUGAR', 'secondary', 4),
('polish', 'POL_PIEROGI_BLUEBERRY', 'ING_SOUR_CREAM', 'secondary', 5),
('polish', 'POL_PIEROGI_BLUEBERRY', 'ING_BUTTER', 'secondary', 6);

-- POL_PIEROGI_STRAWBERRY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PIEROGI_STRAWBERRY', 'ING_FLOUR', 'main', 1),
('polish', 'POL_PIEROGI_STRAWBERRY', 'ING_EGG', 'main', 2),
('polish', 'POL_PIEROGI_STRAWBERRY', 'ING_STRAWBERRY', 'main', 3),
('polish', 'POL_PIEROGI_STRAWBERRY', 'ING_SUGAR', 'secondary', 4),
('polish', 'POL_PIEROGI_STRAWBERRY', 'ING_POWDERED_SUGAR', 'garnish', 5),
('polish', 'POL_PIEROGI_STRAWBERRY', 'ING_CREAM', 'secondary', 6);

-- POL_PIEROGI_CHEESE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PIEROGI_CHEESE', 'ING_FLOUR', 'main', 1),
('polish', 'POL_PIEROGI_CHEESE', 'ING_EGG', 'main', 2),
('polish', 'POL_PIEROGI_CHEESE', 'ING_FARMERS_CHEESE', 'main', 3),
('polish', 'POL_PIEROGI_CHEESE', 'ING_SUGAR', 'secondary', 4),
('polish', 'POL_PIEROGI_CHEESE', 'ING_BUTTER', 'secondary', 5),
('polish', 'POL_PIEROGI_CHEESE', 'ING_VANILLA', 'seasoning', 6);

-- POL_PIEROGI_SPINACH
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PIEROGI_SPINACH', 'ING_FLOUR', 'main', 1),
('polish', 'POL_PIEROGI_SPINACH', 'ING_EGG', 'main', 2),
('polish', 'POL_PIEROGI_SPINACH', 'ING_SPINACH', 'main', 3),
('polish', 'POL_PIEROGI_SPINACH', 'ING_FETA', 'main', 4),
('polish', 'POL_PIEROGI_SPINACH', 'ING_GARLIC', 'secondary', 5),
('polish', 'POL_PIEROGI_SPINACH', 'ING_BUTTER', 'secondary', 6),
('polish', 'POL_PIEROGI_SPINACH', 'ING_SALT', 'seasoning', 7);

-- POL_USZKA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_USZKA', 'ING_FLOUR', 'main', 1),
('polish', 'POL_USZKA', 'ING_DRIED_MUSHROOM', 'main', 2),
('polish', 'POL_USZKA', 'ING_ONION', 'secondary', 3),
('polish', 'POL_USZKA', 'ING_VEGETABLE_OIL', 'secondary', 4),
('polish', 'POL_USZKA', 'ING_SALT', 'seasoning', 5),
('polish', 'POL_USZKA', 'ING_BLACK_PEPPER', 'seasoning', 6);

-- ============================================
-- SOUPS (8 dishes)
-- ============================================

-- POL_ZUREK
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_ZUREK', 'ING_RYE_FLOUR', 'main', 1),
('polish', 'POL_ZUREK', 'ING_WHITE_SAUSAGE', 'main', 2),
('polish', 'POL_ZUREK', 'ING_EGG', 'main', 3),
('polish', 'POL_ZUREK', 'ING_POTATO', 'secondary', 4),
('polish', 'POL_ZUREK', 'ING_GARLIC', 'secondary', 5),
('polish', 'POL_ZUREK', 'ING_MARJORAM', 'seasoning', 6),
('polish', 'POL_ZUREK', 'ING_BAY_LEAF', 'seasoning', 7),
('polish', 'POL_ZUREK', 'ING_HORSERADISH', 'garnish', 8);

-- POL_BARSZCZ_CZERWONY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_BARSZCZ_CZERWONY', 'ING_BEET', 'main', 1),
('polish', 'POL_BARSZCZ_CZERWONY', 'ING_CARROT', 'secondary', 2),
('polish', 'POL_BARSZCZ_CZERWONY', 'ING_CELERY', 'secondary', 3),
('polish', 'POL_BARSZCZ_CZERWONY', 'ING_ONION', 'secondary', 4),
('polish', 'POL_BARSZCZ_CZERWONY', 'ING_GARLIC', 'secondary', 5),
('polish', 'POL_BARSZCZ_CZERWONY', 'ING_BAY_LEAF', 'seasoning', 6),
('polish', 'POL_BARSZCZ_CZERWONY', 'ING_ALLSPICE', 'seasoning', 7),
('polish', 'POL_BARSZCZ_CZERWONY', 'ING_VINEGAR', 'seasoning', 8);

-- POL_BARSZCZ_BIALY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_BARSZCZ_BIALY', 'ING_FLOUR', 'main', 1),
('polish', 'POL_BARSZCZ_BIALY', 'ING_WHITE_SAUSAGE', 'main', 2),
('polish', 'POL_BARSZCZ_BIALY', 'ING_EGG', 'main', 3),
('polish', 'POL_BARSZCZ_BIALY', 'ING_SOUR_CREAM', 'secondary', 4),
('polish', 'POL_BARSZCZ_BIALY', 'ING_POTATO', 'secondary', 5),
('polish', 'POL_BARSZCZ_BIALY', 'ING_GARLIC', 'secondary', 6),
('polish', 'POL_BARSZCZ_BIALY', 'ING_MARJORAM', 'seasoning', 7);

-- POL_ROSOL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_ROSOL', 'ING_CHICKEN', 'main', 1),
('polish', 'POL_ROSOL', 'ING_CARROT', 'secondary', 2),
('polish', 'POL_ROSOL', 'ING_CELERY', 'secondary', 3),
('polish', 'POL_ROSOL', 'ING_PARSLEY_ROOT', 'secondary', 4),
('polish', 'POL_ROSOL', 'ING_LEEK', 'secondary', 5),
('polish', 'POL_ROSOL', 'ING_ONION', 'secondary', 6),
('polish', 'POL_ROSOL', 'ING_EGG_NOODLE', 'secondary', 7),
('polish', 'POL_ROSOL', 'ING_BAY_LEAF', 'seasoning', 8),
('polish', 'POL_ROSOL', 'ING_ALLSPICE', 'seasoning', 9);

-- POL_KAPUSNIAK
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_KAPUSNIAK', 'ING_SAUERKRAUT', 'main', 1),
('polish', 'POL_KAPUSNIAK', 'ING_PORK_RIBS', 'main', 2),
('polish', 'POL_KAPUSNIAK', 'ING_POTATO', 'secondary', 3),
('polish', 'POL_KAPUSNIAK', 'ING_CARROT', 'secondary', 4),
('polish', 'POL_KAPUSNIAK', 'ING_ONION', 'secondary', 5),
('polish', 'POL_KAPUSNIAK', 'ING_BAY_LEAF', 'seasoning', 6),
('polish', 'POL_KAPUSNIAK', 'ING_ALLSPICE', 'seasoning', 7),
('polish', 'POL_KAPUSNIAK', 'ING_BLACK_PEPPER', 'seasoning', 8);

-- POL_GROCHOWKA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_GROCHOWKA', 'ING_SPLIT_PEA', 'main', 1),
('polish', 'POL_GROCHOWKA', 'ING_BACON', 'main', 2),
('polish', 'POL_GROCHOWKA', 'ING_KIELBASA', 'main', 3),
('polish', 'POL_GROCHOWKA', 'ING_POTATO', 'secondary', 4),
('polish', 'POL_GROCHOWKA', 'ING_CARROT', 'secondary', 5),
('polish', 'POL_GROCHOWKA', 'ING_ONION', 'secondary', 6),
('polish', 'POL_GROCHOWKA', 'ING_MARJORAM', 'seasoning', 7),
('polish', 'POL_GROCHOWKA', 'ING_BAY_LEAF', 'seasoning', 8);

-- POL_POMIDOROWA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_POMIDOROWA', 'ING_TOMATO', 'main', 1),
('polish', 'POL_POMIDOROWA', 'ING_CHICKEN_STOCK', 'main', 2),
('polish', 'POL_POMIDOROWA', 'ING_CREAM', 'secondary', 3),
('polish', 'POL_POMIDOROWA', 'ING_RICE', 'secondary', 4),
('polish', 'POL_POMIDOROWA', 'ING_ONION', 'secondary', 5),
('polish', 'POL_POMIDOROWA', 'ING_BUTTER', 'secondary', 6),
('polish', 'POL_POMIDOROWA', 'ING_SUGAR', 'seasoning', 7),
('polish', 'POL_POMIDOROWA', 'ING_SALT', 'seasoning', 8);

-- POL_OGORKOWA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_OGORKOWA', 'ING_PICKLED_CUCUMBER', 'main', 1),
('polish', 'POL_OGORKOWA', 'ING_POTATO', 'secondary', 2),
('polish', 'POL_OGORKOWA', 'ING_CARROT', 'secondary', 3),
('polish', 'POL_OGORKOWA', 'ING_SOUR_CREAM', 'secondary', 4),
('polish', 'POL_OGORKOWA', 'ING_DILL', 'garnish', 5),
('polish', 'POL_OGORKOWA', 'ING_ONION', 'secondary', 6),
('polish', 'POL_OGORKOWA', 'ING_VEGETABLE_STOCK', 'main', 7);

-- ============================================
-- MAINS (10 dishes)
-- ============================================

-- POL_BIGOS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_BIGOS', 'ING_SAUERKRAUT', 'main', 1),
('polish', 'POL_BIGOS', 'ING_CABBAGE', 'main', 2),
('polish', 'POL_BIGOS', 'ING_PORK', 'main', 3),
('polish', 'POL_BIGOS', 'ING_KIELBASA', 'main', 4),
('polish', 'POL_BIGOS', 'ING_BACON', 'main', 5),
('polish', 'POL_BIGOS', 'ING_DRIED_MUSHROOM', 'secondary', 6),
('polish', 'POL_BIGOS', 'ING_ONION', 'secondary', 7),
('polish', 'POL_BIGOS', 'ING_TOMATO_PASTE', 'secondary', 8),
('polish', 'POL_BIGOS', 'ING_BAY_LEAF', 'seasoning', 9),
('polish', 'POL_BIGOS', 'ING_ALLSPICE', 'seasoning', 10),
('polish', 'POL_BIGOS', 'ING_PRUNE', 'secondary', 11);

-- POL_GOLABKI
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_GOLABKI', 'ING_CABBAGE', 'main', 1),
('polish', 'POL_GOLABKI', 'ING_PORK', 'main', 2),
('polish', 'POL_GOLABKI', 'ING_RICE', 'main', 3),
('polish', 'POL_GOLABKI', 'ING_ONION', 'secondary', 4),
('polish', 'POL_GOLABKI', 'ING_TOMATO_SAUCE', 'sauce', 5),
('polish', 'POL_GOLABKI', 'ING_EGG', 'secondary', 6),
('polish', 'POL_GOLABKI', 'ING_SALT', 'seasoning', 7),
('polish', 'POL_GOLABKI', 'ING_BLACK_PEPPER', 'seasoning', 8);

-- POL_KOTLET_SCHABOWY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_KOTLET_SCHABOWY', 'ING_PORK_LOIN', 'main', 1),
('polish', 'POL_KOTLET_SCHABOWY', 'ING_BREADCRUMB', 'main', 2),
('polish', 'POL_KOTLET_SCHABOWY', 'ING_EGG', 'main', 3),
('polish', 'POL_KOTLET_SCHABOWY', 'ING_FLOUR', 'main', 4),
('polish', 'POL_KOTLET_SCHABOWY', 'ING_BUTTER', 'secondary', 5),
('polish', 'POL_KOTLET_SCHABOWY', 'ING_SALT', 'seasoning', 6),
('polish', 'POL_KOTLET_SCHABOWY', 'ING_BLACK_PEPPER', 'seasoning', 7);

-- POL_KOTLET_MIELONY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_KOTLET_MIELONY', 'ING_PORK', 'main', 1),
('polish', 'POL_KOTLET_MIELONY', 'ING_BEEF', 'main', 2),
('polish', 'POL_KOTLET_MIELONY', 'ING_BREADCRUMB', 'main', 3),
('polish', 'POL_KOTLET_MIELONY', 'ING_EGG', 'main', 4),
('polish', 'POL_KOTLET_MIELONY', 'ING_ONION', 'secondary', 5),
('polish', 'POL_KOTLET_MIELONY', 'ING_GARLIC', 'secondary', 6),
('polish', 'POL_KOTLET_MIELONY', 'ING_SALT', 'seasoning', 7),
('polish', 'POL_KOTLET_MIELONY', 'ING_BLACK_PEPPER', 'seasoning', 8),
('polish', 'POL_KOTLET_MIELONY', 'ING_MARJORAM', 'seasoning', 9);

-- POL_ZRAZY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_ZRAZY', 'ING_BEEF_STEAK', 'main', 1),
('polish', 'POL_ZRAZY', 'ING_BACON', 'main', 2),
('polish', 'POL_ZRAZY', 'ING_PICKLED_CUCUMBER', 'main', 3),
('polish', 'POL_ZRAZY', 'ING_MUSTARD', 'secondary', 4),
('polish', 'POL_ZRAZY', 'ING_ONION', 'secondary', 5),
('polish', 'POL_ZRAZY', 'ING_CARROT', 'secondary', 6),
('polish', 'POL_ZRAZY', 'ING_BAY_LEAF', 'seasoning', 7),
('polish', 'POL_ZRAZY', 'ING_ALLSPICE', 'seasoning', 8);

-- POL_GULASZ
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_GULASZ', 'ING_PORK', 'main', 1),
('polish', 'POL_GULASZ', 'ING_ONION', 'main', 2),
('polish', 'POL_GULASZ', 'ING_BELL_PEPPER', 'secondary', 3),
('polish', 'POL_GULASZ', 'ING_PAPRIKA', 'main', 4),
('polish', 'POL_GULASZ', 'ING_TOMATO_PASTE', 'secondary', 5),
('polish', 'POL_GULASZ', 'ING_GARLIC', 'secondary', 6),
('polish', 'POL_GULASZ', 'ING_BAY_LEAF', 'seasoning', 7),
('polish', 'POL_GULASZ', 'ING_CARAWAY', 'seasoning', 8);

-- POL_KLUSKI_SLASKIE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_KLUSKI_SLASKIE', 'ING_POTATO', 'main', 1),
('polish', 'POL_KLUSKI_SLASKIE', 'ING_POTATO_STARCH', 'main', 2),
('polish', 'POL_KLUSKI_SLASKIE', 'ING_EGG', 'main', 3),
('polish', 'POL_KLUSKI_SLASKIE', 'ING_SALT', 'seasoning', 4);

-- POL_KACZKA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_KACZKA', 'ING_DUCK', 'main', 1),
('polish', 'POL_KACZKA', 'ING_APPLE', 'main', 2),
('polish', 'POL_KACZKA', 'ING_MARJORAM', 'seasoning', 3),
('polish', 'POL_KACZKA', 'ING_ONION', 'secondary', 4),
('polish', 'POL_KACZKA', 'ING_GARLIC', 'secondary', 5),
('polish', 'POL_KACZKA', 'ING_SALT', 'seasoning', 6),
('polish', 'POL_KACZKA', 'ING_BLACK_PEPPER', 'seasoning', 7);

-- POL_SCHAB
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_SCHAB', 'ING_PORK_LOIN', 'main', 1),
('polish', 'POL_SCHAB', 'ING_PRUNE', 'secondary', 2),
('polish', 'POL_SCHAB', 'ING_GARLIC', 'secondary', 3),
('polish', 'POL_SCHAB', 'ING_ONION', 'secondary', 4),
('polish', 'POL_SCHAB', 'ING_MARJORAM', 'seasoning', 5),
('polish', 'POL_SCHAB', 'ING_SALT', 'seasoning', 6),
('polish', 'POL_SCHAB', 'ING_BLACK_PEPPER', 'seasoning', 7);

-- POL_FLAKI
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_FLAKI', 'ING_BEEF_TRIPE', 'main', 1),
('polish', 'POL_FLAKI', 'ING_CARROT', 'secondary', 2),
('polish', 'POL_FLAKI', 'ING_CELERY', 'secondary', 3),
('polish', 'POL_FLAKI', 'ING_PARSLEY_ROOT', 'secondary', 4),
('polish', 'POL_FLAKI', 'ING_ONION', 'secondary', 5),
('polish', 'POL_FLAKI', 'ING_MARJORAM', 'seasoning', 6),
('polish', 'POL_FLAKI', 'ING_NUTMEG', 'seasoning', 7),
('polish', 'POL_FLAKI', 'ING_GINGER', 'seasoning', 8);

-- ============================================
-- SIDES & STREET FOOD (8 dishes)
-- ============================================

-- POL_PLACKI_ZIEMNIACZANE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PLACKI_ZIEMNIACZANE', 'ING_POTATO', 'main', 1),
('polish', 'POL_PLACKI_ZIEMNIACZANE', 'ING_EGG', 'main', 2),
('polish', 'POL_PLACKI_ZIEMNIACZANE', 'ING_FLOUR', 'main', 3),
('polish', 'POL_PLACKI_ZIEMNIACZANE', 'ING_ONION', 'secondary', 4),
('polish', 'POL_PLACKI_ZIEMNIACZANE', 'ING_SOUR_CREAM', 'garnish', 5),
('polish', 'POL_PLACKI_ZIEMNIACZANE', 'ING_VEGETABLE_OIL', 'secondary', 6),
('polish', 'POL_PLACKI_ZIEMNIACZANE', 'ING_SALT', 'seasoning', 7);

-- POL_KOPYTKA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_KOPYTKA', 'ING_POTATO', 'main', 1),
('polish', 'POL_KOPYTKA', 'ING_FLOUR', 'main', 2),
('polish', 'POL_KOPYTKA', 'ING_EGG', 'main', 3),
('polish', 'POL_KOPYTKA', 'ING_BUTTER', 'secondary', 4),
('polish', 'POL_KOPYTKA', 'ING_BREADCRUMB', 'garnish', 5),
('polish', 'POL_KOPYTKA', 'ING_SALT', 'seasoning', 6);

-- POL_MIZERIA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_MIZERIA', 'ING_CUCUMBER', 'main', 1),
('polish', 'POL_MIZERIA', 'ING_SOUR_CREAM', 'main', 2),
('polish', 'POL_MIZERIA', 'ING_DILL', 'garnish', 3),
('polish', 'POL_MIZERIA', 'ING_SALT', 'seasoning', 4),
('polish', 'POL_MIZERIA', 'ING_WHITE_PEPPER', 'seasoning', 5),
('polish', 'POL_MIZERIA', 'ING_SUGAR', 'seasoning', 6);

-- POL_SUROWKA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_SUROWKA', 'ING_CABBAGE', 'main', 1),
('polish', 'POL_SUROWKA', 'ING_CARROT', 'main', 2),
('polish', 'POL_SUROWKA', 'ING_VINEGAR', 'secondary', 3),
('polish', 'POL_SUROWKA', 'ING_VEGETABLE_OIL', 'secondary', 4),
('polish', 'POL_SUROWKA', 'ING_SUGAR', 'seasoning', 5),
('polish', 'POL_SUROWKA', 'ING_SALT', 'seasoning', 6);

-- POL_ZAPIEKANKA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_ZAPIEKANKA', 'ING_BAGUETTE', 'main', 1),
('polish', 'POL_ZAPIEKANKA', 'ING_MUSHROOM', 'main', 2),
('polish', 'POL_ZAPIEKANKA', 'ING_CHEESE', 'main', 3),
('polish', 'POL_ZAPIEKANKA', 'ING_BUTTER', 'secondary', 4),
('polish', 'POL_ZAPIEKANKA', 'ING_KETCHUP', 'sauce', 5),
('polish', 'POL_ZAPIEKANKA', 'ING_CHIVES', 'garnish', 6);

-- POL_OSCYPEK
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_OSCYPEK', 'ING_OSCYPEK', 'main', 1),
('polish', 'POL_OSCYPEK', 'ING_CRANBERRY_JAM', 'sauce', 2);

-- POL_KIELBASA_GRILLED
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_KIELBASA_GRILLED', 'ING_KIELBASA', 'main', 1),
('polish', 'POL_KIELBASA_GRILLED', 'ING_MUSTARD', 'sauce', 2),
('polish', 'POL_KIELBASA_GRILLED', 'ING_BREAD', 'secondary', 3);

-- POL_OBWARZANEK
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_OBWARZANEK', 'ING_FLOUR', 'main', 1),
('polish', 'POL_OBWARZANEK', 'ING_YEAST', 'main', 2),
('polish', 'POL_OBWARZANEK', 'ING_POPPY_SEED', 'garnish', 3),
('polish', 'POL_OBWARZANEK', 'ING_SESAME', 'garnish', 4),
('polish', 'POL_OBWARZANEK', 'ING_SALT', 'seasoning', 5),
('polish', 'POL_OBWARZANEK', 'ING_SUGAR', 'seasoning', 6);

-- ============================================
-- DESSERTS (8 dishes)
-- ============================================

-- POL_PACZKI
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PACZKI', 'ING_FLOUR', 'main', 1),
('polish', 'POL_PACZKI', 'ING_EGG', 'main', 2),
('polish', 'POL_PACZKI', 'ING_BUTTER', 'main', 3),
('polish', 'POL_PACZKI', 'ING_SUGAR', 'main', 4),
('polish', 'POL_PACZKI', 'ING_YEAST', 'main', 5),
('polish', 'POL_PACZKI', 'ING_MILK', 'main', 6),
('polish', 'POL_PACZKI', 'ING_ROSE_JAM', 'main', 7),
('polish', 'POL_PACZKI', 'ING_POWDERED_SUGAR', 'garnish', 8),
('polish', 'POL_PACZKI', 'ING_VEGETABLE_OIL', 'secondary', 9);

-- POL_SERNIK
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_SERNIK', 'ING_FARMERS_CHEESE', 'main', 1),
('polish', 'POL_SERNIK', 'ING_EGG', 'main', 2),
('polish', 'POL_SERNIK', 'ING_SUGAR', 'main', 3),
('polish', 'POL_SERNIK', 'ING_BUTTER', 'main', 4),
('polish', 'POL_SERNIK', 'ING_FLOUR', 'secondary', 5),
('polish', 'POL_SERNIK', 'ING_VANILLA', 'seasoning', 6),
('polish', 'POL_SERNIK', 'ING_LEMON_ZEST', 'seasoning', 7);

-- POL_MAKOWIEC
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_MAKOWIEC', 'ING_FLOUR', 'main', 1),
('polish', 'POL_MAKOWIEC', 'ING_POPPY_SEED', 'main', 2),
('polish', 'POL_MAKOWIEC', 'ING_HONEY', 'main', 3),
('polish', 'POL_MAKOWIEC', 'ING_RAISIN', 'secondary', 4),
('polish', 'POL_MAKOWIEC', 'ING_WALNUT', 'secondary', 5),
('polish', 'POL_MAKOWIEC', 'ING_EGG', 'main', 6),
('polish', 'POL_MAKOWIEC', 'ING_BUTTER', 'main', 7),
('polish', 'POL_MAKOWIEC', 'ING_SUGAR', 'main', 8),
('polish', 'POL_MAKOWIEC', 'ING_YEAST', 'main', 9);

-- POL_SZARLOTKA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_SZARLOTKA', 'ING_FLOUR', 'main', 1),
('polish', 'POL_SZARLOTKA', 'ING_APPLE', 'main', 2),
('polish', 'POL_SZARLOTKA', 'ING_BUTTER', 'main', 3),
('polish', 'POL_SZARLOTKA', 'ING_SUGAR', 'main', 4),
('polish', 'POL_SZARLOTKA', 'ING_EGG', 'main', 5),
('polish', 'POL_SZARLOTKA', 'ING_CINNAMON', 'seasoning', 6),
('polish', 'POL_SZARLOTKA', 'ING_BREADCRUMB', 'secondary', 7);

-- POL_KREMOWKA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_KREMOWKA', 'ING_PUFF_PASTRY', 'main', 1),
('polish', 'POL_KREMOWKA', 'ING_MILK', 'main', 2),
('polish', 'POL_KREMOWKA', 'ING_EGG_YOLK', 'main', 3),
('polish', 'POL_KREMOWKA', 'ING_SUGAR', 'main', 4),
('polish', 'POL_KREMOWKA', 'ING_VANILLA', 'seasoning', 5),
('polish', 'POL_KREMOWKA', 'ING_CORNSTARCH', 'secondary', 6),
('polish', 'POL_KREMOWKA', 'ING_POWDERED_SUGAR', 'garnish', 7);

-- POL_RACUCHY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_RACUCHY', 'ING_FLOUR', 'main', 1),
('polish', 'POL_RACUCHY', 'ING_APPLE', 'main', 2),
('polish', 'POL_RACUCHY', 'ING_EGG', 'main', 3),
('polish', 'POL_RACUCHY', 'ING_MILK', 'main', 4),
('polish', 'POL_RACUCHY', 'ING_YEAST', 'main', 5),
('polish', 'POL_RACUCHY', 'ING_SUGAR', 'main', 6),
('polish', 'POL_RACUCHY', 'ING_POWDERED_SUGAR', 'garnish', 7),
('polish', 'POL_RACUCHY', 'ING_VEGETABLE_OIL', 'secondary', 8);

-- POL_NALESNIKI
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_NALESNIKI', 'ING_FLOUR', 'main', 1),
('polish', 'POL_NALESNIKI', 'ING_EGG', 'main', 2),
('polish', 'POL_NALESNIKI', 'ING_MILK', 'main', 3),
('polish', 'POL_NALESNIKI', 'ING_FARMERS_CHEESE', 'main', 4),
('polish', 'POL_NALESNIKI', 'ING_SUGAR', 'secondary', 5),
('polish', 'POL_NALESNIKI', 'ING_BUTTER', 'secondary', 6),
('polish', 'POL_NALESNIKI', 'ING_VANILLA', 'seasoning', 7);

-- POL_PIERNIK
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
('polish', 'POL_PIERNIK', 'ING_FLOUR', 'main', 1),
('polish', 'POL_PIERNIK', 'ING_HONEY', 'main', 2),
('polish', 'POL_PIERNIK', 'ING_EGG', 'main', 3),
('polish', 'POL_PIERNIK', 'ING_GINGER', 'seasoning', 4),
('polish', 'POL_PIERNIK', 'ING_CINNAMON', 'seasoning', 5),
('polish', 'POL_PIERNIK', 'ING_CLOVE', 'seasoning', 6),
('polish', 'POL_PIERNIK', 'ING_NUTMEG', 'seasoning', 7),
('polish', 'POL_PIERNIK', 'ING_PLUM_JAM', 'main', 8),
('polish', 'POL_PIERNIK', 'ING_COCOA', 'secondary', 9);

-- ============================================
-- VERIFICATION QUERY
-- ============================================

-- Count all product_ingredients for polish
SELECT 'Polish product_ingredients:' as check_type, COUNT(*) as count
FROM product_ingredients WHERE product_type = 'polish';
