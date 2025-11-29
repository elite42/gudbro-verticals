-- ============================================================================
-- GUDBRO Food Database Schema
-- PostgreSQL / Supabase
--
-- SISTEMA 51 FILTRI v2.0:
-- - 30 Allergens (EU 14 + Korea 7 + Japan 7 + GUDBRO 2)
-- - 10 Intolerances
-- - 11 Dietary Restrictions
-- - 5 Spice Levels (0-5)
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- ============================================================================
-- SISTEMA 51 FILTRI - ALLERGEN ENUMS (30 Total)
-- ============================================================================

-- EU 14 Mandatory Allergens (Regulation 1169/2011)
CREATE TYPE allergen_eu AS ENUM (
  'gluten',           -- Cereali contenenti glutine
  'crustaceans',      -- Crostacei
  'eggs',             -- Uova
  'fish',             -- Pesce
  'peanuts',          -- Arachidi
  'soybeans',         -- Soia
  'milk',             -- Latte (includes dairy)
  'tree_nuts',        -- Frutta a guscio (noci, mandorle, nocciole, etc.)
  'celery',           -- Sedano
  'mustard',          -- Senape
  'sesame',           -- Semi di sesamo
  'sulphites',        -- Anidride solforosa e solfiti >10mg/kg
  'lupin',            -- Lupini
  'molluscs'          -- Molluschi
);

-- Korea +7 Additional Allergens (Korean Food Sanitation Act)
CREATE TYPE allergen_korea AS ENUM (
  'pork',             -- 돼지고기 (Maiale)
  'peach',            -- 복숭아 (Pesca)
  'tomato',           -- 토마토 (Pomodoro)
  'beef',             -- 쇠고기 (Manzo)
  'chicken',          -- 닭고기 (Pollo)
  'squid',            -- 오징어 (Calamari)
  'pine_nuts'         -- 잣 (Pinoli)
);

-- Japan +7 Additional Allergens (Japanese Food Labeling Standards)
CREATE TYPE allergen_japan AS ENUM (
  'kiwi',             -- キウイ
  'banana',           -- バナナ
  'mango',            -- マンゴー
  'apple',            -- りんご
  'orange',           -- オレンジ
  'matsutake',        -- まつたけ (Fungo matsutake)
  'yam'               -- やまいも (Igname)
);

-- GUDBRO +2 Custom Allergens (Asia-Pacific Focus)
CREATE TYPE allergen_gudbro AS ENUM (
  'coriander',        -- Coriandolo (gene OR6A2 - 14% perceive as soap)
  'chili_pepper'      -- Peperoncino (capsaicina - common sensitivity)
);

-- Combined allergen type for all 30 allergens
CREATE TYPE allergen AS ENUM (
  -- EU 14
  'gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soybeans',
  'milk', 'tree_nuts', 'celery', 'mustard', 'sesame', 'sulphites',
  'lupin', 'molluscs',
  -- Korea +7
  'pork', 'peach', 'tomato', 'beef', 'chicken', 'squid', 'pine_nuts',
  -- Japan +7
  'kiwi', 'banana', 'mango', 'apple', 'orange', 'matsutake', 'yam',
  -- GUDBRO +2
  'coriander', 'chili_pepper'
);

-- ============================================================================
-- SISTEMA 51 FILTRI - INTOLERANCE ENUMS (10 Total)
-- ============================================================================

