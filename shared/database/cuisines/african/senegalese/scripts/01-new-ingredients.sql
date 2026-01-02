-- Senegalese Cuisine - New Ingredients
-- GUDBRO Database
-- Date: 2025-12-27
-- 2 new ingredients for Senegalese dishes

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_BAOBAB_POWDER', 'Baobab Powder', 'baobab-powder', 'fruits', 'Powder from the African baobab fruit, rich in vitamin C and fiber, used in Senegalese bouye drink', '{"calories": 230, "protein": 3, "fat": 0.3, "carbs": 47, "fiber": 45, "sodium": 2}'),
('ING_GRAINS_OF_SELIM', 'Grains of Selim', 'grains-of-selim', 'spices', 'Also called djar or Ethiopian pepper, used to flavor Café Touba and other West African dishes', '{"calories": 251, "protein": 6, "fat": 8, "carbs": 42, "fiber": 22, "sodium": 16}')
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT id, name, category FROM ingredients WHERE id IN ('ING_BAOBAB_POWDER', 'ING_GRAINS_OF_SELIM');
