-- ============================================
-- ORIGIN STANDARDIZATION - Fase 3: Food Tables
-- Aggiunge campo origin JSONB a 6 tabelle food
-- Created: 2025-12-22
-- ============================================

-- =====================================================
-- STEP 1: Aggiungere colonna origin JSONB
-- =====================================================

ALTER TABLE steaks ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE seafood ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE bakery ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE icecream ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE sauces ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE sides ADD COLUMN IF NOT EXISTS origin JSONB NOT NULL DEFAULT '{}'::jsonb;

-- =====================================================
-- STEP 2: STEAKS - Backfill basato su tipo di taglio
-- La maggior parte delle tecniche steak sono americane/argentine/australiane
-- =====================================================

-- American steaks (default per la maggior parte)
UPDATE steaks
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'United States',
  'country_code', 'US',
  'continent', 'North America',
  'continent_code', 'NA'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%ribeye%'
  OR LOWER(name) LIKE '%t-bone%'
  OR LOWER(name) LIKE '%new york%'
  OR LOWER(name) LIKE '%strip%'
  OR LOWER(name) LIKE '%porterhouse%'
  OR LOWER(name) LIKE '%tomahawk%'
  OR LOWER(name) LIKE '%prime rib%'
  OR LOWER(name) LIKE '%filet mignon%'
  OR LOWER(name) LIKE '%sirloin%'
  OR LOWER(name) LIKE '%flank%'
  OR LOWER(name) LIKE '%skirt%'
  OR LOWER(name) LIKE '%hanger%'
  OR LOWER(name) LIKE '%flat iron%'
  OR LOWER(name) LIKE '%denver%'
  OR LOWER(name) LIKE '%tri-tip%'
  OR LOWER(name) LIKE '%chuck%'
  OR LOWER(name) LIKE '%brisket%'
);

-- Japanese Wagyu
UPDATE steaks
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Japan',
  'country_code', 'JP',
  'continent', 'Asia',
  'continent_code', 'AS',
  'region', 'East Asia',
  'region_code', 'EAS'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%wagyu%'
  OR LOWER(name) LIKE '%kobe%'
  OR LOWER(name) LIKE '%matsusaka%'
  OR LOWER(name) LIKE '%ohmi%'
  OR LOWER(name) LIKE '%miyazaki%'
  OR LOWER(name) LIKE '%a5%'
);

-- Argentine steaks
UPDATE steaks
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Argentina',
  'country_code', 'AR',
  'continent', 'South America',
  'continent_code', 'SA'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%asado%'
  OR LOWER(name) LIKE '%entraña%'
  OR LOWER(name) LIKE '%vacio%'
  OR LOWER(name) LIKE '%bife%'
  OR LOWER(name) LIKE '%chorizo%'
  OR LOWER(name) LIKE '%argentine%'
);

-- Australian beef
UPDATE steaks
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Australia',
  'country_code', 'AU',
  'continent', 'Oceania',
  'continent_code', 'OC'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%australian%'
  OR LOWER(name) LIKE '%aussie%'
);

-- Italian steaks (Fiorentina, Tagliata)
UPDATE steaks
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Italy',
  'country_code', 'IT',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%fiorentina%'
  OR LOWER(name) LIKE '%tagliata%'
  OR LOWER(name) LIKE '%bistecca%'
);

-- French steaks
UPDATE steaks
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'France',
  'country_code', 'FR',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%entrecôte%'
  OR LOWER(name) LIKE '%entrecote%'
  OR LOWER(name) LIKE '%chateaubriand%'
  OR LOWER(name) LIKE '%bavette%'
  OR LOWER(name) LIKE '%onglet%'
);

-- Default per steaks rimanenti: global (tecnica universale)
UPDATE steaks
SET origin = jsonb_build_object(
  'region_type', 'global',
  'is_international', true,
  'notes', 'Universal cooking technique'
)
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 3: SEAFOOD - Backfill basato su provenienza
-- =====================================================

-- Mediterranean seafood
UPDATE seafood
SET origin = jsonb_build_object(
  'region_type', 'region',
  'region', 'Mediterranean',
  'region_code', 'MED',
  'continent', 'Europe',
  'continent_code', 'EU'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%mediterran%'
  OR LOWER(name) LIKE '%branzino%'
  OR LOWER(name) LIKE '%orata%'
  OR LOWER(name) LIKE '%calamari%'
  OR LOWER(name) LIKE '%polpo%'
  OR LOWER(name) LIKE '%frutti di mare%'
);

