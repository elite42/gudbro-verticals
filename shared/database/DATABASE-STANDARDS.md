# GUDBRO Database Standards v2.0

> **STATUS:** DEFINITIVO - Quick Reference + link a documentazione dettagliata
> **Last Updated:** 2025-12-28
> **Refactored:** 1978 righe → Quick Reference + 10 file modulari
> **Structure:** v6.0 - Nuova organizzazione cartelle

---

## Prima di Lavorare

```
1. LEGGI questo file (Quick Reference)
2. CONSULTA _system/docs/STANDARDS/ per dettagli
3. USA _system/docs/TEMPLATES/ per SQL copia-incolla
4. SEGUI _system/docs/LESSONS-LEARNED.md per errori noti
```

## Struttura Database (v6.0)

```
shared/database/
├── cuisines/           # Cucine nazionali/regionali
│   ├── asian/          # japanese, korean, chinese, thai, vietnamese, etc.
│   ├── european/       # italian, french, spanish, german, british, etc.
│   ├── americas/       # mexican, brazilian, caribbean, cajun, etc.
│   ├── african/        # moroccan, ethiopian, nigerian, etc.
│   ├── oceania/        # australian, hawaiian
│   └── fusion/         # nikkei, indochinese, koreanmex, texmex
├── beverages/          # cocktails, wines, spirits, coffee, tea, etc.
├── dishes/             # pasta, pizzas, steaks, burgers, seafood, etc.
├── sides/              # salads, soups, desserts, appetizers, etc.
├── ingredients/        # Master ingredients (2548)
├── migrations/         # schema/, ingredients/, nutrition/
└── _system/            # types, scripts, docs, schema, utils
```

---

## Quick Reference

### ID Format
```
Products:    {PREFIX}_{NAME}     → STK_RIBEYE, GER_SCHNITZEL
Ingredients: ING_{NAME}          → ING_BEEF_RIBEYE
Slug:        lowercase-hyphens   → classic-ribeye
```

### Prefissi Comuni
| Database | Prefix | | Database | Prefix |
|----------|--------|---|----------|--------|
| Steaks | STK | | Japanese | JPN |
| Pasta | PST | | Korean | KOR |
| Pizza | PIZ | | French | FRE |
| German | GER | | Spanish | SPA |
| British | BRI | | Italian | ITA |
| Ingredients | ING | | | |

> **Lista completa:** [01-naming-conventions.md](docs/STANDARDS/01-naming-conventions.md)

---

### product_taxonomy (Cucine Etniche)

```sql
INSERT INTO product_taxonomy (
  product_type, menu_type, service_type, category,
  display_name_en, display_name_it, display_order, icon,
  is_alcoholic, is_hot_served, requires_cooking
)
SELECT
  '{cuisine}', 'standalone', 'food', 'second_course',
  '{Display Name}', '{Nome IT}', 50, '{emoji}',
  false, true, true
WHERE NOT EXISTS (
  SELECT 1 FROM product_taxonomy WHERE product_type = '{cuisine}'
);
```

> **Template completo:** [docs/TEMPLATES/01-product-taxonomy-cuisine.sql](docs/TEMPLATES/01-product-taxonomy-cuisine.sql)

---

### product_ingredients

```sql
INSERT INTO product_ingredients
  (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('{table}', '{PRODUCT_ID}', 'ING_{NAME}', 'main', 1);
```

**role values:** `main`, `secondary`, `seasoning`, `garnish`, `sauce`

> **Template completo:** [docs/TEMPLATES/04-product-ingredients.sql](docs/TEMPLATES/04-product-ingredients.sql)

---

### ingredient_category (Valori Validi)

```
-- Core categories
fruits, vegetables, spices, grains, herbs, dairy, eggs, rice, nuts,
legumes, pasta, bread, oils, fats, sweeteners, syrups, condiments,
sauces, powders, other

-- Meat categories (v2.1 - split from proteins)
red_meat,      -- Beef, pork, lamb, veal, goat - fresh cuts
poultry,       -- Chicken, duck, turkey, goose
game,          -- Rabbit, reindeer, exotic (kangaroo, emu, alligator)
offal,         -- Liver, kidney, heart, tripe, tongue, intestines
cured_meats,   -- Dry-cured: prosciutto, bresaola, bacon, salami
sausages,      -- Fresh/cooked: bratwurst, kielbasa, chorizo, mortadella
proteins,      -- Remaining: tofu, seitan, broths, meatballs, fish products

-- Seafood
seafood

-- Beverages
spirits, liqueurs, wines, beers, juices, mixers, beverages,
dairy_alternatives, coffee, tea, bitters, baked_goods, cheese
```

> **Note:** `proteins` ora contiene solo prodotti preparati (tofu, brodi, polpette).
> Le carni fresche sono in `red_meat`, `poultry`, `game`, `offal`.
> I salumi sono in `cured_meats` (stagionati) e `sausages` (freschi).

---

### Scale Standard

| Campo | Scala | Note |
|-------|-------|------|
| `popularity` | 0-100 | 0-20 raro, 81-100 iconico |
| `spice_level` | 0-5 | 0 none, 5 extreme |

---

### Status Values

```sql
CHECK (status IN ('active', 'classic', 'popular', 'signature', 'seasonal', 'premium', 'traditional'))
```

---

## Documentazione Dettagliata

### docs/STANDARDS/

