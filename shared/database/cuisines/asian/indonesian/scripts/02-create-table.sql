-- Indonesian Cuisine - Table Schema
-- GUDBRO Database Standards v1.7
-- Categories: rice, noodles, satay, soup, curry, fried, salad, snacks, desserts
-- Regions: nationwide, java, jakarta, sumatra, bali, sulawesi, kalimantan

-- =====================================================
-- DROP EXISTING (if re-running)
-- =====================================================
DROP TABLE IF EXISTS indonesian CASCADE;

-- =====================================================
-- CREATE TABLE
-- =====================================================
CREATE TABLE indonesian (
  -- Primary key
  id TEXT PRIMARY KEY,

  -- Basic info
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  local_name TEXT,
  description TEXT,

  -- Classification
  category TEXT NOT NULL CHECK (category IN (
    'rice', 'noodles', 'satay', 'soup', 'curry', 'fried', 'salad', 'snacks', 'desserts'
  )),
  region TEXT CHECK (region IN (
    'nationwide', 'java', 'jakarta', 'sumatra', 'bali', 'sulawesi', 'kalimantan'
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
CREATE INDEX idx_indonesian_category ON indonesian(category);
CREATE INDEX idx_indonesian_region ON indonesian(region);
CREATE INDEX idx_indonesian_status ON indonesian(status);
CREATE INDEX idx_indonesian_spice_level ON indonesian(spice_level);
CREATE INDEX idx_indonesian_popularity ON indonesian(popularity);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE indonesian ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "indonesian_public_read" ON indonesian
  FOR SELECT USING (true);

-- Allow authenticated insert
CREATE POLICY "indonesian_auth_insert" ON indonesian
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated update
CREATE POLICY "indonesian_auth_update" ON indonesian
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated delete
CREATE POLICY "indonesian_auth_delete" ON indonesian
  FOR DELETE TO authenticated USING (true);

-- =====================================================
-- PRODUCT TAXONOMY ENTRY
-- =====================================================
-- Delete existing entry if present, then insert
DELETE FROM product_taxonomy WHERE product_type = 'indonesian';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'indonesian',
  'Indonesian Cuisine',
  'standalone',
  'food',
  'second_course',
  160
);

-- =====================================================
-- VERIFICATION
-- =====================================================
-- SELECT table_name FROM information_schema.tables WHERE table_name = 'indonesian';
-- SELECT * FROM product_taxonomy WHERE product_type = 'indonesian';
