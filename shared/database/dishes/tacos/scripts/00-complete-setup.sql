-- ============================================================================
-- TACOS - Complete Setup Script
-- ============================================================================
-- ESEGUI QUESTO SCRIPT NEL SUPABASE SQL EDITOR
--
-- Questo script:
-- 1. Crea la tabella tacos
-- 2. Migra 10 tacos da mexican
-- 3. Aggiunge ~30 nuovi tacos
-- 4. Crea product_taxonomy entry
-- 5. Crea product_ingredients links
-- ============================================================================

-- ============================================================================
-- PART 1: CREATE ENUMS
-- ============================================================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'taco_style') THEN
        CREATE TYPE taco_style AS ENUM (
            'traditional',    -- Classic Mexican street tacos
            'baja',          -- Baja California style (fish tacos)
            'tex_mex',       -- Texas-Mexican fusion
            'modern',        -- Contemporary interpretations
            'breakfast',     -- Breakfast tacos
            'birria',        -- Birria style (with consomé)
            'fusion'         -- International fusion
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tortilla_type') THEN
        CREATE TYPE tortilla_type AS ENUM (
            'corn',
            'flour',
            'blue_corn',
            'whole_wheat',
            'nopal',
            'chipotle',
            'spinach'
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'taco_status') THEN
        CREATE TYPE taco_status AS ENUM (
            'classic',
            'traditional',
            'modern',
            'signature',
            'seasonal',
            'active'
        );
    END IF;
END $$;

-- ============================================================================
-- PART 2: CREATE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS tacos (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,

    -- Names (multilingual JSONB)
    name JSONB NOT NULL,
    description JSONB NOT NULL,

    -- Classification
    status taco_status NOT NULL DEFAULT 'active',
    style taco_style NOT NULL DEFAULT 'traditional',
    tortilla tortilla_type NOT NULL DEFAULT 'corn',
    tags TEXT[] DEFAULT '{}',

    -- Origin
    region TEXT, -- e.g., 'central', 'baja', 'yucatan', 'northern'
    origin JSONB NOT NULL DEFAULT '{"country": "Mexico", "country_code": "MX"}'::jsonb,

    -- Protein/Main ingredient
    protein_type TEXT, -- e.g., 'pork', 'beef', 'chicken', 'fish', 'shrimp', 'vegetarian'
    cooking_method TEXT, -- e.g., 'grilled', 'braised', 'fried', 'spit-roasted'

    -- Street food flag
    is_street_food BOOLEAN DEFAULT true,

    -- Toppings (arrays)
    proteins TEXT[] DEFAULT '{}',
    toppings TEXT[] DEFAULT '{}',
    salsas TEXT[] DEFAULT '{}',
    garnishes TEXT[] DEFAULT '{}',

    -- Spice level (0-5)
    spice_level INTEGER DEFAULT 2 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- Dietary & Allergens
    dietary JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Serving
    serving JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Popularity
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

    -- Related
    related_tacos TEXT[] DEFAULT '{}',

    -- Media & Pricing
    media JSONB,
    pricing JSONB,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PART 3: INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_tacos_slug ON tacos(slug);
CREATE INDEX IF NOT EXISTS idx_tacos_status ON tacos(status);
CREATE INDEX IF NOT EXISTS idx_tacos_style ON tacos(style);
CREATE INDEX IF NOT EXISTS idx_tacos_tortilla ON tacos(tortilla);
CREATE INDEX IF NOT EXISTS idx_tacos_protein_type ON tacos(protein_type);
CREATE INDEX IF NOT EXISTS idx_tacos_tags ON tacos USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_tacos_popularity ON tacos(popularity DESC);

-- ============================================================================
-- PART 4: TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION update_tacos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_tacos_updated_at ON tacos;
CREATE TRIGGER trigger_tacos_updated_at
    BEFORE UPDATE ON tacos
    FOR EACH ROW
    EXECUTE FUNCTION update_tacos_updated_at();

-- ============================================================================
-- PART 5: RLS
-- ============================================================================

ALTER TABLE tacos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to tacos" ON tacos;
CREATE POLICY "Allow public read access to tacos"
    ON tacos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow service role full access to tacos" ON tacos;
CREATE POLICY "Allow service role full access to tacos"
    ON tacos FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================================
-- PART 6: PRODUCT TAXONOMY
-- ============================================================================

INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it)
SELECT 'tacos', 'standalone', 'food', 'second_course', 'Tacos', 'Tacos'
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'tacos');

