-- ============================================
-- GEORGIAN DATABASE - Data Import
-- ============================================
-- 74 Georgian dishes
-- Run AFTER 01-georgian-missing-ingredients.sql
-- ============================================

-- Clear existing data
DELETE FROM georgian;

INSERT INTO georgian (
  id, slug, name, description, georgian_name, georgian_script,
  category, status, region, protein_type, cooking_method,
  is_supra_dish, is_festive, is_street_food, served_cold,
  ingredient_ids, allergens,
  is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_pescatarian,
  calories_per_serving, protein_g, carbs_g, fat_g, spice_level, tags, popularity
) VALUES

-- ============================================
-- KHACHAPURI (8 dishes)
-- ============================================
('GEO_KHACHAPURI_IMERULI', 'khachapuri-imeruli', 'Imeruli Khachapuri', 'Classic round cheese bread from Imereti region, filled with melted Imeretian cheese, the most common style throughout Georgia', 'Imeruli Khachapuri', 'იმერული ხაჭაპური', 'khachapuri', 'signature', 'imereti', 'vegetarian', 'baked', true, false, true, false, ARRAY['ING_FLOUR', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_YOGURT', 'ING_SALT', 'ING_YEAST'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 520, 18, 42, 32, 0, ARRAY['cheese', 'bread', 'imereti', 'national', 'iconic'], 98),

('GEO_KHACHAPURI_ADJARULI', 'khachapuri-adjaruli', 'Adjaruli Khachapuri', 'Iconic boat-shaped cheese bread from Adjara, filled with melted cheese, topped with butter and a raw egg yolk to mix in', 'Acharuli Khachapuri', 'აჭარული ხაჭაპური', 'khachapuri', 'signature', 'adjara', 'vegetarian', 'baked', true, false, true, false, ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_YOGURT', 'ING_SALT', 'ING_YEAST'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 680, 22, 45, 48, 0, ARRAY['cheese', 'bread', 'boat-shape', 'egg', 'adjara', 'iconic'], 100),

('GEO_KHACHAPURI_MEGRULI', 'khachapuri-megruli', 'Megruli Khachapuri', 'Double-cheese khachapuri from Samegrelo, with cheese both inside and melted on top, extra rich and indulgent', 'Megruli Khachapuri', 'მეგრული ხაჭაპური', 'khachapuri', 'popular', 'samegrelo', 'vegetarian', 'baked', true, false, true, false, ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_YOGURT', 'ING_SALT', 'ING_YEAST'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 620, 24, 40, 42, 0, ARRAY['cheese', 'bread', 'double-cheese', 'samegrelo'], 88),

('GEO_LOBIANI', 'lobiani', 'Lobiani', 'Bean-filled bread from Racha region, stuffed with mashed kidney beans seasoned with onions and spices, traditionally eaten on Barbaroba holiday', 'Lobiani', 'ლობიანი', 'khachapuri', 'traditional', 'racha', 'vegan', 'baked', true, true, true, false, ARRAY['ING_FLOUR', 'ING_KIDNEY_BEANS', 'ING_ONION', 'ING_BUTTER', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_YEAST'], ARRAY['gluten'], false, true, true, true, true, true, true, 380, 14, 58, 12, 1, ARRAY['beans', 'bread', 'vegan', 'racha', 'barbaroba'], 82),

('GEO_KHACHAPURI_PENOVANI', 'khachapuri-penovani', 'Penovani Khachapuri', 'Square-shaped puff pastry khachapuri, flaky and layered with cheese filling, popular as street food', 'Penovani Khachapuri', 'ფენოვანი ხაჭაპური', 'khachapuri', 'popular', 'national', 'vegetarian', 'baked', false, false, true, false, ARRAY['ING_PUFF_PASTRY', 'ING_SULGUNI_CHEESE', 'ING_EGG', 'ING_BUTTER'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 450, 15, 35, 30, 0, ARRAY['cheese', 'puff-pastry', 'street-food'], 75),

('GEO_KHACHAPURI_OSURI', 'khachapuri-osuri', 'Osuri Khachapuri', 'Ossetian-style khachapuri filled with cheese and mashed potatoes, hearty and filling', 'Osuri Khachapuri', 'ოსური ხაჭაპური', 'khachapuri', 'traditional', 'kartli', 'vegetarian', 'baked', false, false, true, false, ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_POTATO', 'ING_BUTTER', 'ING_SALT', 'ING_YEAST'], ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 480, 16, 52, 24, 0, ARRAY['cheese', 'potato', 'ossetian'], 70),

('GEO_ACHMA', 'achma', 'Achma', 'Layered cheese bread from Adjara, similar to lasagna with multiple layers of dough and cheese, baked until golden', 'Achma', 'აჩმა', 'khachapuri', 'traditional', 'adjara', 'vegetarian', 'baked', true, true, false, false, ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_MILK', 'ING_SALT'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 550, 20, 38, 36, 0, ARRAY['cheese', 'layered', 'adjara', 'festive'], 78),

('GEO_KUBDARI', 'kubdari', 'Kubdari', 'Meat-filled bread from Svaneti, stuffed with spiced minced meat (beef or pork), a hearty mountain specialty', 'Kubdari', 'კუბდარი', 'khachapuri', 'signature', 'svaneti', 'mixed', 'baked', true, true, false, false, ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_ONION', 'ING_GARLIC', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_BUTTER'], ARRAY['gluten'], false, true, true, false, false, false, false, 580, 28, 45, 32, 2, ARRAY['meat', 'bread', 'svaneti', 'mountain'], 85),

-- ============================================
-- KHINKALI (6 dishes)
-- ============================================
('GEO_KHINKALI_KALAKURI', 'khinkali-kalakuri', 'Kalakuri Khinkali', 'City-style dumplings filled with spiced beef and pork mixture with herbs, the most popular variety in Tbilisi', 'Kalakuri Khinkali', 'ქალაქური ხინკალი', 'khinkali', 'signature', 'kartli', 'mixed', 'boiled', true, false, true, false, ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_ONION', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_CUMIN', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_WATER'], ARRAY['gluten'], false, true, true, false, false, false, false, 380, 22, 35, 18, 1, ARRAY['dumplings', 'meat', 'tbilisi', 'iconic'], 98),

('GEO_KHINKALI_MTIULURI', 'khinkali-mtiuluri', 'Mtiuluri Khinkali', 'Mountain-style khinkali from Mtskheta-Mtianeti, filled only with spiced meat without herbs, the original recipe', 'Mtiuluri Khinkali', 'მთიულური ხინკალი', 'khinkali', 'traditional', 'pshavi_khevsureti', 'mixed', 'boiled', true, false, false, false, ARRAY['ING_FLOUR', 'ING_GROUND_BEEF', 'ING_GROUND_LAMB', 'ING_ONION', 'ING_CUMIN', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_WATER'], ARRAY['gluten'], false, true, true, false, false, true, false, 360, 24, 32, 16, 1, ARRAY['dumplings', 'meat', 'mountain', 'original'], 85),

('GEO_KHINKALI_CHEESE', 'khinkali-cheese', 'Cheese Khinkali', 'Vegetarian khinkali filled with Georgian cheese mixture, a popular alternative to meat dumplings', 'Khinkali Qvelit', 'ხინკალი ყველით', 'khinkali', 'popular', 'national', 'vegetarian', 'boiled', false, false, true, false, ARRAY['ING_FLOUR', 'ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_EGG', 'ING_BUTTER', 'ING_SALT'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 340, 16, 38, 14, 0, ARRAY['dumplings', 'cheese', 'vegetarian'], 75),

('GEO_KHINKALI_POTATO', 'khinkali-potato', 'Potato Khinkali', 'Vegetarian khinkali filled with mashed potatoes and herbs, a comforting meat-free option', 'Khinkali Kartopillt', 'ხინკალი კარტოფილით', 'khinkali', 'active', 'national', 'vegetarian', 'boiled', false, false, true, false, ARRAY['ING_FLOUR', 'ING_POTATO', 'ING_BUTTER', 'ING_ONION', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 280, 8, 48, 8, 0, ARRAY['dumplings', 'potato', 'vegetarian'], 65),

('GEO_KHINKALI_MUSHROOM', 'khinkali-mushroom', 'Mushroom Khinkali', 'Vegetarian khinkali filled with sauteed mushrooms and herbs, earthy and flavorful', 'Khinkali Sokot', 'ხინკალი სოკოთი', 'khinkali', 'active', 'national', 'vegetarian', 'boiled', false, false, true, false, ARRAY['ING_FLOUR', 'ING_MUSHROOMS', 'ING_ONION', 'ING_GARLIC', 'ING_BUTTER', 'ING_PARSLEY', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 260, 10, 40, 8, 0, ARRAY['dumplings', 'mushroom', 'vegetarian'], 68),

('GEO_KHINKALI_LAMB', 'khinkali-lamb', 'Lamb Khinkali', 'Traditional khinkali from Tusheti filled with spiced ground lamb, aromatic and rich', 'Khinkali Batknis Khortsi', 'ხინკალი ბატკნის ხორცით', 'khinkali', 'traditional', 'tusheti', 'lamb', 'boiled', true, true, false, false, ARRAY['ING_FLOUR', 'ING_GROUND_LAMB', 'ING_ONION', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_WATER'], ARRAY['gluten'], false, true, true, false, false, true, false, 390, 26, 32, 18, 1, ARRAY['dumplings', 'lamb', 'tusheti', 'mountain'], 78),

-- ============================================
-- GRILLED MEATS (8 dishes)
-- ============================================
('GEO_MTSVADI_PORK', 'mtsvadi-pork', 'Mtsvadi (Pork)', 'Georgian-style grilled pork skewers marinated in pomegranate juice and onions, cooked over grape vine embers', 'Mtsvadi', 'მწვადი', 'grilled_meats', 'signature', 'kakheti', 'pork', 'grilled', true, true, false, false, ARRAY['ING_PORK_SHOULDER', 'ING_ONION', 'ING_POMEGRANATE_JUICE', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 420, 35, 4, 30, 1, ARRAY['grilled', 'pork', 'skewers', 'supra', 'kakheti'], 95),

('GEO_MTSVADI_BEEF', 'mtsvadi-beef', 'Mtsvadi (Beef)', 'Georgian beef skewers marinated in wine and spices, grilled over open fire until perfectly charred', 'Mtsvadi Khoqhoprit', 'მწვადი ხოხოფრით', 'grilled_meats', 'popular', 'kartli', 'beef', 'grilled', true, true, false, false, ARRAY['ING_BEEF_SIRLOIN', 'ING_ONION', 'ING_RED_WINE', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 380, 38, 3, 24, 1, ARRAY['grilled', 'beef', 'skewers', 'supra'], 88),

('GEO_MTSVADI_LAMB', 'mtsvadi-lamb', 'Mtsvadi (Lamb)', 'Traditional lamb skewers seasoned with Georgian spices, a favorite at festive gatherings', 'Mtsvadi Batknis', 'მწვადი ბატკნის', 'grilled_meats', 'traditional', 'tusheti', 'lamb', 'grilled', true, true, false, false, ARRAY['ING_LAMB_LEG', 'ING_ONION', 'ING_CUMIN', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 400, 36, 2, 28, 1, ARRAY['grilled', 'lamb', 'skewers', 'tusheti'], 82),

('GEO_TABAKA', 'tabaka-chicken', 'Tabaka Chicken', 'Whole flattened chicken fried under a weight until crispy, served with garlic sauce, a Georgian classic', 'Tabaka', 'ტაბაკა', 'grilled_meats', 'signature', 'national', 'chicken', 'fried', true, false, false, false, ARRAY['ING_CHICKEN_WHOLE', 'ING_GARLIC', 'ING_BUTTER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_ADJIKA'], ARRAY['dairy'], true, false, true, false, false, true, false, 520, 45, 2, 38, 2, ARRAY['chicken', 'fried', 'crispy', 'garlic'], 92),

('GEO_CHKMERULI', 'chkmeruli', 'Chkmeruli', 'Chicken in creamy garlic sauce, pan-fried then simmered in milk and garlic, incredibly aromatic', 'Shkmeruli', 'შქმერული', 'grilled_meats', 'signature', 'racha', 'chicken', 'fried', true, false, false, false, ARRAY['ING_CHICKEN_WHOLE', 'ING_GARLIC', 'ING_MILK', 'ING_BUTTER', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['dairy'], true, false, true, false, false, true, false, 580, 42, 8, 44, 1, ARRAY['chicken', 'garlic', 'creamy', 'racha'], 94),

('GEO_OJAKHURI', 'ojakhuri', 'Ojakhuri', 'Family-style dish of fried pork with potatoes, onions and herbs, cooked in a clay pot', 'Ojakhuri', 'ოჯახური', 'grilled_meats', 'popular', 'national', 'pork', 'fried', true, false, false, false, ARRAY['ING_PORK_SHOULDER', 'ING_POTATO', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_VEGETABLE_OIL'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 620, 32, 45, 38, 1, ARRAY['pork', 'potatoes', 'family-style', 'clay-pot'], 88),

('GEO_KUCHMACHI', 'kuchmachi', 'Kuchmachi', 'Sauteed chicken or pork livers, hearts and gizzards with walnuts, pomegranate and cilantro', 'Kuchmachi', 'კუჭმაჭი', 'grilled_meats', 'traditional', 'national', 'chicken', 'fried', true, true, false, false, ARRAY['ING_CHICKEN_LIVER', 'ING_CHICKEN_HEARTS', 'ING_CHICKEN_GIZZARDS', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_POMEGRANATE_SEEDS', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, false, false, true, false, 380, 28, 12, 26, 1, ARRAY['offal', 'walnuts', 'pomegranate', 'festive'], 75),

('GEO_KUPATI', 'kupati', 'Kupati', 'Georgian pork sausages made with liver, heart and spices, grilled until crispy', 'Kupati', 'კუპატი', 'grilled_meats', 'traditional', 'guria', 'pork', 'grilled', true, false, true, false, ARRAY['ING_GROUND_PORK', 'ING_PORK_LIVER', 'ING_ONION', 'ING_GARLIC', 'ING_CORIANDER', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_SAUSAGE_CASING'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 450, 24, 4, 38, 1, ARRAY['sausage', 'grilled', 'guria'], 72),

-- ============================================
-- STEWS & MAINS (10 dishes)
-- ============================================
('GEO_CHAKHOKHBILI', 'chakhokhbili', 'Chakhokhbili', 'Traditional chicken stew with tomatoes, onions, garlic and fresh herbs, rich and aromatic', 'Chakhokhbili', 'ჩახოხბილი', 'stews_mains', 'signature', 'national', 'chicken', 'stewed', true, false, false, false, ARRAY['ING_CHICKEN_WHOLE', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_BELL_PEPPER', 'ING_CILANTRO', 'ING_BASIL', 'ING_FENUGREEK', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 380, 35, 15, 20, 1, ARRAY['chicken', 'stew', 'tomato', 'herbs'], 92),

('GEO_CHAKAPULI', 'chakapuli', 'Chakapuli', 'Spring lamb or veal stew with white wine, tarragon, green plums and fresh herbs, light and tangy', 'Chakapuli', 'ჩაქაფული', 'stews_mains', 'signature', 'kakheti', 'lamb', 'stewed', true, true, false, false, ARRAY['ING_LAMB_SHOULDER', 'ING_WHITE_WINE', 'ING_TARRAGON', 'ING_TKEMALI', 'ING_GREEN_ONION', 'ING_CILANTRO', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 420, 38, 10, 24, 1, ARRAY['lamb', 'stew', 'spring', 'tarragon', 'wine'], 88),

('GEO_SATSIVI', 'satsivi', 'Satsivi', 'Cold turkey or chicken in creamy walnut sauce, traditional New Year dish, rich and aromatic', 'Satsivi', 'საცივი', 'stews_mains', 'signature', 'national', 'turkey', 'cold', true, true, false, true, ARRAY['ING_TURKEY', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_CINNAMON', 'ING_CLOVES', 'ING_VINEGAR', 'ING_EGG_YOLK', 'ING_SALT'], ARRAY['tree_nuts', 'eggs'], true, true, false, false, false, true, false, 480, 32, 12, 36, 1, ARRAY['turkey', 'walnut-sauce', 'cold', 'new-year', 'festive'], 95),

('GEO_OSTRI', 'ostri', 'Ostri', 'Spicy beef stew in tomato sauce with hot peppers and herbs, one of the spiciest Georgian dishes', 'Ostri', 'ოსტრი', 'stews_mains', 'popular', 'samegrelo', 'beef', 'stewed', true, false, false, false, ARRAY['ING_BEEF_CHUCK', 'ING_TOMATO', 'ING_TOMATO_PASTE', 'ING_ONION', 'ING_GARLIC', 'ING_HOT_PEPPER', 'ING_CILANTRO', 'ING_ADJIKA', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 400, 36, 14, 22, 4, ARRAY['beef', 'stew', 'spicy', 'samegrelo'], 78),

('GEO_CHANAKHI', 'chanakhi', 'Chanakhi', 'Lamb and vegetable stew baked in clay pots with eggplant, tomatoes and potatoes', 'Chanakhi', 'ჩანახი', 'stews_mains', 'traditional', 'national', 'lamb', 'baked', true, false, false, false, ARRAY['ING_LAMB_SHOULDER', 'ING_EGGPLANT', 'ING_TOMATO', 'ING_POTATO', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BASIL', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 450, 32, 28, 26, 1, ARRAY['lamb', 'stew', 'clay-pot', 'vegetables'], 82),

('GEO_CHASHUSHULI', 'chashushuli', 'Chashushuli', 'Spicy veal stew with tomatoes and herbs, hearty and warming', 'Chashushuli', 'ჩაშუშული', 'stews_mains', 'popular', 'national', 'beef', 'stewed', true, false, false, false, ARRAY['ING_BEEF_CHUCK', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_HOT_PEPPER', 'ING_CILANTRO', 'ING_PARSLEY', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 380, 34, 12, 22, 2, ARRAY['veal', 'stew', 'spicy', 'tomato'], 80),

('GEO_LOBIO', 'lobio', 'Lobio', 'Classic Georgian red bean stew with walnuts, onions and spices, served in clay pot', 'Lobio', 'ლობიო', 'stews_mains', 'signature', 'national', 'vegan', 'stewed', true, false, false, false, ARRAY['ING_KIDNEY_BEANS', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_BLACK_PEPPER', 'ING_SALT', 'ING_VINEGAR'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 320, 16, 42, 12, 1, ARRAY['beans', 'vegetarian', 'vegan', 'clay-pot', 'walnuts'], 90),

('GEO_AJAPSANDALI', 'ajapsandali', 'Ajapsandali', 'Georgian vegetable stew with eggplant, tomatoes, peppers and fresh herbs, similar to ratatouille', 'Ajapsandali', 'აჯაფსანდალი', 'stews_mains', 'popular', 'national', 'vegan', 'stewed', true, false, false, false, ARRAY['ING_EGGPLANT', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_POTATO', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BASIL', 'ING_OLIVE_OIL', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 180, 5, 28, 8, 1, ARRAY['vegetables', 'stew', 'eggplant', 'vegan'], 78),

('GEO_BUGLAMA', 'buglama', 'Buglama', 'Lamb or beef stew slow-cooked in its own juices with minimal water, intensely flavorful', 'Buglama', 'ბუღლამა', 'stews_mains', 'traditional', 'kakheti', 'lamb', 'stewed', true, true, false, false, ARRAY['ING_LAMB_SHOULDER', 'ING_ONION', 'ING_TOMATO', 'ING_BELL_PEPPER', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 420, 38, 10, 26, 1, ARRAY['lamb', 'stew', 'slow-cooked', 'kakheti'], 75),

('GEO_TOLMA', 'georgian-tolma', 'Georgian Tolma', 'Grape leaves stuffed with spiced meat and rice, Georgian version of dolma', 'Tolma', 'ტოლმა', 'stews_mains', 'traditional', 'kakheti', 'mixed', 'stuffed', true, true, false, false, ARRAY['ING_GRAPE_LEAVES', 'ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_RICE', 'ING_ONION', 'ING_CILANTRO', 'ING_MINT', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, false, false, 280, 18, 22, 14, 1, ARRAY['stuffed', 'grape-leaves', 'dolma', 'kakheti'], 72),

-- ============================================
-- SOUPS (6 dishes)
-- ============================================
('GEO_KHARCHO', 'kharcho', 'Kharcho', 'Traditional beef soup with rice, walnuts, tkemali plum sauce and aromatic spices from Samegrelo', 'Kharcho', 'ხარჩო', 'soups', 'signature', 'samegrelo', 'beef', 'boiled', true, false, false, false, ARRAY['ING_BEEF_CHUCK', 'ING_RICE', 'ING_WALNUTS', 'ING_TKEMALI', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_FENUGREEK', 'ING_CORIANDER', 'ING_HOT_PEPPER', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, false, false, true, false, 380, 28, 32, 16, 2, ARRAY['soup', 'beef', 'rice', 'walnuts', 'samegrelo'], 95),

('GEO_CHIKHIRTMA', 'chikhirtma', 'Chikhirtma', 'Traditional chicken soup thickened with egg yolks and vinegar, tangy and restorative', 'Chikhirtma', 'ჩიხირთმა', 'soups', 'traditional', 'national', 'chicken', 'boiled', false, false, false, false, ARRAY['ING_CHICKEN_WHOLE', 'ING_EGG_YOLK', 'ING_ONION', 'ING_FLOUR', 'ING_VINEGAR', 'ING_CILANTRO', 'ING_MINT', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['gluten', 'eggs'], false, true, true, false, false, true, false, 280, 24, 12, 16, 1, ARRAY['soup', 'chicken', 'egg', 'tangy', 'restorative'], 78),

('GEO_MATSONI_SOUP', 'matsoni-soup', 'Matsoni Soup', 'Cold yogurt-based soup with cucumber, herbs and garlic, refreshing summer dish', 'Matsoni Supi', 'მაწონი სუპი', 'soups', 'active', 'national', 'vegetarian', 'cold', false, false, false, true, ARRAY['ING_MATSONI', 'ING_CUCUMBER', 'ING_GARLIC', 'ING_DILL', 'ING_MINT', 'ING_WALNUTS', 'ING_SALT'], ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, true, 150, 8, 12, 8, 0, ARRAY['soup', 'cold', 'yogurt', 'summer', 'refreshing'], 65),

('GEO_LOBIO_SOUP', 'lobio-soup', 'Lobio Soup', 'Hearty bean soup with walnuts and herbs, lighter version of classic lobio', 'Lobios Supi', 'ლობიოს სუპი', 'soups', 'active', 'national', 'vegan', 'boiled', false, false, false, false, ARRAY['ING_KIDNEY_BEANS', 'ING_WALNUTS', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_FENUGREEK', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 240, 14, 36, 8, 1, ARRAY['soup', 'beans', 'vegan', 'walnuts'], 70),

('GEO_KHASHI', 'khashi', 'Khashi', 'Traditional hangover soup made from beef tripe and feet, served with garlic and dried lavash', 'Khashi', 'ხაში', 'soups', 'traditional', 'national', 'beef', 'boiled', false, false, false, false, ARRAY['ING_BEEF_TRIPE', 'ING_BEEF_FEET', 'ING_GARLIC', 'ING_SALT', 'ING_VINEGAR', 'ING_LAVASH'], ARRAY['gluten'], false, true, true, false, false, true, false, 320, 28, 8, 20, 1, ARRAY['soup', 'tripe', 'hangover-cure', 'traditional'], 72),

('GEO_TATARIAKHNI', 'tatariakhni', 'Tatariakhni', 'Clear beef bone broth, simple and nourishing, often served as a restorative', 'Tatariakhni', 'თათარიახნი', 'soups', 'active', 'national', 'beef', 'boiled', false, false, false, false, ARRAY['ING_BEEF_BONES', 'ING_BEEF_CHUCK', 'ING_ONION', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, false, false, true, false, 180, 18, 4, 10, 0, ARRAY['soup', 'broth', 'beef', 'restorative'], 60),

-- ============================================
-- APPETIZERS (10 dishes)
-- ============================================
('GEO_PKHALI_SPINACH', 'pkhali-spinach', 'Spinach Pkhali', 'Ground spinach mixed with walnuts, garlic and spices, formed into balls and topped with pomegranate', 'Ispanakhis Pkhali', 'ისპანახის ფხალი', 'appetizers', 'signature', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_SPINACH', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_POMEGRANATE_SEEDS', 'ING_VINEGAR', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 180, 8, 12, 14, 1, ARRAY['appetizer', 'spinach', 'walnuts', 'vegan', 'cold'], 92),

('GEO_PKHALI_BEET', 'pkhali-beet', 'Beet Pkhali', 'Beetroot pkhali with walnuts and spices, vibrant purple color and earthy-sweet flavor', 'Charkhlis Pkhali', 'ჭარხლის ფხალი', 'appetizers', 'popular', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_BEET', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_POMEGRANATE_SEEDS', 'ING_VINEGAR', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 170, 6, 16, 12, 1, ARRAY['appetizer', 'beet', 'walnuts', 'vegan', 'cold'], 85),

('GEO_PKHALI_CABBAGE', 'pkhali-cabbage', 'Cabbage Pkhali', 'White cabbage pkhali with walnuts, lighter and more delicate than other varieties', 'Kombostos Pkhali', 'კომბოსტოს ფხალი', 'appetizers', 'active', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_CABBAGE', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_CORIANDER', 'ING_VINEGAR', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 150, 5, 10, 12, 1, ARRAY['appetizer', 'cabbage', 'walnuts', 'vegan', 'cold'], 70),

('GEO_BADRIJANI', 'badrijani', 'Badrijani Nigvzit', 'Fried eggplant rolls filled with spiced walnut paste, topped with pomegranate seeds', 'Badrijani Nigvzit', 'ბადრიჯანი ნიგვზით', 'appetizers', 'signature', 'national', 'vegan', 'fried', true, false, false, true, ARRAY['ING_EGGPLANT', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_FENUGREEK', 'ING_CORIANDER', 'ING_POMEGRANATE_SEEDS', 'ING_VINEGAR', 'ING_VEGETABLE_OIL', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 220, 6, 14, 18, 1, ARRAY['appetizer', 'eggplant', 'walnuts', 'rolls', 'vegan'], 95),

('GEO_JONJOLI', 'jonjoli', 'Jonjoli', 'Pickled bladdernut flowers, unique Georgian delicacy with tangy, slightly sour taste', 'Jonjoli', 'ჯონჯოლი', 'appetizers', 'traditional', 'kakheti', 'vegan', 'fermented', true, false, false, true, ARRAY['ING_JONJOLI', 'ING_ONION', 'ING_VEGETABLE_OIL', 'ING_SALT', 'ING_VINEGAR'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 80, 2, 8, 6, 0, ARRAY['appetizer', 'pickled', 'fermented', 'unique', 'kakheti'], 65),

('GEO_MKHALI', 'mkhali', 'Mkhali', 'Chopped vegetable and herb salad with walnuts, similar to pkhali but with different texture', 'Mkhali', 'მხალი', 'appetizers', 'active', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_SPINACH', 'ING_LEEK', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_VINEGAR', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 160, 6, 10, 12, 1, ARRAY['appetizer', 'vegetables', 'walnuts', 'vegan'], 68),

('GEO_NIGVZIANI_BADRIJANI', 'nigvziani-badrijani', 'Eggplant with Walnut Sauce', 'Sliced eggplant topped with walnut sauce, variation of badrijani served flat', 'Nigvziani Badrijani', 'ნიგვზიანი ბადრიჯანი', 'appetizers', 'active', 'national', 'vegan', 'fried', true, false, false, true, ARRAY['ING_EGGPLANT', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_FENUGREEK', 'ING_VEGETABLE_OIL', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 200, 5, 12, 16, 1, ARRAY['appetizer', 'eggplant', 'walnuts', 'vegan'], 72),

('GEO_GEBZHALIA', 'gebzhalia', 'Gebzhalia', 'Fresh cheese rolls in mint-infused matsoni sauce from Samegrelo, tangy and refreshing', 'Gebzhalia', 'გებჟალია', 'appetizers', 'traditional', 'samegrelo', 'vegetarian', 'cold', true, false, false, true, ARRAY['ING_SULGUNI_CHEESE', 'ING_MATSONI', 'ING_MINT', 'ING_SALT'], ARRAY['dairy'], true, false, true, false, true, true, true, 180, 14, 6, 12, 0, ARRAY['appetizer', 'cheese', 'mint', 'samegrelo', 'cold'], 75),

('GEO_SOKO_KETZE', 'soko-ketze', 'Soko Ketze', 'Mushrooms baked in clay pot with sulguni cheese and butter, bubbling and aromatic', 'Soko Ketze', 'სოკო კეცზე', 'appetizers', 'popular', 'national', 'vegetarian', 'baked', false, false, false, false, ARRAY['ING_MUSHROOMS', 'ING_SULGUNI_CHEESE', 'ING_BUTTER', 'ING_GARLIC', 'ING_CILANTRO', 'ING_BLACK_PEPPER', 'ING_SALT'], ARRAY['dairy'], true, false, true, false, true, true, true, 240, 12, 8, 20, 0, ARRAY['appetizer', 'mushrooms', 'cheese', 'baked', 'clay-pot'], 82),

('GEO_ELARJI', 'elarji', 'Elarji', 'Thick cornmeal porridge with melted sulguni cheese, stretchy and incredibly satisfying', 'Elarji', 'ელარჯი', 'appetizers', 'signature', 'samegrelo', 'vegetarian', 'boiled', true, false, false, false, ARRAY['ING_CORNMEAL', 'ING_SULGUNI_CHEESE', 'ING_WATER', 'ING_SALT'], ARRAY['dairy'], true, false, true, false, true, true, true, 380, 16, 48, 16, 0, ARRAY['appetizer', 'cornmeal', 'cheese', 'stretchy', 'samegrelo'], 85),

-- ============================================
-- BREADS & PASTRIES (6 dishes)
-- ============================================
('GEO_SHOTIS_PURI', 'shotis-puri', 'Shotis Puri', 'Traditional Georgian boat-shaped bread baked in tone (clay oven), crusty outside, soft inside', 'Shotis Puri', 'შოთის პური', 'breads_pastries', 'signature', 'national', 'vegan', 'baked', true, false, true, false, ARRAY['ING_FLOUR', 'ING_WATER', 'ING_YEAST', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 280, 9, 56, 2, 0, ARRAY['bread', 'tone-oven', 'traditional', 'daily'], 95),

('GEO_TONIS_PURI', 'tonis-puri', 'Tonis Puri', 'Round Georgian bread baked on the walls of the tone clay oven, slightly thicker than shotis puri', 'Tonis Puri', 'თონის პური', 'breads_pastries', 'popular', 'national', 'vegan', 'baked', true, false, true, false, ARRAY['ING_FLOUR', 'ING_WATER', 'ING_YEAST', 'ING_SALT'], ARRAY['gluten'], false, true, true, true, true, true, true, 300, 10, 60, 2, 0, ARRAY['bread', 'tone-oven', 'round'], 88),

('GEO_MCHADI', 'mchadi', 'Mchadi', 'Cornbread patties, crispy on outside and soft inside, traditionally served with lobio and cheese', 'Mchadi', 'მჭადი', 'breads_pastries', 'signature', 'national', 'vegan', 'baked', true, false, true, false, ARRAY['ING_CORNMEAL', 'ING_WATER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 180, 4, 38, 2, 0, ARRAY['bread', 'corn', 'gluten-free', 'traditional'], 90),

('GEO_NAZUKI', 'nazuki', 'Nazuki', 'Sweet bread from Surami flavored with cinnamon, cloves and raisins, aromatic and festive', 'Nazuki', 'ნაზუქი', 'breads_pastries', 'traditional', 'kartli', 'vegetarian', 'baked', false, true, true, false, ARRAY['ING_FLOUR', 'ING_SUGAR', 'ING_BUTTER', 'ING_EGG', 'ING_RAISINS', 'ING_CINNAMON', 'ING_CLOVES', 'ING_YEAST', 'ING_MILK'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 320, 7, 52, 10, 0, ARRAY['bread', 'sweet', 'spiced', 'surami', 'festive'], 78),

('GEO_KADA', 'kada', 'Kada', 'Flaky sweet bread filled with butter and sugar mixture, similar to gata, festive treat', 'Kada', 'ქადა', 'breads_pastries', 'traditional', 'national', 'vegetarian', 'baked', false, true, false, false, ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_SUGAR', 'ING_EGG', 'ING_YOGURT', 'ING_SALT'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 380, 6, 48, 18, 0, ARRAY['bread', 'sweet', 'flaky', 'festive'], 75),

('GEO_CHURCHKHELA_BREAD', 'puri-churchkhelat', 'Bread with Churchkhela', 'Fresh bread served with slices of churchkhela, traditional pairing for breakfast or snack', 'Puri Churchkhelat', 'პური ჩურჩხელით', 'breads_pastries', 'active', 'kakheti', 'vegetarian', 'baked', false, false, true, false, ARRAY['ING_FLOUR', 'ING_WATER', 'ING_YEAST', 'ING_SALT', 'ING_CHURCHKHELA'], ARRAY['gluten', 'tree_nuts'], false, true, false, true, true, true, true, 420, 10, 68, 12, 0, ARRAY['bread', 'churchkhela', 'snack', 'breakfast'], 65),

-- ============================================
-- SAUCES (6 dishes)
-- ============================================
('GEO_TKEMALI', 'tkemali', 'Tkemali', 'Sour plum sauce made from wild cherry plums, essential Georgian condiment for grilled meats', 'Tkemali', 'ტყემალი', 'sauces', 'signature', 'national', 'vegan', 'boiled', true, false, false, true, ARRAY['ING_TKEMALI', 'ING_GARLIC', 'ING_CILANTRO', 'ING_DILL', 'ING_PENNYROYAL', 'ING_HOT_PEPPER', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 30, 0, 8, 0, 2, ARRAY['sauce', 'plum', 'sour', 'condiment'], 98),

('GEO_ADJIKA', 'adjika', 'Adjika', 'Fiery hot paste made from hot peppers, garlic, herbs and spices from Abkhazia/Samegrelo', 'Adjika', 'აჯიკა', 'sauces', 'signature', 'samegrelo', 'vegan', 'raw', true, false, false, true, ARRAY['ING_HOT_PEPPER', 'ING_GARLIC', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_DILL_SEEDS', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 15, 1, 3, 0, 5, ARRAY['sauce', 'hot', 'spicy', 'paste', 'samegrelo'], 92),

('GEO_BAZHE', 'bazhe', 'Bazhe', 'Creamy walnut sauce with garlic and spices, served with fried fish, chicken or vegetables', 'Bazhe', 'ბაჟე', 'sauces', 'popular', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_WALNUTS', 'ING_GARLIC', 'ING_CORIANDER', 'ING_FENUGREEK', 'ING_VINEGAR', 'ING_WATER', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 120, 4, 4, 12, 1, ARRAY['sauce', 'walnut', 'creamy', 'cold'], 85),

('GEO_TKLAPI', 'tklapi', 'Tklapi', 'Dried fruit leather made from plum or grape, used as souring agent in cooking', 'Tklapi', 'ტყლაპი', 'sauces', 'traditional', 'kakheti', 'vegan', 'raw', false, false, false, true, ARRAY['ING_PLUMS', 'ING_SUGAR'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 60, 0, 15, 0, 0, ARRAY['sauce', 'fruit-leather', 'souring', 'traditional'], 55),

('GEO_SATSEBELI', 'satsebeli', 'Satsebeli', 'Fresh tomato and herb sauce with garlic, lighter alternative to tkemali, very common', 'Satsebeli', 'საწებელი', 'sauces', 'popular', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_TOMATO', 'ING_GARLIC', 'ING_CILANTRO', 'ING_HOT_PEPPER', 'ING_VINEGAR', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 25, 1, 5, 0, 2, ARRAY['sauce', 'tomato', 'fresh', 'condiment'], 80),

('GEO_NARSHARAB', 'narsharab', 'Narsharab', 'Pomegranate molasses sauce, sweet-sour condiment used in Georgian-Azerbaijani cuisine', 'Narsharabi', 'ნარშარაბი', 'sauces', 'active', 'kakheti', 'vegan', 'boiled', false, false, false, true, ARRAY['ING_POMEGRANATE_JUICE', 'ING_SUGAR'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 50, 0, 13, 0, 0, ARRAY['sauce', 'pomegranate', 'sweet-sour', 'condiment'], 65),

-- ============================================
-- SALADS & SIDES (6 dishes)
-- ============================================
('GEO_TOMATO_CUCUMBER_SALAD', 'georgian-tomato-cucumber-salad', 'Georgian Tomato Cucumber Salad', 'Simple salad of ripe tomatoes, cucumbers, onions and fresh herbs with walnut oil', 'Kitris da Pomidvris Salata', 'კიტრის და პომიდვრის სალათა', 'salads_sides', 'signature', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_TOMATO', 'ING_CUCUMBER', 'ING_ONION', 'ING_CILANTRO', 'ING_BASIL', 'ING_WALNUT_OIL', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 80, 2, 10, 4, 0, ARRAY['salad', 'fresh', 'summer', 'vegan'], 90),

('GEO_NIGVZIANI_SALATA', 'nigvziani-salata', 'Walnut Salad', 'Salad dressed with crushed walnuts, garlic and herbs, distinctly Georgian', 'Nigvziani Salata', 'ნიგვზიანი სალათა', 'salads_sides', 'active', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_TOMATO', 'ING_CUCUMBER', 'ING_WALNUTS', 'ING_GARLIC', 'ING_CILANTRO', 'ING_VINEGAR', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 140, 4, 10, 10, 0, ARRAY['salad', 'walnuts', 'vegan'], 72),

('GEO_PICKLED_VEGETABLES', 'georgian-pickled-vegetables', 'Georgian Pickled Vegetables', 'Assorted pickled vegetables including cabbage, peppers and garlic, essential supra accompaniment', 'Mzhave', 'მჟავე', 'salads_sides', 'traditional', 'national', 'vegan', 'fermented', true, false, false, true, ARRAY['ING_CABBAGE', 'ING_BELL_PEPPER', 'ING_GARLIC', 'ING_CELERY', 'ING_DILL', 'ING_VINEGAR', 'ING_SALT'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 25, 1, 5, 0, 1, ARRAY['pickles', 'fermented', 'side', 'supra'], 85),

('GEO_BEAN_SALAD', 'georgian-bean-salad', 'Georgian Bean Salad', 'Cold kidney bean salad with onions, walnuts and pomegranate, lighter version of lobio', 'Lobios Salata', 'ლობიოს სალათა', 'salads_sides', 'active', 'national', 'vegan', 'cold', true, false, false, true, ARRAY['ING_KIDNEY_BEANS', 'ING_ONION', 'ING_WALNUTS', 'ING_POMEGRANATE_SEEDS', 'ING_CILANTRO', 'ING_VINEGAR', 'ING_VEGETABLE_OIL', 'ING_SALT'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 180, 10, 24, 6, 0, ARRAY['salad', 'beans', 'cold', 'vegan'], 70),

('GEO_CHEESE_PLATE', 'georgian-cheese-plate', 'Georgian Cheese Plate', 'Assortment of Georgian cheeses including sulguni, imeruli and guda with fresh herbs', 'Qvelis Assorti', 'ყველის ასორტი', 'salads_sides', 'popular', 'national', 'vegetarian', 'raw', true, false, false, true, ARRAY['ING_SULGUNI_CHEESE', 'ING_IMERULI_CHEESE', 'ING_GUDA_CHEESE', 'ING_MINT', 'ING_TARRAGON'], ARRAY['dairy'], true, false, true, false, true, true, true, 280, 20, 2, 22, 0, ARRAY['cheese', 'platter', 'supra', 'assorted'], 88),

('GEO_HERB_PLATTER', 'georgian-herb-platter', 'Georgian Herb Platter', 'Fresh herb platter with tarragon, basil, cilantro, mint and green onions, essential supra component', 'Mkhalneuli', 'მწვანეული', 'salads_sides', 'signature', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_TARRAGON', 'ING_BASIL', 'ING_CILANTRO', 'ING_MINT', 'ING_GREEN_ONION', 'ING_DILL'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 15, 1, 2, 0, 0, ARRAY['herbs', 'fresh', 'platter', 'supra', 'essential'], 95),

-- ============================================
-- DESSERTS (8 dishes)
-- ============================================
('GEO_CHURCHKHELA', 'churchkhela', 'Churchkhela', 'Iconic Georgian candy made from walnuts threaded on string and dipped in thickened grape juice, called Georgian Snickers', 'Churchkhela', 'ჩურჩხელა', 'desserts', 'signature', 'kakheti', 'vegan', 'boiled', true, true, true, true, ARRAY['ING_WALNUTS', 'ING_GRAPE_JUICE', 'ING_FLOUR', 'ING_SUGAR'], ARRAY['tree_nuts', 'gluten'], false, true, false, true, true, true, true, 280, 6, 38, 14, 0, ARRAY['dessert', 'candy', 'walnuts', 'grape', 'iconic', 'new-year'], 98),

('GEO_PELAMUSHI', 'pelamushi', 'Pelamushi', 'Thick grape pudding made from grape juice and flour, base for churchkhela, eaten as dessert', 'Pelamushi', 'ფელამუში', 'desserts', 'traditional', 'kakheti', 'vegan', 'boiled', false, true, false, true, ARRAY['ING_GRAPE_JUICE', 'ING_FLOUR', 'ING_SUGAR', 'ING_WALNUTS'], ARRAY['tree_nuts', 'gluten'], false, true, false, true, true, true, true, 220, 4, 42, 6, 0, ARRAY['dessert', 'pudding', 'grape', 'harvest'], 75),

('GEO_GOZINAKI', 'gozinaki', 'Gozinaki', 'Traditional New Year candy made from caramelized honey and toasted walnuts, crunchy and sweet', 'Gozinaki', 'გოზინაყი', 'desserts', 'signature', 'national', 'vegetarian', 'boiled', true, true, false, true, ARRAY['ING_WALNUTS', 'ING_HONEY', 'ING_SUGAR'], ARRAY['tree_nuts'], true, true, false, false, true, true, true, 320, 6, 36, 18, 0, ARRAY['dessert', 'candy', 'honey', 'walnuts', 'new-year'], 92),

('GEO_TATARA', 'tatara', 'Tatara', 'Sweet pudding made from honey, flour and butter, traditional winter treat', 'Tatara', 'თათარა', 'desserts', 'traditional', 'svaneti', 'vegetarian', 'boiled', false, true, false, false, ARRAY['ING_HONEY', 'ING_FLOUR', 'ING_BUTTER'], ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 280, 4, 45, 10, 0, ARRAY['dessert', 'pudding', 'honey', 'svaneti', 'winter'], 60),

('GEO_PAKHLAVA', 'georgian-pakhlava', 'Georgian Pakhlava', 'Georgian-style baklava with walnuts and honey, less sweet than Middle Eastern versions', 'Pakhlava', 'ფახლავა', 'desserts', 'popular', 'national', 'vegetarian', 'baked', true, true, false, true, ARRAY['ING_PHYLLO_DOUGH', 'ING_WALNUTS', 'ING_BUTTER', 'ING_HONEY', 'ING_SUGAR', 'ING_CINNAMON', 'ING_CLOVES'], ARRAY['tree_nuts', 'gluten', 'dairy'], false, false, false, false, true, true, true, 380, 6, 42, 22, 0, ARRAY['dessert', 'pastry', 'baklava', 'walnuts', 'honey'], 82),

('GEO_FRUIT_PLATE', 'georgian-fruit-plate', 'Georgian Fruit Plate', 'Seasonal fruit platter featuring Georgian peaches, grapes, figs, pomegranates and persimmons', 'Khili', 'ხილი', 'desserts', 'active', 'national', 'vegan', 'raw', true, false, false, true, ARRAY['ING_GRAPES', 'ING_PEACHES', 'ING_FIGS', 'ING_POMEGRANATE', 'ING_PERSIMMON'], ARRAY[]::TEXT[], true, true, true, true, true, true, true, 120, 2, 30, 0, 0, ARRAY['dessert', 'fruit', 'fresh', 'seasonal', 'supra'], 85),

('GEO_MURABA', 'muraba', 'Muraba', 'Georgian fruit preserve made from whole fruits like walnuts, figs or rose petals in thick syrup', 'Muraba', 'მურაბა', 'desserts', 'traditional', 'national', 'vegan', 'boiled', false, false, false, true, ARRAY['ING_GREEN_WALNUTS', 'ING_SUGAR', 'ING_WATER', 'ING_CLOVES'], ARRAY['tree_nuts'], true, true, false, true, true, true, true, 180, 2, 38, 4, 0, ARRAY['dessert', 'preserve', 'jam', 'traditional'], 65),

('GEO_HONEY_CAKE', 'georgian-honey-cake', 'Georgian Honey Cake', 'Multi-layered honey cake with sour cream frosting, popular celebration dessert', 'Torti Taphlit', 'ტორტი თაფლით', 'desserts', 'popular', 'national', 'vegetarian', 'baked', false, true, false, true, ARRAY['ING_FLOUR', 'ING_HONEY', 'ING_SOUR_CREAM', 'ING_BUTTER', 'ING_EGG', 'ING_SUGAR', 'ING_BAKING_SODA'], ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 420, 6, 52, 22, 0, ARRAY['dessert', 'cake', 'honey', 'celebration', 'layered'], 78);

-- ============================================
-- 74 Georgian dishes imported
-- Next: Run 03-georgian-product-ingredients.sql
-- ============================================
