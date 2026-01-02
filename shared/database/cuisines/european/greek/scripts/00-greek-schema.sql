-- ============================================
-- GREEK DATABASE - Schema Creation
-- ============================================
-- Database Standards v1.1 Compliant
-- Uses TEXT + CHECK constraints (no ENUMs)
--
-- RUN THIS FIRST before any data imports
-- ============================================

-- Create greek table
CREATE TABLE IF NOT EXISTS greek (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  greek_name TEXT NOT NULL,
  greek_script TEXT,

  -- CLASSIFICATION
  category TEXT NOT NULL CHECK (category IN (
    'grilled_meats',
    'baked_casseroles',
    'stews_braises',
    'seafood',
    'meze_appetizers',
    'pies_pastries',
    'salads',
    'soups',
    'desserts'
  )),

  status TEXT NOT NULL CHECK (status IN (
    'active',
    'classic',
    'popular',
    'signature',
    'traditional',
    'premium',
    'street_food',
    'festive'
  )),

  region TEXT NOT NULL CHECK (region IN (
    'athens',
    'thessaloniki',
    'crete',
    'peloponnese',
    'cyclades',
    'ionian_islands',
    'dodecanese',
    'macedonia',
    'epirus',
    'aegean_islands',
    'national'
  )),

  -- GREEK-SPECIFIC
  protein_type TEXT NOT NULL CHECK (protein_type IN (
    'lamb',
    'pork',
    'beef',
    'chicken',
    'seafood',
    'mixed',
    'vegetarian',
    'none'
  )),

  cooking_method TEXT NOT NULL CHECK (cooking_method IN (
    'grilled',
    'baked',
    'fried',
    'braised',
    'stewed',
    'raw',
    'roasted',
    'steamed'
  )),

  is_meze BOOLEAN NOT NULL DEFAULT false,
  is_festive BOOLEAN NOT NULL DEFAULT false,
  is_street_food BOOLEAN NOT NULL DEFAULT false,
  has_phyllo BOOLEAN NOT NULL DEFAULT false,

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
CREATE INDEX IF NOT EXISTS idx_greek_category ON greek(category);
CREATE INDEX IF NOT EXISTS idx_greek_status ON greek(status);
CREATE INDEX IF NOT EXISTS idx_greek_region ON greek(region);
CREATE INDEX IF NOT EXISTS idx_greek_protein_type ON greek(protein_type);
CREATE INDEX IF NOT EXISTS idx_greek_is_meze ON greek(is_meze);
CREATE INDEX IF NOT EXISTS idx_greek_is_vegetarian ON greek(is_vegetarian);
CREATE INDEX IF NOT EXISTS idx_greek_is_vegan ON greek(is_vegan);
CREATE INDEX IF NOT EXISTS idx_greek_has_phyllo ON greek(has_phyllo);
CREATE INDEX IF NOT EXISTS idx_greek_popularity ON greek(popularity DESC);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_greek_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS greek_updated_at ON greek;
CREATE TRIGGER greek_updated_at
  BEFORE UPDATE ON greek
  FOR EACH ROW
  EXECUTE FUNCTION update_greek_updated_at();

-- Enable RLS
ALTER TABLE greek ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "greek_public_read" ON greek;
CREATE POLICY "greek_public_read" ON greek
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "greek_service_write" ON greek;
CREATE POLICY "greek_service_write" ON greek
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- Schema created successfully
-- Next: Run 01-greek-missing-ingredients.sql
-- Then: Run 02-greek-data.sql
-- Finally: Run 03-greek-product-ingredients.sql
-- ============================================
