-- =============================================================================
-- MIGRATION: Move game meats and exotic proteins to game category
-- Date: 2025-12-27
-- Includes: venison, rabbit, wild boar, reindeer + exotic (kangaroo, emu, alligator, alpaca)
-- =============================================================================

UPDATE ingredients SET category = 'game' WHERE id IN (
  -- TRADITIONAL GAME
  'ING_RABBIT',
  'ING_REINDEER',
  'ING_VENDACE',     -- Finnish fish but often grouped with Nordic game

  -- EXOTIC PROTEINS (New World)
  'ING_KANGAROO',
  'ING_EMU',
  'ING_ALLIGATOR',
  'ING_ALPACA',
  'ING_ALPACA_HEART',
  'ING_CUY',         -- Guinea pig (Peru)
  'ING_SURI',        -- Palm weevil larvae (Peru)

  -- SNAILS (often classified as game in French cuisine)
  'ING_SNAIL',
  'ING_ESCARGOT'
);

-- Note: We don't have venison, wild boar, pheasant, quail meat in current DB
-- They can be added later if needed

-- Count: Expected ~12 items
-- SELECT COUNT(*) as game_count FROM ingredients WHERE category = 'game';
