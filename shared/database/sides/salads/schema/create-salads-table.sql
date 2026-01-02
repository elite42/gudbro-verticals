-- ============================================================================
-- GUDBRO Salads Database Schema
-- ============================================================================
-- This script creates the salads table with full support for:
-- - Sistema 5 Dimensioni (5 dimensions)
-- - Multi-language content (JSONB)
-- - Ingredient references
-- - Dressing configurations
-- - Dietary restrictions
-- ============================================================================

-- Drop existing table if recreating
-- DROP TABLE IF EXISTS salads CASCADE;

-- Create salad_style enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'salad_style') THEN
        CREATE TYPE salad_style AS ENUM (
            'classic',
            'italian',
            'mediterranean',
            'asian',
            'bowl',
            'poke',
            'protein',
            'superfood',
            'seasonal',
            'signature'
        );
    END IF;
END $$;

-- Create salad_base enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'salad_base') THEN
        CREATE TYPE salad_base AS ENUM (
            'romaine',
            'mixed_greens',
            'iceberg',
            'arugula',
            'spinach',
            'kale',
            'cabbage',
            'lettuce_butter',
            'radicchio',
            'endive',
            'watercress',
            'grain',
            'rice',
            'noodle',
            'bread',
            'no_base'
        );
    END IF;
END $$;

-- Create salad_status enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'salad_status') THEN
        CREATE TYPE salad_status AS ENUM (
            'classic',
            'traditional',
            'modern',
            'signature',
            'seasonal',
            'trending'
        );
    END IF;
END $$;

-- Create salad_temperature enum if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'salad_temperature') THEN
        CREATE TYPE salad_temperature AS ENUM (
            'cold',
            'warm',
            'room_temp',
            'mixed'
        );
    END IF;
END $$;

