-- Scandinavian Cuisine - Table Schema
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-24
--
-- Countries: Sweden, Norway, Denmark, Finland
-- Categories: mains, fish, open_sandwich, soups, sides, pastries, desserts
-- Total dishes: 78

-- Drop if exists
DROP TABLE IF EXISTS scandinavian CASCADE;

-- Create table
CREATE TABLE scandinavian (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    local_name TEXT,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'mains', 'fish', 'open_sandwich', 'soups', 'sides', 'pastries', 'desserts'
    )),
    country TEXT NOT NULL CHECK (country IN (
        'sweden', 'norway', 'denmark', 'finland', 'regional'
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
CREATE INDEX idx_scandinavian_category ON scandinavian(category);
CREATE INDEX idx_scandinavian_country ON scandinavian(country);
CREATE INDEX idx_scandinavian_status ON scandinavian(status);
CREATE INDEX idx_scandinavian_protein ON scandinavian(protein_type);
CREATE INDEX idx_scandinavian_popularity ON scandinavian(popularity DESC);

-- Enable RLS
ALTER TABLE scandinavian ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "scandinavian_read_all" ON scandinavian FOR SELECT USING (true);
CREATE POLICY "scandinavian_insert_auth" ON scandinavian FOR INSERT WITH CHECK (true);
CREATE POLICY "scandinavian_update_auth" ON scandinavian FOR UPDATE USING (true);
CREATE POLICY "scandinavian_delete_auth" ON scandinavian FOR DELETE USING (true);

-- Register in product_taxonomy (using WHERE NOT EXISTS - no unique constraint on product_type)
INSERT INTO product_taxonomy (product_type, display_name_en, display_name_it, menu_type, service_type, category, display_order)
SELECT 'scandinavian', 'Scandinavian', 'Scandinava', 'standalone', 'food', 'second_course', 53
WHERE NOT EXISTS (
    SELECT 1 FROM product_taxonomy WHERE product_type = 'scandinavian'
);

-- Verify
SELECT 'Scandinavian schema created successfully' AS status;
