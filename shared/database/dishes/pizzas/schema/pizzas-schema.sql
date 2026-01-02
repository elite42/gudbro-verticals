-- ============================================================================
-- GUDBRO Pizza Database Schema
-- ============================================================================
-- Creates the pizzas table with full support for:
-- - Multi-language content (JSONB)
-- - Comprehensive ingredient tracking
-- - Dietary/allergen information
-- - Cooking specifications
-- - Serving modes (whole, slice, weight)
-- ============================================================================

-- Drop existing table if needed (for fresh installs)
-- DROP TABLE IF EXISTS pizzas CASCADE;

CREATE TABLE IF NOT EXISTS pizzas (
    -- IDENTIFIERS
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    stable_key VARCHAR(100) UNIQUE NOT NULL,

    -- BASIC INFO (multilingual JSONB)
    name JSONB NOT NULL,                    -- {"en": "...", "it": "...", ...}
    description JSONB NOT NULL,
    tagline JSONB,

    -- CLASSIFICATION
    status VARCHAR(50) NOT NULL CHECK (status IN (
        'doc_certified', 'classic', 'regional', 'international',
        'fusion', 'gourmet', 'vegan', 'seasonal'
    )),
    style VARCHAR(50) NOT NULL CHECK (style IN (
        'napoletana', 'romana', 'siciliana', 'al_taglio',
        'new_york', 'chicago', 'detroit', 'california',
        'gourmet', 'fusion', 'other'
    )),
    tags TEXT[] DEFAULT '{}',

    -- ORIGIN
    origin JSONB NOT NULL,                  -- {country, country_code, region?, city?, year_created?, creator?, certification?}

    -- HISTORY & STORY (optional)
    history JSONB,                          -- {story, named_after?, fun_fact?}

    -- COMPOSITION
    base VARCHAR(50) NOT NULL CHECK (base IN (
        'tomato', 'white', 'pesto', 'bbq', 'buffalo',
        'garlic_oil', 'hummus', 'none'
    )),
    primary_cheese VARCHAR(50) NOT NULL CHECK (primary_cheese IN (
        'mozzarella_fior_di_latte', 'mozzarella_bufala', 'burrata',
        'ricotta', 'gorgonzola', 'parmesan', 'pecorino', 'provolone',
        'scamorza', 'taleggio', 'fontina', 'goat_cheese', 'feta',
        'vegan_cheese', 'none'
    )),
    additional_cheeses TEXT[] DEFAULT '{}',
    dough_type VARCHAR(50) NOT NULL CHECK (dough_type IN (
        'neapolitan', 'roman', 'sicilian', 'american',
        'whole_wheat', 'gluten_free', 'cauliflower', 'sourdough'
    )),

    -- INGREDIENTS (array of ingredient objects)
    ingredients JSONB NOT NULL DEFAULT '[]',  -- [{ingredient_id, quantity?, display_name?, is_optional?, is_topping?, notes?}]

    -- COOKING
    cooking JSONB NOT NULL,                 -- {method, temperature_celsius?, time_seconds?, notes?}

    -- FLAVOR PROFILE
    flavor JSONB NOT NULL,                  -- {profile: [], description?, spice_level: 0-5}

    -- DIETARY & ALLERGENS
    dietary JSONB NOT NULL,                 -- {is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, is_nut_free, is_halal, is_kosher, allergens[], calories_estimate?}

    -- SERVING SUGGESTIONS
    serving JSONB NOT NULL,                 -- {suggested_modes[], portions_whole?, ideal_temperature, reheating_notes?, wine_pairing?, beer_pairing?}

    -- VARIATIONS (optional)
    variations JSONB,                       -- [{name, description, additional_ingredients?}]

    -- POPULARITY & RECOMMENDATIONS
    popularity INTEGER DEFAULT 50 CHECK (popularity >= 0 AND popularity <= 100),
    recommended_for TEXT[] DEFAULT '{}',

    -- RELATED PIZZAS
    related_pizzas TEXT[] DEFAULT '{}',     -- Array of slugs

    -- MEDIA (optional)
    media JSONB,                            -- {thumbnail?, gallery?}

    -- SOURCE INFO
    source_url TEXT,
    source_note TEXT,

    -- VERSIONING & TIMESTAMPS
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Primary lookups
CREATE INDEX IF NOT EXISTS idx_pizzas_slug ON pizzas(slug);
CREATE INDEX IF NOT EXISTS idx_pizzas_stable_key ON pizzas(stable_key);

-- Classification indexes
CREATE INDEX IF NOT EXISTS idx_pizzas_status ON pizzas(status);
CREATE INDEX IF NOT EXISTS idx_pizzas_style ON pizzas(style);
CREATE INDEX IF NOT EXISTS idx_pizzas_base ON pizzas(base);

-- GIN indexes for JSONB and array searches
CREATE INDEX IF NOT EXISTS idx_pizzas_tags ON pizzas USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_pizzas_recommended_for ON pizzas USING GIN(recommended_for);
CREATE INDEX IF NOT EXISTS idx_pizzas_name ON pizzas USING GIN(name);
CREATE INDEX IF NOT EXISTS idx_pizzas_dietary ON pizzas USING GIN(dietary);

-- Popularity for sorting
CREATE INDEX IF NOT EXISTS idx_pizzas_popularity ON pizzas(popularity DESC);

-- ============================================================================
-- UPDATED_AT TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION update_pizzas_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_pizzas_updated_at ON pizzas;
CREATE TRIGGER trigger_pizzas_updated_at
    BEFORE UPDATE ON pizzas
    FOR EACH ROW
    EXECUTE FUNCTION update_pizzas_updated_at();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE pizzas IS 'Master pizza catalog with comprehensive data for menu, dietary info, and cooking specifications';
COMMENT ON COLUMN pizzas.slug IS 'URL-friendly unique identifier';
COMMENT ON COLUMN pizzas.stable_key IS 'Permanent key for translations and references';
COMMENT ON COLUMN pizzas.name IS 'Multilingual pizza name {"en": "...", "it": "...", etc}';
COMMENT ON COLUMN pizzas.ingredients IS 'Array of ingredient references with quantities';
COMMENT ON COLUMN pizzas.dietary IS 'Dietary restrictions and allergen information';
COMMENT ON COLUMN pizzas.serving IS 'Suggested selling modes and serving information';
COMMENT ON COLUMN pizzas.popularity IS 'Popularity score 0-100 for sorting recommendations';

-- ============================================================================
-- SAMPLE QUERIES
-- ============================================================================

-- Find vegetarian pizzas:
-- SELECT * FROM pizzas WHERE (dietary->>'is_vegetarian')::boolean = true;

-- Find pizzas by style:
-- SELECT * FROM pizzas WHERE style = 'napoletana';

-- Find pizzas with specific tag:
-- SELECT * FROM pizzas WHERE 'spicy' = ANY(tags);

-- Find gluten-free pizzas:
-- SELECT * FROM pizzas WHERE (dietary->>'is_gluten_free')::boolean = true;

-- Search by name (any language):
-- SELECT * FROM pizzas WHERE name::text ILIKE '%margherita%';

-- Find pizzas that can be sold by slice:
-- SELECT * FROM pizzas WHERE serving->'suggested_modes' ? 'slice';
