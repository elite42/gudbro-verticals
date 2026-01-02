-- Venezuelan Cuisine Database - Script 04: Product Ingredients
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- Total: 39 dishes, ~240 ingredient links

-- Clear existing links
DELETE FROM product_ingredients WHERE product_type = 'venezuelan';

-- ===========================================
-- AREPAS (7 dishes)
-- ===========================================

-- VEN_REINA_PEPIADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_REINA_PEPIADA', 'ING_AREPA'),
('venezuelan', 'VEN_REINA_PEPIADA', 'ING_CHICKEN_BREAST'),
('venezuelan', 'VEN_REINA_PEPIADA', 'ING_AVOCADO'),
('venezuelan', 'VEN_REINA_PEPIADA', 'ING_MAYONNAISE'),
('venezuelan', 'VEN_REINA_PEPIADA', 'ING_ONION'),
('venezuelan', 'VEN_REINA_PEPIADA', 'ING_CILANTRO');

-- VEN_PABELLON
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_PABELLON', 'ING_AREPA'),
('venezuelan', 'VEN_PABELLON', 'ING_BEEF'),
('venezuelan', 'VEN_PABELLON', 'ING_BLACK_BEAN'),
('venezuelan', 'VEN_PABELLON', 'ING_PLANTAIN'),
('venezuelan', 'VEN_PABELLON', 'ING_CHEESE');

-- VEN_DOMINÓ
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_DOMINÓ', 'ING_AREPA'),
('venezuelan', 'VEN_DOMINÓ', 'ING_BLACK_BEAN'),
('venezuelan', 'VEN_DOMINÓ', 'ING_FRESH_CHEESE');

-- VEN_PELUA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_PELUA', 'ING_AREPA'),
('venezuelan', 'VEN_PELUA', 'ING_BEEF'),
('venezuelan', 'VEN_PELUA', 'ING_CHEDDAR');

-- VEN_CATIRA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_CATIRA', 'ING_AREPA'),
('venezuelan', 'VEN_CATIRA', 'ING_CHICKEN_BREAST'),
('venezuelan', 'VEN_CATIRA', 'ING_CHEDDAR');

-- VEN_VIUDA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_VIUDA', 'ING_AREPA'),
('venezuelan', 'VEN_VIUDA', 'ING_BUTTER');

-- VEN_SIFRINA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_SIFRINA', 'ING_AREPA'),
('venezuelan', 'VEN_SIFRINA', 'ING_CHICKEN_BREAST'),
('venezuelan', 'VEN_SIFRINA', 'ING_AVOCADO'),
('venezuelan', 'VEN_SIFRINA', 'ING_MAYONNAISE'),
('venezuelan', 'VEN_SIFRINA', 'ING_CHEDDAR');

-- ===========================================
-- MAINS (6 dishes)
-- ===========================================

-- VEN_PABELLON_CRIOLLO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_PABELLON_CRIOLLO', 'ING_BEEF'),
('venezuelan', 'VEN_PABELLON_CRIOLLO', 'ING_BLACK_BEAN'),
('venezuelan', 'VEN_PABELLON_CRIOLLO', 'ING_RICE'),
('venezuelan', 'VEN_PABELLON_CRIOLLO', 'ING_PLANTAIN'),
('venezuelan', 'VEN_PABELLON_CRIOLLO', 'ING_ONION'),
('venezuelan', 'VEN_PABELLON_CRIOLLO', 'ING_BELL_PEPPER'),
('venezuelan', 'VEN_PABELLON_CRIOLLO', 'ING_GARLIC'),
('venezuelan', 'VEN_PABELLON_CRIOLLO', 'ING_CUMIN');

-- VEN_ASADO_NEGRO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_ASADO_NEGRO', 'ING_BEEF'),
('venezuelan', 'VEN_ASADO_NEGRO', 'ING_PANELA'),
('venezuelan', 'VEN_ASADO_NEGRO', 'ING_ONION'),
('venezuelan', 'VEN_ASADO_NEGRO', 'ING_GARLIC'),
('venezuelan', 'VEN_ASADO_NEGRO', 'ING_WORCESTERSHIRE_SAUCE'),
('venezuelan', 'VEN_ASADO_NEGRO', 'ING_TOMATO'),
('venezuelan', 'VEN_ASADO_NEGRO', 'ING_CUMIN');

