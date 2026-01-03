-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 8: REFERRAL SYSTEM FUNCTIONS
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-02
-- Description: Complete referral system with invite, track, and reward
-- ============================================================================

-- ============================================================================
-- 1. CREATE REFERRAL INVITE
-- ============================================================================

CREATE OR REPLACE FUNCTION create_referral_invite(
    p_referrer_account_id UUID,
    p_referred_email TEXT,
    p_referral_type TEXT DEFAULT 'consumer_to_consumer'
)
RETURNS TABLE(
    success BOOLEAN,
    referral_id UUID,
    referral_code TEXT,
    error_message TEXT
) AS $$
DECLARE
    v_referral_id UUID;
    v_referrer_code TEXT;
    v_existing_id UUID;
BEGIN
    -- Validate referral type
    IF p_referral_type NOT IN ('consumer_to_consumer', 'consumer_to_merchant', 'merchant_to_merchant', 'merchant_to_consumer') THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, 'Invalid referral type'::TEXT;
        RETURN;
    END IF;

    -- Get referrer's referral code
    SELECT referral_code INTO v_referrer_code
    FROM accounts
    WHERE id = p_referrer_account_id;

    IF v_referrer_code IS NULL THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, 'Referrer account not found'::TEXT;
        RETURN;
    END IF;

    -- Check if already referred (pending or signed_up)
    SELECT id INTO v_existing_id
    FROM referrals
    WHERE referrer_account_id = p_referrer_account_id
    AND referred_email = LOWER(p_referred_email)
    AND status IN ('pending', 'signed_up', 'qualified', 'rewarded');

    IF v_existing_id IS NOT NULL THEN
        RETURN QUERY SELECT FALSE, v_existing_id, v_referrer_code, 'Referral already exists for this email'::TEXT;
        RETURN;
    END IF;

    -- Check if email is already registered
    IF EXISTS (SELECT 1 FROM accounts WHERE LOWER(email) = LOWER(p_referred_email)) THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, 'User is already registered'::TEXT;
        RETURN;
    END IF;

    -- Create referral
    INSERT INTO referrals (
        referrer_account_id,
        referred_email,
        referral_type,
        status,
        expires_at
    ) VALUES (
        p_referrer_account_id,
        LOWER(p_referred_email),
        p_referral_type,
        'pending',
        NOW() + INTERVAL '30 days'
    )
    RETURNING id INTO v_referral_id;

    RETURN QUERY SELECT TRUE, v_referral_id, v_referrer_code, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 2. PROCESS REFERRAL ON SIGNUP
-- ============================================================================

CREATE OR REPLACE FUNCTION process_referral_signup(
    p_referral_code TEXT,
    p_new_account_id UUID
)
RETURNS TABLE(
    success BOOLEAN,
    referrer_id UUID,
    referrer_points INTEGER,
    referred_points INTEGER,
    error_message TEXT
) AS $$
DECLARE
    v_referrer_id UUID;
    v_referral_id UUID;
    v_new_email TEXT;
    v_referrer_points INTEGER := 100;
    v_referred_points INTEGER := 50;
BEGIN
    -- Get new account email
    SELECT email INTO v_new_email
    FROM accounts
    WHERE id = p_new_account_id;

    IF v_new_email IS NULL THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, 0, 0, 'Account not found'::TEXT;
        RETURN;
    END IF;

    -- Find referrer by code
    SELECT id INTO v_referrer_id
    FROM accounts
    WHERE referral_code = UPPER(p_referral_code);

    IF v_referrer_id IS NULL THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, 0, 0, 'Invalid referral code'::TEXT;
        RETURN;
    END IF;

    -- Cannot refer yourself
    IF v_referrer_id = p_new_account_id THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, 0, 0, 'Cannot refer yourself'::TEXT;
        RETURN;
    END IF;

    -- Check if there's a pending referral for this email
    SELECT id INTO v_referral_id
    FROM referrals
    WHERE referrer_account_id = v_referrer_id
    AND referred_email = LOWER(v_new_email)
    AND status = 'pending'
    AND expires_at > NOW();

    IF v_referral_id IS NOT NULL THEN
        -- Update existing referral
        UPDATE referrals
        SET referred_account_id = p_new_account_id,
            status = 'signed_up',
            referrer_points_awarded = v_referrer_points,
            referred_points_awarded = v_referred_points,
            updated_at = NOW()
        WHERE id = v_referral_id;
    ELSE
        -- Create new referral record
        INSERT INTO referrals (
            referrer_account_id,
            referred_account_id,
            referred_email,
            referral_type,
            status,
            referrer_points_awarded,
            referred_points_awarded
        ) VALUES (
            v_referrer_id,
            p_new_account_id,
            v_new_email,
            'consumer_to_consumer',
            'signed_up',
            v_referrer_points,
            v_referred_points
        );
    END IF;

    -- Update new account with referrer
    UPDATE accounts
    SET referred_by_account_id = v_referrer_id
    WHERE id = p_new_account_id;

    -- Award points to referrer
    PERFORM award_loyalty_points(
        v_referrer_id,
        v_referrer_points,
        'consumer',
        'referral_consumer',
        'Friend signup bonus',
        'account',
        p_new_account_id
    );

    -- Award bonus points to referred (extra welcome bonus)
    PERFORM award_loyalty_points(
        p_new_account_id,
        v_referred_points,
        'consumer',
        'welcome_bonus',
        'Referral welcome bonus'
    );

    RETURN QUERY SELECT TRUE, v_referrer_id, v_referrer_points, v_referred_points, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 3. GET REFERRAL STATS
