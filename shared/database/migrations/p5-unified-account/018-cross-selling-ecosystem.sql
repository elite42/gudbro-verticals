-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 18: CROSS-SELLING & ECOSYSTEM
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-03
-- Description: Recipes at home, marketplace foundations, reservations system
-- ============================================================================

-- ============================================================================
-- 1. RECIPES SYSTEM
-- ============================================================================
-- Connect our 4653 product database with step-by-step recipes

CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Link to product
    product_type TEXT NOT NULL,      -- 'pasta', 'cocktails', 'thai', etc.
    product_id TEXT NOT NULL,        -- The product ID from that table
    
    -- Recipe identity
    recipe_slug TEXT NOT NULL UNIQUE,
    recipe_name TEXT NOT NULL,
    
    -- Times
    prep_time_min INTEGER NOT NULL DEFAULT 15,
    cook_time_min INTEGER DEFAULT 0,
    rest_time_min INTEGER DEFAULT 0,
    total_time_min INTEGER GENERATED ALWAYS AS (prep_time_min + cook_time_min + rest_time_min) STORED,
    
    -- Difficulty and servings
    difficulty INTEGER NOT NULL DEFAULT 2 CHECK (difficulty >= 1 AND difficulty <= 5),
    servings INTEGER NOT NULL DEFAULT 4,
    
    -- Content
    introduction TEXT,
    steps JSONB NOT NULL DEFAULT '[]',
    /*
    [
        {
            "order": 1,
            "title": "Prepare ingredients",
            "description": "Gather all ingredients and prep as needed",
            "duration_min": 5,
            "image_url": null,
            "tips": "Mise en place is key!"
        }
    ]
    */
    chef_notes TEXT,
    common_mistakes TEXT[],
    
    -- Ingredients with quantities
    recipe_ingredients JSONB NOT NULL DEFAULT '[]',
    /*
    [
        {
            "ingredient_id": "ING_SPAGHETTI",
            "quantity": 400,
            "unit": "g",
            "preparation": "al dente",
            "is_optional": false
        }
    ]
    */
    
    -- Media
    cover_image_url TEXT,
    gallery_urls TEXT[],
    video_url TEXT,
    
    -- Categorization
    meal_type TEXT[] DEFAULT '{}' CHECK (meal_type <@ ARRAY['breakfast', 'lunch', 'dinner', 'snack', 'appetizer', 'dessert', 'drink']),
    cuisine_tags TEXT[] DEFAULT '{}',
    diet_tags TEXT[] DEFAULT '{}' CHECK (diet_tags <@ ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free', 'keto', 'paleo', 'low_carb', 'halal', 'kosher']),
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    
    -- Publishing
    is_published BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,  -- Requires premium subscription
    published_at TIMESTAMPTZ,
    
    -- Attribution
    author_account_id UUID REFERENCES accounts(id),
    source_merchant_id UUID REFERENCES merchants(id),
    
    -- Stats
    view_count INTEGER DEFAULT 0,
    save_count INTEGER DEFAULT 0,
    cook_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2),
    rating_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Recipe ratings/reviews
CREATE TABLE IF NOT EXISTS recipe_ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    
    -- Rating
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    
    -- Did they actually cook it?
    cooked_on TIMESTAMPTZ,
    photo_urls TEXT[],
    
    -- Status
    is_verified BOOLEAN DEFAULT FALSE,  -- Verified they bought ingredients or have recipe
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    UNIQUE(recipe_id, account_id)
);

-- User saved recipes
CREATE TABLE IF NOT EXISTS saved_recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    
    -- Organization
    collection_name TEXT DEFAULT 'Saved',
    notes TEXT,
    
    -- Tracking
    cooked_count INTEGER DEFAULT 0,
    last_cooked_at TIMESTAMPTZ,
    
    -- Timestamps
    saved_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    UNIQUE(account_id, recipe_id)
);

-- ============================================================================
-- 2. MARKETPLACE FOUNDATIONS
-- ============================================================================
-- For future B2C marketplace (ingredients, merchandise, equipment)

