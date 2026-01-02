-- =============================================
-- STEAKHOUSE APPETIZERS - Meat-focused Classics
-- Only meat-based starters (no seafood)
-- =============================================

INSERT INTO appetizers (id, slug, name, description, style, status, category, serving_temp, main_ingredients, is_fried, is_baked, is_raw, spice_level, origin, serving, dietary, preparation, tags, popularity) VALUES

-- STEAK TARTARE
('steakhouse-steak-tartare', 'steak-tartare',
 '{"en": "Steak Tartare", "it": "Tartare di Manzo", "vi": "Thịt Bò Sống Tartare"}'::jsonb,
 '{"en": "Hand-chopped prime beef with capers, cornichons, shallots and egg yolk", "it": "Manzo prime tritato a mano con capperi, cetriolini, scalogno e tuorlo", "vi": "Thịt bò xay tay với câu bẹ, dưa chuột, hành tím và lòng đỏ trứng"}'::jsonb,
 'french', 'classic', 'tartare', 'cold',
 ARRAY['beef_tenderloin', 'capers', 'cornichon', 'shallot', 'egg_yolk', 'dijon_mustard'],
 false, false, true, 1,
 '{"country": "France", "country_code": "FR", "region": "National"}'::jsonb,
 '{"is_shareable": true, "portion_size": "medium", "pieces_per_serving": 1, "recommended_pairing": ["red_wine", "burgundy"]}'::jsonb,
 '{"calories_estimate": 250, "protein_g": 22, "carbs_g": 4, "fat_g": 16, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_vegetarian": false, "is_vegan": false, "is_halal": true, "is_kosher": false, "allergens": ["eggs"]}'::jsonb,
 '{"prep_time_min": 20, "cook_time_min": 0, "difficulty": "medium"}'::jsonb,
 ARRAY['steakhouse', 'french', 'raw', 'beef', 'classic', 'elegant'],
 85),

-- ROASTED BONE MARROW
('steakhouse-bone-marrow', 'roasted-bone-marrow',
 '{"en": "Roasted Bone Marrow", "it": "Midollo Arrosto", "vi": "Tủy Xương Nướng"}'::jsonb,
 '{"en": "Roasted beef marrow bones with parsley salad and grilled toast", "it": "Ossa di midollo arrosto con insalata di prezzemolo e toast grigliato", "vi": "Xương tủy bò nướng với salad mùi tây và bánh mì nướng"}'::jsonb,
 'french', 'classic', 'other', 'hot',
 ARRAY['bone_marrow', 'parsley', 'shallot', 'capers', 'toast'],
 false, true, false, 0,
 '{"country": "UK", "country_code": "GB", "region": "London"}'::jsonb,
 '{"is_shareable": true, "portion_size": "medium", "pieces_per_serving": 2, "recommended_pairing": ["red_wine", "cabernet"]}'::jsonb,
 '{"calories_estimate": 350, "protein_g": 8, "carbs_g": 12, "fat_g": 32, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_vegetarian": false, "is_vegan": false, "is_halal": true, "is_kosher": false, "allergens": ["gluten"]}'::jsonb,
 '{"prep_time_min": 10, "cook_time_min": 20, "difficulty": "easy"}'::jsonb,
 ARRAY['steakhouse', 'nose_to_tail', 'roasted', 'luxury', 'bone_marrow'],
 80),

-- FRENCH ONION SOUP
('steakhouse-french-onion-soup', 'french-onion-soup',
 '{"en": "French Onion Soup", "it": "Zuppa di Cipolle alla Francese", "vi": "Súp Hành Tây Pháp"}'::jsonb,
 '{"en": "Caramelized onion soup with beef broth, topped with crusty bread and melted gruyère", "it": "Zuppa di cipolle caramellate con brodo di manzo, crostino e gruyère fuso", "vi": "Súp hành tây caramel với nước dùng bò, bánh mì và phô mai nướng"}'::jsonb,
 'french', 'classic', 'other', 'hot',
 ARRAY['onion', 'beef_broth', 'gruyere', 'baguette', 'thyme'],
 false, true, false, 0,
 '{"country": "France", "country_code": "FR", "region": "National"}'::jsonb,
 '{"is_shareable": false, "portion_size": "medium", "pieces_per_serving": 1, "recommended_pairing": ["red_wine", "beaujolais"]}'::jsonb,
 '{"calories_estimate": 350, "protein_g": 14, "carbs_g": 32, "fat_g": 18, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_vegetarian": false, "is_vegan": false, "is_halal": true, "is_kosher": false, "allergens": ["gluten", "dairy"]}'::jsonb,
 '{"prep_time_min": 30, "cook_time_min": 60, "difficulty": "medium"}'::jsonb,
 ARRAY['steakhouse', 'french', 'soup', 'comfort', 'cheesy', 'classic'],
 88)

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- Summary: 3 steakhouse appetizers (meat-focused)
-- - Steak Tartare (raw beef classic)
-- - Roasted Bone Marrow (nose-to-tail)
-- - French Onion Soup (beef broth based)
-- =============================================
