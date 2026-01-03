-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 12: CONFIGURABLE LOYALTY REWARDS
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-03
-- Description: Fully configurable rewards, tiers, and redemption system
--              Admin GudBro can create, modify, disable rewards
-- ============================================================================

-- ============================================================================
-- 1. LOYALTY TIERS (Configurable)
-- ============================================================================

DROP TABLE IF EXISTS loyalty_tiers CASCADE;

CREATE TABLE loyalty_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Tier identity
    tier_name TEXT NOT NULL UNIQUE,              -- 'bronze', 'silver', 'gold', 'platinum', 'diamond'
    display_name TEXT NOT NULL,                  -- 'Bronze Member', 'Silver Elite'
    tier_order INTEGER NOT NULL UNIQUE,          -- 1, 2, 3, 4... for progression

    -- Requirements
    points_threshold INTEGER NOT NULL,           -- Points needed to reach this tier

    -- Benefits (configurable JSON)
    benefits JSONB NOT NULL DEFAULT '{}',
    /*
    Examples:
    {
        "discount_percent": 5,
        "priority_support": true,
        "early_access": true,
        "free_delivery": false,
        "points_multiplier": 1.5,
        "exclusive_rewards": true
    }
    */

    -- Visual
    badge_url TEXT,
    color_hex TEXT,                              -- '#CD7F32' for bronze, '#C0C0C0' silver, etc.

    -- Status
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID REFERENCES accounts(id),
    updated_by UUID REFERENCES accounts(id)
);

-- Insert default tiers
INSERT INTO loyalty_tiers (tier_name, display_name, tier_order, points_threshold, benefits, color_hex) VALUES
    ('bronze', 'Bronze', 1, 0, '{"discount_percent": 0, "points_multiplier": 1.0}', '#CD7F32'),
    ('silver', 'Silver', 2, 1000, '{"discount_percent": 5, "points_multiplier": 1.25, "priority_support": true}', '#C0C0C0'),
    ('gold', 'Gold', 3, 5000, '{"discount_percent": 10, "points_multiplier": 1.5, "priority_support": true, "early_access": true}', '#FFD700'),
    ('platinum', 'Platinum', 4, 10000, '{"discount_percent": 15, "points_multiplier": 2.0, "priority_support": true, "early_access": true, "exclusive_rewards": true}', '#E5E4E2')
ON CONFLICT (tier_name) DO NOTHING;

-- ============================================================================
-- 2. LOYALTY REWARDS (Configurable Catalog)
-- ============================================================================

DROP TABLE IF EXISTS loyalty_rewards CASCADE;

CREATE TABLE loyalty_rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Reward identity
    code TEXT NOT NULL UNIQUE,                   -- 'BADGE_FOODIE', 'DISCOUNT_5EUR', 'FREE_MONTH'
    name TEXT NOT NULL,                          -- 'Foodie Explorer Badge'
    description TEXT,

    -- Type and value
    reward_type TEXT NOT NULL CHECK (reward_type IN (
        'badge',                -- Visual badge on profile
        'discount_fixed',       -- Fixed amount discount (e.g., €5 off)
        'discount_percent',     -- Percentage discount (e.g., 10% off)
        'subscription_days',    -- Free subscription days
        'feature_access',       -- Access to premium feature
        'physical_item',        -- Merchandise, swag
        'experience',           -- VIP event, tasting, etc.
        'custom'                -- Custom reward handled externally
    )),

    reward_value JSONB NOT NULL DEFAULT '{}',
    /*
    Examples by type:
    - badge: {"badge_name": "Foodie Explorer", "badge_url": "https://...", "badge_description": "..."}
    - discount_fixed: {"amount": 5, "currency": "EUR", "min_order": 20}
    - discount_percent: {"percent": 10, "max_discount": 50}
    - subscription_days: {"days": 30, "plan_type": "premium"}
    - feature_access: {"feature": "analytics_advanced", "duration_days": 90}
    - physical_item: {"item_name": "GudBro T-Shirt", "sizes": ["S","M","L","XL"]}
    - experience: {"event_type": "vip_tasting", "description": "..."}
    */

    -- Cost
    points_required INTEGER NOT NULL,

    -- Targeting
    target_audience TEXT NOT NULL DEFAULT 'both' CHECK (target_audience IN (
        'consumer', 'merchant', 'both'
    )),
    min_tier TEXT,                               -- Minimum tier required (NULL = any)

    -- Availability
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,  -- Show prominently
    available_from TIMESTAMPTZ,                  -- Start date (NULL = immediate)
    available_until TIMESTAMPTZ,                 -- End date (NULL = no expiry)

    -- Limits
    max_redemptions_total INTEGER,               -- NULL = unlimited
    max_redemptions_per_user INTEGER,            -- NULL = unlimited
    current_redemptions INTEGER NOT NULL DEFAULT 0,

    -- Visual
    image_url TEXT,
    category TEXT,                               -- 'badges', 'discounts', 'subscriptions', 'exclusive'
    sort_order INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID REFERENCES accounts(id),
    updated_by UUID REFERENCES accounts(id)
);

