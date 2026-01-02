-- ============================================================================
-- Migration 011: All Remaining Countries (ISO 3166-1)
-- Adds ~154 countries not included in initial seed
-- ============================================================================

-- AFRICA (remaining)
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent, is_supported) VALUES
  ('DZ', 'Algeria', 'الجزائر', 'DZD', 'د.ج', 'Algerian Dinar', 'ar', ARRAY['fr'], 'Africa/Algiers', '+213', 'Africa', false),
  ('AO', 'Angola', 'Angola', 'AOA', 'Kz', 'Angolan Kwanza', 'pt', ARRAY['en'], 'Africa/Luanda', '+244', 'Africa', false),
  ('BJ', 'Benin', 'Bénin', 'XOF', 'CFA', 'CFA Franc', 'fr', ARRAY['en'], 'Africa/Porto-Novo', '+229', 'Africa', false),
  ('BW', 'Botswana', 'Botswana', 'BWP', 'P', 'Botswana Pula', 'en', ARRAY['tn'], 'Africa/Gaborone', '+267', 'Africa', false),
  ('BF', 'Burkina Faso', 'Burkina Faso', 'XOF', 'CFA', 'CFA Franc', 'fr', ARRAY['en'], 'Africa/Ouagadougou', '+226', 'Africa', false),
  ('BI', 'Burundi', 'Burundi', 'BIF', 'FBu', 'Burundian Franc', 'fr', ARRAY['en'], 'Africa/Bujumbura', '+257', 'Africa', false),
  ('CV', 'Cape Verde', 'Cabo Verde', 'CVE', '$', 'Cape Verdean Escudo', 'pt', ARRAY['en'], 'Atlantic/Cape_Verde', '+238', 'Africa', false),
  ('CM', 'Cameroon', 'Cameroun', 'XAF', 'FCFA', 'CFA Franc', 'fr', ARRAY['en'], 'Africa/Douala', '+237', 'Africa', false),
  ('CF', 'Central African Republic', 'République centrafricaine', 'XAF', 'FCFA', 'CFA Franc', 'fr', ARRAY['en'], 'Africa/Bangui', '+236', 'Africa', false),
  ('TD', 'Chad', 'Tchad', 'XAF', 'FCFA', 'CFA Franc', 'fr', ARRAY['ar'], 'Africa/Ndjamena', '+235', 'Africa', false),
  ('KM', 'Comoros', 'Comores', 'KMF', 'CF', 'Comorian Franc', 'fr', ARRAY['ar'], 'Indian/Comoro', '+269', 'Africa', false),
  ('CG', 'Congo', 'Congo', 'XAF', 'FCFA', 'CFA Franc', 'fr', ARRAY['en'], 'Africa/Brazzaville', '+242', 'Africa', false),
  ('CD', 'DR Congo', 'RD Congo', 'CDF', 'FC', 'Congolese Franc', 'fr', ARRAY['en'], 'Africa/Kinshasa', '+243', 'Africa', false),
  ('CI', 'Côte d''Ivoire', 'Côte d''Ivoire', 'XOF', 'CFA', 'CFA Franc', 'fr', ARRAY['en'], 'Africa/Abidjan', '+225', 'Africa', false),
  ('DJ', 'Djibouti', 'Djibouti', 'DJF', 'Fdj', 'Djiboutian Franc', 'fr', ARRAY['ar'], 'Africa/Djibouti', '+253', 'Africa', false),
  ('GQ', 'Equatorial Guinea', 'Guinea Ecuatorial', 'XAF', 'FCFA', 'CFA Franc', 'es', ARRAY['fr', 'pt'], 'Africa/Malabo', '+240', 'Africa', false),
  ('ER', 'Eritrea', 'ኤርትራ', 'ERN', 'Nfk', 'Eritrean Nakfa', 'ti', ARRAY['ar', 'en'], 'Africa/Asmara', '+291', 'Africa', false),
  ('SZ', 'Eswatini', 'eSwatini', 'SZL', 'E', 'Swazi Lilangeni', 'en', ARRAY['ss'], 'Africa/Mbabane', '+268', 'Africa', false),
  ('ET', 'Ethiopia', 'ኢትዮጵያ', 'ETB', 'Br', 'Ethiopian Birr', 'am', ARRAY['en'], 'Africa/Addis_Ababa', '+251', 'Africa', false),
  ('GA', 'Gabon', 'Gabon', 'XAF', 'FCFA', 'CFA Franc', 'fr', ARRAY['en'], 'Africa/Libreville', '+241', 'Africa', false),
  ('GM', 'Gambia', 'Gambia', 'GMD', 'D', 'Gambian Dalasi', 'en', ARRAY['wo'], 'Africa/Banjul', '+220', 'Africa', false),
  ('GH', 'Ghana', 'Ghana', 'GHS', '₵', 'Ghanaian Cedi', 'en', ARRAY['ak'], 'Africa/Accra', '+233', 'Africa', false),
  ('GN', 'Guinea', 'Guinée', 'GNF', 'FG', 'Guinean Franc', 'fr', ARRAY['en'], 'Africa/Conakry', '+224', 'Africa', false),
  ('GW', 'Guinea-Bissau', 'Guiné-Bissau', 'XOF', 'CFA', 'CFA Franc', 'pt', ARRAY['en'], 'Africa/Bissau', '+245', 'Africa', false),
  ('KE', 'Kenya', 'Kenya', 'KES', 'KSh', 'Kenyan Shilling', 'en', ARRAY['sw'], 'Africa/Nairobi', '+254', 'Africa', false),
  ('LS', 'Lesotho', 'Lesotho', 'LSL', 'L', 'Lesotho Loti', 'en', ARRAY['st'], 'Africa/Maseru', '+266', 'Africa', false),
  ('LR', 'Liberia', 'Liberia', 'LRD', '$', 'Liberian Dollar', 'en', ARRAY['en'], 'Africa/Monrovia', '+231', 'Africa', false),
  ('LY', 'Libya', 'ليبيا', 'LYD', 'ل.د', 'Libyan Dinar', 'ar', ARRAY['en'], 'Africa/Tripoli', '+218', 'Africa', false),
  ('MG', 'Madagascar', 'Madagasikara', 'MGA', 'Ar', 'Malagasy Ariary', 'mg', ARRAY['fr'], 'Indian/Antananarivo', '+261', 'Africa', false),
  ('MW', 'Malawi', 'Malawi', 'MWK', 'MK', 'Malawian Kwacha', 'en', ARRAY['ny'], 'Africa/Blantyre', '+265', 'Africa', false),
  ('ML', 'Mali', 'Mali', 'XOF', 'CFA', 'CFA Franc', 'fr', ARRAY['bm'], 'Africa/Bamako', '+223', 'Africa', false),
  ('MR', 'Mauritania', 'موريتانيا', 'MRU', 'UM', 'Mauritanian Ouguiya', 'ar', ARRAY['fr'], 'Africa/Nouakchott', '+222', 'Africa', false),
  ('MU', 'Mauritius', 'Maurice', 'MUR', '₨', 'Mauritian Rupee', 'en', ARRAY['fr'], 'Indian/Mauritius', '+230', 'Africa', false),
  ('MA', 'Morocco', 'المغرب', 'MAD', 'د.م.', 'Moroccan Dirham', 'ar', ARRAY['fr', 'en'], 'Africa/Casablanca', '+212', 'Africa', false),
  ('MZ', 'Mozambique', 'Moçambique', 'MZN', 'MT', 'Mozambican Metical', 'pt', ARRAY['en'], 'Africa/Maputo', '+258', 'Africa', false),
  ('NA', 'Namibia', 'Namibia', 'NAD', '$', 'Namibian Dollar', 'en', ARRAY['af'], 'Africa/Windhoek', '+264', 'Africa', false),
  ('NE', 'Niger', 'Niger', 'XOF', 'CFA', 'CFA Franc', 'fr', ARRAY['ha'], 'Africa/Niamey', '+227', 'Africa', false),
  ('NG', 'Nigeria', 'Nigeria', 'NGN', '₦', 'Nigerian Naira', 'en', ARRAY['ha', 'yo', 'ig'], 'Africa/Lagos', '+234', 'Africa', false),
  ('RW', 'Rwanda', 'Rwanda', 'RWF', 'FRw', 'Rwandan Franc', 'rw', ARRAY['en', 'fr'], 'Africa/Kigali', '+250', 'Africa', false),
  ('ST', 'São Tomé and Príncipe', 'São Tomé e Príncipe', 'STN', 'Db', 'São Tomé Dobra', 'pt', ARRAY['en'], 'Africa/Sao_Tome', '+239', 'Africa', false),
  ('SN', 'Senegal', 'Sénégal', 'XOF', 'CFA', 'CFA Franc', 'fr', ARRAY['wo'], 'Africa/Dakar', '+221', 'Africa', false),
  ('SC', 'Seychelles', 'Seychelles', 'SCR', '₨', 'Seychellois Rupee', 'en', ARRAY['fr'], 'Indian/Mahe', '+248', 'Africa', false),
  ('SL', 'Sierra Leone', 'Sierra Leone', 'SLL', 'Le', 'Sierra Leonean Leone', 'en', ARRAY['en'], 'Africa/Freetown', '+232', 'Africa', false),
  ('SO', 'Somalia', 'Soomaaliya', 'SOS', 'S', 'Somali Shilling', 'so', ARRAY['ar'], 'Africa/Mogadishu', '+252', 'Africa', false),
  ('SS', 'South Sudan', 'South Sudan', 'SSP', '£', 'South Sudanese Pound', 'en', ARRAY['ar'], 'Africa/Juba', '+211', 'Africa', false),
  ('SD', 'Sudan', 'السودان', 'SDG', 'ج.س', 'Sudanese Pound', 'ar', ARRAY['en'], 'Africa/Khartoum', '+249', 'Africa', false),
  ('TZ', 'Tanzania', 'Tanzania', 'TZS', 'TSh', 'Tanzanian Shilling', 'sw', ARRAY['en'], 'Africa/Dar_es_Salaam', '+255', 'Africa', false),
  ('TG', 'Togo', 'Togo', 'XOF', 'CFA', 'CFA Franc', 'fr', ARRAY['en'], 'Africa/Lome', '+228', 'Africa', false),
  ('TN', 'Tunisia', 'تونس', 'TND', 'د.ت', 'Tunisian Dinar', 'ar', ARRAY['fr'], 'Africa/Tunis', '+216', 'Africa', false),
  ('UG', 'Uganda', 'Uganda', 'UGX', 'USh', 'Ugandan Shilling', 'en', ARRAY['sw'], 'Africa/Kampala', '+256', 'Africa', false),
  ('ZM', 'Zambia', 'Zambia', 'ZMW', 'ZK', 'Zambian Kwacha', 'en', ARRAY['en'], 'Africa/Lusaka', '+260', 'Africa', false),
  ('ZW', 'Zimbabwe', 'Zimbabwe', 'ZWL', '$', 'Zimbabwean Dollar', 'en', ARRAY['sn', 'nd'], 'Africa/Harare', '+263', 'Africa', false)
