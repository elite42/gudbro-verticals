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
