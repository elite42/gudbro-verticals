-- ============================================
-- HOT BEVERAGES Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create hotbeverages table
CREATE TABLE IF NOT EXISTS hotbeverages (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('chocolate', 'tea_latte', 'spiced', 'specialty', 'traditional')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'premium', 'seasonal')),

    -- Base and flavor
    base_type TEXT NOT NULL CHECK (base_type IN ('milk', 'water', 'oat_milk', 'almond_milk', 'coconut_milk', 'cream')),
    flavor_profile TEXT NOT NULL CHECK (flavor_profile IN ('sweet', 'spiced', 'earthy', 'creamy', 'rich', 'herbal')),

    -- Serving info
    serving_size_ml INTEGER NOT NULL DEFAULT 350,
    serving_style TEXT NOT NULL CHECK (serving_style IN ('mug', 'cup', 'glass', 'bowl')),
    optimal_temp_c INTEGER DEFAULT 65,

    -- Ingredients
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Nutritional Info (per serving)
    calories_per_serving INTEGER DEFAULT 0,
    protein_g DECIMAL(5,1) DEFAULT 0,
    carbs_g DECIMAL(5,1) DEFAULT 0,
    fat_g DECIMAL(5,1) DEFAULT 0,
    sugar_g DECIMAL(5,1) DEFAULT 0,
    caffeine_mg INTEGER DEFAULT 0,

    -- Product Flags
    has_foam BOOLEAN DEFAULT false,
    has_whipped_cream BOOLEAN DEFAULT false,
    is_caffeinated BOOLEAN DEFAULT false,

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
CREATE INDEX IF NOT EXISTS idx_hotbeverages_category ON hotbeverages(category);
CREATE INDEX IF NOT EXISTS idx_hotbeverages_base_type ON hotbeverages(base_type);
CREATE INDEX IF NOT EXISTS idx_hotbeverages_status ON hotbeverages(status);
CREATE INDEX IF NOT EXISTS idx_hotbeverages_is_caffeinated ON hotbeverages(is_caffeinated);
CREATE INDEX IF NOT EXISTS idx_hotbeverages_is_dairy_free ON hotbeverages(is_dairy_free);
CREATE INDEX IF NOT EXISTS idx_hotbeverages_popularity ON hotbeverages(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_hotbeverages_tags ON hotbeverages USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_hotbeverages_allergens ON hotbeverages USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_hotbeverages_ingredient_ids ON hotbeverages USING GIN(ingredient_ids);

-- Enable RLS
ALTER TABLE hotbeverages ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON hotbeverages;
CREATE POLICY "Public read access" ON hotbeverages
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON hotbeverages;
CREATE POLICY "Service write access" ON hotbeverages
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_hotbeverages_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS hotbeverages_updated_at ON hotbeverages;
CREATE TRIGGER hotbeverages_updated_at
    BEFORE UPDATE ON hotbeverages
    FOR EACH ROW
    EXECUTE FUNCTION update_hotbeverages_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'hotbeverages', 'cafe_menu', 'beverage', 'coffee', 'Hot Beverages', 'Bevande Calde', 36, '☕', false, true
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'hotbeverages');

-- Grant permissions
GRANT SELECT ON hotbeverages TO anon;
GRANT SELECT ON hotbeverages TO authenticated;

-- Comments
COMMENT ON TABLE hotbeverages IS 'GUDBRO Hot Beverages catalog - ~25 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN hotbeverages.category IS 'chocolate, tea_latte, spiced, specialty, traditional';
COMMENT ON COLUMN hotbeverages.base_type IS 'milk, water, oat_milk, almond_milk, coconut_milk, cream';
COMMENT ON COLUMN hotbeverages.flavor_profile IS 'sweet, spiced, earthy, creamy, rich, herbal';
