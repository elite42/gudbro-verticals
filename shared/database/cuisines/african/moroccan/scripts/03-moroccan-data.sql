-- ============================================
-- MOROCCAN Data Import
-- GUDBRO Database Standards v1.3
-- ============================================

INSERT INTO moroccan (id, slug, name, description, category, status, origin_region, ingredient_ids, calories_per_serving, protein_g, carbs_g, fat_g, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, spice_level, tags, popularity) VALUES

-- =====================
-- TAGINE (14 items)
-- =====================
('MOR_TAGINE_CHICKEN_LEMON', 'tagine-chicken-preserved-lemon', 'Tagine with Chicken and Preserved Lemon', 'Classic Moroccan tagine with chicken, preserved lemons, and green olives in aromatic spices', 'tagine', 'popular', 'Marrakech', ARRAY['ING_CHICKEN', 'ING_PRESERVED_LEMON', 'ING_OLIVE', 'ING_SAFFRON', 'ING_GINGER', 'ING_CUMIN', 'ING_CILANTRO'], 420, 35.0, 12.0, 24.0, '{}', true, true, true, false, false, true, false, 1, ARRAY['iconic', 'traditional', 'slow-cooked'], 95),

('MOR_TAGINE_LAMB_PRUNE', 'tagine-lamb-prune', 'Tagine with Lamb and Prunes', 'Sweet and savory lamb tagine with prunes, almonds, and honey', 'tagine', 'classic', 'Fes', ARRAY['ING_LAMB', 'ING_PRUNE', 'ING_ALMOND', 'ING_HONEY', 'ING_CINNAMON', 'ING_GINGER', 'ING_ONION'], 550, 38.0, 35.0, 28.0, ARRAY['nuts'], true, true, false, false, false, true, false, 1, ARRAY['sweet-savory', 'festive', 'traditional'], 90),

('MOR_TAGINE_LAMB_APRICOT', 'tagine-lamb-apricot', 'Tagine with Lamb and Apricots', 'Tender lamb stew with dried apricots and aromatic spices', 'tagine', 'popular', 'Meknes', ARRAY['ING_LAMB', 'ING_DRIED_APRICOT', 'ING_ALMOND', 'ING_HONEY', 'ING_RAS_EL_HANOUT', 'ING_ONION'], 520, 36.0, 32.0, 26.0, ARRAY['nuts'], true, true, false, false, false, true, false, 1, ARRAY['sweet-savory', 'fruity'], 85),

