# ADR-005: Database Seeding Process

**Status:** Accepted
**Date:** 2025-12-16
**Context:** Standard process for creating and seeding new food databases to Supabase

---

## Problem

Claude Code non riesce a connettersi direttamente a Supabase a causa di limitazioni di rete/timeout. Ogni tentativo di eseguire curl o script di seeding fallisce.

## Decision

Adottare un processo di lavoro **ibrido** dove:
- **Claude** prepara tutti i file necessari (schema SQL, dati TypeScript, batch SQL)
- **Utente** esegue manualmente le operazioni su Supabase SQL Editor

---

## Processo Standard per Nuovo Database (VERIFICATO)

### Step 1: Claude prepara i file

```
shared/database/{product}/
├── schema/
│   └── create-{product}-table.sql    # Schema SQL con enums + tabella + indexes
├── types.ts                           # TypeScript types (English only)
├── data/
│   ├── index.ts                       # Export aggregato
│   └── {category}.ts                  # Dati organizzati per categoria
└── scripts/
    ├── generate-sql-batches.ts        # Script che genera batch SQL
    └── batches/
        ├── batch-01.sql               # INSERT statements (20 records each)
        ├── batch-02.sql
        └── ...
```

### Step 2: Claude genera i batch SQL

```bash
cd /Users/gianfrancodagostino/Desktop/gudbro-verticals
npx tsx shared/database/{product}/scripts/generate-sql-batches.ts
```

Questo genera file `batch-*.sql` nella cartella `scripts/batches/`.

### Step 3: Utente esegue schema su Supabase

1. Vai a: https://supabase.com/dashboard/project/vnaonebbueezrvjekqxs/sql
2. Copia/incolla il contenuto di `schema/create-{product}-table.sql`
3. Click "Run"
4. Verifica che la tabella sia stata creata

### Step 4: Utente esegue batch SQL

1. Apri ogni file `batch-*.sql` in ordine
2. Copia il contenuto
3. Incolla nel Supabase SQL Editor
4. Click "Run"
5. Ripeti per tutti i batch

### Step 5: Verifica

```sql
SELECT COUNT(*) FROM {product};
```

---

## File Locations Summary

| Prodotto | Schema | Batches |
|----------|--------|---------|
| Wines | `wines/schema/create-wines-table.sql` | `wines/scripts/batches/batch-*.sql` |
| Cocktails | `cocktails/schema/...` | `cocktails/scripts/batches/...` |

---

## Checklist per Claude

Quando crei un nuovo database food:

- [ ] Crea `schema/create-{product}-table.sql` con:
  - [ ] Enums necessari con `DO $$ BEGIN ... EXCEPTION WHEN duplicate_object`
  - [ ] Tabella con tutti i campi del TypeScript type
  - [ ] Indexes per campi frequentemente filtrati
  - [ ] Comments descrittivi
- [ ] Crea `types.ts` con TypeScript interfaces
- [ ] Crea `data/*.ts` con i dati (English only)
- [ ] Crea `data/index.ts` che esporta tutto + stats
- [ ] Crea `scripts/generate-sql-batches.ts` che:
  - [ ] Legge tutti i dati da `data/index.ts`
  - [ ] Genera INSERT statements con escape SQL corretto
  - [ ] Scrive batch files da 20 records ciascuno
- [ ] Esegui lo script per generare i batch
- [ ] Aggiorna `docs/DATABASE-INVENTORY.md`
- [ ] Istruisci l'utente su come eseguire manualmente

---

## Motivo del Fallimento Automazione

Testato 2025-12-16:
- `curl` verso Supabase: timeout (exit code 28)
- `ping` verso Supabase: 100% packet loss
- Network locale funziona (GitHub, npm funzionano)
- Probabilmente firewall/proxy/routing issue specifico per Supabase

---

## Alternative Future

1. **Supabase CLI locale**: L'utente potrebbe installare `supabase` CLI
2. **GitHub Actions**: Workflow che esegue seeding su push
3. **Script Node con retry**: Più resiliente ai timeout

Per ora, il processo manuale con batch SQL è il più affidabile.
