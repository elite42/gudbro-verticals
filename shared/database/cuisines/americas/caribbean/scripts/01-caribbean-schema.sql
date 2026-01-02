-- ============================================
-- CARIBBEAN Database Schema
-- GUDBRO Database Standards v1.3
-- ============================================

-- Drop existing table if exists
DROP TABLE IF EXISTS caribbean CASCADE;

-- Create caribbean table
CREATE TABLE caribbean (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  local_name TEXT,
  description TEXT NOT NULL,

  -- Classification
  category TEXT NOT NULL CHECK (category IN (
    'main_dishes', 'rice_beans', 'seafood', 'street_food',
    'soups_stews', 'sides', 'breakfast', 'desserts', 'beverages'
  )),
  origin TEXT NOT NULL CHECK (origin IN (
    'jamaica', 'cuba', 'puerto_rico', 'dominican_republic',
    'haiti', 'trinidad_tobago', 'barbados', 'bahamas',
    'martinique', 'guadeloupe', 'curacao', 'aruba',
    'us_virgin_islands', 'cayman_islands', 'grenada',
    'st_lucia', 'antigua_barbuda', 'pan_caribbean'
  )),
  status TEXT NOT NULL CHECK (status IN (
    'active', 'popular', 'signature', 'traditional', 'street'
  )),

  -- Cooking
  protein_type TEXT CHECK (protein_type IN (
    'chicken', 'pork', 'beef', 'goat', 'fish', 'seafood', 'vegetarian', 'vegan'
  )),
  cooking_method TEXT CHECK (cooking_method IN (
    'jerk', 'stewed', 'fried', 'grilled', 'roasted',
    'braised', 'steamed', 'curried', 'escovitch', 'pickled'
  )),
  is_spicy BOOLEAN DEFAULT false,
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- Serving
  serving_size_g INTEGER,
  calories_per_serving INTEGER,

  -- Dietary (Sistema 5 Dimensioni)
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT false,
  is_dairy_free BOOLEAN DEFAULT false,
  is_nut_free BOOLEAN DEFAULT true,
  is_halal BOOLEAN DEFAULT false,
  is_kosher BOOLEAN DEFAULT false,
  allergens TEXT[] DEFAULT '{}',

  -- Ingredients (for reference, actual linking in product_ingredients)
  ingredient_ids TEXT[] DEFAULT '{}',

  -- Metadata
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_caribbean_category ON caribbean(category);
CREATE INDEX idx_caribbean_origin ON caribbean(origin);
CREATE INDEX idx_caribbean_status ON caribbean(status);
CREATE INDEX idx_caribbean_protein_type ON caribbean(protein_type);
CREATE INDEX idx_caribbean_is_vegetarian ON caribbean(is_vegetarian);
CREATE INDEX idx_caribbean_is_vegan ON caribbean(is_vegan);
CREATE INDEX idx_caribbean_is_spicy ON caribbean(is_spicy);
CREATE INDEX idx_caribbean_popularity ON caribbean(popularity DESC);

-- Enable RLS
ALTER TABLE caribbean ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access" ON caribbean
  FOR SELECT
  TO public
  USING (true);

-- Add to product_taxonomy (check if exists first)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it)
SELECT 'caribbean', 'standalone', 'food', 'second_course', 'Caribbean', 'Caraibico'
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'caribbean');

-- Grant permissions
GRANT SELECT ON caribbean TO anon;
GRANT SELECT ON caribbean TO authenticated;

-- Comment
COMMENT ON TABLE caribbean IS 'Caribbean cuisine dishes from multiple islands - 139 items';