-- ============================================================================
-- PART 7: MIGRATE EXISTING TACOS FROM MEXICAN
-- ============================================================================

INSERT INTO tacos (
    id, slug, name, description, status, style, tortilla,
    region, origin, protein_type, cooking_method, is_street_food,
    proteins, toppings, salsas, garnishes, spice_level,
    dietary, serving, popularity, tags,
    created_at, updated_at
)
SELECT
    REPLACE(id, 'MEX_', 'TAC_'),
    slug,
    jsonb_build_object('en', name, 'es', spanish_name),
    jsonb_build_object('en', description),
    status::text::taco_status,
    'traditional'::taco_style,
    CASE
        WHEN tortilla_type = 'corn' THEN 'corn'::tortilla_type
        WHEN tortilla_type = 'flour' THEN 'flour'::tortilla_type
        ELSE 'corn'::tortilla_type
    END,
    region,
    jsonb_build_object('country', 'Mexico', 'country_code', 'MX'),
    protein_type,
    cooking_method,
    is_street_food,
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    spice_level,
    jsonb_build_object(
        'is_gluten_free', is_gluten_free,
        'is_dairy_free', is_dairy_free,
        'is_vegan', is_vegan,
        'is_vegetarian', is_vegetarian,
        'is_halal', is_halal,
        'is_kosher', is_kosher,
        'allergens', allergens,
        'calories_estimate', calories_per_serving,
        'protein_g', protein_g,
        'carbs_g', carbs_g,
        'fat_g', fat_g
    ),
    jsonb_build_object('portion_size', 'single', 'typical_order', 3),
    popularity,
    tags,
    created_at,
    NOW()
FROM mexican
WHERE category = 'tacos'
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 8: MIGRATE PRODUCT_INGREDIENTS
-- ============================================================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT
    'tacos',
    REPLACE(m.id, 'MEX_', 'TAC_'),
    unnest(m.ingredient_ids),
    'main',
    false,
    1
FROM mexican m
WHERE m.category = 'tacos'
AND m.ingredient_ids IS NOT NULL
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PART 9: ADD NEW TACOS (30+ varieties)
-- ============================================================================

INSERT INTO tacos (id, slug, name, description, status, style, tortilla, region, protein_type, cooking_method, is_street_food, spice_level, dietary, popularity, tags) VALUES

-- TRADITIONAL MEXICAN TACOS (expanding beyond the 10 migrated)
('TAC_CABEZA', 'taco-cabeza', '{"en": "Tacos de Cabeza", "es": "Tacos de Cabeza"}', '{"en": "Traditional tacos with slow-cooked beef head meat, tender and flavorful"}', 'traditional', 'traditional', 'corn', 'central', 'beef', 'braised', true, 2, '{"is_gluten_free": true, "is_dairy_free": true}', 85, ARRAY['traditional', 'beef', 'street-food']),

('TAC_TRIPA', 'taco-tripa', '{"en": "Tacos de Tripa", "es": "Tacos de Tripa"}', '{"en": "Crispy tripe tacos, a beloved street food classic with crunchy texture"}', 'traditional', 'traditional', 'corn', 'central', 'offal', 'fried', true, 2, '{"is_gluten_free": true, "is_dairy_free": true}', 75, ARRAY['traditional', 'offal', 'crispy']),

('TAC_BUCHE', 'taco-buche', '{"en": "Tacos de Buche", "es": "Tacos de Buche"}', '{"en": "Pork stomach tacos with unique chewy texture, a taquería staple"}', 'traditional', 'traditional', 'corn', 'central', 'pork', 'braised', true, 2, '{"is_gluten_free": true, "is_dairy_free": true}', 70, ARRAY['traditional', 'pork', 'street-food']),

('TAC_CAMPECHANOS', 'taco-campechanos', '{"en": "Tacos Campechanos", "es": "Tacos Campechanos"}', '{"en": "Mixed tacos combining chorizo and carne asada on a single tortilla"}', 'traditional', 'traditional', 'corn', 'central', 'mixed', 'grilled', true, 2, '{"is_gluten_free": true, "is_dairy_free": true}', 88, ARRAY['traditional', 'mixed-meat', 'popular']),

