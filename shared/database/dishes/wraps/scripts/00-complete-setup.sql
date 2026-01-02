-- ============================================================================
-- WRAPS - Complete Setup Script
-- ============================================================================
-- ESEGUI QUESTO SCRIPT NEL SUPABASE SQL EDITOR
--
-- Questo script:
-- 1. Crea la tabella wraps
-- 2. Crea indici, trigger, RLS
-- 3. Aggiunge product_taxonomy entry
-- 4. Migra 5 wraps da sandwiches
-- 5. Migra product_ingredients
-- ============================================================================

-- ============================================================================
-- PART 1: CREATE WRAP_TYPE ENUM (reuse existing bread_type where possible)
-- ============================================================================

-- Create wrap_style type if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'wrap_style') THEN
        CREATE TYPE wrap_style AS ENUM (
            'american',
            'mexican',
            'vietnamese',
            'turkish',
            'middle_eastern',
            'asian',
            'mediterranean',
            'healthy',
            'breakfast'
        );
    END IF;
END $$;

-- Create wrap_type type if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'wrap_type') THEN
        CREATE TYPE wrap_type AS ENUM (
            'flour_tortilla',
            'whole_wheat_tortilla',
            'spinach_tortilla',
            'tomato_tortilla',
            'large_flour_tortilla',
            'rice_paper',
            'lavash',
            'flatbread',
            'lettuce',
            'nori',
            'collard_green',
            'other'
        );
    END IF;
END $$;

-- ============================================================================
-- PART 2: CREATE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS wraps (
    -- Primary identifiers
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,

    -- Basic info (multilingual JSONB)
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    tagline JSONB,

    -- Classification
    status sandwich_status NOT NULL DEFAULT 'active',
    style wrap_style NOT NULL DEFAULT 'american',
    wrap_type wrap_type NOT NULL DEFAULT 'flour_tortilla',
    tags TEXT[] DEFAULT '{}',

    -- Cooking
    is_toasted BOOLEAN DEFAULT false,
    is_grilled BOOLEAN DEFAULT false,

    -- Ingredients (arrays)
    proteins TEXT[] DEFAULT '{}',
    cheeses TEXT[] DEFAULT '{}',
    vegetables TEXT[] DEFAULT '{}',
    condiments TEXT[] DEFAULT '{}',

    -- Characteristics
    is_hot BOOLEAN DEFAULT false,
    is_rolled BOOLEAN DEFAULT true,

    -- Origin (JSONB)
    origin JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- History (optional JSONB)
    history JSONB,

    -- Serving configuration (JSONB)
    serving JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Dietary & Allergens (Sistema 5 Dimensioni)
    dietary JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Customization options (JSONB)
    customization JSONB DEFAULT '{}'::jsonb,

    -- Variations (JSONB array)
    variations JSONB DEFAULT '[]'::jsonb,

    -- Popularity
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

    -- Related wraps
    related_wraps TEXT[] DEFAULT '{}',

    -- Media (JSONB)
    media JSONB,

    -- Pricing (JSONB)
    pricing JSONB,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PART 3: INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_wraps_slug ON wraps(slug);
CREATE INDEX IF NOT EXISTS idx_wraps_status ON wraps(status);
CREATE INDEX IF NOT EXISTS idx_wraps_style ON wraps(style);
CREATE INDEX IF NOT EXISTS idx_wraps_wrap_type ON wraps(wrap_type);
CREATE INDEX IF NOT EXISTS idx_wraps_is_hot ON wraps(is_hot);
CREATE INDEX IF NOT EXISTS idx_wraps_tags ON wraps USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_wraps_proteins ON wraps USING GIN(proteins);
CREATE INDEX IF NOT EXISTS idx_wraps_dietary ON wraps USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_wraps_popularity ON wraps(popularity DESC);

-- ============================================================================
-- PART 4: TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION update_wraps_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_wraps_updated_at ON wraps;
CREATE TRIGGER trigger_wraps_updated_at
    BEFORE UPDATE ON wraps
    FOR EACH ROW
    EXECUTE FUNCTION update_wraps_updated_at();

-- ============================================================================
-- PART 5: RLS
-- ============================================================================

ALTER TABLE wraps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to wraps" ON wraps;
CREATE POLICY "Allow public read access to wraps"
    ON wraps FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow service role full access to wraps" ON wraps;
CREATE POLICY "Allow service role full access to wraps"
    ON wraps FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- PART 6: PRODUCT TAXONOMY
-- ============================================================================

INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it)
SELECT 'wraps', 'standalone', 'food', 'wrap', 'Wraps', 'Wrap'
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'wraps');

-- ============================================================================
-- PART 7: MIGRATE DATA FROM SANDWICHES
-- ============================================================================

INSERT INTO wraps (
    id, slug, name, description, tagline, status,
    style, wrap_type,
    is_toasted, is_grilled,
    proteins, cheeses, vegetables, condiments,
    is_hot, is_rolled,
    origin, history, serving, dietary,
    customization, variations, popularity,
    related_wraps, media, pricing,
    created_at, updated_at
)
SELECT
    -- Rename IDs to use WRP_ prefix
    'WRP_' || UPPER(REPLACE(REPLACE(id, 'sandwich-', ''), '-', '_')) as id,
    slug,
    name,
    description,
    tagline,
    status,
    -- Map style based on bread_type and content
    CASE
        WHEN bread_type = 'rice_paper' THEN 'vietnamese'::wrap_style
        WHEN bread_type = 'lavash' THEN 'turkish'::wrap_style
        WHEN bread_type = 'large_flour_tortilla' THEN 'mexican'::wrap_style
        ELSE 'american'::wrap_style
    END as style,
    -- Map bread_type to wrap_type
    CASE
        WHEN bread_type = 'flour_tortilla' THEN 'flour_tortilla'::wrap_type
        WHEN bread_type = 'large_flour_tortilla' THEN 'large_flour_tortilla'::wrap_type
        WHEN bread_type = 'rice_paper' THEN 'rice_paper'::wrap_type
        WHEN bread_type = 'lavash' THEN 'lavash'::wrap_type
        ELSE 'flour_tortilla'::wrap_type
    END as wrap_type,
    bread_is_toasted as is_toasted,
    bread_is_grilled as is_grilled,
    proteins,
    cheeses,
    vegetables,
    condiments,
    is_hot,
    true as is_rolled,
    origin,
    history,
    serving,
    dietary,
    customization,
    variations,
    popularity,
    '{}' as related_wraps,
    media,
    pricing,
    created_at,
    NOW() as updated_at
FROM sandwiches
WHERE bread_type IN ('flour_tortilla', 'large_flour_tortilla', 'rice_paper', 'lavash')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 8: MIGRATE PRODUCT_INGREDIENTS
-- ============================================================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT
    'wraps' as product_type,
    'WRP_' || UPPER(REPLACE(REPLACE(s.id, 'sandwich-', ''), '-', '_')) as product_id,
    pi.ingredient_id,
    pi.role,
    pi.is_optional,
    pi.sort_order
FROM product_ingredients pi
JOIN sandwiches s ON pi.product_id = s.id
WHERE pi.product_type = 'sandwiches'
AND s.bread_type IN ('flour_tortilla', 'large_flour_tortilla', 'rice_paper', 'lavash')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PART 9: VERIFY
-- ============================================================================

SELECT 'Wraps table created and populated' as status;
SELECT 'Wraps count: ' || COUNT(*) as result FROM wraps;
SELECT 'Product_ingredients count: ' || COUNT(*) as result FROM product_ingredients WHERE product_type = 'wraps';
