# B2B-CONVENTIONS - Corporate Partnership System

**Priority:** P1 - Alta Priorità
**Status:** TODO
**Effort:** Medium
**Related:** TOURISM-B2B, AI-ZONE-INTEL

---

## Vision

Sistema di convenzioni aziendali per uffici, aziende, palestre e altri partner B2B nella zona del locale. Non solo turisti - i dipendenti locali sono un mercato enorme e stabile.

---

## Collegamento con AI-ZONE-INTEL

```
AI-ZONE-INTEL già identifica:
├── "TechCorp HQ a 200m, ~500 dipendenti"
├── "Studio Legale Rossi a 150m, ~30 dipendenti"
├── "Banca XYZ a 300m, ~200 dipendenti"
└── "Coworking Space a 100m, ~150 membri"

                    ↓

B2B-CONVENTIONS suggerisce:
"Hai 880 potenziali clienti lunch in 300m.
 Vuoi proporre convenzioni aziendali?"

                    ↓

Sistema genera outreach personalizzato per HR/Office Manager
```

---

## Tipi di Convenzioni Aziendali

| Tipo                 | Descrizione           | Benefit Tipico  |
| -------------------- | --------------------- | --------------- |
| **Lunch Convention** | Pranzo dipendenti     | 10-15% sconto   |
| **Meal Vouchers**    | Buoni pasto digitali  | Valore fisso €8 |
| **Coffee Break**     | Pausa caffè team      | €2/persona      |
| **Meeting Catering** | Riunioni/eventi       | Menu fisso €15  |
| **Friday Aperitivo** | Team building         | €10/persona     |
| **Birthday Benefit** | Compleanno dipendente | Dolce gratis    |

---

## Database Schema

> **SQL completo:** [B2B-CONVENTIONS-SQL.md](./B2B-CONVENTIONS-SQL.md)

- `partner_conventions` - Convenzioni attive tra merchant e partner
- `convention_vouchers` - Voucher/link individuali per utenti
- `convention_redemptions` - Tracking utilizzo convenzioni
- `office_partners` - Uffici/aziende partner
- `merchant_office_outreach` - Pipeline CRM per uffici

---

## UI - Cliente (PWA)

```
┌─────────────────────────────────────────┐
│ YOUR BENEFITS                           │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ TECHCORP                            │ │
│ │                                     │ │
│ │ 15% Discount on Lunch               │ │
│ │                                     │ │
│ │ Valid: Mon-Fri, 12:00-14:30         │ │
│ │ Badge: #12345                       │ │
│ │                                     │ │
│ │ ┌───────────────────────────────┐   │ │
│ │ │         [QR CODE]             │   │ │
│ │ │    Show this to staff         │   │ │
│ │ └───────────────────────────────┘   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ HOTEL DUOMO (Guest)                 │ │
│ │ 10% off • Valid until Jan 15       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ FITLIFE GYM                         │ │
│ │ Free protein shake with meal        │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

---

## UI - Staff (POS/Backoffice)

```
┌─────────────────────────────────────────────────────────────────┐
│ VERIFY CONVENTION                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [Scan QR]     [Enter Code]     [Search Partner]                 │
│                                                                 │
│ ═══════════════════════════════════════════════════════════════ │
│                                                                 │
│ VALID CONVENTION                                                │
│                                                                 │
│ Partner:    TechCorp S.r.l.                                     │
│ Employee:   Mario Rossi (Badge #12345)                          │
│ Benefit:    15% Discount                                        │
│ Valid:      Mon-Fri, 12:00-14:30                                │
│ Uses today: 0/1                                                 │
│                                                                 │
│              [Apply 15% Discount]                               │
│                                                                 │
│ ═══════════════════════════════════════════════════════════════ │
│                                                                 │
│ TODAY'S QUICK CODES:                                            │
│ • TECHCORP-1301                                                 │
│ • DUOMO-1301                                                    │
│ • FITLIFE-1301                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## AI Discovery Flow

```
STEP 1: AI-ZONE-INTEL identifica uffici
├── Google Places API: "offices near [location]"
├── Stima dipendenti da dimensione building
└── Salva in office_partners

STEP 2: AI analizza potenziale
├── 500 dipendenti × 20% adoption = 100 clienti
├── 100 clienti × 3 pranzi/sett × €10 = €3,000/sett
├── €12,000/mese potenziale da TechCorp
└── Score: "High potential - recommend outreach"

STEP 3: AI suggerisce outreach
├── Template email per HR/Office Manager
├── Proposta convenzione personalizzata
└── Tracking in CRM pipeline
```

---

## Verification Methods

| Metodo       | Descrizione                        | Use Case                   |
| ------------ | ---------------------------------- | -------------------------- |
| `link`       | Link diretto con codice embedded   | Default, facile            |
| `qr_scan`    | Partner ha QR che utenti scansiona | Hotel lobby, office        |
| `daily_code` | Codice giornaliero rotativo        | Security-conscious offices |
| `badge_id`   | Numero badge dipendente            | Corporate clients          |
| `automatic`  | Geofencing/riconoscimento          | Future, premium            |

---

**Related:** TOURISM-B2B (stesso pattern di partnership)
