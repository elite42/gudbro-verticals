-- GUDBRO Coffee Batch 3/4
-- Coffees 41 to 60 of 76
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
  'coffee-nitro-cold-brew', 'nitro-cold-brew', 'Nitro Cold Brew', 'Cold brew infused with nitrogen for a creamy, Guinness-like texture without dairy.',
  'cold_brew', 'iced', 'very_high', 'unsweetened',
  ARRAY['cold brew coffee', 'nitrogen'], '300ml nitro cold brew', ARRAY['ING_COFFEE_COLD_BREW'],
  'Tall glass', 350, 'None', 'Cascading effect visible',
  'Dispense from nitro tap', 20, 1, 'Serve without ice',
  0.7, 4.5, 84.4,
  5, 200, NULL, 0.3, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['vanilla', 'caramel'], false, true, false,
  ARRAY['nitro', 'cold-brew', 'creamy', 'vegan'], 78, false, true
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
  'coffee-cold-brew-oat-milk', 'cold-brew-oat-milk', 'Oat Milk Cold Brew', 'Smooth cold brew paired with creamy oat milk for a vegan-friendly option.',
  'cold_brew', 'iced', 'very_high', 'lightly_sweet',
  ARRAY['cold brew coffee', 'oat milk', 'ice'], '150ml cold brew, 100ml oat milk, 100g ice', ARRAY['ING_COFFEE_COLD_BREW', 'ING_MILK_OAT', 'ING_ICE'],
  'Tall glass', 400, 'None', 'Oat flakes garnish',
  'Pour cold brew and oat milk over ice', 30, 1, 'Naturally sweet from oat milk',
  0.85, 4.5, 81.1,
  80, 180, 8, 2, 3,
  true, true, false, false, 'oat', ARRAY['gluten'],
  ARRAY['oat']::milk_type[], ARRAY['vanilla', 'caramel'], false, true, false,
  ARRAY['cold-brew', 'oat-milk', 'vegan', 'dairy-free'], 80, false, false
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
  'coffee-pour-over', 'pour-over', 'Pour Over Coffee', 'Hand-crafted filter coffee highlighting single-origin bean characteristics.',
  'filter_coffee', 'hot', 'high', 'unsweetened',
  ARRAY['filter coffee'], '15g coffee, 250ml water', ARRAY['ING_COFFEE_FILTER'],
  'Ceramic mug', 300, 'None', 'Serve with origin card',
  'Bloom 30s, pour in circles, 3-4 min total', 240, 3, 'Water at 92-96C',
  0.5, 3.8, 86.8,
  5, 120, NULL, 0.3, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, false, true,
  ARRAY['specialty', 'pour-over', 'single-origin', 'artisan'], 70, false, false
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
  'coffee-french-press', 'french-press', 'French Press Coffee', 'Full-bodied immersion coffee with rich oils and deep flavor.',
  'filter_coffee', 'hot', 'high', 'unsweetened',
  ARRAY['coarse ground coffee'], '30g coffee, 500ml water (serves 2)', ARRAY['ING_COFFEE_FILTER'],
  'Ceramic mug', 250, 'None', 'Serve with French press at table',
  'Steep 4 min, press slowly', 300, 2, 'Coarse grind essential',
  0.45, 3.5, 87.1,
  5, 100, NULL, 0.3, 0.1,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, false, true,
  ARRAY['french-press', 'full-bodied', 'classic', 'immersion'], 68, false, false
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
  'coffee-aeropress', 'aeropress', 'AeroPress Coffee', 'Clean, bright coffee with pressure extraction - smooth and versatile.',
  'filter_coffee', 'hot', 'high', 'unsweetened',
  ARRAY['fine ground coffee'], '17g coffee, 220ml water', ARRAY['ING_COFFEE_FILTER'],
  'Ceramic mug', 250, 'None', 'Serve with recipe card',
  'Inverted method, 1:30 steep, press 30s', 150, 2, 'Fine to medium grind',
  0.45, 3.5, 87.1,
  5, 110, NULL, 0.3, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, false, true,
  ARRAY['aeropress', 'clean', 'bright', 'versatile'], 65, false, false
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
  'coffee-chemex', 'chemex', 'Chemex Pour Over', 'Elegant pour over with thick paper filter producing exceptionally clean, bright coffee.',
  'filter_coffee', 'hot', 'high', 'unsweetened',
  ARRAY['medium-coarse ground coffee'], '42g coffee, 700ml water (serves 2-3)', ARRAY['ING_COFFEE_FILTER'],
  'Chemex carafe', 300, 'None', 'Table-side pour service',
  'Bloom, spiral pour in stages, 4-5 min total', 300, 3, 'Use Chemex-specific filters',
  0.55, 4, 86.3,
  5, 115, NULL, 0.3, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, false, true,
  ARRAY['chemex', 'pour-over', 'clean', 'elegant'], 62, false, false
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
  'coffee-ca-phe-trung', 'ca-phe-trung', 'Vietnamese Egg Coffee (Ca Phe Trung)', 'Iconic Hanoi specialty featuring strong Vietnamese coffee topped with a rich, creamy whipped egg yolk foam. Tastes like liquid tiramisu.',
  'specialty', 'hot', 'high', 'sweet',
  ARRAY['vietnamese coffee', 'egg yolk', 'condensed milk', 'sugar'], '60ml strong coffee, 2 egg yolks, 30ml condensed milk, 10g sugar', ARRAY['ING_COFFEE_VIETNAMESE', 'ING_EGG_YOLK', 'ING_CONDENSED_MILK', 'ING_SUGAR'],
  'Small ceramic cup in hot water bath', 150, 'Dusted cocoa', 'Served in hot water bath with cocoa dust pattern',
  'Brew strong coffee with phin filter. Whisk egg yolks with condensed milk and sugar until thick and creamy (5+ minutes). Pour coffee into cup, top with egg cream.', 300, 3, 'Add vanilla or rum to reduce eggy taste. Keep egg cream warm in water bath.',
  0.75, 4.5, 83.3,
  220, 150, 25, 5, 10,
  false, false, true, false, 'none', ARRAY['eggs', 'milk'],
  ARRAY['none']::milk_type[], ARRAY['vanilla'], false, true, false,
  ARRAY['vietnamese', 'egg-coffee', 'hanoi', 'iconic', 'creamy', 'dessert-coffee'], 88, false, true
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
  'coffee-ca-phe-dua', 'ca-phe-dua', 'Vietnamese Coconut Coffee (Ca Phe Dua)', 'Creamy tropical blend of robust Vietnamese coffee with coconut milk and condensed milk, creating a smooth, sweet iced drink.',
  'specialty', 'iced', 'high', 'sweet',
  ARRAY['vietnamese coffee', 'coconut milk', 'condensed milk', 'ice'], '60ml strong coffee, 100ml coconut milk, 20ml condensed milk, 100g ice', ARRAY['ING_COFFEE_VIETNAMESE', 'ING_MILK_COCONUT', 'ING_CONDENSED_MILK', 'ING_ICE'],
  'Tall glass', 350, 'Coconut shavings', 'Layered presentation with toasted coconut',
  'Blend coconut milk with condensed milk and ice until smooth. Shake coffee vigorously until foamy. Layer coconut mixture, then pour coffee on top.', 120, 2, 'Use fresh coconut milk for best results. Can add coconut cream for extra richness.',
  0.85, 4.8, 82.3,
  280, 150, 28, 3, 16,
  false, false, true, false, 'coconut', ARRAY['milk', 'coconut'],
  ARRAY['coconut']::milk_type[], ARRAY[]::TEXT[], false, true, false,
  ARRAY['vietnamese', 'coconut', 'tropical', 'iced', 'creamy'], 85, false, true
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
  'coffee-ca-phe-muoi', 'ca-phe-muoi', 'Vietnamese Salt Coffee (Ca Phe Muoi)', 'Trending Hue specialty combining robust coffee with salted cream foam. The salt enhances sweetness and mellows bitterness, creating a salted caramel-like experience.',
  'specialty', 'layered', 'high', 'medium',
  ARRAY['vietnamese coffee', 'condensed milk', 'cream', 'sea salt'], '60ml strong coffee, 20ml condensed milk, 40ml cream, 1/4 tsp sea salt', ARRAY['ING_COFFEE_VIETNAMESE', 'ING_CONDENSED_MILK', 'ING_HEAVY_CREAM', 'ING_SEA_SALT'],
  'Glass cup', 200, 'Salted cream cap', 'Three-layer presentation with flaky sea salt',
  'Layer condensed milk at bottom. Add coffee in middle. Whip cream with sea salt until thick peaks. Spoon salted cream on top. Stir before drinking.', 150, 2, 'Salt brings out the coffee flavor and balances bitterness. Can serve hot or iced.',
  0.7, 4.2, 83.3,
  200, 150, 20, 2, 12,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, true, false,
  ARRAY['vietnamese', 'salt-coffee', 'hue', 'trending', 'salted-caramel'], 82, false, true
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
  'coffee-sua-chua-ca-phe', 'sua-chua-ca-phe', 'Vietnamese Yogurt Coffee (Sua Chua Ca Phe)', 'Unique Vietnamese creation blending tangy yogurt with bold coffee, creating a probiotic-rich, creamy beverage.',
  'specialty', 'iced', 'high', 'medium',
  ARRAY['vietnamese coffee', 'yogurt', 'condensed milk', 'ice'], '60ml strong coffee, 100g yogurt, 15ml condensed milk, 80g ice', ARRAY['ING_COFFEE_VIETNAMESE', 'ING_YOGURT', 'ING_CONDENSED_MILK', 'ING_ICE'],
  'Tall glass', 350, 'None', 'Layered with coffee drizzle',
  'Mix yogurt with condensed milk and ice. Blend until smooth. Pour into glass, then float coffee on top.', 90, 1, 'Use thick Greek-style yogurt for best texture. The tanginess complements the bitter coffee.',
  0.75, 4, 81.3,
  220, 150, 22, 8, 6,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, true, false,
  ARRAY['vietnamese', 'yogurt', 'probiotic', 'unique', 'healthy'], 72, false, false
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
  'coffee-ca-phe-sua-da', 'ca-phe-sua-da', 'Vietnamese Iced Coffee (Ca Phe Sua Da)', 'The classic Vietnamese iced coffee - strong dark roast dripped through a phin filter over sweetened condensed milk and ice.',
  'specialty', 'iced', 'very_high', 'sweet',
  ARRAY['vietnamese coffee', 'condensed milk', 'ice'], '60ml strong coffee, 30ml condensed milk, 150g ice', ARRAY['ING_COFFEE_VIETNAMESE', 'ING_CONDENSED_MILK', 'ING_ICE'],
  'Tall glass with phin filter', 300, 'Served with phin', 'Traditional phin presentation on glass',
  'Add condensed milk to glass. Place phin filter on top, add coffee, tamp lightly. Add hot water, let drip 4-5 minutes. Add ice, stir.', 300, 2, 'Use coarse-ground robusta for authentic flavor. Phin drip is essential for proper extraction.',
  0.55, 3.5, 84.3,
  180, 200, 25, 3, 4,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, true, false,
  ARRAY['vietnamese', 'classic', 'iced', 'phin-filter', 'robusta'], 92, false, false
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
  'coffee-bac-xiu', 'bac-xiu', 'Bac Xiu (White Coffee)', 'Southern Vietnamese style coffee with more condensed milk than coffee, creating a sweeter, creamier drink. Popular breakfast choice.',
  'specialty', 'hot', 'medium', 'very_sweet',
  ARRAY['vietnamese coffee', 'condensed milk', 'fresh milk'], '30ml coffee, 40ml condensed milk, 100ml fresh milk', ARRAY['ING_COFFEE_VIETNAMESE', 'ING_CONDENSED_MILK', 'ING_MILK_WHOLE'],
  'Glass cup', 200, 'None', 'Served in traditional glass',
  'Mix condensed milk with warm fresh milk. Add a small amount of strong coffee. Stir well.', 60, 1, 'Ratio is typically 1 part coffee to 3 parts milk mixture. Very sweet and mild.',
  0.5, 3, 83.3,
  200, 50, 30, 5, 6,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole']::milk_type[], ARRAY[]::TEXT[], true, true, false,
  ARRAY['vietnamese', 'sweet', 'milky', 'breakfast', 'saigon'], 70, false, false
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
  'coffee-dalgona', 'dalgona-coffee', 'Dalgona Coffee', 'Viral Korean whipped coffee featuring a thick, creamy foam of instant coffee, sugar, and water over cold milk. TikTok sensation of 2020.',
  'specialty', 'iced', 'high', 'sweet',
  ARRAY['instant coffee', 'sugar', 'hot water', 'milk'], '2 tbsp instant coffee, 2 tbsp sugar, 2 tbsp hot water, 200ml milk', ARRAY['ING_COFFEE_INSTANT', 'ING_SUGAR', 'ING_WATER', 'ING_MILK_WHOLE'],
  'Clear tall glass', 350, 'Whipped coffee on top', 'Instagrammable layers with cocoa dust',
  'Whip instant coffee, sugar, and hot water until thick and creamy (3-5 minutes by hand, 1 minute with mixer). Fill glass with ice and milk. Spoon whipped coffee on top.', 180, 1, 'Must use instant coffee - espresso will not whip. Equal ratios are key.',
  0.45, 4, 88.8,
  180, 95, 25, 7, 5,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut']::milk_type[], ARRAY['vanilla', 'caramel'], false, true, true,
  ARRAY['korean', 'viral', 'whipped', 'tiktok', 'instagram', 'trending'], 88, false, false
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
  'coffee-bulletproof', 'bulletproof-coffee', 'Bulletproof Coffee', 'Keto-friendly coffee blended with grass-fed butter and MCT oil. Provides sustained energy and mental clarity. Popular biohacking drink.',
  'specialty', 'hot', 'high', 'unsweetened',
  ARRAY['brewed coffee', 'grass-fed butter', 'mct oil'], '250ml black coffee, 15g grass-fed butter, 15ml MCT oil', ARRAY['ING_COFFEE_FILTER', 'ING_BUTTER_GRASSFED', 'ING_MCT_OIL'],
  'Large ceramic mug', 350, 'None', 'Frothy top from blending',
  'Brew fresh coffee. Add to blender with butter and MCT oil. Blend 20-30 seconds until frothy and creamy like a latte.', 120, 1, 'Must blend - stirring will not emulsify properly. Start with less MCT oil to avoid digestive issues.',
  1.2, 5.5, 78.2,
  250, 120, NULL, 0.5, 28,
  false, false, true, true, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], true, false, true,
  ARRAY['keto', 'biohacking', 'bulletproof', 'butter-coffee', 'wellness', 'energy'], 75, false, false
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
  'coffee-cloud-coffee', 'cloud-coffee', 'Cloud Coffee', 'Newest TikTok trend - ethereal layered drink with coconut water, espresso, and whipped cream creating a dreamy, cloud-like effect.',
  'specialty', 'iced', 'high', 'lightly_sweet',
  ARRAY['espresso', 'coconut water', 'heavy cream', 'ice'], '60ml espresso, 150ml coconut water, 50ml heavy cream, 100g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_COCONUT_WATER', 'ING_HEAVY_CREAM', 'ING_ICE'],
  'Tall clear glass', 400, 'Cream cloud on top', 'Dramatic cream cloud with espresso pour',
  'Fill glass with ice and coconut water. Whip cream until fluffy. Float whipped cream on top like a cloud. Slowly pour espresso through the cream.', 120, 2, 'The espresso should cascade through the cream creating visual effect. Very refreshing and tropical.',
  0.95, 5, 81,
  180, 126, 12, 2, 14,
  false, false, true, false, 'none', ARRAY['milk', 'coconut'],
  ARRAY['none']::milk_type[], ARRAY['vanilla'], true, true, true,
  ARRAY['trending', 'tiktok', 'cloud', 'aesthetic', 'tropical', 'coconut'], 78, false, true
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
  'coffee-mushroom-coffee', 'mushroom-coffee', 'Mushroom Coffee', 'Adaptogenic coffee blended with medicinal mushrooms like lions mane, chaga, and reishi. Promotes focus without jitters.',
  'specialty', 'hot', 'medium', 'unsweetened',
  ARRAY['coffee', 'lions mane extract', 'chaga extract', 'reishi extract'], '200ml coffee, 1g lions mane, 0.5g chaga, 0.5g reishi', ARRAY['ING_COFFEE_FILTER', 'ING_LIONS_MANE', 'ING_CHAGA', 'ING_REISHI'],
  'Ceramic mug', 250, 'None', 'Served with mushroom info card',
  'Brew coffee normally. Stir in mushroom extracts until dissolved. Can add honey or coconut milk if desired.', 90, 1, 'Use high-quality mushroom extracts. Lions mane for focus, reishi for calm, chaga for immunity.',
  1.5, 6, 75,
  10, 80, NULL, 0.5, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['oat', 'coconut', 'almond']::milk_type[], ARRAY['honey'], true, true, true,
  ARRAY['adaptogenic', 'mushroom', 'wellness', 'focus', 'functional', 'biohacking'], 72, false, false
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
  'coffee-proffee', 'proffee', 'Proffee (Protein Coffee)', 'Gym-goers favorite - cold brew or iced coffee mixed with protein shake for post-workout recovery and caffeine boost.',
  'specialty', 'iced', 'high', 'lightly_sweet',
  ARRAY['cold brew coffee', 'protein powder', 'milk', 'ice'], '150ml cold brew, 30g protein powder, 100ml milk, 100g ice', ARRAY['ING_COFFEE_COLD_BREW', 'ING_PROTEIN_POWDER', 'ING_MILK_WHOLE', 'ING_ICE'],
  'Shaker bottle or tall glass', 450, 'None', 'Served in gym-style shaker',
  'Add cold brew, protein powder, milk, and ice to shaker. Shake vigorously until protein is dissolved. Pour over ice.', 60, 1, 'Use vanilla or chocolate protein for best taste. Cold brew works better than hot coffee with protein.',
  1.3, 5.5, 76.4,
  200, 180, 8, 25, 3,
  false, false, true, false, 'whole', ARRAY['milk', 'soy'],
  ARRAY['whole', 'almond', 'oat']::milk_type[], ARRAY[]::TEXT[], true, true, false,
  ARRAY['protein', 'fitness', 'gym', 'post-workout', 'functional', 'healthy'], 76, false, false
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
  'coffee-turkish', 'turkish-coffee', 'Turkish Coffee (Turk Kahvesi)', 'Unfiltered coffee brewed in a cezve with finely ground beans. Rich, thick, with foam (kaymak) and grounds settling at bottom. UNESCO cultural heritage.',
  'filter_coffee', 'hot', 'very_high', 'unsweetened',
  ARRAY['extra-fine ground coffee', 'water', 'sugar'], '7g extra-fine coffee, 60ml water, sugar to taste', ARRAY['ING_COFFEE_TURKISH', 'ING_WATER', 'ING_SUGAR'],
  'Demitasse cup (fincan)', 60, 'Served with lokum (Turkish delight)', 'Traditional copper cezve presentation with water and lokum',
  'Combine coffee, water, and sugar in cezve. Heat slowly, stirring. When foam rises, remove from heat. Repeat 2-3 times. Pour slowly, preserving foam.', 180, 3, 'Never stir after pouring. Wait for grounds to settle. Fortune telling from grounds is tradition.',
  0.4, 3.5, 88.6,
  5, 65, NULL, 0.1, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, true, false,
  ARRAY['turkish', 'traditional', 'unfiltered', 'cezve', 'unesco', 'ceremonial'], 80, false, false
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
  'coffee-greek', 'greek-coffee', 'Greek Coffee (Ellinikos Kafes)', 'Similar to Turkish coffee but with Greek heritage. Brewed in briki, served in small cups. Essential to Greek cafe culture.',
  'filter_coffee', 'hot', 'very_high', 'unsweetened',
  ARRAY['finely ground coffee', 'water', 'sugar'], '7g fine coffee, 60ml water, sugar optional', ARRAY['ING_COFFEE_GREEK', 'ING_WATER', 'ING_SUGAR'],
  'Small cup (demitasse)', 60, 'Glass of cold water on side', 'Briki presentation with cold water',
  'Sketos (no sugar), Metrios (medium), or Glykos (sweet). Combine in briki, heat until foam rises, pour preserving kaimaki (foam).', 180, 3, 'Good kaimaki is sign of well-made coffee. Drink water first to cleanse palate.',
  0.35, 3, 88.3,
  5, 65, NULL, 0.1, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, true, false,
  ARRAY['greek', 'traditional', 'briki', 'mediterranean', 'ceremonial'], 75, false, false
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
  'coffee-arabic-cardamom', 'arabic-cardamom-coffee', 'Arabic Coffee with Cardamom (Qahwa)', 'Lightly roasted Arabic coffee brewed with cardamom, sometimes saffron. Symbol of hospitality across the Gulf and Middle East.',
  'filter_coffee', 'hot', 'medium', 'unsweetened',
  ARRAY['arabic coffee', 'cardamom', 'saffron', 'water'], '20g light roast coffee, 5 cardamom pods, pinch saffron, 500ml water', ARRAY['ING_COFFEE_ARABIC', 'ING_CARDAMOM', 'ING_SAFFRON', 'ING_WATER'],
  'Small handleless cup (finjaan)', 50, 'Served with dates', 'Traditional dallah pot with dates and saffron garnish',
  'Boil water, add coffee and cardamom, simmer 10 minutes. Add saffron. Let settle, pour from height into small cups. Serve with dates.', 600, 2, 'Light roast is traditional. Always serve to elders first. Refill cups until guest tilts cup side to side.',
  0.8, 4, 80,
  3, 40, NULL, 0.1, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], false, false, false,
  ARRAY['arabic', 'middle-eastern', 'cardamom', 'saffron', 'ceremonial', 'hospitality'], 70, false, false
) ON CONFLICT (id) DO NOTHING;

-- Batch 3 complete
