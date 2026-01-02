-- ============================================
-- Swiss Cuisine - Product Configuration
-- Created: 2025-12-25
-- Links all 38 Swiss dishes to ingredients
-- ============================================

-- Part 1: Product Taxonomy Entry
INSERT INTO product_taxonomy (product_type, service_type, menu_type, category, display_order, display_name_en, display_name_it, icon, is_alcoholic, is_hot_served, requires_cooking)
SELECT 'swiss', 'food', 'standalone', 'second_course', 60, 'Swiss Cuisine', 'Cucina Svizzera', '🇨🇭', false, true, true
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'swiss');

-- Part 2: Product Ingredients Links
-- Clear existing links for swiss (safety)
DELETE FROM product_ingredients WHERE product_type = 'swiss';

-- CHEESE DISHES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- SUI_FONDUE
('swiss', 'SUI_FONDUE', 'ING_GRUYERE', 'main', 1),
('swiss', 'SUI_FONDUE', 'ING_EMMENTAL', 'main', 2),
('swiss', 'SUI_FONDUE', 'ING_WHITE_WINE', 'liquid', 3),
('swiss', 'SUI_FONDUE', 'ING_KIRSCH', 'liquid', 4),
('swiss', 'SUI_FONDUE', 'ING_GARLIC', 'aromatic', 5),
('swiss', 'SUI_FONDUE', 'ING_CORNSTARCH', 'thickener', 6),
('swiss', 'SUI_FONDUE', 'ING_NUTMEG', 'seasoning', 7),
('swiss', 'SUI_FONDUE', 'ING_BREAD', 'accompaniment', 8),
-- SUI_RACLETTE
('swiss', 'SUI_RACLETTE', 'ING_RACLETTE_CHEESE', 'main', 1),
('swiss', 'SUI_RACLETTE', 'ING_POTATO', 'accompaniment', 2),
('swiss', 'SUI_RACLETTE', 'ING_CORNICHONS', 'accompaniment', 3),
('swiss', 'SUI_RACLETTE', 'ING_PICKLED_ONION', 'accompaniment', 4),
('swiss', 'SUI_RACLETTE', 'ING_CURED_HAM', 'accompaniment', 5),
-- SUI_FONDUE_MOITIE
('swiss', 'SUI_FONDUE_MOITIE', 'ING_GRUYERE', 'main', 1),
('swiss', 'SUI_FONDUE_MOITIE', 'ING_VACHERIN', 'main', 2),
('swiss', 'SUI_FONDUE_MOITIE', 'ING_WHITE_WINE', 'liquid', 3),
('swiss', 'SUI_FONDUE_MOITIE', 'ING_KIRSCH', 'liquid', 4),
('swiss', 'SUI_FONDUE_MOITIE', 'ING_GARLIC', 'aromatic', 5),
('swiss', 'SUI_FONDUE_MOITIE', 'ING_BREAD', 'accompaniment', 6),
-- SUI_FONDUE_BOURGUIGNONNE
('swiss', 'SUI_FONDUE_BOURGUIGNONNE', 'ING_BEEF_TENDERLOIN', 'main', 1),
('swiss', 'SUI_FONDUE_BOURGUIGNONNE', 'ING_VEGETABLE_OIL', 'cooking_fat', 2),
('swiss', 'SUI_FONDUE_BOURGUIGNONNE', 'ING_MAYONNAISE', 'sauce', 3),
('swiss', 'SUI_FONDUE_BOURGUIGNONNE', 'ING_MUSTARD', 'sauce', 4),
('swiss', 'SUI_FONDUE_BOURGUIGNONNE', 'ING_KETCHUP', 'sauce', 5),
('swiss', 'SUI_FONDUE_BOURGUIGNONNE', 'ING_GARLIC_SAUCE', 'sauce', 6),
-- SUI_FONDUE_CHINOISE
('swiss', 'SUI_FONDUE_CHINOISE', 'ING_BEEF', 'main', 1),
('swiss', 'SUI_FONDUE_CHINOISE', 'ING_CHICKEN', 'main', 2),
('swiss', 'SUI_FONDUE_CHINOISE', 'ING_BEEF_BROTH', 'liquid', 3),
('swiss', 'SUI_FONDUE_CHINOISE', 'ING_SOY_SAUCE', 'seasoning', 4),
('swiss', 'SUI_FONDUE_CHINOISE', 'ING_GINGER', 'aromatic', 5),
('swiss', 'SUI_FONDUE_CHINOISE', 'ING_SCALLION', 'aromatic', 6);

