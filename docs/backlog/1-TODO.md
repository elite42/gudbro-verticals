# 📋 TODO

> Task da fare, ordinate per priorità.
> Quando inizi una task → spostala in `2-IN-PROGRESS.md`

**Last Updated:** 2026-01-05

---

## P0 - Critico (Questa Settimana)

| ID  | Feature | Descrizione     | Area | Effort |
| --- | ------- | --------------- | ---- | ------ |
| -   | -       | Nessuna task P0 | -    | -      |

---

## P0.5 - Architettura da Rivedere

> **BLOCCO:** Queste features richiedono revisione architetturale prima dell'implementazione.
> Valuteremo esempi UI/UX insieme prima di procedere.

### PWA-FULL-SITE - Evoluzione PWA → Sito Web Completo

**Vision:** Trasformare la PWA da "menu digitale" a "sito web completo per F&B"

| Aspetto | Stato Attuale       | Target                          |
| ------- | ------------------- | ------------------------------- |
| Mobile  | ✅ Ottimizzato      | Mantieni                        |
| Tablet  | ⚠️ Mobile stretched | Layout 2 colonne                |
| Desktop | ❌ Non adatto       | Layout completo con nav/sidebar |

**Componenti da ripensare:**

- [ ] Navigation (hamburger → desktop nav)
- [ ] Layout wrapper (responsive grid)
- [ ] Menu grid (1 → 2-3-4 colonne)
- [ ] Hero/Landing sections
- [ ] Typography scale per breakpoint
- [ ] Sidebar categorie (sempre visibile su desktop)

**Nuove sezioni sito:**

- [ ] Home page con hero
- [ ] Chi siamo / About
- [ ] Contatti / Mappa
- [ ] Prenotazioni
- [ ] Ordini takeaway

### AI-CUSTOMER-CHAT - AI Assistant Customer-Facing

**Vision:** Estendere AI Co-Manager per gestire chat con clienti

| Canale                 | Priorità |
| ---------------------- | -------- |
| Widget chat su PWA     | P1       |
| Chat su sito marketing | P2       |
| WhatsApp Business      | P2       |
| Instagram DM           | P3       |

**Funzionalità:**

- [ ] Prenotazioni via chat
- [ ] Info menu / allergeni
- [ ] Domande frequenti (orari, location, etc.)
- [ ] Ordini takeaway
- [ ] Escalation a merchant se necessario

**Architettura:**

```
Cliente (chat) → AI Customer Agent → [Escalation] → Merchant (backoffice)
```

**Dipendenze:**

- Richiede PWA-FULL-SITE per widget integrato
- Richiede sistema prenotazioni completato

### RESERVATIONS-SYSTEM - Sistema Prenotazioni

**Vision:** Sistema prenotazioni tavoli integrato

**Funzionalità:**

- [ ] Calendario disponibilità tavoli
- [ ] Form prenotazione (data, ora, persone, note)
- [ ] Conferma automatica / manuale
- [ ] Reminder via email/SMS
- [ ] Gestione no-show
- [ ] Integrazione con AI Chat per prenotazioni via conversazione

**Backoffice:**

- [ ] Vista calendario prenotazioni
- [ ] Gestione tavoli/coperti
- [ ] Blocco date/orari
- [ ] Report prenotazioni

### SITE-CUSTOMIZATION - Sezioni Sito Customizzabili

**Vision:** Merchant può personalizzare le sezioni del proprio sito

**Sezioni configurabili da backoffice:**

- [ ] Hero (immagine, titolo, CTA)
- [ ] Chi siamo (testo, foto team)
- [ ] Gallery foto
- [ ] Orari apertura
- [ ] Contatti / Mappa
- [ ] Social links
- [ ] Recensioni (Google/TripAdvisor embed)

**Configurazione:**

- [ ] Drag & drop ordine sezioni
- [ ] Abilita/disabilita sezioni
- [ ] Preview live

---

## P1 - Alta Priorità

| ID                   | Feature                 | Descrizione                      | Area           | Effort     | Note                                                 |
| -------------------- | ----------------------- | -------------------------------- | -------------- | ---------- | ---------------------------------------------------- |
| ING-TRANSLATIONS     | Popolare traduzioni     | Traduzioni per it, vi, ko, ja    | Database       | Medium     |                                                      |
| ~~MT-NOTIF-SOUNDS~~  | ~~Notification Sounds~~ | ~~Sound selection per notifica~~ | ~~Backoffice~~ | ~~Low~~    | **COMPLETATO** 2026-01-05                            |
| ~~GB-SPORTS-EVENTS~~ | ~~Sports Bar Calendar~~ | ~~25+ sport, broadcast~~         | ~~Backoffice~~ | ~~Medium~~ | **Incluso in SCHEDULE-SYSTEM** (vedi docs/features/) |

---

## P2 - Media Priorità

### Features da MenuTiger Audit

| ID                  | Feature             | Descrizione                            | Effort |
| ------------------- | ------------------- | -------------------------------------- | ------ |
| MT-GEOFENCING       | Location Geofencing | Radius-based location + GPS validation | High   |
| MT-SURVEY-BUILDER   | Survey Builder      | Question builder con live preview      | Medium |
| MT-CRM-ADVANCED     | CRM Avanzato        | Customer profiles, LTV, segments       | Medium |
| MT-THEMES-VARIETY   | 15+ Temi Website    | Layout diversi, non solo colori        | Medium |
| MT-POS-INTEGRATIONS | POS Integrations    | Square, Toast, Lightspeed, Tilby       | High   |
| MT-WIFI-QR          | WiFi QR Generator   | WPA/WPA2/WPA3 support                  | Low    |

### UX Patterns da Adottare

| ID                  | Pattern                  | Dove Applicare       | Note                      |
| ------------------- | ------------------------ | -------------------- | ------------------------- |
| ~~MT-EMPTY-STATES~~ | ~~Empty States con CTA~~ | ~~Tutto backoffice~~ | **COMPLETATO** 2026-01-05 |
| MT-SOFT-DELETE      | Archive/Soft Delete      | Menu, Products       |                           |
| MT-FILTER-PATTERN   | Apply/Reset Filters      | Orders, Reports      |                           |
| MT-LIVE-PREVIEW     | Live Preview             | QR Builder, Forms    |                           |

### Backoffice Features

| ID             | Feature            | Descrizione                           | Effort |
| -------------- | ------------------ | ------------------------------------- | ------ |
| CUISINE-FILTER | Filtro cucina      | Campo cuisine_tags, filtro visibilità | Medium |
| WINE-MGMT-UI   | Wine Management UI | Vini custom per ristoranti            | Medium |

---

## P3 - Bassa Priorità (Future)

### P6 - Schedule System (Future)

| ID          | Feature          | Descrizione                          |
| ----------- | ---------------- | ------------------------------------ |
| SCHED-STAFF | Staff Scheduling | Turni personale + Google Calendar    |
| SCHED-BREAK | Break System     | Gestione pause + override automatici |

### P7 - Web3 (Post-Validazione)

| ID             | Feature           | Descrizione                |
| -------------- | ----------------- | -------------------------- |
| W3-NFT-LOYALTY | NFT Loyalty Cards | Collezione NFT per loyalty |
| W3-CRYPTO-PAY  | Crypto Payments   | Bitcoin, ETH, stablecoins  |