CREATE TABLE IF NOT EXISTS marketplace_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    category_code TEXT NOT NULL UNIQUE,
    category_name TEXT NOT NULL,
    parent_id UUID REFERENCES marketplace_categories(id),
    
    description TEXT,
    icon TEXT,
    image_url TEXT,
    
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert default categories
INSERT INTO marketplace_categories (category_code, category_name, description, icon, sort_order) VALUES
    ('ingredients', 'Specialty Ingredients', 'Hard-to-find ingredients for authentic cooking', '🧂', 1),
    ('equipment', 'Kitchen Equipment', 'Professional-grade tools and gadgets', '🍳', 2),
    ('merchandise', 'GudBro Merch', 'Official GudBro merchandise', '👕', 3),
    ('gift_cards', 'Gift Cards', 'GudBro gift cards for any occasion', '🎁', 4),
    ('experiences', 'Culinary Experiences', 'Cooking classes, tastings, and events', '👨‍🍳', 5)
ON CONFLICT (category_code) DO NOTHING;

-- Marketplace products (for future implementation)
CREATE TABLE IF NOT EXISTS marketplace_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Identity
    sku TEXT NOT NULL UNIQUE,
    product_name TEXT NOT NULL,
    product_slug TEXT NOT NULL UNIQUE,
    description TEXT,
    
    -- Category
    category_id UUID NOT NULL REFERENCES marketplace_categories(id),
    
    -- Pricing
    price DECIMAL(10,2) NOT NULL,
    compare_at_price DECIMAL(10,2),
    currency TEXT NOT NULL DEFAULT 'EUR',
    
    -- Inventory
    track_inventory BOOLEAN DEFAULT TRUE,
    quantity INTEGER DEFAULT 0,
    allow_backorder BOOLEAN DEFAULT FALSE,
    
    -- Shipping
    weight_grams INTEGER,
    requires_shipping BOOLEAN DEFAULT TRUE,
    
    -- Media
    images JSONB DEFAULT '[]',
    
    -- Attributes
    attributes JSONB DEFAULT '{}',
    variants JSONB DEFAULT '[]',
    
    -- Related
    related_ingredient_id TEXT REFERENCES ingredients(id),
    related_recipe_ids UUID[],
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- Stats
    view_count INTEGER DEFAULT 0,
    purchase_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Marketplace orders (simplified for now)
