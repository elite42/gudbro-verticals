-- ============================================
-- VEGETARIAN DATABASE - Complete Import
-- Version: 1.0 (DATABASE-STANDARDS v1.1 compliant)
-- Created: 2025-12-18
-- Total: 65 dishes
-- ============================================
--
-- EXECUTION ORDER:
-- 1. Run 01-vegetarian-missing-ingredients.sql FIRST (creates needed ingredients)
-- 2. Run THIS file SECOND (creates table + inserts products)
-- 3. Run 03-vegetarian-product-ingredients.sql THIRD (creates junction links)
-- ============================================

-- Drop table if exists (for fresh start)
DROP TABLE IF EXISTS vegetarian CASCADE;

-- Create the vegetarian table
CREATE TABLE vegetarian (
    -- IDENTIFICATION
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,

    -- INFO BASE (English only - translations in separate table)
    name TEXT NOT NULL,
    description TEXT,

    -- CLASSIFICATION (TEXT + CHECK instead of ENUM per v1.1)
    category TEXT NOT NULL CHECK (category IN (
        'tofu_dishes',
        'tempeh_dishes',
        'seitan_dishes',
        'legume_dishes',
        'grain_bowls',
        'vegetable_mains',
        'indian_mains',
        'asian_mains',
        'mediterranean_mains'
    )),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active', 'popular', 'signature', 'classic', 'premium', 'seasonal'
    )),

    -- VEGETARIAN-SPECIFIC FIELDS
    cuisine TEXT NOT NULL CHECK (cuisine IN (
        'indian', 'thai', 'chinese', 'japanese', 'korean', 'vietnamese',
        'mediterranean', 'middle_eastern', 'mexican', 'american',
        'italian', 'ethiopian', 'international', 'fusion', 'asian'
    )),
    protein_source TEXT NOT NULL CHECK (protein_source IN (
        'tofu', 'tempeh', 'seitan', 'legumes', 'paneer', 'eggs',
        'mushrooms', 'jackfruit', 'cauliflower', 'nuts_seeds', 'quinoa', 'mixed'
    )),
    is_vegan BOOLEAN NOT NULL DEFAULT false,
    is_high_protein BOOLEAN NOT NULL DEFAULT false,
    cooking_method TEXT,

    -- INGREDIENTS (for reference - actual links in product_ingredients)
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- SISTEMA 5 DIMENSIONI - ALLERGENS (JSONB per flessibilità)
    allergens JSONB DEFAULT '[]'::jsonb,

    -- SISTEMA 5 DIMENSIONI - DIETARY FLAGS
    is_gluten_free BOOLEAN NOT NULL DEFAULT false,
    is_dairy_free BOOLEAN NOT NULL DEFAULT false,
    is_nut_free BOOLEAN NOT NULL DEFAULT true,
    is_soy_free BOOLEAN NOT NULL DEFAULT true,
    is_vegetarian BOOLEAN NOT NULL DEFAULT true,
    is_halal BOOLEAN NOT NULL DEFAULT true,
    is_kosher BOOLEAN NOT NULL DEFAULT true,

    -- SISTEMA 5 DIMENSIONI - NUTRITION
    calories_per_serving INTEGER,
    protein_g DECIMAL(5,1),
    carbs_g DECIMAL(5,1),
    fat_g DECIMAL(5,1),
    fiber_g DECIMAL(5,1),

    -- SISTEMA 5 DIMENSIONI - SPICE
    spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- METADATA
    tags JSONB DEFAULT '[]'::jsonb,
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

    -- DISPLAY ORDER
    sort_order INTEGER,
    is_signature BOOLEAN DEFAULT false,

    -- TIMESTAMPS
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_vegetarian_category ON vegetarian(category);
CREATE INDEX idx_vegetarian_cuisine ON vegetarian(cuisine);
CREATE INDEX idx_vegetarian_protein_source ON vegetarian(protein_source);
CREATE INDEX idx_vegetarian_is_vegan ON vegetarian(is_vegan);
CREATE INDEX idx_vegetarian_is_high_protein ON vegetarian(is_high_protein);
CREATE INDEX idx_vegetarian_is_gluten_free ON vegetarian(is_gluten_free);
CREATE INDEX idx_vegetarian_spice_level ON vegetarian(spice_level);
CREATE INDEX idx_vegetarian_popularity ON vegetarian(popularity DESC);
CREATE INDEX idx_vegetarian_tags ON vegetarian USING GIN(tags);
CREATE INDEX idx_vegetarian_allergens ON vegetarian USING GIN(allergens);
CREATE INDEX idx_vegetarian_ingredient_ids ON vegetarian USING GIN(ingredient_ids);

-- ============================================
-- TRIGGER FOR updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_vegetarian_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_vegetarian_updated_at
    BEFORE UPDATE ON vegetarian
    FOR EACH ROW
    EXECUTE FUNCTION update_vegetarian_updated_at();

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE vegetarian ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on vegetarian"
    ON vegetarian FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated write access on vegetarian"
    ON vegetarian FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE vegetarian IS 'Vegetarian and vegan main dishes - DATABASE-STANDARDS v1.1 compliant';
COMMENT ON COLUMN vegetarian.id IS 'Format: VEG_{NAME}';
COMMENT ON COLUMN vegetarian.category IS 'Type of dish: tofu_dishes, tempeh_dishes, seitan_dishes, legume_dishes, grain_bowls, vegetable_mains, indian_mains, asian_mains, mediterranean_mains';
COMMENT ON COLUMN vegetarian.protein_source IS 'Primary protein in the dish';
COMMENT ON COLUMN vegetarian.is_vegan IS 'True if no dairy or eggs';
COMMENT ON COLUMN vegetarian.is_high_protein IS 'True if 15g+ protein per serving';
COMMENT ON COLUMN vegetarian.spice_level IS 'Scale 0-5 (0=none, 5=extreme)';

-- ============================================
-- DATA IMPORT - TOFU DISHES (8 items)
-- ============================================

