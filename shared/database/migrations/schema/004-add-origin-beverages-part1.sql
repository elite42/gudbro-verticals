-- ============================================
-- ORIGIN STANDARDIZATION - Fase 2 Part 1: Wines, Beers, Spirits
-- Converte campi TEXT esistenti a origin JSONB
-- Created: 2025-12-22
-- ============================================

-- =====================================================
-- STEP 1: Aggiungere colonna origin JSONB
-- =====================================================

ALTER TABLE wines ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE beers ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE spirits ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;

-- =====================================================
-- STEP 2: WINES - Convertire da colonne TEXT a JSONB
-- Colonne esistenti: origin_country, origin_country_code, origin_region, origin_subregion
-- =====================================================

UPDATE wines
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', origin_country,
  'country_code', origin_country_code,
  'local_region', origin_region,
  'subregion', origin_subregion,
  'appellation', origin_appellation,
  'classification', origin_classification
) || CASE
  WHEN origin_country_code IN ('FR', 'IT', 'ES', 'PT', 'GR', 'HR') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "Mediterranean", "region_code": "MED"}'::jsonb
  WHEN origin_country_code IN ('DE', 'AT', 'CH') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "Central Europe", "region_code": "CEU"}'::jsonb
  WHEN origin_country_code IN ('US', 'CA') THEN
    '{"continent": "North America", "continent_code": "NA"}'::jsonb
  WHEN origin_country_code IN ('AR', 'CL', 'BR', 'UY') THEN
    '{"continent": "South America", "continent_code": "SA"}'::jsonb
  WHEN origin_country_code IN ('AU', 'NZ') THEN
    '{"continent": "Oceania", "continent_code": "OC"}'::jsonb
  WHEN origin_country_code IN ('ZA') THEN
    '{"continent": "Africa", "continent_code": "AF"}'::jsonb
  WHEN origin_country_code IN ('JP', 'CN') THEN
    '{"continent": "Asia", "continent_code": "AS"}'::jsonb
  ELSE '{}'::jsonb
END
WHERE origin = '{}'::jsonb AND origin_country IS NOT NULL;

-- =====================================================
-- STEP 3: BEERS - Convertire da colonne TEXT a JSONB
-- Colonne esistenti: origin_country, origin_country_code, origin_region, origin_city
-- =====================================================

UPDATE beers
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', origin_country,
  'country_code', origin_country_code,
  'local_region', origin_region,
  'city', origin_city
) || CASE
  WHEN origin_country_code IN ('DE', 'BE', 'NL', 'AT', 'CH', 'CZ', 'PL') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "Central Europe", "region_code": "CEU"}'::jsonb
  WHEN origin_country_code IN ('GB', 'IE') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "British Isles", "region_code": "BRI"}'::jsonb
  WHEN origin_country_code IN ('DK', 'SE', 'NO', 'FI') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "Scandinavia", "region_code": "SCA"}'::jsonb
  WHEN origin_country_code IN ('IT', 'ES', 'FR', 'PT', 'GR') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "Mediterranean", "region_code": "MED"}'::jsonb
  WHEN origin_country_code IN ('US', 'CA', 'MX') THEN
    '{"continent": "North America", "continent_code": "NA"}'::jsonb
  WHEN origin_country_code IN ('BR', 'AR', 'CO') THEN
    '{"continent": "South America", "continent_code": "SA"}'::jsonb
  WHEN origin_country_code IN ('AU', 'NZ') THEN
    '{"continent": "Oceania", "continent_code": "OC"}'::jsonb
  WHEN origin_country_code IN ('JP', 'CN', 'TH', 'VN', 'SG', 'PH') THEN
    '{"continent": "Asia", "continent_code": "AS", "region": "East Asia", "region_code": "EAS"}'::jsonb
  WHEN origin_country_code IN ('ZA', 'NG', 'KE') THEN
    '{"continent": "Africa", "continent_code": "AF"}'::jsonb
  WHEN origin_country_code IN ('JM', 'TT', 'CU') THEN
    '{"continent": "North America", "continent_code": "NA", "region": "Caribbean", "region_code": "CAR"}'::jsonb
  ELSE '{}'::jsonb
END
WHERE origin = '{}'::jsonb AND origin_country IS NOT NULL;

-- =====================================================
-- STEP 4: SPIRITS - Convertire da colonne TEXT a JSONB
-- Colonne esistenti: country, region
-- =====================================================

