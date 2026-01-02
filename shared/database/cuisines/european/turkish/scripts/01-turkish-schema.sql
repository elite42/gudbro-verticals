-- Turkish Cuisine Database Schema
-- Database Standards v1.1 compliant (TEXT + CHECK constraints)
-- Created: 2025-12-19

-- Drop existing table if needed
DROP TABLE IF EXISTS turkish CASCADE;

-- Create Turkish table
CREATE TABLE turkish (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,

  -- Turkish naming
  turkish_name TEXT NOT NULL,

  -- Classification with CHECK constraints
  category TEXT NOT NULL CHECK (category IN (
    'kebabs',
    'pide_lahmacun',
    'mezes',
    'soups',
    'rice_pilav',
    'borek',
    'dolma_sarma',
    'seafood',
    'stews',
    'desserts'
  )),

  status TEXT NOT NULL CHECK (status IN (
    'active',
    'signature',
    'popular',
    'classic',
    'traditional',
    'regional',
    'street_food'
  )),

  region TEXT NOT NULL CHECK (region IN (
    'istanbul',
    'southeastern',
    'aegean',
    'black_sea',
    'central_anatolia',
    'mediterranean',
    'marmara',
    'eastern',
    'national'
  )),

  protein_type TEXT NOT NULL CHECK (protein_type IN (
    'lamb',
    'beef',
    'chicken',
    'mixed_meat',
    'fish',
    'seafood',
    'vegetarian',
    'vegan',
    'none'
  )),

  cooking_method TEXT NOT NULL CHECK (cooking_method IN (
    'grilled',
    'roasted',
    'fried',
    'stewed',
    'baked',
    'steamed',
    'raw',
    'braised',
    'spit_roasted'
  )),

  -- Turkish-specific flags
  is_street_food BOOLEAN NOT NULL DEFAULT FALSE,
  is_meze BOOLEAN NOT NULL DEFAULT FALSE,
  is_breakfast_item BOOLEAN NOT NULL DEFAULT FALSE,
  served_hot BOOLEAN NOT NULL DEFAULT TRUE,

  -- Sistema 5 Dimensioni
  allergens JSONB DEFAULT '[]'::jsonb,
  is_gluten_free BOOLEAN NOT NULL DEFAULT FALSE,
  is_dairy_free BOOLEAN NOT NULL DEFAULT FALSE,
  is_nut_free BOOLEAN NOT NULL DEFAULT TRUE,
  is_vegan BOOLEAN NOT NULL DEFAULT FALSE,
  is_vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
  is_halal BOOLEAN NOT NULL DEFAULT TRUE,

  -- Nutrition
  calories_per_serving INTEGER,
  protein_g INTEGER,
  carbs_g INTEGER,
  fat_g INTEGER,
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- Metadata
  tags JSONB DEFAULT '[]'::jsonb,
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_turkish_category ON turkish(category);
CREATE INDEX idx_turkish_status ON turkish(status);
CREATE INDEX idx_turkish_region ON turkish(region);
CREATE INDEX idx_turkish_protein_type ON turkish(protein_type);
CREATE INDEX idx_turkish_is_street_food ON turkish(is_street_food);
CREATE INDEX idx_turkish_is_meze ON turkish(is_meze);
CREATE INDEX idx_turkish_is_vegetarian ON turkish(is_vegetarian);
CREATE INDEX idx_turkish_is_halal ON turkish(is_halal);
CREATE INDEX idx_turkish_popularity ON turkish(popularity DESC);
CREATE INDEX idx_turkish_tags ON turkish USING GIN(tags);
CREATE INDEX idx_turkish_allergens ON turkish USING GIN(allergens);

-- Enable RLS
ALTER TABLE turkish ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for read access
CREATE POLICY "Turkish items are viewable by everyone"
  ON turkish FOR SELECT
  USING (true);

-- Add to product_taxonomy (only if not exists)
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_order)
SELECT 'turkish', 'standalone', 'food', 'second_course', 'Turkish Cuisine', 29
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'turkish');

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_turkish_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER turkish_updated_at
  BEFORE UPDATE ON turkish
  FOR EACH ROW
  EXECUTE FUNCTION update_turkish_timestamp();

-- Summary
DO $$
BEGIN
  RAISE NOTICE 'Turkish schema created successfully!';
  RAISE NOTICE 'Table: turkish';
  RAISE NOTICE 'Indexes: 11';
  RAISE NOTICE 'RLS: enabled';
END $$;
