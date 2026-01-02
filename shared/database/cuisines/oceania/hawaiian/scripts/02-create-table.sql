-- Hawaiian Cuisine - Create Table
-- 29 dishes across 8 categories

-- Create table if not exists
CREATE TABLE IF NOT EXISTS hawaiian (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('poke', 'plate_lunch', 'luau', 'noodles', 'snack', 'grill', 'dessert', 'beverage')),
  status TEXT NOT NULL CHECK (status IN ('iconic', 'classic', 'traditional', 'local')),
  region TEXT,
  protein_type TEXT,
  cooking_method TEXT,
  prep_time_min INTEGER,
  spice_level INTEGER DEFAULT 0,
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT false,
  is_dairy_free BOOLEAN DEFAULT false,
  allergens TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add to product_taxonomy (uses INSERT...WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (product_type, display_name_en, display_name_it, menu_type, service_type, category, display_order)
SELECT 'hawaiian', 'Hawaiian Cuisine', 'Cucina Hawaiana', 'standalone', 'food', 'second_course', 74
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'hawaiian');

-- Enable RLS
ALTER TABLE hawaiian ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public read access" ON hawaiian;
CREATE POLICY "Public read access" ON hawaiian FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role full access" ON hawaiian;
CREATE POLICY "Service role full access" ON hawaiian FOR ALL USING (
  auth.role() = 'service_role'
);

-- Verification
SELECT product_type, display_name_en, display_order FROM product_taxonomy WHERE product_type = 'hawaiian';
