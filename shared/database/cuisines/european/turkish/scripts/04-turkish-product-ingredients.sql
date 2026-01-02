-- Turkish Product Ingredients
-- Links between Turkish dishes and master ingredients table
-- Database Standards v1.1 compliant
-- Created: 2025-12-19

-- Clear existing Turkish product_ingredients
DELETE FROM product_ingredients WHERE product_type = 'turkish';

-- KEBABS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Döner Kebab
('turkish', 'TRK_DONER_KEBAB', 'ING_LAMB', 200, 'g', 'main', false),
('turkish', 'TRK_DONER_KEBAB', 'ING_BEEF', 100, 'g', 'main', false),
('turkish', 'TRK_DONER_KEBAB', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_DONER_KEBAB', 'ING_TOMATO', 40, 'g', 'secondary', false),
('turkish', 'TRK_DONER_KEBAB', 'ING_PIDE_BREAD', 1, 'pieces', 'secondary', false),
('turkish', 'TRK_DONER_KEBAB', 'ING_PUL_BIBER', 2, 'g', 'secondary', true),
('turkish', 'TRK_DONER_KEBAB', 'ING_CUMIN', 2, 'g', 'secondary', false),
('turkish', 'TRK_DONER_KEBAB', 'ING_GARLIC', 5, 'g', 'secondary', false),

-- İskender Kebab
('turkish', 'TRK_ISKENDER_KEBAB', 'ING_LAMB', 250, 'g', 'main', false),
('turkish', 'TRK_ISKENDER_KEBAB', 'ING_PIDE_BREAD', 2, 'pieces', 'secondary', false),
('turkish', 'TRK_ISKENDER_KEBAB', 'ING_TOMATO', 100, 'g', 'secondary', false),
('turkish', 'TRK_ISKENDER_KEBAB', 'ING_BUTTER', 40, 'g', 'secondary', false),
('turkish', 'TRK_ISKENDER_KEBAB', 'ING_YOGURT', 100, 'g', 'secondary', false),
('turkish', 'TRK_ISKENDER_KEBAB', 'ING_BIBER_SALCASI', 20, 'g', 'secondary', false),
('turkish', 'TRK_ISKENDER_KEBAB', 'ING_GARLIC', 5, 'g', 'secondary', false),

-- Adana Kebab
('turkish', 'TRK_ADANA_KEBAB', 'ING_LAMB', 300, 'g', 'main', false),
('turkish', 'TRK_ADANA_KEBAB', 'ING_KUZU_KUYRUK', 50, 'g', 'secondary', false),
('turkish', 'TRK_ADANA_KEBAB', 'ING_PUL_BIBER', 10, 'g', 'secondary', false),
('turkish', 'TRK_ADANA_KEBAB', 'ING_ONION', 30, 'g', 'secondary', false),
('turkish', 'TRK_ADANA_KEBAB', 'ING_PARSLEY', 10, 'g', 'secondary', false),
('turkish', 'TRK_ADANA_KEBAB', 'ING_SUMAC', 5, 'g', 'secondary', true),
('turkish', 'TRK_ADANA_KEBAB', 'ING_LAVASH', 1, 'pieces', 'secondary', false),

-- Urfa Kebab
('turkish', 'TRK_URFA_KEBAB', 'ING_LAMB', 300, 'g', 'main', false),
('turkish', 'TRK_URFA_KEBAB', 'ING_KUZU_KUYRUK', 50, 'g', 'secondary', false),
('turkish', 'TRK_URFA_KEBAB', 'ING_ISOT_BIBER', 10, 'g', 'secondary', false),
('turkish', 'TRK_URFA_KEBAB', 'ING_ONION', 30, 'g', 'secondary', false),
('turkish', 'TRK_URFA_KEBAB', 'ING_PARSLEY', 10, 'g', 'secondary', false),
('turkish', 'TRK_URFA_KEBAB', 'ING_LAVASH', 1, 'pieces', 'secondary', false),

-- Şiş Kebab
('turkish', 'TRK_SHISH_KEBAB', 'ING_LAMB', 250, 'g', 'main', false),
('turkish', 'TRK_SHISH_KEBAB', 'ING_BELL_PEPPER', 50, 'g', 'secondary', false),
('turkish', 'TRK_SHISH_KEBAB', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_SHISH_KEBAB', 'ING_TOMATO', 50, 'g', 'secondary', false),
('turkish', 'TRK_SHISH_KEBAB', 'ING_OLIVE_OIL', 20, 'ml', 'secondary', false),
('turkish', 'TRK_SHISH_KEBAB', 'ING_OREGANO', 3, 'g', 'secondary', false),

-- Tavuk Şiş
('turkish', 'TRK_TAVUK_SIS', 'ING_CHICKEN_BREAST', 250, 'g', 'main', false),
('turkish', 'TRK_TAVUK_SIS', 'ING_YOGURT', 50, 'g', 'secondary', false),
('turkish', 'TRK_TAVUK_SIS', 'ING_OLIVE_OIL', 20, 'ml', 'secondary', false),
('turkish', 'TRK_TAVUK_SIS', 'ING_PAPRIKA', 5, 'g', 'secondary', false),
('turkish', 'TRK_TAVUK_SIS', 'ING_GARLIC', 10, 'g', 'secondary', false),
('turkish', 'TRK_TAVUK_SIS', 'ING_LEMON_JUICE', 15, 'ml', 'secondary', false),

-- Beyti Kebab
('turkish', 'TRK_BEYTI_KEBAB', 'ING_LAMB', 200, 'g', 'main', false),
('turkish', 'TRK_BEYTI_KEBAB', 'ING_BEEF', 100, 'g', 'main', false),
('turkish', 'TRK_BEYTI_KEBAB', 'ING_LAVASH', 2, 'pieces', 'secondary', false),
('turkish', 'TRK_BEYTI_KEBAB', 'ING_YOGURT', 80, 'g', 'secondary', false),
('turkish', 'TRK_BEYTI_KEBAB', 'ING_TOMATO', 80, 'g', 'secondary', false),
('turkish', 'TRK_BEYTI_KEBAB', 'ING_BUTTER', 30, 'g', 'secondary', false),
('turkish', 'TRK_BEYTI_KEBAB', 'ING_GARLIC', 10, 'g', 'secondary', false),

-- Köfte Kebab
('turkish', 'TRK_KOFTE_KEBAB', 'ING_LAMB', 150, 'g', 'main', false),
('turkish', 'TRK_KOFTE_KEBAB', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_KOFTE_KEBAB', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_KOFTE_KEBAB', 'ING_BREADCRUMBS', 30, 'g', 'secondary', false),
('turkish', 'TRK_KOFTE_KEBAB', 'ING_EGG', 1, 'pieces', 'secondary', false),
('turkish', 'TRK_KOFTE_KEBAB', 'ING_PARSLEY', 15, 'g', 'secondary', false),
('turkish', 'TRK_KOFTE_KEBAB', 'ING_CUMIN', 3, 'g', 'secondary', false),

-- Patlıcan Kebab
('turkish', 'TRK_PATLICAN_KEBAB', 'ING_LAMB', 200, 'g', 'main', false),
('turkish', 'TRK_PATLICAN_KEBAB', 'ING_EGGPLANT', 200, 'g', 'main', false),
('turkish', 'TRK_PATLICAN_KEBAB', 'ING_TOMATO', 80, 'g', 'secondary', false),
('turkish', 'TRK_PATLICAN_KEBAB', 'ING_BELL_PEPPER', 50, 'g', 'secondary', false),
('turkish', 'TRK_PATLICAN_KEBAB', 'ING_OLIVE_OIL', 30, 'ml', 'secondary', false),

-- Ciğer Kebab
('turkish', 'TRK_CIGER_KEBAB', 'ING_CIGER', 250, 'g', 'main', false),
('turkish', 'TRK_CIGER_KEBAB', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_CIGER_KEBAB', 'ING_PARSLEY', 30, 'g', 'secondary', false),
('turkish', 'TRK_CIGER_KEBAB', 'ING_SUMAC', 5, 'g', 'secondary', false),
('turkish', 'TRK_CIGER_KEBAB', 'ING_LAVASH', 1, 'pieces', 'secondary', false),
('turkish', 'TRK_CIGER_KEBAB', 'ING_PUL_BIBER', 3, 'g', 'secondary', true);

-- PIDE & LAHMACUN
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Lahmacun
('turkish', 'TRK_LAHMACUN', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_LAHMACUN', 'ING_FLOUR', 100, 'g', 'secondary', false),
('turkish', 'TRK_LAHMACUN', 'ING_TOMATO', 50, 'g', 'secondary', false),
('turkish', 'TRK_LAHMACUN', 'ING_ONION', 30, 'g', 'secondary', false),
('turkish', 'TRK_LAHMACUN', 'ING_PARSLEY', 10, 'g', 'secondary', false),
('turkish', 'TRK_LAHMACUN', 'ING_BIBER_SALCASI', 15, 'g', 'secondary', false),
('turkish', 'TRK_LAHMACUN', 'ING_PUL_BIBER', 5, 'g', 'secondary', false),
('turkish', 'TRK_LAHMACUN', 'ING_LEMON', 1, 'pieces', 'secondary', true),

-- Kıymalı Pide
('turkish', 'TRK_PIDE_KIYMALI', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_PIDE_KIYMALI', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_PIDE_KIYMALI', 'ING_FLOUR', 200, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_KIYMALI', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_KIYMALI', 'ING_TOMATO', 50, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_KIYMALI', 'ING_BELL_PEPPER', 30, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_KIYMALI', 'ING_BIBER_SALCASI', 15, 'g', 'secondary', false),

-- Kaşarlı Pide
('turkish', 'TRK_PIDE_KASARLI', 'ING_KASAR_CHEESE', 200, 'g', 'main', false),
('turkish', 'TRK_PIDE_KASARLI', 'ING_FLOUR', 200, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_KASARLI', 'ING_EGG', 1, 'pieces', 'secondary', true),
('turkish', 'TRK_PIDE_KASARLI', 'ING_BUTTER', 20, 'g', 'secondary', false),

-- Sucuklu Pide
('turkish', 'TRK_PIDE_SUCUKLU', 'ING_SUCUK', 150, 'g', 'main', false),
('turkish', 'TRK_PIDE_SUCUKLU', 'ING_EGG', 2, 'pieces', 'main', false),
('turkish', 'TRK_PIDE_SUCUKLU', 'ING_FLOUR', 200, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_SUCUKLU', 'ING_KASAR_CHEESE', 50, 'g', 'secondary', true),

-- Kuşbaşılı Pide
('turkish', 'TRK_PIDE_KUSBASI', 'ING_LAMB', 200, 'g', 'main', false),
('turkish', 'TRK_PIDE_KUSBASI', 'ING_FLOUR', 200, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_KUSBASI', 'ING_TOMATO', 50, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_KUSBASI', 'ING_BELL_PEPPER', 50, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_KUSBASI', 'ING_ONION', 30, 'g', 'secondary', false),

-- Ispanaklı Pide
('turkish', 'TRK_PIDE_ISPANAKLI', 'ING_SPINACH', 200, 'g', 'main', false),
('turkish', 'TRK_PIDE_ISPANAKLI', 'ING_BEYAZ_PEYNIR', 100, 'g', 'main', false),
('turkish', 'TRK_PIDE_ISPANAKLI', 'ING_FLOUR', 200, 'g', 'secondary', false),
('turkish', 'TRK_PIDE_ISPANAKLI', 'ING_ONION', 30, 'g', 'secondary', false),

-- Bafra Pidesi
('turkish', 'TRK_BAFRA_PIDE', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_BAFRA_PIDE', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_BAFRA_PIDE', 'ING_FLOUR', 250, 'g', 'secondary', false),
('turkish', 'TRK_BAFRA_PIDE', 'ING_ONION', 50, 'g', 'secondary', false),

-- Etli Ekmek
('turkish', 'TRK_ETLI_EKMEK', 'ING_LAMB', 150, 'g', 'main', false),
('turkish', 'TRK_ETLI_EKMEK', 'ING_FLOUR', 150, 'g', 'secondary', false),
('turkish', 'TRK_ETLI_EKMEK', 'ING_TOMATO', 40, 'g', 'secondary', false),
('turkish', 'TRK_ETLI_EKMEK', 'ING_ONION', 30, 'g', 'secondary', false),
('turkish', 'TRK_ETLI_EKMEK', 'ING_PARSLEY', 10, 'g', 'secondary', false),
('turkish', 'TRK_ETLI_EKMEK', 'ING_BIBER_SALCASI', 15, 'g', 'secondary', false);

-- MEZES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Hummus
('turkish', 'TRK_HUMMUS', 'ING_CHICKPEAS', 200, 'g', 'main', false),
('turkish', 'TRK_HUMMUS', 'ING_TAHINI', 50, 'g', 'main', false),
('turkish', 'TRK_HUMMUS', 'ING_LEMON_JUICE', 30, 'ml', 'secondary', false),
('turkish', 'TRK_HUMMUS', 'ING_GARLIC', 10, 'g', 'secondary', false),
('turkish', 'TRK_HUMMUS', 'ING_OLIVE_OIL', 30, 'ml', 'secondary', false),
('turkish', 'TRK_HUMMUS', 'ING_CUMIN', 2, 'g', 'secondary', false),

-- Babaganuş
('turkish', 'TRK_BABAGANOUSH', 'ING_EGGPLANT', 300, 'g', 'main', false),
('turkish', 'TRK_BABAGANOUSH', 'ING_TAHINI', 40, 'g', 'main', false),
('turkish', 'TRK_BABAGANOUSH', 'ING_LEMON_JUICE', 20, 'ml', 'secondary', false),
('turkish', 'TRK_BABAGANOUSH', 'ING_GARLIC', 10, 'g', 'secondary', false),
('turkish', 'TRK_BABAGANOUSH', 'ING_OLIVE_OIL', 20, 'ml', 'secondary', false),

-- Cacık
('turkish', 'TRK_CACIK', 'ING_YOGURT', 200, 'g', 'main', false),
('turkish', 'TRK_CACIK', 'ING_CUCUMBER', 100, 'g', 'main', false),
('turkish', 'TRK_CACIK', 'ING_GARLIC', 5, 'g', 'secondary', false),
('turkish', 'TRK_CACIK', 'ING_DILL', 10, 'g', 'secondary', false),
('turkish', 'TRK_CACIK', 'ING_MINT', 5, 'g', 'secondary', true),
('turkish', 'TRK_CACIK', 'ING_OLIVE_OIL', 10, 'ml', 'secondary', false),

-- Haydari
('turkish', 'TRK_HAYDARI', 'ING_SUZME_YOGURT', 200, 'g', 'main', false),
('turkish', 'TRK_HAYDARI', 'ING_GARLIC', 10, 'g', 'secondary', false),
('turkish', 'TRK_HAYDARI', 'ING_DILL', 15, 'g', 'secondary', false),
('turkish', 'TRK_HAYDARI', 'ING_CEVIZ', 30, 'g', 'secondary', false),
('turkish', 'TRK_HAYDARI', 'ING_OLIVE_OIL', 15, 'ml', 'secondary', false),

-- Ezme
('turkish', 'TRK_EZME', 'ING_TOMATO', 200, 'g', 'main', false),
('turkish', 'TRK_EZME', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_EZME', 'ING_BELL_PEPPER', 50, 'g', 'secondary', false),
('turkish', 'TRK_EZME', 'ING_PARSLEY', 30, 'g', 'secondary', false),
('turkish', 'TRK_EZME', 'ING_NAR_EKSISI', 15, 'ml', 'secondary', false),
('turkish', 'TRK_EZME', 'ING_PUL_BIBER', 5, 'g', 'secondary', false),
('turkish', 'TRK_EZME', 'ING_OLIVE_OIL', 20, 'ml', 'secondary', false),

-- Kısır
('turkish', 'TRK_KISIR', 'ING_BULGUR_FINE', 150, 'g', 'main', false),
('turkish', 'TRK_KISIR', 'ING_DOMATES_SALCASI', 30, 'g', 'secondary', false),
('turkish', 'TRK_KISIR', 'ING_BIBER_SALCASI', 20, 'g', 'secondary', false),
('turkish', 'TRK_KISIR', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_KISIR', 'ING_PARSLEY', 30, 'g', 'secondary', false),
('turkish', 'TRK_KISIR', 'ING_NAR_EKSISI', 20, 'ml', 'secondary', false),
('turkish', 'TRK_KISIR', 'ING_MINT', 10, 'g', 'secondary', false),

-- Patlıcan Salatası
('turkish', 'TRK_PATLICAN_SALATA', 'ING_EGGPLANT', 300, 'g', 'main', false),
('turkish', 'TRK_PATLICAN_SALATA', 'ING_TOMATO', 80, 'g', 'secondary', false),
('turkish', 'TRK_PATLICAN_SALATA', 'ING_BELL_PEPPER', 50, 'g', 'secondary', false),
('turkish', 'TRK_PATLICAN_SALATA', 'ING_GARLIC', 10, 'g', 'secondary', false),
('turkish', 'TRK_PATLICAN_SALATA', 'ING_OLIVE_OIL', 30, 'ml', 'secondary', false),

-- Atom
('turkish', 'TRK_ATOM', 'ING_BELL_PEPPER', 150, 'g', 'main', false),
('turkish', 'TRK_ATOM', 'ING_CEVIZ', 50, 'g', 'main', false),
('turkish', 'TRK_ATOM', 'ING_PUL_BIBER', 15, 'g', 'secondary', false),
('turkish', 'TRK_ATOM', 'ING_GARLIC', 10, 'g', 'secondary', false),
('turkish', 'TRK_ATOM', 'ING_OLIVE_OIL', 20, 'ml', 'secondary', false),

-- Acılı Ezme
('turkish', 'TRK_ACILI_EZME', 'ING_TOMATO', 200, 'g', 'main', false),
('turkish', 'TRK_ACILI_EZME', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_ACILI_EZME', 'ING_PUL_BIBER', 10, 'g', 'secondary', false),
('turkish', 'TRK_ACILI_EZME', 'ING_ISOT_BIBER', 5, 'g', 'secondary', false),
('turkish', 'TRK_ACILI_EZME', 'ING_PARSLEY', 20, 'g', 'secondary', false),
('turkish', 'TRK_ACILI_EZME', 'ING_NAR_EKSISI', 15, 'ml', 'secondary', false),

-- Muhammara
('turkish', 'TRK_MUHAMMARA', 'ING_BELL_PEPPER', 200, 'g', 'main', false),
('turkish', 'TRK_MUHAMMARA', 'ING_CEVIZ', 100, 'g', 'main', false),
('turkish', 'TRK_MUHAMMARA', 'ING_NAR_EKSISI', 30, 'ml', 'secondary', false),
('turkish', 'TRK_MUHAMMARA', 'ING_BREADCRUMBS', 30, 'g', 'secondary', false),
('turkish', 'TRK_MUHAMMARA', 'ING_OLIVE_OIL', 30, 'ml', 'secondary', false),
('turkish', 'TRK_MUHAMMARA', 'ING_CUMIN', 3, 'g', 'secondary', false),

-- Sigara Böreği
('turkish', 'TRK_SIGARA_BOREGI', 'ING_YUFKA', 100, 'g', 'main', false),
('turkish', 'TRK_SIGARA_BOREGI', 'ING_BEYAZ_PEYNIR', 150, 'g', 'main', false),
('turkish', 'TRK_SIGARA_BOREGI', 'ING_PARSLEY', 20, 'g', 'secondary', false),
('turkish', 'TRK_SIGARA_BOREGI', 'ING_VEGETABLE_OIL', 100, 'ml', 'secondary', false),

-- Midye Dolma
('turkish', 'TRK_MIDYE_DOLMA', 'ING_MIDYE', 500, 'g', 'main', false),
('turkish', 'TRK_MIDYE_DOLMA', 'ING_RICE', 150, 'g', 'main', false),
('turkish', 'TRK_MIDYE_DOLMA', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_MIDYE_DOLMA', 'ING_PINE_NUTS', 20, 'g', 'secondary', false),
('turkish', 'TRK_MIDYE_DOLMA', 'ING_CURRANTS', 20, 'g', 'secondary', false),
('turkish', 'TRK_MIDYE_DOLMA', 'ING_ALLSPICE', 2, 'g', 'secondary', false),
('turkish', 'TRK_MIDYE_DOLMA', 'ING_LEMON', 1, 'pieces', 'secondary', false);

-- BÖREK
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Su Böreği
('turkish', 'TRK_SU_BOREGI', 'ING_YUFKA', 300, 'g', 'main', false),
('turkish', 'TRK_SU_BOREGI', 'ING_BEYAZ_PEYNIR', 200, 'g', 'main', false),
('turkish', 'TRK_SU_BOREGI', 'ING_EGG', 3, 'pieces', 'secondary', false),
('turkish', 'TRK_SU_BOREGI', 'ING_MILK', 200, 'ml', 'secondary', false),
('turkish', 'TRK_SU_BOREGI', 'ING_BUTTER', 100, 'g', 'secondary', false),

-- Kıymalı Börek
('turkish', 'TRK_KIYMALI_BOREK', 'ING_YUFKA', 300, 'g', 'main', false),
('turkish', 'TRK_KIYMALI_BOREK', 'ING_BEEF', 200, 'g', 'main', false),
('turkish', 'TRK_KIYMALI_BOREK', 'ING_ONION', 100, 'g', 'secondary', false),
('turkish', 'TRK_KIYMALI_BOREK', 'ING_EGG', 2, 'pieces', 'secondary', false),
('turkish', 'TRK_KIYMALI_BOREK', 'ING_BUTTER', 80, 'g', 'secondary', false),
('turkish', 'TRK_KIYMALI_BOREK', 'ING_BLACK_PEPPER', 2, 'g', 'secondary', false),

-- Ispanaklı Börek
('turkish', 'TRK_ISPANAKLI_BOREK', 'ING_YUFKA', 300, 'g', 'main', false),
('turkish', 'TRK_ISPANAKLI_BOREK', 'ING_SPINACH', 300, 'g', 'main', false),
('turkish', 'TRK_ISPANAKLI_BOREK', 'ING_BEYAZ_PEYNIR', 150, 'g', 'main', false),
('turkish', 'TRK_ISPANAKLI_BOREK', 'ING_EGG', 2, 'pieces', 'secondary', false),
('turkish', 'TRK_ISPANAKLI_BOREK', 'ING_BUTTER', 80, 'g', 'secondary', false),
('turkish', 'TRK_ISPANAKLI_BOREK', 'ING_ONION', 50, 'g', 'secondary', false),

-- Patatesli Börek
('turkish', 'TRK_PATATESLI_BOREK', 'ING_YUFKA', 300, 'g', 'main', false),
('turkish', 'TRK_PATATESLI_BOREK', 'ING_POTATO', 400, 'g', 'main', false),
('turkish', 'TRK_PATATESLI_BOREK', 'ING_EGG', 2, 'pieces', 'secondary', false),
('turkish', 'TRK_PATATESLI_BOREK', 'ING_BUTTER', 60, 'g', 'secondary', false),
('turkish', 'TRK_PATATESLI_BOREK', 'ING_PARSLEY', 20, 'g', 'secondary', false),

-- Talaş Böreği
('turkish', 'TRK_TALAS_BOREGI', 'ING_PUFF_PASTRY', 300, 'g', 'main', false),
('turkish', 'TRK_TALAS_BOREGI', 'ING_LAMB', 200, 'g', 'main', false),
('turkish', 'TRK_TALAS_BOREGI', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_TALAS_BOREGI', 'ING_EGG', 1, 'pieces', 'secondary', false),
('turkish', 'TRK_TALAS_BOREGI', 'ING_BLACK_PEPPER', 2, 'g', 'secondary', false),

-- Gözleme
('turkish', 'TRK_GOZLEME', 'ING_FLOUR', 200, 'g', 'main', false),
('turkish', 'TRK_GOZLEME', 'ING_BEYAZ_PEYNIR', 150, 'g', 'main', false),
('turkish', 'TRK_GOZLEME', 'ING_SPINACH', 100, 'g', 'secondary', true),
('turkish', 'TRK_GOZLEME', 'ING_BUTTER', 30, 'g', 'secondary', false),

-- Kıymalı Gözleme
('turkish', 'TRK_GOZLEME_KIYMALI', 'ING_FLOUR', 200, 'g', 'main', false),
('turkish', 'TRK_GOZLEME_KIYMALI', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_GOZLEME_KIYMALI', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_GOZLEME_KIYMALI', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_GOZLEME_KIYMALI', 'ING_BUTTER', 30, 'g', 'secondary', false),

-- Saray Böreği
('turkish', 'TRK_SARAY_BOREGI', 'ING_YUFKA', 400, 'g', 'main', false),
('turkish', 'TRK_SARAY_BOREGI', 'ING_BEEF', 200, 'g', 'main', false),
('turkish', 'TRK_SARAY_BOREGI', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_SARAY_BOREGI', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_SARAY_BOREGI', 'ING_EGG', 3, 'pieces', 'secondary', false),
('turkish', 'TRK_SARAY_BOREGI', 'ING_BUTTER', 100, 'g', 'secondary', false),
('turkish', 'TRK_SARAY_BOREGI', 'ING_MILK', 100, 'ml', 'secondary', false);

-- SOUPS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Mercimek Çorbası
('turkish', 'TRK_MERCIMEK_CORBASI', 'ING_RED_LENTILS', 200, 'g', 'main', false),
('turkish', 'TRK_MERCIMEK_CORBASI', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_MERCIMEK_CORBASI', 'ING_CARROT', 50, 'g', 'secondary', false),
('turkish', 'TRK_MERCIMEK_CORBASI', 'ING_POTATO', 50, 'g', 'secondary', false),
('turkish', 'TRK_MERCIMEK_CORBASI', 'ING_CUMIN', 3, 'g', 'secondary', false),
('turkish', 'TRK_MERCIMEK_CORBASI', 'ING_BUTTER', 20, 'g', 'secondary', false),
('turkish', 'TRK_MERCIMEK_CORBASI', 'ING_LEMON', 1, 'pieces', 'secondary', true),

-- Ezogelin Çorbası
('turkish', 'TRK_EZOGELIN_CORBASI', 'ING_RED_LENTILS', 150, 'g', 'main', false),
('turkish', 'TRK_EZOGELIN_CORBASI', 'ING_BULGUR_FINE', 50, 'g', 'secondary', false),
('turkish', 'TRK_EZOGELIN_CORBASI', 'ING_RICE', 30, 'g', 'secondary', false),
('turkish', 'TRK_EZOGELIN_CORBASI', 'ING_DOMATES_SALCASI', 30, 'g', 'secondary', false),
('turkish', 'TRK_EZOGELIN_CORBASI', 'ING_BIBER_SALCASI', 15, 'g', 'secondary', false),
('turkish', 'TRK_EZOGELIN_CORBASI', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_EZOGELIN_CORBASI', 'ING_MINT', 5, 'g', 'secondary', false),
('turkish', 'TRK_EZOGELIN_CORBASI', 'ING_PUL_BIBER', 3, 'g', 'secondary', false),

-- İşkembe Çorbası
('turkish', 'TRK_ISKEMBE_CORBASI', 'ING_ISKEMBE', 400, 'g', 'main', false),
('turkish', 'TRK_ISKEMBE_CORBASI', 'ING_FLOUR', 30, 'g', 'secondary', false),
('turkish', 'TRK_ISKEMBE_CORBASI', 'ING_EGG_YOLK', 2, 'pieces', 'secondary', false),
('turkish', 'TRK_ISKEMBE_CORBASI', 'ING_LEMON_JUICE', 30, 'ml', 'secondary', false),
('turkish', 'TRK_ISKEMBE_CORBASI', 'ING_GARLIC', 20, 'g', 'secondary', false),
('turkish', 'TRK_ISKEMBE_CORBASI', 'ING_VINEGAR', 30, 'ml', 'secondary', false),

-- Yayla Çorbası
('turkish', 'TRK_YAYLA_CORBASI', 'ING_YOGURT', 300, 'g', 'main', false),
('turkish', 'TRK_YAYLA_CORBASI', 'ING_RICE', 50, 'g', 'main', false),
('turkish', 'TRK_YAYLA_CORBASI', 'ING_EGG', 1, 'pieces', 'secondary', false),
('turkish', 'TRK_YAYLA_CORBASI', 'ING_FLOUR', 20, 'g', 'secondary', false),
('turkish', 'TRK_YAYLA_CORBASI', 'ING_MINT', 10, 'g', 'secondary', false),
('turkish', 'TRK_YAYLA_CORBASI', 'ING_BUTTER', 20, 'g', 'secondary', false),

-- Tarhana Çorbası
('turkish', 'TRK_TARHANA_CORBASI', 'ING_TARHANA', 100, 'g', 'main', false),
('turkish', 'TRK_TARHANA_CORBASI', 'ING_DOMATES_SALCASI', 20, 'g', 'secondary', false),
('turkish', 'TRK_TARHANA_CORBASI', 'ING_BUTTER', 30, 'g', 'secondary', false),
('turkish', 'TRK_TARHANA_CORBASI', 'ING_MINT', 5, 'g', 'secondary', true),

-- Tavuk Suyu Çorbası
('turkish', 'TRK_TAVUK_SUYU', 'ING_CHICKEN', 200, 'g', 'main', false),
('turkish', 'TRK_TAVUK_SUYU', 'ING_VERMICELLI', 50, 'g', 'secondary', false),
('turkish', 'TRK_TAVUK_SUYU', 'ING_CARROT', 50, 'g', 'secondary', false),
('turkish', 'TRK_TAVUK_SUYU', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_TAVUK_SUYU', 'ING_LEMON_JUICE', 15, 'ml', 'secondary', true),

-- Domates Çorbası
('turkish', 'TRK_DOMATES_CORBASI', 'ING_TOMATO', 400, 'g', 'main', false),
('turkish', 'TRK_DOMATES_CORBASI', 'ING_RICE', 30, 'g', 'secondary', false),
('turkish', 'TRK_DOMATES_CORBASI', 'ING_BUTTER', 30, 'g', 'secondary', false),
('turkish', 'TRK_DOMATES_CORBASI', 'ING_CREAM', 50, 'ml', 'secondary', true),
('turkish', 'TRK_DOMATES_CORBASI', 'ING_ONION', 50, 'g', 'secondary', false),

-- Şehriye Çorbası
('turkish', 'TRK_SEHRIYE_CORBASI', 'ING_VERMICELLI', 80, 'g', 'main', false),
('turkish', 'TRK_SEHRIYE_CORBASI', 'ING_BUTTER', 20, 'g', 'secondary', false),
('turkish', 'TRK_SEHRIYE_CORBASI', 'ING_DOMATES_SALCASI', 15, 'g', 'secondary', true),

-- Kelle Paça Çorbası
('turkish', 'TRK_KELLE_PACA', 'ING_LAMB', 500, 'g', 'main', false),
('turkish', 'TRK_KELLE_PACA', 'ING_GARLIC', 30, 'g', 'secondary', false),
('turkish', 'TRK_KELLE_PACA', 'ING_VINEGAR', 30, 'ml', 'secondary', false),
('turkish', 'TRK_KELLE_PACA', 'ING_FLOUR', 20, 'g', 'secondary', false),

-- Beyran Çorbası
('turkish', 'TRK_BEYRAN', 'ING_LAMB', 300, 'g', 'main', false),
('turkish', 'TRK_BEYRAN', 'ING_RICE', 80, 'g', 'main', false),
('turkish', 'TRK_BEYRAN', 'ING_GARLIC', 20, 'g', 'secondary', false),
('turkish', 'TRK_BEYRAN', 'ING_PUL_BIBER', 10, 'g', 'secondary', false),
('turkish', 'TRK_BEYRAN', 'ING_ISOT_BIBER', 5, 'g', 'secondary', false),
('turkish', 'TRK_BEYRAN', 'ING_BUTTER', 30, 'g', 'secondary', false);

-- RICE & PILAV
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Tereyağlı Pilav
('turkish', 'TRK_PILAV', 'ING_RICE', 200, 'g', 'main', false),
('turkish', 'TRK_PILAV', 'ING_BUTTER', 50, 'g', 'main', false),
('turkish', 'TRK_PILAV', 'ING_CHICKEN_STOCK', 400, 'ml', 'secondary', false),

-- İç Pilav
('turkish', 'TRK_IC_PILAV', 'ING_RICE', 200, 'g', 'main', false),
('turkish', 'TRK_IC_PILAV', 'ING_CIGER', 100, 'g', 'main', false),
('turkish', 'TRK_IC_PILAV', 'ING_PINE_NUTS', 30, 'g', 'secondary', false),
('turkish', 'TRK_IC_PILAV', 'ING_CURRANTS', 30, 'g', 'secondary', false),
('turkish', 'TRK_IC_PILAV', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_IC_PILAV', 'ING_ALLSPICE', 2, 'g', 'secondary', false),
('turkish', 'TRK_IC_PILAV', 'ING_CINNAMON', 1, 'g', 'secondary', false),
('turkish', 'TRK_IC_PILAV', 'ING_BUTTER', 40, 'g', 'secondary', false),

-- Nohutlu Pilav
('turkish', 'TRK_NOHUTLU_PILAV', 'ING_RICE', 200, 'g', 'main', false),
('turkish', 'TRK_NOHUTLU_PILAV', 'ING_CHICKPEAS', 150, 'g', 'main', false),
('turkish', 'TRK_NOHUTLU_PILAV', 'ING_BUTTER', 30, 'g', 'secondary', false),
('turkish', 'TRK_NOHUTLU_PILAV', 'ING_CHICKEN_STOCK', 400, 'ml', 'secondary', false),

-- Tavuklu Pilav
('turkish', 'TRK_TAVUKLU_PILAV', 'ING_RICE', 200, 'g', 'main', false),
('turkish', 'TRK_TAVUKLU_PILAV', 'ING_CHICKEN', 250, 'g', 'main', false),
('turkish', 'TRK_TAVUKLU_PILAV', 'ING_BUTTER', 30, 'g', 'secondary', false),
('turkish', 'TRK_TAVUKLU_PILAV', 'ING_CHICKEN_STOCK', 400, 'ml', 'secondary', false),

-- Bulgur Pilavı
('turkish', 'TRK_BULGUR_PILAVI', 'ING_BULGUR_FINE', 200, 'g', 'main', false),
('turkish', 'TRK_BULGUR_PILAVI', 'ING_DOMATES_SALCASI', 30, 'g', 'secondary', false),
('turkish', 'TRK_BULGUR_PILAVI', 'ING_BIBER_SALCASI', 15, 'g', 'secondary', false),
('turkish', 'TRK_BULGUR_PILAVI', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_BULGUR_PILAVI', 'ING_BUTTER', 30, 'g', 'secondary', false),

-- Domatesli Pilav
('turkish', 'TRK_DOMATESLI_PILAV', 'ING_RICE', 200, 'g', 'main', false),
('turkish', 'TRK_DOMATESLI_PILAV', 'ING_TOMATO', 150, 'g', 'main', false),
('turkish', 'TRK_DOMATESLI_PILAV', 'ING_BUTTER', 40, 'g', 'secondary', false),
('turkish', 'TRK_DOMATESLI_PILAV', 'ING_ONION', 30, 'g', 'secondary', false),

-- Şehriyeli Pilav
('turkish', 'TRK_SEHRIYELI_PILAV', 'ING_RICE', 180, 'g', 'main', false),
('turkish', 'TRK_SEHRIYELI_PILAV', 'ING_VERMICELLI', 50, 'g', 'main', false),
('turkish', 'TRK_SEHRIYELI_PILAV', 'ING_BUTTER', 40, 'g', 'secondary', false),
('turkish', 'TRK_SEHRIYELI_PILAV', 'ING_CHICKEN_STOCK', 400, 'ml', 'secondary', false),

-- Firikli Pilav
('turkish', 'TRK_FIRIKLI_PILAV', 'ING_FREEKEH', 200, 'g', 'main', false),
('turkish', 'TRK_FIRIKLI_PILAV', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_FIRIKLI_PILAV', 'ING_BUTTER', 30, 'g', 'secondary', false),
('turkish', 'TRK_FIRIKLI_PILAV', 'ING_CHICKEN_STOCK', 400, 'ml', 'secondary', false);

-- DOLMA & SARMA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Yaprak Sarma
('turkish', 'TRK_YAPRAK_SARMA', 'ING_GRAPE_LEAVES', 200, 'g', 'main', false),
('turkish', 'TRK_YAPRAK_SARMA', 'ING_RICE', 150, 'g', 'main', false),
('turkish', 'TRK_YAPRAK_SARMA', 'ING_ONION', 100, 'g', 'secondary', false),
('turkish', 'TRK_YAPRAK_SARMA', 'ING_PINE_NUTS', 30, 'g', 'secondary', false),
('turkish', 'TRK_YAPRAK_SARMA', 'ING_CURRANTS', 30, 'g', 'secondary', false),
('turkish', 'TRK_YAPRAK_SARMA', 'ING_OLIVE_OIL', 80, 'ml', 'secondary', false),
('turkish', 'TRK_YAPRAK_SARMA', 'ING_MINT', 10, 'g', 'secondary', false),
('turkish', 'TRK_YAPRAK_SARMA', 'ING_DILL', 10, 'g', 'secondary', false),
('turkish', 'TRK_YAPRAK_SARMA', 'ING_LEMON_JUICE', 30, 'ml', 'secondary', false),

-- Etli Yaprak Sarma
('turkish', 'TRK_ETLI_YAPRAK_SARMA', 'ING_GRAPE_LEAVES', 200, 'g', 'main', false),
('turkish', 'TRK_ETLI_YAPRAK_SARMA', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_ETLI_YAPRAK_SARMA', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_ETLI_YAPRAK_SARMA', 'ING_RICE', 100, 'g', 'secondary', false),
('turkish', 'TRK_ETLI_YAPRAK_SARMA', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_ETLI_YAPRAK_SARMA', 'ING_DOMATES_SALCASI', 30, 'g', 'secondary', false),
('turkish', 'TRK_ETLI_YAPRAK_SARMA', 'ING_YOGURT', 100, 'g', 'secondary', true),

-- Biber Dolması
('turkish', 'TRK_BIBER_DOLMA', 'ING_BELL_PEPPER', 400, 'g', 'main', false),
('turkish', 'TRK_BIBER_DOLMA', 'ING_RICE', 150, 'g', 'main', false),
('turkish', 'TRK_BIBER_DOLMA', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_BIBER_DOLMA', 'ING_TOMATO', 80, 'g', 'secondary', false),
('turkish', 'TRK_BIBER_DOLMA', 'ING_OLIVE_OIL', 60, 'ml', 'secondary', false),
('turkish', 'TRK_BIBER_DOLMA', 'ING_PARSLEY', 20, 'g', 'secondary', false),
('turkish', 'TRK_BIBER_DOLMA', 'ING_MINT', 10, 'g', 'secondary', false),

-- Domates Dolması
('turkish', 'TRK_DOMATES_DOLMA', 'ING_TOMATO', 500, 'g', 'main', false),
('turkish', 'TRK_DOMATES_DOLMA', 'ING_RICE', 150, 'g', 'main', false),
('turkish', 'TRK_DOMATES_DOLMA', 'ING_ONION', 60, 'g', 'secondary', false),
('turkish', 'TRK_DOMATES_DOLMA', 'ING_OLIVE_OIL', 60, 'ml', 'secondary', false),
('turkish', 'TRK_DOMATES_DOLMA', 'ING_PARSLEY', 20, 'g', 'secondary', false),

-- Kabak Dolması
('turkish', 'TRK_KABAK_DOLMA', 'ING_ZUCCHINI', 400, 'g', 'main', false),
('turkish', 'TRK_KABAK_DOLMA', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_KABAK_DOLMA', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_KABAK_DOLMA', 'ING_RICE', 100, 'g', 'secondary', false),
('turkish', 'TRK_KABAK_DOLMA', 'ING_ONION', 60, 'g', 'secondary', false),
('turkish', 'TRK_KABAK_DOLMA', 'ING_YOGURT', 100, 'g', 'secondary', false),

-- Patlıcan Dolması
('turkish', 'TRK_PATLICAN_DOLMA', 'ING_EGGPLANT', 400, 'g', 'main', false),
('turkish', 'TRK_PATLICAN_DOLMA', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_PATLICAN_DOLMA', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_PATLICAN_DOLMA', 'ING_RICE', 80, 'g', 'secondary', false),
('turkish', 'TRK_PATLICAN_DOLMA', 'ING_ONION', 60, 'g', 'secondary', false),
('turkish', 'TRK_PATLICAN_DOLMA', 'ING_TOMATO', 80, 'g', 'secondary', false),

-- Lahana Sarması
('turkish', 'TRK_LAHANA_SARMASI', 'ING_CABBAGE', 400, 'g', 'main', false),
('turkish', 'TRK_LAHANA_SARMASI', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_LAHANA_SARMASI', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_LAHANA_SARMASI', 'ING_RICE', 100, 'g', 'secondary', false),
('turkish', 'TRK_LAHANA_SARMASI', 'ING_ONION', 60, 'g', 'secondary', false),
('turkish', 'TRK_LAHANA_SARMASI', 'ING_YOGURT', 100, 'g', 'secondary', false),

-- Kuru Dolma
('turkish', 'TRK_KURU_DOLMA', 'ING_BELL_PEPPER', 200, 'g', 'main', false),
('turkish', 'TRK_KURU_DOLMA', 'ING_EGGPLANT', 200, 'g', 'main', false),
('turkish', 'TRK_KURU_DOLMA', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_KURU_DOLMA', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_KURU_DOLMA', 'ING_RICE', 100, 'g', 'secondary', false),
('turkish', 'TRK_KURU_DOLMA', 'ING_ONION', 60, 'g', 'secondary', false),

-- Enginar Dolması
('turkish', 'TRK_ENGINAR_DOLMA', 'ING_ARTICHOKE', 400, 'g', 'main', false),
('turkish', 'TRK_ENGINAR_DOLMA', 'ING_RICE', 150, 'g', 'main', false),
('turkish', 'TRK_ENGINAR_DOLMA', 'ING_ONION', 60, 'g', 'secondary', false),
('turkish', 'TRK_ENGINAR_DOLMA', 'ING_DILL', 20, 'g', 'secondary', false),
('turkish', 'TRK_ENGINAR_DOLMA', 'ING_OLIVE_OIL', 60, 'ml', 'secondary', false),
('turkish', 'TRK_ENGINAR_DOLMA', 'ING_LEMON_JUICE', 30, 'ml', 'secondary', false),

-- Zeytinyağlı Sarma
('turkish', 'TRK_ZEYTINYAGLI_SARMA', 'ING_GRAPE_LEAVES', 200, 'g', 'main', false),
('turkish', 'TRK_ZEYTINYAGLI_SARMA', 'ING_RICE', 150, 'g', 'main', false),
('turkish', 'TRK_ZEYTINYAGLI_SARMA', 'ING_ONION', 100, 'g', 'secondary', false),
('turkish', 'TRK_ZEYTINYAGLI_SARMA', 'ING_PINE_NUTS', 30, 'g', 'secondary', false),
('turkish', 'TRK_ZEYTINYAGLI_SARMA', 'ING_CURRANTS', 30, 'g', 'secondary', false),
('turkish', 'TRK_ZEYTINYAGLI_SARMA', 'ING_OLIVE_OIL', 100, 'ml', 'secondary', false),
('turkish', 'TRK_ZEYTINYAGLI_SARMA', 'ING_LEMON_JUICE', 30, 'ml', 'secondary', false);

-- STEWS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Karnıyarık
('turkish', 'TRK_KARNIYARIK', 'ING_EGGPLANT', 400, 'g', 'main', false),
('turkish', 'TRK_KARNIYARIK', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_KARNIYARIK', 'ING_LAMB', 100, 'g', 'main', false),
('turkish', 'TRK_KARNIYARIK', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_KARNIYARIK', 'ING_TOMATO', 100, 'g', 'secondary', false),
('turkish', 'TRK_KARNIYARIK', 'ING_BELL_PEPPER', 50, 'g', 'secondary', false),
('turkish', 'TRK_KARNIYARIK', 'ING_GARLIC', 10, 'g', 'secondary', false),
('turkish', 'TRK_KARNIYARIK', 'ING_VEGETABLE_OIL', 100, 'ml', 'secondary', false),

-- İmam Bayıldı
('turkish', 'TRK_IMAM_BAYILDI', 'ING_EGGPLANT', 400, 'g', 'main', false),
('turkish', 'TRK_IMAM_BAYILDI', 'ING_ONION', 150, 'g', 'main', false),
('turkish', 'TRK_IMAM_BAYILDI', 'ING_TOMATO', 150, 'g', 'secondary', false),
('turkish', 'TRK_IMAM_BAYILDI', 'ING_GARLIC', 20, 'g', 'secondary', false),
('turkish', 'TRK_IMAM_BAYILDI', 'ING_OLIVE_OIL', 150, 'ml', 'secondary', false),
('turkish', 'TRK_IMAM_BAYILDI', 'ING_PARSLEY', 20, 'g', 'secondary', false),

-- Hünkar Beğendi
('turkish', 'TRK_HUNKAR_BEGENDI', 'ING_LAMB', 300, 'g', 'main', false),
('turkish', 'TRK_HUNKAR_BEGENDI', 'ING_EGGPLANT', 400, 'g', 'main', false),
('turkish', 'TRK_HUNKAR_BEGENDI', 'ING_BUTTER', 50, 'g', 'secondary', false),
('turkish', 'TRK_HUNKAR_BEGENDI', 'ING_FLOUR', 30, 'g', 'secondary', false),
('turkish', 'TRK_HUNKAR_BEGENDI', 'ING_MILK', 200, 'ml', 'secondary', false),
('turkish', 'TRK_HUNKAR_BEGENDI', 'ING_KASAR_CHEESE', 50, 'g', 'secondary', false),
('turkish', 'TRK_HUNKAR_BEGENDI', 'ING_TOMATO', 100, 'g', 'secondary', false),

-- Tas Kebabı
('turkish', 'TRK_TAS_KEBABI', 'ING_LAMB', 350, 'g', 'main', false),
('turkish', 'TRK_TAS_KEBABI', 'ING_POTATO', 200, 'g', 'secondary', false),
('turkish', 'TRK_TAS_KEBABI', 'ING_CARROT', 100, 'g', 'secondary', false),
('turkish', 'TRK_TAS_KEBABI', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_TAS_KEBABI', 'ING_TOMATO', 100, 'g', 'secondary', false),
('turkish', 'TRK_TAS_KEBABI', 'ING_DOMATES_SALCASI', 30, 'g', 'secondary', false),

-- Güveç
('turkish', 'TRK_GUVEC', 'ING_BEEF', 150, 'g', 'main', false),
('turkish', 'TRK_GUVEC', 'ING_LAMB', 150, 'g', 'main', false),
('turkish', 'TRK_GUVEC', 'ING_EGGPLANT', 150, 'g', 'secondary', false),
('turkish', 'TRK_GUVEC', 'ING_ZUCCHINI', 100, 'g', 'secondary', false),
('turkish', 'TRK_GUVEC', 'ING_BELL_PEPPER', 80, 'g', 'secondary', false),
('turkish', 'TRK_GUVEC', 'ING_TOMATO', 100, 'g', 'secondary', false),
('turkish', 'TRK_GUVEC', 'ING_ONION', 80, 'g', 'secondary', false),

-- Etli Nohut
('turkish', 'TRK_ETLI_NOHUT', 'ING_LAMB', 250, 'g', 'main', false),
('turkish', 'TRK_ETLI_NOHUT', 'ING_CHICKPEAS', 200, 'g', 'main', false),
('turkish', 'TRK_ETLI_NOHUT', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_ETLI_NOHUT', 'ING_DOMATES_SALCASI', 30, 'g', 'secondary', false),
('turkish', 'TRK_ETLI_NOHUT', 'ING_BUTTER', 30, 'g', 'secondary', false),

-- Kuru Fasulye
('turkish', 'TRK_FASULYE', 'ING_WHITE_BEANS', 300, 'g', 'main', false),
('turkish', 'TRK_FASULYE', 'ING_PASTIRMA', 50, 'g', 'secondary', true),
('turkish', 'TRK_FASULYE', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_FASULYE', 'ING_DOMATES_SALCASI', 40, 'g', 'secondary', false),
('turkish', 'TRK_FASULYE', 'ING_BIBER_SALCASI', 20, 'g', 'secondary', false),
('turkish', 'TRK_FASULYE', 'ING_BUTTER', 30, 'g', 'secondary', false),

-- Türlü
('turkish', 'TRK_TURLU', 'ING_ZUCCHINI', 150, 'g', 'main', false),
('turkish', 'TRK_TURLU', 'ING_EGGPLANT', 150, 'g', 'main', false),
('turkish', 'TRK_TURLU', 'ING_BELL_PEPPER', 100, 'g', 'secondary', false),
('turkish', 'TRK_TURLU', 'ING_TOMATO', 150, 'g', 'secondary', false),
('turkish', 'TRK_TURLU', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_TURLU', 'ING_OLIVE_OIL', 60, 'ml', 'secondary', false),
('turkish', 'TRK_TURLU', 'ING_GARLIC', 10, 'g', 'secondary', false),

-- Saray Sarması
('turkish', 'TRK_SARAY_SARMASI', 'ING_LAMB', 300, 'g', 'main', false),
('turkish', 'TRK_SARAY_SARMASI', 'ING_ONION', 80, 'g', 'secondary', false),
('turkish', 'TRK_SARAY_SARMASI', 'ING_TOMATO', 100, 'g', 'secondary', false),
('turkish', 'TRK_SARAY_SARMASI', 'ING_BELL_PEPPER', 50, 'g', 'secondary', false),

-- Orman Kebabı
('turkish', 'TRK_ORMAN_KEBABI', 'ING_LAMB', 300, 'g', 'main', false),
('turkish', 'TRK_ORMAN_KEBABI', 'ING_POTATO', 200, 'g', 'secondary', false),
('turkish', 'TRK_ORMAN_KEBABI', 'ING_CARROT', 100, 'g', 'secondary', false),
('turkish', 'TRK_ORMAN_KEBABI', 'ING_GREEN_PEAS', 80, 'g', 'secondary', false),
('turkish', 'TRK_ORMAN_KEBABI', 'ING_ONION', 60, 'g', 'secondary', false),
('turkish', 'TRK_ORMAN_KEBABI', 'ING_BUTTER', 30, 'g', 'secondary', false);

-- SEAFOOD
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Balık Ekmek
('turkish', 'TRK_BALIK_EKMEK', 'ING_MACKEREL', 200, 'g', 'main', false),
('turkish', 'TRK_BALIK_EKMEK', 'ING_BREAD', 150, 'g', 'secondary', false),
('turkish', 'TRK_BALIK_EKMEK', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_BALIK_EKMEK', 'ING_LETTUCE', 30, 'g', 'secondary', false),
('turkish', 'TRK_BALIK_EKMEK', 'ING_LEMON', 1, 'pieces', 'secondary', false),

-- Levrek Izgara
('turkish', 'TRK_LEVREK_IZGARA', 'ING_LEVREK', 350, 'g', 'main', false),
('turkish', 'TRK_LEVREK_IZGARA', 'ING_OLIVE_OIL', 30, 'ml', 'secondary', false),
('turkish', 'TRK_LEVREK_IZGARA', 'ING_LEMON', 1, 'pieces', 'secondary', false),
('turkish', 'TRK_LEVREK_IZGARA', 'ING_PARSLEY', 10, 'g', 'secondary', true),

-- Çipura Izgara
('turkish', 'TRK_CIUPRA_IZGARA', 'ING_CIUPRA', 350, 'g', 'main', false),
('turkish', 'TRK_CIUPRA_IZGARA', 'ING_OLIVE_OIL', 30, 'ml', 'secondary', false),
('turkish', 'TRK_CIUPRA_IZGARA', 'ING_LEMON', 1, 'pieces', 'secondary', false),
('turkish', 'TRK_CIUPRA_IZGARA', 'ING_ARUGULA', 50, 'g', 'secondary', true),

-- Hamsi Tava
('turkish', 'TRK_HAMSI_TAVA', 'ING_HAMSI', 300, 'g', 'main', false),
('turkish', 'TRK_HAMSI_TAVA', 'ING_CORNMEAL', 100, 'g', 'secondary', false),
('turkish', 'TRK_HAMSI_TAVA', 'ING_VEGETABLE_OIL', 150, 'ml', 'secondary', false),
('turkish', 'TRK_HAMSI_TAVA', 'ING_LEMON', 1, 'pieces', 'secondary', false),

-- Karides Güveç
('turkish', 'TRK_KARIDES_GUVEC', 'ING_KARIDES', 250, 'g', 'main', false),
('turkish', 'TRK_KARIDES_GUVEC', 'ING_TOMATO', 150, 'g', 'secondary', false),
('turkish', 'TRK_KARIDES_GUVEC', 'ING_BELL_PEPPER', 80, 'g', 'secondary', false),
('turkish', 'TRK_KARIDES_GUVEC', 'ING_KASAR_CHEESE', 80, 'g', 'secondary', false),
('turkish', 'TRK_KARIDES_GUVEC', 'ING_GARLIC', 10, 'g', 'secondary', false),
('turkish', 'TRK_KARIDES_GUVEC', 'ING_BUTTER', 30, 'g', 'secondary', false),

-- Lüfer Izgara
('turkish', 'TRK_LUFER_IZGARA', 'ING_LUFER', 350, 'g', 'main', false),
('turkish', 'TRK_LUFER_IZGARA', 'ING_OLIVE_OIL', 30, 'ml', 'secondary', false),
('turkish', 'TRK_LUFER_IZGARA', 'ING_LEMON', 1, 'pieces', 'secondary', false),

-- Kalamar Tava
('turkish', 'TRK_KALAMAR_TAVA', 'ING_SQUID', 300, 'g', 'main', false),
('turkish', 'TRK_KALAMAR_TAVA', 'ING_FLOUR', 100, 'g', 'secondary', false),
('turkish', 'TRK_KALAMAR_TAVA', 'ING_VEGETABLE_OIL', 200, 'ml', 'secondary', false),
('turkish', 'TRK_KALAMAR_TAVA', 'ING_LEMON', 1, 'pieces', 'secondary', false),
('turkish', 'TRK_KALAMAR_TAVA', 'ING_TAHINI', 30, 'g', 'secondary', true),

-- Balık Buğlama
('turkish', 'TRK_BALIK_BUGLAMA', 'ING_FISH_FILLET', 300, 'g', 'main', false),
('turkish', 'TRK_BALIK_BUGLAMA', 'ING_TOMATO', 100, 'g', 'secondary', false),
('turkish', 'TRK_BALIK_BUGLAMA', 'ING_BELL_PEPPER', 80, 'g', 'secondary', false),
('turkish', 'TRK_BALIK_BUGLAMA', 'ING_POTATO', 100, 'g', 'secondary', false),
('turkish', 'TRK_BALIK_BUGLAMA', 'ING_ONION', 50, 'g', 'secondary', false),
('turkish', 'TRK_BALIK_BUGLAMA', 'ING_OLIVE_OIL', 30, 'ml', 'secondary', false),

-- Ahtapot Izgara
('turkish', 'TRK_AHTAPOT_IZGARA', 'ING_AHTAPOT', 300, 'g', 'main', false),
('turkish', 'TRK_AHTAPOT_IZGARA', 'ING_OLIVE_OIL', 40, 'ml', 'secondary', false),
('turkish', 'TRK_AHTAPOT_IZGARA', 'ING_LEMON', 1, 'pieces', 'secondary', false),
('turkish', 'TRK_AHTAPOT_IZGARA', 'ING_GARLIC', 5, 'g', 'secondary', true),

-- Midye Tava
('turkish', 'TRK_MIDYE_TAVA', 'ING_MIDYE', 300, 'g', 'main', false),
('turkish', 'TRK_MIDYE_TAVA', 'ING_FLOUR', 80, 'g', 'secondary', false),
('turkish', 'TRK_MIDYE_TAVA', 'ING_VEGETABLE_OIL', 150, 'ml', 'secondary', false),
('turkish', 'TRK_MIDYE_TAVA', 'ING_TAHINI', 30, 'g', 'secondary', false),
('turkish', 'TRK_MIDYE_TAVA', 'ING_GARLIC', 10, 'g', 'secondary', false),
('turkish', 'TRK_MIDYE_TAVA', 'ING_CEVIZ', 20, 'g', 'secondary', true);

-- DESSERTS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
-- Baklava
('turkish', 'TRK_BAKLAVA', 'ING_YUFKA', 500, 'g', 'main', false),
('turkish', 'TRK_BAKLAVA', 'ING_ANTEP_FISTIK', 200, 'g', 'main', false),
('turkish', 'TRK_BAKLAVA', 'ING_BUTTER', 250, 'g', 'secondary', false),
('turkish', 'TRK_BAKLAVA', 'ING_SUGAR', 300, 'g', 'secondary', false),
('turkish', 'TRK_BAKLAVA', 'ING_LEMON_JUICE', 15, 'ml', 'secondary', false),

-- Künefe
('turkish', 'TRK_KUNEFE', 'ING_YUFKA', 300, 'g', 'main', false),
('turkish', 'TRK_KUNEFE', 'ING_MOZZARELLA', 200, 'g', 'main', false),
('turkish', 'TRK_KUNEFE', 'ING_BUTTER', 150, 'g', 'secondary', false),
('turkish', 'TRK_KUNEFE', 'ING_SUGAR', 200, 'g', 'secondary', false),
('turkish', 'TRK_KUNEFE', 'ING_ANTEP_FISTIK', 30, 'g', 'secondary', false),

-- Lokum
('turkish', 'TRK_LOKUM', 'ING_SUGAR', 400, 'g', 'main', false),
('turkish', 'TRK_LOKUM', 'ING_CORNSTARCH', 100, 'g', 'main', false),
('turkish', 'TRK_LOKUM', 'ING_ROSE_WATER', 20, 'ml', 'secondary', false),
('turkish', 'TRK_LOKUM', 'ING_ANTEP_FISTIK', 50, 'g', 'secondary', true),
('turkish', 'TRK_LOKUM', 'ING_LEMON_JUICE', 10, 'ml', 'secondary', false),

-- Sütlaç
('turkish', 'TRK_SUTLAC', 'ING_MILK', 500, 'ml', 'main', false),
('turkish', 'TRK_SUTLAC', 'ING_RICE', 80, 'g', 'main', false),
('turkish', 'TRK_SUTLAC', 'ING_SUGAR', 150, 'g', 'secondary', false),
('turkish', 'TRK_SUTLAC', 'ING_CORNSTARCH', 20, 'g', 'secondary', false),
('turkish', 'TRK_SUTLAC', 'ING_VANILLA', 5, 'ml', 'secondary', false),

-- Kazandibi
('turkish', 'TRK_KAZANDIBI', 'ING_MILK', 500, 'ml', 'main', false),
('turkish', 'TRK_KAZANDIBI', 'ING_SUGAR', 150, 'g', 'secondary', false),
('turkish', 'TRK_KAZANDIBI', 'ING_CORNSTARCH', 50, 'g', 'secondary', false),
('turkish', 'TRK_KAZANDIBI', 'ING_RICE_FLOUR', 30, 'g', 'secondary', false),
('turkish', 'TRK_KAZANDIBI', 'ING_BUTTER', 30, 'g', 'secondary', false),

-- Aşure
('turkish', 'TRK_ASURE', 'ING_WHEAT_BERRIES', 100, 'g', 'main', false),
('turkish', 'TRK_ASURE', 'ING_CHICKPEAS', 50, 'g', 'secondary', false),
('turkish', 'TRK_ASURE', 'ING_WHITE_BEANS', 50, 'g', 'secondary', false),
('turkish', 'TRK_ASURE', 'ING_RICE', 30, 'g', 'secondary', false),
('turkish', 'TRK_ASURE', 'ING_SUGAR', 200, 'g', 'secondary', false),
('turkish', 'TRK_ASURE', 'ING_CEVIZ', 30, 'g', 'secondary', false),
('turkish', 'TRK_ASURE', 'ING_FINDIK', 20, 'g', 'secondary', false),
('turkish', 'TRK_ASURE', 'ING_CURRANTS', 30, 'g', 'secondary', false),
('turkish', 'TRK_ASURE', 'ING_DRIED_APRICOTS', 30, 'g', 'secondary', false),
('turkish', 'TRK_ASURE', 'ING_ROSE_WATER', 10, 'ml', 'secondary', false),

-- Revani
('turkish', 'TRK_REVANI', 'ING_SEMOLINA', 200, 'g', 'main', false),
('turkish', 'TRK_REVANI', 'ING_SUGAR', 200, 'g', 'secondary', false),
('turkish', 'TRK_REVANI', 'ING_EGG', 3, 'pieces', 'secondary', false),
('turkish', 'TRK_REVANI', 'ING_YOGURT', 100, 'g', 'secondary', false),
('turkish', 'TRK_REVANI', 'ING_BUTTER', 50, 'g', 'secondary', false),
('turkish', 'TRK_REVANI', 'ING_LEMON_JUICE', 20, 'ml', 'secondary', false),

-- Şekerpare
('turkish', 'TRK_SEKERPARE', 'ING_FLOUR', 250, 'g', 'main', false),
('turkish', 'TRK_SEKERPARE', 'ING_SEMOLINA', 100, 'g', 'secondary', false),
('turkish', 'TRK_SEKERPARE', 'ING_BUTTER', 150, 'g', 'secondary', false),
('turkish', 'TRK_SEKERPARE', 'ING_SUGAR', 250, 'g', 'secondary', false),
('turkish', 'TRK_SEKERPARE', 'ING_EGG', 2, 'pieces', 'secondary', false),
('turkish', 'TRK_SEKERPARE', 'ING_FINDIK', 30, 'g', 'secondary', false),

-- Maraş Dondurması
('turkish', 'TRK_DONDURMA', 'ING_MILK', 500, 'ml', 'main', false),
('turkish', 'TRK_DONDURMA', 'ING_SUGAR', 150, 'g', 'secondary', false),
('turkish', 'TRK_DONDURMA', 'ING_SALEP', 15, 'g', 'main', false),
('turkish', 'TRK_DONDURMA', 'ING_MASTIC', 3, 'g', 'main', false),
('turkish', 'TRK_DONDURMA', 'ING_CREAM', 100, 'ml', 'secondary', false),

-- Tavuk Göğsü
('turkish', 'TRK_TAVUK_GOGSU', 'ING_CHICKEN_BREAST', 100, 'g', 'main', false),
('turkish', 'TRK_TAVUK_GOGSU', 'ING_MILK', 500, 'ml', 'main', false),
('turkish', 'TRK_TAVUK_GOGSU', 'ING_SUGAR', 150, 'g', 'secondary', false),
('turkish', 'TRK_TAVUK_GOGSU', 'ING_CORNSTARCH', 50, 'g', 'secondary', false),
('turkish', 'TRK_TAVUK_GOGSU', 'ING_RICE_FLOUR', 30, 'g', 'secondary', false),
('turkish', 'TRK_TAVUK_GOGSU', 'ING_CINNAMON', 2, 'g', 'secondary', true),

-- Tel Kadayıf
('turkish', 'TRK_KADAYIF', 'ING_YUFKA', 400, 'g', 'main', false),
('turkish', 'TRK_KADAYIF', 'ING_CEVIZ', 150, 'g', 'main', false),
('turkish', 'TRK_KADAYIF', 'ING_BUTTER', 150, 'g', 'secondary', false),
('turkish', 'TRK_KADAYIF', 'ING_SUGAR', 300, 'g', 'secondary', false),
('turkish', 'TRK_KADAYIF', 'ING_LEMON_JUICE', 15, 'ml', 'secondary', false),

-- Muhallebi
('turkish', 'TRK_MUHALLEBI', 'ING_MILK', 500, 'ml', 'main', false),
('turkish', 'TRK_MUHALLEBI', 'ING_SUGAR', 100, 'g', 'secondary', false),
('turkish', 'TRK_MUHALLEBI', 'ING_CORNSTARCH', 50, 'g', 'secondary', false),
('turkish', 'TRK_MUHALLEBI', 'ING_RICE_FLOUR', 20, 'g', 'secondary', false),
('turkish', 'TRK_MUHALLEBI', 'ING_ROSE_WATER', 10, 'ml', 'secondary', true),
('turkish', 'TRK_MUHALLEBI', 'ING_CINNAMON', 2, 'g', 'secondary', false);

-- Summary
DO $$
DECLARE
  pi_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO pi_count FROM product_ingredients WHERE product_type = 'turkish';
  RAISE NOTICE 'Turkish product_ingredients created successfully!';
  RAISE NOTICE 'Total links: %', pi_count;
END $$;
