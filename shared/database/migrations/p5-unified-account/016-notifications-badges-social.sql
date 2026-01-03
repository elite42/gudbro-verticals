-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 16: NOTIFICATIONS, BADGES & SOCIAL SHARE
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-03
-- Description: Personalized notifications, gamification badges, and social
--              sharing for user engagement and viral growth
-- ============================================================================

-- ============================================================================
-- 1. PERSONALIZED NOTIFICATIONS SYSTEM
-- ============================================================================
-- Smart notifications based on user preferences and behavior

CREATE TABLE IF NOT EXISTS notification_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Template identity
    template_code TEXT NOT NULL UNIQUE,
    template_name TEXT NOT NULL,

    -- Content
    title_template TEXT NOT NULL,       -- "{{merchant_name}} added a new {{diet_type}} dish!"
    body_template TEXT NOT NULL,        -- "Check out {{dish_name}} - matches your preferences"
    icon TEXT,                          -- Emoji or icon URL
    action_url_template TEXT,           -- "/menu/{{merchant_id}}/{{product_id}}"

    -- Targeting
    target_audience TEXT NOT NULL DEFAULT 'all' CHECK (target_audience IN (
        'all', 'consumer', 'merchant', 'premium'
    )),
    trigger_event TEXT NOT NULL,        -- 'new_dish', 'promo', 'wishlist_available', etc.

    -- Channels
    send_push BOOLEAN DEFAULT TRUE,
    send_email BOOLEAN DEFAULT FALSE,
    send_in_app BOOLEAN DEFAULT TRUE,

    -- Status
    is_active BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert default templates
INSERT INTO notification_templates (template_code, template_name, title_template, body_template, icon, trigger_event, target_audience) VALUES
    -- Consumer notifications
    ('new_dish_match', 'New Dish Matches Preferences',
     '{{merchant_name}} added something for you!',
     '{{dish_name}} matches your {{preference_type}} preferences',
     '🍽️', 'new_dish_match', 'consumer'),

    ('wishlist_promo', 'Wishlist Item on Promo',
     'Your wishlist item is on sale!',
     '{{dish_name}} at {{merchant_name}} is now {{discount}}% off',
     '🎉', 'wishlist_promo', 'consumer'),

    ('wishlist_available', 'Wishlist Item Available',
     '{{dish_name}} is back!',
     'The item you wanted at {{merchant_name}} is available again',
     '✨', 'wishlist_available', 'consumer'),

    ('points_earned', 'Points Earned',
     '+{{points}} points earned!',
     'You earned points for {{action}}. Total: {{total_points}}',
     '🎯', 'points_earned', 'all'),

    ('tier_upgrade', 'Tier Upgrade',
     'Congratulations! You reached {{tier_name}}!',
     'Enjoy your new benefits as a {{tier_name}} member',
     '🏆', 'tier_upgrade', 'all'),

    ('points_expiring', 'Points Expiring Soon',
     '{{points}} points expiring soon',
     'Use your points before {{expiry_date}} or they will expire',
     '⏰', 'points_expiring', 'all'),

    ('review_response', 'Merchant Responded',
     '{{merchant_name}} responded to your review',
     'See what they said about your feedback',
     '💬', 'review_response', 'consumer'),

    ('badge_earned', 'New Badge Earned',
     'You earned a new badge!',
     'Congratulations on earning "{{badge_name}}"',
     '🏅', 'badge_earned', 'all'),

    -- Merchant notifications
    ('new_review', 'New Review',
     'New {{rating}}-star review',
     '{{reviewer_name}} left a review for {{product_name}}',
     '⭐', 'new_review', 'merchant'),

    ('daily_summary', 'Daily Summary',
     'Your daily summary is ready',
     '{{orders_count}} orders, {{revenue}} revenue, {{new_reviews}} reviews',
     '📊', 'daily_summary', 'merchant')
ON CONFLICT (template_code) DO NOTHING;

