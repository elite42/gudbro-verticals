-- Nutrition Backfill Final - Batch 9 (18 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 40, "protein": 1.9, "fat": 0.4, "carbs": 8.8, "fiber": 1.5}'::jsonb WHERE id = 'ING_PIRI_PIRI_CHILI';
UPDATE ingredients SET nutrition = '{"calories": 94, "protein": 18.8, "fat": 1.6, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_ROCKFISH';
UPDATE ingredients SET nutrition = '{"calories": 578, "protein": 5.2, "fat": 45.4, "carbs": 38.0, "fiber": 1.3}'::jsonb WHERE id = 'ING_ROUX';
UPDATE ingredients SET nutrition = '{"calories": 134, "protein": 0.5, "fat": 0.0, "carbs": 5.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SAKE';
UPDATE ingredients SET nutrition = '{"calories": 290, "protein": 63.0, "fat": 4.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SALT_COD';
UPDATE ingredients SET nutrition = '{"calories": 40, "protein": 2.0, "fat": 0.4, "carbs": 9.0, "fiber": 1.5}'::jsonb WHERE id = 'ING_SCOTCH_BONNET';
UPDATE ingredients SET nutrition = '{"calories": 97, "protein": 18.4, "fat": 2.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SEA_BASS';
UPDATE ingredients SET nutrition = '{"calories": 32, "protein": 1.7, "fat": 0.4, "carbs": 7.0, "fiber": 3.7}'::jsonb WHERE id = 'ING_SERRANO';
UPDATE ingredients SET nutrition = '{"calories": 315, "protein": 11.5, "fat": 9.0, "carbs": 52.0, "fiber": 26.0}'::jsonb WHERE id = 'ING_SEVEN_SPICE';
UPDATE ingredients SET nutrition = '{"calories": 330, "protein": 12.0, "fat": 11.0, "carbs": 50.0, "fiber": 28.0}'::jsonb WHERE id = 'ING_SHAWARMA_SPICE';
UPDATE ingredients SET nutrition = '{"calories": 285, "protein": 11.8, "fat": 8.1, "carbs": 41.5, "fiber": 14.8}'::jsonb WHERE id = 'ING_SICHUAN_PEPPER';
UPDATE ingredients SET nutrition = '{"calories": 282, "protein": 14.1, "fat": 12.9, "carbs": 53.9, "fiber": 34.9}'::jsonb WHERE id = 'ING_SMOKED_PAPRIKA';
UPDATE ingredients SET nutrition = '{"calories": 91, "protein": 18.8, "fat": 1.2, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SOLE';
UPDATE ingredients SET nutrition = '{"calories": 144, "protein": 19.7, "fat": 6.7, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_SWORDFISH';
UPDATE ingredients SET nutrition = '{"calories": 355, "protein": 9.0, "fat": 1.5, "carbs": 76.0, "fiber": 2.0}'::jsonb WHERE id = 'ING_TEMPURA_FLOUR';
UPDATE ingredients SET nutrition = '{"calories": 141, "protein": 19.9, "fat": 6.2, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_TROUT';
UPDATE ingredients SET nutrition = '{"calories": 90, "protein": 18.0, "fat": 1.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_WHITE_FISH';
UPDATE ingredients SET nutrition = '{"calories": 198, "protein": 10.0, "fat": 6.0, "carbs": 26.0, "fiber": 5.0}'::jsonb WHERE id = 'ING_WHITE_MISO';

-- Verify
SELECT COUNT(*) as updated FROM ingredients WHERE id IN ('ING_PIRI_PIRI_CHILI','ING_ROCKFISH','ING_ROUX','ING_SAKE','ING_SALT_COD','ING_SCOTCH_BONNET','ING_SEA_BASS','ING_SERRANO','ING_SEVEN_SPICE','ING_SHAWARMA_SPICE','ING_SICHUAN_PEPPER','ING_SMOKED_PAPRIKA','ING_SOLE','ING_SWORDFISH','ING_TEMPURA_FLOUR','ING_TROUT','ING_WHITE_FISH','ING_WHITE_MISO') AND nutrition != '{}'::jsonb;
