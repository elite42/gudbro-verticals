-- Hawaiian Cuisine - Product Ingredients Links
-- ~185 links for 29 dishes

-- Clear existing links
DELETE FROM product_ingredients WHERE product_type = 'hawaiian';

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, quantity_amount, quantity_unit, is_optional) VALUES

-- POKE
-- HI_AHI_POKE
('hawaiian', 'HI_AHI_POKE', 'ING_AHI_TUNA', 'main', 300, 'g', false),
('hawaiian', 'HI_AHI_POKE', 'ING_SOY_SAUCE', 'seasoning', 45, 'ml', false),
('hawaiian', 'HI_AHI_POKE', 'ING_SESAME_OIL', 'seasoning', 15, 'ml', false),
('hawaiian', 'HI_AHI_POKE', 'ING_LIMU', 'secondary', 30, 'g', false),
('hawaiian', 'HI_AHI_POKE', 'ING_SCALLION', 'garnish', 20, 'g', false),
('hawaiian', 'HI_AHI_POKE', 'ING_SESAME_SEEDS', 'garnish', 10, 'g', false),

-- HI_SPICY_AHI_POKE
('hawaiian', 'HI_SPICY_AHI_POKE', 'ING_AHI_TUNA', 'main', 300, 'g', false),
('hawaiian', 'HI_SPICY_AHI_POKE', 'ING_MAYONNAISE', 'seasoning', 45, 'g', false),
('hawaiian', 'HI_SPICY_AHI_POKE', 'ING_SRIRACHA', 'seasoning', 15, 'ml', false),
('hawaiian', 'HI_SPICY_AHI_POKE', 'ING_SOY_SAUCE', 'seasoning', 30, 'ml', false),
('hawaiian', 'HI_SPICY_AHI_POKE', 'ING_SESAME_OIL', 'seasoning', 10, 'ml', false),
('hawaiian', 'HI_SPICY_AHI_POKE', 'ING_SCALLION', 'garnish', 20, 'g', false),

-- HI_SALMON_POKE
('hawaiian', 'HI_SALMON_POKE', 'ING_SALMON', 'main', 300, 'g', false),
('hawaiian', 'HI_SALMON_POKE', 'ING_SOY_SAUCE', 'seasoning', 45, 'ml', false),
('hawaiian', 'HI_SALMON_POKE', 'ING_SESAME_OIL', 'seasoning', 15, 'ml', false),
('hawaiian', 'HI_SALMON_POKE', 'ING_AVOCADO', 'secondary', 100, 'g', true),
('hawaiian', 'HI_SALMON_POKE', 'ING_SCALLION', 'garnish', 20, 'g', false),
('hawaiian', 'HI_SALMON_POKE', 'ING_SESAME_SEEDS', 'garnish', 10, 'g', false),

-- HI_POKE_BOWL
('hawaiian', 'HI_POKE_BOWL', 'ING_AHI_TUNA', 'main', 200, 'g', false),
('hawaiian', 'HI_POKE_BOWL', 'ING_RICE', 'main', 200, 'g', false),
('hawaiian', 'HI_POKE_BOWL', 'ING_EDAMAME', 'secondary', 50, 'g', false),
('hawaiian', 'HI_POKE_BOWL', 'ING_CUCUMBER', 'secondary', 50, 'g', false),
('hawaiian', 'HI_POKE_BOWL', 'ING_AVOCADO', 'secondary', 80, 'g', false),
('hawaiian', 'HI_POKE_BOWL', 'ING_SOY_SAUCE', 'seasoning', 30, 'ml', false),
('hawaiian', 'HI_POKE_BOWL', 'ING_SESAME_OIL', 'seasoning', 10, 'ml', false),
('hawaiian', 'HI_POKE_BOWL', 'ING_SESAME_SEEDS', 'garnish', 10, 'g', false),

-- PLATE LUNCH
-- HI_LOCO_MOCO
('hawaiian', 'HI_LOCO_MOCO', 'ING_GROUND_BEEF', 'main', 200, 'g', false),
('hawaiian', 'HI_LOCO_MOCO', 'ING_RICE', 'main', 250, 'g', false),
('hawaiian', 'HI_LOCO_MOCO', 'ING_EGG', 'main', 2, 'unit', false),
('hawaiian', 'HI_LOCO_MOCO', 'ING_BEEF_STOCK', 'secondary', 250, 'ml', false),
('hawaiian', 'HI_LOCO_MOCO', 'ING_FLOUR', 'secondary', 30, 'g', false),
('hawaiian', 'HI_LOCO_MOCO', 'ING_BUTTER', 'secondary', 30, 'g', false),
('hawaiian', 'HI_LOCO_MOCO', 'ING_ONION', 'secondary', 50, 'g', false),

