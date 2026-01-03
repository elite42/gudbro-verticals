-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 13: AUTOMATIC LOYALTY TRIGGERS
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-03
-- Description: Automatic triggers to award loyalty points on events
--              (orders, reviews, referrals, profile completion, tier upgrades)
-- ============================================================================

-- ============================================================================
-- 1. TRIGGER: After Order Completed
-- ============================================================================
-- This trigger fires when an order status changes to 'completed'
-- Awards points based on order total

CREATE OR REPLACE FUNCTION trigger_order_completed_loyalty()
RETURNS TRIGGER AS $$
DECLARE
    v_order_total DECIMAL;
    v_account_id UUID;
BEGIN
    -- Only fire when status changes to 'completed'
    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
        -- Get order details (assuming orders table has account_id and total)
        v_order_total := NEW.total_amount;
        v_account_id := NEW.account_id;

        -- Award points
        IF v_account_id IS NOT NULL AND v_order_total IS NOT NULL THEN
            PERFORM loyalty_order_completed(
                v_account_id,
                NEW.id,
                v_order_total,
                NEW.merchant_id
            );

            -- Check for tier upgrade
            PERFORM check_and_upgrade_tier(v_account_id);
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on orders table (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
        DROP TRIGGER IF EXISTS trg_order_completed_loyalty ON orders;
        CREATE TRIGGER trg_order_completed_loyalty
            AFTER UPDATE ON orders
            FOR EACH ROW
            EXECUTE FUNCTION trigger_order_completed_loyalty();
    END IF;
END $$;

-- ============================================================================
-- 2. TRIGGER: After Review Approved
-- ============================================================================
-- Awards points when a review is approved

CREATE OR REPLACE FUNCTION trigger_review_approved_loyalty()
RETURNS TRIGGER AS $$
BEGIN
    -- Only fire when status changes to 'approved'
    IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
        -- Award points
        IF NEW.account_id IS NOT NULL THEN
            PERFORM loyalty_review_submitted(
                NEW.account_id,
                NEW.id,
                NEW.order_id
            );

            -- Check for tier upgrade
            PERFORM check_and_upgrade_tier(NEW.account_id);
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on reviews table (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'reviews') THEN
        DROP TRIGGER IF EXISTS trg_review_approved_loyalty ON reviews;
        CREATE TRIGGER trg_review_approved_loyalty
            AFTER UPDATE ON reviews
            FOR EACH ROW
            EXECUTE FUNCTION trigger_review_approved_loyalty();
    END IF;
END $$;

-- ============================================================================
-- 3. TRIGGER: After Referral Status Change
-- ============================================================================
-- Awards points when a referral is completed (referred user signs up or converts)

CREATE OR REPLACE FUNCTION trigger_referral_completed_loyalty()
RETURNS TRIGGER AS $$
BEGIN
    -- Fire when status changes to 'signed_up' or 'converted'
    IF NEW.status IN ('signed_up', 'converted') AND OLD.status NOT IN ('signed_up', 'converted') THEN
        -- Award referral points (this function also gives welcome bonus to referred)
        PERFORM loyalty_referral_signup(
            NEW.referrer_account_id,
            NEW.referred_account_id,
            NEW.referral_type
        );

        -- Check for tier upgrades for both
        PERFORM check_and_upgrade_tier(NEW.referrer_account_id);
        PERFORM check_and_upgrade_tier(NEW.referred_account_id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on referrals table
DROP TRIGGER IF EXISTS trg_referral_completed_loyalty ON referrals;
CREATE TRIGGER trg_referral_completed_loyalty
    AFTER UPDATE ON referrals
    FOR EACH ROW
    EXECUTE FUNCTION trigger_referral_completed_loyalty();

-- ============================================================================
-- 4. TRIGGER: Welcome Bonus on Account Creation
-- ============================================================================
-- Awards welcome bonus when a new account is created

CREATE OR REPLACE FUNCTION trigger_account_welcome_bonus()
RETURNS TRIGGER AS $$
BEGIN
    -- Award welcome bonus (25 points by default)
    INSERT INTO loyalty_transactions (
        account_id,
        transaction_type,
        points_change,
        points_type,
        description
    ) VALUES (
        NEW.id,
        'welcome_bonus',
        25,
        'consumer',
        'Welcome to GudBro!'
    );

    -- Update account points
    UPDATE accounts SET
        consumer_points = COALESCE(consumer_points, 0) + 25,
        total_points = COALESCE(total_points, 0) + 25,
        updated_at = NOW()
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on accounts table
DROP TRIGGER IF EXISTS trg_account_welcome_bonus ON accounts;
CREATE TRIGGER trg_account_welcome_bonus
    AFTER INSERT ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION trigger_account_welcome_bonus();

-- ============================================================================
-- 5. TRIGGER: Profile Completion Check
-- ============================================================================
-- Awards points when profile reaches 100% completion

CREATE OR REPLACE FUNCTION trigger_profile_complete_loyalty()
RETURNS TRIGGER AS $$
DECLARE
    v_already_awarded BOOLEAN;
BEGIN
    -- Only fire when completeness reaches 100
    IF NEW.completeness_score >= 100 AND (OLD.completeness_score IS NULL OR OLD.completeness_score < 100) THEN
        -- Check if already awarded
        SELECT EXISTS (
            SELECT 1 FROM loyalty_transactions
            WHERE account_id = NEW.account_id
            AND transaction_type = 'profile_complete'
        ) INTO v_already_awarded;

        IF NOT v_already_awarded THEN
            -- Award points
            PERFORM loyalty_profile_complete(NEW.account_id);

            -- Check for tier upgrade
            PERFORM check_and_upgrade_tier(NEW.account_id);
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on health_profiles table (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'health_profiles') THEN
        DROP TRIGGER IF EXISTS trg_profile_complete_loyalty ON health_profiles;
        CREATE TRIGGER trg_profile_complete_loyalty
            AFTER UPDATE ON health_profiles
            FOR EACH ROW
            EXECUTE FUNCTION trigger_profile_complete_loyalty();
    END IF;
END $$;

-- ============================================================================
-- 6. TRIGGER: Ingredient Contribution Approved
-- ============================================================================
-- Awards points when a user's ingredient contribution is approved

CREATE OR REPLACE FUNCTION trigger_ingredient_approved_loyalty()
RETURNS TRIGGER AS $$
BEGIN
    -- Only fire when status changes to 'approved'
    IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
        -- Award points to contributor
        IF NEW.contributed_by IS NOT NULL THEN
            PERFORM loyalty_ingredient_contributed(
                NEW.contributed_by,
                NEW.id
            );

            -- Check for tier upgrade
            PERFORM check_and_upgrade_tier(NEW.contributed_by);
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on ingredient_contributions table (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ingredient_contributions') THEN
        DROP TRIGGER IF EXISTS trg_ingredient_approved_loyalty ON ingredient_contributions;
        CREATE TRIGGER trg_ingredient_approved_loyalty
            AFTER UPDATE ON ingredient_contributions
            FOR EACH ROW
            EXECUTE FUNCTION trigger_ingredient_approved_loyalty();
    END IF;
END $$;

-- ============================================================================
-- 7. TRIGGER: Automatic Tier Check on Points Change
-- ============================================================================
-- Checks for tier upgrade whenever points balance changes

CREATE OR REPLACE FUNCTION trigger_check_tier_on_points_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only check if points increased
    IF NEW.total_points > COALESCE(OLD.total_points, 0) THEN
        PERFORM check_and_upgrade_tier(NEW.id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on accounts table
DROP TRIGGER IF EXISTS trg_check_tier_on_points ON accounts;
CREATE TRIGGER trg_check_tier_on_points
    AFTER UPDATE OF total_points ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION trigger_check_tier_on_points_change();

-- ============================================================================
-- 8. TRIGGER: Expire Old Redemptions
-- ============================================================================
-- Function to expire old redemptions (to be called via cron/scheduled job)

CREATE OR REPLACE FUNCTION expire_old_redemptions()
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE reward_redemptions SET
        status = 'expired',
        updated_at = NOW()
    WHERE status = 'approved'
    AND valid_until IS NOT NULL
    AND valid_until < NOW();

    GET DIAGNOSTICS v_count = ROW_COUNT;

    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 9. LOYALTY POINTS SUMMARY UPDATE TRIGGER
-- ============================================================================
-- Keep accounts table synced with loyalty_transactions

CREATE OR REPLACE FUNCTION trigger_sync_loyalty_points()
RETURNS TRIGGER AS $$
BEGIN
    -- Update account points based on transaction
    IF NEW.points_change != 0 THEN
        UPDATE accounts SET
            total_points = COALESCE(total_points, 0) + NEW.points_change,
            consumer_points = CASE
                WHEN NEW.points_type = 'consumer' THEN COALESCE(consumer_points, 0) + NEW.points_change
                ELSE consumer_points
            END,
            merchant_points = CASE
                WHEN NEW.points_type = 'merchant' THEN COALESCE(merchant_points, 0) + NEW.points_change
                ELSE merchant_points
            END,
            contributor_points = CASE
                WHEN NEW.points_type = 'contributor' THEN COALESCE(contributor_points, 0) + NEW.points_change
                ELSE contributor_points
            END,
            updated_at = NOW()
        WHERE id = NEW.account_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on loyalty_transactions table
DROP TRIGGER IF EXISTS trg_sync_loyalty_points ON loyalty_transactions;
CREATE TRIGGER trg_sync_loyalty_points
    AFTER INSERT ON loyalty_transactions
    FOR EACH ROW
    EXECUTE FUNCTION trigger_sync_loyalty_points();

-- ============================================================================
-- 10. MERCHANT SUBSCRIPTION ANNIVERSARY
-- ============================================================================
-- Function to award anniversary points (to be called via cron/scheduled job)

CREATE OR REPLACE FUNCTION award_subscription_anniversaries()
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER := 0;
    v_account RECORD;
BEGIN
    -- Find accounts with subscription anniversary today
    FOR v_account IN
        SELECT
            a.id,
            EXTRACT(YEAR FROM AGE(NOW(), mr.subscription_start))::INTEGER AS years
        FROM accounts a
        JOIN merchant_roles mr ON mr.account_id = a.id
        WHERE mr.subscription_start IS NOT NULL
        AND EXTRACT(MONTH FROM mr.subscription_start) = EXTRACT(MONTH FROM NOW())
        AND EXTRACT(DAY FROM mr.subscription_start) = EXTRACT(DAY FROM NOW())
        AND NOT EXISTS (
            SELECT 1 FROM loyalty_transactions lt
            WHERE lt.account_id = a.id
            AND lt.transaction_type = 'subscription_anniversary'
            AND lt.created_at > NOW() - INTERVAL '1 day'
        )
    LOOP
        -- Award anniversary points (300 per year)
        INSERT INTO loyalty_transactions (
            account_id,
            transaction_type,
            points_change,
            points_type,
            description
        ) VALUES (
            v_account.id,
            'subscription_anniversary',
            300,
            'merchant',
            'Subscription anniversary: ' || v_account.years || ' year(s)'
        );

        v_count := v_count + 1;
    END LOOP;

    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 11. DAILY STREAK BONUS (Optional Feature)
-- ============================================================================
-- Award bonus points for consecutive day logins

CREATE TABLE IF NOT EXISTS login_streaks (
    account_id UUID PRIMARY KEY REFERENCES accounts(id) ON DELETE CASCADE,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    last_login_date DATE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION record_daily_login(p_account_id UUID)
RETURNS INTEGER AS $$
DECLARE
    v_streak RECORD;
    v_today DATE := CURRENT_DATE;
    v_points INTEGER := 0;
BEGIN
    -- Get or create streak record
    INSERT INTO login_streaks (account_id, current_streak, last_login_date)
    VALUES (p_account_id, 0, NULL)
    ON CONFLICT (account_id) DO NOTHING;

    SELECT * INTO v_streak FROM login_streaks WHERE account_id = p_account_id FOR UPDATE;

    -- If already logged in today, no points
    IF v_streak.last_login_date = v_today THEN
        RETURN 0;
    END IF;

    -- Check streak continuity
    IF v_streak.last_login_date = v_today - 1 THEN
        -- Continue streak
        v_streak.current_streak := v_streak.current_streak + 1;
    ELSE
        -- Reset streak
        v_streak.current_streak := 1;
    END IF;

    -- Update longest streak
    IF v_streak.current_streak > v_streak.longest_streak THEN
        v_streak.longest_streak := v_streak.current_streak;
    END IF;

    -- Calculate bonus points
    -- 1 point per streak day, max 7
    v_points := LEAST(v_streak.current_streak, 7);

    -- Milestone bonuses
    IF v_streak.current_streak = 7 THEN
        v_points := v_points + 25; -- Week streak bonus
    ELSIF v_streak.current_streak = 30 THEN
        v_points := v_points + 100; -- Month streak bonus
    ELSIF v_streak.current_streak = 365 THEN
        v_points := v_points + 500; -- Year streak bonus
    END IF;

    -- Award points
    IF v_points > 0 THEN
        INSERT INTO loyalty_transactions (
            account_id,
            transaction_type,
            points_change,
            points_type,
            description
        ) VALUES (
            p_account_id,
            'daily_login',
            v_points,
            'consumer',
            'Daily login streak: ' || v_streak.current_streak || ' days'
        );
    END IF;

    -- Update streak record
    UPDATE login_streaks SET
        current_streak = v_streak.current_streak,
        longest_streak = v_streak.longest_streak,
        last_login_date = v_today,
        updated_at = NOW()
    WHERE account_id = p_account_id;

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 12. SCHEDULED JOBS HELPER VIEW
-- ============================================================================
-- View to help identify what scheduled jobs should run

CREATE OR REPLACE VIEW v_scheduled_loyalty_jobs AS
SELECT
    'expire_redemptions' AS job_name,
    'expire_old_redemptions()' AS function_call,
    'Every hour' AS suggested_schedule,
    (SELECT COUNT(*) FROM reward_redemptions
     WHERE status = 'approved' AND valid_until < NOW()) AS pending_items
UNION ALL
SELECT
    'subscription_anniversaries' AS job_name,
    'award_subscription_anniversaries()' AS function_call,
    'Daily at midnight' AS suggested_schedule,
    0 AS pending_items;

-- ============================================================================
-- 13. COMMENTS
-- ============================================================================

COMMENT ON FUNCTION trigger_order_completed_loyalty IS 'Trigger: Award points when order completed';
COMMENT ON FUNCTION trigger_review_approved_loyalty IS 'Trigger: Award points when review approved';
COMMENT ON FUNCTION trigger_referral_completed_loyalty IS 'Trigger: Award points when referral completed';
COMMENT ON FUNCTION trigger_account_welcome_bonus IS 'Trigger: Award welcome bonus on signup';
COMMENT ON FUNCTION trigger_profile_complete_loyalty IS 'Trigger: Award points on 100% profile completion';
COMMENT ON FUNCTION trigger_ingredient_approved_loyalty IS 'Trigger: Award points for approved ingredient';
COMMENT ON FUNCTION trigger_check_tier_on_points_change IS 'Trigger: Check tier upgrade on points change';
COMMENT ON FUNCTION expire_old_redemptions IS 'Scheduled: Expire old redemptions';
COMMENT ON FUNCTION award_subscription_anniversaries IS 'Scheduled: Award merchant anniversary points';
COMMENT ON FUNCTION record_daily_login IS 'Record daily login and award streak points';
COMMENT ON TABLE login_streaks IS 'Track user login streaks for bonus points';

-- ============================================================================
-- 14. RLS FOR NEW TABLE
-- ============================================================================

ALTER TABLE login_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own streaks" ON login_streaks
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

CREATE POLICY "Service role manages streaks" ON login_streaks
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
