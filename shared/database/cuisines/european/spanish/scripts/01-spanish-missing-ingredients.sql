-- ============================================
-- SPANISH - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Adding only truly missing Spanish-specific ingredients.
-- Verified against existing database.

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- SPICES & SEASONINGS
('ING_PIMENTON_DULCE', 'pimenton-dulce', 'Pimentón Dulce', 'Sweet Spanish paprika from La Vera', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_PIMENTON_PICANTE', 'pimenton-picante', 'Pimentón Picante', 'Hot Spanish paprika from La Vera', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SAUSAGES & CURED MEATS
('ING_MORCILLA', 'morcilla', 'Morcilla', 'Spanish blood sausage with rice or onions', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_SOBRASADA', 'sobrasada', 'Sobrasada', 'Balearic cured sausage spread with paprika', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_LOMO', 'lomo', 'Lomo Embuchado', 'Cured pork loin', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),

-- SEAFOOD
('ING_GAMBAS', 'gambas', 'Gambas', 'Large Spanish prawns', 'proteins', '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_PERCEBES', 'percebes', 'Percebes', 'Galician goose barnacles, a delicacy', 'proteins', '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_BACALAO', 'bacalao', 'Bacalao', 'Salt cod, staple of Spanish cuisine', 'proteins', '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),

-- VEGETABLES
('ING_PADRON_PEPPERS', 'padron-peppers', 'Pimientos de Padrón', 'Small green peppers from Galicia, some are hot', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_PIQUILLO', 'piquillo-peppers', 'Piquillo Peppers', 'Sweet roasted red peppers from Navarra', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- BEANS
('ING_FABES', 'fabes', 'Fabes', 'Large white beans from Asturias for fabada', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- RICE
('ING_BOMBA_RICE', 'bomba-rice', 'Bomba Rice', 'Short-grain Spanish rice for paella', 'grains', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CALASPARRA_RICE', 'calasparra-rice', 'Calasparra Rice', 'DOP rice from Murcia for paella', 'grains', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- DAIRY
('ING_TETILLA', 'tetilla', 'Queso Tetilla', 'Creamy Galician cow milk cheese', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_IDIAZABAL', 'idiazabal', 'Idiazábal', 'Basque smoked sheep milk cheese', 'dairy', '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- SAUCES
('ING_ROMESCO', 'romesco', 'Romesco Sauce', 'Catalan sauce with roasted peppers, almonds and hazelnuts', 'condiments', '[{"type": "nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MOJO_VERDE', 'mojo-verde', 'Mojo Verde', 'Canarian green sauce with cilantro and garlic', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MOJO_ROJO', 'mojo-rojo', 'Mojo Rojo', 'Canarian red sauce with peppers and paprika', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_SALSA_BRAVA', 'salsa-brava', 'Salsa Brava', 'Spicy tomato sauce for patatas bravas', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- BREAD
('ING_PAN_CRISTAL', 'pan-cristal', 'Pan de Cristal', 'Catalan crispy flatbread', 'bread', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- BEVERAGES/WINE
('ING_SHERRY_VINEGAR', 'sherry-vinegar', 'Sherry Vinegar', 'Aged vinegar from Jerez', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- NUTS
('ING_MARCONA_ALMONDS', 'marcona-almonds', 'Marcona Almonds', 'Spanish almonds, sweeter and softer than regular', 'nuts', '[{"type": "nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SEAFOOD (missing)
('ING_HAKE', 'hake', 'Hake', 'Mild white fish popular in Spanish cuisine', 'proteins', '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_SQUID_INK', 'squid-ink', 'Squid Ink', 'Black ink from squid for arroz negro', 'proteins', '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_WHITE_FISH', 'white-fish', 'White Fish', 'Generic mild white fish', 'proteins', '[{"type": "fish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb)

ON CONFLICT DO NOTHING;
