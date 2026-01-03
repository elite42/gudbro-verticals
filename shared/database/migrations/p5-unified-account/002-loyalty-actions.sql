-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 2: LOYALTY ACTIONS
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-02
-- Description: Functions for specific loyalty actions
-- ============================================================================

-- ============================================================================
-- 1. CONSTANTS - Points per action
-- ============================================================================

-- Create a table for configurable point values
CREATE TABLE IF NOT EXISTS loyalty_config (
    action_type TEXT PRIMARY KEY,
    points INTEGER NOT NULL,
    points_type TEXT NOT NULL DEFAULT 'consumer',
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default point values
INSERT INTO loyalty_config (action_type, points, points_type, description) VALUES
    -- Consumer actions
    ('order_completed', 10, 'consumer', 'Per ogni 10 EUR spesi'),
    ('review_submitted', 25, 'consumer', 'Recensione verificata post-ordine'),
    ('social_share', 15, 'consumer', 'Condivisione social di un piatto'),
    ('referral_consumer', 100, 'consumer', 'Amico si registra'),
    ('referral_merchant_bonus', 500, 'consumer', 'Locale invitato si abbona'),
    ('checkin', 5, 'consumer', 'Check-in al locale'),
    ('first_order', 50, 'consumer', 'Primo ordine completato'),
    ('profile_complete', 150, 'consumer', 'Profilo 100% completo'),

    -- Merchant actions
    ('referral_merchant', 1000, 'merchant', 'Merchant referral + 1 mese gratis'),
    ('subscription_anniversary', 300, 'merchant', 'Anniversario abbonamento'),
    ('case_study', 1000, 'merchant', 'Testimonial/case study'),

    -- Contributor actions
    ('ingredient_contributed', 50, 'contributor', 'Ingrediente approvato'),
    ('bug_report', 100, 'contributor', 'Bug report utile'),
    ('feature_adopted', 200, 'contributor', 'Feature suggestion adottata'),

    -- System actions
    ('welcome_bonus', 25, 'consumer', 'Bonus benvenuto registrazione'),
    ('tier_silver', 100, 'consumer', 'Bonus tier Silver'),
    ('tier_gold', 250, 'consumer', 'Bonus tier Gold'),
    ('tier_platinum', 500, 'consumer', 'Bonus tier Platinum')
ON CONFLICT (action_type) DO NOTHING;

-- ============================================================================
-- 2. HELPER FUNCTION - Get points for action
-- ============================================================================

CREATE OR REPLACE FUNCTION get_loyalty_points(p_action_type TEXT)
RETURNS TABLE(points INTEGER, points_type TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT lc.points, lc.points_type
    FROM loyalty_config lc
    WHERE lc.action_type = p_action_type AND lc.is_active = TRUE;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- 3. CONSUMER LOYALTY ACTIONS
-- ============================================================================

-- Award points for order completion
CREATE OR REPLACE FUNCTION loyalty_order_completed(
    p_account_id UUID,
    p_order_id UUID,
    p_order_total DECIMAL,
    p_merchant_id UUID DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_points INTEGER;
    v_is_first_order BOOLEAN;
BEGIN
    -- Calculate points (10 per 10 EUR)
    v_points := FLOOR(p_order_total / 10) * 10;

    -- Minimum 10 points per order
    IF v_points < 10 THEN v_points := 10; END IF;

    -- Check if first order
    SELECT NOT EXISTS (
        SELECT 1 FROM loyalty_transactions
        WHERE account_id = p_account_id
        AND transaction_type = 'order_completed'
    ) INTO v_is_first_order;

    -- Award order points
    PERFORM award_loyalty_points(
        p_account_id,
        v_points,
        'consumer',
        'order_completed',
        'Order completed: ' || p_order_total || ' EUR',
        'order',
        p_order_id
    );

    -- Award first order bonus
    IF v_is_first_order THEN
        PERFORM award_loyalty_points(
            p_account_id,
            50,
            'consumer',
            'first_order',
            'First order bonus!'
        );
        v_points := v_points + 50;
    END IF;

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Award points for review
CREATE OR REPLACE FUNCTION loyalty_review_submitted(
    p_account_id UUID,
    p_review_id UUID,
    p_order_id UUID DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_points INTEGER := 25;
BEGIN
    PERFORM award_loyalty_points(
        p_account_id,
        v_points,
        'consumer',
        'review_submitted',
        'Review submitted',
        'review',
        p_review_id
    );

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Award points for social share
CREATE OR REPLACE FUNCTION loyalty_social_share(
    p_account_id UUID,
    p_product_id UUID,
    p_platform TEXT DEFAULT 'unknown'
)
RETURNS INTEGER AS $$
DECLARE
    v_points INTEGER := 15;
    v_today_shares INTEGER;
BEGIN
    -- Limit to 3 shares per day
    SELECT COUNT(*) INTO v_today_shares
    FROM loyalty_transactions
    WHERE account_id = p_account_id
    AND transaction_type = 'social_share'
    AND created_at > NOW() - INTERVAL '24 hours';

    IF v_today_shares >= 3 THEN
        RETURN 0; -- Already maxed out for today
    END IF;

    PERFORM award_loyalty_points(
        p_account_id,
        v_points,
        'consumer',
        'social_share',
        'Shared on ' || p_platform,
        'product',
        p_product_id
    );

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Award points for check-in
CREATE OR REPLACE FUNCTION loyalty_checkin(
    p_account_id UUID,
    p_merchant_id UUID
)
RETURNS INTEGER AS $$
DECLARE
    v_points INTEGER := 5;
    v_last_checkin TIMESTAMPTZ;
BEGIN
    -- Check last checkin at this merchant (limit to 1 per day per merchant)
    SELECT MAX(created_at) INTO v_last_checkin
    FROM loyalty_transactions
    WHERE account_id = p_account_id
    AND transaction_type = 'checkin'
    AND reference_id = p_merchant_id
    AND created_at > NOW() - INTERVAL '24 hours';

    IF v_last_checkin IS NOT NULL THEN
        RETURN 0; -- Already checked in today
    END IF;

    PERFORM award_loyalty_points(
        p_account_id,
        v_points,
        'consumer',
        'checkin',
        'Check-in',
        'merchant',
        p_merchant_id
    );

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 4. REFERRAL ACTIONS
-- ============================================================================

-- Process consumer referral (when referred user signs up)
CREATE OR REPLACE FUNCTION loyalty_referral_signup(
    p_referrer_account_id UUID,
    p_referred_account_id UUID,
    p_referral_type TEXT DEFAULT 'consumer_to_consumer'
)
RETURNS INTEGER AS $$
DECLARE
    v_points INTEGER;
BEGIN
    -- Determine points based on referral type
    v_points := CASE p_referral_type
        WHEN 'consumer_to_consumer' THEN 100
        WHEN 'merchant_to_consumer' THEN 100
        WHEN 'consumer_to_merchant' THEN 500
        WHEN 'merchant_to_merchant' THEN 1000
        ELSE 100
    END;

    -- Award referrer
    PERFORM award_loyalty_points(
        p_referrer_account_id,
        v_points,
        CASE WHEN p_referral_type LIKE 'merchant%' THEN 'merchant' ELSE 'consumer' END,
        'referral_' || CASE WHEN p_referral_type LIKE '%merchant' THEN 'merchant' ELSE 'consumer' END,
        'Referral: ' || p_referral_type,
        'account',
        p_referred_account_id
    );

    -- Award referred user welcome bonus
    PERFORM award_loyalty_points(
        p_referred_account_id,
        25,
        'consumer',
        'welcome_bonus',
        'Welcome bonus (referred by friend)'
    );

    -- Update referral record
    UPDATE referrals
    SET status = 'signed_up',
        referrer_points_awarded = v_points,
        referred_points_awarded = 25,
        updated_at = NOW()
    WHERE referrer_account_id = p_referrer_account_id
    AND referred_account_id = p_referred_account_id;

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 5. CONTRIBUTOR ACTIONS
-- ============================================================================

-- Award points for ingredient contribution
CREATE OR REPLACE FUNCTION loyalty_ingredient_contributed(
    p_account_id UUID,
    p_ingredient_id UUID
)
RETURNS INTEGER AS $$
DECLARE
    v_points INTEGER := 50;
BEGIN
    PERFORM award_loyalty_points(
        p_account_id,
        v_points,
        'contributor',
        'ingredient_contributed',
        'Ingredient approved',
        'ingredient',
        p_ingredient_id
    );

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Award points for bug report
CREATE OR REPLACE FUNCTION loyalty_bug_report(
    p_account_id UUID,
    p_report_id UUID
)
RETURNS INTEGER AS $$
DECLARE
    v_points INTEGER := 100;
BEGIN
    PERFORM award_loyalty_points(
        p_account_id,
        v_points,
        'contributor',
        'bug_report',
        'Bug report accepted',
        'report',
        p_report_id
    );

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. PROFILE COMPLETION BONUS
-- ============================================================================

CREATE OR REPLACE FUNCTION loyalty_profile_complete(p_account_id UUID)
RETURNS INTEGER AS $$
DECLARE
    v_points INTEGER := 150;
    v_already_awarded BOOLEAN;
    v_completeness INTEGER;
BEGIN
    -- Check if already awarded
    SELECT EXISTS (
        SELECT 1 FROM loyalty_transactions
        WHERE account_id = p_account_id
        AND transaction_type = 'profile_complete'
    ) INTO v_already_awarded;

    IF v_already_awarded THEN
        RETURN 0;
    END IF;

    -- Check profile completeness
    SELECT completeness_score INTO v_completeness
    FROM health_profiles
    WHERE account_id = p_account_id;

    IF v_completeness IS NULL OR v_completeness < 100 THEN
        RETURN 0;
    END IF;

    PERFORM award_loyalty_points(
        p_account_id,
        v_points,
        'consumer',
        'profile_complete',
        '100% profile completion bonus!'
    );

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. LOYALTY SUMMARY VIEW
-- ============================================================================

CREATE OR REPLACE VIEW v_loyalty_summary AS
SELECT
    a.id AS account_id,
    a.email,
    a.display_name,
    a.total_points,
    a.consumer_points,
    a.merchant_points,
    a.contributor_points,
    a.loyalty_tier,
    CASE a.loyalty_tier
        WHEN 'bronze' THEN 1000 - a.total_points
        WHEN 'silver' THEN 5000 - a.total_points
        WHEN 'gold' THEN 10000 - a.total_points
        ELSE 0
    END AS points_to_next_tier,
    CASE a.loyalty_tier
        WHEN 'bronze' THEN 'silver'
        WHEN 'silver' THEN 'gold'
        WHEN 'gold' THEN 'platinum'
        ELSE NULL
    END AS next_tier,
    (SELECT COUNT(*) FROM loyalty_transactions lt WHERE lt.account_id = a.id) AS total_transactions,
    (SELECT MAX(created_at) FROM loyalty_transactions lt WHERE lt.account_id = a.id) AS last_transaction_at,
    (SELECT COUNT(*) FROM referrals r WHERE r.referrer_account_id = a.id AND r.status = 'rewarded') AS successful_referrals
FROM accounts a;

-- ============================================================================
-- 8. RECENT TRANSACTIONS VIEW
-- ============================================================================

CREATE OR REPLACE VIEW v_recent_loyalty_transactions AS
SELECT
    lt.id,
    lt.account_id,
    lt.transaction_type,
    lt.points_change,
    lt.points_type,
    lt.balance_after,
    lt.description,
    lt.reference_type,
    lt.reference_id,
    lt.created_at,
    lc.description AS action_description
FROM loyalty_transactions lt
LEFT JOIN loyalty_config lc ON lc.action_type = lt.transaction_type
ORDER BY lt.created_at DESC;

-- ============================================================================
-- 9. RLS FOR NEW TABLE
-- ============================================================================

ALTER TABLE loyalty_config ENABLE ROW LEVEL SECURITY;

-- Everyone can read loyalty config
CREATE POLICY "Anyone can view loyalty config" ON loyalty_config
    FOR SELECT USING (TRUE);

-- Only service role can modify
CREATE POLICY "Service role can modify loyalty config" ON loyalty_config
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 10. COMMENTS
-- ============================================================================

COMMENT ON TABLE loyalty_config IS 'Configurable point values for loyalty actions';
COMMENT ON FUNCTION loyalty_order_completed IS 'Award points for completed order (10 pts per 10 EUR + first order bonus)';
COMMENT ON FUNCTION loyalty_review_submitted IS 'Award 25 points for verified review';
COMMENT ON FUNCTION loyalty_social_share IS 'Award 15 points for social share (max 3/day)';
COMMENT ON FUNCTION loyalty_checkin IS 'Award 5 points for check-in (max 1/day per merchant)';
COMMENT ON FUNCTION loyalty_referral_signup IS 'Process referral when referred user signs up';
COMMENT ON FUNCTION loyalty_ingredient_contributed IS 'Award 50 points for approved ingredient contribution';
COMMENT ON FUNCTION loyalty_profile_complete IS 'Award 150 points for 100% profile completion (one-time)';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
