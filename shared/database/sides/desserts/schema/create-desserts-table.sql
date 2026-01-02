-- GUDBRO Desserts Database Schema
-- Sistema 5 Dimensioni v3.0 integrated

-- Create ENUM types for desserts
DO $$ BEGIN
  CREATE TYPE dessert_style AS ENUM (
    'italian', 'french', 'american', 'asian',
    'middle_eastern', 'spanish', 'german', 'british',
    'international', 'fusion'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE dessert_status AS ENUM (
    'classic', 'traditional', 'modern', 'signature', 'seasonal', 'active'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE dessert_category AS ENUM (
    'cake', 'pie', 'tart', 'pastry', 'cookie',
    'gelato', 'sorbet', 'mousse', 'pudding', 'custard',
    'chocolate', 'fruit', 'frozen', 'fried', 'crepe', 'other'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE dessert_serving_temp AS ENUM (
    'hot', 'warm', 'room_temp', 'cold', 'frozen'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create desserts table
CREATE TABLE IF NOT EXISTS desserts (
  -- Primary fields
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL,
  description JSONB NOT NULL,
  tagline JSONB,

  -- Classification
  style dessert_style NOT NULL,
  status dessert_status NOT NULL DEFAULT 'active',
  category dessert_category NOT NULL,
  serving_temp dessert_serving_temp NOT NULL,

  -- Characteristics
  main_ingredients TEXT[] NOT NULL,
  topping TEXT,
  is_chocolate BOOLEAN DEFAULT false,
  is_fruit_based BOOLEAN DEFAULT false,
  is_creamy BOOLEAN DEFAULT false,
  sweetness_level INTEGER DEFAULT 3 CHECK (sweetness_level >= 1 AND sweetness_level <= 5),

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
  related_desserts TEXT[],
  media JSONB,
  pricing JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_desserts_style ON desserts(style);
CREATE INDEX IF NOT EXISTS idx_desserts_category ON desserts(category);
CREATE INDEX IF NOT EXISTS idx_desserts_status ON desserts(status);
CREATE INDEX IF NOT EXISTS idx_desserts_serving_temp ON desserts(serving_temp);
CREATE INDEX IF NOT EXISTS idx_desserts_sweetness ON desserts(sweetness_level);
CREATE INDEX IF NOT EXISTS idx_desserts_popularity ON desserts(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_desserts_tags ON desserts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_desserts_chocolate ON desserts(is_chocolate) WHERE is_chocolate = true;
CREATE INDEX IF NOT EXISTS idx_desserts_fruit ON desserts(is_fruit_based) WHERE is_fruit_based = true;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_desserts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_desserts_updated_at ON desserts;
CREATE TRIGGER trigger_desserts_updated_at
  BEFORE UPDATE ON desserts
  FOR EACH ROW
  EXECUTE FUNCTION update_desserts_updated_at();

-- Enable RLS
ALTER TABLE desserts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Public read access for desserts" ON desserts;
CREATE POLICY "Public read access for desserts"
  ON desserts FOR SELECT
  USING (true);

-- Comments
COMMENT ON TABLE desserts IS 'GUDBRO Desserts database with Sistema 5 Dimensioni';
COMMENT ON COLUMN desserts.name IS 'Multi-language name: { en, it, vi }';
COMMENT ON COLUMN desserts.description IS 'Multi-language description: { en, it, vi }';
COMMENT ON COLUMN desserts.dietary IS 'Sistema 5 Dimensioni dietary info';
COMMENT ON COLUMN desserts.sweetness_level IS 'Sweetness scale 1-5: 1=barely sweet, 5=very sweet';
