-- ============================================
-- SMOOTHIES - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Insert missing ingredients for smoothies
-- Using ON CONFLICT DO NOTHING to handle existing ones

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- FRUITS
('ING_RASPBERRY', 'raspberry', 'Raspberry', 'Small, sweet-tart red berry rich in fiber and antioxidants', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_BLACKBERRY', 'blackberry', 'Blackberry', 'Dark purple berry with sweet-tart flavor and high antioxidants', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_PEACH', 'peach', 'Peach', 'Sweet stone fruit with fuzzy skin and juicy flesh', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_WATERMELON', 'watermelon', 'Watermelon', 'Large hydrating fruit with sweet red flesh', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_GUAVA', 'guava', 'Guava', 'Tropical fruit with sweet-tart flavor and pink flesh', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_PITAYA', 'pitaya', 'Pitaya (Dragon Fruit)', 'Vibrant pink tropical fruit with mild sweet flavor and black seeds', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_GOJI_BERRY', 'goji-berry', 'Goji Berry', 'Small red superfood berry high in antioxidants and vitamins', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_LINGONBERRY', 'lingonberry', 'Lingonberry', 'Tart Nordic berry similar to cranberry', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_KIWI', 'kiwi', 'Kiwi', 'Small green fruit with tangy flavor and fuzzy brown skin', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_GRAPEFRUIT', 'grapefruit', 'Grapefruit', 'Large citrus fruit with tart, slightly bitter flavor', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SUPERFOODS & SUPPLEMENTS
('ING_CHIA_SEED', 'chia-seed', 'Chia Seed', 'Tiny superfood seeds high in omega-3 and fiber', 'grains', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_SPIRULINA', 'spirulina', 'Spirulina', 'Blue-green algae superfood rich in protein and vitamins', 'other', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_WHEATGRASS', 'wheatgrass', 'Wheatgrass', 'Young wheat plant used for its nutritional juice', 'vegetables', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MACA', 'maca', 'Maca Root Powder', 'Peruvian root powder known for energy and hormone balance', 'powders', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CACAO', 'cacao', 'Raw Cacao', 'Unprocessed chocolate powder rich in antioxidants', 'powders', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_BEE_POLLEN', 'bee-pollen', 'Bee Pollen', 'Nutrient-rich pollen collected by bees, high in protein', 'other', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_HEMP_SEED', 'hemp-seed', 'Hemp Seed', 'Nutritious seeds high in protein and omega-3 fatty acids', 'nuts', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_ACAI_PUREE', 'acai-puree', 'Açaí Puree', 'Frozen açaí berry puree for smoothie bowls', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- DAIRY & ALTERNATIVES
('ING_OAT_MILK', 'oat-milk', 'Oat Milk', 'Creamy plant-based milk made from oats', 'beverages', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_COTTAGE_CHEESE', 'cottage-cheese', 'Cottage Cheese', 'Fresh soft cheese with high protein content', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_WHEY_PROTEIN', 'whey-protein', 'Whey Protein Powder', 'Dairy-based protein powder for muscle recovery', 'powders', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- FLAVORINGS
('ING_ROSE_WATER', 'rose-water', 'Rose Water', 'Fragrant distilled rose petal water for floral flavor', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_VANILLA', 'vanilla', 'Vanilla', 'Sweet aromatic flavoring from vanilla bean pods', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- OTHER
('ING_ROLLED_OAT', 'rolled-oat', 'Rolled Oats', 'Flattened whole oats for fiber and slow energy', 'grains', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_COLD_BREW_COFFEE', 'cold-brew-coffee', 'Cold Brew Coffee', 'Slowly steeped cold coffee concentrate', 'beverages', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