-- Prima mappiamo i country names ai country codes
UPDATE spirits
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', country,
  'country_code', CASE country
    WHEN 'Scotland' THEN 'GB'
    WHEN 'Ireland' THEN 'IE'
    WHEN 'USA' THEN 'US'
    WHEN 'Canada' THEN 'CA'
    WHEN 'Mexico' THEN 'MX'
    WHEN 'France' THEN 'FR'
    WHEN 'Italy' THEN 'IT'
    WHEN 'Spain' THEN 'ES'
    WHEN 'Portugal' THEN 'PT'
    WHEN 'Germany' THEN 'DE'
    WHEN 'Netherlands' THEN 'NL'
    WHEN 'Belgium' THEN 'BE'
    WHEN 'Poland' THEN 'PL'
    WHEN 'Russia' THEN 'RU'
    WHEN 'Sweden' THEN 'SE'
    WHEN 'Japan' THEN 'JP'
    WHEN 'China' THEN 'CN'
    WHEN 'Korea' THEN 'KR'
    WHEN 'South Korea' THEN 'KR'
    WHEN 'Taiwan' THEN 'TW'
    WHEN 'India' THEN 'IN'
    WHEN 'Australia' THEN 'AU'
    WHEN 'Brazil' THEN 'BR'
    WHEN 'Cuba' THEN 'CU'
    WHEN 'Jamaica' THEN 'JM'
    WHEN 'Puerto Rico' THEN 'PR'
    WHEN 'Trinidad' THEN 'TT'
    WHEN 'Barbados' THEN 'BB'
    WHEN 'Guatemala' THEN 'GT'
    WHEN 'Venezuela' THEN 'VE'
    WHEN 'Peru' THEN 'PE'
    WHEN 'Chile' THEN 'CL'
    WHEN 'Greece' THEN 'GR'
    WHEN 'Turkey' THEN 'TR'
    ELSE 'XX'
  END,
  'local_region', region
) || CASE
  WHEN country IN ('Scotland', 'Ireland') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "British Isles", "region_code": "BRI"}'::jsonb
  WHEN country IN ('France', 'Italy', 'Spain', 'Portugal', 'Greece') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "Mediterranean", "region_code": "MED"}'::jsonb
  WHEN country IN ('Germany', 'Netherlands', 'Belgium', 'Poland', 'Austria', 'Switzerland') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "Central Europe", "region_code": "CEU"}'::jsonb
  WHEN country IN ('Russia', 'Sweden', 'Norway', 'Denmark', 'Finland') THEN
    '{"continent": "Europe", "continent_code": "EU", "region": "Scandinavia", "region_code": "SCA"}'::jsonb
  WHEN country IN ('USA', 'Canada') THEN
    '{"continent": "North America", "continent_code": "NA"}'::jsonb
  WHEN country = 'Mexico' THEN
    '{"continent": "North America", "continent_code": "NA"}'::jsonb
  WHEN country IN ('Cuba', 'Jamaica', 'Puerto Rico', 'Trinidad', 'Barbados') THEN
    '{"continent": "North America", "continent_code": "NA", "region": "Caribbean", "region_code": "CAR"}'::jsonb
  WHEN country IN ('Brazil', 'Peru', 'Chile', 'Venezuela', 'Guatemala') THEN
    '{"continent": "South America", "continent_code": "SA"}'::jsonb
  WHEN country IN ('Japan', 'China', 'Korea', 'South Korea', 'Taiwan') THEN
    '{"continent": "Asia", "continent_code": "AS", "region": "East Asia", "region_code": "EAS"}'::jsonb
  WHEN country = 'India' THEN
    '{"continent": "Asia", "continent_code": "AS", "region": "South Asia", "region_code": "SAS"}'::jsonb
  WHEN country = 'Turkey' THEN
    '{"continent": "Asia", "continent_code": "AS", "region": "Middle East", "region_code": "MEA"}'::jsonb
  WHEN country = 'Australia' THEN
    '{"continent": "Oceania", "continent_code": "OC"}'::jsonb
  ELSE '{}'::jsonb
END
WHERE origin = '{}'::jsonb AND country IS NOT NULL;

-- =====================================================
-- STEP 5: Creare indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_wines_origin_country ON wines ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_wines_origin_region ON wines ((origin->>'region_code'));

CREATE INDEX IF NOT EXISTS idx_beers_origin_country ON beers ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_beers_origin_region ON beers ((origin->>'region_code'));

CREATE INDEX IF NOT EXISTS idx_spirits_origin_country ON spirits ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_spirits_origin_region ON spirits ((origin->>'region_code'));

-- =====================================================
-- STEP 6: Verifica (eseguire separatamente)
-- =====================================================

-- SELECT 'wines' as tbl, COUNT(*) as total,
--        COUNT(CASE WHEN origin->>'country_code' IS NOT NULL THEN 1 END) as with_origin
-- FROM wines
-- UNION ALL
-- SELECT 'beers', COUNT(*), COUNT(CASE WHEN origin->>'country_code' IS NOT NULL THEN 1 END)
-- FROM beers
-- UNION ALL
-- SELECT 'spirits', COUNT(*), COUNT(CASE WHEN origin->>'country_code' IS NOT NULL THEN 1 END)
-- FROM spirits;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
