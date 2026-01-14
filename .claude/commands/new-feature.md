---
description: Workflow per implementare nuova feature
allowed-tools: Bash(pnpm:*, git:*), Read, Write, Edit, Glob, Grep, mcp__supabase__get_advisors
---

# New Feature Protocol

> **Principio QA:** Ogni nuova feature deve nascere con documentazione e test adeguati.

## 1. Check Backlog & Inventory

- Leggi `docs/backlog/1-TODO.md` - feature gia pianificata?
- Leggi `docs/DATABASE-INVENTORY.md` - tabelle esistenti
- Leggi CLAUDE.md sezione 4 - struttura repo

## 2. Plan Before Code (EXPLORE → PLAN)

- Usa `/inventory` per context
- Crea todo list con steps
- Identifica file da creare/modificare
- Verifica pattern esistenti nel codebase
- **Identifica test necessari** (quali funzioni sono critiche?)

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

## 5. Test

**Obbligatorio per nuove feature:**

- [ ] Test per logica critica (business logic, calcoli, validazioni)
- [ ] Test per API routes nuove (almeno happy path + error case)
- [ ] Coverage target: **30% minimo** per nuove API/services

```bash
# Esegui test della feature
pnpm test apps/backoffice/[path-to-feature]

# Verifica coverage
pnpm test:coverage apps/backoffice/[path-to-feature]
```

**Pattern test:** Vedi `components/qr/__tests__/` come riferimento.

## 6. Verify Build

```bash
pnpm turbo typecheck
pnpm turbo build
```

O usa `/verify` per check completo.

## 7. Document

**Per ogni nuova feature, crea:**

```bash
# Crea directory
mkdir -p docs/features/[feature-name]

# Copia template
cp docs/features/_template/* docs/features/[feature-name]/
```

Poi compila:

- [ ] `EXECUTIVE.md` - Cosa fa, perche importa (per imprenditore)
- [ ] `USER.md` - Come usare (se user-facing)
- [ ] `DEV.md` - Architettura, API, test (per sviluppatori)

**Aggiorna indice:**

- [ ] `docs/features/README.md` - Aggiungi riga alla matrice

**Backlog:**

- [ ] Sposta task a DONE
- [ ] Aggiorna CLAUDE.md se cambio architetturale
- [ ] Aggiorna Compounding Engineering se errori/lezioni

## 8. QA Final Check

Prima di considerare la feature completa:

```bash
# Quick QA check
/qa-quick
```

Oppure manualmente:

- [ ] TypeScript: 0 errori
- [ ] Build: passa
- [ ] Security advisors: 0 critical
- [ ] Test: passano
- [ ] Docs: create e linkate

## Checklist Riassuntiva

```
[ ] 1. Backlog/inventory consultato
[ ] 2. Piano creato con todo list
[ ] 3. Validazione pre-implementazione
[ ] 4. Codice implementato
[ ] 5. Test scritti (30%+ coverage)
[ ] 6. Build/typecheck passa
[ ] 7. Documentazione creata (EXEC/USER/DEV)
[ ] 8. QA final check passa
[ ] 9. Commit con messaggio descrittivo
```

---

_Protocol version: 2.0 (QA-integrated)_
