-- ============================================
-- SOFT DRINKS - Data Import
-- GUDBRO Database Standards v1.3
-- Total: 38 soft drinks
-- ============================================

INSERT INTO softdrinks (id, slug, name, description, category, status, brand, serving_size_ml, serving_style, calories_per_serving, sugar_g, caffeine_mg, is_sugar_free, is_diet, is_carbonated, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, spice_level, tags, popularity, origin_country) VALUES

-- ============================================
-- COLA (5 items)
-- ============================================
('SDR_COCA_COLA', 'coca-cola', 'Coca-Cola', 'The iconic, refreshing cola with its secret recipe of natural flavors', 'cola', 'classic', 'Coca-Cola', 330, 'can', 139, 35, 32, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['iconic', 'classic', 'american'], 95, 'USA'),
('SDR_COCA_COLA_ZERO', 'coca-cola-zero', 'Coca-Cola Zero Sugar', 'Zero sugar, zero calories, same great Coca-Cola taste', 'cola', 'popular', 'Coca-Cola', 330, 'can', 0, 0, 32, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['sugar-free', 'zero-calories', 'diet'], 90, 'USA'),
('SDR_PEPSI', 'pepsi', 'Pepsi', 'Bold cola flavor with a refreshing taste', 'cola', 'classic', 'PepsiCo', 330, 'can', 150, 41, 38, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['bold', 'american', 'classic'], 90, 'USA'),
('SDR_PEPSI_ZERO', 'pepsi-zero', 'Pepsi Zero Sugar', 'Maximum taste, zero sugar', 'cola', 'popular', 'PepsiCo', 330, 'can', 0, 0, 69, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['sugar-free', 'zero-calories', 'bold'], 80, 'USA'),
('SDR_DR_PEPPER', 'dr-pepper', 'Dr Pepper', 'Unique blend of 23 flavors creating an unmistakable taste', 'cola', 'classic', 'Keurig Dr Pepper', 330, 'can', 150, 40, 41, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['unique', '23-flavors', 'american'], 85, 'USA'),

-- ============================================
-- LEMON-LIME (5 items)
-- ============================================
('SDR_SPRITE', 'sprite', 'Sprite', 'Crisp, clean, refreshing lemon-lime soda', 'lemon_lime', 'classic', 'Coca-Cola', 330, 'can', 140, 38, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['crisp', 'caffeine-free', 'refreshing'], 90, 'Germany'),
('SDR_SPRITE_ZERO', 'sprite-zero', 'Sprite Zero Sugar', 'Same refreshing lemon-lime taste with zero sugar', 'lemon_lime', 'active', 'Coca-Cola', 330, 'can', 0, 0, 0, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['sugar-free', 'caffeine-free', 'crisp'], 75, 'Germany'),
('SDR_7UP', 'seven-up', '7UP', 'Crisp, clean, refreshing lemon-lime taste', 'lemon_lime', 'classic', 'Keurig Dr Pepper', 330, 'can', 140, 38, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['classic', 'caffeine-free', 'american'], 80, 'USA'),
('SDR_MOUNTAIN_DEW', 'mountain-dew', 'Mountain Dew', 'Bold citrus flavor with a caffeine kick', 'lemon_lime', 'popular', 'PepsiCo', 330, 'can', 170, 46, 54, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['bold', 'caffeinated', 'extreme'], 85, 'USA'),
('SDR_STARRY', 'starry', 'Starry', 'Lemon lime soda with a crisp, clean taste', 'lemon_lime', 'active', 'PepsiCo', 330, 'can', 140, 38, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['new', 'caffeine-free', 'crisp'], 60, 'USA'),

-- ============================================
-- ORANGE (5 items)
-- ============================================
('SDR_FANTA_ORANGE', 'fanta-orange', 'Fanta Orange', 'Bright, bubbly orange soda with a playful, fruity taste', 'orange', 'classic', 'Coca-Cola', 330, 'can', 160, 44, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['fruity', 'caffeine-free', 'colorful'], 85, 'Germany'),
('SDR_FANTA_ZERO', 'fanta-zero', 'Fanta Zero Orange', 'Zero sugar orange soda with the same fruity Fanta taste', 'orange', 'active', 'Coca-Cola', 330, 'can', 0, 0, 0, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['sugar-free', 'caffeine-free', 'fruity'], 65, 'Germany'),
('SDR_ORANGINA', 'orangina', 'Orangina', 'Lightly sparkling citrus drink with real orange pulp', 'orange', 'premium', 'Suntory', 330, 'bottle', 90, 21, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['french', 'real-juice', 'pulp', 'premium'], 70, 'France'),
('SDR_SUNKIST', 'sunkist', 'Sunkist Orange', 'Bold, sweet orange soda with a burst of citrus flavor', 'orange', 'classic', 'Keurig Dr Pepper', 330, 'can', 170, 44, 19, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['bold', 'sweet', 'caffeinated'], 70, 'USA'),
('SDR_MIRINDA', 'mirinda', 'Mirinda Orange', 'Sweet and tangy orange soda popular worldwide', 'orange', 'classic', 'PepsiCo', 330, 'can', 150, 40, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['international', 'sweet', 'tangy'], 75, 'Spain'),

