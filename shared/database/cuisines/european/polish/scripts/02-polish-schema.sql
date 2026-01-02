-- ============================================
-- POLISH CUISINE - Schema Definition
-- GUDBRO Database Standards v1.7
-- ============================================

-- Create polish table
CREATE TABLE IF NOT EXISTS polish (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    local_name TEXT,
    description TEXT NOT NULL,

    -- Classification
    category TEXT NOT NULL CHECK (category IN (
        'dumplings', 'soups', 'mains', 'sides', 'street_food', 'desserts'
    )),
    region TEXT NOT NULL CHECK (region IN (
        'nationwide', 'silesia', 'malopolska', 'mazovia', 'podhale',
        'wielkopolska', 'kashubia', 'podlasie'
    )),
    status TEXT NOT NULL CHECK (status IN (
        'classic', 'traditional', 'popular', 'regional'
    )),

    -- Origin (JSONB for full geographic data)
    origin JSONB NOT NULL DEFAULT '{"country": "Poland", "country_code": "PL"}'::jsonb,

    -- Cooking
    protein_type TEXT CHECK (protein_type IN (
        'beef', 'pork', 'lamb', 'chicken', 'fish', 'seafood',
        'poultry', 'mixed', 'eggs', NULL
    )),
    cooking_method TEXT CHECK (cooking_method IN (
        'grilled', 'roasted', 'braised', 'fried', 'baked',
        'stewed', 'boiled', 'steamed', 'raw', 'sauteed', NULL
    )),
    spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
    prep_time_min INTEGER DEFAULT 30,

    -- Pricing
    price_default DECIMAL(10,2) DEFAULT 0,
    is_available BOOLEAN DEFAULT true,

    -- Dietary (JSONB format per standards v1.7)
    dietary JSONB DEFAULT '{
        "is_vegan": false,
        "is_vegetarian": false,
        "is_gluten_free": false,
        "is_dairy_free": false,
        "is_nut_free": true,
        "is_halal": false,
        "is_kosher": false
    }'::jsonb,

    -- Allergens & Health
    allergens TEXT[] NOT NULL DEFAULT '{}',
    intolerances TEXT[] NOT NULL DEFAULT '{}',

    -- Ingredients
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Metadata
    tags TEXT[] NOT NULL DEFAULT '{}',
    popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    image_url TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_polish_category ON polish(category);
CREATE INDEX IF NOT EXISTS idx_polish_region ON polish(region);
CREATE INDEX IF NOT EXISTS idx_polish_status ON polish(status);
CREATE INDEX IF NOT EXISTS idx_polish_popularity ON polish(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_polish_allergens ON polish USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_polish_ingredients ON polish USING GIN(ingredient_ids);

-- Partial index for image_url (only index non-null values)
CREATE INDEX IF NOT EXISTS idx_polish_image_url ON polish(image_url)
WHERE image_url IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE polish ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
DROP POLICY IF EXISTS "Allow public read access" ON polish;
CREATE POLICY "Allow public read access" ON polish
    FOR SELECT USING (true);

-- Create trigger function for updated_at (if not exists)
CREATE OR REPLACE FUNCTION update_polish_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS update_polish_timestamp ON polish;
CREATE TRIGGER update_polish_timestamp
    BEFORE UPDATE ON polish
    FOR EACH ROW
    EXECUTE FUNCTION update_polish_updated_at();

-- Register in product_taxonomy
INSERT INTO product_taxonomy (
    product_type, menu_type, service_type, category,
    display_name_en, display_name_it, display_order, icon,
    is_alcoholic, is_hot_served, requires_cooking
)
SELECT
    'polish', 'standalone', 'food', 'second_course',
    'Polish Cuisine', 'Cucina Polacca', 52, '🇵🇱',
    false, true, true
WHERE NOT EXISTS (
    SELECT 1 FROM product_taxonomy WHERE product_type = 'polish'
);
