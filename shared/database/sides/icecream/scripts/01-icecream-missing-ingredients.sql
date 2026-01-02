-- ============================================
-- ICE CREAM - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Insert missing ingredients for ice cream
-- Using ON CONFLICT DO NOTHING to handle existing ones

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- ICE CREAM BASES
('ING_HEAVY_CREAM', 'heavy-cream', 'Heavy Cream', 'Rich dairy cream with high fat content for ice cream base', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_CONDENSED_MILK', 'condensed-milk', 'Condensed Milk', 'Sweetened concentrated milk for rich ice cream', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_COCONUT_CREAM', 'coconut-cream', 'Coconut Cream', 'Rich cream extracted from coconut for dairy-free ice cream', 'dairy', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CASHEW_CREAM', 'cashew-cream', 'Cashew Cream', 'Blended cashew base for vegan ice cream', 'nuts', '[{"type": "tree_nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- CHOCOLATE & COCOA
('ING_COCOA_POWDER', 'cocoa-powder', 'Cocoa Powder', 'Unsweetened ground cacao for chocolate flavor', 'powders', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CHOCOLATE_CHUNK', 'chocolate-chunk', 'Chocolate Chunks', 'Large pieces of chocolate for mixing into ice cream', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CHOCOLATE_FUDGE', 'chocolate-fudge', 'Chocolate Fudge', 'Rich chocolate fudge sauce for swirls and topping', 'sweeteners', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- NUTS & PRALINES
('ING_PRALINE', 'praline', 'Praline', 'Caramelized sugar-coated nuts for ice cream', 'nuts', '[{"type": "tree_nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MACADAMIA', 'macadamia', 'Macadamia Nut', 'Rich buttery tropical nut for ice cream', 'nuts', '[{"type": "tree_nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CANDIED_PECAN', 'candied-pecan', 'Candied Pecans', 'Sugar-glazed pecans for topping', 'nuts', '[{"type": "tree_nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- FRUITS & PUREES
('ING_PASSION_FRUIT_PUREE', 'passion-fruit-puree', 'Passion Fruit Puree', 'Tropical fruit puree for sorbets and gelato', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MANGO_PUREE', 'mango-puree', 'Mango Puree', 'Sweet mango puree for tropical sorbets', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_RASPBERRY_PUREE', 'raspberry-puree', 'Raspberry Puree', 'Tart raspberry puree for sorbets and swirls', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_LEMON_ZEST', 'lemon-zest', 'Lemon Zest', 'Grated lemon peel for citrus flavor', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CANDIED_ORANGE', 'candied-orange', 'Candied Orange Peel', 'Sugar-preserved orange peel for garnish', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- COOKIES & INCLUSIONS
('ING_COOKIE_CRUMB', 'cookie-crumb', 'Cookie Crumbs', 'Crushed cookies for ice cream mix-ins', 'other', '[{"type": "gluten"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_WAFFLE_CONE', 'waffle-cone', 'Waffle Cone', 'Crispy waffle cone for serving ice cream', 'other', '[{"type": "gluten"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_BISCOTTI', 'biscotti', 'Biscotti', 'Italian twice-baked almond cookies', 'other', '[{"type": "gluten"}, {"type": "eggs"}, {"type": "tree_nuts"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- SAUCES & TOPPINGS
('ING_HOT_FUDGE', 'hot-fudge', 'Hot Fudge Sauce', 'Warm chocolate sauce for sundaes', 'sweeteners', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_BUTTERSCOTCH', 'butterscotch', 'Butterscotch Sauce', 'Sweet butter and brown sugar sauce', 'sweeteners', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_BERRY_COMPOTE', 'berry-compote', 'Berry Compote', 'Cooked mixed berry sauce for topping', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SPECIALTY FLAVORS
('ING_MATCHA_POWDER', 'matcha-powder', 'Matcha Powder', 'Finely ground Japanese green tea for ice cream', 'powders', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_BLACK_SESAME', 'black-sesame', 'Black Sesame Seeds', 'Roasted black sesame for Asian-style ice cream', 'nuts', '[{"type": "sesame"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_DULCE_DE_LECHE', 'dulce-de-leche', 'Dulce de Leche', 'South American caramelized milk spread', 'sweeteners', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_STRACCIATELLA', 'stracciatella', 'Stracciatella', 'Chocolate shards in Italian style', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- LIQUEURS (for adult flavors)
('ING_RUM_EXTRACT', 'rum-extract', 'Rum Extract', 'Non-alcoholic rum flavoring for ice cream', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_AMARETTO_FLAVOR', 'amaretto-flavor', 'Amaretto Flavoring', 'Almond liqueur flavor extract', 'condiments', '[{"type": "tree_nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
