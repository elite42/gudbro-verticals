# Feature Audit Template

> Usa questo template per auditare una singola feature.

---

## Feature: [NOME FEATURE]

**Data audit:** YYYY-MM-DD
**Auditore:** [Nome]

---

## 1. Overview

| Aspetto         | Valore |
| --------------- | ------ |
| Pagine UI       | X      |
| API Routes      | X      |
| Servizi Backend | X      |
| Tabelle DB      | X      |

---

## 2. Test Coverage

| File/Area | Test Esistenti | Coverage | Priority |
| --------- | -------------- | -------- | -------- |
| [file1]   | Yes/No         | X%       | P0/P1/P2 |
| [file2]   | Yes/No         | X%       | P0/P1/P2 |

**Coverage totale feature:** X%
**Target:** X%

---

## 3. Documentation Status

| Doc Type     | Esiste | Aggiornato | Link   |
| ------------ | ------ | ---------- | ------ |
| EXECUTIVE.md | Yes/No | Yes/No     | [link] |
| USER.md      | Yes/No | Yes/No     | [link] |
| DEV.md       | Yes/No | Yes/No     | [link] |
| API.md       | Yes/No | Yes/No     | [link] |

---

## 4. Code Quality

### Dead Code

- [ ] Nessun componente orfano
- [ ] Nessuna funzione non usata
- [ ] Nessun import non utilizzato

### Patterns

- [ ] Segue patterns esistenti
- [ ] Error handling presente
- [ ] TypeScript strict

### Comments

- [ ] JSDoc su funzioni pubbliche
- [ ] Commenti su logica complessa

---

## 5. Security

- [ ] RLS policies complete
- [ ] Auth check su API routes
- [ ] No secrets hardcoded
- [ ] Input validation

---

## 6. Performance

- [ ] No N+1 queries
- [ ] Pagination dove necessario
- [ ] Caching appropriato
- [ ] Bundle size ragionevole

---

## 7. Findings

### Critical

- [Finding critico]

### High

- [Finding importante]

### Medium

- [Finding medio]

### Low

- [Finding basso]

---

## 8. Actions

| #   | Action   | Priority | Owner | Status |
| --- | -------- | -------- | ----- | ------ |
| 1   | [Azione] | P0/P1/P2 | [Chi] | TODO   |
| 2   | [Azione] | P0/P1/P2 | [Chi] | TODO   |

---

## 9. Score

| Categoria     | Score (1-10) |
| ------------- | ------------ |
| Test Coverage | X            |
| Documentation | X            |
| Code Quality  | X            |
| Security      | X            |
| Performance   | X            |
| **Overall**   | **X**        |

---

_Template version: 1.0_
