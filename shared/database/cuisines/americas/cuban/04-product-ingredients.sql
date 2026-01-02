-- Cuban Cuisine - Product Ingredients
-- GUDBRO Database Standards v1.7
-- Links 44 dishes to their ingredients

DELETE FROM product_ingredients WHERE product_type = 'cuban';

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional, sort_order) VALUES
-- =====================
-- MAIN DISHES
-- =====================

-- CUB_ROPA_VIEJA (Ropa Vieja)
('cuban', 'CUB_ROPA_VIEJA', 'ING_FLANK_STEAK', 'main', 800, 'g', false, 1),
('cuban', 'CUB_ROPA_VIEJA', 'ING_TOMATO_SAUCE', 'main', 400, 'ml', false, 2),
('cuban', 'CUB_ROPA_VIEJA', 'ING_BELL_PEPPER', 'secondary', 200, 'g', false, 3),
('cuban', 'CUB_ROPA_VIEJA', 'ING_ONION', 'secondary', 150, 'g', false, 4),
('cuban', 'CUB_ROPA_VIEJA', 'ING_GARLIC', 'seasoning', 20, 'g', false, 5),
('cuban', 'CUB_ROPA_VIEJA', 'ING_CUMIN', 'seasoning', 5, 'g', false, 6),
('cuban', 'CUB_ROPA_VIEJA', 'ING_BAY_LEAF', 'seasoning', 2, 'unit', false, 7),
('cuban', 'CUB_ROPA_VIEJA', 'ING_OLIVE_OIL', 'secondary', 60, 'ml', false, 8),
('cuban', 'CUB_ROPA_VIEJA', 'ING_WHITE_WINE', 'secondary', 120, 'ml', true, 9),

-- CUB_LECHON_ASADO (Lechon Asado)
('cuban', 'CUB_LECHON_ASADO', 'ING_PORK_SHOULDER', 'main', 2500, 'g', false, 1),
('cuban', 'CUB_LECHON_ASADO', 'ING_SOUR_ORANGE', 'main', 250, 'ml', false, 2),
('cuban', 'CUB_LECHON_ASADO', 'ING_GARLIC', 'seasoning', 50, 'g', false, 3),
('cuban', 'CUB_LECHON_ASADO', 'ING_OREGANO', 'seasoning', 10, 'g', false, 4),
('cuban', 'CUB_LECHON_ASADO', 'ING_CUMIN', 'seasoning', 10, 'g', false, 5),
('cuban', 'CUB_LECHON_ASADO', 'ING_OLIVE_OIL', 'secondary', 100, 'ml', false, 6),
('cuban', 'CUB_LECHON_ASADO', 'ING_SALT', 'seasoning', 20, 'g', false, 7),

-- CUB_VACA_FRITA (Vaca Frita)
('cuban', 'CUB_VACA_FRITA', 'ING_FLANK_STEAK', 'main', 700, 'g', false, 1),
('cuban', 'CUB_VACA_FRITA', 'ING_ONION', 'main', 300, 'g', false, 2),
('cuban', 'CUB_VACA_FRITA', 'ING_LIME', 'secondary', 60, 'ml', false, 3),
('cuban', 'CUB_VACA_FRITA', 'ING_GARLIC', 'seasoning', 20, 'g', false, 4),
('cuban', 'CUB_VACA_FRITA', 'ING_VEGETABLE_OIL', 'secondary', 100, 'ml', false, 5),
('cuban', 'CUB_VACA_FRITA', 'ING_SALT', 'seasoning', 10, 'g', false, 6),

-- CUB_PICADILLO (Picadillo Cubano)
('cuban', 'CUB_PICADILLO', 'ING_GROUND_BEEF', 'main', 500, 'g', false, 1),
('cuban', 'CUB_PICADILLO', 'ING_TOMATO_SAUCE', 'main', 200, 'ml', false, 2),
('cuban', 'CUB_PICADILLO', 'ING_OLIVE', 'secondary', 50, 'g', false, 3),
('cuban', 'CUB_PICADILLO', 'ING_RAISIN', 'secondary', 40, 'g', true, 4),
('cuban', 'CUB_PICADILLO', 'ING_CAPER', 'secondary', 20, 'g', true, 5),
('cuban', 'CUB_PICADILLO', 'ING_ONION', 'secondary', 100, 'g', false, 6),
('cuban', 'CUB_PICADILLO', 'ING_BELL_PEPPER', 'secondary', 80, 'g', false, 7),
('cuban', 'CUB_PICADILLO', 'ING_GARLIC', 'seasoning', 15, 'g', false, 8),
('cuban', 'CUB_PICADILLO', 'ING_CUMIN', 'seasoning', 5, 'g', false, 9),

