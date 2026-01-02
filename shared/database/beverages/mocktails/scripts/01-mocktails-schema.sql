-- ============================================
-- MOCKTAILS Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create mocktails table
CREATE TABLE IF NOT EXISTS mocktails (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('virgin_classics', 'fruit_based', 'sparkling', 'creamy', 'tea_based', 'herbal', 'tropical', 'citrus')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium')),
    base TEXT NOT NULL CHECK (base IN ('soda', 'juice', 'tea', 'coconut', 'cream', 'tonic', 'ginger_ale', 'sparkling_water')),
    glass_type TEXT NOT NULL CHECK (glass_type IN ('highball', 'collins', 'hurricane', 'martini', 'margarita', 'wine', 'champagne', 'rocks', 'copper_mug', 'mason_jar')),
    serving_size_ml INTEGER NOT NULL,

    -- Garnish
    garnish TEXT,

    -- Nutritional Info
    calories_per_serving INTEGER DEFAULT 0,
    sugar_g INTEGER DEFAULT 0,

    -- Product Flags
    is_carbonated BOOLEAN DEFAULT false,
    is_frozen BOOLEAN DEFAULT false,
    is_kid_friendly BOOLEAN DEFAULT true,

    -- Flavor profile and inspiration
    flavor_profile TEXT[] DEFAULT '{}',
    inspired_by TEXT,

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
CREATE INDEX IF NOT EXISTS idx_mocktails_category ON mocktails(category);
CREATE INDEX IF NOT EXISTS idx_mocktails_status ON mocktails(status);
CREATE INDEX IF NOT EXISTS idx_mocktails_base ON mocktails(base);
CREATE INDEX IF NOT EXISTS idx_mocktails_glass_type ON mocktails(glass_type);
CREATE INDEX IF NOT EXISTS idx_mocktails_is_carbonated ON mocktails(is_carbonated);
CREATE INDEX IF NOT EXISTS idx_mocktails_is_frozen ON mocktails(is_frozen);
CREATE INDEX IF NOT EXISTS idx_mocktails_is_kid_friendly ON mocktails(is_kid_friendly);
CREATE INDEX IF NOT EXISTS idx_mocktails_popularity ON mocktails(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_mocktails_tags ON mocktails USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_mocktails_allergens ON mocktails USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_mocktails_flavor_profile ON mocktails USING GIN(flavor_profile);

-- Enable RLS
ALTER TABLE mocktails ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON mocktails;
CREATE POLICY "Public read access" ON mocktails
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON mocktails;
CREATE POLICY "Service write access" ON mocktails
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_mocktails_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mocktails_updated_at ON mocktails;
CREATE TRIGGER mocktails_updated_at
    BEFORE UPDATE ON mocktails
    FOR EACH ROW
    EXECUTE FUNCTION update_mocktails_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'mocktails', 'bar_menu', 'beverage', 'cocktail', 'Mocktails', 34, '🍹', false, false
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'mocktails');

-- Grant permissions
GRANT SELECT ON mocktails TO anon;
GRANT SELECT ON mocktails TO authenticated;

-- Comments
COMMENT ON TABLE mocktails IS 'GUDBRO Mocktails catalog - 38 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN mocktails.category IS 'virgin_classics, fruit_based, sparkling, creamy, tea_based, herbal, tropical, citrus';
COMMENT ON COLUMN mocktails.base IS 'soda, juice, tea, coconut, cream, tonic, ginger_ale, sparkling_water';
COMMENT ON COLUMN mocktails.glass_type IS 'highball, collins, hurricane, martini, margarita, wine, champagne, rocks, copper_mug, mason_jar';
