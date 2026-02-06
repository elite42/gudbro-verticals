# DATABASE SCHEMA - Source of Truth

> **IMPORTANTE**: Questo file documenta lo schema ATTUALE del database Supabase.
> Consultalo SEMPRE prima di scrivere migration o modificare tabelle.
>
> **Last Updated**: 2026-02-06
> **Last Migration Executed**: 102-fix-orders-rls-session-merchant.sql
> **Total Tables**: ~130 (including materialized views and cold storage)

---

## Quick Reference: Tabelle Principali

| Tabella                                  | Sistema         | Migration | Descrizione                                        |
| ---------------------------------------- | --------------- | --------- | -------------------------------------------------- |
| **P5 Unified Account**                   |                 |           |                                                    |
| `accounts`                               | P5              | 001-018   | Account utente unificato (consumer/merchant/admin) |
| `account_roles`                          | P5              | 001-018   | Ruoli associati ad account                         |
| `health_profiles`                        | P5              | 001-018   | Profilo salute 5 dimensioni                        |
| **Core**                                 |                 |           |                                                    |
| `merchants`                              | Core            | base      | Merchant/ristoranti                                |
| `locations`                              | Core            | base      | Sedi fisiche dei merchant                          |
| **Hot Actions**                          |                 |           |                                                    |
| `hot_action_types`                       | Hot Actions     | 023       | Tipi di azioni rapide                              |
| `hot_action_requests`                    | Hot Actions     | 023       | Richieste dai clienti                              |
| **Followers & Feedback**                 |                 |           |                                                    |
| `merchant_followers`                     | Followers       | 024       | Utenti che seguono merchant                        |
| `follower_analytics`                     | Followers       | 024       | Metriche per follower                              |
| `customer_feedback`                      | Feedback        | 024       | Rating, review, suggestions                        |
| **AI Co-Manager**                        |                 |           |                                                    |
| `ai_usage_logs`                          | AI Co-Manager   | 027       | Log utilizzo AI per billing                        |
| `ai_conversations`                       | AI Co-Manager   | 027       | Chat history AI                                    |
| `ai_merchant_preferences`                | AI Co-Manager   | 027       | Preferenze AI per merchant                         |
| `ai_sessions`                            | AI Co-Manager   | 027       | Sessioni chat AI                                   |
| `ai_daily_briefings`                     | AI Proactivity  | 028       | Briefing giornalieri AI                            |
| `ai_alerts`                              | AI Proactivity  | 028       | Alert proattivi AI                                 |
| `ai_suggestions`                         | AI Proactivity  | 028       | Suggerimenti AI                                    |
| `ai_feedback`                            | AI Feedback     | 029       | Feedback merchant su AI                            |
| `ai_feedback_responses`                  | AI Feedback     | 029       | Risposte GudBro team                               |
| `ai_zone_analysis`                       | AI Bootstrap    | 030       | Analisi zona/location                              |
| `ai_competitor_profiles`                 | AI Bootstrap    | 030       | Profili competitor                                 |
| `ai_bootstrap_results`                   | AI Bootstrap    | 030       | Risultati setup automatico                         |
| `ai_price_comparisons`                   | AI Market Intel | 031       | Confronto prezzi vs mercato                        |
| `ai_partnership_opportunities`           | AI Market Intel | 031       | Opportunita partnership                            |
| `ai_market_trends`                       | AI Market Intel | 031       | Trend di mercato                                   |
| `ai_social_posts`                        | AI Social Media | 032       | Post social generati                               |
| `ai_content_calendars`                   | AI Social Media | 032       | Calendari contenuti                                |
| `ai_financial_summaries`                 | AI Financial    | 033       | P&L e revenue tracking                             |
| `ai_budget_plans`                        | AI Financial    | 033       | Budget allocations                                 |
| `ai_cash_flow_forecasts`                 | AI Financial    | 033       | Previsioni cash flow                               |
| `ai_delegated_tasks`                     | AI Task Deleg.  | 034       | Task create da AI per staff                        |
| `ai_task_templates`                      | AI Task Deleg.  | 034       | Template task riutilizzabili                       |
| `ai_workflow_definitions`                | AI Workflows    | 035       | Definizioni workflow multi-step                    |
| `ai_workflow_executions`                 | AI Workflows    | 035       | Esecuzioni workflow                                |
| `ai_suppliers`                           | AI Inventory    | 036       | Directory fornitori                                |
| `ai_inventory_items`                     | AI Inventory    | 036       | Stock items tracking                               |
| `ai_purchase_orders`                     | AI Inventory    | 036       | Ordini acquisto                                    |
| **Staff Management**                     |                 |           |                                                    |
| `location_team_settings`                 | Staff Mgmt      | 038       | Settings team per location                         |
| `staff_profiles`                         | Staff Mgmt      | 038       | Profili staff pubblici                             |
| `staff_reviews`                          | Staff Mgmt      | 038       | Review clienti su staff                            |
| `staff_weekly_recognition`               | Staff Mgmt      | 038       | Riconoscimenti settimanali                         |
| **QR Codes**                             |                 |           |                                                    |
| `qr_codes`                               | QR Codes        | 042       | QR codes per merchant (URL o WiFi)                 |
| `qr_scans`                               | QR Codes        | 042       | Analytics tracking scansioni QR                    |
| **Payments**                             |                 |           |                                                    |
| `merchant_payment_settings`              | Payments        | 043       | Config pagamenti fiat + crypto per merchant        |
| `crypto_order_payments`                  | Payments        | 043       | Pagamenti crypto per ordini                        |
| `supported_cryptocurrencies`             | Payments        | 043       | Crypto supportate (reference table)                |
| **Social Links**                         |                 |           |                                                    |
| `merchant_social_links`                  | Social          | 044       | Link social media per merchant                     |
| **AI Intelligence (Extended)**           |                 |           |                                                    |
| `ai_customer_intelligence`               | AI Zone Intel   | 045       | Customer intelligence profiles                     |
| `ai_zone_profiles`                       | AI Zone Intel   | 045       | Zone profile data per location                     |
| `ai_merchant_knowledge`                  | AI Zone Intel   | 045       | Merchant knowledge base                            |
| `ai_customer_triggers`                   | AI Zone Intel   | 045       | Customer trigger definitions                       |
| `ai_customer_trigger_executions`         | AI Zone Intel   | 045       | Trigger execution tracking                         |
| `ai_trigger_budgets`                     | AI Zone Intel   | 046       | Budget management per trigger                      |
| **Weather Intelligence**                 |                 |           |                                                    |
| `location_weather_cache`                 | Weather         | 047       | Weather data cache per location                    |
| `weather_business_correlations`          | Weather         | 047       | Weather-business correlation data                  |
| `weather_triggers`                       | Weather         | 047       | Weather-based trigger definitions                  |
| `weather_trigger_executions`             | Weather         | 047       | Weather trigger execution log                      |
| **AI Learning**                          |                 |           |                                                    |
| `ai_learning_progress`                   | AI Learning     | 048       | AI autonomy learning progress                      |
| `ai_learning_milestones`                 | AI Learning     | 048       | Learning milestone achievements                    |
| `ai_autonomy_audit_log`                  | AI Learning     | 048       | AI autonomy decisions audit trail                  |
| **Tourism B2B**                          |                 |           |                                                    |
| `tour_operators`                         | Tourism B2B     | 049       | Tour operator directory                            |
| `tourist_pois`                           | Tourism B2B     | 049       | Points of interest                                 |
| `accommodation_partners`                 | Tourism B2B     | 049       | Accommodation partners directory                   |
| `merchant_tour_operator_outreach`        | Tourism B2B     | 049       | Outreach to tour operators                         |
| `merchant_accommodation_outreach`        | Tourism B2B     | 049       | Outreach to accommodations                         |
| `partner_feedback`                       | Tourism B2B     | 049       | B2B partner feedback                               |
| `ai_booking_config`                      | Tourism B2B     | 049       | AI booking configuration                           |
| `group_booking_requests`                 | Tourism B2B     | 049       | Group booking requests                             |
| `booking_performance_history`            | Tourism B2B     | 049       | Booking performance metrics                        |
| `tourism_product_templates`              | Tourism B2B     | 049       | Templates for tourism products                     |
| `merchant_tourism_products`              | Tourism B2B     | 049       | Merchant tourism product offerings                 |
| **B2B Conventions**                      |                 |           |                                                    |
| `office_partners`                        | B2B Conventions | 050       | Office/corporate partners                          |
| `merchant_office_outreach`               | B2B Conventions | 050       | Outreach to offices                                |
| `partner_conventions`                    | B2B Conventions | 050       | Convention agreements with partners                |
| `convention_vouchers`                    | B2B Conventions | 050       | Vouchers from conventions                          |
| `convention_redemptions`                 | B2B Conventions | 050       | Voucher redemption tracking                        |
| **Holidays**                             |                 |           |                                                    |
| `holidays`                               | Holidays        | 051       | Global holidays database                           |
| `merchant_holiday_overrides`             | Holidays        | 051       | Merchant-specific holiday overrides                |
| `merchant_custom_holidays`               | Holidays        | 051       | Custom holidays per merchant                       |
| **Custom Domains**                       |                 |           |                                                    |
| `domain_verifications`                   | Domains         | 052       | Domain verification records                        |
| `domain_blacklist`                       | Domains         | 052       | Blacklisted domain names                           |
| `subscription_plan_limits`               | Domains         | 052       | Plan limits (features per plan)                    |
| **Reservations**                         |                 |           |                                                    |
| `location_sections`                      | Reservations    | 053       | Areas within a location (terrace, VIP, etc.)       |
| `location_tables`                        | Reservations    | 053       | Individual tables within sections                  |
| `reservation_settings`                   | Reservations    | 054       | Per-location reservation configuration             |
| `reservations`                           | Reservations    | 054       | Core reservation records                           |
| `reservation_table_assignments`          | Reservations    | 054       | Many-to-many table assignments                     |
| `reservation_history`                    | Reservations    | 054       | Audit trail for reservation changes                |
| `blocked_slots`                          | Reservations    | 054       | Blocked time slots/tables/days                     |
| **Reservation Notifications**            |                 |           |                                                    |
| `notification_channel_preferences`       | Notifications   | 055       | Per-location channel preferences                   |
| `notification_templates`                 | Notifications   | 055       | Multi-language notification templates              |
| `reservation_notifications`              | Notifications   | 055       | Reservation notification records                   |
| `notification_queue`                     | Notifications   | 055/059   | Async notification delivery queue                  |
| **Customer Chat**                        |                 |           |                                                    |
| `customer_conversations`                 | Chat            | 057       | Customer chat conversations                        |
| `customer_messages`                      | Chat            | 057       | Individual messages in conversations               |
| `customer_ai_preferences`                | Chat            | 057       | Customer AI chat preferences                       |
| `conversation_escalations`               | Chat            | 057       | Chat escalation to human staff                     |
| `chat_quick_replies`                     | Chat            | 057       | Pre-configured quick reply options                 |
| `chat_analytics_daily`                   | Chat            | 057       | Daily chat analytics aggregates                    |
| **Analytics**                            |                 |           |                                                    |
| `analytics_events_partitioned`           | Analytics       | 060       | Partitioned analytics events (by month)            |
| `analytics_daily_aggregates`             | Analytics       | 061       | Daily aggregated analytics                         |
| `order_timing_daily_aggregates`          | Analytics       | 076       | Daily order timing aggregates                      |
| **Cold Storage (Archive)**               |                 |           |                                                    |
| `cold_storage.analytics_events_archive`  | Archive         | 063       | Archived analytics events                          |
| `cold_storage.orders_archive`            | Archive         | 063       | Archived orders                                    |
| `cold_storage.customer_messages_archive` | Archive         | 063       | Archived customer messages                         |
| **Audit & Security**                     |                 |           |                                                    |
| `audit_logs`                             | Audit           | 064       | Security audit trail for all actions               |
| `passkeys`                               | Security        | 065       | WebAuthn/Passkey credentials                       |
| `passkey_challenges`                     | Security        | 065       | Ephemeral WebAuthn challenges (5 min TTL)          |
| `account_totp_secrets`                   | Security        | 067       | TOTP 2FA secrets per account                       |
| `account_2fa_sessions`                   | Security        | 067       | Active 2FA sessions                                |
| **Site Customization**                   |                 |           |                                                    |
| `site_sections`                          | Customization   | 068       | Custom site sections per merchant                  |
| **Gift Cards, Promos & Coupons**         |                 |           |                                                    |
| `gift_card_settings`                     | Discounts       | 069       | Per-merchant gift card configuration               |
| `gift_card_presets`                      | Discounts       | 069       | Suggested gift card amounts                        |
| `gift_cards`                             | Discounts       | 069       | Individual gift cards with redemption tracking     |
| `promo_codes`                            | Discounts       | 069       | Marketing promo codes with usage limits            |
| `promo_code_redemptions`                 | Discounts       | 069       | Promo code usage tracking per order                |
| `coupon_templates`                       | Discounts       | 069       | Templates for generating personalized coupons      |
| `coupons`                                | Discounts       | 069       | Individual coupons issued to customers             |
| `order_discounts`                        | Discounts       | 069       | Unified tracking of all order discounts            |
| `discount_stacking_rules`                | Discounts       | 069       | Per-merchant discount combination rules            |
| **Tips & Charges**                       |                 |           |                                                    |
| `tip_distribution_settings`              | Tips            | 071       | Tip distribution configuration                     |
| `tip_pool_members`                       | Tips            | 071       | Staff members in tip pools                         |
| `tip_pool_periods`                       | Tips            | 071       | Tip pool calculation periods                       |
| `tip_allocations`                        | Tips            | 071       | Individual tip allocations to staff                |
| `order_sessions`                         | Tips            | 071       | Session grouping for multi-order tables            |
| `merchant_charges`                       | Charges         | 072       | Configurable charges (cover, service, etc.)        |
| `order_charges`                          | Charges         | 072       | Charges applied to specific orders                 |
| **Useful Numbers**                       |                 |           |                                                    |
| `emergency_numbers`                      | Useful Numbers  | 073       | Emergency numbers by country                       |
| `city_useful_numbers`                    | Useful Numbers  | 073       | Useful numbers by city                             |
| `merchant_useful_numbers`                | Useful Numbers  | 073       | Custom merchant useful numbers                     |
| `useful_numbers_reports`                 | Useful Numbers  | 073       | Correction/update reports                          |
| **Order Timing**                         |                 |           |                                                    |
| `order_item_status_history`              | Order Timing    | 074       | Timing history per order item status change        |
| **Accommodations**                       |                 |           |                                                    |
| `accom_properties`                       | Accommodations  | 077+      | Properties (hotels, apartments, hostels)           |
| `accom_rooms`                            | Accommodations  | 077+      | Rooms within a property                            |
| `accom_bookings`                         | Accommodations  | 077+      | Guest bookings with BK-XXXXXX codes                |
| `accom_service_categories`               | Accommodations  | 077+      | Dynamic service categories per property            |
| `accom_service_items`                    | Accommodations  | 077+      | Service items within categories                    |
| `accom_service_translations`             | Accommodations  | 077       | Multi-language service translations                |
| `accom_service_orders`                   | Accommodations  | 083       | Service order header with payment tracking         |
| `accom_service_order_items`              | Accommodations  | 083       | Service order line items with snapshot pricing     |
| `accom_room_blocks`                      | Accommodations  | 085       | Manual room blocks (maintenance, etc.)             |
| `accom_seasonal_pricing`                 | Accommodations  | 085       | Seasonal/dynamic room pricing overrides            |
| `accom_deals`                            | Accommodations  | 087       | Property deals/promotions                          |
| `accom_deal_clicks`                      | Accommodations  | 087       | Deal click tracking analytics                      |
| `accom_email_logs`                       | Accommodations  | 087       | Property email communication logs                  |
| `accom_guest_documents`                  | Accommodations  | 091       | Guest document storage (passport, visa)            |
| `accom_guest_feedback`                   | Accommodations  | 097       | Guest feedback and ratings                         |
| `accom_checkout_requests`                | Accommodations  | 100       | Checkout/extension requests from guests            |
| **Feedback Intelligence**                |                 |           |                                                    |
| `fb_submissions`                         | Feedback Intel  | 082       | Raw merchant feedback submissions                  |
| `fb_tasks`                               | Feedback Intel  | 082       | Aggregated tasks from similar submissions          |
| `fb_merchant_notifications`              | Feedback Intel  | 082       | Notifications for feedback updates                 |

