-- Argentinian Cuisine Database - Script 02: Create Table & Taxonomy
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26

-- Drop existing table if exists
DROP TABLE IF EXISTS argentinian CASCADE;

-- Create argentinian table
CREATE TABLE argentinian (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('asado', 'empanada', 'main', 'pasta', 'soup', 'appetizer', 'dessert', 'beverage')),
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
CREATE INDEX idx_argentinian_category ON argentinian(category);
CREATE INDEX idx_argentinian_status ON argentinian(status);
CREATE INDEX idx_argentinian_region ON argentinian(region);
CREATE INDEX idx_argentinian_protein_type ON argentinian(protein_type);
CREATE INDEX idx_argentinian_popularity ON argentinian(popularity DESC);

-- Enable RLS
ALTER TABLE argentinian ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access on argentinian"
  ON argentinian FOR SELECT
  USING (true);

-- Add to product_taxonomy (DELETE + INSERT pattern)
DELETE FROM product_taxonomy WHERE product_type = 'argentinian';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'argentinian',
  'Argentinian Cuisine',
  'Cucina Argentina',
  'standalone',
  'food',
  'second_course',
  167
);

-- Success message
SELECT 'Argentinian table created successfully' AS status;
