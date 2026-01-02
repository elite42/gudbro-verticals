-- ============================================
-- GUDBRO Seafood Schema
-- Version: 1.0 - TEXT + CHECK (no ENUM)
-- Aligned to DATABASE-STANDARDS v1.1
-- ============================================

CREATE TABLE IF NOT EXISTS seafood (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- INFO BASE (English only - translations in separate table)
  name TEXT NOT NULL,
  description TEXT NOT NULL,

  -- CLASSIFICATION - TEXT + CHECK (not ENUM!)
  category TEXT NOT NULL
    CHECK (category IN ('fish', 'shellfish', 'crustaceans', 'raw_bar', 'mixed_seafood')),

  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional')),

  style TEXT NOT NULL
    CHECK (style IN (
      'mediterranean', 'italian', 'french', 'spanish', 'portuguese', 'greek',
      'american', 'cajun', 'japanese', 'thai', 'vietnamese', 'korean', 'chinese',
      'mexican', 'peruvian', 'caribbean', 'british', 'scandinavian', 'indian', 'international'
    )),

  -- SEAFOOD SPECIFIC
  seafood_type TEXT NOT NULL
    CHECK (seafood_type IN (
      'salmon', 'tuna', 'cod', 'sea_bass', 'branzino', 'halibut', 'swordfish',
      'mahi_mahi', 'snapper', 'trout', 'sole', 'flounder', 'sardines', 'mackerel',
      'anchovy', 'monkfish', 'clams', 'mussels', 'oysters', 'scallops', 'squid',
      'octopus', 'shrimp', 'lobster', 'crab', 'crawfish', 'langoustine', 'mixed_seafood'
    )),

  cooking_method TEXT NOT NULL
    CHECK (cooking_method IN (
      'grilled', 'pan_seared', 'baked', 'fried', 'deep_fried', 'steamed',
      'poached', 'roasted', 'smoked', 'raw', 'cured', 'braised', 'stewed', 'blackened'
    )),

  is_sustainable BOOLEAN DEFAULT NULL,
  is_wild_caught BOOLEAN DEFAULT NULL,

  -- ORIGIN
  origin_country TEXT,
  origin_region TEXT,

  -- SERVING
  serves INTEGER DEFAULT 1,
  recommended_sides TEXT[] NOT NULL DEFAULT '{}',
  wine_pairing TEXT[] NOT NULL DEFAULT '{}',

  -- INGREDIENTS
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - Allergens
  allergens TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - Dietary (seafood is never vegan/vegetarian)
  is_gluten_free BOOLEAN NOT NULL DEFAULT true,
  is_dairy_free BOOLEAN NOT NULL DEFAULT true,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_halal BOOLEAN NOT NULL DEFAULT true,
  is_kosher BOOLEAN NOT NULL DEFAULT false,

  -- SISTEMA 5 DIMENSIONI - Nutrition
  calories_per_serving INTEGER,
  protein_g DECIMAL(5,1),
  carbs_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),
  omega3_mg INTEGER,

  -- SISTEMA 5 DIMENSIONI - Spice
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

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_seafood_category ON seafood(category);
CREATE INDEX IF NOT EXISTS idx_seafood_style ON seafood(style);
CREATE INDEX IF NOT EXISTS idx_seafood_seafood_type ON seafood(seafood_type);
CREATE INDEX IF NOT EXISTS idx_seafood_cooking_method ON seafood(cooking_method);
CREATE INDEX IF NOT EXISTS idx_seafood_popularity ON seafood(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_seafood_tags ON seafood USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_seafood_ingredient_ids ON seafood USING GIN(ingredient_ids);
CREATE INDEX IF NOT EXISTS idx_seafood_allergens ON seafood USING GIN(allergens);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE seafood ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON seafood
  FOR SELECT USING (true);

CREATE POLICY "Service write access" ON seafood
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- TRIGGER: updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_seafood_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER seafood_updated_at
  BEFORE UPDATE ON seafood
  FOR EACH ROW
  EXECUTE FUNCTION update_seafood_updated_at();

-- ============================================
-- COMMENT
-- ============================================
COMMENT ON TABLE seafood IS 'GUDBRO Seafood catalog - DATABASE-STANDARDS v1.1';
