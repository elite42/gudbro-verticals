# GUDBRO Initial Audit - 2026-01-14

> **FASE 1 del QA System** - Audit completo dello stato del prodotto

---

## Executive Summary

| Metrica             | Valore        | Status  |
| ------------------- | ------------- | ------- |
| **Test Coverage**   | ~2%           | CRITICO |
| **Security Issues** | 12            | ALTO    |
| **Dead Code**       | 5 file        | MEDIO   |
| **Documentation**   | 1/15 features | CRITICO |

**Verdetto:** Il prodotto funziona ma ha significative lacune in test, security e documentazione che devono essere affrontate prima di scaling.

---

## 1. TEST COVERAGE AUDIT

### Riepilogo

| Dato              | Valore      |
| ----------------- | ----------- |
| Test files totali | 8           |
| Aree testate      | 1/15 (6.7%) |
| Coverage stimata  | ~2-3%       |

### Coverage per Area

| #   | Area             | Test Files | Coverage | Priorita |
| --- | ---------------- | ---------- | -------- | -------- |
| 1   | QR Codes         | 6          | ~60%     | -        |
| 2   | Food Cost        | 0          | 0%       | P1       |
| 3   | AI Co-Manager    | 0          | 0%       | P0       |
| 4   | Orders/KDS       | 0          | 0%       | P1       |
| 5   | Marketing        | 0          | 0%       | P2       |
| 6   | Customers        | 0          | 0%       | P2       |
| 7   | Team             | 0          | 0%       | P2       |
| 8   | Content          | 0          | 0%       | P3       |
| 9   | Translations     | 0          | 0%       | P1       |
| 10  | Settings         | 0          | 0%       | P3       |
| 11  | Analytics        | 0          | 0%       | P3       |
| 12  | Partnerships B2B | 0          | 0%       | P2       |
| 13  | Onboarding       | 0          | 0%       | P3       |
| 14  | Hot Actions      | 0          | 0%       | P3       |
| 15  | Auth/Middleware  | 1          | ~40%     | P0       |

### Test Files Esistenti

```
apps/backoffice/
├── components/qr/__tests__/
│   ├── QRBuilderModal.test.tsx (935 righe, ~92 test)
│   ├── QRDesignPanel.test.tsx (274 righe, ~16 test)
│   ├── QRExportPanel.test.tsx (598 righe, ~35 test)
│   └── QRPreview.test.tsx (208 righe, ~13 test)
├── lib/qr/__tests__/
│   ├── qr-generator.test.ts (726 righe, ~60 test)
│   └── qr-types.test.ts (472 righe, ~50 test)
├── app/api/qr/__tests__/
│   └── route-helpers.test.ts (474 righe, ~45 test)
shared/utils/__tests__/
└── errors.test.ts (210 righe, ~30 test)
```

### Gap Critici

1. **AI Co-Manager (15+ services)** - 0 test per feature core
2. **Food Cost** - 0 test per calcoli business-critical
3. **Auth/Middleware** - Solo error handling testato, no auth flow

---

## 2. DEAD CODE AUDIT

### Componenti Non Utilizzati

| File                                           | Tipo       | Problema                          | Priorita |
| ---------------------------------------------- | ---------- | --------------------------------- | -------- |
| `components/Sidebar.tsx`                       | Componente | Duplicato di `layout/Sidebar.tsx` | MEDIA    |
| `components/ai/OpportunityBanner.tsx`          | Componente | Non esportato/usato               | MEDIA    |
| `components/schedule/SeasonalHoursEditor.tsx`  | Componente | Non integrato                     | BASSA    |
| `components/schedule/OperatingHoursEditor.tsx` | Componente | Non integrato                     | BASSA    |
| `app/(dashboard)/layout.tsx`                   | Import     | `_Sidebar`, `_Header` unused      | BASSA    |

### API Routes Potenzialmente Orfane

| Route                      | Probabilita Orfana | Note                      |
| -------------------------- | ------------------ | ------------------------- |
| `/api/ai/bootstrap`        | ALTA               | Nessun fetch interno      |
| `/api/ai/workflows`        | ALTA               | Feature futura            |
| `/api/ai/tourism-bookings` | ALTA               | Feature B2B non integrata |
| `/api/ai/social`           | ALTA               | Nessun fetch interno      |
| `/api/ai/market`           | ALTA               | Nessun fetch interno      |

**Nota:** Alcune routes potrebbero essere intenzionalmente preparate per feature future.

---

## 3. SECURITY AUDIT

### Riepilogo Findings

| Categoria             | Severita | Count |
| --------------------- | -------- | ----- |
| RLS troppo permissive | HIGH     | 5     |
| API senza auth        | HIGH     | 7     |
| Service role exposure | MEDIUM   | 2     |
| Password protection   | MEDIUM   | 1     |

### Issues Critiche (P0)

#### 3.1 API Routes senza Auth Check

| Route                   | Metodi       | Fix Richiesto                      |
| ----------------------- | ------------ | ---------------------------------- |
| `/api/organizations`    | POST, PATCH  | Aggiungere `getServerSession()`    |
| `/api/merchants`        | POST         | Aggiungere session check           |
| `/api/translations`     | ALL          | Aggiungere auth middleware         |
| `/api/food-cost/dishes` | ALL          | Aggiungere session + ownership     |
| `/api/upload/logo`      | POST, DELETE | Aggiungere session + brandId check |
| `/api/ai/chat`          | ALL          | Validare merchantId ownership      |
| `/api/locations`        | ALL          | Verificare auth                    |

#### 3.2 RLS Policies Permissive

