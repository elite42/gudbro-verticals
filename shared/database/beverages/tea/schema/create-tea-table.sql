-- GUDBRO Tea & Infusions Database Schema
-- Run this in Supabase SQL Editor BEFORE importing batch files

-- Create ENUM types for tea
DO $$ BEGIN
  CREATE TYPE tea_category AS ENUM (
    'black_tea', 'green_tea', 'oolong_tea', 'white_tea', 'pu_erh',
    'matcha', 'bubble_tea', 'chai', 'herbal_infusion', 'fruit_tea', 'specialty'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE tea_style AS ENUM ('hot', 'iced', 'blended', 'layered');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE tea_caffeine_level AS ENUM ('none', 'very_low', 'low', 'medium', 'high');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE tea_sweetness AS ENUM ('unsweetened', 'lightly_sweet', 'medium', 'sweet', 'very_sweet');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE bubble_tea_base AS ENUM ('black_tea', 'green_tea', 'oolong', 'none');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE boba_topping AS ENUM (
    'tapioca_pearls', 'brown_sugar_pearls', 'popping_boba', 'coconut_jelly',
    'aloe_vera', 'grass_jelly', 'pudding', 'red_bean', 'cheese_foam', 'taro_balls', 'none'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create tea table
CREATE TABLE IF NOT EXISTS tea (
  -- Primary fields
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,

  -- Classification
  category tea_category NOT NULL,
  style tea_style NOT NULL,
  caffeine_level tea_caffeine_level NOT NULL,
  sweetness tea_sweetness NOT NULL,

  -- Ingredients
  main_ingredients TEXT[] NOT NULL DEFAULT '{}',
  quantity_description TEXT,
  ingredient_ids TEXT[] DEFAULT '{}',

  -- Bubble tea specific
  bubble_tea_base bubble_tea_base,
  default_toppings boba_topping[] DEFAULT '{}',

  -- Serving
  glass_type TEXT,
  volume_ml INTEGER,
  chain_style_decoration TEXT,
  premium_style_decoration TEXT,

  -- Preparation
  preparation_method TEXT,
  prep_time_seconds INTEGER,
  skill_level INTEGER CHECK (skill_level BETWEEN 1 AND 3),
  steep_time_seconds INTEGER,
  water_temperature_c INTEGER,
  preparation_notes TEXT,

  -- Cost
  ingredient_cost_usd DECIMAL(10,2),
  selling_price_usd DECIMAL(10,2),
  profit_margin_percent DECIMAL(5,2),

  -- Nutrition
  calories_per_serving INTEGER,
  caffeine_mg INTEGER,
  sugar_g DECIMAL(5,1),
  protein_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),

  -- Dietary
  is_vegan BOOLEAN DEFAULT false,
  is_dairy_free BOOLEAN DEFAULT true,
  is_gluten_free BOOLEAN DEFAULT true,
  is_sugar_free BOOLEAN DEFAULT false,
  is_caffeine_free BOOLEAN DEFAULT false,
  default_milk milk_type DEFAULT 'none',
  allergens TEXT[] DEFAULT '{}',

  -- Customization
  available_milks milk_type[] DEFAULT '{}',
  available_syrups TEXT[] DEFAULT '{}',
  available_toppings boba_topping[] DEFAULT '{}',
  can_adjust_sweetness BOOLEAN DEFAULT true,
  can_adjust_ice BOOLEAN DEFAULT true,

  -- Metadata
  tags TEXT[] DEFAULT '{}',
  origin_country TEXT,
  popularity INTEGER DEFAULT 50 CHECK (popularity BETWEEN 0 AND 100),
  is_seasonal BOOLEAN DEFAULT false,
  is_signature BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tea_category ON tea(category);
CREATE INDEX IF NOT EXISTS idx_tea_style ON tea(style);
CREATE INDEX IF NOT EXISTS idx_tea_caffeine ON tea(caffeine_level);
CREATE INDEX IF NOT EXISTS idx_tea_caffeine_free ON tea(is_caffeine_free);
CREATE INDEX IF NOT EXISTS idx_tea_popularity ON tea(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_tea_tags ON tea USING GIN(tags);

-- Enable RLS
ALTER TABLE tea ENABLE ROW LEVEL SECURITY;

-- Public read policy
DROP POLICY IF EXISTS "Public read access for tea" ON tea;
CREATE POLICY "Public read access for tea" ON tea
  FOR SELECT USING (true);

-- Add comment
COMMENT ON TABLE tea IS 'GUDBRO Tea & Infusions database - traditional teas, matcha, bubble tea, chai, herbal infusions';

-- Verify
SELECT 'Tea table created successfully' AS status;
