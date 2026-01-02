-- ============================================
-- BREAKFAST - Missing Ingredients
-- ============================================
-- Run this FIRST to add missing ingredients
-- Required for breakfast database import
-- Total: 58 new ingredients
-- ============================================

-- Dairy & Eggs
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_CANADIAN_BACON', 'canadian-bacon', 'Canadian Bacon', 'Lean, round slices of cured pork loin, also known as back bacon', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false}'::jsonb),
  ('ING_AMERICAN_CHEESE', 'american-cheese', 'American Cheese', 'Processed cheese with smooth, creamy texture and mild flavor', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_CLOTTED_CREAM', 'clotted-cream', 'Clotted Cream', 'Thick, rich cream with 55% butterfat, traditional British delicacy', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_KAYMAK', 'kaymak', 'Kaymak (Turkish Clotted Cream)', 'Rich cream from water buffalo milk, Turkish breakfast staple', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_LABNEH', 'labneh', 'Labneh (Strained Yogurt)', 'Thick strained yogurt cheese, creamy Middle Eastern spread', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_HALLOUMI', 'halloumi', 'Halloumi Cheese', 'Semi-hard brined cheese from Cyprus, high melting point for grilling', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_CHEESE_ASSORTED', 'cheese-assorted', 'Assorted Cheeses', 'Selection of various cheeses for breakfast platters', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_CENTURY_EGG', 'century-egg', 'Century Egg (Preserved Egg)', 'Chinese preserved duck egg with creamy yolk and amber white', 'eggs', '["eggs"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb)
ON CONFLICT DO NOTHING;

-- Meats & Proteins
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_BLACK_PUDDING', 'black-pudding', 'Black Pudding (Blood Sausage)', 'Traditional British blood sausage with oats and spices', 'proteins', '["gluten"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false, "is_halal": false}'::jsonb),
  ('ING_WHITE_PUDDING', 'white-pudding', 'White Pudding', 'Irish sausage made with oatmeal and suet, no blood', 'proteins', '["gluten"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false}'::jsonb),
  ('ING_IRISH_BACON', 'irish-bacon', 'Irish Rashers (Back Bacon)', 'Lean back bacon cut, traditional Irish breakfast meat', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false, "is_halal": false}'::jsonb),
  ('ING_JAMON_SERRANO', 'jamon-serrano', 'Jamon Serrano', 'Spanish dry-cured ham aged 12-18 months', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false, "is_halal": false}'::jsonb),
  ('ING_CHAR_SIU', 'char-siu', 'Char Siu (BBQ Pork)', 'Cantonese-style barbecued pork with sweet glaze', 'proteins', '["soy"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false, "is_halal": false}'::jsonb)
ON CONFLICT DO NOTHING;

-- Breads & Pastries
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_ENGLISH_MUFFIN', 'english-muffin', 'English Muffin', 'Round, flat yeast-leavened bread with nooks and crannies', 'bread', '["gluten", "milk"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_BRIOCHE', 'brioche', 'Brioche Bread', 'Rich French bread enriched with butter and eggs', 'bread', '["gluten", "milk", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_CROISSANT', 'croissant', 'Croissant', 'Flaky French laminated pastry with butter layers', 'baked_goods', '["gluten", "milk", "eggs"]'::jsonb, '["gluten", "lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_TOAST', 'toast', 'Toast (Sliced Bread)', 'Sliced bread toasted until golden brown', 'bread', '["gluten"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_SODA_BREAD', 'soda-bread', 'Irish Soda Bread', 'Traditional Irish quick bread leavened with baking soda', 'bread', '["gluten", "milk"]'::jsonb, '["gluten", "lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_CRISPBREAD', 'crispbread', 'Crispbread (Knäckebröd)', 'Scandinavian dry, crispy flatbread', 'bread', '["gluten"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_SIMIT', 'simit', 'Simit (Turkish Sesame Bread)', 'Circular Turkish bread covered with sesame seeds', 'bread', '["gluten", "sesame"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_PITA', 'pita', 'Pita Bread', 'Middle Eastern flatbread with pocket', 'bread', '["gluten"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_KAISER_ROLL', 'kaiser-roll', 'Kaiser Roll', 'Round crusty bread roll with star pattern on top', 'bread', '["gluten", "eggs"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_SOURDOUGH', 'sourdough', 'Sourdough Bread', 'Naturally leavened bread with tangy flavor', 'bread', '["gluten"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- Cereals & Grains
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_ROLLED_OATS', 'rolled-oats', 'Rolled Oats', 'Steamed and flattened oat groats for oatmeal', 'grains', '["gluten"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_STEEL_CUT_OATS', 'steel-cut-oats', 'Steel Cut Oats', 'Whole oat groats cut into pieces, hearty texture', 'grains', '["gluten"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_MUESLI', 'muesli', 'Muesli', 'Swiss breakfast cereal with oats, nuts, and dried fruit', 'grains', '["gluten", "nuts"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_WHEAT_FLOUR', 'wheat-flour', 'Wheat Flour', 'Ground wheat for baking and cooking', 'grains', '["gluten"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_TAPIOCA_FLOUR', 'tapioca-flour', 'Tapioca Flour', 'Starch extracted from cassava root, gluten-free', 'grains', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_URAD_DAL', 'urad-dal', 'Urad Dal (Black Gram)', 'Split black lentils used in South Indian cooking', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- Fruits
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_BLUEBERRIES', 'blueberries', 'Fresh Blueberries', 'Sweet, antioxidant-rich berries', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_MIXED_BERRIES', 'mixed-berries', 'Mixed Berries', 'Assortment of fresh berries', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_ACAI', 'acai', 'Acai Berry (Frozen)', 'Brazilian superfruit berry, deep purple color', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_KIWI', 'kiwi', 'Kiwi Fruit', 'Green fuzzy fruit with tangy sweet flavor', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_PAPAYA', 'papaya', 'Fresh Papaya', 'Tropical fruit with orange flesh and black seeds', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_FRESH_FRUIT', 'fresh-fruit', 'Fresh Fruit (Assorted)', 'Selection of seasonal fresh fruits', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- Vegetables & Legumes
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_BAKED_BEANS', 'baked-beans', 'Baked Beans', 'Navy beans in tomato sauce, British breakfast staple', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_FAVA_BEANS', 'fava-beans', 'Fava Beans (Broad Beans)', 'Large flat beans, base for ful medames', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_ARTICHOKE', 'artichoke', 'Artichoke Hearts', 'Tender heart of the artichoke flower', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_PICKLED_VEGETABLES', 'pickled-vegetables', 'Pickled Vegetables (Tsukemono)', 'Japanese-style pickled vegetables', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_CRISPY_SHALLOTS', 'crispy-shallots', 'Crispy Fried Shallots', 'Thinly sliced shallots fried until crispy', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- Nuts & Seeds
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_HAZELNUTS', 'hazelnuts', 'Hazelnuts', 'Sweet, rich nuts also known as filberts', 'nuts', '["tree_nuts"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_COCONUT', 'coconut', 'Fresh Coconut', 'Tropical fruit with white flesh and clear water', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- Beverages
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_COFFEE', 'coffee', 'Brewed Coffee', 'Hot beverage brewed from roasted coffee beans', 'beverages', '[]'::jsonb, '["caffeine"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_JASMINE_TEA', 'jasmine-tea', 'Jasmine Tea', 'Green tea scented with jasmine flowers', 'tea', '[]'::jsonb, '["caffeine"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_ALMOND_MILK', 'almond-milk', 'Almond Milk', 'Plant-based milk made from almonds', 'dairy_alternatives', '["tree_nuts"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- Condiments & Sauces
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_JAM', 'jam', 'Fruit Jam', 'Sweet fruit preserve for spreading', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_STRAWBERRY_JAM', 'strawberry-jam', 'Strawberry Jam', 'Classic strawberry fruit preserve', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_LINGONBERRY_JAM', 'lingonberry-jam', 'Lingonberry Jam', 'Scandinavian tart berry preserve', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_DIJON', 'dijon', 'Dijon Mustard', 'French mustard from Dijon with sharp flavor', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_HOISIN', 'hoisin', 'Hoisin Sauce', 'Sweet and savory Chinese dipping sauce', 'sauces', '["soy", "gluten"]'::jsonb, '["gluten"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_SAMBAR', 'sambar', 'Sambar (Lentil Stew)', 'South Indian lentil and vegetable stew', 'sauces', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_DOENJANG', 'doenjang', 'Doenjang (Korean Soybean Paste)', 'Fermented Korean soybean paste', 'condiments', '["soy"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_VANILLA_CUSTARD', 'vanilla-custard', 'Vanilla Custard', 'Creamy vanilla-flavored custard filling', 'dairy', '["milk", "eggs"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb)
ON CONFLICT DO NOTHING;

-- Seasonings & Spices
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_WHITE_PEPPER', 'white-pepper', 'White Pepper', 'Milder pepper from ripe peppercorns with skin removed', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_EVERYTHING_SEASONING', 'everything-seasoning', 'Everything Bagel Seasoning', 'Blend of sesame, poppy, garlic, onion, and salt', 'spices', '["sesame"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- Liqueurs & Alcohols
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_ORANGE_LIQUEUR', 'orange-liqueur', 'Orange Liqueur (Grand Marnier)', 'French orange-flavored cognac liqueur', 'liqueurs', '[]'::jsonb, '["alcohol"]'::jsonb, '{"is_vegetarian": true, "is_vegan": true, "is_halal": false}'::jsonb),
  ('ING_ORANGE_ZEST', 'orange-zest', 'Fresh Orange Zest', 'Grated outer peel of orange for flavoring', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_AGAVE', 'agave', 'Agave Nectar', 'Natural sweetener from agave plant', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- ============================================
-- Verification Query
-- ============================================
-- After running, verify with:
-- SELECT COUNT(*) FROM ingredients WHERE id LIKE 'ING_%';
-- Expected: Previous count + 58 new ingredients
