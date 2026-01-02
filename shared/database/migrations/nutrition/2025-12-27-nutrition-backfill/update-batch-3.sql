-- Nutrition Backfill - Batch 3 (26 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 365, "protein": 9.3, "fat": 3.8, "carbs": 76.3, "fiber": 7.3}'::jsonb WHERE id = 'ING_CORN_MASA';
UPDATE ingredients SET nutrition = '{"calories": 381, "protein": 0.3, "fat": 0.1, "carbs": 91.3, "fiber": 0.9}'::jsonb WHERE id = 'ING_CORN_STARCH';
UPDATE ingredients SET nutrition = '{"calories": 361, "protein": 6.9, "fat": 3.9, "carbs": 76.8, "fiber": 7.3}'::jsonb WHERE id = 'ING_CORNMEAL';
UPDATE ingredients SET nutrition = '{"calories": 287, "protein": 9.5, "fat": 6.1, "carbs": 48.0, "fiber": 2.2}'::jsonb WHERE id = 'ING_EGG_BREAD';
UPDATE ingredients SET nutrition = '{"calories": 384, "protein": 14.2, "fat": 4.4, "carbs": 71.3, "fiber": 3.3}'::jsonb WHERE id = 'ING_EGG_NOODLE';
UPDATE ingredients SET nutrition = '{"calories": 268, "protein": 7.9, "fat": 3.9, "carbs": 50.4, "fiber": 2.3}'::jsonb WHERE id = 'ING_FLATBREAD';
UPDATE ingredients SET nutrition = '{"calories": 130, "protein": 2.4, "fat": 0.3, "carbs": 28.6, "fiber": 0.4}'::jsonb WHERE id = 'ING_LONTONG';
UPDATE ingredients SET nutrition = '{"calories": 440, "protein": 7.0, "fat": 11.0, "carbs": 78.0, "fiber": 1.5}'::jsonb WHERE id = 'ING_MARIE_BISCUIT';
UPDATE ingredients SET nutrition = '{"calories": 378, "protein": 11.0, "fat": 4.2, "carbs": 72.9, "fiber": 8.5}'::jsonb WHERE id = 'ING_MILLET';
UPDATE ingredients SET nutrition = '{"calories": 353, "protein": 7.5, "fat": 2.7, "carbs": 74.0, "fiber": 3.5}'::jsonb WHERE id = 'ING_OFADA_RICE';
UPDATE ingredients SET nutrition = '{"calories": 338, "protein": 10.3, "fat": 1.6, "carbs": 75.9, "fiber": 15.1}'::jsonb WHERE id = 'ING_RYE_BERRIES';
UPDATE ingredients SET nutrition = '{"calories": 259, "protein": 8.5, "fat": 3.3, "carbs": 48.3, "fiber": 5.8}'::jsonb WHERE id = 'ING_RYE_BREAD';
UPDATE ingredients SET nutrition = '{"calories": 325, "protein": 8.2, "fat": 1.8, "carbs": 72.2, "fiber": 14.6}'::jsonb WHERE id = 'ING_RYE_FLOUR';
UPDATE ingredients SET nutrition = '{"calories": 355, "protein": 0.2, "fat": 0.1, "carbs": 88.0, "fiber": 0.5}'::jsonb WHERE id = 'ING_SAGO';
UPDATE ingredients SET nutrition = '{"calories": 420, "protein": 7.5, "fat": 8.0, "carbs": 79.0, "fiber": 2.0}'::jsonb WHERE id = 'ING_WAFER';
UPDATE ingredients SET nutrition = '{"calories": 350, "protein": 12.0, "fat": 3.5, "carbs": 67.0, "fiber": 2.5}'::jsonb WHERE id = 'ING_YELLOW_NOODLE';
UPDATE ingredients SET nutrition = '{"calories": 450, "protein": 9.0, "fat": 18.0, "carbs": 63.0, "fiber": 3.0}'::jsonb WHERE id = 'ING_CHOW_MEIN_NOODLES';
UPDATE ingredients SET nutrition = '{"calories": 218, "protein": 5.7, "fat": 2.9, "carbs": 44.7, "fiber": 6.3}'::jsonb WHERE id = 'ING_CORN_TORTILLA';
UPDATE ingredients SET nutrition = '{"calories": 74, "protein": 12.8, "fat": 1.0, "carbs": 2.6, "fiber": 0.0}'::jsonb WHERE id = 'ING_CLAM';
UPDATE ingredients SET nutrition = '{"calories": 130, "protein": 26.3, "fat": 1.2, "carbs": 2.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_CONCH';
UPDATE ingredients SET nutrition = '{"calories": 70, "protein": 11.5, "fat": 0.8, "carbs": 3.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_CONCHAS_NEGRAS';
UPDATE ingredients SET nutrition = '{"calories": 158, "protein": 18.0, "fat": 9.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_HERRING';
UPDATE ingredients SET nutrition = '{"calories": 86, "protein": 11.9, "fat": 2.2, "carbs": 3.7, "fiber": 0.0}'::jsonb WHERE id = 'ING_MUSSEL';
UPDATE ingredients SET nutrition = '{"calories": 242, "protein": 27.3, "fat": 13.9, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_PORK_ROAST';
UPDATE ingredients SET nutrition = '{"calories": 208, "protein": 24.6, "fat": 11.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SARDINE';
UPDATE ingredients SET nutrition = '{"calories": 161, "protein": 18.1, "fat": 9.3, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_ANAGO';

-- Verify count
SELECT COUNT(*) as updated_count FROM ingredients
WHERE id IN ('ING_CORN_MASA', 'ING_CORN_STARCH', 'ING_CORNMEAL', 'ING_EGG_BREAD', 'ING_EGG_NOODLE', 'ING_FLATBREAD', 'ING_LONTONG', 'ING_MARIE_BISCUIT', 'ING_MILLET', 'ING_OFADA_RICE', 'ING_RYE_BERRIES', 'ING_RYE_BREAD', 'ING_RYE_FLOUR', 'ING_SAGO', 'ING_WAFER', 'ING_YELLOW_NOODLE', 'ING_CHOW_MEIN_NOODLES', 'ING_CORN_TORTILLA', 'ING_CLAM', 'ING_CONCH', 'ING_CONCHAS_NEGRAS', 'ING_HERRING', 'ING_MUSSEL', 'ING_PORK_ROAST', 'ING_SARDINE', 'ING_ANAGO')
AND nutrition IS NOT NULL;
