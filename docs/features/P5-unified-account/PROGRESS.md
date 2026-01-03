# P5 Progress Log

> **Last Updated:** 2026-01-02
> **Current Phase:** Phase 2 IN PROGRESS - Loyalty System

---

## Phase 1: Foundation

### Completato

| Task | Data | Note |
|------|------|------|
| Analisi schema auth Supabase esistente | 2026-01-02 | Trovate tabelle: merchants, merchant_users, organizations, partners, locations, brands (tutte vuote) |
| Analisi tabelle esistenti | 2026-01-02 | merchant_users ha schema base, da preservare per backward compatibility |
| Design schema Unified Account | 2026-01-02 | 5 tabelle + funzioni helper + RLS + views |
| Creazione migration SQL | 2026-01-02 | `001-accounts-foundation.sql` (753 righe) |
| Esecuzione migration | 2026-01-02 | Successo - tutte le tabelle create |
| Verifica tabelle | 2026-01-02 | Confermato via REST API |
| Documentazione strutturata | 2026-01-02 | docs/features/P5-unified-account/ creata |
| **Sign-up Multi-Step Wizard** | 2026-01-02 | **ACC-SIGNUP-FLOW completato!** Website SignUpWizard integrato con Supabase |
| Auth callback route | 2026-01-02 | apps/website/app/auth/callback/route.ts |
| HealthProfileStep component | 2026-01-02 | UI per 5 dimensioni (allergens, dietary, intolerances) |
| Verify email page | 2026-01-02 | apps/website/app/sign-up/verify-email/ |
| **Role Switcher UI** | 2026-01-02 | **ACC-ROLE-SWITCH completato!** Backoffice header con dropdown ruoli |
| useAccountRoles hook | 2026-01-02 | Fetch ruoli da account_roles table |
| User menu con dati reali | 2026-01-02 | Header mostra nome/email da AuthContext |
| **Preference Sync Service** | 2026-01-02 | **ACC-SYNC-PREFS completato!** Sync bidirezionale local↔cloud |
| preference-sync-service.ts | 2026-01-02 | Upload/download/sync con conflict resolution |
| usePreferenceSync hook | 2026-01-02 | React hook per auto-sync on mount e on auth change |
| PreferencesModal integration | 2026-01-02 | Upload automatico al salvataggio preferenze |
| MenuClient integration | 2026-01-02 | Auto-sync quando consumer accede al menu |

### Da Fare (Phase 1) - OPTIONAL

| Task | Priorita | Note |
|------|----------|------|
| Aggiungere role_type 'partner' | Bassa | Non critico per MVP |
| Test end-to-end signup flow | Media | Verificare con Supabase reale |

---

## Phase 2: Loyalty System (IN PROGRESS)

### Completato

| Task | Data | Note |
|------|------|------|
| **Migration 002-loyalty-actions.sql** | 2026-01-02 | Funzioni specifiche per azioni loyalty |
| loyalty_config table | 2026-01-02 | Configurazione punti per azione |
| loyalty_order_completed() | 2026-01-02 | 10 pts per 10 EUR + first order bonus |
| loyalty_review_submitted() | 2026-01-02 | 25 pts per review |
| loyalty_social_share() | 2026-01-02 | 15 pts (max 3/day) |
| loyalty_checkin() | 2026-01-02 | 5 pts (max 1/day per merchant) |
| loyalty_referral_signup() | 2026-01-02 | 100-1000 pts based on type |
| loyalty_ingredient_contributed() | 2026-01-02 | 50 pts contributor |
| loyalty_profile_complete() | 2026-01-02 | 150 pts one-time bonus |
| v_loyalty_summary view | 2026-01-02 | Summary con tier progress |
| **loyalty-service.ts** | 2026-01-02 | Frontend service per loyalty |
| **LoyaltyCard component** | 2026-01-02 | UI con tier badge, progress, transactions |
| **AccountSidebar integration** | 2026-01-02 | Compact card + expandable details |

### Da Fare

| Task | ID Backlog | Priorita |
|------|------------|----------|
| Eseguire migration 002 su Supabase | ACC-LOYALTY-UNIFIED | P2 |
| Referral share UI | ACC-REFERRAL-BIDIR | P2 |
| Social share button integration | ACC-LOYALTY-CONSUMER | P2 |
| Check-in button per merchant | ACC-LOYALTY-CONSUMER | P2 |
| Merchant loyalty dashboard | ACC-LOYALTY-MERCHANT | P2 |
| Contributor rewards UI | ACC-CONTRIBUTOR | P2 |

---

## Phase 2.5: User-Generated Ingredients

### Da Fare

| Task | ID Backlog | Note |
|------|------------|------|
| Creare tabella `ingredient_contributions` | ING-USER-CONTRIB | Schema gia definito in BACKLOG |
| Photo extraction prompt | ING-PHOTO-EXTRACT | Gemini/ChatGPT |
| Admin review queue | ING-REVIEW-QUEUE | Dashboard backoffice |
| Contributor rewards | ING-CONTRIBUTOR-REWARD | 50pt per ingrediente |

---

## Decisioni Prese

Vedi [DECISIONS.md](./DECISIONS.md) per dettagli.

| # | Decisione | Data | Rationale |
|---|-----------|------|-----------|
| 1 | health_profiles separato da accounts | 2026-01-02 | GDPR - dati sensibili isolati |
| 2 | Mantenere merchant_users esistente | 2026-01-02 | Backward compatibility |
| 3 | Usare auth.uid() per RLS | 2026-01-02 | Integrazione nativa Supabase Auth |
| 4 | Loyalty tier automatico | 2026-01-02 | Trigger su totale punti |
| 5 | Referral code auto-generato | 2026-01-02 | MD5 hash 8 char |

---

## Problemi Riscontrati

| # | Problema | Soluzione | Data |
|---|----------|-----------|------|
| 1 | Context perso tra sessioni | Creata struttura docs/features/P5-unified-account/ | 2026-01-02 |

---

## Metriche

| Metrica | Valore | Target |
|---------|--------|--------|
| Tabelle create | 5 | 5 |
| Funzioni helper | 4 | 4 |
| Trigger | 5 | 5 |
| RLS Policies | 11 | 11 |
| Views | 2 | 2 |
| Account registrati | 0 | - |

