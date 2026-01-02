-- ============================================
-- FRENCH CUISINE - Schema Definition
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create french table
CREATE TABLE IF NOT EXISTS french (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('appetizer', 'main', 'seafood', 'bistro', 'regional', 'sauce', 'cheese', 'pastry')),
    region TEXT, -- Provence, Burgundy, Alsace, etc.
    price_default DECIMAL(10,2) DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    prep_time_min INTEGER DEFAULT 30,
    spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
    is_traditional BOOLEAN DEFAULT true,
    allergens JSONB DEFAULT '[]'::jsonb,
    intolerances JSONB DEFAULT '[]'::jsonb,
    dietary JSONB DEFAULT '{"is_vegan": false, "is_vegetarian": false}'::jsonb,
    tags TEXT[] DEFAULT '{}',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_french_slug ON french(slug);
CREATE INDEX IF NOT EXISTS idx_french_category ON french(category);
CREATE INDEX IF NOT EXISTS idx_french_region ON french(region);
CREATE INDEX IF NOT EXISTS idx_french_is_available ON french(is_available);
CREATE INDEX IF NOT EXISTS idx_french_dietary ON french USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_french_tags ON french USING GIN(tags);

-- Enable RLS
ALTER TABLE french ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "french_read_policy" ON french;
CREATE POLICY "french_read_policy" ON french FOR SELECT USING (true);

DROP POLICY IF EXISTS "french_write_policy" ON french;
CREATE POLICY "french_write_policy" ON french FOR ALL USING (true) WITH CHECK (true);

-- Register in product_taxonomy
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'french', 'standalone', 'food', 'second_course', 'French Cuisine', 'Cucina Francese', 58, '🇫🇷', false, true
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'french');

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_french_updated_at ON french;
CREATE TRIGGER update_french_updated_at
    BEFORE UPDATE ON french
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
