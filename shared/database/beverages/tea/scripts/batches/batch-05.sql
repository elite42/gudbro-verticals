-- GUDBRO Tea & Infusions Batch 5/5
-- Teas 61 to 62 of 62
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
  'tea-iced-hibiscus', 'iced-hibiscus', 'Iced Hibiscus Tea', 'Refreshing ruby-red iced tea, tart and cooling for hot days.',
  'herbal_infusion', 'iced', 'none', 'medium',
  ARRAY['hibiscus flowers', 'ice', 'honey'], '4g hibiscus, 300ml water, 100g ice', ARRAY['ING_HIBISCUS', 'ING_ICE', 'ING_HONEY'],
  NULL, ARRAY[]::boba_topping[],
  'Tall glass', 400, 'Lime wedge', 'Hibiscus flower + mint sprig + lime wheel',
  'Steep strong; chill or pour over ice', 120, 1, 420, 100, 'Sweeten while hot for better dissolution',
  0.4, 3.5, 88.6,
  40, NULL, 10, NULL, NULL,
  true, true, true, false, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey', 'agave', 'simple syrup', 'mint'], ARRAY[]::boba_topping[], true, true,
  ARRAY['iced', 'hibiscus', 'summer', 'refreshing', 'caffeine-free'], 'Mexico', 82, true, false
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
  'tea-mint-lemonade', 'mint-lemonade-tea', 'Mint Lemonade Tea', 'Sparkling blend of mint tea and fresh lemonade, ultra-refreshing.',
  'herbal_infusion', 'iced', 'none', 'medium',
  ARRAY['peppermint', 'lemon juice', 'sparkling water', 'ice'], '150ml mint tea, 50ml lemon juice, 100ml sparkling, 100g ice', ARRAY['ING_PEPPERMINT', 'ING_LEMON', 'ING_SPARKLING_WATER', 'ING_ICE'],
  NULL, ARRAY[]::boba_topping[],
  'Collins glass', 400, 'Mint sprig + lemon wheel', 'Fresh mint bouquet + lemon spiral + sugar rim',
  'Brew mint tea; chill; add lemon and sparkling water', 120, 2, NULL, NULL, 'Add sparkling water just before serving',
  0.55, 4, 86.3,
  50, NULL, 12, NULL, NULL,
  true, true, true, false, true, 'none', ARRAY[]::TEXT[],
  ARRAY['none']::milk_type[], ARRAY['honey', 'simple syrup', 'lavender'], ARRAY[]::boba_topping[], true, true,
  ARRAY['mint', 'lemonade', 'sparkling', 'summer', 'refreshing'], 'Global', 85, true, false
) ON CONFLICT (id) DO NOTHING;

-- Batch 5 complete
