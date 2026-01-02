-- GUDBRO Wines Batch 2/8
-- Wines 21 to 40 of 144
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
  'wine-meursault', 'meursault', 'Meursault', 'Rich, opulent Burgundy white with butter, hazelnut, and ripe fruit. The quintessential oaked Chardonnay.',
  'white', 'dry', 'premium', ARRAY['chardonnay'], false, 'vintage',
  'France', 'FR', 'Burgundy', 'Côte de Beaune', 'AOC', NULL,
  12.5, 14, 'medium_high', NULL, 'dry', 'full', 'medium',
  ARRAY['apple', 'pear', 'citrus'], ARRAY['butter', 'hazelnut', 'vanilla'], ARRAY['honey', 'toast'], ARRAY['fruity', 'nutty', 'rich'], 'long',
  10, 12, 'burgundy', NULL, 3, 12,
  ARRAY['poultry', 'lobster', 'cream_sauces'], ARRAY['lobster thermidor', 'roast chicken', 'creamy pasta'], ARRAY['Comté', 'Gruyère', 'Époisses'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_CHARDONNAY'], ARRAY['burgundy', 'chardonnay', 'oaked', 'premium', 'rich'], 88, 'premium',
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
  'wine-sancerre', 'sancerre', 'Sancerre', 'Benchmark Loire Valley Sauvignon Blanc. Crisp, aromatic, with citrus, green apple, and flinty minerality.',
  'white', 'dry', 'classic', ARRAY['sauvignon_blanc'], false, 'vintage',
  'France', 'FR', 'Loire Valley', 'Sancerre', 'AOC', NULL,
  12, 13.5, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['grapefruit', 'lime', 'green_apple'], ARRAY['flint', 'herbs', 'grass'], ARRAY[]::TEXT[], ARRAY['citrus', 'herbal', 'mineral'], 'medium',
  8, 10, 'white_wine', NULL, 1, 5,
  ARRAY['goat_cheese', 'seafood', 'salads'], ARRAY['crottin de chavignol', 'grilled fish', 'asparagus'], ARRAY['Crottin de Chavignol', 'Chèvre'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 105,
  ARRAY['ING_GRAPE_SAUVIGNON_BLANC'], ARRAY['loire', 'sauvignon_blanc', 'crisp', 'mineral', 'goat_cheese'], 82, 'mid',
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
  'wine-pouilly-fume', 'pouilly-fume', 'Pouilly-Fumé', 'Smoky Loire Sauvignon Blanc from flint soils. More mineral and subtle than Sancerre.',
  'white', 'dry', 'classic', ARRAY['sauvignon_blanc'], false, 'vintage',
  'France', 'FR', 'Loire Valley', 'Pouilly-sur-Loire', 'AOC', NULL,
  12, 13.5, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['citrus', 'pear', 'white_peach'], ARRAY['gunflint', 'smoke', 'herbs'], ARRAY[]::TEXT[], ARRAY['mineral', 'smoky', 'elegant'], 'long',
  8, 10, 'white_wine', NULL, 2, 6,
  ARRAY['seafood', 'fish', 'light_poultry'], ARRAY['pike perch', 'smoked salmon', 'chicken salad'], ARRAY['Chèvre', 'Selles-sur-Cher'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 108,
  ARRAY['ING_GRAPE_SAUVIGNON_BLANC'], ARRAY['loire', 'sauvignon_blanc', 'smoky', 'flint', 'elegant'], 78, 'mid',
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
  'wine-alsace-riesling', 'alsace-riesling', 'Alsace Riesling', 'French Riesling with dry, mineral character. Citrus, stone fruit, and distinctive petrol notes with age.',
  'white', 'dry', 'classic', ARRAY['riesling'], false, 'vintage',
  'France', 'FR', 'Alsace', NULL, 'AOC', NULL,
  12, 14, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['lime', 'lemon', 'green_apple'], ARRAY['white_peach', 'apricot', 'mineral'], ARRAY['petrol', 'honey'], ARRAY['citrus', 'floral', 'mineral'], 'long',
  8, 10, 'white_wine', NULL, 3, 15,
  ARRAY['asian_cuisine', 'spicy_food', 'pork'], ARRAY['choucroute garnie', 'thai curry', 'pork roast'], ARRAY['Munster', 'Gruyère'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_RIESLING'], ARRAY['alsace', 'riesling', 'dry', 'mineral', 'age-worthy'], 80, 'mid',
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
  'wine-gewurztraminer', 'alsace-gewurztraminer', 'Alsace Gewürztraminer', 'Intensely aromatic white with lychee, rose, and exotic spice. Rich and distinctive.',
  'white', 'off_dry', 'classic', ARRAY['gewurztraminer'], false, 'vintage',
  'France', 'FR', 'Alsace', NULL, 'AOC', NULL,
  13, 14.5, 'medium_low', NULL, 'off_dry', 'full', 'none',
  ARRAY['lychee', 'rose', 'ginger'], ARRAY['honey', 'tropical_fruit', 'spice'], ARRAY[]::TEXT[], ARRAY['floral', 'exotic', 'spicy'], 'long',
  10, 12, 'white_wine', NULL, 2, 10,
  ARRAY['asian_cuisine', 'spicy_food', 'foie_gras'], ARRAY['foie gras', 'thai cuisine', 'indian curry'], ARRAY['Munster', 'Blue Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 130,
  ARRAY['ING_GRAPE_GEWURZTRAMINER'], ARRAY['alsace', 'gewurztraminer', 'aromatic', 'exotic', 'spicy'], 72, 'mid',
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
  'wine-german-riesling-dry', 'mosel-riesling-trocken', 'Mosel Riesling Trocken', 'Dry German Riesling from steep Mosel slopes. Razor-sharp acidity with slate minerality.',
  'white', 'dry', 'classic', ARRAY['riesling'], false, 'vintage',
  'Germany', 'DE', 'Mosel', NULL, 'QbA', NULL,
  11, 12.5, 'high', NULL, 'bone_dry', 'light', 'none',
  ARRAY['lime', 'green_apple', 'lemon'], ARRAY['slate', 'mineral', 'white_flower'], ARRAY[]::TEXT[], ARRAY['citrus', 'mineral', 'floral'], 'long',
  8, 10, 'white_wine', NULL, 3, 20,
  ARRAY['seafood', 'asian_cuisine', 'light_fare'], ARRAY['sushi', 'shellfish', 'salads'], ARRAY['Fresh Goat Cheese', 'Gruyère'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_RIESLING'], ARRAY['mosel', 'riesling', 'trocken', 'dry', 'slate'], 82, 'mid',
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
  'wine-german-riesling-spatlese', 'rheingau-riesling-spatlese', 'Rheingau Riesling Spätlese', 'Late harvest German Riesling with balanced sweetness and acidity. Apricot, honey, and citrus.',
  'white', 'off_dry', 'premium', ARRAY['riesling'], false, 'vintage',
  'Germany', 'DE', 'Rheingau', NULL, 'Prädikatswein', 'Spätlese',
  8, 11, 'high', NULL, 'off_dry', 'medium_light', 'none',
  ARRAY['apricot', 'peach', 'apple'], ARRAY['honey', 'citrus', 'mineral'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'honeyed'], 'long',
  8, 10, 'white_wine', NULL, 5, 25,
  ARRAY['spicy_food', 'foie_gras', 'fruit_desserts'], ARRAY['spicy asian', 'foie gras', 'apple tart'], ARRAY['Blue Cheese', 'Aged Gouda'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 100,
  ARRAY['ING_GRAPE_RIESLING'], ARRAY['rheingau', 'riesling', 'spatlese', 'off-dry', 'age-worthy'], 75, 'mid',
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
  'wine-pinot-grigio', 'pinot-grigio-alto-adige', 'Alto Adige Pinot Grigio', 'Crisp, refreshing Italian white from the Dolomite foothills. Citrus, pear, and almond notes.',
  'white', 'dry', 'classic', ARRAY['pinot_grigio'], false, 'vintage',
  'Italy', 'IT', 'Trentino-Alto Adige', 'Alto Adige', 'DOC', NULL,
  12, 13.5, 'medium_high', NULL, 'dry', 'light', 'none',
  ARRAY['pear', 'lemon', 'apple'], ARRAY['almond', 'mineral'], ARRAY[]::TEXT[], ARRAY['fruity', 'fresh', 'clean'], 'medium',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['salads', 'light_fish', 'appetizers'], ARRAY['bruschetta', 'grilled vegetables', 'light pasta'], ARRAY['Fresh Mozzarella', 'Burrata'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 105,
  ARRAY['ING_GRAPE_PINOT_GRIGIO'], ARRAY['alto_adige', 'pinot_grigio', 'crisp', 'light', 'everyday'], 85, 'value',
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
  'wine-verdicchio', 'verdicchio-dei-castelli-di-jesi', 'Verdicchio dei Castelli di Jesi', 'Distinctive Marche white with almond bitterness, citrus, and saline minerality.',
  'white', 'dry', 'classic', ARRAY['verdicchio'], false, 'vintage',
  'Italy', 'IT', 'Marche', NULL, 'DOC', NULL,
  11.5, 13, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['lemon', 'green_apple', 'pear'], ARRAY['almond', 'saline', 'herbs'], ARRAY[]::TEXT[], ARRAY['citrus', 'nutty', 'mineral'], 'long',
  8, 10, 'white_wine', NULL, 2, 6,
  ARRAY['seafood', 'fish', 'mediterranean'], ARRAY['grilled fish', 'seafood pasta', 'fried calamari'], ARRAY['Pecorino', 'Fresh Mozzarella'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 108,
  ARRAY['ING_GRAPE_VERDICCHIO'], ARRAY['marche', 'verdicchio', 'almond', 'saline', 'seafood'], 68, 'value',
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
  'wine-gavi', 'gavi-di-gavi', 'Gavi di Gavi', 'Elegant Piedmont white from Cortese grapes. Crisp, with citrus, white flowers, and mineral.',
  'white', 'dry', 'classic', ARRAY['cortese'], false, 'vintage',
  'Italy', 'IT', 'Piedmont', 'Gavi', 'DOCG', NULL,
  11, 13, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['lemon', 'lime', 'green_apple'], ARRAY['white_flowers', 'almond', 'mineral'], ARRAY[]::TEXT[], ARRAY['citrus', 'floral', 'fresh'], 'medium',
  8, 10, 'white_wine', NULL, 1, 4,
  ARRAY['seafood', 'light_pasta', 'aperitivo'], ARRAY['pesto pasta', 'grilled prawns', 'vitello tonnato'], ARRAY['Robiola', 'Burrata'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 102,
  ARRAY['ING_GRAPE_CORTESE'], ARRAY['piedmont', 'gavi', 'cortese', 'crisp', 'elegant'], 72, 'mid',
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
  'wine-soave', 'soave-classico', 'Soave Classico', 'Classic Veneto white from Garganega. Light, fresh, with almond and citrus character.',
  'white', 'dry', 'classic', ARRAY['garganega'], false, 'vintage',
  'Italy', 'IT', 'Veneto', 'Soave', 'DOC', NULL,
  11, 12.5, 'medium_high', NULL, 'dry', 'light', 'none',
  ARRAY['lemon', 'apple', 'pear'], ARRAY['almond', 'white_flowers'], ARRAY[]::TEXT[], ARRAY['fruity', 'fresh', 'delicate'], 'medium',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['aperitivo', 'light_fish', 'risotto'], ARRAY['risotto primavera', 'grilled fish', 'antipasti'], ARRAY['Asiago Fresco', 'Taleggio'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 100,
  ARRAY['ING_GRAPE_GARGANEGA'], ARRAY['veneto', 'soave', 'garganega', 'light', 'aperitivo'], 75, 'value',
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
  'wine-fiano', 'fiano-di-avellino', 'Fiano di Avellino', 'Complex Campania white with hazelnut, pear, and honey. Age-worthy and distinctive.',
  'white', 'dry', 'premium', ARRAY['fiano'], false, 'vintage',
  'Italy', 'IT', 'Campania', 'Avellino', 'DOCG', NULL,
  12, 13.5, 'high', NULL, 'dry', 'medium_full', 'light',
  ARRAY['pear', 'apple', 'citrus'], ARRAY['hazelnut', 'honey', 'herbs'], ARRAY['mineral', 'smoke'], ARRAY['fruity', 'nutty', 'complex'], 'long',
  10, 12, 'white_wine', NULL, 3, 10,
  ARRAY['seafood', 'rich_fish', 'white_meat'], ARRAY['grilled swordfish', 'chicken with herbs', 'buffalo mozzarella'], ARRAY['Mozzarella di Bufala', 'Provolone'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 118,
  ARRAY['ING_GRAPE_FIANO'], ARRAY['campania', 'fiano', 'complex', 'age-worthy', 'nutty'], 70, 'mid',
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
  'wine-albarino', 'rias-baixas-albarino', 'Rías Baixas Albariño', 'Galician white with bright acidity and saline minerality. Citrus, stone fruit, and sea spray.',
  'white', 'dry', 'classic', ARRAY['albarino'], false, 'vintage',
  'Spain', 'ES', 'Galicia', 'Rías Baixas', 'DO', NULL,
  12, 13.5, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['lemon', 'peach', 'apricot'], ARRAY['saline', 'white_flowers', 'herbs'], ARRAY[]::TEXT[], ARRAY['citrus', 'floral', 'mineral'], 'long',
  8, 10, 'white_wine', NULL, 1, 4,
  ARRAY['seafood', 'shellfish', 'tapas'], ARRAY['pulpo a la gallega', 'gambas', 'percebes'], ARRAY['Tetilla', 'Fresh Goat Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 110,
  ARRAY['ING_GRAPE_ALBARINO'], ARRAY['galicia', 'albarino', 'saline', 'seafood', 'fresh'], 80, 'mid',
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
  'wine-verdejo', 'rueda-verdejo', 'Rueda Verdejo', 'Aromatic Spanish white with herbal and citrus notes. Fresh and food-friendly.',
  'white', 'dry', 'classic', ARRAY['verdejo'], false, 'vintage',
  'Spain', 'ES', 'Castilla y León', 'Rueda', 'DO', NULL,
  12, 13.5, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['grapefruit', 'lime', 'green_apple'], ARRAY['herbs', 'fennel', 'grass'], ARRAY[]::TEXT[], ARRAY['citrus', 'herbal', 'fresh'], 'medium',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['tapas', 'salads', 'light_fish'], ARRAY['patatas bravas', 'grilled vegetables', 'white fish'], ARRAY['Manchego Fresco', 'Burgos'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 105,
  ARRAY['ING_GRAPE_VERDEJO'], ARRAY['rueda', 'verdejo', 'herbal', 'fresh', 'value'], 75, 'value',
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
  'wine-nz-sauvignon-blanc', 'marlborough-sauvignon-blanc', 'Marlborough Sauvignon Blanc', 'Iconic New Zealand white with intense aromatics. Passionfruit, citrus, and cut grass.',
  'white', 'dry', 'classic', ARRAY['sauvignon_blanc'], false, 'vintage',
  'New Zealand', 'NZ', 'Marlborough', NULL, NULL, NULL,
  12.5, 14, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['passionfruit', 'grapefruit', 'lime'], ARRAY['grass', 'gooseberry', 'jalapeño'], ARRAY[]::TEXT[], ARRAY['tropical', 'citrus', 'herbal'], 'long',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['seafood', 'asian_cuisine', 'salads'], ARRAY['green curry', 'goat cheese', 'ceviche'], ARRAY['Fresh Goat Cheese', 'Feta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_SAUVIGNON_BLANC'], ARRAY['marlborough', 'sauvignon_blanc', 'aromatic', 'tropical', 'new_zealand'], 90, 'mid',
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
  'wine-napa-chardonnay', 'napa-valley-chardonnay', 'Napa Valley Chardonnay', 'Rich, oaky California Chardonnay. Tropical fruit, butter, and vanilla with creamy texture.',
  'white', 'dry', 'classic', ARRAY['chardonnay'], false, 'vintage',
  'United States', 'US', 'California', 'Napa Valley', NULL, NULL,
  13.5, 15, 'medium', NULL, 'dry', 'full', 'heavy',
  ARRAY['pineapple', 'mango', 'apple'], ARRAY['butter', 'vanilla', 'toast'], ARRAY[]::TEXT[], ARRAY['tropical', 'oaky', 'rich'], 'long',
  10, 12, 'white_wine', NULL, 2, 7,
  ARRAY['lobster', 'poultry', 'cream_sauces'], ARRAY['lobster bisque', 'roast chicken', 'fettuccine alfredo'], ARRAY['Brie', 'Triple Cream'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 130,
  ARRAY['ING_GRAPE_CHARDONNAY'], ARRAY['napa', 'chardonnay', 'oaky', 'rich', 'buttery'], 85, 'mid',
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
  'wine-australian-chardonnay', 'margaret-river-chardonnay', 'Margaret River Chardonnay', 'Elegant Australian Chardonnay with stone fruit, citrus, and subtle oak. Balanced and refined.',
  'white', 'dry', 'premium', ARRAY['chardonnay'], false, 'vintage',
  'Australia', 'AU', 'Western Australia', 'Margaret River', NULL, NULL,
  12.5, 14, 'medium_high', NULL, 'dry', 'medium_full', 'medium',
  ARRAY['peach', 'nectarine', 'citrus'], ARRAY['hazelnut', 'subtle_oak', 'cream'], ARRAY[]::TEXT[], ARRAY['fruity', 'elegant', 'balanced'], 'long',
  10, 12, 'white_wine', NULL, 3, 10,
  ARRAY['seafood', 'poultry', 'cream_sauces'], ARRAY['grilled lobster', 'roast turkey', 'seafood risotto'], ARRAY['Gruyère', 'Aged Cheddar'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 122,
  ARRAY['ING_GRAPE_CHARDONNAY'], ARRAY['margaret_river', 'chardonnay', 'elegant', 'premium', 'balanced'], 78, 'premium',
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
  'wine-chilean-sauvignon-blanc', 'casablanca-sauvignon-blanc', 'Casablanca Valley Sauvignon Blanc', 'Cool-climate Chilean white with bright citrus, herbs, and mineral notes.',
  'white', 'dry', 'classic', ARRAY['sauvignon_blanc'], false, 'vintage',
  'Chile', 'CL', 'Casablanca Valley', NULL, NULL, NULL,
  12.5, 13.5, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['lime', 'grapefruit', 'green_apple'], ARRAY['herbs', 'mineral', 'white_pepper'], ARRAY[]::TEXT[], ARRAY['citrus', 'herbal', 'fresh'], 'medium',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['seafood', 'ceviche', 'light_fare'], ARRAY['ceviche', 'grilled fish', 'empanadas de mariscos'], ARRAY['Fresh Goat Cheese', 'Queso Fresco'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 108,
  ARRAY['ING_GRAPE_SAUVIGNON_BLANC'], ARRAY['casablanca', 'sauvignon_blanc', 'chile', 'crisp', 'value'], 75, 'value',
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
  'wine-south-african-chenin-blanc', 'stellenbosch-chenin-blanc', 'Stellenbosch Chenin Blanc', 'South Africa''s signature white grape. Versatile with apple, quince, and honey notes.',
  'white', 'dry', 'classic', ARRAY['chenin_blanc'], false, 'vintage',
  'South Africa', 'ZA', 'Western Cape', 'Stellenbosch', NULL, NULL,
  12.5, 14, 'high', NULL, 'dry', 'medium', 'light',
  ARRAY['apple', 'pear', 'quince'], ARRAY['honey', 'chamomile', 'lanolin'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'waxy'], 'long',
  10, 12, 'white_wine', NULL, 2, 8,
  ARRAY['spicy_food', 'asian_cuisine', 'pork'], ARRAY['bobotie', 'thai curry', 'pork belly'], ARRAY['Gouda', 'Brie'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_CHENIN_BLANC'], ARRAY['stellenbosch', 'chenin_blanc', 'south_africa', 'versatile', 'value'], 72, 'value',
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
  'wine-argentine-torrontes', 'salta-torrontes', 'Salta Torrontés', 'Aromatic Argentine white from high altitude. Floral, with Muscat-like notes and crisp finish.',
  'white', 'dry', 'classic', ARRAY['torrontes'], false, 'vintage',
  'Argentina', 'AR', 'Salta', 'Cafayate', NULL, NULL,
  13, 14.5, 'medium_high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['peach', 'lychee', 'citrus'], ARRAY['rose', 'geranium', 'jasmine'], ARRAY[]::TEXT[], ARRAY['floral', 'exotic', 'aromatic'], 'medium',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['spicy_food', 'asian_cuisine', 'appetizers'], ARRAY['empanadas', 'ceviche', 'spicy thai'], ARRAY['Fresh Goat Cheese', 'Mild Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 112,
  ARRAY['ING_GRAPE_TORRONTES'], ARRAY['salta', 'torrontes', 'argentina', 'aromatic', 'floral'], 68, 'value',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- Batch 2 complete