-- Insert default rewards
INSERT INTO loyalty_rewards (code, name, description, reward_type, reward_value, points_required, target_audience, category, sort_order) VALUES
    -- Badges (Consumer)
    ('BADGE_FOODIE_EXPLORER', 'Foodie Explorer', 'You have explored many restaurants!', 'badge',
     '{"badge_name": "Foodie Explorer", "badge_description": "Visited 10+ restaurants"}',
     500, 'consumer', 'badges', 10),
    ('BADGE_FOOD_CHAMPION', 'Food Champion', 'A true food enthusiast!', 'badge',
     '{"badge_name": "Food Champion", "badge_description": "Earned 5000+ points"}',
     5000, 'consumer', 'badges', 20),

    -- Badges (Merchant)
    ('BADGE_GUDBRO_PARTNER', 'GudBro Partner', 'Official GudBro partner restaurant', 'badge',
     '{"badge_name": "GudBro Partner", "badge_description": "Verified partner"}',
     500, 'merchant', 'badges', 10),
    ('BADGE_FOUNDING_PARTNER', 'Founding Partner', 'Early adopter with locked-in pricing', 'badge',
     '{"badge_name": "Founding Partner", "badge_description": "Early adopter since 2026"}',
     10000, 'merchant', 'badges', 20),

    -- Discounts (Consumer)
    ('DISCOUNT_5EUR', '€5 Off Next Order', 'Get €5 off your next order', 'discount_fixed',
     '{"amount": 5, "currency": "EUR", "min_order": 20, "valid_days": 30}',
     1000, 'consumer', 'discounts', 10),
    ('DISCOUNT_10EUR', '€10 Off Next Order', 'Get €10 off your next order', 'discount_fixed',
     '{"amount": 10, "currency": "EUR", "min_order": 40, "valid_days": 30}',
     2000, 'consumer', 'discounts', 20),

    -- Discounts (Merchant)
    ('DISCOUNT_10PERCENT_SUB', '10% Off Next Month', '10% discount on next subscription month', 'discount_percent',
     '{"percent": 10, "applies_to": "subscription", "valid_days": 60}',
     1000, 'merchant', 'discounts', 10),

    -- Subscription rewards
    ('FREE_MONTH_CONSUMER', '1 Month Premium Free', 'One month of Premium subscription', 'subscription_days',
     '{"days": 30, "plan_type": "consumer_premium"}',
     2500, 'consumer', 'subscriptions', 10),
    ('FREE_MONTH_MERCHANT', '1 Month Subscription Free', 'One month of merchant subscription', 'subscription_days',
     '{"days": 30, "plan_type": "merchant_standard"}',
     2500, 'merchant', 'subscriptions', 10),

    -- Feature access
    ('BETA_ACCESS', 'Beta Features Access', 'Early access to new features for 90 days', 'feature_access',
     '{"feature": "beta_features", "duration_days": 90}',
     5000, 'both', 'exclusive', 10),

    -- Lifetime (very high cost)
    ('LIFETIME_PREMIUM', 'Lifetime Premium', 'Premium membership forever!', 'subscription_days',
     '{"days": 36500, "plan_type": "consumer_premium", "is_lifetime": true}',
     10000, 'consumer', 'exclusive', 100)
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 3. REWARD REDEMPTIONS (User redeems rewards)
-- ============================================================================

DROP TABLE IF EXISTS reward_redemptions CASCADE;

