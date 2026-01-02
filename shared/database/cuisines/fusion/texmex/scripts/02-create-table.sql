-- Tex-Mex Database - Script 02: Create Table & Taxonomy
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-25

-- Drop existing table if exists
DROP TABLE IF EXISTS texmex CASCADE;

-- Create texmex table
CREATE TABLE texmex (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('tacos', 'burritos', 'enchiladas', 'nachos', 'fajitas', 'quesadillas', 'sides', 'dips', 'mains')),
  status TEXT DEFAULT 'classic' CHECK (status IN ('iconic', 'classic', 'traditional', 'modern', 'regional')),
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
CREATE INDEX idx_texmex_category ON texmex(category);
CREATE INDEX idx_texmex_status ON texmex(status);
CREATE INDEX idx_texmex_protein_type ON texmex(protein_type);
CREATE INDEX idx_texmex_popularity ON texmex(popularity DESC);
CREATE INDEX idx_texmex_spice_level ON texmex(spice_level);

-- Enable RLS
ALTER TABLE texmex ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access on texmex"
  ON texmex FOR SELECT
  USING (true);

-- Add to product_taxonomy (DELETE + INSERT pattern)
DELETE FROM product_taxonomy WHERE product_type = 'texmex';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'texmex',
  'Tex-Mex',
  'Tex-Mex',
  'standalone',
  'food',
  'second_course',
  163
);

-- Success message
SELECT 'Tex-Mex table created successfully' AS status;
