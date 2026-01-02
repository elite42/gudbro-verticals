-- ============================================================================
-- GUDBRO Sandwiches Database Schema
-- ============================================================================
-- Sistema 5 Dimensioni v3.0 integrated
-- ============================================================================

-- Create sandwich_style enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sandwich_style') THEN
        CREATE TYPE sandwich_style AS ENUM (
            'italian',
            'french',
            'american',
            'cuban',
            'vietnamese',
            'middle_eastern',
            'mexican',
            'mexican_american',
            'greek',
            'turkish',
            'healthy',
            'signature'
        );
    END IF;
END $$;

-- Create sandwich_status enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sandwich_status') THEN
        CREATE TYPE sandwich_status AS ENUM (
            'classic',
            'traditional',
            'modern',
            'signature',
            'seasonal',
            'active'
        );
    END IF;
END $$;

-- Create bread_type enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'bread_type') THEN
        CREATE TYPE bread_type AS ENUM (
            'ciabatta',
            'focaccia',
            'focaccia_thin',
            'baguette',
            'piadina',
            'white_bread_crustless',
            'rosetta',
            'semelle',
            'tuscan_bread',
            'pain_de_mie',
            'white_toast',
            'rye_bread',
            'hoagie_roll',
            'french_bread',
            'cuban_bread',
            'vietnamese_baguette',
            'pita',
            'flour_tortilla',
            'whole_wheat_tortilla',
            'large_flour_tortilla',
            'rice_paper',
            'lavash',
            'birote',
            'brioche',
            'sourdough',
            'multigrain',
            'other'
        );
    END IF;
END $$;

-- Create sandwiches table
CREATE TABLE IF NOT EXISTS sandwiches (
    -- Primary identifiers
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,

    -- Basic info (multilingual JSONB)
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    tagline JSONB,

    -- Classification
    status sandwich_status NOT NULL DEFAULT 'active',
    style sandwich_style NOT NULL DEFAULT 'italian',
    tags TEXT[] DEFAULT '{}',

    -- Bread
    bread_type bread_type NOT NULL DEFAULT 'ciabatta',
    bread_is_toasted BOOLEAN DEFAULT false,
    bread_is_grilled BOOLEAN DEFAULT false,

    -- Ingredients (arrays)
    proteins TEXT[] DEFAULT '{}',
    cheeses TEXT[] DEFAULT '{}',
    vegetables TEXT[] DEFAULT '{}',
    condiments TEXT[] DEFAULT '{}',

    -- Characteristics
    is_hot BOOLEAN DEFAULT false,
    is_pressed BOOLEAN DEFAULT false,

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

    -- Related sandwiches
    related_sandwiches TEXT[] DEFAULT '{}',

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

CREATE INDEX IF NOT EXISTS idx_sandwiches_slug ON sandwiches(slug);
CREATE INDEX IF NOT EXISTS idx_sandwiches_status ON sandwiches(status);
CREATE INDEX IF NOT EXISTS idx_sandwiches_style ON sandwiches(style);
CREATE INDEX IF NOT EXISTS idx_sandwiches_bread_type ON sandwiches(bread_type);
CREATE INDEX IF NOT EXISTS idx_sandwiches_is_hot ON sandwiches(is_hot);
CREATE INDEX IF NOT EXISTS idx_sandwiches_is_pressed ON sandwiches(is_pressed);
CREATE INDEX IF NOT EXISTS idx_sandwiches_tags ON sandwiches USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_sandwiches_proteins ON sandwiches USING GIN(proteins);
CREATE INDEX IF NOT EXISTS idx_sandwiches_dietary ON sandwiches USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_sandwiches_popularity ON sandwiches(popularity DESC);

-- ============================================================================
-- TRIGGER: Auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_sandwiches_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sandwiches_updated_at ON sandwiches;
CREATE TRIGGER trigger_sandwiches_updated_at
    BEFORE UPDATE ON sandwiches
    FOR EACH ROW
    EXECUTE FUNCTION update_sandwiches_updated_at();

-- ============================================================================
-- RLS (Row Level Security)
-- ============================================================================

ALTER TABLE sandwiches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to sandwiches"
    ON sandwiches FOR SELECT
    USING (true);

CREATE POLICY "Allow service role full access to sandwiches"
    ON sandwiches FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE sandwiches IS 'GUDBRO Sandwiches Database with Sistema 5 Dimensioni support';
COMMENT ON COLUMN sandwiches.dietary IS 'Sistema 5 Dimensioni: allergens, diets, nutrition';
COMMENT ON COLUMN sandwiches.popularity IS 'Score 0-100 for sorting and recommendations';

-- Done
SELECT 'Sandwiches table created successfully' as status;