### Materialized Views

| View                    | Sistema   | Migration | Descrizione                           |
| ----------------------- | --------- | --------- | ------------------------------------- |
| `mv_analytics_daily`    | Analytics | 061       | Daily analytics aggregates            |
| `mv_top_items_30d`      | Analytics | 061       | Top items in last 30 days             |
| `mv_hourly_traffic`     | Analytics | 061       | Hourly traffic patterns               |
| `mv_device_breakdown`   | Analytics | 061       | Device type breakdown                 |
| `mv_prep_time_summary`  | Analytics | 075       | Preparation time summary per location |
| `mv_prep_time_hourly`   | Analytics | 075       | Hourly preparation time patterns      |
| `mv_item_prep_time_30d` | Analytics | 075       | Item prep times last 30 days          |

### Views

| View                      | Sistema  | Migration | Descrizione                        |
| ------------------------- | -------- | --------- | ---------------------------------- |
| `v_shard_distribution`    | Sharding | 062       | Shard distribution statistics      |
| `v_archive_stats`         | Archive  | 063       | Archive size and row count stats   |
| `v_recent_audit_activity` | Audit    | 064       | Recent audit activity summary      |
| `my_passkeys`             | Security | 065       | Current user's registered passkeys |

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

## QR Codes System (Migration 042)

