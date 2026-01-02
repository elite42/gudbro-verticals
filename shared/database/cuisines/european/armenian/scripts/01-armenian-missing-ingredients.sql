-- ============================================
-- ARMENIAN DATABASE - Missing Ingredients
-- ============================================
-- 21 new ingredients for Armenian cuisine
-- Run AFTER 00-armenian-schema.sql
-- ============================================

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
VALUES
  -- FRUITS & DRIED FRUITS
  ('ING_APRICOTS', 'apricots', 'Apricots', 'Sweet stone fruit, Armenia is the original home of apricots', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_DRIED_APRICOTS', 'dried-apricots', 'Dried Apricots', 'Sun-dried apricots used in Armenian stews and desserts', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_DRIED_PEACHES', 'dried-peaches', 'Dried Peaches', 'Sun-dried peaches used in Armenian sweets like alani', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_PLUMS', 'plums', 'Plums', 'Stone fruit used fresh or dried in Armenian cuisine', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_PRUNES', 'prunes', 'Prunes (Dried Plums)', 'Dried plums used in Armenian stews and pilaf', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_QUINCE', 'quince', 'Quince', 'Fragrant golden fruit used in Armenian tolma and preserves', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_GRAPE_JUICE', 'grape-juice', 'Grape Juice', 'Fresh or concentrated grape juice used for sujukh candy', 'juices', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- VEGETABLES & HERBS
  ('ING_BEET', 'beet', 'Beetroot', 'Deep red root vegetable used in Armenian salads', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_SORREL', 'sorrel', 'Sorrel', 'Tart leafy green herb used in Armenian soups and breads', 'herbs', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_AVELUK', 'aveluk', 'Aveluk (Wild Sorrel)', 'Armenian mountain sorrel, dried and braided, unique tangy flavor', 'herbs', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- PROTEINS & OFFAL
  ('ING_BEEF_FEET', 'beef-feet', 'Beef Feet', 'Cow feet used to make khash, rich in collagen', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_BEEF_EYE_ROUND', 'beef-eye-round', 'Beef Eye Round', 'Lean cut of beef used for basturma cured meat', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_BEEF_HEART', 'beef-heart', 'Beef Heart', 'Organ meat used in Armenian tjvjik dishes', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_LAMB_LIVER', 'lamb-liver', 'Lamb Liver', 'Organ meat used in Armenian khorovats and tjvjik', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),

  -- DAIRY & CHEESE
  ('ING_FETA_CHEESE', 'feta-cheese', 'Feta Cheese', 'Brined white cheese used in Armenian cheese beureg', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_STRING_CHEESE', 'string-cheese', 'Armenian String Cheese', 'Braided cheese often flavored with nigella or mahleb seeds', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- GRAINS & SPECIALTY
  ('ING_WHEAT_BERRIES', 'wheat-berries', 'Wheat Berries', 'Whole wheat kernels used in Armenian harissa and anoushabour', 'grains', '{"gluten": true}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),
  ('ING_TARKHANA', 'tarkhana', 'Tarkhana', 'Fermented dried yogurt and wheat mixture for soup base', 'grains', '{"gluten": true, "dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),
  ('ING_LAVASH', 'lavash-bread', 'Lavash Bread', 'UNESCO-recognized Armenian flatbread, thin and versatile', 'bread', '{"gluten": true}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),

  -- SPICES & SEASONINGS
  ('ING_FENUGREEK', 'fenugreek', 'Fenugreek', 'Aromatic spice essential for basturma chaman coating', 'spices', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- BAKING
  ('ING_BAKING_SODA', 'baking-soda', 'Baking Soda', 'Leavening agent used in Armenian gata and pastries', 'spices', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  allergens = EXCLUDED.allergens,
  dietary = EXCLUDED.dietary;

-- ============================================
-- 21 ingredients added/updated
-- Next: Run 02-armenian-data.sql
-- ============================================
