-- GUDBRO Wines Batch 4/8
-- Wines 61 to 80 of 144
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
  'wine-vin-santo', 'vin-santo-toscano', 'Vin Santo del Chianti', 'Tuscan sweet wine from dried grapes. Amber-colored with nuts, dried fruit, and caramel.',
  'dessert', 'sweet', 'classic', ARRAY['trebbiano', 'malvasia'], true, 'vintage',
  'Italy', 'IT', 'Tuscany', NULL, 'DOC', NULL,
  14, 17, 'medium', NULL, 'sweet', 'full', 'heavy',
  ARRAY['hazelnut', 'dried_fig', 'honey'], ARRAY['caramel', 'toffee', 'orange_peel'], ARRAY['coffee', 'tobacco'], ARRAY['nutty', 'honeyed', 'oxidative'], 'very_long',
  14, 16, 'dessert_wine', NULL, 5, 30,
  ARRAY['biscotti', 'blue_cheese', 'nuts'], ARRAY['cantucci', 'gorgonzola', 'almond cake'], ARRAY['Pecorino Stagionato', 'Gorgonzola'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 175,
  ARRAY['ING_GRAPE_TREBBIANO', 'ING_GRAPE_MALVASIA'], ARRAY['vin_santo', 'tuscany', 'dessert', 'dried_grapes', 'cantucci'], 75, 'mid',
  'passito', 'oak_barrel', 36, NULL
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
  'wine-ice-wine', 'canadian-ice-wine', 'Canadian Icewine', 'Intensely sweet wine from frozen grapes. Tropical fruit, honey, and citrus with bright acidity.',
  'dessert', 'sweet', 'premium', ARRAY['vidal', 'riesling'], false, 'vintage',
  'Canada', 'CA', 'Niagara Peninsula', NULL, NULL, NULL,
  9, 13, 'high', NULL, 'very_sweet', 'full', 'none',
  ARRAY['mango', 'peach', 'lychee'], ARRAY['honey', 'citrus', 'tropical'], ARRAY[]::TEXT[], ARRAY['tropical', 'honeyed', 'intense'], 'very_long',
  6, 8, 'dessert_wine', NULL, 5, 20,
  ARRAY['foie_gras', 'fruit_desserts', 'blue_cheese'], ARRAY['foie gras', 'fresh fruit', 'cheesecake'], ARRAY['Blue Cheese', 'Brie'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 160,
  ARRAY['ING_GRAPE_VIDAL', 'ING_GRAPE_RIESLING'], ARRAY['icewine', 'canada', 'frozen_grapes', 'luxury', 'sweet'], 70, 'luxury',
  'frozen_harvest', NULL, NULL, NULL
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
  'wine-port-ruby', 'ruby-port', 'Ruby Port', 'Young, fruit-forward Portuguese fortified wine. Berry, cherry, and chocolate with soft sweetness.',
  'fortified', 'fortified_sweet', 'classic', ARRAY['touriga_nacional', 'tinta_roriz', 'touriga_franca'], true, 'non_vintage',
  'Portugal', 'PT', 'Douro', NULL, 'DOC', NULL,
  19, 22, 'medium', 'medium', 'sweet', 'full', 'light',
  ARRAY['cherry', 'raspberry', 'blackberry'], ARRAY['chocolate', 'spice'], ARRAY[]::TEXT[], ARRAY['fruity', 'sweet', 'warming'], 'long',
  14, 16, 'port', NULL, NULL, 3,
  ARRAY['chocolate', 'blue_cheese', 'nuts'], ARRAY['chocolate cake', 'stilton', 'walnuts'], ARRAY['Stilton', 'Gorgonzola'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 185,
  ARRAY['ING_GRAPE_TOURIGA_NACIONAL', 'ING_GRAPE_TINTA_RORIZ', 'ING_GRAPE_TOURIGA_FRANCA'], ARRAY['port', 'ruby', 'douro', 'fortified', 'chocolate'], 78, 'value',
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
  'wine-port-tawny', 'tawny-port-10-year', '10 Year Tawny Port', 'Aged tawny with nutty, caramel character from oxidative aging. Fig, walnut, and butterscotch.',
  'fortified', 'fortified_sweet', 'premium', ARRAY['touriga_nacional', 'tinta_roriz', 'touriga_franca'], true, 'non_vintage',
  'Portugal', 'PT', 'Douro', NULL, 'DOC', NULL,
  19, 22, 'medium', NULL, 'sweet', 'full', 'heavy',
  ARRAY['fig', 'walnut', 'caramel'], ARRAY['butterscotch', 'orange_peel', 'cinnamon'], ARRAY['toffee', 'dried_fruit'], ARRAY['nutty', 'caramel', 'oxidative'], 'very_long',
  12, 14, 'port', NULL, NULL, 10,
  ARRAY['nuts', 'caramel_desserts', 'aged_cheese'], ARRAY['creme brulee', 'pecan pie', 'aged gouda'], ARRAY['Aged Gouda', 'Manchego'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 185,
  ARRAY['ING_GRAPE_TOURIGA_NACIONAL', 'ING_GRAPE_TINTA_RORIZ', 'ING_GRAPE_TOURIGA_FRANCA'], ARRAY['port', 'tawny', 'aged', 'nutty', 'premium'], 75, 'premium',
  NULL, 'oak_barrel', 120, NULL
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
  'wine-port-vintage', 'vintage-port', 'Vintage Port', 'Declared vintage Port from exceptional years. Intense, complex, requiring decades to mature.',
  'fortified', 'fortified_sweet', 'grand_cru', ARRAY['touriga_nacional', 'tinta_roriz', 'touriga_franca'], true, 'vintage',
  'Portugal', 'PT', 'Douro', NULL, 'DOC', NULL,
  19.5, 22, 'medium_high', 'high', 'sweet', 'full', 'medium',
  ARRAY['blackberry', 'plum', 'chocolate'], ARRAY['violet', 'spice', 'cedar'], ARRAY['leather', 'tobacco', 'dried_fruit'], ARRAY['intense', 'complex', 'age-worthy'], 'very_long',
  16, 18, 'port', 120, 20, 50,
  ARRAY['stilton', 'dark_chocolate', 'nuts'], ARRAY['stilton cheese', 'dark chocolate', 'walnuts'], ARRAY['Stilton', 'Aged Cheddar'], ARRAY[]::TEXT[],
  false, false, false, false, false, true, ARRAY['sulfites'], 190,
  ARRAY['ING_GRAPE_TOURIGA_NACIONAL', 'ING_GRAPE_TINTA_RORIZ', 'ING_GRAPE_TOURIGA_FRANCA'], ARRAY['port', 'vintage', 'collector', 'age-worthy', 'luxury'], 65, 'luxury',
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
  'wine-sherry-fino', 'sherry-fino', 'Fino Sherry', 'Bone-dry Spanish fortified wine aged under flor. Almond, saline, and incredibly fresh.',
  'fortified', 'fortified_dry', 'classic', ARRAY['palomino'], false, 'non_vintage',
  'Spain', 'ES', 'Andalucía', 'Jerez', 'DO', NULL,
  15, 17, 'high', NULL, 'bone_dry', 'light', 'light',
  ARRAY['almond', 'apple', 'citrus'], ARRAY['saline', 'yeast', 'chamomile'], ARRAY[]::TEXT[], ARRAY['nutty', 'saline', 'fresh'], 'long',
  6, 8, 'copita', NULL, NULL, 1,
  ARRAY['tapas', 'olives', 'seafood'], ARRAY['jamon iberico', 'almonds', 'anchovies'], ARRAY['Manchego', 'Fresh Goat Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 105,
  ARRAY['ING_GRAPE_PALOMINO'], ARRAY['sherry', 'fino', 'jerez', 'dry', 'flor'], 70, 'value',
  'solera', 'oak_barrel', NULL, NULL
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
  'wine-sherry-oloroso', 'sherry-oloroso', 'Oloroso Sherry', 'Rich, oxidatively aged dry Sherry. Walnut, dried fruit, and complex savory notes.',
  'fortified', 'fortified_dry', 'classic', ARRAY['palomino'], false, 'non_vintage',
  'Spain', 'ES', 'Andalucía', 'Jerez', 'DO', NULL,
  17, 22, 'medium', NULL, 'dry', 'full', 'heavy',
  ARRAY['walnut', 'dried_fig', 'coffee'], ARRAY['caramel', 'orange_peel', 'tobacco'], ARRAY['leather', 'spice'], ARRAY['nutty', 'oxidative', 'complex'], 'very_long',
  12, 14, 'copita', NULL, NULL, 20,
  ARRAY['game', 'aged_cheese', 'nuts'], ARRAY['venison', 'aged manchego', 'walnuts'], ARRAY['Aged Manchego', 'Idiazábal'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 140,
  ARRAY['ING_GRAPE_PALOMINO'], ARRAY['sherry', 'oloroso', 'jerez', 'oxidative', 'complex'], 65, 'mid',
  'solera', 'oak_barrel', NULL, NULL
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
  'wine-madeira', 'madeira-bual', 'Madeira Bual', 'Medium-sweet Madeira with caramel, nuts, and citrus. Virtually indestructible wine.',
  'fortified', 'fortified_sweet', 'premium', ARRAY['bual'], false, 'non_vintage',
  'Portugal', 'PT', 'Madeira', NULL, 'DOP', NULL,
  18, 22, 'high', NULL, 'medium_sweet', 'full', 'heavy',
  ARRAY['caramel', 'walnut', 'orange'], ARRAY['coffee', 'toffee', 'dried_fruit'], ARRAY['smoke', 'spice'], ARRAY['nutty', 'caramel', 'oxidative'], 'very_long',
  14, 16, 'port', NULL, NULL, 100,
  ARRAY['caramel_desserts', 'nuts', 'aged_cheese'], ARRAY['creme brulee', 'pecan pie', 'aged cheese'], ARRAY['Aged Cheddar', 'Aged Gouda'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 165,
  ARRAY['ING_GRAPE_BUAL'], ARRAY['madeira', 'bual', 'portuguese', 'indestructible', 'historic'], 58, 'premium',
  'estufagem', 'oak_barrel', NULL, NULL
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
  'wine-marsala', 'marsala-superiore', 'Marsala Superiore', 'Sicilian fortified wine with dried fruit, vanilla, and caramel. Amber-colored and complex.',
  'fortified', 'fortified_sweet', 'classic', ARRAY['grillo', 'catarratto', 'inzolia'], true, 'non_vintage',
  'Italy', 'IT', 'Sicily', 'Marsala', 'DOC', 'Superiore',
  18, 20, 'medium', NULL, 'medium_sweet', 'full', 'heavy',
  ARRAY['dried_apricot', 'vanilla', 'caramel'], ARRAY['fig', 'coffee', 'almond'], ARRAY[]::TEXT[], ARRAY['fruity', 'nutty', 'oxidative'], 'long',
  14, 16, 'port', NULL, NULL, 20,
  ARRAY['zabaglione', 'aged_cheese', 'desserts'], ARRAY['zabaglione', 'tiramisu', 'aged pecorino'], ARRAY['Pecorino Siciliano', 'Aged Gouda'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 160,
  ARRAY['ING_GRAPE_GRILLO', 'ING_GRAPE_CATARRATTO', 'ING_GRAPE_INZOLIA'], ARRAY['marsala', 'sicily', 'fortified', 'dessert', 'cooking'], 60, 'value',
  'solera', 'oak_barrel', 24, NULL
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
  'wine-georgia-saperavi', 'kakheti-saperavi', 'Kakheti Saperavi', 'Georgia''s signature red grape from the Kakheti region. Deep, intense color with dark fruit, spice, and earthy notes. Often aged in qvevri.',
  'red', 'dry', 'classic', ARRAY['saperavi'], false, 'vintage',
  'Georgia', 'GE', 'Kakheti', NULL, NULL, NULL,
  12.5, 14.5, 'high', 'high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'plum', 'black_cherry'], ARRAY['spice', 'earth', 'chocolate'], ARRAY['leather', 'tobacco'], ARRAY['fruity', 'earthy', 'intense'], 'long',
  16, 18, 'bordeaux', 30, 5, 15,
  ARRAY['grilled_meat', 'game', 'georgian_cuisine'], ARRAY['khinkali', 'mtsvadi', 'cheese bread'], ARRAY['Sulguni', 'Aged Hard Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 125,
  ARRAY['ING_GRAPE_SAPERAVI'], ARRAY['georgia', 'saperavi', 'kakheti', 'indigenous', 'intense'], 75, 'mid',
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
  'wine-georgia-rkatsiteli-amber', 'kakheti-rkatsiteli-qvevri', 'Rkatsiteli Qvevri Amber Wine', 'Traditional Georgian amber wine fermented in clay qvevri vessels. Extended skin contact gives golden-amber color with tannic structure.',
  'orange', 'dry', 'natural', ARRAY['rkatsiteli'], false, 'vintage',
  'Georgia', 'GE', 'Kakheti', NULL, NULL, NULL,
  12, 14, 'high', 'medium', 'dry', 'full', 'none',
  ARRAY['dried_apricot', 'quince', 'honey'], ARRAY['walnut', 'tea', 'spice'], ARRAY['herbs', 'earth'], ARRAY['oxidative', 'nutty', 'complex'], 'long',
  12, 14, 'white_wine', NULL, 3, 15,
  ARRAY['georgian_cuisine', 'spicy_food', 'aged_cheese'], ARRAY['khachapuri', 'grilled vegetables', 'nuts'], ARRAY['Sulguni', 'Aged Gouda'], ARRAY[]::TEXT[],
  true, false, false, true, true, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_RKATSITELI'], ARRAY['georgia', 'qvevri', 'amber', 'orange_wine', 'natural', 'unesco'], 70, 'mid',
  'qvevri', 'clay_qvevri', 6, NULL
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
  'wine-georgia-kindzmarauli', 'kindzmarauli', 'Kindzmarauli', 'Semi-sweet red wine from Kvareli, Georgia. Natural residual sugar with rich dark fruit and soft tannins.',
  'red', 'semi_sweet', 'classic', ARRAY['saperavi'], false, 'vintage',
  'Georgia', 'GE', 'Kakheti', 'Kvareli', NULL, NULL,
  10.5, 12, 'medium', 'medium', 'medium_sweet', 'medium_full', 'none',
  ARRAY['black_cherry', 'blackberry', 'plum'], ARRAY['chocolate', 'vanilla'], ARRAY[]::TEXT[], ARRAY['fruity', 'sweet', 'rich'], 'medium',
  14, 16, 'bordeaux', NULL, 2, 8,
  ARRAY['desserts', 'blue_cheese', 'fruit'], ARRAY['churchkhela', 'dark chocolate', 'berry desserts'], ARRAY['Blue Cheese', 'Gorgonzola'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 140,
  ARRAY['ING_GRAPE_SAPERAVI'], ARRAY['georgia', 'semi-sweet', 'kindzmarauli', 'dessert', 'traditional'], 72, 'mid',
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
  'wine-croatia-plavac-mali', 'dingac-plavac-mali', 'Dingač Plavac Mali', 'Croatia''s most prestigious red from the Pelješac peninsula. Related to Zinfandel, with intense dark fruit and Mediterranean herbs.',
  'red', 'dry', 'premium', ARRAY['plavac_mali'], false, 'vintage',
  'Croatia', 'HR', 'Dalmatia', 'Pelješac', 'PDO Dingač', NULL,
  14, 16, 'medium_high', 'high', 'dry', 'full', 'medium',
  ARRAY['blackberry', 'dried_fig', 'plum'], ARRAY['herbs', 'pepper', 'licorice'], ARRAY['leather', 'earth'], ARRAY['fruity', 'mediterranean', 'intense'], 'long',
  16, 18, 'bordeaux', 30, 5, 15,
  ARRAY['grilled_meat', 'game', 'dalmatian_cuisine'], ARRAY['peka', 'grilled lamb', 'octopus salad'], ARRAY['Paški Sir', 'Aged Hard Cheese'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 135,
  ARRAY['ING_GRAPE_PLAVAC_MALI'], ARRAY['croatia', 'plavac_mali', 'dingac', 'dalmatia', 'zinfandel_relative'], 72, 'premium',
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
  'wine-croatia-malvazija-istarska', 'istria-malvazija', 'Istrian Malvazija', 'Croatia''s signature white from Istria. Crisp and aromatic with citrus, almond, and Mediterranean herb notes.',
  'white', 'dry', 'classic', ARRAY['malvazija_istarska'], false, 'vintage',
  'Croatia', 'HR', 'Istria', NULL, NULL, NULL,
  12, 13.5, 'medium_high', NULL, 'dry', 'medium', 'none',
  ARRAY['citrus', 'apple', 'pear'], ARRAY['almond', 'herbs', 'white_flowers'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'fresh'], 'medium',
  8, 10, 'white_wine', NULL, 1, 5,
  ARRAY['seafood', 'istrian_cuisine', 'light_pasta'], ARRAY['truffle pasta', 'grilled fish', 'prosciutto'], ARRAY['Fresh Goat Cheese', 'Pecorino'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 110,
  ARRAY['ING_GRAPE_MALVAZIJA'], ARRAY['croatia', 'istria', 'malvazija', 'white', 'mediterranean'], 70, 'mid',
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
  'wine-croatia-teran', 'istria-teran', 'Istrian Teran', 'Bold, rustic red from Istria''s iron-rich red soil. High acidity with sour cherry and earthy character.',
  'red', 'dry', 'classic', ARRAY['teran'], false, 'vintage',
  'Croatia', 'HR', 'Istria', NULL, NULL, NULL,
  11.5, 13, 'high', 'high', 'dry', 'medium_full', 'light',
  ARRAY['sour_cherry', 'cranberry', 'plum'], ARRAY['earth', 'iron', 'herbs'], ARRAY[]::TEXT[], ARRAY['fruity', 'earthy', 'rustic'], 'medium',
  14, 16, 'bordeaux', NULL, 2, 8,
  ARRAY['truffle_dishes', 'game', 'hearty_stews'], ARRAY['fuzi with truffles', 'wild boar', 'istrian stew'], ARRAY['Aged Pecorino', 'Parmigiano'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 115,
  ARRAY['ING_GRAPE_TERAN'], ARRAY['croatia', 'istria', 'teran', 'refosco', 'rustic'], 62, 'mid',
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
  'wine-slovenia-rebula', 'goriska-brda-rebula', 'Goriška Brda Rebula', 'Slovenia''s flagship white from Brda hills. Crisp and refreshing with citrus, apple, and floral notes.',
  'white', 'dry', 'classic', ARRAY['rebula'], false, 'vintage',
  'Slovenia', 'SI', 'Primorska', 'Goriška Brda', NULL, NULL,
  12, 13.5, 'high', NULL, 'dry', 'medium', 'none',
  ARRAY['citrus', 'apple', 'pear'], ARRAY['white_flowers', 'mineral', 'almond'], ARRAY[]::TEXT[], ARRAY['fruity', 'floral', 'fresh'], 'medium',
  8, 10, 'white_wine', NULL, 1, 5,
  ARRAY['seafood', 'light_fare', 'aperitivo'], ARRAY['prosciutto', 'fresh pasta', 'grilled fish'], ARRAY['Fresh Goat Cheese', 'Burrata'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 108,
  ARRAY['ING_GRAPE_REBULA'], ARRAY['slovenia', 'brda', 'rebula', 'ribolla', 'fresh'], 68, 'mid',
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
  'wine-slovenia-rebula-orange', 'brda-rebula-macerated', 'Rebula Macerated (Orange Wine)', 'Extended skin-contact Rebula from Brda. Deep amber color with tannic structure, dried fruit, and nutty complexity.',
  'orange', 'dry', 'natural', ARRAY['rebula'], false, 'vintage',
  'Slovenia', 'SI', 'Primorska', 'Goriška Brda', NULL, NULL,
  12.5, 14, 'medium_high', 'medium', 'dry', 'full', 'light',
  ARRAY['dried_apricot', 'orange_peel', 'honey'], ARRAY['walnut', 'tea', 'spice'], ARRAY['herbs', 'mineral'], ARRAY['oxidative', 'nutty', 'complex'], 'long',
  12, 14, 'white_wine', NULL, 3, 12,
  ARRAY['asian_cuisine', 'spicy_food', 'aged_cheese'], ARRAY['curry', 'roast pork', 'mushroom dishes'], ARRAY['Aged Gouda', 'Pecorino'], ARRAY[]::TEXT[],
  true, false, false, true, true, true, ARRAY['sulfites'], 120,
  ARRAY['ING_GRAPE_REBULA'], ARRAY['slovenia', 'orange_wine', 'natural', 'brda', 'macerated'], 65, 'premium',
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
  'wine-slovenia-zelen', 'vipava-zelen', 'Vipava Valley Zelen', 'Rare indigenous Slovenian white from Vipava. Light, aromatic with herbal notes and low alcohol.',
  'white', 'dry', 'classic', ARRAY['zelen'], false, 'vintage',
  'Slovenia', 'SI', 'Primorska', 'Vipava Valley', NULL, NULL,
  10.5, 12, 'high', NULL, 'dry', 'light', 'none',
  ARRAY['green_apple', 'citrus', 'herbs'], ARRAY['mineral', 'fennel', 'meadow_flowers'], ARRAY[]::TEXT[], ARRAY['herbal', 'fresh', 'aromatic'], 'medium',
  8, 10, 'white_wine', NULL, 1, 3,
  ARRAY['seafood', 'salads', 'light_fare'], ARRAY['grilled vegetables', 'fresh fish', 'herb pasta'], ARRAY['Fresh Goat Cheese', 'Ricotta'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 95,
  ARRAY['ING_GRAPE_ZELEN'], ARRAY['slovenia', 'vipava', 'zelen', 'indigenous', 'low_alcohol'], 55, 'mid',
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
  'wine-romania-feteasca-neagra', 'dealu-mare-feteasca-neagra', 'Dealu Mare Feteasca Neagră', 'Romania''s signature red grape from Dealu Mare. Rich, dark fruit with spice and velvety tannins.',
  'red', 'dry', 'premium', ARRAY['feteasca_neagra'], false, 'vintage',
  'Romania', 'RO', 'Muntenia', 'Dealu Mare', 'DOC', NULL,
  13, 15, 'medium_high', 'high', 'dry', 'full', 'medium',
  ARRAY['plum', 'blackberry', 'black_cherry'], ARRAY['spice', 'chocolate', 'vanilla'], ARRAY['leather', 'earth'], ARRAY['fruity', 'spicy', 'complex'], 'long',
  16, 18, 'bordeaux', 30, 5, 15,
  ARRAY['red_meat', 'game', 'romanian_cuisine'], ARRAY['sarmale', 'mici', 'grilled lamb'], ARRAY['Aged Telemea', 'Cascaval'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 130,
  ARRAY['ING_GRAPE_FETEASCA_NEAGRA'], ARRAY['romania', 'feteasca_neagra', 'dealu_mare', 'indigenous', 'premium'], 65, 'mid',
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
  'wine-romania-feteasca-alba', 'cotnari-feteasca-alba', 'Cotnari Feteasca Albă', 'Aromatic Romanian white from historic Cotnari region. Floral and fruity with elegant acidity.',
  'white', 'dry', 'classic', ARRAY['feteasca_alba'], false, 'vintage',
  'Romania', 'RO', 'Moldova', 'Cotnari', 'DOC', NULL,
  11.5, 13, 'medium_high', NULL, 'dry', 'medium_light', 'none',
  ARRAY['white_peach', 'apple', 'citrus'], ARRAY['white_flowers', 'honey', 'mineral'], ARRAY[]::TEXT[], ARRAY['floral', 'fruity', 'elegant'], 'medium',
  8, 10, 'white_wine', NULL, 1, 5,
  ARRAY['light_fish', 'poultry', 'salads'], ARRAY['grilled chicken', 'fresh salad', 'light appetizers'], ARRAY['Fresh Cheese', 'Mild Telemea'], ARRAY[]::TEXT[],
  true, false, false, false, false, true, ARRAY['sulfites'], 105,
  ARRAY['ING_GRAPE_FETEASCA_ALBA'], ARRAY['romania', 'feteasca_alba', 'cotnari', 'aromatic', 'indigenous'], 58, 'value',
  NULL, NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- Batch 4 complete
