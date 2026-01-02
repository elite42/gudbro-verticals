-- Turkish Cuisine Complete Import Script
-- Run this single file to import all Turkish data
-- Database Standards v1.1 compliant
-- Created: 2025-12-19

-- ============================================
-- STEP 1: CREATE SCHEMA
-- ============================================

-- Drop existing table if needed
DROP TABLE IF EXISTS turkish CASCADE;

-- Create Turkish table
CREATE TABLE turkish (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  turkish_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'kebabs', 'pide_lahmacun', 'mezes', 'soups', 'rice_pilav',
    'borek', 'dolma_sarma', 'seafood', 'stews', 'desserts'
  )),
  status TEXT NOT NULL CHECK (status IN (
    'active', 'signature', 'popular', 'classic', 'traditional', 'regional', 'street_food'
  )),
  region TEXT NOT NULL CHECK (region IN (
    'istanbul', 'southeastern', 'aegean', 'black_sea', 'central_anatolia',
    'mediterranean', 'marmara', 'eastern', 'national'
  )),
  protein_type TEXT NOT NULL CHECK (protein_type IN (
    'lamb', 'beef', 'chicken', 'mixed_meat', 'fish', 'seafood', 'vegetarian', 'vegan', 'none'
  )),
  cooking_method TEXT NOT NULL CHECK (cooking_method IN (
    'grilled', 'roasted', 'fried', 'stewed', 'baked', 'steamed', 'raw', 'braised', 'spit_roasted'
  )),
  is_street_food BOOLEAN NOT NULL DEFAULT FALSE,
  is_meze BOOLEAN NOT NULL DEFAULT FALSE,
  is_breakfast_item BOOLEAN NOT NULL DEFAULT FALSE,
  served_hot BOOLEAN NOT NULL DEFAULT TRUE,
  allergens JSONB DEFAULT '[]'::jsonb,
  is_gluten_free BOOLEAN NOT NULL DEFAULT FALSE,
  is_dairy_free BOOLEAN NOT NULL DEFAULT FALSE,
  is_nut_free BOOLEAN NOT NULL DEFAULT TRUE,
  is_vegan BOOLEAN NOT NULL DEFAULT FALSE,
  is_vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
  is_halal BOOLEAN NOT NULL DEFAULT TRUE,
  calories_per_serving INTEGER,
  protein_g INTEGER,
  carbs_g INTEGER,
  fat_g INTEGER,
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  tags JSONB DEFAULT '[]'::jsonb,
  popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_turkish_category ON turkish(category);
CREATE INDEX idx_turkish_status ON turkish(status);
CREATE INDEX idx_turkish_region ON turkish(region);
CREATE INDEX idx_turkish_protein_type ON turkish(protein_type);
CREATE INDEX idx_turkish_is_street_food ON turkish(is_street_food);
CREATE INDEX idx_turkish_is_meze ON turkish(is_meze);
CREATE INDEX idx_turkish_is_vegetarian ON turkish(is_vegetarian);
CREATE INDEX idx_turkish_is_halal ON turkish(is_halal);
CREATE INDEX idx_turkish_popularity ON turkish(popularity DESC);
CREATE INDEX idx_turkish_tags ON turkish USING GIN(tags);
CREATE INDEX idx_turkish_allergens ON turkish USING GIN(allergens);

-- Enable RLS
ALTER TABLE turkish ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Turkish items are viewable by everyone"
  ON turkish FOR SELECT
  USING (true);

