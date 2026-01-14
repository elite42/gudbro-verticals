# Audit Log

> Storico di tutti gli audit eseguiti sul progetto GUDBRO.

---

## 2026

### Gennaio 2026

| Data       | Tipo          | Risultato  | Report                                              |
| ---------- | ------------- | ---------- | --------------------------------------------------- |
| 2026-01-14 | Initial Audit | Completato | [Full Report](./audits/2026-01-14-initial-audit.md) |
| 2026-01-14 | Baseline      | Completato | Vedi sotto                                          |

#### 2026-01-14 - Initial Audit (FASE 1)

**Trigger:** FASE 1 del piano QA
**Eseguito da:** Claude Opus 4.5

**Findings:**

| Area          | Status  | Dettaglio                          |
| ------------- | ------- | ---------------------------------- |
| Test Coverage | CRITICO | ~2% (14/15 aree a 0%)              |
| Security      | ALTO    | 7 API senza auth, 5 RLS permissive |
| Dead Code     | MEDIO   | 5 componenti orfani                |
| Documentation | CRITICO | 1/15 feature documentate           |

**Issues Critiche (P0):**

1. `/api/organizations` - POST/PATCH senza auth
2. `/api/merchants` - POST senza auth
3. `/api/translations` - ALL senza auth
4. `/api/food-cost/dishes` - ALL senza auth
5. `/api/upload/logo` - POST/DELETE senza auth
6. RLS `accounts`, `order_items` con `WITH CHECK(true)`

**Actions:**

- [x] Audit test coverage completo
- [x] Audit dead code
- [x] Audit security (RLS, Auth)
- [x] Audit documentation
- [x] Report completo generato
- [ ] Fix security issues (P0)
- [ ] Aumentare test coverage (FASE 2)

**Report:** [2026-01-14-initial-audit.md](./audits/2026-01-14-initial-audit.md)

---

#### 2026-01-14 - Baseline Audit

**Trigger:** Setup sistema QA
**Eseguito da:** Claude + Gianfranco

**Findings:**

- Test coverage: ~2% (solo QR feature)
- Documentation: 43+ files, ma sparse
- Dead code: Non auditato
- Performance: Non profilato
- Security: 5 RLS warning (alcuni intenzionali)

**Actions:**

- [x] Creato piano QA 6 fasi
- [x] Setup infrastruttura QA
- [x] Audit dettagliato (Fase 1)

---

## Template Entry

```markdown
#### YYYY-MM-DD - [Tipo Audit]

**Trigger:** [Motivo dell'audit]
**Eseguito da:** [Chi]

**Findings:**

- Finding 1
- Finding 2

**Actions:**

- [ ] Action 1
- [ ] Action 2

**Report:** [Link se disponibile]
```

---

## Tipi di Audit

| Tipo        | Frequenza | Durata | Scope            |
| ----------- | --------- | ------ | ---------------- |
| Quick Check | Weekly    | 5 min  | Build, TS, Tasks |
| Coverage    | Monthly   | 30 min | Test coverage    |
| Security    | Monthly   | 30 min | RLS, Auth, API   |
| Performance | Quarterly | 2h     | Bundle, DB, API  |
| Full        | Quarterly | 4h     | Everything       |
| Feature     | On demand | 30 min | Single feature   |

---

_Ultimo aggiornamento: 2026-01-14_