CREATE TABLE reward_redemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Who and what
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    reward_id UUID NOT NULL REFERENCES loyalty_rewards(id),

    -- Snapshot of reward at time of redemption (in case reward changes later)
    reward_snapshot JSONB NOT NULL,
    points_spent INTEGER NOT NULL,

    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',      -- Awaiting processing
        'approved',     -- Approved, ready to use
        'used',         -- Already used/applied
        'expired',      -- Expired before use
        'cancelled',    -- Cancelled by user or admin
        'rejected'      -- Rejected by admin
    )),

    -- For discounts: generated code
    redemption_code TEXT UNIQUE,                 -- 'DISC-ABC123'

    -- Usage tracking
    used_at TIMESTAMPTZ,
    used_on_order_id UUID,                       -- If used on an order

    -- Validity
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ,                     -- Calculated from reward_value.valid_days

    -- Admin notes
    admin_notes TEXT,
    processed_by UUID REFERENCES accounts(id),
    processed_at TIMESTAMPTZ,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

-- Tiers
CREATE INDEX idx_loyalty_tiers_order ON loyalty_tiers(tier_order) WHERE is_active = TRUE;

-- Rewards
CREATE INDEX idx_loyalty_rewards_active ON loyalty_rewards(is_active, sort_order) WHERE is_active = TRUE;
CREATE INDEX idx_loyalty_rewards_audience ON loyalty_rewards(target_audience) WHERE is_active = TRUE;
CREATE INDEX idx_loyalty_rewards_category ON loyalty_rewards(category) WHERE is_active = TRUE;
CREATE INDEX idx_loyalty_rewards_points ON loyalty_rewards(points_required) WHERE is_active = TRUE;

-- Redemptions
CREATE INDEX idx_reward_redemptions_account ON reward_redemptions(account_id);
CREATE INDEX idx_reward_redemptions_status ON reward_redemptions(status);
CREATE INDEX idx_reward_redemptions_code ON reward_redemptions(redemption_code) WHERE redemption_code IS NOT NULL;

-- ============================================================================
-- 5. HELPER FUNCTIONS
-- ============================================================================

-- Drop existing functions
DROP FUNCTION IF EXISTS get_available_rewards CASCADE;
DROP FUNCTION IF EXISTS redeem_reward CASCADE;
DROP FUNCTION IF EXISTS use_redemption CASCADE;
DROP FUNCTION IF EXISTS get_my_redemptions CASCADE;
DROP FUNCTION IF EXISTS admin_create_reward CASCADE;
DROP FUNCTION IF EXISTS admin_update_reward CASCADE;
DROP FUNCTION IF EXISTS get_tier_for_points CASCADE;
DROP FUNCTION IF EXISTS check_and_upgrade_tier CASCADE;

-- Get tier for given points
CREATE OR REPLACE FUNCTION get_tier_for_points(p_points INTEGER)
RETURNS TABLE(
    tier_name TEXT,
    display_name TEXT,
    tier_order INTEGER,
    benefits JSONB,
    color_hex TEXT,
    next_tier_name TEXT,
    next_tier_points INTEGER,
    points_to_next INTEGER
) AS $$
BEGIN
    RETURN QUERY
    WITH current_tier AS (
        SELECT lt.*
        FROM loyalty_tiers lt
        WHERE lt.points_threshold <= p_points
        AND lt.is_active = TRUE
        ORDER BY lt.tier_order DESC
        LIMIT 1
    ),
    next_tier AS (
        SELECT lt.tier_name, lt.points_threshold
        FROM loyalty_tiers lt
        WHERE lt.points_threshold > p_points
        AND lt.is_active = TRUE
        ORDER BY lt.tier_order ASC
        LIMIT 1
    )
    SELECT
        ct.tier_name,
        ct.display_name,
        ct.tier_order,
        ct.benefits,
        ct.color_hex,
        nt.tier_name AS next_tier_name,
        nt.points_threshold AS next_tier_points,
        COALESCE(nt.points_threshold - p_points, 0) AS points_to_next
    FROM current_tier ct
    LEFT JOIN next_tier nt ON TRUE;
END;
$$ LANGUAGE plpgsql STABLE;

-- Check and upgrade tier if needed
CREATE OR REPLACE FUNCTION check_and_upgrade_tier(p_account_id UUID)
RETURNS TEXT AS $$
DECLARE
    v_current_tier TEXT;
    v_new_tier TEXT;
    v_total_points INTEGER;
    v_bonus_points INTEGER;
