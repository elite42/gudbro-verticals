-- ============================================
-- KOREAN DATABASE - Schema Creation
-- ============================================
-- Database Standards v1.1 Compliant
-- Uses TEXT + CHECK constraints (no ENUMs)
--
-- RUN THIS FIRST before any data imports
-- ============================================

-- Create korean table
CREATE TABLE IF NOT EXISTS korean (
  -- IDENTIFICATION
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  korean_name TEXT NOT NULL,
  korean_script TEXT,

  -- CLASSIFICATION
  category TEXT NOT NULL CHECK (category IN (
    'rice_dishes',
    'bbq',
    'stews_soups',
    'noodles',
    'pancakes',
    'fried_chicken',
    'street_food',
    'side_dishes',
    'fermented',
    'desserts'
  )),

  status TEXT NOT NULL CHECK (status IN (
    'active',
    'classic',
    'popular',
    'signature',
    'street_food',
    'traditional',
    'premium',
    'fusion'
  )),

  region TEXT NOT NULL CHECK (region IN (
    'seoul',
    'busan',
    'jeju',
    'jeonju',
    'gyeongsang',
    'jeolla',
    'gangwon',
    'national',
    'royal_cuisine'
  )),

  -- KOREAN-SPECIFIC
  protein_type TEXT NOT NULL CHECK (protein_type IN (
    'beef',
    'pork',
    'chicken',
    'seafood',
    'tofu',
    'mixed',
    'none'
  )),

  cooking_method TEXT NOT NULL CHECK (cooking_method IN (
    'grilled',
    'braised',
    'stir_fried',
    'deep_fried',
    'steamed',
    'boiled',
    'raw',
    'fermented',
    'pan_fried'
  )),

  is_street_food BOOLEAN NOT NULL DEFAULT false,
  is_fermented BOOLEAN NOT NULL DEFAULT false,
  is_spicy BOOLEAN NOT NULL DEFAULT false,
  has_banchan BOOLEAN NOT NULL DEFAULT true,

  -- SISTEMA 5 DIMENSIONI - ALLERGENS & DIETARY
  allergens TEXT[] DEFAULT '{}',
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_dairy_free BOOLEAN NOT NULL DEFAULT true,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_halal BOOLEAN NOT NULL DEFAULT false,
  is_pescatarian BOOLEAN NOT NULL DEFAULT false,

  -- SISTEMA 5 DIMENSIONI - NUTRITION
  calories_per_serving INTEGER,
  protein_g NUMERIC(5,1),
  carbs_g NUMERIC(5,1),
  fat_g NUMERIC(5,1),

  -- SISTEMA 5 DIMENSIONI - SPICE (0-5)
  spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- METADATA
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

  -- TIMESTAMPS
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_korean_category ON korean(category);
CREATE INDEX IF NOT EXISTS idx_korean_status ON korean(status);
CREATE INDEX IF NOT EXISTS idx_korean_region ON korean(region);
CREATE INDEX IF NOT EXISTS idx_korean_protein_type ON korean(protein_type);
CREATE INDEX IF NOT EXISTS idx_korean_is_spicy ON korean(is_spicy);
CREATE INDEX IF NOT EXISTS idx_korean_is_vegetarian ON korean(is_vegetarian);
CREATE INDEX IF NOT EXISTS idx_korean_is_vegan ON korean(is_vegan);
CREATE INDEX IF NOT EXISTS idx_korean_popularity ON korean(popularity DESC);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_korean_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS korean_updated_at ON korean;
CREATE TRIGGER korean_updated_at
  BEFORE UPDATE ON korean
  FOR EACH ROW
  EXECUTE FUNCTION update_korean_updated_at();

-- Enable RLS
ALTER TABLE korean ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "korean_public_read" ON korean;
CREATE POLICY "korean_public_read" ON korean
  FOR SELECT USING (true);

-- ============================================
-- Schema created successfully
-- Next: Run 01-korean-missing-ingredients.sql
-- Then: Run 02-korean-data.sql
-- Finally: Run 03-korean-product-ingredients.sql
-- ============================================
-- ============================================
-- KOREAN DATABASE - Missing Ingredients
-- ============================================
-- Total: 45 new ingredients for Korean cuisine
-- (6 already exist: glass-noodles, gochujang, gochugaru, kimchi, rice-wine, pine-nuts)
--
-- IMPORTANT: Run this BEFORE korean-data.sql
-- Schema: JSONB format for allergens, intolerances, dietary
-- ============================================

-- Korean-specific ingredients
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
-- NOODLES & STARCHES (8) - glass-noodles already exists
('ING_BUCKWHEAT_NOODLES', 'buckwheat-noodles', 'Buckwheat Noodles', 'Chewy noodles made from buckwheat flour, used for naengmyeon', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_INSTANT_NOODLES', 'instant-noodles', 'Instant Noodles', 'Pre-cooked dried noodles for ramyeon', 'grains', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_RICE_CAKES', 'rice-cakes', 'Rice Cakes', 'Chewy cylinder-shaped rice cakes (tteok) for tteokbokki', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_RICE_CAKE_PEARLS', 'rice-cake-pearls', 'Rice Cake Pearls', 'Small chewy rice cake balls for bingsu desserts', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_GLUTINOUS_RICE', 'glutinous-rice', 'Glutinous Rice', 'Sticky sweet rice used for samgyetang and desserts', 'rice', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_GLUTINOUS_RICE_FLOUR', 'glutinous-rice-flour', 'Glutinous Rice Flour', 'Flour from glutinous rice for making tteok and desserts', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_CORN_STARCH', 'corn-starch', 'Corn Starch', 'Starch from corn kernels, used for coating fried chicken', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_ALL_PURPOSE_FLOUR', 'all-purpose-flour', 'All-Purpose Flour', 'Refined wheat flour for pancakes and batters', 'grains', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- KOREAN SAUCES & PASTES (4) - gochujang, gochugaru already exist
('ING_DOENJANG', 'doenjang', 'Doenjang', 'Fermented soybean paste for stews and dipping', 'spices', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_SSAMJANG', 'ssamjang', 'Ssamjang', 'Thick dipping paste made from doenjang and gochujang for BBQ wraps', 'spices', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_CHUNJANG', 'chunjang', 'Chunjang', 'Black bean paste for jajangmyeon noodles', 'spices', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_RICE_SYRUP', 'rice-syrup', 'Rice Syrup', 'Korean corn syrup alternative for glazes and sauces', 'spices', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- FERMENTED & PRESERVED (6) - kimchi already exists
('ING_SALTED_SHRIMP', 'salted-shrimp', 'Salted Shrimp', 'Fermented tiny shrimp for kimchi and seasoning', 'proteins', '{"shellfish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_ANCHOVY_STOCK', 'anchovy-stock', 'Anchovy Stock', 'Stock made from dried anchovies, base for soups and stews', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_DRIED_ANCHOVIES', 'dried-anchovies', 'Dried Anchovies', 'Sun-dried small anchovies for stock and banchan', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_DRIED_KELP', 'dried-kelp', 'Dried Kelp', 'Kombu/dashima for making stock', 'vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_FISH_CAKES', 'fish-cakes', 'Fish Cakes', 'Processed fish cake sheets for soups and tteokbokki', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_PICKLED_RADISH', 'pickled-radish', 'Pickled Radish', 'Yellow pickled radish (danmuji) for gimbap', 'vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- PROTEINS - OFFAL & SPECIALTY (8)
('ING_BEEF_INTESTINES', 'beef-intestines', 'Beef Intestines', 'Beef small intestines for gopchang BBQ', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_PORK_INTESTINES', 'pork-intestines', 'Pork Intestines', 'Pork large intestines for makchang BBQ', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_PIG_INTESTINE', 'pig-intestine', 'Pig Intestine', 'Pig intestine casing for sundae (blood sausage)', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_PIG_BLOOD', 'pig-blood', 'Pig Blood', 'Coagulated pig blood for sundae filling', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_PORK_BONES', 'pork-bones', 'Pork Bones', 'Pork spine bones for gamjatang', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_OX_BONES', 'ox-bones', 'Ox Bones', 'Beef leg bones for seolleongtang broth', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_WHOLE_CHICKEN', 'whole-chicken', 'Whole Chicken', 'Young whole chicken for samgyetang', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_CRAB_STICK', 'crab-stick', 'Crab Stick', 'Imitation crab made from fish surimi', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- SEAFOOD (1)
('ING_POLLOCK', 'pollock', 'Pollock', 'White fish used for jeon pancakes and dried fish dishes', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- VEGETABLES & HERBS (6)
('ING_PERILLA_LEAVES', 'perilla-leaves', 'Perilla Leaves', 'Aromatic Korean herb (kkaennip) for wraps and garnish', 'herbs', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_PERILLA_SEEDS', 'perilla-seeds', 'Perilla Seeds', 'Ground perilla seeds for gamjatang seasoning', 'spices', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_GOSARI', 'gosari', 'Gosari', 'Dried fernbrake/bracken fern for bibimbap and yukgaejang', 'vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_SOY_BEAN_SPROUTS', 'soy-bean-sprouts', 'Soybean Sprouts', 'Large-headed sprouts from soybeans for kongnamul', 'vegetables', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_ASIAN_PEAR', 'asian-pear', 'Asian Pear', 'Korean pear used for marinades and naengmyeon', 'fruits', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_EDIBLE_FLOWERS', 'edible-flowers', 'Edible Flowers', 'Decorative flowers for hwajeon pancakes', 'vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- TRADITIONAL INGREDIENTS (7) - pine-nuts already exists
('ING_GINSENG', 'ginseng', 'Ginseng', 'Korean ginseng root for samgyetang and health dishes', 'herbs', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_JUJUBE', 'jujube', 'Jujube', 'Dried red dates for samgyetang and desserts', 'fruits', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_GINKGO_NUTS', 'ginkgo-nuts', 'Ginkgo Nuts', 'Nuts from ginkgo tree for samgyetang', 'spices', '{"tree_nuts": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": false, "pescatarian": true}'),
('ING_CHESTNUTS', 'chestnuts', 'Chestnuts', 'Roasted or boiled chestnuts for samgyetang', 'spices', '{"tree_nuts": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": false, "pescatarian": true}'),
('ING_PINE_NEEDLES', 'pine-needles', 'Pine Needles', 'Fresh pine needles for steaming songpyeon', 'herbs', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_PINE_POLLEN', 'pine-pollen', 'Pine Pollen', 'Yellow pollen for traditional dasik tea cookies', 'spices', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_BARLEY', 'barley', 'Barley', 'Grain used in sundae and tea drinks', 'grains', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- DESSERT & SWEET INGREDIENTS (7)
('ING_RED_BEAN_PASTE', 'red-bean-paste', 'Red Bean Paste', 'Sweet paste from adzuki beans for desserts', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_MOCHI', 'mochi', 'Mochi', 'Chewy rice cake pieces for bingsu topping', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_SHAVED_ICE', 'shaved-ice', 'Shaved Ice', 'Finely shaved ice base for bingsu', 'mixers', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_ROASTED_SOYBEAN_POWDER', 'roasted-soybean-powder', 'Roasted Soybean Powder', 'Kinako/injeolmi powder for desserts', 'grains', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_MALT_POWDER', 'malt-powder', 'Malt Powder', 'Enzyme powder for making sikhye rice punch', 'grains', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_DRIED_PERSIMMON', 'dried-persimmon', 'Dried Persimmon', 'Dried fruit for sujeonggwa punch', 'fruits', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_SOY_MILK', 'soy-milk', 'Soy Milk', 'Plant milk for kongguksu noodles', 'dairy', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- PROCESSED/CONVENIENCE (4)
('ING_SPAM', 'spam', 'Spam', 'Canned pork product for budae jjigae', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_HOT_DOGS', 'hot-dogs', 'Hot Dogs', 'Processed sausages for budae jjigae', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_CANNED_TUNA', 'canned-tuna', 'Canned Tuna', 'Preserved tuna for gimbap filling', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_CHEESE_POWDER', 'cheese-powder', 'Cheese Powder', 'Powdered cheese for fried chicken seasoning', 'dairy', '{"milk": true}', '{}', '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": false, "nut_free": true, "pescatarian": true}'),

-- SOFT TOFU (1)
('ING_SOFT_TOFU', 'soft-tofu', 'Soft Tofu', 'Silken tofu for sundubu jjigae', 'proteins', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}')

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Summary: 45 new Korean ingredients added
-- (6 already exist: glass-noodles, gochujang, gochugaru, kimchi, rice-wine, pine-nuts)
-- Categories used: grains, rice, spices, vegetables, proteins, herbs, fruits, dairy, mixers
-- Schema: JSONB format (allergens, intolerances, dietary)
-- ============================================
-- ============================================
-- KOREAN DATABASE - Main Data Import
-- ============================================
-- Total: 77 Korean dishes across 9 categories
--
-- IMPORTANT: Run 01-korean-missing-ingredients.sql FIRST
-- ============================================

-- BBQ (8 dishes)
INSERT INTO korean (id, slug, name, description, korean_name, korean_script, category, status, region, protein_type, cooking_method, is_street_food, is_fermented, is_spicy, has_banchan, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_pescatarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity)
VALUES
('KOREAN_SAMGYEOPSAL', 'samgyeopsal', 'Grilled Pork Belly', 'Thick slices of pork belly grilled at the table, wrapped in lettuce with garlic, ssamjang, and kimchi. Korea''s most beloved BBQ.', 'Samgyeopsal', '삼겹살', 'bbq', 'signature', 'national', 'pork', 'grilled', false, false, false, true, ARRAY['soy', 'sesame'], true, true, true, false, false, false, false, 550, 25, 5, 48, 1, ARRAY['iconic', 'bbq', 'pork', 'social-dining'], 98),
('KOREAN_BULGOGI', 'bulgogi', 'Marinated Beef BBQ', 'Thinly sliced beef marinated in soy sauce, sugar, sesame oil, and pear juice, then grilled. Korea''s most famous dish internationally.', 'Bulgogi', '불고기', 'bbq', 'signature', 'national', 'beef', 'grilled', false, false, false, true, ARRAY['soy', 'sesame'], false, true, true, false, false, false, false, 380, 32, 15, 22, 0, ARRAY['iconic', 'beef', 'sweet', 'famous-worldwide'], 97),
('KOREAN_GALBI', 'galbi', 'Grilled Short Ribs', 'Beef short ribs marinated in sweet soy sauce and grilled, with meat tender enough to fall off the bone.', 'Galbi', '갈비', 'bbq', 'premium', 'national', 'beef', 'grilled', false, false, false, true, ARRAY['soy', 'sesame'], false, true, true, false, false, false, false, 480, 35, 18, 30, 0, ARRAY['premium', 'beef', 'ribs', 'celebration'], 92),
('KOREAN_DWAEJI_GALBI', 'dwaeji-galbi', 'Grilled Pork Ribs', 'Pork spare ribs marinated in spicy gochujang sauce and grilled until caramelized.', 'Dwaeji Galbi', '돼지갈비', 'bbq', 'popular', 'national', 'pork', 'grilled', false, false, true, true, ARRAY['soy', 'sesame'], false, true, true, false, false, false, false, 520, 30, 20, 35, 3, ARRAY['spicy', 'pork', 'ribs', 'popular'], 85),
('KOREAN_DAKGALBI', 'dakgalbi', 'Spicy Stir-Fried Chicken', 'Chicken pieces stir-fried with vegetables in spicy gochujang sauce on a hot plate. Chuncheon regional specialty.', 'Dakgalbi', '닭갈비', 'bbq', 'signature', 'gangwon', 'chicken', 'stir_fried', false, false, true, true, ARRAY['soy', 'dairy'], false, false, true, false, false, true, false, 450, 35, 30, 22, 4, ARRAY['spicy', 'chicken', 'chuncheon', 'cheese'], 88),
('KOREAN_CHADOLBAEGI', 'chadolbaegi', 'Beef Brisket BBQ', 'Thinly sliced beef brisket grilled quickly at high heat, eaten with salt and sesame oil.', 'Chadolbaegi', '차돌박이', 'bbq', 'popular', 'national', 'beef', 'grilled', false, false, false, true, ARRAY['sesame'], true, true, true, false, false, false, false, 420, 28, 2, 35, 0, ARRAY['beef', 'brisket', 'simple', 'premium'], 82),
('KOREAN_GOPCHANG', 'gopchang', 'Grilled Beef Intestines', 'Beef small intestines grilled until crispy, a popular late-night drinking food in Korea.', 'Gopchang', '곱창', 'bbq', 'traditional', 'national', 'beef', 'grilled', true, false, false, true, ARRAY['sesame'], true, true, true, false, false, false, false, 350, 22, 3, 28, 1, ARRAY['offal', 'drinking-food', 'late-night', 'crispy'], 72),
('KOREAN_MAKCHANG', 'makchang', 'Grilled Pork Intestines', 'Pork large intestines grilled until chewy and crispy, a Daegu specialty often enjoyed with soju.', 'Makchang', '막창', 'bbq', 'traditional', 'gyeongsang', 'pork', 'grilled', true, false, false, true, ARRAY['sesame', 'soy'], true, true, true, false, false, false, false, 380, 20, 2, 32, 1, ARRAY['offal', 'daegu', 'chewy', 'soju-pairing'], 68),

-- RICE DISHES (8 dishes)
('KOREAN_BIBIMBAP', 'bibimbap', 'Mixed Rice Bowl', 'Rice topped with seasoned vegetables, meat, a fried egg, and gochujang, mixed together before eating. One of Korea''s most iconic dishes.', 'Bibimbap', '비빔밥', 'rice_dishes', 'signature', 'jeonju', 'beef', 'raw', false, false, true, true, ARRAY['egg', 'soy', 'sesame'], true, true, true, false, false, false, false, 520, 25, 65, 18, 2, ARRAY['iconic', 'healthy', 'colorful', 'jeonju'], 96),
('KOREAN_DOLSOT_BIBIMBAP', 'dolsot-bibimbap', 'Hot Stone Pot Bibimbap', 'Bibimbap served in a sizzling stone pot that creates a crispy rice crust at the bottom.', 'Dolsot Bibimbap', '돌솥비빔밥', 'rice_dishes', 'popular', 'national', 'beef', 'pan_fried', false, false, true, true, ARRAY['egg', 'soy', 'sesame'], true, true, true, false, false, false, false, 550, 26, 68, 20, 2, ARRAY['hot-stone', 'crispy-rice', 'sizzling'], 90),
('KOREAN_KIMCHI_BOKKEUMBAP', 'kimchi-bokkeumbap', 'Kimchi Fried Rice', 'Stir-fried rice with aged kimchi, pork, and vegetables, topped with a fried egg. Perfect comfort food.', 'Kimchi Bokkeumbap', '김치볶음밥', 'rice_dishes', 'classic', 'national', 'pork', 'stir_fried', false, true, true, false, ARRAY['egg', 'sesame', 'fish'], true, true, true, false, false, false, false, 480, 18, 55, 22, 3, ARRAY['comfort-food', 'kimchi', 'fried-rice', 'home-cooking'], 88),
('KOREAN_GIMBAP', 'gimbap', 'Korean Seaweed Rice Rolls', 'Rice and various fillings rolled in dried seaweed, sliced into bite-sized pieces. Korea''s favorite picnic and lunch food.', 'Gimbap', '김밥', 'rice_dishes', 'signature', 'national', 'mixed', 'raw', true, false, false, false, ARRAY['egg', 'sesame', 'gluten'], false, true, true, false, false, false, false, 350, 12, 50, 12, 0, ARRAY['portable', 'lunch', 'picnic', 'affordable'], 94),
('KOREAN_CHAMCHI_GIMBAP', 'chamchi-gimbap', 'Tuna Gimbap', 'Gimbap filled with seasoned tuna, perfect for a quick and nutritious meal.', 'Chamchi Gimbap', '참치김밥', 'rice_dishes', 'popular', 'national', 'seafood', 'raw', true, false, false, false, ARRAY['fish', 'egg', 'sesame'], false, false, true, false, false, true, true, 380, 18, 48, 14, 0, ARRAY['tuna', 'healthy', 'convenience'], 82),
('KOREAN_BOKKEUMBAP', 'bokkeumbap', 'Korean Fried Rice', 'Stir-fried rice with vegetables and protein, seasoned with soy sauce and sesame oil.', 'Bokkeumbap', '볶음밥', 'rice_dishes', 'classic', 'national', 'mixed', 'stir_fried', false, false, false, false, ARRAY['egg', 'soy', 'sesame'], false, true, true, false, true, true, true, 420, 14, 58, 15, 0, ARRAY['simple', 'home-cooking', 'versatile'], 78),
('KOREAN_OMURICE', 'omurice', 'Korean Omelette Rice', 'Fried rice wrapped in a thin omelette, topped with ketchup. A Korean-Japanese fusion favorite.', 'Omurice', '오므라이스', 'rice_dishes', 'popular', 'national', 'chicken', 'pan_fried', false, false, false, false, ARRAY['egg', 'dairy'], true, false, true, false, false, true, false, 480, 22, 55, 20, 0, ARRAY['fusion', 'comfort-food', 'kids-favorite'], 80),
('KOREAN_NURUNGJI', 'nurungji', 'Crispy Rice', 'Crispy scorched rice from the bottom of the pot, served with hot water as a simple tea or snack.', 'Nurungji', '누룽지', 'rice_dishes', 'traditional', 'national', 'none', 'pan_fried', false, false, false, false, ARRAY[]::text[], true, true, true, true, true, true, true, 150, 3, 32, 1, 0, ARRAY['traditional', 'simple', 'digestive', 'snack'], 65),

-- STEWS & SOUPS (10 dishes)
('KOREAN_KIMCHI_JJIGAE', 'kimchi-jjigae', 'Kimchi Stew', 'Hearty stew made with aged kimchi, pork, and tofu in a rich, spicy broth. Korea''s ultimate comfort food.', 'Kimchi Jjigae', '김치찌개', 'stews_soups', 'signature', 'national', 'pork', 'boiled', false, true, true, true, ARRAY['soy', 'fish', 'sesame'], true, true, true, false, false, false, false, 320, 20, 12, 22, 4, ARRAY['comfort-food', 'spicy', 'fermented', 'everyday'], 95),
('KOREAN_DOENJANG_JJIGAE', 'doenjang-jjigae', 'Soybean Paste Stew', 'Traditional stew made with fermented soybean paste, tofu, and vegetables. Deep, earthy umami flavor.', 'Doenjang Jjigae', '된장찌개', 'stews_soups', 'classic', 'national', 'tofu', 'boiled', false, true, false, true, ARRAY['soy', 'fish'], true, true, true, false, false, true, false, 280, 15, 18, 16, 1, ARRAY['fermented', 'healthy', 'traditional', 'umami'], 90),
('KOREAN_SUNDUBU_JJIGAE', 'sundubu-jjigae', 'Soft Tofu Stew', 'Spicy stew with silky soft tofu, often with seafood or pork, topped with a raw egg.', 'Sundubu Jjigae', '순두부찌개', 'stews_soups', 'signature', 'national', 'tofu', 'boiled', false, false, true, true, ARRAY['soy', 'egg', 'shellfish', 'sesame'], true, true, true, false, false, false, false, 350, 22, 10, 25, 4, ARRAY['silky', 'spicy', 'popular', 'restaurant-favorite'], 92),
('KOREAN_BUDAE_JJIGAE', 'budae-jjigae', 'Army Base Stew', 'Fusion stew born after the Korean War, mixing kimchi with American ingredients like Spam, hot dogs, and beans.', 'Budae Jjigae', '부대찌개', 'stews_soups', 'popular', 'seoul', 'mixed', 'boiled', false, true, true, true, ARRAY['soy', 'gluten', 'dairy'], false, false, true, false, false, false, false, 550, 25, 45, 32, 3, ARRAY['fusion', 'history', 'comfort-food', 'uijeongbu'], 85),
('KOREAN_GAMJATANG', 'gamjatang', 'Pork Bone Stew', 'Rich, spicy stew made with pork spine bones, potatoes, and vegetables. Popular late-night dish.', 'Gamjatang', '감자탕', 'stews_soups', 'popular', 'national', 'pork', 'boiled', false, false, true, true, ARRAY['soy', 'sesame'], true, true, true, false, false, false, false, 480, 30, 25, 28, 3, ARRAY['pork-bones', 'hearty', 'late-night', 'hangover-cure'], 82),
('KOREAN_SAMGYETANG', 'samgyetang', 'Ginseng Chicken Soup', 'Whole young chicken stuffed with rice, ginseng, jujubes, and garlic, simmered until tender. Traditional health food.', 'Samgyetang', '삼계탕', 'stews_soups', 'traditional', 'national', 'chicken', 'boiled', false, false, false, true, ARRAY['tree_nuts'], true, true, false, false, false, true, false, 450, 35, 30, 22, 0, ARRAY['health-food', 'summer', 'ginseng', 'restorative'], 88),
('KOREAN_GALBITANG', 'galbitang', 'Short Rib Soup', 'Clear beef short rib soup with radish and glass noodles. Elegant and comforting.', 'Galbitang', '갈비탕', 'stews_soups', 'classic', 'national', 'beef', 'boiled', false, false, false, true, ARRAY['soy', 'egg'], true, true, true, false, false, false, false, 380, 28, 15, 24, 0, ARRAY['clear-soup', 'beef', 'elegant', 'celebration'], 80),
('KOREAN_SEOLLEONGTANG', 'seolleongtang', 'Ox Bone Soup', 'Milky white soup made by boiling ox bones for hours. Served with rice and seasoned at the table.', 'Seolleongtang', '설렁탕', 'stews_soups', 'traditional', 'seoul', 'beef', 'boiled', false, false, false, true, ARRAY[]::text[], true, true, true, false, false, false, false, 350, 25, 20, 18, 0, ARRAY['milky', 'collagen', 'traditional', 'seoul'], 85),
('KOREAN_YUKGAEJANG', 'yukgaejang', 'Spicy Beef Soup', 'Fiery red soup with shredded beef, fernbrake, and vegetables. Known for its intense spiciness.', 'Yukgaejang', '육개장', 'stews_soups', 'classic', 'national', 'beef', 'boiled', false, false, true, true, ARRAY['egg', 'sesame'], true, true, true, false, false, false, false, 380, 30, 15, 22, 5, ARRAY['very-spicy', 'hearty', 'hangover-cure', 'summer'], 78),
('KOREAN_DAKTORITANG', 'daktoritang', 'Spicy Chicken Stew', 'Chicken pieces braised with potatoes, carrots, and onions in a spicy gochugaru sauce.', 'Dakdoritang', '닭도리탕', 'stews_soups', 'popular', 'national', 'chicken', 'braised', false, false, true, true, ARRAY['soy'], false, true, true, false, false, true, false, 420, 32, 28, 20, 3, ARRAY['chicken', 'spicy', 'hearty', 'family-meal'], 82),

-- NOODLES (8 dishes)
('KOREAN_JAPCHAE', 'japchae', 'Glass Noodle Stir-Fry', 'Sweet potato glass noodles stir-fried with vegetables, beef, and sesame oil. A royal court dish now enjoyed at celebrations.', 'Japchae', '잡채', 'noodles', 'signature', 'royal_cuisine', 'beef', 'stir_fried', false, false, false, true, ARRAY['soy', 'sesame'], true, true, true, false, false, false, false, 380, 15, 55, 12, 0, ARRAY['celebration', 'royal-cuisine', 'sweet', 'holiday'], 92),
('KOREAN_NAENGMYEON', 'naengmyeon', 'Cold Buckwheat Noodles', 'Chewy buckwheat noodles served in icy beef broth with sliced beef, egg, and vegetables. Perfect summer dish.', 'Mul Naengmyeon', '물냉면', 'noodles', 'signature', 'national', 'beef', 'boiled', false, false, false, true, ARRAY['egg', 'gluten'], false, true, true, false, false, false, false, 420, 20, 65, 8, 0, ARRAY['summer', 'cold', 'refreshing', 'pyongyang-style'], 88),
('KOREAN_BIBIM_NAENGMYEON', 'bibim-naengmyeon', 'Spicy Mixed Cold Noodles', 'Cold buckwheat noodles mixed with spicy gochujang sauce, no broth. Hamhung-style variation.', 'Bibim Naengmyeon', '비빔냉면', 'noodles', 'popular', 'national', 'beef', 'raw', false, false, true, true, ARRAY['egg', 'gluten', 'soy', 'sesame'], false, true, true, false, false, false, false, 450, 18, 70, 10, 4, ARRAY['summer', 'spicy', 'cold', 'hamhung-style'], 85),
('KOREAN_KALGUKSU', 'kalguksu', 'Knife-Cut Noodle Soup', 'Hand-cut wheat noodles in anchovy or chicken broth with zucchini. Comforting and chewy.', 'Kalguksu', '칼국수', 'noodles', 'classic', 'national', 'seafood', 'boiled', false, false, false, true, ARRAY['gluten', 'fish', 'sesame'], false, true, true, false, false, true, true, 380, 12, 60, 10, 0, ARRAY['comfort-food', 'hand-cut', 'chewy', 'rainy-day'], 82),
('KOREAN_JAJANGMYEON', 'jajangmyeon', 'Black Bean Noodles', 'Thick wheat noodles topped with savory black bean sauce with pork and vegetables. Korean-Chinese favorite.', 'Jajangmyeon', '자장면', 'noodles', 'signature', 'national', 'pork', 'stir_fried', false, true, false, true, ARRAY['gluten', 'soy'], false, true, true, false, false, false, false, 550, 18, 75, 20, 0, ARRAY['korean-chinese', 'delivery', 'comfort-food', 'black-day'], 90),
('KOREAN_JJAMPPONG', 'jjamppong', 'Spicy Seafood Noodle Soup', 'Spicy red noodle soup loaded with seafood, vegetables, and chewy noodles. Korean-Chinese classic.', 'Jjamppong', '짬뽕', 'noodles', 'popular', 'national', 'seafood', 'boiled', false, false, true, true, ARRAY['gluten', 'shellfish', 'mollusk'], false, true, true, false, false, false, false, 480, 25, 55, 18, 4, ARRAY['korean-chinese', 'seafood', 'spicy', 'delivery'], 88),
('KOREAN_RAMYEON', 'ramyeon', 'Korean Instant Noodles', 'Korean-style instant ramen with spicy broth, often upgraded with egg, cheese, or vegetables.', 'Ramyeon', '라면', 'noodles', 'popular', 'national', 'none', 'boiled', true, false, true, false, ARRAY['gluten', 'egg', 'dairy'], false, false, true, false, true, true, true, 450, 12, 60, 18, 3, ARRAY['instant', 'late-night', 'comfort-food', 'upgradeable'], 92),
('KOREAN_KONGGUKSU', 'kongguksu', 'Cold Soy Milk Noodles', 'Chilled wheat noodles in creamy, nutty soy milk broth. Refreshing summer specialty.', 'Kongguksu', '콩국수', 'noodles', 'traditional', 'national', 'none', 'boiled', false, false, false, true, ARRAY['gluten', 'soy', 'sesame'], false, true, true, true, true, true, true, 380, 15, 55, 12, 0, ARRAY['summer', 'cold', 'creamy', 'healthy'], 75),

-- PANCAKES (7 dishes)
('KOREAN_PAJEON', 'pajeon', 'Green Onion Pancake', 'Savory Korean pancake loaded with green onions, served with soy dipping sauce. Perfect rainy day food.', 'Pajeon', '파전', 'pancakes', 'signature', 'national', 'seafood', 'pan_fried', true, false, false, false, ARRAY['gluten', 'egg', 'shellfish', 'mollusk', 'soy'], false, true, true, false, false, true, true, 320, 12, 38, 14, 0, ARRAY['rainy-day', 'seafood', 'crispy', 'makgeolli-pairing'], 90),
('KOREAN_HAEMUL_PAJEON', 'haemul-pajeon', 'Seafood Green Onion Pancake', 'Large savory pancake packed with assorted seafood and green onions. Busan specialty.', 'Haemul Pajeon', '해물파전', 'pancakes', 'popular', 'busan', 'seafood', 'pan_fried', true, false, false, false, ARRAY['gluten', 'egg', 'shellfish', 'mollusk'], false, true, true, false, false, true, true, 380, 18, 35, 18, 0, ARRAY['seafood', 'busan', 'crispy', 'premium'], 85),
('KOREAN_KIMCHI_JEON', 'kimchi-jeon', 'Kimchi Pancake', 'Crispy pancake made with aged kimchi and pork, tangy and slightly spicy.', 'Kimchijeon', '김치전', 'pancakes', 'classic', 'national', 'pork', 'pan_fried', true, true, true, false, ARRAY['gluten', 'egg', 'fish'], false, true, true, false, false, false, false, 350, 14, 32, 18, 3, ARRAY['kimchi', 'spicy', 'crispy', 'comfort-food'], 88),
('KOREAN_BINDAETTEOK', 'bindaetteok', 'Mung Bean Pancake', 'Savory pancakes made from ground mung beans with kimchi, pork, and vegetables. Traditional Seoul market food.', 'Bindaetteok', '빈대떡', 'pancakes', 'traditional', 'seoul', 'pork', 'pan_fried', true, true, false, false, ARRAY['fish'], true, true, true, false, false, false, false, 380, 16, 28, 22, 1, ARRAY['traditional', 'gwangjang-market', 'protein-rich', 'gluten-free'], 82),
('KOREAN_HOBAK_JEON', 'hobak-jeon', 'Zucchini Pancake', 'Simple pan-fried zucchini slices in egg batter. Common banchan and ceremonial food.', 'Hobakjeon', '호박전', 'pancakes', 'traditional', 'national', 'none', 'pan_fried', false, false, false, true, ARRAY['gluten', 'egg'], false, true, true, false, true, true, true, 150, 6, 12, 9, 0, ARRAY['simple', 'banchan', 'ceremonial', 'vegetarian'], 70),
('KOREAN_DONGTAE_JEON', 'dongtae-jeon', 'Pollock Fish Pancake', 'Pan-fried pollock fillets in egg batter. Traditional ceremonial dish.', 'Dongtaejeon', '동태전', 'pancakes', 'traditional', 'national', 'seafood', 'pan_fried', false, false, false, true, ARRAY['gluten', 'egg', 'fish'], false, true, true, false, false, true, true, 220, 18, 10, 12, 0, ARRAY['fish', 'ceremonial', 'traditional', 'lunar-new-year'], 65),
('KOREAN_GAMJA_JEON', 'gamja-jeon', 'Potato Pancake', 'Crispy pancake made from grated potato, simple and comforting.', 'Gamjajeon', '감자전', 'pancakes', 'classic', 'gangwon', 'none', 'pan_fried', true, false, false, false, ARRAY[]::text[], true, true, true, true, true, true, true, 200, 4, 32, 8, 0, ARRAY['vegan', 'gluten-free', 'crispy', 'gangwon'], 72),

-- FRIED CHICKEN (8 dishes)
('KOREAN_YANGNYEOM_CHICKEN', 'yangnyeom-chicken', 'Sweet & Spicy Fried Chicken', 'Double-fried chicken coated in sweet and spicy gochujang glaze. The most popular Korean fried chicken variety.', 'Yangnyeom Chikin', '양념치킨', 'fried_chicken', 'signature', 'national', 'chicken', 'deep_fried', false, false, true, true, ARRAY['soy'], true, true, true, false, false, true, false, 480, 28, 35, 25, 3, ARRAY['iconic', 'sweet-spicy', 'crispy', 'beer-pairing'], 96),
('KOREAN_HURAIDEU_CHICKEN', 'huraideu-chicken', 'Korean Original Fried Chicken', 'Classic double-fried chicken with ultra-crispy coating. The foundation of Korean fried chicken culture.', 'Huraideu Chikin', '후라이드치킨', 'fried_chicken', 'classic', 'national', 'chicken', 'deep_fried', false, false, false, true, ARRAY[]::text[], true, true, true, false, false, true, false, 420, 30, 25, 22, 0, ARRAY['classic', 'crispy', 'original', 'chi-maek'], 92),
('KOREAN_GARLIC_CHICKEN', 'garlic-soy-chicken', 'Garlic Soy Fried Chicken', 'Crispy fried chicken glazed with sweet garlic soy sauce, often topped with fresh garlic.', 'Ganjang Maneul Chikin', '간장마늘치킨', 'fried_chicken', 'popular', 'national', 'chicken', 'deep_fried', false, false, false, true, ARRAY['soy'], true, true, true, false, false, true, false, 450, 28, 32, 24, 0, ARRAY['garlic', 'savory-sweet', 'popular', 'aromatic'], 88),
('KOREAN_HONEY_BUTTER_CHICKEN', 'honey-butter-chicken', 'Honey Butter Fried Chicken', 'Crispy chicken coated in sweet honey butter sauce. A modern Korean chicken innovation.', 'Heoni Beoteo Chikin', '허니버터치킨', 'fried_chicken', 'popular', 'national', 'chicken', 'deep_fried', false, false, false, true, ARRAY['dairy'], true, false, true, false, false, true, false, 520, 26, 40, 28, 0, ARRAY['sweet', 'butter', 'modern', 'kid-friendly'], 85),
('KOREAN_SNOW_CHEESE_CHICKEN', 'snow-cheese-chicken', 'Snow Cheese Fried Chicken', 'Fried chicken dusted with sweet cheese powder, creating a snow-like coating.', 'Seuno Chijeu Chikin', '스노우치즈치킨', 'fried_chicken', 'fusion', 'national', 'chicken', 'deep_fried', false, false, false, true, ARRAY['dairy'], true, false, true, false, false, true, false, 490, 27, 38, 26, 0, ARRAY['cheese', 'sweet', 'fusion', 'trendy'], 78),
('KOREAN_BHC_CHICKEN', 'bburinkle-chicken', 'Seasoning Powder Fried Chicken', 'Fried chicken with various seasoning powders sprinkled on top. Popularized by Korean chicken chains.', 'Ppuringkeu Chikin', '뿌링클치킨', 'fried_chicken', 'popular', 'national', 'chicken', 'deep_fried', false, false, false, true, ARRAY['dairy'], true, false, true, false, false, true, false, 460, 28, 34, 24, 0, ARRAY['seasoned', 'chain', 'popular', 'savory'], 82),
('KOREAN_PADAK', 'padak', 'Green Onion Fried Chicken', 'Fried chicken topped with generous amounts of fresh sliced green onions.', 'Padak', '파닭', 'fried_chicken', 'popular', 'national', 'chicken', 'deep_fried', false, false, false, true, ARRAY['soy'], true, true, true, false, false, true, false, 430, 29, 28, 22, 0, ARRAY['green-onion', 'fresh', 'refreshing', 'popular'], 80),
('KOREAN_DAKGANGJEONG', 'dakgangjeong', 'Crispy Sweet Chicken', 'Bite-sized crispy fried chicken in sweet and sticky soy glaze. Traditional Korean chicken snack.', 'Dakgangjeong', '닭강정', 'fried_chicken', 'traditional', 'national', 'chicken', 'deep_fried', true, false, false, false, ARRAY['soy', 'sesame'], true, true, true, false, false, true, false, 380, 22, 35, 18, 0, ARRAY['sweet', 'sticky', 'snack', 'traditional'], 78),

-- STREET FOOD (10 dishes)
('KOREAN_TTEOKBOKKI', 'tteokbokki', 'Spicy Rice Cakes', 'Chewy rice cakes simmered in sweet and spicy gochujang sauce. Korea''s most iconic street food.', 'Tteokbokki', '떡볶이', 'street_food', 'signature', 'national', 'none', 'boiled', true, false, true, false, ARRAY['soy', 'fish', 'gluten'], false, true, true, false, false, true, true, 380, 8, 72, 6, 4, ARRAY['iconic', 'chewy', 'spicy', 'comfort-food'], 98),
('KOREAN_RABOKKI', 'rabokki', 'Rice Cake & Ramen', 'Tteokbokki with instant ramen noodles added. The ultimate Korean comfort food combo.', 'Rabokki', '라볶이', 'street_food', 'popular', 'national', 'none', 'boiled', true, false, true, false, ARRAY['gluten', 'fish', 'soy', 'egg'], false, true, true, false, false, true, true, 520, 14, 85, 12, 4, ARRAY['fusion', 'carbs', 'popular', 'late-night'], 88),
('KOREAN_ODENG', 'odeng', 'Fish Cake Skewers', 'Fish cake sheets on skewers simmered in savory broth. Perfect cold weather street food.', 'Odeng', '오뎅', 'street_food', 'classic', 'national', 'seafood', 'boiled', true, false, false, false, ARRAY['fish', 'soy', 'gluten'], false, true, true, false, false, true, true, 150, 12, 15, 4, 0, ARRAY['warming', 'winter', 'light', 'broth'], 85),
('KOREAN_HOTTEOK', 'hotteok', 'Sweet Filled Pancake', 'Fried dough pancake filled with brown sugar, cinnamon, and nuts. Beloved winter street snack.', 'Hotteok', '호떡', 'street_food', 'signature', 'national', 'none', 'pan_fried', true, false, false, false, ARRAY['gluten', 'peanuts'], false, true, false, true, true, true, true, 280, 5, 45, 10, 0, ARRAY['sweet', 'winter', 'dessert', 'warm'], 90),
('KOREAN_BUNGEOPPANG', 'bungeoppang', 'Fish-Shaped Pastry', 'Fish-shaped waffle filled with sweet red bean paste. Winter street food classic.', 'Bungeoppang', '붕어빵', 'street_food', 'classic', 'national', 'none', 'pan_fried', true, false, false, false, ARRAY['gluten', 'egg'], false, true, true, false, true, true, true, 180, 4, 35, 3, 0, ARRAY['sweet', 'winter', 'red-bean', 'cute'], 85),
('KOREAN_TWIGIM', 'twigim', 'Korean Tempura', 'Various vegetables and seafood deep-fried in light batter. Popular market snack.', 'Twigim', '튀김', 'street_food', 'classic', 'national', 'mixed', 'deep_fried', true, false, false, false, ARRAY['gluten', 'shellfish', 'mollusk'], false, true, true, false, false, true, true, 350, 10, 40, 18, 0, ARRAY['fried', 'market', 'assorted', 'crispy'], 80),
('KOREAN_SUNDAE', 'sundae', 'Korean Blood Sausage', 'Pig intestine stuffed with glass noodles and pork blood. Traditional market delicacy.', 'Sundae', '순대', 'street_food', 'traditional', 'national', 'pork', 'steamed', true, false, false, false, ARRAY[]::text[], true, true, true, false, false, false, false, 280, 15, 25, 14, 0, ARRAY['traditional', 'market', 'offal', 'iron-rich'], 72),
('KOREAN_GYERANPPANG', 'gyeranppang', 'Egg Bread', 'Fluffy bread with a whole egg baked inside. Popular winter street snack.', 'Gyeranppang', '계란빵', 'street_food', 'popular', 'national', 'none', 'pan_fried', true, false, false, false, ARRAY['gluten', 'egg', 'dairy'], false, false, true, false, true, true, true, 220, 10, 28, 8, 0, ARRAY['breakfast', 'winter', 'protein', 'warm'], 82),
('KOREAN_DAKKOCHI', 'dakkochi', 'Chicken Skewers', 'Grilled chicken skewers brushed with sweet soy or spicy sauce. Popular night market food.', 'Dakkochi', '닭꼬치', 'street_food', 'popular', 'national', 'chicken', 'grilled', true, false, true, false, ARRAY['soy', 'sesame'], true, true, true, false, false, true, false, 250, 22, 12, 14, 2, ARRAY['grilled', 'night-market', 'portable', 'savory'], 85),
('KOREAN_TORNADO_POTATO', 'tornado-potato', 'Spiral Potato', 'Whole potato spiral-cut on a stick and deep-fried with seasoning. Fun festival snack.', 'Hoeori Gamja', '회오리감자', 'street_food', 'popular', 'national', 'none', 'deep_fried', true, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 320, 4, 45, 15, 0, ARRAY['fun', 'crispy', 'festival', 'instagram'], 78),

-- BANCHAN & FERMENTED (10 dishes)
('KOREAN_BAECHU_KIMCHI', 'baechu-kimchi', 'Napa Cabbage Kimchi', 'The quintessential Korean fermented vegetable. Spicy, tangy, and umami-rich napa cabbage.', 'Baechu Kimchi', '배추김치', 'fermented', 'signature', 'national', 'none', 'fermented', false, true, true, false, ARRAY['fish', 'shellfish'], true, true, true, false, false, true, true, 25, 2, 4, 0.5, 4, ARRAY['iconic', 'probiotic', 'essential', 'everyday'], 99),
('KOREAN_KKAKDUGI', 'kkakdugi', 'Cubed Radish Kimchi', 'Crunchy cubed Korean radish kimchi. Perfect accompaniment to soups and stews.', 'Kkakdugi', '깍두기', 'fermented', 'classic', 'national', 'none', 'fermented', false, true, true, false, ARRAY['fish', 'shellfish'], true, true, true, false, false, true, true, 20, 1, 4, 0.3, 3, ARRAY['crunchy', 'probiotic', 'radish', 'soup-pairing'], 88),
('KOREAN_NABAK_KIMCHI', 'nabak-kimchi', 'Water Kimchi', 'Light, refreshing watery kimchi with thin radish and cabbage slices in tangy brine.', 'Nabak Kimchi', '나박김치', 'fermented', 'traditional', 'national', 'none', 'fermented', false, true, false, false, ARRAY[]::text[], true, true, true, true, true, true, true, 15, 1, 3, 0.1, 1, ARRAY['refreshing', 'summer', 'light', 'vegan'], 70),
('KOREAN_KONGNAMUL', 'kongnamul', 'Soybean Sprout Salad', 'Blanched soybean sprouts seasoned with sesame oil and garlic. Essential everyday banchan.', 'Kongnamul Muchim', '콩나물무침', 'side_dishes', 'classic', 'national', 'none', 'boiled', false, false, false, false, ARRAY['sesame', 'soy'], true, true, true, true, true, true, true, 50, 4, 4, 3, 0, ARRAY['healthy', 'simple', 'everyday', 'vegan'], 90),
('KOREAN_SIGEUMCHI_NAMUL', 'sigeumchi-namul', 'Spinach Salad', 'Blanched spinach seasoned with soy sauce, sesame oil, and garlic. Classic green banchan.', 'Sigeumchi Namul', '시금치나물', 'side_dishes', 'classic', 'national', 'none', 'boiled', false, false, false, false, ARRAY['soy', 'sesame'], false, true, true, true, true, true, true, 45, 3, 3, 3, 0, ARRAY['healthy', 'green', 'essential', 'vegan'], 88),
('KOREAN_MUSAENGCHAE', 'musaengchae', 'Shredded Radish Salad', 'Julienned radish in sweet and sour dressing with gochugaru. Refreshing and crunchy.', 'Musaengchae', '무생채', 'side_dishes', 'classic', 'national', 'none', 'raw', false, false, true, false, ARRAY['fish', 'sesame'], true, true, true, false, false, true, true, 35, 1, 7, 0.5, 2, ARRAY['crunchy', 'refreshing', 'bbq-pairing', 'light'], 82),
('KOREAN_GYERANJJIM', 'gyeranjjim', 'Steamed Egg', 'Silky steamed egg custard with green onions, served bubbling in a stone pot.', 'Gyeranjjim', '계란찜', 'side_dishes', 'classic', 'national', 'none', 'steamed', false, false, false, true, ARRAY['egg', 'fish', 'sesame'], true, true, true, false, false, true, true, 120, 10, 2, 8, 0, ARRAY['silky', 'comforting', 'protein', 'bbq-pairing'], 85),
('KOREAN_JAPCHAE_BANCHAN', 'japchae-banchan', 'Glass Noodle Side Dish', 'Small portion of japchae served as a banchan rather than main dish.', 'Japchae', '잡채', 'side_dishes', 'popular', 'national', 'beef', 'stir_fried', false, false, false, false, ARRAY['soy', 'sesame'], true, true, true, false, false, false, false, 180, 8, 25, 6, 0, ARRAY['sweet', 'celebration', 'popular', 'holiday'], 85),
('KOREAN_MYEOLCHI_BOKKEUM', 'myeolchi-bokkeum', 'Stir-Fried Anchovies', 'Tiny dried anchovies stir-fried with soy sauce and sugar. Crunchy, savory-sweet banchan.', 'Myeolchi Bokkeum', '멸치볶음', 'side_dishes', 'classic', 'national', 'seafood', 'stir_fried', false, false, false, false, ARRAY['fish', 'soy', 'sesame'], false, true, true, false, false, true, true, 80, 8, 6, 4, 0, ARRAY['crunchy', 'calcium', 'lunchbox', 'everyday'], 82),
('KOREAN_GAMJA_JORIM', 'gamja-jorim', 'Braised Potatoes', 'Bite-sized potatoes braised in sweet soy sauce. Popular lunchbox banchan.', 'Gamja Jorim', '감자조림', 'side_dishes', 'classic', 'national', 'none', 'braised', false, false, false, false, ARRAY['soy', 'sesame'], false, true, true, true, true, true, true, 120, 2, 22, 3, 0, ARRAY['sweet', 'lunchbox', 'comfort', 'vegan'], 78),

-- DESSERTS (8 dishes)
('KOREAN_PATBINGSU', 'patbingsu', 'Red Bean Shaved Ice', 'Fluffy shaved ice topped with sweet red beans, mochi, condensed milk, and fruit. Korea''s iconic summer dessert.', 'Patbingsu', '팥빙수', 'desserts', 'signature', 'national', 'none', 'raw', false, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 350, 8, 72, 6, 0, ARRAY['summer', 'iconic', 'refreshing', 'shareable'], 95),
('KOREAN_INJEOLMI_BINGSU', 'injeolmi-bingsu', 'Soybean Powder Shaved Ice', 'Shaved ice with roasted soybean powder, mochi, and condensed milk. Nutty and traditional.', 'Injeolmi Bingsu', '인절미빙수', 'desserts', 'popular', 'national', 'none', 'raw', false, false, false, false, ARRAY['dairy', 'soy'], true, false, true, false, true, true, true, 380, 10, 68, 8, 0, ARRAY['summer', 'nutty', 'traditional', 'chewy'], 85),
('KOREAN_SONGPYEON', 'songpyeon', 'Pine-Scented Rice Cakes', 'Half-moon shaped rice cakes filled with sesame or beans, steamed on pine needles. Chuseok essential.', 'Songpyeon', '송편', 'desserts', 'traditional', 'national', 'none', 'steamed', false, false, false, false, ARRAY['sesame'], true, true, true, true, true, true, true, 150, 3, 30, 3, 0, ARRAY['chuseok', 'holiday', 'traditional', 'aromatic'], 80),
('KOREAN_YAKGWA', 'yakgwa', 'Honey Cookies', 'Traditional deep-fried honey pastry with ginger and sesame. Served at ceremonies and holidays.', 'Yakgwa', '약과', 'desserts', 'traditional', 'national', 'none', 'deep_fried', false, false, false, false, ARRAY['gluten', 'sesame', 'tree_nuts'], false, true, false, true, true, true, true, 180, 2, 28, 8, 0, ARRAY['traditional', 'honey', 'ceremonial', 'tea-pairing'], 72),
('KOREAN_DASIK', 'dasik', 'Tea Cookies', 'Delicate pressed cookies made with pine pollen, sesame, or beans. Traditional tea ceremony sweets.', 'Dasik', '다식', 'desserts', 'traditional', 'national', 'none', 'raw', false, false, false, false, ARRAY['sesame'], true, true, true, true, true, true, true, 80, 2, 14, 2, 0, ARRAY['elegant', 'tea-ceremony', 'traditional', 'delicate'], 60),
('KOREAN_SUJEONGGWA', 'sujeonggwa', 'Cinnamon Punch', 'Sweet cinnamon and ginger punch served cold with dried persimmons and pine nuts. Traditional holiday drink.', 'Sujeonggwa', '수정과', 'desserts', 'traditional', 'national', 'none', 'boiled', false, false, false, false, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 120, 1, 28, 2, 0, ARRAY['cold', 'traditional', 'holiday', 'digestive'], 75),
('KOREAN_SIKHYE', 'sikhye', 'Sweet Rice Punch', 'Traditional sweet rice beverage with floating rice grains. Served as digestive after meals.', 'Sikhye', '식혜', 'desserts', 'traditional', 'national', 'none', 'fermented', false, true, false, false, ARRAY['gluten', 'tree_nuts'], false, true, false, true, true, true, true, 140, 2, 32, 1, 0, ARRAY['digestive', 'traditional', 'sweet', 'refreshing'], 78),
('KOREAN_HWAJEON', 'hwajeon', 'Flower Pancake', 'Small sweet rice pancakes topped with edible flowers. Seasonal spring treat.', 'Hwajeon', '화전', 'desserts', 'traditional', 'national', 'none', 'pan_fried', false, false, false, false, ARRAY['sesame'], true, true, true, true, true, true, true, 100, 1, 20, 2, 0, ARRAY['spring', 'beautiful', 'seasonal', 'traditional'], 65)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  korean_name = EXCLUDED.korean_name,
  korean_script = EXCLUDED.korean_script,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  protein_type = EXCLUDED.protein_type,
  cooking_method = EXCLUDED.cooking_method,
  is_street_food = EXCLUDED.is_street_food,
  is_fermented = EXCLUDED.is_fermented,
  is_spicy = EXCLUDED.is_spicy,
  has_banchan = EXCLUDED.has_banchan,
  allergens = EXCLUDED.allergens,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  is_nut_free = EXCLUDED.is_nut_free,
  is_vegan = EXCLUDED.is_vegan,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_halal = EXCLUDED.is_halal,
  is_pescatarian = EXCLUDED.is_pescatarian,
  calories_per_serving = EXCLUDED.calories_per_serving,
  protein_g = EXCLUDED.protein_g,
  carbs_g = EXCLUDED.carbs_g,
  fat_g = EXCLUDED.fat_g,
  spice_level = EXCLUDED.spice_level,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity;

-- Add product_taxonomy entry for Korean cuisine
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_name_ko, icon, is_alcoholic, is_hot_served, requires_cooking)
SELECT 'korean', 'standalone', 'food', 'first_course', 'Korean', 'Coreano', '한식', '🇰🇷', false, true, true
WHERE NOT EXISTS (
  SELECT 1 FROM product_taxonomy WHERE product_type = 'korean'
);

-- ============================================
-- Summary: 77 Korean dishes imported
-- Categories: bbq(8), rice_dishes(8), stews_soups(10), noodles(8), pancakes(7), fried_chicken(8), street_food(10), side_dishes/fermented(10), desserts(8)
-- ============================================
-- ============================================
-- KOREAN DATABASE - Product Ingredients Links
-- ============================================
-- Links Korean dishes to ingredients in product_ingredients table
--
-- RUN AFTER: 00-korean-schema.sql, 01-korean-missing-ingredients.sql, 02-korean-data.sql
-- ============================================

-- BBQ (8 dishes)
-- KOREAN_SAMGYEOPSAL (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_LETTUCE', 'main', false, 1),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_SSAMJANG', 'main', false, 1),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_PERILLA_LEAVES', 'secondary', false, 2),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_SAMGYEOPSAL', 'korean', 'ING_GOCHUJANG', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BULGOGI (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BULGOGI', 'korean', 'ING_BEEF_SIRLOIN', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_PEAR', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_BULGOGI', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2),
('KOREAN_BULGOGI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GALBI (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GALBI', 'korean', 'ING_BEEF_SHORT_RIBS', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_GALBI', 'korean', 'ING_PEAR', 'secondary', false, 2),
('KOREAN_GALBI', 'korean', 'ING_RICE_WINE', 'secondary', false, 2),
('KOREAN_GALBI', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DWAEJI_GALBI (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_PORK_RIBS', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_GINGER', 'secondary', false, 2),
('KOREAN_DWAEJI_GALBI', 'korean', 'ING_RICE_WINE', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DAKGALBI (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DAKGALBI', 'korean', 'ING_CHICKEN_THIGH', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_CABBAGE', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_SWEET_POTATO', 'main', false, 1),
('KOREAN_DAKGALBI', 'korean', 'ING_RICE_CAKES', 'secondary', false, 2),
('KOREAN_DAKGALBI', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_DAKGALBI', 'korean', 'ING_PERILLA_LEAVES', 'garnish', true, 3),
('KOREAN_DAKGALBI', 'korean', 'ING_CHEESE', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_CHADOLBAEGI (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_CHADOLBAEGI', 'korean', 'ING_BEEF_BRISKET', 'main', false, 1),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_LETTUCE', 'secondary', false, 2),
('KOREAN_CHADOLBAEGI', 'korean', 'ING_GARLIC', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GOPCHANG (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GOPCHANG', 'korean', 'ING_BEEF_INTESTINES', 'main', false, 1),
('KOREAN_GOPCHANG', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_GOPCHANG', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_GOPCHANG', 'korean', 'ING_GARLIC', 'secondary', false, 2),
('KOREAN_GOPCHANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_GOPCHANG', 'korean', 'ING_GOCHUJANG', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_MAKCHANG (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_MAKCHANG', 'korean', 'ING_PORK_INTESTINES', 'main', false, 1),
('KOREAN_MAKCHANG', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_MAKCHANG', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_MAKCHANG', 'korean', 'ING_GARLIC', 'secondary', false, 2),
('KOREAN_MAKCHANG', 'korean', 'ING_SSAMJANG', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- RICE DISHES (8 dishes)
-- KOREAN_BIBIMBAP (11 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BIBIMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_BEEF_SIRLOIN', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_MUSHROOMS', 'secondary', false, 2),
('KOREAN_BIBIMBAP', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_BIBIMBAP', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DOLSOT_BIBIMBAP (10 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_BEEF_SIRLOIN', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_MUSHROOMS', 'secondary', false, 2),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_DOLSOT_BIBIMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KIMCHI_BOKKEUMBAP (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_KIMCHI_BOKKEUMBAP', 'korean', 'ING_GOCHUGARU', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GIMBAP (10 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GIMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_NORI', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_PICKLED_RADISH', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_GIMBAP', 'korean', 'ING_CUCUMBER', 'secondary', false, 2),
('KOREAN_GIMBAP', 'korean', 'ING_HAM', 'secondary', false, 2),
('KOREAN_GIMBAP', 'korean', 'ING_CRAB_STICK', 'secondary', false, 2),
('KOREAN_GIMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_CHAMCHI_GIMBAP (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_NORI', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_CANNED_TUNA', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_MAYONNAISE', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_PICKLED_RADISH', 'main', false, 1),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_CARROT', 'secondary', false, 2),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_CUCUMBER', 'secondary', false, 2),
('KOREAN_CHAMCHI_GIMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BOKKEUMBAP (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BOKKEUMBAP', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_GREEN_PEAS', 'secondary', false, 2),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_BOKKEUMBAP', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_OMURICE (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_OMURICE', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_CHICKEN_BREAST', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_CARROT', 'secondary', false, 2),
('KOREAN_OMURICE', 'korean', 'ING_KETCHUP', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_BUTTER', 'main', false, 1),
('KOREAN_OMURICE', 'korean', 'ING_GREEN_PEAS', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_NURUNGJI (2 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_NURUNGJI', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_NURUNGJI', 'korean', 'ING_WATER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- STEWS & SOUPS (10 dishes)
-- KOREAN_KIMCHI_JJIGAE (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_TOFU', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2),
('KOREAN_KIMCHI_JJIGAE', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DOENJANG_JJIGAE (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_DOENJANG', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_TOFU', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1),
('KOREAN_DOENJANG_JJIGAE', 'korean', 'ING_GOCHUGARU', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SUNDUBU_JJIGAE (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_SOFT_TOFU', 'main', false, 1),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_PORK_BELLY', 'secondary', false, 2),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_CLAMS', 'secondary', false, 2),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_ONION', 'secondary', false, 2),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_SUNDUBU_JJIGAE', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BUDAE_JJIGAE (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_SPAM', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_HOT_DOGS', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_BAKED_BEANS', 'secondary', false, 2),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_INSTANT_NOODLES', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_RICE_CAKES', 'secondary', false, 2),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_TOFU', 'secondary', false, 2),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_BUDAE_JJIGAE', 'korean', 'ING_CHEESE', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GAMJATANG (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GAMJATANG', 'korean', 'ING_PORK_BONES', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_PERILLA_LEAVES', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_PERILLA_SEEDS', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_NAPA_CABBAGE', 'secondary', false, 2),
('KOREAN_GAMJATANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_GAMJATANG', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_GAMJATANG', 'korean', 'ING_DOENJANG', 'secondary', false, 2),
('KOREAN_GAMJATANG', 'korean', 'ING_GARLIC', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SAMGYETANG (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SAMGYETANG', 'korean', 'ING_WHOLE_CHICKEN', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_GLUTINOUS_RICE', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_GINSENG', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_JUJUBE', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SAMGYETANG', 'korean', 'ING_GINGER', 'secondary', false, 2),
('KOREAN_SAMGYETANG', 'korean', 'ING_CHESTNUTS', 'secondary', false, 2),
('KOREAN_SAMGYETANG', 'korean', 'ING_GINKGO_NUTS', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GALBITANG (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GALBITANG', 'korean', 'ING_BEEF_SHORT_RIBS', 'main', false, 1),
('KOREAN_GALBITANG', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_GALBITANG', 'korean', 'ING_GLASS_NOODLES', 'secondary', false, 2),
('KOREAN_GALBITANG', 'korean', 'ING_EGG', 'garnish', true, 3),
('KOREAN_GALBITANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_GALBITANG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_GALBITANG', 'korean', 'ING_SOY_SAUCE', 'secondary', false, 2),
('KOREAN_GALBITANG', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SEOLLEONGTANG (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_OX_BONES', 'main', false, 1),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_BEEF_BRISKET', 'main', false, 1),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_SALT', 'secondary', false, 2),
('KOREAN_SEOLLEONGTANG', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_YUKGAEJANG (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_YUKGAEJANG', 'korean', 'ING_BEEF_BRISKET', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_GOSARI', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_EGG', 'garnish', true, 3),
('KOREAN_YUKGAEJANG', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_YUKGAEJANG', 'korean', 'ING_SESAME_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DAKTORITANG (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DAKTORITANG', 'korean', 'ING_CHICKEN_PIECES', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DAKTORITANG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- NOODLES (8 dishes)
-- KOREAN_JAPCHAE (10 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_JAPCHAE', 'korean', 'ING_GLASS_NOODLES', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_BEEF_SIRLOIN', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_MUSHROOMS', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_JAPCHAE', 'korean', 'ING_GARLIC', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_NAENGMYEON (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_NAENGMYEON', 'korean', 'ING_BUCKWHEAT_NOODLES', 'main', false, 1),
('KOREAN_NAENGMYEON', 'korean', 'ING_BEEF_BROTH', 'main', false, 1),
('KOREAN_NAENGMYEON', 'korean', 'ING_BEEF_BRISKET', 'main', false, 1),
('KOREAN_NAENGMYEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_NAENGMYEON', 'korean', 'ING_CUCUMBER', 'secondary', false, 2),
('KOREAN_NAENGMYEON', 'korean', 'ING_PICKLED_RADISH', 'secondary', false, 2),
('KOREAN_NAENGMYEON', 'korean', 'ING_ASIAN_PEAR', 'secondary', false, 2),
('KOREAN_NAENGMYEON', 'korean', 'ING_MUSTARD', 'secondary', false, 2),
('KOREAN_NAENGMYEON', 'korean', 'ING_VINEGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BIBIM_NAENGMYEON (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_BUCKWHEAT_NOODLES', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_BEEF_BRISKET', 'secondary', false, 2),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_CUCUMBER', 'secondary', false, 2),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_VINEGAR', 'main', false, 1),
('KOREAN_BIBIM_NAENGMYEON', 'korean', 'ING_SUGAR', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KALGUKSU (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KALGUKSU', 'korean', 'ING_WHEAT_NOODLES', 'main', false, 1),
('KOREAN_KALGUKSU', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1),
('KOREAN_KALGUKSU', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_KALGUKSU', 'korean', 'ING_POTATO', 'secondary', false, 2),
('KOREAN_KALGUKSU', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_KALGUKSU', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KALGUKSU', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_JAJANGMYEON (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_JAJANGMYEON', 'korean', 'ING_WHEAT_NOODLES', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_CHUNJANG', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_JAJANGMYEON', 'korean', 'ING_POTATO', 'secondary', false, 2),
('KOREAN_JAJANGMYEON', 'korean', 'ING_CUCUMBER', 'garnish', true, 3),
('KOREAN_JAJANGMYEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_JJAMPPONG (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_JJAMPPONG', 'korean', 'ING_WHEAT_NOODLES', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_SHRIMP', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_SQUID', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_MUSSELS', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_PORK_BELLY', 'secondary', false, 2),
('KOREAN_JJAMPPONG', 'korean', 'ING_NAPA_CABBAGE', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_JJAMPPONG', 'korean', 'ING_GARLIC', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_RAMYEON (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_RAMYEON', 'korean', 'ING_INSTANT_NOODLES', 'main', false, 1),
('KOREAN_RAMYEON', 'korean', 'ING_EGG', 'secondary', false, 2),
('KOREAN_RAMYEON', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_RAMYEON', 'korean', 'ING_CHEESE', 'secondary', false, 2),
('KOREAN_RAMYEON', 'korean', 'ING_KIMCHI', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KONGGUKSU (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KONGGUKSU', 'korean', 'ING_WHEAT_NOODLES', 'main', false, 1),
('KOREAN_KONGGUKSU', 'korean', 'ING_SOY_MILK', 'main', false, 1),
('KOREAN_KONGGUKSU', 'korean', 'ING_CUCUMBER', 'garnish', true, 3),
('KOREAN_KONGGUKSU', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3),
('KOREAN_KONGGUKSU', 'korean', 'ING_SALT', 'secondary', false, 2),
('KOREAN_KONGGUKSU', 'korean', 'ING_ICE', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- PANCAKES (7 dishes)
-- KOREAN_PAJEON (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_PAJEON', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_SQUID', 'secondary', false, 2),
('KOREAN_PAJEON', 'korean', 'ING_SHRIMP', 'secondary', false, 2),
('KOREAN_PAJEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1),
('KOREAN_PAJEON', 'korean', 'ING_SOY_SAUCE', 'secondary', false, 2),
('KOREAN_PAJEON', 'korean', 'ING_VINEGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HAEMUL_PAJEON (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_SQUID', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_SHRIMP', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_MUSSELS', 'main', false, 1),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_OYSTERS', 'secondary', false, 2),
('KOREAN_HAEMUL_PAJEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KIMCHI_JEON (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KIMCHI_JEON', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_PORK_BELLY', 'secondary', false, 2),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KIMCHI_JEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BINDAETTEOK (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BINDAETTEOK', 'korean', 'ING_MUNG_BEANS', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_PORK_BELLY', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_KIMCHI', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_BINDAETTEOK', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_BINDAETTEOK', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HOBAK_JEON (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HOBAK_JEON', 'korean', 'ING_ZUCCHINI', 'main', false, 1),
('KOREAN_HOBAK_JEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_HOBAK_JEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_HOBAK_JEON', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_HOBAK_JEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DONGTAE_JEON (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DONGTAE_JEON', 'korean', 'ING_POLLOCK', 'main', false, 1),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2),
('KOREAN_DONGTAE_JEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GAMJA_JEON (4 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GAMJA_JEON', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_GAMJA_JEON', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_GAMJA_JEON', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1),
('KOREAN_GAMJA_JEON', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- Continue with remaining dishes in separate inserts...
-- FRIED CHICKEN (8 dishes), STREET FOOD (10 dishes), BANCHAN (10 dishes), DESSERTS (8 dishes)

-- FRIED CHICKEN
-- KOREAN_YANGNYEOM_CHICKEN (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_YANGNYEOM_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HURAIDEU_CHICKEN (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_BLACK_PEPPER', 'secondary', false, 2),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_GARLIC_POWDER', 'secondary', false, 2),
('KOREAN_HURAIDEU_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GARLIC_CHICKEN (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_RICE_WINE', 'secondary', false, 2),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_GARLIC_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HONEY_BUTTER_CHICKEN (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_BUTTER', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_HONEY_BUTTER_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SNOW_CHEESE_CHICKEN (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_CHEESE_POWDER', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_SUGAR', 'secondary', false, 2),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_SNOW_CHEESE_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BHC_CHICKEN (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BHC_CHICKEN', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_ONION_POWDER', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_GARLIC_POWDER', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_CHEESE_POWDER', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_BHC_CHICKEN', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_PADAK (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_PADAK', 'korean', 'ING_CHICKEN_WINGS', 'main', false, 1),
('KOREAN_PADAK', 'korean', 'ING_GREEN_ONION', true, true),
('KOREAN_PADAK', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_PADAK', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_PADAK', 'korean', 'ING_SOY_SAUCE', 'secondary', false, 2),
('KOREAN_PADAK', 'korean', 'ING_VINEGAR', 'secondary', false, 2),
('KOREAN_PADAK', 'korean', 'ING_SUGAR', 'secondary', false, 2),
('KOREAN_PADAK', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DAKGANGJEONG (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DAKGANGJEONG', 'korean', 'ING_CHICKEN_THIGH', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_RICE_SYRUP', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_GINGER', 'secondary', false, 2),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1),
('KOREAN_DAKGANGJEONG', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- STREET FOOD
-- KOREAN_TTEOKBOKKI (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_TTEOKBOKKI', 'korean', 'ING_RICE_CAKES', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_FISH_CAKES', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_TTEOKBOKKI', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_RABOKKI (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_RABOKKI', 'korean', 'ING_RICE_CAKES', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_INSTANT_NOODLES', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_GOCHUJANG', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_FISH_CAKES', 'main', false, 1),
('KOREAN_RABOKKI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_RABOKKI', 'korean', 'ING_EGG', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_ODENG (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_ODENG', 'korean', 'ING_FISH_CAKES', 'main', false, 1),
('KOREAN_ODENG', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_ODENG', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_ODENG', 'korean', 'ING_DRIED_KELP', 'main', false, 1),
('KOREAN_ODENG', 'korean', 'ING_SOY_SAUCE', 'secondary', false, 2),
('KOREAN_ODENG', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HOTTEOK (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HOTTEOK', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_HOTTEOK', 'korean', 'ING_YEAST', 'main', false, 1),
('KOREAN_HOTTEOK', 'korean', 'ING_BROWN_SUGAR', 'main', false, 1),
('KOREAN_HOTTEOK', 'korean', 'ING_CINNAMON', 'main', false, 1),
('KOREAN_HOTTEOK', 'korean', 'ING_PEANUTS', 'secondary', false, 2),
('KOREAN_HOTTEOK', 'korean', 'ING_SUNFLOWER_SEEDS', 'secondary', false, 2),
('KOREAN_HOTTEOK', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_BUNGEOPPANG (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BUNGEOPPANG', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_BUNGEOPPANG', 'korean', 'ING_RED_BEAN_PASTE', 'main', false, 1),
('KOREAN_BUNGEOPPANG', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_BUNGEOPPANG', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_BUNGEOPPANG', 'korean', 'ING_BAKING_POWDER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_TWIGIM (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_TWIGIM', 'korean', 'ING_SWEET_POTATO', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_SQUID', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_SHRIMP', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_PERILLA_LEAVES', 'secondary', false, 2),
('KOREAN_TWIGIM', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_CORN_STARCH', 'main', false, 1),
('KOREAN_TWIGIM', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SUNDAE (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SUNDAE', 'korean', 'ING_PIG_INTESTINE', 'main', false, 1),
('KOREAN_SUNDAE', 'korean', 'ING_PIG_BLOOD', 'main', false, 1),
('KOREAN_SUNDAE', 'korean', 'ING_GLASS_NOODLES', 'main', false, 1),
('KOREAN_SUNDAE', 'korean', 'ING_BARLEY', 'secondary', false, 2),
('KOREAN_SUNDAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_SUNDAE', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SUNDAE', 'korean', 'ING_SALT', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GYERANPPANG (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GYERANPPANG', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_MILK', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_BAKING_POWDER', 'main', false, 1),
('KOREAN_GYERANPPANG', 'korean', 'ING_BUTTER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DAKKOCHI (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DAKKOCHI', 'korean', 'ING_CHICKEN_THIGH', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_GOCHUJANG', 'secondary', false, 2),
('KOREAN_DAKKOCHI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_DAKKOCHI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_TORNADO_POTATO (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_TORNADO_POTATO', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_TORNADO_POTATO', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1),
('KOREAN_TORNADO_POTATO', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_TORNADO_POTATO', 'korean', 'ING_CHEESE_POWDER', 'secondary', false, 2),
('KOREAN_TORNADO_POTATO', 'korean', 'ING_ONION_POWDER', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- BANCHAN & FERMENTED
-- KOREAN_BAECHU_KIMCHI (9 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_NAPA_CABBAGE', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_FISH_SAUCE', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_GINGER', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_DAIKON', 'secondary', false, 2),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_SALTED_SHRIMP', 'main', false, 1),
('KOREAN_BAECHU_KIMCHI', 'korean', 'ING_SUGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KKAKDUGI (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KKAKDUGI', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_FISH_SAUCE', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KKAKDUGI', 'korean', 'ING_SALTED_SHRIMP', 'main', false, 1),
('KOREAN_KKAKDUGI', 'korean', 'ING_SUGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_NABAK_KIMCHI (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_NAPA_CABBAGE', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_GREEN_ONION', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_GINGER', 'secondary', false, 2),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_GOCHUGARU', 'secondary', false, 2),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_NABAK_KIMCHI', 'korean', 'ING_SUGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_KONGNAMUL (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_KONGNAMUL', 'korean', 'ING_SOY_BEAN_SPROUTS', 'main', false, 1),
('KOREAN_KONGNAMUL', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_KONGNAMUL', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_KONGNAMUL', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_KONGNAMUL', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3),
('KOREAN_KONGNAMUL', 'korean', 'ING_SALT', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SIGEUMCHI_NAMUL (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_SIGEUMCHI_NAMUL', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_MUSAENGCHAE (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_MUSAENGCHAE', 'korean', 'ING_DAIKON', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_GOCHUGARU', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_VINEGAR', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_FISH_SAUCE', 'main', false, 1),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_MUSAENGCHAE', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GYERANJJIM (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GYERANJJIM', 'korean', 'ING_EGG', 'main', false, 1),
('KOREAN_GYERANJJIM', 'korean', 'ING_ANCHOVY_STOCK', 'main', false, 1),
('KOREAN_GYERANJJIM', 'korean', 'ING_GREEN_ONION', 'garnish', true, 3),
('KOREAN_GYERANJJIM', 'korean', 'ING_SALT', 'main', false, 1),
('KOREAN_GYERANJJIM', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_JAPCHAE_BANCHAN (8 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_GLASS_NOODLES', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_BEEF_SIRLOIN', 'secondary', false, 2),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_SPINACH', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_CARROT', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_ONION', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_JAPCHAE_BANCHAN', 'korean', 'ING_SUGAR', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_MYEOLCHI_BOKKEUM (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_DRIED_ANCHOVIES', 'main', false, 1),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_RICE_SYRUP', 'main', false, 1),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3),
('KOREAN_MYEOLCHI_BOKKEUM', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_GAMJA_JORIM (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_GAMJA_JORIM', 'korean', 'ING_POTATO', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_SOY_SAUCE', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_RICE_SYRUP', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_GARLIC', 'main', false, 1),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_SESAME_OIL', 'secondary', false, 2),
('KOREAN_GAMJA_JORIM', 'korean', 'ING_SESAME_SEEDS', 'garnish', true, 3)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- DESSERTS
-- KOREAN_PATBINGSU (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_PATBINGSU', 'korean', 'ING_SHAVED_ICE', 'main', false, 1),
('KOREAN_PATBINGSU', 'korean', 'ING_RED_BEAN_PASTE', 'main', false, 1),
('KOREAN_PATBINGSU', 'korean', 'ING_CONDENSED_MILK', 'main', false, 1),
('KOREAN_PATBINGSU', 'korean', 'ING_MOCHI', 'secondary', false, 2),
('KOREAN_PATBINGSU', 'korean', 'ING_STRAWBERRY', 'garnish', true, 3),
('KOREAN_PATBINGSU', 'korean', 'ING_KIWI', 'garnish', true, 3),
('KOREAN_PATBINGSU', 'korean', 'ING_RICE_CAKE_PEARLS', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_INJEOLMI_BINGSU (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_SHAVED_ICE', 'main', false, 1),
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_ROASTED_SOYBEAN_POWDER', 'main', false, 1),
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_MOCHI', 'main', false, 1),
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_CONDENSED_MILK', 'main', false, 1),
('KOREAN_INJEOLMI_BINGSU', 'korean', 'ING_RICE_CAKE_PEARLS', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SONGPYEON (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SONGPYEON', 'korean', 'ING_RICE_FLOUR', 'main', false, 1),
('KOREAN_SONGPYEON', 'korean', 'ING_SESAME_SEEDS', 'main', false, 1),
('KOREAN_SONGPYEON', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_SONGPYEON', 'korean', 'ING_MUNG_BEANS', 'secondary', false, 2),
('KOREAN_SONGPYEON', 'korean', 'ING_PINE_NEEDLES', 'main', false, 1),
('KOREAN_SONGPYEON', 'korean', 'ING_SUGAR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_YAKGWA (7 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_YAKGWA', 'korean', 'ING_ALL_PURPOSE_FLOUR', 'main', false, 1),
('KOREAN_YAKGWA', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_YAKGWA', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_YAKGWA', 'korean', 'ING_GINGER', 'main', false, 1),
('KOREAN_YAKGWA', 'korean', 'ING_CINNAMON', 'secondary', false, 2),
('KOREAN_YAKGWA', 'korean', 'ING_PINE_NUTS', 'garnish', true, 3),
('KOREAN_YAKGWA', 'korean', 'ING_VEGETABLE_OIL', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_DASIK (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_DASIK', 'korean', 'ING_PINE_POLLEN', 'main', false, 1),
('KOREAN_DASIK', 'korean', 'ING_SESAME_SEEDS', 'secondary', false, 2),
('KOREAN_DASIK', 'korean', 'ING_MUNG_BEANS', 'secondary', false, 2),
('KOREAN_DASIK', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_DASIK', 'korean', 'ING_RICE_FLOUR', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SUJEONGGWA (6 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SUJEONGGWA', 'korean', 'ING_CINNAMON', 'main', false, 1),
('KOREAN_SUJEONGGWA', 'korean', 'ING_GINGER', 'main', false, 1),
('KOREAN_SUJEONGGWA', 'korean', 'ING_BROWN_SUGAR', 'main', false, 1),
('KOREAN_SUJEONGGWA', 'korean', 'ING_DRIED_PERSIMMON', 'main', false, 1),
('KOREAN_SUJEONGGWA', 'korean', 'ING_PINE_NUTS', 'garnish', true, 3),
('KOREAN_SUJEONGGWA', 'korean', 'ING_WATER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_SIKHYE (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_SIKHYE', 'korean', 'ING_MALT_POWDER', 'main', false, 1),
('KOREAN_SIKHYE', 'korean', 'ING_RICE', 'main', false, 1),
('KOREAN_SIKHYE', 'korean', 'ING_SUGAR', 'main', false, 1),
('KOREAN_SIKHYE', 'korean', 'ING_PINE_NUTS', 'garnish', true, 3),
('KOREAN_SIKHYE', 'korean', 'ING_WATER', 'main', false, 1)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- KOREAN_HWAJEON (5 ingredients)
INSERT INTO product_ingredients (product_id, product_type, ingredient_id, role, is_optional, sort_order) VALUES
('KOREAN_HWAJEON', 'korean', 'ING_GLUTINOUS_RICE_FLOUR', 'main', false, 1),
('KOREAN_HWAJEON', 'korean', 'ING_EDIBLE_FLOWERS', true, true),
('KOREAN_HWAJEON', 'korean', 'ING_HONEY', 'main', false, 1),
('KOREAN_HWAJEON', 'korean', 'ING_SESAME_OIL', 'main', false, 1),
('KOREAN_HWAJEON', 'korean', 'ING_SALT', 'secondary', false, 2)
ON CONFLICT (product_id, product_type, ingredient_id) DO NOTHING;

-- ============================================
-- Summary: ~550 product_ingredients links created for 77 Korean dishes
-- Average: ~7 ingredients per dish
-- ============================================
