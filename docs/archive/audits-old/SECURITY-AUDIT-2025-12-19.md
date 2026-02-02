# Security Audit Report - Database Phase 1

**Data:** 2025-12-19
**Scope:** RLS (Row Level Security) + search_path
**Auditor:** Claude Code

---

## Executive Summary

| Metrica | Valore |
|---------|--------|
| Tabelle totali | 31 |
| Tabelle con RLS nello schema | 27 |
| Tabelle senza RLS nello schema | 4 |
| Script di fix esistente | Sì (ma incompleto) |
| Funzioni da verificare | ~30 |

**Rischio:** MEDIO - La maggior parte delle tabelle food/product sono pubbliche in lettura, ma mancano policy su alcune tabelle nuove.

---

## Findings

### 1. Tabelle Senza RLS nello Schema (da verificare in Supabase)

| Tabella | Status Schema | Note |
|---------|---------------|------|
| `indian` | ❌ No RLS | Manca completamente - da aggiungere |
| `sushi` | ❓ Non trovato | Migrata da `japanese` - verificare |
| `japanese` | ⚠️ Deprecata | Nello script vecchio, ma tabella rinominata |

### 2. Tabelle Non Coperte dallo Script di Fix Esistente

Lo script `fix-rls-and-search-path.sql` (datato 2025-12-18) copre solo 20 tabelle. Mancano:

| Tabella | RLS in Schema | Da Aggiungere a Fix |
|---------|---------------|---------------------|
| `mexican` | ✅ | Sì - verifica |
| `vegetarian` | ✅ | Sì - verifica |
| `fried` | ✅ | Sì - verifica |
| `breakfast` | ✅ | Sì - verifica |
| `indian` | ❌ | **Sì - CRITICO** |
| `thai` | ✅ | Sì - verifica |
| `chinese` | ✅ | Sì - verifica |
| `korean` | ✅ | Sì - verifica |
| `spirits` | ✅ | Sì - verifica |
| `sushi` | ❓ | **Sì - CRITICO** |
| `seafood` | ✅ | Sì - verifica |
| `vietnamese` | ✅ | Sì - verifica |
| `product_taxonomy` | ✅ | Sì - verifica |

### 3. Funzioni Trigger (search_path)

Le funzioni `update_*_updated_at()` per le nuove tabelle potrebbero non avere `SET search_path = public`. Da verificare:

- `update_mexican_updated_at()`
- `update_vegetarian_updated_at()`
- `update_fried_updated_at()`
- `update_breakfast_updated_at()`
- `update_indian_updated_at()`
- `update_thai_updated_at()`
- `update_chinese_updated_at()`
- `update_korean_updated_at()`
- `update_spirits_updated_at()`
- `update_sushi_updated_at()`
- `update_seafood_updated_at()`
- `update_vietnamese_updated_at()`

### 4. Inconsistenze Naming

| Problema | Dettaglio |
|----------|-----------|
| `japanese` vs `sushi` | La tabella è stata rinominata ma lo script di fix fa riferimento a `japanese` |
| `product_taxonomy` | Nuova tabella, non nello script di fix |

---

## Raccomandazioni

### Priorità ALTA (P1)

1. **Creare script di fix aggiornato** che copra TUTTE le 31 tabelle
2. **Aggiungere RLS a `indian`** - unica tabella senza RLS nello schema
3. **Verificare `sushi`** - confermare che RLS sia attivo dopo migrazione da `japanese`

### Priorità MEDIA (P2)

4. **Eseguire lo script di fix in Supabase** per assicurarsi che RLS sia attivo
5. **Verificare funzioni trigger** per search_path

### Priorità BASSA (P3)

6. **Rimuovere riferimenti a `japanese`** dallo script (tabella non esiste più)
7. **Documentare policy standard** per nuove tabelle future

---

## Script di Fix Consigliato

Vedi file: `shared/database/fixes/fix-rls-complete-2025-12-19.sql`

Questo script:
1. Abilita RLS su TUTTE le 31 tabelle
2. Crea policy standard (public read, service write)
3. Aggiorna funzioni trigger con search_path
4. Usa `IF EXISTS` per evitare errori su tabelle mancanti

---

## Verifica Post-Fix

Dopo aver eseguito lo script, verificare con:

```sql
-- Check RLS status
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename NOT LIKE 'pg_%'
ORDER BY tablename;

-- Check policies
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check functions have search_path
SELECT proname, proconfig
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
  AND proname LIKE 'update_%_updated_at';
```

---

## Note Finali

- **Non è stata rilevata nessuna vulnerabilità critica**: le tabelle food sono intese per essere pubbliche in lettura
- **Il rischio principale** è che senza RLS abilitato, le policy non vengono applicate
- **Buona pratica**: ogni nuovo database dovrebbe includere RLS nello schema (come già fatto per la maggior parte)

---

**Prossimi Passi:**
1. [ ] Utente esegue lo script di fix in Supabase SQL Editor
2. [ ] Utente verifica con le query di verifica
3. [ ] Documentare eventuali errori
4. [ ] Procedere con Fase 2: Schema Consistency Audit