-- MAINS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- SUI_GESCHNETZELTES
('swiss', 'SUI_GESCHNETZELTES', 'ING_VEAL', 'main', 1),
('swiss', 'SUI_GESCHNETZELTES', 'ING_MUSHROOM', 'main', 2),
('swiss', 'SUI_GESCHNETZELTES', 'ING_HEAVY_CREAM', 'sauce', 3),
('swiss', 'SUI_GESCHNETZELTES', 'ING_WHITE_WINE', 'liquid', 4),
('swiss', 'SUI_GESCHNETZELTES', 'ING_BUTTER', 'fat', 5),
('swiss', 'SUI_GESCHNETZELTES', 'ING_SHALLOT', 'aromatic', 6),
('swiss', 'SUI_GESCHNETZELTES', 'ING_FLOUR', 'thickener', 7),
('swiss', 'SUI_GESCHNETZELTES', 'ING_BEEF_BROTH', 'liquid', 8),
-- SUI_CORDON_BLEU
('swiss', 'SUI_CORDON_BLEU', 'ING_VEAL', 'main', 1),
('swiss', 'SUI_CORDON_BLEU', 'ING_HAM', 'filling', 2),
('swiss', 'SUI_CORDON_BLEU', 'ING_GRUYERE', 'filling', 3),
('swiss', 'SUI_CORDON_BLEU', 'ING_EGG', 'coating', 4),
('swiss', 'SUI_CORDON_BLEU', 'ING_BREADCRUMB', 'coating', 5),
('swiss', 'SUI_CORDON_BLEU', 'ING_FLOUR', 'coating', 6),
('swiss', 'SUI_CORDON_BLEU', 'ING_BUTTER', 'fat', 7),
-- SUI_CAPUNS
('swiss', 'SUI_CAPUNS', 'ING_FLOUR', 'dough', 1),
('swiss', 'SUI_CAPUNS', 'ING_EGG', 'dough', 2),
('swiss', 'SUI_CAPUNS', 'ING_MILK', 'liquid', 3),
('swiss', 'SUI_CAPUNS', 'ING_BUNDNERFLEISCH', 'filling', 4),
('swiss', 'SUI_CAPUNS', 'ING_SWISS_CHARD', 'wrapper', 5),
('swiss', 'SUI_CAPUNS', 'ING_HEAVY_CREAM', 'sauce', 6),
('swiss', 'SUI_CAPUNS', 'ING_CHEESE', 'topping', 7),
-- SUI_CHOLERA
('swiss', 'SUI_CHOLERA', 'ING_FLOUR', 'pastry', 1),
('swiss', 'SUI_CHOLERA', 'ING_BUTTER', 'pastry', 2),
('swiss', 'SUI_CHOLERA', 'ING_POTATO', 'filling', 3),
('swiss', 'SUI_CHOLERA', 'ING_APPLE', 'filling', 4),
('swiss', 'SUI_CHOLERA', 'ING_LEEK', 'filling', 5),
('swiss', 'SUI_CHOLERA', 'ING_ONION', 'filling', 6),
('swiss', 'SUI_CHOLERA', 'ING_CHEESE', 'filling', 7),
('swiss', 'SUI_CHOLERA', 'ING_HEAVY_CREAM', 'filling', 8),
-- SUI_PAPET_VAUDOIS
('swiss', 'SUI_PAPET_VAUDOIS', 'ING_LEEK', 'main', 1),
('swiss', 'SUI_PAPET_VAUDOIS', 'ING_POTATO', 'main', 2),
('swiss', 'SUI_PAPET_VAUDOIS', 'ING_SAUCISSE_CHOUX', 'protein', 3),
('swiss', 'SUI_PAPET_VAUDOIS', 'ING_BUTTER', 'fat', 4),
('swiss', 'SUI_PAPET_VAUDOIS', 'ING_HEAVY_CREAM', 'sauce', 5),
('swiss', 'SUI_PAPET_VAUDOIS', 'ING_WHITE_WINE', 'liquid', 6),
-- SUI_ALPLERMAGRONEN
('swiss', 'SUI_ALPLERMAGRONEN', 'ING_MACARONI', 'main', 1),
('swiss', 'SUI_ALPLERMAGRONEN', 'ING_POTATO', 'main', 2),
('swiss', 'SUI_ALPLERMAGRONEN', 'ING_GRUYERE', 'main', 3),
('swiss', 'SUI_ALPLERMAGRONEN', 'ING_HEAVY_CREAM', 'sauce', 4),
('swiss', 'SUI_ALPLERMAGRONEN', 'ING_ONION', 'topping', 5),
('swiss', 'SUI_ALPLERMAGRONEN', 'ING_BUTTER', 'fat', 6),
('swiss', 'SUI_ALPLERMAGRONEN', 'ING_APPLESAUCE', 'accompaniment', 7);

