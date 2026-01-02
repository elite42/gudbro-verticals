-- ============================================
-- BRITISH CUISINE - Missing Ingredients
-- GUDBRO Database Standards v1.7
-- ============================================
-- 25 new ingredients for British cuisine

-- 1. ING_BEEF_ROAST - Beef Roasting Joint
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_BEEF_ROAST', 'Beef Roast', 'beef-roast', 'proteins',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 250, "protein_g": 26, "carbs_g": 0, "fat_g": 16, "fiber_g": 0, "sodium_mg": 54}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_BEEF_ROAST');

-- 2. ING_BRANSTON_PICKLE - British Brown Pickle
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_BRANSTON_PICKLE', 'Branston Pickle', 'branston-pickle', 'condiments',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 135, "protein_g": 0.7, "carbs_g": 32, "fat_g": 0.2, "fiber_g": 1.2, "sodium_mg": 920}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_BRANSTON_PICKLE');

-- 3. ING_BREADCRUMBS - Breadcrumbs
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_BREADCRUMBS', 'Breadcrumbs', 'breadcrumbs', 'grains',
  '["gluten"]'::jsonb,
  '["gluten"]'::jsonb,
  '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 395, "protein_g": 13.4, "carbs_g": 72, "fat_g": 5.3, "fiber_g": 4.5, "sodium_mg": 732}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_BREADCRUMBS');

-- 4. ING_CUSTARD - English Custard
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_CUSTARD', 'Custard', 'custard', 'dairy',
  '["eggs", "milk"]'::jsonb,
  '["lactose"]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 118, "protein_g": 3.8, "carbs_g": 16, "fat_g": 4.5, "fiber_g": 0, "sodium_mg": 55}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CUSTARD');

-- 5. ING_DIGESTIVE_BISCUIT - British Digestive Biscuits
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_DIGESTIVE_BISCUIT', 'Digestive Biscuits', 'digestive-biscuit', 'grains',
  '["gluten", "milk"]'::jsonb,
  '["gluten", "lactose"]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": false, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 479, "protein_g": 7.2, "carbs_g": 66, "fat_g": 21, "fiber_g": 2.8, "sodium_mg": 500}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_DIGESTIVE_BISCUIT');

-- 6. ING_EEL - Freshwater/Sea Eel
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_EEL', 'Eel', 'eel', 'seafood',
  '["fish"]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb,
  '{"per_100g": {"calories_kcal": 184, "protein_g": 18.4, "carbs_g": 0, "fat_g": 11.7, "fiber_g": 0, "sodium_mg": 51}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_EEL');

-- 7. ING_FISH_FINGERS - Breaded Fish Sticks
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_FISH_FINGERS', 'Fish Fingers', 'fish-fingers', 'seafood',
  '["fish", "gluten"]'::jsonb,
  '["gluten"]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb,
  '{"per_100g": {"calories_kcal": 220, "protein_g": 12, "carbs_g": 19, "fat_g": 11, "fiber_g": 1, "sodium_mg": 450}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_FISH_FINGERS');

-- 8. ING_JELLY - Fruit Jelly/Gelatin Dessert
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_JELLY', 'Jelly', 'jelly', 'sweeteners',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb,
  '{"per_100g": {"calories_kcal": 62, "protein_g": 1.5, "carbs_g": 14, "fat_g": 0, "fiber_g": 0, "sodium_mg": 50}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_JELLY');

-- 9. ING_KIPPER - Smoked Herring
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_KIPPER', 'Kipper', 'kipper', 'seafood',
  '["fish"]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 217, "protein_g": 24.6, "carbs_g": 0, "fat_g": 12.4, "fiber_g": 0, "sodium_mg": 990}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_KIPPER');

-- 10. ING_LAMB_KIDNEY - Lamb Kidney
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_LAMB_KIDNEY', 'Lamb Kidney', 'lamb-kidney', 'proteins',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": false}'::jsonb,
  '{"per_100g": {"calories_kcal": 100, "protein_g": 17, "carbs_g": 1, "fat_g": 3, "fiber_g": 0, "sodium_mg": 177}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_LAMB_KIDNEY');

-- 11. ING_LAMB_MINCE - Ground Lamb
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_LAMB_MINCE', 'Lamb Mince', 'lamb-mince', 'proteins',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 283, "protein_g": 17, "carbs_g": 0, "fat_g": 24, "fiber_g": 0, "sodium_mg": 66}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_LAMB_MINCE');

-- 12. ING_LAMB_NECK - Lamb Neck for Stewing
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_LAMB_NECK', 'Lamb Neck', 'lamb-neck', 'proteins',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 234, "protein_g": 18, "carbs_g": 0, "fat_g": 18, "fiber_g": 0, "sodium_mg": 58}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_LAMB_NECK');

-- 13. ING_LAMB_STOCK - Lamb Stock/Broth
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_LAMB_STOCK', 'Lamb Stock', 'lamb-stock', 'sauces',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 10, "protein_g": 1.5, "carbs_g": 0.5, "fat_g": 0.2, "fiber_g": 0, "sodium_mg": 380}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_LAMB_STOCK');

-- 14. ING_MERINGUE - Baked Egg White Dessert
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_MERINGUE', 'Meringue', 'meringue', 'sweeteners',
  '["eggs"]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 396, "protein_g": 5.1, "carbs_g": 93, "fat_g": 0, "fiber_g": 0, "sodium_mg": 84}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_MERINGUE');

