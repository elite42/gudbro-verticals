-- Australian Cuisine - Insert Dishes
-- Total: 29 dishes across 9 categories

-- Clear existing data
DELETE FROM australian;

INSERT INTO australian (id, slug, name, description, category, status, region, protein_type, cooking_method, prep_time_min, spice_level, is_vegetarian, is_vegan, is_gluten_free, is_dairy_free, allergens, tags, popularity) VALUES

-- PIES (3)
('AU_MEAT_PIE', 'aussie-meat-pie', 'Aussie Meat Pie', 'The quintessential Australian hand pie filled with seasoned minced beef and gravy in a flaky pastry crust. A staple at sporting events and bakeries across the nation.', 'pie', 'iconic', 'National', 'beef', 'baked', 60, 0, false, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['hand_pie', 'comfort_food', 'bakery', 'portable'], 95),

('AU_PIE_FLOATER', 'pie-floater', 'Pie Floater', 'A South Australian specialty: a meat pie served upside-down floating in thick mushy peas, topped with tomato sauce. A beloved late-night street food tradition.', 'pie', 'regional', 'South Australia', 'beef', 'baked', 45, 0, false, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['street_food', 'unique', 'adelaide'], 72),

('AU_SAUSAGE_ROLL', 'sausage-roll', 'Sausage Roll', 'Seasoned pork mince wrapped in golden, flaky puff pastry. A staple at Australian bakeries, school canteens, and party platters.', 'pie', 'iconic', 'National', 'pork', 'baked', 40, 0, false, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['party_food', 'bakery', 'portable', 'snack'], 90),

-- BBQ (4)
('AU_LAMB_ROAST', 'sunday-lamb-roast', 'Sunday Lamb Roast', 'Australia''s unofficial national dish: a whole leg of lamb roasted to perfection with rosemary and garlic, served with roasted vegetables and mint sauce.', 'bbq', 'iconic', 'National', 'lamb', 'roasted', 180, 0, false, false, true, true, ARRAY[]::TEXT[], ARRAY['sunday_dinner', 'family', 'traditional', 'holiday'], 92),

('AU_LAMB_CHOPS', 'bbq-lamb-chops', 'BBQ Lamb Chops', 'Marinated lamb cutlets grilled on the barbie until perfectly charred on the outside and pink in the middle. A backyard BBQ essential.', 'bbq', 'classic', 'National', 'lamb', 'grilled', 30, 0, false, false, true, true, ARRAY[]::TEXT[], ARRAY['bbq', 'quick', 'summer'], 85),

('AU_SNAG', 'aussie-snag', 'Aussie Snag', 'The classic Australian sausage, typically beef or pork, grilled on the barbie and served in a slice of white bread with fried onions and sauce.', 'bbq', 'iconic', 'National', 'beef', 'grilled', 15, 0, false, false, false, true, ARRAY['gluten'], ARRAY['bbq', 'bunnings', 'quick', 'casual'], 88),

('AU_STEAK_SANDWICH', 'steak-sandwich', 'Steak Sandwich', 'A thick cut of grilled steak on toasted bread with caramelized onions, beetroot, lettuce, tomato, and BBQ sauce. A pub menu classic.', 'bbq', 'classic', 'National', 'beef', 'grilled', 25, 0, false, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['pub', 'hearty', 'lunch'], 82),

-- SEAFOOD (4)
('AU_BARRAMUNDI', 'grilled-barramundi', 'Grilled Barramundi', 'Australia''s most prized fish, pan-seared or grilled with crispy skin. Native to tropical waters, barramundi has delicate white flesh with a mild, buttery flavor.', 'seafood', 'iconic', 'Northern Territory', 'fish', 'grilled', 25, 0, false, false, true, false, ARRAY['fish', 'dairy'], ARRAY['premium', 'healthy', 'native'], 88),

('AU_FISH_AND_CHIPS', 'aussie-fish-and-chips', 'Aussie Fish and Chips', 'Beer-battered fish with golden chips, a seaside staple across Australia. Often made with local catches like flathead, whiting, or barramundi.', 'seafood', 'iconic', 'National', 'fish', 'fried', 30, 0, false, false, false, true, ARRAY['fish', 'gluten'], ARRAY['takeaway', 'beach', 'casual'], 90),

