-- GUDBRO Wines Batch 1/8
-- Wines 1 to 20 of 144
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
  'wine-barolo', 'barolo', 'Barolo', 'The King of Wines from Piedmont, made from Nebbiolo grapes. Powerful, complex, with notes of tar, roses, and dried cherry.',
  'red', 'dry', 'premium', ARRAY['nebbiolo'], false, 'vintage',
  'Italy', 'IT', 'Piedmont', 'Langhe', 'DOCG', NULL,
  13, 15, 'high', 'very_high', 'dry', 'full', 'medium',
  ARRAY['cherry', 'rose', 'tar', 'truffle'], ARRAY['leather', 'tobacco', 'dried_herbs'], ARRAY['earth', 'mushroom'], ARRAY['floral', 'earthy', 'spicy'], 'very_long',
  16, 18, 'burgundy', 60, 10, 30,
  ARRAY['red_meat', 'game', 'aged_cheese', 'truffle_dishes'], ARRAY['braised beef', 'wild boar', 'risotto al tartufo', 'aged parmigiano'], ARRAY['Parmigiano Reggiano', 'Castelmagno', 'Taleggio'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 130,
  ARRAY['ING_GRAPE_NEBBIOLO'], ARRAY['piedmont', 'nebbiolo', 'premium', 'age-worthy', 'docg', 'tannic'], 92, 'premium',
  'traditional', 'oak_barrel', 38, NULL
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
  'wine-brunello-di-montalcino', 'brunello-di-montalcino', 'Brunello di Montalcino', 'Tuscany''s most prestigious wine, 100% Sangiovese Grosso. Rich, elegant, with cherry, leather, and earthy notes.',
  'red', 'dry', 'premium', ARRAY['sangiovese_grosso'], false, 'vintage',
  'Italy', 'IT', 'Tuscany', 'Montalcino', 'DOCG', NULL,
  12.5, 14.5, 'high', 'high', 'dry', 'full', 'medium',
  ARRAY['cherry', 'plum', 'raspberry'], ARRAY['leather', 'tobacco', 'cedar'], ARRAY['earth', 'dried_herbs'], ARRAY['fruity', 'earthy', 'spicy'], 'very_long',
  16, 18, 'bordeaux', 45, 10, 25,
  ARRAY['red_meat', 'game', 'tuscan_cuisine'], ARRAY['bistecca alla fiorentina', 'wild boar stew', 'aged pecorino'], ARRAY['Pecorino Toscano', 'Parmigiano Reggiano'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_SANGIOVESE'], ARRAY['tuscany', 'sangiovese', 'premium', 'age-worthy', 'docg'], 90, 'premium',
  'traditional', 'oak_barrel', 48, NULL
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
  'wine-amarone', 'amarone-della-valpolicella', 'Amarone della Valpolicella', 'Powerful Veneto wine made from dried grapes. Rich, intense, with dried fruit, chocolate, and spice notes.',
  'red', 'dry', 'premium', ARRAY['corvina', 'rondinella', 'molinara'], true, 'vintage',
  'Italy', 'IT', 'Veneto', 'Valpolicella', 'DOCG', NULL,
  14, 16, 'medium', 'medium', 'dry', 'full', 'heavy',
  ARRAY['dried_cherry', 'raisin', 'fig', 'chocolate'], ARRAY['vanilla', 'coffee', 'spice'], ARRAY['leather', 'tobacco'], ARRAY['fruity', 'sweet_spice', 'rich'], 'very_long',
  16, 18, 'bordeaux', 30, 5, 20,
  ARRAY['red_meat', 'game', 'rich_dishes', 'aged_cheese'], ARRAY['ossobuco', 'braised beef', 'dark chocolate desserts'], ARRAY['Gorgonzola', 'Aged Asiago', 'Monte Veronese'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 150,
  ARRAY['ING_GRAPE_CORVINA', 'ING_GRAPE_RONDINELLA', 'ING_GRAPE_MOLINARA'], ARRAY['veneto', 'appassimento', 'premium', 'powerful', 'docg'], 88, 'premium',
  'appassimento', 'oak_barrel', 24, NULL
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
  'wine-chianti-classico', 'chianti-classico', 'Chianti Classico', 'Iconic Tuscan wine from the heart of Chianti. Medium-bodied with cherry, herbs, and earthy notes.',
  'red', 'dry', 'classic', ARRAY['sangiovese'], false, 'vintage',
  'Italy', 'IT', 'Tuscany', 'Chianti', 'DOCG', NULL,
  12, 13.5, 'high', 'medium', 'dry', 'medium', 'light',
  ARRAY['cherry', 'plum', 'violet'], ARRAY['herbs', 'tobacco'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'herbal'], 'medium',
  14, 16, 'bordeaux', NULL, 3, 10,
  ARRAY['pasta', 'pizza', 'grilled_meat', 'tomato_dishes'], ARRAY['pasta al ragu', 'pizza margherita', 'grilled steak'], ARRAY['Pecorino', 'Parmigiano Reggiano'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_SANGIOVESE'], ARRAY['tuscany', 'sangiovese', 'classic', 'versatile', 'docg'], 85, 'mid',
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
  'wine-barbera-dasti', 'barbera-dasti', 'Barbera d''Asti', 'Piedmont''s everyday red, vibrant and food-friendly. High acidity with cherry and berry flavors.',
  'red', 'dry', 'classic', ARRAY['barbera'], false, 'vintage',
  'Italy', 'IT', 'Piedmont', 'Asti', 'DOCG', NULL,
  12.5, 14, 'high', 'low', 'dry', 'medium', 'light',
  ARRAY['cherry', 'raspberry', 'blackberry'], ARRAY['herbs', 'pepper'], ARRAY[]::TEXT[], ARRAY['fruity', 'fresh'], 'medium',
  14, 16, 'bordeaux', NULL, 2, 8,
  ARRAY['pasta', 'pizza', 'light_meat', 'charcuterie'], ARRAY['pasta al pomodoro', 'risotto', 'salumi'], ARRAY['Toma', 'Robiola'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_BARBERA'], ARRAY['piedmont', 'barbera', 'everyday', 'food-friendly', 'high-acid'], 75, 'value',
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
  'wine-bordeaux-red', 'bordeaux-red', 'Bordeaux Red Blend', 'Classic Left Bank Bordeaux blend dominated by Cabernet Sauvignon. Structured, elegant, with cassis and cedar.',
  'red', 'dry', 'classic', ARRAY['cabernet_sauvignon', 'merlot', 'cabernet_franc'], true, 'vintage',
  'France', 'FR', 'Bordeaux', 'Left Bank', 'AOC', NULL,
  12.5, 14.5, 'medium_high', 'high', 'dry', 'full', 'medium',
  ARRAY['blackcurrant', 'plum', 'blackberry'], ARRAY['cedar', 'tobacco', 'vanilla'], ARRAY['leather', 'earth'], ARRAY['fruity', 'oaky', 'elegant'], 'long',
  16, 18, 'bordeaux', 30, 5, 25,
  ARRAY['red_meat', 'lamb', 'game'], ARRAY['roast lamb', 'beef tenderloin', 'duck confit'], ARRAY['Comté', 'Brie de Meaux', 'Roquefort'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_CABERNET_SAUVIGNON', 'ING_GRAPE_MERLOT', 'ING_GRAPE_CABERNET_FRANC'], ARRAY['bordeaux', 'cabernet', 'blend', 'classic', 'age-worthy'], 88, 'mid',
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
  'wine-burgundy-pinot-noir', 'burgundy-pinot-noir', 'Burgundy Pinot Noir', 'The pinnacle of Pinot Noir from Burgundy. Elegant, complex, with red fruit, earth, and floral notes.',
  'red', 'dry', 'premium', ARRAY['pinot_noir'], false, 'vintage',
  'France', 'FR', 'Burgundy', NULL, 'AOC', NULL,
  12, 14, 'high', 'medium', 'dry', 'medium', 'light',
  ARRAY['cherry', 'raspberry', 'strawberry'], ARRAY['earth', 'mushroom', 'spice'], ARRAY['leather', 'truffle'], ARRAY['fruity', 'floral', 'earthy'], 'long',
  14, 16, 'burgundy', 15, 5, 20,
  ARRAY['poultry', 'salmon', 'mushroom_dishes', 'soft_cheese'], ARRAY['coq au vin', 'duck breast', 'mushroom risotto'], ARRAY['Époisses', 'Brie', 'Camembert'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_PINOT_NOIR'], ARRAY['burgundy', 'pinot_noir', 'elegant', 'premium', 'terroir'], 90, 'premium',
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
  'wine-cotes-du-rhone', 'cotes-du-rhone', 'Côtes du Rhône', 'Southern Rhône blend, typically Grenache-based. Warm, fruity, with spice and garrigue notes.',
  'red', 'dry', 'classic', ARRAY['grenache', 'syrah', 'mourvedre'], true, 'vintage',
  'France', 'FR', 'Rhône Valley', NULL, 'AOC', NULL,
  13, 15, 'medium', 'medium', 'dry', 'medium_full', 'light',
  ARRAY['raspberry', 'cherry', 'plum'], ARRAY['herbs', 'pepper', 'lavender'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'herbal'], 'medium',
  15, 17, 'bordeaux', NULL, 2, 8,
  ARRAY['grilled_meat', 'mediterranean', 'stews'], ARRAY['grilled lamb', 'ratatouille', 'cassoulet'], ARRAY['Chèvre', 'Roquefort'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_GRENACHE', 'ING_GRAPE_SYRAH', 'ING_GRAPE_MOURVEDRE'], ARRAY['rhone', 'grenache', 'gsm_blend', 'value', 'versatile'], 80, 'value',
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
  'wine-chateauneuf-du-pape', 'chateauneuf-du-pape', 'Châteauneuf-du-Pape', 'Prestigious Southern Rhône wine. Rich, complex, with dark fruit, spice, and garrigue character.',
  'red', 'dry', 'premium', ARRAY['grenache', 'syrah', 'mourvedre', 'cinsault'], true, 'vintage',
  'France', 'FR', 'Rhône Valley', 'Châteauneuf-du-Pape', 'AOC', NULL,
  13.5, 15.5, 'medium', 'medium_high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'cherry', 'plum'], ARRAY['herbs', 'lavender', 'pepper', 'licorice'], ARRAY['leather', 'earth'], ARRAY['fruity', 'spicy', 'herbal'], 'long',
  16, 18, 'bordeaux', 30, 5, 20,
  ARRAY['red_meat', 'game', 'rich_dishes'], ARRAY['braised lamb', 'beef bourguignon', 'venison'], ARRAY['Roquefort', 'Aged Gouda'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 135,
  ARRAY['ING_GRAPE_GRENACHE', 'ING_GRAPE_SYRAH', 'ING_GRAPE_MOURVEDRE', 'ING_GRAPE_CINSAULT'], ARRAY['rhone', 'premium', 'complex', 'age-worthy', 'aoc'], 85, 'premium',
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
  'wine-rioja-reserva', 'rioja-reserva', 'Rioja Reserva', 'Traditional Spanish red aged in American oak. Vanilla, cherry, and leather notes with smooth tannins.',
  'red', 'dry', 'classic', ARRAY['tempranillo', 'garnacha', 'graciano'], true, 'vintage',
  'Spain', 'ES', 'Rioja', NULL, 'DOCa', 'Reserva',
  12.5, 14, 'medium', 'medium', 'dry', 'medium_full', 'heavy',
  ARRAY['cherry', 'strawberry', 'plum'], ARRAY['vanilla', 'coconut', 'dill'], ARRAY['leather', 'tobacco'], ARRAY['fruity', 'oaky', 'spicy'], 'long',
  16, 18, 'bordeaux', NULL, 5, 15,
  ARRAY['lamb', 'pork', 'spanish_cuisine'], ARRAY['cordero asado', 'chorizo', 'manchego cheese'], ARRAY['Manchego', 'Idiazábal'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_TEMPRANILLO', 'ING_GRAPE_GARNACHA', 'ING_GRAPE_GRACIANO'], ARRAY['rioja', 'tempranillo', 'reserva', 'oaky', 'traditional'], 82, 'mid',
  NULL, 'oak_barrel', 36, NULL
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
  'wine-ribera-del-duero', 'ribera-del-duero', 'Ribera del Duero', 'Powerful Spanish red from the Duero Valley. Dark fruit, spice, and mineral notes with firm structure.',
  'red', 'dry', 'premium', ARRAY['tempranillo'], false, 'vintage',
  'Spain', 'ES', 'Castilla y León', 'Ribera del Duero', 'DO', NULL,
  13, 15, 'medium_high', 'high', 'dry', 'full', 'heavy',
  ARRAY['blackberry', 'black_cherry', 'plum'], ARRAY['vanilla', 'coffee', 'chocolate'], ARRAY['leather', 'tobacco', 'mineral'], ARRAY['fruity', 'oaky', 'intense'], 'long',
  16, 18, 'bordeaux', 30, 5, 20,
  ARRAY['red_meat', 'lamb', 'game'], ARRAY['lechazo asado', 'grilled ribeye', 'cured ham'], ARRAY['Zamorano', 'Aged Manchego'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 130,
  ARRAY['ING_GRAPE_TEMPRANILLO'], ARRAY['ribera', 'tempranillo', 'powerful', 'premium', 'age-worthy'], 84, 'premium',
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
  'wine-priorat', 'priorat', 'Priorat', 'Intense Catalan wine from slate soils. Concentrated, mineral, with black fruit and licorice notes.',
  'red', 'dry', 'premium', ARRAY['garnacha', 'carinena'], true, 'vintage',
  'Spain', 'ES', 'Catalonia', 'Priorat', 'DOQ', NULL,
  14, 16, 'medium', 'high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'black_cherry', 'fig'], ARRAY['licorice', 'mineral', 'slate'], ARRAY['leather', 'smoke'], ARRAY['fruity', 'mineral', 'intense'], 'very_long',
  16, 18, 'bordeaux', 45, 5, 25,
  ARRAY['red_meat', 'game', 'rich_dishes'], ARRAY['grilled lamb', 'venison', 'aged cheese'], ARRAY['Aged Manchego', 'Garrotxa'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 140,
  ARRAY['ING_GRAPE_GARNACHA', 'ING_GRAPE_CARINENA'], ARRAY['priorat', 'garnacha', 'mineral', 'premium', 'intense'], 78, 'premium',
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
  'wine-napa-cabernet', 'napa-valley-cabernet-sauvignon', 'Napa Valley Cabernet Sauvignon', 'California''s flagship wine. Rich, opulent, with blackcurrant, oak, and chocolate notes.',
  'red', 'dry', 'premium', ARRAY['cabernet_sauvignon'], false, 'vintage',
  'United States', 'US', 'California', 'Napa Valley', NULL, NULL,
  13.5, 15.5, 'medium', 'high', 'dry', 'full', 'heavy',
  ARRAY['blackcurrant', 'black_cherry', 'plum'], ARRAY['vanilla', 'chocolate', 'cedar'], ARRAY[]::TEXT[], ARRAY['fruity', 'oaky', 'rich'], 'long',
  16, 18, 'bordeaux', 30, 5, 20,
  ARRAY['red_meat', 'bbq', 'rich_dishes'], ARRAY['ribeye steak', 'lamb chops', 'beef short ribs'], ARRAY['Aged Cheddar', 'Blue Cheese'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 130,
  ARRAY['ING_GRAPE_CABERNET_SAUVIGNON'], ARRAY['napa', 'cabernet', 'premium', 'rich', 'opulent'], 88, 'premium',
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
  'wine-argentine-malbec', 'mendoza-malbec', 'Mendoza Malbec', 'Argentina''s signature grape from high altitude vineyards. Plush, fruity, with plum and violet notes.',
  'red', 'dry', 'classic', ARRAY['malbec'], false, 'vintage',
  'Argentina', 'AR', 'Mendoza', NULL, NULL, NULL,
  13, 15, 'medium', 'medium', 'dry', 'full', 'medium',
  ARRAY['plum', 'blackberry', 'black_cherry'], ARRAY['violet', 'chocolate', 'vanilla'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'rich'], 'medium',
  16, 18, 'bordeaux', NULL, 3, 10,
  ARRAY['red_meat', 'bbq', 'grilled_meat'], ARRAY['asado', 'empanadas', 'grilled steak'], ARRAY['Provolone', 'Manchego'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_MALBEC'], ARRAY['mendoza', 'malbec', 'argentina', 'fruity', 'value'], 85, 'value',
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
  'wine-chilean-carmenere', 'chilean-carmenere', 'Chilean Carménère', 'Chile''s signature grape, once thought extinct in Europe. Herbaceous, with red fruit and green pepper notes.',
  'red', 'dry', 'classic', ARRAY['carmenere'], false, 'vintage',
  'Chile', 'CL', 'Central Valley', NULL, NULL, NULL,
  13, 14.5, 'medium', 'medium', 'dry', 'medium_full', 'light',
  ARRAY['red_plum', 'cherry', 'raspberry'], ARRAY['green_pepper', 'herbs', 'smoke'], ARRAY[]::TEXT[], ARRAY['fruity', 'herbal', 'spicy'], 'medium',
  15, 17, 'bordeaux', NULL, 2, 8,
  ARRAY['grilled_meat', 'pork', 'spicy_food'], ARRAY['grilled pork', 'empanadas', 'chimichurri steak'], ARRAY['Manchego', 'Aged Gouda'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_CARMENERE'], ARRAY['chile', 'carmenere', 'herbaceous', 'unique', 'value'], 72, 'value',
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
  'wine-australian-shiraz', 'barossa-shiraz', 'Barossa Valley Shiraz', 'Bold Australian Shiraz with ripe fruit and spice. Full-bodied with blackberry, pepper, and chocolate.',
  'red', 'dry', 'classic', ARRAY['shiraz'], false, 'vintage',
  'Australia', 'AU', 'South Australia', 'Barossa Valley', NULL, NULL,
  14, 15.5, 'medium', 'medium_high', 'dry', 'full', 'heavy',
  ARRAY['blackberry', 'plum', 'black_cherry'], ARRAY['pepper', 'chocolate', 'vanilla'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'bold'], 'long',
  16, 18, 'bordeaux', NULL, 5, 15,
  ARRAY['bbq', 'red_meat', 'game'], ARRAY['bbq ribs', 'kangaroo steak', 'lamb roast'], ARRAY['Aged Cheddar', 'Blue Cheese'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 135,
  ARRAY['ING_GRAPE_SHIRAZ'], ARRAY['barossa', 'shiraz', 'bold', 'spicy', 'australian'], 82, 'mid',
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
  'wine-south-african-pinotage', 'south-african-pinotage', 'South African Pinotage', 'South Africa''s unique grape variety. Smoky, with red fruit, coffee, and banana notes.',
  'red', 'dry', 'classic', ARRAY['pinotage'], false, 'vintage',
  'South Africa', 'ZA', 'Western Cape', 'Stellenbosch', NULL, NULL,
  13, 14.5, 'medium', 'medium', 'dry', 'medium_full', 'medium',
  ARRAY['red_plum', 'cherry', 'raspberry'], ARRAY['smoke', 'coffee', 'banana'], ARRAY[]::TEXT[], ARRAY['fruity', 'smoky', 'unique'], 'medium',
  15, 17, 'bordeaux', NULL, 2, 8,
  ARRAY['bbq', 'grilled_meat', 'spicy_food'], ARRAY['braai', 'bobotie', 'grilled sausages'], ARRAY['Gouda', 'Cheddar'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_PINOTAGE'], ARRAY['south_africa', 'pinotage', 'unique', 'smoky', 'stellenbosch'], 70, 'value',
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
  'wine-oregon-pinot-noir', 'oregon-pinot-noir', 'Oregon Pinot Noir', 'Elegant New World Pinot from the Willamette Valley. Red fruit, earth, and subtle oak.',
  'red', 'dry', 'premium', ARRAY['pinot_noir'], false, 'vintage',
  'United States', 'US', 'Oregon', 'Willamette Valley', NULL, NULL,
  12.5, 14, 'medium_high', 'medium', 'dry', 'medium', 'light',
  ARRAY['cherry', 'raspberry', 'cranberry'], ARRAY['earth', 'mushroom', 'herbs'], ARRAY[]::TEXT[], ARRAY['fruity', 'earthy', 'elegant'], 'long',
  14, 16, 'burgundy', NULL, 3, 12,
  ARRAY['salmon', 'poultry', 'mushroom_dishes'], ARRAY['grilled salmon', 'roast duck', 'wild mushroom pasta'], ARRAY['Gruyère', 'Brie'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_PINOT_NOIR'], ARRAY['oregon', 'pinot_noir', 'elegant', 'willamette', 'cool_climate'], 80, 'mid',
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
  'wine-new-zealand-pinot-noir', 'central-otago-pinot-noir', 'Central Otago Pinot Noir', 'New Zealand''s premier Pinot from the world''s southernmost wine region. Intense, with cherry and spice.',
  'red', 'dry', 'premium', ARRAY['pinot_noir'], false, 'vintage',
  'New Zealand', 'NZ', 'Central Otago', NULL, NULL, NULL,
  13, 14.5, 'medium_high', 'medium', 'dry', 'medium', 'light',
  ARRAY['cherry', 'plum', 'raspberry'], ARRAY['thyme', 'clove', 'earth'], ARRAY[]::TEXT[], ARRAY['fruity', 'spicy', 'intense'], 'long',
  14, 16, 'burgundy', NULL, 3, 12,
  ARRAY['lamb', 'duck', 'game'], ARRAY['roast lamb', 'duck breast', 'venison'], ARRAY['Gruyère', 'Aged Gouda'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_PINOT_NOIR'], ARRAY['new_zealand', 'pinot_noir', 'central_otago', 'intense', 'premium'], 78, 'premium',
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
  'wine-chablis', 'chablis', 'Chablis', 'Pure, mineral Chardonnay from northern Burgundy. Crisp, unoaked, with citrus and oyster shell notes.',
  'white', 'dry', 'classic', ARRAY['chardonnay'], false, 'vintage',
  'France', 'FR', 'Burgundy', 'Chablis', 'AOC', NULL,
  12, 13.5, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['green_apple', 'lemon', 'grapefruit'], ARRAY['chalk', 'oyster_shell', 'flint'], ARRAY[]::TEXT[], ARRAY['citrus', 'mineral', 'fresh'], 'long',
  8, 10, 'white_wine', NULL, 2, 8,
  ARRAY['seafood', 'oysters', 'fish'], ARRAY['oysters', 'grilled fish', 'goat cheese salad'], ARRAY['Chèvre', 'Comté'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 110,
  ARRAY['ING_GRAPE_CHARDONNAY'], ARRAY['burgundy', 'chardonnay', 'unoaked', 'mineral', 'oysters'], 85, 'mid',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- Batch 1 complete
