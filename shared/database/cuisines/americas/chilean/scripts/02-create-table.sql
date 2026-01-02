-- Chilean Cuisine Database - Script 02: Create Table & Taxonomy
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26

-- Drop existing table if exists
DROP TABLE IF EXISTS chilean CASCADE;

-- Create chilean table
CREATE TABLE chilean (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('empanada', 'main', 'soup', 'seafood', 'street_food', 'appetizer', 'dessert', 'beverage')),
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
CREATE INDEX idx_chilean_category ON chilean(category);
CREATE INDEX idx_chilean_status ON chilean(status);
CREATE INDEX idx_chilean_region ON chilean(region);
CREATE INDEX idx_chilean_protein_type ON chilean(protein_type);
CREATE INDEX idx_chilean_popularity ON chilean(popularity DESC);

-- Enable RLS
ALTER TABLE chilean ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access on chilean"
  ON chilean FOR SELECT
  USING (true);

-- Add to product_taxonomy (DELETE + INSERT pattern)
DELETE FROM product_taxonomy WHERE product_type = 'chilean';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'chilean',
  'Chilean Cuisine',
  'Cucina Cilena',
  'standalone',
  'food',
  'second_course',
  170
);

-- Success message
SELECT 'Chilean table created successfully' AS status;
