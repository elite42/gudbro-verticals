-- ============================================================================
-- PIADINE - Complete Setup Script
-- ============================================================================
-- ESEGUI QUESTO SCRIPT NEL SUPABASE SQL EDITOR
--
-- Questo script:
-- 1. Crea la tabella piadine
-- 2. Crea indici, trigger, RLS
-- 3. Aggiunge product_taxonomy entry
-- 4. Migra 21 piadine da sandwiches
-- 5. Migra product_ingredients
-- ============================================================================

-- ============================================================================
-- PART 1: CREATE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS piadine (
    -- Primary identifiers
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,

    -- Basic info (multilingual JSONB)
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    tagline JSONB,

    -- Classification
    status sandwich_status NOT NULL DEFAULT 'active',
    category TEXT NOT NULL DEFAULT 'piadina' CHECK (category IN ('piadina', 'crescione')),
    tags TEXT[] DEFAULT '{}',

    -- Piadina cooking (always grilled by default)
    is_toasted BOOLEAN DEFAULT false,
    is_grilled BOOLEAN DEFAULT true,

    -- Ingredients (arrays)
    proteins TEXT[] DEFAULT '{}',
    cheeses TEXT[] DEFAULT '{}',
    vegetables TEXT[] DEFAULT '{}',
    condiments TEXT[] DEFAULT '{}',

    -- Characteristics
    is_hot BOOLEAN DEFAULT true,
    is_pressed BOOLEAN DEFAULT false,

    -- Origin (JSONB)
    origin JSONB NOT NULL DEFAULT '{"country": "Italy", "country_code": "IT", "region": "Emilia-Romagna"}'::jsonb,

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

    -- Related piadine
    related_piadine TEXT[] DEFAULT '{}',

    -- Media (JSONB)
    media JSONB,

    -- Pricing (JSONB)
    pricing JSONB,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PART 2: INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_piadine_slug ON piadine(slug);
CREATE INDEX IF NOT EXISTS idx_piadine_status ON piadine(status);
CREATE INDEX IF NOT EXISTS idx_piadine_category ON piadine(category);
CREATE INDEX IF NOT EXISTS idx_piadine_is_hot ON piadine(is_hot);
CREATE INDEX IF NOT EXISTS idx_piadine_is_pressed ON piadine(is_pressed);
CREATE INDEX IF NOT EXISTS idx_piadine_tags ON piadine USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_piadine_proteins ON piadine USING GIN(proteins);
CREATE INDEX IF NOT EXISTS idx_piadine_dietary ON piadine USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_piadine_popularity ON piadine(popularity DESC);

-- ============================================================================
-- PART 3: TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION update_piadine_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_piadine_updated_at ON piadine;
CREATE TRIGGER trigger_piadine_updated_at
    BEFORE UPDATE ON piadine
    FOR EACH ROW
    EXECUTE FUNCTION update_piadine_updated_at();

-- ============================================================================
-- PART 4: RLS
-- ============================================================================

ALTER TABLE piadine ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to piadine" ON piadine;
CREATE POLICY "Allow public read access to piadine"
    ON piadine FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow service role full access to piadine" ON piadine;
CREATE POLICY "Allow service role full access to piadine"
    ON piadine FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- PART 5: PRODUCT TAXONOMY
-- ============================================================================

INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it)
SELECT 'piadine', 'standalone', 'food', 'piadina', 'Piadine', 'Piadine'
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'piadine');

-- ============================================================================
-- PART 6: MIGRATE DATA FROM SANDWICHES
-- ============================================================================

INSERT INTO piadine (
    id, slug, name, description, tagline, status,
    category,
    is_toasted, is_grilled,
    proteins, cheeses, vegetables, condiments,
    is_hot, is_pressed,
    origin, history, serving, dietary,
    customization, variations, popularity,
    related_piadine, media, pricing,
    created_at, updated_at
)
SELECT
    -- Rename IDs to use PIA_ prefix
    CASE
        WHEN id LIKE 'sandwich-piadina%' THEN 'PIA_ROMAGNOLA'
        WHEN id LIKE 'piadina-%' THEN 'PIA_' || UPPER(REPLACE(REPLACE(id, 'piadina-', ''), '-', '_'))
        WHEN id LIKE 'crescione-%' THEN 'PIA_CRESCIONE_' || UPPER(REPLACE(REPLACE(id, 'crescione-', ''), '-', '_'))
        ELSE 'PIA_' || UPPER(REPLACE(id, '-', '_'))
    END as id,
    slug,
    name,
    description,
    tagline,
    status,
    -- Set category based on original ID
    CASE
        WHEN id LIKE 'crescione-%' THEN 'crescione'
        ELSE 'piadina'
    END as category,
    bread_is_toasted as is_toasted,
    bread_is_grilled as is_grilled,
    proteins,
    cheeses,
    vegetables,
    condiments,
    is_hot,
    is_pressed,
    origin,
    history,
    serving,
    dietary,
    customization,
    variations,
    popularity,
    related_sandwiches as related_piadine,
    media,
    pricing,
    created_at,
    NOW() as updated_at
FROM sandwiches
WHERE bread_type = 'piadina'
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 7: MIGRATE PRODUCT_INGREDIENTS
-- ============================================================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT
    'piadine' as product_type,
    CASE
        WHEN s.id LIKE 'sandwich-piadina%' THEN 'PIA_ROMAGNOLA'
        WHEN s.id LIKE 'piadina-%' THEN 'PIA_' || UPPER(REPLACE(REPLACE(s.id, 'piadina-', ''), '-', '_'))
        WHEN s.id LIKE 'crescione-%' THEN 'PIA_CRESCIONE_' || UPPER(REPLACE(REPLACE(s.id, 'crescione-', ''), '-', '_'))
        ELSE 'PIA_' || UPPER(REPLACE(s.id, '-', '_'))
    END as product_id,
    pi.ingredient_id,
    pi.role,
    pi.is_optional,
    pi.sort_order
FROM product_ingredients pi
JOIN sandwiches s ON pi.product_id = s.id
WHERE pi.product_type = 'sandwiches'
AND s.bread_type = 'piadina'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PART 8: VERIFY
-- ============================================================================

SELECT 'Piadine table created and populated' as status;
SELECT 'Piadine count: ' || COUNT(*) as result FROM piadine;
SELECT 'Product_ingredients count: ' || COUNT(*) as result FROM product_ingredients WHERE product_type = 'piadine';
