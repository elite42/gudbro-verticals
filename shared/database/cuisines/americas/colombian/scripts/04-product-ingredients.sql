-- Colombian Cuisine Database - Script 04: Product Ingredients
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- Total: 45 dishes, ~290 ingredient links

-- Clear existing links
DELETE FROM product_ingredients WHERE product_type = 'colombian';

-- ===========================================
-- SOUPS (6 dishes)
-- ===========================================

-- COL_AJIACO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_AJIACO', 'ING_CHICKEN'),
('colombian', 'COL_AJIACO', 'ING_POTATO'),
('colombian', 'COL_AJIACO', 'ING_CORN'),
('colombian', 'COL_AJIACO', 'ING_HEAVY_CREAM'),
('colombian', 'COL_AJIACO', 'ING_CAPERS'),
('colombian', 'COL_AJIACO', 'ING_AVOCADO'),
('colombian', 'COL_AJIACO', 'ING_SCALLION'),
('colombian', 'COL_AJIACO', 'ING_GARLIC');

-- COL_SANCOCHO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_SANCOCHO', 'ING_CHICKEN'),
('colombian', 'COL_SANCOCHO', 'ING_BEEF'),
('colombian', 'COL_SANCOCHO', 'ING_YUCA'),
('colombian', 'COL_SANCOCHO', 'ING_PLANTAIN'),
('colombian', 'COL_SANCOCHO', 'ING_CORN'),
('colombian', 'COL_SANCOCHO', 'ING_POTATO'),
('colombian', 'COL_SANCOCHO', 'ING_CILANTRO'),
('colombian', 'COL_SANCOCHO', 'ING_ONION'),
('colombian', 'COL_SANCOCHO', 'ING_GARLIC');

-- COL_MONDONGO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_MONDONGO', 'ING_TRIPE'),
('colombian', 'COL_MONDONGO', 'ING_CHORIZO'),
('colombian', 'COL_MONDONGO', 'ING_POTATO'),
('colombian', 'COL_MONDONGO', 'ING_CARROT'),
('colombian', 'COL_MONDONGO', 'ING_CHICKPEA'),
('colombian', 'COL_MONDONGO', 'ING_ONION'),
('colombian', 'COL_MONDONGO', 'ING_GARLIC'),
('colombian', 'COL_MONDONGO', 'ING_CILANTRO'),
('colombian', 'COL_MONDONGO', 'ING_CUMIN');

-- COL_CUCHUCO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CUCHUCO', 'ING_WHEAT'),
('colombian', 'COL_CUCHUCO', 'ING_PORK_RIBS'),
('colombian', 'COL_CUCHUCO', 'ING_FAVA_BEAN'),
('colombian', 'COL_CUCHUCO', 'ING_PEA'),
('colombian', 'COL_CUCHUCO', 'ING_POTATO'),
('colombian', 'COL_CUCHUCO', 'ING_CABBAGE'),
('colombian', 'COL_CUCHUCO', 'ING_ONION'),
('colombian', 'COL_CUCHUCO', 'ING_GARLIC');

-- COL_CHANGUA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CHANGUA', 'ING_MILK'),
('colombian', 'COL_CHANGUA', 'ING_EGG'),
('colombian', 'COL_CHANGUA', 'ING_SCALLION'),
('colombian', 'COL_CHANGUA', 'ING_CILANTRO'),
('colombian', 'COL_CHANGUA', 'ING_SALT'),
('colombian', 'COL_CHANGUA', 'ING_BREAD');

-- COL_SOPA_COSTILLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_SOPA_COSTILLA', 'ING_BEEF_RIBS'),
('colombian', 'COL_SOPA_COSTILLA', 'ING_POTATO'),
('colombian', 'COL_SOPA_COSTILLA', 'ING_CARROT'),
('colombian', 'COL_SOPA_COSTILLA', 'ING_ONION'),
('colombian', 'COL_SOPA_COSTILLA', 'ING_GARLIC'),
('colombian', 'COL_SOPA_COSTILLA', 'ING_CILANTRO'),
('colombian', 'COL_SOPA_COSTILLA', 'ING_CUMIN');

-- ===========================================
-- MAINS (8 dishes)
-- ===========================================

-- COL_BANDEJA_PAISA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_BANDEJA_PAISA', 'ING_RED_BEAN'),
('colombian', 'COL_BANDEJA_PAISA', 'ING_RICE'),
('colombian', 'COL_BANDEJA_PAISA', 'ING_PORK_BELLY'),
('colombian', 'COL_BANDEJA_PAISA', 'ING_CHORIZO'),
('colombian', 'COL_BANDEJA_PAISA', 'ING_EGG'),
('colombian', 'COL_BANDEJA_PAISA', 'ING_PLANTAIN'),
('colombian', 'COL_BANDEJA_PAISA', 'ING_AVOCADO'),
('colombian', 'COL_BANDEJA_PAISA', 'ING_AREPA'),
('colombian', 'COL_BANDEJA_PAISA', 'ING_BEEF');

