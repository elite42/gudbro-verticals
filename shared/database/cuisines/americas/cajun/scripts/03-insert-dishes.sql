-- Cajun/Creole Cuisine - Insert Dishes
-- GUDBRO Database Standards v1.7
-- Total: 42 dishes

-- =====================
-- GUMBO (3 dishes)
-- =====================

INSERT INTO cajun (id, slug, name, description, category, status, origin, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CAJ_CHICKEN_ANDOUILLE_GUMBO', 'chicken-andouille-gumbo', 'Chicken and Andouille Gumbo', 'The quintessential Louisiana gumbo: dark roux base with chicken, andouille sausage, the holy trinity, and okra. Served over rice.', 'soup_stew', 'iconic', 'cajun', 'chicken', 'simmered', 90, 2, false, false, false, true, ARRAY['gluten'], ARRAY['gumbo', 'roux', 'comfort_food', 'iconic'], 98),
('CAJ_SEAFOOD_GUMBO', 'seafood-gumbo', 'Seafood Gumbo', 'Rich gumbo loaded with Gulf shrimp, crab, and oysters in a dark roux. The pride of New Orleans seafood restaurants.', 'soup_stew', 'iconic', 'creole', 'mixed', 'simmered', 75, 2, false, false, false, true, ARRAY['shellfish', 'gluten'], ARRAY['gumbo', 'seafood', 'new_orleans', 'premium'], 95),
('CAJ_GUMBO_ZHERBES', 'gumbo-zherbes', 'Gumbo Z''Herbes', 'Traditional Lenten gumbo made with multiple greens (at least 7 for good luck). Originally meatless, now often includes ham or tasso.', 'soup_stew', 'traditional', 'creole', 'pork', 'simmered', 120, 1, false, false, false, true, ARRAY['gluten'], ARRAY['gumbo', 'greens', 'lenten', 'traditional'], 65);

-- =====================
-- RICE DISHES (4 dishes)
-- =====================

INSERT INTO cajun (id, slug, name, description, category, status, origin, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CAJ_JAMBALAYA_CAJUN', 'cajun-jambalaya', 'Cajun Jambalaya', 'Brown jambalaya made without tomatoes: rice cooked with chicken, andouille, and the holy trinity. The Acadiana style.', 'rice', 'iconic', 'cajun', 'mixed', 'braised', 60, 2, false, false, true, true, ARRAY[]::TEXT[], ARRAY['jambalaya', 'one_pot', 'comfort_food', 'iconic'], 95),
('CAJ_JAMBALAYA_CREOLE', 'creole-jambalaya', 'Creole Jambalaya', 'Red jambalaya New Orleans style: rice with shrimp, chicken, andouille, and tomatoes. Also called "red jambalaya".', 'rice', 'iconic', 'creole', 'mixed', 'braised', 60, 2, false, false, true, true, ARRAY['shellfish'], ARRAY['jambalaya', 'new_orleans', 'tomato', 'iconic'], 96),
('CAJ_RED_BEANS_RICE', 'red-beans-and-rice', 'Red Beans and Rice', 'Monday tradition in New Orleans: creamy red beans slow-cooked with ham hock and andouille, served over rice. Louis Armstrong signed letters "Red beans and ricely yours".', 'rice', 'iconic', 'creole', 'pork', 'simmered', 180, 1, false, false, true, true, ARRAY[]::TEXT[], ARRAY['beans', 'comfort_food', 'monday', 'tradition'], 92),
('CAJ_DIRTY_RICE', 'dirty-rice', 'Dirty Rice', 'Rice "dirtied" with chicken livers, gizzards, and ground pork. A Cajun soul food classic that wastes nothing.', 'rice', 'classic', 'cajun', 'pork', 'sauteed', 45, 2, false, false, true, true, ARRAY[]::TEXT[], ARRAY['rice', 'offal', 'soul_food', 'thrifty'], 82);

-- =====================
-- SEAFOOD (8 dishes)
-- =====================

INSERT INTO cajun (id, slug, name, description, category, status, origin, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CAJ_CRAWFISH_ETOUFFEE', 'crawfish-etouffee', 'Crawfish Étouffée', 'Crawfish "smothered" in a rich butter-based roux with the holy trinity. The crown jewel of Cajun crawfish cooking.', 'seafood', 'iconic', 'cajun', 'crawfish', 'braised', 45, 2, false, false, false, false, ARRAY['shellfish', 'dairy', 'gluten'], ARRAY['etouffee', 'crawfish', 'butter', 'iconic'], 94),
('CAJ_SHRIMP_CREOLE', 'shrimp-creole', 'Shrimp Creole', 'Gulf shrimp in a spicy tomato sauce with the holy trinity. A New Orleans classic that showcases Creole-style tomato use.', 'seafood', 'iconic', 'creole', 'shrimp', 'simmered', 40, 2, false, false, true, true, ARRAY['shellfish'], ARRAY['shrimp', 'tomato', 'new_orleans', 'creole'], 90),
('CAJ_CRAWFISH_BOIL', 'crawfish-boil', 'Crawfish Boil', 'Louisiana social event: live crawfish boiled with corn, potatoes, and fierce spices, then dumped on newspaper-covered tables.', 'seafood', 'iconic', 'cajun', 'crawfish', 'boiled', 60, 3, false, false, true, true, ARRAY['shellfish'], ARRAY['boil', 'party', 'outdoor', 'social'], 92),
('CAJ_BBQ_SHRIMP', 'new-orleans-bbq-shrimp', 'New Orleans BBQ Shrimp', 'Not actually barbecued: head-on shrimp sautéed in a peppery butter-Worcestershire sauce. Served with French bread for sopping.', 'seafood', 'classic', 'creole', 'shrimp', 'sauteed', 25, 2, false, false, false, false, ARRAY['shellfish', 'dairy', 'gluten'], ARRAY['bbq', 'butter', 'worcestershire', 'messy'], 88),
('CAJ_OYSTERS_ROCKEFELLER', 'oysters-rockefeller', 'Oysters Rockefeller', 'Invented at Antoine''s in 1899: oysters baked with a rich green sauce of herbs and butter, so rich they named it after Rockefeller.', 'seafood', 'iconic', 'creole', 'oyster', 'baked', 30, 0, false, false, false, false, ARRAY['shellfish', 'dairy', 'gluten'], ARRAY['oyster', 'baked', 'fancy', 'antoines'], 85),
('CAJ_FRIED_CATFISH', 'fried-catfish', 'Fried Catfish', 'Mississippi River catfish dredged in seasoned cornmeal and fried crispy. The soul food of the bayou.', 'fried', 'classic', 'cajun', 'catfish', 'deep_fried', 25, 1, false, false, true, true, ARRAY['fish'], ARRAY['fried', 'cornmeal', 'soul_food', 'river'], 85),
('CAJ_CRAB_CAKES', 'louisiana-crab-cakes', 'Louisiana Crab Cakes', 'Blue crab cakes with Creole seasoning, pan-fried golden and served with remoulade sauce.', 'seafood', 'classic', 'creole', 'crab', 'pan_fried', 35, 1, false, false, false, false, ARRAY['shellfish', 'eggs', 'gluten'], ARRAY['crab', 'cakes', 'remoulade', 'appetizer'], 82),
('CAJ_CRAWFISH_PIE', 'crawfish-pie', 'Crawfish Pie', 'Savory pie filled with crawfish tails in a creamy Cajun sauce. Immortalized in the song "Jambalaya".', 'seafood', 'traditional', 'cajun', 'crawfish', 'baked', 75, 1, false, false, false, false, ARRAY['shellfish', 'dairy', 'gluten', 'eggs'], ARRAY['pie', 'savory', 'traditional', 'comfort_food'], 75);

-- =====================
-- SANDWICHES (4 dishes)
-- =====================

INSERT INTO cajun (id, slug, name, description, category, status, origin, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CAJ_SHRIMP_POBOY', 'shrimp-poboy', 'Shrimp Po''Boy', 'Crispy fried shrimp piled on French bread with lettuce, tomato, and remoulade. The quintessential New Orleans sandwich.', 'fried', 'iconic', 'creole', 'shrimp', 'deep_fried', 30, 1, false, false, false, true, ARRAY['shellfish', 'gluten'], ARRAY['poboy', 'sandwich', 'fried', 'iconic'], 95),
('CAJ_OYSTER_POBOY', 'oyster-poboy', 'Oyster Po''Boy', 'Cornmeal-crusted fried oysters on crusty French bread. A New Orleans original since the 1920s.', 'fried', 'iconic', 'creole', 'oyster', 'deep_fried', 30, 0, false, false, false, true, ARRAY['shellfish', 'gluten'], ARRAY['poboy', 'oyster', 'fried', 'classic'], 88),
('CAJ_ROAST_BEEF_POBOY', 'roast-beef-poboy', 'Roast Beef Po''Boy', 'Slow-roasted beef with rich gravy (debris) on French bread. The "dressed" version adds lettuce, tomato, and mayo.', 'meat', 'iconic', 'creole', 'beef', 'braised', 180, 1, false, false, false, true, ARRAY['gluten'], ARRAY['poboy', 'roast_beef', 'gravy', 'classic'], 90),
('CAJ_MUFFULETTA', 'muffuletta', 'Muffuletta', 'Italian-Creole giant: round sesame bread stuffed with cold cuts, cheese, and olive salad. Invented at Central Grocery in 1906.', 'meat', 'iconic', 'creole', 'pork', 'assembled', 20, 0, false, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['italian', 'sandwich', 'olive_salad', 'iconic'], 88);

-- =====================
-- MEAT (6 dishes)
-- =====================

INSERT INTO cajun (id, slug, name, description, category, status, origin, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CAJ_BOUDIN', 'boudin', 'Boudin', 'Cajun rice sausage: pork, rice, and seasonings stuffed in casing. Eaten straight from the casing or as boudin balls.', 'meat', 'iconic', 'cajun', 'pork', 'steamed', 90, 2, false, false, true, true, ARRAY[]::TEXT[], ARRAY['sausage', 'rice', 'gas_station', 'iconic'], 90),
('CAJ_BOUDIN_BALLS', 'boudin-balls', 'Boudin Balls', 'Deep-fried spheres of boudin filling, crispy outside and rice-porky inside. Louisiana bar snack perfection.', 'fried', 'classic', 'cajun', 'pork', 'deep_fried', 45, 2, false, false, false, true, ARRAY['gluten'], ARRAY['fried', 'appetizer', 'bar_food', 'boudin'], 85),
('CAJ_GRILLADES_GRITS', 'grillades-and-grits', 'Grillades and Grits', 'Tender braised beef or veal medallions in tomato gravy served over creamy grits. New Orleans brunch royalty.', 'meat', 'classic', 'creole', 'beef', 'braised', 90, 1, false, false, true, false, ARRAY['dairy'], ARRAY['brunch', 'grits', 'braised', 'creole'], 80),
('CAJ_FRIED_ALLIGATOR', 'fried-alligator', 'Fried Alligator', 'Louisiana swamp specialty: alligator meat marinated, breaded, and fried. Tastes like a cross between chicken and fish.', 'fried', 'regional', 'cajun', 'alligator', 'deep_fried', 45, 1, false, false, false, true, ARRAY['gluten'], ARRAY['alligator', 'fried', 'exotic', 'swamp'], 70),
('CAJ_BLACKENED_CHICKEN', 'blackened-chicken', 'Blackened Chicken', 'Chicken coated in Cajun spices and seared in a cast iron skillet until charred. Paul Prudhomme''s 1980s revolution.', 'meat', 'classic', 'cajun', 'chicken', 'pan_seared', 25, 3, false, false, true, false, ARRAY['dairy'], ARRAY['blackened', 'spicy', 'cast_iron', 'prudhomme'], 85),
('CAJ_BLACKENED_REDFISH', 'blackened-redfish', 'Blackened Redfish', 'The dish that started it all: redfish coated in butter and Cajun spices, seared until the coating turns black. Chef Paul Prudhomme''s masterpiece.', 'seafood', 'iconic', 'cajun', 'catfish', 'pan_seared', 20, 3, false, false, true, false, ARRAY['fish', 'dairy'], ARRAY['blackened', 'redfish', 'prudhomme', 'iconic'], 88);

-- =====================
-- DESSERTS (6 dishes)
-- =====================

INSERT INTO cajun (id, slug, name, description, category, status, origin, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CAJ_BEIGNETS', 'beignets', 'Beignets', 'Square French doughnuts buried under powdered sugar. Best enjoyed at Café Du Monde with chicory coffee at 3am.', 'dessert', 'iconic', 'creole', NULL, 'deep_fried', 45, 0, true, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['beignets', 'cafe_du_monde', 'french', 'iconic'], 98),
('CAJ_PRALINES', 'pralines', 'Pralines', 'Creamy brown sugar and pecan confections. New Orleans pralines are softer and creamier than French pralines.', 'dessert', 'iconic', 'creole', NULL, 'boiled', 30, 0, true, false, true, false, ARRAY['dairy', 'tree_nuts'], ARRAY['pralines', 'candy', 'pecan', 'classic'], 90),
('CAJ_BANANAS_FOSTER', 'bananas-foster', 'Bananas Foster', 'Bananas sautéed in butter, brown sugar, and rum, then flambéed tableside. Created at Brennan''s in 1951.', 'dessert', 'iconic', 'creole', NULL, 'flambed', 15, 0, true, false, true, false, ARRAY['dairy'], ARRAY['flambe', 'bananas', 'brennans', 'tableside'], 88),
('CAJ_BREAD_PUDDING', 'new-orleans-bread-pudding', 'New Orleans Bread Pudding', 'French bread soaked in custard, baked, and drowned in whiskey sauce. The ultimate Louisiana comfort dessert.', 'dessert', 'classic', 'creole', NULL, 'baked', 75, 0, true, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['bread_pudding', 'whiskey', 'comfort', 'classic'], 85),
('CAJ_KING_CAKE', 'king-cake', 'King Cake', 'Mardi Gras tradition: cinnamon roll-style cake decorated in purple, gold, and green with a baby hidden inside.', 'dessert', 'iconic', 'creole', NULL, 'baked', 180, 0, true, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['mardi_gras', 'king_cake', 'seasonal', 'tradition'], 85),
('CAJ_PECAN_PIE', 'louisiana-pecan-pie', 'Louisiana Pecan Pie', 'Classic Southern pecan pie with Louisiana pecans and a touch of bourbon. Rich, gooey, and essential.', 'dessert', 'classic', 'both', NULL, 'baked', 75, 0, true, false, false, false, ARRAY['gluten', 'dairy', 'eggs', 'tree_nuts'], ARRAY['pie', 'pecan', 'bourbon', 'southern'], 82);

-- =====================
-- BEVERAGES (5 dishes)
-- =====================

INSERT INTO cajun (id, slug, name, description, category, status, origin, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CAJ_CHICORY_COFFEE', 'chicory-coffee', 'Chicory Coffee', 'New Orleans coffee tradition: dark roast blended with roasted chicory root for a slightly bitter, earthy flavor. Best with beignets.', 'beverage', 'iconic', 'creole', NULL, 'brewed', 10, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['coffee', 'chicory', 'cafe_du_monde', 'tradition'], 90),
('CAJ_CAFE_AU_LAIT', 'cafe-au-lait', 'Café au Lait', 'Hot chicory coffee mixed half and half with hot milk. The traditional accompaniment to beignets in New Orleans.', 'beverage', 'iconic', 'creole', NULL, 'brewed', 10, 0, true, false, true, false, ARRAY['dairy'], ARRAY['coffee', 'milk', 'breakfast', 'french'], 88),
('CAJ_HURRICANE', 'hurricane', 'Hurricane', 'Pat O''Brien''s famous rum punch: light and dark rum, passion fruit, and citrus. Served in a hurricane lamp-shaped glass.', 'beverage', 'iconic', 'creole', NULL, 'mixed', 5, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['cocktail', 'rum', 'pat_obriens', 'bourbon_street'], 92),
('CAJ_SAZERAC', 'sazerac', 'Sazerac', 'The official cocktail of New Orleans: rye whiskey, Peychaud''s bitters, absinthe rinse, and a lemon peel. America''s first cocktail.', 'beverage', 'iconic', 'creole', NULL, 'stirred', 5, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['cocktail', 'rye', 'classic', 'official'], 88),
('CAJ_RAMOS_GIN_FIZZ', 'ramos-gin-fizz', 'Ramos Gin Fizz', 'New Orleans brunch classic: gin shaken with cream, egg white, and orange flower water until frothy. Takes 12 minutes to shake properly.', 'beverage', 'classic', 'creole', NULL, 'shaken', 15, 0, true, false, true, false, ARRAY['dairy', 'eggs'], ARRAY['cocktail', 'gin', 'brunch', 'fizz'], 78);

-- =====================
-- SIDES (6 dishes)
-- =====================

INSERT INTO cajun (id, slug, name, description, category, status, origin, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CAJ_HUSH_PUPPIES', 'hush-puppies', 'Hush Puppies', 'Deep-fried cornmeal balls, crispy outside and tender inside. Named for throwing scraps to quiet the dogs.', 'fried', 'classic', 'cajun', NULL, 'deep_fried', 25, 0, true, false, true, false, ARRAY['dairy', 'eggs'], ARRAY['cornmeal', 'fried', 'side', 'southern'], 82),
('CAJ_FRIED_GREEN_TOMATOES', 'fried-green-tomatoes', 'Fried Green Tomatoes', 'Unripe tomatoes coated in cornmeal and fried until golden. A Southern staple with Cajun remoulade.', 'fried', 'classic', 'both', NULL, 'deep_fried', 25, 0, true, false, true, false, ARRAY['eggs'], ARRAY['tomato', 'fried', 'southern', 'appetizer'], 78),
('CAJ_MAQUE_CHOUX', 'maque-choux', 'Maque Choux', 'Cajun corn dish: fresh corn sautéed with the holy trinity, tomatoes, and cream. A beloved summer side.', 'cajun', 'traditional', 'cajun', NULL, 'sauteed', 35, 1, true, false, true, false, ARRAY['dairy'], ARRAY['corn', 'summer', 'traditional', 'vegetable'], 72),
('CAJ_CHEESE_GRITS', 'cheese-grits', 'Cheese Grits', 'Creamy stone-ground grits loaded with sharp cheddar and butter. The foundation of many Cajun-Creole dishes.', 'cajun', 'classic', 'both', NULL, 'boiled', 30, 0, true, false, true, false, ARRAY['dairy'], ARRAY['grits', 'cheese', 'side', 'comfort'], 85),
('CAJ_COLESLAW', 'cajun-coleslaw', 'Cajun Coleslaw', 'Spicy Cajun twist on classic coleslaw with Creole mustard and hot sauce. Perfect topping for po''boys.', 'cajun', 'classic', 'cajun', NULL, 'raw', 15, 1, true, false, true, true, ARRAY['eggs'], ARRAY['slaw', 'side', 'spicy', 'bbq'], 75),
('CAJ_CORNBREAD', 'louisiana-cornbread', 'Louisiana Cornbread', 'Southern-style cornbread baked in a cast iron skillet. Slightly sweet with crispy edges from the hot buttered pan.', 'bread', 'classic', 'both', NULL, 'baked', 35, 0, true, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['cornbread', 'side', 'cast_iron', 'southern'], 80);

-- Verify
SELECT 'Inserted ' || COUNT(*) || ' Cajun/Creole dishes' AS status FROM cajun;
SELECT category, COUNT(*) FROM cajun GROUP BY category ORDER BY COUNT(*) DESC;
