-- =============================================================================
-- MIGRATION: Move chicken, duck, turkey, goose to poultry category
-- Date: 2025-12-27
-- =============================================================================

UPDATE ingredients SET category = 'poultry' WHERE id IN (
  -- CHICKEN
  'ING_CHICKEN',
  'ING_CHICKEN_BONES',
  'ING_CHICKEN_BREAST',
  'ING_CHICKEN_FEET',
  'ING_CHICKEN_GRILLED',
  'ING_CHICKEN_LEG',
  'ING_CHICKEN_PIECES',
  'ING_CHICKEN_SKIN',
  'ING_CHICKEN_THIGH',
  'ING_CHICKEN_WINGS',
  'ING_WHOLE_CHICKEN',
  'ING_GROUND_CHICKEN',
  'ING_FRIED_CHICKEN',
  'ING_GRILLED_CHICKEN',
  'ING_TANDOORI_CHICKEN',
  'ING_CHICKEN_SHAWARMA',

  -- DUCK
  'ING_DUCK',
  'ING_DUCK_BONES',
  'ING_DUCK_BREAST',
  'ING_DUCK_LEG',
  'ING_DUCK_WHOLE',

  -- TURKEY
  'ING_TURKEY',
  'ING_TURKEY_BREAST',

  -- GOOSE
  'ING_GOOSE',

  -- OTHER POULTRY
  'ING_HEN',
  'ING_PIGEON',
  'ING_FOIE_GRAS'  -- Duck/goose liver, but traditionally classified as poultry product
);

-- Count: Expected ~30 items
-- SELECT COUNT(*) as poultry_count FROM ingredients WHERE category = 'poultry';
