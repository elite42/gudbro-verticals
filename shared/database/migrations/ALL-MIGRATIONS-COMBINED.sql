-- ============================================================================
-- Migration 007: Countries and Languages Tables (Multi-Locale Foundation)
--
-- Purpose: Foundation for multi-locale system - countries with their default
--          currencies/languages and the languages table for translations.
--
-- Architecture:
--   countries  -> 197 countries with ISO codes, currencies, languages
--   languages  -> 30+ languages with RTL support for translations
--
-- Date: 2025-12-05
-- Sprint: 1 - Database Foundation
-- ============================================================================

-- =============================================================================
-- LANGUAGES TABLE
-- Supported languages for menu translations and UI
-- =============================================================================

CREATE TABLE IF NOT EXISTS languages (
  code VARCHAR(5) PRIMARY KEY, -- BCP 47 code (e.g., 'en', 'vi', 'it', 'ar')

  -- Display names
  name_en VARCHAR(50) NOT NULL, -- English name
  name_native VARCHAR(50) NOT NULL, -- Native name (e.g., "Tiếng Việt")

  -- Writing system
  direction VARCHAR(3) NOT NULL DEFAULT 'ltr'
    CHECK (direction IN ('ltr', 'rtl')),

  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read access
CREATE POLICY "Public read access to languages"
  ON languages FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage languages"
  ON languages FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_languages_active ON languages(is_active);

-- =============================================================================
-- COUNTRIES TABLE
-- All 197 countries with their default locale settings
-- =============================================================================

CREATE TABLE IF NOT EXISTS countries (
  code VARCHAR(2) PRIMARY KEY, -- ISO 3166-1 alpha-2 (e.g., 'IT', 'VN', 'US')

  -- Display names
  name_en VARCHAR(100) NOT NULL, -- English name
  name_native VARCHAR(100), -- Native name (optional)

  -- Default locale settings
  currency_code VARCHAR(3) NOT NULL, -- ISO 4217 (e.g., 'EUR', 'VND', 'USD')
  currency_symbol VARCHAR(10) NOT NULL, -- Symbol (e.g., '€', '₫', '$')
  currency_name VARCHAR(50) NOT NULL, -- Full name (e.g., 'Euro', 'Vietnamese Dong')

  -- Language defaults
  primary_language VARCHAR(5) NOT NULL REFERENCES languages(code),
  common_languages VARCHAR(5)[] DEFAULT '{}', -- Other commonly used languages

  -- Regional settings
  timezone VARCHAR(50), -- Default timezone (e.g., 'Europe/Rome')
  phone_code VARCHAR(10), -- International dialing code (e.g., '+39')

  -- Geographic
  continent VARCHAR(20) CHECK (continent IN (
    'Africa', 'Antarctica', 'Asia', 'Europe',
    'North America', 'Oceania', 'South America'
  )),

  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_supported BOOLEAN NOT NULL DEFAULT false, -- True if GUDBRO operates here

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to countries"
  ON countries FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage countries"
  ON countries FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_countries_active ON countries(is_active);
CREATE INDEX idx_countries_supported ON countries(is_supported) WHERE is_supported = true;
CREATE INDEX idx_countries_continent ON countries(continent);
CREATE INDEX idx_countries_currency ON countries(currency_code);

-- =============================================================================
-- SEED DATA: 30+ Languages
-- =============================================================================

INSERT INTO languages (code, name_en, name_native, direction) VALUES
  -- Major European Languages (LTR)
  ('en', 'English', 'English', 'ltr'),
  ('it', 'Italian', 'Italiano', 'ltr'),
  ('es', 'Spanish', 'Español', 'ltr'),
  ('fr', 'French', 'Français', 'ltr'),
  ('de', 'German', 'Deutsch', 'ltr'),
  ('pt', 'Portuguese', 'Português', 'ltr'),
  ('nl', 'Dutch', 'Nederlands', 'ltr'),
  ('pl', 'Polish', 'Polski', 'ltr'),
  ('ru', 'Russian', 'Русский', 'ltr'),
  ('uk', 'Ukrainian', 'Українська', 'ltr'),
  ('el', 'Greek', 'Ελληνικά', 'ltr'),
  ('ro', 'Romanian', 'Română', 'ltr'),
  ('cs', 'Czech', 'Čeština', 'ltr'),
  ('sv', 'Swedish', 'Svenska', 'ltr'),
  ('da', 'Danish', 'Dansk', 'ltr'),
  ('no', 'Norwegian', 'Norsk', 'ltr'),
  ('fi', 'Finnish', 'Suomi', 'ltr'),

  -- Asian Languages (LTR)
  ('vi', 'Vietnamese', 'Tiếng Việt', 'ltr'),
  ('zh', 'Chinese (Simplified)', '简体中文', 'ltr'),
  ('zh-TW', 'Chinese (Traditional)', '繁體中文', 'ltr'),
  ('ja', 'Japanese', '日本語', 'ltr'),
  ('ko', 'Korean', '한국어', 'ltr'),
  ('th', 'Thai', 'ไทย', 'ltr'),
  ('id', 'Indonesian', 'Bahasa Indonesia', 'ltr'),
  ('ms', 'Malay', 'Bahasa Melayu', 'ltr'),
  ('hi', 'Hindi', 'हिन्दी', 'ltr'),
  ('bn', 'Bengali', 'বাংলা', 'ltr'),
  ('ta', 'Tamil', 'தமிழ்', 'ltr'),

  -- RTL Languages
  ('ar', 'Arabic', 'العربية', 'rtl'),
  ('he', 'Hebrew', 'עברית', 'rtl'),
  ('fa', 'Persian', 'فارسی', 'rtl'),
  ('ur', 'Urdu', 'اردو', 'rtl'),

  -- Other
  ('tr', 'Turkish', 'Türkçe', 'ltr'),
  ('hu', 'Hungarian', 'Magyar', 'ltr')
ON CONFLICT (code) DO NOTHING;

-- =============================================================================
-- SEED DATA: 197 Countries (Key Countries First)
-- =============================================================================

-- Primary Market Countries (is_supported = true)
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent, is_supported) VALUES
  -- Currently Active Markets
  ('VN', 'Vietnam', 'Việt Nam', 'VND', '₫', 'Vietnamese Dong', 'vi', ARRAY['en', 'zh', 'ko', 'ja'], 'Asia/Ho_Chi_Minh', '+84', 'Asia', true),
  ('IT', 'Italy', 'Italia', 'EUR', '€', 'Euro', 'it', ARRAY['en', 'fr', 'de'], 'Europe/Rome', '+39', 'Europe', true),

  -- Planned Expansion Markets
  ('US', 'United States', 'United States', 'USD', '$', 'US Dollar', 'en', ARRAY['es', 'zh', 'vi'], 'America/New_York', '+1', 'North America', false),
  ('GB', 'United Kingdom', 'United Kingdom', 'GBP', '£', 'British Pound', 'en', ARRAY['pl', 'fr'], 'Europe/London', '+44', 'Europe', false),
  ('FR', 'France', 'France', 'EUR', '€', 'Euro', 'fr', ARRAY['en', 'ar', 'es'], 'Europe/Paris', '+33', 'Europe', false),
  ('DE', 'Germany', 'Deutschland', 'EUR', '€', 'Euro', 'de', ARRAY['en', 'tr', 'ru'], 'Europe/Berlin', '+49', 'Europe', false),
  ('ES', 'Spain', 'España', 'EUR', '€', 'Euro', 'es', ARRAY['en', 'ca', 'eu'], 'Europe/Madrid', '+34', 'Europe', false),
  ('JP', 'Japan', '日本', 'JPY', '¥', 'Japanese Yen', 'ja', ARRAY['en', 'zh', 'ko'], 'Asia/Tokyo', '+81', 'Asia', false),
  ('KR', 'South Korea', '대한민국', 'KRW', '₩', 'South Korean Won', 'ko', ARRAY['en', 'zh', 'ja'], 'Asia/Seoul', '+82', 'Asia', false),
  ('TH', 'Thailand', 'ประเทศไทย', 'THB', '฿', 'Thai Baht', 'th', ARRAY['en', 'zh', 'ja'], 'Asia/Bangkok', '+66', 'Asia', false),
  ('AE', 'United Arab Emirates', 'الإمارات العربية المتحدة', 'AED', 'د.إ', 'UAE Dirham', 'ar', ARRAY['en', 'hi', 'ur'], 'Asia/Dubai', '+971', 'Asia', false),
  ('SG', 'Singapore', 'Singapore', 'SGD', 'S$', 'Singapore Dollar', 'en', ARRAY['zh', 'ms', 'ta'], 'Asia/Singapore', '+65', 'Asia', false),
  ('AU', 'Australia', 'Australia', 'AUD', 'A$', 'Australian Dollar', 'en', ARRAY['zh', 'vi', 'ar'], 'Australia/Sydney', '+61', 'Oceania', false),
  ('CA', 'Canada', 'Canada', 'CAD', 'C$', 'Canadian Dollar', 'en', ARRAY['fr', 'zh', 'pa'], 'America/Toronto', '+1', 'North America', false)
ON CONFLICT (code) DO NOTHING;

-- European Countries
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent) VALUES
  ('AT', 'Austria', 'Österreich', 'EUR', '€', 'Euro', 'de', ARRAY['en'], 'Europe/Vienna', '+43', 'Europe'),
  ('BE', 'Belgium', 'Belgique', 'EUR', '€', 'Euro', 'nl', ARRAY['fr', 'de', 'en'], 'Europe/Brussels', '+32', 'Europe'),
  ('BG', 'Bulgaria', 'България', 'BGN', 'лв', 'Bulgarian Lev', 'bg', ARRAY['en'], 'Europe/Sofia', '+359', 'Europe'),
  ('CH', 'Switzerland', 'Schweiz', 'CHF', 'CHF', 'Swiss Franc', 'de', ARRAY['fr', 'it', 'en'], 'Europe/Zurich', '+41', 'Europe'),
  ('CY', 'Cyprus', 'Κύπρος', 'EUR', '€', 'Euro', 'el', ARRAY['en', 'tr'], 'Asia/Nicosia', '+357', 'Europe'),
  ('CZ', 'Czech Republic', 'Česká republika', 'CZK', 'Kč', 'Czech Koruna', 'cs', ARRAY['en', 'de'], 'Europe/Prague', '+420', 'Europe'),
  ('DK', 'Denmark', 'Danmark', 'DKK', 'kr', 'Danish Krone', 'da', ARRAY['en', 'de'], 'Europe/Copenhagen', '+45', 'Europe'),
  ('EE', 'Estonia', 'Eesti', 'EUR', '€', 'Euro', 'et', ARRAY['en', 'ru'], 'Europe/Tallinn', '+372', 'Europe'),
  ('FI', 'Finland', 'Suomi', 'EUR', '€', 'Euro', 'fi', ARRAY['sv', 'en'], 'Europe/Helsinki', '+358', 'Europe'),
  ('GR', 'Greece', 'Ελλάδα', 'EUR', '€', 'Euro', 'el', ARRAY['en'], 'Europe/Athens', '+30', 'Europe'),
  ('HR', 'Croatia', 'Hrvatska', 'EUR', '€', 'Euro', 'hr', ARRAY['en', 'de', 'it'], 'Europe/Zagreb', '+385', 'Europe'),
  ('HU', 'Hungary', 'Magyarország', 'HUF', 'Ft', 'Hungarian Forint', 'hu', ARRAY['en', 'de'], 'Europe/Budapest', '+36', 'Europe'),
  ('IE', 'Ireland', 'Éire', 'EUR', '€', 'Euro', 'en', ARRAY['ga'], 'Europe/Dublin', '+353', 'Europe'),
  ('IS', 'Iceland', 'Ísland', 'ISK', 'kr', 'Icelandic Krona', 'is', ARRAY['en'], 'Atlantic/Reykjavik', '+354', 'Europe'),
  ('LT', 'Lithuania', 'Lietuva', 'EUR', '€', 'Euro', 'lt', ARRAY['en', 'ru'], 'Europe/Vilnius', '+370', 'Europe'),
  ('LU', 'Luxembourg', 'Luxembourg', 'EUR', '€', 'Euro', 'fr', ARRAY['de', 'lb', 'en'], 'Europe/Luxembourg', '+352', 'Europe'),
  ('LV', 'Latvia', 'Latvija', 'EUR', '€', 'Euro', 'lv', ARRAY['en', 'ru'], 'Europe/Riga', '+371', 'Europe'),
  ('MC', 'Monaco', 'Monaco', 'EUR', '€', 'Euro', 'fr', ARRAY['en', 'it'], 'Europe/Monaco', '+377', 'Europe'),
  ('MT', 'Malta', 'Malta', 'EUR', '€', 'Euro', 'mt', ARRAY['en'], 'Europe/Malta', '+356', 'Europe'),
  ('NL', 'Netherlands', 'Nederland', 'EUR', '€', 'Euro', 'nl', ARRAY['en', 'de'], 'Europe/Amsterdam', '+31', 'Europe'),
  ('NO', 'Norway', 'Norge', 'NOK', 'kr', 'Norwegian Krone', 'no', ARRAY['en'], 'Europe/Oslo', '+47', 'Europe'),
  ('PL', 'Poland', 'Polska', 'PLN', 'zł', 'Polish Zloty', 'pl', ARRAY['en', 'de'], 'Europe/Warsaw', '+48', 'Europe'),
  ('PT', 'Portugal', 'Portugal', 'EUR', '€', 'Euro', 'pt', ARRAY['en', 'es'], 'Europe/Lisbon', '+351', 'Europe'),
  ('RO', 'Romania', 'România', 'RON', 'lei', 'Romanian Leu', 'ro', ARRAY['en', 'hu'], 'Europe/Bucharest', '+40', 'Europe'),
  ('RS', 'Serbia', 'Србија', 'RSD', 'дин.', 'Serbian Dinar', 'sr', ARRAY['en', 'hu'], 'Europe/Belgrade', '+381', 'Europe'),
  ('RU', 'Russia', 'Россия', 'RUB', '₽', 'Russian Ruble', 'ru', ARRAY['en'], 'Europe/Moscow', '+7', 'Europe'),
  ('SE', 'Sweden', 'Sverige', 'SEK', 'kr', 'Swedish Krona', 'sv', ARRAY['en'], 'Europe/Stockholm', '+46', 'Europe'),
  ('SI', 'Slovenia', 'Slovenija', 'EUR', '€', 'Euro', 'sl', ARRAY['en', 'hr', 'de'], 'Europe/Ljubljana', '+386', 'Europe'),
  ('SK', 'Slovakia', 'Slovensko', 'EUR', '€', 'Euro', 'sk', ARRAY['en', 'hu', 'cs'], 'Europe/Bratislava', '+421', 'Europe'),
  ('UA', 'Ukraine', 'Україна', 'UAH', '₴', 'Ukrainian Hryvnia', 'uk', ARRAY['ru', 'en'], 'Europe/Kiev', '+380', 'Europe')
