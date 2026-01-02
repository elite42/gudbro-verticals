-- ============================================
-- German Cuisine - Product Ingredients Links
-- Created: 2025-12-24
-- Links ingredients to german dishes
-- ============================================

-- Clear existing links for german (safety)
DELETE FROM product_ingredients WHERE product_type = 'german';

-- SAUSAGES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- GER_BRATWURST
('german', 'GER_BRATWURST', 'ING_PORK', 'main', 1),
('german', 'GER_BRATWURST', 'ING_SAUSAGE_CASING', 'component', 2),
('german', 'GER_BRATWURST', 'ING_CARAWAY', 'seasoning', 3),
('german', 'GER_BRATWURST', 'ING_NUTMEG', 'seasoning', 4),
('german', 'GER_BRATWURST', 'ING_GINGER', 'seasoning', 5),
('german', 'GER_BRATWURST', 'ING_SALT', 'seasoning', 6),
('german', 'GER_BRATWURST', 'ING_WHITE_PEPPER', 'seasoning', 7),
-- GER_CURRYWURST
('german', 'GER_CURRYWURST', 'ING_PORK_SAUSAGE', 'main', 1),
('german', 'GER_CURRYWURST', 'ING_KETCHUP', 'sauce', 2),
('german', 'GER_CURRYWURST', 'ING_CURRY_POWDER', 'seasoning', 3),
('german', 'GER_CURRYWURST', 'ING_WORCESTERSHIRE_SAUCE', 'sauce', 4),
('german', 'GER_CURRYWURST', 'ING_PAPRIKA', 'seasoning', 5),
('german', 'GER_CURRYWURST', 'ING_ONION', 'aromatic', 6),
-- GER_WEISSWURST
('german', 'GER_WEISSWURST', 'ING_VEAL', 'main', 1),
('german', 'GER_WEISSWURST', 'ING_PORK_BELLY', 'main', 2),
('german', 'GER_WEISSWURST', 'ING_PARSLEY', 'aromatic', 3),
('german', 'GER_WEISSWURST', 'ING_LEMON_ZEST', 'aromatic', 4),
('german', 'GER_WEISSWURST', 'ING_MACE', 'seasoning', 5),
('german', 'GER_WEISSWURST', 'ING_ONION', 'aromatic', 6),
('german', 'GER_WEISSWURST', 'ING_SALT', 'seasoning', 7),
-- GER_BOCKWURST
('german', 'GER_BOCKWURST', 'ING_VEAL', 'main', 1),
('german', 'GER_BOCKWURST', 'ING_PORK', 'main', 2),
('german', 'GER_BOCKWURST', 'ING_CHIVES', 'aromatic', 3),
('german', 'GER_BOCKWURST', 'ING_PAPRIKA', 'seasoning', 4),
('german', 'GER_BOCKWURST', 'ING_SALT', 'seasoning', 5),
('german', 'GER_BOCKWURST', 'ING_WHITE_PEPPER', 'seasoning', 6),
-- GER_THUERINGER
('german', 'GER_THUERINGER', 'ING_PORK', 'main', 1),
('german', 'GER_THUERINGER', 'ING_BEEF', 'main', 2),
('german', 'GER_THUERINGER', 'ING_CARAWAY', 'seasoning', 3),
('german', 'GER_THUERINGER', 'ING_MARJORAM', 'seasoning', 4),
('german', 'GER_THUERINGER', 'ING_GARLIC', 'aromatic', 5),
('german', 'GER_THUERINGER', 'ING_SALT', 'seasoning', 6),
('german', 'GER_THUERINGER', 'ING_BLACK_PEPPER', 'seasoning', 7),
-- GER_NUERNBERGER
('german', 'GER_NUERNBERGER', 'ING_PORK', 'main', 1),
('german', 'GER_NUERNBERGER', 'ING_MARJORAM', 'seasoning', 2),
('german', 'GER_NUERNBERGER', 'ING_SALT', 'seasoning', 3),
('german', 'GER_NUERNBERGER', 'ING_BLACK_PEPPER', 'seasoning', 4),
('german', 'GER_NUERNBERGER', 'ING_NUTMEG', 'seasoning', 5),
-- GER_LEBERKASE
('german', 'GER_LEBERKASE', 'ING_BEEF', 'main', 1),
('german', 'GER_LEBERKASE', 'ING_PORK', 'main', 2),
('german', 'GER_LEBERKASE', 'ING_BACON', 'main', 3),
('german', 'GER_LEBERKASE', 'ING_ONION', 'aromatic', 4),
('german', 'GER_LEBERKASE', 'ING_SALT', 'seasoning', 5),
('german', 'GER_LEBERKASE', 'ING_BLACK_PEPPER', 'seasoning', 6),
('german', 'GER_LEBERKASE', 'ING_MARJORAM', 'seasoning', 7),
-- GER_FRANKFURTER
('german', 'GER_FRANKFURTER', 'ING_PORK', 'main', 1),
('german', 'GER_FRANKFURTER', 'ING_SALT', 'seasoning', 2),
('german', 'GER_FRANKFURTER', 'ING_BLACK_PEPPER', 'seasoning', 3),
('german', 'GER_FRANKFURTER', 'ING_PAPRIKA', 'seasoning', 4);

