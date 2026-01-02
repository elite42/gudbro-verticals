# Agent Improvement Log

> **Registro miglioramento continuo agenti AI**
>
> **Version:** 1.0 (2025-12-25)
> **Obiettivo:** Zero errori evitabili attraverso miglioramento iterativo

---

## Ciclo di Miglioramento

```
ESECUZIONE → POST-MORTEM → CLASSIFICAZIONE → UPGRADE → TEST → LOOP
```

Ogni database completato deve passare attraverso questo ciclo, **anche se completato senza errori**.

---

## Metriche Aggregate

| Metrica | Valore | Ultimo Aggiornamento |
|---------|--------|----------------------|
| Database totali con agenti v2.0 | 0 | 2025-12-25 |
| Errori totali rilevati | 0 | - |
| Errori auto-corretti | 0 | - |
| Errori nuovi (non previsti) | 0 | - |
| Tasso successo (zero errori) | -% | - |
| Tempo medio per database | - min | - |

---

## Registro Per Database

### Template Entry

```markdown
### [CUISINE_NAME] - [DATA]

**Metriche**
| Metrica | Valore |
|---------|--------|
| Tempo totale | X min |
| Piatti | X |
| Ingredienti nuovi | X |
| Links | X |

**Agenti Eseguiti**
| Agente | Versione | Errori | Auto-Fix | Escalation |
|--------|----------|--------|----------|------------|
| inventory-checker | 2.0 | 0 | 2 | 0 |
| database-expert | 2.0 | 0 | 0 | 0 |
| code-reviewer | 2.0 | 0 | 1 | 0 |

**Errori Nuovi**
- [ ] Nessuno

**Oppure:**
- [ ] #XX - [Descrizione errore]
  - Agente responsabile: [nome]
  - Causa: [descrizione]
  - Fix proposto: [descrizione]

**Post-Mortem**
- Cosa ha funzionato: [descrizione]
- Cosa migliorare: [descrizione]

**Stato:** SUCCESSO / PARZIALE / FALLITO
```

---

## Registro Cronologico

### [Prossimo Database] - [Data]

> Compilare dopo il primo database con agenti v2.0

---

## Errori Nuovi Rilevati

### Template Errore Nuovo

```markdown
### Errore #XX - [Titolo Breve]

**Rilevato:** [Data] - Database [Nome]
**Agente Responsabile:** [inventory-checker | database-expert | code-reviewer]
**Severita:** [CRITICO | ALTO | MEDIO | BASSO]

**Descrizione**
[Cosa e successo]

**Causa Root**
[Perche l'agente non l'ha prevenuto]

**Fix Implementato**
- [ ] Aggiunto a LESSONS-LEARNED.md come #XX
- [ ] Aggiornato agente [nome] a versione X.X
- [ ] Aggiunto pattern di rilevamento
- [ ] Aggiunto auto-fix

**Verifica**
- [ ] Testato su database successivo
- [ ] Errore non si ripresenta

**Chiuso:** [Data] / APERTO
```

---

## Upgrade Agenti

### Storico Versioni

| Agente | Versione | Data | Cambiamenti |
|--------|----------|------|-------------|
| inventory-checker | 1.0 | pre-2025-12 | Versione originale |
| inventory-checker | 2.0 | 2025-12-25 | Workflow autonomo, auto-fix naming, WebSearch |
| database-expert | 1.0 | pre-2025-12 | Versione originale |
| database-expert | 2.0 | 2025-12-25 | Template-driven, auto-correzioni |
| code-reviewer | 1.0 | pre-2025-12 | Solo TypeScript/React |
| code-reviewer | 2.0 | 2025-12-25 | Aggiunto SQL validation, checklist, cross-check |

### Prossimi Upgrade Pianificati

| Agente | Versione Target | Trigger | Descrizione |
|--------|-----------------|---------|-------------|
| - | - | - | Nessuno pianificato |

---

## Pattern di Errori Ricorrenti