-- VEN_HALLACA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_HALLACA', 'ING_CORN_FLOUR'),
('venezuelan', 'VEN_HALLACA', 'ING_CHICKEN'),
('venezuelan', 'VEN_HALLACA', 'ING_PORK'),
('venezuelan', 'VEN_HALLACA', 'ING_BEEF'),
('venezuelan', 'VEN_HALLACA', 'ING_OLIVE'),
('venezuelan', 'VEN_HALLACA', 'ING_RAISIN'),
('venezuelan', 'VEN_HALLACA', 'ING_CAPERS'),
('venezuelan', 'VEN_HALLACA', 'ING_ONION'),
('venezuelan', 'VEN_HALLACA', 'ING_BELL_PEPPER'),
('venezuelan', 'VEN_HALLACA', 'ING_BANANA_LEAF');

-- VEN_CARNE_MECHADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_CARNE_MECHADA', 'ING_BEEF'),
('venezuelan', 'VEN_CARNE_MECHADA', 'ING_TOMATO'),
('venezuelan', 'VEN_CARNE_MECHADA', 'ING_ONION'),
('venezuelan', 'VEN_CARNE_MECHADA', 'ING_BELL_PEPPER'),
('venezuelan', 'VEN_CARNE_MECHADA', 'ING_GARLIC'),
('venezuelan', 'VEN_CARNE_MECHADA', 'ING_CUMIN');

-- VEN_POLLO_GUISADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_POLLO_GUISADO', 'ING_CHICKEN'),
('venezuelan', 'VEN_POLLO_GUISADO', 'ING_TOMATO'),
('venezuelan', 'VEN_POLLO_GUISADO', 'ING_ONION'),
('venezuelan', 'VEN_POLLO_GUISADO', 'ING_BELL_PEPPER'),
('venezuelan', 'VEN_POLLO_GUISADO', 'ING_POTATO'),
('venezuelan', 'VEN_POLLO_GUISADO', 'ING_GARLIC'),
('venezuelan', 'VEN_POLLO_GUISADO', 'ING_CUMIN');

-- VEN_PERNIL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_PERNIL', 'ING_PORK'),
('venezuelan', 'VEN_PERNIL', 'ING_GARLIC'),
('venezuelan', 'VEN_PERNIL', 'ING_ONION'),
('venezuelan', 'VEN_PERNIL', 'ING_CUMIN'),
('venezuelan', 'VEN_PERNIL', 'ING_OREGANO'),
('venezuelan', 'VEN_PERNIL', 'ING_WORCESTERSHIRE_SAUCE'),
('venezuelan', 'VEN_PERNIL', 'ING_WHITE_WINE');

-- ===========================================
-- SOUPS (4 dishes)
-- ===========================================

-- VEN_HERVIDO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_HERVIDO', 'ING_BEEF'),
('venezuelan', 'VEN_HERVIDO', 'ING_CHICKEN'),
('venezuelan', 'VEN_HERVIDO', 'ING_YUCA'),
('venezuelan', 'VEN_HERVIDO', 'ING_PLANTAIN'),
('venezuelan', 'VEN_HERVIDO', 'ING_CORN'),
('venezuelan', 'VEN_HERVIDO', 'ING_POTATO'),
('venezuelan', 'VEN_HERVIDO', 'ING_CARROT'),
('venezuelan', 'VEN_HERVIDO', 'ING_CABBAGE'),
('venezuelan', 'VEN_HERVIDO', 'ING_CILANTRO');

-- VEN_MONDONGO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_MONDONGO', 'ING_TRIPE'),
('venezuelan', 'VEN_MONDONGO', 'ING_POTATO'),
('venezuelan', 'VEN_MONDONGO', 'ING_CARROT'),
('venezuelan', 'VEN_MONDONGO', 'ING_CHICKPEA'),
('venezuelan', 'VEN_MONDONGO', 'ING_YUCA'),
('venezuelan', 'VEN_MONDONGO', 'ING_ONION'),
('venezuelan', 'VEN_MONDONGO', 'ING_GARLIC'),
('venezuelan', 'VEN_MONDONGO', 'ING_CILANTRO');

