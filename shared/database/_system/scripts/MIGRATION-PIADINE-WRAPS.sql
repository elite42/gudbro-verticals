-- ============================================================================
-- MASTER MIGRATION SCRIPT: PIADINE & WRAPS
-- ============================================================================
-- ESEGUI QUESTO SCRIPT NEL SUPABASE SQL EDITOR
--
-- Questo script completo:
-- 1. Crea tabella PIADINE e migra 21 record
-- 2. Crea tabella WRAPS e migra 5 record
-- 3. Pulisce SANDWICHES (rimuove i migrati)
--
-- Dopo esecuzione:
-- - piadine: 21 record
-- - wraps: 5 record
-- - sandwiches: 24 record (50 - 21 - 5 = 24)
-- ============================================================================

-- ============================================================================
-- ███████████████████████████████████████████████████████████████████████████
-- SECTION 1: PIADINE TABLE
-- ███████████████████████████████████████████████████████████████████████████
-- ============================================================================

-- Create piadine table
CREATE TABLE IF NOT EXISTS piadine (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    tagline JSONB,
    status sandwich_status NOT NULL DEFAULT 'active',
    category TEXT NOT NULL DEFAULT 'piadina' CHECK (category IN ('piadina', 'crescione')),
    tags TEXT[] DEFAULT '{}',
    is_toasted BOOLEAN DEFAULT false,
    is_grilled BOOLEAN DEFAULT true,
    proteins TEXT[] DEFAULT '{}',
    cheeses TEXT[] DEFAULT '{}',
    vegetables TEXT[] DEFAULT '{}',
    condiments TEXT[] DEFAULT '{}',
    is_hot BOOLEAN DEFAULT true,
    is_pressed BOOLEAN DEFAULT false,
    origin JSONB NOT NULL DEFAULT '{"country": "Italy", "country_code": "IT", "region": "Emilia-Romagna"}'::jsonb,
    history JSONB,
    serving JSONB NOT NULL DEFAULT '{}'::jsonb,
    dietary JSONB NOT NULL DEFAULT '{}'::jsonb,
    customization JSONB DEFAULT '{}'::jsonb,
    variations JSONB DEFAULT '[]'::jsonb,
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    related_piadine TEXT[] DEFAULT '{}',
    media JSONB,
    pricing JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Piadine indexes
CREATE INDEX IF NOT EXISTS idx_piadine_slug ON piadine(slug);
CREATE INDEX IF NOT EXISTS idx_piadine_status ON piadine(status);
CREATE INDEX IF NOT EXISTS idx_piadine_category ON piadine(category);
CREATE INDEX IF NOT EXISTS idx_piadine_popularity ON piadine(popularity DESC);

-- Piadine trigger
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

-- Piadine RLS
ALTER TABLE piadine ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to piadine" ON piadine;
CREATE POLICY "Allow public read access to piadine"
    ON piadine FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow service role full access to piadine" ON piadine;
CREATE POLICY "Allow service role full access to piadine"
    ON piadine FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Piadine taxonomy
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it)
SELECT 'piadine', 'standalone', 'food', 'piadina', 'Piadine', 'Piadine'
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'piadine');

-- Migrate piadine data
INSERT INTO piadine (
    id, slug, name, description, tagline, status, category,
    is_toasted, is_grilled, proteins, cheeses, vegetables, condiments,
    is_hot, is_pressed, origin, history, serving, dietary,
    customization, variations, popularity, related_piadine, media, pricing,
    created_at, updated_at
)
SELECT
    CASE
        WHEN id LIKE 'sandwich-piadina%' THEN 'PIA_ROMAGNOLA'
        WHEN id LIKE 'piadina-%' THEN 'PIA_' || UPPER(REPLACE(REPLACE(id, 'piadina-', ''), '-', '_'))
        WHEN id LIKE 'crescione-%' THEN 'PIA_CRESCIONE_' || UPPER(REPLACE(REPLACE(id, 'crescione-', ''), '-', '_'))
        ELSE 'PIA_' || UPPER(REPLACE(id, '-', '_'))
    END,
    slug, name, description, tagline, status,
    CASE WHEN id LIKE 'crescione-%' THEN 'crescione' ELSE 'piadina' END,
    bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments,
    is_hot, is_pressed, origin, history, serving, dietary,
    customization, variations, popularity, related_sandwiches, media, pricing,
    created_at, NOW()
