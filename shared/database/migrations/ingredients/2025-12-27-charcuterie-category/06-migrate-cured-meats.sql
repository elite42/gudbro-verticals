-- =============================================================================
-- MIGRATION: Move dry-cured/aged meats to cured_meats category
-- Date: 2025-12-27
-- Includes: prosciutto, bresaola, speck, salami (dry), bacon, pancetta, guanciale, jamon, coppa
-- Note: These are DRY-CURED or AGED products, NOT fresh sausages
-- =============================================================================

UPDATE ingredients SET category = 'cured_meats' WHERE id IN (
  -- ITALIAN CURED MEATS
  'ING_PROSCIUTTO',
  'ING_PROSCIUTTO_COTTO',
  'ING_PROSCIUTTO_CRUDO_DOP',
  'ING_PROSCIUTTO_DI_PARMA',
  'ING_BRESAOLA',
  'ING_SPECK',
  'ING_PANCETTA',
  'ING_GUANCIALE',
  'ING_COPPA',
  'ING_CAPOCOLLO',
  'ING_CULATELLO',
  'ING_LONZA',
  'ING_LOMO',
  'ING_NDUJA',
  'ING_FINOCCHIONA',
  'ING_CIAUSCOLO',
  'ING_VENTRICINA',
  'ING_SALAME_FELINO',
  'ING_SALAME_MILANO',

  -- DRY SALAMI (not fresh sausage)
  'ING_SALAMI',
  'ING_SPICY_SALAMI',
  'ING_SOPPRESSATA',
  'ING_SALCHICHON',
  'ING_SALAME_TANDIL',

  -- SPANISH CURED MEATS
  'ING_SERRANO_HAM',
  'ING_IBERICO_HAM',
  'ING_JAMON_SERRANO',
  'ING_JAMON_IBERICO',
  'ING_CECINA',
  'ING_LACON',
  'ING_SOBRASADA',
  'ING_FUET',

  -- FRENCH CURED MEATS
  'ING_JAMBON_BAYONNE',
  'ING_SAUCISSON_SEC',
  'ING_ROSETTE_LYON',
  'ING_RILLETTES',
  'ING_TERRINE',
  'ING_PATE',
  'ING_PATE_CAMPAGNE',

  -- GERMAN/AUSTRIAN CURED MEATS
  'ING_TIROLER_SPECK',
  'ING_LANDJAGER',
  'ING_BUNDNERFLEISCH',

  -- BELGIAN CURED MEATS
  'ING_JAMBON_ARDENNE',

  -- PORTUGUESE CURED MEATS
  'ING_PRESUNTO',
  'ING_CHOURICO',
  'ING_PAIO',
  'ING_SALPICAO',

  -- EASTERN EUROPEAN
  'ING_KABANOS',
  'ING_KRAKOWSKA',
  'ING_MYSLIWSKA',
  'ING_TELISZALAMI',
  'ING_GYULAI_KOLBASZ',
  'ING_CSABAI_KOLBASZ',
  'ING_KULEN',

  -- SCANDINAVIAN
  'ING_FENALAR',
  'ING_RULLEPOLSE',
  'ING_LEVERPOSTEJ',

  -- MIDDLE EASTERN/TURKISH
  'ING_PASTIRMA',
  'ING_BASTURMA',
  'ING_SUJUKH',
  'ING_KAVURMA',
  'ING_KAWARMA',
  'ING_AWARMA',
  'ING_KHLII',

  -- BACON FAMILY (cured, not fresh)
  'ING_BACON',
  'ING_CANADIAN_BACON',
  'ING_IRISH_BACON',
  'ING_LARDONS',

  -- ASIAN CURED
  'ING_LAP_CHEONG',
  'ING_LAP_YUK',
  'ING_LAP_XUONG',
  'ING_CHA_LUA',
  'ING_GIO_LUA',
  'ING_NEM_CHUA',

  -- LATIN AMERICAN
  'ING_CHARQUE',
  'ING_CHARQUI',
  'ING_MACHACA',

  -- OTHER CURED
  'ING_CURED_HAM',
  'ING_HAM',
  'ING_HAM_HOCK',
  'ING_TASSO',
  'ING_CORNED_BEEF',
  'ING_PASTRAMI',
  'ING_BILTONG',
  'ING_DROEWORS',
  'ING_KILISHI',
  'ING_QUANTA',
  'ING_KAZY',

  -- ASIAN PREPARED
  'ING_SALSIZ'
);

-- Count: Expected ~90 items
-- SELECT COUNT(*) as cured_meats_count FROM ingredients WHERE category = 'cured_meats';