ON CONFLICT (code) DO NOTHING;

-- Asian Countries
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent) VALUES
  ('BD', 'Bangladesh', 'বাংলাদেশ', 'BDT', '৳', 'Bangladeshi Taka', 'bn', ARRAY['en'], 'Asia/Dhaka', '+880', 'Asia'),
  ('CN', 'China', '中国', 'CNY', '¥', 'Chinese Yuan', 'zh', ARRAY['en'], 'Asia/Shanghai', '+86', 'Asia'),
  ('HK', 'Hong Kong', '香港', 'HKD', 'HK$', 'Hong Kong Dollar', 'zh', ARRAY['en', 'zh-TW'], 'Asia/Hong_Kong', '+852', 'Asia'),
  ('ID', 'Indonesia', 'Indonesia', 'IDR', 'Rp', 'Indonesian Rupiah', 'id', ARRAY['en', 'jv'], 'Asia/Jakarta', '+62', 'Asia'),
  ('IN', 'India', 'भारत', 'INR', '₹', 'Indian Rupee', 'hi', ARRAY['en', 'ta', 'te', 'bn'], 'Asia/Kolkata', '+91', 'Asia'),
  ('KH', 'Cambodia', 'កម្ពុជា', 'KHR', '៛', 'Cambodian Riel', 'km', ARRAY['en', 'vi'], 'Asia/Phnom_Penh', '+855', 'Asia'),
  ('LA', 'Laos', 'ລາວ', 'LAK', '₭', 'Lao Kip', 'lo', ARRAY['en', 'vi', 'th'], 'Asia/Vientiane', '+856', 'Asia'),
  ('LK', 'Sri Lanka', 'ශ්‍රී ලංකාව', 'LKR', 'Rs', 'Sri Lankan Rupee', 'si', ARRAY['ta', 'en'], 'Asia/Colombo', '+94', 'Asia'),
  ('MM', 'Myanmar', 'မြန်မာ', 'MMK', 'K', 'Myanmar Kyat', 'my', ARRAY['en'], 'Asia/Yangon', '+95', 'Asia'),
  ('MN', 'Mongolia', 'Монгол', 'MNT', '₮', 'Mongolian Tugrik', 'mn', ARRAY['en', 'ru'], 'Asia/Ulaanbaatar', '+976', 'Asia'),
  ('MY', 'Malaysia', 'Malaysia', 'MYR', 'RM', 'Malaysian Ringgit', 'ms', ARRAY['en', 'zh', 'ta'], 'Asia/Kuala_Lumpur', '+60', 'Asia'),
  ('NP', 'Nepal', 'नेपाल', 'NPR', 'रू', 'Nepalese Rupee', 'ne', ARRAY['en', 'hi'], 'Asia/Kathmandu', '+977', 'Asia'),
  ('PH', 'Philippines', 'Pilipinas', 'PHP', '₱', 'Philippine Peso', 'tl', ARRAY['en', 'es'], 'Asia/Manila', '+63', 'Asia'),
  ('PK', 'Pakistan', 'پاکستان', 'PKR', 'Rs', 'Pakistani Rupee', 'ur', ARRAY['en', 'pa'], 'Asia/Karachi', '+92', 'Asia'),
  ('TW', 'Taiwan', '臺灣', 'TWD', 'NT$', 'New Taiwan Dollar', 'zh-TW', ARRAY['en', 'ja'], 'Asia/Taipei', '+886', 'Asia')