CREATE TYPE intolerance AS ENUM (
  'lactose',                  -- Intolleranza al lattosio (87.8% Asia, 65% mondo)
  'gluten_sensitivity',       -- Sensibilità al glutine non celiaca
  'fructose',                 -- Intolleranza al fruttosio / malassorbimento
  'fodmap',                   -- FODMAP (IBS - fermentabili oligo-di-mono-saccaridi e polioli)
  'msg',                      -- Glutammato monosodico (E621)
  'histamine',                -- Istamina (alimenti fermentati, stagionati, vino rosso)
  'salicylates',              -- Salicilati (spezie, frutta, aspirina naturale)
  'sulphites_intolerance',    -- Solfiti sensibilità (diverso dall'allergia)
  'caffeine',                 -- Sensibilità alla caffeina
  'alcohol'                   -- Intolleranza all'alcol (deficit ALDH2)
);

-- ============================================================================
-- SISTEMA 51 FILTRI - DIETARY RESTRICTION ENUMS (11 Total)
-- ============================================================================

CREATE TYPE dietary_restriction AS ENUM (
  -- Religious/Cultural
  'buddhist',         -- Buddhista - No 5 radici pungenti (aglio, cipolla, etc.)
  'halal',            -- Halal - Permesso secondo Islam
  'kosher',           -- Kosher - Permesso secondo Ebraismo
  -- Lifestyle
  'vegan',            -- Vegano - No prodotti animali
  'vegetarian',       -- Vegetariano - No carne, no pesce
  'pescatarian',      -- Pescetariano - No carne, sì pesce
  -- Health-based
  'gluten_free',      -- Senza glutine (celiachia o sensibilità)
  'dairy_free',       -- Senza latticini
  'nut_free',         -- Senza frutta a guscio
  'low_carb',         -- Basso contenuto carboidrati / Keto
  'low_fodmap'        -- Dieta low-FODMAP per IBS
);

-- Extended dietary tags for additional filtering
CREATE TYPE dietary_tag AS ENUM (
  -- Core restrictions (duplicated from dietary_restriction for flexibility)
  'buddhist', 'halal', 'kosher', 'vegan', 'vegetarian', 'pescatarian',
  'gluten_free', 'dairy_free', 'nut_free', 'low_carb', 'low_fodmap',
  -- Extended tags
  'egg_free', 'soy_free', 'high_protein', 'low_fat', 'low_sodium',
  'sugar_free', 'raw', 'organic', 'whole30', 'paleo', 'keto'
);

-- ============================================================================
-- SISTEMA 51 FILTRI - SPICE LEVEL (0-5)
-- ============================================================================

-- Spice level as integer check constraint (0-5)
-- 0 = None, 1 = Mild, 2 = Medium, 3 = Hot, 4 = Very Hot, 5 = Extreme

-- ============================================================================
-- OTHER ENUMS
-- ============================================================================

CREATE TYPE ingredient_category AS ENUM (
  'proteins', 'dairy', 'vegetables', 'fruits', 'grains', 'legumes',
  'nuts_seeds', 'herbs_spices', 'oils_fats', 'sweeteners', 'beverages',
  'coffee_tea', 'alcohol', 'condiments', 'sauces', 'baking', 'frozen',
  'canned', 'superfoods', 'alliums', 'other'
);

CREATE TYPE recipe_category AS ENUM (
  -- Beverages - Hot
  'hot_coffee', 'espresso_based', 'hot_tea', 'hot_chocolate',
  -- Beverages - Cold
  'iced_coffee', 'iced_tea', 'smoothies', 'juices', 'milkshakes', 'boba_tea',
  -- Beverages - Alcohol
  'cocktails', 'mocktails', 'wine', 'beer', 'spirits', 'soft_drinks',
  -- Food - Meals
  'breakfast', 'brunch', 'lunch', 'dinner', 'appetizers', 'salads', 'soups',
  'sandwiches', 'burgers', 'pasta', 'rice_dishes', 'noodles', 'pizza',
  'main_courses', 'sides',
  -- Food - Sweets
  'desserts', 'pastries', 'cakes', 'ice_cream', 'snacks',
  -- Food - Bowls & Healthy
  'poke_bowls', 'acai_bowls', 'grain_bowls', 'wellness',
  -- Special
  'kids_menu', 'combo_meals', 'specials', 'seasonal'
);

CREATE TYPE measurement_unit AS ENUM (
  'g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'oz', 'lb',
  'piece', 'slice', 'pinch', 'dash', 'shot', 'to_taste'
);

CREATE TYPE season AS ENUM ('spring', 'summer', 'autumn', 'winter', 'all_year');

CREATE TYPE region AS ENUM (
  'vietnam', 'thailand', 'indonesia', 'malaysia', 'singapore', 'philippines',
  'southeast_asia', 'korea', 'japan', 'china', 'east_asia', 'india',
  'south_asia', 'middle_east', 'europe', 'mediterranean', 'americas',
  'australia', 'global'
);

CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard', 'expert');

CREATE TYPE presentation_style AS ENUM ('rustic', 'modern', 'minimal', 'traditional');

CREATE TYPE pairing_type AS ENUM (
  'goes_well_with', 'drink_pairing', 'side_dish', 'dessert_after', 'appetizer_before'
);

CREATE TYPE compliance_country AS ENUM (
  'EU', 'USA', 'Korea', 'Japan', 'Canada', 'Australia', 'China', 'Singapore', 'Vietnam'
);

-- ============================================================================
-- MASTER INGREDIENTS TABLE (Managed by GUDBRO)
-- ============================================================================

CREATE TABLE master_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,

  -- Multilingual names (JSONB for flexibility)
  name JSONB NOT NULL, -- {"en": "Tomato", "vi": "Cà chua", "ko": "토마토"}
  aliases JSONB, -- [{"en": "Roma tomato"}, {"en": "Cherry tomato"}]
  description JSONB,

  -- Classification
  category ingredient_category NOT NULL,
  subcategory VARCHAR(100),

  -- ========== SISTEMA 51 FILTRI ==========

  -- Allergens (30 types) - stored as JSONB flags for flexibility
  allergens JSONB NOT NULL DEFAULT '{}', -- {gluten: true, milk: true, ...}

  -- Intolerances (10 types)
  intolerances JSONB NOT NULL DEFAULT '{}', -- {lactose: true, fodmap: true, ...}

  -- Dietary Flags (11 types)
  dietary_flags JSONB NOT NULL DEFAULT '{}', -- {vegan: true, halal: true, ...}

  -- Spice Level (0-5) with optional Scoville
  spice_level SMALLINT NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  scoville INTEGER, -- Scoville Heat Units (SHU)

  -- =======================================

  -- Nutrition per 100g
  nutrition_per_100g JSONB NOT NULL DEFAULT '{
    "calories": 0,
    "protein": 0,
    "carbohydrates": 0,
    "sugar": 0,
    "fiber": 0,
    "fat": 0,
    "saturatedFat": 0,
    "sodium": 0
  }',

  -- Seasonal availability
  seasonal_availability JSONB DEFAULT '[]', -- [{season, regions[], peakMonths[], priceMultiplier}]

  -- Shelf life in days
  shelf_life JSONB, -- {refrigerated: 7, frozen: 90, room: 3}

  -- Origin
  origin JSONB, -- {countries: ["VN", "TH"], regions: ["southeast_asia"]}

  -- Visual
  image_url TEXT,
  icon_emoji VARCHAR(10),
  color VARCHAR(7), -- Hex color

  -- Sourcing info
  common_brands JSONB, -- ["Brand A", "Brand B"]
  average_price_per_kg JSONB, -- [{currency, amount, region}]

  -- Metadata
  is_active BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for ingredients
