-- GUDBRO Wines Batch 7/8
-- Wines 121 to 140 of 144
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
  'wine-austria-gruner-veltliner', 'wachau-gruner-veltliner', 'Wachau Grüner Veltliner Smaragd', 'Austria''s signature white at its finest. Full-bodied with stone fruit, white pepper, and minerality.',
  'white', 'dry', 'premium', ARRAY['gruner_veltliner'], false, 'vintage',
  'Austria', 'AT', 'Niederösterreich', 'Wachau', 'DAC', NULL,
  13, 14.5, 'high', NULL, 'dry', 'medium_full', 'none',
  ARRAY['white_peach', 'citrus', 'apple'], ARRAY['white_pepper', 'mineral', 'herbs'], ARRAY['honey', 'smoke'], ARRAY['aromatic', 'mineral', 'complex'], 'long',
  10, 12, 'white_wine', NULL, 3, 12,
  ARRAY['austrian_cuisine', 'pork', 'seafood'], ARRAY['wiener schnitzel', 'grilled fish', 'asparagus'], ARRAY['Aged Alpine Cheese', 'Gruyère'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 118,
  ARRAY['ING_GRAPE_GRUNER_VELTLINER'], ARRAY['austria', 'wachau', 'gruner_veltliner', 'smaragd', 'premium'], 78, 'premium',
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
  'wine-austria-blaufrankisch', 'burgenland-blaufrankisch', 'Burgenland Blaufränkisch', 'Austria''s noble red grape. Elegant with cherry, pepper, and mineral notes. Often compared to Pinot Noir.',
  'red', 'dry', 'premium', ARRAY['blaufrankisch'], false, 'vintage',
  'Austria', 'AT', 'Burgenland', 'Mittelburgenland', 'DAC', NULL,
  12.5, 14, 'high', 'medium', 'dry', 'medium_full', 'light',
  ARRAY['cherry', 'blackberry', 'raspberry'], ARRAY['black_pepper', 'mineral', 'herbs'], ARRAY['earth', 'spice'], ARRAY['fruity', 'peppery', 'elegant'], 'long',
  14, 16, 'burgundy', NULL, 3, 12,
  ARRAY['austrian_cuisine', 'game', 'beef'], ARRAY['tafelspitz', 'venison', 'beef goulash'], ARRAY['Aged Bergkäse', 'Gruyère'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 118,
  ARRAY['ING_GRAPE_BLAUFRANKISCH'], ARRAY['austria', 'burgenland', 'blaufrankisch', 'elegant', 'peppery'], 65, 'mid',
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
  'wine-czech-moravian-riesling', 'moravia-riesling', 'Moravian Riesling', 'Czech Riesling from the Moravia region. Crisp, aromatic with citrus, apple, and mineral notes.',
  'white', 'dry', 'classic', ARRAY['riesling'], false, 'vintage',
  'Czech Republic', 'CZ', 'Moravia', NULL, 'VOC', NULL,
  11.5, 13, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['citrus', 'green_apple', 'pear'], ARRAY['mineral', 'white_flowers', 'petrol'], ARRAY[]::TEXT[], ARRAY['aromatic', 'fresh', 'mineral'], 'medium',
  8, 10, 'white_wine', NULL, 2, 8,
  ARRAY['czech_cuisine', 'pork', 'poultry'], ARRAY['svickova', 'roast pork', 'trout'], ARRAY['Fresh Cheese', 'Hermelín'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 100,
  ARRAY['ING_GRAPE_RIESLING'], ARRAY['czech_republic', 'moravia', 'riesling', 'aromatic', 'central_europe'], 50, 'value',
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
  'wine-czech-palava', 'moravia-palava', 'Moravian Pálava', 'Czech indigenous aromatic white. Cross of Gewürztraminer and Müller-Thurgau with exotic fruit and spice.',
  'white', 'off_dry', 'classic', ARRAY['palava'], false, 'vintage',
  'Czech Republic', 'CZ', 'Moravia', NULL, NULL, NULL,
  12, 13.5, 'medium', NULL, 'off_dry', 'medium', 'none',
  ARRAY['lychee', 'rose', 'peach'], ARRAY['ginger', 'honey', 'spice'], ARRAY[]::TEXT[], ARRAY['aromatic', 'exotic', 'floral'], 'medium',
  8, 10, 'white_wine', NULL, 1, 5,
  ARRAY['asian_cuisine', 'spicy_food', 'foie_gras'], ARRAY['thai curry', 'indian food', 'blue cheese'], ARRAY['Blue Cheese', 'Brie'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 110,
  ARRAY['ING_GRAPE_PALAVA'], ARRAY['czech_republic', 'palava', 'aromatic', 'indigenous', 'gewurz-style'], 45, 'mid',
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
  'wine-slovakia-frankovka-modra', 'slovakia-frankovka-modra', 'Slovak Frankovka Modrá', 'Slovakia''s version of Blaufränkisch. Cherry, pepper, and earthy notes with good acidity.',
  'red', 'dry', 'classic', ARRAY['frankovka_modra'], false, 'vintage',
  'Slovakia', 'SK', 'Small Carpathians', NULL, NULL, NULL,
  12, 13.5, 'high', 'medium', 'dry', 'medium', 'light',
  ARRAY['cherry', 'raspberry', 'plum'], ARRAY['pepper', 'earth', 'herbs'], ARRAY[]::TEXT[], ARRAY['fruity', 'peppery', 'fresh'], 'medium',
  14, 16, 'burgundy', NULL, 2, 8,
  ARRAY['slovak_cuisine', 'game', 'pork'], ARRAY['bryndzové halušky', 'roast duck', 'game stew'], ARRAY['Bryndza', 'Oštiepok'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 112,
  ARRAY['ING_GRAPE_FRANKOVKA_MODRA'], ARRAY['slovakia', 'frankovka', 'blaufrankisch', 'central_europe'], 42, 'value',
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
  'wine-ukraine-odessa-cabernet', 'odessa-cabernet-sauvignon', 'Odessa Black Sea Cabernet', 'Ukrainian Cabernet from the Black Sea region. Rich, dark fruit with earthy notes and moderate tannins.',
  'red', 'dry', 'classic', ARRAY['cabernet_sauvignon'], false, 'vintage',
  'Ukraine', 'UA', 'Odessa', 'Black Sea', NULL, NULL,
  12.5, 14, 'medium', 'medium', 'dry', 'medium_full', 'medium',
  ARRAY['blackcurrant', 'plum', 'cherry'], ARRAY['earth', 'herbs', 'cedar'], ARRAY[]::TEXT[], ARRAY['fruity', 'earthy', 'classic'], 'medium',
  16, 18, 'bordeaux', NULL, 3, 10,
  ARRAY['ukrainian_cuisine', 'red_meat', 'stews'], ARRAY['borscht', 'beef stew', 'grilled lamb'], ARRAY['Aged Cheese', 'Brynza'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 118,
  ARRAY['ING_GRAPE_CABERNET_SAUVIGNON'], ARRAY['ukraine', 'odessa', 'black_sea', 'cabernet', 'eastern_europe'], 40, 'value',
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
  'wine-ukraine-shabo-chardonnay', 'shabo-chardonnay', 'Shabo Chardonnay', 'Ukrainian Chardonnay from the Shabo wine region. Fresh, fruity with citrus and tropical notes.',
  'white', 'dry', 'classic', ARRAY['chardonnay'], false, 'vintage',
  'Ukraine', 'UA', 'Odessa', 'Shabo', NULL, NULL,
  12, 13.5, 'medium_high', NULL, 'dry', 'medium', 'light',
  ARRAY['citrus', 'apple', 'pear'], ARRAY['tropical_fruit', 'vanilla', 'butter'], ARRAY[]::TEXT[], ARRAY['fresh', 'fruity', 'elegant'], 'medium',
  8, 10, 'white_wine', NULL, 1, 4,
  ARRAY['seafood', 'poultry', 'ukrainian_cuisine'], ARRAY['grilled fish', 'chicken kiev', 'varenyky'], ARRAY['Fresh Cheese', 'Brie'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 108,
  ARRAY['ING_GRAPE_CHARDONNAY'], ARRAY['ukraine', 'shabo', 'chardonnay', 'black_sea'], 38, 'value',
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
  'wine-cyprus-commandaria', 'cyprus-commandaria', 'Commandaria', 'World''s oldest named wine, from Cyprus. Sweet, amber dessert wine with dried fruit, caramel, and spice.',
  'dessert', 'sweet', 'premium', ARRAY['xynisteri', 'mavro'], true, 'non_vintage',
  'Cyprus', 'CY', 'Commandaria', NULL, 'PDO', NULL,
  15, 20, 'medium', NULL, 'very_sweet', 'full', 'medium',
  ARRAY['dried_fig', 'raisin', 'date'], ARRAY['caramel', 'coffee', 'spice'], ARRAY['nuts', 'chocolate'], ARRAY['sweet', 'rich', 'complex'], 'very_long',
  14, 16, 'dessert', NULL, 10, 50,
  ARRAY['desserts', 'blue_cheese', 'dried_fruit'], ARRAY['baklava', 'dark chocolate', 'blue cheese'], ARRAY['Blue Cheese', 'Aged Halloumi'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 180,
  ARRAY['ING_GRAPE_XYNISTERI', 'ING_GRAPE_MAVRO'], ARRAY['cyprus', 'commandaria', 'dessert', 'ancient', 'historic', 'oldest_wine'], 65, 'premium',
  'sun_drying', 'oak', 24, NULL
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
  'wine-cyprus-xynisteri', 'cyprus-xynisteri', 'Cyprus Xynisteri', 'Cyprus indigenous white grape. Fresh, crisp with citrus, mineral, and herbal notes.',
  'white', 'dry', 'classic', ARRAY['xynisteri'], false, 'vintage',
  'Cyprus', 'CY', 'Troodos Mountains', NULL, NULL, NULL,
  11.5, 13, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['citrus', 'green_apple', 'pear'], ARRAY['mineral', 'herbs', 'white_flowers'], ARRAY[]::TEXT[], ARRAY['fresh', 'crisp', 'mineral'], 'medium',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['cypriot_cuisine', 'seafood', 'mezze'], ARRAY['grilled halloumi', 'fresh fish', 'mezze platter'], ARRAY['Halloumi', 'Feta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_XYNISTERI'], ARRAY['cyprus', 'xynisteri', 'indigenous', 'fresh', 'mediterranean'], 48, 'value',
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
  'wine-tunisia-mornag-red', 'mornag-red-blend', 'Mornag Red Blend', 'Tunisian red from the Mornag region. Mediterranean blend with dark fruit, herbs, and spice.',
  'red', 'dry', 'classic', ARRAY['carignan', 'syrah', 'mourvèdre'], true, 'vintage',
  'Tunisia', 'TN', 'Mornag', NULL, 'AOC', NULL,
  12.5, 14, 'medium', 'medium', 'dry', 'medium_full', 'light',
  ARRAY['blackberry', 'plum', 'cherry'], ARRAY['herbs', 'spice', 'earth'], ARRAY[]::TEXT[], ARRAY['fruity', 'mediterranean', 'warm'], 'medium',
  16, 18, 'bordeaux', NULL, 2, 6,
  ARRAY['tunisian_cuisine', 'lamb', 'couscous'], ARRAY['couscous', 'merguez', 'grilled lamb'], ARRAY['Aged Cheese', 'Manchego'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_CARIGNAN', 'ING_GRAPE_SYRAH', 'ING_GRAPE_MOURVEDRE'], ARRAY['tunisia', 'mornag', 'north_africa', 'mediterranean', 'blend'], 40, 'value',
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
  'wine-tunisia-muscat-kelibia', 'muscat-de-kelibia', 'Muscat de Kélibia', 'Tunisia''s signature white from Cap Bon. Sweet, aromatic with grape, orange blossom, and honey.',
  'white', 'sweet', 'classic', ARRAY['muscat_alexandria'], false, 'vintage',
  'Tunisia', 'TN', 'Cap Bon', 'Kélibia', 'AOC', NULL,
  11.5, 13, 'medium', NULL, 'sweet', 'medium', 'none',
  ARRAY['grape', 'orange_blossom', 'lychee'], ARRAY['honey', 'rose', 'citrus'], ARRAY[]::TEXT[], ARRAY['aromatic', 'sweet', 'floral'], 'medium',
  6, 8, 'white_wine', NULL, 1, 3,
  ARRAY['desserts', 'pastries', 'fruit'], ARRAY['baklava', 'makroudh', 'fresh fruit'], ARRAY['Fresh Cheese', 'Ricotta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 130,
  ARRAY['ING_GRAPE_MUSCAT_ALEXANDRIA'], ARRAY['tunisia', 'muscat', 'kelibia', 'sweet', 'aromatic'], 45, 'value',
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
  'wine-algeria-medea-red', 'medea-coteaux-red', 'Médéa Coteaux Red', 'Algerian red from the Médéa highlands. Full-bodied with dark fruit, spice, and Mediterranean herbs.',
  'red', 'dry', 'classic', ARRAY['cinsault', 'carignan', 'alicante_bouschet'], true, 'vintage',
  'Algeria', 'DZ', 'Médéa', NULL, 'VQPRD', NULL,
  13, 14.5, 'medium', 'medium', 'dry', 'full', 'light',
  ARRAY['blackberry', 'plum', 'fig'], ARRAY['herbs', 'spice', 'earth'], ARRAY[]::TEXT[], ARRAY['fruity', 'warm', 'rustic'], 'medium',
  16, 18, 'bordeaux', NULL, 2, 6,
  ARRAY['algerian_cuisine', 'couscous', 'lamb'], ARRAY['couscous', 'mechoui', 'tagine'], ARRAY['Aged Cheese', 'Pecorino'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_CINSAULT', 'ING_GRAPE_CARIGNAN', 'ING_GRAPE_ALICANTE_BOUSCHET'], ARRAY['algeria', 'medea', 'north_africa', 'highlands', 'blend'], 35, 'budget',
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
  'wine-peru-ica-tannat', 'ica-valley-tannat', 'Ica Valley Tannat', 'Peruvian Tannat from the Ica Valley. Bold, tannic with dark fruit, chocolate, and violet notes.',
  'red', 'dry', 'classic', ARRAY['tannat'], false, 'vintage',
  'Peru', 'PE', 'Ica Valley', NULL, NULL, NULL,
  13.5, 15, 'medium_high', 'high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'plum', 'black_cherry'], ARRAY['chocolate', 'violet', 'spice'], ARRAY[]::TEXT[], ARRAY['intense', 'fruity', 'powerful'], 'long',
  16, 18, 'bordeaux', 45, 3, 12,
  ARRAY['peruvian_cuisine', 'red_meat', 'bbq'], ARRAY['anticuchos', 'lomo saltado', 'grilled beef'], ARRAY['Aged Manchego', 'Blue Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 128,
  ARRAY['ING_GRAPE_TANNAT'], ARRAY['peru', 'ica', 'tannat', 'high_altitude', 'south_america'], 48, 'mid',
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
  'wine-peru-pisco-grape', 'ica-quebranta', 'Ica Valley Quebranta', 'Rare still wine from Peru''s Pisco grape. Light, fruity with grape and floral notes.',
  'white', 'dry', 'classic', ARRAY['quebranta'], false, 'vintage',
  'Peru', 'PE', 'Ica Valley', NULL, NULL, NULL,
  12, 13.5, 'medium', NULL, 'dry', 'light', 'none',
  ARRAY['grape', 'citrus', 'pear'], ARRAY['white_flowers', 'herbs'], ARRAY[]::TEXT[], ARRAY['fruity', 'fresh', 'light'], 'short',
  8, 10, 'white_wine', NULL, 1, 2,
  ARRAY['peruvian_cuisine', 'ceviche', 'seafood'], ARRAY['ceviche', 'tiradito', 'grilled fish'], ARRAY['Fresh Cheese', 'Queso Fresco'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_QUEBRANTA'], ARRAY['peru', 'quebranta', 'pisco_grape', 'indigenous', 'unique'], 35, 'mid',
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
  'wine-bolivia-tarija-tannat', 'tarija-high-altitude-tannat', 'Tarija High Altitude Tannat', 'World''s highest altitude vineyard wines from Bolivia. Intense, concentrated with powerful tannins.',
  'red', 'dry', 'premium', ARRAY['tannat'], false, 'vintage',
  'Bolivia', 'BO', 'Tarija', 'Cinti Valley', NULL, NULL,
  14, 15.5, 'high', 'very_high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'black_cherry', 'plum'], ARRAY['chocolate', 'coffee', 'violet'], ARRAY['leather', 'tobacco'], ARRAY['intense', 'concentrated', 'powerful'], 'very_long',
  16, 18, 'bordeaux', 60, 5, 15,
  ARRAY['bolivian_cuisine', 'red_meat', 'game'], ARRAY['silpancho', 'grilled llama', 'beef'], ARRAY['Aged Hard Cheese', 'Blue Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 135,
  ARRAY['ING_GRAPE_TANNAT'], ARRAY['bolivia', 'tarija', 'highest_altitude', 'tannat', 'extreme'], 42, 'mid',
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
  'wine-thailand-khao-yai-shiraz', 'khao-yai-shiraz', 'Khao Yai Shiraz', 'Thai Shiraz from Khao Yai highlands. Tropical, spicy with dark fruit and pepper.',
  'red', 'dry', 'classic', ARRAY['shiraz'], false, 'vintage',
  'Thailand', 'TH', 'Khao Yai', NULL, NULL, NULL,
  12.5, 14, 'medium', 'medium', 'dry', 'medium_full', 'medium',
  ARRAY['blackberry', 'plum', 'black_pepper'], ARRAY['tropical_fruit', 'spice', 'herbs'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'exotic'], 'medium',
  16, 18, 'bordeaux', NULL, 2, 6,
  ARRAY['thai_cuisine', 'grilled_meat', 'spicy_food'], ARRAY['grilled beef', 'massaman curry', 'bbq ribs'], ARRAY['Aged Cheddar', 'Gouda'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 118,
  ARRAY['ING_GRAPE_SHIRAZ'], ARRAY['thailand', 'khao_yai', 'tropical', 'emerging', 'southeast_asia'], 45, 'mid',
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
  'wine-thailand-chenin-blanc', 'hua-hin-chenin-blanc', 'Hua Hin Hills Chenin Blanc', 'Thai Chenin Blanc from monsoon climate. Fresh, tropical with pineapple and citrus.',
  'white', 'dry', 'classic', ARRAY['chenin_blanc'], false, 'vintage',
  'Thailand', 'TH', 'Hua Hin', NULL, NULL, NULL,
  11.5, 13, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['pineapple', 'citrus', 'green_apple'], ARRAY['tropical_fruit', 'honey', 'flowers'], ARRAY[]::TEXT[], ARRAY['tropical', 'fresh', 'aromatic'], 'medium',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['thai_cuisine', 'seafood', 'spicy_food'], ARRAY['pad thai', 'green curry', 'grilled prawns'], ARRAY['Fresh Cheese', 'Mild Brie'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 100,
  ARRAY['ING_GRAPE_CHENIN_BLANC'], ARRAY['thailand', 'hua_hin', 'tropical', 'chenin', 'monsoon'], 42, 'mid',
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
  'wine-vietnam-dalat-red', 'dalat-cardinal-red', 'Da Lat Cardinal Red', 'Vietnamese red from Da Lat highlands. Light, fruity with cherry and plum notes.',
  'red', 'dry', 'classic', ARRAY['cardinal'], false, 'vintage',
  'Vietnam', 'VN', 'Lam Dong', 'Da Lat', NULL, NULL,
  11, 12.5, 'medium', 'low', 'dry', 'light', 'none',
  ARRAY['cherry', 'plum', 'strawberry'], ARRAY['herbs', 'earth'], ARRAY[]::TEXT[], ARRAY['fruity', 'light', 'fresh'], 'short',
  12, 14, 'burgundy', NULL, 1, 3,
  ARRAY['vietnamese_cuisine', 'light_fare', 'asian'], ARRAY['pho', 'banh mi', 'spring rolls'], ARRAY['Fresh Cheese', 'Mild Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_CARDINAL'], ARRAY['vietnam', 'dalat', 'tropical', 'light', 'emerging'], 38, 'value',
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
  'wine-belgium-chardonnay', 'wallonia-chardonnay', 'Wallonia Chardonnay', 'Belgian Chardonnay from southern Wallonia. Crisp, mineral with citrus and green apple.',
  'white', 'dry', 'classic', ARRAY['chardonnay'], false, 'vintage',
  'Belgium', 'BE', 'Wallonia', NULL, 'AOC Côtes de Sambre et Meuse', NULL,
  11, 12.5, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['citrus', 'green_apple', 'pear'], ARRAY['mineral', 'chalk', 'white_flowers'], ARRAY[]::TEXT[], ARRAY['fresh', 'mineral', 'crisp'], 'medium',
  8, 10, 'white_wine', NULL, 1, 4,
  ARRAY['belgian_cuisine', 'seafood', 'mussels'], ARRAY['moules frites', 'grilled fish', 'asparagus'], ARRAY['Brie', 'Herve'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_CHARDONNAY'], ARRAY['belgium', 'wallonia', 'chardonnay', 'cool_climate', 'rare'], 35, 'mid',
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
  'wine-luxembourg-riesling', 'moselle-luxembourg-riesling', 'Moselle Luxembourgeoise Riesling', 'Luxembourg Riesling from the Moselle. Elegant, mineral with citrus and stone fruit.',
  'white', 'dry', 'premium', ARRAY['riesling'], false, 'vintage',
  'Luxembourg', 'LU', 'Moselle', NULL, 'AOP', NULL,
  11.5, 13, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['citrus', 'peach', 'apple'], ARRAY['mineral', 'slate', 'petrol'], ARRAY[]::TEXT[], ARRAY['aromatic', 'mineral', 'elegant'], 'long',
  8, 10, 'white_wine', NULL, 3, 10,
  ARRAY['luxembourgish_cuisine', 'pork', 'fish'], ARRAY['judd mat gaardebounen', 'trout', 'pork'], ARRAY['Gruyère', 'Comté'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 100,
  ARRAY['ING_GRAPE_RIESLING'], ARRAY['luxembourg', 'moselle', 'riesling', 'elegant', 'mineral'], 45, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- Batch 7 complete
