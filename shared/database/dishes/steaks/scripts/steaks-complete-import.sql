-- ============================================
-- GUDBRO Steaks & Grills Database Schema
-- Version: 3.0 - TEXT + CHECK (no ENUM)
-- Aligned to DATABASE-STANDARDS v1.1
-- Created: 2025-12-18
-- ============================================

-- ====================
-- MAIN TABLE
-- ====================

CREATE TABLE IF NOT EXISTS steaks (
  -- IDENTIFICATION (Standard v1.1)
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- INFO BASE - SOLO INGLESE (Standard v1.1)
  name TEXT NOT NULL,
  description TEXT NOT NULL,

  -- CLASSIFICATION - TEXT + CHECK (Standard v1.1)
  category TEXT NOT NULL
    CHECK (category IN ('beef_steak', 'lamb_game', 'poultry_grill', 'ribs_bbq', 'international_grill')),

  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional')),

  -- STEAKS-SPECIFIC FIELDS
  style TEXT NOT NULL DEFAULT 'international'
    CHECK (style IN (
      'american', 'italian', 'french', 'argentinian', 'brazilian',
      'japanese', 'korean', 'british', 'australian', 'spanish',
      'german', 'middle_eastern', 'turkish', 'persian', 'portuguese',
      'jamaican', 'indian', 'international'
    )),

  cut TEXT,
  weight_g INTEGER,
  bone_in BOOLEAN NOT NULL DEFAULT false,

  grade TEXT
    CHECK (grade IS NULL OR grade IN (
      'wagyu_a5', 'wagyu_a4', 'usda_prime', 'usda_choice', 'usda_select',
      'grass_fed', 'grain_fed', 'organic', 'dry_aged', 'wet_aged', 'standard'
    )),

  aging_days INTEGER,

  cooking_method TEXT
    CHECK (cooking_method IS NULL OR cooking_method IN (
      'grilled', 'pan_seared', 'broiled', 'roasted', 'smoked',
      'bbq', 'sous_vide', 'reverse_sear', 'braised', 'charcoal',
      'wood_fired', 'rotisserie', 'tandoor', 'open_flame'
    )),

  recommended_doneness TEXT
    CHECK (recommended_doneness IS NULL OR recommended_doneness IN (
      'blue_rare', 'rare', 'medium_rare', 'medium', 'medium_well', 'well_done', 'varies'
    )),

  internal_temp_c INTEGER,

  -- ORIGIN
  origin_country TEXT,
  origin_region TEXT,

  -- SERVING
  serves INTEGER DEFAULT 1,
  recommended_sides TEXT[] NOT NULL DEFAULT '{}',
  wine_pairing TEXT[] NOT NULL DEFAULT '{}',

  -- INGREDIENTI (Standard v1.1)
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - ALLERGENI (Standard v1.1)
  allergens TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - DIETARY FLAGS (Standard v1.1)
  is_gluten_free BOOLEAN NOT NULL DEFAULT true,
  is_dairy_free BOOLEAN NOT NULL DEFAULT true,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_halal BOOLEAN NOT NULL DEFAULT false,
  is_kosher BOOLEAN NOT NULL DEFAULT false,

  -- SISTEMA 5 DIMENSIONI - NUTRITION (Standard v1.1)
  calories_per_serving INTEGER,
  protein_g DECIMAL(5,1),
  carbs_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),

  -- SISTEMA 5 DIMENSIONI - SPICE (Standard v1.1)
  spice_level INTEGER NOT NULL DEFAULT 0
    CHECK (spice_level >= 0 AND spice_level <= 5),

  -- METADATA (Standard v1.1)
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50
    CHECK (popularity >= 0 AND popularity <= 100),

  -- TIMESTAMPS - TIMESTAMPTZ! (Standard v1.1)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================
-- INDEXES (Standard v1.1)
-- ====================

