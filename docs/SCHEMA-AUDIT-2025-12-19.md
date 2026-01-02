# Schema Consistency Audit Report

**Data:** 2025-12-19
**Scope:** ENUM vs TEXT+CHECK, Schema Versioning
**Auditor:** Claude Code

---

## Executive Summary

| Metrica | Valore |
|---------|--------|
| Database totali | 27 |
| v1.1 compliant (TEXT+CHECK) | 12 |
| Legacy (ENUM) | 10 |
| Unknown/Mixed | 5 |

**Rischio:** BASSO - Gli ENUM funzionano, ma sono meno flessibili. La migrazione non è urgente.

---

## Schema Version Matrix

### v1.1 Compliant (TEXT + CHECK) ✅

Questi database usano lo standard moderno, più flessibile:

| Database | Records | Note |
|----------|---------|------|
| korean | 77 | Newest |
| spirits | 197 | |
| thai | 69 | |
| chinese | 73 | |
| vietnamese | 72 | Ready to import |
| seafood | 63 | |
| mexican | 66 | |
| vegetarian | 65 | |
| fried | 48 | |
| breakfast | 65 | |
| indian | 65 | |
| steaks | 74 | |

**Totale v1.1:** 12 database, 934 records

### Legacy (ENUM) ⚠️

Questi database usano PostgreSQL ENUM types:

| Database | Records | ENUM Types |
|----------|---------|------------|
| wines | 143 | wine_type, wine_region |
| pasta | 87 | pasta_category |
| coffee | 76 | coffee_type |
| tea | 62 | tea_type |
| salads | 52 | salad_category |
| appetizers | 51 | appetizer_style |
| sandwiches | 50 | sandwich_type |
| burgers | 45 | burger_style |
| desserts | 35 | dessert_category |
| risotti | 27 | risotto_type |
| sushi | 100 | sushi_category |

**Totale Legacy:** 11 database, 728 records

### Unknown/No Schema File ❓

| Database | Records | Note |
|----------|---------|------|
| cocktails | 227 | Original DB, likely custom |
| pizzas | 62 | |
| beers | 45 | |
| soups | 39 | |
| dumplings | 20 | |

**Totale Unknown:** 5 database, 393 records

---

## ENUM vs TEXT+CHECK: Trade-offs

### ENUM (Legacy)

**Pro:**
- Validation at database level
- Slightly better performance
- Already working

**Contro:**
- Requires migration to add new values
- `ALTER TYPE ... ADD VALUE` can't be in transaction
- Harder to maintain across environments

### TEXT + CHECK (v1.1 Standard)

**Pro:**
- Easy to modify constraints
- Can be changed in transaction
- More flexible for schema evolution
- Standard across all new databases

**Contro:**
- Slightly more verbose
- No IDE autocomplete for values

---

## Raccomandazioni

### Non Urgente - Migrazione ENUM

La migrazione da ENUM a TEXT+CHECK **non è urgente** perché:

1. I database esistenti funzionano correttamente
2. Gli ENUM sono stabili (categorie non cambiano spesso)
3. Il rischio di introdurre bug è maggiore del beneficio

### Raccomandato - Nuovi Database

Tutti i **nuovi database** DEVONO usare TEXT+CHECK (v1.1 standard).

Questo è già il caso per tutti i database creati dal 18 dicembre.

### Futuro - Migrazione Graduale

Se necessario, la migrazione può essere fatta gradualmente:

1. Creare nuova colonna TEXT
2. Copiare dati con CAST
3. Aggiungere CHECK constraint
4. Rimuovere vecchia colonna ENUM
5. Rinominare nuova colonna

**Script template disponibile in:** `shared/database/migrations/templates/enum-to-text-migration.sql` (da creare se necessario)

---

## Prossimi Passi

1. ✅ Security Audit completato
2. ✅ Schema Consistency Audit completato
3. ⏳ Import Vietnamese database
4. 📋 (Opzionale) Migrazione ENUM → TEXT+CHECK per database legacy

---

## Note Tecniche

### Query per verificare ENUM in Supabase

```sql
-- Lista tutti gli ENUM types
SELECT t.typname, e.enumlabel
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typnamespace = 'public'::regnamespace
ORDER BY t.typname, e.enumsortorder;
```

### Query per verificare CHECK constraints

```sql
-- Lista tutti i CHECK constraints
SELECT conrelid::regclass AS table_name,
       conname AS constraint_name,
       pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE contype = 'c'
  AND connamespace = 'public'::regnamespace
ORDER BY conrelid::regclass::text;
```

---

**Conclusione:** Il sistema è sano. I database legacy con ENUM funzionano, i nuovi seguono lo standard v1.1. Nessuna azione urgente richiesta.
