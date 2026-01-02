-- ============================================
-- ETHIOPIAN - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Adding only truly missing Ethiopian-specific ingredients.
-- Verified against existing database.

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- SPICES & SEASONINGS
('ING_BERBERE', 'berbere', 'Berbere', 'Ethiopian red spice blend with chili, fenugreek, and warm spices', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MITMITA', 'mitmita', 'Mitmita', 'Ethiopian orange-red spice blend, hotter than berbere', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_KORERIMA', 'korerima', 'Korerima', 'Ethiopian cardamom, also called false cardamom', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_KOSERET', 'koseret', 'Koseret', 'Ethiopian herb similar to oregano, used in niter kibbeh', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_BESOBELA', 'besobela', 'Besobela', 'Ethiopian sacred basil used in spice blends', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- FATS & OILS
('ING_NITER_KIBBEH', 'niter-kibbeh', 'Niter Kibbeh', 'Ethiopian spiced clarified butter with herbs and spices', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- BREADS & GRAINS
('ING_INJERA', 'injera', 'Injera', 'Ethiopian spongy sourdough flatbread made from teff flour', 'bread', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_TEFF_FLOUR', 'teff-flour', 'Teff Flour', 'Ancient Ethiopian grain flour, naturally gluten-free', 'grains', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- DAIRY
('ING_AYIB', 'ayib', 'Ayib', 'Ethiopian fresh cottage cheese, similar to ricotta', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- LEGUMES
('ING_SPLIT_PEAS', 'split-peas', 'Split Peas', 'Dried split peas for shiro and other dishes', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- BEVERAGES
('ING_TEJ', 'tej', 'Tej', 'Ethiopian honey wine made with gesho leaves', 'beverages', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_GESHO', 'gesho', 'Gesho', 'Ethiopian hops-like plant for brewing tej and tella', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SAUCES
('ING_AWAZE', 'awaze', 'Awaze', 'Ethiopian hot sauce made with berbere and tej', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