('AU_SYDNEY_ROCK_OYSTER', 'sydney-rock-oysters', 'Sydney Rock Oysters', 'Fresh oysters served raw on the half shell with lemon and mignonette sauce. Sydney rock oysters are smaller but intensely flavored, a true Australian delicacy.', 'seafood', 'classic', 'New South Wales', 'shellfish', 'raw', 10, 0, false, false, true, true, ARRAY['shellfish'], ARRAY['raw', 'premium', 'appetizer'], 78),

('AU_BBQ_PRAWNS', 'bbq-prawns', 'BBQ Prawns', 'Large king prawns butterflied and grilled with garlic butter. A Christmas and summer BBQ tradition, embodying the famous "throw another shrimp on the barbie" phrase.', 'seafood', 'classic', 'National', 'shellfish', 'grilled', 20, 0, false, false, true, false, ARRAY['shellfish', 'dairy'], ARRAY['bbq', 'christmas', 'summer'], 85),

-- PUB (3)
('AU_CHICKEN_PARMI', 'chicken-parmigiana', 'Chicken Parmigiana', 'The undisputed king of Aussie pub food: a crumbed chicken schnitzel topped with napolitana sauce and melted cheese, served with chips and salad.', 'pub', 'iconic', 'National', 'chicken', 'fried', 40, 0, false, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['pub', 'comfort_food', 'schnitzel'], 95),

('AU_AUSSIE_BURGER', 'aussie-burger-with-lot', 'Aussie Burger with "The Lot"', 'The fully loaded Australian burger with beef patty, bacon, egg, cheese, pineapple, beetroot, lettuce, tomato, onion, and sauces. A true tower of flavor.', 'pub', 'iconic', 'National', 'beef', 'grilled', 30, 0, false, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['burger', 'loaded', 'classic'], 90),

('AU_PUB_STEAK', 'pub-steak-diane', 'Steak Diane', 'A retro Australian pub classic: pan-fried steak served with a creamy mushroom sauce flambéed with brandy. Often served with chips and salad.', 'pub', 'classic', 'National', 'beef', 'pan_fried', 25, 0, false, false, true, false, ARRAY['dairy'], ARRAY['retro', 'pub', 'steak'], 75),

-- BUSH TUCKER (3)
('AU_KANGAROO_STEAK', 'kangaroo-steak', 'Kangaroo Steak', 'Lean, tender kangaroo fillet grilled to medium-rare perfection. A native protein high in iron and low in fat, with a rich, gamey flavor similar to venison.', 'bush_tucker', 'classic', 'National', 'kangaroo', 'grilled', 20, 0, false, false, true, true, ARRAY[]::TEXT[], ARRAY['native', 'lean', 'gamey', 'healthy'], 72),

('AU_EMU_FILLET', 'emu-fillet', 'Pan-Seared Emu Fillet', 'Tender emu meat seared and served rare to medium-rare. Similar to beef in texture but with a distinctive flavor, emu is a native Australian bird used in bush tucker cuisine.', 'bush_tucker', 'traditional', 'National', 'emu', 'pan_fried', 25, 0, false, false, true, false, ARRAY['dairy'], ARRAY['native', 'rare', 'bush_tucker'], 58),

('AU_KANGAROO_BURGER', 'kangaroo-burger', 'Kangaroo Burger', 'Ground kangaroo patty in a burger bun with native pepper leaf and bush tomato relish. A modern Australian take on the classic burger using native ingredients.', 'bush_tucker', 'classic', 'National', 'kangaroo', 'grilled', 25, 1, false, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['modern_australian', 'burger', 'native'], 68),

-- SNACKS (3)
('AU_VEGEMITE_TOAST', 'vegemite-on-toast', 'Vegemite on Toast', 'The quintessential Australian breakfast: buttered toast spread thinly with Vegemite, a thick, dark spread made from brewers yeast extract. An acquired taste loved by Aussies.', 'snack', 'iconic', 'National', NULL, 'toasted', 5, 0, true, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['breakfast', 'quick', 'iconic'], 92),

('AU_CHIKO_ROLL', 'chiko-roll', 'Chiko Roll', 'An Australian takeaway icon: a deep-fried roll filled with cabbage, barley, beef, celery, carrot, and onion. Created in 1951 as a mess-free alternative to Chinese spring rolls.', 'snack', 'classic', 'National', 'beef', 'fried', 10, 0, false, false, false, true, ARRAY['gluten'], ARRAY['takeaway', 'retro', 'street_food'], 68),