-- ============================================================================

CREATE OR REPLACE FUNCTION get_referral_stats(p_account_id UUID)
RETURNS TABLE(
    total_referrals BIGINT,
    pending_referrals BIGINT,
    successful_referrals BIGINT,
    total_points_earned BIGINT,
    referral_code TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(r.id)::BIGINT AS total_referrals,
        COUNT(r.id) FILTER (WHERE r.status = 'pending')::BIGINT AS pending_referrals,
        COUNT(r.id) FILTER (WHERE r.status IN ('signed_up', 'qualified', 'rewarded'))::BIGINT AS successful_referrals,
        COALESCE(SUM(r.referrer_points_awarded), 0)::BIGINT AS total_points_earned,
        a.referral_code
    FROM accounts a
    LEFT JOIN referrals r ON r.referrer_account_id = a.id
    WHERE a.id = p_account_id
    GROUP BY a.id, a.referral_code;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 4. GET MY REFERRALS LIST
-- ============================================================================

CREATE OR REPLACE FUNCTION get_my_referrals(
    p_account_id UUID,
    p_limit INTEGER DEFAULT 50,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
    referral_id UUID,
    referred_email TEXT,
    referred_name TEXT,
    referral_type TEXT,
    status TEXT,
    points_awarded INTEGER,
    created_at TIMESTAMPTZ,
    signed_up_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.id AS referral_id,
        r.referred_email,
        COALESCE(a.display_name, a.first_name, SPLIT_PART(r.referred_email, '@', 1)) AS referred_name,
        r.referral_type,
        r.status,
        r.referrer_points_awarded AS points_awarded,
        r.created_at,
        CASE WHEN r.status != 'pending' THEN r.updated_at ELSE NULL END AS signed_up_at
    FROM referrals r
    LEFT JOIN accounts a ON a.id = r.referred_account_id
    WHERE r.referrer_account_id = p_account_id
    ORDER BY r.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 5. VALIDATE REFERRAL CODE
-- ============================================================================

CREATE OR REPLACE FUNCTION validate_referral_code(p_code TEXT)
RETURNS TABLE(
    is_valid BOOLEAN,
    referrer_id UUID,
    referrer_name TEXT,
    error_message TEXT
) AS $$
DECLARE
    v_account RECORD;
BEGIN
    SELECT id, display_name, first_name
    INTO v_account
    FROM accounts
    WHERE referral_code = UPPER(p_code)
    AND is_active = TRUE;

    IF v_account.id IS NULL THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, 'Invalid referral code'::TEXT;
        RETURN;
    END IF;

    RETURN QUERY SELECT
        TRUE,
        v_account.id,
        COALESCE(v_account.display_name, v_account.first_name, 'Friend')::TEXT,
        NULL::TEXT;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. EXPIRE OLD REFERRALS (Scheduled job)
-- ============================================================================

CREATE OR REPLACE FUNCTION expire_old_referrals()
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE referrals
    SET status = 'expired',
        updated_at = NOW()
    WHERE status = 'pending'
    AND expires_at < NOW();

    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. VIEWS
-- ============================================================================

-- Referral leaderboard
CREATE OR REPLACE VIEW v_referral_leaderboard AS
SELECT
    a.id AS account_id,
    a.display_name,
    a.first_name,
    COUNT(r.id) FILTER (WHERE r.status IN ('signed_up', 'qualified', 'rewarded')) AS successful_referrals,
    COALESCE(SUM(r.referrer_points_awarded), 0) AS total_points_earned,
    a.referral_code
FROM accounts a
LEFT JOIN referrals r ON r.referrer_account_id = a.id
WHERE a.is_active = TRUE
GROUP BY a.id
HAVING COUNT(r.id) FILTER (WHERE r.status IN ('signed_up', 'qualified', 'rewarded')) > 0
ORDER BY successful_referrals DESC, total_points_earned DESC;

-- ============================================================================
-- 8. RLS POLICIES
-- ============================================================================

-- Users can view their own referrals
DROP POLICY IF EXISTS "Users can view own referrals" ON referrals;
CREATE POLICY "Users can view own referrals" ON referrals
    FOR SELECT USING (
        referrer_account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
        OR referred_account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Users can create referrals
DROP POLICY IF EXISTS "Users can create referrals" ON referrals;
CREATE POLICY "Users can create referrals" ON referrals
    FOR INSERT WITH CHECK (
        referrer_account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Service role full access
DROP POLICY IF EXISTS "Service role full access referrals" ON referrals;
CREATE POLICY "Service role full access referrals" ON referrals
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 9. COMMENTS
-- ============================================================================

COMMENT ON FUNCTION create_referral_invite IS 'Create a referral invite for an email address';
COMMENT ON FUNCTION process_referral_signup IS 'Process referral when invited user signs up with referral code';
COMMENT ON FUNCTION get_referral_stats IS 'Get referral statistics for an account';
COMMENT ON FUNCTION get_my_referrals IS 'Get paginated list of referrals made by account';
COMMENT ON FUNCTION validate_referral_code IS 'Validate a referral code and get referrer info';
COMMENT ON FUNCTION expire_old_referrals IS 'Expire pending referrals past their expiration date';

-- ============================================================================
-- 10. UPDATE CREATE_CONSUMER_ACCOUNT TO AWARD REFERRAL POINTS
-- ============================================================================

-- Replace the existing function to properly award referral points
CREATE OR REPLACE FUNCTION create_consumer_account(
    p_email TEXT,
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_auth_id UUID DEFAULT NULL,
    p_referral_code TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_account_id UUID;
    v_referrer_id UUID;
    v_referrer_points INTEGER := 100;
    v_referred_points INTEGER := 50;
BEGIN
    -- Check if referred
    IF p_referral_code IS NOT NULL THEN
        SELECT id INTO v_referrer_id
        FROM accounts
        WHERE referral_code = UPPER(p_referral_code);
    END IF;

    -- Create account
    INSERT INTO accounts (email, first_name, last_name, auth_id, referred_by_account_id)
    VALUES (p_email, p_first_name, p_last_name, p_auth_id, v_referrer_id)
    RETURNING id INTO v_account_id;

    -- Create consumer role (primary by default)
    INSERT INTO account_roles (account_id, role_type, is_primary)
    VALUES (v_account_id, 'consumer', TRUE);

    -- Create empty health profile
    INSERT INTO health_profiles (account_id)
    VALUES (v_account_id);

    -- Process referral if exists
    IF v_referrer_id IS NOT NULL THEN
        -- Update pending referral or create new one
        UPDATE referrals
        SET referred_account_id = v_account_id,
            status = 'signed_up',
            referrer_points_awarded = v_referrer_points,
            referred_points_awarded = v_referred_points,
            updated_at = NOW()
        WHERE referrer_account_id = v_referrer_id
          AND referred_email = LOWER(p_email)
          AND status = 'pending';

        -- If no pending referral, create one
        IF NOT FOUND THEN
            INSERT INTO referrals (
                referrer_account_id, referred_account_id, referred_email,
                referral_type, status, referrer_points_awarded, referred_points_awarded
            ) VALUES (
                v_referrer_id, v_account_id, LOWER(p_email),
                'consumer_to_consumer', 'signed_up', v_referrer_points, v_referred_points
            );
        END IF;

        -- Award points to referrer
        PERFORM award_loyalty_points(
            v_referrer_id,
            v_referrer_points,
            'consumer',
            'referral_consumer',
            'Friend signup bonus',
            'account',
            v_account_id
        );

        -- Award bonus points to new user
        PERFORM award_loyalty_points(
            v_account_id,
            v_referred_points,
            'consumer',
            'welcome_bonus',
            'Referral welcome bonus'
        );
    ELSE
        -- Award standard welcome bonus (25 points without referral)
        PERFORM award_loyalty_points(
            v_account_id,
            25,
            'consumer',
            'welcome_bonus',
            'Welcome bonus'
        );
    END IF;

    RETURN v_account_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