BEGIN
    -- Get current status
    SELECT loyalty_tier, points_balance INTO v_current_tier, v_total_points
    FROM accounts WHERE id = p_account_id;

    -- Get new tier based on points
    SELECT tier_name INTO v_new_tier
    FROM get_tier_for_points(v_total_points);

    -- If tier changed, update and award bonus
    IF v_new_tier IS NOT NULL AND v_new_tier != v_current_tier THEN
        -- Get tier order to check if it's an upgrade
        DECLARE
            v_old_order INTEGER;
            v_new_order INTEGER;
        BEGIN
            SELECT tier_order INTO v_old_order FROM loyalty_tiers WHERE tier_name = v_current_tier;
            SELECT tier_order INTO v_new_order FROM loyalty_tiers WHERE tier_name = v_new_tier;

            -- Only process if it's an upgrade
            IF v_new_order > v_old_order THEN
                -- Update tier
                UPDATE accounts SET
                    loyalty_tier = v_new_tier,
                    updated_at = NOW()
                WHERE id = p_account_id;

                -- Award tier bonus from loyalty_config
                SELECT points INTO v_bonus_points
                FROM loyalty_config
                WHERE action_type = 'tier_' || v_new_tier AND is_active = TRUE;

                IF v_bonus_points > 0 THEN
                    INSERT INTO points_transactions (
                        account_id, points, transaction_type, action_type,
                        description
                    ) VALUES (
                        p_account_id, v_bonus_points, 'earn', 'tier_upgrade',
                        'Tier upgrade bonus: ' || v_new_tier
                    );

                    UPDATE accounts SET
                        points_balance = points_balance + v_bonus_points,
                        points_earned = points_earned + v_bonus_points
                    WHERE id = p_account_id;
                END IF;
            END IF;
        END;
    END IF;

    RETURN v_new_tier;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Get available rewards for a user
CREATE OR REPLACE FUNCTION get_available_rewards(
    p_account_id UUID,
    p_category TEXT DEFAULT NULL
)
RETURNS TABLE(
    id UUID,
    code TEXT,
    name TEXT,
    description TEXT,
    reward_type TEXT,
    reward_value JSONB,
    points_required INTEGER,
    image_url TEXT,
    category TEXT,
    is_featured BOOLEAN,
    can_redeem BOOLEAN,
    times_redeemed INTEGER,
    max_per_user INTEGER
) AS $$
DECLARE
    v_account_points INTEGER;
    v_account_tier TEXT;
    v_is_merchant BOOLEAN;
BEGIN
    -- Get account info
    SELECT points_balance, loyalty_tier INTO v_account_points, v_account_tier
    FROM accounts WHERE id = p_account_id;

    -- Check if merchant
    SELECT EXISTS (
        SELECT 1 FROM account_roles
        WHERE account_id = p_account_id AND role_type = 'merchant' AND is_active = TRUE
    ) INTO v_is_merchant;

    RETURN QUERY
    SELECT
        r.id,
        r.code,
        r.name,
        r.description,
        r.reward_type,
        r.reward_value,
        r.points_required,
        r.image_url,
        r.category,
        r.is_featured,
        -- Can redeem check
        (
            v_account_points >= r.points_required
            AND (r.max_redemptions_total IS NULL OR r.current_redemptions < r.max_redemptions_total)
            AND (r.max_redemptions_per_user IS NULL OR
                 (SELECT COUNT(*) FROM reward_redemptions rr
                  WHERE rr.account_id = p_account_id AND rr.reward_id = r.id
                  AND rr.status NOT IN ('cancelled', 'rejected')) < r.max_redemptions_per_user)
            AND (r.min_tier IS NULL OR
                 (SELECT tier_order FROM loyalty_tiers WHERE tier_name = v_account_tier) >=
                 (SELECT tier_order FROM loyalty_tiers WHERE tier_name = r.min_tier))
        ) AS can_redeem,
        -- Times this user has redeemed
        (SELECT COUNT(*)::INTEGER FROM reward_redemptions rr
         WHERE rr.account_id = p_account_id AND rr.reward_id = r.id
         AND rr.status NOT IN ('cancelled', 'rejected')) AS times_redeemed,
        r.max_redemptions_per_user AS max_per_user
    FROM loyalty_rewards r
    WHERE r.is_active = TRUE
    AND (r.available_from IS NULL OR r.available_from <= NOW())
    AND (r.available_until IS NULL OR r.available_until > NOW())
    AND (r.target_audience = 'both'
         OR (r.target_audience = 'consumer' AND NOT v_is_merchant)
         OR (r.target_audience = 'merchant' AND v_is_merchant))
    AND (p_category IS NULL OR r.category = p_category)
    ORDER BY r.is_featured DESC, r.sort_order, r.points_required;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Redeem a reward
