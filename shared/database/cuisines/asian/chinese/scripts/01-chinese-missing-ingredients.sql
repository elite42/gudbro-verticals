-- ============================================
-- CHINESE DATABASE - Missing Ingredients
-- ============================================
-- Run this FIRST in Supabase SQL Editor
-- Total: ~42 new ingredients for Chinese cuisine
-- ============================================
-- Valid categories: beers, bread, cheese, dairy, eggs, fruits, grains,
--                   herbs, juices, liqueurs, mixers, oils, pasta, proteins,
--                   rice, sauces, seafood, spices, spirits, vegetables, vinegars, wines
-- ============================================

BEGIN;

-- Chinese-specific ingredients
INSERT INTO ingredients (id, slug, name, description, category, is_common) VALUES
  ('ING_ASTRAGALUS', 'astragalus', 'Astragalus Root', 'Huang Qi - Chinese medicinal herb for soups', 'herbs', false),
  ('ING_BAMBOO_LEAVES', 'bamboo-leaves', 'Bamboo Leaves', 'Dried leaves for wrapping zongzi', 'vegetables', false),
  ('ING_BLACK_SESAME_PASTE', 'black-sesame-paste', 'Black Sesame Paste', 'Sweet paste for tang yuan filling', 'sauces', true),
  ('ING_CHICKEN_FEET', 'chicken-feet', 'Chicken Feet', 'Feng Zhua - dim sum delicacy', 'proteins', true),
  ('ING_CHU_HOU_PASTE', 'chu-hou-paste', 'Chu Hou Paste', 'Cantonese fermented bean paste for braising', 'sauces', true),
  ('ING_CODONOPSIS', 'codonopsis', 'Codonopsis Root', 'Dang Shen - Chinese medicinal herb', 'herbs', false),
  ('ING_DANG_GUI', 'dang-gui', 'Dang Gui (Angelica)', 'Chinese angelica root for herbal soups', 'herbs', false),
  ('ING_DRIED_SCALLOPS', 'dried-scallops', 'Dried Scallops', 'Gan Bei - premium Chinese dried seafood', 'seafood', false),
  ('ING_DRIED_TANGERINE_PEEL', 'dried-tangerine-peel', 'Dried Tangerine Peel', 'Chen Pi - aged citrus peel for soups and braises', 'spices', true),
  ('ING_DUCK', 'duck', 'Duck', 'Whole duck or duck meat', 'proteins', true),
  ('ING_ENOKI_MUSHROOM', 'enoki-mushroom', 'Enoki Mushrooms', 'Jin Zhen Gu - thin white mushrooms for hot pot', 'vegetables', true),
  ('ING_FERMENTED_BLACK_BEANS', 'fermented-black-beans', 'Fermented Black Beans', 'Dou Chi - salted fermented soybeans', 'sauces', true),
  ('ING_FRIED_DOUGH', 'fried-dough', 'Fried Dough Stick', 'You Tiao - Chinese cruller for jianbing', 'grains', true),
  ('ING_GLUTINOUS_RICE_FLOUR', 'glutinous-rice-flour', 'Glutinous Rice Flour', 'Nuo Mi Fen - for mochi and tang yuan', 'grains', true),
  ('ING_GOJI_BERRIES', 'goji-berries', 'Goji Berries', 'Gou Qi Zi - Chinese wolfberries for soups', 'fruits', true),
  ('ING_GOLDEN_SYRUP', 'golden-syrup', 'Golden Syrup', 'Inverted sugar syrup for mooncakes', 'sauces', true),
  ('ING_GOOSE', 'goose', 'Goose', 'Whole goose for roasting', 'proteins', false),
  ('ING_HAND_PULLED_NOODLES', 'hand-pulled-noodles', 'Hand-Pulled Noodles', 'La Mian - fresh wheat noodles', 'grains', true),
  ('ING_LAMB_SLICES', 'lamb-slices', 'Sliced Lamb', 'Thin sliced lamb for hot pot', 'proteins', true),
  ('ING_LEEK', 'leek', 'Leek', 'Da Cong - Chinese leek for stir-fries', 'vegetables', true),
  ('ING_LOTUS_LEAF', 'lotus-leaf', 'Lotus Leaf', 'He Ye - for wrapping sticky rice', 'vegetables', false),
  ('ING_LOTUS_SEED_PASTE', 'lotus-seed-paste', 'Lotus Seed Paste', 'Lian Rong - sweet filling for mooncakes', 'sauces', true),
  ('ING_LOTUS_SEEDS', 'lotus-seeds', 'Lotus Seeds', 'Lian Zi - for dessert soups', 'vegetables', true),
  ('ING_LYE_WATER', 'lye-water', 'Lye Water', 'Jian Shui - alkaline solution for noodles and mooncakes', 'sauces', false),
  ('ING_MALTOSE', 'maltose', 'Maltose', 'Mai Ya Tang - malt sugar for glazing duck', 'sauces', true),
  ('ING_MANDARIN_PANCAKES', 'mandarin-pancakes', 'Mandarin Pancakes', 'Thin wheat pancakes for Peking duck', 'grains', true),
  ('ING_MUNG_BEAN_FLOUR', 'mung-bean-flour', 'Mung Bean Flour', 'Lv Dou Fen - for jianbing crepes', 'grains', true),
  ('ING_PLUM_SAUCE', 'plum-sauce', 'Plum Sauce', 'Mei Zi Jiang - sweet and sour sauce', 'sauces', true),
  ('ING_PORK_ASPIC', 'pork-aspic', 'Pork Aspic', 'Pork gelatin for soup dumplings', 'proteins', false),
  ('ING_PORK_FAT', 'pork-fat', 'Pork Fat', 'Rendered pork fat for cooking', 'oils', true),
  ('ING_PORK_SPARE_RIBS', 'pork-spare-ribs', 'Pork Spare Ribs', 'Pai Gu - for dim sum and braising', 'proteins', true),
  ('ING_PRAWNS', 'prawns', 'Prawns', 'Large shrimp for steaming', 'seafood', true),
  ('ING_RED_BEAN_PASTE', 'red-bean-paste', 'Red Bean Paste', 'Hong Dou Sha - sweet filling', 'sauces', true),
  ('ING_RED_DATES', 'red-dates', 'Red Dates', 'Hong Zao - Chinese jujubes', 'fruits', true),
  ('ING_RED_FOOD_COLORING', 'red-food-coloring', 'Red Food Coloring', 'For char siu red color', 'sauces', false),
  ('ING_ROCK_SUGAR', 'rock-sugar', 'Rock Sugar', 'Bing Tang - crystallized sugar for braising', 'sauces', true),
  ('ING_SWEET_BEAN_PASTE', 'sweet-bean-paste', 'Sweet Bean Paste', 'Tian Mian Jiang - for Beijing dishes', 'sauces', true),
  ('ING_SWEET_SOY_SAUCE', 'sweet-soy-sauce', 'Sweet Soy Sauce', 'Kecap manis style sauce for cheung fun', 'sauces', true),
  ('ING_WHEAT_STARCH', 'wheat-starch', 'Wheat Starch', 'Cheng Fen - for har gow wrappers', 'grains', true),
  ('ING_WHITE_RADISH', 'white-radish', 'White Radish', 'Luo Bo - daikon for soups and cakes', 'vegetables', true),
  ('ING_WINTER_MELON', 'winter-melon', 'Winter Melon', 'Dong Gua - for soup', 'vegetables', true),
  ('ING_XO_SAUCE', 'xo-sauce', 'XO Sauce', 'Hong Kong luxury sauce with dried seafood', 'sauces', true)
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- Verify count
SELECT COUNT(*) as new_ingredients_added FROM ingredients WHERE id LIKE 'ING_%' AND created_at > NOW() - INTERVAL '5 minutes';
