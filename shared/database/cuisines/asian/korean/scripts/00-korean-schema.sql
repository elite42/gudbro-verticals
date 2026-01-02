-- ============================================
-- KOREAN DATABASE - Schema Creation
-- ============================================
-- Database Standards v1.1 Compliant
-- Uses TEXT + CHECK constraints (no ENUMs)
--
-- RUN THIS FIRST before any data imports
-- ============================================

-- Create korean table
CREATE TABLE IF NOT EXISTS korean (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  korean_name TEXT NOT NULL,
  korean_script TEXT,

  -- CLASSIFICATION
  category TEXT NOT NULL CHECK (category IN (
    'rice_dishes',
    'bbq',
    'stews_soups',
    'noodles',
    'pancakes',
    'fried_chicken',
    'street_food',
    'side_dishes',
    'fermented',
    'desserts'
  )),

  status TEXT NOT NULL CHECK (status IN (
    'active',
    'classic',
    'popular',
    'signature',
    'street_food',
    'traditional',
    'premium',
    'fusion'
  )),

  region TEXT NOT NULL CHECK (region IN (
    'seoul',
    'busan',
    'jeju',
    'jeonju',
    'gyeongsang',
    'jeolla',
    'gangwon',
    'national',
    'royal_cuisine'
  )),

  -- KOREAN-SPECIFIC
  protein_type TEXT NOT NULL CHECK (protein_type IN (
    'beef',
    'pork',
    'chicken',
    'seafood',
    'tofu',
    'mixed',
    'none'
  )),

  cooking_method TEXT NOT NULL CHECK (cooking_method IN (
    'grilled',
    'braised',
    'stir_fried',
    'deep_fried',
    'steamed',
    'boiled',
    'raw',
    'fermented',
    'pan_fried'
  )),

  is_street_food BOOLEAN NOT NULL DEFAULT false,
  is_fermented BOOLEAN NOT NULL DEFAULT false,
  is_spicy BOOLEAN NOT NULL DEFAULT false,
  has_banchan BOOLEAN NOT NULL DEFAULT true,

  -- SISTEMA 5 DIMENSIONI - ALLERGENS & DIETARY
  allergens TEXT[] DEFAULT '{}',
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_dairy_free BOOLEAN NOT NULL DEFAULT true,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_halal BOOLEAN NOT NULL DEFAULT false,
  is_pescatarian BOOLEAN NOT NULL DEFAULT false,

  -- SISTEMA 5 DIMENSIONI - NUTRITION
  calories_per_serving INTEGER,
  protein_g NUMERIC(5,1),
  carbs_g NUMERIC(5,1),
  fat_g NUMERIC(5,1),

  -- SISTEMA 5 DIMENSIONI - SPICE (0-5)
  spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- METADATA
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

  -- TIMESTAMPS
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_korean_category ON korean(category);
CREATE INDEX IF NOT EXISTS idx_korean_status ON korean(status);
CREATE INDEX IF NOT EXISTS idx_korean_region ON korean(region);
CREATE INDEX IF NOT EXISTS idx_korean_protein_type ON korean(protein_type);
CREATE INDEX IF NOT EXISTS idx_korean_is_spicy ON korean(is_spicy);
CREATE INDEX IF NOT EXISTS idx_korean_is_vegetarian ON korean(is_vegetarian);
CREATE INDEX IF NOT EXISTS idx_korean_is_vegan ON korean(is_vegan);
CREATE INDEX IF NOT EXISTS idx_korean_popularity ON korean(popularity DESC);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_korean_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS korean_updated_at ON korean;
CREATE TRIGGER korean_updated_at
  BEFORE UPDATE ON korean
  FOR EACH ROW
  EXECUTE FUNCTION update_korean_updated_at();

-- Enable RLS
ALTER TABLE korean ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "korean_public_read" ON korean;
CREATE POLICY "korean_public_read" ON korean
  FOR SELECT USING (true);

-- ============================================
-- Schema created successfully
-- Next: Run 01-korean-missing-ingredients.sql
-- Then: Run 02-korean-data.sql
-- Finally: Run 03-korean-product-ingredients.sql
-- ============================================
