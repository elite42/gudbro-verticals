-- ============================================
-- BREAKFAST - Product Ingredients Links
-- ============================================
-- Run this THIRD after 02-breakfast-complete-import.sql
-- Links breakfast items to ingredients via junction table
-- ============================================
-- Total: ~480 links for 65 breakfast items
-- ============================================

-- ============================================
-- EGGS CATEGORY (10 items)
-- ============================================

-- BRK_EGGS_BENEDICT (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_EGGS_BENEDICT', 'ING_EGG', 1, true),
('breakfast', 'BRK_EGGS_BENEDICT', 'ING_ENGLISH_MUFFIN', 2, false),
('breakfast', 'BRK_EGGS_BENEDICT', 'ING_CANADIAN_BACON', 3, true),
('breakfast', 'BRK_EGGS_BENEDICT', 'ING_BUTTER', 4, false),
('breakfast', 'BRK_EGGS_BENEDICT', 'ING_LEMON', 5, false),
('breakfast', 'BRK_EGGS_BENEDICT', 'ING_EGG_YOLK', 6, true),
('breakfast', 'BRK_EGGS_BENEDICT', 'ING_CHIVES', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_EGGS_FLORENTINE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_EGGS_FLORENTINE', 'ING_EGG', 1, true),
('breakfast', 'BRK_EGGS_FLORENTINE', 'ING_ENGLISH_MUFFIN', 2, false),
('breakfast', 'BRK_EGGS_FLORENTINE', 'ING_SPINACH', 3, true),
('breakfast', 'BRK_EGGS_FLORENTINE', 'ING_BUTTER', 4, false),
('breakfast', 'BRK_EGGS_FLORENTINE', 'ING_LEMON', 5, false),
('breakfast', 'BRK_EGGS_FLORENTINE', 'ING_EGG_YOLK', 6, true),
('breakfast', 'BRK_EGGS_FLORENTINE', 'ING_NUTMEG', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_EGGS_ROYALE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_EGGS_ROYALE', 'ING_EGG', 1, true),
('breakfast', 'BRK_EGGS_ROYALE', 'ING_ENGLISH_MUFFIN', 2, false),
('breakfast', 'BRK_EGGS_ROYALE', 'ING_SMOKED_SALMON', 3, true),
('breakfast', 'BRK_EGGS_ROYALE', 'ING_BUTTER', 4, false),
('breakfast', 'BRK_EGGS_ROYALE', 'ING_LEMON', 5, false),
('breakfast', 'BRK_EGGS_ROYALE', 'ING_EGG_YOLK', 6, true),
('breakfast', 'BRK_EGGS_ROYALE', 'ING_DILL', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_OMELETTE_WESTERN (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_OMELETTE_WESTERN', 'ING_EGG', 1, true),
('breakfast', 'BRK_OMELETTE_WESTERN', 'ING_HAM', 2, true),
('breakfast', 'BRK_OMELETTE_WESTERN', 'ING_BELL_PEPPER', 3, true),
('breakfast', 'BRK_OMELETTE_WESTERN', 'ING_ONION', 4, false),
('breakfast', 'BRK_OMELETTE_WESTERN', 'ING_CHEDDAR', 5, false),
('breakfast', 'BRK_OMELETTE_WESTERN', 'ING_BUTTER', 6, false),
('breakfast', 'BRK_OMELETTE_WESTERN', 'ING_BLACK_PEPPER', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_OMELETTE_FRENCH (5 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_OMELETTE_FRENCH', 'ING_EGG', 1, true),
('breakfast', 'BRK_OMELETTE_FRENCH', 'ING_BUTTER', 2, true),
('breakfast', 'BRK_OMELETTE_FRENCH', 'ING_CHIVES', 3, false),
('breakfast', 'BRK_OMELETTE_FRENCH', 'ING_SALT', 4, false),
('breakfast', 'BRK_OMELETTE_FRENCH', 'ING_WHITE_PEPPER', 5, false)
ON CONFLICT DO NOTHING;

-- BRK_SCRAMBLED_EGGS (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_SCRAMBLED_EGGS', 'ING_EGG', 1, true),
('breakfast', 'BRK_SCRAMBLED_EGGS', 'ING_BUTTER', 2, true),
('breakfast', 'BRK_SCRAMBLED_EGGS', 'ING_CREAM', 3, false),
('breakfast', 'BRK_SCRAMBLED_EGGS', 'ING_CHIVES', 4, false),
('breakfast', 'BRK_SCRAMBLED_EGGS', 'ING_SALT', 5, false),
('breakfast', 'BRK_SCRAMBLED_EGGS', 'ING_BLACK_PEPPER', 6, false)
ON CONFLICT DO NOTHING;

-- BRK_SHAKSHUKA (10 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_SHAKSHUKA', 'ING_EGG', 1, true),
('breakfast', 'BRK_SHAKSHUKA', 'ING_TOMATO', 2, true),
('breakfast', 'BRK_SHAKSHUKA', 'ING_BELL_PEPPER', 3, true),
('breakfast', 'BRK_SHAKSHUKA', 'ING_ONION', 4, false),
('breakfast', 'BRK_SHAKSHUKA', 'ING_GARLIC', 5, false),
('breakfast', 'BRK_SHAKSHUKA', 'ING_CUMIN', 6, true),
('breakfast', 'BRK_SHAKSHUKA', 'ING_PAPRIKA', 7, false),
('breakfast', 'BRK_SHAKSHUKA', 'ING_CHILI_FLAKES', 8, false),
('breakfast', 'BRK_SHAKSHUKA', 'ING_OLIVE_OIL', 9, false),
('breakfast', 'BRK_SHAKSHUKA', 'ING_FETA', 10, false)
ON CONFLICT DO NOTHING;

-- BRK_HUEVOS_RANCHEROS (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_HUEVOS_RANCHEROS', 'ING_EGG', 1, true),
('breakfast', 'BRK_HUEVOS_RANCHEROS', 'ING_CORN_TORTILLA', 2, true),
('breakfast', 'BRK_HUEVOS_RANCHEROS', 'ING_SALSA_ROJA', 3, true),
('breakfast', 'BRK_HUEVOS_RANCHEROS', 'ING_REFRIED_BEANS', 4, true),
('breakfast', 'BRK_HUEVOS_RANCHEROS', 'ING_AVOCADO', 5, false),
('breakfast', 'BRK_HUEVOS_RANCHEROS', 'ING_QUESO_FRESCO', 6, false),
('breakfast', 'BRK_HUEVOS_RANCHEROS', 'ING_CILANTRO', 7, false),
('breakfast', 'BRK_HUEVOS_RANCHEROS', 'ING_LIME', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_TAMAGOYAKI (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_TAMAGOYAKI', 'ING_EGG', 1, true),
('breakfast', 'BRK_TAMAGOYAKI', 'ING_DASHI', 2, true),
('breakfast', 'BRK_TAMAGOYAKI', 'ING_SOY_SAUCE', 3, false),
('breakfast', 'BRK_TAMAGOYAKI', 'ING_MIRIN', 4, true),
('breakfast', 'BRK_TAMAGOYAKI', 'ING_SUGAR', 5, false),
('breakfast', 'BRK_TAMAGOYAKI', 'ING_VEGETABLE_OIL', 6, false)
ON CONFLICT DO NOTHING;

-- BRK_EGGS_EN_COCOTTE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_EGGS_EN_COCOTTE', 'ING_EGG', 1, true),
('breakfast', 'BRK_EGGS_EN_COCOTTE', 'ING_CREAM', 2, true),
('breakfast', 'BRK_EGGS_EN_COCOTTE', 'ING_BUTTER', 3, false),
('breakfast', 'BRK_EGGS_EN_COCOTTE', 'ING_CHIVES', 4, false),
('breakfast', 'BRK_EGGS_EN_COCOTTE', 'ING_GRUYERE', 5, false),
('breakfast', 'BRK_EGGS_EN_COCOTTE', 'ING_BLACK_PEPPER', 6, false),
('breakfast', 'BRK_EGGS_EN_COCOTTE', 'ING_NUTMEG', 7, false)
ON CONFLICT DO NOTHING;

-- ============================================
-- PANCAKES & WAFFLES CATEGORY (10 items)
-- ============================================

-- BRK_AMERICAN_PANCAKES (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_AMERICAN_PANCAKES', 'ING_FLOUR', 1, true),
('breakfast', 'BRK_AMERICAN_PANCAKES', 'ING_BUTTERMILK', 2, true),
('breakfast', 'BRK_AMERICAN_PANCAKES', 'ING_EGG', 3, false),
('breakfast', 'BRK_AMERICAN_PANCAKES', 'ING_BUTTER', 4, false),
('breakfast', 'BRK_AMERICAN_PANCAKES', 'ING_BAKING_POWDER', 5, false),
('breakfast', 'BRK_AMERICAN_PANCAKES', 'ING_SUGAR', 6, false),
('breakfast', 'BRK_AMERICAN_PANCAKES', 'ING_MAPLE_SYRUP', 7, true),
('breakfast', 'BRK_AMERICAN_PANCAKES', 'ING_SALT', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_BLUEBERRY_PANCAKES (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BLUEBERRY_PANCAKES', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_BLUEBERRY_PANCAKES', 'ING_BUTTERMILK', 2, false),
('breakfast', 'BRK_BLUEBERRY_PANCAKES', 'ING_EGG', 3, false),
('breakfast', 'BRK_BLUEBERRY_PANCAKES', 'ING_BUTTER', 4, false),
('breakfast', 'BRK_BLUEBERRY_PANCAKES', 'ING_BLUEBERRIES', 5, true),
('breakfast', 'BRK_BLUEBERRY_PANCAKES', 'ING_MAPLE_SYRUP', 6, false),
('breakfast', 'BRK_BLUEBERRY_PANCAKES', 'ING_WHIPPED_CREAM', 7, false),
('breakfast', 'BRK_BLUEBERRY_PANCAKES', 'ING_SUGAR', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_BELGIAN_WAFFLES (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BELGIAN_WAFFLES', 'ING_FLOUR', 1, true),
('breakfast', 'BRK_BELGIAN_WAFFLES', 'ING_MILK', 2, false),
('breakfast', 'BRK_BELGIAN_WAFFLES', 'ING_EGG', 3, false),
('breakfast', 'BRK_BELGIAN_WAFFLES', 'ING_BUTTER', 4, false),
('breakfast', 'BRK_BELGIAN_WAFFLES', 'ING_YEAST', 5, true),
('breakfast', 'BRK_BELGIAN_WAFFLES', 'ING_SUGAR', 6, false),
('breakfast', 'BRK_BELGIAN_WAFFLES', 'ING_STRAWBERRIES', 7, false),
('breakfast', 'BRK_BELGIAN_WAFFLES', 'ING_WHIPPED_CREAM', 8, false),
('breakfast', 'BRK_BELGIAN_WAFFLES', 'ING_POWDERED_SUGAR', 9, false)
ON CONFLICT DO NOTHING;

-- BRK_FRENCH_TOAST (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_FRENCH_TOAST', 'ING_BRIOCHE', 1, true),
('breakfast', 'BRK_FRENCH_TOAST', 'ING_EGG', 2, true),
('breakfast', 'BRK_FRENCH_TOAST', 'ING_MILK', 3, false),
('breakfast', 'BRK_FRENCH_TOAST', 'ING_VANILLA', 4, true),
('breakfast', 'BRK_FRENCH_TOAST', 'ING_CINNAMON', 5, true),
('breakfast', 'BRK_FRENCH_TOAST', 'ING_BUTTER', 6, false),
('breakfast', 'BRK_FRENCH_TOAST', 'ING_MAPLE_SYRUP', 7, false),
('breakfast', 'BRK_FRENCH_TOAST', 'ING_POWDERED_SUGAR', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_CREPES_SUZETTE (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CREPES_SUZETTE', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_CREPES_SUZETTE', 'ING_EGG', 2, false),
('breakfast', 'BRK_CREPES_SUZETTE', 'ING_MILK', 3, false),
('breakfast', 'BRK_CREPES_SUZETTE', 'ING_BUTTER', 4, true),
('breakfast', 'BRK_CREPES_SUZETTE', 'ING_ORANGE', 5, true),
('breakfast', 'BRK_CREPES_SUZETTE', 'ING_ORANGE_LIQUEUR', 6, true),
('breakfast', 'BRK_CREPES_SUZETTE', 'ING_SUGAR', 7, false),
('breakfast', 'BRK_CREPES_SUZETTE', 'ING_ORANGE_ZEST', 8, true)
ON CONFLICT DO NOTHING;

-- BRK_CREPES_NUTELLA (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CREPES_NUTELLA', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_CREPES_NUTELLA', 'ING_EGG', 2, false),
('breakfast', 'BRK_CREPES_NUTELLA', 'ING_MILK', 3, false),
('breakfast', 'BRK_CREPES_NUTELLA', 'ING_BUTTER', 4, false),
('breakfast', 'BRK_CREPES_NUTELLA', 'ING_NUTELLA', 5, true),
('breakfast', 'BRK_CREPES_NUTELLA', 'ING_BANANA', 6, true),
('breakfast', 'BRK_CREPES_NUTELLA', 'ING_WHIPPED_CREAM', 7, false),
('breakfast', 'BRK_CREPES_NUTELLA', 'ING_POWDERED_SUGAR', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_DUTCH_BABY (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_DUTCH_BABY', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_DUTCH_BABY', 'ING_EGG', 2, true),
('breakfast', 'BRK_DUTCH_BABY', 'ING_MILK', 3, false),
('breakfast', 'BRK_DUTCH_BABY', 'ING_BUTTER', 4, true),
('breakfast', 'BRK_DUTCH_BABY', 'ING_VANILLA', 5, false),
('breakfast', 'BRK_DUTCH_BABY', 'ING_LEMON', 6, true),
('breakfast', 'BRK_DUTCH_BABY', 'ING_POWDERED_SUGAR', 7, false),
('breakfast', 'BRK_DUTCH_BABY', 'ING_MIXED_BERRIES', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_JAPANESE_SOUFFLE_PANCAKES (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_JAPANESE_SOUFFLE_PANCAKES', 'ING_EGG', 1, true),
('breakfast', 'BRK_JAPANESE_SOUFFLE_PANCAKES', 'ING_FLOUR', 2, false),
('breakfast', 'BRK_JAPANESE_SOUFFLE_PANCAKES', 'ING_MILK', 3, false),
('breakfast', 'BRK_JAPANESE_SOUFFLE_PANCAKES', 'ING_SUGAR', 4, false),
('breakfast', 'BRK_JAPANESE_SOUFFLE_PANCAKES', 'ING_BAKING_POWDER', 5, false),
('breakfast', 'BRK_JAPANESE_SOUFFLE_PANCAKES', 'ING_VANILLA', 6, false),
('breakfast', 'BRK_JAPANESE_SOUFFLE_PANCAKES', 'ING_BUTTER', 7, false),
('breakfast', 'BRK_JAPANESE_SOUFFLE_PANCAKES', 'ING_WHIPPED_CREAM', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_BANANA_PANCAKES (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BANANA_PANCAKES', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_BANANA_PANCAKES', 'ING_BANANA', 2, true),
('breakfast', 'BRK_BANANA_PANCAKES', 'ING_EGG', 3, false),
('breakfast', 'BRK_BANANA_PANCAKES', 'ING_BUTTERMILK', 4, false),
('breakfast', 'BRK_BANANA_PANCAKES', 'ING_BUTTER', 5, false),
('breakfast', 'BRK_BANANA_PANCAKES', 'ING_WALNUTS', 6, true),
('breakfast', 'BRK_BANANA_PANCAKES', 'ING_HONEY', 7, false),
('breakfast', 'BRK_BANANA_PANCAKES', 'ING_CINNAMON', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_CHICKEN_WAFFLES (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CHICKEN_WAFFLES', 'ING_CHICKEN_BREAST', 1, true),
('breakfast', 'BRK_CHICKEN_WAFFLES', 'ING_FLOUR', 2, false),
('breakfast', 'BRK_CHICKEN_WAFFLES', 'ING_BUTTERMILK', 3, false),
('breakfast', 'BRK_CHICKEN_WAFFLES', 'ING_EGG', 4, false),
('breakfast', 'BRK_CHICKEN_WAFFLES', 'ING_BUTTER', 5, false),
('breakfast', 'BRK_CHICKEN_WAFFLES', 'ING_MAPLE_SYRUP', 6, true),
('breakfast', 'BRK_CHICKEN_WAFFLES', 'ING_HOT_SAUCE', 7, true),
('breakfast', 'BRK_CHICKEN_WAFFLES', 'ING_PAPRIKA', 8, false)
ON CONFLICT DO NOTHING;

-- ============================================
-- PASTRIES CATEGORY (10 items)
-- ============================================

-- BRK_CROISSANT (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CROISSANT', 'ING_FLOUR', 1, true),
('breakfast', 'BRK_CROISSANT', 'ING_BUTTER', 2, true),
('breakfast', 'BRK_CROISSANT', 'ING_MILK', 3, false),
('breakfast', 'BRK_CROISSANT', 'ING_YEAST', 4, false),
('breakfast', 'BRK_CROISSANT', 'ING_SUGAR', 5, false),
('breakfast', 'BRK_CROISSANT', 'ING_SALT', 6, false),
('breakfast', 'BRK_CROISSANT', 'ING_EGG', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_PAIN_AU_CHOCOLAT (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_PAIN_AU_CHOCOLAT', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_PAIN_AU_CHOCOLAT', 'ING_BUTTER', 2, true),
('breakfast', 'BRK_PAIN_AU_CHOCOLAT', 'ING_MILK', 3, false),
('breakfast', 'BRK_PAIN_AU_CHOCOLAT', 'ING_YEAST', 4, false),
('breakfast', 'BRK_PAIN_AU_CHOCOLAT', 'ING_SUGAR', 5, false),
('breakfast', 'BRK_PAIN_AU_CHOCOLAT', 'ING_DARK_CHOCOLATE', 6, true),
('breakfast', 'BRK_PAIN_AU_CHOCOLAT', 'ING_EGG', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_ALMOND_CROISSANT (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_ALMOND_CROISSANT', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_ALMOND_CROISSANT', 'ING_BUTTER', 2, false),
('breakfast', 'BRK_ALMOND_CROISSANT', 'ING_ALMONDS', 3, true),
('breakfast', 'BRK_ALMOND_CROISSANT', 'ING_ALMOND_FLOUR', 4, true),
('breakfast', 'BRK_ALMOND_CROISSANT', 'ING_SUGAR', 5, false),
('breakfast', 'BRK_ALMOND_CROISSANT', 'ING_EGG', 6, false),
('breakfast', 'BRK_ALMOND_CROISSANT', 'ING_POWDERED_SUGAR', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_DANISH_PASTRY (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_DANISH_PASTRY', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_DANISH_PASTRY', 'ING_BUTTER', 2, true),
('breakfast', 'BRK_DANISH_PASTRY', 'ING_SUGAR', 3, false),
('breakfast', 'BRK_DANISH_PASTRY', 'ING_EGG', 4, false),
('breakfast', 'BRK_DANISH_PASTRY', 'ING_YEAST', 5, false),
('breakfast', 'BRK_DANISH_PASTRY', 'ING_VANILLA_CUSTARD', 6, true),
('breakfast', 'BRK_DANISH_PASTRY', 'ING_POWDERED_SUGAR', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_CINNAMON_ROLL (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CINNAMON_ROLL', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_CINNAMON_ROLL', 'ING_BUTTER', 2, false),
('breakfast', 'BRK_CINNAMON_ROLL', 'ING_SUGAR', 3, false),
('breakfast', 'BRK_CINNAMON_ROLL', 'ING_CINNAMON', 4, true),
('breakfast', 'BRK_CINNAMON_ROLL', 'ING_YEAST', 5, false),
('breakfast', 'BRK_CINNAMON_ROLL', 'ING_CREAM_CHEESE', 6, true),
('breakfast', 'BRK_CINNAMON_ROLL', 'ING_MILK', 7, false),
('breakfast', 'BRK_CINNAMON_ROLL', 'ING_EGG', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_BLUEBERRY_MUFFIN (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BLUEBERRY_MUFFIN', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_BLUEBERRY_MUFFIN', 'ING_BUTTER', 2, false),
('breakfast', 'BRK_BLUEBERRY_MUFFIN', 'ING_SUGAR', 3, false),
('breakfast', 'BRK_BLUEBERRY_MUFFIN', 'ING_EGG', 4, false),
('breakfast', 'BRK_BLUEBERRY_MUFFIN', 'ING_BLUEBERRIES', 5, true),
('breakfast', 'BRK_BLUEBERRY_MUFFIN', 'ING_BUTTERMILK', 6, false),
('breakfast', 'BRK_BLUEBERRY_MUFFIN', 'ING_BAKING_POWDER', 7, false),
('breakfast', 'BRK_BLUEBERRY_MUFFIN', 'ING_VANILLA', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_ENGLISH_SCONE (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_ENGLISH_SCONE', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_ENGLISH_SCONE', 'ING_BUTTER', 2, false),
('breakfast', 'BRK_ENGLISH_SCONE', 'ING_SUGAR', 3, false),
('breakfast', 'BRK_ENGLISH_SCONE', 'ING_BAKING_POWDER', 4, false),
('breakfast', 'BRK_ENGLISH_SCONE', 'ING_MILK', 5, false),
('breakfast', 'BRK_ENGLISH_SCONE', 'ING_EGG', 6, false),
('breakfast', 'BRK_ENGLISH_SCONE', 'ING_CLOTTED_CREAM', 7, true),
('breakfast', 'BRK_ENGLISH_SCONE', 'ING_STRAWBERRY_JAM', 8, true)
ON CONFLICT DO NOTHING;

-- BRK_BRIOCHE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BRIOCHE', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_BRIOCHE', 'ING_BUTTER', 2, true),
('breakfast', 'BRK_BRIOCHE', 'ING_EGG', 3, true),
('breakfast', 'BRK_BRIOCHE', 'ING_SUGAR', 4, false),
('breakfast', 'BRK_BRIOCHE', 'ING_YEAST', 5, false),
('breakfast', 'BRK_BRIOCHE', 'ING_MILK', 6, false),
('breakfast', 'BRK_BRIOCHE', 'ING_SALT', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_SFOGLIATELLA (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_SFOGLIATELLA', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_SFOGLIATELLA', 'ING_LARD', 2, true),
('breakfast', 'BRK_SFOGLIATELLA', 'ING_RICOTTA', 3, true),
('breakfast', 'BRK_SFOGLIATELLA', 'ING_SEMOLINA', 4, true),
('breakfast', 'BRK_SFOGLIATELLA', 'ING_SUGAR', 5, false),
('breakfast', 'BRK_SFOGLIATELLA', 'ING_CANDIED_CITRUS', 6, true),
('breakfast', 'BRK_SFOGLIATELLA', 'ING_CINNAMON', 7, false),
('breakfast', 'BRK_SFOGLIATELLA', 'ING_VANILLA', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_CHURROS (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CHURROS', 'ING_FLOUR', 1, false),
('breakfast', 'BRK_CHURROS', 'ING_VEGETABLE_OIL', 2, false),
('breakfast', 'BRK_CHURROS', 'ING_SUGAR', 3, false),
('breakfast', 'BRK_CHURROS', 'ING_CINNAMON', 4, true),
('breakfast', 'BRK_CHURROS', 'ING_DARK_CHOCOLATE', 5, true),
('breakfast', 'BRK_CHURROS', 'ING_MILK', 6, false),
('breakfast', 'BRK_CHURROS', 'ING_SALT', 7, false)
ON CONFLICT DO NOTHING;

-- ============================================
-- CEREALS & BOWLS CATEGORY (10 items)
-- ============================================

-- BRK_ACAI_BOWL (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_ACAI_BOWL', 'ING_ACAI', 1, true),
('breakfast', 'BRK_ACAI_BOWL', 'ING_BANANA', 2, false),
('breakfast', 'BRK_ACAI_BOWL', 'ING_GRANOLA', 3, false),
('breakfast', 'BRK_ACAI_BOWL', 'ING_BLUEBERRIES', 4, false),
('breakfast', 'BRK_ACAI_BOWL', 'ING_STRAWBERRIES', 5, false),
('breakfast', 'BRK_ACAI_BOWL', 'ING_COCONUT_FLAKES', 6, false),
('breakfast', 'BRK_ACAI_BOWL', 'ING_HONEY', 7, false),
('breakfast', 'BRK_ACAI_BOWL', 'ING_ALMOND_MILK', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_SMOOTHIE_BOWL (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_SMOOTHIE_BOWL', 'ING_SPINACH', 1, true),
('breakfast', 'BRK_SMOOTHIE_BOWL', 'ING_BANANA', 2, false),
('breakfast', 'BRK_SMOOTHIE_BOWL', 'ING_MANGO', 3, false),
('breakfast', 'BRK_SMOOTHIE_BOWL', 'ING_CHIA_SEEDS', 4, true),
('breakfast', 'BRK_SMOOTHIE_BOWL', 'ING_GRANOLA', 5, false),
('breakfast', 'BRK_SMOOTHIE_BOWL', 'ING_KIWI', 6, false),
('breakfast', 'BRK_SMOOTHIE_BOWL', 'ING_ALMOND_MILK', 7, false),
('breakfast', 'BRK_SMOOTHIE_BOWL', 'ING_HONEY', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_OVERNIGHT_OATS (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_OVERNIGHT_OATS', 'ING_ROLLED_OATS', 1, true),
('breakfast', 'BRK_OVERNIGHT_OATS', 'ING_MILK', 2, false),
('breakfast', 'BRK_OVERNIGHT_OATS', 'ING_CHIA_SEEDS', 3, true),
('breakfast', 'BRK_OVERNIGHT_OATS', 'ING_MAPLE_SYRUP', 4, false),
('breakfast', 'BRK_OVERNIGHT_OATS', 'ING_MIXED_BERRIES', 5, false),
('breakfast', 'BRK_OVERNIGHT_OATS', 'ING_ALMOND_BUTTER', 6, false),
('breakfast', 'BRK_OVERNIGHT_OATS', 'ING_VANILLA', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_STEEL_CUT_OATMEAL (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_STEEL_CUT_OATMEAL', 'ING_STEEL_CUT_OATS', 1, true),
('breakfast', 'BRK_STEEL_CUT_OATMEAL', 'ING_MILK', 2, false),
('breakfast', 'BRK_STEEL_CUT_OATMEAL', 'ING_BROWN_SUGAR', 3, false),
('breakfast', 'BRK_STEEL_CUT_OATMEAL', 'ING_CINNAMON', 4, true),
('breakfast', 'BRK_STEEL_CUT_OATMEAL', 'ING_WALNUTS', 5, false),
('breakfast', 'BRK_STEEL_CUT_OATMEAL', 'ING_APPLE', 6, false),
('breakfast', 'BRK_STEEL_CUT_OATMEAL', 'ING_BUTTER', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_PORRIDGE (5 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_PORRIDGE', 'ING_ROLLED_OATS', 1, true),
('breakfast', 'BRK_PORRIDGE', 'ING_CREAM', 2, false),
('breakfast', 'BRK_PORRIDGE', 'ING_HONEY', 3, false),
('breakfast', 'BRK_PORRIDGE', 'ING_MIXED_BERRIES', 4, false),
('breakfast', 'BRK_PORRIDGE', 'ING_SALT', 5, false)
ON CONFLICT DO NOTHING;

-- BRK_GRANOLA_PARFAIT (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_GRANOLA_PARFAIT', 'ING_GREEK_YOGURT', 1, true),
('breakfast', 'BRK_GRANOLA_PARFAIT', 'ING_GRANOLA', 2, true),
('breakfast', 'BRK_GRANOLA_PARFAIT', 'ING_BLUEBERRIES', 3, false),
('breakfast', 'BRK_GRANOLA_PARFAIT', 'ING_STRAWBERRIES', 4, false),
('breakfast', 'BRK_GRANOLA_PARFAIT', 'ING_HONEY', 5, false),
('breakfast', 'BRK_GRANOLA_PARFAIT', 'ING_ALMONDS', 6, false)
ON CONFLICT DO NOTHING;

-- BRK_CHIA_PUDDING (6 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CHIA_PUDDING', 'ING_CHIA_SEEDS', 1, true),
('breakfast', 'BRK_CHIA_PUDDING', 'ING_COCONUT_MILK', 2, false),
('breakfast', 'BRK_CHIA_PUDDING', 'ING_MANGO', 3, false),
('breakfast', 'BRK_CHIA_PUDDING', 'ING_PASSION_FRUIT', 4, true),
('breakfast', 'BRK_CHIA_PUDDING', 'ING_COCONUT_FLAKES', 5, false),
('breakfast', 'BRK_CHIA_PUDDING', 'ING_MAPLE_SYRUP', 6, false)
ON CONFLICT DO NOTHING;

-- BRK_BIRCHER_MUESLI (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BIRCHER_MUESLI', 'ING_ROLLED_OATS', 1, true),
('breakfast', 'BRK_BIRCHER_MUESLI', 'ING_GREEK_YOGURT', 2, false),
('breakfast', 'BRK_BIRCHER_MUESLI', 'ING_APPLE', 3, true),
('breakfast', 'BRK_BIRCHER_MUESLI', 'ING_LEMON', 4, false),
('breakfast', 'BRK_BIRCHER_MUESLI', 'ING_HAZELNUTS', 5, true),
('breakfast', 'BRK_BIRCHER_MUESLI', 'ING_HONEY', 6, false),
('breakfast', 'BRK_BIRCHER_MUESLI', 'ING_MILK', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_CONGEE (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CONGEE', 'ING_RICE', 1, true),
('breakfast', 'BRK_CONGEE', 'ING_CHICKEN_BROTH', 2, true),
('breakfast', 'BRK_CONGEE', 'ING_CENTURY_EGG', 3, true),
('breakfast', 'BRK_CONGEE', 'ING_GINGER', 4, true),
('breakfast', 'BRK_CONGEE', 'ING_SCALLION', 5, false),
('breakfast', 'BRK_CONGEE', 'ING_CRISPY_SHALLOTS', 6, false),
('breakfast', 'BRK_CONGEE', 'ING_SOY_SAUCE', 7, false),
('breakfast', 'BRK_CONGEE', 'ING_SESAME_OIL', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_QUINOA_BOWL (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_QUINOA_BOWL', 'ING_QUINOA', 1, true),
('breakfast', 'BRK_QUINOA_BOWL', 'ING_ALMOND_MILK', 2, false),
('breakfast', 'BRK_QUINOA_BOWL', 'ING_CINNAMON', 3, false),
('breakfast', 'BRK_QUINOA_BOWL', 'ING_VANILLA', 4, false),
('breakfast', 'BRK_QUINOA_BOWL', 'ING_MIXED_BERRIES', 5, false),
('breakfast', 'BRK_QUINOA_BOWL', 'ING_ALMONDS', 6, false),
('breakfast', 'BRK_QUINOA_BOWL', 'ING_AGAVE', 7, false)
ON CONFLICT DO NOTHING;

-- ============================================
-- SAVORY CATEGORY (10 items)
-- ============================================

-- BRK_FULL_ENGLISH (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_FULL_ENGLISH', 'ING_BACON', 1, true),
('breakfast', 'BRK_FULL_ENGLISH', 'ING_PORK_SAUSAGE', 2, true),
('breakfast', 'BRK_FULL_ENGLISH', 'ING_EGG', 3, true),
('breakfast', 'BRK_FULL_ENGLISH', 'ING_BAKED_BEANS', 4, true),
('breakfast', 'BRK_FULL_ENGLISH', 'ING_TOMATO', 5, false),
('breakfast', 'BRK_FULL_ENGLISH', 'ING_MUSHROOMS', 6, false),
('breakfast', 'BRK_FULL_ENGLISH', 'ING_TOAST', 7, false),
('breakfast', 'BRK_FULL_ENGLISH', 'ING_BLACK_PUDDING', 8, true),
('breakfast', 'BRK_FULL_ENGLISH', 'ING_BUTTER', 9, false)
ON CONFLICT DO NOTHING;

-- BRK_FULL_IRISH (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_FULL_IRISH', 'ING_IRISH_BACON', 1, true),
('breakfast', 'BRK_FULL_IRISH', 'ING_PORK_SAUSAGE', 2, true),
('breakfast', 'BRK_FULL_IRISH', 'ING_EGG', 3, true),
('breakfast', 'BRK_FULL_IRISH', 'ING_WHITE_PUDDING', 4, true),
('breakfast', 'BRK_FULL_IRISH', 'ING_BLACK_PUDDING', 5, true),
('breakfast', 'BRK_FULL_IRISH', 'ING_BAKED_BEANS', 6, false),
('breakfast', 'BRK_FULL_IRISH', 'ING_TOMATO', 7, false),
('breakfast', 'BRK_FULL_IRISH', 'ING_SODA_BREAD', 8, true),
('breakfast', 'BRK_FULL_IRISH', 'ING_BUTTER', 9, false)
ON CONFLICT DO NOTHING;

-- BRK_BREAKFAST_BURRITO (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BREAKFAST_BURRITO', 'ING_FLOUR_TORTILLA', 1, true),
('breakfast', 'BRK_BREAKFAST_BURRITO', 'ING_EGG', 2, true),
('breakfast', 'BRK_BREAKFAST_BURRITO', 'ING_BACON', 3, true),
('breakfast', 'BRK_BREAKFAST_BURRITO', 'ING_HASH_BROWNS', 4, true),
('breakfast', 'BRK_BREAKFAST_BURRITO', 'ING_CHEDDAR', 5, false),
('breakfast', 'BRK_BREAKFAST_BURRITO', 'ING_SALSA', 6, false),
('breakfast', 'BRK_BREAKFAST_BURRITO', 'ING_SOUR_CREAM', 7, false),
('breakfast', 'BRK_BREAKFAST_BURRITO', 'ING_CHIVES', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_AVOCADO_TOAST (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_AVOCADO_TOAST', 'ING_SOURDOUGH', 1, true),
('breakfast', 'BRK_AVOCADO_TOAST', 'ING_AVOCADO', 2, true),
('breakfast', 'BRK_AVOCADO_TOAST', 'ING_EGG', 3, true),
('breakfast', 'BRK_AVOCADO_TOAST', 'ING_CHERRY_TOMATOES', 4, false),
('breakfast', 'BRK_AVOCADO_TOAST', 'ING_MICROGREENS', 5, false),
('breakfast', 'BRK_AVOCADO_TOAST', 'ING_EVERYTHING_SEASONING', 6, true),
('breakfast', 'BRK_AVOCADO_TOAST', 'ING_OLIVE_OIL', 7, false),
('breakfast', 'BRK_AVOCADO_TOAST', 'ING_CHILI_FLAKES', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_HASH_BROWNS (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_HASH_BROWNS', 'ING_POTATO', 1, true),
('breakfast', 'BRK_HASH_BROWNS', 'ING_BUTTER', 2, false),
('breakfast', 'BRK_HASH_BROWNS', 'ING_CHEDDAR', 3, false),
('breakfast', 'BRK_HASH_BROWNS', 'ING_SOUR_CREAM', 4, false),
('breakfast', 'BRK_HASH_BROWNS', 'ING_CHIVES', 5, false),
('breakfast', 'BRK_HASH_BROWNS', 'ING_EGG', 6, false),
('breakfast', 'BRK_HASH_BROWNS', 'ING_SALT', 7, false),
('breakfast', 'BRK_HASH_BROWNS', 'ING_BLACK_PEPPER', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_CROQUE_MADAME (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CROQUE_MADAME', 'ING_BRIOCHE', 1, true),
('breakfast', 'BRK_CROQUE_MADAME', 'ING_HAM', 2, true),
('breakfast', 'BRK_CROQUE_MADAME', 'ING_GRUYERE', 3, true),
('breakfast', 'BRK_CROQUE_MADAME', 'ING_BUTTER', 4, false),
('breakfast', 'BRK_CROQUE_MADAME', 'ING_FLOUR', 5, false),
('breakfast', 'BRK_CROQUE_MADAME', 'ING_MILK', 6, false),
('breakfast', 'BRK_CROQUE_MADAME', 'ING_EGG', 7, true),
('breakfast', 'BRK_CROQUE_MADAME', 'ING_NUTMEG', 8, false),
('breakfast', 'BRK_CROQUE_MADAME', 'ING_DIJON', 9, false)
ON CONFLICT DO NOTHING;

-- BRK_BACON_EGG_CHEESE (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BACON_EGG_CHEESE', 'ING_KAISER_ROLL', 1, true),
('breakfast', 'BRK_BACON_EGG_CHEESE', 'ING_BACON', 2, true),
('breakfast', 'BRK_BACON_EGG_CHEESE', 'ING_EGG', 3, true),
('breakfast', 'BRK_BACON_EGG_CHEESE', 'ING_AMERICAN_CHEESE', 4, true),
('breakfast', 'BRK_BACON_EGG_CHEESE', 'ING_BUTTER', 5, false),
('breakfast', 'BRK_BACON_EGG_CHEESE', 'ING_SALT', 6, false),
('breakfast', 'BRK_BACON_EGG_CHEESE', 'ING_BLACK_PEPPER', 7, false)
ON CONFLICT DO NOTHING;

-- BRK_BISCUITS_GRAVY (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BISCUITS_GRAVY', 'ING_FLOUR', 1, true),
('breakfast', 'BRK_BISCUITS_GRAVY', 'ING_BUTTERMILK', 2, true),
('breakfast', 'BRK_BISCUITS_GRAVY', 'ING_BUTTER', 3, false),
('breakfast', 'BRK_BISCUITS_GRAVY', 'ING_BAKING_POWDER', 4, false),
('breakfast', 'BRK_BISCUITS_GRAVY', 'ING_PORK_SAUSAGE', 5, true),
('breakfast', 'BRK_BISCUITS_GRAVY', 'ING_MILK', 6, false),
('breakfast', 'BRK_BISCUITS_GRAVY', 'ING_BLACK_PEPPER', 7, true),
('breakfast', 'BRK_BISCUITS_GRAVY', 'ING_SAGE', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_EGGS_SARDOU (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_EGGS_SARDOU', 'ING_EGG', 1, true),
('breakfast', 'BRK_EGGS_SARDOU', 'ING_ARTICHOKE', 2, true),
('breakfast', 'BRK_EGGS_SARDOU', 'ING_SPINACH', 3, true),
('breakfast', 'BRK_EGGS_SARDOU', 'ING_CREAM', 4, false),
('breakfast', 'BRK_EGGS_SARDOU', 'ING_BUTTER', 5, false),
('breakfast', 'BRK_EGGS_SARDOU', 'ING_EGG_YOLK', 6, false),
('breakfast', 'BRK_EGGS_SARDOU', 'ING_LEMON', 7, false),
('breakfast', 'BRK_EGGS_SARDOU', 'ING_CAYENNE', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_CORNED_BEEF_HASH (7 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CORNED_BEEF_HASH', 'ING_CORNED_BEEF', 1, true),
('breakfast', 'BRK_CORNED_BEEF_HASH', 'ING_POTATO', 2, true),
('breakfast', 'BRK_CORNED_BEEF_HASH', 'ING_ONION', 3, false),
('breakfast', 'BRK_CORNED_BEEF_HASH', 'ING_BUTTER', 4, false),
('breakfast', 'BRK_CORNED_BEEF_HASH', 'ING_EGG', 5, true),
('breakfast', 'BRK_CORNED_BEEF_HASH', 'ING_BLACK_PEPPER', 6, false),
('breakfast', 'BRK_CORNED_BEEF_HASH', 'ING_PARSLEY', 7, false)
ON CONFLICT DO NOTHING;

-- ============================================
-- INTERNATIONAL CATEGORY (15 items)
-- ============================================

-- BRK_JAPANESE_BREAKFAST (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_JAPANESE_BREAKFAST', 'ING_SALMON', 1, true),
('breakfast', 'BRK_JAPANESE_BREAKFAST', 'ING_RICE', 2, true),
('breakfast', 'BRK_JAPANESE_BREAKFAST', 'ING_MISO', 3, true),
('breakfast', 'BRK_JAPANESE_BREAKFAST', 'ING_TOFU', 4, false),
('breakfast', 'BRK_JAPANESE_BREAKFAST', 'ING_NATTO', 5, true),
('breakfast', 'BRK_JAPANESE_BREAKFAST', 'ING_NORI', 6, false),
('breakfast', 'BRK_JAPANESE_BREAKFAST', 'ING_PICKLED_VEGETABLES', 7, false),
('breakfast', 'BRK_JAPANESE_BREAKFAST', 'ING_EGG', 8, false),
('breakfast', 'BRK_JAPANESE_BREAKFAST', 'ING_SOY_SAUCE', 9, false)
ON CONFLICT DO NOTHING;

-- BRK_TURKISH_BREAKFAST (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_TURKISH_BREAKFAST', 'ING_FETA', 1, true),
('breakfast', 'BRK_TURKISH_BREAKFAST', 'ING_OLIVES', 2, true),
('breakfast', 'BRK_TURKISH_BREAKFAST', 'ING_TOMATO', 3, false),
('breakfast', 'BRK_TURKISH_BREAKFAST', 'ING_CUCUMBER', 4, false),
('breakfast', 'BRK_TURKISH_BREAKFAST', 'ING_HONEY', 5, true),
('breakfast', 'BRK_TURKISH_BREAKFAST', 'ING_KAYMAK', 6, true),
('breakfast', 'BRK_TURKISH_BREAKFAST', 'ING_EGG', 7, false),
('breakfast', 'BRK_TURKISH_BREAKFAST', 'ING_SIMIT', 8, true),
('breakfast', 'BRK_TURKISH_BREAKFAST', 'ING_BLACK_TEA', 9, false)
ON CONFLICT DO NOTHING;

-- BRK_ISRAELI_BREAKFAST (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_ISRAELI_BREAKFAST', 'ING_HUMMUS', 1, true),
('breakfast', 'BRK_ISRAELI_BREAKFAST', 'ING_LABNEH', 2, true),
('breakfast', 'BRK_ISRAELI_BREAKFAST', 'ING_TOMATO', 3, false),
('breakfast', 'BRK_ISRAELI_BREAKFAST', 'ING_CUCUMBER', 4, false),
('breakfast', 'BRK_ISRAELI_BREAKFAST', 'ING_OLIVES', 5, false),
('breakfast', 'BRK_ISRAELI_BREAKFAST', 'ING_EGG', 6, false),
('breakfast', 'BRK_ISRAELI_BREAKFAST', 'ING_PITA', 7, true),
('breakfast', 'BRK_ISRAELI_BREAKFAST', 'ING_OLIVE_OIL', 8, false),
('breakfast', 'BRK_ISRAELI_BREAKFAST', 'ING_ZAATAR', 9, true)
ON CONFLICT DO NOTHING;

-- BRK_INDIAN_BREAKFAST (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_INDIAN_BREAKFAST', 'ING_RICE_FLOUR', 1, true),
('breakfast', 'BRK_INDIAN_BREAKFAST', 'ING_URAD_DAL', 2, true),
('breakfast', 'BRK_INDIAN_BREAKFAST', 'ING_COCONUT', 3, true),
('breakfast', 'BRK_INDIAN_BREAKFAST', 'ING_MUSTARD_SEEDS', 4, false),
('breakfast', 'BRK_INDIAN_BREAKFAST', 'ING_CURRY_LEAVES', 5, false),
('breakfast', 'BRK_INDIAN_BREAKFAST', 'ING_SAMBAR', 6, true),
('breakfast', 'BRK_INDIAN_BREAKFAST', 'ING_GHEE', 7, false),
('breakfast', 'BRK_INDIAN_BREAKFAST', 'ING_GREEN_CHILI', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_MEXICAN_CHILAQUILES (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_MEXICAN_CHILAQUILES', 'ING_CORN_TORTILLA', 1, true),
('breakfast', 'BRK_MEXICAN_CHILAQUILES', 'ING_SALSA_VERDE', 2, true),
('breakfast', 'BRK_MEXICAN_CHILAQUILES', 'ING_CREMA', 3, false),
('breakfast', 'BRK_MEXICAN_CHILAQUILES', 'ING_QUESO_FRESCO', 4, false),
('breakfast', 'BRK_MEXICAN_CHILAQUILES', 'ING_EGG', 5, true),
('breakfast', 'BRK_MEXICAN_CHILAQUILES', 'ING_ONION', 6, false),
('breakfast', 'BRK_MEXICAN_CHILAQUILES', 'ING_CILANTRO', 7, false),
('breakfast', 'BRK_MEXICAN_CHILAQUILES', 'ING_AVOCADO', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_KOREAN_BREAKFAST (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_KOREAN_BREAKFAST', 'ING_RICE', 1, true),
('breakfast', 'BRK_KOREAN_BREAKFAST', 'ING_DOENJANG', 2, true),
('breakfast', 'BRK_KOREAN_BREAKFAST', 'ING_TOFU', 3, false),
('breakfast', 'BRK_KOREAN_BREAKFAST', 'ING_KIMCHI', 4, true),
('breakfast', 'BRK_KOREAN_BREAKFAST', 'ING_MACKEREL', 5, true),
('breakfast', 'BRK_KOREAN_BREAKFAST', 'ING_SESAME_OIL', 6, false),
('breakfast', 'BRK_KOREAN_BREAKFAST', 'ING_SCALLION', 7, false),
('breakfast', 'BRK_KOREAN_BREAKFAST', 'ING_EGG', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_CONTINENTAL (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_CONTINENTAL', 'ING_CROISSANT', 1, true),
('breakfast', 'BRK_CONTINENTAL', 'ING_BAGUETTE', 2, false),
('breakfast', 'BRK_CONTINENTAL', 'ING_BUTTER', 3, false),
('breakfast', 'BRK_CONTINENTAL', 'ING_JAM', 4, false),
('breakfast', 'BRK_CONTINENTAL', 'ING_HAM', 5, false),
('breakfast', 'BRK_CONTINENTAL', 'ING_CHEESE_ASSORTED', 6, false),
('breakfast', 'BRK_CONTINENTAL', 'ING_FRESH_FRUIT', 7, false),
('breakfast', 'BRK_CONTINENTAL', 'ING_ORANGE_JUICE', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_DIM_SUM (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_DIM_SUM', 'ING_SHRIMP', 1, true),
('breakfast', 'BRK_DIM_SUM', 'ING_PORK', 2, true),
('breakfast', 'BRK_DIM_SUM', 'ING_RICE_FLOUR', 3, false),
('breakfast', 'BRK_DIM_SUM', 'ING_WHEAT_FLOUR', 4, false),
('breakfast', 'BRK_DIM_SUM', 'ING_CHAR_SIU', 5, true),
('breakfast', 'BRK_DIM_SUM', 'ING_SOY_SAUCE', 6, false),
('breakfast', 'BRK_DIM_SUM', 'ING_GINGER', 7, false),
('breakfast', 'BRK_DIM_SUM', 'ING_JASMINE_TEA', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_MENEMEN (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_MENEMEN', 'ING_EGG', 1, true),
('breakfast', 'BRK_MENEMEN', 'ING_TOMATO', 2, true),
('breakfast', 'BRK_MENEMEN', 'ING_GREEN_PEPPER', 3, true),
('breakfast', 'BRK_MENEMEN', 'ING_ONION', 4, false),
('breakfast', 'BRK_MENEMEN', 'ING_BUTTER', 5, false),
('breakfast', 'BRK_MENEMEN', 'ING_PAPRIKA', 6, false),
('breakfast', 'BRK_MENEMEN', 'ING_CHILI_FLAKES', 7, false),
('breakfast', 'BRK_MENEMEN', 'ING_CRUSTY_BREAD', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_FUL_MEDAMES (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_FUL_MEDAMES', 'ING_FAVA_BEANS', 1, true),
('breakfast', 'BRK_FUL_MEDAMES', 'ING_OLIVE_OIL', 2, true),
('breakfast', 'BRK_FUL_MEDAMES', 'ING_GARLIC', 3, false),
('breakfast', 'BRK_FUL_MEDAMES', 'ING_LEMON', 4, true),
('breakfast', 'BRK_FUL_MEDAMES', 'ING_CUMIN', 5, true),
('breakfast', 'BRK_FUL_MEDAMES', 'ING_PARSLEY', 6, false),
('breakfast', 'BRK_FUL_MEDAMES', 'ING_PITA', 7, false),
('breakfast', 'BRK_FUL_MEDAMES', 'ING_EGG', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_AUSSIE_BREAKFAST (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_AUSSIE_BREAKFAST', 'ING_EGG', 1, true),
('breakfast', 'BRK_AUSSIE_BREAKFAST', 'ING_AVOCADO', 2, true),
('breakfast', 'BRK_AUSSIE_BREAKFAST', 'ING_BACON', 3, false),
('breakfast', 'BRK_AUSSIE_BREAKFAST', 'ING_HALLOUMI', 4, true),
('breakfast', 'BRK_AUSSIE_BREAKFAST', 'ING_TOMATO', 5, false),
('breakfast', 'BRK_AUSSIE_BREAKFAST', 'ING_SPINACH', 6, false),
('breakfast', 'BRK_AUSSIE_BREAKFAST', 'ING_SOURDOUGH', 7, false),
('breakfast', 'BRK_AUSSIE_BREAKFAST', 'ING_OLIVE_OIL', 8, false)
ON CONFLICT DO NOTHING;

-- BRK_SWEDISH_BREAKFAST (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_SWEDISH_BREAKFAST', 'ING_CRISPBREAD', 1, true),
('breakfast', 'BRK_SWEDISH_BREAKFAST', 'ING_BUTTER', 2, false),
('breakfast', 'BRK_SWEDISH_BREAKFAST', 'ING_CHEESE_ASSORTED', 3, false),
('breakfast', 'BRK_SWEDISH_BREAKFAST', 'ING_SMOKED_SALMON', 4, true),
('breakfast', 'BRK_SWEDISH_BREAKFAST', 'ING_EGG', 5, false),
('breakfast', 'BRK_SWEDISH_BREAKFAST', 'ING_MUESLI', 6, false),
('breakfast', 'BRK_SWEDISH_BREAKFAST', 'ING_MILK', 7, false),
('breakfast', 'BRK_SWEDISH_BREAKFAST', 'ING_LINGONBERRY_JAM', 8, true)
ON CONFLICT DO NOTHING;

-- BRK_VIETNAMESE_BREAKFAST (9 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_VIETNAMESE_BREAKFAST', 'ING_BEEF_BROTH', 1, true),
('breakfast', 'BRK_VIETNAMESE_BREAKFAST', 'ING_RICE_NOODLES', 2, true),
('breakfast', 'BRK_VIETNAMESE_BREAKFAST', 'ING_BEEF_SIRLOIN', 3, true),
('breakfast', 'BRK_VIETNAMESE_BREAKFAST', 'ING_STAR_ANISE', 4, true),
('breakfast', 'BRK_VIETNAMESE_BREAKFAST', 'ING_CINNAMON', 5, false),
('breakfast', 'BRK_VIETNAMESE_BREAKFAST', 'ING_BEAN_SPROUTS', 6, false),
('breakfast', 'BRK_VIETNAMESE_BREAKFAST', 'ING_THAI_BASIL', 7, false),
('breakfast', 'BRK_VIETNAMESE_BREAKFAST', 'ING_HOISIN', 8, false),
('breakfast', 'BRK_VIETNAMESE_BREAKFAST', 'ING_SRIRACHA', 9, false)
ON CONFLICT DO NOTHING;

-- BRK_BRAZILIAN_BREAKFAST (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_BRAZILIAN_BREAKFAST', 'ING_TAPIOCA_FLOUR', 1, true),
('breakfast', 'BRK_BRAZILIAN_BREAKFAST', 'ING_CHEESE', 2, true),
('breakfast', 'BRK_BRAZILIAN_BREAKFAST', 'ING_EGG', 3, false),
('breakfast', 'BRK_BRAZILIAN_BREAKFAST', 'ING_PAPAYA', 4, true),
('breakfast', 'BRK_BRAZILIAN_BREAKFAST', 'ING_PINEAPPLE', 5, false),
('breakfast', 'BRK_BRAZILIAN_BREAKFAST', 'ING_HAM', 6, false),
('breakfast', 'BRK_BRAZILIAN_BREAKFAST', 'ING_BUTTER', 7, false),
('breakfast', 'BRK_BRAZILIAN_BREAKFAST', 'ING_COFFEE', 8, true)
ON CONFLICT DO NOTHING;

-- BRK_SPANISH_BREAKFAST (8 ingredients)
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, sort_order, is_signature) VALUES
('breakfast', 'BRK_SPANISH_BREAKFAST', 'ING_BAGUETTE', 1, true),
('breakfast', 'BRK_SPANISH_BREAKFAST', 'ING_TOMATO', 2, true),
('breakfast', 'BRK_SPANISH_BREAKFAST', 'ING_OLIVE_OIL', 3, true),
('breakfast', 'BRK_SPANISH_BREAKFAST', 'ING_JAMON_SERRANO', 4, true),
('breakfast', 'BRK_SPANISH_BREAKFAST', 'ING_EGG', 5, false),
('breakfast', 'BRK_SPANISH_BREAKFAST', 'ING_POTATO', 6, false),
('breakfast', 'BRK_SPANISH_BREAKFAST', 'ING_ONION', 7, false),
('breakfast', 'BRK_SPANISH_BREAKFAST', 'ING_COFFEE', 8, false)
ON CONFLICT DO NOTHING;

-- ============================================
-- Verification Query
-- ============================================
-- After running, verify with:
-- SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'breakfast';
-- Expected: ~485 links for 65 breakfast items