ON CONFLICT (code) DO NOTHING;

-- ASIA (remaining)
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent, is_supported) VALUES
  ('AF', 'Afghanistan', 'افغانستان', 'AFN', '؋', 'Afghan Afghani', 'fa', ARRAY['ps'], 'Asia/Kabul', '+93', 'Asia', false),
  ('AM', 'Armenia', 'Հայdelays', 'AMD', '֏', 'Armenian Dram', 'hy', ARRAY['ru'], 'Asia/Yerevan', '+374', 'Asia', false),
  ('AZ', 'Azerbaijan', 'Azərbaycan', 'AZN', '₼', 'Azerbaijani Manat', 'az', ARRAY['ru'], 'Asia/Baku', '+994', 'Asia', false),
  ('BH', 'Bahrain', 'البحرين', 'BHD', '.د.ب', 'Bahraini Dinar', 'ar', ARRAY['en'], 'Asia/Bahrain', '+973', 'Asia', false),
  ('BD', 'Bangladesh', 'বাংলাদেশ', 'BDT', '৳', 'Bangladeshi Taka', 'bn', ARRAY['en'], 'Asia/Dhaka', '+880', 'Asia', false),
  ('BT', 'Bhutan', 'འབྲུག', 'BTN', 'Nu.', 'Bhutanese Ngultrum', 'dz', ARRAY['en'], 'Asia/Thimphu', '+975', 'Asia', false),
  ('BN', 'Brunei', 'Brunei', 'BND', '$', 'Brunei Dollar', 'ms', ARRAY['en'], 'Asia/Brunei', '+673', 'Asia', false),
  ('KH', 'Cambodia', 'កម្ពុជា', 'KHR', '៛', 'Cambodian Riel', 'km', ARRAY['en'], 'Asia/Phnom_Penh', '+855', 'Asia', false),
  ('GE', 'Georgia', 'საქართველო', 'GEL', '₾', 'Georgian Lari', 'ka', ARRAY['en'], 'Asia/Tbilisi', '+995', 'Asia', false),
  ('IR', 'Iran', 'ایران', 'IRR', '﷼', 'Iranian Rial', 'fa', ARRAY['en'], 'Asia/Tehran', '+98', 'Asia', false),
  ('IQ', 'Iraq', 'العراق', 'IQD', 'ع.د', 'Iraqi Dinar', 'ar', ARRAY['ku'], 'Asia/Baghdad', '+964', 'Asia', false),
  ('JO', 'Jordan', 'الأردن', 'JOD', 'د.ا', 'Jordanian Dinar', 'ar', ARRAY['en'], 'Asia/Amman', '+962', 'Asia', false),
  ('KZ', 'Kazakhstan', 'Қазақстан', 'KZT', '₸', 'Kazakhstani Tenge', 'kk', ARRAY['ru'], 'Asia/Almaty', '+7', 'Asia', false),
  ('KW', 'Kuwait', 'الكويت', 'KWD', 'د.ك', 'Kuwaiti Dinar', 'ar', ARRAY['en'], 'Asia/Kuwait', '+965', 'Asia', false),
  ('KG', 'Kyrgyzstan', 'Кыргызстан', 'KGS', 'лв', 'Kyrgyzstani Som', 'ky', ARRAY['ru'], 'Asia/Bishkek', '+996', 'Asia', false),
  ('LA', 'Laos', 'ລາວ', 'LAK', '₭', 'Lao Kip', 'lo', ARRAY['en'], 'Asia/Vientiane', '+856', 'Asia', false),
  ('LB', 'Lebanon', 'لبنان', 'LBP', 'ل.ل', 'Lebanese Pound', 'ar', ARRAY['en', 'fr'], 'Asia/Beirut', '+961', 'Asia', false),
  ('MV', 'Maldives', 'Maldives', 'MVR', 'Rf', 'Maldivian Rufiyaa', 'dv', ARRAY['en'], 'Indian/Maldives', '+960', 'Asia', false),
  ('MN', 'Mongolia', 'Монгол', 'MNT', '₮', 'Mongolian Tugrik', 'mn', ARRAY['en'], 'Asia/Ulaanbaatar', '+976', 'Asia', false),
  ('MM', 'Myanmar', 'မြန်မာ', 'MMK', 'K', 'Myanmar Kyat', 'my', ARRAY['en'], 'Asia/Yangon', '+95', 'Asia', false),
  ('NP', 'Nepal', 'नेपाल', 'NPR', '₨', 'Nepalese Rupee', 'ne', ARRAY['en'], 'Asia/Kathmandu', '+977', 'Asia', false),
  ('KP', 'North Korea', '조선민주주의인민공화국', 'KPW', '₩', 'North Korean Won', 'ko', ARRAY['ko'], 'Asia/Pyongyang', '+850', 'Asia', false),
  ('OM', 'Oman', 'عمان', 'OMR', 'ر.ع.', 'Omani Rial', 'ar', ARRAY['en'], 'Asia/Muscat', '+968', 'Asia', false),
  ('PK', 'Pakistan', 'پاکستان', 'PKR', '₨', 'Pakistani Rupee', 'ur', ARRAY['en'], 'Asia/Karachi', '+92', 'Asia', false),
  ('PS', 'Palestine', 'فلسطين', 'ILS', '₪', 'Israeli Shekel', 'ar', ARRAY['en'], 'Asia/Gaza', '+970', 'Asia', false),
  ('QA', 'Qatar', 'قطر', 'QAR', 'ر.ق', 'Qatari Riyal', 'ar', ARRAY['en'], 'Asia/Qatar', '+974', 'Asia', false),
  ('LK', 'Sri Lanka', 'ශ්‍රී ලංකාව', 'LKR', '₨', 'Sri Lankan Rupee', 'si', ARRAY['ta', 'en'], 'Asia/Colombo', '+94', 'Asia', false),
  ('SY', 'Syria', 'سوريا', 'SYP', '£', 'Syrian Pound', 'ar', ARRAY['en'], 'Asia/Damascus', '+963', 'Asia', false),
  ('TJ', 'Tajikistan', 'Тоҷикистон', 'TJS', 'SM', 'Tajikistani Somoni', 'tg', ARRAY['ru'], 'Asia/Dushanbe', '+992', 'Asia', false),
  ('TL', 'Timor-Leste', 'Timor-Leste', 'USD', '$', 'US Dollar', 'pt', ARRAY['en'], 'Asia/Dili', '+670', 'Asia', false),
  ('TM', 'Turkmenistan', 'Türkmenistan', 'TMT', 'm', 'Turkmenistani Manat', 'tk', ARRAY['ru'], 'Asia/Ashgabat', '+993', 'Asia', false),
  ('UZ', 'Uzbekistan', 'Oʻzbekiston', 'UZS', 'лв', 'Uzbekistani Som', 'uz', ARRAY['ru'], 'Asia/Tashkent', '+998', 'Asia', false),
  ('YE', 'Yemen', 'اليمن', 'YER', '﷼', 'Yemeni Rial', 'ar', ARRAY['en'], 'Asia/Aden', '+967', 'Asia', false)