CREATE INDEX idx_ingredients_category ON master_ingredients(category);
CREATE INDEX idx_ingredients_allergens ON master_ingredients USING GIN(allergens);
CREATE INDEX idx_ingredients_intolerances ON master_ingredients USING GIN(intolerances);
CREATE INDEX idx_ingredients_dietary_flags ON master_ingredients USING GIN(dietary_flags);
CREATE INDEX idx_ingredients_spice_level ON master_ingredients(spice_level);
CREATE INDEX idx_ingredients_name ON master_ingredients USING GIN(name jsonb_path_ops);
CREATE INDEX idx_ingredients_slug ON master_ingredients(slug);

-- ============================================================================
-- MASTER RECIPES TABLE (Managed by GUDBRO)
-- ============================================================================

CREATE TABLE master_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,

  -- Multilingual content
  name JSONB NOT NULL,
  description JSONB NOT NULL,
  short_description JSONB,

  -- Classification
  category recipe_category NOT NULL,
  subcategory VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  cuisine_types TEXT[] DEFAULT '{}',

  -- ========== AUTO-COMPUTED from ingredients ==========

  -- Aggregated allergens (computed from ingredients)
  computed_allergens JSONB DEFAULT '{}', -- All allergens from ingredients

  -- Aggregated intolerances
  computed_intolerances JSONB DEFAULT '{}',

  -- Dietary compatibility
  suitable_diets dietary_restriction[] DEFAULT '{}',
  unsuitable_diets dietary_restriction[] DEFAULT '{}',
  dietary_warnings JSONB DEFAULT '[]', -- [{diet, reason}]

  -- Spice level (max from ingredients)
  computed_spice_level SMALLINT DEFAULT 0 CHECK (computed_spice_level >= 0 AND computed_spice_level <= 5),
  max_scoville INTEGER,

  -- Multi-nation compliance
  compliance JSONB DEFAULT '{}', -- {EU: true, Korea: true, Japan: true, ...}
  compliance_warnings TEXT[] DEFAULT '{}',

  -- Nutrition per serving (computed)
  nutrition_per_serving JSONB,

  -- ====================================================

  -- Serving info
  servings INTEGER NOT NULL DEFAULT 1,
  serving_size VARCHAR(50),

  -- Time & Difficulty
  prep_time INTEGER NOT NULL, -- minutes
  cook_time INTEGER NOT NULL, -- minutes
  total_time INTEGER GENERATED ALWAYS AS (prep_time + cook_time) STORED,
  difficulty difficulty_level DEFAULT 'medium',

  -- Business
  suggested_price JSONB, -- [{currency, amount, region}]
  food_cost_percentage DECIMAL(5,2),
  profit_margin DECIMAL(5,2),

  -- Visual
  images JSONB NOT NULL DEFAULT '{"primary": null}',
  presentation_style presentation_style,

  -- Recipe steps (JSONB array)
  steps JSONB NOT NULL DEFAULT '[]', -- [{stepNumber, instruction{}, duration, imageUrl, tips{}}]

  -- Metadata
  source TEXT,
  author TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  popularity INTEGER DEFAULT 0,
  rating DECIMAL(3,2),
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for recipes
CREATE INDEX idx_recipes_category ON master_recipes(category);
CREATE INDEX idx_recipes_computed_allergens ON master_recipes USING GIN(computed_allergens);
CREATE INDEX idx_recipes_suitable_diets ON master_recipes USING GIN(suitable_diets);
CREATE INDEX idx_recipes_spice_level ON master_recipes(computed_spice_level);
CREATE INDEX idx_recipes_tags ON master_recipes USING GIN(tags);
CREATE INDEX idx_recipes_cuisine ON master_recipes USING GIN(cuisine_types);
CREATE INDEX idx_recipes_name ON master_recipes USING GIN(name jsonb_path_ops);
CREATE INDEX idx_recipes_difficulty ON master_recipes(difficulty);
CREATE INDEX idx_recipes_total_time ON master_recipes(total_time);
CREATE INDEX idx_recipes_featured ON master_recipes(is_featured) WHERE is_featured = true;

