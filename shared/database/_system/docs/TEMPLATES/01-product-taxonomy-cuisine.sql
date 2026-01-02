-- ============================================
-- TEMPLATE: Product Taxonomy per Cucine Nazionali
-- COPIA-INCOLLA: Sostituisci {CUISINE} con nome cucina
-- ============================================
--
-- VALORI OBBLIGATORI per cucine nazionali:
--   menu_type: 'standalone'
--   service_type: 'food'
--   category: 'second_course'
--   is_alcoholic: false
--   is_hot_served: true
--   requires_cooking: true
--
-- ESEMPI GIA' IN DB:
--   french, british, italian, spanish, moroccan, ethiopian, etc.
-- ============================================

INSERT INTO product_taxonomy (
    product_type,
    menu_type,
    service_type,
    category,
    display_name_en,
    display_name_it,
    display_order,
    icon,
    is_alcoholic,
    is_hot_served,
    requires_cooking
)
SELECT
    '{cuisine}',           -- es: 'german', 'portuguese'
    'standalone',          -- SEMPRE standalone per cucine
    'food',                -- SEMPRE food per cucine
    'second_course',       -- SEMPRE second_course per cucine
    '{Display Name EN}',   -- es: 'German Cuisine'
    '{Display Name IT}',   -- es: 'Cucina Tedesca'
    50,                    -- display_order (incrementare per nuove)
    '{emoji}',             -- es: bandiera paese
    false,                 -- is_alcoholic: sempre false per food
    true,                  -- is_hot_served: true per cucine
    true                   -- requires_cooking: true per cucine
WHERE NOT EXISTS (
    SELECT 1 FROM product_taxonomy WHERE product_type = '{cuisine}'
);

-- ============================================
-- ESEMPIO COMPLETO: German
-- ============================================
/*
INSERT INTO product_taxonomy (
    product_type, menu_type, service_type, category,
    display_name_en, display_name_it, display_order, icon,
    is_alcoholic, is_hot_served, requires_cooking
)
SELECT
    'german', 'standalone', 'food', 'second_course',
    'German Cuisine', 'Cucina Tedesca', 50, '🇩🇪',
    false, true, true
WHERE NOT EXISTS (
    SELECT 1 FROM product_taxonomy WHERE product_type = 'german'
);
*/

-- ============================================
-- ERRORI COMUNI (da LESSONS-LEARNED #52):
-- ============================================
--
-- 1. "column is_active does not exist"
--    → is_active NON ESISTE in product_taxonomy
--
-- 2. "no unique constraint matching ON CONFLICT"
--    → product_type NON ha UNIQUE constraint
--    → Usare WHERE NOT EXISTS invece di ON CONFLICT
--
-- 3. "violates check constraint product_taxonomy_category_check"
--    → category deve essere: 'appetizer', 'first_course', 'second_course',
--      'side_dish', 'dessert', 'beverage', 'cocktail', 'wine', 'beer', 'spirit'
--    → Per cucine usare SEMPRE 'second_course'
--
-- 4. "violates check constraint product_taxonomy_menu_type_check"
--    → menu_type deve essere: 'standalone', 'bar_menu', 'food_menu', 'dessert_menu'
--    → Per cucine usare SEMPRE 'standalone'
