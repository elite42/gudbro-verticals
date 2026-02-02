---
description: Dump unificato del contesto da tutte le fonti
---

# Context Sync

Aggrega contesto da tutte le fonti per allineare la sessione corrente.

## 1. CLAUDE.md Current Focus

Leggi `CLAUDE.md` — solo sezione 0 (CURRENT FOCUS, prime ~45 righe).
Estrai: task attiva, stato, ultima completata.

## 2. Planning State

Leggi `.planning/STATE.md`.
Estrai: fase corrente, piano corrente, velocity, blockers, prossima azione.

## 3. Backlog In-Progress

Leggi `docs/backlog/2-IN-PROGRESS.md`.
Estrai: task in corso (max 3).

## 4. GitHub Issues (Open)

```bash
gh issue list -R elite42/gudbro-verticals --state open --json number,title,labels --limit 10
```

Filtra e mostra quelli rilevanti al focus corrente.

## 5. Pieces LTM (Contesto Recente)

Interroga Pieces per contesto delle ultime sessioni:

```
mcp__Pieces__ask_pieces_ltm:
  question: "What was I working on in gudbro-verticals in the last 2 sessions? What decisions were made and what issues were encountered?"
  chat_llm: "claude-opus-4-5-20251101"
  connected_client: "Claude"
  topics: ["gudbro-verticals", "session", "decisions", "progress"]
```

## 6. Recent Git Activity

```bash
git -C /Users/gianfrancodagostino/Desktop/gudbro-verticals log --oneline -10
```

---

## Output Format

Presenta tutto in questa struttura:

```
## Context Dump - [DATA]

### Focus
- **Task attiva:** [da CLAUDE.md sezione 0]
- **Fase GSD:** [da STATE.md]
- **Piano corrente:** [X di Y]

### In Progress
| Fonte | Task | Stato |
|-------|------|-------|
| Backlog | [task] | In Progress |
| GitHub | #N [title] | Open |
| GSD | Phase X Plan Y | [status] |

### Contesto Recente (Pieces)
- [summary da LTM]

### Ultimi Commit
- `hash` message
- `hash` message
- `hash` message

### Blockers/Concerns
- [da STATE.md blockers]

### Prossima Azione Suggerita
[Basata su tutte le fonti sopra — cosa ha piu senso fare ora?]
```
