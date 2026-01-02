-- Nutrition Backfill - Batch 6 (24 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 884, "protein": 0.0, "fat": 100.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_PALM_OIL';
UPDATE ingredients SET nutrition = '{"calories": 884, "protein": 0.0, "fat": 100.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SUNFLOWER_OIL';
UPDATE ingredients SET nutrition = '{"calories": 544, "protein": 61.3, "fat": 31.3, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_PORK_RIND';
UPDATE ingredients SET nutrition = '{"calories": 230, "protein": 22.0, "fat": 15.0, "carbs": 1.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_SMOKED_PORK';
UPDATE ingredients SET nutrition = '{"calories": 210, "protein": 19.5, "fat": 14.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SUCKLING_PIG';
UPDATE ingredients SET nutrition = '{"calories": 260, "protein": 23.0, "fat": 15.0, "carbs": 8.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_FRIED_CHICKEN';
UPDATE ingredients SET nutrition = '{"calories": 135, "protein": 30.1, "fat": 0.7, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_TURKEY_BREAST';
UPDATE ingredients SET nutrition = '{"calories": 160, "protein": 22.0, "fat": 8.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_REINDEER';
UPDATE ingredients SET nutrition = '{"calories": 95, "protein": 16.5, "fat": 3.2, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_VENDACE';
UPDATE ingredients SET nutrition = '{"calories": 143, "protein": 10.9, "fat": 10.3, "carbs": 1.1, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_BRAIN';
UPDATE ingredients SET nutrition = '{"calories": 153, "protein": 15.6, "fat": 9.3, "carbs": 0.7, "fiber": 0.0}'::jsonb WHERE id = 'ING_CORACAO_FRANGO';
UPDATE ingredients SET nutrition = '{"calories": 165, "protein": 24.5, "fat": 4.4, "carbs": 3.8, "fiber": 0.0}'::jsonb WHERE id = 'ING_LIVER';
UPDATE ingredients SET nutrition = '{"calories": 319, "protein": 14.0, "fat": 28.0, "carbs": 2.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_LIVER_PATE';
UPDATE ingredients SET nutrition = '{"calories": 195, "protein": 39.0, "fat": 4.2, "carbs": 0.1, "fiber": 0.0}'::jsonb WHERE id = 'ING_BUNDNERFLEISCH';
UPDATE ingredients SET nutrition = '{"calories": 251, "protein": 18.2, "fat": 19.0, "carbs": 0.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_CORNED_BEEF';
UPDATE ingredients SET nutrition = '{"calories": 145, "protein": 21.0, "fat": 6.0, "carbs": 1.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_CURED_HAM';
UPDATE ingredients SET nutrition = '{"calories": 310, "protein": 12.0, "fat": 22.0, "carbs": 16.0, "fiber": 1.0}'::jsonb WHERE id = 'ING_ALHEIRA';
UPDATE ingredients SET nutrition = '{"calories": 379, "protein": 14.6, "fat": 34.5, "carbs": 1.3, "fiber": 0.0}'::jsonb WHERE id = 'ING_BLOOD_SAUSAGE';
UPDATE ingredients SET nutrition = '{"calories": 290, "protein": 11.0, "fat": 26.0, "carbs": 3.0, "fiber": 0.5}'::jsonb WHERE id = 'ING_SAUCISSE_CHOUX';
UPDATE ingredients SET nutrition = '{"calories": 310, "protein": 14.0, "fat": 28.0, "carbs": 2.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_KIELBASA';
UPDATE ingredients SET nutrition = '{"calories": 320, "protein": 14.5, "fat": 28.5, "carbs": 1.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_LINGUICA';
UPDATE ingredients SET nutrition = '{"calories": 315, "protein": 13.0, "fat": 29.0, "carbs": 0.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_ROOKWORST';
UPDATE ingredients SET nutrition = '{"calories": 301, "protein": 12.0, "fat": 27.5, "carbs": 1.8, "fiber": 0.0}'::jsonb WHERE id = 'ING_SMOKED_SAUSAGE';
UPDATE ingredients SET nutrition = '{"calories": 255, "protein": 12.5, "fat": 22.0, "carbs": 1.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_WHITE_SAUSAGE';

-- Verify count
SELECT COUNT(*) as updated_count FROM ingredients
WHERE id IN ('ING_PALM_OIL', 'ING_SUNFLOWER_OIL', 'ING_PORK_RIND', 'ING_SMOKED_PORK', 'ING_SUCKLING_PIG', 'ING_FRIED_CHICKEN', 'ING_TURKEY_BREAST', 'ING_REINDEER', 'ING_VENDACE', 'ING_BEEF_BRAIN', 'ING_CORACAO_FRANGO', 'ING_LIVER', 'ING_LIVER_PATE', 'ING_BUNDNERFLEISCH', 'ING_CORNED_BEEF', 'ING_CURED_HAM', 'ING_ALHEIRA', 'ING_BLOOD_SAUSAGE', 'ING_SAUCISSE_CHOUX', 'ING_KIELBASA', 'ING_LINGUICA', 'ING_ROOKWORST', 'ING_SMOKED_SAUSAGE', 'ING_WHITE_SAUSAGE')
AND nutrition IS NOT NULL;
