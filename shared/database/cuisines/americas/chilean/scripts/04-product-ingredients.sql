-- Chilean Cuisine Database - Script 04: Product Ingredients
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- Links: ~310 product_ingredients

-- Clear existing Chilean links
DELETE FROM product_ingredients WHERE product_type = 'chilean';

-- ===========================================
-- EMPANADAS
-- ===========================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES
-- Empanada de Pino
('chilean', 'CHL_EMPANADA_PINO', 'ING_BEEF', 'main', 200, 'g', false, 1),
('chilean', 'CHL_EMPANADA_PINO', 'ING_ONION', 'main', 150, 'g', false, 2),
('chilean', 'CHL_EMPANADA_PINO', 'ING_OLIVE', 'main', 30, 'g', false, 3),
('chilean', 'CHL_EMPANADA_PINO', 'ING_EGG', 'main', 1, 'unit', false, 4),
('chilean', 'CHL_EMPANADA_PINO', 'ING_RAISIN', 'secondary', 20, 'g', false, 5),
('chilean', 'CHL_EMPANADA_PINO', 'ING_FLOUR', 'main', 100, 'g', false, 6),
('chilean', 'CHL_EMPANADA_PINO', 'ING_LARD', 'secondary', 30, 'g', false, 7),
('chilean', 'CHL_EMPANADA_PINO', 'ING_CUMIN', 'seasoning', 2, 'g', false, 8),
('chilean', 'CHL_EMPANADA_PINO', 'ING_PAPRIKA', 'seasoning', 2, 'g', false, 9),
-- Empanada de Queso
('chilean', 'CHL_EMPANADA_QUESO', 'ING_CHEESE', 'main', 100, 'g', false, 1),
('chilean', 'CHL_EMPANADA_QUESO', 'ING_FLOUR', 'main', 80, 'g', false, 2),
('chilean', 'CHL_EMPANADA_QUESO', 'ING_BUTTER', 'secondary', 20, 'g', false, 3),
('chilean', 'CHL_EMPANADA_QUESO', 'ING_VEGETABLE_OIL', 'secondary', 100, 'ml', false, 4),
-- Empanada de Mariscos
('chilean', 'CHL_EMPANADA_MARISCOS', 'ING_SHRIMP', 'main', 80, 'g', false, 1),
('chilean', 'CHL_EMPANADA_MARISCOS', 'ING_MUSSEL', 'main', 60, 'g', false, 2),
('chilean', 'CHL_EMPANADA_MARISCOS', 'ING_CLAM', 'main', 60, 'g', false, 3),
('chilean', 'CHL_EMPANADA_MARISCOS', 'ING_CREAM', 'secondary', 50, 'ml', false, 4),
('chilean', 'CHL_EMPANADA_MARISCOS', 'ING_ONION', 'secondary', 30, 'g', false, 5),
('chilean', 'CHL_EMPANADA_MARISCOS', 'ING_FLOUR', 'main', 80, 'g', false, 6),
('chilean', 'CHL_EMPANADA_MARISCOS', 'ING_WHITE_WINE', 'secondary', 30, 'ml', false, 7),
-- Empanada Napolitana
('chilean', 'CHL_EMPANADA_NAPOLITANA', 'ING_HAM', 'main', 60, 'g', false, 1),
('chilean', 'CHL_EMPANADA_NAPOLITANA', 'ING_CHEESE', 'main', 50, 'g', false, 2),
('chilean', 'CHL_EMPANADA_NAPOLITANA', 'ING_TOMATO', 'main', 40, 'g', false, 3),
('chilean', 'CHL_EMPANADA_NAPOLITANA', 'ING_OREGANO', 'seasoning', 1, 'g', false, 4),
('chilean', 'CHL_EMPANADA_NAPOLITANA', 'ING_FLOUR', 'main', 80, 'g', false, 5),
-- Empanada Camarón Queso
('chilean', 'CHL_EMPANADA_CAMARÓN_QUESO', 'ING_SHRIMP', 'main', 100, 'g', false, 1),
('chilean', 'CHL_EMPANADA_CAMARÓN_QUESO', 'ING_CHEESE', 'main', 60, 'g', false, 2),
('chilean', 'CHL_EMPANADA_CAMARÓN_QUESO', 'ING_ONION', 'secondary', 30, 'g', false, 3),
('chilean', 'CHL_EMPANADA_CAMARÓN_QUESO', 'ING_CREAM', 'secondary', 40, 'ml', false, 4),
('chilean', 'CHL_EMPANADA_CAMARÓN_QUESO', 'ING_FLOUR', 'main', 80, 'g', false, 5);

