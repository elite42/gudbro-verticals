---
description: Workflow per implementare nuova feature
---

# New Feature Protocol

## 1. Check Backlog & Inventory

- Leggi `docs/backlog/1-TODO.md` - feature gia pianificata?
- Leggi `docs/DATABASE-INVENTORY.md` - tabelle esistenti
- Leggi CLAUDE.md sezione 4 - struttura repo

## 2. Plan Before Code (EXPLORE → PLAN)

- Usa `/inventory` per context
- Crea todo list con steps
- Identifica file da creare/modificare
- Verifica pattern esistenti nel codebase

## 3. Validate Before Implement

Checklist da CLAUDE.md sezione 3:

- [ ] UUID solo hex (0-9, a-f)
- [ ] Array PostgreSQL: `'{a,b}'`
- [ ] Types importati correttamente
- [ ] Pattern esistenti seguiti

## 4. Implement

- Segui pattern esistenti
- Usa componenti/utilities esistenti
- Aggiungi TypeScript types
- Error handling presente

## 5. Verify

```bash
pnpm turbo typecheck
pnpm turbo build
```

O usa `/verify` per check completo.

## 6. Document

- Aggiorna backlog (sposta a DONE)
- Aggiorna CLAUDE.md se cambio architetturale
- Aggiorna Compounding Engineering se errori
