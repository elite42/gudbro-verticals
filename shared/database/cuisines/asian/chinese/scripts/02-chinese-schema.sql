-- ============================================
-- CHINESE DATABASE - Schema
-- ============================================
-- Database Standards v1.1 compliant (TEXT+CHECK, no ENUM)
-- Run AFTER 01-chinese-missing-ingredients.sql
-- ============================================

BEGIN;

-- Create chinese table
CREATE TABLE IF NOT EXISTS chinese (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,

  -- INFO BASE (English only)
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  chinese_name TEXT,                    -- Pinyin romanization
  chinese_script TEXT,                  -- Chinese characters (汉字)

  -- CLASSIFICATION
  category TEXT NOT NULL CHECK (category IN (
    'stir_fries', 'noodles', 'rice_dishes', 'soups', 'dim_sum',
    'roasted', 'steamed', 'braised', 'appetizers', 'desserts'
  )),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'street_food'
  )),

  -- CHINESE-SPECIFIC
  region TEXT NOT NULL CHECK (region IN (
    'cantonese', 'sichuan', 'hunan', 'shandong', 'jiangsu', 'fujian', 'anhui',
    'zhejiang', 'beijing', 'northeastern', 'xinjiang', 'hakka', 'taiwanese', 'hong_kong', 'international'
  )),
  cuisine_style TEXT NOT NULL CHECK (cuisine_style IN (
    'cantonese', 'sichuan', 'hunan', 'shanghai', 'beijing', 'hakka', 'chaozhou',
    'dim_sum', 'american_chinese', 'fusion'
  )),
  protein_type TEXT NOT NULL CHECK (protein_type IN (
    'chicken', 'pork', 'beef', 'duck', 'lamb', 'shrimp', 'fish', 'squid', 'crab',
    'lobster', 'mixed_seafood', 'tofu', 'vegetables', 'egg', 'mixed'
  )),
  cooking_method TEXT NOT NULL CHECK (cooking_method IN (
    'stir_fried', 'deep_fried', 'steamed', 'braised', 'roasted', 'boiled', 'smoked', 'clay_pot', 'hot_pot', 'raw'
  )),
  is_street_food BOOLEAN NOT NULL DEFAULT false,
  is_dim_sum BOOLEAN NOT NULL DEFAULT false,

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
CREATE INDEX IF NOT EXISTS idx_chinese_category ON chinese(category);
CREATE INDEX IF NOT EXISTS idx_chinese_region ON chinese(region);
CREATE INDEX IF NOT EXISTS idx_chinese_cuisine_style ON chinese(cuisine_style);
CREATE INDEX IF NOT EXISTS idx_chinese_protein_type ON chinese(protein_type);
CREATE INDEX IF NOT EXISTS idx_chinese_is_dim_sum ON chinese(is_dim_sum);
CREATE INDEX IF NOT EXISTS idx_chinese_is_street_food ON chinese(is_street_food);
CREATE INDEX IF NOT EXISTS idx_chinese_spice_level ON chinese(spice_level);
CREATE INDEX IF NOT EXISTS idx_chinese_popularity ON chinese(popularity);

-- Enable RLS
ALTER TABLE chinese ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow public read access
CREATE POLICY "Allow public read access on chinese"
ON chinese FOR SELECT
TO public
USING (true);

-- RLS Policy: Allow service role full access
CREATE POLICY "Allow service role full access on chinese"
ON chinese FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Update trigger
CREATE OR REPLACE FUNCTION update_chinese_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS trigger_update_chinese_timestamp ON chinese;
CREATE TRIGGER trigger_update_chinese_timestamp
  BEFORE UPDATE ON chinese
  FOR EACH ROW
  EXECUTE FUNCTION update_chinese_timestamp();

COMMIT;

-- Verify
SELECT 'Chinese table created successfully' as status;
