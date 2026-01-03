-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 3: MERCHANT ONBOARDING
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-02
-- Description: Self-service merchant registration and onboarding
-- ============================================================================

-- ============================================================================
-- 1. ONBOARDING SESSIONS TABLE
-- ============================================================================
-- Tracks in-progress onboarding (multi-step wizard state)

CREATE TABLE IF NOT EXISTS merchant_onboarding_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Linked account (created at step 1)
    account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,

    -- Session tracking
    session_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
    current_step INTEGER DEFAULT 1 NOT NULL CHECK (current_step >= 1 AND current_step <= 5),

    -- Step 1: Account Info (pre-filled if account exists)
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,

    -- Step 2: Business Info
    business_name TEXT,
    business_type TEXT CHECK (business_type IN ('fnb', 'hotel', 'rental', 'wellness', 'other')),
    country_code TEXT,
    city TEXT,

    -- Step 3: Plan Selection
    selected_plan TEXT CHECK (selected_plan IN ('free', 'starter', 'pro')),
    billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly')),

    -- Step 4: Brand Setup
    brand_name TEXT,
    brand_logo_url TEXT,
    primary_color TEXT DEFAULT '#000000',

    -- Step 5: First Location
    location_name TEXT,
    location_address TEXT,
    location_currency TEXT DEFAULT 'EUR',
    location_languages TEXT[] DEFAULT ARRAY['en'],

    -- Completion
    is_completed BOOLEAN DEFAULT FALSE NOT NULL,
    completed_at TIMESTAMPTZ,

    -- Result (after completion)
    created_organization_id UUID REFERENCES organizations(id),
    created_brand_id UUID REFERENCES brands(id),
    created_location_id UUID REFERENCES locations(id),

    -- Trial info
    trial_ends_at TIMESTAMPTZ,

    -- Referral tracking
    referral_code_used TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,

    -- Expiration (incomplete sessions expire)
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_onboarding_account ON merchant_onboarding_sessions(account_id);
CREATE INDEX idx_onboarding_email ON merchant_onboarding_sessions(email);
CREATE INDEX idx_onboarding_token ON merchant_onboarding_sessions(session_token);
CREATE INDEX idx_onboarding_incomplete ON merchant_onboarding_sessions(is_completed, expires_at)
    WHERE is_completed = FALSE;

-- ============================================================================
-- 2. UPDATE TRIGGER
-- ============================================================================

CREATE TRIGGER update_merchant_onboarding_updated_at
    BEFORE UPDATE ON merchant_onboarding_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 3. START ONBOARDING FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION start_merchant_onboarding(
    p_email TEXT,
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_referral_code TEXT DEFAULT NULL,
    p_utm_source TEXT DEFAULT NULL,
    p_utm_medium TEXT DEFAULT NULL,
    p_utm_campaign TEXT DEFAULT NULL
)
RETURNS TABLE (
    session_id UUID,
    session_token TEXT,
    account_id UUID,
    is_existing_account BOOLEAN
) AS $$
DECLARE
    v_session_id UUID;
    v_session_token TEXT;
    v_account_id UUID;
    v_is_existing BOOLEAN := FALSE;
BEGIN
    -- Check if account exists
    SELECT id INTO v_account_id
    FROM accounts
    WHERE email = LOWER(TRIM(p_email));

    IF v_account_id IS NOT NULL THEN
        v_is_existing := TRUE;
    END IF;

    -- Generate session token
    v_session_token := encode(gen_random_bytes(32), 'hex');

    -- Create onboarding session
    INSERT INTO merchant_onboarding_sessions (
        account_id,
        session_token,
        email,
        first_name,
        last_name,
        referral_code_used,
        utm_source,
        utm_medium,
        utm_campaign
    ) VALUES (
        v_account_id,
        v_session_token,
        LOWER(TRIM(p_email)),
        p_first_name,
        p_last_name,
        p_referral_code,
        p_utm_source,
        p_utm_medium,
        p_utm_campaign
    )
    RETURNING id INTO v_session_id;

    RETURN QUERY SELECT v_session_id, v_session_token, v_account_id, v_is_existing;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 4. UPDATE ONBOARDING STEP FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION update_onboarding_step(
    p_session_token TEXT,
    p_step INTEGER,
    p_data JSONB
)
RETURNS BOOLEAN AS $$
DECLARE
    v_session merchant_onboarding_sessions%ROWTYPE;