CREATE OR REPLACE FUNCTION redeem_reward(
    p_account_id UUID,
    p_reward_id UUID
)
RETURNS UUID AS $$
DECLARE
    v_reward RECORD;
    v_account RECORD;
    v_can_redeem BOOLEAN;
    v_redemption_id UUID;
    v_redemption_code TEXT;
    v_valid_until TIMESTAMPTZ;
    v_valid_days INTEGER;
BEGIN
    -- Get reward details
    SELECT * INTO v_reward FROM loyalty_rewards WHERE id = p_reward_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Reward not found';
    END IF;

    -- Get account details
    SELECT * INTO v_account FROM accounts WHERE id = p_account_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Account not found';
    END IF;

    -- Check if can redeem (via the function)
    SELECT can_redeem INTO v_can_redeem
    FROM get_available_rewards(p_account_id, NULL)
    WHERE id = p_reward_id;

    IF NOT v_can_redeem THEN
        RAISE EXCEPTION 'Cannot redeem this reward. Check points balance, limits, or tier requirements.';
    END IF;

    -- Generate redemption code for discounts
    IF v_reward.reward_type IN ('discount_fixed', 'discount_percent') THEN
        v_redemption_code := 'DISC-' || UPPER(SUBSTRING(gen_random_uuid()::TEXT, 1, 8));
    END IF;

    -- Calculate valid_until
    v_valid_days := (v_reward.reward_value->>'valid_days')::INTEGER;
    IF v_valid_days IS NOT NULL THEN
        v_valid_until := NOW() + (v_valid_days || ' days')::INTERVAL;
    END IF;

    -- Create redemption
    INSERT INTO reward_redemptions (
        account_id, reward_id, reward_snapshot, points_spent,
        status, redemption_code, valid_until
    ) VALUES (
        p_account_id, p_reward_id,
        jsonb_build_object(
            'code', v_reward.code,
            'name', v_reward.name,
            'type', v_reward.reward_type,
            'value', v_reward.reward_value
        ),
        v_reward.points_required,
        CASE WHEN v_reward.reward_type = 'badge' THEN 'used' ELSE 'approved' END,
        v_redemption_code,
        v_valid_until
    )
    RETURNING id INTO v_redemption_id;

    -- Deduct points
    UPDATE accounts SET
        points_balance = points_balance - v_reward.points_required,
        points_spent = points_spent + v_reward.points_required,
        updated_at = NOW()
    WHERE id = p_account_id;

    -- Log transaction
    INSERT INTO points_transactions (
        account_id, points, transaction_type, action_type,
        reference_type, reference_id, description
    ) VALUES (
        p_account_id, -v_reward.points_required, 'spend', 'reward_redemption',
        'reward', v_redemption_id,
        'Redeemed: ' || v_reward.name
    );

    -- Update reward redemption count
    UPDATE loyalty_rewards SET
        current_redemptions = current_redemptions + 1,
        updated_at = NOW()
    WHERE id = p_reward_id;

    -- If badge, add to account badges
    IF v_reward.reward_type = 'badge' THEN
        UPDATE accounts SET
            badges = COALESCE(badges, '[]'::JSONB) || jsonb_build_object(
                'code', v_reward.code,
                'name', v_reward.reward_value->>'badge_name',
                'earned_at', NOW()
            ),
            updated_at = NOW()
        WHERE id = p_account_id;
    END IF;

    RETURN v_redemption_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Use a redemption (for discounts, etc.)