-- MAINS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- GER_SCHNITZEL
('german', 'GER_SCHNITZEL', 'ING_VEAL', 'main', 1),
('german', 'GER_SCHNITZEL', 'ING_FLOUR', 'coating', 2),
('german', 'GER_SCHNITZEL', 'ING_EGG', 'coating', 3),
('german', 'GER_SCHNITZEL', 'ING_BREADCRUMBS', 'coating', 4),
('german', 'GER_SCHNITZEL', 'ING_BUTTER', 'fat', 5),
('german', 'GER_SCHNITZEL', 'ING_LEMON', 'garnish', 6),
('german', 'GER_SCHNITZEL', 'ING_SALT', 'seasoning', 7),
-- GER_SCHWEINESCHNITZEL
('german', 'GER_SCHWEINESCHNITZEL', 'ING_PORK_LOIN', 'main', 1),
('german', 'GER_SCHWEINESCHNITZEL', 'ING_FLOUR', 'coating', 2),
('german', 'GER_SCHWEINESCHNITZEL', 'ING_EGG', 'coating', 3),
('german', 'GER_SCHWEINESCHNITZEL', 'ING_BREADCRUMBS', 'coating', 4),
('german', 'GER_SCHWEINESCHNITZEL', 'ING_BUTTER', 'fat', 5),
('german', 'GER_SCHWEINESCHNITZEL', 'ING_LEMON', 'garnish', 6),
('german', 'GER_SCHWEINESCHNITZEL', 'ING_SALT', 'seasoning', 7),
-- GER_SAUERBRATEN
('german', 'GER_SAUERBRATEN', 'ING_BEEF_ROAST', 'main', 1),
('german', 'GER_SAUERBRATEN', 'ING_RED_WINE_VINEGAR', 'marinade', 2),
('german', 'GER_SAUERBRATEN', 'ING_RED_WINE', 'marinade', 3),
('german', 'GER_SAUERBRATEN', 'ING_ONION', 'aromatic', 4),
('german', 'GER_SAUERBRATEN', 'ING_CARROT', 'aromatic', 5),
('german', 'GER_SAUERBRATEN', 'ING_BAY_LEAF', 'aromatic', 6),
('german', 'GER_SAUERBRATEN', 'ING_JUNIPER_BERRIES', 'seasoning', 7),
('german', 'GER_SAUERBRATEN', 'ING_CLOVE', 'seasoning', 8),
('german', 'GER_SAUERBRATEN', 'ING_PEPPERCORN', 'seasoning', 9),
-- GER_SCHWEINSHAXE
('german', 'GER_SCHWEINSHAXE', 'ING_PORK_KNUCKLE', 'main', 1),
('german', 'GER_SCHWEINSHAXE', 'ING_CARAWAY', 'seasoning', 2),
('german', 'GER_SCHWEINSHAXE', 'ING_GARLIC', 'aromatic', 3),
('german', 'GER_SCHWEINSHAXE', 'ING_SALT', 'seasoning', 4),
('german', 'GER_SCHWEINSHAXE', 'ING_BLACK_PEPPER', 'seasoning', 5),
('german', 'GER_SCHWEINSHAXE', 'ING_BEER', 'liquid', 6),
-- GER_ROULADEN
('german', 'GER_ROULADEN', 'ING_BEEF_EYE_ROUND', 'main', 1),
('german', 'GER_ROULADEN', 'ING_BACON', 'filling', 2),
('german', 'GER_ROULADEN', 'ING_ONION', 'filling', 3),
('german', 'GER_ROULADEN', 'ING_PICKLE', 'filling', 4),
('german', 'GER_ROULADEN', 'ING_MUSTARD', 'filling', 5),
('german', 'GER_ROULADEN', 'ING_BEEF_BROTH', 'liquid', 6),
('german', 'GER_ROULADEN', 'ING_RED_WINE', 'liquid', 7),
-- GER_MAULTASCHEN
('german', 'GER_MAULTASCHEN', 'ING_FLOUR', 'dough', 1),
('german', 'GER_MAULTASCHEN', 'ING_EGG', 'dough', 2),
('german', 'GER_MAULTASCHEN', 'ING_PORK', 'filling', 3),
('german', 'GER_MAULTASCHEN', 'ING_VEAL', 'filling', 4),
('german', 'GER_MAULTASCHEN', 'ING_SPINACH', 'filling', 5),
('german', 'GER_MAULTASCHEN', 'ING_ONION', 'filling', 6),
('german', 'GER_MAULTASCHEN', 'ING_BREADCRUMBS', 'filling', 7),
('german', 'GER_MAULTASCHEN', 'ING_PARSLEY', 'aromatic', 8),
('german', 'GER_MAULTASCHEN', 'ING_NUTMEG', 'seasoning', 9),
-- GER_KASSLER
('german', 'GER_KASSLER', 'ING_PORK_LOIN', 'main', 1),
('german', 'GER_KASSLER', 'ING_SALT', 'seasoning', 2),
('german', 'GER_KASSLER', 'ING_BLACK_PEPPER', 'seasoning', 3),
('german', 'GER_KASSLER', 'ING_JUNIPER_BERRIES', 'seasoning', 4),
-- GER_KOENIGSBERGER
('german', 'GER_KOENIGSBERGER', 'ING_VEAL', 'main', 1),
('german', 'GER_KOENIGSBERGER', 'ING_PORK', 'main', 2),
('german', 'GER_KOENIGSBERGER', 'ING_ONION', 'aromatic', 3),
('german', 'GER_KOENIGSBERGER', 'ING_EGG', 'binder', 4),
('german', 'GER_KOENIGSBERGER', 'ING_BREADCRUMBS', 'binder', 5),
('german', 'GER_KOENIGSBERGER', 'ING_ANCHOVY', 'sauce', 6),
('german', 'GER_KOENIGSBERGER', 'ING_CAPERS', 'sauce', 7),
('german', 'GER_KOENIGSBERGER', 'ING_HEAVY_CREAM', 'sauce', 8),
('german', 'GER_KOENIGSBERGER', 'ING_LEMON_JUICE', 'sauce', 9),
-- GER_ZWIEBELROSTBRATEN
('german', 'GER_ZWIEBELROSTBRATEN', 'ING_BEEF_STEAK', 'main', 1),
('german', 'GER_ZWIEBELROSTBRATEN', 'ING_ONION', 'topping', 2),
('german', 'GER_ZWIEBELROSTBRATEN', 'ING_BUTTER', 'fat', 3),
('german', 'GER_ZWIEBELROSTBRATEN', 'ING_BEEF_BROTH', 'sauce', 4),
('german', 'GER_ZWIEBELROSTBRATEN', 'ING_SALT', 'seasoning', 5),
('german', 'GER_ZWIEBELROSTBRATEN', 'ING_BLACK_PEPPER', 'seasoning', 6),
-- GER_EISBEIN
('german', 'GER_EISBEIN', 'ING_PORK_KNUCKLE', 'main', 1),
('german', 'GER_EISBEIN', 'ING_BAY_LEAF', 'aromatic', 2),
('german', 'GER_EISBEIN', 'ING_JUNIPER_BERRIES', 'seasoning', 3),
('german', 'GER_EISBEIN', 'ING_PEPPERCORN', 'seasoning', 4),
('german', 'GER_EISBEIN', 'ING_SALT', 'seasoning', 5),
-- GER_JAEGERSCHNITZEL
('german', 'GER_JAEGERSCHNITZEL', 'ING_PORK_LOIN', 'main', 1),
('german', 'GER_JAEGERSCHNITZEL', 'ING_FLOUR', 'coating', 2),
('german', 'GER_JAEGERSCHNITZEL', 'ING_EGG', 'coating', 3),
('german', 'GER_JAEGERSCHNITZEL', 'ING_BREADCRUMBS', 'coating', 4),
('german', 'GER_JAEGERSCHNITZEL', 'ING_MUSHROOM', 'sauce', 5),
('german', 'GER_JAEGERSCHNITZEL', 'ING_ONION', 'sauce', 6),
('german', 'GER_JAEGERSCHNITZEL', 'ING_HEAVY_CREAM', 'sauce', 7),
('german', 'GER_JAEGERSCHNITZEL', 'ING_WHITE_WINE', 'sauce', 8);

