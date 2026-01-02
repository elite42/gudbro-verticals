-- ============================================
-- German Cuisine Database Schema
-- Created: 2025-12-24
-- Total dishes: 50
-- Categories: sausages, mains, sides, soups, baked, desserts
-- ============================================

-- 1. Create table with TEXT + CHECK (not ENUM!)
CREATE TABLE IF NOT EXISTS german (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    german_name TEXT NOT NULL,
    description TEXT NOT NULL,

    -- Classification
    category TEXT NOT NULL CHECK (category IN ('sausages', 'mains', 'sides', 'soups', 'baked', 'desserts')),
    region TEXT NOT NULL CHECK (region IN ('bavaria', 'swabia', 'rhineland', 'berlin', 'saxony', 'thuringia', 'franconia', 'nationwide')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'regional', 'seasonal')),

    -- Ingredients
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Allergens & Dietary (JSONB)
    allergens TEXT[] NOT NULL DEFAULT '{}',
    dietary JSONB NOT NULL DEFAULT '{
        "is_vegetarian": false,
        "is_vegan": false,
        "is_gluten_free": false,
        "is_dairy_free": false,
        "is_halal": false,
        "is_kosher": false
    }',

    -- Characteristics
    spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
    serving_temp TEXT NOT NULL DEFAULT 'hot' CHECK (serving_temp IN ('hot', 'warm', 'cold', 'room_temp')),
    preparation_time_min INTEGER,

    -- Popularity & Pricing
    popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    price_category TEXT NOT NULL DEFAULT 'moderate' CHECK (price_category IN ('budget', 'moderate', 'premium')),

    -- Media
    image_url TEXT,

    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_german_category ON german(category);
CREATE INDEX IF NOT EXISTS idx_german_region ON german(region);
CREATE INDEX IF NOT EXISTS idx_german_status ON german(status);
CREATE INDEX IF NOT EXISTS idx_german_popularity ON german(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_german_ingredient_ids ON german USING GIN(ingredient_ids);

-- 3. Trigger for updated_at
CREATE OR REPLACE FUNCTION update_german_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

DROP TRIGGER IF EXISTS trigger_german_updated_at ON german;
CREATE TRIGGER trigger_german_updated_at
    BEFORE UPDATE ON german
    FOR EACH ROW
    EXECUTE FUNCTION update_german_updated_at();

-- 4. Enable RLS
ALTER TABLE german ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DROP POLICY IF EXISTS "german_read_all" ON german;
CREATE POLICY "german_read_all" ON german
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "german_insert_authenticated" ON german;
CREATE POLICY "german_insert_authenticated" ON german
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "german_update_authenticated" ON german;
CREATE POLICY "german_update_authenticated" ON german
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 6. Comments
COMMENT ON TABLE german IS 'German cuisine dishes including sausages, mains, sides, soups, baked goods and desserts';
COMMENT ON COLUMN german.german_name IS 'Original German name of the dish';
COMMENT ON COLUMN german.region IS 'German region of origin (Bavaria, Swabia, Rhineland, Berlin, Saxony, Thuringia, Franconia, or nationwide)';
