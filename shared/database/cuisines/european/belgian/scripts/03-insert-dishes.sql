-- Belgian Cuisine - Insert Dishes
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-25
-- Total: 32 dishes

INSERT INTO belgian (id, slug, name, local_name, description, category, region, status, protein_type, cooking_method, prep_time_min, spice_level, price_default, dietary, allergens, tags, popularity) VALUES

-- =====================
-- MAINS (8 dishes)
-- =====================
('BEL_CARBONNADE', 'carbonnade-flamande', 'Carbonnade Flamande', 'Stoofvlees / Carbonnade à la Flamande', 'Flemish beef stew braised in Belgian beer with onions and mustard, traditionally served with frites', 'mains', 'flanders', 'iconic', 'beef', 'braised', 180, 0, 18.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten'], ARRAY['iconic', 'flemish', 'beer', 'comfort_food', 'winter'], 95),

('BEL_WATERZOOI_CHICKEN', 'waterzooi-chicken', 'Waterzooi de Poulet', 'Gentse Waterzooi', 'Creamy Ghent-style chicken stew with leeks, carrots, celery and potatoes in a rich egg-thickened broth', 'mains', 'ghent', 'iconic', 'chicken', 'poached', 90, 0, 19.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['eggs', 'dairy'], ARRAY['iconic', 'ghent', 'creamy', 'comfort_food'], 92),

('BEL_WATERZOOI_FISH', 'waterzooi-fish', 'Waterzooi de Poisson', 'Viszooi', 'Original Ghent fish stew with mixed white fish, vegetables and cream, the traditional version of waterzooi', 'mains', 'ghent', 'traditional', 'fish', 'poached', 60, 0, 22.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish', 'eggs', 'dairy'], ARRAY['traditional', 'ghent', 'fish', 'creamy'], 78),

('BEL_VOL_AU_VENT', 'vol-au-vent', 'Vol-au-Vent', 'Vol-au-Vent / Koninginnehapje', 'Puff pastry shell filled with creamy chicken, mushrooms and sweetbreads in velouté sauce', 'mains', 'nationwide', 'classic', 'chicken', 'baked', 75, 0, 17.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'dairy', 'eggs'], ARRAY['classic', 'elegant', 'sunday_meal', 'party'], 88),

('BEL_STOEMP', 'stoemp', 'Stoemp', 'Stoemp', 'Brussels specialty of mashed potatoes mixed with vegetables like carrots, leeks or spinach, served with sausage', 'mains', 'brussels', 'traditional', 'pork', 'mashed', 45, 0, 14.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['dairy'], ARRAY['brussels', 'comfort_food', 'hearty', 'winter'], 82),

('BEL_BOULETS_LIEGEOISE', 'boulets-liegeoise', 'Boulets à la Liégeoise', 'Boulets sauce lapin', 'Liège-style meatballs in a sweet and sour sauce made with Liège syrup, served with frites', 'mains', 'liege', 'iconic', 'mixed', 'braised', 60, 0, 15.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'eggs'], ARRAY['iconic', 'liege', 'sweet_sour', 'meatballs'], 90),

('BEL_LAPIN_GUEUZE', 'lapin-gueuze', 'Lapin à la Gueuze', 'Konijn met Geuze', 'Rabbit braised in gueuze lambic beer with prunes and Belgian mustard', 'mains', 'brussels', 'traditional', 'rabbit', 'braised', 120, 0, 24.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten'], ARRAY['traditional', 'brussels', 'beer', 'game'], 72),

('BEL_WITLOOF_GRATIN', 'witloof-gratin', 'Witloof au Gratin', 'Gegratineerd Witloof met Hesp', 'Belgian endive wrapped in ham, covered in béchamel and cheese, baked until golden', 'mains', 'nationwide', 'classic', 'pork', 'baked', 60, 0, 15.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'dairy'], ARRAY['classic', 'gratin', 'comfort_food', 'winter'], 85),

-- =====================
-- SEAFOOD (5 dishes)
-- =====================
('BEL_MOULES_FRITES', 'moules-frites', 'Moules-Frites', 'Mosselen met Frieten', 'Belgium''s national dish: steamed mussels in white wine, celery and onion broth, served with crispy frites', 'seafood', 'nationwide', 'iconic', 'shellfish', 'steamed', 30, 0, 19.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['shellfish', 'dairy'], ARRAY['iconic', 'national_dish', 'seafood', 'frites'], 98),

('BEL_MOULES_BIERE', 'moules-biere', 'Moules à la Bière', 'Mosselen met Bier', 'Mussels steamed in Belgian blonde beer with cream and herbs', 'seafood', 'flanders', 'classic', 'shellfish', 'steamed', 30, 0, 20.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['shellfish', 'dairy', 'gluten'], ARRAY['flemish', 'beer', 'seafood', 'creamy'], 85),

