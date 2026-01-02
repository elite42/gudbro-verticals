-- ============================================
-- IS-PUBLIC + OWNER_ID - Distingue dati globali vs merchant-specific
-- Created: 2025-12-22
-- ============================================

-- =====================================================
-- SCOPO:
-- is_public = TRUE  → Record globale GUDBRO (visibile a tutti)
-- is_public = FALSE → Record custom del merchant (visibile solo a lui)
-- owner_id          → UUID del merchant/location proprietario
--
-- Tutti i record esistenti sono dati GUDBRO:
--   is_public = TRUE, owner_id = NULL
--
-- Quando un merchant aggiunge un record custom dal backoffice:
--   is_public = FALSE, owner_id = 'merchant_uuid'
-- =====================================================

-- =====================================================
-- STEP 1: Ingredients
-- =====================================================

ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

-- =====================================================
-- STEP 2: Tutte le tabelle food (42 tabelle)
-- =====================================================

-- Cucine nazionali
ALTER TABLE moroccan ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE moroccan ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE french ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE french ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE spanish ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE spanish ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE ethiopian ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE ethiopian ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE lebanese ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE lebanese ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE turkish ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE turkish ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE greek ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE greek ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE georgian ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE georgian ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE brazilian ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE brazilian ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE peruvian ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE peruvian ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE vietnamese ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE vietnamese ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE korean ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE korean ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE indian ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE indian ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE thai ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE thai ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE chinese ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE chinese ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE mexican ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE mexican ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE caribbean ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE caribbean ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE japanese ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE japanese ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE armenian ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE armenian ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

-- Tabelle per tipo piatto
ALTER TABLE appetizers ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE appetizers ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE desserts ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE desserts ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE soups ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE soups ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE salads ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE salads ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE sides ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE sides ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE sauces ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE sauces ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE bakery ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE bakery ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

-- Tabelle specifiche
ALTER TABLE pasta ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE pasta ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE pizzas ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE pizzas ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE risotti ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE risotti ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE burgers ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE burgers ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE sandwiches ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE sandwiches ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE piadine ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE piadine ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE steaks ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE steaks ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE seafood ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE seafood ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE dumplings ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE dumplings ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE icecream ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE icecream ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE breakfast ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE breakfast ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE fried ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE fried ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE vegetarian ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE vegetarian ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE wraps ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE wraps ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

-- =====================================================
-- STEP 3: Tutte le tabelle bevande (12 tabelle)
-- =====================================================

ALTER TABLE cocktails ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE cocktails ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE wines ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE wines ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE beers ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE beers ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE spirits ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE spirits ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE coffee ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE coffee ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE tea ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE tea ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE smoothies ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE smoothies ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE milkshakes ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE milkshakes ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE hotbeverages ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE hotbeverages ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE mocktails ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE mocktails ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE softdrinks ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE softdrinks ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

ALTER TABLE waters ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE waters ADD COLUMN IF NOT EXISTS owner_id UUID DEFAULT NULL;

-- =====================================================
-- STEP 4: Creare indexes
-- =====================================================

