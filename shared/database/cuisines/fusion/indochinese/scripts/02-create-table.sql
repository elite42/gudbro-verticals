-- Indo-Chinese Database - Script 02: Create Table & Taxonomy
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-25

-- Drop existing table if exists
DROP TABLE IF EXISTS indochinese CASCADE;

-- Create indochinese table
CREATE TABLE indochinese (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('manchurian', 'chilli', 'noodles', 'rice', 'soup', 'starter')),
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
CREATE INDEX idx_indochinese_category ON indochinese(category);
CREATE INDEX idx_indochinese_status ON indochinese(status);
CREATE INDEX idx_indochinese_protein_type ON indochinese(protein_type);
CREATE INDEX idx_indochinese_popularity ON indochinese(popularity DESC);
CREATE INDEX idx_indochinese_spice_level ON indochinese(spice_level);

-- Enable RLS
ALTER TABLE indochinese ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access on indochinese"
  ON indochinese FOR SELECT
  USING (true);

-- Add to product_taxonomy (DELETE + INSERT pattern)
DELETE FROM product_taxonomy WHERE product_type = 'indochinese';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'indochinese',
  'Indo-Chinese (Hakka-Indian)',
  'Indo-Cinese (Hakka-Indiano)',
  'standalone',
  'food',
  'second_course',
  165
);

-- Success message
SELECT 'Indo-Chinese table created successfully' AS status;
