-- ============================================
-- BAKERY - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

-- Insert missing ingredients for bakery
-- Using ON CONFLICT DO NOTHING to handle existing ones

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary) VALUES

-- FLOURS & BASES
('ING_BREAD_FLOUR', 'bread-flour', 'Bread Flour', 'High-protein wheat flour for bread making', 'grains', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_PASTRY_FLOUR', 'pastry-flour', 'Pastry Flour', 'Low-protein flour for tender pastries', 'grains', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_ALMOND_FLOUR', 'almond-flour', 'Almond Flour', 'Finely ground blanched almonds for gluten-free baking', 'nuts', '[{"type": "tree_nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_SOURDOUGH_STARTER', 'sourdough-starter', 'Sourdough Starter', 'Natural fermented flour and water for sourdough bread', 'grains', '[{"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- FATS & DAIRY
('ING_CROISSANT_BUTTER', 'croissant-butter', 'European-Style Butter', 'High-fat butter for laminated pastries', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_CREAM_CHEESE', 'cream-cheese', 'Cream Cheese', 'Soft fresh cheese for frostings and fillings', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_BUTTERMILK', 'buttermilk', 'Buttermilk', 'Fermented dairy for tender baked goods', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- LEAVENING & BINDERS
('ING_ACTIVE_YEAST', 'active-yeast', 'Active Dry Yeast', 'Dried yeast for bread and pastry rising', 'other', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_BAKING_POWDER', 'baking-powder', 'Baking Powder', 'Chemical leavening agent for quick breads', 'other', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_BAKING_SODA', 'baking-soda', 'Baking Soda', 'Sodium bicarbonate for leavening', 'other', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CREAM_OF_TARTAR', 'cream-of-tartar', 'Cream of Tartar', 'Acidic powder for activating baking soda and stabilizing egg whites', 'other', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SWEETENERS & FLAVORS
('ING_POWDERED_SUGAR', 'powdered-sugar', 'Powdered Sugar', 'Finely ground sugar for frostings and dusting', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_BROWN_SUGAR', 'brown-sugar', 'Brown Sugar', 'Sugar with molasses for rich flavor', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_MAPLE_SYRUP', 'maple-syrup', 'Maple Syrup', 'Natural tree sap syrup for glazes', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_VANILLA_BEAN', 'vanilla-bean', 'Vanilla Bean', 'Whole vanilla pod for premium flavor', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- FILLINGS & CREAMS
('ING_PASTRY_CREAM', 'pastry-cream', 'Pastry Cream', 'Vanilla custard filling for pastries', 'dairy', '[{"type": "dairy"}, {"type": "eggs"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_FRANGIPANE', 'frangipane', 'Frangipane', 'Almond cream filling for tarts and pastries', 'nuts', '[{"type": "tree_nuts"}, {"type": "eggs"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_LEMON_CURD', 'lemon-curd', 'Lemon Curd', 'Sweet and tangy citrus spread', 'fruits', '[{"type": "eggs"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_JAM', 'jam', 'Fruit Jam', 'Sweet fruit preserve for filling', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_NUTELLA', 'nutella', 'Nutella', 'Chocolate hazelnut spread', 'sweeteners', '[{"type": "dairy"}, {"type": "tree_nuts"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),

-- TOPPINGS & GLAZES
('ING_ROYAL_ICING', 'royal-icing', 'Royal Icing', 'Hard-drying sugar icing for decoration', 'sweeteners', '[{"type": "eggs"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_FONDANT', 'fondant', 'Fondant', 'Smooth sugar paste for cake covering', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_PEARL_SUGAR', 'pearl-sugar', 'Pearl Sugar', 'Coarse sugar for Belgian waffles and pastries', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_SLICED_ALMONDS', 'sliced-almonds', 'Sliced Almonds', 'Thin almond slices for topping', 'nuts', '[{"type": "tree_nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- FRUITS & ADD-INS
('ING_DRIED_CRANBERRY', 'dried-cranberry', 'Dried Cranberries', 'Sweet-tart dried berries for baking', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_RAISIN', 'raisin', 'Raisins', 'Dried grapes for baked goods', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_CANDIED_FRUIT', 'candied-fruit', 'Candied Fruit', 'Sugar-preserved mixed fruits', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),
('ING_POPPY_SEED', 'poppy-seed', 'Poppy Seeds', 'Tiny seeds for flavor and texture', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- SAVORY
('ING_GRUYERE', 'gruyere', 'Gruyère Cheese', 'Swiss cheese for savory pastries', 'dairy', '[{"type": "dairy"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb),
('ING_PROSCIUTTO', 'prosciutto', 'Prosciutto', 'Italian dry-cured ham', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb),
('ING_SUN_DRIED_TOMATO', 'sun-dried-tomato', 'Sun-Dried Tomatoes', 'Concentrated dried tomatoes', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