('AU_DIM_SIM', 'aussie-dim-sim', 'Aussie Dim Sim', 'An Australian-Chinese dumpling larger than traditional Chinese dim sum, filled with pork and cabbage. Served steamed or deep-fried from fish and chip shops.', 'snack', 'classic', 'National', 'pork', 'fried', 15, 0, false, false, false, true, ARRAY['gluten'], ARRAY['chinese_australian', 'takeaway', 'dumpling'], 72),

-- DESSERTS (4)
('AU_LAMINGTON', 'lamington', 'Lamington', 'Australia''s beloved sponge cake: a square of vanilla sponge dipped in chocolate and rolled in desiccated coconut. Often filled with cream or jam.', 'dessert', 'iconic', 'Queensland', NULL, 'baked', 60, 0, true, false, false, false, ARRAY['gluten', 'dairy', 'eggs'], ARRAY['national_cake', 'coconut', 'chocolate'], 95),

('AU_PAVLOVA', 'pavlova', 'Pavlova', 'A crisp meringue shell with a marshmallow-soft center, topped with whipped cream and fresh fruits. Named after Russian ballerina Anna Pavlova, claimed by both Australia and New Zealand.', 'dessert', 'iconic', 'National', NULL, 'baked', 90, 0, true, false, true, false, ARRAY['eggs', 'dairy'], ARRAY['meringue', 'christmas', 'celebration'], 92),

('AU_ANZAC_BISCUIT', 'anzac-biscuit', 'Anzac Biscuit', 'A golden oat and coconut biscuit with a rich history. Originally made by wives to send to soldiers in WWI, as the ingredients would not spoil during the long journey.', 'dessert', 'iconic', 'National', NULL, 'baked', 30, 0, true, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['heritage', 'anzac_day', 'cookie'], 88),

('AU_TIM_TAM_SLAM', 'tim-tam-slam', 'Tim Tam Slam', 'The iconic way to enjoy Tim Tams: bite off opposite corners and use the chocolate biscuit as a straw for hot milk or coffee. A beloved Australian ritual.', 'dessert', 'iconic', 'National', NULL, 'none', 5, 0, true, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['tim_tam', 'ritual', 'chocolate'], 85),

-- BREAD (2)
('AU_DAMPER', 'damper', 'Damper', 'Traditional Australian soda bread originally baked in the coals of a campfire by stockmen and swagmen. A simple, dense bread made with flour, water, and salt.', 'bread', 'traditional', 'Outback', NULL, 'baked', 45, 0, true, true, false, true, ARRAY['gluten'], ARRAY['bush_cooking', 'campfire', 'simple'], 72),

('AU_FAIRY_BREAD', 'fairy-bread', 'Fairy Bread', 'The simplest and most beloved party food in Australia: triangles of white bread spread with butter and covered in colorful hundreds and thousands (sprinkles). A children''s party staple.', 'bread', 'iconic', 'National', NULL, 'none', 5, 0, true, false, false, false, ARRAY['gluten', 'dairy'], ARRAY['party', 'kids', 'simple', 'colorful'], 88),

-- BEVERAGES (3)
('AU_FLAT_WHITE', 'flat-white', 'Flat White', 'Australia''s gift to coffee culture: a double shot of espresso with velvety microfoamed milk. Stronger than a latte, smaller than a cappuccino, with a distinctive flat top.', 'beverage', 'iconic', 'National', NULL, 'brewed', 5, 0, true, false, true, false, ARRAY['dairy'], ARRAY['coffee', 'cafe', 'morning'], 95),

('AU_LONG_BLACK', 'long-black', 'Long Black', 'An Australian coffee style: hot water topped with a double shot of espresso, preserving the crema. Stronger flavor than an Americano.', 'beverage', 'classic', 'National', NULL, 'brewed', 3, 0, true, true, true, true, ARRAY[]::TEXT[], ARRAY['coffee', 'black_coffee', 'strong'], 82),

('AU_ICED_COFFEE', 'aussie-iced-coffee', 'Aussie Iced Coffee', 'Unlike American iced coffee, the Australian version is a dessert drink: espresso with cold milk, ice cream, and whipped cream. A summer indulgence.', 'beverage', 'classic', 'National', NULL, 'brewed', 5, 0, true, false, true, false, ARRAY['dairy'], ARRAY['coffee', 'summer', 'sweet', 'dessert_drink'], 78);

-- Verification
SELECT category, COUNT(*) as count FROM australian GROUP BY category ORDER BY category;
SELECT COUNT(*) as total_dishes FROM australian;
