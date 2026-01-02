-- ============================================================================
-- PIADINE MIGRATION SCRIPT
-- ============================================================================
-- Migra 21 piadine dalla tabella sandwiches alla nuova tabella piadine
-- ============================================================================

-- ============================================================================
-- STEP 1: Insert product_taxonomy entry
-- ============================================================================

INSERT INTO product_taxonomy (product_type, menu_type, service_type, category, display_name_en, display_name_it)
SELECT 'piadine', 'standalone', 'food', 'piadina', 'Piadine', 'Piadine'
WHERE NOT EXISTS (SELECT 1 FROM product_taxonomy WHERE product_type = 'piadine');

-- ============================================================================
-- STEP 2: Migrate data from sandwiches to piadine
-- ============================================================================

INSERT INTO piadine (
    id, slug, name, description, tagline, status,
    category,
    is_toasted, is_grilled,
    proteins, cheeses, vegetables, condiments,
    is_hot, is_pressed,
    origin, history, serving, dietary,
    customization, variations, popularity,
    related_piadine, media, pricing,
    created_at, updated_at
)
SELECT
    -- Rename IDs to use PIA_ prefix for consistency
    CASE
        WHEN id LIKE 'sandwich-%' THEN REPLACE(id, 'sandwich-', 'PIA_')
        WHEN id LIKE 'piadina-%' THEN REPLACE(id, 'piadina-', 'PIA_')
        WHEN id LIKE 'crescione-%' THEN REPLACE(id, 'crescione-', 'PIA_CRESCIONE_')
        ELSE 'PIA_' || UPPER(REPLACE(id, '-', '_'))
    END as id,
    slug,
    name,
    description,
    tagline,
    status,
    -- Set category based on original ID
    CASE
        WHEN id LIKE 'crescione-%' THEN 'crescione'
        ELSE 'piadina'
    END as category,
    bread_is_toasted as is_toasted,
    bread_is_grilled as is_grilled,
    proteins,
    cheeses,
    vegetables,
    condiments,
    is_hot,
    is_pressed,
    origin,
    history,
    serving,
    dietary,
    customization,
    variations,
    popularity,
    related_sandwiches as related_piadine,
    media,
    pricing,
    created_at,
    NOW() as updated_at
FROM sandwiches
WHERE bread_type = 'piadina'
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 3: Migrate product_ingredients
-- ============================================================================

-- First, get the new piadine IDs and their ingredient links
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
SELECT
    'piadine' as product_type,
    CASE
        WHEN s.id LIKE 'sandwich-%' THEN REPLACE(s.id, 'sandwich-', 'PIA_')
        WHEN s.id LIKE 'piadina-%' THEN REPLACE(s.id, 'piadina-', 'PIA_')
        WHEN s.id LIKE 'crescione-%' THEN REPLACE(s.id, 'crescione-', 'PIA_CRESCIONE_')
        ELSE 'PIA_' || UPPER(REPLACE(s.id, '-', '_'))
    END as product_id,
    pi.ingredient_id,
    pi.role,
    pi.is_optional,
    pi.sort_order
FROM product_ingredients pi
JOIN sandwiches s ON pi.product_id = s.id
WHERE pi.product_type = 'sandwiches'
AND s.bread_type = 'piadina'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 4: Verify migration
-- ============================================================================

SELECT 'Migration completed' as status;
SELECT
    'Piadine migrated: ' || COUNT(*) as result
FROM piadine;

SELECT
    'Product_ingredients linked: ' || COUNT(*) as result
FROM product_ingredients
WHERE product_type = 'piadine';