-- SIDES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- SUI_ROSTI
('swiss', 'SUI_ROSTI', 'ING_POTATO', 'main', 1),
('swiss', 'SUI_ROSTI', 'ING_BUTTER', 'fat', 2),
('swiss', 'SUI_ROSTI', 'ING_SALT', 'seasoning', 3),
('swiss', 'SUI_ROSTI', 'ING_BLACK_PEPPER', 'seasoning', 4),
-- SUI_ROSTI_CHEESE
('swiss', 'SUI_ROSTI_CHEESE', 'ING_POTATO', 'main', 1),
('swiss', 'SUI_ROSTI_CHEESE', 'ING_BUTTER', 'fat', 2),
('swiss', 'SUI_ROSTI_CHEESE', 'ING_GRUYERE', 'topping', 3),
('swiss', 'SUI_ROSTI_CHEESE', 'ING_SALT', 'seasoning', 4),
-- SUI_SPATZLE
('swiss', 'SUI_SPATZLE', 'ING_FLOUR', 'base', 1),
('swiss', 'SUI_SPATZLE', 'ING_EGG', 'base', 2),
('swiss', 'SUI_SPATZLE', 'ING_MILK', 'liquid', 3),
('swiss', 'SUI_SPATZLE', 'ING_SALT', 'seasoning', 4),
('swiss', 'SUI_SPATZLE', 'ING_NUTMEG', 'seasoning', 5),
('swiss', 'SUI_SPATZLE', 'ING_BUTTER', 'fat', 6),
-- SUI_KASESPATZLE
('swiss', 'SUI_KASESPATZLE', 'ING_FLOUR', 'base', 1),
('swiss', 'SUI_KASESPATZLE', 'ING_EGG', 'base', 2),
('swiss', 'SUI_KASESPATZLE', 'ING_MILK', 'liquid', 3),
('swiss', 'SUI_KASESPATZLE', 'ING_EMMENTAL', 'main', 4),
('swiss', 'SUI_KASESPATZLE', 'ING_ONION', 'topping', 5),
('swiss', 'SUI_KASESPATZLE', 'ING_BUTTER', 'fat', 6);

