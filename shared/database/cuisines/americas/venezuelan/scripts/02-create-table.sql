-- Venezuelan Cuisine Database - Script 02: Create Table & Taxonomy
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26

-- Drop existing table if exists
DROP TABLE IF EXISTS venezuelan CASCADE;

-- Create venezuelan table
CREATE TABLE venezuelan (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('arepa', 'main', 'soup', 'street_food', 'seafood', 'dessert', 'beverage')),
  status TEXT DEFAULT 'classic' CHECK (status IN ('iconic', 'classic', 'traditional', 'regional')),
  region TEXT,
  protein_type TEXT,
  cooking_method TEXT,
  prep_time_min INTEGER,
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  dietary JSONB DEFAULT '{}'::jsonb,
  allergens TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_venezuelan_category ON venezuelan(category);
CREATE INDEX idx_venezuelan_status ON venezuelan(status);
CREATE INDEX idx_venezuelan_region ON venezuelan(region);
CREATE INDEX idx_venezuelan_protein_type ON venezuelan(protein_type);
CREATE INDEX idx_venezuelan_popularity ON venezuelan(popularity DESC);

-- Enable RLS
ALTER TABLE venezuelan ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access on venezuelan"
  ON venezuelan FOR SELECT
  USING (true);

-- Add to product_taxonomy (DELETE + INSERT pattern)
DELETE FROM product_taxonomy WHERE product_type = 'venezuelan';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'venezuelan',
  'Venezuelan Cuisine',
  'Cucina Venezuelana',
  'standalone',
  'food',
  'second_course',
  169
);

-- Success message
SELECT 'Venezuelan table created successfully' AS status;