-- COL_LECHONA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_LECHONA', 'ING_PORK'),
('colombian', 'COL_LECHONA', 'ING_RICE'),
('colombian', 'COL_LECHONA', 'ING_PEA'),
('colombian', 'COL_LECHONA', 'ING_ONION'),
('colombian', 'COL_LECHONA', 'ING_GARLIC'),
('colombian', 'COL_LECHONA', 'ING_CUMIN'),
('colombian', 'COL_LECHONA', 'ING_SCALLION');

-- COL_SUDADO_POLLO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_SUDADO_POLLO', 'ING_CHICKEN'),
('colombian', 'COL_SUDADO_POLLO', 'ING_TOMATO'),
('colombian', 'COL_SUDADO_POLLO', 'ING_POTATO'),
('colombian', 'COL_SUDADO_POLLO', 'ING_ONION'),
('colombian', 'COL_SUDADO_POLLO', 'ING_BELL_PEPPER'),
('colombian', 'COL_SUDADO_POLLO', 'ING_GARLIC'),
('colombian', 'COL_SUDADO_POLLO', 'ING_CUMIN'),
('colombian', 'COL_SUDADO_POLLO', 'ING_CILANTRO');

-- COL_SUDADO_CARNE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_SUDADO_CARNE', 'ING_BEEF'),
('colombian', 'COL_SUDADO_CARNE', 'ING_TOMATO'),
('colombian', 'COL_SUDADO_CARNE', 'ING_POTATO'),
('colombian', 'COL_SUDADO_CARNE', 'ING_ONION'),
('colombian', 'COL_SUDADO_CARNE', 'ING_BELL_PEPPER'),
('colombian', 'COL_SUDADO_CARNE', 'ING_GARLIC'),
('colombian', 'COL_SUDADO_CARNE', 'ING_CUMIN'),
('colombian', 'COL_SUDADO_CARNE', 'ING_CILANTRO');

-- COL_CARNE_OREADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CARNE_OREADA', 'ING_BEEF'),
('colombian', 'COL_CARNE_OREADA', 'ING_SALT'),
('colombian', 'COL_CARNE_OREADA', 'ING_YUCA'),
('colombian', 'COL_CARNE_OREADA', 'ING_LIME');

-- COL_CABRITO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CABRITO', 'ING_GOAT'),
('colombian', 'COL_CABRITO', 'ING_GARLIC'),
('colombian', 'COL_CABRITO', 'ING_CUMIN'),
('colombian', 'COL_CABRITO', 'ING_ONION'),
('colombian', 'COL_CABRITO', 'ING_BEER'),
('colombian', 'COL_CABRITO', 'ING_SALT');

-- COL_VIUDO_PESCADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_VIUDO_PESCADO', 'ING_WHITE_FISH'),
('colombian', 'COL_VIUDO_PESCADO', 'ING_YUCA'),
('colombian', 'COL_VIUDO_PESCADO', 'ING_PLANTAIN'),
('colombian', 'COL_VIUDO_PESCADO', 'ING_TOMATO'),
('colombian', 'COL_VIUDO_PESCADO', 'ING_ONION'),
('colombian', 'COL_VIUDO_PESCADO', 'ING_CILANTRO'),
('colombian', 'COL_VIUDO_PESCADO', 'ING_GARLIC');

-- COL_SOBREBARRIGA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_SOBREBARRIGA', 'ING_BEEF_FLANK'),
('colombian', 'COL_SOBREBARRIGA', 'ING_TOMATO'),
('colombian', 'COL_SOBREBARRIGA', 'ING_ONION'),
('colombian', 'COL_SOBREBARRIGA', 'ING_GARLIC'),
('colombian', 'COL_SOBREBARRIGA', 'ING_BEER'),
('colombian', 'COL_SOBREBARRIGA', 'ING_POTATO'),
('colombian', 'COL_SOBREBARRIGA', 'ING_CUMIN'),
('colombian', 'COL_SOBREBARRIGA', 'ING_BAY_LEAF');

-- ===========================================
-- BREAKFAST (5 dishes)
-- ===========================================

