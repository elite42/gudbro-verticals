-- ============================================
-- FIX: Missing ingredients for Sauces
-- Run this before 04-sauces-product-ingredients.sql
-- ============================================

INSERT INTO ingredients (id, slug, name, category, allergens, intolerances, dietary) VALUES
('ING_HERBS', 'mixed-herbs', 'Mixed Herbs', 'spices', '{}'::jsonb, '{}'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb),
('ING_SESAME', 'sesame-seeds', 'Sesame Seeds', 'nuts', '{"sesame": true}'::jsonb, '{}'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": false}'::jsonb),
('ING_YUZU', 'yuzu', 'Yuzu', 'fruits', '{}'::jsonb, '{}'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}'::jsonb)
ON CONFLICT (id) DO NOTHING;
