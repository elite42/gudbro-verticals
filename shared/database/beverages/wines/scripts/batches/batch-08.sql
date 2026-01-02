-- GUDBRO Wines Batch 8/8
-- Wines 141 to 144 of 144
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
  'wine-luxembourg-cremant', 'cremant-luxembourg', 'Crémant de Luxembourg', 'Luxembourg''s traditional method sparkling. Fine bubbles with apple, citrus, and brioche.',
  'sparkling', 'sparkling_brut', 'premium', ARRAY['riesling', 'pinot_blanc', 'chardonnay'], true, 'non_vintage',
  'Luxembourg', 'LU', 'Moselle', NULL, 'AOP Crémant de Luxembourg', NULL,
  11.5, 12.5, 'high', NULL, 'bone_dry', 'light', 'none',
  ARRAY['green_apple', 'citrus', 'pear'], ARRAY['brioche', 'almond', 'toast'], ARRAY[]::TEXT[], ARRAY['fresh', 'elegant', 'refined'], 'long',
  6, 8, 'flute', NULL, 2, 6,
  ARRAY['aperitivo', 'seafood', 'celebrations'], ARRAY['oysters', 'smoked salmon', 'canapés'], ARRAY['Brie', 'Comté'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 88,
  ARRAY['ING_GRAPE_RIESLING', 'ING_GRAPE_PINOT_BLANC', 'ING_GRAPE_CHARDONNAY'], ARRAY['luxembourg', 'cremant', 'sparkling', 'traditional_method', 'elegant'], 52, 'mid',
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
  'wine-indonesia-bali-rose', 'bali-hatten-rose', 'Bali Rosé', 'Indonesian rosé from Bali. Light, tropical with strawberry, watermelon, and citrus. Made from Alphonse Lavallée grapes.',
  'rosé', 'dry', 'classic', ARRAY['alphonse_lavallee'], false, 'vintage',
  'Indonesia', 'ID', 'Bali', 'Buleleng', NULL, NULL,
  11, 12.5, 'medium', NULL, 'dry', 'light', 'none',
  ARRAY['strawberry', 'watermelon', 'citrus'], ARRAY['tropical_fruit', 'white_flowers'], ARRAY[]::TEXT[], ARRAY['fruity', 'fresh', 'tropical'], 'short',
  6, 8, 'white_wine', NULL, 1, 2,
  ARRAY['indonesian_cuisine', 'seafood', 'spicy_food'], ARRAY['satay', 'nasi goreng', 'grilled fish'], ARRAY['Fresh Cheese', 'Mild Brie'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_ALPHONSE_LAVALLEE'], ARRAY['indonesia', 'bali', 'tropical', 'rose', 'exotic'], 40, 'mid',
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
  'wine-indonesia-two-islands-white', 'bali-two-islands-white', 'Bali Two Islands White', 'Indonesian white blend from Bali. Fresh, aromatic with tropical fruit and citrus notes.',
  'white', 'dry', 'classic', ARRAY['belgia', 'alphonse_lavallee'], true, 'vintage',
  'Indonesia', 'ID', 'Bali', NULL, NULL, NULL,
  11, 12.5, 'medium_high', NULL, 'dry', 'light', 'none',
  ARRAY['pineapple', 'citrus', 'mango'], ARRAY['white_flowers', 'herbs'], ARRAY[]::TEXT[], ARRAY['tropical', 'fresh', 'aromatic'], 'short',
  6, 8, 'white_wine', NULL, 1, 2,
  ARRAY['indonesian_cuisine', 'seafood', 'thai_cuisine'], ARRAY['gado-gado', 'grilled prawns', 'spring rolls'], ARRAY['Fresh Cheese', 'Feta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 90,
  ARRAY['ING_GRAPE_BELGIA', 'ING_GRAPE_ALPHONSE_LAVALLEE'], ARRAY['indonesia', 'bali', 'tropical', 'white', 'exotic'], 38, 'mid',
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
  'wine-malta-gellewza', 'malta-gellewza', 'Maltese Gellewża', 'Malta''s indigenous red grape. Light, fruity with cherry, raspberry, and Mediterranean herbs.',
  'red', 'dry', 'classic', ARRAY['gellewza'], false, 'vintage',
  'Malta', 'MT', 'Gozo', NULL, 'DOK', NULL,
  12, 13.5, 'medium_high', 'medium', 'dry', 'medium_light', 'light',
  ARRAY['cherry', 'raspberry', 'plum'], ARRAY['herbs', 'earth', 'spice'], ARRAY[]::TEXT[], ARRAY['fruity', 'fresh', 'mediterranean'], 'medium',
  14, 16, 'burgundy', NULL, 2, 6,
  ARRAY['maltese_cuisine', 'rabbit', 'mediterranean'], ARRAY['stuffat tal-fenek', 'grilled fish', 'timpana'], ARRAY['Gbejna', 'Pecorino'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 110,
  ARRAY['ING_GRAPE_GELLEWZA'], ARRAY['malta', 'gellewza', 'indigenous', 'mediterranean', 'island'], 40, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- Batch 8 complete
