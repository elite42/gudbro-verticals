-- ============================================
-- GUDBRO - Find Duplicate/Similar Ingredients
-- Version: 1.0
-- Purpose: Identify duplicates before cleanup
-- ============================================
-- RUN THIS FIRST - Analysis only, no changes
-- ============================================

-- 1. EXACT DUPLICATES: Plural vs Singular (add 'S' at end)
SELECT
  'PLURAL_VS_SINGULAR' as issue_type,
  i1.id as singular_id,
  i1.name as singular_name,
  i2.id as plural_id,
  i2.name as plural_name,
  (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = i1.id) as singular_usage,
  (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = i2.id) as plural_usage
FROM ingredients i1
JOIN ingredients i2 ON i2.id = i1.id || 'S'
ORDER BY i1.id;

-- 2. NAMING CONVENTION: BEEF_GROUND vs GROUND_BEEF pattern
SELECT
  'NAMING_CONVENTION' as issue_type,
  i1.id as id_1,
  i1.name as name_1,
  i2.id as id_2,
  i2.name as name_2,
  (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = i1.id) as usage_1,
  (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = i2.id) as usage_2
FROM ingredients i1
JOIN ingredients i2 ON
  -- Match patterns like BEEF_GROUND vs GROUND_BEEF
  i1.id LIKE 'ING_%_%'
  AND i2.id LIKE 'ING_%_%'
  AND i1.id != i2.id
  AND LOWER(i1.name) = LOWER(i2.name)
ORDER BY i1.id;

-- 3. SIMILAR NAMES: Same name, different IDs
SELECT
  'SAME_NAME_DIFF_ID' as issue_type,
  i1.id as id_1,
  i2.id as id_2,
  i1.name as name,
  (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = i1.id) as usage_1,
  (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = i2.id) as usage_2
FROM ingredients i1
JOIN ingredients i2 ON LOWER(TRIM(i1.name)) = LOWER(TRIM(i2.name)) AND i1.id < i2.id
ORDER BY i1.name;

-- 4. ALL INGREDIENTS WITH 'S' SUFFIX (potential plurals)
SELECT
  'ENDS_WITH_S' as issue_type,
  id,
  name,
  (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = ingredients.id) as usage_count,
  CASE
    WHEN EXISTS (SELECT 1 FROM ingredients i2 WHERE i2.id = RTRIM(ingredients.id, 'S'))
    THEN 'HAS_SINGULAR_VERSION'
    ELSE 'NO_SINGULAR'
  END as has_singular
FROM ingredients
WHERE id LIKE '%S'
  AND id NOT LIKE '%SS' -- exclude words naturally ending in SS
  AND id NOT LIKE '%US' -- exclude words like CITRUS
  AND id NOT LIKE '%AS' -- exclude words like PITAS
ORDER BY id;

-- 5. USAGE SUMMARY: Which duplicates are actually used?
WITH duplicates AS (
  SELECT i1.id as keep_id, i2.id as remove_id
  FROM ingredients i1
  JOIN ingredients i2 ON i2.id = i1.id || 'S'
)
SELECT
  d.keep_id,
  d.remove_id,
  (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = d.keep_id) as keep_usage,
  (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = d.remove_id) as remove_usage,
  CASE
    WHEN (SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id = d.remove_id) > 0
    THEN 'NEEDS_MIGRATION'
    ELSE 'SAFE_TO_DELETE'
  END as action_needed
FROM duplicates d
ORDER BY d.keep_id;
