-- ============================================================================
-- STEP 2: Remaining Migrations (Countries, Translations, Exchange Rates, Merchant Fields)
-- Run this AFTER 007a-languages-only.sql
-- ============================================================================

-- =============================================================================
-- COUNTRIES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS countries (
  code VARCHAR(2) PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_native VARCHAR(100),
  currency_code VARCHAR(3) NOT NULL,
  currency_symbol VARCHAR(10) NOT NULL,
  currency_name VARCHAR(50) NOT NULL,
  primary_language VARCHAR(5) NOT NULL REFERENCES languages(code),
  common_languages VARCHAR(5)[] DEFAULT '{}',
  timezone VARCHAR(50),
  phone_code VARCHAR(10),
  continent VARCHAR(20) CHECK (continent IN (
    'Africa', 'Antarctica', 'Asia', 'Europe',
    'North America', 'Oceania', 'South America'
  )),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_supported BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access to countries" ON countries;
CREATE POLICY "Public read access to countries"
  ON countries FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated users can manage countries" ON countries;
CREATE POLICY "Authenticated users can manage countries"
  ON countries FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_countries_active ON countries(is_active);
CREATE INDEX IF NOT EXISTS idx_countries_supported ON countries(is_supported) WHERE is_supported = true;
CREATE INDEX IF NOT EXISTS idx_countries_continent ON countries(continent);
CREATE INDEX IF NOT EXISTS idx_countries_currency ON countries(currency_code);

-- Seed countries
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent, is_supported) VALUES
  ('VN', 'Vietnam', 'Việt Nam', 'VND', '₫', 'Vietnamese Dong', 'vi', ARRAY['en', 'zh', 'ko', 'ja'], 'Asia/Ho_Chi_Minh', '+84', 'Asia', true),
  ('IT', 'Italy', 'Italia', 'EUR', '€', 'Euro', 'it', ARRAY['en', 'fr', 'de'], 'Europe/Rome', '+39', 'Europe', true),
  ('US', 'United States', 'United States', 'USD', '$', 'US Dollar', 'en', ARRAY['es', 'zh', 'vi'], 'America/New_York', '+1', 'North America', false),
  ('GB', 'United Kingdom', 'United Kingdom', 'GBP', '£', 'British Pound', 'en', ARRAY['pl', 'fr'], 'Europe/London', '+44', 'Europe', false),
  ('FR', 'France', 'France', 'EUR', '€', 'Euro', 'fr', ARRAY['en', 'ar', 'es'], 'Europe/Paris', '+33', 'Europe', false),
  ('DE', 'Germany', 'Deutschland', 'EUR', '€', 'Euro', 'de', ARRAY['en', 'tr', 'ru'], 'Europe/Berlin', '+49', 'Europe', false),
  ('ES', 'Spain', 'España', 'EUR', '€', 'Euro', 'es', ARRAY['en', 'ca', 'eu'], 'Europe/Madrid', '+34', 'Europe', false),
  ('JP', 'Japan', '日本', 'JPY', '¥', 'Japanese Yen', 'ja', ARRAY['en', 'zh', 'ko'], 'Asia/Tokyo', '+81', 'Asia', false),
  ('KR', 'South Korea', '대한민국', 'KRW', '₩', 'South Korean Won', 'ko', ARRAY['en', 'zh', 'ja'], 'Asia/Seoul', '+82', 'Asia', false),
  ('TH', 'Thailand', 'ประเทศไทย', 'THB', '฿', 'Thai Baht', 'th', ARRAY['en', 'zh', 'ja'], 'Asia/Bangkok', '+66', 'Asia', false),
  ('SG', 'Singapore', 'Singapore', 'SGD', 'S$', 'Singapore Dollar', 'en', ARRAY['zh', 'ms', 'ta'], 'Asia/Singapore', '+65', 'Asia', false),
  ('AU', 'Australia', 'Australia', 'AUD', 'A$', 'Australian Dollar', 'en', ARRAY['zh', 'vi', 'ar'], 'Australia/Sydney', '+61', 'Oceania', false),
  ('CN', 'China', '中国', 'CNY', '¥', 'Chinese Yuan', 'zh', ARRAY['en'], 'Asia/Shanghai', '+86', 'Asia', false),
  ('HK', 'Hong Kong', '香港', 'HKD', 'HK$', 'Hong Kong Dollar', 'zh', ARRAY['en', 'zh-TW'], 'Asia/Hong_Kong', '+852', 'Asia', false),
  ('TW', 'Taiwan', '臺灣', 'TWD', 'NT$', 'New Taiwan Dollar', 'zh-TW', ARRAY['en', 'ja'], 'Asia/Taipei', '+886', 'Asia', false),
  ('ID', 'Indonesia', 'Indonesia', 'IDR', 'Rp', 'Indonesian Rupiah', 'id', ARRAY['en', 'jv'], 'Asia/Jakarta', '+62', 'Asia', false),
  ('MY', 'Malaysia', 'Malaysia', 'MYR', 'RM', 'Malaysian Ringgit', 'ms', ARRAY['en', 'zh', 'ta'], 'Asia/Kuala_Lumpur', '+60', 'Asia', false),
  ('PH', 'Philippines', 'Pilipinas', 'PHP', '₱', 'Philippine Peso', 'tl', ARRAY['en', 'es'], 'Asia/Manila', '+63', 'Asia', false),
  ('IN', 'India', 'भारत', 'INR', '₹', 'Indian Rupee', 'hi', ARRAY['en', 'ta', 'te', 'bn'], 'Asia/Kolkata', '+91', 'Asia', false),
  ('AE', 'United Arab Emirates', 'الإمارات العربية المتحدة', 'AED', 'د.إ', 'UAE Dirham', 'ar', ARRAY['en', 'hi', 'ur'], 'Asia/Dubai', '+971', 'Asia', false),
  ('SA', 'Saudi Arabia', 'المملكة العربية السعودية', 'SAR', 'ر.س', 'Saudi Riyal', 'ar', ARRAY['en'], 'Asia/Riyadh', '+966', 'Asia', false),
  ('NL', 'Netherlands', 'Nederland', 'EUR', '€', 'Euro', 'nl', ARRAY['en', 'de'], 'Europe/Amsterdam', '+31', 'Europe', false),
  ('BE', 'Belgium', 'Belgique', 'EUR', '€', 'Euro', 'nl', ARRAY['fr', 'de', 'en'], 'Europe/Brussels', '+32', 'Europe', false),
  ('CH', 'Switzerland', 'Schweiz', 'CHF', 'CHF', 'Swiss Franc', 'de', ARRAY['fr', 'it', 'en'], 'Europe/Zurich', '+41', 'Europe', false),
  ('AT', 'Austria', 'Österreich', 'EUR', '€', 'Euro', 'de', ARRAY['en'], 'Europe/Vienna', '+43', 'Europe', false),
  ('PT', 'Portugal', 'Portugal', 'EUR', '€', 'Euro', 'pt', ARRAY['en', 'es'], 'Europe/Lisbon', '+351', 'Europe', false),
  ('PL', 'Poland', 'Polska', 'PLN', 'zł', 'Polish Zloty', 'pl', ARRAY['en', 'de'], 'Europe/Warsaw', '+48', 'Europe', false),
  ('SE', 'Sweden', 'Sverige', 'SEK', 'kr', 'Swedish Krona', 'sv', ARRAY['en'], 'Europe/Stockholm', '+46', 'Europe', false),
  ('NO', 'Norway', 'Norge', 'NOK', 'kr', 'Norwegian Krone', 'no', ARRAY['en'], 'Europe/Oslo', '+47', 'Europe', false),
  ('DK', 'Denmark', 'Danmark', 'DKK', 'kr', 'Danish Krone', 'da', ARRAY['en', 'de'], 'Europe/Copenhagen', '+45', 'Europe', false),
  ('FI', 'Finland', 'Suomi', 'EUR', '€', 'Euro', 'fi', ARRAY['sv', 'en'], 'Europe/Helsinki', '+358', 'Europe', false),
  ('IE', 'Ireland', 'Éire', 'EUR', '€', 'Euro', 'en', ARRAY['ga'], 'Europe/Dublin', '+353', 'Europe', false),
  ('GR', 'Greece', 'Ελλάδα', 'EUR', '€', 'Euro', 'el', ARRAY['en'], 'Europe/Athens', '+30', 'Europe', false),
  ('TR', 'Turkey', 'Türkiye', 'TRY', '₺', 'Turkish Lira', 'tr', ARRAY['en', 'ku'], 'Europe/Istanbul', '+90', 'Asia', false),
  ('RU', 'Russia', 'Россия', 'RUB', '₽', 'Russian Ruble', 'ru', ARRAY['en'], 'Europe/Moscow', '+7', 'Europe', false),
  ('BR', 'Brazil', 'Brasil', 'BRL', 'R$', 'Brazilian Real', 'pt', ARRAY['en', 'es'], 'America/Sao_Paulo', '+55', 'South America', false),
  ('MX', 'Mexico', 'México', 'MXN', '$', 'Mexican Peso', 'es', ARRAY['en'], 'America/Mexico_City', '+52', 'North America', false),
  ('AR', 'Argentina', 'Argentina', 'ARS', '$', 'Argentine Peso', 'es', ARRAY['en', 'it'], 'America/Buenos_Aires', '+54', 'South America', false),
  ('CA', 'Canada', 'Canada', 'CAD', 'C$', 'Canadian Dollar', 'en', ARRAY['fr', 'zh', 'pa'], 'America/Toronto', '+1', 'North America', false),
  ('NZ', 'New Zealand', 'New Zealand', 'NZD', 'NZ$', 'New Zealand Dollar', 'en', ARRAY['mi'], 'Pacific/Auckland', '+64', 'Oceania', false),
  ('ZA', 'South Africa', 'South Africa', 'ZAR', 'R', 'South African Rand', 'en', ARRAY['af', 'zu', 'xh'], 'Africa/Johannesburg', '+27', 'Africa', false),
  ('EG', 'Egypt', 'مصر', 'EGP', 'E£', 'Egyptian Pound', 'ar', ARRAY['en'], 'Africa/Cairo', '+20', 'Africa', false),
  ('IL', 'Israel', 'ישראל', 'ILS', '₪', 'Israeli New Shekel', 'he', ARRAY['ar', 'en'], 'Asia/Jerusalem', '+972', 'Asia', false)
