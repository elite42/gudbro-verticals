-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 14: POINTS ECONOMY SYSTEM
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-03
-- Description: Full points economy with float tracking, breakage, revenue
--              sharing, and expiry management. Based on Starbucks model.
--
-- KEY CONCEPTS:
-- - Float: Prepaid deposits from customers = working capital for GudBro
-- - Breakage: Points that expire unused = pure profit (like gift cards)
-- - Revenue Share: Partner merchants share in float interest & breakage
-- - Closed-Loop: Points only redeemable within GudBro ecosystem
-- ============================================================================

-- ============================================================================
-- 1. POINTS ECONOMY CONFIGURATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS points_economy_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Configuration key
    config_key TEXT NOT NULL UNIQUE,
    config_value JSONB NOT NULL,

    -- Metadata
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,

    -- Audit
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_by UUID REFERENCES accounts(id)
);

-- Insert default configuration
INSERT INTO points_economy_config (config_key, config_value, description) VALUES
    -- Point value
    ('point_value_eur', '{"value": 0.01, "currency": "EUR"}',
     '1 point = 0.01 EUR (100 points = 1 EUR)'),

    -- Float investment
    ('float_investment', '{
        "strategy": "treasury_bonds",
        "expected_annual_return": 0.04,
        "risk_level": "low",
        "reinvest_interest": true
    }', 'Float investment strategy - conservative treasury bonds'),

    -- Breakage estimation
    ('breakage_estimate', '{
        "annual_rate": 0.15,
        "calculation_method": "historical_redemption"
    }', 'Expected 15% of points will expire unredeemed (industry average)'),

    -- Expiry policy
    ('expiry_policy', '{
        "months_to_expire": 24,
        "warning_at_months": [21, 23],
        "grace_period_days": 30,
        "reactivation_on_activity": true
    }', 'Points expire after 24 months of inactivity'),

    -- Revenue sharing
    ('revenue_share', '{
        "partner_tiers": {
            "standard": {"float_share": 0.20, "breakage_share": 0.10},
            "premium": {"float_share": 0.30, "breakage_share": 0.15},
            "founding": {"float_share": 0.40, "breakage_share": 0.20}
        },
        "minimum_payout": 50,
        "payout_frequency": "monthly"
    }', 'Revenue sharing tiers for partner merchants'),

    -- Anti-abuse limits
    ('anti_abuse', '{
        "max_points_per_day_consumer": 500,
        "max_points_per_day_merchant": 2000,
        "max_deposit_per_transaction": 200,
        "max_deposit_per_day": 500,
        "suspicious_threshold": 1000
    }', 'Fraud prevention limits'),

    -- Closed-loop compliance
    ('compliance', '{
        "is_closed_loop": true,
        "cash_out_allowed": false,
        "fincen_exempt": true,
        "max_stored_value": 2000,
        "requires_id_over": 500
    }', 'FinCEN closed-loop exemption parameters')
ON CONFLICT (config_key) DO NOTHING;

-- ============================================================================
-- 2. PREPAID DEPOSITS (Float Tracking)
-- ============================================================================

