-- ============================================
-- Brazilian Database Schema
-- GUDBRO Database Standards v1.2
-- ============================================

-- Create brazilian table with TEXT+CHECK pattern (v1.1 compliant)
CREATE TABLE IF NOT EXISTS brazilian (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    portuguese_name TEXT,

    -- Category with CHECK constraint
    category TEXT NOT NULL CHECK (category IN (
        'churrasco', 'feijoada', 'street_food', 'seafood', 'rice_beans',
        'soups_stews', 'northeastern', 'desserts', 'snacks', 'drinks'
    )),

    -- Status with CHECK constraint
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active', 'signature', 'popular', 'traditional', 'regional', 'classic'
    )),

    -- Region with CHECK constraint
    region TEXT CHECK (region IN (
        'national', 'sao_paulo', 'rio_de_janeiro', 'minas_gerais', 'bahia',
        'pernambuco', 'rio_grande_sul', 'goias', 'para', 'amazonas'
    )),

    -- Protein type with CHECK constraint
    protein_type TEXT CHECK (protein_type IN (
        'beef', 'pork', 'chicken', 'fish', 'seafood', 'mixed_meat',
        'vegetarian', 'vegan'
    )),

    -- Cooking method with CHECK constraint
    cooking_method TEXT CHECK (cooking_method IN (
        'grilled', 'fried', 'stewed', 'baked', 'steamed', 'raw', 'cooked'
    )),

    -- Brazilian-specific flags
    is_street_food BOOLEAN DEFAULT false,
    is_festive BOOLEAN DEFAULT false,
    is_comfort_food BOOLEAN DEFAULT true,
    served_hot BOOLEAN DEFAULT true,

    -- Allergens (JSON array)
    allergens JSONB DEFAULT '[]'::jsonb,

    -- Dietary information
    is_gluten_free BOOLEAN DEFAULT false,
    is_dairy_free BOOLEAN DEFAULT false,
    is_nut_free BOOLEAN DEFAULT true,
    is_vegan BOOLEAN DEFAULT false,
    is_vegetarian BOOLEAN DEFAULT false,
    is_halal BOOLEAN DEFAULT false,

    -- Nutrition per serving
    calories_per_serving INTEGER,
    protein_g DECIMAL(5,1),
    carbs_g DECIMAL(5,1),
    fat_g DECIMAL(5,1),

    -- Spice level 0-5
    spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- Tags for search
    tags JSONB DEFAULT '[]'::jsonb,

    -- Popularity score 0-100
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_brazilian_category ON brazilian(category);
CREATE INDEX IF NOT EXISTS idx_brazilian_status ON brazilian(status);
CREATE INDEX IF NOT EXISTS idx_brazilian_region ON brazilian(region);
CREATE INDEX IF NOT EXISTS idx_brazilian_protein_type ON brazilian(protein_type);
CREATE INDEX IF NOT EXISTS idx_brazilian_is_street_food ON brazilian(is_street_food);
CREATE INDEX IF NOT EXISTS idx_brazilian_is_festive ON brazilian(is_festive);
CREATE INDEX IF NOT EXISTS idx_brazilian_is_vegan ON brazilian(is_vegan);
CREATE INDEX IF NOT EXISTS idx_brazilian_is_vegetarian ON brazilian(is_vegetarian);
CREATE INDEX IF NOT EXISTS idx_brazilian_popularity ON brazilian(popularity);
CREATE INDEX IF NOT EXISTS idx_brazilian_tags ON brazilian USING GIN(tags);

-- Enable RLS
ALTER TABLE brazilian ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "brazilian_public_read" ON brazilian;
CREATE POLICY "brazilian_public_read" ON brazilian
    FOR SELECT USING (true);

-- Add to product_taxonomy
INSERT INTO product_taxonomy (product_type, display_name_en, menu_type, service_type, category)
SELECT 'brazilian', 'Brazilian Cuisine', 'standalone', 'food', 'second_course'
WHERE NOT EXISTS (
    SELECT 1 FROM product_taxonomy WHERE product_type = 'brazilian'
);

-- Output success message
SELECT 'Brazilian schema created successfully' as status;
