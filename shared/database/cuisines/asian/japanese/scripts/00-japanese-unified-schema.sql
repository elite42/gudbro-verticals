-- ============================================
-- JAPANESE DATABASE - UNIFIED SCHEMA
-- Merges sushi (100) + new japanese dishes (73) = 173 total
-- Standard v1.1 (TEXT + CHECK constraints)
-- ============================================

-- Drop existing indexes first (cleanup)
DROP INDEX IF EXISTS idx_japanese_category;
DROP INDEX IF EXISTS idx_japanese_status;
DROP INDEX IF EXISTS idx_japanese_region;
DROP INDEX IF EXISTS idx_japanese_protein;
DROP INDEX IF EXISTS idx_japanese_cooking;
DROP INDEX IF EXISTS idx_japanese_izakaya;
DROP INDEX IF EXISTS idx_japanese_street;
DROP INDEX IF EXISTS idx_japanese_broth;
DROP INDEX IF EXISTS idx_japanese_vegan;
DROP INDEX IF EXISTS idx_japanese_vegetarian;
DROP INDEX IF EXISTS idx_japanese_halal;
DROP INDEX IF EXISTS idx_japanese_popularity;
DROP INDEX IF EXISTS idx_japanese_raw;
DROP INDEX IF EXISTS idx_japanese_sushi_category;

-- Drop table if exists (for fresh import)
DROP TABLE IF EXISTS japanese CASCADE;

-- Create unified japanese table
CREATE TABLE japanese (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,

    -- Japanese naming (used by all)
    japanese_name TEXT,              -- Romanized name (e.g., "Maguro Akami", "Shoyu Ramen")
    japanese_script TEXT,            -- Kanji/Hiragana/Katakana (e.g., "鮪赤身", "醤油ラーメン")

    -- Category - EXPANDED to include sushi categories
    category TEXT NOT NULL CHECK (category IN (
        -- Sushi categories (from old sushi table)
        'nigiri', 'sashimi', 'maki', 'uramaki', 'temaki', 'gunkan',
        'chirashi', 'oshizushi', 'inari', 'temari', 'specialty_roll',
        -- Non-sushi categories (new)
        'ramen', 'udon_soba', 'donburi', 'tempura', 'tonkatsu',
        'yakitori', 'izakaya', 'nabemono', 'yoshoku', 'comfort_food'
    )),

    -- Status
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active', 'signature', 'popular', 'classic', 'traditional',
        'regional', 'seasonal', 'premium', 'omakase'
    )),

    -- Region/Origin
    region TEXT CHECK (region IN (
        'tokyo', 'osaka', 'kyoto', 'hokkaido', 'kyushu',
        'hiroshima', 'nagoya', 'okinawa', 'sendai', 'national',
        'traditional_edo', 'modern', 'fusion'
    )),

    -- Protein type - EXPANDED
    protein_type TEXT CHECK (protein_type IN (
        -- General proteins
        'beef', 'pork', 'chicken', 'seafood', 'tofu', 'egg', 'mixed', 'vegetarian', 'vegetable', 'none',
        -- Specific fish (for sushi)
        'maguro_akami', 'maguro_chutoro', 'maguro_otoro', 'salmon', 'sake', 'hamachi', 'kanpachi', 'tai',
        'hirame', 'unagi', 'anago', 'ebi', 'amaebi', 'ika', 'tako', 'uni', 'ikura', 'tamago',
        'hotate', 'kani', 'taraba', 'saba', 'katsuo', 'aji', 'kohada', 'shiromi', 'hikarimono', 'shellfish',
        'masago', 'tobiko'
    )),

    -- Cooking/Preparation method - EXPANDED
    cooking_method TEXT CHECK (cooking_method IN (
        -- Non-sushi methods
        'grilled', 'deep_fried', 'pan_fried', 'steamed', 'boiled', 'simmered', 'raw', 'hot_pot',
        -- Sushi-specific
        'pressed', 'torched', 'marinated', 'cured', 'cooked', 'pickled', 'seared', 'tempura'
    )),

    -- ========== SHARED FLAGS ==========
    is_izakaya_style BOOLEAN DEFAULT FALSE,
    is_street_food BOOLEAN DEFAULT FALSE,
    is_comfort_food BOOLEAN DEFAULT FALSE,
    served_hot BOOLEAN DEFAULT TRUE,
    broth_based BOOLEAN DEFAULT FALSE,

    -- ========== SUSHI-SPECIFIC FIELDS ==========
    -- These are NULL for non-sushi items
    roll_style TEXT CHECK (roll_style IS NULL OR roll_style IN (
        'hosomaki', 'futomaki', 'chumaki', 'uramaki', 'temaki', 'gunkan', 'not_applicable'
    )),
    origin TEXT CHECK (origin IS NULL OR origin IN (
        'traditional_edo', 'traditional_osaka', 'traditional_kyoto', 'traditional_other',
        'modern', 'modern_japanese', 'fusion', 'california', 'japanese_american',
        'american_fusion', 'international'
    )),
    pieces_per_serving INTEGER,
    nori_position TEXT CHECK (nori_position IS NULL OR nori_position IN (
        'outside', 'inside', 'none', 'wrap'
    )),
    is_raw BOOLEAN DEFAULT FALSE,
    contains_raw_fish BOOLEAN DEFAULT FALSE,
    wasabi_included BOOLEAN DEFAULT FALSE,
    ginger_included BOOLEAN DEFAULT FALSE,

    -- Sushi ingredient arrays (kept for compatibility)
    main_ingredients TEXT[] DEFAULT '{}',
    filling_ingredients TEXT[] DEFAULT '{}',
    topping_ingredients TEXT[] DEFAULT '{}',
    sauce TEXT[] DEFAULT '{}',
    garnish TEXT[] DEFAULT '{}',

    -- Pairing suggestions (sushi)
    sake_pairing TEXT[] DEFAULT '{}',
    beer_pairing TEXT[] DEFAULT '{}',
    wine_pairing TEXT[] DEFAULT '{}',

    -- ========== SISTEMA 5 DIMENSIONI ==========
    -- Allergeni
    allergens TEXT[] DEFAULT '{}',

    -- Diete
    is_gluten_free BOOLEAN DEFAULT FALSE,
    is_dairy_free BOOLEAN DEFAULT TRUE,
    is_nut_free BOOLEAN DEFAULT TRUE,
    is_vegan BOOLEAN DEFAULT FALSE,
    is_vegetarian BOOLEAN DEFAULT FALSE,
    is_halal BOOLEAN DEFAULT FALSE,
    is_pescatarian BOOLEAN DEFAULT FALSE,
    is_cooked BOOLEAN DEFAULT TRUE,      -- Opposite of is_raw, for filtering

    -- Nutrizione
    calories_per_serving INTEGER,
    protein_g DECIMAL(5,1),
    carbs_g DECIMAL(5,1),
    fat_g DECIMAL(5,1),
    fiber_g DECIMAL(5,1),
    sodium_mg INTEGER,
    omega3_mg INTEGER,                   -- Important for sushi

    -- Piccantezza
    spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

    -- ========== METADATA ==========
    tags TEXT[] DEFAULT '{}',
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    difficulty TEXT CHECK (difficulty IS NULL OR difficulty IN ('easy', 'medium', 'hard', 'expert')),
    image_url TEXT,
    history TEXT,
    fun_fact TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== INDEXES ==========
