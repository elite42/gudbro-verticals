# P5 User Stories

> **Last Updated:** 2026-01-02
> **Source:** BACKLOG.md sezione P5

---

## Phase 1: Foundation

### US-001: Unified Account Creation

**Come** nuovo utente,
**voglio** creare un account GUDBRO,
**per** usarlo sia come consumer che come merchant in futuro.

**Acceptance Criteria:**
- [ ] Sign-up con email/password o social (Google/Apple/Facebook)
- [ ] Account creato con ruolo `consumer` di default
- [ ] Health profile vuoto creato automaticamente
- [ ] Referral code generato automaticamente
- [ ] Se uso referral code, link a referrer registrato

**Technical Notes:**
- `create_consumer_account()` function disponibile
- Trigger genera referral_code

---

### US-002: Role Switching

**Come** utente con ruoli multipli,
**voglio** switchare tra ruoli (consumer/merchant),
**per** vedere dashboard e funzionalita diverse.

**Acceptance Criteria:**
- [ ] Dropdown in header mostra ruoli disponibili
- [ ] Switch istantaneo senza logout
- [ ] UI adattata al ruolo corrente
- [ ] Ultimo ruolo usato salvato come `is_primary`

**Technical Notes:**
- `account_roles.is_primary` indica default
- Trigger garantisce un solo primary per account

---

### US-003: Health Profile Setup

**Come** consumer,
**voglio** configurare il mio profilo salute (5 dimensioni),
**per** ricevere raccomandazioni personalizzate.

**Acceptance Criteria:**
- [ ] Wizard step-by-step per 5 dimensioni
- [ ] Posso saltare dimensioni e completare dopo
- [ ] Progress bar mostra completeness_score
- [ ] Posso scegliere se condividere con merchant

**Technical Notes:**
- `completeness_score` calcolato da trigger
- `share_with_merchants` flag rispettato nelle query

---

### US-004: Add Merchant Role

**Come** consumer esistente che possiede un locale,
**voglio** aggiungere ruolo merchant al mio account,
**per** gestire il locale senza creare nuovo account.

**Acceptance Criteria:**
- [ ] Opzione "Aggiungi locale" nel profilo
- [ ] Wizard raccoglie info business
- [ ] Nuovo merchant creato + role aggiunto
- [ ] Posso switchare tra consumer e merchant

**Technical Notes:**
- `add_merchant_role()` function disponibile
- `tenant_id` referenzia `merchants.id`

---

## Phase 2: Loyalty System

### US-005: Earn Consumer Points

**Come** consumer,
**voglio** guadagnare punti con le mie azioni,
**per** sbloccare rewards.

**Acceptance Criteria:**
- [ ] 10 punti per ogni 10 EUR spesi
- [ ] 25 punti per recensione verificata
- [ ] 15 punti per social share
- [ ] 100 punti per referral consumer
- [ ] 500 punti per referral merchant (che si abbona)
- [ ] 5 punti per check-in locale

**Technical Notes:**
- `award_loyalty_points()` con type='consumer'
- `loyalty_transactions` per audit

---

### US-006: Earn Merchant Points

**Come** merchant,
**voglio** guadagnare punti anche io,
**per** avere vantaggi sulla piattaforma.

**Acceptance Criteria:**
- [ ] 1000 punti per referral merchant + 1 mese gratis
- [ ] 50 punti per ingrediente approvato
- [ ] 100 punti per bug report utile
- [ ] 200 punti per feature adottata
- [ ] 300 punti per anno abbonamento
- [ ] 150 punti per profilo 100% completo
- [ ] 1000 punti per case study/testimonial

**Technical Notes:**
- `award_loyalty_points()` con type='merchant'
- `transaction_type` specifico per ogni azione

---

### US-007: Tier Upgrade

**Come** utente con punti,
**voglio** essere promosso di tier automaticamente,
**per** ricevere bonus tier.