('BEL_TOMATE_CREVETTES', 'tomate-crevettes', 'Tomate aux Crevettes', 'Tomaat-Garnaal', 'Fresh tomato stuffed with North Sea grey shrimp in homemade mayonnaise, a Belgian coast classic', 'seafood', 'coast', 'iconic', 'shrimp', 'raw', 20, 0, 16.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['shellfish', 'eggs'], ARRAY['iconic', 'coast', 'cold', 'summer', 'appetizer'], 92),

('BEL_ANGUILLES_VERT', 'anguilles-au-vert', 'Anguilles au Vert', 'Paling in ''t Groen', 'Traditional Flemish dish of eel cooked in a vibrant green sauce of mixed herbs', 'seafood', 'flanders', 'traditional', 'fish', 'braised', 45, 0, 26.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}', ARRAY['fish', 'dairy', 'eggs'], ARRAY['traditional', 'flemish', 'herbs', 'unique'], 68),

('BEL_CROQUETTES_CREVETTES', 'croquettes-crevettes', 'Croquettes aux Crevettes', 'Garnaalkroketten', 'Crispy fried croquettes filled with creamy béchamel and North Sea grey shrimp', 'seafood', 'coast', 'iconic', 'shrimp', 'deep_fried', 60, 0, 14.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['shellfish', 'gluten', 'dairy', 'eggs'], ARRAY['iconic', 'coast', 'fried', 'appetizer', 'crispy'], 94),

-- =====================
-- FRITES (4 dishes)
-- =====================
('BEL_FRITES', 'belgian-frites', 'Belgian Frites', 'Frieten / Frites', 'Authentic Belgian fries double-fried in beef tallow for extra crispiness, served in a paper cone with sauce', 'frites', 'nationwide', 'iconic', NULL, 'deep_fried', 25, 0, 4.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY[]::TEXT[], ARRAY['iconic', 'national', 'street_food', 'crispy'], 99),

('BEL_FRICADELLE', 'fricadelle', 'Fricadelle', 'Frikandel / Fricadelle', 'Deep-fried minced meat sausage, a classic fritkot snack served with frites and sauce', 'frites', 'nationwide', 'classic', 'mixed', 'deep_fried', 15, 0, 3.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten'], ARRAY['classic', 'street_food', 'fritkot', 'snack'], 88),

('BEL_MITRAILLETTE', 'mitraillette', 'Mitraillette', 'Mitraillette', 'Belgian street food: a baguette stuffed with meat (fricadelle, burger), frites and generous amounts of sauce', 'frites', 'wallonia', 'classic', 'mixed', 'assembled', 15, 0, 8.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'eggs'], ARRAY['classic', 'wallonia', 'street_food', 'hearty'], 82),

('BEL_FRITES_STOOFVLEES', 'frites-stoofvlees', 'Frites met Stoofvlees', 'Frieten met Stoofvlees', 'Belgian frites served with rich Flemish beef stew (stoofvlees) and mayonnaise', 'frites', 'flanders', 'classic', 'beef', 'braised', 180, 0, 14.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'eggs'], ARRAY['flemish', 'comfort_food', 'hearty', 'classic'], 90),

-- =====================
-- WAFFLES (4 dishes)
-- =====================
('BEL_WAFFLE_LIEGE', 'liege-waffle', 'Liège Waffle', 'Gaufre de Liège', 'Dense, chewy waffle with pearl sugar that caramelizes on the outside, eaten plain or with toppings', 'waffles', 'liege', 'iconic', NULL, 'grilled', 120, 0, 5.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['gluten', 'dairy', 'eggs'], ARRAY['iconic', 'liege', 'sweet', 'street_food', 'breakfast'], 96),

('BEL_WAFFLE_BRUSSELS', 'brussels-waffle', 'Brussels Waffle', 'Gaufre de Bruxelles', 'Light, crispy rectangular waffle with deep pockets, traditionally served with powdered sugar or whipped cream', 'waffles', 'brussels', 'iconic', NULL, 'grilled', 30, 0, 6.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['gluten', 'dairy', 'eggs'], ARRAY['iconic', 'brussels', 'light', 'crispy', 'breakfast'], 94),

('BEL_WAFFLE_CHOCOLATE', 'chocolate-waffle', 'Chocolate Belgian Waffle', 'Gaufre au Chocolat', 'Belgian waffle generously topped with warm Belgian chocolate sauce and whipped cream', 'waffles', 'nationwide', 'classic', NULL, 'grilled', 30, 0, 8.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['gluten', 'dairy', 'eggs'], ARRAY['classic', 'chocolate', 'indulgent', 'dessert'], 92),

('BEL_WAFFLE_STRAWBERRY', 'strawberry-waffle', 'Strawberry Belgian Waffle', 'Gaufre aux Fraises', 'Brussels waffle topped with fresh strawberries, whipped cream and chocolate drizzle', 'waffles', 'nationwide', 'classic', NULL, 'grilled', 30, 0, 9.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['gluten', 'dairy', 'eggs'], ARRAY['classic', 'fruit', 'fresh', 'popular'], 88),

