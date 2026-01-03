-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 17: PREMIUM SUBSCRIPTIONS & BILLING
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-03
-- Description: Premium consumer subscriptions, merchant billing, Stripe integration
-- ============================================================================

-- ============================================================================
-- 1. SUBSCRIPTION PLANS
-- ============================================================================

CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Plan identity
    plan_code TEXT NOT NULL UNIQUE,
    plan_name TEXT NOT NULL,
    description TEXT,
    
    -- Target
    plan_type TEXT NOT NULL CHECK (plan_type IN (
        'consumer_free',      -- Free tier
        'consumer_premium',   -- €1.50/month
        'merchant_starter',   -- €29/month
        'merchant_standard',  -- €49/month
        'merchant_premium',   -- €99/month
        'merchant_enterprise' -- Custom pricing
    )),
    
    -- Pricing
    price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0,
    price_yearly DECIMAL(10,2),  -- Yearly with discount
    currency TEXT NOT NULL DEFAULT 'EUR',
    
    -- Stripe
    stripe_price_id_monthly TEXT,
    stripe_price_id_yearly TEXT,
    stripe_product_id TEXT,
    
    -- Features (JSONB for flexibility)
    features JSONB NOT NULL DEFAULT '{}',
    /*
    Example:
    {
        "max_locations": 1,
        "max_staff": 3,
        "analytics": "basic",
        "support_level": "email",
        "loyalty_multiplier": 1.0,
        "food_diary": false,
        "personal_analytics": false,
        "priority_support": false,
        "no_ads": false
    }
    */
    
    -- Limits
    max_locations INTEGER DEFAULT 1,
    max_staff_per_location INTEGER DEFAULT 3,
    max_menu_items INTEGER,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_public BOOLEAN DEFAULT TRUE,  -- Show on pricing page
    
    -- Display
    sort_order INTEGER DEFAULT 0,
    badge_text TEXT,  -- "Most Popular", "Best Value"
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert default plans
INSERT INTO subscription_plans (plan_code, plan_name, description, plan_type, price_monthly, price_yearly, features, max_locations, max_staff_per_location, sort_order, badge_text) VALUES
    -- Consumer plans
    ('consumer_free', 'Free', 'Basic access to GudBro', 'consumer_free', 0, 0,
     '{"loyalty_multiplier": 1.0, "food_diary": false, "personal_analytics": false, "priority_support": false, "no_ads": false, "unlimited_referrals": false}',
     NULL, NULL, 1, NULL),
    
    ('consumer_premium', 'Premium', 'Enhanced experience with exclusive features', 'consumer_premium', 1.50, 15.00,
     '{"loyalty_multiplier": 2.0, "food_diary": true, "personal_analytics": true, "priority_support": true, "no_ads": true, "unlimited_referrals": true, "early_access": true}',
     NULL, NULL, 2, 'Best Value'),
    
    -- Merchant plans
    ('merchant_starter', 'Starter', 'Perfect for small venues', 'merchant_starter', 29, 290,
     '{"max_locations": 1, "max_staff": 3, "analytics": "basic", "support_level": "email", "qr_codes": 10, "custom_branding": false, "api_access": false}',
     1, 3, 10, NULL),
    
    ('merchant_standard', 'Standard', 'For growing businesses', 'merchant_standard', 49, 490,
     '{"max_locations": 3, "max_staff": 10, "analytics": "advanced", "support_level": "priority", "qr_codes": 50, "custom_branding": true, "api_access": false}',
     3, 10, 11, 'Most Popular'),
    
    ('merchant_premium', 'Premium', 'Full-featured for established venues', 'merchant_premium', 99, 990,
     '{"max_locations": 10, "max_staff": 50, "analytics": "full", "support_level": "dedicated", "qr_codes": 200, "custom_branding": true, "api_access": true, "white_label": false}',
     10, 50, 12, NULL),
    
    ('merchant_enterprise', 'Enterprise', 'Custom solution for chains', 'merchant_enterprise', 0, 0,
     '{"max_locations": -1, "max_staff": -1, "analytics": "full", "support_level": "dedicated", "qr_codes": -1, "custom_branding": true, "api_access": true, "white_label": true}',
     -1, -1, 13, 'Contact Us')