**Acceptance Criteria:**
- [ ] Bronze: 0-999 punti
- [ ] Silver: 1000+ punti (+100 bonus)
- [ ] Gold: 5000+ punti (+250 bonus)
- [ ] Platinum: 10000+ punti (+500 bonus)
- [ ] Notifica quando cambio tier

**Technical Notes:**
- `check_loyalty_tier_upgrade()` chiamato dopo ogni award
- Tier bonus registrato come `tier_bonus` transaction

---

### US-008: Bidirectional Referral

**Come** utente (consumer o merchant),
**voglio** invitare sia amici che locali,
**per** guadagnare punti da entrambi.

**Acceptance Criteria:**
- [ ] Consumer puo invitare consumer (100pt quando si registra)
- [ ] Consumer puo invitare merchant (500pt quando si abbona)
- [ ] Merchant puo invitare merchant (1000pt + 1 mese gratis)
- [ ] Merchant puo invitare consumer (bonus minore)
- [ ] Tracking status referral (pending/qualified/rewarded)

**Technical Notes:**
- `referrals` table con 4 tipi
- `qualification_criteria` JSONB per regole custom

---

## Phase 2.5: User-Generated Ingredients

### US-009: Contribute Ingredient

**Come** merchant/contributor,
**voglio** aggiungere ingredienti mancanti,
**per** guadagnare punti e aiutare la community.

**Acceptance Criteria:**
- [ ] Cerco ingrediente, non trovato -> "Aggiungi con foto"
- [ ] Fotografo etichetta nutrizionale
- [ ] Copio prompt GudBro -> incollo in Gemini/ChatGPT
- [ ] AI restituisce JSON nutrition
- [ ] Incollo JSON -> "Usa subito" o "Invia per review"
- [ ] Se approvato: 50 punti

**Technical Notes:**
- Tabella `ingredient_contributions` (da creare in Phase 2.5)
- Review queue nel backoffice

---

## Phase 3: User Value Features

### US-010: Wishlist

**Come** consumer,
**voglio** salvare piatti da provare,
**per** ricordarmi cosa ordinare.

**Acceptance Criteria:**
- [ ] Cuoricino su ogni piatto
- [ ] Lista wishlist nel profilo
- [ ] Notifica quando piatto in promo

---

### US-011: Food Diary

**Come** consumer premium,
**voglio** vedere storico di cosa ho mangiato,
**per** tracciare la mia alimentazione.

**Acceptance Criteria:**
- [ ] Cronologia ordini con piatti
- [ ] Calorie/macro giornalieri (se disponibili)
- [ ] Export dati

---

### US-012: Verified Reviews

**Come** consumer che ha ordinato,
**voglio** lasciare recensione verificata,
**per** aiutare altri e guadagnare punti.

**Acceptance Criteria:**
- [ ] Solo post-ordine posso recensire
- [ ] Badge "Verified" sulla recensione
- [ ] Se sono merchant del settore, peso maggiore
- [ ] 25 punti per recensione

---

## Phase 4: Premium Features

### US-013: Consumer Premium Subscription

**Come** consumer power user,
**voglio** abbonarmi a Premium (1.50 EUR/mese),
**per** sbloccare feature avanzate.

**Acceptance Criteria:**
- [ ] Food Diary completo
- [ ] Analytics personali
- [ ] No ads
- [ ] Priority support
- [ ] 2x punti loyalty
- [ ] Referral illimitati

---

## Mapping to Database

| User Story | Tables Used | Functions Used |
|------------|-------------|----------------|
| US-001 | accounts, account_roles, health_profiles | create_consumer_account() |
| US-002 | account_roles | - |
| US-003 | health_profiles | compute_health_profile_completeness() |
| US-004 | account_roles | add_merchant_role() |
| US-005 | accounts, loyalty_transactions | award_loyalty_points() |
| US-006 | accounts, loyalty_transactions | award_loyalty_points() |
| US-007 | accounts | check_loyalty_tier_upgrade() |
| US-008 | referrals | - |
| US-009 | ingredient_contributions (Phase 2.5) | - |

