-- Nigerian Cuisine - New Ingredients
-- GUDBRO Database
-- Date: 2025-12-26
-- New ingredients: 33 (28 Nigerian-specific + 5 base ingredients)

-- Base ingredients missing from database
INSERT INTO ingredients (id, name, slug, category, description) VALUES
('ING_PALM_OIL', 'Palm Oil', 'palm-oil', 'fats', 'Red palm oil, essential in West African cooking for its distinctive color and flavor'),
('ING_CRAYFISH', 'Crayfish', 'crayfish', 'seafood', 'Dried ground crayfish, key seasoning in Nigerian soups and stews'),
('ING_DRIED_FISH', 'Dried Fish', 'dried-fish', 'seafood', 'Sun-dried fish used as protein and flavoring in African cuisine'),
('ING_POTASH', 'Potash (Kaun)', 'potash', 'other', 'Food-grade potash used as a tenderizer and to enhance texture in Nigerian cooking'),
('ING_LIVER', 'Liver', 'liver', 'proteins', 'Organ meat commonly used in Nigerian fried rice and other dishes')
ON CONFLICT (id) DO NOTHING;

-- Nigerian-specific ingredients for traditional dishes
INSERT INTO ingredients (id, name, slug, category, description) VALUES
-- Leaves and Vegetables
('ING_AFANG_LEAF', 'Afang Leaf', 'afang-leaf', 'vegetables', 'Wild spinach-like leaf used in Efik and Ibibio cuisine, key ingredient in afang soup'),
('ING_WATERLEAF', 'Waterleaf', 'waterleaf', 'vegetables', 'Succulent leafy vegetable with high water content, used in Nigerian soups'),
('ING_PUMPKIN_LEAF', 'Pumpkin Leaf (Ugu)', 'pumpkin-leaf', 'vegetables', 'Fluted pumpkin leaves, a nutritious vegetable used extensively in Nigerian cooking'),
('ING_JUTE_LEAF', 'Jute Leaf (Ewedu)', 'jute-leaf', 'vegetables', 'Mucilaginous leaf used to make ewedu soup, a Yoruba staple'),
('ING_OHA_LEAF', 'Oha Leaf', 'oha-leaf', 'vegetables', 'Aromatic leaf from the African pterocarpus tree, used in Igbo oha soup'),
('ING_SCENT_LEAF', 'Scent Leaf (Nchanwu)', 'scent-leaf', 'herbs', 'Nigerian basil with a strong aromatic flavor, used in pepper soup and stews'),
('ING_UTAZI_LEAF', 'Utazi Leaf', 'utazi-leaf', 'herbs', 'Bitter leaf used as garnish in Igbo dishes like nkwobi and isiewu'),

-- Seeds and Nuts
('ING_EGUSI', 'Egusi (Melon Seeds)', 'egusi', 'nuts', 'Ground melon seeds used to thicken and flavor Nigerian soups'),
('ING_OGBONO', 'Ogbono (Wild Mango Seeds)', 'ogbono', 'nuts', 'Ground wild mango seeds that create a thick, draw soup'),
('ING_TIGER_NUT', 'Tiger Nut', 'tiger-nut', 'nuts', 'Small tubers with a sweet, nutty flavor, used to make kunun aya drink'),
('ING_UZIZA_SEED', 'Uziza Seed', 'uziza-seed', 'spices', 'Peppery West African spice used in pepper soup and traditional dishes'),