-- ===========================================
-- MAINS
-- ===========================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES
-- Pastel de Choclo
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_CORN', 'main', 500, 'g', false, 1),
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_BEEF', 'main', 200, 'g', false, 2),
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_CHICKEN', 'main', 150, 'g', false, 3),
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_ONION', 'main', 100, 'g', false, 4),
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_OLIVE', 'secondary', 30, 'g', false, 5),
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_EGG', 'secondary', 2, 'unit', false, 6),
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_RAISIN', 'secondary', 20, 'g', false, 7),
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_BASIL', 'seasoning', 5, 'g', false, 8),
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_CUMIN', 'seasoning', 2, 'g', false, 9),
('chilean', 'CHL_PASTEL_CHOCLO', 'ING_SUGAR', 'secondary', 20, 'g', false, 10),
-- Cazuela
('chilean', 'CHL_CAZUELA', 'ING_BEEF', 'main', 300, 'g', false, 1),
('chilean', 'CHL_CAZUELA', 'ING_POTATO', 'main', 200, 'g', false, 2),
('chilean', 'CHL_CAZUELA', 'ING_CORN', 'main', 1, 'unit', false, 3),
('chilean', 'CHL_CAZUELA', 'ING_PUMPKIN', 'main', 150, 'g', false, 4),
('chilean', 'CHL_CAZUELA', 'ING_GREEN_BEANS', 'secondary', 50, 'g', false, 5),
('chilean', 'CHL_CAZUELA', 'ING_RICE', 'secondary', 30, 'g', false, 6),
('chilean', 'CHL_CAZUELA', 'ING_ONION', 'secondary', 50, 'g', false, 7),
('chilean', 'CHL_CAZUELA', 'ING_CARROT', 'secondary', 50, 'g', false, 8),
('chilean', 'CHL_CAZUELA', 'ING_CILANTRO', 'garnish', 5, 'g', false, 9),
-- Curanto
('chilean', 'CHL_CURANTO', 'ING_CLAM', 'main', 200, 'g', false, 1),
('chilean', 'CHL_CURANTO', 'ING_MUSSEL', 'main', 200, 'g', false, 2),
('chilean', 'CHL_CURANTO', 'ING_PORK', 'main', 150, 'g', false, 3),
('chilean', 'CHL_CURANTO', 'ING_CHICKEN', 'main', 150, 'g', false, 4),
('chilean', 'CHL_CURANTO', 'ING_CHORIZO', 'main', 100, 'g', false, 5),
('chilean', 'CHL_CURANTO', 'ING_POTATO', 'main', 200, 'g', false, 6),
('chilean', 'CHL_CURANTO', 'ING_FLOUR', 'secondary', 100, 'g', false, 7),
-- Porotos Granados
('chilean', 'CHL_POROTOS_GRANADOS', 'ING_CRANBERRY_BEANS', 'main', 300, 'g', false, 1),
('chilean', 'CHL_POROTOS_GRANADOS', 'ING_CORN', 'main', 200, 'g', false, 2),
('chilean', 'CHL_POROTOS_GRANADOS', 'ING_PUMPKIN', 'main', 150, 'g', false, 3),
('chilean', 'CHL_POROTOS_GRANADOS', 'ING_ONION', 'secondary', 50, 'g', false, 4),
('chilean', 'CHL_POROTOS_GRANADOS', 'ING_GARLIC', 'seasoning', 10, 'g', false, 5),
('chilean', 'CHL_POROTOS_GRANADOS', 'ING_BASIL', 'seasoning', 5, 'g', false, 6),
('chilean', 'CHL_POROTOS_GRANADOS', 'ING_PAPRIKA', 'seasoning', 2, 'g', false, 7),
-- Charquicán
('chilean', 'CHL_CHARQUICÁN', 'ING_BEEF', 'main', 250, 'g', false, 1),
('chilean', 'CHL_CHARQUICÁN', 'ING_POTATO', 'main', 300, 'g', false, 2),
('chilean', 'CHL_CHARQUICÁN', 'ING_PUMPKIN', 'main', 150, 'g', false, 3),
('chilean', 'CHL_CHARQUICÁN', 'ING_ONION', 'secondary', 50, 'g', false, 4),
('chilean', 'CHL_CHARQUICÁN', 'ING_GARLIC', 'seasoning', 10, 'g', false, 5),
('chilean', 'CHL_CHARQUICÁN', 'ING_EGG', 'garnish', 1, 'unit', false, 6),
('chilean', 'CHL_CHARQUICÁN', 'ING_GREEN_BEANS', 'secondary', 50, 'g', false, 7),
('chilean', 'CHL_CHARQUICÁN', 'ING_OREGANO', 'seasoning', 2, 'g', false, 8),
-- Asado Alemán
('chilean', 'CHL_ASADO_ALEMÁN', 'ING_BEEF', 'main', 500, 'g', false, 1),
('chilean', 'CHL_ASADO_ALEMÁN', 'ING_SAUERKRAUT', 'main', 200, 'g', false, 2),
('chilean', 'CHL_ASADO_ALEMÁN', 'ING_POTATO', 'secondary', 200, 'g', false, 3),
('chilean', 'CHL_ASADO_ALEMÁN', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('chilean', 'CHL_ASADO_ALEMÁN', 'ING_MUSTARD', 'seasoning', 20, 'g', false, 5),
('chilean', 'CHL_ASADO_ALEMÁN', 'ING_BAY_LEAVES', 'seasoning', 2, 'unit', false, 6),
-- Caldillo de Congrio
('chilean', 'CHL_CALDILLO_CONGRIO', 'ING_CONGER_EEL', 'main', 300, 'g', false, 1),
('chilean', 'CHL_CALDILLO_CONGRIO', 'ING_POTATO', 'main', 150, 'g', false, 2),
('chilean', 'CHL_CALDILLO_CONGRIO', 'ING_TOMATO', 'main', 100, 'g', false, 3),
('chilean', 'CHL_CALDILLO_CONGRIO', 'ING_ONION', 'secondary', 50, 'g', false, 4),
('chilean', 'CHL_CALDILLO_CONGRIO', 'ING_GARLIC', 'seasoning', 10, 'g', false, 5),
('chilean', 'CHL_CALDILLO_CONGRIO', 'ING_WHITE_WINE', 'secondary', 50, 'ml', false, 6),
('chilean', 'CHL_CALDILLO_CONGRIO', 'ING_CREAM', 'secondary', 30, 'ml', false, 7),
('chilean', 'CHL_CALDILLO_CONGRIO', 'ING_CILANTRO', 'garnish', 5, 'g', false, 8),
-- Costillar
('chilean', 'CHL_COSTILLAR', 'ING_PORK_RIBS', 'main', 600, 'g', false, 1),
('chilean', 'CHL_COSTILLAR', 'ING_GARLIC', 'seasoning', 15, 'g', false, 2),
('chilean', 'CHL_COSTILLAR', 'ING_CUMIN', 'seasoning', 5, 'g', false, 3),
('chilean', 'CHL_COSTILLAR', 'ING_OREGANO', 'seasoning', 3, 'g', false, 4),
('chilean', 'CHL_COSTILLAR', 'ING_PAPRIKA', 'seasoning', 5, 'g', false, 5),
('chilean', 'CHL_COSTILLAR', 'ING_HONEY', 'secondary', 30, 'g', false, 6),
('chilean', 'CHL_COSTILLAR', 'ING_LEMON', 'secondary', 30, 'ml', false, 7);

-- ===========================================
-- SOUPS
-- ===========================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES
-- Cazuela de Vacuno
('chilean', 'CHL_CAZUELA_VACUNO', 'ING_BEEF', 'main', 300, 'g', false, 1),
('chilean', 'CHL_CAZUELA_VACUNO', 'ING_CORN', 'main', 1, 'unit', false, 2),
('chilean', 'CHL_CAZUELA_VACUNO', 'ING_POTATO', 'main', 200, 'g', false, 3),
('chilean', 'CHL_CAZUELA_VACUNO', 'ING_PUMPKIN', 'main', 150, 'g', false, 4),
('chilean', 'CHL_CAZUELA_VACUNO', 'ING_RICE', 'secondary', 30, 'g', false, 5),
('chilean', 'CHL_CAZUELA_VACUNO', 'ING_GREEN_BEANS', 'secondary', 50, 'g', false, 6),
('chilean', 'CHL_CAZUELA_VACUNO', 'ING_ONION', 'secondary', 50, 'g', false, 7),
('chilean', 'CHL_CAZUELA_VACUNO', 'ING_CILANTRO', 'garnish', 5, 'g', false, 8),
-- Cazuela de Ave
('chilean', 'CHL_CAZUELA_AVE', 'ING_CHICKEN', 'main', 300, 'g', false, 1),
('chilean', 'CHL_CAZUELA_AVE', 'ING_CORN', 'main', 1, 'unit', false, 2),
('chilean', 'CHL_CAZUELA_AVE', 'ING_POTATO', 'main', 200, 'g', false, 3),
('chilean', 'CHL_CAZUELA_AVE', 'ING_PUMPKIN', 'main', 150, 'g', false, 4),
('chilean', 'CHL_CAZUELA_AVE', 'ING_RICE', 'secondary', 30, 'g', false, 5),
('chilean', 'CHL_CAZUELA_AVE', 'ING_GREEN_BEANS', 'secondary', 50, 'g', false, 6),
('chilean', 'CHL_CAZUELA_AVE', 'ING_ONION', 'secondary', 50, 'g', false, 7),
('chilean', 'CHL_CAZUELA_AVE', 'ING_CILANTRO', 'garnish', 5, 'g', false, 8),
-- Pantrucas
('chilean', 'CHL_PANTRUCA', 'ING_FLOUR', 'main', 150, 'g', false, 1),
('chilean', 'CHL_PANTRUCA', 'ING_EGG', 'main', 1, 'unit', false, 2),
('chilean', 'CHL_PANTRUCA', 'ING_BEEF_BROTH', 'main', 1000, 'ml', false, 3),
('chilean', 'CHL_PANTRUCA', 'ING_POTATO', 'secondary', 100, 'g', false, 4),
('chilean', 'CHL_PANTRUCA', 'ING_ONION', 'secondary', 50, 'g', false, 5),
('chilean', 'CHL_PANTRUCA', 'ING_CARROT', 'secondary', 50, 'g', false, 6),
('chilean', 'CHL_PANTRUCA', 'ING_CILANTRO', 'garnish', 5, 'g', false, 7),
-- Carbonada
('chilean', 'CHL_CARBONADA', 'ING_BEEF', 'main', 250, 'g', false, 1),
('chilean', 'CHL_CARBONADA', 'ING_POTATO', 'main', 200, 'g', false, 2),
('chilean', 'CHL_CARBONADA', 'ING_PUMPKIN', 'main', 100, 'g', false, 3),
('chilean', 'CHL_CARBONADA', 'ING_CORN', 'main', 100, 'g', false, 4),
('chilean', 'CHL_CARBONADA', 'ING_RICE', 'secondary', 30, 'g', false, 5),
('chilean', 'CHL_CARBONADA', 'ING_ONION', 'secondary', 50, 'g', false, 6),
('chilean', 'CHL_CARBONADA', 'ING_GREEN_BEANS', 'secondary', 30, 'g', false, 7),
('chilean', 'CHL_CARBONADA', 'ING_PARSLEY', 'garnish', 5, 'g', false, 8),
-- Valdiviano
('chilean', 'CHL_VALDIVIANO', 'ING_CHARQUI', 'main', 100, 'g', false, 1),
('chilean', 'CHL_VALDIVIANO', 'ING_ONION', 'main', 150, 'g', false, 2),
('chilean', 'CHL_VALDIVIANO', 'ING_EGG', 'main', 2, 'unit', false, 3),
('chilean', 'CHL_VALDIVIANO', 'ING_POTATO', 'secondary', 100, 'g', false, 4),
('chilean', 'CHL_VALDIVIANO', 'ING_OREGANO', 'seasoning', 2, 'g', false, 5),
('chilean', 'CHL_VALDIVIANO', 'ING_BEEF_BROTH', 'secondary', 500, 'ml', false, 6);

-- ===========================================
-- SEAFOOD
-- ===========================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES
-- Ceviche Chileno
('chilean', 'CHL_CEVICHE', 'ING_CORVINA', 'main', 300, 'g', false, 1),
('chilean', 'CHL_CEVICHE', 'ING_LIME', 'main', 100, 'ml', false, 2),
('chilean', 'CHL_CEVICHE', 'ING_ONION', 'main', 80, 'g', false, 3),
('chilean', 'CHL_CEVICHE', 'ING_CILANTRO', 'garnish', 10, 'g', false, 4),
('chilean', 'CHL_CEVICHE', 'ING_CHILI', 'seasoning', 5, 'g', false, 5),
('chilean', 'CHL_CEVICHE', 'ING_SALT', 'seasoning', 5, 'g', false, 6),
-- Machas a la Parmesana
('chilean', 'CHL_MACHAS_PARMESANA', 'ING_RAZOR_CLAM', 'main', 300, 'g', false, 1),
('chilean', 'CHL_MACHAS_PARMESANA', 'ING_PARMESAN', 'main', 50, 'g', false, 2),
('chilean', 'CHL_MACHAS_PARMESANA', 'ING_WHITE_WINE', 'secondary', 30, 'ml', false, 3),
('chilean', 'CHL_MACHAS_PARMESANA', 'ING_BUTTER', 'secondary', 30, 'g', false, 4),
('chilean', 'CHL_MACHAS_PARMESANA', 'ING_GARLIC', 'seasoning', 10, 'g', false, 5),
-- Locos con Mayonesa
('chilean', 'CHL_LOCOS_MAYO', 'ING_ABALONE', 'main', 200, 'g', false, 1),
('chilean', 'CHL_LOCOS_MAYO', 'ING_MAYONNAISE', 'main', 60, 'g', false, 2),
('chilean', 'CHL_LOCOS_MAYO', 'ING_LEMON', 'secondary', 30, 'ml', false, 3),
('chilean', 'CHL_LOCOS_MAYO', 'ING_PARSLEY', 'garnish', 5, 'g', false, 4),
-- Choritos al Vapor
('chilean', 'CHL_CHORITOS_VAPOR', 'ING_MUSSEL', 'main', 500, 'g', false, 1),
('chilean', 'CHL_CHORITOS_VAPOR', 'ING_WHITE_WINE', 'main', 100, 'ml', false, 2),
('chilean', 'CHL_CHORITOS_VAPOR', 'ING_GARLIC', 'seasoning', 15, 'g', false, 3),
('chilean', 'CHL_CHORITOS_VAPOR', 'ING_PARSLEY', 'garnish', 10, 'g', false, 4),
('chilean', 'CHL_CHORITOS_VAPOR', 'ING_BUTTER', 'secondary', 30, 'g', false, 5),
-- Reineta a la Plancha
('chilean', 'CHL_REINETA_PLANCHA', 'ING_BREAM', 'main', 300, 'g', false, 1),
('chilean', 'CHL_REINETA_PLANCHA', 'ING_LEMON', 'secondary', 30, 'ml', false, 2),
('chilean', 'CHL_REINETA_PLANCHA', 'ING_OLIVE_OIL', 'secondary', 20, 'ml', false, 3),
('chilean', 'CHL_REINETA_PLANCHA', 'ING_GARLIC', 'seasoning', 10, 'g', false, 4),
('chilean', 'CHL_REINETA_PLANCHA', 'ING_PARSLEY', 'garnish', 5, 'g', false, 5),
-- Paila Marina
('chilean', 'CHL_PAILA_MARINA', 'ING_MUSSEL', 'main', 150, 'g', false, 1),
('chilean', 'CHL_PAILA_MARINA', 'ING_CLAM', 'main', 150, 'g', false, 2),
('chilean', 'CHL_PAILA_MARINA', 'ING_SHRIMP', 'main', 100, 'g', false, 3),
('chilean', 'CHL_PAILA_MARINA', 'ING_WHITE_FISH', 'main', 100, 'g', false, 4),
('chilean', 'CHL_PAILA_MARINA', 'ING_ONION', 'secondary', 50, 'g', false, 5),
('chilean', 'CHL_PAILA_MARINA', 'ING_GARLIC', 'seasoning', 10, 'g', false, 6),
('chilean', 'CHL_PAILA_MARINA', 'ING_WHITE_WINE', 'secondary', 50, 'ml', false, 7),
('chilean', 'CHL_PAILA_MARINA', 'ING_CILANTRO', 'garnish', 5, 'g', false, 8);

-- ===========================================
-- STREET FOOD
-- ===========================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES
-- Completo
('chilean', 'CHL_COMPLETO', 'ING_HOT_DOG', 'main', 1, 'unit', false, 1),
('chilean', 'CHL_COMPLETO', 'ING_HOT_DOG_BUN', 'main', 1, 'unit', false, 2),
('chilean', 'CHL_COMPLETO', 'ING_AVOCADO', 'main', 50, 'g', false, 3),
('chilean', 'CHL_COMPLETO', 'ING_TOMATO', 'main', 40, 'g', false, 4),
('chilean', 'CHL_COMPLETO', 'ING_MAYONNAISE', 'main', 30, 'g', false, 5),
('chilean', 'CHL_COMPLETO', 'ING_SAUERKRAUT', 'secondary', 30, 'g', false, 6),
-- Italiano
('chilean', 'CHL_ITALIANO', 'ING_HOT_DOG', 'main', 1, 'unit', false, 1),
('chilean', 'CHL_ITALIANO', 'ING_HOT_DOG_BUN', 'main', 1, 'unit', false, 2),
('chilean', 'CHL_ITALIANO', 'ING_AVOCADO', 'main', 50, 'g', false, 3),
('chilean', 'CHL_ITALIANO', 'ING_TOMATO', 'main', 40, 'g', false, 4),
('chilean', 'CHL_ITALIANO', 'ING_MAYONNAISE', 'main', 30, 'g', false, 5),
-- Sopaipillas
('chilean', 'CHL_SOPAIPILLA', 'ING_PUMPKIN', 'main', 200, 'g', false, 1),
('chilean', 'CHL_SOPAIPILLA', 'ING_FLOUR', 'main', 250, 'g', false, 2),
('chilean', 'CHL_SOPAIPILLA', 'ING_VEGETABLE_OIL', 'main', 200, 'ml', false, 3),
('chilean', 'CHL_SOPAIPILLA', 'ING_SALT', 'seasoning', 5, 'g', false, 4),
-- Sopaipilla Pasada
('chilean', 'CHL_SOPAIPILLA_PASADA', 'ING_PUMPKIN', 'main', 200, 'g', false, 1),
('chilean', 'CHL_SOPAIPILLA_PASADA', 'ING_FLOUR', 'main', 250, 'g', false, 2),
('chilean', 'CHL_SOPAIPILLA_PASADA', 'ING_PANELA', 'main', 200, 'g', false, 3),
('chilean', 'CHL_SOPAIPILLA_PASADA', 'ING_CINNAMON', 'seasoning', 5, 'g', false, 4),
('chilean', 'CHL_SOPAIPILLA_PASADA', 'ING_ORANGE_ZEST', 'secondary', 5, 'g', false, 5),
('chilean', 'CHL_SOPAIPILLA_PASADA', 'ING_VEGETABLE_OIL', 'secondary', 200, 'ml', false, 6),
-- Anticuchos
('chilean', 'CHL_ANTICUCHO', 'ING_BEEF_HEART', 'main', 300, 'g', false, 1),
('chilean', 'CHL_ANTICUCHO', 'ING_CUMIN', 'seasoning', 5, 'g', false, 2),
('chilean', 'CHL_ANTICUCHO', 'ING_GARLIC', 'seasoning', 15, 'g', false, 3),
('chilean', 'CHL_ANTICUCHO', 'ING_CHILI', 'seasoning', 10, 'g', false, 4),
('chilean', 'CHL_ANTICUCHO', 'ING_VINEGAR', 'secondary', 30, 'ml', false, 5),
('chilean', 'CHL_ANTICUCHO', 'ING_OREGANO', 'seasoning', 3, 'g', false, 6),
-- Choripán
('chilean', 'CHL_CHORIPAN', 'ING_CHORIZO', 'main', 1, 'unit', false, 1),
('chilean', 'CHL_CHORIPAN', 'ING_BREAD', 'main', 1, 'unit', false, 2),
('chilean', 'CHL_CHORIPAN', 'ING_TOMATO', 'secondary', 30, 'g', false, 3),
('chilean', 'CHL_CHORIPAN', 'ING_ONION', 'secondary', 20, 'g', false, 4),
('chilean', 'CHL_CHORIPAN', 'ING_CILANTRO', 'garnish', 5, 'g', false, 5),
('chilean', 'CHL_CHORIPAN', 'ING_CHILI', 'seasoning', 5, 'g', false, 6),
('chilean', 'CHL_CHORIPAN', 'ING_OLIVE_OIL', 'secondary', 10, 'ml', false, 7);

-- ===========================================
-- APPETIZERS
-- ===========================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES
-- Pebre
('chilean', 'CHL_PEBRE', 'ING_TOMATO', 'main', 150, 'g', false, 1),
('chilean', 'CHL_PEBRE', 'ING_ONION', 'main', 100, 'g', false, 2),
('chilean', 'CHL_PEBRE', 'ING_CILANTRO', 'main', 30, 'g', false, 3),
('chilean', 'CHL_PEBRE', 'ING_CHILI', 'main', 20, 'g', false, 4),
('chilean', 'CHL_PEBRE', 'ING_GARLIC', 'seasoning', 10, 'g', false, 5),
('chilean', 'CHL_PEBRE', 'ING_OLIVE_OIL', 'secondary', 30, 'ml', false, 6),
('chilean', 'CHL_PEBRE', 'ING_LEMON', 'secondary', 20, 'ml', false, 7),
('chilean', 'CHL_PEBRE', 'ING_SALT', 'seasoning', 3, 'g', false, 8),
-- Chancho en Piedra
('chilean', 'CHL_CHANCHO_PIEDRA', 'ING_TOMATO', 'main', 200, 'g', false, 1),
('chilean', 'CHL_CHANCHO_PIEDRA', 'ING_CHILI', 'main', 20, 'g', false, 2),
('chilean', 'CHL_CHANCHO_PIEDRA', 'ING_GARLIC', 'main', 15, 'g', false, 3),
('chilean', 'CHL_CHANCHO_PIEDRA', 'ING_CILANTRO', 'secondary', 15, 'g', false, 4),
('chilean', 'CHL_CHANCHO_PIEDRA', 'ING_OLIVE_OIL', 'secondary', 30, 'ml', false, 5),
('chilean', 'CHL_CHANCHO_PIEDRA', 'ING_SALT', 'seasoning', 3, 'g', false, 6),
-- Ensalada Chilena
('chilean', 'CHL_ENSALADA_CHILENA', 'ING_TOMATO', 'main', 200, 'g', false, 1),
('chilean', 'CHL_ENSALADA_CHILENA', 'ING_ONION', 'main', 100, 'g', false, 2),
('chilean', 'CHL_ENSALADA_CHILENA', 'ING_OLIVE_OIL', 'secondary', 30, 'ml', false, 3),
('chilean', 'CHL_ENSALADA_CHILENA', 'ING_SALT', 'seasoning', 3, 'g', false, 4),
('chilean', 'CHL_ENSALADA_CHILENA', 'ING_CILANTRO', 'garnish', 10, 'g', true, 5),
-- Palta Reina
('chilean', 'CHL_PALTA_REINA', 'ING_AVOCADO', 'main', 1, 'unit', false, 1),
('chilean', 'CHL_PALTA_REINA', 'ING_CHICKEN', 'main', 100, 'g', false, 2),
('chilean', 'CHL_PALTA_REINA', 'ING_MAYONNAISE', 'main', 40, 'g', false, 3),
('chilean', 'CHL_PALTA_REINA', 'ING_CELERY', 'secondary', 20, 'g', false, 4),
('chilean', 'CHL_PALTA_REINA', 'ING_LEMON', 'secondary', 10, 'ml', false, 5),
-- Erizos
('chilean', 'CHL_ERIZOS', 'ING_SEA_URCHIN', 'main', 150, 'g', false, 1),
('chilean', 'CHL_ERIZOS', 'ING_LEMON', 'secondary', 30, 'ml', false, 2),
('chilean', 'CHL_ERIZOS', 'ING_ONION', 'secondary', 20, 'g', true, 3),
('chilean', 'CHL_ERIZOS', 'ING_CILANTRO', 'garnish', 5, 'g', true, 4);

-- ===========================================
-- DESSERTS & BEVERAGES
-- ===========================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES
-- Mote con Huesillo
('chilean', 'CHL_MOTE_HUESILLO', 'ING_WHEAT_BERRIES', 'main', 150, 'g', false, 1),
('chilean', 'CHL_MOTE_HUESILLO', 'ING_DRIED_PEACH', 'main', 100, 'g', false, 2),
('chilean', 'CHL_MOTE_HUESILLO', 'ING_SUGAR', 'main', 150, 'g', false, 3),
('chilean', 'CHL_MOTE_HUESILLO', 'ING_CINNAMON', 'seasoning', 5, 'g', false, 4),
('chilean', 'CHL_MOTE_HUESILLO', 'ING_WATER', 'secondary', 1000, 'ml', false, 5),
-- Leche Asada
('chilean', 'CHL_LECHE_ASADA', 'ING_MILK', 'main', 500, 'ml', false, 1),
('chilean', 'CHL_LECHE_ASADA', 'ING_EGG', 'main', 4, 'unit', false, 2),
('chilean', 'CHL_LECHE_ASADA', 'ING_SUGAR', 'main', 150, 'g', false, 3),
('chilean', 'CHL_LECHE_ASADA', 'ING_VANILLA', 'seasoning', 5, 'ml', false, 4),
('chilean', 'CHL_LECHE_ASADA', 'ING_CINNAMON', 'seasoning', 3, 'g', false, 5),
-- Alfajor Chileno
('chilean', 'CHL_ALFAJOR', 'ING_FLOUR', 'main', 200, 'g', false, 1),
('chilean', 'CHL_ALFAJOR', 'ING_CORNSTARCH', 'main', 100, 'g', false, 2),
('chilean', 'CHL_ALFAJOR', 'ING_DULCE_DE_LECHE', 'main', 150, 'g', false, 3),
('chilean', 'CHL_ALFAJOR', 'ING_CHOCOLATE', 'main', 100, 'g', false, 4),
('chilean', 'CHL_ALFAJOR', 'ING_BUTTER', 'secondary', 100, 'g', false, 5),
('chilean', 'CHL_ALFAJOR', 'ING_EGG', 'secondary', 2, 'unit', false, 6),
('chilean', 'CHL_ALFAJOR', 'ING_SUGAR', 'secondary', 50, 'g', false, 7),
-- Kuchen
('chilean', 'CHL_KUCHEN', 'ING_FLOUR', 'main', 250, 'g', false, 1),
('chilean', 'CHL_KUCHEN', 'ING_APPLE', 'main', 300, 'g', false, 2),
('chilean', 'CHL_KUCHEN', 'ING_BUTTER', 'main', 100, 'g', false, 3),
('chilean', 'CHL_KUCHEN', 'ING_EGG', 'secondary', 2, 'unit', false, 4),
('chilean', 'CHL_KUCHEN', 'ING_SUGAR', 'secondary', 100, 'g', false, 5),
('chilean', 'CHL_KUCHEN', 'ING_CINNAMON', 'seasoning', 5, 'g', false, 6),
('chilean', 'CHL_KUCHEN', 'ING_CREAM', 'secondary', 100, 'ml', false, 7),
-- Brazo de Reina
('chilean', 'CHL_BRAZO_REINA', 'ING_FLOUR', 'main', 150, 'g', false, 1),
('chilean', 'CHL_BRAZO_REINA', 'ING_EGG', 'main', 4, 'unit', false, 2),
('chilean', 'CHL_BRAZO_REINA', 'ING_SUGAR', 'main', 100, 'g', false, 3),
('chilean', 'CHL_BRAZO_REINA', 'ING_DULCE_DE_LECHE', 'main', 200, 'g', false, 4),
('chilean', 'CHL_BRAZO_REINA', 'ING_VANILLA', 'seasoning', 5, 'ml', false, 5),
-- Chirimoya Alegre
('chilean', 'CHL_CHIRIMOYA_ALEGRE', 'ING_CHERIMOYA', 'main', 200, 'g', false, 1),
('chilean', 'CHL_CHIRIMOYA_ALEGRE', 'ING_ORANGE_JUICE', 'main', 150, 'ml', false, 2),
('chilean', 'CHL_CHIRIMOYA_ALEGRE', 'ING_SUGAR', 'secondary', 20, 'g', true, 3),
-- Cola de Mono
('chilean', 'CHL_COLA_MONO', 'ING_COFFEE', 'main', 200, 'ml', false, 1),
('chilean', 'CHL_COLA_MONO', 'ING_MILK', 'main', 400, 'ml', false, 2),
('chilean', 'CHL_COLA_MONO', 'ING_SUGAR', 'main', 100, 'g', false, 3),
('chilean', 'CHL_COLA_MONO', 'ING_AGUARDIENTE', 'main', 100, 'ml', false, 4),
('chilean', 'CHL_COLA_MONO', 'ING_CINNAMON', 'seasoning', 5, 'g', false, 5),
('chilean', 'CHL_COLA_MONO', 'ING_CLOVE', 'seasoning', 3, 'unit', false, 6),
('chilean', 'CHL_COLA_MONO', 'ING_VANILLA', 'seasoning', 5, 'ml', false, 7),
-- Pisco Sour Chileno
('chilean', 'CHL_PISCO_SOUR', 'ING_PISCO', 'main', 60, 'ml', false, 1),
('chilean', 'CHL_PISCO_SOUR', 'ING_LIME', 'main', 30, 'ml', false, 2),
('chilean', 'CHL_PISCO_SOUR', 'ING_SUGAR', 'main', 15, 'g', false, 3),
('chilean', 'CHL_PISCO_SOUR', 'ING_EGG_WHITE', 'main', 1, 'unit', false, 4),
('chilean', 'CHL_PISCO_SOUR', 'ING_ICE', 'secondary', 50, 'g', false, 5);

-- Success message
SELECT 'Chilean product_ingredients inserted: ~310 links' AS status;