-- ============================================================================
-- RECIPE INGREDIENTS (Junction table)
-- ============================================================================

CREATE TABLE recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID NOT NULL REFERENCES master_recipes(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES master_ingredients(id) ON DELETE RESTRICT,

  quantity DECIMAL(10,3) NOT NULL,
  unit measurement_unit NOT NULL,

  is_optional BOOLEAN DEFAULT false,
  preparation_note JSONB, -- {"en": "finely chopped", "vi": "băm nhỏ"}
  substitute_ids UUID[], -- Alternative ingredient IDs

  display_order INTEGER DEFAULT 0,

  UNIQUE(recipe_id, ingredient_id)
);

CREATE INDEX idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);

-- ============================================================================
-- RECIPE VARIATIONS (Size/portion options)
-- ============================================================================

CREATE TABLE recipe_variations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID NOT NULL REFERENCES master_recipes(id) ON DELETE CASCADE,

  name JSONB NOT NULL, -- {"en": "Large", "vi": "Lớn"}
  multiplier DECIMAL(4,2) NOT NULL DEFAULT 1.0,
  price_adjustment DECIMAL(10,2), -- Can be percentage or fixed
  price_adjustment_type VARCHAR(10) DEFAULT 'percentage', -- 'percentage' or 'fixed'

  display_order INTEGER DEFAULT 0
);