CREATE TABLE IF NOT EXISTS prepaid_deposits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Who deposited
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Deposit details
    amount_eur DECIMAL(10,2) NOT NULL CHECK (amount_eur > 0),
    points_credited INTEGER NOT NULL,  -- amount * 100 (1 EUR = 100 points)

    -- Payment info
    payment_method TEXT NOT NULL CHECK (payment_method IN (
        'credit_card', 'debit_card', 'bank_transfer', 'paypal',
        'apple_pay', 'google_pay', 'gift_card', 'promotional'
    )),
    payment_reference TEXT,  -- Stripe/PayPal transaction ID

    -- Status
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN (
        'pending', 'completed', 'failed', 'refunded'
    )),

    -- Float tracking
    added_to_float_at TIMESTAMPTZ,  -- When added to investment pool
    float_batch_id UUID,  -- Which investment batch

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 3. FLOAT MANAGEMENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS float_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Batch period
    batch_period TEXT NOT NULL,  -- '2026-01', '2026-Q1', etc.
    batch_type TEXT NOT NULL DEFAULT 'monthly' CHECK (batch_type IN (
        'daily', 'weekly', 'monthly', 'quarterly'
    )),

    -- Float amounts
    total_deposits_eur DECIMAL(15,2) NOT NULL DEFAULT 0,
    total_withdrawals_eur DECIMAL(15,2) NOT NULL DEFAULT 0,
    net_float_eur DECIMAL(15,2) GENERATED ALWAYS AS
        (total_deposits_eur - total_withdrawals_eur) STORED,

    -- Investment returns
    investment_return_eur DECIMAL(15,2) DEFAULT 0,
    return_rate DECIMAL(6,4),  -- Actual return rate for this batch

    -- Status
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN (
        'open',       -- Currently accumulating
        'invested',   -- Invested in treasury bonds
        'matured',    -- Investment matured
        'closed'      -- Batch closed and processed
    )),

    -- Dates
    opened_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    invested_at TIMESTAMPTZ,
    matured_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. BREAKAGE TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS breakage_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Period
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,

    -- Points data
    points_issued INTEGER NOT NULL DEFAULT 0,
    points_redeemed INTEGER NOT NULL DEFAULT 0,
    points_expired INTEGER NOT NULL DEFAULT 0,
    points_still_active INTEGER NOT NULL DEFAULT 0,

    -- Calculated values
    breakage_points INTEGER GENERATED ALWAYS AS
        (points_expired) STORED,
    breakage_eur DECIMAL(15,2),  -- breakage_points * point_value

    -- Rates
    redemption_rate DECIMAL(6,4),  -- points_redeemed / points_issued
    breakage_rate DECIMAL(6,4),    -- points_expired / points_issued

    -- Revenue allocation
    gudbro_share_eur DECIMAL(15,2),
    partner_pool_eur DECIMAL(15,2),

    -- Status
    status TEXT NOT NULL DEFAULT 'calculating' CHECK (status IN (
        'calculating', 'finalized', 'distributed'
    )),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    finalized_at TIMESTAMPTZ,
    distributed_at TIMESTAMPTZ
);

-- ============================================================================
-- 5. MERCHANT REVENUE SHARE
-- ============================================================================

CREATE TABLE IF NOT EXISTS merchant_revenue_shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Merchant
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    partner_tier TEXT NOT NULL DEFAULT 'standard' CHECK (partner_tier IN (
        'standard', 'premium', 'founding'
    )),

    -- Period
    period_month DATE NOT NULL,  -- First day of month

    -- Points generated at this merchant
    points_earned_at_merchant INTEGER NOT NULL DEFAULT 0,
    points_redeemed_at_merchant INTEGER NOT NULL DEFAULT 0,

    -- Revenue share calculation
    float_share_basis_eur DECIMAL(15,2) NOT NULL DEFAULT 0,  -- Pro-rata float
    float_return_share_eur DECIMAL(15,2) NOT NULL DEFAULT 0,  -- Share of interest
    breakage_share_eur DECIMAL(15,2) NOT NULL DEFAULT 0,      -- Share of breakage

    total_revenue_share_eur DECIMAL(15,2) GENERATED ALWAYS AS
        (float_return_share_eur + breakage_share_eur) STORED,

    -- Payout status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',     -- Not yet processed
        'calculated',  -- Share calculated
        'approved',    -- Approved for payout
        'paid',        -- Paid to merchant
        'held'         -- Held for some reason
    )),

    -- Payout details
    payout_id UUID,  -- Reference to payout transaction
    paid_at TIMESTAMPTZ,
    payout_method TEXT,  -- 'bank_transfer', 'credit_to_subscription', etc.

    -- Notes
    admin_notes TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 6. POINTS EXPIRY TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS points_expiry_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Account
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Points in this batch
    points_amount INTEGER NOT NULL,
    source_transaction_id UUID REFERENCES points_transactions(id),

    -- Expiry dates
    earned_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,  -- earned_at + 24 months

    -- Status
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active',           -- Points are valid
        'warning_sent_21',  -- 21-month warning sent
        'warning_sent_23',  -- 23-month warning sent (final)
        'expired',          -- Points expired
        'redeemed',         -- Points used
        'extended'          -- Extended due to activity
    )),

    -- Tracking
    redeemed_amount INTEGER DEFAULT 0,  -- Partial redemption tracking
    remaining_points INTEGER GENERATED ALWAYS AS
        (points_amount - redeemed_amount) STORED,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    expired_at TIMESTAMPTZ,
    warning_sent_at TIMESTAMPTZ
);

-- ============================================================================
-- 7. ECONOMY EVENTS LOG
-- ============================================================================

