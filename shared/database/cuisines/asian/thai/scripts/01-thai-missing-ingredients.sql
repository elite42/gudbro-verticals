-- ============================================
-- THAI DATABASE - Missing Ingredients
-- ============================================
-- Run this FIRST in Supabase SQL Editor
-- Total: ~72 new ingredients for Thai cuisine
-- ============================================
-- Valid categories: beers, bread, cheese, dairy, eggs, fruits, grains,
--                   herbs, juices, liqueurs, mixers, oils, pasta, proteins,
--                   rice, sauces, seafood, spices, spirits, vegetables, vinegars, wines
-- ============================================

BEGIN;

-- Thai-specific ingredients
INSERT INTO ingredients (id, slug, name, description, category, is_common) VALUES
  ('ING_BAY_LEAF', 'bay-leaf', 'Bay Leaf', 'Aromatic dried leaf used in soups and stews', 'herbs', true),
  ('ING_BEEF_LIVER', 'beef-liver', 'Beef Liver', 'Nutrient-rich organ meat', 'proteins', false),
  ('ING_BEEF_MEATBALLS', 'beef-meatballs', 'Beef Meatballs', 'Ground beef formed into small balls', 'proteins', true),
  ('ING_BEEF_SLICES', 'beef-slices', 'Sliced Beef', 'Thinly sliced beef for stir-fries and soups', 'proteins', true),
  ('ING_BETEL_LEAVES', 'betel-leaves', 'Betel Leaves', 'Heart-shaped leaves used as wraps for Miang Kham', 'vegetables', false),
  ('ING_BIRD_EYE_CHILI', 'bird-eye-chili', 'Bird Eye Chili', 'Small, extremely hot Thai chili pepper', 'spices', true),
  ('ING_CARDAMOM', 'cardamom', 'Cardamom', 'Aromatic spice used in curries and desserts', 'spices', true),
  ('ING_CARROTS', 'carrots', 'Carrots', 'Orange root vegetable', 'vegetables', true),
  ('ING_CHICKEN_FAT', 'chicken-fat', 'Chicken Fat', 'Rendered fat from chicken, used for cooking rice', 'oils', false),
  ('ING_CHICKEN_GROUND', 'chicken-ground', 'Ground Chicken', 'Minced chicken meat', 'proteins', true),
  ('ING_CHICKEN_LEG', 'chicken-leg', 'Chicken Leg', 'Whole chicken leg with thigh attached', 'proteins', true),
  ('ING_CHILI_VINEGAR', 'chili-vinegar', 'Chili Vinegar', 'Vinegar infused with chilies for dipping', 'vinegars', true),
  ('ING_CHINESE_SAUSAGE', 'chinese-sausage', 'Chinese Sausage', 'Sweet dried pork sausage (Lap Cheong)', 'proteins', true),
  ('ING_COCONUT_JELLY', 'coconut-jelly', 'Coconut Jelly', 'Chewy jelly made from young coconut', 'fruits', false),
  ('ING_CORIANDER_ROOT', 'coriander-root', 'Coriander Root', 'Root of cilantro plant, essential in Thai cooking', 'herbs', true),
  ('ING_CRISPY_PORK', 'crispy-pork', 'Crispy Pork Belly', 'Deep-fried pork belly with crispy skin', 'proteins', true),
  ('ING_CUCUMBER_RELISH', 'cucumber-relish', 'Cucumber Relish', 'Thai-style pickled cucumber sauce (Ajad)', 'sauces', true),
  ('ING_DRIED_CHILIES', 'dried-chilies', 'Dried Chilies', 'Sun-dried red chilies for frying and pastes', 'spices', true),
  ('ING_DUCK_BREAST', 'duck-breast', 'Duck Breast', 'Boneless duck breast meat', 'proteins', true),
  ('ING_DUCK_WHOLE', 'duck-whole', 'Whole Duck', 'Entire duck for roasting', 'proteins', false),
  ('ING_EGGS', 'eggs', 'Eggs', 'Chicken eggs', 'eggs', true),
  ('ING_FISH_PASTE', 'fish-paste', 'Fish Paste', 'Pureed fish used for fish cakes', 'seafood', true),
  ('ING_FISH_WHITE', 'fish-white', 'White Fish', 'Mild white-fleshed fish', 'seafood', true),
  ('ING_FIVE_SPICE', 'five-spice', 'Five Spice Powder', 'Chinese spice blend with star anise, cloves, cinnamon, fennel, pepper', 'spices', true),
  ('ING_FOOD_COLORING', 'food-coloring', 'Food Coloring', 'Edible dye for desserts', 'sauces', false),
  ('ING_FRIED_GARLIC', 'fried-garlic', 'Fried Garlic', 'Crispy fried garlic slices for garnish', 'vegetables', true),
  ('ING_GINGER_SAUCE', 'ginger-sauce', 'Ginger Sauce', 'Sauce made from fresh ginger for Hainanese chicken', 'sauces', true),
  ('ING_GLASS_NOODLES', 'glass-noodles', 'Glass Noodles', 'Transparent noodles made from mung bean starch', 'grains', true),
  ('ING_GRASS_JELLY', 'grass-jelly', 'Grass Jelly', 'Black herbal jelly dessert ingredient', 'fruits', false),
  ('ING_GREEN_MANGO', 'green-mango', 'Green Mango', 'Unripe mango used in salads', 'fruits', true),
  ('ING_GREEN_PEPPERCORNS', 'green-peppercorns', 'Green Peppercorns', 'Fresh unripe peppercorns used in Thai curries', 'spices', true),
  ('ING_HOLY_BASIL', 'holy-basil', 'Holy Basil', 'Peppery Thai basil (Krapao) essential for Pad Krapao', 'herbs', true),
  ('ING_JAEW_SAUCE', 'jaew-sauce', 'Jaew Sauce', 'Isan dipping sauce with roasted rice and chilies', 'sauces', true),
  ('ING_JASMINE', 'jasmine', 'Jasmine', 'Fragrant jasmine flowers for flavoring desserts', 'herbs', false),
  ('ING_JASMINE_RICE', 'jasmine-rice', 'Jasmine Rice', 'Fragrant Thai long-grain rice', 'rice', true),
  ('ING_KAFFIR_LIME_LEAVES', 'kaffir-lime-leaves', 'Kaffir Lime Leaves', 'Aromatic citrus leaves essential in Thai curries', 'herbs', true),
  ('ING_KRACHAI', 'krachai', 'Krachai', 'Fingerroot or Chinese ginger, used in jungle curry', 'herbs', false),
  ('ING_MASSAMAN_CURRY_PASTE', 'massaman-curry-paste', 'Massaman Curry Paste', 'Mild curry paste with Indian spices', 'sauces', true),
  ('ING_MORNING_GLORY', 'morning-glory', 'Morning Glory', 'Water spinach (Pak Boong), popular Thai vegetable', 'vegetables', true),
  ('ING_PALM_SEEDS', 'palm-seeds', 'Palm Seeds', 'Translucent chewy seeds from palm fruit for desserts', 'fruits', false),
  ('ING_PANANG_CURRY_PASTE', 'panang-curry-paste', 'Panang Curry Paste', 'Rich, peanutty red curry paste', 'sauces', true),
  ('ING_PANDAN_LEAVES', 'pandan-leaves', 'Pandan Leaves', 'Fragrant green leaves for wrapping and flavoring', 'herbs', true),
  ('ING_PICKLED_MUSTARD_GREENS', 'pickled-mustard-greens', 'Pickled Mustard Greens', 'Tangy fermented greens used in noodle dishes', 'vegetables', true),
  ('ING_PORK_GROUND', 'pork-ground', 'Ground Pork', 'Minced pork meat', 'proteins', true),
  ('ING_PORK_INTESTINES', 'pork-intestines', 'Pork Intestines', 'Cleaned pork intestines used in noodle soups', 'proteins', false),
  ('ING_PORK_LEG', 'pork-leg', 'Pork Leg', 'Whole pork leg for braising (Khao Kha Moo)', 'proteins', true),
  ('ING_PORK_MEATBALLS', 'pork-meatballs', 'Pork Meatballs', 'Ground pork formed into balls for noodle soups', 'proteins', true),
  ('ING_PORK_NECK', 'pork-neck', 'Pork Neck', 'Marbled pork neck cut, ideal for grilling', 'proteins', true),
  ('ING_PORK_SLICES', 'pork-slices', 'Sliced Pork', 'Thinly sliced pork for stir-fries and soups', 'proteins', true),
  ('ING_RED_CURRY_PASTE', 'red-curry-paste', 'Red Curry Paste', 'Spicy red Thai curry paste', 'sauces', true),
  ('ING_RED_SAUCE', 'red-sauce', 'Red Sauce', 'Sweet red gravy for roasted meats', 'sauces', true),
  ('ING_RIVER_PRAWNS', 'river-prawns', 'River Prawns', 'Large freshwater prawns (Goong Mae Nam)', 'seafood', false),
  ('ING_ROASTED_CHILI_PASTE', 'roasted-chili-paste', 'Roasted Chili Paste', 'Nam Prik Pao - Thai chili jam', 'sauces', true),
  ('ING_ROASTED_CHILI_POWDER', 'roasted-chili-powder', 'Roasted Chili Powder', 'Dry roasted ground chilies', 'spices', true),
  ('ING_ROLLED_RICE_NOODLES', 'rolled-rice-noodles', 'Rolled Rice Noodles', 'Wide rice noodle sheets rolled up', 'grains', false),
  ('ING_ROTI_DOUGH', 'roti-dough', 'Roti Dough', 'Stretchy flatbread dough for Thai roti', 'grains', true),
  ('ING_SALTED_EGG_YOLK', 'salted-egg-yolk', 'Salted Egg Yolk', 'Cured duck egg yolk for rich, savory flavor', 'eggs', true),
  ('ING_SAWTOOTH_CORIANDER', 'sawtooth-coriander', 'Sawtooth Coriander', 'Pak Chi Farang - serrated herb used in Isan cuisine', 'herbs', true),
  ('ING_SEAFOOD_SAUCE', 'seafood-sauce', 'Seafood Sauce', 'Spicy dipping sauce for grilled seafood', 'sauces', true),
  ('ING_SOYBEAN_PASTE', 'soybean-paste', 'Soybean Paste', 'Fermented soybean sauce for Hainanese chicken', 'sauces', true),
  ('ING_SPRING_ONION', 'spring-onion', 'Spring Onion', 'Green onion/scallion', 'vegetables', true),
  ('ING_SPRING_ROLL_WRAPPERS', 'spring-roll-wrappers', 'Spring Roll Wrappers', 'Thin wheat wrappers for fried spring rolls', 'grains', true),
  ('ING_STICKY_RICE', 'sticky-rice', 'Sticky Rice', 'Glutinous rice, staple of Northeastern Thailand', 'rice', true),
  ('ING_STRAW_MUSHROOMS', 'straw-mushrooms', 'Straw Mushrooms', 'Small mushrooms common in Thai soups', 'vegetables', true),
  ('ING_TAPIOCA_STARCH', 'tapioca-starch', 'Tapioca Starch', 'Starch from cassava for thickening and desserts', 'grains', true),
  ('ING_THAI_TEA', 'thai-tea', 'Thai Tea', 'Orange-colored Thai tea blend', 'herbs', true),
  ('ING_TOASTED_COCONUT', 'toasted-coconut', 'Toasted Coconut', 'Dry-roasted coconut flakes', 'fruits', true),
  ('ING_WATER_CHESTNUTS', 'water-chestnuts', 'Water Chestnuts', 'Crunchy aquatic vegetable for desserts', 'vegetables', true),
  ('ING_WHOLE_FISH', 'whole-fish', 'Whole Fish', 'Entire fish for steaming or frying', 'seafood', true),
  ('ING_WILD_GINGER', 'wild-ginger', 'Wild Ginger', 'Aromatic rhizome used in Northern Thai cooking', 'herbs', false),
  ('ING_WONTONS', 'wontons', 'Wontons', 'Filled dumplings, usually pork', 'proteins', true),
  ('ING_WOOD_EAR_MUSHROOMS', 'wood-ear-mushrooms', 'Wood Ear Mushrooms', 'Black fungus with crunchy texture', 'vegetables', true),
  ('ING_YELLOW_CURRY_PASTE', 'yellow-curry-paste', 'Yellow Curry Paste', 'Mild curry paste with turmeric', 'sauces', true)
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- Verify count
SELECT COUNT(*) as new_ingredients_added FROM ingredients WHERE id LIKE 'ING_%' AND created_at > NOW() - INTERVAL '5 minutes';
