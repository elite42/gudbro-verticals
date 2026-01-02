-- GUDBRO Tea & Infusions Batch 2/5
-- Teas 16 to 30 of 62
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
  'tea-honeydew-milk-tea', 'honeydew-milk-tea', 'Honeydew Milk Tea', 'Refreshing green melon milk tea with a sweet, fruity flavor profile.',
  'bubble_tea', 'iced', 'low', 'sweet',
  ARRAY['honeydew powder', 'green tea', 'milk', 'tapioca pearls', 'ice'], '30g honeydew powder, 100ml green tea, 150ml milk, 50g boba, 100g ice', ARRAY['ING_HONEYDEW_POWDER', 'ING_TEA_GREEN', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'green_tea', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Light green color', 'Honeydew ball garnish',
  'Blend honeydew powder with tea; add milk and ice; shake; add boba', 110, 2, NULL, NULL, 'Fresh honeydew puree for premium version',
  0.9, 5, 82,
  310, 20, 40, 5, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'coconut']::milk_type[], ARRAY['honey'], ARRAY['tapioca_pearls', 'aloe_vera', 'coconut_jelly', 'popping_boba']::boba_topping[], true, true,
  ARRAY['honeydew', 'melon', 'fruity', 'refreshing', 'summer'], 'Taiwan', 78, true, false
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
  'tea-oolong-milk-tea', 'oolong-milk-tea', 'Oolong Milk Tea', 'Premium Taiwanese oolong tea with creamy milk, featuring a complex floral flavor.',
  'bubble_tea', 'iced', 'medium', 'lightly_sweet',
  ARRAY['oolong tea', 'milk', 'tapioca pearls', 'ice'], '200ml oolong tea, 100ml milk, 50g boba, 100g ice', ARRAY['ING_TEA_OOLONG', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'oolong', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Amber color', 'Gold shimmer + oolong leaves garnish',
  'Brew premium oolong; cool; shake with milk and ice; add boba', 150, 2, 240, 85, 'Use high mountain oolong for best flavor',
  1, 5.5, 81.8,
  240, 40, 25, 5, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['honey'], ARRAY['tapioca_pearls', 'aloe_vera', 'coconut_jelly']::boba_topping[], true, true,
  ARRAY['oolong', 'premium', 'floral', 'taiwanese', 'sophisticated'], 'Taiwan', 82, false, false
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
  'tea-cheese-foam-tea', 'cheese-foam-tea', 'Cheese Foam Black Tea', 'Trending drink with creamy salted cheese foam floating on top of cold black tea.',
  'bubble_tea', 'iced', 'medium', 'medium',
  ARRAY['black tea', 'cream cheese foam', 'milk', 'salt', 'ice'], '250ml black tea, 50g cheese foam, 100g ice', ARRAY['ING_TEA_BLACK', 'ING_CREAM_CHEESE', 'ING_HEAVY_CREAM', 'ING_SALT', 'ING_ICE'],
  'black_tea', ARRAY['cheese_foam']::boba_topping[],
  'Wide cup', 450, 'Cheese foam cap', 'Sea salt flakes + cocoa dust on foam',
  'Brew tea; chill; whip cheese foam; layer on top', 180, 3, 300, 95, 'Drink without straw to get foam with each sip',
  1.1, 5.8, 81,
  280, 50, 20, 6, 16,
  false, false, true, false, false, 'none', ARRAY['milk'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], ARRAY['cheese_foam', 'tapioca_pearls']::boba_topping[], true, true,
  ARRAY['cheese-foam', 'trending', 'savory-sweet', 'asian', 'unique'], 'Taiwan', 85, false, true
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
  'tea-mango-passion-fruit', 'mango-passion-fruit-tea', 'Mango Passion Fruit Tea', 'Tropical fruit tea with mango and passion fruit, refreshing and caffeine-optional.',
  'bubble_tea', 'iced', 'low', 'sweet',
  ARRAY['green tea', 'mango puree', 'passion fruit', 'popping boba', 'ice'], '150ml green tea, 40ml mango, 20ml passion fruit, 30g popping boba, 120g ice', ARRAY['ING_TEA_GREEN', 'ING_MANGO_PUREE', 'ING_PASSION_FRUIT', 'ING_POPPING_BOBA', 'ING_ICE'],
  'green_tea', ARRAY['popping_boba']::boba_topping[],
  'Clear cup', 500, 'Fruit pieces visible', 'Fresh mango slice + passion fruit half',
  'Brew tea; blend with fruit; shake with ice; add popping boba', 120, 2, NULL, NULL, 'Use fresh fruit when available',
  1.2, 5.8, 79.3,
  220, 15, 38, 2, 1,
  true, true, true, false, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'coconut']::milk_type[], ARRAY[]::TEXT[], ARRAY['popping_boba', 'aloe_vera', 'coconut_jelly']::boba_topping[], true, true,
  ARRAY['tropical', 'fruit', 'mango', 'passion-fruit', 'refreshing', 'vegan'], 'Taiwan', 88, true, false
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
  'tea-lychee-tea', 'lychee-bubble-tea', 'Lychee Bubble Tea', 'Delicate floral lychee tea with subtle sweetness and aromatic fragrance.',
  'bubble_tea', 'iced', 'low', 'medium',
  ARRAY['green tea', 'lychee syrup', 'lychee pieces', 'tapioca pearls', 'ice'], '200ml green tea, 30ml lychee syrup, 30g lychee, 50g boba, 100g ice', ARRAY['ING_TEA_GREEN', 'ING_LYCHEE_SYRUP', 'ING_LYCHEE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'green_tea', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Lychee pieces visible', 'Fresh lychee garnish + edible flower',
  'Brew green tea; cool; add lychee syrup; shake with ice; add boba and fruit', 110, 2, NULL, NULL, 'Canned lychee works well',
  0.95, 5.2, 81.7,
  240, 20, 35, 2, NULL,
  true, true, true, false, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'coconut']::milk_type[], ARRAY['extra lychee', 'rose'], ARRAY['tapioca_pearls', 'aloe_vera', 'coconut_jelly', 'popping_boba']::boba_topping[], true, true,
  ARRAY['lychee', 'floral', 'delicate', 'asian', 'fruit'], 'Taiwan', 80, false, false
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
  'tea-strawberry-boba', 'strawberry-milk-tea', 'Strawberry Milk Tea', 'Sweet and creamy strawberry milk tea with a beautiful pink hue.',
  'bubble_tea', 'iced', 'low', 'sweet',
  ARRAY['green tea', 'strawberry puree', 'milk', 'tapioca pearls', 'ice'], '100ml green tea, 50ml strawberry, 150ml milk, 50g boba, 100g ice', ARRAY['ING_TEA_GREEN', 'ING_STRAWBERRY_PUREE', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'green_tea', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Pink color', 'Fresh strawberry slice + pink straw',
  'Blend strawberry with tea and milk; shake with ice; add boba', 110, 2, NULL, NULL, 'Use fresh strawberries in season',
  1, 5.3, 81.1,
  280, 15, 38, 5, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'coconut']::milk_type[], ARRAY['vanilla'], ARRAY['tapioca_pearls', 'popping_boba', 'coconut_jelly']::boba_topping[], true, true,
  ARRAY['strawberry', 'pink', 'fruity', 'creamy', 'instagram'], 'Taiwan', 86, true, false
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
  'tea-wintermelon-tea', 'wintermelon-milk-tea', 'Wintermelon Milk Tea', 'Unique caramelized wintermelon tea with subtle smoky sweetness, a Taiwanese specialty.',
  'bubble_tea', 'iced', 'none', 'sweet',
  ARRAY['wintermelon syrup', 'milk', 'tapioca pearls', 'ice'], '50ml wintermelon syrup, 200ml milk, 50g boba, 100g ice', ARRAY['ING_WINTERMELON_SYRUP', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'none', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Amber-gold color', 'Caramelized sugar rim',
  'Mix wintermelon syrup with milk; shake with ice; add boba', 80, 1, NULL, NULL, 'Wintermelon syrup is pre-made from slow-cooked melon',
  0.85, 5, 83,
  290, NULL, 42, 6, 6,
  false, false, true, false, true, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'coconut', 'soy']::milk_type[], ARRAY[]::TEXT[], ARRAY['tapioca_pearls', 'grass_jelly', 'pudding']::boba_topping[], true, true,
  ARRAY['wintermelon', 'caramel', 'unique', 'taiwanese', 'caffeine-free'], 'Taiwan', 75, false, false
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
  'tea-hojicha-boba', 'hojicha-milk-tea', 'Hojicha Milk Tea', 'Japanese roasted green tea with a toasty, caramel-like flavor and creamy milk.',
  'bubble_tea', 'iced', 'low', 'lightly_sweet',
  ARRAY['hojicha tea', 'milk', 'tapioca pearls', 'ice'], '200ml hojicha, 100ml milk, 50g boba, 100g ice', ARRAY['ING_TEA_HOJICHA', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'green_tea', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Warm brown color', 'Toasted rice garnish + hojicha powder',
  'Brew hojicha; cool; shake with milk and ice; add boba', 140, 2, 180, 90, 'Lower caffeine than matcha, naturally sweet',
  1, 5.5, 81.8,
  220, 25, 25, 5, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut']::milk_type[], ARRAY['honey', 'brown sugar'], ARRAY['tapioca_pearls', 'red_bean', 'pudding']::boba_topping[], true, true,
  ARRAY['hojicha', 'japanese', 'roasted', 'toasty', 'low-caffeine'], 'Japan', 76, false, false
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
  'tea-black-sesame-boba', 'black-sesame-milk-tea', 'Black Sesame Milk Tea', 'Nutty and earthy black sesame milk tea with a distinctive gray-purple color.',
  'bubble_tea', 'iced', 'low', 'medium',
  ARRAY['black sesame paste', 'milk', 'black tea', 'tapioca pearls', 'ice'], '30g sesame paste, 150ml milk, 100ml black tea, 50g boba, 100g ice', ARRAY['ING_BLACK_SESAME', 'ING_MILK_WHOLE', 'ING_TEA_BLACK', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
  'black_tea', ARRAY['tapioca_pearls']::boba_topping[],
  'Bubble tea cup', 500, 'Gray color', 'Sesame seeds on foam + swirl pattern',
  'Blend sesame paste with tea and milk; shake with ice; add boba', 120, 2, NULL, NULL, 'Toast sesame seeds for garnish',
  1.05, 5.5, 80.9,
  320, 25, 28, 8, 12,
  false, false, true, false, false, 'whole', ARRAY['milk', 'sesame'],
  ARRAY['whole', 'oat']::milk_type[], ARRAY['honey'], ARRAY['tapioca_pearls', 'red_bean', 'taro_balls']::boba_topping[], true, true,
  ARRAY['black-sesame', 'nutty', 'unique', 'asian', 'protein'], 'Taiwan', 72, false, true
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
  'tea-earl-grey', 'earl-grey', 'Earl Grey', 'Classic British black tea flavored with bergamot orange oil, citrusy and aromatic.',
  'black_tea', 'hot', 'medium', 'unsweetened',
  ARRAY['black tea', 'bergamot oil'], '3g loose leaf, 250ml water', ARRAY['ING_TEA_EARL_GREY'],
  NULL, ARRAY[]::boba_topping[],
  'Teacup with saucer', 250, 'Lemon slice optional', 'Fine china + lemon wheel + honey pot',
  'Steep loose leaf tea in hot water', 60, 1, 240, 95, 'Do not over-steep to avoid bitterness',
  0.3, 3, 90,
  2, 50, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'whole', 'oat']::milk_type[], ARRAY['honey', 'lavender'], ARRAY[]::boba_topping[], true, false,
  ARRAY['british', 'classic', 'bergamot', 'citrus', 'afternoon-tea'], 'United Kingdom', 90, false, false
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
  'tea-earl-grey-latte', 'earl-grey-latte', 'Earl Grey Latte (London Fog)', 'Steamed milk meets Earl Grey with vanilla, creating the famous London Fog.',
  'black_tea', 'hot', 'medium', 'medium',
  ARRAY['earl grey tea', 'milk', 'vanilla syrup'], '150ml earl grey, 150ml steamed milk, 15ml vanilla', ARRAY['ING_TEA_EARL_GREY', 'ING_MILK_WHOLE', 'ING_VANILLA_SYRUP'],
  NULL, ARRAY[]::boba_topping[],
  'Latte glass', 350, 'Vanilla foam', 'Lavender sprig + foam art',
  'Steep tea; add vanilla; top with steamed milk', 120, 2, 300, 95, 'Also called London Fog',
  0.65, 4.2, 84.5,
  160, 50, 18, 6, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut']::milk_type[], ARRAY['vanilla', 'lavender', 'honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['london-fog', 'latte', 'vanilla', 'creamy', 'cozy'], 'Canada', 85, false, false
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
  'tea-english-breakfast', 'english-breakfast', 'English Breakfast', 'Full-bodied British black tea blend, robust and perfect with milk.',
  'black_tea', 'hot', 'high', 'unsweetened',
  ARRAY['black tea blend'], '3g loose leaf, 250ml water', ARRAY['ING_TEA_ENGLISH_BREAKFAST'],
  NULL, ARRAY[]::boba_topping[],
  'Teacup with saucer', 250, 'Milk jug on side', 'Fine china service + petit fours',
  'Steep in freshly boiled water; serve with milk', 60, 1, 300, 100, 'Traditional with splash of milk',
  0.25, 2.8, 91.1,
  2, 60, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'whole', 'oat']::milk_type[], ARRAY['honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['british', 'classic', 'morning', 'robust', 'breakfast'], 'United Kingdom', 88, false, false
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
  'tea-sencha', 'sencha', 'Sencha', 'Japan''s most popular green tea, bright and refreshing with grassy notes.',
  'green_tea', 'hot', 'medium', 'unsweetened',
  ARRAY['sencha green tea'], '4g loose leaf, 200ml water', ARRAY['ING_TEA_SENCHA'],
  NULL, ARRAY[]::boba_topping[],
  'Japanese tea cup (yunomi)', 200, 'None', 'Traditional Japanese tea set + wagashi sweet',
  'Steep at lower temperature to preserve delicate flavors', 60, 2, 90, 75, 'Can re-steep 2-3 times',
  0.5, 3.5, 85.7,
  2, 30, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], ARRAY[]::boba_topping[], false, false,
  ARRAY['japanese', 'green-tea', 'grassy', 'refreshing', 'traditional'], 'Japan', 80, false, false
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
  'tea-genmaicha', 'genmaicha', 'Genmaicha', 'Japanese green tea blended with roasted brown rice, nutty and toasty.',
  'green_tea', 'hot', 'low', 'unsweetened',
  ARRAY['green tea', 'roasted brown rice'], '4g loose leaf, 200ml water', ARRAY['ING_TEA_GENMAICHA'],
  NULL, ARRAY[]::boba_topping[],
  'Japanese tea cup', 200, 'None', 'Visible rice puffs + ceramic cup',
  'Steep in moderately hot water', 60, 1, 180, 80, 'Also called popcorn tea',
  0.45, 3.5, 87.1,
  5, 20, NULL, NULL, NULL,
  true, true, false, true, false, 'none', ARRAY['gluten'],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], ARRAY[]::boba_topping[], false, false,
  ARRAY['japanese', 'green-tea', 'roasted-rice', 'nutty', 'comfort'], 'Japan', 72, false, false
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
  'tea-hojicha-hot', 'hojicha', 'Hojicha', 'Japanese roasted green tea with a warm, toasty flavor and lower caffeine.',
  'green_tea', 'hot', 'low', 'unsweetened',
  ARRAY['roasted green tea'], '4g loose leaf, 200ml water', ARRAY['ING_TEA_HOJICHA'],
  NULL, ARRAY[]::boba_topping[],
  'Japanese tea cup', 200, 'None', 'Toasted rice garnish',
  'Steep in hot water; naturally sweet', 60, 1, 120, 90, 'Can be enjoyed any time of day',
  0.5, 3.5, 85.7,
  2, 15, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'oat']::milk_type[], ARRAY['honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['japanese', 'roasted', 'toasty', 'low-caffeine', 'evening'], 'Japan', 75, false, false
) ON CONFLICT (id) DO NOTHING;

-- Batch 2 complete
