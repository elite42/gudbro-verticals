-- ============================================
-- HOT BEVERAGES - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Insert missing ingredients for hot beverages
-- Using ON CONFLICT DO NOTHING to handle existing ones

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- CHOCOLATE & COCOA
('ING_HOT_CHOCOLATE_MIX', 'hot-chocolate-mix', 'Hot Chocolate Mix', 'Sweetened cocoa powder blend for hot chocolate', 'powders', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_DARK_CHOCOLATE', 'dark-chocolate', 'Dark Chocolate', 'Rich dark chocolate for melting', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_WHITE_CHOCOLATE', 'white-chocolate', 'White Chocolate', 'Sweet creamy white chocolate', 'sweeteners', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- TEAS & SPICES
('ING_CHAI_SPICE', 'chai-spice', 'Chai Spice Blend', 'Traditional Indian spice blend with cinnamon, cardamom, ginger, cloves', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CARDAMOM', 'cardamom', 'Cardamom', 'Aromatic green pods with sweet spicy flavor', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_STAR_ANISE', 'star-anise', 'Star Anise', 'Star-shaped spice with licorice flavor', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SPECIALTY INGREDIENTS
('ING_MARSHMALLOW', 'marshmallow', 'Marshmallow', 'Soft fluffy sugar confection for topping', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_PEPPERMINT_EXTRACT', 'peppermint-extract', 'Peppermint Extract', 'Concentrated peppermint flavor', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_LAVENDER', 'lavender', 'Lavender', 'Fragrant purple flower for floral flavor', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_ASHWAGANDHA', 'ashwagandha', 'Ashwagandha', 'Ayurvedic adaptogenic herb for stress relief', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_REISHI', 'reishi', 'Reishi Mushroom', 'Medicinal mushroom for immunity', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- MILK ALTERNATIVES (some may exist)
('ING_STEAMED_MILK', 'steamed-milk', 'Steamed Milk', 'Hot frothy milk for lattes', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- SWEETENERS
('ING_BROWN_SUGAR_SYRUP', 'brown-sugar-syrup', 'Brown Sugar Syrup', 'Rich caramelized brown sugar syrup', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MOLASSES', 'molasses', 'Molasses', 'Dark viscous syrup from sugar refining with rich flavor', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CAYENNE', 'cayenne', 'Cayenne Pepper', 'Hot red chili pepper powder with intense heat', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