-- HI_CHICKEN_KATSU
('hawaiian', 'HI_CHICKEN_KATSU', 'ING_CHICKEN_BREAST', 'main', 250, 'g', false),
('hawaiian', 'HI_CHICKEN_KATSU', 'ING_PANKO', 'secondary', 100, 'g', false),
('hawaiian', 'HI_CHICKEN_KATSU', 'ING_FLOUR', 'secondary', 50, 'g', false),
('hawaiian', 'HI_CHICKEN_KATSU', 'ING_EGG', 'secondary', 2, 'unit', false),
('hawaiian', 'HI_CHICKEN_KATSU', 'ING_RICE', 'secondary', 200, 'g', false),
('hawaiian', 'HI_CHICKEN_KATSU', 'ING_MACARONI', 'secondary', 100, 'g', false),
('hawaiian', 'HI_CHICKEN_KATSU', 'ING_MAYONNAISE', 'seasoning', 60, 'g', false),
('hawaiian', 'HI_CHICKEN_KATSU', 'ING_TONKATSU_SAUCE', 'garnish', 30, 'ml', false),

-- HI_KALBI_PLATE
('hawaiian', 'HI_KALBI_PLATE', 'ING_BEEF_SHORT_RIBS', 'main', 300, 'g', false),
('hawaiian', 'HI_KALBI_PLATE', 'ING_SOY_SAUCE', 'seasoning', 60, 'ml', false),
('hawaiian', 'HI_KALBI_PLATE', 'ING_BROWN_SUGAR', 'seasoning', 45, 'g', false),
('hawaiian', 'HI_KALBI_PLATE', 'ING_SESAME_OIL', 'seasoning', 15, 'ml', false),
('hawaiian', 'HI_KALBI_PLATE', 'ING_GARLIC', 'seasoning', 15, 'g', false),
('hawaiian', 'HI_KALBI_PLATE', 'ING_RICE', 'secondary', 200, 'g', false),
('hawaiian', 'HI_KALBI_PLATE', 'ING_MACARONI', 'secondary', 100, 'g', false),

-- HI_TERIYAKI_BEEF
('hawaiian', 'HI_TERIYAKI_BEEF', 'ING_BEEF_SIRLOIN', 'main', 250, 'g', false),
('hawaiian', 'HI_TERIYAKI_BEEF', 'ING_TERIYAKI_SAUCE', 'seasoning', 60, 'ml', false),
('hawaiian', 'HI_TERIYAKI_BEEF', 'ING_RICE', 'secondary', 200, 'g', false),
('hawaiian', 'HI_TERIYAKI_BEEF', 'ING_MACARONI', 'secondary', 100, 'g', false),
('hawaiian', 'HI_TERIYAKI_BEEF', 'ING_MAYONNAISE', 'seasoning', 45, 'g', false),

-- HI_MAHIMAHI_PLATE
('hawaiian', 'HI_MAHIMAHI_PLATE', 'ING_MAHI_MAHI', 'main', 250, 'g', false),
('hawaiian', 'HI_MAHIMAHI_PLATE', 'ING_FLOUR', 'secondary', 100, 'g', false),
('hawaiian', 'HI_MAHIMAHI_PLATE', 'ING_EGG', 'secondary', 1, 'unit', false),
('hawaiian', 'HI_MAHIMAHI_PLATE', 'ING_RICE', 'secondary', 200, 'g', false),
('hawaiian', 'HI_MAHIMAHI_PLATE', 'ING_MACARONI', 'secondary', 100, 'g', false),
('hawaiian', 'HI_MAHIMAHI_PLATE', 'ING_MAYONNAISE', 'seasoning', 45, 'g', false),
('hawaiian', 'HI_MAHIMAHI_PLATE', 'ING_TARTAR_SAUCE', 'garnish', 30, 'ml', true),

-- LUAU
-- HI_KALUA_PIG
('hawaiian', 'HI_KALUA_PIG', 'ING_PORK', 'main', 2000, 'g', false),
('hawaiian', 'HI_KALUA_PIG', 'ING_SEA_SALT', 'seasoning', 30, 'g', false),
('hawaiian', 'HI_KALUA_PIG', 'ING_BANANA_LEAF', 'secondary', 200, 'g', false),

