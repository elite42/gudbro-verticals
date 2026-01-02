-- ============================================
-- SAUCES Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create sauces table
CREATE TABLE IF NOT EXISTS sauces (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('classic', 'spicy', 'creamy', 'asian', 'mediterranean', 'meat', 'sweet')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'popular', 'premium', 'seasonal')),

    -- Sauce-specific
    serving_size_ml INTEGER NOT NULL DEFAULT 30,
    serving_style TEXT NOT NULL CHECK (serving_style IN ('portion', 'bottle', 'packet', 'side')),
    heat_level INTEGER NOT NULL DEFAULT 0 CHECK (heat_level >= 0 AND heat_level <= 5),

    -- Ingredients
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Nutritional Info (per serving)
    calories_per_serving INTEGER DEFAULT 0,
    protein_g DECIMAL(5,1) DEFAULT 0,
    carbs_g DECIMAL(5,1) DEFAULT 0,
    fat_g DECIMAL(5,1) DEFAULT 0,
    sugar_g DECIMAL(5,1) DEFAULT 0,
    sodium_mg INTEGER DEFAULT 0,

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
CREATE INDEX IF NOT EXISTS idx_sauces_category ON sauces(category);
CREATE INDEX IF NOT EXISTS idx_sauces_status ON sauces(status);
CREATE INDEX IF NOT EXISTS idx_sauces_heat_level ON sauces(heat_level);
CREATE INDEX IF NOT EXISTS idx_sauces_is_vegan ON sauces(is_vegan);
CREATE INDEX IF NOT EXISTS idx_sauces_is_gluten_free ON sauces(is_gluten_free);
CREATE INDEX IF NOT EXISTS idx_sauces_popularity ON sauces(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_sauces_tags ON sauces USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_sauces_allergens ON sauces USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_sauces_ingredient_ids ON sauces USING GIN(ingredient_ids);

-- Enable RLS
ALTER TABLE sauces ENABLE ROW LEVEL SECURITY;

-- RLS Policies (standard pattern)
DROP POLICY IF EXISTS "Public read access" ON sauces;
CREATE POLICY "Public read access" ON sauces
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON sauces;
CREATE POLICY "Service write access" ON sauces
    FOR ALL USING (auth.role() = 'service_role');

-- Update trigger with SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION update_sauces_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sauces_updated_at ON sauces;
CREATE TRIGGER sauces_updated_at
    BEFORE UPDATE ON sauces
    FOR EACH ROW
    EXECUTE FUNCTION update_sauces_updated_at();

-- Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'sauces', 'standalone', 'food', 'side', 'Sauces & Condiments', 'Salse e Condimenti', 50, '🥫', false, false
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'sauces');

-- Grant permissions
GRANT SELECT ON sauces TO anon;
GRANT SELECT ON sauces TO authenticated;

-- Comments
COMMENT ON TABLE sauces IS 'GUDBRO Sauces & Condiments catalog - ~35 items, Sistema 5 Dimensioni compliant';
COMMENT ON COLUMN sauces.category IS 'classic, spicy, creamy, asian, mediterranean, meat, sweet';
COMMENT ON COLUMN sauces.heat_level IS '0=none, 1=mild, 2=medium, 3=hot, 4=very hot, 5=extreme';
