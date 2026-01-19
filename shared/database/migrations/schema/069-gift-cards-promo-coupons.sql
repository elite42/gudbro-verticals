-- ============================================================================
-- GIFT CARDS, PROMO CODES & COUPONS SYSTEM
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-19
-- Description: Complete discount system with gift cards, promo codes, and coupons
--              Integrates with existing wallet system for gift card redemption
-- ============================================================================

-- ============================================================================
-- 1. GIFT CARDS
-- ============================================================================

-- Gift Card Settings (per merchant)
CREATE TABLE IF NOT EXISTS gift_card_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL UNIQUE REFERENCES merchants(id) ON DELETE CASCADE,

    -- Feature toggle
    is_enabled BOOLEAN DEFAULT FALSE,

    -- Amount constraints
    allow_custom_amounts BOOLEAN DEFAULT TRUE,
    min_amount_cents INTEGER DEFAULT 1000,  -- €10 minimum
    max_amount_cents INTEGER DEFAULT 50000, -- €500 maximum

    -- Expiry
    default_expiry_months INTEGER DEFAULT 12,

    -- Delivery options
    email_delivery_enabled BOOLEAN DEFAULT TRUE,
    sms_delivery_enabled BOOLEAN DEFAULT FALSE,
    print_delivery_enabled BOOLEAN DEFAULT TRUE,

    -- Branding
    custom_design_url TEXT,
    custom_message_template TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Gift Card Presets (suggested amounts)
CREATE TABLE IF NOT EXISTS gift_card_presets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

    amount_cents INTEGER NOT NULL,
    label TEXT, -- e.g., "Perfect for dinner", "Special treat"
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    UNIQUE(merchant_id, amount_cents)
);

-- Gift Cards
CREATE TABLE IF NOT EXISTS gift_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

    -- Code (unique, formatted as GIFT-XXXX-XXXX)
    code TEXT NOT NULL UNIQUE,

    -- Value
    amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
    currency TEXT NOT NULL DEFAULT 'EUR',

    -- Purchaser info
    purchaser_account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    purchaser_email TEXT,
    purchaser_name TEXT,

    -- Recipient info
    recipient_email TEXT,
    recipient_name TEXT,
    recipient_message TEXT,
    recipient_phone TEXT,

    -- Delivery
    delivery_method TEXT NOT NULL DEFAULT 'email' CHECK (delivery_method IN ('email', 'sms', 'print')),
    delivery_sent_at TIMESTAMPTZ,

    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',    -- Payment not completed
        'active',     -- Ready to use
        'redeemed',   -- Fully used
        'expired',    -- Past expiry date
        'cancelled'   -- Refunded/cancelled
    )),

    -- Redemption
    redeemed_by_account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    redeemed_at TIMESTAMPTZ,
    redeemed_wallet_id UUID, -- References customer_wallets

    -- Payment
    stripe_payment_intent_id TEXT,
    stripe_checkout_session_id TEXT,

    -- Validity
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 2. PROMO CODES
-- ============================================================================

CREATE TABLE IF NOT EXISTS promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

    -- Code (unique per merchant, uppercase)
    code TEXT NOT NULL,

    -- Discount type
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_item')),
    discount_value INTEGER NOT NULL, -- Percentage (0-100) or cents
    free_item_id UUID, -- References menu_items for free_item type

    -- Limits
    max_discount_cents INTEGER, -- Cap for percentage discounts
    min_order_cents INTEGER DEFAULT 0, -- Minimum order value

    -- Usage limits
    max_uses_total INTEGER, -- NULL = unlimited
    max_uses_per_customer INTEGER DEFAULT 1,
    current_uses INTEGER DEFAULT 0,

    -- Targeting
    first_order_only BOOLEAN DEFAULT FALSE,
    new_customers_only BOOLEAN DEFAULT FALSE,

    -- Status & validity
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'expired', 'depleted')),
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ,

    -- Product scope
    applies_to TEXT NOT NULL DEFAULT 'all' CHECK (applies_to IN ('all', 'categories', 'products')),
    applicable_category_ids UUID[] DEFAULT '{}',
    applicable_product_ids UUID[] DEFAULT '{}',

    -- Stacking
    is_stackable BOOLEAN DEFAULT FALSE, -- Can combine with coupons

    -- Campaign tracking
    campaign_name TEXT,
    campaign_source TEXT, -- e.g., 'email', 'social', 'influencer'

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    UNIQUE(merchant_id, code)
);

