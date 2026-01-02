-- ============================================
-- STEP 2: MIGRATE EXISTING FAT INGREDIENTS
-- ============================================
-- Run this AFTER 00a-add-fats-enum.sql has been committed.
-- ============================================

-- Migrate from 'oils' to 'fats'
UPDATE ingredients SET category = 'fats' WHERE id IN (
    'ING_LARD',
    'ING_PORK_LARD',
    'ING_BACON_FAT',
    'ING_PORK_FAT',
    'ING_CHICKEN_FAT'
);

-- Migrate from 'proteins' to 'fats'
UPDATE ingredients SET category = 'fats' WHERE id IN (
    'ING_TAIL_FAT',
    'ING_LAMB_FAT'
);

-- Verification
SELECT id, name, category FROM ingredients WHERE category = 'fats';
