-- ============================================
-- GUDBRO Steaks & Grills Database Schema
-- Version: 3.0 - TEXT + CHECK (no ENUM)
-- Aligned to DATABASE-STANDARDS v1.1
-- Created: 2025-12-18
-- ============================================

-- ====================
-- MAIN TABLE
-- ====================

CREATE TABLE IF NOT EXISTS steaks (
  -- IDENTIFICATION (Standard v1.1)
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- INFO BASE - SOLO INGLESE (Standard v1.1)
  name TEXT NOT NULL,
  description TEXT NOT NULL,

  -- CLASSIFICATION - TEXT + CHECK (Standard v1.1)
  category TEXT NOT NULL
    CHECK (category IN ('beef_steak', 'lamb_game', 'poultry_grill', 'ribs_bbq', 'international_grill')),

  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional')),

  -- STEAKS-SPECIFIC FIELDS
  style TEXT NOT NULL DEFAULT 'international'
    CHECK (style IN (
      'american', 'italian', 'french', 'argentinian', 'brazilian',
      'japanese', 'korean', 'british', 'australian', 'spanish',
      'german', 'middle_eastern', 'turkish', 'persian', 'portuguese',
      'jamaican', 'indian', 'international'
    )),

  cut TEXT,
  weight_g INTEGER,
  bone_in BOOLEAN NOT NULL DEFAULT false,

  grade TEXT
    CHECK (grade IS NULL OR grade IN (
      'wagyu_a5', 'wagyu_a4', 'usda_prime', 'usda_choice', 'usda_select',
      'grass_fed', 'grain_fed', 'organic', 'dry_aged', 'wet_aged', 'standard'
    )),

  aging_days INTEGER,

  cooking_method TEXT
    CHECK (cooking_method IS NULL OR cooking_method IN (
      'grilled', 'pan_seared', 'broiled', 'roasted', 'smoked',
      'bbq', 'sous_vide', 'reverse_sear', 'braised', 'charcoal',
      'wood_fired', 'rotisserie', 'tandoor', 'open_flame'
    )),

  recommended_doneness TEXT
    CHECK (recommended_doneness IS NULL OR recommended_doneness IN (
      'blue_rare', 'rare', 'medium_rare', 'medium', 'medium_well', 'well_done', 'varies'
    )),

  internal_temp_c INTEGER,

  -- ORIGIN
  origin_country TEXT,
  origin_region TEXT,

  -- SERVING
  serves INTEGER DEFAULT 1,
  recommended_sides TEXT[] NOT NULL DEFAULT '{}',
  wine_pairing TEXT[] NOT NULL DEFAULT '{}',

  -- INGREDIENTI (Standard v1.1)
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - ALLERGENI (Standard v1.1)
  allergens TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - DIETARY FLAGS (Standard v1.1)
  is_gluten_free BOOLEAN NOT NULL DEFAULT true,
  is_dairy_free BOOLEAN NOT NULL DEFAULT true,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_halal BOOLEAN NOT NULL DEFAULT false,
  is_kosher BOOLEAN NOT NULL DEFAULT false,

  -- SISTEMA 5 DIMENSIONI - NUTRITION (Standard v1.1)
  calories_per_serving INTEGER,
  protein_g DECIMAL(5,1),
  carbs_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),

  -- SISTEMA 5 DIMENSIONI - SPICE (Standard v1.1)
  spice_level INTEGER NOT NULL DEFAULT 0
    CHECK (spice_level >= 0 AND spice_level <= 5),

  -- METADATA (Standard v1.1)
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50
    CHECK (popularity >= 0 AND popularity <= 100),

  -- TIMESTAMPS - TIMESTAMPTZ! (Standard v1.1)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================
-- INDEXES (Standard v1.1)
-- ====================

-- Standard indexes
CREATE INDEX IF NOT EXISTS idx_steaks_category ON steaks(category);
CREATE INDEX IF NOT EXISTS idx_steaks_popularity ON steaks(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_steaks_style ON steaks(style);
CREATE INDEX IF NOT EXISTS idx_steaks_cooking_method ON steaks(cooking_method);

-- GIN indexes for arrays (OBBLIGATORI per Standard v1.1)
CREATE INDEX IF NOT EXISTS idx_steaks_tags ON steaks USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_steaks_ingredient_ids ON steaks USING GIN(ingredient_ids);
CREATE INDEX IF NOT EXISTS idx_steaks_allergens ON steaks USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_steaks_recommended_sides ON steaks USING GIN(recommended_sides);
CREATE INDEX IF NOT EXISTS idx_steaks_wine_pairing ON steaks USING GIN(wine_pairing);

-- Partial indexes for common filters
CREATE INDEX IF NOT EXISTS idx_steaks_is_halal ON steaks(is_halal) WHERE is_halal = true;
CREATE INDEX IF NOT EXISTS idx_steaks_is_gluten_free ON steaks(is_gluten_free) WHERE is_gluten_free = true;

-- ====================
-- RLS (OBBLIGATORIO per Standard v1.1)
-- ====================

ALTER TABLE steaks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for steaks" ON steaks;
CREATE POLICY "Public read access for steaks" ON steaks
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access for steaks" ON steaks;
CREATE POLICY "Service write access for steaks" ON steaks
  FOR ALL USING (auth.role() = 'service_role');

-- ====================
-- TRIGGER updated_at (Standard v1.1 - con search_path!)
-- ====================

CREATE OR REPLACE FUNCTION update_steaks_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS steaks_updated_at ON steaks;
CREATE TRIGGER steaks_updated_at
  BEFORE UPDATE ON steaks
  FOR EACH ROW
  EXECUTE FUNCTION update_steaks_updated_at();

-- ====================
-- COMMENTS
-- ====================

COMMENT ON TABLE steaks IS 'GUDBRO Steaks & Grills catalog - 55 items, Sistema 5 Dimensioni compliant, DATABASE-STANDARDS v1.1 (TEXT+CHECK)';
COMMENT ON COLUMN steaks.id IS 'Unique identifier format: STK_{NAME}';
COMMENT ON COLUMN steaks.ingredient_ids IS 'References to master ingredients table (ING_*)';
COMMENT ON COLUMN steaks.popularity IS 'Scale 0-100 (NOT 1-5!)';
COMMENT ON COLUMN steaks.spice_level IS 'Scale 0-5 based on Scoville';
