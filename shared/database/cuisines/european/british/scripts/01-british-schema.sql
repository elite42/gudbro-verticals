-- ============================================
-- BRITISH CUISINE - Schema Definition
-- GUDBRO Database Standards v1.7
-- ============================================

-- Create british table
CREATE TABLE IF NOT EXISTS british (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    local_name TEXT,
    description TEXT NOT NULL,

    -- Classification
    category TEXT NOT NULL CHECK (category IN (
        'breakfast', 'main', 'pub', 'seafood', 'regional', 'dessert'
    )),
    region TEXT NOT NULL CHECK (region IN (
        'england', 'scotland', 'wales', 'northern_ireland',
        'cornwall', 'yorkshire', 'lancashire', 'london', 'pan_british'
    )),
    status TEXT NOT NULL CHECK (status IN (
        'classic', 'traditional', 'modern', 'pub_favorite', 'regional'
    )),

    -- Origin (JSONB for full geographic data)
    origin JSONB NOT NULL DEFAULT '{"country": "United Kingdom", "country_code": "GB"}'::jsonb,

    -- Cooking
    protein_type TEXT CHECK (protein_type IN (
        'beef', 'pork', 'lamb', 'chicken', 'fish', 'seafood', 'game', 'mixed'
    )),
    cooking_method TEXT CHECK (cooking_method IN (
        'grilled', 'roasted', 'braised', 'fried', 'baked',
        'stewed', 'boiled', 'steamed', 'raw', 'deep_fried', 'poached'
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

    -- Legacy boolean fields (for compatibility)
    is_vegetarian BOOLEAN DEFAULT false,
    is_vegan BOOLEAN DEFAULT false,
    is_gluten_free BOOLEAN DEFAULT false,
    is_dairy_free BOOLEAN DEFAULT false,
    is_nut_free BOOLEAN DEFAULT true,
    is_halal BOOLEAN DEFAULT false,
    is_kosher BOOLEAN DEFAULT false,

    -- Allergens & Intolerances (JSONB arrays)
    allergens JSONB DEFAULT '[]'::jsonb,
    intolerances JSONB DEFAULT '[]'::jsonb,

    -- Ingredients (for reference, actual linking in product_ingredients)
    ingredient_ids TEXT[] DEFAULT '{}',

    -- Metadata
    tags TEXT[] DEFAULT '{}',
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    image_url TEXT,

    -- Multi-tenant fields
    is_public BOOLEAN DEFAULT true,
    owner_id UUID,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_british_slug ON british(slug);
CREATE INDEX IF NOT EXISTS idx_british_category ON british(category);
CREATE INDEX IF NOT EXISTS idx_british_region ON british(region);
CREATE INDEX IF NOT EXISTS idx_british_status ON british(status);
CREATE INDEX IF NOT EXISTS idx_british_protein_type ON british(protein_type);
CREATE INDEX IF NOT EXISTS idx_british_is_vegetarian ON british(is_vegetarian);
CREATE INDEX IF NOT EXISTS idx_british_is_vegan ON british(is_vegan);
CREATE INDEX IF NOT EXISTS idx_british_is_available ON british(is_available);
CREATE INDEX IF NOT EXISTS idx_british_popularity ON british(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_british_dietary ON british USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_british_allergens ON british USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_british_tags ON british USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_british_origin ON british USING GIN(origin);

-- Partial index for public items
CREATE INDEX IF NOT EXISTS idx_british_public ON british(is_public) WHERE is_public = true;

-- Partial index for image_url
CREATE INDEX IF NOT EXISTS idx_british_has_image ON british(image_url) WHERE image_url IS NOT NULL;

-- Enable RLS
ALTER TABLE british ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "british_read_policy" ON british;
CREATE POLICY "british_read_policy" ON british FOR SELECT USING (true);

DROP POLICY IF EXISTS "british_write_policy" ON british;
CREATE POLICY "british_write_policy" ON british FOR ALL USING (true) WITH CHECK (true);

-- Register in product_taxonomy
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'british', 'standalone', 'food', 'second_course', 'British Cuisine', 'Cucina Britannica', 49, '🇬🇧', false, true
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'british');

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_british_updated_at ON british;
CREATE TRIGGER update_british_updated_at
    BEFORE UPDATE ON british
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Table comment
COMMENT ON TABLE british IS 'British cuisine dishes (44 items: breakfast, mains, pub food, seafood, regional, desserts). Standards v1.7.';