### qr_codes

```sql
CREATE TABLE qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

    type TEXT NOT NULL DEFAULT 'url' CHECK (type IN ('url', 'wifi')),
    short_code VARCHAR(12) UNIQUE,
    destination_url TEXT,
    use_short_url BOOLEAN DEFAULT false,
    context TEXT CHECK (context IN ('table', 'external', 'takeaway', 'delivery')),
    source TEXT,                           -- google_maps, instagram, facebook, event, flyer, table
    table_number INTEGER,
    event_id UUID REFERENCES events(id),

    -- WiFi Info
    wifi_ssid VARCHAR(64),
    wifi_password VARCHAR(128),
    wifi_security TEXT CHECK (wifi_security IN ('WPA', 'WEP', 'nopass')),
    wifi_hidden BOOLEAN DEFAULT false,

    title VARCHAR(120),
    description TEXT,
    design JSONB DEFAULT '{}',

    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ,
    max_scans INTEGER,
    total_scans INTEGER DEFAULT 0,
    last_scanned_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

### qr_scans

```sql
CREATE TABLE qr_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    qr_code_id UUID NOT NULL REFERENCES qr_codes(id) ON DELETE CASCADE,

    ip_address INET,
    user_agent TEXT,
    device_type TEXT,                      -- mobile, tablet, desktop
    os TEXT,
    browser TEXT,
    country TEXT,
    city TEXT,

    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    referer TEXT,

    scanned_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Payment System (Migrations 043, 070-072)

### merchant_payment_settings

```sql
CREATE TABLE merchant_payment_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL UNIQUE REFERENCES merchants(id) ON DELETE CASCADE,

    -- Fiat: Stripe, PayPal, Mobile Pay, VietQR, MoMo, ZaloPay
    stripe_enabled BOOLEAN DEFAULT FALSE,
    stripe_account_id TEXT,
    stripe_public_key TEXT,
    paypal_enabled BOOLEAN DEFAULT FALSE,
    apple_pay_enabled BOOLEAN DEFAULT FALSE,
    google_pay_enabled BOOLEAN DEFAULT FALSE,
    vietqr_enabled BOOLEAN DEFAULT FALSE,
    vietqr_bank_code TEXT,
    vietqr_account_number TEXT,
    vietqr_account_name TEXT,
    momo_enabled BOOLEAN DEFAULT FALSE,
    momo_phone TEXT,
    zalopay_enabled BOOLEAN DEFAULT FALSE,

    -- Crypto
    crypto_enabled BOOLEAN DEFAULT FALSE,
    crypto_wallets JSONB DEFAULT '{}',
    crypto_show_prices_in_menu BOOLEAN DEFAULT FALSE,
    crypto_payment_timeout_minutes INTEGER DEFAULT 30,
    crypto_price_buffer_percent DECIMAL(5,2) DEFAULT 0.5,
    crypto_gateway_enabled BOOLEAN DEFAULT FALSE,
    crypto_gateway_provider TEXT,
    crypto_auto_convert_to_fiat BOOLEAN DEFAULT FALSE,

    -- Tax & Tips (added by 070)
    tax_enabled BOOLEAN DEFAULT FALSE,
    tax_rate_percent DECIMAL(5,2) DEFAULT 0,
    tax_name TEXT DEFAULT 'VAT',
    tax_included_in_price BOOLEAN DEFAULT TRUE,
    tip_enabled BOOLEAN DEFAULT FALSE,
    tip_options JSONB DEFAULT '[5, 10, 15, 20]',
    service_charge_enabled BOOLEAN DEFAULT FALSE,
    service_charge_percent DECIMAL(5,2) DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

### crypto_order_payments

```sql
CREATE TABLE crypto_order_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,

    cryptocurrency TEXT NOT NULL,
    network TEXT NOT NULL,
    wallet_address TEXT NOT NULL,

    crypto_amount DECIMAL(20,8) NOT NULL,
    crypto_amount_display TEXT,
    fiat_amount DECIMAL(12,2) NOT NULL,
    fiat_currency TEXT NOT NULL DEFAULT 'EUR',
    exchange_rate DECIMAL(20,8),
    exchange_rate_source TEXT DEFAULT 'coingecko',
    exchange_rate_timestamp TIMESTAMPTZ,

    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'submitted', 'confirmed', 'completed', 'expired', 'failed', 'cancelled'
    )),

    tx_hash TEXT,
    block_explorer_url TEXT,
    customer_wallet_address TEXT,
    customer_session_id TEXT,

    expires_at TIMESTAMPTZ NOT NULL,
    submitted_at TIMESTAMPTZ,
    confirmed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    staff_notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

### supported_cryptocurrencies

```sql
CREATE TABLE supported_cryptocurrencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol TEXT NOT NULL UNIQUE,           -- BTC, ETH, SOL, etc.
    name TEXT NOT NULL,
    network TEXT NOT NULL,
    icon_url TEXT,
    color TEXT,
    address_regex TEXT,
    address_example TEXT,
    explorer_name TEXT NOT NULL,
    explorer_tx_url_template TEXT NOT NULL,
    explorer_address_url_template TEXT,
    coingecko_id TEXT,
    decimals INTEGER DEFAULT 8,
    min_confirmations INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- Seeded with: BTC, ETH, USDC, USDT, SOL, TON, BNB
```

### tip_distribution_settings (071)

```sql
CREATE TABLE tip_distribution_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL UNIQUE REFERENCES locations(id) ON DELETE CASCADE,
    distribution_method TEXT NOT NULL DEFAULT 'equal',  -- equal, weighted, role_based, hybrid
    pool_frequency TEXT NOT NULL DEFAULT 'daily',       -- daily, weekly, biweekly, monthly
    auto_distribute BOOLEAN DEFAULT FALSE,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### merchant_charges (072)

```sql
CREATE TABLE merchant_charges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    name_translations JSONB DEFAULT '{}',
    charge_type TEXT NOT NULL CHECK (charge_type IN ('cover', 'service', 'delivery', 'packaging', 'custom')),
    calculation TEXT NOT NULL CHECK (calculation IN ('fixed', 'percent', 'per_person')),
    amount INTEGER NOT NULL DEFAULT 0,       -- cents or basis points
    is_mandatory BOOLEAN DEFAULT TRUE,
    applies_to TEXT DEFAULT 'all',            -- all, dine_in, delivery, takeaway
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Reservations System (Migrations 053-055)

