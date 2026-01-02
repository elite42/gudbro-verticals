-- ============================================
-- ORIGIN STANDARDIZATION - Fase 4: Migrate TEXT to JSONB
-- Converte origin da TEXT a JSONB per: breakfast, fried, caribbean
-- Created: 2025-12-22
-- ============================================

-- =====================================================
-- STEP 1: BREAKFAST - Rinominare colonna e creare nuova
-- =====================================================

-- Rinomina colonna esistente
ALTER TABLE breakfast RENAME COLUMN origin TO origin_legacy;

-- Crea nuova colonna JSONB
ALTER TABLE breakfast ADD COLUMN origin JSONB NOT NULL DEFAULT '{}'::jsonb;

-- Migra i dati
UPDATE breakfast SET origin = CASE origin_legacy
  -- American
  WHEN 'american' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'United States',
    'country_code', 'US',
    'continent', 'North America',
    'continent_code', 'NA'
  )
  -- British
  WHEN 'british' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'United Kingdom',
    'country_code', 'GB',
    'continent', 'Europe',
    'continent_code', 'EU',
    'region', 'British Isles',
    'region_code', 'BRI'
  )
  -- French
  WHEN 'french' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'France',
    'country_code', 'FR',
    'continent', 'Europe',
    'continent_code', 'EU',
    'region', 'Mediterranean',
    'region_code', 'MED'
  )
  -- German
  WHEN 'german' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Germany',
    'country_code', 'DE',
    'continent', 'Europe',
    'continent_code', 'EU',
    'region', 'Central Europe',
    'region_code', 'CEU'
  )
  -- Italian
  WHEN 'italian' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Italy',
    'country_code', 'IT',
    'continent', 'Europe',
    'continent_code', 'EU',
    'region', 'Mediterranean',
    'region_code', 'MED'
  )
  -- Spanish
  WHEN 'spanish' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Spain',
    'country_code', 'ES',
    'continent', 'Europe',
    'continent_code', 'EU',
    'region', 'Mediterranean',
    'region_code', 'MED'
  )
  -- Mexican
  WHEN 'mexican' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Mexico',
    'country_code', 'MX',
    'continent', 'North America',
    'continent_code', 'NA'
  )
  -- Japanese
  WHEN 'japanese' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Japan',
    'country_code', 'JP',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'East Asia',
    'region_code', 'EAS'
  )
  -- Chinese
  WHEN 'chinese' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'China',
    'country_code', 'CN',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'East Asia',
    'region_code', 'EAS'
  )
  -- Korean
  WHEN 'korean' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'South Korea',
    'country_code', 'KR',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'East Asia',
    'region_code', 'EAS'
  )
  -- Turkish
  WHEN 'turkish' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Turkey',
    'country_code', 'TR',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'Middle East',
    'region_code', 'MEA'
  )
  -- Indian
  WHEN 'indian' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'India',
    'country_code', 'IN',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'South Asia',
    'region_code', 'SAS'
  )
  -- Israeli
  WHEN 'israeli' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Israel',
    'country_code', 'IL',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'Middle East',
    'region_code', 'MEA'
  )
  -- Australian
  WHEN 'australian' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Australia',
    'country_code', 'AU',
    'continent', 'Oceania',
    'continent_code', 'OC'
  )
  -- Brazilian
  WHEN 'brazilian' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Brazil',
    'country_code', 'BR',
    'continent', 'South America',
    'continent_code', 'SA'
  )
  -- Scandinavian (region)
  WHEN 'scandinavian' THEN jsonb_build_object(
    'region_type', 'region',
    'region', 'Scandinavia',
    'region_code', 'SCA',
    'continent', 'Europe',
    'continent_code', 'EU'
  )
  -- Middle Eastern (region)
  WHEN 'middle_eastern' THEN jsonb_build_object(
    'region_type', 'region',
    'region', 'Middle East',
    'region_code', 'MEA',
    'continent', 'Asia',
    'continent_code', 'AS'
  )
  -- International (global)
  WHEN 'international' THEN jsonb_build_object(
    'region_type', 'global',
    'is_international', true
  )
  -- Default fallback
  ELSE jsonb_build_object(
    'region_type', 'global',
    'is_international', true,
    'notes', 'Unknown origin: ' || COALESCE(origin_legacy, 'null')
  )
END;

-- Drop colonna legacy
ALTER TABLE breakfast DROP COLUMN origin_legacy;

-- =====================================================
-- STEP 2: FRIED - Rinominare colonna e creare nuova
-- =====================================================

ALTER TABLE fried RENAME COLUMN origin TO origin_legacy;
ALTER TABLE fried ADD COLUMN origin JSONB NOT NULL DEFAULT '{}'::jsonb;