-- HI_LAULAU
('hawaiian', 'HI_LAULAU', 'ING_PORK', 'main', 400, 'g', false),
('hawaiian', 'HI_LAULAU', 'ING_BUTTERFISH', 'main', 150, 'g', false),
('hawaiian', 'HI_LAULAU', 'ING_TARO_LEAF', 'main', 200, 'g', false),
('hawaiian', 'HI_LAULAU', 'ING_TI_LEAF', 'secondary', 100, 'g', false),
('hawaiian', 'HI_LAULAU', 'ING_SEA_SALT', 'seasoning', 10, 'g', false),

-- HI_POI
('hawaiian', 'HI_POI', 'ING_TARO', 'main', 500, 'g', false),
('hawaiian', 'HI_POI', 'ING_WATER', 'secondary', 250, 'ml', false),

-- HI_CHICKEN_LONG_RICE
('hawaiian', 'HI_CHICKEN_LONG_RICE', 'ING_CHICKEN_THIGH', 'main', 400, 'g', false),
('hawaiian', 'HI_CHICKEN_LONG_RICE', 'ING_GLASS_NOODLES', 'main', 150, 'g', false),
('hawaiian', 'HI_CHICKEN_LONG_RICE', 'ING_GINGER', 'seasoning', 30, 'g', false),
('hawaiian', 'HI_CHICKEN_LONG_RICE', 'ING_GARLIC', 'seasoning', 15, 'g', false),
('hawaiian', 'HI_CHICKEN_LONG_RICE', 'ING_CHICKEN_BROTH', 'secondary', 500, 'ml', false),
('hawaiian', 'HI_CHICKEN_LONG_RICE', 'ING_SCALLION', 'garnish', 30, 'g', false),

-- HI_SQUID_LUAU
('hawaiian', 'HI_SQUID_LUAU', 'ING_SQUID', 'main', 350, 'g', false),
('hawaiian', 'HI_SQUID_LUAU', 'ING_TARO_LEAF', 'main', 300, 'g', false),
('hawaiian', 'HI_SQUID_LUAU', 'ING_COCONUT_MILK', 'secondary', 400, 'ml', false),
('hawaiian', 'HI_SQUID_LUAU', 'ING_ONION', 'secondary', 100, 'g', false),
('hawaiian', 'HI_SQUID_LUAU', 'ING_SEA_SALT', 'seasoning', 10, 'g', false),

-- SNACKS
-- HI_SPAM_MUSUBI
('hawaiian', 'HI_SPAM_MUSUBI', 'ING_SPAM', 'main', 100, 'g', false),
('hawaiian', 'HI_SPAM_MUSUBI', 'ING_RICE', 'main', 150, 'g', false),
('hawaiian', 'HI_SPAM_MUSUBI', 'ING_NORI', 'secondary', 20, 'g', false),
('hawaiian', 'HI_SPAM_MUSUBI', 'ING_SOY_SAUCE', 'seasoning', 15, 'ml', true),
('hawaiian', 'HI_SPAM_MUSUBI', 'ING_SUGAR', 'seasoning', 10, 'g', true),

-- HI_MANAPUA
('hawaiian', 'HI_MANAPUA', 'ING_PORK', 'main', 150, 'g', false),
('hawaiian', 'HI_MANAPUA', 'ING_FLOUR', 'secondary', 200, 'g', false),
('hawaiian', 'HI_MANAPUA', 'ING_YEAST', 'secondary', 7, 'g', false),
('hawaiian', 'HI_MANAPUA', 'ING_CHAR_SIU_SAUCE', 'seasoning', 60, 'ml', false),
('hawaiian', 'HI_MANAPUA', 'ING_SOY_SAUCE', 'seasoning', 30, 'ml', false),
('hawaiian', 'HI_MANAPUA', 'ING_SUGAR', 'seasoning', 30, 'g', false),

-- HI_MALASADA
('hawaiian', 'HI_MALASADA', 'ING_FLOUR', 'main', 300, 'g', false),
('hawaiian', 'HI_MALASADA', 'ING_SUGAR', 'secondary', 100, 'g', false),
('hawaiian', 'HI_MALASADA', 'ING_EGG', 'secondary', 3, 'unit', false),
('hawaiian', 'HI_MALASADA', 'ING_BUTTER', 'secondary', 60, 'g', false),
('hawaiian', 'HI_MALASADA', 'ING_MILK', 'secondary', 200, 'ml', false),
('hawaiian', 'HI_MALASADA', 'ING_YEAST', 'secondary', 7, 'g', false),
('hawaiian', 'HI_MALASADA', 'ING_VEGETABLE_OIL', 'secondary', 500, 'ml', false),

