-- GUDBRO Appetizers Database Schema
-- Sistema 5 Dimensioni v3.0 integrated

-- Create ENUM types for appetizers
DO $$ BEGIN
  CREATE TYPE appetizer_style AS ENUM (
    'italian', 'spanish', 'greek', 'middle_eastern',
    'asian', 'french', 'american', 'mexican',
    'international', 'fusion'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE appetizer_status AS ENUM (
    'classic', 'traditional', 'modern', 'signature', 'seasonal', 'active'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE appetizer_category AS ENUM (
    'bruschetta', 'crostini', 'fritti', 'carpaccio', 'tartare',
    'affettati', 'formaggi', 'verdure', 'mare', 'tapas',
    'mezze', 'dips', 'skewers', 'rolls', 'bites', 'other'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE serving_temperature AS ENUM (
    'hot', 'warm', 'room_temp', 'cold', 'frozen'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create appetizers table
CREATE TABLE IF NOT EXISTS appetizers (
  -- Primary fields
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL,
  description JSONB NOT NULL,
  tagline JSONB,

  -- Classification
  style appetizer_style NOT NULL,
  status appetizer_status NOT NULL DEFAULT 'active',
  category appetizer_category NOT NULL,
  serving_temp serving_temperature NOT NULL,

  -- Ingredients & Preparation
  main_ingredients TEXT[] NOT NULL,
  sauce_or_dip TEXT,
  is_fried BOOLEAN DEFAULT false,
  is_baked BOOLEAN DEFAULT false,
  is_raw BOOLEAN DEFAULT false,
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- Origin
  origin JSONB NOT NULL,
  history JSONB,

  -- Serving
  serving JSONB NOT NULL,

  -- Sistema 5 Dimensioni - Dietary & Nutrition
  dietary JSONB NOT NULL,

  -- Preparation
  preparation JSONB,

  -- Additional
  variations JSONB,
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  related_appetizers TEXT[],
  media JSONB,
  pricing JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_appetizers_style ON appetizers(style);
CREATE INDEX IF NOT EXISTS idx_appetizers_category ON appetizers(category);
CREATE INDEX IF NOT EXISTS idx_appetizers_status ON appetizers(status);
CREATE INDEX IF NOT EXISTS idx_appetizers_serving_temp ON appetizers(serving_temp);
CREATE INDEX IF NOT EXISTS idx_appetizers_spice_level ON appetizers(spice_level);
CREATE INDEX IF NOT EXISTS idx_appetizers_popularity ON appetizers(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_appetizers_tags ON appetizers USING GIN(tags);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_appetizers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_appetizers_updated_at ON appetizers;
CREATE TRIGGER trigger_appetizers_updated_at
  BEFORE UPDATE ON appetizers
  FOR EACH ROW
  EXECUTE FUNCTION update_appetizers_updated_at();

-- Enable RLS
ALTER TABLE appetizers ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Public read access for appetizers" ON appetizers;
CREATE POLICY "Public read access for appetizers"
  ON appetizers FOR SELECT
  USING (true);

-- Comments
COMMENT ON TABLE appetizers IS 'GUDBRO Appetizers database with Sistema 5 Dimensioni';
COMMENT ON COLUMN appetizers.name IS 'Multi-language name: { en, it, vi }';
COMMENT ON COLUMN appetizers.description IS 'Multi-language description: { en, it, vi }';
COMMENT ON COLUMN appetizers.dietary IS 'Sistema 5 Dimensioni dietary info';
