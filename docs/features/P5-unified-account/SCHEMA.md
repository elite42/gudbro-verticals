# P5 Database Schema

> **Last Updated:** 2026-01-02
> **Migration:** `shared/database/migrations/p5-unified-account/001-accounts-foundation.sql`

---

## Entity Relationship

```
+------------------+     1:N     +------------------+
|     accounts     |------------>|  account_roles   |
+------------------+             +------------------+
        |                               |
        | 1:1                           | N:1 (optional)
        v                               v
+------------------+             +------------------+
| health_profiles  |             |    merchants     |
+------------------+             +------------------+

+------------------+
|     accounts     |
+--------+---------+
         |
    +----+----+
    |         |
    v         v
+-------+  +-------+
|referrer| |referred|
+-------+  +-------+
    |         |
    +----+----+
         v
+------------------+
|    referrals     |
+------------------+

+------------------+     1:N     +----------------------+
|     accounts     |------------>| loyalty_transactions |
+------------------+             +----------------------+
```

---

## Tables

### accounts

Account principale unificato (uno per persona).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | PK |
| auth_id | UUID | YES | - | Link a auth.users |
| email | TEXT | NO | - | Email univoca |
| phone | TEXT | YES | - | Telefono |
| email_verified | BOOLEAN | NO | FALSE | Email verificata |
| phone_verified | BOOLEAN | NO | FALSE | Telefono verificato |
| first_name | TEXT | YES | - | Nome |
| last_name | TEXT | YES | - | Cognome |
| display_name | TEXT | YES | - | Nome visualizzato |
| avatar_url | TEXT | YES | - | URL avatar |
| locale | TEXT | NO | 'en' | Lingua preferita |
| timezone | TEXT | NO | 'UTC' | Timezone |
| total_points | INTEGER | NO | 0 | Punti totali |
| consumer_points | INTEGER | NO | 0 | Punti consumer |
| merchant_points | INTEGER | NO | 0 | Punti merchant |
| contributor_points | INTEGER | NO | 0 | Punti contributor |
| loyalty_tier | TEXT | NO | 'bronze' | bronze/silver/gold/platinum/founding |
| is_premium | BOOLEAN | NO | FALSE | Account premium |
| premium_type | TEXT | YES | - | consumer/merchant/both |
| premium_started_at | TIMESTAMPTZ | YES | - | Inizio premium |
| premium_expires_at | TIMESTAMPTZ | YES | - | Scadenza premium |
| referral_code | TEXT | YES | auto | Codice referral 8 char |
| referred_by_account_id | UUID | YES | - | Chi ha riferito |
| is_active | BOOLEAN | NO | TRUE | Account attivo |
| is_verified | BOOLEAN | NO | FALSE | Account verificato |
| last_login_at | TIMESTAMPTZ | YES | - | Ultimo login |
| metadata | JSONB | NO | {} | Metadata estendibile |
| created_at | TIMESTAMPTZ | NO | NOW() | Creazione |
| updated_at | TIMESTAMPTZ | NO | NOW() | Aggiornamento |

**Indexes:**
- `idx_accounts_email` (email)
- `idx_accounts_auth_id` (auth_id)
- `idx_accounts_referral_code` (referral_code)
- `idx_accounts_referred_by` (referred_by_account_id)
- `idx_accounts_loyalty_tier` (loyalty_tier)
- `idx_accounts_active` (is_active) WHERE is_active = TRUE

---

### account_roles

Ruoli multipli per account.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | PK |
| account_id | UUID | NO | - | FK accounts |
| role_type | TEXT | NO | - | consumer/merchant/admin/contributor |
| tenant_id | UUID | YES | - | FK merchants (per merchant role) |
| tenant_type | TEXT | YES | - | merchant/organization/brand |
| permissions | JSONB | NO | {} | Permessi granulari |
| is_primary | BOOLEAN | NO | FALSE | Ruolo default |
| is_active | BOOLEAN | NO | TRUE | Ruolo attivo |
| invited_by_account_id | UUID | YES | - | Chi ha invitato |
| invited_at | TIMESTAMPTZ | YES | - | Data invito |
| accepted_at | TIMESTAMPTZ | YES | - | Data accettazione |
| created_at | TIMESTAMPTZ | NO | NOW() | Creazione |
| updated_at | TIMESTAMPTZ | NO | NOW() | Aggiornamento |

**Unique Constraint:** (account_id, role_type, tenant_id)

**Indexes:**
- `idx_account_roles_account` (account_id)
- `idx_account_roles_type` (role_type)
- `idx_account_roles_tenant` (tenant_id) WHERE tenant_id IS NOT NULL
- `idx_account_roles_primary` (account_id, is_primary) WHERE is_primary = TRUE
- `idx_account_roles_active` (account_id, is_active) WHERE is_active = TRUE

---

### health_profiles

Dati sanitari 5 dimensioni (separati per GDPR).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | PK |
| account_id | UUID | NO | - | FK accounts (UNIQUE) |
| allergens | JSONB | NO | {} | Dim 1: 30 allergens |
| intolerances | JSONB | NO | {} | Dim 2: 10 intolerances |
| dietary | JSONB | NO | {} | Dim 3: 11 dietary prefs |
| food_styles | JSONB | NO | {} | Dim 4: spice, cuisines |
| preferences | JSONB | NO | {} | Dim 5: organic, local |
| completeness_score | INTEGER | NO | 0 | 0-100, auto-computed |
| share_with_merchants | BOOLEAN | NO | TRUE | Condividi con merchant |
| share_anonymized | BOOLEAN | NO | TRUE | Condividi anonimizzato |
| last_updated_at | TIMESTAMPTZ | NO | NOW() | Ultimo update dati |
| created_at | TIMESTAMPTZ | NO | NOW() | Creazione |
| updated_at | TIMESTAMPTZ | NO | NOW() | Aggiornamento |

