-- Colombian Cuisine Database - Script 03: Insert Dishes
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- Total: 45 dishes

-- ===========================================
-- SOUPS (6 dishes)
-- ===========================================

INSERT INTO colombian (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('COL_AJIACO', 'ajiaco', 'Ajiaco', 'Bogotá-style chicken soup with three types of potatoes, corn, and guascas herb', 'soup', 'iconic', 'Bogotá', 'chicken', 'simmered', 90, 0, '{"gluten_free": true}', ARRAY['dairy'], ARRAY['signature', 'bogota', 'comfort'], 98),
('COL_SANCOCHO', 'sancocho', 'Sancocho', 'Traditional meat and vegetable stew with yuca, plantain, and corn', 'soup', 'iconic', 'Nacional', 'mixed', 'simmered', 120, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['national-dish', 'sunday', 'family'], 99),
('COL_MONDONGO', 'mondongo-colombiano', 'Mondongo', 'Tripe soup with vegetables and chorizo in rich broth', 'soup', 'traditional', 'Antioquia', 'beef', 'simmered', 180, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['tripe', 'slow-cooked', 'traditional'], 75),
('COL_CUCHUCO', 'cuchuco-trigo', 'Cuchuco de Trigo', 'Hearty wheat and pork rib soup from the Andean highlands', 'soup', 'regional', 'Boyacá', 'pork', 'simmered', 120, 0, '{"gluten_free": false}', ARRAY['gluten'], ARRAY['andean', 'winter', 'rustic'], 70),
('COL_CHANGUA', 'changua', 'Changua', 'Traditional breakfast soup with milk, eggs, and scallions', 'soup', 'traditional', 'Bogotá', 'egg', 'simmered', 15, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy', 'egg'], ARRAY['breakfast', 'morning', 'quick'], 80),
('COL_SOPA_COSTILLA', 'sopa-de-costilla', 'Sopa de Costilla', 'Beef rib soup with potatoes and vegetables', 'soup', 'classic', 'Nacional', 'beef', 'simmered', 90, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['hearty', 'everyday', 'comfort'], 85);

-- ===========================================
-- MAINS (8 dishes)
-- ===========================================

INSERT INTO colombian (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('COL_BANDEJA_PAISA', 'bandeja-paisa', 'Bandeja Paisa', 'Iconic platter with beans, rice, chicharrón, chorizo, arepa, fried egg, plantain, and avocado', 'main', 'iconic', 'Antioquia', 'mixed', 'mixed', 90, 0, '{"gluten_free": true}', ARRAY['egg'], ARRAY['signature', 'platter', 'medellin'], 99),
('COL_LECHONA', 'lechona', 'Lechona', 'Whole roasted pig stuffed with rice, peas, and spices', 'main', 'iconic', 'Tolima', 'pork', 'roasted', 480, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['festive', 'celebration', 'slow-roasted'], 92),
('COL_SUDADO_POLLO', 'sudado-de-pollo', 'Sudado de Pollo', 'Chicken stewed in tomato sauce with potatoes and vegetables', 'main', 'classic', 'Nacional', 'chicken', 'braised', 60, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['stew', 'everyday', 'home-cooking'], 88),
('COL_SUDADO_CARNE', 'sudado-de-carne', 'Sudado de Carne', 'Beef stewed in tomato-based sauce with vegetables', 'main', 'classic', 'Nacional', 'beef', 'braised', 90, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['stew', 'comfort', 'family'], 85),
('COL_CARNE_OREADA', 'carne-oreada', 'Carne Oreada', 'Sun-dried beef grilled to perfection, served with yuca', 'main', 'regional', 'Santander', 'beef', 'grilled', 30, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['dried-meat', 'santander', 'grilled'], 78),
('COL_CABRITO', 'cabrito', 'Cabrito', 'Roasted young goat, a specialty of Santander', 'main', 'regional', 'Santander', 'goat', 'roasted', 180, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['goat', 'special-occasion', 'rustic'], 72),
('COL_VIUDO_PESCADO', 'viudo-de-pescado', 'Viudo de Pescado', 'Freshwater fish stew with yuca, plantain, and vegetables', 'main', 'regional', 'Tolima', 'fish', 'steamed', 60, 0, '{"gluten_free": true}', ARRAY['fish'], ARRAY['river-fish', 'tolima', 'steamed'], 75),
('COL_SOBREBARRIGA', 'sobrebarriga', 'Sobrebarriga', 'Braised flank steak in creole sauce, served with potatoes', 'main', 'classic', 'Bogotá', 'beef', 'braised', 180, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['braised', 'bogota', 'sunday'], 88);

-- ===========================================
-- BREAKFAST (5 dishes)
-- ===========================================

INSERT INTO colombian (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('COL_CALENTADO', 'calentado', 'Calentado', 'Reheated rice and beans from the night before, topped with fried egg and arepa', 'breakfast', 'iconic', 'Nacional', 'mixed', 'pan_fried', 20, 0, '{"gluten_free": true}', ARRAY['egg'], ARRAY['leftovers', 'everyday', 'hearty'], 95),
('COL_HUEVOS_PERICOS', 'huevos-pericos', 'Huevos Pericos', 'Scrambled eggs with tomatoes and scallions', 'breakfast', 'iconic', 'Nacional', 'egg', 'scrambled', 10, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['egg'], ARRAY['eggs', 'quick', 'classic'], 95),
('COL_TAMAL', 'tamal-colombiano', 'Tamal Colombiano', 'Corn dough filled with chicken, pork, vegetables, wrapped in banana leaf', 'breakfast', 'iconic', 'Tolima', 'mixed', 'steamed', 240, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['tamal', 'festive', 'wrapped'], 92),
('COL_CHOCOLATE_QUESO', 'chocolate-con-queso', 'Chocolate con Queso', 'Hot chocolate served with fresh cheese to dip', 'breakfast', 'iconic', 'Nacional', 'dairy', 'heated', 10, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['hot-chocolate', 'cheese', 'tradition'], 90),
('COL_CALDO_COSTILLA', 'caldo-de-costilla', 'Caldo de Costilla', 'Beef rib broth with potato, cilantro, served for breakfast', 'breakfast', 'classic', 'Bogotá', 'beef', 'simmered', 60, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['broth', 'morning', 'restorative'], 85);

-- ===========================================
-- STREET FOOD (8 dishes)
-- ===========================================

INSERT INTO colombian (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('COL_AREPA_QUESO', 'arepa-con-queso', 'Arepa con Queso', 'Grilled corn cake stuffed with melted cheese', 'street_food', 'iconic', 'Nacional', 'dairy', 'grilled', 15, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['arepa', 'cheese', 'everyday'], 98),
('COL_AREPA_HUEVO', 'arepa-de-huevo', 'Arepa de Huevo', 'Fried arepa with egg inside, coastal specialty', 'street_food', 'iconic', 'Costa Caribe', 'egg', 'deep_fried', 20, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['egg'], ARRAY['arepa', 'fried', 'coastal'], 95),
('COL_EMPANADA', 'empanada-colombiana', 'Empanada Colombiana', 'Crispy corn empanada filled with seasoned potatoes and beef', 'street_food', 'iconic', 'Nacional', 'beef', 'deep_fried', 45, 1, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['empanada', 'crispy', 'snack'], 98),
('COL_PATACON', 'patacon', 'Patacón', 'Twice-fried flattened green plantain, served with toppings', 'street_food', 'iconic', 'Costa Caribe', 'vegetable', 'deep_fried', 20, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['plantain', 'crispy', 'versatile'], 92),
('COL_BUÑUELO', 'bunuelo', 'Buñuelo', 'Fried cheese balls, light and crispy, popular at Christmas', 'street_food', 'iconic', 'Nacional', 'dairy', 'deep_fried', 30, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy', 'egg'], ARRAY['cheese', 'christmas', 'snack'], 95),
('COL_PANDEBONO', 'pandebono', 'Pandebono', 'Cheese bread made with yuca starch and fresh cheese', 'street_food', 'iconic', 'Valle del Cauca', 'dairy', 'baked', 30, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy', 'egg'], ARRAY['cheese-bread', 'cali', 'breakfast'], 95),
('COL_ALMOJABANA', 'almojabana', 'Almojábana', 'Traditional cheese bread from the Andean region', 'street_food', 'classic', 'Boyacá', 'dairy', 'baked', 30, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['dairy', 'egg', 'gluten'], ARRAY['cheese-bread', 'andean', 'morning'], 85),
('COL_CHORIZO_ABORRAJADO', 'chorizo-aborrajado', 'Chorizo Aborrajado', 'Battered and fried chorizo, popular street snack', 'street_food', 'classic', 'Antioquia', 'pork', 'deep_fried', 20, 1, '{"gluten_free": false}', ARRAY['gluten', 'egg'], ARRAY['chorizo', 'fried', 'antioquia'], 82);

-- ===========================================
-- SEAFOOD (5 dishes)
-- ===========================================

INSERT INTO colombian (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('COL_ARROZ_COCO_PESCADO', 'arroz-con-coco-pescado', 'Arroz con Coco y Pescado', 'Coconut rice served with fried fish, plantain and salad', 'seafood', 'iconic', 'Costa Caribe', 'fish', 'mixed', 60, 0, '{"gluten_free": true}', ARRAY['fish'], ARRAY['coastal', 'coconut', 'complete-meal'], 95),
('COL_CAZUELA_MARISCOS', 'cazuela-de-mariscos', 'Cazuela de Mariscos', 'Creamy seafood stew with shrimp, fish, octopus in coconut sauce', 'seafood', 'iconic', 'Costa Caribe', 'seafood', 'simmered', 45, 1, '{"gluten_free": true}', ARRAY['shellfish', 'fish'], ARRAY['seafood-stew', 'creamy', 'cartagena'], 92),
('COL_CEVICHE_CAMARONES', 'ceviche-de-camarones', 'Ceviche de Camarones', 'Shrimp marinated in lime with tomato, onion, and cilantro', 'seafood', 'classic', 'Costa Caribe', 'shellfish', 'raw', 30, 1, '{"gluten_free": true}', ARRAY['shellfish'], ARRAY['ceviche', 'fresh', 'appetizer'], 88),
('COL_MOJARRA_FRITA', 'mojarra-frita', 'Mojarra Frita', 'Whole fried tilapia with patacones and coconut rice', 'seafood', 'iconic', 'Costa Caribe', 'fish', 'deep_fried', 30, 0, '{"gluten_free": true}', ARRAY['fish'], ARRAY['fried-fish', 'whole', 'coastal'], 90),
('COL_COCTEL_CAMARONES', 'coctel-de-camarones', 'Coctel de Camarones', 'Shrimp cocktail in tomato-based sauce with avocado', 'seafood', 'classic', 'Costa Caribe', 'shellfish', 'mixed', 20, 0, '{"gluten_free": true}', ARRAY['shellfish'], ARRAY['cocktail', 'appetizer', 'fresh'], 85);

-- ===========================================
-- DESSERTS (7 dishes)
-- ===========================================

INSERT INTO colombian (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('COL_AREQUIPE', 'arequipe', 'Arequipe', 'Colombian dulce de leche, thick caramelized milk spread', 'dessert', 'iconic', 'Nacional', 'dairy', 'simmered', 120, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['spread', 'essential', 'sweet'], 98),
('COL_OBLEAS', 'obleas', 'Obleas con Arequipe', 'Thin wafers filled with arequipe and various toppings', 'dessert', 'iconic', 'Nacional', 'dairy', 'raw', 5, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['dairy', 'gluten'], ARRAY['wafer', 'street-dessert', 'customizable'], 95),
('COL_NATILLA', 'natilla', 'Natilla', 'Traditional custard dessert, essential at Christmas', 'dessert', 'iconic', 'Nacional', 'dairy', 'simmered', 45, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['christmas', 'custard', 'tradition'], 95),
('COL_TRES_LECHES', 'tres-leches', 'Tres Leches', 'Sponge cake soaked in three types of milk with whipped cream', 'dessert', 'iconic', 'Nacional', 'dairy', 'baked', 60, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['dairy', 'egg', 'gluten'], ARRAY['cake', 'moist', 'celebration'], 92),
('COL_POSTRE_NATAS', 'postre-de-natas', 'Postre de Natas', 'Creamy dessert made with milk skin layers and cinnamon', 'dessert', 'traditional', 'Bogotá', 'dairy', 'simmered', 90, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['bogota', 'traditional', 'delicate'], 78),
('COL_BOCADILLO', 'bocadillo-veleño', 'Bocadillo Veleño', 'Guava paste squares, often paired with cheese', 'dessert', 'iconic', 'Santander', 'fruit', 'simmered', 60, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['guava', 'sweet', 'with-cheese'], 90),
('COL_ARROZ_LECHE', 'arroz-con-leche-colombiano', 'Arroz con Leche', 'Creamy rice pudding with cinnamon and raisins', 'dessert', 'classic', 'Nacional', 'dairy', 'simmered', 45, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['rice-pudding', 'comfort', 'grandmother'], 88);

-- ===========================================
-- BEVERAGES (6 dishes)
-- ===========================================

INSERT INTO colombian (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('COL_AGUAPANELA', 'aguapanela', 'Aguapanela', 'Traditional drink made from panela (raw cane sugar) served hot or cold with lime', 'beverage', 'iconic', 'Nacional', 'beverage', 'heated', 10, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['traditional', 'everyday', 'refreshing'], 98),
('COL_LULADA', 'lulada', 'Lulada', 'Refreshing drink made with crushed lulo fruit, sugar, and lime', 'beverage', 'iconic', 'Valle del Cauca', 'beverage', 'mixed', 10, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['tropical', 'cali', 'refreshing'], 92),
('COL_CHOLADO', 'cholado', 'Cholado', 'Shaved ice dessert with tropical fruits, condensed milk, and syrup', 'beverage', 'iconic', 'Valle del Cauca', 'beverage', 'raw', 10, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['shaved-ice', 'tropical', 'cali'], 90),
('COL_JUGO_GUANABANA', 'jugo-de-guanabana', 'Jugo de Guanábana', 'Creamy soursop juice with milk', 'beverage', 'classic', 'Nacional', 'beverage', 'blended', 5, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['tropical', 'creamy', 'refreshing'], 88),
('COL_CHICHA', 'chicha', 'Chicha', 'Fermented corn drink, traditional indigenous beverage', 'beverage', 'traditional', 'Boyacá', 'beverage', 'fermented', 4320, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['fermented', 'indigenous', 'traditional'], 70),
('COL_REFAJO', 'refajo', 'Refajo', 'Beer mixed with colombiana soda, popular party drink', 'beverage', 'classic', 'Nacional', 'beverage', 'mixed', 2, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['beer', 'party', 'mixed'], 85);

-- Success message
SELECT 'Colombian dishes inserted: 45 records' AS status;