BEGIN
    -- Get session
    SELECT * INTO v_session
    FROM merchant_onboarding_sessions
    WHERE session_token = p_session_token
      AND is_completed = FALSE
      AND expires_at > NOW();

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid or expired session';
    END IF;

    -- Update based on step
    CASE p_step
        WHEN 1 THEN
            UPDATE merchant_onboarding_sessions
            SET
                first_name = COALESCE(p_data->>'first_name', first_name),
                last_name = COALESCE(p_data->>'last_name', last_name),
                phone = COALESCE(p_data->>'phone', phone),
                current_step = 2
            WHERE session_token = p_session_token;

        WHEN 2 THEN
            UPDATE merchant_onboarding_sessions
            SET
                business_name = p_data->>'business_name',
                business_type = p_data->>'business_type',
                country_code = p_data->>'country_code',
                city = p_data->>'city',
                current_step = 3
            WHERE session_token = p_session_token;

        WHEN 3 THEN
            UPDATE merchant_onboarding_sessions
            SET
                selected_plan = p_data->>'selected_plan',
                billing_cycle = COALESCE(p_data->>'billing_cycle', 'monthly'),
                current_step = 4
            WHERE session_token = p_session_token;

        WHEN 4 THEN
            UPDATE merchant_onboarding_sessions
            SET
                brand_name = COALESCE(p_data->>'brand_name', business_name),
                brand_logo_url = p_data->>'brand_logo_url',
                primary_color = COALESCE(p_data->>'primary_color', '#000000'),
                current_step = 5
            WHERE session_token = p_session_token;

        WHEN 5 THEN
            UPDATE merchant_onboarding_sessions
            SET
                location_name = COALESCE(p_data->>'location_name', business_name),
                location_address = p_data->>'location_address',
                location_currency = COALESCE(p_data->>'location_currency', 'EUR'),
                location_languages = COALESCE(
                    ARRAY(SELECT jsonb_array_elements_text(p_data->'location_languages')),
                    ARRAY['en']
                )
            WHERE session_token = p_session_token;

        ELSE
            RAISE EXCEPTION 'Invalid step number';
    END CASE;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 5. COMPLETE ONBOARDING FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION complete_merchant_onboarding(
    p_session_token TEXT,
    p_auth_id UUID DEFAULT NULL
)
RETURNS TABLE (
    success BOOLEAN,
    account_id UUID,
    organization_id UUID,
    brand_id UUID,
    location_id UUID,
    error_message TEXT
) AS $$
DECLARE
    v_session merchant_onboarding_sessions%ROWTYPE;
    v_account_id UUID;
    v_org_id UUID;
    v_brand_id UUID;
    v_location_id UUID;
    v_partner_id UUID;
    v_org_slug TEXT;
    v_brand_slug TEXT;
    v_trial_ends TIMESTAMPTZ;