-- SIDES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- GER_SPAETZLE
('german', 'GER_SPAETZLE', 'ING_FLOUR', 'base', 1),
('german', 'GER_SPAETZLE', 'ING_EGG', 'base', 2),
('german', 'GER_SPAETZLE', 'ING_SALT', 'seasoning', 3),
('german', 'GER_SPAETZLE', 'ING_NUTMEG', 'seasoning', 4),
('german', 'GER_SPAETZLE', 'ING_BUTTER', 'fat', 5),
-- GER_KAESESPAETZLE
('german', 'GER_KAESESPAETZLE', 'ING_FLOUR', 'base', 1),
('german', 'GER_KAESESPAETZLE', 'ING_EGG', 'base', 2),
('german', 'GER_KAESESPAETZLE', 'ING_SWISS_CHEESE', 'main', 3),
('german', 'GER_KAESESPAETZLE', 'ING_GRUYERE', 'main', 4),
('german', 'GER_KAESESPAETZLE', 'ING_ONION', 'topping', 5),
('german', 'GER_KAESESPAETZLE', 'ING_BUTTER', 'fat', 6),
('german', 'GER_KAESESPAETZLE', 'ING_SALT', 'seasoning', 7),
-- GER_KARTOFFELKLOESSE
('german', 'GER_KARTOFFELKLOESSE', 'ING_POTATO', 'main', 1),
('german', 'GER_KARTOFFELKLOESSE', 'ING_POTATO_STARCH', 'binder', 2),
('german', 'GER_KARTOFFELKLOESSE', 'ING_EGG', 'binder', 3),
('german', 'GER_KARTOFFELKLOESSE', 'ING_SALT', 'seasoning', 4),
('german', 'GER_KARTOFFELKLOESSE', 'ING_NUTMEG', 'seasoning', 5),
-- GER_SAUERKRAUT
('german', 'GER_SAUERKRAUT', 'ING_CABBAGE', 'main', 1),
('german', 'GER_SAUERKRAUT', 'ING_SALT', 'seasoning', 2),
('german', 'GER_SAUERKRAUT', 'ING_CARAWAY', 'seasoning', 3),
('german', 'GER_SAUERKRAUT', 'ING_JUNIPER_BERRIES', 'seasoning', 4),
('german', 'GER_SAUERKRAUT', 'ING_BAY_LEAF', 'aromatic', 5),
-- GER_ROTKOHL
('german', 'GER_ROTKOHL', 'ING_RED_CABBAGE', 'main', 1),
('german', 'GER_ROTKOHL', 'ING_APPLE', 'main', 2),
('german', 'GER_ROTKOHL', 'ING_ONION', 'aromatic', 3),
('german', 'GER_ROTKOHL', 'ING_RED_WINE_VINEGAR', 'liquid', 4),
('german', 'GER_ROTKOHL', 'ING_SUGAR', 'seasoning', 5),
('german', 'GER_ROTKOHL', 'ING_CLOVE', 'seasoning', 6),
('german', 'GER_ROTKOHL', 'ING_BAY_LEAF', 'aromatic', 7),
-- GER_KARTOFFELPUFFER
('german', 'GER_KARTOFFELPUFFER', 'ING_POTATO', 'main', 1),
('german', 'GER_KARTOFFELPUFFER', 'ING_ONION', 'main', 2),
('german', 'GER_KARTOFFELPUFFER', 'ING_EGG', 'binder', 3),
('german', 'GER_KARTOFFELPUFFER', 'ING_FLOUR', 'binder', 4),
('german', 'GER_KARTOFFELPUFFER', 'ING_SALT', 'seasoning', 5),
('german', 'GER_KARTOFFELPUFFER', 'ING_VEGETABLE_OIL', 'fat', 6),
-- GER_BRATKARTOFFELN
('german', 'GER_BRATKARTOFFELN', 'ING_POTATO', 'main', 1),
('german', 'GER_BRATKARTOFFELN', 'ING_ONION', 'main', 2),
('german', 'GER_BRATKARTOFFELN', 'ING_BACON', 'main', 3),
('german', 'GER_BRATKARTOFFELN', 'ING_BUTTER', 'fat', 4),
('german', 'GER_BRATKARTOFFELN', 'ING_SALT', 'seasoning', 5),
('german', 'GER_BRATKARTOFFELN', 'ING_BLACK_PEPPER', 'seasoning', 6),
('german', 'GER_BRATKARTOFFELN', 'ING_PARSLEY', 'garnish', 7),
-- GER_KARTOFFELSALAT
('german', 'GER_KARTOFFELSALAT', 'ING_POTATO', 'main', 1),
('german', 'GER_KARTOFFELSALAT', 'ING_ONION', 'main', 2),
('german', 'GER_KARTOFFELSALAT', 'ING_PICKLE', 'main', 3),
('german', 'GER_KARTOFFELSALAT', 'ING_BEEF_BROTH', 'dressing', 4),
('german', 'GER_KARTOFFELSALAT', 'ING_VINEGAR', 'dressing', 5),
('german', 'GER_KARTOFFELSALAT', 'ING_VEGETABLE_OIL', 'dressing', 6),
('german', 'GER_KARTOFFELSALAT', 'ING_MUSTARD', 'dressing', 7),
('german', 'GER_KARTOFFELSALAT', 'ING_PARSLEY', 'garnish', 8),
-- GER_SEMMELKNOEDEL
('german', 'GER_SEMMELKNOEDEL', 'ING_BREAD', 'main', 1),
('german', 'GER_SEMMELKNOEDEL', 'ING_MILK', 'liquid', 2),
('german', 'GER_SEMMELKNOEDEL', 'ING_EGG', 'binder', 3),
('german', 'GER_SEMMELKNOEDEL', 'ING_ONION', 'aromatic', 4),
('german', 'GER_SEMMELKNOEDEL', 'ING_PARSLEY', 'aromatic', 5),
('german', 'GER_SEMMELKNOEDEL', 'ING_BUTTER', 'fat', 6),
('german', 'GER_SEMMELKNOEDEL', 'ING_NUTMEG', 'seasoning', 7),
-- GER_HIMMEL_ERDE
('german', 'GER_HIMMEL_ERDE', 'ING_POTATO', 'main', 1),
('german', 'GER_HIMMEL_ERDE', 'ING_APPLE', 'main', 2),
('german', 'GER_HIMMEL_ERDE', 'ING_ONION', 'topping', 3),
('german', 'GER_HIMMEL_ERDE', 'ING_BUTTER', 'fat', 4),
('german', 'GER_HIMMEL_ERDE', 'ING_SUGAR', 'seasoning', 5),
('german', 'GER_HIMMEL_ERDE', 'ING_SALT', 'seasoning', 6);

