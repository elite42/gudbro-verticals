-- ============================================
-- SPIRITS TABLE SCHEMA
-- ============================================
-- DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
-- Categories: whisky, gin, rum, vodka, tequila_mezcal, brandy_cognac, amari_liqueurs, other
-- ============================================

-- Create spirits table
CREATE TABLE IF NOT EXISTS spirits (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,                    -- SPI_{NAME} format
  slug TEXT NOT NULL UNIQUE,              -- lowercase-hyphens for URLs

  -- BASE INFO (English only)
  name TEXT NOT NULL,                     -- Commercial name
  brand TEXT NOT NULL,                    -- Brand/Distillery name
  description TEXT NOT NULL,              -- Detailed description

  -- CLASSIFICATION
  category TEXT NOT NULL CHECK (category IN (
    'whisky', 'gin', 'rum', 'vodka',
    'tequila_mezcal', 'brandy_cognac',
    'amari_liqueurs', 'other'
  )),
  subcategory TEXT NOT NULL CHECK (subcategory IN (
    -- Whisky
    'scotch_single_malt', 'scotch_blended', 'bourbon', 'tennessee',
    'rye', 'irish', 'japanese', 'canadian', 'world_whisky',
    -- Gin
    'london_dry', 'old_tom', 'navy_strength', 'contemporary',
    'genever', 'sloe_gin',
    -- Rum
    'white_rum', 'gold_rum', 'dark_rum', 'spiced_rum',
    'agricole', 'cachaca', 'overproof',
    -- Vodka
    'neutral_vodka', 'flavored_vodka', 'potato_vodka', 'grape_vodka',
    -- Tequila & Mezcal
    'tequila_blanco', 'tequila_reposado', 'tequila_anejo',
    'tequila_extra_anejo', 'mezcal_joven', 'mezcal_reposado', 'mezcal_anejo',
    -- Brandy & Cognac
    'cognac_vs', 'cognac_vsop', 'cognac_xo', 'armagnac',
    'calvados', 'grappa', 'pisco', 'brandy_generic',
    -- Amari & Liqueurs
    'amaro_bitter', 'amaro_alpine', 'amaro_citrus', 'amaro_fernet',
    'liqueur_herbal', 'liqueur_cream', 'liqueur_fruit', 'liqueur_nut',
    'liqueur_coffee', 'liqueur_anise',
    -- Other
    'absinthe', 'aquavit', 'soju', 'baijiu', 'other_spirit'
  )),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'classic', 'popular', 'premium',
    'ultra_premium', 'limited_edition', 'vintage', 'craft'
  )),

  -- ORIGIN
  country TEXT NOT NULL,                  -- Country of origin
  region TEXT NOT NULL CHECK (region IN (
    -- Whisky regions
    'scotland_speyside', 'scotland_highland', 'scotland_islay',
    'scotland_lowland', 'scotland_campbeltown', 'ireland',
    'usa_kentucky', 'usa_tennessee', 'japan', 'canada', 'taiwan', 'india',
    -- Gin regions
    'england', 'spain', 'germany', 'netherlands',
    -- Rum regions
    'caribbean', 'jamaica', 'cuba', 'puerto_rico', 'barbados',
    'martinique', 'guyana', 'brazil',
    -- Tequila regions
    'mexico_jalisco', 'mexico_oaxaca',
    -- Brandy regions
    'france_cognac', 'france_armagnac', 'france_normandy',
    'italy_veneto', 'italy_piedmont', 'peru', 'chile',
    -- Other
    'italy', 'france', 'russia', 'poland', 'sweden',
    'korea', 'china', 'international'
  )),
  distillery TEXT,                        -- Distillery name (optional)

  -- PRODUCT DETAILS
  abv DECIMAL NOT NULL CHECK (abv >= 0 AND abv <= 100),  -- Alcohol by volume
  age_years INTEGER CHECK (age_years >= 0),              -- Age in years (optional)
  age_statement TEXT,                     -- e.g., "12 Years", "No Age Statement"
  volume_ml INTEGER NOT NULL DEFAULT 700, -- Standard volume

  -- PRODUCTION
  base_ingredient TEXT NOT NULL,          -- e.g., "malted barley", "sugarcane"
  production_method TEXT,                 -- e.g., "pot still", "column still"
  cask_type TEXT,                         -- e.g., "ex-bourbon", "sherry"

  -- TASTING NOTES
  flavor_profiles TEXT[] NOT NULL DEFAULT '{}',  -- Array of flavor profiles
  tasting_notes TEXT,                     -- Tasting notes description
  color TEXT,                             -- e.g., "golden", "amber"
  nose TEXT,                              -- Aroma description
  palate TEXT,                            -- Taste description
  finish TEXT,                            -- Finish description

  -- SERVING
  serving_suggestions TEXT[] NOT NULL DEFAULT '{}',  -- e.g., ["neat", "on the rocks"]
  cocktail_uses TEXT[] DEFAULT '{}',      -- Cocktails where used
  food_pairings TEXT[] DEFAULT '{}',      -- Food pairings
  optimal_temperature TEXT,               -- e.g., "room temperature"

  -- DIETARY & SAFETY
  allergens TEXT[] NOT NULL DEFAULT '{}', -- Allergen list
  is_gluten_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT true,
  is_organic BOOLEAN NOT NULL DEFAULT false,
  is_kosher BOOLEAN NOT NULL DEFAULT false,

  -- PRICE TIER
  price_tier TEXT NOT NULL DEFAULT 'standard' CHECK (price_tier IN (
    'budget', 'standard', 'premium', 'ultra_premium', 'luxury'
  )),

  -- METADATA
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  awards TEXT[] DEFAULT '{}',             -- Awards and recognitions
  year_established INTEGER,               -- Year distillery/brand was founded

  -- INGREDIENTS (for liqueurs)
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',  -- ING_* references

  -- TIMESTAMPS
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_spirits_category ON spirits(category);
CREATE INDEX IF NOT EXISTS idx_spirits_subcategory ON spirits(subcategory);
CREATE INDEX IF NOT EXISTS idx_spirits_region ON spirits(region);
CREATE INDEX IF NOT EXISTS idx_spirits_brand ON spirits(brand);
CREATE INDEX IF NOT EXISTS idx_spirits_price_tier ON spirits(price_tier);
CREATE INDEX IF NOT EXISTS idx_spirits_popularity ON spirits(popularity DESC);

-- Enable RLS
ALTER TABLE spirits ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access for spirits"
  ON spirits FOR SELECT
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_spirits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER spirits_updated_at
  BEFORE UPDATE ON spirits
  FOR EACH ROW
  EXECUTE FUNCTION update_spirits_updated_at();

-- Comment on table
COMMENT ON TABLE spirits IS 'Spirits database including whisky, gin, rum, amari, liqueurs, and more. v1.0';
