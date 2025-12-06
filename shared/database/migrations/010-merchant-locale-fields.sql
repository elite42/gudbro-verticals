-- ============================================================================
-- Migration 010: Merchant Locale Fields + Auto-Populate Trigger
--
-- Purpose: Add country, language, and currency fields to merchants table.
--          Auto-populate settings from country selection during onboarding.
--
-- New Fields:
--   country_code      -> Merchant's country (FK to countries)
--   currency_code     -> Operating currency (auto-set from country)
--   primary_language  -> Main language for backoffice/receipts
--   enabled_languages -> Languages available in customer PWA
--   timezone          -> Merchant's timezone (auto-set from country)
--
-- Trigger:
--   Auto-populates currency, language, timezone when country changes
--
-- Date: 2025-12-05
-- Sprint: 1 - Database Foundation
-- ============================================================================

-- =============================================================================
-- ADD LOCALE COLUMNS TO MERCHANTS TABLE
-- =============================================================================

-- Country code (FK to countries table)
ALTER TABLE merchants
ADD COLUMN IF NOT EXISTS country_code VARCHAR(2)
  REFERENCES countries(code) ON DELETE SET NULL;

-- Currency code (derived from country, can be overridden)
ALTER TABLE merchants
ADD COLUMN IF NOT EXISTS currency_code VARCHAR(3) DEFAULT 'USD';

-- Currency symbol (for display)
ALTER TABLE merchants
ADD COLUMN IF NOT EXISTS currency_symbol VARCHAR(10) DEFAULT '$';

-- Primary language (for backoffice, receipts, default menu)
ALTER TABLE merchants
ADD COLUMN IF NOT EXISTS primary_language VARCHAR(5) DEFAULT 'en'
  REFERENCES languages(code) ON DELETE SET DEFAULT;

-- Enabled languages for customer PWA (array of language codes)
ALTER TABLE merchants
ADD COLUMN IF NOT EXISTS enabled_languages VARCHAR(5)[] DEFAULT ARRAY['en'];

-- Timezone
ALTER TABLE merchants
ADD COLUMN IF NOT EXISTS timezone VARCHAR(50) DEFAULT 'UTC';

-- =============================================================================
-- ADD INDEXES
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_merchants_country ON merchants(country_code);
CREATE INDEX IF NOT EXISTS idx_merchants_currency ON merchants(currency_code);
CREATE INDEX IF NOT EXISTS idx_merchants_language ON merchants(primary_language);

-- =============================================================================
-- AUTO-POPULATE TRIGGER
-- When country_code changes, auto-set currency, language, timezone
-- =============================================================================

CREATE OR REPLACE FUNCTION auto_populate_merchant_locale()
RETURNS TRIGGER AS $$
DECLARE
  v_country RECORD;
BEGIN
  -- Only run if country_code changed and is not null
  IF NEW.country_code IS NOT NULL AND
     (OLD.country_code IS DISTINCT FROM NEW.country_code) THEN

    -- Get country data
    SELECT *
    INTO v_country
    FROM countries
    WHERE code = NEW.country_code;

    IF FOUND THEN
      -- Auto-set currency (if not manually set or if country changed)
      IF NEW.currency_code IS NULL OR
         (OLD.country_code IS DISTINCT FROM NEW.country_code) THEN
        NEW.currency_code := v_country.currency_code;
        NEW.currency_symbol := v_country.currency_symbol;
      END IF;

      -- Auto-set primary language (if not manually set)
      IF NEW.primary_language IS NULL OR NEW.primary_language = 'en' THEN
        NEW.primary_language := v_country.primary_language;
      END IF;

      -- Auto-set timezone (if not manually set)
      IF NEW.timezone IS NULL OR NEW.timezone = 'UTC' THEN
        NEW.timezone := v_country.timezone;
      END IF;

      -- Auto-set enabled languages (primary + English + common languages)
      IF NEW.enabled_languages IS NULL OR
         array_length(NEW.enabled_languages, 1) <= 1 THEN
        NEW.enabled_languages := ARRAY[v_country.primary_language, 'en'] ||
                                  COALESCE(v_country.common_languages, ARRAY[]::VARCHAR[]);
        -- Remove duplicates
        NEW.enabled_languages := (SELECT ARRAY(SELECT DISTINCT unnest(NEW.enabled_languages)));
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trg_merchant_locale_auto_populate ON merchants;
CREATE TRIGGER trg_merchant_locale_auto_populate
  BEFORE INSERT OR UPDATE ON merchants
  FOR EACH ROW
  EXECUTE FUNCTION auto_populate_merchant_locale();

-- =============================================================================
-- HELPER FUNCTION: Get merchant locale config
-- Returns all locale settings for a merchant (used by PWA)
-- =============================================================================

