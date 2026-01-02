-- ============================================
-- GUDBRO Steaks & Grills Database - COMPLETE
-- Version: 4.0 - ALL 74 Records
-- Aligned to DATABASE-STANDARDS v1.1
-- Created: 2025-12-18
-- ============================================

-- ====================
-- MAIN TABLE
-- ====================

DROP TABLE IF EXISTS steaks CASCADE;

CREATE TABLE IF NOT EXISTS steaks (
  -- IDENTIFICATION (Standard v1.1)
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- INFO BASE - SOLO INGLESE (Standard v1.1)
  name TEXT NOT NULL,
  description TEXT NOT NULL,

  -- CLASSIFICATION - TEXT + CHECK (Standard v1.1)
  category TEXT NOT NULL
    CHECK (category IN ('beef_steak', 'beef_roast', 'lamb', 'game', 'veal', 'pork', 'poultry_grill', 'ribs', 'skewers', 'mixed_grill')),

  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional', 'modern')),

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

  -- SISTEMA 5 DIMENSIONI - SPICINESS (Standard v1.1)
  spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- METADATA (Standard v1.1)
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

  -- TIMESTAMPS (Standard v1.1)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================
-- INDEXES
-- ====================
CREATE INDEX IF NOT EXISTS idx_steaks_category ON steaks(category);
CREATE INDEX IF NOT EXISTS idx_steaks_style ON steaks(style);
CREATE INDEX IF NOT EXISTS idx_steaks_tags ON steaks USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_steaks_allergens ON steaks USING GIN(allergens);

-- ====================
-- RLS POLICIES
-- ====================
ALTER TABLE steaks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "steaks_read_all" ON steaks;
CREATE POLICY "steaks_read_all" ON steaks FOR SELECT USING (true);

-- ====================
-- BEEF STEAKS (10 records)
-- ====================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_RIBEYE_CLASSIC', 'classic-ribeye-steak', 'Classic Ribeye Steak', 'Bone-in ribeye with exceptional marbling, grilled to perfection with herb butter', 'beef_steak', 'classic', 'american', 'ribeye', 400, true, 'usda_prime', 'grilled', 'medium_rare', 54, 'United States', 'Texas', 1, ARRAY['baked_potato', 'creamed_spinach', 'onion_rings'], ARRAY['cabernet_sauvignon', 'malbec'], ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_BUTTER', 'ING_GARLIC', 'ING_THYME'], ARRAY['dairy'], true, false, true, false, false, false, false, 650, 52.0, 0.0, 48.0, 0, ARRAY['premium', 'classic', 'steakhouse', 'bone_in'], 95),

