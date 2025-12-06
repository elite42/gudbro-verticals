-- ============================================================================
-- Migration 009: Exchange Rates Table
--
-- Purpose: Store daily exchange rates for currency conversion in PWA.
--          Tourists see prices in their own currency (informational only).
--
-- Architecture:
--   exchange_rates -> Single row with JSONB rates, updated 1x/day at 00:05 UTC
--   exchange_rate_history -> Historical rates for auditing
--
-- Strategy:
--   - Base currency: USD (all rates relative to USD)
--   - Update frequency: 1x per day via Supabase Edge Function
--   - API: exchangerate-api.com (free tier: 1,500 requests/month)
--   - Conversion is INFORMATIONAL only (not transactional)
--
-- Date: 2025-12-05
-- Sprint: 1 - Database Foundation
-- ============================================================================

-- =============================================================================
-- EXCHANGE RATES TABLE
-- Current exchange rates (single row, updated daily)
-- =============================================================================

CREATE TABLE IF NOT EXISTS exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Base currency (all rates relative to this)
  base_currency VARCHAR(3) NOT NULL DEFAULT 'USD',

  -- Exchange rates as JSONB
  -- Format: { "EUR": 0.92, "VND": 25000, "GBP": 0.79, ... }
  rates JSONB NOT NULL DEFAULT '{}',

  -- Number of currencies in rates
  currency_count INTEGER GENERATED ALWAYS AS (jsonb_object_keys_count(rates)) STORED,

  -- Data source
  source VARCHAR(50) DEFAULT 'exchangerate-api.com',

  -- Timestamps
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure only one active row
  CONSTRAINT single_exchange_rate UNIQUE (base_currency)
);

-- Helper function for generated column (count keys in JSONB)
CREATE OR REPLACE FUNCTION jsonb_object_keys_count(j JSONB)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM jsonb_object_keys(j);
$$ LANGUAGE SQL IMMUTABLE;

-- Drop and recreate the column with the function
ALTER TABLE exchange_rates DROP COLUMN IF EXISTS currency_count;
ALTER TABLE exchange_rates ADD COLUMN currency_count INTEGER;

-- Update currency_count on changes
CREATE OR REPLACE FUNCTION update_exchange_rates_currency_count()
RETURNS TRIGGER AS $$
BEGIN
  NEW.currency_count := jsonb_object_keys_count(NEW.rates);
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_exchange_rates_count
  BEFORE INSERT OR UPDATE ON exchange_rates
  FOR EACH ROW
  EXECUTE FUNCTION update_exchange_rates_currency_count();

-- Enable RLS
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read, restricted write
CREATE POLICY "Public read access to exchange_rates"
  ON exchange_rates FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage exchange_rates"
  ON exchange_rates FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index
CREATE INDEX idx_exchange_rates_base ON exchange_rates(base_currency);
CREATE INDEX idx_exchange_rates_fetched ON exchange_rates(fetched_at DESC);

-- =============================================================================
-- EXCHANGE RATE HISTORY TABLE
-- Historical rates for auditing and analytics
-- =============================================================================

CREATE TABLE IF NOT EXISTS exchange_rate_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Base currency
  base_currency VARCHAR(3) NOT NULL DEFAULT 'USD',

  -- Rates snapshot
  rates JSONB NOT NULL,

  -- Source
  source VARCHAR(50),

  -- When this snapshot was taken
  snapshot_date DATE NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- One snapshot per day per base currency
  UNIQUE(base_currency, snapshot_date)
);

-- Enable RLS
ALTER TABLE exchange_rate_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to exchange_rate_history"
  ON exchange_rate_history FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage exchange_rate_history"
  ON exchange_rate_history FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_exchange_rate_history_date ON exchange_rate_history(snapshot_date DESC);
CREATE INDEX idx_exchange_rate_history_base_date ON exchange_rate_history(base_currency, snapshot_date DESC);

-- =============================================================================
-- TRIGGER: Archive rates to history on update
-- =============================================================================

CREATE OR REPLACE FUNCTION archive_exchange_rates()
RETURNS TRIGGER AS $$
BEGIN
  -- Archive old rates to history (if not already archived today)
  INSERT INTO exchange_rate_history (base_currency, rates, source, snapshot_date, fetched_at)
  VALUES (OLD.base_currency, OLD.rates, OLD.source, OLD.fetched_at::DATE, OLD.fetched_at)
  ON CONFLICT (base_currency, snapshot_date) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_archive_exchange_rates
  BEFORE UPDATE ON exchange_rates
  FOR EACH ROW
  EXECUTE FUNCTION archive_exchange_rates();

-- =============================================================================
-- HELPER FUNCTION: Convert currency
-- Converts amount from one currency to another using current rates
-- =============================================================================

CREATE OR REPLACE FUNCTION convert_currency(
  p_amount NUMERIC,
  p_from_currency VARCHAR(3),
  p_to_currency VARCHAR(3)
)
RETURNS NUMERIC AS $$
DECLARE
  v_rates JSONB;
  v_from_rate NUMERIC;
  v_to_rate NUMERIC;
  v_result NUMERIC;
