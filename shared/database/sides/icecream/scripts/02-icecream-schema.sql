-- ============================================
-- ICE CREAM Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create icecream table
CREATE TABLE IF NOT EXISTS icecream (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('gelato', 'sorbet', 'frozen_yogurt', 'ice_cream', 'sundae', 'specialty')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'premium', 'seasonal')),

    -- Base and flavor
    base_type TEXT NOT NULL CHECK (base_type IN ('cream', 'milk', 'yogurt', 'fruit', 'coconut', 'nut')),
    flavor_profile TEXT NOT NULL CHECK (flavor_profile IN ('sweet', 'fruity', 'chocolatey', 'nutty', 'creamy', 'tangy')),

    -- Serving info
    serving_size_ml INTEGER NOT NULL DEFAULT 120,
    serving_style TEXT NOT NULL CHECK (serving_style IN ('cone', 'cup', 'bowl', 'stick', 'sandwich')),

    -- Ingredients
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Nutritional Info (per serving)
    calories_per_serving INTEGER DEFAULT 0,
    protein_g DECIMAL(5,1) DEFAULT 0,
    carbs_g DECIMAL(5,1) DEFAULT 0,
    fat_g DECIMAL(5,1) DEFAULT 0,
    sugar_g DECIMAL(5,1) DEFAULT 0,

    -- Product Flags
    has_topping BOOLEAN DEFAULT false,
    has_sauce BOOLEAN DEFAULT false,
    is_artisanal BOOLEAN DEFAULT false,

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
CREATE INDEX IF NOT EXISTS idx_icecream_category ON icecream(category);
CREATE INDEX IF NOT EXISTS idx_icecream_base_type ON icecream(base_type);
CREATE INDEX IF NOT EXISTS idx_icecream_status ON icecream(status);
CREATE INDEX IF NOT EXISTS idx_icecream_is_vegan ON icecream(is_vegan);
CREATE INDEX IF NOT EXISTS idx_icecream_is_dairy_free ON icecream(is_dairy_free);
CREATE INDEX IF NOT EXISTS idx_icecream_is_artisanal ON icecream(is_artisanal);
CREATE INDEX IF NOT EXISTS idx_icecream_popularity ON icecream(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_icecream_tags ON icecream USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_icecream_allergens ON icecream USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_icecream_ingredient_ids ON icecream USING GIN(ingredient_ids);

-- Enable RLS
ALTER TABLE icecream ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON icecream;
CREATE POLICY "Public read access" ON icecream
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON icecream;
CREATE POLICY "Service write access" ON icecream
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_icecream_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS icecream_updated_at ON icecream;
CREATE TRIGGER icecream_updated_at
    BEFORE UPDATE ON icecream
    FOR EACH ROW
    EXECUTE FUNCTION update_icecream_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'icecream', 'cafe_menu', 'food', 'dessert', 'Ice Cream', 'Gelati', 40, '🍨', false, false
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'icecream');

-- Grant permissions
GRANT SELECT ON icecream TO anon;
GRANT SELECT ON icecream TO authenticated;

-- Comments
COMMENT ON TABLE icecream IS 'GUDBRO Ice Cream catalog - ~35 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN icecream.category IS 'gelato, sorbet, frozen_yogurt, ice_cream, sundae, specialty';
COMMENT ON COLUMN icecream.base_type IS 'cream, milk, yogurt, fruit, coconut, nut';
COMMENT ON COLUMN icecream.flavor_profile IS 'sweet, fruity, chocolatey, nutty, creamy, tangy';
