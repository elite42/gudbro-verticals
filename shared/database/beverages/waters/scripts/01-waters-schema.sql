-- ============================================
-- WATERS Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create waters table
CREATE TABLE IF NOT EXISTS waters (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('still_natural', 'sparkling_natural', 'sparkling_added', 'mineral_rich', 'low_mineral', 'alkaline', 'flavored')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'premium', 'luxury', 'classic', 'popular')),
    brand TEXT NOT NULL,

    -- Water Properties
    carbonation TEXT NOT NULL CHECK (carbonation IN ('none', 'natural', 'added')),
    source_type TEXT NOT NULL CHECK (source_type IN ('spring', 'artesian', 'glacier', 'volcanic', 'mineral', 'iceberg', 'well')),
    tds_mg_l INTEGER,                    -- Total Dissolved Solids (residuo fisso)
    ph_level DECIMAL(3,1),               -- pH (6.0-9.5)

    -- Serving
    serving_size_ml INTEGER NOT NULL,
    bottle_types TEXT[] DEFAULT '{}',
    serving_temp_c INTEGER,

    -- Minerals (mg/L)
    calcium_mg_l DECIMAL(6,1),
    magnesium_mg_l DECIMAL(6,1),
    sodium_mg_l DECIMAL(6,1),
    potassium_mg_l DECIMAL(6,1),
    bicarbonate_mg_l DECIMAL(6,1),
    silica_mg_l DECIMAL(6,1),

    -- Flavor (for flavored waters)
    flavor TEXT,
    has_real_fruit BOOLEAN DEFAULT false,

    -- Nutritional
    calories_per_serving INTEGER DEFAULT 0,
    sugar_g INTEGER DEFAULT 0,

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
    origin_region TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_waters_category ON waters(category);
CREATE INDEX IF NOT EXISTS idx_waters_brand ON waters(brand);
CREATE INDEX IF NOT EXISTS idx_waters_status ON waters(status);
CREATE INDEX IF NOT EXISTS idx_waters_carbonation ON waters(carbonation);
CREATE INDEX IF NOT EXISTS idx_waters_source_type ON waters(source_type);
CREATE INDEX IF NOT EXISTS idx_waters_tds ON waters(tds_mg_l);
CREATE INDEX IF NOT EXISTS idx_waters_ph ON waters(ph_level);
CREATE INDEX IF NOT EXISTS idx_waters_popularity ON waters(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_waters_tags ON waters USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_waters_bottle_types ON waters USING GIN(bottle_types);

-- Enable RLS
ALTER TABLE waters ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON waters;
CREATE POLICY "Public read access" ON waters
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON waters;
CREATE POLICY "Service write access" ON waters
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_waters_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS waters_updated_at ON waters;
CREATE TRIGGER waters_updated_at
    BEFORE UPDATE ON waters
    FOR EACH ROW
    EXECUTE FUNCTION update_waters_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'waters', 'cafe_menu', 'beverage', 'coffee', 'Waters', 34, '💧', false, false
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'waters');

-- Grant permissions
GRANT SELECT ON waters TO anon;
GRANT SELECT ON waters TO authenticated;

-- Comments
COMMENT ON TABLE waters IS 'GUDBRO Waters catalog - 64 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN waters.category IS 'still_natural, sparkling_natural, sparkling_added, mineral_rich, low_mineral, alkaline, flavored';
COMMENT ON COLUMN waters.carbonation IS 'none, natural, added';
COMMENT ON COLUMN waters.source_type IS 'spring, artesian, glacier, volcanic, mineral, iceberg, well';
COMMENT ON COLUMN waters.tds_mg_l IS 'Total Dissolved Solids in mg/L (residuo fisso)';
