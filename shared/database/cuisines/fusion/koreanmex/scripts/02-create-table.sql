-- Korean-Mexican Fusion Database - Script 02: Create Table & Taxonomy
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26

-- Drop existing table if exists
DROP TABLE IF EXISTS koreanmex CASCADE;

-- Create koreanmex table
CREATE TABLE koreanmex (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('taco', 'burrito', 'bowl', 'quesadilla', 'appetizer', 'side')),
  status TEXT DEFAULT 'classic' CHECK (status IN ('iconic', 'classic', 'modern')),
  protein_type TEXT,
  cooking_method TEXT,
  prep_time_min INTEGER,
  spice_level INTEGER DEFAULT 2 CHECK (spice_level >= 0 AND spice_level <= 5),
  dietary JSONB DEFAULT '{}'::jsonb,
  allergens TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_koreanmex_category ON koreanmex(category);
CREATE INDEX idx_koreanmex_status ON koreanmex(status);
CREATE INDEX idx_koreanmex_protein_type ON koreanmex(protein_type);
CREATE INDEX idx_koreanmex_popularity ON koreanmex(popularity DESC);
CREATE INDEX idx_koreanmex_spice_level ON koreanmex(spice_level);

-- Enable RLS
ALTER TABLE koreanmex ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access on koreanmex"
  ON koreanmex FOR SELECT
  USING (true);

-- Add to product_taxonomy (DELETE + INSERT pattern)
DELETE FROM product_taxonomy WHERE product_type = 'koreanmex';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'koreanmex',
  'Korean-Mexican Fusion',
  'Fusione Coreano-Messicana',
  'standalone',
  'food',
  'second_course',
  166
);

-- Success message
SELECT 'Korean-Mexican table created successfully' AS status;
