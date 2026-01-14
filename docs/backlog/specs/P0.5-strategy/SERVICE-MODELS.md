# SERVICE-MODELS - Modelli di Servizio Locale

**Priority:** P0.5 - Strategia Prodotto
**Status:** TODO
**Effort:** Medium

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

- [ ] Prima domanda onboarding: "Come funziona il servizio nel tuo locale?"
- [ ] Feature e pain point mostrati in base al modello
- [ ] Configurazione automatica flusso pagamento/ordine

## Percorso Upgrade Cliente

```
Menu Only → Table Ordering → Table Ordering + Notifiche
    ↓              ↓                    ↓
 Consulta      Ordina dal           Ordina + riceve
  e basta       tavolo              notifica pickup/delivery
```

---

**Related:** AI-ONBOARDING, TIER-MENU-ONLY, ORDER-READY-NOTIFICATIONS
