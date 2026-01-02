-- ============================================
-- SOFT DRINKS - Product Ingredients Links
-- GUDBRO Database Standards v1.3
-- Total: ~200 links
-- ============================================

-- Clear existing links (if re-running)
DELETE FROM product_ingredients WHERE product_type = 'softdrinks';

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional)
VALUES
-- ============================================
-- COLA
-- ============================================
-- Coca-Cola
('softdrinks', 'SDR_COCA_COLA', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_COCA_COLA', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_COCA_COLA', 'ING_CARAMEL_COLOR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_COCA_COLA', 'ING_PHOSPHORIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_COCA_COLA', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_COCA_COLA', 'ING_CAFFEINE', NULL, NULL, 'secondary', false),

-- Coca-Cola Zero
('softdrinks', 'SDR_COCA_COLA_ZERO', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_COCA_COLA_ZERO', 'ING_CARAMEL_COLOR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_COCA_COLA_ZERO', 'ING_PHOSPHORIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_COCA_COLA_ZERO', 'ING_ASPARTAME', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_COCA_COLA_ZERO', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_COCA_COLA_ZERO', 'ING_CAFFEINE', NULL, NULL, 'secondary', false),

-- Pepsi
('softdrinks', 'SDR_PEPSI', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_PEPSI', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_PEPSI', 'ING_CARAMEL_COLOR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_PEPSI', 'ING_PHOSPHORIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_PEPSI', 'ING_CAFFEINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_PEPSI', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_PEPSI', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Pepsi Zero
('softdrinks', 'SDR_PEPSI_ZERO', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_PEPSI_ZERO', 'ING_CARAMEL_COLOR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_PEPSI_ZERO', 'ING_PHOSPHORIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_PEPSI_ZERO', 'ING_ASPARTAME', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_PEPSI_ZERO', 'ING_CAFFEINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_PEPSI_ZERO', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_PEPSI_ZERO', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Dr Pepper
('softdrinks', 'SDR_DR_PEPPER', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_DR_PEPPER', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_DR_PEPPER', 'ING_CARAMEL_COLOR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_DR_PEPPER', 'ING_PHOSPHORIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_DR_PEPPER', 'ING_CAFFEINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_DR_PEPPER', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- ============================================
-- LEMON-LIME
-- ============================================
-- Sprite
('softdrinks', 'SDR_SPRITE', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SPRITE', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SPRITE', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SPRITE', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SPRITE', 'ING_LEMON_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SPRITE', 'ING_LIME_JUICE', NULL, NULL, 'secondary', false),

-- Sprite Zero
('softdrinks', 'SDR_SPRITE_ZERO', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SPRITE_ZERO', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SPRITE_ZERO', 'ING_ASPARTAME', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SPRITE_ZERO', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SPRITE_ZERO', 'ING_LEMON_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SPRITE_ZERO', 'ING_LIME_JUICE', NULL, NULL, 'secondary', false),

-- 7UP
('softdrinks', 'SDR_7UP', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_7UP', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_7UP', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_7UP', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_7UP', 'ING_LEMON_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_7UP', 'ING_LIME_JUICE', NULL, NULL, 'secondary', false),

-- Mountain Dew
('softdrinks', 'SDR_MOUNTAIN_DEW', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_MOUNTAIN_DEW', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_MOUNTAIN_DEW', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MOUNTAIN_DEW', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MOUNTAIN_DEW', 'ING_CAFFEINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MOUNTAIN_DEW', 'ING_ORANGE_JUICE', NULL, NULL, 'secondary', false),

-- Starry
('softdrinks', 'SDR_STARRY', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_STARRY', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_STARRY', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_STARRY', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_STARRY', 'ING_LEMON_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_STARRY', 'ING_LIME_JUICE', NULL, NULL, 'secondary', false),

-- ============================================
-- ORANGE
-- ============================================
-- Fanta Orange
('softdrinks', 'SDR_FANTA_ORANGE', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FANTA_ORANGE', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FANTA_ORANGE', 'ING_ORANGE_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FANTA_ORANGE', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FANTA_ORANGE', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Fanta Zero
('softdrinks', 'SDR_FANTA_ZERO', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FANTA_ZERO', 'ING_ORANGE_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FANTA_ZERO', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FANTA_ZERO', 'ING_ASPARTAME', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FANTA_ZERO', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Orangina
('softdrinks', 'SDR_ORANGINA', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ORANGINA', 'ING_ORANGE_JUICE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ORANGINA', 'ING_SUGAR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ORANGINA', 'ING_LEMON_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ORANGINA', 'ING_MANDARIN_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ORANGINA', 'ING_GRAPEFRUIT_JUICE', NULL, NULL, 'secondary', false),

-- Sunkist
('softdrinks', 'SDR_SUNKIST', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SUNKIST', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SUNKIST', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SUNKIST', 'ING_CAFFEINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SUNKIST', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SUNKIST', 'ING_ORANGE_JUICE', NULL, NULL, 'secondary', false),

-- Mirinda
('softdrinks', 'SDR_MIRINDA', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_MIRINDA', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_MIRINDA', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MIRINDA', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MIRINDA', 'ING_ORANGE_JUICE', NULL, NULL, 'secondary', false),

-- ============================================
-- GINGER
-- ============================================
-- Schweppes Ginger Ale
('softdrinks', 'SDR_SCHWEPPES_GINGER_ALE', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SCHWEPPES_GINGER_ALE', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SCHWEPPES_GINGER_ALE', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SCHWEPPES_GINGER_ALE', 'ING_GINGER_EXTRACT', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SCHWEPPES_GINGER_ALE', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Canada Dry
('softdrinks', 'SDR_CANADA_DRY', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_CANADA_DRY', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_CANADA_DRY', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_CANADA_DRY', 'ING_GINGER_EXTRACT', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_CANADA_DRY', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Fever-Tree Ginger Ale
('softdrinks', 'SDR_FEVER_TREE_GINGER_ALE', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FEVER_TREE_GINGER_ALE', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FEVER_TREE_GINGER_ALE', 'ING_GINGER_EXTRACT', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FEVER_TREE_GINGER_ALE', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FEVER_TREE_GINGER_ALE', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Fever-Tree Ginger Beer
('softdrinks', 'SDR_FEVER_TREE_GINGER_BEER', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FEVER_TREE_GINGER_BEER', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FEVER_TREE_GINGER_BEER', 'ING_GINGER_EXTRACT', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FEVER_TREE_GINGER_BEER', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FEVER_TREE_GINGER_BEER', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Bundaberg Ginger Beer
('softdrinks', 'SDR_BUNDABERG_GINGER_BEER', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_BUNDABERG_GINGER_BEER', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_BUNDABERG_GINGER_BEER', 'ING_GINGER_ROOT', NULL, NULL, 'main', false),
('softdrinks', 'SDR_BUNDABERG_GINGER_BEER', 'ING_YEAST', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_BUNDABERG_GINGER_BEER', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- ============================================
-- TONIC & SODA
-- ============================================
-- Schweppes Tonic
('softdrinks', 'SDR_SCHWEPPES_TONIC', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SCHWEPPES_TONIC', 'ING_SUGAR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_SCHWEPPES_TONIC', 'ING_QUININE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SCHWEPPES_TONIC', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),

-- Fever-Tree Tonic
('softdrinks', 'SDR_FEVER_TREE_TONIC', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FEVER_TREE_TONIC', 'ING_SUGAR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FEVER_TREE_TONIC', 'ING_QUININE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FEVER_TREE_TONIC', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FEVER_TREE_TONIC', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Fever-Tree Elderflower
('softdrinks', 'SDR_FEVER_TREE_ELDERFLOWER', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FEVER_TREE_ELDERFLOWER', 'ING_SUGAR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FEVER_TREE_ELDERFLOWER', 'ING_QUININE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_FEVER_TREE_ELDERFLOWER', 'ING_ELDERFLOWER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_FEVER_TREE_ELDERFLOWER', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),

-- Schweppes Soda
('softdrinks', 'SDR_SCHWEPPES_SODA', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SCHWEPPES_SODA', 'ING_SODIUM_BICARBONATE', NULL, NULL, 'secondary', false),

-- San Pellegrino
('softdrinks', 'SDR_SAN_PELLEGRINO', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_SAN_PELLEGRINO', 'ING_MINERAL_SALTS', NULL, NULL, 'secondary', false),

-- Perrier
('softdrinks', 'SDR_PERRIER', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_PERRIER', 'ING_MINERAL_SALTS', NULL, NULL, 'secondary', false),

-- ============================================
-- ENERGY
-- ============================================
-- Red Bull
('softdrinks', 'SDR_RED_BULL', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_RED_BULL', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_RED_BULL', 'ING_CAFFEINE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_RED_BULL', 'ING_TAURINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_RED_BULL', 'ING_B_VITAMINS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_RED_BULL', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),

-- Red Bull Sugar Free
('softdrinks', 'SDR_RED_BULL_SUGAR_FREE', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_RED_BULL_SUGAR_FREE', 'ING_ASPARTAME', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_RED_BULL_SUGAR_FREE', 'ING_CAFFEINE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_RED_BULL_SUGAR_FREE', 'ING_TAURINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_RED_BULL_SUGAR_FREE', 'ING_B_VITAMINS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_RED_BULL_SUGAR_FREE', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),

-- Monster Original
('softdrinks', 'SDR_MONSTER_ORIGINAL', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_MONSTER_ORIGINAL', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_MONSTER_ORIGINAL', 'ING_CAFFEINE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_MONSTER_ORIGINAL', 'ING_TAURINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MONSTER_ORIGINAL', 'ING_GINSENG', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MONSTER_ORIGINAL', 'ING_B_VITAMINS', NULL, NULL, 'secondary', false),

-- Monster Zero Ultra
('softdrinks', 'SDR_MONSTER_ZERO', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_MONSTER_ZERO', 'ING_ERYTHRITOL', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MONSTER_ZERO', 'ING_CAFFEINE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_MONSTER_ZERO', 'ING_TAURINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MONSTER_ZERO', 'ING_GINSENG', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_MONSTER_ZERO', 'ING_B_VITAMINS', NULL, NULL, 'secondary', false),

-- Celsius
('softdrinks', 'SDR_CELSIUS', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_CELSIUS', 'ING_CAFFEINE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_CELSIUS', 'ING_GREEN_TEA_EXTRACT', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_CELSIUS', 'ING_GINGER_EXTRACT', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_CELSIUS', 'ING_GUARANA', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_CELSIUS', 'ING_B_VITAMINS', NULL, NULL, 'secondary', false),

-- Rockstar
('softdrinks', 'SDR_ROCKSTAR', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ROCKSTAR', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ROCKSTAR', 'ING_CAFFEINE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ROCKSTAR', 'ING_TAURINE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ROCKSTAR', 'ING_GINSENG', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ROCKSTAR', 'ING_B_VITAMINS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ROCKSTAR', 'ING_GUARANA', NULL, NULL, 'secondary', false),

-- ============================================
-- OTHER
-- ============================================
-- A&W Root Beer
('softdrinks', 'SDR_ROOT_BEER', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ROOT_BEER', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ROOT_BEER', 'ING_VANILLA', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ROOT_BEER', 'ING_SASSAFRAS', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ROOT_BEER', 'ING_CARAMEL_COLOR', NULL, NULL, 'secondary', false),

-- A&W Cream Soda
('softdrinks', 'SDR_CREAM_SODA', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_CREAM_SODA', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_CREAM_SODA', 'ING_VANILLA', NULL, NULL, 'main', false),
('softdrinks', 'SDR_CREAM_SODA', 'ING_CARAMEL_COLOR', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_CREAM_SODA', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Lipton Iced Tea
('softdrinks', 'SDR_ICED_TEA', 'ING_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ICED_TEA', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ICED_TEA', 'ING_BLACK_TEA', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ICED_TEA', 'ING_LEMON_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ICED_TEA', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),

-- Arizona Green Tea
('softdrinks', 'SDR_ARIZONA_GREEN_TEA', 'ING_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ARIZONA_GREEN_TEA', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ARIZONA_GREEN_TEA', 'ING_HONEY', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ARIZONA_GREEN_TEA', 'ING_GREEN_TEA_EXTRACT', NULL, NULL, 'main', false),
('softdrinks', 'SDR_ARIZONA_GREEN_TEA', 'ING_GINSENG', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_ARIZONA_GREEN_TEA', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),

-- Fanta Grape
('softdrinks', 'SDR_GRAPE_SODA', 'ING_CARBONATED_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_GRAPE_SODA', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_GRAPE_SODA', 'ING_GRAPE_JUICE', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_GRAPE_SODA', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_GRAPE_SODA', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false),

-- Minute Maid Lemonade
('softdrinks', 'SDR_LEMONADE', 'ING_WATER', NULL, NULL, 'main', false),
('softdrinks', 'SDR_LEMONADE', 'ING_SUGAR', NULL, NULL, 'main', false),
('softdrinks', 'SDR_LEMONADE', 'ING_LEMON_JUICE', NULL, NULL, 'main', false),
('softdrinks', 'SDR_LEMONADE', 'ING_CITRIC_ACID', NULL, NULL, 'secondary', false),
('softdrinks', 'SDR_LEMONADE', 'ING_NATURAL_FLAVORS', NULL, NULL, 'secondary', false);

-- Verify count
SELECT COUNT(*) as total_links FROM product_ingredients WHERE product_type = 'softdrinks';
