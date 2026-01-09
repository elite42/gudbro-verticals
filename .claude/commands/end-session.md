---
description: Chiudi sessione e salva contesto
---

# End Session Protocol

Prima di terminare la sessione:

## 1. Aggiorna Session Log

Aggiungi entry a `docs/SESSION-LOG.md` (nuove in cima):

```markdown
## YYYY-MM-DD

**Focus:** [Cosa si e' lavorato]
**Durata:** ~Xh

### Completato

- [Task 1]

### Commits

- `hash` - message

### Decisioni

- [Decisione]: [Motivazione]

### Prossima sessione

- [Cosa fare dopo]
```

## 2. Aggiorna Backlog

Sposta task completate:

- Da `2-IN-PROGRESS.md` a `4-DONE.md`
- Aggiungi data completamento

## 3. Aggiorna CLAUDE.md Sezione 0

Se la task principale e' cambiata, aggiorna:

```markdown
# 0. CURRENT FOCUS

> **Task attiva:** [nuova task o "Nessuna"]
> **Stato:** [percentuale o descrizione]
> **Azione:** [prossimo step]
```

## 4. Commit documentazione

```bash
git add docs/ CLAUDE.md
git commit -m "docs: aggiornamento sessione $(date +%Y-%m-%d)"
```

## Verifica finale

- [ ] Session Log aggiornato
- [ ] Backlog aggiornato
- [ ] CLAUDE.md sezione 0 aggiornata
- [ ] Nessun lavoro non salvato
