-- Nigerian Cuisine - Create Table and Taxonomy
-- GUDBRO Database
-- Date: 2025-12-26

-- Drop existing table if exists
DROP TABLE IF EXISTS nigerian CASCADE;

-- Create Nigerian dishes table
CREATE TABLE nigerian (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('soup', 'swallow', 'rice', 'street_food', 'stew', 'snack', 'appetizer', 'main', 'side', 'dessert', 'beverage')),
  status TEXT NOT NULL CHECK (status IN ('iconic', 'classic', 'traditional', 'regional')),
  region TEXT,
  protein_type TEXT,
  cooking_method TEXT,
  prep_time_min INTEGER,
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT false,
  is_dairy_free BOOLEAN DEFAULT false,
  allergens TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_nigerian_category ON nigerian(category);
CREATE INDEX idx_nigerian_status ON nigerian(status);
CREATE INDEX idx_nigerian_region ON nigerian(region);
CREATE INDEX idx_nigerian_popularity ON nigerian(popularity DESC);

-- Add to product_taxonomy
DELETE FROM product_taxonomy WHERE product_type = 'nigerian';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'nigerian',
  'Nigerian Cuisine',
  'Cucina Nigeriana',
  'standalone',
  'food',
  'second_course',
  69
);

SELECT 'Nigerian table and taxonomy created' AS status;
