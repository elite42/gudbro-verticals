-- =============================================================================
-- MIGRATION: Add Exotic Protein Ingredients
-- Date: 2025-12-27
-- Purpose: Expand game and proteins categories with exotic meats and insects
-- =============================================================================

-- =============================================================================
-- BATCH 1: EXOTIC MAMMALS (category: game)
-- =============================================================================

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_BISON', 'Bison Meat', 'bison-meat', 'game'::ingredient_category,
   'Lean red meat from American bison, rich in protein and iron',
   '{"calories": 143, "protein": 28.4, "fat": 2.4, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_BUFFALO', 'Water Buffalo Meat', 'water-buffalo-meat', 'game'::ingredient_category,
   'Lean meat from water buffalo, popular in South and Southeast Asian cuisines',
   '{"calories": 131, "protein": 26.8, "fat": 1.8, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_YAK', 'Yak Meat', 'yak-meat', 'game'::ingredient_category,
   'Lean, flavorful meat from Himalayan yak, similar to beef but leaner',
   '{"calories": 134, "protein": 25.5, "fat": 2.8, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_VENISON', 'Venison', 'venison', 'game'::ingredient_category,
   'Lean meat from deer, rich flavor with low fat content',
   '{"calories": 158, "protein": 30.2, "fat": 3.2, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_MOOSE', 'Moose Meat', 'moose-meat', 'game'::ingredient_category,
   'Lean game meat from moose, popular in Scandinavian and Canadian cuisines',
   '{"calories": 134, "protein": 29.3, "fat": 1.0, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_ELK', 'Elk Meat', 'elk-meat', 'game'::ingredient_category,
   'Lean red meat from elk, mild flavor similar to beef',
   '{"calories": 146, "protein": 30.2, "fat": 1.9, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_ANTELOPE', 'Antelope Meat', 'antelope-meat', 'game'::ingredient_category,
   'Very lean game meat with mild, slightly sweet flavor',
   '{"calories": 150, "protein": 29.5, "fat": 2.6, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_HARE', 'Hare Meat', 'hare-meat', 'game'::ingredient_category,
   'Wild hare meat, darker and more flavorful than rabbit',
   '{"calories": 173, "protein": 33.0, "fat": 3.5, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_WILD_BOAR', 'Wild Boar Meat', 'wild-boar-meat', 'game'::ingredient_category,
   'Lean, flavorful meat from wild boar, darker than domestic pork',
   '{"calories": 160, "protein": 28.3, "fat": 4.4, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_CAMEL', 'Camel Meat', 'camel-meat', 'game'::ingredient_category,
   'Lean red meat from camel, traditional in Middle Eastern and African cuisines',
   '{"calories": 138, "protein": 26.0, "fat": 3.0, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_HORSE', 'Horse Meat', 'horse-meat', 'game'::ingredient_category,
   'Lean red meat, consumed in Central Asian, European, and Japanese cuisines',
   '{"calories": 133, "protein": 21.4, "fat": 4.6, "carbs": 0, "fiber": 0}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- BATCH 2: EXOTIC BIRDS (category: game)
-- =============================================================================

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_OSTRICH', 'Ostrich Meat', 'ostrich-meat', 'game'::ingredient_category,
   'Very lean red meat from ostrich, similar to beef in taste',
   '{"calories": 145, "protein": 26.9, "fat": 3.0, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_QUAIL_MEAT', 'Quail Meat', 'quail-meat', 'game'::ingredient_category,
   'Small game bird with delicate, slightly gamey flavor',
   '{"calories": 192, "protein": 25.1, "fat": 12.1, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_GUINEA_FOWL', 'Guinea Fowl Meat', 'guinea-fowl-meat', 'game'::ingredient_category,
   'Game bird meat with flavor between chicken and pheasant',
   '{"calories": 158, "protein": 23.4, "fat": 6.5, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_PHEASANT', 'Pheasant Meat', 'pheasant-meat', 'game'::ingredient_category,
   'Wild game bird with rich, slightly gamey flavor',
   '{"calories": 181, "protein": 32.4, "fat": 5.2, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_PARTRIDGE', 'Partridge Meat', 'partridge-meat', 'game'::ingredient_category,
   'Small game bird with delicate, slightly sweet flavor',
   '{"calories": 178, "protein": 28.6, "fat": 6.8, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_PIGEON', 'Pigeon Meat (Squab)', 'pigeon-squab-meat', 'game'::ingredient_category,
   'Young pigeon (squab) with rich, dark meat and delicate flavor',
   '{"calories": 142, "protein": 17.5, "fat": 7.5, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_GROUSE', 'Grouse Meat', 'grouse-meat', 'game'::ingredient_category,
   'Scottish game bird with intense, gamey flavor',
   '{"calories": 165, "protein": 29.0, "fat": 4.8, "carbs": 0, "fiber": 0}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- BATCH 3: REPTILES & AMPHIBIANS (category: game)
