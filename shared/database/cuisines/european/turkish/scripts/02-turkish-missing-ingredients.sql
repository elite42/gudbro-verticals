-- Turkish Missing Ingredients
-- Database Standards v1.1 compliant
-- Created: 2025-12-19

-- Insert Turkish-specific ingredients that may not exist in master ingredients table
INSERT INTO ingredients (id, slug, name, description, category, allergens)
VALUES
  -- Turkish Dairy & Cheese
  ('ING_KASAR_CHEESE', 'kasar-cheese', 'Kaşar Cheese', 'Turkish yellow cheese, semi-hard with mild flavor', 'dairy', '["dairy"]'::jsonb),
  ('ING_BEYAZ_PEYNIR', 'beyaz-peynir', 'Beyaz Peynir', 'Turkish white cheese similar to feta', 'dairy', '["dairy"]'::jsonb),
  ('ING_LOR_CHEESE', 'lor-cheese', 'Lor Cheese', 'Turkish fresh curd cheese, soft and crumbly', 'dairy', '["dairy"]'::jsonb),
  ('ING_SUZME_YOGURT', 'suzme-yogurt', 'Süzme Yogurt', 'Strained thick Turkish yogurt', 'dairy', '["dairy"]'::jsonb),
  ('ING_AYRAN', 'ayran', 'Ayran', 'Turkish salted yogurt drink', 'dairy', '["dairy"]'::jsonb),

  -- Turkish Meats & Proteins
  ('ING_SUCUK', 'sucuk', 'Sucuk', 'Spicy Turkish beef sausage with cumin and garlic', 'proteins', '[]'::jsonb),
  ('ING_PASTIRMA', 'pastirma', 'Pastırma', 'Air-dried cured beef coated in fenugreek paste', 'proteins', '[]'::jsonb),
  ('ING_KUZU_KUYRUK', 'kuzu-kuyruk', 'Kuzu Kuyruğu', 'Lamb tail fat, traditional Turkish cooking fat', 'proteins', '[]'::jsonb),
  ('ING_ISKEMBE', 'iskembe', 'İşkembe', 'Tripe for traditional Turkish soup', 'proteins', '[]'::jsonb),
  ('ING_CIGER', 'ciger', 'Ciğer', 'Lamb liver, grilled or fried Turkish specialty', 'proteins', '[]'::jsonb),

  -- Turkish Spices & Seasonings
  ('ING_ISOT_BIBER', 'isot-biber', 'İsot Biber', 'Urfa pepper, smoky dried chili from Şanlıurfa', 'seasonings', '[]'::jsonb),
  ('ING_PUL_BIBER', 'pul-biber', 'Pul Biber', 'Turkish red pepper flakes, mild and fruity', 'seasonings', '[]'::jsonb),
  ('ING_SUMAC', 'sumac', 'Sumak', 'Sumac, tangy red spice for salads and kebabs', 'seasonings', '[]'::jsonb),
  ('ING_MAHLEP', 'mahlep', 'Mahlep', 'Ground cherry pit kernel, used in Turkish pastries', 'seasonings', '[]'::jsonb),
  ('ING_MASTIC', 'mastic', 'Sakız (Mastic)', 'Resin from mastic tree, used in ice cream and desserts', 'seasonings', '[]'::jsonb),
  ('ING_SALEP', 'salep', 'Salep', 'Orchid root powder for Turkish ice cream and drinks', 'seasonings', '[]'::jsonb),
  ('ING_BIBER_SALCASI', 'biber-salcasi', 'Biber Salçası', 'Turkish red pepper paste', 'seasonings', '[]'::jsonb),
  ('ING_DOMATES_SALCASI', 'domates-salcasi', 'Domates Salçası', 'Turkish tomato paste, concentrated', 'seasonings', '[]'::jsonb),

  -- Turkish Breads & Grains
  ('ING_YUFKA', 'yufka', 'Yufka', 'Paper-thin Turkish phyllo dough', 'grains', '["gluten"]'::jsonb),
  ('ING_PIDE_BREAD', 'pide-bread', 'Pide Ekmeği', 'Soft Turkish flatbread', 'grains', '["gluten"]'::jsonb),
  ('ING_LAVASH', 'lavash', 'Lavaş', 'Thin soft Turkish flatbread', 'grains', '["gluten"]'::jsonb),
  ('ING_SIMIT', 'simit', 'Simit', 'Turkish sesame bread ring', 'grains', '["gluten", "sesame"]'::jsonb),
  ('ING_TARHANA', 'tarhana', 'Tarhana', 'Fermented grain and yogurt mixture for soup', 'grains', '["gluten", "dairy"]'::jsonb),
  ('ING_BULGUR_FINE', 'bulgur-fine', 'İnce Bulgur', 'Fine bulgur wheat for kisir and kofte', 'grains', '["gluten"]'::jsonb),
  ('ING_FREEKEH', 'freekeh', 'Firik', 'Roasted green wheat, smoky ancient grain', 'grains', '["gluten"]'::jsonb),

  -- Turkish Vegetables & Produce
  ('ING_SIVRI_BIBER', 'sivri-biber', 'Sivri Biber', 'Long green Turkish pepper, mild', 'vegetables', '[]'::jsonb),
  ('ING_CARLISTON_BIBER', 'carliston-biber', 'Çarliston Biber', 'Charleston pepper, sweet and thin-skinned', 'vegetables', '[]'::jsonb),
  ('ING_DOLMALIK_BIBER', 'dolmalik-biber', 'Dolmalık Biber', 'Small peppers for stuffing', 'vegetables', '[]'::jsonb),
  ('ING_PATLICAN_KIZARTMA', 'patlican-kizartma', 'Patlıcan', 'Turkish eggplant varieties for grilling and stuffing', 'vegetables', '[]'::jsonb),
  ('ING_TURSU', 'tursu', 'Turşu', 'Turkish pickled vegetables', 'vegetables', '[]'::jsonb),

  -- Turkish Sweets & Syrups
  ('ING_PEKMEZ', 'pekmez', 'Pekmez', 'Grape molasses, Turkish natural sweetener', 'sweeteners', '[]'::jsonb),
  ('ING_NAR_EKSISI', 'nar-eksisi', 'Nar Ekşisi', 'Pomegranate molasses', 'sweeteners', '[]'::jsonb),
  ('ING_SEKERPARE_SYRUP', 'simple-syrup-turkish', 'Şerbet', 'Turkish sugar syrup for desserts', 'sweeteners', '[]'::jsonb),
  ('ING_KAYMAK', 'kaymak', 'Kaymak', 'Turkish clotted cream', 'dairy', '["dairy"]'::jsonb),
  ('ING_TAHIN_PEKMEZ', 'tahin-pekmez', 'Tahin Pekmez', 'Tahini and grape molasses mixture', 'sweeteners', '["sesame"]'::jsonb),

  -- Turkish Nuts & Seeds
  ('ING_ANTEP_FISTIK', 'antep-fistik', 'Antep Fıstığı', 'Gaziantep pistachios, premium quality', 'nuts', '["tree_nuts"]'::jsonb),
  ('ING_FINDIK', 'findik', 'Fındık', 'Turkish hazelnuts from Black Sea region', 'nuts', '["tree_nuts"]'::jsonb),
  ('ING_CEVIZ', 'ceviz', 'Ceviz', 'Turkish walnuts', 'nuts', '["tree_nuts"]'::jsonb),

  -- Turkish Seafood
  ('ING_HAMSI', 'hamsi', 'Hamsi', 'Black Sea anchovies', 'proteins', '["fish"]'::jsonb),
  ('ING_LUFER', 'lufer', 'Lüfer', 'Bluefish from Bosphorus', 'proteins', '["fish"]'::jsonb),
  ('ING_MIDYE', 'midye', 'Midye', 'Turkish mussels', 'proteins', '["shellfish"]'::jsonb),
  ('ING_KARIDES', 'karides', 'Karides', 'Turkish shrimp', 'proteins', '["shellfish"]'::jsonb),
  ('ING_LEVREK', 'levrek', 'Levrek', 'Mediterranean sea bass', 'proteins', '["fish"]'::jsonb),
  ('ING_CIUPRA', 'ciupra', 'Çipura', 'Gilt-head bream', 'proteins', '["fish"]'::jsonb),
  ('ING_AHTAPOT', 'ahtapot', 'Ahtapot', 'Octopus', 'proteins', '["shellfish"]'::jsonb)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  allergens = EXCLUDED.allergens;

-- Summary
DO $$
DECLARE
  ing_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO ing_count FROM ingredients WHERE id LIKE 'ING_%';
  RAISE NOTICE 'Turkish ingredients added/updated successfully!';
  RAISE NOTICE 'Total ingredients in database: %', ing_count;
END $$;
