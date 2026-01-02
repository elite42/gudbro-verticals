-- Malaysian Cuisine - Table Schema
-- GUDBRO Database Standards v1.7
-- Categories: rice, noodles, satay, curry, soup, fried, bread, desserts, seafood
-- Regions: nationwide, penang, kuala_lumpur, sarawak, kelantan, malacca, sabah

-- =====================================================
-- DROP EXISTING (if re-running)
-- =====================================================
DROP TABLE IF EXISTS malaysian CASCADE;

-- =====================================================
-- CREATE TABLE
-- =====================================================
CREATE TABLE malaysian (
  -- Primary key
  id TEXT PRIMARY KEY,

  -- Basic info
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  local_name TEXT,
  description TEXT,

  -- Classification
  category TEXT NOT NULL CHECK (category IN (
    'rice', 'noodles', 'satay', 'curry', 'soup', 'fried', 'bread', 'desserts', 'seafood'
  )),
  region TEXT CHECK (region IN (
    'nationwide', 'penang', 'kuala_lumpur', 'sarawak', 'kelantan', 'malacca', 'sabah'
  )),
  status TEXT CHECK (status IN ('iconic', 'classic', 'traditional', 'regional', 'modern')),

  -- Cooking details
  protein_type TEXT,
  cooking_method TEXT,
  prep_time_min INTEGER,
  spice_level INTEGER CHECK (spice_level >= 0 AND spice_level <= 5),

  -- Dietary information (JSONB)
  dietary JSONB DEFAULT '{
    "is_vegan": false,
    "is_vegetarian": false,
    "is_gluten_free": false,
    "is_dairy_free": false,
    "is_nut_free": false,
    "is_halal": false,
    "is_kosher": false
  }'::jsonb,

  -- Arrays
  allergens TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',

  -- Metrics
  popularity INTEGER CHECK (popularity >= 0 AND popularity <= 100),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX idx_malaysian_category ON malaysian(category);
CREATE INDEX idx_malaysian_region ON malaysian(region);
CREATE INDEX idx_malaysian_status ON malaysian(status);
CREATE INDEX idx_malaysian_spice_level ON malaysian(spice_level);
CREATE INDEX idx_malaysian_popularity ON malaysian(popularity);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE malaysian ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "malaysian_public_read" ON malaysian
  FOR SELECT USING (true);

-- Allow authenticated insert
CREATE POLICY "malaysian_auth_insert" ON malaysian
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated update
CREATE POLICY "malaysian_auth_update" ON malaysian
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated delete
CREATE POLICY "malaysian_auth_delete" ON malaysian
  FOR DELETE TO authenticated USING (true);

-- =====================================================
-- PRODUCT TAXONOMY ENTRY
-- =====================================================
-- Delete existing entry if present, then insert
DELETE FROM product_taxonomy WHERE product_type = 'malaysian';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'malaysian',
  'Malaysian Cuisine',
  'standalone',
  'food',
  'second_course',
  161
);

-- =====================================================
-- VERIFICATION
-- =====================================================
-- SELECT table_name FROM information_schema.tables WHERE table_name = 'malaysian';
-- SELECT * FROM product_taxonomy WHERE product_type = 'malaysian';
