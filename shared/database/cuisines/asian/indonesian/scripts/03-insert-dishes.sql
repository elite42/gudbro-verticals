-- Indonesian Cuisine - Insert Dishes
-- GUDBRO Database Standards v1.7
-- Total dishes: 55

INSERT INTO indonesian (
  id, slug, name, local_name, description,
  category, region, status, protein_type, cooking_method,
  prep_time_min, spice_level, dietary, allergens, tags, popularity
) VALUES
-- =====================================================
-- RICE DISHES (6)
-- =====================================================
('IDN_NASI_GORENG', 'nasi-goreng', 'Nasi Goreng', 'Nasi Goreng', 'Indonesian fried rice with sweet soy sauce, served with fried egg, chicken satay, and kerupuk',
 'rice', 'nationwide', 'iconic', 'mixed', 'stir-fried',
 20, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['eggs', 'soy', 'shellfish'], ARRAY['street-food', 'national-dish', 'breakfast'], 98),

('IDN_NASI_UDUK', 'nasi-uduk', 'Nasi Uduk', 'Nasi Uduk', 'Coconut milk rice from Jakarta, served with fried chicken, tempeh, and sambal',
 'rice', 'jakarta', 'iconic', 'chicken', 'steamed',
 45, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['betawi', 'breakfast', 'coconut'], 88),

