-- ============================================
-- MILKSHAKES Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create milkshakes table
CREATE TABLE IF NOT EXISTS milkshakes (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('classic', 'premium', 'specialty', 'boozy', 'healthy')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'premium', 'seasonal')),

    -- Flavor profile
    primary_flavor TEXT NOT NULL CHECK (primary_flavor IN ('chocolate', 'vanilla', 'strawberry', 'caramel', 'coffee', 'peanut_butter', 'fruit', 'cookies', 'other')),

    -- Serving info
    serving_size_ml INTEGER NOT NULL DEFAULT 450,
    serving_style TEXT NOT NULL CHECK (serving_style IN ('glass', 'cup', 'mason_jar', 'tall_glass')),

    -- Ingredients
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Nutritional Info (per serving)
    calories_per_serving INTEGER DEFAULT 0,
    protein_g DECIMAL(5,1) DEFAULT 0,
    carbs_g DECIMAL(5,1) DEFAULT 0,
    fat_g DECIMAL(5,1) DEFAULT 0,
    sugar_g DECIMAL(5,1) DEFAULT 0,

    -- Topping & extras
    has_whipped_cream BOOLEAN DEFAULT true,
    has_toppings BOOLEAN DEFAULT false,
    is_thick BOOLEAN DEFAULT true,

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
CREATE INDEX IF NOT EXISTS idx_milkshakes_category ON milkshakes(category);
CREATE INDEX IF NOT EXISTS idx_milkshakes_primary_flavor ON milkshakes(primary_flavor);
CREATE INDEX IF NOT EXISTS idx_milkshakes_status ON milkshakes(status);
CREATE INDEX IF NOT EXISTS idx_milkshakes_is_dairy_free ON milkshakes(is_dairy_free);
CREATE INDEX IF NOT EXISTS idx_milkshakes_has_toppings ON milkshakes(has_toppings);
CREATE INDEX IF NOT EXISTS idx_milkshakes_popularity ON milkshakes(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_milkshakes_tags ON milkshakes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_milkshakes_allergens ON milkshakes USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_milkshakes_ingredient_ids ON milkshakes USING GIN(ingredient_ids);

-- Enable RLS
ALTER TABLE milkshakes ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON milkshakes;
CREATE POLICY "Public read access" ON milkshakes
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON milkshakes;
CREATE POLICY "Service write access" ON milkshakes
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_milkshakes_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS milkshakes_updated_at ON milkshakes;
CREATE TRIGGER milkshakes_updated_at
    BEFORE UPDATE ON milkshakes
    FOR EACH ROW
    EXECUTE FUNCTION update_milkshakes_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'milkshakes', 'cafe_menu', 'beverage', 'dessert', 'Milkshakes', 'Frappè', 35, '🥛', false, false
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'milkshakes');

-- Grant permissions
GRANT SELECT ON milkshakes TO anon;
GRANT SELECT ON milkshakes TO authenticated;

-- Comments
COMMENT ON TABLE milkshakes IS 'GUDBRO Milkshakes catalog - ~25 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN milkshakes.category IS 'classic, premium, specialty, boozy, healthy';
COMMENT ON COLUMN milkshakes.primary_flavor IS 'chocolate, vanilla, strawberry, caramel, coffee, peanut_butter, fruit, cookies, other';
