# ADR-003: Master Ingredients Architecture

**Status:** Accepted
**Date:** 2025-12-16

## Context

Ogni database food (cocktails, pasta, pizzas, etc.) gestiva gli ingredienti in modo diverso:
- Cocktails: `ingredient_id` references (standardizzato)
- Pasta/Pizzas/Salads: `ingredient_id` references (standardizzato)
- Appetizers/Desserts/Soups: `main_ingredients: string[]` (raw strings)

Questo causava:
- Duplicazione degli ingredienti
- Impossibilità di calcolare allergeni automaticamente
- Inconsistenza nei nomi

## Decision

**Creare una Master Ingredients Table unica** che:
1. Contiene tutti gli ingredienti una sola volta
2. Include allergeni, intolleranze, diete per ogni ingrediente
3. Permette calcolo automatico delle 5 dimensioni per ogni prodotto

### Schema

```sql
ingredients (
  id TEXT PRIMARY KEY,        -- 'ING_GIN_LONDON_DRY'
  slug TEXT UNIQUE,           -- 'gin-london-dry'
  name TEXT,                  -- 'London Dry Gin'
  category ingredient_category,
  allergens JSONB,
  intolerances JSONB,
  dietary JSONB,
  spice_level INTEGER
)

product_ingredients (
  product_type TEXT,          -- 'cocktail', 'pasta'
  product_id TEXT,            -- 'COCKTAIL_NEGRONI'
  ingredient_id TEXT REFERENCES ingredients(id),
  quantity_amount DECIMAL,
  quantity_unit TEXT          -- Sempre metrico: 'g', 'ml'
)
```

## Consequences

**Positivi:**
- Single source of truth per ingredienti
- Calcolo automatico allergeni/diete per prodotto
- Nessuna duplicazione
- Facile aggiungere nuovi ingredienti
- Traduzioni centralizzate

**Negativi:**
- Richiede migrazione dei 326 raw strings esistenti
- Più complesso per query semplici (JOIN necessari)
- Richiede ID standardizzati (ING_CATEGORY_NAME)

## Status Implementazione

- [x] Schema creato (`schema-v2.sql`)
- [x] 598 ingredienti importati in Supabase
- [ ] 326 raw strings da mappare a ING_* IDs
- [ ] Appetizers/Desserts/Soups da aggiornare per usare ingredient_id
