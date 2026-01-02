-- GUDBRO Wines Batch 5/8
-- Wines 81 to 100 of 144
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
  'wine-bulgaria-mavrud', 'thracian-valley-mavrud', 'Thracian Valley Mavrud', 'Bulgaria''s unique indigenous red. Deep, powerful with blackberry, leather, and spice notes.',
  'red', 'dry', 'premium', ARRAY['mavrud'], false, 'vintage',
  'Bulgaria', 'BG', 'Thracian Valley', NULL, 'PGI', NULL,
  13.5, 15, 'medium_high', 'high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'cherry', 'plum'], ARRAY['leather', 'spice', 'chocolate'], ARRAY['earth', 'tobacco'], ARRAY['fruity', 'spicy', 'intense'], 'long',
  16, 18, 'bordeaux', 30, 5, 15,
  ARRAY['red_meat', 'game', 'bulgarian_cuisine'], ARRAY['kebapche', 'grilled lamb', 'aged cheese'], ARRAY['Kashkaval', 'Aged Sirene'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 130,
  ARRAY['ING_GRAPE_MAVRUD'], ARRAY['bulgaria', 'mavrud', 'thracian', 'indigenous', 'powerful'], 60, 'mid',
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
  'wine-bulgaria-melnik', 'struma-valley-melnik', 'Struma Valley Broad Leaf Melnik', 'Rare Bulgarian red from Struma Valley. Complex with cherry, strawberry, and earthy notes, compared to Nebbiolo.',
  'red', 'dry', 'classic', ARRAY['melnik'], false, 'vintage',
  'Bulgaria', 'BG', 'Struma Valley', NULL, NULL, NULL,
  13, 14.5, 'high', 'high', 'dry', 'medium_full', 'medium',
  ARRAY['cherry', 'strawberry', 'raspberry'], ARRAY['black_pepper', 'earth', 'leather'], ARRAY['tobacco', 'tar'], ARRAY['fruity', 'earthy', 'complex'], 'long',
  16, 18, 'burgundy', 30, 5, 20,
  ARRAY['game', 'aged_cheese', 'rich_dishes'], ARRAY['roast duck', 'aged kashkaval', 'grilled meat'], ARRAY['Aged Kashkaval', 'Blue Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_MELNIK'], ARRAY['bulgaria', 'melnik', 'struma', 'age-worthy', 'nebbiolo-like'], 55, 'mid',
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
  'wine-greece-xinomavro', 'naoussa-xinomavro', 'Naoussa Xinomavro', 'Greece''s noble red, the "Nebbiolo of the East". High acidity and tannins with tomato, olive, and dark fruit.',
  'red', 'dry', 'premium', ARRAY['xinomavro'], false, 'vintage',
  'Greece', 'GR', 'Macedonia', 'Naoussa', 'PDO', NULL,
  12.5, 14.5, 'high', 'very_high', 'dry', 'full', 'medium',
  ARRAY['tomato', 'olive', 'cherry'], ARRAY['spice', 'earth', 'herbs'], ARRAY['leather', 'tobacco', 'tar'], ARRAY['earthy', 'savory', 'complex'], 'very_long',
  16, 18, 'burgundy', 60, 10, 25,
  ARRAY['lamb', 'game', 'greek_cuisine'], ARRAY['lamb kleftiko', 'moussaka', 'aged cheese'], ARRAY['Graviera', 'Aged Feta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_XINOMAVRO'], ARRAY['greece', 'xinomavro', 'naoussa', 'nebbiolo-like', 'age-worthy'], 72, 'mid',
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
  'wine-greece-assyrtiko', 'santorini-assyrtiko', 'Santorini Assyrtiko', 'Iconic Greek white from volcanic Santorini. Mineral, saline, with citrus and stone fruit. High acidity.',
  'white', 'dry', 'premium', ARRAY['assyrtiko'], false, 'vintage',
  'Greece', 'GR', 'Cyclades', 'Santorini', 'PDO', NULL,
  13, 14.5, 'high', NULL, 'dry', 'medium_full', 'none',
  ARRAY['lemon', 'lime', 'white_peach'], ARRAY['mineral', 'saline', 'flint'], ARRAY['honey', 'petrol'], ARRAY['citrus', 'mineral', 'volcanic'], 'long',
  8, 10, 'white_wine', NULL, 3, 10,
  ARRAY['seafood', 'greek_cuisine', 'oysters'], ARRAY['grilled octopus', 'fresh fish', 'fava dip'], ARRAY['Feta', 'Manouri'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_ASSYRTIKO'], ARRAY['greece', 'assyrtiko', 'santorini', 'volcanic', 'mineral'], 80, 'mid',
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
  'wine-greece-agiorgitiko', 'nemea-agiorgitiko', 'Nemea Agiorgitiko', 'Greece''s most planted red grape from Nemea. Soft, fruity with cherry, plum, and spice notes.',
  'red', 'dry', 'classic', ARRAY['agiorgitiko'], false, 'vintage',
  'Greece', 'GR', 'Peloponnese', 'Nemea', 'PDO', NULL,
  12.5, 14, 'medium', 'medium', 'dry', 'medium_full', 'light',
  ARRAY['cherry', 'plum', 'raspberry'], ARRAY['spice', 'herbs', 'vanilla'], ARRAY[]::TEXT[], ARRAY['fruity', 'soft', 'approachable'], 'medium',
  16, 18, 'bordeaux', NULL, 2, 8,
  ARRAY['grilled_meat', 'pasta', 'mediterranean'], ARRAY['souvlaki', 'moussaka', 'grilled lamb'], ARRAY['Kasseri', 'Graviera'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 118,
  ARRAY['ING_GRAPE_AGIORGITIKO'], ARRAY['greece', 'agiorgitiko', 'nemea', 'fruity', 'approachable'], 70, 'value',
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
  'wine-hungary-egri-bikaver', 'eger-bikaver', 'Egri Bikavér (Bull''s Blood)', 'Hungary''s famous red blend from Eger. Bold, spicy with dark fruit and earthy character.',
  'red', 'dry', 'classic', ARRAY['kekfrankos', 'kadarka', 'merlot'], true, 'vintage',
  'Hungary', 'HU', 'Eger', NULL, 'PDO', NULL,
  12, 14, 'medium_high', 'medium', 'dry', 'medium_full', 'medium',
  ARRAY['cherry', 'plum', 'blackberry'], ARRAY['pepper', 'earth', 'spice'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'earthy'], 'medium',
  16, 18, 'bordeaux', NULL, 3, 10,
  ARRAY['hungarian_cuisine', 'game', 'stews'], ARRAY['goulash', 'pörkölt', 'grilled meat'], ARRAY['Aged Trappist', 'Blue Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_KEKFRANKOS', 'ING_GRAPE_KADARKA', 'ING_GRAPE_MERLOT'], ARRAY['hungary', 'eger', 'bikaver', 'blend', 'traditional'], 65, 'value',
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
  'wine-hungary-furmint-dry', 'tokaj-furmint-dry', 'Tokaj Dry Furmint', 'Hungary''s noble grape in dry style. Mineral, citrus, and stone fruit with vibrant acidity.',
  'white', 'dry', 'classic', ARRAY['furmint'], false, 'vintage',
  'Hungary', 'HU', 'Tokaj', NULL, 'PDO', NULL,
  12, 13.5, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['green_apple', 'pear', 'citrus'], ARRAY['mineral', 'honey', 'white_flowers'], ARRAY[]::TEXT[], ARRAY['citrus', 'mineral', 'fresh'], 'long',
  8, 10, 'white_wine', NULL, 2, 8,
  ARRAY['seafood', 'poultry', 'asian_cuisine'], ARRAY['grilled fish', 'chicken paprikash', 'sushi'], ARRAY['Gruyère', 'Aged Gouda'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 108,
  ARRAY['ING_GRAPE_FURMINT'], ARRAY['hungary', 'tokaj', 'furmint', 'dry', 'mineral'], 68, 'mid',
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
  'wine-moldova-rara-neagra', 'moldova-rara-neagra', 'Moldovan Rara Neagră', 'Moldova''s indigenous red grape. Medium-bodied with cherry, plum, and herbal notes.',
  'red', 'dry', 'classic', ARRAY['rara_neagra'], false, 'vintage',
  'Moldova', 'MD', 'Codru', NULL, NULL, NULL,
  12, 13.5, 'medium_high', 'medium', 'dry', 'medium', 'light',
  ARRAY['cherry', 'plum', 'raspberry'], ARRAY['herbs', 'pepper', 'earth'], ARRAY[]::TEXT[], ARRAY['fruity', 'herbal', 'fresh'], 'medium',
  14, 16, 'bordeaux', NULL, 2, 6,
  ARRAY['grilled_meat', 'stews', 'moldovan_cuisine'], ARRAY['mamaliga', 'grilled lamb', 'sarmale'], ARRAY['Brynza', 'Aged Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 112,
  ARRAY['ING_GRAPE_RARA_NEAGRA'], ARRAY['moldova', 'rara_neagra', 'indigenous', 'medium-bodied'], 45, 'value',
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
  'wine-serbia-prokupac', 'serbia-prokupac', 'Serbian Prokupac', 'Serbia''s ancient indigenous red. Fruity, medium-bodied with cherry and spice character.',
  'red', 'dry', 'classic', ARRAY['prokupac'], false, 'vintage',
  'Serbia', 'RS', 'Župa', NULL, NULL, NULL,
  12, 14, 'medium_high', 'medium', 'dry', 'medium', 'light',
  ARRAY['cherry', 'raspberry', 'plum'], ARRAY['pepper', 'herbs', 'earth'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'fresh'], 'medium',
  14, 16, 'bordeaux', NULL, 2, 6,
  ARRAY['grilled_meat', 'serbian_cuisine', 'stews'], ARRAY['ćevapi', 'pljeskavica', 'roast lamb'], ARRAY['Kajmak', 'Aged Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_PROKUPAC'], ARRAY['serbia', 'prokupac', 'indigenous', 'ancient'], 40, 'value',
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
  'wine-armenia-areni', 'armenia-areni-noir', 'Armenian Areni Noir', 'Armenia''s signature red from one of the world''s oldest wine regions. Cherry, pomegranate, and spice.',
  'red', 'dry', 'classic', ARRAY['areni'], false, 'vintage',
  'Armenia', 'AM', 'Vayots Dzor', NULL, NULL, NULL,
  12.5, 14, 'high', 'medium', 'dry', 'medium', 'light',
  ARRAY['cherry', 'pomegranate', 'raspberry'], ARRAY['spice', 'herbs', 'mineral'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'fresh'], 'medium',
  14, 16, 'burgundy', NULL, 3, 10,
  ARRAY['armenian_cuisine', 'grilled_meat', 'lamb'], ARRAY['khorovats', 'dolma', 'grilled lamb'], ARRAY['Chanakh', 'Aged Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_ARENI'], ARRAY['armenia', 'areni', 'ancient', 'caucasus', 'historic'], 50, 'mid',
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
  'wine-uk-english-sparkling', 'sussex-english-sparkling', 'Sussex English Sparkling', 'Premium English sparkling wine from Sussex chalk soils. Traditional method with fine bubbles, apple, citrus, and brioche notes.',
  'sparkling', 'sparkling_brut', 'premium', ARRAY['chardonnay', 'pinot_noir', 'pinot_meunier'], true, 'vintage',
  'United Kingdom', 'GB', 'Sussex', NULL, 'PDO', NULL,
  12, 12.5, 'high', NULL, 'bone_dry', 'medium', 'none',
  ARRAY['green_apple', 'citrus', 'pear'], ARRAY['brioche', 'toast', 'almond'], ARRAY['honey', 'cream'], ARRAY['fresh', 'elegant', 'complex'], 'long',
  6, 8, 'flute', NULL, 3, 10,
  ARRAY['seafood', 'oysters', 'aperitivo'], ARRAY['oysters', 'smoked salmon', 'lobster'], ARRAY['Brie', 'Camembert', 'Triple Cream'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 90,
  ARRAY['ING_GRAPE_CHARDONNAY', 'ING_GRAPE_PINOT_NOIR', 'ING_GRAPE_PINOT_MEUNIER'], ARRAY['england', 'sparkling', 'sussex', 'champagne-style', 'premium'], 72, 'premium',
  'traditional', NULL, 24, NULL
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
  'wine-uk-english-blanc-de-blancs', 'kent-blanc-de-blancs', 'Kent Blanc de Blancs', 'All-Chardonnay English sparkling from Kent. Elegant, crisp with citrus, apple, and mineral notes.',
  'sparkling', 'sparkling_brut', 'premium', ARRAY['chardonnay'], false, 'vintage',
  'United Kingdom', 'GB', 'Kent', NULL, NULL, NULL,
  12, 12.5, 'high', NULL, 'bone_dry', 'light', 'none',
  ARRAY['lemon', 'green_apple', 'white_peach'], ARRAY['chalk', 'almond', 'toast'], ARRAY[]::TEXT[], ARRAY['citrus', 'mineral', 'elegant'], 'long',
  6, 8, 'flute', NULL, 3, 12,
  ARRAY['seafood', 'light_fish', 'aperitivo'], ARRAY['ceviche', 'sushi', 'fresh oysters'], ARRAY['Fresh Goat Cheese', 'Gruyère'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 88,
  ARRAY['ING_GRAPE_CHARDONNAY'], ARRAY['england', 'kent', 'blanc_de_blancs', 'sparkling', 'elegant'], 68, 'premium',
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
  'wine-uk-bacchus', 'english-bacchus', 'English Bacchus', 'England''s signature white grape. Aromatic, crisp with elderflower, grapefruit, and grassy notes.',
  'white', 'dry', 'classic', ARRAY['bacchus'], false, 'vintage',
  'United Kingdom', 'GB', 'South East England', NULL, NULL, NULL,
  11, 12.5, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['elderflower', 'grapefruit', 'green_apple'], ARRAY['grass', 'nettle', 'citrus'], ARRAY[]::TEXT[], ARRAY['aromatic', 'fresh', 'floral'], 'medium',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['salads', 'light_fish', 'asian_cuisine'], ARRAY['asparagus', 'goat cheese salad', 'thai food'], ARRAY['Fresh Goat Cheese', 'Feta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_BACCHUS'], ARRAY['england', 'bacchus', 'aromatic', 'sauvignon-like', 'fresh'], 58, 'mid',
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
  'wine-lebanon-bekaa-red-blend', 'bekaa-valley-red-blend', 'Bekaa Valley Red Blend', 'Lebanon''s iconic red blend from Bekaa Valley. Bordeaux varieties with Mediterranean character, rich with cassis, cedar, and spice.',
  'red', 'dry', 'premium', ARRAY['cabernet_sauvignon', 'cinsault', 'carignan'], true, 'vintage',
  'Lebanon', 'LB', 'Bekaa Valley', NULL, NULL, NULL,
  13.5, 14.5, 'medium', 'medium', 'dry', 'medium_full', 'medium',
  ARRAY['cassis', 'blackberry', 'plum'], ARRAY['cedar', 'spice', 'herbs'], ARRAY['leather', 'tobacco'], ARRAY['fruity', 'spicy', 'elegant'], 'long',
  16, 18, 'bordeaux', 30, 5, 20,
  ARRAY['lamb', 'grilled_meat', 'lebanese_cuisine'], ARRAY['kibbeh', 'lamb kofta', 'grilled meats'], ARRAY['Aged Cheddar', 'Manchego'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_CABERNET_SAUVIGNON', 'ING_GRAPE_CINSAULT', 'ING_GRAPE_CARIGNAN'], ARRAY['lebanon', 'bekaa', 'bordeaux-style', 'age-worthy', 'iconic'], 75, 'premium',
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
  'wine-lebanon-white-blend', 'bekaa-white-blend', 'Bekaa Valley White Blend', 'Fresh Lebanese white from Bekaa Valley. Blend of local and French varieties with citrus, peach, and mineral notes.',
  'white', 'dry', 'classic', ARRAY['viognier', 'chardonnay', 'sauvignon_blanc'], true, 'vintage',
  'Lebanon', 'LB', 'Bekaa Valley', NULL, NULL, NULL,
  12.5, 13.5, 'medium_high', NULL, 'dry', 'medium', 'light',
  ARRAY['peach', 'citrus', 'apple'], ARRAY['white_flowers', 'mineral', 'honey'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'fresh'], 'medium',
  8, 10, 'white_wine', NULL, 1, 5,
  ARRAY['mediterranean', 'seafood', 'lebanese_cuisine'], ARRAY['tabbouleh', 'grilled fish', 'hummus'], ARRAY['Feta', 'Halloumi'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 110,
  ARRAY['ING_GRAPE_VIOGNIER', 'ING_GRAPE_CHARDONNAY', 'ING_GRAPE_SAUVIGNON_BLANC'], ARRAY['lebanon', 'bekaa', 'white_blend', 'mediterranean'], 60, 'mid',
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
  'wine-israel-golan-cabernet', 'golan-heights-cabernet', 'Golan Heights Cabernet Sauvignon', 'Premium Israeli Cabernet from volcanic Golan Heights. Rich, structured with blackcurrant, plum, and mineral notes.',
  'red', 'dry', 'premium', ARRAY['cabernet_sauvignon'], false, 'vintage',
  'Israel', 'IL', 'Golan Heights', NULL, NULL, NULL,
  13.5, 15, 'medium_high', 'high', 'dry', 'full', 'medium',
  ARRAY['blackcurrant', 'plum', 'black_cherry'], ARRAY['cedar', 'mint', 'chocolate'], ARRAY['leather', 'mineral'], ARRAY['fruity', 'spicy', 'complex'], 'long',
  16, 18, 'bordeaux', 30, 5, 15,
  ARRAY['red_meat', 'lamb', 'israeli_cuisine'], ARRAY['grilled lamb', 'shawarma', 'beef kebab'], ARRAY['Aged Gouda', 'Pecorino'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 128,
  ARRAY['ING_GRAPE_CABERNET_SAUVIGNON'], ARRAY['israel', 'golan', 'cabernet', 'volcanic', 'premium'], 70, 'premium',
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
  'wine-israel-galilee-syrah', 'upper-galilee-syrah', 'Upper Galilee Syrah', 'Israeli Syrah from the cooler Upper Galilee. Peppery with dark fruit, olive, and herbs.',
  'red', 'dry', 'classic', ARRAY['syrah'], false, 'vintage',
  'Israel', 'IL', 'Galilee', 'Upper Galilee', NULL, NULL,
  13.5, 14.5, 'medium', 'medium', 'dry', 'medium_full', 'medium',
  ARRAY['blackberry', 'plum', 'black_pepper'], ARRAY['olive', 'herbs', 'smoke'], ARRAY[]::TEXT[], ARRAY['fruity', 'peppery', 'savory'], 'medium',
  16, 18, 'bordeaux', NULL, 3, 10,
  ARRAY['grilled_meat', 'mediterranean', 'lamb'], ARRAY['lamb chops', 'grilled eggplant', 'falafel'], ARRAY['Aged Cheddar', 'Blue Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 122,
  ARRAY['ING_GRAPE_SYRAH'], ARRAY['israel', 'galilee', 'syrah', 'peppery', 'mediterranean'], 62, 'mid',
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
  'wine-turkey-okuzgozu', 'eastern-anatolia-okuzgozu', 'Eastern Anatolia Öküzgözü', 'Turkey''s signature indigenous red. "Bull''s Eye" grape with cherry, pomegranate, and spice.',
  'red', 'dry', 'classic', ARRAY['okuzgozu'], false, 'vintage',
  'Turkey', 'TR', 'Eastern Anatolia', 'Elazığ', NULL, NULL,
  12.5, 14, 'medium_high', 'medium', 'dry', 'medium', 'light',
  ARRAY['cherry', 'pomegranate', 'raspberry'], ARRAY['spice', 'herbs', 'earth'], ARRAY[]::TEXT[], ARRAY['fruity', 'fresh', 'aromatic'], 'medium',
  14, 16, 'bordeaux', NULL, 2, 6,
  ARRAY['turkish_cuisine', 'grilled_meat', 'lamb'], ARRAY['kebab', 'lahmacun', 'grilled lamb'], ARRAY['Beyaz Peynir', 'Aged Kaşar'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_OKUZGOZU'], ARRAY['turkey', 'okuzgozu', 'indigenous', 'anatolian', 'fruity'], 55, 'value',
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
  'wine-turkey-bogazkere', 'anatolia-bogazkere', 'Anatolian Boğazkere', 'Turkey''s bold indigenous red. "Throat Scratcher" with intense tannins, dark fruit, and spice.',
  'red', 'dry', 'classic', ARRAY['bogazkere'], false, 'vintage',
  'Turkey', 'TR', 'South Eastern Anatolia', 'Diyarbakır', NULL, NULL,
  13, 14.5, 'medium', 'very_high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'plum', 'mulberry'], ARRAY['black_pepper', 'tobacco', 'leather'], ARRAY[]::TEXT[], ARRAY['intense', 'spicy', 'powerful'], 'long',
  16, 18, 'bordeaux', 45, 5, 15,
  ARRAY['red_meat', 'game', 'aged_cheese'], ARRAY['grilled lamb', 'beef stew', 'aged kaşar'], ARRAY['Aged Kaşar', 'Blue Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_BOGAZKERE'], ARRAY['turkey', 'bogazkere', 'indigenous', 'tannic', 'powerful'], 50, 'mid',
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
  'wine-turkey-narince', 'tokat-narince', 'Tokat Narince', 'Turkey''s elegant indigenous white. Delicate with citrus, white flowers, and mineral notes.',
  'white', 'dry', 'classic', ARRAY['narince'], false, 'vintage',
  'Turkey', 'TR', 'Black Sea', 'Tokat', NULL, NULL,
  11.5, 13, 'medium_high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['citrus', 'green_apple', 'pear'], ARRAY['white_flowers', 'mineral', 'herbs'], ARRAY[]::TEXT[], ARRAY['floral', 'fresh', 'delicate'], 'medium',
  8, 10, 'white_wine', NULL, 1, 4,
  ARRAY['seafood', 'mediterranean', 'light_fare'], ARRAY['grilled fish', 'meze', 'white cheese'], ARRAY['Beyaz Peynir', 'Fresh Goat Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 100,
  ARRAY['ING_GRAPE_NARINCE'], ARRAY['turkey', 'narince', 'indigenous', 'elegant', 'white'], 48, 'value',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- Batch 5 complete
