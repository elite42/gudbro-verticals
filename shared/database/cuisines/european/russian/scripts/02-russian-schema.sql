-- Russian Cuisine - Table Schema
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-25

-- Drop if exists
DROP TABLE IF EXISTS russian CASCADE;

-- Create table
CREATE TABLE russian (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    local_name TEXT,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'soups', 'dumplings', 'mains', 'zakuski', 'pies',
        'pancakes', 'salads', 'desserts', 'porridge'
    )),
    region TEXT CHECK (region IN (
        'nationwide', 'moscow', 'saint_petersburg', 'siberia',
        'ural', 'volga', 'caucasus', 'far_east'
    )),
    status TEXT NOT NULL DEFAULT 'traditional' CHECK (status IN (
        'classic', 'traditional', 'popular', 'regional'
    )),
    protein_type TEXT,
    cooking_method TEXT,
    prep_time_min INTEGER,
    spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
    price_default DECIMAL(10,2),
    dietary JSONB DEFAULT '{
        "is_vegan": false,
        "is_vegetarian": false,
        "is_gluten_free": false,
        "is_dairy_free": false,
        "is_nut_free": true,
        "is_halal": false,
        "is_kosher": false
    }'::jsonb,
    allergens TEXT[] DEFAULT '{}',
    intolerances TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_russian_category ON russian(category);
CREATE INDEX idx_russian_status ON russian(status);
CREATE INDEX idx_russian_region ON russian(region);
CREATE INDEX idx_russian_popularity ON russian(popularity DESC);

-- Enable RLS
ALTER TABLE russian ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "russian_read_all" ON russian FOR SELECT USING (true);
CREATE POLICY "russian_insert_auth" ON russian FOR INSERT WITH CHECK (true);
CREATE POLICY "russian_update_auth" ON russian FOR UPDATE USING (true);
CREATE POLICY "russian_delete_auth" ON russian FOR DELETE USING (true);

-- Register in product_taxonomy (WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, display_name_en, display_name_it, menu_type, service_type, category, display_order)
SELECT 'russian', 'Russian Cuisine', 'Cucina Russa', 'standalone', 'food', 'second_course', 59
WHERE NOT EXISTS (
    SELECT 1 FROM product_taxonomy WHERE product_type = 'russian'
);

-- Verify
SELECT 'Russian schema created successfully' AS status;
