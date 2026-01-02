-- Korean-Mexican Fusion Database - Script 03: Insert Dishes
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- Total: 21 dishes

INSERT INTO koreanmex (id, slug, name, description, category, status, protein_type, cooking_method, prep_time_min, spice_level, dietary, allergens, tags, popularity) VALUES

-- TACOS (5)
('KMX_BULGOGI_TACO', 'bulgogi-taco', 'Bulgogi Taco', 'Grilled marinated beef bulgogi in corn tortilla with kimchi, cilantro, and gochujang crema', 'taco', 'iconic', 'beef', 'grilled', 25, 2, '{"gluten_free": false}'::jsonb, ARRAY['soy', 'sesame', 'dairy'], ARRAY['signature', 'kogi-style', 'street-food'], 98),
('KMX_SPICY_PORK_TACO', 'spicy-pork-taco', 'Spicy Pork Taco', 'Gochujang-marinated pork with pickled daikon, salsa verde, and sesame seeds', 'taco', 'iconic', 'pork', 'grilled', 30, 4, '{"gluten_free": false}'::jsonb, ARRAY['soy', 'sesame'], ARRAY['spicy', 'popular', 'street-food'], 95),
('KMX_KOREAN_CHICKEN_TACO', 'korean-chicken-taco', 'Korean Fried Chicken Taco', 'Crispy Korean fried chicken with spicy mayo, pickled vegetables, and sesame', 'taco', 'iconic', 'chicken', 'deep_fried', 35, 3, '{"gluten_free": false}'::jsonb, ARRAY['gluten', 'soy', 'egg', 'sesame'], ARRAY['crispy', 'kfc-style', 'popular'], 94),
('KMX_SHORT_RIB_TACO', 'short-rib-taco', 'Galbi Short Rib Taco', 'Tender Korean BBQ short ribs with ssam-style toppings and salsa roja', 'taco', 'classic', 'beef', 'grilled', 40, 2, '{"gluten_free": false}'::jsonb, ARRAY['soy', 'sesame'], ARRAY['premium', 'galbi', 'bbq'], 92),
('KMX_TOFU_TACO', 'tofu-taco', 'Spicy Tofu Taco', 'Crispy gochujang-glazed tofu with kimchi slaw and avocado crema', 'taco', 'modern', 'tofu', 'pan_fried', 25, 3, '{"vegetarian": true, "vegan": true, "gluten_free": false}'::jsonb, ARRAY['soy', 'sesame'], ARRAY['vegetarian', 'vegan', 'healthy'], 85),

-- BURRITOS (3)
('KMX_BULGOGI_BURRITO', 'bulgogi-burrito', 'Bulgogi Burrito', 'Flour tortilla stuffed with bulgogi beef, kimchi fried rice, beans, and gochujang sauce', 'burrito', 'iconic', 'beef', 'grilled', 30, 2, '{"gluten_free": false}'::jsonb, ARRAY['gluten', 'soy', 'sesame'], ARRAY['hearty', 'popular', 'filling'], 94),
('KMX_SPICY_PORK_BURRITO', 'spicy-pork-burrito', 'Spicy Pork Burrito', 'Gochujang pork with japchae noodles, pickled vegetables, and queso', 'burrito', 'classic', 'pork', 'grilled', 35, 4, '{"gluten_free": false}'::jsonb, ARRAY['gluten', 'soy', 'sesame', 'dairy'], ARRAY['spicy', 'noodles', 'fusion'], 88),
('KMX_CHICKEN_BURRITO', 'korean-chicken-burrito', 'Korean Chicken Burrito', 'Grilled chicken with gochujang mayo, cilantro lime rice, and Korean pickles', 'burrito', 'classic', 'chicken', 'grilled', 25, 2, '{"gluten_free": false}'::jsonb, ARRAY['gluten', 'soy', 'egg'], ARRAY['balanced', 'popular', 'lunch'], 90),

-- BOWLS (4)
('KMX_BULGOGI_BOWL', 'bulgogi-bowl', 'Bulgogi Bowl', 'Bulgogi beef over cilantro lime rice with black beans, pico de gallo, and gochujang drizzle', 'bowl', 'iconic', 'beef', 'grilled', 25, 2, '{"gluten_free": true}'::jsonb, ARRAY['soy', 'sesame'], ARRAY['signature', 'healthy', 'popular'], 95),
('KMX_BIBIMBAP_BOWL', 'korean-mex-bibimbap', 'Korean-Mex Bibimbap', 'Traditional bibimbap with Mexican twist: chorizo, avocado, pico, and fried egg', 'bowl', 'modern', 'mixed', 'mixed', 30, 3, '{"gluten_free": false}'::jsonb, ARRAY['soy', 'sesame', 'egg'], ARRAY['fusion', 'creative', 'instagram'], 88),
('KMX_CARNITAS_BOWL', 'korean-carnitas-bowl', 'Korean Carnitas Bowl', 'Slow-cooked pork with kimchi, pickled jalapeños, and Korean BBQ sauce over rice', 'bowl', 'classic', 'pork', 'braised', 35, 3, '{"gluten_free": false}'::jsonb, ARRAY['soy', 'sesame'], ARRAY['slow-cooked', 'tender', 'comfort'], 90),
('KMX_VEGGIE_BOWL', 'korean-mex-veggie-bowl', 'Korean-Mex Veggie Bowl', 'Grilled vegetables with tofu, black beans, kimchi, avocado, and gochujang dressing', 'bowl', 'modern', 'vegetable', 'grilled', 20, 2, '{"vegetarian": true, "vegan": true, "gluten_free": true}'::jsonb, ARRAY['soy', 'sesame'], ARRAY['vegan', 'healthy', 'colorful'], 82),

