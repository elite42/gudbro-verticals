# Migration: Protein Category Restructuring

**Date:** 2025-12-27
**Purpose:** Split generic `proteins` category (439 items) into 6 specific meat categories

## Summary

| Category | Description | Expected Count |
|----------|-------------|----------------|
| `red_meat` | Beef, pork, lamb, veal, goat - fresh cuts | ~95 |
| `poultry` | Chicken, duck, turkey, goose | ~30 |
| `game` | Rabbit, reindeer, exotic (kangaroo, emu, alligator) | ~12 |
| `offal` | Liver, kidney, heart, tripe, tongue, intestines | ~40 |
| `cured_meats` | Dry-cured/aged: prosciutto, bresaola, bacon, salami | ~90 |
| `sausages` | Fresh/cooked: bratwurst, kielbasa, chorizo, mortadella | ~90 |
| `proteins` | Remaining: tofu, seitan, broths, meatballs, fish products | ~80 |

**Total:** 439 ingredients (unchanged, just reorganized)

## IMPORTANTE: Lezione #41

> **PostgreSQL ENUM: nuovi valori devono essere COMMITTED prima di poterli usare.**
>
> Eseguire script 01 PRIMA, poi DOPO (sessione separata) gli script 02-07.

## Execution Order

Execute in Supabase SQL Editor in this order:

### STEP 1 - Aggiungere valori all'ENUM

```
01-add-enum-values.sql    -- Aggiunge 6 nuovi valori all'ENUM
```

Dopo esecuzione, verificare che i nuovi valori compaiano nel risultato.

### STEP 2 - Eseguire migrazioni (DOPO che Step 1 è completato)

```
02-migrate-red-meat.sql              -- ~95 items
03-migrate-poultry.sql               -- ~30 items
04-migrate-game.sql                  -- ~12 items
05-migrate-offal.sql                 -- ~40 items
06-migrate-cured-meats.sql           -- ~90 items
07-migrate-sausages.sql              -- ~90 items
08-verify-migration.sql              -- Verification queries
```

## Post-Migration

1. Run `08-verify-migration.sql` to confirm counts
2. DATABASE-STANDARDS.md già aggiornato (v2.1)
3. Sync ingredient cache: `./sync-ingredients.sh`
4. Update `DATABASE-INVENTORY.md` con nuove categorie

## Rollback

If needed, restore all to proteins:

```sql
UPDATE ingredients SET category = 'proteins'
WHERE category IN ('red_meat', 'poultry', 'game', 'offal', 'cured_meats', 'sausages');
```

**NOTA:** Non è possibile rimuovere valori da un ENUM PostgreSQL senza ricreare il tipo.

## Files

- `00-protein-category-mapping.md` - Planning document
- `01-add-enum-values.sql` - Aggiunge valori all'ENUM ingredient_category
- `02-migrate-red-meat.sql` - Beef, pork, lamb, veal, goat
- `03-migrate-poultry.sql` - Chicken, duck, turkey, goose
- `04-migrate-game.sql` - Game + exotic meats
- `05-migrate-offal.sql` - Organ meats
- `06-migrate-cured-meats.sql` - Dry-cured meats
- `07-migrate-sausages.sql` - Fresh/cooked sausages
- `08-verify-migration.sql` - Verification queries
