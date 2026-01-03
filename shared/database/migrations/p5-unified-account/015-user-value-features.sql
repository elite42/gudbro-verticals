-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 15: USER VALUE FEATURES
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-03
-- Description: Wishlist, Food Diary, and Verified Reviews system
--              Core features that make the consumer experience valuable
-- ============================================================================

-- ============================================================================
-- 1. WISHLIST SYSTEM
-- ============================================================================
-- Users can save dishes/products they want to try in the future
-- with optional notes, notifications when on promo, etc.

CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Owner
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- What's wishlisted
    item_type TEXT NOT NULL CHECK (item_type IN (
        'product',      -- Menu item
        'ingredient',   -- Ingredient to try
        'merchant',     -- Restaurant to visit
        'recipe'        -- Recipe to try at home
    )),
    item_id UUID NOT NULL,  -- References product_taxonomy, ingredients, merchants, etc.

    -- Context
    merchant_id UUID REFERENCES merchants(id),  -- Which restaurant (for products)

    -- User notes
    notes TEXT,
    priority INTEGER DEFAULT 0,  -- 0=normal, 1=high, 2=must-try

    -- Notifications
    notify_on_promo BOOLEAN DEFAULT TRUE,
    notify_on_available BOOLEAN DEFAULT FALSE,  -- If item was unavailable

    -- Status
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active',       -- On wishlist
        'tried',        -- User has tried it
        'removed'       -- Removed from list
    )),
    tried_at TIMESTAMPTZ,
    tried_rating INTEGER CHECK (tried_rating BETWEEN 1 AND 5),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Prevent duplicates
    UNIQUE(account_id, item_type, item_id, merchant_id)
);

-- ============================================================================
-- 2. FOOD DIARY SYSTEM
-- ============================================================================
-- Track what users eat, where, when - premium feature
-- Useful for: calorie tracking, allergy monitoring, spending insights

CREATE TABLE IF NOT EXISTS food_diary_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Owner
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- When
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    meal_type TEXT NOT NULL CHECK (meal_type IN (
        'breakfast', 'brunch', 'lunch', 'snack', 'dinner', 'dessert', 'drink'
    )),
    entry_time TIME,

    -- Where (optional - could be home cooking)
    merchant_id UUID REFERENCES merchants(id),
    location_name TEXT,  -- Free text if not a GudBro merchant
    is_home_cooking BOOLEAN DEFAULT FALSE,

    -- What
    order_id UUID,  -- If linked to actual order
    items JSONB NOT NULL DEFAULT '[]',
    /*
    Example items:
    [
        {
            "product_id": "uuid",
            "name": "Pad Thai",
            "quantity": 1,
            "portion_size": "regular",
            "calories_estimate": 650,
            "photo_url": "https://..."
        }
    ]
    */

    -- Nutrition summary (calculated or estimated)
    total_calories INTEGER,
    total_protein_g DECIMAL(6,2),
    total_carbs_g DECIMAL(6,2),
    total_fat_g DECIMAL(6,2),
    total_fiber_g DECIMAL(6,2),

    -- Cost tracking
    total_cost DECIMAL(10,2),
    currency TEXT DEFAULT 'EUR',

    -- User notes
    notes TEXT,
    mood TEXT CHECK (mood IN ('great', 'good', 'okay', 'not_great', 'bad')),
    energy_after TEXT CHECK (energy_after IN ('energized', 'normal', 'tired', 'sluggish')),

    -- Photos
    photos JSONB DEFAULT '[]',  -- Array of photo URLs

    -- Tags
    tags JSONB DEFAULT '[]',  -- ['cheat_day', 'healthy', 'celebration', etc.]

    -- Health tracking
    allergens_consumed JSONB DEFAULT '[]',  -- Allergens in this meal
    symptoms_after JSONB DEFAULT '[]',  -- Any symptoms noted

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Daily summary view/cache
CREATE TABLE IF NOT EXISTS food_diary_daily_summary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    summary_date DATE NOT NULL,

    -- Totals for the day
    meals_count INTEGER DEFAULT 0,
    total_calories INTEGER DEFAULT 0,
    total_protein_g DECIMAL(8,2) DEFAULT 0,
    total_carbs_g DECIMAL(8,2) DEFAULT 0,
    total_fat_g DECIMAL(8,2) DEFAULT 0,
    total_fiber_g DECIMAL(8,2) DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,

    -- Goals tracking (from user preferences)
    calories_goal INTEGER,
    calories_remaining INTEGER,
    protein_goal_g DECIMAL(6,2),
    within_goals BOOLEAN,

    -- Insights
    merchants_visited INTEGER DEFAULT 0,
    home_meals INTEGER DEFAULT 0,
    allergens_consumed JSONB DEFAULT '[]',

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    UNIQUE(account_id, summary_date)
);

