-- Colombian Cuisine Database - Script 02: Create Table & Taxonomy
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26

-- Drop existing table if exists
DROP TABLE IF EXISTS colombian CASCADE;

-- Create colombian table
CREATE TABLE colombian (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('soup', 'main', 'breakfast', 'street_food', 'seafood', 'dessert', 'beverage')),
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
CREATE INDEX idx_colombian_category ON colombian(category);
CREATE INDEX idx_colombian_status ON colombian(status);
CREATE INDEX idx_colombian_region ON colombian(region);
CREATE INDEX idx_colombian_protein_type ON colombian(protein_type);
CREATE INDEX idx_colombian_popularity ON colombian(popularity DESC);

-- Enable RLS
ALTER TABLE colombian ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access on colombian"
  ON colombian FOR SELECT
  USING (true);

-- Add to product_taxonomy (DELETE + INSERT pattern)
DELETE FROM product_taxonomy WHERE product_type = 'colombian';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'colombian',
  'Colombian Cuisine',
  'Cucina Colombiana',
  'standalone',
  'food',
  'second_course',
  168
);

-- Success message
SELECT 'Colombian table created successfully' AS status;
