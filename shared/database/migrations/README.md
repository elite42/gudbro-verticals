# Database Migrations

Organizzazione delle migrazioni SQL per il progetto GUDBRO.

## Struttura

```
migrations/
├── schema/        # Core database schema (001-020+)
├── ingredients/   # Ingredient expansions (cheese, salumi, proteins, etc.)
├── nutrition/     # Nutrition data backfills
└── archive/       # Old/combined files (reference only)
```

## Schema (Core)

Migrazioni numerate per lo schema principale del database:

| File | Descrizione |
|------|-------------|
| 001-enable-rls-all-tables | Row Level Security |
| 002-fix-function-search-path | Security fixes |
| 003-020+ | Features: recipes, modifiers, translations, analytics, etc. |

## Ingredients

Espansioni della tabella `ingredients`:

| Cartella/File | Descrizione |
|---------------|-------------|
| 2025-12-26-cheese-global-expansion | +140 formaggi globali |
| 2025-12-26-salumi-global-expansion | +90 salumi globali |
| 2025-12-27-charcuterie-category/ | Ristrutturazione categorie proteine |
| 2025-12-27-exotic-proteins/ | +33 proteine esotiche |
| 2025-12-27-fruits-nuts-expansion/ | +47 frutta e noci |

## Nutrition

Backfill dati nutrizionali:

| Cartella | Ingredienti | Coverage |
|----------|-------------|----------|
| 2025-12-27-nutrition-backfill/ | 154 | 92%→96% |
| 2025-12-28-nutrition-backfill-final/ | 56 | 96%→98% |
| 2025-12-28-nutrition-final-100/ | 58 | 98%→100% |

## Come Eseguire

1. Aprire Supabase SQL Editor
2. Eseguire i file `.sql` in ordine numerico
3. Verificare con le query di controllo incluse

## Note

- I file in `archive/` sono solo per riferimento storico
- Non eseguire `ALL-MIGRATIONS-COMBINED.sql` su database esistenti
