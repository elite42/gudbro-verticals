# DATABASE-STANDARDS Changelog

> Storia completa delle versioni

---

## v2.0 (2025-12-24)
- **Refactoring completo:** 1978 righe → Quick Reference + 11 file modulari
- Creata cartella `docs/STANDARDS/` con 11 file separati
- Creata cartella `docs/TEMPLATES/` con 4 SQL templates
- Archiviati file ridondanti in `docs/archive/`

## v1.7 (2025-12-23)
- **NUOVA SEZIONE 19:** Image URL Field
  - Campo `image_url TEXT` su 53 tabelle (1 ingredients + 52 food/beverages)
  - Partial index per query efficienti
  - Formato URL: Supabase Storage o CDN esterno
  - Script: `012-add-image-url-fields.sql`

## v1.6 (2025-12-22)
- **NUOVA SEZIONE 16:** Sustainability Fields
  - Campi opzionali su `ingredients`: sustainability_score, carbon_footprint_kg, production_method, is_seasonal, season_months
  - Tutti NULL di default (no greenwashing con dati inventati)
  - 13 valori production_method (organic, grass_fed, wild_caught, ecc.)
  - Nota: is_local deriva dinamicamente da origin vs merchant location
  - Script: `009-add-sustainability-fields.sql`
- **NUOVA SEZIONE 17:** Multi-Tenant Fields
  - Campi `is_public` + `owner_id` su 55 tabelle (1 ingredients + 42 food + 12 beverages)
  - Permette merchant di creare record custom dal backoffice
  - Query pattern per record globali, merchant-specific, e combinati
  - Script: `010-add-is-public-field.sql`
- **NUOVA SEZIONE 18:** GTIN / Barcode Standard
  - Standard internazionale GS1 per codici a barre
  - Campo `gtin` CHAR(14) normalizzato (padding zeri)
  - Campo `gtin_format` per formato originale (GTIN-8/12/13/14)
  - Funzioni helper: `normalize_gtin()`, `detect_gtin_format()`
  - Supporta EAN-8, EAN-13 (Europa), UPC-A (USA), GTIN-14 (logistica)
  - Script: `011-add-barcode-ean.sql`
- Aggiornato indice con 3 nuove sezioni

## v1.5 (2025-12-22)
- **NUOVA SEZIONE 4:** Dish Type Field (OBBLIGATORIO)
  - Campo `dish_type` per classificazione universale piatti
  - 20 valori validi (appetizer, main, soup, pasta, grill, ecc.)
  - Abilita query cross-cuisine
  - 42 tabelle food coperte
  - Script: `008-add-dish-type-system.sql`

## v1.4 (2025-12-22)
- **NUOVA SEZIONE 3:** Origin Field (OBBLIGATORIO) - Schema completo per tracciare origine geografica
  - Campo `origin JSONB` obbligatorio per tutti i prodotti food/bevande
  - **Nuovo campo `region_type`**: 4 tipi di origine supportati:
    - `country`: Origine nazionale specifica (Italia, Giappone, Messico)
    - `continent`: Origine continentale (Africa, Asia, Europe)
    - `region`: Area geografica multi-paese (Caribbean, Middle East, Mediterranean)
    - `global`: Prodotti internazionali senza origine specifica
  - **Nuovi codici geografici:**
    - Country codes: ISO 3166-1 alpha-2 (40+ paesi)
    - Continent codes: AF, AS, EU, NA, SA, OC, AN
    - Region codes: CAR, CAM, SAM, MEA, SEA, EAS, SAS, MED, SCA, CEU, EEU, BRI, PAC, AND, TRO
  - Campo `is_international` per prodotti globalizzati (Coca-Cola, Starbucks)
  - Campo `local_region` per regioni interne (Lazio, Provence, Jalisco)
  - Esempi completi per ogni tipo di origine
  - Query di esempio per paese/continente/regione/globale
  - Index consigliati per ogni tipo di query
  - **Fase 1 completata:** 12 cucine nazionali migrate
  - Stato attuale: 23 tabelle OK, 2 TEXT→JSONB, ~18 da aggiungere
- Rinumerata sezione 4 (Data Format Rules) e successive

## v1.3 (2025-12-20)
- **Nuova sezione 1.2:** Convenzioni Ingredienti (da Cleanup Duplicati)
  - 63 duplicati consolidati in Supabase
  - Convenzione **US English** (scallion, shrimp, ground, cilantro)
  - Convenzione **Singolare** (egg, almond, mushroom)
  - Convenzione **Naming descrittivo** (ground_beef, pickled_ginger)
  - Convenzione **Nome completo funghi** (shiitake_mushrooms)
- Rinumerati sezioni 1.3 Slug Format, 1.4 Name Format
- Scripts cleanup: `ingredients/cleanup/01-fase1a-duplicati-esatti.sql`, `02-fase1b-linguistici-uk-us.sql`, `03-fase1c-singolare-plurale.sql`

## v1.2 (2025-12-19)
- **Aggiunta sezione 7.5:** product_taxonomy con valori validi e errori comuni
- **Aggiunta sezione 7.6:** product_ingredients junction table (struttura corretta)
- **Aggiunta sezione 7.7:** ingredient_category ENUM valori validi
- **Nuove sezioni errori:** 10.2, 10.3, 10.4 con errori SQL frequenti
- **Lezioni apprese dall'import Turkish (6 errori risolti):**
  1. `table_name` → `product_type` in product_taxonomy
  2. `ON CONFLICT` → `WHERE NOT EXISTS` per product_taxonomy
  3. `world_cuisine` → `second_course` per cucine etniche
  4. `menu_type='food'` → `menu_type='standalone'` per cucine etniche
  5. `nuts_seeds` → `nuts` per ingredient_category
  6. `is_primary` → `role='main'/'secondary'` in product_ingredients
- Aggiornata lista prefissi con nuove cucine etniche

## v1.1 (2025-12-18)
- **BREAKING CHANGE:** TEXT + CHECK invece di ENUM
  - Ricerca best practices: ENUM ha problemi con migrations e Supabase
  - TEXT + CHECK è più flessibile e compatibile
  - Fonti: Supabase Docs, DEV.to, Prisma Issues
- Aggiornata sezione 7.1 con nuovo pattern
- Aggiornata checklist 9.3
- Deprecato pattern ENUM con DO $$ blocks

## v1.0 (2025-12-17)
- **Versione definitiva** dopo review collaborativa Claude Code + Claude Opus Browser
- **Decisioni architetturali confermate:**
  - `name`/`description`: TEXT (inglese) - traduzioni in tabella separata
  - `id`: TEXT con PREFIX_NAME (non UUID)
  - `ingredient_ids`: ING_* format
  - `popularity`: 0-100 (non 1-5)
  - `spice_level`: 0-5
- **Aggiunte da Opus:**
  - TIMESTAMPTZ obbligatorio (non TIMESTAMP)
  - NOT NULL DEFAULT per tutti i boolean
  - RLS obbligatorio su tutte le tabelle
  - search_path su tutte le funzioni
  - Sezione Edge Cases
  - Errori comuni espansi
- **Struttura finale:** 12 sezioni complete con esempi, tabelle, checklist

## v0.9 (2025-12-17)
- Draft iniziale per review

---

**File:** `docs/STANDARDS/CHANGELOG.md`
