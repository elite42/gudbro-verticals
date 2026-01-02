-- ============================================================================
-- GUDBRO Dumplings Table Schema
--
-- Stores all dumplings/gnocchi with full Sistema 5 Dimensioni integration
-- Supports Italian gnocchi, Asian dumplings, and international varieties
-- ============================================================================

-- Drop existing table if needed (uncomment for reset)
-- DROP TABLE IF EXISTS dumplings CASCADE;

CREATE TABLE IF NOT EXISTS dumplings (
    -- IDENTIFIERS
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    stable_key TEXT,

    -- BASIC INFO (JSONB for multilingual support)
    name JSONB NOT NULL,          -- { en: "", it: "", vi: "" }
    description JSONB NOT NULL,   -- { en: "", it: "", vi: "" }
    tagline JSONB,                -- { en: "", it: "", vi: "" }

    -- CLASSIFICATION
    status TEXT NOT NULL DEFAULT 'active',
    style TEXT NOT NULL,          -- italian_gnocchi, asian_chinese, etc.
    tags TEXT[] DEFAULT '{}',

    -- ORIGIN
    origin JSONB NOT NULL,        -- { country, region?, city?, notes? }

    -- HISTORY (optional)
    history JSONB,                -- { story?, fun_fact? }

    -- WRAPPER/DOUGH
    wrapper JSONB NOT NULL,       -- { type, is_homemade?, is_gluten_free?, notes? }

    -- FILLING
    filling JSONB,                -- { style, main_ingredients[], seasoning[]?, is_signature? }

    -- COOKING
    cooking JSONB NOT NULL,       -- { method, time_minutes, difficulty, equipment[]? }

    -- SAUCE/ACCOMPANIMENT
    sauce JSONB,                  -- { name, ingredients[], is_signature?, is_spicy? }

    -- SERVING
    serving JSONB NOT NULL,       -- { portion_size, pieces_per_serving?, temperature, presentation }

    -- DIETARY (Sistema 5 Dimensioni)
    dietary JSONB NOT NULL,       -- Full dietary info

    -- PRICING
    pricing JSONB,                -- { cost_level, suggested_price_usd? }

    -- AVAILABILITY
    availability JSONB,           -- { is_seasonal, seasons[]? }

    -- CUSTOMIZATION
    customization JSONB,          -- { add_protein?, make_vegetarian?, spice_adjustable? }

    -- METADATA
    source_url TEXT,
    source_note TEXT,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Basic lookups
CREATE INDEX IF NOT EXISTS idx_dumplings_slug ON dumplings(slug);
CREATE INDEX IF NOT EXISTS idx_dumplings_status ON dumplings(status);
CREATE INDEX IF NOT EXISTS idx_dumplings_style ON dumplings(style);

-- Array searches
CREATE INDEX IF NOT EXISTS idx_dumplings_tags ON dumplings USING GIN(tags);

-- JSONB indexes for common queries
CREATE INDEX IF NOT EXISTS idx_dumplings_origin ON dumplings USING GIN(origin);
CREATE INDEX IF NOT EXISTS idx_dumplings_dietary ON dumplings USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_dumplings_wrapper ON dumplings USING GIN(wrapper);
CREATE INDEX IF NOT EXISTS idx_dumplings_filling ON dumplings USING GIN(filling);

-- Dietary filter indexes (Sistema 5 Dimensioni)
CREATE INDEX IF NOT EXISTS idx_dumplings_vegetarian ON dumplings((dietary->>'is_vegetarian'));
CREATE INDEX IF NOT EXISTS idx_dumplings_vegan ON dumplings((dietary->>'is_vegan'));
CREATE INDEX IF NOT EXISTS idx_dumplings_gluten_free ON dumplings((dietary->>'is_gluten_free'));
CREATE INDEX IF NOT EXISTS idx_dumplings_dairy_free ON dumplings((dietary->>'is_dairy_free'));
CREATE INDEX IF NOT EXISTS idx_dumplings_halal ON dumplings((dietary->>'is_halal'));
CREATE INDEX IF NOT EXISTS idx_dumplings_kosher ON dumplings((dietary->>'is_kosher'));
CREATE INDEX IF NOT EXISTS idx_dumplings_spice_level ON dumplings((dietary->>'spice_level'));

-- Cooking method index
CREATE INDEX IF NOT EXISTS idx_dumplings_cooking_method ON dumplings((cooking->>'method'));

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_dumplings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_dumplings_updated_at ON dumplings;
CREATE TRIGGER trigger_dumplings_updated_at
    BEFORE UPDATE ON dumplings
    FOR EACH ROW
    EXECUTE FUNCTION update_dumplings_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE dumplings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access to dumplings"
    ON dumplings FOR SELECT
    USING (true);

-- Authenticated users can insert/update
CREATE POLICY "Allow authenticated insert to dumplings"
    ON dumplings FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update to dumplings"
    ON dumplings FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Service role has full access
CREATE POLICY "Allow service role full access to dumplings"
    ON dumplings FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE dumplings IS 'GUDBRO Dumplings database with Sistema 5 Dimensioni integration';
COMMENT ON COLUMN dumplings.style IS 'Dumpling style: italian_gnocchi, italian_filled, asian_*, eastern_european, etc.';
COMMENT ON COLUMN dumplings.wrapper IS 'Wrapper/dough info: type, homemade, gluten-free';
COMMENT ON COLUMN dumplings.filling IS 'Filling info: style, main ingredients, seasoning';
COMMENT ON COLUMN dumplings.dietary IS 'Full dietary info following Sistema 5 Dimensioni v3.0';
