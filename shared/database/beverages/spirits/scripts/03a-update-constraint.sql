-- ============================================
-- SPIRITS - Update CHECK Constraint
-- ============================================
-- ESEGUI QUESTO SCRIPT NEL SUPABASE SQL EDITOR PRIMA DI 03b
-- Aggiunge 'sake' e 'shochu' alle subcategory consentite
-- ============================================

-- Drop and recreate the subcategory constraint with sake and shochu
ALTER TABLE spirits DROP CONSTRAINT IF EXISTS spirits_subcategory_check;

ALTER TABLE spirits ADD CONSTRAINT spirits_subcategory_check CHECK (subcategory IN (
    -- Whisky
    'scotch_single_malt', 'scotch_blended', 'bourbon', 'tennessee',
    'rye', 'irish', 'japanese', 'canadian', 'world_whisky',
    -- Gin
    'london_dry', 'old_tom', 'navy_strength', 'contemporary',
    'genever', 'sloe_gin',
    -- Rum
    'white_rum', 'gold_rum', 'dark_rum', 'spiced_rum',
    'agricole', 'cachaca', 'overproof',
    -- Vodka
    'neutral_vodka', 'flavored_vodka', 'potato_vodka', 'grape_vodka',
    -- Tequila & Mezcal
    'tequila_blanco', 'tequila_reposado', 'tequila_anejo',
    'tequila_extra_anejo', 'mezcal_joven', 'mezcal_reposado', 'mezcal_anejo',
    -- Brandy & Cognac
    'cognac_vs', 'cognac_vsop', 'cognac_xo', 'armagnac',
    'calvados', 'grappa', 'pisco', 'brandy_generic',
    -- Amari & Liqueurs
    'amaro_bitter', 'amaro_alpine', 'amaro_citrus', 'amaro_fernet',
    'liqueur_herbal', 'liqueur_cream', 'liqueur_fruit', 'liqueur_nut',
    'liqueur_coffee', 'liqueur_anise',
    -- Other / Asian Spirits (UPDATED: added sake and shochu)
    'absinthe', 'aquavit', 'sake', 'soju', 'shochu', 'baijiu', 'other_spirit'
));

-- Verify the constraint was updated
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'spirits'::regclass
AND conname = 'spirits_subcategory_check';
