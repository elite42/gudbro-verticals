-- Nutrition Backfill - Batch 4 (26 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 77, "protein": 15.9, "fat": 1.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_CRAYFISH';
UPDATE ingredients SET nutrition = '{"calories": 290, "protein": 62.0, "fat": 4.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_DRIED_FISH';
UPDATE ingredients SET nutrition = '{"calories": 101, "protein": 22.5, "fat": 1.1, "carbs": 0.1, "fiber": 0.0}'::jsonb WHERE id = 'ING_GREY_SHRIMP';
UPDATE ingredients SET nutrition = '{"calories": 90, "protein": 16.3, "fat": 1.4, "carbs": 2.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_PERIWINKLE';
UPDATE ingredients SET nutrition = '{"calories": 345, "protein": 78.5, "fat": 3.4, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_STOCKFISH';
UPDATE ingredients SET nutrition = '{"calories": 90, "protein": 18.3, "fat": 1.3, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_WHITING';
UPDATE ingredients SET nutrition = '{"calories": 416, "protein": 28.5, "fat": 34.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_COMTE';
UPDATE ingredients SET nutrition = '{"calories": 383, "protein": 28.5, "fat": 30.0, "carbs": 0.1, "fiber": 0.0}'::jsonb WHERE id = 'ING_EMMENTAL';
UPDATE ingredients SET nutrition = '{"calories": 160, "protein": 13.0, "fat": 11.0, "carbs": 2.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_FARMERS_CHEESE';
UPDATE ingredients SET nutrition = '{"calories": 98, "protein": 11.0, "fat": 4.3, "carbs": 3.4, "fiber": 0.0}'::jsonb WHERE id = 'ING_FRESH_CHEESE';
UPDATE ingredients SET nutrition = '{"calories": 372, "protein": 26.0, "fat": 30.0, "carbs": 1.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_OSCYPEK';
UPDATE ingredients SET nutrition = '{"calories": 350, "protein": 25.0, "fat": 28.0, "carbs": 0.1, "fiber": 0.0}'::jsonb WHERE id = 'ING_RACLETTE_CHEESE';
UPDATE ingredients SET nutrition = '{"calories": 330, "protein": 19.0, "fat": 28.0, "carbs": 0.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_VACHERIN';
UPDATE ingredients SET nutrition = '{"calories": 350, "protein": 1.0, "fat": 34.0, "carbs": 11.0, "fiber": 0.2}'::jsonb WHERE id = 'ING_COLESLAW_DRESSING';
UPDATE ingredients SET nutrition = '{"calories": 420, "protein": 1.5, "fat": 42.0, "carbs": 8.5, "fiber": 0.3}'::jsonb WHERE id = 'ING_GARLIC_SAUCE';
UPDATE ingredients SET nutrition = '{"calories": 120, "protein": 2.5, "fat": 7.0, "carbs": 12.0, "fiber": 1.5}'::jsonb WHERE id = 'ING_SCHEZWAN_SAUCE';
UPDATE ingredients SET nutrition = '{"calories": 68, "protein": 0.2, "fat": 0.1, "carbs": 18.1, "fiber": 1.6}'::jsonb WHERE id = 'ING_APPLESAUCE';
UPDATE ingredients SET nutrition = '{"calories": 125, "protein": 1.0, "fat": 0.3, "carbs": 28.5, "fiber": 1.2}'::jsonb WHERE id = 'ING_CURRY_KETCHUP';
UPDATE ingredients SET nutrition = '{"calories": 95, "protein": 2.8, "fat": 2.4, "carbs": 15.6, "fiber": 3.2}'::jsonb WHERE id = 'ING_PEPPER_PASTE';
UPDATE ingredients SET nutrition = '{"calories": 60, "protein": 4.0, "fat": 3.4, "carbs": 5.0, "fiber": 2.8}'::jsonb WHERE id = 'ING_YELLOW_MUSTARD';
UPDATE ingredients SET nutrition = '{"calories": 240, "protein": 0.3, "fat": 0.1, "carbs": 60.0, "fiber": 1.1}'::jsonb WHERE id = 'ING_CRANBERRY_JAM';
UPDATE ingredients SET nutrition = '{"calories": 290, "protein": 0.0, "fat": 0.0, "carbs": 73.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_STROOP';
UPDATE ingredients SET nutrition = '{"calories": 265, "protein": 0.9, "fat": 0.1, "carbs": 64.0, "fiber": 2.0}'::jsonb WHERE id = 'ING_SIROP_LIEGE';
UPDATE ingredients SET nutrition = '{"calories": 245, "protein": 0.5, "fat": 0.1, "carbs": 61.0, "fiber": 1.5}'::jsonb WHERE id = 'ING_PLUM_JAM';
UPDATE ingredients SET nutrition = '{"calories": 260, "protein": 0.6, "fat": 0.2, "carbs": 65.0, "fiber": 2.5}'::jsonb WHERE id = 'ING_RASPBERRY_JAM';
UPDATE ingredients SET nutrition = '{"calories": 275, "protein": 0.2, "fat": 0.0, "carbs": 69.0, "fiber": 0.5}'::jsonb WHERE id = 'ING_ROSE_JAM';

-- Verify count
SELECT COUNT(*) as updated_count FROM ingredients
WHERE id IN ('ING_CRAYFISH', 'ING_DRIED_FISH', 'ING_GREY_SHRIMP', 'ING_PERIWINKLE', 'ING_STOCKFISH', 'ING_WHITING', 'ING_COMTE', 'ING_EMMENTAL', 'ING_FARMERS_CHEESE', 'ING_FRESH_CHEESE', 'ING_OSCYPEK', 'ING_RACLETTE_CHEESE', 'ING_VACHERIN', 'ING_COLESLAW_DRESSING', 'ING_GARLIC_SAUCE', 'ING_SCHEZWAN_SAUCE', 'ING_APPLESAUCE', 'ING_CURRY_KETCHUP', 'ING_PEPPER_PASTE', 'ING_YELLOW_MUSTARD', 'ING_CRANBERRY_JAM', 'ING_STROOP', 'ING_SIROP_LIEGE', 'ING_PLUM_JAM', 'ING_RASPBERRY_JAM', 'ING_ROSE_JAM')
AND nutrition IS NOT NULL;