-- VEN_SANCOCHO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_SANCOCHO', 'ING_BEEF'),
('venezuelan', 'VEN_SANCOCHO', 'ING_CHICKEN'),
('venezuelan', 'VEN_SANCOCHO', 'ING_YUCA'),
('venezuelan', 'VEN_SANCOCHO', 'ING_PLANTAIN'),
('venezuelan', 'VEN_SANCOCHO', 'ING_CORN'),
('venezuelan', 'VEN_SANCOCHO', 'ING_POTATO'),
('venezuelan', 'VEN_SANCOCHO', 'ING_ONION'),
('venezuelan', 'VEN_SANCOCHO', 'ING_GARLIC'),
('venezuelan', 'VEN_SANCOCHO', 'ING_CILANTRO');

-- VEN_SOPA_CARAOTAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_SOPA_CARAOTAS', 'ING_BLACK_BEAN'),
('venezuelan', 'VEN_SOPA_CARAOTAS', 'ING_ONION'),
('venezuelan', 'VEN_SOPA_CARAOTAS', 'ING_GARLIC'),
('venezuelan', 'VEN_SOPA_CARAOTAS', 'ING_BELL_PEPPER'),
('venezuelan', 'VEN_SOPA_CARAOTAS', 'ING_CUMIN'),
('venezuelan', 'VEN_SOPA_CARAOTAS', 'ING_CILANTRO');

-- ===========================================
-- STREET FOOD (7 dishes)
-- ===========================================

-- VEN_CACHAPA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_CACHAPA', 'ING_CORN'),
('venezuelan', 'VEN_CACHAPA', 'ING_FRESH_CHEESE'),
('venezuelan', 'VEN_CACHAPA', 'ING_BUTTER'),
('venezuelan', 'VEN_CACHAPA', 'ING_SUGAR');

-- VEN_TEQUENOS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_TEQUENOS', 'ING_FLOUR'),
('venezuelan', 'VEN_TEQUENOS', 'ING_FRESH_CHEESE'),
('venezuelan', 'VEN_TEQUENOS', 'ING_BUTTER'),
('venezuelan', 'VEN_TEQUENOS', 'ING_EGG'),
('venezuelan', 'VEN_TEQUENOS', 'ING_VEGETABLE_OIL');

-- VEN_EMPANADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_EMPANADA', 'ING_CORN_FLOUR'),
('venezuelan', 'VEN_EMPANADA', 'ING_BEEF'),
('venezuelan', 'VEN_EMPANADA', 'ING_BLACK_BEAN'),
('venezuelan', 'VEN_EMPANADA', 'ING_CHEESE'),
('venezuelan', 'VEN_EMPANADA', 'ING_VEGETABLE_OIL');

-- VEN_PATACON
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_PATACON', 'ING_PLANTAIN'),
('venezuelan', 'VEN_PATACON', 'ING_BEEF'),
('venezuelan', 'VEN_PATACON', 'ING_CHEESE'),
('venezuelan', 'VEN_PATACON', 'ING_LETTUCE'),
('venezuelan', 'VEN_PATACON', 'ING_TOMATO'),
('venezuelan', 'VEN_PATACON', 'ING_MAYONNAISE'),
('venezuelan', 'VEN_PATACON', 'ING_VEGETABLE_OIL');

-- VEN_PASTELITOS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_PASTELITOS', 'ING_FLOUR'),
('venezuelan', 'VEN_PASTELITOS', 'ING_BEEF'),
('venezuelan', 'VEN_PASTELITOS', 'ING_CHEESE'),
('venezuelan', 'VEN_PASTELITOS', 'ING_BUTTER'),
('venezuelan', 'VEN_PASTELITOS', 'ING_VEGETABLE_OIL');