CREATE INDEX idx_recipe_variations_recipe ON recipe_variations(recipe_id);

-- ============================================================================
-- RECIPE PAIRINGS
-- ============================================================================

CREATE TABLE recipe_pairings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID NOT NULL REFERENCES master_recipes(id) ON DELETE CASCADE,
  paired_recipe_id UUID NOT NULL REFERENCES master_recipes(id) ON DELETE CASCADE,

  pairing_type pairing_type NOT NULL,
  note JSONB,

  UNIQUE(recipe_id, paired_recipe_id, pairing_type)
);

CREATE INDEX idx_pairings_recipe ON recipe_pairings(recipe_id);
CREATE INDEX idx_pairings_paired ON recipe_pairings(paired_recipe_id);

-- ============================================================================
-- MERCHANT MENU ITEMS
-- ============================================================================

CREATE TABLE merchant_menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL, -- References merchants table

  -- Based on master recipe or custom
  based_on_recipe_id UUID REFERENCES master_recipes(id) ON DELETE SET NULL,

  -- Custom overrides
  custom_name JSONB,
  custom_description JSONB,
  custom_image TEXT,

  -- Ingredient customizations
  ingredient_overrides JSONB DEFAULT '[]', -- [{ingredientId, action, substituteId, newQuantity, newUnit}]

  -- Re-computed data after customizations
  computed_overrides JSONB, -- Partial ComputedRecipeData

  -- Pricing
  price DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'VND',
  variation_prices JSONB, -- [{variationId, price}]

  -- Availability
  is_available BOOLEAN DEFAULT true,
  available_from TIME,
  available_to TIME,
  available_days INTEGER[], -- 0-6
  is_seasonal BOOLEAN DEFAULT false,
  season_start VARCHAR(5), -- MM-DD
  season_end VARCHAR(5),

  -- Display
  display_order INTEGER DEFAULT 0,
  menu_section_id UUID, -- References menu_sections
  is_featured BOOLEAN DEFAULT false,
  is_new_item BOOLEAN DEFAULT false,

  -- Stats
  total_orders INTEGER DEFAULT 0,
  last_ordered_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_merchant_items_merchant ON merchant_menu_items(merchant_id);
CREATE INDEX idx_merchant_items_recipe ON merchant_menu_items(based_on_recipe_id);
CREATE INDEX idx_merchant_items_available ON merchant_menu_items(is_available);
CREATE INDEX idx_merchant_items_section ON merchant_menu_items(menu_section_id);

-- ============================================================================
-- MERCHANT MENU SECTIONS
-- ============================================================================

CREATE TABLE menu_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL,

  name JSONB NOT NULL,
  description JSONB,

  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  -- Time-based visibility
  visible_from TIME,
  visible_to TIME,
  visible_days INTEGER[],

  icon VARCHAR(10),
  color VARCHAR(7),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_sections_merchant ON menu_sections(merchant_id);

-- Add foreign key after table exists
ALTER TABLE merchant_menu_items
  ADD CONSTRAINT fk_menu_section
  FOREIGN KEY (menu_section_id)
  REFERENCES menu_sections(id)
  ON DELETE SET NULL;

