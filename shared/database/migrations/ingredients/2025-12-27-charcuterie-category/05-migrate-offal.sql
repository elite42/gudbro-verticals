-- =============================================================================
-- MIGRATION: Move organ meats and offal to offal category
-- Date: 2025-12-27
-- Includes: liver, kidney, heart, tripe, tongue, brain, intestines, sweetbreads, blood, feet
-- =============================================================================

UPDATE ingredients SET category = 'offal' WHERE id IN (
  -- LIVER
  'ING_LIVER',
  'ING_BEEF_LIVER',
  'ING_CALF_LIVER',
  'ING_CHICKEN_LIVER',
  'ING_LAMB_LIVER',
  'ING_PORK_LIVER',
  'ING_LIVER_PATE',
  'ING_CIGER',       -- Turkish liver

  -- KIDNEY
  'ING_BEEF_KIDNEY',
  'ING_LAMB_KIDNEY',

  -- HEART
  'ING_BEEF_HEART',
  'ING_CHICKEN_HEARTS',
  'ING_CORACAO_FRANGO',  -- Brazilian chicken hearts

  -- TRIPE & STOMACH
  'ING_TRIPE',
  'ING_BEEF_TRIPE',
  'ING_ISKEMBE',     -- Turkish tripe
  'ING_LAMPREDOTTO', -- Florentine tripe

  -- TONGUE
  'ING_BEEF_TONGUE',

  -- BRAIN
  'ING_BEEF_BRAIN',

  -- INTESTINES
  'ING_BEEF_INTESTINE',
  'ING_LAMB_INTESTINES',
  'ING_PIG_INTESTINE',
  'ING_PORK_INTESTINES',
  'ING_CHICHARRON',  -- Fried intestines/skin

  -- SWEETBREADS
  'ING_SWEETBREAD',
  'ING_VEAL_SWEETBREADS',

  -- FEET & EXTREMITIES
  'ING_BEEF_FEET',
  'ING_COW_FOOT',
  'ING_COW_HEEL',

  -- BLOOD
  'ING_CHICKEN_BLOOD',
  'ING_PIG_BLOOD',
  'ING_PORK_BLOOD',

  -- OTHER OFFAL
  'ING_LAMB_OFFAL',
  'ING_CHICKEN_GIZZARDS',
  'ING_KUZU_KUYRUK'  -- Lamb tail fat (Turkish)
);

-- Count: Expected ~40 items
-- SELECT COUNT(*) as offal_count FROM ingredients WHERE category = 'offal';
