-- Nutrition Final 100% - Batch 2 (18 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 184, "protein": 18.4, "fat": 11.7, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_EEL';
UPDATE ingredients SET nutrition = '{"calories": 220, "protein": 12.0, "fat": 10.0, "carbs": 20.0, "fiber": 1.0}'::jsonb WHERE id = 'ING_FISH_FINGERS';
UPDATE ingredients SET nutrition = '{"calories": 217, "protein": 19.6, "fat": 15.3, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_KIPPER';
UPDATE ingredients SET nutrition = '{"calories": 95, "protein": 21.0, "fat": 0.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SMOKED_HADDOCK';
UPDATE ingredients SET nutrition = '{"calories": 290, "protein": 0.5, "fat": 0.1, "carbs": 72.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_NATEF';
UPDATE ingredients SET nutrition = '{"calories": 158, "protein": 0.6, "fat": 0.7, "carbs": 35.5, "fiber": 2.1}'::jsonb WHERE id = 'ING_BRANSTON_PICKLE';
UPDATE ingredients SET nutrition = '{"calories": 98, "protein": 3.1, "fat": 3.2, "carbs": 14.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_CUSTARD';
UPDATE ingredients SET nutrition = '{"calories": 62, "protein": 1.2, "fat": 0.0, "carbs": 14.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_JELLY';
UPDATE ingredients SET nutrition = '{"calories": 395, "protein": 4.5, "fat": 0.2, "carbs": 94.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_MERINGUE';
UPDATE ingredients SET nutrition = '{"calories": 102, "protein": 16.5, "fat": 3.4, "carbs": 1.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_LAMB_KIDNEY';
UPDATE ingredients SET nutrition = '{"calories": 120, "protein": 0.1, "fat": 0.0, "carbs": 4.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_SHERRY';
UPDATE ingredients SET nutrition = '{"calories": 338, "protein": 85.0, "fat": 0.1, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_PORK_GELATIN';
UPDATE ingredients SET nutrition = '{"calories": 797, "protein": 4.2, "fat": 87.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_TAIL_FAT';
UPDATE ingredients SET nutrition = '{"calories": 854, "protein": 1.5, "fat": 94.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SUET';
UPDATE ingredients SET nutrition = '{"calories": 283, "protein": 16.6, "fat": 23.4, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_GROUND_LAMB';
UPDATE ingredients SET nutrition = '{"calories": 204, "protein": 25.1, "fat": 10.7, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_LAMB_LEG';
UPDATE ingredients SET nutrition = '{"calories": 243, "protein": 20.9, "fat": 17.3, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_LAMB';
UPDATE ingredients SET nutrition = '{"calories": 283, "protein": 16.6, "fat": 23.4, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_LAMB_MINCE';

-- Verify
SELECT COUNT(*) as updated FROM ingredients WHERE id IN ('ING_EEL','ING_FISH_FINGERS','ING_KIPPER','ING_SMOKED_HADDOCK','ING_NATEF','ING_BRANSTON_PICKLE','ING_CUSTARD','ING_JELLY','ING_MERINGUE','ING_LAMB_KIDNEY','ING_SHERRY','ING_PORK_GELATIN','ING_TAIL_FAT','ING_SUET','ING_GROUND_LAMB','ING_LAMB_LEG','ING_LAMB','ING_LAMB_MINCE') AND nutrition IS NOT NULL AND nutrition != '{}'::jsonb;
