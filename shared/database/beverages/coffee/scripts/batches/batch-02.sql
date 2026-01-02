-- GUDBRO Coffee Batch 2/4
-- Coffees 21 to 40 of 76
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
  'coffee-bounty-coffee', 'bounty-coffee', 'Bounty Coffee', 'Tropical coconut cream meets chocolate and espresso, inspired by the Bounty bar.',
  'coffee_mix', 'iced', 'high', 'sweet',
  ARRAY['espresso', 'coconut cream', 'milk', 'chocolate syrup', 'ice'], '60ml espresso, 20ml coconut cream, 120ml milk, 10ml chocolate syrup, 80g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_COCONUT_CREAM', 'ING_MILK_WHOLE', 'ING_CHOCOLATE_SYRUP', 'ING_ICE'],
  'Tall glass', 400, 'Coconut flakes', 'Chocolate-coconut rim',
  'Shake coconut cream + milk with ice; float espresso', 90, 3, 'Shredded coconut rim',
  0.9, 4.6, 80.4,
  310, 126, 32, 6, 16,
  false, false, true, false, 'whole', ARRAY['milk', 'coconut'],
  ARRAY['whole', 'coconut']::milk_type[], ARRAY['extra chocolate'], true, true, true,
  ARRAY['coconut', 'chocolate', 'tropical', 'bounty'], 75, false, true
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
  'coffee-snickers-coffee', 'snickers-coffee', 'Snickers Coffee', 'Caramel, chocolate, peanut butter and espresso combine for the ultimate candy bar coffee.',
  'coffee_mix', 'hot', 'high', 'very_sweet',
  ARRAY['espresso', 'caramel syrup', 'chocolate syrup', 'peanut butter', 'milk'], '60ml espresso, 15ml caramel, 10ml chocolate, 10g peanut butter, 150ml milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_CARAMEL_SYRUP', 'ING_CHOCOLATE_SYRUP', 'ING_PEANUT_BUTTER', 'ING_MILK_WHOLE'],
  'Tall glass', 400, 'Whipped cream + caramel', 'Crushed peanut rim',
  'Steam milk with syrups + peanut butter; pour over espresso', 100, 3, 'Peanut crunch sprinkle',
  1, 4.8, 79.2,
  380, 126, 42, 10, 18,
  false, false, true, false, 'whole', ARRAY['milk', 'peanuts'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY['extra caramel'], true, true, true,
  ARRAY['peanut', 'caramel', 'chocolate', 'candy-bar'], 78, false, true
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
  'coffee-fantasy-coffee', 'fantasy-coffee', 'Fantasy Coffee', 'Creamy blended coffee with vanilla ice cream and whipped cream.',
  'coffee_mix', 'blended', 'high', 'sweet',
  ARRAY['espresso', 'vanilla ice cream', 'milk', 'whipped cream'], '60ml espresso, 1 scoop ice cream, 100ml milk, 20g cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_VANILLA_ICE_CREAM', 'ING_MILK_WHOLE', 'ING_WHIPPED_CREAM'],
  'Tall glass', 350, 'Whipped cream', 'Chocolate flakes + straw',
  'Blend all; top with whipped cream', 85, 2, 'Serve with straw',
  0.9, 4.5, 80,
  320, 126, 35, 8, 15,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole']::milk_type[], ARRAY['vanilla', 'caramel'], true, true, true,
  ARRAY['blended', 'creamy', 'ice-cream', 'indulgent'], 80, false, false
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
  'coffee-dolce-gusto', 'dolce-gusto', 'Dolce Gusto Coffee', 'Sweet Vietnamese-inspired coffee with condensed milk and cream.',
  'coffee_mix', 'iced', 'high', 'very_sweet',
  ARRAY['espresso', 'condensed milk', 'milk', 'cream'], '60ml espresso, 30ml condensed milk, 100ml milk, 20g cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_CONDENSED_MILK', 'ING_MILK_WHOLE', 'ING_HEAVY_CREAM'],
  'Glass mug', 300, 'Cream top', 'Cream spiral + cocoa dust',
  'Shake milk + condensed, add espresso, finish with cream', 80, 2, 'Sweeter profile',
  0.85, 4.2, 79.8,
  290, 126, 38, 8, 12,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['vietnamese', 'sweet', 'condensed-milk', 'creamy'], 76, false, false
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
  'coffee-black-star', 'black-star', 'Black Star', 'Dramatic black cocoa coffee with vanilla notes, served in a transparent glass.',
  'coffee_mix', 'hot', 'high', 'medium',
  ARRAY['espresso', 'black cocoa powder', 'milk', 'vanilla syrup'], '60ml espresso, 5g black cocoa, 150ml milk, 10ml vanilla', ARRAY['ING_COFFEE_ESPRESSO', 'ING_BLACK_COCOA', 'ING_MILK_WHOLE', 'ING_VANILLA_SYRUP'],
  'Glass mug', 300, 'Cocoa dust', 'Black cocoa stencil',
  'Steam milk with cocoa; add espresso', 90, 2, 'Serve in transparent glass',
  0.9, 4.5, 80,
  200, 126, 18, 8, 8,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY['vanilla'], true, true, true,
  ARRAY['dramatic', 'black-cocoa', 'unique', 'visual'], 72, false, true
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
  'coffee-white-mocha-glace', 'white-mocha-glace', 'White Mocha Glace', 'Frozen white chocolate coffee with ice cream for a dessert-like experience.',
  'coffee_mix', 'blended', 'high', 'very_sweet',
  ARRAY['espresso', 'white chocolate syrup', 'milk', 'ice cream'], '60ml espresso, 20ml white chocolate syrup, 120ml milk, 1 scoop ice cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE', 'ING_VANILLA_ICE_CREAM'],
  'Tall glass', 400, 'Whipped cream', 'White chocolate shards',
  'Blend milk + syrup + ice cream; add espresso', 95, 3, 'Whipped cream optional',
  0.95, 4.7, 79.8,
  380, 126, 48, 9, 16,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole']::milk_type[], ARRAY['extra white chocolate'], true, true, true,
  ARRAY['frozen', 'white-chocolate', 'ice-cream', 'dessert'], 77, false, false
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
  'coffee-coffee-glace', 'coffee-glace', 'Coffee Glace', 'Classic Italian-style coffee served over vanilla ice cream with whipped cream.',
  'coffee_mix', 'layered', 'high', 'sweet',
  ARRAY['espresso', 'vanilla ice cream', 'whipped cream'], '60ml espresso, 1 scoop ice cream, 20g cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_VANILLA_ICE_CREAM', 'ING_WHIPPED_CREAM'],
  'Dessert glass', 250, 'Whipped cream', 'Chocolate shard',
  'Pour espresso over ice cream; top with cream', 70, 2, 'Serve immediately',
  0.85, 4.2, 79.8,
  250, 126, 25, 5, 12,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY['chocolate', 'caramel'], true, false, true,
  ARRAY['italian', 'ice-cream', 'dessert', 'classic'], 78, false, false
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
  'coffee-cookie-coffee', 'cookie-coffee', 'Cookie Coffee', 'Blended cookie crumble coffee with chocolate syrup for cookie lovers.',
  'coffee_mix', 'blended', 'high', 'sweet',
  ARRAY['espresso', 'cookie crumble', 'milk', 'chocolate syrup'], '60ml espresso, 20g cookie, 150ml milk, 15ml syrup', ARRAY['ING_COFFEE_ESPRESSO', 'ING_COOKIE', 'ING_MILK_WHOLE', 'ING_CHOCOLATE_SYRUP'],
  'Tall glass', 350, 'Chocolate drizzle', 'Cookie rim',
  'Blend milk + cookie + syrup; add espresso', 90, 2, 'Cream & crumbs optional',
  0.9, 4.4, 79.5,
  320, 126, 38, 8, 14,
  false, false, false, false, 'whole', ARRAY['milk', 'gluten'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY['extra chocolate'], true, true, true,
  ARRAY['cookie', 'chocolate', 'blended', 'sweet'], 79, false, false
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
  'coffee-iced-creamy-coffee', 'iced-creamy-coffee', 'Iced Creamy Coffee', 'Smooth iced coffee with extra cream for a rich, velvety texture.',
  'coffee_mix', 'iced', 'high', 'lightly_sweet',
  ARRAY['espresso', 'cream', 'milk', 'ice'], '60ml espresso, 40ml cream, 120ml milk, 100g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_HEAVY_CREAM', 'ING_MILK_WHOLE', 'ING_ICE'],
  'Tall glass', 350, 'None', 'Cream float layer',
  'Shake milk + cream with ice; float espresso', 80, 2, 'Sugar to taste',
  0.85, 4.2, 79.8,
  220, 126, 12, 6, 14,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole']::milk_type[], ARRAY['vanilla', 'caramel'], true, true, true,
  ARRAY['creamy', 'iced', 'smooth', 'refreshing'], 74, false, false
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
  'coffee-kinder-white-cream', 'kinder-white-cream', 'Kinder White Cream', 'White chocolate and cream coffee inspired by Kinder white chocolate.',
  'coffee_mix', 'hot', 'high', 'very_sweet',
  ARRAY['espresso', 'white chocolate', 'cream', 'milk'], '60ml espresso, 20g white chocolate, 20g cream, 120ml milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE', 'ING_HEAVY_CREAM', 'ING_MILK_WHOLE'],
  'Glass mug', 300, 'White chocolate drizzle', 'White chocolate curl',
  'Steam milk + chocolate; add espresso; top with cream', 95, 3, 'Serve hot or iced',
  0.95, 4.7, 79.8,
  350, 126, 42, 8, 18,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['white-chocolate', 'creamy', 'sweet', 'premium'], 73, false, true
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
  'coffee-dolce-glace', 'dolce-glace', 'Dolce Glace', 'Sweet dessert coffee combining condensed milk, ice cream, and espresso.',
  'coffee_mix', 'blended', 'high', 'very_sweet',
  ARRAY['espresso', 'condensed milk', 'ice cream', 'milk'], '60ml espresso, 20ml condensed milk, 1 scoop ice cream, 120ml milk', ARRAY['ING_COFFEE_ESPRESSO', 'ING_CONDENSED_MILK', 'ING_VANILLA_ICE_CREAM', 'ING_MILK_WHOLE'],
  'Glass mug', 300, 'Cream top', 'Cocoa dust + wafer',
  'Blend cold ingredients; add espresso', 90, 2, 'Sweet, dessert-like',
  0.9, 4.5, 80,
  340, 126, 45, 8, 14,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['dessert', 'sweet', 'ice-cream', 'condensed-milk'], 75, false, false
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
  'coffee-iced-white-mocha', 'iced-white-mocha', 'Iced White Mocha Coffee', 'Refreshing iced white chocolate coffee shaken and served cold.',
  'coffee_mix', 'iced', 'high', 'very_sweet',
  ARRAY['espresso', 'white chocolate syrup', 'milk', 'ice'], '60ml espresso, 20ml syrup, 150ml milk, 100g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE', 'ING_ICE'],
  'Tall glass', 350, 'None', 'White chocolate drizzle',
  'Shake with ice; pour', 90, 2, 'Optional cream top',
  0.9, 4.5, 80,
  280, 126, 38, 7, 10,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['extra white chocolate'], true, true, true,
  ARRAY['iced', 'white-chocolate', 'refreshing', 'summer'], 80, false, false
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
  'coffee-iced-black-star', 'iced-black-star', 'Iced Black Star Coffee', 'Dramatic iced coffee with black cocoa for a striking dark aesthetic.',
  'coffee_mix', 'iced', 'high', 'medium',
  ARRAY['espresso', 'black cocoa', 'milk', 'ice'], '60ml espresso, 5g black cocoa, 150ml milk, 100g ice', ARRAY['ING_COFFEE_ESPRESSO', 'ING_BLACK_COCOA', 'ING_MILK_WHOLE', 'ING_ICE'],
  'Tall glass', 350, 'Cocoa dust', 'Black cocoa art',
  'Shake milk + cocoa with ice; pour espresso', 90, 2, 'Dark aesthetic',
  0.9, 4.5, 80,
  180, 126, 15, 7, 6,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY['vanilla'], true, true, true,
  ARRAY['iced', 'black-cocoa', 'dramatic', 'unique'], 70, false, true
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
  'coffee-iced-nutella', 'iced-nutella-coffee', 'Iced Nutella Coffee', 'Blended Nutella and espresso over ice with whipped cream topping.',
  'coffee_mix', 'blended', 'high', 'very_sweet',
  ARRAY['espresso', 'nutella', 'milk', 'ice', 'cream'], '60ml espresso, 25g Nutella, 150ml milk, 80g ice, 20g cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_NUTELLA', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
  'Tall glass', 400, 'Whipped cream + Nutella drizzle', 'Hazelnut rim + drizzle',
  'Blend milk + Nutella; add ice; pour espresso; top with cream', 95, 3, 'Use crushed ice',
  0.95, 4.7, 79.8,
  400, 126, 50, 10, 20,
  false, false, false, false, 'whole', ARRAY['milk', 'nuts', 'gluten'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY[]::TEXT[], true, true, true,
  ARRAY['nutella', 'iced', 'indulgent', 'blended'], 86, false, true
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
  'coffee-nutella-frappuccino', 'nutella-frappuccino', 'Nutella Frappuccino', 'Blended Nutella, espresso, ice cream and milk - the ultimate chocolate hazelnut indulgence.',
  'coffee_mix', 'blended', 'high', 'very_sweet',
  ARRAY['nutella', 'espresso', 'ice cream', 'milk'], '25g Nutella, 60ml espresso, 2 scoops ice cream, 150ml milk', ARRAY['ING_NUTELLA', 'ING_COFFEE_ESPRESSO', 'ING_VANILLA_ICE_CREAM', 'ING_MILK_WHOLE'],
  'Tall glass', 450, 'Whipped cream + chocolate drizzle', 'Nutella drizzle + hazelnut crumb',
  'Blend all until smooth', 120, 2, 'Top with whipped cream + drizzle',
  0.95, 4.8, 80.2,
  480, 126, 55, 12, 24,
  false, false, false, false, 'whole', ARRAY['milk', 'nuts', 'gluten'],
  ARRAY['whole']::milk_type[], ARRAY['extra chocolate'], true, true, true,
  ARRAY['frappuccino', 'nutella', 'blended', 'indulgent', 'dessert'], 88, false, true
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
  'coffee-caramel-frappuccino', 'caramel-frappuccino', 'Caramel Frappuccino', 'Classic blended coffee drink with caramel syrup, ice, and whipped cream.',
  'coffee_mix', 'blended', 'high', 'sweet',
  ARRAY['espresso', 'caramel syrup', 'milk', 'ice', 'cream'], '60ml espresso, 15ml caramel, 150ml milk, 100g ice, 20g cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_CARAMEL_SYRUP', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
  'Tall glass', 450, 'Whipped cream + caramel', 'Caramel lattice art',
  'Blend all ingredients', 120, 2, 'Caramel drizzle',
  0.9, 4.6, 80.4,
  350, 126, 42, 8, 14,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['extra caramel', 'vanilla'], true, true, true,
  ARRAY['frappuccino', 'caramel', 'blended', 'classic'], 90, false, false
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
  'coffee-coffee-frappuccino', 'coffee-frappuccino', 'Coffee Frappuccino', 'The original blended coffee drink with espresso, milk, ice cream and a hint of sugar.',
  'coffee_mix', 'blended', 'high', 'medium',
  ARRAY['espresso', 'milk', 'ice', 'ice cream', 'sugar'], '60ml espresso, 120ml milk, 100g ice, 1 scoop ice cream, 10g sugar', ARRAY['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_VANILLA_ICE_CREAM', 'ING_SUGAR'],
  'Tall glass', 450, 'Whipped cream + syrup drizzle', 'Chocolate drizzle + cocoa dust',
  'Blend until frothy', 120, 2, 'Add chocolate syrup optionally',
  0.85, 4.3, 80.2,
  300, 126, 32, 8, 12,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['vanilla', 'caramel', 'mocha'], true, true, true,
  ARRAY['frappuccino', 'classic', 'blended', 'coffee'], 92, false, false
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
  'coffee-mocha-frappuccino', 'mocha-frappuccino', 'Mocha Frappuccino', 'Rich chocolate and espresso blended with ice and topped with whipped cream.',
  'coffee_mix', 'blended', 'high', 'sweet',
  ARRAY['espresso', 'chocolate syrup', 'milk', 'ice', 'whipped cream'], '60ml espresso, 20ml chocolate syrup, 150ml milk, 100g ice, 20g cream', ARRAY['ING_COFFEE_ESPRESSO', 'ING_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
  'Tall glass', 450, 'Whipped cream + chocolate drizzle', 'Chocolate shards + cocoa dust',
  'Blend espresso, chocolate, milk and ice; top with cream', 120, 2, 'Double chocolate drizzle',
  0.9, 4.6, 80.4,
  380, 126, 45, 9, 16,
  false, false, true, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['extra chocolate', 'white chocolate'], true, true, true,
  ARRAY['frappuccino', 'mocha', 'chocolate', 'blended'], 88, false, false
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
  'coffee-cold-brew-classic', 'cold-brew-classic', 'Cold Brew (Classic)', 'Smooth, low-acidity coffee steeped for 12-24 hours and served over ice.',
  'cold_brew', 'iced', 'very_high', 'unsweetened',
  ARRAY['cold brew coffee', 'ice'], '200ml cold brew, 100g ice', ARRAY['ING_COFFEE_COLD_BREW', 'ING_ICE'],
  'Tall glass', 350, 'None', 'Coffee beans garnish',
  'Pour cold brew over ice', 30, 1, 'Steep 12-24 hours',
  0.6, 3.5, 82.9,
  5, 200, NULL, 0.3, NULL,
  true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'oat', 'almond']::milk_type[], ARRAY['vanilla', 'caramel'], false, true, false,
  ARRAY['cold-brew', 'smooth', 'strong', 'low-acid'], 85, false, false
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
  'coffee-cold-brew-vanilla', 'cold-brew-vanilla', 'Vanilla Cold Brew', 'Classic cold brew enhanced with vanilla syrup and a splash of cream.',
  'cold_brew', 'iced', 'very_high', 'medium',
  ARRAY['cold brew coffee', 'vanilla syrup', 'cream', 'ice'], '200ml cold brew, 15ml vanilla, 30ml cream, 100g ice', ARRAY['ING_COFFEE_COLD_BREW', 'ING_VANILLA_SYRUP', 'ING_HEAVY_CREAM', 'ING_ICE'],
  'Tall glass', 400, 'Cream swirl', 'Vanilla bean pod',
  'Pour cold brew over ice; add syrup; top with cream', 45, 1, 'Float cream on top',
  0.8, 4.2, 81,
  120, 200, 18, 2, 8,
  false, false, true, false, 'none', ARRAY['milk'],
  ARRAY['none', 'oat']::milk_type[], ARRAY['extra vanilla', 'caramel'], false, true, false,
  ARRAY['cold-brew', 'vanilla', 'creamy', 'smooth'], 82, false, false
) ON CONFLICT (id) DO NOTHING;

-- Batch 2 complete
