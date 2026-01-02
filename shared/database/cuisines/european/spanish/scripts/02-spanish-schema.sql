-- ============================================
-- SPANISH CUISINE - Schema Definition
-- GUDBRO Database Standards v1.3
-- ============================================

-- Create spanish table
CREATE TABLE IF NOT EXISTS spanish (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('tapas', 'rice', 'seafood', 'meat', 'soup', 'egg', 'cured', 'dessert', 'sandwich')),
    region TEXT, -- Valencia, Catalonia, Basque Country, etc.
    price_default DECIMAL(10,2) DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    prep_time_min INTEGER DEFAULT 30,
    spice_level INTEGER DEFAULT 1 CHECK (spice_level >= 0 AND spice_level <= 5),
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
CREATE INDEX IF NOT EXISTS idx_spanish_slug ON spanish(slug);
CREATE INDEX IF NOT EXISTS idx_spanish_category ON spanish(category);
CREATE INDEX IF NOT EXISTS idx_spanish_region ON spanish(region);
CREATE INDEX IF NOT EXISTS idx_spanish_is_available ON spanish(is_available);
CREATE INDEX IF NOT EXISTS idx_spanish_dietary ON spanish USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_spanish_tags ON spanish USING GIN(tags);

-- Enable RLS
ALTER TABLE spanish ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "spanish_read_policy" ON spanish;
CREATE POLICY "spanish_read_policy" ON spanish FOR SELECT USING (true);

DROP POLICY IF EXISTS "spanish_write_policy" ON spanish;
CREATE POLICY "spanish_write_policy" ON spanish FOR ALL USING (true) WITH CHECK (true);

-- Register in product_taxonomy
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'spanish', 'standalone', 'food', 'second_course', 'Spanish Cuisine', 'Cucina Spagnola', 57, '🇪🇸', false, true
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'spanish');

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_spanish_updated_at ON spanish;
CREATE TRIGGER update_spanish_updated_at
    BEFORE UPDATE ON spanish
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
