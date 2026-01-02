-- Senegalese Cuisine - Insert Dishes
-- 28 traditional Senegalese dishes

BEGIN;

INSERT INTO senegalese (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity, dish_type) VALUES

-- Rice dishes (5)
('SEN_THIEBOUDIENNE', 'thieboudienne', 'Thieboudienne', 'The national dish of Senegal - fish and rice cooked in rich tomato sauce with vegetables like cassava, eggplant, cabbage, and carrots. Also known as Ceebu Jën.', 'rice', 'iconic', 'Saint-Louis', 'fish', 'braised', 90, 2, false, false, true, true, ARRAY['fish'], ARRAY['national_dish', 'one_pot', 'festive', 'sunday_meal'], 100, 'main'),
('SEN_THIEBOU_YAPP', 'thiebou-yapp', 'Thiebou Yapp', 'The meat version of thieboudienne, featuring marinated beef or lamb cooked with rice in a rich tomato-based sauce with vegetables.', 'rice', 'classic', 'Dakar', 'beef', 'braised', 80, 2, false, false, true, true, ARRAY[]::TEXT[], ARRAY['one_pot', 'hearty', 'comfort_food'], 88, 'main'),
('SEN_THIEBOU_GUINAAR', 'thiebou-guinaar', 'Thiebou Guinaar', 'Chicken version of the classic thieboudienne, with tender chicken pieces cooked in tomato sauce with rice and vegetables.', 'rice', 'classic', 'Dakar', 'chicken', 'braised', 75, 2, false, false, true, true, ARRAY[]::TEXT[], ARRAY['one_pot', 'family_meal'], 85, 'main'),
('SEN_YASSA_POULET', 'yassa-poulet', 'Yassa Poulet', 'Iconic Casamance dish of chicken marinated in lemon juice and mustard, grilled then simmered with caramelized onions. Served with white rice.', 'rice', 'iconic', 'Casamance', 'chicken', 'grilled', 60, 2, false, false, true, true, ARRAY['mustard'], ARRAY['marinated', 'tangy', 'casamance', 'festive'], 95, 'main'),
('SEN_YASSA_POISSON', 'yassa-poisson', 'Yassa Poisson', 'Fish version of the classic yassa, with whole fish marinated in lemon and mustard, grilled and served in caramelized onion sauce with rice.', 'rice', 'classic', 'Casamance', 'fish', 'grilled', 55, 2, false, false, true, true, ARRAY['fish', 'mustard'], ARRAY['marinated', 'tangy', 'casamance', 'seafood'], 82, 'main'),

-- Stews (4)
('SEN_MAFE', 'mafe', 'Mafé', 'Iconic West African peanut stew with beef or lamb, tomatoes, and vegetables in a rich, creamy groundnut sauce. Served with white rice.', 'stew', 'iconic', 'National', 'beef', 'stewed', 90, 2, false, false, true, true, ARRAY['peanut'], ARRAY['peanut', 'hearty', 'comfort_food', 'one_pot'], 92, 'main'),
('SEN_MAFE_CHICKEN', 'mafe-chicken', 'Mafé Poulet', 'Chicken version of the classic mafé, with tender chicken pieces simmered in creamy peanut sauce with vegetables.', 'stew', 'classic', 'National', 'chicken', 'stewed', 75, 2, false, false, true, true, ARRAY['peanut'], ARRAY['peanut', 'hearty', 'comfort_food'], 85, 'main'),
('SEN_BASSI_SALTE', 'bassi-salte', 'Bassi Salté', 'Hearty millet couscous dish with lamb meatballs, vegetables (sweet potato, potato, white beans, cabbage), dates and raisins in tomato sauce.', 'stew', 'traditional', 'National', 'lamb', 'stewed', 120, 1, false, false, true, true, ARRAY[]::TEXT[], ARRAY['millet', 'festive', 'celebration', 'meatballs'], 75, 'main'),
('SEN_NDAMBE', 'ndambe', 'Ndambé', 'Spiced black-eyed pea stew, a staple breakfast dish often served with bread. Rich in protein and flavored with onions and tomatoes.', 'stew', 'traditional', 'Dakar', 'legume', 'stewed', 60, 2, true, true, true, true, ARRAY[]::TEXT[], ARRAY['breakfast', 'vegan', 'protein_rich', 'street_food'], 78, 'main'),

