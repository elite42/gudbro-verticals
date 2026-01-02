-- ============================================
-- SMOOTHIES - Data Import
-- GUDBRO Database Standards v1.3
-- Total: 45 smoothies
-- ============================================

INSERT INTO smoothies (id, slug, name, description, category, status, base_type, flavor_profile, serving_size_ml, serving_style, calories_per_serving, protein_g, fiber_g, sugar_g, has_protein_boost, is_meal_replacement, is_blended, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, spice_level, tags, popularity, origin_country) VALUES

-- ============================================
-- FRUIT SMOOTHIES (10 items)
-- ============================================
('SMO_STRAWBERRY_BANANA', 'strawberry-banana', 'Strawberry Banana', 'Classic blend of sweet strawberries and ripe bananas with creamy yogurt', 'fruit', 'classic', 'yogurt', 'sweet', 400, 'cup', 220, 6, 4, 32, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'kids-favorite', 'creamy'], 95, 'USA'),
('SMO_MIXED_BERRY', 'mixed-berry', 'Mixed Berry Blast', 'A vibrant blend of blueberries, raspberries, and blackberries', 'fruit', 'popular', 'yogurt', 'tangy', 400, 'cup', 200, 5, 6, 28, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['antioxidants', 'berry', 'vibrant'], 90, 'USA'),
('SMO_MANGO_PASSION', 'mango-passion', 'Mango Passion', 'Tropical mango blended with tangy passion fruit', 'fruit', 'popular', 'juice', 'tropical', 400, 'cup', 180, 2, 3, 38, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['tropical', 'exotic', 'tangy'], 88, 'Brazil'),
('SMO_PEACH_MANGO', 'peach-mango', 'Peach Mango Paradise', 'Sweet peaches and ripe mangoes create a tropical escape', 'fruit', 'active', 'juice', 'sweet', 400, 'cup', 190, 2, 3, 36, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['summer', 'sweet', 'refreshing'], 82, 'USA'),
('SMO_WILD_BERRY', 'wild-berry', 'Wild Berry', 'Forest berries including wild strawberries and lingonberries', 'fruit', 'premium', 'yogurt', 'tangy', 400, 'cup', 195, 5, 5, 26, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['wild', 'nordic', 'antioxidants'], 75, 'Sweden'),
('SMO_APPLE_GINGER', 'apple-ginger', 'Apple Ginger Zing', 'Crisp green apples with a spicy ginger kick', 'fruit', 'active', 'juice', 'refreshing', 400, 'cup', 160, 1, 2, 32, false, false, true, '{}', true, true, true, true, true, true, true, 1, ARRAY['zesty', 'digestive', 'energizing'], 72, 'USA'),
('SMO_PINEAPPLE_COCONUT', 'pineapple-coconut', 'Piña Colada', 'Sweet pineapple and creamy coconut - virgin tropical delight', 'fruit', 'popular', 'coconut_water', 'tropical', 400, 'cup', 240, 3, 3, 35, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['tropical', 'caribbean', 'coconut'], 85, 'Puerto Rico'),
('SMO_WATERMELON_MINT', 'watermelon-mint', 'Watermelon Mint Refresh', 'Juicy watermelon with cooling fresh mint', 'fruit', 'seasonal', 'water', 'refreshing', 400, 'cup', 120, 2, 1, 24, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['summer', 'hydrating', 'cooling'], 78, 'USA'),
('SMO_CHERRY_VANILLA', 'cherry-vanilla', 'Cherry Vanilla Dream', 'Dark cherries swirled with vanilla yogurt', 'fruit', 'active', 'yogurt', 'sweet', 400, 'cup', 210, 6, 3, 30, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'indulgent', 'dessert'], 70, 'USA'),
('SMO_CITRUS_BURST', 'citrus-burst', 'Citrus Burst', 'Orange, grapefruit, and lemon for a vitamin C explosion', 'fruit', 'active', 'juice', 'tangy', 400, 'cup', 150, 2, 2, 28, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['vitamin-c', 'immunity', 'energizing'], 74, 'USA'),