ON CONFLICT (code) DO NOTHING;

-- EUROPE (remaining)
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent, is_supported) VALUES
  ('AL', 'Albania', 'Shqipëria', 'ALL', 'L', 'Albanian Lek', 'sq', ARRAY['en'], 'Europe/Tirane', '+355', 'Europe', false),
  ('AD', 'Andorra', 'Andorra', 'EUR', '€', 'Euro', 'ca', ARRAY['es', 'fr'], 'Europe/Andorra', '+376', 'Europe', false),
  ('BY', 'Belarus', 'Беларусь', 'BYN', 'Br', 'Belarusian Ruble', 'be', ARRAY['ru'], 'Europe/Minsk', '+375', 'Europe', false),
  ('BA', 'Bosnia and Herzegovina', 'Bosna i Hercegovina', 'BAM', 'KM', 'Bosnia Mark', 'bs', ARRAY['hr', 'sr'], 'Europe/Sarajevo', '+387', 'Europe', false),
  ('BG', 'Bulgaria', 'България', 'BGN', 'лв', 'Bulgarian Lev', 'bg', ARRAY['en'], 'Europe/Sofia', '+359', 'Europe', false),
  ('HR', 'Croatia', 'Hrvatska', 'EUR', '€', 'Euro', 'hr', ARRAY['en'], 'Europe/Zagreb', '+385', 'Europe', false),
  ('CY', 'Cyprus', 'Κύπρος', 'EUR', '€', 'Euro', 'el', ARRAY['tr', 'en'], 'Asia/Nicosia', '+357', 'Europe', false),
  ('CZ', 'Czech Republic', 'Česko', 'CZK', 'Kč', 'Czech Koruna', 'cs', ARRAY['en'], 'Europe/Prague', '+420', 'Europe', false),
  ('EE', 'Estonia', 'Eesti', 'EUR', '€', 'Euro', 'et', ARRAY['ru', 'en'], 'Europe/Tallinn', '+372', 'Europe', false),
  ('IS', 'Iceland', 'Ísland', 'ISK', 'kr', 'Icelandic Króna', 'is', ARRAY['en'], 'Atlantic/Reykjavik', '+354', 'Europe', false),
  ('XK', 'Kosovo', 'Kosova', 'EUR', '€', 'Euro', 'sq', ARRAY['sr'], 'Europe/Belgrade', '+383', 'Europe', false),
  ('LV', 'Latvia', 'Latvija', 'EUR', '€', 'Euro', 'lv', ARRAY['ru', 'en'], 'Europe/Riga', '+371', 'Europe', false),
  ('LI', 'Liechtenstein', 'Liechtenstein', 'CHF', 'CHF', 'Swiss Franc', 'de', ARRAY['en'], 'Europe/Vaduz', '+423', 'Europe', false),
  ('LT', 'Lithuania', 'Lietuva', 'EUR', '€', 'Euro', 'lt', ARRAY['en', 'ru'], 'Europe/Vilnius', '+370', 'Europe', false),
  ('LU', 'Luxembourg', 'Luxembourg', 'EUR', '€', 'Euro', 'lb', ARRAY['fr', 'de'], 'Europe/Luxembourg', '+352', 'Europe', false),
  ('MT', 'Malta', 'Malta', 'EUR', '€', 'Euro', 'mt', ARRAY['en'], 'Europe/Malta', '+356', 'Europe', false),
  ('MD', 'Moldova', 'Moldova', 'MDL', 'L', 'Moldovan Leu', 'ro', ARRAY['ru'], 'Europe/Chisinau', '+373', 'Europe', false),
  ('MC', 'Monaco', 'Monaco', 'EUR', '€', 'Euro', 'fr', ARRAY['en', 'it'], 'Europe/Monaco', '+377', 'Europe', false),
  ('ME', 'Montenegro', 'Crna Gora', 'EUR', '€', 'Euro', 'sr', ARRAY['en'], 'Europe/Podgorica', '+382', 'Europe', false),
  ('MK', 'North Macedonia', 'Северна Македонија', 'MKD', 'ден', 'Macedonian Denar', 'mk', ARRAY['sq'], 'Europe/Skopje', '+389', 'Europe', false),
  ('RO', 'Romania', 'România', 'RON', 'lei', 'Romanian Leu', 'ro', ARRAY['en'], 'Europe/Bucharest', '+40', 'Europe', false),
  ('SM', 'San Marino', 'San Marino', 'EUR', '€', 'Euro', 'it', ARRAY['en'], 'Europe/San_Marino', '+378', 'Europe', false),
  ('RS', 'Serbia', 'Србија', 'RSD', 'дин', 'Serbian Dinar', 'sr', ARRAY['en'], 'Europe/Belgrade', '+381', 'Europe', false),
  ('SK', 'Slovakia', 'Slovensko', 'EUR', '€', 'Euro', 'sk', ARRAY['en'], 'Europe/Bratislava', '+421', 'Europe', false),
  ('SI', 'Slovenia', 'Slovenija', 'EUR', '€', 'Euro', 'sl', ARRAY['en'], 'Europe/Ljubljana', '+386', 'Europe', false),
  ('UA', 'Ukraine', 'Україна', 'UAH', '₴', 'Ukrainian Hryvnia', 'uk', ARRAY['ru', 'en'], 'Europe/Kiev', '+380', 'Europe', false),
  ('VA', 'Vatican City', 'Città del Vaticano', 'EUR', '€', 'Euro', 'it', ARRAY['la'], 'Europe/Vatican', '+379', 'Europe', false)