-- Soups (3)
('SEN_SUPPU_KANDIA', 'suppu-kandia', 'Suppu Kandia', 'Traditional okra soup cooked with palm oil and fish, simmered for hours. Served with white rice. Watch for small fish bones.', 'soup', 'traditional', 'National', 'fish', 'stewed', 120, 2, false, false, true, true, ARRAY['fish'], ARRAY['okra', 'palm_oil', 'traditional', 'fish'], 72, 'soup'),
('SEN_CALDOU', 'caldou', 'Caldou', 'Light fish soup from Casamance, seasoned with pepper, garlic, okra, and bissap leaves. Served with lemon rice for a refreshing meal.', 'soup', 'regional', 'Casamance', 'fish', 'poached', 45, 2, false, false, true, true, ARRAY['fish'], ARRAY['casamance', 'light', 'lemon', 'refreshing'], 68, 'soup'),
('SEN_SOUPE_KANDIA', 'soupe-kandia', 'Soupe Kandia au Poulet', 'Chicken and okra soup variation, featuring tender chicken pieces in a rich okra-based broth with palm oil.', 'soup', 'traditional', 'National', 'chicken', 'stewed', 90, 2, false, false, true, true, ARRAY[]::TEXT[], ARRAY['okra', 'chicken', 'palm_oil', 'hearty'], 70, 'soup'),

-- Grilled (3)
('SEN_DIBI', 'dibi', 'Dibi', 'Senegalese grilled lamb, marinated and cut into small pieces, served with mustard, pepper, onions and bread. A beloved street food sold at dibiteries.', 'grilled', 'iconic', 'Dakar', 'lamb', 'grilled', 45, 2, false, false, false, true, ARRAY['gluten', 'mustard'], ARRAY['street_food', 'grilled', 'fast_food', 'dibiterie'], 90, 'grill'),
('SEN_DIBI_HAUSA', 'dibi-hausa', 'Dibi Hausa', 'Hausa-style grilled beef, spiced differently from traditional dibi. Served with spicy pepper sauce and onions.', 'grilled', 'classic', 'Dakar', 'beef', 'grilled', 50, 3, false, false, true, true, ARRAY[]::TEXT[], ARRAY['street_food', 'grilled', 'spicy', 'hausa'], 75, 'grill'),
('SEN_BROCHETTES', 'brochettes', 'Brochettes', 'Marinated meat skewers grilled over charcoal, a French-influenced street food popular throughout Senegal. Often served with diaga sauce.', 'grilled', 'classic', 'National', 'beef', 'grilled', 40, 2, false, false, true, true, ARRAY[]::TEXT[], ARRAY['skewers', 'street_food', 'grilled', 'french_influence'], 80, 'grill'),

-- Street food (4)
('SEN_PASTELS', 'pastels', 'Pastels', 'Crispy fish-filled fritters, a beloved Dakar street food. Deep-fried pastry stuffed with seasoned fish, served with spicy tomato sauce.', 'street_food', 'iconic', 'Dakar', 'fish', 'deep_fried', 60, 2, false, false, false, true, ARRAY['fish', 'gluten'], ARRAY['street_food', 'fried', 'snack', 'fish'], 88, 'appetizer'),
('SEN_FATAYA', 'fataya', 'Fataya', 'Savory meat-filled pastries, showing French culinary influence. Deep-fried to golden perfection with spiced ground beef filling.', 'street_food', 'classic', 'National', 'beef', 'deep_fried', 50, 2, false, false, false, true, ARRAY['gluten'], ARRAY['street_food', 'fried', 'pastry', 'french_influence'], 82, 'appetizer'),
('SEN_ACCARA', 'accara', 'Accara', 'Black-eyed pea fritters, a protein-rich street snack. Fermented cowpea batter deep-fried into crispy, golden balls.', 'street_food', 'traditional', 'National', 'legume', 'deep_fried', 40, 1, true, true, true, true, ARRAY[]::TEXT[], ARRAY['street_food', 'vegan', 'fried', 'protein_rich'], 78, 'appetizer'),
('SEN_BEIGNETS', 'beignets-senegalese', 'Beignets Sénégalais', 'Sweet fried dough balls, a popular breakfast or snack item. Light and fluffy, often dusted with sugar.', 'street_food', 'classic', 'National', NULL, 'deep_fried', 30, 0, true, false, false, false, ARRAY['gluten', 'egg'], ARRAY['breakfast', 'sweet', 'fried', 'snack'], 75, 'pastry'),