| Tabella                        | Policy                     | Problema                          |
| ------------------------------ | -------------------------- | --------------------------------- |
| `accounts`                     | INSERT `WITH CHECK (true)` | Chiunque puo creare account       |
| `hot_action_requests`          | INSERT `WITH CHECK (true)` | Gia fixato in sessione precedente |
| `merchant_onboarding_sessions` | INSERT `WITH CHECK (true)` | No merchant validation            |
| `order_items`                  | INSERT `WITH CHECK (true)` | Insert arbitrari                  |
| `qr_scans`                     | INSERT `WITH CHECK (true)` | OK per analytics pubblici         |

#### 3.3 Altre Issues

| Issue                        | Severita | Azione                     |
| ---------------------------- | -------- | -------------------------- |
| Password protection DISABLED | MEDIUM   | Abilitare in Supabase Auth |
| `ENABLE_DEV_AUTH` bypass     | MEDIUM   | Verificare =false in prod  |

### Checklist Security Pre-Deploy

```
[ ] Auth check su tutte le API routes
[ ] RLS policies senza WITH CHECK(true) generico
[ ] ENABLE_DEV_AUTH=false in Vercel
[ ] Password protection abilitata
[ ] Ownership validation cross-merchant
```

---

## 4. DOCUMENTATION AUDIT

### Status per Feature

| #   | Feature          | EXEC | USER | DEV | Status |
| --- | ---------------- | ---- | ---- | --- | ------ |
| 1   | QR Codes         | -    | -    | -   | 0%     |
| 2   | Food Cost        | -    | -    | -   | 0%     |
| 3   | AI Co-Manager    | -    | YES  | YES | 66%    |
| 4   | Orders/KDS       | -    | -    | -   | 0%     |
| 5   | Marketing        | -    | -    | -   | 0%     |
| 6   | Customers        | -    | -    | -   | 0%     |
| 7   | Team             | -    | -    | -   | 0%     |
| 8   | Content          | -    | -    | -   | 0%     |
| 9   | Translations     | -    | -    | -   | 0%     |
| 10  | Settings         | -    | -    | -   | 0%     |
| 11  | Analytics        | -    | -    | -   | 0%     |
| 12  | Partnerships B2B | -    | -    | -   | 0%     |
| 13  | Onboarding       | -    | -    | -   | 0%     |
| 14  | Hot Actions      | -    | -    | -   | 0%     |
| 15  | Platform         | -    | -    | -   | 0%     |

### Riepilogo

| Metrica              | Valore      |
| -------------------- | ----------- |
| Features documentate | 1/15 (6.7%) |
| EXECUTIVE.md         | 0/15        |
| USER.md              | 1/15        |
| DEV.md               | 1/15        |
| API.md               | 1/15        |

---

## 5. PIANO AZIONI PRIORITIZZATE

### P0 - Critico (Prima di scaling)

| #   | Azione                        | Area     | Effort |
| --- | ----------------------------- | -------- | ------ |
| 1   | Fix auth su API routes        | Security | 4h     |
| 2   | Fix RLS policies permissive   | Security | 2h     |
| 3   | Test AI Co-Manager core       | Test     | 8h     |
| 4   | Test Auth/Middleware          | Test     | 4h     |
| 5   | Abilitare password protection | Security | 15min  |

### P1 - Alto (Questa settimana)

| #   | Azione              | Area  | Effort |
| --- | ------------------- | ----- | ------ |
| 6   | Test Food Cost      | Test  | 6h     |
| 7   | Test Translations   | Test  | 4h     |
| 8   | Doc QR Codes        | Docs  | 2h     |
| 9   | Doc Food Cost       | Docs  | 2h     |
| 10  | Rimuovere dead code | Clean | 1h     |

### P2 - Medio (Prossime 2 settimane)

| #   | Azione                   | Area  | Effort |
| --- | ------------------------ | ----- | ------ |
| 11  | Test Orders/KDS          | Test  | 6h     |
| 12  | Test Partnerships        | Test  | 4h     |
| 13  | Doc AI Co-Manager (EXEC) | Docs  | 1h     |
| 14  | Doc Orders               | Docs  | 2h     |
| 15  | Audit API routes orfane  | Clean | 2h     |

### P3 - Basso (Quando possibile)

- Test per Marketing, Customers, Team, Analytics
- Documentazione completa tutte le feature
- Integration test E2E
- Performance profiling

---

## 6. METRICHE TARGET

### Post-FASE 2 (Test)

| Area          | Attuale | Target   |
| ------------- | ------- | -------- |
| Auth/Security | 0%      | 80%      |
| AI Services   | 0%      | 40%      |
| API Routes    | 2%      | 30%      |
| Components    | 9%      | 20%      |
| **Overall**   | **~2%** | **~25%** |

### Post-FASE 3 (Docs)

| Metrica           | Attuale | Target |
| ----------------- | ------- | ------ |
| Features con EXEC | 0%      | 100%   |
| Features con USER | 7%      | 80%    |
| Features con DEV  | 7%      | 100%   |

---

## 7. CONCLUSIONI

### Punti di Forza

- QR Codes ben testato (~60% coverage)
- Infrastruttura test (Vitest) funzionante
- Pattern test replicabile
- Architettura AI modulare

### Aree Critiche

1. **Security:** 7 API routes senza auth - rischio data breach
2. **Test:** 14/15 aree senza test - rischio regressioni
3. **Docs:** 14/15 aree non documentate - rischio knowledge loss

### Raccomandazione

Procedere con **FASE 2 (Test Coverage)** focalizzandosi su:

1. Security fixes (P0) - 1 sessione
2. Auth/AI test - 2-3 sessioni
3. Food Cost/Translations test - 2 sessioni

---

_Audit completato: 2026-01-14_
_Prossimo audit: Post-FASE 2_
_Auditor: Claude Opus 4.5_