-- General indexes
CREATE INDEX idx_japanese_category ON japanese(category);
CREATE INDEX idx_japanese_status ON japanese(status);
CREATE INDEX idx_japanese_region ON japanese(region);
CREATE INDEX idx_japanese_protein ON japanese(protein_type);
CREATE INDEX idx_japanese_cooking ON japanese(cooking_method);
CREATE INDEX idx_japanese_popularity ON japanese(popularity DESC);

-- Dietary indexes
CREATE INDEX idx_japanese_vegan ON japanese(is_vegan) WHERE is_vegan = TRUE;
CREATE INDEX idx_japanese_vegetarian ON japanese(is_vegetarian) WHERE is_vegetarian = TRUE;
CREATE INDEX idx_japanese_halal ON japanese(is_halal) WHERE is_halal = TRUE;
CREATE INDEX idx_japanese_gluten_free ON japanese(is_gluten_free) WHERE is_gluten_free = TRUE;

-- Style indexes
CREATE INDEX idx_japanese_izakaya ON japanese(is_izakaya_style) WHERE is_izakaya_style = TRUE;
CREATE INDEX idx_japanese_street ON japanese(is_street_food) WHERE is_street_food = TRUE;
CREATE INDEX idx_japanese_broth ON japanese(broth_based) WHERE broth_based = TRUE;

-- Sushi-specific indexes
CREATE INDEX idx_japanese_raw ON japanese(is_raw) WHERE is_raw = TRUE;
CREATE INDEX idx_japanese_cooked ON japanese(is_cooked) WHERE is_cooked = TRUE;

-- Composite indexes for common queries
CREATE INDEX idx_japanese_sushi_categories ON japanese(category)
    WHERE category IN ('nigiri', 'sashimi', 'maki', 'uramaki', 'temaki', 'gunkan', 'chirashi', 'oshizushi', 'inari', 'temari', 'specialty_roll');
CREATE INDEX idx_japanese_nonsushi_categories ON japanese(category)
    WHERE category IN ('ramen', 'udon_soba', 'donburi', 'tempura', 'tonkatsu', 'yakitori', 'izakaya', 'nabemono', 'yoshoku', 'comfort_food');

-- Enable RLS
ALTER TABLE japanese ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "japanese_public_read" ON japanese
    FOR SELECT USING (true);

-- Add comment
COMMENT ON TABLE japanese IS 'Unified Japanese cuisine database - sushi (100) + other dishes (73) = 173 total dishes';

-- Success message
SELECT 'Japanese unified schema created successfully' as status;
