-- SANDWICHES Batch 3
-- Items: 21 to 30 of 50
-- Generated: 2025-12-15T12:52:44.859Z

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-shawarma-pita', 'shawarma-pita', '{"en":"Shawarma Pita","it":"Shawarma in Pita","vi":"Shawarma Pita"}'::jsonb, '{"en":"Spit-roasted meat (chicken or lamb) in pita with tahini, pickles, and vegetables","it":"Carne arrostita allo spiedo (pollo o agnello) in pita con tahini, sottaceti e verdure","vi":"Thịt nướng xiên (gà hoặc cừu) trong bánh pita với sốt tahini, dưa chuột muối và rau"}'::jsonb, NULL, 'classic', 'middle_eastern', '{"middle_eastern","shawarma","pita","halal","street_food"}', 'pita', true, false, '{"chicken_shawarma"}', '{}', '{"tomato","onion","lettuce","pickles"}', '{"tahini","garlic_sauce","hot_sauce"}', true, false, '{"country":"Middle East","country_code":"LB","region":"Lebanon / Syria"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["ayran","mint_lemonade"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":false,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","sesame"],"calories_estimate":520,"protein_g":32,"carbs_g":45,"fat_g":22,"fiber_g":4}'::jsonb, NULL, '{}', 90, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-falafel-pita', 'falafel-pita', '{"en":"Falafel Pita","it":"Falafel in Pita","vi":"Falafel Pita"}'::jsonb, '{"en":"Crispy falafel balls in pita with hummus, tahini, and fresh vegetables","it":"Polpette croccanti di falafel in pita con hummus, tahini e verdure fresche","vi":"Viên falafel giòn trong bánh pita với hummus, tahini và rau tươi"}'::jsonb, NULL, 'classic', 'middle_eastern', '{"middle_eastern","vegan","vegetarian","falafel","healthy"}', 'pita', true, false, '{"falafel"}', '{}', '{"tomato","cucumber","onion","lettuce","pickled_turnip"}', '{"hummus","tahini","hot_sauce"}', true, false, '{"country":"Middle East","country_code":"IL","region":"Israel / Lebanon / Egypt"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["mint_lemonade","ayran"]}'::jsonb, '{"is_vegetarian":true,"is_vegan":true,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":false,"is_halal":true,"is_kosher":true,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","sesame"],"calories_estimate":480,"protein_g":18,"carbs_g":58,"fat_g":20,"fiber_g":10}'::jsonb, NULL, '{}', 88, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-torta-ahogada', 'torta-ahogada', '{"en":"Torta Ahogada","it":"Torta Ahogada","vi":"Torta Ahogada"}'::jsonb, '{"en":"Drowned sandwich from Guadalajara with carnitas, drenched in spicy tomato sauce","it":"Sandwich \"affogato\" di Guadalajara con carnitas, immerso in salsa di pomodoro piccante","vi":"Bánh mì ngập từ Guadalajara với carnitas, ngập trong sốt cà chua cay"}'::jsonb, NULL, 'traditional', 'mexican', '{"mexican","spicy","pork","street_food","guadalajara"}', 'birote', false, false, '{"carnitas"}', '{}', '{"onion"}', '{"spicy_tomato_sauce","refried_beans"}', true, false, '{"country":"Mexico","country_code":"MX","region":"Jalisco","city":"Guadalajara"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["beer","agua_fresca"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten"],"calories_estimate":580,"protein_g":32,"carbs_g":55,"fat_g":24,"fiber_g":4}'::jsonb, NULL, '{}', 78, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-chicken-caesar-wrap', 'chicken-caesar-wrap', '{"en":"Chicken Caesar Wrap","it":"Wrap Pollo Caesar","vi":"Wrap Gà Caesar"}'::jsonb, '{"en":"Grilled chicken, romaine lettuce, parmesan, and Caesar dressing in a flour tortilla","it":"Pollo grigliato, lattuga romana, parmigiano e salsa Caesar in tortilla di farina","vi":"Gà nướng, xà lách romaine, parmesan và sốt Caesar trong bánh tortilla bột mì"}'::jsonb, NULL, 'classic', 'american', '{"wrap","chicken","caesar","healthy","lunch"}', 'flour_tortilla', false, true, '{"grilled_chicken"}', '{"parmesan"}', '{"romaine_lettuce"}', '{"caesar_dressing"}', false, false, '{"country":"USA","country_code":"US"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["iced_tea","lemonade"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk","eggs","fish"],"calories_estimate":520,"protein_g":35,"carbs_g":38,"fat_g":26,"fiber_g":3}'::jsonb, NULL, '{}', 88, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-veggie-hummus-wrap', 'veggie-hummus-wrap', '{"en":"Veggie Hummus Wrap","it":"Wrap Verdure e Hummus","vi":"Wrap Rau Hummus"}'::jsonb, '{"en":"Fresh vegetables, creamy hummus, and feta cheese in a whole wheat wrap","it":"Verdure fresche, hummus cremoso e feta in wrap integrale","vi":"Rau tươi, hummus kem và phô mai feta trong bánh wrap nguyên cám"}'::jsonb, NULL, 'modern', 'healthy', '{"wrap","vegetarian","healthy","hummus","fresh"}', 'whole_wheat_tortilla', false, false, '{}', '{"feta"}', '{"cucumber","tomato","red_onion","bell_pepper","spinach"}', '{"hummus"}', false, false, '{"country":"USA","country_code":"US"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["green_smoothie","sparkling_water"]}'::jsonb, '{"is_vegetarian":true,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":false,"is_halal":true,"is_kosher":true,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":false,"allergens":["gluten","milk","sesame"],"calories_estimate":380,"protein_g":14,"carbs_g":48,"fat_g":16,"fiber_g":8}'::jsonb, NULL, '{}', 82, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-buffalo-chicken-wrap', 'buffalo-chicken-wrap', '{"en":"Buffalo Chicken Wrap","it":"Wrap Pollo Buffalo","vi":"Wrap Gà Buffalo"}'::jsonb, '{"en":"Crispy buffalo chicken, blue cheese, celery, and ranch dressing in a tortilla","it":"Pollo croccante buffalo, gorgonzola, sedano e salsa ranch in tortilla","vi":"Gà buffalo giòn, phô mai xanh, cần tây và sốt ranch trong bánh tortilla"}'::jsonb, NULL, 'modern', 'american', '{"wrap","chicken","spicy","buffalo","american"}', 'flour_tortilla', false, false, '{"fried_chicken"}', '{"blue_cheese"}', '{"celery","lettuce"}', '{"buffalo_sauce","ranch_dressing"}', true, false, '{"country":"USA","country_code":"US","region":"New York","city":"Buffalo"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["beer","cola"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk","eggs"],"calories_estimate":680,"protein_g":32,"carbs_g":48,"fat_g":40,"fiber_g":3}'::jsonb, NULL, '{}', 85, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-greek-wrap', 'greek-wrap', '{"en":"Greek Wrap","it":"Wrap Greco","vi":"Wrap Hy Lạp"}'::jsonb, '{"en":"Grilled chicken or lamb, feta, olives, tomatoes, and tzatziki in a pita wrap","it":"Pollo o agnello grigliato, feta, olive, pomodori e tzatziki in pita","vi":"Gà hoặc cừu nướng, feta, oliu, cà chua và tzatziki trong bánh pita"}'::jsonb, NULL, 'classic', 'greek', '{"wrap","greek","mediterranean","tzatziki","healthy"}', 'pita', true, false, '{"grilled_chicken"}', '{"feta"}', '{"tomato","cucumber","red_onion","olives"}', '{"tzatziki"}', true, false, '{"country":"Greece","country_code":"GR"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","ouzo"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk"],"calories_estimate":520,"protein_g":34,"carbs_g":42,"fat_g":24,"fiber_g":4}'::jsonb, NULL, '{}', 86, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-breakfast-burrito', 'breakfast-burrito', '{"en":"Breakfast Burrito","it":"Burrito Colazione","vi":"Burrito Bữa Sáng"}'::jsonb, '{"en":"Scrambled eggs, bacon, cheese, hash browns, and salsa in a large flour tortilla","it":"Uova strapazzate, bacon, formaggio, hash browns e salsa in tortilla grande","vi":"Trứng bác, bacon, phô mai, khoai tây chiên và salsa trong bánh tortilla lớn"}'::jsonb, NULL, 'classic', 'mexican_american', '{"wrap","breakfast","eggs","bacon","hearty"}', 'large_flour_tortilla', false, true, '{"scrambled_eggs","bacon"}', '{"cheddar"}', '{"hash_browns"}', '{"salsa","sour_cream"}', true, false, '{"country":"USA / Mexico","country_code":"US","region":"Southwest"}'::jsonb, NULL, '{"portion_size":"large","is_shareable":false,"recommended_pairing":["coffee","orange_juice"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk","eggs"],"calories_estimate":720,"protein_g":32,"carbs_g":58,"fat_g":40,"fiber_g":4}'::jsonb, NULL, '{}', 90, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-vietnamese-spring-roll', 'goi-cuon', '{"en":"Vietnamese Fresh Spring Rolls","it":"Involtini Primavera Vietnamiti Freschi","vi":"Gỏi Cuốn"}'::jsonb, '{"en":"Fresh rice paper rolls with shrimp, pork, vermicelli, herbs, and peanut dipping sauce","it":"Involtini di carta di riso freschi con gamberi, maiale, vermicelli, erbe e salsa di arachidi","vi":"Gỏi cuốn tươi với tôm, thịt heo, bún, rau thơm và nước chấm đậu phộng"}'::jsonb, NULL, 'classic', 'vietnamese', '{"vietnamese","fresh","healthy","gluten_free","light"}', 'rice_paper', false, false, '{"shrimp","pork"}', '{}', '{"lettuce","mint","cilantro","bean_sprouts"}', '{"peanut_sauce","hoisin_sauce"}', false, false, '{"country":"Vietnam","country_code":"VN"}'::jsonb, NULL, '{"portion_size":"small","is_shareable":true,"recommended_pairing":["iced_tea","beer"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":true,"is_dairy_free":true,"is_nut_free":false,"is_halal":false,"is_kosher":false,"is_low_carb":true,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","peanuts"],"calories_estimate":180,"protein_g":12,"carbs_g":22,"fat_g":4,"fiber_g":2}'::jsonb, NULL, '{}', 88, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-doner-durum', 'doner-durum', '{"en":"Döner Dürüm","it":"Döner Dürüm","vi":"Döner Dürüm"}'::jsonb, '{"en":"Turkish döner kebab wrapped in lavash flatbread with vegetables and sauces","it":"Döner kebab turco avvolto in pane lavash con verdure e salse","vi":"Döner kebab Thổ Nhĩ Kỳ cuộn trong bánh lavash với rau và sốt"}'::jsonb, NULL, 'classic', 'turkish', '{"turkish","doner","wrap","street_food","halal"}', 'lavash', true, false, '{"doner_meat"}', '{}', '{"tomato","onion","lettuce","cabbage"}', '{"garlic_sauce","hot_sauce","sumac"}', true, false, '{"country":"Turkey","country_code":"TR"}'::jsonb, NULL, '{"portion_size":"large","is_shareable":false,"recommended_pairing":["ayran","cola"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten"],"calories_estimate":620,"protein_g":38,"carbs_g":52,"fat_g":28,"fiber_g":4}'::jsonb, NULL, '{}', 92, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();