BEGIN
  -- Same currency, no conversion needed
  IF p_from_currency = p_to_currency THEN
    RETURN p_amount;
  END IF;

  -- Get current rates (base: USD)
  SELECT rates INTO v_rates
  FROM exchange_rates
  WHERE base_currency = 'USD'
  LIMIT 1;

  -- If no rates available, return original amount
  IF v_rates IS NULL THEN
    RETURN p_amount;
  END IF;

  -- Get rates (USD = 1.0)
  IF p_from_currency = 'USD' THEN
    v_from_rate := 1.0;
  ELSE
    v_from_rate := (v_rates->>p_from_currency)::NUMERIC;
  END IF;

  IF p_to_currency = 'USD' THEN
    v_to_rate := 1.0;
  ELSE
    v_to_rate := (v_rates->>p_to_currency)::NUMERIC;
  END IF;

  -- If either currency not found, return original
  IF v_from_rate IS NULL OR v_to_rate IS NULL THEN
    RETURN p_amount;
  END IF;

  -- Convert: amount * (to_rate / from_rate)
  -- Example: 100 EUR to VND
  -- EUR rate: 0.92, VND rate: 25000
  -- 100 * (25000 / 0.92) = 2,717,391 VND
  v_result := p_amount * (v_to_rate / v_from_rate);

  RETURN ROUND(v_result, 2);
END;
$$ LANGUAGE plpgsql STABLE;

-- =============================================================================
-- HELPER FUNCTION: Get rate for currency pair
-- =============================================================================

CREATE OR REPLACE FUNCTION get_exchange_rate(
  p_from_currency VARCHAR(3),
  p_to_currency VARCHAR(3)
)
RETURNS NUMERIC AS $$
DECLARE
  v_rates JSONB;
  v_from_rate NUMERIC;
  v_to_rate NUMERIC;
BEGIN
  IF p_from_currency = p_to_currency THEN
    RETURN 1.0;
  END IF;

  SELECT rates INTO v_rates
  FROM exchange_rates
  WHERE base_currency = 'USD'
  LIMIT 1;

  IF v_rates IS NULL THEN
    RETURN NULL;
  END IF;

  v_from_rate := CASE WHEN p_from_currency = 'USD' THEN 1.0
                      ELSE (v_rates->>p_from_currency)::NUMERIC END;
  v_to_rate := CASE WHEN p_to_currency = 'USD' THEN 1.0
                    ELSE (v_rates->>p_to_currency)::NUMERIC END;

  IF v_from_rate IS NULL OR v_to_rate IS NULL THEN
    RETURN NULL;
  END IF;

  RETURN ROUND(v_to_rate / v_from_rate, 6);
END;
$$ LANGUAGE plpgsql STABLE;

-- =============================================================================
-- HELPER FUNCTION: Check if rates are stale
-- Returns true if rates are older than 25 hours
-- =============================================================================

CREATE OR REPLACE FUNCTION are_exchange_rates_stale()
RETURNS BOOLEAN AS $$
DECLARE
  v_fetched_at TIMESTAMP WITH TIME ZONE;
BEGIN
  SELECT fetched_at INTO v_fetched_at
  FROM exchange_rates
  WHERE base_currency = 'USD'
  LIMIT 1;

  IF v_fetched_at IS NULL THEN
    RETURN true; -- No rates at all
  END IF;

  -- Stale if older than 25 hours (allows some buffer)
  RETURN v_fetched_at < NOW() - INTERVAL '25 hours';
END;
$$ LANGUAGE plpgsql STABLE;

-- =============================================================================
-- SEED DATA: Initial exchange rates (approximate as of Dec 2025)
-- These will be replaced by the Edge Function on first run
-- =============================================================================

INSERT INTO exchange_rates (base_currency, rates, source, fetched_at)
VALUES (
  'USD',
  '{
    "EUR": 0.92,
    "GBP": 0.79,
    "VND": 25000,
    "JPY": 149.5,
    "KRW": 1320,
    "CNY": 7.24,
    "THB": 35.5,
    "AUD": 1.53,
    "CAD": 1.36,
    "CHF": 0.88,
    "SGD": 1.34,
    "HKD": 7.79,
    "SEK": 10.5,
    "NOK": 10.8,
    "DKK": 6.88,
    "PLN": 4.02,
    "CZK": 23.1,
    "HUF": 365,
    "RON": 4.58,
    "BGN": 1.80,
    "TRY": 29.0,
    "INR": 83.5,
    "IDR": 15800,
    "MYR": 4.72,
    "PHP": 56.0,
    "TWD": 31.8,
    "NZD": 1.65,
    "RUB": 92.0,
    "ZAR": 18.5,
    "BRL": 5.0,
    "MXN": 17.2,
    "ARS": 365,
    "AED": 3.67,
    "SAR": 3.75,
    "QAR": 3.64,
    "KWD": 0.31,
    "BHD": 0.38,
    "OMR": 0.39,
    "ILS": 3.70,
    "EGP": 31.0
  }'::JSONB,
  'seed-data',
  NOW() - INTERVAL '1 day' -- Mark as slightly stale to trigger update
)
ON CONFLICT (base_currency) DO UPDATE SET
  rates = EXCLUDED.rates,
  source = EXCLUDED.source,
  fetched_at = EXCLUDED.fetched_at,
  updated_at = NOW();

-- =============================================================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================================================

COMMENT ON TABLE exchange_rates IS
  'Current exchange rates with USD as base. Updated daily via Edge Function.';

COMMENT ON TABLE exchange_rate_history IS
  'Historical exchange rate snapshots for auditing. One per day.';

COMMENT ON FUNCTION convert_currency IS
  'Converts amount from one currency to another using current rates.';

COMMENT ON FUNCTION get_exchange_rate IS
  'Returns the exchange rate between two currencies.';

COMMENT ON FUNCTION are_exchange_rates_stale IS
  'Returns true if rates are older than 25 hours and need refresh.';

-- =============================================================================
-- GRANT PUBLIC READ ACCESS
-- =============================================================================

GRANT SELECT ON exchange_rates TO anon;
GRANT SELECT ON exchange_rate_history TO anon;
