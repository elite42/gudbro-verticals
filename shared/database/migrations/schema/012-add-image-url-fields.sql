-- ============================================
-- IMAGE_URL - Campo immagine su prodotti e ingredienti
-- Aggiunge image_url a tutte le 55 tabelle catalogo
-- Created: 2025-12-23
-- ============================================

-- =====================================================
-- NOTA:
-- Questo script aggiunge solo il campo image_url.
-- Le immagini saranno popolate separatamente.
-- URL atteso: Supabase Storage o CDN esterno
-- =====================================================

-- =====================================================
-- STEP 1: INGREDIENTS (1 tabella)
-- =====================================================

ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN ingredients.image_url IS
'URL immagine ingrediente. Formato: Supabase Storage URL o CDN. NULL = non disponibile.';

CREATE INDEX IF NOT EXISTS idx_ingredients_image
ON ingredients(image_url)
WHERE image_url IS NOT NULL;

-- =====================================================
-- STEP 2: FOOD TABLES (42 tabelle)
-- =====================================================

-- Cucine nazionali (17)
ALTER TABLE moroccan ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE ethiopian ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE french ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE spanish ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE lebanese ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE turkish ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE greek ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE georgian ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE armenian ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE brazilian ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE peruvian ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE caribbean ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE vietnamese ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE korean ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE indian ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE thai ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE chinese ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE mexican ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE japanese ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Tipo piatto (17)
ALTER TABLE pasta ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE pizzas ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE risotti ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE piadine ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE burgers ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE sandwiches ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE steaks ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE seafood ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE appetizers ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE desserts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE soups ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE salads ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE sides ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE sauces ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE dumplings ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE bakery ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE icecream ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Specifiche (6)
ALTER TABLE breakfast ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE fried ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE vegetarian ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE wraps ADD COLUMN IF NOT EXISTS image_url TEXT;

-- =====================================================
-- STEP 3: BEVERAGE TABLES (12 tabelle)
-- =====================================================

ALTER TABLE cocktails ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE wines ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE beers ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE spirits ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE coffee ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE tea ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE waters ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE softdrinks ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE mocktails ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE smoothies ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE milkshakes ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE hotbeverages ADD COLUMN IF NOT EXISTS image_url TEXT;

-- =====================================================
-- STEP 4: INDEXES per food tables
-- =====================================================

-- Cucine nazionali
CREATE INDEX IF NOT EXISTS idx_moroccan_image ON moroccan(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_ethiopian_image ON ethiopian(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_french_image ON french(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_spanish_image ON spanish(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_lebanese_image ON lebanese(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_turkish_image ON turkish(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_greek_image ON greek(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_georgian_image ON georgian(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_armenian_image ON armenian(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_brazilian_image ON brazilian(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_peruvian_image ON peruvian(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_caribbean_image ON caribbean(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_vietnamese_image ON vietnamese(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_korean_image ON korean(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_indian_image ON indian(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_thai_image ON thai(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_chinese_image ON chinese(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_mexican_image ON mexican(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_japanese_image ON japanese(image_url) WHERE image_url IS NOT NULL;

-- Tipo piatto
CREATE INDEX IF NOT EXISTS idx_pasta_image ON pasta(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_pizzas_image ON pizzas(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_risotti_image ON risotti(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_piadine_image ON piadine(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_burgers_image ON burgers(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sandwiches_image ON sandwiches(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_steaks_image ON steaks(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_seafood_image ON seafood(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_appetizers_image ON appetizers(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_desserts_image ON desserts(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_soups_image ON soups(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_salads_image ON salads(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sides_image ON sides(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sauces_image ON sauces(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_dumplings_image ON dumplings(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bakery_image ON bakery(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_icecream_image ON icecream(image_url) WHERE image_url IS NOT NULL;

-- Specifiche
CREATE INDEX IF NOT EXISTS idx_breakfast_image ON breakfast(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_fried_image ON fried(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_vegetarian_image ON vegetarian(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_wraps_image ON wraps(image_url) WHERE image_url IS NOT NULL;

-- =====================================================
-- STEP 5: INDEXES per beverage tables
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_cocktails_image ON cocktails(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_wines_image ON wines(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_beers_image ON beers(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_spirits_image ON spirits(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_coffee_image ON coffee(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tea_image ON tea(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_waters_image ON waters(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_softdrinks_image ON softdrinks(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_mocktails_image ON mocktails(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_smoothies_image ON smoothies(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_milkshakes_image ON milkshakes(image_url) WHERE image_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_hotbeverages_image ON hotbeverages(image_url) WHERE image_url IS NOT NULL;

-- =====================================================
-- STEP 6: COMMENTS per documentazione
-- =====================================================

COMMENT ON COLUMN pasta.image_url IS 'URL immagine prodotto. Supabase Storage o CDN.';
COMMENT ON COLUMN pizzas.image_url IS 'URL immagine prodotto. Supabase Storage o CDN.';
COMMENT ON COLUMN cocktails.image_url IS 'URL immagine prodotto. Supabase Storage o CDN.';

-- =====================================================
-- STEP 7: Query di esempio
-- =====================================================

-- Prodotti con immagine disponibile
-- SELECT id, name, image_url
-- FROM pasta
-- WHERE image_url IS NOT NULL;

-- Statistiche copertura immagini per tabella
-- SELECT
--   'pasta' as table_name,
--   COUNT(*) as total,
--   COUNT(image_url) as with_image,
--   ROUND(100.0 * COUNT(image_url) / COUNT(*), 1) as coverage_pct
-- FROM pasta;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
