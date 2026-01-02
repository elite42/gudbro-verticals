-- ============================================================================
-- DENDE OIL TO PALM OIL MIGRATION
-- Date: 2025-12-26
-- Description: Replace ING_DENDE_OIL with ING_PALM_OIL (standardize naming)
-- Reason: "Dendê" is Brazilian Portuguese, should use English "Palm Oil"
-- ============================================================================

BEGIN;

-- Update all product_ingredients references
UPDATE product_ingredients
SET ingredient_id = 'ING_PALM_OIL'
WHERE ingredient_id = 'ING_DENDE_OIL';

-- Delete the duplicate ingredient
DELETE FROM ingredients WHERE id = 'ING_DENDE_OIL';

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- SELECT * FROM ingredients WHERE id IN ('ING_PALM_OIL', 'ING_DENDE_OIL');
-- SELECT * FROM product_ingredients WHERE ingredient_id = 'ING_PALM_OIL';
