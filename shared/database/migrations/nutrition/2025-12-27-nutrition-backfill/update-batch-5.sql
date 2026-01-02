-- Nutrition Backfill - Batch 5 (26 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 255, "protein": 0.0, "fat": 0.0, "carbs": 64.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_ROSE_SYRUP';
UPDATE ingredients SET nutrition = '{"calories": 628, "protein": 11.0, "fat": 63.0, "carbs": 7.0, "fiber": 3.0}'::jsonb WHERE id = 'ING_CANDLENUT';
UPDATE ingredients SET nutrition = '{"calories": 472, "protein": 10.5, "fat": 43.0, "carbs": 12.0, "fiber": 4.5}'::jsonb WHERE id = 'ING_KELUAK';
UPDATE ingredients SET nutrition = '{"calories": 673, "protein": 13.7, "fat": 68.4, "carbs": 13.1, "fiber": 3.7}'::jsonb WHERE id = 'ING_PINE_NUT';
UPDATE ingredients SET nutrition = '{"calories": 573, "protein": 17.7, "fat": 49.7, "carbs": 23.4, "fiber": 11.8}'::jsonb WHERE id = 'ING_SESAME';
UPDATE ingredients SET nutrition = '{"calories": 139, "protein": 9.2, "fat": 0.5, "carbs": 24.5, "fiber": 8.0}'::jsonb WHERE id = 'ING_BROWN_BEAN';
UPDATE ingredients SET nutrition = '{"calories": 343, "protein": 23.5, "fat": 1.5, "carbs": 60.0, "fiber": 16.0}'::jsonb WHERE id = 'ING_HONEY_BEANS';
UPDATE ingredients SET nutrition = '{"calories": 127, "protein": 8.7, "fat": 0.5, "carbs": 22.8, "fiber": 7.4}'::jsonb WHERE id = 'ING_RED_BEAN';
UPDATE ingredients SET nutrition = '{"calories": 139, "protein": 9.7, "fat": 0.4, "carbs": 25.1, "fiber": 6.3}'::jsonb WHERE id = 'ING_WHITE_BEAN';
UPDATE ingredients SET nutrition = '{"calories": 306, "protein": 6.2, "fat": 0.3, "carbs": 80.9, "fiber": 7.7}'::jsonb WHERE id = 'ING_AGAR';
UPDATE ingredients SET nutrition = '{"calories": 37, "protein": 2.1, "fat": 0.3, "carbs": 6.5, "fiber": 2.0}'::jsonb WHERE id = 'ING_BUTTERFLY_PEA';
UPDATE ingredients SET nutrition = '{"calories": 308, "protein": 0.4, "fat": 0.2, "carbs": 81.0, "fiber": 4.0}'::jsonb WHERE id = 'ING_CANDIED_LEMON';
UPDATE ingredients SET nutrition = '{"calories": 480, "protein": 5.0, "fat": 18.0, "carbs": 74.0, "fiber": 1.5}'::jsonb WHERE id = 'ING_COOKIE_CRUMB';
UPDATE ingredients SET nutrition = '{"calories": 450, "protein": 4.1, "fat": 22.0, "carbs": 59.0, "fiber": 1.0}'::jsonb WHERE id = 'ING_COOKIE_DOUGH';
UPDATE ingredients SET nutrition = '{"calories": 0, "protein": 0.0, "fat": 0.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_CORN_HUSK';
UPDATE ingredients SET nutrition = '{"calories": 170, "protein": 2.0, "fat": 0.0, "carbs": 85.0, "fiber": 85.0}'::jsonb WHERE id = 'ING_GUM_ARABIC';
UPDATE ingredients SET nutrition = '{"calories": 600, "protein": 6.0, "fat": 57.0, "carbs": 15.0, "fiber": 9.0}'::jsonb WHERE id = 'ING_KERISIK';
UPDATE ingredients SET nutrition = '{"calories": 50, "protein": 0.2, "fat": 0.1, "carbs": 12.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_PALM_SAP';
UPDATE ingredients SET nutrition = '{"calories": 162, "protein": 0.0, "fat": 0.0, "carbs": 16.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_PASSOA';
UPDATE ingredients SET nutrition = '{"calories": 0, "protein": 0.0, "fat": 0.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_POTASH';
UPDATE ingredients SET nutrition = '{"calories": 536, "protein": 7.0, "fat": 34.6, "carbs": 52.9, "fiber": 4.8}'::jsonb WHERE id = 'ING_POTATO_CHIP';
UPDATE ingredients SET nutrition = '{"calories": 381, "protein": 0.3, "fat": 0.1, "carbs": 91.3, "fiber": 0.9}'::jsonb WHERE id = 'ING_CORNSTARCH';
UPDATE ingredients SET nutrition = '{"calories": 540, "protein": 5.0, "fat": 33.0, "carbs": 55.0, "fiber": 7.0}'::jsonb WHERE id = 'ING_BELGIAN_CHOCOLATE';
UPDATE ingredients SET nutrition = '{"calories": 485, "protein": 5.5, "fat": 21.0, "carbs": 68.0, "fiber": 1.5}'::jsonb WHERE id = 'ING_COOKIE';
UPDATE ingredients SET nutrition = '{"calories": 298, "protein": 12.4, "fat": 17.8, "carbs": 55.0, "fiber": 41.9}'::jsonb WHERE id = 'ING_CORIANDER_SEEDS';
UPDATE ingredients SET nutrition = '{"calories": 717, "protein": 0.2, "fat": 81.0, "carbs": 0.7, "fiber": 0.0}'::jsonb WHERE id = 'ING_MARGARINE';

-- Verify count
SELECT COUNT(*) as updated_count FROM ingredients
WHERE id IN ('ING_ROSE_SYRUP', 'ING_CANDLENUT', 'ING_KELUAK', 'ING_PINE_NUT', 'ING_SESAME', 'ING_BROWN_BEAN', 'ING_HONEY_BEANS', 'ING_RED_BEAN', 'ING_WHITE_BEAN', 'ING_AGAR', 'ING_BUTTERFLY_PEA', 'ING_CANDIED_LEMON', 'ING_COOKIE_CRUMB', 'ING_COOKIE_DOUGH', 'ING_CORN_HUSK', 'ING_GUM_ARABIC', 'ING_KERISIK', 'ING_PALM_SAP', 'ING_PASSOA', 'ING_POTASH', 'ING_POTATO_CHIP', 'ING_CORNSTARCH', 'ING_BELGIAN_CHOCOLATE', 'ING_COOKIE', 'ING_CORIANDER_SEEDS', 'ING_MARGARINE')
AND nutrition IS NOT NULL;
