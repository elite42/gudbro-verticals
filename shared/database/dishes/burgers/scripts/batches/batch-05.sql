-- BURGERS Batch 5
-- Items: 41 to 45 of 45
-- Generated: 2025-12-15T12:53:40.038Z

INSERT INTO burgers (id, slug, name, description, tagline, status, style, tags, bun_type, bun_is_toasted, patty_type, patty_weight_g, patty_count, patty_recommended_cook, cheeses, toppings, sauces, is_spicy, spice_level, origin, history, serving, dietary, customization, variations, popularity, related_burgers, media, pricing)
VALUES ('burger-fish-burger', 'classic-fish-burger', '{"en":"Classic Fish Burger","it":"Fish Burger Classico","vi":"Burger Cá Cổ Điển"}'::jsonb, '{"en":"Crispy breaded cod fillet with tartar sauce, lettuce, and cheese","it":"Filetto di merluzzo impanato croccante con salsa tartara, lattuga e formaggio","vi":"Phi lê cá tuyết chiên giòn với sốt tartar, xà lách và phô mai"}'::jsonb, NULL, 'classic', 'fish', '{"fish","cod","classic","seafood","crispy"}', 'sesame', true, 'fish', 150, 1, 'well_done', '{"american"}', '{"lettuce"}', '{"tartar_sauce"}', false, 0, '{"country":"USA","country_code":"US"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["fries","cola","white_wine"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","fish","milk","eggs","sesame"],"calories_estimate":480,"protein_g":24,"carbs_g":48,"fat_g":22,"fiber_g":2}'::jsonb, NULL, '{}', 78, '{}', NULL, '{"cost_level":"medium","suggested_price_usd":12}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO burgers (id, slug, name, description, tagline, status, style, tags, bun_type, bun_is_toasted, patty_type, patty_weight_g, patty_count, patty_recommended_cook, cheeses, toppings, sauces, is_spicy, spice_level, origin, history, serving, dietary, customization, variations, popularity, related_burgers, media, pricing)
VALUES ('burger-salmon-burger', 'salmon-burger', '{"en":"Grilled Salmon Burger","it":"Burger di Salmone","vi":"Burger Cá Hồi Nướng"}'::jsonb, '{"en":"Fresh salmon patty with dill cream cheese, capers, and arugula","it":"Hamburger di salmone fresco con cream cheese all''aneto, capperi e rucola","vi":"Thịt cá hồi tươi với kem phô mai thì là, nụ bạch hoa và arugula"}'::jsonb, NULL, 'signature', 'fish', '{"salmon","fish","healthy","omega3","gourmet"}', 'brioche', true, 'fish', 170, 1, 'medium', '{"dill_cream_cheese"}', '{"arugula","capers","red_onion","tomato"}', '{"lemon_aioli"}', false, 0, '{"country":"USA","country_code":"US","region":"Pacific Northwest"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","champagne","craft_beer"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","fish","milk","eggs"],"calories_estimate":520,"protein_g":32,"carbs_g":38,"fat_g":28,"fiber_g":2}'::jsonb, NULL, '{}', 76, '{}', NULL, '{"cost_level":"high","suggested_price_usd":17}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO burgers (id, slug, name, description, tagline, status, style, tags, bun_type, bun_is_toasted, patty_type, patty_weight_g, patty_count, patty_recommended_cook, cheeses, toppings, sauces, is_spicy, spice_level, origin, history, serving, dietary, customization, variations, popularity, related_burgers, media, pricing)
VALUES ('burger-tuna-burger', 'ahi-tuna-burger', '{"en":"Seared Ahi Tuna Burger","it":"Burger di Tonno Ahi","vi":"Burger Cá Ngừ Ahi"}'::jsonb, '{"en":"Seared rare ahi tuna with wasabi mayo, pickled ginger, and sesame","it":"Tonno ahi scottato al sangue con maionese al wasabi, zenzero marinato e sesamo","vi":"Cá ngừ ahi áp chảo tái với mayo wasabi, gừng ngâm và mè"}'::jsonb, NULL, 'signature', 'fish', '{"tuna","ahi","seared","japanese","healthy"}', 'sesame', true, 'fish', 180, 1, 'rare', '{}', '{"pickled_ginger","sesame_seeds","avocado","mixed_greens"}', '{"wasabi_mayo","soy_glaze"}', false, 1, '{"country":"Japan / USA","country_code":"JP"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["sake","white_wine","japanese_beer"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","fish","sesame","soy","eggs"],"calories_estimate":440,"protein_g":38,"carbs_g":36,"fat_g":16,"fiber_g":3}'::jsonb, NULL, '{}', 74, '{}', NULL, '{"cost_level":"high","suggested_price_usd":19}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO burgers (id, slug, name, description, tagline, status, style, tags, bun_type, bun_is_toasted, patty_type, patty_weight_g, patty_count, patty_recommended_cook, cheeses, toppings, sauces, is_spicy, spice_level, origin, history, serving, dietary, customization, variations, popularity, related_burgers, media, pricing)
VALUES ('burger-shrimp-burger', 'shrimp-burger', '{"en":"Crispy Shrimp Burger","it":"Burger di Gamberetti","vi":"Burger Tôm Giòn"}'::jsonb, '{"en":"Crispy fried shrimp patty with remoulade, lettuce, and tomato","it":"Hamburger di gamberetti fritti croccanti con remoulade, lattuga e pomodoro","vi":"Thịt tôm chiên giòn với sốt remoulade, xà lách và cà chua"}'::jsonb, NULL, 'classic', 'fish', '{"shrimp","seafood","crispy","cajun","louisiana"}', 'brioche', true, 'shrimp', 150, 1, 'well_done', '{}', '{"lettuce","tomato","pickles"}', '{"remoulade","hot_sauce"}', false, 1, '{"country":"USA","country_code":"US","region":"Louisiana"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["beer","white_wine","lemonade"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","shellfish","eggs"],"calories_estimate":480,"protein_g":26,"carbs_g":46,"fat_g":22,"fiber_g":2}'::jsonb, NULL, '{}', 72, '{}', NULL, '{"cost_level":"high","suggested_price_usd":16}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO burgers (id, slug, name, description, tagline, status, style, tags, bun_type, bun_is_toasted, patty_type, patty_weight_g, patty_count, patty_recommended_cook, cheeses, toppings, sauces, is_spicy, spice_level, origin, history, serving, dietary, customization, variations, popularity, related_burgers, media, pricing)
VALUES ('burger-turkey-burger', 'turkey-burger', '{"en":"Turkey Burger","it":"Turkey Burger","vi":"Burger Gà Tây"}'::jsonb, '{"en":"Lean turkey patty with avocado, sprouts, and cranberry aioli","it":"Hamburger magro di tacchino con avocado, germogli e aioli ai mirtilli rossi","vi":"Thịt gà tây nạc với bơ, mầm và aioli nam việt quất"}'::jsonb, NULL, 'classic', 'chicken', '{"turkey","lean","healthy","avocado","light"}', 'whole_wheat', true, 'turkey', 170, 1, 'well_done', '{"swiss"}', '{"avocado","sprouts","tomato","red_onion"}', '{"cranberry_aioli"}', false, 0, '{"country":"USA","country_code":"US"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","iced_tea","sparkling_water"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk","eggs"],"calories_estimate":420,"protein_g":34,"carbs_g":38,"fat_g":16,"fiber_g":5}'::jsonb, NULL, '{}', 76, '{}', NULL, '{"cost_level":"medium","suggested_price_usd":13}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();