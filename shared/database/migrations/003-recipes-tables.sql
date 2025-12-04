-- ============================================================================
-- RECIPES TABLES
-- Migration: 003-recipes-tables.sql
-- Created: 2025-12-04
-- Description: Add Recipe and ProductRecipe tables for barista recipe management
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- RECIPE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS "Recipe" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name TEXT NOT NULL,  -- JSON MultiLangText
    description TEXT,    -- JSON MultiLangText

    -- Categorization
    category VARCHAR(100) NOT NULL,    -- hot-coffee, iced-coffee, matcha, tea, smoothie, milkshake
    subcategory VARCHAR(100),          -- espresso-based, milk-based, signature, etc.
    temperature VARCHAR(20) NOT NULL,  -- hot, iced

    -- Serving
    "servingSize" TEXT,  -- JSON { volume: number, unit: string }

    -- Recipe Details (JSON)
    ingredients TEXT,    -- RecipeIngredient[] - detailed ingredients with amounts
    equipment TEXT,      -- string[] - required equipment
    method TEXT,         -- RecipeMethod - steps with durations and tips

    -- Technical Parameters
    ratio VARCHAR(50),   -- e.g., "1:2", "1:1:1"
    "ratioExplanation" TEXT,
    parameters TEXT,     -- JSON - pressure, temperature, extraction time, etc.

    -- Nutrition (JSON)
    nutrition TEXT,      -- calories, caffeine_mg, protein_g, etc.

    -- Professional Tips
    "baristaTips" TEXT,  -- JSON string[] - professional tips
    variations TEXT,     -- JSON RecipeVariation[] - alternative preparations
    "latteArt" TEXT,     -- JSON - recommended patterns, difficulty

    -- Metadata
    difficulty INTEGER DEFAULT 2 CHECK (difficulty >= 1 AND difficulty <= 4),
    "totalTime" INTEGER, -- seconds
    origin VARCHAR(100), -- e.g., "Italy", "Vietnam"

    -- Timestamps
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for Recipe
CREATE INDEX IF NOT EXISTS idx_recipe_category ON "Recipe"(category);
CREATE INDEX IF NOT EXISTS idx_recipe_temperature ON "Recipe"(temperature);
CREATE INDEX IF NOT EXISTS idx_recipe_difficulty ON "Recipe"(difficulty);

-- ============================================================================
-- PRODUCT-RECIPE LINK TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS "ProductRecipe" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "productId" UUID NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
    "recipeId" UUID NOT NULL REFERENCES "Recipe"(id) ON DELETE CASCADE,

    -- Override fields for product-specific variations
    notes TEXT,  -- Product-specific preparation notes

    -- Timestamps
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Unique constraint
    UNIQUE("productId", "recipeId")
);

-- Indexes for ProductRecipe
CREATE INDEX IF NOT EXISTS idx_product_recipe_product ON "ProductRecipe"("productId");
CREATE INDEX IF NOT EXISTS idx_product_recipe_recipe ON "ProductRecipe"("recipeId");

-- ============================================================================
-- TRIGGER FOR UPDATED_AT
-- ============================================================================

-- Create trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for Recipe
DROP TRIGGER IF EXISTS update_recipe_updated_at ON "Recipe";
CREATE TRIGGER update_recipe_updated_at
    BEFORE UPDATE ON "Recipe"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for ProductRecipe
DROP TRIGGER IF EXISTS update_product_recipe_updated_at ON "ProductRecipe";
CREATE TRIGGER update_product_recipe_updated_at
    BEFORE UPDATE ON "ProductRecipe"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on Recipe
ALTER TABLE "Recipe" ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all recipes
CREATE POLICY "Allow authenticated read on Recipe"
ON "Recipe" FOR SELECT
TO authenticated
USING (true);

-- Policy: Allow service role full access
CREATE POLICY "Allow service role full access on Recipe"
ON "Recipe" FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Enable RLS on ProductRecipe
ALTER TABLE "ProductRecipe" ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all product-recipe links
CREATE POLICY "Allow authenticated read on ProductRecipe"
ON "ProductRecipe" FOR SELECT
TO authenticated
USING (true);

-- Policy: Allow service role full access
CREATE POLICY "Allow service role full access on ProductRecipe"
ON "ProductRecipe" FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE "Recipe" IS 'Professional barista recipes with detailed preparation methods';
COMMENT ON TABLE "ProductRecipe" IS 'Link table connecting products to their preparation recipes';

COMMENT ON COLUMN "Recipe".name IS 'MultiLangText JSON: { en: string, it: string, vi: string }';
COMMENT ON COLUMN "Recipe".ingredients IS 'JSON array of recipe ingredients with amounts, units, and notes';
COMMENT ON COLUMN "Recipe".method IS 'JSON object with steps array, each step has order, action, duration, tips';
COMMENT ON COLUMN "Recipe".parameters IS 'JSON object with technical parameters: pressure, temperature, extraction time, etc.';
COMMENT ON COLUMN "Recipe".nutrition IS 'JSON object with nutritional info: calories, caffeine_mg, protein_g, etc.';
COMMENT ON COLUMN "Recipe".difficulty IS 'Skill level 1-4: 1=Beginner, 2=Intermediate, 3=Advanced, 4=Expert';
