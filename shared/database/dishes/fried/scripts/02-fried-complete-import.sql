-- ============================================
-- GUDBRO Fried Foods Database
-- Version: 1.0 - TEXT + CHECK (no ENUM)
-- Aligned to DATABASE-STANDARDS v1.1
-- Total: 48 dishes across 6 categories
-- ============================================

-- Drop existing table if recreating
DROP TABLE IF EXISTS fried CASCADE;

-- ============================================
-- CREATE TABLE
-- ============================================
CREATE TABLE fried (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- INFO BASE (English only)
  name TEXT NOT NULL,
  description TEXT NOT NULL,

  -- CLASSIFICATION
  category TEXT NOT NULL
    CHECK (category IN ('fried_chicken', 'fried_seafood', 'fried_vegetables', 'fried_appetizers', 'fried_snacks', 'fried_international')),

  origin TEXT NOT NULL DEFAULT 'international'
    CHECK (origin IN ('american', 'italian', 'japanese', 'korean', 'chinese', 'thai', 'indian', 'british', 'spanish', 'french', 'middle_eastern', 'latin_american', 'southern_us', 'international')),

  frying_method TEXT NOT NULL DEFAULT 'deep_fried'
    CHECK (frying_method IN ('deep_fried', 'pan_fried', 'shallow_fried', 'air_fried', 'double_fried')),

  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional', 'iconic')),

  -- INGREDIENTI
  ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

  -- SISTEMA 5 DIMENSIONI - Allergeni (JSONB per consistency con altri DB)
  allergens JSONB NOT NULL DEFAULT '[]',

  -- SISTEMA 5 DIMENSIONI - Dietary
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_dairy_free BOOLEAN NOT NULL DEFAULT true,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_halal BOOLEAN NOT NULL DEFAULT true,
  is_kosher BOOLEAN NOT NULL DEFAULT false,

  -- SISTEMA 5 DIMENSIONI - Nutrition
  calories_per_serving INTEGER,
  protein_g DECIMAL(5,1),
  carbs_g DECIMAL(5,1),
  fat_g DECIMAL(5,1),

  -- SISTEMA 5 DIMENSIONI - Spice
  spice_level INTEGER NOT NULL DEFAULT 0
    CHECK (spice_level >= 0 AND spice_level <= 5),

  -- METADATA
  tags JSONB NOT NULL DEFAULT '[]',
  popularity INTEGER NOT NULL DEFAULT 50
    CHECK (popularity >= 0 AND popularity <= 100),

  -- OPTIONAL FIELDS
  serving_size_g INTEGER,
  dipping_sauces JSONB DEFAULT '[]',
  crispy_rating INTEGER CHECK (crispy_rating >= 1 AND crispy_rating <= 5),

  -- TIMESTAMPS
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_fried_category ON fried(category);
CREATE INDEX IF NOT EXISTS idx_fried_origin ON fried(origin);
CREATE INDEX IF NOT EXISTS idx_fried_popularity ON fried(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_fried_tags ON fried USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_fried_ingredient_ids ON fried USING GIN(ingredient_ids);
CREATE INDEX IF NOT EXISTS idx_fried_allergens ON fried USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_fried_vegan ON fried(is_vegan) WHERE is_vegan = true;
CREATE INDEX IF NOT EXISTS idx_fried_gluten_free ON fried(is_gluten_free) WHERE is_gluten_free = true;

-- ============================================
-- RLS
-- ============================================
ALTER TABLE fried ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access" ON fried;
CREATE POLICY "Public read access" ON fried
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service write access" ON fried;
CREATE POLICY "Service write access" ON fried
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_fried_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS fried_updated_at ON fried;
CREATE TRIGGER fried_updated_at
  BEFORE UPDATE ON fried
  FOR EACH ROW
  EXECUTE FUNCTION update_fried_updated_at();

-- ============================================
-- COMMENT
-- ============================================
COMMENT ON TABLE fried IS 'GUDBRO Fried Foods catalog - 48 items, DATABASE-STANDARDS v1.1 compliant';

-- ============================================
-- DATA IMPORT - 48 DISHES
-- ============================================

-- FRIED CHICKEN (8)
INSERT INTO fried (id, slug, name, description, category, origin, frying_method, status, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity, serving_size_g, dipping_sauces, crispy_rating)
VALUES
('FRD_SOUTHERN_FRIED_CHICKEN', 'southern-fried-chicken', 'Southern Fried Chicken', 'Classic American buttermilk-brined chicken, seasoned with secret spices, coated in seasoned flour and deep-fried to golden perfection. Crispy outside, juicy inside.', 'fried_chicken', 'southern_us', 'deep_fried', 'classic', ARRAY['ING_CHICKEN_WHOLE', 'ING_BUTTERMILK', 'ING_FLOUR', 'ING_PAPRIKA', 'ING_GARLIC_POWDER', 'ING_ONION_POWDER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_VEGETABLE_OIL'], '["gluten", "milk"]', false, false, true, false, false, true, false, 450, 35, 18, 28, 1, '["american", "classic", "comfort-food", "iconic"]', 95, 280, '["honey-mustard", "bbq", "ranch"]', 5),
('FRD_KOREAN_FRIED_CHICKEN', 'korean-fried-chicken', 'Korean Fried Chicken (Yangnyeom)', 'Double-fried Korean chicken coated in a sweet, spicy, and sticky gochujang-based sauce. Ultra crispy with an addictive glaze.', 'fried_chicken', 'korean', 'double_fried', 'popular', ARRAY['ING_CHICKEN_WINGS', 'ING_GOCHUJANG', 'ING_GOCHUGARU', 'ING_SOY_SAUCE', 'ING_HONEY', 'ING_GARLIC', 'ING_GINGER', 'ING_SESAME_OIL', 'ING_CORNSTARCH', 'ING_SESAME_SEEDS'], '["gluten", "soy", "sesame"]', false, true, true, false, false, true, false, 520, 32, 35, 28, 3, '["korean", "spicy", "double-fried", "trending", "k-food"]', 92, 300, '["pickled-radish", "ssamjang"]', 5),
('FRD_JAPANESE_KARAAGE', 'japanese-karaage', 'Japanese Karaage', 'Bite-sized Japanese fried chicken marinated in soy, sake, ginger, and garlic. Coated in potato starch for an extra light and crispy texture.', 'fried_chicken', 'japanese', 'deep_fried', 'classic', ARRAY['ING_CHICKEN_THIGH', 'ING_SOY_SAUCE', 'ING_SAKE', 'ING_GINGER', 'ING_GARLIC', 'ING_POTATO_STARCH', 'ING_VEGETABLE_OIL', 'ING_LEMON'], '["gluten", "soy"]', false, true, true, false, false, true, false, 380, 28, 22, 20, 0, '["japanese", "izakaya", "umami", "bento"]', 88, 200, '["kewpie-mayo", "ponzu"]', 4),
('FRD_BUFFALO_WINGS', 'buffalo-wings', 'Buffalo Wings', 'Crispy deep-fried chicken wings tossed in spicy cayenne pepper butter sauce. An American bar food icon, served with celery and blue cheese dressing.', 'fried_chicken', 'american', 'deep_fried', 'iconic', ARRAY['ING_CHICKEN_WINGS', 'ING_BUTTER', 'ING_HOT_SAUCE', 'ING_CAYENNE_PEPPER', 'ING_GARLIC_POWDER', 'ING_VINEGAR', 'ING_CELERY', 'ING_BLUE_CHEESE'], '["milk"]', true, false, true, false, false, true, false, 480, 30, 5, 38, 4, '["american", "buffalo", "bar-food", "game-day", "spicy"]', 94, 250, '["blue-cheese", "ranch"]', 4),
('FRD_CHICKEN_TENDERS', 'chicken-tenders', 'Chicken Tenders', 'Strips of chicken breast, breaded with seasoned breadcrumbs and fried until golden. A family favorite, perfect for dipping.', 'fried_chicken', 'american', 'deep_fried', 'popular', ARRAY['ING_CHICKEN_BREAST', 'ING_FLOUR', 'ING_EGG', 'ING_BREADCRUMBS', 'ING_PAPRIKA', 'ING_GARLIC_POWDER', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_VEGETABLE_OIL'], '["gluten", "eggs"]', false, true, true, false, false, true, false, 360, 32, 20, 18, 0, '["american", "kids-friendly", "dipping", "fast-food"]', 90, 180, '["honey-mustard", "bbq", "ranch", "ketchup"]', 4),
('FRD_CHICKEN_NUGGETS', 'chicken-nuggets', 'Chicken Nuggets', 'Bite-sized pieces of seasoned chicken in a crispy batter coating. A universal favorite for all ages.', 'fried_chicken', 'american', 'deep_fried', 'classic', ARRAY['ING_CHICKEN_BREAST', 'ING_FLOUR', 'ING_CORNSTARCH', 'ING_EGG', 'ING_BREADCRUMBS', 'ING_SALT', 'ING_ONION_POWDER', 'ING_VEGETABLE_OIL'], '["gluten", "eggs"]', false, true, true, false, false, true, false, 280, 18, 16, 16, 0, '["american", "kids-friendly", "snack", "fast-food"]', 92, 150, '["bbq", "sweet-sour", "honey-mustard"]', 3),
('FRD_NASHVILLE_HOT_CHICKEN', 'nashville-hot-chicken', 'Nashville Hot Chicken', 'Intensely spicy Southern fried chicken brushed with cayenne-lard paste. A Tennessee specialty that brings serious heat, served on white bread with pickles.', 'fried_chicken', 'southern_us', 'deep_fried', 'signature', ARRAY['ING_CHICKEN_THIGH', 'ING_BUTTERMILK', 'ING_FLOUR', 'ING_CAYENNE_PEPPER', 'ING_PAPRIKA', 'ING_BROWN_SUGAR', 'ING_LARD', 'ING_GARLIC_POWDER', 'ING_PICKLES', 'ING_WHITE_BREAD'], '["gluten", "milk"]', false, false, true, false, false, false, false, 580, 38, 32, 35, 5, '["american", "nashville", "extremely-spicy", "trending", "cult-favorite"]', 85, 320, '["ranch"]', 5),
('FRD_CHICHARRON_DE_POLLO', 'chicharron-de-pollo', 'Chicharron de Pollo', 'Dominican-style fried chicken marinated in citrus, garlic, and oregano. Crispy, tangy, and incredibly flavorful Latin American favorite.', 'fried_chicken', 'latin_american', 'deep_fried', 'traditional', ARRAY['ING_CHICKEN_PIECES', 'ING_LIME', 'ING_GARLIC', 'ING_OREGANO', 'ING_SOY_SAUCE', 'ING_FLOUR', 'ING_VEGETABLE_OIL', 'ING_ONION'], '["gluten", "soy"]', false, true, true, false, false, true, false, 420, 34, 15, 26, 1, '["dominican", "caribbean", "citrus", "latin"]', 78, 260, '["lime-garlic", "hot-sauce"]', 5);

-- FRIED SEAFOOD (8)
INSERT INTO fried (id, slug, name, description, category, origin, frying_method, status, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity, serving_size_g, dipping_sauces, crispy_rating)
VALUES
('FRD_FISH_AND_CHIPS', 'fish-and-chips', 'Fish and Chips', 'British national treasure: beer-battered cod or haddock fried until golden, served with thick-cut chips, mushy peas, and malt vinegar.', 'fried_seafood', 'british', 'deep_fried', 'iconic', ARRAY['ING_COD', 'ING_FLOUR', 'ING_BEER', 'ING_BAKING_POWDER', 'ING_POTATO', 'ING_SALT', 'ING_MALT_VINEGAR', 'ING_VEGETABLE_OIL'], '["fish", "gluten"]', false, true, true, false, false, true, false, 680, 35, 58, 35, 0, '["british", "pub-food", "national-dish", "comfort-food"]', 93, 400, '["tartar", "malt-vinegar", "curry-sauce"]', 5),
('FRD_CALAMARI_FRITTI', 'calamari-fritti', 'Calamari Fritti', 'Italian fried squid rings coated in seasoned flour, fried until crispy and tender. Served with lemon wedges and marinara sauce.', 'fried_seafood', 'italian', 'deep_fried', 'classic', ARRAY['ING_SQUID', 'ING_FLOUR', 'ING_SEMOLINA', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_LEMON', 'ING_OLIVE_OIL', 'ING_PARSLEY'], '["molluscs", "gluten"]', false, true, true, false, false, true, false, 320, 24, 22, 16, 0, '["italian", "appetizer", "mediterranean", "seafood"]', 90, 200, '["marinara", "aioli", "lemon"]', 4),
('FRD_POPCORN_SHRIMP', 'popcorn-shrimp', 'Popcorn Shrimp', 'Bite-sized Gulf shrimp coated in a Cajun-seasoned batter, fried until golden and crunchy. An American Gulf Coast favorite.', 'fried_seafood', 'southern_us', 'deep_fried', 'popular', ARRAY['ING_SHRIMP', 'ING_FLOUR', 'ING_CORNMEAL', 'ING_CAJUN_SEASONING', 'ING_EGG', 'ING_BUTTERMILK', 'ING_VEGETABLE_OIL'], '["crustaceans", "gluten", "eggs", "milk"]', false, false, true, false, false, true, false, 340, 22, 28, 18, 2, '["cajun", "southern", "appetizer", "bar-food"]', 85, 180, '["cocktail", "remoulade", "tartar"]', 5),
('FRD_COCONUT_SHRIMP', 'coconut-shrimp', 'Coconut Shrimp', 'Jumbo shrimp coated in sweetened coconut flakes and panko, fried to golden perfection. Served with a sweet chili dipping sauce.', 'fried_seafood', 'american', 'deep_fried', 'popular', ARRAY['ING_SHRIMP', 'ING_COCONUT_FLAKES', 'ING_PANKO', 'ING_FLOUR', 'ING_EGG', 'ING_SWEET_CHILI_SAUCE', 'ING_VEGETABLE_OIL'], '["crustaceans", "gluten", "eggs"]', false, true, true, false, false, true, false, 380, 20, 32, 22, 1, '["tropical", "sweet", "appetizer", "party-food"]', 82, 200, '["sweet-chili", "pina-colada", "mango"]', 4),
('FRD_SOFT_SHELL_CRAB', 'soft-shell-crab-fried', 'Fried Soft Shell Crab', 'Whole soft shell crab lightly dusted in seasoned flour and pan-fried until crispy. Entirely edible, shell and all. A seasonal delicacy.', 'fried_seafood', 'american', 'pan_fried', 'premium', ARRAY['ING_SOFT_SHELL_CRAB', 'ING_FLOUR', 'ING_CORNMEAL', 'ING_OLD_BAY', 'ING_BUTTER', 'ING_LEMON', 'ING_PARSLEY'], '["crustaceans", "gluten", "milk"]', false, false, true, false, false, true, false, 420, 28, 18, 28, 1, '["maryland", "seasonal", "delicacy", "premium"]', 75, 180, '["remoulade", "lemon-butter"]', 5),
('FRD_FRITTO_MISTO', 'fritto-misto', 'Fritto Misto', 'Italian mixed fried seafood platter featuring shrimp, calamari, small fish, and vegetables. Light tempura-like batter, served with lemon.', 'fried_seafood', 'italian', 'deep_fried', 'classic', ARRAY['ING_SHRIMP', 'ING_SQUID', 'ING_WHITEBAIT', 'ING_ZUCCHINI', 'ING_FLOUR', 'ING_SPARKLING_WATER', 'ING_LEMON', 'ING_OLIVE_OIL'], '["crustaceans", "molluscs", "fish", "gluten"]', false, true, true, false, false, true, false, 480, 32, 30, 26, 0, '["italian", "mixed", "seafood", "sharing"]', 80, 350, '["aioli", "lemon", "marinara"]', 4),
('FRD_EBIKATSU', 'ebikatsu', 'Ebi Katsu', 'Japanese panko-breaded fried shrimp, part of the katsu family. Crispy, succulent, often served as part of a bento or with tonkatsu sauce.', 'fried_seafood', 'japanese', 'deep_fried', 'classic', ARRAY['ING_SHRIMP', 'ING_PANKO', 'ING_FLOUR', 'ING_EGG', 'ING_SALT', 'ING_TONKATSU_SAUCE', 'ING_CABBAGE', 'ING_VEGETABLE_OIL'], '["crustaceans", "gluten", "eggs"]', false, true, true, false, false, true, false, 360, 24, 32, 16, 0, '["japanese", "katsu", "bento", "crispy"]', 78, 200, '["tonkatsu", "tartar"]', 5),
('FRD_CRAB_CAKES', 'crab-cakes', 'Maryland Crab Cakes', 'Classic Chesapeake Bay crab cakes made with lump crab meat, minimal filler, Old Bay seasoning. Pan-fried to a golden crust, tender inside.', 'fried_seafood', 'american', 'pan_fried', 'signature', ARRAY['ING_CRAB_MEAT', 'ING_MAYONNAISE', 'ING_EGG', 'ING_BREADCRUMBS', 'ING_OLD_BAY', 'ING_DIJON_MUSTARD', 'ING_WORCESTERSHIRE', 'ING_PARSLEY', 'ING_BUTTER'], '["crustaceans", "eggs", "gluten", "milk", "mustard"]', false, false, true, false, false, true, false, 280, 22, 12, 18, 1, '["maryland", "chesapeake", "crab", "premium"]', 88, 150, '["remoulade", "tartar", "lemon-butter"]', 3);

-- FRIED VEGETABLES (8)
INSERT INTO fried (id, slug, name, description, category, origin, frying_method, status, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity, serving_size_g, dipping_sauces, crispy_rating)
VALUES
('FRD_TEMPURA_VEGETABLES', 'tempura-vegetables', 'Vegetable Tempura', 'Assorted Japanese vegetables in light, airy tempura batter. Includes sweet potato, eggplant, shishito peppers, and kabocha squash. Served with tentsuyu dipping sauce.', 'fried_vegetables', 'japanese', 'deep_fried', 'classic', ARRAY['ING_SWEET_POTATO', 'ING_EGGPLANT', 'ING_SHISHITO_PEPPER', 'ING_KABOCHA', 'ING_TEMPURA_FLOUR', 'ING_ICE_WATER', 'ING_DASHI', 'ING_VEGETABLE_OIL'], '["gluten"]', false, true, true, true, true, true, true, 280, 6, 38, 12, 0, '["japanese", "tempura", "light", "vegan"]', 88, 200, '["tentsuyu", "matcha-salt"]', 5),
('FRD_ONION_RINGS', 'onion-rings', 'Onion Rings', 'Thick-cut sweet onion rings coated in seasoned beer batter or panko breadcrumbs, fried until crispy and golden. An American classic.', 'fried_vegetables', 'american', 'deep_fried', 'classic', ARRAY['ING_ONION', 'ING_FLOUR', 'ING_BEER', 'ING_BUTTERMILK', 'ING_PAPRIKA', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_VEGETABLE_OIL'], '["gluten", "milk"]', false, false, true, false, true, true, true, 350, 5, 40, 20, 0, '["american", "side-dish", "burger-companion", "pub-food"]', 92, 180, '["ranch", "ketchup", "bbq"]', 5),
('FRD_ZUCCHINI_STICKS', 'zucchini-sticks', 'Fried Zucchini Sticks', 'Fresh zucchini cut into sticks, breaded with Italian breadcrumbs and parmesan, fried until golden. Light and addictive.', 'fried_vegetables', 'italian', 'deep_fried', 'popular', ARRAY['ING_ZUCCHINI', 'ING_BREADCRUMBS', 'ING_PARMESAN', 'ING_EGG', 'ING_FLOUR', 'ING_ITALIAN_HERBS', 'ING_GARLIC_POWDER', 'ING_VEGETABLE_OIL'], '["gluten", "eggs", "milk"]', false, false, true, false, true, true, true, 260, 10, 24, 14, 0, '["italian", "appetizer", "vegetarian", "light"]', 78, 160, '["marinara", "ranch", "aioli"]', 4),
('FRD_FRIED_PICKLES', 'fried-pickles', 'Fried Pickles', 'Southern specialty: dill pickle slices or spears coated in seasoned cornmeal batter and deep-fried. Tangy, crunchy, and addictive.', 'fried_vegetables', 'southern_us', 'deep_fried', 'popular', ARRAY['ING_PICKLES', 'ING_CORNMEAL', 'ING_FLOUR', 'ING_BUTTERMILK', 'ING_CAJUN_SEASONING', 'ING_EGG', 'ING_VEGETABLE_OIL'], '["gluten", "eggs", "milk"]', false, false, true, false, true, true, true, 240, 5, 28, 14, 1, '["southern", "tangy", "bar-food", "unique"]', 75, 150, '["ranch", "spicy-mayo", "remoulade"]', 4),
('FRD_BLOOMING_ONION', 'blooming-onion', 'Blooming Onion', 'Whole onion cut to bloom open, battered and deep-fried to a golden flower shape. An Australian-American creation, served with spicy dipping sauce.', 'fried_vegetables', 'american', 'deep_fried', 'signature', ARRAY['ING_ONION', 'ING_FLOUR', 'ING_CORNSTARCH', 'ING_PAPRIKA', 'ING_CAYENNE_PEPPER', 'ING_EGG', 'ING_BUTTERMILK', 'ING_VEGETABLE_OIL'], '["gluten", "eggs", "milk"]', false, false, true, false, true, true, true, 1200, 16, 120, 70, 1, '["american", "steakhouse", "sharing", "iconic"]', 82, 500, '["bloom-sauce", "ranch"]', 5),
('FRD_FRIED_GREEN_TOMATOES', 'fried-green-tomatoes', 'Fried Green Tomatoes', 'Southern classic: unripe green tomatoes sliced, breaded in cornmeal, and pan-fried. Tangy, crispy, often served with remoulade.', 'fried_vegetables', 'southern_us', 'pan_fried', 'traditional', ARRAY['ING_GREEN_TOMATO', 'ING_CORNMEAL', 'ING_FLOUR', 'ING_EGG', 'ING_BUTTERMILK', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_BACON_FAT'], '["gluten", "eggs", "milk"]', false, false, true, false, false, false, false, 280, 6, 32, 16, 0, '["southern", "traditional", "soul-food", "seasonal"]', 72, 180, '["remoulade", "ranch", "comeback-sauce"]', 4),
('FRD_OKRA_FRIED', 'fried-okra', 'Fried Okra', 'Southern soul food staple: fresh okra sliced and coated in seasoned cornmeal, fried until crispy. The perfect way to enjoy this vegetable.', 'fried_vegetables', 'southern_us', 'deep_fried', 'traditional', ARRAY['ING_OKRA', 'ING_CORNMEAL', 'ING_FLOUR', 'ING_SALT', 'ING_CAYENNE_PEPPER', 'ING_VEGETABLE_OIL'], '["gluten"]', false, true, true, true, true, true, true, 220, 4, 28, 12, 1, '["southern", "soul-food", "vegan", "side-dish"]', 70, 150, '["ranch", "hot-sauce"]', 4),
('FRD_BHAJJI_PAKORA', 'onion-bhaji', 'Onion Bhaji', 'Indian fried onion fritters made with sliced onions, chickpea flour, and aromatic spices. Crispy, fragrant, perfect with mint chutney.', 'fried_vegetables', 'indian', 'deep_fried', 'classic', ARRAY['ING_ONION', 'ING_CHICKPEA_FLOUR', 'ING_CUMIN', 'ING_CORIANDER', 'ING_TURMERIC', 'ING_GREEN_CHILI', 'ING_CILANTRO', 'ING_VEGETABLE_OIL'], '[]', true, true, true, true, true, true, true, 250, 8, 26, 14, 2, '["indian", "street-food", "vegan", "gluten-free"]', 85, 150, '["mint-chutney", "tamarind-chutney", "raita"]', 5);

-- FRIED APPETIZERS (8)
INSERT INTO fried (id, slug, name, description, category, origin, frying_method, status, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity, serving_size_g, dipping_sauces, crispy_rating)
VALUES
('FRD_MOZZARELLA_STICKS', 'mozzarella-sticks', 'Mozzarella Sticks', 'Classic Italian-American appetizer: mozzarella cheese coated in Italian breadcrumbs, fried until golden with a melty, stretchy center.', 'fried_appetizers', 'american', 'deep_fried', 'classic', ARRAY['ING_MOZZARELLA', 'ING_BREADCRUMBS', 'ING_FLOUR', 'ING_EGG', 'ING_ITALIAN_HERBS', 'ING_GARLIC_POWDER', 'ING_VEGETABLE_OIL'], '["milk", "gluten", "eggs"]', false, false, true, false, true, true, true, 380, 18, 28, 22, 0, '["american", "cheese", "appetizer", "bar-food"]', 92, 180, '["marinara", "ranch"]', 4),
('FRD_JALAPENO_POPPERS', 'jalapeno-poppers', 'Jalapeno Poppers', 'Fresh jalapeno peppers stuffed with cream cheese and cheddar, breaded and fried. Spicy, creamy, and addictive.', 'fried_appetizers', 'american', 'deep_fried', 'popular', ARRAY['ING_JALAPENO', 'ING_CREAM_CHEESE', 'ING_CHEDDAR', 'ING_BREADCRUMBS', 'ING_FLOUR', 'ING_EGG', 'ING_BACON', 'ING_VEGETABLE_OIL'], '["milk", "gluten", "eggs"]', false, false, true, false, false, false, false, 340, 14, 22, 24, 3, '["american", "tex-mex", "spicy", "bar-food"]', 88, 180, '["ranch", "chipotle-mayo", "sour-cream"]', 4),
('FRD_ARANCINI', 'arancini', 'Arancini', 'Sicilian fried risotto balls filled with ragu, mozzarella, and peas. Golden, crispy exterior with a creamy, savory center.', 'fried_appetizers', 'italian', 'deep_fried', 'classic', ARRAY['ING_ARBORIO_RICE', 'ING_PARMESAN', 'ING_MOZZARELLA', 'ING_BEEF_RAGU', 'ING_PEAS', 'ING_EGG', 'ING_BREADCRUMBS', 'ING_SAFFRON', 'ING_OLIVE_OIL'], '["milk", "gluten", "eggs"]', false, false, true, false, false, false, false, 320, 12, 38, 14, 0, '["italian", "sicilian", "street-food", "risotto"]', 85, 150, '["marinara", "aioli"]', 5),
('FRD_CROQUETAS', 'croquetas', 'Croquetas de Jamon', 'Spanish ham croquettes with creamy bechamel and serrano ham, breaded and fried. A beloved tapa across Spain.', 'fried_appetizers', 'spanish', 'deep_fried', 'classic', ARRAY['ING_SERRANO_HAM', 'ING_BUTTER', 'ING_FLOUR', 'ING_MILK', 'ING_NUTMEG', 'ING_EGG', 'ING_BREADCRUMBS', 'ING_OLIVE_OIL'], '["milk", "gluten", "eggs"]', false, false, true, false, false, false, false, 290, 12, 24, 18, 0, '["spanish", "tapas", "ham", "creamy"]', 82, 140, '["aioli", "romesco"]', 4),
('FRD_SCOTCH_EGG', 'scotch-egg', 'Scotch Egg', 'British pub classic: soft-boiled egg wrapped in seasoned pork sausage meat, coated in breadcrumbs and deep-fried.', 'fried_appetizers', 'british', 'deep_fried', 'traditional', ARRAY['ING_EGG', 'ING_PORK_SAUSAGE', 'ING_BREADCRUMBS', 'ING_FLOUR', 'ING_SAGE', 'ING_NUTMEG', 'ING_MUSTARD', 'ING_VEGETABLE_OIL'], '["gluten", "eggs"]', false, true, true, false, false, false, false, 380, 22, 18, 26, 0, '["british", "pub-food", "picnic", "protein"]', 75, 180, '["english-mustard", "piccalilli"]', 4),
('FRD_FRIED_CHEESE_CURDS', 'fried-cheese-curds', 'Fried Cheese Curds', 'Wisconsin specialty: fresh cheese curds coated in beer batter and deep-fried. Squeaky, melty, and irresistible.', 'fried_appetizers', 'american', 'deep_fried', 'popular', ARRAY['ING_CHEESE_CURDS', 'ING_FLOUR', 'ING_BEER', 'ING_BAKING_POWDER', 'ING_SALT', 'ING_PAPRIKA', 'ING_VEGETABLE_OIL'], '["milk", "gluten"]', false, false, true, false, true, true, true, 420, 20, 26, 28, 0, '["american", "wisconsin", "cheese", "midwest"]', 78, 180, '["ranch", "marinara"]', 4),
('FRD_BITTERBALLEN', 'bitterballen', 'Bitterballen', 'Dutch fried meatballs filled with a thick beef ragout, coated in breadcrumbs. Traditionally served with mustard at bars.', 'fried_appetizers', 'international', 'deep_fried', 'traditional', ARRAY['ING_BEEF', 'ING_BUTTER', 'ING_FLOUR', 'ING_BEEF_STOCK', 'ING_ONION', 'ING_NUTMEG', 'ING_EGG', 'ING_BREADCRUMBS', 'ING_VEGETABLE_OIL'], '["gluten", "eggs", "milk"]', false, false, true, false, false, false, false, 260, 14, 20, 16, 0, '["dutch", "bar-snack", "beef", "creamy"]', 72, 150, '["dutch-mustard", "curry-ketchup"]', 4),
('FRD_MAC_CHEESE_BITES', 'fried-mac-and-cheese-bites', 'Fried Mac and Cheese Bites', 'Creamy macaroni and cheese formed into balls, breaded, and deep-fried. Comfort food elevated to finger food perfection.', 'fried_appetizers', 'american', 'deep_fried', 'popular', ARRAY['ING_MACARONI', 'ING_CHEDDAR', 'ING_CREAM', 'ING_BUTTER', 'ING_BREADCRUMBS', 'ING_EGG', 'ING_FLOUR', 'ING_VEGETABLE_OIL'], '["milk", "gluten", "eggs"]', false, false, true, false, true, true, true, 380, 14, 38, 20, 0, '["american", "comfort-food", "cheese", "party-food"]', 84, 180, '["ranch", "bbq", "chipotle-aioli"]', 4);

-- FRIED SNACKS (8)
INSERT INTO fried (id, slug, name, description, category, origin, frying_method, status, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity, serving_size_g, dipping_sauces, crispy_rating)
VALUES
('FRD_FRENCH_FRIES', 'french-fries', 'French Fries', 'Golden, crispy potato fries cut to perfect thickness and fried until golden. The universal side dish loved worldwide.', 'fried_snacks', 'french', 'deep_fried', 'iconic', ARRAY['ING_POTATO', 'ING_VEGETABLE_OIL', 'ING_SALT'], '[]', true, true, true, true, true, true, true, 320, 4, 42, 16, 0, '["universal", "side-dish", "vegan", "comfort-food"]', 98, 180, '["ketchup", "mayo", "aioli"]', 5),
('FRD_BELGIAN_FRITES', 'belgian-frites', 'Belgian Frites', 'Authentic Belgian-style fries: thick-cut, double-fried for extra crispiness, served in a paper cone with mayonnaise.', 'fried_snacks', 'international', 'double_fried', 'classic', ARRAY['ING_POTATO', 'ING_BEEF_TALLOW', 'ING_SALT'], '[]', true, true, true, false, false, false, false, 380, 5, 45, 22, 0, '["belgian", "double-fried", "thick-cut", "authentic"]', 85, 200, '["mayo", "andalouse", "samurai"]', 5),
('FRD_SPRING_ROLLS', 'fried-spring-rolls', 'Fried Spring Rolls', 'Chinese crispy spring rolls filled with vegetables and sometimes pork. Wrapped in thin wheat pastry and fried until golden.', 'fried_snacks', 'chinese', 'deep_fried', 'classic', ARRAY['ING_SPRING_ROLL_WRAPPER', 'ING_CABBAGE', 'ING_CARROT', 'ING_BEAN_SPROUTS', 'ING_MUSHROOMS', 'ING_SOY_SAUCE', 'ING_GINGER', 'ING_VEGETABLE_OIL'], '["gluten", "soy"]', false, true, true, true, true, true, true, 180, 5, 22, 9, 0, '["chinese", "dim-sum", "appetizer", "vegetarian"]', 90, 100, '["sweet-chili", "soy-vinegar", "plum-sauce"]', 5),
('FRD_CHURROS', 'churros', 'Churros', 'Spanish fried dough pastry, ridged and crispy, coated in cinnamon sugar. Traditionally served with thick hot chocolate for dipping.', 'fried_snacks', 'spanish', 'deep_fried', 'classic', ARRAY['ING_FLOUR', 'ING_WATER', 'ING_BUTTER', 'ING_SUGAR', 'ING_CINNAMON', 'ING_SALT', 'ING_VEGETABLE_OIL', 'ING_CHOCOLATE'], '["gluten", "milk"]', false, false, true, false, true, true, true, 280, 4, 36, 14, 0, '["spanish", "dessert", "sweet", "street-food"]', 92, 120, '["chocolate", "dulce-de-leche", "caramel"]', 5),
('FRD_DONUTS', 'classic-donuts', 'Classic Donuts', 'Ring-shaped fried dough, glazed or coated with sugar. A breakfast and snack staple with endless flavor variations.', 'fried_snacks', 'american', 'deep_fried', 'iconic', ARRAY['ING_FLOUR', 'ING_SUGAR', 'ING_EGG', 'ING_BUTTER', 'ING_MILK', 'ING_YEAST', 'ING_POWDERED_SUGAR', 'ING_VEGETABLE_OIL'], '["gluten", "milk", "eggs"]', false, false, true, false, true, true, true, 290, 4, 38, 14, 0, '["american", "breakfast", "sweet", "bakery"]', 94, 90, '["coffee"]', 3),
('FRD_TATER_TOTS', 'tater-tots', 'Tater Tots', 'Bite-sized cylinders of grated potato, seasoned and deep-fried until crispy. An American school cafeteria icon now embraced by gastropubs.', 'fried_snacks', 'american', 'deep_fried', 'popular', ARRAY['ING_POTATO', 'ING_ONION_POWDER', 'ING_SALT', 'ING_VEGETABLE_OIL'], '[]', true, true, true, true, true, true, true, 280, 3, 32, 16, 0, '["american", "snack", "potato", "comfort-food"]', 82, 150, '["ketchup", "cheese-sauce", "ranch"]', 5),
('FRD_HASH_BROWNS', 'hash-browns', 'Hash Browns', 'Crispy shredded or diced potatoes, pan-fried until golden brown. A breakfast classic that pairs perfectly with eggs.', 'fried_snacks', 'american', 'pan_fried', 'classic', ARRAY['ING_POTATO', 'ING_ONION', 'ING_BUTTER', 'ING_SALT', 'ING_BLACK_PEPPER'], '["milk"]', true, false, true, false, true, true, true, 240, 3, 28, 14, 0, '["american", "breakfast", "potato", "diner"]', 88, 150, '["ketchup"]', 5),
('FRD_CORN_DOGS', 'corn-dogs', 'Corn Dogs', 'Hot dogs on a stick, coated in sweet cornmeal batter and deep-fried. An American carnival and fair food icon.', 'fried_snacks', 'american', 'deep_fried', 'classic', ARRAY['ING_HOT_DOG', 'ING_CORNMEAL', 'ING_FLOUR', 'ING_EGG', 'ING_BUTTERMILK', 'ING_SUGAR', 'ING_VEGETABLE_OIL'], '["gluten", "eggs", "milk"]', false, false, true, false, false, false, false, 340, 10, 32, 20, 0, '["american", "carnival", "fair-food", "on-a-stick"]', 78, 150, '["mustard", "ketchup"]', 4);

-- FRIED INTERNATIONAL (8)
INSERT INTO fried (id, slug, name, description, category, origin, frying_method, status, ingredient_ids, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity, serving_size_g, dipping_sauces, crispy_rating)
VALUES
('FRD_FALAFEL', 'falafel', 'Falafel', 'Middle Eastern deep-fried balls made from ground chickpeas, herbs, and spices. Crispy outside, fluffy inside. Served with tahini and pita.', 'fried_international', 'middle_eastern', 'deep_fried', 'classic', ARRAY['ING_CHICKPEAS', 'ING_ONION', 'ING_GARLIC', 'ING_PARSLEY', 'ING_CILANTRO', 'ING_CUMIN', 'ING_CORIANDER', 'ING_VEGETABLE_OIL'], '[]', true, true, true, true, true, true, true, 280, 12, 32, 14, 1, '["middle-eastern", "vegan", "street-food", "healthy"]', 92, 150, '["tahini", "hummus", "hot-sauce"]', 5),
('FRD_SAMOSA', 'samosa', 'Samosa', 'Indian triangular pastry filled with spiced potatoes, peas, and sometimes meat. Crispy, flaky, and aromatic with cumin and coriander.', 'fried_international', 'indian', 'deep_fried', 'classic', ARRAY['ING_FLOUR', 'ING_POTATO', 'ING_PEAS', 'ING_ONION', 'ING_CUMIN', 'ING_CORIANDER', 'ING_GARAM_MASALA', 'ING_GREEN_CHILI', 'ING_VEGETABLE_OIL'], '["gluten"]', false, true, true, true, true, true, true, 260, 6, 32, 14, 2, '["indian", "street-food", "vegetarian", "spiced"]', 90, 140, '["mint-chutney", "tamarind-chutney", "ketchup"]', 5),
('FRD_EMPANADA', 'empanada', 'Empanada', 'Latin American fried or baked turnover filled with seasoned beef, chicken, or cheese. Varies by region from Argentina to Mexico.', 'fried_international', 'latin_american', 'deep_fried', 'classic', ARRAY['ING_FLOUR', 'ING_BEEF', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_OLIVE_OIL', 'ING_EGG', 'ING_VEGETABLE_OIL'], '["gluten", "eggs"]', false, true, true, false, false, false, false, 320, 14, 28, 18, 1, '["latin", "argentinian", "hand-pie", "street-food"]', 88, 150, '["chimichurri", "salsa", "aji"]', 4),
('FRD_PAKORA', 'pakora', 'Vegetable Pakora', 'Indian fritters made with mixed vegetables dipped in spiced chickpea batter and deep-fried. Crispy, spicy, perfect with chai.', 'fried_international', 'indian', 'deep_fried', 'classic', ARRAY['ING_CHICKPEA_FLOUR', 'ING_POTATO', 'ING_SPINACH', 'ING_ONION', 'ING_CUMIN', 'ING_CORIANDER', 'ING_TURMERIC', 'ING_GREEN_CHILI', 'ING_VEGETABLE_OIL'], '[]', true, true, true, true, true, true, true, 240, 8, 28, 12, 2, '["indian", "street-food", "vegan", "gluten-free"]', 85, 150, '["mint-chutney", "tamarind-chutney"]', 5),
('FRD_GYOZA', 'fried-gyoza', 'Fried Gyoza', 'Japanese pan-fried dumplings with pork and vegetable filling. Crispy bottom, tender top, served with ponzu dipping sauce.', 'fried_international', 'japanese', 'pan_fried', 'classic', ARRAY['ING_GYOZA_WRAPPER', 'ING_PORK', 'ING_CABBAGE', 'ING_GARLIC', 'ING_GINGER', 'ING_SESAME_OIL', 'ING_SOY_SAUCE', 'ING_VEGETABLE_OIL'], '["gluten", "soy", "sesame"]', false, true, true, false, false, false, false, 280, 14, 28, 14, 0, '["japanese", "dumplings", "izakaya", "potstickers"]', 90, 150, '["ponzu", "gyoza-sauce", "chili-oil"]', 4),
('FRD_TONKATSU', 'tonkatsu', 'Tonkatsu', 'Japanese breaded and deep-fried pork cutlet, coated in panko for extra crunch. Served with shredded cabbage and tonkatsu sauce.', 'fried_international', 'japanese', 'deep_fried', 'classic', ARRAY['ING_PORK_LOIN', 'ING_PANKO', 'ING_FLOUR', 'ING_EGG', 'ING_CABBAGE', 'ING_TONKATSU_SAUCE', 'ING_VEGETABLE_OIL'], '["gluten", "eggs"]', false, true, true, false, false, false, false, 480, 32, 32, 26, 0, '["japanese", "pork", "katsu", "comfort-food"]', 88, 250, '["tonkatsu-sauce"]', 5),
('FRD_SCHNITZEL', 'wiener-schnitzel', 'Wiener Schnitzel', 'Austrian classic: thin veal cutlet pounded, breaded in flour-egg-breadcrumbs, and pan-fried in butter. Served with lemon.', 'fried_international', 'international', 'pan_fried', 'classic', ARRAY['ING_VEAL', 'ING_FLOUR', 'ING_EGG', 'ING_BREADCRUMBS', 'ING_BUTTER', 'ING_LEMON', 'ING_SALT'], '["gluten", "eggs", "milk"]', false, false, true, false, false, true, false, 520, 38, 28, 30, 0, '["austrian", "german", "classic", "veal"]', 82, 280, '["lemon", "lingonberry"]', 5),
('FRD_LUMPIA', 'lumpia', 'Lumpia', 'Filipino spring rolls with savory meat and vegetable filling wrapped in thin crepe-like wrapper. Crispy and addictive.', 'fried_international', 'international', 'deep_fried', 'popular', ARRAY['ING_LUMPIA_WRAPPER', 'ING_PORK', 'ING_CARROT', 'ING_CABBAGE', 'ING_ONION', 'ING_GARLIC', 'ING_SOY_SAUCE', 'ING_VEGETABLE_OIL'], '["gluten", "soy"]', false, true, true, false, false, false, false, 220, 10, 22, 12, 0, '["filipino", "spring-rolls", "party-food", "asian"]', 80, 120, '["sweet-chili", "vinegar-garlic"]', 5);

-- ============================================
-- VERIFICATION
-- ============================================
SELECT
  'Fried foods imported' AS status,
  COUNT(*) AS total,
  COUNT(DISTINCT category) AS categories
FROM fried;

SELECT category, COUNT(*) as count
FROM fried
GROUP BY category
ORDER BY category;