-- Promo Code Redemptions (tracking usage)
CREATE TABLE IF NOT EXISTS promo_code_redemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promo_code_id UUID NOT NULL REFERENCES promo_codes(id) ON DELETE CASCADE,
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

    -- Context
    order_id UUID, -- References orders
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,

    -- Applied discount
    discount_applied_cents INTEGER NOT NULL,
    order_subtotal_cents INTEGER NOT NULL,

    -- Session info
    session_id TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 3. COUPONS
-- ============================================================================

-- Coupon Templates (for bulk generation)
CREATE TABLE IF NOT EXISTS coupon_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

    -- Template info
    name TEXT NOT NULL,
    description TEXT,
    code_prefix TEXT DEFAULT 'CPN', -- Generated codes: CPN-XXXXXXXX

    -- Discount
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_item')),
    discount_value INTEGER NOT NULL,
    free_item_id UUID,
    max_discount_cents INTEGER,
    min_order_cents INTEGER DEFAULT 0,

    -- Product scope
    applies_to TEXT NOT NULL DEFAULT 'all' CHECK (applies_to IN ('all', 'categories', 'products')),
    applicable_category_ids UUID[] DEFAULT '{}',
    applicable_product_ids UUID[] DEFAULT '{}',

    -- Distribution
    distribution_type TEXT NOT NULL DEFAULT 'manual' CHECK (distribution_type IN (
        'manual',           -- Staff manually issues
        'auto_birthday',    -- Auto-issue on customer birthday
        'auto_inactivity',  -- Auto-issue after X days inactive
        'auto_first_order', -- Auto-issue after first order
        'auto_loyalty_tier' -- Auto-issue on loyalty tier upgrade
    )),

    -- Auto-trigger config (JSONB for flexibility)
    -- For auto_birthday: {"days_before": 7}
    -- For auto_inactivity: {"inactive_days": 30}
    -- For auto_loyalty_tier: {"tier_id": "uuid"}
    auto_trigger_config JSONB DEFAULT '{}',

    -- Validity
    validity_days INTEGER DEFAULT 30, -- How long issued coupons are valid

    -- Stacking
    is_stackable BOOLEAN DEFAULT FALSE,

    -- Status
    is_active BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Individual Coupons (issued to customers)
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES coupon_templates(id) ON DELETE SET NULL,
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

    -- Code (unique)
    code TEXT NOT NULL UNIQUE,

    -- Customer
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Discount (copied from template at issue time)
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_item')),
    discount_value INTEGER NOT NULL,
    free_item_id UUID,
    max_discount_cents INTEGER,
    min_order_cents INTEGER DEFAULT 0,

    -- Product scope
    applies_to TEXT NOT NULL DEFAULT 'all' CHECK (applies_to IN ('all', 'categories', 'products')),
    applicable_category_ids UUID[] DEFAULT '{}',
    applicable_product_ids UUID[] DEFAULT '{}',

    -- Stacking
    is_stackable BOOLEAN DEFAULT FALSE,

    -- Status
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired', 'revoked')),

    -- Dates
    issued_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    valid_until TIMESTAMPTZ NOT NULL,

    -- Redemption
    redeemed_at TIMESTAMPTZ,
    redeemed_order_id UUID, -- References orders
    discount_applied_cents INTEGER,

    -- Issue reason
    issue_reason TEXT, -- 'birthday', 'inactivity', 'manual', 'loyalty_tier'
    issued_by UUID REFERENCES accounts(id) ON DELETE SET NULL, -- Staff who issued (for manual)

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. ORDER DISCOUNTS (Unified tracking)
-- ============================================================================

CREATE TABLE IF NOT EXISTS order_discounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL, -- References orders
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

    -- Discount source
    discount_source TEXT NOT NULL CHECK (discount_source IN (
        'promo_code',
        'coupon',
        'loyalty',      -- From loyalty points
        'gift_card',    -- Partial gift card usage (rare)
        'manual'        -- Staff applied
    )),

    -- Source reference
    source_id UUID,     -- References the source table
    source_code TEXT,   -- The actual code used

    -- Applied amount
    discount_applied_cents INTEGER NOT NULL,

    -- Context
    applied_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    applied_by UUID REFERENCES accounts(id) ON DELETE SET NULL -- For manual discounts
);

