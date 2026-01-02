-- =============================================================================
-- MIGRATION: Fruits & Nuts Expansion
-- Date: 2025-12-27
-- Purpose: Add missing common fruits, melons, tropical fruits, and nuts/seeds
-- =============================================================================

-- =============================================================================
-- BATCH 1: MELONS (category: fruits)
-- =============================================================================

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_CANTALOUPE', 'Cantaloupe', 'cantaloupe', 'fruits'::ingredient_category,
   'Sweet orange-fleshed melon, high in vitamin A and C',
   '{"calories": 34, "protein": 0.8, "fat": 0.2, "carbs": 8.2, "fiber": 0.9}'::jsonb),

  ('ING_HONEYDEW', 'Honeydew Melon', 'honeydew-melon', 'fruits'::ingredient_category,
   'Sweet green-fleshed melon with smooth texture',
   '{"calories": 36, "protein": 0.5, "fat": 0.1, "carbs": 9.1, "fiber": 0.8}'::jsonb),

  ('ING_GALIA_MELON', 'Galia Melon', 'galia-melon', 'fruits'::ingredient_category,
   'Israeli hybrid melon with green flesh and netted skin',
   '{"calories": 34, "protein": 0.8, "fat": 0.2, "carbs": 8.0, "fiber": 0.9}'::jsonb),

  ('ING_CANARY_MELON', 'Canary Melon', 'canary-melon', 'fruits'::ingredient_category,
   'Bright yellow oval melon with pale green flesh',
   '{"calories": 36, "protein": 0.6, "fat": 0.1, "carbs": 8.8, "fiber": 0.8}'::jsonb),

  ('ING_CRENSHAW_MELON', 'Crenshaw Melon', 'crenshaw-melon', 'fruits'::ingredient_category,
   'Large hybrid melon with salmon-colored flesh',
   '{"calories": 35, "protein": 0.7, "fat": 0.1, "carbs": 8.5, "fiber": 0.9}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- BATCH 2: CITRUS & STONE FRUITS (category: fruits)
-- =============================================================================

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_NECTARINE', 'Nectarine', 'nectarine', 'fruits'::ingredient_category,
   'Smooth-skinned stone fruit similar to peach',
   '{"calories": 44, "protein": 1.1, "fat": 0.3, "carbs": 10.6, "fiber": 1.7}'::jsonb),

  ('ING_CLEMENTINE', 'Clementine', 'clementine', 'fruits'::ingredient_category,
   'Small seedless citrus, easy to peel',
   '{"calories": 47, "protein": 0.9, "fat": 0.2, "carbs": 12.0, "fiber": 1.7}'::jsonb),

  ('ING_TANGERINE', 'Tangerine', 'tangerine', 'fruits'::ingredient_category,
   'Sweet citrus fruit with loose skin',
   '{"calories": 53, "protein": 0.8, "fat": 0.3, "carbs": 13.3, "fiber": 1.8}'::jsonb),

  ('ING_POMELO', 'Pomelo', 'pomelo', 'fruits'::ingredient_category,
   'Large citrus fruit, ancestor of grapefruit',
   '{"calories": 38, "protein": 0.8, "fat": 0.0, "carbs": 9.6, "fiber": 1.0}'::jsonb),

  ('ING_BLOOD_ORANGE', 'Blood Orange', 'blood-orange', 'fruits'::ingredient_category,
   'Citrus with deep red flesh and berry notes',
   '{"calories": 50, "protein": 1.0, "fat": 0.2, "carbs": 12.0, "fiber": 2.4}'::jsonb),

  ('ING_MEYER_LEMON', 'Meyer Lemon', 'meyer-lemon', 'fruits'::ingredient_category,
   'Sweeter lemon variety, cross between lemon and mandarin',
   '{"calories": 29, "protein": 1.1, "fat": 0.3, "carbs": 9.3, "fiber": 2.8}'::jsonb),

  ('ING_KEY_LIME', 'Key Lime', 'key-lime', 'fruits'::ingredient_category,
   'Small aromatic lime used in Key Lime Pie',
   '{"calories": 30, "protein": 0.7, "fat": 0.2, "carbs": 10.5, "fiber": 2.8}'::jsonb),

  ('ING_SATSUMA', 'Satsuma', 'satsuma', 'fruits'::ingredient_category,
   'Japanese seedless mandarin, very sweet',
   '{"calories": 47, "protein": 0.8, "fat": 0.2, "carbs": 11.5, "fiber": 1.8}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- BATCH 3: TROPICAL & EXOTIC FRUITS (category: fruits)
-- =============================================================================

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_DURIAN', 'Durian', 'durian', 'fruits'::ingredient_category,
   'Southeast Asian fruit with strong aroma and custard-like flesh',
   '{"calories": 147, "protein": 1.5, "fat": 5.3, "carbs": 27.1, "fiber": 3.8}'::jsonb),

  ('ING_RAMBUTAN', 'Rambutan', 'rambutan', 'fruits'::ingredient_category,
   'Hairy red fruit with translucent sweet flesh, similar to lychee',
   '{"calories": 68, "protein": 0.9, "fat": 0.2, "carbs": 16.5, "fiber": 0.9}'::jsonb),

  ('ING_LONGAN', 'Longan', 'longan', 'fruits'::ingredient_category,
   'Dragon eye fruit, similar to lychee but smaller',
   '{"calories": 60, "protein": 1.3, "fat": 0.1, "carbs": 15.1, "fiber": 1.1}'::jsonb),

  ('ING_MANGOSTEEN', 'Mangosteen', 'mangosteen', 'fruits'::ingredient_category,
   'Queen of fruits, white segmented flesh with sweet-sour taste',
   '{"calories": 73, "protein": 0.4, "fat": 0.6, "carbs": 18.0, "fiber": 1.8}'::jsonb),

  ('ING_STARFRUIT', 'Starfruit (Carambola)', 'starfruit-carambola', 'fruits'::ingredient_category,
   'Star-shaped tropical fruit with crisp, juicy flesh',
   '{"calories": 31, "protein": 1.0, "fat": 0.3, "carbs": 6.7, "fiber": 2.8}'::jsonb),

  ('ING_SAPODILLA', 'Sapodilla', 'sapodilla', 'fruits'::ingredient_category,
   'Brown fruit with sweet malty flavor, also called chikoo',
   '{"calories": 83, "protein": 0.4, "fat": 1.1, "carbs": 20.0, "fiber": 5.3}'::jsonb),

  ('ING_BREADFRUIT', 'Breadfruit', 'breadfruit', 'fruits'::ingredient_category,
   'Starchy tropical fruit, cooked like a vegetable',
   '{"calories": 103, "protein": 1.1, "fat": 0.2, "carbs": 27.1, "fiber": 4.9}'::jsonb),

  ('ING_ATEMOYA', 'Atemoya', 'atemoya', 'fruits'::ingredient_category,
   'Hybrid of cherimoya and sugar apple, creamy texture',
   '{"calories": 94, "protein": 1.6, "fat": 0.4, "carbs": 23.6, "fiber": 2.4}'::jsonb),

  ('ING_FEIJOA', 'Feijoa (Pineapple Guava)', 'feijoa-pineapple-guava', 'fruits'::ingredient_category,
   'Green fruit with aromatic flesh, hints of pineapple and guava',
   '{"calories": 55, "protein": 1.0, "fat": 0.6, "carbs": 13.0, "fiber": 6.4}'::jsonb),

  ('ING_SALAK', 'Salak (Snake Fruit)', 'salak-snake-fruit', 'fruits'::ingredient_category,
   'Indonesian fruit with scaly brown skin and crisp flesh',
   '{"calories": 82, "protein": 0.4, "fat": 0.4, "carbs": 22.0, "fiber": 0.3}'::jsonb),

  ('ING_LANGSAT', 'Langsat', 'langsat', 'fruits'::ingredient_category,
   'Small Southeast Asian fruit with translucent sweet-sour flesh',
   '{"calories": 60, "protein": 1.0, "fat": 0.2, "carbs": 14.2, "fiber": 2.3}'::jsonb),

  ('ING_CEMPEDAK', 'Cempedak', 'cempedak', 'fruits'::ingredient_category,
   'Relative of jackfruit with stronger aroma and sweeter taste',
   '{"calories": 116, "protein": 2.0, "fat": 0.3, "carbs": 28.0, "fiber": 1.5}'::jsonb),

  ('ING_SANTOL', 'Santol', 'santol', 'fruits'::ingredient_category,
   'Cotton fruit from Southeast Asia, sweet-sour flavor',
   '{"calories": 88, "protein": 0.6, "fat": 0.1, "carbs": 22.7, "fiber": 1.0}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- BATCH 4: BERRIES & SMALL FRUITS (category: fruits)
-- =============================================================================

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_MULBERRY', 'Mulberry', 'mulberry', 'fruits'::ingredient_category,
   'Sweet berry from mulberry tree, similar to blackberry',
   '{"calories": 43, "protein": 1.4, "fat": 0.4, "carbs": 9.8, "fiber": 1.7}'::jsonb),

  ('ING_GOOSEBERRY', 'Gooseberry', 'gooseberry', 'fruits'::ingredient_category,
   'Small tart berry used in jams and desserts',
   '{"calories": 44, "protein": 0.9, "fat": 0.6, "carbs": 10.2, "fiber": 4.3}'::jsonb),

  ('ING_BOYSENBERRY', 'Boysenberry', 'boysenberry', 'fruits'::ingredient_category,
   'Cross between raspberry, blackberry, and loganberry',
   '{"calories": 43, "protein": 1.4, "fat": 0.5, "carbs": 9.6, "fiber": 5.3}'::jsonb),

  ('ING_LOGANBERRY', 'Loganberry', 'loganberry', 'fruits'::ingredient_category,
   'Hybrid of blackberry and raspberry',
   '{"calories": 43, "protein": 1.5, "fat": 0.5, "carbs": 9.6, "fiber": 5.3}'::jsonb),

  ('ING_MARIONBERRY', 'Marionberry', 'marionberry', 'fruits'::ingredient_category,
   'Oregon blackberry variety with complex flavor',
   '{"calories": 43, "protein": 1.4, "fat": 0.5, "carbs": 9.6, "fiber": 5.3}'::jsonb),

  ('ING_ELDERBERRY', 'Elderberry', 'elderberry', 'fruits'::ingredient_category,
   'Dark purple berry used in syrups, wines, and medicine',
   '{"calories": 73, "protein": 0.7, "fat": 0.5, "carbs": 18.4, "fiber": 7.0}'::jsonb),

  ('ING_ACEROLA', 'Acerola (Barbados Cherry)', 'acerola-barbados-cherry', 'fruits'::ingredient_category,
   'Super fruit extremely high in vitamin C',
   '{"calories": 32, "protein": 0.4, "fat": 0.3, "carbs": 7.7, "fiber": 1.1}'::jsonb),

  ('ING_JABUTICABA', 'Jabuticaba', 'jabuticaba', 'fruits'::ingredient_category,
   'Brazilian grape-like fruit that grows directly on trunk',
   '{"calories": 43, "protein": 0.3, "fat": 0.1, "carbs": 12.6, "fiber": 0.9}'::jsonb),

  ('ING_ACAI_FRESH', 'Fresh Acai', 'fresh-acai', 'fruits'::ingredient_category,
   'Fresh acai berry before processing',
   '{"calories": 70, "protein": 1.0, "fat": 5.0, "carbs": 4.0, "fiber": 2.0}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- BATCH 5: NUTS (category: nuts) - Fix cashew and add missing
-- =============================================================================

-- First, fix ING_CASHEW category from 'other' to 'nuts'
UPDATE ingredients SET category = 'nuts'::ingredient_category WHERE id = 'ING_CASHEW';

-- Fix ING_CHESTNUT category from 'spices' to 'nuts'
UPDATE ingredients SET category = 'nuts'::ingredient_category WHERE id = 'ING_CHESTNUT';

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_BRAZIL_NUT', 'Brazil Nut', 'brazil-nut', 'nuts'::ingredient_category,
   'Large South American nut, highest natural source of selenium',
   '{"calories": 656, "protein": 14.3, "fat": 66.4, "carbs": 12.3, "fiber": 7.5}'::jsonb),

  ('ING_COCONUT_MEAT', 'Coconut Meat', 'coconut-meat', 'nuts'::ingredient_category,
   'Fresh white flesh of coconut',
   '{"calories": 354, "protein": 3.3, "fat": 33.5, "carbs": 15.2, "fiber": 9.0}'::jsonb),

  ('ING_DRIED_COCONUT', 'Dried Coconut (Desiccated)', 'dried-coconut-desiccated', 'nuts'::ingredient_category,
   'Dehydrated shredded coconut meat',
   '{"calories": 660, "protein": 6.9, "fat": 64.5, "carbs": 23.6, "fiber": 16.3}'::jsonb),

  ('ING_ROASTED_CHESTNUTS', 'Roasted Chestnuts', 'roasted-chestnuts', 'nuts'::ingredient_category,
   'Cooked chestnuts with sweet, starchy flavor',
   '{"calories": 245, "protein": 3.2, "fat": 2.2, "carbs": 53.0, "fiber": 5.1}'::jsonb),

  ('ING_BLANCHED_ALMONDS', 'Blanched Almonds', 'blanched-almonds', 'nuts'::ingredient_category,
   'Almonds with skin removed',
   '{"calories": 590, "protein": 21.4, "fat": 52.5, "carbs": 18.7, "fiber": 10.0}'::jsonb),

  ('ING_ROASTED_HAZELNUTS', 'Roasted Hazelnuts', 'roasted-hazelnuts', 'nuts'::ingredient_category,
   'Toasted hazelnuts with enhanced flavor',
   '{"calories": 646, "protein": 15.0, "fat": 62.4, "carbs": 17.6, "fiber": 9.4}'::jsonb),

  ('ING_ROASTED_PISTACHIOS', 'Roasted Pistachios', 'roasted-pistachios', 'nuts'::ingredient_category,
   'Toasted pistachios, salted or unsalted',
   '{"calories": 572, "protein": 21.1, "fat": 45.8, "carbs": 28.0, "fiber": 10.3}'::jsonb),

  ('ING_CANDIED_WALNUTS', 'Candied Walnuts', 'candied-walnuts', 'nuts'::ingredient_category,
   'Sugar-coated walnuts for salads and desserts',
   '{"calories": 500, "protein": 8.0, "fat": 35.0, "carbs": 42.0, "fiber": 4.0}'::jsonb),

  ('ING_GROUNDNUT', 'Groundnut', 'groundnut', 'nuts'::ingredient_category,
   'Alternative name for peanut, common in African cuisine',
   '{"calories": 567, "protein": 25.8, "fat": 49.2, "carbs": 16.1, "fiber": 8.5}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- BATCH 6: SEEDS (category: seeds - verify exists, else use nuts)
-- =============================================================================

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES
  ('ING_POPPY_SEEDS', 'Poppy Seeds', 'poppy-seeds', 'seeds'::ingredient_category,
   'Tiny oil-rich seeds used in baking and cooking',
   '{"calories": 525, "protein": 18.0, "fat": 41.6, "carbs": 28.1, "fiber": 19.5}'::jsonb),

  ('ING_CARAWAY_SEEDS', 'Caraway Seeds', 'caraway-seeds', 'seeds'::ingredient_category,
   'Aromatic seeds used in bread and Central European cuisine',
   '{"calories": 333, "protein": 19.8, "fat": 14.6, "carbs": 49.9, "fiber": 38.0}'::jsonb),

  ('ING_FENNEL_SEEDS', 'Fennel Seeds', 'fennel-seeds', 'seeds'::ingredient_category,
   'Aromatic seeds with anise-like flavor',
   '{"calories": 345, "protein": 15.8, "fat": 14.9, "carbs": 52.3, "fiber": 39.8}'::jsonb),

  ('ING_CELERY_SEEDS', 'Celery Seeds', 'celery-seeds', 'seeds'::ingredient_category,
   'Strong-flavored seeds used as spice',
   '{"calories": 392, "protein": 18.1, "fat": 25.3, "carbs": 41.4, "fiber": 11.8}'::jsonb),

  ('ING_WATERMELON_SEEDS', 'Watermelon Seeds', 'watermelon-seeds', 'seeds'::ingredient_category,
   'Nutritious seeds, popular roasted in Middle East and Asia',
   '{"calories": 557, "protein": 28.3, "fat": 47.4, "carbs": 15.3, "fiber": 0.0}'::jsonb),

  ('ING_LOTUS_SEEDS', 'Lotus Seeds', 'lotus-seeds', 'seeds'::ingredient_category,
   'Seeds used in Asian desserts and soups',
   '{"calories": 89, "protein": 4.1, "fat": 0.5, "carbs": 17.3, "fiber": 0.3}'::jsonb),

  ('ING_BASIL_SEEDS', 'Basil Seeds (Sabja)', 'basil-seeds-sabja', 'seeds'::ingredient_category,
   'Seeds that gel in water, used in drinks and desserts',
   '{"calories": 380, "protein": 14.8, "fat": 13.8, "carbs": 63.8, "fiber": 22.6}'::jsonb),

  ('ING_QUINOA', 'Quinoa Seeds', 'quinoa-seeds', 'seeds'::ingredient_category,
   'Ancient grain-like seed, complete protein source',
   '{"calories": 368, "protein": 14.1, "fat": 6.1, "carbs": 64.2, "fiber": 7.0}'::jsonb),

  ('ING_AMARANTH_SEEDS', 'Amaranth Seeds', 'amaranth-seeds', 'seeds'::ingredient_category,
   'Ancient grain seed, high in protein and lysine',
   '{"calories": 371, "protein": 13.6, "fat": 7.0, "carbs": 65.2, "fiber": 6.7}'::jsonb),

  ('ING_SACHA_INCHI', 'Sacha Inchi Seeds', 'sacha-inchi-seeds', 'seeds'::ingredient_category,
   'Peruvian superfood seeds, high in omega-3',
   '{"calories": 562, "protein": 27.0, "fat": 35.2, "carbs": 18.0, "fiber": 10.0}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- VERIFICATION
-- =============================================================================

SELECT 'MELONS' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_CANTALOUPE', 'ING_HONEYDEW', 'ING_GALIA_MELON', 'ING_CANARY_MELON', 'ING_CRENSHAW_MELON')

UNION ALL

SELECT 'CITRUS & STONE' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_NECTARINE', 'ING_CLEMENTINE', 'ING_TANGERINE', 'ING_POMELO', 'ING_BLOOD_ORANGE',
             'ING_MEYER_LEMON', 'ING_KEY_LIME', 'ING_SATSUMA')

UNION ALL

SELECT 'TROPICAL' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_DURIAN', 'ING_RAMBUTAN', 'ING_LONGAN', 'ING_MANGOSTEEN', 'ING_STARFRUIT',
             'ING_SAPODILLA', 'ING_BREADFRUIT', 'ING_ATEMOYA', 'ING_FEIJOA', 'ING_SALAK',
             'ING_LANGSAT', 'ING_CEMPEDAK', 'ING_SANTOL')

