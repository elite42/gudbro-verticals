# Advanced Fields Reference

> Campi avanzati: Sustainability, Multi-Tenant, GTIN, Image URL

---

## 1. Sustainability Fields (v1.6)

> Campi opzionali su `ingredients`. **Tutti NULL di default** - non popolare con dati inventati.

### Schema

```sql
-- Score generale (0-100)
sustainability_score INTEGER CHECK (sustainability_score >= 0 AND sustainability_score <= 100);

-- Carbon footprint (kg CO2/kg prodotto)
carbon_footprint_kg DECIMAL(6,3);

-- Metodo produzione
production_method TEXT CHECK (production_method IN (
  'conventional', 'organic', 'biodynamic',
  'greenhouse', 'open_field',
  'wild_caught', 'farm_raised',
  'free_range', 'cage_free',
  'grass_fed', 'grain_fed',
  'hydroponic', 'vertical_farm'
));

-- Stagionalità
is_seasonal BOOLEAN DEFAULT NULL;
season_months INTEGER[] DEFAULT NULL;  -- Array 1-12
```

### Note

- **is_local**: Deriva dinamicamente da `origin.country_code` vs merchant location
- **Carbon footprint**: Produzione (~83%) > trasporto (~11-19%)

---

## 2. Multi-Tenant Fields (v1.6)

> Permette merchant di creare record custom dal backoffice

### Schema (55 tabelle)

```sql
-- Distingue globali (TRUE) da merchant-custom (FALSE)
is_public BOOLEAN NOT NULL DEFAULT TRUE;

-- Merchant che ha creato il record
owner_id UUID DEFAULT NULL;
```

### Query Pattern

```sql
-- Record globali GUDBRO
SELECT * FROM pasta WHERE is_public = TRUE;

-- Record di un merchant
SELECT * FROM pasta WHERE owner_id = 'uuid-merchant';

-- Tutti visibili a merchant (globali + propri)
SELECT * FROM pasta
WHERE is_public = TRUE OR owner_id = 'uuid-merchant';
```

---

## 3. GTIN / Barcode (v1.6)

> Standard internazionale GS1 per codici a barre

### Formati Supportati

| Formato | Cifre | Uso | Barcode |
|---------|-------|-----|---------|
| GTIN-8 | 8 | Prodotti piccoli | EAN-8 |
| GTIN-12 | 12 | Nord America | UPC-A |
| GTIN-13 | 13 | Europa/mondo | EAN-13 |
| GTIN-14 | 14 | Logistica | ITF-14 |

### Schema (ingredients)

```sql
-- Sempre 14 cifre (con padding zeri)
gtin CHAR(14) CHECK (gtin IS NULL OR gtin ~ '^[0-9]{14}$');

-- Formato originale
gtin_format TEXT CHECK (gtin_format IN ('GTIN-8', 'GTIN-12', 'GTIN-13', 'GTIN-14'));
```

### Funzioni Helper

```sql
-- Normalizza a 14 cifre
SELECT normalize_gtin('8001234567890');  -- '08001234567890'

-- Rileva formato
SELECT detect_gtin_format('8001234567890');  -- 'GTIN-13'
```

---

## 4. Image URL (v1.7)

> Campo immagine su tutti i prodotti e ingredienti (53 tabelle)

### Schema

```sql
image_url TEXT;

-- Partial index
CREATE INDEX IF NOT EXISTS idx_{table}_image
ON {table}(image_url)
WHERE image_url IS NOT NULL;
```

### Formato URL

```
# Supabase Storage
https://vnaonebbuezrzvjekqxs.supabase.co/storage/v1/object/public/images/pasta/carbonara.jpg

# CDN esterno
https://cdn.gudbro.com/images/pasta/carbonara.jpg
```

### Query

```sql
-- Prodotti con immagine
SELECT id, name, image_url FROM pasta WHERE image_url IS NOT NULL;

-- Copertura immagini
SELECT
  COUNT(*) as total,
  COUNT(image_url) as with_image,
  ROUND(100.0 * COUNT(image_url) / COUNT(*), 1) as coverage_pct
FROM pasta;
```

---

**File:** `docs/STANDARDS/10-advanced-fields.md`