-- User notification queue
CREATE TABLE IF NOT EXISTS user_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Recipient
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Template and content
    template_id UUID REFERENCES notification_templates(id),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    icon TEXT,
    action_url TEXT,

    -- Data
    data JSONB DEFAULT '{}',  -- Template variables and extra data

    -- Delivery
    channels_sent JSONB DEFAULT '[]',  -- ['push', 'email', 'in_app']
    push_sent_at TIMESTAMPTZ,
    email_sent_at TIMESTAMPTZ,

    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    is_clicked BOOLEAN DEFAULT FALSE,
    clicked_at TIMESTAMPTZ,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    expires_at TIMESTAMPTZ  -- Optional expiry
);

-- ============================================================================
-- 2. BADGES/GAMIFICATION SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS badge_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Badge identity
    badge_code TEXT NOT NULL UNIQUE,
    badge_name TEXT NOT NULL,
    description TEXT NOT NULL,

    -- Visual
    icon_emoji TEXT,                    -- '🏆', '🌟', etc.
    icon_url TEXT,                      -- Custom icon URL
    color_hex TEXT,                     -- '#FFD700' for gold

    -- Category
    category TEXT NOT NULL CHECK (category IN (
        'explorer',      -- Visiting places
        'foodie',        -- Trying dishes
        'contributor',   -- Contributing content
        'social',        -- Social actions
        'loyalty',       -- Loyalty milestones
        'special',       -- Limited/seasonal
        'merchant'       -- Merchant-specific
    )),

    -- Requirements
    requirement_type TEXT NOT NULL CHECK (requirement_type IN (
        'count',         -- Do X things Y times
        'milestone',     -- Reach a milestone
        'streak',        -- Do X for Y days
        'special',       -- Special criteria
        'manual'         -- Manually awarded
    )),
    requirement_config JSONB NOT NULL,
    /*
    Examples:
    - count: {"action": "visit_merchant", "count": 10}
    - milestone: {"field": "points_earned", "value": 1000}
    - streak: {"action": "daily_login", "days": 7}
    - special: {"condition": "first_100_users"}
    */

    -- Rewards
    points_reward INTEGER DEFAULT 0,
    tier_requirement TEXT,              -- Minimum tier to earn

    -- Rarity
    rarity TEXT NOT NULL DEFAULT 'common' CHECK (rarity IN (
        'common', 'uncommon', 'rare', 'epic', 'legendary'
    )),

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_hidden BOOLEAN DEFAULT FALSE,    -- Secret badge

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert default badges
INSERT INTO badge_definitions (badge_code, badge_name, description, icon_emoji, category, requirement_type, requirement_config, points_reward, rarity) VALUES
    -- Explorer badges
    ('first_visit', 'First Steps', 'Visit your first GudBro restaurant', '👣', 'explorer', 'count',
     '{"action": "visit_merchant", "count": 1}', 10, 'common'),
    ('explorer_10', 'Explorer', 'Visit 10 different restaurants', '🗺️', 'explorer', 'count',
     '{"action": "visit_merchant_unique", "count": 10}', 50, 'common'),
    ('explorer_50', 'Adventurer', 'Visit 50 different restaurants', '🧭', 'explorer', 'count',
     '{"action": "visit_merchant_unique", "count": 50}', 200, 'uncommon'),
    ('explorer_100', 'World Traveler', 'Visit 100 different restaurants', '🌍', 'explorer', 'count',
     '{"action": "visit_merchant_unique", "count": 100}', 500, 'rare'),

    -- Foodie badges
    ('first_order', 'First Bite', 'Place your first order', '🍴', 'foodie', 'count',
     '{"action": "order_completed", "count": 1}', 25, 'common'),
    ('variety_5', 'Curious Palate', 'Try 5 different cuisine types', '🍜', 'foodie', 'count',
     '{"action": "cuisine_tried", "count": 5}', 75, 'common'),
    ('variety_15', 'Culinary Explorer', 'Try 15 different cuisine types', '🌮', 'foodie', 'count',
     '{"action": "cuisine_tried", "count": 15}', 200, 'uncommon'),
    ('vegan_champion', 'Vegan Champion', 'Order 25 vegan dishes', '🥗', 'foodie', 'count',
     '{"action": "order_vegan", "count": 25}', 150, 'uncommon'),
    ('spicy_lover', 'Heat Seeker', 'Order 20 spicy dishes', '🌶️', 'foodie', 'count',
     '{"action": "order_spicy", "count": 20}', 100, 'uncommon'),

    -- Contributor badges
    ('first_review', 'Voice Heard', 'Write your first review', '✍️', 'contributor', 'count',
     '{"action": "review_submitted", "count": 1}', 25, 'common'),
    ('reviewer_10', 'Critic', 'Write 10 reviews', '📝', 'contributor', 'count',
     '{"action": "review_approved", "count": 10}', 100, 'common'),
    ('reviewer_50', 'Food Critic', 'Write 50 reviews', '🎭', 'contributor', 'count',
     '{"action": "review_approved", "count": 50}', 300, 'uncommon'),
    ('helpful_10', 'Helpful Hand', 'Get 10 helpful votes on reviews', '👍', 'contributor', 'count',
     '{"action": "review_helpful_votes", "count": 10}', 50, 'common'),
    ('ingredient_pioneer', 'Ingredient Pioneer', 'Contribute 5 approved ingredients', '🧪', 'contributor', 'count',
     '{"action": "ingredient_approved", "count": 5}', 250, 'rare'),
    ('ingredient_master', 'Ingredient Master', 'Contribute 25 approved ingredients', '🔬', 'contributor', 'count',
     '{"action": "ingredient_approved", "count": 25}', 1000, 'epic'),

    -- Social badges
    ('first_share', 'Social Butterfly', 'Share a dish on social media', '🦋', 'social', 'count',
     '{"action": "social_share", "count": 1}', 15, 'common'),
    ('influencer', 'Influencer', 'Share 25 times', '📱', 'social', 'count',
     '{"action": "social_share", "count": 25}', 100, 'uncommon'),
    ('network_builder', 'Network Builder', 'Refer 5 friends who sign up', '🤝', 'social', 'count',
     '{"action": "referral_completed", "count": 5}', 250, 'rare'),
    ('ambassador', 'GudBro Ambassador', 'Refer 25 friends', '🌟', 'social', 'count',
     '{"action": "referral_completed", "count": 25}', 1000, 'epic'),

    -- Loyalty badges
    ('points_1000', 'Point Collector', 'Earn 1,000 lifetime points', '💎', 'loyalty', 'milestone',
     '{"field": "points_earned", "value": 1000}', 0, 'common'),
    ('points_5000', 'Point Master', 'Earn 5,000 lifetime points', '💰', 'loyalty', 'milestone',
     '{"field": "points_earned", "value": 5000}', 0, 'uncommon'),
    ('points_10000', 'Point Legend', 'Earn 10,000 lifetime points', '👑', 'loyalty', 'milestone',
     '{"field": "points_earned", "value": 10000}', 0, 'rare'),
    ('streak_7', 'Week Warrior', 'Login 7 days in a row', '🔥', 'loyalty', 'streak',
     '{"action": "daily_login", "days": 7}', 50, 'common'),
    ('streak_30', 'Monthly Master', 'Login 30 days in a row', '⚡', 'loyalty', 'streak',
     '{"action": "daily_login", "days": 30}', 200, 'uncommon'),
    ('streak_365', 'Year Champion', 'Login 365 days in a row', '🏅', 'loyalty', 'streak',
     '{"action": "daily_login", "days": 365}', 1000, 'legendary'),

    -- Special badges
    ('early_adopter', 'Early Adopter', 'Joined in the first year', '🚀', 'special', 'special',
     '{"condition": "joined_before_2027"}', 500, 'rare'),
    ('founding_member', 'Founding Member', 'One of the first 1000 users', '⭐', 'special', 'special',
     '{"condition": "first_1000_users"}', 1000, 'legendary'),

    -- Merchant badges
    ('merchant_partner', 'GudBro Partner', 'Become a GudBro merchant partner', '🏪', 'merchant', 'manual',
     '{"awarded_by": "admin"}', 500, 'rare'),
    ('merchant_star', 'Star Restaurant', 'Maintain 4.5+ rating with 50+ reviews', '⭐', 'merchant', 'special',
     '{"min_rating": 4.5, "min_reviews": 50}', 1000, 'epic')
