-- Filipino Cuisine - Table Schema
-- GUDBRO Database Standards v1.7
-- Categories: rice, noodles, meat, seafood, soup, vegetables, snacks, desserts, breakfast
-- Regions: nationwide, manila, visayas, mindanao, ilocos, bicol, pampanga, cebu

-- =====================================================
-- DROP EXISTING (if re-running)
-- =====================================================
DROP TABLE IF EXISTS filipino CASCADE;

-- =====================================================
-- CREATE TABLE
-- =====================================================
CREATE TABLE filipino (
  -- Primary key
  id TEXT PRIMARY KEY,

  -- Basic info
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  local_name TEXT,
  description TEXT,

  -- Classification
  category TEXT NOT NULL CHECK (category IN (
    'rice', 'noodles', 'meat', 'seafood', 'soup', 'vegetables', 'snacks', 'desserts', 'breakfast'
  )),
  region TEXT CHECK (region IN (
    'nationwide', 'manila', 'visayas', 'mindanao', 'ilocos', 'bicol', 'pampanga', 'cebu'
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
CREATE INDEX idx_filipino_category ON filipino(category);
CREATE INDEX idx_filipino_region ON filipino(region);
CREATE INDEX idx_filipino_status ON filipino(status);
CREATE INDEX idx_filipino_spice_level ON filipino(spice_level);
CREATE INDEX idx_filipino_popularity ON filipino(popularity);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE filipino ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "filipino_public_read" ON filipino
  FOR SELECT USING (true);

-- Allow authenticated insert
CREATE POLICY "filipino_auth_insert" ON filipino
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated update
CREATE POLICY "filipino_auth_update" ON filipino
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated delete
CREATE POLICY "filipino_auth_delete" ON filipino
  FOR DELETE TO authenticated USING (true);

-- =====================================================
-- PRODUCT TAXONOMY ENTRY
-- =====================================================
-- Delete existing entry if present, then insert
DELETE FROM product_taxonomy WHERE product_type = 'filipino';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'filipino',
  'Filipino Cuisine',
  'standalone',
  'food',
  'second_course',
  162
);

-- =====================================================
-- VERIFICATION
-- =====================================================
-- SELECT table_name FROM information_schema.tables WHERE table_name = 'filipino';
-- SELECT * FROM product_taxonomy WHERE product_type = 'filipino';
