-- ============================================
-- HOT BEVERAGES - Data Import
-- GUDBRO Database Standards v1.3
-- Total: 25 hot beverages
-- ============================================

INSERT INTO hotbeverages (id, slug, name, description, category, status, base_type, flavor_profile, serving_size_ml, serving_style, optimal_temp_c, calories_per_serving, protein_g, sugar_g, caffeine_mg, has_foam, has_whipped_cream, is_caffeinated, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, spice_level, tags, popularity, origin_country) VALUES

-- ============================================
-- HOT CHOCOLATE (6 items)
-- ============================================
('HBV_CLASSIC_HOT_CHOCOLATE', 'classic-hot-chocolate', 'Classic Hot Chocolate', 'Rich and creamy hot chocolate made with real cocoa and steamed milk', 'chocolate', 'classic', 'milk', 'rich', 350, 'mug', 65, 280, 8, 32, 5, false, true, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'comfort', 'winter'], 95, 'Mexico'),
('HBV_DARK_HOT_CHOCOLATE', 'dark-hot-chocolate', 'Dark Hot Chocolate', 'Intense dark chocolate with 70% cacao for chocolate lovers', 'chocolate', 'premium', 'milk', 'rich', 350, 'mug', 65, 260, 7, 24, 15, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['dark', 'intense', 'artisan'], 82, 'Belgium'),
('HBV_WHITE_HOT_CHOCOLATE', 'white-hot-chocolate', 'White Hot Chocolate', 'Silky smooth white chocolate with creamy vanilla notes', 'chocolate', 'popular', 'milk', 'sweet', 350, 'mug', 60, 320, 7, 38, 0, false, true, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['sweet', 'creamy', 'vanilla'], 78, 'Switzerland'),
('HBV_MEXICAN_HOT_CHOCOLATE', 'mexican-hot-chocolate', 'Mexican Hot Chocolate', 'Traditional spiced chocolate with cinnamon and a hint of chili', 'chocolate', 'premium', 'milk', 'spiced', 350, 'mug', 70, 290, 8, 30, 8, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 2, ARRAY['spiced', 'cinnamon', 'traditional'], 80, 'Mexico'),
('HBV_PEPPERMINT_HOT_CHOCOLATE', 'peppermint-hot-chocolate', 'Peppermint Hot Chocolate', 'Festive hot chocolate with refreshing peppermint', 'chocolate', 'seasonal', 'milk', 'sweet', 350, 'mug', 65, 300, 8, 34, 5, false, true, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['holiday', 'mint', 'festive'], 85, 'USA'),
('HBV_VEGAN_HOT_CHOCOLATE', 'vegan-hot-chocolate', 'Vegan Hot Chocolate', 'Dairy-free hot chocolate made with oat milk and dark cacao', 'chocolate', 'active', 'oat_milk', 'rich', 350, 'mug', 65, 220, 4, 22, 10, false, false, false, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['vegan', 'dairy-free', 'plant-based'], 75, 'USA'),

-- ============================================
-- TEA LATTES (7 items)
-- ============================================
('HBV_CHAI_LATTE', 'chai-latte', 'Chai Latte', 'Spiced Indian tea with warm milk and aromatic spices', 'tea_latte', 'classic', 'milk', 'spiced', 350, 'cup', 65, 190, 6, 26, 50, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 1, ARRAY['indian', 'spiced', 'warming'], 92, 'India'),
('HBV_MATCHA_LATTE', 'matcha-latte', 'Matcha Latte', 'Japanese green tea powder whisked with steamed milk', 'tea_latte', 'popular', 'milk', 'earthy', 350, 'cup', 70, 160, 6, 18, 70, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['japanese', 'green-tea', 'antioxidants'], 90, 'Japan'),
('HBV_LONDON_FOG', 'london-fog', 'London Fog', 'Earl Grey tea with vanilla and steamed milk', 'tea_latte', 'popular', 'milk', 'creamy', 350, 'cup', 65, 150, 5, 20, 40, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['earl-grey', 'vanilla', 'english'], 85, 'Canada'),
('HBV_LAVENDER_LATTE', 'lavender-latte', 'Lavender Latte', 'Floral lavender with Earl Grey tea and steamed milk', 'tea_latte', 'premium', 'milk', 'herbal', 350, 'cup', 65, 140, 5, 18, 35, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['floral', 'calming', 'purple'], 72, 'France'),
('HBV_DIRTY_CHAI', 'dirty-chai', 'Dirty Chai', 'Chai latte with a shot of espresso for extra kick', 'tea_latte', 'popular', 'milk', 'spiced', 350, 'cup', 65, 210, 7, 26, 115, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 1, ARRAY['coffee', 'chai', 'caffeine'], 82, 'USA'),
('HBV_HOJICHA_LATTE', 'hojicha-latte', 'Hojicha Latte', 'Japanese roasted green tea with caramel notes and steamed milk', 'tea_latte', 'premium', 'milk', 'earthy', 350, 'cup', 65, 140, 5, 16, 20, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['japanese', 'roasted', 'low-caffeine'], 68, 'Japan'),
('HBV_ROOIBOS_LATTE', 'rooibos-latte', 'Rooibos Latte', 'South African red bush tea latte, naturally caffeine-free', 'tea_latte', 'active', 'milk', 'herbal', 350, 'cup', 65, 130, 5, 14, 0, true, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['african', 'caffeine-free', 'herbal'], 65, 'South Africa'),

