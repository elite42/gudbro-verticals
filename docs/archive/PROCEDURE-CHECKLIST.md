# GUDBRO Procedure Checklists

> **Gate di validazione obbligatori per ogni tipo di task**
>
> Questi checklist devono essere completati PRIMA dell'implementazione.

**Last Updated:** 2026-01-05

---

## Come Usare Questo Documento

1. Identifica il tipo di task che stai per eseguire
2. Copia la checklist corrispondente
3. Completa TUTTI i check prima di procedere
4. Se un check fallisce → torna a EXPLORE (vedi DEVELOPMENT-WORKFLOW.md)

---

## 1. Database Migration

### Pre-Implementation Checklist

```markdown
## Migration: [nome]

### EXPLORE ✓

- [ ] Ho letto le migration esistenti correlate
- [ ] Ho verificato lo schema attuale delle tabelle coinvolte
- [ ] Ho identificato FK e dipendenze

### PLAN ✓

- [ ] Ho definito tutte le colonne con tipi corretti
- [ ] Ho definito tutti i CHECK constraints
- [ ] Ho definito tutti gli indici necessari
- [ ] Ho considerato RLS policies se necessario

### VALIDATE ✓

- [ ] Naming segue convenzioni (snake_case, prefissi corretti)
- [ ] Tipi sono appropriati (TEXT vs VARCHAR, JSONB vs JSON)
- [ ] Default values sono sensati
- [ ] ON DELETE/UPDATE behavior definito per FK
- [ ] Migration è idempotente (IF NOT EXISTS, etc.)

### Ready to implement? ✅
```

### Post-Implementation Checklist

```markdown
- [ ] Migration eseguita senza errori
- [ ] DATABASE-SCHEMA.md aggiornato
- [ ] DATABASE-INVENTORY.md aggiornato (se nuova tabella)
- [ ] Types TypeScript aggiornati (se applicabile)
```

---

## 2. Seed Data / SQL Script

### Pre-Implementation Checklist

```markdown
## Seed Script: [nome]

### EXPLORE ✓

- [ ] Ho letto lo schema di TUTTE le tabelle target
- [ ] Ho verificato TUTTI i CHECK constraints
- [ ] Ho identificato le FK e l'ordine di inserimento

### VALIDATE ✓

#### UUID

- [ ] Tutti gli UUID usano solo caratteri hex (0-9, a-f)
- [ ] Nessuna lettera g-z negli UUID
- [ ] Formato corretto: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

#### Colonne

- [ ] Ogni colonna nel INSERT esiste nella tabella
- [ ] Ordine colonne corrisponde ai VALUES

#### Constraints

- [ ] Valori rispettano tutti i CHECK constraints
- [ ] FK references puntano a record esistenti (o inseriti prima)
- [ ] NOT NULL columns hanno valori

#### Syntax PostgreSQL

- [ ] Array: uso '{"val1", "val2"}' NON '["val1", "val2"]'
- [ ] JSONB: sintassi corretta
- [ ] Timestamp con timezone se richiesto

### Ready to implement? ✅
```

### Quick Reference - Errori Comuni SQL

| Errore                               | Causa                   | Fix                    |
| ------------------------------------ | ----------------------- | ---------------------- |
| `invalid input syntax for type uuid` | Caratteri non-hex (g-z) | Usa solo 0-9, a-f      |
| `column "X" does not exist`          | Colonna sbagliata       | Verifica schema        |
| `violates check constraint`          | Valore non ammesso      | Leggi CHECK constraint |
| `malformed array literal`            | `[]` invece di `{}`     | Usa `'{"a","b"}'`      |
| `null value in column`               | Missing NOT NULL        | Aggiungi valore        |

---

## 3. New Feature

### Pre-Implementation Checklist

```markdown
## Feature: [nome]

### EXPLORE ✓

- [ ] Ho capito i requisiti (user story chiara)
- [ ] Ho identificato tutti i file da modificare
- [ ] Ho letto il codice esistente correlato
- [ ] Ho identificato pattern da seguire

### PLAN ✓

- [ ] Ho definito l'approccio tecnico
- [ ] Ho identificato le dipendenze
- [ ] Ho considerato i casi edge
- [ ] Ho stimato la complessità

### VALIDATE ✓

- [ ] Types sono definiti/importati correttamente
- [ ] API contracts sono chiari
- [ ] Error handling pianificato
- [ ] Non duplico codice esistente

### Ready to implement? ✅
```

