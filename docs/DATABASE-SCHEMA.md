# DATABASE SCHEMA - Source of Truth

> **IMPORTANTE**: Questo file documenta lo schema ATTUALE del database Supabase.
> Consultalo SEMPRE prima di scrivere migration o modificare tabelle.
>
> **Last Updated**: 2026-01-05
> **Last Migration Executed**: 037-ai-rls-fix.sql

---

## Quick Reference: Tabelle Principali

| Tabella                   | Sistema        | Descrizione                                        |
| ------------------------- | -------------- | -------------------------------------------------- |
| `accounts`                | P5             | Account utente unificato (consumer/merchant/admin) |
| `account_roles`           | P5             | Ruoli associati ad account                         |
| `health_profiles`         | P5             | Profilo salute 5 dimensioni                        |
| `merchants`               | Core           | Merchant/ristoranti                                |
| `locations`               | Core           | Sedi fisiche dei merchant                          |
| `hot_action_types`        | Hot Actions    | Tipi di azioni rapide                              |
| `hot_action_requests`     | Hot Actions    | Richieste dai clienti                              |
| `merchant_followers`      | Followers      | Utenti che seguono merchant                        |
| `follower_analytics`      | Followers      | Metriche per follower                              |
| `customer_feedback`       | Feedback       | Rating, review, suggestions                        |
| `ai_usage_logs`           | AI Co-Manager  | Log utilizzo AI per billing                        |
| `ai_conversations`        | AI Co-Manager  | Chat history AI                                    |
| `ai_merchant_preferences` | AI Co-Manager  | Preferenze AI per merchant                         |
| `ai_sessions`             | AI Co-Manager  | Sessioni chat AI                                   |
| `ai_daily_briefings`      | AI Proactivity | Briefing giornalieri AI                            |
| `ai_alerts`               | AI Proactivity | Alert proattivi AI                                 |
| `ai_suggestions`          | AI Proactivity | Suggerimenti AI                                    |

---

## Sistema P5 Unified Account (ATTIVO)

> **ATTENZIONE**: Il sistema P5 ha sostituito il vecchio `gudbro_user_profiles`.
> NON usare `gudbro_user_profiles` o `merchant_users.user_id` nelle nuove migration.

### accounts

