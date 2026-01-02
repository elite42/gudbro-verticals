-- ============================================
-- VEGETARIAN TABLE SCHEMA
-- Version: 1.0 (DATABASE-STANDARDS v1.1 compliant)
-- Created: 2025-12-18
-- ============================================

-- Drop table if exists (for fresh start)
DROP TABLE IF EXISTS vegetarian CASCADE;

-- Create the vegetarian table
CREATE TABLE vegetarian (
    -- IDENTIFICATION
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,

    -- INFO BASE (English only - translations in separate table)
    name TEXT NOT NULL,
    description TEXT,

    -- CLASSIFICATION (TEXT + CHECK instead of ENUM per v1.1)
    category TEXT NOT NULL CHECK (category IN (
        'tofu_dishes',
        'tempeh_dishes',
        'seitan_dishes',
        'legume_dishes',
        'grain_bowls',
        'vegetable_mains',
        'indian_mains',
        'asian_mains',
        'mediterranean_mains'
    )),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active', 'popular', 'signature', 'classic', 'premium', 'seasonal'
    )),

    -- VEGETARIAN-SPECIFIC FIELDS
    cuisine TEXT NOT NULL CHECK (cuisine IN (
        'indian', 'thai', 'chinese', 'japanese', 'korean', 'vietnamese',
        'mediterranean', 'middle_eastern', 'mexican', 'american',
        'italian', 'ethiopian', 'international', 'fusion', 'asian'
    )),
    protein_source TEXT NOT NULL CHECK (protein_source IN (
        'tofu', 'tempeh', 'seitan', 'legumes', 'paneer', 'eggs',
        'mushrooms', 'jackfruit', 'cauliflower', 'nuts_seeds', 'quinoa', 'mixed'
    )),
    is_vegan BOOLEAN NOT NULL DEFAULT false,
    is_high_protein BOOLEAN NOT NULL DEFAULT false,
    cooking_method TEXT,

    -- SISTEMA 5 DIMENSIONI - ALLERGENS (JSONB per flessibilità)
    allergens JSONB DEFAULT '[]'::jsonb,

    -- SISTEMA 5 DIMENSIONI - DIETARY FLAGS
    is_gluten_free BOOLEAN NOT NULL DEFAULT false,
    is_dairy_free BOOLEAN NOT NULL DEFAULT false,
    is_nut_free BOOLEAN NOT NULL DEFAULT true,
    is_soy_free BOOLEAN NOT NULL DEFAULT true,
    is_vegetarian BOOLEAN NOT NULL DEFAULT true,
    is_halal BOOLEAN NOT NULL DEFAULT true,
    is_kosher BOOLEAN NOT NULL DEFAULT true,

    -- SISTEMA 5 DIMENSIONI - NUTRITION
    calories_per_serving INTEGER,
    protein_g DECIMAL(5,1),
    carbs_g DECIMAL(5,1),
    fat_g DECIMAL(5,1),
    fiber_g DECIMAL(5,1),

    -- SISTEMA 5 DIMENSIONI - SPICE
    spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- METADATA
    tags JSONB DEFAULT '[]'::jsonb,
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

    -- DISPLAY ORDER
    sort_order INTEGER,
    is_signature BOOLEAN DEFAULT false,

    -- TIMESTAMPS
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_vegetarian_category ON vegetarian(category);
CREATE INDEX idx_vegetarian_cuisine ON vegetarian(cuisine);
CREATE INDEX idx_vegetarian_protein_source ON vegetarian(protein_source);
CREATE INDEX idx_vegetarian_is_vegan ON vegetarian(is_vegan);
CREATE INDEX idx_vegetarian_is_high_protein ON vegetarian(is_high_protein);
CREATE INDEX idx_vegetarian_is_gluten_free ON vegetarian(is_gluten_free);
CREATE INDEX idx_vegetarian_spice_level ON vegetarian(spice_level);
CREATE INDEX idx_vegetarian_popularity ON vegetarian(popularity DESC);
CREATE INDEX idx_vegetarian_tags ON vegetarian USING GIN(tags);
CREATE INDEX idx_vegetarian_allergens ON vegetarian USING GIN(allergens);

-- ============================================
-- TRIGGER FOR updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_vegetarian_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_vegetarian_updated_at
    BEFORE UPDATE ON vegetarian
    FOR EACH ROW
    EXECUTE FUNCTION update_vegetarian_updated_at();

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE vegetarian ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on vegetarian"
    ON vegetarian FOR SELECT
    TO public
    USING (true);

-- Allow authenticated users to insert/update/delete (for backoffice)
CREATE POLICY "Allow authenticated write access on vegetarian"
    ON vegetarian FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE vegetarian IS 'Vegetarian and vegan main dishes - DATABASE-STANDARDS v1.1 compliant';
COMMENT ON COLUMN vegetarian.id IS 'Format: VEG_{NAME}';
COMMENT ON COLUMN vegetarian.category IS 'Type of dish: tofu_dishes, tempeh_dishes, seitan_dishes, legume_dishes, grain_bowls, vegetable_mains, indian_mains, asian_mains, mediterranean_mains';
COMMENT ON COLUMN vegetarian.protein_source IS 'Primary protein in the dish';
COMMENT ON COLUMN vegetarian.is_vegan IS 'True if no dairy or eggs';
COMMENT ON COLUMN vegetarian.is_high_protein IS 'True if 15g+ protein per serving';
COMMENT ON COLUMN vegetarian.spice_level IS 'Scale 0-5 (0=none, 5=extreme)';