-- Spices and Seasonings
('ING_CALABASH_NUTMEG', 'Calabash Nutmeg (Ehuru)', 'calabash-nutmeg', 'spices', 'African nutmeg with a slightly bitter, aromatic flavor'),
('ING_EHURU', 'Ehuru', 'ehuru', 'spices', 'Calabash nutmeg used in Igbo cuisine, especially in nkwobi'),
('ING_LOCUST_BEAN', 'Locust Bean (Iru/Dawadawa)', 'locust-bean', 'spices', 'Fermented locust bean seeds with a pungent umami flavor'),
('ING_OGIRI', 'Ogiri', 'ogiri', 'spices', 'Fermented oil seed condiment with strong aroma, used in Igbo soups'),
('ING_PEPPER_SOUP_SPICE', 'Pepper Soup Spice', 'pepper-soup-spice', 'spices', 'Traditional Nigerian spice blend for pepper soup including uziza, calabash nutmeg, and alligator pepper'),
('ING_SUYA_SPICE', 'Suya Spice (Yaji)', 'suya-spice', 'spices', 'Spicy peanut-based seasoning for Nigerian suya and kilishi'),
('ING_BANGA_SPICE', 'Banga Spice', 'banga-spice', 'spices', 'Aromatic spice blend for Niger Delta palm fruit soup'),

-- Starches and Grains
('ING_GARRI', 'Garri', 'garri', 'grains', 'Granulated cassava flour, staple for making eba'),
('ING_YAM_FLOUR', 'Yam Flour (Elubo)', 'yam-flour', 'grains', 'Dried and ground yam used to make amala'),
('ING_OFADA_RICE', 'Ofada Rice', 'ofada-rice', 'grains', 'Locally grown Nigerian brown rice with a distinctive earthy flavor'),
('ING_CASSAVA_STARCH', 'Cassava Starch', 'cassava-starch', 'grains', 'Pure starch extracted from cassava, used to make starch swallow'),
('ING_COCOYAM', 'Cocoyam', 'cocoyam', 'vegetables', 'Starchy root vegetable used as thickener in soups like oha'),

-- Proteins and Seafood
('ING_STOCKFISH', 'Stockfish', 'stockfish', 'seafood', 'Dried unsalted fish, commonly cod, essential in Nigerian soups'),
('ING_PERIWINKLE', 'Periwinkle', 'periwinkle', 'seafood', 'Small sea snails used in Nigerian coastal cuisine'),

-- Other
('ING_PALM_FRUIT', 'Palm Fruit', 'palm-fruit', 'fruits', 'Red palm fruit used to make palm fruit extract for banga soup'),
('ING_PALM_SAP', 'Palm Sap', 'palm-sap', 'other', 'Fresh sap tapped from palm trees, fermented to make palm wine'),
('ING_HONEY_BEANS', 'Honey Beans', 'honey-beans', 'legumes', 'Sweet-tasting Nigerian brown beans, used in ewa agoyin')

ON CONFLICT (id) DO NOTHING;

-- Add nutrition data for key Nigerian ingredients
UPDATE ingredients SET nutrition = '{
  "calories": 598,
  "protein": 28.3,
  "carbohydrates": 4.6,
  "fat": 52.0,
  "fiber": 2.6
}'::jsonb WHERE id = 'ING_EGUSI';

UPDATE ingredients SET nutrition = '{
  "calories": 520,
  "protein": 7.0,
  "carbohydrates": 10.0,
  "fat": 50.0,
  "fiber": 3.0
}'::jsonb WHERE id = 'ING_OGBONO';

UPDATE ingredients SET nutrition = '{
  "calories": 350,
  "protein": 1.0,
  "carbohydrates": 85.0,
  "fat": 0.5,
  "fiber": 2.0
}'::jsonb WHERE id = 'ING_GARRI';

UPDATE ingredients SET nutrition = '{
  "calories": 330,
  "protein": 4.0,
  "carbohydrates": 78.0,
  "fat": 0.5,
  "fiber": 3.0
}'::jsonb WHERE id = 'ING_YAM_FLOUR';

UPDATE ingredients SET nutrition = '{
  "calories": 400,
  "protein": 4.5,
  "carbohydrates": 44.0,
  "fat": 24.0,
  "fiber": 33.0
}'::jsonb WHERE id = 'ING_TIGER_NUT';

UPDATE ingredients SET nutrition = '{
  "calories": 290,
  "protein": 21.0,
  "carbohydrates": 48.0,
  "fat": 1.5,
  "fiber": 0
}'::jsonb WHERE id = 'ING_LOCUST_BEAN';

SELECT 'Inserted 28 Nigerian ingredients' AS status;
