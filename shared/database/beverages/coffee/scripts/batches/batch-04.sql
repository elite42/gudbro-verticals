-- GUDBRO Coffee Batch 4/4
-- Coffees 61 to 76 of 76
-- Run this in Supabase SQL Editor

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-ethiopian-buna', 'ethiopian-buna', 'Ethiopian Buna (Coffee Ceremony)', 'The birthplace of coffee. Traditional ceremony involves roasting green beans, grinding in mortar, and brewing in clay jebena. A 2-3 hour ritual of hospitality.',
  'filter_coffee', 'hot', 'high', 'unsweetened',
  ARRAY['ethiopian green coffee beans', 'water', 'sugar'], '50g green beans (roasted fresh), 500ml water', ARRAY['ING_COFFEE_ETHIOPIAN', 'ING_WATER', 'ING_SUGAR'],
  'Small handleless cups (sini)', 50, 'Served with popcorn', 'Full ceremony with incense, grass spread, and three rounds',
  'Roast green beans over charcoal until fragrant. Grind with mukecha (mortar). Brew in jebena clay pot. Serve three rounds: Abol, Tona, Baraka.', 7200, 3, 'Three rounds are traditional - each progressively weaker. Incense burning and grass flooring are ceremonial elements.',
  1, 8, 87.5,
  3, 60, NULL, 0.1, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, true, false,
  ARRAY['ethiopian', 'ceremony', 'buna', 'traditional', 'origin', 'cultural'], 65, false, true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-cafe-de-olla', 'cafe-de-olla', 'Cafe de Olla (Mexican Clay Pot Coffee)', 'Traditional Mexican coffee brewed in clay pot with piloncillo (unrefined cane sugar), cinnamon, and sometimes orange peel. Warm and spiced.',
  'specialty', 'hot', 'high', 'sweet',
  ARRAY['dark roast coffee', 'piloncillo', 'cinnamon', 'orange peel'], '30g coffee, 40g piloncillo, 1 cinnamon stick, orange peel strip, 500ml water', ARRAY['ING_COFFEE_DARK_ROAST', 'ING_PILONCILLO', 'ING_CINNAMON', 'ING_ORANGE_PEEL'],
  'Clay mug (jarrito)', 200, 'Cinnamon stick', 'Served in traditional clay cup with cinnamon',
  'Simmer water with piloncillo, cinnamon, and orange peel until dissolved. Add coffee, steep 5 minutes. Strain through cloth into clay cups.', 300, 2, 'Clay pot imparts unique earthy flavor. Piloncillo adds molasses notes different from white sugar.',
  0.55, 3.8, 85.5,
  80, 100, 18, 0.2, NULL,
  true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, true, true,
  ARRAY['mexican', 'traditional', 'spiced', 'clay-pot', 'cinnamon', 'piloncillo'], 72, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-yuanyang', 'yuanyang', 'Yuanyang (Hong Kong Coffee Tea)', 'Hong Kong signature drink mixing black tea with coffee, sweetened with condensed milk. Named after mandarin ducks (symbol of couples).',
  'specialty', 'iced', 'very_high', 'sweet',
  ARRAY['strong coffee', 'black tea', 'condensed milk', 'evaporated milk'], '100ml strong coffee, 100ml black tea, 30ml condensed milk, 30ml evaporated milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_BLACK_TEA', 'ING_CONDENSED_MILK', 'ING_EVAPORATED_MILK'],
  'Tall glass', 350, 'None', 'Hong Kong cha chaan teng style',
  'Brew strong coffee and black tea separately. Mix together with condensed and evaporated milk. Serve hot or over ice.', 180, 2, 'Traditional ratio is 7 parts tea to 3 parts coffee. Adjust to taste.',
  0.65, 4, 83.8,
  180, 150, 22, 5, 6,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, true, false,
  ARRAY['hong-kong', 'coffee-tea', 'fusion', 'cha-chaan-teng', 'iconic'], 75, false, true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-swedish-egg', 'swedish-egg-coffee', 'Swedish Egg Coffee (Scandinavian)', 'Midwest American tradition from Scandinavian immigrants. Whole egg mixed with grounds before brewing creates exceptionally smooth, low-acid coffee.',
  'filter_coffee', 'hot', 'high', 'unsweetened',
  ARRAY['coarse ground coffee', 'whole egg', 'water'], '80g coffee, 1 whole egg with shell, 2 liters water', ARRAY['ING_COFFEE_FILTER', 'ING_EGG', 'ING_WATER'],
  'Large mug', 300, 'None', 'Served church-basement style in large quantities',
  'Crush egg (shell included) and mix with grounds to form sludge. Add to boiling water, boil 3 min. Add cold water to settle grounds. Strain and serve.', 300, 2, 'Egg proteins bind to tannins reducing bitterness. Eggshell adds calcium for smoother taste. Makes large batches.',
  0.35, 3, 88.3,
  15, 100, NULL, 1, 0.5,
  false, true, true, true, 'none', ARRAY['eggs'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY[]::TEXT[], false, true, true,
  ARRAY['scandinavian', 'swedish', 'midwest', 'egg-coffee', 'smooth', 'low-acid'], 55, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-cafe-touba', 'cafe-touba', 'Cafe Touba (Senegalese Spiced Coffee)', 'Senegalese specialty with coffee beans roasted with selim pepper (Guinea pepper) and cloves. Named after holy city of Touba.',
  'specialty', 'hot', 'high', 'sweet',
  ARRAY['coffee beans', 'selim pepper', 'cloves', 'sugar'], '30g coffee with spices, 250ml water, sugar to taste', ARRAY['ING_COFFEE_ROBUSTA', 'ING_SELIM_PEPPER', 'ING_CLOVES', 'ING_SUGAR'],
  'Small glass', 150, 'None', 'Traditional Senegalese presentation',
  'Beans are traditionally roasted with spices before grinding. Brew strong filter coffee. Add sugar to taste.', 180, 2, 'Selim pepper gives unique spicy, woody flavor. Often sold pre-mixed by street vendors in Senegal.',
  0.5, 3.5, 85.7,
  30, 100, 8, 0.2, NULL,
  true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, true, false,
  ARRAY['senegalese', 'african', 'spiced', 'selim-pepper', 'traditional'], 50, false, true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-cortado', 'cortado', 'Cortado', 'Spanish origin - espresso cut with equal amount of warm milk to reduce acidity. Smooth, balanced, and perfectly sized.',
  'espresso_based', 'hot', 'high', 'unsweetened',
  ARRAY['espresso', 'steamed milk'], '60ml espresso, 60ml steamed milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
  'Small glass (gibraltar)', 130, 'None', 'Served in traditional gibraltar glass',
  'Pull double espresso. Steam milk without much foam. Pour equal parts milk into espresso.', 60, 2, 'Milk should be warm, not hot or frothy. The word cortado means cut in Spanish.',
  0.5, 3.5, 85.7,
  60, 126, 5, 3, 3,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY[]::TEXT[], true, false, true,
  ARRAY['spanish', 'cortado', 'balanced', 'small', 'european'], 82, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-piccolo-latte', 'piccolo-latte', 'Piccolo Latte', 'Australian cafe staple - a ristretto shot topped with silky steamed milk in a small glass. Stronger than a latte, smaller than a cortado.',
  'espresso_based', 'hot', 'high', 'unsweetened',
  ARRAY['ristretto', 'steamed milk'], '20ml ristretto, 60ml steamed milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
  'Small espresso glass (demitasse)', 90, 'Tiny latte art', 'Micro latte art',
  'Pull ristretto (short espresso). Steam milk with microfoam. Pour with latte art technique.', 50, 2, 'Ristretto is key - shorter extraction gives sweeter, more intense shot. Popular with baristas for tasting.',
  0.45, 3.2, 85.9,
  45, 65, 4, 2, 2,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY[]::TEXT[], false, false, true,
  ARRAY['australian', 'piccolo', 'ristretto', 'small', 'specialty'], 78, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-einspanner', 'einspanner', 'Einspanner (Vienna Coffee)', 'Viennese coffee house classic - strong black coffee topped with generous whipped cream, served in tall glass with handle.',
  'espresso_based', 'hot', 'high', 'medium',
  ARRAY['strong coffee', 'whipped cream', 'powdered sugar'], '150ml strong coffee, 50g whipped cream, powdered sugar', ARRAY['ING_COFFEE_ESPRESSO', 'ING_WHIPPED_CREAM', 'ING_POWDERED_SUGAR'],
  'Tall glass with handle', 250, 'Whipped cream cloud', 'Traditional Viennese presentation with silver tray',
  'Make strong double espresso or filtered coffee. Pour into glass. Top with lightly sweetened whipped cream. Dust with powdered sugar.', 90, 1, 'Named after one-horse carriage drivers who could hold the glass by handle while driving. Drink coffee through cream.',
  0.7, 4.5, 84.4,
  180, 150, 15, 2, 15,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['viennese', 'austrian', 'whipped-cream', 'coffee-house', 'classic'], 68, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-espresso-romano', 'espresso-romano', 'Espresso Romano', 'Italian classic - espresso served with a lemon twist or slice. The citrus enhances the espresso complexity and aids digestion.',
  'espresso_based', 'hot', 'high', 'unsweetened',
  ARRAY['espresso', 'lemon peel'], '30ml espresso, 1 lemon twist', ARRAY['ING_COFFEE_ESPRESSO', 'ING_LEMON'],
  'Espresso cup', 60, 'Lemon twist on saucer', 'Fresh lemon zest with peel',
  'Pull single espresso. Serve with fresh lemon twist on the side. Guest can rub rim or drop in.', 45, 1, 'Lemon should be fresh. Some rub it on cup rim, others drop it in. Personal preference.',
  0.4, 3, 86.7,
  5, 63, NULL, 0.1, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, false, true,
  ARRAY['italian', 'espresso', 'lemon', 'digestive', 'classic'], 65, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-irish-coffee', 'irish-coffee', 'Irish Coffee', 'Classic cocktail of hot coffee, Irish whiskey, sugar, and cream floated on top. Warming, boozy, and indulgent.',
  'specialty', 'hot', 'high', 'sweet',
  ARRAY['hot coffee', 'irish whiskey', 'brown sugar', 'heavy cream'], '150ml coffee, 45ml whiskey, 10g brown sugar, 30ml cream', ARRAY['ING_COFFEE_FILTER', 'ING_IRISH_WHISKEY', 'ING_BROWN_SUGAR', 'ING_HEAVY_CREAM'],
  'Irish coffee glass (stemmed)', 240, 'Cream layer', 'Perfect cream float with nutmeg',
  'Preheat glass. Add sugar and coffee, stir to dissolve. Add whiskey. Float lightly whipped cream on top using spoon.', 120, 2, 'Cream should float - do not mix. Drink coffee through cream layer. Contains alcohol.',
  1.8, 8, 77.5,
  220, 100, 12, 1, 10,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, true, true,
  ARRAY['irish', 'cocktail', 'alcoholic', 'whiskey', 'warming', 'classic'], 75, true, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-cafe-bombon', 'cafe-bombon', 'Cafe Bombon (Spanish)', 'Valencia specialty - espresso layered with condensed milk in equal parts, creating beautiful layered effect in glass.',
  'espresso_based', 'hot', 'high', 'very_sweet',
  ARRAY['espresso', 'condensed milk'], '30ml espresso, 30ml condensed milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_CONDENSED_MILK'],
  'Small clear glass', 80, 'Visible layers', 'Perfect two-tone layers',
  'Pour condensed milk into glass. Slowly pour espresso over back of spoon to create distinct layers.', 60, 2, 'Do not stir - beauty is in the layers. Mix as you drink or leave separate.',
  0.45, 3.5, 87.1,
  130, 63, 22, 3, 3,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, false, true,
  ARRAY['spanish', 'valencia', 'layered', 'sweet', 'visual'], 72, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-mazagran', 'mazagran', 'Mazagran (Portuguese Iced Coffee)', 'Claimed to be the original iced coffee. Strong espresso mixed with lemon juice and sugar, served over ice. Refreshing and tangy.',
  'specialty', 'iced', 'high', 'medium',
  ARRAY['espresso', 'lemon juice', 'sugar', 'ice'], '60ml espresso, 15ml lemon juice, 10g sugar, 100g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_LEMON_JUICE', 'ING_SUGAR', 'ING_ICE'],
  'Tall glass', 250, 'Lemon slice', 'Lemon wheel and mint sprig',
  'Dissolve sugar in hot espresso. Cool. Add lemon juice. Pour over ice. Garnish with lemon.', 90, 1, 'Originated from French soldiers in Algeria. The lemon makes it incredibly refreshing.',
  0.5, 3.8, 86.8,
  50, 126, 12, 0.2, NULL,
  true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['portuguese', 'iced', 'lemon', 'refreshing', 'original-iced-coffee'], 60, true, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-cafe-cubano', 'cafe-cubano', 'Cafe Cubano (Cuban Espresso)', 'Sweet, strong Cuban espresso whipped with demerara sugar during brewing to create crema called espumita.',
  'espresso_based', 'hot', 'very_high', 'very_sweet',
  ARRAY['dark roast espresso', 'demerara sugar'], '30ml espresso, 15g demerara sugar', ARRAY['ING_COFFEE_ESPRESSO', 'ING_DEMERARA_SUGAR'],
  'Tacita (small cup)', 60, 'Espumita foam', 'Thick caramelized foam layer',
  'Add sugar to cup. Add first drops of espresso to sugar and whip vigorously to create espumita paste. Pour remaining espresso and stir.', 90, 2, 'The secret is whipping the sugar with first drops of coffee. Creates caramelized foam that floats.',
  0.4, 2.8, 85.7,
  60, 80, 15, 0.1, NULL,
  true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, true, false,
  ARRAY['cuban', 'sweet', 'strong', 'espumita', 'latin'], 78, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-con-panna', 'espresso-con-panna', 'Espresso Con Panna', 'Espresso with a dollop of whipped cream on top. Simple Italian indulgence meaning espresso with cream.',
  'espresso_based', 'hot', 'high', 'lightly_sweet',
  ARRAY['espresso', 'whipped cream'], '30ml espresso, 20g whipped cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_WHIPPED_CREAM'],
  'Espresso cup', 60, 'Whipped cream dollop', 'Fresh whipped cream rosette',
  'Pull single or double espresso. Top with dollop of unsweetened or lightly sweetened whipped cream.', 50, 1, 'Con panna means with cream in Italian. Cream should be cold and fresh whipped.',
  0.45, 3.2, 85.9,
  60, 63, 2, 1, 5,
  false, false, true, true, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY['chocolate', 'caramel'], true, false, true,
  ARRAY['italian', 'espresso', 'cream', 'simple', 'classic'], 72, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-kyoto-cold-brew', 'kyoto-cold-brew', 'Kyoto-Style Cold Brew', 'Japanese slow-drip method taking 8-12 hours. Water drips drop by drop through coffee, creating an exceptionally smooth, delicate brew.',
  'cold_brew', 'iced', 'high', 'unsweetened',
  ARRAY['medium roast coffee', 'ice water'], '50g coffee, 500ml ice water (drip over 8-12 hours)', ARRAY['ING_COFFEE_FILTER', 'ING_WATER', 'ING_ICE'],
  'Wine glass or beaker', 200, 'None', 'Served in elegant glassware with ice sphere',
  'Set up Kyoto drip tower. Add ice water to top chamber, coffee to middle. Adjust drip rate to 1 drop per second. Let drip 8-12 hours.', 43200, 3, 'Also called slow drip or Dutch coffee. Results in wine-like complexity. Serve undiluted.',
  1, 6, 83.3,
  5, 120, NULL, 0.2, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'oat']::milk_type[], ARRAY[]::TEXT[], false, false, false,
  ARRAY['japanese', 'kyoto', 'slow-drip', 'artisan', 'smooth', 'specialty'], 70, false, true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  'coffee-avocado-coffee', 'avocado-coffee', 'Avocado Coffee (Es Alpukat Kopi)', 'Indonesian and Vietnamese favorite - creamy avocado smoothie blended with coffee. Rich, healthy, and satisfying meal replacement.',
  'specialty', 'blended', 'high', 'sweet',
  ARRAY['espresso', 'avocado', 'condensed milk', 'ice'], '60ml espresso, 1/2 avocado, 30ml condensed milk, 100g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_AVOCADO', 'ING_CONDENSED_MILK', 'ING_ICE'],
  'Tall glass', 400, 'None', 'Avocado slice and cocoa dust',
  'Blend avocado with condensed milk and ice until smooth. Pour into glass. Float espresso on top or layer.', 120, 1, 'Popular breakfast drink in Southeast Asia. Avocado provides healthy fats and creaminess.',
  1.1, 5, 78,
  320, 126, 25, 4, 18,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['coconut']::milk_type[], ARRAY['chocolate'], true, true, true,
  ARRAY['indonesian', 'vietnamese', 'avocado', 'smoothie', 'healthy', 'filling'], 72, false, false
) ON CONFLICT (id) DO NOTHING;

-- Batch 4 complete