-- Japanese seafood
UPDATE seafood
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Japan',
  'country_code', 'JP',
  'continent', 'Asia',
  'continent_code', 'AS',
  'region', 'East Asia',
  'region_code', 'EAS'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%sashimi%'
  OR LOWER(name) LIKE '%sushi%'
  OR LOWER(name) LIKE '%uni%'
  OR LOWER(name) LIKE '%unagi%'
  OR LOWER(name) LIKE '%hamachi%'
  OR LOWER(name) LIKE '%toro%'
  OR LOWER(name) LIKE '%sake%'
  OR LOWER(name) LIKE '%maguro%'
);

-- New England/American seafood
UPDATE seafood
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'United States',
  'country_code', 'US',
  'continent', 'North America',
  'continent_code', 'NA',
  'local_region', 'New England'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%lobster%'
  OR LOWER(name) LIKE '%clam chowder%'
  OR LOWER(name) LIKE '%maine%'
  OR LOWER(name) LIKE '%new england%'
  OR LOWER(name) LIKE '%maryland%'
  OR LOWER(name) LIKE '%crab cake%'
);

-- Italian seafood
UPDATE seafood
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Italy',
  'country_code', 'IT',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%fritto misto%'
  OR LOWER(name) LIKE '%cacciucco%'
  OR LOWER(name) LIKE '%baccala%'
  OR LOWER(name) LIKE '%vongole%'
  OR LOWER(name) LIKE '%cozze%'
);

-- Spanish seafood
UPDATE seafood
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Spain',
  'country_code', 'ES',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%gambas%'
  OR LOWER(name) LIKE '%pulpo%'
  OR LOWER(name) LIKE '%galician%'
  OR LOWER(name) LIKE '%marisco%'
);

-- Default seafood: global (prodotto universale)
UPDATE seafood
SET origin = jsonb_build_object(
  'region_type', 'global',
  'is_international', true,
  'notes', 'Universal seafood'
)
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 4: BAKERY - Backfill basato su tipo
-- =====================================================

-- Italian bakery
UPDATE bakery
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Italy',
  'country_code', 'IT',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%focaccia%'
  OR LOWER(name) LIKE '%ciabatta%'
  OR LOWER(name) LIKE '%grissini%'
  OR LOWER(name) LIKE '%pane%'
  OR LOWER(name) LIKE '%panettone%'
  OR LOWER(name) LIKE '%colomba%'
  OR LOWER(name) LIKE '%pandoro%'
  OR LOWER(name) LIKE '%biscotti%'
  OR LOWER(name) LIKE '%cantucci%'
  OR LOWER(name) LIKE '%cornetto%'
  OR LOWER(name) LIKE '%sfogliatella%'
);

-- French bakery
UPDATE bakery
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'France',
  'country_code', 'FR',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%croissant%'
  OR LOWER(name) LIKE '%baguette%'
  OR LOWER(name) LIKE '%brioche%'
  OR LOWER(name) LIKE '%pain%'
  OR LOWER(name) LIKE '%macaron%'
  OR LOWER(name) LIKE '%eclair%'
  OR LOWER(name) LIKE '%madeleine%'
  OR LOWER(name) LIKE '%tarte%'
  OR LOWER(name) LIKE '%cronut%'
);

-- German bakery
UPDATE bakery
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Germany',
  'country_code', 'DE',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Central Europe',
  'region_code', 'CEU'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%pretzel%'
  OR LOWER(name) LIKE '%brezel%'
  OR LOWER(name) LIKE '%strudel%'
  OR LOWER(name) LIKE '%stollen%'
  OR LOWER(name) LIKE '%schwarzbrot%'
  OR LOWER(name) LIKE '%pumpernickel%'
);

-- American bakery
UPDATE bakery
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'United States',
  'country_code', 'US',
  'continent', 'North America',
  'continent_code', 'NA'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%donut%'
  OR LOWER(name) LIKE '%doughnut%'
  OR LOWER(name) LIKE '%bagel%'
  OR LOWER(name) LIKE '%muffin%'
  OR LOWER(name) LIKE '%brownie%'
  OR LOWER(name) LIKE '%cookie%'
  OR LOWER(name) LIKE '%cupcake%'
  OR LOWER(name) LIKE '%cornbread%'
);

-- British bakery
UPDATE bakery
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'United Kingdom',
  'country_code', 'GB',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'British Isles',
  'region_code', 'BRI'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%scone%'
  OR LOWER(name) LIKE '%crumpet%'
  OR LOWER(name) LIKE '%shortbread%'
  OR LOWER(name) LIKE '%english muffin%'
  OR LOWER(name) LIKE '%hot cross bun%'
);