-- ============================================
-- SPICED & GOLDEN DRINKS (6 items)
-- ============================================
('HBV_GOLDEN_MILK', 'golden-milk', 'Golden Milk', 'Anti-inflammatory turmeric latte with warming spices', 'spiced', 'popular', 'coconut_milk', 'spiced', 350, 'mug', 65, 120, 3, 10, 0, false, false, false, '{}', true, true, true, true, true, true, true, 1, ARRAY['turmeric', 'ayurvedic', 'wellness'], 85, 'India'),
('HBV_PUMPKIN_SPICE_LATTE', 'pumpkin-spice-latte', 'Pumpkin Spice', 'Seasonal favorite with pumpkin, cinnamon, and warming spices', 'spiced', 'seasonal', 'milk', 'spiced', 400, 'cup', 65, 250, 7, 36, 0, true, true, false, ARRAY['dairy'], true, false, true, false, true, true, true, 1, ARRAY['autumn', 'pumpkin', 'seasonal'], 92, 'USA'),
('HBV_GINGERBREAD_LATTE', 'gingerbread-latte', 'Gingerbread Latte', 'Holiday spiced latte with ginger, cinnamon, and molasses', 'spiced', 'seasonal', 'milk', 'spiced', 350, 'cup', 65, 220, 6, 32, 0, true, true, false, ARRAY['dairy'], true, false, true, false, true, true, true, 1, ARRAY['holiday', 'ginger', 'festive'], 80, 'Germany'),
('HBV_CINNAMON_DOLCE', 'cinnamon-dolce', 'Cinnamon Dolce', 'Sweet cinnamon-spiced steamed milk with brown sugar', 'spiced', 'popular', 'milk', 'sweet', 350, 'cup', 65, 200, 6, 28, 0, true, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 1, ARRAY['cinnamon', 'sweet', 'cozy'], 78, 'USA'),
('HBV_MAPLE_CINNAMON', 'maple-cinnamon-latte', 'Maple Cinnamon', 'Canadian-inspired latte with real maple syrup and cinnamon', 'spiced', 'active', 'milk', 'sweet', 350, 'cup', 65, 230, 6, 30, 0, true, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 1, ARRAY['maple', 'canadian', 'autumn'], 74, 'Canada'),
('HBV_BROWN_SUGAR_OAT', 'brown-sugar-oat-latte', 'Brown Sugar Oat', 'Trendy brown sugar syrup with creamy oat milk', 'spiced', 'popular', 'oat_milk', 'sweet', 350, 'cup', 65, 180, 4, 26, 0, true, false, false, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['trendy', 'oat', 'caramel'], 88, 'South Korea'),

-- ============================================
-- SPECIALTY & WELLNESS (6 items)
-- ============================================
('HBV_MUSHROOM_LATTE', 'mushroom-latte', 'Mushroom Latte', 'Adaptogenic mushroom blend with reishi and lion''s mane', 'specialty', 'premium', 'oat_milk', 'earthy', 350, 'mug', 65, 80, 3, 6, 0, true, false, false, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['adaptogenic', 'wellness', 'mushroom'], 72, 'USA'),
('HBV_MOON_MILK', 'moon-milk', 'Moon Milk', 'Calming bedtime drink with ashwagandha and lavender', 'specialty', 'active', 'milk', 'herbal', 300, 'mug', 55, 120, 5, 12, 0, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['sleep', 'calming', 'nighttime'], 68, 'India'),
('HBV_BEETROOT_LATTE', 'beetroot-latte', 'Beetroot Latte', 'Vibrant pink latte made with beetroot powder', 'specialty', 'active', 'oat_milk', 'earthy', 350, 'cup', 65, 110, 3, 14, 0, true, false, false, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['pink', 'superfood', 'instagram'], 65, 'Australia'),
('HBV_BLUE_LATTE', 'blue-spirulina-latte', 'Blue Spirulina Latte', 'Stunning blue latte with butterfly pea flower and coconut', 'specialty', 'premium', 'coconut_milk', 'creamy', 350, 'cup', 60, 100, 2, 12, 0, true, false, false, '{}', true, true, true, true, true, true, true, 0, ARRAY['blue', 'superfood', 'photogenic'], 70, 'Thailand'),
('HBV_SPANISH_LATTE', 'spanish-latte', 'Spanish Latte', 'Sweet condensed milk latte, popular in Spain and Asia', 'traditional', 'popular', 'milk', 'sweet', 300, 'glass', 60, 240, 7, 32, 0, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['spanish', 'sweet', 'condensed-milk'], 80, 'Spain'),
('HBV_TURKISH_SALEP', 'turkish-salep', 'Turkish Salep', 'Traditional warm orchid root drink with cinnamon', 'traditional', 'premium', 'milk', 'creamy', 300, 'cup', 65, 180, 6, 24, 0, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 1, ARRAY['turkish', 'orchid', 'traditional'], 60, 'Turkey')

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
    optimal_temp_c = EXCLUDED.optimal_temp_c,
    calories_per_serving = EXCLUDED.calories_per_serving,
    protein_g = EXCLUDED.protein_g,
    sugar_g = EXCLUDED.sugar_g,
    caffeine_mg = EXCLUDED.caffeine_mg,
    has_foam = EXCLUDED.has_foam,
    has_whipped_cream = EXCLUDED.has_whipped_cream,
    is_caffeinated = EXCLUDED.is_caffeinated,
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
