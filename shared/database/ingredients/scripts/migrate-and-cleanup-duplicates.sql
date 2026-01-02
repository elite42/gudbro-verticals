-- ============================================
-- GUDBRO - Migrate and Cleanup Duplicate Ingredients
-- Version: 1.0
-- Purpose: Safely migrate links and remove duplicates
-- ============================================
-- IMPORTANT: Run this in a single transaction
-- ============================================

BEGIN;

-- ============================================
-- STEP 1: MIGRATE ALL LINKS FROM PLURAL TO SINGULAR
-- ============================================
-- This updates product_ingredients to use singular form
-- Uses ON CONFLICT to handle cases where singular already exists

-- ING_BEETS -> ING_BEET
UPDATE product_ingredients
SET ingredient_id = 'ING_BEET'
WHERE ingredient_id = 'ING_BEETS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_BEET'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_BEETS';

-- ING_BLACK_BEANS -> ING_BLACK_BEAN
UPDATE product_ingredients
SET ingredient_id = 'ING_BLACK_BEAN'
WHERE ingredient_id = 'ING_BLACK_BEANS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_BLACK_BEAN'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_BLACK_BEANS';

-- ING_BREADCRUMBS -> ING_BREADCRUMB
UPDATE product_ingredients
SET ingredient_id = 'ING_BREADCRUMB'
WHERE ingredient_id = 'ING_BREADCRUMBS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_BREADCRUMB'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_BREADCRUMBS';

-- ING_CAPERS -> ING_CAPER
UPDATE product_ingredients
SET ingredient_id = 'ING_CAPER'
WHERE ingredient_id = 'ING_CAPERS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_CAPER'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_CAPERS';

-- ING_CASHEWS -> ING_CASHEW
UPDATE product_ingredients
SET ingredient_id = 'ING_CASHEW'
WHERE ingredient_id = 'ING_CASHEWS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_CASHEW'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_CASHEWS';

-- ING_CHICKPEAS -> ING_CHICKPEA
UPDATE product_ingredients
SET ingredient_id = 'ING_CHICKPEA'
WHERE ingredient_id = 'ING_CHICKPEAS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_CHICKPEA'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_CHICKPEAS';

-- ING_CLOVES -> ING_CLOVE
UPDATE product_ingredients
SET ingredient_id = 'ING_CLOVE'
WHERE ingredient_id = 'ING_CLOVES'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_CLOVE'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_CLOVES';

-- ING_PICKLES -> ING_PICKLE
UPDATE product_ingredients
SET ingredient_id = 'ING_PICKLE'
WHERE ingredient_id = 'ING_PICKLES'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_PICKLE'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_PICKLES';

-- ING_PRUNES -> ING_PRUNE
UPDATE product_ingredients
SET ingredient_id = 'ING_PRUNE'
WHERE ingredient_id = 'ING_PRUNES'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_PRUNE'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_PRUNES';

-- ING_RAISINS -> ING_RAISIN
UPDATE product_ingredients
SET ingredient_id = 'ING_RAISIN'
WHERE ingredient_id = 'ING_RAISINS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_RAISIN'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_RAISINS';

-- ING_SHIITAKE_MUSHROOMS -> ING_SHIITAKE_MUSHROOM
UPDATE product_ingredients
SET ingredient_id = 'ING_SHIITAKE_MUSHROOM'
WHERE ingredient_id = 'ING_SHIITAKE_MUSHROOMS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_SHIITAKE_MUSHROOM'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_SHIITAKE_MUSHROOMS';

-- ING_SPRING_ROLL_WRAPPERS -> ING_SPRING_ROLL_WRAPPER
UPDATE product_ingredients
SET ingredient_id = 'ING_SPRING_ROLL_WRAPPER'
WHERE ingredient_id = 'ING_SPRING_ROLL_WRAPPERS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_SPRING_ROLL_WRAPPER'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_SPRING_ROLL_WRAPPERS';