-- Middle Eastern bakery
UPDATE bakery
SET origin = jsonb_build_object(
  'region_type', 'region',
  'region', 'Middle East',
  'region_code', 'MEA',
  'continent', 'Asia',
  'continent_code', 'AS'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%pita%'
  OR LOWER(name) LIKE '%lavash%'
  OR LOWER(name) LIKE '%naan%'
  OR LOWER(name) LIKE '%flatbread%'
);

-- Default bakery: global
UPDATE bakery
SET origin = jsonb_build_object(
  'region_type', 'global',
  'is_international', true,
  'notes', 'Common bakery item'
)
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 5: ICECREAM - Backfill basato su tipo
-- =====================================================

-- Italian gelato
UPDATE icecream
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Italy',
  'country_code', 'IT',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%gelato%'
  OR LOWER(name) LIKE '%stracciatella%'
  OR LOWER(name) LIKE '%nocciola%'
  OR LOWER(name) LIKE '%pistachio%'
  OR LOWER(name) LIKE '%fior di latte%'
  OR LOWER(name) LIKE '%bacio%'
  OR LOWER(name) LIKE '%amarena%'
  OR LOWER(name) LIKE '%affogato%'
);

-- Japanese ice cream
UPDATE icecream
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Japan',
  'country_code', 'JP',
  'continent', 'Asia',
  'continent_code', 'AS',
  'region', 'East Asia',
  'region_code', 'EAS'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%matcha%'
  OR LOWER(name) LIKE '%mochi%'
  OR LOWER(name) LIKE '%black sesame%'
  OR LOWER(name) LIKE '%green tea%'
  OR LOWER(name) LIKE '%yuzu%'
  OR LOWER(name) LIKE '%ube%'
);

-- American ice cream
UPDATE icecream
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'United States',
  'country_code', 'US',
  'continent', 'North America',
  'continent_code', 'NA'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%sundae%'
  OR LOWER(name) LIKE '%rocky road%'
  OR LOWER(name) LIKE '%mint chocolate chip%'
  OR LOWER(name) LIKE '%cookies and cream%'
  OR LOWER(name) LIKE '%butter pecan%'
  OR LOWER(name) LIKE '%cookie dough%'
);

-- Turkish ice cream
UPDATE icecream
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Turkey',
  'country_code', 'TR',
  'continent', 'Asia',
  'continent_code', 'AS',
  'region', 'Middle East',
  'region_code', 'MEA'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%dondurma%'
  OR LOWER(name) LIKE '%turkish%'
  OR LOWER(name) LIKE '%mastic%'
  OR LOWER(name) LIKE '%salep%'
);

-- Default icecream: global
UPDATE icecream
SET origin = jsonb_build_object(
  'region_type', 'global',
  'is_international', true,
  'notes', 'Common ice cream flavor'
)
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 6: SAUCES - Backfill basato su tipo
-- =====================================================

-- Italian sauces
UPDATE sauces
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Italy',
  'country_code', 'IT',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%pesto%'
  OR LOWER(name) LIKE '%marinara%'
  OR LOWER(name) LIKE '%bolognese%'
  OR LOWER(name) LIKE '%arrabbiata%'
  OR LOWER(name) LIKE '%carbonara%'
  OR LOWER(name) LIKE '%alfredo%'
  OR LOWER(name) LIKE '%pomodoro%'
  OR LOWER(name) LIKE '%amatriciana%'
  OR LOWER(name) LIKE '%puttanesca%'
  OR LOWER(name) LIKE '%genovese%'
);

-- French sauces
UPDATE sauces
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'France',
  'country_code', 'FR',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%béchamel%'
  OR LOWER(name) LIKE '%bechamel%'
  OR LOWER(name) LIKE '%hollandaise%'
  OR LOWER(name) LIKE '%béarnaise%'
  OR LOWER(name) LIKE '%bearnaise%'
  OR LOWER(name) LIKE '%velouté%'
  OR LOWER(name) LIKE '%veloute%'
  OR LOWER(name) LIKE '%espagnole%'
  OR LOWER(name) LIKE '%mornay%'
  OR LOWER(name) LIKE '%bordelaise%'
  OR LOWER(name) LIKE '%dijon%'
  OR LOWER(name) LIKE '%mayonnaise%'
  OR LOWER(name) LIKE '%rémoulade%'
  OR LOWER(name) LIKE '%remoulade%'
  OR LOWER(name) LIKE '%aioli%'
  OR LOWER(name) LIKE '%beurre%'
);