-- ============================================================================
-- 3. VERIFIED REVIEWS SYSTEM
-- ============================================================================
-- Only users who ordered can review (anti-fake)
-- Merchant reviews get higher weight

CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Reviewer
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    is_verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
    is_merchant_reviewer BOOLEAN DEFAULT FALSE,  -- If reviewer is also a merchant

    -- What's being reviewed
    review_type TEXT NOT NULL CHECK (review_type IN (
        'product',      -- Specific dish
        'merchant',     -- Overall restaurant
        'order'         -- Specific order experience
    )),

    -- References
    product_id UUID,  -- product_taxonomy
    merchant_id UUID REFERENCES merchants(id),
    order_id UUID,

    -- Ratings (1-5 stars)
    overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),

    -- Detailed ratings (optional)
    food_quality_rating INTEGER CHECK (food_quality_rating BETWEEN 1 AND 5),
    service_rating INTEGER CHECK (service_rating BETWEEN 1 AND 5),
    value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
    ambiance_rating INTEGER CHECK (ambiance_rating BETWEEN 1 AND 5),
    portion_size_rating INTEGER CHECK (portion_size_rating BETWEEN 1 AND 5),

    -- Content
    title TEXT,
    content TEXT,
    pros JSONB DEFAULT '[]',  -- ['great taste', 'fast service']
    cons JSONB DEFAULT '[]',  -- ['small portions']

    -- Photos
    photos JSONB DEFAULT '[]',

    -- Tags
    tags JSONB DEFAULT '[]',  -- ['date_night', 'family_friendly', 'spicy']

    -- Helpful votes
    helpful_count INTEGER DEFAULT 0,
    not_helpful_count INTEGER DEFAULT 0,

    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',      -- Awaiting moderation
        'approved',     -- Visible
        'rejected',     -- Rejected by moderation
        'flagged',      -- Flagged for review
        'hidden'        -- Hidden by user
    )),

    -- Moderation
    moderation_notes TEXT,
    moderated_by UUID REFERENCES accounts(id),
    moderated_at TIMESTAMPTZ,

    -- Merchant response
    merchant_response TEXT,
    merchant_response_at TIMESTAMPTZ,
    merchant_response_by UUID REFERENCES accounts(id),

    -- Weight calculation
    review_weight DECIMAL(3,2) DEFAULT 1.0,  -- Higher for verified, merchant reviewers
    /*
    Weight factors:
    - Base: 1.0
    - Verified purchase: +0.5
    - Merchant reviewer: +0.3
    - Photos included: +0.2
    - Detailed ratings: +0.1
    - Account age > 6 months: +0.1
    */

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Review helpful votes tracking
CREATE TABLE IF NOT EXISTS review_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    vote_type TEXT NOT NULL CHECK (vote_type IN ('helpful', 'not_helpful')),

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    UNIQUE(review_id, account_id)
);

