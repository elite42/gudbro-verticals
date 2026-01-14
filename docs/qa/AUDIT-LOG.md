# Audit Log

> Storico di tutti gli audit eseguiti sul progetto GUDBRO.

---

## 2026

### Gennaio 2026

| Data       | Tipo     | Risultato  | Report     |
| ---------- | -------- | ---------- | ---------- |
| 2026-01-14 | Baseline | Completato | Vedi sotto |

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
- [ ] Audit dettagliato (Fase 1)

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