CREATE TABLE IF NOT EXISTS economy_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Event type
    event_type TEXT NOT NULL CHECK (event_type IN (
        'deposit',           -- Prepaid deposit
        'withdrawal',        -- Points used for purchase
        'expiry',            -- Points expired
        'float_investment',  -- Float invested
        'float_return',      -- Investment return received
        'breakage_calc',     -- Breakage calculated
        'revenue_share',     -- Revenue shared with merchant
        'payout',            -- Payout to merchant
        'config_change',     -- Configuration changed
        'audit'              -- Audit event
    )),

    -- References
    account_id UUID REFERENCES accounts(id),
    merchant_id UUID REFERENCES merchants(id),
    reference_table TEXT,
    reference_id UUID,

    -- Event data
    amount_points INTEGER,
    amount_eur DECIMAL(15,2),
    event_data JSONB,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID REFERENCES accounts(id)
);

-- ============================================================================
-- 8. INDEXES
-- ============================================================================

-- Prepaid deposits
CREATE INDEX idx_prepaid_deposits_account ON prepaid_deposits(account_id);
CREATE INDEX idx_prepaid_deposits_status ON prepaid_deposits(status);
CREATE INDEX idx_prepaid_deposits_created ON prepaid_deposits(created_at DESC);

-- Float batches
CREATE INDEX idx_float_batches_period ON float_batches(batch_period);
CREATE INDEX idx_float_batches_status ON float_batches(status);

-- Breakage records
CREATE INDEX idx_breakage_period ON breakage_records(period_start, period_end);
CREATE INDEX idx_breakage_status ON breakage_records(status);

-- Merchant revenue shares
CREATE INDEX idx_merchant_revenue_merchant ON merchant_revenue_shares(merchant_id);
CREATE INDEX idx_merchant_revenue_period ON merchant_revenue_shares(period_month);
CREATE INDEX idx_merchant_revenue_status ON merchant_revenue_shares(status);

-- Points expiry
CREATE INDEX idx_points_expiry_account ON points_expiry_batches(account_id);
CREATE INDEX idx_points_expiry_expires ON points_expiry_batches(expires_at)
    WHERE status = 'active';
CREATE INDEX idx_points_expiry_status ON points_expiry_batches(status);

-- Economy events
CREATE INDEX idx_economy_events_type ON economy_events(event_type);
CREATE INDEX idx_economy_events_account ON economy_events(account_id);
CREATE INDEX idx_economy_events_merchant ON economy_events(merchant_id);
CREATE INDEX idx_economy_events_created ON economy_events(created_at DESC);

-- ============================================================================
-- 9. HELPER FUNCTIONS
-- ============================================================================

-- Drop existing functions
DROP FUNCTION IF EXISTS process_prepaid_deposit CASCADE;
DROP FUNCTION IF EXISTS calculate_breakage_for_period CASCADE;
DROP FUNCTION IF EXISTS calculate_merchant_revenue_share CASCADE;
DROP FUNCTION IF EXISTS expire_old_points CASCADE;
DROP FUNCTION IF EXISTS send_expiry_warnings CASCADE;
DROP FUNCTION IF EXISTS get_economy_dashboard_hq CASCADE;
DROP FUNCTION IF EXISTS get_economy_dashboard_merchant CASCADE;
DROP FUNCTION IF EXISTS get_config_value CASCADE;

-- Get config value helper
CREATE OR REPLACE FUNCTION get_config_value(p_key TEXT)
RETURNS JSONB AS $$
    SELECT config_value FROM points_economy_config
    WHERE config_key = p_key AND is_active = TRUE;
$$ LANGUAGE sql STABLE;

