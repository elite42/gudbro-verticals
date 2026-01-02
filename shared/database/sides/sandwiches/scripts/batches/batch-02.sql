-- SANDWICHES Batch 2
-- Items: 11 to 20 of 50
-- Generated: 2025-12-15T12:52:44.858Z

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-croque-monsieur', 'croque-monsieur', '{"en":"Croque Monsieur","it":"Croque Monsieur","vi":"Croque Monsieur"}'::jsonb, '{"en":"Classic French grilled ham and cheese sandwich with béchamel sauce and Gruyère","it":"Classico sandwich francese grigliato con prosciutto, formaggio, besciamella e Gruyère","vi":"Bánh mì nướng Pháp cổ điển với giăm bông, phô mai, sốt béchamel và Gruyère"}'::jsonb, NULL, 'classic', 'french', '{"french","hot","cheese","ham","classic"}', 'pain_de_mie', true, true, '{"ham"}', '{"gruyere","bechamel"}', '{}', '{"bechamel","dijon_mustard"}', true, false, '{"country":"France","country_code":"FR","region":"Paris"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","champagne"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk","eggs"],"calories_estimate":620,"protein_g":28,"carbs_g":42,"fat_g":38,"fiber_g":2}'::jsonb, NULL, '{}', 88, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-croque-madame', 'croque-madame', '{"en":"Croque Madame","it":"Croque Madame","vi":"Croque Madame"}'::jsonb, '{"en":"Croque Monsieur topped with a fried egg","it":"Croque Monsieur con uovo fritto sopra","vi":"Croque Monsieur với trứng chiên phía trên"}'::jsonb, NULL, 'classic', 'french', '{"french","hot","cheese","egg","brunch"}', 'pain_de_mie', true, true, '{"ham","fried_egg"}', '{"gruyere","bechamel"}', '{}', '{"bechamel","dijon_mustard"}', true, false, '{"country":"France","country_code":"FR","region":"Paris"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","mimosa"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk","eggs"],"calories_estimate":720,"protein_g":34,"carbs_g":42,"fat_g":44,"fiber_g":2}'::jsonb, NULL, '{}', 86, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-jambon-beurre', 'jambon-beurre', '{"en":"Jambon-Beurre","it":"Jambon-Beurre","vi":"Jambon-Beurre"}'::jsonb, '{"en":"The quintessential Parisian sandwich: ham and butter on a fresh baguette","it":"Il sandwich parigino per eccellenza: prosciutto e burro su baguette fresca","vi":"Bánh mì Paris tinh túy: giăm bông và bơ trên bánh baguette tươi"}'::jsonb, NULL, 'classic', 'french', '{"french","simple","classic","paris","baguette"}', 'baguette', false, false, '{"ham"}', '{}', '{}', '{"butter"}', false, false, '{"country":"France","country_code":"FR","region":"Paris"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["red_wine","beer"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk"],"calories_estimate":450,"protein_g":22,"carbs_g":48,"fat_g":18,"fiber_g":2}'::jsonb, NULL, '{}', 82, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-club', 'club-sandwich', '{"en":"Club Sandwich","it":"Club Sandwich","vi":"Club Sandwich"}'::jsonb, '{"en":"Triple-decker sandwich with turkey, bacon, lettuce, tomato, and mayonnaise","it":"Sandwich a tre strati con tacchino, bacon, lattuga, pomodoro e maionese","vi":"Bánh mì ba tầng với gà tây, bacon, rau xà lách, cà chua và mayonnaise"}'::jsonb, NULL, 'classic', 'american', '{"american","classic","triple-decker","turkey","bacon"}', 'white_toast', true, false, '{"turkey","bacon"}', '{}', '{"lettuce","tomato"}', '{"mayonnaise"}', false, false, '{"country":"USA","country_code":"US","region":"New York"}'::jsonb, NULL, '{"portion_size":"large","is_shareable":false,"recommended_pairing":["iced_tea","cola","beer"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","eggs"],"calories_estimate":580,"protein_g":35,"carbs_g":45,"fat_g":28,"fiber_g":3}'::jsonb, NULL, '{}', 90, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-blt', 'blt-sandwich', '{"en":"BLT Sandwich","it":"BLT Sandwich","vi":"Bánh Mì BLT"}'::jsonb, '{"en":"Bacon, lettuce, and tomato on toasted bread with mayonnaise","it":"Bacon, lattuga e pomodoro su pane tostato con maionese","vi":"Bacon, rau xà lách và cà chua trên bánh mì nướng với mayonnaise"}'::jsonb, NULL, 'classic', 'american', '{"american","classic","bacon","simple"}', 'white_toast', true, false, '{"bacon"}', '{}', '{"lettuce","tomato"}', '{"mayonnaise"}', false, false, '{"country":"USA","country_code":"US"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["iced_tea","cola"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","eggs"],"calories_estimate":420,"protein_g":18,"carbs_g":38,"fat_g":22,"fiber_g":3}'::jsonb, NULL, '{}', 88, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-reuben', 'reuben-sandwich', '{"en":"Reuben Sandwich","it":"Reuben Sandwich","vi":"Bánh Mì Reuben"}'::jsonb, '{"en":"Corned beef, Swiss cheese, sauerkraut, and Russian dressing on grilled rye bread","it":"Carne in salamoia, formaggio svizzero, crauti e salsa russa su pane di segale grigliato","vi":"Thịt bò muối, phô mai Thụy Sĩ, dưa cải bắp và sốt Nga trên bánh mì lúa mạch nướng"}'::jsonb, NULL, 'classic', 'american', '{"american","deli","jewish","corned_beef","grilled"}', 'rye_bread', true, true, '{"corned_beef"}', '{"swiss"}', '{"sauerkraut"}', '{"russian_dressing"}', true, true, '{"country":"USA","country_code":"US","region":"New York"}'::jsonb, NULL, '{"portion_size":"large","is_shareable":false,"recommended_pairing":["beer","pickle"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk","eggs"],"calories_estimate":680,"protein_g":38,"carbs_g":48,"fat_g":36,"fiber_g":4}'::jsonb, NULL, '{}', 84, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-philly-cheesesteak', 'philly-cheesesteak', '{"en":"Philly Cheesesteak","it":"Philly Cheesesteak","vi":"Philly Cheesesteak"}'::jsonb, '{"en":"Thinly sliced ribeye steak with melted cheese on a hoagie roll - Philadelphia classic","it":"Fettine sottili di ribeye con formaggio fuso su panino hoagie - classico di Philadelphia","vi":"Lát thịt bò ribeye mỏng với phô mai tan chảy trên bánh mì hoagie - cổ điển Philadelphia"}'::jsonb, NULL, 'classic', 'american', '{"american","philadelphia","steak","cheese","hot"}', 'hoagie_roll', true, false, '{"ribeye_steak"}', '{"cheez_whiz","provolone"}', '{"onion","peppers"}', '{}', true, false, '{"country":"USA","country_code":"US","region":"Pennsylvania","city":"Philadelphia"}'::jsonb, NULL, '{"portion_size":"large","is_shareable":false,"recommended_pairing":["beer","cola"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk"],"calories_estimate":780,"protein_g":45,"carbs_g":52,"fat_g":42,"fiber_g":3}'::jsonb, NULL, '{}', 92, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-po-boy', 'po-boy', '{"en":"Po'' Boy","it":"Po'' Boy","vi":"Po'' Boy"}'::jsonb, '{"en":"New Orleans classic with fried shrimp or oysters on French bread with lettuce, tomato, and remoulade","it":"Classico di New Orleans con gamberi o ostriche fritte su pane francese con lattuga, pomodoro e remoulade","vi":"Món cổ điển New Orleans với tôm hoặc hàu chiên trên bánh mì Pháp với xà lách, cà chua và sốt remoulade"}'::jsonb, NULL, 'classic', 'american', '{"american","new_orleans","seafood","fried","cajun"}', 'french_bread', true, false, '{"fried_shrimp"}', '{}', '{"lettuce","tomato","pickles"}', '{"remoulade","hot_sauce"}', true, false, '{"country":"USA","country_code":"US","region":"Louisiana","city":"New Orleans"}'::jsonb, NULL, '{"portion_size":"large","is_shareable":false,"recommended_pairing":["beer","iced_tea"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","shellfish","eggs"],"calories_estimate":650,"protein_g":28,"carbs_g":62,"fat_g":32,"fiber_g":3}'::jsonb, NULL, '{}', 80, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-cubano', 'cubano-sandwich', '{"en":"Cuban Sandwich","it":"Sandwich Cubano","vi":"Bánh Mì Cuba"}'::jsonb, '{"en":"Pressed sandwich with roast pork, ham, Swiss cheese, pickles, and mustard on Cuban bread","it":"Sandwich pressato con maiale arrosto, prosciutto, formaggio svizzero, sottaceti e senape su pane cubano","vi":"Bánh mì ép với thịt heo quay, giăm bông, phô mai Thụy Sĩ, dưa chuột muối và mù tạt trên bánh mì Cuba"}'::jsonb, NULL, 'classic', 'cuban', '{"cuban","pressed","pork","hot","classic"}', 'cuban_bread', true, false, '{"roast_pork","ham"}', '{"swiss"}', '{"pickles"}', '{"yellow_mustard"}', true, true, '{"country":"Cuba / USA","country_code":"CU","region":"Tampa / Miami"}'::jsonb, NULL, '{"portion_size":"large","is_shareable":true,"recommended_pairing":["beer","mojito"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk"],"calories_estimate":720,"protein_g":42,"carbs_g":55,"fat_g":35,"fiber_g":2}'::jsonb, NULL, '{}', 88, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-banh-mi', 'banh-mi', '{"en":"Bánh Mì","it":"Bánh Mì","vi":"Bánh Mì"}'::jsonb, '{"en":"Vietnamese baguette with grilled pork, pâté, pickled vegetables, cilantro, and jalapeño","it":"Baguette vietnamita con maiale grigliato, paté, verdure in agrodolce, coriandolo e jalapeño","vi":"Bánh mì Việt Nam với thịt heo nướng, pate, đồ chua, rau mùi và ớt"}'::jsonb, NULL, 'classic', 'vietnamese', '{"vietnamese","fusion","pork","fresh","street_food"}', 'vietnamese_baguette', true, false, '{"grilled_pork","pate"}', '{}', '{"pickled_carrot","pickled_daikon","cucumber","cilantro","jalapeno"}', '{"mayonnaise","maggi_sauce"}', false, false, '{"country":"Vietnam","country_code":"VN","region":"Ho Chi Minh City / Hanoi"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["iced_coffee","beer","tra_da"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","eggs"],"calories_estimate":480,"protein_g":26,"carbs_g":52,"fat_g":18,"fiber_g":4}'::jsonb, NULL, '{}', 94, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();