CREATE TABLE IF NOT EXISTS marketplace_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Customer
    account_id UUID NOT NULL REFERENCES accounts(id),
    
    -- Order details
    order_number TEXT NOT NULL UNIQUE,
    
    -- Items
    line_items JSONB NOT NULL DEFAULT '[]',
    /*
    [
        {
            "product_id": "xxx",
            "sku": "ING-001",
            "name": "Truffle Oil",
            "quantity": 2,
            "unit_price": 25.00,
            "total": 50.00
        }
    ]
    */
    
    -- Totals
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    
    -- Points
    points_earned INTEGER DEFAULT 0,
    points_redeemed INTEGER DEFAULT 0,
    
    -- Addresses
    shipping_address JSONB,
    billing_address JSONB,
    
    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'canceled', 'refunded'
    )),
    
    -- Shipping
    shipping_method TEXT,
    tracking_number TEXT,
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    
    -- Payment
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
        'pending', 'paid', 'failed', 'refunded'
    )),
    payment_method TEXT,
    stripe_payment_intent_id TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 3. RESERVATIONS SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS merchant_reservation_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE UNIQUE,
    
    -- Enable/disable
    reservations_enabled BOOLEAN DEFAULT FALSE,
    
    -- Capacity
    total_seats INTEGER DEFAULT 50,
    tables JSONB DEFAULT '[]',
    /*
    [
        {"id": "T1", "name": "Table 1", "seats": 2, "location": "window"},
        {"id": "T2", "name": "Table 2", "seats": 4, "location": "patio"}
    ]
    */
    
    -- Booking rules
    min_party_size INTEGER DEFAULT 1,
    max_party_size INTEGER DEFAULT 10,
    default_duration_min INTEGER DEFAULT 90,
    booking_window_days INTEGER DEFAULT 30,  -- How far in advance
    min_notice_hours INTEGER DEFAULT 2,       -- Minimum notice required
    
    -- Time slots
    slot_duration_min INTEGER DEFAULT 30,
    time_slots JSONB DEFAULT '{}',
    /*
    {
        "monday": [{"start": "12:00", "end": "14:30"}, {"start": "19:00", "end": "22:00"}],
        "tuesday": [...],
        ...
    }
    */
    
    -- Policies
    cancellation_policy TEXT,
    deposit_required BOOLEAN DEFAULT FALSE,
    deposit_amount DECIMAL(10,2),
    no_show_fee DECIMAL(10,2),
    
    -- Notifications
    confirmation_message TEXT,
    reminder_hours_before INTEGER DEFAULT 24,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Who
    account_id UUID NOT NULL REFERENCES accounts(id),
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    
    -- Reservation details
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    party_size INTEGER NOT NULL,
    duration_min INTEGER DEFAULT 90,
    
    -- Table assignment
    table_ids TEXT[],
    
    -- Contact
    guest_name TEXT NOT NULL,
    guest_phone TEXT,
    guest_email TEXT,
    
    -- Special requests
    special_requests TEXT,
    occasion TEXT,  -- birthday, anniversary, business, etc.
    dietary_requirements TEXT[],
    
    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'seated', 'completed', 'canceled', 'no_show'
    )),
    
    -- Confirmation
    confirmation_code TEXT NOT NULL UNIQUE,
    confirmed_at TIMESTAMPTZ,
    confirmed_by UUID REFERENCES accounts(id),
    
    -- Deposit
    deposit_paid BOOLEAN DEFAULT FALSE,
    deposit_amount DECIMAL(10,2),
    stripe_payment_intent_id TEXT,
    
    -- Cancellation
    canceled_at TIMESTAMPTZ,
    canceled_by UUID REFERENCES accounts(id),
    cancellation_reason TEXT,
    
    -- Completion
    seated_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    -- Points
    points_earned INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. SPLIT BILL SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS bill_splits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Original order/bill
    order_id UUID,  -- Reference to orders table when implemented
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    
    -- Initiator
    initiator_account_id UUID NOT NULL REFERENCES accounts(id),
    
    -- Total
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    
    -- Split type
    split_type TEXT NOT NULL DEFAULT 'equal' CHECK (split_type IN ('equal', 'custom', 'by_item')),
    
    -- Participants
    participants JSONB NOT NULL DEFAULT '[]',
    /*
    [
        {
            "account_id": "xxx",
            "name": "Mario",
            "share_amount": 25.50,
            "items": ["item1", "item2"],
            "status": "pending",  -- pending, accepted, paid, declined
            "paid_at": null
        }
    ]
    */
    
    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'partial', 'completed', 'expired', 'canceled'
    )),
    
    -- Expiry
    expires_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 5. INDEXES
-- ============================================================================

-- Recipes
CREATE INDEX idx_recipes_product ON recipes(product_type, product_id);
CREATE INDEX idx_recipes_published ON recipes(is_published, published_at DESC) WHERE is_published = TRUE;
CREATE INDEX idx_recipes_slug ON recipes(recipe_slug);
CREATE INDEX idx_recipes_cuisine ON recipes USING GIN(cuisine_tags);
CREATE INDEX idx_recipes_diet ON recipes USING GIN(diet_tags);
CREATE INDEX idx_recipe_ratings ON recipe_ratings(recipe_id);
CREATE INDEX idx_saved_recipes ON saved_recipes(account_id);

-- Marketplace
CREATE INDEX idx_mp_products_category ON marketplace_products(category_id) WHERE is_active = TRUE;
CREATE INDEX idx_mp_products_slug ON marketplace_products(product_slug);
CREATE INDEX idx_mp_orders_account ON marketplace_orders(account_id);
CREATE INDEX idx_mp_orders_status ON marketplace_orders(status);

-- Reservations
CREATE INDEX idx_reservation_settings ON merchant_reservation_settings(merchant_id);
CREATE INDEX idx_reservations_merchant ON reservations(merchant_id, reservation_date);
CREATE INDEX idx_reservations_account ON reservations(account_id);
CREATE INDEX idx_reservations_date ON reservations(reservation_date, reservation_time);
CREATE INDEX idx_reservations_status ON reservations(status);

-- Bill splits
CREATE INDEX idx_bill_splits_initiator ON bill_splits(initiator_account_id);
CREATE INDEX idx_bill_splits_merchant ON bill_splits(merchant_id);

-- ============================================================================
-- 6. HELPER FUNCTIONS
-- ============================================================================