ON CONFLICT (code) DO NOTHING;

-- Middle East & Africa
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent) VALUES
  ('BH', 'Bahrain', 'البحرين', 'BHD', '.د.ب', 'Bahraini Dinar', 'ar', ARRAY['en'], 'Asia/Bahrain', '+973', 'Asia'),
  ('EG', 'Egypt', 'مصر', 'EGP', 'E£', 'Egyptian Pound', 'ar', ARRAY['en'], 'Africa/Cairo', '+20', 'Africa'),
  ('IL', 'Israel', 'ישראל', 'ILS', '₪', 'Israeli New Shekel', 'he', ARRAY['ar', 'en'], 'Asia/Jerusalem', '+972', 'Asia'),
  ('IQ', 'Iraq', 'العراق', 'IQD', 'ع.د', 'Iraqi Dinar', 'ar', ARRAY['ku', 'en'], 'Asia/Baghdad', '+964', 'Asia'),
  ('IR', 'Iran', 'ایران', 'IRR', '﷼', 'Iranian Rial', 'fa', ARRAY['en', 'ar'], 'Asia/Tehran', '+98', 'Asia'),
  ('JO', 'Jordan', 'الأردن', 'JOD', 'د.ا', 'Jordanian Dinar', 'ar', ARRAY['en'], 'Asia/Amman', '+962', 'Asia'),
  ('KW', 'Kuwait', 'الكويت', 'KWD', 'د.ك', 'Kuwaiti Dinar', 'ar', ARRAY['en'], 'Asia/Kuwait', '+965', 'Asia'),
  ('LB', 'Lebanon', 'لبنان', 'LBP', 'ل.ل', 'Lebanese Pound', 'ar', ARRAY['fr', 'en'], 'Asia/Beirut', '+961', 'Asia'),
  ('MA', 'Morocco', 'المغرب', 'MAD', 'د.م.', 'Moroccan Dirham', 'ar', ARRAY['fr', 'en'], 'Africa/Casablanca', '+212', 'Africa'),
  ('NG', 'Nigeria', 'Nigeria', 'NGN', '₦', 'Nigerian Naira', 'en', ARRAY['ha', 'yo', 'ig'], 'Africa/Lagos', '+234', 'Africa'),
  ('OM', 'Oman', 'عُمان', 'OMR', 'ر.ع.', 'Omani Rial', 'ar', ARRAY['en'], 'Asia/Muscat', '+968', 'Asia'),
  ('QA', 'Qatar', 'قطر', 'QAR', 'ر.ق', 'Qatari Riyal', 'ar', ARRAY['en'], 'Asia/Qatar', '+974', 'Asia'),
  ('SA', 'Saudi Arabia', 'المملكة العربية السعودية', 'SAR', 'ر.س', 'Saudi Riyal', 'ar', ARRAY['en'], 'Asia/Riyadh', '+966', 'Asia'),
  ('TR', 'Turkey', 'Türkiye', 'TRY', '₺', 'Turkish Lira', 'tr', ARRAY['en', 'ku'], 'Europe/Istanbul', '+90', 'Asia'),
  ('ZA', 'South Africa', 'South Africa', 'ZAR', 'R', 'South African Rand', 'en', ARRAY['af', 'zu', 'xh'], 'Africa/Johannesburg', '+27', 'Africa')