-- =============================================================================

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_CROCODILE', 'Crocodile Meat', 'crocodile-meat', 'game'::ingredient_category,
   'White meat from crocodile tail, mild flavor similar to chicken and fish',
   '{"calories": 104, "protein": 21.1, "fat": 1.9, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_FROG_LEGS', 'Frog Legs', 'frog-legs', 'game'::ingredient_category,
   'Delicate white meat, popular in French and Asian cuisines',
   '{"calories": 73, "protein": 16.4, "fat": 0.3, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_TURTLE', 'Turtle Meat', 'turtle-meat', 'game'::ingredient_category,
   'Traditional protein in Caribbean and Asian cuisines, various textures',
   '{"calories": 89, "protein": 19.8, "fat": 0.5, "carbs": 0, "fiber": 0}'::jsonb),

  ('ING_SNAKE', 'Snake Meat', 'snake-meat', 'game'::ingredient_category,
   'White meat consumed in Southeast Asian cuisines, similar to chicken',
   '{"calories": 93, "protein": 18.4, "fat": 1.6, "carbs": 0.5, "fiber": 0}'::jsonb),

  ('ING_IGUANA', 'Iguana Meat', 'iguana-meat', 'game'::ingredient_category,
   'Traditional protein in Central American cuisines, called "chicken of the trees"',
   '{"calories": 98, "protein": 22.0, "fat": 0.8, "carbs": 0, "fiber": 0}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- BATCH 4: EDIBLE INSECTS (category: proteins - sustainable protein source)
-- =============================================================================

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_CRICKETS', 'Crickets', 'crickets', 'proteins'::ingredient_category,
   'Edible crickets, high in protein and sustainable, used whole or as powder',
   '{"calories": 121, "protein": 12.9, "fat": 5.5, "carbs": 5.1, "fiber": 2.0}'::jsonb),

  ('ING_CRICKET_FLOUR', 'Cricket Flour', 'cricket-flour', 'proteins'::ingredient_category,
   'Ground cricket powder, high-protein flour alternative',
   '{"calories": 403, "protein": 61.0, "fat": 16.0, "carbs": 7.0, "fiber": 4.5}'::jsonb),

  ('ING_GRASSHOPPERS', 'Grasshoppers (Chapulines)', 'grasshoppers-chapulines', 'proteins'::ingredient_category,
   'Toasted grasshoppers, traditional Mexican delicacy from Oaxaca',
   '{"calories": 153, "protein": 20.6, "fat": 6.1, "carbs": 3.9, "fiber": 1.8}'::jsonb),

  ('ING_MEALWORMS', 'Mealworms', 'mealworms', 'proteins'::ingredient_category,
   'Edible beetle larvae, nutty flavor, used roasted or fried',
   '{"calories": 206, "protein": 18.7, "fat": 13.4, "carbs": 1.7, "fiber": 1.0}'::jsonb),

  ('ING_SILKWORMS', 'Silkworm Pupae (Beondegi)', 'silkworm-pupae-beondegi', 'proteins'::ingredient_category,
   'Steamed or boiled silkworm pupae, popular Korean street food',
   '{"calories": 94, "protein": 9.6, "fat": 5.1, "carbs": 2.3, "fiber": 0.5}'::jsonb),

  ('ING_ANTS', 'Edible Ants', 'edible-ants', 'proteins'::ingredient_category,
   'Leaf-cutter ants and similar species, nutty citrus flavor',
   '{"calories": 102, "protein": 14.3, "fat": 3.5, "carbs": 2.9, "fiber": 0.5}'::jsonb),

  ('ING_LOCUSTS', 'Locusts', 'locusts', 'proteins'::ingredient_category,
   'Edible locusts, traditional protein in Middle Eastern and African cuisines',
   '{"calories": 179, "protein": 14.3, "fat": 11.5, "carbs": 2.2, "fiber": 1.2}'::jsonb),

  ('ING_SCORPIONS', 'Scorpions', 'scorpions', 'proteins'::ingredient_category,
   'Edible scorpions, deep-fried street food in Asian cuisines',
   '{"calories": 150, "protein": 15.0, "fat": 8.0, "carbs": 2.0, "fiber": 0.5}'::jsonb),

  ('ING_BAMBOO_WORMS', 'Bamboo Worms', 'bamboo-worms', 'proteins'::ingredient_category,
   'Moth larvae harvested from bamboo, popular in Thailand',
   '{"calories": 165, "protein": 15.5, "fat": 10.2, "carbs": 2.8, "fiber": 0.8}'::jsonb),

  ('ING_WATER_BUGS', 'Giant Water Bugs (Mangda)', 'giant-water-bugs-mangda', 'proteins'::ingredient_category,
   'Large aquatic insects, Thai delicacy with unique flavor',
   '{"calories": 135, "protein": 19.8, "fat": 5.5, "carbs": 1.0, "fiber": 0.3}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- VERIFICATION
-- =============================================================================

SELECT 'EXOTIC MAMMALS (game)' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_BISON', 'ING_BUFFALO', 'ING_YAK', 'ING_VENISON', 'ING_MOOSE',
             'ING_ELK', 'ING_ANTELOPE', 'ING_HARE', 'ING_WILD_BOAR', 'ING_CAMEL', 'ING_HORSE')

UNION ALL

SELECT 'EXOTIC BIRDS (game)' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_OSTRICH', 'ING_QUAIL_MEAT', 'ING_GUINEA_FOWL', 'ING_PHEASANT',
             'ING_PARTRIDGE', 'ING_PIGEON', 'ING_GROUSE')

UNION ALL

SELECT 'REPTILES & AMPHIBIANS (game)' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_CROCODILE', 'ING_FROG_LEGS', 'ING_TURTLE', 'ING_SNAKE', 'ING_IGUANA')

UNION ALL

SELECT 'EDIBLE INSECTS (proteins)' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_CRICKETS', 'ING_CRICKET_FLOUR', 'ING_GRASSHOPPERS', 'ING_MEALWORMS',
             'ING_SILKWORMS', 'ING_ANTS', 'ING_LOCUSTS', 'ING_SCORPIONS',
             'ING_BAMBOO_WORMS', 'ING_WATER_BUGS')

UNION ALL

SELECT 'TOTAL GAME CATEGORY' as batch, COUNT(*) as count
FROM ingredients WHERE category = 'game'

UNION ALL

SELECT 'TOTAL PROTEINS CATEGORY' as batch, COUNT(*) as count
FROM ingredients WHERE category = 'proteins';