```sql
CREATE TABLE accounts (
    id UUID PRIMARY KEY,
    auth_id UUID UNIQUE,              -- Link a Supabase Auth
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    first_name TEXT,
    last_name TEXT,
    display_name TEXT,
    avatar_url TEXT,
    locale TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'UTC',

    -- Loyalty Points (Unified)
    total_points INTEGER DEFAULT 0,
    consumer_points INTEGER DEFAULT 0,
    merchant_points INTEGER DEFAULT 0,
    contributor_points INTEGER DEFAULT 0,
    loyalty_tier TEXT DEFAULT 'bronze',  -- bronze/silver/gold/platinum/founding

    -- Premium
    is_premium BOOLEAN DEFAULT FALSE,
    premium_type TEXT,                   -- consumer/merchant/both

    -- Referral
    referral_code TEXT UNIQUE,           -- Auto-generated
    referred_by_account_id UUID,

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

### account_roles

```sql
CREATE TABLE account_roles (
    id UUID PRIMARY KEY,
    account_id UUID REFERENCES accounts(id),

    role_type TEXT NOT NULL,             -- consumer/merchant/admin/contributor
    tenant_id UUID,                      -- merchant_id quando role_type='merchant'
    tenant_type TEXT,                    -- merchant/organization/brand
    permissions JSONB DEFAULT '{}',

    is_primary BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,

    invited_by_account_id UUID,
    invited_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,

    UNIQUE(account_id, role_type, tenant_id)
);
```

### health_profiles

```sql
CREATE TABLE health_profiles (
    id UUID PRIMARY KEY,
    account_id UUID UNIQUE REFERENCES accounts(id),

    allergens JSONB DEFAULT '{}',        -- 30 tipi
    intolerances JSONB DEFAULT '{}',     -- 10 tipi
    dietary JSONB DEFAULT '{}',          -- 11 tipi
    food_styles JSONB DEFAULT '{}',
    preferences JSONB DEFAULT '{}',

    completeness_score INTEGER DEFAULT 0,
    share_with_merchants BOOLEAN DEFAULT TRUE,
    share_anonymized BOOLEAN DEFAULT TRUE
);
```

---

## Core Tables

### merchants

```sql
CREATE TABLE merchants (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    description TEXT,
    logo_url TEXT,
    cover_image_url TEXT,

    -- Contact
    email VARCHAR(255),
    phone VARCHAR(50),
    website TEXT,

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,

    -- Settings
    settings JSONB DEFAULT '{}',

    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

### locations

```sql
CREATE TABLE locations (
    id UUID PRIMARY KEY,
    merchant_id UUID REFERENCES merchants(id),

    name VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),

    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timezone TEXT DEFAULT 'UTC',

    is_active BOOLEAN DEFAULT TRUE,
    is_primary BOOLEAN DEFAULT FALSE,

    -- Operating hours
    operating_hours JSONB DEFAULT '{}',

    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

---

## Hot Actions System (Migration 023)

### hot_action_types

```sql
CREATE TABLE hot_action_types (
    id UUID PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,    -- call_waiter, request_bill, etc.
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7),
    default_priority VARCHAR(20) DEFAULT 'normal',
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0
);
```

### hot_action_requests

```sql
CREATE TABLE hot_action_requests (
    id UUID PRIMARY KEY,
    location_id UUID REFERENCES locations(id),
    action_type_id UUID REFERENCES hot_action_types(id),

    table_number VARCHAR(50),
    customer_note TEXT,
    session_id VARCHAR(255),

    status VARCHAR(20) DEFAULT 'pending',  -- pending/acknowledged/in_progress/completed/cancelled
    priority VARCHAR(20) DEFAULT 'normal', -- low/normal/high/urgent

    acknowledged_at TIMESTAMPTZ,
    acknowledged_by UUID REFERENCES accounts(id),
    completed_at TIMESTAMPTZ,
    completed_by UUID REFERENCES accounts(id),

    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

---

## Migration Status

### Eseguite (in produzione)

| #       | File                                | Data Esecuzione | Note                                            |
| ------- | ----------------------------------- | --------------- | ----------------------------------------------- |
| 001-018 | p5-unified-account/\*.sql           | 2026-01-02      | Sistema P5 completo                             |
| 023     | 023-hot-actions.sql                 | 2026-01-04      | Hot Actions system                              |
| 024     | 024-merchant-followers-feedback.sql | 2026-01-04      | Followers + Feedback (P5)                       |
| 025     | 025-tourist-lifecycle.sql           | 2026-01-04      | Tourist Lifecycle                               |
| 026     | 026-food-challenges.sql             | 2026-01-04      | Food Challenges                                 |
| 027     | 027-ai-comanager.sql                | 2026-01-05      | AI Co-Manager MVP (chat, usage logs)            |
| 028     | 028-ai-proactivity.sql              | 2026-01-05      | AI Proactivity (briefings, alerts, suggestions) |

### Da Eseguire

| #   | File | Dipendenze | Note                        |
| --- | ---- | ---------- | --------------------------- |
| -   | -    | -          | Nessuna migration in attesa |

### Deprecate (NON usare)

| File                                        | Motivo                                  |
| ------------------------------------------- | --------------------------------------- |
| ~~018-gudbro-users-followers-feedback.sql~~ | Sostituito da 024, usava vecchio schema |

---

## Relazioni Chiave (FK)

```
accounts
    ↓
    ├── account_roles.account_id
    ├── health_profiles.account_id
    ├── merchant_followers.account_id (024)
    ├── follower_analytics.account_id (024)
    ├── customer_feedback.account_id (024)
    └── hot_action_requests.acknowledged_by / completed_by

merchants
    ↓
    ├── locations.merchant_id
    ├── account_roles.tenant_id (quando role_type='merchant')
    ├── merchant_followers.merchant_id (024)
    └── customer_feedback.merchant_id (024)

locations
    ↓
    ├── hot_action_requests.location_id
    ├── ai_daily_briefings.location_id
    ├── ai_alerts.location_id
    └── ai_suggestions.location_id

merchants (AI System)
    ↓
    ├── ai_usage_logs.merchant_id
    ├── ai_conversations.merchant_id
    ├── ai_merchant_preferences.merchant_id
    ├── ai_sessions.merchant_id
    ├── ai_daily_briefings.merchant_id
    ├── ai_alerts.merchant_id
    └── ai_suggestions.merchant_id
```

---

## Pattern da Seguire

### Per verificare permessi merchant (RLS)

```sql
-- CORRETTO (P5)
EXISTS (
    SELECT 1 FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.tenant_id = <table>.merchant_id
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
)

-- SBAGLIATO (vecchio sistema)
EXISTS (
    SELECT 1 FROM merchant_users mu
    WHERE mu.user_id = auth.uid()  -- ❌ user_id non esiste
    AND mu.merchant_id = <table>.merchant_id
)
```

### Per ottenere account_id dell'utente corrente

```sql
-- CORRETTO (P5)
SELECT id INTO v_account_id FROM accounts WHERE auth_id = auth.uid();

-- SBAGLIATO (vecchio sistema)
-- auth.uid() direttamente come user_id ❌
```

---

## Breaking Changes Log

| Data       | Cambiamento               | Impatto                                                                             |
| ---------- | ------------------------- | ----------------------------------------------------------------------------------- |
| 2026-01-02 | P5 Unified Account System | `gudbro_user_profiles` → `accounts`, `merchant_users.user_id` non più usato per RLS |

---

## Checklist Pre-Migration

Prima di scrivere una nuova migration:

- [ ] Ho letto DATABASE-SCHEMA.md?
- [ ] Le tabelle che referenzio esistono?
- [ ] Uso `accounts` (non `gudbro_user_profiles`)?
- [ ] Le RLS usano `account_roles` (non `merchant_users.user_id`)?
- [ ] Ho verificato le FK con tabelle esistenti?

---

**File**: `docs/DATABASE-SCHEMA.md`
**Maintainer**: Aggiornare dopo ogni migration eseguita
