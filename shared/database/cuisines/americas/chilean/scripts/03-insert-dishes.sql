-- Chilean Cuisine Database - Script 03: Insert Dishes
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- Total: 43 dishes

-- ===========================================
-- EMPANADAS (5 dishes)
-- ===========================================

INSERT INTO chilean (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('CHL_EMPANADA_PINO', 'empanada-de-pino', 'Empanada de Pino', 'Classic Chilean baked empanada with beef, onion, olives, hard-boiled egg, and raisins', 'empanada', 'iconic', 'Nacional', 'beef', 'baked', 90, 1, '{"gluten_free": false}', ARRAY['gluten', 'egg'], ARRAY['national-dish', 'fiestas-patrias', 'traditional'], 99),
('CHL_EMPANADA_QUESO', 'empanada-de-queso', 'Empanada de Queso', 'Fried cheese empanada, crispy outside with melted cheese inside', 'empanada', 'classic', 'Nacional', 'dairy', 'deep_fried', 45, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['gluten', 'dairy'], ARRAY['fried', 'cheese', 'snack'], 88),
('CHL_EMPANADA_MARISCOS', 'empanada-de-mariscos', 'Empanada de Mariscos', 'Seafood empanada with mixed shellfish and fish in creamy sauce', 'empanada', 'regional', 'Valparaíso', 'seafood', 'baked', 75, 0, '{"gluten_free": false}', ARRAY['gluten', 'shellfish', 'fish', 'dairy'], ARRAY['coastal', 'seafood', 'premium'], 82),
('CHL_EMPANADA_NAPOLITANA', 'empanada-napolitana', 'Empanada Napolitana', 'Ham, cheese, and tomato empanada, pizza-style filling', 'empanada', 'classic', 'Santiago', 'pork', 'baked', 45, 0, '{"gluten_free": false}', ARRAY['gluten', 'dairy'], ARRAY['pizza-style', 'ham', 'popular'], 78),
('CHL_EMPANADA_CAMARÓN_QUESO', 'empanada-camaron-queso', 'Empanada de Camarón Queso', 'Shrimp and cheese empanada, popular coastal variation', 'empanada', 'regional', 'Valparaíso', 'shrimp', 'baked', 60, 0, '{"gluten_free": false}', ARRAY['gluten', 'shellfish', 'dairy'], ARRAY['shrimp', 'cheese', 'coastal'], 80);

-- ===========================================
-- MAINS (8 dishes)
-- ===========================================

INSERT INTO chilean (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('CHL_PASTEL_CHOCLO', 'pastel-de-choclo', 'Pastel de Choclo', 'Traditional corn pie with beef, chicken, olives, and eggs, topped with sweet corn paste', 'main', 'iconic', 'Centro', 'mixed', 'baked', 120, 1, '{"gluten_free": true}', ARRAY['egg'], ARRAY['summer', 'traditional', 'corn'], 98),
('CHL_CAZUELA', 'cazuela', 'Cazuela', 'Hearty stew with meat, potatoes, corn, pumpkin, and green beans', 'main', 'iconic', 'Nacional', 'beef', 'simmered', 90, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['comfort', 'winter', 'home-cooking'], 95),
('CHL_CURANTO', 'curanto', 'Curanto', 'Traditional Chiloé dish cooked underground with seafood, meat, potatoes, and chapaleles', 'main', 'iconic', 'Chiloé', 'mixed', 'steamed', 240, 0, '{"gluten_free": false}', ARRAY['shellfish', 'gluten'], ARRAY['ancestral', 'mapuche', 'celebration'], 92),
('CHL_POROTOS_GRANADOS', 'porotos-granados', 'Porotos Granados', 'Summer stew of fresh cranberry beans, corn, squash, and basil', 'main', 'iconic', 'Centro', 'legume', 'simmered', 60, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['summer', 'vegetarian', 'traditional'], 90),
('CHL_CHARQUICÁN', 'charquican', 'Charquicán', 'Rustic mashed stew with beef, potatoes, pumpkin, and vegetables, topped with fried egg', 'main', 'iconic', 'Nacional', 'beef', 'simmered', 75, 0, '{"gluten_free": true}', ARRAY['egg'], ARRAY['comfort', 'mashed', 'home-cooking'], 88),
('CHL_ASADO_ALEMÁN', 'asado-aleman', 'Asado Alemán', 'German-Chilean roast beef with sauerkraut, influenced by German settlers', 'main', 'regional', 'Sur', 'beef', 'roasted', 180, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['german-influence', 'roasted', 'southern'], 75),
('CHL_CALDILLO_CONGRIO', 'caldillo-de-congrio', 'Caldillo de Congrio', 'Traditional conger eel soup made famous by Pablo Neruda poem, with potatoes and tomatoes', 'main', 'iconic', 'Valparaíso', 'fish', 'simmered', 45, 0, '{"gluten_free": true}', ARRAY['fish'], ARRAY['neruda', 'coastal', 'literary'], 85),
('CHL_COSTILLAR', 'costillar', 'Costillar', 'Chilean-style BBQ pork ribs with local seasonings', 'main', 'classic', 'Centro', 'pork', 'grilled', 180, 1, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['bbq', 'ribs', 'asado'], 85);

-- ===========================================
-- SOUPS (5 dishes)
-- ===========================================

INSERT INTO chilean (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('CHL_CAZUELA_VACUNO', 'cazuela-de-vacuno', 'Cazuela de Vacuno', 'Classic beef soup with corn on the cob, potatoes, pumpkin, and rice', 'soup', 'iconic', 'Nacional', 'beef', 'simmered', 90, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['comfort', 'winter', 'classic'], 95),
('CHL_CAZUELA_AVE', 'cazuela-de-ave', 'Cazuela de Ave', 'Traditional chicken soup version with same vegetables as beef cazuela', 'soup', 'classic', 'Nacional', 'chicken', 'simmered', 75, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['comfort', 'chicken', 'light'], 90),
('CHL_PANTRUCA', 'pantrucas', 'Pantrucas', 'Rustic soup with flour dumplings in broth with beef or chicken', 'soup', 'traditional', 'Sur', 'beef', 'simmered', 60, 0, '{"gluten_free": false}', ARRAY['gluten', 'egg'], ARRAY['rustic', 'dumplings', 'winter'], 75),
('CHL_CARBONADA', 'carbonada', 'Carbonada', 'Hearty beef and vegetable soup with diced potatoes, pumpkin, corn, and rice', 'soup', 'classic', 'Nacional', 'beef', 'simmered', 60, 0, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['hearty', 'diced', 'everyday'], 80),
('CHL_VALDIVIANO', 'valdiviano', 'Valdiviano', 'Traditional soup from Valdivia with charqui (dried beef), onions, and eggs', 'soup', 'regional', 'Sur', 'beef', 'simmered', 45, 0, '{"gluten_free": true}', ARRAY['egg'], ARRAY['valdivia', 'charqui', 'traditional'], 70);

-- ===========================================
-- SEAFOOD (6 dishes)
-- ===========================================

INSERT INTO chilean (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('CHL_CEVICHE', 'ceviche-chileno', 'Ceviche Chileno', 'Chilean-style ceviche with corvina, lime, onion, and cilantro', 'seafood', 'classic', 'Valparaíso', 'fish', 'raw', 30, 1, '{"gluten_free": true}', ARRAY['fish'], ARRAY['fresh', 'coastal', 'appetizer'], 88),
('CHL_MACHAS_PARMESANA', 'machas-a-la-parmesana', 'Machas a la Parmesana', 'Razor clams gratinéed with parmesan cheese and white wine', 'seafood', 'iconic', 'Valparaíso', 'shellfish', 'baked', 25, 0, '{"gluten_free": true}', ARRAY['shellfish', 'dairy'], ARRAY['premium', 'gratinée', 'elegant'], 92),
('CHL_LOCOS_MAYO', 'locos-con-mayonesa', 'Locos con Mayonesa', 'Chilean abalone served cold with homemade mayonnaise, a delicacy', 'seafood', 'iconic', 'Nacional', 'shellfish', 'boiled', 45, 0, '{"gluten_free": true}', ARRAY['shellfish', 'egg'], ARRAY['delicacy', 'premium', 'fiestas-patrias'], 88),
('CHL_CHORITOS_VAPOR', 'choritos-al-vapor', 'Choritos al Vapor', 'Steamed mussels with white wine, garlic, and parsley', 'seafood', 'classic', 'Chiloé', 'shellfish', 'steamed', 20, 0, '{"gluten_free": true}', ARRAY['shellfish'], ARRAY['mussels', 'simple', 'aperitivo'], 85),
('CHL_REINETA_PLANCHA', 'reineta-a-la-plancha', 'Reineta a la Plancha', 'Grilled bream fish, popular everyday fish dish', 'seafood', 'classic', 'Nacional', 'fish', 'grilled', 25, 0, '{"gluten_free": true}', ARRAY['fish'], ARRAY['everyday', 'simple', 'healthy'], 82),
('CHL_PAILA_MARINA', 'paila-marina', 'Paila Marina', 'Chilean seafood soup with mix of shellfish and fish in broth', 'seafood', 'iconic', 'Valparaíso', 'seafood', 'simmered', 45, 0, '{"gluten_free": true}', ARRAY['shellfish', 'fish'], ARRAY['soup', 'mixed-seafood', 'coastal'], 90);

-- ===========================================
-- STREET FOOD (6 dishes)
-- ===========================================

INSERT INTO chilean (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('CHL_COMPLETO', 'completo', 'Completo', 'Chilean hot dog loaded with tomato, avocado, mayonnaise, and sauerkraut', 'street_food', 'iconic', 'Nacional', 'pork', 'grilled', 10, 0, '{"gluten_free": false}', ARRAY['gluten', 'egg'], ARRAY['hot-dog', 'loaded', 'national'], 98),
('CHL_ITALIANO', 'italiano', 'Italiano', 'Hot dog with tomato, avocado, and mayonnaise (Italian flag colors)', 'street_food', 'iconic', 'Nacional', 'pork', 'grilled', 10, 0, '{"gluten_free": false}', ARRAY['gluten', 'egg'], ARRAY['hot-dog', 'classic', 'tricolor'], 95),
('CHL_SOPAIPILLA', 'sopaipillas', 'Sopaipillas', 'Fried pumpkin dough rounds, sweet or savory, popular rainy day treat', 'street_food', 'iconic', 'Nacional', 'vegetable', 'deep_fried', 45, 0, '{"vegetarian": true, "vegan": true, "gluten_free": false}', ARRAY['gluten'], ARRAY['fried', 'pumpkin', 'rainy-day'], 92),
('CHL_SOPAIPILLA_PASADA', 'sopaipilla-pasada', 'Sopaipilla Pasada', 'Sopaipillas dipped in warm chancaca (raw cane sugar) syrup', 'street_food', 'classic', 'Nacional', 'vegetable', 'deep_fried', 60, 0, '{"vegetarian": true, "vegan": true, "gluten_free": false}', ARRAY['gluten'], ARRAY['sweet', 'syrup', 'dessert'], 88),
('CHL_ANTICUCHO', 'anticuchos-chilenos', 'Anticuchos', 'Grilled beef heart skewers with spicy sauce', 'street_food', 'classic', 'Nacional', 'beef', 'grilled', 45, 2, '{"gluten_free": true}', ARRAY[]::TEXT[], ARRAY['skewers', 'offal', 'bbq'], 78),
('CHL_CHORIPAN', 'choripan-chileno', 'Choripán', 'Grilled chorizo in bread with pebre sauce', 'street_food', 'iconic', 'Nacional', 'pork', 'grilled', 15, 1, '{"gluten_free": false}', ARRAY['gluten'], ARRAY['chorizo', 'bbq', 'asado'], 90);

-- ===========================================
-- APPETIZERS (5 dishes)
-- ===========================================

INSERT INTO chilean (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('CHL_PEBRE', 'pebre', 'Pebre', 'Chilean salsa with tomatoes, onion, cilantro, and chili, served with bread', 'appetizer', 'iconic', 'Nacional', 'vegetable', 'raw', 15, 2, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['salsa', 'essential', 'condiment'], 98),
('CHL_CHANCHO_PIEDRA', 'chancho-en-piedra', 'Chancho en Piedra', 'Stone-ground tomato and chili sauce, rustic pebre variation', 'appetizer', 'traditional', 'Centro', 'vegetable', 'raw', 20, 2, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['rustic', 'stone-ground', 'traditional'], 75),
('CHL_ENSALADA_CHILENA', 'ensalada-chilena', 'Ensalada Chilena', 'Simple salad of sliced tomatoes and onions with olive oil', 'appetizer', 'iconic', 'Nacional', 'vegetable', 'raw', 10, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['simple', 'everyday', 'side'], 95),
('CHL_PALTA_REINA', 'palta-reina', 'Palta Reina', 'Avocado half filled with chicken or tuna salad', 'appetizer', 'classic', 'Nacional', 'chicken', 'raw', 20, 0, '{"gluten_free": true}', ARRAY['egg'], ARRAY['avocado', 'stuffed', 'elegant'], 82),
('CHL_ERIZOS', 'erizos', 'Erizos', 'Fresh sea urchin served raw with lemon, a coastal delicacy', 'appetizer', 'regional', 'Valparaíso', 'seafood', 'raw', 10, 0, '{"gluten_free": true}', ARRAY['shellfish'], ARRAY['delicacy', 'raw', 'coastal'], 70);

-- ===========================================
-- DESSERTS & BEVERAGES (8 dishes)
-- ===========================================

INSERT INTO chilean (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES
('CHL_MOTE_HUESILLO', 'mote-con-huesillo', 'Mote con Huesillo', 'Traditional summer drink-dessert with wheat berries and dried peaches in sweet syrup', 'dessert', 'iconic', 'Nacional', 'fruit', 'simmered', 120, 0, '{"vegetarian": true, "vegan": true, "gluten_free": false}', ARRAY['gluten'], ARRAY['summer', 'refreshing', 'traditional'], 95),
('CHL_LECHE_ASADA', 'leche-asada', 'Leche Asada', 'Baked milk custard similar to flan but with a caramelized top', 'dessert', 'iconic', 'Nacional', 'dairy', 'baked', 60, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy', 'egg'], ARRAY['custard', 'classic', 'home-style'], 92),
('CHL_ALFAJOR', 'alfajor-chileno', 'Alfajor Chileno', 'Soft cookie sandwich filled with dulce de leche and coated in chocolate', 'dessert', 'iconic', 'Nacional', 'dairy', 'baked', 90, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['gluten', 'dairy', 'egg'], ARRAY['cookie', 'dulce-de-leche', 'popular'], 90),
('CHL_KUCHEN', 'kuchen', 'Kuchen', 'German-Chilean fruit cake, especially apple, brought by German settlers', 'dessert', 'regional', 'Sur', 'fruit', 'baked', 90, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['gluten', 'dairy', 'egg'], ARRAY['german-influence', 'apple', 'southern'], 85),
('CHL_BRAZO_REINA', 'brazo-de-reina', 'Brazo de Reina', 'Rolled sponge cake filled with dulce de leche', 'dessert', 'classic', 'Nacional', 'dairy', 'baked', 60, 0, '{"vegetarian": true, "gluten_free": false}', ARRAY['gluten', 'dairy', 'egg'], ARRAY['roll-cake', 'dulce-de-leche', 'celebration'], 85),
('CHL_CHIRIMOYA_ALEGRE', 'chirimoya-alegre', 'Chirimoya Alegre', 'Fresh cherimoya with orange juice, a refreshing fruit dessert', 'dessert', 'classic', 'Nacional', 'fruit', 'raw', 10, 0, '{"vegetarian": true, "vegan": true, "gluten_free": true}', ARRAY[]::TEXT[], ARRAY['fresh', 'fruit', 'simple'], 80),
('CHL_COLA_MONO', 'cola-de-mono', 'Cola de Mono', 'Christmas coffee-based drink with aguardiente, milk, and spices', 'beverage', 'iconic', 'Nacional', 'beverage', 'mixed', 30, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['dairy'], ARRAY['christmas', 'alcoholic', 'festive'], 92),
('CHL_PISCO_SOUR', 'pisco-sour-chileno', 'Pisco Sour Chileno', 'Chilean version of pisco sour with pisco, lime, sugar, and egg white', 'beverage', 'iconic', 'Norte', 'beverage', 'mixed', 5, 0, '{"vegetarian": true, "gluten_free": true}', ARRAY['egg'], ARRAY['cocktail', 'pisco', 'national'], 95);

-- Success message
SELECT 'Chilean dishes inserted: 43 records' AS status;
