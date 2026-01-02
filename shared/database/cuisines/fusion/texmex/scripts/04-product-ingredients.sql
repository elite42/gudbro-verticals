-- Tex-Mex Database - Script 04: Product Ingredients
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-25
-- Total links: 323

-- Delete existing links for texmex
DELETE FROM product_ingredients WHERE product_type = 'texmex';

-- =====================================================
-- TACOS (5 dishes, 40 links)
-- =====================================================

-- TEX_TACO_BEEF (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_TACO_BEEF', 'ING_BEEF'),
('texmex', 'TEX_TACO_BEEF', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_TACO_BEEF', 'ING_LETTUCE'),
('texmex', 'TEX_TACO_BEEF', 'ING_TOMATO'),
('texmex', 'TEX_TACO_BEEF', 'ING_CHEDDAR'),
('texmex', 'TEX_TACO_BEEF', 'ING_ONION'),
('texmex', 'TEX_TACO_BEEF', 'ING_CUMIN'),
('texmex', 'TEX_TACO_BEEF', 'ING_CHILI_POWDER'),
('texmex', 'TEX_TACO_BEEF', 'ING_GARLIC');

-- TEX_TACO_CHICKEN (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_TACO_CHICKEN', 'ING_CHICKEN'),
('texmex', 'TEX_TACO_CHICKEN', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_TACO_CHICKEN', 'ING_LETTUCE'),
('texmex', 'TEX_TACO_CHICKEN', 'ING_TOMATO'),
('texmex', 'TEX_TACO_CHICKEN', 'ING_SOUR_CREAM'),
('texmex', 'TEX_TACO_CHICKEN', 'ING_CHEDDAR'),
('texmex', 'TEX_TACO_CHICKEN', 'ING_CUMIN'),
('texmex', 'TEX_TACO_CHICKEN', 'ING_LIME');

-- TEX_TACO_FISH (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_TACO_FISH', 'ING_WHITE_FISH'),
('texmex', 'TEX_TACO_FISH', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_TACO_FISH', 'ING_CABBAGE'),
('texmex', 'TEX_TACO_FISH', 'ING_MAYONNAISE'),
('texmex', 'TEX_TACO_FISH', 'ING_LIME'),
('texmex', 'TEX_TACO_FISH', 'ING_FLOUR'),
('texmex', 'TEX_TACO_FISH', 'ING_BEER');

-- TEX_TACO_CARNITAS (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_TACO_CARNITAS', 'ING_PORK'),
('texmex', 'TEX_TACO_CARNITAS', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_TACO_CARNITAS', 'ING_CILANTRO'),
('texmex', 'TEX_TACO_CARNITAS', 'ING_ONION'),
('texmex', 'TEX_TACO_CARNITAS', 'ING_LIME'),
('texmex', 'TEX_TACO_CARNITAS', 'ING_GARLIC'),
('texmex', 'TEX_TACO_CARNITAS', 'ING_ORANGE');

-- TEX_PUFFY_TACO (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_PUFFY_TACO', 'ING_BEEF'),
('texmex', 'TEX_PUFFY_TACO', 'ING_CORN_FLOUR'),
('texmex', 'TEX_PUFFY_TACO', 'ING_LETTUCE'),
('texmex', 'TEX_PUFFY_TACO', 'ING_TOMATO'),
('texmex', 'TEX_PUFFY_TACO', 'ING_CHEDDAR'),
('texmex', 'TEX_PUFFY_TACO', 'ING_VEGETABLE_OIL'),
('texmex', 'TEX_PUFFY_TACO', 'ING_CUMIN');

-- =====================================================
-- BURRITOS (5 dishes, 37 links)
-- =====================================================

-- TEX_BURRITO_BEEF (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_BURRITO_BEEF', 'ING_BEEF'),
('texmex', 'TEX_BURRITO_BEEF', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_BURRITO_BEEF', 'ING_RICE'),
('texmex', 'TEX_BURRITO_BEEF', 'ING_BLACK_BEAN'),
('texmex', 'TEX_BURRITO_BEEF', 'ING_CHEDDAR'),
('texmex', 'TEX_BURRITO_BEEF', 'ING_SOUR_CREAM'),
('texmex', 'TEX_BURRITO_BEEF', 'ING_LETTUCE'),
('texmex', 'TEX_BURRITO_BEEF', 'ING_TOMATO');

-- TEX_BURRITO_CHICKEN (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_BURRITO_CHICKEN', 'ING_CHICKEN'),
('texmex', 'TEX_BURRITO_CHICKEN', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_BURRITO_CHICKEN', 'ING_RICE'),
('texmex', 'TEX_BURRITO_CHICKEN', 'ING_PINTO_BEANS'),
('texmex', 'TEX_BURRITO_CHICKEN', 'ING_CHEDDAR'),
('texmex', 'TEX_BURRITO_CHICKEN', 'ING_AVOCADO'),
('texmex', 'TEX_BURRITO_CHICKEN', 'ING_TOMATO'),
('texmex', 'TEX_BURRITO_CHICKEN', 'ING_ONION');

-- TEX_BURRITO_BEAN_CHEESE (5 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_BURRITO_BEAN_CHEESE', 'ING_PINTO_BEANS'),
('texmex', 'TEX_BURRITO_BEAN_CHEESE', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_BURRITO_BEAN_CHEESE', 'ING_CHEDDAR'),
('texmex', 'TEX_BURRITO_BEAN_CHEESE', 'ING_ONION'),
('texmex', 'TEX_BURRITO_BEAN_CHEESE', 'ING_CUMIN');

-- TEX_BURRITO_BREAKFAST (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_BURRITO_BREAKFAST', 'ING_EGG'),
('texmex', 'TEX_BURRITO_BREAKFAST', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_BURRITO_BREAKFAST', 'ING_BACON'),
('texmex', 'TEX_BURRITO_BREAKFAST', 'ING_POTATO'),
('texmex', 'TEX_BURRITO_BREAKFAST', 'ING_CHEDDAR'),
('texmex', 'TEX_BURRITO_BREAKFAST', 'ING_ONION'),
('texmex', 'TEX_BURRITO_BREAKFAST', 'ING_BELL_PEPPER'),
('texmex', 'TEX_BURRITO_BREAKFAST', 'ING_SALSA');

-- TEX_CHIMICHANGA (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_CHIMICHANGA', 'ING_BEEF'),
('texmex', 'TEX_CHIMICHANGA', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_CHIMICHANGA', 'ING_CHEDDAR'),
('texmex', 'TEX_CHIMICHANGA', 'ING_SOUR_CREAM'),
('texmex', 'TEX_CHIMICHANGA', 'ING_AVOCADO'),
('texmex', 'TEX_CHIMICHANGA', 'ING_VEGETABLE_OIL'),
('texmex', 'TEX_CHIMICHANGA', 'ING_ONION');

-- =====================================================
-- ENCHILADAS (5 dishes, 38 links)
-- =====================================================

-- TEX_ENCHILADA_CHEESE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_ENCHILADA_CHEESE', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_ENCHILADA_CHEESE', 'ING_CHEDDAR'),
('texmex', 'TEX_ENCHILADA_CHEESE', 'ING_ONION'),
('texmex', 'TEX_ENCHILADA_CHEESE', 'ING_CHILI_POWDER'),
('texmex', 'TEX_ENCHILADA_CHEESE', 'ING_CUMIN'),
('texmex', 'TEX_ENCHILADA_CHEESE', 'ING_TOMATO_SAUCE'),
('texmex', 'TEX_ENCHILADA_CHEESE', 'ING_GARLIC');

-- TEX_ENCHILADA_BEEF (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_ENCHILADA_BEEF', 'ING_BEEF'),
('texmex', 'TEX_ENCHILADA_BEEF', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_ENCHILADA_BEEF', 'ING_CHEDDAR'),
('texmex', 'TEX_ENCHILADA_BEEF', 'ING_ONION'),
('texmex', 'TEX_ENCHILADA_BEEF', 'ING_TOMATO_SAUCE'),
('texmex', 'TEX_ENCHILADA_BEEF', 'ING_CHILI_POWDER'),
('texmex', 'TEX_ENCHILADA_BEEF', 'ING_CUMIN'),
('texmex', 'TEX_ENCHILADA_BEEF', 'ING_GARLIC');

-- TEX_ENCHILADA_CHICKEN (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_ENCHILADA_CHICKEN', 'ING_CHICKEN'),
('texmex', 'TEX_ENCHILADA_CHICKEN', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_ENCHILADA_CHICKEN', 'ING_SOUR_CREAM'),
('texmex', 'TEX_ENCHILADA_CHICKEN', 'ING_CHEDDAR'),
('texmex', 'TEX_ENCHILADA_CHICKEN', 'ING_TOMATILLO'),
('texmex', 'TEX_ENCHILADA_CHICKEN', 'ING_ONION'),
('texmex', 'TEX_ENCHILADA_CHICKEN', 'ING_GARLIC'),
('texmex', 'TEX_ENCHILADA_CHICKEN', 'ING_CILANTRO');

-- TEX_ENCHILADA_VERDE (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_ENCHILADA_VERDE', 'ING_CHICKEN'),
('texmex', 'TEX_ENCHILADA_VERDE', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_ENCHILADA_VERDE', 'ING_TOMATILLO'),
('texmex', 'TEX_ENCHILADA_VERDE', 'ING_JALAPENO'),
('texmex', 'TEX_ENCHILADA_VERDE', 'ING_SOUR_CREAM'),
('texmex', 'TEX_ENCHILADA_VERDE', 'ING_CILANTRO'),
('texmex', 'TEX_ENCHILADA_VERDE', 'ING_ONION'),
('texmex', 'TEX_ENCHILADA_VERDE', 'ING_GARLIC');

-- TEX_ENCHILADA_SUIZA (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_ENCHILADA_SUIZA', 'ING_CHICKEN'),
('texmex', 'TEX_ENCHILADA_SUIZA', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_ENCHILADA_SUIZA', 'ING_HEAVY_CREAM'),
('texmex', 'TEX_ENCHILADA_SUIZA', 'ING_TOMATILLO'),
('texmex', 'TEX_ENCHILADA_SUIZA', 'ING_CHEDDAR'),
('texmex', 'TEX_ENCHILADA_SUIZA', 'ING_SOUR_CREAM'),
('texmex', 'TEX_ENCHILADA_SUIZA', 'ING_ONION');

-- =====================================================
-- NACHOS (4 dishes, 30 links)
-- =====================================================

-- TEX_NACHOS_SUPREME (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_NACHOS_SUPREME', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_NACHOS_SUPREME', 'ING_BEEF'),
('texmex', 'TEX_NACHOS_SUPREME', 'ING_CHEDDAR'),
('texmex', 'TEX_NACHOS_SUPREME', 'ING_BLACK_BEAN'),
('texmex', 'TEX_NACHOS_SUPREME', 'ING_SOUR_CREAM'),
('texmex', 'TEX_NACHOS_SUPREME', 'ING_AVOCADO'),
('texmex', 'TEX_NACHOS_SUPREME', 'ING_JALAPENO'),
('texmex', 'TEX_NACHOS_SUPREME', 'ING_TOMATO');

-- TEX_NACHOS_CHICKEN (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_NACHOS_CHICKEN', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_NACHOS_CHICKEN', 'ING_CHICKEN'),
('texmex', 'TEX_NACHOS_CHICKEN', 'ING_CHEDDAR'),
('texmex', 'TEX_NACHOS_CHICKEN', 'ING_TOMATO'),
('texmex', 'TEX_NACHOS_CHICKEN', 'ING_ONION'),
('texmex', 'TEX_NACHOS_CHICKEN', 'ING_CILANTRO'),
('texmex', 'TEX_NACHOS_CHICKEN', 'ING_LIME'),
('texmex', 'TEX_NACHOS_CHICKEN', 'ING_JALAPENO');

-- TEX_NACHOS_FAJITA (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_NACHOS_FAJITA', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_NACHOS_FAJITA', 'ING_BEEF'),
('texmex', 'TEX_NACHOS_FAJITA', 'ING_BELL_PEPPER'),
('texmex', 'TEX_NACHOS_FAJITA', 'ING_ONION'),
('texmex', 'TEX_NACHOS_FAJITA', 'ING_CHEDDAR'),
('texmex', 'TEX_NACHOS_FAJITA', 'ING_SOUR_CREAM'),
('texmex', 'TEX_NACHOS_FAJITA', 'ING_AVOCADO');

-- TEX_NACHOS_VEGGIE (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_NACHOS_VEGGIE', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_NACHOS_VEGGIE', 'ING_BLACK_BEAN'),
('texmex', 'TEX_NACHOS_VEGGIE', 'ING_CORN'),
('texmex', 'TEX_NACHOS_VEGGIE', 'ING_BELL_PEPPER'),
('texmex', 'TEX_NACHOS_VEGGIE', 'ING_CHEDDAR'),
('texmex', 'TEX_NACHOS_VEGGIE', 'ING_TOMATO'),
('texmex', 'TEX_NACHOS_VEGGIE', 'ING_AVOCADO'),
('texmex', 'TEX_NACHOS_VEGGIE', 'ING_CILANTRO');

-- =====================================================
-- FAJITAS (5 dishes, 39 links)
-- =====================================================

-- TEX_FAJITA_BEEF (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_FAJITA_BEEF', 'ING_BEEF'),
('texmex', 'TEX_FAJITA_BEEF', 'ING_BELL_PEPPER'),
('texmex', 'TEX_FAJITA_BEEF', 'ING_ONION'),
('texmex', 'TEX_FAJITA_BEEF', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_FAJITA_BEEF', 'ING_LIME'),
('texmex', 'TEX_FAJITA_BEEF', 'ING_GARLIC'),
('texmex', 'TEX_FAJITA_BEEF', 'ING_CUMIN'),
('texmex', 'TEX_FAJITA_BEEF', 'ING_VEGETABLE_OIL');

-- TEX_FAJITA_CHICKEN (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_FAJITA_CHICKEN', 'ING_CHICKEN'),
('texmex', 'TEX_FAJITA_CHICKEN', 'ING_BELL_PEPPER'),
('texmex', 'TEX_FAJITA_CHICKEN', 'ING_ONION'),
('texmex', 'TEX_FAJITA_CHICKEN', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_FAJITA_CHICKEN', 'ING_LIME'),
('texmex', 'TEX_FAJITA_CHICKEN', 'ING_GARLIC'),
('texmex', 'TEX_FAJITA_CHICKEN', 'ING_CUMIN'),
('texmex', 'TEX_FAJITA_CHICKEN', 'ING_VEGETABLE_OIL');

-- TEX_FAJITA_SHRIMP (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_FAJITA_SHRIMP', 'ING_SHRIMP'),
('texmex', 'TEX_FAJITA_SHRIMP', 'ING_BELL_PEPPER'),
('texmex', 'TEX_FAJITA_SHRIMP', 'ING_ONION'),
('texmex', 'TEX_FAJITA_SHRIMP', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_FAJITA_SHRIMP', 'ING_LIME'),
('texmex', 'TEX_FAJITA_SHRIMP', 'ING_GARLIC'),
('texmex', 'TEX_FAJITA_SHRIMP', 'ING_BUTTER');

-- TEX_FAJITA_MIXED (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_FAJITA_MIXED', 'ING_BEEF'),
('texmex', 'TEX_FAJITA_MIXED', 'ING_CHICKEN'),
('texmex', 'TEX_FAJITA_MIXED', 'ING_SHRIMP'),
('texmex', 'TEX_FAJITA_MIXED', 'ING_BELL_PEPPER'),
('texmex', 'TEX_FAJITA_MIXED', 'ING_ONION'),
('texmex', 'TEX_FAJITA_MIXED', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_FAJITA_MIXED', 'ING_LIME'),
('texmex', 'TEX_FAJITA_MIXED', 'ING_GARLIC');

-- TEX_FAJITA_VEGGIE (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_FAJITA_VEGGIE', 'ING_MUSHROOM'),
('texmex', 'TEX_FAJITA_VEGGIE', 'ING_ZUCCHINI'),
('texmex', 'TEX_FAJITA_VEGGIE', 'ING_BELL_PEPPER'),
('texmex', 'TEX_FAJITA_VEGGIE', 'ING_ONION'),
('texmex', 'TEX_FAJITA_VEGGIE', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_FAJITA_VEGGIE', 'ING_LIME'),
('texmex', 'TEX_FAJITA_VEGGIE', 'ING_GARLIC'),
('texmex', 'TEX_FAJITA_VEGGIE', 'ING_VEGETABLE_OIL');

-- =====================================================
-- QUESADILLAS (5 dishes, 27 links)
-- =====================================================

-- TEX_QUESADILLA_CHEESE (3 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_QUESADILLA_CHEESE', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_QUESADILLA_CHEESE', 'ING_CHEDDAR'),
('texmex', 'TEX_QUESADILLA_CHEESE', 'ING_BUTTER');

-- TEX_QUESADILLA_CHICKEN (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_QUESADILLA_CHICKEN', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_QUESADILLA_CHICKEN', 'ING_CHICKEN'),
('texmex', 'TEX_QUESADILLA_CHICKEN', 'ING_CHEDDAR'),
('texmex', 'TEX_QUESADILLA_CHICKEN', 'ING_BELL_PEPPER'),
('texmex', 'TEX_QUESADILLA_CHICKEN', 'ING_ONION'),
('texmex', 'TEX_QUESADILLA_CHICKEN', 'ING_CUMIN');

-- TEX_QUESADILLA_BEEF (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_QUESADILLA_BEEF', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_QUESADILLA_BEEF', 'ING_BEEF'),
('texmex', 'TEX_QUESADILLA_BEEF', 'ING_CHEDDAR'),
('texmex', 'TEX_QUESADILLA_BEEF', 'ING_ONION'),
('texmex', 'TEX_QUESADILLA_BEEF', 'ING_CUMIN'),
('texmex', 'TEX_QUESADILLA_BEEF', 'ING_CHILI_POWDER');

-- TEX_QUESADILLA_FAJITA (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_QUESADILLA_FAJITA', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_QUESADILLA_FAJITA', 'ING_BEEF'),
('texmex', 'TEX_QUESADILLA_FAJITA', 'ING_BELL_PEPPER'),
('texmex', 'TEX_QUESADILLA_FAJITA', 'ING_ONION'),
('texmex', 'TEX_QUESADILLA_FAJITA', 'ING_CHEDDAR'),
('texmex', 'TEX_QUESADILLA_FAJITA', 'ING_LIME'),
('texmex', 'TEX_QUESADILLA_FAJITA', 'ING_GARLIC');

-- TEX_QUESADILLA_SPINACH (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_QUESADILLA_SPINACH', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_QUESADILLA_SPINACH', 'ING_SPINACH'),
('texmex', 'TEX_QUESADILLA_SPINACH', 'ING_MUSHROOM'),
('texmex', 'TEX_QUESADILLA_SPINACH', 'ING_CHEDDAR'),
('texmex', 'TEX_QUESADILLA_SPINACH', 'ING_GARLIC'),
('texmex', 'TEX_QUESADILLA_SPINACH', 'ING_ONION');

-- =====================================================
-- SIDES (5 dishes, 31 links)
-- =====================================================

-- TEX_RICE_SPANISH (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_RICE_SPANISH', 'ING_RICE'),
('texmex', 'TEX_RICE_SPANISH', 'ING_TOMATO_SAUCE'),
('texmex', 'TEX_RICE_SPANISH', 'ING_ONION'),
('texmex', 'TEX_RICE_SPANISH', 'ING_GARLIC'),
('texmex', 'TEX_RICE_SPANISH', 'ING_CUMIN'),
('texmex', 'TEX_RICE_SPANISH', 'ING_CHICKEN_BROTH');

-- TEX_BEANS_REFRIED (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_BEANS_REFRIED', 'ING_PINTO_BEANS'),
('texmex', 'TEX_BEANS_REFRIED', 'ING_LARD'),
('texmex', 'TEX_BEANS_REFRIED', 'ING_ONION'),
('texmex', 'TEX_BEANS_REFRIED', 'ING_GARLIC'),
('texmex', 'TEX_BEANS_REFRIED', 'ING_CUMIN'),
('texmex', 'TEX_BEANS_REFRIED', 'ING_SALT');

-- TEX_BEANS_CHARRO (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_BEANS_CHARRO', 'ING_PINTO_BEANS'),
('texmex', 'TEX_BEANS_CHARRO', 'ING_BACON'),
('texmex', 'TEX_BEANS_CHARRO', 'ING_TOMATO'),
('texmex', 'TEX_BEANS_CHARRO', 'ING_JALAPENO'),
('texmex', 'TEX_BEANS_CHARRO', 'ING_CILANTRO'),
('texmex', 'TEX_BEANS_CHARRO', 'ING_ONION'),
('texmex', 'TEX_BEANS_CHARRO', 'ING_GARLIC');

-- TEX_CORN_STREET (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_CORN_STREET', 'ING_CORN'),
('texmex', 'TEX_CORN_STREET', 'ING_MAYONNAISE'),
('texmex', 'TEX_CORN_STREET', 'ING_COTIJA_CHEESE'),
('texmex', 'TEX_CORN_STREET', 'ING_CHILI_POWDER'),
('texmex', 'TEX_CORN_STREET', 'ING_LIME'),
('texmex', 'TEX_CORN_STREET', 'ING_CILANTRO');

-- TEX_CORN_ESQUITES (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_CORN_ESQUITES', 'ING_CORN'),
('texmex', 'TEX_CORN_ESQUITES', 'ING_MAYONNAISE'),
('texmex', 'TEX_CORN_ESQUITES', 'ING_COTIJA_CHEESE'),
('texmex', 'TEX_CORN_ESQUITES', 'ING_LIME'),
('texmex', 'TEX_CORN_ESQUITES', 'ING_CHILI_POWDER'),
('texmex', 'TEX_CORN_ESQUITES', 'ING_BUTTER');

-- =====================================================
-- DIPS (6 dishes, 39 links)
-- =====================================================

-- TEX_GUACAMOLE (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_GUACAMOLE', 'ING_AVOCADO'),
('texmex', 'TEX_GUACAMOLE', 'ING_LIME'),
('texmex', 'TEX_GUACAMOLE', 'ING_CILANTRO'),
('texmex', 'TEX_GUACAMOLE', 'ING_ONION'),
('texmex', 'TEX_GUACAMOLE', 'ING_TOMATO'),
('texmex', 'TEX_GUACAMOLE', 'ING_JALAPENO'),
('texmex', 'TEX_GUACAMOLE', 'ING_SALT'),
('texmex', 'TEX_GUACAMOLE', 'ING_GARLIC');

-- TEX_QUESO (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_QUESO', 'ING_CHEDDAR'),
('texmex', 'TEX_QUESO', 'ING_MILK'),
('texmex', 'TEX_QUESO', 'ING_JALAPENO'),
('texmex', 'TEX_QUESO', 'ING_TOMATO'),
('texmex', 'TEX_QUESO', 'ING_ONION'),
('texmex', 'TEX_QUESO', 'ING_CUMIN');

-- TEX_SALSA_ROJA (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_SALSA_ROJA', 'ING_TOMATO'),
('texmex', 'TEX_SALSA_ROJA', 'ING_JALAPENO'),
('texmex', 'TEX_SALSA_ROJA', 'ING_ONION'),
('texmex', 'TEX_SALSA_ROJA', 'ING_GARLIC'),
('texmex', 'TEX_SALSA_ROJA', 'ING_CILANTRO'),
('texmex', 'TEX_SALSA_ROJA', 'ING_LIME'),
('texmex', 'TEX_SALSA_ROJA', 'ING_SALT');

-- TEX_PICO_GALLO (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_PICO_GALLO', 'ING_TOMATO'),
('texmex', 'TEX_PICO_GALLO', 'ING_ONION'),
('texmex', 'TEX_PICO_GALLO', 'ING_JALAPENO'),
('texmex', 'TEX_PICO_GALLO', 'ING_CILANTRO'),
('texmex', 'TEX_PICO_GALLO', 'ING_LIME'),
('texmex', 'TEX_PICO_GALLO', 'ING_SALT');

-- TEX_SALSA_VERDE (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_SALSA_VERDE', 'ING_TOMATILLO'),
('texmex', 'TEX_SALSA_VERDE', 'ING_JALAPENO'),
('texmex', 'TEX_SALSA_VERDE', 'ING_CILANTRO'),
('texmex', 'TEX_SALSA_VERDE', 'ING_ONION'),
('texmex', 'TEX_SALSA_VERDE', 'ING_GARLIC'),
('texmex', 'TEX_SALSA_VERDE', 'ING_LIME');

-- TEX_QUESO_FUNDIDO (5 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_QUESO_FUNDIDO', 'ING_CHEDDAR'),
('texmex', 'TEX_QUESO_FUNDIDO', 'ING_CHORIZO'),
('texmex', 'TEX_QUESO_FUNDIDO', 'ING_ONION'),
('texmex', 'TEX_QUESO_FUNDIDO', 'ING_JALAPENO'),
('texmex', 'TEX_QUESO_FUNDIDO', 'ING_FLOUR_TORTILLA');

-- =====================================================
-- MAINS (6 dishes, 43 links)
-- =====================================================

-- TEX_CHILI_CON_CARNE (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_CHILI_CON_CARNE', 'ING_BEEF'),
('texmex', 'TEX_CHILI_CON_CARNE', 'ING_CHILI_POWDER'),
('texmex', 'TEX_CHILI_CON_CARNE', 'ING_CUMIN'),
('texmex', 'TEX_CHILI_CON_CARNE', 'ING_GARLIC'),
('texmex', 'TEX_CHILI_CON_CARNE', 'ING_ONION'),
('texmex', 'TEX_CHILI_CON_CARNE', 'ING_TOMATO_SAUCE'),
('texmex', 'TEX_CHILI_CON_CARNE', 'ING_JALAPENO'),
('texmex', 'TEX_CHILI_CON_CARNE', 'ING_OREGANO');

-- TEX_TAMALES (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_TAMALES', 'ING_BEEF'),
('texmex', 'TEX_TAMALES', 'ING_CORN_FLOUR'),
('texmex', 'TEX_TAMALES', 'ING_LARD'),
('texmex', 'TEX_TAMALES', 'ING_CHILI_POWDER'),
('texmex', 'TEX_TAMALES', 'ING_CUMIN'),
('texmex', 'TEX_TAMALES', 'ING_GARLIC'),
('texmex', 'TEX_TAMALES', 'ING_CHICKEN_BROTH');

-- TEX_TACO_SALAD (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_TACO_SALAD', 'ING_BEEF'),
('texmex', 'TEX_TACO_SALAD', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_TACO_SALAD', 'ING_LETTUCE'),
('texmex', 'TEX_TACO_SALAD', 'ING_TOMATO'),
('texmex', 'TEX_TACO_SALAD', 'ING_CHEDDAR'),
('texmex', 'TEX_TACO_SALAD', 'ING_SOUR_CREAM'),
('texmex', 'TEX_TACO_SALAD', 'ING_BLACK_BEAN'),
('texmex', 'TEX_TACO_SALAD', 'ING_AVOCADO');

-- TEX_FLAUTAS (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_FLAUTAS', 'ING_CHICKEN'),
('texmex', 'TEX_FLAUTAS', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_FLAUTAS', 'ING_VEGETABLE_OIL'),
('texmex', 'TEX_FLAUTAS', 'ING_SOUR_CREAM'),
('texmex', 'TEX_FLAUTAS', 'ING_AVOCADO'),
('texmex', 'TEX_FLAUTAS', 'ING_LETTUCE');

-- TEX_CHALUPA (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_CHALUPA', 'ING_CORN_FLOUR'),
('texmex', 'TEX_CHALUPA', 'ING_BEEF'),
('texmex', 'TEX_CHALUPA', 'ING_PINTO_BEANS'),
('texmex', 'TEX_CHALUPA', 'ING_CHEDDAR'),
('texmex', 'TEX_CHALUPA', 'ING_LETTUCE'),
('texmex', 'TEX_CHALUPA', 'ING_TOMATO'),
('texmex', 'TEX_CHALUPA', 'ING_SOUR_CREAM'),
('texmex', 'TEX_CHALUPA', 'ING_VEGETABLE_OIL');

-- TEX_COMBO_PLATE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
('texmex', 'TEX_COMBO_PLATE', 'ING_BEEF'),
('texmex', 'TEX_COMBO_PLATE', 'ING_CORN_TORTILLA'),
('texmex', 'TEX_COMBO_PLATE', 'ING_FLOUR_TORTILLA'),
('texmex', 'TEX_COMBO_PLATE', 'ING_CHEDDAR'),
('texmex', 'TEX_COMBO_PLATE', 'ING_RICE'),
('texmex', 'TEX_COMBO_PLATE', 'ING_PINTO_BEANS'),
('texmex', 'TEX_COMBO_PLATE', 'ING_TOMATO_SAUCE');

-- Success message
SELECT 'Inserted 323 product_ingredients links for Tex-Mex' AS status;