-- CUB_ARROZ_CON_POLLO (Arroz con Pollo)
('cuban', 'CUB_ARROZ_CON_POLLO', 'ING_CHICKEN', 'main', 1000, 'g', false, 1),
('cuban', 'CUB_ARROZ_CON_POLLO', 'ING_RICE', 'main', 400, 'g', false, 2),
('cuban', 'CUB_ARROZ_CON_POLLO', 'ING_BEER', 'secondary', 330, 'ml', false, 3),
('cuban', 'CUB_ARROZ_CON_POLLO', 'ING_SAFFRON', 'seasoning', 1, 'g', false, 4),
('cuban', 'CUB_ARROZ_CON_POLLO', 'ING_BELL_PEPPER', 'secondary', 150, 'g', false, 5),
('cuban', 'CUB_ARROZ_CON_POLLO', 'ING_ONION', 'secondary', 100, 'g', false, 6),
('cuban', 'CUB_ARROZ_CON_POLLO', 'ING_GARLIC', 'seasoning', 15, 'g', false, 7),
('cuban', 'CUB_ARROZ_CON_POLLO', 'ING_PEA', 'garnish', 100, 'g', true, 8),
('cuban', 'CUB_ARROZ_CON_POLLO', 'ING_PIMIENTO', 'garnish', 50, 'g', true, 9),

-- CUB_POLLO_FRICASSE (Pollo Fricasse)
('cuban', 'CUB_POLLO_FRICASSE', 'ING_CHICKEN', 'main', 1200, 'g', false, 1),
('cuban', 'CUB_POLLO_FRICASSE', 'ING_POTATO', 'main', 400, 'g', false, 2),
('cuban', 'CUB_POLLO_FRICASSE', 'ING_TOMATO_SAUCE', 'secondary', 200, 'ml', false, 3),
('cuban', 'CUB_POLLO_FRICASSE', 'ING_WHITE_WINE', 'secondary', 120, 'ml', false, 4),
('cuban', 'CUB_POLLO_FRICASSE', 'ING_OLIVE', 'secondary', 50, 'g', false, 5),
('cuban', 'CUB_POLLO_FRICASSE', 'ING_ONION', 'secondary', 100, 'g', false, 6),
('cuban', 'CUB_POLLO_FRICASSE', 'ING_GARLIC', 'seasoning', 15, 'g', false, 7),
('cuban', 'CUB_POLLO_FRICASSE', 'ING_BAY_LEAF', 'seasoning', 2, 'unit', false, 8),

-- CUB_BISTEC_EMPANIZADO (Bistec Empanizado)
('cuban', 'CUB_BISTEC_EMPANIZADO', 'ING_BEEF_SIRLOIN', 'main', 600, 'g', false, 1),
('cuban', 'CUB_BISTEC_EMPANIZADO', 'ING_BREADCRUMB', 'main', 150, 'g', false, 2),
('cuban', 'CUB_BISTEC_EMPANIZADO', 'ING_EGG', 'secondary', 2, 'unit', false, 3),
('cuban', 'CUB_BISTEC_EMPANIZADO', 'ING_LIME', 'garnish', 2, 'unit', false, 4),
('cuban', 'CUB_BISTEC_EMPANIZADO', 'ING_GARLIC', 'seasoning', 10, 'g', false, 5),
('cuban', 'CUB_BISTEC_EMPANIZADO', 'ING_VEGETABLE_OIL', 'secondary', 200, 'ml', false, 6),
('cuban', 'CUB_BISTEC_EMPANIZADO', 'ING_SALT', 'seasoning', 5, 'g', false, 7),

-- CUB_MASAS_PUERCO (Masas de Puerco Fritas)
('cuban', 'CUB_MASAS_PUERCO', 'ING_PORK_SHOULDER', 'main', 800, 'g', false, 1),
('cuban', 'CUB_MASAS_PUERCO', 'ING_SOUR_ORANGE', 'main', 150, 'ml', false, 2),
('cuban', 'CUB_MASAS_PUERCO', 'ING_GARLIC', 'seasoning', 30, 'g', false, 3),
('cuban', 'CUB_MASAS_PUERCO', 'ING_OREGANO', 'seasoning', 5, 'g', false, 4),
('cuban', 'CUB_MASAS_PUERCO', 'ING_CUMIN', 'seasoning', 5, 'g', false, 5),
('cuban', 'CUB_MASAS_PUERCO', 'ING_VEGETABLE_OIL', 'secondary', 300, 'ml', false, 6),

