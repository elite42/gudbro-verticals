-- =============================================================================
-- VIETNAMESE DATABASE - SCHEMA
-- DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
-- =============================================================================

-- Drop table if exists (for re-runs)
DROP TABLE IF EXISTS vietnamese CASCADE;

-- Create vietnamese table
CREATE TABLE vietnamese (
    -- IDENTIFICATION
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,

    -- INFO BASE (English)
    name TEXT NOT NULL,
    description TEXT,
    vietnamese_name TEXT,               -- Phở Bò (with diacritics)

    -- CLASSIFICATION
    category TEXT NOT NULL CHECK (category IN (
        'pho', 'bun', 'com', 'mi', 'banh', 'goi_cuon',
        'chao', 'lau', 'nuong', 'xao', 'kho', 'hap',
        'chien', 'goi', 'che', 'do_uong'
    )),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active', 'classic', 'popular', 'signature', 'street_food', 'regional', 'premium'
    )),

    -- ORIGIN & INFLUENCES (NEW!)
    region TEXT NOT NULL CHECK (region IN (
        'northern', 'central', 'southern', 'mekong_delta',
        'highlands', 'coastal', 'national', 'international'
    )),
    origin_city TEXT,
    cuisine_influences TEXT[] DEFAULT ARRAY[]::TEXT[],  -- ['chinese', 'french_colonial']
    is_fusion BOOLEAN DEFAULT false,

    -- VIETNAMESE-SPECIFIC
    protein_type TEXT CHECK (protein_type IN (
        'beef', 'pork', 'chicken', 'duck', 'shrimp', 'fish',
        'squid', 'crab', 'mixed_seafood', 'tofu', 'vegetables',
        'egg', 'mixed', 'none'
    )),
    cooking_method TEXT CHECK (cooking_method IN (
        'boiled', 'simmered', 'grilled', 'stir_fried', 'deep_fried',
        'steamed', 'braised', 'raw', 'wrapped', 'hot_pot', 'baked'
    )),
    broth_type TEXT CHECK (broth_type IN (
        'beef_bone', 'pork_bone', 'chicken', 'seafood',
        'vegetable', 'mixed', 'none'
    )),
    meal_types TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_street_food BOOLEAN DEFAULT false,
    is_vegetarian_adaptable BOOLEAN DEFAULT false,

    -- INGREDIENTS
    ingredient_ids TEXT[] DEFAULT ARRAY[]::TEXT[],

    -- SISTEMA 5 DIMENSIONI - ALLERGENS
    allergens TEXT[] DEFAULT ARRAY[]::TEXT[],

    -- SISTEMA 5 DIMENSIONI - DIETARY FLAGS
    is_gluten_free BOOLEAN DEFAULT false,
    is_dairy_free BOOLEAN DEFAULT false,
    is_nut_free BOOLEAN DEFAULT false,
    is_vegan BOOLEAN DEFAULT false,
    is_vegetarian BOOLEAN DEFAULT false,
    is_halal BOOLEAN DEFAULT false,
    is_pescatarian BOOLEAN DEFAULT false,

    -- SISTEMA 5 DIMENSIONI - NUTRITION
    calories_per_serving INTEGER,
    protein_g DECIMAL(10,2),
    carbs_g DECIMAL(10,2),
    fat_g DECIMAL(10,2),

    -- SISTEMA 5 DIMENSIONI - SPICE (0-5)
    spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- METADATA
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),

    -- TIMESTAMPS
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_vietnamese_category ON vietnamese(category);
CREATE INDEX idx_vietnamese_region ON vietnamese(region);
CREATE INDEX idx_vietnamese_status ON vietnamese(status);
CREATE INDEX idx_vietnamese_protein_type ON vietnamese(protein_type);
CREATE INDEX idx_vietnamese_cooking_method ON vietnamese(cooking_method);
CREATE INDEX idx_vietnamese_is_street_food ON vietnamese(is_street_food);
CREATE INDEX idx_vietnamese_is_fusion ON vietnamese(is_fusion);
CREATE INDEX idx_vietnamese_is_vegetarian ON vietnamese(is_vegetarian);
CREATE INDEX idx_vietnamese_is_vegan ON vietnamese(is_vegan);
CREATE INDEX idx_vietnamese_is_halal ON vietnamese(is_halal);
CREATE INDEX idx_vietnamese_spice_level ON vietnamese(spice_level);
CREATE INDEX idx_vietnamese_popularity ON vietnamese(popularity);
CREATE INDEX idx_vietnamese_cuisine_influences ON vietnamese USING GIN(cuisine_influences);
CREATE INDEX idx_vietnamese_tags ON vietnamese USING GIN(tags);
CREATE INDEX idx_vietnamese_allergens ON vietnamese USING GIN(allergens);

-- Add to product_taxonomy (only if not exists)
INSERT INTO product_taxonomy (
    product_type, service_type, menu_type, category,
    display_order, display_name_en, display_name_it, display_name_vi,
    display_name_ko, display_name_ja, description_en, icon,
    is_alcoholic, is_hot_served, requires_cooking
)
SELECT
    'vietnamese', 'food', 'standalone', 'first_course',
    25, 'Vietnamese', 'Vietnamita', 'Việt Nam',
    '베트남', 'ベトナム料理', 'Authentic Vietnamese cuisine from all regions', '🍜',
    false, true, true
WHERE NOT EXISTS (
    SELECT 1 FROM product_taxonomy WHERE product_type = 'vietnamese'
);

-- Enable RLS
ALTER TABLE vietnamese ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access on vietnamese"
    ON vietnamese FOR SELECT
    USING (true);

COMMENT ON TABLE vietnamese IS 'Vietnamese cuisine database - 72 dishes with cuisine_influences tracking';
COMMENT ON COLUMN vietnamese.vietnamese_name IS 'Dish name in Vietnamese with diacritics (Phở Bò)';
COMMENT ON COLUMN vietnamese.cuisine_influences IS 'Array of cultural influences: chinese, french_colonial, khmer, cham, thai, etc.';
COMMENT ON COLUMN vietnamese.is_fusion IS 'True for modern fusion dishes (e.g., Pho Sot Vang with French wine influence)';