-- Index su is_public (per filtrare record pubblici)
CREATE INDEX IF NOT EXISTS idx_ingredients_is_public ON ingredients(is_public);
CREATE INDEX IF NOT EXISTS idx_ingredients_owner ON ingredients(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_moroccan_is_public ON moroccan(is_public);
CREATE INDEX IF NOT EXISTS idx_moroccan_owner ON moroccan(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_french_is_public ON french(is_public);
CREATE INDEX IF NOT EXISTS idx_french_owner ON french(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_spanish_is_public ON spanish(is_public);
CREATE INDEX IF NOT EXISTS idx_spanish_owner ON spanish(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ethiopian_is_public ON ethiopian(is_public);
CREATE INDEX IF NOT EXISTS idx_ethiopian_owner ON ethiopian(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_lebanese_is_public ON lebanese(is_public);
CREATE INDEX IF NOT EXISTS idx_lebanese_owner ON lebanese(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_turkish_is_public ON turkish(is_public);
CREATE INDEX IF NOT EXISTS idx_turkish_owner ON turkish(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_greek_is_public ON greek(is_public);
CREATE INDEX IF NOT EXISTS idx_greek_owner ON greek(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_georgian_is_public ON georgian(is_public);
CREATE INDEX IF NOT EXISTS idx_georgian_owner ON georgian(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_brazilian_is_public ON brazilian(is_public);
CREATE INDEX IF NOT EXISTS idx_brazilian_owner ON brazilian(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_peruvian_is_public ON peruvian(is_public);
CREATE INDEX IF NOT EXISTS idx_peruvian_owner ON peruvian(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_vietnamese_is_public ON vietnamese(is_public);
CREATE INDEX IF NOT EXISTS idx_vietnamese_owner ON vietnamese(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_korean_is_public ON korean(is_public);
CREATE INDEX IF NOT EXISTS idx_korean_owner ON korean(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_indian_is_public ON indian(is_public);
CREATE INDEX IF NOT EXISTS idx_indian_owner ON indian(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_thai_is_public ON thai(is_public);
CREATE INDEX IF NOT EXISTS idx_thai_owner ON thai(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_chinese_is_public ON chinese(is_public);
CREATE INDEX IF NOT EXISTS idx_chinese_owner ON chinese(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_mexican_is_public ON mexican(is_public);
CREATE INDEX IF NOT EXISTS idx_mexican_owner ON mexican(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_caribbean_is_public ON caribbean(is_public);
CREATE INDEX IF NOT EXISTS idx_caribbean_owner ON caribbean(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_japanese_is_public ON japanese(is_public);
CREATE INDEX IF NOT EXISTS idx_japanese_owner ON japanese(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_armenian_is_public ON armenian(is_public);
CREATE INDEX IF NOT EXISTS idx_armenian_owner ON armenian(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_appetizers_is_public ON appetizers(is_public);
CREATE INDEX IF NOT EXISTS idx_appetizers_owner ON appetizers(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_desserts_is_public ON desserts(is_public);
CREATE INDEX IF NOT EXISTS idx_desserts_owner ON desserts(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_soups_is_public ON soups(is_public);
CREATE INDEX IF NOT EXISTS idx_soups_owner ON soups(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_salads_is_public ON salads(is_public);
CREATE INDEX IF NOT EXISTS idx_salads_owner ON salads(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_sides_is_public ON sides(is_public);
CREATE INDEX IF NOT EXISTS idx_sides_owner ON sides(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_sauces_is_public ON sauces(is_public);
CREATE INDEX IF NOT EXISTS idx_sauces_owner ON sauces(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_bakery_is_public ON bakery(is_public);
CREATE INDEX IF NOT EXISTS idx_bakery_owner ON bakery(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_pasta_is_public ON pasta(is_public);
CREATE INDEX IF NOT EXISTS idx_pasta_owner ON pasta(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_pizzas_is_public ON pizzas(is_public);
CREATE INDEX IF NOT EXISTS idx_pizzas_owner ON pizzas(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_risotti_is_public ON risotti(is_public);
CREATE INDEX IF NOT EXISTS idx_risotti_owner ON risotti(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_burgers_is_public ON burgers(is_public);
CREATE INDEX IF NOT EXISTS idx_burgers_owner ON burgers(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_sandwiches_is_public ON sandwiches(is_public);
CREATE INDEX IF NOT EXISTS idx_sandwiches_owner ON sandwiches(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_piadine_is_public ON piadine(is_public);
CREATE INDEX IF NOT EXISTS idx_piadine_owner ON piadine(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_steaks_is_public ON steaks(is_public);
CREATE INDEX IF NOT EXISTS idx_steaks_owner ON steaks(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_seafood_is_public ON seafood(is_public);
CREATE INDEX IF NOT EXISTS idx_seafood_owner ON seafood(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_dumplings_is_public ON dumplings(is_public);
CREATE INDEX IF NOT EXISTS idx_dumplings_owner ON dumplings(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_icecream_is_public ON icecream(is_public);
CREATE INDEX IF NOT EXISTS idx_icecream_owner ON icecream(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_breakfast_is_public ON breakfast(is_public);
CREATE INDEX IF NOT EXISTS idx_breakfast_owner ON breakfast(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_fried_is_public ON fried(is_public);
CREATE INDEX IF NOT EXISTS idx_fried_owner ON fried(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_vegetarian_is_public ON vegetarian(is_public);
CREATE INDEX IF NOT EXISTS idx_vegetarian_owner ON vegetarian(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_wraps_is_public ON wraps(is_public);
CREATE INDEX IF NOT EXISTS idx_wraps_owner ON wraps(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_cocktails_is_public ON cocktails(is_public);
CREATE INDEX IF NOT EXISTS idx_cocktails_owner ON cocktails(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_wines_is_public ON wines(is_public);
CREATE INDEX IF NOT EXISTS idx_wines_owner ON wines(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_beers_is_public ON beers(is_public);
CREATE INDEX IF NOT EXISTS idx_beers_owner ON beers(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_spirits_is_public ON spirits(is_public);
CREATE INDEX IF NOT EXISTS idx_spirits_owner ON spirits(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_coffee_is_public ON coffee(is_public);
CREATE INDEX IF NOT EXISTS idx_coffee_owner ON coffee(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_tea_is_public ON tea(is_public);
CREATE INDEX IF NOT EXISTS idx_tea_owner ON tea(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_smoothies_is_public ON smoothies(is_public);
CREATE INDEX IF NOT EXISTS idx_smoothies_owner ON smoothies(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_milkshakes_is_public ON milkshakes(is_public);
CREATE INDEX IF NOT EXISTS idx_milkshakes_owner ON milkshakes(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_hotbeverages_is_public ON hotbeverages(is_public);
CREATE INDEX IF NOT EXISTS idx_hotbeverages_owner ON hotbeverages(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_mocktails_is_public ON mocktails(is_public);
CREATE INDEX IF NOT EXISTS idx_mocktails_owner ON mocktails(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_softdrinks_is_public ON softdrinks(is_public);
CREATE INDEX IF NOT EXISTS idx_softdrinks_owner ON softdrinks(owner_id) WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_waters_is_public ON waters(is_public);
CREATE INDEX IF NOT EXISTS idx_waters_owner ON waters(owner_id) WHERE owner_id IS NOT NULL;

-- =====================================================
-- STEP 5: Commenti per documentazione
-- =====================================================

COMMENT ON COLUMN ingredients.is_public IS
'TRUE = record GUDBRO globale, FALSE = record custom merchant';

COMMENT ON COLUMN ingredients.owner_id IS
'UUID del merchant/location proprietario. NULL = record GUDBRO.';

-- =====================================================
-- STEP 6: Query di esempio per il backoffice
-- =====================================================

-- Mostra piatti GUDBRO + piatti custom di questo merchant
-- SELECT * FROM pasta
-- WHERE is_public = TRUE
--    OR owner_id = 'merchant_uuid_here';

-- Solo piatti custom di un merchant
-- SELECT * FROM pasta
-- WHERE owner_id = 'merchant_uuid_here';

-- Conteggio record per merchant
-- SELECT owner_id, COUNT(*)
-- FROM pasta
-- WHERE owner_id IS NOT NULL
-- GROUP BY owner_id;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
