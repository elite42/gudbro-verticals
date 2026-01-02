-- ============================================================================
-- GUDBRO Piadine Database Schema
-- ============================================================================
-- Piadine Romagnole e Crescioni - specialità emiliano-romagnole
-- Migrazione da sandwiches table per organizzazione logica
-- Sistema 5 Dimensioni v3.0 integrated
-- ============================================================================

-- Create piadina_style type (TEXT + CHECK per nuove tabelle come da standard)
-- Per ora usiamo le stesse ENUM di sandwiches dato che già esistono

-- Create piadine table
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

    -- Piadina is always grilled (no bread_type needed, implicit)
    is_toasted BOOLEAN DEFAULT false,
    is_grilled BOOLEAN DEFAULT true,

    -- Ingredients (arrays)
    proteins TEXT[] DEFAULT '{}',
    cheeses TEXT[] DEFAULT '{}',
    vegetables TEXT[] DEFAULT '{}',
    condiments TEXT[] DEFAULT '{}',

    -- Characteristics
    is_hot BOOLEAN DEFAULT true,
    is_pressed BOOLEAN DEFAULT false, -- crescioni are pressed/sealed

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
-- INDEXES
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
-- TRIGGER: Auto-update updated_at
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
-- RLS (Row Level Security)
-- ============================================================================

ALTER TABLE piadine ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to piadine"
    ON piadine FOR SELECT
    USING (true);

CREATE POLICY "Allow service role full access to piadine"
    ON piadine FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE piadine IS 'GUDBRO Piadine Romagnole Database - Traditional Italian flatbread sandwiches';
COMMENT ON COLUMN piadine.category IS 'piadina = open/folded, crescione = sealed half-moon';
COMMENT ON COLUMN piadine.dietary IS 'Sistema 5 Dimensioni: allergens, diets, nutrition';
COMMENT ON COLUMN piadine.popularity IS 'Score 0-100 for sorting and recommendations';

-- Done
SELECT 'Piadine table created successfully' as status;