ON CONFLICT (plan_code) DO NOTHING;

-- ============================================================================
-- 2. CUSTOMER SUBSCRIPTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Who
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    
    -- What plan
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    
    -- Billing cycle
    billing_cycle TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly', 'lifetime')),
    
    -- Stripe
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    
    -- Status
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'trialing',     -- In trial period
        'active',       -- Paid and active
        'past_due',     -- Payment failed, grace period
        'canceled',     -- User canceled, still active until period end
        'expired',      -- Subscription ended
        'paused'        -- Temporarily paused
    )),
    
    -- Dates
    trial_start TIMESTAMPTZ,
    trial_end TIMESTAMPTZ,
    current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_period_end TIMESTAMPTZ NOT NULL,
    canceled_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    
    -- Cancellation
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    cancellation_reason TEXT,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 3. PAYMENT METHODS
-- ============================================================================

CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    
    -- Stripe
    stripe_payment_method_id TEXT NOT NULL UNIQUE,
    
    -- Type
    type TEXT NOT NULL CHECK (type IN ('card', 'sepa_debit', 'paypal', 'crypto')),
    
    -- Card details (masked)
    card_brand TEXT,          -- visa, mastercard, amex
    card_last4 TEXT,          -- 4242
    card_exp_month INTEGER,   -- 12
    card_exp_year INTEGER,    -- 2025
    
    -- SEPA
    sepa_last4 TEXT,
    sepa_bank_code TEXT,
    
    -- Status
    is_default BOOLEAN DEFAULT FALSE,
    is_valid BOOLEAN DEFAULT TRUE,
    
    -- Billing address
    billing_name TEXT,
    billing_email TEXT,
    billing_address JSONB,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. INVOICES & PAYMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Who
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id),
    
    -- Stripe
    stripe_invoice_id TEXT UNIQUE,
    stripe_payment_intent_id TEXT,
    
    -- Invoice details
    invoice_number TEXT NOT NULL UNIQUE,
    
    -- Amounts (in cents)
    subtotal INTEGER NOT NULL,
    tax INTEGER DEFAULT 0,
    total INTEGER NOT NULL,
    amount_paid INTEGER DEFAULT 0,
    amount_due INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'eur',
    
    -- Tax
    tax_rate DECIMAL(5,2),
    tax_type TEXT,  -- 'vat', 'gst', 'sales_tax'
    
    -- Status
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
        'draft',
        'open',
        'paid',
        'void',
        'uncollectible'
    )),
    
    -- Dates
    invoice_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    due_date TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    
    -- PDF
    invoice_pdf_url TEXT,
    hosted_invoice_url TEXT,
    
    -- Billing details
    billing_name TEXT,
    billing_email TEXT,
    billing_address JSONB,
    
    -- Line items
    line_items JSONB DEFAULT '[]',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 5. USAGE TRACKING (for metered billing)
-- ============================================================================

