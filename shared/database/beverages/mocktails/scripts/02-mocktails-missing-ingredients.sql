-- ============================================
-- MOCKTAILS - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- Total: 32 new ingredients
-- ============================================

-- Insert missing ingredients for mocktails (JSONB format)
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES

-- Syrups & Sweeteners
('ING_GRENADINE', 'grenadine', 'Grenadine', 'Sweet pomegranate-flavored syrup with red color', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_SIMPLE_SYRUP', 'simple-syrup', 'Simple Syrup', 'Basic sugar and water syrup for sweetening drinks', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_AGAVE_SYRUP', 'agave-syrup', 'Agave Syrup', 'Natural sweetener from agave plant', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_LAVENDER_SYRUP', 'lavender-syrup', 'Lavender Syrup', 'Floral syrup infused with culinary lavender', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Sodas & Mixers
('ING_SODA_WATER', 'soda-water', 'Soda Water', 'Carbonated water for mixing', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_SPARKLING_WATER', 'sparkling-water', 'Sparkling Water', 'Naturally carbonated mineral water', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_GINGER_ALE', 'ginger-ale', 'Ginger Ale', 'Carbonated ginger-flavored soft drink', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_GINGER_BEER', 'ginger-beer', 'Ginger Beer', 'Spicy fermented ginger beverage', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_COLA', 'cola', 'Cola', 'Classic carbonated cola beverage', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_LEMONADE', 'lemonade', 'Lemonade', 'Classic lemon and sugar drink', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Juices & Purees
('ING_CRANBERRY_JUICE', 'cranberry-juice', 'Cranberry Juice', 'Tart juice from cranberries', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_TOMATO_JUICE', 'tomato-juice', 'Tomato Juice', 'Savory juice from ripe tomatoes', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_APPLE_JUICE', 'apple-juice', 'Apple Juice', 'Sweet juice from pressed apples', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_APPLE_CIDER', 'apple-cider', 'Apple Cider', 'Unfiltered apple juice with spices', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_WATERMELON_JUICE', 'watermelon-juice', 'Watermelon Juice', 'Fresh juice from ripe watermelon', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_PEACH_NECTAR', 'peach-nectar', 'Peach Nectar', 'Sweet thick peach juice', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_PEACH_PUREE', 'peach-puree', 'Peach Puree', 'Smooth pureed peach for cocktails', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_MANGO_PUREE', 'mango-puree', 'Mango Puree', 'Smooth pureed mango for cocktails', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_STRAWBERRY_PUREE', 'strawberry-puree', 'Strawberry Puree', 'Smooth pureed strawberries', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_PASSION_FRUIT_PUREE', 'passion-fruit-puree', 'Passion Fruit Puree', 'Exotic passion fruit puree', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_MIXED_BERRIES', 'mixed-berries', 'Mixed Berries', 'Blend of strawberries, blueberries, raspberries', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Garnishes & Extras
('ING_MARASCHINO_CHERRY', 'maraschino-cherry', 'Maraschino Cherry', 'Preserved cherry for cocktail garnish', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_ICE', 'ice', 'Ice', 'Frozen water cubes for drinks', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Herbs & Aromatics
('ING_ROSEMARY', 'rosemary', 'Rosemary', 'Aromatic herb with pine-like fragrance', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_LEMONGRASS', 'lemongrass', 'Lemongrass', 'Citrusy tropical herb', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Tea & Infusions
('ING_HIBISCUS_TEA', 'hibiscus-tea', 'Hibiscus Tea', 'Tart red tea from hibiscus flowers', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_MATCHA_POWDER', 'matcha-powder', 'Matcha Powder', 'Finely ground green tea powder', 'herbs',
 '[]'::jsonb, '["caffeine"]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Dairy & Alternatives
('ING_VANILLA_ICE_CREAM', 'vanilla-ice-cream', 'Vanilla Ice Cream', 'Classic vanilla flavored ice cream', 'dairy',
 '["dairy"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

('ING_WHIPPED_CREAM', 'whipped-cream', 'Whipped Cream', 'Aerated sweetened cream', 'dairy',
 '["dairy"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

('ING_YOGURT', 'yogurt', 'Yogurt', 'Cultured dairy product', 'dairy',
 '["dairy"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- Spices & Sauces
('ING_HOT_SAUCE', 'hot-sauce', 'Hot Sauce', 'Spicy pepper-based sauce', 'condiments',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_BLUE_SPIRULINA', 'blue-spirulina', 'Blue Spirulina', 'Natural blue coloring from algae', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Chocolate & Dessert
('ING_CHOCOLATE_SYRUP', 'chocolate-syrup', 'Chocolate Syrup', 'Sweet chocolate flavored syrup for drinks and desserts', 'sweeteners',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
