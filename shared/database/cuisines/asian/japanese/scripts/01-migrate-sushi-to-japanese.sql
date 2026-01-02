-- ============================================
-- MIGRATE SUSHI DATA TO JAPANESE TABLE
-- Transfers 100 sushi records with field mapping
-- ============================================

-- Insert sushi data into japanese table with field mapping
INSERT INTO japanese (
    id, slug, name, description,
    japanese_name, japanese_script,
    category, status, region, protein_type, cooking_method,
    -- Shared flags
    is_izakaya_style, is_street_food, is_comfort_food, served_hot, broth_based,
    -- Sushi-specific
    roll_style, origin, pieces_per_serving, nori_position,
    is_raw, contains_raw_fish, wasabi_included, ginger_included,
    main_ingredients, filling_ingredients, topping_ingredients, sauce, garnish,
    sake_pairing, beer_pairing, wine_pairing,
    -- Sistema 5 Dimensioni
    allergens, is_gluten_free, is_dairy_free, is_nut_free,
    is_vegan, is_vegetarian, is_halal, is_pescatarian, is_cooked,
    calories_per_serving, protein_g, carbs_g, fat_g, omega3_mg,
    spice_level,
    -- Metadata
    tags, popularity, difficulty, history, fun_fact,
    created_at, updated_at
)
SELECT
    -- Prefix IDs to avoid conflicts and make them consistent with JPN_ pattern
    'JPN_SUSHI_' || UPPER(REPLACE(id, '-', '_')) as id,
    slug,
    name,
    description,
    -- Japanese naming
    name_japanese as japanese_name,
    name_kanji as japanese_script,
    -- Category stays the same (nigiri, sashimi, maki, etc.) - cast ENUM to TEXT
    category::TEXT as category,
    -- Status (cast ENUM to TEXT)
    status::TEXT as status,
    -- Map origin to region (cast ENUM to TEXT for comparison)
    CASE
        WHEN origin::TEXT = 'traditional_edo' THEN 'tokyo'
        WHEN origin::TEXT = 'modern' THEN 'national'
        WHEN origin::TEXT = 'fusion' THEN 'national'
        WHEN origin::TEXT = 'california' THEN 'national'
        WHEN origin::TEXT = 'japanese_american' THEN 'national'
        ELSE 'national'
    END as region,
    -- Protein type (cast ENUM to TEXT)
    protein_type::TEXT as protein_type,
    -- Map preparation to cooking_method (cast ENUM to TEXT)
    preparation::TEXT as cooking_method,
    -- Shared flags (sushi is generally not izakaya/street food)
    FALSE as is_izakaya_style,
    FALSE as is_street_food,
    FALSE as is_comfort_food,
    FALSE as served_hot,  -- Sushi is typically room temp or cold
    FALSE as broth_based,
    -- Sushi-specific (cast ENUMs to TEXT)
    roll_style::TEXT as roll_style,
    origin::TEXT as origin,
    pieces_per_serving,
    nori_position::TEXT as nori_position,
    is_raw,
    contains_raw_fish,
    wasabi_included,
    ginger_included,
    main_ingredients,
    filling_ingredients,
    topping_ingredients,
    sauce,
    garnish,
    sake_pairing,
    beer_pairing,
    wine_pairing,
    -- Sistema 5 Dimensioni
    allergens,
    is_gluten_free,
    TRUE as is_dairy_free,  -- Sushi is typically dairy-free
    TRUE as is_nut_free,    -- Sushi is typically nut-free
    is_vegan,
    is_vegetarian,
    FALSE as is_halal,      -- Raw fish not halal typically
    TRUE as is_pescatarian, -- Sushi is pescatarian-friendly
    is_cooked,
    calories_per_serving,
    protein_g,
    carbs_g,
    fat_g,
    omega3_mg,
    spice_level,
    -- Metadata
    tags,
    popularity,
    difficulty::TEXT as difficulty,
    history,
    fun_fact,
    created_at,
    updated_at
FROM sushi;

-- Verify migration
SELECT 'Sushi migration complete' as status, COUNT(*) as migrated_count
FROM japanese WHERE id LIKE 'JPN_SUSHI_%';
