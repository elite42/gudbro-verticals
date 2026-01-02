-- =============================================================================
-- VIETNAMESE DATABASE - ADDITIONAL MISSING INGREDIENTS
-- 76 ingredients needed for Vietnamese dishes
-- =============================================================================

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary, spice_level, is_common)
VALUES
  -- Aromatics & Herbs
  ('ING_ANNATTO_SEEDS', 'annatto-seeds', 'Annatto Seeds', 'Red-orange seeds used for coloring', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_CULANTRO', 'culantro', 'Culantro', 'Ngo gai - sawtooth herb', 'herbs', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_VIETNAMESE_CORIANDER', 'vietnamese-coriander', 'Vietnamese Coriander', 'Rau ram - peppery herb', 'herbs', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_CORIANDER', 'coriander-seeds', 'Coriander Seeds', 'Dried coriander seeds for spice blends', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_BAY_LEAF', 'bay-leaf', 'Bay Leaf', 'Aromatic dried leaves for soups and braises', 'herbs', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_BETEL_LEAVES', 'betel-leaves', 'Betel Leaves', 'La lot - aromatic leaves for wrapping beef', 'herbs', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_PANDAN_LEAVES', 'pandan-leaves', 'Pandan Leaves', 'Fragrant leaves for desserts and rice', 'herbs', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_KAFFIR_LIME_LEAVES', 'kaffir-lime-leaves', 'Kaffir Lime Leaves', 'Aromatic citrus leaves', 'herbs', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_SCALLION', 'scallion', 'Scallion', 'Green onion for garnish', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_MORNING_GLORY', 'morning-glory', 'Morning Glory', 'Rau muong - water spinach', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Vegetables
  ('ING_BANANA_LEAVES', 'banana-leaves', 'Banana Leaves', 'Leaves for wrapping and steaming', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_WATER_SPINACH', 'water-spinach', 'Water Spinach', 'Rau muong - morning glory', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_JICAMA', 'jicama', 'Jicama', 'Cu san - crispy root vegetable', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_KOHLRABI', 'kohlrabi', 'Kohlrabi', 'Su hao - bulb vegetable', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_TARO', 'taro', 'Taro', 'Khoai mon - starchy root', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_PICKLED_CARROTS', 'pickled-carrots', 'Pickled Carrots', 'Do chua - pickled carrots', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_DAIKON', 'daikon', 'Daikon', 'White radish', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_BOK_CHOY', 'bok-choy', 'Bok Choy', 'Chinese cabbage', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_CARROTS', 'carrots', 'Carrots', 'Orange root vegetable', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_GREEN_MANGO', 'green-mango', 'Green Mango', 'Unripe mango for salads', 'fruits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Fruits
  ('ING_BANANAS', 'bananas', 'Bananas', 'Sweet tropical fruit', 'fruits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_KUMQUAT', 'kumquat', 'Kumquat', 'Tac - small citrus fruit', 'fruits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_SUGARCANE', 'sugarcane', 'Sugarcane', 'Fresh sugarcane for juice', 'fruits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Proteins - Beef
  ('ING_BEEF_BONES', 'beef-bones', 'Beef Bones', 'Marrow bones for pho broth', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_BEEF_TENDON', 'beef-tendon', 'Beef Tendon', 'Gelatinous connective tissue', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_BEEF_TRIPE', 'beef-tripe', 'Beef Tripe', 'Edible stomach lining', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_BEEF_FLANK', 'beef-flank', 'Beef Flank', 'Lean cut from belly', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_BEEF_MEATBALLS', 'beef-meatballs', 'Beef Meatballs', 'Bo vien - bouncy meatballs', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Proteins - Pork
  ('ING_PORK_BONES', 'pork-bones', 'Pork Bones', 'Bones for broth', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_PORK_CHOP', 'pork-chop', 'Pork Chop', 'Bone-in pork cut', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_PORK_SKIN', 'pork-skin', 'Pork Skin', 'Bi - shredded pork skin', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_PORK_FLOSS', 'pork-floss', 'Pork Floss', 'Ruoc - dried shredded pork', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_CHA_LUA', 'cha-lua', 'Cha Lua', 'Vietnamese pork sausage', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_LAP_XUONG', 'lap-xuong', 'Lap Xuong', 'Chinese-style sweet dried sausage', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_PORK_EGG_MEATLOAF', 'pork-egg-meatloaf', 'Pork Egg Meatloaf', 'Cha trung - steamed pork and egg', 'proteins', '{"egg": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_PORK_MEATBALLS', 'pork-meatballs', 'Pork Meatballs', 'Ground pork balls', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Proteins - Poultry
  ('ING_CHICKEN_BONES', 'chicken-bones', 'Chicken Bones', 'Bones for chicken broth', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_DUCK', 'duck', 'Duck', 'Whole duck meat', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_DUCK_BONES', 'duck-bones', 'Duck Bones', 'Bones for duck broth', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Proteins - Other
  ('ING_GOAT_MEAT', 'goat-meat', 'Goat Meat', 'Lean meat for hot pot', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, false),
  ('ING_GOAT_BONES', 'goat-bones', 'Goat Bones', 'Bones for goat broth', 'proteins', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, false),
  ('ING_EGGS', 'eggs', 'Eggs', 'Chicken eggs', 'eggs', '{"egg": true}', '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_EGG_OMELET', 'egg-omelet', 'Egg Omelet', 'Thin egg sheets', 'eggs', '{"egg": true}', '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_QUAIL_EGGS', 'quail-eggs', 'Quail Eggs', 'Small eggs for banh bao', 'eggs', '{"egg": true}', '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Seafood
  ('ING_CRAB_PASTE', 'crab-paste', 'Crab Paste', 'Fermented crab paste for bun rieu', 'seafood', '{"crustacean": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_CRAB_MEAT', 'crab-meat', 'Crab Meat', 'Fresh crab meat', 'seafood', '{"crustacean": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_FERMENTED_FISH', 'fermented-fish', 'Fermented Fish', 'Mam ca - fermented fish paste', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_FISH_BALLS', 'fish-balls', 'Fish Balls', 'Bouncy fish paste balls', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_FISH_BONES', 'fish-bones', 'Fish Bones', 'Bones for seafood broth', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_FISH_FILLET', 'fish-fillet', 'Fish Fillet', 'Boneless fish portions', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_RIVER_SNAILS', 'river-snails', 'River Snails', 'Oc - freshwater snails', 'seafood', '{"mollusk": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, false),
  ('ING_SALTED_FISH', 'salted-fish', 'Salted Fish', 'Ca man - dried salted fish', 'seafood', '{"fish": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_SQUID', 'squid', 'Squid', 'Muc - fresh squid', 'seafood', '{"mollusk": true}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Grains & Rice
  ('ING_BROKEN_RICE', 'broken-rice', 'Broken Rice', 'Com tam - fragmented rice grains', 'rice', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_GLUTINOUS_RICE', 'glutinous-rice', 'Glutinous Rice', 'Sticky rice for xoi', 'rice', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_JASMINE_RICE', 'jasmine-rice', 'Jasmine Rice', 'Fragrant long-grain rice', 'rice', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_RICE_CRACKERS', 'rice-crackers', 'Rice Crackers', 'Banh trang - crispy rice paper', 'grains', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_WHEAT_WRAPPER', 'wheat-wrapper', 'Wheat Wrapper', 'Wheat spring roll wrapper', 'grains', '{"gluten": true}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_GLASS_NOODLES', 'glass-noodles', 'Glass Noodles', 'Mien - clear mung bean noodles', 'pasta', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_GLUTINOUS_RICE_FLOUR', 'glutinous-rice-flour', 'Glutinous Rice Flour', 'Bot nep - sticky rice flour', 'grains', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_TAPIOCA_STARCH', 'tapioca-starch', 'Tapioca Starch', 'Bot nang - cassava starch', 'grains', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Soy Products
  ('ING_FERMENTED_TOFU', 'fermented-tofu', 'Fermented Tofu', 'Chao - fermented bean curd', 'proteins', '{"soy": true}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_TOFU_FRIED', 'fried-tofu', 'Fried Tofu', 'Dau hu chien - deep-fried tofu', 'proteins', '{"soy": true}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Condiments & Sauces
  ('ING_CARAMEL_SAUCE', 'caramel-sauce', 'Caramel Sauce', 'Nuoc mau - Vietnamese dark caramel', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_MAGGI', 'maggi-seasoning', 'Maggi Seasoning', 'Popular Vietnamese condiment', 'spices', '{"soy": true}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_VEGETARIAN_NUOC_CHAM', 'vegetarian-nuoc-cham', 'Vegetarian Nuoc Cham', 'Fish sauce alternative', 'spices', '{"soy": true}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_VEGETARIAN_PATE', 'vegetarian-pate', 'Vegetarian Pate', 'Plant-based pate', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, false),
  ('ING_RICE_WINE', 'rice-wine', 'Rice Wine', 'Ruou gao - cooking wine', 'spirits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_ROCK_SUGAR', 'rock-sugar', 'Rock Sugar', 'Duong phen - crystallized sugar', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Spices
  ('ING_CARDAMOM', 'cardamom', 'Cardamom', 'Aromatic spice for pho', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_FIVE_SPICE', 'five-spice', 'Five Spice', 'Ngu vi huong - Chinese five spice', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_FENNEL_SEEDS', 'fennel-seeds', 'Fennel Seeds', 'Aromatic seeds', 'spices', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Desserts & Beverages
  ('ING_PANDAN_JELLY', 'pandan-jelly', 'Pandan Jelly', 'Green jelly for desserts', 'fruits', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_VIETNAMESE_COFFEE', 'vietnamese-coffee', 'Vietnamese Coffee', 'Ca phe - strong dark roast', 'mixers', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),

  -- Mushrooms
  ('ING_SHIITAKE_MUSHROOMS', 'shiitake-mushrooms', 'Shiitake Mushrooms', 'Nam dong co - aromatic mushrooms', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true),
  ('ING_WOOD_EAR_MUSHROOMS', 'wood-ear-mushrooms', 'Wood Ear Mushrooms', 'Moc nhi - black fungus', 'vegetables', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', 0, true)

ON CONFLICT (id) DO NOTHING;

-- Total: 76 additional ingredients
