-- Hawaiian Cuisine - New Ingredients
-- GUDBRO Database Standards v1.7
-- Run this FIRST before creating the table

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_ARARE', 'Arare (Rice Crackers)', 'arare-rice-crackers', 'grains',
 'Japanese rice crackers popular in Hawaii, used in Hurricane Popcorn and as snacks',
 '{"calories": 380, "protein": 7, "fat": 2, "carbs": 82, "fiber": 1, "sodium": 900}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_BUTTERFISH', 'Butterfish (Black Cod)', 'butterfish-black-cod', 'seafood',
 'Rich, oily fish also known as sablefish or black cod, essential for laulau',
 '{"calories": 195, "protein": 13, "fat": 15, "carbs": 0, "fiber": 0, "sodium": 56}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_CHAR_SIU_SAUCE', 'Char Siu Sauce', 'char-siu-sauce', 'sauces',
 'Sweet Chinese BBQ sauce used for manapua and char siu pork in Hawaiian cuisine',
 '{"calories": 230, "protein": 2, "fat": 0.5, "carbs": 52, "fiber": 0, "sodium": 1100}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_MOCHIKO', 'Mochiko (Sweet Rice Flour)', 'mochiko-sweet-rice-flour', 'grains',
 'Japanese glutinous rice flour used for butter mochi and other Hawaiian-Japanese desserts',
 '{"calories": 370, "protein": 6, "fat": 0.5, "carbs": 82, "fiber": 1, "sodium": 2}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_PORTUGUESE_SAUSAGE', 'Portuguese Sausage (Linguica)', 'portuguese-sausage-linguica', 'proteins',
 'Smoky, slightly sweet pork sausage unique to Hawaii, brought by Portuguese immigrants',
 '{"calories": 280, "protein": 16, "fat": 23, "carbs": 2, "fiber": 0, "sodium": 980}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_TARO_LEAF', 'Taro Leaf (Luau Leaf)', 'taro-leaf-luau-leaf', 'vegetables',
 'Large heart-shaped leaves from the taro plant, used in laulau and squid luau',
 '{"calories": 42, "protein": 5, "fat": 0.7, "carbs": 6, "fiber": 3, "sodium": 3}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_TI_LEAF', 'Ti Leaf', 'ti-leaf', 'vegetables',
 'Long green leaves used for wrapping food in Hawaiian cooking, not eaten',
 '{"calories": 20, "protein": 1, "fat": 0.1, "carbs": 4, "fiber": 2, "sodium": 2}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_AZUKI_BEAN', 'Azuki Bean (Red Bean)', 'azuki-bean-red-bean', 'legumes',
 'Small red beans used sweetened as topping for shave ice and in Japanese-Hawaiian desserts',
 '{"calories": 128, "protein": 8, "fat": 0.1, "carbs": 25, "fiber": 7, "sodium": 2}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_POPCORN', 'Popcorn', 'popcorn', 'grains',
 'Popped corn kernels, base for Hurricane Popcorn when mixed with arare and furikake',
 '{"calories": 375, "protein": 12, "fat": 4, "carbs": 74, "fiber": 15, "sodium": 8}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_GRAHAM_CRACKER', 'Graham Cracker', 'graham-cracker', 'grains',
 'Sweet whole wheat crackers used for pie crusts in lilikoi and other Hawaiian pies',
 '{"calories": 430, "protein": 7, "fat": 10, "carbs": 74, "fiber": 3, "sodium": 680}')
ON CONFLICT (id) DO NOTHING;

-- Fish
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_MAHI_MAHI', 'Mahi Mahi (Dolphinfish)', 'mahi-mahi-dolphinfish', 'seafood',
 'Firm white fish popular in Hawaiian cuisine, also called dorado or dolphinfish',
 '{"calories": 85, "protein": 18, "fat": 0.7, "carbs": 0, "fiber": 0, "sodium": 88}')
ON CONFLICT (id) DO NOTHING;

-- Seaweeds
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_SEAWEED', 'Seaweed', 'seaweed', 'vegetables',
 'General term for edible marine algae, used in poke and various Asian-Hawaiian dishes',
 '{"calories": 45, "protein": 5, "fat": 0.5, "carbs": 8, "fiber": 1, "sodium": 230}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_LIMU', 'Limu (Hawaiian Seaweed)', 'limu-hawaiian-seaweed', 'vegetables',
 'Traditional Hawaiian seaweed, often ogo variety, essential for authentic poke',
 '{"calories": 35, "protein": 3, "fat": 0.3, "carbs": 6, "fiber": 1, "sodium": 180}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_OGO', 'Ogo (Red Seaweed)', 'ogo-red-seaweed', 'vegetables',
 'Crunchy red seaweed popular in Hawaiian poke, also known as limu manauea',
 '{"calories": 40, "protein": 4, "fat": 0.4, "carbs": 7, "fiber": 1, "sodium": 200}')
ON CONFLICT (id) DO NOTHING;

-- Verification
SELECT id, name, category FROM ingredients
WHERE id IN ('ING_ARARE', 'ING_BUTTERFISH', 'ING_CHAR_SIU_SAUCE', 'ING_MOCHIKO',
             'ING_PORTUGUESE_SAUSAGE', 'ING_TARO_LEAF', 'ING_TI_LEAF',
             'ING_AZUKI_BEAN', 'ING_POPCORN', 'ING_GRAHAM_CRACKER')
ORDER BY id;
