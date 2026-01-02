-- ============================================
-- JAPANESE DATABASE - Missing Ingredients
-- 51 new ingredients for Japanese cuisine
-- Uses JSONB for allergens column
-- ============================================

-- Japanese Tofu Products
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_ATSUAGE', 'atsuage', 'Atsuage', 'Deep-fried tofu with firm exterior and soft interior', 'proteins', '["soy"]'::jsonb),
('ING_SILKEN_TOFU', 'silken-tofu', 'Silken Tofu', 'Smooth, delicate tofu with high water content', 'proteins', '["soy"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Fish Cake Products
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_CHIKUWA', 'chikuwa', 'Chikuwa', 'Tube-shaped grilled fish cake', 'proteins', '["fish", "gluten"]'::jsonb),
('ING_HANPEN', 'hanpen', 'Hanpen', 'Soft white fish cake made from fish paste', 'proteins', '["fish", "gluten"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Noodles
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_HAKATA_NOODLES', 'hakata-noodles', 'Hakata Noodles', 'Very thin straight noodles for Hakata ramen', 'grains', '["gluten"]'::jsonb),
('ING_SANUKI_UDON', 'sanuki-udon', 'Sanuki Udon', 'Firm, chewy udon noodles from Kagawa', 'grains', '["gluten"]'::jsonb),
('ING_SOMEN_NOODLES', 'somen-noodles', 'Somen Noodles', 'Very thin white wheat noodles for summer', 'grains', '["gluten"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Proteins
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_CHICKEN_MEATBALL', 'chicken-meatball', 'Chicken Meatball', 'Japanese-style chicken meatballs (tsukune)', 'proteins', '[]'::jsonb),
('ING_CHICKEN_SKIN', 'chicken-skin', 'Chicken Skin', 'Crispy grilled chicken skin for yakitori', 'proteins', '[]'::jsonb),
('ING_GROUND_CHICKEN', 'ground-chicken', 'Ground Chicken', 'Minced chicken meat', 'proteins', '[]'::jsonb),
('ING_TONKATSU', 'tonkatsu', 'Tonkatsu', 'Breaded deep-fried pork cutlet', 'proteins', '["gluten", "eggs"]'::jsonb),
('ING_PORK_TENDERLOIN', 'pork-tenderloin', 'Pork Tenderloin', 'Lean cut of pork from the loin', 'proteins', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Sashimi & Seafood
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_TUNA_SASHIMI', 'tuna-sashimi', 'Tuna Sashimi', 'Fresh raw tuna slices for sashimi', 'proteins', '["fish"]'::jsonb),
('ING_SALMON_SASHIMI', 'salmon-sashimi', 'Salmon Sashimi', 'Fresh raw salmon slices for sashimi', 'proteins', '["fish"]'::jsonb),
('ING_IKURA', 'ikura', 'Ikura', 'Salmon roe, marinated in soy sauce', 'proteins', '["fish"]'::jsonb),
('ING_UNI', 'uni', 'Uni', 'Sea urchin roe, creamy delicacy', 'proteins', '["shellfish"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Vegetables
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_CHINESE_CABBAGE', 'chinese-cabbage', 'Chinese Cabbage', 'Napa cabbage, mild and tender leafy vegetable', 'vegetables', '[]'::jsonb),
('ING_ENOKI', 'enoki', 'Enoki Mushrooms', 'Long thin white mushrooms with small caps', 'vegetables', '[]'::jsonb),
('ING_SHIITAKE', 'shiitake', 'Shiitake Mushrooms', 'Meaty, flavorful Japanese mushrooms', 'vegetables', '[]'::jsonb),
('ING_KIKURAGE', 'kikurage', 'Kikurage', 'Wood ear mushrooms, crunchy black fungus', 'vegetables', '[]'::jsonb),
('ING_RENKON', 'renkon', 'Renkon', 'Lotus root, crunchy with decorative holes', 'vegetables', '[]'::jsonb),
('ING_SHIRATAKI', 'shirataki', 'Shirataki Noodles', 'Konjac noodles, low calorie and translucent', 'vegetables', '[]'::jsonb),
('ING_KONNYAKU', 'konnyaku', 'Konnyaku', 'Konjac yam cake, chewy and calorie-free', 'vegetables', '[]'::jsonb),
('ING_MYOGA', 'myoga', 'Myoga', 'Japanese ginger bud, aromatic garnish', 'vegetables', '[]'::jsonb),
('ING_MITSUBA', 'mitsuba', 'Mitsuba', 'Japanese wild parsley, delicate herb', 'vegetables', '[]'::jsonb),
('ING_YAMAIMO', 'yamaimo', 'Yamaimo', 'Japanese mountain yam, sticky when grated', 'vegetables', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Rice
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_JAPANESE_RICE', 'japanese-rice', 'Japanese Rice', 'Short-grain japonica rice, sticky when cooked', 'grains', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Sauces & Condiments
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_TARE_SAUCE', 'tare-sauce', 'Tare Sauce', 'Sweet soy-based glaze for yakitori', 'condiments', '["soy", "gluten"]'::jsonb),
('ING_TSUYU', 'tsuyu', 'Tsuyu', 'Concentrated dashi-soy dipping sauce', 'condiments', '["soy", "fish", "gluten"]'::jsonb),
('ING_TENTSUYU', 'tentsuyu', 'Tentsuyu', 'Light dipping sauce for tempura', 'condiments', '["soy", "fish", "gluten"]'::jsonb),
('ING_WARISHITA', 'warishita', 'Warishita', 'Sweet soy sauce broth for sukiyaki', 'condiments', '["soy", "gluten"]'::jsonb),
('ING_DEMI_GLACE', 'demi-glace', 'Demi-Glace', 'Rich brown sauce base for yoshoku', 'condiments', '["gluten"]'::jsonb),
('ING_JAPANESE_CURRY', 'japanese-curry', 'Japanese Curry', 'Japanese curry roux, mild and sweet', 'condiments', '["gluten"]'::jsonb),
('ING_TAKOYAKI_SAUCE', 'takoyaki-sauce', 'Takoyaki Sauce', 'Sweet and savory sauce for takoyaki', 'condiments', '["soy"]'::jsonb),
('ING_OKONOMIYAKI_SAUCE', 'okonomiyaki-sauce', 'Okonomiyaki Sauce', 'Thick sweet sauce for okonomiyaki', 'condiments', '["soy"]'::jsonb),
('ING_WORCESTERSHIRE_SAUCE', 'worcestershire-sauce', 'Worcestershire Sauce', 'Fermented sauce with tamarind and spices', 'condiments', '["fish"]'::jsonb),
('ING_SESAME_SAUCE', 'sesame-sauce', 'Sesame Sauce', 'Creamy sesame dipping sauce for shabu shabu', 'condiments', '["sesame"]'::jsonb),
('ING_RAYU', 'rayu', 'Rayu', 'Japanese chili oil with sesame', 'condiments', '["sesame"]'::jsonb),
('ING_KARASHI', 'karashi', 'Karashi', 'Japanese hot mustard, very pungent', 'condiments', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Spices & Seasonings
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_SHICHIMI', 'shichimi', 'Shichimi Togarashi', 'Seven-spice chili blend', 'spices', '["sesame"]'::jsonb),
('ING_MATCHA_SALT', 'matcha-salt', 'Matcha Salt', 'Green tea flavored salt for tempura', 'spices', '[]'::jsonb),
('ING_SZECHUAN_PEPPERCORN', 'szechuan-peppercorn', 'Szechuan Peppercorn', 'Numbing spice used in tantanmen', 'spices', '[]'::jsonb),
('ING_GRATED_GINGER', 'grated-ginger', 'Grated Ginger', 'Freshly grated ginger root', 'spices', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Pickles & Garnishes
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_FUKUJINZUKE', 'fukujinzuke', 'Fukujinzuke', 'Sweet red pickled vegetables for curry', 'condiments', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Batters
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_TAKOYAKI_BATTER', 'takoyaki-batter', 'Takoyaki Batter', 'Light batter for octopus balls', 'grains', '["gluten", "eggs"]'::jsonb),
('ING_OKONOMIYAKI_BATTER', 'okonomiyaki-batter', 'Okonomiyaki Batter', 'Savory pancake batter with nagaimo', 'grains', '["gluten", "eggs"]'::jsonb),
('ING_MONJA_BATTER', 'monja-batter', 'Monja Batter', 'Runny batter for monjayaki', 'grains', '["gluten", "eggs"]'::jsonb),
('ING_TENKASU', 'tenkasu', 'Tenkasu', 'Crunchy tempura batter bits', 'grains', '["gluten"]'::jsonb),
('ING_TEMPURA_BITS', 'tempura-bits', 'Tempura Bits', 'Fried tempura batter crumbs', 'grains', '["gluten"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Japanese Tempura Items
INSERT INTO ingredients (id, slug, name, description, category, allergens) VALUES
('ING_KAKIAGE', 'kakiage', 'Kakiage', 'Mixed vegetable and shrimp tempura fritter', 'proteins', '["gluten", "shellfish"]'::jsonb),
('ING_EGGPLANT_TEMPURA', 'eggplant-tempura', 'Eggplant Tempura', 'Deep-fried eggplant in tempura batter', 'vegetables', '["gluten"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Update counts
SELECT 'New ingredients added for Japanese database' AS status, COUNT(*) AS total
FROM ingredients WHERE id LIKE 'ING_%';
