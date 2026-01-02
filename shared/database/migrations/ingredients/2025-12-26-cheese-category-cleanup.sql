-- ============================================================================
-- CHEESE CATEGORY CLEANUP
-- Date: 2025-12-26
-- Description:
--   1. Migrate 36 cheese items from 'dairy' to 'cheese' category
--   2. Fix ING_BUTTER_LETTUCE wrong category (dairy -> vegetables)
--   3. Merge duplicate ING_FETA_CHEESE into ING_FETA
-- ============================================================================

BEGIN;

-- ============================================================================
-- STEP 1: Migrate cheeses from 'dairy' to 'cheese'
-- ============================================================================
UPDATE ingredients SET category = 'cheese' WHERE id IN (
    'ING_AKAWI_CHEESE',      -- Akawi Cheese (Middle Eastern)
    'ING_AMERICAN_CHEESE',   -- American Cheese
    'ING_STRING_CHEESE',     -- Armenian String Cheese
    'ING_CHEESE_ASSORTED',   -- Assorted Cheeses
    'ING_AYIB',              -- Ayib (Ethiopian fresh cheese)
    'ING_BEYAZ_PEYNIR',      -- Beyaz Peynir (Turkish white cheese)
    'ING_CAMEMBERT',         -- Camembert (French)
    'ING_CHEESE_POWDER',     -- Cheese Powder
    'ING_CHEVRE',            -- Chèvre (Goat cheese)
    'ING_COMTE',             -- Comté (French)
    'ING_COTTAGE_CHEESE',    -- Cottage Cheese
    'ING_CREAM_CHEESE',      -- Cream Cheese
    'ING_EDAM_CHEESE',       -- Edam Cheese (Dutch)
    'ING_FARMERS_CHEESE',    -- Farmers Cheese
    'ING_FETA_CHEESE',       -- Feta Cheese (will be merged later)
    'ING_FRESH_CHEESE',      -- Fresh Cheese
    'ING_GUDA_CHEESE',       -- Guda Cheese (Georgian)
    'ING_HALLOUMI',          -- Halloumi Cheese (Cypriot)
    'ING_IDIAZABAL',         -- Idiazábal (Spanish Basque)
    'ING_IMERULI_CHEESE',    -- Imeruli Cheese (Georgian)
    'ING_JAMEED',            -- Jameed (Jordanian dried yogurt cheese)
    'ING_KASAR_CHEESE',      -- Kaşar Cheese (Turkish)
    'ING_KASSERI',           -- Kasseri Cheese (Greek)
    'ING_LOR_CHEESE',        -- Lor Cheese (Turkish whey cheese)
    'ING_MASCARPONE',        -- Mascarpone Cheese (Italian)
    'ING_MIZITHRA',          -- Mizithra Cheese (Greek)
    'ING_OSCYPEK',           -- Oscypek Cheese (Polish smoked)
    'ING_PANEER',            -- Paneer (Indian)
    'ING_QUEIJO_COALHO',     -- Queijo Coalho (Brazilian)
    'ING_QUEIJO_MINAS',      -- Queijo Minas (Brazilian)
    'ING_QUESO_FRITO',       -- Queso Frito (Latin American)
    'ING_TETILLA',           -- Queso Tetilla (Spanish Galician)
    'ING_REQUEIJAO',         -- Requeijão (Portuguese/Brazilian)
    'ING_ROQUEFORT',         -- Roquefort (French blue)
    'ING_SHANKLISH_CHEESE',  -- Shanklish Cheese (Levantine)
    'ING_SULGUNI_CHEESE'     -- Sulguni Cheese (Georgian)
);

-- ============================================================================
-- STEP 2: Fix ING_BUTTER_LETTUCE category (should be vegetables, not dairy)
-- ============================================================================
UPDATE ingredients SET category = 'vegetables' WHERE id = 'ING_BUTTER_LETTUCE';

-- ============================================================================
-- STEP 3: Merge duplicate FETA entries
-- First, update all product_ingredients references
-- ============================================================================
UPDATE product_ingredients
SET ingredient_id = 'ING_FETA'
WHERE ingredient_id = 'ING_FETA_CHEESE';

-- Delete the duplicate
DELETE FROM ingredients WHERE id = 'ING_FETA_CHEESE';

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- SELECT category, COUNT(*) FROM ingredients WHERE category IN ('cheese', 'dairy') GROUP BY category;
-- SELECT * FROM ingredients WHERE id = 'ING_BUTTER_LETTUCE';
-- SELECT * FROM ingredients WHERE name ILIKE '%feta%';
