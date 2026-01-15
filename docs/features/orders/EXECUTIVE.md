# Orders & KDS - Executive Summary

> Sistema di gestione ordini e display cucina in tempo reale.

---

## Cosa Fa

Orders & KDS e' il **cuore operativo del ristorante**. Permette di ricevere ordini dal menu digitale (QR code), visualizzarli in **tempo reale** su uno schermo in cucina (KDS), e tracciare ogni ordine attraverso il workflow: nuovo → confermato → in preparazione → pronto → consegnato. Include timer colorati per monitorare i tempi di attesa e gestione completa dei pagamenti.

---

## Perche E' Importante

| Impatto                 | Descrizione                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| **Velocita**            | Riduce tempo di attesa → clienti soddisfatti → miglior rating          |
| **Accuratezza**         | Ordini chiari con note speciali → meno errori → meno reclami           |
| **Efficienza Cucina**   | KDS mostra priorita e timer → coordinamento migliore → piu coperti/ora |
| **Upsell**              | Ordini digitali aumentano extra e upgrade → AOV +15-20%                |
| **Controllo Pagamenti** | Separa ordini pagati/non pagati → controllo cash flow                  |

---

## Stato Attuale

| Aspetto        | Stato       | Note                                         |
| -------------- | ----------- | -------------------------------------------- |
| Funzionalita   | 🟡 70%      | Dashboard + KDS completi, manca PWA ordering |
| Test Coverage  | ❌ 0%       | Nessun test file                             |
| Documentazione | ❌ Mancante | Primo EXECUTIVE.md                           |
| Database       | ✅ 100%     | Schema robusto con triggers e audit          |

---

## Funzionalita Chiave

### Dashboard Ordini

- Lista ordini con filtri per status
- Statistiche quick: pending, in prep, pronti, revenue oggi
- Modal dettaglio con info cliente e items
- Aggiornamento automatico ogni 30 secondi + realtime

### Kitchen Display System (KDS)

- Vista fullscreen ottimizzata per cucina
- Colonne Kanban: Coda → In Preparazione → Pronti
- **Timer colorati**: rosso >15min, arancio >10min, giallo >5min
- Azioni one-touch: START, DONE, PICKED UP
- Font grandi per leggibilita

### Workflow Ordini

| Status        | Descrizione                         |
| ------------- | ----------------------------------- |
| **Pending**   | Ordine ricevuto, in attesa conferma |
| **Confirmed** | Accettato, in coda per cucina       |
| **Preparing** | In preparazione attiva              |
| **Ready**     | Pronto per servizio/ritiro          |
| **Delivered** | Consegnato al cliente               |
| **Cancelled** | Annullato (con motivazione)         |

### Gestione Pagamenti

- Status: Non pagato → Pagato → Rimborsato
- Metodi: Cash, Card, Momo, ZaloPay
- Reference tracking per riconciliazione

### Features Database

- **Auto-numbering**: Codici giornalieri (A-001, B-042)
- **Audit trail**: Storico completo cambi status
- **Timestamps**: Auto-set su ogni transizione
- **Totals**: Calcolo automatico da line items

---

## Metriche Chiave

| Metrica          | Valore                                  |
| ---------------- | --------------------------------------- |
| Tabelle database | 3 (orders, order_items, status_history) |
| Status ordine    | 6                                       |
| Metodi pagamento | 4                                       |
| Campi ordine     | 25+                                     |
| Indexes          | 5 (ottimizzati per query frequenti)     |
| Realtime         | ✅ Abilitato                            |

---

## Competitivita

| Aspetto            | GUDBRO | Toast | Square | Lightspeed |
| ------------------ | ------ | ----- | ------ | ---------- |
| KDS fullscreen     | ✅     | ✅    | 🟡     | ✅         |
| Timer colorati     | ✅     | 🟡    | ❌     | 🟡         |
| Realtime updates   | ✅     | ✅    | 🟡     | ✅         |
| Audit trail        | ✅     | 🟡    | ❌     | 🟡         |
| Multi-lingua items | ✅     | ❌    | ❌     | 🟡         |
| Mobile payments VN | ✅     | ❌    | ❌     | ❌         |

---

## Roadmap

### Completato

- [x] Schema database completo (3 tabelle + triggers)
- [x] Dashboard ordini con filtri e stats
- [x] KDS fullscreen con timer
- [x] Workflow status completo
- [x] Gestione pagamenti base
- [x] Realtime subscriptions
- [x] Audit trail automatico
- [x] Auto-numbering ordini

### In Progress

- [ ] RLS policies (attualmente disabilitate)

### Planned

- [ ] PWA ordering (cliente ordina da QR)
- [ ] Service layer (`order-service.ts`)
- [ ] API routes backend
- [ ] Test coverage
- [ ] Notifiche push ordine pronto
- [ ] Integrazione pagamenti Momo/ZaloPay
- [ ] ETA prep time calculation
- [ ] Customer order tracking portal

---

## Rischi & Mitigazioni

| Rischio             | Probabilita | Impatto | Mitigazione                          |
| ------------------- | ----------- | ------- | ------------------------------------ |
| RLS disabilitato    | Alta        | Alto    | Implementare policies prima di prod  |
| No validation layer | Media       | Medio   | Creare API routes con validazione    |
| No test coverage    | Alta        | Medio   | Aggiungere test per workflow critico |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                      | Scopo                      |
| ----------------------------------------- | -------------------------- |
| `app/(dashboard)/orders/page.tsx`         | Dashboard ordini (653 LOC) |
| `app/(dashboard)/orders/kitchen/page.tsx` | KDS cucina (398 LOC)       |
| `migrations/schema/002-orders.sql`        | Schema database            |

---

_Ultimo aggiornamento: 2026-01-14_
