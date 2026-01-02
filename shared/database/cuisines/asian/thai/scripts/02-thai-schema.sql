-- ============================================
-- THAI DATABASE - Schema
-- ============================================
-- Database Standards v1.1 compliant (TEXT+CHECK, no ENUM)
-- Run AFTER 01-thai-missing-ingredients.sql
-- ============================================

BEGIN;

-- Create thai table
CREATE TABLE IF NOT EXISTS thai (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,

  -- INFO BASE (English only)
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  thai_name TEXT,                    -- Romanized Thai name
  thai_script TEXT,                  -- Thai script (อักษรไทย)

  -- CLASSIFICATION
  category TEXT NOT NULL CHECK (category IN (
    'curries', 'stir_fries', 'soups', 'salads', 'noodles',
    'rice_dishes', 'appetizers', 'grilled', 'seafood', 'desserts'
  )),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'street_food'
  )),

  -- THAI-SPECIFIC
  region TEXT NOT NULL CHECK (region IN (
    'central', 'northern', 'northeastern', 'southern', 'royal', 'street', 'international'
  )),
  protein_type TEXT NOT NULL CHECK (protein_type IN (
    'chicken', 'pork', 'beef', 'duck', 'shrimp', 'fish', 'squid', 'crab',
    'mixed_seafood', 'tofu', 'vegetables', 'egg', 'mixed'
  )),
  cooking_method TEXT NOT NULL CHECK (cooking_method IN (
    'stir_fried', 'boiled', 'grilled', 'deep_fried', 'steamed', 'raw', 'simmered', 'roasted'
  )),
  curry_type TEXT NOT NULL DEFAULT 'none' CHECK (curry_type IN (
    'green', 'red', 'yellow', 'massaman', 'panang', 'jungle', 'none'
  )),
  is_street_food BOOLEAN NOT NULL DEFAULT false,
  has_coconut_milk BOOLEAN NOT NULL DEFAULT false,

  -- INGREDIENTS
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - ALLERGENS
  allergens TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - DIETARY FLAGS
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_dairy_free BOOLEAN NOT NULL DEFAULT true,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_halal BOOLEAN NOT NULL DEFAULT false,
  is_pescatarian BOOLEAN NOT NULL DEFAULT false,

  -- SISTEMA 5 DIMENSIONI - NUTRITION
  calories_per_serving INTEGER,
  protein_g INTEGER,
  carbs_g INTEGER,
  fat_g INTEGER,

  -- SISTEMA 5 DIMENSIONI - SPICE (0-5)
  spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- METADATA
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

  -- TIMESTAMPS
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_thai_category ON thai(category);
CREATE INDEX IF NOT EXISTS idx_thai_region ON thai(region);
CREATE INDEX IF NOT EXISTS idx_thai_protein_type ON thai(protein_type);
CREATE INDEX IF NOT EXISTS idx_thai_curry_type ON thai(curry_type);
CREATE INDEX IF NOT EXISTS idx_thai_is_street_food ON thai(is_street_food);
CREATE INDEX IF NOT EXISTS idx_thai_spice_level ON thai(spice_level);
CREATE INDEX IF NOT EXISTS idx_thai_popularity ON thai(popularity);

-- Enable RLS
ALTER TABLE thai ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow public read access
CREATE POLICY "Allow public read access on thai"
ON thai FOR SELECT
TO public
USING (true);

-- RLS Policy: Allow service role full access
CREATE POLICY "Allow service role full access on thai"
ON thai FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Update trigger
CREATE OR REPLACE FUNCTION update_thai_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS trigger_update_thai_timestamp ON thai;
CREATE TRIGGER trigger_update_thai_timestamp
  BEFORE UPDATE ON thai
  FOR EACH ROW
  EXECUTE FUNCTION update_thai_timestamp();

COMMIT;

-- Verify
SELECT 'Thai table created successfully' as status;
