-- ============================================
-- GUDBRO Mexican Schema
-- Version: 1.0 - TEXT + CHECK (no ENUM)
-- Aligned to DATABASE-STANDARDS v1.1
-- ============================================

-- Drop existing table if exists (for fresh import)
DROP TABLE IF EXISTS mexican CASCADE;

-- Create table
CREATE TABLE mexican (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- INFO BASE (English only)
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  spanish_name TEXT,

  -- CLASSIFICATION - TEXT + CHECK (not ENUM!)
  category TEXT NOT NULL
    CHECK (category IN ('tacos', 'burritos', 'enchiladas', 'antojitos', 'main_dishes', 'sides_salsas')),

  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional')),

  -- MEXICAN-SPECIFIC FIELDS
  region TEXT NOT NULL DEFAULT 'central'
    CHECK (region IN ('northern', 'central', 'yucatan', 'oaxaca', 'coastal', 'western', 'tex_mex', 'international')),

  protein_type TEXT NOT NULL DEFAULT 'mixed'
    CHECK (protein_type IN ('beef', 'pork', 'chicken', 'fish', 'shrimp', 'chorizo', 'goat', 'cheese', 'beans', 'vegetarian', 'mixed')),

  tortilla_type TEXT NOT NULL DEFAULT 'corn'
    CHECK (tortilla_type IN ('corn', 'flour', 'none')),

  is_street_food BOOLEAN NOT NULL DEFAULT false,
  cooking_method TEXT,
  heat_source TEXT,

  -- INGREDIENTI
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - ALLERGENI
  allergens TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - DIETARY FLAGS
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_dairy_free BOOLEAN NOT NULL DEFAULT false,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_halal BOOLEAN NOT NULL DEFAULT false,
  is_kosher BOOLEAN NOT NULL DEFAULT false,

  -- SISTEMA 5 DIMENSIONI - NUTRITION
  calories_per_serving INTEGER,
  protein_g DECIMAL(5,1),
  carbs_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),

  -- SISTEMA 5 DIMENSIONI - SPICE
  spice_level INTEGER NOT NULL DEFAULT 0
    CHECK (spice_level >= 0 AND spice_level <= 5),

  -- METADATA
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50
    CHECK (popularity >= 0 AND popularity <= 100),

  -- TIMESTAMPS
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_mexican_category ON mexican(category);
CREATE INDEX IF NOT EXISTS idx_mexican_region ON mexican(region);
CREATE INDEX IF NOT EXISTS idx_mexican_protein ON mexican(protein_type);
CREATE INDEX IF NOT EXISTS idx_mexican_popularity ON mexican(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_mexican_tags ON mexican USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_mexican_ingredient_ids ON mexican USING GIN(ingredient_ids);
CREATE INDEX IF NOT EXISTS idx_mexican_allergens ON mexican USING GIN(allergens);

-- Partial indexes for common filters
CREATE INDEX IF NOT EXISTS idx_mexican_vegan ON mexican(is_vegan) WHERE is_vegan = true;
CREATE INDEX IF NOT EXISTS idx_mexican_vegetarian ON mexican(is_vegetarian) WHERE is_vegetarian = true;
CREATE INDEX IF NOT EXISTS idx_mexican_gluten_free ON mexican(is_gluten_free) WHERE is_gluten_free = true;
CREATE INDEX IF NOT EXISTS idx_mexican_street_food ON mexican(is_street_food) WHERE is_street_food = true;

-- RLS (Row Level Security)
ALTER TABLE mexican ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access" ON mexican;
CREATE POLICY "Public read access" ON mexican
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON mexican;
CREATE POLICY "Service write access" ON mexican
  FOR ALL USING (auth.role() = 'service_role');

-- TRIGGER updated_at
CREATE OR REPLACE FUNCTION update_mexican_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mexican_updated_at ON mexican;
CREATE TRIGGER mexican_updated_at
  BEFORE UPDATE ON mexican
  FOR EACH ROW
  EXECUTE FUNCTION update_mexican_updated_at();

-- COMMENT
COMMENT ON TABLE mexican IS 'GUDBRO Mexican cuisine catalog - 66 dishes, DATABASE-STANDARDS v1.1, Sistema 5 Dimensioni compliant';
