-- Cuban Cuisine - Dishes
-- GUDBRO Database Standards v1.7
-- Total: 44 dishes

-- Create table if not exists
CREATE TABLE IF NOT EXISTS cuban (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('main', 'rice_beans', 'sandwich', 'appetizer', 'side', 'soup', 'dessert', 'beverage')),
  status TEXT NOT NULL DEFAULT 'classic' CHECK (status IN ('iconic', 'classic', 'traditional', 'regional')),
  region TEXT,
  protein_type TEXT,
  cooking_method TEXT,
  prep_time_min INTEGER,
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT false,
  is_dairy_free BOOLEAN DEFAULT false,
  allergens TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on category
CREATE INDEX IF NOT EXISTS idx_cuban_category ON cuban(category);
CREATE INDEX IF NOT EXISTS idx_cuban_status ON cuban(status);

-- =====================
-- MAIN DISHES (10)
-- =====================
INSERT INTO cuban (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CUB_ROPA_VIEJA', 'ropa-vieja', 'Ropa Vieja', 'National dish of Cuba - shredded beef in tomato sauce with peppers and onions, resembling old clothes', 'main', 'iconic', 'National', 'beef', 'braised', 180, 1, false, false, true, true, '{}', '{"national-dish", "slow-cooked", "shredded-beef"}', 98),
('CUB_LECHON_ASADO', 'lechon-asado', 'Lechon Asado', 'Slow-roasted pork shoulder marinated in mojo sauce, crispy skin and tender meat', 'main', 'iconic', 'National', 'pork', 'roasted', 480, 1, false, false, true, true, '{}', '{"christmas", "celebration", "roasted-pork", "mojo"}', 95),
('CUB_VACA_FRITA', 'vaca-frita', 'Vaca Frita', 'Crispy fried shredded beef with caramelized onions, twice-cooked for extra crunch', 'main', 'iconic', 'National', 'beef', 'fried', 150, 1, false, false, true, true, '{}', '{"crispy", "fried-beef", "onions"}', 90),
('CUB_PICADILLO', 'picadillo-cubano', 'Picadillo Cubano', 'Cuban-style ground beef hash with olives, raisins, and capers in tomato sauce', 'main', 'classic', 'National', 'beef', 'sauteed', 45, 1, false, false, true, true, '{}', '{"ground-beef", "quick", "comfort-food"}', 88),
('CUB_ARROZ_CON_POLLO', 'arroz-con-pollo-cubano', 'Arroz con Pollo', 'Cuban chicken and rice cooked together with saffron, beer, and vegetables', 'main', 'classic', 'National', 'chicken', 'braised', 60, 1, false, false, true, true, '{}', '{"one-pot", "chicken-rice", "family-meal"}', 92),
('CUB_POLLO_FRICASSE', 'pollo-fricasse', 'Pollo Fricasse', 'Cuban chicken fricassee in tomato-wine sauce with potatoes and olives', 'main', 'classic', 'National', 'chicken', 'braised', 75, 1, false, false, true, true, '{}', '{"stew", "chicken", "potatoes"}', 80),
('CUB_BISTEC_EMPANIZADO', 'bistec-empanizado', 'Bistec Empanizado', 'Cuban-style breaded steak, thin and crispy, served with lime', 'main', 'classic', 'National', 'beef', 'fried', 30, 0, false, false, false, true, '{"gluten", "egg"}', '{"breaded", "fried", "quick"}', 82),
('CUB_MASAS_PUERCO', 'masas-de-puerco', 'Masas de Puerco Fritas', 'Fried pork chunks marinated in mojo, crispy exterior and juicy inside', 'main', 'classic', 'National', 'pork', 'fried', 120, 1, false, false, true, true, '{}', '{"fried-pork", "mojo", "crispy"}', 85),
('CUB_BOLICHE', 'boliche', 'Boliche', 'Cuban pot roast stuffed with chorizo, braised until fork-tender', 'main', 'traditional', 'National', 'beef', 'braised', 240, 1, false, false, true, true, '{}', '{"pot-roast", "stuffed", "special-occasion"}', 75),
('CUB_TASAJO', 'tasajo', 'Tasajo', 'Dried salt beef rehydrated and cooked with peppers and onions', 'main', 'traditional', 'Eastern Cuba', 'beef', 'braised', 180, 1, false, false, true, true, '{}', '{"dried-beef", "traditional", "eastern-cuba"}', 65)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  protein_type = EXCLUDED.protein_type,
  cooking_method = EXCLUDED.cooking_method,
  prep_time_min = EXCLUDED.prep_time_min,
  spice_level = EXCLUDED.spice_level,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_vegan = EXCLUDED.is_vegan,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  allergens = EXCLUDED.allergens,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  updated_at = NOW();

-- =====================
-- RICE & BEANS (5)
-- =====================
INSERT INTO cuban (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CUB_MOROS_CRISTIANOS', 'moros-y-cristianos', 'Moros y Cristianos', 'Black beans and white rice cooked together, a staple of Cuban cuisine', 'rice_beans', 'iconic', 'National', NULL, 'simmered', 60, 0, true, true, true, true, '{}', '{"rice-beans", "staple", "vegan"}', 95),
('CUB_CONGRI', 'congri-oriental', 'Congri Oriental', 'Eastern Cuban style red beans and rice, heartier than Moros', 'rice_beans', 'iconic', 'Eastern Cuba', NULL, 'simmered', 75, 0, false, false, true, true, '{}', '{"rice-beans", "eastern-cuba", "red-beans"}', 88),
('CUB_FRIJOLES_NEGROS', 'frijoles-negros', 'Frijoles Negros', 'Cuban black bean soup, thick and flavorful, served over rice', 'rice_beans', 'iconic', 'National', NULL, 'simmered', 120, 0, true, true, true, true, '{}', '{"black-beans", "soup", "staple"}', 93),
('CUB_ARROZ_BLANCO', 'arroz-blanco-cubano', 'Arroz Blanco Cubano', 'Cuban-style white rice, fluffy and dry, perfect accompaniment', 'rice_beans', 'classic', 'National', NULL, 'steamed', 25, 0, true, true, true, true, '{}', '{"rice", "side", "basic"}', 90),
('CUB_ARROZ_AMARILLO', 'arroz-amarillo', 'Arroz Amarillo', 'Yellow rice colored with bijol or saffron, often with vegetables', 'rice_beans', 'classic', 'National', NULL, 'steamed', 30, 0, true, true, true, true, '{}', '{"yellow-rice", "saffron", "side"}', 85)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  cooking_method = EXCLUDED.cooking_method,
  prep_time_min = EXCLUDED.prep_time_min,
  spice_level = EXCLUDED.spice_level,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_vegan = EXCLUDED.is_vegan,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  allergens = EXCLUDED.allergens,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  updated_at = NOW();

-- =====================
-- SANDWICHES (4)
-- =====================
INSERT INTO cuban (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CUB_CUBANO_SANDWICH', 'cuban-sandwich', 'Cuban Sandwich', 'Iconic pressed sandwich with roast pork, ham, Swiss cheese, pickles and mustard on Cuban bread', 'sandwich', 'iconic', 'Tampa/Miami', 'pork', 'pressed', 20, 0, false, false, false, false, '{"gluten", "dairy"}', '{"iconic", "pressed-sandwich", "cuban-bread"}', 98),
('CUB_MEDIANOCHE', 'medianoche', 'Medianoche', 'Midnight sandwich on sweet egg bread, similar to Cuban but softer and sweeter', 'sandwich', 'iconic', 'Havana', 'pork', 'pressed', 20, 0, false, false, false, false, '{"gluten", "dairy", "egg"}', '{"midnight-snack", "sweet-bread", "pressed"}', 90),
('CUB_PAN_CON_LECHON', 'pan-con-lechon', 'Pan con Lechon', 'Simple roast pork sandwich on Cuban bread with mojo sauce', 'sandwich', 'classic', 'National', 'pork', 'assembled', 10, 1, false, false, false, true, '{"gluten"}', '{"simple", "pork", "mojo"}', 85),
('CUB_ELENA_RUZ', 'elena-ruz', 'Elena Ruz', 'Sweet and savory sandwich with turkey, cream cheese and strawberry jam', 'sandwich', 'traditional', 'Havana', 'turkey', 'assembled', 10, 0, false, false, false, false, '{"gluten", "dairy"}', '{"sweet-savory", "turkey", "unique"}', 70)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  protein_type = EXCLUDED.protein_type,
  cooking_method = EXCLUDED.cooking_method,
  prep_time_min = EXCLUDED.prep_time_min,
  spice_level = EXCLUDED.spice_level,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_vegan = EXCLUDED.is_vegan,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  allergens = EXCLUDED.allergens,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  updated_at = NOW();

-- =====================
-- SIDES (7)
-- =====================
INSERT INTO cuban (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CUB_TOSTONES', 'tostones', 'Tostones', 'Twice-fried green plantain slices, crispy and savory', 'side', 'iconic', 'National', NULL, 'fried', 20, 0, true, true, true, true, '{}', '{"plantain", "fried", "crispy"}', 95),
('CUB_MADUROS', 'maduros', 'Maduros', 'Fried sweet ripe plantains, caramelized and tender', 'side', 'iconic', 'National', NULL, 'fried', 15, 0, true, true, true, true, '{}', '{"plantain", "sweet", "caramelized"}', 93),
('CUB_YUCA_CON_MOJO', 'yuca-con-mojo', 'Yuca con Mojo', 'Boiled cassava topped with garlicky citrus mojo sauce', 'side', 'iconic', 'National', NULL, 'boiled', 40, 0, true, true, true, true, '{}', '{"yuca", "mojo", "garlic"}', 90),
('CUB_MARIQUITAS', 'mariquitas', 'Mariquitas', 'Thin crispy plantain chips, Cuban-style potato chips', 'side', 'classic', 'National', NULL, 'fried', 20, 0, true, true, true, true, '{}', '{"chips", "plantain", "snack"}', 85),
('CUB_PLATANO_MADURO_HORNO', 'platano-maduro-al-horno', 'Platano Maduro al Horno', 'Baked ripe plantains with butter and cinnamon, sweet side dish', 'side', 'classic', 'National', NULL, 'baked', 35, 0, true, false, true, false, '{"dairy"}', '{"baked", "sweet", "cinnamon"}', 75),
('CUB_BONIATO_FRITO', 'boniato-frito', 'Boniato Frito', 'Fried Cuban sweet potato, crispy outside and creamy inside', 'side', 'traditional', 'National', NULL, 'fried', 25, 0, true, true, true, true, '{}', '{"sweet-potato", "fried", "cuban"}', 70),
('CUB_ENSALADA_MIXTA', 'ensalada-mixta-cubana', 'Ensalada Mixta Cubana', 'Cuban mixed salad with tomatoes, lettuce, avocado and onion', 'side', 'classic', 'National', NULL, 'raw', 15, 0, true, true, true, true, '{}', '{"salad", "fresh", "healthy"}', 75)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  cooking_method = EXCLUDED.cooking_method,
  prep_time_min = EXCLUDED.prep_time_min,
  spice_level = EXCLUDED.spice_level,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_vegan = EXCLUDED.is_vegan,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  allergens = EXCLUDED.allergens,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  updated_at = NOW();

-- =====================
-- SOUPS (4)
-- =====================
INSERT INTO cuban (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CUB_AJIACO', 'ajiaco-criollo', 'Ajiaco Criollo', 'Traditional Cuban stew with multiple root vegetables, corn and meats', 'soup', 'iconic', 'National', 'mixed', 'simmered', 180, 0, false, false, true, true, '{}', '{"stew", "root-vegetables", "hearty"}', 92),
('CUB_POTAJE_GARBANZOS', 'potaje-de-garbanzos', 'Potaje de Garbanzos', 'Hearty chickpea stew with chorizo and vegetables', 'soup', 'classic', 'National', 'pork', 'simmered', 90, 1, false, false, true, true, '{}', '{"chickpea", "stew", "spanish-influence"}', 80),
('CUB_CALDO_GALLEGO', 'caldo-gallego', 'Caldo Gallego', 'Galician-style white bean soup with greens and pork', 'soup', 'classic', 'National', 'pork', 'simmered', 120, 0, false, false, true, true, '{}', '{"white-beans", "greens", "spanish-origin"}', 78),
('CUB_SOPA_PLATANO', 'sopa-de-platano', 'Sopa de Platano', 'Creamy plantain soup, comforting and traditional', 'soup', 'traditional', 'National', NULL, 'simmered', 45, 0, true, false, true, false, '{"dairy"}', '{"plantain", "creamy", "comfort"}', 70)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  protein_type = EXCLUDED.protein_type,
  cooking_method = EXCLUDED.cooking_method,
  prep_time_min = EXCLUDED.prep_time_min,
  spice_level = EXCLUDED.spice_level,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_vegan = EXCLUDED.is_vegan,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  allergens = EXCLUDED.allergens,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  updated_at = NOW();

-- =====================
-- DESSERTS (6)
-- =====================
INSERT INTO cuban (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CUB_FLAN_CUBANO', 'flan-cubano', 'Flan Cubano', 'Cuban-style caramel custard, rich and creamy', 'dessert', 'iconic', 'National', NULL, 'baked', 60, 0, true, false, true, false, '{"dairy", "egg"}', '{"custard", "caramel", "classic"}', 95),
('CUB_TRES_LECHES', 'tres-leches-cubano', 'Tres Leches Cubano', 'Sponge cake soaked in three kinds of milk, topped with meringue', 'dessert', 'iconic', 'National', NULL, 'baked', 90, 0, true, false, false, false, '{"dairy", "egg", "gluten"}', '{"cake", "milk", "soaked"}', 92),
('CUB_ARROZ_CON_LECHE', 'arroz-con-leche-cubano', 'Arroz con Leche Cubano', 'Cuban rice pudding with cinnamon and lime zest', 'dessert', 'classic', 'National', NULL, 'simmered', 45, 0, true, false, true, false, '{"dairy"}', '{"rice-pudding", "cinnamon", "comfort"}', 88),
('CUB_NATILLA', 'natilla-cubana', 'Natilla Cubana', 'Cuban vanilla custard with cinnamon, lighter than flan', 'dessert', 'classic', 'National', NULL, 'simmered', 30, 0, true, false, true, false, '{"dairy", "egg"}', '{"custard", "vanilla", "light"}', 82),
('CUB_DULCE_LECHE_CORTADA', 'dulce-de-leche-cortada', 'Dulce de Leche Cortada', 'Sweet curdled milk dessert, traditional Cuban delicacy', 'dessert', 'traditional', 'National', NULL, 'simmered', 60, 0, true, false, true, false, '{"dairy"}', '{"curdled-milk", "sweet", "traditional"}', 75),
('CUB_COQUITOS', 'coquitos-cubanos', 'Coquitos Cubanos', 'Coconut macaroons, sweet and chewy Cuban cookies', 'dessert', 'classic', 'National', NULL, 'baked', 40, 0, true, false, true, true, '{"egg"}', '{"coconut", "cookies", "macaroon"}', 80)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  cooking_method = EXCLUDED.cooking_method,
  prep_time_min = EXCLUDED.prep_time_min,
  spice_level = EXCLUDED.spice_level,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_vegan = EXCLUDED.is_vegan,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  allergens = EXCLUDED.allergens,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  updated_at = NOW();

-- =====================
-- BEVERAGES (8)
-- =====================
INSERT INTO cuban (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES
('CUB_MOJITO', 'mojito', 'Mojito', 'Iconic Cuban cocktail with rum, mint, lime, sugar and soda water', 'beverage', 'iconic', 'Havana', NULL, 'mixed', 5, 0, true, true, true, true, '{}', '{"cocktail", "rum", "refreshing"}', 98),
('CUB_CUBA_LIBRE', 'cuba-libre', 'Cuba Libre', 'Rum and cola with lime, the freedom cocktail', 'beverage', 'iconic', 'National', NULL, 'mixed', 3, 0, true, true, true, true, '{}', '{"cocktail", "rum", "cola"}', 95),
('CUB_DAIQUIRI', 'daiquiri', 'Daiquiri', 'Classic Cuban cocktail with rum, lime juice and sugar', 'beverage', 'iconic', 'Santiago', NULL, 'shaken', 5, 0, true, true, true, true, '{}', '{"cocktail", "rum", "citrus"}', 90),
('CUB_CAFE_CUBANO', 'cafe-cubano', 'Cafe Cubano', 'Strong Cuban espresso with demerara sugar whipped into espuma', 'beverage', 'iconic', 'National', NULL, 'brewed', 5, 0, true, true, true, true, '{}', '{"coffee", "espresso", "sweet"}', 95),
('CUB_CORTADITO', 'cortadito', 'Cortadito', 'Cuban espresso cut with steamed milk, smaller than cafe con leche', 'beverage', 'classic', 'National', NULL, 'brewed', 5, 0, true, false, true, false, '{"dairy"}', '{"coffee", "milk", "espresso"}', 88),
('CUB_CAFE_CON_LECHE', 'cafe-con-leche-cubano', 'Cafe con Leche Cubano', 'Cuban coffee with hot milk, breakfast staple', 'beverage', 'iconic', 'National', NULL, 'brewed', 5, 0, true, false, true, false, '{"dairy"}', '{"coffee", "milk", "breakfast"}', 92),
('CUB_GUARAPO', 'guarapo', 'Guarapo', 'Fresh pressed sugarcane juice, refreshing and sweet', 'beverage', 'classic', 'National', NULL, 'pressed', 5, 0, true, true, true, true, '{}', '{"sugarcane", "fresh", "natural"}', 80),
('CUB_BATIDO_MAMEY', 'batido-de-mamey', 'Batido de Mamey', 'Creamy mamey sapote milkshake, tropical Cuban favorite', 'beverage', 'classic', 'National', NULL, 'blended', 5, 0, true, false, true, false, '{"dairy"}', '{"milkshake", "tropical", "mamey"}', 85)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  cooking_method = EXCLUDED.cooking_method,
  prep_time_min = EXCLUDED.prep_time_min,
  spice_level = EXCLUDED.spice_level,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_vegan = EXCLUDED.is_vegan,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  allergens = EXCLUDED.allergens,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  updated_at = NOW();