-- SAUSAGES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- SUI_CERVELAT
('swiss', 'SUI_CERVELAT', 'ING_BEEF', 'main', 1),
('swiss', 'SUI_CERVELAT', 'ING_PORK', 'main', 2),
('swiss', 'SUI_CERVELAT', 'ING_PORK_RIND', 'component', 3),
('swiss', 'SUI_CERVELAT', 'ING_SALT', 'seasoning', 4),
('swiss', 'SUI_CERVELAT', 'ING_CORIANDER', 'seasoning', 5),
('swiss', 'SUI_CERVELAT', 'ING_GARLIC', 'aromatic', 6),
-- SUI_BRATWURST
('swiss', 'SUI_BRATWURST', 'ING_VEAL', 'main', 1),
('swiss', 'SUI_BRATWURST', 'ING_PORK', 'main', 2),
('swiss', 'SUI_BRATWURST', 'ING_MILK', 'liquid', 3),
('swiss', 'SUI_BRATWURST', 'ING_BREAD_ROLL', 'accompaniment', 4),
('swiss', 'SUI_BRATWURST', 'ING_SALT', 'seasoning', 5),
('swiss', 'SUI_BRATWURST', 'ING_WHITE_PEPPER', 'seasoning', 6),
-- SUI_BUNDNERFLEISCH
('swiss', 'SUI_BUNDNERFLEISCH', 'ING_BEEF', 'main', 1),
('swiss', 'SUI_BUNDNERFLEISCH', 'ING_SALT', 'curing', 2),
('swiss', 'SUI_BUNDNERFLEISCH', 'ING_WHITE_WINE', 'curing', 3),
('swiss', 'SUI_BUNDNERFLEISCH', 'ING_ONION', 'aromatic', 4),
('swiss', 'SUI_BUNDNERFLEISCH', 'ING_BAY_LEAF', 'aromatic', 5),
('swiss', 'SUI_BUNDNERFLEISCH', 'ING_JUNIPER_BERRIES', 'seasoning', 6),
-- SUI_SAUCISSON_VAUDOIS
('swiss', 'SUI_SAUCISSON_VAUDOIS', 'ING_PORK', 'main', 1),
('swiss', 'SUI_SAUCISSON_VAUDOIS', 'ING_PORK_BELLY', 'main', 2),
('swiss', 'SUI_SAUCISSON_VAUDOIS', 'ING_SALT', 'seasoning', 3),
('swiss', 'SUI_SAUCISSON_VAUDOIS', 'ING_BLACK_PEPPER', 'seasoning', 4),
('swiss', 'SUI_SAUCISSON_VAUDOIS', 'ING_GARLIC', 'aromatic', 5),
('swiss', 'SUI_SAUCISSON_VAUDOIS', 'ING_WHITE_WINE', 'liquid', 6),
-- SUI_LONGEOLE
('swiss', 'SUI_LONGEOLE', 'ING_PORK', 'main', 1),
('swiss', 'SUI_LONGEOLE', 'ING_PORK_RIND', 'component', 2),
('swiss', 'SUI_LONGEOLE', 'ING_FENNEL_SEED', 'seasoning', 3),
('swiss', 'SUI_LONGEOLE', 'ING_SALT', 'seasoning', 4),
('swiss', 'SUI_LONGEOLE', 'ING_BLACK_PEPPER', 'seasoning', 5),
('swiss', 'SUI_LONGEOLE', 'ING_LENTILS', 'accompaniment', 6);

-- SOUPS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- SUI_GERSTENSUPPE
('swiss', 'SUI_GERSTENSUPPE', 'ING_BARLEY', 'main', 1),
('swiss', 'SUI_GERSTENSUPPE', 'ING_BUNDNERFLEISCH', 'protein', 2),
('swiss', 'SUI_GERSTENSUPPE', 'ING_BACON', 'protein', 3),
('swiss', 'SUI_GERSTENSUPPE', 'ING_CARROT', 'vegetable', 4),
('swiss', 'SUI_GERSTENSUPPE', 'ING_CELERY', 'vegetable', 5),
('swiss', 'SUI_GERSTENSUPPE', 'ING_LEEK', 'vegetable', 6),
('swiss', 'SUI_GERSTENSUPPE', 'ING_POTATO', 'vegetable', 7),
('swiss', 'SUI_GERSTENSUPPE', 'ING_HEAVY_CREAM', 'enrichment', 8),
('swiss', 'SUI_GERSTENSUPPE', 'ING_BAY_LEAF', 'aromatic', 9),
-- SUI_BASLER_MEHLSUPPE
('swiss', 'SUI_BASLER_MEHLSUPPE', 'ING_FLOUR', 'base', 1),
('swiss', 'SUI_BASLER_MEHLSUPPE', 'ING_BUTTER', 'fat', 2),
('swiss', 'SUI_BASLER_MEHLSUPPE', 'ING_ONION', 'aromatic', 3),
('swiss', 'SUI_BASLER_MEHLSUPPE', 'ING_BEEF_BROTH', 'liquid', 4),
('swiss', 'SUI_BASLER_MEHLSUPPE', 'ING_GRUYERE', 'topping', 5),
('swiss', 'SUI_BASLER_MEHLSUPPE', 'ING_BLACK_PEPPER', 'seasoning', 6),
-- SUI_ZWIEBELSUPPE
('swiss', 'SUI_ZWIEBELSUPPE', 'ING_ONION', 'main', 1),
('swiss', 'SUI_ZWIEBELSUPPE', 'ING_BUTTER', 'fat', 2),
('swiss', 'SUI_ZWIEBELSUPPE', 'ING_WHITE_WINE', 'liquid', 3),
('swiss', 'SUI_ZWIEBELSUPPE', 'ING_BEEF_BROTH', 'liquid', 4),
('swiss', 'SUI_ZWIEBELSUPPE', 'ING_BREAD', 'topping', 5),
('swiss', 'SUI_ZWIEBELSUPPE', 'ING_GRUYERE', 'topping', 6),
('swiss', 'SUI_ZWIEBELSUPPE', 'ING_THYME', 'aromatic', 7);

