-- ============================================================================
-- MERCHANT PAYMENT SETTINGS - CRYPTO & FIAT
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-10
-- Description: Payment configuration for merchants including crypto wallets
-- ============================================================================

-- ============================================================================
-- 1. MERCHANT PAYMENT SETTINGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS merchant_payment_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL UNIQUE REFERENCES merchants(id) ON DELETE CASCADE,

    -- =====================
    -- FIAT PAYMENT SETTINGS
    -- =====================

    -- Stripe
    stripe_enabled BOOLEAN DEFAULT FALSE,
    stripe_account_id TEXT,
    stripe_public_key TEXT,

    -- PayPal
    paypal_enabled BOOLEAN DEFAULT FALSE,
    paypal_client_id TEXT,
    paypal_mode TEXT DEFAULT 'sandbox' CHECK (paypal_mode IN ('sandbox', 'live')),

    -- Mobile Pay
    apple_pay_enabled BOOLEAN DEFAULT FALSE,
    google_pay_enabled BOOLEAN DEFAULT FALSE,
    samsung_pay_enabled BOOLEAN DEFAULT FALSE,

    -- Local Payment Methods (Vietnam)
    vietqr_enabled BOOLEAN DEFAULT FALSE,
    vietqr_bank_code TEXT,
    vietqr_account_number TEXT,
    vietqr_account_name TEXT,

    momo_enabled BOOLEAN DEFAULT FALSE,
    momo_phone TEXT,

    zalopay_enabled BOOLEAN DEFAULT FALSE,
    zalopay_app_id TEXT,

    -- ======================
    -- CRYPTO PAYMENT SETTINGS
    -- ======================

    crypto_enabled BOOLEAN DEFAULT FALSE,

    -- Wallet addresses stored as JSONB for flexibility
    -- Structure:
    -- {
    --   "BTC": {"address": "bc1q...", "enabled": true, "network": "bitcoin"},
    --   "ETH": {"address": "0x...", "enabled": true, "network": "ethereum"},
    --   "USDC": {"address": "0x...", "enabled": true, "network": "ethereum"},
    --   "USDT": {"address": "0x...", "enabled": true, "network": "ethereum"},
    --   "SOL": {"address": "...", "enabled": true, "network": "solana"},
    --   "TON": {"address": "...", "enabled": true, "network": "ton"},
    --   "BNB": {"address": "0x...", "enabled": true, "network": "bsc"}
    -- }
    crypto_wallets JSONB DEFAULT '{}',

    -- Display options
    crypto_show_prices_in_menu BOOLEAN DEFAULT FALSE,
    crypto_price_display_unit TEXT DEFAULT 'standard' CHECK (crypto_price_display_unit IN ('standard', 'milli', 'micro')),
    -- standard: 0.00045 BTC, milli: 0.45 mBTC, micro: 450 uBTC

    -- Payment settings
    crypto_payment_timeout_minutes INTEGER DEFAULT 30,
    crypto_price_buffer_percent DECIMAL(5,2) DEFAULT 0.5, -- Buffer for volatility

    -- Future: Payment gateway integration
    crypto_gateway_enabled BOOLEAN DEFAULT FALSE,
    crypto_gateway_provider TEXT CHECK (crypto_gateway_provider IN (
        'nowpayments', 'bitpay', 'coinbase_commerce', 'btcpay'
    )),
    crypto_gateway_api_key TEXT,
    crypto_auto_convert_to_fiat BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 2. CRYPTO ORDER PAYMENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS crypto_order_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- References
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,

    -- Payment details
    cryptocurrency TEXT NOT NULL,
    network TEXT NOT NULL, -- bitcoin, ethereum, solana, ton, bsc
    wallet_address TEXT NOT NULL,

    -- Amounts
    crypto_amount DECIMAL(20,8) NOT NULL,
    crypto_amount_display TEXT, -- Human readable: "0.45 mBTC"
    fiat_amount DECIMAL(12,2) NOT NULL,
    fiat_currency TEXT NOT NULL DEFAULT 'EUR',
    exchange_rate DECIMAL(20,8),
    exchange_rate_source TEXT DEFAULT 'coingecko',
    exchange_rate_timestamp TIMESTAMPTZ,

    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',      -- Waiting for payment
        'submitted',    -- Customer claims to have paid
        'confirmed',    -- Staff verified via explorer
        'completed',    -- Order fulfilled
        'expired',      -- Payment window closed
        'failed',       -- Payment verification failed
        'cancelled'     -- Customer cancelled
    )),

    -- Blockchain verification
    tx_hash TEXT,
    block_explorer_url TEXT, -- Generated URL for staff verification

    -- Customer info (optional)
    customer_wallet_address TEXT,
    customer_session_id TEXT,

    -- Timing
    expires_at TIMESTAMPTZ NOT NULL,
    submitted_at TIMESTAMPTZ, -- When customer clicked "I've paid"
    confirmed_at TIMESTAMPTZ, -- When staff confirmed
    completed_at TIMESTAMPTZ,

    -- Notes
    staff_notes TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 3. SUPPORTED CRYPTOCURRENCIES REFERENCE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS supported_cryptocurrencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    symbol TEXT NOT NULL UNIQUE, -- BTC, ETH, SOL, etc.
    name TEXT NOT NULL, -- Bitcoin, Ethereum, etc.
    network TEXT NOT NULL, -- bitcoin, ethereum, solana, ton, bsc

    -- Display
    icon_url TEXT,
    color TEXT, -- Hex color for UI

    -- Validation
    address_regex TEXT, -- Regex pattern for address validation
    address_example TEXT, -- Example address for UI

    -- Block explorer
    explorer_name TEXT NOT NULL,
    explorer_tx_url_template TEXT NOT NULL, -- https://etherscan.io/tx/{tx_hash}
    explorer_address_url_template TEXT, -- https://etherscan.io/address/{address}

    -- Metadata
    coingecko_id TEXT, -- For price API
    decimals INTEGER DEFAULT 8,
    min_confirmations INTEGER DEFAULT 1,

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert supported cryptocurrencies
INSERT INTO supported_cryptocurrencies (symbol, name, network, color, address_regex, address_example, explorer_name, explorer_tx_url_template, explorer_address_url_template, coingecko_id, decimals, min_confirmations, sort_order) VALUES
    ('BTC', 'Bitcoin', 'bitcoin', '#F7931A', '^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$', 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'Mempool', 'https://mempool.space/tx/{tx_hash}', 'https://mempool.space/address/{address}', 'bitcoin', 8, 1, 1),
    ('ETH', 'Ethereum', 'ethereum', '#627EEA', '^0x[a-fA-F0-9]{40}$', '0x742d35Cc6634C0532925a3b844Bc9e7595f8b1E0', 'Etherscan', 'https://etherscan.io/tx/{tx_hash}', 'https://etherscan.io/address/{address}', 'ethereum', 18, 12, 2),
    ('USDC', 'USD Coin', 'ethereum', '#2775CA', '^0x[a-fA-F0-9]{40}$', '0x742d35Cc6634C0532925a3b844Bc9e7595f8b1E0', 'Etherscan', 'https://etherscan.io/tx/{tx_hash}', 'https://etherscan.io/address/{address}', 'usd-coin', 6, 12, 3),
    ('USDT', 'Tether', 'ethereum', '#26A17B', '^0x[a-fA-F0-9]{40}$', '0x742d35Cc6634C0532925a3b844Bc9e7595f8b1E0', 'Etherscan', 'https://etherscan.io/tx/{tx_hash}', 'https://etherscan.io/address/{address}', 'tether', 6, 12, 4),
    ('SOL', 'Solana', 'solana', '#00FFA3', '^[1-9A-HJ-NP-Za-km-z]{32,44}$', '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs', 'Solscan', 'https://solscan.io/tx/{tx_hash}', 'https://solscan.io/account/{address}', 'solana', 9, 32, 5),
    ('TON', 'Toncoin', 'ton', '#0098EA', '^[UE][Qf][a-zA-Z0-9_-]{46}$', 'UQBvI0aFLnw2S6D-Kd_XMJy5qp7U4JiY9uCsLmxHp_mYRxxx', 'Tonscan', 'https://tonscan.org/tx/{tx_hash}', 'https://tonscan.org/address/{address}', 'the-open-network', 9, 1, 6),
    ('BNB', 'BNB', 'bsc', '#F3BA2F', '^0x[a-fA-F0-9]{40}$', '0x742d35Cc6634C0532925a3b844Bc9e7595f8b1E0', 'BscScan', 'https://bscscan.com/tx/{tx_hash}', 'https://bscscan.com/address/{address}', 'binancecoin', 18, 15, 7)
