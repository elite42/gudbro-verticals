-- ============================================
-- LEBANESE DATABASE - Missing Ingredients
-- ============================================
-- 23 new ingredients for Lebanese cuisine
-- Run AFTER 00-lebanese-schema.sql
-- ============================================

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
VALUES
  -- CHEESE & DAIRY
  ('ING_AKAWI_CHEESE', 'akawi-cheese', 'Akawi Cheese', 'Brined Middle Eastern cheese, mild and slightly salty, used in manakish and desserts', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_SHANKLISH_CHEESE', 'shanklish-cheese', 'Shanklish Cheese', 'Aged Lebanese cheese balls rolled in za''atar and Aleppo pepper', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_ASHTA', 'ashta', 'Ashta (Clotted Cream)', 'Lebanese clotted cream used in desserts like knafeh and halawet el jibn', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_JAMEED', 'jameed', 'Jameed', 'Hard dried yogurt balls, reconstituted to make mansaf sauce', 'dairy', '{"dairy": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_KESHEK', 'keshek', 'Keshek', 'Fermented bulgur and yogurt mixture, dried and powdered for soups', 'dairy', '{"dairy": true, "gluten": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),

  -- PROTEINS & PRESERVED MEATS
  ('ING_KAWARMA', 'kawarma', 'Kawarma', 'Lebanese lamb confit preserved in its own fat, used in eggs and hummus', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_LAMB_FAT', 'lamb-fat', 'Lamb Fat', 'Rendered lamb fat used in shawarma and traditional cooking', 'proteins', '{}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": false}'::JSONB),
  ('ING_RED_MULLET', 'red-mullet', 'Red Mullet (Sultan Ibrahim)', 'Small Mediterranean fish, popular fried whole in Lebanese cuisine', 'proteins', '{"fish": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- VEGETABLES & GREENS
  ('ING_BABY_EGGPLANT', 'baby-eggplant', 'Baby Eggplant', 'Small eggplants used for stuffing and pickling (makdous)', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_DANDELION_GREENS', 'dandelion-greens', 'Dandelion Greens (Hindbeh)', 'Bitter greens sauteed with caramelized onions', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_SWISS_CHARD', 'swiss-chard', 'Swiss Chard (Silq)', 'Leafy green used for stuffing and stews', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_MOLOKHIA', 'molokhia', 'Molokhia (Jute Leaves)', 'Mucilaginous green leaves for traditional Egyptian-Lebanese stew', 'vegetables', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- GRAINS & SPECIALTY ITEMS
  ('ING_FREEKEH', 'freekeh', 'Freekeh', 'Roasted green wheat with smoky flavor, an ancient Levantine grain', 'grains', '{"gluten": true}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),
  ('ING_KNAFEH_DOUGH', 'knafeh-dough', 'Knafeh Dough (Kadaif)', 'Shredded phyllo-like pastry for knafeh and other desserts', 'grains', '{"gluten": true}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),
  ('ING_SHRAK_BREAD', 'shrak-bread', 'Shrak Bread (Markook)', 'Paper-thin Bedouin flatbread baked on a saj', 'grains', '{"gluten": true}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": false, "pescatarian": true}'::JSONB),

  -- SPICES & SEASONINGS
  ('ING_ALEPPO_PEPPER', 'aleppo-pepper', 'Aleppo Pepper', 'Fruity, moderately spicy red pepper flakes from Syria', 'seasonings', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_MAHLAB', 'mahlab', 'Mahlab', 'Ground cherry pit spice with almond-cherry flavor for baked goods', 'seasonings', '{"tree_nuts": true}'::JSONB, '{"vegan": true, "nut_free": false, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_ANISE_SEEDS', 'anise-seeds', 'Anise Seeds', 'Sweet licorice-flavored seeds used in breads and desserts', 'seasonings', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_CORIANDER_SEEDS', 'coriander-seeds', 'Coriander Seeds', 'Citrusy, warm spice seeds essential for molokhia', 'seasonings', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_NIGELLA_SEEDS', 'nigella-seeds', 'Nigella Seeds (Black Seed)', 'Small black seeds with oniony flavor, used on breads', 'seasonings', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_ORANGE_BLOSSOM', 'orange-blossom-water', 'Orange Blossom Water', 'Fragrant floral water distilled from orange blossoms for desserts', 'seasonings', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),

  -- SAUCES & CONDIMENTS
  ('ING_TOUM', 'toum', 'Toum (Lebanese Garlic Sauce)', 'Fluffy emulsified garlic sauce, essential with shawarma and grilled meats', 'condiments', '{}'::JSONB, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB),
  ('ING_NATEF', 'natef', 'Natef (Marshmallow Cream)', 'Fluffy white cream made from saponaria root, served with karabij', 'condiments', '{"egg": true}'::JSONB, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true, "pescatarian": true}'::JSONB)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  allergens = EXCLUDED.allergens,
  dietary = EXCLUDED.dietary;

-- ============================================
-- 23 ingredients added/updated
-- Next: Run 02-lebanese-data.sql
-- ============================================