### location_sections

```sql
CREATE TABLE location_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    name_translations JSONB DEFAULT '{}',
    code TEXT NOT NULL,
    description TEXT,
    max_capacity INTEGER NOT NULL DEFAULT 0,
    default_covers_per_table INTEGER DEFAULT 4,
    section_type TEXT NOT NULL DEFAULT 'indoor' CHECK (section_type IN (
        'indoor', 'outdoor', 'semi_outdoor', 'private', 'bar', 'terrace', 'garden'
    )),
    amenities JSONB DEFAULT '[]',
    weather_dependent BOOLEAN DEFAULT FALSE,
    is_reservable BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    floor_plan_config JSONB DEFAULT '{}',
    color_hex TEXT DEFAULT '#3B82F6',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(location_id, code)
);
```

### location_tables

```sql
CREATE TABLE location_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    section_id UUID REFERENCES location_sections(id) ON DELETE SET NULL,
    table_number TEXT NOT NULL,
    display_name TEXT,
    min_capacity INTEGER NOT NULL DEFAULT 1,
    max_capacity INTEGER NOT NULL DEFAULT 4,
    optimal_capacity INTEGER NOT NULL DEFAULT 2,
    table_shape TEXT DEFAULT 'rectangular',
    table_size TEXT DEFAULT 'standard',
    is_combinable BOOLEAN DEFAULT TRUE,
    combine_with JSONB DEFAULT '[]',
    features JSONB DEFAULT '[]',
    priority INTEGER DEFAULT 50 CHECK (priority >= 0 AND priority <= 100),
    is_reservable BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    floor_plan_config JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(location_id, table_number)
);
```

### reservations

```sql
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    reservation_code TEXT NOT NULL UNIQUE,  -- Auto-generated: RES-YYMMDD-XXXXX
    account_id UUID REFERENCES accounts(id),
    guest_name TEXT NOT NULL,
    guest_email TEXT,
    guest_phone TEXT,
    guest_locale TEXT DEFAULT 'en',
    party_size INTEGER NOT NULL CHECK (party_size >= 1),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    end_time TIME,
    duration_minutes INTEGER NOT NULL DEFAULT 90,
    section_id UUID REFERENCES location_sections(id),
    table_ids JSONB DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'reminder_sent', 'seated', 'completed', 'cancelled', 'no_show'
    )),
    source TEXT NOT NULL DEFAULT 'website' CHECK (source IN (
        'website', 'phone', 'walk_in', 'partner', 'google', 'backoffice'
    )),
    occasion TEXT,
    special_requests TEXT,
    dietary_requirements JSONB DEFAULT '[]',
    deposit_status TEXT DEFAULT 'not_required',
    deposit_amount DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    internal_notes TEXT,
    tags JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    confirmed_at TIMESTAMPTZ,
    seated_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT
);
```

---

## Customer Chat System (Migration 057)

### customer_conversations

```sql
CREATE TABLE customer_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id),
    account_id UUID REFERENCES accounts(id),
    session_id TEXT,
    status TEXT NOT NULL DEFAULT 'active',      -- active, resolved, escalated, archived
    channel TEXT NOT NULL DEFAULT 'web',         -- web, whatsapp, telegram
    language TEXT DEFAULT 'en',
    ai_enabled BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### customer_messages

```sql
CREATE TABLE customer_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES customer_conversations(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('customer', 'ai', 'staff')),
    sender_id UUID,
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text',     -- text, image, quick_reply, card
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Analytics & Performance (Migrations 060-061, 075-076)

### analytics_events_partitioned (060)

```sql
-- Range-partitioned by month on created_at
CREATE TABLE analytics_events_partitioned (
    id UUID DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL,
    location_id UUID,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    session_id TEXT,
    device_type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);
-- Auto-created monthly partitions
```

### analytics_daily_aggregates (061)

```sql
CREATE TABLE analytics_daily_aggregates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    location_id UUID REFERENCES locations(id),
    agg_date DATE NOT NULL,
    total_views BIGINT DEFAULT 0,
    unique_sessions BIGINT DEFAULT 0,
    total_orders BIGINT DEFAULT 0,
    total_revenue BIGINT DEFAULT 0,
    avg_order_value NUMERIC(10,2) DEFAULT 0,
    top_items JSONB DEFAULT '[]',
    device_breakdown JSONB DEFAULT '{}',
    peak_hour INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(merchant_id, location_id, agg_date)
);
```

### Cold Storage (063)

```sql
-- Schema for archived data with retention policies
CREATE SCHEMA IF NOT EXISTS cold_storage;

CREATE TABLE cold_storage.analytics_events_archive (LIKE analytics_events INCLUDING ALL);
CREATE TABLE cold_storage.orders_archive (LIKE orders INCLUDING ALL);
CREATE TABLE cold_storage.customer_messages_archive (LIKE customer_messages INCLUDING ALL);
-- Each with archived_at TIMESTAMPTZ and archive_reason TEXT columns
```

### Sharding Preparation (062)

```sql
-- Adds shard_id column (computed via consistent hashing) to high-volume tables:
-- orders, analytics_events, menu_items, menu_categories, customer_messages, customer_conversations
-- Function: assign_shard(merchant_id UUID, num_shards INTEGER) RETURNS INTEGER
```

---

## Audit & Security (Migrations 064-065, 067)

### audit_logs (064)

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    user_email TEXT,
    user_role TEXT,
    action TEXT NOT NULL,                  -- auth.login, menu.item_create, order.status_change, etc.
    resource_type TEXT,
    resource_id UUID,
    changes JSONB,                         -- { field: { old: X, new: Y } }
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    request_id TEXT,
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### passkeys (065)

```sql
CREATE TABLE passkeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    credential_id TEXT UNIQUE NOT NULL,    -- Base64URL encoded WebAuthn credential ID
    public_key TEXT NOT NULL,              -- Base64URL encoded COSE public key
    counter BIGINT NOT NULL DEFAULT 0,     -- Signature counter (replay protection)
    device_type TEXT CHECK (device_type IN ('platform', 'cross-platform')),
    transports TEXT[],                     -- 'internal', 'hybrid', 'usb', 'ble', 'nfc'
    friendly_name TEXT,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### passkey_challenges (065)

```sql
CREATE TABLE passkey_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge TEXT NOT NULL,               -- Base64URL encoded random challenge
    account_id UUID REFERENCES accounts(id),
    challenge_type TEXT NOT NULL CHECK (challenge_type IN ('registration', 'authentication')),
    expires_at TIMESTAMPTZ NOT NULL,       -- 5 minute TTL
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### account_totp_secrets (067)

```sql
CREATE TABLE account_totp_secrets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
    encrypted_secret TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    recovery_codes TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    verified_at TIMESTAMPTZ
);
```

### account_2fa_sessions (067)

```sql
CREATE TABLE account_2fa_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    verified BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Site Customization (Migration 068)

### site_sections

```sql
CREATE TABLE site_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    section_type TEXT NOT NULL,             -- hero, features, gallery, testimonials, etc.
    title TEXT,
    content JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Gift Cards, Promos & Coupons (Migration 069)

### gift_cards

