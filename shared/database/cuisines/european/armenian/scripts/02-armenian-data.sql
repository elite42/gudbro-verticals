-- ============================================
-- ARMENIAN DATABASE - Dishes Data
-- ============================================
-- 78 authentic Armenian dishes
-- Run AFTER 01-armenian-missing-ingredients.sql
-- ============================================

INSERT INTO armenian (
  id, slug, name, description, armenian_name, armenian_script,
  category, status, region, protein_type, cooking_method,
  is_festive, is_lenten, is_street_food, uses_tonir,
  ingredient_ids, allergens,
  is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_pescatarian,
  calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity
) VALUES

-- ============================================
-- GRILLED MEATS (10)
-- ============================================
('ARM_KHOROVATS_PORK', 'khorovats-pork', 'Pork Khorovats', 'Armenian national BBQ dish with marinated pork skewered and grilled over charcoal on a mangal, served with grilled vegetables and lavash', 'Khorovats', NULL, 'grilled_meats', 'signature', 'national', 'pork', 'grilled', true, false, false, false, ARRAY['ING_PORK_SHOULDER', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_LEMON_JUICE', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_PAPRIKA'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 450, 35, 5, 32, 1, ARRAY['bbq', 'celebration', 'national-dish', 'charcoal'], 98),

('ARM_KHOROVATS_LAMB', 'khorovats-lamb', 'Lamb Khorovats', 'Tender lamb shoulder marinated with herbs and spices, grilled on skewers Armenian-style over open flame', 'Garun Khorovats', NULL, 'grilled_meats', 'traditional', 'ararat', 'lamb', 'grilled', true, false, false, false, ARRAY['ING_LAMB_SHOULDER', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 480, 38, 4, 35, 1, ARRAY['bbq', 'lamb', 'traditional', 'festive'], 92),

('ARM_KHOROVATS_CHICKEN', 'khorovats-chicken', 'Chicken Khorovats', 'Whole chicken or chicken pieces marinated in Armenian spices and grilled over charcoal until crispy', 'Hav Khorovats', NULL, 'grilled_meats', 'popular', 'national', 'chicken', 'grilled', false, false, true, false, ARRAY['ING_CHICKEN_WHOLE', 'ING_ONION', 'ING_GARLIC', 'ING_LEMON_JUICE', 'ING_PAPRIKA', 'ING_SUMAC', 'ING_OLIVE_OIL', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 380, 42, 3, 22, 1, ARRAY['chicken', 'bbq', 'everyday', 'popular'], 88),

('ARM_LULA_KEBAB', 'lula-kebab', 'Lula Kebab', 'Ground meat kebab mixed with onions and spices, shaped around flat skewers and grilled over charcoal', 'Lula Kebab', NULL, 'grilled_meats', 'classic', 'national', 'mixed', 'grilled', false, false, true, false, ARRAY['ING_GROUND_LAMB', 'ING_GROUND_BEEF', 'ING_ONION', 'ING_PARSLEY', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_LAMB_FAT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 420, 32, 6, 30, 1, ARRAY['kebab', 'ground-meat', 'street-food'], 90),

('ARM_TIKKA_KEBAB', 'tikka-kebab', 'Tikka Kebab', 'Cubed beef or lamb marinated in Armenian spices, skewered and grilled to perfection', 'Tikka Kebab', NULL, 'grilled_meats', 'classic', 'western_armenian', 'beef', 'grilled', false, false, true, false, ARRAY['ING_BEEF_SIRLOIN', 'ING_ONION', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_OLIVE_OIL', 'ING_PAPRIKA', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 400, 36, 8, 26, 1, ARRAY['kebab', 'beef', 'cubed'], 85),

('ARM_ISHKHAN_GRILLED', 'ishkhan-grilled', 'Grilled Ishkhan', 'Lake Sevan trout grilled whole with herbs and lemon, a prized Armenian delicacy', 'Ishkhan Khorovats', NULL, 'grilled_meats', 'premium', 'gegharkunik', 'trout', 'grilled', true, true, false, false, ARRAY['ING_TROUT', 'ING_LEMON', 'ING_DILL', 'ING_PARSLEY', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_SALT', 'ING_BLACK_PEPPER'], ARRAY['fish'], true, true, true, false, false, true, true, 280, 35, 2, 14, 0, ARRAY['fish', 'trout', 'lake-sevan', 'premium'], 82),

('ARM_KHOROVATS_VEGETABLE', 'khorovats-vegetable', 'Vegetable Khorovats', 'Assorted vegetables - eggplant, tomatoes, peppers, onions - grilled over charcoal and served with fresh herbs', 'Banjareghen Khorovats', NULL, 'grilled_meats', 'popular', 'national', 'vegan', 'grilled', false, true, true, false, ARRAY['ING_EGGPLANT', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_PARSLEY', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 120, 3, 18, 6, 0, ARRAY['vegetarian', 'vegan', 'lenten', 'healthy'], 78),

('ARM_KHOROVATS_LIVER', 'khorovats-liver', 'Grilled Liver Khorovats', 'Fresh lamb or beef liver grilled on skewers, a traditional Armenian delicacy often served as appetizer', 'Lerd Khorovats', NULL, 'grilled_meats', 'traditional', 'shirak', 'lamb', 'grilled', false, false, false, false, ARRAY['ING_LAMB_LIVER', 'ING_LAMB_FAT', 'ING_ONION', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_SUMAC'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 220, 28, 4, 10, 1, ARRAY['offal', 'liver', 'traditional'], 70),

('ARM_KHOROVATS_RIBS', 'khorovats-ribs', 'Pork Ribs Khorovats', 'Marinated pork spare ribs grilled slowly over charcoal until tender and caramelized', 'Khorovats Koghik', NULL, 'grilled_meats', 'popular', 'yerevan', 'pork', 'grilled', true, false, false, false, ARRAY['ING_PORK_RIBS', 'ING_ONION', 'ING_GARLIC', 'ING_TOMATO_PASTE', 'ING_PAPRIKA', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_HONEY'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 520, 32, 8, 40, 1, ARRAY['ribs', 'pork', 'festive', 'bbq'], 86),

('ARM_SHASHLIK', 'shashlik', 'Armenian Shashlik', 'Classic marinated meat skewers in the Caucasian style, grilled over open flame with onions', 'Shashlik', NULL, 'grilled_meats', 'classic', 'national', 'mixed', 'grilled', false, false, true, false, ARRAY['ING_BEEF_SIRLOIN', 'ING_LAMB_LEG', 'ING_ONION', 'ING_VINEGAR', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_BAY_LEAVES'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 440, 36, 5, 30, 1, ARRAY['shashlik', 'caucasian', 'bbq', 'classic'], 84),

-- ============================================
-- DOLMA & SARMA (8)
-- ============================================
('ARM_TOLMA_GRAPE', 'tolma-grape-leaves', 'Grape Leaf Tolma', 'Armenian national dish of grape leaves stuffed with spiced ground meat, rice, and fresh herbs, served with garlic yogurt', 'Tolma', NULL, 'dolma_sarma', 'signature', 'national', 'mixed', 'stuffed', true, false, false, false, ARRAY['ING_GRAPE_LEAVES', 'ING_GROUND_BEEF', 'ING_GROUND_LAMB', 'ING_RICE', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_PARSLEY', 'ING_DILL', 'ING_MINT', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 320, 18, 28, 16, 1, ARRAY['national-dish', 'stuffed', 'grape-leaves', 'festive'], 96),

('ARM_PASUS_TOLMA', 'pasus-tolma', 'Pasus Tolma (Lenten)', 'Meatless tolma for Armenian Apostolic fasting, stuffed with lentils, chickpeas, bulgur, and aromatic herbs', 'Pasus Tolma', NULL, 'dolma_sarma', 'traditional', 'national', 'vegan', 'stuffed', false, true, false, false, ARRAY['ING_GRAPE_LEAVES', 'ING_LENTILS', 'ING_CHICKPEAS', 'ING_BULGUR', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_PARSLEY', 'ING_MINT', 'ING_OLIVE_OIL', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 240, 12, 38, 6, 1, ARRAY['lenten', 'vegan', 'fasting', 'traditional'], 82),

('ARM_TOLMA_CABBAGE', 'tolma-cabbage', 'Cabbage Tolma', 'Ground meat and rice mixture wrapped in tender cabbage leaves, simmered in tomato broth', 'Kaghambi Tolma', NULL, 'dolma_sarma', 'classic', 'national', 'mixed', 'stuffed', false, false, false, false, ARRAY['ING_CABBAGE', 'ING_GROUND_BEEF', 'ING_RICE', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_PARSLEY', 'ING_DILL', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 310, 16, 30, 14, 1, ARRAY['cabbage', 'winter', 'comfort-food'], 85),

('ARM_SUMMER_TOLMA', 'summer-tolma', 'Summer Tolma', 'Seasonal vegetables - peppers, tomatoes, eggplants, zucchini - stuffed with spiced meat and rice mixture', 'Amarna Tolma', NULL, 'dolma_sarma', 'popular', 'ararat', 'mixed', 'stuffed', false, false, false, false, ARRAY['ING_BELL_PEPPER', 'ING_TOMATO', 'ING_EGGPLANT', 'ING_ZUCCHINI', 'ING_GROUND_BEEF', 'ING_RICE', 'ING_ONION', 'ING_PARSLEY', 'ING_BASIL', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 340, 17, 32, 16, 1, ARRAY['summer', 'seasonal', 'vegetables', 'colorful'], 88),

('ARM_EETCH_TOLMA', 'eetch-tolma', 'Eetch Stuffed Peppers', 'Bell peppers stuffed with bulgur, tomatoes, and herbs - a popular vegetarian Armenian dish', 'Eetch Tolma', NULL, 'dolma_sarma', 'popular', 'western_armenian', 'vegetarian', 'stuffed', false, true, false, false, ARRAY['ING_BELL_PEPPER', 'ING_BULGUR', 'ING_TOMATO', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_PARSLEY', 'ING_MINT', 'ING_OLIVE_OIL', 'ING_LEMON_JUICE', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 220, 8, 40, 5, 1, ARRAY['vegetarian', 'bulgur', 'healthy', 'lenten'], 80),

('ARM_TOLMA_QUINCE', 'tolma-quince', 'Quince Tolma', 'Unique Armenian dish of hollowed quince stuffed with spiced meat, a sweet-savory autumn delicacy', 'Serkevil Tolma', NULL, 'dolma_sarma', 'traditional', 'vayots_dzor', 'lamb', 'stuffed', true, false, false, false, ARRAY['ING_QUINCE', 'ING_GROUND_LAMB', 'ING_RICE', 'ING_ONION', 'ING_CINNAMON', 'ING_ALLSPICE', 'ING_BUTTER', 'ING_SALT'], ARRAY['dairy'], true, false, true, false, false, true, false, 380, 18, 35, 18, 0, ARRAY['quince', 'autumn', 'sweet-savory', 'unique'], 72),

('ARM_TOLMA_APPLE', 'tolma-apple', 'Apple Tolma', 'Sweet apples stuffed with spiced lamb and rice, baked until caramelized', 'Khndzor Tolma', NULL, 'dolma_sarma', 'traditional', 'kotayk', 'lamb', 'stuffed', true, false, false, false, ARRAY['ING_APPLE', 'ING_GROUND_LAMB', 'ING_RICE', 'ING_ONION', 'ING_CINNAMON', 'ING_HONEY', 'ING_BUTTER', 'ING_SALT'], ARRAY['dairy'], true, false, true, false, false, true, false, 360, 16, 38, 16, 0, ARRAY['apple', 'sweet-savory', 'autumn', 'festive'], 70),

('ARM_PRASA_TOLMA', 'prasa-tolma', 'Leek Tolma', 'Tender leek leaves wrapped around spiced meat filling, a lesser-known but delicious Armenian specialty', 'Prasa Tolma', NULL, 'dolma_sarma', 'traditional', 'shirak', 'beef', 'stuffed', false, false, false, false, ARRAY['ING_LEEK', 'ING_GROUND_BEEF', 'ING_RICE', 'ING_ONION', 'ING_PARSLEY', 'ING_DILL', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 300, 16, 28, 14, 1, ARRAY['leek', 'winter', 'traditional', 'comfort-food'], 68),

-- ============================================
-- SOUPS (8)
-- ============================================
('ARM_KHASH', 'khash', 'Khash', 'Traditional Armenian bone broth soup made from cow or sheep feet, simmered overnight. A ritual dish served with garlic, lavash, and vodka', 'Khash', NULL, 'soups', 'signature', 'national', 'beef', 'boiled', true, false, false, false, ARRAY['ING_BEEF_FEET', 'ING_GARLIC', 'ING_SALT', 'ING_LAVASH', 'ING_RADISH', 'ING_VINEGAR'], ARRAY['gluten'], false, true, true, false, false, true, false, 380, 28, 15, 24, 1, ARRAY['hangover-cure', 'ritual', 'winter', 'national-dish'], 92),

('ARM_SPAS', 'spas', 'Spas', 'Creamy Armenian yogurt soup with wheat berries and fresh herbs, served hot in winter or cold in summer', 'Spas', NULL, 'soups', 'classic', 'national', 'vegetarian', 'boiled', false, false, false, false, ARRAY['ING_YOGURT', 'ING_WHEAT_BERRIES', 'ING_EGG', 'ING_ONION', 'ING_BUTTER', 'ING_MINT', 'ING_CILANTRO', 'ING_SALT'], ARRAY['dairy', 'egg', 'gluten'], false, false, true, false, true, true, true, 280, 12, 32, 12, 0, ARRAY['yogurt', 'comfort-food', 'healthy', 'year-round'], 88),

('ARM_BOZBASH', 'bozbash', 'Bozbash', 'Hearty lamb soup with chickpeas, potatoes, and dried fruits, seasoned with saffron and herbs', 'Bozbash', NULL, 'soups', 'traditional', 'ararat', 'lamb', 'stewed', true, false, false, false, ARRAY['ING_LAMB_SHOULDER', 'ING_CHICKPEAS', 'ING_POTATO', 'ING_DRIED_APRICOTS', 'ING_PRUNES', 'ING_ONION', 'ING_SAFFRON', 'ING_TURMERIC', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 420, 28, 35, 20, 1, ARRAY['hearty', 'lamb', 'dried-fruits', 'festive'], 84),

('ARM_KOLOLAK', 'kololak', 'Kololak', 'Traditional Armenian meatball soup with aromatic herbs, a comforting winter dish', 'Kololak', NULL, 'soups', 'classic', 'shirak', 'beef', 'boiled', false, false, false, false, ARRAY['ING_GROUND_BEEF', 'ING_RICE', 'ING_EGG', 'ING_ONION', 'ING_PARSLEY', 'ING_TOMATO_PASTE', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['egg'], true, true, true, false, false, true, false, 340, 22, 28, 16, 1, ARRAY['meatball', 'winter', 'comfort-food'], 80),

('ARM_AVELUK_SOUP', 'aveluk-soup', 'Aveluk Soup', 'Unique soup made with wild mountain sorrel (aveluk), lentils, and walnuts - a distinctive Armenian flavor', 'Aveluk Apour', NULL, 'soups', 'traditional', 'syunik', 'vegetarian', 'boiled', false, true, false, false, ARRAY['ING_AVELUK', 'ING_LENTILS', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 260, 14, 28, 12, 0, ARRAY['wild-herbs', 'lenten', 'unique', 'regional'], 75),

('ARM_TARKHANA', 'tarkhana', 'Tarkhana Soup', 'Armenian fermented wheat and yogurt soup, rehydrated and cooked into a tangy, warming dish', 'Tarkhana', NULL, 'soups', 'traditional', 'western_armenian', 'vegetarian', 'boiled', false, false, false, false, ARRAY['ING_TARKHANA', 'ING_BUTTER', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_MINT', 'ING_SALT'], ARRAY['dairy', 'gluten'], false, false, true, false, true, true, true, 220, 8, 30, 8, 0, ARRAY['fermented', 'tangy', 'winter', 'traditional'], 72),

('ARM_VOSPAPUR', 'vospapur', 'Vospapur', 'Armenian red lentil soup with dried apricots, a sweet and savory winter staple', 'Vospapur', NULL, 'soups', 'classic', 'national', 'vegan', 'boiled', false, true, false, false, ARRAY['ING_RED_LENTILS', 'ING_DRIED_APRICOTS', 'ING_ONION', 'ING_POTATO', 'ING_CUMIN', 'ING_OLIVE_OIL', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 240, 14, 38, 4, 0, ARRAY['lentil', 'vegan', 'lenten', 'sweet-savory'], 82),

('ARM_MATSUN_SOUP', 'matsun-soup', 'Cold Matsun Soup', 'Refreshing cold yogurt soup with cucumber, herbs, and walnuts - perfect for Armenian summers', 'Matsun Apour', NULL, 'soups', 'popular', 'national', 'vegetarian', 'raw', false, false, false, false, ARRAY['ING_YOGURT', 'ING_CUCUMBER', 'ING_DILL', 'ING_MINT', 'ING_WALNUTS', 'ING_GARLIC', 'ING_SALT', 'ING_ICE'], ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, true, 180, 8, 12, 12, 0, ARRAY['cold', 'summer', 'refreshing', 'yogurt'], 78),

-- ============================================
-- DUMPLINGS (6)
-- ============================================
('ARM_MANTI', 'armenian-manti', 'Armenian Manti', 'Small boat-shaped dumplings filled with spiced lamb, baked and served with garlic yogurt and tomato sauce', 'Manti', NULL, 'dumplings', 'signature', 'western_armenian', 'lamb', 'baked', true, false, false, false, ARRAY['ING_FLOUR', 'ING_EGG', 'ING_GROUND_LAMB', 'ING_ONION', 'ING_PARSLEY', 'ING_YOGURT', 'ING_GARLIC', 'ING_TOMATO_PASTE', 'ING_BUTTER', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['gluten', 'egg', 'dairy'], false, false, true, false, false, true, false, 420, 22, 38, 20, 1, ARRAY['dumplings', 'festive', 'baked', 'yogurt-sauce'], 94),

('ARM_KHINKALI', 'armenian-khinkali', 'Khinkali', 'Large soup dumplings with spiced meat filling, twisted on top - eaten by hand, drinking the broth first', 'Khinkali', NULL, 'dumplings', 'popular', 'lori', 'mixed', 'boiled', false, false, true, false, ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_ONION', 'ING_CILANTRO', 'ING_CUMIN', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_BEEF_BROTH'], ARRAY['gluten'], false, true, true, false, false, false, false, 380, 20, 35, 18, 1, ARRAY['soup-dumplings', 'georgian-influence', 'hearty'], 86),

('ARM_BORAKI', 'boraki', 'Boraki', 'Pan-fried meat dumplings with open ends, crispy on the bottom and served with yogurt', 'Boraki', NULL, 'dumplings', 'classic', 'yerevan', 'beef', 'fried', false, false, false, false, ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_ONION', 'ING_PARSLEY', 'ING_BUTTER', 'ING_YOGURT', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['gluten', 'dairy'], false, false, true, false, false, true, false, 360, 18, 32, 18, 1, ARRAY['pan-fried', 'crispy', 'open-ended'], 82),

('ARM_MANTAPOUR', 'mantapour', 'Mantapour', 'Manti dumplings served in a rich, spiced broth - a hearty soup-dumpling combination', 'Mantapour', NULL, 'dumplings', 'traditional', 'shirak', 'lamb', 'boiled', false, false, false, false, ARRAY['ING_FLOUR', 'ING_GROUND_LAMB', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_BEEF_BROTH', 'ING_PARSLEY', 'ING_MINT', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['gluten'], false, true, true, false, false, true, false, 340, 20, 30, 16, 1, ARRAY['soup', 'dumplings', 'winter', 'hearty'], 78),

('ARM_PELMEN', 'armenian-pelmen', 'Armenian Pelmeni', 'Small meat dumplings influenced by Russian cuisine, boiled and served with butter or sour cream', 'Pelmen', NULL, 'dumplings', 'popular', 'national', 'mixed', 'boiled', false, false, false, false, ARRAY['ING_FLOUR', 'ING_EGG', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_ONION', 'ING_BUTTER', 'ING_SOUR_CREAM', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['gluten', 'egg', 'dairy'], false, false, true, false, false, false, false, 350, 18, 30, 18, 0, ARRAY['russian-influence', 'comfort-food', 'butter'], 76),

('ARM_MANTI_LENTEN', 'manti-lenten', 'Lenten Manti', 'Manti dumplings filled with spiced lentils and onions for Armenian Apostolic fasting periods', 'Pasus Manti', NULL, 'dumplings', 'traditional', 'national', 'vegan', 'baked', false, true, false, false, ARRAY['ING_FLOUR', 'ING_LENTILS', 'ING_ONION', 'ING_OLIVE_OIL', 'ING_CUMIN', 'ING_PARSLEY', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 280, 12, 45, 6, 1, ARRAY['lenten', 'vegan', 'fasting', 'traditional'], 70),

-- ============================================
-- STEWS & MAINS (10)
-- ============================================
('ARM_HARISSA', 'harissa', 'Harissa', 'Ancient Armenian porridge of slow-cooked chicken and crushed wheat, stirred for hours until creamy. A ritualistic Easter and memorial dish', 'Harissa', NULL, 'stews_mains', 'signature', 'national', 'chicken', 'stewed', true, false, false, false, ARRAY['ING_CHICKEN_WHOLE', 'ING_WHEAT_BERRIES', 'ING_BUTTER', 'ING_SALT', 'ING_BLACK_PEPPER'], ARRAY['gluten', 'dairy'], false, false, true, false, false, true, false, 450, 32, 40, 18, 0, ARRAY['easter', 'memorial', 'ritual', 'national-dish'], 94),

('ARM_GHAPAMA', 'ghapama', 'Ghapama', 'Festive stuffed pumpkin filled with rice, dried fruits, nuts, and honey - the iconic Armenian celebration dish with its own song', 'Ghapama', NULL, 'stews_mains', 'signature', 'ararat', 'vegetarian', 'baked', true, false, false, true, ARRAY['ING_PUMPKIN', 'ING_RICE', 'ING_DRIED_APRICOTS', 'ING_RAISINS', 'ING_PRUNES', 'ING_WALNUTS', 'ING_ALMONDS', 'ING_HONEY', 'ING_CINNAMON', 'ING_BUTTER'], ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, true, 380, 8, 62, 14, 0, ARRAY['festive', 'new-year', 'wedding', 'sweet'], 96),

('ARM_KHASHLAMA', 'khashlama', 'Khashlama', 'Simple but rich lamb stew with potatoes, tomatoes, and peppers, slow-cooked to tender perfection', 'Khashlama', NULL, 'stews_mains', 'classic', 'national', 'lamb', 'stewed', false, false, false, false, ARRAY['ING_LAMB_SHOULDER', 'ING_POTATO', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_PARSLEY', 'ING_DILL', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 420, 30, 28, 22, 1, ARRAY['lamb', 'stew', 'one-pot', 'comfort-food'], 88),

('ARM_TJVJIK', 'tjvjik', 'Tjvjik', 'Armenian liver and offal dish fried with onions, tomatoes, and fresh herbs - a traditional delicacy', 'Tjvjik', NULL, 'stews_mains', 'traditional', 'national', 'beef', 'fried', false, false, false, false, ARRAY['ING_BEEF_LIVER', 'ING_BEEF_HEART', 'ING_ONION', 'ING_TOMATO_PASTE', 'ING_BELL_PEPPER', 'ING_PARSLEY', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 280, 32, 10, 14, 1, ARRAY['offal', 'liver', 'traditional', 'iron-rich'], 72),

('ARM_ISHKHAN_BAKED', 'ishkhan-baked', 'Baked Ishkhan', 'Lake Sevan trout stuffed with herbs and rice, baked in the oven - Armenia''s premium fish dish', 'Tsknots Ishkhan', NULL, 'stews_mains', 'premium', 'gegharkunik', 'trout', 'baked', true, true, false, false, ARRAY['ING_TROUT', 'ING_RICE', 'ING_DILL', 'ING_PARSLEY', 'ING_LEMON', 'ING_BUTTER', 'ING_GARLIC', 'ING_SALT'], ARRAY['fish', 'dairy'], true, false, true, false, false, true, true, 340, 38, 18, 14, 0, ARRAY['fish', 'lake-sevan', 'premium', 'stuffed'], 84),

('ARM_PASUTS_FASULYA', 'pasuts-fasulya', 'Pasuts Fasulya', 'Armenian lenten bean stew with caramelized onions and walnuts, served cold or at room temperature', 'Pasuts Fasulya', NULL, 'stews_mains', 'traditional', 'national', 'vegan', 'stewed', false, true, false, false, ARRAY['ING_WHITE_BEANS', 'ING_ONION', 'ING_WALNUTS', 'ING_OLIVE_OIL', 'ING_PARSLEY', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 280, 14, 35, 12, 0, ARRAY['lenten', 'beans', 'vegan', 'cold-dish'], 76),

('ARM_KYUFTA', 'kyufta', 'Kyufta', 'Large Armenian meatballs made with finely pounded meat, bulgur, and spices - boiled until fluffy', 'Kyufta', NULL, 'stews_mains', 'classic', 'shirak', 'beef', 'boiled', false, false, false, false, ARRAY['ING_GROUND_BEEF', 'ING_BULGUR', 'ING_ONION', 'ING_EGG', 'ING_BUTTER', 'ING_PARSLEY', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['gluten', 'egg', 'dairy'], false, false, true, false, false, true, false, 380, 28, 25, 20, 1, ARRAY['meatball', 'bulgur', 'traditional'], 82),

('ARM_KCHUCH', 'kchuch', 'Kchuch (Clay Pot Stew)', 'Traditional Armenian one-pot meal cooked in a clay pot with lamb, vegetables, and dried fruits', 'Kchuch', NULL, 'stews_mains', 'traditional', 'ararat', 'lamb', 'stewed', false, false, false, true, ARRAY['ING_LAMB_SHOULDER', 'ING_POTATO', 'ING_EGGPLANT', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_DRIED_APRICOTS', 'ING_PRUNES', 'ING_GARLIC', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 440, 28, 38, 22, 1, ARRAY['clay-pot', 'one-pot', 'dried-fruits', 'rustic'], 80),

('ARM_TAVA', 'tava-lamb', 'Tava (Lamb Casserole)', 'Layered lamb and vegetable casserole baked until caramelized, a hearty Armenian comfort food', 'Tava', NULL, 'stews_mains', 'classic', 'yerevan', 'lamb', 'baked', false, false, false, false, ARRAY['ING_LAMB_LEG', 'ING_POTATO', 'ING_TOMATO', 'ING_EGGPLANT', 'ING_ONION', 'ING_GARLIC', 'ING_BUTTER', 'ING_PARSLEY', 'ING_SALT'], ARRAY['dairy'], true, false, true, false, false, true, false, 460, 30, 32, 24, 1, ARRAY['casserole', 'layered', 'baked', 'comfort-food'], 78),

('ARM_PORANI', 'porani', 'Porani (Spinach Stew)', 'Hearty vegetarian stew of spinach, onions, and eggs cooked in butter - a nutritious Armenian classic', 'Porani', NULL, 'stews_mains', 'classic', 'national', 'vegetarian', 'stewed', false, false, false, false, ARRAY['ING_SPINACH', 'ING_ONION', 'ING_EGG', 'ING_BUTTER', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['egg', 'dairy'], true, false, true, false, true, true, true, 220, 12, 10, 16, 0, ARRAY['spinach', 'vegetarian', 'eggs', 'healthy'], 74),

-- ============================================
-- APPETIZERS & MEZZE (8)
-- ============================================
('ARM_BASTURMA', 'basturma', 'Basturma', 'Air-dried cured beef coated in chaman (fenugreek paste), sliced paper-thin - Armenia''s signature charcuterie', 'Basturma', NULL, 'appetizers_mezze', 'signature', 'national', 'beef', 'cured', true, false, false, false, ARRAY['ING_BEEF_EYE_ROUND', 'ING_FENUGREEK', 'ING_PAPRIKA', 'ING_CUMIN', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 180, 28, 2, 8, 2, ARRAY['cured-meat', 'charcuterie', 'new-year', 'premium'], 94),

('ARM_LAHMAJUN', 'lahmajun', 'Lahmajun', 'Paper-thin Armenian pizza topped with spiced lamb, tomatoes, and onions - rolled with fresh herbs and lemon', 'Lahmajun', NULL, 'appetizers_mezze', 'signature', 'western_armenian', 'lamb', 'baked', false, false, true, true, ARRAY['ING_FLOUR', 'ING_GROUND_LAMB', 'ING_TOMATO', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_PARSLEY', 'ING_PAPRIKA', 'ING_CUMIN', 'ING_LEMON', 'ING_SALT'], ARRAY['gluten'], false, true, true, false, false, true, false, 320, 18, 35, 12, 2, ARRAY['armenian-pizza', 'street-food', 'rolled'], 96),

('ARM_SOUJOUK', 'soujouk-armenian', 'Soujouk (Sausage)', 'Spiced dried beef sausage seasoned with cumin, fenugreek, and garlic - sliced thin or fried with eggs', 'Soujouk', NULL, 'appetizers_mezze', 'classic', 'national', 'beef', 'cured', false, false, false, false, ARRAY['ING_GROUND_BEEF', 'ING_FENUGREEK', 'ING_CUMIN', 'ING_PAPRIKA', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 200, 22, 2, 12, 2, ARRAY['sausage', 'cured', 'breakfast', 'charcuterie'], 88),

('ARM_CHI_KOFTA', 'chi-kofta', 'Chi Kofta (Raw Kofta)', 'Armenian steak tartare made with finely pounded raw beef or lamb, bulgur, and spices - served with lavash', 'Chi Kofta', NULL, 'appetizers_mezze', 'traditional', 'western_armenian', 'beef', 'raw', true, false, false, false, ARRAY['ING_BEEF_SIRLOIN', 'ING_BULGUR', 'ING_ONION', 'ING_PARSLEY', 'ING_PAPRIKA', 'ING_CUMIN', 'ING_OLIVE_OIL', 'ING_SALT'], ARRAY['gluten'], false, true, true, false, false, true, false, 280, 26, 18, 14, 2, ARRAY['raw', 'tartare', 'festive', 'traditional'], 82),

('ARM_JINGALOV_HATS', 'jingalov-hats', 'Jingalov Hats', 'Traditional flatbread stuffed with over 20 types of wild herbs and greens - a spring specialty from Artsakh', 'Jingalov Hats', NULL, 'appetizers_mezze', 'signature', 'syunik', 'vegan', 'baked', false, true, true, false, ARRAY['ING_FLOUR', 'ING_SPINACH', 'ING_SORREL', 'ING_DILL', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_GREEN_ONION', 'ING_OLIVE_OIL', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 240, 8, 38, 8, 0, ARRAY['herbs', 'flatbread', 'spring', 'artsakh'], 90),

('ARM_CHEESE_BEUREG', 'chee-beureg', 'Cheese Beureg', 'Flaky phyllo pastry filled with Armenian string cheese and parsley, baked until golden', 'Beureg', NULL, 'appetizers_mezze', 'classic', 'national', 'vegetarian', 'baked', false, false, false, false, ARRAY['ING_PHYLLO_DOUGH', 'ING_STRING_CHEESE', 'ING_FETA_CHEESE', 'ING_EGG', 'ING_PARSLEY', 'ING_BUTTER'], ARRAY['gluten', 'dairy', 'egg'], false, false, true, false, true, true, true, 320, 14, 25, 20, 0, ARRAY['cheese', 'pastry', 'phyllo', 'breakfast'], 86),

('ARM_TOPIK', 'topik', 'Topik', 'Unique Armenian appetizer of chickpea-potato domes filled with spiced onion and tahini, served cold', 'Topik', NULL, 'appetizers_mezze', 'traditional', 'western_armenian', 'vegan', 'boiled', false, true, false, false, ARRAY['ING_CHICKPEAS', 'ING_POTATO', 'ING_ONION', 'ING_TAHINI', 'ING_CUMIN', 'ING_CINNAMON', 'ING_PINE_NUTS', 'ING_CURRANTS', 'ING_SALT'], ARRAY['sesame', 'tree_nuts'], true, true, false, true, true, true, true, 260, 10, 32, 12, 1, ARRAY['lenten', 'cold-appetizer', 'unique', 'vegan'], 74),

('ARM_MUHAMMARA', 'muhammara-armenian', 'Armenian Muhammara', 'Roasted red pepper and walnut dip with pomegranate molasses and Aleppo pepper', 'Muhammara', NULL, 'appetizers_mezze', 'popular', 'western_armenian', 'vegan', 'raw', false, true, false, false, ARRAY['ING_ROASTED_RED_PEPPER', 'ING_WALNUTS', 'ING_POMEGRANATE_MOLASSES', 'ING_ALEPPO_PEPPER', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_CUMIN', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 180, 4, 12, 14, 2, ARRAY['dip', 'walnuts', 'pomegranate', 'mezze'], 80),

-- ============================================
-- SALADS & SIDES (6)
-- ============================================
('ARM_EETCH', 'eetch', 'Eetch (Bulgur Salad)', 'Armenian bulgur salad with tomatoes, peppers, parsley, and pomegranate molasses - similar to tabbouleh but heartier', 'Eetch', NULL, 'salads_sides', 'classic', 'national', 'vegan', 'raw', false, true, false, false, ARRAY['ING_BULGUR', 'ING_TOMATO', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_PARSLEY', 'ING_TOMATO_PASTE', 'ING_POMEGRANATE_MOLASSES', 'ING_OLIVE_OIL', 'ING_LEMON_JUICE', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 180, 6, 32, 5, 1, ARRAY['bulgur', 'salad', 'lenten', 'healthy'], 88),

('ARM_TORSHI', 'torshi', 'Torshi (Mixed Pickles)', 'Assorted Armenian pickled vegetables - cauliflower, cabbage, carrots, peppers - in brine with garlic and herbs', 'Torshi', NULL, 'salads_sides', 'classic', 'national', 'vegan', 'fermented', false, true, false, false, ARRAY['ING_CAULIFLOWER', 'ING_CABBAGE', 'ING_CARROT', 'ING_BELL_PEPPER', 'ING_GARLIC', 'ING_DILL', 'ING_VINEGAR', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 25, 1, 5, 0, 1, ARRAY['pickles', 'fermented', 'side-dish', 'probiotic'], 82),

('ARM_PANCAR', 'pancar-salad', 'Pancar (Beet Salad)', 'Vibrant Armenian beet salad with walnuts, garlic, and yogurt dressing', 'Pancar', NULL, 'salads_sides', 'popular', 'national', 'vegetarian', 'boiled', false, false, false, false, ARRAY['ING_BEET', 'ING_WALNUTS', 'ING_GARLIC', 'ING_YOGURT', 'ING_DILL', 'ING_SALT'], ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, true, 140, 5, 14, 8, 0, ARRAY['beet', 'walnuts', 'colorful', 'healthy'], 78),

('ARM_TUTUM', 'tutum', 'Tutum (Garlic Yogurt)', 'Thick strained yogurt mixed with crushed garlic and salt - essential accompaniment to many Armenian dishes', 'Tutum', NULL, 'salads_sides', 'classic', 'national', 'vegetarian', 'raw', false, false, false, false, ARRAY['ING_YOGURT', 'ING_GARLIC', 'ING_SALT'], ARRAY['dairy'], true, false, true, false, true, true, true, 60, 4, 5, 3, 1, ARRAY['yogurt', 'sauce', 'garlic', 'condiment'], 90),

('ARM_AVELUK_SALAD', 'aveluk-salad', 'Aveluk Salad', 'Wild mountain sorrel (aveluk) salad with walnuts, garlic, and pomegranate - a unique Armenian flavor', 'Aveluk Aghtsան', NULL, 'salads_sides', 'traditional', 'syunik', 'vegan', 'boiled', false, true, false, false, ARRAY['ING_AVELUK', 'ING_WALNUTS', 'ING_GARLIC', 'ING_POMEGRANATE_SEEDS', 'ING_OLIVE_OIL', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 150, 5, 12, 10, 0, ARRAY['wild-herbs', 'walnuts', 'unique', 'regional'], 72),

('ARM_LOBIA', 'lobia-salad', 'Lobia (Bean Salad)', 'Armenian kidney bean salad with walnuts, herbs, and pomegranate molasses dressing', 'Lobia', NULL, 'salads_sides', 'popular', 'national', 'vegan', 'boiled', false, true, false, false, ARRAY['ING_KIDNEY_BEANS', 'ING_WALNUTS', 'ING_ONION', 'ING_CILANTRO', 'ING_POMEGRANATE_MOLASSES', 'ING_OLIVE_OIL', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 200, 10, 28, 8, 0, ARRAY['beans', 'protein', 'lenten', 'healthy'], 76),

-- ============================================
-- BREADS (6)
-- ============================================
('ARM_LAVASH', 'lavash', 'Lavash', 'UNESCO-recognized Armenian flatbread baked in a tonir oven - thin, soft, and versatile. The heart of Armenian cuisine', 'Lavash', NULL, 'breads', 'signature', 'national', 'vegan', 'baked', false, true, false, true, ARRAY['ING_FLOUR', 'ING_WATER', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 120, 4, 24, 1, 0, ARRAY['unesco', 'flatbread', 'tonir', 'national-symbol'], 98),

('ARM_MATNAKASH', 'matnakash', 'Matnakash', 'Oval-shaped Armenian leavened bread with distinctive finger-drawn ridges, soft and slightly sweet', 'Matnakash', NULL, 'breads', 'classic', 'national', 'vegetarian', 'baked', false, false, false, true, ARRAY['ING_FLOUR', 'ING_YEAST', 'ING_WATER', 'ING_MILK', 'ING_BUTTER', 'ING_SUGAR', 'ING_SALT'], ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 180, 6, 32, 4, 0, ARRAY['leavened', 'soft', 'everyday', 'finger-drawn'], 92),

('ARM_TONIR_HATS', 'tonir-bread', 'Tonir Hats', 'Traditional bread baked on the walls of a tonir (underground clay oven), with a distinctive smoky flavor', 'Tonir Hats', NULL, 'breads', 'traditional', 'ararat', 'vegan', 'baked', false, true, false, true, ARRAY['ING_FLOUR', 'ING_YEAST', 'ING_WATER', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 150, 5, 28, 2, 0, ARRAY['tonir', 'traditional', 'smoky', 'artisan'], 84),

('ARM_ZHINGYALOV_HATS_BREAD', 'zhingyalov-hats-bread', 'Zhingyalov Hats', 'Unique flatbread stuffed with up to 20 types of wild herbs and greens from Artsakh region', 'Zhingyalov Hats', NULL, 'breads', 'signature', 'syunik', 'vegan', 'baked', false, true, true, false, ARRAY['ING_FLOUR', 'ING_SPINACH', 'ING_SORREL', 'ING_DILL', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_GREEN_ONION', 'ING_CHIVES', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 220, 7, 35, 6, 0, ARRAY['herb-filled', 'artsakh', 'spring', 'wild-herbs'], 88),

('ARM_CHOREK', 'chorek', 'Chorek (Sweet Bread)', 'Armenian sweet bread flavored with mahleb and anise, often braided and topped with sesame seeds', 'Chorek', NULL, 'breads', 'festive', 'national', 'vegetarian', 'baked', true, false, false, false, ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_MILK', 'ING_EGG', 'ING_SUGAR', 'ING_YEAST', 'ING_MAHLAB', 'ING_ANISE_SEEDS', 'ING_SESAME_SEEDS'], ARRAY['gluten', 'dairy', 'egg', 'sesame'], false, false, true, false, true, true, true, 280, 7, 42, 10, 0, ARRAY['sweet', 'easter', 'braided', 'festive'], 86),

('ARM_KATA', 'kata-bread', 'Kata', 'Round Armenian bread topped with butter and salt, a simpler cousin of matnakash', 'Kata', NULL, 'breads', 'classic', 'shirak', 'vegetarian', 'baked', false, false, false, true, ARRAY['ING_FLOUR', 'ING_YEAST', 'ING_BUTTER', 'ING_WATER', 'ING_SALT'], ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 170, 5, 28, 5, 0, ARRAY['round', 'buttered', 'everyday', 'simple'], 74),

-- ============================================
-- RICE & GRAINS (6)
-- ============================================
('ARM_PILAF_VERMICELLI', 'pilaf-vermicelli', 'Armenian Rice Pilaf', 'Classic Armenian pilaf with toasted vermicelli noodles, butter, and perfectly fluffy rice', 'Prinzov Pilaf', NULL, 'rice_grains', 'classic', 'national', 'vegetarian', 'boiled', false, false, false, false, ARRAY['ING_RICE', 'ING_VERMICELLI', 'ING_BUTTER', 'ING_CHICKEN_BROTH', 'ING_SALT'], ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 280, 6, 48, 8, 0, ARRAY['pilaf', 'vermicelli', 'side-dish', 'classic'], 92),

('ARM_BULGUR_PILAF', 'bulgur-pilaf', 'Bulgur Pilaf', 'Nutty bulgur wheat cooked with caramelized onions and butter - a hearty Armenian staple', 'Dzavar Pilaf', NULL, 'rice_grains', 'classic', 'national', 'vegetarian', 'boiled', false, false, false, false, ARRAY['ING_BULGUR', 'ING_ONION', 'ING_BUTTER', 'ING_CHICKEN_BROTH', 'ING_SALT'], ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 260, 8, 42, 8, 0, ARRAY['bulgur', 'healthy', 'fiber', 'traditional'], 86),

('ARM_MUJADDARA', 'mujaddara-armenian', 'Armenian Mujaddara', 'Comfort food of lentils and bulgur topped with crispy fried onions - a protein-rich lenten dish', 'Mujaddara', NULL, 'rice_grains', 'popular', 'western_armenian', 'vegan', 'boiled', false, true, false, false, ARRAY['ING_LENTILS', 'ING_BULGUR', 'ING_ONION', 'ING_OLIVE_OIL', 'ING_CUMIN', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 320, 16, 52, 6, 0, ARRAY['lentils', 'lenten', 'protein', 'vegan'], 82),

('ARM_HERISA_GRAIN', 'herisa-grain', 'Herisa (Wheat Porridge)', 'Ancient Armenian dish of cracked wheat slow-cooked with lamb until creamy and rich', 'Herisa', NULL, 'rice_grains', 'traditional', 'shirak', 'lamb', 'stewed', true, false, false, false, ARRAY['ING_WHEAT_BERRIES', 'ING_LAMB_SHOULDER', 'ING_BUTTER', 'ING_SALT'], ARRAY['gluten', 'dairy'], false, false, true, false, false, true, false, 420, 28, 38, 18, 0, ARRAY['ancient', 'slow-cooked', 'comfort-food', 'festive'], 78),

('ARM_PILAF_DRIED_FRUIT', 'pilaf-dried-fruit', 'Sweet Pilaf with Dried Fruits', 'Festive rice pilaf studded with dried apricots, raisins, and almonds - served at celebrations', 'Anush Pilaf', NULL, 'rice_grains', 'festive', 'ararat', 'vegetarian', 'boiled', true, false, false, false, ARRAY['ING_RICE', 'ING_DRIED_APRICOTS', 'ING_RAISINS', 'ING_ALMONDS', 'ING_BUTTER', 'ING_CINNAMON', 'ING_HONEY', 'ING_SALT'], ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, true, 360, 7, 58, 12, 0, ARRAY['sweet', 'festive', 'dried-fruits', 'nuts'], 80),

('ARM_SPAS_GRAIN', 'spas-grain-dish', 'Spas with Bulgur', 'Creamy yogurt and bulgur dish that can be served as a thick grain porridge or soup', 'Spas Dzavarov', NULL, 'rice_grains', 'classic', 'national', 'vegetarian', 'boiled', false, false, false, false, ARRAY['ING_BULGUR', 'ING_YOGURT', 'ING_EGG', 'ING_BUTTER', 'ING_MINT', 'ING_SALT'], ARRAY['gluten', 'dairy', 'egg'], false, false, true, false, true, true, true, 280, 12, 35, 10, 0, ARRAY['yogurt', 'creamy', 'comfort-food', 'healthy'], 76),

-- ============================================
-- DESSERTS (10)
-- ============================================
('ARM_GATA', 'gata', 'Gata', 'Beloved Armenian sweet bread filled with khoriz (butter-flour-sugar mixture), often with a coin inside for luck', 'Gata', NULL, 'desserts', 'signature', 'national', 'vegetarian', 'baked', true, false, false, false, ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_SUGAR', 'ING_YOGURT', 'ING_EGG', 'ING_BAKING_SODA', 'ING_VANILLA', 'ING_SALT'], ARRAY['gluten', 'dairy', 'egg'], false, false, true, false, true, true, true, 320, 6, 42, 15, 0, ARRAY['sweet-bread', 'wedding', 'new-year', 'national'], 96),

('ARM_NAZOOK', 'nazook', 'Nazook', 'Flaky rolled pastry with walnut and butter filling, dusted with powdered sugar', 'Nazook', NULL, 'desserts', 'signature', 'western_armenian', 'vegetarian', 'baked', true, false, false, false, ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_YOGURT', 'ING_WALNUTS', 'ING_SUGAR', 'ING_EGG', 'ING_CINNAMON', 'ING_VANILLA'], ARRAY['gluten', 'dairy', 'egg', 'tree_nuts'], false, false, false, false, true, true, true, 280, 5, 32, 16, 0, ARRAY['pastry', 'walnut', 'flaky', 'festive'], 94),

('ARM_PAKHLAVA', 'pakhlava-armenian', 'Armenian Pakhlava', 'Layered phyllo pastry with walnuts and honey syrup, spiced with cinnamon and cloves', 'Pakhlava', NULL, 'desserts', 'classic', 'national', 'vegetarian', 'baked', true, false, false, false, ARRAY['ING_PHYLLO_DOUGH', 'ING_WALNUTS', 'ING_BUTTER', 'ING_HONEY', 'ING_SUGAR', 'ING_CINNAMON', 'ING_CLOVES', 'ING_LEMON_JUICE'], ARRAY['gluten', 'dairy', 'tree_nuts'], false, false, false, false, true, true, true, 340, 5, 45, 18, 0, ARRAY['baklava', 'honey', 'walnuts', 'festive'], 92),

('ARM_SUJUKH', 'sujukh-sweet', 'Sujukh (Sweet)', 'Traditional Armenian candy of walnuts strung on thread and coated in thickened grape juice - called "Armenian Snickers"', 'Sujukh', NULL, 'desserts', 'signature', 'vayots_dzor', 'vegan', 'boiled', true, true, true, false, ARRAY['ING_WALNUTS', 'ING_GRAPE_JUICE', 'ING_FLOUR', 'ING_SUGAR', 'ING_CINNAMON', 'ING_CLOVES'], ARRAY['gluten', 'tree_nuts'], false, true, false, true, true, true, true, 180, 4, 28, 8, 0, ARRAY['candy', 'walnuts', 'grape', 'winter'], 90),

('ARM_ANOUSHABOUR', 'anoushabour', 'Anoushabour', 'Christmas wheat berry pudding with dried fruits, nuts, and rose water - served on Armenian Christmas Eve', 'Anoushabour', NULL, 'desserts', 'festive', 'national', 'vegan', 'boiled', true, true, false, false, ARRAY['ING_WHEAT_BERRIES', 'ING_DRIED_APRICOTS', 'ING_RAISINS', 'ING_WALNUTS', 'ING_ALMONDS', 'ING_POMEGRANATE_SEEDS', 'ING_ROSE_WATER', 'ING_SUGAR', 'ING_CINNAMON'], ARRAY['gluten', 'tree_nuts'], false, true, false, true, true, true, true, 260, 6, 48, 8, 0, ARRAY['christmas', 'wheat', 'pudding', 'ritual'], 88),

('ARM_KADAYIF', 'kadayif-armenian', 'Armenian Kadayif', 'Shredded phyllo pastry with walnut filling, baked crispy and soaked in sugar syrup', 'Kadayif', NULL, 'desserts', 'classic', 'national', 'vegetarian', 'baked', true, false, false, false, ARRAY['ING_KNAFEH_DOUGH', 'ING_WALNUTS', 'ING_BUTTER', 'ING_SUGAR', 'ING_LEMON_JUICE', 'ING_ROSE_WATER'], ARRAY['gluten', 'dairy', 'tree_nuts'], false, false, false, false, true, true, true, 320, 5, 40, 18, 0, ARRAY['shredded-phyllo', 'syrup', 'crispy', 'festive'], 84),

('ARM_HALVA_TAHINI', 'halva-tahini', 'Tahini Halva', 'Dense, crumbly sesame halva, often marbled with chocolate or studded with pistachios', 'Halva', NULL, 'desserts', 'classic', 'national', 'vegan', 'raw', false, true, false, false, ARRAY['ING_TAHINI', 'ING_SUGAR', 'ING_PISTACHIOS', 'ING_VANILLA'], ARRAY['sesame', 'tree_nuts'], true, true, false, true, true, true, true, 280, 8, 32, 16, 0, ARRAY['tahini', 'sesame', 'lenten', 'dense'], 80),

('ARM_ALANI', 'alani', 'Alani (Stuffed Dried Peaches)', 'Dried peaches stuffed with walnuts and sugar, a traditional Armenian winter treat', 'Alani', NULL, 'desserts', 'traditional', 'ararat', 'vegan', 'raw', true, true, false, false, ARRAY['ING_DRIED_PEACHES', 'ING_WALNUTS', 'ING_SUGAR', 'ING_CINNAMON'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 160, 3, 28, 6, 0, ARRAY['dried-fruit', 'stuffed', 'winter', 'traditional'], 74),

('ARM_SUTLAC', 'sutlac-armenian', 'Sutlac (Rice Pudding)', 'Creamy Armenian rice pudding baked until golden on top, flavored with cinnamon', 'Sutlac', NULL, 'desserts', 'classic', 'national', 'vegetarian', 'baked', false, false, false, false, ARRAY['ING_RICE', 'ING_MILK', 'ING_SUGAR', 'ING_EGG', 'ING_VANILLA', 'ING_CINNAMON'], ARRAY['dairy', 'egg'], true, false, true, false, true, true, true, 220, 6, 38, 6, 0, ARRAY['rice-pudding', 'creamy', 'baked', 'comfort-food'], 82),

('ARM_BASTUKH', 'bastukh', 'Bastukh (Fruit Leather)', 'Thin sheets of dried fruit puree, rolled up as a natural, chewy snack', 'Bastukh', NULL, 'desserts', 'traditional', 'ararat', 'vegan', 'raw', false, true, true, false, ARRAY['ING_APRICOTS', 'ING_PLUMS', 'ING_SUGAR'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 80, 1, 20, 0, 0, ARRAY['fruit-leather', 'natural', 'snack', 'healthy'], 76)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  protein_type = EXCLUDED.protein_type,
  cooking_method = EXCLUDED.cooking_method,
  ingredient_ids = EXCLUDED.ingredient_ids,
  allergens = EXCLUDED.allergens,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  is_nut_free = EXCLUDED.is_nut_free,
  is_vegan = EXCLUDED.is_vegan,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_halal = EXCLUDED.is_halal,
  is_pescatarian = EXCLUDED.is_pescatarian,
  calories_per_serving = EXCLUDED.calories_per_serving,
  protein_g = EXCLUDED.protein_g,
  carbs_g = EXCLUDED.carbs_g,
  fat_g = EXCLUDED.fat_g,
  spice_level = EXCLUDED.spice_level,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity;

-- ============================================
-- 78 Armenian dishes added/updated
-- Next: Run 03-armenian-product-ingredients.sql
-- ============================================