-- Asian sauces
UPDATE sauces
SET origin = jsonb_build_object(
  'region_type', 'region',
  'region', 'East Asia',
  'region_code', 'EAS',
  'continent', 'Asia',
  'continent_code', 'AS'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%soy%'
  OR LOWER(name) LIKE '%teriyaki%'
  OR LOWER(name) LIKE '%ponzu%'
  OR LOWER(name) LIKE '%miso%'
  OR LOWER(name) LIKE '%oyster%'
  OR LOWER(name) LIKE '%hoisin%'
  OR LOWER(name) LIKE '%sweet and sour%'
  OR LOWER(name) LIKE '%fish sauce%'
  OR LOWER(name) LIKE '%sriracha%'
  OR LOWER(name) LIKE '%gochujang%'
);

-- Mexican sauces
UPDATE sauces
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Mexico',
  'country_code', 'MX',
  'continent', 'North America',
  'continent_code', 'NA'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%salsa%'
  OR LOWER(name) LIKE '%mole%'
  OR LOWER(name) LIKE '%guacamole%'
  OR LOWER(name) LIKE '%chipotle%'
  OR LOWER(name) LIKE '%enchilada%'
  OR LOWER(name) LIKE '%verde%'
  OR LOWER(name) LIKE '%roja%'
);

-- American sauces
UPDATE sauces
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'United States',
  'country_code', 'US',
  'continent', 'North America',
  'continent_code', 'NA'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%bbq%'
  OR LOWER(name) LIKE '%barbecue%'
  OR LOWER(name) LIKE '%buffalo%'
  OR LOWER(name) LIKE '%ranch%'
  OR LOWER(name) LIKE '%thousand island%'
  OR LOWER(name) LIKE '%blue cheese%'
  OR LOWER(name) LIKE '%hot sauce%'
  OR LOWER(name) LIKE '%ketchup%'
  OR LOWER(name) LIKE '%mustard%'
);

-- Indian sauces
UPDATE sauces
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'India',
  'country_code', 'IN',
  'continent', 'Asia',
  'continent_code', 'AS',
  'region', 'South Asia',
  'region_code', 'SAS'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%curry%'
  OR LOWER(name) LIKE '%tikka%'
  OR LOWER(name) LIKE '%masala%'
  OR LOWER(name) LIKE '%raita%'
  OR LOWER(name) LIKE '%chutney%'
);

-- Mediterranean sauces
UPDATE sauces
SET origin = jsonb_build_object(
  'region_type', 'region',
  'region', 'Mediterranean',
  'region_code', 'MED',
  'continent', 'Europe',
  'continent_code', 'EU'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%tzatziki%'
  OR LOWER(name) LIKE '%hummus%'
  OR LOWER(name) LIKE '%tahini%'
  OR LOWER(name) LIKE '%harissa%'
  OR LOWER(name) LIKE '%chermoula%'
);

-- Default sauces: global
UPDATE sauces
SET origin = jsonb_build_object(
  'region_type', 'global',
  'is_international', true,
  'notes', 'Common sauce/condiment'
)
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 7: SIDES - Backfill basato su tipo
-- =====================================================

-- American sides
UPDATE sides
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'United States',
  'country_code', 'US',
  'continent', 'North America',
  'continent_code', 'NA'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%fries%'
  OR LOWER(name) LIKE '%french fries%'
  OR LOWER(name) LIKE '%mashed potato%'
  OR LOWER(name) LIKE '%coleslaw%'
  OR LOWER(name) LIKE '%mac and cheese%'
  OR LOWER(name) LIKE '%macaroni%'
  OR LOWER(name) LIKE '%corn on the cob%'
  OR LOWER(name) LIKE '%baked beans%'
  OR LOWER(name) LIKE '%hush puppies%'
  OR LOWER(name) LIKE '%onion rings%'
);

-- Italian sides
UPDATE sides
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Italy',
  'country_code', 'IT',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%bruschetta%'
  OR LOWER(name) LIKE '%caprese%'
  OR LOWER(name) LIKE '%arancini%'
  OR LOWER(name) LIKE '%polenta%'
  OR LOWER(name) LIKE '%insalata%'
  OR LOWER(name) LIKE '%verdure%'
  OR LOWER(name) LIKE '%patate%'
);