```sql
CREATE TABLE gift_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    code TEXT NOT NULL UNIQUE,              -- GIFT-XXXX-XXXX (auto-generated)
    amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
    currency TEXT NOT NULL DEFAULT 'EUR',
    purchaser_account_id UUID REFERENCES accounts(id),
    purchaser_email TEXT,
    recipient_email TEXT,
    recipient_name TEXT,
    recipient_message TEXT,
    delivery_method TEXT NOT NULL DEFAULT 'email' CHECK (delivery_method IN ('email', 'sms', 'print')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'active', 'redeemed', 'expired', 'cancelled'
    )),
    redeemed_by_account_id UUID REFERENCES accounts(id),
    redeemed_at TIMESTAMPTZ,
    stripe_payment_intent_id TEXT,
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

### promo_codes

```sql
CREATE TABLE promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_item')),
    discount_value INTEGER NOT NULL,
    max_discount_cents INTEGER,
    min_order_cents INTEGER DEFAULT 0,
    max_uses_total INTEGER,
    max_uses_per_customer INTEGER DEFAULT 1,
    current_uses INTEGER DEFAULT 0,
    first_order_only BOOLEAN DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'active',
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ,
    applies_to TEXT NOT NULL DEFAULT 'all',
    applicable_category_ids UUID[] DEFAULT '{}',
    applicable_product_ids UUID[] DEFAULT '{}',
    is_stackable BOOLEAN DEFAULT FALSE,
    campaign_name TEXT,
    campaign_source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(merchant_id, code)
);
```

### coupons

```sql
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES coupon_templates(id),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    code TEXT NOT NULL UNIQUE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    discount_type TEXT NOT NULL,
    discount_value INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired', 'revoked')),
    valid_until TIMESTAMPTZ NOT NULL,
    redeemed_at TIMESTAMPTZ,
    redeemed_order_id UUID,
    discount_applied_cents INTEGER,
    issue_reason TEXT,
    issued_by UUID REFERENCES accounts(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

---

## Useful Numbers System (Migration 073)

### emergency_numbers

```sql
CREATE TABLE emergency_numbers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_code TEXT NOT NULL,
    service_type TEXT NOT NULL,            -- police, fire, ambulance, etc.
    number TEXT NOT NULL,
    label TEXT NOT NULL,
    label_translations JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(country_code, service_type, number)
);
```

### city_useful_numbers

```sql
CREATE TABLE city_useful_numbers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_code TEXT NOT NULL,
    city TEXT NOT NULL,
    category TEXT NOT NULL,               -- hospital, pharmacy, taxi, embassy, etc.
    name TEXT NOT NULL,
    name_translations JSONB DEFAULT '{}',
    number TEXT NOT NULL,
    address TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    is_active BOOLEAN DEFAULT TRUE,
    verified_at TIMESTAMPTZ
);
```

---

## Order Timing Analytics (Migrations 074-076)

### order_item_status_history (074)

```sql
CREATE TABLE order_item_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_item_id UUID NOT NULL,           -- References order_items(id)
    order_id UUID NOT NULL,                -- References orders(id)
    location_id UUID NOT NULL,
    old_status TEXT,
    new_status TEXT NOT NULL,
    changed_by UUID,
    station TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Also adds to order_items: preparing_at, ready_at, served_at, station columns
```

---

## Accommodations System (Migrations 077-101)

> **Nota**: La tabella `accom_properties` e stata estesa progressivamente attraverso 25 migration (077-101).
> Di seguito la struttura corrente che include TUTTE le colonne aggiunte.

### accom_properties (077 + extensions through 101)

```sql
CREATE TABLE accom_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Identity
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    tagline TEXT,
    property_type TEXT NOT NULL DEFAULT 'apartment',
    type TEXT GENERATED ALWAYS AS (property_type) STORED,  -- alias (081)

    -- Location
    address TEXT,
    city TEXT,
    area TEXT,                             -- neighborhood/area (081)
    country TEXT,                          -- renamed from country_code (081)
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',

    -- Contact (renamed in 081)
    host_name TEXT,
    contact_phone TEXT,                    -- renamed from host_phone
    contact_email TEXT,                    -- renamed from host_email
    contact_whatsapp TEXT,                 -- added 081
    emergency_phone TEXT,

    -- WiFi
    wifi_network TEXT,                     -- renamed from wifi_ssid (081)
    wifi_password TEXT,
    wifi_zones JSONB DEFAULT '[]',         -- multi-zone WiFi (092)

    -- Settings
    currency TEXT NOT NULL DEFAULT 'VND',
    default_language TEXT NOT NULL DEFAULT 'en',
    supported_languages TEXT[] NOT NULL DEFAULT '{"en"}',
    check_in_time TIME NOT NULL DEFAULT '14:00',
    checkout_time TIME NOT NULL DEFAULT '11:00',  -- renamed from check_out_time (081)

    -- Media & content
    images JSONB NOT NULL DEFAULT '[]',
    cover_image TEXT,                      -- renamed from cover_image_url (081)
    amenities JSONB NOT NULL DEFAULT '[]',
    house_rules JSONB DEFAULT '[]',        -- changed TEXT->JSONB (081)

    -- Reviews (081)
    rating NUMERIC(2,1),
    review_count INTEGER DEFAULT 0,

    -- Booking config (083)
    booking_mode TEXT NOT NULL DEFAULT 'inquiry',  -- instant, inquiry, disabled
    accepted_payment_methods TEXT[] NOT NULL DEFAULT '{"cash"}',
    min_nights INTEGER NOT NULL DEFAULT 1,
    max_nights INTEGER,
    cleaning_fee INTEGER DEFAULT 0,
    service_fee_percent NUMERIC(4,2) DEFAULT 0,
    weekly_discount_percent NUMERIC(4,2) DEFAULT 0,
    monthly_discount_percent NUMERIC(4,2) DEFAULT 0,
    cancellation_policy TEXT NOT NULL DEFAULT 'flexible',
    inquiry_timeout_hours INTEGER NOT NULL DEFAULT 24,
    stripe_account_id TEXT,

    -- Deposit config (084)
    deposit_enabled BOOLEAN DEFAULT FALSE,
    deposit_type TEXT DEFAULT 'percentage',
    deposit_value INTEGER DEFAULT 0,

    -- Quick actions (079)
    quick_actions JSONB DEFAULT '[]',
    return_banner_text TEXT,
    return_banner_url TEXT,

    -- F&B Integration (080)
    has_linked_fnb BOOLEAN DEFAULT FALSE,
    linked_fnb_slug TEXT,

    -- Guest verification (089-090)
    guest_verification_method TEXT DEFAULT 'booking_code',
    access_settings JSONB DEFAULT '{}',

    -- Documents (091)
    document_retention_days INTEGER DEFAULT 30,
    document_types_required TEXT[] DEFAULT '{}',

    -- Social & Communication (094)
    social_links JSONB DEFAULT '{}',
    google_maps_url TEXT,
    communication_methods JSONB DEFAULT '[]',
    operating_hours JSONB DEFAULT '{}',
    staff_languages TEXT[] DEFAULT '{}',
    onboarding_progress JSONB DEFAULT '{}',

    -- Concierge (098)
    concierge_sections JSONB DEFAULT '[]',

    -- Receipt config (101)
    receipt_config JSONB DEFAULT '{}',

    -- Ownership
    owner_id UUID NOT NULL REFERENCES accounts(id),

    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### accom_rooms (077 + extensions)

```sql
CREATE TABLE accom_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    room_number TEXT NOT NULL,
    room_type TEXT NOT NULL DEFAULT 'double',
    room_code TEXT UNIQUE,                 -- auto-generated short code (088)
    capacity INTEGER NOT NULL DEFAULT 2,
    floor TEXT,
    description TEXT,

    -- Pricing (083)
    base_price_per_night INTEGER NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'VND',
    images JSONB NOT NULL DEFAULT '[]',
    beds JSONB NOT NULL DEFAULT '[]',

    -- WiFi override (092)
    wifi_ssid_override TEXT,
    wifi_password_override TEXT,

    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(property_id, room_number)
);
```

### accom_bookings (077 + extensions through 101)

```sql
CREATE TABLE accom_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    room_id UUID REFERENCES accom_rooms(id),
    booking_code TEXT NOT NULL UNIQUE,      -- auto-generated BK-XXXXXX
    guest_name TEXT NOT NULL,
    guest_last_name TEXT NOT NULL,
    guest_email TEXT,
    guest_phone TEXT,
    guest_count INTEGER NOT NULL DEFAULT 1,
    guest_country TEXT,                     -- added 079

    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,

    -- Pricing (083)
    price_per_night INTEGER NOT NULL DEFAULT 0,
    num_nights INTEGER NOT NULL DEFAULT 1,
    subtotal INTEGER NOT NULL DEFAULT 0,
    cleaning_fee INTEGER DEFAULT 0,
    service_fee INTEGER DEFAULT 0,
    discount_amount INTEGER DEFAULT 0,
    total_price INTEGER NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'VND',

    -- Payment (083-084)
    payment_method TEXT DEFAULT 'cash',
    payment_status TEXT NOT NULL DEFAULT 'unpaid',  -- unpaid/partial/paid/refunded/pending_payment/payment_failed
    stripe_payment_intent_id TEXT,
    stripe_checkout_session_id TEXT,
    deposit_amount INTEGER DEFAULT 0,
    deposit_paid_at TIMESTAMPTZ,

    -- Communication (083)
    confirmed_via TEXT,
    expires_at TIMESTAMPTZ,

    -- Verification (089)
    verification_pin TEXT,

    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN (
        'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show',
        'pending_payment', 'payment_failed'
    )),
    special_requests TEXT,
    internal_notes TEXT,
    booking_source TEXT NOT NULL DEFAULT 'direct',

    -- Feedback (097)
    checked_out_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (check_out_date > check_in_date),
    -- EXCLUDE constraint prevents double-booking per room (083)
    CONSTRAINT accom_bookings_no_overlap EXCLUDE USING GIST (
        room_id WITH =,
        daterange(check_in_date, check_out_date, '[)') WITH &&
    ) WHERE (status NOT IN ('cancelled', 'no_show'))
);
```

### accom_service_orders (083)

```sql
CREATE TABLE accom_service_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
    room_id UUID REFERENCES accom_rooms(id),

    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'
    )),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN (
        'unpaid', 'paid', 'added_to_bill'
    )),
    total INTEGER NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'VND',
    notes TEXT,

    -- Minibar (096)
    is_minibar_consumption BOOLEAN DEFAULT FALSE,
    owner_confirmed BOOLEAN,

    -- Timing (101)
    confirmed_at TIMESTAMPTZ,
    preparing_at TIMESTAMPTZ,
    ready_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,

    ordered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### accom_service_order_items (083)

