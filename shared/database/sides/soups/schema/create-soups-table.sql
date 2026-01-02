-- ============================================================================
-- GUDBRO Soups Table Schema
--
-- Stores all soups with full Sistema 5 Dimensioni integration
-- Supports Italian, Asian, European, American, and international soups
-- ============================================================================

-- Drop existing table if needed (uncomment for reset)
-- DROP TABLE IF EXISTS soups CASCADE;

CREATE TABLE IF NOT EXISTS soups (
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
    style TEXT NOT NULL,          -- italian, french, asian_*, etc.
    tags TEXT[] DEFAULT '{}',

    -- ORIGIN
    origin JSONB NOT NULL,        -- { country, region?, city?, notes? }

    -- HISTORY (optional)
    history JSONB,                -- { story?, fun_fact? }

    -- SOUP CHARACTERISTICS
    soup_type JSONB NOT NULL,     -- { base, texture, temperature, is_clear? }

    -- BROTH/BASE
    broth JSONB,                  -- { type, main_ingredients[], cooking_time_hours? }

    -- COOKING
    cooking JSONB NOT NULL,       -- { method, time_minutes, difficulty, equipment[]? }

    -- INGREDIENTS
    main_ingredients TEXT[] NOT NULL,
    proteins TEXT[],
    vegetables TEXT[],
    aromatics TEXT[],
    garnish TEXT[],

    -- SERVING
    serving JSONB NOT NULL,       -- { portion_size, temperature, presentation, accompaniments[]? }

    -- DIETARY (Sistema 5 Dimensioni)
    dietary JSONB NOT NULL,       -- Full dietary info

    -- PRICING
    pricing JSONB,                -- { cost_level, suggested_price_usd? }

    -- AVAILABILITY
    availability JSONB,           -- { is_seasonal, seasons[]?, best_for[]? }

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
CREATE INDEX IF NOT EXISTS idx_soups_slug ON soups(slug);
CREATE INDEX IF NOT EXISTS idx_soups_status ON soups(status);
CREATE INDEX IF NOT EXISTS idx_soups_style ON soups(style);

-- Array searches
CREATE INDEX IF NOT EXISTS idx_soups_tags ON soups USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_soups_main_ingredients ON soups USING GIN(main_ingredients);
CREATE INDEX IF NOT EXISTS idx_soups_proteins ON soups USING GIN(proteins);
CREATE INDEX IF NOT EXISTS idx_soups_vegetables ON soups USING GIN(vegetables);

-- JSONB indexes for common queries
CREATE INDEX IF NOT EXISTS idx_soups_origin ON soups USING GIN(origin);
CREATE INDEX IF NOT EXISTS idx_soups_dietary ON soups USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_soups_soup_type ON soups USING GIN(soup_type);

-- Dietary filter indexes (Sistema 5 Dimensioni)
CREATE INDEX IF NOT EXISTS idx_soups_vegetarian ON soups((dietary->>'is_vegetarian'));
CREATE INDEX IF NOT EXISTS idx_soups_vegan ON soups((dietary->>'is_vegan'));
CREATE INDEX IF NOT EXISTS idx_soups_gluten_free ON soups((dietary->>'is_gluten_free'));
CREATE INDEX IF NOT EXISTS idx_soups_dairy_free ON soups((dietary->>'is_dairy_free'));
CREATE INDEX IF NOT EXISTS idx_soups_halal ON soups((dietary->>'is_halal'));
CREATE INDEX IF NOT EXISTS idx_soups_kosher ON soups((dietary->>'is_kosher'));
CREATE INDEX IF NOT EXISTS idx_soups_spice_level ON soups((dietary->>'spice_level'));

-- Temperature-based queries
CREATE INDEX IF NOT EXISTS idx_soups_temperature ON soups((soup_type->>'temperature'));

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_soups_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_soups_updated_at ON soups;
CREATE TRIGGER trigger_soups_updated_at
    BEFORE UPDATE ON soups
    FOR EACH ROW
    EXECUTE FUNCTION update_soups_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE soups ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access to soups"
    ON soups FOR SELECT
    USING (true);

-- Authenticated users can insert/update
CREATE POLICY "Allow authenticated insert to soups"
    ON soups FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update to soups"
    ON soups FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Service role has full access
CREATE POLICY "Allow service role full access to soups"
    ON soups FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE soups IS 'GUDBRO Soups database with Sistema 5 Dimensioni integration';
COMMENT ON COLUMN soups.style IS 'Soup style: italian, french, asian_*, eastern_european, american, etc.';
COMMENT ON COLUMN soups.soup_type IS 'Soup characteristics: base type, texture, temperature';
COMMENT ON COLUMN soups.dietary IS 'Full dietary info following Sistema 5 Dimensioni v3.0';