-- SOUPS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- GER_KARTOFFELSUPPE
('german', 'GER_KARTOFFELSUPPE', 'ING_POTATO', 'main', 1),
('german', 'GER_KARTOFFELSUPPE', 'ING_LEEK', 'main', 2),
('german', 'GER_KARTOFFELSUPPE', 'ING_CARROT', 'aromatic', 3),
('german', 'GER_KARTOFFELSUPPE', 'ING_CELERY', 'aromatic', 4),
('german', 'GER_KARTOFFELSUPPE', 'ING_ONION', 'aromatic', 5),
('german', 'GER_KARTOFFELSUPPE', 'ING_BACON', 'topping', 6),
('german', 'GER_KARTOFFELSUPPE', 'ING_VEGETABLE_BROTH', 'liquid', 7),
('german', 'GER_KARTOFFELSUPPE', 'ING_HEAVY_CREAM', 'liquid', 8),
('german', 'GER_KARTOFFELSUPPE', 'ING_PARSLEY', 'garnish', 9),
-- GER_ERBSENSUPPE
('german', 'GER_ERBSENSUPPE', 'ING_SPLIT_PEAS', 'main', 1),
('german', 'GER_ERBSENSUPPE', 'ING_SMOKED_PORK', 'main', 2),
('german', 'GER_ERBSENSUPPE', 'ING_ONION', 'aromatic', 3),
('german', 'GER_ERBSENSUPPE', 'ING_CARROT', 'aromatic', 4),
('german', 'GER_ERBSENSUPPE', 'ING_CELERY', 'aromatic', 5),
('german', 'GER_ERBSENSUPPE', 'ING_LEEK', 'aromatic', 6),
('german', 'GER_ERBSENSUPPE', 'ING_BAY_LEAF', 'aromatic', 7),
('german', 'GER_ERBSENSUPPE', 'ING_MARJORAM', 'seasoning', 8),
-- GER_LINSENSUPPE
('german', 'GER_LINSENSUPPE', 'ING_LENTILS', 'main', 1),
('german', 'GER_LINSENSUPPE', 'ING_SMOKED_SAUSAGE', 'main', 2),
('german', 'GER_LINSENSUPPE', 'ING_ONION', 'aromatic', 3),
('german', 'GER_LINSENSUPPE', 'ING_CARROT', 'aromatic', 4),
('german', 'GER_LINSENSUPPE', 'ING_CELERY', 'aromatic', 5),
('german', 'GER_LINSENSUPPE', 'ING_POTATO', 'main', 6),
('german', 'GER_LINSENSUPPE', 'ING_VINEGAR', 'seasoning', 7),
('german', 'GER_LINSENSUPPE', 'ING_BAY_LEAF', 'aromatic', 8),
-- GER_GULASCHSUPPE
('german', 'GER_GULASCHSUPPE', 'ING_BEEF', 'main', 1),
('german', 'GER_GULASCHSUPPE', 'ING_ONION', 'aromatic', 2),
('german', 'GER_GULASCHSUPPE', 'ING_BELL_PEPPER', 'main', 3),
('german', 'GER_GULASCHSUPPE', 'ING_POTATO', 'main', 4),
('german', 'GER_GULASCHSUPPE', 'ING_TOMATO_PASTE', 'base', 5),
('german', 'GER_GULASCHSUPPE', 'ING_PAPRIKA', 'seasoning', 6),
('german', 'GER_GULASCHSUPPE', 'ING_CARAWAY', 'seasoning', 7),
('german', 'GER_GULASCHSUPPE', 'ING_BEEF_BROTH', 'liquid', 8),
-- GER_HOCHZEITSSUPPE
('german', 'GER_HOCHZEITSSUPPE', 'ING_BEEF_BROTH', 'base', 1),
('german', 'GER_HOCHZEITSSUPPE', 'ING_BEEF', 'main', 2),
('german', 'GER_HOCHZEITSSUPPE', 'ING_EGG', 'component', 3),
('german', 'GER_HOCHZEITSSUPPE', 'ING_BREADCRUMBS', 'component', 4),
('german', 'GER_HOCHZEITSSUPPE', 'ING_CARROT', 'aromatic', 5),
('german', 'GER_HOCHZEITSSUPPE', 'ING_LEEK', 'aromatic', 6),
('german', 'GER_HOCHZEITSSUPPE', 'ING_PARSLEY', 'garnish', 7),
('german', 'GER_HOCHZEITSSUPPE', 'ING_NUTMEG', 'seasoning', 8),
-- GER_LEBERKNOEDESUPPE
('german', 'GER_LEBERKNOEDESUPPE', 'ING_BEEF_LIVER', 'main', 1),
('german', 'GER_LEBERKNOEDESUPPE', 'ING_BEEF_BROTH', 'base', 2),
('german', 'GER_LEBERKNOEDESUPPE', 'ING_BREAD', 'component', 3),
('german', 'GER_LEBERKNOEDESUPPE', 'ING_EGG', 'binder', 4),
('german', 'GER_LEBERKNOEDESUPPE', 'ING_ONION', 'aromatic', 5),
('german', 'GER_LEBERKNOEDESUPPE', 'ING_MARJORAM', 'seasoning', 6),
('german', 'GER_LEBERKNOEDESUPPE', 'ING_PARSLEY', 'garnish', 7),
('german', 'GER_LEBERKNOEDESUPPE', 'ING_SALT', 'seasoning', 8);

