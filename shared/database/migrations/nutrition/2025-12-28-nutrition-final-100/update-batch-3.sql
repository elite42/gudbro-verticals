-- Nutrition Final 100% - Batch 3 (22 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 250, "protein": 24.5, "fat": 16.8, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_RIBEYE';
UPDATE ingredients SET nutrition = '{"calories": 215, "protein": 25.1, "fat": 12.7, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_STRIP';
UPDATE ingredients SET nutrition = '{"calories": 247, "protein": 24.1, "fat": 16.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_PORTERHOUSE';
UPDATE ingredients SET nutrition = '{"calories": 247, "protein": 24.1, "fat": 16.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_TBONE';
UPDATE ingredients SET nutrition = '{"calories": 305, "protein": 21.0, "fat": 24.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_PRIME_RIB';
UPDATE ingredients SET nutrition = '{"calories": 195, "protein": 24.8, "fat": 10.6, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_FLAT_IRON';
UPDATE ingredients SET nutrition = '{"calories": 155, "protein": 21.5, "fat": 7.7, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_HANGER';
UPDATE ingredients SET nutrition = '{"calories": 220, "protein": 26.0, "fat": 12.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_SKIRT';
UPDATE ingredients SET nutrition = '{"calories": 192, "protein": 26.9, "fat": 8.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_FLANK';
UPDATE ingredients SET nutrition = '{"calories": 240, "protein": 21.0, "fat": 17.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_PICANHA';
UPDATE ingredients SET nutrition = '{"calories": 371, "protein": 18.0, "fat": 33.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_SHORT_RIBS';
UPDATE ingredients SET nutrition = '{"calories": 300, "protein": 19.5, "fat": 24.8, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_RIBS';
UPDATE ingredients SET nutrition = '{"calories": 140, "protein": 22.5, "fat": 5.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_CHIANINA';
UPDATE ingredients SET nutrition = '{"calories": 200, "protein": 26.0, "fat": 10.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_ROAST';
UPDATE ingredients SET nutrition = '{"calories": 250, "protein": 18.0, "fat": 20.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BEEF_MINCE';
UPDATE ingredients SET nutrition = '{"calories": 340, "protein": 17.0, "fat": 30.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_LAMB_RACK';
UPDATE ingredients SET nutrition = '{"calories": 235, "protein": 25.0, "fat": 14.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_LAMB_CHOPS';
UPDATE ingredients SET nutrition = '{"calories": 200, "protein": 28.0, "fat": 9.8, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_LAMB_SHANK';
UPDATE ingredients SET nutrition = '{"calories": 215, "protein": 19.0, "fat": 15.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_LAMB_NECK';
UPDATE ingredients SET nutrition = '{"calories": 150, "protein": 22.0, "fat": 6.8, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_VEAL_SHANK';
UPDATE ingredients SET nutrition = '{"calories": 277, "protein": 21.4, "fat": 21.2, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_PORK_RIBS';
UPDATE ingredients SET nutrition = '{"calories": 786, "protein": 6.7, "fat": 84.4, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_BONE_MARROW';

-- Verify
SELECT COUNT(*) as updated FROM ingredients WHERE id IN ('ING_BEEF_RIBEYE','ING_BEEF_STRIP','ING_BEEF_PORTERHOUSE','ING_BEEF_TBONE','ING_BEEF_PRIME_RIB','ING_BEEF_FLAT_IRON','ING_BEEF_HANGER','ING_BEEF_SKIRT','ING_BEEF_FLANK','ING_BEEF_PICANHA','ING_BEEF_SHORT_RIBS','ING_BEEF_RIBS','ING_BEEF_CHIANINA','ING_BEEF_ROAST','ING_BEEF_MINCE','ING_LAMB_RACK','ING_LAMB_CHOPS','ING_LAMB_SHANK','ING_LAMB_NECK','ING_VEAL_SHANK','ING_PORK_RIBS','ING_BONE_MARROW') AND nutrition IS NOT NULL AND nutrition != '{}'::jsonb;
