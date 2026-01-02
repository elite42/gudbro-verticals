-- ============================================
-- ITALIAN CUISINE - Missing Ingredients
-- GUDBRO Database Standards v1.7
-- ============================================
-- 29 ingredients needed for Italian cuisine recipes

INSERT INTO ingredients (id, slug, name, category, is_common, allergens)
VALUES
  -- Vegetables & Greens
  ('ING_CAVOLO_NERO', 'cavolo-nero', 'Tuscan Kale (Cavolo Nero)', 'vegetables', true, '[]'),
  ('ING_CHICORY', 'chicory', 'Chicory', 'vegetables', true, '[]'),
  ('ING_ESCAROLE', 'escarole', 'Escarole', 'vegetables', true, '[]'),
  ('ING_SWISS_CHARD', 'swiss-chard', 'Swiss Chard', 'vegetables', true, '[]'),

  -- Legumes
  ('ING_BORLOTTI_BEAN', 'borlotti-bean', 'Borlotti Bean (Cranberry Bean)', 'legumes', true, '[]'),

  -- Herbs & Spices
  ('ING_CLOVE', 'clove', 'Clove', 'spices', true, '[]'),
  ('ING_FENNEL_SEED', 'fennel-seed', 'Fennel Seed', 'spices', false, '[]'),

  -- Meats
  ('ING_BEEF_STEAK', 'beef-steak', 'Beef Steak', 'proteins', true, '[]'),
  ('ING_CALF_LIVER', 'calf-liver', 'Calf Liver', 'proteins', false, '[]'),
  ('ING_COTECHINO', 'cotechino', 'Cotechino (Italian Pork Sausage)', 'proteins', false, '[]'),
  ('ING_OXTAIL', 'oxtail', 'Oxtail', 'proteins', false, '[]'),
  ('ING_RABBIT', 'rabbit', 'Rabbit', 'proteins', false, '[]'),
  ('ING_TRIPE', 'tripe', 'Tripe', 'proteins', false, '[]'),
  ('ING_VEAL_CUTLET', 'veal-cutlet', 'Veal Cutlet', 'proteins', false, '[]'),

  -- Seafood
  ('ING_MIXED_FISH', 'mixed-fish', 'Mixed Fish', 'proteins', false, '["fish"]'),

  -- Grains & Starches
  ('ING_BREADCRUMB', 'breadcrumb', 'Breadcrumb', 'grains', true, '["gluten"]'),
  ('ING_FRISELLA', 'frisella', 'Frisella (Dried Bread Ring)', 'grains', false, '["gluten"]'),
  ('ING_POLENTA', 'polenta', 'Polenta (Cornmeal)', 'grains', true, '[]'),
  ('ING_WHEAT_BERRIES', 'wheat-berries', 'Wheat Berries', 'grains', false, '["gluten"]'),

  -- Bakery Items
  ('ING_SPONGE_CAKE', 'sponge-cake', 'Sponge Cake (Pan di Spagna)', 'bread', false, '["gluten", "eggs"]'),

  -- Fruits & Dried Fruits
  ('ING_CANDIED_FRUIT', 'candied-fruit', 'Candied Fruit', 'fruits', true, '[]'),
  ('ING_CANDIED_ORANGE', 'candied-orange', 'Candied Orange Peel', 'fruits', false, '[]'),
  ('ING_RAISIN', 'raisin', 'Raisins', 'fruits', true, '[]'),

  -- Condiments & Prepared
  ('ING_CAPERS', 'capers', 'Capers', 'condiments', true, '[]'),
  ('ING_MARZIPAN', 'marzipan', 'Marzipan', 'condiments', false, '["nuts"]'),
  ('ING_ORANGE_BLOSSOM', 'orange-blossom', 'Orange Blossom Water', 'condiments', false, '[]'),
  ('ING_CHOCOLATE_CREAM', 'chocolate-cream', 'Chocolate Cream', 'dairy', false, '["milk"]'),

  -- Wines & Spirits
  ('ING_ALCHERMES', 'alchermes', 'Alchermes (Italian Liqueur)', 'liqueurs', false, '[]'),

  -- Nuts (bitter variety)
  ('ING_BITTER_ALMOND', 'bitter-almond', 'Bitter Almond', 'nuts', false, '["nuts"]')

ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  is_common = EXCLUDED.is_common,
  allergens = EXCLUDED.allergens;