('STK_FILET_MIGNON', 'filet-mignon', 'Filet Mignon', 'The most tender cut, center-cut beef tenderloin wrapped in bacon', 'beef_steak', 'classic', 'american', 'filet_mignon', 225, false, 'usda_prime', 'pan_seared', 'medium_rare', 54, 'United States', NULL, 1, ARRAY['asparagus', 'truffle_mash', 'mushrooms'], ARRAY['pinot_noir', 'burgundy'], ARRAY['ING_BEEF_TENDERLOIN', 'ING_BACON', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_BUTTER'], ARRAY['dairy'], true, false, true, false, false, false, false, 450, 40.0, 0.0, 32.0, 0, ARRAY['premium', 'tender', 'elegant', 'fine_dining'], 95),

('STK_NY_STRIP', 'new-york-strip', 'New York Strip', 'Bold, beefy flavor with a strip of fat along the edge for extra richness', 'beef_steak', 'classic', 'american', 'new_york_strip', 350, false, 'usda_prime', 'grilled', 'medium_rare', 54, 'United States', 'New York', 1, ARRAY['fries', 'caesar_salad', 'grilled_vegetables'], ARRAY['cabernet_sauvignon', 'shiraz'], ARRAY['ING_BEEF_STRIP', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_GARLIC', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 550, 48.0, 0.0, 38.0, 0, ARRAY['classic', 'steakhouse', 'bold_flavor'], 95),

('STK_PORTERHOUSE', 'porterhouse-steak', 'Porterhouse Steak', 'The king of steaks - T-bone with a larger tenderloin portion, best for sharing', 'beef_steak', 'classic', 'american', 'porterhouse', 700, true, 'usda_prime', 'grilled', 'medium_rare', 54, 'United States', NULL, 2, ARRAY['creamed_spinach', 'loaded_potato', 'onion_rings'], ARRAY['cabernet_sauvignon', 'barolo'], ARRAY['ING_BEEF_PORTERHOUSE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_ROSEMARY', 'ING_BUTTER'], ARRAY['dairy'], true, false, true, false, false, false, false, 1100, 85.0, 0.0, 82.0, 0, ARRAY['premium', 'sharing', 'bone_in', 'special_occasion'], 90),

('STK_T_BONE', 't-bone-steak', 'T-Bone Steak', 'Two steaks in one - strip and tenderloin separated by a T-shaped bone', 'beef_steak', 'classic', 'american', 't_bone', 500, true, 'usda_choice', 'grilled', 'medium_rare', 54, 'United States', NULL, 1, ARRAY['baked_potato', 'grilled_corn', 'coleslaw'], ARRAY['merlot', 'zinfandel'], ARRAY['ING_BEEF_TBONE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_GARLIC_POWDER', 'ING_BUTTER'], ARRAY['dairy'], true, false, true, false, false, false, false, 750, 62.0, 0.0, 55.0, 0, ARRAY['classic', 'bone_in', 'steakhouse'], 88),

('STK_TOMAHAWK', 'tomahawk-ribeye', 'Tomahawk Ribeye', 'Impressive long-bone ribeye with dramatic presentation, dry-aged for 28 days', 'beef_steak', 'signature', 'american', 'tomahawk', 1200, true, 'usda_prime', 'reverse_sear', 'medium_rare', 54, 'United States', NULL, 3, ARRAY['truffle_fries', 'grilled_asparagus', 'bearnaise'], ARRAY['cabernet_sauvignon', 'amarone'], ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_SMOKED_PAPRIKA', 'ING_BUTTER', 'ING_BONE_MARROW'], ARRAY['dairy'], true, false, true, false, false, false, false, 1800, 140.0, 0.0, 135.0, 0, ARRAY['premium', 'showstopper', 'dry_aged', 'sharing', 'special_occasion'], 92),

('STK_PRIME_RIB', 'prime-rib-roast', 'Prime Rib', 'Slow-roasted standing rib roast with au jus and horseradish cream', 'beef_roast', 'classic', 'american', 'prime_rib', 450, true, 'usda_prime', 'roasted', 'medium_rare', 54, 'United States', NULL, 1, ARRAY['yorkshire_pudding', 'mashed_potatoes', 'green_beans'], ARRAY['burgundy', 'bordeaux'], ARRAY['ING_BEEF_PRIME_RIB', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_GARLIC', 'ING_THYME', 'ING_ROSEMARY', 'ING_HORSERADISH'], ARRAY['dairy'], true, false, true, false, false, false, false, 700, 55.0, 2.0, 52.0, 0, ARRAY['classic', 'roast', 'sunday_dinner', 'traditional'], 88),

('STK_FLAT_IRON', 'flat-iron-steak', 'Flat Iron Steak', 'Extremely tender shoulder cut, second only to tenderloin in tenderness', 'beef_steak', 'modern', 'american', 'flat_iron', 280, false, 'usda_choice', 'grilled', 'medium_rare', 54, 'United States', NULL, 1, ARRAY['sweet_potato_fries', 'grilled_vegetables'], ARRAY['malbec', 'syrah'], ARRAY['ING_BEEF_FLAT_IRON', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_SMOKED_PAPRIKA', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 420, 38.0, 0.0, 28.0, 0, ARRAY['value', 'tender', 'underrated_cut'], 75),

('STK_HANGER', 'hanger-steak', 'Hanger Steak', 'Butcher''s secret cut with intense beefy flavor, also known as onglet', 'beef_steak', 'traditional', 'french', 'hanger', 250, false, 'grass_fed', 'pan_seared', 'medium_rare', 54, 'France', NULL, 1, ARRAY['frites', 'green_salad'], ARRAY['cotes_du_rhone', 'beaujolais'], ARRAY['ING_BEEF_HANGER', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_SHALLOT', 'ING_BUTTER', 'ING_RED_WINE'], ARRAY['dairy'], true, false, true, false, false, false, false, 380, 35.0, 0.0, 26.0, 0, ARRAY['bistro', 'french', 'butchers_cut', 'intense_flavor'], 78),

('STK_SKIRT', 'skirt-steak', 'Skirt Steak', 'Long, flat cut perfect for fajitas and tacos, with bold beefy flavor', 'beef_steak', 'classic', 'american', 'skirt', 300, false, 'usda_choice', 'grilled', 'medium', 60, 'Mexico', NULL, 1, ARRAY['grilled_peppers', 'rice', 'beans'], ARRAY['tempranillo', 'malbec'], ARRAY['ING_BEEF_SKIRT', 'ING_CUMIN', 'ING_CHILI_POWDER', 'ING_GARLIC', 'ING_LIME', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 400, 36.0, 2.0, 28.0, 2, ARRAY['tex_mex', 'fajitas', 'quick_cook', 'bold_flavor'], 85);

-- ====================
-- ITALIAN GRILLS (8 records)
-- ====================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_FIORENTINA', 'bistecca-alla-fiorentina', 'Bistecca alla Fiorentina', 'Iconic Tuscan T-bone from Chianina beef, grilled rare over wood fire', 'beef_steak', 'classic', 'italian', 't_bone', 1200, true, 'grass_fed', 'wood_fired', 'rare', 50, 'Italy', 'Tuscany', 2, ARRAY['fagioli_cannellini', 'roasted_potatoes', 'spinach'], ARRAY['brunello_di_montalcino', 'chianti_classico'], ARRAY['ING_BEEF_CHIANINA', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_ROSEMARY', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 1400, 110.0, 0.0, 105.0, 0, ARRAY['tuscan', 'iconic', 'wood_fired', 'sharing', 'chianina'], 95),

('STK_TAGLIATA', 'tagliata-di-manzo', 'Tagliata di Manzo', 'Sliced grilled beef served on arugula with shaved Parmigiano and balsamic', 'beef_steak', 'classic', 'italian', 'sirloin', 350, false, 'grass_fed', 'grilled', 'medium_rare', 54, 'Italy', 'Tuscany', 1, ARRAY['arugula', 'cherry_tomatoes', 'parmigiano'], ARRAY['chianti', 'barbera'], ARRAY['ING_BEEF_SIRLOIN', 'ING_ARUGULA', 'ING_PARMIGIANO', 'ING_BALSAMIC_VINEGAR', 'ING_OLIVE_OIL', 'ING_ROSEMARY'], ARRAY['dairy'], true, false, true, false, false, false, false, 520, 45.0, 5.0, 36.0, 0, ARRAY['italian', 'sliced', 'elegant', 'arugula'], 88),

('STK_COSTATA', 'costata-alla-griglia', 'Costata alla Griglia', 'Italian bone-in ribeye, simply grilled with herbs and extra virgin olive oil', 'beef_steak', 'classic', 'italian', 'ribeye', 500, true, 'grass_fed', 'grilled', 'medium_rare', 54, 'Italy', NULL, 1, ARRAY['roasted_potatoes', 'grilled_vegetables'], ARRAY['barolo', 'amarone'], ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_ROSEMARY', 'ING_SAGE', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 680, 55.0, 0.0, 50.0, 0, ARRAY['italian', 'bone_in', 'simple', 'traditional'], 85),

('STK_SALTIMBOCCA', 'saltimbocca-alla-romana', 'Saltimbocca alla Romana', 'Veal scaloppine with prosciutto and sage, finished in white wine butter sauce', 'veal', 'classic', 'italian', 'other', 180, false, NULL, 'pan_seared', 'well_done', NULL, 'Italy', 'Lazio', 1, ARRAY['sauteed_spinach', 'roasted_potatoes'], ARRAY['frascati', 'verdicchio'], ARRAY['ING_VEAL', 'ING_PROSCIUTTO', 'ING_SAGE', 'ING_BUTTER', 'ING_WHITE_WINE', 'ING_BLACK_PEPPER'], ARRAY['dairy'], true, false, true, false, false, false, false, 380, 32.0, 2.0, 26.0, 0, ARRAY['roman', 'veal', 'prosciutto', 'classic', 'elegant'], 85),

('STK_OSSOBUCO', 'ossobuco-alla-milanese', 'Ossobuco alla Milanese', 'Braised veal shank with gremolata, served with saffron risotto', 'veal', 'classic', 'italian', 'other', 400, true, NULL, 'braised', 'well_done', NULL, 'Italy', 'Lombardy', 1, ARRAY['risotto_milanese', 'gremolata'], ARRAY['nebbiolo', 'barbera'], ARRAY['ING_VEAL_SHANK', 'ING_ONION', 'ING_CARROT', 'ING_CELERY', 'ING_WHITE_WINE', 'ING_TOMATO', 'ING_LEMON_ZEST', 'ING_PARSLEY', 'ING_GARLIC'], ARRAY['dairy'], true, false, true, false, false, false, false, 580, 42.0, 15.0, 38.0, 0, ARRAY['milanese', 'braised', 'comfort_food', 'bone_marrow'], 88),

('STK_VITELLO_TONNATO', 'vitello-tonnato', 'Vitello Tonnato', 'Cold sliced veal with creamy tuna-caper sauce, a Piedmontese classic', 'veal', 'classic', 'italian', 'other', 200, false, NULL, 'braised', 'well_done', NULL, 'Italy', 'Piedmont', 1, ARRAY['capers', 'lemon'], ARRAY['gavi', 'arneis'], ARRAY['ING_VEAL', 'ING_TUNA', 'ING_CAPERS', 'ING_ANCHOVIES', 'ING_MAYONNAISE', 'ING_LEMON'], ARRAY['fish', 'eggs'], true, true, true, false, false, false, false, 350, 35.0, 3.0, 22.0, 0, ARRAY['piedmontese', 'cold', 'summer', 'antipasto'], 78),

('STK_ARROSTO_MISTO', 'arrosto-misto-piemontese', 'Arrosto Misto Piemontese', 'Mixed roasted meats platter: veal, pork, rabbit, and sausage', 'mixed_grill', 'traditional', 'italian', 'other', 500, true, NULL, 'roasted', 'well_done', NULL, 'Italy', 'Piedmont', 2, ARRAY['roasted_potatoes', 'roasted_vegetables'], ARRAY['barolo', 'barbaresco'], ARRAY['ING_VEAL', 'ING_PORK', 'ING_RABBIT', 'ING_SAUSAGE', 'ING_ROSEMARY', 'ING_SAGE', 'ING_GARLIC'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 850, 70.0, 5.0, 60.0, 0, ARRAY['piedmontese', 'mixed_meats', 'sunday_lunch', 'traditional'], 75),

('STK_COTOLETTA_MILANESE', 'cotoletta-alla-milanese', 'Cotoletta alla Milanese', 'Bone-in veal cutlet, breaded and fried in butter until golden', 'veal', 'classic', 'italian', 'other', 350, true, NULL, 'pan_seared', 'well_done', NULL, 'Italy', 'Lombardy', 1, ARRAY['lemon_wedge', 'arugula_salad', 'fries'], ARRAY['franciacorta', 'pinot_grigio'], ARRAY['ING_VEAL', 'ING_BREADCRUMBS', 'ING_EGG', 'ING_BUTTER', 'ING_FLOUR', 'ING_LEMON'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, false, false, 650, 45.0, 25.0, 42.0, 0, ARRAY['milanese', 'breaded', 'fried', 'iconic'], 92);

-- ====================
-- SOUTH AMERICAN GRILLS (9 records)
-- ====================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_ASADO_TIRA', 'asado-de-tira', 'Asado de Tira', 'Argentinian cross-cut beef short ribs, slow-grilled over wood fire', 'ribs', 'classic', 'argentinian', 'short_ribs', 450, true, 'grass_fed', 'charcoal', 'medium', 63, 'Argentina', 'Pampas', 1, ARRAY['chimichurri', 'provoleta', 'grilled_vegetables'], ARRAY['malbec', 'cabernet_sauvignon'], ARRAY['ING_BEEF_SHORT_RIBS', 'ING_COARSE_SALT', 'ING_PARSLEY', 'ING_GARLIC', 'ING_OREGANO', 'ING_RED_WINE_VINEGAR', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 620, 48.0, 0.0, 46.0, 0, ARRAY['argentinian', 'asado', 'ribs', 'wood_fire', 'gaucho'], 92),

('STK_BIFE_CHORIZO', 'bife-de-chorizo', 'Bife de Chorizo', 'Argentinian sirloin strip, thick-cut and grilled with only salt', 'beef_steak', 'classic', 'argentinian', 'new_york_strip', 400, false, 'grass_fed', 'charcoal', 'medium_rare', 54, 'Argentina', NULL, 1, ARRAY['papas_fritas', 'ensalada_mixta'], ARRAY['malbec', 'bonarda'], ARRAY['ING_BEEF_STRIP', 'ING_COARSE_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 580, 50.0, 0.0, 42.0, 0, ARRAY['argentinian', 'simple', 'pure_beef', 'parrilla'], 90),

('STK_ENTRANA', 'entrana', 'Entrana', 'Argentinian skirt steak with intense beefy flavor, charred on outside', 'beef_steak', 'classic', 'argentinian', 'skirt', 350, false, 'grass_fed', 'charcoal', 'medium_rare', 54, 'Argentina', NULL, 1, ARRAY['grilled_provolone', 'grilled_peppers'], ARRAY['malbec', 'syrah'], ARRAY['ING_BEEF_SKIRT', 'ING_COARSE_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 480, 42.0, 0.0, 34.0, 0, ARRAY['argentinian', 'intense_flavor', 'quick_cook'], 85),

('STK_VACIO', 'vacio', 'Vacio', 'Argentinian flank steak with a layer of fat, slow-cooked to perfection', 'beef_steak', 'classic', 'argentinian', 'flank', 400, false, 'grass_fed', 'charcoal', 'medium', 60, 'Argentina', NULL, 1, ARRAY['ensalada_rusa', 'papas_al_horno'], ARRAY['malbec'], ARRAY['ING_BEEF_FLANK', 'ING_COARSE_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 520, 44.0, 0.0, 38.0, 0, ARRAY['argentinian', 'slow_cook', 'fatty_delicious'], 82),

('STK_PROVOLETA', 'provoleta', 'Provoleta', 'Grilled provolone cheese with oregano and chili flakes, a parrilla starter', 'beef_steak', 'classic', 'argentinian', 'other', 200, false, NULL, 'grilled', 'well_done', NULL, 'Argentina', NULL, 2, ARRAY['crusty_bread'], ARRAY['torrontes', 'malbec'], ARRAY['ING_PROVOLONE', 'ING_OREGANO', 'ING_CHILI_FLAKES', 'ING_OLIVE_OIL'], ARRAY['dairy'], true, false, true, false, true, true, false, 350, 25.0, 2.0, 28.0, 1, ARRAY['argentinian', 'cheese', 'starter', 'vegetarian'], 85),

('STK_PICANHA', 'picanha', 'Picanha', 'Brazilian top sirloin cap with fat cap, the king of churrasco', 'beef_steak', 'classic', 'brazilian', 'picanha', 350, false, 'grass_fed', 'charcoal', 'medium_rare', 54, 'Brazil', NULL, 1, ARRAY['farofa', 'vinagrete', 'pao_de_queijo'], ARRAY['malbec', 'carmenere'], ARRAY['ING_BEEF_PICANHA', 'ING_COARSE_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 520, 45.0, 0.0, 38.0, 0, ARRAY['brazilian', 'churrasco', 'fat_cap', 'premium'], 95),

('STK_FRALDINHA', 'fraldinha', 'Fraldinha', 'Brazilian bottom sirloin flap, tender and flavorful', 'beef_steak', 'classic', 'brazilian', 'flank', 300, false, 'grass_fed', 'charcoal', 'medium_rare', 54, 'Brazil', NULL, 1, ARRAY['rice', 'beans', 'farofa'], ARRAY['malbec', 'tannat'], ARRAY['ING_BEEF_FLANK', 'ING_COARSE_SALT', 'ING_GARLIC'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 420, 38.0, 0.0, 30.0, 0, ARRAY['brazilian', 'churrasco', 'tender'], 82),

('STK_COSTELA_BOVINA', 'costela-bovina', 'Costela Bovina', 'Brazilian beef ribs slow-cooked for hours until fall-off-the-bone tender', 'ribs', 'classic', 'brazilian', 'short_ribs', 500, true, 'grass_fed', 'smoked', 'well_done', NULL, 'Brazil', NULL, 2, ARRAY['mandioca_frita', 'coleslaw'], ARRAY['shiraz', 'malbec'], ARRAY['ING_BEEF_SHORT_RIBS', 'ING_COARSE_SALT', 'ING_GARLIC', 'ING_BAY_LEAF'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 750, 55.0, 0.0, 58.0, 0, ARRAY['brazilian', 'slow_cooked', 'fall_off_bone', 'smoked'], 88),

('STK_CUPIM', 'cupim', 'Cupim', 'Brazilian beef hump from Zebu cattle, unique and tender when slow-cooked', 'beef_roast', 'traditional', 'brazilian', 'other', 400, false, 'grass_fed', 'smoked', 'well_done', NULL, 'Brazil', NULL, 1, ARRAY['farofa', 'vinagrete'], ARRAY['tannat', 'malbec'], ARRAY['ING_BEEF_HUMP', 'ING_COARSE_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 480, 40.0, 0.0, 35.0, 0, ARRAY['brazilian', 'unique_cut', 'zebu', 'slow_cooked'], 75);

-- ====================
-- ASIAN GRILLS (9 records)
-- ====================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_WAGYU_A5', 'wagyu-a5-ribeye', 'Wagyu A5 Ribeye', 'Japanese A5 Wagyu ribeye, the highest grade with intense marbling', 'beef_steak', 'signature', 'japanese', 'ribeye', 150, false, 'wagyu_a5', 'pan_seared', 'medium_rare', 52, 'Japan', 'Kobe', 1, ARRAY['rice', 'miso_soup', 'pickles'], ARRAY['burgundy', 'champagne'], ARRAY['ING_WAGYU_BEEF', 'ING_SEA_SALT', 'ING_WASABI'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 450, 18.0, 0.0, 42.0, 0, ARRAY['japanese', 'wagyu', 'luxury', 'a5', 'kobe'], 98),

('STK_GYUTAN', 'gyutan-beef-tongue', 'Gyutan', 'Grilled beef tongue sliced thin, a Sendai specialty', 'beef_steak', 'traditional', 'japanese', 'other', 150, false, NULL, 'grilled', 'medium', 60, 'Japan', 'Miyagi', 1, ARRAY['barley_rice', 'oxtail_soup', 'pickled_vegetables'], ARRAY['sake', 'pinot_noir'], ARRAY['ING_BEEF_TONGUE', 'ING_SALT', 'ING_LEMON'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 280, 22.0, 0.0, 20.0, 0, ARRAY['japanese', 'sendai', 'unique', 'tongue'], 75),

('STK_YAKITORI_MORIAWASE', 'yakitori-moriawase', 'Yakitori Moriawase', 'Assorted chicken skewers: thigh, breast, skin, liver, meatball', 'skewers', 'classic', 'japanese', 'other', 250, false, NULL, 'charcoal', 'well_done', NULL, 'Japan', NULL, 1, ARRAY['beer', 'pickles', 'cabbage'], ARRAY['sake', 'beer'], ARRAY['ING_CHICKEN_THIGH', 'ING_CHICKEN_BREAST', 'ING_CHICKEN_SKIN', 'ING_CHICKEN_LIVER', 'ING_SOY_SAUCE', 'ING_MIRIN', 'ING_SAKE'], ARRAY['gluten', 'soy'], false, true, true, false, false, false, false, 320, 28.0, 8.0, 18.0, 0, ARRAY['japanese', 'yakitori', 'izakaya', 'chicken', 'skewers'], 88),

('STK_YAKINIKU', 'yakiniku-platter', 'Yakiniku Mixed Platter', 'Japanese BBQ selection: karubi, harami, tongue, and vegetables', 'mixed_grill', 'classic', 'japanese', 'other', 350, false, NULL, 'grilled', 'medium', NULL, 'Japan', NULL, 2, ARRAY['rice', 'kimchi', 'lettuce_wraps'], ARRAY['beer', 'sake', 'soju'], ARRAY['ING_BEEF_SHORT_RIB', 'ING_BEEF_SKIRT', 'ING_BEEF_TONGUE', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_GARLIC'], ARRAY['gluten', 'soy', 'sesame'], false, true, true, false, false, false, false, 580, 45.0, 12.0, 38.0, 0, ARRAY['japanese', 'yakiniku', 'bbq', 'interactive', 'sharing'], 90),

('STK_GALBI', 'galbi-korean-bbq-ribs', 'Galbi', 'Korean marinated beef short ribs, sweet and savory with sesame', 'ribs', 'classic', 'korean', 'short_ribs', 400, true, NULL, 'grilled', 'medium', 60, 'South Korea', NULL, 2, ARRAY['rice', 'kimchi', 'lettuce_wraps', 'banchan'], ARRAY['soju', 'beer', 'riesling'], ARRAY['ING_BEEF_SHORT_RIBS', 'ING_SOY_SAUCE', 'ING_SUGAR', 'ING_SESAME_OIL', 'ING_GARLIC', 'ING_ASIAN_PEAR', 'ING_GREEN_ONION'], ARRAY['gluten', 'soy', 'sesame'], false, true, true, false, false, false, false, 650, 48.0, 18.0, 42.0, 0, ARRAY['korean', 'bbq', 'marinated', 'sweet_savory', 'sharing'], 92),

('STK_BULGOGI', 'bulgogi', 'Bulgogi', 'Korean "fire meat" - thinly sliced marinated beef, grilled tableside', 'beef_steak', 'classic', 'korean', 'sirloin', 300, false, NULL, 'grilled', 'well_done', NULL, 'South Korea', NULL, 1, ARRAY['rice', 'kimchi', 'lettuce', 'garlic'], ARRAY['soju', 'beer'], ARRAY['ING_BEEF_SIRLOIN', 'ING_SOY_SAUCE', 'ING_SUGAR', 'ING_SESAME_OIL', 'ING_GARLIC', 'ING_GINGER', 'ING_ASIAN_PEAR'], ARRAY['gluten', 'soy', 'sesame'], false, true, true, false, false, false, false, 450, 35.0, 20.0, 25.0, 1, ARRAY['korean', 'bbq', 'marinated', 'iconic', 'thin_sliced'], 95),

('STK_SAMGYEOPSAL', 'samgyeopsal', 'Samgyeopsal', 'Thick-cut pork belly grilled at the table, wrapped in lettuce', 'pork', 'classic', 'korean', 'belly', 350, false, NULL, 'grilled', 'well_done', NULL, 'South Korea', NULL, 2, ARRAY['lettuce', 'garlic', 'kimchi', 'ssamjang', 'rice'], ARRAY['soju', 'beer'], ARRAY['ING_PORK_BELLY', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_LETTUCE', 'ING_GARLIC', 'ING_GOCHUJANG'], ARRAY['gluten', 'soy', 'sesame'], false, true, true, false, false, false, false, 620, 32.0, 5.0, 52.0, 2, ARRAY['korean', 'pork', 'bbq', 'interactive', 'ssam'], 92),

('STK_SATAY_AYAM', 'satay-ayam', 'Satay Ayam', 'Indonesian chicken satay with peanut sauce and rice cakes', 'skewers', 'classic', 'international', 'other', 200, false, NULL, 'charcoal', 'well_done', NULL, 'Indonesia', NULL, 1, ARRAY['lontong', 'cucumber', 'onion'], ARRAY['beer', 'riesling'], ARRAY['ING_CHICKEN_THIGH', 'ING_TURMERIC', 'ING_CORIANDER', 'ING_CUMIN', 'ING_LEMONGRASS', 'ING_PEANUT', 'ING_SOY_SAUCE'], ARRAY['peanuts', 'soy'], false, true, false, false, false, true, false, 380, 28.0, 18.0, 22.0, 2, ARRAY['indonesian', 'satay', 'skewers', 'peanut_sauce', 'street_food'], 88),

('STK_MOO_PING', 'moo-ping', 'Moo Ping', 'Thai grilled pork skewers with sweet coconut marinade', 'skewers', 'classic', 'international', 'shoulder', 180, false, NULL, 'charcoal', 'well_done', NULL, 'Thailand', NULL, 1, ARRAY['sticky_rice', 'papaya_salad'], ARRAY['beer', 'riesling'], ARRAY['ING_PORK_SHOULDER', 'ING_COCONUT_MILK', 'ING_GARLIC', 'ING_CORIANDER', 'ING_WHITE_PEPPER', 'ING_PALM_SUGAR', 'ING_FISH_SAUCE'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 320, 24.0, 15.0, 18.0, 0, ARRAY['thai', 'street_food', 'skewers', 'sweet', 'popular'], 85);

-- ====================
-- LAMB & GAME (8 records)
-- ====================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_RACK_OF_LAMB', 'rack-of-lamb', 'Rack of Lamb', 'French-trimmed rack of lamb with herb crust, roasted pink', 'lamb', 'classic', 'french', 'rack', 450, true, NULL, 'roasted', 'medium_rare', 54, 'France', NULL, 2, ARRAY['roasted_potatoes', 'green_beans', 'ratatouille'], ARRAY['bordeaux', 'rioja', 'burgundy'], ARRAY['ING_LAMB_RACK', 'ING_DIJON_MUSTARD', 'ING_BREADCRUMBS', 'ING_PARSLEY', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_OLIVE_OIL'], ARRAY['gluten'], false, true, true, false, false, true, false, 680, 52.0, 10.0, 48.0, 0, ARRAY['french', 'elegant', 'herb_crust', 'special_occasion'], 90),

('STK_LAMB_CHOPS', 'grilled-lamb-chops', 'Grilled Lamb Chops', 'Double-cut lamb chops with rosemary and garlic, charred outside, pink inside', 'lamb', 'classic', 'italian', 'chops', 350, true, NULL, 'grilled', 'medium_rare', 54, 'Italy', NULL, 1, ARRAY['roasted_vegetables', 'white_beans'], ARRAY['chianti', 'brunello'], ARRAY['ING_LAMB_CHOPS', 'ING_ROSEMARY', 'ING_GARLIC', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 520, 42.0, 0.0, 38.0, 0, ARRAY['italian', 'simple', 'herb', 'grilled'], 88),

('STK_LEG_OF_LAMB', 'roast-leg-of-lamb', 'Roast Leg of Lamb', 'Bone-in leg of lamb studded with garlic and anchovies, slow roasted', 'lamb', 'classic', 'british', 'leg', 600, true, NULL, 'roasted', 'medium', 60, 'United Kingdom', NULL, 4, ARRAY['roast_potatoes', 'peas', 'carrots', 'mint_sauce'], ARRAY['claret', 'rioja'], ARRAY['ING_LAMB_LEG', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_ANCHOVIES', 'ING_OLIVE_OIL', 'ING_MINT'], ARRAY['fish'], true, true, true, false, false, true, false, 480, 40.0, 2.0, 34.0, 0, ARRAY['british', 'sunday_roast', 'traditional', 'family'], 85),

('STK_LAMB_SHANK', 'braised-lamb-shank', 'Braised Lamb Shank', 'Slow-braised lamb shank until fall-off-the-bone tender, with red wine sauce', 'lamb', 'classic', 'italian', 'shank', 500, true, NULL, 'braised', 'well_done', NULL, 'Italy', NULL, 1, ARRAY['polenta', 'mashed_potatoes', 'gremolata'], ARRAY['barolo', 'brunello', 'amarone'], ARRAY['ING_LAMB_SHANK', 'ING_RED_WINE', 'ING_ONION', 'ING_CARROT', 'ING_CELERY', 'ING_TOMATO', 'ING_ROSEMARY', 'ING_THYME'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 580, 45.0, 8.0, 40.0, 0, ARRAY['italian', 'braised', 'comfort_food', 'winter'], 88),

('STK_SOUVLAKI_LAMB', 'lamb-souvlaki', 'Lamb Souvlaki', 'Greek marinated lamb skewers with oregano, lemon, and olive oil', 'skewers', 'classic', 'international', 'shoulder', 250, false, NULL, 'grilled', 'medium', 60, 'Greece', NULL, 1, ARRAY['pita', 'tzatziki', 'greek_salad', 'fries'], ARRAY['assyrtiko', 'xinomavro'], ARRAY['ING_LAMB_SHOULDER', 'ING_OREGANO', 'ING_LEMON', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_YOGURT', 'ING_CUCUMBER'], ARRAY['dairy'], true, false, true, false, false, true, false, 420, 35.0, 5.0, 28.0, 0, ARRAY['greek', 'skewers', 'mediterranean', 'street_food'], 85),

('STK_VENISON_LOIN', 'venison-loin', 'Venison Loin', 'Pan-seared venison loin with juniper and red wine reduction', 'game', 'signature', 'french', 'other', 200, false, NULL, 'pan_seared', 'medium_rare', 54, 'France', NULL, 1, ARRAY['chestnut_puree', 'sauteed_mushrooms', 'red_cabbage'], ARRAY['pinot_noir', 'barolo', 'syrah'], ARRAY['ING_VENISON', 'ING_JUNIPER', 'ING_THYME', 'ING_BLACK_PEPPER', 'ING_RED_WINE', 'ING_BUTTER', 'ING_LINGONBERRY'], ARRAY['dairy', 'tree_nuts'], true, false, false, false, false, false, false, 280, 35.0, 2.0, 14.0, 0, ARRAY['game', 'lean', 'elegant', 'seasonal', 'autumn'], 78),

('STK_WILD_BOAR', 'wild-boar-chops', 'Wild Boar Chops', 'Grilled wild boar chops with apple and sage, a Tuscan specialty', 'game', 'traditional', 'italian', 'chops', 300, true, NULL, 'grilled', 'medium', 63, 'Italy', 'Tuscany', 1, ARRAY['polenta', 'roasted_apples', 'braised_cabbage'], ARRAY['chianti', 'brunello', 'barolo'], ARRAY['ING_WILD_BOAR', 'ING_SAGE', 'ING_ROSEMARY', 'ING_GARLIC', 'ING_JUNIPER', 'ING_APPLE'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 380, 32.0, 5.0, 26.0, 0, ARRAY['game', 'tuscan', 'rustic', 'autumn', 'wild'], 75),

('STK_DUCK_BREAST', 'duck-breast-magret', 'Duck Breast Magret', 'Pan-seared duck breast with crispy skin, served medium rare with cherry sauce', 'poultry_grill', 'classic', 'french', 'other', 280, false, NULL, 'pan_seared', 'medium_rare', 54, 'France', 'Gascony', 1, ARRAY['potato_gratin', 'sauteed_greens', 'roasted_figs'], ARRAY['pinot_noir', 'burgundy', 'barolo'], ARRAY['ING_DUCK_BREAST', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_CHERRY', 'ING_BUTTER', 'ING_RED_WINE'], ARRAY['dairy'], true, false, true, false, false, false, false, 420, 28.0, 8.0, 32.0, 0, ARRAY['french', 'duck', 'crispy_skin', 'elegant'], 85);

-- ====================
-- RIBS & BBQ (6 records)
-- ====================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_BBQ_BABY_BACK', 'bbq-baby-back-ribs', 'BBQ Baby Back Ribs', 'Slow-smoked baby back ribs with Kansas City-style sweet BBQ sauce', 'ribs', 'classic', 'american', 'other', 600, true, NULL, 'smoked', 'well_done', NULL, 'United States', 'Kansas City', 1, ARRAY['coleslaw', 'baked_beans', 'cornbread', 'pickles'], ARRAY['zinfandel', 'shiraz'], ARRAY['ING_PORK_RIBS', 'ING_PAPRIKA', 'ING_BROWN_SUGAR', 'ING_GARLIC_POWDER', 'ING_CUMIN', 'ING_TOMATO', 'ING_MOLASSES'], ARRAY['gluten'], false, true, true, false, false, false, false, 780, 45.0, 25.0, 55.0, 1, ARRAY['american', 'bbq', 'smoked', 'kansas_city', 'fall_off_bone'], 95),

('STK_SPARE_RIBS_MEMPHIS', 'memphis-dry-rub-ribs', 'Memphis Dry Rub Ribs', 'Spare ribs with Memphis-style dry rub, no sauce, pure smoke flavor', 'ribs', 'classic', 'american', 'other', 700, true, NULL, 'smoked', 'well_done', NULL, 'United States', 'Tennessee', 1, ARRAY['coleslaw', 'baked_beans', 'white_bread'], ARRAY['zinfandel', 'malbec'], ARRAY['ING_PORK_SPARE_RIBS', 'ING_PAPRIKA', 'ING_GARLIC_POWDER', 'ING_ONION_POWDER', 'ING_CUMIN', 'ING_CHILI_POWDER', 'ING_BLACK_PEPPER'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 720, 48.0, 5.0, 58.0, 2, ARRAY['american', 'bbq', 'memphis', 'dry_rub', 'no_sauce'], 88),

('STK_TEXAS_BRISKET', 'texas-smoked-brisket', 'Texas Smoked Brisket', 'Central Texas-style whole brisket, smoked low and slow with just salt and pepper', 'beef_roast', 'classic', 'american', 'brisket', 450, false, NULL, 'smoked', 'well_done', NULL, 'United States', 'Texas', 1, ARRAY['white_bread', 'pickles', 'onions', 'jalapenos'], ARRAY['cabernet_sauvignon', 'zinfandel'], ARRAY['ING_BEEF_BRISKET', 'ING_COARSE_SALT', 'ING_BLACK_PEPPER'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 580, 42.0, 0.0, 45.0, 0, ARRAY['texas', 'bbq', 'smoked', 'simple', 'iconic'], 95),

('STK_PULLED_PORK', 'carolina-pulled-pork', 'Carolina Pulled Pork', 'Slow-smoked pork shoulder pulled and dressed with Carolina vinegar sauce', 'pork', 'classic', 'american', 'shoulder', 300, false, NULL, 'smoked', 'well_done', NULL, 'United States', 'North Carolina', 1, ARRAY['coleslaw', 'hush_puppies', 'baked_beans'], ARRAY['riesling', 'zinfandel'], ARRAY['ING_PORK_SHOULDER', 'ING_PAPRIKA', 'ING_BROWN_SUGAR', 'ING_APPLE_CIDER_VINEGAR', 'ING_CAYENNE'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 420, 35.0, 8.0, 28.0, 1, ARRAY['carolina', 'bbq', 'pulled', 'vinegar_sauce'], 90),

('STK_BURNT_ENDS', 'burnt-ends', 'Burnt Ends', 'Crispy cubes of brisket point, twice-smoked with extra bark', 'beef_steak', 'signature', 'american', 'brisket', 250, false, NULL, 'smoked', 'well_done', NULL, 'United States', 'Kansas City', 1, ARRAY['white_bread', 'pickles'], ARRAY['zinfandel', 'cabernet'], ARRAY['ING_BEEF_BRISKET', 'ING_COARSE_SALT', 'ING_BLACK_PEPPER', 'ING_BROWN_SUGAR'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 450, 28.0, 12.0, 32.0, 0, ARRAY['kansas_city', 'bbq', 'crispy', 'smoky', 'delicacy'], 92),

('STK_ST_LOUIS_RIBS', 'st-louis-style-ribs', 'St. Louis Style Ribs', 'Trimmed spare ribs for even cooking, glazed with sweet-tangy sauce', 'ribs', 'classic', 'american', 'other', 650, true, NULL, 'smoked', 'well_done', NULL, 'United States', 'Missouri', 1, ARRAY['coleslaw', 'fries', 'corn_on_cob'], ARRAY['zinfandel', 'shiraz'], ARRAY['ING_PORK_SPARE_RIBS', 'ING_PAPRIKA', 'ING_GARLIC_POWDER', 'ING_BROWN_SUGAR', 'ING_TOMATO', 'ING_MOLASSES'], ARRAY['gluten'], false, true, true, false, false, false, false, 750, 46.0, 22.0, 52.0, 1, ARRAY['st_louis', 'bbq', 'ribs', 'glazed'], 88);

-- ====================
-- MIDDLE EASTERN GRILLS (8 records)
-- ====================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_ADANA_KEBAB', 'adana-kebab', 'Adana Kebab', 'Spicy minced lamb kebab from Adana, grilled on flat skewers over charcoal', 'skewers', 'classic', 'turkish', 'shoulder', 300, false, NULL, 'grilled', 'well_done', NULL, 'Turkey', 'Adana', 1, ARRAY['rice_pilaf', 'grilled_vegetables', 'flatbread', 'onion_salad'], ARRAY['shiraz', 'grenache'], ARRAY['ING_LAMB_GROUND', 'ING_RED_PEPPER_FLAKES', 'ING_CUMIN', 'ING_SUMAC', 'ING_GARLIC', 'ING_ONION', 'ING_PARSLEY'], ARRAY['dairy'], true, false, true, false, false, true, false, 420, 32.0, 5.0, 30.0, 3, ARRAY['turkish', 'kebab', 'spicy', 'street_food'], 90),

('STK_ISKENDER_KEBAB', 'iskender-kebab', 'Iskender Kebab', 'Thinly sliced doner lamb over pide bread with tomato sauce and melted butter', 'lamb', 'classic', 'turkish', 'leg', 350, false, NULL, 'grilled', 'well_done', NULL, 'Turkey', 'Bursa', 1, ARRAY['pide_bread', 'grilled_peppers'], ARRAY['merlot', 'tempranillo'], ARRAY['ING_LAMB_LEG', 'ING_TOMATO', 'ING_BUTTER', 'ING_YOGURT', 'ING_PIDE_BREAD', 'ING_OREGANO'], ARRAY['gluten', 'dairy'], false, false, true, false, false, true, false, 650, 40.0, 35.0, 40.0, 1, ARRAY['turkish', 'doner', 'bursa', 'rich'], 88),

('STK_SHISH_KEBAB', 'shish-kebab', 'Shish Kebab', 'Marinated lamb cubes grilled on skewers with vegetables', 'skewers', 'classic', 'turkish', 'leg', 280, false, NULL, 'grilled', 'medium', 60, 'Turkey', NULL, 1, ARRAY['rice', 'grilled_vegetables', 'pita'], ARRAY['malbec', 'shiraz'], ARRAY['ING_LAMB_LEG', 'ING_OLIVE_OIL', 'ING_LEMON', 'ING_OREGANO', 'ING_GARLIC', 'ING_BELL_PEPPER', 'ING_ONION'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 380, 35.0, 8.0, 24.0, 0, ARRAY['turkish', 'skewers', 'classic', 'grilled'], 90),

('STK_SHAWARMA_LAMB', 'lamb-shawarma', 'Lamb Shawarma', 'Slow-roasted spiced lamb shaved from vertical spit, Middle Eastern style', 'lamb', 'classic', 'middle_eastern', 'shoulder', 250, false, NULL, 'grilled', 'well_done', NULL, 'Lebanon', NULL, 1, ARRAY['pita', 'hummus', 'tabbouleh', 'pickles'], ARRAY['grenache', 'mourvedre'], ARRAY['ING_LAMB_SHOULDER', 'ING_CUMIN', 'ING_CORIANDER', 'ING_TURMERIC', 'ING_CINNAMON', 'ING_TAHINI', 'ING_GARLIC'], ARRAY['sesame'], true, true, false, false, false, true, false, 450, 30.0, 10.0, 32.0, 1, ARRAY['lebanese', 'shawarma', 'street_food', 'spiced'], 92),

('STK_KAFTA_MESHWI', 'kafta-meshwi', 'Kafta Meshwi', 'Lebanese grilled minced meat skewers with parsley and onion', 'skewers', 'classic', 'middle_eastern', 'shoulder', 250, false, NULL, 'grilled', 'well_done', NULL, 'Lebanon', NULL, 1, ARRAY['hummus', 'tabbouleh', 'pita', 'grilled_tomato'], ARRAY['cabernet_franc', 'merlot'], ARRAY['ING_LAMB_GROUND', 'ING_BEEF_GROUND', 'ING_PARSLEY', 'ING_ONION', 'ING_ALLSPICE', 'ING_CINNAMON'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 350, 28.0, 5.0, 25.0, 0, ARRAY['lebanese', 'kafta', 'grilled', 'mezze'], 88),

('STK_MIXED_GRILL_ARAB', 'arabic-mixed-grill', 'Arabic Mixed Grill', 'Assortment of grilled meats: shish taouk, kafta, lamb chops, and kebab', 'mixed_grill', 'signature', 'middle_eastern', 'other', 500, true, NULL, 'grilled', 'medium', NULL, 'Lebanon', NULL, 2, ARRAY['rice', 'grilled_vegetables', 'fattoush', 'pita'], ARRAY['syrah', 'grenache'], ARRAY['ING_CHICKEN_BREAST', 'ING_LAMB_CHOPS', 'ING_LAMB_GROUND', 'ING_GARLIC', 'ING_LEMON', 'ING_SEVEN_SPICE'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 750, 60.0, 10.0, 52.0, 1, ARRAY['lebanese', 'mixed_grill', 'feast', 'sharing'], 90),

('STK_CHELO_KABAB', 'chelo-kabab', 'Chelo Kabab', 'Persian national dish: saffron rice with grilled koobideh and barg kebabs', 'mixed_grill', 'classic', 'persian', 'tenderloin', 350, false, NULL, 'grilled', 'medium', 60, 'Iran', NULL, 1, ARRAY['saffron_rice', 'grilled_tomato', 'raw_onion', 'butter'], ARRAY['pinot_noir', 'grenache'], ARRAY['ING_BEEF_TENDERLOIN', 'ING_LAMB_GROUND', 'ING_SAFFRON', 'ING_BUTTER', 'ING_SUMAC', 'ING_RICE'], ARRAY['dairy'], true, false, true, false, false, true, false, 680, 45.0, 55.0, 32.0, 0, ARRAY['persian', 'national_dish', 'saffron', 'elegant'], 88),

('STK_JOOJEH_KABAB', 'joojeh-kabab', 'Joojeh Kabab', 'Persian saffron and lemon marinated chicken kebab', 'poultry_grill', 'classic', 'persian', 'other', 280, true, NULL, 'grilled', 'well_done', NULL, 'Iran', NULL, 1, ARRAY['saffron_rice', 'grilled_tomato', 'lavash'], ARRAY['viognier', 'chardonnay'], ARRAY['ING_CHICKEN_THIGH', 'ING_SAFFRON', 'ING_LEMON', 'ING_ONION', 'ING_YOGURT', 'ING_OLIVE_OIL'], ARRAY['dairy'], true, false, true, false, false, true, false, 320, 35.0, 5.0, 18.0, 0, ARRAY['persian', 'chicken', 'saffron', 'grilled'], 85);

-- ====================
-- EUROPEAN GRILLS (9 records)
-- ====================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_WIENER_SCHNITZEL', 'wiener-schnitzel', 'Wiener Schnitzel', 'Classic Viennese breaded veal cutlet, pounded thin and fried golden', 'veal', 'classic', 'german', 'other', 200, false, NULL, 'pan_seared', 'well_done', NULL, 'Austria', 'Vienna', 1, ARRAY['potato_salad', 'lingonberry', 'lemon_wedge', 'parsley_potatoes'], ARRAY['gruner_veltliner', 'riesling'], ARRAY['ING_VEAL_CUTLET', 'ING_BREADCRUMBS', 'ING_EGG', 'ING_FLOUR', 'ING_BUTTER', 'ING_LEMON'], ARRAY['gluten', 'eggs', 'dairy'], false, false, true, false, false, false, false, 520, 35.0, 25.0, 32.0, 0, ARRAY['austrian', 'breaded', 'fried', 'classic'], 92),

('STK_SCHWEINSHAXE', 'schweinshaxe', 'Schweinshaxe', 'Bavarian roasted pork knuckle with ultra-crispy crackling skin', 'pork', 'traditional', 'german', 'shank', 800, true, NULL, 'roasted', 'well_done', NULL, 'Germany', 'Bavaria', 1, ARRAY['sauerkraut', 'potato_dumplings', 'pretzel', 'mustard'], ARRAY['riesling', 'gewurztraminer'], ARRAY['ING_PORK_SHANK', 'ING_CARAWAY', 'ING_GARLIC', 'ING_MARJORAM', 'ING_SEA_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 950, 65.0, 5.0, 75.0, 0, ARRAY['german', 'bavarian', 'crispy_skin', 'beer_hall'], 85),

('STK_SAUERBRATEN', 'sauerbraten', 'Sauerbraten', 'German pot roast marinated in vinegar and spices for days, served with gingersnap gravy', 'beef_roast', 'classic', 'german', 'round', 350, false, NULL, 'braised', 'well_done', NULL, 'Germany', 'Rhineland', 1, ARRAY['red_cabbage', 'potato_dumplings', 'spaetzle'], ARRAY['spatburgunder', 'riesling'], ARRAY['ING_BEEF_ROUND', 'ING_RED_WINE_VINEGAR', 'ING_JUNIPER', 'ING_BAY_LEAF', 'ING_CLOVES', 'ING_GINGER'], ARRAY['gluten'], false, true, true, false, false, false, false, 480, 38.0, 20.0, 28.0, 0, ARRAY['german', 'braised', 'marinated', 'comfort_food'], 78),

('STK_ROAST_BEEF', 'sunday-roast-beef', 'Sunday Roast Beef', 'Traditional British roast beef with Yorkshire pudding, roast potatoes, and gravy', 'beef_roast', 'classic', 'british', 'rib', 300, false, NULL, 'roasted', 'medium_rare', 54, 'United Kingdom', NULL, 1, ARRAY['yorkshire_pudding', 'roast_potatoes', 'peas', 'carrots', 'horseradish'], ARRAY['claret', 'rioja', 'burgundy'], ARRAY['ING_BEEF_RIB', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_MUSTARD_POWDER', 'ING_BEEF_DRIPPINGS'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, false, false, 680, 45.0, 35.0, 40.0, 0, ARRAY['british', 'sunday_roast', 'traditional', 'family'], 90),

('STK_BEEF_WELLINGTON', 'beef-wellington', 'Beef Wellington', 'Beef tenderloin wrapped in mushroom duxelles and puff pastry, baked until golden', 'beef_roast', 'signature', 'british', 'tenderloin', 280, false, NULL, 'roasted', 'medium_rare', 52, 'United Kingdom', NULL, 1, ARRAY['green_beans', 'fondant_potatoes', 'red_wine_jus'], ARRAY['bordeaux', 'burgundy', 'barolo'], ARRAY['ING_BEEF_TENDERLOIN', 'ING_PUFF_PASTRY', 'ING_MUSHROOM', 'ING_PROSCIUTTO', 'ING_DIJON_MUSTARD', 'ING_EGG', 'ING_SHALLOT'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, false, false, 720, 42.0, 30.0, 48.0, 0, ARRAY['british', 'fine_dining', 'showpiece', 'special_occasion'], 92),

('STK_STEAK_FRITES', 'steak-frites', 'Steak Frites', 'Classic French bistro dish: pan-seared steak with crispy fries and bearnaise', 'beef_steak', 'classic', 'french', 'sirloin', 250, false, NULL, 'pan_seared', 'medium_rare', 54, 'France', NULL, 1, ARRAY['frites', 'green_salad'], ARRAY['bordeaux', 'cotes_du_rhone', 'burgundy'], ARRAY['ING_BEEF_SIRLOIN', 'ING_BUTTER', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_POTATO', 'ING_TARRAGON', 'ING_EGG_YOLK'], ARRAY['dairy', 'eggs'], false, false, true, false, false, false, false, 750, 40.0, 45.0, 48.0, 0, ARRAY['french', 'bistro', 'classic', 'simple'], 92),

('STK_ENTRECOTE_BORDELAISE', 'entrecote-bordelaise', 'Entrecote Bordelaise', 'Ribeye steak with classic Bordeaux red wine and shallot sauce', 'beef_steak', 'classic', 'french', 'ribeye', 300, false, NULL, 'pan_seared', 'medium_rare', 54, 'France', 'Bordeaux', 1, ARRAY['pommes_sarladaises', 'haricots_verts'], ARRAY['bordeaux', 'saint_emilion', 'pomerol'], ARRAY['ING_BEEF_RIBEYE', 'ING_RED_WINE', 'ING_SHALLOT', 'ING_BONE_MARROW', 'ING_BUTTER', 'ING_THYME'], ARRAY['dairy'], true, false, true, false, false, false, false, 580, 45.0, 5.0, 42.0, 0, ARRAY['french', 'bordeaux', 'wine_sauce', 'elegant'], 88),

('STK_CHULETON', 'chuleton-vasco', 'Chuleton Vasco', 'Massive Basque-style bone-in ribeye, aged and grilled over charcoal', 'beef_steak', 'signature', 'spanish', 'ribeye', 800, true, NULL, 'grilled', 'rare', 50, 'Spain', 'Basque Country', 2, ARRAY['pimientos_padron', 'patatas_fritas'], ARRAY['rioja', 'ribera_del_duero', 'txakoli'], ARRAY['ING_BEEF_RIBEYE', 'ING_COARSE_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 950, 70.0, 0.0, 75.0, 0, ARRAY['spanish', 'basque', 'massive', 'charcoal', 'sharing'], 92),

('STK_SECRETO_IBERICO', 'secreto-iberico', 'Secreto Iberico', 'Hidden cut from Iberian pig, intensely marbled and grilled simply', 'pork', 'signature', 'spanish', 'other', 200, false, NULL, 'grilled', 'medium', 63, 'Spain', NULL, 1, ARRAY['pimientos_padron', 'pan_con_tomate'], ARRAY['tempranillo', 'garnacha', 'mencia'], ARRAY['ING_PORK_IBERICO', 'ING_SEA_SALT', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 380, 25.0, 0.0, 32.0, 0, ARRAY['spanish', 'iberico', 'rare_cut', 'marbled'], 85);

-- ====================
-- POULTRY GRILLS (7 records)
-- ====================

INSERT INTO steaks (id, slug, name, description, category, status, style, cut, weight_g, bone_in, grade, cooking_method, recommended_doneness, internal_temp_c, origin_country, origin_region, serves, recommended_sides, wine_pairing, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('STK_ROAST_CHICKEN', 'classic-roast-chicken', 'Classic Roast Chicken', 'Whole roasted chicken with crispy skin, herb butter under the skin', 'poultry_grill', 'classic', 'french', 'other', 400, true, NULL, 'roasted', 'well_done', 74, 'France', NULL, 1, ARRAY['roast_potatoes', 'green_salad', 'roasted_vegetables'], ARRAY['chardonnay', 'burgundy', 'beaujolais'], ARRAY['ING_WHOLE_CHICKEN', 'ING_BUTTER', 'ING_THYME', 'ING_ROSEMARY', 'ING_GARLIC', 'ING_LEMON'], ARRAY['dairy'], true, false, true, false, false, true, false, 450, 42.0, 2.0, 30.0, 0, ARRAY['french', 'roasted', 'classic', 'comfort_food'], 92),

('STK_POLLO_ALLA_DIAVOLA', 'pollo-alla-diavola', 'Pollo alla Diavola', 'Italian spatchcocked chicken with chili flakes, grilled crispy', 'poultry_grill', 'classic', 'italian', 'other', 450, true, NULL, 'grilled', 'well_done', 74, 'Italy', 'Tuscany', 1, ARRAY['rosemary_potatoes', 'arugula_salad'], ARRAY['chianti', 'vernaccia', 'vermentino'], ARRAY['ING_WHOLE_CHICKEN', 'ING_RED_PEPPER_FLAKES', 'ING_GARLIC', 'ING_ROSEMARY', 'ING_LEMON', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 480, 45.0, 2.0, 32.0, 2, ARRAY['italian', 'spicy', 'grilled', 'spatchcock'], 88),

('STK_PIRI_PIRI_CHICKEN', 'piri-piri-chicken', 'Piri Piri Chicken', 'Portuguese-African spicy grilled chicken with bird''s eye chili marinade', 'poultry_grill', 'classic', 'portuguese', 'other', 400, true, NULL, 'grilled', 'well_done', 74, 'Portugal', NULL, 1, ARRAY['fries', 'coleslaw', 'grilled_corn'], ARRAY['vinho_verde', 'rose', 'beer'], ARRAY['ING_WHOLE_CHICKEN', 'ING_BIRDS_EYE_CHILI', 'ING_GARLIC', 'ING_PAPRIKA', 'ING_OREGANO', 'ING_LEMON', 'ING_OLIVE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 420, 40.0, 5.0, 26.0, 4, ARRAY['portuguese', 'spicy', 'grilled', 'african_influence'], 92),

('STK_TANDOORI_CHICKEN', 'tandoori-chicken', 'Tandoori Chicken', 'Indian spiced chicken marinated in yogurt and spices, cooked in clay oven', 'poultry_grill', 'classic', 'indian', 'other', 350, true, NULL, 'grilled', 'well_done', 74, 'India', 'Punjab', 1, ARRAY['naan', 'rice', 'onion_salad', 'lemon_wedge'], ARRAY['gewurztraminer', 'riesling', 'rose'], ARRAY['ING_CHICKEN_THIGH', 'ING_YOGURT', 'ING_TANDOORI_MASALA', 'ING_GINGER', 'ING_GARLIC', 'ING_CUMIN', 'ING_CORIANDER'], ARRAY['dairy'], true, false, true, false, false, true, false, 380, 38.0, 8.0, 22.0, 2, ARRAY['indian', 'tandoor', 'spiced', 'yogurt_marinade'], 92),

('STK_JERK_CHICKEN', 'jamaican-jerk-chicken', 'Jamaican Jerk Chicken', 'Caribbean spiced chicken with scotch bonnet, allspice, and thyme', 'poultry_grill', 'classic', 'jamaican', 'other', 380, true, NULL, 'grilled', 'well_done', 74, 'Jamaica', NULL, 1, ARRAY['rice_and_peas', 'festival', 'coleslaw', 'plantain'], ARRAY['riesling', 'gewurztraminer', 'beer'], ARRAY['ING_CHICKEN_LEG', 'ING_SCOTCH_BONNET', 'ING_ALLSPICE', 'ING_THYME', 'ING_SCALLION', 'ING_GINGER', 'ING_SOY_SAUCE'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 400, 38.0, 6.0, 24.0, 4, ARRAY['jamaican', 'caribbean', 'spicy', 'smoky'], 90),

('STK_CHICKEN_PARMIGIANA', 'chicken-parmigiana', 'Chicken Parmigiana', 'Breaded chicken cutlet topped with tomato sauce and melted mozzarella', 'poultry_grill', 'classic', 'italian', 'other', 250, false, NULL, 'pan_seared', 'well_done', NULL, 'Italy', NULL, 1, ARRAY['spaghetti', 'caesar_salad'], ARRAY['chianti', 'montepulciano', 'barbera'], ARRAY['ING_CHICKEN_BREAST', 'ING_BREADCRUMBS', 'ING_EGG', 'ING_MOZZARELLA', 'ING_PARMESAN', 'ING_TOMATO_SAUCE', 'ING_BASIL'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, true, false, 580, 42.0, 30.0, 32.0, 0, ARRAY['italian_american', 'breaded', 'cheesy', 'comfort_food'], 92),

('STK_ROAST_TURKEY', 'roast-turkey', 'Roast Turkey', 'Traditional roasted turkey with herb butter and pan gravy', 'poultry_grill', 'classic', 'american', 'other', 350, true, NULL, 'roasted', 'well_done', 74, 'United States', NULL, 1, ARRAY['stuffing', 'mashed_potatoes', 'cranberry_sauce', 'green_beans'], ARRAY['pinot_noir', 'chardonnay', 'zinfandel'], ARRAY['ING_TURKEY', 'ING_BUTTER', 'ING_SAGE', 'ING_THYME', 'ING_ROSEMARY', 'ING_ONION', 'ING_CELERY'], ARRAY['dairy'], true, false, true, false, false, true, false, 380, 45.0, 0.0, 20.0, 0, ARRAY['american', 'thanksgiving', 'holiday', 'traditional'], 85);

-- ====================
-- VERIFY COUNT
-- ====================
-- SELECT COUNT(*) FROM steaks; -- Should be 74 records

-- Expected breakdown:
-- Beef Steaks: 10
-- Italian Grills: 8
-- South American: 9
-- Asian Grills: 9
-- Lamb & Game: 8
-- Ribs & BBQ: 6
-- Middle Eastern: 8
-- European: 9
-- Poultry: 7
-- TOTAL: 74