-- COL_CALENTADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CALENTADO', 'ING_RICE'),
('colombian', 'COL_CALENTADO', 'ING_RED_BEAN'),
('colombian', 'COL_CALENTADO', 'ING_EGG'),
('colombian', 'COL_CALENTADO', 'ING_AREPA'),
('colombian', 'COL_CALENTADO', 'ING_CHORIZO'),
('colombian', 'COL_CALENTADO', 'ING_VEGETABLE_OIL');

-- COL_HUEVOS_PERICOS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_HUEVOS_PERICOS', 'ING_EGG'),
('colombian', 'COL_HUEVOS_PERICOS', 'ING_TOMATO'),
('colombian', 'COL_HUEVOS_PERICOS', 'ING_SCALLION'),
('colombian', 'COL_HUEVOS_PERICOS', 'ING_BUTTER'),
('colombian', 'COL_HUEVOS_PERICOS', 'ING_SALT');

-- COL_TAMAL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_TAMAL', 'ING_CORN_FLOUR'),
('colombian', 'COL_TAMAL', 'ING_CHICKEN'),
('colombian', 'COL_TAMAL', 'ING_PORK'),
('colombian', 'COL_TAMAL', 'ING_CARROT'),
('colombian', 'COL_TAMAL', 'ING_PEA'),
('colombian', 'COL_TAMAL', 'ING_ONION'),
('colombian', 'COL_TAMAL', 'ING_GARLIC'),
('colombian', 'COL_TAMAL', 'ING_CUMIN'),
('colombian', 'COL_TAMAL', 'ING_BANANA_LEAF');

-- COL_CHOCOLATE_QUESO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CHOCOLATE_QUESO', 'ING_CHOCOLATE'),
('colombian', 'COL_CHOCOLATE_QUESO', 'ING_MILK'),
('colombian', 'COL_CHOCOLATE_QUESO', 'ING_FRESH_CHEESE'),
('colombian', 'COL_CHOCOLATE_QUESO', 'ING_SUGAR');

-- COL_CALDO_COSTILLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CALDO_COSTILLA', 'ING_BEEF_RIBS'),
('colombian', 'COL_CALDO_COSTILLA', 'ING_POTATO'),
('colombian', 'COL_CALDO_COSTILLA', 'ING_CILANTRO'),
('colombian', 'COL_CALDO_COSTILLA', 'ING_ONION'),
('colombian', 'COL_CALDO_COSTILLA', 'ING_GARLIC'),
('colombian', 'COL_CALDO_COSTILLA', 'ING_SALT');

-- ===========================================
-- STREET FOOD (8 dishes)
-- ===========================================

-- COL_AREPA_QUESO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_AREPA_QUESO', 'ING_AREPA'),
('colombian', 'COL_AREPA_QUESO', 'ING_MOZZARELLA'),
('colombian', 'COL_AREPA_QUESO', 'ING_BUTTER');

-- COL_AREPA_HUEVO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_AREPA_HUEVO', 'ING_CORN_FLOUR'),
('colombian', 'COL_AREPA_HUEVO', 'ING_EGG'),
('colombian', 'COL_AREPA_HUEVO', 'ING_VEGETABLE_OIL'),
('colombian', 'COL_AREPA_HUEVO', 'ING_SALT');

-- COL_EMPANADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_EMPANADA', 'ING_CORN_FLOUR'),
('colombian', 'COL_EMPANADA', 'ING_BEEF'),
('colombian', 'COL_EMPANADA', 'ING_POTATO'),
('colombian', 'COL_EMPANADA', 'ING_ONION'),
('colombian', 'COL_EMPANADA', 'ING_CUMIN'),
('colombian', 'COL_EMPANADA', 'ING_GARLIC'),
('colombian', 'COL_EMPANADA', 'ING_VEGETABLE_OIL');

-- COL_PATACON
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_PATACON', 'ING_PLANTAIN'),
('colombian', 'COL_PATACON', 'ING_VEGETABLE_OIL'),
('colombian', 'COL_PATACON', 'ING_SALT');

-- COL_BUÑUELO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_BUÑUELO', 'ING_FRESH_CHEESE'),
('colombian', 'COL_BUÑUELO', 'ING_CORN_STARCH'),
('colombian', 'COL_BUÑUELO', 'ING_EGG'),
('colombian', 'COL_BUÑUELO', 'ING_SUGAR'),
('colombian', 'COL_BUÑUELO', 'ING_VEGETABLE_OIL');

-- COL_PANDEBONO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_PANDEBONO', 'ING_TAPIOCA_STARCH'),
('colombian', 'COL_PANDEBONO', 'ING_FRESH_CHEESE'),
('colombian', 'COL_PANDEBONO', 'ING_CORN_FLOUR'),
('colombian', 'COL_PANDEBONO', 'ING_EGG'),
('colombian', 'COL_PANDEBONO', 'ING_BUTTER');

