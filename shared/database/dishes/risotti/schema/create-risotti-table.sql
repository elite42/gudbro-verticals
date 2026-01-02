-- ============================================================================
-- GUDBRO Risotti Table Schema
-- Sistema 5 Dimensioni v3.0 integrated
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
DO $$ BEGIN
    CREATE TYPE risotto_style AS ENUM (
        'italian_classic',
        'italian_regional',
        'spanish_paella',
        'indian_biryani',
        'asian_fried',
        'asian_other',
        'middle_eastern',
        'latin_american',
        'fusion',
        'signature'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE rice_type AS ENUM (
        'arborio',
        'carnaroli',
        'vialone_nano',
        'bomba',
        'calasparra',
        'basmati',
        'jasmine',
        'long_grain',
        'short_grain',
        'sticky',
        'brown',
        'wild',
        'black',
        'red',
        'other'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE rice_cooking_method AS ENUM (
        'risotto',
        'pilaf',
        'paella',
        'biryani',
        'fried',
        'steamed',
        'baked',
        'congee',
        'pressure_cooked'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE risotto_status AS ENUM (
        'active',
        'classic',
        'traditional',
        'modern',
        'signature',
        'seasonal',
        'inactive'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- MAIN RISOTTI TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS risotti (
    -- Primary Key
    id TEXT PRIMARY KEY,

    -- Identifiers
    slug TEXT UNIQUE NOT NULL,
    stable_key TEXT UNIQUE,

    -- Basic Info (JSONB for multilingual)
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    tagline JSONB,

    -- Classification
    status risotto_status NOT NULL DEFAULT 'active',
    style risotto_style NOT NULL,
    tags TEXT[] DEFAULT '{}',

    -- Origin
    origin JSONB NOT NULL DEFAULT '{}',

    -- History (optional)
    history JSONB,

    -- Rice Type
    rice_type JSONB NOT NULL,

    -- Broth/Liquid
    broth JSONB,

    -- Cooking
    cooking JSONB NOT NULL,

    -- Ingredients
    main_ingredients TEXT[] DEFAULT '{}',
    proteins TEXT[] DEFAULT '{}',
    vegetables TEXT[] DEFAULT '{}',
    aromatics TEXT[] DEFAULT '{}',

    -- Finishing
    finishing JSONB,

    -- Serving
    serving JSONB NOT NULL DEFAULT '{}',

    -- Dietary & Allergens (Sistema 5 Dimensioni)
    dietary JSONB NOT NULL,

    -- Pricing
    pricing JSONB,

    -- Availability
    availability JSONB,

    -- Customization
    customization JSONB,

    -- Metadata
    source_url TEXT,
    source_note TEXT,
    version INTEGER DEFAULT 1,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Basic indexes
CREATE INDEX IF NOT EXISTS idx_risotti_slug ON risotti(slug);
CREATE INDEX IF NOT EXISTS idx_risotti_style ON risotti(style);
CREATE INDEX IF NOT EXISTS idx_risotti_status ON risotti(status);

-- JSONB indexes for filtering (Sistema 5 Dimensioni)
CREATE INDEX IF NOT EXISTS idx_risotti_dietary ON risotti USING GIN (dietary);
CREATE INDEX IF NOT EXISTS idx_risotti_tags ON risotti USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_risotti_origin ON risotti USING GIN (origin);

-- Rice type index
CREATE INDEX IF NOT EXISTS idx_risotti_rice_type ON risotti USING GIN (rice_type);

-- Full text search
CREATE INDEX IF NOT EXISTS idx_risotti_name_search ON risotti USING GIN (name jsonb_path_ops);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_risotti_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_risotti_updated_at ON risotti;
CREATE TRIGGER trigger_risotti_updated_at
    BEFORE UPDATE ON risotti
    FOR EACH ROW
    EXECUTE FUNCTION update_risotti_updated_at();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE risotti IS 'GUDBRO Risotti database - Italian risotti, paella, biryani, and rice dishes with Sistema 5 Dimensioni filters';
COMMENT ON COLUMN risotti.dietary IS 'Sistema 5 Dimensioni: allergens, intolerances, diets, nutrition, spice level';
COMMENT ON COLUMN risotti.rice_type IS 'Rice variety and characteristics';
COMMENT ON COLUMN risotti.cooking IS 'Cooking method, time, difficulty, and equipment';