BEGIN
    -- Get session
    SELECT * INTO v_session
    FROM merchant_onboarding_sessions
    WHERE session_token = p_session_token
      AND is_completed = FALSE
      AND expires_at > NOW();

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::UUID, NULL::UUID, NULL::UUID, 'Invalid or expired session'::TEXT;
        RETURN;
    END IF;

    -- Validate required fields
    IF v_session.business_name IS NULL OR v_session.selected_plan IS NULL THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::UUID, NULL::UUID, NULL::UUID, 'Missing required fields'::TEXT;
        RETURN;
    END IF;

    -- Calculate trial end (14 days for all plans)
    v_trial_ends := NOW() + INTERVAL '14 days';

    -- Create or get account
    IF v_session.account_id IS NOT NULL THEN
        v_account_id := v_session.account_id;

        -- Update auth_id if provided
        IF p_auth_id IS NOT NULL THEN
            UPDATE accounts SET auth_id = p_auth_id WHERE id = v_account_id;
        END IF;
    ELSE
        -- Create new account
        INSERT INTO accounts (
            email,
            first_name,
            last_name,
            phone,
            auth_id,
            referred_by_account_id
        )
        SELECT
            v_session.email,
            v_session.first_name,
            v_session.last_name,
            v_session.phone,
            p_auth_id,
            (SELECT id FROM accounts WHERE referral_code = v_session.referral_code_used)
        RETURNING id INTO v_account_id;

        -- Create consumer role (everyone has this)
        INSERT INTO account_roles (account_id, role_type, is_primary)
        VALUES (v_account_id, 'consumer', FALSE);

        -- Create health profile
        INSERT INTO health_profiles (account_id) VALUES (v_account_id);
    END IF;

    -- Find partner for country
    IF v_session.country_code IS NOT NULL THEN
        SELECT id INTO v_partner_id
        FROM partners
        WHERE status = 'active'
          AND v_session.country_code = ANY(territory_codes)
        LIMIT 1;
    END IF;

    -- Generate unique slugs
    v_org_slug := LOWER(REGEXP_REPLACE(v_session.business_name, '[^a-zA-Z0-9]+', '-', 'g'));
    v_org_slug := v_org_slug || '-' || SUBSTRING(gen_random_uuid()::TEXT FROM 1 FOR 8);

    v_brand_slug := LOWER(REGEXP_REPLACE(COALESCE(v_session.brand_name, v_session.business_name), '[^a-zA-Z0-9]+', '-', 'g'));
    v_brand_slug := v_brand_slug || '-' || SUBSTRING(gen_random_uuid()::TEXT FROM 1 FOR 8);

    -- Create organization
    INSERT INTO organizations (
        name,
        slug,
        type,
        partner_id,
        subscription_plan,
        subscription_status,
        billing_email
    ) VALUES (
        v_session.business_name,
        v_org_slug,
        'standard',
        v_partner_id,
        v_session.selected_plan,
        'trialing',
        v_session.email
    )
    RETURNING id INTO v_org_id;

    -- Create brand
    INSERT INTO brands (
        organization_id,
        name,
        slug,
        business_type,
        logo_url,
        primary_color
    ) VALUES (
        v_org_id,
        COALESCE(v_session.brand_name, v_session.business_name),
        v_brand_slug,
        COALESCE(v_session.business_type, 'fnb'),
        v_session.brand_logo_url,
        COALESCE(v_session.primary_color, '#000000')
    )
    RETURNING id INTO v_brand_id;

    -- Create location
    INSERT INTO locations (
        brand_id,
        name,
        slug,
        address,
        city,
        country_code,
        currency_code,
        primary_language,
        enabled_languages
    ) VALUES (
        v_brand_id,
        COALESCE(v_session.location_name, v_session.business_name),
        'main',
        v_session.location_address,
        v_session.city,
        COALESCE(v_session.country_code, 'US'),
        COALESCE(v_session.location_currency, 'EUR'),
        v_session.location_languages[1],
        v_session.location_languages
    )
    RETURNING id INTO v_location_id;

    -- Add merchant role to account
    INSERT INTO account_roles (
        account_id,
        role_type,
        tenant_id,
        tenant_type,
        is_primary,
        permissions
    ) VALUES (
        v_account_id,
        'merchant',
        v_org_id,
        'organization',
        TRUE,  -- Make this the primary role
        jsonb_build_object(
            'menu_edit', true,
            'orders_view', true,
            'orders_manage', true,
            'analytics_view', true,
            'staff_manage', true,
            'billing_manage', true,
            'is_owner', true
        )
    );

    -- Update onboarding session as completed
    UPDATE merchant_onboarding_sessions
    SET
        is_completed = TRUE,
        completed_at = NOW(),
        account_id = v_account_id,
        created_organization_id = v_org_id,
        created_brand_id = v_brand_id,
        created_location_id = v_location_id,
        trial_ends_at = v_trial_ends
    WHERE session_token = p_session_token;

    -- Award signup points
    PERFORM award_loyalty_points(
        v_account_id,
        100,
        'merchant',
        'profile_completed',
        'Merchant onboarding completed - Welcome bonus!'
    );

    -- Process referral if exists
    IF v_session.referral_code_used IS NOT NULL THEN
        INSERT INTO referrals (
            referrer_account_id,
            referred_account_id,
            referral_type,
            status,
            target_merchant_id
        )
        SELECT
            id,
            v_account_id,
            'consumer_to_merchant',
            'qualified',
            v_org_id
        FROM accounts
        WHERE referral_code = v_session.referral_code_used;
    END IF;

    RETURN QUERY SELECT TRUE, v_account_id, v_org_id, v_brand_id, v_location_id, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. GET ONBOARDING SESSION FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION get_onboarding_session(p_session_token TEXT)
