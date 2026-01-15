# Team - Executive Summary

> Gestione staff, performance, feedback clienti e riconoscimenti.

---

## Cosa Fa

Team Management permette di **gestire i profili pubblici dello staff**, raccogliere **feedback dai clienti** sui singoli dipendenti, monitorare le **performance settimanali** con AI insights, e **premiare i top performer** automaticamente. Include sistema di inviti con ruoli e permessi granulari.

---

## Perche E' Importante

| Impatto                   | Descrizione                                              |
| ------------------------- | -------------------------------------------------------- |
| **Motivazione Staff**     | Riconoscimento pubblico via rating aumenta engagement    |
| **Retention**             | Sistema premi riduce turnover (bonus piccoli ricorrenti) |
| **Decisioni Data-Driven** | Bonus/promozioni basate su metriche reali, non opinioni  |
| **Customer Trust**        | Profili staff visibili costruiscono fiducia              |
| **Feedback Costruttivo**  | Dati su quali skill riconoscere (cordialita, velocita)   |

---

## Stato Attuale

| Aspetto        | Stato       | Note                              |
| -------------- | ----------- | --------------------------------- |
| Funzionalita   | ✅ 85%      | Production-ready, scheduling stub |
| Test Coverage  | ~65%        | Test per staff-service            |
| Documentazione | ❌ Mancante | Primo EXECUTIVE.md                |
| Database       | ✅ 100%     | 8 tabelle + functions + triggers  |

---

## Funzionalita Chiave

### 1. Profili Staff Pubblici

- Nome, foto, titolo, specialita, lingue
- Visibilita controllata (pubblico/privato)
- Status: attivo, in ferie, terminato
- Occupazione: proprietario, full-time, part-time, stagionale

### 2. Feedback Clienti

- Rating 1-5 stelle per staff individuale
- **8 Categorie**: cordiale, veloce, disponibile, preparato, attento, professionale, paziente, accogliente
- Feedback anonimo o identificato
- Verifica automatica se review da ordine completato
- Punti loyalty per chi lascia feedback (10 base + 5 verified + 5 comment)

### 3. Performance Dashboard

| Metrica       | Descrizione                             |
| ------------- | --------------------------------------- |
| Top Performer | Rating piu alto della settimana         |
| Most Reviews  | Piu feedback ricevuti                   |
| Most Improved | Maggiore miglioramento %                |
| Team Stats    | Review totali, rating medio, % positive |
| AI Suggestion | GPT-4 genera suggerimenti settimanali   |

### 4. Achievement System

| Achievement       | Premio                  |
| ----------------- | ----------------------- |
| Employee of Week  | Badge + bonus           |
| Employee of Month | Badge + bonus maggiore  |
| Top Rated         | Riconoscimento pubblico |
| Most Reviews      | Badge                   |
| Most Improved     | Badge                   |
| Consistency       | Stabilita nel tempo     |

### Tipi Premio

- Badge digitale
- Bonus economico
- Ore riposo
- Pasto omaggio
- Custom

### 5. Team Invitations

- Invita con email + ruolo predefinito
- Token expiration 7 giorni
- Soft delete con storico

### 6. Ruoli e Permessi

| Ruolo   | Permessi                       |
| ------- | ------------------------------ |
| Owner   | Tutti                          |
| Manager | menu, orders, analytics, staff |
| Chef    | menu_view, orders              |
| Waiter  | orders_view                    |
| Viewer  | Solo lettura                   |

**Permessi Granulari:**

- menu_view, menu_edit
- orders_view, orders_manage
- analytics_view
- staff_manage
- billing_manage
- settings_manage

---

## Metriche Chiave

| Metrica            | Valore |
| ------------------ | ------ |
| Categorie feedback | 8      |
| Achievement types  | 8      |
| Ruoli predefiniti  | 5      |
| Permessi granulari | 8      |
| Punti per review   | 10-20  |

---

## Competitivita

| Aspetto                 | GUDBRO | Toast | Square | Lightspeed |
| ----------------------- | ------ | ----- | ------ | ---------- |
| Staff profiles pubblici | ✅     | ❌    | ❌     | 🟡         |
| Customer feedback staff | ✅     | ❌    | ❌     | ❌         |
| AI performance insights | ✅     | ❌    | ❌     | ❌         |
| Achievement system      | ✅     | ❌    | ❌     | ❌         |
| Granular permissions    | ✅     | ✅    | 🟡     | ✅         |
| Team visibility toggle  | ✅     | ❌    | ❌     | ❌         |

---

## Roadmap

### Completato

- [x] Profili staff CRUD
- [x] Review system (8 categorie, anonimo, verified)
- [x] Performance reports settimanali
- [x] Achievement auto-award
- [x] Team visibility settings
- [x] Invitation system con token
- [x] 5 role templates con permessi
- [x] AI suggestions (GPT-4)

### Planned

- [ ] Manager evaluations UI (schema esiste)
- [ ] Scheduling integration (shift planning)
- [ ] Mobile staff view (app per staff)
- [ ] Advanced analytics (drill-down per categoria)
- [ ] Leaderboard pubblico

---

## Rischi & Mitigazioni

| Rischio                  | Probabilita | Impatto | Mitigazione                            |
| ------------------------ | ----------- | ------- | -------------------------------------- |
| Review spam              | Bassa       | Medio   | Verifica ordine + moderation flags     |
| Staff morale negativo    | Bassa       | Alto    | Manager può nascondere review negative |
| AI suggestion inaccurate | Bassa       | Basso   | Feedback loop per miglioramento        |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                  | Scopo                     |
| ------------------------------------- | ------------------------- |
| `app/(dashboard)/team/page.tsx`       | Dashboard team (1060 LOC) |
| `app/api/staff/route.ts`              | API profili e settings    |
| `app/api/staff/reviews/route.ts`      | API review                |
| `lib/staff-service.ts`                | Service invitations       |
| `lib/ai/staff-performance-service.ts` | AI reports                |
| `migrations/038-staff-tables.sql`     | Schema staff              |

---

_Ultimo aggiornamento: 2026-01-14_
