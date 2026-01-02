-- ============================================
-- Peruvian Database Schema
-- GUDBRO Database Standards v1.2
-- TEXT+CHECK Pattern (no ENUM)
-- ============================================

-- Drop existing table if exists
DROP TABLE IF EXISTS peruvian CASCADE;

-- Create Peruvian table with TEXT+CHECK pattern
CREATE TABLE peruvian (
  -- Primary Key
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- Names
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  spanish_name TEXT,
  quechua_name TEXT,

  -- Classification with CHECK constraints
  category TEXT NOT NULL CHECK (category IN (
    'ceviches', 'tiraditos', 'causas', 'anticuchos',
    'main_dishes', 'rice_dishes', 'soups', 'seafood',
    'criollo', 'andean', 'amazonian', 'nikkei', 'chifa',
    'street_food', 'desserts', 'drinks'
  )),

  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'signature', 'popular', 'traditional', 'regional', 'fusion'
  )),

  region TEXT NOT NULL CHECK (region IN (
    'lima', 'costa', 'sierra', 'selva', 'arequipa',
    'cusco', 'piura', 'lambayeque', 'national'
  )),

  -- Cooking details
  protein_type TEXT CHECK (protein_type IN (
    'fish', 'seafood_mixed', 'shrimp', 'octopus',
    'beef', 'chicken', 'pork', 'guinea_pig', 'alpaca',
    'duck', 'lamb', 'vegetarian', 'vegan'
  )),

  cooking_method TEXT CHECK (cooking_method IN (
    'raw', 'grilled', 'stir_fried', 'braised',
    'fried', 'steamed', 'baked', 'roasted'
  )),

  -- Peruvian-specific flags
  is_street_food BOOLEAN NOT NULL DEFAULT false,
  is_festive BOOLEAN NOT NULL DEFAULT false,
  is_fusion BOOLEAN NOT NULL DEFAULT false,
  served_cold BOOLEAN NOT NULL DEFAULT false,

  -- Dietary & Allergens
  allergens TEXT[] DEFAULT '{}',
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_dairy_free BOOLEAN NOT NULL DEFAULT false,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,

  -- Nutrition
  calories_per_serving INTEGER,
  protein_g INTEGER,
  carbs_g INTEGER,
  fat_g INTEGER,

  -- Spice & Popularity
  spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

  -- Tags
  tags TEXT[] DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_peruvian_category ON peruvian(category);
CREATE INDEX idx_peruvian_status ON peruvian(status);
CREATE INDEX idx_peruvian_region ON peruvian(region);
CREATE INDEX idx_peruvian_protein_type ON peruvian(protein_type);
CREATE INDEX idx_peruvian_is_street_food ON peruvian(is_street_food);
CREATE INDEX idx_peruvian_is_vegan ON peruvian(is_vegan);
CREATE INDEX idx_peruvian_is_vegetarian ON peruvian(is_vegetarian);
CREATE INDEX idx_peruvian_spice_level ON peruvian(spice_level);
CREATE INDEX idx_peruvian_popularity ON peruvian(popularity);
CREATE INDEX idx_peruvian_is_fusion ON peruvian(is_fusion);

-- Enable RLS
ALTER TABLE peruvian ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access on peruvian"
  ON peruvian FOR SELECT
  TO public
  USING (true);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_peruvian_updated_at ON peruvian;
CREATE TRIGGER update_peruvian_updated_at
  BEFORE UPDATE ON peruvian
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add to product_taxonomy (only if not exists)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, description_en, icon, display_order)
SELECT 'peruvian', 'standalone', 'food', 'second_course', 'Peruvian', 'Peruviano', 'Peruvian cuisine - ceviches, causas, anticuchos, Nikkei and Chifa fusion', '🇵🇪', 33
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'peruvian');

-- Comments
COMMENT ON TABLE peruvian IS 'Peruvian cuisine dishes - ceviches, causas, anticuchos, Nikkei, Chifa, and more';
COMMENT ON COLUMN peruvian.quechua_name IS 'Native Quechua name for traditional dishes';
COMMENT ON COLUMN peruvian.is_fusion IS 'Indicates Nikkei (Japanese-Peruvian) or Chifa (Chinese-Peruvian) fusion dishes';
COMMENT ON COLUMN peruvian.served_cold IS 'For ceviches, tiraditos, causas, and other cold preparations';