CREATE TABLE IF NOT EXISTS usage_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    
    -- What was used
    usage_type TEXT NOT NULL CHECK (usage_type IN (
        'qr_scans',
        'api_calls',
        'sms_sent',
        'email_sent',
        'storage_gb',
        'staff_seats',
        'locations'
    )),
    
    -- Quantity
    quantity INTEGER NOT NULL DEFAULT 1,
    
    -- Period
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    
    -- Stripe
    stripe_usage_record_id TEXT,
    
    -- Timestamps
    recorded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 6. PROMO CODES & DISCOUNTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Code
    code TEXT NOT NULL UNIQUE,
    
    -- Discount
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percent', 'fixed_amount', 'free_months')),
    discount_value DECIMAL(10,2) NOT NULL,  -- 20 for 20%, 500 for €5, 3 for 3 months
    
    -- Applicability
    applies_to_plans TEXT[],  -- NULL = all plans
    applies_to_billing_cycles TEXT[],  -- ['monthly', 'yearly']
    
    -- Stripe
    stripe_coupon_id TEXT,
    stripe_promotion_code_id TEXT,
    
    -- Limits
    max_redemptions INTEGER,
    times_redeemed INTEGER DEFAULT 0,
    max_redemptions_per_user INTEGER DEFAULT 1,
    
    -- Duration
    duration TEXT NOT NULL DEFAULT 'once' CHECK (duration IN ('once', 'repeating', 'forever')),
    duration_months INTEGER,  -- for 'repeating'
    
    -- Validity
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    campaign_name TEXT,
    created_by UUID REFERENCES accounts(id),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Promo code redemptions
CREATE TABLE IF NOT EXISTS promo_redemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    promo_code_id UUID NOT NULL REFERENCES promo_codes(id),
    account_id UUID NOT NULL REFERENCES accounts(id),
    subscription_id UUID REFERENCES subscriptions(id),
    
    -- Amount saved
    discount_amount INTEGER NOT NULL,  -- in cents
    
    -- Timestamps
    redeemed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    UNIQUE(promo_code_id, account_id, subscription_id)
);

-- ============================================================================
-- 7. CRYPTO PAYMENTS (Optional - Future)
-- ============================================================================

CREATE TABLE IF NOT EXISTS crypto_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES invoices(id),
    
    -- Provider
    provider TEXT NOT NULL CHECK (provider IN ('coinbase_commerce', 'nowpayments', 'btcpay')),
    provider_payment_id TEXT NOT NULL,
    
    -- Crypto details
    cryptocurrency TEXT NOT NULL,  -- BTC, ETH, USDC
    crypto_amount DECIMAL(20,8) NOT NULL,
    crypto_address TEXT,
    
    -- Fiat equivalent
    fiat_amount DECIMAL(10,2) NOT NULL,
    fiat_currency TEXT NOT NULL DEFAULT 'EUR',
    exchange_rate DECIMAL(20,8),
    
    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',
        'confirming',
        'confirmed',
        'failed',
        'expired',
        'refunded'
    )),
    
    -- Blockchain
    tx_hash TEXT,
    confirmations INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    confirmed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ
);

-- ============================================================================
-- 8. BILLING EVENTS LOG
-- ============================================================================

CREATE TABLE IF NOT EXISTS billing_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Related entities
    account_id UUID REFERENCES accounts(id),
    subscription_id UUID REFERENCES subscriptions(id),
    invoice_id UUID REFERENCES invoices(id),
    
    -- Event
    event_type TEXT NOT NULL,
    /*
    Types: subscription_created, subscription_updated, subscription_canceled,
           payment_succeeded, payment_failed, invoice_created, invoice_paid,
           promo_applied, trial_started, trial_ended, plan_upgraded, plan_downgraded
    */
    
    -- Stripe webhook
    stripe_event_id TEXT UNIQUE,
    
    -- Data
    event_data JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 9. INDEXES
-- ============================================================================

-- Subscription plans
CREATE INDEX idx_plans_type ON subscription_plans(plan_type) WHERE is_active = TRUE;
CREATE INDEX idx_plans_public ON subscription_plans(is_public, sort_order) WHERE is_active = TRUE;