ON CONFLICT (badge_code) DO NOTHING;

-- User earned badges
CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badge_definitions(id),

    -- Progress (for count-based badges)
    current_progress INTEGER DEFAULT 0,
    required_progress INTEGER,

    -- Status
    is_earned BOOLEAN DEFAULT FALSE,
    earned_at TIMESTAMPTZ,

    -- Display
    is_featured BOOLEAN DEFAULT FALSE,  -- Show on profile
    is_new BOOLEAN DEFAULT TRUE,        -- Not yet seen

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    UNIQUE(account_id, badge_id)
);

-- ============================================================================
-- 3. SOCIAL SHARE SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS social_shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Who shared
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- What was shared (content_type for API compatibility, share_type as alias)
    content_type TEXT NOT NULL CHECK (content_type IN (
        'product',      -- Dish/menu item
        'dish',         -- Alias for product
        'review',       -- Own review
        'badge',        -- Earned badge
        'achievement',  -- Milestone (e.g., 100 visits)
        'merchant',     -- Restaurant
        'recipe',       -- Recipe from DB
        'referral'      -- Referral link
    )),
    content_id UUID,    -- Optional, some shares don't have specific content

    -- Where shared
    platform TEXT NOT NULL CHECK (platform IN (
        'facebook', 'twitter', 'instagram', 'whatsapp',
        'telegram', 'linkedin', 'tiktok', 'email',
        'copy_link', 'native', 'other'
    )),

    -- Share content
    share_url TEXT,
    share_text TEXT,
    share_image_url TEXT,

    -- Tracking
    click_count INTEGER DEFAULT 0,
    last_clicked_at TIMESTAMPTZ,

    -- Conversion tracking
    signups_from_share INTEGER DEFAULT 0,
    orders_from_share INTEGER DEFAULT 0,

    -- Points awarded
    points_awarded INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Share click tracking
