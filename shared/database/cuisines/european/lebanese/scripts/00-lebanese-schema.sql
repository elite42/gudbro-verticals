-- ============================================
-- LEBANESE DATABASE - Schema
-- ============================================
-- GUDBRO Database Standards v1.1
-- TEXT + CHECK constraints (no ENUM)
-- ============================================

-- Create lebanese table if not exists
CREATE TABLE IF NOT EXISTS lebanese (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  arabic_name TEXT,
  arabic_script TEXT,

  -- Classification
  category TEXT NOT NULL CHECK (category IN (
    'mezze_dips', 'salads', 'kibbeh', 'grilled_meats', 'stews_mains',
    'rice_grains', 'stuffed_dishes', 'breads_pastries', 'seafood', 'desserts'
  )),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'classic', 'popular', 'signature', 'traditional', 'premium', 'street_food', 'festive'
  )),
  region TEXT CHECK (region IN (
    'beirut', 'tripoli', 'sidon', 'zahle', 'byblos', 'mount_lebanon',
    'bekaa_valley', 'south_lebanon', 'north_lebanon', 'national', 'homs'
  )),

  -- Lebanese-specific
  protein_type TEXT CHECK (protein_type IN (
    'lamb', 'beef', 'chicken', 'fish', 'seafood', 'mixed', 'vegetarian', 'vegan', 'none'
  )),
  cooking_method TEXT CHECK (cooking_method IN (
    'grilled', 'baked', 'fried', 'raw', 'stewed', 'stuffed', 'roasted', 'steamed'
  )),
  is_mezze BOOLEAN DEFAULT false,
  is_festive BOOLEAN DEFAULT false,
  is_street_food BOOLEAN DEFAULT false,
  is_lenten BOOLEAN DEFAULT false,

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
CREATE INDEX IF NOT EXISTS idx_lebanese_category ON lebanese(category);
CREATE INDEX IF NOT EXISTS idx_lebanese_region ON lebanese(region);
CREATE INDEX IF NOT EXISTS idx_lebanese_status ON lebanese(status);
CREATE INDEX IF NOT EXISTS idx_lebanese_protein ON lebanese(protein_type);
CREATE INDEX IF NOT EXISTS idx_lebanese_mezze ON lebanese(is_mezze) WHERE is_mezze = true;
CREATE INDEX IF NOT EXISTS idx_lebanese_lenten ON lebanese(is_lenten) WHERE is_lenten = true;
CREATE INDEX IF NOT EXISTS idx_lebanese_street_food ON lebanese(is_street_food) WHERE is_street_food = true;

-- Enable RLS
ALTER TABLE lebanese ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Allow public read access on lebanese" ON lebanese;
CREATE POLICY "Allow public read access on lebanese" ON lebanese
  FOR SELECT USING (true);

-- Add to product_taxonomy if not exists
INSERT INTO product_taxonomy (product_type, service_type, menu_type, category, display_name_en, display_order)
VALUES ('lebanese', 'food', 'standalone', 'second_course', 'Lebanese Cuisine', 36)
ON CONFLICT (product_type, product_id) DO UPDATE SET
  display_name_en = EXCLUDED.display_name_en,
  menu_type = EXCLUDED.menu_type,
  service_type = EXCLUDED.service_type,
  category = EXCLUDED.category;

-- ============================================
-- Schema created successfully
-- Next: Run 01-lebanese-missing-ingredients.sql
-- ============================================
