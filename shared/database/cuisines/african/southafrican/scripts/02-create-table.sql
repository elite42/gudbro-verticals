-- South African Cuisine - Create Table
-- GUDBRO Database Standards v1.7

-- Create the southafrican table
CREATE TABLE IF NOT EXISTS southafrican (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('braai', 'stew', 'curry', 'side', 'snack', 'dessert', 'bread', 'beverage')),
  status TEXT NOT NULL CHECK (status IN ('iconic', 'classic', 'traditional', 'regional')),
  region TEXT,
  protein_type TEXT,
  cooking_method TEXT,
  prep_time_min INTEGER,
  spice_level INTEGER CHECK (spice_level >= 0 AND spice_level <= 5),
  dietary JSONB DEFAULT '{}',
  allergens TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER CHECK (popularity >= 0 AND popularity <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_southafrican_category ON southafrican(category);
CREATE INDEX IF NOT EXISTS idx_southafrican_status ON southafrican(status);
CREATE INDEX IF NOT EXISTS idx_southafrican_slug ON southafrican(slug);

-- Register in product_taxonomy (check if exists first)
INSERT INTO product_taxonomy (product_type, display_name_en, display_name_it, menu_type, service_type, category, display_order)
SELECT 'southafrican', 'South African', 'Sudafricana', 'standalone', 'food', 'second_course', 63
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'southafrican');

-- Verify
SELECT * FROM product_taxonomy WHERE product_type = 'southafrican';