### Post-Implementation Checklist

```markdown
- [ ] Feature funziona come da requisiti
- [ ] Nessun errore TypeScript
- [ ] Build passa
- [ ] Test aggiunti (se applicabile)
- [ ] Documentazione feature creata
- [ ] Backlog aggiornato (TESTING o DONE)
```

---

## 4. API Endpoint

### Pre-Implementation Checklist

```markdown
## API: [METHOD /path]

### EXPLORE ✓

- [ ] Ho verificato che l'endpoint non esista già
- [ ] Ho identificato endpoint simili come reference
- [ ] Ho capito il data flow richiesto

### PLAN ✓

- [ ] Request schema definito
- [ ] Response schema definito
- [ ] Error responses definiti
- [ ] Authentication/Authorization requirements chiari

### VALIDATE ✓

- [ ] Path segue convenzioni REST
- [ ] Types importati correttamente
- [ ] Supabase client corretto (server vs client)
- [ ] RLS policies considerate

### Ready to implement? ✅
```

---

## 5. Bug Fix

### Pre-Implementation Checklist

```markdown
## Bug: [descrizione]

### EXPLORE ✓

- [ ] Ho riprodotto il bug
- [ ] Ho identificato la causa root (non il sintomo)
- [ ] Ho capito perché si è verificato

### PLAN ✓

- [ ] Ho definito il fix
- [ ] Ho considerato side effects
- [ ] Ho identificato come testare il fix

### VALIDATE ✓

- [ ] Il fix non rompe funzionalità esistenti
- [ ] Il fix risolve la causa, non solo il sintomo

### Ready to implement? ✅
```

### Post-Implementation Checklist

```markdown
- [ ] Bug risolto e verificato
- [ ] Nessuna regressione introdotta
- [ ] LESSONS-LEARNED aggiornato (se bug evitabile)
```

---

## 6. Refactoring

### Pre-Implementation Checklist

```markdown
## Refactoring: [descrizione]

### EXPLORE ✓

- [ ] Ho mappato tutto il codice da refactorare
- [ ] Ho identificato tutti i consumatori
- [ ] Ho capito i test esistenti

### PLAN ✓

- [ ] Ho definito lo stato finale desiderato
- [ ] Ho pianificato step incrementali
- [ ] Ho identificato breaking changes

### VALIDATE ✓

- [ ] Refactoring non cambia comportamento esterno
- [ ] Types rimangono compatibili (o migration path chiaro)
- [ ] Test esistenti continuano a passare

### Ready to implement? ✅
```

---

## 7. Documentation Update

### Pre-Implementation Checklist

```markdown
## Docs: [file/sezione]

### EXPLORE ✓

- [ ] Ho verificato lo stato attuale della documentazione
- [ ] Ho identificato cosa è obsoleto/mancante

### VALIDATE ✓

- [ ] Le informazioni sono accurate
- [ ] Il formato è consistente con altri docs
- [ ] I link sono validi

### Ready to implement? ✅
```

---

## Quick Decision Tree

```
Stai per fare qualcosa?
│
├─ È una modifica al database?
│  └─ Usa checklist #1 (Migration) o #2 (Seed Data)
│
├─ È una nuova funzionalità?
│  └─ Usa checklist #3 (Feature) + #4 (API) se applicabile
│
├─ È un bug fix?
│  └─ Usa checklist #5 (Bug Fix)
│
├─ È un refactoring?
│  └─ Usa checklist #6 (Refactoring)
│
└─ È documentazione?
   └─ Usa checklist #7 (Documentation)
```

---

## Validation Gate Template (Copia-Incolla)

```markdown
## VALIDATION GATE - [Task Name]

Date: YYYY-MM-DD
Type: [migration|seed|feature|api|bugfix|refactor|docs]

### Pre-checks

- [ ] EXPLORE completato
- [ ] PLAN definito
- [ ] VALIDATE passato

### Specific checks

[Aggiungi check specifici dal tipo di task]

### Decision

- [ ] ✅ PROCEED - All checks passed
- [ ] ❌ BLOCK - Return to EXPLORE

Notes:
```

---

**File:** `docs/PROCEDURE-CHECKLIST.md`
**Version:** 1.0
**Related:** DEVELOPMENT-WORKFLOW.md, LESSONS-LEARNED.md
