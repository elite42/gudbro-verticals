-- GUDBRO Tea & Infusions Batch 1/5
-- Teas 1 to 15 of 62
-- Run this in Supabase SQL Editor AFTER creating the schema

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-latte-hot', 'matcha-latte-hot', 'Matcha Latte (Hot)', 'Traditional Japanese green tea latte made with ceremonial grade matcha and steamed milk.',
  'matcha', 'hot', 'medium', 'lightly_sweet',
  ARRAY['matcha powder', 'milk', 'water'], '2g matcha, 60ml hot water, 180ml milk', ARRAY['ING_MATCHA', 'ING_WATER', 'ING_MILK_WHOLE'],
  NULL, ARRAY[]::boba_topping[],
  'Ceramic mug', 300, 'Matcha powder dust', 'Foam art + bamboo whisk prop',
  'Whisk matcha with hot water until frothy; steam milk; combine', 80, 2, NULL, 80, 'Use ceremonial grade for best flavor',
  0.8, 4, 80,
  140, 70, 12, 8, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut', 'soy']::milk_type[], ARRAY['vanilla', 'honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['japanese', 'matcha', 'green-tea', 'healthy', 'antioxidant'], 'Japan', 88, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-latte-iced', 'matcha-latte-iced', 'Iced Matcha Latte', 'Refreshing cold matcha drink shaken with milk and served over ice.',
  'matcha', 'iced', 'medium', 'lightly_sweet',
  ARRAY['matcha powder', 'milk', 'water', 'ice'], '2g matcha, 60ml water, 150ml milk, 100g ice', ARRAY['ING_MATCHA', 'ING_WATER', 'ING_MILK_WHOLE', 'ING_ICE'],
  NULL, ARRAY[]::boba_topping[],
  'Tall glass', 350, 'None', 'Layered green gradient + bamboo straw',
  'Whisk matcha; shake vigorously with milk and ice; pour over fresh ice', 75, 1, NULL, NULL, 'Shake well to prevent clumping',
  0.8, 4, 80,
  120, 70, 10, 7, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut', 'soy']::milk_type[], ARRAY['vanilla', 'honey', 'lavender'], ARRAY[]::boba_topping[], true, true,
  ARRAY['matcha', 'iced', 'refreshing', 'summer', 'instagram'], 'Japan', 90, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-coconut', 'matcha-coconut-latte', 'Matcha Coconut Latte', 'Vegan-friendly matcha latte made with creamy coconut milk for tropical undertones.',
  'matcha', 'hot', 'medium', 'lightly_sweet',
  ARRAY['matcha powder', 'coconut milk', 'water'], '2g matcha, 150ml coconut milk, 60ml hot water', ARRAY['ING_MATCHA', 'ING_MILK_COCONUT', 'ING_WATER'],
  NULL, ARRAY[]::boba_topping[],
  'Ceramic mug', 300, 'Matcha dust', 'Toasted coconut flakes + matcha swirl',
  'Whisk matcha with water; warm coconut milk; combine gently', 85, 2, NULL, 80, 'Coconut milk froths differently than dairy',
  0.95, 4.8, 80.2,
  160, 70, 8, 2, 12,
  true, true, true, false, false, 'coconut', ARRAY[]::TEXT[],
  ARRAY['coconut', 'oat', 'almond', 'soy']::milk_type[], ARRAY['vanilla', 'agave'], ARRAY[]::boba_topping[], true, false,
  ARRAY['vegan', 'dairy-free', 'matcha', 'coconut', 'tropical'], 'Japan', 78, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-oat-milk', 'matcha-oat-milk-latte', 'Matcha Oat Milk Latte', 'Creamy matcha latte with oat milk, naturally sweet and vegan-friendly.',
  'matcha', 'hot', 'medium', 'lightly_sweet',
  ARRAY['matcha powder', 'oat milk', 'water'], '2g matcha, 180ml oat milk, 40ml hot water', ARRAY['ING_MATCHA', 'ING_MILK_OAT', 'ING_WATER'],
  NULL, ARRAY[]::boba_topping[],
  'Latte glass', 300, 'None', 'Oat foam art',
  'Whisk matcha; steam oat milk to microfoam; pour with latte art', 80, 2, NULL, 80, 'Oat milk creates excellent microfoam',
  0.9, 4.5, 80,
  130, 70, 10, 3, 5,
  true, true, false, false, false, 'oat', ARRAY['gluten'],
  ARRAY['oat', 'almond', 'soy', 'coconut']::milk_type[], ARRAY['vanilla', 'honey', 'maple'], ARRAY[]::boba_topping[], true, false,
  ARRAY['vegan', 'oat-milk', 'matcha', 'creamy'], 'Japan', 82, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-vanilla', 'vanilla-matcha-latte', 'Vanilla Matcha Latte', 'Classic matcha latte enhanced with Madagascar vanilla for a sweet, aromatic experience.',
  'matcha', 'hot', 'medium', 'medium',
  ARRAY['matcha powder', 'milk', 'vanilla syrup', 'water'], '2g matcha, 180ml milk, 15ml vanilla syrup, 40ml water', ARRAY['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_VANILLA_SYRUP', 'ING_WATER'],
  NULL, ARRAY[]::boba_topping[],
  'Glass mug', 300, 'Vanilla bean specks', 'Vanilla bean pod garnish',
  'Whisk matcha; steam milk with vanilla; combine', 85, 2, NULL, 80, 'Use real vanilla syrup for best results',
  0.9, 4.5, 80,
  180, 70, 22, 8, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut', 'soy']::milk_type[], ARRAY['extra vanilla', 'honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['matcha', 'vanilla', 'sweet', 'aromatic'], 'Japan', 80, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-blended', 'matcha-frappuccino', 'Matcha Frappuccino', 'Blended frozen matcha drink with milk and ice, topped with whipped cream.',
  'matcha', 'blended', 'medium', 'sweet',
  ARRAY['matcha powder', 'milk', 'ice', 'whipped cream'], '3g matcha, 150ml milk, 150g ice, 20g cream', ARRAY['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
  NULL, ARRAY[]::boba_topping[],
  'Tall glass', 450, 'Whipped cream + matcha dust', 'Matcha drizzle + white chocolate curls',
  'Blend matcha, milk, ice until smooth; top with whipped cream', 90, 2, NULL, NULL, 'Blend until completely smooth',
  0.95, 4.8, 80.2,
  280, 100, 35, 8, 12,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['vanilla', 'white chocolate'], ARRAY[]::boba_topping[], true, true,
  ARRAY['matcha', 'blended', 'frozen', 'frappuccino', 'indulgent'], 'Japan', 85, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-honey', 'honey-matcha-latte', 'Honey Matcha Latte', 'Matcha latte naturally sweetened with raw honey for a healthier option.',
  'matcha', 'hot', 'medium', 'medium',
  ARRAY['matcha powder', 'milk', 'honey', 'water'], '2g matcha, 180ml milk, 15ml honey, 40ml water', ARRAY['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_HONEY', 'ING_WATER'],
  NULL, ARRAY[]::boba_topping[],
  'Ceramic mug', 300, 'Honey drizzle', 'Honeycomb piece + bee pollen',
  'Whisk matcha with water; steam milk with honey; combine', 85, 2, NULL, 80, 'Add honey while milk is warm to dissolve',
  0.95, 4.6, 79.3,
  170, 70, 20, 8, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut']::milk_type[], ARRAY['extra honey', 'vanilla'], ARRAY[]::boba_topping[], true, false,
  ARRAY['matcha', 'honey', 'natural', 'healthy'], 'Japan', 76, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-white-chocolate', 'white-chocolate-matcha', 'White Chocolate Matcha', 'Indulgent matcha latte with white chocolate for a creamy, sweet treat.',
  'matcha', 'hot', 'medium', 'sweet',
  ARRAY['matcha powder', 'milk', 'white chocolate syrup', 'water'], '2g matcha, 180ml milk, 20ml white chocolate syrup, 40ml water', ARRAY['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_WATER'],
  NULL, ARRAY[]::boba_topping[],
  'Glass mug', 300, 'White chocolate drizzle', 'White chocolate shavings + matcha dust art',
  'Whisk matcha; steam milk with white chocolate; pour with swirl', 90, 2, NULL, 80, 'Balance sweetness carefully',
  1, 5, 80,
  280, 70, 38, 9, 12,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY['extra white chocolate', 'vanilla'], ARRAY[]::boba_topping[], true, false,
  ARRAY['matcha', 'white-chocolate', 'indulgent', 'sweet', 'dessert'], 'Japan', 74, false, true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-strawberry', 'strawberry-matcha-latte', 'Strawberry Matcha Latte', 'Pink and green layered drink combining matcha with strawberry puree.',
  'matcha', 'iced', 'medium', 'sweet',
  ARRAY['matcha powder', 'milk', 'strawberry puree', 'ice'], '2g matcha, 150ml milk, 30ml strawberry puree, 100g ice', ARRAY['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_STRAWBERRY_PUREE', 'ING_ICE'],
  NULL, ARRAY[]::boba_topping[],
  'Tall glass', 400, 'Strawberry slice', 'Clear layered pink-green gradient + fresh strawberry',
  'Layer strawberry at bottom; add ice and milk; float matcha on top', 95, 3, NULL, NULL, 'Pour slowly for clean layers',
  1.1, 5.5, 80,
  200, 70, 28, 7, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['vanilla'], ARRAY[]::boba_topping[], true, true,
  ARRAY['matcha', 'strawberry', 'instagram', 'layered', 'trendy'], 'Japan', 86, true, true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-lavender', 'lavender-matcha-latte', 'Lavender Matcha Latte', 'Calming matcha latte infused with dried lavender for a floral, relaxing experience.',
  'matcha', 'hot', 'medium', 'lightly_sweet',
  ARRAY['matcha powder', 'milk', 'lavender syrup', 'water'], '2g matcha, 180ml milk, 10ml lavender syrup, 40ml water', ARRAY['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_LAVENDER_SYRUP', 'ING_WATER'],
  NULL, ARRAY[]::boba_topping[],
  'Ceramic mug', 300, 'Dried lavender sprinkle', 'Fresh lavender sprig + purple foam art',
  'Whisk matcha; steam milk with lavender syrup; combine gently', 90, 2, NULL, 80, 'Lavender should be subtle, not overpowering',
  1, 5, 80,
  150, 70, 14, 8, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut']::milk_type[], ARRAY['extra lavender', 'vanilla', 'honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['matcha', 'lavender', 'floral', 'calming', 'wellness'], 'Japan', 72, false, true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-classic-milk-tea', 'classic-milk-tea', 'Classic Milk Tea', 'Traditional Taiwanese milk tea with chewy tapioca pearls - the original boba drink.',
  'bubble_tea', 'iced', 'medium', 'medium',
  ARRAY['black tea', 'milk', 'tapioca pearls', 'sugar', 'ice'], '200ml black tea, 80ml milk, 50g boba, 100g ice', ARRAY['ING_TEA_BLACK', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_SUGAR', 'ING_ICE'],
  'black_tea', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Sealed top + fat straw', 'Reusable glass jar + metal straw',
  'Brew tea; cool; shake with milk and ice; add boba', 120, 2, 300, 95, 'Cook boba fresh daily',
  0.8, 4.5, 82.2,
  280, 50, 35, 4, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut', 'soy', 'none']::milk_type[], ARRAY['vanilla', 'caramel', 'honey'], ARRAY['tapioca_pearls', 'pudding', 'coconut_jelly', 'aloe_vera']::boba_topping[], true, true,
  ARRAY['classic', 'taiwanese', 'boba', 'milk-tea', 'original'], 'Taiwan', 95, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-brown-sugar-tiger', 'brown-sugar-tiger-milk-tea', 'Brown Sugar Tiger Milk Tea', 'Iconic striped milk tea with caramelized brown sugar boba creating tiger stripes on the glass.',
  'bubble_tea', 'iced', 'none', 'very_sweet',
  ARRAY['brown sugar syrup', 'milk', 'tapioca pearls', 'ice'], '50ml brown sugar syrup, 200ml milk, 60g boba, 100g ice', ARRAY['ING_BROWN_SUGAR_SYRUP', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'none', ARRAY['brown_sugar_pearls']::boba_topping[],
  'Clear cup', 500, 'Tiger stripes visible', 'Artistic caramel drips + branded cup',
  'Swirl brown sugar syrup in cup; add ice and milk; top with boba', 90, 2, NULL, NULL, 'Swirl syrup for tiger stripe effect',
  0.75, 5, 85,
  380, NULL, 55, 6, 8,
  false, false, true, false, true, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut', 'soy']::milk_type[], ARRAY['extra brown sugar'], ARRAY['brown_sugar_pearls', 'pudding', 'cheese_foam']::boba_topping[], true, true,
  ARRAY['brown-sugar', 'tiger', 'instagram', 'trending', 'caffeine-free'], 'Taiwan', 98, false, true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-taro-milk-tea', 'taro-milk-tea', 'Taro Milk Tea', 'Creamy purple milk tea made with sweet taro root, naturally sweet with vanilla notes.',
  'bubble_tea', 'iced', 'low', 'sweet',
  ARRAY['taro powder', 'jasmine tea', 'milk', 'tapioca pearls', 'ice'], '30g taro powder, 100ml jasmine tea, 150ml milk, 50g boba, 100g ice', ARRAY['ING_TARO_POWDER', 'ING_TEA_JASMINE', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'green_tea', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Purple gradient', 'Taro chunks garnish + purple straw',
  'Blend taro powder with tea; add milk and ice; shake well; add boba', 120, 2, NULL, NULL, 'Blend taro powder smoothly to avoid lumps',
  0.9, 5, 82,
  340, 25, 42, 5, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'coconut', 'soy']::milk_type[], ARRAY['vanilla'], ARRAY['tapioca_pearls', 'taro_balls', 'coconut_jelly', 'pudding']::boba_topping[], true, true,
  ARRAY['taro', 'purple', 'creamy', 'instagram', 'unique'], 'Taiwan', 92, false, true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-thai-milk-tea', 'thai-milk-tea', 'Thai Milk Tea', 'Vibrant orange Thai tea with condensed milk and spices, sweet and aromatic.',
  'bubble_tea', 'iced', 'medium', 'very_sweet',
  ARRAY['thai tea', 'condensed milk', 'evaporated milk', 'tapioca pearls', 'ice'], '200ml thai tea, 30ml condensed milk, 50ml evaporated milk, 50g boba, 100g ice', ARRAY['ING_TEA_THAI', 'ING_CONDENSED_MILK', 'ING_EVAPORATED_MILK', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'black_tea', ARRAY['tapioca_pearls']::boba_topping[],
  'Tall glass', 450, 'Orange gradient', 'Clear layered orange-white + star anise',
  'Brew thai tea with spices; cool; layer with milks over ice; add boba', 150, 2, 420, 95, 'Traditional Thai tea mix includes star anise and vanilla',
  0.85, 5, 83,
  320, 60, 48, 6, 10,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'coconut']::milk_type[], ARRAY[]::TEXT[], ARRAY['tapioca_pearls', 'coconut_jelly', 'grass_jelly']::boba_topping[], true, true,
  ARRAY['thai', 'orange', 'spiced', 'condensed-milk', 'aromatic'], 'Thailand', 88, false, false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  'tea-matcha-boba', 'matcha-boba', 'Matcha Milk Tea with Boba', 'Japanese matcha meets Taiwanese boba - creamy green tea with chewy tapioca pearls.',
  'bubble_tea', 'iced', 'medium', 'medium',
  ARRAY['matcha powder', 'milk', 'tapioca pearls', 'ice'], '3g matcha, 200ml milk, 50g boba, 100g ice', ARRAY['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'green_tea', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Green color', 'Matcha powder art + clear layers',
  'Whisk matcha; shake with milk and ice; add boba', 100, 2, NULL, NULL, 'Whisk matcha well to prevent clumps',
  1, 5.5, 81.8,
  300, 70, 32, 8, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut', 'soy']::milk_type[], ARRAY['vanilla', 'honey'], ARRAY['tapioca_pearls', 'red_bean', 'coconut_jelly', 'cheese_foam']::boba_topping[], true, true,
  ARRAY['matcha', 'boba', 'fusion', 'japanese', 'taiwanese'], 'Taiwan', 90, false, false
) ON CONFLICT (id) DO NOTHING;

-- Batch 1 complete
