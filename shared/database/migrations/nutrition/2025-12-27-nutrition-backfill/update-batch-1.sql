-- Nutrition Backfill - Batch 1 (26 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 50, "protein": 0.5, "fat": 0.0, "carbs": 4.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_BELGIAN_BEER';
UPDATE ingredients SET nutrition = '{"calories": 45, "protein": 0.3, "fat": 0.0, "carbs": 3.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_GUEUZE_BEER';
UPDATE ingredients SET nutrition = '{"calories": 467, "protein": 1.5, "fat": 50.5, "carbs": 1.6, "fiber": 0.0}'::jsonb WHERE id = 'ING_DOUBLE_CREAM';
UPDATE ingredients SET nutrition = '{"calories": 61, "protein": 3.3, "fat": 3.5, "carbs": 4.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_KEFIR';
UPDATE ingredients SET nutrition = '{"calories": 95, "protein": 2.8, "fat": 2.6, "carbs": 15.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_VLA';
UPDATE ingredients SET nutrition = '{"calories": 52, "protein": 4.0, "fat": 0.8, "carbs": 7.5, "fiber": 3.2}'::jsonb WHERE id = 'ING_AFANG_LEAF';
UPDATE ingredients SET nutrition = '{"calories": 112, "protein": 1.5, "fat": 0.2, "carbs": 26.5, "fiber": 4.1}'::jsonb WHERE id = 'ING_COCOYAM';
UPDATE ingredients SET nutrition = '{"calories": 32, "protein": 3.0, "fat": 0.6, "carbs": 5.4, "fiber": 4.0}'::jsonb WHERE id = 'ING_COLLARD_GREENS';
UPDATE ingredients SET nutrition = '{"calories": 86, "protein": 3.2, "fat": 1.2, "carbs": 18.7, "fiber": 2.0}'::jsonb WHERE id = 'ING_CORN';
UPDATE ingredients SET nutrition = '{"calories": 86, "protein": 3.2, "fat": 1.2, "carbs": 18.7, "fiber": 2.0}'::jsonb WHERE id = 'ING_CORN_KERNELS';
UPDATE ingredients SET nutrition = '{"calories": 86, "protein": 3.2, "fat": 1.2, "carbs": 18.7, "fiber": 2.0}'::jsonb WHERE id = 'ING_CORN_COB';
UPDATE ingredients SET nutrition = '{"calories": 15, "protein": 0.7, "fat": 0.1, "carbs": 2.3, "fiber": 1.1}'::jsonb WHERE id = 'ING_CORNICHONS';
UPDATE ingredients SET nutrition = '{"calories": 11, "protein": 0.3, "fat": 0.2, "carbs": 2.3, "fiber": 1.1}'::jsonb WHERE id = 'ING_DILL_PICKLE';
UPDATE ingredients SET nutrition = '{"calories": 286, "protein": 22.0, "fat": 2.5, "carbs": 44.0, "fiber": 21.0}'::jsonb WHERE id = 'ING_DRIED_MUSHROOM';
UPDATE ingredients SET nutrition = '{"calories": 81, "protein": 5.4, "fat": 0.4, "carbs": 14.5, "fiber": 5.1}'::jsonb WHERE id = 'ING_PEA';
UPDATE ingredients SET nutrition = '{"calories": 122, "protein": 1.3, "fat": 0.4, "carbs": 31.9, "fiber": 2.3}'::jsonb WHERE id = 'ING_GREEN_PLANTAIN';
UPDATE ingredients SET nutrition = '{"calories": 34, "protein": 4.5, "fat": 0.3, "carbs": 5.8, "fiber": 2.0}'::jsonb WHERE id = 'ING_JUTE_LEAF';
UPDATE ingredients SET nutrition = '{"calories": 48, "protein": 3.8, "fat": 0.7, "carbs": 7.0, "fiber": 3.0}'::jsonb WHERE id = 'ING_OHA_LEAF';
UPDATE ingredients SET nutrition = '{"calories": 55, "protein": 2.3, "fat": 0.6, "carbs": 12.0, "fiber": 4.3}'::jsonb WHERE id = 'ING_PARSLEY_ROOT';
UPDATE ingredients SET nutrition = '{"calories": 124, "protein": 10.0, "fat": 2.0, "carbs": 15.0, "fiber": 3.5}'::jsonb WHERE id = 'ING_PETAI';
UPDATE ingredients SET nutrition = '{"calories": 65, "protein": 0.8, "fat": 0.1, "carbs": 16.0, "fiber": 1.6}'::jsonb WHERE id = 'ING_PICKLED_BEET';
UPDATE ingredients SET nutrition = '{"calories": 12, "protein": 0.5, "fat": 0.1, "carbs": 2.5, "fiber": 1.0}'::jsonb WHERE id = 'ING_PICKLED_CUCUMBER';
UPDATE ingredients SET nutrition = '{"calories": 19, "protein": 2.0, "fat": 0.3, "carbs": 3.3, "fiber": 1.8}'::jsonb WHERE id = 'ING_PUMPKIN_LEAF';
UPDATE ingredients SET nutrition = '{"calories": 122, "protein": 1.3, "fat": 0.4, "carbs": 31.9, "fiber": 2.3}'::jsonb WHERE id = 'ING_RIPE_PLANTAIN';
UPDATE ingredients SET nutrition = '{"calories": 31, "protein": 1.0, "fat": 0.2, "carbs": 6.5, "fiber": 2.5}'::jsonb WHERE id = 'ING_TORCH_GINGER';
UPDATE ingredients SET nutrition = '{"calories": 25, "protein": 2.4, "fat": 0.4, "carbs": 4.4, "fiber": 1.5}'::jsonb WHERE id = 'ING_WATERLEAF';

-- Verify count
SELECT COUNT(*) as updated_count FROM ingredients
WHERE id IN ('ING_BELGIAN_BEER', 'ING_GUEUZE_BEER', 'ING_DOUBLE_CREAM', 'ING_KEFIR', 'ING_VLA', 'ING_AFANG_LEAF', 'ING_COCOYAM', 'ING_COLLARD_GREENS', 'ING_CORN', 'ING_CORN_KERNELS', 'ING_CORN_COB', 'ING_CORNICHONS', 'ING_DILL_PICKLE', 'ING_DRIED_MUSHROOM', 'ING_PEA', 'ING_GREEN_PLANTAIN', 'ING_JUTE_LEAF', 'ING_OHA_LEAF', 'ING_PARSLEY_ROOT', 'ING_PETAI', 'ING_PICKLED_BEET', 'ING_PICKLED_CUCUMBER', 'ING_PUMPKIN_LEAF', 'ING_RIPE_PLANTAIN', 'ING_TORCH_GINGER', 'ING_WATERLEAF')
AND nutrition IS NOT NULL;
