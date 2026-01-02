-- South African Cuisine - New Ingredients
-- GUDBRO Database Standards v1.7
-- Run this FIRST before creating the table

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_APRICOT_JAM', 'Apricot Jam', 'apricot-jam', 'condiments',
 'Sweet fruit preserve made from apricots, essential for South African desserts like Malva Pudding and Hertzoggies',
 '{"calories": 250, "protein": 0.4, "fat": 0.1, "carbs": 65, "fiber": 0.7, "sodium": 10}')
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT id, name, category FROM ingredients WHERE id = 'ING_APRICOT_JAM';