-- 15. ING_MUSTARD_POWDER - Dry Ground Mustard
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_MUSTARD_POWDER', 'Mustard Powder', 'mustard-powder', 'spices',
  '["mustard"]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 508, "protein_g": 26, "carbs_g": 28, "fat_g": 36, "fiber_g": 12, "sodium_mg": 13}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_MUSTARD_POWDER');

-- 16. ING_PARSNIP - Root Vegetable
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_PARSNIP', 'Parsnip', 'parsnip', 'vegetables',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 75, "protein_g": 1.2, "carbs_g": 18, "fat_g": 0.3, "fiber_g": 4.9, "sodium_mg": 10}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PARSNIP');

-- 17. ING_PEPPERCORN - Whole Pepper
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_PEPPERCORN', 'Peppercorn', 'peppercorn', 'spices',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 251, "protein_g": 10, "carbs_g": 64, "fat_g": 3.3, "fiber_g": 25, "sodium_mg": 20}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PEPPERCORN');

-- 18. ING_PORK_GELATIN - Pork-based Gelatin
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_PORK_GELATIN', 'Pork Gelatin', 'pork-gelatin', 'powders',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb,
  '{"per_100g": {"calories_kcal": 335, "protein_g": 86, "carbs_g": 0, "fat_g": 0, "fiber_g": 0, "sodium_mg": 196}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_PORK_GELATIN');

-- 19. ING_SAUSAGE_MEAT - Raw Sausage Meat
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_SAUSAGE_MEAT', 'Sausage Meat', 'sausage-meat', 'proteins',
  '["gluten"]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": false, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": false}'::jsonb,
  '{"per_100g": {"calories_kcal": 295, "protein_g": 13, "carbs_g": 5, "fat_g": 25, "fiber_g": 0, "sodium_mg": 680}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SAUSAGE_MEAT');

-- 20. ING_SHERRY - Fortified Wine
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_SHERRY', 'Sherry', 'sherry', 'wines',
  '["sulphites"]'::jsonb,
  '["alcohol"]'::jsonb,
  '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": false, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 116, "protein_g": 0.1, "carbs_g": 1.4, "fat_g": 0, "fiber_g": 0, "sodium_mg": 9}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SHERRY');

-- 21. ING_SMOKED_HADDOCK - Smoked Finnan Haddie
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_SMOKED_HADDOCK', 'Smoked Haddock', 'smoked-haddock', 'seafood',
  '["fish"]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 101, "protein_g": 23.3, "carbs_g": 0, "fat_g": 0.9, "fiber_g": 0, "sodium_mg": 763}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SMOKED_HADDOCK');

-- 22. ING_SUET - Beef/Mutton Fat
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_SUET', 'Suet', 'suet', 'fats',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 854, "protein_g": 1.5, "carbs_g": 0, "fat_g": 94, "fiber_g": 0, "sodium_mg": 4}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SUET');

-- 23. ING_SWEDE - Rutabaga/Swedish Turnip
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_SWEDE', 'Swede', 'swede', 'vegetables',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 38, "protein_g": 1.1, "carbs_g": 8.6, "fat_g": 0.2, "fiber_g": 2.3, "sodium_mg": 12}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_SWEDE');

-- 24. ING_BEEF_MINCE - Ground Beef/Minced Beef
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_BEEF_MINCE', 'Beef Mince', 'beef-mince', 'proteins',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 250, "protein_g": 17.2, "carbs_g": 0, "fat_g": 20, "fiber_g": 0, "sodium_mg": 66}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_BEEF_MINCE');

-- 25. ING_CORIANDER - Fresh Coriander/Cilantro
INSERT INTO ingredients (id, name, slug, category, allergens, intolerances, dietary, nutrition)
SELECT 'ING_CORIANDER', 'Coriander', 'coriander', 'vegetables',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_nut_free": true, "is_halal": true, "is_kosher": true}'::jsonb,
  '{"per_100g": {"calories_kcal": 23, "protein_g": 2.1, "carbs_g": 3.7, "fat_g": 0.5, "fiber_g": 2.8, "sodium_mg": 46}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE id = 'ING_CORIANDER');

-- Verification
SELECT COUNT(*) as new_ingredients_added FROM ingredients
WHERE id IN (
  'ING_BEEF_ROAST', 'ING_BRANSTON_PICKLE', 'ING_BREADCRUMBS', 'ING_CUSTARD',
  'ING_DIGESTIVE_BISCUIT', 'ING_EEL', 'ING_FISH_FINGERS', 'ING_JELLY',
  'ING_KIPPER', 'ING_LAMB_KIDNEY', 'ING_LAMB_MINCE', 'ING_LAMB_NECK',
  'ING_LAMB_STOCK', 'ING_MERINGUE', 'ING_MUSTARD_POWDER', 'ING_PARSNIP',
  'ING_PEPPERCORN', 'ING_PORK_GELATIN', 'ING_SAUSAGE_MEAT', 'ING_SHERRY',
  'ING_SMOKED_HADDOCK', 'ING_SUET', 'ING_SWEDE', 'ING_BEEF_MINCE', 'ING_CORIANDER'
);