**Indexes:**
- `idx_health_profiles_account` (account_id)
- `idx_health_profiles_allergens` GIN (allergens)
- `idx_health_profiles_dietary` GIN (dietary)

---

### referrals

Tracking referral bidirezionale.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | PK |
| referrer_account_id | UUID | NO | - | Chi ha riferito |
| referred_account_id | UUID | YES | - | Chi e' stato riferito |
| referred_email | TEXT | YES | - | Email prima di signup |
| referral_type | TEXT | NO | - | c2c/c2m/m2m/m2c |
| status | TEXT | NO | 'pending' | pending/signed_up/qualified/rewarded/expired |
| referrer_points_awarded | INTEGER | NO | 0 | Punti a referrer |
| referred_points_awarded | INTEGER | NO | 0 | Punti a referred |
| bonus_description | TEXT | YES | - | Es: "1 month free" |
| target_merchant_id | UUID | YES | - | Per c2m referrals |
| qualification_criteria | JSONB | NO | {} | Criteri qualifica |
| qualified_at | TIMESTAMPTZ | YES | - | Data qualifica |
| expires_at | TIMESTAMPTZ | NO | NOW() + 30 days | Scadenza |
| created_at | TIMESTAMPTZ | NO | NOW() | Creazione |
| updated_at | TIMESTAMPTZ | NO | NOW() | Aggiornamento |

**Referral Types:**
- `consumer_to_consumer` - Amico invita amico
- `consumer_to_merchant` - Utente invita ristorante preferito
- `merchant_to_merchant` - Ristorante invita collega
- `merchant_to_consumer` - Ristorante invita cliente

**Indexes:**
- `idx_referrals_referrer` (referrer_account_id)
- `idx_referrals_referred` (referred_account_id) WHERE NOT NULL
- `idx_referrals_email` (referred_email) WHERE NOT NULL
- `idx_referrals_type` (referral_type)
- `idx_referrals_status` (status)
- `idx_referrals_pending` (status, expires_at) WHERE status = 'pending'

---

### loyalty_transactions

Audit log transazioni punti.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | PK |
| account_id | UUID | NO | - | FK accounts |
| transaction_type | TEXT | NO | - | Tipo transazione |
| points_change | INTEGER | NO | - | Punti (+/-) |
| points_type | TEXT | NO | - | consumer/merchant/contributor |
| balance_after | INTEGER | NO | - | Saldo dopo tx |
| reference_type | TEXT | YES | - | order/referral/review/etc |
| reference_id | UUID | YES | - | ID entita riferita |
| description | TEXT | YES | - | Descrizione |
| metadata | JSONB | NO | {} | Metadata |
| created_at | TIMESTAMPTZ | NO | NOW() | Creazione |

**Transaction Types:**
- Consumer: order_completed, review_submitted, social_share, referral_consumer, referral_merchant_bonus, checkin
- Merchant: referral_merchant, ingredient_contributed, bug_report, feature_adopted, subscription_anniversary, profile_completed, case_study
- System: admin_adjustment, points_redeemed, points_expired, tier_bonus

**Indexes:**
- `idx_loyalty_tx_account` (account_id)
- `idx_loyalty_tx_type` (transaction_type)
- `idx_loyalty_tx_created` (created_at DESC)
- `idx_loyalty_tx_account_created` (account_id, created_at DESC)

---

## Functions

### award_loyalty_points()

Assegna punti e registra transazione.

```sql
award_loyalty_points(
    p_account_id UUID,
    p_points INTEGER,
    p_points_type TEXT,           -- 'consumer'/'merchant'/'contributor'
    p_transaction_type TEXT,
    p_description TEXT DEFAULT NULL,
    p_reference_type TEXT DEFAULT NULL,
    p_reference_id UUID DEFAULT NULL
) RETURNS INTEGER  -- new balance
```

### check_loyalty_tier_upgrade()

Verifica e applica upgrade tier.

```sql
check_loyalty_tier_upgrade(p_account_id UUID) RETURNS TEXT  -- new tier
```

### create_consumer_account()

Crea account con ruolo consumer.

```sql
create_consumer_account(
    p_email TEXT,
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_auth_id UUID DEFAULT NULL,
    p_referral_code TEXT DEFAULT NULL
) RETURNS UUID  -- new account id
```

### add_merchant_role()

Aggiunge ruolo merchant a account esistente.

```sql
add_merchant_role(
    p_account_id UUID,
    p_merchant_id UUID,
    p_permissions JSONB DEFAULT '{}'
) RETURNS UUID  -- new role id
```

---

## Views

### v_account_with_roles

Account con array di ruoli attivi.

```sql
SELECT * FROM v_account_with_roles WHERE email = 'mario@email.com';
-- Returns: account fields + roles JSONB array
```

### v_referral_stats

Statistiche referral per account.

```sql
SELECT * FROM v_referral_stats WHERE account_id = '...';
-- Returns: successful_referrals, pending_referrals, total_points_earned
```

---

## RLS Policies

| Table | Policy | Rule |
|-------|--------|------|
| accounts | View own | auth.uid() = auth_id |
| accounts | Update own | auth.uid() = auth_id |
| accounts | Service role | auth.role() = 'service_role' |
| accounts | Anon create | INSERT always allowed |
| account_roles | View own | account in user's accounts |
| account_roles | Service role | Full access |
| health_profiles | Manage own | account in user's accounts |
| health_profiles | Service role | Full access |
| referrals | View involved | referrer or referred is user |
| referrals | Service role | Full access |
| loyalty_transactions | View own | account in user's accounts |
| loyalty_transactions | Service role | Full access |