-- ============================================================================
-- MERCHANT INGREDIENT INVENTORY
-- ============================================================================

CREATE TABLE merchant_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL,
  ingredient_id UUID NOT NULL REFERENCES master_ingredients(id),

  -- Stock
  current_stock DECIMAL(12,3) DEFAULT 0,
  unit measurement_unit NOT NULL,
  min_stock DECIMAL(12,3),
  max_stock DECIMAL(12,3),

  -- Sourcing
  supplier TEXT,
  cost_per_unit DECIMAL(12,4),
  currency VARCHAR(3) DEFAULT 'VND',
  last_restocked TIMESTAMPTZ,

  -- Status
  is_available BOOLEAN DEFAULT true,
  expiry_date DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, ingredient_id)
);

CREATE INDEX idx_merchant_ingredients_merchant ON merchant_ingredients(merchant_id);
CREATE INDEX idx_merchant_ingredients_ingredient ON merchant_ingredients(ingredient_id);
CREATE INDEX idx_merchant_ingredients_low_stock ON merchant_ingredients(merchant_id)
  WHERE current_stock < min_stock;

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_master_ingredients_updated_at
  BEFORE UPDATE ON master_ingredients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_master_recipes_updated_at
  BEFORE UPDATE ON master_recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_merchant_menu_items_updated_at
  BEFORE UPDATE ON merchant_menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_menu_sections_updated_at
  BEFORE UPDATE ON menu_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_merchant_ingredients_updated_at
  BEFORE UPDATE ON merchant_ingredients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- FUNCTION: Calculate recipe nutrition from ingredients
-- ============================================================================

CREATE OR REPLACE FUNCTION calculate_recipe_nutrition(p_recipe_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_nutrition JSONB := '{
    "calories": 0,
    "protein": 0,
    "carbohydrates": 0,
    "sugar": 0,
    "fiber": 0,
    "fat": 0,
    "saturatedFat": 0,
    "sodium": 0
  }';
  v_servings INTEGER;
  v_row RECORD;
  v_multiplier DECIMAL;
BEGIN
  -- Get servings count
  SELECT servings INTO v_servings FROM master_recipes WHERE id = p_recipe_id;

  -- Sum up nutrition from all ingredients
  FOR v_row IN
    SELECT
      ri.quantity,
      ri.unit,
      mi.nutrition_per_100g
    FROM recipe_ingredients ri
    JOIN master_ingredients mi ON mi.id = ri.ingredient_id
    WHERE ri.recipe_id = p_recipe_id
  LOOP
    -- Convert quantity to grams (simplified - would need full conversion logic)
    v_multiplier := CASE v_row.unit
      WHEN 'g' THEN v_row.quantity / 100.0
      WHEN 'kg' THEN v_row.quantity * 10.0
      WHEN 'ml' THEN v_row.quantity / 100.0
      WHEN 'l' THEN v_row.quantity * 10.0
      ELSE v_row.quantity / 100.0 -- Default assumption
    END;

    v_nutrition := jsonb_build_object(
      'calories', (v_nutrition->>'calories')::DECIMAL + ((v_row.nutrition_per_100g->>'calories')::DECIMAL * v_multiplier),
      'protein', (v_nutrition->>'protein')::DECIMAL + ((v_row.nutrition_per_100g->>'protein')::DECIMAL * v_multiplier),
      'carbohydrates', (v_nutrition->>'carbohydrates')::DECIMAL + ((v_row.nutrition_per_100g->>'carbohydrates')::DECIMAL * v_multiplier),
      'sugar', (v_nutrition->>'sugar')::DECIMAL + ((v_row.nutrition_per_100g->>'sugar')::DECIMAL * v_multiplier),
      'fiber', (v_nutrition->>'fiber')::DECIMAL + ((v_row.nutrition_per_100g->>'fiber')::DECIMAL * v_multiplier),
      'fat', (v_nutrition->>'fat')::DECIMAL + ((v_row.nutrition_per_100g->>'fat')::DECIMAL * v_multiplier),
      'saturatedFat', (v_nutrition->>'saturatedFat')::DECIMAL + ((v_row.nutrition_per_100g->>'saturatedFat')::DECIMAL * v_multiplier),
      'sodium', (v_nutrition->>'sodium')::DECIMAL + ((v_row.nutrition_per_100g->>'sodium')::DECIMAL * v_multiplier)
    );
  END LOOP;

  -- Divide by servings
  IF v_servings > 0 THEN
    v_nutrition := jsonb_build_object(
      'calories', ROUND(((v_nutrition->>'calories')::DECIMAL / v_servings)::NUMERIC, 1),
      'protein', ROUND(((v_nutrition->>'protein')::DECIMAL / v_servings)::NUMERIC, 1),
      'carbohydrates', ROUND(((v_nutrition->>'carbohydrates')::DECIMAL / v_servings)::NUMERIC, 1),
      'sugar', ROUND(((v_nutrition->>'sugar')::DECIMAL / v_servings)::NUMERIC, 1),
      'fiber', ROUND(((v_nutrition->>'fiber')::DECIMAL / v_servings)::NUMERIC, 1),
      'fat', ROUND(((v_nutrition->>'fat')::DECIMAL / v_servings)::NUMERIC, 1),
      'saturatedFat', ROUND(((v_nutrition->>'saturatedFat')::DECIMAL / v_servings)::NUMERIC, 1),
      'sodium', ROUND(((v_nutrition->>'sodium')::DECIMAL / v_servings)::NUMERIC, 1)
    );
  END IF;

  RETURN v_nutrition;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- FUNCTION: Auto-compute recipe safety data from ingredients