ON CONFLICT (symbol) DO NOTHING;

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_payment_settings_merchant ON merchant_payment_settings(merchant_id);
CREATE INDEX IF NOT EXISTS idx_payment_settings_crypto_enabled ON merchant_payment_settings(merchant_id) WHERE crypto_enabled = TRUE;

CREATE INDEX IF NOT EXISTS idx_crypto_payments_merchant ON crypto_order_payments(merchant_id);
CREATE INDEX IF NOT EXISTS idx_crypto_payments_order ON crypto_order_payments(order_id);
CREATE INDEX IF NOT EXISTS idx_crypto_payments_status ON crypto_order_payments(status);
CREATE INDEX IF NOT EXISTS idx_crypto_payments_pending ON crypto_order_payments(merchant_id, status, expires_at) WHERE status IN ('pending', 'submitted');
CREATE INDEX IF NOT EXISTS idx_crypto_payments_tx_hash ON crypto_order_payments(tx_hash) WHERE tx_hash IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_supported_crypto_active ON supported_cryptocurrencies(symbol) WHERE is_active = TRUE;

-- ============================================================================
-- 5. HELPER FUNCTIONS
-- ============================================================================

-- Get merchant crypto wallets (active ones only)
CREATE OR REPLACE FUNCTION get_merchant_crypto_wallets(p_merchant_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_wallets JSONB;
BEGIN
    SELECT crypto_wallets INTO v_wallets
    FROM merchant_payment_settings
    WHERE merchant_id = p_merchant_id
    AND crypto_enabled = TRUE;

    -- Filter to only enabled wallets
    IF v_wallets IS NOT NULL THEN
        SELECT jsonb_object_agg(key, value)
        INTO v_wallets
        FROM jsonb_each(v_wallets)
        WHERE (value->>'enabled')::BOOLEAN = TRUE;
    END IF;

    RETURN COALESCE(v_wallets, '{}'::JSONB);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Generate block explorer URL for a transaction
CREATE OR REPLACE FUNCTION get_block_explorer_url(
    p_cryptocurrency TEXT,
    p_tx_hash TEXT
)
RETURNS TEXT AS $$
DECLARE
    v_template TEXT;
BEGIN
    SELECT explorer_tx_url_template INTO v_template
    FROM supported_cryptocurrencies
    WHERE symbol = UPPER(p_cryptocurrency)
    AND is_active = TRUE;

    IF v_template IS NULL OR p_tx_hash IS NULL THEN
        RETURN NULL;
    END IF;

    RETURN REPLACE(v_template, '{tx_hash}', p_tx_hash);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Create a crypto payment request
CREATE OR REPLACE FUNCTION create_crypto_payment_request(
    p_merchant_id UUID,
    p_order_id UUID,
    p_cryptocurrency TEXT,
    p_fiat_amount DECIMAL,
    p_fiat_currency TEXT DEFAULT 'EUR',
    p_crypto_amount DECIMAL DEFAULT NULL,
    p_exchange_rate DECIMAL DEFAULT NULL,
    p_timeout_minutes INTEGER DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_wallet_address TEXT;
    v_network TEXT;
    v_payment_id UUID;
    v_timeout INTEGER;
BEGIN
    -- Get wallet address from merchant settings
    SELECT
        crypto_wallets->UPPER(p_cryptocurrency)->>'address',
        crypto_wallets->UPPER(p_cryptocurrency)->>'network',
        COALESCE(p_timeout_minutes, crypto_payment_timeout_minutes)
    INTO v_wallet_address, v_network, v_timeout
    FROM merchant_payment_settings
    WHERE merchant_id = p_merchant_id
    AND crypto_enabled = TRUE
    AND (crypto_wallets->UPPER(p_cryptocurrency)->>'enabled')::BOOLEAN = TRUE;

    IF v_wallet_address IS NULL THEN
        RAISE EXCEPTION 'Cryptocurrency % not enabled for merchant', p_cryptocurrency;
    END IF;

    -- Get network from supported_cryptocurrencies if not in wallet config
    IF v_network IS NULL THEN
        SELECT network INTO v_network
        FROM supported_cryptocurrencies
        WHERE symbol = UPPER(p_cryptocurrency);
    END IF;

    -- Create payment record
    INSERT INTO crypto_order_payments (
        merchant_id,
        order_id,
        cryptocurrency,
        network,
        wallet_address,
        crypto_amount,
        fiat_amount,
        fiat_currency,
        exchange_rate,
        exchange_rate_timestamp,
        status,
        expires_at
    ) VALUES (
        p_merchant_id,
        p_order_id,
        UPPER(p_cryptocurrency),
        v_network,
        v_wallet_address,
        COALESCE(p_crypto_amount, 0), -- Will be updated by frontend with real rate
        p_fiat_amount,
        p_fiat_currency,
        p_exchange_rate,
        CASE WHEN p_exchange_rate IS NOT NULL THEN NOW() ELSE NULL END,
        'pending',
        NOW() + (v_timeout || ' minutes')::INTERVAL
    )
    RETURNING id INTO v_payment_id;

    RETURN v_payment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Submit payment (customer claims to have paid)
CREATE OR REPLACE FUNCTION submit_crypto_payment(
    p_payment_id UUID,
    p_tx_hash TEXT DEFAULT NULL,
    p_customer_wallet TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_crypto TEXT;
    v_explorer_url TEXT;
BEGIN
    -- Get cryptocurrency for explorer URL
    SELECT cryptocurrency INTO v_crypto
    FROM crypto_order_payments
    WHERE id = p_payment_id AND status = 'pending';

    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;

    -- Generate explorer URL if tx_hash provided
    IF p_tx_hash IS NOT NULL THEN
        v_explorer_url := get_block_explorer_url(v_crypto, p_tx_hash);
    END IF;

    UPDATE crypto_order_payments
    SET
        status = 'submitted',
        tx_hash = p_tx_hash,
        block_explorer_url = v_explorer_url,
        customer_wallet_address = p_customer_wallet,
        submitted_at = NOW(),
        updated_at = NOW()
    WHERE id = p_payment_id AND status = 'pending';

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Confirm payment (staff verified)
CREATE OR REPLACE FUNCTION confirm_crypto_payment(
    p_payment_id UUID,
    p_staff_notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE crypto_order_payments
    SET
        status = 'confirmed',
        confirmed_at = NOW(),
        staff_notes = p_staff_notes,
        updated_at = NOW()
    WHERE id = p_payment_id AND status IN ('pending', 'submitted');

    -- Update order payment status if linked
    UPDATE orders
    SET
        payment_status = 'paid',
        payment_method = 'crypto',
        updated_at = NOW()
    WHERE id = (SELECT order_id FROM crypto_order_payments WHERE id = p_payment_id);

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Expire pending payments (called periodically)
CREATE OR REPLACE FUNCTION expire_pending_crypto_payments()
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE crypto_order_payments
    SET
        status = 'expired',
        updated_at = NOW()
    WHERE status = 'pending'
    AND expires_at < NOW();

    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_update_payment_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_payment_settings_updated ON merchant_payment_settings;
CREATE TRIGGER tr_payment_settings_updated
BEFORE UPDATE ON merchant_payment_settings
FOR EACH ROW
EXECUTE FUNCTION trigger_update_payment_settings_timestamp();

DROP TRIGGER IF EXISTS tr_crypto_payments_updated ON crypto_order_payments;
CREATE TRIGGER tr_crypto_payments_updated
BEFORE UPDATE ON crypto_order_payments
FOR EACH ROW
EXECUTE FUNCTION trigger_update_payment_settings_timestamp();

-- ============================================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE merchant_payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE crypto_order_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE supported_cryptocurrencies ENABLE ROW LEVEL SECURITY;

-- Payment Settings: Merchants manage their own settings
CREATE POLICY "Merchants manage own payment settings" ON merchant_payment_settings
    FOR ALL USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all payment settings" ON merchant_payment_settings
    FOR ALL USING (auth.role() = 'service_role');

-- Crypto Payments: Merchants see their own transactions
CREATE POLICY "Merchants see own crypto payments" ON crypto_order_payments
    FOR SELECT USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Merchants update own crypto payments" ON crypto_order_payments
    FOR UPDATE USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
            AND role_type = 'merchant'
            AND is_active = TRUE
        )
    );

CREATE POLICY "Service role manages all crypto payments" ON crypto_order_payments
    FOR ALL USING (auth.role() = 'service_role');

-- Supported Cryptocurrencies: Public read
CREATE POLICY "Anyone can view active cryptocurrencies" ON supported_cryptocurrencies
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Service role manages cryptocurrencies" ON supported_cryptocurrencies
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 8. COMMENTS
-- ============================================================================

COMMENT ON TABLE merchant_payment_settings IS 'Payment configuration for merchants including fiat and crypto options';
COMMENT ON TABLE crypto_order_payments IS 'Tracks cryptocurrency payment requests and their verification status';
COMMENT ON TABLE supported_cryptocurrencies IS 'Reference table of supported cryptocurrencies with validation and explorer info';

COMMENT ON FUNCTION get_merchant_crypto_wallets IS 'Get active crypto wallet addresses for a merchant';
COMMENT ON FUNCTION get_block_explorer_url IS 'Generate block explorer URL for transaction verification';
COMMENT ON FUNCTION create_crypto_payment_request IS 'Create a new crypto payment request for an order';
COMMENT ON FUNCTION submit_crypto_payment IS 'Mark payment as submitted by customer with optional tx hash';
COMMENT ON FUNCTION confirm_crypto_payment IS 'Staff confirms payment after verification';
COMMENT ON FUNCTION expire_pending_crypto_payments IS 'Expire payments that exceeded timeout';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