-- Get recipe with full details
CREATE OR REPLACE FUNCTION get_recipe_details(p_recipe_id UUID)
RETURNS TABLE(
    id UUID,
    recipe_name TEXT,
    recipe_slug TEXT,
    introduction TEXT,
    steps JSONB,
    recipe_ingredients JSONB,
    prep_time_min INTEGER,
    cook_time_min INTEGER,
    total_time_min INTEGER,
    difficulty INTEGER,
    servings INTEGER,
    cover_image_url TEXT,
    average_rating DECIMAL,
    rating_count INTEGER,
    view_count INTEGER,
    save_count INTEGER,
    is_premium BOOLEAN
) AS $$
BEGIN
    -- Increment view count
    UPDATE recipes SET view_count = view_count + 1 WHERE recipes.id = p_recipe_id;
    
    RETURN QUERY
    SELECT 
        r.id,
        r.recipe_name,
        r.recipe_slug,
        r.introduction,
        r.steps,
        r.recipe_ingredients,
        r.prep_time_min,
        r.cook_time_min,
        r.total_time_min,
        r.difficulty,
        r.servings,
        r.cover_image_url,
        r.average_rating,
        r.rating_count,
        r.view_count,
        r.save_count,
        r.is_premium
    FROM recipes r
    WHERE r.id = p_recipe_id AND r.is_published = TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Save recipe for user
