-- ============================================
-- ORIGIN STANDARDIZATION - Fase 1: Cucine Nazionali
-- Aggiunge campo origin JSONB a 12 tabelle cucine nazionali
-- Created: 2025-12-22
-- ============================================

-- =====================================================
-- STEP 1: Aggiungere colonna origin JSONB
-- =====================================================

ALTER TABLE french ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE spanish ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE moroccan ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE ethiopian ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE lebanese ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE turkish ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE greek ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE georgian ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE brazilian ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE peruvian ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE vietnamese ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE korean ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;

-- =====================================================
-- STEP 2: Backfill con valori default per paese
-- =====================================================

-- French
UPDATE french
SET origin = jsonb_build_object(
  'country', 'France',
  'country_code', 'FR'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Spanish
UPDATE spanish
SET origin = jsonb_build_object(
  'country', 'Spain',
  'country_code', 'ES'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Moroccan
UPDATE moroccan
SET origin = jsonb_build_object(
  'country', 'Morocco',
  'country_code', 'MA'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Ethiopian
UPDATE ethiopian
SET origin = jsonb_build_object(
  'country', 'Ethiopia',
  'country_code', 'ET'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Lebanese
UPDATE lebanese
SET origin = jsonb_build_object(
  'country', 'Lebanon',
  'country_code', 'LB'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Turkish
UPDATE turkish
SET origin = jsonb_build_object(
  'country', 'Turkey',
  'country_code', 'TR'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Greek
UPDATE greek
SET origin = jsonb_build_object(
  'country', 'Greece',
  'country_code', 'GR'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Georgian
UPDATE georgian
SET origin = jsonb_build_object(
  'country', 'Georgia',
  'country_code', 'GE'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Brazilian
UPDATE brazilian
SET origin = jsonb_build_object(
  'country', 'Brazil',
  'country_code', 'BR'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Peruvian
UPDATE peruvian
SET origin = jsonb_build_object(
  'country', 'Peru',
  'country_code', 'PE'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Vietnamese
UPDATE vietnamese
SET origin = jsonb_build_object(
  'country', 'Vietnam',
  'country_code', 'VN'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- Korean
UPDATE korean
SET origin = jsonb_build_object(
  'country', 'South Korea',
  'country_code', 'KR'
)
WHERE origin = '{}'::jsonb OR origin IS NULL;

-- =====================================================
-- STEP 3: Creare indexes per query efficienti
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_french_origin_country ON french ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_spanish_origin_country ON spanish ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_moroccan_origin_country ON moroccan ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_ethiopian_origin_country ON ethiopian ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_lebanese_origin_country ON lebanese ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_turkish_origin_country ON turkish ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_greek_origin_country ON greek ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_georgian_origin_country ON georgian ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_brazilian_origin_country ON brazilian ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_peruvian_origin_country ON peruvian ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_vietnamese_origin_country ON vietnamese ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_korean_origin_country ON korean ((origin->>'country_code'));

-- =====================================================
-- STEP 4: Verifica
-- =====================================================

-- Query per verificare (eseguire separatamente):
-- SELECT 'french' as table_name, COUNT(*) as total, COUNT(origin->>'country_code') as with_origin FROM french
-- UNION ALL SELECT 'spanish', COUNT(*), COUNT(origin->>'country_code') FROM spanish
-- UNION ALL SELECT 'moroccan', COUNT(*), COUNT(origin->>'country_code') FROM moroccan
-- UNION ALL SELECT 'ethiopian', COUNT(*), COUNT(origin->>'country_code') FROM ethiopian
-- UNION ALL SELECT 'lebanese', COUNT(*), COUNT(origin->>'country_code') FROM lebanese
-- UNION ALL SELECT 'turkish', COUNT(*), COUNT(origin->>'country_code') FROM turkish
-- UNION ALL SELECT 'greek', COUNT(*), COUNT(origin->>'country_code') FROM greek
-- UNION ALL SELECT 'georgian', COUNT(*), COUNT(origin->>'country_code') FROM georgian
-- UNION ALL SELECT 'brazilian', COUNT(*), COUNT(origin->>'country_code') FROM brazilian
-- UNION ALL SELECT 'peruvian', COUNT(*), COUNT(origin->>'country_code') FROM peruvian
-- UNION ALL SELECT 'vietnamese', COUNT(*), COUNT(origin->>'country_code') FROM vietnamese
-- UNION ALL SELECT 'korean', COUNT(*), COUNT(origin->>'country_code') FROM korean;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
