-- Hawaiian Cuisine - Insert Dishes
-- Total: 29 dishes across 8 categories

-- Clear existing data
DELETE FROM hawaiian;

INSERT INTO hawaiian (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES

-- POKE (4)
('HI_AHI_POKE', 'ahi-poke', 'Ahi Poke', 'The classic Hawaiian poke: cubes of fresh ahi tuna marinated in soy sauce, sesame oil, and seaweed. The original and most iconic version.', 'poke', 'iconic', 'Statewide', 'ahi', 'raw', 15, 0, false, false, false, true, ARRAY['fish', 'soy', 'sesame'], ARRAY['raw', 'healthy', 'traditional'], 98),

('HI_SPICY_AHI_POKE', 'spicy-ahi-poke', 'Spicy Ahi Poke', 'A modern favorite: ahi tuna poke with spicy mayo and sriracha for a kick. Creamy, spicy, and irresistible.', 'poke', 'classic', 'Statewide', 'ahi', 'raw', 15, 2, false, false, false, false, ARRAY['fish', 'soy', 'eggs', 'sesame'], ARRAY['spicy', 'modern', 'popular'], 92),

('HI_SALMON_POKE', 'salmon-poke', 'Salmon Poke', 'Fresh salmon cubes in a shoyu and sesame marinade. A popular alternative to traditional ahi poke.', 'poke', 'classic', 'Statewide', 'salmon', 'raw', 15, 0, false, false, false, true, ARRAY['fish', 'soy', 'sesame'], ARRAY['raw', 'healthy', 'omega3'], 85),

('HI_POKE_BOWL', 'poke-bowl', 'Poke Bowl', 'A complete meal: poke served over rice with edamame, cucumber, avocado, and all the toppings. The modern Hawaiian lunch.', 'poke', 'iconic', 'Statewide', 'ahi', 'raw', 20, 1, false, false, false, true, ARRAY['fish', 'soy', 'sesame'], ARRAY['bowl', 'complete_meal', 'healthy'], 95),

-- PLATE LUNCH (5)
('HI_LOCO_MOCO', 'loco-moco', 'Loco Moco', 'The ultimate Hawaiian comfort food: rice topped with a hamburger patty, fried egg, and smothered in brown gravy. Originated in Hilo in 1949.', 'plate_lunch', 'iconic', 'Big Island', 'beef', 'grilled', 20, 0, false, false, false, false, ARRAY['gluten', 'eggs', 'dairy'], ARRAY['comfort_food', 'iconic', 'hearty'], 95),

('HI_CHICKEN_KATSU', 'chicken-katsu-plate', 'Chicken Katsu Plate', 'Japanese-influenced plate lunch: crispy panko-breaded chicken cutlet served with rice and macaroni salad. A local favorite.', 'plate_lunch', 'classic', 'Statewide', 'chicken', 'fried', 30, 0, false, false, false, false, ARRAY['gluten', 'eggs', 'dairy'], ARRAY['fried', 'plate_lunch', 'japanese_influence'], 88),

('HI_KALBI_PLATE', 'kalbi-short-ribs-plate', 'Kalbi Short Ribs Plate', 'Korean-influenced plate lunch: sweet and savory marinated short ribs grilled to perfection, served with rice and mac salad.', 'plate_lunch', 'classic', 'Statewide', 'beef', 'grilled', 30, 0, false, false, false, true, ARRAY['soy', 'gluten', 'sesame'], ARRAY['korean_influence', 'grilled', 'sweet_savory'], 85),

('HI_TERIYAKI_BEEF', 'teriyaki-beef-plate', 'Teriyaki Beef Plate', 'Thin slices of beef glazed with sweet teriyaki sauce, served over rice with macaroni salad. A staple of Hawaiian plate lunch culture.', 'plate_lunch', 'classic', 'Statewide', 'beef', 'grilled', 25, 0, false, false, false, true, ARRAY['soy', 'gluten'], ARRAY['teriyaki', 'japanese_influence', 'sweet'], 82),

('HI_MAHIMAHI_PLATE', 'fried-mahimahi-plate', 'Fried Mahimahi Plate', 'Golden-fried mahimahi fillets served with rice and macaroni salad. A beloved seafood plate lunch option.', 'plate_lunch', 'classic', 'Statewide', 'fish', 'fried', 25, 0, false, false, false, false, ARRAY['fish', 'gluten', 'eggs', 'dairy'], ARRAY['seafood', 'fried', 'local_fish'], 78),

-- LUAU (5)
('HI_KALUA_PIG', 'kalua-pig', 'Kalua Pig', 'The centerpiece of every luau: whole pig slow-roasted in an imu (underground oven) for hours. Tender, smoky, and seasoned only with Hawaiian sea salt.', 'luau', 'iconic', 'Statewide', 'pork', 'smoked', 480, 0, false, false, true, true, ARRAY[]::TEXT[], ARRAY['luau', 'traditional', 'slow_cooked', 'smoky'], 95),

('HI_LAULAU', 'laulau', 'Laulau', 'Traditional Hawaiian bundle: pork and butterfish wrapped in taro leaves and ti leaves, then steamed until tender. Earthy, rich, and deeply satisfying.', 'luau', 'iconic', 'Statewide', 'pork', 'steamed', 240, 0, false, false, true, true, ARRAY['fish'], ARRAY['traditional', 'steamed', 'wrapped', 'luau'], 88),

('HI_POI', 'poi', 'Poi', 'The sacred staple of Hawaiian cuisine: taro root pounded and mixed with water into a purple paste. Can be fresh (sweet) or aged (sour).', 'luau', 'traditional', 'Statewide', NULL, 'boiled', 60, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['traditional', 'staple', 'sacred', 'taro'], 72),

('HI_CHICKEN_LONG_RICE', 'chicken-long-rice', 'Chicken Long Rice', 'Chinese-influenced Hawaiian dish: chicken and glass noodles simmered in a ginger-infused broth. Comfort food at every luau.', 'luau', 'classic', 'Statewide', 'chicken', 'simmered', 45, 0, false, false, true, true, ARRAY[]::TEXT[], ARRAY['chinese_influence', 'noodles', 'comfort_food', 'luau'], 82),

('HI_SQUID_LUAU', 'squid-luau', 'Squid Luau', 'Tender squid cooked with luau leaves (taro tops) in coconut milk. A creamy, savory traditional Hawaiian dish.', 'luau', 'traditional', 'Statewide', 'shellfish', 'simmered', 90, 0, false, false, true, true, ARRAY['shellfish'], ARRAY['traditional', 'coconut', 'luau', 'squid'], 68),

-- SNACKS (4)
('HI_SPAM_MUSUBI', 'spam-musubi', 'Spam Musubi', 'Hawaii''s most popular snack: grilled Spam on a block of rice, wrapped with nori. Found at every convenience store, gas station, and lunch spot.', 'snack', 'iconic', 'Statewide', 'spam', 'grilled', 15, 0, false, false, false, true, ARRAY['gluten'], ARRAY['iconic', 'portable', 'convenience_store', 'spam'], 98),

('HI_MANAPUA', 'manapua', 'Manapua', 'Hawaii''s version of char siu bao: a large, fluffy steamed bun filled with sweet barbecue pork. A beloved snack evolved from Chinese immigrants.', 'snack', 'iconic', 'Statewide', 'pork', 'steamed', 45, 0, false, false, false, true, ARRAY['gluten', 'soy'], ARRAY['chinese_influence', 'steamed', 'bun', 'portable'], 88),

('HI_MALASADA', 'malasada', 'Malasada', 'Portuguese-influenced fried dough: fluffy, hole-less doughnuts rolled in sugar. Leonard''s Bakery made them famous, now a Hawaiian staple.', 'snack', 'iconic', 'Oahu', NULL, 'fried', 60, 0, true, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['portuguese_influence', 'fried', 'sweet', 'doughnut'], 92),

('HI_HURRICANE_POPCORN', 'hurricane-popcorn', 'Hurricane Popcorn', 'A local snack sensation: buttered popcorn mixed with arare (rice crackers), furikake, and sometimes nori. Sweet, salty, and crunchy.', 'snack', 'local', 'Statewide', NULL, 'none', 10, 0, true, false, false, false, ARRAY['gluten', 'dairy', 'fish'], ARRAY['snack', 'movie_theater', 'local_invention'], 75),

-- NOODLES (2)
('HI_SAIMIN', 'saimin', 'Saimin', 'Hawaii''s unique noodle soup: thin wheat noodles in dashi broth with kamaboko, char siu, and green onions. A plantation-era creation now served everywhere, even McDonald''s.', 'noodles', 'iconic', 'Statewide', 'pork', 'boiled', 20, 0, false, false, false, true, ARRAY['gluten', 'fish', 'soy'], ARRAY['soup', 'noodles', 'plantation_era', 'comfort_food'], 90),

('HI_FRIED_SAIMIN', 'fried-saimin', 'Fried Saimin', 'Dry-style saimin: noodles stir-fried with vegetables, egg, and char siu in a savory sauce. A popular variation of the classic soup.', 'noodles', 'classic', 'Statewide', 'pork', 'stir_fried', 20, 0, false, false, false, true, ARRAY['gluten', 'soy', 'eggs'], ARRAY['noodles', 'stir_fried', 'quick'], 78),

-- GRILL (3)
('HI_HULI_HULI_CHICKEN', 'huli-huli-chicken', 'Huli Huli Chicken', 'Iconic Hawaiian barbecue: whole chicken glazed with sweet teriyaki-style sauce and grilled over kiawe wood. "Huli" means "turn" in Hawaiian.', 'grill', 'iconic', 'Statewide', 'chicken', 'grilled', 60, 0, false, false, false, true, ARRAY['soy', 'gluten'], ARRAY['bbq', 'grilled', 'fundraiser', 'iconic'], 92),

('HI_PORTUGUESE_SAUSAGE', 'portuguese-sausage-and-rice', 'Portuguese Sausage and Rice', 'A Hawaiian breakfast staple: smoky, slightly sweet Portuguese sausage served with rice and eggs. The sausage is unique to Hawaii.', 'grill', 'classic', 'Statewide', 'pork', 'grilled', 15, 1, false, false, false, true, ARRAY['gluten', 'eggs'], ARRAY['breakfast', 'portuguese_influence', 'sausage'], 85),

('HI_SHOYU_CHICKEN', 'shoyu-chicken', 'Shoyu Chicken', 'Chicken braised in a sweet shoyu (soy sauce) glaze with ginger. A staple at local gatherings and plate lunch spots.', 'grill', 'classic', 'Statewide', 'chicken', 'braised', 45, 0, false, false, false, true, ARRAY['soy', 'gluten'], ARRAY['braised', 'sweet_savory', 'local_favorite'], 80),

-- DESSERTS (4)
('HI_HAUPIA', 'haupia', 'Haupia', 'Traditional Hawaiian coconut pudding: silky, jiggly squares of coconut milk set with arrowroot or cornstarch. A must at every luau.', 'dessert', 'iconic', 'Statewide', NULL, 'chilled', 30, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['coconut', 'traditional', 'luau', 'vegan'], 90),

('HI_SHAVE_ICE', 'shave-ice', 'Hawaiian Shave Ice', 'Finely shaved ice drenched in tropical fruit syrups. Often topped with ice cream, azuki beans, or condensed milk. Not a snow cone—much finer!', 'dessert', 'iconic', 'Statewide', NULL, 'frozen', 5, 0, true, false, true, false, ARRAY['dairy'], ARRAY['frozen', 'tropical', 'summer', 'colorful'], 95),

('HI_BUTTER_MOCHI', 'butter-mochi', 'Butter Mochi', 'A local favorite: chewy, buttery mochi cake made with mochiko flour and coconut milk. Crispy edges, soft center. Addictively good.', 'dessert', 'classic', 'Statewide', NULL, 'baked', 60, 0, true, false, true, false, ARRAY['dairy', 'eggs'], ARRAY['mochi', 'japanese_influence', 'chewy', 'local_favorite'], 85),

('HI_LILIKOI_PIE', 'lilikoi-chiffon-pie', 'Lilikoi Chiffon Pie', 'Light and airy passion fruit chiffon pie with a graham cracker crust. Tangy, sweet, and quintessentially Hawaiian.', 'dessert', 'classic', 'Statewide', NULL, 'chilled', 90, 0, true, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['pie', 'lilikoi', 'tropical', 'light'], 78),

-- BEVERAGES (2)
('HI_POG', 'pog-juice', 'POG Juice', 'Hawaii''s beloved tropical juice blend: passion fruit, orange, and guava. Created in Maui in the 1970s, now a local staple.', 'beverage', 'iconic', 'Maui', NULL, 'blended', 5, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['juice', 'tropical', 'refreshing', 'local_invention'], 90),

('HI_LILIKOIADE', 'lilikoiade', 'Lilikoi-ade', 'Refreshing passion fruit lemonade. Tart, sweet, and perfectly tropical. A favorite at farmers markets and local eateries.', 'beverage', 'classic', 'Statewide', NULL, 'mixed', 10, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['lemonade', 'lilikoi', 'refreshing', 'summer'], 82);

-- Verification
SELECT category, COUNT(*) as count FROM hawaiian GROUP BY category ORDER BY category;
SELECT COUNT(*) as total_dishes FROM hawaiian;
