-- ============================================
-- ETHIOPIAN CUISINE - Product Data
-- GUDBRO Database Standards v1.3
-- ============================================
-- Total: 45 products across 7 categories
-- Categories: stew (12), raw (4), tibs (8), vegetarian (10), bread (3), salad (4), beverage (4)

INSERT INTO ethiopian (id, slug, name, description, category, price_default, prep_time_min, spice_level, is_traditional, allergens, intolerances, dietary, tags) VALUES

-- ============================================
-- STEWS (Wat/Wot) - 12 dishes
-- ============================================
('ETH_DORO_WAT', 'doro-wat', 'Doro Wat', 'Ethiopia''s national dish: spicy chicken stew with berbere, hard-boiled eggs, and niter kibbeh, served with injera', 'stew', 18.00, 90, 4, true, '[{"type": "egg"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['national_dish', 'signature', 'spicy']),

('ETH_SIGA_WAT', 'siga-wat', 'Siga Wat', 'Spicy beef stew slow-cooked with berbere, onions, and niter kibbeh', 'stew', 16.00, 75, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['beef', 'spicy', 'traditional']),

('ETH_KEY_WAT', 'key-wat', 'Key Wat', 'Traditional red stew with beef or lamb, cooked in berbere and spiced butter', 'stew', 16.00, 70, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['red_stew', 'spicy']),

('ETH_ALICHA_WAT', 'alicha-wat', 'Alicha Wat', 'Mild yellow chicken or beef stew with turmeric, no berbere, ginger and garlic', 'stew', 15.00, 60, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['mild', 'yellow_stew']),

('ETH_YE_BURE_WAT', 'ye-bure-wat', 'Ye Bure Wat', 'Rich lamb stew cooked with berbere and caramelized onions', 'stew', 17.00, 80, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['lamb', 'spicy']),

('ETH_DORO_ALICHA', 'doro-alicha', 'Doro Alicha', 'Mild yellow chicken stew with turmeric, ginger, and niter kibbeh', 'stew', 16.00, 75, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['chicken', 'mild']),

('ETH_YEBEG_WAT', 'yebeg-wat', 'Yebeg Wat', 'Spicy lamb stew with berbere, slow-cooked until tender', 'stew', 18.00, 90, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['lamb', 'spicy', 'slow_cooked']),

('ETH_KILWA', 'kilwa', 'Kilwa', 'Liver and tripe stew with berbere and traditional spices', 'stew', 14.00, 45, 3, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['offal', 'organ_meat']),

('ETH_SIGA_ALICHA', 'siga-alicha', 'Siga Alicha', 'Mild beef stew with turmeric, onions, and garlic, no berbere', 'stew', 15.00, 60, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['beef', 'mild', 'yellow_stew']),

('ETH_YATAKILT_ALICHA', 'yatakilt-alicha', 'Yatakilt Alicha', 'Mild vegetable stew with cabbage, carrots, and potatoes', 'stew', 12.00, 40, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'mild', 'vegetables']),

('ETH_DULET', 'dulet', 'Dulet', 'Spiced minced liver, tripe, and beef with mitmita and niter kibbeh', 'stew', 15.00, 30, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['offal', 'spicy']),

('ETH_ZILZIL_WAT', 'zilzil-wat', 'Zilzil Wat', 'Strips of beef in a spicy berbere sauce', 'stew', 16.00, 45, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['beef', 'spicy']),

-- ============================================
-- RAW MEAT DISHES - 4 dishes
-- ============================================
('ETH_KITFO', 'kitfo', 'Kitfo', 'Ethiopian steak tartare: minced raw beef seasoned with mitmita and niter kibbeh, served with ayib and gomen', 'raw', 18.00, 15, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['signature', 'raw', 'beef']),

('ETH_GORED_GORED', 'gored-gored', 'Gored Gored', 'Cubed raw beef tossed in spiced butter with awaze sauce', 'raw', 17.00, 15, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['raw', 'beef', 'spicy']),

('ETH_KITFO_LABLABI', 'kitfo-lablabi', 'Kitfo Lablabi', 'Kitfo served lightly warmed but still rare', 'raw', 18.00, 20, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['rare', 'beef']),

('ETH_KURT', 'kurt', 'Kurt', 'Very raw beef chunks served plain with spices on the side', 'raw', 16.00, 10, 2, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['raw', 'traditional']),

-- ============================================
-- TIBS (Sautéed/Fried) - 8 dishes
-- ============================================
('ETH_DEREK_TIBS', 'derek-tibs', 'Derek Tibs', 'Dry-fried cubed beef with onions, jalapeños, and rosemary, served sizzling', 'tibs', 17.00, 30, 3, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['signature', 'sizzling', 'beef']),

('ETH_AWAZE_TIBS', 'awaze-tibs', 'Awaze Tibs', 'Beef tibs sautéed in awaze (berbere and honey wine sauce)', 'tibs', 17.00, 35, 4, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['spicy', 'beef']),

('ETH_LAMB_TIBS', 'lamb-tibs', 'Lamb Tibs', 'Sautéed lamb cubes with peppers, onions, and Ethiopian spices', 'tibs', 18.00, 35, 3, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['lamb', 'sauteed']),

('ETH_DORO_TIBS', 'doro-tibs', 'Doro Tibs', 'Sautéed chicken with onions, garlic, and mild spices', 'tibs', 15.00, 30, 2, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['chicken', 'mild']),

('ETH_SHEKLA_TIBS', 'shekla-tibs', 'Shekla Tibs', 'Tibs served in a sizzling clay pot (shekla) with vegetables', 'tibs', 18.00, 35, 3, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['presentation', 'sizzling']),

