-- Nutrition Final 100% - Batch 1 (18 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 57, "protein": 0.4, "fat": 0.1, "carbs": 15.2, "fiber": 3.1}'::jsonb WHERE id = 'ING_PEAR';
UPDATE ingredients SET nutrition = '{"calories": 75, "protein": 1.2, "fat": 0.3, "carbs": 18.0, "fiber": 4.9}'::jsonb WHERE id = 'ING_PARSNIP';
UPDATE ingredients SET nutrition = '{"calories": 37, "protein": 1.1, "fat": 0.2, "carbs": 8.6, "fiber": 2.3}'::jsonb WHERE id = 'ING_SWEDE';
UPDATE ingredients SET nutrition = '{"calories": 23, "protein": 2.1, "fat": 0.5, "carbs": 3.7, "fiber": 2.8}'::jsonb WHERE id = 'ING_CORIANDER';
UPDATE ingredients SET nutrition = '{"calories": 508, "protein": 26.1, "fat": 36.2, "carbs": 19.7, "fiber": 12.2}'::jsonb WHERE id = 'ING_MUSTARD_POWDER';
UPDATE ingredients SET nutrition = '{"calories": 251, "protein": 10.4, "fat": 3.3, "carbs": 64.0, "fiber": 25.3}'::jsonb WHERE id = 'ING_PEPPERCORN';
UPDATE ingredients SET nutrition = '{"calories": 23, "protein": 3.1, "fat": 0.6, "carbs": 2.7, "fiber": 1.6}'::jsonb WHERE id = 'ING_BESOBELA';
UPDATE ingredients SET nutrition = '{"calories": 260, "protein": 8.5, "fat": 1.5, "carbs": 53.0, "fiber": 2.4}'::jsonb WHERE id = 'ING_PIDE_BREAD';
UPDATE ingredients SET nutrition = '{"calories": 395, "protein": 13.4, "fat": 5.3, "carbs": 71.9, "fiber": 4.5}'::jsonb WHERE id = 'ING_BREADCRUMBS';
UPDATE ingredients SET nutrition = '{"calories": 478, "protein": 7.0, "fat": 21.0, "carbs": 62.0, "fiber": 3.6}'::jsonb WHERE id = 'ING_DIGESTIVE_BISCUIT';
UPDATE ingredients SET nutrition = '{"calories": 0, "protein": 0.0, "fat": 0.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_B_VITAMINS';
UPDATE ingredients SET nutrition = '{"calories": 350, "protein": 12.0, "fat": 1.5, "carbs": 72.0, "fiber": 2.5}'::jsonb WHERE id = 'ING_NURUK';
UPDATE ingredients SET nutrition = '{"calories": 355, "protein": 11.5, "fat": 1.8, "carbs": 73.0, "fiber": 2.8}'::jsonb WHERE id = 'ING_QU';
UPDATE ingredients SET nutrition = '{"calories": 18, "protein": 2.5, "fat": 0.8, "carbs": 0.2, "fiber": 0.0}'::jsonb WHERE id = 'ING_LAMB_STOCK';
UPDATE ingredients SET nutrition = '{"calories": 0, "protein": 0.0, "fat": 0.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_NOBLE_HOPS';
UPDATE ingredients SET nutrition = '{"calories": 101, "protein": 5.6, "fat": 1.7, "carbs": 24.5, "fiber": 14.0}'::jsonb WHERE id = 'ING_THYME';
UPDATE ingredients SET nutrition = '{"calories": 0, "protein": 0.0, "fat": 0.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BIJAO_LEAVES';
UPDATE ingredients SET nutrition = '{"calories": 320, "protein": 14.0, "fat": 28.0, "carbs": 3.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SAUSAGE_MEAT';

-- Verify
SELECT COUNT(*) as updated FROM ingredients WHERE id IN ('ING_PEAR','ING_PARSNIP','ING_SWEDE','ING_CORIANDER','ING_MUSTARD_POWDER','ING_PEPPERCORN','ING_BESOBELA','ING_PIDE_BREAD','ING_BREADCRUMBS','ING_DIGESTIVE_BISCUIT','ING_B_VITAMINS','ING_NURUK','ING_QU','ING_LAMB_STOCK','ING_NOBLE_HOPS','ING_THYME','ING_BIJAO_LEAVES','ING_SAUSAGE_MEAT') AND nutrition IS NOT NULL AND nutrition != '{}'::jsonb;
