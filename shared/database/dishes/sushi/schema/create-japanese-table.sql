-- =====================================================
-- GUDBRO Japanese Cuisine Database Schema
-- Created: 2025-12-17
-- Architecture: English only, translations separate
-- Sistema 5 Dimensioni integrated
-- =====================================================

-- Japanese dish category enum
DO $$ BEGIN
  CREATE TYPE japanese_category AS ENUM (
    'nigiri',           -- Hand-pressed sushi with fish on rice
    'sashimi',          -- Raw sliced fish without rice
    'maki',             -- Rolled sushi (hosomaki, futomaki)
    'uramaki',          -- Inside-out rolls
    'temaki',           -- Hand rolls (cone-shaped)
    'gunkan',           -- Battleship sushi
    'chirashi',         -- Scattered sushi bowl
    'donburi',          -- Rice bowl dishes
    'specialty_roll',   -- American-style specialty rolls
    'inari',            -- Tofu pocket sushi
    'oshizushi',        -- Pressed sushi
    'temari'            -- Ball-shaped sushi
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Fish/protein type enum
DO $$ BEGIN
  CREATE TYPE japanese_protein AS ENUM (
    -- Tuna varieties
    'maguro_akami',     -- Lean tuna
    'maguro_chutoro',   -- Medium fatty tuna
    'maguro_otoro',     -- Fatty tuna belly
    'kuromaguro',       -- Bluefin tuna
    'bincho',           -- Albacore tuna
    -- Salmon
    'sake',             -- Salmon
    'sake_belly',       -- Salmon belly
    -- Yellowtail
    'hamachi',          -- Farmed yellowtail
    'buri',             -- Wild yellowtail
    'kanpachi',         -- Amberjack
    -- White fish
    'tai',              -- Sea bream
    'hirame',           -- Flounder
    'suzuki',           -- Sea bass
    'madai',            -- Red snapper
    -- Other fish
    'saba',             -- Mackerel
    'aji',              -- Horse mackerel
    'iwashi',           -- Sardine
    'katsuo',           -- Bonito
    'unagi',            -- Freshwater eel
    'anago',            -- Sea eel
    -- Shellfish
    'ebi',              -- Shrimp
    'amaebi',           -- Sweet shrimp
    'kurumaebi',        -- Tiger prawn
    'hotate',           -- Scallop
    'akagai',           -- Ark shell
    'torigai',          -- Cockle
    'mirugai',          -- Geoduck
    'hokkigai',         -- Surf clam
    'hamaguri',         -- Clam
    -- Cephalopods
    'ika',              -- Squid
    'tako',             -- Octopus
    -- Roe
    'ikura',            -- Salmon roe
    'tobiko',           -- Flying fish roe
    'masago',           -- Capelin roe
    'uni',              -- Sea urchin
    'kazunoko',         -- Herring roe
    -- Crab
    'kani',             -- Crab
    'taraba',           -- King crab
    -- Other
    'tamago',           -- Egg omelette
    'tofu',             -- Tofu
    'vegetable',        -- Vegetable
    'mixed',            -- Multiple proteins
    'none'              -- No protein (vegetarian)
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Preparation style enum
DO $$ BEGIN
  CREATE TYPE japanese_preparation AS ENUM (
    'raw',              -- Completely raw
    'seared',           -- Tataki style - seared outside
    'cured',            -- Vinegar cured (shime)
    'marinated',        -- Zuke - soy marinated
    'grilled',          -- Yaki - grilled
    'tempura',          -- Battered and fried
    'torched',          -- Aburi - flame torched
    'smoked',           -- Kunsei
    'pressed',          -- Oshi - pressed
    'cooked',           -- Fully cooked
    'pickled'           -- Tsukemono style
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Roll style enum (for maki/uramaki/specialty)
DO $$ BEGIN
  CREATE TYPE roll_style AS ENUM (
    'hosomaki',         -- Thin roll, 1 ingredient
    'chumaki',          -- Medium roll
    'futomaki',         -- Thick roll, multiple ingredients
    'uramaki',          -- Inside-out roll
    'temaki',           -- Hand roll cone
    'gunkan',           -- Battleship style
    'not_applicable'    -- For non-rolls
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Origin/style enum
DO $$ BEGIN
  CREATE TYPE japanese_origin AS ENUM (
    'traditional_edo',       -- Traditional Tokyo style
    'traditional_osaka',     -- Osaka style
    'traditional_kyoto',     -- Kyoto style
    'traditional_other',     -- Other traditional Japanese
    'american_fusion',       -- American-Japanese fusion
    'modern_japanese',       -- Modern Japanese innovation
    'international'          -- International adaptation
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Status enum
DO $$ BEGIN
  CREATE TYPE japanese_status AS ENUM (
    'classic',          -- Classic/traditional
    'popular',          -- Popular staple
    'premium',          -- Premium/high-end
    'omakase',          -- Chef's choice quality
    'signature',        -- Signature creation
    'seasonal'          -- Seasonal special
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =====================================================
-- JAPANESE TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS japanese (
  -- Primary identification
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,                    -- English name
  name_japanese TEXT,                    -- Japanese name in romaji
  name_kanji TEXT,                       -- Japanese name in kanji/hiragana
  description TEXT NOT NULL,

  -- Classification
  category japanese_category NOT NULL,
  protein_type japanese_protein NOT NULL DEFAULT 'mixed',
  preparation japanese_preparation NOT NULL DEFAULT 'raw',
  roll_style roll_style NOT NULL DEFAULT 'not_applicable',
  origin japanese_origin NOT NULL DEFAULT 'traditional_edo',
  status japanese_status NOT NULL DEFAULT 'classic',

  -- For sashimi/nigiri - cut details
  cut_style TEXT,                        -- e.g., 'hirazukuri', 'sogizukuri', 'usuzukuri'
  pieces_per_serving INTEGER NOT NULL DEFAULT 2,

  -- For rolls - components
  nori_position TEXT,                    -- 'outside', 'inside', 'none'
  rice_type TEXT DEFAULT 'sushi_rice',   -- 'sushi_rice', 'brown_rice', 'none'

  -- Ingredients (main components for display)
  main_ingredients TEXT[] NOT NULL DEFAULT '{}',
  filling_ingredients TEXT[] DEFAULT '{}',
  topping_ingredients TEXT[] DEFAULT '{}',
  sauce TEXT[] DEFAULT '{}',
  garnish TEXT[] DEFAULT '{}',

  -- Ingredient IDs (references to master table)
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

  -- Serving details
  serving_style TEXT NOT NULL DEFAULT 'plate',  -- 'plate', 'geta', 'boat', 'bowl'
  serving_temp TEXT NOT NULL DEFAULT 'room_temp', -- 'cold', 'room_temp', 'warm'
  wasabi_included BOOLEAN NOT NULL DEFAULT true,
  ginger_included BOOLEAN NOT NULL DEFAULT true,
  soy_sauce_type TEXT DEFAULT 'regular',  -- 'regular', 'low_sodium', 'tamari', 'ponzu'

  -- Dietary & Safety (Sistema 5 Dimensioni)
  is_raw BOOLEAN NOT NULL DEFAULT true,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,  -- Most have soy sauce
  is_cooked BOOLEAN NOT NULL DEFAULT false,
  contains_raw_fish BOOLEAN NOT NULL DEFAULT true,

  -- Allergens (EU 14 + extras)
  allergens TEXT[] NOT NULL DEFAULT '{}',  -- fish, crustaceans, mollusks, soy, sesame, gluten, eggs

  -- Nutrition (per serving)
  calories_per_serving INTEGER,
  protein_g DECIMAL(5,1),
  carbs_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),
  omega3_mg INTEGER,                      -- Important for sushi

  -- Spice level (0-5)
  spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- Metadata
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  difficulty TEXT DEFAULT 'medium',        -- 'easy', 'medium', 'hard', 'expert'

  -- Pairing suggestions
  sake_pairing TEXT[] DEFAULT '{}',
  beer_pairing TEXT[] DEFAULT '{}',
  wine_pairing TEXT[] DEFAULT '{}',

  -- History/story
  history TEXT,
  fun_fact TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
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
-- COMMENTS
-- =====================================================
COMMENT ON TABLE japanese IS 'GUDBRO Japanese cuisine database - sushi, sashimi, maki, donburi with Sistema 5 Dimensioni';
COMMENT ON COLUMN japanese.name_japanese IS 'Romanized Japanese name (e.g., Maguro)';
COMMENT ON COLUMN japanese.name_kanji IS 'Japanese characters (e.g., 鮪)';
COMMENT ON COLUMN japanese.cut_style IS 'Sashimi cutting technique: hirazukuri (rectangular), sogizukuri (angled), usuzukuri (paper-thin)';
COMMENT ON COLUMN japanese.ingredient_ids IS 'References to master ingredients table';