```sql
CREATE TABLE accom_service_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES accom_service_orders(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES accom_service_items(id),
    category_tag TEXT,                     -- denormalized category tag (095)
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price INTEGER NOT NULL,
    total INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### accom_room_blocks (085)

```sql
CREATE TABLE accom_room_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES accom_rooms(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL DEFAULT 'maintenance',
    notes TEXT,
    created_by UUID REFERENCES accounts(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (end_date > start_date),
    CONSTRAINT accom_room_blocks_no_overlap EXCLUDE USING GIST (
        room_id WITH =,
        daterange(start_date, end_date, '[)') WITH &&
    )
);
```

### accom_seasonal_pricing (085)

```sql
CREATE TABLE accom_seasonal_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    room_id UUID REFERENCES accom_rooms(id) ON DELETE CASCADE,  -- NULL = all rooms
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_per_night INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'VND',
    priority INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (end_date > start_date),
    CONSTRAINT accom_seasonal_pricing_no_overlap EXCLUDE USING GIST (
        COALESCE(room_id, gen_random_uuid()) WITH =,
        property_id WITH =,
        daterange(start_date, end_date, '[)') WITH &&
    ) WHERE (is_active = TRUE)
);
```

### accom_guest_documents (091)

```sql
CREATE TABLE accom_guest_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,            -- passport, id_card, visa, etc.
    file_path TEXT NOT NULL,               -- Supabase storage path
    file_name TEXT NOT NULL,
    mime_type TEXT,
    file_size INTEGER,
    uploaded_by TEXT DEFAULT 'guest',
    verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES accounts(id),
    expires_at DATE,
    auto_delete_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### accom_guest_feedback (097)

```sql
CREATE TABLE accom_guest_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
    room_id UUID REFERENCES accom_rooms(id),
    overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    cleanliness_rating INTEGER CHECK (cleanliness_rating BETWEEN 1 AND 5),
    comfort_rating INTEGER CHECK (comfort_rating BETWEEN 1 AND 5),
    location_rating INTEGER CHECK (location_rating BETWEEN 1 AND 5),
    service_rating INTEGER CHECK (service_rating BETWEEN 1 AND 5),
    value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
    comment TEXT,
    highlight TEXT,
    improvement TEXT,
    would_recommend BOOLEAN,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'published', 'flagged', 'hidden'
    )),
    ai_summary TEXT,
    ai_sentiment TEXT,
    ai_categories TEXT[],
    owner_response TEXT,
    owner_responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### accom_checkout_requests (100)

```sql
CREATE TABLE accom_checkout_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
    request_type TEXT NOT NULL CHECK (request_type IN ('checkout', 'late_checkout', 'extend')),
    requested_time TIMESTAMPTZ,
    extend_to_date DATE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
    notes TEXT,
    decided_by UUID REFERENCES accounts(id),
    decided_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Key Accommodations Functions

| Function                                   | Description                                            |
| ------------------------------------------ | ------------------------------------------------------ |
| `generate_booking_code()`                  | Generates unique BK-XXXXXX codes                       |
| `set_booking_code()`                       | Trigger: auto-sets booking code on INSERT              |
| `verify_booking_access(code, last_name)`   | SECURITY DEFINER: validates guest access               |
| `generate_room_code()`                     | Generates unique room access codes (088)               |
| `set_room_code()`                          | Trigger: auto-sets room code on INSERT (088)           |
| `resolve_room_access(code)`                | SECURITY DEFINER: resolves room from QR/code (088+)    |
| `find_returning_guest(email, property_id)` | Finds returning guests for personalization (100)       |
| `validate_accommodation_voucher(...)`      | Validates convention vouchers for accommodations (099) |

---

## Feedback Intelligence (Migration 082)

### fb_submissions

```sql
CREATE TABLE fb_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    original_title TEXT,
    original_body TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'manual',  -- manual, chat, email, api
    vertical TEXT,
    page_path TEXT,
    detected_language TEXT,
    translated_title TEXT,
    translated_body TEXT,
    type TEXT,                              -- bug, feature_request, improvement, complaint, praise, operational
    priority INTEGER CHECK (priority BETWEEN 1 AND 5),
    sentiment TEXT,                         -- positive, neutral, negative
    ai_confidence DECIMAL(3,2),
    tags TEXT[] DEFAULT '{}',
    task_id UUID,
    status TEXT NOT NULL DEFAULT 'pending',
    processing_attempts INTEGER NOT NULL DEFAULT 0,
    processing_error TEXT,
    processed_at TIMESTAMPTZ,
    submitted_by_account_id UUID REFERENCES accounts(id),
    screenshot_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### fb_tasks

```sql
CREATE TABLE fb_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,                    -- bug, feature_request, improvement, etc.
    priority INTEGER NOT NULL CHECK (priority BETWEEN 1 AND 5),
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'new',    -- new, reviewing, in_progress, done, rejected
    submission_count INTEGER NOT NULL DEFAULT 1,
    languages TEXT[] DEFAULT '{}',
    avg_sentiment DECIMAL(3,2),
    first_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Migration Status

### Eseguite (in produzione)

