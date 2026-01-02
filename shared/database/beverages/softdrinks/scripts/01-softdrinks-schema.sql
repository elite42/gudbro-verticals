-- ============================================
-- SOFT DRINKS Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create softdrinks table
CREATE TABLE IF NOT EXISTS softdrinks (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('cola', 'lemon_lime', 'orange', 'ginger', 'tonic_soda', 'energy', 'other')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'premium', 'discontinued')),
    brand TEXT NOT NULL,
    serving_size_ml INTEGER NOT NULL,
    serving_style TEXT NOT NULL CHECK (serving_style IN ('can', 'bottle', 'glass', 'fountain')),

    -- Nutritional Info
    calories_per_serving INTEGER DEFAULT 0,
    sugar_g INTEGER DEFAULT 0,
    caffeine_mg INTEGER DEFAULT 0,

    -- Product Flags
    is_sugar_free BOOLEAN DEFAULT false,
    is_diet BOOLEAN DEFAULT false,
    is_carbonated BOOLEAN DEFAULT true,

    -- Sistema 5 Dimensioni - Standard fields
    allergens TEXT[] DEFAULT '{}',
    is_gluten_free BOOLEAN DEFAULT true,
    is_dairy_free BOOLEAN DEFAULT true,
    is_nut_free BOOLEAN DEFAULT true,
    is_vegan BOOLEAN DEFAULT true,
    is_vegetarian BOOLEAN DEFAULT true,
    is_halal BOOLEAN DEFAULT true,
    is_kosher BOOLEAN DEFAULT true,
    spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- Metadata
    tags TEXT[] DEFAULT '{}',
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    origin_country TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_softdrinks_category ON softdrinks(category);
CREATE INDEX IF NOT EXISTS idx_softdrinks_brand ON softdrinks(brand);
CREATE INDEX IF NOT EXISTS idx_softdrinks_status ON softdrinks(status);
CREATE INDEX IF NOT EXISTS idx_softdrinks_is_sugar_free ON softdrinks(is_sugar_free);
CREATE INDEX IF NOT EXISTS idx_softdrinks_is_carbonated ON softdrinks(is_carbonated);
CREATE INDEX IF NOT EXISTS idx_softdrinks_caffeine ON softdrinks(caffeine_mg);
CREATE INDEX IF NOT EXISTS idx_softdrinks_popularity ON softdrinks(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_softdrinks_tags ON softdrinks USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_softdrinks_allergens ON softdrinks USING GIN(allergens);

-- Enable RLS
ALTER TABLE softdrinks ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON softdrinks;
CREATE POLICY "Public read access" ON softdrinks
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON softdrinks;
CREATE POLICY "Service write access" ON softdrinks
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_softdrinks_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS softdrinks_updated_at ON softdrinks;
CREATE TRIGGER softdrinks_updated_at
    BEFORE UPDATE ON softdrinks
    FOR EACH ROW
    EXECUTE FUNCTION update_softdrinks_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'softdrinks', 'cafe_menu', 'beverage', 'coffee', 'Soft Drinks', 33, '🥤', false, false
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'softdrinks');

-- Grant permissions
GRANT SELECT ON softdrinks TO anon;
GRANT SELECT ON softdrinks TO authenticated;

-- Comments
COMMENT ON TABLE softdrinks IS 'GUDBRO Soft Drinks catalog - 38 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN softdrinks.category IS 'cola, lemon_lime, orange, ginger, tonic_soda, energy, other';
COMMENT ON COLUMN softdrinks.serving_style IS 'can, bottle, glass, fountain';
