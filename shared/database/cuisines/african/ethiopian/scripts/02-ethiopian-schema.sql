-- ============================================
-- ETHIOPIAN CUISINE - Schema Definition
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create ethiopian table
CREATE TABLE IF NOT EXISTS ethiopian (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('stew', 'raw', 'tibs', 'vegetarian', 'bread', 'salad', 'beverage')),
    price_default DECIMAL(10,2) DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    prep_time_min INTEGER DEFAULT 30,
    spice_level INTEGER DEFAULT 2 CHECK (spice_level >= 0 AND spice_level <= 5),
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
CREATE INDEX IF NOT EXISTS idx_ethiopian_slug ON ethiopian(slug);
CREATE INDEX IF NOT EXISTS idx_ethiopian_category ON ethiopian(category);
CREATE INDEX IF NOT EXISTS idx_ethiopian_is_available ON ethiopian(is_available);
CREATE INDEX IF NOT EXISTS idx_ethiopian_dietary ON ethiopian USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_ethiopian_tags ON ethiopian USING GIN(tags);

-- Enable RLS
ALTER TABLE ethiopian ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "ethiopian_read_policy" ON ethiopian;
CREATE POLICY "ethiopian_read_policy" ON ethiopian FOR SELECT USING (true);

DROP POLICY IF EXISTS "ethiopian_write_policy" ON ethiopian;
CREATE POLICY "ethiopian_write_policy" ON ethiopian FOR ALL USING (true) WITH CHECK (true);

-- Register in product_taxonomy
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'ethiopian', 'standalone', 'food', 'second_course', 'Ethiopian Cuisine', 'Cucina Etiope', 56, '🇪🇹', false, true
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'ethiopian');

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_ethiopian_updated_at ON ethiopian;
CREATE TRIGGER update_ethiopian_updated_at
    BEFORE UPDATE ON ethiopian
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
