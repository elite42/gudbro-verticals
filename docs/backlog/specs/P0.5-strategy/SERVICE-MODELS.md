# SERVICE-MODELS - Modelli di Servizio Locale

**Priority:** P0.5 - Strategia Prodotto
**Status:** DONE
**Effort:** Medium
**Completed:** 2026-01-14

---

## Vision

Il modello di servizio del locale determina le feature necessarie.

## Modelli identificati

| Modello                   | Ordine                | Pagamento  | QR Serve Per             |
| ------------------------- | --------------------- | ---------- | ------------------------ |
| Table Service             | Cameriere             | Fine pasto | Consultazione menu       |
| Counter + Delivery        | Banco + numero tavolo | Prima/dopo | Pre-decisione            |
| Counter + Pickup          | Banco                 | Subito     | Pre-decisione            |
| Counter + Menu Illuminato | Banco                 | Subito     | Accessibilità, discovery |
| QR Ordering               | Telefono              | Telefono   | Tutto il flusso          |

## Implicazioni

- [x] Prima domanda onboarding: "Come funziona il servizio nel tuo locale?"
- [ ] Feature e pain point mostrati in base al modello (future)
- [ ] Configurazione automatica flusso pagamento/ordine (future)

## Implementazione (2026-01-14)

**Database:**

- `locations.service_style` con valori: `dine_in`, `counter`, `takeaway`, `delivery_only`, `qr_ordering`, `mixed`
- Migration: `add_qr_ordering_service_style`

**Onboarding Wizard (Step 3):**

- Dopo selezione business type "Restaurant/Cafe", appare selezione service style
- 6 opzioni con icona, titolo, descrizione e "QR used for"
- Valore salvato nella creazione location

**API:**

- `POST /api/locations` accetta `serviceStyle`
- `PATCH /api/locations` accetta `serviceStyle`

**Files modificati:**

- `apps/backoffice/app/(onboarding)/onboarding/page.tsx`
- `apps/backoffice/app/api/locations/route.ts`

## Percorso Upgrade Cliente

```
Menu Only → Table Ordering → Table Ordering + Notifiche
    ↓              ↓                    ↓
 Consulta      Ordina dal           Ordina + riceve
  e basta       tavolo              notifica pickup/delivery
```

---

**Related:** AI-ONBOARDING, TIER-MENU-ONLY, ORDER-READY-NOTIFICATIONS