ON CONFLICT (code) DO NOTHING;

GRANT SELECT ON countries TO anon;

-- =============================================================================
-- MENU ITEM TRANSLATIONS
-- =============================================================================

CREATE TABLE IF NOT EXISTS menu_item_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_machine_translated BOOLEAN DEFAULT false,
  translated_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(menu_item_id, language_code)
);

ALTER TABLE menu_item_translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access to menu_item_translations" ON menu_item_translations;
CREATE POLICY "Public read access to menu_item_translations"
  ON menu_item_translations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage menu_item_translations" ON menu_item_translations;
CREATE POLICY "Authenticated users can manage menu_item_translations"
  ON menu_item_translations FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_menu_item_translations_item ON menu_item_translations(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_menu_item_translations_lang ON menu_item_translations(language_code);

-- =============================================================================
-- CATEGORY TRANSLATIONS
-- =============================================================================

CREATE TABLE IF NOT EXISTS category_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_machine_translated BOOLEAN DEFAULT false,
  translated_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category_id, language_code)
);

ALTER TABLE category_translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access to category_translations" ON category_translations;
CREATE POLICY "Public read access to category_translations"
  ON category_translations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage category_translations" ON category_translations;
CREATE POLICY "Authenticated users can manage category_translations"
  ON category_translations FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_category_translations_category ON category_translations(category_id);
