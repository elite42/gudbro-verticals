-- =============================================================================
-- MIGRATION: Move fresh beef, pork, lamb, veal, goat cuts to red_meat category
-- Date: 2025-12-27
-- =============================================================================

UPDATE ingredients SET category = 'red_meat' WHERE id IN (
  -- BEEF (fresh cuts, not processed)
  'ING_BEEF',
  'ING_BEEF_BONES',
  'ING_BEEF_BRISKET',
  'ING_BEEF_CHEEK',
  'ING_BEEF_CHUCK',
  'ING_BEEF_EYE_ROUND',
  'ING_BEEF_FLANK',
  'ING_BEEF_FLAT_IRON',
  'ING_BEEF_HANGER',
  'ING_BEEF_PICANHA',
  'ING_BEEF_PORTERHOUSE',
  'ING_BEEF_PRIME_RIB',
  'ING_BEEF_RIBEYE',
  'ING_BEEF_RIBS',
  'ING_BEEF_ROAST',
  'ING_BEEF_RUMP',
  'ING_BEEF_SHANK',
  'ING_BEEF_SHORT_RIBS',
  'ING_BEEF_SHOULDER',
  'ING_BEEF_SIRLOIN',
  'ING_BEEF_SKIRT',
  'ING_BEEF_STEAK',
  'ING_BEEF_STRIP',
  'ING_BEEF_TBONE',
  'ING_BEEF_TENDERLOIN',
  'ING_BEEF_TENDON',
  'ING_BEEF_SLICES',
  'ING_BEEF_GROUND',
  'ING_GROUND_BEEF',
  'ING_BEEF_MINCE',
  'ING_FLANK_STEAK',
  'ING_SLICED_STEAK',
  'ING_WAGYU_BEEF',
  'ING_BEEF_CHIANINA',
  'ING_PICANHA',
  'ING_ALCATRA',
  'ING_FRALDINHA',
  'ING_MAMINHA',
  'ING_CUPIM',
  'ING_COSTELA_BOVINA',
  'ING_CARNE_ASADA',
  'ING_ROAST_BEEF',
  'ING_BONE_MARROW',

  -- PORK (fresh cuts)
  'ING_PORK',
  'ING_PORK_BELLY',
  'ING_PORK_BONES',
  'ING_PORK_CHOP',
  'ING_PORK_LEG',
  'ING_PORK_LOIN',
  'ING_PORK_NECK',
  'ING_PORK_RIBS',
  'ING_PORK_SHOULDER',
  'ING_PORK_SPARE_RIBS',
  'ING_PORK_TENDERLOIN',
  'ING_PORK_SLICES',
  'ING_GROUND_PORK',
  'ING_PORK_KNUCKLE',
  'ING_PORK_EAR',
  'ING_PORK_SKIN',
  'ING_PORK_RIND',
  'ING_PORK_CRACKLING',
  'ING_PORK_TAIL',
  'ING_SUCKLING_PIG',
  'ING_CRISPY_PORK',
  'ING_GAMMON',
  'ING_SALT_PORK',
  'ING_SMOKED_PORK',
  'ING_COPA_LOMBO',
  'ING_BONDIOLA',
  'ING_PORCHETTA',

  -- LAMB (fresh cuts)
  'ING_LAMB',
  'ING_LAMB_CHOP',
  'ING_LAMB_CHOPS',
  'ING_LAMB_LEG',
  'ING_LAMB_MINCE',
  'ING_LAMB_NECK',
  'ING_LAMB_SHANK',
  'ING_LAMB_SHOULDER',
  'ING_LAMB_SLICES',
  'ING_LAMB_RACK',
  'ING_GROUND_LAMB',

  -- VEAL
  'ING_VEAL',
  'ING_VEAL_CUTLET',
  'ING_VEAL_SHANK',

  -- GOAT
  'ING_GOAT',
  'ING_GOAT_MEAT',
  'ING_GOAT_BONES',

  -- OXTAIL (technically beef)
  'ING_OXTAIL',
  'ING_OX_BONES',

  -- Regional beef/meat
  'ING_BULGOGI_BEEF',
  'ING_DONER_MEAT',
  'ING_CARNE_SOL'
);

-- Count: Expected ~95 items
-- SELECT COUNT(*) as red_meat_count FROM ingredients WHERE category = 'red_meat';