-- ============================================
-- GREEN SMOOTHIES (8 items)
-- ============================================
('SMO_GREEN_MACHINE', 'green-machine', 'Green Machine', 'Spinach, kale, banana, and apple for a nutrient powerhouse', 'green', 'popular', 'almond_milk', 'earthy', 400, 'cup', 180, 4, 5, 22, false, false, true, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 0, ARRAY['detox', 'superfood', 'healthy'], 90, 'USA'),
('SMO_KALE_PINEAPPLE', 'kale-pineapple', 'Kale Pineapple Bliss', 'Tropical pineapple masks the earthy kale perfectly', 'green', 'popular', 'coconut_water', 'tropical', 400, 'cup', 170, 3, 4, 26, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['detox', 'tropical', 'healthy'], 85, 'USA'),
('SMO_SPINACH_MANGO', 'spinach-mango', 'Spinach Mango Glow', 'Mild spinach blended with sweet mango for a glowing smoothie', 'green', 'active', 'oat_milk', 'sweet', 400, 'cup', 185, 4, 4, 28, false, false, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['skin-health', 'gentle', 'nutritious'], 80, 'USA'),
('SMO_CUCUMBER_CELERY', 'cucumber-celery', 'Cucumber Celery Cleanse', 'Hydrating cucumber and celery with a hint of lime', 'green', 'active', 'water', 'refreshing', 400, 'cup', 80, 2, 3, 8, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['detox', 'hydrating', 'cleanse'], 72, 'USA'),
('SMO_AVOCADO_BANANA', 'avocado-banana', 'Avocado Banana Cream', 'Creamy avocado and banana for a satisfying green smoothie', 'green', 'premium', 'almond_milk', 'creamy', 400, 'cup', 280, 5, 7, 20, false, true, true, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 0, ARRAY['healthy-fats', 'filling', 'creamy'], 82, 'USA'),
('SMO_MATCHA_BANANA', 'matcha-banana', 'Matcha Banana Zen', 'Japanese matcha green tea with sweet banana', 'green', 'premium', 'oat_milk', 'earthy', 400, 'cup', 200, 5, 3, 22, false, false, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['japanese', 'antioxidants', 'energy'], 78, 'Japan'),
('SMO_SPIRULINA_TROPICAL', 'spirulina-tropical', 'Spirulina Tropical', 'Blue-green spirulina with mango and pineapple', 'green', 'premium', 'coconut_water', 'tropical', 400, 'cup', 175, 6, 3, 24, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['superfood', 'protein', 'tropical'], 70, 'USA'),
('SMO_WHEATGRASS_APPLE', 'wheatgrass-apple', 'Wheatgrass Apple Boost', 'Fresh wheatgrass with sweet apple and lemon', 'green', 'active', 'juice', 'earthy', 400, 'cup', 130, 3, 2, 20, false, false, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['detox', 'cleansing', 'alkalizing'], 65, 'USA'),

-- ============================================
-- PROTEIN SMOOTHIES (8 items)
-- ============================================
('SMO_PEANUT_BUTTER_BANANA', 'peanut-butter-banana', 'Peanut Butter Banana', 'Classic combo of creamy peanut butter and ripe banana', 'protein', 'classic', 'milk', 'creamy', 450, 'cup', 380, 18, 5, 28, true, true, true, ARRAY['peanuts', 'dairy'], true, false, false, false, true, true, true, 0, ARRAY['workout', 'filling', 'classic'], 92, 'USA'),
('SMO_CHOCOLATE_PROTEIN', 'chocolate-protein', 'Chocolate Protein Power', 'Rich chocolate with whey protein for muscle recovery', 'protein', 'popular', 'milk', 'sweet', 450, 'cup', 350, 25, 3, 22, true, true, true, ARRAY['dairy', 'soy'], true, false, true, false, true, true, true, 0, ARRAY['post-workout', 'chocolate', 'muscle'], 88, 'USA'),
('SMO_VANILLA_ALMOND', 'vanilla-almond', 'Vanilla Almond Protein', 'Smooth vanilla with almonds and protein powder', 'protein', 'popular', 'almond_milk', 'creamy', 450, 'cup', 320, 22, 4, 18, true, true, true, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 0, ARRAY['clean', 'workout', 'nutty'], 85, 'USA'),
('SMO_GREEK_YOGURT_BERRY', 'greek-yogurt-berry', 'Greek Yogurt Berry', 'High-protein Greek yogurt with mixed berries', 'protein', 'popular', 'yogurt', 'tangy', 400, 'cup', 280, 20, 4, 24, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['high-protein', 'probiotic', 'healthy'], 86, 'USA'),
('SMO_COFFEE_PROTEIN', 'coffee-protein', 'Coffee Protein Kick', 'Cold brew coffee with protein for morning energy', 'protein', 'popular', 'milk', 'creamy', 450, 'cup', 290, 20, 2, 16, true, true, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['caffeine', 'morning', 'energy'], 84, 'USA'),
('SMO_OAT_BANANA', 'oat-banana', 'Oat Banana Fuel', 'Rolled oats and banana for sustained energy', 'protein', 'active', 'oat_milk', 'sweet', 450, 'cup', 340, 12, 6, 26, true, true, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['fiber', 'filling', 'breakfast'], 78, 'USA'),
('SMO_HEMP_BERRY', 'hemp-berry', 'Hemp Berry Boost', 'Hemp seeds and mixed berries for plant protein', 'protein', 'premium', 'almond_milk', 'tangy', 400, 'cup', 260, 15, 5, 20, true, false, true, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 0, ARRAY['plant-protein', 'omega-3', 'vegan'], 72, 'USA'),
('SMO_COTTAGE_CHEESE_PEACH', 'cottage-cheese-peach', 'Cottage Cheese Peach', 'High-protein cottage cheese with sweet peaches', 'protein', 'active', 'milk', 'creamy', 400, 'cup', 250, 22, 2, 22, true, true, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['high-protein', 'low-fat', 'filling'], 68, 'USA'),