-- COL_ALMOJABANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_ALMOJABANA', 'ING_CORN_FLOUR'),
('colombian', 'COL_ALMOJABANA', 'ING_FRESH_CHEESE'),
('colombian', 'COL_ALMOJABANA', 'ING_EGG'),
('colombian', 'COL_ALMOJABANA', 'ING_BUTTER'),
('colombian', 'COL_ALMOJABANA', 'ING_SUGAR');

-- COL_CHORIZO_ABORRAJADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CHORIZO_ABORRAJADO', 'ING_CHORIZO'),
('colombian', 'COL_CHORIZO_ABORRAJADO', 'ING_FLOUR'),
('colombian', 'COL_CHORIZO_ABORRAJADO', 'ING_EGG'),
('colombian', 'COL_CHORIZO_ABORRAJADO', 'ING_VEGETABLE_OIL');

-- ===========================================
-- SEAFOOD (5 dishes)
-- ===========================================

-- COL_ARROZ_COCO_PESCADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_ARROZ_COCO_PESCADO', 'ING_RICE'),
('colombian', 'COL_ARROZ_COCO_PESCADO', 'ING_COCONUT_MILK'),
('colombian', 'COL_ARROZ_COCO_PESCADO', 'ING_WHITE_FISH'),
('colombian', 'COL_ARROZ_COCO_PESCADO', 'ING_PLANTAIN'),
('colombian', 'COL_ARROZ_COCO_PESCADO', 'ING_LIME'),
('colombian', 'COL_ARROZ_COCO_PESCADO', 'ING_GARLIC'),
('colombian', 'COL_ARROZ_COCO_PESCADO', 'ING_SALT');

-- COL_CAZUELA_MARISCOS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CAZUELA_MARISCOS', 'ING_SHRIMP'),
('colombian', 'COL_CAZUELA_MARISCOS', 'ING_WHITE_FISH'),
('colombian', 'COL_CAZUELA_MARISCOS', 'ING_OCTOPUS'),
('colombian', 'COL_CAZUELA_MARISCOS', 'ING_COCONUT_MILK'),
('colombian', 'COL_CAZUELA_MARISCOS', 'ING_HEAVY_CREAM'),
('colombian', 'COL_CAZUELA_MARISCOS', 'ING_TOMATO'),
('colombian', 'COL_CAZUELA_MARISCOS', 'ING_ONION'),
('colombian', 'COL_CAZUELA_MARISCOS', 'ING_GARLIC');

-- COL_CEVICHE_CAMARONES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CEVICHE_CAMARONES', 'ING_SHRIMP'),
('colombian', 'COL_CEVICHE_CAMARONES', 'ING_LIME'),
('colombian', 'COL_CEVICHE_CAMARONES', 'ING_TOMATO'),
('colombian', 'COL_CEVICHE_CAMARONES', 'ING_ONION'),
('colombian', 'COL_CEVICHE_CAMARONES', 'ING_CILANTRO'),
('colombian', 'COL_CEVICHE_CAMARONES', 'ING_KETCHUP'),
('colombian', 'COL_CEVICHE_CAMARONES', 'ING_SALT');

-- COL_MOJARRA_FRITA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_MOJARRA_FRITA', 'ING_TILAPIA'),
('colombian', 'COL_MOJARRA_FRITA', 'ING_LIME'),
('colombian', 'COL_MOJARRA_FRITA', 'ING_GARLIC'),
('colombian', 'COL_MOJARRA_FRITA', 'ING_SALT'),
('colombian', 'COL_MOJARRA_FRITA', 'ING_VEGETABLE_OIL'),
('colombian', 'COL_MOJARRA_FRITA', 'ING_PLANTAIN');

-- COL_COCTEL_CAMARONES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_COCTEL_CAMARONES', 'ING_SHRIMP'),
('colombian', 'COL_COCTEL_CAMARONES', 'ING_KETCHUP'),
('colombian', 'COL_COCTEL_CAMARONES', 'ING_MAYONNAISE'),
('colombian', 'COL_COCTEL_CAMARONES', 'ING_LIME'),
('colombian', 'COL_COCTEL_CAMARONES', 'ING_AVOCADO'),
('colombian', 'COL_COCTEL_CAMARONES', 'ING_ONION'),
('colombian', 'COL_COCTEL_CAMARONES', 'ING_CILANTRO');

-- ===========================================
-- DESSERTS (7 dishes)
-- ===========================================

