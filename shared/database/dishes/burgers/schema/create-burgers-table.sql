-- ============================================================================
-- GUDBRO Burgers Database Schema
-- ============================================================================
-- Sistema 5 Dimensioni v3.0 integrated
-- ============================================================================

-- Create burger_style enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'burger_style') THEN
        CREATE TYPE burger_style AS ENUM (
            'american_classic',
            'american_regional',
            'gourmet',
            'international',
            'plant_based',
            'chicken',
            'fish',
            'signature'
        );
    END IF;
END $$;

-- Create burger_status enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'burger_status') THEN
        CREATE TYPE burger_status AS ENUM (
            'classic',
            'traditional',
            'modern',
            'signature',
            'seasonal',
            'active'
        );
    END IF;
END $$;

-- Create bun_type enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'bun_type') THEN
        CREATE TYPE bun_type AS ENUM (
            'brioche',
            'sesame',
            'potato',
            'pretzel',
            'ciabatta',
            'english_muffin',
            'lettuce_wrap',
            'gluten_free',
            'sourdough',
            'kaiser',
            'onion_roll',
            'whole_wheat',
            'other'
        );
    END IF;
END $$;

-- Create patty_type enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'patty_type') THEN
        CREATE TYPE patty_type AS ENUM (
            'beef',
            'wagyu',
            'angus',
            'blend',
            'chicken',
            'turkey',
            'lamb',
            'pork',
            'fish',
            'shrimp',
            'plant_based',
            'black_bean',
            'portobello',
            'other'
        );
    END IF;
END $$;

-- Create cook_level enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cook_level') THEN
        CREATE TYPE cook_level AS ENUM (
            'rare',
            'medium_rare',
            'medium',
            'medium_well',
            'well_done'
        );
    END IF;
END $$;

-- Create burgers table
CREATE TABLE IF NOT EXISTS burgers (
    -- Primary identifiers
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,

    -- Basic info (multilingual JSONB)
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    tagline JSONB,

    -- Classification
    status burger_status NOT NULL DEFAULT 'active',
    style burger_style NOT NULL DEFAULT 'american_classic',
    tags TEXT[] DEFAULT '{}',

    -- Bun
    bun_type bun_type NOT NULL DEFAULT 'brioche',
    bun_is_toasted BOOLEAN DEFAULT true,

    -- Patty
    patty_type patty_type NOT NULL DEFAULT 'beef',
    patty_weight_g INTEGER DEFAULT 150,
    patty_count INTEGER DEFAULT 1,
    patty_recommended_cook cook_level DEFAULT 'medium',

    -- Ingredients (arrays)
    cheeses TEXT[] DEFAULT '{}',
    toppings TEXT[] DEFAULT '{}',
    sauces TEXT[] DEFAULT '{}',

    -- Characteristics
    is_spicy BOOLEAN DEFAULT false,
    spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

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

    -- Related burgers
    related_burgers TEXT[] DEFAULT '{}',

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

CREATE INDEX IF NOT EXISTS idx_burgers_slug ON burgers(slug);
CREATE INDEX IF NOT EXISTS idx_burgers_status ON burgers(status);
CREATE INDEX IF NOT EXISTS idx_burgers_style ON burgers(style);
CREATE INDEX IF NOT EXISTS idx_burgers_bun_type ON burgers(bun_type);
CREATE INDEX IF NOT EXISTS idx_burgers_patty_type ON burgers(patty_type);
CREATE INDEX IF NOT EXISTS idx_burgers_is_spicy ON burgers(is_spicy);
CREATE INDEX IF NOT EXISTS idx_burgers_spice_level ON burgers(spice_level);
CREATE INDEX IF NOT EXISTS idx_burgers_tags ON burgers USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_burgers_cheeses ON burgers USING GIN(cheeses);
CREATE INDEX IF NOT EXISTS idx_burgers_dietary ON burgers USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_burgers_popularity ON burgers(popularity DESC);

-- ============================================================================
-- TRIGGER: Auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_burgers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_burgers_updated_at ON burgers;
CREATE TRIGGER trigger_burgers_updated_at
    BEFORE UPDATE ON burgers
    FOR EACH ROW
    EXECUTE FUNCTION update_burgers_updated_at();

-- ============================================================================
-- RLS (Row Level Security)
-- ============================================================================

ALTER TABLE burgers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to burgers" ON burgers;
CREATE POLICY "Allow public read access to burgers"
    ON burgers FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow service role full access to burgers" ON burgers;
CREATE POLICY "Allow service role full access to burgers"
    ON burgers FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE burgers IS 'GUDBRO Burgers Database with Sistema 5 Dimensioni support';
COMMENT ON COLUMN burgers.dietary IS 'Sistema 5 Dimensioni: allergens, diets, nutrition';
COMMENT ON COLUMN burgers.popularity IS 'Score 0-100 for sorting and recommendations';
COMMENT ON COLUMN burgers.spice_level IS 'Spice scale 0-5 (0=none, 5=extreme)';

-- Done
SELECT 'Burgers table created successfully' as status;