ON CONFLICT (code) DO NOTHING;

-- Americas
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent) VALUES
  ('AR', 'Argentina', 'Argentina', 'ARS', '$', 'Argentine Peso', 'es', ARRAY['en', 'it'], 'America/Buenos_Aires', '+54', 'South America'),
  ('BR', 'Brazil', 'Brasil', 'BRL', 'R$', 'Brazilian Real', 'pt', ARRAY['en', 'es'], 'America/Sao_Paulo', '+55', 'South America'),
  ('CL', 'Chile', 'Chile', 'CLP', '$', 'Chilean Peso', 'es', ARRAY['en'], 'America/Santiago', '+56', 'South America'),
  ('CO', 'Colombia', 'Colombia', 'COP', '$', 'Colombian Peso', 'es', ARRAY['en'], 'America/Bogota', '+57', 'South America'),
  ('CR', 'Costa Rica', 'Costa Rica', 'CRC', '₡', 'Costa Rican Colon', 'es', ARRAY['en'], 'America/Costa_Rica', '+506', 'North America'),
  ('CU', 'Cuba', 'Cuba', 'CUP', '$', 'Cuban Peso', 'es', ARRAY['en'], 'America/Havana', '+53', 'North America'),
  ('DO', 'Dominican Republic', 'República Dominicana', 'DOP', 'RD$', 'Dominican Peso', 'es', ARRAY['en'], 'America/Santo_Domingo', '+1', 'North America'),
  ('EC', 'Ecuador', 'Ecuador', 'USD', '$', 'US Dollar', 'es', ARRAY['en', 'qu'], 'America/Guayaquil', '+593', 'South America'),
  ('GT', 'Guatemala', 'Guatemala', 'GTQ', 'Q', 'Guatemalan Quetzal', 'es', ARRAY['en'], 'America/Guatemala', '+502', 'North America'),
  ('MX', 'Mexico', 'México', 'MXN', '$', 'Mexican Peso', 'es', ARRAY['en'], 'America/Mexico_City', '+52', 'North America'),
  ('PA', 'Panama', 'Panamá', 'PAB', 'B/.', 'Panamanian Balboa', 'es', ARRAY['en'], 'America/Panama', '+507', 'North America'),
  ('PE', 'Peru', 'Perú', 'PEN', 'S/', 'Peruvian Sol', 'es', ARRAY['en', 'qu'], 'America/Lima', '+51', 'South America'),
  ('PR', 'Puerto Rico', 'Puerto Rico', 'USD', '$', 'US Dollar', 'es', ARRAY['en'], 'America/Puerto_Rico', '+1', 'North America'),
  ('UY', 'Uruguay', 'Uruguay', 'UYU', '$U', 'Uruguayan Peso', 'es', ARRAY['en'], 'America/Montevideo', '+598', 'South America'),
  ('VE', 'Venezuela', 'Venezuela', 'VES', 'Bs', 'Venezuelan Bolivar', 'es', ARRAY['en'], 'America/Caracas', '+58', 'South America')