CREATE INDEX IF NOT EXISTS idx_category_translations_lang ON category_translations(language_code);

-- =============================================================================
-- EXCHANGE RATES
-- =============================================================================

CREATE TABLE IF NOT EXISTS exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  rates JSONB NOT NULL DEFAULT '{}',
  currency_count INTEGER,
  source VARCHAR(50) DEFAULT 'exchangerate-api.com',
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_exchange_rate UNIQUE (base_currency)
);

ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access to exchange_rates" ON exchange_rates;
CREATE POLICY "Public read access to exchange_rates"
  ON exchange_rates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can manage exchange_rates" ON exchange_rates;
CREATE POLICY "Service role can manage exchange_rates"
  ON exchange_rates FOR ALL USING (true) WITH CHECK (true);

-- Seed exchange rates
INSERT INTO exchange_rates (base_currency, rates, source, fetched_at, currency_count)
VALUES (
  'USD',
  '{
    "EUR": 0.92, "GBP": 0.79, "VND": 25000, "JPY": 149.5, "KRW": 1320,
    "CNY": 7.24, "THB": 35.5, "AUD": 1.53, "CAD": 1.36, "CHF": 0.88,
    "SGD": 1.34, "HKD": 7.79, "SEK": 10.5, "NOK": 10.8, "DKK": 6.88,
    "PLN": 4.02, "CZK": 23.1, "HUF": 365, "TRY": 29.0, "INR": 83.5,
    "IDR": 15800, "MYR": 4.72, "PHP": 56.0, "TWD": 31.8, "NZD": 1.65,
    "RUB": 92.0, "ZAR": 18.5, "BRL": 5.0, "MXN": 17.2, "AED": 3.67,
    "SAR": 3.75, "ILS": 3.70, "EGP": 31.0
  }'::JSONB,
  'seed-data',
  NOW() - INTERVAL '1 day',
  33
)
ON CONFLICT (base_currency) DO UPDATE SET
  rates = EXCLUDED.rates,
  source = EXCLUDED.source,
  fetched_at = EXCLUDED.fetched_at,
  currency_count = EXCLUDED.currency_count,
  updated_at = NOW();

