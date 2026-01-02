-- Senegalese Cuisine - Create Table and Product Taxonomy
-- 28 traditional dishes from Senegal

BEGIN;

-- Drop table if exists
DROP TABLE IF EXISTS senegalese CASCADE;

-- Create table
CREATE TABLE senegalese (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('rice', 'stew', 'grilled', 'soup', 'street_food', 'dessert', 'beverage')),
  status TEXT NOT NULL CHECK (status IN ('iconic', 'classic', 'traditional', 'regional')),
  region TEXT,
  protein_type TEXT,
  cooking_method TEXT,
  prep_time_min INTEGER,
  spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_gluten_free BOOLEAN NOT NULL DEFAULT false,
  is_dairy_free BOOLEAN NOT NULL DEFAULT false,
  allergens TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
  image_url TEXT,
  origin JSONB DEFAULT '{"country": "SN", "region": null}'::jsonb,
  dish_type TEXT,
  cuisine TEXT DEFAULT 'senegalese',
  is_public BOOLEAN NOT NULL DEFAULT true,
  owner_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_senegalese_category ON senegalese(category);
CREATE INDEX idx_senegalese_status ON senegalese(status);
CREATE INDEX idx_senegalese_popularity ON senegalese(popularity DESC);
CREATE INDEX idx_senegalese_is_public ON senegalese(is_public) WHERE is_public = true;

-- RLS
ALTER TABLE senegalese ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON senegalese
  FOR SELECT USING (is_public = true);

CREATE POLICY "Owner full access" ON senegalese
  FOR ALL USING (auth.uid() = owner_id);

-- Updated_at trigger
CREATE TRIGGER set_senegalese_updated_at
  BEFORE UPDATE ON senegalese
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Product taxonomy
DELETE FROM product_taxonomy WHERE product_type = 'senegalese';

INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
) VALUES (
  'senegalese',
  'Senegalese Cuisine',
  'Cucina Senegalese',
  'standalone',
  'food',
  'second_course',
  71
);

COMMIT;
