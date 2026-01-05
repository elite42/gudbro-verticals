# GUDBRO Development Workflow

> **Spec-Driven Development (SDD) adattato per Solo Founder + AI**
>
> Basato su best practices da: [Anthropic](https://www.anthropic.com/engineering/claude-code-best-practices), [cc-sdd](https://github.com/gotalab/cc-sdd), [Atomic Object](https://spin.atomicobject.com/ai-powered-solo-developer/)

**Last Updated:** 2026-01-05

---

## 1. Principio Fondamentale

> **"Explore → Plan → Validate → Implement → Document"**

Mai saltare fasi. Gli errori nascono quando si salta direttamente all'implementazione.

---

## 2. Le 5 Fasi del Workflow

### FASE 1: EXPLORE (Obbligatoria)

**Obiettivo:** Comprendere prima di agire

**Checklist:**

- [ ] Leggere file correlati SENZA scrivere codice
- [ ] Per database: verificare schema attuale (migration o query)
- [ ] Identificare CHECK constraints, ENUM, FK
- [ ] Capire pattern esistenti nel codebase

**Output:** Comprensione documentata (mentale o scritta)

**Comandi utili:**

```bash
# Per Claude Code
"Leggi [file] e spiegami la struttura senza modificare nulla"
"Quali CHECK constraint ha la tabella X?"
"Mostrami le colonne della tabella Y"
```

**Quando saltare:** Mai. Anche per task piccole, almeno una lettura veloce.

---

### FASE 2: PLAN (Obbligatoria per task > 30 min)

**Obiettivo:** Definire COSA, COME, PERCHÉ prima di scrivere codice

**Checklist:**

- [ ] Creare plan.md o descrivere nel prompt
- [ ] Specificare file da modificare
- [ ] Identificare rischi e dipendenze
- [ ] Per feature complesse: user stories

**Output:** Piano approvato (esplicito o implicito)

**Template plan.md:**

```markdown
## Task: [Nome]

### Obiettivo

[Cosa vogliamo ottenere]

### File coinvolti

- [ ] file1.ts - [modifica]
- [ ] file2.sql - [nuovo]

### Approccio

1. Step 1
2. Step 2
3. Step 3

### Rischi

- Rischio 1: [mitigazione]

### Criteri di successo

- [ ] Criterio 1
- [ ] Criterio 2
```

**Quando saltare:** Task < 30 min con scope chiaro (es. fix typo, aggiunta singola)

---

### FASE 3: VALIDATE (Gate Obbligatorio)

**Obiettivo:** Verificare PRIMA di implementare

**Checklist Generale:**

- [ ] I tipi/schema sono corretti?
- [ ] I naming seguono le convenzioni?
- [ ] Esistono pattern simili da seguire?

**Checklist per Database/SQL:**

- [ ] UUID sono hex validi? (solo 0-9, a-f)
- [ ] Colonne esistono nella tabella?
- [ ] CHECK constraints rispettati?
- [ ] FK references esistono?
- [ ] Array syntax corretta? (`'{}'` non `'[]'`)

**Checklist per API/Code:**

- [ ] Import corretti?
- [ ] Types allineati?
- [ ] Error handling presente?

**Output:** ✅ Tutti i check passati → procedi | ❌ Blocco → torna a EXPLORE

**Query di validazione esempio:**

```sql
-- Verifica colonne tabella
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'nome_tabella';

-- Verifica CHECK constraints
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'nome_tabella'::regclass;
```

---

### FASE 4: IMPLEMENT

**Obiettivo:** Scrivere codice/script con confidenza

**Checklist:**

- [ ] Implementare secondo il piano
- [ ] Commit incrementali (non mega-commit)
- [ ] Test immediato se possibile

**Output:** Codice funzionante

**Best Practices:**

- Un commit per concetto logico
- Messaggi commit descrittivi
- Se errore → torna a EXPLORE, non "fixare alla cieca"

---

### FASE 5: DOCUMENT

**Obiettivo:** Mantenere la conoscenza

**Checklist:**

- [ ] Aggiornare docs se necessario
- [ ] Aggiungere a LESSONS-LEARNED se nuovo pattern/errore
- [ ] Aggiornare CHANGELOG/INVENTORY se applicabile

**Output:** Documentazione aggiornata

**Quando documentare:**
| Situazione | Azione |
|------------|--------|
| Nuovo pattern scoperto | → LESSONS-LEARNED |
| Errore evitabile | → LESSONS-LEARNED |
| Nuova migration | → DATABASE-SCHEMA.md |
| Nuova feature | → Backlog DONE + feature docs |
| Cambio architetturale | → Decisione documentata |

---

## 3. Workflow per Tipo di Task

### Database Migration

```
EXPLORE: Leggi migration esistenti, verifica schema attuale
PLAN: Definisci campi, tipi, constraints
VALIDATE: ✅ Nomi colonne, ✅ Tipi, ✅ FK exist, ✅ CHECK values
IMPLEMENT: Scrivi migration, esegui
DOCUMENT: Aggiorna DATABASE-SCHEMA.md
```

### Seed Data / SQL Script

```
EXPLORE: Leggi schema tabelle target, verifica constraints
PLAN: Definisci dati da inserire
VALIDATE: ✅ UUID hex, ✅ Colonne exist, ✅ CHECK values, ✅ Array syntax
IMPLEMENT: Scrivi script, esegui
DOCUMENT: Aggiorna INVENTORY se necessario
```

### New Feature

```
EXPLORE: Capire requisiti, leggere codice correlato
PLAN: User stories, file coinvolti, approccio
VALIDATE: ✅ Pattern esistenti, ✅ Types, ✅ Dependencies
IMPLEMENT: Codice + test
DOCUMENT: Feature docs, backlog update
```

### Bug Fix

```
EXPLORE: Riprodurre bug, capire causa
PLAN: Identificare fix, valutare side effects
VALIDATE: ✅ Fix non rompe altro
IMPLEMENT: Fix + test di regressione
DOCUMENT: LESSONS-LEARNED se bug evitabile
```

---

## 4. Comandi Claude Code Consigliati

### Per EXPLORE

```
"think hard about [problema]"
"leggi [file] senza modificare"
"qual è la struttura di [tabella/componente]?"
```

### Per PLAN

```
"crea un piano per [task]"
"quali file devo modificare per [feature]?"
"ultrathink: quali sono i rischi di [approccio]?"
```

### Per VALIDATE

```
"verifica che questo SQL sia corretto per lo schema attuale"
"controlla se esistono tutti i campi che sto usando"
"quali CHECK constraint ha [tabella]?"
```

### Per gestione sessione

```
/clear          # Reset context se confuso
/compact        # Compatta conversazione lunga
/init           # Rigenera CLAUDE.md
```

---

## 5. Anti-Pattern da Evitare

| Anti-Pattern              | Problema             | Soluzione              |
| ------------------------- | -------------------- | ---------------------- |
| "Scrivi subito il codice" | Errori da assunzioni | EXPLORE prima          |
| "Fixxa veloce"            | Fix su fix           | Capire causa root      |
| "Tanto funziona"          | Technical debt       | Validate sempre        |
| "Lo documento dopo"       | Conoscenza persa     | Document subito        |
| "Claude sa già"           | Context loss         | Dare context esplicito |

---

## 6. Metriche di Successo

Un workflow sano produce:

- [ ] Zero errori da "colonna inesistente"
- [ ] Zero errori da "CHECK constraint violato"
- [ ] Commit atomici e descrittivi
- [ ] Documentazione sempre aggiornata
- [ ] LESSONS-LEARNED che cresce (e non si ripetono errori)

---

## 7. Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│                 GUDBRO WORKFLOW                        │
├─────────────────────────────────────────────────────────┤
│  1. EXPLORE  │ Leggi, capisci, NON scrivere           │
│  2. PLAN     │ Cosa, Come, Perché, Rischi             │
│  3. VALIDATE │ ✅ Check PRIMA di implementare          │
│  4. IMPLEMENT│ Codice con confidenza                  │
│  5. DOCUMENT │ Mantieni la conoscenza                 │
├─────────────────────────────────────────────────────────┤
│  REGOLA D'ORO: Se non sei sicuro → torna a EXPLORE    │
└─────────────────────────────────────────────────────────┘
```

---

**File:** `docs/DEVELOPMENT-WORKFLOW.md`
**Version:** 1.0
**References:**

- [Anthropic Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [cc-sdd](https://github.com/gotalab/cc-sdd)
- [Atomic Object Solo Developer](https://spin.atomicobject.com/ai-powered-solo-developer/)