-- ============================================
-- GINGER (5 items)
-- ============================================
('SDR_SCHWEPPES_GINGER_ALE', 'schweppes-ginger-ale', 'Schweppes Ginger Ale', 'Classic dry ginger ale with a crisp, refreshing taste', 'ginger', 'classic', 'Schweppes', 330, 'can', 90, 22, 0, false, false, true, '{}', true, true, true, true, true, true, true, 1, ARRAY['mixer', 'classic', 'ginger'], 85, 'Switzerland'),
('SDR_CANADA_DRY', 'canada-dry', 'Canada Dry Ginger Ale', 'Made from real ginger, crisp and refreshing', 'ginger', 'classic', 'Keurig Dr Pepper', 330, 'can', 90, 23, 0, false, false, true, '{}', true, true, true, true, true, true, true, 1, ARRAY['mixer', 'real-ginger', 'canadian'], 80, 'Canada'),
('SDR_FEVER_TREE_GINGER_ALE', 'fever-tree-ginger-ale', 'Fever-Tree Ginger Ale', 'Premium ginger ale made with three types of ginger', 'ginger', 'premium', 'Fever-Tree', 200, 'bottle', 64, 16, 0, false, false, true, '{}', true, true, true, true, true, true, true, 2, ARRAY['premium', 'mixer', 'craft', 'british'], 75, 'UK'),
('SDR_FEVER_TREE_GINGER_BEER', 'fever-tree-ginger-beer', 'Fever-Tree Ginger Beer', 'Fiery, spicy ginger beer perfect for Moscow Mules', 'ginger', 'premium', 'Fever-Tree', 200, 'bottle', 68, 17, 0, false, false, true, '{}', true, true, true, true, true, true, true, 3, ARRAY['premium', 'mixer', 'spicy', 'moscow-mule'], 80, 'UK'),
('SDR_BUNDABERG_GINGER_BEER', 'bundaberg-ginger-beer', 'Bundaberg Ginger Beer', 'Australian craft ginger beer brewed for over 3 days', 'ginger', 'premium', 'Bundaberg', 375, 'bottle', 150, 37, 0, false, false, true, '{}', true, true, true, true, true, true, true, 2, ARRAY['craft', 'australian', 'brewed', 'premium'], 75, 'Australia'),

-- ============================================
-- TONIC & SODA (6 items)
-- ============================================
('SDR_SCHWEPPES_TONIC', 'schweppes-tonic', 'Schweppes Tonic Water', 'Classic tonic water with quinine for a distinctive bitter taste', 'tonic_soda', 'classic', 'Schweppes', 200, 'bottle', 60, 15, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['mixer', 'gin-tonic', 'bitter'], 85, 'Switzerland'),
('SDR_FEVER_TREE_TONIC', 'fever-tree-tonic', 'Fever-Tree Premium Indian Tonic', 'Premium tonic made with natural quinine from Congo', 'tonic_soda', 'premium', 'Fever-Tree', 200, 'bottle', 68, 17, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['premium', 'mixer', 'craft', 'gin-tonic'], 85, 'UK'),
('SDR_FEVER_TREE_ELDERFLOWER', 'fever-tree-elderflower-tonic', 'Fever-Tree Elderflower Tonic', 'Delicate elderflower tonic for floral gin pairings', 'tonic_soda', 'premium', 'Fever-Tree', 200, 'bottle', 60, 15, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['premium', 'floral', 'mixer', 'craft'], 70, 'UK'),
('SDR_SCHWEPPES_SODA', 'schweppes-soda', 'Schweppes Soda Water', 'Pure carbonated water for mixing or refreshment', 'tonic_soda', 'classic', 'Schweppes', 200, 'bottle', 0, 0, 0, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['mixer', 'zero-calories', 'neutral'], 75, 'Switzerland'),
('SDR_SAN_PELLEGRINO', 'san-pellegrino', 'San Pellegrino', 'Italian sparkling mineral water from the Alps', 'tonic_soda', 'premium', 'San Pellegrino', 500, 'bottle', 0, 0, 0, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['italian', 'premium', 'mineral', 'dining'], 85, 'Italy'),
('SDR_PERRIER', 'perrier', 'Perrier', 'Iconic French sparkling mineral water with fine bubbles', 'tonic_soda', 'premium', 'Perrier', 330, 'bottle', 0, 0, 0, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['french', 'premium', 'iconic', 'mineral'], 80, 'France'),