-- Standard indexes
CREATE INDEX IF NOT EXISTS idx_steaks_category ON steaks(category);
CREATE INDEX IF NOT EXISTS idx_steaks_popularity ON steaks(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_steaks_style ON steaks(style);
CREATE INDEX IF NOT EXISTS idx_steaks_cooking_method ON steaks(cooking_method);

-- GIN indexes for arrays (OBBLIGATORI per Standard v1.1)
CREATE INDEX IF NOT EXISTS idx_steaks_tags ON steaks USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_steaks_ingredient_ids ON steaks USING GIN(ingredient_ids);
CREATE INDEX IF NOT EXISTS idx_steaks_allergens ON steaks USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_steaks_recommended_sides ON steaks USING GIN(recommended_sides);
CREATE INDEX IF NOT EXISTS idx_steaks_wine_pairing ON steaks USING GIN(wine_pairing);

-- Partial indexes for common filters
CREATE INDEX IF NOT EXISTS idx_steaks_is_halal ON steaks(is_halal) WHERE is_halal = true;
CREATE INDEX IF NOT EXISTS idx_steaks_is_gluten_free ON steaks(is_gluten_free) WHERE is_gluten_free = true;

-- ====================
-- RLS (OBBLIGATORIO per Standard v1.1)
-- ====================

ALTER TABLE steaks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for steaks" ON steaks;
CREATE POLICY "Public read access for steaks" ON steaks
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access for steaks" ON steaks;
CREATE POLICY "Service write access for steaks" ON steaks
  FOR ALL USING (auth.role() = 'service_role');

-- ====================
-- TRIGGER updated_at (Standard v1.1 - con search_path!)
-- ====================

CREATE OR REPLACE FUNCTION update_steaks_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS steaks_updated_at ON steaks;
CREATE TRIGGER steaks_updated_at
  BEFORE UPDATE ON steaks
  FOR EACH ROW
  EXECUTE FUNCTION update_steaks_updated_at();

-- ====================
-- COMMENTS
-- ====================

COMMENT ON TABLE steaks IS 'GUDBRO Steaks & Grills catalog - 55 items, Sistema 5 Dimensioni compliant, DATABASE-STANDARDS v1.1 (TEXT+CHECK)';
COMMENT ON COLUMN steaks.id IS 'Unique identifier format: STK_{NAME}';
COMMENT ON COLUMN steaks.ingredient_ids IS 'References to master ingredients table (ING_*)';
COMMENT ON COLUMN steaks.popularity IS 'Scale 0-100 (NOT 1-5!)';
COMMENT ON COLUMN steaks.spice_level IS 'Scale 0-5 based on Scoville';

-- ============================================
-- DATA IMPORT (55 steaks)
-- ============================================


-- =====================================================
-- BEEF STEAKS (American Classics)
-- =====================================================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_RIBEYE_CLASSIC', 'classic-ribeye-steak', 'Classic Ribeye Steak', 'Bone-in ribeye with exceptional marbling, grilled to perfection with herb butter', 'beef_steak', 'classic', 'american', 'ribeye', 400, true, 'usda_prime', 'grilled', 'medium_rare', 54, 'United States', 'Texas', 1, ARRAY['baked_potato', 'creamed_spinach', 'onion_rings'], ARRAY['cabernet_sauvignon', 'malbec'], ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_BUTTER', 'ING_GARLIC', 'ING_THYME'], ARRAY['dairy'], true, false, true, false, false, false, false, 650, 52.0, 0.0, 48.0, 0, ARRAY['premium', 'classic', 'steakhouse', 'bone_in'], 95),

