-- Chilean Cuisine Database - Script 01: New Ingredients
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- New ingredients: 15

-- Chilean-specific ingredients

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_ABALONE', 'Chilean Abalone (Locos)', 'abalone', 'seafood',
  'Chilean abalone, prized shellfish with tender meat',
  '{"calories": 105, "protein": 17, "carbs": 6, "fat": 1, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_AGUARDIENTE', 'Aguardiente', 'aguardiente', 'spirits',
  'Chilean grape-based spirit used in cola de mono',
  '{"calories": 231, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_BREAM', 'Bream (Reineta)', 'bream', 'seafood',
  'Popular Chilean white fish',
  '{"calories": 135, "protein": 22, "carbs": 0, "fat": 5, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_CHERIMOYA', 'Cherimoya', 'cherimoya', 'fruits',
  'Creamy tropical fruit native to Andes',
  '{"calories": 75, "protein": 2, "carbs": 18, "fat": 1, "fiber": 3}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_CONGER_EEL', 'Conger Eel (Congrio)', 'conger-eel', 'seafood',
  'Chilean conger eel, essential for caldillo de congrio',
  '{"calories": 112, "protein": 23, "carbs": 0, "fat": 2, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_CORVINA', 'Corvina', 'corvina', 'seafood',
  'White fish commonly used for Chilean ceviche',
  '{"calories": 92, "protein": 20, "carbs": 0, "fat": 1, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_CRANBERRY_BEANS', 'Cranberry Beans (Porotos)', 'cranberry-beans', 'legumes',
  'Fresh shell beans used in porotos granados',
  '{"calories": 136, "protein": 9, "carbs": 25, "fat": 0, "fiber": 7}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_DRIED_PEACH', 'Dried Peach (Huesillo)', 'dried-peach', 'fruits',
  'Sun-dried peaches for mote con huesillo',
  '{"calories": 239, "protein": 3, "carbs": 63, "fat": 0, "fiber": 8}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_DULCE_DE_LECHE', 'Dulce de Leche', 'dulce-de-leche', 'sweeteners',
  'Caramelized milk spread, manjar in Chile',
  '{"calories": 315, "protein": 7, "carbs": 55, "fat": 8, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_HOT_DOG', 'Hot Dog Sausage', 'hot-dog', 'proteins',
  'Frankfurter sausage for completo',
  '{"calories": 290, "protein": 10, "carbs": 2, "fat": 26, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_HOT_DOG_BUN', 'Hot Dog Bun', 'hot-dog-bun', 'bread',
  'Soft bread bun for completo',
  '{"calories": 140, "protein": 5, "carbs": 26, "fat": 2, "fiber": 1}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_PISCO', 'Pisco', 'pisco', 'spirits',
  'Chilean grape brandy for pisco sour',
  '{"calories": 230, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_RAZOR_CLAM', 'Razor Clam (Machas)', 'razor-clam', 'seafood',
  'Chilean razor clam for machas a la parmesana',
  '{"calories": 74, "protein": 13, "carbs": 3, "fat": 1, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_SEA_URCHIN', 'Sea Urchin (Erizos)', 'sea-urchin', 'seafood',
  'Chilean sea urchin roe, coastal delicacy',
  '{"calories": 120, "protein": 13, "carbs": 3, "fat": 6, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_WHEAT_BERRIES', 'Wheat Berries (Mote)', 'wheat-berries', 'grains',
  'Husked wheat kernels for mote con huesillo',
  '{"calories": 339, "protein": 13, "carbs": 72, "fat": 2, "fiber": 12}'
) ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Chilean ingredients inserted: 15 records' AS status;