FROM sandwiches WHERE bread_type = 'piadina'
ON CONFLICT (id) DO NOTHING;

-- Migrate piadine product_ingredients
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT
    'piadine',
    CASE
        WHEN s.id LIKE 'sandwich-piadina%' THEN 'PIA_ROMAGNOLA'
        WHEN s.id LIKE 'piadina-%' THEN 'PIA_' || UPPER(REPLACE(REPLACE(s.id, 'piadina-', ''), '-', '_'))
        WHEN s.id LIKE 'crescione-%' THEN 'PIA_CRESCIONE_' || UPPER(REPLACE(REPLACE(s.id, 'crescione-', ''), '-', '_'))
        ELSE 'PIA_' || UPPER(REPLACE(s.id, '-', '_'))
    END,
    pi.ingredient_id, pi.role, pi.is_optional, pi.sort_order
FROM product_ingredients pi
JOIN sandwiches s ON pi.product_id = s.id
WHERE pi.product_type = 'sandwiches' AND s.bread_type = 'piadina'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- ███████████████████████████████████████████████████████████████████████████
-- SECTION 2: WRAPS TABLE
-- ███████████████████████████████████████████████████████████████████████████
-- ============================================================================

-- Create wrap enums
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'wrap_style') THEN
        CREATE TYPE wrap_style AS ENUM (
            'american', 'mexican', 'vietnamese', 'turkish',
            'middle_eastern', 'asian', 'mediterranean', 'healthy', 'breakfast'
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'wrap_type') THEN
        CREATE TYPE wrap_type AS ENUM (
            'flour_tortilla', 'whole_wheat_tortilla', 'spinach_tortilla',
            'tomato_tortilla', 'large_flour_tortilla', 'rice_paper',
            'lavash', 'flatbread', 'lettuce', 'nori', 'collard_green', 'other'
        );
    END IF;
END $$;

-- Create wraps table
CREATE TABLE IF NOT EXISTS wraps (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    tagline JSONB,
    status sandwich_status NOT NULL DEFAULT 'active',
    style wrap_style NOT NULL DEFAULT 'american',
    wrap_type wrap_type NOT NULL DEFAULT 'flour_tortilla',
    tags TEXT[] DEFAULT '{}',
    is_toasted BOOLEAN DEFAULT false,
    is_grilled BOOLEAN DEFAULT false,
    proteins TEXT[] DEFAULT '{}',
    cheeses TEXT[] DEFAULT '{}',
    vegetables TEXT[] DEFAULT '{}',
    condiments TEXT[] DEFAULT '{}',
    is_hot BOOLEAN DEFAULT false,
    is_rolled BOOLEAN DEFAULT true,
    origin JSONB NOT NULL DEFAULT '{}'::jsonb,
    history JSONB,
    serving JSONB NOT NULL DEFAULT '{}'::jsonb,
    dietary JSONB NOT NULL DEFAULT '{}'::jsonb,
    customization JSONB DEFAULT '{}'::jsonb,
    variations JSONB DEFAULT '[]'::jsonb,
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    related_wraps TEXT[] DEFAULT '{}',
    media JSONB,
    pricing JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wraps indexes
CREATE INDEX IF NOT EXISTS idx_wraps_slug ON wraps(slug);
CREATE INDEX IF NOT EXISTS idx_wraps_status ON wraps(status);
CREATE INDEX IF NOT EXISTS idx_wraps_style ON wraps(style);
CREATE INDEX IF NOT EXISTS idx_wraps_wrap_type ON wraps(wrap_type);
CREATE INDEX IF NOT EXISTS idx_wraps_popularity ON wraps(popularity DESC);

-- Wraps trigger
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

-- Wraps RLS
ALTER TABLE wraps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to wraps" ON wraps;
CREATE POLICY "Allow public read access to wraps"
    ON wraps FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow service role full access to wraps" ON wraps;
CREATE POLICY "Allow service role full access to wraps"
    ON wraps FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Wraps taxonomy
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it)
SELECT 'wraps', 'standalone', 'food', 'wrap', 'Wraps', 'Wrap'
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'wraps');

