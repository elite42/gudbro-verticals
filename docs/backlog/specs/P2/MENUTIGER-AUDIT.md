# P2 - Features da MenuTiger Audit

**Priority:** P2 - Media Priorità
**Status:** TODO

---

## MenuTiger Audit v1

| ID                  | Feature             | Descrizione                            | Effort |
| ------------------- | ------------------- | -------------------------------------- | ------ |
| MT-GEOFENCING       | Location Geofencing | Radius-based location + GPS validation | High   |
| MT-SURVEY-BUILDER   | Survey Builder      | Question builder con live preview      | Medium |
| MT-CRM-ADVANCED     | CRM Avanzato        | Customer profiles, LTV, segments       | Medium |
| MT-THEMES-VARIETY   | 15+ Temi Website    | Layout diversi, non solo colori        | Medium |
| MT-POS-INTEGRATIONS | POS Integrations    | Square, Toast, Lightspeed, Tilby       | High   |

---

## MenuTiger Audit v2 (2026-01-08)

| ID               | Feature                 | Descrizione                                      | Effort |
| ---------------- | ----------------------- | ------------------------------------------------ | ------ |
| MT-KDS           | Kitchen Display System  | Display ordini real-time per cucina              | High   |
| MT-WHITE-LABEL   | White-label Domain      | Custom domain per merchant (es. menu.miobar.com) | Medium |
| MT-EMAIL-REPORTS | Automated Email Reports | Report vendite/feedback giornalieri/settimanali  | Low    |
| MT-ZAPIER        | Zapier Integration      | Connessione con 5000+ app esterne                | Medium |

---

## UX Patterns da Adottare

| ID                | Pattern          | Dove Applicare  |
| ----------------- | ---------------- | --------------- |
| MT-SOFT-DELETE    | Archive/Soft Del | Menu, Products  |
| MT-FILTER-PATTERN | Apply/Reset      | Orders, Reports |
| MT-LIVE-PREVIEW   | Live Preview     | QR Builder      |

---

## Backoffice Features

| ID             | Feature            | Descrizione                           | Effort |
| -------------- | ------------------ | ------------------------------------- | ------ |
| CUISINE-FILTER | Filtro cucina      | Campo cuisine_tags, filtro visibilità | Medium |
| WINE-MGMT-UI   | Wine Management UI | Vini custom per ristoranti            | Medium |

---

## AI Intelligence Features

| ID               | Feature           | Descrizione                                     | Effort |
| ---------------- | ----------------- | ----------------------------------------------- | ------ |
| HOLIDAYS-DB      | Holidays Database | DB centralizzato festività per paese/città      | Medium |
| AI-HOLIDAY-AWARE | Holiday Awareness | AI ricerca festività locali e popola calendario | Medium |

**HOLIDAYS-DB Spec:**

- Tabella `holidays`: country_code, city, date, name, type, impact_level
- Type: national, religious, local, regional, sporting, cultural
- Popolamento: API esterne + crowdsourcing merchant
