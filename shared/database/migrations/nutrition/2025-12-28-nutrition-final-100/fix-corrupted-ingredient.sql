-- Fix: Delete corrupted ingredient ING_PASSO (encoding issue)
-- Date: 2025-12-28
-- Reason: Record with corrupted encoding, not used by any product
-- Duplicate of: ING_PASSION_FRUIT_LIQUEUR (which is properly named and has nutrition)

-- Verify it's not used (should return 0)
SELECT COUNT(*) as usage_count
FROM product_ingredients
WHERE ingredient_id LIKE 'ING_PASSO%' AND ingredient_id != 'ING_PASSION_FRUIT_LIQUEUR';

-- Delete the corrupted record
DELETE FROM ingredients
WHERE id LIKE 'ING_PASSO%'
  AND id != 'ING_PASSION_FRUIT_LIQUEUR'
  AND id != 'ING_PASSION_FRUIT'
  AND id != 'ING_PASSION_FRUIT_PUREE'
  AND id != 'ING_PASSION_FRUIT_SYRUP'
  AND id != 'ING_PASSENDALE';

-- Verify deletion (should return 0 for corrupted records)
SELECT id, name FROM ingredients WHERE id LIKE 'ING_PASSO%' AND name LIKE 'Passo%';
