-- =====================================================
-- GUDBRO Japanese Cuisine Database - Complete Import
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- =====================================================

-- =====================================================
-- STEP 1: CREATE ENUMS
-- =====================================================

-- Japanese dish category enum
DO $$ BEGIN
  CREATE TYPE japanese_category AS ENUM (
    'nigiri', 'sashimi', 'maki', 'uramaki', 'temaki', 'gunkan',
    'chirashi', 'donburi', 'specialty_roll', 'inari', 'oshizushi', 'temari'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Fish/protein type enum
DO $$ BEGIN
  CREATE TYPE japanese_protein AS ENUM (
    'maguro_akami', 'maguro_chutoro', 'maguro_otoro', 'kuromaguro', 'bincho',
    'sake', 'sake_belly', 'hamachi', 'buri', 'kanpachi',
    'tai', 'hirame', 'suzuki', 'madai',
    'saba', 'aji', 'iwashi', 'katsuo', 'unagi', 'anago',
    'ebi', 'amaebi', 'kurumaebi', 'hotate', 'akagai', 'torigai', 'mirugai', 'hokkigai', 'hamaguri',
    'ika', 'tako',
    'ikura', 'tobiko', 'masago', 'uni', 'kazunoko',
    'kani', 'taraba',
    'tamago', 'tofu', 'vegetable', 'mixed', 'none'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Preparation style enum
DO $$ BEGIN
  CREATE TYPE japanese_preparation AS ENUM (
    'raw', 'seared', 'cured', 'marinated', 'grilled',
    'tempura', 'torched', 'smoked', 'pressed', 'cooked', 'pickled'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Roll style enum
DO $$ BEGIN
  CREATE TYPE roll_style AS ENUM (
    'hosomaki', 'chumaki', 'futomaki', 'uramaki', 'temaki', 'gunkan', 'not_applicable'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Origin/style enum
DO $$ BEGIN
  CREATE TYPE japanese_origin AS ENUM (
    'traditional_edo', 'traditional_osaka', 'traditional_kyoto',
    'traditional_other', 'american_fusion', 'modern_japanese', 'international'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Status enum
DO $$ BEGIN
  CREATE TYPE japanese_status AS ENUM (
    'classic', 'popular', 'premium', 'omakase', 'signature', 'seasonal'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =====================================================
-- STEP 2: CREATE TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS japanese (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_japanese TEXT,
  name_kanji TEXT,
  description TEXT NOT NULL,
  category japanese_category NOT NULL,
  protein_type japanese_protein NOT NULL DEFAULT 'mixed',
  preparation japanese_preparation NOT NULL DEFAULT 'raw',
  roll_style roll_style NOT NULL DEFAULT 'not_applicable',
  origin japanese_origin NOT NULL DEFAULT 'traditional_edo',
  status japanese_status NOT NULL DEFAULT 'classic',
  cut_style TEXT,
  pieces_per_serving INTEGER NOT NULL DEFAULT 2,
  nori_position TEXT,
  rice_type TEXT DEFAULT 'sushi_rice',
  main_ingredients TEXT[] NOT NULL DEFAULT '{}',
  filling_ingredients TEXT[] DEFAULT '{}',
  topping_ingredients TEXT[] DEFAULT '{}',
  sauce TEXT[] DEFAULT '{}',
  garnish TEXT[] DEFAULT '{}',
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',
  serving_style TEXT NOT NULL DEFAULT 'plate',
  serving_temp TEXT NOT NULL DEFAULT 'room_temp',
  wasabi_included BOOLEAN NOT NULL DEFAULT true,
  ginger_included BOOLEAN NOT NULL DEFAULT true,
  soy_sauce_type TEXT DEFAULT 'regular',
  is_raw BOOLEAN NOT NULL DEFAULT true,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_cooked BOOLEAN NOT NULL DEFAULT false,
  contains_raw_fish BOOLEAN NOT NULL DEFAULT true,
  allergens TEXT[] NOT NULL DEFAULT '{}',
  calories_per_serving INTEGER,
  protein_g DECIMAL(5,1),
  carbs_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),
  omega3_mg INTEGER,
  spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  difficulty TEXT DEFAULT 'medium',
  sake_pairing TEXT[] DEFAULT '{}',
  beer_pairing TEXT[] DEFAULT '{}',
  wine_pairing TEXT[] DEFAULT '{}',
  history TEXT,
  fun_fact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- STEP 3: CREATE INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_japanese_category ON japanese(category);
CREATE INDEX IF NOT EXISTS idx_japanese_protein ON japanese(protein_type);
CREATE INDEX IF NOT EXISTS idx_japanese_preparation ON japanese(preparation);
CREATE INDEX IF NOT EXISTS idx_japanese_origin ON japanese(origin);
CREATE INDEX IF NOT EXISTS idx_japanese_status ON japanese(status);
CREATE INDEX IF NOT EXISTS idx_japanese_is_raw ON japanese(is_raw);
CREATE INDEX IF NOT EXISTS idx_japanese_is_vegetarian ON japanese(is_vegetarian);
CREATE INDEX IF NOT EXISTS idx_japanese_popularity ON japanese(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_japanese_tags ON japanese USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_japanese_ingredient_ids ON japanese USING GIN(ingredient_ids);
CREATE INDEX IF NOT EXISTS idx_japanese_allergens ON japanese USING GIN(allergens);

-- =====================================================
-- STEP 4: COMMENTS
-- =====================================================

COMMENT ON TABLE japanese IS 'GUDBRO Japanese cuisine database - sushi, sashimi, maki, donburi';
COMMENT ON COLUMN japanese.name_japanese IS 'Romanized Japanese name';
COMMENT ON COLUMN japanese.name_kanji IS 'Japanese characters';
COMMENT ON COLUMN japanese.cut_style IS 'Sashimi cutting technique';

-- =====================================================
-- DONE! Table created successfully.
-- Now run the data import script.
-- =====================================================

SELECT 'Japanese table created successfully!' as status;