ON CONFLICT (code) DO NOTHING;

-- NORTH AMERICA (remaining)
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent, is_supported) VALUES
  ('AG', 'Antigua and Barbuda', 'Antigua and Barbuda', 'XCD', '$', 'East Caribbean Dollar', 'en', ARRAY['en'], 'America/Antigua', '+1-268', 'North America', false),
  ('BS', 'Bahamas', 'Bahamas', 'BSD', '$', 'Bahamian Dollar', 'en', ARRAY['en'], 'America/Nassau', '+1-242', 'North America', false),
  ('BB', 'Barbados', 'Barbados', 'BBD', '$', 'Barbadian Dollar', 'en', ARRAY['en'], 'America/Barbados', '+1-246', 'North America', false),
  ('BZ', 'Belize', 'Belize', 'BZD', '$', 'Belize Dollar', 'en', ARRAY['es'], 'America/Belize', '+501', 'North America', false),
  ('CR', 'Costa Rica', 'Costa Rica', 'CRC', '₡', 'Costa Rican Colón', 'es', ARRAY['en'], 'America/Costa_Rica', '+506', 'North America', false),
  ('CU', 'Cuba', 'Cuba', 'CUP', '₱', 'Cuban Peso', 'es', ARRAY['en'], 'America/Havana', '+53', 'North America', false),
  ('DM', 'Dominica', 'Dominica', 'XCD', '$', 'East Caribbean Dollar', 'en', ARRAY['en'], 'America/Dominica', '+1-767', 'North America', false),
  ('DO', 'Dominican Republic', 'República Dominicana', 'DOP', 'RD$', 'Dominican Peso', 'es', ARRAY['en'], 'America/Santo_Domingo', '+1-809', 'North America', false),
  ('SV', 'El Salvador', 'El Salvador', 'USD', '$', 'US Dollar', 'es', ARRAY['en'], 'America/El_Salvador', '+503', 'North America', false),
  ('GD', 'Grenada', 'Grenada', 'XCD', '$', 'East Caribbean Dollar', 'en', ARRAY['en'], 'America/Grenada', '+1-473', 'North America', false),
  ('GT', 'Guatemala', 'Guatemala', 'GTQ', 'Q', 'Guatemalan Quetzal', 'es', ARRAY['en'], 'America/Guatemala', '+502', 'North America', false),
  ('HT', 'Haiti', 'Haïti', 'HTG', 'G', 'Haitian Gourde', 'fr', ARRAY['ht'], 'America/Port-au-Prince', '+509', 'North America', false),
  ('HN', 'Honduras', 'Honduras', 'HNL', 'L', 'Honduran Lempira', 'es', ARRAY['en'], 'America/Tegucigalpa', '+504', 'North America', false),
  ('JM', 'Jamaica', 'Jamaica', 'JMD', 'J$', 'Jamaican Dollar', 'en', ARRAY['en'], 'America/Jamaica', '+1-876', 'North America', false),
  ('NI', 'Nicaragua', 'Nicaragua', 'NIO', 'C$', 'Nicaraguan Córdoba', 'es', ARRAY['en'], 'America/Managua', '+505', 'North America', false),
  ('PA', 'Panama', 'Panamá', 'PAB', 'B/.', 'Panamanian Balboa', 'es', ARRAY['en'], 'America/Panama', '+507', 'North America', false),
  ('KN', 'Saint Kitts and Nevis', 'Saint Kitts and Nevis', 'XCD', '$', 'East Caribbean Dollar', 'en', ARRAY['en'], 'America/St_Kitts', '+1-869', 'North America', false),
  ('LC', 'Saint Lucia', 'Saint Lucia', 'XCD', '$', 'East Caribbean Dollar', 'en', ARRAY['en'], 'America/St_Lucia', '+1-758', 'North America', false),
  ('VC', 'Saint Vincent and the Grenadines', 'Saint Vincent', 'XCD', '$', 'East Caribbean Dollar', 'en', ARRAY['en'], 'America/St_Vincent', '+1-784', 'North America', false),
  ('TT', 'Trinidad and Tobago', 'Trinidad and Tobago', 'TTD', 'TT$', 'Trinidad Dollar', 'en', ARRAY['en'], 'America/Port_of_Spain', '+1-868', 'North America', false)
