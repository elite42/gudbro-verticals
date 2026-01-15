# Hot Actions - Executive Summary

> Sistema real-time per richieste rapide cliente → staff.

---

## Cosa Fa

Hot Actions e' un **sistema di comunicazione real-time** che permette ai clienti di inviare richieste rapide (chiama cameriere, richiedi conto, refill acqua) dal menu digitale PWA. Lo staff vede le richieste **istantaneamente** nel backoffice con notifiche sonore, priorita color-coded, e tracking tempo di risposta.

---

## Perche E' Importante

| Impatto                    | Descrizione                             |
| -------------------------- | --------------------------------------- |
| **Customer Experience**    | Niente attesa per chiamare cameriere    |
| **Staff Efficiency**       | Richieste centralizzate e prioritizzate |
| **Response Time Tracking** | Metriche per migliorare servizio        |
| **No Hardware**            | Elimina campanelli e call button fisici |
| **Competitive Edge**       | Feature unica (ispirata a MenuTiger)    |

---

## Stato Attuale

| Aspetto        | Stato       | Note                                 |
| -------------- | ----------- | ------------------------------------ |
| Funzionalita   | ✅ 95%      | Production-ready, solo TODO staff ID |
| Test Coverage  | ❌ Minimo   | Solo manual testing                  |
| Documentazione | ❌ Mancante | Primo EXECUTIVE.md                   |
| Database       | ✅ 100%     | 2 tabelle + RPC functions + RLS      |

---

## Funzionalita Chiave

### 1. Azioni Disponibili (5 Default)

| Azione          | Icon | Priorita | Colore |
| --------------- | ---- | -------- | ------ |
| Call Waiter     | 🙋   | High     | Blue   |
| Request Bill    | 💳   | Normal   | Green  |
| Clean Table     | ✨   | Low      | Orange |
| Need Assistance | ❓   | Normal   | Purple |
| Water Refill    | 💧   | Low      | Cyan   |

Azioni configurabili per location via `hot_action_types` table.

### 2. Customer Flow (PWA)

```
Menu Digitale → More Options (≡) → "Call Staff"
    ↓
CallStaffModal:
    - Seleziona azione (Call Waiter / Request Bill)
    - Aggiungi nota (opzionale)
    - Seleziona payment method (se bill)
    ↓
Submit → Real-time notification a staff
```

### 3. Staff Dashboard

- **Real-time grid** con richieste
- **Status filter**: Active, Pending, Acknowledged, In Progress, Completed
- **Stats cards**:
  - Pending (con ping animation)
  - Acknowledged
  - Avg Wait Time (color-coded: <1m green, <3m yellow, <5m orange, >5m red)
- **Request cards** con: azione, priorita, tavolo, nota, tempo attesa
- **Buttons**: Acknowledge (blue) → Complete (green)
- **Suono notifica** quando pending > 0

### 4. Spam Prevention

- **Device fingerprinting** per cooldown
- **Cooldown timer** per azione (default 5 min)
- `can_submit_hot_action()` check prima di submit

### 5. Database Functions (RPC)

| Function                | Scopo                             |
| ----------------------- | --------------------------------- |
| submit_hot_action       | Crea nuova richiesta              |
| can_submit_hot_action   | Check cooldown                    |
| acknowledge_hot_action  | Staff marca come visto            |
| complete_hot_action     | Staff marca come completato       |
| get_pending_hot_actions | Query dashboard (priority sorted) |
| get_hot_action_stats    | Analytics per periodo             |

### 6. Request Lifecycle

```
pending → acknowledged → in_progress → completed
                                    ↘ cancelled
```

---

## Metriche Chiave

| Metrica          | Valore                        |
| ---------------- | ----------------------------- |
| Azioni default   | 5                             |
| Priority levels  | 4 (urgent, high, normal, low) |
| Status states    | 5                             |
| RPC functions    | 6                             |
| Tables           | 2                             |
| Cooldown default | 5 min                         |

---

## Competitivita

| Aspetto                     | GUDBRO | Toast | Square | Lightspeed |
| --------------------------- | ------ | ----- | ------ | ---------- |
| Real-time customer requests | ✅     | ❌    | ❌     | ❌         |
| QR-integrated               | ✅     | ❌    | ❌     | ❌         |
| Priority-based sorting      | ✅     | N/A   | N/A    | N/A        |
| Response time tracking      | ✅     | ❌    | ❌     | ❌         |
| Spam prevention             | ✅     | N/A   | N/A    | N/A        |
| Sound notifications         | ✅     | ❌    | ❌     | ❌         |
| Configurable actions        | ✅     | N/A   | N/A    | N/A        |

---

## Roadmap

### Completato

- [x] Database schema con RLS
- [x] PWA customer interface
- [x] Backoffice staff dashboard
- [x] 5 azioni default seeded
- [x] Realtime subscriptions
- [x] RPC functions complete
- [x] Analytics ready
- [x] Device fingerprinting
- [x] Multi-language (en/it)
- [x] Sound notifications

### In Progress

- [ ] Staff member ID tracking (TODO in code)

### Planned

- [ ] Push notifications mobile
- [ ] Custom action creation UI
- [ ] Response time SLA alerts
- [ ] Staff performance by action type

---

## Rischi & Mitigazioni

| Rischio                  | Probabilita | Impatto | Mitigazione                        |
| ------------------------ | ----------- | ------- | ---------------------------------- |
| Staff ID non tracciato   | Alta        | Basso   | Implementare auth integration      |
| Spam nonostante cooldown | Bassa       | Medio   | Device fingerprint + rate limiting |
| Staff ignora notifiche   | Media       | Alto    | Escalation dopo X minuti           |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                                | Scopo            |
| --------------------------------------------------- | ---------------- |
| `app/(dashboard)/hot-actions/page.tsx`              | Staff dashboard  |
| `coffeeshop/frontend/components/CallStaffModal.tsx` | PWA modal        |
| `coffeeshop/frontend/lib/hot-actions-service.ts`    | Frontend service |
| `migrations/023-hot-actions.sql`                    | Schema + RPC     |

---

_Ultimo aggiornamento: 2026-01-14_