CREATE TABLE IF NOT EXISTS share_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    share_id UUID NOT NULL REFERENCES social_shares(id) ON DELETE CASCADE,

    -- Clicker info (anonymous)
    ip_hash TEXT,  -- Hashed IP for dedup
    user_agent TEXT,
    referrer TEXT,

    -- If they signed up
    resulting_account_id UUID REFERENCES accounts(id),
    converted_at TIMESTAMPTZ,

    -- Timestamps
    clicked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

-- Notification templates
CREATE INDEX idx_notif_templates_trigger ON notification_templates(trigger_event) WHERE is_active = TRUE;

-- User notifications
CREATE INDEX idx_user_notifs_account ON user_notifications(account_id);
CREATE INDEX idx_user_notifs_unread ON user_notifications(account_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_user_notifs_created ON user_notifications(created_at DESC);

-- Badge definitions
CREATE INDEX idx_badges_category ON badge_definitions(category) WHERE is_active = TRUE;
CREATE INDEX idx_badges_rarity ON badge_definitions(rarity);

-- User badges
CREATE INDEX idx_user_badges_account ON user_badges(account_id);
CREATE INDEX idx_user_badges_earned ON user_badges(account_id, is_earned) WHERE is_earned = TRUE;
CREATE INDEX idx_user_badges_new ON user_badges(account_id, is_new) WHERE is_new = TRUE;

-- Social shares
CREATE INDEX idx_shares_account ON social_shares(account_id);
CREATE INDEX idx_shares_type ON social_shares(content_type, content_id);
CREATE INDEX idx_shares_platform ON social_shares(platform);
CREATE INDEX idx_share_clicks ON share_clicks(share_id);

-- ============================================================================
-- 5. HELPER FUNCTIONS
-- ============================================================================

-- Drop existing functions
DROP FUNCTION IF EXISTS send_notification CASCADE;
DROP FUNCTION IF EXISTS check_and_award_badge CASCADE;
DROP FUNCTION IF EXISTS update_badge_progress CASCADE;
DROP FUNCTION IF EXISTS record_social_share CASCADE;
DROP FUNCTION IF EXISTS get_user_badges CASCADE;
DROP FUNCTION IF EXISTS get_unread_notifications CASCADE;

-- Send notification to user
CREATE OR REPLACE FUNCTION send_notification(
    p_account_id UUID,
    p_template_code TEXT,
    p_data JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    v_template RECORD;
    v_notification_id UUID;
    v_title TEXT;
    v_body TEXT;
    v_action_url TEXT;
    v_key TEXT;
    v_value TEXT;
BEGIN
    -- Get template
    SELECT * INTO v_template
    FROM notification_templates
    WHERE template_code = p_template_code AND is_active = TRUE;

    IF NOT FOUND THEN
        RETURN NULL;
    END IF;

    -- Replace template variables
    v_title := v_template.title_template;
    v_body := v_template.body_template;
    v_action_url := v_template.action_url_template;

    FOR v_key, v_value IN SELECT * FROM jsonb_each_text(p_data)
    LOOP
        v_title := REPLACE(v_title, '{{' || v_key || '}}', v_value);
        v_body := REPLACE(v_body, '{{' || v_key || '}}', v_value);
        IF v_action_url IS NOT NULL THEN
            v_action_url := REPLACE(v_action_url, '{{' || v_key || '}}', v_value);
        END IF;
    END LOOP;

    -- Create notification
    INSERT INTO user_notifications (
        account_id, template_id, title, body, icon, action_url, data
    ) VALUES (
        p_account_id, v_template.id, v_title, v_body,
        v_template.icon, v_action_url, p_data
    )
    RETURNING id INTO v_notification_id;

    RETURN v_notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Check and award badge
CREATE OR REPLACE FUNCTION check_and_award_badge(
    p_account_id UUID,
    p_badge_code TEXT,
    p_increment INTEGER DEFAULT 1
)
RETURNS BOOLEAN AS $$
DECLARE
    v_badge RECORD;
    v_user_badge RECORD;
    v_required INTEGER;
    v_awarded BOOLEAN := FALSE;
BEGIN
    -- Get badge definition
    SELECT * INTO v_badge
    FROM badge_definitions
    WHERE badge_code = p_badge_code AND is_active = TRUE;

    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;

    -- Get or create user badge progress
    SELECT * INTO v_user_badge
    FROM user_badges
    WHERE account_id = p_account_id AND badge_id = v_badge.id;

    IF NOT FOUND THEN
        -- Determine required progress
        v_required := CASE v_badge.requirement_type
            WHEN 'count' THEN (v_badge.requirement_config->>'count')::INTEGER
            WHEN 'milestone' THEN (v_badge.requirement_config->>'value')::INTEGER
            WHEN 'streak' THEN (v_badge.requirement_config->>'days')::INTEGER
            ELSE 1
        END;

        INSERT INTO user_badges (
            account_id, badge_id, current_progress, required_progress
        ) VALUES (
            p_account_id, v_badge.id, p_increment, v_required
        )
        RETURNING * INTO v_user_badge;
    ELSE
        IF v_user_badge.is_earned THEN
            RETURN FALSE; -- Already earned
        END IF;

        -- Update progress
        UPDATE user_badges
        SET current_progress = current_progress + p_increment,
            updated_at = NOW()
        WHERE id = v_user_badge.id
        RETURNING * INTO v_user_badge;
    END IF;

    -- Check if earned
    IF v_user_badge.current_progress >= v_user_badge.required_progress THEN
        UPDATE user_badges
        SET is_earned = TRUE, earned_at = NOW(), is_new = TRUE, updated_at = NOW()
        WHERE id = v_user_badge.id;

        -- Award points
        IF v_badge.points_reward > 0 THEN
            PERFORM award_loyalty_points(
                p_account_id, v_badge.points_reward, 'consumer', 'badge_earned',
                'Badge earned: ' || v_badge.badge_name, 'badge', v_badge.id
            );
        END IF;

        -- Send notification
        PERFORM send_notification(p_account_id, 'badge_earned', jsonb_build_object(
            'badge_name', v_badge.badge_name,
            'badge_icon', v_badge.icon_emoji
        ));

        v_awarded := TRUE;
    END IF;

    RETURN v_awarded;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update badge progress for action
CREATE OR REPLACE FUNCTION update_badge_progress(
    p_account_id UUID,
    p_action TEXT,
    p_increment INTEGER DEFAULT 1
)
RETURNS INTEGER AS $$
DECLARE
    v_badge RECORD;
    v_awarded_count INTEGER := 0;
BEGIN
    -- Find all badges that match this action
    FOR v_badge IN
        SELECT badge_code
        FROM badge_definitions
        WHERE is_active = TRUE
        AND requirement_type IN ('count', 'streak')
        AND requirement_config->>'action' = p_action
    LOOP
        IF check_and_award_badge(p_account_id, v_badge.badge_code, p_increment) THEN
            v_awarded_count := v_awarded_count + 1;
        END IF;
    END LOOP;

    RETURN v_awarded_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Record social share
CREATE OR REPLACE FUNCTION record_social_share(
    p_account_id UUID,
    p_content_type TEXT,
    p_content_id UUID,
    p_platform TEXT,
    p_share_url TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    v_share_id UUID;
    v_today_shares INTEGER;
    v_points INTEGER := 15;  -- Base points per share
BEGIN
    -- Check daily limit (max 3 shares per day for points)
    SELECT COUNT(*) INTO v_today_shares
    FROM social_shares
    WHERE account_id = p_account_id
    AND created_at > NOW() - INTERVAL '24 hours';

    -- Create share record
    INSERT INTO social_shares (
        account_id, content_type, content_id, platform,
        share_url, share_text,
        points_awarded
    ) VALUES (
        p_account_id, p_content_type, p_content_id, p_platform,
        p_share_url, p_metadata->>'share_text',
        CASE WHEN v_today_shares < 3 THEN v_points ELSE 0 END
    )
    RETURNING id INTO v_share_id;

    -- Award points if under daily limit
    IF v_today_shares < 3 THEN
        PERFORM award_loyalty_points(
            p_account_id, v_points, 'consumer', 'social_share',
            'Social share on ' || p_platform, 'share', v_share_id
        );
    END IF;

    -- Update badge progress
    PERFORM update_badge_progress(p_account_id, 'social_share', 1);

    RETURN v_share_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Get user's badges
CREATE OR REPLACE FUNCTION get_user_badges(p_account_id UUID)
RETURNS TABLE(
    badge_code TEXT,
    badge_name TEXT,
    description TEXT,
    icon_emoji TEXT,
    category TEXT,
    rarity TEXT,
    current_progress INTEGER,
    required_progress INTEGER,
    progress_percent DECIMAL,
    is_earned BOOLEAN,
    earned_at TIMESTAMPTZ,
    is_new BOOLEAN,
    points_reward INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        bd.badge_code,
        bd.badge_name,
        bd.description,
        bd.icon_emoji,
        bd.category,
        bd.rarity,
        COALESCE(ub.current_progress, 0) AS current_progress,
        COALESCE(ub.required_progress,
            CASE bd.requirement_type
                WHEN 'count' THEN (bd.requirement_config->>'count')::INTEGER
                WHEN 'milestone' THEN (bd.requirement_config->>'value')::INTEGER
                WHEN 'streak' THEN (bd.requirement_config->>'days')::INTEGER
                ELSE 1
            END
        ) AS required_progress,
        CASE WHEN COALESCE(ub.required_progress, 1) > 0
            THEN (COALESCE(ub.current_progress, 0)::DECIMAL / COALESCE(ub.required_progress, 1) * 100)
            ELSE 0
        END AS progress_percent,
        COALESCE(ub.is_earned, FALSE) AS is_earned,
        ub.earned_at,
        COALESCE(ub.is_new, FALSE) AS is_new,
        bd.points_reward
    FROM badge_definitions bd
    LEFT JOIN user_badges ub ON ub.badge_id = bd.id AND ub.account_id = p_account_id
    WHERE bd.is_active = TRUE
    AND (bd.is_hidden = FALSE OR ub.is_earned = TRUE)
    ORDER BY
        COALESCE(ub.is_earned, FALSE) DESC,
        ub.earned_at DESC NULLS LAST,
        (COALESCE(ub.current_progress, 0)::DECIMAL / NULLIF(COALESCE(ub.required_progress, 1), 0)) DESC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get unread notifications
CREATE OR REPLACE FUNCTION get_unread_notifications(
    p_account_id UUID,
    p_limit INTEGER DEFAULT 20
)
RETURNS TABLE(
    id UUID,
    title TEXT,
    body TEXT,
    icon TEXT,
    action_url TEXT,
    data JSONB,
    is_read BOOLEAN,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        un.id,
        un.title,
        un.body,
        un.icon,
        un.action_url,
        un.data,
        un.is_read,
        un.created_at
    FROM user_notifications un
    WHERE un.account_id = p_account_id
    AND (un.expires_at IS NULL OR un.expires_at > NOW())
    ORDER BY un.created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Mark notifications as read
CREATE OR REPLACE FUNCTION mark_notifications_read(
    p_account_id UUID,
    p_notification_ids UUID[] DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_updated INTEGER;
BEGIN
    IF p_notification_ids IS NULL THEN
        -- Mark all as read
        UPDATE user_notifications
        SET is_read = TRUE, read_at = NOW()
        WHERE account_id = p_account_id AND is_read = FALSE;
    ELSE
        -- Mark specific ones
        UPDATE user_notifications
        SET is_read = TRUE, read_at = NOW()
        WHERE account_id = p_account_id
        AND id = ANY(p_notification_ids)
        AND is_read = FALSE;
    END IF;

    GET DIAGNOSTICS v_updated = ROW_COUNT;
    RETURN v_updated;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Mark user badges as seen
CREATE OR REPLACE FUNCTION mark_badges_seen(
    p_account_id UUID,
    p_badge_codes TEXT[] DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_updated INTEGER;
BEGIN
    IF p_badge_codes IS NULL THEN
        -- Mark all as seen
        UPDATE user_badges
        SET is_new = FALSE, updated_at = NOW()
        WHERE account_id = p_account_id AND is_new = TRUE;
    ELSE
        -- Mark specific badges as seen
        UPDATE user_badges ub
        SET is_new = FALSE, updated_at = NOW()
        FROM badge_definitions bd
        WHERE ub.badge_id = bd.id
        AND ub.account_id = p_account_id
        AND bd.badge_code = ANY(p_badge_codes)
        AND ub.is_new = TRUE;
    END IF;

    GET DIAGNOSTICS v_updated = ROW_COUNT;
    RETURN v_updated;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Increment share clicks
CREATE OR REPLACE FUNCTION increment_share_clicks(p_share_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE social_shares
    SET click_count = click_count + 1,
        last_clicked_at = NOW()
    WHERE id = p_share_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Increment share conversions
CREATE OR REPLACE FUNCTION increment_share_conversions(
    p_share_id UUID,
    p_conversion_type TEXT
)
RETURNS VOID AS $$
BEGIN
    IF p_conversion_type = 'signup' THEN
        UPDATE social_shares
        SET signups_from_share = signups_from_share + 1
        WHERE id = p_share_id;
    ELSIF p_conversion_type = 'purchase' THEN
        UPDATE social_shares
        SET orders_from_share = orders_from_share + 1
        WHERE id = p_share_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Award bonus points (wrapper for compatibility)
CREATE OR REPLACE FUNCTION award_bonus_points(
    p_account_id UUID,
    p_points INTEGER,
    p_reason TEXT,
    p_reference_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    -- Call existing award_loyalty_points if exists, otherwise just update account
    BEGIN
        PERFORM award_loyalty_points(
            p_account_id, p_points, 'consumer', p_reason,
            p_reason, 'bonus', p_reference_id
        );
    EXCEPTION WHEN undefined_function THEN
        -- Fallback: direct update
        UPDATE accounts
        SET points_balance = points_balance + p_points,
            points_earned = points_earned + p_points,
            updated_at = NOW()
        WHERE id = p_account_id;
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. TRIGGERS
-- ============================================================================

-- Auto-check badges on points earned
CREATE OR REPLACE FUNCTION trigger_check_points_badges()
RETURNS TRIGGER AS $$
BEGIN
    -- Check points milestone badges
    PERFORM check_and_award_badge(
        NEW.account_id, 'points_1000',
        CASE WHEN NEW.points_earned >= 1000 THEN 1000 ELSE 0 END
    );
    PERFORM check_and_award_badge(
        NEW.account_id, 'points_5000',
        CASE WHEN NEW.points_earned >= 5000 THEN 5000 ELSE 0 END
    );
    PERFORM check_and_award_badge(
        NEW.account_id, 'points_10000',
        CASE WHEN NEW.points_earned >= 10000 THEN 10000 ELSE 0 END
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_check_points_badges ON accounts;
CREATE TRIGGER tr_check_points_badges
AFTER UPDATE OF points_earned ON accounts
FOR EACH ROW
WHEN (NEW.points_earned > OLD.points_earned)
EXECUTE FUNCTION trigger_check_points_badges();

-- ============================================================================
-- 7. VIEWS
-- ============================================================================

-- User badge summary
CREATE OR REPLACE VIEW v_user_badge_summary AS
SELECT
    a.id AS account_id,
    a.display_name,
    COUNT(*) FILTER (WHERE ub.is_earned) AS badges_earned,
    COUNT(*) FILTER (WHERE ub.is_new AND ub.is_earned) AS new_badges,
    ARRAY_AGG(bd.badge_code) FILTER (WHERE ub.is_earned AND ub.is_featured) AS featured_badges,
    MAX(ub.earned_at) AS last_badge_earned
FROM accounts a
LEFT JOIN user_badges ub ON ub.account_id = a.id
LEFT JOIN badge_definitions bd ON bd.id = ub.badge_id
GROUP BY a.id, a.display_name;

-- ============================================================================
-- 8. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE badge_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_clicks ENABLE ROW LEVEL SECURITY;

-- Templates: public read
CREATE POLICY "Anyone can view templates" ON notification_templates
    FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Service role manages templates" ON notification_templates
    FOR ALL USING (auth.role() = 'service_role');

-- User notifications: users see own
CREATE POLICY "Users see own notifications" ON user_notifications
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages notifications" ON user_notifications
    FOR ALL USING (auth.role() = 'service_role');

-- Badge definitions: public read
CREATE POLICY "Anyone can view badges" ON badge_definitions
    FOR SELECT USING (is_active = TRUE AND is_hidden = FALSE);
CREATE POLICY "Service role manages badges" ON badge_definitions
    FOR ALL USING (auth.role() = 'service_role');

-- User badges: users see own
CREATE POLICY "Users see own badges" ON user_badges
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages user badges" ON user_badges
    FOR ALL USING (auth.role() = 'service_role');

-- Social shares: users manage own
CREATE POLICY "Users manage own shares" ON social_shares
    FOR ALL USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- Share clicks: insert only, service manages
CREATE POLICY "Anyone can log clicks" ON share_clicks
    FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Service role manages clicks" ON share_clicks
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 9. COMMENTS
-- ============================================================================

COMMENT ON TABLE notification_templates IS 'Templates for personalized notifications';
COMMENT ON TABLE user_notifications IS 'User notification queue and history';
COMMENT ON TABLE badge_definitions IS 'Gamification badge definitions';
COMMENT ON TABLE user_badges IS 'User badge progress and earned badges';
COMMENT ON TABLE social_shares IS 'Social media share tracking';
COMMENT ON TABLE share_clicks IS 'Click tracking for shared links';

COMMENT ON FUNCTION send_notification IS 'Send templated notification to user';
COMMENT ON FUNCTION check_and_award_badge IS 'Check and potentially award a badge';
COMMENT ON FUNCTION update_badge_progress IS 'Update badge progress for an action';
COMMENT ON FUNCTION record_social_share IS 'Record social share with points';
COMMENT ON FUNCTION get_user_badges IS 'Get all badges with progress for user';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