-- QUESADILLAS (3)
('KMX_KIMCHI_QUESADILLA', 'kimchi-quesadilla', 'Kimchi Quesadilla', 'Crispy flour tortilla filled with melted cheese, kimchi, and gochujang aioli', 'quesadilla', 'iconic', 'vegetable', 'griddled', 15, 3, '{"vegetarian": true, "gluten_free": false}'::jsonb, ARRAY['gluten', 'dairy', 'soy', 'egg'], ARRAY['signature', 'cheesy', 'crispy'], 92),
('KMX_BULGOGI_QUESADILLA', 'bulgogi-quesadilla', 'Bulgogi Quesadilla', 'Flour tortilla stuffed with bulgogi beef, Oaxaca cheese, and caramelized onions', 'quesadilla', 'classic', 'beef', 'griddled', 20, 2, '{"gluten_free": false}'::jsonb, ARRAY['gluten', 'dairy', 'soy', 'sesame'], ARRAY['cheesy', 'hearty', 'popular'], 90),
('KMX_SPICY_CHICKEN_QUESADILLA', 'spicy-chicken-quesadilla', 'Spicy Korean Chicken Quesadilla', 'Gochujang chicken with pepper jack cheese, corn, and jalapeños', 'quesadilla', 'classic', 'chicken', 'griddled', 20, 4, '{"gluten_free": false}'::jsonb, ARRAY['gluten', 'dairy', 'soy'], ARRAY['spicy', 'crispy', 'lunch'], 88),

-- APPETIZERS (3)
('KMX_KOREAN_NACHOS', 'korean-nachos', 'Korean BBQ Nachos', 'Wonton chips topped with bulgogi, kimchi, gochujang queso, and pickled jalapeños', 'appetizer', 'iconic', 'beef', 'baked', 25, 3, '{"gluten_free": false}'::jsonb, ARRAY['gluten', 'dairy', 'soy', 'sesame'], ARRAY['shareable', 'party', 'popular'], 94),
('KMX_KIMCHI_FRIES', 'kimchi-fries', 'Kimchi Fries', 'Crispy fries loaded with spicy pork, kimchi, cheese sauce, and gochujang mayo', 'appetizer', 'iconic', 'pork', 'deep_fried', 20, 3, '{"gluten_free": false}'::jsonb, ARRAY['dairy', 'soy', 'egg'], ARRAY['loaded', 'indulgent', 'street-food'], 96),
('KMX_KOREAN_ELOTE', 'korean-elote', 'Korean Street Corn', 'Grilled corn with gochujang butter, cotija cheese, and toasted sesame', 'appetizer', 'modern', 'vegetable', 'grilled', 15, 2, '{"vegetarian": true, "gluten_free": true}'::jsonb, ARRAY['dairy', 'sesame'], ARRAY['elote', 'street-food', 'summer'], 88),

-- SIDES (3)
('KMX_KIMCHI_RICE', 'kimchi-fried-rice-mex', 'Mexican Kimchi Fried Rice', 'Kimchi fried rice with chorizo, jalapeños, and a fried egg', 'side', 'classic', 'pork', 'stir_fried', 20, 3, '{"gluten_free": true}'::jsonb, ARRAY['soy', 'egg', 'sesame'], ARRAY['rice', 'spicy', 'comfort'], 90),
('KMX_FUSION_SLAW', 'korean-mex-slaw', 'Korean-Mex Slaw', 'Crunchy cabbage slaw with gochujang-lime dressing and cilantro', 'side', 'classic', 'vegetable', 'raw', 10, 2, '{"vegetarian": true, "vegan": true, "gluten_free": true}'::jsonb, ARRAY['sesame'], ARRAY['fresh', 'crunchy', 'healthy'], 85),
('KMX_KOREAN_GUACAMOLE', 'korean-guacamole', 'Korean Guacamole', 'Creamy guacamole with kimchi, gochugaru, and sesame seeds', 'side', 'modern', 'vegetable', 'raw', 10, 3, '{"vegetarian": true, "vegan": true, "gluten_free": true}'::jsonb, ARRAY['sesame'], ARRAY['dip', 'avocado', 'creative'], 86);

-- Success message
SELECT 'Inserted 21 Korean-Mexican dishes' AS status;
