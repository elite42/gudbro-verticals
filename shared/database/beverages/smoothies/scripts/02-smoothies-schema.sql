-- ============================================
-- SMOOTHIES Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create smoothies table
CREATE TABLE IF NOT EXISTS smoothies (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('fruit', 'green', 'protein', 'superfood', 'tropical', 'bowl')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'premium', 'seasonal')),

    -- Base and flavor
    base_type TEXT NOT NULL CHECK (base_type IN ('milk', 'yogurt', 'juice', 'coconut_water', 'almond_milk', 'oat_milk', 'water', 'ice')),
    flavor_profile TEXT NOT NULL CHECK (flavor_profile IN ('sweet', 'tangy', 'tropical', 'earthy', 'creamy', 'refreshing')),

    -- Serving info
    serving_size_ml INTEGER NOT NULL DEFAULT 400,
    serving_style TEXT NOT NULL CHECK (serving_style IN ('cup', 'glass', 'bowl', 'jar')),

    -- Ingredients
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Nutritional Info (per serving)
    calories_per_serving INTEGER DEFAULT 0,
    protein_g DECIMAL(5,1) DEFAULT 0,
    carbs_g DECIMAL(5,1) DEFAULT 0,
    fat_g DECIMAL(5,1) DEFAULT 0,
    fiber_g DECIMAL(5,1) DEFAULT 0,
    sugar_g DECIMAL(5,1) DEFAULT 0,

    -- Product Flags
    has_protein_boost BOOLEAN DEFAULT false,
    is_meal_replacement BOOLEAN DEFAULT false,
    is_blended BOOLEAN DEFAULT true,

    -- Sistema 5 Dimensioni - Standard fields
    allergens TEXT[] DEFAULT '{}',
    is_gluten_free BOOLEAN DEFAULT true,
    is_dairy_free BOOLEAN DEFAULT false,
    is_nut_free BOOLEAN DEFAULT true,
    is_vegan BOOLEAN DEFAULT false,
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
CREATE INDEX IF NOT EXISTS idx_smoothies_category ON smoothies(category);
CREATE INDEX IF NOT EXISTS idx_smoothies_base_type ON smoothies(base_type);
CREATE INDEX IF NOT EXISTS idx_smoothies_status ON smoothies(status);
CREATE INDEX IF NOT EXISTS idx_smoothies_is_vegan ON smoothies(is_vegan);
CREATE INDEX IF NOT EXISTS idx_smoothies_is_dairy_free ON smoothies(is_dairy_free);
CREATE INDEX IF NOT EXISTS idx_smoothies_has_protein ON smoothies(has_protein_boost);
CREATE INDEX IF NOT EXISTS idx_smoothies_popularity ON smoothies(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_smoothies_tags ON smoothies USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_smoothies_allergens ON smoothies USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_smoothies_ingredient_ids ON smoothies USING GIN(ingredient_ids);

-- Enable RLS
ALTER TABLE smoothies ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON smoothies;
CREATE POLICY "Public read access" ON smoothies
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON smoothies;
CREATE POLICY "Service write access" ON smoothies
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_smoothies_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS smoothies_updated_at ON smoothies;
CREATE TRIGGER smoothies_updated_at
    BEFORE UPDATE ON smoothies
    FOR EACH ROW
    EXECUTE FUNCTION update_smoothies_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'smoothies', 'cafe_menu', 'beverage', 'coffee', 'Smoothies', 'Smoothie', 34, '🥤', false, false
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'smoothies');

-- Grant permissions
GRANT SELECT ON smoothies TO anon;
GRANT SELECT ON smoothies TO authenticated;

-- Comments
COMMENT ON TABLE smoothies IS 'GUDBRO Smoothies catalog - ~45 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN smoothies.category IS 'fruit, green, protein, superfood, tropical, bowl';
COMMENT ON COLUMN smoothies.base_type IS 'milk, yogurt, juice, coconut_water, almond_milk, oat_milk, water, ice';
COMMENT ON COLUMN smoothies.flavor_profile IS 'sweet, tangy, tropical, earthy, creamy, refreshing';
