-- GUDBRO Wines Batch 6/8
-- Wines 101 to 120 of 144
-- Run this in Supabase SQL Editor

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-china-ningxia-cabernet', 'ningxia-cabernet-sauvignon', 'Ningxia Cabernet Sauvignon', 'Premium Chinese Cabernet from Ningxia desert region. Rich, elegant with cassis, plum, and integrated oak.',
  'red', 'dry', 'premium', ARRAY['cabernet_sauvignon'], false, 'vintage',
  'China', 'CN', 'Ningxia', 'Helan Mountain', NULL, NULL,
  13.5, 15, 'medium_high', 'high', 'dry', 'full', 'medium',
  ARRAY['cassis', 'blackberry', 'plum'], ARRAY['cedar', 'vanilla', 'chocolate'], ARRAY['leather', 'tobacco'], ARRAY['fruity', 'oaky', 'complex'], 'long',
  16, 18, 'bordeaux', 30, 5, 15,
  ARRAY['red_meat', 'chinese_cuisine', 'duck'], ARRAY['peking duck', 'braised beef', 'lamb ribs'], ARRAY['Aged Cheddar', 'Gruyère'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 128,
  ARRAY['ING_GRAPE_CABERNET_SAUVIGNON'], ARRAY['china', 'ningxia', 'cabernet', 'desert', 'premium'], 65, 'premium',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-china-marselan', 'ningxia-marselan', 'Ningxia Marselan', 'French hybrid grape thriving in China. Deep color with blackberry, spice, and chocolate notes.',
  'red', 'dry', 'classic', ARRAY['marselan'], false, 'vintage',
  'China', 'CN', 'Ningxia', NULL, NULL, NULL,
  13, 14.5, 'medium', 'medium', 'dry', 'medium_full', 'medium',
  ARRAY['blackberry', 'plum', 'black_cherry'], ARRAY['chocolate', 'spice', 'herbs'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'smooth'], 'medium',
  16, 18, 'bordeaux', NULL, 3, 10,
  ARRAY['chinese_cuisine', 'red_meat', 'spicy_food'], ARRAY['mapo tofu', 'sichuan beef', 'lamb skewers'], ARRAY['Aged Gouda', 'Comté'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_MARSELAN'], ARRAY['china', 'ningxia', 'marselan', 'hybrid', 'emerging'], 55, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-japan-koshu', 'yamanashi-koshu', 'Yamanashi Koshu', 'Japan''s signature white grape. Delicate, light with citrus, white peach, and subtle mineral notes.',
  'white', 'dry', 'classic', ARRAY['koshu'], false, 'vintage',
  'Japan', 'JP', 'Yamanashi', NULL, 'GI Yamanashi', NULL,
  11, 12.5, 'medium_high', NULL, 'dry', 'light', 'none',
  ARRAY['citrus', 'white_peach', 'asian_pear'], ARRAY['white_flowers', 'mineral', 'ginger'], ARRAY[]::TEXT[], ARRAY['delicate', 'fresh', 'subtle'], 'medium',
  6, 8, 'white_wine', NULL, 1, 3,
  ARRAY['japanese_cuisine', 'sushi', 'light_fish'], ARRAY['sashimi', 'tempura', 'tofu'], ARRAY['Fresh Mozzarella', 'Ricotta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 85,
  ARRAY['ING_GRAPE_KOSHU'], ARRAY['japan', 'koshu', 'yamanashi', 'delicate', 'sushi-friendly'], 70, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-japan-muscat-bailey-a', 'japan-muscat-bailey-a', 'Japanese Muscat Bailey A', 'Japan''s indigenous red hybrid. Light, fruity with strawberry, cherry, and candy notes.',
  'red', 'dry', 'classic', ARRAY['muscat_bailey_a'], false, 'vintage',
  'Japan', 'JP', 'Yamanashi', NULL, NULL, NULL,
  11, 12.5, 'medium', 'low', 'dry', 'light', 'none',
  ARRAY['strawberry', 'cherry', 'raspberry'], ARRAY['candy', 'floral', 'spice'], ARRAY[]::TEXT[], ARRAY['fruity', 'aromatic', 'light'], 'short',
  12, 14, 'burgundy', NULL, 1, 3,
  ARRAY['japanese_cuisine', 'light_fare', 'poultry'], ARRAY['yakitori', 'teriyaki chicken', 'ramen'], ARRAY['Fresh Cheese', 'Mild Brie'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_MUSCAT_BAILEY_A'], ARRAY['japan', 'muscat_bailey_a', 'indigenous', 'light', 'fruity'], 55, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-india-nashik-shiraz', 'nashik-shiraz', 'Nashik Valley Shiraz', 'India''s premier red from Nashik. Spicy, fruit-forward with blackberry, pepper, and chocolate.',
  'red', 'dry', 'classic', ARRAY['shiraz'], false, 'vintage',
  'India', 'IN', 'Maharashtra', 'Nashik', NULL, NULL,
  13, 14.5, 'medium', 'medium', 'dry', 'medium_full', 'medium',
  ARRAY['blackberry', 'plum', 'black_pepper'], ARRAY['chocolate', 'spice', 'vanilla'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'rich'], 'medium',
  16, 18, 'bordeaux', NULL, 2, 6,
  ARRAY['indian_cuisine', 'grilled_meat', 'spicy_food'], ARRAY['tandoori chicken', 'lamb rogan josh', 'biryani'], ARRAY['Aged Cheddar', 'Paneer'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_SHIRAZ'], ARRAY['india', 'nashik', 'shiraz', 'spicy', 'emerging'], 55, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-india-sparkling', 'nashik-sparkling', 'Nashik Traditional Method Sparkling', 'Indian sparkling wine from Nashik. Traditional method with fine bubbles, apple, and toast notes.',
  'sparkling', 'sparkling_brut', 'classic', ARRAY['chenin_blanc', 'chardonnay'], true, 'non_vintage',
  'India', 'IN', 'Maharashtra', 'Nashik', NULL, NULL,
  11.5, 12.5, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['green_apple', 'citrus', 'pear'], ARRAY['toast', 'almond', 'yeast'], ARRAY[]::TEXT[], ARRAY['fresh', 'elegant', 'crisp'], 'medium',
  6, 8, 'flute', NULL, 1, 4,
  ARRAY['appetizers', 'seafood', 'indian_cuisine'], ARRAY['samosas', 'tandoori prawns', 'pakoras'], ARRAY['Brie', 'Fresh Paneer'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 85,
  ARRAY['ING_GRAPE_CHENIN_BLANC', 'ING_GRAPE_CHARDONNAY'], ARRAY['india', 'nashik', 'sparkling', 'traditional_method'], 50, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-uruguay-tannat', 'canelones-tannat', 'Canelones Tannat', 'Uruguay''s flagship grape. Bold, tannic with blackberry, plum, and chocolate. More approachable than French Tannat.',
  'red', 'dry', 'premium', ARRAY['tannat'], false, 'vintage',
  'Uruguay', 'UY', 'Canelones', NULL, NULL, NULL,
  13.5, 15, 'medium_high', 'very_high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'plum', 'black_cherry'], ARRAY['chocolate', 'coffee', 'vanilla'], ARRAY['leather', 'tobacco'], ARRAY['intense', 'fruity', 'powerful'], 'very_long',
  16, 18, 'bordeaux', 60, 5, 20,
  ARRAY['red_meat', 'bbq', 'uruguayan_cuisine'], ARRAY['asado', 'grilled ribeye', 'chivito'], ARRAY['Aged Manchego', 'Blue Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 130,
  ARRAY['ING_GRAPE_TANNAT'], ARRAY['uruguay', 'tannat', 'powerful', 'tannic', 'signature'], 72, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-uruguay-albarino', 'maldonado-albarino', 'Maldonado Albariño', 'Uruguayan Albariño from coastal Maldonado. Fresh, aromatic with citrus, peach, and saline notes.',
  'white', 'dry', 'classic', ARRAY['albarino'], false, 'vintage',
  'Uruguay', 'UY', 'Maldonado', NULL, NULL, NULL,
  12, 13.5, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['citrus', 'white_peach', 'pear'], ARRAY['saline', 'white_flowers', 'mineral'], ARRAY[]::TEXT[], ARRAY['fresh', 'aromatic', 'coastal'], 'medium',
  8, 10, 'white_wine', NULL, 1, 4,
  ARRAY['seafood', 'oysters', 'light_fare'], ARRAY['ceviche', 'grilled prawns', 'fresh oysters'], ARRAY['Fresh Goat Cheese', 'Manchego'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 105,
  ARRAY['ING_GRAPE_ALBARINO'], ARRAY['uruguay', 'albarino', 'coastal', 'fresh', 'aromatic'], 58, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-brazil-sparkling', 'serra-gaucha-sparkling', 'Serra Gaúcha Sparkling', 'Brazilian sparkling from Serra Gaúcha highlands. Traditional method with apple, citrus, and brioche.',
  'sparkling', 'sparkling_brut', 'classic', ARRAY['chardonnay', 'pinot_noir'], true, 'non_vintage',
  'Brazil', 'BR', 'Rio Grande do Sul', 'Serra Gaúcha', NULL, NULL,
  11.5, 12.5, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['green_apple', 'citrus', 'white_peach'], ARRAY['brioche', 'toast', 'almond'], ARRAY[]::TEXT[], ARRAY['fresh', 'elegant', 'crisp'], 'medium',
  6, 8, 'flute', NULL, 1, 5,
  ARRAY['appetizers', 'seafood', 'brazilian_cuisine'], ARRAY['pão de queijo', 'grilled fish', 'ceviche'], ARRAY['Brie', 'Queijo Minas'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 85,
  ARRAY['ING_GRAPE_CHARDONNAY', 'ING_GRAPE_PINOT_NOIR'], ARRAY['brazil', 'serra_gaucha', 'sparkling', 'traditional_method'], 60, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-brazil-merlot', 'campanha-merlot', 'Campanha Gaúcha Merlot', 'Brazilian Merlot from Campanha region. Soft, fruity with plum, cherry, and gentle oak.',
  'red', 'dry', 'classic', ARRAY['merlot'], false, 'vintage',
  'Brazil', 'BR', 'Rio Grande do Sul', 'Campanha Gaúcha', NULL, NULL,
  12.5, 14, 'medium', 'medium', 'dry', 'medium', 'light',
  ARRAY['plum', 'cherry', 'blackberry'], ARRAY['chocolate', 'herbs', 'vanilla'], ARRAY[]::TEXT[], ARRAY['fruity', 'soft', 'approachable'], 'medium',
  14, 16, 'bordeaux', NULL, 2, 6,
  ARRAY['grilled_meat', 'pasta', 'brazilian_cuisine'], ARRAY['churrasco', 'feijoada', 'picanha'], ARRAY['Aged Provolone', 'Queijo Colonial'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_MERLOT'], ARRAY['brazil', 'campanha', 'merlot', 'soft', 'approachable'], 52, 'value',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-southafrica-pinotage', 'stellenbosch-pinotage', 'Stellenbosch Pinotage', 'South Africa''s signature grape. Bold with plum, smoke, chocolate, and earthy notes.',
  'red', 'dry', 'classic', ARRAY['pinotage'], false, 'vintage',
  'South Africa', 'ZA', 'Stellenbosch', NULL, 'WO', NULL,
  13.5, 15, 'medium', 'medium', 'dry', 'full', 'medium',
  ARRAY['plum', 'black_cherry', 'blackberry'], ARRAY['smoke', 'chocolate', 'coffee'], ARRAY['earth', 'leather'], ARRAY['fruity', 'smoky', 'bold'], 'long',
  16, 18, 'bordeaux', 30, 3, 10,
  ARRAY['bbq', 'game', 'south_african_cuisine'], ARRAY['braai', 'bobotie', 'ostrich steak'], ARRAY['Aged Cheddar', 'Blue Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 128,
  ARRAY['ING_GRAPE_PINOTAGE'], ARRAY['south_africa', 'stellenbosch', 'pinotage', 'signature', 'bold'], 72, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-southafrica-chenin-blanc', 'swartland-chenin-blanc', 'Swartland Old Vine Chenin Blanc', 'South Africa''s workhorse white from old vines. Rich, complex with stone fruit, honey, and lanolin.',
  'white', 'dry', 'premium', ARRAY['chenin_blanc'], false, 'vintage',
  'South Africa', 'ZA', 'Swartland', NULL, 'WO', NULL,
  13, 14.5, 'medium_high', NULL, 'dry', 'medium_full', 'light',
  ARRAY['peach', 'apricot', 'quince'], ARRAY['honey', 'lanolin', 'chamomile'], ARRAY['almond', 'toast'], ARRAY['rich', 'complex', 'textured'], 'long',
  10, 12, 'white_wine', NULL, 3, 10,
  ARRAY['poultry', 'pork', 'rich_fish'], ARRAY['roast chicken', 'pork belly', 'lobster'], ARRAY['Aged Gouda', 'Gruyère'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 118,
  ARRAY['ING_GRAPE_CHENIN_BLANC'], ARRAY['south_africa', 'swartland', 'chenin_blanc', 'old_vines', 'complex'], 75, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-southafrica-cap-classique', 'franschhoek-cap-classique', 'Franschhoek Cap Classique', 'South African traditional method sparkling. Elegant with apple, citrus, and brioche.',
  'sparkling', 'sparkling_brut', 'premium', ARRAY['chardonnay', 'pinot_noir'], true, 'non_vintage',
  'South Africa', 'ZA', 'Franschhoek', NULL, 'WO', NULL,
  11.5, 12.5, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['green_apple', 'citrus', 'pear'], ARRAY['brioche', 'toast', 'almond'], ARRAY[]::TEXT[], ARRAY['elegant', 'fresh', 'refined'], 'long',
  6, 8, 'flute', NULL, 2, 8,
  ARRAY['seafood', 'oysters', 'celebrations'], ARRAY['oysters', 'smoked salmon', 'canapés'], ARRAY['Brie', 'Camembert'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 88,
  ARRAY['ING_GRAPE_CHARDONNAY', 'ING_GRAPE_PINOT_NOIR'], ARRAY['south_africa', 'cap_classique', 'sparkling', 'traditional_method', 'elegant'], 68, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-morocco-red-blend', 'meknes-red-blend', 'Meknès Red Blend', 'Moroccan red from Meknès plateau. Mediterranean blend with dark fruit, spice, and herbs.',
  'red', 'dry', 'classic', ARRAY['syrah', 'cabernet_sauvignon', 'merlot'], true, 'vintage',
  'Morocco', 'MA', 'Meknès-Fès', NULL, 'AOG', NULL,
  13, 14.5, 'medium', 'medium', 'dry', 'medium_full', 'light',
  ARRAY['blackberry', 'plum', 'cherry'], ARRAY['spice', 'herbs', 'earth'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'mediterranean'], 'medium',
  16, 18, 'bordeaux', NULL, 2, 6,
  ARRAY['moroccan_cuisine', 'lamb', 'grilled_meat'], ARRAY['tagine', 'couscous', 'merguez'], ARRAY['Aged Gouda', 'Manchego'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 118,
  ARRAY['ING_GRAPE_SYRAH', 'ING_GRAPE_CABERNET_SAUVIGNON', 'ING_GRAPE_MERLOT'], ARRAY['morocco', 'meknes', 'blend', 'mediterranean', 'north_africa'], 48, 'value',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-morocco-gris', 'morocco-vin-gris', 'Moroccan Vin Gris', 'Traditional Moroccan grey wine. Light, refreshing rosé-style with strawberry and citrus.',
  'rosé', 'dry', 'classic', ARRAY['cinsault', 'grenache'], true, 'vintage',
  'Morocco', 'MA', 'Boulaouane', NULL, NULL, NULL,
  11, 12.5, 'medium_high', NULL, 'dry', 'light', 'none',
  ARRAY['strawberry', 'citrus', 'melon'], ARRAY['white_flowers', 'herbs'], ARRAY[]::TEXT[], ARRAY['fresh', 'light', 'fruity'], 'short',
  6, 8, 'white_wine', NULL, 1, 2,
  ARRAY['moroccan_cuisine', 'salads', 'light_fare'], ARRAY['moroccan salads', 'grilled fish', 'mezze'], ARRAY['Fresh Goat Cheese', 'Feta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_CINSAULT', 'ING_GRAPE_GRENACHE'], ARRAY['morocco', 'vin_gris', 'rose', 'traditional', 'light'], 45, 'budget',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-switzerland-chasselas', 'lavaux-chasselas', 'Lavaux Chasselas', 'Swiss flagship white from UNESCO Lavaux terraces. Delicate, mineral with citrus and floral notes.',
  'white', 'dry', 'premium', ARRAY['chasselas'], false, 'vintage',
  'Switzerland', 'CH', 'Vaud', 'Lavaux', 'AOC', NULL,
  11.5, 13, 'medium_high', NULL, 'dry', 'light', 'none',
  ARRAY['citrus', 'white_peach', 'apple'], ARRAY['mineral', 'white_flowers', 'almond'], ARRAY[]::TEXT[], ARRAY['delicate', 'mineral', 'elegant'], 'medium',
  8, 10, 'white_wine', NULL, 1, 5,
  ARRAY['swiss_cuisine', 'fondue', 'seafood'], ARRAY['cheese fondue', 'raclette', 'lake fish'], ARRAY['Gruyère', 'Emmental', 'Vacherin'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 98,
  ARRAY['ING_GRAPE_CHASSELAS'], ARRAY['switzerland', 'lavaux', 'chasselas', 'unesco', 'mineral'], 62, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-switzerland-pinot-noir', 'valais-pinot-noir', 'Valais Pinot Noir', 'Swiss Pinot Noir from high-altitude Valais. Elegant, light with cherry, raspberry, and earthy notes.',
  'red', 'dry', 'premium', ARRAY['pinot_noir'], false, 'vintage',
  'Switzerland', 'CH', 'Valais', NULL, 'AOC', NULL,
  12.5, 13.5, 'medium_high', 'medium', 'dry', 'medium_light', 'light',
  ARRAY['cherry', 'raspberry', 'strawberry'], ARRAY['earth', 'herbs', 'floral'], ARRAY[]::TEXT[], ARRAY['elegant', 'fruity', 'delicate'], 'medium',
  14, 16, 'burgundy', NULL, 2, 8,
  ARRAY['swiss_cuisine', 'game', 'duck'], ARRAY['dried meat', 'venison', 'mushroom dishes'], ARRAY['Raclette', 'Aged Alpine Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 110,
  ARRAY['ING_GRAPE_PINOT_NOIR'], ARRAY['switzerland', 'valais', 'pinot_noir', 'alpine', 'elegant'], 58, 'premium',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-mexico-baja-red-blend', 'valle-guadalupe-red-blend', 'Valle de Guadalupe Red Blend', 'Mexican red from Baja California''s Valle de Guadalupe. Bold Mediterranean blend with dark fruit and herbs.',
  'red', 'dry', 'premium', ARRAY['nebbiolo', 'tempranillo', 'cabernet_sauvignon'], true, 'vintage',
  'Mexico', 'MX', 'Baja California', 'Valle de Guadalupe', NULL, NULL,
  13.5, 15, 'medium_high', 'high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'plum', 'black_cherry'], ARRAY['herbs', 'spice', 'chocolate'], ARRAY['leather', 'tobacco'], ARRAY['fruity', 'herbal', 'complex'], 'long',
  16, 18, 'bordeaux', 30, 3, 12,
  ARRAY['mexican_cuisine', 'grilled_meat', 'bbq'], ARRAY['carne asada', 'mole', 'birria'], ARRAY['Aged Manchego', 'Cotija'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 128,
  ARRAY['ING_GRAPE_NEBBIOLO', 'ING_GRAPE_TEMPRANILLO', 'ING_GRAPE_CABERNET_SAUVIGNON'], ARRAY['mexico', 'baja', 'valle_guadalupe', 'blend', 'bold'], 65, 'premium',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-canada-icewine', 'niagara-vidal-icewine', 'Niagara Vidal Icewine', 'Canada''s iconic dessert wine. Intensely sweet with concentrated apricot, honey, and tropical fruit.',
  'dessert', 'sweet', 'premium', ARRAY['vidal'], false, 'vintage',
  'Canada', 'CA', 'Ontario', 'Niagara Peninsula', 'VQA', NULL,
  9, 13, 'high', NULL, 'very_sweet', 'full', 'none',
  ARRAY['apricot', 'peach', 'tropical_fruit'], ARRAY['honey', 'caramel', 'citrus'], ARRAY[]::TEXT[], ARRAY['sweet', 'intense', 'luscious'], 'very_long',
  6, 8, 'dessert', NULL, 5, 20,
  ARRAY['desserts', 'foie_gras', 'blue_cheese'], ARRAY['fruit tart', 'cheesecake', 'foie gras'], ARRAY['Blue Cheese', 'Aged Cheddar'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 160,
  ARRAY['ING_GRAPE_VIDAL'], ARRAY['canada', 'icewine', 'niagara', 'dessert', 'sweet'], 78, 'luxury',
  'ice_harvesting', NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  'wine-canada-okanagan-pinot-gris', 'okanagan-pinot-gris', 'Okanagan Valley Pinot Gris', 'Canadian Pinot Gris from Okanagan Valley. Fresh, aromatic with pear, apple, and citrus.',
  'white', 'dry', 'classic', ARRAY['pinot_gris'], false, 'vintage',
  'Canada', 'CA', 'British Columbia', 'Okanagan Valley', 'VQA', NULL,
  12, 13.5, 'medium_high', NULL, 'dry', 'medium', 'none',
  ARRAY['pear', 'apple', 'citrus'], ARRAY['white_flowers', 'mineral', 'honey'], ARRAY[]::TEXT[], ARRAY['fresh', 'aromatic', 'elegant'], 'medium',
  8, 10, 'white_wine', NULL, 1, 4,
  ARRAY['seafood', 'light_fare', 'asian_cuisine'], ARRAY['grilled salmon', 'sushi', 'light salads'], ARRAY['Fresh Goat Cheese', 'Brie'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 108,
  ARRAY['ING_GRAPE_PINOT_GRIS'], ARRAY['canada', 'okanagan', 'pinot_gris', 'fresh', 'aromatic'], 62, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- Batch 6 complete
