-- Venezuelan Cuisine Database - Script 03: Insert Dishes
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- Total: 39 dishes

-- ===========================================
-- AREPAS (7 dishes)
-- ===========================================

INSERT INTO venezuelan (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('VEN_REINA_PEPIADA', 'reina-pepiada', 'Reina Pepiada', 'Arepa filled with shredded chicken, avocado, and mayonnaise', 'arepa', 'iconic', 'Caracas', 'chicken', 'grilled', 30, 0, '{"gluten_free": true}', ARRAY['egg'], ARRAY['signature', 'most-popular', 'classic'], 99),
('VEN_PABELLON', 'arepa-pabellon', 'Arepa de Pabellón', 'Arepa filled with shredded beef, black beans, plantain, and cheese', 'arepa', 'iconic', 'Nacional', 'beef', 'grilled', 30, 0, '{"gluten_free": true}', ARRAY['dairy'], ARRAY['complete', 'traditional', 'hearty'], 95),
('VEN_DOMINÓ', 'arepa-domino', 'Arepa Dominó', 'Arepa filled with black beans and white cheese', 'arepa', 'iconic', 'Nacional', 'vegetable', 'grilled', 20, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['simple', 'classic', 'vegetarian'], 90),
('VEN_PELUA', 'arepa-pelua', 'Arepa Pelúa', 'Arepa filled with shredded beef and yellow cheese', 'arepa', 'classic', 'Zulia', 'beef', 'grilled', 25, 0, '{"gluten_free": true}', ARRAY['dairy'], ARRAY['cheesy', 'zulia', 'classic'], 88),
('VEN_CATIRA', 'arepa-catira', 'Arepa Catira', 'Arepa filled with shredded chicken and yellow cheese', 'arepa', 'classic', 'Nacional', 'chicken', 'grilled', 25, 0, '{"gluten_free": true}', ARRAY['dairy'], ARRAY['chicken', 'cheesy', 'popular'], 88),
('VEN_VIUDA', 'arepa-viuda', 'Arepa Viuda', 'Plain arepa without filling, served with butter', 'arepa', 'traditional', 'Nacional', 'vegetable', 'grilled', 15, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['simple', 'plain', 'basic'], 70),
('VEN_SIFRINA', 'arepa-sifrina', 'Arepa Sifrina', 'Arepa with reina pepiada filling plus yellow cheese', 'arepa', 'classic', 'Caracas', 'chicken', 'grilled', 30, 0, '{"gluten_free": true}', ARRAY['egg', 'dairy'], ARRAY['premium', 'cheesy', 'caracas'], 85);

-- ===========================================
-- MAINS (6 dishes)
-- ===========================================

INSERT INTO venezuelan (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('VEN_PABELLON_CRIOLLO', 'pabellon-criollo', 'Pabellón Criollo', 'National dish with shredded beef, black beans, rice, and fried plantains', 'main', 'iconic', 'Nacional', 'beef', 'mixed', 90, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['national-dish', 'essential', 'complete'], 99),
('VEN_ASADO_NEGRO', 'asado-negro', 'Asado Negro', 'Beef roast in sweet dark sauce made with papelón and spices', 'main', 'iconic', 'Caracas', 'beef', 'braised', 180, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['festive', 'sweet-savory', 'christmas'], 95),
('VEN_HALLACA', 'hallaca', 'Hallaca', 'Christmas tamale with corn dough stuffed with meat stew, wrapped in banana leaves', 'main', 'iconic', 'Nacional', 'mixed', 'steamed', 480, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['christmas', 'festive', 'family-tradition'], 98),
('VEN_CARNE_MECHADA', 'carne-mechada', 'Carne Mechada', 'Shredded beef in tomato-based sauce, essential for arepas and pabellón', 'main', 'iconic', 'Nacional', 'beef', 'braised', 120, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['shredded', 'essential', 'versatile'], 95),
('VEN_POLLO_GUISADO', 'pollo-guisado', 'Pollo Guisado', 'Chicken stewed in tomato sauce with vegetables', 'main', 'classic', 'Nacional', 'chicken', 'braised', 60, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['stew', 'everyday', 'home-cooking'], 88),
('VEN_PERNIL', 'pernil', 'Pernil', 'Slow-roasted pork leg marinated with spices, traditional for Christmas', 'main', 'iconic', 'Nacional', 'pork', 'roasted', 360, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['christmas', 'roasted', 'festive'], 92);

-- ===========================================
-- SOUPS (4 dishes)
-- ===========================================

INSERT INTO venezuelan (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('VEN_HERVIDO', 'hervido', 'Hervido', 'Traditional soup with meat, vegetables, and root vegetables', 'soup', 'iconic', 'Nacional', 'mixed', 'simmered', 120, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['comfort', 'sunday', 'family'], 92),
('VEN_MONDONGO', 'mondongo-venezolano', 'Mondongo', 'Tripe soup with vegetables, a hearty weekend staple', 'soup', 'traditional', 'Nacional', 'beef', 'simmered', 180, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['tripe', 'traditional', 'hearty'], 75),
('VEN_SANCOCHO', 'sancocho-venezolano', 'Sancocho Venezolano', 'Rich meat and vegetable soup with yuca, corn, and plantain', 'soup', 'iconic', 'Llanos', 'mixed', 'simmered', 150, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['llanero', 'hearty', 'traditional'], 90),
('VEN_SOPA_CARAOTAS', 'sopa-de-caraotas', 'Sopa de Caraotas Negras', 'Black bean soup with sofrito and cumin', 'soup', 'classic', 'Nacional', 'legume', 'simmered', 90, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['beans', 'comfort', 'everyday'], 85);

-- ===========================================
-- STREET FOOD (7 dishes)
-- ===========================================

INSERT INTO venezuelan (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('VEN_CACHAPA', 'cachapa', 'Cachapa', 'Sweet corn pancake folded with queso de mano (fresh cheese)', 'street_food', 'iconic', 'Nacional', 'dairy', 'grilled', 20, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['sweet-corn', 'cheese', 'classic'], 98),
('VEN_TEQUENOS', 'tequenos', 'Tequeños', 'Fried cheese sticks wrapped in dough, the most popular appetizer', 'street_food', 'iconic', 'Nacional', 'dairy', 'deep_fried', 45, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['dairy', 'gluten'], ARRAY['appetizer', 'party', 'essential'], 99),
('VEN_EMPANADA', 'empanada-venezolana', 'Empanada Venezolana', 'Crispy corn flour empanada with various fillings', 'street_food', 'iconic', 'Nacional', 'mixed', 'deep_fried', 30, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['empanada', 'crispy', 'breakfast'], 95),
('VEN_PATACON', 'patacon-venezolano', 'Patacón', 'Sandwich made with fried green plantain instead of bread', 'street_food', 'iconic', 'Zulia', 'mixed', 'deep_fried', 25, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['plantain', 'sandwich', 'zulia'], 90),
('VEN_PASTELITOS', 'pastelitos', 'Pastelitos', 'Fried pastry pockets filled with meat, cheese, or both', 'street_food', 'classic', 'Nacional', 'mixed', 'deep_fried', 40, 0, '{"gluten_free": false}', ARRAY['gluten', 'dairy'], ARRAY['pastry', 'fried', 'snack'], 88),
('VEN_MANDOCA', 'mandoca', 'Mandoca', 'Sweet fried dough ring made with corn flour, plantain, and cheese', 'street_food', 'regional', 'Zulia', 'dairy', 'deep_fried', 30, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['sweet', 'zulia', 'breakfast'], 82),
('VEN_TUMBARRANCHO', 'tumbarrancho', 'Tumbarrancho', 'Arepa stuffed, battered and fried, topped with sauce', 'street_food', 'regional', 'Zulia', 'mixed', 'deep_fried', 35, 0, '{"gluten_free": false}', ARRAY['gluten', 'egg'], ARRAY['zulia', 'fried', 'indulgent'], 78);

-- ===========================================
-- SEAFOOD (4 dishes)
-- ===========================================

INSERT INTO venezuelan (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('VEN_PARGO_FRITO', 'pargo-frito', 'Pargo Frito', 'Whole fried red snapper with tostones and rice', 'seafood', 'iconic', 'Costa', 'fish', 'deep_fried', 30, 0, '{"gluten_free": true}', ARRAY['fish'], ARRAY['coastal', 'fried', 'whole-fish'], 92),
('VEN_CEVICHE', 'ceviche-venezolano', 'Ceviche Venezolano', 'Fresh fish cured in lime with onion and cilantro', 'seafood', 'classic', 'Costa', 'fish', 'raw', 30, 1, '{"gluten_free": true}', ARRAY['fish'], ARRAY['fresh', 'coastal', 'appetizer'], 85),
('VEN_ARROZ_MARISCOS', 'arroz-con-mariscos', 'Arroz con Mariscos', 'Rice with mixed seafood in tomato-based sauce', 'seafood', 'classic', 'Costa', 'seafood', 'simmered', 45, 0, '{"gluten_free": true}', ARRAY['shellfish', 'fish'], ARRAY['rice', 'seafood', 'complete'], 88),
('VEN_PESCADO_COCO', 'pescado-en-coco', 'Pescado en Coco', 'Fish in creamy coconut sauce, Caribbean-influenced', 'seafood', 'regional', 'Oriente', 'fish', 'simmered', 40, 0, '{"gluten_free": true}', ARRAY['fish'], ARRAY['coconut', 'caribbean', 'creamy'], 80);

-- ===========================================
-- DESSERTS (6 dishes)
-- ===========================================

INSERT INTO venezuelan (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('VEN_QUESILLO', 'quesillo', 'Quesillo', 'Venezuelan caramel flan with smooth creamy texture', 'dessert', 'iconic', 'Nacional', 'dairy', 'baked', 60, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy', 'egg'], ARRAY['flan', 'classic', 'celebration'], 98),
('VEN_BIENMESABE', 'bienmesabe', 'Bienmesabe', 'Coconut cream dessert with sponge cake and meringue', 'dessert', 'iconic', 'Nacional', 'dairy', 'baked', 90, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['dairy', 'egg', 'gluten'], ARRAY['coconut', 'layered', 'christmas'], 90),
('VEN_TORTA_NEGRA', 'torta-negra', 'Torta Negra', 'Dark fruit cake soaked in rum, traditional Christmas dessert', 'dessert', 'iconic', 'Nacional', 'dairy', 'baked', 180, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['dairy', 'egg', 'gluten'], ARRAY['christmas', 'rum', 'festive'], 88),
('VEN_DULCE_LECHOSA', 'dulce-de-lechosa', 'Dulce de Lechosa', 'Candied green papaya in spiced syrup', 'dessert', 'iconic', 'Nacional', 'fruit', 'simmered', 120, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['christmas', 'papaya', 'traditional'], 85),
('VEN_MAJARETE', 'majarete', 'Majarete', 'Sweet corn pudding with coconut milk and cinnamon', 'dessert', 'traditional', 'Nacional', 'vegetable', 'simmered', 45, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['corn', 'coconut', 'pudding'], 80),
('VEN_CONSERVA_COCO', 'conserva-de-coco', 'Conserva de Coco', 'Chewy coconut candy made with papelón', 'dessert', 'classic', 'Nacional', 'fruit', 'simmered', 60, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['coconut', 'candy', 'sweet'], 78);

-- ===========================================
-- BEVERAGES (5 dishes)
-- ===========================================

INSERT INTO venezuelan (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('VEN_PAPELON_LIMON', 'papelon-con-limon', 'Papelón con Limón', 'Refreshing drink made with raw cane sugar and lime', 'beverage', 'iconic', 'Nacional', 'beverage', 'mixed', 10, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['refreshing', 'traditional', 'everyday'], 95),
('VEN_CHICHA', 'chicha-venezolana', 'Chicha Venezolana', 'Sweet rice drink with milk, cinnamon, and condensed milk', 'beverage', 'iconic', 'Nacional', 'beverage', 'blended', 30, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['rice-drink', 'sweet', 'creamy'], 92),
('VEN_COCADA', 'cocada', 'Cocada', 'Refreshing coconut water drink with coconut flesh', 'beverage', 'classic', 'Costa', 'beverage', 'raw', 5, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['coconut', 'fresh', 'beach'], 85),
('VEN_JUGO_PARCHITA', 'jugo-de-parchita', 'Jugo de Parchita', 'Fresh passion fruit juice', 'beverage', 'classic', 'Nacional', 'beverage', 'blended', 5, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['tropical', 'fresh', 'tangy'], 88),
('VEN_BATIDO_PATILLA', 'batido-de-patilla', 'Batido de Patilla', 'Fresh watermelon shake, popular street refreshment', 'beverage', 'classic', 'Nacional', 'beverage', 'blended', 5, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['watermelon', 'refreshing', 'summer'], 82);

-- Success message
SELECT 'Venezuelan dishes inserted: 39 records' AS status;