GRANT SELECT ON exchange_rates TO anon;

-- =============================================================================
-- ADD LOCALE FIELDS TO MERCHANTS
-- =============================================================================

ALTER TABLE merchants ADD COLUMN IF NOT EXISTS country_code VARCHAR(2) REFERENCES countries(code) ON DELETE SET NULL;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS currency_code VARCHAR(3) DEFAULT 'USD';
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS currency_symbol VARCHAR(10) DEFAULT '$';
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS primary_language VARCHAR(5) DEFAULT 'en' REFERENCES languages(code) ON DELETE SET DEFAULT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS enabled_languages VARCHAR(5)[] DEFAULT ARRAY['en'];

CREATE INDEX IF NOT EXISTS idx_merchants_country ON merchants(country_code);
CREATE INDEX IF NOT EXISTS idx_merchants_currency ON merchants(currency_code);
CREATE INDEX IF NOT EXISTS idx_merchants_language ON merchants(primary_language);

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

CREATE OR REPLACE FUNCTION convert_currency(
  p_amount NUMERIC,
  p_from_currency VARCHAR(3),
  p_to_currency VARCHAR(3)
) RETURNS NUMERIC AS $$
DECLARE
  v_rates JSONB;
  v_from_rate NUMERIC;
  v_to_rate NUMERIC;
BEGIN
  IF p_from_currency = p_to_currency THEN RETURN p_amount; END IF;
  SELECT rates INTO v_rates FROM exchange_rates WHERE base_currency = 'USD' LIMIT 1;
  IF v_rates IS NULL THEN RETURN p_amount; END IF;
  v_from_rate := CASE WHEN p_from_currency = 'USD' THEN 1.0 ELSE (v_rates->>p_from_currency)::NUMERIC END;
  v_to_rate := CASE WHEN p_to_currency = 'USD' THEN 1.0 ELSE (v_rates->>p_to_currency)::NUMERIC END;
  IF v_from_rate IS NULL OR v_to_rate IS NULL THEN RETURN p_amount; END IF;
  RETURN ROUND(p_amount * (v_to_rate / v_from_rate), 2);
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION get_merchant_locale(p_merchant_id UUID)
RETURNS TABLE (
  merchant_id UUID, merchant_name VARCHAR, country_code VARCHAR(2), country_name VARCHAR(100),
  currency_code VARCHAR(3), currency_symbol VARCHAR(10), primary_language VARCHAR(5),
  primary_language_name VARCHAR(50), enabled_languages VARCHAR(5)[], timezone VARCHAR(50)
) AS $$
BEGIN
  RETURN QUERY
  SELECT m.id, m.name, m.country_code, c.name_en, m.currency_code, m.currency_symbol,
         m.primary_language, l.name_en, m.enabled_languages, m.timezone
  FROM merchants m
  LEFT JOIN countries c ON c.code = m.country_code
  LEFT JOIN languages l ON l.code = m.primary_language
  WHERE m.id = p_merchant_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- =============================================================================
-- UPDATE EXISTING MERCHANTS
-- =============================================================================

UPDATE merchants SET
  country_code = 'VN', currency_code = 'VND', currency_symbol = '₫',
  primary_language = 'vi', enabled_languages = ARRAY['vi', 'en']
WHERE country_code IS NULL;

-- =============================================================================
-- SUCCESS
-- =============================================================================

SELECT 'Migration completed!' AS status;
SELECT COUNT(*) AS countries_count FROM countries;
SELECT COUNT(*) AS languages_count FROM languages;
