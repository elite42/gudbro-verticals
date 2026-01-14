# AI-CUSTOMER-CHAT - AI Assistant Customer-Facing

**Priority:** P0.5 - Architettura da Rivedere
**Status:** BLOCKED - Richiede PWA-FULL-SITE + RESERVATIONS-SYSTEM
**Effort:** High

---

## Vision

Estendere AI Co-Manager per gestire chat con clienti

## Canali Priorità

| Canale                 | Priorità |
| ---------------------- | -------- |
| Widget chat su PWA     | P1       |
| Chat su sito marketing | P2       |
| WhatsApp Business      | P2       |
| Instagram DM           | P3       |

## Funzionalità

- [ ] Prenotazioni via chat
- [ ] Info menu / allergeni
- [ ] Domande frequenti (orari, location, etc.)
- [ ] Ordini takeaway
- [ ] Escalation a merchant se necessario

## Architettura

```
Cliente (chat) → AI Customer Agent → [Escalation] → Merchant (backoffice)
```

## Dipendenze

- Richiede PWA-FULL-SITE per widget integrato
- Richiede sistema prenotazioni completato

---

**Related:** PWA-FULL-SITE, RESERVATIONS-SYSTEM
