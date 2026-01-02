-- ============================================
-- FRENCH CUISINE - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Adding only truly missing French-specific ingredients.
-- Verified against existing database.

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- HERBS & AROMATICS
('ING_HERBES_PROVENCE', 'herbes-de-provence', 'Herbes de Provence', 'Classic blend of thyme, rosemary, oregano, and lavender', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_FINES_HERBES', 'fines-herbes', 'Fines Herbes', 'French blend of parsley, chives, tarragon, and chervil', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CHERVIL', 'chervil', 'Chervil', 'Delicate herb with anise-like flavor', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- PROTEINS
('ING_DUCK_LEG', 'duck-leg', 'Duck Leg', 'Whole duck leg for confit', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_DUCK_FAT', 'duck-fat', 'Duck Fat', 'Rendered duck fat for cooking', 'fats', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_FOIE_GRAS', 'foie-gras', 'Foie Gras', 'Fattened duck or goose liver', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_ESCARGOT', 'escargot', 'Escargots', 'Edible snails for French dishes', 'proteins', '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_RABBIT', 'rabbit', 'Rabbit', 'Whole rabbit or rabbit pieces', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_VEAL_SWEETBREADS', 'veal-sweetbreads', 'Veal Sweetbreads', 'Thymus gland for classic French preparations', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_LARDONS', 'lardons', 'Lardons', 'Small strips of cured pork belly', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),

-- SEAFOOD
('ING_SOLE', 'sole', 'Sole', 'Delicate flatfish for meunière', 'proteins', '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_LANGOUSTINE', 'langoustine', 'Langoustine', 'Small lobster-like crustacean', 'proteins', '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),

-- DAIRY
('ING_GRUYERE', 'gruyere', 'Gruyère', 'Swiss-style cheese used in French cooking', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_COMTE', 'comte', 'Comté', 'French alpine cheese from Jura', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_ROQUEFORT', 'roquefort', 'Roquefort', 'Blue cheese from sheep milk', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_CAMEMBERT', 'camembert', 'Camembert', 'Soft-ripened cheese from Normandy', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_BRIE', 'brie', 'Brie', 'Soft cheese with white rind', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_CHEVRE', 'chevre', 'Chèvre', 'French goat cheese', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_CREME_FRAICHE', 'creme-fraiche', 'Crème Fraîche', 'Cultured sour cream, thicker than American sour cream', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- CONDIMENTS & SAUCES
('ING_DIJON_MUSTARD', 'dijon-mustard', 'Dijon Mustard', 'Sharp French mustard from Dijon', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CORNICHONS', 'cornichons', 'Cornichons', 'Small French pickled gherkins', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- VEGETABLES
('ING_HARICOTS_VERTS', 'haricots-verts', 'Haricots Verts', 'Thin French green beans', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_LEEK', 'leek', 'Leek', 'Mild allium for soups and gratins', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_FRENCH_LENTILS', 'french-lentils', 'French Lentils', 'Puy lentils from Le Puy', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Note: ING_SHALLOT, ING_COGNAC, ING_CALVADOS, ING_PERNOD already exist in database

-- BREAD
('ING_PAIN_CAMPAGNE', 'pain-de-campagne', 'Pain de Campagne', 'French country bread', 'bread', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
