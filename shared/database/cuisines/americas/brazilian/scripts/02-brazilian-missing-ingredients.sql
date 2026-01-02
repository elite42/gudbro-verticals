-- ============================================
-- Brazilian Missing Ingredients
-- GUDBRO Database Standards v1.2
-- ============================================

-- Brazilian-specific ingredients that may not exist in the master table
-- Using correct column structure: id, slug, name, description, category, allergens, dietary

-- PROTEINS
INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_PICANHA', 'picanha', 'Picanha', 'Premium Brazilian beef cap cut', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PICANHA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_FRALDINHA', 'fraldinha', 'Fraldinha', 'Brazilian flank steak cut', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_FRALDINHA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_MAMINHA', 'maminha', 'Maminha', 'Brazilian tri-tip cut', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_MAMINHA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_ALCATRA', 'alcatra', 'Alcatra', 'Brazilian top sirloin cut', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_ALCATRA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CUPIM', 'cupim', 'Cupim', 'Brazilian beef hump cut', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CUPIM');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_COSTELA_BOVINA', 'costela-bovina', 'Costela Bovina', 'Brazilian beef ribs', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_COSTELA_BOVINA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_LINGUICA_TOSCANA', 'linguica-toscana', 'Linguiça Toscana', 'Brazilian pork sausage', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_LINGUICA_TOSCANA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CORACAO_FRANGO', 'coracao-de-frango', 'Coração de Frango', 'Chicken hearts', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CORACAO_FRANGO');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CHARQUE', 'charque', 'Charque', 'Brazilian dried salted beef', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CHARQUE');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CARNE_SOL', 'carne-de-sol', 'Carne de Sol', 'Sun-dried salted beef', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CARNE_SOL');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_OXTAIL', 'oxtail', 'Oxtail', 'Beef tail for stews', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_OXTAIL');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_TRIPE', 'tripe', 'Tripe', 'Beef stomach lining', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_TRIPE');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_COW_FOOT', 'cow-foot', 'Cow Foot', 'Beef feet for broth', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_COW_FOOT');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_PORK_BELLY', 'pork-belly', 'Pork Belly', 'Fatty pork cut', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PORK_BELLY');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_PORK_RIBS', 'pork-ribs', 'Pork Ribs', 'Pork spare ribs', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PORK_RIBS');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_PORK_EAR', 'pork-ear', 'Pork Ear', 'Pig ears for feijoada', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PORK_EAR');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_PORK_TAIL', 'pork-tail', 'Pork Tail', 'Pig tail for feijoada', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PORK_TAIL');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_GOAT_MEAT', 'goat-meat', 'Goat Meat', 'Bode - goat for stews', 'proteins', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_GOAT_MEAT');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_DRIED_SHRIMP', 'dried-shrimp', 'Dried Shrimp', 'Camarão seco for Bahian dishes', 'proteins', '{"shellfish": true}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_DRIED_SHRIMP');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_SALT_COD', 'salt-cod', 'Salt Cod', 'Bacalhau - dried salted cod', 'proteins', '{"fish": true}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SALT_COD');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CRAB_MEAT', 'crab-meat', 'Crab Meat', 'Siri - crab meat', 'proteins', '{"shellfish": true}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": true, "vegetarian": false, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CRAB_MEAT');

-- DAIRY
INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CATUPIRY', 'catupiry', 'Catupiry', 'Brazilian cream cheese spread', 'dairy', '{"dairy": true}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CATUPIRY');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_QUEIJO_COALHO', 'queijo-coalho', 'Queijo Coalho', 'Brazilian grilling cheese', 'dairy', '{"dairy": true}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_QUEIJO_COALHO');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_QUEIJO_MINAS', 'queijo-minas', 'Queijo Minas', 'Fresh Minas cheese', 'dairy', '{"dairy": true}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_QUEIJO_MINAS');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_REQUEIJAO', 'requeijao', 'Requeijão', 'Brazilian cream cheese', 'dairy', '{"dairy": true}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_REQUEIJAO');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CONDENSED_MILK', 'condensed-milk', 'Condensed Milk', 'Leite condensado', 'dairy', '{"dairy": true}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CONDENSED_MILK');