('IDN_NASI_CAMPUR', 'nasi-campur-bali', 'Nasi Campur Bali', 'Nasi Campur Bali', 'Balinese mixed rice with various side dishes including sate lilit, lawar, and sambal matah',
 'rice', 'bali', 'iconic', 'mixed', 'mixed',
 60, 3, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": false, "is_kosher": false}'::jsonb, ARRAY['nuts'], ARRAY['balinese', 'mixed-plate', 'ceremonial'], 85),

('IDN_NASI_PADANG', 'nasi-padang', 'Nasi Padang', 'Nasi Padang', 'Minangkabau-style rice served with rendang, gulai, and various spicy side dishes',
 'rice', 'sumatra', 'iconic', 'mixed', 'mixed',
 90, 4, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['padang', 'spicy', 'feast'], 92),

('IDN_NASI_KUNING', 'nasi-kuning', 'Nasi Kuning', 'Nasi Kuning', 'Yellow turmeric rice shaped in a cone, served at celebrations with various side dishes',
 'rice', 'nationwide', 'classic', 'mixed', 'steamed',
 50, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['celebration', 'ceremonial', 'festive'], 80),

('IDN_NASI_LIWET', 'nasi-liwet', 'Nasi Liwet', 'Nasi Liwet Solo', 'Javanese rice cooked in coconut milk with chicken broth, served with shredded chicken and opor',
 'rice', 'java', 'traditional', 'chicken', 'simmered',
 60, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['solo', 'javanese', 'comfort-food'], 75),

-- =====================================================
-- NOODLE DISHES (5)
-- =====================================================
('IDN_MIE_GORENG', 'mie-goreng', 'Mie Goreng', 'Mie Goreng', 'Indonesian stir-fried noodles with sweet soy sauce, vegetables, and choice of protein',
 'noodles', 'nationwide', 'iconic', 'mixed', 'stir-fried',
 20, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['gluten', 'eggs', 'soy'], ARRAY['street-food', 'quick', 'popular'], 95),

('IDN_MIE_AYAM', 'mie-ayam', 'Mie Ayam', 'Mie Ayam', 'Chicken noodles served with minced chicken, wontons, and clear broth on the side',
 'noodles', 'nationwide', 'iconic', 'chicken', 'boiled',
 30, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['gluten', 'soy'], ARRAY['street-food', 'comfort-food', 'chinese-indonesian'], 90),

('IDN_BAKMI_JAWA', 'bakmi-jawa', 'Bakmi Jawa', 'Bakmi Jawa', 'Javanese-style noodles stir-fried with sweet soy sauce and topped with fried egg',
 'noodles', 'java', 'classic', 'mixed', 'stir-fried',
 25, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['gluten', 'eggs', 'soy'], ARRAY['javanese', 'street-food', 'sweet'], 82),

('IDN_KWETIAU_GORENG', 'kwetiau-goreng', 'Kwetiau Goreng', 'Kwetiau Goreng', 'Stir-fried flat rice noodles with seafood, vegetables, and soy sauce',
 'noodles', 'nationwide', 'classic', 'seafood', 'stir-fried',
 20, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['shellfish', 'soy'], ARRAY['chinese-indonesian', 'wok', 'seafood'], 78),

('IDN_MIE_ACEH', 'mie-aceh', 'Mie Aceh', 'Mie Aceh', 'Spicy Acehnese noodles with thick yellow noodles, curry-like sauce, and seafood or beef',
 'noodles', 'sumatra', 'regional', 'mixed', 'stir-fried',
 30, 4, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['gluten', 'shellfish'], ARRAY['acehnese', 'spicy', 'curry'], 75),

-- =====================================================
-- SATAY DISHES (6)
-- =====================================================
('IDN_SATE_AYAM', 'sate-ayam', 'Sate Ayam', 'Sate Ayam', 'Classic chicken satay skewers grilled over charcoal, served with peanut sauce and lontong',
 'satay', 'nationwide', 'iconic', 'chicken', 'grilled',
 45, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['peanuts'], ARRAY['street-food', 'grilled', 'iconic'], 98),

('IDN_SATE_KAMBING', 'sate-kambing', 'Sate Kambing', 'Sate Kambing', 'Grilled mutton satay skewers with aromatic spices, served with sweet soy dipping sauce',
 'satay', 'java', 'classic', 'lamb', 'grilled',
 50, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['soy'], ARRAY['celebration', 'grilled', 'aromatic'], 85),

('IDN_SATE_MADURA', 'sate-madura', 'Sate Madura', 'Sate Madura', 'Madurese-style chicken satay with rich peanut sauce and sweet soy marinade',
 'satay', 'java', 'iconic', 'chicken', 'grilled',
 50, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['peanuts', 'soy'], ARRAY['madurese', 'peanut-sauce', 'famous'], 90),

('IDN_SATE_LILIT', 'sate-lilit', 'Sate Lilit', 'Sate Lilit Bali', 'Balinese minced fish or chicken satay wrapped around lemongrass sticks',
 'satay', 'bali', 'regional', 'fish', 'grilled',
 45, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['fish'], ARRAY['balinese', 'unique', 'lemongrass'], 80),

('IDN_SATE_PADANG', 'sate-padang', 'Sate Padang', 'Sate Padang', 'Padang-style beef satay with spicy yellow curry sauce made from rice flour',
 'satay', 'sumatra', 'regional', 'beef', 'grilled',
 60, 3, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['padang', 'curry-sauce', 'spicy'], 78),

('IDN_SATE_TAICHAN', 'sate-taichan', 'Sate Taichan', 'Sate Taichan', 'Plain grilled chicken satay without peanut sauce, served with sambal and lime',
 'satay', 'jakarta', 'classic', 'chicken', 'grilled',
 30, 3, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['modern', 'spicy', 'simple'], 82),

-- =====================================================
-- SOUP DISHES (6)
-- =====================================================
('IDN_SOTO_AYAM', 'soto-ayam', 'Soto Ayam', 'Soto Ayam', 'Indonesian yellow chicken soup with turmeric broth, vermicelli, and hard-boiled egg',
 'soup', 'nationwide', 'iconic', 'chicken', 'simmered',
 60, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['eggs'], ARRAY['comfort-food', 'traditional', 'turmeric'], 95),

('IDN_SOTO_BETAWI', 'soto-betawi', 'Soto Betawi', 'Soto Betawi', 'Jakarta-style beef soup with coconut milk and evaporated milk, rich and creamy',
 'soup', 'jakarta', 'iconic', 'beef', 'simmered',
 90, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['dairy'], ARRAY['betawi', 'creamy', 'rich'], 88),

('IDN_BAKSO', 'bakso', 'Bakso', 'Bakso', 'Indonesian meatball soup with beef balls, noodles, and clear beef broth',
 'soup', 'nationwide', 'iconic', 'beef', 'boiled',
 60, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['gluten'], ARRAY['street-food', 'popular', 'meatballs'], 96),

('IDN_RAWON', 'rawon', 'Rawon', 'Rawon', 'East Javanese black beef soup colored with keluak nuts, aromatic and earthy',
 'soup', 'java', 'regional', 'beef', 'simmered',
 120, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['nuts'], ARRAY['javanese', 'black-soup', 'unique'], 80),

('IDN_SOP_BUNTUT', 'sop-buntut', 'Sop Buntut', 'Sop Buntut', 'Indonesian oxtail soup, clear broth with tender oxtail, vegetables, and fried shallots',
 'soup', 'nationwide', 'classic', 'beef', 'simmered',
 180, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['premium', 'slow-cooked', 'clear-soup'], 82),

('IDN_SOTO_LAMONGAN', 'soto-lamongan', 'Soto Lamongan', 'Soto Lamongan', 'East Javanese chicken soup with distinctive koya (prawn crackers powder) topping',
 'soup', 'java', 'regional', 'chicken', 'simmered',
 60, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['shellfish'], ARRAY['javanese', 'koya', 'aromatic'], 78),

-- =====================================================
-- CURRY DISHES (6)
-- =====================================================
('IDN_RENDANG', 'rendang', 'Rendang', 'Rendang Daging', 'Slow-cooked dry beef curry from Padang, caramelized in coconut milk and spices',
 'curry', 'sumatra', 'iconic', 'beef', 'braised',
 240, 3, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['worlds-best', 'padang', 'slow-cooked'], 99),

('IDN_GULAI_KAMBING', 'gulai-kambing', 'Gulai Kambing', 'Gulai Kambing', 'Rich lamb curry in spiced coconut milk gravy, a Padang classic',
 'curry', 'sumatra', 'classic', 'lamb', 'simmered',
 90, 3, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['padang', 'curry', 'aromatic'], 85),

('IDN_OPOR_AYAM', 'opor-ayam', 'Opor Ayam', 'Opor Ayam', 'Javanese chicken in white coconut curry, traditionally served during Lebaran',
 'curry', 'java', 'iconic', 'chicken', 'simmered',
 60, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['lebaran', 'javanese', 'festive'], 88),

('IDN_KARE_AYAM', 'kare-ayam', 'Kare Ayam', 'Kare Ayam', 'Indonesian-style chicken curry with potatoes in yellow coconut curry sauce',
 'curry', 'nationwide', 'classic', 'chicken', 'simmered',
 50, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['family-style', 'curry', 'comfort-food'], 82),

('IDN_KALIO', 'kalio', 'Kalio', 'Kalio Daging', 'Minangkabau wet rendang, beef in spiced coconut gravy before it becomes dry rendang',
 'curry', 'sumatra', 'traditional', 'beef', 'braised',
 120, 3, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['padang', 'wet-curry', 'traditional'], 75),

('IDN_GULAI_OTAK', 'gulai-otak', 'Gulai Otak', 'Gulai Otak', 'Spiced brain curry in rich coconut gravy, a Padang delicacy',
 'curry', 'sumatra', 'regional', 'offal', 'simmered',
 45, 3, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['padang', 'offal', 'rich'], 60),

-- =====================================================
-- FRIED DISHES (6)
-- =====================================================
('IDN_AYAM_GORENG', 'ayam-goreng', 'Ayam Goreng', 'Ayam Goreng', 'Indonesian fried chicken marinated in spices and deep-fried until golden',
 'fried', 'nationwide', 'iconic', 'chicken', 'deep-fried',
 45, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['fried', 'popular', 'everyday'], 95),

('IDN_AYAM_PENYET', 'ayam-penyet', 'Ayam Penyet', 'Ayam Penyet', 'Smashed fried chicken served with spicy sambal, a Javanese specialty',
 'fried', 'java', 'iconic', 'chicken', 'deep-fried',
 50, 4, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['smashed', 'spicy', 'javanese'], 90),

('IDN_BEBEK_GORENG', 'bebek-goreng', 'Bebek Goreng', 'Bebek Goreng', 'Indonesian crispy fried duck, marinated in spices and deep-fried until crispy',
 'fried', 'java', 'classic', 'duck', 'deep-fried',
 90, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['crispy', 'duck', 'premium'], 82),

('IDN_TEMPE_GORENG', 'tempe-goreng', 'Tempe Goreng', 'Tempe Goreng', 'Crispy fried tempeh, a protein-rich Indonesian staple',
 'fried', 'nationwide', 'classic', 'vegetarian', 'deep-fried',
 15, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, ARRAY['soy'], ARRAY['vegan', 'protein', 'simple'], 88),

('IDN_TAHU_GORENG', 'tahu-goreng', 'Tahu Goreng', 'Tahu Goreng', 'Indonesian fried tofu, crispy outside and soft inside',
 'fried', 'nationwide', 'classic', 'vegetarian', 'deep-fried',
 15, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, ARRAY['soy'], ARRAY['vegan', 'tofu', 'simple'], 85),

('IDN_IKAN_GORENG', 'ikan-goreng', 'Ikan Goreng', 'Ikan Goreng', 'Indonesian whole fried fish, crispy and served with sambal',
 'fried', 'nationwide', 'classic', 'fish', 'deep-fried',
 30, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['fish'], ARRAY['seafood', 'whole-fish', 'crispy'], 80),

-- =====================================================
-- SALAD DISHES (5)
-- =====================================================
('IDN_GADO_GADO', 'gado-gado', 'Gado-Gado', 'Gado-Gado', 'Indonesian salad with vegetables, tofu, tempeh, and egg in peanut sauce dressing',
 'salad', 'jakarta', 'iconic', 'vegetarian', 'mixed',
 30, 2, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['peanuts', 'eggs', 'soy'], ARRAY['vegetarian', 'peanut-sauce', 'healthy'], 92),

('IDN_PECEL', 'pecel', 'Pecel', 'Pecel', 'Javanese vegetable salad with spicy peanut sauce, served with rice',
 'salad', 'java', 'classic', 'vegetarian', 'blanched',
 25, 2, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, ARRAY['peanuts'], ARRAY['javanese', 'vegan', 'healthy'], 82),

('IDN_URAP', 'urap', 'Urap', 'Urap Sayur', 'Javanese steamed vegetable salad with spiced grated coconut dressing',
 'salad', 'java', 'traditional', 'vegetarian', 'steamed',
 30, 1, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, '{}'::text[], ARRAY['javanese', 'coconut', 'traditional'], 75),

('IDN_KAREDOK', 'karedok', 'Karedok', 'Karedok', 'Sundanese raw vegetable salad with peanut sauce, similar to gado-gado but raw',
 'salad', 'java', 'regional', 'vegetarian', 'raw',
 20, 2, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": false, "is_halal": true, "is_kosher": true}'::jsonb, ARRAY['peanuts'], ARRAY['sundanese', 'raw', 'fresh'], 70),

('IDN_LAWAR', 'lawar', 'Lawar', 'Lawar Bali', 'Balinese mixed vegetable and meat salad with grated coconut and spices',
 'salad', 'bali', 'regional', 'mixed', 'mixed',
 45, 2, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['balinese', 'ceremonial', 'traditional'], 72),

-- =====================================================
-- SNACKS (7)
-- =====================================================
('IDN_PISANG_GORENG', 'pisang-goreng', 'Pisang Goreng', 'Pisang Goreng', 'Indonesian fried banana fritters, crispy batter with sweet banana inside',
 'snacks', 'nationwide', 'iconic', NULL, 'deep-fried',
 20, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, ARRAY['gluten'], ARRAY['street-food', 'sweet', 'snack'], 95),

('IDN_BAKWAN', 'bakwan', 'Bakwan', 'Bakwan Sayur', 'Vegetable fritters with cabbage, carrots, and bean sprouts in crispy batter',
 'snacks', 'nationwide', 'classic', NULL, 'deep-fried',
 20, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, ARRAY['gluten'], ARRAY['street-food', 'savory', 'vegetables'], 85),

('IDN_MARTABAK_TELUR', 'martabak-telur', 'Martabak Telur', 'Martabak Telur', 'Savory stuffed pancake with egg, meat, and vegetables',
 'snacks', 'nationwide', 'iconic', 'mixed', 'pan-fried',
 30, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['gluten', 'eggs'], ARRAY['street-food', 'savory', 'popular'], 92),

('IDN_MARTABAK_MANIS', 'martabak-manis', 'Martabak Manis', 'Martabak Manis', 'Thick sweet pancake with chocolate, peanuts, cheese, and condensed milk',
 'snacks', 'nationwide', 'iconic', NULL, 'pan-fried',
 30, 0, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": false, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['gluten', 'dairy', 'eggs', 'peanuts'], ARRAY['street-food', 'sweet', 'popular'], 94),

('IDN_LEMPER', 'lemper', 'Lemper', 'Lemper Ayam', 'Glutinous rice roll filled with spiced chicken, wrapped in banana leaf',
 'snacks', 'java', 'traditional', 'chicken', 'steamed',
 60, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, '{}'::text[], ARRAY['javanese', 'sticky-rice', 'wrapped'], 78),

('IDN_PERKEDEL', 'perkedel', 'Perkedel', 'Perkedel Kentang', 'Indonesian potato fritters mixed with ground beef and spices',
 'snacks', 'nationwide', 'classic', 'beef', 'deep-fried',
 35, 1, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['eggs'], ARRAY['side-dish', 'potato', 'comfort-food'], 82),

('IDN_RISOLES', 'risoles', 'Risoles', 'Risoles', 'Crepe rolls filled with vegetables and ragout, breaded and fried',
 'snacks', 'nationwide', 'classic', 'mixed', 'deep-fried',
 45, 0, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['dutch-influence', 'ragout', 'breaded'], 75),

-- =====================================================
-- DESSERTS (8)
-- =====================================================
('IDN_ES_CENDOL', 'es-cendol', 'Es Cendol', 'Es Cendol', 'Iced dessert with green rice flour jelly, coconut milk, and palm sugar syrup',
 'desserts', 'java', 'iconic', NULL, 'mixed',
 30, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, '{}'::text[], ARRAY['iced', 'refreshing', 'sweet'], 92),

('IDN_ES_CAMPUR', 'es-campur', 'Es Campur', 'Es Campur', 'Mixed ice dessert with various jellies, fruits, and coconut milk',
 'desserts', 'nationwide', 'classic', NULL, 'mixed',
 25, 0, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, ARRAY['dairy'], ARRAY['iced', 'colorful', 'mixed'], 85),

('IDN_KLEPON', 'klepon', 'Klepon', 'Klepon', 'Sweet glutinous rice balls filled with palm sugar, coated in grated coconut',
 'desserts', 'java', 'iconic', NULL, 'boiled',
 45, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, '{}'::text[], ARRAY['traditional', 'sweet', 'pandan'], 88),

('IDN_ONDE_ONDE', 'onde-onde', 'Onde-Onde', 'Onde-Onde', 'Fried glutinous rice balls filled with mung bean paste, coated in sesame seeds',
 'desserts', 'nationwide', 'classic', NULL, 'deep-fried',
 60, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, ARRAY['sesame'], ARRAY['fried', 'sesame', 'mung-bean'], 82),

('IDN_KUE_LAPIS', 'kue-lapis', 'Kue Lapis', 'Kue Lapis', 'Colorful layered steamed cake, soft and chewy with pandan and coconut',
 'desserts', 'nationwide', 'classic', NULL, 'steamed',
 90, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, '{}'::text[], ARRAY['layered', 'colorful', 'festive'], 80),

('IDN_DADAR_GULUNG', 'dadar-gulung', 'Dadar Gulung', 'Dadar Gulung', 'Green pandan crepe rolls filled with sweet grated coconut and palm sugar',
 'desserts', 'java', 'traditional', NULL, 'pan-fried',
 40, 0, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb, ARRAY['gluten', 'eggs'], ARRAY['crepe', 'pandan', 'coconut'], 78),

('IDN_KOLAK', 'kolak', 'Kolak', 'Kolak Pisang', 'Sweet soup dessert with bananas, sweet potatoes, and tapioca pearls in coconut milk',
 'desserts', 'nationwide', 'iconic', NULL, 'simmered',
 30, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, '{}'::text[], ARRAY['ramadan', 'warm', 'traditional'], 88),

('IDN_SERABI', 'serabi', 'Serabi', 'Serabi Solo', 'Indonesian coconut milk pancakes, served with palm sugar syrup or savory toppings',
 'desserts', 'java', 'traditional', NULL, 'pan-fried',
 25, 0, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb, '{}'::text[], ARRAY['pancake', 'coconut', 'street-food'], 75)

ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VERIFICATION
-- =====================================================
-- SELECT COUNT(*) FROM indonesian; -- Expected: 55
-- SELECT category, COUNT(*) FROM indonesian GROUP BY category ORDER BY category;
