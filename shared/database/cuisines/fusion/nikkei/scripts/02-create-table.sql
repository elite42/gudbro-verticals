-- Nikkei Database - Script 02: Create Table & Taxonomy
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-25

-- Drop existing table if exists
DROP TABLE IF EXISTS nikkei CASCADE;

-- Create nikkei table
CREATE TABLE nikkei (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('tiradito', 'ceviche', 'maki', 'main', 'anticucho', 'side')),
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
CREATE INDEX idx_nikkei_category ON nikkei(category);
CREATE INDEX idx_nikkei_status ON nikkei(status);
CREATE INDEX idx_nikkei_protein_type ON nikkei(protein_type);
CREATE INDEX idx_nikkei_popularity ON nikkei(popularity DESC);
CREATE INDEX idx_nikkei_spice_level ON nikkei(spice_level);

-- Enable RLS
ALTER TABLE nikkei ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access on nikkei"
  ON nikkei FOR SELECT
  USING (true);

-- Add to product_taxonomy (DELETE + INSERT pattern)
DELETE FROM product_taxonomy WHERE product_type = 'nikkei';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'nikkei',
  'Nikkei (Japanese-Peruvian)',
  'Nikkei (Giapponese-Peruviano)',
  'standalone',
  'food',
  'second_course',
  164
);

-- Success message
SELECT 'Nikkei table created successfully' AS status;