CREATE OR REPLACE FUNCTION save_recipe(
    p_account_id UUID,
    p_recipe_id UUID,
    p_collection TEXT DEFAULT 'Saved'
)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO saved_recipes (account_id, recipe_id, collection_name)
    VALUES (p_account_id, p_recipe_id, p_collection)
    ON CONFLICT (account_id, recipe_id) DO UPDATE
    SET collection_name = p_collection;
    
    -- Update save count
    UPDATE recipes SET save_count = save_count + 1 WHERE id = p_recipe_id;
    
    -- Award points
    PERFORM update_badge_progress(p_account_id, 'recipe_saved', 1);
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Mark recipe as cooked
CREATE OR REPLACE FUNCTION mark_recipe_cooked(
    p_account_id UUID,
    p_recipe_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Update saved recipe
    UPDATE saved_recipes
    SET cooked_count = cooked_count + 1, last_cooked_at = NOW()
    WHERE account_id = p_account_id AND recipe_id = p_recipe_id;
    
    -- Update recipe stats
    UPDATE recipes SET cook_count = cook_count + 1 WHERE id = p_recipe_id;
    
    -- Award points (10 points for cooking at home)
    PERFORM award_loyalty_points(
        p_account_id, 10, 'consumer', 'recipe_cooked',
        'Cooked a recipe at home', 'recipe', p_recipe_id
    );
    
    -- Update badge progress
    PERFORM update_badge_progress(p_account_id, 'home_cook', 1);
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create reservation
CREATE OR REPLACE FUNCTION create_reservation(
    p_account_id UUID,
    p_merchant_id UUID,
    p_date DATE,
    p_time TIME,
    p_party_size INTEGER,
    p_guest_name TEXT,
    p_guest_phone TEXT DEFAULT NULL,
    p_guest_email TEXT DEFAULT NULL,
    p_special_requests TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_settings RECORD;
    v_reservation_id UUID;
    v_confirmation_code TEXT;
BEGIN
    -- Get merchant settings
    SELECT * INTO v_settings
    FROM merchant_reservation_settings
    WHERE merchant_id = p_merchant_id AND reservations_enabled = TRUE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Reservations not available for this merchant';
    END IF;
    
    -- Validate party size
    IF p_party_size < v_settings.min_party_size OR p_party_size > v_settings.max_party_size THEN
        RAISE EXCEPTION 'Party size must be between % and %', v_settings.min_party_size, v_settings.max_party_size;
    END IF;
    
    -- Validate date is within booking window
    IF p_date < CURRENT_DATE OR p_date > CURRENT_DATE + (v_settings.booking_window_days || ' days')::INTERVAL THEN
        RAISE EXCEPTION 'Date must be within % days from today', v_settings.booking_window_days;
    END IF;
    
    -- Generate confirmation code
    v_confirmation_code := 'RES-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    
    -- Create reservation
    INSERT INTO reservations (
        account_id, merchant_id, reservation_date, reservation_time,
        party_size, duration_min, guest_name, guest_phone, guest_email,
        special_requests, confirmation_code
    ) VALUES (
        p_account_id, p_merchant_id, p_date, p_time,
        p_party_size, v_settings.default_duration_min, p_guest_name,
        p_guest_phone, p_guest_email, p_special_requests, v_confirmation_code
    )
    RETURNING id INTO v_reservation_id;
    
    -- Send notification to user
    PERFORM send_notification(p_account_id, 'reservation_pending', jsonb_build_object(
        'confirmation_code', v_confirmation_code,
        'date', p_date::TEXT,
        'time', p_time::TEXT,
        'party_size', p_party_size
    ));
    
    RETURN v_reservation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Confirm reservation (by merchant)
CREATE OR REPLACE FUNCTION confirm_reservation(
    p_reservation_id UUID,
    p_confirmed_by UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    v_reservation RECORD;
BEGIN
    SELECT * INTO v_reservation
    FROM reservations WHERE id = p_reservation_id;
    
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    UPDATE reservations
    SET status = 'confirmed',
        confirmed_at = NOW(),
        confirmed_by = p_confirmed_by,
        updated_at = NOW()
    WHERE id = p_reservation_id;
    
    -- Send confirmation to guest
    PERFORM send_notification(v_reservation.account_id, 'reservation_confirmed', jsonb_build_object(
        'confirmation_code', v_reservation.confirmation_code,
        'date', v_reservation.reservation_date::TEXT,
        'time', v_reservation.reservation_time::TEXT
    ));
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Generate order number
CREATE OR REPLACE FUNCTION generate_marketplace_order_number()
RETURNS TEXT AS $$
DECLARE
    v_sequence INTEGER;
BEGIN
    SELECT COALESCE(MAX(
        SUBSTRING(order_number FROM '[0-9]+$')::INTEGER
    ), 0) + 1 INTO v_sequence
    FROM marketplace_orders;
    
    RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(v_sequence::TEXT, 5, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. TRIGGERS
-- ============================================================================

-- Auto-generate order number
CREATE OR REPLACE FUNCTION trigger_generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL THEN
        NEW.order_number := generate_marketplace_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_generate_order_number ON marketplace_orders;
CREATE TRIGGER tr_generate_order_number
BEFORE INSERT ON marketplace_orders
FOR EACH ROW
EXECUTE FUNCTION trigger_generate_order_number();

-- Update recipe average rating
CREATE OR REPLACE FUNCTION trigger_update_recipe_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE recipes
    SET average_rating = (
        SELECT AVG(rating)::DECIMAL(3,2) FROM recipe_ratings WHERE recipe_id = NEW.recipe_id
    ),
    rating_count = (
        SELECT COUNT(*) FROM recipe_ratings WHERE recipe_id = NEW.recipe_id
    ),
    updated_at = NOW()
    WHERE id = NEW.recipe_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_recipe_rating ON recipe_ratings;
CREATE TRIGGER tr_update_recipe_rating
AFTER INSERT OR UPDATE OF rating ON recipe_ratings
FOR EACH ROW
EXECUTE FUNCTION trigger_update_recipe_rating();

-- ============================================================================
-- 8. VIEWS
-- ============================================================================

-- Popular recipes
CREATE OR REPLACE VIEW v_popular_recipes AS
SELECT 
    r.id,
    r.recipe_name,
    r.recipe_slug,
    r.cover_image_url,
    r.prep_time_min,
    r.cook_time_min,
    r.total_time_min,
    r.difficulty,
    r.servings,
    r.average_rating,
    r.rating_count,
    r.view_count,
    r.save_count,
    r.cuisine_tags,
    r.diet_tags,
    r.is_premium
FROM recipes r
WHERE r.is_published = TRUE
ORDER BY (r.view_count * 0.3 + r.save_count * 0.5 + COALESCE(r.average_rating, 0) * r.rating_count * 0.2) DESC;

-- User's recipe collection
CREATE OR REPLACE VIEW v_user_saved_recipes AS
SELECT 
    sr.account_id,
    sr.collection_name,
    sr.saved_at,
    sr.cooked_count,
    sr.last_cooked_at,
    r.id AS recipe_id,
    r.recipe_name,
    r.recipe_slug,
    r.cover_image_url,
    r.total_time_min,
    r.difficulty,
    r.average_rating
FROM saved_recipes sr
JOIN recipes r ON r.id = sr.recipe_id
WHERE r.is_published = TRUE
ORDER BY sr.saved_at DESC;

-- ============================================================================
-- 9. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_reservation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_splits ENABLE ROW LEVEL SECURITY;

-- Recipes: public read for published
CREATE POLICY "Anyone can view published recipes" ON recipes
    FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Service role manages recipes" ON recipes
    FOR ALL USING (auth.role() = 'service_role');

-- Recipe ratings: users manage own
CREATE POLICY "Users see all ratings" ON recipe_ratings FOR SELECT USING (TRUE);
CREATE POLICY "Users manage own ratings" ON recipe_ratings
    FOR ALL USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- Saved recipes: users see own
CREATE POLICY "Users manage own saved recipes" ON saved_recipes
    FOR ALL USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- Marketplace categories: public read
CREATE POLICY "Anyone can view categories" ON marketplace_categories
    FOR SELECT USING (is_active = TRUE);

-- Marketplace products: public read for active
CREATE POLICY "Anyone can view active products" ON marketplace_products
    FOR SELECT USING (is_active = TRUE);

-- Marketplace orders: users see own
CREATE POLICY "Users see own orders" ON marketplace_orders
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Service role manages orders" ON marketplace_orders
    FOR ALL USING (auth.role() = 'service_role');

-- Reservation settings: public read for enabled
CREATE POLICY "Anyone can view enabled settings" ON merchant_reservation_settings
    FOR SELECT USING (reservations_enabled = TRUE);
CREATE POLICY "Merchants manage own settings" ON merchant_reservation_settings
    FOR ALL USING (merchant_id IN (
        SELECT m.id FROM merchants m
        JOIN account_roles ar ON ar.tenant_id = m.tenant_id
        JOIN accounts a ON a.id = ar.account_id
        WHERE a.auth_id = auth.uid() AND ar.role_type = 'merchant'
    ));

-- Reservations: users see own, merchants see theirs
CREATE POLICY "Users see own reservations" ON reservations
    FOR SELECT USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));
CREATE POLICY "Merchants see their reservations" ON reservations
    FOR SELECT USING (merchant_id IN (
        SELECT m.id FROM merchants m
        JOIN account_roles ar ON ar.tenant_id = m.tenant_id
        JOIN accounts a ON a.id = ar.account_id
        WHERE a.auth_id = auth.uid() AND ar.role_type = 'merchant'
    ));
CREATE POLICY "Service role manages reservations" ON reservations
    FOR ALL USING (auth.role() = 'service_role');

-- Bill splits: participants see
CREATE POLICY "Participants see bill splits" ON bill_splits
    FOR SELECT USING (
        initiator_account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
        OR EXISTS (
            SELECT 1 FROM jsonb_array_elements(participants) p
            WHERE (p->>'account_id')::UUID IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
        )
    );

-- ============================================================================
-- 10. COMMENTS
-- ============================================================================

COMMENT ON TABLE recipes IS 'Step-by-step recipes linked to product database';
COMMENT ON TABLE recipe_ratings IS 'User ratings and reviews for recipes';
COMMENT ON TABLE saved_recipes IS 'User saved recipe collections';
COMMENT ON TABLE marketplace_categories IS 'Product categories for B2C marketplace';
COMMENT ON TABLE marketplace_products IS 'Products for sale in marketplace';
COMMENT ON TABLE marketplace_orders IS 'Customer orders from marketplace';
COMMENT ON TABLE merchant_reservation_settings IS 'Reservation settings per merchant';
COMMENT ON TABLE reservations IS 'Table reservations';
COMMENT ON TABLE bill_splits IS 'Bill splitting between users';

COMMENT ON FUNCTION get_recipe_details IS 'Get recipe with full details and increment view';
COMMENT ON FUNCTION save_recipe IS 'Save recipe to user collection';
COMMENT ON FUNCTION mark_recipe_cooked IS 'Mark recipe as cooked and award points';
COMMENT ON FUNCTION create_reservation IS 'Create new reservation with validation';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