-- CUB_BOLICHE (Boliche)
('cuban', 'CUB_BOLICHE', 'ING_BEEF_ROAST', 'main', 1500, 'g', false, 1),
('cuban', 'CUB_BOLICHE', 'ING_CHORIZO', 'main', 200, 'g', false, 2),
('cuban', 'CUB_BOLICHE', 'ING_TOMATO_SAUCE', 'secondary', 250, 'ml', false, 3),
('cuban', 'CUB_BOLICHE', 'ING_ONION', 'secondary', 150, 'g', false, 4),
('cuban', 'CUB_BOLICHE', 'ING_GARLIC', 'seasoning', 20, 'g', false, 5),
('cuban', 'CUB_BOLICHE', 'ING_BAY_LEAF', 'seasoning', 2, 'unit', false, 6),
('cuban', 'CUB_BOLICHE', 'ING_RED_WINE', 'secondary', 200, 'ml', true, 7),

-- CUB_TASAJO (Tasajo)
('cuban', 'CUB_TASAJO', 'ING_CHARQUI', 'main', 500, 'g', false, 1),
('cuban', 'CUB_TASAJO', 'ING_BELL_PEPPER', 'secondary', 150, 'g', false, 2),
('cuban', 'CUB_TASAJO', 'ING_ONION', 'secondary', 150, 'g', false, 3),
('cuban', 'CUB_TASAJO', 'ING_TOMATO', 'secondary', 200, 'g', false, 4),
('cuban', 'CUB_TASAJO', 'ING_GARLIC', 'seasoning', 15, 'g', false, 5),
('cuban', 'CUB_TASAJO', 'ING_OLIVE_OIL', 'secondary', 60, 'ml', false, 6),

-- =====================
-- RICE & BEANS
-- =====================

-- CUB_MOROS_CRISTIANOS (Moros y Cristianos)
('cuban', 'CUB_MOROS_CRISTIANOS', 'ING_BLACK_BEAN', 'main', 300, 'g', false, 1),
('cuban', 'CUB_MOROS_CRISTIANOS', 'ING_RICE', 'main', 400, 'g', false, 2),
('cuban', 'CUB_MOROS_CRISTIANOS', 'ING_ONION', 'secondary', 100, 'g', false, 3),
('cuban', 'CUB_MOROS_CRISTIANOS', 'ING_BELL_PEPPER', 'secondary', 80, 'g', false, 4),
('cuban', 'CUB_MOROS_CRISTIANOS', 'ING_GARLIC', 'seasoning', 15, 'g', false, 5),
('cuban', 'CUB_MOROS_CRISTIANOS', 'ING_CUMIN', 'seasoning', 5, 'g', false, 6),
('cuban', 'CUB_MOROS_CRISTIANOS', 'ING_BAY_LEAF', 'seasoning', 2, 'unit', false, 7),
('cuban', 'CUB_MOROS_CRISTIANOS', 'ING_OLIVE_OIL', 'secondary', 45, 'ml', false, 8),

