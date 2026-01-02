-- GUDBRO Wines Batch 3/8
-- Wines 41 to 60 of 144
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
  'wine-austrian-gruner-veltliner', 'wachau-gruner-veltliner', 'Wachau Grüner Veltliner', 'Austria''s flagship white. Peppery, with green apple, citrus, and white pepper.',
  'white', 'dry', 'classic', ARRAY['gruner_veltliner'], false, 'vintage',
  'Austria', 'AT', 'Wachau', NULL, 'DAC', NULL,
  12, 14, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['green_apple', 'citrus', 'pear'], ARRAY['white_pepper', 'radish', 'herbs'], ARRAY[]::TEXT[], ARRAY['fruity', 'peppery', 'fresh'], 'long',
  8, 10, 'white_wine', NULL, 2, 10,
  ARRAY['wiener_schnitzel', 'asian_cuisine', 'vegetables'], ARRAY['wiener schnitzel', 'asparagus', 'sushi'], ARRAY['Gruyère', 'Fresh Goat Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 110,
  ARRAY['ING_GRAPE_GRUNER_VELTLINER'], ARRAY['wachau', 'gruner_veltliner', 'austria', 'peppery', 'food-friendly'], 75, 'mid',
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
  'wine-champagne-brut', 'champagne-brut-nv', 'Champagne Brut NV', 'Classic non-vintage Champagne with fine bubbles. Brioche, citrus, and apple with creamy mousse.',
  'sparkling', 'sparkling_brut', 'classic', ARRAY['chardonnay', 'pinot_noir', 'pinot_meunier'], true, 'non_vintage',
  'France', 'FR', 'Champagne', NULL, 'AOC', NULL,
  12, 12.5, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['green_apple', 'lemon', 'white_peach'], ARRAY['brioche', 'toast', 'almond'], ARRAY[]::TEXT[], ARRAY['citrus', 'yeasty', 'elegant'], 'long',
  6, 8, 'flute', NULL, NULL, 5,
  ARRAY['oysters', 'caviar', 'celebrations'], ARRAY['oysters', 'smoked salmon', 'fried chicken'], ARRAY['Brie', 'Comté', 'Parmesan'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_CHARDONNAY', 'ING_GRAPE_PINOT_NOIR', 'ING_GRAPE_PINOT_MEUNIER'], ARRAY['champagne', 'brut', 'celebration', 'aperitivo', 'classic'], 92, 'premium',
  'traditional_method', NULL, 15, NULL
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
  'wine-champagne-blanc-de-blancs', 'champagne-blanc-de-blancs', 'Champagne Blanc de Blancs', '100% Chardonnay Champagne with exceptional elegance. Citrus, mineral, and delicate toast.',
  'sparkling', 'sparkling_brut', 'premium', ARRAY['chardonnay'], false, 'vintage',
  'France', 'FR', 'Champagne', 'Côte des Blancs', 'AOC', NULL,
  12, 12.5, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['lemon', 'grapefruit', 'green_apple'], ARRAY['chalk', 'toast', 'almond'], ARRAY['honey', 'brioche'], ARRAY['citrus', 'mineral', 'elegant'], 'very_long',
  6, 8, 'flute', NULL, 5, 15,
  ARRAY['seafood', 'sushi', 'fine_dining'], ARRAY['raw oysters', 'sashimi', 'lobster'], ARRAY['Comté', 'Aged Gruyère'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 90,
  ARRAY['ING_GRAPE_CHARDONNAY'], ARRAY['champagne', 'blanc_de_blancs', 'chardonnay', 'elegant', 'premium'], 85, 'luxury',
  'traditional_method', NULL, 48, NULL
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
  'wine-champagne-rose', 'champagne-rose', 'Champagne Rosé', 'Elegant pink Champagne with red fruit notes. Strawberry, raspberry, and creamy texture.',
  'sparkling', 'sparkling_brut', 'premium', ARRAY['pinot_noir', 'chardonnay', 'pinot_meunier'], true, 'non_vintage',
  'France', 'FR', 'Champagne', NULL, 'AOC', NULL,
  12, 12.5, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['strawberry', 'raspberry', 'cherry'], ARRAY['brioche', 'citrus', 'cream'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'elegant'], 'long',
  6, 8, 'flute', NULL, NULL, 5,
  ARRAY['duck', 'salmon', 'berries'], ARRAY['duck breast', 'smoked salmon', 'berry desserts'], ARRAY['Brie', 'Délice de Bourgogne'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 98,
  ARRAY['ING_GRAPE_PINOT_NOIR', 'ING_GRAPE_CHARDONNAY', 'ING_GRAPE_PINOT_MEUNIER'], ARRAY['champagne', 'rose', 'elegant', 'celebration', 'romantic'], 88, 'luxury',
  'traditional_method', NULL, 24, NULL
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
  'wine-prosecco', 'prosecco-valdobbiadene', 'Prosecco Superiore Valdobbiadene', 'Premium Prosecco from steep Valdobbiadene hills. Fruity, floral, with fine perlage.',
  'sparkling', 'sparkling_brut', 'classic', ARRAY['glera'], false, 'non_vintage',
  'Italy', 'IT', 'Veneto', 'Valdobbiadene', 'DOCG', NULL,
  11, 12, 'medium_high', NULL, 'dry', 'light', 'none',
  ARRAY['green_apple', 'pear', 'white_peach'], ARRAY['white_flowers', 'citrus', 'almond'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'fresh'], 'medium',
  6, 8, 'flute', NULL, NULL, 2,
  ARRAY['aperitivo', 'light_fare', 'antipasti'], ARRAY['prosciutto', 'bruschetta', 'light pasta'], ARRAY['Fresh Mozzarella', 'Burrata'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 85,
  ARRAY['ING_GRAPE_GLERA'], ARRAY['prosecco', 'valdobbiadene', 'aperitivo', 'fresh', 'italian'], 90, 'value',
  'charmat_method', NULL, 1, NULL
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
  'wine-franciacorta', 'franciacorta-brut', 'Franciacorta Brut', 'Italy''s answer to Champagne. Traditional method with elegance and complexity.',
  'sparkling', 'sparkling_brut', 'premium', ARRAY['chardonnay', 'pinot_nero', 'pinot_bianco'], true, 'non_vintage',
  'Italy', 'IT', 'Lombardy', 'Franciacorta', 'DOCG', NULL,
  11.5, 13, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['apple', 'citrus', 'white_peach'], ARRAY['brioche', 'hazelnut', 'mineral'], ARRAY[]::TEXT[], ARRAY['fruity', 'yeasty', 'elegant'], 'long',
  6, 8, 'flute', NULL, 2, 8,
  ARRAY['risotto', 'seafood', 'fine_dining'], ARRAY['risotto alla milanese', 'seafood', 'vitello tonnato'], ARRAY['Grana Padano', 'Taleggio'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 92,
  ARRAY['ING_GRAPE_CHARDONNAY', 'ING_GRAPE_PINOT_NERO', 'ING_GRAPE_PINOT_BIANCO'], ARRAY['franciacorta', 'traditional_method', 'italian', 'premium', 'elegant'], 75, 'premium',
  'traditional_method', NULL, 18, NULL
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
  'wine-moscato-dasti', 'moscato-dasti', 'Moscato d''Asti', 'Gently sparkling sweet wine from Piedmont. Peach, apricot, and orange blossom with low alcohol.',
  'sparkling', 'sparkling_sec', 'classic', ARRAY['moscato_bianco'], false, 'vintage',
  'Italy', 'IT', 'Piedmont', 'Asti', 'DOCG', NULL,
  5, 6.5, 'medium', NULL, 'sweet', 'light', 'none',
  ARRAY['peach', 'apricot', 'orange'], ARRAY['orange_blossom', 'honey', 'grape'], ARRAY[]::TEXT[], ARRAY['floral', 'fruity', 'sweet'], 'medium',
  4, 6, 'flute', NULL, NULL, 1,
  ARRAY['desserts', 'fruit', 'brunch'], ARRAY['fruit tart', 'panettone', 'fresh fruit'], ARRAY['Mascarpone', 'Gorgonzola Dolce'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 70,
  ARRAY['ING_GRAPE_MOSCATO'], ARRAY['moscato', 'sweet', 'low_alcohol', 'dessert', 'piedmont'], 82, 'value',
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
  'wine-lambrusco', 'lambrusco-secco', 'Lambrusco Secco', 'Dry sparkling red from Emilia-Romagna. Red fruit, violet, and refreshing acidity.',
  'sparkling', 'dry', 'classic', ARRAY['lambrusco'], false, 'non_vintage',
  'Italy', 'IT', 'Emilia-Romagna', NULL, 'DOC', NULL,
  10.5, 12, 'high', 'low', 'dry', 'light', 'none',
  ARRAY['cherry', 'raspberry', 'strawberry'], ARRAY['violet', 'herbs'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'fresh'], 'short',
  8, 10, 'flute', NULL, NULL, 1,
  ARRAY['pizza', 'charcuterie', 'pasta'], ARRAY['pizza', 'salumi', 'lasagna bolognese'], ARRAY['Parmigiano Reggiano', 'Prosciutto'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 88,
  ARRAY['ING_GRAPE_LAMBRUSCO'], ARRAY['lambrusco', 'sparkling_red', 'emilia', 'pizza', 'fun'], 70, 'value',
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
  'wine-cava', 'cava-brut-reserva', 'Cava Brut Reserva', 'Traditional method Spanish sparkling. Citrus, apple, and toasted notes with fine bubbles.',
  'sparkling', 'sparkling_brut', 'classic', ARRAY['macabeo', 'parellada', 'xarello'], true, 'non_vintage',
  'Spain', 'ES', 'Catalonia', 'Penedès', 'DO', 'Reserva',
  11.5, 12.5, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['green_apple', 'citrus', 'pear'], ARRAY['toast', 'almond', 'mineral'], ARRAY[]::TEXT[], ARRAY['fruity', 'yeasty', 'fresh'], 'medium',
  6, 8, 'flute', NULL, NULL, 3,
  ARRAY['tapas', 'seafood', 'aperitivo'], ARRAY['jamon iberico', 'gambas al ajillo', 'paella'], ARRAY['Manchego', 'Tetilla'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 88,
  ARRAY['ING_GRAPE_MACABEO', 'ING_GRAPE_PARELLADA', 'ING_GRAPE_XARELLO'], ARRAY['cava', 'penedes', 'traditional_method', 'spanish', 'value'], 78, 'value',
  'traditional_method', NULL, 15, NULL
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
  'wine-cremant-alsace', 'cremant-d-alsace', 'Crémant d''Alsace', 'Alsatian sparkling wine with apple, citrus, and floral notes. Elegant and affordable alternative to Champagne.',
  'sparkling', 'sparkling_brut', 'classic', ARRAY['pinot_blanc', 'riesling', 'pinot_gris'], true, 'non_vintage',
  'France', 'FR', 'Alsace', NULL, 'AOC', NULL,
  11.5, 12.5, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['apple', 'pear', 'citrus'], ARRAY['white_flowers', 'almond', 'mineral'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'fresh'], 'medium',
  6, 8, 'flute', NULL, NULL, 3,
  ARRAY['aperitivo', 'seafood', 'brunch'], ARRAY['tarte flambée', 'smoked fish', 'quiche'], ARRAY['Gruyère', 'Munster'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 88,
  ARRAY['ING_GRAPE_PINOT_BLANC', 'ING_GRAPE_RIESLING', 'ING_GRAPE_PINOT_GRIS'], ARRAY['cremant', 'alsace', 'traditional_method', 'value', 'french'], 72, 'value',
  'traditional_method', NULL, 9, NULL
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
  'wine-cremant-bourgogne', 'cremant-de-bourgogne', 'Crémant de Bourgogne', 'Burgundy sparkling with Champagne method. Chardonnay and Pinot Noir with elegant mousse.',
  'sparkling', 'sparkling_brut', 'classic', ARRAY['chardonnay', 'pinot_noir'], true, 'non_vintage',
  'France', 'FR', 'Burgundy', NULL, 'AOC', NULL,
  11.5, 12.5, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['apple', 'lemon', 'white_peach'], ARRAY['brioche', 'hazelnut', 'chalk'], ARRAY[]::TEXT[], ARRAY['fruity', 'yeasty', 'elegant'], 'medium',
  6, 8, 'flute', NULL, NULL, 4,
  ARRAY['aperitivo', 'seafood', 'light_fare'], ARRAY['gougères', 'escargots', 'oysters'], ARRAY['Comté', 'Époisses'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 90,
  ARRAY['ING_GRAPE_CHARDONNAY', 'ING_GRAPE_PINOT_NOIR'], ARRAY['cremant', 'burgundy', 'traditional_method', 'value', 'elegant'], 70, 'value',
  'traditional_method', NULL, 12, NULL
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
  'wine-english-sparkling', 'english-sparkling-wine', 'English Sparkling Wine', 'Premium English sparkling rivaling Champagne. Citrus, apple, and toasted notes from chalk soils.',
  'sparkling', 'sparkling_brut', 'premium', ARRAY['chardonnay', 'pinot_noir', 'pinot_meunier'], true, 'vintage',
  'United Kingdom', 'GB', 'Sussex', NULL, NULL, NULL,
  11.5, 12.5, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['green_apple', 'lemon', 'pear'], ARRAY['toast', 'brioche', 'chalk'], ARRAY[]::TEXT[], ARRAY['citrus', 'yeasty', 'mineral'], 'long',
  6, 8, 'flute', NULL, 2, 10,
  ARRAY['oysters', 'seafood', 'celebrations'], ARRAY['oysters', 'fish and chips', 'smoked salmon'], ARRAY['Stilton', 'Aged Cheddar'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 92,
  ARRAY['ING_GRAPE_CHARDONNAY', 'ING_GRAPE_PINOT_NOIR', 'ING_GRAPE_PINOT_MEUNIER'], ARRAY['english', 'sparkling', 'traditional_method', 'premium', 'emerging'], 65, 'premium',
  'traditional_method', NULL, 24, NULL
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
  'wine-australian-sparkling', 'tasmania-sparkling', 'Tasmania Sparkling', 'Cool-climate Australian sparkling with Champagne varieties. Crisp, elegant with citrus and brioche.',
  'sparkling', 'sparkling_brut', 'premium', ARRAY['chardonnay', 'pinot_noir'], true, 'vintage',
  'Australia', 'AU', 'Tasmania', NULL, NULL, NULL,
  12, 13, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['lemon', 'apple', 'white_peach'], ARRAY['brioche', 'almond', 'mineral'], ARRAY[]::TEXT[], ARRAY['citrus', 'yeasty', 'fresh'], 'long',
  6, 8, 'flute', NULL, 2, 8,
  ARRAY['oysters', 'seafood', 'celebrations'], ARRAY['oysters', 'tasmanian salmon', 'crab'], ARRAY['King Island Brie', 'Aged Cheddar'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_CHARDONNAY', 'ING_GRAPE_PINOT_NOIR'], ARRAY['tasmania', 'sparkling', 'traditional_method', 'premium', 'cool_climate'], 68, 'premium',
  'traditional_method', NULL, 18, NULL
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
  'wine-provence-rose', 'provence-rose', 'Côtes de Provence Rosé', 'The quintessential pale pink rosé from Provence. Dry, elegant, with citrus, peach, and herbs.',
  'rosé', 'dry', 'classic', ARRAY['grenache', 'cinsault', 'syrah', 'mourvedre'], true, 'vintage',
  'France', 'FR', 'Provence', NULL, 'AOC', NULL,
  12, 13.5, 'medium_high', NULL, 'bone_dry', 'light', 'none',
  ARRAY['strawberry', 'peach', 'citrus'], ARRAY['herbs', 'white_flowers', 'mineral'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'fresh'], 'medium',
  8, 10, 'white_wine', NULL, NULL, 2,
  ARRAY['mediterranean', 'seafood', 'salads'], ARRAY['bouillabaisse', 'nicoise salad', 'grilled fish'], ARRAY['Chèvre', 'Feta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 105,
  ARRAY['ING_GRAPE_GRENACHE', 'ING_GRAPE_CINSAULT', 'ING_GRAPE_SYRAH', 'ING_GRAPE_MOURVEDRE'], ARRAY['provence', 'rose', 'summer', 'elegant', 'dry'], 90, 'mid',
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
  'wine-tavel', 'tavel-rose', 'Tavel Rosé', 'Full-bodied rosé from the Rhône. More structured than Provence with berry and spice notes.',
  'rosé', 'dry', 'classic', ARRAY['grenache', 'cinsault', 'clairette'], true, 'vintage',
  'France', 'FR', 'Rhône Valley', 'Tavel', 'AOC', NULL,
  13, 14.5, 'medium', NULL, 'dry', 'medium_full', 'none',
  ARRAY['raspberry', 'strawberry', 'cherry'], ARRAY['herbs', 'spice', 'mineral'], ARRAY[]::TEXT[], ARRAY['fruity', 'herbal', 'structured'], 'long',
  10, 12, 'white_wine', NULL, 1, 4,
  ARRAY['grilled_meat', 'charcuterie', 'mediterranean'], ARRAY['grilled lamb', 'ratatouille', 'tapenade'], ARRAY['Roquefort', 'Aged Goat Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_GRENACHE', 'ING_GRAPE_CINSAULT', 'ING_GRAPE_CLAIRETTE'], ARRAY['tavel', 'rhone', 'rose', 'full-bodied', 'gastronomic'], 70, 'mid',
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
  'wine-spanish-rosado', 'rioja-rosado', 'Rioja Rosado', 'Fruity Spanish rosé with strawberry, watermelon, and subtle spice.',
  'rosé', 'dry', 'classic', ARRAY['garnacha', 'tempranillo'], true, 'vintage',
  'Spain', 'ES', 'Rioja', NULL, 'DOCa', NULL,
  12, 13.5, 'medium', NULL, 'dry', 'medium_light', 'none',
  ARRAY['strawberry', 'watermelon', 'cherry'], ARRAY['herbs', 'white_pepper'], ARRAY[]::TEXT[], ARRAY['fruity', 'fresh', 'vibrant'], 'medium',
  8, 10, 'white_wine', NULL, NULL, 2,
  ARRAY['tapas', 'paella', 'grilled_fish'], ARRAY['patatas bravas', 'seafood paella', 'gambas'], ARRAY['Manchego', 'Fresh Goat Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 108,
  ARRAY['ING_GRAPE_GARNACHA', 'ING_GRAPE_TEMPRANILLO'], ARRAY['rioja', 'rosado', 'spanish', 'tapas', 'fresh'], 72, 'value',
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
  'wine-italian-rosato', 'cerasuolo-dabruzzo', 'Cerasuolo d''Abruzzo', 'Cherry-colored Italian rosé with bright acidity and red fruit character.',
  'rosé', 'dry', 'classic', ARRAY['montepulciano'], false, 'vintage',
  'Italy', 'IT', 'Abruzzo', NULL, 'DOC', NULL,
  11.5, 13, 'high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['cherry', 'raspberry', 'pomegranate'], ARRAY['almond', 'herbs'], ARRAY[]::TEXT[], ARRAY['fruity', 'fresh', 'vibrant'], 'medium',
  8, 10, 'white_wine', NULL, NULL, 2,
  ARRAY['pasta', 'pizza', 'antipasti'], ARRAY['pasta all''amatriciana', 'pizza margherita', 'prosciutto'], ARRAY['Pecorino', 'Mozzarella'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 105,
  ARRAY['ING_GRAPE_MONTEPULCIANO'], ARRAY['abruzzo', 'cerasuolo', 'rosato', 'italian', 'cherry'], 68, 'value',
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
  'wine-sauternes', 'sauternes', 'Sauternes', 'Noble rot sweet wine from Bordeaux. Honey, apricot, and tropical fruit with incredible complexity.',
  'dessert', 'sweet', 'premium', ARRAY['semillon', 'sauvignon_blanc', 'muscadelle'], true, 'vintage',
  'France', 'FR', 'Bordeaux', 'Sauternes', 'AOC', NULL,
  13, 14.5, 'high', NULL, 'very_sweet', 'full', 'medium',
  ARRAY['honey', 'apricot', 'peach'], ARRAY['orange_peel', 'vanilla', 'caramel'], ARRAY['saffron', 'marmalade'], ARRAY['honeyed', 'tropical', 'complex'], 'very_long',
  8, 10, 'dessert_wine', NULL, 10, 50,
  ARRAY['foie_gras', 'blue_cheese', 'desserts'], ARRAY['foie gras', 'roquefort', 'tarte tatin'], ARRAY['Roquefort', 'Stilton', 'Gorgonzola'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 165,
  ARRAY['ING_GRAPE_SEMILLON', 'ING_GRAPE_SAUVIGNON_BLANC', 'ING_GRAPE_MUSCADELLE'], ARRAY['sauternes', 'noble_rot', 'dessert', 'luxury', 'age-worthy'], 82, 'luxury',
  'noble_rot', 'oak_barrel', 24, NULL
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
  'wine-german-trockenbeerenauslese', 'german-tba', 'Trockenbeerenauslese Riesling', 'Rare German dessert wine from individually picked botrytized grapes. Intense honey and tropical fruit.',
  'dessert', 'sweet', 'grand_cru', ARRAY['riesling'], false, 'vintage',
  'Germany', 'DE', 'Mosel', NULL, 'Prädikatswein', 'TBA',
  5.5, 8, 'high', NULL, 'very_sweet', 'full', 'none',
  ARRAY['honey', 'apricot', 'mango'], ARRAY['orange_marmalade', 'candied_peel', 'tropical'], ARRAY['caramel', 'petrol'], ARRAY['honeyed', 'tropical', 'intense'], 'very_long',
  8, 10, 'dessert_wine', NULL, 20, 100,
  ARRAY['foie_gras', 'fruit_desserts', 'blue_cheese'], ARRAY['foie gras', 'fruit tart', 'blue cheese'], ARRAY['Stilton', 'Gorgonzola Dolce'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 170,
  ARRAY['ING_GRAPE_RIESLING'], ARRAY['tba', 'german', 'noble_rot', 'rare', 'collector'], 60, 'luxury',
  'noble_rot', NULL, NULL, NULL
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
  'wine-tokaji-aszu', 'tokaji-aszu-5-puttonyos', 'Tokaji Aszú 5 Puttonyos', 'Historic Hungarian sweet wine. Apricot, honey, and orange with vibrant acidity.',
  'dessert', 'sweet', 'premium', ARRAY['furmint', 'harslevelu'], true, 'vintage',
  'Hungary', 'HU', 'Tokaj', NULL, 'PDO', NULL,
  11, 13, 'high', NULL, 'very_sweet', 'full', 'light',
  ARRAY['apricot', 'orange', 'honey'], ARRAY['ginger', 'saffron', 'caramel'], ARRAY['tea', 'marmalade'], ARRAY['honeyed', 'spicy', 'complex'], 'very_long',
  10, 12, 'dessert_wine', NULL, 10, 50,
  ARRAY['foie_gras', 'blue_cheese', 'fruit_desserts'], ARRAY['foie gras', 'gorgonzola', 'apricot tart'], ARRAY['Roquefort', 'Gorgonzola'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 160,
  ARRAY['ING_GRAPE_FURMINT', 'ING_GRAPE_HARSLEVELU'], ARRAY['tokaji', 'aszu', 'hungarian', 'noble_rot', 'historic'], 72, 'premium',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- Batch 3 complete