-- Process prepaid deposit
CREATE OR REPLACE FUNCTION process_prepaid_deposit(
    p_account_id UUID,
    p_amount_eur DECIMAL,
    p_payment_method TEXT,
    p_payment_reference TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_deposit_id UUID;
    v_points INTEGER;
    v_point_value DECIMAL;
    v_max_deposit DECIMAL;
    v_today_deposits DECIMAL;
BEGIN
    -- Get point value (100 points = 1 EUR default)
    v_point_value := COALESCE(
        (get_config_value('point_value_eur')->>'value')::DECIMAL,
        0.01
    );
    v_points := FLOOR(p_amount_eur / v_point_value);

    -- Check anti-abuse limits
    v_max_deposit := COALESCE(
        (get_config_value('anti_abuse')->>'max_deposit_per_transaction')::DECIMAL,
        200
    );
    IF p_amount_eur > v_max_deposit THEN
        RAISE EXCEPTION 'Deposit exceeds maximum allowed per transaction (€%)', v_max_deposit;
    END IF;

    -- Check daily limit
    SELECT COALESCE(SUM(amount_eur), 0) INTO v_today_deposits
    FROM prepaid_deposits
    WHERE account_id = p_account_id
    AND status = 'completed'
    AND created_at > NOW() - INTERVAL '24 hours';

    IF v_today_deposits + p_amount_eur > COALESCE(
        (get_config_value('anti_abuse')->>'max_deposit_per_day')::DECIMAL, 500
    ) THEN
        RAISE EXCEPTION 'Daily deposit limit exceeded';
    END IF;

    -- Create deposit record
    INSERT INTO prepaid_deposits (
        account_id, amount_eur, points_credited,
        payment_method, payment_reference, status
    ) VALUES (
        p_account_id, p_amount_eur, v_points,
        p_payment_method, p_payment_reference, 'completed'
    )
    RETURNING id INTO v_deposit_id;

    -- Credit points to account
    UPDATE accounts SET
        points_balance = points_balance + v_points,
        points_earned = points_earned + v_points,
        updated_at = NOW()
    WHERE id = p_account_id;

    -- Log transaction
    INSERT INTO points_transactions (
        account_id, points, transaction_type, action_type,
        reference_type, reference_id, description
    ) VALUES (
        p_account_id, v_points, 'earn', 'prepaid_deposit',
        'deposit', v_deposit_id,
        'Prepaid deposit: €' || p_amount_eur
    );

    -- Create expiry batch for these points
    INSERT INTO points_expiry_batches (
        account_id, points_amount, source_transaction_id,
        earned_at, expires_at
    ) VALUES (
        p_account_id, v_points,
        (SELECT id FROM points_transactions
         WHERE reference_id = v_deposit_id ORDER BY created_at DESC LIMIT 1),
        NOW(),
        NOW() + INTERVAL '24 months'
    );

    -- Log economy event
    INSERT INTO economy_events (
        event_type, account_id, reference_table, reference_id,
        amount_points, amount_eur, event_data
    ) VALUES (
        'deposit', p_account_id, 'prepaid_deposits', v_deposit_id,
        v_points, p_amount_eur,
        jsonb_build_object(
            'payment_method', p_payment_method,
            'payment_reference', p_payment_reference
        )
    );

    RETURN v_deposit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Calculate breakage for period
CREATE OR REPLACE FUNCTION calculate_breakage_for_period(
    p_start_date DATE,
    p_end_date DATE
)
RETURNS UUID AS $$
DECLARE
    v_record_id UUID;
    v_points_issued INTEGER;
    v_points_redeemed INTEGER;
    v_points_expired INTEGER;
    v_points_active INTEGER;
    v_point_value DECIMAL;
    v_breakage_eur DECIMAL;
    v_partner_share_rate DECIMAL;
BEGIN
    -- Get point value
    v_point_value := COALESCE(
        (get_config_value('point_value_eur')->>'value')::DECIMAL,
        0.01
    );

    -- Calculate points issued in period
    SELECT COALESCE(SUM(points), 0) INTO v_points_issued
    FROM points_transactions
    WHERE transaction_type = 'earn'
    AND created_at >= p_start_date
    AND created_at < p_end_date + INTERVAL '1 day';

    -- Calculate points redeemed in period
    SELECT COALESCE(ABS(SUM(points)), 0) INTO v_points_redeemed
    FROM points_transactions
    WHERE transaction_type = 'spend'
    AND created_at >= p_start_date
    AND created_at < p_end_date + INTERVAL '1 day';

    -- Calculate points expired in period
    SELECT COALESCE(SUM(points_amount), 0) INTO v_points_expired
    FROM points_expiry_batches
    WHERE status = 'expired'
    AND expired_at >= p_start_date
    AND expired_at < p_end_date + INTERVAL '1 day';

    -- Calculate still active
    SELECT COALESCE(SUM(remaining_points), 0) INTO v_points_active
    FROM points_expiry_batches
    WHERE status = 'active';

    -- Calculate breakage value
    v_breakage_eur := v_points_expired * v_point_value;

    -- Get average partner share rate (using standard tier as baseline)
    v_partner_share_rate := COALESCE(
        (get_config_value('revenue_share')->'partner_tiers'->'standard'->>'breakage_share')::DECIMAL,
        0.10
    );

    -- Create breakage record
    INSERT INTO breakage_records (
        period_start, period_end,
        points_issued, points_redeemed, points_expired, points_still_active,
        breakage_eur,
        redemption_rate, breakage_rate,
        gudbro_share_eur, partner_pool_eur,
        status
    ) VALUES (
        p_start_date, p_end_date,
        v_points_issued, v_points_redeemed, v_points_expired, v_points_active,
        v_breakage_eur,
        CASE WHEN v_points_issued > 0
            THEN v_points_redeemed::DECIMAL / v_points_issued
            ELSE 0 END,
        CASE WHEN v_points_issued > 0
            THEN v_points_expired::DECIMAL / v_points_issued
            ELSE 0 END,
        v_breakage_eur * (1 - v_partner_share_rate),
        v_breakage_eur * v_partner_share_rate,
        'finalized'
    )
    RETURNING id INTO v_record_id;

    -- Log economy event
    INSERT INTO economy_events (
        event_type, reference_table, reference_id,
        amount_points, amount_eur, event_data
    ) VALUES (
        'breakage_calc', 'breakage_records', v_record_id,
        v_points_expired, v_breakage_eur,
        jsonb_build_object(
            'period_start', p_start_date,
            'period_end', p_end_date,
            'redemption_rate', v_points_redeemed::DECIMAL / NULLIF(v_points_issued, 0),
            'breakage_rate', v_points_expired::DECIMAL / NULLIF(v_points_issued, 0)
        )
    );

    RETURN v_record_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Calculate merchant revenue share for a month
CREATE OR REPLACE FUNCTION calculate_merchant_revenue_share(
    p_merchant_id UUID,
    p_month DATE  -- First day of month
)
RETURNS UUID AS $$
DECLARE
    v_share_id UUID;
    v_partner_tier TEXT;
    v_points_earned INTEGER;
    v_points_redeemed INTEGER;
    v_float_share_rate DECIMAL;
    v_breakage_share_rate DECIMAL;
    v_total_float_eur DECIMAL;
    v_float_return_rate DECIMAL;
    v_breakage_pool DECIMAL;
    v_merchant_proportion DECIMAL;
BEGIN
    -- Get merchant partner tier
    SELECT COALESCE(partner_tier, 'standard') INTO v_partner_tier
    FROM merchants WHERE id = p_merchant_id;

    -- Get share rates for tier
    v_float_share_rate := COALESCE(
        (get_config_value('revenue_share')->'partner_tiers'->v_partner_tier->>'float_share')::DECIMAL,
        0.20
    );
    v_breakage_share_rate := COALESCE(
        (get_config_value('revenue_share')->'partner_tiers'->v_partner_tier->>'breakage_share')::DECIMAL,
        0.10
    );

    -- Calculate points earned/redeemed at this merchant
    -- (This would need a merchant_id column on transactions or orders)
    -- For now, we'll use a placeholder calculation
    SELECT
        COALESCE(SUM(CASE WHEN pt.points > 0 THEN pt.points ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN pt.points < 0 THEN ABS(pt.points) ELSE 0 END), 0)
    INTO v_points_earned, v_points_redeemed
    FROM points_transactions pt
    WHERE pt.created_at >= p_month
    AND pt.created_at < p_month + INTERVAL '1 month'
    AND pt.metadata->>'merchant_id' = p_merchant_id::TEXT;

    -- Get total float for the month
    SELECT COALESCE(SUM(net_float_eur), 0) INTO v_total_float_eur
    FROM float_batches
    WHERE batch_period = TO_CHAR(p_month, 'YYYY-MM');

    -- Get float return rate
    v_float_return_rate := COALESCE(
        (get_config_value('float_investment')->>'expected_annual_return')::DECIMAL / 12,
        0.0033  -- ~4% annual / 12
    );

    -- Get breakage pool for the month
    SELECT COALESCE(partner_pool_eur, 0) INTO v_breakage_pool
    FROM breakage_records
    WHERE period_start = p_month
    AND period_end = p_month + INTERVAL '1 month' - INTERVAL '1 day';

    -- Calculate merchant's proportion of the network
    -- (based on points volume relative to total)
    WITH total_points AS (
        SELECT COALESCE(SUM(ABS(points)), 1) AS total
        FROM points_transactions
        WHERE created_at >= p_month
        AND created_at < p_month + INTERVAL '1 month'
    )
    SELECT (v_points_earned + v_points_redeemed)::DECIMAL / total
    INTO v_merchant_proportion
    FROM total_points;

    -- Create revenue share record
    INSERT INTO merchant_revenue_shares (
        merchant_id, partner_tier, period_month,
        points_earned_at_merchant, points_redeemed_at_merchant,
        float_share_basis_eur,
        float_return_share_eur,
        breakage_share_eur,
        status
    ) VALUES (
        p_merchant_id, v_partner_tier, p_month,
        v_points_earned, v_points_redeemed,
        v_total_float_eur * v_merchant_proportion,
        v_total_float_eur * v_merchant_proportion * v_float_return_rate * v_float_share_rate,
        v_breakage_pool * v_merchant_proportion * v_breakage_share_rate,
        'calculated'
    )
    RETURNING id INTO v_share_id;

    RETURN v_share_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Expire old points
CREATE OR REPLACE FUNCTION expire_old_points()
RETURNS INTEGER AS $$
DECLARE
    v_expired_count INTEGER := 0;
    v_batch RECORD;
    v_point_value DECIMAL;
BEGIN
    v_point_value := COALESCE(
        (get_config_value('point_value_eur')->>'value')::DECIMAL,
        0.01
    );

    FOR v_batch IN
        SELECT * FROM points_expiry_batches
        WHERE status = 'active'
        AND expires_at < NOW()
        AND remaining_points > 0
    LOOP
        -- Update batch status
        UPDATE points_expiry_batches
        SET status = 'expired', expired_at = NOW(), updated_at = NOW()
        WHERE id = v_batch.id;

        -- Deduct from account balance
        UPDATE accounts
        SET points_balance = points_balance - v_batch.remaining_points,
            updated_at = NOW()
        WHERE id = v_batch.account_id;

        -- Log transaction
        INSERT INTO points_transactions (
            account_id, points, transaction_type, action_type,
            reference_type, reference_id, description
        ) VALUES (
            v_batch.account_id, -v_batch.remaining_points,
            'expire', 'points_expiry',
            'expiry_batch', v_batch.id,
            'Points expired after 24 months of inactivity'
        );

        -- Log economy event
        INSERT INTO economy_events (
            event_type, account_id, reference_table, reference_id,
            amount_points, amount_eur
        ) VALUES (
            'expiry', v_batch.account_id, 'points_expiry_batches', v_batch.id,
            v_batch.remaining_points, v_batch.remaining_points * v_point_value
        );

        v_expired_count := v_expired_count + 1;
    END LOOP;

    RETURN v_expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Send expiry warnings
CREATE OR REPLACE FUNCTION send_expiry_warnings()
RETURNS INTEGER AS $$
DECLARE
    v_warning_count INTEGER := 0;
    v_batch RECORD;
    v_months_remaining INTEGER;
BEGIN
    FOR v_batch IN
        SELECT peb.*, a.email, a.display_name
        FROM points_expiry_batches peb
        JOIN accounts a ON a.id = peb.account_id
        WHERE peb.status = 'active'
        AND peb.remaining_points > 0
        AND peb.expires_at > NOW()
        AND peb.expires_at < NOW() + INTERVAL '3 months'
    LOOP
        v_months_remaining := EXTRACT(MONTH FROM AGE(v_batch.expires_at, NOW()));

        -- 21 month warning (3 months left)
        IF v_months_remaining <= 3 AND v_batch.status = 'active' THEN
            UPDATE points_expiry_batches
            SET status = 'warning_sent_21',
                warning_sent_at = NOW(),
                updated_at = NOW()
            WHERE id = v_batch.id;
            v_warning_count := v_warning_count + 1;

            -- Here you would trigger an email notification
            -- INSERT INTO notification_queue (...)

        -- 23 month warning (1 month left)
        ELSIF v_months_remaining <= 1 AND v_batch.status = 'warning_sent_21' THEN
            UPDATE points_expiry_batches
            SET status = 'warning_sent_23',
                warning_sent_at = NOW(),
                updated_at = NOW()
            WHERE id = v_batch.id;
            v_warning_count := v_warning_count + 1;

            -- Here you would trigger a final warning email
        END IF;
    END LOOP;

    RETURN v_warning_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 10. DASHBOARD VIEWS
-- ============================================================================

-- HQ Economy Dashboard
CREATE OR REPLACE VIEW v_economy_dashboard_hq AS
SELECT
    -- Overall Float
    (SELECT COALESCE(SUM(amount_eur), 0) FROM prepaid_deposits WHERE status = 'completed')
        AS total_float_eur,
    (SELECT COALESCE(SUM(amount_eur), 0) FROM prepaid_deposits
     WHERE status = 'completed' AND created_at > NOW() - INTERVAL '30 days')
        AS float_last_30_days_eur,

    -- Points Stats
    (SELECT COALESCE(SUM(points_balance), 0) FROM accounts) AS total_outstanding_points,
    (SELECT COALESCE(SUM(points_earned), 0) FROM accounts) AS total_points_ever_issued,
    (SELECT COALESCE(SUM(points_spent), 0) FROM accounts) AS total_points_redeemed,

    -- Breakage
    (SELECT COALESCE(SUM(points_amount), 0) FROM points_expiry_batches WHERE status = 'expired')
        AS total_expired_points,
    (SELECT COALESCE(SUM(breakage_eur), 0) FROM breakage_records) AS total_breakage_eur,

    -- Estimated Values (based on config)
    (SELECT COALESCE(SUM(points_balance), 0) * 0.01 FROM accounts) AS outstanding_liability_eur,
    (SELECT COALESCE(SUM(remaining_points), 0) * 0.01 FROM points_expiry_batches
     WHERE status = 'active' AND expires_at < NOW() + INTERVAL '6 months')
        AS expiring_soon_liability_eur,

    -- Revenue Shares
    (SELECT COALESCE(SUM(total_revenue_share_eur), 0) FROM merchant_revenue_shares
     WHERE status = 'paid') AS total_revenue_shared_eur,
    (SELECT COALESCE(SUM(total_revenue_share_eur), 0) FROM merchant_revenue_shares
     WHERE status IN ('pending', 'calculated', 'approved')) AS pending_revenue_share_eur,

    -- Active Accounts
    (SELECT COUNT(*) FROM accounts WHERE points_balance > 0) AS accounts_with_points,
    (SELECT COUNT(*) FROM prepaid_deposits WHERE created_at > NOW() - INTERVAL '30 days')
        AS deposits_last_30_days;

-- Merchant Economy Dashboard (function for specific merchant)
CREATE OR REPLACE FUNCTION get_economy_dashboard_merchant(p_merchant_id UUID)
RETURNS TABLE(
    partner_tier TEXT,
    total_points_earned INTEGER,
    total_points_redeemed INTEGER,
    total_revenue_earned_eur DECIMAL,
    pending_revenue_eur DECIMAL,
    last_payout_date TIMESTAMPTZ,
    last_payout_amount DECIMAL,
    next_payout_estimate DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        m.partner_tier,
        COALESCE(SUM(mrs.points_earned_at_merchant), 0)::INTEGER AS total_points_earned,
        COALESCE(SUM(mrs.points_redeemed_at_merchant), 0)::INTEGER AS total_points_redeemed,
        COALESCE(SUM(CASE WHEN mrs.status = 'paid' THEN mrs.total_revenue_share_eur ELSE 0 END), 0)
            AS total_revenue_earned_eur,
        COALESCE(SUM(CASE WHEN mrs.status IN ('pending', 'calculated', 'approved')
            THEN mrs.total_revenue_share_eur ELSE 0 END), 0) AS pending_revenue_eur,
        MAX(mrs.paid_at) AS last_payout_date,
        (SELECT mrs2.total_revenue_share_eur FROM merchant_revenue_shares mrs2
         WHERE mrs2.merchant_id = p_merchant_id AND mrs2.status = 'paid'
         ORDER BY mrs2.paid_at DESC LIMIT 1) AS last_payout_amount,
        (SELECT COALESCE(mrs3.total_revenue_share_eur, 0) FROM merchant_revenue_shares mrs3
         WHERE mrs3.merchant_id = p_merchant_id AND mrs3.status IN ('pending', 'calculated')
         ORDER BY mrs3.period_month DESC LIMIT 1) AS next_payout_estimate
    FROM merchants m
    LEFT JOIN merchant_revenue_shares mrs ON mrs.merchant_id = m.id
    WHERE m.id = p_merchant_id
    GROUP BY m.id, m.partner_tier;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Account points expiry summary
CREATE OR REPLACE FUNCTION get_points_expiry_summary(p_account_id UUID)
RETURNS TABLE(
    total_points INTEGER,
    expiring_3_months INTEGER,
    expiring_6_months INTEGER,
    expiring_12_months INTEGER,
    next_expiry_date TIMESTAMPTZ,
    next_expiry_amount INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COALESCE(SUM(peb.remaining_points), 0)::INTEGER AS total_points,
        COALESCE(SUM(CASE WHEN peb.expires_at < NOW() + INTERVAL '3 months'
            THEN peb.remaining_points ELSE 0 END), 0)::INTEGER AS expiring_3_months,
        COALESCE(SUM(CASE WHEN peb.expires_at < NOW() + INTERVAL '6 months'
            THEN peb.remaining_points ELSE 0 END), 0)::INTEGER AS expiring_6_months,
        COALESCE(SUM(CASE WHEN peb.expires_at < NOW() + INTERVAL '12 months'
            THEN peb.remaining_points ELSE 0 END), 0)::INTEGER AS expiring_12_months,
        MIN(peb.expires_at) AS next_expiry_date,
        (SELECT remaining_points FROM points_expiry_batches
         WHERE account_id = p_account_id AND status = 'active' AND remaining_points > 0
         ORDER BY expires_at ASC LIMIT 1) AS next_expiry_amount
    FROM points_expiry_batches peb
    WHERE peb.account_id = p_account_id
    AND peb.status = 'active'
    AND peb.remaining_points > 0;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 11. ADD partner_tier TO MERCHANTS IF NOT EXISTS
-- ============================================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'merchants' AND column_name = 'partner_tier'
    ) THEN
        ALTER TABLE merchants ADD COLUMN partner_tier TEXT DEFAULT 'standard'
            CHECK (partner_tier IN ('standard', 'premium', 'founding'));
    END IF;
END $$;

-- ============================================================================
-- 12. ADD metadata TO points_transactions IF NOT EXISTS
-- ============================================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'points_transactions' AND column_name = 'metadata'
    ) THEN
        ALTER TABLE points_transactions ADD COLUMN metadata JSONB DEFAULT '{}';
    END IF;
END $$;

-- ============================================================================
-- 13. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE points_economy_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE prepaid_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE float_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE breakage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_revenue_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_expiry_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE economy_events ENABLE ROW LEVEL SECURITY;

-- Config: read-only for all, write for service role
CREATE POLICY "Anyone can view economy config" ON points_economy_config
    FOR SELECT USING (TRUE);
CREATE POLICY "Service role manages config" ON points_economy_config
    FOR ALL USING (auth.role() = 'service_role');

-- Prepaid deposits: users see own
CREATE POLICY "Users view own deposits" ON prepaid_deposits
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages deposits" ON prepaid_deposits
    FOR ALL USING (auth.role() = 'service_role');

-- Float batches: admin only
CREATE POLICY "Service role manages float" ON float_batches
    FOR ALL USING (auth.role() = 'service_role');

-- Breakage records: admin only
CREATE POLICY "Service role manages breakage" ON breakage_records
    FOR ALL USING (auth.role() = 'service_role');

-- Merchant revenue shares: merchant sees own
CREATE POLICY "Merchants view own revenue shares" ON merchant_revenue_shares
    FOR SELECT USING (
        merchant_id IN (
            SELECT m.id FROM merchants m
            JOIN account_roles ar ON ar.reference_id = m.id
            JOIN accounts a ON a.id = ar.account_id
            WHERE a.auth_id = auth.uid() AND ar.role_type = 'merchant'
        )
    );
CREATE POLICY "Service role manages revenue shares" ON merchant_revenue_shares
    FOR ALL USING (auth.role() = 'service_role');

-- Points expiry: users see own
CREATE POLICY "Users view own expiry batches" ON points_expiry_batches
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages expiry" ON points_expiry_batches
    FOR ALL USING (auth.role() = 'service_role');

-- Economy events: admin only
CREATE POLICY "Service role manages economy events" ON economy_events
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 14. COMMENTS
-- ============================================================================

COMMENT ON TABLE points_economy_config IS 'Global configuration for points economy (value, expiry, shares)';
COMMENT ON TABLE prepaid_deposits IS 'Prepaid deposits from customers - the float';
COMMENT ON TABLE float_batches IS 'Monthly/quarterly batches of float for investment tracking';
COMMENT ON TABLE breakage_records IS 'Periodic breakage calculations (expired points = profit)';
COMMENT ON TABLE merchant_revenue_shares IS 'Monthly revenue share calculations for partner merchants';
COMMENT ON TABLE points_expiry_batches IS 'Individual point batches with 24-month expiry tracking';
COMMENT ON TABLE economy_events IS 'Audit log for all economy-related events';

COMMENT ON FUNCTION process_prepaid_deposit IS 'Process a prepaid deposit, credit points, track for expiry';
COMMENT ON FUNCTION calculate_breakage_for_period IS 'Calculate breakage for a given period';
COMMENT ON FUNCTION calculate_merchant_revenue_share IS 'Calculate revenue share for a merchant for a month';
COMMENT ON FUNCTION expire_old_points IS 'Expire points older than 24 months, return count expired';
COMMENT ON FUNCTION send_expiry_warnings IS 'Send warnings for points expiring soon';
COMMENT ON FUNCTION get_economy_dashboard_merchant IS 'Get merchant economy dashboard data';
COMMENT ON FUNCTION get_points_expiry_summary IS 'Get expiry summary for an account';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