### Come Identificare Pattern

Se lo stesso tipo di errore si presenta **2+ volte**:
1. Elevare priorita a CRITICO
2. Analisi root cause approfondita
3. Upgrade agente obbligatorio prima del prossimo database

### Pattern Attivi

| Pattern | Occorrenze | Agente | Stato |
|---------|------------|--------|-------|
| - | - | - | Nessun pattern attivo |

---

## Review Periodiche

### Trigger Review

- Ogni **5 database** completati
- Ogni **3 errori nuovi** rilevati
- Ogni **30 giorni** di inattivita

### Template Review

```markdown
### Review #X - [Data]

**Periodo:** [Data inizio] - [Data fine]
**Database analizzati:** X

**Statistiche**
| Metrica | Valore | Trend |
|---------|--------|-------|
| Errori totali | X | +/- |
| Errori auto-corretti | X | +/- |
| Errori nuovi | X | +/- |
| Tempo medio | X min | +/- |

**Top 3 Errori**
1. [Errore] - X occorrenze
2. [Errore] - X occorrenze
3. [Errore] - X occorrenze

**Azioni**
- [ ] [Azione 1]
- [ ] [Azione 2]

**Prossima Review:** [Data]
```

---

## Escalation Matrix

### Quando Escalare

| Situazione | Azione |
|------------|--------|
| Errore nuovo, fix chiaro | Auto-implementare, loggare |
| Errore nuovo, fix incerto | Chiedere conferma utente |
| Stesso errore 2+ volte | CRITICO, fix immediato obbligatorio |
| Errore blocca workflow | Stop, analisi prima di procedere |
| Errore dati corrotti | Rollback, analisi approfondita |

### Livelli Severita

| Livello | Descrizione | Tempo Fix |
|---------|-------------|-----------|
| CRITICO | Blocca workflow, dati a rischio | Immediato |
| ALTO | Errore frequente, impatto significativo | Prima del prossimo DB |
| MEDIO | Errore occasionale, workaround esiste | Entro 3 database |
| BASSO | Inconveniente minore | Quando possibile |

---

## Integrazione con Documentazione

### Flusso Aggiornamenti

```
Errore Nuovo Rilevato
        │
        ▼
┌───────────────────────────────────────┐
│  1. AGENT-IMPROVEMENT-LOG.md         │
│     - Registrare errore              │
│     - Classificare severita          │
└───────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────┐
│  2. LESSONS-LEARNED.md               │
│     - Aggiungere lezione #XX         │
│     - Documentare causa e soluzione  │
└───────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────┐
│  3. .claude/agents/[nome].md         │
│     - Aggiungere pattern rilevamento │
│     - Aggiungere auto-fix            │
│     - Incrementare versione          │
└───────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────┐
│  4. PROCEDURE-NEW-DATABASE.md        │
│     - Aggiornare se necessario       │
│     - Solo per cambi workflow        │
└───────────────────────────────────────┘
```

---

## Checklist Post-Database

```
DOPO OGNI DATABASE COMPLETATO:

[ ] 1. Compilare entry in "Registro Per Database"
[ ] 2. Registrare errori nuovi (se presenti)
[ ] 3. Aggiornare metriche aggregate
[ ] 4. Se errori nuovi:
    [ ] 4a. Aggiungere a LESSONS-LEARNED.md
    [ ] 4b. Upgrade agente responsabile
    [ ] 4c. Verificare fix su prossimo database
[ ] 5. Se review trigger raggiunto:
    [ ] 5a. Eseguire review periodica
```

---

## Note

- Questo documento e la **source of truth** per il miglioramento agenti
- Aggiornare SEMPRE dopo ogni database
- Non saltare il post-mortem anche se tutto funziona
- Il successo va documentato tanto quanto il fallimento

---

**File:** `shared/database/docs/AGENT-IMPROVEMENT-LOG.md`
**Version:** 1.0
**Created:** 2025-12-25