ON CONFLICT (code) DO NOTHING;

-- Oceania
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent) VALUES
  ('FJ', 'Fiji', 'Fiji', 'FJD', 'FJ$', 'Fijian Dollar', 'en', ARRAY['fj', 'hi'], 'Pacific/Fiji', '+679', 'Oceania'),
  ('NZ', 'New Zealand', 'New Zealand', 'NZD', 'NZ$', 'New Zealand Dollar', 'en', ARRAY['mi'], 'Pacific/Auckland', '+64', 'Oceania'),
  ('PG', 'Papua New Guinea', 'Papua Niugini', 'PGK', 'K', 'Papua New Guinean Kina', 'en', ARRAY['tpi', 'ho'], 'Pacific/Port_Moresby', '+675', 'Oceania')
ON CONFLICT (code) DO NOTHING;

-- =============================================================================
-- ADD MISSING LANGUAGES (referenced in countries but not yet inserted)
-- =============================================================================

INSERT INTO languages (code, name_en, name_native, direction) VALUES
  ('bg', 'Bulgarian', 'Български', 'ltr'),
  ('et', 'Estonian', 'Eesti', 'ltr'),
  ('ga', 'Irish', 'Gaeilge', 'ltr'),
  ('is', 'Icelandic', 'Íslenska', 'ltr'),
  ('lt', 'Lithuanian', 'Lietuvių', 'ltr'),
  ('lv', 'Latvian', 'Latviešu', 'ltr'),
  ('mt', 'Maltese', 'Malti', 'ltr'),
  ('hr', 'Croatian', 'Hrvatski', 'ltr'),
  ('sl', 'Slovenian', 'Slovenščina', 'ltr'),
  ('sk', 'Slovak', 'Slovenčina', 'ltr'),
  ('sr', 'Serbian', 'Српски', 'ltr'),
  ('lb', 'Luxembourgish', 'Lëtzebuergesch', 'ltr'),
  ('ca', 'Catalan', 'Català', 'ltr'),
  ('eu', 'Basque', 'Euskara', 'ltr'),
  ('km', 'Khmer', 'ភាសាខ្មែរ', 'ltr'),
  ('lo', 'Lao', 'ລາວ', 'ltr'),
  ('si', 'Sinhala', 'සිංහල', 'ltr'),
  ('my', 'Burmese', 'မြန်မာ', 'ltr'),
  ('mn', 'Mongolian', 'Монгол', 'ltr'),
  ('ne', 'Nepali', 'नेपाली', 'ltr'),
  ('tl', 'Tagalog', 'Tagalog', 'ltr'),
  ('pa', 'Punjabi', 'ਪੰਜਾਬੀ', 'ltr'),
  ('ku', 'Kurdish', 'Kurdî', 'ltr'),
  ('ha', 'Hausa', 'Hausa', 'ltr'),
  ('yo', 'Yoruba', 'Yorùbá', 'ltr'),
  ('ig', 'Igbo', 'Igbo', 'ltr'),
  ('af', 'Afrikaans', 'Afrikaans', 'ltr'),
  ('zu', 'Zulu', 'isiZulu', 'ltr'),
  ('xh', 'Xhosa', 'isiXhosa', 'ltr'),
  ('qu', 'Quechua', 'Runasimi', 'ltr'),
  ('fj', 'Fijian', 'Na Vosa Vakaviti', 'ltr'),
  ('mi', 'Maori', 'Te Reo Māori', 'ltr'),
  ('tpi', 'Tok Pisin', 'Tok Pisin', 'ltr'),
  ('ho', 'Hiri Motu', 'Hiri Motu', 'ltr'),
  ('jv', 'Javanese', 'Basa Jawa', 'ltr'),
  ('te', 'Telugu', 'తెలుగు', 'ltr')