-- ING_WONTON_WRAPPERS -> ING_WONTON_WRAPPER
UPDATE product_ingredients
SET ingredient_id = 'ING_WONTON_WRAPPER'
WHERE ingredient_id = 'ING_WONTON_WRAPPERS'
  AND NOT EXISTS (
    SELECT 1 FROM product_ingredients pi2
    WHERE pi2.product_type = product_ingredients.product_type
      AND pi2.product_id = product_ingredients.product_id
      AND pi2.ingredient_id = 'ING_WONTON_WRAPPER'
  );
DELETE FROM product_ingredients WHERE ingredient_id = 'ING_WONTON_WRAPPERS';

-- ============================================
-- STEP 2: DELETE PLURAL INGREDIENTS FROM MASTER TABLE
-- ============================================
-- Now safe to delete as no links exist

DELETE FROM ingredients WHERE id = 'ING_BEETS';
DELETE FROM ingredients WHERE id = 'ING_BLACK_BEANS';
DELETE FROM ingredients WHERE id = 'ING_BREADCRUMBS';
DELETE FROM ingredients WHERE id = 'ING_CAPERS';
DELETE FROM ingredients WHERE id = 'ING_CASHEWS';
DELETE FROM ingredients WHERE id = 'ING_CHICKPEAS';
DELETE FROM ingredients WHERE id = 'ING_CLOVES';
DELETE FROM ingredients WHERE id = 'ING_GYOZA_WRAPPERS';
DELETE FROM ingredients WHERE id = 'ING_PICKLES';
DELETE FROM ingredients WHERE id = 'ING_PRUNES';
DELETE FROM ingredients WHERE id = 'ING_RAISINS';
DELETE FROM ingredients WHERE id = 'ING_SHIITAKE_MUSHROOMS';
DELETE FROM ingredients WHERE id = 'ING_SPRING_ROLL_WRAPPERS';
DELETE FROM ingredients WHERE id = 'ING_WONTON_WRAPPERS';

-- ============================================
-- STEP 3: VERIFICATION
-- ============================================

-- Verify no orphan links remain
DO $$
DECLARE
  orphan_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO orphan_count
  FROM product_ingredients pi
  WHERE NOT EXISTS (SELECT 1 FROM ingredients i WHERE i.id = pi.ingredient_id);

  IF orphan_count > 0 THEN
    RAISE EXCEPTION 'ROLLBACK: Found % orphan links in product_ingredients', orphan_count;
  ELSE
    RAISE NOTICE 'SUCCESS: No orphan links found';
  END IF;
END $$;

-- Show summary
SELECT 'MIGRATION COMPLETE' as status,
  (SELECT COUNT(*) FROM ingredients WHERE id IN (
    'ING_BEET', 'ING_BLACK_BEAN', 'ING_BREADCRUMB', 'ING_CAPER',
    'ING_CASHEW', 'ING_CHICKPEA', 'ING_CLOVE', 'ING_GYOZA_WRAPPER',
    'ING_PICKLE', 'ING_PRUNE', 'ING_RAISIN', 'ING_SHIITAKE_MUSHROOM',
    'ING_SPRING_ROLL_WRAPPER', 'ING_WONTON_WRAPPER'
  )) as singular_ingredients_count,
  (SELECT COUNT(*) FROM ingredients WHERE id IN (
    'ING_BEETS', 'ING_BLACK_BEANS', 'ING_BREADCRUMBS', 'ING_CAPERS',
    'ING_CASHEWS', 'ING_CHICKPEAS', 'ING_CLOVES', 'ING_GYOZA_WRAPPERS',
    'ING_PICKLES', 'ING_PRUNES', 'ING_RAISINS', 'ING_SHIITAKE_MUSHROOMS',
    'ING_SPRING_ROLL_WRAPPERS', 'ING_WONTON_WRAPPERS'
  )) as plural_ingredients_remaining;

COMMIT;
