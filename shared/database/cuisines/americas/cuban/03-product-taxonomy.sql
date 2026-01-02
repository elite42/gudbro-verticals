-- ============================================
-- Cuban Cuisine - Product Taxonomy
-- GUDBRO Database Standards v1.7
-- ============================================

-- Prima elimina entry esistente se presente
DELETE FROM product_taxonomy WHERE product_type = 'cuban';

-- Inserisci nuova entry
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
VALUES (
    'cuban',
    'standalone',
    'food',
    'second_course',
    'Cuban Cuisine',
    'Cucina Cubana',
    63,
    '🇨🇺',
    false,
    true,
    true
);