-- Desserts (4)
('SEN_THIAKRY', 'thiakry', 'Thiakry', 'Sweet millet couscous dessert mixed with yogurt, sweetened condensed milk, vanilla, and sometimes nutmeg or raisins. A refreshing treat.', 'dessert', 'iconic', 'National', NULL, 'mixed', 30, 0, true, false, true, false, ARRAY['dairy'], ARRAY['sweet', 'refreshing', 'millet', 'yogurt'], 88, 'dessert'),
('SEN_SOMBI', 'sombi', 'Sombi', 'Creamy rice pudding made with coconut milk, sugar, and salt. A beloved breakfast dish or sweet snack, typically served warm.', 'dessert', 'classic', 'National', NULL, 'simmered', 45, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['breakfast', 'sweet', 'coconut', 'rice_pudding'], 82, 'dessert'),
('SEN_LAKH', 'lakh', 'Lakh', 'Millet porridge sweetened and served with curdled milk. A nutritious traditional dessert often sold as a street snack.', 'dessert', 'traditional', 'National', NULL, 'boiled', 40, 0, true, false, true, false, ARRAY['dairy'], ARRAY['millet', 'porridge', 'traditional', 'nutritious'], 70, 'dessert'),
('SEN_NGALAKH', 'ngalakh', 'Ngalakh', 'Traditional dessert made with millet couscous, peanut butter, baobab fruit, and orange blossom water. Prepared for the Maulid celebration.', 'dessert', 'traditional', 'National', NULL, 'mixed', 60, 0, true, true, true, true, ARRAY['peanut'], ARRAY['festive', 'maulid', 'peanut', 'baobab'], 72, 'dessert'),

-- Beverages (5)
('SEN_BISSAP', 'bissap', 'Bissap', 'Vibrant red hibiscus flower drink, sweetened and flavored with mint. A symbol of Senegalese hospitality, served to welcome guests.', 'beverage', 'iconic', 'National', NULL, 'infused', 30, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['hibiscus', 'refreshing', 'hospitality', 'traditional'], 95, 'beverage'),
('SEN_BOUYE', 'bouye', 'Bouye', 'Creamy baobab fruit juice, rich in vitamin C and antioxidants. The baobab fruit is soaked, strained, and sweetened for this nutritious drink.', 'beverage', 'classic', 'National', NULL, 'blended', 20, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['baobab', 'nutritious', 'vitamin_c', 'traditional'], 85, 'beverage'),
('SEN_GINGEMBRE', 'gingembre', 'Jus de Gingembre', 'Spicy ginger juice, refreshing and invigorating. Fresh ginger is blended with pineapple and sweetened for a zesty drink.', 'beverage', 'classic', 'National', NULL, 'blended', 20, 2, true, true, true, true, ARRAY[]::TEXT[], ARRAY['ginger', 'spicy', 'refreshing', 'energizing'], 80, 'beverage'),
('SEN_ATTAYA', 'attaya', 'Attaya', 'Senegalese green tea ceremony drink. Chinese gunpowder tea prepared in three rounds, each with different sweetness levels. A social ritual.', 'beverage', 'iconic', 'National', NULL, 'brewed', 45, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['tea', 'ceremony', 'social', 'traditional'], 90, 'beverage'),
('SEN_CAFE_TOUBA', 'cafe-touba', 'Café Touba', 'Spiced coffee named after the holy city of Touba. Coffee roasted with selim pepper (djar) for a unique aromatic flavor.', 'beverage', 'classic', 'Touba', NULL, 'brewed', 15, 1, true, true, true, true, ARRAY[]::TEXT[], ARRAY['coffee', 'spiced', 'touba', 'aromatic'], 78, 'beverage')

ON CONFLICT (id) DO NOTHING;

COMMIT;

-- Verify count
SELECT COUNT(*) as total_dishes FROM senegalese;
SELECT category, COUNT(*) FROM senegalese GROUP BY category ORDER BY category;
