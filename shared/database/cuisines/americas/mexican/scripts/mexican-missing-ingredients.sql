-- ============================================
-- GUDBRO Mexican - Missing Ingredients
-- Uses ON CONFLICT DO NOTHING to skip existing
-- Fixed: JSONB format for allergens/dietary/nutrition
-- ============================================

-- CHILES (spices category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_ACHIOTE', 'achiote', 'Achiote Paste', 'Yucatecan spice paste made from annatto seeds, garlic, and spices. Gives a distinctive red color and earthy flavor.', 'spices', 'mexican', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 1, true, false, 'room_temp'),
('ING_ANCHO_CHILE', 'ancho-chile', 'Ancho Chile', 'Dried poblano pepper with sweet, fruity flavor and mild heat. Essential for moles and sauces.', 'spices', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 2, true, false, 'room_temp'),
('ING_ARBOL_CHILE', 'arbol-chile', 'Chile de Árbol', 'Small, thin dried red chile with nutty, smoky flavor and significant heat.', 'spices', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 4, true, false, 'room_temp'),
('ING_CHILHUACLE_CHILE', 'chilhuacle-chile', 'Chilhuacle Chile', 'Rare Oaxacan chile essential for mole negro. Deep, complex flavor with hints of tobacco and dried fruit.', 'spices', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 2, false, true, 'room_temp'),
('ING_CHIPOTLE', 'chipotle', 'Chipotle Chile', 'Smoke-dried jalapeño pepper with distinctive smoky, spicy flavor. Often sold in adobo sauce.', 'spices', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 3, true, false, 'room_temp'),
('ING_GUAJILLO_CHILE', 'guajillo-chile', 'Guajillo Chile', 'Most popular dried chile in Mexico. Mild heat with tangy, slightly fruity flavor.', 'spices', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 2, true, false, 'room_temp'),
('ING_HABANERO', 'habanero', 'Habanero Chile', 'Extremely hot chile from Yucatán with fruity, citrus notes. One of the hottest common chiles.', 'spices', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 5, true, false, 'refrigerated'),
('ING_MULATO_CHILE', 'mulato-chile', 'Mulato Chile', 'Dried chile similar to ancho but darker with chocolate and tobacco notes. Key for mole poblano.', 'spices', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 2, false, false, 'room_temp'),
('ING_PASILLA_CHILE', 'pasilla-chile', 'Pasilla Chile', 'Long, dark dried chile with complex berry and herb notes. Essential for many moles.', 'spices', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 2, true, false, 'room_temp'),
('ING_POBLANO_CHILE', 'poblano-chile', 'Poblano Chile', 'Large, mild fresh chile used for chiles rellenos. Dark green with rich, earthy flavor.', 'vegetables', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 1, true, false, 'refrigerated'),
('ING_SERRANO_CHILE', 'serrano-chile', 'Serrano Chile', 'Small, bright green fresh chile with clean, crisp heat. Popular for salsas.', 'vegetables', 'chiles', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 4, true, false, 'refrigerated'),
('ING_CHILE_POWDER', 'chile-powder', 'Chile Powder', 'Ground blend of dried chiles with cumin and other spices.', 'spices', 'blends', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 2, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- MEXICAN CHEESES (cheese category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_OAXACA_CHEESE', 'oaxaca-cheese', 'Oaxaca Cheese', 'Mexican string cheese similar to mozzarella, perfect for melting. Made from stretched curd.', 'cheese', 'mexican', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "gluten_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_QUESO_FRESCO', 'queso-fresco', 'Queso Fresco', 'Fresh, mild Mexican cheese that crumbles easily. Does not melt, used as topping.', 'cheese', 'mexican', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "gluten_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_COTIJA_CHEESE', 'cotija-cheese', 'Cotija Cheese', 'Aged, salty Mexican cheese similar to Parmesan. Crumbled over dishes.', 'cheese', 'mexican', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "gluten_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_CHIHUAHUA_CHEESE', 'chihuahua-cheese', 'Chihuahua Cheese', 'Mexican melting cheese similar to Monterey Jack. Mild and buttery.', 'cheese', 'mexican', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "gluten_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_CHEESE', 'cheese', 'Cheese', 'Generic melting cheese for Mexican dishes.', 'cheese', 'general', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "gluten_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- MEXICAN DAIRY & SAUCES (dairy/sauces category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CREMA', 'crema-mexicana', 'Crema Mexicana', 'Mexican sour cream, thinner and tangier than American sour cream. Essential topping.', 'dairy', 'cream', '{"milk": true}', '{"lactose": true}', '{"vegetarian": true, "gluten_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_SALSA_VERDE', 'salsa-verde', 'Salsa Verde', 'Green tomatillo-based salsa with serrano chiles and cilantro.', 'sauces', 'mexican', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 2, true, false, 'refrigerated'),
('ING_SALSA_ROJA', 'salsa-roja', 'Salsa Roja', 'Red tomato and chile-based Mexican table salsa.', 'sauces', 'mexican', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 3, true, false, 'refrigerated'),
('ING_ENCHILADA_SAUCE', 'enchilada-sauce', 'Enchilada Sauce', 'Red chile sauce for enchiladas made from dried chiles.', 'sauces', 'mexican', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 2, true, false, 'refrigerated'),
('ING_MOLE_PASTE', 'mole-paste', 'Mole Paste', 'Complex Mexican sauce paste with chiles, chocolate, nuts, and spices.', 'sauces', 'mexican', '{"nuts": true, "sesame": true}', '{}', '{"vegetarian": true, "gluten_free": true, "dairy_free": true}', NULL, 2, false, true, 'refrigerated')
ON CONFLICT DO NOTHING;

-- MEXICAN TORTILLAS & BREAD (bread/grains category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CORN_TORTILLA', 'corn-tortilla', 'Corn Tortilla', 'Traditional Mexican flatbread made from nixtamalized corn masa.', 'bread', 'tortillas', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_FLOUR_TORTILLA', 'flour-tortilla', 'Flour Tortilla', 'Northern Mexican wheat flour tortilla, softer and larger than corn.', 'bread', 'tortillas', '{"gluten": true}', '{}', '{"vegan": true, "vegetarian": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_MASA', 'masa', 'Masa', 'Corn dough made from nixtamalized corn. Base for tortillas, tamales, and antojitos.', 'grains', 'corn', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_CORN_HUSK', 'corn-husk', 'Corn Husk', 'Dried corn husks used to wrap tamales.', 'other', 'wrapping', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- MEXICAN PROTEINS (proteins category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PORK_SHOULDER', 'pork-shoulder', 'Pork Shoulder', 'Fatty, flavorful cut ideal for slow cooking. Used for carnitas and al pastor.', 'proteins', 'pork', '{"pork": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_BEEF_CHEEK', 'beef-cheek', 'Beef Cheek', 'Collagen-rich cut that becomes tender when braised. Traditional for barbacoa.', 'proteins', 'beef', '{"beef": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, true, 'refrigerated'),
('ING_BEEF_CHUCK', 'beef-chuck', 'Beef Chuck', 'Flavorful shoulder cut, good for braising and stewing.', 'proteins', 'beef', '{"beef": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_BEEF_TONGUE', 'beef-tongue', 'Beef Tongue', 'Tender organ meat when slow-cooked. Traditional taco filling.', 'proteins', 'beef', '{"beef": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, false, 'refrigerated'),
('ING_BEEF_GROUND', 'beef-ground', 'Ground Beef', 'Minced beef for tacos, burritos, and picadillo.', 'proteins', 'beef', '{"beef": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_GROUND_PORK', 'ground-pork', 'Ground Pork', 'Minced pork for tamales and picadillo.', 'proteins', 'pork', '{"pork": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_CHORIZO', 'chorizo-mexicano', 'Mexican Chorizo', 'Fresh, spicy pork sausage flavored with chiles and vinegar. Crumbles when cooked.', 'proteins', 'pork', '{"pork": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 3, true, false, 'refrigerated'),
('ING_CHICHARRON', 'chicharron', 'Chicharrón', 'Fried pork skin/crackling. Used as filling or snack.', 'proteins', 'pork', '{"pork": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_GOAT', 'goat', 'Goat Meat', 'Traditional meat for birria and cabrito. Lean with distinctive flavor.', 'proteins', 'game', '{}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true, "halal": true}', NULL, 0, false, false, 'refrigerated'),
('ING_CARNE_ASADA', 'carne-asada', 'Carne Asada', 'Grilled, marinated beef typically skirt or flank steak.', 'proteins', 'beef', '{"beef": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 1, true, false, 'refrigerated'),
('ING_WHITE_FISH', 'white-fish', 'White Fish', 'Mild white fish like cod, tilapia, or mahi-mahi for fish tacos.', 'seafood', 'fish', '{"fish": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true, "pescatarian": true}', NULL, 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- MEXICAN VEGETABLES (vegetables category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_TOMATILLO', 'tomatillo', 'Tomatillo', 'Small green fruit in papery husk. Tart, citrusy flavor. Base for salsa verde.', 'vegetables', 'nightshades', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_NOPALES', 'nopales', 'Nopales', 'Cactus paddles with slightly tart, green bean-like flavor. Grilled or sautéed.', 'vegetables', 'cactus', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_SQUASH_BLOSSOM', 'squash-blossom', 'Squash Blossom', 'Delicate flowers of squash plant. Used in quesadillas and soups.', 'vegetables', 'flowers', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, true, 'refrigerated'),
('ING_HUITLACOCHE', 'huitlacoche', 'Huitlacoche', 'Corn smut fungus prized as Mexican truffle. Earthy, mushroom-like flavor.', 'vegetables', 'fungi', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, true, 'refrigerated'),
('ING_CORN_COB', 'corn-cob', 'Corn on the Cob', 'Fresh sweet corn for elote.', 'vegetables', 'corn', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_CORN_KERNELS', 'corn-kernels', 'Corn Kernels', 'Fresh or frozen corn kernels for esquites.', 'vegetables', 'corn', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_PICKLED_ONION', 'pickled-onion', 'Pickled Red Onion', 'Yucatecan-style red onions pickled with habanero and lime.', 'vegetables', 'pickled', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 1, true, false, 'refrigerated'),
('ING_TOMATO', 'tomato', 'Tomato', 'Fresh ripe tomato for salsas and sauces.', 'vegetables', 'nightshades', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- MEXICAN HERBS & AROMATICS (herbs category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_EPAZOTE', 'epazote', 'Epazote', 'Pungent Mexican herb with citrus and petroleum notes. Used with beans and quesadillas.', 'herbs', 'mexican', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_AVOCADO_LEAF', 'avocado-leaf', 'Avocado Leaf', 'Aromatic leaf with anise flavor. Used to flavor beans, moles, and barbacoa.', 'herbs', 'mexican', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, false, 'room_temp'),
('ING_BAY_LEAVES', 'bay-leaves', 'Bay Leaves', 'Aromatic dried leaves for stews and braised dishes.', 'herbs', 'dried', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_THYME', 'thyme', 'Thyme', 'Aromatic herb used in Mexican stews and meats.', 'herbs', 'fresh', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_CLOVES', 'cloves', 'Cloves', 'Aromatic spice used in moles and Mexican spice blends.', 'spices', 'whole', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- MEXICAN FRUITS (fruits category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SOUR_ORANGE', 'sour-orange', 'Sour Orange', 'Bitter Seville orange essential for Yucatecan marinades like cochinita pibil.', 'fruits', 'citrus', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, false, 'refrigerated'),
('ING_PLANTAIN', 'plantain', 'Plantain', 'Starchy cooking banana used in moles and as side dish.', 'fruits', 'tropical', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_POMEGRANATE', 'pomegranate', 'Pomegranate', 'Seeds used to garnish chiles en nogada.', 'fruits', 'seeds', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- MEXICAN LEGUMES (legumes category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PINTO_BEANS', 'pinto-beans', 'Pinto Beans', 'Speckled beans popular in Northern Mexico. Used whole or refried.', 'legumes', 'beans', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_HOMINY', 'hominy', 'Hominy', 'Nixtamalized dried corn kernels. Base for pozole.', 'grains', 'corn', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_REFRIED_BEANS', 'refried-beans', 'Refried Beans', 'Mashed and fried pinto or black beans.', 'legumes', 'prepared', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- MEXICAN NUTS & SEEDS (nuts/seeds category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PEPITAS', 'pepitas', 'Pepitas', 'Hulled pumpkin seeds used in moles and as garnish.', 'seeds', 'mexican', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp'),
('ING_WALNUT', 'walnut', 'Walnut', 'Used in nogada sauce for chiles en nogada.', 'nuts', 'tree_nuts', '{"nuts": true}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true}', NULL, 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- MEXICAN WRAPPING LEAVES (other category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BANANA_LEAF', 'banana-leaf', 'Banana Leaf', 'Large leaves for wrapping tamales and cochinita pibil.', 'other', 'wrapping', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'frozen'),
('ING_MAGUEY_LEAF', 'maguey-leaf', 'Maguey Leaf', 'Agave leaves used to wrap barbacoa for steaming.', 'other', 'wrapping', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- MEXICAN FATS & OILS (oils category)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_LARD', 'lard', 'Lard', 'Rendered pork fat essential for authentic tamales and refried beans.', 'oils', 'animal_fats', '{"pork": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'refrigerated'),
('ING_ASIENTO', 'asiento', 'Asiento', 'Oaxacan pork fat with browned bits. Spread on tlayudas.', 'oils', 'animal_fats', '{"pork": true}', '{}', '{"gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, false, false, 'refrigerated'),
('ING_VEGETABLE_OIL', 'vegetable-oil', 'Vegetable Oil', 'Neutral cooking oil.', 'oils', 'vegetable', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- OTHER MEXICAN INGREDIENTS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, intolerances, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_FRENCH_FRIES', 'french-fries', 'French Fries', 'Fried potato strips, used in California burritos.', 'vegetables', 'prepared', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 0, true, false, 'frozen'),
('ING_PICO_DE_GALLO', 'pico-de-gallo', 'Pico de Gallo', 'Fresh chunky salsa with tomato, onion, cilantro, and jalapeño.', 'sauces', 'mexican', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 1, true, false, 'refrigerated'),
('ING_GUACAMOLE', 'guacamole', 'Guacamole', 'Fresh avocado dip with lime, cilantro, and onion.', 'sauces', 'mexican', '{}', '{}', '{"vegan": true, "vegetarian": true, "gluten_free": true, "dairy_free": true, "nut_free": true}', NULL, 1, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- Verify count
SELECT COUNT(*) as new_ingredients_count FROM ingredients WHERE id LIKE 'ING_%' AND (
  id IN ('ING_ACHIOTE', 'ING_ANCHO_CHILE', 'ING_OAXACA_CHEESE', 'ING_CORN_TORTILLA', 'ING_CREMA', 'ING_EPAZOTE', 'ING_TOMATILLO', 'ING_MASA')
);
