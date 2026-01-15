# TIER-MENU-ONLY - Pricing Tier "Menu Only"

**Priority:** P0.5 - Strategia Prodotto
**Status:** DONE
**Effort:** Low
**Completed:** 2026-01-14

---

## Vision

Per merchant che non vogliono cambiare flusso operativo.

## Include

- Menu consultabile via QR
- Promozioni visibili
- Traduzioni multilingua
- Analytics scansioni

## NON include

- Ordering digitale
- Pagamenti online
- Notifiche ordine pronto

## Argomenti di vendita

- "Non cambi nulla del tuo flusso. Solo un QR sul tavolo."
- "Code più veloci: cliente arriva deciso alla cassa"
- "Più secondi ordini: meno resistenza psicologica"
- "Accessibilità: chi non vede bene legge dal telefono"
- "Discovery: cliente scopre promozioni e novità"

## Strategia

Entry point per upsell futuro verso ordering digitale.

## Implementazione (2026-01-14)

**Database:**

- `organizations.subscription_plan` ora accetta: `free`, `menu_only`, `starter`, `pro`
- Migration: `add_menu_only_tier_organizations`

**Pricing (suggerito):**

- €19/mese o €190/anno
- 1 location, 5 QR codes, no staff management

**TypeScript:**

- `SubscriptionPlan` type aggiornato in `lib/supabase.ts`
- API `/api/organizations` accetta `menu_only`

**Future (quando subscription_plans sarà in prod):**

- Piano `merchant_menu_only` con features JSONB:
  - `menu_access: true`
  - `ordering_disabled: true`
  - `payments_disabled: true`

---

**Related:** SERVICE-MODELS, ORDER-READY-NOTIFICATIONS
