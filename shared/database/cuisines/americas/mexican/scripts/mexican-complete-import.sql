-- ============================================
-- GUDBRO Mexican Complete Import
-- Version: 1.1 - TEXT + CHECK (no ENUM)
-- Aligned to DATABASE-STANDARDS v1.1
-- Generated: 2025-12-18
-- Updated: 2025-12-20 - Added legacy ENUM cleanup
-- ============================================
-- Contains: Schema + 66 Mexican dishes
-- Categories: tacos(10) + burritos(6) + enchiladas(7) + antojitos(15) + main_dishes(16) + sides_salsas(12)
-- ============================================

-- ============================================
-- CLEANUP LEGACY ENUMS (pre-v1.1 compatibility)
-- These ENUMs were used before the TEXT + CHECK standard
-- ============================================
DROP TYPE IF EXISTS taco_status CASCADE;
DROP TYPE IF EXISTS mexican_status CASCADE;
DROP TYPE IF EXISTS mexican_category CASCADE;
DROP TYPE IF EXISTS mexican_region CASCADE;
DROP TYPE IF EXISTS mexican_protein_type CASCADE;
DROP TYPE IF EXISTS mexican_tortilla_type CASCADE;

-- ============================================
-- GUDBRO Mexican Schema
-- Version: 1.1 - TEXT + CHECK (no ENUM)
-- Aligned to DATABASE-STANDARDS v1.1
-- ============================================

-- Drop existing table if exists (for fresh import)
DROP TABLE IF EXISTS mexican CASCADE;

