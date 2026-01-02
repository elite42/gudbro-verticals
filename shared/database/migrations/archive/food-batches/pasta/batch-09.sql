-- PASTA Batch 9
-- Items: 81 to 87 of 87
-- Generated: 2025-12-15T07:24:52.331Z

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-miso-carbonara', 'miso-carbonara', NULL, '{"en":"Miso Carbonara","it":"Carbonara al Miso","vi":"Carbonara Miso"}'::jsonb, '{"en":"Japanese-Italian fusion with white miso adding umami depth to classic carbonara","it":"Fusione giapponese-italiana con miso bianco che aggiunge profondità umami alla carbonara classica","vi":"Fusion Nhật-Ý với miso trắng thêm vị umami cho carbonara cổ điển"}'::jsonb, NULL, 'active', 'fusion', '{"fusion","japanese","umami","innovative"}', '{"country":"Japan","notes":"Modern Tokyo fusion restaurants"}'::jsonb, NULL, 'spaghetti', 'semolina', 'tomato', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["sake","white_wine"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","dairy","eggs","soy"],"calories_estimate":620,"protein_g":26,"carbs_g":65,"fat_g":28,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-uni-pasta', 'uni-cream-pasta', NULL, '{"en":"Uni Cream Pasta","it":"Pasta alla Crema di Ricci","vi":"Pasta Kem Nhum"}'::jsonb, '{"en":"Japanese-style pasta with fresh sea urchin in cream sauce","it":"Pasta in stile giapponese con ricci di mare freschi in salsa cremosa","vi":"Pasta kiểu Nhật với nhum biển tươi trong sốt kem"}'::jsonb, NULL, 'active', 'fusion', '{"japanese","luxury","sea_urchin","premium"}', '{"country":"Japan","region":"Tokyo"}'::jsonb, NULL, 'spaghetti', 'semolina', 'cream', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["sake","champagne"],"garnish":["fresh_uni","shiso_leaf","nori_strips"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","gluten","dairy"],"calories_estimate":580,"protein_g":22,"carbs_g":58,"fat_g":30,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-kimchi-pasta', 'kimchi-cream-pasta', NULL, '{"en":"Kimchi Cream Pasta","it":"Pasta alla Crema di Kimchi","vi":"Pasta Kem Kim Chi"}'::jsonb, '{"en":"Korean-Italian fusion with fermented kimchi in creamy bacon sauce","it":"Fusione coreano-italiana con kimchi fermentato in salsa cremosa al bacon","vi":"Fusion Hàn-Ý với kim chi lên men trong sốt kem thịt xông khói"}'::jsonb, NULL, 'active', 'fusion', '{"korean","fusion","spicy","fermented"}', '{"country":"South Korea","notes":"Popular K-fusion dish"}'::jsonb, NULL, 'spaghetti', 'semolina', 'cream', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["soju","beer"],"garnish":["sesame_seeds","nori","scallions"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","dairy"],"calories_estimate":620,"protein_g":22,"carbs_g":65,"fat_g":30,"fiber_g":4}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-mentaiko', 'mentaiko-pasta', NULL, '{"en":"Mentaiko Pasta","it":"Pasta al Mentaiko","vi":"Pasta Trứng Cá Tuyết Cay"}'::jsonb, '{"en":"Japanese creamy pasta with spicy cod roe (mentaiko)","it":"Pasta giapponese cremosa con uova di merluzzo piccanti (mentaiko)","vi":"Pasta kem Nhật với trứng cá tuyết cay (mentaiko)"}'::jsonb, NULL, 'active', 'fusion', '{"japanese","spicy","cod_roe","quick"}', '{"country":"Japan","region":"Fukuoka"}'::jsonb, NULL, 'spaghetti', 'semolina', 'cream', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["sake","white_wine"],"garnish":["nori_strips","shiso","extra_mentaiko"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["fish","gluten","dairy"],"calories_estimate":520,"protein_g":20,"carbs_g":60,"fat_g":24,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-black-garlic-aglio-olio', 'black-garlic-aglio-olio', NULL, '{"en":"Black Garlic Aglio e Olio","it":"Aglio e Olio al Aglio Nero","vi":"Aglio Olio Tỏi Đen"}'::jsonb, '{"en":"Modern twist on classic aglio e olio with fermented black garlic","it":"Rivisitazione moderna del classico aglio e olio con aglio nero fermentato","vi":"Biến tấu hiện đại của aglio olio cổ điển với tỏi đen lên men"}'::jsonb, NULL, 'active', 'signature', '{"vegetarian","black_garlic","umami","simple"}', '{"country":"Italy","notes":"Modern Italian with Asian influence"}'::jsonb, NULL, 'spaghetti', 'semolina', 'oil_based', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","light_red"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":true,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":true,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":false,"allergens":["gluten","dairy"],"calories_estimate":420,"protein_g":12,"carbs_g":62,"fat_g":16,"fiber_g":3}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-lobster-linguine-champagne', 'lobster-champagne-linguine', NULL, '{"en":"Lobster Champagne Linguine","it":"Linguine all''Astice e Champagne","vi":"Linguine Tôm Hùm Champagne"}'::jsonb, '{"en":"Luxurious linguine with Maine lobster in champagne cream sauce","it":"Linguine lussuose con astice del Maine in crema allo champagne","vi":"Linguine sang trọng với tôm hùm Maine trong sốt kem champagne"}'::jsonb, NULL, 'active', 'signature', '{"luxury","lobster","champagne","special_occasion"}', '{"country":"USA","notes":"Fine dining creation"}'::jsonb, NULL, 'linguine', 'egg', 'cream', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":true,"recommended_pairing":["champagne","white_burgundy"],"garnish":["lobster_claw","tarragon_sprig","caviar"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["shellfish","gluten","dairy","eggs","sulphites"],"calories_estimate":720,"protein_g":38,"carbs_g":58,"fat_g":36,"fiber_g":2}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO pasta (id, slug, stable_key, name, description, tagline, status, style, tags, origin, history, pasta_shape, pasta_dough, sauce_type, cooking_method, ingredients, protein, toppings, serving, flavor, dietary, customization, variations, popularity, recommended_for, pairings, related_pasta)
VALUES ('pasta-nduja-burrata', 'paccheri-nduja-burrata', NULL, '{"en":"Paccheri with Nduja and Burrata","it":"Paccheri alla Nduja con Burrata","vi":"Paccheri Nduja và Burrata"}'::jsonb, '{"en":"Large tube pasta with spicy Calabrian nduja and creamy burrata","it":"Paccheri con nduja calabrese piccante e burrata cremosa","vi":"Pasta ống lớn với nduja cay Calabria và burrata kem"}'::jsonb, NULL, 'active', 'signature', '{"spicy","calabrian","burrata","modern"}', '{"country":"Italy","region":"Calabria","notes":"Modern Italian creation"}'::jsonb, NULL, 'paccheri', 'semolina', 'tomato', 'boiled', '{}', NULL, '{}', '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["red_wine","ciro"],"garnish":["burrata","fresh_basil","olive_oil"]}'::jsonb, '{"profile":[],"spice_level":0}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","dairy"],"calories_estimate":620,"protein_g":22,"carbs_g":58,"fat_g":34,"fiber_g":4}'::jsonb, NULL, '{}', 50, '{}', NULL, '{}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();