('ETH_GODEN_TIBS', 'goden-tibs', 'Goden Tibs', 'Tender beef ribs sautéed with spices and served bone-in', 'tibs', 19.00, 40, 3, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['ribs', 'beef']),

('ETH_GOAT_TIBS', 'goat-tibs', 'Goat Tibs', 'Sautéed goat meat with traditional Ethiopian spices', 'tibs', 18.00, 40, 3, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['goat', 'traditional']),

('ETH_QUANTA_FIR_FIR', 'quanta-fir-fir', 'Quanta Fir Fir', 'Dried beef jerky (quanta) sautéed with injera pieces and berbere', 'tibs', 14.00, 25, 3, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['dried_beef', 'fir_fir']),

-- ============================================
-- VEGETARIAN/FASTING DISHES - 10 dishes
-- ============================================
('ETH_SHIRO', 'shiro', 'Shiro', 'Chickpea flour stew with berbere and niter kibbeh, Ethiopia''s most popular vegetarian dish', 'vegetarian', 11.00, 30, 2, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'fasting', 'signature']),

('ETH_MISIR_WAT', 'misir-wat', 'Misir Wat', 'Spicy red lentil stew with berbere, onions, and garlic', 'vegetarian', 11.00, 40, 3, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'lentils', 'spicy']),

('ETH_GOMEN', 'gomen', 'Gomen', 'Ethiopian collard greens sautéed with garlic, ginger, and spices', 'vegetarian', 10.00, 25, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'greens', 'healthy']),

('ETH_KOLO', 'kolo', 'Kolo', 'Roasted barley and chickpea snack with spices', 'vegetarian', 6.00, 15, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['snack', 'crunchy']),

('ETH_ATKILT', 'atkilt', 'Atkilt', 'Cabbage, carrot, and potato stew with turmeric and mild spices', 'vegetarian', 10.00, 35, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'mild', 'vegetables']),

('ETH_TIKIL_GOMEN', 'tikil-gomen', 'Tikil Gomen', 'Cabbage and carrots cooked with turmeric and ginger', 'vegetarian', 10.00, 30, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegan', 'cabbage']),

('ETH_AZIFA', 'azifa', 'Azifa', 'Green lentil salad with mustard, lime, and jalapeño', 'vegetarian', 9.00, 20, 2, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['cold', 'lentils', 'salad']),

('ETH_BEYAYNETU', 'beyaynetu', 'Beyaynetu', 'Traditional fasting platter with various vegetarian dishes on injera', 'vegetarian', 16.00, 45, 2, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['combo', 'fasting', 'signature']),

('ETH_DINICH_WAT', 'dinich-wat', 'Dinich Wat', 'Spicy potato stew with berbere and onions', 'vegetarian', 10.00, 35, 3, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['potato', 'spicy']),

('ETH_BUTICHA', 'buticha', 'Buticha', 'Spiced chickpea spread similar to hummus, with lemon and oil', 'vegetarian', 8.00, 15, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['dip', 'chickpea']),

-- ============================================
-- BREADS - 3 dishes
-- ============================================
('ETH_INJERA', 'injera', 'Injera', 'Traditional sourdough flatbread made from teff flour, spongy and tangy', 'bread', 4.00, 5, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['staple', 'gluten_free', 'signature']),

('ETH_KOCHO', 'kocho', 'Kocho', 'Fermented flatbread made from false banana (enset) plant', 'bread', 5.00, 10, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['traditional', 'southern_ethiopia']),

('ETH_AMBASHA', 'ambasha', 'Ambasha', 'Lightly sweet Ethiopian celebration bread', 'bread', 6.00, 60, 0, true, '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['sweet', 'celebration']),

-- ============================================
-- SALADS - 4 dishes
-- ============================================
('ETH_ETHIOPIAN_SALAD', 'ethiopian-salad', 'Ethiopian Salad', 'Fresh tomatoes, onions, and jalapeños with lemon dressing', 'salad', 8.00, 10, 2, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['fresh', 'vegan']),

('ETH_AYIB', 'ayib', 'Ayib', 'Fresh Ethiopian cottage cheese, served plain or with gomen', 'salad', 7.00, 5, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['cheese', 'fresh']),

('ETH_FIT_FIT', 'fit-fit', 'Fit Fit', 'Shredded injera mixed with berbere butter and spices', 'salad', 9.00, 15, 2, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['breakfast', 'injera']),

('ETH_KATEGNA', 'kategna', 'Kategna', 'Toasted injera brushed with berbere-infused butter', 'salad', 7.00, 10, 2, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['appetizer', 'crispy']),

-- ============================================
-- BEVERAGES - 4 dishes
-- ============================================
('ETH_TEJ', 'tej', 'Tej', 'Traditional Ethiopian honey wine with gesho hops', 'beverage', 8.00, 5, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['alcohol', 'traditional', 'honey']),

('ETH_TELLA', 'tella', 'Tella', 'Traditional Ethiopian beer made from teff and barley', 'beverage', 6.00, 5, 0, true, '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['alcohol', 'beer', 'traditional']),

('ETH_BUNA', 'buna', 'Buna', 'Ethiopian coffee ceremony with traditional roasting and brewing', 'beverage', 5.00, 45, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['coffee', 'ceremony', 'signature']),

('ETH_ATMIT', 'atmit', 'Atmit', 'Warm oat and barley porridge drink, lightly spiced with cardamom', 'beverage', 4.00, 15, 0, true, '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['warm', 'porridge', 'healthy'])

ON CONFLICT (id) DO NOTHING;
