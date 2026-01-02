# GUDBRO Database Standards

> Documentazione modularizzata per standard database

---

## File Index

| # | File | Contenuto |
|---|------|-----------|
| 01 | [01-naming-conventions.md](01-naming-conventions.md) | ID, slug, prefissi, convenzioni US English |
| 02 | [02-schema-fields.md](02-schema-fields.md) | Campi obbligatori, popularity, spice, allergens |
| 03 | [03-sql-patterns.md](03-sql-patterns.md) | TEXT+CHECK, indexes, RLS, triggers, product_taxonomy |
| 04 | [04-origin-field.md](04-origin-field.md) | Campo origin JSONB, country/region codes |
| 05 | [05-dish-type.md](05-dish-type.md) | Classificazione universale piatti |
| 06 | [06-ingredient-rules.md](06-ingredient-rules.md) | ingredient_ids, Sistema 5 Dimensioni |
| 07 | [07-translations.md](07-translations.md) | Gestione lingue, tabella translations |
| 08 | [08-file-structure.md](08-file-structure.md) | Struttura cartelle, templates TypeScript |
| 09 | [09-checklists.md](09-checklists.md) | Checklist pre/post import, errori comuni |
| 10 | [10-advanced-fields.md](10-advanced-fields.md) | Sustainability, Multi-Tenant, GTIN, Image |
| 11 | [11-database-hygiene.md](11-database-hygiene.md) | Manutenzione, versionamento, edge cases |

---

## Quick Navigation

**Prima di creare database:**
- [01-naming-conventions.md](01-naming-conventions.md) - Per ID e slug
- [02-schema-fields.md](02-schema-fields.md) - Per schema SQL
- [03-sql-patterns.md](03-sql-patterns.md) - Per product_taxonomy

**Durante import:**
- [06-ingredient-rules.md](06-ingredient-rules.md) - Per verificare ingredienti
- [09-checklists.md](09-checklists.md) - Per checklist

**Riferimento:**
- [04-origin-field.md](04-origin-field.md) - Country/region codes
- [05-dish-type.md](05-dish-type.md) - dish_type values

---

## Related Documentation

| File | Descrizione |
|------|-------------|
| `../TEMPLATES/` | SQL copia-incolla pronti |
| `../LESSONS-LEARNED.md` | Errori e soluzioni (53 lessons) |
| `../../DATABASE-STANDARDS.md` | Quick Reference + indice |
| `../../PROCEDURE-NEW-DATABASE.md` | Guida step-by-step |

---

**Folder:** `docs/STANDARDS/`
**Created:** 2025-12-24
**Purpose:** Modularizzazione DATABASE-STANDARDS.md (1978 → 10 file)