ON CONFLICT (code) DO NOTHING;

-- =============================================================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================================================

COMMENT ON TABLE languages IS
  'Supported languages for menu translations and UI. Includes RTL support for Arabic/Hebrew.';

COMMENT ON TABLE countries IS
  'All 197 countries with default currency and language settings. is_supported indicates GUDBRO operates there.';

COMMENT ON COLUMN countries.common_languages IS
  'Array of commonly used languages in this country (besides primary_language). Useful for suggested translations.';

COMMENT ON COLUMN countries.is_supported IS
  'True if GUDBRO actively operates in this country. Affects onboarding flow and support options.';

-- =============================================================================
-- GRANT PUBLIC READ ACCESS
-- =============================================================================

-- Ensure anon users can read these reference tables
GRANT SELECT ON languages TO anon;
GRANT SELECT ON countries TO anon;
-- ============================================================================
-- Migration 008: Menu Item Translations Table
--
-- Purpose: Store translations for menu items (name, description) in multiple
--          languages. Enables merchants to offer menus in customer languages.
--
-- Architecture:
--   menu_item_translations  -> Per-item translations by language
--   category_translations   -> Per-category translations by language
--
-- Strategy:
--   - Primary language content stored in menu_items/menu_categories (original)
--   - Additional languages stored in translation tables
--   - Fallback: Requested → Primary → English → Original
--
-- Date: 2025-12-05
-- Sprint: 1 - Database Foundation
-- ============================================================================