| #       | File                                     | Data Esecuzione | Note                                               |
| ------- | ---------------------------------------- | --------------- | -------------------------------------------------- |
| 001-018 | p5-unified-account/\*.sql                | 2026-01-02      | Sistema P5 completo                                |
| 023     | 023-hot-actions.sql                      | 2026-01-04      | Hot Actions system                                 |
| 024     | 024-merchant-followers-feedback.sql      | 2026-01-04      | Followers + Feedback (P5)                          |
| 025     | 025-tourist-lifecycle.sql                | 2026-01-04      | Tourist Lifecycle                                  |
| 026     | 026-food-challenges.sql                  | 2026-01-04      | Food Challenges                                    |
| 027     | 027-ai-comanager.sql                     | 2026-01-05      | AI Co-Manager MVP (chat, usage logs)               |
| 028     | 028-ai-proactivity.sql                   | 2026-01-05      | AI Proactivity (briefings, alerts, suggestions)    |
| 029     | 029-ai-feedback-loop.sql                 | 2026-01-05      | AI Feedback Loop (merchant feedback routing)       |
| 030     | 030-ai-bootstrap.sql                     | 2026-01-05      | AI Bootstrap (zone analysis, competitors)          |
| 031     | 031-ai-market-intelligence.sql           | 2026-01-05      | AI Market Intelligence (pricing, partnerships)     |
| 032     | 032-ai-social-media.sql                  | 2026-01-05      | AI Social Media (posts, content calendar)          |
| 033     | 033-ai-financial.sql                     | 2026-01-05      | AI Financial (P&L, budgets, cash flow)             |
| 034     | 034-ai-task-delegation.sql               | 2026-01-05      | AI Task Delegation (staff tasks)                   |
| 035     | 035-ai-agentic-workflows.sql             | 2026-01-05      | AI Agentic Workflows (multi-step automation)       |
| 036     | 036-ai-inventory-negotiation.sql         | 2026-01-05      | AI Inventory (suppliers, stock, purchase orders)   |
| 037     | 037-ai-rls-fix.sql                       | 2026-01-05      | AI RLS Fix (initial policy corrections)            |
| 038     | 038-staff-management.sql                 | 2026-01-06      | Staff Management (profiles, reviews, recognition)  |
| 039     | 039-fix-function-search-path.sql         | 2026-01-07      | Security: Fix 37 functions search_path             |
| 040     | 040-fix-ai-rls-policies.sql              | 2026-01-07      | Security: AI RLS -> service_role only              |
| 041     | 041-fix-core-rls-policies.sql            | 2026-01-07      | Security: Core RLS, remove dev policies            |
| 042     | 042-qr-codes.sql                         | 2026-01-09      | QR Codes with analytics                            |
| 043     | 043-merchant-payment-settings.sql        | 2026-01-10      | Payment settings (fiat + crypto)                   |
| 044     | 044-merchant-social-links.sql            | 2026-01-10      | Social links per merchant                          |
| 045     | 045-ai-zone-intel.sql                    | 2026-01-11      | AI Customer Intelligence & Zone Profiles           |
| 046     | 046-trigger-budgets-roi.sql              | 2026-01-11      | AI Trigger budgets and ROI                         |
| 047     | 047-weather-intelligence.sql             | 2026-01-12      | Weather Intelligence system                        |
| 048     | 048-ai-learning-progress.sql             | 2026-01-12      | AI Learning & Autonomy                             |
| 049     | 049-tourism-b2b.sql                      | 2026-01-13      | Tourism B2B (operators, POIs, bookings)            |
| 050     | 050-b2b-conventions.sql                  | 2026-01-13      | B2B Conventions (offices, vouchers)                |
| 051     | 051-holidays-database.sql                | 2026-01-14      | Holidays database                                  |
| 052     | 052-custom-domains.sql                   | 2026-01-14      | Custom domains & plan limits                       |
| 053     | 053-reservation-tables.sql               | 2026-01-15      | Reservation sections & tables                      |
| 054     | 054-reservations-core.sql                | 2026-01-15      | Reservations core system                           |
| 055     | 055-reservation-notifications.sql        | 2026-01-15      | Reservation notifications                          |
| 057     | 057-customer-chat.sql                    | 2026-01-16      | Customer chat system                               |
| 058     | 058-performance-indexes.sql              | 2026-01-17      | Performance indexes (no new tables)                |
| 059     | 059-notification-queue.sql               | 2026-01-17      | General notification queue                         |
| 060     | 060-analytics-partitioning.sql           | 2026-01-17      | Analytics events partitioning                      |
| 061     | 061-analytics-materialized-views.sql     | 2026-01-18      | Analytics materialized views                       |
| 062     | 062-sharding-preparation.sql             | 2026-01-18      | Sharding prep (shard_id columns)                   |
| 063     | 063-archive-strategy.sql                 | 2026-01-18      | Cold storage archive schema                        |
| 064     | 064-audit-log.sql                        | 2026-01-18      | Security audit log                                 |
| 065     | 065-passkeys.sql                         | 2026-01-18      | WebAuthn/Passkeys                                  |
| 066     | 066-weather-geo-cache.sql                | 2026-01-19      | Weather geo cache key                              |
| 067     | 067-two-factor-auth.sql                  | 2026-01-19      | TOTP 2FA                                           |
| 068     | 068-site-customization.sql               | 2026-01-19      | Site sections customization                        |
| 069     | 069-gift-cards-promo-coupons.sql         | 2026-01-19      | Gift cards, promo codes, coupons                   |
| 070     | 070-tax-and-tips-settings.sql            | 2026-01-20      | Tax & tips config (ALTER)                          |
| 071     | 071-tip-distribution-system.sql          | 2026-01-20      | Tip distribution & sessions                        |
| 072     | 072-configurable-charges-system.sql      | 2026-01-20      | Configurable merchant charges                      |
| 073     | 073-useful-numbers.sql                   | 2026-01-21      | Emergency & useful numbers                         |
| 074     | 074-order-item-timing-analytics.sql      | 2026-01-22      | Order item timing tracking                         |
| 075     | 075-order-timing-materialized-views.sql  | 2026-01-22      | Prep time materialized views                       |
| 076     | 076-order-timing-aggregates.sql          | 2026-01-22      | Order timing daily aggregates                      |
| 077     | 077-accommodations-schema.sql            | 2026-01-29      | Accommodations base schema                         |
| 078     | 078-accommodations-seed.sql              | 2026-01-29      | Accommodations seed data                           |
| 079     | 079-accommodations-phase6-extensions.sql | 2026-01-29      | Quick actions, return banner, guest country        |
| 080     | 080-accommodations-fnb-integration.sql   | 2026-01-30      | F&B integration link                               |
| 081     | 081-schema-api-alignment.sql             | 2026-01-30      | Column renames for API consistency                 |
| 082     | 082-feedback-intelligence.sql            | 2026-01-30      | Feedback Intelligence pipeline                     |
| 083     | 083-accommodations-v2-foundation.sql     | 2026-01-31      | Service orders, pricing, double-booking prevention |
| 084     | 084-payment-config.sql                   | 2026-01-31      | Deposit config for accommodations                  |
| 085     | 085-calendar-pricing.sql                 | 2026-01-31      | Room blocks & seasonal pricing                     |
| 086     | 086-service-automation-level.sql         | 2026-02-01      | Service category automation levels                 |
| 087     | 087-analytics-deals-communication.sql    | 2026-02-01      | Deals, analytics, email logs                       |
| 088     | 088-room-codes.sql                       | 2026-02-01      | Room access codes & resolve_room_access            |
| 089     | 089-progressive-auth.sql                 | 2026-02-01      | Progressive authentication (browse/verified tiers) |
| 090     | 090-access-settings.sql                  | 2026-02-01      | JSONB access settings config                       |
| 091     | 091-guest-documents.sql                  | 2026-02-01      | Guest document storage                             |
| 092     | 092-multi-zone-wifi.sql                  | 2026-02-01      | Multi-zone WiFi per property                       |
| 093     | 093-owner-dashboard-enhancements.sql     | 2026-02-01      | No-op (documentation only)                         |
| 094     | 094-property-data-onboarding.sql         | 2026-02-01      | Property onboarding fields                         |
| 095     | 095-service-catalog-enhancements.sql     | 2026-02-01      | Service catalog: included_in_rate, category_tag    |
| 096     | 096-minibar-self-service.sql             | 2026-02-02      | Minibar self-service automation                    |
| 097     | 097-accom-guest-feedback.sql             | 2026-02-02      | Guest feedback with AI processing                  |
| 098     | 098-concierge-sections.sql               | 2026-02-02      | Concierge sections JSONB config                    |
| 099     | 099-conventions-benefit-scope.sql        | 2026-02-02      | Convention benefit scope for accommodations        |
| 100     | 100-guest-lifecycle.sql                  | 2026-02-02      | Checkout requests, returning guest detection       |
| 101     | 101-order-performance-receipts.sql       | 2026-02-02      | Order timing columns, receipt config               |
| 102     | 102-fix-orders-rls-session-merchant.sql  | 2026-02-03      | Fix overly permissive orders RLS                   |

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
    |
    +-- account_roles.account_id
    +-- health_profiles.account_id
    +-- merchant_followers.account_id (024)
    +-- follower_analytics.account_id (024)
    +-- customer_feedback.account_id (024)
    +-- hot_action_requests.acknowledged_by / completed_by
    +-- ai_feedback.account_id (029)
    +-- staff_profiles.account_id (038)
    +-- passkeys.account_id (065)
    +-- account_totp_secrets.account_id (067)
    +-- account_2fa_sessions.account_id (067)
    +-- reservations.account_id (054)
    +-- gift_cards.purchaser_account_id / redeemed_by_account_id (069)
    +-- coupons.account_id (069)
    +-- fb_submissions.submitted_by_account_id (082)
    +-- accom_properties.owner_id (077)

