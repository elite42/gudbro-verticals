-- ============================================
-- SAUCES - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Most sauce ingredients already exist in the database.
-- Adding only truly missing ones.

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- CREAMY SAUCES
('ING_RANCH_DRESSING', 'ranch-dressing', 'Ranch Dressing', 'Creamy American dressing with herbs and buttermilk', 'sauces', '[{"type": "dairy"}, {"type": "eggs"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_BLUE_CHEESE_DRESSING', 'blue-cheese-dressing', 'Blue Cheese Dressing', 'Creamy dressing with crumbled blue cheese', 'sauces', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_TARTAR_SAUCE', 'tartar-sauce', 'Tartar Sauce', 'Mayonnaise-based sauce with pickles and capers', 'sauces', '[{"type": "eggs"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_THOUSAND_ISLAND', 'thousand-island', 'Thousand Island Dressing', 'Creamy pink dressing with pickles', 'sauces', '[{"type": "eggs"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_CAESAR_DRESSING', 'caesar-dressing', 'Caesar Dressing', 'Classic dressing with anchovies, garlic and parmesan', 'sauces', '[{"type": "dairy"}, {"type": "eggs"}, {"type": "fish"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_REMOULADE', 'remoulade', 'Remoulade Sauce', 'French mayo-based sauce with herbs and capers', 'sauces', '[{"type": "eggs"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- MEAT SAUCES
('ING_BEARNAISE', 'bearnaise-sauce', 'Bearnaise Sauce', 'French butter sauce with tarragon and shallots', 'sauces', '[{"type": "dairy"}, {"type": "eggs"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_HOLLANDAISE', 'hollandaise-sauce', 'Hollandaise Sauce', 'Emulsified butter and egg yolk sauce', 'sauces', '[{"type": "dairy"}, {"type": "eggs"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_PEPPERCORN_SAUCE', 'peppercorn-sauce', 'Peppercorn Sauce', 'Creamy sauce with crushed peppercorns', 'sauces', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_MUSHROOM_SAUCE', 'mushroom-sauce', 'Mushroom Sauce', 'Creamy sauce with sauteed mushrooms', 'sauces', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_RED_WINE_REDUCTION', 'red-wine-reduction', 'Red Wine Reduction', 'Rich sauce reduced with red wine and herbs', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SPICY SAUCES
('ING_BUFFALO_SAUCE', 'buffalo-sauce', 'Buffalo Sauce', 'Spicy cayenne pepper sauce with butter', 'sauces', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_CHIPOTLE_SAUCE', 'chipotle-sauce', 'Chipotle Sauce', 'Smoky sauce made from chipotle peppers', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_HARISSA', 'harissa', 'Harissa', 'North African hot chili pepper paste', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_GOCHUJANG', 'gochujang', 'Gochujang', 'Korean fermented red chili paste', 'sauces', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_SAMBAL_OELEK', 'sambal-oelek', 'Sambal Oelek', 'Indonesian chili paste', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SWEET SAUCES
('ING_HONEY_MUSTARD', 'honey-mustard', 'Honey Mustard', 'Sweet and tangy mustard sauce with honey', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_SWEET_CHILI_SAUCE', 'sweet-chili-sauce', 'Sweet Chili Sauce', 'Thai-style sweet and mildly spicy sauce', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MANGO_CHUTNEY', 'mango-chutney', 'Mango Chutney', 'Sweet and tangy Indian mango condiment', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- ASIAN SAUCES
('ING_PONZU', 'ponzu', 'Ponzu Sauce', 'Japanese citrus-based soy sauce', 'sauces', '[{"type": "soy"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_TONKATSU_SAUCE', 'tonkatsu-sauce', 'Tonkatsu Sauce', 'Japanese thick brown sauce for fried cutlets', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_OYSTER_SAUCE', 'oyster-sauce', 'Oyster Sauce', 'Thick savory sauce made from oyster extracts', 'sauces', '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_PLUM_SAUCE', 'plum-sauce', 'Plum Sauce', 'Sweet and sour Chinese condiment', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_PEANUT_SAUCE', 'peanut-sauce', 'Peanut Sauce', 'Thai-style sauce with peanuts and coconut', 'sauces', '[{"type": "peanuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- MISSING BASICS
('ING_HERBS', 'mixed-herbs', 'Mixed Herbs', 'Blend of dried herbs for cooking', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_SESAME', 'sesame-seeds', 'Sesame Seeds', 'Small seeds with nutty flavor', 'nuts', '[{"type": "sesame"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_YUZU', 'yuzu', 'Yuzu', 'Japanese citrus fruit with unique aroma', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