CREATE OR REPLACE FUNCTION use_redemption(
    p_redemption_id UUID,
    p_order_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_redemption RECORD;
BEGIN
    SELECT * INTO v_redemption FROM reward_redemptions WHERE id = p_redemption_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Redemption not found';
    END IF;

    IF v_redemption.status != 'approved' THEN
        RAISE EXCEPTION 'Redemption is not in approved status';
    END IF;

    IF v_redemption.valid_until IS NOT NULL AND v_redemption.valid_until < NOW() THEN
        UPDATE reward_redemptions SET status = 'expired', updated_at = NOW()
        WHERE id = p_redemption_id;
        RAISE EXCEPTION 'Redemption has expired';
    END IF;

    UPDATE reward_redemptions SET
        status = 'used',
        used_at = NOW(),
        used_on_order_id = p_order_id,
        updated_at = NOW()
    WHERE id = p_redemption_id;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Get user's redemptions
CREATE OR REPLACE FUNCTION get_my_redemptions(
    p_account_id UUID,
    p_status TEXT DEFAULT NULL
)
RETURNS TABLE(
    id UUID,
    reward_code TEXT,
    reward_name TEXT,
    reward_type TEXT,
    points_spent INTEGER,
    status TEXT,
    redemption_code TEXT,
    valid_until TIMESTAMPTZ,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        rr.id,
        (rr.reward_snapshot->>'code')::TEXT AS reward_code,
        (rr.reward_snapshot->>'name')::TEXT AS reward_name,
        (rr.reward_snapshot->>'type')::TEXT AS reward_type,
        rr.points_spent,
        rr.status,
        rr.redemption_code,
        rr.valid_until,
        rr.used_at,
        rr.created_at
    FROM reward_redemptions rr
    WHERE rr.account_id = p_account_id
    AND (p_status IS NULL OR rr.status = p_status)
    ORDER BY rr.created_at DESC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. ADMIN FUNCTIONS
-- ============================================================================

-- Admin: Create reward
CREATE OR REPLACE FUNCTION admin_create_reward(
    p_admin_id UUID,
    p_code TEXT,
    p_name TEXT,
    p_description TEXT,
    p_reward_type TEXT,
    p_reward_value JSONB,
    p_points_required INTEGER,
    p_target_audience TEXT DEFAULT 'both',
    p_category TEXT DEFAULT 'general',
    p_min_tier TEXT DEFAULT NULL,
    p_max_redemptions_total INTEGER DEFAULT NULL,
    p_max_redemptions_per_user INTEGER DEFAULT NULL,
    p_available_from TIMESTAMPTZ DEFAULT NULL,
    p_available_until TIMESTAMPTZ DEFAULT NULL,
    p_image_url TEXT DEFAULT NULL,
    p_is_featured BOOLEAN DEFAULT FALSE
)
RETURNS UUID AS $$
DECLARE
    v_reward_id UUID;
BEGIN
    INSERT INTO loyalty_rewards (
        code, name, description, reward_type, reward_value,
        points_required, target_audience, category, min_tier,
        max_redemptions_total, max_redemptions_per_user,
        available_from, available_until, image_url, is_featured,
        created_by
    ) VALUES (
        p_code, p_name, p_description, p_reward_type, p_reward_value,
        p_points_required, p_target_audience, p_category, p_min_tier,
        p_max_redemptions_total, p_max_redemptions_per_user,
        p_available_from, p_available_until, p_image_url, p_is_featured,
        p_admin_id
    )
    RETURNING id INTO v_reward_id;

    RETURN v_reward_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Admin: Update reward
CREATE OR REPLACE FUNCTION admin_update_reward(
    p_admin_id UUID,
    p_reward_id UUID,
    p_updates JSONB
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE loyalty_rewards SET
        name = COALESCE(p_updates->>'name', name),
        description = COALESCE(p_updates->>'description', description),
        points_required = COALESCE((p_updates->>'points_required')::INTEGER, points_required),
        is_active = COALESCE((p_updates->>'is_active')::BOOLEAN, is_active),
        is_featured = COALESCE((p_updates->>'is_featured')::BOOLEAN, is_featured),
        target_audience = COALESCE(p_updates->>'target_audience', target_audience),
        category = COALESCE(p_updates->>'category', category),
        min_tier = COALESCE(p_updates->>'min_tier', min_tier),
        max_redemptions_total = COALESCE((p_updates->>'max_redemptions_total')::INTEGER, max_redemptions_total),
        max_redemptions_per_user = COALESCE((p_updates->>'max_redemptions_per_user')::INTEGER, max_redemptions_per_user),
        available_from = COALESCE((p_updates->>'available_from')::TIMESTAMPTZ, available_from),
        available_until = COALESCE((p_updates->>'available_until')::TIMESTAMPTZ, available_until),
        image_url = COALESCE(p_updates->>'image_url', image_url),
        reward_value = COALESCE(p_updates->'reward_value', reward_value),
        updated_at = NOW(),
        updated_by = p_admin_id
    WHERE id = p_reward_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Admin: Delete/deactivate reward
CREATE OR REPLACE FUNCTION admin_deactivate_reward(
    p_admin_id UUID,
    p_reward_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE loyalty_rewards SET
        is_active = FALSE,
        updated_at = NOW(),
        updated_by = p_admin_id
    WHERE id = p_reward_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Admin: Update tier
CREATE OR REPLACE FUNCTION admin_update_tier(
    p_admin_id UUID,
    p_tier_id UUID,
    p_updates JSONB
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE loyalty_tiers SET
        display_name = COALESCE(p_updates->>'display_name', display_name),
        points_threshold = COALESCE((p_updates->>'points_threshold')::INTEGER, points_threshold),
        benefits = COALESCE(p_updates->'benefits', benefits),
        badge_url = COALESCE(p_updates->>'badge_url', badge_url),
        color_hex = COALESCE(p_updates->>'color_hex', color_hex),
        is_active = COALESCE((p_updates->>'is_active')::BOOLEAN, is_active),
        updated_at = NOW(),
        updated_by = p_admin_id
    WHERE id = p_tier_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. ADD BADGES COLUMN TO ACCOUNTS
-- ============================================================================

ALTER TABLE accounts ADD COLUMN IF NOT EXISTS badges JSONB DEFAULT '[]';

-- ============================================================================
-- 8. VIEWS
-- ============================================================================

-- All rewards with stats
CREATE OR REPLACE VIEW v_rewards_admin AS
SELECT
    r.*,
    (SELECT COUNT(*) FROM reward_redemptions rr WHERE rr.reward_id = r.id) AS total_redemptions,
    (SELECT COUNT(*) FROM reward_redemptions rr WHERE rr.reward_id = r.id AND rr.status = 'used') AS used_redemptions,
    (SELECT SUM(rr.points_spent) FROM reward_redemptions rr WHERE rr.reward_id = r.id) AS total_points_spent,
    a.display_name AS created_by_name
FROM loyalty_rewards r
LEFT JOIN accounts a ON a.id = r.created_by
ORDER BY r.created_at DESC;

-- Tier progression view
CREATE OR REPLACE VIEW v_tier_progression AS
SELECT
    t1.tier_name,
    t1.display_name,
    t1.points_threshold,
    t1.tier_order,
    t1.benefits,
    t1.color_hex,
    t2.tier_name AS next_tier,
    t2.points_threshold AS next_tier_points,
    t2.points_threshold - t1.points_threshold AS points_between
FROM loyalty_tiers t1
LEFT JOIN loyalty_tiers t2 ON t2.tier_order = t1.tier_order + 1 AND t2.is_active = TRUE
WHERE t1.is_active = TRUE
ORDER BY t1.tier_order;

-- ============================================================================
-- 9. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE loyalty_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;

-- Tiers: everyone can read
CREATE POLICY "Anyone can view tiers" ON loyalty_tiers FOR SELECT USING (TRUE);
CREATE POLICY "Service role manages tiers" ON loyalty_tiers FOR ALL USING (auth.role() = 'service_role');

-- Rewards: everyone can read active, admins manage all
CREATE POLICY "Anyone can view active rewards" ON loyalty_rewards FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Service role manages rewards" ON loyalty_rewards FOR ALL USING (auth.role() = 'service_role');

-- Redemptions: users see own, admins see all
CREATE POLICY "Users view own redemptions" ON reward_redemptions
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Users create own redemptions" ON reward_redemptions
    FOR INSERT WITH CHECK (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages redemptions" ON reward_redemptions
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 10. COMMENTS
-- ============================================================================

COMMENT ON TABLE loyalty_tiers IS 'Configurable loyalty tiers with benefits';
COMMENT ON TABLE loyalty_rewards IS 'Catalog of redeemable rewards - fully configurable by admin';
COMMENT ON TABLE reward_redemptions IS 'User reward redemptions with status tracking';
COMMENT ON FUNCTION get_tier_for_points IS 'Get tier info for given points amount';
COMMENT ON FUNCTION check_and_upgrade_tier IS 'Check and upgrade user tier if points qualify';
COMMENT ON FUNCTION get_available_rewards IS 'Get rewards available to a specific user';
COMMENT ON FUNCTION redeem_reward IS 'Redeem a reward, deducting points';
COMMENT ON FUNCTION admin_create_reward IS 'Admin: Create new reward';
COMMENT ON FUNCTION admin_update_reward IS 'Admin: Update existing reward';
COMMENT ON FUNCTION admin_deactivate_reward IS 'Admin: Deactivate (soft delete) reward';
COMMENT ON FUNCTION admin_update_tier IS 'Admin: Update tier configuration';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