INSERT INTO vegetarian (id, slug, name, description, category, status, cuisine, protein_source, is_vegan, is_high_protein, cooking_method, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_soy_free, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, fiber_g, spice_level, tags, popularity) VALUES
('VEG_MAPO_TOFU', 'mapo-tofu', 'Mapo Tofu', 'Classic Sichuan dish of silken tofu in a spicy, numbing sauce with fermented black beans and chili oil. Traditionally contains pork but this version is fully vegetarian.', 'tofu_dishes', 'classic', 'chinese', 'tofu', true, true, 'braised', ARRAY['ING_TOFU_SILKEN', 'ING_DOUBANJIANG', 'ING_SICHUAN_PEPPERCORN', 'ING_GARLIC', 'ING_GINGER', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_GREEN_ONION'], '["soy", "sesame"]'::jsonb, false, true, true, false, true, true, true, 220, 14, 12, 14, 2, 4, '["sichuan", "spicy", "numbing", "vegan", "classic"]'::jsonb, 92),
('VEG_TOFU_STIR_FRY', 'tofu-vegetable-stir-fry', 'Tofu Vegetable Stir-Fry', 'Crispy pan-fried tofu cubes with colorful vegetables in a savory garlic-ginger sauce. A quick, healthy, and satisfying weeknight meal.', 'tofu_dishes', 'popular', 'asian', 'tofu', true, true, 'stir-fried', ARRAY['ING_TOFU_FIRM', 'ING_BROCCOLI', 'ING_BELL_PEPPER', 'ING_CARROT', 'ING_GARLIC', 'ING_GINGER', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_VEGETABLE_OIL'], '["soy", "sesame"]'::jsonb, false, true, true, false, true, true, true, 280, 18, 16, 18, 5, 1, '["quick", "healthy", "vegan", "weeknight"]'::jsonb, 88),
('VEG_KUNG_PAO_TOFU', 'kung-pao-tofu', 'Kung Pao Tofu', 'Crispy tofu cubes in a sweet, savory, and spicy Sichuan sauce with peanuts, dried chilies, and Sichuan peppercorns.', 'tofu_dishes', 'popular', 'chinese', 'tofu', true, true, 'stir-fried', ARRAY['ING_TOFU_FIRM', 'ING_PEANUTS', 'ING_DRIED_CHILI', 'ING_SICHUAN_PEPPERCORN', 'ING_SOY_SAUCE', 'ING_RICE_VINEGAR', 'ING_GARLIC', 'ING_GREEN_ONION'], '["soy", "peanuts"]'::jsonb, false, true, false, false, true, true, true, 320, 20, 18, 20, 3, 3, '["sichuan", "spicy", "peanuts", "vegan"]'::jsonb, 85),
('VEG_AGEDASHI_TOFU', 'agedashi-tofu', 'Agedashi Tofu', 'Japanese deep-fried silken tofu in a light, savory dashi broth topped with grated daikon, ginger, and bonito flakes. Light and delicate.', 'tofu_dishes', 'classic', 'japanese', 'tofu', false, true, 'deep-fried', ARRAY['ING_TOFU_SILKEN', 'ING_DASHI', 'ING_SOY_SAUCE', 'ING_MIRIN', 'ING_DAIKON', 'ING_GINGER', 'ING_GREEN_ONION', 'ING_POTATO_STARCH'], '["soy", "fish"]'::jsonb, false, true, true, false, false, false, false, 180, 12, 14, 10, 1, 0, '["japanese", "delicate", "fried", "appetizer"]'::jsonb, 78),
('VEG_THAI_BASIL_TOFU', 'thai-basil-tofu', 'Thai Basil Tofu', 'Spicy Thai stir-fry with crispy tofu, Thai basil, chilies, and garlic. Aromatic and full of bold flavors.', 'tofu_dishes', 'popular', 'thai', 'tofu', true, true, 'stir-fried', ARRAY['ING_TOFU_FIRM', 'ING_THAI_BASIL', 'ING_THAI_CHILI', 'ING_GARLIC', 'ING_SOY_SAUCE', 'ING_OYSTER_SAUCE_VEGAN', 'ING_VEGETABLE_OIL'], '["soy"]'::jsonb, false, true, true, false, true, true, true, 260, 16, 12, 18, 2, 4, '["thai", "spicy", "basil", "vegan", "aromatic"]'::jsonb, 82),
('VEG_TERIYAKI_TOFU', 'teriyaki-tofu', 'Teriyaki Tofu', 'Glazed tofu steaks in sweet and savory teriyaki sauce, grilled or pan-fried until caramelized. Served with steamed rice and vegetables.', 'tofu_dishes', 'popular', 'japanese', 'tofu', true, true, 'grilled', ARRAY['ING_TOFU_EXTRA_FIRM', 'ING_SOY_SAUCE', 'ING_MIRIN', 'ING_SAKE', 'ING_SUGAR', 'ING_GINGER', 'ING_GARLIC', 'ING_SESAME_SEEDS'], '["soy", "sesame"]'::jsonb, false, true, true, false, true, true, true, 290, 18, 24, 14, 2, 0, '["japanese", "sweet", "glazed", "vegan"]'::jsonb, 86),
('VEG_TOFU_TIKKA_MASALA', 'tofu-tikka-masala', 'Tofu Tikka Masala', 'Marinated tofu cubes in a rich, creamy tomato-based curry sauce with Indian spices. A plant-based twist on the British-Indian classic.', 'tofu_dishes', 'popular', 'indian', 'tofu', true, true, 'simmered', ARRAY['ING_TOFU_FIRM', 'ING_COCONUT_CREAM', 'ING_TOMATO', 'ING_ONION', 'ING_GARAM_MASALA', 'ING_CUMIN', 'ING_TURMERIC', 'ING_GARLIC', 'ING_GINGER'], '["soy"]'::jsonb, true, true, true, false, true, true, true, 340, 18, 22, 22, 4, 2, '["indian", "curry", "creamy", "vegan"]'::jsonb, 84),
('VEG_KOREAN_TOFU_STEW', 'sundubu-jjigae', 'Sundubu Jjigae', 'Korean soft tofu stew with gochugaru (red pepper flakes), vegetables, and often served bubbling hot in a stone pot. Comforting and spicy.', 'tofu_dishes', 'classic', 'korean', 'tofu', true, true, 'simmered', ARRAY['ING_TOFU_SILKEN', 'ING_GOCHUGARU', 'ING_GOCHUJANG', 'ING_ZUCCHINI', 'ING_MUSHROOMS', 'ING_ONION', 'ING_GARLIC', 'ING_SESAME_OIL', 'ING_VEGETABLE_BROTH'], '["soy", "sesame"]'::jsonb, false, true, true, false, true, true, true, 200, 14, 16, 10, 3, 4, '["korean", "stew", "spicy", "comfort", "vegan"]'::jsonb, 80);

-- ============================================
-- DATA IMPORT - TEMPEH & SEITAN DISHES (9 items)
-- ============================================

INSERT INTO vegetarian (id, slug, name, description, category, status, cuisine, protein_source, is_vegan, is_high_protein, cooking_method, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_soy_free, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, fiber_g, spice_level, tags, popularity) VALUES
('VEG_TEMPEH_BACON', 'tempeh-bacon', 'Tempeh Bacon', 'Thinly sliced tempeh marinated in smoky maple glaze, pan-fried until crispy. A savory, protein-rich alternative to bacon.', 'tempeh_dishes', 'popular', 'american', 'tempeh', true, true, 'pan-fried', ARRAY['ING_TEMPEH', 'ING_MAPLE_SYRUP', 'ING_SOY_SAUCE', 'ING_LIQUID_SMOKE', 'ING_SMOKED_PAPRIKA', 'ING_GARLIC_POWDER', 'ING_VEGETABLE_OIL'], '["soy"]'::jsonb, true, true, true, false, true, true, true, 180, 16, 12, 10, 4, 0, '["breakfast", "smoky", "crispy", "vegan", "high-protein"]'::jsonb, 82),
('VEG_TEMPEH_STIR_FRY', 'indonesian-tempeh-stir-fry', 'Indonesian Tempeh Stir-Fry', 'Traditional Indonesian kering tempeh - crispy tempeh cubes stir-fried with sweet soy sauce, chilies, and peanuts. Sweet, spicy, and addictive.', 'tempeh_dishes', 'classic', 'asian', 'tempeh', true, true, 'stir-fried', ARRAY['ING_TEMPEH', 'ING_KECAP_MANIS', 'ING_THAI_CHILI', 'ING_PEANUTS', 'ING_GARLIC', 'ING_SHALLOT', 'ING_VEGETABLE_OIL'], '["soy", "peanuts"]'::jsonb, false, true, false, false, true, true, true, 320, 22, 20, 18, 6, 3, '["indonesian", "crispy", "sweet", "spicy", "vegan"]'::jsonb, 78),
('VEG_BBQ_TEMPEH', 'bbq-tempeh', 'BBQ Tempeh', 'Smoky barbecue-glazed tempeh, grilled or baked until caramelized. Perfect for sandwiches, bowls, or as a main protein.', 'tempeh_dishes', 'popular', 'american', 'tempeh', true, true, 'grilled', ARRAY['ING_TEMPEH', 'ING_BBQ_SAUCE', 'ING_APPLE_CIDER_VINEGAR', 'ING_SMOKED_PAPRIKA', 'ING_GARLIC', 'ING_ONION_POWDER'], '["soy"]'::jsonb, true, true, true, false, true, true, true, 280, 20, 22, 12, 5, 1, '["bbq", "smoky", "grilled", "vegan", "american"]'::jsonb, 80),
('VEG_TEMPEH_TACOS', 'tempeh-tacos', 'Tempeh Tacos', 'Crumbled tempeh seasoned with Mexican spices, served in corn tortillas with fresh salsa, guacamole, and lime.', 'tempeh_dishes', 'popular', 'mexican', 'tempeh', true, true, 'pan-fried', ARRAY['ING_TEMPEH', 'ING_CUMIN', 'ING_CHILE_POWDER', 'ING_CORN_TORTILLA', 'ING_SALSA_VERDE', 'ING_GUACAMOLE', 'ING_LIME', 'ING_CILANTRO'], '["soy"]'::jsonb, true, true, true, false, true, true, true, 340, 22, 32, 16, 8, 2, '["mexican", "tacos", "vegan", "high-protein"]'::jsonb, 84),
('VEG_SEITAN_STEAK', 'seitan-steak', 'Seitan Steak', 'Thick-cut seitan steak with meaty texture, grilled and served with peppercorn sauce. High-protein vegan alternative to beef steak.', 'seitan_dishes', 'signature', 'american', 'seitan', true, true, 'grilled', ARRAY['ING_SEITAN', 'ING_SOY_SAUCE', 'ING_VEGETABLE_BROTH', 'ING_BLACK_PEPPER', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_THYME'], '["gluten", "soy"]'::jsonb, false, true, true, false, true, true, true, 320, 44, 8, 12, 1, 1, '["high-protein", "meaty", "grilled", "vegan", "steak"]'::jsonb, 82),
('VEG_SEITAN_GYROS', 'seitan-gyros', 'Seitan Gyros', 'Seasoned seitan strips with Greek spices, served in warm pita with tzatziki, tomatoes, onions, and fresh herbs.', 'seitan_dishes', 'popular', 'mediterranean', 'seitan', false, true, 'grilled', ARRAY['ING_SEITAN', 'ING_OREGANO', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_PITA_BREAD', 'ING_TZATZIKI', 'ING_TOMATO', 'ING_RED_ONION', 'ING_LETTUCE'], '["gluten", "soy", "milk"]'::jsonb, false, false, true, false, true, true, true, 420, 36, 38, 14, 4, 1, '["greek", "mediterranean", "wrap", "high-protein"]'::jsonb, 78),
('VEG_SEITAN_WINGS', 'seitan-buffalo-wings', 'Seitan Buffalo Wings', 'Crispy seitan pieces tossed in spicy buffalo sauce, served with vegan ranch or blue cheese dip. Game day favorite.', 'seitan_dishes', 'popular', 'american', 'seitan', true, true, 'deep-fried', ARRAY['ING_SEITAN', 'ING_HOT_SAUCE', 'ING_VEGAN_BUTTER', 'ING_GARLIC_POWDER', 'ING_FLOUR', 'ING_VEGETABLE_OIL'], '["gluten", "soy"]'::jsonb, false, true, true, false, true, true, true, 380, 32, 18, 20, 2, 4, '["spicy", "fried", "american", "game-day", "vegan"]'::jsonb, 80),
('VEG_SEITAN_SCHNITZEL', 'seitan-schnitzel', 'Seitan Schnitzel', 'Breaded and pan-fried seitan cutlet, German-style. Crispy golden coating with tender protein center, served with lemon.', 'seitan_dishes', 'classic', 'international', 'seitan', true, true, 'pan-fried', ARRAY['ING_SEITAN', 'ING_BREADCRUMBS', 'ING_FLOUR', 'ING_PLANT_MILK', 'ING_LEMON', 'ING_VEGETABLE_OIL', 'ING_SALT', 'ING_PEPPER'], '["gluten", "soy"]'::jsonb, false, true, true, false, true, true, true, 420, 38, 28, 18, 2, 0, '["german", "crispy", "fried", "vegan", "european"]'::jsonb, 75),
('VEG_SEITAN_KEBABS', 'seitan-kebabs', 'Seitan Kebabs', 'Marinated seitan chunks grilled on skewers with bell peppers, onions, and zucchini. Middle Eastern inspired spices.', 'seitan_dishes', 'popular', 'middle_eastern', 'seitan', true, true, 'grilled', ARRAY['ING_SEITAN', 'ING_BELL_PEPPER', 'ING_RED_ONION', 'ING_ZUCCHINI', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_LEMON'], '["gluten", "soy"]'::jsonb, false, true, true, false, true, true, true, 300, 36, 14, 12, 4, 2, '["grilled", "skewers", "middle-eastern", "vegan", "high-protein"]'::jsonb, 77);

-- ============================================
-- DATA IMPORT - LEGUME DISHES (8 items)
-- ============================================

INSERT INTO vegetarian (id, slug, name, description, category, status, cuisine, protein_source, is_vegan, is_high_protein, cooking_method, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_soy_free, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, fiber_g, spice_level, tags, popularity) VALUES
('VEG_CHANA_MASALA', 'chana-masala', 'Chana Masala', 'Classic North Indian chickpea curry in a spiced tomato-onion gravy. Aromatic with cumin, coriander, and garam masala. A protein-packed comfort food.', 'legume_dishes', 'classic', 'indian', 'legumes', true, true, 'simmered', ARRAY['ING_CHICKPEAS', 'ING_TOMATO', 'ING_ONION', 'ING_GARAM_MASALA', 'ING_CUMIN', 'ING_CORIANDER', 'ING_TURMERIC', 'ING_GINGER', 'ING_GARLIC', 'ING_CILANTRO'], '[]'::jsonb, true, true, true, true, true, true, true, 280, 12, 42, 8, 10, 2, '["indian", "curry", "chickpeas", "vegan", "comfort"]'::jsonb, 92),
('VEG_DAL_TADKA', 'dal-tadka', 'Dal Tadka', 'Yellow lentils tempered with ghee, cumin, and dried chilies. A staple of Indian cuisine, creamy and comforting.', 'legume_dishes', 'classic', 'indian', 'legumes', false, true, 'simmered', ARRAY['ING_YELLOW_LENTILS', 'ING_GHEE', 'ING_CUMIN_SEEDS', 'ING_DRIED_CHILI', 'ING_TURMERIC', 'ING_TOMATO', 'ING_GARLIC', 'ING_GINGER', 'ING_CILANTRO'], '["milk"]'::jsonb, true, false, true, true, true, true, true, 240, 14, 32, 8, 8, 2, '["indian", "lentils", "comfort", "dal"]'::jsonb, 90),
('VEG_FALAFEL', 'falafel', 'Falafel', 'Crispy deep-fried balls made from ground chickpeas and fresh herbs. Middle Eastern street food classic, served with tahini.', 'legume_dishes', 'classic', 'middle_eastern', 'legumes', true, true, 'deep-fried', ARRAY['ING_CHICKPEAS', 'ING_PARSLEY', 'ING_CILANTRO', 'ING_CUMIN', 'ING_CORIANDER', 'ING_GARLIC', 'ING_ONION', 'ING_TAHINI', 'ING_VEGETABLE_OIL'], '["sesame"]'::jsonb, true, true, true, true, true, true, true, 340, 14, 32, 18, 8, 1, '["middle-eastern", "street-food", "fried", "vegan", "chickpeas"]'::jsonb, 94),
('VEG_BLACK_BEAN_BURGER', 'black-bean-burger', 'Black Bean Burger', 'Hearty homemade veggie burger patty made with black beans, corn, and Southwest spices. Smoky, satisfying, and protein-rich.', 'legume_dishes', 'popular', 'american', 'legumes', true, true, 'grilled', ARRAY['ING_BLACK_BEANS', 'ING_CORN_KERNELS', 'ING_RED_ONION', 'ING_CUMIN', 'ING_SMOKED_PAPRIKA', 'ING_BREADCRUMBS', 'ING_GARLIC', 'ING_CILANTRO'], '["gluten"]'::jsonb, false, true, true, true, true, true, true, 320, 16, 42, 10, 12, 1, '["burger", "american", "southwest", "vegan", "black-beans"]'::jsonb, 86),
('VEG_LENTIL_SOUP', 'middle-eastern-lentil-soup', 'Middle Eastern Lentil Soup', 'Warming red lentil soup with cumin, lemon, and a drizzle of olive oil. Simple, nutritious, and deeply satisfying.', 'legume_dishes', 'classic', 'middle_eastern', 'legumes', true, true, 'simmered', ARRAY['ING_RED_LENTILS', 'ING_CUMIN', 'ING_ONION', 'ING_CARROT', 'ING_GARLIC', 'ING_LEMON', 'ING_OLIVE_OIL', 'ING_VEGETABLE_BROTH'], '[]'::jsonb, true, true, true, true, true, true, true, 220, 14, 34, 4, 8, 1, '["soup", "middle-eastern", "lentils", "vegan", "comfort"]'::jsonb, 85),
('VEG_RAJMA', 'rajma', 'Rajma', 'North Indian red kidney bean curry in a thick, spiced tomato gravy. A beloved Punjabi comfort food, typically served with rice.', 'legume_dishes', 'classic', 'indian', 'legumes', true, true, 'simmered', ARRAY['ING_KIDNEY_BEANS', 'ING_TOMATO', 'ING_ONION', 'ING_GARAM_MASALA', 'ING_CUMIN', 'ING_GINGER', 'ING_GARLIC', 'ING_KASHMIRI_CHILI'], '[]'::jsonb, true, true, true, true, true, true, true, 260, 14, 40, 6, 12, 2, '["indian", "punjabi", "kidney-beans", "vegan", "comfort"]'::jsonb, 82),
('VEG_HUMMUS_BOWL', 'loaded-hummus-bowl', 'Loaded Hummus Bowl', E'Creamy hummus topped with crispy chickpeas, olive oil, za\'atar, pine nuts, and warm pita. A Mediterranean mezze centerpiece.', 'legume_dishes', 'popular', 'mediterranean', 'legumes', true, true, 'raw', ARRAY['ING_HUMMUS', 'ING_CHICKPEAS', 'ING_OLIVE_OIL', 'ING_ZAATAR', 'ING_PINE_NUTS', 'ING_PAPRIKA', 'ING_PITA_BREAD'], '["sesame", "gluten", "nuts"]'::jsonb, false, true, false, true, true, true, true, 380, 14, 36, 22, 8, 0, '["mediterranean", "mezze", "hummus", "vegan"]'::jsonb, 88),
('VEG_FEIJOADA_VEGAN', 'vegan-feijoada', E'Vegan Feijoada', E'Plant-based version of Brazil\'s national dish. Black beans slow-cooked with smoked tofu, vegetables, and aromatic spices.', 'legume_dishes', 'signature', 'international', 'legumes', true, true, 'braised', ARRAY['ING_BLACK_BEANS', 'ING_SMOKED_TOFU', 'ING_ONION', 'ING_GARLIC', 'ING_BAY_LEAVES', 'ING_CUMIN', 'ING_ORANGE', 'ING_VEGETABLE_OIL'], '["soy"]'::jsonb, true, true, true, false, true, true, true, 340, 18, 44, 10, 14, 1, '["brazilian", "black-beans", "vegan", "hearty"]'::jsonb, 72);

-- ============================================
-- DATA IMPORT - GRAIN BOWLS (8 items)
-- ============================================

INSERT INTO vegetarian (id, slug, name, description, category, status, cuisine, protein_source, is_vegan, is_high_protein, cooking_method, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_soy_free, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, fiber_g, spice_level, tags, popularity) VALUES
('VEG_BUDDHA_BOWL', 'buddha-bowl', 'Buddha Bowl', 'Nourishing bowl with quinoa, roasted sweet potato, chickpeas, avocado, kale, and tahini dressing. Balanced, colorful, and satisfying.', 'grain_bowls', 'popular', 'international', 'mixed', true, true, 'roasted', ARRAY['ING_QUINOA', 'ING_SWEET_POTATO', 'ING_CHICKPEAS', 'ING_AVOCADO', 'ING_KALE', 'ING_TAHINI', 'ING_LEMON', 'ING_OLIVE_OIL'], '["sesame"]'::jsonb, true, true, true, true, true, true, true, 480, 18, 56, 22, 14, 0, '["bowl", "healthy", "vegan", "balanced", "colorful"]'::jsonb, 94),
('VEG_KOREAN_BIBIMBAP', 'vegetarian-bibimbap', 'Vegetarian Bibimbap', 'Korean rice bowl with seasoned vegetables, gochujang, fried egg, and sesame oil. Mix everything together before eating.', 'grain_bowls', 'classic', 'korean', 'eggs', false, true, 'mixed', ARRAY['ING_RICE', 'ING_SPINACH', 'ING_CARROT', 'ING_ZUCCHINI', 'ING_MUSHROOMS', 'ING_BEAN_SPROUTS', 'ING_GOCHUJANG', 'ING_EGG', 'ING_SESAME_OIL', 'ING_SESAME_SEEDS'], '["eggs", "sesame", "soy"]'::jsonb, false, true, true, false, true, true, true, 520, 16, 68, 18, 6, 2, '["korean", "rice-bowl", "colorful", "interactive"]'::jsonb, 90),
('VEG_FALAFEL_BOWL', 'mediterranean-falafel-bowl', 'Mediterranean Falafel Bowl', 'Crispy falafel over fluffy couscous with hummus, tabbouleh, pickled vegetables, and creamy tahini sauce.', 'grain_bowls', 'popular', 'mediterranean', 'legumes', true, true, 'fried', ARRAY['ING_FALAFEL', 'ING_COUSCOUS', 'ING_HUMMUS', 'ING_TABBOULEH', 'ING_PICKLED_TURNIP', 'ING_TAHINI', 'ING_CUCUMBER', 'ING_TOMATO'], '["sesame", "gluten"]'::jsonb, false, true, true, true, true, true, true, 560, 20, 62, 26, 12, 1, '["mediterranean", "falafel", "bowl", "vegan"]'::jsonb, 88),
('VEG_BURRITO_BOWL', 'veggie-burrito-bowl', 'Veggie Burrito Bowl', 'Deconstructed burrito with cilantro-lime rice, black beans, roasted peppers, corn, guacamole, and salsa. Chipotle-inspired.', 'grain_bowls', 'popular', 'mexican', 'legumes', true, true, 'roasted', ARRAY['ING_RICE', 'ING_BLACK_BEANS', 'ING_BELL_PEPPER', 'ING_CORN_KERNELS', 'ING_GUACAMOLE', 'ING_SALSA_ROJA', 'ING_CILANTRO', 'ING_LIME', 'ING_CUMIN'], '[]'::jsonb, true, true, true, true, true, true, true, 520, 16, 72, 18, 14, 2, '["mexican", "burrito", "bowl", "vegan"]'::jsonb, 92),
('VEG_POKE_BOWL', 'tofu-poke-bowl', 'Tofu Poke Bowl', 'Hawaiian-inspired bowl with marinated tofu, sushi rice, edamame, avocado, cucumber, and spicy mayo. Fresh and flavorful.', 'grain_bowls', 'popular', 'fusion', 'tofu', false, true, 'raw', ARRAY['ING_TOFU_FIRM', 'ING_SUSHI_RICE', 'ING_EDAMAME', 'ING_AVOCADO', 'ING_CUCUMBER', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_SRIRACHA', 'ING_NORI'], '["soy", "sesame"]'::jsonb, false, true, true, false, true, true, true, 480, 22, 54, 20, 8, 2, '["hawaiian", "poke", "bowl", "fresh", "fusion"]'::jsonb, 86),
('VEG_MACRO_BOWL', 'macrobiotic-bowl', 'Macrobiotic Bowl', 'Balanced whole food bowl with brown rice, steamed greens, fermented vegetables, sea vegetables, and miso dressing.', 'grain_bowls', 'signature', 'japanese', 'mixed', true, false, 'steamed', ARRAY['ING_BROWN_RICE', 'ING_KALE', 'ING_BROCCOLI', 'ING_KIMCHI', 'ING_WAKAME', 'ING_MISO', 'ING_TAHINI', 'ING_SESAME_SEEDS'], '["soy", "sesame"]'::jsonb, true, true, true, false, true, true, true, 380, 12, 58, 12, 10, 1, '["macrobiotic", "whole-foods", "japanese", "vegan", "balanced"]'::jsonb, 72),
('VEG_THAI_PEANUT_BOWL', 'thai-peanut-buddha-bowl', 'Thai Peanut Buddha Bowl', 'Vibrant bowl with rice noodles or rice, crispy tofu, fresh vegetables, and creamy Thai peanut sauce. Sweet, savory, and satisfying.', 'grain_bowls', 'popular', 'thai', 'tofu', true, true, 'mixed', ARRAY['ING_RICE_NOODLES', 'ING_TOFU_FIRM', 'ING_CABBAGE', 'ING_CARROT', 'ING_EDAMAME', 'ING_PEANUT_BUTTER', 'ING_SOY_SAUCE', 'ING_LIME', 'ING_CILANTRO', 'ING_PEANUTS'], '["soy", "peanuts"]'::jsonb, true, true, false, false, true, true, true, 520, 22, 52, 26, 8, 1, '["thai", "peanut", "bowl", "vegan", "noodles"]'::jsonb, 88),
('VEG_HARVEST_BOWL', 'autumn-harvest-bowl', 'Autumn Harvest Bowl', 'Seasonal bowl with wild rice, roasted butternut squash, Brussels sprouts, cranberries, pecans, and maple-tahini dressing.', 'grain_bowls', 'seasonal', 'american', 'nuts_seeds', true, false, 'roasted', ARRAY['ING_WILD_RICE', 'ING_BUTTERNUT_SQUASH', 'ING_BRUSSELS_SPROUTS', 'ING_CRANBERRIES', 'ING_PECANS', 'ING_MAPLE_SYRUP', 'ING_TAHINI', 'ING_OLIVE_OIL'], '["sesame", "nuts"]'::jsonb, true, true, false, true, true, true, true, 460, 10, 62, 22, 10, 0, '["autumn", "seasonal", "harvest", "vegan", "thanksgiving"]'::jsonb, 78);

-- ============================================
-- DATA IMPORT - VEGETABLE MAINS (8 items)
-- ============================================

INSERT INTO vegetarian (id, slug, name, description, category, status, cuisine, protein_source, is_vegan, is_high_protein, cooking_method, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_soy_free, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, fiber_g, spice_level, tags, popularity) VALUES
('VEG_CAULIFLOWER_STEAK', 'cauliflower-steak', 'Cauliflower Steak', 'Thick-cut cauliflower roasted until golden and tender, served with chimichurri or tahini sauce. A stunning plant-based centerpiece.', 'vegetable_mains', 'popular', 'american', 'cauliflower', true, false, 'roasted', ARRAY['ING_CAULIFLOWER', 'ING_OLIVE_OIL', 'ING_GARLIC', 'ING_CUMIN', 'ING_SMOKED_PAPRIKA', 'ING_LEMON', 'ING_PARSLEY'], '[]'::jsonb, true, true, true, true, true, true, true, 180, 6, 18, 12, 6, 1, '["steak", "roasted", "vegan", "impressive", "low-carb"]'::jsonb, 82),
('VEG_PORTOBELLO_BURGER', 'grilled-portobello-burger', 'Grilled Portobello Burger', 'Marinated portobello mushroom cap grilled and served in a bun with all the fixings. Meaty, juicy, and satisfying.', 'vegetable_mains', 'classic', 'american', 'mushrooms', true, false, 'grilled', ARRAY['ING_PORTOBELLO', 'ING_BALSAMIC_VINEGAR', 'ING_OLIVE_OIL', 'ING_GARLIC', 'ING_BURGER_BUN', 'ING_LETTUCE', 'ING_TOMATO', 'ING_RED_ONION'], '["gluten"]'::jsonb, false, true, true, true, true, true, true, 320, 10, 38, 16, 5, 0, '["burger", "mushroom", "grilled", "vegan", "american"]'::jsonb, 84),
('VEG_JACKFRUIT_PULLED_PORK', 'bbq-jackfruit-pulled-pork', 'BBQ Jackfruit Pulled "Pork"', 'Young jackfruit slow-cooked in smoky BBQ sauce until it shreds like pulled pork. Perfect for sandwiches and tacos.', 'vegetable_mains', 'popular', 'american', 'jackfruit', true, false, 'braised', ARRAY['ING_JACKFRUIT', 'ING_BBQ_SAUCE', 'ING_ONION', 'ING_GARLIC', 'ING_SMOKED_PAPRIKA', 'ING_APPLE_CIDER_VINEGAR', 'ING_CUMIN'], '[]'::jsonb, true, true, true, true, true, true, true, 220, 4, 48, 2, 4, 1, '["bbq", "jackfruit", "vegan", "pulled", "smoky"]'::jsonb, 80),
('VEG_STUFFED_BELL_PEPPERS', 'stuffed-bell-peppers', 'Stuffed Bell Peppers', 'Colorful bell peppers filled with seasoned rice, beans, corn, and tomatoes, baked until tender. Hearty and wholesome.', 'vegetable_mains', 'classic', 'american', 'legumes', true, true, 'baked', ARRAY['ING_BELL_PEPPER', 'ING_RICE', 'ING_BLACK_BEANS', 'ING_CORN_KERNELS', 'ING_TOMATO', 'ING_CUMIN', 'ING_ONION', 'ING_GARLIC'], '[]'::jsonb, true, true, true, true, true, true, true, 280, 12, 48, 6, 10, 1, '["stuffed", "baked", "vegan", "comfort", "colorful"]'::jsonb, 78),
('VEG_MUSHROOM_STROGANOFF', 'mushroom-stroganoff', 'Mushroom Stroganoff', 'Creamy mushroom stroganoff with a mix of wild and button mushrooms in a rich, savory sauce. Served over egg noodles or rice.', 'vegetable_mains', 'classic', 'international', 'mushrooms', false, false, 'simmered', ARRAY['ING_MIXED_MUSHROOMS', 'ING_SOUR_CREAM', 'ING_ONION', 'ING_GARLIC', 'ING_VEGETABLE_BROTH', 'ING_THYME', 'ING_PAPRIKA', 'ING_WHITE_WINE'], '["milk"]'::jsonb, true, false, true, true, true, true, true, 320, 8, 22, 24, 4, 0, '["russian", "creamy", "mushroom", "comfort", "classic"]'::jsonb, 80),
('VEG_EGGPLANT_PARMESAN', 'eggplant-parmesan', 'Eggplant Parmesan', 'Breaded eggplant slices baked with marinara sauce and melted mozzarella and parmesan. Italian comfort food at its finest.', 'vegetable_mains', 'classic', 'italian', 'eggs', false, true, 'baked', ARRAY['ING_EGGPLANT', 'ING_BREADCRUMBS', 'ING_EGG', 'ING_MARINARA', 'ING_MOZZARELLA', 'ING_PARMESAN', 'ING_BASIL', 'ING_OLIVE_OIL'], '["gluten", "eggs", "milk"]'::jsonb, false, false, true, true, true, true, false, 420, 18, 36, 24, 8, 0, '["italian", "cheesy", "baked", "comfort", "classic"]'::jsonb, 88),
('VEG_JACKFRUIT_CARNITAS', 'jackfruit-carnitas', 'Jackfruit Carnitas', 'Shredded jackfruit braised with citrus and spices, then crisped up for authentic carnitas texture. Perfect for tacos.', 'vegetable_mains', 'popular', 'mexican', 'jackfruit', true, false, 'braised', ARRAY['ING_JACKFRUIT', 'ING_ORANGE', 'ING_LIME', 'ING_CUMIN', 'ING_OREGANO', 'ING_GARLIC', 'ING_ONION', 'ING_CHIPOTLE_PEPPER'], '[]'::jsonb, true, true, true, true, true, true, true, 180, 3, 42, 2, 4, 2, '["mexican", "carnitas", "jackfruit", "vegan", "tacos"]'::jsonb, 76),
('VEG_RATATOUILLE', 'ratatouille', 'Ratatouille', 'Classic Provencal vegetable stew with eggplant, zucchini, tomatoes, and bell peppers. Slow-cooked until meltingly tender.', 'vegetable_mains', 'classic', 'mediterranean', 'mixed', true, false, 'braised', ARRAY['ING_EGGPLANT', 'ING_ZUCCHINI', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_HERBES_DE_PROVENCE'], '[]'::jsonb, true, true, true, true, true, true, true, 160, 4, 20, 8, 6, 0, '["french", "provencal", "stew", "vegan", "summer"]'::jsonb, 82);

-- ============================================
-- DATA IMPORT - INDIAN MAINS (8 items)
-- ============================================

INSERT INTO vegetarian (id, slug, name, description, category, status, cuisine, protein_source, is_vegan, is_high_protein, cooking_method, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_soy_free, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, fiber_g, spice_level, tags, popularity) VALUES
('VEG_PALAK_PANEER', 'palak-paneer', 'Palak Paneer', 'Cubes of fresh paneer cheese in a creamy spinach sauce flavored with ginger, garlic, and garam masala. A North Indian staple.', 'indian_mains', 'classic', 'indian', 'paneer', false, true, 'simmered', ARRAY['ING_PANEER', 'ING_SPINACH', 'ING_ONION', 'ING_GINGER', 'ING_GARLIC', 'ING_GARAM_MASALA', 'ING_CUMIN', 'ING_CREAM'], '["milk"]'::jsonb, true, false, true, true, true, true, true, 340, 18, 14, 26, 4, 2, '["indian", "paneer", "spinach", "creamy", "classic"]'::jsonb, 94),
('VEG_MATAR_PANEER', 'matar-paneer', 'Matar Paneer', 'Paneer and green peas in a rich tomato-based curry. A beloved Punjabi vegetarian dish with aromatic spices.', 'indian_mains', 'classic', 'indian', 'paneer', false, true, 'simmered', ARRAY['ING_PANEER', 'ING_GREEN_PEAS', 'ING_TOMATO', 'ING_ONION', 'ING_GARAM_MASALA', 'ING_TURMERIC', 'ING_GINGER', 'ING_GARLIC'], '["milk"]'::jsonb, true, false, true, true, true, true, true, 320, 16, 22, 20, 6, 2, '["indian", "paneer", "peas", "punjabi", "curry"]'::jsonb, 88),
('VEG_PANEER_TIKKA', 'paneer-tikka', 'Paneer Tikka', 'Marinated paneer cubes grilled in tandoor or oven until charred and smoky. Served with mint chutney.', 'indian_mains', 'popular', 'indian', 'paneer', false, true, 'grilled', ARRAY['ING_PANEER', 'ING_YOGURT', 'ING_GARAM_MASALA', 'ING_KASHMIRI_CHILI', 'ING_GINGER', 'ING_GARLIC', 'ING_LEMON', 'ING_BELL_PEPPER', 'ING_ONION'], '["milk"]'::jsonb, true, false, true, true, true, true, true, 280, 18, 10, 20, 2, 2, '["indian", "paneer", "grilled", "tandoori", "appetizer"]'::jsonb, 90),
('VEG_BAINGAN_BHARTA', 'baingan-bharta', 'Baingan Bharta', 'Fire-roasted eggplant mashed and cooked with tomatoes, onions, and aromatic spices. Smoky and deeply flavorful.', 'indian_mains', 'classic', 'indian', 'mixed', true, false, 'roasted', ARRAY['ING_EGGPLANT', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_GINGER', 'ING_CUMIN', 'ING_CORIANDER', 'ING_CILANTRO', 'ING_GREEN_CHILI'], '[]'::jsonb, true, true, true, true, true, true, true, 140, 4, 18, 6, 6, 2, '["indian", "punjabi", "eggplant", "smoky", "vegan"]'::jsonb, 80),
('VEG_ALOO_GOBI', 'aloo-gobi', 'Aloo Gobi', 'Dry curry of potatoes and cauliflower with turmeric, cumin, and fresh ginger. A simple yet satisfying everyday dish.', 'indian_mains', 'classic', 'indian', 'mixed', true, false, 'sauteed', ARRAY['ING_POTATO', 'ING_CAULIFLOWER', 'ING_TURMERIC', 'ING_CUMIN_SEEDS', 'ING_GINGER', 'ING_GREEN_CHILI', 'ING_CILANTRO', 'ING_VEGETABLE_OIL'], '[]'::jsonb, true, true, true, true, true, true, true, 180, 5, 28, 6, 5, 2, '["indian", "potato", "cauliflower", "vegan", "everyday"]'::jsonb, 82),
('VEG_MALAI_KOFTA', 'malai-kofta', 'Malai Kofta', 'Deep-fried paneer and potato dumplings in a rich, creamy tomato-cashew sauce. An indulgent vegetarian special occasion dish.', 'indian_mains', 'premium', 'indian', 'paneer', false, true, 'deep-fried', ARRAY['ING_PANEER', 'ING_POTATO', 'ING_CASHEWS', 'ING_CREAM', 'ING_TOMATO', 'ING_ONION', 'ING_GARAM_MASALA', 'ING_KASURI_METHI'], '["milk", "nuts"]'::jsonb, true, false, false, true, true, true, true, 480, 16, 32, 34, 4, 1, '["indian", "rich", "creamy", "special-occasion", "mughlai"]'::jsonb, 86),
('VEG_SAMBAR', 'sambar', 'Sambar', 'South Indian lentil stew with vegetables and tamarind, flavored with a unique sambar powder. Served with rice or idli.', 'indian_mains', 'classic', 'indian', 'legumes', true, true, 'simmered', ARRAY['ING_TOOR_DAL', 'ING_TAMARIND', 'ING_SAMBAR_POWDER', 'ING_DRUMSTICK', 'ING_TOMATO', 'ING_ONION', 'ING_CURRY_LEAVES', 'ING_MUSTARD_SEEDS'], '[]'::jsonb, true, true, true, true, true, true, true, 180, 12, 28, 4, 8, 2, '["south-indian", "lentils", "tamarind", "vegan", "everyday"]'::jsonb, 88),
('VEG_PANEER_BUTTER_MASALA', 'paneer-butter-masala', 'Paneer Butter Masala', 'Paneer cubes in a rich, creamy tomato and butter sauce. The vegetarian version of butter chicken, indulgent and beloved.', 'indian_mains', 'popular', 'indian', 'paneer', false, true, 'simmered', ARRAY['ING_PANEER', 'ING_TOMATO', 'ING_BUTTER', 'ING_CREAM', 'ING_CASHEWS', 'ING_GARAM_MASALA', 'ING_KASURI_METHI', 'ING_GINGER', 'ING_GARLIC'], '["milk", "nuts"]'::jsonb, true, false, false, true, true, true, true, 420, 18, 18, 32, 3, 1, '["indian", "paneer", "creamy", "rich", "comfort"]'::jsonb, 92);

-- ============================================
-- DATA IMPORT - ASIAN MAINS (8 items)
-- ============================================

INSERT INTO vegetarian (id, slug, name, description, category, status, cuisine, protein_source, is_vegan, is_high_protein, cooking_method, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_soy_free, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, fiber_g, spice_level, tags, popularity) VALUES
('VEG_PAD_THAI_TOFU', 'vegetarian-pad-thai', 'Vegetarian Pad Thai', 'Classic Thai rice noodles stir-fried with tofu, bean sprouts, peanuts, and tamarind sauce. Sweet, sour, and satisfying.', 'asian_mains', 'classic', 'thai', 'tofu', true, true, 'stir-fried', ARRAY['ING_RICE_NOODLES', 'ING_TOFU_FIRM', 'ING_BEAN_SPROUTS', 'ING_PEANUTS', 'ING_TAMARIND', 'ING_FISH_SAUCE_VEGAN', 'ING_LIME', 'ING_GREEN_ONION', 'ING_EGG'], '["peanuts", "soy", "eggs"]'::jsonb, true, true, false, false, true, true, true, 420, 18, 52, 18, 4, 1, '["thai", "noodles", "classic", "street-food"]'::jsonb, 92),
('VEG_GREEN_CURRY', 'thai-green-curry-vegetables', 'Thai Green Curry with Vegetables', 'Creamy coconut curry with green curry paste, bamboo shoots, Thai eggplant, and basil. Aromatic and comforting.', 'asian_mains', 'popular', 'thai', 'tofu', true, true, 'simmered', ARRAY['ING_COCONUT_MILK', 'ING_GREEN_CURRY_PASTE', 'ING_TOFU_FIRM', 'ING_THAI_EGGPLANT', 'ING_BAMBOO_SHOOTS', 'ING_THAI_BASIL', 'ING_FISH_SAUCE_VEGAN', 'ING_PALM_SUGAR'], '["soy"]'::jsonb, true, true, true, false, true, true, true, 380, 16, 22, 28, 4, 3, '["thai", "curry", "coconut", "spicy", "vegan"]'::jsonb, 88),
('VEG_VEGETABLE_LO_MEIN', 'vegetable-lo-mein', 'Vegetable Lo Mein', 'Chinese egg noodles stir-fried with mixed vegetables in a savory soy-based sauce. Quick and satisfying takeout favorite.', 'asian_mains', 'popular', 'chinese', 'mixed', false, false, 'stir-fried', ARRAY['ING_EGG_NOODLES', 'ING_CABBAGE', 'ING_CARROT', 'ING_MUSHROOMS', 'ING_BOK_CHOY', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_GARLIC', 'ING_GINGER'], '["gluten", "soy", "sesame", "eggs"]'::jsonb, false, true, true, false, true, true, true, 380, 12, 52, 14, 6, 0, '["chinese", "noodles", "quick", "takeout"]'::jsonb, 84),
('VEG_DAN_DAN_NOODLES', 'vegan-dan-dan-noodles', 'Vegan Dan Dan Noodles', 'Sichuan noodles with spicy chili oil, Sichuan peppercorns, and crumbled seasoned tofu. Numbing, spicy, and addictive.', 'asian_mains', 'signature', 'chinese', 'tofu', true, true, 'boiled', ARRAY['ING_WHEAT_NOODLES', 'ING_TOFU_CRUMBLES', 'ING_CHILI_OIL', 'ING_SICHUAN_PEPPERCORN', 'ING_SOY_SAUCE', 'ING_SESAME_PASTE', 'ING_GARLIC', 'ING_GREEN_ONION'], '["gluten", "soy", "sesame"]'::jsonb, false, true, true, false, true, true, true, 440, 18, 48, 20, 4, 4, '["sichuan", "spicy", "noodles", "vegan", "numbing"]'::jsonb, 82),
('VEG_VEGETABLE_TEMPURA', 'vegetable-tempura', 'Vegetable Tempura', 'Assorted vegetables in light, crispy tempura batter, served with tentsuyu dipping sauce. Japanese culinary art.', 'asian_mains', 'classic', 'japanese', 'mixed', false, false, 'deep-fried', ARRAY['ING_SWEET_POTATO', 'ING_KABOCHA', 'ING_SHISO_LEAF', 'ING_GREEN_BEANS', 'ING_EGGPLANT', 'ING_TEMPURA_FLOUR', 'ING_EGG', 'ING_DASHI'], '["gluten", "eggs", "fish"]'::jsonb, false, true, true, false, false, false, false, 340, 8, 42, 16, 4, 0, '["japanese", "fried", "crispy", "light"]'::jsonb, 80),
('VEG_MASSAMAN_CURRY', 'massaman-curry-tofu', 'Massaman Curry with Tofu', 'Rich, mild Thai curry with potatoes, peanuts, and warm spices like cinnamon and cardamom. Persian-influenced comfort.', 'asian_mains', 'popular', 'thai', 'tofu', true, true, 'simmered', ARRAY['ING_COCONUT_MILK', 'ING_MASSAMAN_PASTE', 'ING_TOFU_FIRM', 'ING_POTATO', 'ING_PEANUTS', 'ING_ONION', 'ING_TAMARIND', 'ING_PALM_SUGAR'], '["peanuts", "soy"]'::jsonb, true, true, false, false, true, true, true, 420, 18, 34, 26, 4, 1, '["thai", "curry", "mild", "peanuts", "comfort"]'::jsonb, 84),
('VEG_SINGAPORE_NOODLES', 'singapore-curry-noodles', 'Singapore Curry Noodles', 'Thin rice vermicelli stir-fried with curry powder, vegetables, and tofu. A flavorful fusion dish.', 'asian_mains', 'popular', 'fusion', 'tofu', true, true, 'stir-fried', ARRAY['ING_RICE_VERMICELLI', 'ING_TOFU_FIRM', 'ING_CURRY_POWDER', 'ING_BELL_PEPPER', 'ING_BEAN_SPROUTS', 'ING_CABBAGE', 'ING_SOY_SAUCE', 'ING_GARLIC'], '["soy"]'::jsonb, true, true, true, false, true, true, true, 360, 16, 46, 12, 4, 2, '["fusion", "noodles", "curry", "vegan"]'::jsonb, 78),
('VEG_JAPCHAE', 'japchae', 'Japchae', 'Korean glass noodles stir-fried with vegetables, mushrooms, and sesame oil. Sweet, savory, and perfect for celebrations.', 'asian_mains', 'classic', 'korean', 'mixed', true, false, 'stir-fried', ARRAY['ING_SWEET_POTATO_NOODLES', 'ING_SPINACH', 'ING_CARROT', 'ING_MUSHROOMS', 'ING_BELL_PEPPER', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_SESAME_SEEDS', 'ING_GARLIC'], '["soy", "sesame"]'::jsonb, true, true, true, false, true, true, true, 320, 6, 56, 10, 4, 0, '["korean", "noodles", "celebration", "vegan"]'::jsonb, 82);

-- ============================================
-- DATA IMPORT - MEDITERRANEAN MAINS (8 items)
-- ============================================

INSERT INTO vegetarian (id, slug, name, description, category, status, cuisine, protein_source, is_vegan, is_high_protein, cooking_method, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_soy_free, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, fiber_g, spice_level, tags, popularity) VALUES
('VEG_MOUSSAKA', 'vegetarian-moussaka', 'Vegetarian Moussaka', 'Greek layered casserole with eggplant, potatoes, spiced lentils, and creamy bechamel sauce. Comfort food at its finest.', 'mediterranean_mains', 'classic', 'mediterranean', 'legumes', false, true, 'baked', ARRAY['ING_EGGPLANT', 'ING_POTATO', 'ING_LENTILS', 'ING_TOMATO', 'ING_ONION', 'ING_CINNAMON', 'ING_BECHAMEL', 'ING_PARMESAN'], '["gluten", "milk"]'::jsonb, false, false, true, true, true, true, false, 420, 18, 42, 22, 10, 1, '["greek", "casserole", "comfort", "layered"]'::jsonb, 84),
('VEG_SHAKSHUKA', 'shakshuka', 'Shakshuka', 'Eggs poached in a spiced tomato and pepper sauce, served with crusty bread for dipping. A Middle Eastern breakfast staple.', 'mediterranean_mains', 'popular', 'middle_eastern', 'eggs', false, true, 'simmered', ARRAY['ING_EGG', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_HARISSA', 'ING_FETA'], '["eggs", "milk"]'::jsonb, true, false, true, true, true, true, true, 280, 16, 18, 18, 4, 2, '["middle-eastern", "eggs", "breakfast", "brunch"]'::jsonb, 90),
('VEG_SPANAKOPITA', 'spanakopita', 'Spanakopita', 'Flaky phyllo pastry filled with spinach and feta cheese, seasoned with dill and green onions. Classic Greek pie.', 'mediterranean_mains', 'classic', 'mediterranean', 'eggs', false, true, 'baked', ARRAY['ING_PHYLLO_DOUGH', 'ING_SPINACH', 'ING_FETA', 'ING_EGG', 'ING_DILL', 'ING_GREEN_ONION', 'ING_OLIVE_OIL', 'ING_NUTMEG'], '["gluten", "eggs", "milk"]'::jsonb, false, false, true, true, true, true, true, 320, 14, 28, 18, 4, 0, '["greek", "phyllo", "spinach", "feta", "pastry"]'::jsonb, 82),
('VEG_DOLMAS', 'stuffed-grape-leaves', 'Dolmas (Stuffed Grape Leaves)', 'Tender grape leaves stuffed with seasoned rice, herbs, pine nuts, and currants. Served cold with lemon.', 'mediterranean_mains', 'classic', 'mediterranean', 'mixed', true, false, 'simmered', ARRAY['ING_GRAPE_LEAVES', 'ING_RICE', 'ING_PINE_NUTS', 'ING_CURRANTS', 'ING_DILL', 'ING_MINT', 'ING_LEMON', 'ING_OLIVE_OIL'], '["nuts"]'::jsonb, true, true, false, true, true, true, true, 180, 4, 28, 8, 2, 0, '["greek", "turkish", "cold", "appetizer", "vegan"]'::jsonb, 76),
('VEG_IMAM_BAYILDI', 'imam-bayildi', 'Imam Bayildi', 'Turkish stuffed eggplant braised in olive oil with tomatoes, onions, and garlic. "The imam fainted" from the deliciousness.', 'mediterranean_mains', 'signature', 'middle_eastern', 'mixed', true, false, 'braised', ARRAY['ING_EGGPLANT', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_PARSLEY', 'ING_SUGAR'], '[]'::jsonb, true, true, true, true, true, true, true, 200, 4, 22, 12, 6, 0, '["turkish", "eggplant", "vegan", "olive-oil", "classic"]'::jsonb, 74),
('VEG_MUJADDARA', 'mujaddara', 'Mujaddara', 'Middle Eastern comfort food of lentils and rice topped with crispy fried onions. Simple, humble, and deeply satisfying.', 'mediterranean_mains', 'classic', 'middle_eastern', 'legumes', true, true, 'simmered', ARRAY['ING_LENTILS', 'ING_RICE', 'ING_ONION', 'ING_CUMIN', 'ING_OLIVE_OIL', 'ING_VEGETABLE_BROTH'], '[]'::jsonb, true, true, true, true, true, true, true, 320, 16, 54, 6, 10, 1, '["lebanese", "lentils", "rice", "vegan", "comfort"]'::jsonb, 80),
('VEG_KOSHARI', 'koshari', E'Koshari', E'Egypt\'s national dish - layers of rice, lentils, macaroni, chickpeas, and crispy onions topped with spicy tomato sauce.', 'mediterranean_mains', 'signature', 'middle_eastern', 'legumes', true, true, 'layered', ARRAY['ING_RICE', 'ING_LENTILS', 'ING_MACARONI', 'ING_CHICKPEAS', 'ING_ONION', 'ING_TOMATO_SAUCE', 'ING_GARLIC', 'ING_CUMIN', 'ING_VINEGAR'], '["gluten"]'::jsonb, false, true, true, true, true, true, true, 420, 18, 76, 6, 12, 2, '["egyptian", "street-food", "vegan", "carbs", "layered"]'::jsonb, 78),
('VEG_FATTEH', 'fatteh-hummus', 'Fatteh', 'Levantine dish of crispy pita, chickpeas, and yogurt sauce topped with pine nuts and warm spiced butter.', 'mediterranean_mains', 'classic', 'middle_eastern', 'legumes', false, true, 'layered', ARRAY['ING_PITA_BREAD', 'ING_CHICKPEAS', 'ING_YOGURT', 'ING_TAHINI', 'ING_GARLIC', 'ING_PINE_NUTS', 'ING_BUTTER', 'ING_CUMIN', 'ING_PAPRIKA'], '["gluten", "milk", "sesame", "nuts"]'::jsonb, false, false, false, true, true, true, true, 480, 18, 42, 28, 8, 1, '["lebanese", "syrian", "layered", "chickpeas", "yogurt"]'::jsonb, 76);

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 'Total vegetarian dishes:' AS label, COUNT(*) AS count FROM vegetarian;
SELECT category, COUNT(*) AS count FROM vegetarian GROUP BY category ORDER BY category;
