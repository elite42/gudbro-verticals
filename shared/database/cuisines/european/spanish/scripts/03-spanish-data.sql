-- ============================================
-- SPANISH CUISINE - Product Data
-- GUDBRO Database Standards v1.3
-- ============================================
-- Total: 55 products across 9 categories
-- Categories: tapas (16), rice (8), seafood (8), meat (6), soup (5), egg (4), cured (3), dessert (5), sandwich (0 - placeholder)
-- NOTE: Some dishes already exist in other tables (paella in seafood, gazpacho in soups, churros in desserts, croquetas in fried)

INSERT INTO spanish (id, slug, name, description, category, region, price_default, prep_time_min, spice_level, is_traditional, allergens, intolerances, dietary, tags) VALUES

-- ============================================
-- TAPAS - 16 dishes
-- ============================================
('SPA_PATATAS_BRAVAS', 'patatas-bravas', 'Patatas Bravas', 'Crispy fried potatoes with spicy tomato sauce and aioli, Madrid''s iconic tapa', 'tapas', 'Madrid', 7.00, 25, 2, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['signature', 'vegetarian', 'spicy']),

('SPA_GAMBAS_AJILLO', 'gambas-al-ajillo', 'Gambas al Ajillo', 'Sizzling garlic shrimp cooked in olive oil with chili and parsley', 'tapas', NULL, 14.00, 15, 2, true, '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['signature', 'seafood', 'garlic']),

('SPA_PIMIENTOS_PADRON', 'pimientos-de-padron', 'Pimientos de Padrón', 'Blistered Galician peppers with sea salt - some are hot, some are not', 'tapas', 'Galicia', 8.00, 10, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'simple', 'traditional']),