-- CUB_CONGRI (Congri Oriental)
('cuban', 'CUB_CONGRI', 'ING_RED_BEAN', 'main', 300, 'g', false, 1),
('cuban', 'CUB_CONGRI', 'ING_RICE', 'main', 400, 'g', false, 2),
('cuban', 'CUB_CONGRI', 'ING_BACON', 'secondary', 100, 'g', false, 3),
('cuban', 'CUB_CONGRI', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('cuban', 'CUB_CONGRI', 'ING_BELL_PEPPER', 'secondary', 80, 'g', false, 5),
('cuban', 'CUB_CONGRI', 'ING_GARLIC', 'seasoning', 15, 'g', false, 6),
('cuban', 'CUB_CONGRI', 'ING_CUMIN', 'seasoning', 5, 'g', false, 7),
('cuban', 'CUB_CONGRI', 'ING_OREGANO', 'seasoning', 3, 'g', false, 8),

-- CUB_FRIJOLES_NEGROS (Frijoles Negros)
('cuban', 'CUB_FRIJOLES_NEGROS', 'ING_BLACK_BEAN', 'main', 450, 'g', false, 1),
('cuban', 'CUB_FRIJOLES_NEGROS', 'ING_ONION', 'secondary', 150, 'g', false, 2),
('cuban', 'CUB_FRIJOLES_NEGROS', 'ING_BELL_PEPPER', 'secondary', 100, 'g', false, 3),
('cuban', 'CUB_FRIJOLES_NEGROS', 'ING_GARLIC', 'seasoning', 20, 'g', false, 4),
('cuban', 'CUB_FRIJOLES_NEGROS', 'ING_CUMIN', 'seasoning', 8, 'g', false, 5),
('cuban', 'CUB_FRIJOLES_NEGROS', 'ING_OREGANO', 'seasoning', 5, 'g', false, 6),
('cuban', 'CUB_FRIJOLES_NEGROS', 'ING_BAY_LEAF', 'seasoning', 2, 'unit', false, 7),
('cuban', 'CUB_FRIJOLES_NEGROS', 'ING_OLIVE_OIL', 'secondary', 60, 'ml', false, 8),
('cuban', 'CUB_FRIJOLES_NEGROS', 'ING_VINEGAR', 'seasoning', 15, 'ml', false, 9),

-- CUB_ARROZ_BLANCO (Arroz Blanco Cubano)
('cuban', 'CUB_ARROZ_BLANCO', 'ING_RICE', 'main', 400, 'g', false, 1),
('cuban', 'CUB_ARROZ_BLANCO', 'ING_VEGETABLE_OIL', 'secondary', 30, 'ml', false, 2),
('cuban', 'CUB_ARROZ_BLANCO', 'ING_SALT', 'seasoning', 8, 'g', false, 3),
('cuban', 'CUB_ARROZ_BLANCO', 'ING_GARLIC', 'seasoning', 5, 'g', true, 4),

-- CUB_ARROZ_AMARILLO (Arroz Amarillo)
('cuban', 'CUB_ARROZ_AMARILLO', 'ING_RICE', 'main', 400, 'g', false, 1),
('cuban', 'CUB_ARROZ_AMARILLO', 'ING_SAFFRON', 'seasoning', 1, 'g', false, 2),
('cuban', 'CUB_ARROZ_AMARILLO', 'ING_ONION', 'secondary', 50, 'g', false, 3),
('cuban', 'CUB_ARROZ_AMARILLO', 'ING_GARLIC', 'seasoning', 10, 'g', false, 4),
('cuban', 'CUB_ARROZ_AMARILLO', 'ING_OLIVE_OIL', 'secondary', 30, 'ml', false, 5),
('cuban', 'CUB_ARROZ_AMARILLO', 'ING_SALT', 'seasoning', 8, 'g', false, 6),

-- =====================
-- SANDWICHES
-- =====================

-- CUB_CUBANO_SANDWICH (Cuban Sandwich)
('cuban', 'CUB_CUBANO_SANDWICH', 'ING_CUBAN_BREAD', 'main', 200, 'g', false, 1),
('cuban', 'CUB_CUBANO_SANDWICH', 'ING_PORK_ROAST', 'main', 150, 'g', false, 2),
('cuban', 'CUB_CUBANO_SANDWICH', 'ING_HAM', 'main', 100, 'g', false, 3),
('cuban', 'CUB_CUBANO_SANDWICH', 'ING_SWISS_CHEESE', 'main', 60, 'g', false, 4),
('cuban', 'CUB_CUBANO_SANDWICH', 'ING_DILL_PICKLE', 'secondary', 50, 'g', false, 5),
('cuban', 'CUB_CUBANO_SANDWICH', 'ING_YELLOW_MUSTARD', 'secondary', 20, 'g', false, 6),
('cuban', 'CUB_CUBANO_SANDWICH', 'ING_BUTTER', 'secondary', 20, 'g', false, 7),

-- CUB_MEDIANOCHE (Medianoche)
('cuban', 'CUB_MEDIANOCHE', 'ING_EGG_BREAD', 'main', 180, 'g', false, 1),
('cuban', 'CUB_MEDIANOCHE', 'ING_PORK_ROAST', 'main', 120, 'g', false, 2),
('cuban', 'CUB_MEDIANOCHE', 'ING_HAM', 'main', 80, 'g', false, 3),
('cuban', 'CUB_MEDIANOCHE', 'ING_SWISS_CHEESE', 'main', 50, 'g', false, 4),
('cuban', 'CUB_MEDIANOCHE', 'ING_DILL_PICKLE', 'secondary', 40, 'g', false, 5),
('cuban', 'CUB_MEDIANOCHE', 'ING_YELLOW_MUSTARD', 'secondary', 15, 'g', false, 6),
('cuban', 'CUB_MEDIANOCHE', 'ING_BUTTER', 'secondary', 15, 'g', false, 7),

-- CUB_PAN_CON_LECHON (Pan con Lechon)
('cuban', 'CUB_PAN_CON_LECHON', 'ING_CUBAN_BREAD', 'main', 200, 'g', false, 1),
('cuban', 'CUB_PAN_CON_LECHON', 'ING_PORK_ROAST', 'main', 200, 'g', false, 2),
('cuban', 'CUB_PAN_CON_LECHON', 'ING_ONION', 'secondary', 50, 'g', true, 3),
('cuban', 'CUB_PAN_CON_LECHON', 'ING_SOUR_ORANGE', 'seasoning', 30, 'ml', false, 4),
('cuban', 'CUB_PAN_CON_LECHON', 'ING_GARLIC', 'seasoning', 10, 'g', false, 5),

-- CUB_ELENA_RUZ (Elena Ruz)
('cuban', 'CUB_ELENA_RUZ', 'ING_CUBAN_BREAD', 'main', 150, 'g', false, 1),
('cuban', 'CUB_ELENA_RUZ', 'ING_TURKEY_BREAST', 'main', 120, 'g', false, 2),
('cuban', 'CUB_ELENA_RUZ', 'ING_CREAM_CHEESE', 'main', 50, 'g', false, 3),
('cuban', 'CUB_ELENA_RUZ', 'ING_STRAWBERRY_JAM', 'secondary', 40, 'g', false, 4),

-- =====================
-- SIDES
-- =====================

-- CUB_TOSTONES (Tostones)
('cuban', 'CUB_TOSTONES', 'ING_GREEN_PLANTAIN', 'main', 400, 'g', false, 1),
('cuban', 'CUB_TOSTONES', 'ING_VEGETABLE_OIL', 'secondary', 300, 'ml', false, 2),
('cuban', 'CUB_TOSTONES', 'ING_SALT', 'seasoning', 5, 'g', false, 3),
('cuban', 'CUB_TOSTONES', 'ING_GARLIC', 'seasoning', 10, 'g', true, 4),

-- CUB_MADUROS (Maduros)
('cuban', 'CUB_MADUROS', 'ING_RIPE_PLANTAIN', 'main', 400, 'g', false, 1),
('cuban', 'CUB_MADUROS', 'ING_VEGETABLE_OIL', 'secondary', 150, 'ml', false, 2),
('cuban', 'CUB_MADUROS', 'ING_SALT', 'seasoning', 2, 'g', true, 3),

-- CUB_YUCA_CON_MOJO (Yuca con Mojo)
('cuban', 'CUB_YUCA_CON_MOJO', 'ING_CASSAVA', 'main', 600, 'g', false, 1),
('cuban', 'CUB_YUCA_CON_MOJO', 'ING_GARLIC', 'main', 40, 'g', false, 2),
('cuban', 'CUB_YUCA_CON_MOJO', 'ING_SOUR_ORANGE', 'main', 100, 'ml', false, 3),
('cuban', 'CUB_YUCA_CON_MOJO', 'ING_OLIVE_OIL', 'secondary', 80, 'ml', false, 4),
('cuban', 'CUB_YUCA_CON_MOJO', 'ING_ONION', 'secondary', 50, 'g', true, 5),
('cuban', 'CUB_YUCA_CON_MOJO', 'ING_SALT', 'seasoning', 8, 'g', false, 6),

-- CUB_MARIQUITAS (Mariquitas)
('cuban', 'CUB_MARIQUITAS', 'ING_GREEN_PLANTAIN', 'main', 400, 'g', false, 1),
('cuban', 'CUB_MARIQUITAS', 'ING_VEGETABLE_OIL', 'secondary', 400, 'ml', false, 2),
('cuban', 'CUB_MARIQUITAS', 'ING_SALT', 'seasoning', 5, 'g', false, 3),

-- CUB_PLATANO_MADURO_HORNO (Platano Maduro al Horno)
('cuban', 'CUB_PLATANO_MADURO_HORNO', 'ING_RIPE_PLANTAIN', 'main', 400, 'g', false, 1),
('cuban', 'CUB_PLATANO_MADURO_HORNO', 'ING_BUTTER', 'secondary', 40, 'g', false, 2),
('cuban', 'CUB_PLATANO_MADURO_HORNO', 'ING_CINNAMON', 'seasoning', 3, 'g', false, 3),
('cuban', 'CUB_PLATANO_MADURO_HORNO', 'ING_BROWN_SUGAR', 'seasoning', 30, 'g', true, 4),

-- CUB_BONIATO_FRITO (Boniato Frito)
('cuban', 'CUB_BONIATO_FRITO', 'ING_SWEET_POTATO', 'main', 500, 'g', false, 1),
('cuban', 'CUB_BONIATO_FRITO', 'ING_VEGETABLE_OIL', 'secondary', 250, 'ml', false, 2),
('cuban', 'CUB_BONIATO_FRITO', 'ING_SALT', 'seasoning', 5, 'g', false, 3),

-- CUB_ENSALADA_MIXTA (Ensalada Mixta Cubana)
('cuban', 'CUB_ENSALADA_MIXTA', 'ING_LETTUCE', 'main', 150, 'g', false, 1),
('cuban', 'CUB_ENSALADA_MIXTA', 'ING_TOMATO', 'main', 200, 'g', false, 2),
('cuban', 'CUB_ENSALADA_MIXTA', 'ING_AVOCADO', 'main', 150, 'g', false, 3),
('cuban', 'CUB_ENSALADA_MIXTA', 'ING_ONION', 'secondary', 50, 'g', false, 4),
('cuban', 'CUB_ENSALADA_MIXTA', 'ING_OLIVE_OIL', 'secondary', 30, 'ml', false, 5),
('cuban', 'CUB_ENSALADA_MIXTA', 'ING_LIME', 'seasoning', 30, 'ml', false, 6),
('cuban', 'CUB_ENSALADA_MIXTA', 'ING_SALT', 'seasoning', 3, 'g', false, 7),

-- =====================
-- SOUPS
-- =====================

-- CUB_AJIACO (Ajiaco Criollo)
('cuban', 'CUB_AJIACO', 'ING_BEEF', 'main', 300, 'g', false, 1),
('cuban', 'CUB_AJIACO', 'ING_PORK', 'main', 200, 'g', false, 2),
('cuban', 'CUB_AJIACO', 'ING_CASSAVA', 'main', 200, 'g', false, 3),
('cuban', 'CUB_AJIACO', 'ING_SWEET_POTATO', 'main', 200, 'g', false, 4),
('cuban', 'CUB_AJIACO', 'ING_CORN', 'main', 200, 'g', false, 5),
('cuban', 'CUB_AJIACO', 'ING_GREEN_PLANTAIN', 'secondary', 150, 'g', false, 6),
('cuban', 'CUB_AJIACO', 'ING_RIPE_PLANTAIN', 'secondary', 150, 'g', false, 7),
('cuban', 'CUB_AJIACO', 'ING_PUMPKIN', 'secondary', 150, 'g', false, 8),
('cuban', 'CUB_AJIACO', 'ING_LIME', 'seasoning', 30, 'ml', false, 9),

-- CUB_POTAJE_GARBANZOS (Potaje de Garbanzos)
('cuban', 'CUB_POTAJE_GARBANZOS', 'ING_CHICKPEA', 'main', 400, 'g', false, 1),
('cuban', 'CUB_POTAJE_GARBANZOS', 'ING_CHORIZO', 'main', 150, 'g', false, 2),
('cuban', 'CUB_POTAJE_GARBANZOS', 'ING_POTATO', 'secondary', 200, 'g', false, 3),
('cuban', 'CUB_POTAJE_GARBANZOS', 'ING_ONION', 'secondary', 100, 'g', false, 4),
('cuban', 'CUB_POTAJE_GARBANZOS', 'ING_TOMATO', 'secondary', 150, 'g', false, 5),
('cuban', 'CUB_POTAJE_GARBANZOS', 'ING_GARLIC', 'seasoning', 15, 'g', false, 6),
('cuban', 'CUB_POTAJE_GARBANZOS', 'ING_CUMIN', 'seasoning', 5, 'g', false, 7),
('cuban', 'CUB_POTAJE_GARBANZOS', 'ING_BAY_LEAF', 'seasoning', 2, 'unit', false, 8),

-- CUB_CALDO_GALLEGO (Caldo Gallego)
('cuban', 'CUB_CALDO_GALLEGO', 'ING_WHITE_BEAN', 'main', 350, 'g', false, 1),
('cuban', 'CUB_CALDO_GALLEGO', 'ING_HAM', 'main', 200, 'g', false, 2),
('cuban', 'CUB_CALDO_GALLEGO', 'ING_CHORIZO', 'main', 100, 'g', false, 3),
('cuban', 'CUB_CALDO_GALLEGO', 'ING_COLLARD_GREENS', 'secondary', 200, 'g', false, 4),
('cuban', 'CUB_CALDO_GALLEGO', 'ING_POTATO', 'secondary', 200, 'g', false, 5),
('cuban', 'CUB_CALDO_GALLEGO', 'ING_ONION', 'secondary', 80, 'g', false, 6),
('cuban', 'CUB_CALDO_GALLEGO', 'ING_GARLIC', 'seasoning', 10, 'g', false, 7),

-- CUB_SOPA_PLATANO (Sopa de Platano)
('cuban', 'CUB_SOPA_PLATANO', 'ING_GREEN_PLANTAIN', 'main', 400, 'g', false, 1),
('cuban', 'CUB_SOPA_PLATANO', 'ING_CHICKEN_BROTH', 'main', 1000, 'ml', false, 2),
('cuban', 'CUB_SOPA_PLATANO', 'ING_ONION', 'secondary', 80, 'g', false, 3),
('cuban', 'CUB_SOPA_PLATANO', 'ING_GARLIC', 'seasoning', 10, 'g', false, 4),
('cuban', 'CUB_SOPA_PLATANO', 'ING_HEAVY_CREAM', 'secondary', 100, 'ml', true, 5),
('cuban', 'CUB_SOPA_PLATANO', 'ING_CILANTRO', 'garnish', 10, 'g', true, 6),

-- =====================
-- DESSERTS
-- =====================

-- CUB_FLAN_CUBANO (Flan Cubano)
('cuban', 'CUB_FLAN_CUBANO', 'ING_EGG', 'main', 6, 'unit', false, 1),
('cuban', 'CUB_FLAN_CUBANO', 'ING_CONDENSED_MILK', 'main', 400, 'ml', false, 2),
('cuban', 'CUB_FLAN_CUBANO', 'ING_EVAPORATED_MILK', 'main', 350, 'ml', false, 3),
('cuban', 'CUB_FLAN_CUBANO', 'ING_SUGAR', 'secondary', 200, 'g', false, 4),
('cuban', 'CUB_FLAN_CUBANO', 'ING_VANILLA_EXTRACT', 'seasoning', 10, 'ml', false, 5),

-- CUB_TRES_LECHES (Tres Leches Cubano)
('cuban', 'CUB_TRES_LECHES', 'ING_FLOUR', 'main', 200, 'g', false, 1),
('cuban', 'CUB_TRES_LECHES', 'ING_EGG', 'main', 5, 'unit', false, 2),
('cuban', 'CUB_TRES_LECHES', 'ING_CONDENSED_MILK', 'main', 400, 'ml', false, 3),
('cuban', 'CUB_TRES_LECHES', 'ING_EVAPORATED_MILK', 'main', 350, 'ml', false, 4),
('cuban', 'CUB_TRES_LECHES', 'ING_HEAVY_CREAM', 'main', 250, 'ml', false, 5),
('cuban', 'CUB_TRES_LECHES', 'ING_SUGAR', 'secondary', 150, 'g', false, 6),
('cuban', 'CUB_TRES_LECHES', 'ING_VANILLA_EXTRACT', 'seasoning', 10, 'ml', false, 7),

-- CUB_ARROZ_CON_LECHE (Arroz con Leche Cubano)
('cuban', 'CUB_ARROZ_CON_LECHE', 'ING_RICE', 'main', 200, 'g', false, 1),
('cuban', 'CUB_ARROZ_CON_LECHE', 'ING_MILK', 'main', 1000, 'ml', false, 2),
('cuban', 'CUB_ARROZ_CON_LECHE', 'ING_CONDENSED_MILK', 'secondary', 200, 'ml', false, 3),
('cuban', 'CUB_ARROZ_CON_LECHE', 'ING_SUGAR', 'secondary', 100, 'g', false, 4),
('cuban', 'CUB_ARROZ_CON_LECHE', 'ING_CINNAMON', 'seasoning', 5, 'g', false, 5),
('cuban', 'CUB_ARROZ_CON_LECHE', 'ING_LIME', 'seasoning', 1, 'unit', false, 6),

-- CUB_NATILLA (Natilla Cubana)
('cuban', 'CUB_NATILLA', 'ING_MILK', 'main', 500, 'ml', false, 1),
('cuban', 'CUB_NATILLA', 'ING_EGG', 'main', 4, 'unit', false, 2),
('cuban', 'CUB_NATILLA', 'ING_SUGAR', 'secondary', 120, 'g', false, 3),
('cuban', 'CUB_NATILLA', 'ING_CORNSTARCH', 'secondary', 30, 'g', false, 4),
('cuban', 'CUB_NATILLA', 'ING_VANILLA_EXTRACT', 'seasoning', 10, 'ml', false, 5),
('cuban', 'CUB_NATILLA', 'ING_CINNAMON', 'garnish', 3, 'g', false, 6),

-- CUB_DULCE_LECHE_CORTADA (Dulce de Leche Cortada)
('cuban', 'CUB_DULCE_LECHE_CORTADA', 'ING_MILK', 'main', 1000, 'ml', false, 1),
('cuban', 'CUB_DULCE_LECHE_CORTADA', 'ING_SUGAR', 'main', 300, 'g', false, 2),
('cuban', 'CUB_DULCE_LECHE_CORTADA', 'ING_LIME', 'secondary', 50, 'ml', false, 3),
('cuban', 'CUB_DULCE_LECHE_CORTADA', 'ING_CINNAMON', 'seasoning', 5, 'g', false, 4),
('cuban', 'CUB_DULCE_LECHE_CORTADA', 'ING_VANILLA_EXTRACT', 'seasoning', 5, 'ml', false, 5),

-- CUB_COQUITOS (Coquitos Cubanos)
('cuban', 'CUB_COQUITOS', 'ING_COCONUT', 'main', 300, 'g', false, 1),
('cuban', 'CUB_COQUITOS', 'ING_SUGAR', 'main', 200, 'g', false, 2),
('cuban', 'CUB_COQUITOS', 'ING_EGG', 'secondary', 2, 'unit', false, 3),
('cuban', 'CUB_COQUITOS', 'ING_VANILLA_EXTRACT', 'seasoning', 5, 'ml', false, 4),

-- =====================
-- BEVERAGES
-- =====================

-- CUB_MOJITO (Mojito)
('cuban', 'CUB_MOJITO', 'ING_WHITE_RUM', 'main', 60, 'ml', false, 1),
('cuban', 'CUB_MOJITO', 'ING_MINT', 'main', 10, 'g', false, 2),
('cuban', 'CUB_MOJITO', 'ING_LIME', 'main', 30, 'ml', false, 3),
('cuban', 'CUB_MOJITO', 'ING_SUGAR', 'secondary', 15, 'g', false, 4),
('cuban', 'CUB_MOJITO', 'ING_SODA_WATER', 'secondary', 100, 'ml', false, 5),

-- CUB_CUBA_LIBRE (Cuba Libre)
('cuban', 'CUB_CUBA_LIBRE', 'ING_WHITE_RUM', 'main', 60, 'ml', false, 1),
('cuban', 'CUB_CUBA_LIBRE', 'ING_COLA', 'main', 150, 'ml', false, 2),
('cuban', 'CUB_CUBA_LIBRE', 'ING_LIME', 'secondary', 15, 'ml', false, 3),

-- CUB_DAIQUIRI (Daiquiri)
('cuban', 'CUB_DAIQUIRI', 'ING_WHITE_RUM', 'main', 60, 'ml', false, 1),
('cuban', 'CUB_DAIQUIRI', 'ING_LIME', 'main', 30, 'ml', false, 2),
('cuban', 'CUB_DAIQUIRI', 'ING_SUGAR', 'secondary', 15, 'g', false, 3),

-- CUB_CAFE_CUBANO (Cafe Cubano)
('cuban', 'CUB_CAFE_CUBANO', 'ING_COFFEE', 'main', 20, 'g', false, 1),
('cuban', 'CUB_CAFE_CUBANO', 'ING_BROWN_SUGAR', 'main', 20, 'g', false, 2),

-- CUB_CORTADITO (Cortadito)
('cuban', 'CUB_CORTADITO', 'ING_COFFEE', 'main', 20, 'g', false, 1),
('cuban', 'CUB_CORTADITO', 'ING_BROWN_SUGAR', 'secondary', 15, 'g', false, 2),
('cuban', 'CUB_CORTADITO', 'ING_MILK', 'secondary', 60, 'ml', false, 3),

-- CUB_CAFE_CON_LECHE (Cafe con Leche Cubano)
('cuban', 'CUB_CAFE_CON_LECHE', 'ING_COFFEE', 'main', 20, 'g', false, 1),
('cuban', 'CUB_CAFE_CON_LECHE', 'ING_MILK', 'main', 200, 'ml', false, 2),
('cuban', 'CUB_CAFE_CON_LECHE', 'ING_SUGAR', 'seasoning', 20, 'g', true, 3),

-- CUB_GUARAPO (Guarapo)
('cuban', 'CUB_GUARAPO', 'ING_SUGARCANE', 'main', 500, 'g', false, 1),
('cuban', 'CUB_GUARAPO', 'ING_LIME', 'secondary', 15, 'ml', true, 2),

-- CUB_BATIDO_MAMEY (Batido de Mamey)
('cuban', 'CUB_BATIDO_MAMEY', 'ING_MAMEY', 'main', 300, 'g', false, 1),
('cuban', 'CUB_BATIDO_MAMEY', 'ING_MILK', 'main', 250, 'ml', false, 2),
('cuban', 'CUB_BATIDO_MAMEY', 'ING_SUGAR', 'secondary', 30, 'g', false, 3),
('cuban', 'CUB_BATIDO_MAMEY', 'ING_VANILLA_EXTRACT', 'seasoning', 5, 'ml', true, 4);
