-- ============================================
-- GEORGIAN DATABASE - Missing Ingredients
-- ============================================
-- New ingredients for Georgian cuisine
-- Run AFTER 00-georgian-schema.sql
-- Some may already exist from Armenian import
-- ============================================

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
VALUES
  -- GEORGIAN CHEESES
  ('ING_SULGUNI_CHEESE', 'sulguni-cheese', 'Sulguni Cheese', 'Georgian brined stretched-curd cheese, similar to mozzarella but saltier', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_IMERULI_CHEESE', 'imeruli-cheese', 'Imeruli Cheese', 'Fresh Georgian cheese from Imereti region, soft and slightly tangy', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_GUDA_CHEESE', 'guda-cheese', 'Guda Cheese', 'Georgian sheep cheese aged in sheepskin bags, sharp and distinctive', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_MATSONI', 'matsoni', 'Matsoni (Georgian Yogurt)', 'Traditional Georgian fermented milk product, tangy and thick', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- GEORGIAN SAUCES & CONDIMENTS
  ('ING_TKEMALI', 'tkemali-plums', 'Tkemali (Sour Plums)', 'Wild cherry plums used for the famous Georgian tkemali sauce', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_ADJIKA', 'adjika-paste', 'Adjika Paste', 'Fiery Georgian hot pepper paste with garlic and spices', 'spices', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- GEORGIAN UNIQUE ITEMS
  ('ING_JONJOLI', 'jonjoli', 'Jonjoli (Bladdernut Flowers)', 'Pickled bladdernut flowers, unique Georgian delicacy', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_CHURCHKHELA', 'churchkhela', 'Churchkhela', 'Georgian walnut candy coated in grape juice, national sweet', 'fruits', '{"tree_nuts": true}'::JSONB, '{"vegan": true, "nut_free": false, "dairy_free": true, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),
  ('ING_GREEN_WALNUTS', 'green-walnuts', 'Green Walnuts', 'Unripe walnuts used for Georgian muraba preserve', 'fruits', '{"tree_nuts": true}'::JSONB, '{"vegan": true, "nut_free": false, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- HERBS & SPICES
  ('ING_PENNYROYAL', 'pennyroyal', 'Pennyroyal (Ombalo)', 'Aromatic herb essential for authentic tkemali sauce', 'herbs', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_TARRAGON', 'tarragon', 'Tarragon', 'Aromatic herb essential for chakapuli and Georgian cuisine', 'herbs', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_DILL_SEEDS', 'dill-seeds', 'Dill Seeds', 'Seeds used in Georgian spice blends and pickles', 'spices', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_CORIANDER', 'coriander-seeds', 'Coriander Seeds', 'Ground coriander seeds essential in Georgian cooking', 'spices', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_CLOVES', 'cloves', 'Cloves', 'Aromatic spice used in Georgian satsivi and desserts', 'spices', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_HOT_PEPPER', 'hot-pepper', 'Hot Pepper', 'Fresh or dried hot peppers used in Georgian spicy dishes', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- PROTEINS
  ('ING_GROUND_LAMB', 'ground-lamb', 'Ground Lamb', 'Minced lamb meat used in khinkali and dolma', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_LAMB_SHOULDER', 'lamb-shoulder', 'Lamb Shoulder', 'Shoulder cut of lamb for stews and grilling', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_LAMB_LEG', 'lamb-leg', 'Lamb Leg', 'Leg cut of lamb for roasting and mtsvadi', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_CHICKEN_HEARTS', 'chicken-hearts', 'Chicken Hearts', 'Organ meat used in Georgian kuchmachi', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_CHICKEN_GIZZARDS', 'chicken-gizzards', 'Chicken Gizzards', 'Organ meat used in Georgian kuchmachi', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_BEEF_TRIPE', 'beef-tripe', 'Beef Tripe', 'Stomach lining used in khashi soup', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_BEEF_BONES', 'beef-bones', 'Beef Bones', 'Bones for making rich broths', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_SAUSAGE_CASING', 'sausage-casing', 'Sausage Casing', 'Natural casings for kupati sausages', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),

  -- GRAINS & PANTRY
  ('ING_CORNMEAL', 'cornmeal', 'Cornmeal', 'Ground corn for mchadi and elarji', 'grains', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_KIDNEY_BEANS', 'kidney-beans', 'Kidney Beans', 'Red beans essential for lobio', 'grains', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_PHYLLO_DOUGH', 'phyllo-dough', 'Phyllo Dough', 'Thin layered pastry dough for pakhlava', 'grains', '{"gluten": true}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),

  -- FRUITS
  ('ING_POMEGRANATE', 'pomegranate', 'Pomegranate', 'Fruit with ruby-red seeds used in Georgian cuisine', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_POMEGRANATE_JUICE', 'pomegranate-juice', 'Pomegranate Juice', 'Fresh juice for marinades and sauces', 'juices', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_PERSIMMON', 'persimmon', 'Persimmon', 'Sweet orange fruit popular in Georgian autumn', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_FIGS', 'figs', 'Figs', 'Sweet fruit used fresh or dried in Georgian desserts', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_PEACHES', 'peaches', 'Peaches', 'Stone fruit used in Georgian fruit platters', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_RAISINS', 'raisins', 'Raisins', 'Dried grapes used in Georgian sweets and breads', 'fruits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- VEGETABLES
  ('ING_LEEK', 'leek', 'Leek', 'Mild onion-like vegetable used in Georgian cooking', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- OILS
  ('ING_WALNUT_OIL', 'walnut-oil', 'Walnut Oil', 'Cold-pressed oil from walnuts for salads', 'spices', '{"tree_nuts": true}'::JSONB, '{"vegan": true, "nut_free": false, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  allergens = EXCLUDED.allergens,
  dietary = EXCLUDED.dietary;

-- ============================================
-- ~34 new ingredients for Georgian cuisine
-- Some may already exist from Armenian import
-- Next: Run 02-georgian-data.sql
-- ============================================
