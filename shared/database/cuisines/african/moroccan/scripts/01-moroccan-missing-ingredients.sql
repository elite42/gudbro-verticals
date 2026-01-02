-- ============================================
-- MOROCCAN - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Adding only truly missing Moroccan-specific ingredients.
-- Verified against existing database.

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- SPICES & SEASONINGS
('ING_RAS_EL_HANOUT', 'ras-el-hanout', 'Ras el Hanout', 'North African spice blend with 20+ spices', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_PRESERVED_LEMON', 'preserved-lemon', 'Preserved Lemon', 'Salt-cured lemons used in Moroccan cuisine', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- MEATS
('ING_PIGEON', 'pigeon', 'Pigeon', 'Traditional meat for b''stilla', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),

-- BREADS & PASTRY
('ING_WARKA', 'warka', 'Warka Pastry', 'Paper-thin Moroccan pastry sheets similar to phyllo', 'bread', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MSEMMEN', 'msemmen', 'Msemmen', 'Moroccan layered flatbread', 'bread', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_KHOBZ', 'khobz', 'Khobz', 'Traditional Moroccan round bread', 'bread', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- VERMICELLI
('ING_VERMICELLI', 'vermicelli', 'Vermicelli', 'Thin pasta noodles used in harira', 'pasta', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- NUTS & DRIED FRUITS
('ING_DRIED_FIG', 'dried-fig', 'Dried Fig', 'Sun-dried figs for tagines and desserts', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SAUCES & PREPARATIONS
('ING_CHERMOULA', 'chermoula', 'Chermoula', 'Moroccan marinade with herbs, garlic, and spices', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_SMEN', 'smen', 'Smen', 'Moroccan preserved butter similar to ghee', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- MEATS & SAUSAGES
('ING_MERGUEZ', 'merguez', 'Merguez Sausage', 'Spicy North African lamb or beef sausage', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),

-- VEGETABLES
('ING_TURNIP', 'turnip', 'Turnip', 'Root vegetable common in Moroccan couscous', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_FAVA_BEAN', 'fava-bean', 'Fava Bean', 'Dried broad beans for bissara soup', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
