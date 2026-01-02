-- ============================================
-- MOROCCAN Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create moroccan table
CREATE TABLE IF NOT EXISTS moroccan (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('tagine', 'couscous', 'soup', 'pastry', 'grill', 'salad', 'bread')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional')),

    -- Moroccan-specific
    origin_region TEXT,

    -- Ingredients
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Nutritional Info (per serving)
    calories_per_serving INTEGER DEFAULT 0,
    protein_g DECIMAL(5,1) DEFAULT 0,
    carbs_g DECIMAL(5,1) DEFAULT 0,
    fat_g DECIMAL(5,1) DEFAULT 0,
    fiber_g DECIMAL(5,1) DEFAULT 0,
    sodium_mg INTEGER DEFAULT 0,

    -- Sistema 5 Dimensioni - Standard fields
    allergens TEXT[] DEFAULT '{}',
    is_gluten_free BOOLEAN DEFAULT false,
    is_dairy_free BOOLEAN DEFAULT true,
    is_nut_free BOOLEAN DEFAULT true,
    is_vegan BOOLEAN DEFAULT false,
    is_vegetarian BOOLEAN DEFAULT false,
    is_halal BOOLEAN DEFAULT true,
    is_kosher BOOLEAN DEFAULT false,
    spice_level INTEGER DEFAULT 1 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- Metadata
    tags TEXT[] DEFAULT '{}',
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_moroccan_category ON moroccan(category);
CREATE INDEX IF NOT EXISTS idx_moroccan_status ON moroccan(status);
CREATE INDEX IF NOT EXISTS idx_moroccan_is_vegan ON moroccan(is_vegan);
CREATE INDEX IF NOT EXISTS idx_moroccan_is_gluten_free ON moroccan(is_gluten_free);
CREATE INDEX IF NOT EXISTS idx_moroccan_is_halal ON moroccan(is_halal);
CREATE INDEX IF NOT EXISTS idx_moroccan_popularity ON moroccan(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_moroccan_tags ON moroccan USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_moroccan_allergens ON moroccan USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_moroccan_ingredient_ids ON moroccan USING GIN(ingredient_ids);

-- Enable RLS
ALTER TABLE moroccan ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON moroccan;
CREATE POLICY "Public read access" ON moroccan
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON moroccan;
CREATE POLICY "Service write access" ON moroccan
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_moroccan_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS moroccan_updated_at ON moroccan;
CREATE TRIGGER moroccan_updated_at
    BEFORE UPDATE ON moroccan
    FOR EACH ROW
    EXECUTE FUNCTION update_moroccan_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'moroccan', 'standalone', 'food', 'second_course', 'Moroccan Cuisine', 'Cucina Marocchina', 55, '🥘', false, true
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'moroccan');

-- Grant permissions
GRANT SELECT ON moroccan TO anon;
GRANT SELECT ON moroccan TO authenticated;

-- Comments
COMMENT ON TABLE moroccan IS 'GUDBRO Moroccan cuisine catalog - ~50 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN moroccan.category IS 'tagine, couscous, soup, pastry, grill, salad, bread';