-- DESSERTS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- SUI_KIRSCHTORTE
('swiss', 'SUI_KIRSCHTORTE', 'ING_FLOUR', 'cake', 1),
('swiss', 'SUI_KIRSCHTORTE', 'ING_EGG', 'cake', 2),
('swiss', 'SUI_KIRSCHTORTE', 'ING_SUGAR', 'sweetener', 3),
('swiss', 'SUI_KIRSCHTORTE', 'ING_BUTTER', 'fat', 4),
('swiss', 'SUI_KIRSCHTORTE', 'ING_KIRSCH', 'flavoring', 5),
('swiss', 'SUI_KIRSCHTORTE', 'ING_ALMOND', 'filling', 6),
('swiss', 'SUI_KIRSCHTORTE', 'ING_HAZELNUTS', 'filling', 7),
('swiss', 'SUI_KIRSCHTORTE', 'ING_MARZIPAN', 'topping', 8),
-- SUI_NUSSTORTE
('swiss', 'SUI_NUSSTORTE', 'ING_FLOUR', 'pastry', 1),
('swiss', 'SUI_NUSSTORTE', 'ING_BUTTER', 'pastry', 2),
('swiss', 'SUI_NUSSTORTE', 'ING_EGG', 'pastry', 3),
('swiss', 'SUI_NUSSTORTE', 'ING_SUGAR', 'sweetener', 4),
('swiss', 'SUI_NUSSTORTE', 'ING_WALNUT', 'filling', 5),
('swiss', 'SUI_NUSSTORTE', 'ING_HEAVY_CREAM', 'filling', 6),
('swiss', 'SUI_NUSSTORTE', 'ING_HONEY', 'filling', 7),
-- SUI_VERMICELLES
('swiss', 'SUI_VERMICELLES', 'ING_CHESTNUTS', 'main', 1),
('swiss', 'SUI_VERMICELLES', 'ING_SUGAR', 'sweetener', 2),
('swiss', 'SUI_VERMICELLES', 'ING_VANILLA', 'flavoring', 3),
('swiss', 'SUI_VERMICELLES', 'ING_KIRSCH', 'flavoring', 4),
('swiss', 'SUI_VERMICELLES', 'ING_HEAVY_CREAM', 'topping', 5),
('swiss', 'SUI_VERMICELLES', 'ING_MERINGUE', 'topping', 6),
-- SUI_MERINGUE_CREAM
('swiss', 'SUI_MERINGUE_CREAM', 'ING_EGG_WHITE', 'meringue', 1),
('swiss', 'SUI_MERINGUE_CREAM', 'ING_SUGAR', 'meringue', 2),
('swiss', 'SUI_MERINGUE_CREAM', 'ING_DOUBLE_CREAM', 'accompaniment', 3),
('swiss', 'SUI_MERINGUE_CREAM', 'ING_VANILLA', 'flavoring', 4),
-- SUI_RUEBLITORTE
('swiss', 'SUI_RUEBLITORTE', 'ING_CARROT', 'main', 1),
('swiss', 'SUI_RUEBLITORTE', 'ING_ALMOND', 'main', 2),
('swiss', 'SUI_RUEBLITORTE', 'ING_EGG', 'binder', 3),
('swiss', 'SUI_RUEBLITORTE', 'ING_SUGAR', 'sweetener', 4),
('swiss', 'SUI_RUEBLITORTE', 'ING_FLOUR', 'base', 5),
('swiss', 'SUI_RUEBLITORTE', 'ING_LEMON', 'flavoring', 6),
('swiss', 'SUI_RUEBLITORTE', 'ING_CINNAMON', 'spice', 7),
('swiss', 'SUI_RUEBLITORTE', 'ING_MARZIPAN', 'decoration', 8),
-- SUI_SCHOKOLADE
('swiss', 'SUI_SCHOKOLADE', 'ING_DARK_CHOCOLATE', 'main', 1),
('swiss', 'SUI_SCHOKOLADE', 'ING_HEAVY_CREAM', 'ganache', 2),
('swiss', 'SUI_SCHOKOLADE', 'ING_BUTTER', 'ganache', 3),
('swiss', 'SUI_SCHOKOLADE', 'ING_COCOA_POWDER', 'coating', 4),
('swiss', 'SUI_SCHOKOLADE', 'ING_VANILLA', 'flavoring', 5);