-- HI_HURRICANE_POPCORN
('hawaiian', 'HI_HURRICANE_POPCORN', 'ING_POPCORN', 'main', 150, 'g', false),
('hawaiian', 'HI_HURRICANE_POPCORN', 'ING_BUTTER', 'secondary', 60, 'g', false),
('hawaiian', 'HI_HURRICANE_POPCORN', 'ING_ARARE', 'secondary', 50, 'g', false),
('hawaiian', 'HI_HURRICANE_POPCORN', 'ING_FURIKAKE', 'seasoning', 20, 'g', false),
('hawaiian', 'HI_HURRICANE_POPCORN', 'ING_NORI', 'garnish', 10, 'g', true),

-- NOODLES
-- HI_SAIMIN
('hawaiian', 'HI_SAIMIN', 'ING_EGG_NOODLES', 'main', 200, 'g', false),
('hawaiian', 'HI_SAIMIN', 'ING_DASHI', 'secondary', 500, 'ml', false),
('hawaiian', 'HI_SAIMIN', 'ING_CHAR_SIU', 'secondary', 80, 'g', false),
('hawaiian', 'HI_SAIMIN', 'ING_KAMABOKO', 'secondary', 50, 'g', false),
('hawaiian', 'HI_SAIMIN', 'ING_EGG', 'secondary', 1, 'unit', true),
('hawaiian', 'HI_SAIMIN', 'ING_SCALLION', 'garnish', 30, 'g', false),
('hawaiian', 'HI_SAIMIN', 'ING_NORI', 'garnish', 5, 'g', true),

-- HI_FRIED_SAIMIN
('hawaiian', 'HI_FRIED_SAIMIN', 'ING_EGG_NOODLES', 'main', 200, 'g', false),
('hawaiian', 'HI_FRIED_SAIMIN', 'ING_CHAR_SIU', 'secondary', 80, 'g', false),
('hawaiian', 'HI_FRIED_SAIMIN', 'ING_EGG', 'secondary', 2, 'unit', false),
('hawaiian', 'HI_FRIED_SAIMIN', 'ING_CABBAGE', 'secondary', 100, 'g', false),
('hawaiian', 'HI_FRIED_SAIMIN', 'ING_SCALLION', 'secondary', 30, 'g', false),
('hawaiian', 'HI_FRIED_SAIMIN', 'ING_OYSTER_SAUCE', 'seasoning', 30, 'ml', false),
('hawaiian', 'HI_FRIED_SAIMIN', 'ING_SOY_SAUCE', 'seasoning', 15, 'ml', false),

-- GRILL
-- HI_HULI_HULI_CHICKEN
('hawaiian', 'HI_HULI_HULI_CHICKEN', 'ING_WHOLE_CHICKEN', 'main', 1500, 'g', false),
('hawaiian', 'HI_HULI_HULI_CHICKEN', 'ING_SOY_SAUCE', 'seasoning', 120, 'ml', false),
('hawaiian', 'HI_HULI_HULI_CHICKEN', 'ING_BROWN_SUGAR', 'seasoning', 100, 'g', false),
('hawaiian', 'HI_HULI_HULI_CHICKEN', 'ING_KETCHUP', 'seasoning', 60, 'ml', false),
('hawaiian', 'HI_HULI_HULI_CHICKEN', 'ING_GINGER', 'seasoning', 20, 'g', false),
('hawaiian', 'HI_HULI_HULI_CHICKEN', 'ING_GARLIC', 'seasoning', 15, 'g', false),
('hawaiian', 'HI_HULI_HULI_CHICKEN', 'ING_PINEAPPLE_JUICE', 'seasoning', 60, 'ml', true),

-- HI_PORTUGUESE_SAUSAGE
('hawaiian', 'HI_PORTUGUESE_SAUSAGE', 'ING_PORTUGUESE_SAUSAGE', 'main', 200, 'g', false),
('hawaiian', 'HI_PORTUGUESE_SAUSAGE', 'ING_RICE', 'secondary', 200, 'g', false),
('hawaiian', 'HI_PORTUGUESE_SAUSAGE', 'ING_EGG', 'secondary', 2, 'unit', false),

-- HI_SHOYU_CHICKEN
('hawaiian', 'HI_SHOYU_CHICKEN', 'ING_CHICKEN_THIGH', 'main', 500, 'g', false),
('hawaiian', 'HI_SHOYU_CHICKEN', 'ING_SOY_SAUCE', 'seasoning', 120, 'ml', false),
('hawaiian', 'HI_SHOYU_CHICKEN', 'ING_BROWN_SUGAR', 'seasoning', 60, 'g', false),
('hawaiian', 'HI_SHOYU_CHICKEN', 'ING_GINGER', 'seasoning', 30, 'g', false),
('hawaiian', 'HI_SHOYU_CHICKEN', 'ING_GARLIC', 'seasoning', 15, 'g', false),
('hawaiian', 'HI_SHOYU_CHICKEN', 'ING_SCALLION', 'garnish', 20, 'g', false),

