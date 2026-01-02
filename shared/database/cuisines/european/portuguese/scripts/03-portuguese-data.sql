-- ============================================
-- PORTUGUESE CUISINE - Data Import
-- GUDBRO Database Standards v1.7
-- Total: 39 dishes
-- ============================================

-- ============================================
-- BACALHAU (8 dishes)
-- ============================================

INSERT INTO portuguese (id, slug, name, local_name, description, category, region, status, protein_type, cooking_method, prep_time_min, spice_level, price_default, dietary, allergens, intolerances, ingredient_ids, tags, popularity)
VALUES
('POR_BACALHAU_BRAS', 'bacalhau-a-bras', 'Bacalhau à Brás', 'Bacalhau à Brás', 'Shredded salt cod with thin-cut fried potatoes, scrambled eggs, onions, and black olives. A Lisbon classic.', 'bacalhau', 'lisbon', 'signature', 'fish', 'sautéed', 45, 0, 16.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish', 'eggs'], ARRAY[]::TEXT[], ARRAY['ING_SALT_COD', 'ING_POTATO', 'ING_EGG', 'ING_ONION', 'ING_BLACK_OLIVE', 'ING_OLIVE_OIL', 'ING_GARLIC', 'ING_PARSLEY'], ARRAY['iconic', 'lisbon', 'comfort-food', 'eggs'], 95),

('POR_BACALHAU_GOMES_SA', 'bacalhau-a-gomes-de-sa', 'Bacalhau à Gomes de Sá', 'Bacalhau à Gomes de Sá', 'Oven-baked salt cod with sliced potatoes, onions, hard-boiled eggs, olives and olive oil. Porto specialty.', 'bacalhau', 'porto', 'signature', 'fish', 'baked', 60, 0, 17.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish', 'eggs'], ARRAY[]::TEXT[], ARRAY['ING_SALT_COD', 'ING_POTATO', 'ING_EGG', 'ING_ONION', 'ING_BLACK_OLIVE', 'ING_OLIVE_OIL', 'ING_GARLIC', 'ING_PARSLEY', 'ING_BAY_LEAF'], ARRAY['iconic', 'porto', 'oven-baked'], 90),

('POR_BACALHAU_NATAS', 'bacalhau-com-natas', 'Bacalhau com Natas', 'Bacalhau com Natas', 'Creamy baked salt cod with potatoes in a rich béchamel sauce, topped with cheese. Pure comfort food.', 'bacalhau', 'pan_portuguese', 'popular', 'fish', 'baked', 50, 0, 16.50, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish', 'milk', 'gluten'], ARRAY['lactose'], ARRAY['ING_SALT_COD', 'ING_POTATO', 'ING_HEAVY_CREAM', 'ING_BUTTER', 'ING_FLOUR', 'ING_MILK', 'ING_ONION', 'ING_CHEESE', 'ING_NUTMEG'], ARRAY['creamy', 'comfort-food', 'gratin'], 85),

('POR_BACALHAU_LAGAREIRO', 'bacalhau-a-lagareiro', 'Bacalhau à Lagareiro', 'Bacalhau à Lagareiro', 'Roasted salt cod generously drizzled with olive oil, served with roasted potatoes. Named after olive oil millers.', 'bacalhau', 'beira', 'traditional', 'fish', 'roasted', 55, 0, 18.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish'], ARRAY[]::TEXT[], ARRAY['ING_SALT_COD', 'ING_POTATO', 'ING_OLIVE_OIL', 'ING_GARLIC', 'ING_BAY_LEAF', 'ING_PARSLEY'], ARRAY['roasted', 'olive-oil', 'simple', 'rustic'], 82),

('POR_BACALHAU_ZE_PIPO', 'bacalhau-a-ze-do-pipo', 'Bacalhau à Zé do Pipo', 'Bacalhau à Zé do Pipo', 'Salt cod topped with creamy mayonnaise, baked until golden. Invented by restaurateur Zé do Pipo in Porto.', 'bacalhau', 'porto', 'classic', 'fish', 'baked', 45, 0, 17.50, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish', 'eggs'], ARRAY[]::TEXT[], ARRAY['ING_SALT_COD', 'ING_POTATO', 'ING_MAYONNAISE', 'ING_ONION', 'ING_OLIVE_OIL', 'ING_PARSLEY'], ARRAY['porto', 'creamy', 'signature'], 75),

('POR_BACALHAU_ESPIRITUAL', 'bacalhau-espiritual', 'Bacalhau Espiritual', 'Bacalhau Espiritual', 'Light, fluffy baked salt cod soufflé with carrots and béchamel. Heavenly texture, hence spiritual.', 'bacalhau', 'lisbon', 'classic', 'fish', 'baked', 60, 0, 16.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish', 'eggs', 'milk', 'gluten'], ARRAY['lactose'], ARRAY['ING_SALT_COD', 'ING_CARROT', 'ING_BUTTER', 'ING_FLOUR', 'ING_MILK', 'ING_EGG', 'ING_ONION', 'ING_CHEESE'], ARRAY['souffle', 'light', 'elegant'], 70),

('POR_PASTEIS_BACALHAU', 'pasteis-de-bacalhau', 'Pastéis de Bacalhau', 'Pastéis de Bacalhau', 'Crispy fried salt cod fritters made with mashed potato, egg, and parsley. Popular as appetizer or snack.', 'bacalhau', 'pan_portuguese', 'signature', 'fish', 'fried', 40, 0, 9.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish', 'eggs'], ARRAY[]::TEXT[], ARRAY['ING_SALT_COD', 'ING_POTATO', 'ING_EGG', 'ING_ONION', 'ING_PARSLEY', 'ING_VEGETABLE_OIL'], ARRAY['appetizer', 'fried', 'snack', 'petiscos'], 92),

('POR_BACALHAU_ASSADO', 'bacalhau-assado', 'Bacalhau Assado', 'Bacalhau Assado na Brasa', 'Charcoal-grilled salt cod, simply prepared with olive oil and garlic. Pure and smoky.', 'bacalhau', 'pan_portuguese', 'traditional', 'fish', 'grilled', 35, 0, 17.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish'], ARRAY[]::TEXT[], ARRAY['ING_SALT_COD', 'ING_OLIVE_OIL', 'ING_GARLIC', 'ING_POTATO', 'ING_PARSLEY'], ARRAY['grilled', 'simple', 'smoky'], 78)

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SEAFOOD (7 dishes)
-- ============================================

INSERT INTO portuguese (id, slug, name, local_name, description, category, region, status, protein_type, cooking_method, prep_time_min, spice_level, price_default, dietary, allergens, intolerances, ingredient_ids, tags, popularity)
VALUES
('POR_POLVO_LAGAREIRO', 'polvo-a-lagareiro', 'Polvo à Lagareiro', 'Polvo à Lagareiro', 'Roasted octopus drenched in olive oil, served with roasted potatoes. A coastal favorite.', 'seafood', 'algarve', 'signature', 'seafood', 'roasted', 70, 0, 22.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['molluscs'], ARRAY[]::TEXT[], ARRAY['ING_OCTOPUS', 'ING_POTATO', 'ING_OLIVE_OIL', 'ING_GARLIC', 'ING_BAY_LEAF', 'ING_PARSLEY', 'ING_SEA_SALT'], ARRAY['iconic', 'grilled', 'coastal', 'olive-oil'], 90),

('POR_SARDINHAS_ASSADAS', 'sardinhas-assadas', 'Sardinhas Assadas', 'Sardinhas Assadas', 'Charcoal-grilled sardines served with bread and salad. Icon of Santo António festival in Lisbon.', 'seafood', 'lisbon', 'signature', 'fish', 'grilled', 20, 0, 12.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['fish'], ARRAY[]::TEXT[], ARRAY['ING_SARDINE', 'ING_SEA_SALT', 'ING_OLIVE_OIL', 'ING_LEMON'], ARRAY['iconic', 'street-food', 'santo-antonio', 'summer'], 95),

('POR_ARROZ_MARISCO', 'arroz-de-marisco', 'Arroz de Marisco', 'Arroz de Marisco', 'Soupy seafood rice with shrimp, clams, mussels, and crab. Portuguese seafood extravaganza.', 'seafood', 'algarve', 'signature', 'seafood', 'stewed', 50, 1, 25.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['crustaceans', 'molluscs', 'fish'], ARRAY[]::TEXT[], ARRAY['ING_RICE', 'ING_SHRIMP', 'ING_CLAM', 'ING_MUSSEL', 'ING_CRAB', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_WHITE_WINE', 'ING_CILANTRO', 'ING_FISH_STOCK'], ARRAY['iconic', 'sharing', 'coastal', 'soupy-rice'], 92),

('POR_AMEIJOAS_BULHAO', 'ameijoas-a-bulhao-pato', 'Amêijoas à Bulhão Pato', 'Amêijoas à Bulhão Pato', 'Clams cooked with garlic, cilantro, olive oil and white wine. Named after poet Bulhão Pato.', 'seafood', 'lisbon', 'classic', 'seafood', 'sautéed', 15, 0, 14.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['molluscs'], ARRAY[]::TEXT[], ARRAY['ING_CLAM', 'ING_GARLIC', 'ING_CILANTRO', 'ING_OLIVE_OIL', 'ING_WHITE_WINE', 'ING_LEMON'], ARRAY['petiscos', 'quick', 'wine-pairing'], 88),

('POR_CATAPLANA', 'cataplana-de-marisco', 'Cataplana de Marisco', 'Cataplana', 'Mixed seafood stew cooked in a traditional copper cataplana pan. Algarve signature.', 'seafood', 'algarve', 'signature', 'seafood', 'stewed', 45, 1, 28.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['crustaceans', 'molluscs', 'fish'], ARRAY[]::TEXT[], ARRAY['ING_SHRIMP', 'ING_CLAM', 'ING_MONKFISH', 'ING_TOMATO', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_GARLIC', 'ING_WHITE_WINE', 'ING_OLIVE_OIL', 'ING_CILANTRO', 'ING_PIRI_PIRI'], ARRAY['iconic', 'algarve', 'sharing', 'traditional-cookware'], 85),

('POR_CALDEIRADA', 'caldeirada-de-peixe', 'Caldeirada de Peixe', 'Caldeirada', 'Portuguese fish stew with mixed fish, potatoes, tomatoes and onions. Coastal comfort.', 'seafood', 'pan_portuguese', 'traditional', 'fish', 'stewed', 50, 0, 18.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish'], ARRAY[]::TEXT[], ARRAY['ING_MONKFISH', 'ING_SEA_BASS', 'ING_POTATO', 'ING_TOMATO', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_PARSLEY', 'ING_BAY_LEAF'], ARRAY['fisherman-style', 'hearty', 'coastal'], 75),

('POR_ACORDA_MARISCO', 'acorda-de-marisco', 'Açorda de Marisco', 'Açorda de Marisco', 'Bread-thickened seafood soup with shrimp, cilantro, and poached eggs. Rustic Alentejo origins.', 'seafood', 'alentejo', 'traditional', 'seafood', 'stewed', 35, 0, 16.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['crustaceans', 'gluten', 'eggs'], ARRAY[]::TEXT[], ARRAY['ING_SHRIMP', 'ING_BREAD', 'ING_EGG', 'ING_GARLIC', 'ING_CILANTRO', 'ING_OLIVE_OIL', 'ING_FISH_STOCK'], ARRAY['rustic', 'bread-soup', 'alentejo'], 72)

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- MEAT (8 dishes)
-- ============================================

INSERT INTO portuguese (id, slug, name, local_name, description, category, region, status, protein_type, cooking_method, prep_time_min, spice_level, price_default, dietary, allergens, intolerances, ingredient_ids, tags, popularity)
VALUES
('POR_COZIDO', 'cozido-a-portuguesa', 'Cozido à Portuguesa', 'Cozido à Portuguesa', 'Grand Portuguese boiled dinner with multiple meats, sausages, vegetables, and rice. The national feast.', 'meat', 'pan_portuguese', 'signature', 'mixed', 'boiled', 180, 0, 22.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['pork', 'beef', 'chicken'], ARRAY[]::TEXT[], ARRAY['ING_BEEF_BRISKET', 'ING_PORK_RIBS', 'ING_CHICKEN', 'ING_CHORIZO', 'ING_BLOOD_SAUSAGE', 'ING_CABBAGE', 'ING_CARROT', 'ING_POTATO', 'ING_TURNIP', 'ING_RICE', 'ING_CHICKPEA'], ARRAY['iconic', 'feast', 'sharing', 'winter'], 88),

('POR_LEITAO', 'leitao-da-bairrada', 'Leitão da Bairrada', 'Leitão à Bairrada', 'Wood-fired roasted suckling pig with incredibly crispy skin. Bairrada regional icon.', 'meat', 'bairrada', 'signature', 'pork', 'roasted', 240, 0, 25.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['pork'], ARRAY[]::TEXT[], ARRAY['ING_SUCKLING_PIG', 'ING_GARLIC', 'ING_BAY_LEAF', 'ING_WHITE_WINE', 'ING_LARD', 'ING_PEPPER_PASTE', 'ING_SEA_SALT'], ARRAY['iconic', 'bairrada', 'crispy-skin', 'celebration'], 92),

('POR_CARNE_ALENTEJANA', 'carne-de-porco-a-alentejana', 'Carne de Porco à Alentejana', 'Carne de Porco à Alentejana', 'Cubed pork with clams in a garlic-paprika sauce. Portuguese surf and turf.', 'meat', 'alentejo', 'signature', 'mixed', 'sautéed', 45, 1, 19.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['pork', 'molluscs'], ARRAY[]::TEXT[], ARRAY['ING_PORK_LOIN', 'ING_CLAM', 'ING_GARLIC', 'ING_PAPRIKA', 'ING_WHITE_WINE', 'ING_BAY_LEAF', 'ING_OLIVE_OIL', 'ING_CILANTRO', 'ING_POTATO'], ARRAY['iconic', 'alentejo', 'surf-turf', 'unique'], 90),

('POR_FEIJOADA', 'feijoada-a-portuguesa', 'Feijoada à Portuguesa', 'Feijoada Transmontana', 'Hearty bean stew with various pork cuts and sausages. Trás-os-Montes comfort food.', 'meat', 'minho', 'traditional', 'pork', 'stewed', 120, 0, 16.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['pork'], ARRAY[]::TEXT[], ARRAY['ING_WHITE_BEAN', 'ING_PORK_BELLY', 'ING_CHORIZO', 'ING_BLOOD_SAUSAGE', 'ING_PORK_EAR', 'ING_CABBAGE', 'ING_CARROT', 'ING_ONION', 'ING_GARLIC', 'ING_BAY_LEAF'], ARRAY['hearty', 'winter', 'beans', 'rustic'], 78),

('POR_ALHEIRA', 'alheira-de-mirandela', 'Alheira de Mirandela', 'Alheira', 'Traditional bread and poultry sausage, created by Jews to appear Christian. Served fried with egg.', 'meat', 'minho', 'traditional', 'poultry', 'fried', 20, 0, 12.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'chicken', 'eggs'], ARRAY[]::TEXT[], ARRAY['ING_ALHEIRA', 'ING_EGG', 'ING_POTATO', 'ING_VEGETABLE_OIL'], ARRAY['traditional', 'mirandela', 'unique', 'historic'], 82),

('POR_CABRITO_ASSADO', 'cabrito-assado', 'Cabrito Assado', 'Cabrito Assado no Forno', 'Slow-roasted young goat with potatoes, an Easter specialty from northern Portugal.', 'meat', 'minho', 'traditional', 'goat', 'roasted', 150, 0, 24.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['ING_GOAT', 'ING_POTATO', 'ING_GARLIC', 'ING_WHITE_WINE', 'ING_OLIVE_OIL', 'ING_BAY_LEAF', 'ING_ROSEMARY'], ARRAY['easter', 'celebration', 'northern', 'rustic'], 70),

('POR_CHANFANA', 'chanfana', 'Chanfana', 'Chanfana à Moda de Miranda', 'Goat or lamb slow-cooked in red wine in a clay pot. Beira region specialty.', 'meat', 'beira', 'traditional', 'goat', 'braised', 180, 0, 20.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['ING_GOAT', 'ING_RED_WINE', 'ING_GARLIC', 'ING_BAY_LEAF', 'ING_PAPRIKA', 'ING_BLACK_PEPPER', 'ING_OLIVE_OIL'], ARRAY['beira', 'clay-pot', 'slow-cooked', 'wine-braised'], 68),

('POR_FRANGO_ASSADO', 'frango-assado-piri-piri', 'Frango Assado com Piri-Piri', 'Frango Piri-Piri', 'Flame-grilled chicken with spicy piri-piri sauce. Portuguese-African fusion now famous worldwide.', 'meat', 'algarve', 'signature', 'chicken', 'grilled', 60, 3, 14.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['chicken'], ARRAY[]::TEXT[], ARRAY['ING_CHICKEN', 'ING_PIRI_PIRI', 'ING_GARLIC', 'ING_LEMON', 'ING_OLIVE_OIL', 'ING_PAPRIKA', 'ING_BAY_LEAF'], ARRAY['iconic', 'spicy', 'grilled', 'nandos'], 94)

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SOUPS (4 dishes)
-- ============================================

INSERT INTO portuguese (id, slug, name, local_name, description, category, region, status, protein_type, cooking_method, prep_time_min, spice_level, price_default, dietary, allergens, intolerances, ingredient_ids, tags, popularity)
VALUES
('POR_CALDO_VERDE', 'caldo-verde', 'Caldo Verde', 'Caldo Verde', 'Portugal national soup: creamy potato soup with thinly sliced collard greens and chorizo.', 'soup', 'minho', 'signature', 'pork', 'boiled', 40, 0, 8.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['pork'], ARRAY[]::TEXT[], ARRAY['ING_POTATO', 'ING_COLLARD_GREENS', 'ING_CHORIZO', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_SEA_SALT'], ARRAY['iconic', 'national', 'comfort-food', 'minho'], 96),

('POR_SOPA_PEDRA', 'sopa-da-pedra', 'Sopa da Pedra', 'Sopa da Pedra', 'Rich bean soup with various meats and vegetables. Legend says a stone is the secret ingredient.', 'soup', 'beira', 'traditional', 'mixed', 'stewed', 120, 0, 9.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['pork', 'beef'], ARRAY[]::TEXT[], ARRAY['ING_RED_BEAN', 'ING_PORK_EAR', 'ING_CHORIZO', 'ING_BLOOD_SAUSAGE', 'ING_CABBAGE', 'ING_POTATO', 'ING_CARROT', 'ING_ONION', 'ING_GARLIC', 'ING_BAY_LEAF', 'ING_CILANTRO'], ARRAY['legendary', 'hearty', 'almeirim', 'beans'], 75),

('POR_ACORDA_ALENTEJANA', 'acorda-alentejana', 'Açorda Alentejana', 'Açorda à Alentejana', 'Rustic bread soup with garlic, cilantro, olive oil and poached eggs. Peasant comfort food.', 'soup', 'alentejo', 'traditional', 'eggs', 'boiled', 25, 0, 10.00, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['gluten', 'eggs'], ARRAY[]::TEXT[], ARRAY['ING_BREAD', 'ING_EGG', 'ING_GARLIC', 'ING_CILANTRO', 'ING_OLIVE_OIL', 'ING_SEA_SALT', 'ING_WATER'], ARRAY['alentejo', 'rustic', 'bread-soup', 'peasant-food'], 72),

('POR_CANJA', 'canja-de-galinha', 'Canja de Galinha', 'Canja', 'Portuguese chicken and rice soup. Traditional remedy for colds and comfort food.', 'soup', 'pan_portuguese', 'classic', 'chicken', 'boiled', 60, 0, 7.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['chicken'], ARRAY[]::TEXT[], ARRAY['ING_CHICKEN', 'ING_RICE', 'ING_CARROT', 'ING_ONION', 'ING_CELERY', 'ING_MINT', 'ING_SEA_SALT'], ARRAY['comfort-food', 'healing', 'simple', 'home-cooking'], 80)

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SANDWICHES (4 dishes)
-- ============================================

INSERT INTO portuguese (id, slug, name, local_name, description, category, region, status, protein_type, cooking_method, prep_time_min, spice_level, price_default, dietary, allergens, intolerances, ingredient_ids, tags, popularity)
VALUES
('POR_FRANCESINHA', 'francesinha', 'Francesinha', 'Francesinha', 'Porto massive sandwich: ham, sausage, steak between bread, covered in melted cheese and spicy tomato-beer sauce.', 'sandwich', 'porto', 'signature', 'mixed', 'baked', 40, 2, 14.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'milk', 'pork', 'beef', 'eggs'], ARRAY['lactose'], ARRAY['ING_BREAD', 'ING_HAM', 'ING_LINGUICA', 'ING_BEEF_STEAK', 'ING_CHEESE', 'ING_TOMATO', 'ING_BEER', 'ING_BUTTER', 'ING_PIRI_PIRI', 'ING_EGG'], ARRAY['iconic', 'porto', 'indulgent', 'hangover-cure'], 95),

('POR_BIFANA', 'bifana', 'Bifana', 'Bifana', 'Thin marinated pork cutlet in a crusty bread roll. Portugal street food at its best.', 'sandwich', 'pan_portuguese', 'signature', 'pork', 'sautéed', 20, 1, 5.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'pork'], ARRAY[]::TEXT[], ARRAY['ING_PORK_LOIN', 'ING_BREAD', 'ING_GARLIC', 'ING_WHITE_WINE', 'ING_PAPRIKA', 'ING_BAY_LEAF', 'ING_MUSTARD'], ARRAY['iconic', 'street-food', 'quick', 'casual'], 94),

('POR_PREGO', 'prego-no-pao', 'Prego no Pão', 'Prego', 'Thin beef steak sandwich with garlic butter in a crusty roll. Simple Portuguese perfection.', 'sandwich', 'pan_portuguese', 'classic', 'beef', 'grilled', 15, 0, 6.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['gluten', 'beef', 'milk'], ARRAY['lactose'], ARRAY['ING_BEEF_STEAK', 'ING_BREAD', 'ING_BUTTER', 'ING_GARLIC', 'ING_SEA_SALT', 'ING_BLACK_PEPPER'], ARRAY['classic', 'quick', 'casual', 'tasca'], 88),

('POR_SANDE_LEITAO', 'sande-de-leitao', 'Sandes de Leitão', 'Sandes de Leitão', 'Sliced roast suckling pig in a crusty roll. Bairrada roadside specialty.', 'sandwich', 'bairrada', 'traditional', 'pork', 'roasted', 10, 0, 7.00, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'pork'], ARRAY[]::TEXT[], ARRAY['ING_SUCKLING_PIG', 'ING_BREAD', 'ING_MUSTARD'], ARRAY['bairrada', 'roadside', 'crispy'], 80)

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- DESSERTS (8 dishes)
-- ============================================

INSERT INTO portuguese (id, slug, name, local_name, description, category, region, status, protein_type, cooking_method, prep_time_min, spice_level, price_default, dietary, allergens, intolerances, ingredient_ids, tags, popularity)
VALUES
('POR_PASTEL_NATA', 'pastel-de-nata', 'Pastel de Nata', 'Pastel de Nata', 'Iconic Portuguese egg custard tart with flaky pastry and caramelized top. Created by Jerónimos monks.', 'dessert', 'lisbon', 'signature', NULL, 'baked', 60, 0, 2.50, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['gluten', 'eggs', 'milk'], ARRAY['lactose'], ARRAY['ING_PUFF_PASTRY', 'ING_EGG_YOLK', 'ING_SUGAR', 'ING_MILK', 'ING_CREAM', 'ING_VANILLA', 'ING_CINNAMON', 'ING_FLOUR'], ARRAY['iconic', 'worldwide-famous', 'pastry', 'belem'], 100),

('POR_PAO_LO', 'pao-de-lo', 'Pão de Ló', 'Pão de Ló de Ovar', 'Light, fluffy Portuguese sponge cake with a moist center. Traditional conventual sweet.', 'dessert', 'beira', 'traditional', NULL, 'baked', 45, 0, 8.00, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['gluten', 'eggs'], ARRAY[]::TEXT[], ARRAY['ING_EGG', 'ING_SUGAR', 'ING_FLOUR'], ARRAY['conventual', 'sponge-cake', 'ovar'], 78),

('POR_ARROZ_DOCE', 'arroz-doce', 'Arroz Doce', 'Arroz Doce', 'Creamy Portuguese rice pudding topped with cinnamon patterns. Christmas and celebration staple.', 'dessert', 'pan_portuguese', 'classic', NULL, 'boiled', 40, 0, 5.00, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['milk', 'eggs'], ARRAY['lactose'], ARRAY['ING_RICE', 'ING_MILK', 'ING_SUGAR', 'ING_EGG_YOLK', 'ING_LEMON_ZEST', 'ING_CINNAMON', 'ING_BUTTER'], ARRAY['christmas', 'celebration', 'comfort', 'home-cooking'], 85),

('POR_QUEIJADAS_SINTRA', 'queijadas-de-sintra', 'Queijadas de Sintra', 'Queijadas de Sintra', 'Small cheese and egg tarts from Sintra. Delicate, creamy, and centuries old.', 'dessert', 'lisbon', 'traditional', NULL, 'baked', 40, 0, 3.00, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['gluten', 'eggs', 'milk'], ARRAY['lactose'], ARRAY['ING_FRESH_CHEESE', 'ING_EGG_YOLK', 'ING_SUGAR', 'ING_FLOUR', 'ING_CINNAMON'], ARRAY['sintra', 'cheese-tart', 'historic'], 75),

('POR_TRAVESSEIROS', 'travesseiros-de-sintra', 'Travesseiros de Sintra', 'Travesseiros', 'Pillow-shaped puff pastries filled with almond cream. Another Sintra treasure.', 'dessert', 'lisbon', 'traditional', NULL, 'baked', 50, 0, 3.50, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": false, "is_halal": true, "is_kosher": false}', ARRAY['gluten', 'eggs', 'milk', 'nuts'], ARRAY['lactose'], ARRAY['ING_PUFF_PASTRY', 'ING_ALMOND', 'ING_EGG_YOLK', 'ING_SUGAR', 'ING_BUTTER'], ARRAY['sintra', 'almond', 'puff-pastry'], 72),

('POR_BOLO_REI', 'bolo-rei', 'Bolo Rei', 'Bolo Rei', 'Portuguese King Cake with candied fruits and nuts. Traditional Christmas bread.', 'dessert', 'pan_portuguese', 'traditional', NULL, 'baked', 180, 0, 15.00, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": false, "is_halal": true, "is_kosher": false}', ARRAY['gluten', 'eggs', 'milk', 'nuts'], ARRAY['lactose'], ARRAY['ING_FLOUR', 'ING_YEAST', 'ING_SUGAR', 'ING_EGG', 'ING_BUTTER', 'ING_CANDIED_FRUIT', 'ING_PINE_NUT', 'ING_WALNUT', 'ING_PORT_WINE'], ARRAY['christmas', 'king-cake', 'festive'], 80),

('POR_OVOS_MOLES', 'ovos-moles', 'Ovos Moles de Aveiro', 'Ovos Moles', 'Egg yolk and sugar delicacy in thin wafer shells, shaped as seashells. Aveiro specialty.', 'dessert', 'beira', 'traditional', NULL, 'raw', 60, 0, 6.00, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['eggs', 'gluten'], ARRAY[]::TEXT[], ARRAY['ING_EGG_YOLK', 'ING_SUGAR', 'ING_WAFER'], ARRAY['aveiro', 'conventual', 'protected-origin', 'unique'], 76),

('POR_SERRADURA', 'serradura', 'Serradura', 'Serradura', 'Macau-Portuguese frozen dessert of whipped cream and crushed Marie biscuits. Sawdust pudding.', 'dessert', 'madeira', 'popular', NULL, 'raw', 20, 0, 5.00, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['gluten', 'milk'], ARRAY['lactose'], ARRAY['ING_HEAVY_CREAM', 'ING_CONDENSED_MILK', 'ING_MARIE_BISCUIT'], ARRAY['macau', 'no-bake', 'easy', 'frozen'], 70)

ON CONFLICT (id) DO NOTHING;

-- Verify import
SELECT category, COUNT(*) as count FROM portuguese GROUP BY category ORDER BY count DESC;