-- Review reports (for flagging inappropriate content)
CREATE TABLE IF NOT EXISTS review_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    reason TEXT NOT NULL CHECK (reason IN (
        'spam', 'fake', 'inappropriate', 'harassment',
        'conflict_of_interest', 'other'
    )),
    details TEXT,

    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'reviewed', 'actioned', 'dismissed'
    )),

    reviewed_by UUID REFERENCES accounts(id),
    reviewed_at TIMESTAMPTZ,
    action_taken TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. MERCHANT RATING AGGREGATES
-- ============================================================================

CREATE TABLE IF NOT EXISTS merchant_ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE UNIQUE,

    -- Aggregate ratings
    total_reviews INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    weighted_average DECIMAL(3,2) DEFAULT 0,  -- Using review weights

    -- Rating distribution
    rating_1_count INTEGER DEFAULT 0,
    rating_2_count INTEGER DEFAULT 0,
    rating_3_count INTEGER DEFAULT 0,
    rating_4_count INTEGER DEFAULT 0,
    rating_5_count INTEGER DEFAULT 0,

    -- Detailed averages
    avg_food_quality DECIMAL(3,2),
    avg_service DECIMAL(3,2),
    avg_value DECIMAL(3,2),
    avg_ambiance DECIMAL(3,2),

    -- Stats
    verified_reviews_count INTEGER DEFAULT 0,
    reviews_with_photos INTEGER DEFAULT 0,
    response_rate DECIMAL(5,2) DEFAULT 0,  -- % of reviews with merchant response

    -- Timestamps
    last_review_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 5. INDEXES
-- ============================================================================

-- Wishlist
CREATE INDEX idx_wishlist_account ON wishlists(account_id);
CREATE INDEX idx_wishlist_item ON wishlists(item_type, item_id);
CREATE INDEX idx_wishlist_merchant ON wishlists(merchant_id) WHERE merchant_id IS NOT NULL;
CREATE INDEX idx_wishlist_status ON wishlists(status) WHERE status = 'active';

-- Food Diary
CREATE INDEX idx_diary_account_date ON food_diary_entries(account_id, entry_date DESC);
CREATE INDEX idx_diary_merchant ON food_diary_entries(merchant_id) WHERE merchant_id IS NOT NULL;
CREATE INDEX idx_diary_meal ON food_diary_entries(meal_type);
CREATE INDEX idx_diary_summary_account ON food_diary_daily_summary(account_id, summary_date DESC);

-- Reviews
CREATE INDEX idx_reviews_account ON reviews(account_id);
CREATE INDEX idx_reviews_merchant ON reviews(merchant_id) WHERE merchant_id IS NOT NULL;
CREATE INDEX idx_reviews_product ON reviews(product_id) WHERE product_id IS NOT NULL;
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_rating ON reviews(overall_rating);
CREATE INDEX idx_reviews_verified ON reviews(is_verified_purchase) WHERE is_verified_purchase = TRUE;
CREATE INDEX idx_review_votes ON review_votes(review_id);

-- Merchant ratings
CREATE INDEX idx_merchant_ratings ON merchant_ratings(average_rating DESC);

-- ============================================================================
-- 6. HELPER FUNCTIONS
-- ============================================================================

-- Drop existing functions
DROP FUNCTION IF EXISTS add_to_wishlist CASCADE;
DROP FUNCTION IF EXISTS remove_from_wishlist CASCADE;
DROP FUNCTION IF EXISTS mark_wishlist_tried CASCADE;
DROP FUNCTION IF EXISTS log_food_diary_entry CASCADE;
DROP FUNCTION IF EXISTS update_daily_summary CASCADE;
DROP FUNCTION IF EXISTS submit_review CASCADE;
DROP FUNCTION IF EXISTS calculate_review_weight CASCADE;
DROP FUNCTION IF EXISTS update_merchant_ratings CASCADE;
DROP FUNCTION IF EXISTS vote_review CASCADE;

-- Add to wishlist
CREATE OR REPLACE FUNCTION add_to_wishlist(
    p_account_id UUID,
    p_item_type TEXT,
    p_item_id UUID,
    p_merchant_id UUID DEFAULT NULL,
    p_notes TEXT DEFAULT NULL,
    p_priority INTEGER DEFAULT 0
)
RETURNS UUID AS $$
DECLARE
    v_wishlist_id UUID;
