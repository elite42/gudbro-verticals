-- Cajun/Creole Cuisine - Create Table
-- GUDBRO Database Standards v1.7

-- Create table with TEXT + CHECK pattern (standard for new tables)
CREATE TABLE IF NOT EXISTS cajun (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'cajun', 'creole', 'seafood', 'rice', 'soup_stew',
    'meat', 'fried', 'bread', 'dessert', 'beverage'
  )),
  status TEXT NOT NULL CHECK (status IN ('iconic', 'classic', 'traditional', 'regional')),
  origin TEXT NOT NULL CHECK (origin IN ('cajun', 'creole', 'both')),
  protein_type TEXT CHECK (protein_type IN (
    'crawfish', 'shrimp', 'crab', 'oyster', 'catfish', 'alligator',
    'chicken', 'pork', 'beef', 'sausage', 'mixed', NULL
  )),
  cooking_method TEXT,
  prep_time_min INTEGER,
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 3),
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT false,
  is_dairy_free BOOLEAN DEFAULT false,
  allergens TEXT[],
  tags TEXT[],
  popularity INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_cajun_category ON cajun(category);
CREATE INDEX IF NOT EXISTS idx_cajun_status ON cajun(status);
CREATE INDEX IF NOT EXISTS idx_cajun_origin ON cajun(origin);
CREATE INDEX IF NOT EXISTS idx_cajun_protein ON cajun(protein_type);

-- Add to product_taxonomy (using WHERE NOT EXISTS - no ON CONFLICT!)
INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
)
SELECT
  'cajun',
  'Cajun/Creole Cuisine',
  'Cucina Cajun/Creole',
  'standalone',
  'food',
  'second_course',
  75
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'cajun');

-- Verify
SELECT 'Table cajun created' AS status;
SELECT * FROM product_taxonomy WHERE product_type = 'cajun';
