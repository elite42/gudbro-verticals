-- Nutrition Backfill - Batch 2 (26 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 20, "protein": 2.2, "fat": 0.1, "carbs": 3.4, "fiber": 2.1}'::jsonb WHERE id = 'ING_WHITE_ASPARAGUS';
UPDATE ingredients SET nutrition = '{"calories": 44, "protein": 0.7, "fat": 0.5, "carbs": 11.5, "fiber": 2.8}'::jsonb WHERE id = 'ING_BILBERRY';
UPDATE ingredients SET nutrition = '{"calories": 51, "protein": 1.3, "fat": 0.8, "carbs": 8.6, "fiber": 5.3}'::jsonb WHERE id = 'ING_CLOUDBERRY';
UPDATE ingredients SET nutrition = '{"calories": 56, "protein": 1.4, "fat": 0.2, "carbs": 13.8, "fiber": 4.3}'::jsonb WHERE id = 'ING_CURRANT';
UPDATE ingredients SET nutrition = '{"calories": 262, "protein": 1.9, "fat": 0.6, "carbs": 69.7, "fiber": 7.5}'::jsonb WHERE id = 'ING_DRIED_PEAR';
UPDATE ingredients SET nutrition = '{"calories": 124, "protein": 1.5, "fat": 0.5, "carbs": 32.1, "fiber": 5.4}'::jsonb WHERE id = 'ING_MAMEY';
UPDATE ingredients SET nutrition = '{"calories": 540, "protein": 1.9, "fat": 58.4, "carbs": 5.5, "fiber": 3.2}'::jsonb WHERE id = 'ING_PALM_FRUIT';
UPDATE ingredients SET nutrition = '{"calories": 23, "protein": 2.1, "fat": 0.5, "carbs": 3.7, "fiber": 2.8}'::jsonb WHERE id = 'ING_CORIANDER_ROOT';
UPDATE ingredients SET nutrition = '{"calories": 271, "protein": 12.7, "fat": 7.0, "carbs": 60.6, "fiber": 40.3}'::jsonb WHERE id = 'ING_MARJORAM';
UPDATE ingredients SET nutrition = '{"calories": 45, "protein": 2.8, "fat": 0.5, "carbs": 7.2, "fiber": 3.4}'::jsonb WHERE id = 'ING_SCENT_LEAF';
UPDATE ingredients SET nutrition = '{"calories": 54, "protein": 4.2, "fat": 0.8, "carbs": 8.5, "fiber": 4.1}'::jsonb WHERE id = 'ING_UTAZI_LEAF';
UPDATE ingredients SET nutrition = '{"calories": 350, "protein": 8.0, "fat": 12.0, "carbs": 52.0, "fiber": 25.0}'::jsonb WHERE id = 'ING_BANGA_SPICE';
UPDATE ingredients SET nutrition = '{"calories": 480, "protein": 7.5, "fat": 28.0, "carbs": 49.0, "fiber": 15.0}'::jsonb WHERE id = 'ING_CALABASH_NUTMEG';
UPDATE ingredients SET nutrition = '{"calories": 320, "protein": 11.0, "fat": 9.0, "carbs": 50.0, "fiber": 22.0}'::jsonb WHERE id = 'ING_COLOMBO_SPICE';
UPDATE ingredients SET nutrition = '{"calories": 108, "protein": 6.1, "fat": 1.0, "carbs": 18.7, "fiber": 6.4}'::jsonb WHERE id = 'ING_CURRY_LEAF';
UPDATE ingredients SET nutrition = '{"calories": 480, "protein": 7.5, "fat": 28.0, "carbs": 49.0, "fiber": 15.0}'::jsonb WHERE id = 'ING_EHURU';
UPDATE ingredients SET nutrition = '{"calories": 380, "protein": 28.0, "fat": 22.0, "carbs": 18.0, "fiber": 5.0}'::jsonb WHERE id = 'ING_OGIRI';
UPDATE ingredients SET nutrition = '{"calories": 290, "protein": 9.5, "fat": 8.0, "carbs": 45.0, "fiber": 28.0}'::jsonb WHERE id = 'ING_PEPPER_SOUP_SPICE';
UPDATE ingredients SET nutrition = '{"calories": 40, "protein": 1.9, "fat": 0.4, "carbs": 8.8, "fiber": 1.5}'::jsonb WHERE id = 'ING_PIRI_PIRI';
UPDATE ingredients SET nutrition = '{"calories": 315, "protein": 6.0, "fat": 14.0, "carbs": 41.0, "fiber": 30.0}'::jsonb WHERE id = 'ING_SPECULAAS_SPICE';
UPDATE ingredients SET nutrition = '{"calories": 410, "protein": 25.0, "fat": 28.0, "carbs": 15.0, "fiber": 8.0}'::jsonb WHERE id = 'ING_SUYA_SPICE';
UPDATE ingredients SET nutrition = '{"calories": 42, "protein": 2.5, "fat": 0.6, "carbs": 7.0, "fiber": 3.0}'::jsonb WHERE id = 'ING_TURMERIC_LEAF';
UPDATE ingredients SET nutrition = '{"calories": 320, "protein": 11.0, "fat": 8.0, "carbs": 51.0, "fiber": 26.0}'::jsonb WHERE id = 'ING_UZIZA_SEED';
UPDATE ingredients SET nutrition = '{"calories": 343, "protein": 13.3, "fat": 3.4, "carbs": 71.5, "fiber": 10.0}'::jsonb WHERE id = 'ING_BUCKWHEAT';
UPDATE ingredients SET nutrition = '{"calories": 348, "protein": 0.3, "fat": 0.1, "carbs": 86.5, "fiber": 0.5}'::jsonb WHERE id = 'ING_CASSAVA_STARCH';
UPDATE ingredients SET nutrition = '{"calories": 361, "protein": 6.9, "fat": 3.9, "carbs": 76.8, "fiber": 7.3}'::jsonb WHERE id = 'ING_CORN_FLOUR';

-- Verify count
SELECT COUNT(*) as updated_count FROM ingredients
WHERE id IN ('ING_WHITE_ASPARAGUS', 'ING_BILBERRY', 'ING_CLOUDBERRY', 'ING_CURRANT', 'ING_DRIED_PEAR', 'ING_MAMEY', 'ING_PALM_FRUIT', 'ING_CORIANDER_ROOT', 'ING_MARJORAM', 'ING_SCENT_LEAF', 'ING_UTAZI_LEAF', 'ING_BANGA_SPICE', 'ING_CALABASH_NUTMEG', 'ING_COLOMBO_SPICE', 'ING_CURRY_LEAF', 'ING_EHURU', 'ING_OGIRI', 'ING_PEPPER_SOUP_SPICE', 'ING_PIRI_PIRI', 'ING_SPECULAAS_SPICE', 'ING_SUYA_SPICE', 'ING_TURMERIC_LEAF', 'ING_UZIZA_SEED', 'ING_BUCKWHEAT', 'ING_CASSAVA_STARCH', 'ING_CORN_FLOUR')
AND nutrition IS NOT NULL;
