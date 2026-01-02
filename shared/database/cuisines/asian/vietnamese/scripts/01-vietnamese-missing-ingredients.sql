-- =============================================================================
-- VIETNAMESE DATABASE - MISSING INGREDIENTS
-- 49 new ingredients for Vietnamese cuisine
-- (2 already exist: ING_WIDE_RICE_NOODLES, ING_BLACK_PEPPER)
-- Valid categories: beers, bread, dairy, eggs, fruits, grains, herbs, juices,
--                   liqueurs, mixers, pasta, proteins, rice, seafood, spices,
--                   spirits, vegetables, wines
-- =============================================================================

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary, spice_level, is_common)
VALUES
  -- Aromatics & Herbs
  ('ING_ANNATTO_SEEDS', 'annatto-seeds', 'Annatto Seeds', 'Red-orange seeds used for coloring in Vietnamese and Latin cuisines', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_CULANTRO', 'culantro', 'Culantro', 'Ngo gai - sawtooth herb with strong cilantro-like flavor', 'herbs', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_VIETNAMESE_CORIANDER', 'vietnamese-coriander', 'Vietnamese Coriander', 'Rau ram - peppery herb essential in Vietnamese cuisine', 'herbs', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- Vegetables & Leaves
  ('ING_BANANA_LEAVES', 'banana-leaves', 'Banana Leaves', 'Large tropical leaves used for wrapping and steaming foods', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_WATER_SPINACH', 'water-spinach', 'Water Spinach', 'Rau muong - morning glory, popular Vietnamese green', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_JICAMA', 'jicama', 'Jicama', 'Cu san - crispy root vegetable for spring rolls', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_KOHLRABI', 'kohlrabi', 'Kohlrabi', 'Su hao - bulb vegetable used in Vietnamese cooking', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_TARO', 'taro', 'Taro', 'Khoai mon - starchy root for spring rolls and desserts', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_PICKLED_CARROTS', 'pickled-carrots', 'Pickled Carrots', 'Do chua - pickled carrots for banh mi and more', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- Fruits
  ('ING_BANANAS', 'bananas', 'Bananas', 'Sweet tropical fruit, commonly used in Vietnamese desserts', 'fruits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_KUMQUAT', 'kumquat', 'Kumquat', 'Tac - small citrus fruit for juices and garnish', 'fruits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_SUGARCANE', 'sugarcane', 'Sugarcane', 'Mia - fresh sugarcane for juice', 'fruits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- Meats & Bones (category: proteins)
  ('ING_BEEF_BONES', 'beef-bones', 'Beef Bones', 'Marrow bones used for making rich beef broth for pho', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_BEEF_TENDON', 'beef-tendon', 'Beef Tendon', 'Gelatinous connective tissue prized for texture in pho', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_BEEF_TRIPE', 'beef-tripe', 'Beef Tripe', 'Edible stomach lining, common in traditional pho', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_CHICKEN_BONES', 'chicken-bones', 'Chicken Bones', 'Bones for making chicken broth for pho ga', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_DUCK_BONES', 'duck-bones', 'Duck Bones', 'Bones for making duck broth for pho vit', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_PORK_BONES', 'pork-bones', 'Pork Bones', 'Bones for making broth', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_PORK_CHOP', 'pork-chop', 'Pork Chop', 'Bone-in pork cut for com tam suon nuong', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_PORK_SKIN', 'pork-skin', 'Pork Skin', 'Bi - shredded pork skin mixed with rice powder', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_PORK_FLOSS', 'pork-floss', 'Pork Floss', 'Ruoc - dried shredded pork for toppings', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_CHA_LUA', 'cha-lua', 'Cha Lua', 'Vietnamese pork sausage/ham, essential for banh mi', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_LAP_XUONG', 'lap-xuong', 'Lap Xuong', 'Chinese-style sweet dried sausage used in Vietnamese dishes', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),
  ('ING_GOAT_MEAT', 'goat-meat', 'Goat Meat', 'Lean meat used in Northern Vietnamese hot pot', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, false),
  ('ING_GOAT_BONES', 'goat-bones', 'Goat Bones', 'Bones for goat hot pot broth', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, false),
  ('ING_PORK_EGG_MEATLOAF', 'pork-egg-meatloaf', 'Pork Egg Meatloaf', 'Cha trung - steamed pork and egg meatloaf', 'proteins', '{"egg": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}', 0, true),

  -- Seafood
  ('ING_CRAB_PASTE', 'crab-paste', 'Crab Paste', 'Fermented crab paste for bun rieu and other dishes', 'seafood', '{"crustacean": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_FERMENTED_FISH', 'fermented-fish', 'Fermented Fish', 'Mam ca - fermented fish paste for bun mam', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_FISH_BALLS', 'fish-balls', 'Fish Balls', 'Bouncy fish paste balls for hot pot and noodles', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_FISH_BONES', 'fish-bones', 'Fish Bones', 'Bones for making seafood broth', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_FISH_FILLET', 'fish-fillet', 'Fish Fillet', 'Boneless fish portions for soups and grilling', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_RIVER_SNAILS', 'river-snails', 'River Snails', 'Oc - freshwater snails for bun oc', 'seafood', '{"mollusk": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, false),
  ('ING_SALTED_FISH', 'salted-fish', 'Salted Fish', 'Ca man - dried salted fish for fried rice', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- Eggs
  ('ING_EGG_OMELET', 'egg-omelet', 'Egg Omelet', 'Thin egg sheets cut into strips for garnish', 'eggs', '{"egg": true}', '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_QUAIL_EGGS', 'quail-eggs', 'Quail Eggs', 'Small eggs used in banh bao and hot pots', 'eggs', '{"egg": true}', '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- Grains & Rice
  ('ING_BROKEN_RICE', 'broken-rice', 'Broken Rice', 'Fragmented rice grains, foundation of Com Tam dishes', 'rice', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_GLUTINOUS_RICE', 'glutinous-rice', 'Glutinous Rice', 'Sticky rice used for xoi and desserts', 'rice', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_RICE_CRACKERS', 'rice-crackers', 'Rice Crackers', 'Banh trang - crispy rice paper crackers', 'grains', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  -- ING_WIDE_RICE_NOODLES already exists
  ('ING_WHEAT_WRAPPER', 'wheat-wrapper', 'Wheat Wrapper', 'Wheat-based spring roll wrapper for nem ran', 'grains', '{"gluten": true}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- Soy Products (category: proteins)
  ('ING_FERMENTED_TOFU', 'fermented-tofu', 'Fermented Tofu', 'Chao - pungent fermented bean curd used in hot pots', 'proteins', '{"soy": true}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_TOFU_FRIED', 'fried-tofu', 'Fried Tofu', 'Dau hu chien - deep-fried tofu puffs', 'proteins', '{"soy": true}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- Condiments & Sauces (category: spices)
  ('ING_CARAMEL_SAUCE', 'caramel-sauce', 'Caramel Sauce', 'Vietnamese dark caramel (nuoc mau) for braised dishes', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_MAGGI', 'maggi-seasoning', 'Maggi Seasoning', 'Popular condiment in Vietnamese cuisine', 'spices', '{"soy": true}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_VEGETARIAN_NUOC_CHAM', 'vegetarian-nuoc-cham', 'Vegetarian Nuoc Cham', 'Fish sauce alternative made with soy', 'spices', '{"soy": true}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),
  ('ING_VEGETARIAN_PATE', 'vegetarian-pate', 'Vegetarian Pate', 'Plant-based pate for vegan banh mi', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, false),
  ('ING_RICE_WINE', 'rice-wine', 'Rice Wine', 'Ruou gao - fermented rice alcohol for cooking', 'spirits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- Dessert Ingredients
  ('ING_PANDAN_JELLY', 'pandan-jelly', 'Pandan Jelly', 'Green jelly made from pandan leaves for desserts', 'fruits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- ING_BLACK_PEPPER already exists

  -- Beverages (category: mixers for coffee)
  ('ING_VIETNAMESE_COFFEE', 'vietnamese-coffee', 'Vietnamese Coffee', 'Ca phe - strong dark roast for ca phe sua da', 'mixers', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true),

  -- Mushrooms
  ('ING_SHIITAKE_MUSHROOMS', 'shiitake-mushrooms', 'Shiitake Mushrooms', 'Nam dong co - aromatic Asian mushrooms', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', 0, true)

ON CONFLICT (id) DO NOTHING;

-- Verify count
-- SELECT COUNT(*) FROM ingredients WHERE id LIKE 'ING_%';