-- PASTRIES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- SUI_LACKERLI
('swiss', 'SUI_LACKERLI', 'ING_FLOUR', 'base', 1),
('swiss', 'SUI_LACKERLI', 'ING_HONEY', 'sweetener', 2),
('swiss', 'SUI_LACKERLI', 'ING_ALMOND', 'main', 3),
('swiss', 'SUI_LACKERLI', 'ING_CANDIED_ORANGE', 'filling', 4),
('swiss', 'SUI_LACKERLI', 'ING_CANDIED_LEMON', 'filling', 5),
('swiss', 'SUI_LACKERLI', 'ING_CINNAMON', 'spice', 6),
('swiss', 'SUI_LACKERLI', 'ING_NUTMEG', 'spice', 7),
('swiss', 'SUI_LACKERLI', 'ING_CLOVE', 'spice', 8),
('swiss', 'SUI_LACKERLI', 'ING_KIRSCH', 'glaze', 9),
-- SUI_BIRNBROT
('swiss', 'SUI_BIRNBROT', 'ING_FLOUR', 'dough', 1),
('swiss', 'SUI_BIRNBROT', 'ING_BUTTER', 'dough', 2),
('swiss', 'SUI_BIRNBROT', 'ING_DRIED_PEAR', 'filling', 3),
('swiss', 'SUI_BIRNBROT', 'ING_WALNUT', 'filling', 4),
('swiss', 'SUI_BIRNBROT', 'ING_FIGS', 'filling', 5),
('swiss', 'SUI_BIRNBROT', 'ING_RAISIN', 'filling', 6),
('swiss', 'SUI_BIRNBROT', 'ING_CINNAMON', 'spice', 7),
('swiss', 'SUI_BIRNBROT', 'ING_STAR_ANISE', 'spice', 8),
-- SUI_GIPFELI
('swiss', 'SUI_GIPFELI', 'ING_FLOUR', 'dough', 1),
('swiss', 'SUI_GIPFELI', 'ING_BUTTER', 'lamination', 2),
('swiss', 'SUI_GIPFELI', 'ING_YEAST', 'leavening', 3),
('swiss', 'SUI_GIPFELI', 'ING_MILK', 'liquid', 4),
('swiss', 'SUI_GIPFELI', 'ING_EGG', 'enrichment', 5),
('swiss', 'SUI_GIPFELI', 'ING_SUGAR', 'sweetener', 6),
('swiss', 'SUI_GIPFELI', 'ING_SALT', 'seasoning', 7),
-- SUI_ZOPF
('swiss', 'SUI_ZOPF', 'ING_FLOUR', 'dough', 1),
('swiss', 'SUI_ZOPF', 'ING_BUTTER', 'enrichment', 2),
('swiss', 'SUI_ZOPF', 'ING_EGG', 'enrichment', 3),
('swiss', 'SUI_ZOPF', 'ING_MILK', 'liquid', 4),
('swiss', 'SUI_ZOPF', 'ING_YEAST', 'leavening', 5),
('swiss', 'SUI_ZOPF', 'ING_SALT', 'seasoning', 6),
('swiss', 'SUI_ZOPF', 'ING_SUGAR', 'sweetener', 7),
-- SUI_MAILANDELI
('swiss', 'SUI_MAILANDELI', 'ING_FLOUR', 'base', 1),
('swiss', 'SUI_MAILANDELI', 'ING_BUTTER', 'fat', 2),
('swiss', 'SUI_MAILANDELI', 'ING_SUGAR', 'sweetener', 3),
('swiss', 'SUI_MAILANDELI', 'ING_EGG', 'binder', 4),
('swiss', 'SUI_MAILANDELI', 'ING_LEMON', 'flavoring', 5),
('swiss', 'SUI_MAILANDELI', 'ING_VANILLA', 'flavoring', 6),
-- SUI_BRUNSLI
('swiss', 'SUI_BRUNSLI', 'ING_ALMOND', 'base', 1),
('swiss', 'SUI_BRUNSLI', 'ING_SUGAR', 'sweetener', 2),
('swiss', 'SUI_BRUNSLI', 'ING_DARK_CHOCOLATE', 'main', 3),
('swiss', 'SUI_BRUNSLI', 'ING_EGG_WHITE', 'binder', 4),
('swiss', 'SUI_BRUNSLI', 'ING_CINNAMON', 'spice', 5),
('swiss', 'SUI_BRUNSLI', 'ING_CLOVE', 'spice', 6),
('swiss', 'SUI_BRUNSLI', 'ING_KIRSCH', 'flavoring', 7);

