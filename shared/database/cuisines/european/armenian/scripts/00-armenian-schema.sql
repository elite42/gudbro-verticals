-- ============================================
-- ARMENIAN DATABASE - Schema
-- ============================================
-- GUDBRO Database Standards v1.1
-- TEXT + CHECK constraints (no ENUM)
-- ============================================

-- Create armenian table if not exists
CREATE TABLE IF NOT EXISTS armenian (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  armenian_name TEXT,
  armenian_script TEXT,

  -- Classification
  category TEXT NOT NULL CHECK (category IN (
    'grilled_meats', 'dolma_sarma', 'soups', 'dumplings', 'stews_mains',
    'appetizers_mezze', 'salads_sides', 'breads', 'rice_grains', 'desserts'
  )),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'classic', 'popular', 'signature', 'traditional', 'premium', 'festive', 'street_food'
  )),
  region TEXT CHECK (region IN (
    'yerevan', 'ararat', 'shirak', 'gegharkunik', 'syunik', 'tavush',
    'lori', 'vayots_dzor', 'kotayk', 'armavir', 'western_armenian', 'national'
  )),

  -- Armenian-specific
  protein_type TEXT CHECK (protein_type IN (
    'lamb', 'beef', 'pork', 'chicken', 'fish', 'trout', 'mixed', 'vegetarian', 'vegan', 'none'
  )),
  cooking_method TEXT CHECK (cooking_method IN (
    'grilled', 'baked', 'fried', 'boiled', 'stewed', 'stuffed', 'raw', 'fermented', 'cured'
  )),
  is_festive BOOLEAN DEFAULT false,
  is_lenten BOOLEAN DEFAULT false,
  is_street_food BOOLEAN DEFAULT false,
  uses_tonir BOOLEAN DEFAULT false,

  -- Ingredients (array of IDs)
  ingredient_ids TEXT[],

  -- Sistema 5 Dimensioni - Allergens & Dietary
  allergens TEXT[] DEFAULT '{}',
  is_gluten_free BOOLEAN DEFAULT false,
  is_dairy_free BOOLEAN DEFAULT false,
  is_nut_free BOOLEAN DEFAULT true,
  is_vegan BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false,
  is_halal BOOLEAN DEFAULT true,
  is_pescatarian BOOLEAN DEFAULT false,

  -- Sistema 5 Dimensioni - Nutrition
  calories_per_serving INTEGER,
  protein_g DECIMAL(5,1),
  carbs_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),

  -- Sistema 5 Dimensioni - Spice (0-5)
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- Metadata
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_armenian_category ON armenian(category);
CREATE INDEX IF NOT EXISTS idx_armenian_region ON armenian(region);
CREATE INDEX IF NOT EXISTS idx_armenian_status ON armenian(status);
CREATE INDEX IF NOT EXISTS idx_armenian_protein ON armenian(protein_type);
CREATE INDEX IF NOT EXISTS idx_armenian_festive ON armenian(is_festive) WHERE is_festive = true;
CREATE INDEX IF NOT EXISTS idx_armenian_lenten ON armenian(is_lenten) WHERE is_lenten = true;
CREATE INDEX IF NOT EXISTS idx_armenian_tonir ON armenian(uses_tonir) WHERE uses_tonir = true;

-- Enable RLS
ALTER TABLE armenian ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Allow public read access on armenian" ON armenian;
CREATE POLICY "Allow public read access on armenian" ON armenian
  FOR SELECT USING (true);

-- Add to product_taxonomy if not exists
INSERT INTO product_taxonomy (product_type, service_type, menu_type, category, display_name_en, display_order)
VALUES ('armenian', 'food', 'standalone', 'second_course', 'Armenian Cuisine', 37)
ON CONFLICT (product_type, product_id) DO UPDATE SET
  display_name_en = EXCLUDED.display_name_en,
  menu_type = EXCLUDED.menu_type,
  service_type = EXCLUDED.service_type,
  category = EXCLUDED.category;

-- ============================================
-- Schema created successfully
-- Next: Run 01-armenian-missing-ingredients.sql
-- ============================================
