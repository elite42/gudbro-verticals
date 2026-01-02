-- ============================================================================
-- BEERS DATABASE TABLE
-- ============================================================================
--
-- Creates the beers table for storing comprehensive beer information
-- Similar structure to cocktails table with beer-specific fields
--
-- Usage:
--   1. Open Supabase Dashboard > SQL Editor
--   2. Copy and paste this file
--   3. Click "Run" to create the table
--
-- @version 1.0
-- @lastUpdated 2025-12-14
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing table if needed (comment out in production)
-- DROP TABLE IF EXISTS beers;

-- ============================================================================
-- CREATE BEERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS beers (
  -- ─────────────────────────────────────────────────────────────────────────
  -- IDENTIFIERS
  -- ─────────────────────────────────────────────────────────────────────────

  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  stable_key VARCHAR(255) NOT NULL,
  name JSONB NOT NULL,  -- MultiLangText: {"en": "...", "it": "...", "vi": "..."}

  -- ─────────────────────────────────────────────────────────────────────────
  -- CLASSIFICATION
  -- ─────────────────────────────────────────────────────────────────────────

  status VARCHAR(50) NOT NULL DEFAULT 'international_classic',
    -- 'international_classic', 'craft', 'trappist', 'regional_classic', 'specialty', 'local'
  style_category VARCHAR(50) NOT NULL,
    -- 'lager', 'ale', 'wheat', 'stout_porter', 'belgian', 'specialty', 'hybrid'
  style VARCHAR(100) NOT NULL,
    -- Specific style: 'pilsner', 'ipa', 'stout', etc.
  tags TEXT[] DEFAULT '{}',

  -- ─────────────────────────────────────────────────────────────────────────
  -- ORIGIN & BREWERY
  -- ─────────────────────────────────────────────────────────────────────────

  origin_country VARCHAR(100) NOT NULL,
  origin_country_code VARCHAR(3),
  origin_region VARCHAR(100),
  origin_city VARCHAR(100),
  brewery JSONB NOT NULL,  -- MultiLangText
  brewery_founded INTEGER,
  brewery_type VARCHAR(50),
    -- 'macro', 'regional', 'craft', 'micro', 'brewpub', 'contract', 'trappist', 'abbey'
  is_trappist BOOLEAN DEFAULT FALSE,

  -- ─────────────────────────────────────────────────────────────────────────
  -- HISTORY
  -- ─────────────────────────────────────────────────────────────────────────

  first_brewed VARCHAR(50),  -- Can be year or "circa 1800s"
  history_story JSONB,  -- MultiLangText
  history_awards TEXT[],
  history_named_after JSONB,  -- MultiLangText
  history_significance JSONB,  -- MultiLangText

  -- ─────────────────────────────────────────────────────────────────────────
  -- DESCRIPTION
  -- ─────────────────────────────────────────────────────────────────────────

  description JSONB NOT NULL,  -- MultiLangText
  tagline JSONB,  -- MultiLangText

  -- ─────────────────────────────────────────────────────────────────────────
  -- CHARACTERISTICS
  -- ─────────────────────────────────────────────────────────────────────────

  abv DECIMAL(4,2) NOT NULL,  -- Alcohol by volume (e.g., 5.00 for 5%)
  abv_min DECIMAL(4,2),
  abv_max DECIMAL(4,2),
  ibu INTEGER,  -- International Bitterness Units
  ibu_min INTEGER,
  ibu_max INTEGER,
  srm INTEGER,  -- Standard Reference Method (color)
  og DECIMAL(5,3),  -- Original gravity
  fg DECIMAL(5,3),  -- Final gravity
  color VARCHAR(50) NOT NULL,
    -- 'straw', 'pale', 'gold', 'amber', 'deep_amber', 'copper', 'brown', 'dark_brown', 'black'
  clarity VARCHAR(50),
    -- 'brilliant', 'clear', 'slightly_hazy', 'hazy', 'opaque'
  carbonation VARCHAR(50),
    -- 'still', 'low', 'medium', 'high', 'very_high'
  body VARCHAR(50),
    -- 'light', 'medium_light', 'medium', 'medium_full', 'full'
  fermentation VARCHAR(50),
    -- 'top_fermented', 'bottom_fermented', 'spontaneous', 'mixed'

  -- ─────────────────────────────────────────────────────────────────────────
  -- TASTE
  -- ─────────────────────────────────────────────────────────────────────────

  flavor_profile TEXT[] DEFAULT '{}',
  taste_description JSONB,  -- MultiLangText
  taste_aroma JSONB,  -- MultiLangText
  taste_first_impression JSONB,  -- MultiLangText
  taste_finish JSONB,  -- MultiLangText
  taste_balance JSONB,  -- MultiLangText
  bitterness_level INTEGER CHECK (bitterness_level >= 1 AND bitterness_level <= 5),
  sweetness_level INTEGER CHECK (sweetness_level >= 1 AND sweetness_level <= 5),

  -- ─────────────────────────────────────────────────────────────────────────
  -- INGREDIENTS
  -- ─────────────────────────────────────────────────────────────────────────

  ingredients_malts TEXT[],
  ingredients_hops TEXT[],
  ingredients_yeast VARCHAR(255),
  ingredients_adjuncts TEXT[],
  ingredients_water VARCHAR(255),
  ingredients_special TEXT[],

  -- ─────────────────────────────────────────────────────────────────────────
  -- SERVING
  -- ─────────────────────────────────────────────────────────────────────────

  serving_glass VARCHAR(50) NOT NULL,
    -- 'pint', 'pilsner', 'weizen', 'tulip', 'goblet', 'snifter', 'mug', 'flute', etc.
  serving_temperature VARCHAR(50) NOT NULL,
    -- 'very_cold', 'cold', 'cool', 'cellar', 'warm'
  serving_temp_min INTEGER,  -- Celsius
  serving_temp_max INTEGER,  -- Celsius
  serving_pouring_notes JSONB,  -- MultiLangText
  serving_head_retention BOOLEAN DEFAULT TRUE,
  serving_ideal_head VARCHAR(50),

  -- ─────────────────────────────────────────────────────────────────────────
  -- PAIRING
  -- ─────────────────────────────────────────────────────────────────────────

  pairing_food_categories TEXT[],
  pairing_food JSONB,  -- MultiLangText
  pairing_cheese TEXT[],
  pairing_cuisine TEXT[],
  pairing_avoid JSONB,  -- MultiLangText

  -- ─────────────────────────────────────────────────────────────────────────
  -- DIETARY & TAGS
  -- ─────────────────────────────────────────────────────────────────────────

  season_tags TEXT[] DEFAULT '{}',
  occasion_tags TEXT[] DEFAULT '{}',
  is_gluten_free BOOLEAN DEFAULT FALSE,
  is_non_alcoholic BOOLEAN DEFAULT FALSE,
  is_organic BOOLEAN DEFAULT FALSE,
  is_vegan BOOLEAN DEFAULT TRUE,  -- Most beers are vegan by default

  -- ─────────────────────────────────────────────────────────────────────────
  -- FORMATS & AVAILABILITY
  -- ─────────────────────────────────────────────────────────────────────────

  available_formats TEXT[] DEFAULT '{"bottle"}',
    -- 'draft', 'bottle', 'can', 'keg', 'cask'
  available_sizes INTEGER[],  -- ml values
  related_beers TEXT[],  -- slugs of related beers
  availability VARCHAR(50) DEFAULT 'year_round',
    -- 'year_round', 'seasonal', 'limited', 'rare'

  -- ─────────────────────────────────────────────────────────────────────────
  -- BUSINESS
  -- ─────────────────────────────────────────────────────────────────────────

  price_tier VARCHAR(50) DEFAULT 'mid',
    -- 'budget', 'value', 'mid', 'premium', 'craft', 'luxury'
  popularity INTEGER CHECK (popularity >= 1 AND popularity <= 100),

  -- ─────────────────────────────────────────────────────────────────────────
  -- SOURCES
  -- ─────────────────────────────────────────────────────────────────────────

  source_url VARCHAR(500),
  source_note TEXT,

  -- ─────────────────────────────────────────────────────────────────────────
  -- METADATA
  -- ─────────────────────────────────────────────────────────────────────────

  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_beers_slug ON beers(slug);
CREATE INDEX IF NOT EXISTS idx_beers_style_category ON beers(style_category);
CREATE INDEX IF NOT EXISTS idx_beers_style ON beers(style);
CREATE INDEX IF NOT EXISTS idx_beers_status ON beers(status);
CREATE INDEX IF NOT EXISTS idx_beers_origin_country ON beers(origin_country);
CREATE INDEX IF NOT EXISTS idx_beers_abv ON beers(abv);
CREATE INDEX IF NOT EXISTS idx_beers_price_tier ON beers(price_tier);
CREATE INDEX IF NOT EXISTS idx_beers_tags ON beers USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_beers_flavor_profile ON beers USING GIN(flavor_profile);
CREATE INDEX IF NOT EXISTS idx_beers_is_trappist ON beers(is_trappist) WHERE is_trappist = TRUE;
CREATE INDEX IF NOT EXISTS idx_beers_is_gluten_free ON beers(is_gluten_free) WHERE is_gluten_free = TRUE;
CREATE INDEX IF NOT EXISTS idx_beers_is_non_alcoholic ON beers(is_non_alcoholic) WHERE is_non_alcoholic = TRUE;

-- ============================================================================
-- UPDATED_AT TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION update_beers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_beers_updated_at ON beers;
CREATE TRIGGER trigger_beers_updated_at
  BEFORE UPDATE ON beers
  FOR EACH ROW
  EXECUTE FUNCTION update_beers_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (Optional - Enable if needed)
-- ============================================================================

-- ALTER TABLE beers ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Beers are viewable by everyone" ON beers FOR SELECT USING (true);

-- ============================================================================
-- VERIFY
-- ============================================================================

SELECT 'Beers table created successfully!' AS status;
