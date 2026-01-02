-- GUDBRO Coffee Batch 1/4
-- Coffees 1 to 20 of 76
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
  'coffee-espresso-single', 'espresso-single', 'Espresso (Single)', 'A concentrated shot of coffee extracted under high pressure, featuring rich crema and intense flavor.',
  'espresso_based', 'hot', 'high', 'unsweetened',
  ARRAY['ground coffee'], '9g coffee, 25-30ml espresso', ARRAY['ING_COFFEE_ESPRESSO'],
  'Espresso cup', 60, 'None or crema swirl', 'Cocoa dust on crema or minimalist latte art',
  'Extract at 9 bar, 92°C, ~25s', 40, 2, 'Double = 18g coffee / 50-60ml',
  0.35, 2.5, 86,
  5, 63, NULL, 0.1, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, false, true,
  ARRAY['classic', 'italian', 'strong', 'quick'], 85, false, false
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
  'coffee-espresso-double', 'espresso-double', 'Espresso (Double)', 'A double shot of espresso, also known as doppio, with twice the intensity and caffeine.',
  'espresso_based', 'hot', 'very_high', 'unsweetened',
  ARRAY['ground coffee'], '18g coffee, 50-60ml espresso', ARRAY['ING_COFFEE_ESPRESSO'],
  'Espresso cup', 90, 'None or crema swirl', 'Cocoa dust ring',
  'Extract at 9 bar, 92°C, ~28s', 45, 2, 'Use bottomless for training',
  0.5, 3, 83.3,
  10, 126, NULL, 0.2, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, false, true,
  ARRAY['classic', 'italian', 'strong', 'doppio'], 80, false, false
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
  'coffee-americano-hot', 'americano-hot', 'Americano (Hot)', 'Espresso diluted with hot water, creating a smooth and less intense coffee experience.',
  'espresso_based', 'hot', 'high', 'unsweetened',
  ARRAY['espresso', 'hot water'], '60ml espresso, 120ml hot water', ARRAY['ING_COFFEE_ESPRESSO', 'ING_WATER'],
  'Tall mug', 300, 'Lemon slice optional', 'Lemon twist + clear glass layering',
  'Pull espresso, add hot water', 50, 1, 'Iced: 60ml espresso + 150g ice + 120ml cold water',
  0.4, 2.8, 85.7,
  10, 126, NULL, 0.2, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['vanilla', 'caramel', 'hazelnut'], true, true, true,
  ARRAY['classic', 'simple', 'black-coffee'], 88, false, false
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
  'coffee-latte-hot', 'latte-hot', 'Latte (Hot)', 'Espresso with steamed milk and a thin layer of microfoam, creating a creamy and balanced drink.',
  'espresso_based', 'hot', 'high', 'unsweetened',
  ARRAY['espresso', 'milk'], '60ml espresso, 180ml steamed milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
  'Latte glass', 300, 'Minimal foam art', 'Rosetta/Tulip latte art',
  'Pour espresso, then steamed milk', 70, 2, 'Flavor syrup +15ml optional',
  0.6, 3.5, 82.9,
  150, 126, 12, 8, 6,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'skim', 'oat', 'almond', 'soy', 'coconut']::milk_type[], ARRAY['vanilla', 'caramel', 'hazelnut', 'mocha'], true, true, true,
  ARRAY['classic', 'creamy', 'popular', 'latte-art'], 95, false, false
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
  'coffee-iced-latte', 'iced-latte', 'Iced Latte', 'Cold milk poured over ice with espresso floated on top, refreshing and smooth.',
  'espresso_based', 'iced', 'high', 'unsweetened',
  ARRAY['espresso', 'milk', 'ice'], '60ml espresso, 150ml milk, 100g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_ICE'],
  'Tall glass', 350, 'No garnish', 'Layered pour + straw',
  'Pour milk over ice, float espresso', 60, 1, 'Add whipped cream if desired',
  0.6, 3.5, 82.9,
  130, 126, 10, 7, 5,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'skim', 'oat', 'almond', 'soy', 'coconut']::milk_type[], ARRAY['vanilla', 'caramel', 'hazelnut', 'mocha'], true, true, true,
  ARRAY['iced', 'refreshing', 'popular', 'summer'], 92, false, false
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
  'coffee-cappuccino', 'cappuccino', 'Cappuccino', 'Equal parts espresso, steamed milk, and foam, dusted with cocoa or cinnamon.',
  'espresso_based', 'hot', 'high', 'unsweetened',
  ARRAY['espresso', 'milk'], '60ml espresso, 120ml textured milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
  'Cappuccino cup', 180, 'Cocoa powder dust', 'Latte art + cocoa edge dust',
  'Combine espresso and microfoam', 75, 2, 'Dust cocoa/cinnamon',
  0.55, 3.4, 83.8,
  120, 126, 8, 6, 5,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'skim', 'oat', 'almond', 'soy', 'coconut']::milk_type[], ARRAY['vanilla', 'caramel', 'hazelnut'], true, true, true,
  ARRAY['classic', 'italian', 'foamy', 'morning'], 90, false, false
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
  'coffee-flat-white', 'flat-white', 'Flat White', 'A stronger espresso drink with microfoamed milk, featuring a velvety texture and intense coffee flavor.',
  'espresso_based', 'hot', 'high', 'unsweetened',
  ARRAY['espresso', 'milk'], '60ml espresso, 150ml microfoamed milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
  'Flat white cup', 180, 'None', 'Tight latte art',
  'Pour thin microfoam layer', 70, 2, 'Stronger ratio than cappuccino',
  0.55, 3.4, 83.8,
  130, 126, 9, 7, 5,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'skim', 'oat', 'almond', 'soy', 'coconut']::milk_type[], ARRAY['vanilla'], true, true, true,
  ARRAY['australian', 'strong', 'velvety', 'specialty'], 85, false, false
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
  'coffee-macchiato', 'macchiato', 'Macchiato', 'Espresso marked with a small amount of milk foam, preserving the coffee intensity.',
  'espresso_based', 'hot', 'high', 'unsweetened',
  ARRAY['espresso', 'milk foam'], '60ml espresso, 10ml milk foam', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
  'Espresso cup', 60, 'None', 'Tiny foam dollop art',
  'Spoon foam over espresso', 40, 1, 'Iced: espresso over ice + cold foam',
  0.4, 2.8, 85.7,
  15, 126, 1, 1, 0.5,
  false, false, true, true, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['caramel', 'vanilla'], true, true, true,
  ARRAY['classic', 'italian', 'strong', 'small'], 75, false, false
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
  'coffee-cafe-mocha', 'cafe-mocha', 'Cafe Mocha', 'A chocolate lovers dream - espresso combined with chocolate syrup, steamed milk, and whipped cream.',
  'espresso_based', 'hot', 'high', 'sweet',
  ARRAY['espresso', 'chocolate syrup', 'milk', 'whipped cream'], '60ml espresso, 20ml chocolate syrup, 150ml milk, 20g cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE', 'ING_WHIPPED_CREAM'],
  'Glass mug', 300, 'Whipped cream + chocolate drizzle', 'Cocoa dust + chocolate shards',
  'Mix syrup + espresso, add steamed milk, top with cream', 90, 2, 'Chocolate drizzle',
  0.75, 4, 81.2,
  290, 126, 35, 8, 12,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'skim', 'oat', 'almond', 'soy', 'coconut']::milk_type[], ARRAY['vanilla', 'caramel', 'white chocolate'], true, true, true,
  ARRAY['chocolate', 'indulgent', 'sweet', 'dessert-coffee'], 88, false, false
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
  'coffee-caramel-latte', 'caramel-latte', 'Caramel Latte', 'Smooth latte infused with rich caramel syrup and finished with a caramel drizzle.',
  'espresso_based', 'hot', 'high', 'sweet',
  ARRAY['espresso', 'milk', 'caramel syrup'], '60ml espresso, 150ml milk, 15ml caramel syrup', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_CARAMEL_SYRUP'],
  'Latte glass', 300, 'Caramel drizzle', 'Criss-cross caramel art',
  'Steam milk with syrup, pour over espresso', 80, 2, 'Caramel drizzle',
  0.65, 3.9, 83.3,
  200, 126, 28, 8, 6,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'skim', 'oat', 'almond', 'soy', 'coconut']::milk_type[], ARRAY['extra caramel', 'vanilla', 'salted caramel'], true, true, true,
  ARRAY['caramel', 'sweet', 'popular', 'flavored'], 87, false, false
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
  'coffee-spanish-latte', 'spanish-latte', 'Spanish Latte (Hot)', 'A creamy latte made with condensed milk for a rich, sweet Vietnamese-style coffee experience.',
  'espresso_based', 'hot', 'high', 'very_sweet',
  ARRAY['espresso', 'milk', 'condensed milk'], '60ml espresso, 120ml milk, 30ml condensed milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_CONDENSED_MILK'],
  'Glass mug', 300, 'None', 'Condensed milk swirl',
  'Mix condensed + milk, steam, pour espresso', 80, 2, 'Iced: shake all with ice',
  0.7, 4, 82.5,
  280, 126, 40, 9, 8,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'coconut']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['sweet', 'creamy', 'asian-style', 'indulgent'], 82, false, false
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
  'coffee-raf-coffee', 'raf-coffee', 'Raf Coffee (Classic)', 'Russian specialty - espresso, cream, and vanilla syrup steamed together until velvety smooth.',
  'espresso_based', 'hot', 'high', 'sweet',
  ARRAY['espresso', 'cream', 'sugar', 'vanilla syrup'], '60ml espresso, 60ml cream, 10ml syrup, 5g sugar', ARRAY['ING_COFFEE_ESPRESSO', 'ING_HEAVY_CREAM', 'ING_VANILLA_SYRUP', 'ING_SUGAR'],
  'Glass mug', 300, 'None', 'Vanilla bean piece',
  'Steam all together until frothy', 90, 3, 'Serve hot without foam',
  0.8, 4.2, 81,
  320, 126, 25, 3, 22,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY['lavender', 'caramel', 'hazelnut'], true, true, true,
  ARRAY['russian', 'creamy', 'specialty', 'rich'], 70, false, true
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
  'coffee-tiramisu-cappuccino', 'tiramisu-cappuccino', 'Tiramisu Cappuccino', 'Dessert-inspired cappuccino layered with mascarpone cream and dusted with cocoa, like the classic Italian dessert.',
  'espresso_based', 'hot', 'high', 'sweet',
  ARRAY['espresso', 'milk', 'cocoa', 'mascarpone cream'], '60ml espresso, 120ml milk, 15g cocoa, 20g mascarpone', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_COCOA_POWDER', 'ING_MASCARPONE'],
  'Glass mug', 300, 'Cocoa dust', 'Cocoa stencil + ladyfinger crumb',
  'Layer espresso, mascarpone, milk foam; dust cocoa', 110, 3, 'Dessert-style',
  0.95, 4.8, 80.2,
  280, 126, 22, 8, 15,
  false, false, false, false, 'whole', ARRAY['milk', 'eggs', 'gluten'],
  ARRAY['whole']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['italian', 'dessert', 'indulgent', 'specialty'], 75, false, true
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
  'coffee-cream-cheese-latte', 'cream-cheese-latte', 'Cream Cheese Latte', 'Trendy Asian-style latte topped with a layer of salted cream cheese foam.',
  'espresso_based', 'hot', 'high', 'medium',
  ARRAY['espresso', 'milk', 'cream cheese foam'], '60ml espresso, 150ml milk, 20g cream cheese foam', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_CREAM_CHEESE'],
  'Tall glass', 300, 'Cream cheese cap', 'Sea salt flakes + microfoam layer',
  'Pour milk over espresso, top cream cheese foam', 90, 3, 'Sprinkle sea salt',
  0.85, 4.5, 81.1,
  220, 126, 15, 9, 12,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['asian-style', 'trending', 'creamy', 'savory-sweet'], 78, false, true
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
  'coffee-espresso-tonic', 'espresso-tonic', 'Espresso Tonic', 'Refreshing summer drink combining espresso with tonic water over ice, garnished with citrus.',
  'espresso_based', 'iced', 'high', 'lightly_sweet',
  ARRAY['espresso', 'tonic water', 'ice', 'lemon slice'], '60ml espresso, 120ml tonic, 120g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_TONIC_WATER', 'ING_ICE', 'ING_LEMON'],
  'Highball glass', 350, 'Lemon slice', 'Dehydrated lemon wheel + clear layering',
  'Pour tonic over ice, float espresso', 80, 2, 'Garnish lemon',
  0.75, 4.2, 82.1,
  80, 126, 20, 0.5, NULL,
  true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, false, true,
  ARRAY['refreshing', 'summer', 'unique', 'bitter-sweet'], 72, true, false
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
  'coffee-affogato', 'affogato', 'Affogato', 'Italian dessert-coffee hybrid - hot espresso poured over cold vanilla ice cream.',
  'espresso_based', 'layered', 'high', 'sweet',
  ARRAY['espresso', 'vanilla ice cream'], '60ml espresso, 80g ice cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_VANILLA_ICE_CREAM'],
  'Dessert bowl', 200, 'None', 'Chocolate shard on top',
  'Pour hot espresso over ice cream', 50, 1, 'Chocolate drizzle optional',
  0.7, 4, 82.5,
  200, 126, 22, 4, 10,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY['chocolate', 'caramel'], true, false, true,
  ARRAY['italian', 'dessert', 'indulgent', 'classic'], 80, false, false
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
  'coffee-nutella-coffee-iced', 'nutella-coffee-iced', 'Nutella Coffee (Iced)', 'Indulgent blend of Nutella, espresso, and milk topped with whipped cream.',
  'coffee_mix', 'blended', 'high', 'very_sweet',
  ARRAY['espresso', 'nutella', 'milk', 'whipped cream', 'ice'], '60ml espresso, 25g Nutella, 150ml milk, 100g ice, 20g cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_NUTELLA', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
  'Tall glass', 400, 'Whipped cream + Nutella drizzle', 'Whipped cream tower + hazelnut rim',
  'Blend Nutella + milk; add ice; pour espresso; top with cream', 90, 3, 'Hot: steam milk with Nutella',
  0.9, 4.5, 80,
  380, 126, 45, 9, 18,
  false, false, false, false, 'whole', ARRAY['milk', 'nuts', 'gluten'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['extra chocolate'], true, true, true,
  ARRAY['nutella', 'indulgent', 'sweet', 'popular'], 88, false, true
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
  'coffee-oreo-coffee', 'oreo-coffee', 'Oreo Coffee', 'Cookies and cream meets coffee - blended Oreo cookies with espresso and chocolate.',
  'coffee_mix', 'blended', 'high', 'sweet',
  ARRAY['espresso', 'oreo crumbs', 'milk', 'chocolate syrup', 'whipped cream'], '60ml espresso, 2 Oreo, 150ml milk, 15ml chocolate syrup, 20g cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_OREO', 'ING_MILK_WHOLE', 'ING_CHOCOLATE_SYRUP', 'ING_WHIPPED_CREAM'],
  'Tall glass', 400, 'Whipped cream + chocolate drizzle', 'Oreo crumble rim',
  'Blend Oreo + milk + syrup; add espresso; top with cream', 95, 3, 'Add Oreo crumble',
  0.95, 4.6, 79.3,
  350, 126, 42, 8, 15,
  false, false, false, false, 'whole', ARRAY['milk', 'gluten', 'soy'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY['extra chocolate'], true, true, true,
  ARRAY['cookies', 'indulgent', 'sweet', 'dessert-coffee'], 85, false, true
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
  'coffee-white-mocha', 'white-mocha', 'White Mocha', 'Sweet and creamy white chocolate latte with a luxurious finish.',
  'coffee_mix', 'hot', 'high', 'very_sweet',
  ARRAY['espresso', 'white chocolate syrup', 'milk'], '60ml espresso, 20ml white chocolate syrup, 150ml milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE'],
  'Glass mug', 300, 'None', 'White chocolate grate',
  'Steam milk with syrup; pour over espresso', 85, 2, 'Very sweet profile',
  0.85, 4.3, 80.2,
  320, 126, 45, 9, 12,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['vanilla', 'raspberry'], true, true, true,
  ARRAY['white-chocolate', 'sweet', 'creamy', 'indulgent'], 82, false, false
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
  'coffee-kinder-coffee-iced', 'kinder-coffee-iced', 'Kinder Coffee (Iced)', 'Sweet blend featuring Kinder chocolate, white chocolate syrup, and espresso.',
  'coffee_mix', 'blended', 'high', 'very_sweet',
  ARRAY['espresso', 'white chocolate syrup', 'kinder chocolate', 'milk', 'ice'], '60ml espresso, 20ml white chocolate syrup, 1 bar Kinder, 150ml milk, 100g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_KINDER', 'ING_MILK_WHOLE', 'ING_ICE'],
  'Tall glass', 400, 'Whipped cream + white chocolate drizzle', 'Rim with white chocolate shards',
  'Blend all except espresso; pour espresso on top', 95, 3, 'Garnish with Kinder flakes',
  0.95, 4.7, 79.8,
  390, 126, 48, 10, 18,
  false, false, false, false, 'whole', ARRAY['milk', 'nuts', 'gluten'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['kinder', 'sweet', 'indulgent', 'chocolate'], 82, false, true
) ON CONFLICT (id) DO NOTHING;

-- Batch 1 complete