ON CONFLICT (code) DO NOTHING;

-- SOUTH AMERICA (remaining)
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent, is_supported) VALUES
  ('BO', 'Bolivia', 'Bolivia', 'BOB', 'Bs.', 'Bolivian Boliviano', 'es', ARRAY['qu', 'ay'], 'America/La_Paz', '+591', 'South America', false),
  ('CL', 'Chile', 'Chile', 'CLP', '$', 'Chilean Peso', 'es', ARRAY['en'], 'America/Santiago', '+56', 'South America', false),
  ('CO', 'Colombia', 'Colombia', 'COP', '$', 'Colombian Peso', 'es', ARRAY['en'], 'America/Bogota', '+57', 'South America', false),
  ('EC', 'Ecuador', 'Ecuador', 'USD', '$', 'US Dollar', 'es', ARRAY['qu'], 'America/Guayaquil', '+593', 'South America', false),
  ('GY', 'Guyana', 'Guyana', 'GYD', '$', 'Guyanese Dollar', 'en', ARRAY['en'], 'America/Guyana', '+592', 'South America', false),
  ('PY', 'Paraguay', 'Paraguay', 'PYG', '₲', 'Paraguayan Guaraní', 'es', ARRAY['gn'], 'America/Asuncion', '+595', 'South America', false),
  ('PE', 'Peru', 'Perú', 'PEN', 'S/', 'Peruvian Sol', 'es', ARRAY['qu', 'ay'], 'America/Lima', '+51', 'South America', false),
  ('SR', 'Suriname', 'Suriname', 'SRD', '$', 'Surinamese Dollar', 'nl', ARRAY['en'], 'America/Paramaribo', '+597', 'South America', false),
  ('UY', 'Uruguay', 'Uruguay', 'UYU', '$U', 'Uruguayan Peso', 'es', ARRAY['en'], 'America/Montevideo', '+598', 'South America', false),
  ('VE', 'Venezuela', 'Venezuela', 'VES', 'Bs.', 'Venezuelan Bolívar', 'es', ARRAY['en'], 'America/Caracas', '+58', 'South America', false)