-- ============================================
-- ENERGY (6 items)
-- ============================================
('SDR_RED_BULL', 'red-bull', 'Red Bull Energy Drink', 'The original energy drink that gives you wings', 'energy', 'classic', 'Red Bull', 250, 'can', 110, 27, 80, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['energy', 'iconic', 'austrian', 'taurine'], 95, 'Austria'),
('SDR_RED_BULL_SUGAR_FREE', 'red-bull-sugar-free', 'Red Bull Sugar Free', 'Same energy boost with zero sugar', 'energy', 'popular', 'Red Bull', 250, 'can', 5, 0, 80, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['energy', 'sugar-free', 'low-calorie'], 85, 'Austria'),
('SDR_MONSTER_ORIGINAL', 'monster-original', 'Monster Energy Original', 'Bold energy drink with a powerful caffeine punch', 'energy', 'popular', 'Monster', 473, 'can', 210, 54, 160, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['energy', 'bold', 'american', 'high-caffeine'], 90, 'USA'),
('SDR_MONSTER_ZERO', 'monster-zero-ultra', 'Monster Zero Ultra', 'Light, refreshing, zero sugar energy drink', 'energy', 'popular', 'Monster', 473, 'can', 0, 0, 140, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['energy', 'sugar-free', 'zero-calories', 'light'], 85, 'USA'),
('SDR_CELSIUS', 'celsius', 'Celsius Energy', 'Fitness-focused energy drink with green tea and ginger', 'energy', 'popular', 'Celsius', 355, 'can', 10, 0, 200, true, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['fitness', 'thermogenic', 'healthy', 'pre-workout'], 85, 'USA'),
('SDR_ROCKSTAR', 'rockstar', 'Rockstar Energy', 'Bold energy drink with a variety of B-vitamins', 'energy', 'classic', 'PepsiCo', 473, 'can', 250, 62, 160, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['energy', 'bold', 'american'], 75, 'USA'),

-- ============================================
-- OTHER (6 items)
-- ============================================
('SDR_ROOT_BEER', 'a-and-w-root-beer', 'A&W Root Beer', 'Classic American root beer with a creamy, smooth flavor', 'other', 'classic', 'A&W', 330, 'can', 170, 45, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['american', 'creamy', 'vanilla'], 75, 'USA'),
('SDR_CREAM_SODA', 'a-and-w-cream-soda', 'A&W Cream Soda', 'Sweet, creamy vanilla soda with a smooth finish', 'other', 'classic', 'A&W', 330, 'can', 180, 46, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['creamy', 'vanilla', 'sweet'], 65, 'USA'),
('SDR_ICED_TEA', 'lipton-iced-tea', 'Lipton Iced Tea', 'Refreshing iced tea with a hint of lemon', 'other', 'classic', 'Lipton', 500, 'bottle', 100, 25, 25, false, false, false, '{}', true, true, true, true, true, true, true, 0, ARRAY['tea', 'refreshing', 'lemon'], 80, 'USA'),
('SDR_ARIZONA_GREEN_TEA', 'arizona-green-tea', 'Arizona Green Tea with Honey', 'Smooth green tea sweetened with honey and ginseng', 'other', 'popular', 'Arizona', 680, 'can', 180, 42, 15, false, false, false, '{}', true, true, true, false, true, true, true, 0, ARRAY['tea', 'honey', 'ginseng', 'iconic-can'], 80, 'USA'),
('SDR_GRAPE_SODA', 'fanta-grape', 'Fanta Grape', 'Bold, sweet grape soda with vibrant purple color', 'other', 'active', 'Coca-Cola', 330, 'can', 160, 44, 0, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['fruity', 'grape', 'sweet'], 65, 'Germany'),
('SDR_LEMONADE', 'minute-maid-lemonade', 'Minute Maid Lemonade', 'Classic sweet and tangy lemonade', 'other', 'classic', 'Minute Maid', 355, 'can', 110, 28, 0, false, false, false, '{}', true, true, true, true, true, true, true, 0, ARRAY['citrus', 'refreshing', 'summer'], 75, 'USA')

ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    status = EXCLUDED.status,
    brand = EXCLUDED.brand,
    serving_size_ml = EXCLUDED.serving_size_ml,
    serving_style = EXCLUDED.serving_style,
    calories_per_serving = EXCLUDED.calories_per_serving,
    sugar_g = EXCLUDED.sugar_g,
    caffeine_mg = EXCLUDED.caffeine_mg,
    is_sugar_free = EXCLUDED.is_sugar_free,
    is_diet = EXCLUDED.is_diet,
    is_carbonated = EXCLUDED.is_carbonated,
    allergens = EXCLUDED.allergens,
    is_gluten_free = EXCLUDED.is_gluten_free,
    is_dairy_free = EXCLUDED.is_dairy_free,
    is_nut_free = EXCLUDED.is_nut_free,
    is_vegan = EXCLUDED.is_vegan,
    is_vegetarian = EXCLUDED.is_vegetarian,
    is_halal = EXCLUDED.is_halal,
    is_kosher = EXCLUDED.is_kosher,
    spice_level = EXCLUDED.spice_level,
    tags = EXCLUDED.tags,
    popularity = EXCLUDED.popularity,
    origin_country = EXCLUDED.origin_country,
    updated_at = NOW();
