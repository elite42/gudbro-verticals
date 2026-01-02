-- Australian Cuisine - Create Table and Taxonomy
-- 29 dishes across 9 categories

-- 1. Create australian table
CREATE TABLE IF NOT EXISTS australian (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('pie', 'bbq', 'seafood', 'pub', 'bush_tucker', 'snack', 'dessert', 'bread', 'beverage')),
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_australian_category ON australian(category);
CREATE INDEX IF NOT EXISTS idx_australian_status ON australian(status);
CREATE INDEX IF NOT EXISTS idx_australian_popularity ON australian(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_australian_region ON australian(region);
CREATE INDEX IF NOT EXISTS idx_australian_protein ON australian(protein_type);

-- 3. Enable RLS
ALTER TABLE australian ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policy for public read
DROP POLICY IF EXISTS "Allow public read access" ON australian;
CREATE POLICY "Allow public read access" ON australian
  FOR SELECT USING (true);

-- 5. Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 6. Create trigger for updated_at
DROP TRIGGER IF EXISTS update_australian_updated_at ON australian;
CREATE TRIGGER update_australian_updated_at
  BEFORE UPDATE ON australian
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Add to product_taxonomy (using WHERE NOT EXISTS pattern)
INSERT INTO product_taxonomy (
  product_type,
  display_name_en,
  display_name_it,
  menu_type,
  service_type,
  category,
  display_order
)
SELECT
  'australian',
  'Australian Cuisine',
  'Cucina Australiana',
  'standalone',
  'food',
  'second_course',
  73
WHERE NOT EXISTS (
  SELECT 1 FROM product_taxonomy WHERE product_type = 'australian'
);

-- Verification
SELECT 'Table created: australian' AS status;
SELECT * FROM product_taxonomy WHERE product_type = 'australian';