-- ============================================
-- SUPERFOOD SMOOTHIES (8 items)
-- ============================================
('SMO_ACAI_BOWL', 'acai-bowl', 'Açaí Bowl', 'Thick açaí blend topped with granola and fresh fruits', 'bowl', 'popular', 'juice', 'tangy', 350, 'bowl', 320, 5, 8, 35, false, true, true, ARRAY['tree_nuts'], false, true, false, true, true, true, true, 0, ARRAY['brazilian', 'antioxidants', 'instagram'], 95, 'Brazil'),
('SMO_PITAYA_BOWL', 'pitaya-bowl', 'Dragon Fruit Bowl', 'Vibrant pink pitaya bowl with tropical toppings', 'bowl', 'popular', 'coconut_water', 'tropical', 350, 'bowl', 280, 4, 6, 32, false, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['dragon-fruit', 'pink', 'tropical'], 88, 'Vietnam'),
('SMO_CHIA_BERRY', 'chia-berry', 'Chia Berry Omega', 'Chia seeds soaked with mixed berries for omega-3', 'superfood', 'active', 'almond_milk', 'tangy', 400, 'cup', 220, 8, 10, 18, false, false, true, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 0, ARRAY['omega-3', 'fiber', 'chia'], 80, 'Mexico'),
('SMO_GOJI_MANGO', 'goji-mango', 'Goji Mango Vitality', 'Antioxidant-rich goji berries with sweet mango', 'superfood', 'premium', 'coconut_water', 'sweet', 400, 'cup', 200, 5, 4, 30, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['goji', 'antioxidants', 'asian'], 75, 'China'),
('SMO_TURMERIC_MANGO', 'turmeric-mango', 'Golden Turmeric Mango', 'Anti-inflammatory turmeric with tropical mango', 'superfood', 'premium', 'coconut_water', 'tropical', 400, 'cup', 185, 3, 3, 28, false, false, true, '{}', true, true, true, true, true, true, true, 1, ARRAY['anti-inflammatory', 'golden', 'ayurvedic'], 78, 'India'),
('SMO_CACAO_AVOCADO', 'cacao-avocado', 'Cacao Avocado Indulgence', 'Raw cacao with creamy avocado for healthy indulgence', 'superfood', 'premium', 'almond_milk', 'creamy', 400, 'cup', 290, 6, 8, 16, false, false, true, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 0, ARRAY['chocolate', 'healthy-fats', 'indulgent'], 82, 'Mexico'),
('SMO_BEE_POLLEN', 'bee-pollen-boost', 'Bee Pollen Boost', 'Energizing bee pollen with banana and honey', 'superfood', 'active', 'yogurt', 'sweet', 400, 'cup', 230, 7, 3, 32, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['energy', 'natural', 'honey'], 68, 'USA'),
('SMO_MACA_CHOCOLATE', 'maca-chocolate', 'Maca Chocolate Energy', 'Peruvian maca root with rich chocolate', 'superfood', 'premium', 'almond_milk', 'earthy', 400, 'cup', 250, 8, 4, 20, true, false, true, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 0, ARRAY['maca', 'energy', 'peruvian'], 74, 'Peru'),

