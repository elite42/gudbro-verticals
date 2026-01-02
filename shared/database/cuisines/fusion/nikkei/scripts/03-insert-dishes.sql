-- Nikkei Database - Script 03: Insert Dishes
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-25
-- Total: 30 dishes

INSERT INTO nikkei (id, slug, name, description, category, status, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES

-- TIRADITOS (5)
('NIK_TIRADITO_CLASICO', 'tiradito-clasico', 'Tiradito Clasico', 'Thinly sliced white fish with aji amarillo tiger milk, crispy garlic, and cilantro', 'tiradito', 'iconic', 'fish', 'raw', 15, 2, '{"gluten_free": true}'::jsonb, ARRAY['fish'], ARRAY['signature', 'raw', 'citrus'], 95),
('NIK_TIRADITO_SALMON', 'tiradito-salmon', 'Tiradito de Salmon', 'Sashimi-cut salmon with passion fruit tiger milk, rocoto cream, and microgreens', 'tiradito', 'classic', 'fish', 'raw', 15, 2, '{"gluten_free": true}'::jsonb, ARRAY['fish'], ARRAY['salmon', 'passion-fruit', 'elegant'], 88),
('NIK_TIRADITO_PULPO', 'tiradito-pulpo', 'Tiradito de Pulpo', 'Tender octopus slices with olive tiger milk, kalamata olives, and aji panca', 'tiradito', 'classic', 'octopus', 'poached', 45, 1, '{"gluten_free": true}'::jsonb, ARRAY['shellfish'], ARRAY['octopus', 'olive', 'mediterranean-influence'], 82),
('NIK_TIRADITO_NIKKEI', 'tiradito-nikkei', 'Tiradito Nikkei', 'White fish with soy-citrus tiger milk, sesame seeds, ginger, and nori strips', 'tiradito', 'iconic', 'fish', 'raw', 15, 1, '{"gluten_free": false}'::jsonb, ARRAY['fish', 'soy', 'sesame'], ARRAY['fusion', 'soy', 'signature'], 92),
('NIK_TIRADITO_ATUN', 'tiradito-atun', 'Tiradito de Atun', 'Bluefin tuna with miso tiger milk, truffle oil, and crispy shallots', 'tiradito', 'modern', 'fish', 'raw', 15, 1, '{"gluten_free": false}'::jsonb, ARRAY['fish', 'soy'], ARRAY['tuna', 'miso', 'premium'], 85),

-- CEVICHES (5)
('NIK_CEVICHE_NIKKEI', 'ceviche-nikkei', 'Ceviche Nikkei', 'Fresh fish cured in tiger milk with soy, ginger, sesame, and crispy wonton strips', 'ceviche', 'iconic', 'fish', 'cured', 20, 2, '{"gluten_free": false}'::jsonb, ARRAY['fish', 'soy', 'gluten'], ARRAY['signature', 'fusion', 'fresh'], 95),
('NIK_CEVICHE_MIXTO', 'ceviche-mixto-nikkei', 'Ceviche Mixto Nikkei', 'Mixed seafood ceviche with shrimp, octopus, and squid in fusion tiger milk', 'ceviche', 'classic', 'mixed_seafood', 'cured', 25, 2, '{"gluten_free": false}'::jsonb, ARRAY['shellfish', 'fish', 'soy'], ARRAY['mixed', 'seafood', 'traditional'], 88),
('NIK_CEVICHE_ATUN', 'ceviche-atun', 'Ceviche de Atun', 'Sashimi-grade tuna ceviche with wasabi tiger milk and avocado', 'ceviche', 'modern', 'fish', 'cured', 15, 2, '{"gluten_free": true}'::jsonb, ARRAY['fish'], ARRAY['tuna', 'wasabi', 'premium'], 85),
('NIK_CEVICHE_VIEIRAS', 'ceviche-vieiras', 'Ceviche de Vieiras', 'Scallop ceviche with yuzu tiger milk, miso, and crispy garlic', 'ceviche', 'modern', 'shellfish', 'cured', 15, 1, '{"gluten_free": false}'::jsonb, ARRAY['shellfish', 'soy'], ARRAY['scallop', 'yuzu', 'elegant'], 82),
('NIK_CEVICHE_LANGOSTINO', 'ceviche-langostino', 'Ceviche de Langostino', 'Langoustine ceviche with ponzu, aji limo, and tobiko', 'ceviche', 'classic', 'shellfish', 'cured', 20, 2, '{"gluten_free": false}'::jsonb, ARRAY['shellfish', 'soy', 'fish'], ARRAY['langoustine', 'ponzu', 'tobiko'], 80),

-- MAKIS (5)
('NIK_MAKI_ACEVICHADO', 'maki-acevichado', 'Maki Acevichado', 'Sushi roll with ceviche-style fish, avocado, topped with tiger milk and aji amarillo', 'maki', 'iconic', 'fish', 'raw', 25, 2, '{"gluten_free": false}'::jsonb, ARRAY['fish', 'soy', 'gluten'], ARRAY['signature', 'fusion', 'creative'], 93),
('NIK_MAKI_LOMO_SALTADO', 'maki-lomo-saltado', 'Maki de Lomo Saltado', 'Roll filled with stir-fried beef tenderloin, tomato, onion, and soy reduction', 'maki', 'iconic', 'beef', 'stir_fried', 30, 1, '{"gluten_free": false}'::jsonb, ARRAY['soy', 'gluten'], ARRAY['lomo-saltado', 'beef', 'peruvian-classic'], 90),
('NIK_MAKI_LANGOSTINO', 'maki-langostino', 'Maki de Langostino', 'Tempura langoustine roll with avocado, cream cheese, and eel sauce', 'maki', 'classic', 'shellfish', 'fried', 25, 0, '{"gluten_free": false}'::jsonb, ARRAY['shellfish', 'soy', 'gluten', 'dairy'], ARRAY['tempura', 'langoustine', 'creamy'], 85),
('NIK_MAKI_SALMON_PASSION', 'maki-salmon-passion', 'Maki Salmon Maracuya', 'Salmon roll with passion fruit cream, avocado, and crispy quinoa topping', 'maki', 'modern', 'fish', 'raw', 25, 0, '{"gluten_free": false}'::jsonb, ARRAY['fish', 'soy', 'dairy'], ARRAY['salmon', 'passion-fruit', 'quinoa'], 82),
('NIK_MAKI_PULPO', 'maki-pulpo', 'Maki de Pulpo', 'Grilled octopus roll with olive tapenade, sun-dried tomato, and aji panca aioli', 'maki', 'classic', 'octopus', 'grilled', 30, 1, '{"gluten_free": false}'::jsonb, ARRAY['shellfish', 'soy', 'egg'], ARRAY['octopus', 'mediterranean', 'grilled'], 78),

-- MAINS (6)
('NIK_LOMO_NIKKEI', 'lomo-nikkei', 'Lomo Saltado Nikkei', 'Classic lomo saltado with teriyaki glaze, shiitake mushrooms, and crispy rice', 'main', 'iconic', 'beef', 'stir_fried', 25, 1, '{"gluten_free": false}'::jsonb, ARRAY['soy', 'gluten'], ARRAY['lomo-saltado', 'teriyaki', 'signature'], 95),
('NIK_ARROZ_CHAUFA', 'arroz-chaufa-nikkei', 'Arroz Chaufa Nikkei', 'Peruvian-Japanese fried rice with char siu pork, egg, and aji amarillo', 'main', 'classic', 'pork', 'stir_fried', 20, 1, '{"gluten_free": false}'::jsonb, ARRAY['soy', 'egg'], ARRAY['fried-rice', 'chaufa', 'fusion'], 88),
('NIK_PESCADO_MISO', 'pescado-miso', 'Pescado en Miso', 'Sea bass marinated in white miso, sake, and mirin with Peruvian corn salsa', 'main', 'iconic', 'fish', 'roasted', 45, 0, '{"gluten_free": false}'::jsonb, ARRAY['fish', 'soy'], ARRAY['miso-glazed', 'sea-bass', 'nobu-style'], 92),
('NIK_POLLO_ANTICUCHO', 'pollo-anticucho-nikkei', 'Pollo Anticucho Nikkei', 'Grilled chicken thighs with aji panca-teriyaki glaze and pickled ginger', 'main', 'classic', 'chicken', 'grilled', 30, 2, '{"gluten_free": false}'::jsonb, ARRAY['soy'], ARRAY['anticucho', 'teriyaki', 'grilled'], 80),
('NIK_CAUSA_NIKKEI', 'causa-nikkei', 'Causa Nikkei', 'Layered potato terrine with spicy tuna tartare, wasabi mayo, and tobiko', 'main', 'classic', 'fish', 'raw', 35, 2, '{"gluten_free": true}'::jsonb, ARRAY['fish', 'egg'], ARRAY['causa', 'potato', 'tuna-tartare'], 85),
('NIK_SUDADO_NIKKEI', 'sudado-nikkei', 'Sudado Nikkei', 'Steamed fish in dashi broth with aji amarillo, tomato, and bok choy', 'main', 'traditional', 'fish', 'steamed', 25, 1, '{"gluten_free": false}'::jsonb, ARRAY['fish', 'soy'], ARRAY['sudado', 'steamed', 'brothy'], 75),

-- ANTICUCHOS (4)
('NIK_ANTICUCHO_PULPO', 'anticucho-pulpo', 'Anticucho de Pulpo', 'Grilled octopus skewers with aji panca-miso glaze and chimichurri nikkei', 'anticucho', 'iconic', 'octopus', 'grilled', 35, 2, '{"gluten_free": false}'::jsonb, ARRAY['shellfish', 'soy'], ARRAY['octopus', 'grilled', 'signature'], 90),
('NIK_ANTICUCHO_SALMON', 'anticucho-salmon', 'Anticucho de Salmon', 'Teriyaki-glazed salmon skewers with pickled vegetables and wasabi aioli', 'anticucho', 'classic', 'fish', 'grilled', 20, 1, '{"gluten_free": false}'::jsonb, ARRAY['fish', 'soy', 'egg'], ARRAY['salmon', 'teriyaki', 'yakitori-style'], 85),
('NIK_ANTICUCHO_CORAZON', 'anticucho-corazon-nikkei', 'Anticucho de Corazon Nikkei', 'Traditional beef heart skewers with rocoto-teriyaki sauce and crispy shallots', 'anticucho', 'traditional', 'offal', 'grilled', 30, 3, '{"gluten_free": false}'::jsonb, ARRAY['soy'], ARRAY['beef-heart', 'traditional', 'street-food'], 78),
('NIK_ANTICUCHO_LANGOSTINO', 'anticucho-langostino', 'Anticucho de Langostino', 'Grilled langoustine skewers with aji amarillo butter and yuzu kosho', 'anticucho', 'modern', 'shellfish', 'grilled', 15, 2, '{"gluten_free": true}'::jsonb, ARRAY['shellfish', 'dairy'], ARRAY['langoustine', 'butter', 'yuzu'], 82),

-- SIDES (5)
('NIK_EDAMAME_AJI', 'edamame-aji', 'Edamame con Aji', 'Steamed edamame with aji amarillo salt and lime zest', 'side', 'classic', 'vegetable', 'steamed', 10, 2, '{"vegetarian": true, "vegan": true, "gluten_free": true}'::jsonb, ARRAY['soy'], ARRAY['edamame', 'snack', 'vegan'], 80),
('NIK_PAPA_WASABI', 'papa-wasabi', 'Papas con Wasabi', 'Crispy potatoes with wasabi cream and nori flakes', 'side', 'modern', 'vegetable', 'fried', 20, 2, '{"vegetarian": true, "gluten_free": true}'::jsonb, ARRAY['dairy'], ARRAY['potato', 'wasabi', 'crispy'], 75),
('NIK_CHOCLO_NIKKEI', 'choclo-nikkei', 'Choclo Nikkei', 'Grilled Peruvian corn with miso butter and shichimi togarashi', 'side', 'classic', 'vegetable', 'grilled', 15, 1, '{"vegetarian": true, "gluten_free": false}'::jsonb, ARRAY['soy', 'dairy'], ARRAY['corn', 'miso-butter', 'grilled'], 78),
('NIK_ENSALADA_NIKKEI', 'ensalada-nikkei', 'Ensalada Nikkei', 'Mixed greens with ponzu dressing, avocado, and crispy wonton strips', 'side', 'classic', 'vegetable', 'raw', 10, 0, '{"vegetarian": true, "vegan": false, "gluten_free": false}'::jsonb, ARRAY['soy', 'gluten'], ARRAY['salad', 'ponzu', 'fresh'], 72),
('NIK_ARROZ_GOHAN', 'arroz-gohan', 'Arroz Gohan Peruano', 'Japanese rice seasoned with aji amarillo and crispy garlic', 'side', 'traditional', 'grain', 'steamed', 25, 1, '{"vegetarian": true, "vegan": true, "gluten_free": true}'::jsonb, ARRAY[]::TEXT[], ARRAY['rice', 'staple', 'aji'], 70);

-- Success message
SELECT 'Inserted 30 Nikkei dishes' AS status;
