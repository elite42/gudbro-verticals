-- Nutrition Backfill Final - Batch 7 (19 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 40, "protein": 2.0, "fat": 0.4, "carbs": 9.0, "fiber": 2.0}'::jsonb WHERE id = 'ING_AJI_AMARILLO';
UPDATE ingredients SET nutrition = '{"calories": 263, "protein": 6.1, "fat": 8.7, "carbs": 72.1, "fiber": 21.6}'::jsonb WHERE id = 'ING_ALLSPICE';
UPDATE ingredients SET nutrition = '{"calories": 21, "protein": 0.0, "fat": 0.0, "carbs": 0.9, "fiber": 0.0}'::jsonb WHERE id = 'ING_APPLE_CIDER_VINEGAR';
UPDATE ingredients SET nutrition = '{"calories": 354, "protein": 7.0, "fat": 0.5, "carbs": 80.0, "fiber": 1.0}'::jsonb WHERE id = 'ING_ARBORIO_RICE';
UPDATE ingredients SET nutrition = '{"calories": 43, "protein": 0.5, "fat": 0.0, "carbs": 3.6, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEER';
UPDATE ingredients SET nutrition = '{"calories": 97, "protein": 18.4, "fat": 2.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BRANZINO';
UPDATE ingredients SET nutrition = '{"calories": 310, "protein": 9.0, "fat": 9.5, "carbs": 47.0, "fiber": 1.5}'::jsonb WHERE id = 'ING_BRIOCHE_BUN';
UPDATE ingredients SET nutrition = '{"calories": 282, "protein": 11.0, "fat": 9.5, "carbs": 38.0, "fiber": 18.0}'::jsonb WHERE id = 'ING_CAJUN_SPICE';
UPDATE ingredients SET nutrition = '{"calories": 333, "protein": 19.8, "fat": 14.6, "carbs": 49.9, "fiber": 38.0}'::jsonb WHERE id = 'ING_CARAWAY';
UPDATE ingredients SET nutrition = '{"calories": 105, "protein": 15.0, "fat": 4.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_CATFISH';
UPDATE ingredients SET nutrition = '{"calories": 282, "protein": 13.5, "fat": 14.3, "carbs": 49.7, "fiber": 34.8}'::jsonb WHERE id = 'ING_CHILI_POWDER';
UPDATE ingredients SET nutrition = '{"calories": 94, "protein": 2.1, "fat": 0.2, "carbs": 21.0, "fiber": 1.5}'::jsonb WHERE id = 'ING_CHILI_SAUCE';
UPDATE ingredients SET nutrition = '{"calories": 375, "protein": 19.5, "fat": 32.0, "carbs": 2.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_CHOURICO';
UPDATE ingredients SET nutrition = '{"calories": 0, "protein": 0.0, "fat": 0.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_COARSE_SALT';
UPDATE ingredients SET nutrition = '{"calories": 82, "protein": 17.8, "fat": 0.7, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_COD';
UPDATE ingredients SET nutrition = '{"calories": 84, "protein": 18.1, "fat": 1.1, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_CRAB';
UPDATE ingredients SET nutrition = '{"calories": 77, "protein": 15.9, "fat": 1.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_CRAWFISH';
UPDATE ingredients SET nutrition = '{"calories": 324, "protein": 10.6, "fat": 5.8, "carbs": 69.9, "fiber": 28.7}'::jsonb WHERE id = 'ING_DRIED_PEPPERS';
UPDATE ingredients SET nutrition = '{"calories": 86, "protein": 17.4, "fat": 1.0, "carbs": 1.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_DUNGENESS_CRAB';

-- Verify
SELECT COUNT(*) as updated FROM ingredients WHERE id IN ('ING_AJI_AMARILLO','ING_ALLSPICE','ING_APPLE_CIDER_VINEGAR','ING_ARBORIO_RICE','ING_BEER','ING_BRANZINO','ING_BRIOCHE_BUN','ING_CAJUN_SPICE','ING_CARAWAY','ING_CATFISH','ING_CHILI_POWDER','ING_CHILI_SAUCE','ING_CHOURICO','ING_COARSE_SALT','ING_COD','ING_CRAB','ING_CRAWFISH','ING_DRIED_PEPPERS','ING_DUNGENESS_CRAB') AND nutrition != '{}'::jsonb;