-- VEN_MANDOCA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_MANDOCA', 'ING_CORN_FLOUR'),
('venezuelan', 'VEN_MANDOCA', 'ING_PLANTAIN'),
('venezuelan', 'VEN_MANDOCA', 'ING_FRESH_CHEESE'),
('venezuelan', 'VEN_MANDOCA', 'ING_PANELA'),
('venezuelan', 'VEN_MANDOCA', 'ING_VEGETABLE_OIL');

-- VEN_TUMBARRANCHO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_TUMBARRANCHO', 'ING_AREPA'),
('venezuelan', 'VEN_TUMBARRANCHO', 'ING_BEEF'),
('venezuelan', 'VEN_TUMBARRANCHO', 'ING_CHEESE'),
('venezuelan', 'VEN_TUMBARRANCHO', 'ING_FLOUR'),
('venezuelan', 'VEN_TUMBARRANCHO', 'ING_EGG'),
('venezuelan', 'VEN_TUMBARRANCHO', 'ING_VEGETABLE_OIL'),
('venezuelan', 'VEN_TUMBARRANCHO', 'ING_KETCHUP');

-- ===========================================
-- SEAFOOD (4 dishes)
-- ===========================================

-- VEN_PARGO_FRITO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_PARGO_FRITO', 'ING_RED_SNAPPER'),
('venezuelan', 'VEN_PARGO_FRITO', 'ING_LIME'),
('venezuelan', 'VEN_PARGO_FRITO', 'ING_GARLIC'),
('venezuelan', 'VEN_PARGO_FRITO', 'ING_SALT'),
('venezuelan', 'VEN_PARGO_FRITO', 'ING_VEGETABLE_OIL'),
('venezuelan', 'VEN_PARGO_FRITO', 'ING_PLANTAIN');

-- VEN_CEVICHE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_CEVICHE', 'ING_WHITE_FISH'),
('venezuelan', 'VEN_CEVICHE', 'ING_LIME'),
('venezuelan', 'VEN_CEVICHE', 'ING_ONION'),
('venezuelan', 'VEN_CEVICHE', 'ING_CILANTRO'),
('venezuelan', 'VEN_CEVICHE', 'ING_CHILI'),
('venezuelan', 'VEN_CEVICHE', 'ING_SALT');

-- VEN_ARROZ_MARISCOS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_ARROZ_MARISCOS', 'ING_RICE'),
('venezuelan', 'VEN_ARROZ_MARISCOS', 'ING_SHRIMP'),
('venezuelan', 'VEN_ARROZ_MARISCOS', 'ING_SQUID'),
('venezuelan', 'VEN_ARROZ_MARISCOS', 'ING_MUSSEL'),
('venezuelan', 'VEN_ARROZ_MARISCOS', 'ING_TOMATO'),
('venezuelan', 'VEN_ARROZ_MARISCOS', 'ING_ONION'),
('venezuelan', 'VEN_ARROZ_MARISCOS', 'ING_BELL_PEPPER'),
('venezuelan', 'VEN_ARROZ_MARISCOS', 'ING_GARLIC');

-- VEN_PESCADO_COCO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_PESCADO_COCO', 'ING_WHITE_FISH'),
('venezuelan', 'VEN_PESCADO_COCO', 'ING_COCONUT_MILK'),
('venezuelan', 'VEN_PESCADO_COCO', 'ING_ONION'),
('venezuelan', 'VEN_PESCADO_COCO', 'ING_GARLIC'),
('venezuelan', 'VEN_PESCADO_COCO', 'ING_BELL_PEPPER'),
('venezuelan', 'VEN_PESCADO_COCO', 'ING_CILANTRO');

-- ===========================================
-- DESSERTS (6 dishes)
-- ===========================================

-- VEN_QUESILLO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_QUESILLO', 'ING_MILK'),
('venezuelan', 'VEN_QUESILLO', 'ING_CONDENSED_MILK'),
('venezuelan', 'VEN_QUESILLO', 'ING_EGG'),
('venezuelan', 'VEN_QUESILLO', 'ING_SUGAR'),
('venezuelan', 'VEN_QUESILLO', 'ING_VANILLA');