('STK_FILET_MIGNON', 'filet-mignon', 'Filet Mignon', 'The most tender cut, center-cut beef tenderloin wrapped in bacon', 'beef_steak', 'classic', 'american', 'filet_mignon', 225, false, 'usda_prime', 'pan_seared', 'medium_rare', 54, 'United States', NULL, 1, ARRAY['asparagus', 'truffle_mash', 'mushrooms'], ARRAY['pinot_noir', 'burgundy'], ARRAY['ING_BEEF_TENDERLOIN', 'ING_BACON', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_BUTTER'], ARRAY['dairy'], true, false, true, false, false, false, false, 450, 40.0, 0.0, 32.0, 0, ARRAY['premium', 'tender', 'elegant', 'fine_dining'], 95),

('STK_NY_STRIP', 'new-york-strip', 'New York Strip', 'Bold, beefy flavor with a strip of fat along the edge for extra richness', 'beef_steak', 'classic', 'american', 'new_york_strip', 350, false, 'usda_prime', 'grilled', 'medium_rare', 54, 'United States', 'New York', 1, ARRAY['fries', 'caesar_salad', 'grilled_vegetables'], ARRAY['cabernet_sauvignon', 'shiraz'], ARRAY['ING_BEEF_STRIP', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_GARLIC', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 550, 48.0, 0.0, 38.0, 0, ARRAY['classic', 'steakhouse', 'bold_flavor'], 90),

('STK_PORTERHOUSE', 'porterhouse-steak', 'Porterhouse Steak', 'The king of steaks - T-bone with a larger tenderloin portion, best for sharing', 'beef_steak', 'classic', 'american', 'porterhouse', 700, true, 'usda_prime', 'grilled', 'medium_rare', 54, 'United States', NULL, 2, ARRAY['creamed_spinach', 'loaded_potato', 'onion_rings'], ARRAY['cabernet_sauvignon', 'barolo'], ARRAY['ING_BEEF_PORTERHOUSE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_ROSEMARY', 'ING_BUTTER'], ARRAY['dairy'], true, false, true, false, false, false, false, 1100, 85.0, 0.0, 82.0, 0, ARRAY['premium', 'sharing', 'bone_in', 'special_occasion'], 85),

('STK_T_BONE', 't-bone-steak', 'T-Bone Steak', 'Two steaks in one - strip and tenderloin separated by a T-shaped bone', 'beef_steak', 'classic', 'american', 't_bone', 500, true, 'usda_choice', 'grilled', 'medium_rare', 54, 'United States', NULL, 1, ARRAY['baked_potato', 'grilled_corn', 'coleslaw'], ARRAY['merlot', 'zinfandel'], ARRAY['ING_BEEF_TBONE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_GARLIC_POWDER', 'ING_BUTTER'], ARRAY['dairy'], true, false, true, false, false, false, false, 750, 62.0, 0.0, 55.0, 0, ARRAY['classic', 'bone_in', 'steakhouse'], 80),

('STK_TOMAHAWK', 'tomahawk-ribeye', 'Tomahawk Ribeye', 'Impressive long-bone ribeye with dramatic presentation, dry-aged for 28 days', 'beef_steak', 'signature', 'american', 'tomahawk', 1200, true, 'usda_prime', 'reverse_sear', 'medium_rare', 54, 'United States', NULL, 3, ARRAY['truffle_fries', 'grilled_asparagus', 'bearnaise'], ARRAY['cabernet_sauvignon', 'amarone'], ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_SMOKED_PAPRIKA', 'ING_BUTTER', 'ING_BONE_MARROW'], ARRAY['dairy'], true, false, true, false, false, false, false, 1800, 140.0, 0.0, 135.0, 0, ARRAY['premium', 'showstopper', 'dry_aged', 'sharing', 'special_occasion'], 95),

('STK_PRIME_RIB', 'prime-rib-roast', 'Prime Rib', 'Slow-roasted standing rib roast with au jus and horseradish cream', 'beef_steak', 'classic', 'american', 'prime_rib', 450, true, 'usda_prime', 'roasted', 'medium_rare', 54, 'United States', NULL, 1, ARRAY['yorkshire_pudding', 'mashed_potatoes', 'green_beans'], ARRAY['burgundy', 'bordeaux'], ARRAY['ING_BEEF_PRIME_RIB', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_GARLIC', 'ING_THYME', 'ING_ROSEMARY', 'ING_HORSERADISH'], ARRAY['dairy'], true, false, true, false, false, false, false, 700, 55.0, 2.0, 52.0, 0, ARRAY['classic', 'roast', 'sunday_dinner', 'traditional'], 85),

('STK_FLAT_IRON', 'flat-iron-steak', 'Flat Iron Steak', 'Extremely tender shoulder cut, second only to tenderloin in tenderness', 'beef_steak', 'active', 'american', 'flat_iron', 280, false, 'usda_choice', 'grilled', 'medium_rare', 54, 'United States', NULL, 1, ARRAY['sweet_potato_fries', 'grilled_vegetables'], ARRAY['malbec', 'syrah'], ARRAY['ING_BEEF_FLAT_IRON', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_SMOKED_PAPRIKA', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 420, 38.0, 0.0, 28.0, 0, ARRAY['value', 'tender', 'underrated_cut'], 65),

('STK_HANGER', 'hanger-steak', 'Hanger Steak', 'Butcher''s secret cut with intense beefy flavor, from the diaphragm', 'beef_steak', 'traditional', 'french', 'hanger', 250, false, 'grass_fed', 'pan_seared', 'medium_rare', 54, 'France', NULL, 1, ARRAY['frites', 'green_salad'], ARRAY['cotes_du_rhone', 'beaujolais'], ARRAY['ING_BEEF_HANGER', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_SHALLOT', 'ING_BUTTER', 'ING_RED_WINE'], ARRAY['dairy'], true, false, true, false, false, false, false, 380, 35.0, 0.0, 26.0, 0, ARRAY['bistro', 'french', 'butchers_cut', 'intense_flavor'], 70),

('STK_SKIRT', 'skirt-steak', 'Skirt Steak', 'Long, flat cut perfect for fajitas and tacos, with bold beefy flavor', 'beef_steak', 'classic', 'american', 'skirt', 300, false, 'usda_choice', 'grilled', 'medium', 60, 'Mexico', NULL, 1, ARRAY['grilled_peppers', 'rice', 'beans'], ARRAY['tempranillo', 'malbec'], ARRAY['ING_BEEF_SKIRT', 'ING_CUMIN', 'ING_CHILI_POWDER', 'ING_GARLIC', 'ING_LIME', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 400, 36.0, 2.0, 28.0, 2, ARRAY['tex_mex', 'fajitas', 'quick_cook', 'bold_flavor'], 80);

-- =====================================================
-- ITALIAN GRILLS
-- =====================================================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_FIORENTINA', 'bistecca-alla-fiorentina', 'Bistecca alla Fiorentina', 'Iconic Tuscan T-bone from Chianina beef, grilled rare over wood fire', 'beef_steak', 'classic', 'italian', 't_bone', 1200, true, 'grass_fed', 'wood_fired', 'rare', 50, 'Italy', 'Tuscany', 2, ARRAY['fagioli_cannellini', 'roasted_potatoes', 'spinach'], ARRAY['brunello_di_montalcino', 'chianti_classico'], ARRAY['ING_BEEF_CHIANINA', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_ROSEMARY', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 1400, 110.0, 0.0, 105.0, 0, ARRAY['tuscan', 'iconic', 'wood_fired', 'sharing', 'chianina'], 95),

('STK_TAGLIATA', 'tagliata-di-manzo', 'Tagliata di Manzo', 'Sliced grilled beef served on arugula with shaved Parmigiano and balsamic', 'beef_steak', 'classic', 'italian', 'sirloin', 350, false, 'grass_fed', 'grilled', 'medium_rare', 54, 'Italy', 'Tuscany', 1, ARRAY['arugula', 'cherry_tomatoes', 'parmigiano'], ARRAY['chianti', 'barbera'], ARRAY['ING_BEEF_SIRLOIN', 'ING_ARUGULA', 'ING_PARMIGIANO', 'ING_BALSAMIC_VINEGAR', 'ING_OLIVE_OIL', 'ING_ROSEMARY'], ARRAY['dairy'], true, false, true, false, false, false, false, 520, 45.0, 5.0, 36.0, 0, ARRAY['italian', 'sliced', 'elegant', 'arugula'], 80),

('STK_COSTATA', 'costata-alla-griglia', 'Costata alla Griglia', 'Italian bone-in ribeye, simply grilled with herbs and extra virgin olive oil', 'beef_steak', 'classic', 'italian', 'ribeye', 500, true, 'grass_fed', 'grilled', 'medium_rare', 54, 'Italy', NULL, 1, ARRAY['roasted_potatoes', 'grilled_vegetables'], ARRAY['barolo', 'amarone'], ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_ROSEMARY', 'ING_SAGE', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 680, 55.0, 0.0, 50.0, 0, ARRAY['italian', 'bone_in', 'simple', 'traditional'], 80),

('STK_COTOLETTA_MILANESE', 'cotoletta-alla-milanese', 'Cotoletta alla Milanese', 'Bone-in veal cutlet, breaded and fried in butter until golden', 'international_grill', 'classic', 'italian', 'veal_cutlet', 350, true, NULL, 'pan_seared', 'well_done', NULL, 'Italy', 'Lombardy', 1, ARRAY['lemon_wedge', 'arugula_salad', 'fries'], ARRAY['franciacorta', 'pinot_grigio'], ARRAY['ING_VEAL', 'ING_BREADCRUMBS', 'ING_EGG', 'ING_BUTTER', 'ING_FLOUR', 'ING_LEMON'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, false, false, 650, 45.0, 25.0, 42.0, 0, ARRAY['milanese', 'breaded', 'fried', 'iconic'], 90),

('STK_OSSOBUCO', 'ossobuco-alla-milanese', 'Ossobuco alla Milanese', 'Braised veal shank with gremolata, served with saffron risotto', 'international_grill', 'classic', 'italian', 'veal_shank', 400, true, NULL, 'braised', 'varies', NULL, 'Italy', 'Lombardy', 1, ARRAY['risotto_milanese', 'gremolata'], ARRAY['nebbiolo', 'barbera'], ARRAY['ING_VEAL_SHANK', 'ING_ONION', 'ING_CARROT', 'ING_CELERY', 'ING_WHITE_WINE', 'ING_TOMATO', 'ING_LEMON_ZEST', 'ING_PARSLEY', 'ING_GARLIC'], ARRAY['dairy'], true, false, true, false, false, false, false, 580, 42.0, 15.0, 38.0, 0, ARRAY['milanese', 'braised', 'comfort_food', 'bone_marrow'], 80);

-- =====================================================
-- SOUTH AMERICAN GRILLS
-- =====================================================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_ASADO_TIRA', 'asado-de-tira', 'Asado de Tira', 'Argentinian cross-cut beef short ribs, slow-grilled over wood fire', 'ribs_bbq', 'classic', 'argentinian', 'short_ribs', 450, true, 'grass_fed', 'charcoal', 'medium', 63, 'Argentina', 'Pampas', 1, ARRAY['chimichurri', 'provoleta', 'grilled_vegetables'], ARRAY['malbec', 'cabernet_sauvignon'], ARRAY['ING_BEEF_SHORT_RIBS', 'ING_COARSE_SALT', 'ING_PARSLEY', 'ING_GARLIC', 'ING_OREGANO', 'ING_RED_WINE_VINEGAR', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 620, 48.0, 0.0, 46.0, 0, ARRAY['argentinian', 'asado', 'ribs', 'wood_fire', 'gaucho'], 90),

('STK_BIFE_CHORIZO', 'bife-de-chorizo', 'Bife de Chorizo', 'Argentinian sirloin strip, thick-cut and grilled with only salt', 'beef_steak', 'classic', 'argentinian', 'new_york_strip', 400, false, 'grass_fed', 'charcoal', 'medium_rare', 54, 'Argentina', NULL, 1, ARRAY['papas_fritas', 'ensalada_mixta'], ARRAY['malbec', 'bonarda'], ARRAY['ING_BEEF_STRIP', 'ING_COARSE_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 580, 50.0, 0.0, 42.0, 0, ARRAY['argentinian', 'simple', 'pure_beef', 'parrilla'], 90),

('STK_PICANHA', 'picanha', 'Picanha', 'Brazilian top sirloin cap with fat cap, the king of churrasco', 'beef_steak', 'classic', 'brazilian', 'picanha', 350, false, 'grass_fed', 'charcoal', 'medium_rare', 54, 'Brazil', NULL, 1, ARRAY['farofa', 'vinagrete', 'pao_de_queijo'], ARRAY['malbec', 'carmenere'], ARRAY['ING_BEEF_PICANHA', 'ING_COARSE_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 520, 45.0, 0.0, 38.0, 0, ARRAY['brazilian', 'churrasco', 'fat_cap', 'premium'], 95),

('STK_FRALDINHA', 'fraldinha', 'Fraldinha', 'Brazilian bottom sirloin flap, tender and flavorful', 'beef_steak', 'classic', 'brazilian', 'flank', 300, false, 'grass_fed', 'charcoal', 'medium_rare', 54, 'Brazil', NULL, 1, ARRAY['rice', 'beans', 'farofa'], ARRAY['malbec', 'tannat'], ARRAY['ING_BEEF_FLANK', 'ING_COARSE_SALT', 'ING_GARLIC'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 420, 38.0, 0.0, 30.0, 0, ARRAY['brazilian', 'churrasco', 'tender'], 80);

-- =====================================================
-- ASIAN GRILLS
-- =====================================================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_WAGYU_A5', 'japanese-wagyu-a5', 'Japanese Wagyu A5', 'Highest grade Japanese beef with intense marbling, served in small portions', 'beef_steak', 'premium', 'japanese', 'ribeye', 150, false, 'wagyu_a5', 'pan_seared', 'medium_rare', 54, 'Japan', 'Kobe', 1, ARRAY['steamed_rice', 'pickled_vegetables'], ARRAY['sake', 'champagne'], ARRAY['ING_WAGYU_BEEF', 'ING_SEA_SALT', 'ING_BLACK_PEPPER'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 450, 25.0, 0.0, 42.0, 0, ARRAY['luxury', 'wagyu', 'japanese', 'marbled'], 95),

('STK_GALBI', 'korean-galbi', 'Korean Galbi', 'Sweet soy-marinated beef short ribs, grilled tableside', 'ribs_bbq', 'classic', 'korean', 'short_ribs', 400, true, 'usda_choice', 'grilled', 'medium', 63, 'South Korea', NULL, 1, ARRAY['kimchi', 'rice', 'lettuce_wraps'], ARRAY['soju', 'makgeolli'], ARRAY['ING_BEEF_SHORT_RIBS', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_GARLIC', 'ING_PEAR', 'ING_SUGAR', 'ING_GREEN_ONION'], ARRAY['soybeans', 'sesame'], false, true, true, false, false, true, false, 550, 42.0, 15.0, 38.0, 1, ARRAY['korean', 'bbq', 'marinated', 'tableside'], 90),

('STK_BULGOGI', 'korean-bulgogi', 'Korean Bulgogi', 'Thinly sliced marinated beef, grilled with sweet-savory glaze', 'beef_steak', 'classic', 'korean', 'sirloin', 300, false, 'usda_choice', 'grilled', 'well_done', NULL, 'South Korea', NULL, 1, ARRAY['rice', 'japchae', 'banchan'], ARRAY['soju', 'beer'], ARRAY['ING_BEEF_SIRLOIN', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_GARLIC', 'ING_PEAR', 'ING_ONION', 'ING_SUGAR'], ARRAY['soybeans', 'sesame'], false, true, true, false, false, true, false, 420, 38.0, 12.0, 25.0, 1, ARRAY['korean', 'marinated', 'sweet_savory'], 90);

-- =====================================================
-- LAMB & GAME
-- =====================================================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_RACK_LAMB', 'rack-of-lamb', 'Rack of Lamb', 'Elegant French-cut rack with herb crust, served pink', 'lamb_game', 'classic', 'french', 'rack', 400, true, 'grass_fed', 'roasted', 'medium_rare', 57, 'France', NULL, 2, ARRAY['ratatouille', 'gratin_dauphinois'], ARRAY['bordeaux', 'rioja'], ARRAY['ING_LAMB_RACK', 'ING_DIJON_MUSTARD', 'ING_BREADCRUMBS', 'ING_PARSLEY', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_THYME'], ARRAY['gluten', 'mustard'], false, true, true, false, false, true, false, 580, 45.0, 8.0, 42.0, 0, ARRAY['french', 'elegant', 'herb_crusted', 'special_occasion'], 85),

('STK_LAMB_CHOPS', 'grilled-lamb-chops', 'Grilled Lamb Chops', 'Double-cut loin chops with garlic-rosemary marinade', 'lamb_game', 'classic', 'international', 'chops', 350, true, 'grass_fed', 'grilled', 'medium_rare', 57, NULL, NULL, 1, ARRAY['mint_sauce', 'roasted_vegetables'], ARRAY['syrah', 'cabernet_sauvignon'], ARRAY['ING_LAMB_CHOPS', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_OLIVE_OIL', 'ING_LEMON'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 520, 42.0, 0.0, 38.0, 0, ARRAY['lamb', 'grilled', 'herb_marinated'], 80),

('STK_LAMB_SHANK', 'braised-lamb-shank', 'Braised Lamb Shank', 'Slow-braised until fall-off-the-bone tender in red wine', 'lamb_game', 'classic', 'italian', 'shank', 500, true, NULL, 'braised', 'varies', NULL, 'Italy', NULL, 1, ARRAY['polenta', 'gremolata'], ARRAY['barolo', 'chianti'], ARRAY['ING_LAMB_SHANK', 'ING_RED_WINE', 'ING_ONION', 'ING_CARROT', 'ING_CELERY', 'ING_TOMATO', 'ING_ROSEMARY'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 620, 52.0, 12.0, 42.0, 0, ARRAY['braised', 'comfort_food', 'winter'], 75),

('STK_LEG_LAMB', 'roasted-leg-of-lamb', 'Roasted Leg of Lamb', 'Traditional Sunday roast with garlic and herbs', 'lamb_game', 'traditional', 'british', 'leg', 2000, true, 'grass_fed', 'roasted', 'medium', 63, 'United Kingdom', NULL, 6, ARRAY['roast_potatoes', 'mint_sauce', 'gravy'], ARRAY['bordeaux', 'rioja'], ARRAY['ING_LAMB_LEG', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_THYME', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 480, 38.0, 0.0, 35.0, 0, ARRAY['sunday_roast', 'traditional', 'family_meal'], 80);

-- =====================================================
-- RIBS & BBQ
-- =====================================================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_BABY_BACK_RIBS', 'baby-back-ribs', 'Baby Back Ribs', 'Tender pork ribs with smoky BBQ glaze, fall-off-the-bone texture', 'ribs_bbq', 'classic', 'american', 'baby_back_ribs', 600, true, NULL, 'smoked', 'varies', 91, 'United States', 'Kansas City', 1, ARRAY['coleslaw', 'cornbread', 'baked_beans'], ARRAY['zinfandel', 'bourbon'], ARRAY['ING_PORK_RIBS', 'ING_BBQ_SAUCE', 'ING_BROWN_SUGAR', 'ING_SMOKED_PAPRIKA', 'ING_GARLIC_POWDER', 'ING_CUMIN'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 720, 48.0, 25.0, 52.0, 1, ARRAY['bbq', 'smoked', 'american', 'tender'], 90),

('STK_ST_LOUIS_RIBS', 'st-louis-style-ribs', 'St. Louis Style Ribs', 'Meatier spare ribs trimmed St. Louis style, with tangy sauce', 'ribs_bbq', 'classic', 'american', 'spare_ribs', 700, true, NULL, 'smoked', 'varies', 91, 'United States', 'St. Louis', 1, ARRAY['mac_and_cheese', 'collard_greens'], ARRAY['shiraz', 'zinfandel'], ARRAY['ING_PORK_RIBS', 'ING_BBQ_SAUCE', 'ING_APPLE_CIDER_VINEGAR', 'ING_MUSTARD', 'ING_BROWN_SUGAR'], ARRAY['mustard'], true, true, true, false, false, false, false, 780, 52.0, 28.0, 56.0, 1, ARRAY['bbq', 'st_louis', 'tangy'], 85),

('STK_BEEF_RIBS', 'texas-beef-ribs', 'Texas Beef Ribs', 'Massive dinosaur-sized beef ribs, simply seasoned and smoked', 'ribs_bbq', 'signature', 'american', 'beef_ribs', 800, true, 'usda_choice', 'smoked', 'varies', 93, 'United States', 'Texas', 2, ARRAY['white_bread', 'pickles', 'onion'], ARRAY['cabernet_sauvignon', 'bourbon'], ARRAY['ING_BEEF_RIBS', 'ING_COARSE_SALT', 'ING_BLACK_PEPPER'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 950, 65.0, 0.0, 75.0, 0, ARRAY['texas', 'bbq', 'massive', 'smoked'], 85),

('STK_BRISKET', 'texas-smoked-brisket', 'Texas Smoked Brisket', 'Low and slow smoked beef brisket with bark crust', 'ribs_bbq', 'classic', 'american', 'brisket', 400, false, 'usda_choice', 'smoked', 'varies', 93, 'United States', 'Texas', 1, ARRAY['pickles', 'white_bread', 'onion', 'jalapenos'], ARRAY['cabernet_sauvignon', 'bourbon'], ARRAY['ING_BEEF_BRISKET', 'ING_COARSE_SALT', 'ING_BLACK_PEPPER'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 580, 48.0, 0.0, 42.0, 0, ARRAY['texas', 'smoked', 'low_and_slow', 'bark'], 95);

-- =====================================================
-- MIDDLE EASTERN GRILLS
-- =====================================================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_ADANA_KEBAB', 'adana-kebab', 'Adana Kebab', 'Spiced minced lamb kebab from southeastern Turkey, grilled on flat skewers', 'international_grill', 'classic', 'turkish', 'ground_lamb', 350, false, NULL, 'grilled', 'well_done', NULL, 'Turkey', 'Adana', 1, ARRAY['rice_pilaf', 'grilled_vegetables', 'yogurt'], ARRAY['raki', 'turkish_wine'], ARRAY['ING_GROUND_LAMB', 'ING_TAIL_FAT', 'ING_RED_PEPPER_FLAKES', 'ING_CUMIN', 'ING_SUMAC', 'ING_ONION'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 520, 38.0, 5.0, 40.0, 3, ARRAY['turkish', 'kebab', 'spicy', 'grilled'], 85),

('STK_ISKENDER', 'iskender-kebab', 'Iskender Kebab', 'Sliced doner over pide bread with tomato sauce and yogurt', 'international_grill', 'classic', 'turkish', 'doner', 400, false, NULL, 'grilled', 'well_done', NULL, 'Turkey', 'Bursa', 1, ARRAY['pide_bread', 'yogurt', 'butter'], ARRAY['ayran', 'turkish_wine'], ARRAY['ING_LAMB', 'ING_BEEF', 'ING_TOMATO_SAUCE', 'ING_YOGURT', 'ING_BUTTER', 'ING_PIDE_BREAD'], ARRAY['gluten', 'dairy'], false, false, true, false, false, true, false, 680, 45.0, 35.0, 42.0, 1, ARRAY['turkish', 'doner', 'classic'], 80),

('STK_SHAWARMA_PLATE', 'lamb-shawarma-plate', 'Lamb Shawarma Plate', 'Marinated lamb shaved from vertical spit, served with garlic sauce', 'international_grill', 'classic', 'middle_eastern', 'shawarma', 350, false, NULL, 'rotisserie', 'well_done', NULL, 'Lebanon', NULL, 1, ARRAY['hummus', 'fattoush', 'pickles', 'garlic_sauce'], ARRAY['arak', 'lebanese_wine'], ARRAY['ING_LAMB', 'ING_SHAWARMA_SPICE', 'ING_GARLIC', 'ING_VINEGAR', 'ING_YOGURT'], ARRAY['dairy'], true, false, true, false, false, true, false, 550, 42.0, 15.0, 38.0, 2, ARRAY['lebanese', 'shawarma', 'rotisserie'], 90),

('STK_KAFTA_MESHWI', 'kafta-meshwi', 'Kafta Meshwi', 'Lebanese spiced ground meat kebabs with parsley and onion', 'international_grill', 'classic', 'middle_eastern', 'ground_beef', 300, false, NULL, 'grilled', 'well_done', NULL, 'Lebanon', NULL, 1, ARRAY['hummus', 'tabbouleh', 'pita'], ARRAY['lebanese_wine', 'arak'], ARRAY['ING_GROUND_BEEF', 'ING_GROUND_LAMB', 'ING_PARSLEY', 'ING_ONION', 'ING_SEVEN_SPICE', 'ING_CINNAMON'], ARRAY['gluten'], false, true, true, false, false, true, false, 420, 35.0, 8.0, 28.0, 1, ARRAY['lebanese', 'kafta', 'grilled'], 80),

('STK_CHELO_KABAB', 'chelo-kabab', 'Chelo Kabab', 'Persian grilled kebab served over saffron rice with butter and tomato', 'international_grill', 'classic', 'persian', 'ground_beef', 350, false, NULL, 'grilled', 'well_done', NULL, 'Iran', NULL, 1, ARRAY['saffron_rice', 'grilled_tomato', 'sumac'], ARRAY['persian_wine', 'doogh'], ARRAY['ING_GROUND_BEEF', 'ING_ONION', 'ING_SAFFRON', 'ING_BUTTER', 'ING_SUMAC'], ARRAY['dairy'], true, false, true, false, false, true, false, 580, 38.0, 45.0, 28.0, 0, ARRAY['persian', 'saffron', 'rice'], 85);

-- =====================================================
-- EUROPEAN GRILLS
-- =====================================================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_WIENER_SCHNITZEL', 'wiener-schnitzel', 'Wiener Schnitzel', 'Classic Viennese breaded veal cutlet, fried golden in butter', 'international_grill', 'classic', 'german', 'veal_cutlet', 300, false, NULL, 'pan_seared', 'well_done', NULL, 'Austria', 'Vienna', 1, ARRAY['potato_salad', 'lemon_wedge', 'lingonberry'], ARRAY['gruner_veltliner', 'riesling'], ARRAY['ING_VEAL', 'ING_BREADCRUMBS', 'ING_EGG', 'ING_FLOUR', 'ING_BUTTER', 'ING_LEMON'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, false, false, 620, 42.0, 28.0, 38.0, 0, ARRAY['austrian', 'breaded', 'fried', 'classic'], 90),

('STK_SCHWEINSHAXE', 'schweinshaxe', 'Schweinshaxe', 'Bavarian roasted pork knuckle with crispy crackling', 'ribs_bbq', 'traditional', 'german', 'pork_knuckle', 800, true, NULL, 'roasted', 'varies', NULL, 'Germany', 'Bavaria', 2, ARRAY['sauerkraut', 'potato_dumplings', 'mustard'], ARRAY['weissbier', 'dunkles'], ARRAY['ING_PORK_KNUCKLE', 'ING_CARAWAY', 'ING_GARLIC', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 950, 65.0, 5.0, 72.0, 0, ARRAY['bavarian', 'crackling', 'hearty'], 80),

('STK_BEEF_WELLINGTON', 'beef-wellington', 'Beef Wellington', 'Tenderloin wrapped in mushroom duxelles and puff pastry', 'beef_steak', 'signature', 'british', 'filet_mignon', 350, false, 'usda_prime', 'roasted', 'medium_rare', 54, 'United Kingdom', NULL, 1, ARRAY['red_wine_jus', 'roasted_vegetables'], ARRAY['bordeaux', 'burgundy'], ARRAY['ING_BEEF_TENDERLOIN', 'ING_MUSHROOMS', 'ING_PROSCIUTTO', 'ING_PUFF_PASTRY', 'ING_DIJON_MUSTARD', 'ING_EGG'], ARRAY['gluten', 'eggs'], false, true, true, false, false, false, false, 720, 48.0, 25.0, 48.0, 0, ARRAY['british', 'elegant', 'pastry_wrapped', 'special_occasion'], 85),

('STK_STEAK_FRITES', 'steak-frites', 'Steak Frites', 'French bistro classic: pan-seared steak with perfect fries', 'beef_steak', 'classic', 'french', 'hanger', 280, false, 'grass_fed', 'pan_seared', 'medium_rare', 54, 'France', NULL, 1, ARRAY['frites', 'bearnaise', 'green_salad'], ARRAY['bordeaux', 'cotes_du_rhone'], ARRAY['ING_BEEF_HANGER', 'ING_BUTTER', 'ING_SHALLOT', 'ING_PARSLEY'], ARRAY['dairy'], true, false, true, false, false, false, false, 680, 42.0, 35.0, 42.0, 0, ARRAY['french', 'bistro', 'frites'], 90),

('STK_CHULETON', 'chuleton', 'Chuletón', 'Spanish bone-in ribeye from Rubia Gallega cattle, aged and grilled', 'beef_steak', 'premium', 'spanish', 'ribeye', 1000, true, 'dry_aged', 'grilled', 'medium_rare', 54, 'Spain', 'Basque Country', 2, ARRAY['pimientos_de_padron', 'patatas_fritas'], ARRAY['rioja', 'ribera_del_duero'], ARRAY['ING_BEEF_RIBEYE', 'ING_COARSE_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 1200, 95.0, 0.0, 90.0, 0, ARRAY['spanish', 'basque', 'dry_aged', 'sharing'], 90);

-- =====================================================
-- POULTRY GRILLS
-- =====================================================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_ROAST_CHICKEN', 'roast-chicken', 'Classic Roast Chicken', 'Perfectly roasted whole chicken with crispy skin and herb butter', 'poultry_grill', 'classic', 'french', 'whole_chicken', 1500, true, 'organic', 'roasted', 'varies', 74, 'France', NULL, 4, ARRAY['roasted_potatoes', 'green_beans', 'gravy'], ARRAY['chardonnay', 'pinot_noir'], ARRAY['ING_CHICKEN', 'ING_BUTTER', 'ING_THYME', 'ING_ROSEMARY', 'ING_LEMON', 'ING_GARLIC'], ARRAY['dairy'], true, false, true, false, false, true, false, 420, 38.0, 0.0, 28.0, 0, ARRAY['french', 'classic', 'roasted', 'comfort_food'], 90),

('STK_PIRI_PIRI', 'piri-piri-chicken', 'Piri Piri Chicken', 'Portuguese-African spicy grilled chicken with peri-peri chili', 'poultry_grill', 'classic', 'portuguese', 'spatchcock_chicken', 900, true, NULL, 'grilled', 'varies', 74, 'Portugal', NULL, 2, ARRAY['rice', 'fries', 'coleslaw'], ARRAY['vinho_verde', 'portuguese_rose'], ARRAY['ING_CHICKEN', 'ING_PIRI_PIRI_CHILI', 'ING_GARLIC', 'ING_LEMON', 'ING_PAPRIKA', 'ING_OREGANO'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 380, 35.0, 3.0, 22.0, 4, ARRAY['portuguese', 'spicy', 'peri_peri'], 85),

('STK_TANDOORI', 'tandoori-chicken', 'Tandoori Chicken', 'Yogurt-marinated chicken roasted in clay oven with warming spices', 'poultry_grill', 'classic', 'indian', 'chicken_pieces', 500, true, NULL, 'tandoor', 'varies', 74, 'India', 'Punjab', 1, ARRAY['naan', 'mint_chutney', 'raita'], ARRAY['lager', 'riesling'], ARRAY['ING_CHICKEN', 'ING_YOGURT', 'ING_GARAM_MASALA', 'ING_TURMERIC', 'ING_CUMIN', 'ING_KASHMIRI_CHILI', 'ING_GINGER', 'ING_GARLIC'], ARRAY['dairy'], true, false, true, false, false, true, false, 350, 42.0, 8.0, 15.0, 2, ARRAY['indian', 'tandoor', 'yogurt_marinated'], 90),

('STK_JERK_CHICKEN', 'jerk-chicken', 'Jamaican Jerk Chicken', 'Fiery Scotch bonnet and allspice marinated chicken, grilled over pimento wood', 'poultry_grill', 'classic', 'jamaican', 'chicken_pieces', 500, true, NULL, 'grilled', 'varies', 74, 'Jamaica', NULL, 1, ARRAY['rice_and_peas', 'fried_plantains', 'festival'], ARRAY['red_stripe', 'rum_punch'], ARRAY['ING_CHICKEN', 'ING_SCOTCH_BONNET', 'ING_ALLSPICE', 'ING_THYME', 'ING_GREEN_ONION', 'ING_SOY_SAUCE', 'ING_LIME'], ARRAY['soybeans'], false, true, true, false, false, true, false, 380, 38.0, 5.0, 22.0, 4, ARRAY['jamaican', 'jerk', 'spicy', 'caribbean'], 85),

('STK_POLLO_DIAVOLA', 'pollo-alla-diavola', 'Pollo alla Diavola', 'Italian devil-style spatchcocked chicken with chili and lemon', 'poultry_grill', 'classic', 'italian', 'spatchcock_chicken', 900, true, NULL, 'grilled', 'varies', 74, 'Italy', 'Tuscany', 2, ARRAY['roasted_potatoes', 'grilled_vegetables'], ARRAY['chianti', 'vermentino'], ARRAY['ING_CHICKEN', 'ING_CHILI_FLAKES', 'ING_LEMON', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 360, 36.0, 2.0, 22.0, 2, ARRAY['italian', 'spicy', 'grilled', 'tuscan'], 80);

-- =====================================================
-- VERIFY COUNT
-- =====================================================
-- SELECT COUNT(*) FROM steaks; -- Should be 55 records