-- Subscriptions
CREATE INDEX idx_subscriptions_account ON subscriptions(account_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_period_end ON subscriptions(current_period_end);

-- Payment methods
CREATE INDEX idx_payment_methods_account ON payment_methods(account_id);
CREATE INDEX idx_payment_methods_stripe ON payment_methods(stripe_payment_method_id);

-- Invoices
CREATE INDEX idx_invoices_account ON invoices(account_id);
CREATE INDEX idx_invoices_subscription ON invoices(subscription_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_stripe ON invoices(stripe_invoice_id);

-- Usage records
CREATE INDEX idx_usage_subscription ON usage_records(subscription_id);
CREATE INDEX idx_usage_period ON usage_records(subscription_id, period_start, period_end);

-- Promo codes
CREATE INDEX idx_promo_codes_code ON promo_codes(code) WHERE is_active = TRUE;
CREATE INDEX idx_promo_redemptions ON promo_redemptions(account_id);

-- Billing events
CREATE INDEX idx_billing_events_account ON billing_events(account_id);
CREATE INDEX idx_billing_events_type ON billing_events(event_type);
CREATE INDEX idx_billing_events_stripe ON billing_events(stripe_event_id);

-- ============================================================================
-- 10. HELPER FUNCTIONS
-- ============================================================================

-- Check if account has active premium subscription
CREATE OR REPLACE FUNCTION has_premium_subscription(p_account_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM subscriptions s
        JOIN subscription_plans sp ON sp.id = s.plan_id
        WHERE s.account_id = p_account_id
        AND s.status IN ('active', 'trialing')
        AND sp.plan_type IN ('consumer_premium', 'merchant_standard', 'merchant_premium', 'merchant_enterprise')
        AND s.current_period_end > NOW()
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get account's current subscription
CREATE OR REPLACE FUNCTION get_current_subscription(p_account_id UUID)
RETURNS TABLE(
    subscription_id UUID,
    plan_code TEXT,
    plan_name TEXT,
    plan_type TEXT,
    status TEXT,
    billing_cycle TEXT,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN,
    features JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        sp.plan_code,
        sp.plan_name,
        sp.plan_type,
        s.status,
        s.billing_cycle,
        s.current_period_end,
        s.cancel_at_period_end,
        sp.features
    FROM subscriptions s
    JOIN subscription_plans sp ON sp.id = s.plan_id
    WHERE s.account_id = p_account_id
    AND s.status IN ('active', 'trialing', 'past_due', 'canceled')
    ORDER BY 
        CASE s.status 
            WHEN 'active' THEN 1 
            WHEN 'trialing' THEN 2
            WHEN 'past_due' THEN 3
            ELSE 4 
        END,
        s.current_period_end DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Check feature access
CREATE OR REPLACE FUNCTION has_feature_access(
    p_account_id UUID,
    p_feature TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_features JSONB;
BEGIN
    SELECT sp.features INTO v_features
    FROM subscriptions s
    JOIN subscription_plans sp ON sp.id = s.plan_id
    WHERE s.account_id = p_account_id
    AND s.status IN ('active', 'trialing')
    AND s.current_period_end > NOW()
    ORDER BY sp.price_monthly DESC
    LIMIT 1;
    
    IF v_features IS NULL THEN
        -- Default to free plan features
        SELECT features INTO v_features
        FROM subscription_plans
        WHERE plan_code = 'consumer_free';
    END IF;
    
    RETURN COALESCE((v_features->>p_feature)::BOOLEAN, FALSE);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Create subscription
CREATE OR REPLACE FUNCTION create_subscription(
    p_account_id UUID,
    p_plan_code TEXT,
    p_billing_cycle TEXT DEFAULT 'monthly',
    p_stripe_subscription_id TEXT DEFAULT NULL,
    p_stripe_customer_id TEXT DEFAULT NULL,
    p_trial_days INTEGER DEFAULT 0
)
RETURNS UUID AS $$
DECLARE
    v_plan_id UUID;
    v_subscription_id UUID;
    v_period_end TIMESTAMPTZ;
    v_trial_end TIMESTAMPTZ;
BEGIN
    -- Get plan
    SELECT id INTO v_plan_id
    FROM subscription_plans
    WHERE plan_code = p_plan_code AND is_active = TRUE;
    
    IF v_plan_id IS NULL THEN
        RAISE EXCEPTION 'Plan not found: %', p_plan_code;
    END IF;
    
    -- Calculate period end
    v_period_end := CASE p_billing_cycle
        WHEN 'yearly' THEN NOW() + INTERVAL '1 year'
        WHEN 'lifetime' THEN NOW() + INTERVAL '100 years'
        ELSE NOW() + INTERVAL '1 month'
    END;
    
    -- Trial end
    IF p_trial_days > 0 THEN
        v_trial_end := NOW() + (p_trial_days || ' days')::INTERVAL;
    END IF;
    
    -- Cancel existing active subscriptions of same type
    UPDATE subscriptions
    SET status = 'expired', ended_at = NOW(), updated_at = NOW()
    WHERE account_id = p_account_id
    AND status IN ('active', 'trialing')
    AND plan_id IN (
        SELECT id FROM subscription_plans 
        WHERE plan_type LIKE (SELECT LEFT(plan_type, 8) FROM subscription_plans WHERE id = v_plan_id) || '%'
    );
    
    -- Create new subscription
    INSERT INTO subscriptions (
        account_id, plan_id, billing_cycle,
        stripe_subscription_id, stripe_customer_id,
        status, trial_start, trial_end,
        current_period_start, current_period_end
    ) VALUES (
        p_account_id, v_plan_id, p_billing_cycle,
        p_stripe_subscription_id, p_stripe_customer_id,
        CASE WHEN p_trial_days > 0 THEN 'trialing' ELSE 'active' END,
        CASE WHEN p_trial_days > 0 THEN NOW() ELSE NULL END,
        v_trial_end,
        NOW(), v_period_end
    )
    RETURNING id INTO v_subscription_id;
    
    -- Update account premium status
    UPDATE accounts
    SET is_premium = TRUE,
        premium_until = v_period_end,
        updated_at = NOW()
    WHERE id = p_account_id;
    
    -- Log event
    INSERT INTO billing_events (account_id, subscription_id, event_type, event_data)
    VALUES (p_account_id, v_subscription_id, 'subscription_created', jsonb_build_object(
        'plan_code', p_plan_code,
        'billing_cycle', p_billing_cycle,
        'trial_days', p_trial_days
    ));
    
    RETURN v_subscription_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Cancel subscription
CREATE OR REPLACE FUNCTION cancel_subscription(
    p_subscription_id UUID,
    p_cancel_immediately BOOLEAN DEFAULT FALSE,
    p_reason TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_account_id UUID;
BEGIN
    -- Get account
    SELECT account_id INTO v_account_id
    FROM subscriptions WHERE id = p_subscription_id;
    
    IF v_account_id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    IF p_cancel_immediately THEN
        UPDATE subscriptions
        SET status = 'expired',
            canceled_at = NOW(),
            ended_at = NOW(),
            cancellation_reason = p_reason,
            updated_at = NOW()
        WHERE id = p_subscription_id;
        
        -- Update account
        UPDATE accounts
        SET is_premium = FALSE, premium_until = NULL, updated_at = NOW()
        WHERE id = v_account_id;
    ELSE
        UPDATE subscriptions
        SET cancel_at_period_end = TRUE,
            canceled_at = NOW(),
            cancellation_reason = p_reason,
            updated_at = NOW()
        WHERE id = p_subscription_id;
    END IF;
    
    -- Log event
    INSERT INTO billing_events (account_id, subscription_id, event_type, event_data)
    VALUES (v_account_id, p_subscription_id, 'subscription_canceled', jsonb_build_object(
        'immediately', p_cancel_immediately,
        'reason', p_reason
    ));
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Apply promo code
CREATE OR REPLACE FUNCTION apply_promo_code(
    p_account_id UUID,
    p_code TEXT,
    p_subscription_id UUID DEFAULT NULL
)
RETURNS TABLE(
    success BOOLEAN,
    message TEXT,
    discount_type TEXT,
    discount_value DECIMAL
) AS $$
DECLARE
    v_promo RECORD;
    v_existing INTEGER;
BEGIN
    -- Get promo code
    SELECT * INTO v_promo
    FROM promo_codes
    WHERE UPPER(code) = UPPER(p_code)
    AND is_active = TRUE
    AND (valid_from IS NULL OR valid_from <= NOW())
    AND (valid_until IS NULL OR valid_until > NOW())
    AND (max_redemptions IS NULL OR times_redeemed < max_redemptions);
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, 'Invalid or expired promo code'::TEXT, NULL::TEXT, NULL::DECIMAL;
        RETURN;
    END IF;
    
    -- Check per-user limit
    SELECT COUNT(*) INTO v_existing
    FROM promo_redemptions
    WHERE promo_code_id = v_promo.id AND account_id = p_account_id;
    
    IF v_existing >= COALESCE(v_promo.max_redemptions_per_user, 1) THEN
        RETURN QUERY SELECT FALSE, 'You have already used this promo code'::TEXT, NULL::TEXT, NULL::DECIMAL;
        RETURN;
    END IF;
    
    -- Record redemption
    INSERT INTO promo_redemptions (promo_code_id, account_id, subscription_id, discount_amount)
    VALUES (v_promo.id, p_account_id, p_subscription_id, 0);
    
    -- Update redemption count
    UPDATE promo_codes
    SET times_redeemed = times_redeemed + 1, updated_at = NOW()
    WHERE id = v_promo.id;
    
    RETURN QUERY SELECT TRUE, 'Promo code applied successfully'::TEXT, v_promo.discount_type, v_promo.discount_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Generate invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    v_year TEXT;
    v_sequence INTEGER;
BEGIN
    v_year := TO_CHAR(NOW(), 'YYYY');
    
    SELECT COALESCE(MAX(
        CASE WHEN invoice_number ~ ('^INV-' || v_year || '-[0-9]+$')
        THEN SUBSTRING(invoice_number FROM '[0-9]+$')::INTEGER
        ELSE 0 END
    ), 0) + 1 INTO v_sequence
    FROM invoices;
    
    RETURN 'INV-' || v_year || '-' || LPAD(v_sequence::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 11. TRIGGERS
-- ============================================================================

-- Auto-update account premium status when subscription changes
CREATE OR REPLACE FUNCTION trigger_update_premium_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status IN ('active', 'trialing') THEN
        UPDATE accounts
        SET is_premium = TRUE,
            premium_until = NEW.current_period_end,
            updated_at = NOW()
        WHERE id = NEW.account_id;
    ELSIF NEW.status IN ('expired', 'canceled') AND NOT NEW.cancel_at_period_end THEN
        -- Check if user has any other active premium subscriptions
        IF NOT EXISTS (
            SELECT 1 FROM subscriptions
            WHERE account_id = NEW.account_id
            AND id != NEW.id
            AND status IN ('active', 'trialing')
        ) THEN
            UPDATE accounts
            SET is_premium = FALSE, premium_until = NULL, updated_at = NOW()
            WHERE id = NEW.account_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_premium_status ON subscriptions;
CREATE TRIGGER tr_update_premium_status
AFTER INSERT OR UPDATE OF status ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION trigger_update_premium_status();

-- Auto-generate invoice number
CREATE OR REPLACE FUNCTION trigger_generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.invoice_number IS NULL THEN
        NEW.invoice_number := generate_invoice_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_generate_invoice_number ON invoices;
CREATE TRIGGER tr_generate_invoice_number
BEFORE INSERT ON invoices
FOR EACH ROW
EXECUTE FUNCTION trigger_generate_invoice_number();

-- ============================================================================
-- 12. VIEWS
-- ============================================================================

-- Active subscriptions summary
CREATE OR REPLACE VIEW v_active_subscriptions AS
SELECT 
    s.id,
    s.account_id,
    a.email,
    a.display_name,
    sp.plan_code,
    sp.plan_name,
    sp.plan_type,
    s.billing_cycle,
    s.status,
    s.current_period_start,
    s.current_period_end,
    s.cancel_at_period_end,
    sp.price_monthly,
    sp.features
FROM subscriptions s
JOIN accounts a ON a.id = s.account_id
JOIN subscription_plans sp ON sp.id = s.plan_id
WHERE s.status IN ('active', 'trialing', 'past_due');

-- Revenue summary
CREATE OR REPLACE VIEW v_revenue_summary AS
SELECT 
    DATE_TRUNC('month', i.paid_at) AS month,
    sp.plan_type,
    COUNT(DISTINCT i.id) AS invoice_count,
    SUM(i.total) / 100.0 AS total_revenue,
    COUNT(DISTINCT i.account_id) AS unique_customers
FROM invoices i
JOIN subscriptions s ON s.id = i.subscription_id
JOIN subscription_plans sp ON sp.id = s.plan_id
WHERE i.status = 'paid'
GROUP BY DATE_TRUNC('month', i.paid_at), sp.plan_type
ORDER BY month DESC, sp.plan_type;

-- ============================================================================
-- 13. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE crypto_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_events ENABLE ROW LEVEL SECURITY;

-- Plans: public read
CREATE POLICY "Anyone can view active plans" ON subscription_plans
    FOR SELECT USING (is_active = TRUE AND is_public = TRUE);
CREATE POLICY "Service role manages plans" ON subscription_plans
    FOR ALL USING (auth.role() = 'service_role');

-- Subscriptions: users see own
CREATE POLICY "Users see own subscriptions" ON subscriptions
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages subscriptions" ON subscriptions
    FOR ALL USING (auth.role() = 'service_role');

-- Payment methods: users manage own
CREATE POLICY "Users manage own payment methods" ON payment_methods
    FOR ALL USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- Invoices: users see own
CREATE POLICY "Users see own invoices" ON invoices
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages invoices" ON invoices
    FOR ALL USING (auth.role() = 'service_role');

-- Usage records: service only
CREATE POLICY "Service role manages usage" ON usage_records
    FOR ALL USING (auth.role() = 'service_role');

-- Promo codes: service only for management
CREATE POLICY "Anyone can view active promos" ON promo_codes
    FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Service role manages promos" ON promo_codes
    FOR ALL USING (auth.role() = 'service_role');

-- Promo redemptions: users see own
CREATE POLICY "Users see own redemptions" ON promo_redemptions
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages redemptions" ON promo_redemptions
    FOR ALL USING (auth.role() = 'service_role');

-- Crypto payments: users see own
CREATE POLICY "Users see own crypto payments" ON crypto_payments
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages crypto" ON crypto_payments
    FOR ALL USING (auth.role() = 'service_role');

-- Billing events: service only
CREATE POLICY "Service role manages billing events" ON billing_events
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 14. COMMENTS
-- ============================================================================

COMMENT ON TABLE subscription_plans IS 'Available subscription plans with pricing and features';
COMMENT ON TABLE subscriptions IS 'Customer subscriptions with Stripe integration';
COMMENT ON TABLE payment_methods IS 'Customer payment methods (cards, SEPA, etc.)';
COMMENT ON TABLE invoices IS 'Billing invoices with line items';
COMMENT ON TABLE usage_records IS 'Metered usage tracking for billing';
COMMENT ON TABLE promo_codes IS 'Promotional discount codes';
COMMENT ON TABLE crypto_payments IS 'Cryptocurrency payment tracking (future)';
COMMENT ON TABLE billing_events IS 'Audit log for all billing events';

COMMENT ON FUNCTION has_premium_subscription IS 'Check if account has active premium subscription';
COMMENT ON FUNCTION get_current_subscription IS 'Get account current subscription details';
COMMENT ON FUNCTION has_feature_access IS 'Check if account has access to specific feature';
COMMENT ON FUNCTION create_subscription IS 'Create new subscription for account';
COMMENT ON FUNCTION cancel_subscription IS 'Cancel subscription immediately or at period end';
COMMENT ON FUNCTION apply_promo_code IS 'Apply promotional code to account';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
