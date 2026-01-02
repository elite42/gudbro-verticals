-- =============================================================================
-- VERIFICATION: Check protein category migration results
-- Date: 2025-12-27
-- Run this AFTER executing scripts 01-07
-- =============================================================================

-- 1. Count by new categories
SELECT
  category,
  COUNT(*) as count
FROM ingredients
WHERE category IN ('red_meat', 'poultry', 'game', 'offal', 'cured_meats', 'sausages', 'proteins')
GROUP BY category
ORDER BY count DESC;

-- Expected results (approximate):
-- red_meat:    ~95
-- sausages:    ~90
-- cured_meats: ~90
-- offal:       ~40
-- poultry:     ~30
-- game:        ~12
-- proteins:    ~80 (remaining: tofu, broths, prepared items)

-- 2. Verify proteins remaining contains expected items
SELECT id, name
FROM ingredients
WHERE category = 'proteins'
ORDER BY name;

-- Should see: tofu variants, seitan, broths, meatballs, fish cakes, etc.

-- 3. Total check (should still be 439)
SELECT COUNT(*) as total_protein_related
FROM ingredients
WHERE category IN ('red_meat', 'poultry', 'game', 'offal', 'cured_meats', 'sausages', 'proteins');

-- 4. Check for any orphans (items that might have been missed)
SELECT id, name, category
FROM ingredients
WHERE category = 'proteins'
  AND (
    name ILIKE '%beef%'
    OR name ILIKE '%pork%'
    OR name ILIKE '%lamb%'
    OR name ILIKE '%chicken%'
    OR name ILIKE '%sausage%'
    OR name ILIKE '%salami%'
    OR name ILIKE '%prosciutto%'
    OR name ILIKE '%liver%'
  )
ORDER BY name;

-- If any results here, they need to be moved to appropriate category
