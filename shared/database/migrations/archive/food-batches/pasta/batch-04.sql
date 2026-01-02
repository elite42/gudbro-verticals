-- PASTA Batch 4
-- Items: 31 to 40 of 87
-- Generated: 2025-12-15T07:24:52.330Z

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-linguine-astice', 'linguine-all-astice', NULL, '{"en":"Linguine with Lobster","it":"Linguine all''Astice","vi":"Linguine Tôm Hùm Càng"}'::jsonb, '{"en":"Linguine with whole lobster in tomato and brandy sauce","it":"Linguine con astice intero in salsa di pomodoro e brandy","vi":"Linguine với tôm hùm nguyên con trong sốt cà chua và brandy"}'::jsonb, NULL, 'active', 'italian_classic', '{"seafood","luxury","lobster","special_occasion"}', '{"country":"Italy","region":"Sardinia"}'::jsonb, NULL, 'linguine', 'semolina', 'tomato', 'boiled', '{}', NULL, '{}', '{"portion_size":"large","is_shareable":true,"recommended_pairing":["white_wine","champagne"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","gluten"],"calories_estimate":620,"protein_g":35,"carbs_g":65,"fat_g":18,"fiber_g":3}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-spaghetti-nero-seppia', 'spaghetti-al-nero-di-seppia', NULL, '{"en":"Squid Ink Spaghetti","it":"Spaghetti al Nero di Seppia","vi":"Mì Ý Mực Đen"}'::jsonb, '{"en":"Black spaghetti with cuttlefish in squid ink sauce, Venetian specialty","it":"Spaghetti neri con seppie in salsa al nero, specialità veneziana","vi":"Mì Ý đen với mực trong sốt mực, đặc sản Venice"}'::jsonb, NULL, 'active', 'italian_regional', '{"seafood","venetian","squid_ink","dramatic"}', '{"country":"Italy","region":"Veneto","city":"Venice"}'::jsonb, NULL, 'spaghetti', 'squid_ink', 'oil_based', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","prosecco"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["mollusks","gluten","sulphites"],"calories_estimate":480,"protein_g":24,"carbs_g":62,"fat_g":14,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-spaghetti-allo-scoglio', 'spaghetti-allo-scoglio', NULL, '{"en":"Reef Spaghetti","it":"Spaghetti allo Scoglio","vi":"Mì Ý Hải Sản Tổng Hợp"}'::jsonb, '{"en":"Spaghetti with mixed shellfish and seafood in tomato sauce","it":"Spaghetti con frutti di mare misti in salsa di pomodoro","vi":"Mì Ý với hải sản hỗn hợp trong sốt cà chua"}'::jsonb, NULL, 'active', 'italian_classic', '{"seafood","mixed_seafood","festive","shareable"}', '{"country":"Italy","region":"Various"}'::jsonb, NULL, 'spaghetti', 'semolina', 'tomato', 'boiled', '{}', NULL, '{}', '{"portion_size":"large","is_shareable":true,"recommended_pairing":["white_wine","verdicchio"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","mollusks","gluten","sulphites"],"calories_estimate":580,"protein_g":32,"carbs_g":65,"fat_g":16,"fiber_g":3}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-penne-vodka', 'penne-alla-vodka', NULL, '{"en":"Penne alla Vodka","it":"Penne alla Vodka","vi":"Penne Sốt Vodka"}'::jsonb, '{"en":"Penne in creamy tomato and vodka sauce, Italian-American classic","it":"Penne in salsa cremosa al pomodoro e vodka, classico italo-americano","vi":"Penne trong sốt cà chua kem và vodka, món cổ điển Ý-Mỹ"}'::jsonb, NULL, 'active', 'italian_classic', '{"cream_sauce","vodka","vegetarian","comfort_food"}', '{"country":"Italy","region":"Various"}'::jsonb, NULL, 'penne', 'semolina', 'cream', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["red_wine","chianti"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":true,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":false,"allergens":["gluten","dairy"],"calories_estimate":580,"protein_g":14,"carbs_g":72,"fat_g":24,"fiber_g":3}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-fettuccine-funghi-panna', 'fettuccine-ai-funghi-e-panna', NULL, '{"en":"Fettuccine with Mushrooms and Cream","it":"Fettuccine ai Funghi e Panna","vi":"Fettuccine Nấm Kem"}'::jsonb, '{"en":"Fettuccine with mixed mushrooms in a rich cream sauce","it":"Fettuccine con funghi misti in salsa cremosa","vi":"Fettuccine với nấm hỗn hợp trong sốt kem đậm đà"}'::jsonb, NULL, 'active', 'italian_classic', '{"mushrooms","cream_sauce","vegetarian","rich"}', '{"country":"Italy","region":"Emilia-Romagna"}'::jsonb, NULL, 'fettuccine', 'egg', 'cream', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","chardonnay"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":true,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":true,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":false,"allergens":["gluten","dairy","eggs"],"calories_estimate":620,"protein_g":16,"carbs_g":68,"fat_g":32,"fiber_g":4}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-penne-quattro-formaggi', 'penne-ai-quattro-formaggi', NULL, '{"en":"Four Cheese Penne","it":"Penne ai Quattro Formaggi","vi":"Penne Bốn Loại Phô Mai"}'::jsonb, '{"en":"Penne in rich sauce of four Italian cheeses","it":"Penne in salsa cremosa di quattro formaggi italiani","vi":"Penne trong sốt kem của bốn loại phô mai Ý"}'::jsonb, NULL, 'active', 'italian_classic', '{"cheese","cream_sauce","vegetarian","indulgent"}', '{"country":"Italy","region":"Various"}'::jsonb, NULL, 'penne', 'semolina', 'cheese', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["red_wine","barbera"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":true,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","dairy"],"calories_estimate":720,"protein_g":24,"carbs_g":65,"fat_g":40,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-tortellini-panna', 'tortellini-panna-e-prosciutto', NULL, '{"en":"Tortellini with Cream and Ham","it":"Tortellini Panna e Prosciutto","vi":"Tortellini Kem và Giăm Bông"}'::jsonb, '{"en":"Cheese tortellini in cream sauce with prosciutto cotto","it":"Tortellini al formaggio in crema con prosciutto cotto","vi":"Tortellini phô mai trong sốt kem với giăm bông nấu"}'::jsonb, NULL, 'active', 'italian_regional', '{"filled_pasta","cream_sauce","ham","bolognese"}', '{"country":"Italy","region":"Emilia-Romagna","city":"Bologna"}'::jsonb, NULL, 'tortellini', 'egg', 'cream', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","sparkling_wine"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","dairy","eggs"],"calories_estimate":680,"protein_g":26,"carbs_g":58,"fat_g":38,"fiber_g":3}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-gorgonzola-noci', 'pasta-gorgonzola-e-noci', NULL, '{"en":"Pasta with Gorgonzola and Walnuts","it":"Pasta Gorgonzola e Noci","vi":"Pasta Phô Mai Xanh và Óc Chó"}'::jsonb, '{"en":"Pasta in creamy gorgonzola sauce with toasted walnuts","it":"Pasta in crema di gorgonzola con noci tostate","vi":"Pasta trong sốt kem gorgonzola với óc chó rang"}'::jsonb, NULL, 'active', 'italian_regional', '{"blue_cheese","walnuts","vegetarian","rich"}', '{"country":"Italy","region":"Lombardy"}'::jsonb, NULL, 'penne', 'semolina', 'cheese', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["red_wine","barolo"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":true,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":false,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","dairy","tree_nuts"],"calories_estimate":680,"protein_g":18,"carbs_g":62,"fat_g":42,"fiber_g":3}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-salmone-panna', 'farfalle-salmone-e-panna', NULL, '{"en":"Farfalle with Salmon and Cream","it":"Farfalle Salmone e Panna","vi":"Farfalle Cá Hồi Kem"}'::jsonb, '{"en":"Bow-tie pasta with smoked salmon in dill cream sauce","it":"Farfalle con salmone affumicato in crema all''aneto","vi":"Mì hình nơ với cá hồi xông khói trong sốt kem thì là"}'::jsonb, NULL, 'active', 'italian_classic', '{"salmon","cream_sauce","elegant","quick"}', '{"country":"Italy","region":"Various"}'::jsonb, NULL, 'farfalle', 'semolina', 'cream', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","pinot_grigio"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["fish","gluten","dairy","sulphites"],"calories_estimate":580,"protein_g":24,"carbs_g":62,"fat_g":26,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-ragu-napoletano', 'ragu-napoletano', NULL, '{"en":"Neapolitan Ragù","it":"Ragù Napoletano","vi":"Ragù Naples"}'::jsonb, '{"en":"Slow-cooked Neapolitan meat ragù with beef, pork, and tomato, traditionally served with ziti","it":"Ragù napoletano cotto lentamente con manzo, maiale e pomodoro, tradizionalmente servito con ziti","vi":"Ragù Naples nấu chậm với thịt bò, thịt heo và cà chua, truyền thống ăn với ziti"}'::jsonb, NULL, 'active', 'italian_regional', '{"sunday_gravy","slow_cooked","neapolitan","traditional"}', '{"country":"Italy","region":"Campania","city":"Naples"}'::jsonb, NULL, 'other', 'semolina', 'meat', 'boiled', '{}', NULL, '{}', '{"portion_size":"large","is_shareable":true,"recommended_pairing":["red_wine","aglianico"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","dairy","sulphites"],"calories_estimate":720,"protein_g":38,"carbs_g":68,"fat_g":32,"fiber_g":4}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();