-- French sides
UPDATE sides
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'France',
  'country_code', 'FR',
  'continent', 'Europe',
  'continent_code', 'EU',
  'region', 'Mediterranean',
  'region_code', 'MED'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%pommes%'
  OR LOWER(name) LIKE '%gratin%'
  OR LOWER(name) LIKE '%dauphinoise%'
  OR LOWER(name) LIKE '%ratatouille%'
  OR LOWER(name) LIKE '%haricots verts%'
);

-- Asian sides
UPDATE sides
SET origin = jsonb_build_object(
  'region_type', 'region',
  'region', 'East Asia',
  'region_code', 'EAS',
  'continent', 'Asia',
  'continent_code', 'AS'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%fried rice%'
  OR LOWER(name) LIKE '%spring roll%'
  OR LOWER(name) LIKE '%edamame%'
  OR LOWER(name) LIKE '%gyoza%'
  OR LOWER(name) LIKE '%kimchi%'
  OR LOWER(name) LIKE '%steamed rice%'
  OR LOWER(name) LIKE '%noodle%'
);

-- Mexican sides
UPDATE sides
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'Mexico',
  'country_code', 'MX',
  'continent', 'North America',
  'continent_code', 'NA'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%rice and beans%'
  OR LOWER(name) LIKE '%refried beans%'
  OR LOWER(name) LIKE '%elote%'
  OR LOWER(name) LIKE '%tortilla%'
  OR LOWER(name) LIKE '%chips%'
  OR LOWER(name) LIKE '%mexican%'
);

-- Mediterranean sides
UPDATE sides
SET origin = jsonb_build_object(
  'region_type', 'region',
  'region', 'Mediterranean',
  'region_code', 'MED',
  'continent', 'Europe',
  'continent_code', 'EU'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%tabbouleh%'
  OR LOWER(name) LIKE '%falafel%'
  OR LOWER(name) LIKE '%pita%'
  OR LOWER(name) LIKE '%hummus%'
  OR LOWER(name) LIKE '%greek%'
  OR LOWER(name) LIKE '%tzatziki%'
);

-- Indian sides
UPDATE sides
SET origin = jsonb_build_object(
  'region_type', 'country',
  'country', 'India',
  'country_code', 'IN',
  'continent', 'Asia',
  'continent_code', 'AS',
  'region', 'South Asia',
  'region_code', 'SAS'
)
WHERE origin = '{}'::jsonb
AND (
  LOWER(name) LIKE '%naan%'
  OR LOWER(name) LIKE '%samosa%'
  OR LOWER(name) LIKE '%papadum%'
  OR LOWER(name) LIKE '%basmati%'
  OR LOWER(name) LIKE '%dal%'
  OR LOWER(name) LIKE '%raita%'
);

-- Default sides: global
UPDATE sides
SET origin = jsonb_build_object(
  'region_type', 'global',
  'is_international', true,
  'notes', 'Common side dish'
)
WHERE origin = '{}'::jsonb;

-- =====================================================
-- STEP 8: Creare indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_steaks_origin_country ON steaks ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_steaks_origin_region ON steaks ((origin->>'region_code'));

CREATE INDEX IF NOT EXISTS idx_seafood_origin_country ON seafood ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_seafood_origin_region ON seafood ((origin->>'region_code'));

CREATE INDEX IF NOT EXISTS idx_bakery_origin_country ON bakery ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_bakery_origin_region ON bakery ((origin->>'region_code'));

CREATE INDEX IF NOT EXISTS idx_icecream_origin_country ON icecream ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_icecream_origin_region ON icecream ((origin->>'region_code'));

CREATE INDEX IF NOT EXISTS idx_sauces_origin_country ON sauces ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_sauces_origin_region ON sauces ((origin->>'region_code'));

CREATE INDEX IF NOT EXISTS idx_sides_origin_country ON sides ((origin->>'country_code'));
CREATE INDEX IF NOT EXISTS idx_sides_origin_region ON sides ((origin->>'region_code'));

-- =====================================================
-- STEP 9: Verifica (eseguire separatamente)
-- =====================================================

-- SELECT table_name, region_type, COUNT(*)
-- FROM (
--   SELECT 'steaks' as table_name, origin->>'region_type' as region_type FROM steaks
--   UNION ALL SELECT 'seafood', origin->>'region_type' FROM seafood
--   UNION ALL SELECT 'bakery', origin->>'region_type' FROM bakery
--   UNION ALL SELECT 'icecream', origin->>'region_type' FROM icecream
--   UNION ALL SELECT 'sauces', origin->>'region_type' FROM sauces
--   UNION ALL SELECT 'sides', origin->>'region_type' FROM sides
-- ) t
-- GROUP BY table_name, region_type
-- ORDER BY table_name, region_type;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