('MOR_TAGINE_KEFTA', 'tagine-kefta', 'Kefta Tagine with Eggs', 'Spiced meatballs in tomato sauce with poached eggs', 'tagine', 'popular', 'Casablanca', ARRAY['ING_GROUND_BEEF', 'ING_TOMATO', 'ING_EGG', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_PARSLEY', 'ING_ONION'], 450, 32.0, 15.0, 28.0, ARRAY['eggs'], true, true, true, false, false, true, false, 2, ARRAY['comfort-food', 'eggs', 'spiced'], 88),

('MOR_TAGINE_FISH', 'tagine-fish-chermoula', 'Fish Tagine with Chermoula', 'White fish baked with chermoula, tomatoes, and peppers', 'tagine', 'classic', 'Essaouira', ARRAY['ING_WHITE_FISH', 'ING_CHERMOULA', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_PRESERVED_LEMON', 'ING_OLIVE'], 320, 28.0, 12.0, 18.0, ARRAY['fish'], true, true, true, false, false, true, false, 2, ARRAY['seafood', 'coastal', 'healthy'], 80),

('MOR_TAGINE_VEGETABLE', 'tagine-vegetable', 'Seven Vegetable Tagine', 'Traditional vegetarian tagine with seasonal vegetables and chickpeas', 'tagine', 'classic', 'Marrakech', ARRAY['ING_CHICKPEA', 'ING_CARROT', 'ING_ZUCCHINI', 'ING_POTATO', 'ING_TOMATO', 'ING_ONION', 'ING_RAS_EL_HANOUT'], 280, 10.0, 42.0, 8.0, '{}', true, true, true, true, true, true, true, 1, ARRAY['vegetarian', 'vegan', 'healthy'], 75),

('MOR_TAGINE_MROUZIA', 'tagine-mrouzia', 'Mrouzia', 'Sweet lamb tagine with raisins, almonds, and honey for Eid', 'tagine', 'traditional', 'Fes', ARRAY['ING_LAMB', 'ING_RAISIN', 'ING_ALMOND', 'ING_HONEY', 'ING_RAS_EL_HANOUT', 'ING_CINNAMON', 'ING_SMEN'], 580, 35.0, 40.0, 32.0, ARRAY['nuts', 'milk'], true, false, false, false, false, true, false, 1, ARRAY['festive', 'eid', 'sweet'], 70),

('MOR_TANJIA', 'tanjia', 'Tanjia Marrakchia', 'Bachelor dish - lamb slow-cooked in clay pot with preserved lemons and spices', 'tagine', 'signature', 'Marrakech', ARRAY['ING_LAMB_SHANK', 'ING_PRESERVED_LEMON', 'ING_GARLIC', 'ING_CUMIN', 'ING_SAFFRON', 'ING_SMEN'], 520, 42.0, 8.0, 35.0, ARRAY['milk'], true, false, true, false, false, true, false, 1, ARRAY['iconic', 'marrakech', 'slow-cooked'], 85),

('MOR_TAGINE_CHICKEN_OLIVE', 'tagine-chicken-olive', 'Tagine with Chicken and Olives', 'Tender chicken with green olives and preserved lemons', 'tagine', 'popular', 'Rabat', ARRAY['ING_CHICKEN', 'ING_OLIVE', 'ING_PRESERVED_LEMON', 'ING_SAFFRON', 'ING_GINGER', 'ING_ONION'], 400, 33.0, 10.0, 25.0, '{}', true, true, true, false, false, true, false, 1, ARRAY['classic', 'poultry'], 82),

('MOR_TAGINE_LAMB_ARTICHOKE', 'tagine-lamb-artichoke', 'Tagine with Lamb and Artichokes', 'Spring tagine with lamb and fresh artichoke hearts', 'tagine', 'seasonal', 'Fes', ARRAY['ING_LAMB', 'ING_ARTICHOKE_HEARTS', 'ING_PRESERVED_LEMON', 'ING_PEAS', 'ING_SAFFRON', 'ING_GINGER'], 480, 36.0, 18.0, 28.0, '{}', true, true, true, false, false, true, false, 1, ARRAY['spring', 'seasonal'], 72),

('MOR_TAGINE_BEEF_QUINCE', 'tagine-beef-quince', 'Tagine with Beef and Quince', 'Autumn tagine with beef and caramelized quince', 'tagine', 'seasonal', 'Meknes', ARRAY['ING_BEEF', 'ING_HONEY', 'ING_CINNAMON', 'ING_GINGER', 'ING_ONION', 'ING_BUTTER'], 510, 35.0, 30.0, 28.0, ARRAY['milk'], true, false, true, false, false, true, false, 1, ARRAY['autumn', 'seasonal', 'sweet-savory'], 68),

('MOR_TAGINE_CHICKEN_FIG', 'tagine-chicken-fig', 'Tagine with Chicken and Dried Figs', 'Sweet tagine with chicken, dried figs, and walnuts', 'tagine', 'classic', 'Marrakech', ARRAY['ING_CHICKEN', 'ING_DRIED_FIG', 'ING_WALNUT', 'ING_HONEY', 'ING_CINNAMON', 'ING_GINGER'], 460, 32.0, 28.0, 24.0, ARRAY['nuts'], true, true, false, false, false, true, false, 1, ARRAY['sweet-savory', 'festive'], 74),

('MOR_TAGINE_SEAFOOD', 'tagine-seafood', 'Seafood Tagine', 'Mixed seafood tagine with shrimp, fish, and chermoula', 'tagine', 'premium', 'Agadir', ARRAY['ING_SHRIMP', 'ING_WHITE_FISH', 'ING_CHERMOULA', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_PRESERVED_LEMON'], 380, 35.0, 14.0, 18.0, ARRAY['crustaceans', 'fish'], true, true, true, false, false, true, false, 2, ARRAY['seafood', 'coastal', 'premium'], 78),

('MOR_TAGINE_LAMB_DATE', 'tagine-lamb-date', 'Tagine with Lamb and Dates', 'Rich lamb tagine with Medjool dates and aromatic spices', 'tagine', 'classic', 'Erfoud', ARRAY['ING_LAMB', 'ING_DATE', 'ING_ALMOND', 'ING_HONEY', 'ING_CINNAMON', 'ING_GINGER'], 540, 36.0, 38.0, 26.0, ARRAY['nuts'], true, true, false, false, false, true, false, 1, ARRAY['desert', 'sweet-savory', 'dates'], 76),

-- =====================
-- COUSCOUS (8 items)
-- =====================
('MOR_COUSCOUS_ROYAL', 'couscous-royal', 'Royal Couscous', 'Festive couscous with lamb, chicken, merguez, and seven vegetables', 'couscous', 'popular', 'Fes', ARRAY['ING_COUSCOUS', 'ING_LAMB', 'ING_CHICKEN', 'ING_MERGUEZ', 'ING_CARROT', 'ING_ZUCCHINI', 'ING_CHICKPEA', 'ING_TURNIP'], 650, 42.0, 65.0, 22.0, ARRAY['gluten'], false, true, true, false, false, true, false, 2, ARRAY['festive', 'friday', 'family'], 92),

('MOR_COUSCOUS_TFAYA', 'couscous-tfaya', 'Couscous with Tfaya', 'Sweet couscous topped with caramelized onions, raisins, and almonds', 'couscous', 'classic', 'Marrakech', ARRAY['ING_COUSCOUS', 'ING_CHICKEN', 'ING_ONION', 'ING_RAISIN', 'ING_ALMOND', 'ING_HONEY', 'ING_CINNAMON'], 580, 35.0, 70.0, 18.0, ARRAY['gluten', 'nuts'], false, true, false, false, false, true, false, 1, ARRAY['sweet-savory', 'festive'], 85),

('MOR_COUSCOUS_LAMB', 'couscous-lamb', 'Lamb Couscous', 'Traditional Friday couscous with tender lamb and vegetables', 'couscous', 'traditional', 'Casablanca', ARRAY['ING_COUSCOUS', 'ING_LAMB', 'ING_CARROT', 'ING_TURNIP', 'ING_ZUCCHINI', 'ING_CHICKPEA', 'ING_CABBAGE'], 550, 38.0, 60.0, 18.0, ARRAY['gluten'], false, true, true, false, false, true, false, 1, ARRAY['friday', 'traditional', 'family'], 88),

('MOR_COUSCOUS_VEGETABLE', 'couscous-vegetable', 'Seven Vegetable Couscous', 'Vegetarian couscous with seven seasonal vegetables', 'couscous', 'classic', 'Rabat', ARRAY['ING_COUSCOUS', 'ING_CARROT', 'ING_TURNIP', 'ING_ZUCCHINI', 'ING_CHICKPEA', 'ING_PUMPKIN', 'ING_CABBAGE', 'ING_ONION'], 380, 12.0, 68.0, 6.0, ARRAY['gluten'], false, true, true, true, true, true, true, 1, ARRAY['vegetarian', 'vegan', 'healthy'], 78),

('MOR_COUSCOUS_FISH', 'couscous-fish', 'Fish Couscous', 'Coastal couscous with fresh fish and fennel', 'couscous', 'classic', 'Essaouira', ARRAY['ING_COUSCOUS', 'ING_WHITE_FISH', 'ING_FENNEL', 'ING_TOMATO', 'ING_CHICKPEA', 'ING_CARROT', 'ING_CHERMOULA'], 420, 32.0, 55.0, 10.0, ARRAY['gluten', 'fish'], false, true, true, false, false, true, false, 1, ARRAY['seafood', 'coastal'], 72),

('MOR_SEFFA', 'seffa', 'Seffa Medfouna', 'Sweet vermicelli or couscous with chicken hidden inside, topped with almonds and cinnamon', 'couscous', 'signature', 'Fes', ARRAY['ING_COUSCOUS', 'ING_CHICKEN', 'ING_ALMOND', 'ING_CINNAMON', 'ING_SUGAR', 'ING_BUTTER'], 620, 30.0, 75.0, 24.0, ARRAY['gluten', 'nuts', 'milk'], false, false, false, false, false, true, false, 0, ARRAY['sweet', 'festive', 'wedding'], 75),

('MOR_COUSCOUS_RAISINS', 'couscous-raisins', 'Sweet Couscous with Raisins', 'Dessert couscous with raisins, almonds, and cinnamon', 'couscous', 'classic', 'Marrakech', ARRAY['ING_COUSCOUS', 'ING_RAISIN', 'ING_ALMOND', 'ING_CINNAMON', 'ING_SUGAR', 'ING_BUTTER'], 450, 8.0, 75.0, 14.0, ARRAY['gluten', 'nuts', 'milk'], false, false, false, false, true, true, false, 0, ARRAY['dessert', 'sweet'], 70),

('MOR_COUSCOUS_BARLEY', 'couscous-barley', 'Barley Couscous', 'Rustic barley couscous with buttermilk', 'couscous', 'traditional', 'Atlas Mountains', ARRAY['ING_BARLEY', 'ING_BUTTERMILK', 'ING_BUTTER', 'ING_HONEY'], 380, 10.0, 65.0, 10.0, ARRAY['gluten', 'milk'], false, false, true, false, true, true, false, 0, ARRAY['rustic', 'berber', 'mountain'], 60),

-- =====================
-- SOUP (6 items)
-- =====================
('MOR_HARIRA', 'harira', 'Harira', 'Traditional Ramadan soup with lentils, chickpeas, tomatoes, and herbs', 'soup', 'popular', 'Fes', ARRAY['ING_LENTILS', 'ING_CHICKPEA', 'ING_TOMATO', 'ING_VERMICELLI', 'ING_CELERY', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_FLOUR'], 280, 14.0, 42.0, 6.0, ARRAY['gluten'], false, true, true, true, true, true, true, 1, ARRAY['ramadan', 'iconic', 'soup'], 95),

('MOR_HARIRA_MEAT', 'harira-meat', 'Harira with Lamb', 'Rich harira soup with tender lamb pieces', 'soup', 'classic', 'Casablanca', ARRAY['ING_LAMB', 'ING_LENTILS', 'ING_CHICKPEA', 'ING_TOMATO', 'ING_VERMICELLI', 'ING_CILANTRO', 'ING_GINGER'], 350, 22.0, 38.0, 12.0, ARRAY['gluten'], false, true, true, false, false, true, false, 1, ARRAY['ramadan', 'hearty'], 88),

('MOR_BISSARA', 'bissara', 'Bissara', 'Creamy dried fava bean soup with olive oil and cumin', 'soup', 'traditional', 'Northern Morocco', ARRAY['ING_FAVA_BEAN', 'ING_GARLIC', 'ING_CUMIN', 'ING_OLIVE_OIL', 'ING_PAPRIKA'], 220, 12.0, 32.0, 8.0, '{}', true, true, true, true, true, true, true, 1, ARRAY['breakfast', 'street-food', 'vegan'], 75),

('MOR_CHORBA', 'chorba', 'Chorba', 'Spiced vegetable soup with broken vermicelli', 'soup', 'classic', 'Tangier', ARRAY['ING_TOMATO', 'ING_ONION', 'ING_VERMICELLI', 'ING_CILANTRO', 'ING_CUMIN', 'ING_PAPRIKA'], 180, 6.0, 32.0, 4.0, ARRAY['gluten'], false, true, true, true, true, true, true, 1, ARRAY['light', 'starter'], 65),

('MOR_HSSOUA', 'hssoua', 'Hssoua', 'Thick barley and herb soup for cold weather', 'soup', 'traditional', 'Atlas Mountains', ARRAY['ING_BARLEY', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_OLIVE_OIL', 'ING_CUMIN'], 240, 8.0, 45.0, 6.0, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['winter', 'berber', 'warming'], 55),

('MOR_LABLABI', 'lablabi', 'Lablabi', 'Chickpea soup with cumin and harissa', 'soup', 'classic', 'Tetouan', ARRAY['ING_CHICKPEA', 'ING_GARLIC', 'ING_CUMIN', 'ING_HARISSA', 'ING_OLIVE_OIL', 'ING_EGG'], 280, 14.0, 35.0, 10.0, ARRAY['eggs'], true, true, true, false, true, true, true, 2, ARRAY['street-food', 'breakfast', 'spicy'], 68),

-- =====================
-- PASTRY (8 items)
-- =====================
('MOR_BASTILLA_PIGEON', 'bastilla-pigeon', 'Bastilla with Pigeon', 'Classic sweet-savory pastry with pigeon, almonds, and cinnamon', 'pastry', 'signature', 'Fes', ARRAY['ING_PIGEON', 'ING_WARKA', 'ING_ALMOND', 'ING_EGG', 'ING_CINNAMON', 'ING_SUGAR', 'ING_SAFFRON'], 520, 28.0, 45.0, 28.0, ARRAY['gluten', 'nuts', 'eggs'], false, true, false, false, false, true, false, 0, ARRAY['iconic', 'wedding', 'festive'], 90),

('MOR_BASTILLA_CHICKEN', 'bastilla-chicken', 'Bastilla with Chicken', 'Popular version of bastilla made with chicken', 'pastry', 'popular', 'Marrakech', ARRAY['ING_CHICKEN', 'ING_WARKA', 'ING_ALMOND', 'ING_EGG', 'ING_CINNAMON', 'ING_SUGAR'], 480, 32.0, 42.0, 24.0, ARRAY['gluten', 'nuts', 'eggs'], false, true, false, false, false, true, false, 0, ARRAY['festive', 'celebration'], 88),

('MOR_BASTILLA_SEAFOOD', 'bastilla-seafood', 'Seafood Bastilla', 'Modern bastilla with mixed seafood and vermicelli', 'pastry', 'premium', 'Essaouira', ARRAY['ING_SHRIMP', 'ING_WHITE_FISH', 'ING_WARKA', 'ING_VERMICELLI', 'ING_ONION', 'ING_PARSLEY'], 420, 28.0, 38.0, 20.0, ARRAY['gluten', 'crustaceans', 'fish'], false, true, true, false, false, true, false, 1, ARRAY['seafood', 'modern', 'coastal'], 75),

('MOR_BRIOUATS_MEAT', 'briouats-meat', 'Briouats with Meat', 'Crispy triangular pastries filled with spiced ground beef', 'pastry', 'classic', 'Casablanca', ARRAY['ING_GROUND_BEEF', 'ING_WARKA', 'ING_ONION', 'ING_PARSLEY', 'ING_CUMIN', 'ING_CINNAMON'], 180, 10.0, 15.0, 10.0, ARRAY['gluten'], false, true, true, false, false, true, false, 1, ARRAY['appetizer', 'fried', 'ramadan'], 82),

('MOR_BRIOUATS_ALMOND', 'briouats-almond', 'Briouats with Almonds', 'Sweet pastries filled with almond paste and dipped in honey', 'pastry', 'popular', 'Fes', ARRAY['ING_ALMOND', 'ING_WARKA', 'ING_HONEY', 'ING_CINNAMON', 'ING_ORANGE_BLOSSOM'], 220, 5.0, 28.0, 12.0, ARRAY['gluten', 'nuts'], false, true, false, true, true, true, true, 0, ARRAY['dessert', 'sweet', 'ramadan'], 85),

('MOR_BRIOUATS_CHEESE', 'briouats-cheese', 'Briouats with Goat Cheese', 'Savory briouats with fresh goat cheese and herbs', 'pastry', 'classic', 'Chefchaouen', ARRAY['ING_GOAT_CHEESE', 'ING_WARKA', 'ING_PARSLEY', 'ING_CILANTRO', 'ING_CUMIN'], 160, 8.0, 14.0, 9.0, ARRAY['gluten', 'milk'], false, false, true, false, true, true, false, 0, ARRAY['appetizer', 'vegetarian'], 72),

('MOR_MHANCHA', 'mhancha', 'M''hancha', 'Coiled snake-shaped pastry with almond filling', 'pastry', 'signature', 'Fes', ARRAY['ING_ALMOND', 'ING_WARKA', 'ING_HONEY', 'ING_CINNAMON', 'ING_ORANGE_BLOSSOM', 'ING_BUTTER'], 280, 6.0, 35.0, 14.0, ARRAY['gluten', 'nuts', 'milk'], false, false, false, false, true, true, false, 0, ARRAY['dessert', 'festive', 'artistic'], 78),

('MOR_RGHAIF', 'rghaif', 'Rghaif', 'Layered square pastry, sweet or savory', 'pastry', 'traditional', 'Northern Morocco', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_HONEY', 'ING_SALT'], 250, 5.0, 35.0, 12.0, ARRAY['gluten', 'milk'], false, false, true, false, true, true, false, 0, ARRAY['breakfast', 'tea-time'], 70),

-- =====================
-- GRILL (7 items)
-- =====================
('MOR_MECHOUI', 'mechoui', 'Mechoui', 'Whole pit-roasted lamb with cumin and salt', 'grill', 'signature', 'Atlas Mountains', ARRAY['ING_LAMB', 'ING_CUMIN', 'ING_SALT', 'ING_BUTTER'], 450, 42.0, 0.0, 30.0, ARRAY['milk'], true, false, true, false, false, true, false, 1, ARRAY['festive', 'celebration', 'iconic'], 90),

('MOR_KEFTA_BROCHETTE', 'kefta-brochette', 'Kefta Brochettes', 'Grilled skewers of spiced ground meat', 'grill', 'popular', 'Marrakech', ARRAY['ING_GROUND_BEEF', 'ING_ONION', 'ING_PARSLEY', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_CORIANDER_SEEDS'], 320, 25.0, 5.0, 22.0, '{}', true, true, true, false, false, true, false, 2, ARRAY['street-food', 'bbq', 'popular'], 88),

('MOR_LAMB_BROCHETTE', 'lamb-brochette', 'Lamb Brochettes', 'Marinated lamb cubes grilled on skewers', 'grill', 'classic', 'Fes', ARRAY['ING_LAMB', 'ING_OLIVE_OIL', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_GARLIC'], 380, 32.0, 2.0, 26.0, '{}', true, true, true, false, false, true, false, 1, ARRAY['bbq', 'protein'], 85),

('MOR_CHICKEN_BROCHETTE', 'chicken-brochette', 'Chicken Brochettes', 'Grilled chicken skewers with chermoula marinade', 'grill', 'popular', 'Casablanca', ARRAY['ING_CHICKEN', 'ING_CHERMOULA', 'ING_LEMON', 'ING_OLIVE_OIL'], 280, 30.0, 3.0, 16.0, '{}', true, true, true, false, false, true, false, 1, ARRAY['healthy', 'grilled', 'light'], 82),

('MOR_MIXED_GRILL', 'mixed-grill-moroccan', 'Moroccan Mixed Grill', 'Assortment of grilled meats with kefta, lamb, and merguez', 'grill', 'premium', 'Marrakech', ARRAY['ING_LAMB', 'ING_GROUND_BEEF', 'ING_MERGUEZ', 'ING_CUMIN', 'ING_PAPRIKA'], 520, 45.0, 5.0, 35.0, '{}', true, true, true, false, false, true, false, 2, ARRAY['sharing', 'festive'], 80),

('MOR_LIVER_BROCHETTE', 'liver-brochette', 'Grilled Lamb Liver', 'Cubed lamb liver grilled with cumin and served in bread', 'grill', 'traditional', 'Marrakech', ARRAY['ING_LAMB_LIVER', 'ING_CUMIN', 'ING_SALT', 'ING_KHOBZ'], 280, 28.0, 8.0, 14.0, ARRAY['gluten'], false, true, true, false, false, true, false, 1, ARRAY['street-food', 'offal', 'traditional'], 65),

('MOR_MERGUEZ', 'merguez', 'Merguez Sausages', 'Spicy lamb or beef sausages grilled to perfection', 'grill', 'popular', 'Northern Morocco', ARRAY['ING_LAMB', 'ING_HARISSA', 'ING_CUMIN', 'ING_FENNEL_SEEDS', 'ING_PAPRIKA'], 350, 22.0, 3.0, 28.0, '{}', true, true, true, false, false, true, false, 3, ARRAY['spicy', 'sausage', 'bbq'], 85),

-- =====================
-- SALAD (7 items)
-- =====================
('MOR_ZAALOUK', 'zaalouk', 'Zaalouk', 'Smoky eggplant and tomato salad with cumin and paprika', 'salad', 'popular', 'Marrakech', ARRAY['ING_EGGPLANT', 'ING_TOMATO', 'ING_GARLIC', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_OLIVE_OIL', 'ING_CILANTRO'], 120, 3.0, 12.0, 8.0, '{}', true, true, true, true, true, true, true, 1, ARRAY['appetizer', 'dip', 'vegan'], 88),

('MOR_TAKTOUKA', 'taktouka', 'Taktouka', 'Roasted pepper and tomato salad', 'salad', 'classic', 'Fes', ARRAY['ING_BELL_PEPPER', 'ING_TOMATO', 'ING_GARLIC', 'ING_CUMIN', 'ING_OLIVE_OIL', 'ING_PARSLEY'], 100, 2.0, 10.0, 7.0, '{}', true, true, true, true, true, true, true, 1, ARRAY['appetizer', 'roasted', 'vegan'], 80),

('MOR_CARROT_SALAD', 'moroccan-carrot-salad', 'Moroccan Carrot Salad', 'Spiced carrot salad with cumin, paprika, and harissa', 'salad', 'classic', 'Casablanca', ARRAY['ING_CARROT', 'ING_GARLIC', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_OLIVE_OIL', 'ING_LEMON', 'ING_PARSLEY'], 90, 2.0, 14.0, 4.0, '{}', true, true, true, true, true, true, true, 2, ARRAY['appetizer', 'healthy', 'spiced'], 78),

('MOR_ORANGE_SALAD', 'moroccan-orange-salad', 'Moroccan Orange Salad', 'Fresh orange slices with cinnamon and orange blossom water', 'salad', 'classic', 'Marrakech', ARRAY['ING_ORANGE', 'ING_CINNAMON', 'ING_ORANGE_BLOSSOM', 'ING_DATE'], 120, 2.0, 28.0, 0.5, '{}', true, true, true, true, true, true, true, 0, ARRAY['refreshing', 'dessert', 'light'], 75),

('MOR_BEET_SALAD', 'moroccan-beet-salad', 'Moroccan Beet Salad', 'Cooked beets with cumin and orange blossom water', 'salad', 'classic', 'Rabat', ARRAY['ING_BEET', 'ING_CUMIN', 'ING_ORANGE_BLOSSOM', 'ING_OLIVE_OIL', 'ING_PARSLEY'], 80, 2.0, 12.0, 3.0, '{}', true, true, true, true, true, true, true, 0, ARRAY['healthy', 'colorful'], 68),

('MOR_CUCUMBER_SALAD', 'moroccan-cucumber-salad', 'Moroccan Cucumber Salad', 'Refreshing cucumber with mint and orange blossom', 'salad', 'classic', 'Tangier', ARRAY['ING_CUCUMBER', 'ING_MINT', 'ING_ORANGE_BLOSSOM', 'ING_OLIVE_OIL', 'ING_LEMON'], 60, 1.0, 8.0, 3.0, '{}', true, true, true, true, true, true, true, 0, ARRAY['refreshing', 'summer', 'light'], 70),

('MOR_MIXED_SALAD', 'moroccan-mixed-salad', 'Moroccan Mixed Salad', 'Traditional salad plate with multiple cooked vegetable salads', 'salad', 'popular', 'Fes', ARRAY['ING_TOMATO', 'ING_CUCUMBER', 'ING_CARROT', 'ING_BEET', 'ING_EGGPLANT', 'ING_OLIVE_OIL'], 150, 4.0, 18.0, 8.0, '{}', true, true, true, true, true, true, true, 1, ARRAY['mezze', 'sharing', 'colorful'], 82),

-- =====================
-- BREAD (5 items)
-- =====================
('MOR_KHOBZ', 'khobz', 'Khobz', 'Traditional round Moroccan bread baked in wood-fired oven', 'bread', 'traditional', 'All Morocco', ARRAY['ING_FLOUR', 'ING_YEAST', 'ING_SALT', 'ING_WATER'], 180, 6.0, 35.0, 1.0, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['staple', 'daily', 'essential'], 95),

('MOR_MSEMMEN', 'msemmen', 'Msemmen', 'Layered square flatbread, flaky and buttery', 'bread', 'popular', 'Fes', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_SALT', 'ING_WATER'], 280, 5.0, 38.0, 14.0, ARRAY['gluten', 'milk'], false, false, true, false, true, true, false, 0, ARRAY['breakfast', 'tea-time', 'layered'], 88),

('MOR_BAGHRIR', 'baghrir', 'Baghrir', 'Thousand-hole semolina pancakes served with honey and butter', 'bread', 'popular', 'All Morocco', ARRAY['ING_SEMOLINA_FLOUR', 'ING_FLOUR', 'ING_YEAST', 'ING_HONEY', 'ING_BUTTER'], 220, 5.0, 40.0, 6.0, ARRAY['gluten', 'milk'], false, false, true, false, true, true, false, 0, ARRAY['breakfast', 'sweet', 'honeycomb'], 85),

('MOR_HARCHA', 'harcha', 'Harcha', 'Pan-fried semolina bread with crispy exterior', 'bread', 'classic', 'All Morocco', ARRAY['ING_SEMOLINA_FLOUR', 'ING_BUTTER', 'ING_SALT', 'ING_SUGAR'], 240, 4.0, 35.0, 10.0, ARRAY['gluten', 'milk'], false, false, true, false, true, true, false, 0, ARRAY['breakfast', 'rustic'], 78),

('MOR_BATBOUT', 'batbout', 'Batbout', 'Soft pita-like bread perfect for sandwiches', 'bread', 'classic', 'All Morocco', ARRAY['ING_FLOUR', 'ING_YEAST', 'ING_SALT', 'ING_OLIVE_OIL'], 160, 5.0, 30.0, 3.0, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['sandwich', 'pocket-bread', 'versatile'], 72)

ON CONFLICT (id) DO NOTHING;