-- =============================================================================
-- MENU ITEM TRANSLATIONS TABLE
-- Translations for menu item name and description
-- =============================================================================

CREATE TABLE IF NOT EXISTS menu_item_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,

  -- Translated content
  name VARCHAR(255) NOT NULL,
  description TEXT,

  -- Translation metadata
  is_machine_translated BOOLEAN DEFAULT false,
  translated_by UUID, -- User who created/edited translation
  verified_at TIMESTAMP WITH TIME ZONE, -- When human-verified
  verified_by UUID, -- Who verified

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique translation per item per language
  UNIQUE(menu_item_id, language_code)
);

-- Enable RLS
ALTER TABLE menu_item_translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to menu_item_translations"
  ON menu_item_translations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage menu_item_translations"
  ON menu_item_translations FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_menu_item_translations_item ON menu_item_translations(menu_item_id);
CREATE INDEX idx_menu_item_translations_lang ON menu_item_translations(language_code);
CREATE INDEX idx_menu_item_translations_item_lang ON menu_item_translations(menu_item_id, language_code);

-- =============================================================================
-- CATEGORY TRANSLATIONS TABLE
-- Translations for category name and description
-- =============================================================================

CREATE TABLE IF NOT EXISTS category_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,

  -- Translated content
  name VARCHAR(100) NOT NULL,
  description TEXT,

  -- Translation metadata
  is_machine_translated BOOLEAN DEFAULT false,
  translated_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique translation per category per language
  UNIQUE(category_id, language_code)
);

-- Enable RLS
ALTER TABLE category_translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to category_translations"
  ON category_translations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage category_translations"
  ON category_translations FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_category_translations_category ON category_translations(category_id);
CREATE INDEX idx_category_translations_lang ON category_translations(language_code);
CREATE INDEX idx_category_translations_cat_lang ON category_translations(category_id, language_code);

-- =============================================================================
-- MODIFIER TRANSLATIONS TABLE
-- Translations for modifier group names and modifier option names
-- =============================================================================

CREATE TABLE IF NOT EXISTS modifier_group_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  modifier_group_id UUID NOT NULL REFERENCES modifier_groups(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,

  -- Translated content
  name VARCHAR(100) NOT NULL,
  description TEXT,

  -- Translation metadata
  is_machine_translated BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique translation per group per language
  UNIQUE(modifier_group_id, language_code)
);

-- Enable RLS
ALTER TABLE modifier_group_translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to modifier_group_translations"
  ON modifier_group_translations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage modifier_group_translations"
  ON modifier_group_translations FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index
CREATE INDEX idx_modifier_group_translations_group ON modifier_group_translations(modifier_group_id);

-- =============================================================================
-- MODIFIER OPTION TRANSLATIONS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS modifier_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  modifier_id UUID NOT NULL REFERENCES modifiers(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,

  -- Translated content
  name VARCHAR(100) NOT NULL,
  description TEXT,

  -- Translation metadata
  is_machine_translated BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique translation per modifier per language
  UNIQUE(modifier_id, language_code)
);

-- Enable RLS
ALTER TABLE modifier_translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to modifier_translations"
  ON modifier_translations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage modifier_translations"
  ON modifier_translations FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index
CREATE INDEX idx_modifier_translations_modifier ON modifier_translations(modifier_id);

-- =============================================================================
-- HELPER FUNCTION: Get translated menu item
-- Returns menu item with translation for specified language (with fallback)
-- =============================================================================