ON CONFLICT (code) DO NOTHING;

-- OCEANIA (remaining)
INSERT INTO countries (code, name_en, name_native, currency_code, currency_symbol, currency_name, primary_language, common_languages, timezone, phone_code, continent, is_supported) VALUES
  ('FJ', 'Fiji', 'Fiji', 'FJD', '$', 'Fijian Dollar', 'en', ARRAY['fj', 'hi'], 'Pacific/Fiji', '+679', 'Oceania', false),
  ('KI', 'Kiribati', 'Kiribati', 'AUD', '$', 'Australian Dollar', 'en', ARRAY['en'], 'Pacific/Tarawa', '+686', 'Oceania', false),
  ('MH', 'Marshall Islands', 'Marshall Islands', 'USD', '$', 'US Dollar', 'en', ARRAY['mh'], 'Pacific/Majuro', '+692', 'Oceania', false),
  ('FM', 'Micronesia', 'Micronesia', 'USD', '$', 'US Dollar', 'en', ARRAY['en'], 'Pacific/Pohnpei', '+691', 'Oceania', false),
  ('NR', 'Nauru', 'Nauru', 'AUD', '$', 'Australian Dollar', 'en', ARRAY['na'], 'Pacific/Nauru', '+674', 'Oceania', false),
  ('PW', 'Palau', 'Palau', 'USD', '$', 'US Dollar', 'en', ARRAY['pau'], 'Pacific/Palau', '+680', 'Oceania', false),
  ('PG', 'Papua New Guinea', 'Papua New Guinea', 'PGK', 'K', 'Papua New Guinean Kina', 'en', ARRAY['tpi', 'ho'], 'Pacific/Port_Moresby', '+675', 'Oceania', false),
  ('WS', 'Samoa', 'Samoa', 'WST', 'WS$', 'Samoan Tala', 'sm', ARRAY['en'], 'Pacific/Apia', '+685', 'Oceania', false),
  ('SB', 'Solomon Islands', 'Solomon Islands', 'SBD', '$', 'Solomon Islands Dollar', 'en', ARRAY['en'], 'Pacific/Guadalcanal', '+677', 'Oceania', false),
  ('TO', 'Tonga', 'Tonga', 'TOP', 'T$', 'Tongan Paʻanga', 'to', ARRAY['en'], 'Pacific/Tongatapu', '+676', 'Oceania', false),
  ('TV', 'Tuvalu', 'Tuvalu', 'AUD', '$', 'Australian Dollar', 'en', ARRAY['tvl'], 'Pacific/Funafuti', '+688', 'Oceania', false),
  ('VU', 'Vanuatu', 'Vanuatu', 'VUV', 'VT', 'Vanuatu Vatu', 'bi', ARRAY['en', 'fr'], 'Pacific/Efate', '+678', 'Oceania', false)
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT 'Countries migration completed!' AS status;
SELECT COUNT(*) AS total_countries FROM countries;
SELECT continent, COUNT(*) as count FROM countries GROUP BY continent ORDER BY count DESC;