-- ============================================================================

CREATE OR REPLACE FUNCTION compute_recipe_safety_data(p_recipe_id UUID)
RETURNS VOID AS $$
DECLARE
  v_allergens JSONB := '{}';
  v_intolerances JSONB := '{}';
  v_max_spice SMALLINT := 0;
  v_max_scoville INTEGER := NULL;
  v_suitable_diets dietary_restriction[] := ARRAY[]::dietary_restriction[];
  v_unsuitable_diets dietary_restriction[] := ARRAY[]::dietary_restriction[];
  v_row RECORD;
  v_key TEXT;
  v_value BOOLEAN;
BEGIN
  -- Aggregate allergens, intolerances, and spice from all ingredients
  FOR v_row IN
    SELECT
      mi.allergens,
      mi.intolerances,
      mi.dietary_flags,
      mi.spice_level,
      mi.scoville
    FROM recipe_ingredients ri
    JOIN master_ingredients mi ON mi.id = ri.ingredient_id
    WHERE ri.recipe_id = p_recipe_id
  LOOP
    -- Merge allergens (any TRUE means recipe contains it)
    FOR v_key, v_value IN SELECT * FROM jsonb_each_text(v_row.allergens)
    LOOP
      IF v_value::BOOLEAN THEN
        v_allergens := v_allergens || jsonb_build_object(v_key, true);
      END IF;
    END LOOP;

    -- Merge intolerances
    FOR v_key, v_value IN SELECT * FROM jsonb_each_text(v_row.intolerances)
    LOOP
      IF v_value::BOOLEAN THEN
        v_intolerances := v_intolerances || jsonb_build_object(v_key, true);
      END IF;
    END LOOP;

    -- Track max spice
    IF v_row.spice_level > v_max_spice THEN
      v_max_spice := v_row.spice_level;
    END IF;

    -- Track max scoville
    IF v_row.scoville IS NOT NULL AND (v_max_scoville IS NULL OR v_row.scoville > v_max_scoville) THEN
      v_max_scoville := v_row.scoville;
    END IF;
  END LOOP;

  -- Update recipe with computed values
  UPDATE master_recipes SET
    computed_allergens = v_allergens,
    computed_intolerances = v_intolerances,
    computed_spice_level = v_max_spice,
    max_scoville = v_max_scoville,
    nutrition_per_serving = calculate_recipe_nutrition(p_recipe_id)
  WHERE id = p_recipe_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGER: Auto-compute when recipe ingredients change