-- GRAINS & STARCHES
INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CASSAVA', 'cassava', 'Cassava', 'Mandioca - Brazilian staple root', 'vegetables', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CASSAVA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CASSAVA_FLOUR', 'cassava-flour', 'Cassava Flour', 'Farinha de mandioca for farofa', 'grains', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CASSAVA_FLOUR');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_TAPIOCA_STARCH', 'tapioca-starch', 'Tapioca Starch', 'Polvilho for pão de queijo', 'grains', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_TAPIOCA_STARCH');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CORN_FLOUR', 'corn-flour', 'Corn Flour', 'Fubá for cuscuz', 'grains', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CORN_FLOUR');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_BLACK_BEANS', 'black-beans', 'Black Beans', 'Feijão preto for feijoada', 'vegetables', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_BLACK_BEANS');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_BLACK_EYED_PEAS', 'black-eyed-peas', 'Black-Eyed Peas', 'Feijão fradinho for acarajé', 'vegetables', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_BLACK_EYED_PEAS');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_WHITE_BEANS', 'white-beans', 'White Beans', 'Feijão branco', 'vegetables', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_WHITE_BEANS');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_GREEN_BEANS_FRESH', 'green-beans-fresh', 'Fresh Green Beans', 'Feijão verde', 'vegetables', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_GREEN_BEANS_FRESH');

-- OILS & FATS
INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_DENDE_OIL', 'dende-oil', 'Dendê Oil', 'Red palm oil for Bahian cuisine', 'other', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_DENDE_OIL');

-- FRUITS
INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_ACAI', 'acai', 'Açaí', 'Brazilian superfruit berry', 'fruits', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_ACAI');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_PEQUI', 'pequi', 'Pequi', 'Brazilian savanna fruit', 'fruits', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PEQUI');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_GUAVA_PASTE', 'guava-paste', 'Guava Paste', 'Goiabada - sweet guava candy', 'fruits', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_GUAVA_PASTE');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_GUARANA', 'guarana', 'Guaraná', 'Brazilian energizing fruit', 'fruits', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_GUARANA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_COCONUT_MILK', 'coconut-milk', 'Coconut Milk', 'Leite de coco', 'other', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_COCONUT_MILK');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_COCONUT_FLAKES', 'coconut-flakes', 'Coconut Flakes', 'Coco ralado', 'fruits', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_COCONUT_FLAKES');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_COCONUT_WATER', 'coconut-water', 'Coconut Water', 'Água de coco', 'juices', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_COCONUT_WATER');

-- VEGETABLES & GREENS
INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_COLLARD_GREENS', 'collard-greens', 'Collard Greens', 'Couve - feijoada essential', 'vegetables', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_COLLARD_GREENS');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_HEARTS_PALM', 'hearts-of-palm', 'Hearts of Palm', 'Palmito', 'vegetables', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_HEARTS_PALM');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_OKRA', 'okra', 'Okra', 'Quiabo for caruru', 'vegetables', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_OKRA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_MORANGA', 'moranga', 'Moranga', 'Brazilian pumpkin variety', 'vegetables', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_MORANGA');

-- SPICES & SEASONINGS
INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_URUCUM', 'urucum', 'Urucum', 'Annatto for coloring', 'spices', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_URUCUM');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_PIMENTA_MALAGUETA', 'pimenta-malagueta', 'Pimenta Malagueta', 'Brazilian hot pepper', 'spices', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PIMENTA_MALAGUETA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CHIMICHURRI', 'chimichurri', 'Chimichurri', 'South American herb sauce', 'herbs', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CHIMICHURRI');

-- BEVERAGES
INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CACHACA', 'cachaca', 'Cachaça', 'Brazilian sugarcane spirit', 'spirits', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CACHACA');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_YERBA_MATE', 'yerba-mate', 'Yerba Mate', 'South American tea', 'herbs', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_YERBA_MATE');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_SUGARCANE_JUICE', 'sugarcane-juice', 'Sugarcane Juice', 'Caldo de cana', 'juices', '{}'::jsonb, '{"vegan": true, "nut_free": true, "dairy_free": true, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SUGARCANE_JUICE');

-- SWEETS & CONFECTIONS
INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_DOCE_LEITE', 'doce-de-leite', 'Doce de Leite', 'Brazilian dulce de leche', 'dairy', '{"dairy": true}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_DOCE_LEITE');

INSERT INTO ingredients (id, slug, name, description, category, allergens, dietary)
SELECT 'ING_CHOCOLATE_SPRINKLES', 'chocolate-sprinkles', 'Chocolate Sprinkles', 'Granulado for brigadeiro', 'other', '{}'::jsonb, '{"vegan": false, "nut_free": true, "dairy_free": false, "vegetarian": true, "gluten_free": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CHOCOLATE_SPRINKLES');

-- Output success
SELECT 'Brazilian ingredients added' as status;
