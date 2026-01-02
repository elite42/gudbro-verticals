-- GUDBRO Tea & Infusions Batch 4/5
-- Teas 46 to 60 of 62
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
  'tea-pumpkin-spice-chai', 'pumpkin-spice-chai', 'Pumpkin Spice Chai Latte', 'Autumn favorite combining chai spices with pumpkin puree and warm spices.',
  'chai', 'hot', 'medium', 'sweet',
  ARRAY['chai concentrate', 'pumpkin puree', 'milk', 'pumpkin spice'], '100ml chai, 30ml pumpkin puree, 180ml milk, pumpkin spice', ARRAY['ING_CHAI_CONCENTRATE', 'ING_PUMPKIN_PUREE', 'ING_MILK_WHOLE', 'ING_PUMPKIN_SPICE'],
  NULL, ARRAY[]::boba_topping[],
  'Glass mug', 380, 'Whipped cream + cinnamon', 'Cream + pumpkin pie spice + cinnamon stick',
  'Blend chai with pumpkin; add steamed milk; top with cream', 150, 2, NULL, NULL, 'Seasonal autumn drink',
  0.9, 5.2, 82.7,
  280, 50, 38, 8, 10,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['extra pumpkin', 'vanilla'], ARRAY[]::boba_topping[], true, false,
  ARRAY['pumpkin', 'autumn', 'seasonal', 'spiced', 'cozy'], 'USA', 88, true, true
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
  'tea-chai-tea-pure', 'chai-tea-black', 'Chai Tea (No Milk)', 'Traditional spiced tea served black, lighter and more aromatic.',
  'chai', 'hot', 'medium', 'lightly_sweet',
  ARRAY['black tea', 'ginger', 'cardamom', 'cinnamon', 'cloves'], '3g tea, 250ml water, spice blend', ARRAY['ING_TEA_BLACK', 'ING_GINGER', 'ING_CARDAMOM', 'ING_CINNAMON', 'ING_CLOVES'],
  NULL, ARRAY[]::boba_topping[],
  'Teacup', 250, 'Cinnamon stick', 'Whole spices visible + honey pot',
  'Simmer spices in water; add tea; strain', 240, 2, 300, 100, 'Dairy-free option',
  0.35, 3, 88.3,
  10, 50, 2, NULL, NULL,
  true, true, true, false, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'oat', 'coconut']::milk_type[], ARRAY['honey', 'agave'], ARRAY[]::boba_topping[], true, false,
  ARRAY['chai', 'black', 'spiced', 'dairy-free', 'vegan-option'], 'India', 70, false, false
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
  'tea-turmeric-chai', 'turmeric-chai-latte', 'Turmeric Chai Latte (Golden Chai)', 'Anti-inflammatory golden latte meets chai spices for a wellness-focused drink.',
  'chai', 'hot', 'medium', 'medium',
  ARRAY['chai concentrate', 'turmeric', 'ginger', 'milk', 'black pepper'], '100ml chai, 1tsp turmeric, 180ml milk, pinch black pepper', ARRAY['ING_CHAI_CONCENTRATE', 'ING_TURMERIC', 'ING_GINGER', 'ING_MILK_WHOLE', 'ING_BLACK_PEPPER'],
  NULL, ARRAY[]::boba_topping[],
  'Ceramic mug', 350, 'Turmeric dust', 'Golden foam + cinnamon stick + turmeric root slice',
  'Heat chai with turmeric paste; add steamed milk', 150, 2, NULL, NULL, 'Black pepper aids turmeric absorption',
  0.8, 4.8, 83.3,
  160, 50, 18, 7, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'coconut', 'almond']::milk_type[], ARRAY['honey', 'maple'], ARRAY[]::boba_topping[], true, false,
  ARRAY['turmeric', 'golden', 'wellness', 'anti-inflammatory', 'chai'], 'India', 75, false, true
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
  'tea-chamomile', 'chamomile', 'Chamomile', 'Gentle floral herbal tea known for its calming properties and honey-like sweetness.',
  'herbal_infusion', 'hot', 'none', 'unsweetened',
  ARRAY['dried chamomile flowers'], '2g chamomile flowers, 250ml water', ARRAY['ING_CHAMOMILE'],
  NULL, ARRAY[]::boba_topping[],
  'Clear glass mug', 250, 'Honey pot on side', 'Visible floating flowers + raw honey',
  'Steep flowers in hot water; cover while steeping', 60, 1, 300, 95, 'Cover to keep essential oils',
  0.3, 3, 90,
  2, NULL, NULL, NULL, NULL,
  true, true, true, true, true, 'none', ARRAY['ragweed'],
  ARRAY['none']::milk_type[], ARRAY['honey', 'lavender'], ARRAY[]::boba_topping[], true, false,
  ARRAY['calming', 'bedtime', 'floral', 'caffeine-free', 'relaxing'], 'Egypt', 88, false, false
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
  'tea-peppermint', 'peppermint', 'Peppermint', 'Refreshing and cooling mint tea that aids digestion and clears the mind.',
  'herbal_infusion', 'hot', 'none', 'unsweetened',
  ARRAY['dried peppermint leaves'], '2g peppermint, 250ml water', ARRAY['ING_PEPPERMINT'],
  NULL, ARRAY[]::boba_topping[],
  'Glass mug', 250, 'Fresh mint leaf', 'Fresh mint sprig + clear glass',
  'Steep in hot water', 60, 1, 300, 100, 'Great hot or iced',
  0.25, 2.8, 91.1,
  2, NULL, NULL, NULL, NULL,
  true, true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey'], ARRAY[]::boba_topping[], true, true,
  ARRAY['mint', 'refreshing', 'digestive', 'caffeine-free', 'cooling'], 'Mediterranean', 90, false, false
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
  'tea-ginger', 'ginger-tea', 'Ginger Tea', 'Spicy and warming ginger root tea that soothes the stomach and boosts immunity.',
  'herbal_infusion', 'hot', 'none', 'unsweetened',
  ARRAY['fresh ginger root', 'lemon', 'honey'], '20g fresh ginger, 250ml water, lemon wedge', ARRAY['ING_GINGER', 'ING_LEMON', 'ING_HONEY'],
  NULL, ARRAY[]::boba_topping[],
  'Glass mug', 300, 'Lemon slice', 'Fresh ginger slice visible + lemon wheel + honey',
  'Slice ginger; simmer in water 10-15 min; add lemon', 600, 2, 600, 100, 'Fresh ginger is more potent',
  0.4, 3.2, 87.5,
  10, NULL, NULL, NULL, NULL,
  true, true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey', 'agave'], ARRAY[]::boba_topping[], true, false,
  ARRAY['ginger', 'warming', 'immunity', 'digestive', 'caffeine-free'], 'Asia', 85, false, false
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
  'tea-lemon-ginger', 'lemon-ginger', 'Lemon Ginger Tea', 'Zesty lemon and spicy ginger combination, perfect for cold days and sore throats.',
  'herbal_infusion', 'hot', 'none', 'lightly_sweet',
  ARRAY['fresh ginger', 'lemon juice', 'honey'], '15g ginger, 1 lemon, 15ml honey, 300ml water', ARRAY['ING_GINGER', 'ING_LEMON', 'ING_HONEY'],
  NULL, ARRAY[]::boba_topping[],
  'Glass mug', 300, 'Lemon slice + ginger', 'Whole lemon slice + ginger coins + honey drizzle',
  'Steep ginger; add lemon juice and honey', 300, 1, 480, 100, 'Add lemon after steeping to preserve vitamins',
  0.5, 3.5, 85.7,
  40, NULL, 10, NULL, NULL,
  true, true, true, false, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['extra honey', 'agave'], ARRAY[]::boba_topping[], true, false,
  ARRAY['lemon', 'ginger', 'cold-remedy', 'immunity', 'vitamin-c'], 'Global', 88, false, false
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
  'tea-hibiscus', 'hibiscus', 'Hibiscus Tea', 'Vibrant ruby-red herbal tea with tart, cranberry-like flavor and high antioxidants.',
  'herbal_infusion', 'hot', 'none', 'unsweetened',
  ARRAY['dried hibiscus flowers'], '3g hibiscus flowers, 250ml water', ARRAY['ING_HIBISCUS'],
  NULL, ARRAY[]::boba_topping[],
  'Clear glass', 250, 'Hibiscus petal', 'Deep red color showcase + dried hibiscus garnish',
  'Steep in hot water; enjoy hot or iced', 60, 1, 300, 100, 'Naturally tart - sweeten to taste',
  0.35, 3, 88.3,
  5, NULL, NULL, NULL, NULL,
  true, true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey', 'agave', 'simple syrup'], ARRAY[]::boba_topping[], true, true,
  ARRAY['hibiscus', 'antioxidant', 'tart', 'ruby', 'caffeine-free'], 'Africa', 78, false, false
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
  'tea-rooibos', 'rooibos', 'Rooibos (Red Bush Tea)', 'South African herbal tea with naturally sweet, nutty flavor and no caffeine.',
  'herbal_infusion', 'hot', 'none', 'lightly_sweet',
  ARRAY['rooibos leaves'], '3g rooibos, 250ml water', ARRAY['ING_ROOIBOS'],
  NULL, ARRAY[]::boba_topping[],
  'Ceramic mug', 250, 'None', 'Reddish amber color + honey pot',
  'Steep in hot water; can use boiling water', 60, 1, 360, 100, 'Cannot oversteep - never bitter',
  0.35, 3, 88.3,
  2, NULL, NULL, NULL, NULL,
  true, true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'whole', 'oat']::milk_type[], ARRAY['honey', 'vanilla'], ARRAY[]::boba_topping[], true, false,
  ARRAY['rooibos', 'south-african', 'caffeine-free', 'nutty', 'antioxidant'], 'South Africa', 75, false, false
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
  'tea-rooibos-latte', 'rooibos-latte', 'Rooibos Latte (Red Latte)', 'Creamy latte made with rooibos tea, caffeine-free alternative to coffee.',
  'herbal_infusion', 'hot', 'none', 'lightly_sweet',
  ARRAY['rooibos tea', 'steamed milk', 'honey'], '150ml strong rooibos, 150ml steamed milk', ARRAY['ING_ROOIBOS', 'ING_MILK_WHOLE', 'ING_HONEY'],
  NULL, ARRAY[]::boba_topping[],
  'Latte glass', 350, 'Honey drizzle', 'Foam art + cinnamon dust',
  'Brew strong rooibos; add steamed milk', 120, 2, 420, 100, 'Brew stronger than usual for latte',
  0.6, 4, 85,
  120, NULL, 12, 6, 5,
  false, false, true, false, true, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut']::milk_type[], ARRAY['honey', 'vanilla', 'cinnamon'], ARRAY[]::boba_topping[], true, false,
  ARRAY['rooibos', 'latte', 'caffeine-free', 'creamy', 'evening'], 'South Africa', 72, false, false
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
  'tea-lavender', 'lavender-tea', 'Lavender Tea', 'Calming floral tea made with dried lavender, perfect for relaxation and sleep.',
  'herbal_infusion', 'hot', 'none', 'unsweetened',
  ARRAY['dried lavender flowers'], '2g lavender, 250ml water', ARRAY['ING_LAVENDER'],
  NULL, ARRAY[]::boba_topping[],
  'Clear glass mug', 250, 'Lavender sprig', 'Fresh lavender sprig + purple hue visible',
  'Steep lavender in hot water; do not over-steep', 60, 1, 300, 95, 'Too long makes it bitter',
  0.4, 3.2, 87.5,
  2, NULL, NULL, NULL, NULL,
  true, true, true, true, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey', 'vanilla'], ARRAY[]::boba_topping[], true, false,
  ARRAY['lavender', 'calming', 'sleep', 'floral', 'relaxing'], 'France', 72, false, false
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
  'tea-turmeric-golden', 'golden-milk', 'Golden Milk (Turmeric Latte)', 'Anti-inflammatory Ayurvedic drink with turmeric, ginger, and warming spices.',
  'herbal_infusion', 'hot', 'none', 'lightly_sweet',
  ARRAY['turmeric', 'ginger', 'cinnamon', 'black pepper', 'milk', 'honey'], '1tsp turmeric, 1/2tsp ginger, 250ml milk, pinch pepper', ARRAY['ING_TURMERIC', 'ING_GINGER', 'ING_CINNAMON', 'ING_BLACK_PEPPER', 'ING_MILK_WHOLE', 'ING_HONEY'],
  NULL, ARRAY[]::boba_topping[],
  'Ceramic mug', 300, 'Turmeric dust', 'Golden foam + cinnamon stick + turmeric slice',
  'Heat milk with spices; whisk until frothy', 300, 2, NULL, NULL, 'Black pepper aids turmeric absorption',
  0.7, 4.5, 84.4,
  140, NULL, 12, 7, 6,
  false, false, true, false, true, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'coconut', 'almond']::milk_type[], ARRAY['honey', 'maple', 'agave'], ARRAY[]::boba_topping[], true, false,
  ARRAY['turmeric', 'golden', 'ayurvedic', 'anti-inflammatory', 'wellness'], 'India', 82, false, true
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
  'tea-sleepytime-blend', 'sleepytime-blend', 'Sleepytime Blend', 'Calming blend of chamomile, lavender, and valerian for restful sleep.',
  'herbal_infusion', 'hot', 'none', 'unsweetened',
  ARRAY['chamomile', 'lavender', 'lemon balm', 'valerian root'], '3g herbal blend, 250ml water', ARRAY['ING_CHAMOMILE', 'ING_LAVENDER', 'ING_LEMON_BALM', 'ING_VALERIAN'],
  NULL, ARRAY[]::boba_topping[],
  'Ceramic mug', 250, 'Chamomile flower', 'Lavender + chamomile visible + dim presentation',
  'Steep blend; cover to retain oils', 60, 1, 420, 95, 'Best 30-60 min before bed',
  0.45, 3.5, 87.1,
  2, NULL, NULL, NULL, NULL,
  true, true, true, true, true, 'none', ARRAY['ragweed'],
  ARRAY['none']::milk_type[], ARRAY['honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['sleep', 'bedtime', 'calming', 'valerian', 'relaxing'], 'Global', 78, false, false
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
  'tea-immunity-boost', 'immunity-boost', 'Immunity Boost Tea', 'Vitamin-rich blend with echinacea, elderberry, and citrus to support immune health.',
  'herbal_infusion', 'hot', 'none', 'lightly_sweet',
  ARRAY['echinacea', 'elderberry', 'lemon', 'ginger', 'honey'], '3g herbal blend, lemon, ginger, 15ml honey, 300ml water', ARRAY['ING_ECHINACEA', 'ING_ELDERBERRY', 'ING_LEMON', 'ING_GINGER', 'ING_HONEY'],
  NULL, ARRAY[]::boba_topping[],
  'Glass mug', 300, 'Lemon slice', 'Elderberry garnish + fresh ginger + lemon wheel',
  'Steep herbs with ginger; add lemon and honey', 300, 2, 480, 95, 'Popular during cold season',
  0.6, 4, 85,
  45, NULL, 12, NULL, NULL,
  true, true, true, false, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey', 'elderberry'], ARRAY[]::boba_topping[], true, false,
  ARRAY['immunity', 'wellness', 'cold-remedy', 'echinacea', 'elderberry'], 'Global', 80, true, false
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
  'tea-detox-blend', 'detox-blend', 'Detox Green Blend', 'Cleansing blend with dandelion, nettle, and green tea for gentle detoxification.',
  'herbal_infusion', 'hot', 'very_low', 'unsweetened',
  ARRAY['dandelion root', 'nettle', 'green tea', 'lemon'], '3g herbal blend, 250ml water', ARRAY['ING_DANDELION', 'ING_NETTLE', 'ING_TEA_GREEN', 'ING_LEMON'],
  NULL, ARRAY[]::boba_topping[],
  'Clear glass', 300, 'Lemon slice', 'Fresh herbs visible + lemon wheel',
  'Steep at lower temperature for green tea', 60, 1, 300, 80, 'Morning drink for best results',
  0.5, 3.8, 86.8,
  5, 10, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey', 'lemon'], ARRAY[]::boba_topping[], true, false,
  ARRAY['detox', 'cleansing', 'wellness', 'morning', 'green'], 'Global', 74, false, false
) ON CONFLICT (id) DO NOTHING;

-- Batch 4 complete
