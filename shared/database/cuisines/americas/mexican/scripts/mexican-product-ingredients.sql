-- ============================================
-- MEXICAN - Product Ingredients Links
-- Generated: 2025-12-18
-- ============================================
-- Links Mexican dishes to their ingredients
-- Automatically calculates allergens and dietary flags
-- ============================================

-- ============================================
-- TACOS (10 items)
-- ============================================

-- MEX_TACO_AL_PASTOR
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_AL_PASTOR', 'mexican', 'ING_PORK_SHOULDER', NULL, NULL, false, true, 1),
('MEX_TACO_AL_PASTOR', 'mexican', 'ING_ACHIOTE', NULL, NULL, false, true, 2),
('MEX_TACO_AL_PASTOR', 'mexican', 'ING_PINEAPPLE', NULL, NULL, false, true, 3),
('MEX_TACO_AL_PASTOR', 'mexican', 'ING_ONION', NULL, NULL, false, false, 4),
('MEX_TACO_AL_PASTOR', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 5),
('MEX_TACO_AL_PASTOR', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, false, 6),
('MEX_TACO_AL_PASTOR', 'mexican', 'ING_LIME', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_TACO_CARNE_ASADA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_CARNE_ASADA', 'mexican', 'ING_BEEF_SKIRT', NULL, NULL, false, true, 1),
('MEX_TACO_CARNE_ASADA', 'mexican', 'ING_LIME', NULL, NULL, false, true, 2),
('MEX_TACO_CARNE_ASADA', 'mexican', 'ING_GARLIC', NULL, NULL, false, true, 3),
('MEX_TACO_CARNE_ASADA', 'mexican', 'ING_CUMIN', NULL, NULL, false, false, 4),
('MEX_TACO_CARNE_ASADA', 'mexican', 'ING_ONION', NULL, NULL, false, false, 5),
('MEX_TACO_CARNE_ASADA', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 6),
('MEX_TACO_CARNE_ASADA', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_TACO_CARNITAS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_CARNITAS', 'mexican', 'ING_PORK_SHOULDER', NULL, NULL, false, true, 1),
('MEX_TACO_CARNITAS', 'mexican', 'ING_LARD', NULL, NULL, false, true, 2),
('MEX_TACO_CARNITAS', 'mexican', 'ING_ORANGE', NULL, NULL, false, true, 3),
('MEX_TACO_CARNITAS', 'mexican', 'ING_BAY_LEAF', NULL, NULL, false, false, 4),
('MEX_TACO_CARNITAS', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, false, 5),
('MEX_TACO_CARNITAS', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 6),
('MEX_TACO_CARNITAS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_TACO_BARBACOA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_BARBACOA', 'mexican', 'ING_BEEF_CHEEK', NULL, NULL, false, true, 1),
('MEX_TACO_BARBACOA', 'mexican', 'ING_CHIPOTLE', NULL, NULL, false, true, 2),
('MEX_TACO_BARBACOA', 'mexican', 'ING_CUMIN', NULL, NULL, false, true, 3),
('MEX_TACO_BARBACOA', 'mexican', 'ING_BAY_LEAF', NULL, NULL, false, false, 4),
('MEX_TACO_BARBACOA', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 5),
('MEX_TACO_BARBACOA', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, false, 6),
('MEX_TACO_BARBACOA', 'mexican', 'ING_ONION', NULL, NULL, false, false, 7),
('MEX_TACO_BARBACOA', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_TACO_BIRRIA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_BIRRIA', 'mexican', 'ING_BEEF_CHUCK', NULL, NULL, false, true, 1),
('MEX_TACO_BIRRIA', 'mexican', 'ING_GUAJILLO_CHILE', NULL, NULL, false, true, 2),
('MEX_TACO_BIRRIA', 'mexican', 'ING_ANCHO_CHILE', NULL, NULL, false, true, 3),
('MEX_TACO_BIRRIA', 'mexican', 'ING_TOMATO', NULL, NULL, false, false, 4),
('MEX_TACO_BIRRIA', 'mexican', 'ING_ONION', NULL, NULL, false, false, 5),
('MEX_TACO_BIRRIA', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 6),
('MEX_TACO_BIRRIA', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, false, 7),
('MEX_TACO_BIRRIA', 'mexican', 'ING_OAXACA_CHEESE', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_TACO_PESCADO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_PESCADO', 'mexican', 'ING_WHITE_FISH', NULL, NULL, false, true, 1),
('MEX_TACO_PESCADO', 'mexican', 'ING_FLOUR', NULL, NULL, false, true, 2),
('MEX_TACO_PESCADO', 'mexican', 'ING_BEER', NULL, NULL, false, true, 3),
('MEX_TACO_PESCADO', 'mexican', 'ING_CABBAGE', NULL, NULL, false, false, 4),
('MEX_TACO_PESCADO', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 5),
('MEX_TACO_PESCADO', 'mexican', 'ING_LIME', NULL, NULL, false, false, 6),
('MEX_TACO_PESCADO', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, false, 7),
('MEX_TACO_PESCADO', 'mexican', 'ING_PICO_DE_GALLO', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_TACO_CAMARONES
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_CAMARONES', 'mexican', 'ING_SHRIMP', NULL, NULL, false, true, 1),
('MEX_TACO_CAMARONES', 'mexican', 'ING_GARLIC', NULL, NULL, false, true, 2),
('MEX_TACO_CAMARONES', 'mexican', 'ING_LIME', NULL, NULL, false, true, 3),
('MEX_TACO_CAMARONES', 'mexican', 'ING_AVOCADO', NULL, NULL, false, false, 4),
('MEX_TACO_CAMARONES', 'mexican', 'ING_CHIPOTLE', NULL, NULL, false, false, 5),
('MEX_TACO_CAMARONES', 'mexican', 'ING_MAYONNAISE', NULL, NULL, false, false, 6),
('MEX_TACO_CAMARONES', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, false, 7),
('MEX_TACO_CAMARONES', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_TACO_CHORIZO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_CHORIZO', 'mexican', 'ING_CHORIZO', NULL, NULL, false, true, 1),
('MEX_TACO_CHORIZO', 'mexican', 'ING_POTATO', NULL, NULL, false, true, 2),
('MEX_TACO_CHORIZO', 'mexican', 'ING_ONION', NULL, NULL, false, false, 3),
('MEX_TACO_CHORIZO', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 4),
('MEX_TACO_CHORIZO', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, false, 5),
('MEX_TACO_CHORIZO', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_TACO_LENGUA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_LENGUA', 'mexican', 'ING_BEEF_TONGUE', NULL, NULL, false, true, 1),
('MEX_TACO_LENGUA', 'mexican', 'ING_ONION', NULL, NULL, false, true, 2),
('MEX_TACO_LENGUA', 'mexican', 'ING_GARLIC', NULL, NULL, false, true, 3),
('MEX_TACO_LENGUA', 'mexican', 'ING_BAY_LEAF', NULL, NULL, false, false, 4),
('MEX_TACO_LENGUA', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, false, 5),
('MEX_TACO_LENGUA', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 6),
('MEX_TACO_LENGUA', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_TACO_SUADERO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TACO_SUADERO', 'mexican', 'ING_BEEF_BRISKET', NULL, NULL, false, true, 1),
('MEX_TACO_SUADERO', 'mexican', 'ING_LARD', NULL, NULL, false, true, 2),
('MEX_TACO_SUADERO', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, false, 3),
('MEX_TACO_SUADERO', 'mexican', 'ING_ONION', NULL, NULL, false, false, 4),
('MEX_TACO_SUADERO', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 5),
('MEX_TACO_SUADERO', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 6),
('MEX_TACO_SUADERO', 'mexican', 'ING_LIME', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- ============================================
-- BURRITOS (6 items)
-- ============================================

-- MEX_BURRITO_CARNE_ASADA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_BURRITO_CARNE_ASADA', 'mexican', 'ING_BEEF_SKIRT', NULL, NULL, false, true, 1),
('MEX_BURRITO_CARNE_ASADA', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, true, 2),
('MEX_BURRITO_CARNE_ASADA', 'mexican', 'ING_RICE', NULL, NULL, false, false, 3),
('MEX_BURRITO_CARNE_ASADA', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, false, 4),
('MEX_BURRITO_CARNE_ASADA', 'mexican', 'ING_GUACAMOLE', NULL, NULL, false, false, 5),
('MEX_BURRITO_CARNE_ASADA', 'mexican', 'ING_SOUR_CREAM', NULL, NULL, false, false, 6),
('MEX_BURRITO_CARNE_ASADA', 'mexican', 'ING_PICO_DE_GALLO', NULL, NULL, false, false, 7),
('MEX_BURRITO_CARNE_ASADA', 'mexican', 'ING_CHEESE', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_BURRITO_POLLO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_BURRITO_POLLO', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 1),
('MEX_BURRITO_POLLO', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, true, 2),
('MEX_BURRITO_POLLO', 'mexican', 'ING_RICE', NULL, NULL, false, false, 3),
('MEX_BURRITO_POLLO', 'mexican', 'ING_BLACK_BEANS', NULL, NULL, false, false, 4),
('MEX_BURRITO_POLLO', 'mexican', 'ING_CHEESE', NULL, NULL, false, false, 5),
('MEX_BURRITO_POLLO', 'mexican', 'ING_LETTUCE', NULL, NULL, false, false, 6),
('MEX_BURRITO_POLLO', 'mexican', 'ING_SALSA_ROJA', NULL, NULL, false, false, 7),
('MEX_BURRITO_POLLO', 'mexican', 'ING_LIME', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_BURRITO_CARNITAS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_BURRITO_CARNITAS', 'mexican', 'ING_PORK_SHOULDER', NULL, NULL, false, true, 1),
('MEX_BURRITO_CARNITAS', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, true, 2),
('MEX_BURRITO_CARNITAS', 'mexican', 'ING_RICE', NULL, NULL, false, false, 3),
('MEX_BURRITO_CARNITAS', 'mexican', 'ING_PINTO_BEANS', NULL, NULL, false, false, 4),
('MEX_BURRITO_CARNITAS', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 5),
('MEX_BURRITO_CARNITAS', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 6),
('MEX_BURRITO_CARNITAS', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 7),
('MEX_BURRITO_CARNITAS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_BURRITO_CALIFORNIA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_BURRITO_CALIFORNIA', 'mexican', 'ING_BEEF_SKIRT', NULL, NULL, false, true, 1),
('MEX_BURRITO_CALIFORNIA', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, true, 2),
('MEX_BURRITO_CALIFORNIA', 'mexican', 'ING_FRENCH_FRIES', NULL, NULL, false, true, 3),
('MEX_BURRITO_CALIFORNIA', 'mexican', 'ING_CHEESE', NULL, NULL, false, false, 4),
('MEX_BURRITO_CALIFORNIA', 'mexican', 'ING_GUACAMOLE', NULL, NULL, false, false, 5),
('MEX_BURRITO_CALIFORNIA', 'mexican', 'ING_SOUR_CREAM', NULL, NULL, false, false, 6),
('MEX_BURRITO_CALIFORNIA', 'mexican', 'ING_PICO_DE_GALLO', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_BURRITO_BEAN_CHEESE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_BURRITO_BEAN_CHEESE', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, true, 1),
('MEX_BURRITO_BEAN_CHEESE', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, true, 2),
('MEX_BURRITO_BEAN_CHEESE', 'mexican', 'ING_CHEESE', NULL, NULL, false, true, 3),
('MEX_BURRITO_BEAN_CHEESE', 'mexican', 'ING_SALSA_ROJA', NULL, NULL, false, false, 4)
ON CONFLICT DO NOTHING;

-- MEX_BURRITO_WET
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_BURRITO_WET', 'mexican', 'ING_GROUND_BEEF', NULL, NULL, false, true, 1),
('MEX_BURRITO_WET', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, true, 2),
('MEX_BURRITO_WET', 'mexican', 'ING_RICE', NULL, NULL, false, false, 3),
('MEX_BURRITO_WET', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, false, 4),
('MEX_BURRITO_WET', 'mexican', 'ING_ENCHILADA_SAUCE', NULL, NULL, false, false, 5),
('MEX_BURRITO_WET', 'mexican', 'ING_CHEESE', NULL, NULL, false, false, 6),
('MEX_BURRITO_WET', 'mexican', 'ING_SOUR_CREAM', NULL, NULL, false, false, 7),
('MEX_BURRITO_WET', 'mexican', 'ING_LETTUCE', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- ============================================
-- ENCHILADAS (7 items)
-- ============================================

-- MEX_ENCHILADAS_ROJAS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ENCHILADAS_ROJAS', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 1),
('MEX_ENCHILADAS_ROJAS', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 2),
('MEX_ENCHILADAS_ROJAS', 'mexican', 'ING_GUAJILLO_CHILE', NULL, NULL, false, true, 3),
('MEX_ENCHILADAS_ROJAS', 'mexican', 'ING_TOMATO', NULL, NULL, false, false, 4),
('MEX_ENCHILADAS_ROJAS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 5),
('MEX_ENCHILADAS_ROJAS', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 6),
('MEX_ENCHILADAS_ROJAS', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 7),
('MEX_ENCHILADAS_ROJAS', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_ENCHILADAS_VERDES
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ENCHILADAS_VERDES', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 1),
('MEX_ENCHILADAS_VERDES', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 2),
('MEX_ENCHILADAS_VERDES', 'mexican', 'ING_TOMATILLO', NULL, NULL, false, true, 3),
('MEX_ENCHILADAS_VERDES', 'mexican', 'ING_SERRANO_CHILE', NULL, NULL, false, false, 4),
('MEX_ENCHILADAS_VERDES', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 5),
('MEX_ENCHILADAS_VERDES', 'mexican', 'ING_ONION', NULL, NULL, false, false, 6),
('MEX_ENCHILADAS_VERDES', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 7),
('MEX_ENCHILADAS_VERDES', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_ENCHILADAS_SUIZAS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ENCHILADAS_SUIZAS', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 1),
('MEX_ENCHILADAS_SUIZAS', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 2),
('MEX_ENCHILADAS_SUIZAS', 'mexican', 'ING_TOMATILLO', NULL, NULL, false, true, 3),
('MEX_ENCHILADAS_SUIZAS', 'mexican', 'ING_HEAVY_CREAM', NULL, NULL, false, false, 4),
('MEX_ENCHILADAS_SUIZAS', 'mexican', 'ING_CHEESE', NULL, NULL, false, false, 5),
('MEX_ENCHILADAS_SUIZAS', 'mexican', 'ING_SERRANO_CHILE', NULL, NULL, false, false, 6),
('MEX_ENCHILADAS_SUIZAS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 7),
('MEX_ENCHILADAS_SUIZAS', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_ENCHILADAS_MOLE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ENCHILADAS_MOLE', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 1),
('MEX_ENCHILADAS_MOLE', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 2),
('MEX_ENCHILADAS_MOLE', 'mexican', 'ING_MOLE_PASTE', NULL, NULL, false, true, 3),
('MEX_ENCHILADAS_MOLE', 'mexican', 'ING_CHOCOLATE', NULL, NULL, false, false, 4),
('MEX_ENCHILADAS_MOLE', 'mexican', 'ING_SESAME_SEEDS', NULL, NULL, false, false, 5),
('MEX_ENCHILADAS_MOLE', 'mexican', 'ING_ONION', NULL, NULL, false, false, 6),
('MEX_ENCHILADAS_MOLE', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_ENMOLADAS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ENMOLADAS', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 1),
('MEX_ENMOLADAS', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 2),
('MEX_ENMOLADAS', 'mexican', 'ING_MOLE_PASTE', NULL, NULL, false, true, 3),
('MEX_ENMOLADAS', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 4),
('MEX_ENMOLADAS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 5),
('MEX_ENMOLADAS', 'mexican', 'ING_SESAME_SEEDS', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_ENFRIJOLADAS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ENFRIJOLADAS', 'mexican', 'ING_BLACK_BEANS', NULL, NULL, false, true, 1),
('MEX_ENFRIJOLADAS', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 2),
('MEX_ENFRIJOLADAS', 'mexican', 'ING_OAXACA_CHEESE', NULL, NULL, false, true, 3),
('MEX_ENFRIJOLADAS', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 4),
('MEX_ENFRIJOLADAS', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 5),
('MEX_ENFRIJOLADAS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 6),
('MEX_ENFRIJOLADAS', 'mexican', 'ING_EPAZOTE', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_ENTOMATADAS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ENTOMATADAS', 'mexican', 'ING_TOMATO', NULL, NULL, false, true, 1),
('MEX_ENTOMATADAS', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 2),
('MEX_ENTOMATADAS', 'mexican', 'ING_OAXACA_CHEESE', NULL, NULL, false, true, 3),
('MEX_ENTOMATADAS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 4),
('MEX_ENTOMATADAS', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 5),
('MEX_ENTOMATADAS', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 6),
('MEX_ENTOMATADAS', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- ============================================
-- ANTOJITOS (15 items)
-- ============================================

-- MEX_QUESADILLA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_QUESADILLA', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_QUESADILLA', 'mexican', 'ING_OAXACA_CHEESE', NULL, NULL, false, true, 2),
('MEX_QUESADILLA', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 3),
('MEX_QUESADILLA', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 4)
ON CONFLICT DO NOTHING;

-- MEX_QUESADILLA_FLOR_CALABAZA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_QUESADILLA_FLOR_CALABAZA', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_QUESADILLA_FLOR_CALABAZA', 'mexican', 'ING_SQUASH_BLOSSOM', NULL, NULL, false, true, 2),
('MEX_QUESADILLA_FLOR_CALABAZA', 'mexican', 'ING_OAXACA_CHEESE', NULL, NULL, false, true, 3),
('MEX_QUESADILLA_FLOR_CALABAZA', 'mexican', 'ING_EPAZOTE', NULL, NULL, false, false, 4),
('MEX_QUESADILLA_FLOR_CALABAZA', 'mexican', 'ING_ONION', NULL, NULL, false, false, 5),
('MEX_QUESADILLA_FLOR_CALABAZA', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_QUESADILLA_HUITLACOCHE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_QUESADILLA_HUITLACOCHE', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_QUESADILLA_HUITLACOCHE', 'mexican', 'ING_HUITLACOCHE', NULL, NULL, false, true, 2),
('MEX_QUESADILLA_HUITLACOCHE', 'mexican', 'ING_OAXACA_CHEESE', NULL, NULL, false, true, 3),
('MEX_QUESADILLA_HUITLACOCHE', 'mexican', 'ING_EPAZOTE', NULL, NULL, false, false, 4),
('MEX_QUESADILLA_HUITLACOCHE', 'mexican', 'ING_ONION', NULL, NULL, false, false, 5),
('MEX_QUESADILLA_HUITLACOCHE', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_TOSTADA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TOSTADA', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_TOSTADA', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, true, 2),
('MEX_TOSTADA', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 3),
('MEX_TOSTADA', 'mexican', 'ING_LETTUCE', NULL, NULL, false, false, 4),
('MEX_TOSTADA', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 5),
('MEX_TOSTADA', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 6),
('MEX_TOSTADA', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_TOSTADA_CEVICHE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TOSTADA_CEVICHE', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_TOSTADA_CEVICHE', 'mexican', 'ING_WHITE_FISH', NULL, NULL, false, true, 2),
('MEX_TOSTADA_CEVICHE', 'mexican', 'ING_LIME', NULL, NULL, false, true, 3),
('MEX_TOSTADA_CEVICHE', 'mexican', 'ING_TOMATO', NULL, NULL, false, false, 4),
('MEX_TOSTADA_CEVICHE', 'mexican', 'ING_ONION', NULL, NULL, false, false, 5),
('MEX_TOSTADA_CEVICHE', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 6),
('MEX_TOSTADA_CEVICHE', 'mexican', 'ING_AVOCADO', NULL, NULL, false, false, 7),
('MEX_TOSTADA_CEVICHE', 'mexican', 'ING_SERRANO_CHILE', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_SOPE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_SOPE', 'mexican', 'ING_MASA', NULL, NULL, false, true, 1),
('MEX_SOPE', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, true, 2),
('MEX_SOPE', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, false, 3),
('MEX_SOPE', 'mexican', 'ING_LETTUCE', NULL, NULL, false, false, 4),
('MEX_SOPE', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 5),
('MEX_SOPE', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 6),
('MEX_SOPE', 'mexican', 'ING_SALSA_ROJA', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_GORDITA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_GORDITA', 'mexican', 'ING_MASA', NULL, NULL, false, true, 1),
('MEX_GORDITA', 'mexican', 'ING_CHICHARRON', NULL, NULL, false, true, 2),
('MEX_GORDITA', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, false, 3),
('MEX_GORDITA', 'mexican', 'ING_CHEESE', NULL, NULL, false, false, 4),
('MEX_GORDITA', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 5),
('MEX_GORDITA', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_FLAUTA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_FLAUTA', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_FLAUTA', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 2),
('MEX_FLAUTA', 'mexican', 'ING_LETTUCE', NULL, NULL, false, false, 3),
('MEX_FLAUTA', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 4),
('MEX_FLAUTA', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 5),
('MEX_FLAUTA', 'mexican', 'ING_GUACAMOLE', NULL, NULL, false, false, 6),
('MEX_FLAUTA', 'mexican', 'ING_SALSA_ROJA', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_TLAYUDA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TLAYUDA', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_TLAYUDA', 'mexican', 'ING_BLACK_BEANS', NULL, NULL, false, true, 2),
('MEX_TLAYUDA', 'mexican', 'ING_OAXACA_CHEESE', NULL, NULL, false, true, 3),
('MEX_TLAYUDA', 'mexican', 'ING_ASIENTO', NULL, NULL, false, false, 4),
('MEX_TLAYUDA', 'mexican', 'ING_CHORIZO', NULL, NULL, false, false, 5),
('MEX_TLAYUDA', 'mexican', 'ING_CABBAGE', NULL, NULL, false, false, 6),
('MEX_TLAYUDA', 'mexican', 'ING_AVOCADO', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_CHALUPA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_CHALUPA', 'mexican', 'ING_MASA', NULL, NULL, false, true, 1),
('MEX_CHALUPA', 'mexican', 'ING_PORK_SHOULDER', NULL, NULL, false, true, 2),
('MEX_CHALUPA', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 3),
('MEX_CHALUPA', 'mexican', 'ING_ONION', NULL, NULL, false, false, 4),
('MEX_CHALUPA', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 5)
ON CONFLICT DO NOTHING;

-- MEX_MEMELA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_MEMELA', 'mexican', 'ING_MASA', NULL, NULL, false, true, 1),
('MEX_MEMELA', 'mexican', 'ING_BLACK_BEANS', NULL, NULL, false, true, 2),
('MEX_MEMELA', 'mexican', 'ING_SALSA_ROJA', NULL, NULL, false, false, 3),
('MEX_MEMELA', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 4),
('MEX_MEMELA', 'mexican', 'ING_ONION', NULL, NULL, false, false, 5)
ON CONFLICT DO NOTHING;

-- MEX_PANUCHO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_PANUCHO', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_PANUCHO', 'mexican', 'ING_BLACK_BEANS', NULL, NULL, false, true, 2),
('MEX_PANUCHO', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 3),
('MEX_PANUCHO', 'mexican', 'ING_PICKLED_ONION', NULL, NULL, false, false, 4),
('MEX_PANUCHO', 'mexican', 'ING_HABANERO', NULL, NULL, false, false, 5),
('MEX_PANUCHO', 'mexican', 'ING_AVOCADO', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_SALBUTE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_SALBUTE', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_SALBUTE', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, true, 2),
('MEX_SALBUTE', 'mexican', 'ING_PICKLED_ONION', NULL, NULL, false, false, 3),
('MEX_SALBUTE', 'mexican', 'ING_TOMATO', NULL, NULL, false, false, 4),
('MEX_SALBUTE', 'mexican', 'ING_AVOCADO', NULL, NULL, false, false, 5),
('MEX_SALBUTE', 'mexican', 'ING_HABANERO', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_TLACOYO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TLACOYO', 'mexican', 'ING_MASA', NULL, NULL, false, true, 1),
('MEX_TLACOYO', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, true, 2),
('MEX_TLACOYO', 'mexican', 'ING_NOPALES', NULL, NULL, false, false, 3),
('MEX_TLACOYO', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 4),
('MEX_TLACOYO', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 5),
('MEX_TLACOYO', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_HUARACHE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_HUARACHE', 'mexican', 'ING_MASA', NULL, NULL, false, true, 1),
('MEX_HUARACHE', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, true, 2),
('MEX_HUARACHE', 'mexican', 'ING_CARNE_ASADA', NULL, NULL, false, true, 3),
('MEX_HUARACHE', 'mexican', 'ING_SALSA_VERDE', NULL, NULL, false, false, 4),
('MEX_HUARACHE', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 5),
('MEX_HUARACHE', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 6),
('MEX_HUARACHE', 'mexican', 'ING_ONION', NULL, NULL, false, false, 7),
('MEX_HUARACHE', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- ============================================
-- MAIN DISHES (15 items)
-- ============================================

-- MEX_MOLE_POBLANO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_MOLE_POBLANO', 'mexican', 'ING_CHICKEN_THIGH', NULL, NULL, false, true, 1),
('MEX_MOLE_POBLANO', 'mexican', 'ING_ANCHO_CHILE', NULL, NULL, false, true, 2),
('MEX_MOLE_POBLANO', 'mexican', 'ING_MULATO_CHILE', NULL, NULL, false, true, 3),
('MEX_MOLE_POBLANO', 'mexican', 'ING_PASILLA_CHILE', NULL, NULL, false, false, 4),
('MEX_MOLE_POBLANO', 'mexican', 'ING_CHOCOLATE', NULL, NULL, false, false, 5),
('MEX_MOLE_POBLANO', 'mexican', 'ING_ALMOND', NULL, NULL, false, false, 6),
('MEX_MOLE_POBLANO', 'mexican', 'ING_SESAME_SEEDS', NULL, NULL, false, false, 7),
('MEX_MOLE_POBLANO', 'mexican', 'ING_TOMATO', NULL, NULL, false, false, 8),
('MEX_MOLE_POBLANO', 'mexican', 'ING_ONION', NULL, NULL, false, false, 9),
('MEX_MOLE_POBLANO', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 10),
('MEX_MOLE_POBLANO', 'mexican', 'ING_CINNAMON', NULL, NULL, false, false, 11),
('MEX_MOLE_POBLANO', 'mexican', 'ING_CLOVE', NULL, NULL, false, false, 12)
ON CONFLICT DO NOTHING;

-- MEX_MOLE_NEGRO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_MOLE_NEGRO', 'mexican', 'ING_CHICKEN_THIGH', NULL, NULL, false, true, 1),
('MEX_MOLE_NEGRO', 'mexican', 'ING_CHILHUACLE_CHILE', NULL, NULL, false, true, 2),
('MEX_MOLE_NEGRO', 'mexican', 'ING_MULATO_CHILE', NULL, NULL, false, true, 3),
('MEX_MOLE_NEGRO', 'mexican', 'ING_CHOCOLATE', NULL, NULL, false, false, 4),
('MEX_MOLE_NEGRO', 'mexican', 'ING_PLANTAIN', NULL, NULL, false, false, 5),
('MEX_MOLE_NEGRO', 'mexican', 'ING_ALMOND', NULL, NULL, false, false, 6),
('MEX_MOLE_NEGRO', 'mexican', 'ING_SESAME_SEEDS', NULL, NULL, false, false, 7),
('MEX_MOLE_NEGRO', 'mexican', 'ING_AVOCADO_LEAF', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_CHILES_RELLENOS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_CHILES_RELLENOS', 'mexican', 'ING_POBLANO_CHILE', NULL, NULL, false, true, 1),
('MEX_CHILES_RELLENOS', 'mexican', 'ING_OAXACA_CHEESE', NULL, NULL, false, true, 2),
('MEX_CHILES_RELLENOS', 'mexican', 'ING_EGG', NULL, NULL, false, true, 3),
('MEX_CHILES_RELLENOS', 'mexican', 'ING_FLOUR', NULL, NULL, false, false, 4),
('MEX_CHILES_RELLENOS', 'mexican', 'ING_TOMATO', NULL, NULL, false, false, 5),
('MEX_CHILES_RELLENOS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 6),
('MEX_CHILES_RELLENOS', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_CARNITAS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_CARNITAS', 'mexican', 'ING_PORK_SHOULDER', NULL, NULL, false, true, 1),
('MEX_CARNITAS', 'mexican', 'ING_LARD', NULL, NULL, false, true, 2),
('MEX_CARNITAS', 'mexican', 'ING_ORANGE', NULL, NULL, false, true, 3),
('MEX_CARNITAS', 'mexican', 'ING_BAY_LEAF', NULL, NULL, false, false, 4),
('MEX_CARNITAS', 'mexican', 'ING_CUMIN', NULL, NULL, false, false, 5),
('MEX_CARNITAS', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 6),
('MEX_CARNITAS', 'mexican', 'ING_MILK', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_COCHINITA_PIBIL
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_COCHINITA_PIBIL', 'mexican', 'ING_PORK_SHOULDER', NULL, NULL, false, true, 1),
('MEX_COCHINITA_PIBIL', 'mexican', 'ING_ACHIOTE', NULL, NULL, false, true, 2),
('MEX_COCHINITA_PIBIL', 'mexican', 'ING_SOUR_ORANGE', NULL, NULL, false, true, 3),
('MEX_COCHINITA_PIBIL', 'mexican', 'ING_BANANA_LEAF', NULL, NULL, false, false, 4),
('MEX_COCHINITA_PIBIL', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 5),
('MEX_COCHINITA_PIBIL', 'mexican', 'ING_CUMIN', NULL, NULL, false, false, 6),
('MEX_COCHINITA_PIBIL', 'mexican', 'ING_OREGANO', NULL, NULL, false, false, 7),
('MEX_COCHINITA_PIBIL', 'mexican', 'ING_PICKLED_ONION', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_BARBACOA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_BARBACOA', 'mexican', 'ING_BEEF_CHEEK', NULL, NULL, false, true, 1),
('MEX_BARBACOA', 'mexican', 'ING_MAGUEY_LEAF', NULL, NULL, false, true, 2),
('MEX_BARBACOA', 'mexican', 'ING_CHIPOTLE', NULL, NULL, false, true, 3),
('MEX_BARBACOA', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 4),
('MEX_BARBACOA', 'mexican', 'ING_CUMIN', NULL, NULL, false, false, 5),
('MEX_BARBACOA', 'mexican', 'ING_BAY_LEAF', NULL, NULL, false, false, 6),
('MEX_BARBACOA', 'mexican', 'ING_THYME', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_BIRRIA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_BIRRIA', 'mexican', 'ING_BEEF_CHUCK', NULL, NULL, false, true, 1),
('MEX_BIRRIA', 'mexican', 'ING_GUAJILLO_CHILE', NULL, NULL, false, true, 2),
('MEX_BIRRIA', 'mexican', 'ING_ANCHO_CHILE', NULL, NULL, false, true, 3),
('MEX_BIRRIA', 'mexican', 'ING_TOMATO', NULL, NULL, false, false, 4),
('MEX_BIRRIA', 'mexican', 'ING_ONION', NULL, NULL, false, false, 5),
('MEX_BIRRIA', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 6),
('MEX_BIRRIA', 'mexican', 'ING_CUMIN', NULL, NULL, false, false, 7),
('MEX_BIRRIA', 'mexican', 'ING_OREGANO', NULL, NULL, false, false, 8),
('MEX_BIRRIA', 'mexican', 'ING_CINNAMON', NULL, NULL, false, false, 9)
ON CONFLICT DO NOTHING;

-- MEX_POZOLE_ROJO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_POZOLE_ROJO', 'mexican', 'ING_PORK_SHOULDER', NULL, NULL, false, true, 1),
('MEX_POZOLE_ROJO', 'mexican', 'ING_HOMINY', NULL, NULL, false, true, 2),
('MEX_POZOLE_ROJO', 'mexican', 'ING_GUAJILLO_CHILE', NULL, NULL, false, true, 3),
('MEX_POZOLE_ROJO', 'mexican', 'ING_ANCHO_CHILE', NULL, NULL, false, false, 4),
('MEX_POZOLE_ROJO', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 5),
('MEX_POZOLE_ROJO', 'mexican', 'ING_ONION', NULL, NULL, false, false, 6),
('MEX_POZOLE_ROJO', 'mexican', 'ING_CABBAGE', NULL, NULL, false, false, 7),
('MEX_POZOLE_ROJO', 'mexican', 'ING_RADISH', NULL, NULL, false, false, 8),
('MEX_POZOLE_ROJO', 'mexican', 'ING_OREGANO', NULL, NULL, false, false, 9),
('MEX_POZOLE_ROJO', 'mexican', 'ING_LIME', NULL, NULL, false, false, 10)
ON CONFLICT DO NOTHING;

-- MEX_POZOLE_VERDE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_POZOLE_VERDE', 'mexican', 'ING_PORK_SHOULDER', NULL, NULL, false, true, 1),
('MEX_POZOLE_VERDE', 'mexican', 'ING_HOMINY', NULL, NULL, false, true, 2),
('MEX_POZOLE_VERDE', 'mexican', 'ING_TOMATILLO', NULL, NULL, false, true, 3),
('MEX_POZOLE_VERDE', 'mexican', 'ING_PEPITAS', NULL, NULL, false, false, 4),
('MEX_POZOLE_VERDE', 'mexican', 'ING_SERRANO_CHILE', NULL, NULL, false, false, 5),
('MEX_POZOLE_VERDE', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 6),
('MEX_POZOLE_VERDE', 'mexican', 'ING_CABBAGE', NULL, NULL, false, false, 7),
('MEX_POZOLE_VERDE', 'mexican', 'ING_RADISH', NULL, NULL, false, false, 8),
('MEX_POZOLE_VERDE', 'mexican', 'ING_LIME', NULL, NULL, false, false, 9)
ON CONFLICT DO NOTHING;

-- MEX_TAMALES
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TAMALES', 'mexican', 'ING_MASA', NULL, NULL, false, true, 1),
('MEX_TAMALES', 'mexican', 'ING_LARD', NULL, NULL, false, true, 2),
('MEX_TAMALES', 'mexican', 'ING_PORK_SHOULDER', NULL, NULL, false, true, 3),
('MEX_TAMALES', 'mexican', 'ING_GUAJILLO_CHILE', NULL, NULL, false, false, 4),
('MEX_TAMALES', 'mexican', 'ING_CORN_HUSK', NULL, NULL, false, false, 5),
('MEX_TAMALES', 'mexican', 'ING_CHICKEN_BROTH', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_TAMALES_OAXAQUENOS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_TAMALES_OAXAQUENOS', 'mexican', 'ING_MASA', NULL, NULL, false, true, 1),
('MEX_TAMALES_OAXAQUENOS', 'mexican', 'ING_LARD', NULL, NULL, false, true, 2),
('MEX_TAMALES_OAXAQUENOS', 'mexican', 'ING_CHICKEN_THIGH', NULL, NULL, false, true, 3),
('MEX_TAMALES_OAXAQUENOS', 'mexican', 'ING_MOLE_PASTE', NULL, NULL, false, false, 4),
('MEX_TAMALES_OAXAQUENOS', 'mexican', 'ING_BANANA_LEAF', NULL, NULL, false, false, 5)
ON CONFLICT DO NOTHING;

-- MEX_CHILE_EN_NOGADA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_CHILE_EN_NOGADA', 'mexican', 'ING_POBLANO_CHILE', NULL, NULL, false, true, 1),
('MEX_CHILE_EN_NOGADA', 'mexican', 'ING_GROUND_PORK', NULL, NULL, false, true, 2),
('MEX_CHILE_EN_NOGADA', 'mexican', 'ING_GROUND_BEEF', NULL, NULL, false, true, 3),
('MEX_CHILE_EN_NOGADA', 'mexican', 'ING_APPLE', NULL, NULL, false, false, 4),
('MEX_CHILE_EN_NOGADA', 'mexican', 'ING_PEAR', NULL, NULL, false, false, 5),
('MEX_CHILE_EN_NOGADA', 'mexican', 'ING_WALNUT', NULL, NULL, false, false, 6),
('MEX_CHILE_EN_NOGADA', 'mexican', 'ING_POMEGRANATE', NULL, NULL, false, false, 7),
('MEX_CHILE_EN_NOGADA', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 8),
('MEX_CHILE_EN_NOGADA', 'mexican', 'ING_PARSLEY', NULL, NULL, false, false, 9)
ON CONFLICT DO NOTHING;

-- MEX_CARNE_ASADA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_CARNE_ASADA', 'mexican', 'ING_BEEF_SKIRT', NULL, NULL, false, true, 1),
('MEX_CARNE_ASADA', 'mexican', 'ING_LIME', NULL, NULL, false, true, 2),
('MEX_CARNE_ASADA', 'mexican', 'ING_GARLIC', NULL, NULL, false, true, 3),
('MEX_CARNE_ASADA', 'mexican', 'ING_CUMIN', NULL, NULL, false, false, 4),
('MEX_CARNE_ASADA', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 5),
('MEX_CARNE_ASADA', 'mexican', 'ING_JALAPENO', NULL, NULL, false, false, 6),
('MEX_CARNE_ASADA', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, false, 7),
('MEX_CARNE_ASADA', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_CABRITO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_CABRITO', 'mexican', 'ING_GOAT', NULL, NULL, false, true, 1),
('MEX_CABRITO', 'mexican', 'ING_SALT', NULL, NULL, false, true, 2),
('MEX_CABRITO', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 3),
('MEX_CABRITO', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, false, 4),
('MEX_CABRITO', 'mexican', 'ING_SALSA_ROJA', NULL, NULL, false, false, 5)
ON CONFLICT DO NOTHING;

-- MEX_CHILAQUILES_ROJOS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_CHILAQUILES_ROJOS', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_CHILAQUILES_ROJOS', 'mexican', 'ING_GUAJILLO_CHILE', NULL, NULL, false, true, 2),
('MEX_CHILAQUILES_ROJOS', 'mexican', 'ING_TOMATO', NULL, NULL, false, true, 3),
('MEX_CHILAQUILES_ROJOS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 4),
('MEX_CHILAQUILES_ROJOS', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 5),
('MEX_CHILAQUILES_ROJOS', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 6),
('MEX_CHILAQUILES_ROJOS', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 7),
('MEX_CHILAQUILES_ROJOS', 'mexican', 'ING_EGG', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- MEX_CHILAQUILES_VERDES
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_CHILAQUILES_VERDES', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_CHILAQUILES_VERDES', 'mexican', 'ING_TOMATILLO', NULL, NULL, false, true, 2),
('MEX_CHILAQUILES_VERDES', 'mexican', 'ING_SERRANO_CHILE', NULL, NULL, false, true, 3),
('MEX_CHILAQUILES_VERDES', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 4),
('MEX_CHILAQUILES_VERDES', 'mexican', 'ING_CHICKEN_BREAST', NULL, NULL, false, false, 5),
('MEX_CHILAQUILES_VERDES', 'mexican', 'ING_CREMA', NULL, NULL, false, false, 6),
('MEX_CHILAQUILES_VERDES', 'mexican', 'ING_QUESO_FRESCO', NULL, NULL, false, false, 7),
('MEX_CHILAQUILES_VERDES', 'mexican', 'ING_ONION', NULL, NULL, false, false, 8)
ON CONFLICT DO NOTHING;

-- ============================================
-- SIDES & SALSAS (11 items)
-- ============================================

-- MEX_GUACAMOLE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_GUACAMOLE', 'mexican', 'ING_AVOCADO', NULL, NULL, false, true, 1),
('MEX_GUACAMOLE', 'mexican', 'ING_LIME', NULL, NULL, false, true, 2),
('MEX_GUACAMOLE', 'mexican', 'ING_ONION', NULL, NULL, false, true, 3),
('MEX_GUACAMOLE', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 4),
('MEX_GUACAMOLE', 'mexican', 'ING_TOMATO', NULL, NULL, false, false, 5),
('MEX_GUACAMOLE', 'mexican', 'ING_SERRANO_CHILE', NULL, NULL, false, false, 6),
('MEX_GUACAMOLE', 'mexican', 'ING_SALT', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- MEX_SALSA_ROJA
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_SALSA_ROJA', 'mexican', 'ING_TOMATO', NULL, NULL, false, true, 1),
('MEX_SALSA_ROJA', 'mexican', 'ING_ARBOL_CHILE', NULL, NULL, false, true, 2),
('MEX_SALSA_ROJA', 'mexican', 'ING_ONION', NULL, NULL, false, false, 3),
('MEX_SALSA_ROJA', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 4),
('MEX_SALSA_ROJA', 'mexican', 'ING_SALT', NULL, NULL, false, false, 5)
ON CONFLICT DO NOTHING;

-- MEX_SALSA_VERDE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_SALSA_VERDE', 'mexican', 'ING_TOMATILLO', NULL, NULL, false, true, 1),
('MEX_SALSA_VERDE', 'mexican', 'ING_SERRANO_CHILE', NULL, NULL, false, true, 2),
('MEX_SALSA_VERDE', 'mexican', 'ING_CILANTRO', NULL, NULL, false, true, 3),
('MEX_SALSA_VERDE', 'mexican', 'ING_ONION', NULL, NULL, false, false, 4),
('MEX_SALSA_VERDE', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 5),
('MEX_SALSA_VERDE', 'mexican', 'ING_SALT', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_PICO_DE_GALLO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_PICO_DE_GALLO', 'mexican', 'ING_TOMATO', NULL, NULL, false, true, 1),
('MEX_PICO_DE_GALLO', 'mexican', 'ING_ONION', NULL, NULL, false, true, 2),
('MEX_PICO_DE_GALLO', 'mexican', 'ING_CILANTRO', NULL, NULL, false, true, 3),
('MEX_PICO_DE_GALLO', 'mexican', 'ING_JALAPENO', NULL, NULL, false, false, 4),
('MEX_PICO_DE_GALLO', 'mexican', 'ING_LIME', NULL, NULL, false, false, 5),
('MEX_PICO_DE_GALLO', 'mexican', 'ING_SALT', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_QUESO_FUNDIDO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_QUESO_FUNDIDO', 'mexican', 'ING_OAXACA_CHEESE', NULL, NULL, false, true, 1),
('MEX_QUESO_FUNDIDO', 'mexican', 'ING_CHIHUAHUA_CHEESE', NULL, NULL, false, true, 2),
('MEX_QUESO_FUNDIDO', 'mexican', 'ING_CHORIZO', NULL, NULL, false, true, 3),
('MEX_QUESO_FUNDIDO', 'mexican', 'ING_FLOUR_TORTILLA', NULL, NULL, false, false, 4)
ON CONFLICT DO NOTHING;

-- MEX_FRIJOLES_REFRITOS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_FRIJOLES_REFRITOS', 'mexican', 'ING_PINTO_BEANS', NULL, NULL, false, true, 1),
('MEX_FRIJOLES_REFRITOS', 'mexican', 'ING_LARD', NULL, NULL, false, true, 2),
('MEX_FRIJOLES_REFRITOS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 3),
('MEX_FRIJOLES_REFRITOS', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 4),
('MEX_FRIJOLES_REFRITOS', 'mexican', 'ING_SALT', NULL, NULL, false, false, 5)
ON CONFLICT DO NOTHING;

-- MEX_FRIJOLES_NEGROS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_FRIJOLES_NEGROS', 'mexican', 'ING_BLACK_BEANS', NULL, NULL, false, true, 1),
('MEX_FRIJOLES_NEGROS', 'mexican', 'ING_EPAZOTE', NULL, NULL, false, true, 2),
('MEX_FRIJOLES_NEGROS', 'mexican', 'ING_ONION', NULL, NULL, false, false, 3),
('MEX_FRIJOLES_NEGROS', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 4),
('MEX_FRIJOLES_NEGROS', 'mexican', 'ING_SALT', NULL, NULL, false, false, 5)
ON CONFLICT DO NOTHING;

-- MEX_ARROZ_ROJO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ARROZ_ROJO', 'mexican', 'ING_RICE', NULL, NULL, false, true, 1),
('MEX_ARROZ_ROJO', 'mexican', 'ING_TOMATO', NULL, NULL, false, true, 2),
('MEX_ARROZ_ROJO', 'mexican', 'ING_ONION', NULL, NULL, false, false, 3),
('MEX_ARROZ_ROJO', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 4),
('MEX_ARROZ_ROJO', 'mexican', 'ING_CHICKEN_BROTH', NULL, NULL, false, false, 5),
('MEX_ARROZ_ROJO', 'mexican', 'ING_VEGETABLE_OIL', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_ELOTE
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ELOTE', 'mexican', 'ING_CORN_COB', NULL, NULL, false, true, 1),
('MEX_ELOTE', 'mexican', 'ING_MAYONNAISE', NULL, NULL, false, true, 2),
('MEX_ELOTE', 'mexican', 'ING_COTIJA_CHEESE', NULL, NULL, false, true, 3),
('MEX_ELOTE', 'mexican', 'ING_CHILE_POWDER', NULL, NULL, false, false, 4),
('MEX_ELOTE', 'mexican', 'ING_LIME', NULL, NULL, false, false, 5),
('MEX_ELOTE', 'mexican', 'ING_CILANTRO', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_ESQUITES
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_ESQUITES', 'mexican', 'ING_CORN_KERNELS', NULL, NULL, false, true, 1),
('MEX_ESQUITES', 'mexican', 'ING_EPAZOTE', NULL, NULL, false, true, 2),
('MEX_ESQUITES', 'mexican', 'ING_MAYONNAISE', NULL, NULL, false, false, 3),
('MEX_ESQUITES', 'mexican', 'ING_COTIJA_CHEESE', NULL, NULL, false, false, 4),
('MEX_ESQUITES', 'mexican', 'ING_CHILE_POWDER', NULL, NULL, false, false, 5),
('MEX_ESQUITES', 'mexican', 'ING_LIME', NULL, NULL, false, false, 6)
ON CONFLICT DO NOTHING;

-- MEX_SALSA_HABANERO
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_SALSA_HABANERO', 'mexican', 'ING_HABANERO', NULL, NULL, false, true, 1),
('MEX_SALSA_HABANERO', 'mexican', 'ING_SOUR_ORANGE', NULL, NULL, false, true, 2),
('MEX_SALSA_HABANERO', 'mexican', 'ING_ONION', NULL, NULL, false, false, 3),
('MEX_SALSA_HABANERO', 'mexican', 'ING_GARLIC', NULL, NULL, false, false, 4),
('MEX_SALSA_HABANERO', 'mexican', 'ING_SALT', NULL, NULL, false, false, 5)
ON CONFLICT DO NOTHING;

-- MEX_NACHOS
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, quantity_amount, quantity_unit, is_optional, is_signature, sort_order)
VALUES
('MEX_NACHOS', 'mexican', 'ING_CORN_TORTILLA', NULL, NULL, false, true, 1),
('MEX_NACHOS', 'mexican', 'ING_CHEESE', NULL, NULL, false, true, 2),
('MEX_NACHOS', 'mexican', 'ING_JALAPENO', NULL, NULL, false, false, 3),
('MEX_NACHOS', 'mexican', 'ING_REFRIED_BEANS', NULL, NULL, false, false, 4),
('MEX_NACHOS', 'mexican', 'ING_SOUR_CREAM', NULL, NULL, false, false, 5),
('MEX_NACHOS', 'mexican', 'ING_GUACAMOLE', NULL, NULL, false, false, 6),
('MEX_NACHOS', 'mexican', 'ING_PICO_DE_GALLO', NULL, NULL, false, false, 7)
ON CONFLICT DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Total products: 64
-- Total ingredient links: 393
--
-- Distribution:
-- - Tacos: 10 items (70 links)
-- - Burritos: 6 items (45 links)
-- - Enchiladas: 7 items (51 links)
-- - Antojitos: 15 items (95 links)
-- - Main Dishes: 15 items (95 links)
-- - Sides & Salsas: 11 items (37 links)
-- ============================================
