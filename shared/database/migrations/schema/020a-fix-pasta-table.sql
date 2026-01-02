-- ============================================================================
-- FIX: Ricreare tabella pasta con ID TEXT invece di UUID
-- Esegui questo PRIMA dei batch pasta
-- ============================================================================

-- Drop existing pasta table if it has wrong ID type
DROP TABLE IF EXISTS pasta CASCADE;

-- Create ENUM types (safe - won't fail if they exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pasta_style') THEN
        CREATE TYPE pasta_style AS ENUM (
            'italian_classic',
            'italian_regional',
            'italian_fresh',
            'italian_filled',
            'italian_baked',
            'asian_chinese',
            'asian_japanese',
            'asian_korean',
            'asian_vietnamese',
            'asian_thai',
            'asian_other',
            'fusion',
            'signature'
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pasta_shape') THEN
        CREATE TYPE pasta_shape AS ENUM (
            'spaghetti', 'spaghettini', 'linguine', 'fettuccine', 'tagliatelle',
            'pappardelle', 'bucatini', 'capellini', 'vermicelli', 'bigoli',
            'penne', 'rigatoni', 'fusilli', 'farfalle', 'orecchiette',
            'conchiglie', 'cavatappi', 'paccheri', 'mezze_maniche', 'trofie',
            'strozzapreti', 'calamarata',
            'ravioli', 'tortellini', 'tortelloni', 'agnolotti', 'cappelletti',
            'mezzelune', 'culurgiones',
            'lasagne', 'cannelloni', 'manicotti',
            'ramen', 'udon', 'soba', 'rice_noodles', 'glass_noodles',
            'egg_noodles', 'lo_mein', 'rice_vermicelli', 'pho_noodles',
            'pad_thai_noodles', 'japchae_noodles',
            'gnocchetti', 'malloreddus', 'other'
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pasta_dough') THEN
        CREATE TYPE pasta_dough AS ENUM (
            'semolina', 'egg', 'whole_wheat', 'spinach', 'beetroot',
            'squid_ink', 'gluten_free', 'legume', 'rice', 'wheat',
            'buckwheat', 'sweet_potato', 'other'
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sauce_type') THEN
        CREATE TYPE sauce_type AS ENUM (
            'tomato', 'cream', 'oil_based', 'butter', 'pesto',
            'meat', 'seafood', 'cheese', 'broth', 'stir_fry',
            'curry', 'spicy', 'vegetable', 'none'
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cooking_method') THEN
        CREATE TYPE cooking_method AS ENUM (
            'boiled', 'baked', 'stir_fried', 'soup', 'cold', 'fresh_raw'
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pasta_status') THEN
        CREATE TYPE pasta_status AS ENUM (
            'classic', 'traditional', 'modern', 'signature', 'seasonal', 'trending', 'active'
        );
    END IF;
END $$;

-- Create pasta table with TEXT id
CREATE TABLE IF NOT EXISTS pasta (
    -- Primary identifiers
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    stable_key TEXT UNIQUE,

    -- Basic info (multilingual JSONB)
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    tagline JSONB,

    -- Classification
    status pasta_status NOT NULL DEFAULT 'classic',
    style pasta_style NOT NULL DEFAULT 'italian_classic',
    tags TEXT[] DEFAULT '{}',

    -- Origin (JSONB for flexibility)
    origin JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- History & Story (optional, JSONB)
    history JSONB,

    -- Composition
    pasta_shape pasta_shape NOT NULL DEFAULT 'spaghetti',
    pasta_dough pasta_dough NOT NULL DEFAULT 'semolina',
    sauce_type sauce_type NOT NULL DEFAULT 'tomato',
    cooking_method cooking_method NOT NULL DEFAULT 'boiled',

    -- Ingredients (JSONB array)
    ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,

    -- Protein (JSONB, optional)
    protein JSONB,

    -- Toppings (JSONB array)
    toppings JSONB DEFAULT '[]'::jsonb,

    -- Serving configuration (JSONB)
    serving JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Flavor profile (JSONB)
    flavor JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Dietary & Allergens (JSONB with Sistema 5 Dimensioni)
    dietary JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Customization options (JSONB)
    customization JSONB DEFAULT '{}'::jsonb,

    -- Variations (JSONB array)
    variations JSONB DEFAULT '[]'::jsonb,

    -- Popularity & Recommendations
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    recommended_for TEXT[] DEFAULT '{}',

    -- Pairings (JSONB)
    pairings JSONB DEFAULT '{}'::jsonb,

    -- Related pasta dishes
    related_pasta TEXT[] DEFAULT '{}',

    -- Media (JSONB)
    media JSONB,

    -- Source tracking
    source_url TEXT,
    source_note TEXT,

    -- Versioning
    version INTEGER DEFAULT 1,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pasta_slug ON pasta(slug);
CREATE INDEX IF NOT EXISTS idx_pasta_status ON pasta(status);
CREATE INDEX IF NOT EXISTS idx_pasta_style ON pasta(style);
CREATE INDEX IF NOT EXISTS idx_pasta_shape ON pasta(pasta_shape);
CREATE INDEX IF NOT EXISTS idx_pasta_tags ON pasta USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_pasta_dietary ON pasta USING GIN(dietary);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_pasta_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_pasta_updated_at ON pasta;
CREATE TRIGGER trigger_pasta_updated_at
    BEFORE UPDATE ON pasta
    FOR EACH ROW
    EXECUTE FUNCTION update_pasta_updated_at();

-- RLS
ALTER TABLE pasta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to pasta"
    ON pasta FOR SELECT
    USING (true);

CREATE POLICY "Allow service role full access to pasta"
    ON pasta FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Done
SELECT 'Pasta table created successfully with TEXT id' as status;
