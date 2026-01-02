-- ============================================================================
-- GUDBRO Cocktails Table
--
-- Run this in Supabase SQL Editor to create the cocktails table.
-- ============================================================================

-- Drop existing table if needed (be careful in production!)
-- DROP TABLE IF EXISTS cocktails;

CREATE TABLE IF NOT EXISTS cocktails (
  -- Identifiers
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  stable_key TEXT NOT NULL,
  name JSONB NOT NULL, -- MultiLangText: { en, it, vi, ko, ja }

  -- Classification
  status TEXT NOT NULL CHECK (status IN ('iba_official', 'famous')),
  iba_category TEXT CHECK (iba_category IN ('Unforgettables', 'Contemporary', 'NewEraDrinks')),
  tags TEXT[] DEFAULT '{}',

  -- Description & History
  description JSONB NOT NULL, -- MultiLangText
  history JSONB, -- CocktailHistory object
  taste JSONB, -- CocktailTaste object
  recommendations JSONB, -- CocktailRecommendations object

  -- Recipe
  ingredients JSONB NOT NULL, -- CocktailIngredient[]
  method TEXT NOT NULL,
  instructions JSONB NOT NULL, -- MultiLangText
  glass TEXT NOT NULL,
  garnish JSONB NOT NULL, -- MultiLangText
  ice TEXT NOT NULL,
  serving_style TEXT NOT NULL,

  -- Characteristics
  base_spirits TEXT[] DEFAULT '{}',
  flavor_profile TEXT[] DEFAULT '{}',
  abv_estimate INTEGER,
  calories_estimate INTEGER,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  prep_time_seconds INTEGER,

  -- Auto-computed (from ingredients)
  computed_allergens TEXT[] DEFAULT '{}',
  computed_intolerances TEXT[] DEFAULT '{}',
  computed_diets TEXT[] DEFAULT '{}',
  computed_spice_level INTEGER DEFAULT 0,

  -- Dietary & Tags
  diet_tags TEXT[] DEFAULT '{}',
  season_tags TEXT[] DEFAULT '{}',
  occasion_tags TEXT[] DEFAULT '{}',
  is_mocktail BOOLEAN DEFAULT FALSE,
  is_signature BOOLEAN DEFAULT FALSE,

  -- Variants & Notes
  variants TEXT[] DEFAULT '{}',
  notes_for_staff TEXT,

  -- Business
  price_tier TEXT CHECK (price_tier IN ('low', 'mid', 'high', 'premium')),
  popularity INTEGER CHECK (popularity >= 0 AND popularity <= 100),

  -- Sources
  source_url TEXT,
  source_note TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  version INTEGER DEFAULT 1
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_cocktails_slug ON cocktails(slug);
CREATE INDEX IF NOT EXISTS idx_cocktails_status ON cocktails(status);
CREATE INDEX IF NOT EXISTS idx_cocktails_iba_category ON cocktails(iba_category);
CREATE INDEX IF NOT EXISTS idx_cocktails_popularity ON cocktails(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_cocktails_base_spirits ON cocktails USING GIN(base_spirits);
CREATE INDEX IF NOT EXISTS idx_cocktails_flavor_profile ON cocktails USING GIN(flavor_profile);
CREATE INDEX IF NOT EXISTS idx_cocktails_tags ON cocktails USING GIN(tags);

-- Full-text search on name
CREATE INDEX IF NOT EXISTS idx_cocktails_name_en ON cocktails((name->>'en'));

-- RLS Policies
ALTER TABLE cocktails ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Cocktails are viewable by everyone"
  ON cocktails FOR SELECT
  USING (true);

-- Only service role can insert/update/delete
CREATE POLICY "Cocktails are editable by service role only"
  ON cocktails FOR ALL
  USING (auth.role() = 'service_role');

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_cocktails_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cocktails_updated_at
  BEFORE UPDATE ON cocktails
  FOR EACH ROW
  EXECUTE FUNCTION update_cocktails_updated_at();

-- Comments
COMMENT ON TABLE cocktails IS 'GUDBRO Cocktail Database - 222 cocktails (102 IBA + 120 Famous)';
COMMENT ON COLUMN cocktails.name IS 'Multi-language name: { en, it, vi, ko, ja }';
COMMENT ON COLUMN cocktails.history IS 'Rich historical metadata: origin, creator, story';
COMMENT ON COLUMN cocktails.taste IS 'Taste profile: description, first_impression, finish, balance';
COMMENT ON COLUMN cocktails.recommendations IS 'When/how to enjoy: best_time, occasions, food_pairings';
