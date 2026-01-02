-- ============================================
-- Peruvian Complete Import Script
-- GUDBRO Database Standards v1.2
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- ============================================
-- PART 1: CREATE TABLE
-- ============================================

-- Drop existing table if exists
DROP TABLE IF EXISTS peruvian CASCADE;

-- Create Peruvian table with TEXT+CHECK pattern
CREATE TABLE peruvian (
  -- Primary Key
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- Names
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  spanish_name TEXT,
  quechua_name TEXT,

  -- Classification with CHECK constraints
  category TEXT NOT NULL CHECK (category IN (
    'ceviches', 'tiraditos', 'causas', 'anticuchos',
    'main_dishes', 'rice_dishes', 'soups', 'seafood',
    'criollo', 'andean', 'amazonian', 'nikkei', 'chifa',
    'street_food', 'desserts', 'drinks'
  )),

  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'signature', 'popular', 'traditional', 'regional', 'fusion'
  )),

  region TEXT NOT NULL CHECK (region IN (
    'lima', 'costa', 'sierra', 'selva', 'arequipa',
    'cusco', 'piura', 'lambayeque', 'national'
  )),

  -- Cooking details
  protein_type TEXT CHECK (protein_type IN (
    'fish', 'seafood_mixed', 'shrimp', 'octopus',
    'beef', 'chicken', 'pork', 'guinea_pig', 'alpaca',
    'duck', 'lamb', 'vegetarian', 'vegan'
  )),

  cooking_method TEXT CHECK (cooking_method IN (
    'raw', 'grilled', 'stir_fried', 'braised',
    'fried', 'steamed', 'baked', 'roasted'
  )),

  -- Peruvian-specific flags
  is_street_food BOOLEAN NOT NULL DEFAULT false,
  is_festive BOOLEAN NOT NULL DEFAULT false,
  is_fusion BOOLEAN NOT NULL DEFAULT false,
  served_cold BOOLEAN NOT NULL DEFAULT false,

  -- Dietary & Allergens
  allergens TEXT[] DEFAULT '{}',
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_dairy_free BOOLEAN NOT NULL DEFAULT false,
  is_nut_free BOOLEAN NOT NULL DEFAULT true,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,

  -- Nutrition
  calories_per_serving INTEGER,
  protein_g INTEGER,
  carbs_g INTEGER,
  fat_g INTEGER,

  -- Spice & Popularity
  spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

  -- Tags
  tags TEXT[] DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_peruvian_category ON peruvian(category);
CREATE INDEX idx_peruvian_status ON peruvian(status);
CREATE INDEX idx_peruvian_region ON peruvian(region);
CREATE INDEX idx_peruvian_protein_type ON peruvian(protein_type);
CREATE INDEX idx_peruvian_is_street_food ON peruvian(is_street_food);
CREATE INDEX idx_peruvian_is_vegan ON peruvian(is_vegan);
CREATE INDEX idx_peruvian_is_vegetarian ON peruvian(is_vegetarian);
CREATE INDEX idx_peruvian_spice_level ON peruvian(spice_level);
CREATE INDEX idx_peruvian_popularity ON peruvian(popularity);
CREATE INDEX idx_peruvian_is_fusion ON peruvian(is_fusion);

-- Enable RLS
ALTER TABLE peruvian ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access on peruvian"
  ON peruvian FOR SELECT
  TO public
  USING (true);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_peruvian_updated_at ON peruvian;
CREATE TRIGGER update_peruvian_updated_at
  BEFORE UPDATE ON peruvian
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add to product_taxonomy
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category)
VALUES ('peruvian', 'food', 'restaurant', 'latin_american')
ON CONFLICT (product_type) DO NOTHING;

-- ============================================
-- PART 2: MISSING INGREDIENTS
-- ============================================