-- COL_AREQUIPE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_AREQUIPE', 'ING_MILK'),
('colombian', 'COL_AREQUIPE', 'ING_SUGAR'),
('colombian', 'COL_AREQUIPE', 'ING_VANILLA');

-- COL_OBLEAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_OBLEAS', 'ING_WAFER'),
('colombian', 'COL_OBLEAS', 'ING_DULCE_DE_LECHE'),
('colombian', 'COL_OBLEAS', 'ING_CHEESE'),
('colombian', 'COL_OBLEAS', 'ING_COCONUT'),
('colombian', 'COL_OBLEAS', 'ING_CHOCOLATE');

-- COL_NATILLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_NATILLA', 'ING_MILK'),
('colombian', 'COL_NATILLA', 'ING_CORN_STARCH'),
('colombian', 'COL_NATILLA', 'ING_SUGAR'),
('colombian', 'COL_NATILLA', 'ING_CINNAMON'),
('colombian', 'COL_NATILLA', 'ING_COCONUT');

-- COL_TRES_LECHES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_TRES_LECHES', 'ING_FLOUR'),
('colombian', 'COL_TRES_LECHES', 'ING_EGG'),
('colombian', 'COL_TRES_LECHES', 'ING_SUGAR'),
('colombian', 'COL_TRES_LECHES', 'ING_MILK'),
('colombian', 'COL_TRES_LECHES', 'ING_CONDENSED_MILK'),
('colombian', 'COL_TRES_LECHES', 'ING_HEAVY_CREAM'),
('colombian', 'COL_TRES_LECHES', 'ING_VANILLA');

-- COL_POSTRE_NATAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_POSTRE_NATAS', 'ING_MILK'),
('colombian', 'COL_POSTRE_NATAS', 'ING_SUGAR'),
('colombian', 'COL_POSTRE_NATAS', 'ING_CINNAMON'),
('colombian', 'COL_POSTRE_NATAS', 'ING_VANILLA');

-- COL_BOCADILLO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_BOCADILLO', 'ING_GUAVA'),
('colombian', 'COL_BOCADILLO', 'ING_SUGAR');

-- COL_ARROZ_LECHE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_ARROZ_LECHE', 'ING_RICE'),
('colombian', 'COL_ARROZ_LECHE', 'ING_MILK'),
('colombian', 'COL_ARROZ_LECHE', 'ING_SUGAR'),
('colombian', 'COL_ARROZ_LECHE', 'ING_CINNAMON'),
('colombian', 'COL_ARROZ_LECHE', 'ING_RAISIN'),
('colombian', 'COL_ARROZ_LECHE', 'ING_CONDENSED_MILK');

-- ===========================================
-- BEVERAGES (6 dishes)
-- ===========================================

-- COL_AGUAPANELA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_AGUAPANELA', 'ING_PANELA'),
('colombian', 'COL_AGUAPANELA', 'ING_WATER'),
('colombian', 'COL_AGUAPANELA', 'ING_LIME');

-- COL_LULADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_LULADA', 'ING_LULO'),
('colombian', 'COL_LULADA', 'ING_SUGAR'),
('colombian', 'COL_LULADA', 'ING_LIME'),
('colombian', 'COL_LULADA', 'ING_WATER'),
('colombian', 'COL_LULADA', 'ING_ICE');

-- COL_CHOLADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CHOLADO', 'ING_ICE'),
('colombian', 'COL_CHOLADO', 'ING_MANGO'),
('colombian', 'COL_CHOLADO', 'ING_PINEAPPLE'),
('colombian', 'COL_CHOLADO', 'ING_STRAWBERRY'),
('colombian', 'COL_CHOLADO', 'ING_CONDENSED_MILK'),
('colombian', 'COL_CHOLADO', 'ING_COCONUT');

-- COL_JUGO_GUANABANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_JUGO_GUANABANA', 'ING_SOURSOP'),
('colombian', 'COL_JUGO_GUANABANA', 'ING_MILK'),
('colombian', 'COL_JUGO_GUANABANA', 'ING_SUGAR'),
('colombian', 'COL_JUGO_GUANABANA', 'ING_ICE');

-- COL_CHICHA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_CHICHA', 'ING_CORN'),
('colombian', 'COL_CHICHA', 'ING_PANELA'),
('colombian', 'COL_CHICHA', 'ING_WATER');

-- COL_REFAJO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('colombian', 'COL_REFAJO', 'ING_BEER'),
('colombian', 'COL_REFAJO', 'ING_COLA');

-- Success message
SELECT 'Colombian product_ingredients inserted: 45 dishes' AS status;
