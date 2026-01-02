-- ============================================
-- GREEK DATABASE - Missing Ingredients
-- ============================================
-- 18 new ingredients for Greek cuisine
-- Run AFTER 00-greek-schema.sql
-- ============================================

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
VALUES
  -- DAIRY/CHEESE
  ('ING_KASSERI', 'kasseri', 'Kasseri Cheese', 'Semi-hard Greek cheese with mild flavor, perfect for saganaki', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_MIZITHRA', 'mizithra', 'Mizithra Cheese', 'Traditional Greek whey cheese, can be fresh and soft or aged and hard', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- PROTEINS
  ('ING_RABBIT', 'rabbit', 'Rabbit', 'Lean game meat popular in Mediterranean cuisine', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_LAMB_OFFAL', 'lamb-offal', 'Lamb Offal', 'Lamb organ meats including liver, heart, kidneys, and spleen', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_LAMB_INTESTINES', 'lamb-intestines', 'Lamb Intestines', 'Cleaned lamb intestines used to wrap kokoretsi', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_FISH_ROE', 'fish-roe', 'Fish Roe', 'Salted and cured fish eggs used for taramosalata', 'proteins', '{"fish": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_MIXED_FISH', 'mixed-fish', 'Mixed Fish', 'Assorted fresh fish for soups and stews', 'proteins', '{"fish": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- VEGETABLES
  ('ING_PEARL_ONIONS', 'pearl-onions', 'Pearl Onions', 'Small, sweet onions essential for stifado', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_LEEKS', 'leeks', 'Leeks', 'Mild allium vegetable used in pies and stews', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_WILD_GREENS', 'wild-greens', 'Wild Greens (Horta)', 'Foraged wild greens like dandelion, chicory, and amaranth', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_BEETS', 'beets', 'Beets', 'Root vegetable served boiled with skordalia', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_YELLOW_SPLIT_PEAS', 'yellow-split-peas', 'Yellow Split Peas', 'Dried legumes used for Santorini fava', 'legumes', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_WHITE_BEANS', 'white-beans', 'White Beans', 'Dried cannellini or navy beans for fasolada', 'legumes', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- GRAINS/PASTA
  ('ING_ORZO', 'orzo', 'Orzo Pasta', 'Rice-shaped pasta used in giouvetsi and soups', 'grains', '{"gluten": true}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),
  ('ING_BARLEY_RUSK', 'barley-rusk', 'Barley Rusk (Paximadi)', 'Twice-baked Cretan barley bread, base for dakos', 'grains', '{"gluten": true}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),
  ('ING_TRAHANA', 'trahana', 'Trahana', 'Fermented grain product made from wheat and sour milk', 'grains', '{"gluten": true, "dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),

  -- SPIRITS
  ('ING_OUZO', 'ouzo', 'Ouzo', 'Greek anise-flavored spirit used in cooking', 'spirits', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- NUTS
  ('ING_PISTACHIOS', 'pistachios', 'Pistachios', 'Green nuts from Aegina, used in baklava and desserts', 'nuts', '{"tree_nuts": true}'::JSONB, '{"vegan": true, "nut_free": false, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  allergens = EXCLUDED.allergens,
  dietary = EXCLUDED.dietary;

-- ============================================
-- 18 ingredients added/updated
-- Next: Run 02-greek-data.sql
-- ============================================
