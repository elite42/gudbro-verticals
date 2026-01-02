-- ============================================
-- TEMPLATE: Schema per Cucine Nazionali
-- COPIA-INCOLLA: Sostituisci {cuisine} con nome cucina
-- ============================================
--
-- REGOLE CRITICHE:
-- 1. Usare TEXT + CHECK, MAI ENUM
-- 2. TIMESTAMPTZ, mai TIMESTAMP
-- 3. NOT NULL DEFAULT per boolean e arrays
-- 4. RLS obbligatorio
-- 5. Trigger per updated_at
-- ============================================

-- 1. CREATE TABLE
CREATE TABLE IF NOT EXISTS {cuisine} (
    -- Identificazione
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,

    -- Classificazione (adattare categories e regions)
    category TEXT NOT NULL CHECK (category IN ('category1', 'category2', 'category3')),
    region TEXT NOT NULL CHECK (region IN ('region1', 'region2', 'nationwide')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'classic', 'regional', 'seasonal')),

    -- Ingredienti
    ingredient_ids TEXT[] NOT NULL DEFAULT '{}',

    -- Allergens & Dietary
    allergens TEXT[] NOT NULL DEFAULT '{}',
    dietary JSONB NOT NULL DEFAULT '{
        "is_vegetarian": false,
        "is_vegan": false,
        "is_gluten_free": false,
        "is_dairy_free": false,
        "is_halal": false,
        "is_kosher": false
    }',

    -- Characteristics
    spice_level INTEGER NOT NULL DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
    serving_temp TEXT NOT NULL DEFAULT 'hot' CHECK (serving_temp IN ('hot', 'warm', 'cold', 'room_temp')),
    preparation_time_min INTEGER,

    -- Popularity & Pricing
    popularity INTEGER NOT NULL DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    price_category TEXT NOT NULL DEFAULT 'moderate' CHECK (price_category IN ('budget', 'moderate', 'premium')),

    -- Media
    image_url TEXT,

    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_{cuisine}_category ON {cuisine}(category);
CREATE INDEX IF NOT EXISTS idx_{cuisine}_region ON {cuisine}(region);
CREATE INDEX IF NOT EXISTS idx_{cuisine}_status ON {cuisine}(status);
CREATE INDEX IF NOT EXISTS idx_{cuisine}_popularity ON {cuisine}(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_{cuisine}_ingredient_ids ON {cuisine} USING GIN(ingredient_ids);

-- 3. Trigger updated_at
CREATE OR REPLACE FUNCTION update_{cuisine}_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

DROP TRIGGER IF EXISTS trigger_{cuisine}_updated_at ON {cuisine};
CREATE TRIGGER trigger_{cuisine}_updated_at
    BEFORE UPDATE ON {cuisine}
    FOR EACH ROW
    EXECUTE FUNCTION update_{cuisine}_updated_at();

-- 4. Enable RLS
ALTER TABLE {cuisine} ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DROP POLICY IF EXISTS "{cuisine}_read_all" ON {cuisine};
CREATE POLICY "{cuisine}_read_all" ON {cuisine}
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "{cuisine}_insert_authenticated" ON {cuisine};
CREATE POLICY "{cuisine}_insert_authenticated" ON {cuisine}
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "{cuisine}_update_authenticated" ON {cuisine};
CREATE POLICY "{cuisine}_update_authenticated" ON {cuisine}
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 6. Comments
COMMENT ON TABLE {cuisine} IS '{Cuisine} cuisine dishes';
