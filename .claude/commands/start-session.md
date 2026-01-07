---
description: Inizia una nuova sessione GUDBRO
---

# Start Session Protocol

Leggi questi file per iniziare la sessione:

1. **CLAUDE.md** - Contesto progetto e sezione 0 (Current Focus)
   !`cat CLAUDE.md | head -50`

2. **Backlog IN-PROGRESS** - Task attive
   !`cat docs/backlog/2-IN-PROGRESS.md`

3. **Backlog DONE** - Ultime 3 completate (per contesto)
   !`cat docs/backlog/4-DONE.md | head -30`

## Rispondi con questo formato:

```
GUDBRO Ready.

FOCUS: [task da sezione 0 di CLAUDE.md]
IN PROGRESS: [lista task da 2-IN-PROGRESS.md]

Vuoi continuare [FOCUS task] o fare altro?
```
