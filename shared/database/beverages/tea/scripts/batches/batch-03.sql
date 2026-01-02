-- GUDBRO Tea & Infusions Batch 3/5
-- Teas 31 to 45 of 62
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
  'tea-hojicha-latte', 'hojicha-latte', 'Hojicha Latte', 'Creamy latte made with roasted Japanese hojicha, warm and comforting.',
  'green_tea', 'hot', 'low', 'lightly_sweet',
  ARRAY['hojicha powder', 'milk'], '3g hojicha powder, 200ml milk', ARRAY['ING_HOJICHA_POWDER', 'ING_MILK_WHOLE'],
  NULL, ARRAY[]::boba_topping[],
  'Latte glass', 300, 'Hojicha dust', 'Foam art + hojicha powder stencil',
  'Whisk hojicha powder; steam milk; combine', 80, 2, NULL, NULL, 'Low caffeine - good for evening',
  0.8, 4.5, 82.2,
  140, 20, 12, 7, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut']::milk_type[], ARRAY['honey', 'brown sugar', 'vanilla'], ARRAY[]::boba_topping[], true, false,
  ARRAY['hojicha', 'latte', 'roasted', 'creamy', 'cozy'], 'Japan', 78, false, false
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
  'tea-oolong-tieguanyin', 'tieguanyin-oolong', 'Tieguanyin (Iron Goddess)', 'Premium Chinese oolong with complex floral and creamy notes.',
  'oolong_tea', 'hot', 'medium', 'unsweetened',
  ARRAY['tieguanyin oolong tea'], '5g loose leaf, 150ml water', ARRAY['ING_TEA_TIEGUANYIN'],
  NULL, ARRAY[]::boba_topping[],
  'Gaiwan or small teapot', 150, 'None', 'Gongfu tea set + multiple infusions',
  'Gongfu style - multiple short infusions', 60, 3, 30, 95, 'Can be re-steeped 5-7 times',
  0.8, 4.5, 82.2,
  2, 35, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], ARRAY[]::boba_topping[], false, false,
  ARRAY['chinese', 'oolong', 'premium', 'floral', 'traditional'], 'China', 75, false, false
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
  'tea-dragon-well', 'dragon-well-longjing', 'Dragon Well (Longjing)', 'China''s most famous green tea, flat leaves with chestnut sweetness.',
  'green_tea', 'hot', 'medium', 'unsweetened',
  ARRAY['longjing green tea'], '3g loose leaf, 200ml water', ARRAY['ING_TEA_LONGJING'],
  NULL, ARRAY[]::boba_topping[],
  'Glass cup', 200, 'None', 'Clear glass to show dancing leaves',
  'Use cooler water; watch leaves unfurl', 60, 2, 120, 80, 'Pan-fired, not steamed like Japanese',
  1, 5, 80,
  2, 30, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], ARRAY[]::boba_topping[], false, false,
  ARRAY['chinese', 'green-tea', 'premium', 'chestnut', 'hangzhou'], 'China', 72, false, false
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
  'tea-jasmine-green', 'jasmine-green-tea', 'Jasmine Green Tea', 'Delicate green tea scented with jasmine flowers, fragrant and soothing.',
  'green_tea', 'hot', 'medium', 'unsweetened',
  ARRAY['green tea', 'jasmine flowers'], '3g loose leaf, 200ml water', ARRAY['ING_TEA_JASMINE'],
  NULL, ARRAY[]::boba_topping[],
  'Clear glass or ceramic cup', 250, 'None', 'Jasmine flower floating',
  'Steep in moderate temperature water', 60, 1, 180, 80, 'Do not use boiling water',
  0.4, 3.2, 87.5,
  2, 25, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey'], ARRAY[]::boba_topping[], true, true,
  ARRAY['chinese', 'jasmine', 'floral', 'fragrant', 'soothing'], 'China', 85, false, false
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
  'tea-pu-erh', 'pu-erh', 'Pu-erh Tea', 'Aged fermented Chinese tea with earthy, complex flavors that improve with age.',
  'pu_erh', 'hot', 'medium', 'unsweetened',
  ARRAY['aged pu-erh tea'], '5g loose leaf, 150ml water', ARRAY['ING_TEA_PUERH'],
  NULL, ARRAY[]::boba_topping[],
  'Yixing clay teapot', 150, 'None', 'Traditional Gongfu set + tea cake display',
  'Rinse tea first; multiple short infusions', 90, 3, 20, 95, 'First rinse discarded; improves with age',
  1.2, 5.5, 78.2,
  2, 40, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], ARRAY[]::boba_topping[], false, false,
  ARRAY['chinese', 'pu-erh', 'aged', 'fermented', 'earthy', 'digestive'], 'China', 68, false, false
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
  'tea-darjeeling', 'darjeeling', 'Darjeeling', 'The "Champagne of teas" from the Himalayan foothills, delicate and muscatel.',
  'black_tea', 'hot', 'medium', 'unsweetened',
  ARRAY['darjeeling black tea'], '3g loose leaf, 250ml water', ARRAY['ING_TEA_DARJEELING'],
  NULL, ARRAY[]::boba_topping[],
  'Fine china cup', 250, 'None', 'Crystal clear amber in fine porcelain',
  'Steep at slightly lower temperature than other black teas', 60, 2, 240, 90, 'Best without milk to appreciate delicate flavor',
  0.7, 4, 82.5,
  2, 45, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'whole']::milk_type[], ARRAY['honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['indian', 'darjeeling', 'premium', 'muscatel', 'himalayan'], 'India', 78, false, false
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
  'tea-assam', 'assam', 'Assam', 'Bold, malty Indian black tea - the backbone of many breakfast blends.',
  'black_tea', 'hot', 'high', 'unsweetened',
  ARRAY['assam black tea'], '3g loose leaf, 250ml water', ARRAY['ING_TEA_ASSAM'],
  NULL, ARRAY[]::boba_topping[],
  'Sturdy teacup', 250, 'Milk jug on side', 'Indian brass service set',
  'Steep in boiling water; pairs well with milk', 60, 1, 300, 100, 'Strong enough for milk',
  0.35, 3, 88.3,
  2, 55, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none', 'whole', 'oat']::milk_type[], ARRAY['honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['indian', 'assam', 'bold', 'malty', 'breakfast'], 'India', 82, false, false
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
  'tea-silver-needle', 'silver-needle', 'Silver Needle (Bai Hao)', 'Finest Chinese white tea made only from unopened buds, delicate and sweet.',
  'white_tea', 'hot', 'low', 'unsweetened',
  ARRAY['silver needle white tea'], '3g loose leaf, 200ml water', ARRAY['ING_TEA_SILVER_NEEDLE'],
  NULL, ARRAY[]::boba_topping[],
  'Clear glass', 200, 'None', 'Visible silver buds dancing in water',
  'Use cooler water; longer steep; watch buds float', 60, 2, 300, 80, 'Multiple infusions possible',
  1.5, 6, 75,
  2, 15, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY[]::TEXT[], ARRAY[]::boba_topping[], false, false,
  ARRAY['chinese', 'white-tea', 'premium', 'delicate', 'antioxidant'], 'China', 70, false, false
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
  'tea-iced-green', 'iced-green-tea', 'Iced Green Tea', 'Cold-brewed or flash-chilled green tea, light and refreshing.',
  'green_tea', 'iced', 'medium', 'unsweetened',
  ARRAY['green tea', 'ice'], '5g loose leaf, 300ml water, 100g ice', ARRAY['ING_TEA_GREEN', 'ING_ICE'],
  NULL, ARRAY[]::boba_topping[],
  'Tall glass', 400, 'Lemon slice', 'Mint sprig + cucumber slice',
  'Cold brew 4-6 hours or flash-brew and chill', 60, 1, 14400, 5, 'Cold brew is smoother with less bitterness',
  0.4, 3.5, 88.6,
  2, 30, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey', 'lemon', 'mint'], ARRAY[]::boba_topping[], true, true,
  ARRAY['iced', 'green-tea', 'refreshing', 'summer', 'healthy'], 'Japan', 82, true, false
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
  'tea-iced-black', 'iced-black-tea', 'Iced Black Tea', 'Classic iced tea, refreshing and perfect with lemon or peach.',
  'black_tea', 'iced', 'medium', 'lightly_sweet',
  ARRAY['black tea', 'ice', 'lemon'], '5g loose leaf, 300ml water, 100g ice', ARRAY['ING_TEA_BLACK', 'ING_ICE', 'ING_LEMON'],
  NULL, ARRAY[]::boba_topping[],
  'Tall glass', 400, 'Lemon wedge', 'Lemon wheel + mint + sugar rim',
  'Brew strong; pour over ice; garnish', 90, 1, 300, 95, 'Southern sweet tea tradition uses more sugar',
  0.35, 3.2, 89.1,
  5, 50, NULL, NULL, NULL,
  true, true, true, true, false, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['simple syrup', 'peach', 'raspberry', 'lemon'], ARRAY[]::boba_topping[], true, true,
  ARRAY['iced', 'black-tea', 'classic', 'summer', 'refreshing'], 'USA', 88, true, false
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
  'tea-masala-chai', 'masala-chai', 'Masala Chai (Traditional)', 'Authentic Indian spiced tea simmered with milk, cardamom, ginger, and warming spices.',
  'chai', 'hot', 'medium', 'medium',
  ARRAY['black tea', 'milk', 'ginger', 'cardamom', 'cinnamon', 'cloves', 'black pepper'], '3g tea, 120ml milk, 120ml water, spice blend, sugar', ARRAY['ING_TEA_BLACK', 'ING_MILK_WHOLE', 'ING_GINGER', 'ING_CARDAMOM', 'ING_CINNAMON', 'ING_CLOVES'],
  NULL, ARRAY[]::boba_topping[],
  'Traditional chai glass (kulhar)', 250, 'Cinnamon stick', 'Clay cup + whole spices floating + saucer',
  'Simmer spices in water; add tea and milk; boil together', 300, 2, 300, 100, 'Boil milk with tea for authentic texture',
  0.5, 3.5, 85.7,
  120, 50, 15, 4, 4,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'coconut', 'soy']::milk_type[], ARRAY['honey'], ARRAY[]::boba_topping[], true, false,
  ARRAY['indian', 'spiced', 'traditional', 'warming', 'aromatic'], 'India', 90, false, false
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
  'tea-chai-latte', 'chai-latte', 'Chai Latte', 'Western-style chai with steamed milk and chai concentrate or syrup.',
  'chai', 'hot', 'medium', 'sweet',
  ARRAY['chai concentrate', 'steamed milk'], '120ml chai concentrate, 180ml steamed milk', ARRAY['ING_CHAI_CONCENTRATE', 'ING_MILK_WHOLE'],
  NULL, ARRAY[]::boba_topping[],
  'Latte glass', 350, 'Cinnamon dust', 'Latte art + cinnamon stick',
  'Heat chai concentrate; steam milk; combine with foam on top', 120, 2, NULL, NULL, 'Can use syrup or concentrate',
  0.65, 4.2, 84.5,
  180, 50, 25, 7, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut', 'soy']::milk_type[], ARRAY['vanilla', 'honey', 'extra spice'], ARRAY[]::boba_topping[], true, false,
  ARRAY['chai', 'latte', 'spiced', 'creamy', 'cozy'], 'USA', 92, false, false
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
  'tea-iced-chai-latte', 'iced-chai-latte', 'Iced Chai Latte', 'Refreshing cold chai latte with milk poured over ice and chai concentrate.',
  'chai', 'iced', 'medium', 'sweet',
  ARRAY['chai concentrate', 'milk', 'ice'], '120ml chai concentrate, 150ml milk, 100g ice', ARRAY['ING_CHAI_CONCENTRATE', 'ING_MILK_WHOLE', 'ING_ICE'],
  NULL, ARRAY[]::boba_topping[],
  'Tall glass', 400, 'Cinnamon dust', 'Layered visible + star anise',
  'Pour chai over ice; add cold milk; stir or shake', 60, 1, NULL, NULL, 'Shake for creamier texture',
  0.65, 4.5, 85.6,
  160, 50, 22, 6, 5,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut', 'soy']::milk_type[], ARRAY['vanilla', 'caramel'], ARRAY[]::boba_topping[], true, true,
  ARRAY['iced', 'chai', 'refreshing', 'summer', 'spiced'], 'USA', 88, true, false
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
  'tea-dirty-chai', 'dirty-chai-latte', 'Dirty Chai Latte', 'Chai latte with a shot of espresso for an extra caffeine kick.',
  'chai', 'hot', 'high', 'sweet',
  ARRAY['chai concentrate', 'espresso', 'steamed milk'], '100ml chai, 30ml espresso, 150ml milk', ARRAY['ING_CHAI_CONCENTRATE', 'ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
  NULL, ARRAY[]::boba_topping[],
  'Latte glass', 350, 'Cinnamon dust', 'Coffee bean garnish + spice rim',
  'Pull espresso; heat chai; add steamed milk', 150, 2, NULL, NULL, 'The "dirty" refers to adding coffee to tea',
  0.85, 4.8, 82.3,
  200, 130, 24, 7, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond']::milk_type[], ARRAY['vanilla', 'caramel'], ARRAY[]::boba_topping[], true, false,
  ARRAY['dirty-chai', 'espresso', 'high-caffeine', 'fusion', 'popular'], 'USA', 85, false, true
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
  'tea-vanilla-chai', 'vanilla-chai-latte', 'Vanilla Chai Latte', 'Classic chai latte enhanced with Madagascar vanilla for extra sweetness.',
  'chai', 'hot', 'medium', 'sweet',
  ARRAY['chai concentrate', 'milk', 'vanilla syrup'], '120ml chai, 180ml milk, 15ml vanilla', ARRAY['ING_CHAI_CONCENTRATE', 'ING_MILK_WHOLE', 'ING_VANILLA_SYRUP'],
  NULL, ARRAY[]::boba_topping[],
  'Latte glass', 350, 'Vanilla specks', 'Vanilla bean piece + cinnamon art',
  'Heat chai with vanilla; add steamed milk', 120, 2, NULL, NULL, 'Use real vanilla for best flavor',
  0.75, 4.5, 83.3,
  210, 50, 32, 7, 6,
  false, false, true, false, false, 'whole', ARRAY['milk'],
  ARRAY['whole', 'oat', 'almond', 'coconut']::milk_type[], ARRAY['extra vanilla', 'caramel'], ARRAY[]::boba_topping[], true, false,
  ARRAY['vanilla', 'chai', 'sweet', 'aromatic', 'creamy'], 'USA', 82, false, false
) ON CONFLICT (id) DO NOTHING;

-- Batch 3 complete