-- Create salads table
CREATE TABLE IF NOT EXISTS salads (
    -- Primary identifiers
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    stable_key VARCHAR(100) UNIQUE NOT NULL,

    -- Basic info (multilingual JSONB)
    name JSONB NOT NULL,              -- {"en": "Caesar Salad", "it": "Insalata Caesar", ...}
    description JSONB NOT NULL,       -- Full description in multiple languages
    tagline JSONB,                    -- Short marketing phrase

    -- Classification
    status salad_status NOT NULL DEFAULT 'classic',
    style salad_style NOT NULL DEFAULT 'classic',
    tags TEXT[] DEFAULT '{}',         -- Array of searchable tags

    -- Origin (JSONB for flexibility)
    origin JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Structure: {country, country_code, region, city, year_created, creator}

    -- History & Story (optional, JSONB)
    history JSONB,
    -- Structure: {story: MultiLangText, named_after: MultiLangText, fun_fact: MultiLangText}

    -- Composition
    base salad_base NOT NULL DEFAULT 'mixed_greens',
    default_protein VARCHAR(50),       -- Default protein option
    protein_options TEXT[] DEFAULT '{}', -- Available protein add-ons

    -- Dressing
    default_dressing VARCHAR(100),     -- Dressing slug
    dressing_options TEXT[] DEFAULT '{}', -- Alternative dressings
    dressing_on_side BOOLEAN DEFAULT false,

    -- Ingredients (JSONB array)
    ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
    -- Structure: [{ingredient_id, quantity: {amount, unit}, is_optional, is_garnish, is_signature}]

    -- Toppings (JSONB array)
    toppings JSONB DEFAULT '[]'::jsonb,
    -- Structure: [{ingredient_id, is_signature}]

    -- Serving configuration (JSONB)
    serving JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Structure: {default_portion, available_portions, temperature, presentation, suggested_bread}

    -- Flavor profile (JSONB)
    flavor JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Structure: {profile: [], description: MultiLangText, spice_level: 0-5}

    -- Dietary & Allergens (JSONB with Sistema 5 Dimensioni)
    dietary JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Structure: {
    --   is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, is_nut_free,
    --   is_halal, is_kosher, is_low_carb, is_keto_friendly, is_high_protein,
    --   allergens: [], calories_estimate, protein_g, fiber_g
    -- }

    -- Customization options (JSONB)
    customization JSONB DEFAULT '{}'::jsonb,
    -- Structure: {add_protein, protein_upcharge, substitute_base, extra_dressing, make_vegan, make_gluten_free}

    -- Variations (JSONB array)
    variations JSONB DEFAULT '[]'::jsonb,
    -- Structure: [{name, description: MultiLangText, changes: []}]

    -- Popularity & Recommendations
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    recommended_for TEXT[] DEFAULT '{}',

    -- Pairings (JSONB)
    pairings JSONB DEFAULT '{}'::jsonb,
    -- Structure: {soups: [], breads: [], proteins: [], drinks: []}

    -- Related salads
    related_salads TEXT[] DEFAULT '{}', -- Array of slugs

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
CREATE INDEX IF NOT EXISTS idx_salads_slug ON salads(slug);
CREATE INDEX IF NOT EXISTS idx_salads_stable_key ON salads(stable_key);

-- Classification indexes
CREATE INDEX IF NOT EXISTS idx_salads_status ON salads(status);
CREATE INDEX IF NOT EXISTS idx_salads_style ON salads(style);
CREATE INDEX IF NOT EXISTS idx_salads_base ON salads(base);

-- Array indexes using GIN
CREATE INDEX IF NOT EXISTS idx_salads_tags ON salads USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_salads_protein_options ON salads USING GIN(protein_options);
CREATE INDEX IF NOT EXISTS idx_salads_dressing_options ON salads USING GIN(dressing_options);
CREATE INDEX IF NOT EXISTS idx_salads_recommended_for ON salads USING GIN(recommended_for);
CREATE INDEX IF NOT EXISTS idx_salads_related ON salads USING GIN(related_salads);

-- JSONB indexes for dietary filtering
CREATE INDEX IF NOT EXISTS idx_salads_dietary ON salads USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_salads_dietary_vegan ON salads((dietary->>'is_vegan'));
CREATE INDEX IF NOT EXISTS idx_salads_dietary_vegetarian ON salads((dietary->>'is_vegetarian'));
CREATE INDEX IF NOT EXISTS idx_salads_dietary_gluten_free ON salads((dietary->>'is_gluten_free'));
CREATE INDEX IF NOT EXISTS idx_salads_dietary_dairy_free ON salads((dietary->>'is_dairy_free'));
CREATE INDEX IF NOT EXISTS idx_salads_dietary_keto ON salads((dietary->>'is_keto_friendly'));
CREATE INDEX IF NOT EXISTS idx_salads_dietary_high_protein ON salads((dietary->>'is_high_protein'));

-- Origin index
CREATE INDEX IF NOT EXISTS idx_salads_origin ON salads USING GIN(origin);
CREATE INDEX IF NOT EXISTS idx_salads_origin_country ON salads((origin->>'country_code'));

-- Flavor index
CREATE INDEX IF NOT EXISTS idx_salads_flavor ON salads USING GIN(flavor);
CREATE INDEX IF NOT EXISTS idx_salads_spice_level ON salads((flavor->>'spice_level'));

-- Popularity for sorting
CREATE INDEX IF NOT EXISTS idx_salads_popularity ON salads(popularity DESC);

-- ============================================================================
-- TRIGGER: Auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_salads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_salads_updated_at ON salads;
CREATE TRIGGER trigger_salads_updated_at
    BEFORE UPDATE ON salads
    FOR EACH ROW
    EXECUTE FUNCTION update_salads_updated_at();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE salads IS 'GUDBRO Salad Database - 52 international salads with Sistema 5 Dimensioni support';
COMMENT ON COLUMN salads.name IS 'Multilingual name: {"en": "...", "it": "...", "es": "..."}';
COMMENT ON COLUMN salads.dietary IS 'Sistema 5 Dimensioni: allergens, intolerances, diets, nutrition, spice';
COMMENT ON COLUMN salads.ingredients IS 'Array of ingredient references with quantities';
COMMENT ON COLUMN salads.popularity IS 'Score 0-100 for sorting and recommendations';

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================

-- Run this after inserting data to verify:
-- SELECT
--     style,
--     COUNT(*) as count,
--     ROUND(AVG(popularity)) as avg_popularity
-- FROM salads
-- GROUP BY style
-- ORDER BY count DESC;