UNION ALL

SELECT 'BERRIES' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_MULBERRY', 'ING_GOOSEBERRY', 'ING_BOYSENBERRY', 'ING_LOGANBERRY', 'ING_MARIONBERRY',
             'ING_ELDERBERRY', 'ING_ACEROLA', 'ING_JABUTICABA', 'ING_ACAI_FRESH')

UNION ALL

SELECT 'NUTS (new)' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_BRAZIL_NUT', 'ING_COCONUT_MEAT', 'ING_DRIED_COCONUT', 'ING_ROASTED_CHESTNUTS',
             'ING_BLANCHED_ALMONDS', 'ING_ROASTED_HAZELNUTS', 'ING_ROASTED_PISTACHIOS',
             'ING_CANDIED_WALNUTS', 'ING_GROUNDNUT')

UNION ALL

SELECT 'SEEDS (new)' as batch, COUNT(*) as count
FROM ingredients
WHERE id IN ('ING_POPPY_SEEDS', 'ING_CARAWAY_SEEDS', 'ING_FENNEL_SEEDS', 'ING_CELERY_SEEDS',
             'ING_WATERMELON_SEEDS', 'ING_LOTUS_SEEDS', 'ING_BASIL_SEEDS', 'ING_QUINOA',
             'ING_AMARANTH_SEEDS', 'ING_SACHA_INCHI')

UNION ALL

SELECT 'TOTAL FRUITS' as batch, COUNT(*) as count
FROM ingredients WHERE category = 'fruits'

UNION ALL

SELECT 'TOTAL NUTS' as batch, COUNT(*) as count
FROM ingredients WHERE category = 'nuts'

UNION ALL

SELECT 'TOTAL SEEDS' as batch, COUNT(*) as count
FROM ingredients WHERE category = 'seeds';
