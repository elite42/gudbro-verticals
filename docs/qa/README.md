# GUDBRO Quality Assurance System

> Sistema continuo di qualità per garantire un prodotto solido e scalabile.

---

## Quick Links

| Documento                                  | Scopo                       |
| ------------------------------------------ | --------------------------- |
| [COVERAGE-REPORT.md](./COVERAGE-REPORT.md) | Stato attuale test coverage |
| [AUDIT-LOG.md](./AUDIT-LOG.md)             | Storico audit eseguiti      |
| [templates/](./templates/)                 | Template per audit e QA     |

---

## Overview

Il sistema QA di GUDBRO si basa su 4 pilastri:

### 1. Test Coverage

- **Target:** 30% sulle aree critiche
- **Framework:** Vitest
- **Comando:** `pnpm test:run`

### 2. Documentation

- **Livelli:** Executive, User, Technical
- **Template:** `docs/features/_template/`
- **15 aree funzionali** da documentare

### 3. Quality Gates

- **Pre-commit:** lint, format, typecheck
- **Pre-push:** build completo
- **Manual:** `/qa-quick` per check rapido

### 4. Audit Periodici

- **Weekly:** Quick check (5 min)
- **Monthly:** Audit completo
- **Quarterly:** Deep review

---

## Stato Attuale

| Metrica              | Valore       | Target   |
| -------------------- | ------------ | -------- |
| Test Coverage        | ~2%          | 30%      |
| Features Documentate | 1/15         | 15/15    |
| Security Advisors    | 5 warning    | 0        |
| Dead Code            | Non auditato | Auditato |

---

## Slash Commands

| Comando              | Descrizione                | Durata |
| -------------------- | -------------------------- | ------ |
| `/qa-quick`          | Check veloce stato sistema | 5 min  |
| `/qa-coverage`       | Report test coverage       | 10 min |
| `/qa-security`       | Security audit             | 15 min |
| `/qa-docs`           | Documentation status       | 5 min  |
| `/qa-feature [name]` | Audit singola feature      | 20 min |

---

## Workflow Qualità

### Inizio Sessione

1. Leggi backlog (`/start-session`)
2. Controlla IN-PROGRESS tasks (max 3)

### Durante Sviluppo

1. Scrivi test per nuovo codice
2. Aggiorna docs se feature cambia
3. Pre-commit hook valida automaticamente

### Fine Sessione

1. Esegui `/verify` (typecheck + build + advisors)
2. Commit con messaggio descrittivo
3. Aggiorna SESSION-LOG.md

### Periodicamente

- **Ogni settimana:** `/qa-quick`
- **Ogni mese:** Audit completo di 1 area
- **Ogni trimestre:** Review architetturale

---

## Priorità Test

### P0 - Security Critical

1. `lib/auth/` - Autenticazione
2. `middleware.ts` - Route protection
3. `lib/supabase-admin.ts` - Service role

### P1 - Business Critical

4. `lib/ai/chat-service.ts` - Core AI
5. `lib/ai/knowledge-service.ts` - Data access
6. `api/food-cost/` - Calcoli costi

### P2 - Data Integrity

7. `api/translations/` - Sync traduzioni
8. `lib/staff-service.ts` - Staff
9. `lib/events-service.ts` - Eventi

---

## File Structure

```
docs/qa/
├── README.md              # Questo file
├── COVERAGE-REPORT.md     # Stato coverage
├── AUDIT-LOG.md           # Storico audit
├── templates/
│   ├── feature-audit.md   # Template audit feature
│   └── session-qa.md      # Checklist sessione
└── audits/
    └── YYYY-MM-DD-type.md # Report audit
```

---

## Reference

- **Vitest Config:** `/vitest.config.ts`
- **Test Examples:** `apps/backoffice/components/qr/__tests__/`
- **Coverage:** `pnpm test:coverage`

---

_Creato: 2026-01-14_
_Ultimo aggiornamento: 2026-01-14_
