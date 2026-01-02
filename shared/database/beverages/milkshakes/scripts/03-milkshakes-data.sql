-- ============================================
-- MILKSHAKES - Data Import
-- GUDBRO Database Standards v1.3
-- Total: 25 milkshakes
-- ============================================

INSERT INTO milkshakes (id, slug, name, description, category, status, primary_flavor, serving_size_ml, serving_style, calories_per_serving, protein_g, fat_g, sugar_g, has_whipped_cream, has_toppings, is_thick, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, spice_level, tags, popularity, origin_country) VALUES

-- ============================================
-- CLASSIC MILKSHAKES (6 items)
-- ============================================
('MKS_VANILLA', 'classic-vanilla', 'Classic Vanilla', 'Timeless creamy vanilla milkshake made with real vanilla ice cream', 'classic', 'classic', 'vanilla', 450, 'tall_glass', 450, 10, 18, 52, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'creamy', 'traditional'], 95, 'USA'),
('MKS_CHOCOLATE', 'classic-chocolate', 'Classic Chocolate', 'Rich and creamy chocolate milkshake with real cocoa', 'classic', 'classic', 'chocolate', 450, 'tall_glass', 480, 10, 20, 56, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'rich', 'chocolate'], 95, 'USA'),
('MKS_STRAWBERRY', 'classic-strawberry', 'Classic Strawberry', 'Sweet strawberry milkshake made with real strawberries', 'classic', 'classic', 'strawberry', 450, 'tall_glass', 420, 9, 16, 54, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'fruity', 'pink'], 92, 'USA'),
('MKS_MALTED_VANILLA', 'malted-vanilla', 'Malted Vanilla', 'Old-fashioned vanilla malt with that nostalgic flavor', 'classic', 'classic', 'vanilla', 450, 'tall_glass', 490, 12, 19, 58, true, false, true, ARRAY['dairy', 'gluten'], false, false, true, false, true, true, true, 0, ARRAY['malt', 'retro', '1950s'], 85, 'USA'),
('MKS_MALTED_CHOCOLATE', 'malted-chocolate', 'Malted Chocolate', 'Rich chocolate malt with that classic diner taste', 'classic', 'classic', 'chocolate', 450, 'tall_glass', 520, 12, 21, 60, true, false, true, ARRAY['dairy', 'gluten'], false, false, true, false, true, true, true, 0, ARRAY['malt', 'retro', 'diner'], 82, 'USA'),
('MKS_NEAPOLITAN', 'neapolitan', 'Neapolitan', 'Three flavors in one: vanilla, chocolate, and strawberry swirled', 'classic', 'popular', 'other', 500, 'tall_glass', 500, 11, 20, 58, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['tricolor', 'fun', 'classic'], 78, 'USA'),

