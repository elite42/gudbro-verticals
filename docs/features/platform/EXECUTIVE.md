# Platform - Executive Summary

> Superadmin dashboard per gestione ecosistema multi-merchant.

---

## Cosa Fa

Platform e' il **pannello di controllo interno** per amministratori GudBro. Permette di monitorare tutti i merchant (247), analizzare revenue streams (MRR €12,450), tracking per paese (12 mercati), e gestire support tickets. Include sistema **multi-tenant** completo (Organization → Brand → Location) e **role-based access** con permessi granulari.

---

## Perche E' Importante

| Impatto                | Descrizione                          |
| ---------------------- | ------------------------------------ |
| **Visibility**         | Vedere health dell'intero ecosistema |
| **Revenue Tracking**   | MRR, ARR, churn rate in real-time    |
| **Market Analysis**    | Performance per paese/mercato        |
| **Support Efficiency** | Centralizzare ticket management      |
| **Scalability**        | Gestire crescita multi-merchant      |

---

## Stato Attuale

| Aspetto        | Stato       | Note                               |
| -------------- | ----------- | ---------------------------------- |
| Funzionalita   | 🟡 50%      | UI completa, dati mock             |
| Test Coverage  | ❌ Minimo   | Solo type validation               |
| Documentazione | ❌ Mancante | Primo EXECUTIVE.md                 |
| Database       | ✅ 100%     | Merchants, orgs, brands, locations |

---

## Funzionalita Chiave

### 1. Dashboard Overview

| Metrica          | Valore (Mock) |
| ---------------- | ------------- |
| Total Merchants  | 247           |
| MRR              | €12,450       |
| ARR              | €149,400      |
| Active Countries | 12            |
| Churn Rate       | 2.3%          |

### 2. Tab Navigation (5 Sezioni)

| Tab           | Contenuto                                                |
| ------------- | -------------------------------------------------------- |
| **Overview**  | Key metrics cards, trend indicators                      |
| **Merchants** | Lista merchant con search, filter by plan/country/status |
| **Revenue**   | MRR, ARR, revenue streams breakdown                      |
| **Countries** | 7 paesi tracciati (IT, ES, FR, DE, UK, US, PT)           |
| **Support**   | Open tickets (12), In Progress (5), Avg response 2.4h    |

### 3. Revenue Streams

| Stream           | Percentuale |
| ---------------- | ----------- |
| Subscriptions    | 68%         |
| Transaction Fees | 19%         |
| Premium Features | 10%         |
| API Access       | 3%          |

### 4. Multi-Tenant Hierarchy

```
Organization (Company)
    └── Brand (Restaurant Brand)
        └── Location (Physical Location)
            └── Merchant (Operational Unit)
```

### 5. Role-Based Access

| Ruolo          | Livello                   |
| -------------- | ------------------------- |
| staff          | Lowest                    |
| manager        | Medium                    |
| business_owner | High                      |
| gudbro_owner   | Highest (Platform access) |

**Platform Permissions (gudbro_owner only):**

- platform:read
- platform:manage
- platform:merchants
- platform:revenue
- platform:support

### 6. TenantSwitcher

- Dropdown per switching Organization → Brand → Location
- Persistence in localStorage
- Cascading data fetch

---

## Metriche Chiave

| Metrica              | Valore |
| -------------------- | ------ |
| Dashboard tabs       | 5      |
| Revenue streams      | 4      |
| Countries tracked    | 7      |
| Role levels          | 4      |
| Platform permissions | 5      |

---

## Competitivita

| Aspetto                  | GUDBRO | Toast | Square | Lightspeed |
| ------------------------ | ------ | ----- | ------ | ---------- |
| Multi-merchant dashboard | ✅     | N/A   | N/A    | N/A        |
| Revenue stream breakdown | ✅     | ❌    | ❌     | ❌         |
| Country-level analytics  | ✅     | ❌    | ❌     | ❌         |
| Role hierarchy           | ✅     | ✅    | 🟡     | ✅         |
| Multi-tenant switching   | ✅     | 🟡    | 🟡     | 🟡         |
| Internal support mgmt    | ✅     | ✅    | ✅     | ✅         |

---

## Roadmap

### Completato

- [x] UI tabs (Overview, Merchants, Revenue, Countries, Support)
- [x] Permission system (gudbro_owner)
- [x] Multi-tenant context
- [x] TenantSwitcher component
- [x] Mock data per tutti i widget
- [x] Merchants API (CRUD)
- [x] Access denied screen

### In Progress

- [ ] Real API endpoints per stats

### Planned

- [ ] `/api/platform/overview` - Aggregated stats
- [ ] `/api/platform/revenue` - Revenue breakdown
- [ ] `/api/platform/countries` - Geographic metrics
- [ ] `/api/platform/support` - Ticket management
- [ ] Merchant detail page (`/platform/merchants/[id]`)
- [ ] Support ticket detail page
- [ ] Action buttons funzionanti

---

## Rischi & Mitigazioni

| Rischio                     | Probabilita | Impatto | Mitigazione                    |
| --------------------------- | ----------- | ------- | ------------------------------ |
| Solo mock data              | Alta        | Medio   | Priorita API endpoints         |
| No merchant detail page     | Alta        | Basso   | Creare prima di scale          |
| Support workflow incompleto | Media       | Medio   | Integrare con ticketing system |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                   | Scopo                        |
| -------------------------------------- | ---------------------------- |
| `app/(dashboard)/platform/page.tsx`    | Dashboard principale (24KB)  |
| `lib/contexts/AuthContext.tsx`         | Auth + permissions           |
| `lib/auth/permissions.ts`              | Role hierarchy + permissions |
| `lib/contexts/TenantContext.tsx`       | Multi-tenant state           |
| `components/tenant/TenantSwitcher.tsx` | Org/Brand/Location switcher  |
| `app/api/merchants/route.ts`           | Merchants CRUD               |

---

_Ultimo aggiornamento: 2026-01-14_
