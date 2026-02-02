# GUDBRO Audit Framework

> Template e processo per audit periodici del progetto

**Last Updated:** 2026-01-05

---

## 1. Obiettivi dell'Audit

Un audit periodico serve a:

1. **Verificare integrità** - Codice e database sono allineati
2. **Identificare technical debt** - Problemi da risolvere
3. **Validare documentazione** - Docs sono aggiornati
4. **Misurare progressi** - Rispetto agli obiettivi

---

## 2. Frequenza Consigliata

| Tipo           | Frequenza   | Durata  |
| -------------- | ----------- | ------- |
| Quick Check    | Settimanale | 15 min  |
| Standard Audit | Mensile     | 1-2 ore |
| Deep Audit     | Trimestrale | 4-8 ore |

---

## 3. Quick Check (Settimanale)

### Checklist

```markdown
## Quick Check - Week [XX]

Date: YYYY-MM-DD

### Build Status

- [ ] `pnpm build` passa senza errori
- [ ] Zero errori TypeScript

### Database

- [ ] Migrations applicate correttamente
- [ ] Nessuna migration pending

### Backlog

- [ ] IN-PROGRESS <= 3 items
- [ ] Nessun item bloccato da > 1 settimana

### Quick Metrics

- Build errors: \_\_\_
- TS errors: \_\_\_
- IN-PROGRESS items: \_\_\_

### Notes

[Eventuali note]
```

---

## 4. Standard Audit (Mensile)

### 4.1 Codice

```markdown
## Code Audit - Month [XX]

Date: YYYY-MM-DD

### Build & Types

- [ ] `pnpm build` passa
- [ ] `pnpm typecheck` passa
- [ ] Zero errori console in dev

### Apps Status

#### Backoffice (:3001)

- [ ] App avvia correttamente
- [ ] Login funziona
- [ ] Dashboard carica
- [ ] AI Chat risponde
- Errors found: \_\_\_

#### Coffeeshop PWA (:3004)

- [ ] App avvia correttamente
- [ ] Menu carica da database
- [ ] Events visibili
- Errors found: \_\_\_

#### Website (:3000)

- [ ] App avvia correttamente
- [ ] Pagine caricano
- Errors found: \_\_\_

### Code Quality

- [ ] Nessun TODO/FIXME critico
- [ ] Nessun codice commentato inutile
- [ ] Pattern consistenti

### Dependencies

- [ ] Nessuna vulnerabilità critica (npm audit)
- [ ] Dipendenze non obsolete
```

### 4.2 Database

```markdown
### Database Audit

#### Schema

- [ ] Migrations in sync con Supabase
- [ ] Types TypeScript aggiornati
- [ ] DATABASE-SCHEMA.md aggiornato

#### Data Integrity

- [ ] FK constraints validi
- [ ] Nessun orphan record
- [ ] Indexes appropriati

#### Migrations Count

- Schema: \_\_\_
- Seeds: \_\_\_
- Total: \_\_\_

#### Tables Count

- Core tables: \_\_\_
- AI tables: \_\_\_
- Product tables: \_\_\_
```

### 4.3 Documentazione

```markdown
### Documentation Audit

#### Core Docs

- [ ] CLAUDE.md aggiornato
- [ ] DATABASE-SCHEMA.md accurato
- [ ] DATABASE-INVENTORY.md aggiornato
- [ ] DEVELOPMENT-WORKFLOW.md seguito
- [ ] PROCEDURE-CHECKLIST.md usato

#### Feature Docs

| Feature       | DEV.md | USER.md | API.md | Status |
| ------------- | ------ | ------- | ------ | ------ |
| AI Co-Manager |        |         |        |        |
| Digital Menu  |        |         |        |        |
| Analytics     |        |         |        |        |

#### Backlog Status

- TODO: \_\_\_
- IN-PROGRESS: \_\_\_
- TESTING: \_\_\_
- DONE (this month): \_\_\_
```

### 4.4 Summary Template

```markdown
## Monthly Audit Summary

Date: YYYY-MM-DD
Auditor: [Name/Claude]

### Overall Health Score

[1-10, where 10 is perfect]

### Key Findings

#### Good

1. [Positive finding]
2. [Positive finding]

#### Needs Attention

1. [Issue] - Priority: [High/Medium/Low]
2. [Issue] - Priority: [High/Medium/Low]

#### Critical

1. [Critical issue if any]

### Action Items

| Issue | Priority | Owner | Target Date |
| ----- | -------- | ----- | ----------- |
|       |          |       |             |

### Metrics Comparison

| Metric        | Last Month | This Month | Change |
| ------------- | ---------- | ---------- | ------ |
| Build errors  |            |            |        |
| TS errors     |            |            |        |
| DB tables     |            |            |        |
| Products      |            |            |        |
| Docs coverage |            |            |        |

### Notes

[Additional observations]
```