-- ============================================
-- PREMIUM MILKSHAKES (6 items)
-- ============================================
('MKS_COOKIES_CREAM', 'cookies-and-cream', 'Cookies & Cream', 'Creamy vanilla shake loaded with crushed Oreo cookies', 'premium', 'popular', 'cookies', 500, 'tall_glass', 580, 11, 24, 62, true, true, true, ARRAY['dairy', 'gluten'], false, false, true, false, true, true, true, 0, ARRAY['oreo', 'popular', 'indulgent'], 94, 'USA'),
('MKS_PEANUT_BUTTER', 'peanut-butter', 'Peanut Butter Cup', 'Creamy peanut butter shake with chocolate swirls', 'premium', 'popular', 'peanut_butter', 500, 'tall_glass', 650, 18, 32, 48, true, true, true, ARRAY['dairy', 'peanuts'], true, false, false, false, true, true, true, 0, ARRAY['peanut', 'rich', 'protein'], 88, 'USA'),
('MKS_SALTED_CARAMEL', 'salted-caramel', 'Salted Caramel', 'Sweet and salty caramel shake with caramel drizzle', 'premium', 'popular', 'caramel', 500, 'tall_glass', 560, 10, 22, 64, true, true, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['salty-sweet', 'trendy', 'indulgent'], 86, 'USA'),
('MKS_BROWNIE', 'brownie-fudge', 'Brownie Fudge', 'Chocolate shake blended with real brownie pieces and hot fudge', 'premium', 'premium', 'chocolate', 500, 'tall_glass', 680, 12, 28, 72, true, true, true, ARRAY['dairy', 'gluten', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['fudge', 'decadent', 'brownie'], 82, 'USA'),
('MKS_COOKIE_DOUGH', 'cookie-dough', 'Cookie Dough', 'Vanilla shake loaded with edible cookie dough chunks', 'premium', 'popular', 'cookies', 500, 'tall_glass', 620, 11, 26, 66, true, true, true, ARRAY['dairy', 'gluten', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['cookie', 'chunks', 'indulgent'], 85, 'USA'),
('MKS_BIRTHDAY_CAKE', 'birthday-cake', 'Birthday Cake', 'Festive vanilla cake batter shake with rainbow sprinkles', 'premium', 'popular', 'vanilla', 500, 'tall_glass', 590, 10, 22, 70, true, true, true, ARRAY['dairy', 'gluten', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['celebration', 'colorful', 'fun'], 80, 'USA'),

-- ============================================
-- SPECIALTY MILKSHAKES (6 items)
-- ============================================
('MKS_MOCHA', 'mocha', 'Mocha Shake', 'Coffee and chocolate united in a creamy shake', 'specialty', 'popular', 'coffee', 450, 'tall_glass', 480, 11, 20, 52, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['coffee', 'chocolate', 'caffeine'], 84, 'USA'),
('MKS_ESPRESSO', 'espresso-shake', 'Espresso Shake', 'Bold espresso blended with vanilla ice cream', 'specialty', 'active', 'coffee', 450, 'tall_glass', 420, 10, 18, 46, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['coffee', 'strong', 'caffeine'], 78, 'Italy'),
('MKS_MINT_CHIP', 'mint-chocolate-chip', 'Mint Chocolate Chip', 'Cool mint shake with chocolate chips throughout', 'specialty', 'popular', 'other', 450, 'tall_glass', 490, 10, 22, 54, true, true, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['mint', 'refreshing', 'chocolate'], 82, 'USA'),
('MKS_BANANA', 'banana-split', 'Banana Split Shake', 'Classic banana split flavors in shake form', 'specialty', 'active', 'fruit', 500, 'tall_glass', 520, 11, 20, 58, true, true, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['banana', 'sundae', 'classic'], 76, 'USA'),
('MKS_BLACK_WHITE', 'black-and-white', 'Black & White', 'Half chocolate, half vanilla - the classic NYC shake', 'specialty', 'classic', 'other', 450, 'tall_glass', 460, 10, 18, 52, true, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['nyc', 'diner', 'two-tone'], 75, 'USA'),
('MKS_MAPLE_BACON', 'maple-bacon', 'Maple Bacon', 'Sweet maple shake topped with candied bacon', 'specialty', 'premium', 'caramel', 500, 'tall_glass', 620, 14, 28, 56, true, true, true, ARRAY['dairy'], true, false, true, false, false, false, true, 0, ARRAY['savory-sweet', 'bacon', 'unique'], 72, 'USA'),

-- ============================================
-- BOOZY MILKSHAKES (4 items)
-- ============================================
('MKS_MUDSLIDE', 'mudslide', 'Mudslide', 'Kahlúa, Irish cream, and vodka blended with ice cream', 'boozy', 'premium', 'coffee', 400, 'glass', 550, 8, 24, 42, true, true, true, ARRAY['dairy'], true, false, true, false, true, false, false, 0, ARRAY['cocktail', 'adult', 'coffee'], 85, 'USA'),
('MKS_IRISH_COFFEE', 'irish-coffee-shake', 'Irish Coffee Shake', 'Irish whiskey and coffee liqueur with vanilla shake', 'boozy', 'premium', 'coffee', 400, 'glass', 520, 8, 22, 38, true, true, true, ARRAY['dairy'], true, false, true, false, true, false, false, 0, ARRAY['irish', 'whiskey', 'coffee'], 78, 'Ireland'),
('MKS_BOURBON_CARAMEL', 'bourbon-caramel', 'Bourbon Caramel', 'Smooth bourbon with salted caramel shake', 'boozy', 'premium', 'caramel', 400, 'glass', 560, 8, 24, 48, true, true, true, ARRAY['dairy'], true, false, true, false, true, false, false, 0, ARRAY['bourbon', 'southern', 'caramel'], 76, 'USA'),
('MKS_SPIKED_CHOCOLATE', 'spiked-chocolate', 'Spiked Chocolate', 'Rich chocolate shake with dark rum', 'boozy', 'active', 'chocolate', 400, 'glass', 530, 9, 22, 46, true, false, true, ARRAY['dairy'], true, false, true, false, true, false, false, 0, ARRAY['rum', 'rich', 'adult'], 70, 'Caribbean'),

-- ============================================
-- HEALTHY MILKSHAKES (3 items)
-- ============================================
('MKS_PROTEIN_CHOCOLATE', 'protein-chocolate', 'Protein Chocolate Shake', 'High-protein chocolate shake with whey protein', 'healthy', 'popular', 'chocolate', 450, 'cup', 320, 30, 8, 24, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['protein', 'workout', 'fitness'], 82, 'USA'),
('MKS_DAIRY_FREE_VANILLA', 'dairy-free-vanilla', 'Dairy-Free Vanilla', 'Creamy oat milk vanilla shake, completely dairy-free', 'healthy', 'active', 'vanilla', 450, 'cup', 280, 6, 10, 32, false, false, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['vegan', 'dairy-free', 'oat'], 75, 'USA'),
('MKS_BANANA_DATE', 'banana-date', 'Banana Date Shake', 'Naturally sweet shake with dates and banana', 'healthy', 'active', 'fruit', 450, 'cup', 340, 8, 6, 48, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['natural', 'dates', 'california'], 72, 'USA')

ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    status = EXCLUDED.status,
    primary_flavor = EXCLUDED.primary_flavor,
    serving_size_ml = EXCLUDED.serving_size_ml,
    serving_style = EXCLUDED.serving_style,
    calories_per_serving = EXCLUDED.calories_per_serving,
    protein_g = EXCLUDED.protein_g,
    fat_g = EXCLUDED.fat_g,
    sugar_g = EXCLUDED.sugar_g,
    has_whipped_cream = EXCLUDED.has_whipped_cream,
    has_toppings = EXCLUDED.has_toppings,
    is_thick = EXCLUDED.is_thick,
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
