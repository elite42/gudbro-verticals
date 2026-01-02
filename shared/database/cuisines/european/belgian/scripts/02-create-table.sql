-- Belgian Cuisine - Table Schema
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-25

-- Drop if exists
DROP TABLE IF EXISTS belgian CASCADE;

-- Create table
CREATE TABLE belgian (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    local_name TEXT,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'mains', 'seafood', 'frites', 'waffles', 'desserts', 'appetizers'
    )),
    region TEXT CHECK (region IN (
        'nationwide', 'flanders', 'wallonia', 'brussels',
        'liege', 'ghent', 'antwerp', 'coast'
    )),
    status TEXT NOT NULL DEFAULT 'classic' CHECK (status IN (
        'iconic', 'classic', 'traditional', 'regional'
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
CREATE INDEX idx_belgian_category ON belgian(category);
CREATE INDEX idx_belgian_status ON belgian(status);
CREATE INDEX idx_belgian_region ON belgian(region);
CREATE INDEX idx_belgian_popularity ON belgian(popularity DESC);

-- Enable RLS
ALTER TABLE belgian ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "belgian_read_all" ON belgian FOR SELECT USING (true);
CREATE POLICY "belgian_insert_auth" ON belgian FOR INSERT WITH CHECK (true);
CREATE POLICY "belgian_update_auth" ON belgian FOR UPDATE USING (true);
CREATE POLICY "belgian_delete_auth" ON belgian FOR DELETE USING (true);

-- Register in product_taxonomy (WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, display_name_en, display_name_it, menu_type, service_type, category, display_order)
SELECT 'belgian', 'Belgian Cuisine', 'Cucina Belga', 'standalone', 'food', 'second_course', 60
WHERE NOT EXISTS (
    SELECT 1 FROM product_taxonomy WHERE product_type = 'belgian'
);

-- Verify
SELECT 'Belgian schema created successfully' AS status;
