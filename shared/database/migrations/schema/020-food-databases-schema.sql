-- ============================================================================
-- GUDBRO Pasta Database Schema
-- ============================================================================
-- This script creates the pasta table with full support for:
-- - Sistema 5 Dimensioni (5 dimensions)
-- - Multi-language content (JSONB)
-- - Italian pasta + Asian noodles
-- - Ingredient references
-- ============================================================================

-- Create pasta_style enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pasta_style') THEN
        CREATE TYPE pasta_style AS ENUM (
            'italian_classic',
            'italian_regional',
            'italian_fresh',
            'italian_filled',
            'italian_baked',
            'asian_chinese',
            'asian_japanese',
            'asian_korean',
            'asian_vietnamese',
            'asian_thai',
            'asian_other',
            'fusion',
            'signature'
        );
    END IF;
END $$;

-- Create pasta_shape enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pasta_shape') THEN
        CREATE TYPE pasta_shape AS ENUM (
            -- Long pasta
            'spaghetti', 'spaghettini', 'linguine', 'fettuccine', 'tagliatelle',
            'pappardelle', 'bucatini', 'capellini', 'vermicelli', 'bigoli',
            -- Short pasta
            'penne', 'rigatoni', 'fusilli', 'farfalle', 'orecchiette',
            'conchiglie', 'cavatappi', 'paccheri', 'mezze_maniche', 'trofie',
            'strozzapreti', 'calamarata',
            -- Filled pasta
            'ravioli', 'tortellini', 'tortelloni', 'agnolotti', 'cappelletti',
            'mezzelune', 'culurgiones',
            -- Layered/Sheet
            'lasagne', 'cannelloni', 'manicotti',
            -- Asian noodles
            'ramen', 'udon', 'soba', 'rice_noodles', 'glass_noodles',
            'egg_noodles', 'lo_mein', 'rice_vermicelli', 'pho_noodles',
            'pad_thai_noodles', 'japchae_noodles',
            -- Other
            'gnocchetti', 'malloreddus', 'other'
        );
    END IF;
END $$;

-- Create pasta_dough enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pasta_dough') THEN
        CREATE TYPE pasta_dough AS ENUM (
            'semolina', 'egg', 'whole_wheat', 'spinach', 'beetroot',
            'squid_ink', 'gluten_free', 'legume', 'rice', 'wheat',
            'buckwheat', 'sweet_potato', 'other'
        );
    END IF;
END $$;

-- Create sauce_type enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sauce_type') THEN
        CREATE TYPE sauce_type AS ENUM (
            'tomato', 'cream', 'oil_based', 'butter', 'pesto',
            'meat', 'seafood', 'cheese', 'broth', 'stir_fry',
            'curry', 'spicy', 'vegetable', 'none'
        );
    END IF;
END $$;

-- Create cooking_method enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cooking_method') THEN
        CREATE TYPE cooking_method AS ENUM (
            'boiled', 'baked', 'stir_fried', 'soup', 'cold', 'fresh_raw'
        );
    END IF;
END $$;

-- Create pasta_status enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pasta_status') THEN
        CREATE TYPE pasta_status AS ENUM (
            'classic', 'traditional', 'modern', 'signature', 'seasonal', 'trending'
        );
    END IF;
END $$;