('SPA_ALBONDIGAS', 'albondigas', 'Albóndigas', 'Spanish meatballs in rich tomato sauce with herbs', 'tapas', NULL, 10.00, 40, 1, true, '[{"type": "gluten"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['comfort_food', 'tomato']),

('SPA_BOQUERONES', 'boquerones-en-vinagre', 'Boquerones en Vinagre', 'White anchovies marinated in vinegar and garlic, served with olive oil', 'tapas', 'Andalusia', 9.00, 10, 0, true, '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['cold', 'pickled', 'seafood']),

('SPA_JAMON_CROQUETAS', 'croquetas-de-jamon', 'Croquetas de Jamón', 'Creamy béchamel croquettes with Serrano ham, crispy outside', 'tapas', NULL, 9.00, 45, 0, true, '[{"type": "gluten"}, {"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['fried', 'comfort_food']),

('SPA_CALAMARES_FRITOS', 'calamares-a-la-romana', 'Calamares a la Romana', 'Crispy fried squid rings with lemon and aioli', 'tapas', NULL, 12.00, 20, 0, true, '[{"type": "gluten"}, {"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['fried', 'seafood']),

('SPA_PULPO_GALLEGO', 'pulpo-a-la-gallega', 'Pulpo a la Gallega', 'Galician-style octopus with paprika, olive oil and sea salt on potatoes', 'tapas', 'Galicia', 18.00, 60, 1, true, '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['signature', 'galician', 'premium']),

('SPA_PAN_TOMATE', 'pan-con-tomate', 'Pan con Tomate', 'Catalan tomato bread with garlic and olive oil', 'tapas', 'Catalonia', 5.00, 5, 0, true, '[{"type": "gluten"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'simple', 'catalan']),

('SPA_ACEITUNAS', 'aceitunas-aliñadas', 'Aceitunas Aliñadas', 'Marinated olives with herbs, garlic and citrus', 'tapas', NULL, 5.00, 5, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'cold', 'aperitivo']),

('SPA_PIQUILLOS_RELLENOS', 'piquillos-rellenos', 'Piquillos Rellenos', 'Piquillo peppers stuffed with cod brandade or meat', 'tapas', 'Navarra', 12.00, 35, 0, true, '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['stuffed', 'navarra']),

('SPA_CHOPITOS', 'chopitos', 'Chopitos', 'Crispy fried baby squid, dusted with flour and sea salt', 'tapas', 'Andalusia', 11.00, 15, 0, true, '[{"type": "gluten"}, {"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['fried', 'seafood', 'andalusian']),

('SPA_MANCHEGO', 'manchego-con-membrillo', 'Manchego con Membrillo', 'Aged Manchego cheese with quince paste', 'tapas', 'Castile', 12.00, 5, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['cheese', 'sweet_savory']),

('SPA_ESCALIVADA', 'escalivada', 'Escalivada', 'Catalan roasted vegetables - eggplant, peppers, onions with olive oil', 'tapas', 'Catalonia', 9.00, 45, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'roasted', 'catalan']),

('SPA_BANDERILLAS', 'banderillas', 'Banderillas', 'Pickled vegetables on skewers - olives, peppers, onions, anchovies', 'tapas', 'Basque Country', 6.00, 5, 0, true, '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['pickled', 'cold', 'basque']),

('SPA_CHAMPIÑONES', 'champinones-al-ajillo', 'Champiñones al Ajillo', 'Garlic mushrooms sautéed in olive oil with parsley and sherry', 'tapas', NULL, 8.00, 15, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'garlic', 'simple']),

-- ============================================
-- RICE DISHES (Arroces) - 8 dishes
-- ============================================
('SPA_PAELLA_VALENCIANA', 'paella-valenciana', 'Paella Valenciana', 'Authentic Valencia paella with rabbit, chicken, green beans and snails', 'rice', 'Valencia', 22.00, 60, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['signature', 'valencian', 'traditional']),

('SPA_PAELLA_MIXTA', 'paella-mixta', 'Paella Mixta', 'Mixed paella with chicken, seafood and vegetables', 'rice', 'Valencia', 20.00, 55, 0, true, '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['popular', 'mixed']),

('SPA_ARROZ_NEGRO', 'arroz-negro', 'Arroz Negro', 'Black rice cooked with squid ink, seafood and aioli', 'rice', 'Valencia', 18.00, 50, 0, true, '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['squid_ink', 'dramatic']),

('SPA_ARROZ_BANDA', 'arroz-a-banda', 'Arroz a Banda', 'Rice cooked in fish stock, served with alioli', 'rice', 'Valencia', 16.00, 45, 0, true, '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['fish_stock', 'traditional']),

('SPA_FIDEUA', 'fideua', 'Fideuà', 'Catalan-Valencian noodle paella with seafood and romesco', 'rice', 'Catalonia', 18.00, 50, 0, true, '[{"type": "gluten"}, {"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['noodles', 'seafood']),

('SPA_ARROZ_CALDOSO', 'arroz-caldoso', 'Arroz Caldoso', 'Soupy rice with lobster or seafood', 'rice', NULL, 24.00, 55, 0, true, '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['soupy', 'premium']),

('SPA_ARROZ_HORNO', 'arroz-al-horno', 'Arroz al Horno', 'Oven-baked rice with chickpeas, morcilla and pork ribs', 'rice', 'Valencia', 16.00, 60, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['baked', 'hearty']),

('SPA_ARROZ_VERDURAS', 'arroz-con-verduras', 'Arroz con Verduras', 'Vegetable paella with artichokes, peppers and beans', 'rice', 'Valencia', 14.00, 45, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'vegetable']),

-- ============================================
-- SEAFOOD (Mariscos) - 8 dishes
-- ============================================
('SPA_BACALAO_PILPIL', 'bacalao-al-pil-pil', 'Bacalao al Pil Pil', 'Salt cod in emulsified garlic and olive oil sauce, Basque classic', 'seafood', 'Basque Country', 22.00, 40, 0, true, '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['signature', 'basque', 'cod']),

('SPA_BACALAO_VIZCAINA', 'bacalao-a-la-vizcaina', 'Bacalao a la Vizcaína', 'Salt cod in red pepper and tomato sauce', 'seafood', 'Basque Country', 20.00, 45, 1, true, '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['basque', 'cod']),

('SPA_MERLUZA_SALSA_VERDE', 'merluza-en-salsa-verde', 'Merluza en Salsa Verde', 'Hake in green parsley and white wine sauce with clams', 'seafood', 'Basque Country', 20.00, 35, 0, true, '[{"type": "fish"}, {"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['hake', 'green_sauce']),

('SPA_ALMEJAS_MARINERA', 'almejas-a-la-marinera', 'Almejas a la Marinera', 'Clams in white wine, garlic and parsley sauce', 'seafood', 'Galicia', 16.00, 20, 0, true, '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['clams', 'white_wine']),

('SPA_VIEIRAS_GALLEGAS', 'vieiras-a-la-gallega', 'Vieiras a la Gallega', 'Galician scallops gratinated with onion, ham and breadcrumbs', 'seafood', 'Galicia', 18.00, 25, 0, true, '[{"type": "shellfish"}, {"type": "gluten"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['scallops', 'gratinated']),

('SPA_TXANGURRO', 'txangurro', 'Txangurro', 'Basque stuffed spider crab with brandy and breadcrumbs', 'seafood', 'Basque Country', 26.00, 50, 0, true, '[{"type": "shellfish"}, {"type": "gluten"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['crab', 'premium', 'basque']),

('SPA_PESCADO_FRITO', 'pescado-frito', 'Pescado Frito', 'Andalusian mixed fried fish - variety of small fish, lightly battered', 'seafood', 'Andalusia', 16.00, 25, 0, true, '[{"type": "fish"}, {"type": "gluten"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['fried', 'andalusian', 'assorted']),

('SPA_SARDINAS_BRASA', 'sardinas-a-la-brasa', 'Sardinas a la Brasa', 'Grilled sardines with sea salt and olive oil', 'seafood', 'Andalusia', 12.00, 15, 0, true, '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['grilled', 'simple', 'coastal']),

-- ============================================
-- MEAT DISHES (Carnes) - 6 dishes
-- ============================================
('SPA_COCHINILLO', 'cochinillo-asado', 'Cochinillo Asado', 'Segovia-style roast suckling pig with crispy skin', 'meat', 'Castile', 32.00, 120, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['signature', 'roast', 'premium']),

('SPA_CHULETON', 'chuleton', 'Chuletón', 'Massive bone-in ribeye steak, Basque style, grilled over charcoal', 'meat', 'Basque Country', 45.00, 25, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['steak', 'premium', 'basque']),

('SPA_RABO_TORO', 'rabo-de-toro', 'Rabo de Toro', 'Slow-braised oxtail in red wine with vegetables', 'meat', 'Andalusia', 22.00, 180, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['braised', 'wine', 'andalusian']),

('SPA_CORDERO_ASADO', 'cordero-asado', 'Cordero Asado', 'Castilian roast lamb with garlic and herbs', 'meat', 'Castile', 28.00, 90, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['roast', 'lamb', 'traditional']),

('SPA_SECRETO_IBERICO', 'secreto-iberico', 'Secreto Ibérico', 'Grilled Ibérico pork cut, marbled and flavorful', 'meat', NULL, 24.00, 20, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['iberico', 'grilled', 'premium']),

('SPA_CARRILLERA', 'carrillera-de-cerdo', 'Carrillera de Cerdo', 'Braised pork cheeks in red wine sauce', 'meat', NULL, 18.00, 150, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['braised', 'tender']),

-- ============================================
-- SOUPS & STEWS (Sopas y Guisos) - 5 dishes
-- ============================================
('SPA_COCIDO_MADRILENO', 'cocido-madrileno', 'Cocido Madrileño', 'Madrid chickpea stew with meats, served in three courses', 'soup', 'Madrid', 18.00, 180, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['signature', 'three_courses', 'hearty']),

('SPA_FABADA', 'fabada-asturiana', 'Fabada Asturiana', 'Asturian white bean stew with chorizo, morcilla and pork', 'soup', 'Asturias', 16.00, 150, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['signature', 'beans', 'asturian']),

('SPA_SOPA_CASTELLANA', 'sopa-de-ajo', 'Sopa de Ajo', 'Castilian garlic soup with bread, paprika and poached egg', 'soup', 'Castile', 9.00, 25, 1, true, '[{"type": "gluten"}, {"type": "egg"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['garlic', 'comfort_food']),

('SPA_SALMOREJO', 'salmorejo', 'Salmorejo', 'Thick cold tomato soup from Córdoba with ham and egg garnish', 'soup', 'Andalusia', 9.00, 15, 0, true, '[{"type": "gluten"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['cold', 'tomato', 'cordoban']),

('SPA_PORRUSALDA', 'porrusalda', 'Porrusalda', 'Basque leek and potato soup with cod', 'soup', 'Basque Country', 11.00, 40, 0, true, '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['leek', 'basque', 'warming']),

-- ============================================
-- EGG DISHES (Huevos) - 4 dishes
-- ============================================
('SPA_TORTILLA_ESPANOLA', 'tortilla-espanola', 'Tortilla Española', 'Classic Spanish potato omelette, creamy inside, served warm or cold', 'egg', NULL, 8.00, 35, 0, true, '[{"type": "egg"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['signature', 'classic', 'national_dish']),

('SPA_HUEVOS_ROTOS', 'huevos-rotos', 'Huevos Rotos', 'Broken eggs over fried potatoes with jamón ibérico', 'egg', 'Madrid', 12.00, 20, 0, true, '[{"type": "egg"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['comfort_food', 'madrid']),

('SPA_REVUELTO_GAMBAS', 'revuelto-de-gambas', 'Revuelto de Gambas', 'Scrambled eggs with prawns and garlic', 'egg', NULL, 14.00, 15, 0, true, '[{"type": "egg"}, {"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['seafood', 'scrambled']),

('SPA_PISTO_MANCHEGO', 'pisto-manchego', 'Pisto Manchego', 'La Mancha ratatouille with tomatoes, peppers and zucchini, topped with fried egg', 'egg', 'Castile', 10.00, 35, 0, true, '[{"type": "egg"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['vegetables', 'manchego']),

-- ============================================
-- CURED MEATS (Embutidos) - 3 dishes
-- ============================================
('SPA_JAMON_IBERICO', 'jamon-iberico', 'Jamón Ibérico', 'Premium Ibérico ham, acorn-fed, hand-carved', 'cured', NULL, 35.00, 5, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['premium', 'signature', 'dop']),

('SPA_TABLA_IBERICA', 'tabla-de-ibericos', 'Tabla de Ibéricos', 'Selection of Ibérico cured meats: jamón, lomo, chorizo, salchichón', 'cured', NULL, 28.00, 5, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['assortment', 'sharing']),

('SPA_TABLA_QUESOS', 'tabla-de-quesos', 'Tabla de Quesos', 'Spanish cheese board: Manchego, Idiazábal, Tetilla, Cabrales', 'cured', NULL, 22.00, 5, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['cheese', 'assortment']),

-- ============================================
-- DESSERTS (Postres) - 5 dishes
-- ============================================
('SPA_CREMA_CATALANA', 'crema-catalana', 'Crema Catalana', 'Catalan custard with caramelized sugar top, flavored with citrus and cinnamon', 'dessert', 'Catalonia', 8.00, 30, 0, true, '[{"type": "egg"}, {"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['signature', 'catalan', 'custard']),

('SPA_CHURROS_CHOCOLATE', 'churros-con-chocolate', 'Churros con Chocolate', 'Fried dough sticks with thick hot chocolate for dipping', 'dessert', 'Madrid', 7.00, 25, 0, true, '[{"type": "gluten"}, {"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['signature', 'fried', 'chocolate']),

('SPA_FLAN', 'flan-de-huevo', 'Flan de Huevo', 'Classic Spanish caramel custard', 'dessert', NULL, 6.00, 45, 0, true, '[{"type": "egg"}, {"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['custard', 'caramel', 'classic']),

('SPA_TARTA_SANTIAGO', 'tarta-de-santiago', 'Tarta de Santiago', 'Galician almond cake marked with St. James cross', 'dessert', 'Galicia', 7.00, 50, 0, true, '[{"type": "egg"}, {"type": "nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['galician', 'almond', 'gluten_free']),

('SPA_LECHE_FRITA', 'leche-frita', 'Leche Frita', 'Fried milk custard squares, coated in cinnamon sugar', 'dessert', 'Castile', 6.00, 40, 0, true, '[{"type": "gluten"}, {"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['fried', 'custard', 'traditional'])

ON CONFLICT (id) DO NOTHING;
