# P5 - Unified Account System

> **Status:** Phase 1 COMPLETATO (2026-01-02)
> **Owner:** GudBro Team
> **Priority:** Alta - Differenziatore principale vs competitors

---

## Overview

Sistema account unificato dove un singolo account puo avere ruoli multipli (Consumer, Merchant, Admin, Contributor). Elimina la friction del "crea nuovo account" e permette loyalty cross-role.

```
            +---------------------+
            |   GUDBRO ACCOUNT    |
            |   mario@email.com   |
            +----------+----------+
                       |
        +--------------+--------------+
        |              |              |
        v              v              v
   CONSUMER       MERCHANT       PERSONAL

   - Ordina        - Gestisce      - Profilo 5 Dim
   - Punti loyalty - Dashboard     - Preferenze
   - Recensioni    - Menu          - Storico visite
   - Wishlist      - Analytics     - Allergeni
        |              |              |
        +--------------+--------------+
                       |
              STESSO LOGIN!
```

---

## Phases

| Phase | Descrizione | Status | Data |
|-------|-------------|--------|------|
| **Phase 1** | Foundation (accounts, roles, health, referrals, loyalty_tx) | **COMPLETATO** | 2026-01-02 |
| Phase 2 | Loyalty System (points rules, redemption, tiers) | Pending | - |
| Phase 2.5 | User-Generated Ingredients | Pending | - |
| Phase 3 | User Value Features (wishlist, diary, reviews) | Pending | - |
| Phase 4 | Premium Features (billing, analytics personali) | Pending | - |
| Phase 5 | Cross-Selling & Ecosystem | Pending | - |
| Phase 6 | Web3 (NFT, Token) | Future | - |

---

## Quick Links

- [PROGRESS.md](./PROGRESS.md) - Log lavori e stato attuale
- [DECISIONS.md](./DECISIONS.md) - Decisioni architetturali
- [SCHEMA.md](./SCHEMA.md) - Schema database
- [USER-STORIES.md](./USER-STORIES.md) - Requisiti utente

---

## Key Differentiators vs Competitors

| Feature | GudBro | MenuTiger | Yelp | TheFork |
|---------|--------|-----------|------|---------|
| Unified Account | **YES** | No | No | No |
| Consumer Loyalty | **YES** | No | No | Yes |
| Merchant Loyalty | **YES** | No | No | No |
| Bidirectional Referral | **YES** | No | No | No |
| Role Switching | **YES** | No | No | No |
| User-Generated Ingredients | **YES** | No | No | No |

---

## Database Tables (Phase 1)

| Table | Description | Records |
|-------|-------------|---------|
| `accounts` | Account principale unificato | 0 |
| `account_roles` | Ruoli multipli per account | 0 |
| `health_profiles` | 5 Dimensioni (GDPR-separated) | 0 |
| `referrals` | Tracking referral bidirezionale | 0 |
| `loyalty_transactions` | Audit log punti | 0 |

---

## Related Files

- Migration SQL: `shared/database/migrations/p5-unified-account/001-accounts-foundation.sql`
- Backlog entry: `docs/BACKLOG.md` (linee 238-503)

