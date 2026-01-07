---
description: Chiudi sessione e salva contesto
---

# End Session Protocol

Prima di terminare la sessione:

## 1. Aggiorna Backlog

Sposta task completate:

- Da `2-IN-PROGRESS.md` a `4-DONE.md`
- Aggiungi data completamento

## 2. Aggiorna CLAUDE.md Sezione 0

Se la task principale e' cambiata, aggiorna:

```markdown
# 0. CURRENT FOCUS

> **Task attiva:** [nuova task o "Nessuna"]
> **Stato:** [percentuale o descrizione]
> **Azione:** [prossimo step]
```

## 3. Salva su Pieces (se disponibile)

```
mcp__Pieces__create_pieces_memory(
  summary_description: "[Breve titolo]",
  summary: "## Sessione [DATA]\n### Cosa fatto\n- ...\n### Prossimi step\n- ...",
  project: "/Users/gianfrancodagostino/Desktop/gudbro-verticals"
)
```

## 4. Commit documentazione

```bash
git add docs/ CLAUDE.md
git commit -m "docs: aggiornamento sessione $(date +%Y-%m-%d)"
```

## Verifica finale

- [ ] Backlog aggiornato
- [ ] CLAUDE.md sezione 0 aggiornata
- [ ] Nessun lavoro non salvato