BEGIN
    INSERT INTO wishlists (
        account_id, item_type, item_id, merchant_id, notes, priority
    ) VALUES (
        p_account_id, p_item_type, p_item_id, p_merchant_id, p_notes, p_priority
    )
    ON CONFLICT (account_id, item_type, item_id, merchant_id)
    DO UPDATE SET
        status = 'active',
        notes = COALESCE(EXCLUDED.notes, wishlists.notes),
        priority = EXCLUDED.priority,
        updated_at = NOW()
    RETURNING id INTO v_wishlist_id;

    RETURN v_wishlist_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Remove from wishlist
CREATE OR REPLACE FUNCTION remove_from_wishlist(
    p_account_id UUID,
    p_wishlist_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE wishlists
    SET status = 'removed', updated_at = NOW()
    WHERE id = p_wishlist_id AND account_id = p_account_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Mark wishlist item as tried
CREATE OR REPLACE FUNCTION mark_wishlist_tried(
    p_account_id UUID,
    p_wishlist_id UUID,
    p_rating INTEGER DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE wishlists
    SET
        status = 'tried',
        tried_at = NOW(),
        tried_rating = p_rating,
        updated_at = NOW()
    WHERE id = p_wishlist_id AND account_id = p_account_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Log food diary entry
CREATE OR REPLACE FUNCTION log_food_diary_entry(
    p_account_id UUID,
    p_entry_date DATE,
    p_meal_type TEXT,
    p_items JSONB,
    p_merchant_id UUID DEFAULT NULL,
    p_location_name TEXT DEFAULT NULL,
    p_is_home_cooking BOOLEAN DEFAULT FALSE,
    p_notes TEXT DEFAULT NULL,
    p_total_cost DECIMAL DEFAULT NULL,
    p_photos JSONB DEFAULT '[]'
)
RETURNS UUID AS $$
DECLARE
    v_entry_id UUID;
    v_total_calories INTEGER := 0;
    v_total_protein DECIMAL := 0;
    v_total_carbs DECIMAL := 0;
    v_total_fat DECIMAL := 0;
    v_item JSONB;
BEGIN
    -- Calculate totals from items
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_total_calories := v_total_calories + COALESCE((v_item->>'calories_estimate')::INTEGER, 0);
        v_total_protein := v_total_protein + COALESCE((v_item->>'protein_g')::DECIMAL, 0);
        v_total_carbs := v_total_carbs + COALESCE((v_item->>'carbs_g')::DECIMAL, 0);
        v_total_fat := v_total_fat + COALESCE((v_item->>'fat_g')::DECIMAL, 0);
    END LOOP;

    INSERT INTO food_diary_entries (
        account_id, entry_date, meal_type, items,
        merchant_id, location_name, is_home_cooking,
        total_calories, total_protein_g, total_carbs_g, total_fat_g,
        total_cost, notes, photos
    ) VALUES (
        p_account_id, p_entry_date, p_meal_type, p_items,
        p_merchant_id, p_location_name, p_is_home_cooking,
        v_total_calories, v_total_protein, v_total_carbs, v_total_fat,
        p_total_cost, p_notes, p_photos
    )
    RETURNING id INTO v_entry_id;

    -- Update daily summary
    PERFORM update_daily_summary(p_account_id, p_entry_date);

    RETURN v_entry_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update daily summary
CREATE OR REPLACE FUNCTION update_daily_summary(
    p_account_id UUID,
    p_date DATE
)
RETURNS VOID AS $$
DECLARE
    v_summary RECORD;
BEGIN
    SELECT
        COUNT(*) as meals_count,
        COALESCE(SUM(total_calories), 0) as total_calories,
        COALESCE(SUM(total_protein_g), 0) as total_protein,
        COALESCE(SUM(total_carbs_g), 0) as total_carbs,
        COALESCE(SUM(total_fat_g), 0) as total_fat,
        COALESCE(SUM(total_fiber_g), 0) as total_fiber,
        COALESCE(SUM(total_cost), 0) as total_spent,
        COUNT(DISTINCT merchant_id) as merchants_visited,
        COUNT(*) FILTER (WHERE is_home_cooking) as home_meals
    INTO v_summary
    FROM food_diary_entries
    WHERE account_id = p_account_id AND entry_date = p_date;

    INSERT INTO food_diary_daily_summary (
        account_id, summary_date,
        meals_count, total_calories, total_protein_g, total_carbs_g,
        total_fat_g, total_fiber_g, total_spent,
        merchants_visited, home_meals
    ) VALUES (
        p_account_id, p_date,
        v_summary.meals_count, v_summary.total_calories, v_summary.total_protein,
        v_summary.total_carbs, v_summary.total_fat, v_summary.total_fiber,
        v_summary.total_spent, v_summary.merchants_visited, v_summary.home_meals
    )
    ON CONFLICT (account_id, summary_date)
    DO UPDATE SET
        meals_count = EXCLUDED.meals_count,
        total_calories = EXCLUDED.total_calories,
        total_protein_g = EXCLUDED.total_protein_g,
        total_carbs_g = EXCLUDED.total_carbs_g,
        total_fat_g = EXCLUDED.total_fat_g,
        total_fiber_g = EXCLUDED.total_fiber_g,
        total_spent = EXCLUDED.total_spent,
        merchants_visited = EXCLUDED.merchants_visited,
        home_meals = EXCLUDED.home_meals,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Calculate review weight
CREATE OR REPLACE FUNCTION calculate_review_weight(
    p_is_verified BOOLEAN,
    p_is_merchant BOOLEAN,
    p_has_photos BOOLEAN,
    p_has_detailed_ratings BOOLEAN,
    p_account_age_months INTEGER
)
RETURNS DECIMAL AS $$
DECLARE
    v_weight DECIMAL := 1.0;
BEGIN
    IF p_is_verified THEN v_weight := v_weight + 0.5; END IF;
    IF p_is_merchant THEN v_weight := v_weight + 0.3; END IF;
    IF p_has_photos THEN v_weight := v_weight + 0.2; END IF;
    IF p_has_detailed_ratings THEN v_weight := v_weight + 0.1; END IF;
    IF p_account_age_months >= 6 THEN v_weight := v_weight + 0.1; END IF;

    RETURN v_weight;
END;
$$ LANGUAGE plpgsql STABLE;

-- Submit review
CREATE OR REPLACE FUNCTION submit_review(
    p_account_id UUID,
    p_review_type TEXT,
    p_overall_rating INTEGER,
    p_merchant_id UUID DEFAULT NULL,
    p_product_id UUID DEFAULT NULL,
    p_order_id UUID DEFAULT NULL,
    p_title TEXT DEFAULT NULL,
    p_content TEXT DEFAULT NULL,
    p_food_quality INTEGER DEFAULT NULL,
    p_service INTEGER DEFAULT NULL,
    p_value INTEGER DEFAULT NULL,
    p_ambiance INTEGER DEFAULT NULL,
    p_photos JSONB DEFAULT '[]',
    p_pros JSONB DEFAULT '[]',
    p_cons JSONB DEFAULT '[]'
)
RETURNS UUID AS $$
DECLARE
    v_review_id UUID;
    v_is_verified BOOLEAN := FALSE;
    v_is_merchant BOOLEAN := FALSE;
    v_has_photos BOOLEAN;
    v_has_detailed BOOLEAN;
    v_account_age INTEGER;
    v_weight DECIMAL;
BEGIN
    -- Check if verified purchase
    IF p_order_id IS NOT NULL THEN
        SELECT EXISTS (
            SELECT 1 FROM orders
            WHERE id = p_order_id
            AND account_id = p_account_id
            AND status = 'completed'
        ) INTO v_is_verified;
    END IF;

    -- Check if reviewer is a merchant
    SELECT EXISTS (
        SELECT 1 FROM account_roles
        WHERE account_id = p_account_id
        AND role_type = 'merchant'
        AND is_active = TRUE
    ) INTO v_is_merchant;

    -- Calculate weight factors
    v_has_photos := jsonb_array_length(p_photos) > 0;
    v_has_detailed := p_food_quality IS NOT NULL OR p_service IS NOT NULL;

    SELECT EXTRACT(MONTH FROM AGE(NOW(), created_at))::INTEGER
    INTO v_account_age
    FROM accounts WHERE id = p_account_id;

    v_weight := calculate_review_weight(
        v_is_verified, v_is_merchant, v_has_photos, v_has_detailed, v_account_age
    );

    -- Insert review
    INSERT INTO reviews (
        account_id, review_type, overall_rating,
        merchant_id, product_id, order_id,
        title, content, photos, pros, cons,
        food_quality_rating, service_rating, value_rating, ambiance_rating,
        is_verified_purchase, is_merchant_reviewer, review_weight,
        status
    ) VALUES (
        p_account_id, p_review_type, p_overall_rating,
        p_merchant_id, p_product_id, p_order_id,
        p_title, p_content, p_photos, p_pros, p_cons,
        p_food_quality, p_service, p_value, p_ambiance,
        v_is_verified, v_is_merchant, v_weight,
        'pending'  -- All reviews go through moderation
    )
    RETURNING id INTO v_review_id;

    -- Award loyalty points for review
    IF v_is_verified THEN
        PERFORM award_loyalty_points(
            p_account_id, 25, 'consumer', 'review_submitted',
            'Review submitted (verified purchase)', 'review', v_review_id
        );
    END IF;

    RETURN v_review_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update merchant ratings aggregate
CREATE OR REPLACE FUNCTION update_merchant_ratings(p_merchant_id UUID)
RETURNS VOID AS $$
DECLARE
    v_stats RECORD;
BEGIN
    SELECT
        COUNT(*) as total_reviews,
        AVG(overall_rating) as avg_rating,
        SUM(overall_rating * review_weight) / NULLIF(SUM(review_weight), 0) as weighted_avg,
        COUNT(*) FILTER (WHERE overall_rating = 1) as r1,
        COUNT(*) FILTER (WHERE overall_rating = 2) as r2,
        COUNT(*) FILTER (WHERE overall_rating = 3) as r3,
        COUNT(*) FILTER (WHERE overall_rating = 4) as r4,
        COUNT(*) FILTER (WHERE overall_rating = 5) as r5,
        AVG(food_quality_rating) as avg_food,
        AVG(service_rating) as avg_service,
        AVG(value_rating) as avg_value,
        AVG(ambiance_rating) as avg_ambiance,
        COUNT(*) FILTER (WHERE is_verified_purchase) as verified_count,
        COUNT(*) FILTER (WHERE jsonb_array_length(photos) > 0) as with_photos,
        COUNT(*) FILTER (WHERE merchant_response IS NOT NULL)::DECIMAL /
            NULLIF(COUNT(*), 0) * 100 as response_rate,
        MAX(created_at) as last_review
    INTO v_stats
    FROM reviews
    WHERE merchant_id = p_merchant_id AND status = 'approved';

    INSERT INTO merchant_ratings (
        merchant_id,
        total_reviews, average_rating, weighted_average,
        rating_1_count, rating_2_count, rating_3_count, rating_4_count, rating_5_count,
        avg_food_quality, avg_service, avg_value, avg_ambiance,
        verified_reviews_count, reviews_with_photos, response_rate,
        last_review_at
    ) VALUES (
        p_merchant_id,
        v_stats.total_reviews, v_stats.avg_rating, v_stats.weighted_avg,
        v_stats.r1, v_stats.r2, v_stats.r3, v_stats.r4, v_stats.r5,
        v_stats.avg_food, v_stats.avg_service, v_stats.avg_value, v_stats.avg_ambiance,
        v_stats.verified_count, v_stats.with_photos, v_stats.response_rate,
        v_stats.last_review
    )
    ON CONFLICT (merchant_id)
    DO UPDATE SET
        total_reviews = EXCLUDED.total_reviews,
        average_rating = EXCLUDED.average_rating,
        weighted_average = EXCLUDED.weighted_average,
        rating_1_count = EXCLUDED.rating_1_count,
        rating_2_count = EXCLUDED.rating_2_count,
        rating_3_count = EXCLUDED.rating_3_count,
        rating_4_count = EXCLUDED.rating_4_count,
        rating_5_count = EXCLUDED.rating_5_count,
        avg_food_quality = EXCLUDED.avg_food_quality,
        avg_service = EXCLUDED.avg_service,
        avg_value = EXCLUDED.avg_value,
        avg_ambiance = EXCLUDED.avg_ambiance,
        verified_reviews_count = EXCLUDED.verified_reviews_count,
        reviews_with_photos = EXCLUDED.reviews_with_photos,
        response_rate = EXCLUDED.response_rate,
        last_review_at = EXCLUDED.last_review_at,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Vote on review
CREATE OR REPLACE FUNCTION vote_review(
    p_account_id UUID,
    p_review_id UUID,
    p_vote_type TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_old_vote TEXT;
BEGIN
    -- Check for existing vote
    SELECT vote_type INTO v_old_vote
    FROM review_votes
    WHERE review_id = p_review_id AND account_id = p_account_id;

    IF v_old_vote IS NOT NULL THEN
        IF v_old_vote = p_vote_type THEN
            -- Remove vote
            DELETE FROM review_votes
            WHERE review_id = p_review_id AND account_id = p_account_id;

            -- Update counts
            IF p_vote_type = 'helpful' THEN
                UPDATE reviews SET helpful_count = helpful_count - 1 WHERE id = p_review_id;
            ELSE
                UPDATE reviews SET not_helpful_count = not_helpful_count - 1 WHERE id = p_review_id;
            END IF;
        ELSE
            -- Change vote
            UPDATE review_votes SET vote_type = p_vote_type
            WHERE review_id = p_review_id AND account_id = p_account_id;

            -- Update counts
            IF p_vote_type = 'helpful' THEN
                UPDATE reviews SET
                    helpful_count = helpful_count + 1,
                    not_helpful_count = not_helpful_count - 1
                WHERE id = p_review_id;
            ELSE
                UPDATE reviews SET
                    helpful_count = helpful_count - 1,
                    not_helpful_count = not_helpful_count + 1
                WHERE id = p_review_id;
            END IF;
        END IF;
    ELSE
        -- New vote
        INSERT INTO review_votes (review_id, account_id, vote_type)
        VALUES (p_review_id, p_account_id, p_vote_type);

        IF p_vote_type = 'helpful' THEN
            UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = p_review_id;
        ELSE
            UPDATE reviews SET not_helpful_count = not_helpful_count + 1 WHERE id = p_review_id;
        END IF;
    END IF;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. TRIGGERS
-- ============================================================================

-- Auto-update merchant ratings when review is approved
CREATE OR REPLACE FUNCTION trigger_update_merchant_ratings()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.merchant_id IS NOT NULL THEN
        PERFORM update_merchant_ratings(NEW.merchant_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_review_update_ratings ON reviews;
CREATE TRIGGER tr_review_update_ratings
AFTER INSERT OR UPDATE OF status ON reviews
FOR EACH ROW
WHEN (NEW.status = 'approved')
EXECUTE FUNCTION trigger_update_merchant_ratings();

-- ============================================================================
-- 8. VIEWS
-- ============================================================================

-- My wishlist view
CREATE OR REPLACE VIEW v_my_wishlist AS
SELECT
    w.*,
    CASE w.item_type
        WHEN 'product' THEN (SELECT name FROM product_taxonomy WHERE id = w.item_id)
        WHEN 'ingredient' THEN (SELECT name FROM ingredients WHERE id = w.item_id)
        WHEN 'merchant' THEN (SELECT business_name FROM merchants WHERE id = w.item_id)
        ELSE NULL
    END as item_name,
    m.business_name as merchant_name
FROM wishlists w
LEFT JOIN merchants m ON m.id = w.merchant_id
WHERE w.status = 'active';

-- Recent reviews with account info
CREATE OR REPLACE VIEW v_reviews_public AS
SELECT
    r.id,
    r.review_type,
    r.overall_rating,
    r.food_quality_rating,
    r.service_rating,
    r.value_rating,
    r.title,
    r.content,
    r.pros,
    r.cons,
    r.photos,
    r.helpful_count,
    r.is_verified_purchase,
    r.is_merchant_reviewer,
    r.created_at,
    r.merchant_response,
    r.merchant_response_at,
    a.display_name as reviewer_name,
    a.avatar_url as reviewer_avatar,
    m.business_name as merchant_name,
    r.merchant_id,
    r.product_id
FROM reviews r
JOIN accounts a ON a.id = r.account_id
LEFT JOIN merchants m ON m.id = r.merchant_id
WHERE r.status = 'approved'
ORDER BY r.created_at DESC;

-- ============================================================================
-- 9. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_diary_daily_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_ratings ENABLE ROW LEVEL SECURITY;

-- Wishlist: users see own
CREATE POLICY "Users manage own wishlist" ON wishlists
    FOR ALL USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- Food Diary: users see own (premium feature)
CREATE POLICY "Users manage own diary" ON food_diary_entries
    FOR ALL USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Users see own summary" ON food_diary_daily_summary
    FOR ALL USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- Reviews: public read for approved, users manage own
CREATE POLICY "Anyone can view approved reviews" ON reviews
    FOR SELECT USING (status = 'approved');
CREATE POLICY "Users manage own reviews" ON reviews
    FOR ALL USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages reviews" ON reviews
    FOR ALL USING (auth.role() = 'service_role');

-- Review votes: users manage own
CREATE POLICY "Users manage own votes" ON review_votes
    FOR ALL USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- Review reports: users can create, admins manage
CREATE POLICY "Users create reports" ON review_reports
    FOR INSERT WITH CHECK (reporter_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages reports" ON review_reports
    FOR ALL USING (auth.role() = 'service_role');

-- Merchant ratings: public read
CREATE POLICY "Anyone can view ratings" ON merchant_ratings
    FOR SELECT USING (TRUE);
CREATE POLICY "Service role manages ratings" ON merchant_ratings
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 10. COMMENTS
-- ============================================================================

COMMENT ON TABLE wishlists IS 'User wishlist for products, restaurants, ingredients to try';
COMMENT ON TABLE food_diary_entries IS 'Daily food diary entries for tracking meals (premium)';
COMMENT ON TABLE food_diary_daily_summary IS 'Aggregated daily nutrition summary';
COMMENT ON TABLE reviews IS 'Verified reviews with weight system';
COMMENT ON TABLE review_votes IS 'Helpful/not helpful votes on reviews';
COMMENT ON TABLE review_reports IS 'Report inappropriate reviews';
COMMENT ON TABLE merchant_ratings IS 'Aggregated merchant rating statistics';

COMMENT ON FUNCTION add_to_wishlist IS 'Add item to wishlist, update if exists';
COMMENT ON FUNCTION log_food_diary_entry IS 'Log a food diary entry with auto-calc nutrition';
COMMENT ON FUNCTION submit_review IS 'Submit a review with auto weight calculation';
COMMENT ON FUNCTION vote_review IS 'Vote helpful/not helpful on a review';
COMMENT ON FUNCTION update_merchant_ratings IS 'Update merchant rating aggregates';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