-- BAKED
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- GER_BREZEL
('german', 'GER_BREZEL', 'ING_FLOUR', 'base', 1),
('german', 'GER_BREZEL', 'ING_YEAST', 'leavening', 2),
('german', 'GER_BREZEL', 'ING_BUTTER', 'fat', 3),
('german', 'GER_BREZEL', 'ING_SALT', 'seasoning', 4),
('german', 'GER_BREZEL', 'ING_BAKING_SODA', 'processing', 5),
('german', 'GER_BREZEL', 'ING_WATER', 'liquid', 6),
-- GER_LAUGENBROETCHEN
('german', 'GER_LAUGENBROETCHEN', 'ING_FLOUR', 'base', 1),
('german', 'GER_LAUGENBROETCHEN', 'ING_YEAST', 'leavening', 2),
('german', 'GER_LAUGENBROETCHEN', 'ING_BUTTER', 'fat', 3),
('german', 'GER_LAUGENBROETCHEN', 'ING_SALT', 'seasoning', 4),
('german', 'GER_LAUGENBROETCHEN', 'ING_BAKING_SODA', 'processing', 5),
('german', 'GER_LAUGENBROETCHEN', 'ING_MILK', 'liquid', 6),
-- GER_ROGGENBROT
('german', 'GER_ROGGENBROT', 'ING_RYE_FLOUR', 'base', 1),
('german', 'GER_ROGGENBROT', 'ING_SOURDOUGH', 'leavening', 2),
('german', 'GER_ROGGENBROT', 'ING_CARAWAY', 'seasoning', 3),
('german', 'GER_ROGGENBROT', 'ING_SALT', 'seasoning', 4),
('german', 'GER_ROGGENBROT', 'ING_WATER', 'liquid', 5),
-- GER_PUMPERNICKEL
('german', 'GER_PUMPERNICKEL', 'ING_RYE_FLOUR', 'base', 1),
('german', 'GER_PUMPERNICKEL', 'ING_RYE_BERRIES', 'base', 2),
('german', 'GER_PUMPERNICKEL', 'ING_MOLASSES', 'sweetener', 3),
('german', 'GER_PUMPERNICKEL', 'ING_SALT', 'seasoning', 4),
-- GER_BROETCHEN
('german', 'GER_BROETCHEN', 'ING_FLOUR', 'base', 1),
('german', 'GER_BROETCHEN', 'ING_YEAST', 'leavening', 2),
('german', 'GER_BROETCHEN', 'ING_SALT', 'seasoning', 3),
('german', 'GER_BROETCHEN', 'ING_WATER', 'liquid', 4),
('german', 'GER_BROETCHEN', 'ING_BUTTER', 'fat', 5),
-- GER_ZWIEBELBROT
('german', 'GER_ZWIEBELBROT', 'ING_FLOUR', 'base', 1),
('german', 'GER_ZWIEBELBROT', 'ING_RYE_FLOUR', 'base', 2),
('german', 'GER_ZWIEBELBROT', 'ING_YEAST', 'leavening', 3),
('german', 'GER_ZWIEBELBROT', 'ING_ONION', 'main', 4),
('german', 'GER_ZWIEBELBROT', 'ING_BACON', 'main', 5),
('german', 'GER_ZWIEBELBROT', 'ING_CARAWAY', 'seasoning', 6),
('german', 'GER_ZWIEBELBROT', 'ING_SALT', 'seasoning', 7);

