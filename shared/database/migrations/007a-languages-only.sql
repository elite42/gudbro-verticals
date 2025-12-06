-- ============================================================================
-- Migration 007a: Languages Table ONLY (run first)
-- ============================================================================

CREATE TABLE IF NOT EXISTS languages (
  code VARCHAR(5) PRIMARY KEY,
  name_en VARCHAR(50) NOT NULL,
  name_native VARCHAR(50) NOT NULL,
  direction VARCHAR(3) NOT NULL DEFAULT 'ltr'
    CHECK (direction IN ('ltr', 'rtl')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to languages"
  ON languages FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage languages"
  ON languages FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_languages_active ON languages(is_active);

-- ALL LANGUAGES (including those referenced by countries)
INSERT INTO languages (code, name_en, name_native, direction) VALUES
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
  ('ar', 'Arabic', 'العربية', 'rtl'),
  ('he', 'Hebrew', 'עברית', 'rtl'),
  ('fa', 'Persian', 'فارسی', 'rtl'),
  ('ur', 'Urdu', 'اردو', 'rtl'),
  ('tr', 'Turkish', 'Türkçe', 'ltr'),
  ('hu', 'Hungarian', 'Magyar', 'ltr'),
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

GRANT SELECT ON languages TO anon;

SELECT 'Languages table created with ' || COUNT(*) || ' languages' AS status FROM languages;
