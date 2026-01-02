-- ============================================================================
-- Migration 011a: Additional Languages needed for remaining countries
-- Run this BEFORE 011-all-remaining-countries.sql
-- ============================================================================

INSERT INTO languages (code, name_en, name_native, direction) VALUES
  -- African languages
  ('ti', 'Tigrinya', 'ትግርኛ', 'ltr'),
  ('am', 'Amharic', 'አማርኛ', 'ltr'),
  ('sw', 'Swahili', 'Kiswahili', 'ltr'),
  ('wo', 'Wolof', 'Wolof', 'ltr'),
  ('ak', 'Akan', 'Akan', 'ltr'),
  ('rw', 'Kinyarwanda', 'Kinyarwanda', 'ltr'),
  ('mg', 'Malagasy', 'Malagasy', 'ltr'),
  ('ny', 'Chichewa', 'Chichewa', 'ltr'),
  ('bm', 'Bambara', 'Bamanankan', 'ltr'),
  ('sn', 'Shona', 'chiShona', 'ltr'),
  ('nd', 'Northern Ndebele', 'isiNdebele', 'ltr'),
  ('tn', 'Tswana', 'Setswana', 'ltr'),
  ('st', 'Southern Sotho', 'Sesotho', 'ltr'),
  ('ss', 'Swati', 'SiSwati', 'ltr'),

  -- Asian languages
  ('hy', 'Armenian', 'Հայdelays', 'ltr'),
  ('az', 'Azerbaijani', 'Azərbaycan', 'ltr'),
  ('dz', 'Dzongkha', 'རྫོང་ཁ', 'ltr'),
  ('ka', 'Georgian', 'ქართული', 'ltr'),
  ('kk', 'Kazakh', 'Қазақ', 'ltr'),
  ('ky', 'Kyrgyz', 'Кыргызча', 'ltr'),
  ('ps', 'Pashto', 'پښتو', 'rtl'),
  ('tg', 'Tajik', 'Тоҷикӣ', 'ltr'),
  ('tk', 'Turkmen', 'Türkmen', 'ltr'),
  ('dv', 'Divehi', 'ދިވެހި', 'rtl'),

  -- European languages
  ('sq', 'Albanian', 'Shqip', 'ltr'),
  ('be', 'Belarusian', 'Беларуская', 'ltr'),
  ('bs', 'Bosnian', 'Bosanski', 'ltr'),
  ('mk', 'Macedonian', 'Македонски', 'ltr'),
  ('la', 'Latin', 'Latina', 'ltr'),

  -- Caribbean/Pacific languages
  ('ht', 'Haitian Creole', 'Kreyòl ayisyen', 'ltr'),
  ('sm', 'Samoan', 'Gagana Samoa', 'ltr'),
  ('to', 'Tongan', 'Lea faka-Tonga', 'ltr'),
  ('bi', 'Bislama', 'Bislama', 'ltr'),
  ('mh', 'Marshallese', 'Kajin M̧ajeļ', 'ltr'),
  ('pau', 'Palauan', 'Tekoi ra Belau', 'ltr'),
  ('na', 'Nauruan', 'Dorerin Naoero', 'ltr'),
  ('tvl', 'Tuvaluan', 'Te Ggana Tuuvalu', 'ltr'),

  -- South American indigenous
  ('ay', 'Aymara', 'Aymar aru', 'ltr'),
  ('gn', 'Guarani', 'Avañeʼẽ', 'ltr')
ON CONFLICT (code) DO NOTHING;

SELECT 'Additional languages added!' AS status;
SELECT COUNT(*) AS total_languages FROM languages;
