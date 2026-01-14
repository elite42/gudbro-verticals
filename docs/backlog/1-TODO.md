# 📋 TODO

> Task da fare, ordinate per priorità.
> Quando inizi una task → spostala in `2-IN-PROGRESS.md`
> **Specs dettagliate:** `specs/` folder

**Last Updated:** 2026-01-14

---

## P0 - Critico (Questa Settimana)

| ID  | Feature | Descrizione     | Effort | Spec |
| --- | ------- | --------------- | ------ | ---- |
| -   | -       | Nessuna task P0 | -      | -    |

---

## P0.5 - Strategia Prodotto & Onboarding

> Decisioni che impattano onboarding B2B, pricing tiers, e conversione.

| ID                        | Feature             | Descrizione                          | Effort | Status  | Spec                                                     |
| ------------------------- | ------------------- | ------------------------------------ | ------ | ------- | -------------------------------------------------------- |
| SERVICE-MODELS            | Modelli di Servizio | Come funziona il servizio nel locale | Medium | ✅ DONE | [spec](specs/P0.5-strategy/SERVICE-MODELS.md)            |
| TIER-MENU-ONLY            | Menu Only Tier      | Entry-level pricing tier             | Low    | ✅ DONE | [spec](specs/P0.5-strategy/TIER-MENU-ONLY.md)            |
| AI-ONBOARDING             | Onboarding AI       | Chat-based onboarding                | High   | ✅ DONE | [spec](specs/P0.5-strategy/AI-ONBOARDING.md)             |
| ORDER-READY-NOTIFICATIONS | Notifiche Ordine    | Sostituisce buzzer hardware          | Medium | ✅ DONE | [spec](specs/P0.5-strategy/ORDER-READY-NOTIFICATIONS.md) |

---

## P0.5 - Architettura da Rivedere

> **BLOCCO:** Richiedono revisione architetturale prima dell'implementazione.

| ID                  | Feature             | Descrizione                     | Effort | Spec                                                   |
| ------------------- | ------------------- | ------------------------------- | ------ | ------------------------------------------------------ |
| PWA-FULL-SITE       | PWA → Sito Web      | Responsive desktop/tablet       | High   | [spec](specs/P0.5-architecture/PWA-FULL-SITE.md)       |
| AI-CUSTOMER-CHAT    | AI Customer Chat    | Chat per clienti (multi-canale) | High   | [spec](specs/P0.5-architecture/AI-CUSTOMER-CHAT.md)    |
| RESERVATIONS-SYSTEM | Prenotazioni        | Sistema prenotazioni tavoli     | High   | [spec](specs/P0.5-architecture/RESERVATIONS-SYSTEM.md) |
| QR-BUILDER-V2       | QR Builder Avanzato | Contextual QR con analytics     | High   | [spec](specs/P0.5-architecture/QR-BUILDER-V2.md)       |
| SITE-CUSTOMIZATION  | Sezioni Custom      | Merchant personalizza sito      | Medium | [spec](specs/P0.5-architecture/SITE-CUSTOMIZATION.md)  |

---

## P1 - Alta Priorità

| ID                | Feature               | Descrizione                          | Effort | Status  | Spec                                  |
| ----------------- | --------------------- | ------------------------------------ | ------ | ------- | ------------------------------------- |
| AI-FIRST-REDESIGN | Backoffice AI-First   | Dashboard operativa, non informativa | High   | ✅ DONE | [spec](specs/P1/AI-FIRST-REDESIGN.md) |
| KB-BACKOFFICE     | Knowledge Base        | Guida utente 52 pagine               | Medium | ✅ DONE | [spec](specs/P1/KB-BACKOFFICE.md)     |
| AI-ZONE-INTEL     | Zone & Customer Intel | AI conosce zona + pattern clienti    | High   | ✅ DONE | [spec](specs/P1/AI-ZONE-INTEL.md)     |
| WEATHER-INTEL     | Weather Intelligence  | Meteo in backoffice + AI             | Medium | ✅ DONE | -                                     |
| TOURISM-B2B       | Partnership Hub       | AI trova tour op + hotel/Airbnb      | High   | ✅ DONE | [spec](specs/P1/TOURISM-B2B.md)       |
| B2B-CONVENTIONS   | Corporate Conventions | Convenzioni uffici/aziende           | Medium | ✅ DONE | [spec](specs/P1/B2B-CONVENTIONS.md)   |

---

## P2 - Media Priorità

| ID             | Feature             | Descrizione            | Effort | Spec                                |
| -------------- | ------------------- | ---------------------- | ------ | ----------------------------------- |
| MT-GEOFENCING  | Location Geofencing | Radius-based location  | High   | [spec](specs/P2/MENUTIGER-AUDIT.md) |
| MT-KDS         | Kitchen Display     | Display ordini cucina  | High   | ✅ DONE                             |
| MT-WHITE-LABEL | White-label Domain  | Custom domain merchant | Medium | [spec](specs/P2/MENUTIGER-AUDIT.md) |
| HOLIDAYS-DB    | Holidays Database   | DB festività per paese | Medium | [spec](specs/P2/MENUTIGER-AUDIT.md) |

---

## P3 - Bassa Priorità (Future)

| ID               | Feature           | Descrizione               | Spec                                |
| ---------------- | ----------------- | ------------------------- | ----------------------------------- |
| AUTH-PWD-PROTECT | Leaked Password   | HaveIBeenPwned check      | [spec](specs/P3/FUTURE-FEATURES.md) |
| DEPS-MAJOR       | Major Deps Update | React 19, Next 16, TW 4   | [spec](specs/P3/FUTURE-FEATURES.md) |
| W3-NFT-LOYALTY   | NFT Loyalty       | Collezione NFT loyalty    | [spec](specs/P3/FUTURE-FEATURES.md) |
| CRYPTO-P2        | Crypto Phase 2    | Wallet Connect, Lightning | [spec](specs/P3/FUTURE-FEATURES.md) |

---

## P8 - Future Tech to Watch

| ID  | Tech          | Descrizione                      | Spec                                |
| --- | ------------- | -------------------------------- | ----------------------------------- |
| RLM | Recursive LLM | Context illimitato (10M+ tokens) | [spec](specs/P3/FUTURE-FEATURES.md) |

---

## Specs Structure

```
docs/backlog/
├── 1-TODO.md              # Questo file (index)
├── 2-IN-PROGRESS.md
├── 3-TESTING.md
├── 4-DONE.md
└── specs/
    ├── P0.5-strategy/     # 4 specs
    ├── P0.5-architecture/ # 5 specs
    ├── P1/                # 7 specs (incl. SQL dettagliati)
    ├── P2/                # 1 spec (aggregata)
    └── P3/                # 1 spec (aggregata)
```

---

**Workflow:**

1. Guarda questa tabella per scegliere task
2. Leggi la spec corrispondente per dettagli
3. Sposta in `2-IN-PROGRESS.md`
4. Completa → sposta in `4-DONE.md`
