-- ============================================
-- KOREAN DATABASE - Missing Ingredients
-- ============================================
-- Total: 45 new ingredients for Korean cuisine
-- (6 already exist: glass-noodles, gochujang, gochugaru, kimchi, rice-wine, pine-nuts)
--
-- IMPORTANT: Run this BEFORE korean-data.sql
-- Schema: JSONB format for allergens, intolerances, dietary
-- ============================================

-- Korean-specific ingredients
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
-- NOODLES & STARCHES (8) - glass-noodles already exists
('ING_BUCKWHEAT_NOODLES', 'buckwheat-noodles', 'Buckwheat Noodles', 'Chewy noodles made from buckwheat flour, used for naengmyeon', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_INSTANT_NOODLES', 'instant-noodles', 'Instant Noodles', 'Pre-cooked dried noodles for ramyeon', 'grains', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_RICE_CAKES', 'rice-cakes', 'Rice Cakes', 'Chewy cylinder-shaped rice cakes (tteok) for tteokbokki', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_RICE_CAKE_PEARLS', 'rice-cake-pearls', 'Rice Cake Pearls', 'Small chewy rice cake balls for bingsu desserts', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_GLUTINOUS_RICE', 'glutinous-rice', 'Glutinous Rice', 'Sticky sweet rice used for samgyetang and desserts', 'rice', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_GLUTINOUS_RICE_FLOUR', 'glutinous-rice-flour', 'Glutinous Rice Flour', 'Flour from glutinous rice for making tteok and desserts', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_CORN_STARCH', 'corn-starch', 'Corn Starch', 'Starch from corn kernels, used for coating fried chicken', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_ALL_PURPOSE_FLOUR', 'all-purpose-flour', 'All-Purpose Flour', 'Refined wheat flour for pancakes and batters', 'grains', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- KOREAN SAUCES & PASTES (4) - gochujang, gochugaru already exist
('ING_DOENJANG', 'doenjang', 'Doenjang', 'Fermented soybean paste for stews and dipping', 'spices', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_SSAMJANG', 'ssamjang', 'Ssamjang', 'Thick dipping paste made from doenjang and gochujang for BBQ wraps', 'spices', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_CHUNJANG', 'chunjang', 'Chunjang', 'Black bean paste for jajangmyeon noodles', 'spices', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_RICE_SYRUP', 'rice-syrup', 'Rice Syrup', 'Korean corn syrup alternative for glazes and sauces', 'spices', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- FERMENTED & PRESERVED (6) - kimchi already exists
('ING_SALTED_SHRIMP', 'salted-shrimp', 'Salted Shrimp', 'Fermented tiny shrimp for kimchi and seasoning', 'proteins', '{"shellfish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_ANCHOVY_STOCK', 'anchovy-stock', 'Anchovy Stock', 'Stock made from dried anchovies, base for soups and stews', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_DRIED_ANCHOVIES', 'dried-anchovies', 'Dried Anchovies', 'Sun-dried small anchovies for stock and banchan', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_DRIED_KELP', 'dried-kelp', 'Dried Kelp', 'Kombu/dashima for making stock', 'vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_FISH_CAKES', 'fish-cakes', 'Fish Cakes', 'Processed fish cake sheets for soups and tteokbokki', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_PICKLED_RADISH', 'pickled-radish', 'Pickled Radish', 'Yellow pickled radish (danmuji) for gimbap', 'vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- PROTEINS - OFFAL & SPECIALTY (8)
('ING_BEEF_INTESTINES', 'beef-intestines', 'Beef Intestines', 'Beef small intestines for gopchang BBQ', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_PORK_INTESTINES', 'pork-intestines', 'Pork Intestines', 'Pork large intestines for makchang BBQ', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_PIG_INTESTINE', 'pig-intestine', 'Pig Intestine', 'Pig intestine casing for sundae (blood sausage)', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_PIG_BLOOD', 'pig-blood', 'Pig Blood', 'Coagulated pig blood for sundae filling', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_PORK_BONES', 'pork-bones', 'Pork Bones', 'Pork spine bones for gamjatang', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_OX_BONES', 'ox-bones', 'Ox Bones', 'Beef leg bones for seolleongtang broth', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_WHOLE_CHICKEN', 'whole-chicken', 'Whole Chicken', 'Young whole chicken for samgyetang', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_CRAB_STICK', 'crab-stick', 'Crab Stick', 'Imitation crab made from fish surimi', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- SEAFOOD (1)
('ING_POLLOCK', 'pollock', 'Pollock', 'White fish used for jeon pancakes and dried fish dishes', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- VEGETABLES & HERBS (6)
('ING_PERILLA_LEAVES', 'perilla-leaves', 'Perilla Leaves', 'Aromatic Korean herb (kkaennip) for wraps and garnish', 'herbs', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_PERILLA_SEEDS', 'perilla-seeds', 'Perilla Seeds', 'Ground perilla seeds for gamjatang seasoning', 'spices', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_GOSARI', 'gosari', 'Gosari', 'Dried fernbrake/bracken fern for bibimbap and yukgaejang', 'vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_SOY_BEAN_SPROUTS', 'soy-bean-sprouts', 'Soybean Sprouts', 'Large-headed sprouts from soybeans for kongnamul', 'vegetables', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_ASIAN_PEAR', 'asian-pear', 'Asian Pear', 'Korean pear used for marinades and naengmyeon', 'fruits', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_EDIBLE_FLOWERS', 'edible-flowers', 'Edible Flowers', 'Decorative flowers for hwajeon pancakes', 'vegetables', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- TRADITIONAL INGREDIENTS (7) - pine-nuts already exists
('ING_GINSENG', 'ginseng', 'Ginseng', 'Korean ginseng root for samgyetang and health dishes', 'herbs', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_JUJUBE', 'jujube', 'Jujube', 'Dried red dates for samgyetang and desserts', 'fruits', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_GINKGO_NUTS', 'ginkgo-nuts', 'Ginkgo Nuts', 'Nuts from ginkgo tree for samgyetang', 'spices', '{"tree_nuts": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": false, "pescatarian": true}'),
('ING_CHESTNUTS', 'chestnuts', 'Chestnuts', 'Roasted or boiled chestnuts for samgyetang', 'spices', '{"tree_nuts": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": false, "pescatarian": true}'),
('ING_PINE_NEEDLES', 'pine-needles', 'Pine Needles', 'Fresh pine needles for steaming songpyeon', 'herbs', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_PINE_POLLEN', 'pine-pollen', 'Pine Pollen', 'Yellow pollen for traditional dasik tea cookies', 'spices', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_BARLEY', 'barley', 'Barley', 'Grain used in sundae and tea drinks', 'grains', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- DESSERT & SWEET INGREDIENTS (7)
('ING_RED_BEAN_PASTE', 'red-bean-paste', 'Red Bean Paste', 'Sweet paste from adzuki beans for desserts', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_MOCHI', 'mochi', 'Mochi', 'Chewy rice cake pieces for bingsu topping', 'grains', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_SHAVED_ICE', 'shaved-ice', 'Shaved Ice', 'Finely shaved ice base for bingsu', 'mixers', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_ROASTED_SOYBEAN_POWDER', 'roasted-soybean-powder', 'Roasted Soybean Powder', 'Kinako/injeolmi powder for desserts', 'grains', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_MALT_POWDER', 'malt-powder', 'Malt Powder', 'Enzyme powder for making sikhye rice punch', 'grains', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_DRIED_PERSIMMON', 'dried-persimmon', 'Dried Persimmon', 'Dried fruit for sujeonggwa punch', 'fruits', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_SOY_MILK', 'soy-milk', 'Soy Milk', 'Plant milk for kongguksu noodles', 'dairy', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),

-- PROCESSED/CONVENIENCE (4)
('ING_SPAM', 'spam', 'Spam', 'Canned pork product for budae jjigae', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_HOT_DOGS', 'hot-dogs', 'Hot Dogs', 'Processed sausages for budae jjigae', 'proteins', '{}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": false, "dairy_free": true, "nut_free": true, "pescatarian": false}'),
('ING_CANNED_TUNA', 'canned-tuna', 'Canned Tuna', 'Preserved tuna for gimbap filling', 'proteins', '{"fish": true}', '{}', '{"vegan": false, "vegetarian": false, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}'),
('ING_CHEESE_POWDER', 'cheese-powder', 'Cheese Powder', 'Powdered cheese for fried chicken seasoning', 'dairy', '{"milk": true}', '{}', '{"vegan": false, "vegetarian": true, "gluten_free": true, "dairy_free": false, "nut_free": true, "pescatarian": true}'),

-- SOFT TOFU (1)
('ING_SOFT_TOFU', 'soft-tofu', 'Soft Tofu', 'Silken tofu for sundubu jjigae', 'proteins', '{"soy": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}')

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Summary: 45 new Korean ingredients added
-- (6 already exist: glass-noodles, gochujang, gochugaru, kimchi, rice-wine, pine-nuts)
-- Categories used: grains, rice, spices, vegetables, proteins, herbs, fruits, dairy, mixers
-- Schema: JSONB format (allergens, intolerances, dietary)
-- ============================================
