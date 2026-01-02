# ADR-002: English-Only Database

**Status:** Accepted
**Date:** 2025-12-16

## Context

I database food (cocktails, pasta, pizzas, etc.) contenevano traduzioni inline in più lingue. Questo causava:
- Duplicazione dei dati
- Difficoltà di manutenzione
- Inconsistenza nelle traduzioni
- Schema complessi con campi `name_en`, `name_it`, `name_vi`, etc.

## Decision

**Tutti i database food usano SOLO inglese come lingua base.**

Le traduzioni sono gestite in una tabella separata `translations`:

```sql
translations (
  entity_type TEXT,   -- 'ingredient', 'cocktail', 'pasta'
  entity_id TEXT,     -- ID del record
  field TEXT,         -- 'name', 'description'
  locale TEXT,        -- 'it', 'vi', 'ko', 'ja'
  value TEXT          -- Testo tradotto
)
```

## Consequences

**Positivi:**
- Schema puliti e semplici
- Una sola fonte di verità (inglese)
- Traduzioni gestibili separatamente
- Facile aggiungere nuove lingue senza modificare schema
- Traduzioni possono essere verificate/approvate

**Negativi:**
- JOIN necessario per ottenere traduzioni
- Migration necessaria per database esistenti con traduzioni inline
- Richiede popolare la tabella translations (598 ingredienti x N lingue)

## Implementazione

- `shared/database/ingredients/master/schema-v2.sql` - Schema con tabella translations
- 598 ingredienti in inglese importati in Supabase
- Tabella translations creata ma ancora da popolare