merchants
    |
    +-- locations.merchant_id
    +-- account_roles.tenant_id (quando role_type='merchant')
    +-- merchant_followers.merchant_id (024)
    +-- customer_feedback.merchant_id (024)
    +-- [tutte le tabelle ai_*.merchant_id] (027-036)
    +-- qr_codes.merchant_id (042)
    +-- merchant_payment_settings.merchant_id (043)
    +-- crypto_order_payments.merchant_id (043)
    +-- merchant_social_links.merchant_id (044)
    +-- ai_customer_intelligence.merchant_id (045)
    +-- site_sections.merchant_id (068)
    +-- gift_card_settings.merchant_id (069)
    +-- gift_cards.merchant_id (069)
    +-- promo_codes.merchant_id (069)
    +-- coupon_templates.merchant_id (069)
    +-- merchant_charges.merchant_id (072)
    +-- audit_logs.merchant_id (064)
    +-- fb_submissions.merchant_id (082)
    +-- fb_tasks.merchant_id (082)

locations
    |
    +-- hot_action_requests.location_id
    +-- ai_daily_briefings.location_id
    +-- ai_alerts.location_id
    +-- ai_suggestions.location_id
    +-- ai_zone_analysis.location_id (030)
    +-- location_team_settings.location_id (038)
    +-- staff_profiles.location_id (038)
    +-- location_weather_cache.location_id (047)
    +-- location_sections.location_id (053)
    +-- location_tables.location_id (053)
    +-- reservation_settings.location_id (054)
    +-- reservations.location_id (054)
    +-- blocked_slots.location_id (054)
    +-- customer_conversations.location_id (057)
    +-- tip_distribution_settings.location_id (071)

accom_properties (077+)
    |
    +-- accom_rooms.property_id
    +-- accom_bookings.property_id
    +-- accom_service_categories.property_id
    +-- accom_service_items.property_id
    +-- accom_service_orders.property_id (083)
    +-- accom_room_blocks.property_id (085)
    +-- accom_seasonal_pricing.property_id (085)
    +-- accom_deals.property_id (087)
    +-- accom_guest_documents.property_id (091)
    +-- accom_guest_feedback.property_id (097)
    +-- accom_checkout_requests.property_id (100)

accom_bookings (077+)
    |
    +-- accom_service_orders.booking_id (083)
    +-- accom_guest_documents.booking_id (091)
    +-- accom_guest_feedback.booking_id (097)
    +-- accom_checkout_requests.booking_id (100)

reservations (054)
    |
    +-- reservation_table_assignments.reservation_id
    +-- reservation_history.reservation_id

ai_workflow_definitions (035)
    |
    +-- ai_workflow_executions.workflow_id

ai_suppliers (036)
    |
    +-- ai_inventory_items.supplier_id
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
    WHERE mu.user_id = auth.uid()  -- user_id non esiste
    AND mu.merchant_id = <table>.merchant_id
)
```

### Per ottenere account_id dell'utente corrente

```sql
-- CORRETTO (P5)
SELECT id INTO v_account_id FROM accounts WHERE auth_id = auth.uid();

-- SBAGLIATO (vecchio sistema)
-- auth.uid() direttamente come user_id
```

### Per Accommodations (guest access via SECURITY DEFINER)

```sql
-- Guest access bypasses RLS via SECURITY DEFINER functions:
-- verify_booking_access(booking_code, last_name)
-- resolve_room_access(room_code)
-- These run with elevated privileges to check booking validity
-- without exposing raw booking data to anonymous users.
```

### Per EXCLUDE constraints (date range overlap prevention)

```sql
-- Requires: CREATE EXTENSION IF NOT EXISTS btree_gist;
-- Half-open range [) = check-out day is free for new check-in
ALTER TABLE accom_bookings
  ADD CONSTRAINT accom_bookings_no_overlap
  EXCLUDE USING GIST (
    room_id WITH =,
    daterange(check_in_date, check_out_date, '[)') WITH &&
  ) WHERE (status NOT IN ('cancelled', 'no_show'));
```

---

## Breaking Changes Log

| Data       | Cambiamento                    | Impatto                                                                              |
| ---------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| 2026-01-02 | P5 Unified Account System      | `gudbro_user_profiles` -> `accounts`, `merchant_users.user_id` non piu usato per RLS |
| 2026-01-07 | RLS service_role only (040)    | AI tables INSERT/UPDATE richiedono `service_role`, non piu `anon`                    |
| 2026-01-07 | Dev policies removed (041)     | `dev_*` policies rimosse da `events`, `product_recipes`, `staff_reviews`             |
| 2026-01-07 | Function search_path fix (039) | 37 functions ora hanno `search_path = public` per sicurezza                          |
| 2026-01-18 | Sharding prep (062)            | `shard_id` column aggiunto a 6 tabelle high-volume                                   |
| 2026-01-30 | Column renames (081)           | `accom_properties`: wifi_ssid->wifi_network, host_phone->contact_phone, etc.         |
| 2026-01-31 | btree_gist extension (083)     | Required for EXCLUDE constraints (double-booking prevention)                         |
| 2026-02-03 | Orders RLS fix (102)           | Removed overly permissive session-based merchant access on `orders`                  |

---

## Security Fixes (039-041, 102)

> **IMPORTANTE**: Le migrations 039-041 e 102 hanno applicato fix di sicurezza critici.

### 039 - Function Search Path

37 functions aggiornate con `SET search_path = public` per prevenire SQL injection:

- Hot Actions: 8 functions
- Events/Schedule: 6 functions
- AI System: 9 functions
- Trigger functions: 5 functions
- Altri: 9 functions

### 040 - AI RLS Policies

Tutte le tabelle AI ora usano `auth.role() = 'service_role'` invece di `WITH CHECK (true)`:

- Solo il backend (service_role) puo INSERT/UPDATE
- Gli utenti possono solo SELECT i propri dati

### 041 - Core RLS Policies

Rimosse policy pericolose e sostituite con policy sicure:

- `events`: rimossi `dev_update_all`, `dev_write_all`
- `product_recipes`: restrict a `service_role`
- `staff_reviews`: restrict INSERT a `service_role`
- `schedule_overrides`: restrict a `service_role`

### 102 - Orders RLS Fix

Fixed overly permissive RLS on `orders` table:

- Removed session-based merchant access that allowed cross-merchant data exposure
- Tightened policies to use proper P5 account_roles tenant checks

---

## Checklist Pre-Migration

Prima di scrivere una nuova migration:

- [ ] Ho letto DATABASE-SCHEMA.md?
- [ ] Le tabelle che referenzio esistono?
- [ ] Uso `accounts` (non `gudbro_user_profiles`)?
- [ ] Le RLS usano `account_roles` (non `merchant_users.user_id`)?
- [ ] Ho verificato le FK con tabelle esistenti?
- [ ] Le nuove functions hanno `SET search_path = public`?
- [ ] Le RLS per backend usano `auth.role() = 'service_role'`?
- [ ] NON uso `WITH CHECK (true)` per INSERT/UPDATE?
- [ ] Per Accommodations: uso SECURITY DEFINER per guest access?
- [ ] Per date ranges: uso EXCLUDE + btree_gist per overlap prevention?

---

**File**: `docs/reference/DATABASE-SCHEMA.md`
**Maintainer**: Aggiornare dopo ogni migration eseguita
**Last Updated**: 2026-02-06