-- === PERUVIAN CHILES & PEPPERS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_AJI_AMARILLO', 'aji-amarillo', 'Ají Amarillo', 'Peruvian yellow pepper, fruity and medium-hot', 'vegetables', false, NULL),
  ('ING_AJI_PANCA', 'aji-panca', 'Ají Panca', 'Dried Peruvian red pepper, mild and smoky', 'spices', false, NULL),
  ('ING_AJI_LIMO', 'aji-limo', 'Ají Limo', 'Small citrusy Peruvian pepper, very hot', 'vegetables', false, NULL),
  ('ING_AJI_ROCOTO', 'aji-rocoto', 'Ají Rocoto', 'Apple-shaped Peruvian pepper, extremely hot', 'vegetables', false, NULL),
  ('ING_AJI_MIRASOL', 'aji-mirasol', 'Ají Mirasol', 'Dried ají amarillo, fruity and medium-hot', 'spices', false, NULL),
  ('ING_AJI_CHARAPITA', 'aji-charapita', 'Ají Charapita', 'Tiny Amazonian pepper, fruity and very hot', 'vegetables', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN POTATOES & TUBERS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_PAPA_AMARILLA', 'papa-amarilla', 'Papa Amarilla', 'Yellow Peruvian potato, creamy and rich', 'vegetables', false, NULL),
  ('ING_PAPA_SECA', 'papa-seca', 'Papa Seca', 'Sun-dried potato, traditional preservation method', 'vegetables', false, NULL),
  ('ING_CAMOTE', 'camote', 'Camote', 'Peruvian sweet potato, served with ceviches', 'vegetables', false, NULL),
  ('ING_YUCA', 'yuca', 'Yuca', 'Cassava, starchy root vegetable', 'vegetables', false, NULL),
  ('ING_CHUNO', 'chuno', 'Chuño', 'Freeze-dried potato, Andean preservation method', 'vegetables', false, NULL),
  ('ING_OLLUCO', 'olluco', 'Olluco', 'Colorful Andean tuber, waxy texture', 'vegetables', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN CORN VARIETIES ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_CHOCLO', 'choclo', 'Choclo', 'Peruvian giant white corn, large kernels', 'vegetables', false, NULL),
  ('ING_CANCHA', 'cancha', 'Cancha', 'Toasted corn kernels, crunchy ceviche accompaniment', 'grains', false, NULL),
  ('ING_MOTE', 'mote', 'Mote', 'Large hominy corn, Andean staple', 'grains', false, NULL),
  ('ING_MAIZ_MORADO', 'maiz-morado', 'Maíz Morado', 'Purple corn for chicha morada', 'grains', false, NULL),
  ('ING_CORN_MASA', 'corn-masa', 'Corn Masa', 'Corn dough for tamales', 'grains', false, NULL),
  ('ING_JORA_CORN', 'jora-corn', 'Jora Corn', 'Fermented corn for chicha de jora', 'grains', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN HERBS & SEASONINGS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_HUACATAY', 'huacatay', 'Huacatay', 'Black mint, unique Peruvian herb', 'herbs', false, NULL),
  ('ING_CULANTRO', 'culantro', 'Culantro', 'Long-leaf coriander, stronger than cilantro', 'herbs', false, NULL),
  ('ING_CHINCHO', 'chincho', 'Chincho', 'Peruvian herb for pachamanca', 'herbs', false, NULL),
  ('ING_SACHA_CULANTRO', 'sacha-culantro', 'Sacha Culantro', 'Amazonian culantro variety', 'herbs', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN BEVERAGES & LIQUIDS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_CHICHA_JORA', 'chicha-de-jora', 'Chicha de Jora', 'Fermented corn beer for cooking', 'spirits', false, NULL),
  ('ING_PISCO', 'pisco', 'Pisco', 'Peruvian grape brandy', 'spirits', false, NULL),
  ('ING_LECHE_TIGRE', 'leche-de-tigre', 'Leche de Tigre', 'Tiger''s milk ceviche marinade', 'other', false, NULL),
  ('ING_INCA_KOLA', 'inca-kola', 'Inca Kola', 'Peruvian golden soda', 'other', false, NULL),
  ('ING_CHICHA_MORADA', 'chicha-morada-drink', 'Chicha Morada', 'Purple corn beverage', 'juices', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN SEAFOOD ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_CORVINA', 'corvina', 'Corvina', 'Sea bass, Peru''s favorite ceviche fish', 'proteins', true, 'fish'),
  ('ING_LENGUADO', 'lenguado', 'Lenguado', 'Sole/flounder for tiraditos', 'proteins', true, 'fish'),
  ('ING_CONCHAS_NEGRAS', 'conchas-negras', 'Conchas Negras', 'Black clams from northern Peru', 'proteins', true, 'shellfish'),
  ('ING_DONCELLA', 'doncella', 'Doncella', 'Amazonian catfish', 'proteins', true, 'fish'),
  ('ING_CHOROS', 'choros', 'Choros', 'Peruvian mussels', 'proteins', true, 'shellfish'),
  ('ING_CRAB_MEAT', 'crab-meat', 'Crab Meat', 'Fresh crab meat', 'proteins', true, 'shellfish')
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN MEATS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_CUY', 'cuy', 'Cuy', 'Guinea pig, Andean delicacy', 'proteins', false, NULL),
  ('ING_ALPACA', 'alpaca', 'Alpaca', 'Lean Andean camelid meat', 'proteins', false, NULL),
  ('ING_ALPACA_HEART', 'alpaca-heart', 'Alpaca Heart', 'Heart of alpaca for anticuchos', 'proteins', false, NULL),
  ('ING_CHARQUI', 'charqui', 'Charqui', 'Andean dried jerky, llama or beef', 'proteins', false, NULL),
  ('ING_CECINA', 'cecina', 'Cecina', 'Amazonian smoked pork', 'proteins', false, NULL),
  ('ING_BEEF_HEART', 'beef-heart', 'Beef Heart', 'Heart for anticuchos', 'proteins', false, NULL),
  ('ING_BEEF_TRIPE', 'beef-tripe', 'Beef Tripe', 'Stomach lining for rachi', 'proteins', false, NULL),
  ('ING_BEEF_INTESTINE', 'beef-intestine', 'Beef Intestine', 'Small intestine for choncholines', 'proteins', false, NULL),
  ('ING_CHICKEN_BLOOD', 'chicken-blood', 'Chicken Blood', 'Blood for sangrecita', 'proteins', false, NULL),
  ('ING_HEN', 'hen', 'Hen', 'Mature chicken for caldo de gallina', 'proteins', false, NULL),
  ('ING_CHAR_SIU', 'char-siu', 'Char Siu', 'Chinese roast pork for Chifa', 'proteins', false, NULL),
  ('ING_CHORIZO_AMAZONICO', 'chorizo-amazonico', 'Chorizo Amazónico', 'Amazonian pork sausage', 'proteins', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN FRUITS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_LUCUMA', 'lucuma', 'Lúcuma', 'Peruvian superfruit, caramel-like flavor', 'fruits', false, NULL),
  ('ING_CHIRIMOYA', 'chirimoya', 'Chirimoya', 'Custard apple', 'fruits', false, NULL),
  ('ING_MARACUYA', 'maracuya', 'Maracuyá', 'Passion fruit', 'fruits', false, NULL),
  ('ING_CAMU_CAMU', 'camu-camu', 'Camu Camu', 'Amazonian superfruit, highest vitamin C', 'fruits', false, NULL),
  ('ING_AGUAYMANTO', 'aguaymanto', 'Aguaymanto', 'Peruvian golden berry', 'fruits', false, NULL),
  ('ING_COCONA', 'cocona', 'Cocona', 'Amazonian tomato-like fruit', 'fruits', false, NULL),
  ('ING_QUINCE', 'quince', 'Quince', 'Membrillo for mazamorra morada', 'fruits', false, NULL),
  ('ING_DRIED_PEACH', 'dried-peach', 'Dried Peach', 'Orejones for mazamorra', 'fruits', false, NULL),
  ('ING_DRIED_APRICOT', 'dried-apricot', 'Dried Apricot', 'For mazamorra morada', 'fruits', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN GRAINS & SEEDS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_QUINOA', 'quinoa', 'Quinoa', 'Andean super grain', 'grains', false, NULL),
  ('ING_KIWICHA', 'kiwicha', 'Kiwicha', 'Amaranth, Andean grain', 'grains', false, NULL),
  ('ING_TARWI', 'tarwi', 'Tarwi', 'Andean lupin bean', 'grains', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN DAIRY ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_QUESO_FRESCO', 'queso-fresco', 'Queso Fresco', 'Fresh white cheese', 'dairy', true, 'milk'),
  ('ING_EVAPORATED_MILK', 'evaporated-milk', 'Evaporated Milk', 'Leche evaporada, Peruvian staple', 'dairy', true, 'milk'),
  ('ING_CONDENSED_MILK', 'condensed-milk', 'Condensed Milk', 'Sweetened condensed milk', 'dairy', true, 'milk')
ON CONFLICT (id) DO NOTHING;

-- === PERUVIAN SYRUPS & SWEETENERS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_CHANCACA', 'chancaca', 'Chancaca', 'Unrefined cane sugar block', 'other', false, NULL),
  ('ING_ALGARROBINA', 'algarrobina', 'Algarrobina', 'Carob tree syrup', 'other', false, NULL),
  ('ING_GUM_SYRUP', 'gum-syrup', 'Gum Syrup', 'Gomme syrup for cocktails', 'other', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === CHIFA INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_CHOW_MEIN_NOODLES', 'chow-mein-noodles', 'Chow Mein Noodles', 'Chinese egg noodles for Chifa', 'pasta', true, 'gluten'),
  ('ING_WONTON_WRAPPERS', 'wonton-wrappers', 'Wonton Wrappers', 'Thin dough for wontons', 'pasta', true, 'gluten'),
  ('ING_BOK_CHOY', 'bok-choy', 'Bok Choy', 'Chinese cabbage', 'vegetables', false, NULL),
  ('ING_BEAN_SPROUTS', 'bean-sprouts', 'Bean Sprouts', 'Mung bean sprouts', 'vegetables', false, NULL),
  ('ING_OYSTER_SAUCE', 'oyster-sauce', 'Oyster Sauce', 'Chinese oyster sauce', 'other', true, 'shellfish'),
  ('ING_TAMARIND', 'tamarind', 'Tamarind', 'Sour tropical fruit paste', 'fruits', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === NIKKEI INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_PONZU', 'ponzu', 'Ponzu', 'Citrus soy sauce', 'other', true, 'soy'),
  ('ING_YUZU_KOSHO', 'yuzu-kosho', 'Yuzu Kosho', 'Japanese citrus chili paste', 'spices', false, NULL),
  ('ING_TOBIKO', 'tobiko', 'Tobiko', 'Flying fish roe', 'proteins', true, 'fish'),
  ('ING_GARLIC_CHIPS', 'garlic-chips', 'Garlic Chips', 'Crispy fried garlic slices', 'vegetables', false, NULL),
  ('ING_SUSHI_RICE', 'sushi-rice', 'Sushi Rice', 'Japanese short-grain rice', 'rice', false, NULL),
  ('ING_GYOZA_WRAPPERS', 'gyoza-wrappers', 'Gyoza Wrappers', 'Thin dumpling wrappers', 'pasta', true, 'gluten'),
  ('ING_RAMEN_NOODLES', 'ramen-noodles', 'Ramen Noodles', 'Japanese wheat noodles', 'pasta', true, 'gluten'),
  ('ING_PORK_STOCK', 'pork-stock', 'Pork Stock', 'Rich pork bone broth', 'proteins', false, NULL),
  ('ING_MICROGREENS', 'microgreens', 'Microgreens', 'Baby vegetable shoots', 'vegetables', false, NULL),
  ('ING_TRUFFLE_OIL', 'truffle-oil', 'Truffle Oil', 'Aromatic truffle-infused oil', 'other', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === AMAZONIAN INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_BIJAO_LEAVES', 'bijao-leaves', 'Bijao Leaves', 'Amazonian wrapping leaves', 'herbs', false, NULL),
  ('ING_SURI', 'suri', 'Suri', 'Palm weevil larvae, Amazonian protein', 'proteins', false, NULL),
  ('ING_PLANTAIN', 'plantain', 'Plantain', 'Cooking banana', 'fruits', false, NULL),
  ('ING_PORK_LARD', 'pork-lard', 'Pork Lard', 'Rendered pork fat', 'other', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === ANDEAN INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_FAVA_BEANS', 'fava-beans', 'Fava Beans', 'Habas, Andean beans', 'vegetables', false, NULL),
  ('ING_CANARIO_BEANS', 'canario-beans', 'Canario Beans', 'Peruvian yellow beans', 'vegetables', false, NULL),
  ('ING_TROUT', 'trout', 'Trout', 'Rainbow trout from Andean lakes', 'proteins', true, 'fish'),
  ('ING_ZAPALLO', 'zapallo', 'Zapallo', 'Peruvian squash', 'vegetables', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === COCKTAIL INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_EGG_WHITE', 'egg-white', 'Egg White', 'For pisco sour foam', 'eggs', true, 'eggs'),
  ('ING_EGG_YOLKS', 'egg-yolks', 'Egg Yolks', 'For desserts and cocktails', 'eggs', true, 'eggs'),
  ('ING_SIMPLE_SYRUP', 'simple-syrup', 'Simple Syrup', 'Sugar syrup', 'other', false, NULL),
  ('ING_ANGOSTURA_BITTERS', 'angostura-bitters', 'Angostura Bitters', 'Aromatic cocktail bitters', 'spirits', false, NULL),
  ('ING_GINGER_ALE', 'ginger-ale', 'Ginger Ale', 'Carbonated ginger drink', 'mixers', false, NULL),
  ('ING_SWEET_VERMOUTH', 'sweet-vermouth', 'Sweet Vermouth', 'Fortified aromatic wine', 'wines', true, 'sulfites'),
  ('ING_PORT_WINE', 'port-wine', 'Port Wine', 'Fortified wine for suspiro', 'wines', true, 'sulfites'),
  ('ING_CHERRY', 'cherry', 'Cherry', 'Maraschino cherry garnish', 'fruits', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === HERBAL DRINK INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_BARLEY', 'barley', 'Barley', 'Cebada for emoliente', 'grains', true, 'gluten'),
  ('ING_FLAXSEED', 'flaxseed', 'Flaxseed', 'Linaza for emoliente', 'grains', false, NULL),
  ('ING_ALFALFA', 'alfalfa', 'Alfalfa', 'Medicinal herb for emoliente', 'herbs', false, NULL),
  ('ING_HORSETAIL', 'horsetail', 'Horsetail', 'Cola de caballo herb', 'herbs', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- === OTHER INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, is_allergen, allergen_type)
VALUES
  ('ING_FISH_HEAD', 'fish-head', 'Fish Head', 'For chilcano broth', 'proteins', true, 'fish'),
  ('ING_FISH_BONES', 'fish-bones', 'Fish Bones', 'For fish stock', 'proteins', true, 'fish'),
  ('ING_AJI_AMARILLO_SAUCE', 'aji-amarillo-sauce', 'Ají Amarillo Sauce', 'Prepared ají sauce', 'other', false, NULL),
  ('ING_HOT_DOG', 'hot-dog', 'Hot Dog', 'Frankfurt sausage', 'proteins', false, NULL),
  ('ING_SPRINKLES', 'sprinkles', 'Sprinkles', 'Grajeas for turrón', 'other', false, NULL),
  ('ING_BREAD_ROLL', 'bread-roll', 'Bread Roll', 'Pan francés for sandwiches', 'bread', true, 'gluten'),
  ('ING_WHEAT', 'wheat', 'Wheat', 'Trigo for shambar', 'grains', true, 'gluten'),
  ('ING_HAM_HOCK', 'ham-hock', 'Ham Hock', 'Pork knuckle for soups', 'proteins', false, NULL),
  ('ING_TARTAR_SAUCE', 'tartar-sauce', 'Tartar Sauce', 'Mayonnaise-based sauce', 'other', true, 'eggs'),
  ('ING_CHIMICHURRI', 'chimichurri', 'Chimichurri', 'Argentine herb sauce', 'herbs', false, NULL),
  ('ING_CREAM', 'cream', 'Cream', 'Heavy cream', 'dairy', true, 'milk'),
  ('ING_DULCE_DE_LECHE', 'dulce-de-leche', 'Dulce de Leche', 'Caramelized milk spread', 'dairy', true, 'milk'),
  ('ING_SCALLOPS', 'scallops', 'Scallops', 'Sea scallops', 'proteins', true, 'shellfish')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- PART 3: PERUVIAN DISHES DATA (136 dishes)
-- ============================================

-- === CEVICHES (6) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_CEVICHE_CLASICO', 'ceviche-clasico', 'Ceviche Clásico', 'Peru''s national dish - fresh sea bass marinated in lime juice with ají limo, red onion, and cilantro, served with sweet potato and cancha corn', 'Ceviche Clásico de Pescado', 'ceviches', 'signature', 'lima', 'fish', 'raw', false, true, false, true, ARRAY['fish'], true, true, true, false, false, 220, 28, 18, 4, 2, 100, ARRAY['national-dish', 'raw-fish', 'lime-cured', 'iconic', 'must-try']),
('PER_CEVICHE_MIXTO', 'ceviche-mixto', 'Ceviche Mixto', 'Mixed seafood ceviche with fish, shrimp, octopus, and squid in leche de tigre', 'Ceviche Mixto', 'ceviches', 'popular', 'lima', 'seafood_mixed', 'raw', false, true, false, true, ARRAY['fish', 'shellfish', 'mollusks'], true, true, true, false, false, 280, 35, 16, 6, 2, 92, ARRAY['mixed-seafood', 'variety', 'premium']),
('PER_CEVICHE_CAMARONES', 'ceviche-de-camarones', 'Ceviche de Camarones', 'Arequipa-style shrimp ceviche with rocoto pepper and huacatay', 'Ceviche de Camarones Arequipeño', 'ceviches', 'regional', 'arequipa', 'shrimp', 'raw', false, true, false, true, ARRAY['shellfish'], true, true, true, false, false, 195, 24, 14, 4, 3, 85, ARRAY['arequipa', 'shrimp', 'spicy', 'regional']),
('PER_CEVICHE_CONCHAS_NEGRAS', 'ceviche-conchas-negras', 'Ceviche de Conchas Negras', 'Northern Peru delicacy with black clams, intensely flavored and traditionally an aphrodisiac', 'Ceviche de Conchas Negras', 'ceviches', 'regional', 'piura', 'seafood_mixed', 'raw', false, true, false, true, ARRAY['shellfish', 'mollusks'], true, true, true, false, false, 140, 18, 8, 3, 2, 78, ARRAY['black-clams', 'northern-peru', 'delicacy', 'aphrodisiac']),
('PER_CEVICHE_PULPO', 'ceviche-de-pulpo', 'Ceviche de Pulpo', 'Tender octopus ceviche with olive oil, olives, and ají amarillo', 'Ceviche de Pulpo', 'ceviches', 'popular', 'costa', 'octopus', 'raw', false, false, false, true, ARRAY['mollusks'], true, true, true, false, false, 185, 22, 6, 8, 2, 80, ARRAY['octopus', 'tender', 'olive-oil']),
('PER_LECHE_TIGRE', 'leche-de-tigre', 'Leche de Tigre', 'Tiger''s milk - the citrusy, spicy ceviche marinade served as a shot, famous hangover cure', 'Leche de Tigre', 'ceviches', 'signature', 'lima', 'fish', 'raw', true, true, false, true, ARRAY['fish'], true, true, true, false, false, 80, 8, 6, 2, 3, 88, ARRAY['drink', 'hangover-cure', 'iconic', 'shot']);

-- === TIRADITOS (6) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_TIRADITO_CLASICO', 'tiradito-clasico', 'Tiradito Clásico', 'Sashimi-style sliced fish with ají amarillo cream sauce, Nikkei influence', 'Tiradito Clásico', 'tiraditos', 'signature', 'lima', 'fish', 'raw', false, false, true, true, ARRAY['fish'], true, true, true, false, false, 180, 24, 4, 8, 2, 90, ARRAY['sashimi-style', 'elegant', 'nikkei-influence']),
('PER_TIRADITO_ROCOTO', 'tiradito-al-rocoto', 'Tiradito al Rocoto', 'Thinly sliced fish with spicy rocoto pepper sauce', 'Tiradito al Rocoto', 'tiraditos', 'popular', 'arequipa', 'fish', 'raw', false, false, false, true, ARRAY['fish'], true, true, true, false, false, 175, 23, 5, 7, 4, 82, ARRAY['spicy', 'rocoto', 'arequipa-style']),
('PER_TIRADITO_NIKKEI', 'tiradito-nikkei', 'Tiradito Nikkei', 'Japanese-Peruvian fusion tiradito with soy sauce, sesame, and miso', 'Tiradito Nikkei', 'tiraditos', 'fusion', 'lima', 'fish', 'raw', false, false, true, true, ARRAY['fish', 'soy', 'sesame'], false, true, true, false, false, 210, 26, 6, 10, 1, 88, ARRAY['nikkei', 'japanese-peruvian', 'fusion', 'elegant']),
('PER_TIRADITO_MARACUYA', 'tiradito-al-maracuya', 'Tiradito al Maracuyá', 'Delicate fish tiradito with passion fruit and ají amarillo sauce', 'Tiradito al Maracuyá', 'tiraditos', 'popular', 'lima', 'fish', 'raw', false, false, true, true, ARRAY['fish'], true, true, true, false, false, 190, 22, 8, 8, 2, 85, ARRAY['passion-fruit', 'tropical', 'sweet-spicy']),
('PER_TIRADITO_OLIVO', 'tiradito-al-olivo', 'Tiradito al Olivo', 'Fish tiradito with creamy black olive sauce, a Lima specialty', 'Tiradito al Olivo', 'tiraditos', 'popular', 'lima', 'fish', 'raw', false, false, false, true, ARRAY['fish', 'eggs'], true, true, true, false, false, 240, 22, 4, 16, 0, 83, ARRAY['black-olive', 'creamy', 'lima-style']),
('PER_TIRADITO_ACEVICHADO', 'tiradito-acevichado', 'Tiradito Acevichado', 'Tiradito with classic ceviche marinade - bridge between ceviche and tiradito', 'Tiradito Acevichado', 'tiraditos', 'traditional', 'lima', 'fish', 'raw', false, false, false, true, ARRAY['fish'], true, true, true, false, false, 170, 24, 4, 6, 2, 80, ARRAY['hybrid', 'ceviche-style', 'traditional']);

-- === CAUSAS (8) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_CAUSA_LIMENA', 'causa-limena', 'Causa Limeña', 'Iconic Lima dish - layered yellow potato terrine with ají amarillo, filled with chicken salad, avocado, and mayo', 'Causa Limeña', 'causas', 'signature', 'lima', 'chicken', 'raw', false, true, false, true, ARRAY['eggs'], true, true, true, false, false, 380, 18, 32, 22, 1, 95, ARRAY['iconic', 'layered', 'cold-dish', 'appetizer']),
('PER_CAUSA_ATUN', 'causa-de-atun', 'Causa de Atún', 'Yellow potato causa layered with tuna salad, avocado, and olives', 'Causa de Atún', 'causas', 'popular', 'lima', 'fish', 'raw', false, false, false, true, ARRAY['fish', 'eggs'], true, true, true, false, false, 350, 22, 28, 18, 1, 88, ARRAY['tuna', 'classic', 'appetizer']),
('PER_CAUSA_CAMARONES', 'causa-de-camarones', 'Causa de Camarones', 'Elegant causa with Arequipa-style shrimp filling and rocoto mayo', 'Causa de Camarones', 'causas', 'regional', 'arequipa', 'shrimp', 'raw', false, true, false, true, ARRAY['shellfish', 'eggs'], true, true, true, false, false, 340, 20, 30, 16, 2, 85, ARRAY['arequipa', 'shrimp', 'premium']),
('PER_CAUSA_PULPO', 'causa-de-pulpo', 'Causa de Pulpo', 'Causa topped with tender octopus in olive sauce', 'Causa de Pulpo al Olivo', 'causas', 'popular', 'lima', 'octopus', 'raw', false, false, false, true, ARRAY['mollusks', 'eggs'], true, true, true, false, false, 360, 24, 28, 18, 1, 82, ARRAY['octopus', 'olive-sauce', 'elegant']),
('PER_CAUSA_CANGREJO', 'causa-de-cangrejo', 'Causa de Cangrejo', 'Premium causa with fresh crab meat and avocado', 'Causa de Cangrejo', 'causas', 'popular', 'costa', 'seafood_mixed', 'raw', false, true, false, true, ARRAY['shellfish', 'eggs'], true, true, true, false, false, 370, 22, 28, 20, 1, 80, ARRAY['crab', 'premium', 'coastal']),
('PER_CAUSA_LOMO_SALTADO', 'causa-de-lomo-saltado', 'Causa de Lomo Saltado', 'Fusion causa filled with stir-fried beef lomo saltado style', 'Causa de Lomo Saltado', 'causas', 'fusion', 'lima', 'beef', 'stir_fried', false, false, true, true, ARRAY['soy'], false, true, true, false, false, 420, 26, 34, 20, 2, 78, ARRAY['fusion', 'beef', 'lomo-saltado']),
('PER_CAUSA_NIKKEI', 'causa-nikkei', 'Causa Nikkei', 'Japanese-Peruvian fusion causa with salmon, nori, and wasabi mayo', 'Causa Nikkei', 'causas', 'fusion', 'lima', 'fish', 'raw', false, false, true, true, ARRAY['fish', 'eggs', 'soy', 'sesame'], false, true, true, false, false, 380, 24, 30, 18, 1, 85, ARRAY['nikkei', 'salmon', 'wasabi', 'fusion']),
('PER_CAUSA_VEGETARIANA', 'causa-vegetariana', 'Causa Vegetariana', 'Vegetarian causa with avocado, tomato, and olive filling', 'Causa Vegetariana', 'causas', 'active', 'lima', 'vegetarian', 'raw', false, false, false, true, ARRAY[]::TEXT[], true, true, true, true, true, 300, 6, 32, 18, 1, 70, ARRAY['vegetarian', 'vegan', 'healthy']);

-- === ANTICUCHOS (7) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_ANTICUCHO_CORAZON', 'anticucho-de-corazon', 'Anticucho de Corazón', 'Peru''s most iconic street food - grilled beef heart skewers marinated in ají panca and vinegar, smoky and tender', 'Anticucho de Corazón', 'anticuchos', 'signature', 'lima', 'beef', 'grilled', true, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 280, 32, 4, 14, 2, 98, ARRAY['iconic', 'street-food', 'grilled', 'offal', 'must-try']),
('PER_ANTICUCHO_RES', 'anticucho-de-res', 'Anticucho de Res', 'Grilled beef sirloin skewers with ají panca marinade', 'Anticucho de Res', 'anticuchos', 'popular', 'national', 'beef', 'grilled', true, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 320, 34, 4, 18, 2, 85, ARRAY['beef', 'skewers', 'grilled']),
('PER_ANTICUCHO_POLLO', 'anticucho-de-pollo', 'Anticucho de Pollo', 'Grilled chicken skewers marinated in ají panca, popular lighter option', 'Anticucho de Pollo', 'anticuchos', 'popular', 'national', 'chicken', 'grilled', true, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 250, 28, 4, 12, 2, 82, ARRAY['chicken', 'lighter', 'popular']),
('PER_ANTICUCHO_RACHI', 'rachi', 'Rachi', 'Grilled beef tripe skewers, crispy exterior with tender interior', 'Rachi (Anticucho de Tripa)', 'anticuchos', 'traditional', 'lima', 'beef', 'grilled', true, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 200, 24, 2, 10, 2, 70, ARRAY['offal', 'tripe', 'traditional', 'crispy']),
('PER_ANTICUCHO_CHONCHOLINES', 'choncholines', 'Choncholínes', 'Grilled beef small intestine, crispy and flavorful street delicacy', 'Choncholínes', 'anticuchos', 'traditional', 'lima', 'beef', 'grilled', true, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 180, 18, 2, 12, 2, 65, ARRAY['offal', 'intestine', 'crispy']),
('PER_ANTICUCHO_MARISCOS', 'anticucho-de-mariscos', 'Anticucho de Mariscos', 'Mixed seafood skewers with shrimp, squid, and octopus in ají panca marinade', 'Anticucho de Mariscos', 'anticuchos', 'popular', 'costa', 'seafood_mixed', 'grilled', false, false, false, false, ARRAY['shellfish', 'mollusks'], true, true, true, false, false, 220, 26, 4, 10, 2, 80, ARRAY['seafood', 'coastal', 'grilled']),
('PER_ANTICUCHO_PULPO', 'anticucho-de-pulpo', 'Anticucho de Pulpo', 'Grilled octopus skewers, tender and smoky with ají panca', 'Anticucho de Pulpo', 'anticuchos', 'popular', 'costa', 'octopus', 'grilled', false, false, false, false, ARRAY['mollusks'], true, true, true, false, false, 180, 22, 4, 8, 2, 78, ARRAY['octopus', 'tender', 'premium']);

-- === STREET FOOD (11) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_PICARONES', 'picarones', 'Picarones', 'Sweet potato and squash donuts drenched in warm chancaca syrup, classic street dessert', 'Picarones', 'street_food', 'signature', 'lima', 'vegetarian', 'fried', true, true, false, false, ARRAY['gluten'], false, true, true, true, true, 380, 4, 68, 12, 0, 95, ARRAY['dessert', 'fried', 'iconic', 'street-food', 'sweet']),
('PER_PAPA_RELLENA', 'papa-rellena', 'Papa Rellena', 'Deep-fried stuffed potato with seasoned beef, olives, egg, and raisins', 'Papa Rellena', 'street_food', 'signature', 'national', 'beef', 'fried', true, false, false, false, ARRAY['eggs'], true, true, true, false, false, 420, 18, 42, 22, 1, 92, ARRAY['stuffed', 'fried', 'iconic', 'comfort-food']),
('PER_SALCHIPAPA', 'salchipapa', 'Salchipapa', 'French fries with sliced hot dogs, popular late-night street food', 'Salchipapa', 'street_food', 'popular', 'national', 'pork', 'fried', true, false, false, false, ARRAY['eggs'], false, true, true, false, false, 580, 14, 52, 36, 1, 88, ARRAY['fries', 'hot-dog', 'late-night', 'comfort']),
('PER_EMPANADA_CARNE', 'empanada-de-carne', 'Empanada de Carne', 'Peruvian beef empanada with ají-spiced filling, olives, and egg', 'Empanada de Carne', 'street_food', 'popular', 'national', 'beef', 'fried', true, false, false, false, ARRAY['gluten', 'eggs', 'dairy'], false, false, true, false, false, 350, 14, 32, 18, 1, 85, ARRAY['empanada', 'pastry', 'portable']),
('PER_TAMALES_CRIOLLOS', 'tamales-criollos', 'Tamales Criollos', 'Peruvian tamales with pork or chicken, olives, and ají in corn masa wrapped in banana leaves', 'Tamales Criollos', 'street_food', 'traditional', 'lima', 'pork', 'steamed', true, true, false, false, ARRAY['eggs'], true, true, true, false, false, 450, 22, 48, 20, 1, 88, ARRAY['tamales', 'wrapped', 'traditional', 'breakfast']),
('PER_BUTIFARRA', 'butifarra', 'Butifarra', 'Classic Lima sandwich with roasted pork leg, salsa criolla, and ají on crusty bread', 'Butifarra', 'street_food', 'signature', 'lima', 'pork', 'roasted', true, false, false, false, ARRAY['gluten'], false, true, true, false, false, 520, 35, 42, 24, 2, 90, ARRAY['sandwich', 'pork', 'lima-classic', 'iconic']),
('PER_CHICHARRON_SANDWICH', 'pan-con-chicharron', 'Pan con Chicharrón', 'Fried pork belly sandwich with sweet potato and salsa criolla, breakfast favorite', 'Pan con Chicharrón', 'street_food', 'signature', 'lima', 'pork', 'fried', true, false, false, false, ARRAY['gluten'], false, true, true, false, false, 680, 28, 52, 42, 2, 94, ARRAY['sandwich', 'chicharron', 'breakfast', 'crispy']),
('PER_SANGRECITA', 'sangrecita', 'Sangrecita', 'Sautéed chicken blood with onions and ají, traditional anticuchera side dish', 'Sangrecita', 'street_food', 'traditional', 'lima', 'chicken', 'stir_fried', true, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 160, 22, 6, 6, 2, 65, ARRAY['offal', 'blood', 'traditional', 'side-dish']),
('PER_CHOCLO_QUESO', 'choclo-con-queso', 'Choclo con Queso', 'Boiled Peruvian giant corn with fresh queso fresco, simple street classic', 'Choclo con Queso', 'street_food', 'popular', 'national', 'vegetarian', 'steamed', true, false, false, false, ARRAY['dairy'], true, false, true, false, true, 280, 12, 38, 10, 0, 85, ARRAY['corn', 'cheese', 'simple', 'vegetarian']),
('PER_CHURROS_PERUANOS', 'churros-peruanos', 'Churros Peruanos', 'Peruvian churros filled with dulce de leche, crispy and sweet', 'Churros Rellenos', 'street_food', 'popular', 'national', 'vegetarian', 'fried', true, false, false, false, ARRAY['gluten', 'eggs', 'dairy'], false, false, true, false, true, 320, 4, 42, 16, 0, 80, ARRAY['dessert', 'fried', 'sweet', 'dulce-de-leche']),
('PER_YUQUITAS_FRITAS', 'yuquitas-fritas', 'Yuquitas Fritas', 'Crispy fried cassava sticks served with huancaina or ocopa sauce', 'Yuquitas Fritas', 'street_food', 'popular', 'national', 'vegan', 'fried', true, false, false, false, ARRAY['dairy'], true, false, true, false, true, 340, 6, 48, 14, 1, 82, ARRAY['cassava', 'fried', 'crispy', 'appetizer']);

-- === MAIN DISHES (3) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_LOMO_SALTADO', 'lomo-saltado', 'Lomo Saltado', 'Peru''s beloved stir-fry - beef tenderloin with onions, tomatoes, and soy sauce, served with rice and fries, Chifa influence', 'Lomo Saltado', 'main_dishes', 'signature', 'lima', 'beef', 'stir_fried', false, true, true, false, ARRAY['soy'], false, true, true, false, false, 650, 38, 52, 28, 2, 100, ARRAY['iconic', 'stir-fry', 'chifa', 'beef', 'must-try']),
('PER_POLLO_SALTADO', 'pollo-saltado', 'Pollo Saltado', 'Chicken version of lomo saltado with stir-fried vegetables and soy sauce', 'Pollo Saltado', 'main_dishes', 'popular', 'national', 'chicken', 'stir_fried', false, false, true, false, ARRAY['soy'], false, true, true, false, false, 550, 35, 52, 20, 2, 85, ARRAY['chicken', 'stir-fry', 'lighter-option']),
('PER_SALTADO_MARISCOS', 'saltado-de-mariscos', 'Saltado de Mariscos', 'Seafood stir-fry with mixed shellfish, vegetables, and oyster sauce', 'Saltado de Mariscos', 'seafood', 'popular', 'costa', 'seafood_mixed', 'stir_fried', false, false, true, false, ARRAY['shellfish', 'mollusks', 'soy'], false, true, true, false, false, 480, 36, 42, 18, 2, 82, ARRAY['seafood', 'stir-fry', 'coastal']);

-- === CRIOLLO DISHES (10) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_AJI_GALLINA', 'aji-de-gallina', 'Ají de Gallina', 'Shredded chicken in creamy ají amarillo and walnut sauce, served over rice with potatoes and olives', 'Ají de Gallina', 'criollo', 'signature', 'lima', 'chicken', 'braised', false, true, false, false, ARRAY['nuts', 'gluten', 'dairy', 'eggs'], false, false, false, false, false, 620, 38, 48, 32, 2, 96, ARRAY['iconic', 'creamy', 'criollo', 'comfort-food']),
('PER_SECO_CORDERO', 'seco-de-cordero', 'Seco de Cordero', 'Slow-braised lamb in cilantro and chicha de jora sauce, northern Peru specialty', 'Seco de Cordero', 'criollo', 'regional', 'lambayeque', 'lamb', 'braised', false, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 680, 42, 52, 32, 1, 88, ARRAY['lamb', 'braised', 'northern-peru', 'cilantro']),
('PER_SECO_RES', 'seco-de-res', 'Seco de Res', 'Braised beef in cilantro sauce with canario beans, hearty criollo comfort food', 'Seco de Res', 'criollo', 'popular', 'national', 'beef', 'braised', false, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 640, 40, 50, 28, 1, 84, ARRAY['beef', 'braised', 'comfort-food']),
('PER_CARAPULCRA', 'carapulcra', 'Carapulcra', 'Pre-Columbian stew with dried potato, pork, and peanuts, one of Peru''s oldest dishes', 'Carapulcra', 'criollo', 'traditional', 'lima', 'pork', 'braised', false, true, false, false, ARRAY['peanuts'], true, true, false, false, false, 580, 32, 42, 30, 2, 78, ARRAY['ancient', 'dried-potato', 'peanuts', 'prehispanic']),
('PER_ESTOFADO', 'estofado-de-carne', 'Estofado de Carne', 'Peruvian beef stew with potatoes, carrots, and peas in a tomato-wine sauce', 'Estofado de Carne', 'criollo', 'popular', 'national', 'beef', 'braised', false, false, false, false, ARRAY['sulfites'], true, true, true, false, false, 540, 34, 46, 22, 0, 80, ARRAY['stew', 'comfort-food', 'family-style']),
('PER_TACU_TACU', 'tacu-tacu', 'Tacu Tacu', 'Crispy rice and beans cake, often topped with lomo saltado or fried egg - Afro-Peruvian heritage', 'Tacu Tacu', 'criollo', 'signature', 'lima', 'vegetarian', 'fried', false, false, false, false, ARRAY['eggs'], true, true, true, false, true, 480, 16, 62, 18, 1, 88, ARRAY['afro-peruvian', 'rice-beans', 'crispy', 'comfort']),
('PER_ADOBO_CERDO', 'adobo-de-cerdo', 'Adobo de Cerdo', 'Arequipa-style pork braised in chicha and rocoto, traditional Sunday breakfast', 'Adobo Arequipeño', 'criollo', 'regional', 'arequipa', 'pork', 'braised', false, true, false, false, ARRAY['gluten'], false, true, true, false, false, 620, 38, 32, 38, 3, 85, ARRAY['arequipa', 'pork', 'spicy', 'breakfast']),
('PER_OLLUQUITO_CHARQUI', 'olluquito-con-charqui', 'Olluquito con Charqui', 'Andean tuber olluco stir-fried with dried llama or beef jerky, highland specialty', 'Olluquito con Charqui', 'andean', 'traditional', 'sierra', 'beef', 'stir_fried', false, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 420, 26, 48, 14, 1, 75, ARRAY['andean', 'olluco', 'jerky', 'highland']),
('PER_ROCOTO_RELLENO', 'rocoto-relleno', 'Rocoto Relleno', 'Stuffed rocoto pepper with spiced beef, cheese, and milk sauce - Arequipa''s signature dish', 'Rocoto Relleno', 'criollo', 'signature', 'arequipa', 'beef', 'baked', false, true, false, false, ARRAY['peanuts', 'dairy', 'eggs'], true, false, false, false, false, 520, 28, 24, 36, 4, 90, ARRAY['arequipa', 'stuffed-pepper', 'spicy', 'iconic']),
('PER_MONDONGUITO', 'mondonguito-a-la-italiana', 'Mondonguito a la Italiana', 'Beef tripe stew with tomatoes, potatoes, and peas in Italian-Peruvian style', 'Mondonguito a la Italiana', 'criollo', 'traditional', 'lima', 'beef', 'braised', false, false, true, false, ARRAY['dairy', 'sulfites'], true, false, true, false, false, 460, 28, 42, 18, 0, 72, ARRAY['tripe', 'italian-influence', 'stew']);

-- === RICE DISHES (4) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_ARROZ_POLLO', 'arroz-con-pollo', 'Arroz con Pollo', 'Peruvian chicken rice - fragrant green rice with cilantro and ají, tender chicken pieces, peas and carrots', 'Arroz con Pollo', 'rice_dishes', 'signature', 'national', 'chicken', 'braised', false, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 580, 35, 62, 18, 1, 95, ARRAY['iconic', 'green-rice', 'family-style', 'comfort-food']),
('PER_ARROZ_PATO', 'arroz-con-pato', 'Arroz con Pato', 'Duck rice from Chiclayo - aromatic rice with cilantro and chicha, crispy-skinned duck', 'Arroz con Pato a la Chiclayana', 'rice_dishes', 'signature', 'lambayeque', 'duck', 'braised', false, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 720, 38, 58, 36, 1, 92, ARRAY['duck', 'chiclayo', 'northern-peru', 'festive']),
('PER_ARROZ_MARISCOS', 'arroz-con-mariscos', 'Arroz con Mariscos', 'Peruvian seafood rice with mixed shellfish in ají amarillo sauce', 'Arroz con Mariscos', 'rice_dishes', 'popular', 'costa', 'seafood_mixed', 'braised', false, false, false, false, ARRAY['shellfish', 'mollusks', 'sulfites'], true, true, true, false, false, 520, 32, 58, 14, 2, 88, ARRAY['seafood', 'coastal', 'paella-style']),
('PER_ARROZ_TAPADO', 'arroz-tapado', 'Arroz Tapado', 'Rice dome covering seasoned beef picadillo with olives, raisins, and egg', 'Arroz Tapado', 'rice_dishes', 'traditional', 'lima', 'beef', 'braised', false, false, false, false, ARRAY['eggs'], true, true, true, false, false, 540, 28, 62, 20, 1, 78, ARRAY['molded', 'picadillo', 'comfort-food']);

-- === CHIFA (11) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_TALLARIN_SALTADO', 'tallarin-saltado', 'Tallarín Saltado', 'Stir-fried noodles with beef, vegetables, and soy sauce - Chifa classic', 'Tallarín Saltado', 'chifa', 'signature', 'lima', 'beef', 'stir_fried', false, false, true, false, ARRAY['gluten', 'soy'], false, true, true, false, false, 580, 32, 62, 22, 2, 92, ARRAY['noodles', 'chifa', 'stir-fry', 'chinese-peruvian']),
('PER_CHAUFA', 'arroz-chaufa', 'Arroz Chaufa', 'Peruvian fried rice with chicken, char siu, egg, and green onions - Chifa staple', 'Arroz Chaufa', 'chifa', 'signature', 'lima', 'chicken', 'stir_fried', false, false, true, false, ARRAY['eggs', 'soy', 'sesame'], false, true, true, false, false, 580, 32, 64, 20, 1, 98, ARRAY['iconic', 'fried-rice', 'chifa', 'chinese-peruvian']),
('PER_CHAUFA_MARISCOS', 'chaufa-de-mariscos', 'Chaufa de Mariscos', 'Seafood fried rice with shrimp, squid, and fish in wok-fried perfection', 'Chaufa de Mariscos', 'chifa', 'popular', 'lima', 'seafood_mixed', 'stir_fried', false, false, true, false, ARRAY['shellfish', 'mollusks', 'eggs', 'soy'], false, true, true, false, false, 520, 34, 58, 16, 1, 85, ARRAY['seafood', 'fried-rice', 'chifa']),
('PER_CHAUFA_AEROPUERTO', 'aeropuerto', 'Aeropuerto', 'Ultimate Chifa combo - fried rice mixed with chow mein noodles, the "runway" of flavors', 'Aeropuerto', 'chifa', 'signature', 'lima', 'chicken', 'stir_fried', false, false, true, false, ARRAY['gluten', 'eggs', 'soy'], false, true, true, false, false, 680, 36, 78, 24, 1, 92, ARRAY['combo', 'rice-noodles', 'iconic-chifa']),
('PER_KAM_LU_WANTAN', 'kam-lu-wantan', 'Kam Lu Wantán', 'Crispy fried wontons topped with sweet and sour sauce and mixed vegetables', 'Kam Lu Wantán', 'chifa', 'signature', 'lima', 'pork', 'fried', false, false, true, false, ARRAY['gluten', 'soy'], false, true, true, false, false, 480, 18, 52, 22, 0, 88, ARRAY['wontons', 'sweet-sour', 'crispy']),
('PER_CHIJAUKAY', 'chi-jau-kay', 'Chi Jau Kay', 'Crispy fried chicken pieces in ginger-soy sauce, Chifa favorite', 'Chi Jau Kay', 'chifa', 'popular', 'lima', 'chicken', 'fried', false, false, true, false, ARRAY['soy', 'sesame'], false, true, true, false, false, 420, 32, 24, 22, 1, 86, ARRAY['fried-chicken', 'ginger', 'crispy']),
('PER_TIPAKAY', 'ti-pa-kay', 'Ti Pa Kay', 'Fried chicken wings in sweet and sour tamarind sauce', 'Ti Pa Kay', 'chifa', 'popular', 'lima', 'chicken', 'fried', false, false, true, false, ARRAY['soy'], false, true, true, false, false, 380, 26, 28, 18, 0, 82, ARRAY['wings', 'tamarind', 'sweet-sour']),
('PER_WANTAN_FRITO', 'wantan-frito', 'Wantán Frito', 'Crispy fried pork wontons served with sweet and sour sauce', 'Wantán Frito', 'chifa', 'popular', 'lima', 'pork', 'fried', true, false, true, false, ARRAY['gluten', 'soy', 'sesame'], false, true, true, false, false, 320, 14, 32, 16, 0, 85, ARRAY['appetizer', 'wontons', 'crispy']),
('PER_SOPA_WANTAN', 'sopa-wantan', 'Sopa Wantán', 'Comforting wonton soup with pork dumplings, bok choy, and char siu', 'Sopa Wantán', 'chifa', 'signature', 'lima', 'pork', 'braised', false, false, true, false, ARRAY['gluten', 'soy'], false, true, true, false, false, 280, 18, 28, 10, 0, 90, ARRAY['soup', 'wontons', 'comfort-food']),
('PER_CHANCHO_SALSA_TAMARINDO', 'chancho-en-salsa-de-tamarindo', 'Chancho en Salsa de Tamarindo', 'Crispy pork in tangy tamarind sauce, sweet-savory Chifa classic', 'Chancho en Salsa de Tamarindo', 'chifa', 'popular', 'lima', 'pork', 'fried', false, false, true, false, ARRAY['soy'], false, true, true, false, false, 580, 26, 48, 32, 0, 80, ARRAY['pork', 'tamarind', 'crispy']),
('PER_MIN_POW', 'min-pow', 'Min Pow', 'Steamed buns filled with char siu pork, soft and fluffy Chifa classic', 'Min Pow (Siopao)', 'chifa', 'popular', 'lima', 'pork', 'steamed', true, false, true, false, ARRAY['gluten', 'soy'], false, true, true, false, false, 280, 12, 38, 8, 0, 78, ARRAY['buns', 'steamed', 'dim-sum']);

-- === NIKKEI (12) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_NIKKEI_MAKI_ACEVICHADO', 'maki-acevichado', 'Maki Acevichado', 'Ceviche-style sushi roll with fresh fish, ají limo, and leche de tigre drizzle', 'Maki Acevichado', 'nikkei', 'signature', 'lima', 'fish', 'raw', false, false, true, true, ARRAY['fish'], true, true, true, false, false, 280, 18, 38, 6, 2, 90, ARRAY['sushi', 'ceviche-style', 'innovative', 'fusion']),
('PER_NIKKEI_PULPO_OLIVO', 'pulpo-nikkei-al-olivo', 'Pulpo Nikkei al Olivo', 'Grilled octopus with olive tapenade, miso, and yuzu kosho - Nikkei elegance', 'Pulpo Nikkei al Olivo', 'nikkei', 'popular', 'lima', 'octopus', 'grilled', false, false, true, false, ARRAY['mollusks', 'soy'], true, true, true, false, false, 240, 28, 8, 12, 2, 85, ARRAY['octopus', 'miso', 'elegant', 'premium']),
('PER_NIKKEI_SALMON_MISOYAKI', 'salmon-misoyaki', 'Salmon Misoyaki', 'Miso-glazed salmon with ají amarillo, caramelized and umami-rich', 'Salmón Misoyaki', 'nikkei', 'popular', 'lima', 'fish', 'grilled', false, false, true, false, ARRAY['fish', 'soy', 'sesame'], false, true, true, false, false, 380, 32, 12, 22, 1, 88, ARRAY['salmon', 'miso', 'glazed']),
('PER_NIKKEI_TUNA_TATAKI', 'tuna-tataki-nikkei', 'Tuna Tataki Nikkei', 'Seared tuna with ponzu, ají limo, and crispy garlic chips', 'Tataki de Atún Nikkei', 'nikkei', 'popular', 'lima', 'fish', 'raw', false, false, true, true, ARRAY['fish', 'soy', 'sesame'], false, true, true, false, false, 220, 30, 6, 8, 2, 86, ARRAY['tuna', 'seared', 'tataki']),
('PER_NIKKEI_CHIRASHI', 'chirashi-peruano', 'Chirashi Peruano', 'Japanese scattered sushi bowl with Peruvian seafood, ají amarillo, and leche de tigre', 'Chirashi Peruano', 'nikkei', 'signature', 'lima', 'seafood_mixed', 'raw', false, false, true, true, ARRAY['fish', 'shellfish', 'mollusks'], true, true, true, false, false, 420, 32, 48, 12, 1, 88, ARRAY['chirashi', 'bowl', 'premium']),
('PER_NIKKEI_ANTICUCHO_SALMON', 'anticucho-nikkei-de-salmon', 'Anticucho Nikkei de Salmón', 'Salmon skewers marinated in teriyaki and ají panca, grilled Nikkei style', 'Anticucho Nikkei de Salmón', 'nikkei', 'fusion', 'lima', 'fish', 'grilled', false, false, true, false, ARRAY['fish', 'soy', 'sesame'], false, true, true, false, false, 320, 28, 8, 18, 2, 82, ARRAY['salmon', 'anticucho', 'teriyaki']),
('PER_NIKKEI_CEVICHE_LECHE_TIGRE_ASIATICO', 'ceviche-leche-de-tigre-asiatico', 'Ceviche Leche de Tigre Asiático', 'Ceviche with Asian-infused tiger''s milk - ginger, soy, and wasabi notes', 'Ceviche con Leche de Tigre Asiático', 'nikkei', 'signature', 'lima', 'fish', 'raw', false, false, true, true, ARRAY['fish', 'soy', 'sesame'], false, true, true, false, false, 180, 26, 8, 4, 3, 90, ARRAY['ceviche', 'asian-fusion', 'innovative']),
('PER_NIKKEI_GYOZA_AJI', 'gyoza-de-aji-amarillo', 'Gyoza de Ají Amarillo', 'Pan-fried dumplings with ají amarillo-spiced pork filling, Nikkei fusion', 'Gyoza de Ají Amarillo', 'nikkei', 'fusion', 'lima', 'pork', 'fried', false, false, true, false, ARRAY['gluten', 'soy', 'sesame'], false, true, true, false, false, 280, 14, 28, 12, 2, 80, ARRAY['dumplings', 'gyoza', 'appetizer']),
('PER_NIKKEI_RAMEN_PERUANO', 'ramen-peruano', 'Ramen Peruano', 'Ramen with ají panca tonkotsu broth, char siu, and Peruvian toppings', 'Ramen Peruano', 'nikkei', 'fusion', 'lima', 'pork', 'braised', false, false, true, false, ARRAY['gluten', 'eggs', 'soy'], false, true, true, false, false, 580, 32, 58, 24, 2, 78, ARRAY['ramen', 'soup', 'innovative']),
('PER_NIKKEI_TARTAR_TUNA', 'tartar-de-atun-nikkei', 'Tartar de Atún Nikkei', 'Tuna tartare with avocado, crispy wonton chips, and spicy mayo', 'Tartar de Atún Nikkei', 'nikkei', 'popular', 'lima', 'fish', 'raw', false, false, true, true, ARRAY['fish', 'eggs', 'gluten', 'soy', 'sesame'], false, true, true, false, false, 260, 24, 16, 12, 2, 84, ARRAY['tartare', 'raw', 'elegant']),
('PER_NIKKEI_TEMAKI_LOMO', 'temaki-de-lomo-saltado', 'Temaki de Lomo Saltado', 'Hand roll filled with lomo saltado - the ultimate Peru-Japan fusion', 'Temaki de Lomo Saltado', 'nikkei', 'fusion', 'lima', 'beef', 'stir_fried', false, false, true, false, ARRAY['soy'], false, true, true, false, false, 320, 22, 32, 12, 2, 82, ARRAY['temaki', 'hand-roll', 'lomo-saltado']),
('PER_NIKKEI_CARPACCIO_ATUN', 'carpaccio-de-atun-nikkei', 'Carpaccio de Atún Nikkei', 'Paper-thin tuna slices with truffle ponzu and ají limo', 'Carpaccio de Atún Nikkei', 'nikkei', 'popular', 'lima', 'fish', 'raw', false, false, true, true, ARRAY['fish', 'soy'], false, true, true, false, false, 180, 26, 4, 8, 2, 80, ARRAY['carpaccio', 'truffle', 'elegant']);

-- === ANDEAN (8) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, quechua_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_CUY_CHACTADO', 'cuy-chactado', 'Cuy Chactado', 'Whole flattened guinea pig deep-fried until crispy, Arequipa specialty - pre-Columbian delicacy', 'Cuy Chactado', 'Quwi', 'andean', 'signature', 'arequipa', 'guinea_pig', 'fried', false, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 480, 42, 18, 28, 1, 85, ARRAY['guinea-pig', 'traditional', 'prehispanic', 'crispy']),
('PER_CUY_HORNO', 'cuy-al-horno', 'Cuy al Horno', 'Roasted guinea pig with Andean herbs, Cusco style', 'Cuy al Horno', 'Quwi Hornopi', 'andean', 'traditional', 'cusco', 'guinea_pig', 'roasted', false, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 420, 40, 18, 22, 1, 78, ARRAY['guinea-pig', 'roasted', 'cusco', 'festive']),
('PER_ALPACA_STEAK', 'lomo-de-alpaca', 'Lomo de Alpaca', 'Grilled alpaca tenderloin, lean and tender Andean protein with chimichurri', 'Lomo de Alpaca a la Parrilla', NULL, 'andean', 'popular', 'sierra', 'alpaca', 'grilled', false, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 380, 38, 22, 14, 0, 82, ARRAY['alpaca', 'lean', 'healthy', 'grilled']),
('PER_ALPACA_ANTICUCHO', 'anticucho-de-alpaca', 'Anticucho de Alpaca', 'Grilled alpaca heart skewers, tender and lean with ají panca marinade', 'Anticucho de Corazón de Alpaca', NULL, 'andean', 'regional', 'sierra', 'alpaca', 'grilled', true, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 240, 32, 4, 10, 2, 75, ARRAY['alpaca', 'anticucho', 'offal', 'highland']),
('PER_PACHAMANCA', 'pachamanca', 'Pachamanca', 'Ancient earth oven feast - meats, potatoes, corn, and fava beans cooked underground with hot stones', 'Pachamanca', 'Pachamanka', 'andean', 'signature', 'sierra', 'pork', 'roasted', false, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 720, 48, 56, 32, 1, 92, ARRAY['earth-oven', 'communal', 'prehispanic', 'celebration']),
('PER_TRUCHA_FRITA', 'trucha-frita', 'Trucha Frita', 'Pan-fried Andean rainbow trout from high-altitude lakes, crispy and fresh', 'Trucha Frita de Lago', NULL, 'andean', 'popular', 'sierra', 'fish', 'fried', false, false, false, false, ARRAY['fish', 'gluten'], false, true, true, false, false, 380, 32, 24, 18, 0, 85, ARRAY['trout', 'lake-fish', 'highland', 'crispy']),
('PER_CHUNO_COLADO', 'chuno-colado', 'Chuño Colado', 'Freeze-dried potato porridge with cheese, Andean comfort food', 'Chuño Colado', 'Ch''uñu', 'andean', 'traditional', 'sierra', 'vegetarian', 'braised', false, false, false, false, ARRAY['dairy'], true, false, true, false, true, 280, 12, 42, 8, 0, 60, ARRAY['ancient', 'freeze-dried', 'comfort-food']),
('PER_QUINOA_REVUELTA', 'quinotto-peruano', 'Quinotto Peruano', 'Peruvian quinoa risotto with vegetables and cheese, modern Andean', 'Quinotto con Verduras', NULL, 'andean', 'fusion', 'lima', 'vegetarian', 'braised', false, false, true, false, ARRAY['dairy', 'sulfites'], true, false, true, false, true, 380, 14, 48, 16, 0, 78, ARRAY['quinoa', 'superfood', 'vegetarian', 'modern']);

-- === AMAZONIAN (8) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_JUANE', 'juane', 'Juane', 'Jungle rice ball wrapped in bijao leaves with chicken and turmeric, Amazonian celebration dish', 'Juane de Gallina', 'amazonian', 'signature', 'selva', 'chicken', 'steamed', false, true, false, false, ARRAY['eggs'], true, true, true, false, false, 520, 32, 58, 18, 1, 88, ARRAY['jungle', 'wrapped', 'san-juan', 'festive']),
('PER_TACACHO_CECINA', 'tacacho-con-cecina', 'Tacacho con Cecina', 'Mashed plantain balls with pork lard, served with smoked pork - jungle breakfast staple', 'Tacacho con Cecina', 'amazonian', 'signature', 'selva', 'pork', 'grilled', true, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 620, 28, 52, 36, 0, 90, ARRAY['plantain', 'smoked-pork', 'jungle-breakfast']),
('PER_PATARASHCA', 'patarashca', 'Patarashca', 'Fish wrapped and grilled in bijao leaves with jungle herbs, Amazonian specialty', 'Patarashca de Pescado', 'amazonian', 'signature', 'selva', 'fish', 'grilled', false, false, false, false, ARRAY['fish'], true, true, true, false, false, 280, 34, 12, 10, 2, 82, ARRAY['fish', 'wrapped', 'jungle-herbs', 'grilled']),
('PER_INCHICAPI', 'inchicapi', 'Inchicapi', 'Thick peanut and chicken soup with cilantro, traditional Amazonian comfort food', 'Inchicapi', 'amazonian', 'traditional', 'selva', 'chicken', 'braised', false, false, false, false, ARRAY['peanuts'], true, true, false, false, false, 480, 32, 34, 26, 1, 75, ARRAY['soup', 'peanut', 'comfort-food']),
('PER_TIMBUCHE', 'timbuche', 'Timbuche', 'Amazonian fish soup with camu camu, cilantro, and ají charapita', 'Timbuche', 'amazonian', 'traditional', 'selva', 'fish', 'braised', false, false, false, false, ARRAY['fish'], true, true, true, false, false, 240, 28, 18, 6, 3, 72, ARRAY['soup', 'fish', 'jungle-herbs']),
('PER_NINA_JUANE', 'nina-juane', 'Nina Juane', 'Fiery version of juane with more ají and smoked meats', 'Nina Juane (Juane de Fuego)', 'amazonian', 'regional', 'selva', 'chicken', 'steamed', false, true, false, false, ARRAY['eggs'], true, true, true, false, false, 580, 36, 56, 22, 4, 70, ARRAY['spicy', 'juane', 'smoked']),
('PER_SURI', 'suri-frito', 'Suri Frito', 'Fried palm weevil larvae, protein-rich Amazonian delicacy', 'Suri Frito', 'amazonian', 'traditional', 'selva', 'vegetarian', 'fried', true, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 180, 16, 2, 12, 0, 55, ARRAY['exotic', 'insects', 'protein']),
('PER_CAMU_CAMU_CEVICHE', 'ceviche-de-camu-camu', 'Ceviche de Camu Camu', 'Amazonian ceviche with super-acidic camu camu fruit instead of lime', 'Ceviche de Camu Camu', 'amazonian', 'fusion', 'selva', 'fish', 'raw', false, false, true, true, ARRAY['fish'], true, true, true, false, false, 160, 26, 8, 3, 3, 75, ARRAY['superfruit', 'innovative', 'vitamin-c']);

-- === SOUPS (8) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_CALDO_GALLINA', 'caldo-de-gallina', 'Caldo de Gallina', 'Classic Peruvian hen soup with noodles, egg, and potatoes - the ultimate comfort soup', 'Caldo de Gallina', 'soups', 'signature', 'national', 'chicken', 'braised', true, false, false, false, ARRAY['gluten', 'eggs'], false, true, true, false, false, 380, 28, 32, 14, 0, 95, ARRAY['comfort-food', 'hangover-cure', 'classic', 'healing']),
('PER_PARIHUELA', 'parihuela', 'Parihuela', 'Spicy Peruvian bouillabaisse - seafood soup with fish, shellfish, and ají', 'Parihuela', 'soups', 'signature', 'costa', 'seafood_mixed', 'braised', false, false, false, false, ARRAY['fish', 'shellfish', 'mollusks'], true, true, true, false, false, 320, 38, 16, 10, 3, 92, ARRAY['seafood', 'spicy', 'aphrodisiac', 'coastal']),
('PER_CHILCANO_SOPA', 'chilcano-de-pescado', 'Chilcano de Pescado', 'Light fish soup with ginger and lime, famous hangover remedy', 'Chilcano de Pescado', 'soups', 'popular', 'costa', 'fish', 'braised', true, false, false, false, ARRAY['fish'], true, true, true, false, false, 120, 18, 6, 3, 2, 88, ARRAY['hangover-cure', 'light', 'healing', 'ginger']),
('PER_CHUPE_CAMARONES', 'chupe-de-camarones', 'Chupe de Camarones', 'Arequipa''s famous shrimp chowder with cheese, milk, and huacatay', 'Chupe de Camarones Arequipeño', 'soups', 'signature', 'arequipa', 'shrimp', 'braised', false, true, false, false, ARRAY['shellfish', 'dairy', 'eggs'], true, false, true, false, false, 480, 28, 38, 24, 2, 94, ARRAY['arequipa', 'shrimp', 'chowder', 'rich']),
('PER_AGUADITO', 'aguadito-de-pollo', 'Aguadito de Pollo', 'Green chicken rice soup with cilantro and ají, Peruvian comfort classic', 'Aguadito de Pollo', 'soups', 'popular', 'national', 'chicken', 'braised', true, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, 420, 28, 42, 14, 1, 90, ARRAY['green-soup', 'rice', 'comfort-food']),
('PER_SHAMBAR', 'shambar', 'Shambar', 'Northern Peru wheat and pork soup with beans, Trujillo Monday tradition', 'Shambar Trujillano', 'soups', 'regional', 'lambayeque', 'pork', 'braised', false, false, false, false, ARRAY['gluten'], false, true, true, false, false, 520, 32, 48, 22, 0, 72, ARRAY['wheat', 'beans', 'monday-tradition', 'hearty']),
('PER_DIETA_POLLO', 'dieta-de-pollo', 'Dieta de Pollo', 'Light chicken broth for recovery, the Peruvian cure-all', 'Dieta de Pollo', 'soups', 'traditional', 'national', 'chicken', 'braised', false, false, false, false, ARRAY['gluten'], false, true, true, false, false, 180, 22, 14, 4, 0, 75, ARRAY['light', 'healing', 'recovery']),
('PER_SOPA_CRIOLLA', 'sopa-criolla', 'Sopa Criolla', 'Creole noodle soup with beef, milk, and egg, Lima late-night favorite', 'Sopa a la Criolla', 'soups', 'signature', 'lima', 'beef', 'braised', true, false, false, false, ARRAY['gluten', 'eggs', 'dairy'], false, false, true, false, false, 450, 26, 38, 22, 2, 88, ARRAY['criollo', 'late-night', 'noodles', 'comfort']);

-- === HOT SEAFOOD (8) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_SUDADO_PESCADO', 'sudado-de-pescado', 'Sudado de Pescado', 'Fish steamed in ají amarillo, tomato, and onion broth - coastal classic', 'Sudado de Pescado', 'seafood', 'signature', 'costa', 'fish', 'steamed', false, false, false, false, ARRAY['fish'], true, true, true, false, false, 320, 34, 28, 8, 2, 90, ARRAY['steamed', 'coastal', 'healthy']),
('PER_JALEA', 'jalea-mixta', 'Jalea Mixta', 'Mixed fried seafood platter with fish, squid, shrimp, and yuca, served with salsa criolla', 'Jalea Mixta', 'seafood', 'signature', 'costa', 'seafood_mixed', 'fried', false, true, false, false, ARRAY['fish', 'shellfish', 'mollusks', 'gluten'], false, true, true, false, false, 580, 42, 36, 28, 1, 92, ARRAY['fried', 'platter', 'sharing', 'crispy']),
('PER_PESCADO_FRITO', 'pescado-frito', 'Pescado Frito', 'Whole fried fish with salsa criolla and fried yuca, coastal lunch staple', 'Pescado Frito con Yucas', 'seafood', 'popular', 'costa', 'fish', 'fried', true, false, false, false, ARRAY['fish', 'gluten'], false, true, true, false, false, 480, 36, 32, 24, 1, 85, ARRAY['fried', 'whole-fish', 'coastal']),
('PER_CHICHARRON_PESCADO', 'chicharron-de-pescado', 'Chicharrón de Pescado', 'Crispy fried fish chunks with tartar sauce and salsa criolla', 'Chicharrón de Pescado', 'seafood', 'popular', 'costa', 'fish', 'fried', true, false, false, false, ARRAY['fish', 'gluten', 'eggs'], false, true, true, false, false, 420, 32, 28, 22, 1, 88, ARRAY['chicharron', 'crispy', 'appetizer']),
('PER_CAMARONES_AJO', 'camarones-al-ajo', 'Camarones al Ajo', 'Garlic butter shrimp sautéed with ají amarillo', 'Camarones al Ajo', 'seafood', 'popular', 'costa', 'shrimp', 'stir_fried', false, false, false, false, ARRAY['shellfish', 'dairy', 'sulfites'], true, false, true, false, false, 380, 28, 32, 18, 1, 84, ARRAY['garlic', 'butter', 'shrimp']),
('PER_PICANTE_MARISCOS', 'picante-de-mariscos', 'Picante de Mariscos', 'Spicy seafood stew with ají panca, peanuts, and potatoes', 'Picante de Mariscos', 'seafood', 'popular', 'arequipa', 'seafood_mixed', 'braised', false, false, false, false, ARRAY['shellfish', 'mollusks', 'peanuts', 'dairy'], true, false, false, false, false, 480, 34, 38, 22, 3, 82, ARRAY['spicy', 'arequipa', 'peanut']),
('PER_CONCHAS_PARMESANA', 'conchas-a-la-parmesana', 'Conchas a la Parmesana', 'Baked scallops with Parmesan crust, Lima restaurant classic', 'Conchas a la Parmesana', 'seafood', 'popular', 'lima', 'seafood_mixed', 'baked', false, false, true, false, ARRAY['mollusks', 'dairy', 'gluten', 'sulfites'], false, false, true, false, false, 320, 22, 14, 20, 0, 85, ARRAY['scallops', 'parmesan', 'baked']),
('PER_CHOROS_CHALACA', 'choros-a-la-chalaca', 'Choros a la Chalaca', 'Mussels topped with chopped onion, tomato, and lime - Callao port specialty', 'Choros a la Chalaca', 'seafood', 'signature', 'lima', 'seafood_mixed', 'raw', true, false, false, true, ARRAY['mollusks'], true, true, true, false, false, 180, 18, 12, 6, 2, 90, ARRAY['mussels', 'callao', 'appetizer', 'fresh']);

-- === DESSERTS (8) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_SUSPIRO_LIMENA', 'suspiro-a-la-limena', 'Suspiro a la Limeña', 'Lima''s sigh - dulce de leche custard topped with port wine meringue', 'Suspiro a la Limeña', 'desserts', 'signature', 'lima', 'vegetarian', 'baked', false, true, false, true, ARRAY['eggs', 'dairy', 'sulfites'], true, false, true, false, true, 380, 6, 58, 14, 0, 98, ARRAY['iconic', 'dulce-de-leche', 'meringue', 'elegant']),
('PER_ALFAJOR', 'alfajor-peruano', 'Alfajor Peruano', 'Peruvian sandwich cookies with dulce de leche and powdered sugar', 'Alfajor', 'desserts', 'popular', 'national', 'vegetarian', 'baked', true, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, 220, 3, 28, 12, 0, 90, ARRAY['cookies', 'dulce-de-leche', 'sweet']),
('PER_MAZAMORRA_MORADA', 'mazamorra-morada', 'Mazamorra Morada', 'Purple corn pudding with dried fruits and cinnamon, paired with arroz con leche', 'Mazamorra Morada', 'desserts', 'signature', 'lima', 'vegan', 'braised', true, true, false, true, ARRAY[]::TEXT[], true, true, true, true, true, 180, 2, 42, 1, 0, 92, ARRAY['purple-corn', 'pudding', 'traditional', 'vegan']),
('PER_ARROZ_LECHE', 'arroz-con-leche-peruano', 'Arroz con Leche Peruano', 'Peruvian rice pudding with cinnamon and condensed milk', 'Arroz con Leche', 'desserts', 'popular', 'national', 'vegetarian', 'braised', true, false, false, true, ARRAY['dairy'], true, false, true, false, true, 280, 6, 48, 8, 0, 88, ARRAY['rice-pudding', 'cinnamon', 'classic']),
('PER_LUCUMA_HELADO', 'helado-de-lucuma', 'Helado de Lúcuma', 'Ice cream made with lúcuma, Peru''s beloved superfruit', 'Helado de Lúcuma', 'desserts', 'signature', 'national', 'vegetarian', 'raw', true, false, false, true, ARRAY['dairy'], true, false, true, false, true, 240, 4, 32, 12, 0, 95, ARRAY['ice-cream', 'lucuma', 'superfruit']),
('PER_TURRON_DONA_PEPA', 'turron-de-dona-pepa', 'Turrón de Doña Pepa', 'Traditional October treat - layered cookie sticks with chancaca syrup and candies', 'Turrón de Doña Pepa', 'desserts', 'traditional', 'lima', 'vegetarian', 'baked', true, true, false, false, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, 420, 4, 72, 14, 0, 85, ARRAY['october', 'senor-de-los-milagros', 'festive']),
('PER_CREMA_VOLTEADA', 'crema-volteada', 'Crema Volteada', 'Peruvian flan with caramel topping', 'Crema Volteada', 'desserts', 'popular', 'national', 'vegetarian', 'baked', false, false, false, true, ARRAY['eggs', 'dairy'], true, false, true, false, true, 280, 8, 42, 10, 0, 82, ARRAY['flan', 'caramel', 'classic']),
('PER_RANFANOTE', 'ranfanote', 'Ranfañote', 'Colonial era bread pudding with chancaca, walnuts, and coconut', 'Ranfañote', 'desserts', 'traditional', 'lima', 'vegetarian', 'baked', false, false, false, false, ARRAY['gluten', 'nuts', 'dairy'], false, false, false, false, true, 380, 6, 58, 16, 0, 65, ARRAY['colonial', 'bread-pudding', 'traditional']);

-- === DRINKS (10) ===
INSERT INTO peruvian (id, slug, name, description, spanish_name, category, status, region, protein_type, cooking_method, is_street_food, is_festive, is_fusion, served_cold, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, calories_per_serving, protein_g, carbs_g, fat_g, spice_level, popularity, tags) VALUES
('PER_PISCO_SOUR', 'pisco-sour', 'Pisco Sour', 'Peru''s national cocktail - pisco, lime juice, simple syrup, egg white, and Angostura bitters', 'Pisco Sour', 'drinks', 'signature', 'national', 'vegan', 'raw', false, true, false, true, ARRAY['eggs'], true, true, true, false, true, 180, 2, 14, 0, 0, 100, ARRAY['cocktail', 'iconic', 'national-drink', 'pisco']),
('PER_CHILCANO_PISCO', 'chilcano-de-pisco', 'Chilcano de Pisco', 'Refreshing pisco highball with ginger ale and lime', 'Chilcano de Pisco', 'drinks', 'popular', 'national', 'vegan', 'raw', false, false, false, true, ARRAY[]::TEXT[], true, true, true, true, true, 150, 0, 16, 0, 0, 88, ARRAY['cocktail', 'refreshing', 'highball']),
('PER_CHICHA_MORADA_DRINK', 'chicha-morada', 'Chicha Morada', 'Non-alcoholic purple corn beverage with pineapple, cinnamon, and cloves', 'Chicha Morada', 'drinks', 'signature', 'national', 'vegan', 'braised', true, true, false, true, ARRAY[]::TEXT[], true, true, true, true, true, 120, 1, 30, 0, 0, 95, ARRAY['non-alcoholic', 'purple-corn', 'traditional', 'healthy']),
('PER_CHICHA_JORA_DRINK', 'chicha-de-jora', 'Chicha de Jora', 'Ancient fermented corn beer, Inca ceremonial drink', 'Chicha de Jora', 'drinks', 'traditional', 'sierra', 'vegan', 'raw', true, true, false, false, ARRAY[]::TEXT[], true, true, true, true, true, 80, 1, 18, 0, 0, 70, ARRAY['fermented', 'ancient', 'inca', 'ceremonial']),
('PER_EMOLIENTE', 'emoliente', 'Emoliente', 'Warm herbal drink with barley, flaxseed, and medicinal herbs - street corner staple', 'Emoliente', 'drinks', 'traditional', 'national', 'vegan', 'braised', true, false, false, false, ARRAY['gluten'], false, true, true, true, true, 60, 2, 14, 1, 0, 75, ARRAY['herbal', 'medicinal', 'healthy', 'street-drink']),
('PER_MARACUYA_SOUR', 'maracuya-sour', 'Maracuyá Sour', 'Pisco sour variation with passion fruit', 'Maracuyá Sour', 'drinks', 'popular', 'lima', 'vegetarian', 'raw', false, false, true, true, ARRAY['eggs'], true, true, true, false, true, 190, 2, 18, 0, 0, 85, ARRAY['cocktail', 'passion-fruit', 'tropical']),
('PER_INCA_KOLA_DRINK', 'inca-kola', 'Inca Kola', 'Peru''s golden-colored national soda with bubblegum-like flavor', 'Inca Kola', 'drinks', 'signature', 'national', 'vegan', 'raw', true, false, false, true, ARRAY[]::TEXT[], true, true, true, true, true, 140, 0, 38, 0, 0, 92, ARRAY['soda', 'iconic', 'golden']),
('PER_ALGARROBINA', 'coctel-de-algarrobina', 'Cóctel de Algarrobina', 'Creamy pisco cocktail with carob syrup, milk, and egg', 'Cóctel de Algarrobina', 'drinks', 'popular', 'piura', 'vegetarian', 'raw', false, false, false, true, ARRAY['eggs', 'dairy'], true, false, true, false, true, 280, 6, 28, 10, 0, 82, ARRAY['cocktail', 'creamy', 'carob']),
('PER_CAPITAN', 'el-capitan', 'El Capitán', 'Classic pisco and sweet vermouth cocktail', 'El Capitán', 'drinks', 'traditional', 'lima', 'vegan', 'raw', false, false, false, true, ARRAY['sulfites'], true, true, true, true, true, 160, 0, 8, 0, 0, 70, ARRAY['cocktail', 'classic', 'vermouth']),
('PER_PISCO_PUNCH', 'pisco-punch', 'Pisco Punch', 'Historic San Francisco cocktail with pisco, pineapple, and gum syrup', 'Pisco Punch', 'drinks', 'traditional', 'lima', 'vegan', 'raw', false, true, true, true, ARRAY[]::TEXT[], true, true, true, true, true, 170, 0, 16, 0, 0, 72, ARRAY['cocktail', 'historic', 'punch']);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

SELECT
  category,
  COUNT(*) as count
FROM peruvian
GROUP BY category
ORDER BY count DESC;

SELECT
  'Total Peruvian dishes' as info,
  COUNT(*) as count
FROM peruvian;