RETURNS TABLE (
    id UUID,
    current_step INTEGER,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    business_name TEXT,
    business_type TEXT,
    country_code TEXT,
    city TEXT,
    selected_plan TEXT,
    billing_cycle TEXT,
    brand_name TEXT,
    brand_logo_url TEXT,
    primary_color TEXT,
    location_name TEXT,
    location_address TEXT,
    location_currency TEXT,
    location_languages TEXT[],
    is_completed BOOLEAN,
    expires_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.id,
        s.current_step,
        s.email,
        s.first_name,
        s.last_name,
        s.phone,
        s.business_name,
        s.business_type,
        s.country_code,
        s.city,
        s.selected_plan,
        s.billing_cycle,
        s.brand_name,
        s.brand_logo_url,
        s.primary_color,
        s.location_name,
        s.location_address,
        s.location_currency,
        s.location_languages,
        s.is_completed,
        s.expires_at
    FROM merchant_onboarding_sessions s
    WHERE s.session_token = p_session_token
      AND s.expires_at > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. CLEANUP EXPIRED SESSIONS (to be called by cron)
-- ============================================================================

CREATE OR REPLACE FUNCTION cleanup_expired_onboarding_sessions()
RETURNS INTEGER AS $$
DECLARE
    v_deleted INTEGER;
BEGIN
    DELETE FROM merchant_onboarding_sessions
    WHERE is_completed = FALSE
      AND expires_at < NOW()
    RETURNING 1 INTO v_deleted;

    RETURN COALESCE(v_deleted, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 8. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE merchant_onboarding_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own sessions
CREATE POLICY "Users can view own onboarding" ON merchant_onboarding_sessions
    FOR SELECT USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
        OR email = (SELECT email FROM accounts WHERE auth_id = auth.uid())
    );

-- Anon can create sessions (signup flow)
CREATE POLICY "Anon can create onboarding" ON merchant_onboarding_sessions
    FOR INSERT WITH CHECK (TRUE);

-- Service role full access
CREATE POLICY "Service role full access onboarding" ON merchant_onboarding_sessions
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 9. VIEWS
-- ============================================================================

-- Pending onboardings for admin
CREATE OR REPLACE VIEW v_pending_onboardings AS
SELECT
    s.id,
    s.email,
    s.first_name,
    s.last_name,
    s.business_name,
    s.business_type,
    s.country_code,
    s.selected_plan,
    s.current_step,
    s.created_at,
    s.expires_at,
    s.utm_source,
    s.utm_campaign
FROM merchant_onboarding_sessions s
WHERE s.is_completed = FALSE
  AND s.expires_at > NOW()
ORDER BY s.created_at DESC;

-- Completed onboardings stats
CREATE OR REPLACE VIEW v_onboarding_stats AS
SELECT
    DATE_TRUNC('day', completed_at) AS date,
    selected_plan,
    COUNT(*) AS completions,
    COUNT(*) FILTER (WHERE referral_code_used IS NOT NULL) AS from_referrals,
    COUNT(*) FILTER (WHERE utm_source IS NOT NULL) AS from_campaigns
FROM merchant_onboarding_sessions
WHERE is_completed = TRUE
GROUP BY DATE_TRUNC('day', completed_at), selected_plan
ORDER BY date DESC;

-- ============================================================================
-- 10. COMMENTS
-- ============================================================================

COMMENT ON TABLE merchant_onboarding_sessions IS 'Tracks merchant self-registration wizard state';
COMMENT ON FUNCTION start_merchant_onboarding IS 'Initiates a new merchant onboarding session';
COMMENT ON FUNCTION update_onboarding_step IS 'Updates onboarding data for a specific step';
COMMENT ON FUNCTION complete_merchant_onboarding IS 'Finalizes onboarding: creates account, org, brand, location, roles';
COMMENT ON FUNCTION get_onboarding_session IS 'Retrieves current onboarding session data';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