-- ============================================================================

CREATE OR REPLACE FUNCTION trigger_compute_recipe_safety()
RETURNS TRIGGER AS $$
BEGIN
  -- Compute for the affected recipe
  IF TG_OP = 'DELETE' THEN
    PERFORM compute_recipe_safety_data(OLD.recipe_id);
    RETURN OLD;
  ELSE
    PERFORM compute_recipe_safety_data(NEW.recipe_id);
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_compute_recipe_safety
  AFTER INSERT OR UPDATE OR DELETE ON recipe_ingredients
  FOR EACH ROW EXECUTE FUNCTION trigger_compute_recipe_safety();

-- ============================================================================
-- VIEWS
-- ============================================================================

-- View: Recipes with aggregated data
CREATE OR REPLACE VIEW v_recipes_full AS
SELECT
  r.*,
  (
    SELECT jsonb_agg(
      jsonb_build_object(
        'ingredient', row_to_json(mi),
        'quantity', ri.quantity,
        'unit', ri.unit,
        'isOptional', ri.is_optional,
        'preparationNote', ri.preparation_note
      )
      ORDER BY ri.display_order
    )
    FROM recipe_ingredients ri
    JOIN master_ingredients mi ON mi.id = ri.ingredient_id
    WHERE ri.recipe_id = r.id
  ) AS ingredients_full,
  (
    SELECT COUNT(*) FROM merchant_menu_items WHERE based_on_recipe_id = r.id
  ) AS merchant_usage_count
FROM master_recipes r;

-- View: Merchant menu with recipe data
CREATE OR REPLACE VIEW v_merchant_menu AS
SELECT
  mmi.*,
  COALESCE(mmi.custom_name, mr.name) AS display_name,
  COALESCE(mmi.custom_description, mr.description) AS display_description,
  COALESCE(mmi.custom_image, mr.images->>'primary') AS display_image,
  mr.computed_allergens AS base_allergens,
  mr.suitable_diets AS base_dietary_tags,
  mr.nutrition_per_serving AS base_nutrition,
  mr.computed_spice_level AS base_spice_level,
  ms.name AS section_name
FROM merchant_menu_items mmi
LEFT JOIN master_recipes mr ON mr.id = mmi.based_on_recipe_id
LEFT JOIN menu_sections ms ON ms.id = mmi.menu_section_id;

-- View: Ingredients by allergen category
CREATE OR REPLACE VIEW v_ingredients_by_allergen AS
SELECT
  mi.id,
  mi.slug,
  mi.name,
  mi.category,
  mi.allergens,
  -- EU 14 count
  (SELECT COUNT(*) FROM jsonb_each_text(mi.allergens)
   WHERE key IN ('gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soybeans',
                 'milk', 'tree_nuts', 'celery', 'mustard', 'sesame', 'sulphites',
                 'lupin', 'molluscs') AND value::boolean = true) AS eu_allergen_count,
  -- Korea count
  (SELECT COUNT(*) FROM jsonb_each_text(mi.allergens)
   WHERE key IN ('pork', 'peach', 'tomato', 'beef', 'chicken', 'squid', 'pine_nuts')
   AND value::boolean = true) AS korea_allergen_count,
  -- Japan count
  (SELECT COUNT(*) FROM jsonb_each_text(mi.allergens)
   WHERE key IN ('kiwi', 'banana', 'mango', 'apple', 'orange', 'matsutake', 'yam')
   AND value::boolean = true) AS japan_allergen_count,
  -- GUDBRO count
  (SELECT COUNT(*) FROM jsonb_each_text(mi.allergens)
   WHERE key IN ('coriander', 'chili_pepper') AND value::boolean = true) AS gudbro_allergen_count
FROM master_ingredients mi
WHERE mi.is_active = true;