-- ============================================================================
-- 5. DISCOUNT STACKING RULES
-- ============================================================================

CREATE TABLE IF NOT EXISTS discount_stacking_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL UNIQUE REFERENCES merchants(id) ON DELETE CASCADE,

    -- Stacking permissions
    allow_promo_coupon_stack BOOLEAN DEFAULT FALSE,
    allow_multiple_coupons BOOLEAN DEFAULT FALSE,
    max_coupons_per_order INTEGER DEFAULT 1,

    -- Limits
    max_discount_percent INTEGER DEFAULT 50, -- Max total discount as % of order
    max_discount_cents INTEGER, -- Absolute cap

    -- Priority (which applies first)
    -- Lower number = higher priority
    promo_code_priority INTEGER DEFAULT 1,
    coupon_priority INTEGER DEFAULT 2,
    loyalty_priority INTEGER DEFAULT 3,

    -- Wallet always applies after discounts
    wallet_after_discounts BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 6. INDEXES
-- ============================================================================

-- Gift Cards
CREATE INDEX IF NOT EXISTS idx_gift_cards_merchant ON gift_cards(merchant_id);
CREATE INDEX IF NOT EXISTS idx_gift_cards_code ON gift_cards(code);
CREATE INDEX IF NOT EXISTS idx_gift_cards_status ON gift_cards(merchant_id, status);
CREATE INDEX IF NOT EXISTS idx_gift_cards_purchaser ON gift_cards(purchaser_account_id) WHERE purchaser_account_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_gift_cards_recipient_email ON gift_cards(merchant_id, recipient_email) WHERE recipient_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_gift_cards_active ON gift_cards(merchant_id, status, expires_at) WHERE status = 'active';

-- Gift Card Presets
CREATE INDEX IF NOT EXISTS idx_gift_card_presets_merchant ON gift_card_presets(merchant_id);

