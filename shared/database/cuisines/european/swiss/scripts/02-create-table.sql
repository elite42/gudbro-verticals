-- ============================================
-- Swiss Cuisine Database Schema
-- Created: 2025-12-25
-- Total dishes: 38
-- Categories: cheese_dishes, mains, sides, sausages, soups, desserts, pastries, breakfast
-- ============================================

-- 1. Create table with TEXT + CHECK (not ENUM!)
CREATE TABLE IF NOT EXISTS swiss (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    local_name TEXT NOT NULL,
    description TEXT NOT NULL,

    -- Classification
    category TEXT NOT NULL CHECK (category IN ('cheese_dishes', 'mains', 'sides', 'sausages', 'soups', 'desserts', 'pastries', 'breakfast')),
    region TEXT NOT NULL CHECK (region IN ('bern', 'zurich', 'valais', 'vaud', 'central', 'graubunden', 'basel', 'geneva', 'nationwide')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'traditional', 'regional', 'popular')),

    -- Cooking
    protein_type TEXT CHECK (protein_type IN ('beef', 'pork', 'veal', 'chicken', 'fish', 'seafood', 'lamb', 'game', 'mixed', 'egg')),
    cooking_method TEXT CHECK (cooking_method IN ('grilled', 'roasted', 'braised', 'fried', 'baked', 'stewed', 'boiled', 'steamed', 'raw', 'deep_fried', 'poached', 'sauteed', 'pan_fried', 'melted', 'cured', 'assembled', 'simmered')),
    prep_time_min INTEGER,
    spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- Pricing
    price_default DECIMAL(10,2) DEFAULT 0,

    -- Ingredients (for reference, actual linking in product_ingredients)
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Allergens & Dietary (JSONB)
    allergens TEXT[] NOT NULL DEFAULT '{}',
    intolerances TEXT[] NOT NULL DEFAULT '{}',
    dietary JSONB NOT NULL DEFAULT '{
        "is_vegetarian": false,
        "is_vegan": false,
        "is_gluten_free": false,
        "is_dairy_free": false,
        "is_nut_free": true,
        "is_halal": false,
        "is_kosher": false
    }',

    -- Metadata
    tags TEXT[] DEFAULT '{}',
    popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    image_url TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_swiss_category ON swiss(category);
CREATE INDEX IF NOT EXISTS idx_swiss_region ON swiss(region);
CREATE INDEX IF NOT EXISTS idx_swiss_status ON swiss(status);
CREATE INDEX IF NOT EXISTS idx_swiss_popularity ON swiss(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_swiss_protein_type ON swiss(protein_type);
CREATE INDEX IF NOT EXISTS idx_swiss_ingredient_ids ON swiss USING GIN(ingredient_ids);
CREATE INDEX IF NOT EXISTS idx_swiss_allergens ON swiss USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_swiss_tags ON swiss USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_swiss_dietary ON swiss USING GIN(dietary);

-- 3. Trigger for updated_at
CREATE OR REPLACE FUNCTION update_swiss_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

DROP TRIGGER IF EXISTS trigger_swiss_updated_at ON swiss;
CREATE TRIGGER trigger_swiss_updated_at
    BEFORE UPDATE ON swiss
    FOR EACH ROW
    EXECUTE FUNCTION update_swiss_updated_at();

-- 4. Enable RLS
ALTER TABLE swiss ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DROP POLICY IF EXISTS "swiss_read_all" ON swiss;
CREATE POLICY "swiss_read_all" ON swiss
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "swiss_insert_authenticated" ON swiss;
CREATE POLICY "swiss_insert_authenticated" ON swiss
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "swiss_update_authenticated" ON swiss;
CREATE POLICY "swiss_update_authenticated" ON swiss
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 6. Comments
COMMENT ON TABLE swiss IS 'Swiss cuisine dishes including cheese dishes, mains, sides, sausages, soups, desserts, pastries and breakfast';
COMMENT ON COLUMN swiss.local_name IS 'Original Swiss name of the dish (French, German or Italian)';
COMMENT ON COLUMN swiss.region IS 'Swiss region of origin (Bern, Zurich, Valais, Vaud, Central, Graubünden, Basel, Geneva, or nationwide)';

-- 7. Verification
SELECT 'Schema created successfully' as status;