('TAC_COCHINITA', 'taco-cochinita', '{"en": "Tacos de Cochinita Pibil", "es": "Tacos de Cochinita Pibil"}', '{"en": "Yucatecan slow-roasted pork in achiote, topped with pickled red onions"}', 'classic', 'traditional', 'corn', 'yucatan', 'pork', 'pit-roasted', true, 2, '{"is_gluten_free": true, "is_dairy_free": true}', 92, ARRAY['yucatan', 'pork', 'achiote', 'iconic']),

('TAC_GOBERNADOR', 'taco-gobernador', '{"en": "Tacos Gobernador", "es": "Tacos Gobernador"}', '{"en": "Sinaloan shrimp tacos with melted cheese, peppers, and tomatoes"}', 'signature', 'baja', 'flour', 'northern', 'shrimp', 'grilled', false, 2, '{"is_gluten_free": false, "is_dairy_free": false}', 90, ARRAY['sinaloa', 'shrimp', 'cheese', 'signature']),

('TAC_ARRACHERA', 'taco-arrachera', '{"en": "Tacos de Arrachera", "es": "Tacos de Arrachera"}', '{"en": "Marinated skirt steak tacos, grilled to perfection with charred edges"}', 'classic', 'traditional', 'flour', 'northern', 'beef', 'grilled', true, 1, '{"is_gluten_free": false, "is_dairy_free": true}', 91, ARRAY['northern', 'beef', 'grilled', 'popular']),

('TAC_NOPALES', 'taco-nopales', '{"en": "Tacos de Nopales", "es": "Tacos de Nopales"}', '{"en": "Grilled cactus paddle tacos with queso fresco and salsa verde"}', 'traditional', 'traditional', 'corn', 'central', 'vegetarian', 'grilled', true, 1, '{"is_gluten_free": true, "is_dairy_free": false, "is_vegetarian": true}', 78, ARRAY['vegetarian', 'healthy', 'cactus']),

('TAC_RAJAS', 'taco-rajas', '{"en": "Tacos de Rajas con Crema", "es": "Tacos de Rajas con Crema"}', '{"en": "Roasted poblano pepper strips in cream sauce, a vegetarian favorite"}', 'traditional', 'traditional', 'corn', 'central', 'vegetarian', 'roasted', true, 2, '{"is_gluten_free": true, "is_dairy_free": false, "is_vegetarian": true}', 82, ARRAY['vegetarian', 'poblano', 'creamy']),

('TAC_HONGOS', 'taco-hongos', '{"en": "Tacos de Hongos", "es": "Tacos de Hongos"}', '{"en": "Sautéed wild mushroom tacos with epazote and garlic"}', 'traditional', 'traditional', 'corn', 'central', 'vegetarian', 'sauteed', true, 1, '{"is_gluten_free": true, "is_dairy_free": true, "is_vegan": true}', 80, ARRAY['vegetarian', 'vegan', 'mushroom']),

-- BAJA STYLE TACOS
('TAC_BAJA_FISH', 'taco-baja-fish', '{"en": "Baja Fish Taco", "es": "Taco de Pescado Baja"}', '{"en": "Beer-battered fried fish with cabbage slaw, crema, and chipotle mayo"}', 'classic', 'baja', 'corn', 'baja', 'fish', 'fried', true, 1, '{"is_gluten_free": false, "is_dairy_free": false}', 94, ARRAY['baja', 'fish', 'fried', 'iconic']),

('TAC_BAJA_GRILLED', 'taco-baja-grilled-fish', '{"en": "Grilled Baja Fish Taco", "es": "Taco de Pescado a la Parrilla"}', '{"en": "Grilled white fish with mango salsa and cilantro lime crema"}', 'modern', 'baja', 'corn', 'baja', 'fish', 'grilled', true, 1, '{"is_gluten_free": true, "is_dairy_free": false}', 88, ARRAY['baja', 'fish', 'grilled', 'healthy']),

('TAC_BAJA_SHRIMP', 'taco-baja-shrimp', '{"en": "Baja Shrimp Taco", "es": "Taco de Camarón Baja"}', '{"en": "Crispy fried shrimp with chipotle aioli and pickled cabbage"}', 'classic', 'baja', 'corn', 'baja', 'shrimp', 'fried', true, 2, '{"is_gluten_free": false, "is_dairy_free": false}', 89, ARRAY['baja', 'shrimp', 'crispy']),

