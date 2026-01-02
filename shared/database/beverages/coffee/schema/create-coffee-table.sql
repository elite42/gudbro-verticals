-- GUDBRO Coffee Database Schema
-- Run this in Supabase SQL Editor

-- Create ENUM types
DO $$ BEGIN
  CREATE TYPE coffee_category AS ENUM (
    'espresso_based',
    'coffee_mix',
    'cold_brew',
    'filter_coffee',
    'specialty'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE coffee_style AS ENUM (
    'hot',
    'iced',
    'blended',
    'layered'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE caffeine_level AS ENUM (
    'decaf',
    'low',
    'medium',
    'high',
    'very_high'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE coffee_sweetness AS ENUM (
    'unsweetened',
    'lightly_sweet',
    'medium',
    'sweet',
    'very_sweet'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE milk_type AS ENUM (
    'whole',
    'skim',
    'oat',
    'almond',
    'soy',
    'coconut',
    'none'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create coffee table
CREATE TABLE IF NOT EXISTS coffee (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,

  -- Classification
  category coffee_category NOT NULL,
  style coffee_style NOT NULL,
  caffeine_level caffeine_level NOT NULL DEFAULT 'medium',
  sweetness coffee_sweetness NOT NULL DEFAULT 'unsweetened',

  -- Ingredients
  main_ingredients TEXT[] NOT NULL DEFAULT '{}',
  quantity_description TEXT,
  ingredient_ids TEXT[] DEFAULT '{}',

  -- Serving
  glass_type TEXT,
  volume_ml INTEGER,
  chain_style_decoration TEXT,
  premium_style_decoration TEXT,

  -- Preparation
  preparation_method TEXT,
  prep_time_seconds INTEGER,
  skill_level INTEGER CHECK (skill_level BETWEEN 1 AND 3),
  preparation_notes TEXT,

  -- Cost & Pricing (reference values)
  ingredient_cost_usd DECIMAL(6,2),
  selling_price_usd DECIMAL(6,2),
  profit_margin_percent DECIMAL(5,2),

  -- Nutrition
  calories_per_serving INTEGER,
  caffeine_mg INTEGER,
  sugar_g DECIMAL(5,1),
  protein_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),

  -- Dietary
  is_vegan BOOLEAN DEFAULT false,
  is_dairy_free BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT true,
  is_sugar_free BOOLEAN DEFAULT false,
  default_milk milk_type DEFAULT 'whole',
  allergens TEXT[] DEFAULT '{}',

  -- Customization
  available_milks milk_type[] DEFAULT '{whole}',
  available_syrups TEXT[] DEFAULT '{}',
  can_add_espresso_shot BOOLEAN DEFAULT true,
  can_adjust_sweetness BOOLEAN DEFAULT true,
  can_make_decaf BOOLEAN DEFAULT true,

  -- Metadata
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity BETWEEN 0 AND 100),
  is_seasonal BOOLEAN DEFAULT false,
  is_signature BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_coffee_category ON coffee(category);
CREATE INDEX IF NOT EXISTS idx_coffee_style ON coffee(style);
CREATE INDEX IF NOT EXISTS idx_coffee_caffeine ON coffee(caffeine_level);
CREATE INDEX IF NOT EXISTS idx_coffee_popularity ON coffee(popularity DESC);

-- Enable RLS
ALTER TABLE coffee ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Coffee is viewable by everyone" ON coffee;
CREATE POLICY "Coffee is viewable by everyone" ON coffee FOR SELECT USING (true);

-- Comment
COMMENT ON TABLE coffee IS 'GUDBRO Coffee Database - 81+ recipes with Sistema 5 Dimensioni';