-- Create table
CREATE TABLE mexican (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- INFO BASE (English only)
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  spanish_name TEXT,

  -- CLASSIFICATION - TEXT + CHECK (not ENUM!)
  category TEXT NOT NULL
    CHECK (category IN ('tacos', 'burritos', 'enchiladas', 'antojitos', 'main_dishes', 'sides_salsas')),

  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional')),

  -- MEXICAN-SPECIFIC FIELDS
  region TEXT NOT NULL DEFAULT 'central'
    CHECK (region IN ('northern', 'central', 'yucatan', 'oaxaca', 'coastal', 'western', 'tex_mex', 'international')),

  protein_type TEXT NOT NULL DEFAULT 'mixed'
    CHECK (protein_type IN ('beef', 'pork', 'chicken', 'fish', 'shrimp', 'chorizo', 'goat', 'cheese', 'beans', 'vegetarian', 'mixed')),

  tortilla_type TEXT NOT NULL DEFAULT 'corn'
    CHECK (tortilla_type IN ('corn', 'flour', 'none')),

  is_street_food BOOLEAN NOT NULL DEFAULT false,
  cooking_method TEXT,
  heat_source TEXT,

  -- INGREDIENTI
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - ALLERGENI
  allergens TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - DIETARY FLAGS
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_dairy_free BOOLEAN NOT NULL DEFAULT false,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_halal BOOLEAN NOT NULL DEFAULT false,
  is_kosher BOOLEAN NOT NULL DEFAULT false,

  -- SISTEMA 5 DIMENSIONI - NUTRITION
  calories_per_serving INTEGER,
  protein_g DECIMAL(5,1),
  carbs_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),

  -- SISTEMA 5 DIMENSIONI - SPICE
  spice_level INTEGER NOT NULL DEFAULT 0
    CHECK (spice_level >= 0 AND spice_level <= 5),

  -- METADATA
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50
    CHECK (popularity >= 0 AND popularity <= 100),

  -- TIMESTAMPS
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_mexican_category ON mexican(category);
CREATE INDEX IF NOT EXISTS idx_mexican_region ON mexican(region);
CREATE INDEX IF NOT EXISTS idx_mexican_protein ON mexican(protein_type);
CREATE INDEX IF NOT EXISTS idx_mexican_popularity ON mexican(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_mexican_tags ON mexican USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_mexican_ingredient_ids ON mexican USING GIN(ingredient_ids);
CREATE INDEX IF NOT EXISTS idx_mexican_allergens ON mexican USING GIN(allergens);

-- Partial indexes for common filters
CREATE INDEX IF NOT EXISTS idx_mexican_vegan ON mexican(is_vegan) WHERE is_vegan = true;
CREATE INDEX IF NOT EXISTS idx_mexican_vegetarian ON mexican(is_vegetarian) WHERE is_vegetarian = true;
CREATE INDEX IF NOT EXISTS idx_mexican_gluten_free ON mexican(is_gluten_free) WHERE is_gluten_free = true;
CREATE INDEX IF NOT EXISTS idx_mexican_street_food ON mexican(is_street_food) WHERE is_street_food = true;

-- RLS (Row Level Security)
ALTER TABLE mexican ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access" ON mexican;
CREATE POLICY "Public read access" ON mexican
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON mexican;
CREATE POLICY "Service write access" ON mexican
  FOR ALL USING (auth.role() = 'service_role');

-- TRIGGER updated_at
CREATE OR REPLACE FUNCTION update_mexican_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mexican_updated_at ON mexican;
CREATE TRIGGER mexican_updated_at
  BEFORE UPDATE ON mexican
  FOR EACH ROW
  EXECUTE FUNCTION update_mexican_updated_at();

-- COMMENT
COMMENT ON TABLE mexican IS 'GUDBRO Mexican cuisine catalog - 66 dishes, DATABASE-STANDARDS v1.1, Sistema 5 Dimensioni compliant';

-- ============================================
-- INSERT STATEMENTS - 66 Mexican Dishes
-- ============================================

INSERT INTO mexican (id, slug, name, description, spanish_name, category, status, region, protein_type, tortilla_type, is_street_food, cooking_method, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
-- ============================================
-- TACOS (10 items)
-- ============================================
('MEX_TACO_AL_PASTOR', 'taco-al-pastor', 'Tacos al Pastor', 'Iconic Mexico City tacos with spit-roasted pork marinated in achiote and dried chiles, topped with pineapple, onion, and cilantro on corn tortillas.', 'Tacos al Pastor', 'tacos', 'classic', 'central', 'pork', 'corn', true, 'spit-roasted', '{ING_PORK_SHOULDER,ING_ACHIOTE,ING_PINEAPPLE,ING_ONION,ING_CILANTRO,ING_CORN_TORTILLA,ING_LIME}', '{}', true, true, true, false, false, false, false, 320, 18.0, 28.0, 14.0, 2, '{iconic,street-food,mexico-city,pork}', 98),
('MEX_TACO_CARNE_ASADA', 'taco-carne-asada', 'Tacos de Carne Asada', 'Northern-style tacos with grilled marinated beef, typically skirt or flank steak, served with salsa, onion, and cilantro.', 'Tacos de Carne Asada', 'tacos', 'classic', 'northern', 'beef', 'flour', true, 'grilled', '{ING_BEEF_SKIRT,ING_LIME,ING_GARLIC,ING_CUMIN,ING_ONION,ING_CILANTRO,ING_FLOUR_TORTILLA}', '{gluten}', false, true, true, false, false, true, false, 350, 24.0, 26.0, 16.0, 1, '{grilled,northern,beef}', 95),
('MEX_TACO_CARNITAS', 'taco-carnitas', 'Tacos de Carnitas', 'Michoacán specialty featuring slow-braised pork cooked in its own fat until crispy and tender, served with salsa verde and fresh onion.', 'Tacos de Carnitas', 'tacos', 'traditional', 'western', 'pork', 'corn', true, 'braised', '{ING_PORK_SHOULDER,ING_LARD,ING_ORANGE,ING_BAY_LEAVES,ING_CORN_TORTILLA,ING_SALSA_VERDE,ING_ONION}', '{}', true, true, true, false, false, false, false, 380, 22.0, 24.0, 22.0, 1, '{michoacan,braised,crispy,pork}', 92),
('MEX_TACO_BARBACOA', 'taco-barbacoa', 'Tacos de Barbacoa', 'Traditional slow-cooked beef (traditionally lamb or goat) wrapped in maguey leaves, steamed until fall-apart tender, served with consommé on the side.', 'Tacos de Barbacoa', 'tacos', 'traditional', 'central', 'beef', 'corn', true, 'steamed', '{ING_BEEF_CHEEK,ING_CHIPOTLE,ING_CUMIN,ING_BAY_LEAVES,ING_GARLIC,ING_CORN_TORTILLA,ING_ONION,ING_CILANTRO}', '{}', true, true, true, false, false, true, false, 340, 26.0, 22.0, 18.0, 2, '{slow-cooked,weekend,traditional}', 90),
('MEX_TACO_BIRRIA', 'taco-birria', 'Tacos de Birria', 'Jalisco specialty featuring slow-braised beef in a rich chile consommé, served with the cooking broth for dipping (quesabirria style).', 'Tacos de Birria', 'tacos', 'popular', 'western', 'beef', 'corn', true, 'braised', '{ING_BEEF_CHUCK,ING_GUAJILLO_CHILE,ING_ANCHO_CHILE,ING_TOMATO,ING_ONION,ING_GARLIC,ING_CORN_TORTILLA,ING_OAXACA_CHEESE}', '{milk}', true, false, true, false, false, true, false, 420, 28.0, 26.0, 24.0, 3, '{jalisco,braised,trending,consomme}', 94),
('MEX_TACO_PESCADO', 'taco-pescado', 'Fish Tacos', 'Baja California specialty with beer-battered or grilled white fish, topped with cabbage slaw, crema, and pico de gallo.', 'Tacos de Pescado', 'tacos', 'classic', 'coastal', 'fish', 'corn', true, 'fried', '{ING_WHITE_FISH,ING_FLOUR,ING_BEER,ING_CABBAGE,ING_CREMA,ING_LIME,ING_CORN_TORTILLA,ING_PICO_DE_GALLO}', '{fish,gluten,milk}', false, false, true, false, false, true, false, 310, 20.0, 30.0, 14.0, 1, '{baja,coastal,fish,crispy}', 88),
('MEX_TACO_CAMARONES', 'taco-camarones', 'Shrimp Tacos', 'Coastal tacos with grilled or sautéed shrimp, avocado, chipotle mayo, and fresh lime.', 'Tacos de Camarones', 'tacos', 'popular', 'coastal', 'shrimp', 'corn', true, 'grilled', '{ING_SHRIMP,ING_GARLIC,ING_LIME,ING_AVOCADO,ING_CHIPOTLE,ING_MAYONNAISE,ING_CORN_TORTILLA,ING_CILANTRO}', '{crustaceans,eggs}', true, true, true, false, false, true, false, 290, 22.0, 24.0, 12.0, 2, '{coastal,shrimp,seafood}', 85),
('MEX_TACO_CHORIZO', 'taco-chorizo', 'Tacos de Chorizo', 'Spicy Mexican chorizo sausage crumbled and cooked until crispy, served with potato, onion, and salsa verde.', 'Tacos de Chorizo', 'tacos', 'classic', 'central', 'chorizo', 'corn', true, 'pan-fried', '{ING_CHORIZO,ING_POTATO,ING_ONION,ING_SALSA_VERDE,ING_CORN_TORTILLA,ING_CILANTRO}', '{}', true, true, true, false, false, false, false, 360, 16.0, 28.0, 20.0, 3, '{chorizo,spicy,breakfast}', 82),
('MEX_TACO_LENGUA', 'taco-lengua', 'Tacos de Lengua', 'Traditional beef tongue tacos, slow-braised until tender, sliced thin and served with salsa verde and onion.', 'Tacos de Lengua', 'tacos', 'traditional', 'central', 'beef', 'corn', true, 'braised', '{ING_BEEF_TONGUE,ING_ONION,ING_GARLIC,ING_BAY_LEAVES,ING_CORN_TORTILLA,ING_SALSA_VERDE,ING_CILANTRO}', '{}', true, true, true, false, false, true, false, 280, 20.0, 22.0, 14.0, 1, '{offal,traditional,braised}', 75),
('MEX_TACO_SUADERO', 'taco-suadero', 'Tacos de Suadero', 'Mexico City street taco staple featuring thin-sliced beef brisket cooked on a flat-top griddle until crispy edges form.', 'Tacos de Suadero', 'tacos', 'traditional', 'central', 'beef', 'corn', true, 'griddled', '{ING_BEEF_BRISKET,ING_LARD,ING_CORN_TORTILLA,ING_ONION,ING_CILANTRO,ING_SALSA_VERDE,ING_LIME}', '{}', true, true, true, false, false, true, false, 300, 22.0, 24.0, 14.0, 1, '{mexico-city,street-food,crispy}', 78),

-- ============================================
-- BURRITOS (6 items)
-- ============================================
('MEX_BURRITO_CARNE_ASADA', 'burrito-carne-asada', 'Carne Asada Burrito', 'Large flour tortilla filled with grilled marinated beef, rice, beans, guacamole, sour cream, and salsa.', 'Burrito de Carne Asada', 'burritos', 'classic', 'northern', 'beef', 'flour', false, 'grilled', '{ING_BEEF_SKIRT,ING_FLOUR_TORTILLA,ING_RICE,ING_REFRIED_BEANS,ING_GUACAMOLE,ING_SOUR_CREAM,ING_PICO_DE_GALLO,ING_CHEESE}', '{gluten,milk}', false, false, true, false, false, true, false, 680, 38.0, 58.0, 32.0, 1, '{northern,hearty,beef}', 92),
('MEX_BURRITO_POLLO', 'burrito-pollo', 'Chicken Burrito', 'Flour tortilla stuffed with seasoned grilled chicken, Mexican rice, black beans, cheese, lettuce, and salsa.', 'Burrito de Pollo', 'burritos', 'popular', 'tex_mex', 'chicken', 'flour', false, 'grilled', '{ING_CHICKEN_BREAST,ING_FLOUR_TORTILLA,ING_RICE,ING_BLACK_BEANS,ING_CHEESE,ING_LETTUCE,ING_SALSA_ROJA,ING_LIME}', '{gluten,milk}', false, false, true, false, false, true, false, 620, 42.0, 56.0, 24.0, 1, '{chicken,popular}', 90),
('MEX_BURRITO_CARNITAS', 'burrito-carnitas', 'Carnitas Burrito', 'Slow-braised pork carnitas wrapped with cilantro rice, pinto beans, salsa verde, and crema in a large flour tortilla.', 'Burrito de Carnitas', 'burritos', 'classic', 'western', 'pork', 'flour', false, 'braised', '{ING_PORK_SHOULDER,ING_FLOUR_TORTILLA,ING_RICE,ING_PINTO_BEANS,ING_SALSA_VERDE,ING_CREMA,ING_CILANTRO,ING_ONION}', '{gluten,milk}', false, false, true, false, false, false, false, 720, 36.0, 62.0, 34.0, 1, '{pork,michoacan,hearty}', 88),
('MEX_BURRITO_CALIFORNIA', 'burrito-california', 'California Burrito', 'San Diego specialty with carne asada, French fries, cheese, guacamole, and sour cream - no rice or beans.', 'Burrito California', 'burritos', 'signature', 'tex_mex', 'beef', 'flour', false, 'grilled', '{ING_BEEF_SKIRT,ING_FLOUR_TORTILLA,ING_FRENCH_FRIES,ING_CHEESE,ING_GUACAMOLE,ING_SOUR_CREAM,ING_PICO_DE_GALLO}', '{gluten,milk}', false, false, true, false, false, true, false, 820, 40.0, 68.0, 42.0, 1, '{california,fries,signature}', 85),
('MEX_BURRITO_BEAN_CHEESE', 'burrito-bean-cheese', 'Bean and Cheese Burrito', 'Simple and satisfying vegetarian burrito with refried beans and melted cheese, perfect for a quick meal.', 'Burrito de Frijoles y Queso', 'burritos', 'classic', 'northern', 'beans', 'flour', true, 'griddled', '{ING_REFRIED_BEANS,ING_FLOUR_TORTILLA,ING_CHEESE,ING_SALSA_ROJA}', '{gluten,milk}', false, false, true, false, true, true, true, 420, 16.0, 52.0, 18.0, 0, '{vegetarian,simple,classic}', 78),
('MEX_BURRITO_WET', 'burrito-wet', 'Wet Burrito', 'Burrito smothered in red enchilada sauce and melted cheese, served on a plate with rice and beans.', 'Burrito Mojado', 'burritos', 'popular', 'tex_mex', 'mixed', 'flour', false, 'baked', '{ING_BEEF_GROUND,ING_FLOUR_TORTILLA,ING_RICE,ING_REFRIED_BEANS,ING_ENCHILADA_SAUCE,ING_CHEESE,ING_SOUR_CREAM,ING_LETTUCE}', '{gluten,milk}', false, false, true, false, false, true, false, 780, 36.0, 68.0, 38.0, 2, '{smothered,tex-mex,hearty}', 82),

-- ============================================
-- ENCHILADAS (7 items)
-- ============================================
('MEX_ENCHILADAS_ROJAS', 'enchiladas-rojas', 'Enchiladas Rojas', 'Classic red enchiladas with chicken, rolled in corn tortillas, covered in red chile sauce, topped with crema and queso fresco.', 'Enchiladas Rojas', 'enchiladas', 'classic', 'central', 'chicken', 'corn', false, 'baked', '{ING_CHICKEN_BREAST,ING_CORN_TORTILLA,ING_GUAJILLO_CHILE,ING_TOMATO,ING_ONION,ING_GARLIC,ING_CREMA,ING_QUESO_FRESCO}', '{milk}', true, false, true, false, false, true, false, 420, 28.0, 38.0, 18.0, 2, '{classic,red-sauce,chicken}', 92),
('MEX_ENCHILADAS_VERDES', 'enchiladas-verdes', 'Enchiladas Verdes', 'Enchiladas bathed in tangy green tomatillo sauce, filled with chicken, topped with crema and queso fresco.', 'Enchiladas Verdes', 'enchiladas', 'classic', 'central', 'chicken', 'corn', false, 'baked', '{ING_CHICKEN_BREAST,ING_CORN_TORTILLA,ING_TOMATILLO,ING_SERRANO_CHILE,ING_CILANTRO,ING_ONION,ING_CREMA,ING_QUESO_FRESCO}', '{milk}', true, false, true, false, false, true, false, 400, 28.0, 36.0, 16.0, 2, '{green-sauce,tomatillo,tangy}', 90),
('MEX_ENCHILADAS_SUIZAS', 'enchiladas-suizas', 'Enchiladas Suizas', 'Swiss-style enchiladas with green tomatillo-cream sauce, topped with melted cheese and baked until bubbly.', 'Enchiladas Suizas', 'enchiladas', 'popular', 'central', 'chicken', 'corn', false, 'baked', '{ING_CHICKEN_BREAST,ING_CORN_TORTILLA,ING_TOMATILLO,ING_HEAVY_CREAM,ING_CHEESE,ING_SERRANO_CHILE,ING_ONION,ING_GARLIC}', '{milk}', true, false, true, false, false, true, false, 520, 32.0, 34.0, 28.0, 1, '{creamy,swiss-style,cheesy}', 88),
('MEX_ENCHILADAS_MOLE', 'enchiladas-mole', 'Enchiladas de Mole', 'Enchiladas covered in rich, complex mole poblano sauce, filled with shredded chicken, topped with sesame seeds.', 'Enchiladas de Mole', 'enchiladas', 'premium', 'oaxaca', 'chicken', 'corn', false, 'simmered', '{ING_CHICKEN_BREAST,ING_CORN_TORTILLA,ING_MOLE_PASTE,ING_CHOCOLATE,ING_SESAME_SEEDS,ING_ONION,ING_QUESO_FRESCO}', '{sesame,nuts,milk}', true, false, false, false, false, true, false, 480, 30.0, 42.0, 22.0, 2, '{mole,oaxaca,complex,premium}', 85),
('MEX_ENMOLADAS', 'enmoladas', 'Enmoladas', 'Tortillas dipped in mole negro or mole rojo, filled with chicken or cheese, garnished with crema and onion.', 'Enmoladas', 'enchiladas', 'traditional', 'oaxaca', 'chicken', 'corn', false, 'simmered', '{ING_CHICKEN_BREAST,ING_CORN_TORTILLA,ING_MOLE_PASTE,ING_CREMA,ING_ONION,ING_SESAME_SEEDS}', '{sesame,nuts,milk}', true, false, false, false, false, true, false, 440, 26.0, 40.0, 20.0, 2, '{oaxaca,mole,traditional}', 75),
('MEX_ENFRIJOLADAS', 'enfrijoladas', 'Enfrijoladas', 'Corn tortillas dipped in creamy black bean sauce, folded or rolled with cheese, topped with crema and queso fresco.', 'Enfrijoladas', 'enchiladas', 'traditional', 'oaxaca', 'cheese', 'corn', false, 'simmered', '{ING_BLACK_BEANS,ING_CORN_TORTILLA,ING_OAXACA_CHEESE,ING_CREMA,ING_QUESO_FRESCO,ING_ONION,ING_EPAZOTE}', '{milk}', true, false, true, false, true, true, true, 380, 18.0, 44.0, 16.0, 0, '{vegetarian,beans,oaxaca,comfort}', 72),
('MEX_ENTOMATADAS', 'entomatadas', 'Entomatadas', 'Tortillas bathed in fresh tomato sauce, filled with cheese or chicken, lighter and fresher than enchiladas.', 'Entomatadas', 'enchiladas', 'traditional', 'central', 'cheese', 'corn', false, 'simmered', '{ING_TOMATO,ING_CORN_TORTILLA,ING_OAXACA_CHEESE,ING_ONION,ING_GARLIC,ING_CREMA,ING_QUESO_FRESCO}', '{milk}', true, false, true, false, true, true, true, 340, 16.0, 38.0, 14.0, 0, '{vegetarian,tomato,light,breakfast}', 70),

-- ============================================
-- ANTOJITOS (15 items)
-- ============================================
('MEX_QUESADILLA', 'quesadilla', 'Quesadilla', 'Corn or flour tortilla folded with melted Oaxaca cheese, can be filled with various ingredients like mushrooms, squash blossom, or huitlacoche.', 'Quesadilla', 'antojitos', 'classic', 'central', 'cheese', 'corn', true, 'griddled', '{ING_CORN_TORTILLA,ING_OAXACA_CHEESE,ING_SALSA_VERDE,ING_CREMA}', '{milk}', true, false, true, false, true, true, true, 320, 14.0, 28.0, 18.0, 0, '{vegetarian,simple,cheese}', 95),
('MEX_QUESADILLA_FLOR_CALABAZA', 'quesadilla-flor-calabaza', 'Squash Blossom Quesadilla', 'Traditional Mexico City quesadilla filled with sautéed squash blossoms, Oaxaca cheese, and epazote.', 'Quesadilla de Flor de Calabaza', 'antojitos', 'signature', 'central', 'vegetarian', 'corn', true, 'griddled', '{ING_CORN_TORTILLA,ING_SQUASH_BLOSSOM,ING_OAXACA_CHEESE,ING_EPAZOTE,ING_ONION,ING_SALSA_VERDE}', '{milk}', true, false, true, false, true, true, true, 280, 12.0, 30.0, 14.0, 0, '{vegetarian,seasonal,mexico-city,delicate}', 82),
('MEX_QUESADILLA_HUITLACOCHE', 'quesadilla-huitlacoche', 'Huitlacoche Quesadilla', 'Gourmet quesadilla filled with huitlacoche (corn truffle), a prized Mexican delicacy with earthy, mushroom-like flavor.', 'Quesadilla de Huitlacoche', 'antojitos', 'premium', 'central', 'vegetarian', 'corn', true, 'griddled', '{ING_CORN_TORTILLA,ING_HUITLACOCHE,ING_OAXACA_CHEESE,ING_EPAZOTE,ING_ONION,ING_GARLIC}', '{milk}', true, false, true, false, true, true, true, 300, 14.0, 32.0, 14.0, 0, '{vegetarian,gourmet,corn-truffle,premium}', 75),
('MEX_TOSTADA', 'tostada', 'Tostada', 'Crispy fried flat tortilla topped with refried beans, shredded chicken or beef, lettuce, crema, and queso fresco.', 'Tostada', 'antojitos', 'classic', 'central', 'chicken', 'corn', true, 'fried', '{ING_CORN_TORTILLA,ING_REFRIED_BEANS,ING_CHICKEN_BREAST,ING_LETTUCE,ING_CREMA,ING_QUESO_FRESCO,ING_SALSA_VERDE}', '{milk}', true, false, true, false, false, true, false, 340, 18.0, 32.0, 16.0, 1, '{crispy,classic,street-food}', 88),
('MEX_TOSTADA_CEVICHE', 'tostada-ceviche', 'Ceviche Tostada', 'Crispy tostada topped with fresh lime-marinated fish or shrimp ceviche, avocado, and salsa.', 'Tostada de Ceviche', 'antojitos', 'popular', 'coastal', 'fish', 'corn', true, 'raw', '{ING_CORN_TORTILLA,ING_WHITE_FISH,ING_LIME,ING_TOMATO,ING_ONION,ING_CILANTRO,ING_AVOCADO,ING_SERRANO_CHILE}', '{fish}', true, true, true, false, false, true, false, 280, 20.0, 26.0, 12.0, 2, '{coastal,fresh,seafood,light}', 85),
('MEX_SOPE', 'sope', 'Sope', 'Thick corn masa base with pinched edges, topped with refried beans, meat, lettuce, crema, and cheese.', 'Sope', 'antojitos', 'traditional', 'central', 'mixed', 'corn', true, 'griddled', '{ING_MASA,ING_REFRIED_BEANS,ING_CHICKEN_BREAST,ING_LETTUCE,ING_CREMA,ING_QUESO_FRESCO,ING_SALSA_ROJA}', '{milk}', true, false, true, false, false, true, false, 360, 16.0, 38.0, 16.0, 1, '{traditional,masa,street-food}', 80),
('MEX_GORDITA', 'gordita', 'Gordita', 'Thick, plump corn pocket fried or griddled, split open and stuffed with chicharrón, cheese, or meat.', 'Gordita', 'antojitos', 'traditional', 'northern', 'pork', 'corn', true, 'fried', '{ING_MASA,ING_CHICHARRON,ING_REFRIED_BEANS,ING_CHEESE,ING_SALSA_VERDE,ING_CREMA}', '{milk}', true, false, true, false, false, false, false, 420, 18.0, 36.0, 24.0, 1, '{fried,stuffed,northern}', 78),
('MEX_FLAUTA', 'flauta', 'Flautas', 'Tightly rolled corn tortillas filled with shredded chicken or beef, deep-fried until crispy, served with crema and salsa.', 'Flautas', 'antojitos', 'classic', 'central', 'chicken', 'corn', true, 'fried', '{ING_CORN_TORTILLA,ING_CHICKEN_BREAST,ING_LETTUCE,ING_CREMA,ING_QUESO_FRESCO,ING_GUACAMOLE,ING_SALSA_ROJA}', '{milk}', true, false, true, false, false, true, false, 380, 22.0, 30.0, 20.0, 1, '{crispy,rolled,fried}', 85),
('MEX_TLAYUDA', 'tlayuda', 'Tlayuda', 'Oaxacan pizza - large, crispy tortilla spread with asiento (pork lard), black beans, Oaxaca cheese, and various toppings.', 'Tlayuda', 'antojitos', 'signature', 'oaxaca', 'mixed', 'corn', true, 'grilled', '{ING_CORN_TORTILLA,ING_BLACK_BEANS,ING_OAXACA_CHEESE,ING_ASIENTO,ING_CHORIZO,ING_CABBAGE,ING_AVOCADO}', '{milk}', true, false, true, false, false, false, false, 520, 24.0, 48.0, 26.0, 1, '{oaxaca,large,shareable,iconic}', 88),
('MEX_CHALUPA', 'chalupa', 'Chalupa', 'Puebla-style small fried tortilla boat filled with shredded pork, salsa verde, and onion.', 'Chalupa', 'antojitos', 'traditional', 'central', 'pork', 'corn', true, 'fried', '{ING_MASA,ING_PORK_SHOULDER,ING_SALSA_VERDE,ING_ONION,ING_CILANTRO}', '{}', true, true, true, false, false, false, false, 240, 14.0, 22.0, 12.0, 2, '{puebla,fried,small}', 72),
('MEX_MEMELA', 'memela', 'Memela', 'Oaxacan thick oval tortilla topped with black beans, salsa, and queso fresco, sometimes with meat.', 'Memela', 'antojitos', 'traditional', 'oaxaca', 'beans', 'corn', true, 'griddled', '{ING_MASA,ING_BLACK_BEANS,ING_SALSA_ROJA,ING_QUESO_FRESCO,ING_ONION}', '{milk}', true, false, true, false, true, true, true, 280, 10.0, 38.0, 10.0, 1, '{oaxaca,simple,vegetarian}', 68),
('MEX_PANUCHO', 'panucho', 'Panucho', 'Yucatecan specialty - fried tortilla stuffed with refried black beans, topped with shredded turkey or chicken and pickled onion.', 'Panucho', 'antojitos', 'traditional', 'yucatan', 'chicken', 'corn', true, 'fried', '{ING_CORN_TORTILLA,ING_BLACK_BEANS,ING_CHICKEN_BREAST,ING_PICKLED_ONION,ING_HABANERO,ING_AVOCADO}', '{}', true, true, true, false, false, true, false, 320, 18.0, 34.0, 14.0, 3, '{yucatan,mayan,pickled-onion}', 75),
('MEX_SALBUTE', 'salbute', 'Salbute', 'Yucatecan puffed fried tortilla topped with shredded turkey, pickled red onion, tomato, and avocado.', 'Salbute', 'antojitos', 'traditional', 'yucatan', 'chicken', 'corn', true, 'fried', '{ING_CORN_TORTILLA,ING_CHICKEN_BREAST,ING_PICKLED_ONION,ING_TOMATO,ING_AVOCADO,ING_HABANERO}', '{}', true, true, true, false, false, true, false, 290, 16.0, 30.0, 12.0, 3, '{yucatan,puffy,mayan}', 72),
('MEX_TLACOYO', 'tlacoyo', 'Tlacoyo', 'Ancient pre-Hispanic thick oval masa pocket stuffed with beans, cheese, or fava beans, griddled and topped with nopales and salsa.', 'Tlacoyo', 'antojitos', 'traditional', 'central', 'beans', 'corn', true, 'griddled', '{ING_MASA,ING_REFRIED_BEANS,ING_NOPALES,ING_QUESO_FRESCO,ING_SALSA_VERDE,ING_CREMA}', '{milk}', true, false, true, false, true, true, true, 260, 10.0, 36.0, 10.0, 1, '{pre-hispanic,ancient,vegetarian,nopales}', 70),
('MEX_HUARACHE', 'huarache', 'Huarache', 'Large sandal-shaped masa base topped with beans, meat, salsa, cheese, and various toppings.', 'Huarache', 'antojitos', 'classic', 'central', 'mixed', 'corn', true, 'griddled', '{ING_MASA,ING_REFRIED_BEANS,ING_CARNE_ASADA,ING_SALSA_VERDE,ING_CREMA,ING_QUESO_FRESCO,ING_ONION,ING_CILANTRO}', '{milk}', true, false, true, false, false, true, false, 480, 24.0, 48.0, 22.0, 1, '{large,hearty,mexico-city}', 82),

-- ============================================
-- MAIN DISHES (16 items)
-- ============================================
('MEX_MOLE_POBLANO', 'mole-poblano', 'Mole Poblano', 'Mexico''s national dish - complex sauce with 20+ ingredients including multiple chiles, chocolate, nuts, and spices, served over turkey or chicken.', 'Mole Poblano', 'main_dishes', 'premium', 'central', 'chicken', 'none', false, 'simmered', '{ING_CHICKEN_THIGH,ING_ANCHO_CHILE,ING_MULATO_CHILE,ING_PASILLA_CHILE,ING_CHOCOLATE,ING_ALMONDS,ING_SESAME_SEEDS,ING_TOMATO,ING_ONION,ING_GARLIC,ING_CINNAMON,ING_CLOVES}', '{nuts,sesame}', true, true, false, false, false, true, false, 520, 38.0, 32.0, 28.0, 2, '{iconic,complex,puebla,national-dish,premium}', 95),
('MEX_MOLE_NEGRO', 'mole-negro', 'Mole Negro', 'Oaxaca''s most prestigious mole, made with charred chiles and over 30 ingredients for a deep, complex black sauce.', 'Mole Negro Oaxaqueño', 'main_dishes', 'premium', 'oaxaca', 'chicken', 'none', false, 'simmered', '{ING_CHICKEN_THIGH,ING_CHILHUACLE_CHILE,ING_MULATO_CHILE,ING_CHOCOLATE,ING_PLANTAIN,ING_ALMONDS,ING_SESAME_SEEDS,ING_AVOCADO_LEAF}', '{nuts,sesame}', true, true, false, false, false, true, false, 540, 36.0, 36.0, 30.0, 2, '{oaxaca,seven-moles,complex,premium}', 85),
('MEX_CHILES_RELLENOS', 'chiles-rellenos', 'Chiles Rellenos', 'Poblano peppers stuffed with cheese or picadillo, battered in fluffy egg coating, fried, and served with tomato sauce.', 'Chiles Rellenos', 'main_dishes', 'classic', 'central', 'cheese', 'none', false, 'fried', '{ING_POBLANO_CHILE,ING_OAXACA_CHEESE,ING_EGG,ING_FLOUR,ING_TOMATO,ING_ONION,ING_GARLIC}', '{eggs,milk,gluten}', false, false, true, false, true, true, true, 420, 18.0, 28.0, 28.0, 1, '{classic,stuffed,cheese}', 90),
('MEX_CARNITAS', 'carnitas', 'Carnitas', 'Michoacán specialty of pork slow-braised in its own fat with orange and spices until fall-apart tender and crispy.', 'Carnitas', 'main_dishes', 'classic', 'western', 'pork', 'none', false, 'braised', '{ING_PORK_SHOULDER,ING_LARD,ING_ORANGE,ING_BAY_LEAVES,ING_CUMIN,ING_GARLIC,ING_MILK}', '{milk}', true, false, true, false, false, false, false, 480, 42.0, 4.0, 34.0, 0, '{michoacan,pork,crispy,braised}', 92),
('MEX_COCHINITA_PIBIL', 'cochinita-pibil', 'Cochinita Pibil', 'Yucatecan Mayan-style slow-roasted pork marinated in achiote and sour orange, wrapped in banana leaves.', 'Cochinita Pibil', 'main_dishes', 'classic', 'yucatan', 'pork', 'none', false, 'pit-roasted', '{ING_PORK_SHOULDER,ING_ACHIOTE,ING_SOUR_ORANGE,ING_BANANA_LEAF,ING_GARLIC,ING_CUMIN,ING_OREGANO,ING_PICKLED_ONION}', '{}', true, true, true, false, false, false, false, 440, 38.0, 8.0, 28.0, 1, '{yucatan,mayan,achiote,iconic}', 90),
('MEX_BARBACOA', 'barbacoa', 'Barbacoa', 'Traditional slow-cooked beef (or lamb) steamed in maguey leaves, incredibly tender and served with consommé.', 'Barbacoa', 'main_dishes', 'classic', 'central', 'beef', 'none', false, 'steamed', '{ING_BEEF_CHEEK,ING_MAGUEY_LEAF,ING_CHIPOTLE,ING_GARLIC,ING_CUMIN,ING_BAY_LEAVES,ING_THYME}', '{}', true, true, true, false, false, true, false, 420, 45.0, 4.0, 26.0, 2, '{slow-cooked,weekend,traditional,consomme}', 88),
('MEX_BIRRIA', 'birria', 'Birria', 'Jalisco''s famous spiced meat stew, traditionally made with goat but now commonly beef, in rich chile consommé.', 'Birria', 'main_dishes', 'popular', 'western', 'beef', 'none', false, 'braised', '{ING_BEEF_CHUCK,ING_GUAJILLO_CHILE,ING_ANCHO_CHILE,ING_TOMATO,ING_ONION,ING_GARLIC,ING_CUMIN,ING_OREGANO,ING_CINNAMON}', '{}', true, true, true, false, false, true, false, 460, 42.0, 12.0, 28.0, 3, '{jalisco,stew,trending,consomme}', 94),
('MEX_POZOLE_ROJO', 'pozole-rojo', 'Pozole Rojo', 'Ancient pre-Hispanic hominy soup with pork in red chile broth, served with shredded cabbage, radish, oregano, and lime.', 'Pozole Rojo', 'main_dishes', 'traditional', 'central', 'pork', 'none', false, 'simmered', '{ING_PORK_SHOULDER,ING_HOMINY,ING_GUAJILLO_CHILE,ING_ANCHO_CHILE,ING_GARLIC,ING_ONION,ING_CABBAGE,ING_RADISH,ING_OREGANO,ING_LIME}', '{}', true, true, true, false, false, false, false, 380, 28.0, 32.0, 16.0, 2, '{soup,ancient,celebratory,hominy}', 88),
('MEX_POZOLE_VERDE', 'pozole-verde', 'Pozole Verde', 'Green version of pozole with pork in a tangy green chile sauce made with pepitas, tomatillos, and herbs.', 'Pozole Verde', 'main_dishes', 'traditional', 'central', 'pork', 'none', false, 'simmered', '{ING_PORK_SHOULDER,ING_HOMINY,ING_TOMATILLO,ING_PEPITAS,ING_SERRANO_CHILE,ING_CILANTRO,ING_CABBAGE,ING_RADISH,ING_LIME}', '{}', true, true, true, false, false, false, false, 360, 26.0, 30.0, 14.0, 2, '{soup,green,pepitas,guerrero}', 82),
('MEX_TAMALES', 'tamales', 'Tamales', 'Ancient Mesoamerican dish of seasoned masa filled with meat, cheese, or vegetables, wrapped in corn husks and steamed.', 'Tamales', 'main_dishes', 'traditional', 'central', 'pork', 'none', true, 'steamed', '{ING_MASA,ING_LARD,ING_PORK_SHOULDER,ING_GUAJILLO_CHILE,ING_CORN_HUSK,ING_CHICKEN_BROTH}', '{}', true, true, true, false, false, false, false, 280, 12.0, 28.0, 14.0, 1, '{ancient,holiday,steamed,wrapped}', 92),
('MEX_TAMALES_OAXAQUENOS', 'tamales-oaxaquenos', 'Oaxacan Tamales', 'Large banana leaf-wrapped tamales filled with mole negro and chicken, a Oaxacan specialty.', 'Tamales Oaxaqueños', 'main_dishes', 'signature', 'oaxaca', 'chicken', 'none', true, 'steamed', '{ING_MASA,ING_LARD,ING_CHICKEN_THIGH,ING_MOLE_PASTE,ING_BANANA_LEAF}', '{nuts,sesame}', true, true, false, false, false, true, false, 340, 16.0, 32.0, 18.0, 2, '{oaxaca,banana-leaf,mole,large}', 85),
('MEX_CHILE_EN_NOGADA', 'chile-en-nogada', 'Chile en Nogada', 'Patriotic Puebla dish of poblano stuffed with picadillo, topped with creamy walnut sauce and pomegranate seeds. Seasonal (Aug-Sept).', 'Chile en Nogada', 'main_dishes', 'seasonal', 'central', 'mixed', 'none', false, 'stuffed', '{ING_POBLANO_CHILE,ING_GROUND_PORK,ING_GROUND_BEEF,ING_APPLE,ING_PEAR,ING_WALNUT,ING_POMEGRANATE,ING_CREMA,ING_PARSLEY}', '{nuts,milk}', true, false, false, false, false, false, false, 580, 24.0, 38.0, 38.0, 0, '{puebla,patriotic,seasonal,independence,premium}', 85),
('MEX_CARNE_ASADA', 'carne-asada', 'Carne Asada', 'Northern Mexico grilled beef, typically skirt or flank steak marinated in citrus and spices, served with beans and tortillas.', 'Carne Asada', 'main_dishes', 'classic', 'northern', 'beef', 'flour', false, 'grilled', '{ING_BEEF_SKIRT,ING_LIME,ING_GARLIC,ING_CUMIN,ING_CILANTRO,ING_JALAPENO,ING_FLOUR_TORTILLA,ING_REFRIED_BEANS}', '{gluten}', false, true, true, false, false, true, false, 520, 48.0, 24.0, 26.0, 1, '{grilled,northern,beef,bbq}', 94),
('MEX_CABRITO', 'cabrito', 'Cabrito', 'Northern Mexican specialty of pit-roasted or grilled young goat, a Monterrey tradition.', 'Cabrito', 'main_dishes', 'signature', 'northern', 'goat', 'flour', false, 'roasted', '{ING_GOAT,ING_SALT,ING_GARLIC,ING_FLOUR_TORTILLA,ING_SALSA_ROJA}', '{gluten}', false, true, true, false, false, true, false, 380, 42.0, 4.0, 22.0, 0, '{monterrey,goat,northern,roasted}', 72),
('MEX_CHILAQUILES_ROJOS', 'chilaquiles-rojos', 'Chilaquiles Rojos', 'Traditional breakfast of fried tortilla chips simmered in red salsa, topped with crema, cheese, onion, and a fried egg.', 'Chilaquiles Rojos', 'main_dishes', 'classic', 'central', 'vegetarian', 'corn', false, 'simmered', '{ING_CORN_TORTILLA,ING_GUAJILLO_CHILE,ING_TOMATO,ING_ONION,ING_GARLIC,ING_CREMA,ING_QUESO_FRESCO,ING_EGG}', '{eggs,milk}', true, false, true, false, true, true, true, 420, 16.0, 38.0, 24.0, 2, '{breakfast,classic,tortilla-chips}', 90),
('MEX_CHILAQUILES_VERDES', 'chilaquiles-verdes', 'Chilaquiles Verdes', 'Breakfast dish of tortilla chips in tangy green tomatillo salsa, topped with chicken, crema, and fresh cheese.', 'Chilaquiles Verdes', 'main_dishes', 'classic', 'central', 'chicken', 'corn', false, 'simmered', '{ING_CORN_TORTILLA,ING_TOMATILLO,ING_SERRANO_CHILE,ING_CILANTRO,ING_CHICKEN_BREAST,ING_CREMA,ING_QUESO_FRESCO,ING_ONION}', '{milk}', true, false, true, false, false, true, false, 480, 28.0, 36.0, 26.0, 2, '{breakfast,tomatillo,tangy}', 88),

-- ============================================
-- SIDES & SALSAS (12 items)
-- ============================================
('MEX_GUACAMOLE', 'guacamole', 'Guacamole', 'Classic Mexican avocado dip mashed with lime, onion, cilantro, and tomato. Served with tortilla chips.', 'Guacamole', 'sides_salsas', 'classic', 'central', 'vegetarian', 'none', false, 'raw', '{ING_AVOCADO,ING_LIME,ING_ONION,ING_CILANTRO,ING_TOMATO,ING_SERRANO_CHILE,ING_SALT}', '{}', true, true, true, true, true, true, true, 180, 2.0, 10.0, 16.0, 1, '{iconic,dip,vegan,fresh}', 98),
('MEX_SALSA_ROJA', 'salsa-roja', 'Salsa Roja', 'Classic red salsa made with roasted tomatoes, dried chiles, onion, and garlic. The foundation of Mexican cuisine.', 'Salsa Roja', 'sides_salsas', 'classic', 'central', 'vegetarian', 'none', true, 'roasted', '{ING_TOMATO,ING_ARBOL_CHILE,ING_ONION,ING_GARLIC,ING_SALT}', '{}', true, true, true, true, true, true, true, 25, 1.0, 5.0, 0.0, 3, '{essential,table-salsa,vegan}', 95),
('MEX_SALSA_VERDE', 'salsa-verde', 'Salsa Verde', 'Tangy green salsa made with roasted tomatillos, serrano chiles, cilantro, and onion.', 'Salsa Verde', 'sides_salsas', 'classic', 'central', 'vegetarian', 'none', true, 'roasted', '{ING_TOMATILLO,ING_SERRANO_CHILE,ING_CILANTRO,ING_ONION,ING_GARLIC,ING_SALT}', '{}', true, true, true, true, true, true, true, 20, 1.0, 4.0, 0.0, 2, '{essential,tangy,vegan}', 94),
('MEX_PICO_DE_GALLO', 'pico-de-gallo', 'Pico de Gallo', 'Fresh chunky salsa with diced tomato, onion, cilantro, jalapeño, and lime juice.', 'Pico de Gallo', 'sides_salsas', 'classic', 'northern', 'vegetarian', 'none', true, 'raw', '{ING_TOMATO,ING_ONION,ING_CILANTRO,ING_JALAPENO,ING_LIME,ING_SALT}', '{}', true, true, true, true, true, true, true, 15, 1.0, 3.0, 0.0, 2, '{fresh,chunky,vegan}', 92),
('MEX_QUESO_FUNDIDO', 'queso-fundido', 'Queso Fundido', 'Melted cheese dip served bubbling hot, often with chorizo or rajas, scooped with warm tortillas.', 'Queso Fundido', 'sides_salsas', 'popular', 'northern', 'cheese', 'flour', false, 'baked', '{ING_OAXACA_CHEESE,ING_CHIHUAHUA_CHEESE,ING_CHORIZO,ING_FLOUR_TORTILLA}', '{milk,gluten}', false, false, true, false, false, false, false, 380, 22.0, 12.0, 28.0, 1, '{cheese,melted,appetizer,shareable}', 88),
('MEX_FRIJOLES_REFRITOS', 'frijoles-refritos', 'Refried Beans', 'Creamy mashed pinto beans cooked with lard or oil, a staple side dish of Mexican cuisine.', 'Frijoles Refritos', 'sides_salsas', 'classic', 'northern', 'beans', 'none', false, 'fried', '{ING_PINTO_BEANS,ING_LARD,ING_ONION,ING_GARLIC,ING_SALT}', '{}', true, true, true, false, true, false, false, 180, 8.0, 24.0, 6.0, 0, '{essential,side,beans}', 90),
('MEX_FRIJOLES_NEGROS', 'frijoles-negros', 'Black Beans', 'Whole black beans simmered with epazote and onion, a staple of southern Mexican cuisine.', 'Frijoles Negros', 'sides_salsas', 'classic', 'yucatan', 'beans', 'none', false, 'simmered', '{ING_BLACK_BEANS,ING_EPAZOTE,ING_ONION,ING_GARLIC,ING_SALT}', '{}', true, true, true, true, true, true, true, 160, 10.0, 28.0, 1.0, 0, '{vegan,protein,southern}', 88),
('MEX_ARROZ_ROJO', 'arroz-rojo', 'Mexican Red Rice', 'Tomato-seasoned rice cooked with chicken broth, the essential Mexican side dish.', 'Arroz Rojo', 'sides_salsas', 'classic', 'central', 'vegetarian', 'none', false, 'simmered', '{ING_RICE,ING_TOMATO,ING_ONION,ING_GARLIC,ING_CHICKEN_BROTH,ING_VEGETABLE_OIL}', '{}', true, true, true, false, false, true, false, 200, 4.0, 38.0, 4.0, 0, '{essential,side,rice}', 92),
('MEX_ELOTE', 'elote', 'Elote', 'Mexican street corn grilled and slathered with mayonnaise, cotija cheese, chile powder, and lime.', 'Elote', 'sides_salsas', 'popular', 'central', 'vegetarian', 'none', true, 'grilled', '{ING_CORN_COB,ING_MAYONNAISE,ING_COTIJA_CHEESE,ING_CHILE_POWDER,ING_LIME,ING_CILANTRO}', '{eggs,milk}', true, false, true, false, true, true, true, 220, 6.0, 28.0, 12.0, 2, '{street-food,corn,iconic}', 90),
('MEX_ESQUITES', 'esquites', 'Esquites', 'Cup of warm corn kernels cooked with epazote, served with mayo, cheese, lime, and chile.', 'Esquites', 'sides_salsas', 'popular', 'central', 'vegetarian', 'none', true, 'sautéed', '{ING_CORN_KERNELS,ING_EPAZOTE,ING_MAYONNAISE,ING_COTIJA_CHEESE,ING_CHILE_POWDER,ING_LIME}', '{eggs,milk}', true, false, true, false, true, true, true, 200, 6.0, 26.0, 10.0, 2, '{street-food,corn,cup}', 85),
('MEX_SALSA_HABANERO', 'salsa-habanero', 'Habanero Salsa', 'Fiery Yucatecan salsa made with roasted habaneros and sour orange, extremely spicy.', 'Salsa de Habanero', 'sides_salsas', 'traditional', 'yucatan', 'vegetarian', 'none', true, 'roasted', '{ING_HABANERO,ING_SOUR_ORANGE,ING_ONION,ING_GARLIC,ING_SALT}', '{}', true, true, true, true, true, true, true, 15, 0.0, 3.0, 0.0, 5, '{yucatan,extremely-hot,vegan}', 75),
('MEX_NACHOS', 'nachos', 'Nachos', 'Tex-Mex creation of tortilla chips topped with melted cheese, jalapeños, beans, and various toppings.', 'Nachos', 'sides_salsas', 'popular', 'tex_mex', 'mixed', 'corn', false, 'baked', '{ING_CORN_TORTILLA,ING_CHEESE,ING_JALAPENO,ING_REFRIED_BEANS,ING_SOUR_CREAM,ING_GUACAMOLE,ING_PICO_DE_GALLO}', '{milk}', true, false, true, false, true, true, true, 520, 18.0, 48.0, 30.0, 2, '{tex-mex,shareable,chips}', 92);

-- ============================================
-- VERIFICATION QUERY
-- ============================================
-- Run this to verify the import
-- SELECT category, COUNT(*) as count FROM mexican GROUP BY category ORDER BY category;
-- Expected results:
-- antojitos      | 15
-- burritos       |  6
-- enchiladas     |  7
-- main_dishes    | 16
-- sides_salsas   | 12
-- tacos          | 10
-- TOTAL          | 66
