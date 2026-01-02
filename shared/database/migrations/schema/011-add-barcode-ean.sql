-- ============================================
-- GTIN - Global Trade Item Number su ingredients
-- Standard GS1 - Formato normalizzato 14 cifre
-- Created: 2025-12-22
-- ============================================

-- =====================================================
-- STANDARD GS1 INTERNAZIONALE
--
-- GTIN (Global Trade Item Number) è lo standard mondiale
-- per identificare univocamente i prodotti commerciali.
--
-- Formati supportati (normalizzati a 14 cifre):
-- - GTIN-8  → 000000nnnnnnnn (prodotti piccoli)
-- - GTIN-12 → 00nnnnnnnnnnnn (UPC-A, Nord America)
-- - GTIN-13 → 0nnnnnnnnnnnnn (EAN-13, Europa/mondo)
-- - GTIN-14 → nnnnnnnnnnnnnn (unità logistiche)
--
-- Struttura: [Company Prefix] + [Item Reference] + [Check Digit]
--
-- Riferimenti:
-- - https://www.gs1.org/standards/barcodes
-- - https://www.gs1.org/standards/barcodes/ean-upc
-- =====================================================

-- =====================================================
-- STEP 1: Aggiungere campo GTIN normalizzato
-- =====================================================

-- GTIN sempre memorizzato in formato 14 cifre (con padding zeri)
-- Questo segue la raccomandazione ufficiale GS1
ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS gtin CHAR(14);

-- Formato originale del codice (opzionale, per riferimento)
ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS gtin_format TEXT
CHECK (gtin_format IN ('GTIN-8', 'GTIN-12', 'GTIN-13', 'GTIN-14'));

-- =====================================================
-- STEP 2: Constraint di validazione
-- =====================================================

-- Verifica che GTIN contenga esattamente 14 cifre numeriche
ALTER TABLE ingredients
ADD CONSTRAINT chk_gtin_format
CHECK (
  gtin IS NULL
  OR gtin ~ '^[0-9]{14}$'
);

-- =====================================================
-- STEP 3: Indice univoco per lookup
-- =====================================================

-- Indice univoco - un GTIN identifica UN solo prodotto globalmente
CREATE UNIQUE INDEX IF NOT EXISTS idx_ingredients_gtin
ON ingredients(gtin)
WHERE gtin IS NOT NULL;

-- =====================================================
-- STEP 4: Funzione helper per normalizzazione
-- =====================================================

-- Funzione per convertire qualsiasi formato GTIN a 14 cifre
CREATE OR REPLACE FUNCTION normalize_gtin(input_code TEXT)
RETURNS CHAR(14) AS $$
BEGIN
  -- Rimuovi spazi
  input_code := TRIM(input_code);

  -- Verifica che sia numerico
  IF input_code !~ '^[0-9]+$' THEN
    RETURN NULL;
  END IF;

  -- Verifica lunghezza valida
  IF LENGTH(input_code) NOT IN (8, 12, 13, 14) THEN
    RETURN NULL;
  END IF;

  -- Padding a 14 cifre con zeri a sinistra
  RETURN LPAD(input_code, 14, '0');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Funzione per determinare il formato originale
CREATE OR REPLACE FUNCTION detect_gtin_format(input_code TEXT)
RETURNS TEXT AS $$
BEGIN
  input_code := TRIM(input_code);

  IF input_code !~ '^[0-9]+$' THEN
    RETURN NULL;
  END IF;

  CASE LENGTH(input_code)
    WHEN 8 THEN RETURN 'GTIN-8';
    WHEN 12 THEN RETURN 'GTIN-12';
    WHEN 13 THEN RETURN 'GTIN-13';
    WHEN 14 THEN RETURN 'GTIN-14';
    ELSE RETURN NULL;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =====================================================
-- STEP 5: Commenti per documentazione
-- =====================================================

COMMENT ON COLUMN ingredients.gtin IS
'Global Trade Item Number (GS1 standard). Sempre 14 cifre con padding zeri. NULL = non disponibile.';

COMMENT ON COLUMN ingredients.gtin_format IS
'Formato originale del codice: GTIN-8, GTIN-12 (UPC), GTIN-13 (EAN), GTIN-14. NULL = non specificato.';

COMMENT ON FUNCTION normalize_gtin(TEXT) IS
'Converte GTIN da qualsiasi formato (8/12/13/14 cifre) al formato normalizzato 14 cifre.';

COMMENT ON FUNCTION detect_gtin_format(TEXT) IS
'Rileva il formato originale di un codice GTIN dalla sua lunghezza.';

-- =====================================================
-- STEP 6: Query di esempio
-- =====================================================

-- Inserire un nuovo GTIN (esempio EAN-13 italiano)
-- UPDATE ingredients
-- SET gtin = normalize_gtin('8001234567890'),
--     gtin_format = detect_gtin_format('8001234567890')
-- WHERE id = 'ING_EXAMPLE';

-- Lookup ingrediente per GTIN (accetta qualsiasi formato)
-- SELECT id, name, category
-- FROM ingredients
-- WHERE gtin = normalize_gtin('8001234567890');

-- Ingredienti con GTIN disponibile
-- SELECT id, name, gtin, gtin_format
-- FROM ingredients
-- WHERE gtin IS NOT NULL
-- ORDER BY name;

-- Statistiche copertura GTIN per categoria
-- SELECT
--   category,
--   COUNT(*) as total,
--   COUNT(gtin) as with_gtin,
--   ROUND(100.0 * COUNT(gtin) / COUNT(*), 1) as coverage_pct
-- FROM ingredients
-- GROUP BY category
-- ORDER BY coverage_pct DESC;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
