-- Nutrition Backfill Final - Batch 8 (19 ingredienti)
-- Generated: 2025-12-28
-- Source: Gemini/ChatGPT AI-assisted

UPDATE ingredients SET nutrition = '{"calories": 31, "protein": 1.2, "fat": 0.2, "carbs": 7.3, "fiber": 3.1}'::jsonb WHERE id = 'ING_FENNEL';
UPDATE ingredients SET nutrition = '{"calories": 16, "protein": 3.0, "fat": 0.4, "carbs": 0.1, "fiber": 0.0}'::jsonb WHERE id = 'ING_FISH_STOCK';
UPDATE ingredients SET nutrition = '{"calories": 71, "protein": 1.2, "fat": 1.0, "carbs": 15.0, "fiber": 2.0}'::jsonb WHERE id = 'ING_GALANGAL';
UPDATE ingredients SET nutrition = '{"calories": 320, "protein": 13.0, "fat": 13.0, "carbs": 50.0, "fiber": 30.0}'::jsonb WHERE id = 'ING_GARAM_MASALA';
UPDATE ingredients SET nutrition = '{"calories": 332, "protein": 16.6, "fat": 0.7, "carbs": 72.7, "fiber": 9.0}'::jsonb WHERE id = 'ING_GARLIC_POWDER';
UPDATE ingredients SET nutrition = '{"calories": 120, "protein": 3.0, "fat": 6.0, "carbs": 14.0, "fiber": 5.0}'::jsonb WHERE id = 'ING_GREEN_CURRY_PASTE';
UPDATE ingredients SET nutrition = '{"calories": 111, "protein": 22.5, "fat": 1.6, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_HALIBUT';
UPDATE ingredients SET nutrition = '{"calories": 275, "protein": 8.0, "fat": 7.0, "carbs": 45.0, "fiber": 38.0}'::jsonb WHERE id = 'ING_HERBS_PROVENCE';
UPDATE ingredients SET nutrition = '{"calories": 0, "protein": 0.0, "fat": 0.0, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_ICE_WATER';
UPDATE ingredients SET nutrition = '{"calories": 320, "protein": 12.0, "fat": 15.0, "carbs": 55.0, "fiber": 25.0}'::jsonb WHERE id = 'ING_KASHMIRI_CHILI';
UPDATE ingredients SET nutrition = '{"calories": 357, "protein": 12.5, "fat": 1.5, "carbs": 73.0, "fiber": 3.0}'::jsonb WHERE id = 'ING_LINGUINE';
UPDATE ingredients SET nutrition = '{"calories": 76, "protein": 14.5, "fat": 1.5, "carbs": 0.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_MONKFISH';
UPDATE ingredients SET nutrition = '{"calories": 90, "protein": 19.0, "fat": 1.2, "carbs": 0.5, "fiber": 0.0}'::jsonb WHERE id = 'ING_MUD_CRAB';
UPDATE ingredients SET nutrition = '{"calories": 33, "protein": 1.9, "fat": 0.2, "carbs": 7.5, "fiber": 3.2}'::jsonb WHERE id = 'ING_OKRA';
UPDATE ingredients SET nutrition = '{"calories": 125, "protein": 0.0, "fat": 0.0, "carbs": 25.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_OLD_BAY';
UPDATE ingredients SET nutrition = '{"calories": 47, "protein": 0.9, "fat": 0.1, "carbs": 11.8, "fiber": 2.4}'::jsonb WHERE id = 'ING_ORANGE';
UPDATE ingredients SET nutrition = '{"calories": 81, "protein": 9.5, "fat": 2.3, "carbs": 5.0, "fiber": 0.0}'::jsonb WHERE id = 'ING_OYSTER';
UPDATE ingredients SET nutrition = '{"calories": 360, "protein": 12.0, "fat": 2.0, "carbs": 74.0, "fiber": 3.0}'::jsonb WHERE id = 'ING_PANKO';
UPDATE ingredients SET nutrition = '{"calories": 350, "protein": 10.0, "fat": 12.0, "carbs": 50.0, "fiber": 25.0}'::jsonb WHERE id = 'ING_PINK_PEPPERCORN';

-- Verify
SELECT COUNT(*) as updated FROM ingredients WHERE id IN ('ING_FENNEL','ING_FISH_STOCK','ING_GALANGAL','ING_GARAM_MASALA','ING_GARLIC_POWDER','ING_GREEN_CURRY_PASTE','ING_HALIBUT','ING_HERBS_PROVENCE','ING_ICE_WATER','ING_KASHMIRI_CHILI','ING_LINGUINE','ING_MONKFISH','ING_MUD_CRAB','ING_OKRA','ING_OLD_BAY','ING_ORANGE','ING_OYSTER','ING_PANKO','ING_PINK_PEPPERCORN') AND nutrition != '{}'::jsonb;