| File | Contenuto |
|------|-----------|
| [01-naming-conventions.md](_system/docs/STANDARDS/01-naming-conventions.md) | ID, slug, prefissi, US English |
| [02-schema-fields.md](_system/docs/STANDARDS/02-schema-fields.md) | Campi obbligatori, popularity, allergens |
| [03-sql-patterns.md](_system/docs/STANDARDS/03-sql-patterns.md) | TEXT+CHECK, indexes, RLS, triggers |
| [04-origin-field.md](_system/docs/STANDARDS/04-origin-field.md) | Origin JSONB, country/region codes |
| [05-dish-type.md](_system/docs/STANDARDS/05-dish-type.md) | Classificazione universale piatti |
| [06-ingredient-rules.md](_system/docs/STANDARDS/06-ingredient-rules.md) | ingredient_ids, Sistema 5 Dimensioni |
| [07-translations.md](_system/docs/STANDARDS/07-translations.md) | Gestione lingue |
| [08-file-structure.md](_system/docs/STANDARDS/08-file-structure.md) | Struttura cartelle |
| [09-checklists.md](_system/docs/STANDARDS/09-checklists.md) | Checklist, errori comuni |
| [10-advanced-fields.md](_system/docs/STANDARDS/10-advanced-fields.md) | Sustainability, GTIN, Image |
| [11-database-hygiene.md](_system/docs/STANDARDS/11-database-hygiene.md) | Manutenzione, versionamento, edge cases |

### _system/docs/TEMPLATES/

| File | Uso |
|------|-----|
| [01-product-taxonomy-cuisine.sql](_system/docs/TEMPLATES/01-product-taxonomy-cuisine.sql) | Registrare nuova cucina |
| [02-schema-cuisine.sql](_system/docs/TEMPLATES/02-schema-cuisine.sql) | Schema completo tabella |
| [03-missing-ingredients.sql](_system/docs/TEMPLATES/03-missing-ingredients.sql) | Aggiungere ingredienti |
| [04-product-ingredients.sql](_system/docs/TEMPLATES/04-product-ingredients.sql) | Link prodotti-ingredienti |

### Altre Risorse

| File | Descrizione |
|------|-------------|
| [PROCEDURE-NEW-DATABASE.md](PROCEDURE-NEW-DATABASE.md) | Guida step-by-step |
| [_system/docs/LESSONS-LEARNED.md](_system/docs/LESSONS-LEARNED.md) | 53 errori e soluzioni |
| [_system/docs/VALIDATION-CHECKLIST.md](_system/docs/VALIDATION-CHECKLIST.md) | Checklist pre/post import |

---

## Errori Frequenti (Quick Fix)

| Errore | Causa | Fix |
|--------|-------|-----|
| `column is_active does not exist` | product_taxonomy | Rimuovere is_active |
| `ON CONFLICT` fallisce | No UNIQUE | Usare `WHERE NOT EXISTS` |
| `category = 'cuisine'` invalido | CHECK constraint | Usare `'second_course'` |
| `is_primary` non esiste | product_ingredients | Usare `role = 'main'` |
| `nuts_seeds` invalido | ingredient_category | Usare `nuts` |

> **Lista completa:** [09-checklists.md](docs/STANDARDS/09-checklists.md)

---

## Checklist Rapida

### Pre-Import
- [ ] ID: `PREFIX_NAME` uppercase
- [ ] Slug: `lowercase-hyphens`
- [ ] Popularity: scala 0-100
- [ ] Spice: scala 0-5
- [ ] Boolean: NOT NULL DEFAULT false
- [ ] Arrays: `[]` non null

### Post-Import
- [ ] product_taxonomy inserito
- [ ] product_ingredients creati
- [ ] DATABASE-INVENTORY.md aggiornato
- [ ] BACKLOG.md aggiornato

---

## Changelog

### v2.2 (2025-12-28)
- **Folder Restructuring (v6.0):** Riorganizzazione completa cartelle database
  - `cuisines/` con 6 sottocartelle regionali (asian, european, americas, african, oceania, fusion)
  - `beverages/` per tutte le bevande
  - `dishes/` per piatti principali
  - `sides/` per contorni e antipasti
  - `_system/` per types, scripts, docs, schema, utils
  - `migrations/` con schema/, ingredients/, nutrition/
- **Nutrition 100%:** Completato backfill nutrition (2548/2548 ingredienti)

### v2.1 (2025-12-27)
- **Protein Category Restructuring:** Split `proteins` (439 items) into 6 specific categories:
  - `red_meat` (~95): beef, pork, lamb, veal, goat
  - `poultry` (~30): chicken, duck, turkey, goose
  - `game` (~12): rabbit, reindeer, kangaroo, emu, alligator
  - `offal` (~40): liver, kidney, heart, tripe, tongue
  - `cured_meats` (~90): prosciutto, bresaola, bacon, salami
  - `sausages` (~90): bratwurst, kielbasa, chorizo, mortadella
  - `proteins` (~80): tofu, seitan, broths, meatballs (remaining)
- Migration scripts in `migrations/2025-12-27-charcuterie-category/`

### v2.0 (2025-12-24)
- **Refactoring completo:** 1978 righe → Quick Reference + 10 file modulari
- Creata cartella `docs/STANDARDS/` con 10 file separati
- Creata cartella `docs/TEMPLATES/` con 4 SQL templates
- Archiviati file ridondanti in `docs/archive/`

### v1.7 (2025-12-23)
- Image URL field su 53 tabelle

### v1.6 (2025-12-22)
- Sustainability, Multi-Tenant, GTIN fields

### v1.5 (2025-12-22)
- Dish Type system (42 tabelle)

### v1.4 (2025-12-22)
- Origin JSONB field

---

**File:** `DATABASE-STANDARDS.md`
**Maintainer:** Claude Code
**Status:** DEFINITIVO - v2.0