-- BREAKFAST
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order) VALUES
-- SUI_BIRCHERMUESLI
('swiss', 'SUI_BIRCHERMUESLI', 'ING_ROLLED_OAT', 'base', 1),
('swiss', 'SUI_BIRCHERMUESLI', 'ING_APPLE', 'fruit', 2),
('swiss', 'SUI_BIRCHERMUESLI', 'ING_LEMON', 'acid', 3),
('swiss', 'SUI_BIRCHERMUESLI', 'ING_HAZELNUTS', 'nut', 4),
('swiss', 'SUI_BIRCHERMUESLI', 'ING_HEAVY_CREAM', 'enrichment', 5),
('swiss', 'SUI_BIRCHERMUESLI', 'ING_HONEY', 'sweetener', 6),
('swiss', 'SUI_BIRCHERMUESLI', 'ING_YOGURT', 'dairy', 7),
-- SUI_ROSTI_EGG
('swiss', 'SUI_ROSTI_EGG', 'ING_POTATO', 'base', 1),
('swiss', 'SUI_ROSTI_EGG', 'ING_BUTTER', 'fat', 2),
('swiss', 'SUI_ROSTI_EGG', 'ING_EGG', 'protein', 3),
('swiss', 'SUI_ROSTI_EGG', 'ING_SALT', 'seasoning', 4),
('swiss', 'SUI_ROSTI_EGG', 'ING_BLACK_PEPPER', 'seasoning', 5),
-- SUI_ROSTI_BACON
('swiss', 'SUI_ROSTI_BACON', 'ING_POTATO', 'base', 1),
('swiss', 'SUI_ROSTI_BACON', 'ING_BACON', 'protein', 2),
('swiss', 'SUI_ROSTI_BACON', 'ING_BUTTER', 'fat', 3),
('swiss', 'SUI_ROSTI_BACON', 'ING_ONION', 'aromatic', 4),
('swiss', 'SUI_ROSTI_BACON', 'ING_SALT', 'seasoning', 5);

-- Verification
SELECT 'Product ingredients links: ' || COUNT(*) as total FROM product_ingredients WHERE product_type = 'swiss';
SELECT product_id, COUNT(*) as ingredient_count
FROM product_ingredients
WHERE product_type = 'swiss'
GROUP BY product_id
ORDER BY product_id;