-- DESSERTS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- GER_SCHWARZWAELDER
('german', 'GER_SCHWARZWAELDER', 'ING_FLOUR', 'base', 1),
('german', 'GER_SCHWARZWAELDER', 'ING_COCOA_POWDER', 'base', 2),
('german', 'GER_SCHWARZWAELDER', 'ING_EGG', 'base', 3),
('german', 'GER_SCHWARZWAELDER', 'ING_SUGAR', 'sweetener', 4),
('german', 'GER_SCHWARZWAELDER', 'ING_HEAVY_CREAM', 'filling', 5),
('german', 'GER_SCHWARZWAELDER', 'ING_CHERRY', 'filling', 6),
('german', 'GER_SCHWARZWAELDER', 'ING_KIRSCH', 'flavoring', 7),
('german', 'GER_SCHWARZWAELDER', 'ING_DARK_CHOCOLATE', 'decoration', 8),
-- GER_APFELSTRUDEL
('german', 'GER_APFELSTRUDEL', 'ING_FLOUR', 'dough', 1),
('german', 'GER_APFELSTRUDEL', 'ING_APPLE', 'filling', 2),
('german', 'GER_APFELSTRUDEL', 'ING_RAISIN', 'filling', 3),
('german', 'GER_APFELSTRUDEL', 'ING_BREADCRUMBS', 'filling', 4),
('german', 'GER_APFELSTRUDEL', 'ING_BUTTER', 'fat', 5),
('german', 'GER_APFELSTRUDEL', 'ING_CINNAMON', 'seasoning', 6),
('german', 'GER_APFELSTRUDEL', 'ING_SUGAR', 'sweetener', 7),
('german', 'GER_APFELSTRUDEL', 'ING_LEMON_ZEST', 'flavoring', 8),
-- GER_BERLINER
('german', 'GER_BERLINER', 'ING_FLOUR', 'dough', 1),
('german', 'GER_BERLINER', 'ING_YEAST', 'leavening', 2),
('german', 'GER_BERLINER', 'ING_BUTTER', 'fat', 3),
('german', 'GER_BERLINER', 'ING_EGG', 'dough', 4),
('german', 'GER_BERLINER', 'ING_MILK', 'liquid', 5),
('german', 'GER_BERLINER', 'ING_STRAWBERRY_JAM', 'filling', 6),
('german', 'GER_BERLINER', 'ING_POWDERED_SUGAR', 'topping', 7),
('german', 'GER_BERLINER', 'ING_VEGETABLE_OIL', 'frying', 8),
-- GER_ROTE_GRUETZE
('german', 'GER_ROTE_GRUETZE', 'ING_RASPBERRY', 'main', 1),
('german', 'GER_ROTE_GRUETZE', 'ING_STRAWBERRY', 'main', 2),
('german', 'GER_ROTE_GRUETZE', 'ING_CURRANTS', 'main', 3),
('german', 'GER_ROTE_GRUETZE', 'ING_CHERRY', 'main', 4),
('german', 'GER_ROTE_GRUETZE', 'ING_SUGAR', 'sweetener', 5),
('german', 'GER_ROTE_GRUETZE', 'ING_CORNSTARCH', 'thickener', 6),
('german', 'GER_ROTE_GRUETZE', 'ING_VANILLA', 'flavoring', 7),
-- GER_KAISERSCHMARRN
('german', 'GER_KAISERSCHMARRN', 'ING_FLOUR', 'base', 1),
('german', 'GER_KAISERSCHMARRN', 'ING_EGG', 'base', 2),
('german', 'GER_KAISERSCHMARRN', 'ING_MILK', 'liquid', 3),
('german', 'GER_KAISERSCHMARRN', 'ING_BUTTER', 'fat', 4),
('german', 'GER_KAISERSCHMARRN', 'ING_RAISIN', 'filling', 5),
('german', 'GER_KAISERSCHMARRN', 'ING_POWDERED_SUGAR', 'topping', 6),
('german', 'GER_KAISERSCHMARRN', 'ING_VANILLA', 'flavoring', 7),
('german', 'GER_KAISERSCHMARRN', 'ING_RUM', 'flavoring', 8),
-- GER_BIENENSTICH
('german', 'GER_BIENENSTICH', 'ING_FLOUR', 'base', 1),
('german', 'GER_BIENENSTICH', 'ING_YEAST', 'leavening', 2),
('german', 'GER_BIENENSTICH', 'ING_BUTTER', 'fat', 3),
('german', 'GER_BIENENSTICH', 'ING_HONEY', 'topping', 4),
('german', 'GER_BIENENSTICH', 'ING_ALMOND', 'topping', 5),
('german', 'GER_BIENENSTICH', 'ING_HEAVY_CREAM', 'filling', 6),
('german', 'GER_BIENENSTICH', 'ING_VANILLA', 'filling', 7),
('german', 'GER_BIENENSTICH', 'ING_EGG', 'filling', 8),
-- GER_LEBKUCHEN
('german', 'GER_LEBKUCHEN', 'ING_FLOUR', 'base', 1),
('german', 'GER_LEBKUCHEN', 'ING_HONEY', 'sweetener', 2),
('german', 'GER_LEBKUCHEN', 'ING_HAZELNUTS', 'main', 3),
('german', 'GER_LEBKUCHEN', 'ING_ALMOND', 'main', 4),
('german', 'GER_LEBKUCHEN', 'ING_CINNAMON', 'spice', 5),
('german', 'GER_LEBKUCHEN', 'ING_NUTMEG', 'spice', 6),
('german', 'GER_LEBKUCHEN', 'ING_CLOVE', 'spice', 7),
('german', 'GER_LEBKUCHEN', 'ING_GINGER', 'spice', 8),
('german', 'GER_LEBKUCHEN', 'ING_EGG', 'binder', 9),
-- GER_STOLLEN
('german', 'GER_STOLLEN', 'ING_FLOUR', 'base', 1),
('german', 'GER_STOLLEN', 'ING_BUTTER', 'fat', 2),
('german', 'GER_STOLLEN', 'ING_MARZIPAN', 'filling', 3),
('german', 'GER_STOLLEN', 'ING_RAISIN', 'filling', 4),
('german', 'GER_STOLLEN', 'ING_CANDIED_CITRUS', 'filling', 5),
('german', 'GER_STOLLEN', 'ING_ALMOND', 'filling', 6),
('german', 'GER_STOLLEN', 'ING_RUM', 'flavoring', 7),
('german', 'GER_STOLLEN', 'ING_POWDERED_SUGAR', 'topping', 8),
-- GER_DAMPFNUDELN
('german', 'GER_DAMPFNUDELN', 'ING_FLOUR', 'base', 1),
('german', 'GER_DAMPFNUDELN', 'ING_YEAST', 'leavening', 2),
('german', 'GER_DAMPFNUDELN', 'ING_MILK', 'liquid', 3),
('german', 'GER_DAMPFNUDELN', 'ING_BUTTER', 'fat', 4),
('german', 'GER_DAMPFNUDELN', 'ING_SUGAR', 'sweetener', 5),
('german', 'GER_DAMPFNUDELN', 'ING_EGG', 'base', 6),
('german', 'GER_DAMPFNUDELN', 'ING_SALT', 'seasoning', 7),
('german', 'GER_DAMPFNUDELN', 'ING_VANILLA', 'flavoring', 8);

-- Verification
SELECT 'Product ingredients links: ' || COUNT(*) as total FROM product_ingredients WHERE product_type = 'german';
SELECT product_id, COUNT(*) as ingredient_count
FROM product_ingredients
WHERE product_type = 'german'
GROUP BY product_id
ORDER BY product_id;
