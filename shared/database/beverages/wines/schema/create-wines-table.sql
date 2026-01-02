-- =====================================================
-- GUDBRO Wines Database Schema
-- Created: 2025-12-16
-- Architecture: English only, translations separate
-- Sistema 5 Dimensioni integrated
-- =====================================================

-- Wine color enum
DO $$ BEGIN
  CREATE TYPE wine_color AS ENUM (
    'red', 'white', 'rosé', 'orange', 'sparkling', 'dessert', 'fortified'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Wine style enum
DO $$ BEGIN
  CREATE TYPE wine_style AS ENUM (
    'dry', 'off_dry', 'semi_sweet', 'sweet',
    'sparkling_brut', 'sparkling_extra_brut', 'sparkling_sec',
    'fortified_dry', 'fortified_sweet'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Wine body enum
DO $$ BEGIN
  CREATE TYPE wine_body AS ENUM (
    'light', 'medium_light', 'medium', 'medium_full', 'full'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Wine status enum
DO $$ BEGIN
  CREATE TYPE wine_status AS ENUM (
    'classic', 'premium', 'reserve', 'grand_cru', 'everyday', 'organic', 'natural'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Acidity level enum
DO $$ BEGIN
  CREATE TYPE acidity_level AS ENUM (
    'low', 'medium_low', 'medium', 'medium_high', 'high'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Tannin level enum
DO $$ BEGIN
  CREATE TYPE tannin_level AS ENUM (
    'none', 'low', 'medium', 'high', 'very_high'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Sweetness level enum
DO $$ BEGIN
  CREATE TYPE sweetness_level AS ENUM (
    'bone_dry', 'dry', 'off_dry', 'medium_sweet', 'sweet', 'very_sweet'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Oak level enum
DO $$ BEGIN
  CREATE TYPE oak_level AS ENUM (
    'none', 'light', 'medium', 'heavy'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Finish length enum
DO $$ BEGIN
  CREATE TYPE finish_length AS ENUM (
    'short', 'medium', 'long', 'very_long'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Vintage type enum
DO $$ BEGIN
  CREATE TYPE vintage_type AS ENUM (
    'vintage', 'non_vintage', 'multi_vintage'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Price tier enum (reuse if exists)
DO $$ BEGIN
  CREATE TYPE price_tier AS ENUM (
    'budget', 'value', 'mid', 'premium', 'luxury'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =====================================================
-- WINES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS wines (
  -- Primary identification
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,

  -- Classification
  color wine_color NOT NULL,
  style wine_style NOT NULL,
  status wine_status NOT NULL DEFAULT 'classic',
  grape_varieties TEXT[] NOT NULL DEFAULT '{}',
  is_blend BOOLEAN NOT NULL DEFAULT false,
  vintage_type vintage_type NOT NULL DEFAULT 'vintage',

  -- Origin
  origin_country TEXT NOT NULL,
  origin_country_code CHAR(2) NOT NULL,
  origin_region TEXT NOT NULL,
  origin_subregion TEXT,
  origin_appellation TEXT,
  origin_classification TEXT,

  -- Characteristics
  abv_min DECIMAL(4,1) NOT NULL,
  abv_max DECIMAL(4,1) NOT NULL,
  acidity acidity_level NOT NULL,
  tannins tannin_level,
  sweetness sweetness_level NOT NULL,
  body wine_body NOT NULL,
  oak oak_level,

  -- Taste profile
  primary_flavors TEXT[] NOT NULL DEFAULT '{}',
  secondary_flavors TEXT[] DEFAULT '{}',
  tertiary_flavors TEXT[] DEFAULT '{}',
  aroma_profile TEXT[] NOT NULL DEFAULT '{}',
  finish finish_length NOT NULL DEFAULT 'medium',

  -- Serving
  serving_temp_min_celsius INTEGER NOT NULL,
  serving_temp_max_celsius INTEGER NOT NULL,
  glass_type TEXT NOT NULL,
  decanting_minutes INTEGER,
  aging_potential_min_years INTEGER,
  aging_potential_max_years INTEGER,

  -- Pairing
  food_categories TEXT[] NOT NULL DEFAULT '{}',
  specific_dishes TEXT[] DEFAULT '{}',
  cheese_pairings TEXT[] DEFAULT '{}',
  avoid_with TEXT[] DEFAULT '{}',

  -- Dietary & Safety (Sistema 5 Dimensioni)
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_organic BOOLEAN NOT NULL DEFAULT false,
  is_biodynamic BOOLEAN NOT NULL DEFAULT false,
  is_natural BOOLEAN NOT NULL DEFAULT false,
  is_low_sulfite BOOLEAN NOT NULL DEFAULT false,
  contains_sulfites BOOLEAN NOT NULL DEFAULT true,
  allergens TEXT[] NOT NULL DEFAULT '{sulfites}',
  calories_per_glass INTEGER NOT NULL DEFAULT 120,

  -- Ingredients (references to master table)
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

  -- Metadata
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  price_tier price_tier NOT NULL DEFAULT 'mid',

  -- Production info
  production_method TEXT,
  aging_vessel TEXT,
  aging_months INTEGER,
  annual_production_bottles INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_wines_color ON wines(color);
CREATE INDEX IF NOT EXISTS idx_wines_style ON wines(style);
CREATE INDEX IF NOT EXISTS idx_wines_status ON wines(status);
CREATE INDEX IF NOT EXISTS idx_wines_country ON wines(origin_country);
CREATE INDEX IF NOT EXISTS idx_wines_region ON wines(origin_region);
CREATE INDEX IF NOT EXISTS idx_wines_price_tier ON wines(price_tier);
CREATE INDEX IF NOT EXISTS idx_wines_popularity ON wines(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_wines_grape_varieties ON wines USING GIN(grape_varieties);
CREATE INDEX IF NOT EXISTS idx_wines_tags ON wines USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_wines_ingredient_ids ON wines USING GIN(ingredient_ids);

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE wines IS 'GUDBRO wine database with Sistema 5 Dimensioni integration';
COMMENT ON COLUMN wines.ingredient_ids IS 'References to master ingredients table (e.g., ING_GRAPE_CABERNET_SAUVIGNON)';
COMMENT ON COLUMN wines.calories_per_glass IS 'Approximate calories per 150ml glass';
COMMENT ON COLUMN wines.decanting_minutes IS 'Recommended decanting time for optimal enjoyment';
COMMENT ON COLUMN wines.aging_potential_min_years IS 'Minimum years wine can age from vintage';
COMMENT ON COLUMN wines.aging_potential_max_years IS 'Maximum years wine can age from vintage';