UPDATE fried SET origin = CASE origin_legacy
  -- American
  WHEN 'american' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'United States',
    'country_code', 'US',
    'continent', 'North America',
    'continent_code', 'NA'
  )
  -- Southern US (sub-region)
  WHEN 'southern_us' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'United States',
    'country_code', 'US',
    'continent', 'North America',
    'continent_code', 'NA',
    'local_region', 'Southern United States'
  )
  -- British
  WHEN 'british' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'United Kingdom',
    'country_code', 'GB',
    'continent', 'Europe',
    'continent_code', 'EU',
    'region', 'British Isles',
    'region_code', 'BRI'
  )
  -- French
  WHEN 'french' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'France',
    'country_code', 'FR',
    'continent', 'Europe',
    'continent_code', 'EU',
    'region', 'Mediterranean',
    'region_code', 'MED'
  )
  -- Italian
  WHEN 'italian' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Italy',
    'country_code', 'IT',
    'continent', 'Europe',
    'continent_code', 'EU',
    'region', 'Mediterranean',
    'region_code', 'MED'
  )
  -- Spanish
  WHEN 'spanish' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Spain',
    'country_code', 'ES',
    'continent', 'Europe',
    'continent_code', 'EU',
    'region', 'Mediterranean',
    'region_code', 'MED'
  )
  -- Japanese
  WHEN 'japanese' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Japan',
    'country_code', 'JP',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'East Asia',
    'region_code', 'EAS'
  )
  -- Chinese
  WHEN 'chinese' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'China',
    'country_code', 'CN',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'East Asia',
    'region_code', 'EAS'
  )
  -- Korean
  WHEN 'korean' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'South Korea',
    'country_code', 'KR',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'East Asia',
    'region_code', 'EAS'
  )
  -- Indian
  WHEN 'indian' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'India',
    'country_code', 'IN',
    'continent', 'Asia',
    'continent_code', 'AS',
    'region', 'South Asia',
    'region_code', 'SAS'
  )
  -- Latin American (region)
  WHEN 'latin_american' THEN jsonb_build_object(
    'region_type', 'region',
    'region', 'Latin America',
    'region_code', 'SAM',
    'continent', 'South America',
    'continent_code', 'SA'
  )
  -- Middle Eastern (region)
  WHEN 'middle_eastern' THEN jsonb_build_object(
    'region_type', 'region',
    'region', 'Middle East',
    'region_code', 'MEA',
    'continent', 'Asia',
    'continent_code', 'AS'
  )
  -- International (global)
  WHEN 'international' THEN jsonb_build_object(
    'region_type', 'global',
    'is_international', true
  )
  -- Default fallback
  ELSE jsonb_build_object(
    'region_type', 'global',
    'is_international', true,
    'notes', 'Unknown origin: ' || COALESCE(origin_legacy, 'null')
  )
END;

ALTER TABLE fried DROP COLUMN origin_legacy;

-- =====================================================
-- STEP 3: CARIBBEAN - Rinominare colonna e creare nuova
-- =====================================================

ALTER TABLE caribbean RENAME COLUMN origin TO origin_legacy;
ALTER TABLE caribbean ADD COLUMN origin JSONB NOT NULL DEFAULT '{}'::jsonb;

UPDATE caribbean SET origin = CASE origin_legacy
  -- Jamaica
  WHEN 'jamaica' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Jamaica',
    'country_code', 'JM',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Cuba
  WHEN 'cuba' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Cuba',
    'country_code', 'CU',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Puerto Rico
  WHEN 'puerto_rico' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Puerto Rico',
    'country_code', 'PR',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Trinidad and Tobago
  WHEN 'trinidad_tobago' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Trinidad and Tobago',
    'country_code', 'TT',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Haiti
  WHEN 'haiti' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Haiti',
    'country_code', 'HT',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Dominican Republic
  WHEN 'dominican_republic' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Dominican Republic',
    'country_code', 'DO',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Barbados
  WHEN 'barbados' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Barbados',
    'country_code', 'BB',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Bahamas
  WHEN 'bahamas' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Bahamas',
    'country_code', 'BS',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Martinique
  WHEN 'martinique' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Martinique',
    'country_code', 'MQ',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Curacao
  WHEN 'curacao' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Curacao',
    'country_code', 'CW',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Grenada
  WHEN 'grenada' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Grenada',
    'country_code', 'GD',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- St. Lucia
  WHEN 'st_lucia' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Saint Lucia',
    'country_code', 'LC',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Aruba
  WHEN 'aruba' THEN jsonb_build_object(
    'region_type', 'country',
    'country', 'Aruba',
    'country_code', 'AW',
    'continent', 'North America',
    'continent_code', 'NA',
    'region', 'Caribbean',
    'region_code', 'CAR'
  )
  -- Default fallback (generic Caribbean)
  ELSE jsonb_build_object(
    'region_type', 'region',
    'region', 'Caribbean',
    'region_code', 'CAR',
    'continent', 'North America',
    'continent_code', 'NA',
    'notes', 'Unknown island: ' || COALESCE(origin_legacy, 'null')
  )
END;

ALTER TABLE caribbean DROP COLUMN origin_legacy;

-- =====================================================
-- STEP 4: Creare indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_breakfast_origin_country ON breakfast ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_breakfast_origin_region ON breakfast ((origin->>'region_code'));

CREATE INDEX IF NOT EXISTS idx_fried_origin_country ON fried ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_fried_origin_region ON fried ((origin->>'region_code'));

CREATE INDEX IF NOT EXISTS idx_caribbean_origin_country ON caribbean ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_caribbean_origin_region ON caribbean ((origin->>'region_code'));

-- =====================================================
-- STEP 5: Verifica (eseguire separatamente)
-- =====================================================

-- SELECT 'breakfast' as tbl, origin->>'region_type' as type, COUNT(*)
-- FROM breakfast GROUP BY origin->>'region_type'
-- UNION ALL
-- SELECT 'fried', origin->>'region_type', COUNT(*)
-- FROM fried GROUP BY origin->>'region_type'
-- UNION ALL
-- SELECT 'caribbean', origin->>'region_type', COUNT(*)
-- FROM caribbean GROUP BY origin->>'region_type'
-- ORDER BY tbl, type;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