-- ============================================
-- TROPICAL SMOOTHIES (6 items)
-- ============================================
('SMO_TROPICAL_PARADISE', 'tropical-paradise', 'Tropical Paradise', 'Mango, pineapple, and papaya island blend', 'tropical', 'popular', 'coconut_water', 'tropical', 400, 'cup', 210, 3, 4, 38, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['island', 'vacation', 'exotic'], 92, 'Hawaii'),
('SMO_BAHAMA_MAMA', 'bahama-mama', 'Bahama Mama', 'Strawberry, banana, pineapple, and coconut', 'tropical', 'popular', 'coconut_water', 'tropical', 400, 'cup', 230, 3, 3, 36, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['caribbean', 'beach', 'fruity'], 88, 'Bahamas'),
('SMO_CARIBBEAN_BREEZE', 'caribbean-breeze', 'Caribbean Breeze', 'Papaya, guava, and passion fruit blend', 'tropical', 'active', 'juice', 'tropical', 400, 'cup', 195, 2, 4, 34, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['exotic', 'caribbean', 'tropical'], 80, 'Jamaica'),
('SMO_COCONUT_MANGO', 'coconut-mango', 'Coconut Mango Dream', 'Creamy coconut milk with sweet ripe mango', 'tropical', 'active', 'coconut_water', 'creamy', 400, 'cup', 220, 3, 3, 32, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['coconut', 'creamy', 'mango'], 82, 'Thailand'),
('SMO_LYCHEE_ROSE', 'lychee-rose', 'Lychee Rose', 'Delicate lychee with a hint of rose water', 'tropical', 'premium', 'coconut_water', 'sweet', 400, 'cup', 180, 2, 2, 30, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['asian', 'floral', 'delicate'], 72, 'China'),
('SMO_GUAVA_LIME', 'guava-lime', 'Guava Lime Twist', 'Sweet guava with zesty lime kick', 'tropical', 'active', 'juice', 'tangy', 400, 'cup', 170, 2, 3, 28, false, false, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['latin', 'zesty', 'refreshing'], 76, 'Mexico'),

-- ============================================
-- BOWL SMOOTHIES (5 items)
-- ============================================
('SMO_BLUE_SPIRULINA_BOWL', 'blue-spirulina-bowl', 'Blue Spirulina Bowl', 'Stunning blue spirulina bowl with tropical fruits', 'bowl', 'premium', 'coconut_water', 'tropical', 350, 'bowl', 290, 6, 5, 28, false, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['blue', 'superfood', 'instagram'], 85, 'USA'),
('SMO_GREEN_GODDESS_BOWL', 'green-goddess-bowl', 'Green Goddess Bowl', 'Avocado, spinach, and kiwi bowl with seeds', 'bowl', 'premium', 'almond_milk', 'creamy', 350, 'bowl', 310, 8, 9, 22, false, true, true, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 0, ARRAY['green', 'healthy', 'filling'], 82, 'USA'),
('SMO_CHOCOLATE_PEANUT_BOWL', 'chocolate-peanut-bowl', 'Chocolate Peanut Butter Bowl', 'Thick chocolate PB bowl with banana and granola', 'bowl', 'popular', 'milk', 'creamy', 350, 'bowl', 420, 15, 6, 32, true, true, true, ARRAY['peanuts', 'dairy'], false, false, false, false, true, true, true, 0, ARRAY['indulgent', 'chocolate', 'filling'], 88, 'USA'),
('SMO_MANGO_CHIA_BOWL', 'mango-chia-bowl', 'Mango Chia Bowl', 'Sweet mango bowl with chia pudding base', 'bowl', 'active', 'coconut_water', 'sweet', 350, 'bowl', 260, 6, 8, 30, false, true, true, '{}', true, true, true, true, true, true, true, 0, ARRAY['chia', 'tropical', 'omega-3'], 78, 'Thailand'),
('SMO_BERRY_GRANOLA_BOWL', 'berry-granola-bowl', 'Berry Granola Bowl', 'Mixed berry bowl loaded with crunchy granola', 'bowl', 'active', 'yogurt', 'tangy', 350, 'bowl', 340, 10, 7, 34, false, true, true, ARRAY['dairy', 'gluten'], false, false, true, false, true, true, true, 0, ARRAY['breakfast', 'crunchy', 'berry'], 80, 'USA')

ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    status = EXCLUDED.status,
    base_type = EXCLUDED.base_type,
    flavor_profile = EXCLUDED.flavor_profile,
    serving_size_ml = EXCLUDED.serving_size_ml,
    serving_style = EXCLUDED.serving_style,
    calories_per_serving = EXCLUDED.calories_per_serving,
    protein_g = EXCLUDED.protein_g,
    fiber_g = EXCLUDED.fiber_g,
    sugar_g = EXCLUDED.sugar_g,
    has_protein_boost = EXCLUDED.has_protein_boost,
    is_meal_replacement = EXCLUDED.is_meal_replacement,
    is_blended = EXCLUDED.is_blended,
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