-- VEN_BIENMESABE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_BIENMESABE', 'ING_COCONUT'),
('venezuelan', 'VEN_BIENMESABE', 'ING_COCONUT_MILK'),
('venezuelan', 'VEN_BIENMESABE', 'ING_FLOUR'),
('venezuelan', 'VEN_BIENMESABE', 'ING_EGG'),
('venezuelan', 'VEN_BIENMESABE', 'ING_SUGAR'),
('venezuelan', 'VEN_BIENMESABE', 'ING_VANILLA');

-- VEN_TORTA_NEGRA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_TORTA_NEGRA', 'ING_FLOUR'),
('venezuelan', 'VEN_TORTA_NEGRA', 'ING_BUTTER'),
('venezuelan', 'VEN_TORTA_NEGRA', 'ING_EGG'),
('venezuelan', 'VEN_TORTA_NEGRA', 'ING_SUGAR'),
('venezuelan', 'VEN_TORTA_NEGRA', 'ING_RAISIN'),
('venezuelan', 'VEN_TORTA_NEGRA', 'ING_RUM'),
('venezuelan', 'VEN_TORTA_NEGRA', 'ING_PANELA');

-- VEN_DULCE_LECHOSA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_DULCE_LECHOSA', 'ING_PAPAYA'),
('venezuelan', 'VEN_DULCE_LECHOSA', 'ING_PANELA'),
('venezuelan', 'VEN_DULCE_LECHOSA', 'ING_CINNAMON'),
('venezuelan', 'VEN_DULCE_LECHOSA', 'ING_CLOVE'),
('venezuelan', 'VEN_DULCE_LECHOSA', 'ING_WATER');

-- VEN_MAJARETE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_MAJARETE', 'ING_CORN'),
('venezuelan', 'VEN_MAJARETE', 'ING_COCONUT_MILK'),
('venezuelan', 'VEN_MAJARETE', 'ING_SUGAR'),
('venezuelan', 'VEN_MAJARETE', 'ING_CINNAMON'),
('venezuelan', 'VEN_MAJARETE', 'ING_VANILLA');

-- VEN_CONSERVA_COCO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_CONSERVA_COCO', 'ING_COCONUT'),
('venezuelan', 'VEN_CONSERVA_COCO', 'ING_PANELA'),
('venezuelan', 'VEN_CONSERVA_COCO', 'ING_WATER');

-- ===========================================
-- BEVERAGES (5 dishes)
-- ===========================================

-- VEN_PAPELON_LIMON
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_PAPELON_LIMON', 'ING_PANELA'),
('venezuelan', 'VEN_PAPELON_LIMON', 'ING_LIME'),
('venezuelan', 'VEN_PAPELON_LIMON', 'ING_WATER'),
('venezuelan', 'VEN_PAPELON_LIMON', 'ING_ICE');

-- VEN_CHICHA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_CHICHA', 'ING_RICE'),
('venezuelan', 'VEN_CHICHA', 'ING_MILK'),
('venezuelan', 'VEN_CHICHA', 'ING_CONDENSED_MILK'),
('venezuelan', 'VEN_CHICHA', 'ING_CINNAMON'),
('venezuelan', 'VEN_CHICHA', 'ING_VANILLA'),
('venezuelan', 'VEN_CHICHA', 'ING_ICE');

-- VEN_COCADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_COCADA', 'ING_COCONUT'),
('venezuelan', 'VEN_COCADA', 'ING_COCONUT_WATER'),
('venezuelan', 'VEN_COCADA', 'ING_ICE');

-- VEN_JUGO_PARCHITA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_JUGO_PARCHITA', 'ING_PASSION_FRUIT'),
('venezuelan', 'VEN_JUGO_PARCHITA', 'ING_SUGAR'),
('venezuelan', 'VEN_JUGO_PARCHITA', 'ING_WATER'),
('venezuelan', 'VEN_JUGO_PARCHITA', 'ING_ICE');

-- VEN_BATIDO_PATILLA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('venezuelan', 'VEN_BATIDO_PATILLA', 'ING_WATERMELON'),
('venezuelan', 'VEN_BATIDO_PATILLA', 'ING_SUGAR'),
('venezuelan', 'VEN_BATIDO_PATILLA', 'ING_ICE');

-- Success message
SELECT 'Venezuelan product_ingredients inserted: 39 dishes' AS status;
