-- ============================================
-- ITALIAN CUISINE - Schema Definition
-- GUDBRO Database Standards v1.7
-- ============================================
-- NOTE: This table complements existing pasta, pizzas, risotti tables
-- Contains: Secondi, Antipasti, Zuppe, Contorni, Dolci

-- Create italian table
CREATE TABLE IF NOT EXISTS italian (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    local_name TEXT,
    description TEXT NOT NULL,

    -- Classification
    category TEXT NOT NULL CHECK (category IN (
        'antipasto_freddo', 'antipasto_caldo',
        'secondo_carne', 'secondo_pesce',
        'zuppa', 'contorno', 'dolce',
        'formaggio', 'salume'
    )),
    region TEXT NOT NULL CHECK (region IN (
        'piemonte', 'valle_d_aosta', 'lombardia', 'trentino_alto_adige',
        'veneto', 'friuli_venezia_giulia', 'liguria', 'emilia_romagna',
        'toscana', 'umbria', 'marche', 'lazio', 'abruzzo', 'molise',
        'campania', 'puglia', 'basilicata', 'calabria', 'sicilia', 'sardegna',
        'pan_italian'
    )),
    status TEXT NOT NULL CHECK (status IN (
        'classic', 'traditional', 'regional', 'modern', 'signature', 'popular', 'premium'
    )),

    -- Origin (JSONB for full geographic data)
    origin JSONB NOT NULL DEFAULT '{"country": "Italy", "country_code": "IT"}'::jsonb,

    -- Cooking
    protein_type TEXT CHECK (protein_type IN (
        'beef', 'pork', 'veal', 'lamb', 'chicken', 'rabbit', 'game',
        'fish', 'seafood', 'mixed', 'vegetarian', 'vegan'
    )),
    cooking_method TEXT CHECK (cooking_method IN (
        'grilled', 'roasted', 'braised', 'fried', 'baked',
        'stewed', 'boiled', 'steamed', 'raw', 'cured', 'deep_fried', 'sauteed', 'pan_fried'
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
CREATE INDEX IF NOT EXISTS idx_italian_slug ON italian(slug);
CREATE INDEX IF NOT EXISTS idx_italian_category ON italian(category);
CREATE INDEX IF NOT EXISTS idx_italian_region ON italian(region);
CREATE INDEX IF NOT EXISTS idx_italian_status ON italian(status);
CREATE INDEX IF NOT EXISTS idx_italian_protein_type ON italian(protein_type);
CREATE INDEX IF NOT EXISTS idx_italian_is_vegetarian ON italian(is_vegetarian);
CREATE INDEX IF NOT EXISTS idx_italian_is_vegan ON italian(is_vegan);
CREATE INDEX IF NOT EXISTS idx_italian_is_available ON italian(is_available);
CREATE INDEX IF NOT EXISTS idx_italian_popularity ON italian(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_italian_dietary ON italian USING GIN(dietary);
CREATE INDEX IF NOT EXISTS idx_italian_allergens ON italian USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_italian_tags ON italian USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_italian_origin ON italian USING GIN(origin);

-- Partial index for public items
CREATE INDEX IF NOT EXISTS idx_italian_public ON italian(is_public) WHERE is_public = true;

-- Partial index for image_url
CREATE INDEX IF NOT EXISTS idx_italian_has_image ON italian(image_url) WHERE image_url IS NOT NULL;

-- Enable RLS
ALTER TABLE italian ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "italian_read_policy" ON italian;
CREATE POLICY "italian_read_policy" ON italian FOR SELECT USING (true);

DROP POLICY IF EXISTS "italian_write_policy" ON italian;
CREATE POLICY "italian_write_policy" ON italian FOR ALL USING (true) WITH CHECK (true);

-- Register in product_taxonomy
INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it, display_order, icon, is_alcoholic, is_hot_served)
SELECT 'italian', 'standalone', 'food', 'second_course', 'Italian Cuisine', 'Cucina Italiana', 48, '🇮🇹', false, true
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'italian');

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_italian_updated_at ON italian;
CREATE TRIGGER update_italian_updated_at
    BEFORE UPDATE ON italian
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Table comment
COMMENT ON TABLE italian IS 'Italian cuisine dishes (Secondi, Antipasti, Zuppe, Contorni, Dolci) - 102 items. Complements pasta, pizzas, risotti tables.';
