# Session QA Checklist

> Checklist per mantenere la qualità durante ogni sessione di sviluppo.

---

## Inizio Sessione

- [ ] Letto backlog (`/start-session`)
- [ ] IN-PROGRESS tasks <= 3
- [ ] Nessun build rotto

---

## Durante Sviluppo

### Per ogni nuovo file creato

- [ ] TypeScript strict (no `any`)
- [ ] Error handling presente
- [ ] Segue patterns esistenti

### Per ogni API route

- [ ] Auth check se necessario
- [ ] Validation input
- [ ] Error responses strutturate

### Per ogni modifica DB

- [ ] RLS policy presente
- [ ] Indexes appropriati
- [ ] Migration testata

### Per ogni componente

- [ ] Props tipizzate
- [ ] Loading/error states
- [ ] Accessibility base

---

## Pre-Commit

Automatico via Husky:

- [x] Prettier formatting
- [x] ESLint check
- [x] TypeScript check (se .ts/.tsx modificati)

---

## Pre-Push

Automatico via hook:

- [x] Full build (`turbo build`)
- [ ] Tests (opzionale: `GUDBRO_TEST_ON_PUSH=1 git push`)

---

## Fine Sessione

- [ ] `/verify` passato (typecheck + build + advisors)
- [ ] Tutti i TODO completati
- [ ] Test aggiunti per nuovo codice (se appropriato)
- [ ] Documentation aggiornata (se feature cambiata)
- [ ] Commit con messaggio descrittivo
- [ ] SESSION-LOG.md aggiornato (se sessione significativa)

---

## Quick Reference

```bash
# Typecheck
pnpm typecheck

# Build
pnpm turbo build

# Test
pnpm test:run

# Coverage
pnpm test:coverage

# Security advisors
# Usa Supabase MCP: mcp__supabase__get_advisors
```

---

## Red Flags

Se vedi questi, fermati e risolvi:

- TypeScript errors > 0
- Build failures
- Security advisors critical
- IN-PROGRESS > 3 tasks
- Test failures

---

_Template version: 1.0_