---

## 5. Deep Audit (Trimestrale)

### 5.1 Architecture Review

```markdown
## Architecture Audit - Q[X] YYYY

### Codebase Structure

- [ ] Directory structure logica
- [ ] Separation of concerns rispettata
- [ ] Shared code in packages appropriati
- [ ] No circular dependencies

### API Design

- [ ] REST conventions seguite
- [ ] Error handling consistente
- [ ] Response format standardizzato
- [ ] Authentication consistente

### Database Design

- [ ] Normalizzazione appropriata
- [ ] Naming conventions rispettate
- [ ] RLS policies corrette
- [ ] Performance indexes presenti

### AI System

- [ ] Services ben separati
- [ ] Error handling robusto
- [ ] Token usage ottimizzato
- [ ] Fallback strategies presenti
```

### 5.2 Security Audit

```markdown
## Security Audit

### Authentication

- [ ] JWT tokens gestiti correttamente
- [ ] Session management sicuro
- [ ] Password policies appropriate

### Authorization

- [ ] RLS policies testate
- [ ] Role-based access funziona
- [ ] No privilege escalation

### Data Protection

- [ ] PII protetti appropriatamente
- [ ] Encryption at rest (Supabase)
- [ ] Encryption in transit (HTTPS)

### Dependencies

- [ ] npm audit clean
- [ ] No known vulnerabilities
- [ ] Dependencies up to date

### API Security

- [ ] Input validation presente
- [ ] Rate limiting configurato
- [ ] CORS configurato correttamente
```

### 5.3 Performance Audit

```markdown
## Performance Audit

### Frontend

- [ ] Lighthouse score > 80
- [ ] First contentful paint < 2s
- [ ] Bundle size ragionevole
- [ ] Images ottimizzate

### Backend

- [ ] API response time < 500ms
- [ ] Database queries ottimizzate
- [ ] N+1 queries eliminated
- [ ] Caching dove appropriato

### Database

- [ ] Slow queries identificate
- [ ] Indexes utilizzati
- [ ] Connection pooling configurato
```

### 5.4 Technical Debt Assessment

```markdown
## Technical Debt Inventory

### High Priority

| Item | Impact | Effort | Notes |
| ---- | ------ | ------ | ----- |
|      |        |        |       |

### Medium Priority

| Item | Impact | Effort | Notes |
| ---- | ------ | ------ | ----- |
|      |        |        |       |

### Low Priority

| Item | Impact | Effort | Notes |
| ---- | ------ | ------ | ----- |
|      |        |        |       |

### Recommendations

1. [Recommendation]
2. [Recommendation]
```

---

## 6. Audit Commands Reference

### Build & Types

```bash
# Build all apps
pnpm build

# Type check
pnpm typecheck

# Check for TS errors
npx tsc --noEmit
```

### Database

```bash
# Check migration status
npx supabase db diff

# Generate types
npx supabase gen types typescript

# Count tables (via Supabase Dashboard or SQL)
SELECT count(*) FROM information_schema.tables
WHERE table_schema = 'public';
```

### Dependencies

```bash
# Security audit
npm audit

# Outdated packages
npm outdated
```

### Code Quality

```bash
# Find TODOs
grep -r "TODO" --include="*.ts" --include="*.tsx" apps/

# Find FIXMEs
grep -r "FIXME" --include="*.ts" --include="*.tsx" apps/

# Find console.logs (should be minimal in prod)
grep -r "console.log" --include="*.ts" --include="*.tsx" apps/
```

---

## 7. Audit History Log

Mantieni un log degli audit eseguiti:

```markdown
## Audit History

| Date       | Type     | Score | Key Issues    | Resolved |
| ---------- | -------- | ----- | ------------- | -------- |
| 2026-01-05 | Standard | -     | Initial audit | -        |
|            |          |       |               |          |
```

---

## 8. Post-Audit Actions

Dopo ogni audit:

1. **Crea issues** per problemi trovati
2. **Aggiorna backlog** con action items
3. **Documenta** in LESSONS-LEARNED se applicabile
4. **Schedule** prossimo audit

---

**File:** `docs/AUDIT-FRAMEWORK.md`
**Version:** 1.0
**Related:** DEVELOPMENT-WORKFLOW.md, PROCEDURE-CHECKLIST.md