-- Migrate wraps data
INSERT INTO wraps (
    id, slug, name, description, tagline, status, style, wrap_type,
    is_toasted, is_grilled, proteins, cheeses, vegetables, condiments,
    is_hot, is_rolled, origin, history, serving, dietary,
    customization, variations, popularity, related_wraps, media, pricing,
    created_at, updated_at
)
SELECT
    'WRP_' || UPPER(REPLACE(REPLACE(id, 'sandwich-', ''), '-', '_')),
    slug, name, description, tagline, status,
    CASE
        WHEN bread_type = 'rice_paper' THEN 'vietnamese'::wrap_style
        WHEN bread_type = 'lavash' THEN 'turkish'::wrap_style
        WHEN bread_type = 'large_flour_tortilla' THEN 'mexican'::wrap_style
        ELSE 'american'::wrap_style
    END,
    CASE
        WHEN bread_type = 'flour_tortilla' THEN 'flour_tortilla'::wrap_type
        WHEN bread_type = 'large_flour_tortilla' THEN 'large_flour_tortilla'::wrap_type
        WHEN bread_type = 'rice_paper' THEN 'rice_paper'::wrap_type
        WHEN bread_type = 'lavash' THEN 'lavash'::wrap_type
        ELSE 'flour_tortilla'::wrap_type
    END,
    bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments,
    is_hot, true, origin, history, serving, dietary,
    customization, variations, popularity, '{}', media, pricing,
    created_at, NOW()
FROM sandwiches
WHERE bread_type IN ('flour_tortilla', 'large_flour_tortilla', 'rice_paper', 'lavash')
ON CONFLICT (id) DO NOTHING;

-- Migrate wraps product_ingredients
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT
    'wraps',
    'WRP_' || UPPER(REPLACE(REPLACE(s.id, 'sandwich-', ''), '-', '_')),
    pi.ingredient_id, pi.role, pi.is_optional, pi.sort_order
FROM product_ingredients pi
JOIN sandwiches s ON pi.product_id = s.id
WHERE pi.product_type = 'sandwiches'
AND s.bread_type IN ('flour_tortilla', 'large_flour_tortilla', 'rice_paper', 'lavash')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- ███████████████████████████████████████████████████████████████████████████
-- SECTION 3: CLEANUP SANDWICHES
-- ███████████████████████████████████████████████████████████████████████████
-- ============================================================================

-- Remove piadine product_ingredients from sandwiches
DELETE FROM product_ingredients
WHERE product_type = 'sandwiches'
AND product_id IN (SELECT id FROM sandwiches WHERE bread_type = 'piadina');

-- Remove wraps product_ingredients from sandwiches
DELETE FROM product_ingredients
WHERE product_type = 'sandwiches'
AND product_id IN (
    SELECT id FROM sandwiches
    WHERE bread_type IN ('flour_tortilla', 'large_flour_tortilla', 'rice_paper', 'lavash')
);

-- Remove piadine from sandwiches
DELETE FROM sandwiches WHERE bread_type = 'piadina';

-- Remove wraps from sandwiches
DELETE FROM sandwiches
WHERE bread_type IN ('flour_tortilla', 'large_flour_tortilla', 'rice_paper', 'lavash');

-- ============================================================================
-- ███████████████████████████████████████████████████████████████████████████
-- FINAL VERIFICATION
-- ███████████████████████████████████████████████████████████████████████████
-- ============================================================================

SELECT '=== MIGRATION COMPLETED ===' as status;
SELECT 'Piadine: ' || COUNT(*) as count FROM piadine;
SELECT 'Wraps: ' || COUNT(*) as count FROM wraps;
SELECT 'Sandwiches remaining: ' || COUNT(*) as count FROM sandwiches;
SELECT 'Product_ingredients (piadine): ' || COUNT(*) as count FROM product_ingredients WHERE product_type = 'piadine';
SELECT 'Product_ingredients (wraps): ' || COUNT(*) as count FROM product_ingredients WHERE product_type = 'wraps';
SELECT 'Product_ingredients (sandwiches): ' || COUNT(*) as count FROM product_ingredients WHERE product_type = 'sandwiches';