-- =====================
-- DESSERTS (6 dishes)
-- =====================
('BEL_SPECULOOS', 'speculoos', 'Speculoos', 'Speculaas / Speculoos', 'Traditional spiced shortcrust biscuit with distinctive brown color and caramelized flavor', 'desserts', 'nationwide', 'iconic', NULL, 'baked', 45, 1, 4.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['gluten', 'dairy', 'eggs'], ARRAY['iconic', 'spiced', 'cookie', 'christmas', 'traditional'], 95),

('BEL_DAME_BLANCHE', 'dame-blanche', 'Dame Blanche', 'Dame Blanche', 'Classic Belgian dessert of vanilla ice cream with warm dark chocolate sauce and whipped cream', 'desserts', 'nationwide', 'iconic', NULL, NULL, 10, 0, 8.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['dairy'], ARRAY['iconic', 'chocolate', 'ice_cream', 'classic', 'simple'], 90),

('BEL_PRALINES', 'belgian-pralines', 'Belgian Pralines', 'Pralines Belges', 'Luxury filled chocolates with various fillings like ganache, praline paste, caramel or cream', 'desserts', 'brussels', 'iconic', NULL, NULL, 120, 0, 24.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": false, "is_halal": true, "is_kosher": true}', ARRAY['dairy', 'nuts'], ARRAY['iconic', 'luxury', 'chocolate', 'gift', 'artisan'], 96),

('BEL_TARTE_SUCRE', 'tarte-au-sucre', 'Tarte au Sucre', 'Suikertaart', 'Traditional Belgian sugar pie from Wallonia with a sweet cream filling', 'desserts', 'wallonia', 'traditional', NULL, 'baked', 60, 0, 6.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['gluten', 'dairy', 'eggs'], ARRAY['traditional', 'wallonia', 'pie', 'sweet', 'simple'], 75),

('BEL_RIJSTPAP', 'rijstpap', 'Rijstpap', 'Rijstpap / Riz au Lait', 'Creamy Belgian rice pudding served cold with cinnamon and brown sugar', 'desserts', 'flanders', 'traditional', NULL, 'simmered', 45, 0, 5.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['dairy'], ARRAY['traditional', 'flemish', 'comfort_food', 'cold', 'creamy'], 78),

('BEL_CUBERDON', 'cuberdon', 'Cuberdon', 'Neuzekes / Cuberdons', 'Iconic Ghent cone-shaped raspberry candy with a crisp shell and gooey syrupy center', 'desserts', 'ghent', 'iconic', NULL, NULL, 180, 0, 12.99, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY[]::TEXT[], ARRAY['iconic', 'ghent', 'candy', 'unique', 'artisan'], 82),

-- =====================
-- APPETIZERS (5 dishes)
-- =====================
('BEL_FILET_AMERICAIN', 'filet-americain', 'Filet Américain', 'Filet Américain / Préparé', 'Belgian-style steak tartare spread served with frites, toast or in a sandwich, a national favorite', 'appetizers', 'nationwide', 'iconic', 'beef', 'raw', 15, 0, 12.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['eggs'], ARRAY['iconic', 'raw', 'tartare', 'spread', 'classic'], 88),

('BEL_CROQUETTES_FROMAGE', 'croquettes-fromage', 'Croquettes au Fromage', 'Kaaskroketten', 'Deep-fried cheese croquettes with creamy Gouda or aged cheese filling', 'appetizers', 'flanders', 'classic', NULL, 'deep_fried', 60, 0, 9.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['gluten', 'dairy', 'eggs'], ARRAY['classic', 'fried', 'cheese', 'appetizer', 'crispy'], 86),

('BEL_BITTERBALLEN', 'bitterballen', 'Bitterballen', 'Bitterballen', 'Small round fried meat ragout balls, crispy outside and creamy inside, served with mustard', 'appetizers', 'flanders', 'classic', 'beef', 'deep_fried', 120, 0, 8.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'dairy', 'eggs'], ARRAY['classic', 'flemish', 'fried', 'bar_snack', 'beer'], 84),

('BEL_ASPERGES_FLAMANDES', 'asperges-flamandes', 'Asperges à la Flamande', 'Vlaamse Asperges', 'White asparagus served with chopped hard-boiled eggs and brown butter sauce', 'appetizers', 'flanders', 'traditional', NULL, 'boiled', 30, 0, 14.99, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}', ARRAY['dairy', 'eggs'], ARRAY['traditional', 'flemish', 'seasonal', 'spring', 'elegant'], 80),

('BEL_PATE_GAUMAIS', 'pate-gaumais', 'Pâté Gaumais', 'Pâté Gaumais', 'Protected regional meat pie from Gaume with pork and veal in a golden pastry crust', 'appetizers', 'wallonia', 'regional', 'mixed', 'baked', 180, 0, 16.99, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": false, "is_kosher": false}', ARRAY['gluten', 'eggs', 'dairy'], ARRAY['regional', 'wallonia', 'pie', 'artisan', 'protected'], 70);

-- Verify count
SELECT 'Belgian dishes inserted: ' || COUNT(*) AS status FROM belgian;