CREATE OR REPLACE FUNCTION get_merchant_locale(p_merchant_id UUID)
RETURNS TABLE (
  merchant_id UUID,
  merchant_name VARCHAR,
  country_code VARCHAR(2),
  country_name VARCHAR(100),
  currency_code VARCHAR(3),
  currency_symbol VARCHAR(10),
  primary_language VARCHAR(5),
  primary_language_name VARCHAR(50),
  enabled_languages VARCHAR(5)[],
  timezone VARCHAR(50)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.id AS merchant_id,
    m.name AS merchant_name,
    m.country_code,
    c.name_en AS country_name,
    m.currency_code,
    m.currency_symbol,
    m.primary_language,
    l.name_en AS primary_language_name,
    m.enabled_languages,
    m.timezone
  FROM merchants m
  LEFT JOIN countries c ON c.code = m.country_code
  LEFT JOIN languages l ON l.code = m.primary_language
  WHERE m.id = p_merchant_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public;

-- =============================================================================
-- HELPER FUNCTION: Get enabled languages with details
-- Returns language details for merchant's enabled languages
-- =============================================================================

CREATE OR REPLACE FUNCTION get_merchant_languages(p_merchant_id UUID)
RETURNS TABLE (
  code VARCHAR(5),
  name_en VARCHAR(50),
  name_native VARCHAR(50),
  direction VARCHAR(3),
  is_primary BOOLEAN
) AS $$
DECLARE
  v_primary_language VARCHAR(5);
  v_enabled_languages VARCHAR(5)[];
BEGIN
  -- Get merchant's language settings
  SELECT m.primary_language, m.enabled_languages
  INTO v_primary_language, v_enabled_languages
  FROM merchants m
  WHERE m.id = p_merchant_id;

  RETURN QUERY
  SELECT
    l.code,
    l.name_en,
    l.name_native,
    l.direction,
    (l.code = v_primary_language) AS is_primary
  FROM languages l
  WHERE l.code = ANY(v_enabled_languages)
    AND l.is_active = true
  ORDER BY
    (l.code = v_primary_language) DESC, -- Primary first
    (l.code = 'en') DESC,               -- English second
    l.name_en;                          -- Then alphabetical
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public;

-- =============================================================================
-- UPDATE EXISTING MERCHANTS WITH LOCALE DATA
-- =============================================================================

-- Update existing Vietnam merchant (if exists)
UPDATE merchants
SET
  country_code = 'VN',
  currency_code = 'VND',
  currency_symbol = '₫',
  primary_language = 'vi',
  enabled_languages = ARRAY['vi', 'en', 'ko', 'zh', 'ja'],
  timezone = 'Asia/Ho_Chi_Minh'
WHERE name ILIKE '%vietnam%'
   OR name ILIKE '%vn%'
   OR name ILIKE '%saigon%'
   OR name ILIKE '%hanoi%'
   OR name ILIKE '%ho chi minh%';

-- Update existing Italy merchant (if exists)
UPDATE merchants
SET
  country_code = 'IT',
  currency_code = 'EUR',
  currency_symbol = '€',
  primary_language = 'it',
  enabled_languages = ARRAY['it', 'en', 'fr', 'de'],
  timezone = 'Europe/Rome'
WHERE name ILIKE '%italy%'
   OR name ILIKE '%italia%'
   OR name ILIKE '%rome%'
   OR name ILIKE '%roma%'
   OR name ILIKE '%milan%';

-- Default update for any merchant without country (set to VN for now)
UPDATE merchants
SET
  country_code = 'VN',
  currency_code = 'VND',
  currency_symbol = '₫',
  primary_language = 'vi',
  enabled_languages = ARRAY['vi', 'en'],
  timezone = 'Asia/Ho_Chi_Minh'
WHERE country_code IS NULL;

-- =============================================================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================================================

COMMENT ON COLUMN merchants.country_code IS
  'ISO 3166-1 alpha-2 country code. Auto-populates currency, language, timezone.';

COMMENT ON COLUMN merchants.currency_code IS
  'ISO 4217 currency code. Auto-set from country but can be overridden.';

COMMENT ON COLUMN merchants.primary_language IS
  'BCP 47 language code. Used for backoffice, receipts, default menu.';

COMMENT ON COLUMN merchants.enabled_languages IS
  'Array of language codes available in customer PWA. Order matters for display.';

COMMENT ON FUNCTION auto_populate_merchant_locale IS
  'Trigger function that auto-sets currency, language, timezone when country changes.';

COMMENT ON FUNCTION get_merchant_locale IS
  'Returns complete locale configuration for a merchant. Use in PWA initialization.';

COMMENT ON FUNCTION get_merchant_languages IS
  'Returns enabled languages with details for a merchant. Use in language selector.';