-- BIRRIA TACOS
('TAC_BIRRIA_RES', 'taco-birria-res', '{"en": "Birria de Res Tacos", "es": "Tacos de Birria de Res"}', '{"en": "Slow-braised beef birria tacos dipped in consomé and pan-fried until crispy"}', 'classic', 'birria', 'corn', 'jalisco', 'beef', 'braised', true, 3, '{"is_gluten_free": true, "is_dairy_free": false}', 96, ARRAY['birria', 'beef', 'consomé', 'trending']),

('TAC_BIRRIA_CHIVO', 'taco-birria-chivo', '{"en": "Birria de Chivo Tacos", "es": "Tacos de Birria de Chivo"}', '{"en": "Traditional goat birria tacos, the original Jalisco preparation"}', 'traditional', 'birria', 'corn', 'jalisco', 'goat', 'braised', true, 3, '{"is_gluten_free": true, "is_dairy_free": false}', 85, ARRAY['birria', 'goat', 'traditional', 'jalisco']),

('TAC_QUESABIRRIA', 'taco-quesabirria', '{"en": "Quesabirria Tacos", "es": "Tacos Quesabirria"}', '{"en": "Birria tacos with melted cheese, griddled crispy, served with consomé"}', 'modern', 'birria', 'corn', 'jalisco', 'beef', 'braised', true, 3, '{"is_gluten_free": true, "is_dairy_free": false}', 97, ARRAY['birria', 'cheese', 'trending', 'viral']),

-- TEX-MEX TACOS
('TAC_GROUND_BEEF', 'taco-ground-beef', '{"en": "Ground Beef Taco", "es": "Taco de Carne Molida"}', '{"en": "Classic Tex-Mex taco with seasoned ground beef, lettuce, cheese, and tomato"}', 'classic', 'tex_mex', 'flour', 'texas', 'beef', 'sauteed', false, 1, '{"is_gluten_free": false, "is_dairy_free": false}', 85, ARRAY['tex-mex', 'classic', 'family-friendly']),

('TAC_HARD_SHELL', 'taco-hard-shell', '{"en": "Hard Shell Taco", "es": "Taco Dorado"}', '{"en": "Crispy corn shell taco with ground beef, cheese, lettuce, and sour cream"}', 'classic', 'tex_mex', 'corn', 'texas', 'beef', 'fried', false, 1, '{"is_gluten_free": true, "is_dairy_free": false}', 82, ARRAY['tex-mex', 'crispy', 'american']),

('TAC_FAJITA', 'taco-fajita', '{"en": "Fajita Taco", "es": "Taco de Fajita"}', '{"en": "Sizzling fajita beef or chicken with peppers and onions in flour tortilla"}', 'classic', 'tex_mex', 'flour', 'texas', 'mixed', 'grilled', false, 1, '{"is_gluten_free": false, "is_dairy_free": true}', 88, ARRAY['tex-mex', 'fajita', 'sizzling']),

('TAC_BRISKET', 'taco-brisket', '{"en": "Texas Brisket Taco", "es": "Taco de Brisket Tejano"}', '{"en": "Slow-smoked Texas brisket with pickled onions and BBQ sauce"}', 'signature', 'tex_mex', 'flour', 'texas', 'beef', 'smoked', false, 1, '{"is_gluten_free": false, "is_dairy_free": true}', 90, ARRAY['tex-mex', 'bbq', 'brisket', 'smoked']),

-- BREAKFAST TACOS
('TAC_MIGAS', 'taco-migas', '{"en": "Migas Taco", "es": "Taco de Migas"}', '{"en": "Scrambled eggs with crispy tortilla strips, peppers, and cheese"}', 'classic', 'breakfast', 'flour', 'texas', 'egg', 'scrambled', true, 1, '{"is_gluten_free": false, "is_dairy_free": false, "is_vegetarian": true}', 86, ARRAY['breakfast', 'eggs', 'austin']),

('TAC_CHORIZO_EGG', 'taco-chorizo-egg', '{"en": "Chorizo & Egg Taco", "es": "Taco de Chorizo con Huevo"}', '{"en": "Mexican chorizo scrambled with eggs, a breakfast classic"}', 'classic', 'breakfast', 'flour', 'central', 'pork', 'scrambled', true, 2, '{"is_gluten_free": false, "is_dairy_free": true}', 89, ARRAY['breakfast', 'chorizo', 'eggs']),

