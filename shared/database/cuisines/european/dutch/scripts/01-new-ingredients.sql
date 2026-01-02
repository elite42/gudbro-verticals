-- Dutch Cuisine - New Ingredients
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-25
-- New ingredients: 7

-- Insert Dutch-specific ingredients
INSERT INTO ingredients (id, name, slug, category) VALUES
('ING_BROWN_BEAN', 'Brown Beans', 'brown-bean', 'legumes'),
('ING_CURRY_KETCHUP', 'Curry Ketchup', 'curry-ketchup', 'condiments'),
('ING_ROOKWORST', 'Rookworst (Dutch Smoked Sausage)', 'rookworst', 'proteins'),
('ING_SPECULAAS_SPICE', 'Speculaas Spice Mix', 'speculaas-spice', 'spices'),
('ING_STROOP', 'Dutch Syrup (Stroop)', 'stroop', 'sweeteners'),
('ING_VLA', 'Vla (Dutch Custard)', 'vla', 'dairy'),
('ING_WHITING', 'Whiting Fish', 'whiting', 'seafood')
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT 'Dutch ingredients added: ' || COUNT(*) as status
FROM ingredients
WHERE id IN ('ING_BROWN_BEAN', 'ING_CURRY_KETCHUP', 'ING_ROOKWORST', 'ING_SPECULAAS_SPICE', 'ING_STROOP', 'ING_VLA', 'ING_WHITING');