-- Add to product_taxonomy
INSERT INTO product_taxonomy (menu_type, service_type, category, table_name, display_name, display_order)
VALUES ('food', 'restaurant', 'world_cuisine', 'turkish', 'Turkish', 29)
ON CONFLICT (table_name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  display_order = EXCLUDED.display_order;

RAISE NOTICE 'Schema created successfully!';

-- ============================================
-- STEP 2: INSERT MISSING INGREDIENTS
-- ============================================

-- Turkish-specific ingredients
INSERT INTO ingredients (id, slug, name, description, category, allergens)
VALUES
  ('ING_KASAR_CHEESE', 'kasar-cheese', 'Kaşar Cheese', 'Turkish yellow cheese, semi-hard with mild flavor', 'dairy', '["dairy"]'::jsonb),
  ('ING_BEYAZ_PEYNIR', 'beyaz-peynir', 'Beyaz Peynir', 'Turkish white cheese similar to feta', 'dairy', '["dairy"]'::jsonb),
  ('ING_LOR_CHEESE', 'lor-cheese', 'Lor Cheese', 'Turkish fresh curd cheese, soft and crumbly', 'dairy', '["dairy"]'::jsonb),
  ('ING_SUZME_YOGURT', 'suzme-yogurt', 'Süzme Yogurt', 'Strained thick Turkish yogurt', 'dairy', '["dairy"]'::jsonb),
  ('ING_SUCUK', 'sucuk', 'Sucuk', 'Spicy Turkish beef sausage with cumin and garlic', 'proteins', '[]'::jsonb),
  ('ING_PASTIRMA', 'pastirma', 'Pastırma', 'Air-dried cured beef coated in fenugreek paste', 'proteins', '[]'::jsonb),
  ('ING_KUZU_KUYRUK', 'kuzu-kuyruk', 'Kuzu Kuyruğu', 'Lamb tail fat, traditional Turkish cooking fat', 'proteins', '[]'::jsonb),
  ('ING_ISKEMBE', 'iskembe', 'İşkembe', 'Tripe for traditional Turkish soup', 'proteins', '[]'::jsonb),
  ('ING_CIGER', 'ciger', 'Ciğer', 'Lamb liver, grilled or fried Turkish specialty', 'proteins', '[]'::jsonb),
  ('ING_ISOT_BIBER', 'isot-biber', 'İsot Biber', 'Urfa pepper, smoky dried chili from Şanlıurfa', 'seasonings', '[]'::jsonb),
  ('ING_PUL_BIBER', 'pul-biber', 'Pul Biber', 'Turkish red pepper flakes, mild and fruity', 'seasonings', '[]'::jsonb),
  ('ING_SUMAC', 'sumac', 'Sumak', 'Sumac, tangy red spice for salads and kebabs', 'seasonings', '[]'::jsonb),
  ('ING_SALEP', 'salep', 'Salep', 'Orchid root powder for Turkish ice cream and drinks', 'seasonings', '[]'::jsonb),
  ('ING_MASTIC', 'mastic', 'Sakız (Mastic)', 'Resin from mastic tree, used in ice cream and desserts', 'seasonings', '[]'::jsonb),
  ('ING_BIBER_SALCASI', 'biber-salcasi', 'Biber Salçası', 'Turkish red pepper paste', 'seasonings', '[]'::jsonb),
  ('ING_DOMATES_SALCASI', 'domates-salcasi', 'Domates Salçası', 'Turkish tomato paste, concentrated', 'seasonings', '[]'::jsonb),
  ('ING_YUFKA', 'yufka', 'Yufka', 'Paper-thin Turkish phyllo dough', 'grains', '["gluten"]'::jsonb),
  ('ING_PIDE_BREAD', 'pide-bread', 'Pide Ekmeği', 'Soft Turkish flatbread', 'grains', '["gluten"]'::jsonb),
  ('ING_LAVASH', 'lavash', 'Lavaş', 'Thin soft Turkish flatbread', 'grains', '["gluten"]'::jsonb),
  ('ING_TARHANA', 'tarhana', 'Tarhana', 'Fermented grain and yogurt mixture for soup', 'grains', '["gluten", "dairy"]'::jsonb),
  ('ING_BULGUR_FINE', 'bulgur-fine', 'İnce Bulgur', 'Fine bulgur wheat for kisir and kofte', 'grains', '["gluten"]'::jsonb),
  ('ING_FREEKEH', 'freekeh', 'Firik', 'Roasted green wheat, smoky ancient grain', 'grains', '["gluten"]'::jsonb),
  ('ING_PEKMEZ', 'pekmez', 'Pekmez', 'Grape molasses, Turkish natural sweetener', 'sweeteners', '[]'::jsonb),
  ('ING_NAR_EKSISI', 'nar-eksisi', 'Nar Ekşisi', 'Pomegranate molasses', 'sweeteners', '[]'::jsonb),
  ('ING_KAYMAK', 'kaymak', 'Kaymak', 'Turkish clotted cream', 'dairy', '["dairy"]'::jsonb),
  ('ING_ANTEP_FISTIK', 'antep-fistik', 'Antep Fıstığı', 'Gaziantep pistachios, premium quality', 'nuts_seeds', '["tree_nuts"]'::jsonb),
  ('ING_FINDIK', 'findik', 'Fındık', 'Turkish hazelnuts from Black Sea region', 'nuts_seeds', '["tree_nuts"]'::jsonb),
  ('ING_CEVIZ', 'ceviz', 'Ceviz', 'Turkish walnuts', 'nuts_seeds', '["tree_nuts"]'::jsonb),
  ('ING_HAMSI', 'hamsi', 'Hamsi', 'Black Sea anchovies', 'proteins', '["fish"]'::jsonb),
  ('ING_LUFER', 'lufer', 'Lüfer', 'Bluefish from Bosphorus', 'proteins', '["fish"]'::jsonb),
  ('ING_MIDYE', 'midye', 'Midye', 'Turkish mussels', 'proteins', '["shellfish"]'::jsonb),
  ('ING_KARIDES', 'karides', 'Karides', 'Turkish shrimp', 'proteins', '["shellfish"]'::jsonb),
  ('ING_LEVREK', 'levrek', 'Levrek', 'Mediterranean sea bass', 'proteins', '["fish"]'::jsonb),
  ('ING_CIUPRA', 'ciupra', 'Çipura', 'Gilt-head bream', 'proteins', '["fish"]'::jsonb),
  ('ING_AHTAPOT', 'ahtapot', 'Ahtapot', 'Octopus', 'proteins', '["shellfish"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  allergens = EXCLUDED.allergens;

RAISE NOTICE 'Ingredients added successfully!';

-- ============================================
-- NOTE: The full data import (03-turkish-data.sql) and
-- product_ingredients (04-turkish-product-ingredients.sql)
-- should be run after this schema is created.
-- ============================================

-- Summary
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Turkish schema and ingredients ready!';
  RAISE NOTICE 'Next: Run 03-turkish-data.sql';
  RAISE NOTICE 'Then: Run 04-turkish-product-ingredients.sql';
  RAISE NOTICE '========================================';
END $$;
