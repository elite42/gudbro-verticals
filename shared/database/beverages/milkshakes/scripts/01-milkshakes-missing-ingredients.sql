-- ============================================
-- MILKSHAKES - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Insert missing ingredients for milkshakes
-- Using ON CONFLICT DO NOTHING to handle existing ones

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- ICE CREAM & DAIRY
('ING_VANILLA_ICE_CREAM', 'vanilla-ice-cream', 'Vanilla Ice Cream', 'Classic creamy vanilla frozen dessert', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_CHOCOLATE_ICE_CREAM', 'chocolate-ice-cream', 'Chocolate Ice Cream', 'Rich chocolate frozen dessert', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_STRAWBERRY_ICE_CREAM', 'strawberry-ice-cream', 'Strawberry Ice Cream', 'Fresh strawberry flavored frozen dessert', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- SYRUPS & SAUCES
('ING_CHOCOLATE_SYRUP', 'chocolate-syrup', 'Chocolate Syrup', 'Sweet chocolate sauce for desserts', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CARAMEL_SAUCE', 'caramel-sauce', 'Caramel Sauce', 'Sweet buttery caramel topping', 'sweeteners', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_STRAWBERRY_SYRUP', 'strawberry-syrup', 'Strawberry Syrup', 'Sweet strawberry flavored syrup', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MALT_POWDER', 'malt-powder', 'Malt Powder', 'Malted milk powder for classic malt flavor', 'powders', '[{"type": "dairy"}, {"type": "gluten"}]'::jsonb, '[{"type": "lactose"}, {"type": "gluten"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- TOPPINGS
('ING_WHIPPED_CREAM', 'whipped-cream', 'Whipped Cream', 'Light fluffy sweetened cream topping', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_MARASCHINO_CHERRY', 'maraschino-cherry', 'Maraschino Cherry', 'Sweet preserved cherry for garnish', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CHOCOLATE_CHIP', 'chocolate-chip', 'Chocolate Chips', 'Small pieces of chocolate for mixing or topping', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_OREO_COOKIE', 'oreo-cookie', 'Oreo Cookie', 'Classic chocolate sandwich cookie with cream filling', 'other', '[{"type": "gluten"}, {"type": "soy"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_SPRINKLE', 'sprinkle', 'Sprinkles', 'Colorful sugar decorations for desserts', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- COOKIES & CANDY
('ING_BROWNIE', 'brownie', 'Brownie', 'Rich chocolate baked dessert', 'other', '[{"type": "gluten"}, {"type": "dairy"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_COOKIE_DOUGH', 'cookie-dough', 'Cookie Dough', 'Raw cookie dough pieces for mixing', 'other', '[{"type": "gluten"}, {"type": "dairy"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_REESES', 'reeses-peanut-butter', 'Reese''s Peanut Butter Cups', 'Chocolate cups filled with peanut butter', 'sweeteners', '[{"type": "peanuts"}, {"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- LIQUORS (for boozy milkshakes)
('ING_KAHLUA', 'kahlua', 'Kahlúa', 'Coffee-flavored liqueur from Mexico', 'spirits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_IRISH_CREAM', 'irish-cream', 'Irish Cream Liqueur', 'Cream-based whiskey liqueur', 'spirits', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- FRUITS
('ING_DATE', 'date', 'Date', 'Sweet dried fruit from date palm, naturally high in sugar', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
