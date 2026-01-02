-- Cajun/Creole Cuisine - New Ingredients
-- GUDBRO Database Standards v1.7
-- Run this FIRST before creating the table

-- Tasso - Cajun smoked spiced ham
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_TASSO', 'Tasso Ham', 'tasso-ham', 'proteins',
 'Heavily spiced and smoked Cajun ham used to flavor gumbo, jambalaya, and other Louisiana dishes',
 '{"calories": 180, "protein": 22, "fat": 9, "carbs": 2, "fiber": 0, "sodium": 1200}')
ON CONFLICT (id) DO NOTHING;

-- Alligator - Louisiana specialty
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_ALLIGATOR', 'Alligator Meat', 'alligator-meat', 'proteins',
 'Lean white meat from American alligator, tastes like chicken crossed with fish, popular in Louisiana',
 '{"calories": 143, "protein": 29, "fat": 2.6, "carbs": 0, "fiber": 0, "sodium": 65}')
ON CONFLICT (id) DO NOTHING;

-- Filé Powder - Ground sassafras leaves
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_FILE_POWDER', 'Filé Powder', 'file-powder', 'spices',
 'Ground sassafras leaves used to thicken and flavor gumbo, adds earthy root beer-like flavor',
 '{"calories": 12, "protein": 0.2, "fat": 0.1, "carbs": 2.5, "fiber": 1, "sodium": 1}')
ON CONFLICT (id) DO NOTHING;

-- Creole Mustard - Spicy Louisiana mustard
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_CREOLE_MUSTARD', 'Creole Mustard', 'creole-mustard', 'condiments',
 'Coarse-grained spicy brown mustard from Louisiana, essential for po-boys and remoulade',
 '{"calories": 66, "protein": 4, "fat": 4, "carbs": 5, "fiber": 2, "sodium": 950}')
ON CONFLICT (id) DO NOTHING;

-- Cajun Seasoning Blend
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_CAJUN_SEASONING', 'Cajun Seasoning', 'cajun-seasoning', 'spices',
 'Spice blend of paprika, cayenne, garlic, onion, oregano, and thyme used in Louisiana cooking',
 '{"calories": 18, "protein": 0.8, "fat": 0.6, "carbs": 3.5, "fiber": 1.2, "sodium": 180}')
ON CONFLICT (id) DO NOTHING;

-- Blue Crab - Gulf specialty
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_BLUE_CRAB', 'Blue Crab', 'blue-crab', 'seafood',
 'Atlantic blue crab, prized for sweet delicate meat, essential for crab boils and crab cakes',
 '{"calories": 87, "protein": 18, "fat": 1, "carbs": 0, "fiber": 0, "sodium": 293}')
ON CONFLICT (id) DO NOTHING;

-- Praline - Louisiana candy
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_PRALINE', 'Praline', 'praline', 'sweeteners',
 'Louisiana confection made with brown sugar, cream, butter, and pecans',
 '{"calories": 150, "protein": 1, "fat": 8, "carbs": 20, "fiber": 1, "sodium": 25}')
ON CONFLICT (id) DO NOTHING;

-- Crystal Hot Sauce (Louisiana style)
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_LOUISIANA_HOT_SAUCE', 'Louisiana Hot Sauce', 'louisiana-hot-sauce', 'condiments',
 'Cayenne-based hot sauce, milder than Tabasco, staple in Louisiana cooking',
 '{"calories": 0, "protein": 0, "fat": 0, "carbs": 0, "fiber": 0, "sodium": 200}')
ON CONFLICT (id) DO NOTHING;

-- Grits - Southern corn porridge
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_GRITS', 'Grits', 'grits', 'grains',
 'Coarsely ground corn porridge, staple of Southern and Cajun-Creole cuisine',
 '{"calories": 182, "protein": 4, "fat": 1, "carbs": 38, "fiber": 2, "sodium": 5}')
ON CONFLICT (id) DO NOTHING;

-- Corn Syrup - for pecan pie
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_CORN_SYRUP', 'Corn Syrup', 'corn-syrup', 'sweeteners',
 'Light corn syrup used in pecan pie and other Southern desserts',
 '{"calories": 286, "protein": 0, "fat": 0, "carbs": 78, "fiber": 0, "sodium": 55}')
ON CONFLICT (id) DO NOTHING;

-- Mustard Greens - for Gumbo Z'Herbes
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_MUSTARD_GREENS', 'Mustard Greens', 'mustard-greens', 'vegetables',
 'Peppery leafy greens used in gumbo z herbes and Southern cooking',
 '{"calories": 27, "protein": 3, "fat": 0.4, "carbs": 4.7, "fiber": 3.2, "sodium": 20}')
ON CONFLICT (id) DO NOTHING;

-- Verification
SELECT id, name, category FROM ingredients
WHERE id IN ('ING_TASSO', 'ING_ALLIGATOR', 'ING_FILE_POWDER', 'ING_CREOLE_MUSTARD',
             'ING_CAJUN_SEASONING', 'ING_BLUE_CRAB', 'ING_PRALINE', 'ING_LOUISIANA_HOT_SAUCE')
ORDER BY id;
