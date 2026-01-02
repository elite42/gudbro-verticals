-- PASTA Batch 8
-- Items: 71 to 80 of 87
-- Generated: 2025-12-15T07:24:52.331Z

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('PASTA_BIBIM_GUKSU', 'bibim-guksu', 'pasta_bibim_guksu_v1', '{"en":"Bibim Guksu","it":"Bibim Guksu","vi":"Mi Tron Han Quoc"}'::jsonb, '{"en":"Spicy cold noodles mixed with gochujang sauce, vegetables, and sesame. Perfect summer lunch.","it":"Noodles freddi piccanti mescolati con salsa gochujang, verdure e sesamo. Pranzo estivo perfetto.","vi":"Mì lạnh cay trộn với sốt gochujang, rau và mè. Bữa trưa mùa hè hoàn hảo."}'::jsonb, NULL, 'classic', 'asian_korean', '{"cold","spicy","gochujang","summer","quick"}', '{"country":"South Korea","country_code":"KR"}'::jsonb, NULL, 'soba', 'wheat', 'spicy', 'cold', '[{"ingredient_id":"ING_SOMYEON","quantity":{"amount":150,"unit":"g"},"is_signature":true},{"ingredient_id":"ING_GOCHUJANG","quantity":{"amount":40,"unit":"g"},"is_signature":true},{"ingredient_id":"ING_SESAME_OIL","quantity":{"amount":15,"unit":"ml"}},{"ingredient_id":"ING_RICE_VINEGAR","quantity":{"amount":15,"unit":"ml"}},{"ingredient_id":"ING_SUGAR","quantity":{"amount":10,"unit":"g"}},{"ingredient_id":"ING_CUCUMBER","quantity":{"amount":50,"unit":"g"}},{"ingredient_id":"ING_KIMCHI","quantity":{"amount":40,"unit":"g"}},{"ingredient_id":"ING_BOILED_EGG","quantity":{"amount":1,"unit":"piece"}},{"ingredient_id":"ING_SESAME_SEEDS","quantity":{"amount":5,"unit":"g"}}]'::jsonb, NULL, '{}', '{"default_portion":"regular","available_portions":["regular","large"],"temperature":"cold","presentation":"bowl"}'::jsonb, '{"profile":["spicy","tangy","sweet","refreshing"],"spice_level":3}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":false,"allergens":["gluten","eggs","sesame","soya"],"calories_estimate":400,"protein_g":14,"carbs_g":62,"fat_g":12,"fiber_g":4}'::jsonb, '{"make_vegetarian":true,"spice_adjustable":true}'::jsonb, '{}', 78, '{"summer","quick-meal","spicy-food-lovers"}', NULL, '{"naengmyeon","japchae"}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-laksa-curry', 'laksa-curry', NULL, '{"en":"Curry Laksa","it":"Laksa al Curry","vi":"Laksa Cà Ri"}'::jsonb, '{"en":"Malaysian spicy coconut curry noodle soup with prawns and tofu puffs","it":"Zuppa di noodle al curry di cocco piccante malese con gamberi e tofu","vi":"Mì súp cà ri dừa cay Malaysia với tôm và đậu phụ chiên"}'::jsonb, NULL, 'active', 'asian_other', '{"malaysian","spicy","coconut","soup"}', '{"country":"Malaysia","region":"Penang"}'::jsonb, NULL, 'other', 'rice', 'tomato', 'soup', '{}', NULL, '{}', '{"portion_size":"large","is_shareable":false,"recommended_pairing":["iced_tea","lime_juice"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":true,"is_dairy_free":true,"is_nut_free":false,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","soy","peanuts"],"calories_estimate":650,"protein_g":28,"carbs_g":55,"fat_g":38,"fiber_g":4}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-char-kway-teow', 'char-kway-teow', NULL, '{"en":"Char Kway Teow","it":"Char Kway Teow","vi":"Hủ Tiếu Xào Singapore"}'::jsonb, '{"en":"Singaporean stir-fried flat rice noodles with prawns, cockles, and Chinese sausage","it":"Noodle di riso piatti saltati singaporiani con gamberi, vongole e salsiccia cinese","vi":"Hủ tiếu xào Singapore với tôm, sò và lạp xưởng"}'::jsonb, NULL, 'active', 'asian_other', '{"singaporean","wok_fried","smoky","street_food"}', '{"country":"Singapore"}'::jsonb, NULL, 'other', 'rice', 'tomato', 'stir_fried', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["iced_tea","lime_juice"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","mollusks","soy","eggs"],"calories_estimate":620,"protein_g":26,"carbs_g":68,"fat_g":28,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-singapore-noodles', 'singapore-noodles', NULL, '{"en":"Singapore Noodles","it":"Noodle Singapore","vi":"Mì Xào Singapore"}'::jsonb, '{"en":"Curry-flavored thin rice noodles with shrimp, pork, and vegetables","it":"Noodle di riso sottili al curry con gamberi, maiale e verdure","vi":"Bún xào cà ri với tôm, thịt heo và rau"}'::jsonb, NULL, 'active', 'asian_other', '{"curry","stir_fried","colorful","quick"}', '{"country":"Hong Kong","notes":"Actually a Hong Kong invention, not Singaporean"}'::jsonb, NULL, 'vermicelli', 'rice', 'tomato', 'stir_fried', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":true,"recommended_pairing":["iced_tea","beer"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":true,"is_dairy_free":true,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","soy","eggs"],"calories_estimate":520,"protein_g":24,"carbs_g":58,"fat_g":22,"fiber_g":3}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-mee-goreng', 'mee-goreng', NULL, '{"en":"Mee Goreng","it":"Mee Goreng","vi":"Mì Xào Indonesia"}'::jsonb, '{"en":"Indonesian spicy fried noodles with sweet soy sauce and vegetables","it":"Noodle fritti piccanti indonesiani con salsa di soia dolce e verdure","vi":"Mì xào cay Indonesia với nước tương ngọt và rau"}'::jsonb, NULL, 'active', 'asian_other', '{"indonesian","spicy","sweet_soy","street_food"}', '{"country":"Indonesia"}'::jsonb, NULL, 'other', 'wheat', 'tomato', 'stir_fried', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["iced_tea","lime_juice"],"garnish":["fried_shallots","lime_wedge","crackers"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","soy","eggs"],"calories_estimate":540,"protein_g":22,"carbs_g":65,"fat_g":22,"fiber_g":4}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-pancit-canton', 'pancit-canton', NULL, '{"en":"Pancit Canton","it":"Pancit Canton","vi":"Mì Xào Philippines"}'::jsonb, '{"en":"Filipino stir-fried egg noodles with vegetables and meat","it":"Noodle all''uovo saltati filippini con verdure e carne","vi":"Mì trứng xào Philippines với rau và thịt"}'::jsonb, NULL, 'active', 'asian_other', '{"filipino","festive","shareable","birthday"}', '{"country":"Philippines"}'::jsonb, NULL, 'other', 'wheat', 'tomato', 'stir_fried', '{}', NULL, '{}', '{"portion_size":"large","is_shareable":true,"recommended_pairing":["calamansi_juice","iced_tea"],"garnish":["calamansi_wedges","fried_garlic"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","shellfish","soy","eggs"],"calories_estimate":480,"protein_g":26,"carbs_g":52,"fat_g":18,"fiber_g":4}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-hokkien-mee', 'hokkien-mee', NULL, '{"en":"Hokkien Mee","it":"Hokkien Mee","vi":"Mì Hokkien"}'::jsonb, '{"en":"Singaporean braised noodles in rich prawn stock with pork and squid","it":"Noodle brasati singaporiani in brodo di gamberi con maiale e calamari","vi":"Mì om Singapore trong nước dùng tôm đậm đà với thịt heo và mực"}'::jsonb, NULL, 'active', 'asian_other', '{"singaporean","rich","prawn_stock","hawker"}', '{"country":"Singapore"}'::jsonb, NULL, 'other', 'wheat', 'broth', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["sambal_chili","lime"],"garnish":["crispy_lard","lime_wedge","sambal"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","mollusks","gluten","eggs"],"calories_estimate":680,"protein_g":32,"carbs_g":58,"fat_g":36,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-bihun-goreng', 'bihun-goreng', NULL, '{"en":"Bihun Goreng","it":"Bihun Goreng","vi":"Bún Xào Indonesia"}'::jsonb, '{"en":"Indonesian fried rice vermicelli with vegetables and sweet soy","it":"Vermicelli di riso fritti indonesiani con verdure e soia dolce","vi":"Bún xào Indonesia với rau và nước tương ngọt"}'::jsonb, NULL, 'active', 'asian_other', '{"indonesian","gluten_free","light","quick"}', '{"country":"Indonesia"}'::jsonb, NULL, 'vermicelli', 'rice', 'tomato', 'stir_fried', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["iced_tea","kerupuk"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":true,"is_dairy_free":true,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":false,"allergens":["shellfish","soy","eggs"],"calories_estimate":420,"protein_g":18,"carbs_g":58,"fat_g":14,"fiber_g":3}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-laksa-lemak', 'laksa-lemak', NULL, '{"en":"Laksa Lemak","it":"Laksa Lemak","vi":"Laksa Béo"}'::jsonb, '{"en":"Rich and creamy Singaporean laksa with extra coconut milk","it":"Laksa singaporiano ricco e cremoso con extra latte di cocco","vi":"Laksa Singapore béo ngậy với thêm nước cốt dừa"}'::jsonb, NULL, 'active', 'asian_other', '{"singaporean","rich","coconut","spicy"}', '{"country":"Singapore","region":"Katong"}'::jsonb, NULL, 'vermicelli', 'rice', 'tomato', 'soup', '{}', NULL, '{}', '{"portion_size":"large","is_shareable":false,"recommended_pairing":["iced_lime_juice"],"garnish":["laksa_leaves","sambal"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":true,"is_dairy_free":true,"is_nut_free":false,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","mollusks","peanuts"],"calories_estimate":720,"protein_g":30,"carbs_g":52,"fat_g":45,"fiber_g":3}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-truffle-mac-cheese', 'truffle-mac-and-cheese', NULL, '{"en":"Truffle Mac and Cheese","it":"Mac and Cheese al Tartufo","vi":"Mì Phô Mai Nấm Truffle"}'::jsonb, '{"en":"Elevated American classic with black truffle and aged cheddar","it":"Classico americano elevato con tartufo nero e cheddar stagionato","vi":"Món Mỹ cổ điển nâng cấp với nấm truffle đen và phô mai cheddar lâu năm"}'::jsonb, NULL, 'active', 'fusion', '{"truffle","luxury","comfort_food","american"}', '{"country":"USA","notes":"Modern American-Italian fusion"}'::jsonb, NULL, 'other', 'semolina', 'cheese', 'baked', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":true,"recommended_pairing":["white_wine","champagne"],"garnish":["truffle_shavings","breadcrumbs"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":true,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":true,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","dairy"],"calories_estimate":780,"protein_g":28,"carbs_g":62,"fat_g":48,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();