('TAC_POTATO_EGG', 'taco-potato-egg', '{"en": "Potato & Egg Taco", "es": "Taco de Papa con Huevo"}', '{"en": "Crispy potatoes with scrambled eggs, a vegetarian breakfast option"}', 'classic', 'breakfast', 'flour', 'texas', 'vegetarian', 'scrambled', true, 1, '{"is_gluten_free": false, "is_dairy_free": true, "is_vegetarian": true}', 84, ARRAY['breakfast', 'vegetarian', 'potato']),

('TAC_BACON_EGG', 'taco-bacon-egg', '{"en": "Bacon & Egg Taco", "es": "Taco de Tocino con Huevo"}', '{"en": "Crispy bacon with scrambled eggs and melted cheese"}', 'classic', 'breakfast', 'flour', 'texas', 'pork', 'scrambled', true, 1, '{"is_gluten_free": false, "is_dairy_free": false}', 87, ARRAY['breakfast', 'bacon', 'american']),

('TAC_MACHACADO', 'taco-machacado', '{"en": "Machacado Taco", "es": "Taco de Machacado con Huevo"}', '{"en": "Dried shredded beef rehydrated and scrambled with eggs, peppers, and tomatoes"}', 'traditional', 'breakfast', 'flour', 'northern', 'beef', 'scrambled', true, 2, '{"is_gluten_free": false, "is_dairy_free": true}', 82, ARRAY['breakfast', 'northern', 'traditional']),

-- MODERN/FUSION TACOS
('TAC_KOREAN_BBQ', 'taco-korean-bbq', '{"en": "Korean BBQ Taco", "es": "Taco Coreano BBQ"}', '{"en": "Korean-marinated beef bulgogi with kimchi slaw and gochujang aioli"}', 'signature', 'fusion', 'flour', null, 'beef', 'grilled', false, 2, '{"is_gluten_free": false, "is_dairy_free": true}', 88, ARRAY['fusion', 'korean', 'trendy']),

('TAC_BANG_BANG_SHRIMP', 'taco-bang-bang-shrimp', '{"en": "Bang Bang Shrimp Taco", "es": "Taco de Camarón Bang Bang"}', '{"en": "Crispy shrimp with spicy bang bang sauce and Asian slaw"}', 'modern', 'fusion', 'flour', null, 'shrimp', 'fried', false, 3, '{"is_gluten_free": false, "is_dairy_free": false}', 85, ARRAY['fusion', 'shrimp', 'spicy']),

('TAC_POKE', 'taco-poke', '{"en": "Poke Taco", "es": "Taco de Poke"}', '{"en": "Hawaiian-style raw tuna with avocado, mango, and wasabi crema"}', 'modern', 'fusion', 'corn', null, 'fish', 'raw', false, 1, '{"is_gluten_free": true, "is_dairy_free": false}', 82, ARRAY['fusion', 'hawaiian', 'raw', 'healthy']),

('TAC_BUTTER_CHICKEN', 'taco-butter-chicken', '{"en": "Butter Chicken Taco", "es": "Taco de Pollo Mantequilla"}', '{"en": "Indian butter chicken with basmati rice, cilantro, and naan taco shell"}', 'modern', 'fusion', 'flour', null, 'chicken', 'braised', false, 2, '{"is_gluten_free": false, "is_dairy_free": false}', 80, ARRAY['fusion', 'indian', 'creative'])

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 10: CLEANUP MEXICAN TABLE
-- ============================================================================

-- Remove product_ingredients for migrated tacos
DELETE FROM product_ingredients
WHERE product_type = 'mexican'
AND product_id IN (SELECT id FROM mexican WHERE category = 'tacos');

-- Remove tacos from mexican
DELETE FROM mexican WHERE category = 'tacos';

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT '=== TACOS MIGRATION COMPLETED ===' as status;
SELECT 'Tacos count: ' || COUNT(*) as result FROM tacos;
SELECT 'Product_ingredients (tacos): ' || COUNT(*) as result FROM product_ingredients WHERE product_type = 'tacos';
SELECT 'Mexican remaining: ' || COUNT(*) as result FROM mexican;