-- DESSERTS
-- HI_HAUPIA
('hawaiian', 'HI_HAUPIA', 'ING_COCONUT_MILK', 'main', 400, 'ml', false),
('hawaiian', 'HI_HAUPIA', 'ING_SUGAR', 'secondary', 60, 'g', false),
('hawaiian', 'HI_HAUPIA', 'ING_CORNSTARCH', 'secondary', 45, 'g', false),
('hawaiian', 'HI_HAUPIA', 'ING_WATER', 'secondary', 100, 'ml', false),

-- HI_SHAVE_ICE
('hawaiian', 'HI_SHAVE_ICE', 'ING_ICE', 'main', 300, 'g', false),
('hawaiian', 'HI_SHAVE_ICE', 'ING_SIMPLE_SYRUP', 'secondary', 60, 'ml', false),
('hawaiian', 'HI_SHAVE_ICE', 'ING_CONDENSED_MILK', 'garnish', 30, 'ml', true),
('hawaiian', 'HI_SHAVE_ICE', 'ING_AZUKI_BEAN', 'secondary', 50, 'g', true),
('hawaiian', 'HI_SHAVE_ICE', 'ING_VANILLA_ICE_CREAM', 'secondary', 60, 'g', true),

-- HI_BUTTER_MOCHI
('hawaiian', 'HI_BUTTER_MOCHI', 'ING_MOCHIKO', 'main', 250, 'g', false),
('hawaiian', 'HI_BUTTER_MOCHI', 'ING_COCONUT_MILK', 'secondary', 400, 'ml', false),
('hawaiian', 'HI_BUTTER_MOCHI', 'ING_BUTTER', 'secondary', 115, 'g', false),
('hawaiian', 'HI_BUTTER_MOCHI', 'ING_SUGAR', 'secondary', 300, 'g', false),
('hawaiian', 'HI_BUTTER_MOCHI', 'ING_EGG', 'secondary', 3, 'unit', false),
('hawaiian', 'HI_BUTTER_MOCHI', 'ING_VANILLA_EXTRACT', 'seasoning', 5, 'ml', false),

-- HI_LILIKOI_PIE
('hawaiian', 'HI_LILIKOI_PIE', 'ING_PASSION_FRUIT', 'main', 200, 'g', false),
('hawaiian', 'HI_LILIKOI_PIE', 'ING_GRAHAM_CRACKER', 'secondary', 150, 'g', false),
('hawaiian', 'HI_LILIKOI_PIE', 'ING_BUTTER', 'secondary', 60, 'g', false),
('hawaiian', 'HI_LILIKOI_PIE', 'ING_HEAVY_CREAM', 'secondary', 200, 'ml', false),
('hawaiian', 'HI_LILIKOI_PIE', 'ING_SUGAR', 'secondary', 150, 'g', false),
('hawaiian', 'HI_LILIKOI_PIE', 'ING_EGG', 'secondary', 3, 'unit', false),
('hawaiian', 'HI_LILIKOI_PIE', 'ING_GELATIN', 'secondary', 7, 'g', false),

-- BEVERAGES
-- HI_POG
('hawaiian', 'HI_POG', 'ING_PASSION_FRUIT', 'main', 100, 'g', false),
('hawaiian', 'HI_POG', 'ING_ORANGE_JUICE', 'main', 150, 'ml', false),
('hawaiian', 'HI_POG', 'ING_GUAVA', 'main', 100, 'g', false),

-- HI_LILIKOIADE
('hawaiian', 'HI_LILIKOIADE', 'ING_PASSION_FRUIT', 'main', 150, 'g', false),
('hawaiian', 'HI_LILIKOIADE', 'ING_LEMON_JUICE', 'secondary', 60, 'ml', false),
('hawaiian', 'HI_LILIKOIADE', 'ING_WATER', 'secondary', 300, 'ml', false),
('hawaiian', 'HI_LILIKOIADE', 'ING_SUGAR', 'secondary', 60, 'g', false);

-- Verification
SELECT COUNT(*) as total_links FROM product_ingredients WHERE product_type = 'hawaiian';
SELECT product_id, COUNT(*) as ingredient_count FROM product_ingredients WHERE product_type = 'hawaiian' GROUP BY product_id ORDER BY product_id;