-- Promo Codes
CREATE INDEX IF NOT EXISTS idx_promo_codes_merchant ON promo_codes(merchant_id);
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(merchant_id, code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(merchant_id, status, valid_from, valid_until) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_promo_codes_campaign ON promo_codes(merchant_id, campaign_name) WHERE campaign_name IS NOT NULL;

-- Promo Code Redemptions
CREATE INDEX IF NOT EXISTS idx_promo_redemptions_code ON promo_code_redemptions(promo_code_id);
CREATE INDEX IF NOT EXISTS idx_promo_redemptions_order ON promo_code_redemptions(order_id) WHERE order_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_promo_redemptions_account ON promo_code_redemptions(account_id) WHERE account_id IS NOT NULL;

-- Coupon Templates
CREATE INDEX IF NOT EXISTS idx_coupon_templates_merchant ON coupon_templates(merchant_id);
CREATE INDEX IF NOT EXISTS idx_coupon_templates_active ON coupon_templates(merchant_id, is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_coupon_templates_auto ON coupon_templates(merchant_id, distribution_type) WHERE distribution_type != 'manual';

-- Coupons
CREATE INDEX IF NOT EXISTS idx_coupons_merchant ON coupons(merchant_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_account ON coupons(account_id);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(account_id, status, valid_until) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_coupons_template ON coupons(template_id) WHERE template_id IS NOT NULL;

-- Order Discounts
CREATE INDEX IF NOT EXISTS idx_order_discounts_order ON order_discounts(order_id);
CREATE INDEX IF NOT EXISTS idx_order_discounts_merchant ON order_discounts(merchant_id);
CREATE INDEX IF NOT EXISTS idx_order_discounts_source ON order_discounts(discount_source, source_id);

-- ============================================================================
-- 7. HELPER FUNCTIONS
-- ============================================================================

-- Generate unique gift card code (GIFT-XXXX-XXXX format)
CREATE OR REPLACE FUNCTION generate_gift_card_code()
RETURNS TEXT AS $$
DECLARE
    v_code TEXT;
    v_chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- No I, O, 0, 1 for clarity
    v_i INTEGER;
    v_segment TEXT;
BEGIN
    LOOP
        -- Generate two 4-character segments
        v_code := 'GIFT-';

        -- First segment
        v_segment := '';
        FOR v_i IN 1..4 LOOP
            v_segment := v_segment || substr(v_chars, floor(random() * length(v_chars) + 1)::int, 1);
        END LOOP;
        v_code := v_code || v_segment || '-';

        -- Second segment
        v_segment := '';
        FOR v_i IN 1..4 LOOP
            v_segment := v_segment || substr(v_chars, floor(random() * length(v_chars) + 1)::int, 1);
        END LOOP;
        v_code := v_code || v_segment;

        -- Check uniqueness
        IF NOT EXISTS (SELECT 1 FROM gift_cards WHERE code = v_code) THEN
            RETURN v_code;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path = public;

-- Generate unique coupon code (CPN-XXXXXXXX format)
CREATE OR REPLACE FUNCTION generate_coupon_code(p_prefix TEXT DEFAULT 'CPN')
RETURNS TEXT AS $$
DECLARE
    v_code TEXT;
    v_chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    v_i INTEGER;
    v_segment TEXT;
BEGIN
    LOOP
        v_segment := '';
        FOR v_i IN 1..8 LOOP
            v_segment := v_segment || substr(v_chars, floor(random() * length(v_chars) + 1)::int, 1);
        END LOOP;
        v_code := p_prefix || '-' || v_segment;

        IF NOT EXISTS (SELECT 1 FROM coupons WHERE code = v_code) THEN
            RETURN v_code;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path = public;

-- Validate promo code
CREATE OR REPLACE FUNCTION validate_promo_code(
    p_merchant_id UUID,
    p_code TEXT,
    p_account_id UUID DEFAULT NULL,
    p_order_subtotal_cents INTEGER DEFAULT 0
)
RETURNS JSONB AS $$
DECLARE
    v_promo promo_codes%ROWTYPE;
    v_customer_uses INTEGER;
    v_is_first_order BOOLEAN;
    v_discount_cents INTEGER;
BEGIN
    -- Find the promo code
    SELECT * INTO v_promo
    FROM promo_codes
    WHERE merchant_id = p_merchant_id
    AND code = UPPER(p_code)
    AND status = 'active';

    IF NOT FOUND THEN
        RETURN jsonb_build_object('valid', FALSE, 'error', 'Code not found or inactive');
    END IF;

    -- Check validity dates
    IF v_promo.valid_from > NOW() THEN
        RETURN jsonb_build_object('valid', FALSE, 'error', 'Code not yet valid');
    END IF;

    IF v_promo.valid_until IS NOT NULL AND v_promo.valid_until < NOW() THEN
        RETURN jsonb_build_object('valid', FALSE, 'error', 'Code has expired');
    END IF;

    -- Check total usage limit
    IF v_promo.max_uses_total IS NOT NULL AND v_promo.current_uses >= v_promo.max_uses_total THEN
        RETURN jsonb_build_object('valid', FALSE, 'error', 'Code usage limit reached');
    END IF;

    -- Check minimum order
    IF p_order_subtotal_cents < v_promo.min_order_cents THEN
        RETURN jsonb_build_object(
            'valid', FALSE,
            'error', 'Minimum order not met',
            'min_order_cents', v_promo.min_order_cents
        );
    END IF;

    -- Check per-customer usage if account provided
    IF p_account_id IS NOT NULL AND v_promo.max_uses_per_customer IS NOT NULL THEN
        SELECT COUNT(*) INTO v_customer_uses
        FROM promo_code_redemptions
        WHERE promo_code_id = v_promo.id
        AND account_id = p_account_id;

        IF v_customer_uses >= v_promo.max_uses_per_customer THEN
            RETURN jsonb_build_object('valid', FALSE, 'error', 'You have already used this code');
        END IF;
    END IF;

    -- Check first order only
    IF v_promo.first_order_only AND p_account_id IS NOT NULL THEN
        SELECT NOT EXISTS (
            SELECT 1 FROM orders
            WHERE account_id = p_account_id
            AND merchant_id = p_merchant_id
            AND status NOT IN ('cancelled', 'refunded')
        ) INTO v_is_first_order;

        IF NOT v_is_first_order THEN
            RETURN jsonb_build_object('valid', FALSE, 'error', 'Code valid for first order only');
        END IF;
    END IF;

    -- Calculate discount
    IF v_promo.discount_type = 'percentage' THEN
        v_discount_cents := (p_order_subtotal_cents * v_promo.discount_value / 100);
        IF v_promo.max_discount_cents IS NOT NULL AND v_discount_cents > v_promo.max_discount_cents THEN
            v_discount_cents := v_promo.max_discount_cents;
        END IF;
    ELSIF v_promo.discount_type = 'fixed_amount' THEN
        v_discount_cents := v_promo.discount_value;
        IF v_discount_cents > p_order_subtotal_cents THEN
            v_discount_cents := p_order_subtotal_cents;
        END IF;
    ELSE -- free_item
        v_discount_cents := 0; -- Free item discount calculated separately
    END IF;

    RETURN jsonb_build_object(
        'valid', TRUE,
        'promo_code_id', v_promo.id,
        'discount_type', v_promo.discount_type,
        'discount_value', v_promo.discount_value,
        'discount_cents', v_discount_cents,
        'free_item_id', v_promo.free_item_id,
        'applies_to', v_promo.applies_to,
        'applicable_category_ids', v_promo.applicable_category_ids,
        'applicable_product_ids', v_promo.applicable_product_ids,
        'is_stackable', v_promo.is_stackable
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Validate coupon
CREATE OR REPLACE FUNCTION validate_coupon(
    p_code TEXT,
    p_account_id UUID,
    p_order_subtotal_cents INTEGER DEFAULT 0
)
RETURNS JSONB AS $$
DECLARE
    v_coupon coupons%ROWTYPE;
    v_discount_cents INTEGER;
BEGIN
    -- Find the coupon
    SELECT * INTO v_coupon
    FROM coupons
    WHERE code = UPPER(p_code)
    AND account_id = p_account_id
    AND status = 'active';

    IF NOT FOUND THEN
        RETURN jsonb_build_object('valid', FALSE, 'error', 'Coupon not found or not yours');
    END IF;

    -- Check expiry
    IF v_coupon.valid_until < NOW() THEN
        -- Update status
        UPDATE coupons SET status = 'expired', updated_at = NOW() WHERE id = v_coupon.id;
        RETURN jsonb_build_object('valid', FALSE, 'error', 'Coupon has expired');
    END IF;

    -- Check minimum order
    IF p_order_subtotal_cents < v_coupon.min_order_cents THEN
        RETURN jsonb_build_object(
            'valid', FALSE,
            'error', 'Minimum order not met',
            'min_order_cents', v_coupon.min_order_cents
        );
    END IF;

    -- Calculate discount
    IF v_coupon.discount_type = 'percentage' THEN
        v_discount_cents := (p_order_subtotal_cents * v_coupon.discount_value / 100);
        IF v_coupon.max_discount_cents IS NOT NULL AND v_discount_cents > v_coupon.max_discount_cents THEN
            v_discount_cents := v_coupon.max_discount_cents;
        END IF;
    ELSIF v_coupon.discount_type = 'fixed_amount' THEN
        v_discount_cents := v_coupon.discount_value;
        IF v_discount_cents > p_order_subtotal_cents THEN
            v_discount_cents := p_order_subtotal_cents;
        END IF;
    ELSE -- free_item
        v_discount_cents := 0;
    END IF;

    RETURN jsonb_build_object(
        'valid', TRUE,
        'coupon_id', v_coupon.id,
        'discount_type', v_coupon.discount_type,
        'discount_value', v_coupon.discount_value,
        'discount_cents', v_discount_cents,
        'free_item_id', v_coupon.free_item_id,
        'applies_to', v_coupon.applies_to,
        'applicable_category_ids', v_coupon.applicable_category_ids,
        'applicable_product_ids', v_coupon.applicable_product_ids,
        'is_stackable', v_coupon.is_stackable
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Redeem gift card to wallet
CREATE OR REPLACE FUNCTION redeem_gift_card(
    p_code TEXT,
    p_account_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_gift_card gift_cards%ROWTYPE;
    v_wallet_id UUID;
    v_transaction_id UUID;
BEGIN
    -- Find and lock the gift card
    SELECT * INTO v_gift_card
    FROM gift_cards
    WHERE code = UPPER(p_code)
    AND status = 'active'
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Gift card not found or not active');
    END IF;

    -- Check expiry
    IF v_gift_card.expires_at < NOW() THEN
        UPDATE gift_cards SET status = 'expired', updated_at = NOW() WHERE id = v_gift_card.id;
        RETURN jsonb_build_object('success', FALSE, 'error', 'Gift card has expired');
    END IF;

    -- Get or create wallet
    SELECT id INTO v_wallet_id
    FROM customer_wallets
    WHERE account_id = p_account_id
    AND merchant_id = v_gift_card.merchant_id;

    IF v_wallet_id IS NULL THEN
        -- Create wallet
        INSERT INTO customer_wallets (account_id, merchant_id, currency)
        VALUES (p_account_id, v_gift_card.merchant_id, v_gift_card.currency)
        RETURNING id INTO v_wallet_id;
    END IF;

    -- Update wallet balance
    UPDATE customer_wallets
    SET
        balance_cents = balance_cents + v_gift_card.amount_cents,
        updated_at = NOW()
    WHERE id = v_wallet_id;

    -- Create wallet transaction
    INSERT INTO wallet_transactions (
        wallet_id,
        transaction_type,
        amount_cents,
        bonus_amount_cents,
        balance_after_cents,
        bonus_balance_after_cents,
        reference_type,
        reference_id,
        description
    )
    SELECT
        v_wallet_id,
        'top_up_cash', -- Using existing type for gift card credit
        v_gift_card.amount_cents,
        0,
        cw.balance_cents,
        cw.bonus_balance_cents,
        'gift_card',
        v_gift_card.id::TEXT,
        'Gift card redemption: ' || v_gift_card.code
    FROM customer_wallets cw
    WHERE cw.id = v_wallet_id
    RETURNING id INTO v_transaction_id;

    -- Update gift card status
    UPDATE gift_cards
    SET
        status = 'redeemed',
        redeemed_by_account_id = p_account_id,
        redeemed_at = NOW(),
        redeemed_wallet_id = v_wallet_id,
        updated_at = NOW()
    WHERE id = v_gift_card.id;

    RETURN jsonb_build_object(
        'success', TRUE,
        'amount_cents', v_gift_card.amount_cents,
        'currency', v_gift_card.currency,
        'wallet_id', v_wallet_id,
        'transaction_id', v_transaction_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Use promo code (increment usage, create redemption record)
CREATE OR REPLACE FUNCTION use_promo_code(
    p_promo_code_id UUID,
    p_order_id UUID,
    p_account_id UUID,
    p_discount_cents INTEGER,
    p_order_subtotal_cents INTEGER
)
RETURNS UUID AS $$
DECLARE
    v_redemption_id UUID;
    v_merchant_id UUID;
BEGIN
    -- Get merchant_id
    SELECT merchant_id INTO v_merchant_id FROM promo_codes WHERE id = p_promo_code_id;

    -- Increment usage counter
    UPDATE promo_codes
    SET
        current_uses = current_uses + 1,
        updated_at = NOW()
    WHERE id = p_promo_code_id;

    -- Check if depleted
    UPDATE promo_codes
    SET status = 'depleted'
    WHERE id = p_promo_code_id
    AND max_uses_total IS NOT NULL
    AND current_uses >= max_uses_total;

    -- Create redemption record
    INSERT INTO promo_code_redemptions (
        promo_code_id,
        merchant_id,
        order_id,
        account_id,
        discount_applied_cents,
        order_subtotal_cents
    ) VALUES (
        p_promo_code_id,
        v_merchant_id,
        p_order_id,
        p_account_id,
        p_discount_cents,
        p_order_subtotal_cents
    )
    RETURNING id INTO v_redemption_id;

    RETURN v_redemption_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Use coupon
CREATE OR REPLACE FUNCTION use_coupon(
    p_coupon_id UUID,
    p_order_id UUID,
    p_discount_cents INTEGER
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE coupons
    SET
        status = 'used',
        redeemed_at = NOW(),
        redeemed_order_id = p_order_id,
        discount_applied_cents = p_discount_cents,
        updated_at = NOW()
    WHERE id = p_coupon_id
    AND status = 'active';

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Issue coupon from template
CREATE OR REPLACE FUNCTION issue_coupon(
    p_template_id UUID,
    p_account_id UUID,
    p_issue_reason TEXT DEFAULT 'manual',
    p_issued_by UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_template coupon_templates%ROWTYPE;
    v_coupon_id UUID;
    v_code TEXT;
BEGIN
    -- Get template
    SELECT * INTO v_template FROM coupon_templates WHERE id = p_template_id AND is_active = TRUE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Template not found or inactive';
    END IF;

    -- Generate unique code
    v_code := generate_coupon_code(COALESCE(v_template.code_prefix, 'CPN'));

    -- Create coupon
    INSERT INTO coupons (
        template_id,
        merchant_id,
        code,
        account_id,
        discount_type,
        discount_value,
        free_item_id,
        max_discount_cents,
        min_order_cents,
        applies_to,
        applicable_category_ids,
        applicable_product_ids,
        is_stackable,
        valid_until,
        issue_reason,
        issued_by
    ) VALUES (
        p_template_id,
        v_template.merchant_id,
        v_code,
        p_account_id,
        v_template.discount_type,
        v_template.discount_value,
        v_template.free_item_id,
        v_template.max_discount_cents,
        v_template.min_order_cents,
        v_template.applies_to,
        v_template.applicable_category_ids,
        v_template.applicable_product_ids,
        v_template.is_stackable,
        NOW() + (v_template.validity_days || ' days')::INTERVAL,
        p_issue_reason,
        p_issued_by
    )
    RETURNING id INTO v_coupon_id;

    RETURN v_coupon_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 8. TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_update_discount_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_gift_card_settings_updated ON gift_card_settings;
CREATE TRIGGER tr_gift_card_settings_updated
BEFORE UPDATE ON gift_card_settings
FOR EACH ROW EXECUTE FUNCTION trigger_update_discount_timestamp();

DROP TRIGGER IF EXISTS tr_gift_cards_updated ON gift_cards;
CREATE TRIGGER tr_gift_cards_updated
BEFORE UPDATE ON gift_cards
FOR EACH ROW EXECUTE FUNCTION trigger_update_discount_timestamp();

DROP TRIGGER IF EXISTS tr_promo_codes_updated ON promo_codes;
CREATE TRIGGER tr_promo_codes_updated
BEFORE UPDATE ON promo_codes
FOR EACH ROW EXECUTE FUNCTION trigger_update_discount_timestamp();

DROP TRIGGER IF EXISTS tr_coupon_templates_updated ON coupon_templates;
CREATE TRIGGER tr_coupon_templates_updated
BEFORE UPDATE ON coupon_templates
FOR EACH ROW EXECUTE FUNCTION trigger_update_discount_timestamp();

DROP TRIGGER IF EXISTS tr_coupons_updated ON coupons;
CREATE TRIGGER tr_coupons_updated
BEFORE UPDATE ON coupons
FOR EACH ROW EXECUTE FUNCTION trigger_update_discount_timestamp();

DROP TRIGGER IF EXISTS tr_stacking_rules_updated ON discount_stacking_rules;
CREATE TRIGGER tr_stacking_rules_updated
BEFORE UPDATE ON discount_stacking_rules
FOR EACH ROW EXECUTE FUNCTION trigger_update_discount_timestamp();

-- Auto-generate gift card code if not provided
CREATE OR REPLACE FUNCTION trigger_generate_gift_card_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.code IS NULL OR NEW.code = '' THEN
        NEW.code := generate_gift_card_code();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_gift_card_code_gen ON gift_cards;
CREATE TRIGGER tr_gift_card_code_gen
BEFORE INSERT ON gift_cards
FOR EACH ROW EXECUTE FUNCTION trigger_generate_gift_card_code();

-- ============================================================================
-- 9. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE gift_card_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_card_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_code_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_stacking_rules ENABLE ROW LEVEL SECURITY;

-- Gift Card Settings: Merchants manage their own
CREATE POLICY "Merchants manage own gift card settings" ON gift_card_settings
    FOR ALL USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all gift card settings" ON gift_card_settings
    FOR ALL USING (auth.role() = 'service_role');

-- Gift Card Presets: Merchants manage their own
CREATE POLICY "Merchants manage own gift card presets" ON gift_card_presets
    FOR ALL USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all gift card presets" ON gift_card_presets
    FOR ALL USING (auth.role() = 'service_role');

-- Gift Cards: Merchants see their own, customers can view their purchased/received
CREATE POLICY "Merchants see own gift cards" ON gift_cards
    FOR SELECT USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Customers see their gift cards" ON gift_cards
    FOR SELECT USING (
        purchaser_account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
        OR redeemed_by_account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

CREATE POLICY "Service role manages all gift cards" ON gift_cards
    FOR ALL USING (auth.role() = 'service_role');

-- Promo Codes: Merchants manage their own
CREATE POLICY "Merchants manage own promo codes" ON promo_codes
    FOR ALL USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all promo codes" ON promo_codes
    FOR ALL USING (auth.role() = 'service_role');

-- Promo Code Redemptions: Merchants see their own
CREATE POLICY "Merchants see own promo redemptions" ON promo_code_redemptions
    FOR SELECT USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all promo redemptions" ON promo_code_redemptions
    FOR ALL USING (auth.role() = 'service_role');

-- Coupon Templates: Merchants manage their own
CREATE POLICY "Merchants manage own coupon templates" ON coupon_templates
    FOR ALL USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all coupon templates" ON coupon_templates
    FOR ALL USING (auth.role() = 'service_role');

-- Coupons: Customers see their own, merchants see all theirs
CREATE POLICY "Customers see their coupons" ON coupons
    FOR SELECT USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

CREATE POLICY "Merchants see issued coupons" ON coupons
    FOR SELECT USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Merchants manage issued coupons" ON coupons
    FOR ALL USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all coupons" ON coupons
    FOR ALL USING (auth.role() = 'service_role');

-- Order Discounts: Merchants see their own
CREATE POLICY "Merchants see own order discounts" ON order_discounts
    FOR SELECT USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all order discounts" ON order_discounts
    FOR ALL USING (auth.role() = 'service_role');

-- Stacking Rules: Merchants manage their own
CREATE POLICY "Merchants manage own stacking rules" ON discount_stacking_rules
    FOR ALL USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all stacking rules" ON discount_stacking_rules
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 10. COMMENTS
-- ============================================================================

COMMENT ON TABLE gift_card_settings IS 'Per-merchant gift card configuration';
COMMENT ON TABLE gift_card_presets IS 'Suggested gift card amounts for quick purchase';
COMMENT ON TABLE gift_cards IS 'Individual gift cards with purchase and redemption tracking';
COMMENT ON TABLE promo_codes IS 'Marketing promo codes with usage limits and targeting';
COMMENT ON TABLE promo_code_redemptions IS 'Tracking of promo code usage per order';
COMMENT ON TABLE coupon_templates IS 'Templates for generating personalized coupons';
COMMENT ON TABLE coupons IS 'Individual coupons issued to specific customers';
COMMENT ON TABLE order_discounts IS 'Unified tracking of all discounts applied to orders';
COMMENT ON TABLE discount_stacking_rules IS 'Per-merchant rules for combining discounts';

COMMENT ON FUNCTION generate_gift_card_code IS 'Generate unique GIFT-XXXX-XXXX code';
COMMENT ON FUNCTION generate_coupon_code IS 'Generate unique CPN-XXXXXXXX code';
COMMENT ON FUNCTION validate_promo_code IS 'Validate promo code eligibility and calculate discount';
COMMENT ON FUNCTION validate_coupon IS 'Validate coupon eligibility and calculate discount';
COMMENT ON FUNCTION redeem_gift_card IS 'Redeem gift card and credit to customer wallet';
COMMENT ON FUNCTION use_promo_code IS 'Mark promo code as used and create redemption record';
COMMENT ON FUNCTION use_coupon IS 'Mark coupon as used';
COMMENT ON FUNCTION issue_coupon IS 'Issue a new coupon from template to customer';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