-- Create pasta table
CREATE TABLE IF NOT EXISTS pasta (
    -- Primary identifiers
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    stable_key TEXT UNIQUE,

    -- Basic info (multilingual JSONB)
    name JSONB NOT NULL,              -- {"en": "Carbonara", "it": "Carbonara", ...}
    description JSONB NOT NULL,       -- Full description in multiple languages
    tagline JSONB,                    -- Short marketing phrase

    -- Classification
    status pasta_status NOT NULL DEFAULT 'classic',
    style pasta_style NOT NULL DEFAULT 'italian_classic',
    tags TEXT[] DEFAULT '{}',         -- Array of searchable tags

    -- Origin (JSONB for flexibility)
    origin JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Structure: {country, country_code, region, city, year_created, creator}

    -- History & Story (optional, JSONB)
    history JSONB,
    -- Structure: {story: MultiLangText, named_after: MultiLangText, fun_fact: MultiLangText}

    -- Composition
    pasta_shape pasta_shape NOT NULL DEFAULT 'spaghetti',
    pasta_dough pasta_dough NOT NULL DEFAULT 'semolina',
    sauce_type sauce_type NOT NULL DEFAULT 'tomato',
    cooking_method cooking_method NOT NULL DEFAULT 'boiled',

    -- Ingredients (JSONB array)
    ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
    -- Structure: [{ingredient_id, quantity: {amount, unit}, is_optional, is_garnish, is_signature}]

    -- Protein (JSONB, optional)
    protein JSONB,
    -- Structure: {type, ingredient_id, is_essential}

    -- Toppings (JSONB array)
    toppings JSONB DEFAULT '[]'::jsonb,
    -- Structure: [{ingredient_id, is_signature}]

    -- Serving configuration (JSONB)
    serving JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Structure: {default_portion, available_portions, temperature, presentation, suggested_pairing}

    -- Flavor profile (JSONB)
    flavor JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Structure: {profile: [], description: MultiLangText, spice_level: 0-5}

    -- Dietary & Allergens (JSONB with Sistema 5 Dimensioni)
    dietary JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Structure: {
    --   is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, is_nut_free,
    --   is_halal, is_kosher, is_low_carb, is_keto_friendly, is_high_protein,
    --   allergens: [], calories_estimate, protein_g, carbs_g, fat_g, fiber_g
    -- }

    -- Customization options (JSONB)
    customization JSONB DEFAULT '{}'::jsonb,
    -- Structure: {change_pasta, add_protein, extra_sauce, make_vegetarian, make_vegan, make_gluten_free, spice_adjustable}

    -- Variations (JSONB array)
    variations JSONB DEFAULT '[]'::jsonb,
    -- Structure: [{name, description: MultiLangText, changes: []}]

    -- Popularity & Recommendations
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    recommended_for TEXT[] DEFAULT '{}',

    -- Pairings (JSONB)
    pairings JSONB DEFAULT '{}'::jsonb,
    -- Structure: {wines: [], appetizers: [], salads: [], desserts: []}

    -- Related pasta dishes
    related_pasta TEXT[] DEFAULT '{}', -- Array of slugs

    -- Media (JSONB)
    media JSONB,
    -- Structure: {thumbnail, gallery: []}

    -- Source tracking
    source_url TEXT,
    source_note TEXT,

    -- Versioning
    version INTEGER DEFAULT 1,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Primary lookups
CREATE INDEX IF NOT EXISTS idx_pasta_slug ON pasta(slug);
CREATE INDEX IF NOT EXISTS idx_pasta_stable_key ON pasta(stable_key);

-- Classification indexes
CREATE INDEX IF NOT EXISTS idx_pasta_status ON pasta(status);
CREATE INDEX IF NOT EXISTS idx_pasta_style ON pasta(style);
CREATE INDEX IF NOT EXISTS idx_pasta_shape ON pasta(pasta_shape);
CREATE INDEX IF NOT EXISTS idx_pasta_dough ON pasta(pasta_dough);
CREATE INDEX IF NOT EXISTS idx_pasta_sauce ON pasta(sauce_type);
CREATE INDEX IF NOT EXISTS idx_pasta_method ON pasta(cooking_method);

-- Array indexes using GIN
CREATE INDEX IF NOT EXISTS idx_pasta_tags ON pasta USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_pasta_recommended_for ON pasta USING GIN(recommended_for);
CREATE INDEX IF NOT EXISTS idx_pasta_related ON pasta USING GIN(related_pasta);

-- JSONB indexes for dietary filtering (Sistema 5 Dimensioni)
CREATE INDEX IF NOT EXISTS idx_pasta_dietary ON pasta USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_pasta_dietary_vegan ON pasta((dietary->>'is_vegan'));
CREATE INDEX IF NOT EXISTS idx_pasta_dietary_vegetarian ON pasta((dietary->>'is_vegetarian'));
CREATE INDEX IF NOT EXISTS idx_pasta_dietary_gluten_free ON pasta((dietary->>'is_gluten_free'));
CREATE INDEX IF NOT EXISTS idx_pasta_dietary_dairy_free ON pasta((dietary->>'is_dairy_free'));

-- Origin index
CREATE INDEX IF NOT EXISTS idx_pasta_origin ON pasta USING GIN(origin);
CREATE INDEX IF NOT EXISTS idx_pasta_origin_country ON pasta((origin->>'country_code'));

-- Flavor index
CREATE INDEX IF NOT EXISTS idx_pasta_flavor ON pasta USING GIN(flavor);
CREATE INDEX IF NOT EXISTS idx_pasta_spice_level ON pasta((flavor->>'spice_level'));

-- Popularity for sorting
CREATE INDEX IF NOT EXISTS idx_pasta_popularity ON pasta(popularity DESC);

-- ============================================================================
-- TRIGGER: Auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_pasta_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_pasta_updated_at ON pasta;
CREATE TRIGGER trigger_pasta_updated_at
    BEFORE UPDATE ON pasta
    FOR EACH ROW
    EXECUTE FUNCTION update_pasta_updated_at();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE pasta IS 'GUDBRO Pasta Database - Italian pasta + Asian noodles with Sistema 5 Dimensioni support';
COMMENT ON COLUMN pasta.name IS 'Multilingual name: {"en": "...", "it": "...", "vi": "..."}';
COMMENT ON COLUMN pasta.dietary IS 'Sistema 5 Dimensioni: allergens, intolerances, diets, nutrition, spice';
COMMENT ON COLUMN pasta.ingredients IS 'Array of ingredient references with quantities';
COMMENT ON COLUMN pasta.popularity IS 'Score 0-100 for sorting and recommendations';

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================

-- Run this after inserting data to verify:
-- SELECT
--     style,
--     COUNT(*) as count,
--     ROUND(AVG(popularity)) as avg_popularity
-- FROM pasta
-- GROUP BY style
-- ORDER BY count DESC;
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
