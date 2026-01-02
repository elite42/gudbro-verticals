-- ============================================
-- GEORGIAN DATABASE - Schema
-- ============================================
-- GUDBRO Database Standards v1.1
-- TEXT + CHECK constraints (no ENUM)
-- ============================================

-- Create georgian table if not exists
CREATE TABLE IF NOT EXISTS georgian (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  georgian_name TEXT,
  georgian_script TEXT,

  -- Classification
  category TEXT NOT NULL CHECK (category IN (
    'khachapuri', 'khinkali', 'grilled_meats', 'stews_mains', 'soups',
    'appetizers', 'breads_pastries', 'sauces', 'salads_sides', 'desserts'
  )),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'classic', 'popular', 'signature', 'traditional', 'premium', 'festive', 'street_food'
  )),
  region TEXT CHECK (region IN (
    'kakheti', 'imereti', 'adjara', 'samegrelo', 'svaneti', 'racha',
    'guria', 'kartli', 'meskheti', 'tusheti', 'pshavi_khevsureti', 'national'
  )),

  -- Georgian-specific
  protein_type TEXT CHECK (protein_type IN (
    'beef', 'pork', 'lamb', 'chicken', 'turkey', 'fish', 'mixed', 'vegetarian', 'vegan', 'none'
  )),
  cooking_method TEXT CHECK (cooking_method IN (
    'grilled', 'baked', 'boiled', 'stewed', 'fried', 'stuffed', 'raw', 'fermented', 'cold'
  )),
  is_supra_dish BOOLEAN DEFAULT false,
  is_festive BOOLEAN DEFAULT false,
  is_street_food BOOLEAN DEFAULT false,
  served_cold BOOLEAN DEFAULT false,

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
CREATE INDEX IF NOT EXISTS idx_georgian_category ON georgian(category);
CREATE INDEX IF NOT EXISTS idx_georgian_region ON georgian(region);
CREATE INDEX IF NOT EXISTS idx_georgian_status ON georgian(status);
CREATE INDEX IF NOT EXISTS idx_georgian_protein ON georgian(protein_type);
CREATE INDEX IF NOT EXISTS idx_georgian_supra ON georgian(is_supra_dish) WHERE is_supra_dish = true;
CREATE INDEX IF NOT EXISTS idx_georgian_festive ON georgian(is_festive) WHERE is_festive = true;
CREATE INDEX IF NOT EXISTS idx_georgian_cold ON georgian(served_cold) WHERE served_cold = true;

-- Enable RLS
ALTER TABLE georgian ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Allow public read access on georgian" ON georgian;
CREATE POLICY "Allow public read access on georgian" ON georgian
  FOR SELECT USING (true);

-- Add to product_taxonomy if not exists
INSERT INTO product_taxonomy (product_type, service_type, menu_type, category, display_name_en, display_order)
VALUES ('georgian', 'food', 'standalone', 'second_course', 'Georgian Cuisine', 38)
ON CONFLICT (product_type, product_id) DO UPDATE SET
  display_name_en = EXCLUDED.display_name_en,
  menu_type = EXCLUDED.menu_type,
  service_type = EXCLUDED.service_type,
  category = EXCLUDED.category;

-- ============================================
-- Schema created successfully
-- Next: Run 01-georgian-missing-ingredients.sql
-- ============================================
