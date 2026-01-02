-- ============================================
-- BAKERY Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create bakery table
CREATE TABLE IF NOT EXISTS bakery (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('pastry', 'bread', 'cookie', 'cake', 'donut', 'savory')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'premium', 'seasonal')),

    -- Base and flavor
    base_type TEXT NOT NULL CHECK (base_type IN ('yeast', 'puff', 'shortcrust', 'choux', 'brioche', 'sourdough')),
    flavor_profile TEXT NOT NULL CHECK (flavor_profile IN ('sweet', 'buttery', 'fruity', 'chocolatey', 'nutty', 'savory')),

    -- Serving info
    serving_size_g INTEGER NOT NULL DEFAULT 80,
    serving_style TEXT NOT NULL CHECK (serving_style IN ('individual', 'slice', 'whole', 'box')),

    -- Ingredients
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Nutritional Info (per serving)
    calories_per_serving INTEGER DEFAULT 0,
    protein_g DECIMAL(5,1) DEFAULT 0,
    carbs_g DECIMAL(5,1) DEFAULT 0,
    fat_g DECIMAL(5,1) DEFAULT 0,
    sugar_g DECIMAL(5,1) DEFAULT 0,
    fiber_g DECIMAL(5,1) DEFAULT 0,

    -- Product Flags
    has_filling BOOLEAN DEFAULT false,
    has_frosting BOOLEAN DEFAULT false,
    is_freshly_baked BOOLEAN DEFAULT true,

    -- Sistema 5 Dimensioni - Standard fields
    allergens TEXT[] DEFAULT '{}',
    is_gluten_free BOOLEAN DEFAULT false,
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
CREATE INDEX IF NOT EXISTS idx_bakery_category ON bakery(category);
CREATE INDEX IF NOT EXISTS idx_bakery_base_type ON bakery(base_type);
CREATE INDEX IF NOT EXISTS idx_bakery_status ON bakery(status);
CREATE INDEX IF NOT EXISTS idx_bakery_is_vegan ON bakery(is_vegan);
CREATE INDEX IF NOT EXISTS idx_bakery_is_gluten_free ON bakery(is_gluten_free);
CREATE INDEX IF NOT EXISTS idx_bakery_has_filling ON bakery(has_filling);
CREATE INDEX IF NOT EXISTS idx_bakery_popularity ON bakery(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_bakery_tags ON bakery USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_bakery_allergens ON bakery USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_bakery_ingredient_ids ON bakery USING GIN(ingredient_ids);

-- Enable RLS
ALTER TABLE bakery ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON bakery;
CREATE POLICY "Public read access" ON bakery
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON bakery;
CREATE POLICY "Service write access" ON bakery
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_bakery_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS bakery_updated_at ON bakery;
CREATE TRIGGER bakery_updated_at
    BEFORE UPDATE ON bakery
    FOR EACH ROW
    EXECUTE FUNCTION update_bakery_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'bakery', 'cafe_menu', 'food', 'dessert', 'Bakery', 'Prodotti da Forno', 41, '🥐', false, false
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'bakery');

-- Grant permissions
GRANT SELECT ON bakery TO anon;
GRANT SELECT ON bakery TO authenticated;

-- Comments
COMMENT ON TABLE bakery IS 'GUDBRO Bakery catalog - ~45 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN bakery.category IS 'pastry, bread, cookie, cake, donut, savory';
COMMENT ON COLUMN bakery.base_type IS 'yeast, puff, shortcrust, choux, brioche, sourdough';
COMMENT ON COLUMN bakery.flavor_profile IS 'sweet, buttery, fruity, chocolatey, nutty, savory';