CREATE OR REPLACE FUNCTION get_translated_menu_item(
  p_menu_item_id UUID,
  p_language_code VARCHAR(5),
  p_fallback_language VARCHAR(5) DEFAULT 'en'
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC,
  language_used VARCHAR(5),
  is_translated BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    mi.id,
    COALESCE(
      -- First try requested language
      (SELECT t.name FROM menu_item_translations t
       WHERE t.menu_item_id = mi.id AND t.language_code = p_language_code),
      -- Then try fallback language
      (SELECT t.name FROM menu_item_translations t
       WHERE t.menu_item_id = mi.id AND t.language_code = p_fallback_language),
      -- Finally use original
      mi.name
    ) AS name,
    COALESCE(
      (SELECT t.description FROM menu_item_translations t
       WHERE t.menu_item_id = mi.id AND t.language_code = p_language_code),
      (SELECT t.description FROM menu_item_translations t
       WHERE t.menu_item_id = mi.id AND t.language_code = p_fallback_language),
      mi.description
    ) AS description,
    mi.price,
    CASE
      WHEN EXISTS (SELECT 1 FROM menu_item_translations t
                   WHERE t.menu_item_id = mi.id AND t.language_code = p_language_code)
      THEN p_language_code
      WHEN EXISTS (SELECT 1 FROM menu_item_translations t
                   WHERE t.menu_item_id = mi.id AND t.language_code = p_fallback_language)
      THEN p_fallback_language
      ELSE 'original'
    END AS language_used,
    EXISTS (SELECT 1 FROM menu_item_translations t
            WHERE t.menu_item_id = mi.id AND t.language_code = p_language_code) AS is_translated
  FROM menu_items mi
  WHERE mi.id = p_menu_item_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public;

-- =============================================================================
-- HELPER FUNCTION: Get all menu items with translations
-- Bulk fetch for PWA (returns all items with translations for a language)
-- =============================================================================

CREATE OR REPLACE FUNCTION get_menu_items_with_translations(
  p_merchant_id UUID,
  p_language_code VARCHAR(5),
  p_fallback_language VARCHAR(5) DEFAULT 'en'
)
RETURNS TABLE (
  id UUID,
  category_id UUID,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC,
  image_url TEXT,
  is_available BOOLEAN,
  language_used VARCHAR(5)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    mi.id,
    mi.category_id,
    COALESCE(
      t.name,
      t_fallback.name,
      mi.name
    ) AS name,
    COALESCE(
      t.description,
      t_fallback.description,
      mi.description
    ) AS description,
    mi.price,
    mi.image_url,
    mi.is_available,
    CASE
      WHEN t.id IS NOT NULL THEN p_language_code
      WHEN t_fallback.id IS NOT NULL THEN p_fallback_language
      ELSE 'original'
    END AS language_used
  FROM menu_items mi
  LEFT JOIN menu_item_translations t
    ON t.menu_item_id = mi.id
    AND t.language_code = p_language_code
  LEFT JOIN menu_item_translations t_fallback
    ON t_fallback.menu_item_id = mi.id
    AND t_fallback.language_code = p_fallback_language
  WHERE mi.merchant_id = p_merchant_id
    AND mi.is_available = true
  ORDER BY mi.display_order, mi.name;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public;

-- =============================================================================
-- HELPER FUNCTION: Get categories with translations
-- =============================================================================

CREATE OR REPLACE FUNCTION get_categories_with_translations(
  p_merchant_id UUID,
  p_language_code VARCHAR(5),
  p_fallback_language VARCHAR(5) DEFAULT 'en'
)
RETURNS TABLE (
  id UUID,
  slug VARCHAR,
  name VARCHAR(100),
  description TEXT,
  display_order INTEGER,
  language_used VARCHAR(5)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.slug,
    COALESCE(
      t.name,
      t_fallback.name,
      c.name
    )::VARCHAR(100) AS name,
    COALESCE(
      t.description,
      t_fallback.description,
      c.description
    ) AS description,
    c.display_order,
    CASE
      WHEN t.id IS NOT NULL THEN p_language_code
      WHEN t_fallback.id IS NOT NULL THEN p_fallback_language
      ELSE 'original'
    END AS language_used
  FROM menu_categories c
  LEFT JOIN category_translations t
    ON t.category_id = c.id
    AND t.language_code = p_language_code
  LEFT JOIN category_translations t_fallback
    ON t_fallback.category_id = c.id
    AND t_fallback.language_code = p_fallback_language
  WHERE c.merchant_id = p_merchant_id
    AND c.is_active = true
  ORDER BY c.display_order, c.name;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public;

-- =============================================================================
-- TRIGGER: Update timestamps
-- =============================================================================

CREATE OR REPLACE FUNCTION update_translation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_menu_item_translations_updated
  BEFORE UPDATE ON menu_item_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trg_category_translations_updated
  BEFORE UPDATE ON category_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trg_modifier_group_translations_updated
  BEFORE UPDATE ON modifier_group_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trg_modifier_translations_updated
  BEFORE UPDATE ON modifier_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

-- =============================================================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================================================

COMMENT ON TABLE menu_item_translations IS
  'Stores translations for menu items. Primary content stays in menu_items table.';

COMMENT ON TABLE category_translations IS
  'Stores translations for menu categories.';

COMMENT ON TABLE modifier_group_translations IS
  'Stores translations for modifier group names (e.g., "Size" → "Dimensione").';

COMMENT ON TABLE modifier_translations IS
  'Stores translations for modifier options (e.g., "Large" → "Grande").';

COMMENT ON FUNCTION get_translated_menu_item IS
  'Returns a single menu item with translation. Fallback: requested → fallback → original.';

COMMENT ON FUNCTION get_menu_items_with_translations IS
  'Bulk fetch all menu items for a merchant with translations. Use in PWA API.';

COMMENT ON FUNCTION get_categories_with_translations IS
  'Fetch all categories for a merchant with translations. Use in PWA API.';

-- =============================================================================
-- GRANT PUBLIC READ ACCESS
-- =============================================================================

GRANT SELECT ON menu_item_translations TO anon;
GRANT SELECT ON category_translations TO anon;
GRANT SELECT ON modifier_group_translations TO anon;
GRANT SELECT ON modifier_translations TO anon;
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
