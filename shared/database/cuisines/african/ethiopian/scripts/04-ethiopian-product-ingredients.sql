-- ============================================
-- ETHIOPIAN CUISINE - Product Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================
-- Junction table linking Ethiopian dishes to ingredients
-- Total: ~220 links for 45 products

INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES

-- ============================================
-- STEWS (Wat/Wot)
-- ============================================
-- Doro Wat (chicken stew)
('ethiopian', 'ETH_DORO_WAT', 'ING_CHICKEN'),
('ethiopian', 'ETH_DORO_WAT', 'ING_ONION'),
('ethiopian', 'ETH_DORO_WAT', 'ING_BERBERE'),
('ethiopian', 'ETH_DORO_WAT', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_DORO_WAT', 'ING_GARLIC'),
('ethiopian', 'ETH_DORO_WAT', 'ING_GINGER'),
('ethiopian', 'ETH_DORO_WAT', 'ING_EGG'),
('ethiopian', 'ETH_DORO_WAT', 'ING_INJERA'),

-- Siga Wat (beef stew)
('ethiopian', 'ETH_SIGA_WAT', 'ING_BEEF'),
('ethiopian', 'ETH_SIGA_WAT', 'ING_ONION'),
('ethiopian', 'ETH_SIGA_WAT', 'ING_BERBERE'),
('ethiopian', 'ETH_SIGA_WAT', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_SIGA_WAT', 'ING_GARLIC'),
('ethiopian', 'ETH_SIGA_WAT', 'ING_GINGER'),

-- Key Wat (red stew)
('ethiopian', 'ETH_KEY_WAT', 'ING_BEEF'),
('ethiopian', 'ETH_KEY_WAT', 'ING_ONION'),
('ethiopian', 'ETH_KEY_WAT', 'ING_BERBERE'),
('ethiopian', 'ETH_KEY_WAT', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_KEY_WAT', 'ING_GARLIC'),

-- Alicha Wat (mild yellow stew)
('ethiopian', 'ETH_ALICHA_WAT', 'ING_CHICKEN'),
('ethiopian', 'ETH_ALICHA_WAT', 'ING_ONION'),
('ethiopian', 'ETH_ALICHA_WAT', 'ING_TURMERIC'),
('ethiopian', 'ETH_ALICHA_WAT', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_ALICHA_WAT', 'ING_GINGER'),
('ethiopian', 'ETH_ALICHA_WAT', 'ING_GARLIC'),

-- Ye Bure Wat (lamb stew)
('ethiopian', 'ETH_YE_BURE_WAT', 'ING_LAMB'),
('ethiopian', 'ETH_YE_BURE_WAT', 'ING_ONION'),
('ethiopian', 'ETH_YE_BURE_WAT', 'ING_BERBERE'),
('ethiopian', 'ETH_YE_BURE_WAT', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_YE_BURE_WAT', 'ING_GARLIC'),

-- Doro Alicha (mild chicken)
('ethiopian', 'ETH_DORO_ALICHA', 'ING_CHICKEN'),
('ethiopian', 'ETH_DORO_ALICHA', 'ING_ONION'),
('ethiopian', 'ETH_DORO_ALICHA', 'ING_TURMERIC'),
('ethiopian', 'ETH_DORO_ALICHA', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_DORO_ALICHA', 'ING_GINGER'),

-- Yebeg Wat (spicy lamb)
('ethiopian', 'ETH_YEBEG_WAT', 'ING_LAMB'),
('ethiopian', 'ETH_YEBEG_WAT', 'ING_ONION'),
('ethiopian', 'ETH_YEBEG_WAT', 'ING_BERBERE'),
('ethiopian', 'ETH_YEBEG_WAT', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_YEBEG_WAT', 'ING_GARLIC'),
('ethiopian', 'ETH_YEBEG_WAT', 'ING_GINGER'),

-- Kilwa (organ stew)
('ethiopian', 'ETH_KILWA', 'ING_BEEF_LIVER'),
('ethiopian', 'ETH_KILWA', 'ING_BEEF_TRIPE'),
('ethiopian', 'ETH_KILWA', 'ING_ONION'),
('ethiopian', 'ETH_KILWA', 'ING_BERBERE'),
('ethiopian', 'ETH_KILWA', 'ING_GARLIC'),

-- Siga Alicha (mild beef)
('ethiopian', 'ETH_SIGA_ALICHA', 'ING_BEEF'),
('ethiopian', 'ETH_SIGA_ALICHA', 'ING_ONION'),
('ethiopian', 'ETH_SIGA_ALICHA', 'ING_TURMERIC'),
('ethiopian', 'ETH_SIGA_ALICHA', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_SIGA_ALICHA', 'ING_GARLIC'),

-- Yatakilt Alicha (vegetable stew)
('ethiopian', 'ETH_YATAKILT_ALICHA', 'ING_CABBAGE'),
('ethiopian', 'ETH_YATAKILT_ALICHA', 'ING_CARROT'),
('ethiopian', 'ETH_YATAKILT_ALICHA', 'ING_POTATO'),
('ethiopian', 'ETH_YATAKILT_ALICHA', 'ING_ONION'),
('ethiopian', 'ETH_YATAKILT_ALICHA', 'ING_TURMERIC'),
('ethiopian', 'ETH_YATAKILT_ALICHA', 'ING_GINGER'),

-- Dulet (spiced organs)
('ethiopian', 'ETH_DULET', 'ING_BEEF_LIVER'),
('ethiopian', 'ETH_DULET', 'ING_BEEF_TRIPE'),
('ethiopian', 'ETH_DULET', 'ING_GROUND_BEEF'),
('ethiopian', 'ETH_DULET', 'ING_MITMITA'),
('ethiopian', 'ETH_DULET', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_DULET', 'ING_JALAPENO'),

-- Zilzil Wat (beef strips)
('ethiopian', 'ETH_ZILZIL_WAT', 'ING_BEEF'),
('ethiopian', 'ETH_ZILZIL_WAT', 'ING_ONION'),
('ethiopian', 'ETH_ZILZIL_WAT', 'ING_BERBERE'),
('ethiopian', 'ETH_ZILZIL_WAT', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_ZILZIL_WAT', 'ING_GARLIC'),

-- ============================================
-- RAW MEAT DISHES
-- ============================================
-- Kitfo
('ethiopian', 'ETH_KITFO', 'ING_BEEF'),
('ethiopian', 'ETH_KITFO', 'ING_MITMITA'),
('ethiopian', 'ETH_KITFO', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_KITFO', 'ING_AYIB'),
('ethiopian', 'ETH_KITFO', 'ING_COLLARD_GREENS'),
('ethiopian', 'ETH_KITFO', 'ING_KORERIMA'),

-- Gored Gored
('ethiopian', 'ETH_GORED_GORED', 'ING_BEEF'),
('ethiopian', 'ETH_GORED_GORED', 'ING_AWAZE'),
('ethiopian', 'ETH_GORED_GORED', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_GORED_GORED', 'ING_MITMITA'),

-- Kitfo Lablabi
('ethiopian', 'ETH_KITFO_LABLABI', 'ING_BEEF'),
('ethiopian', 'ETH_KITFO_LABLABI', 'ING_MITMITA'),
('ethiopian', 'ETH_KITFO_LABLABI', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_KITFO_LABLABI', 'ING_AYIB'),

-- Kurt
('ethiopian', 'ETH_KURT', 'ING_BEEF'),
('ethiopian', 'ETH_KURT', 'ING_MITMITA'),
('ethiopian', 'ETH_KURT', 'ING_SALT'),

-- ============================================
-- TIBS (Sautéed/Fried)
-- ============================================
-- Derek Tibs
('ethiopian', 'ETH_DEREK_TIBS', 'ING_BEEF'),
('ethiopian', 'ETH_DEREK_TIBS', 'ING_ONION'),
('ethiopian', 'ETH_DEREK_TIBS', 'ING_JALAPENO'),
('ethiopian', 'ETH_DEREK_TIBS', 'ING_ROSEMARY'),
('ethiopian', 'ETH_DEREK_TIBS', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_DEREK_TIBS', 'ING_GARLIC'),

-- Awaze Tibs
('ethiopian', 'ETH_AWAZE_TIBS', 'ING_BEEF'),
('ethiopian', 'ETH_AWAZE_TIBS', 'ING_ONION'),
('ethiopian', 'ETH_AWAZE_TIBS', 'ING_AWAZE'),
('ethiopian', 'ETH_AWAZE_TIBS', 'ING_BERBERE'),
('ethiopian', 'ETH_AWAZE_TIBS', 'ING_NITER_KIBBEH'),

-- Lamb Tibs
('ethiopian', 'ETH_LAMB_TIBS', 'ING_LAMB'),
('ethiopian', 'ETH_LAMB_TIBS', 'ING_ONION'),
('ethiopian', 'ETH_LAMB_TIBS', 'ING_BELL_PEPPER'),
('ethiopian', 'ETH_LAMB_TIBS', 'ING_GARLIC'),
('ethiopian', 'ETH_LAMB_TIBS', 'ING_NITER_KIBBEH'),

-- Doro Tibs (chicken)
('ethiopian', 'ETH_DORO_TIBS', 'ING_CHICKEN'),
('ethiopian', 'ETH_DORO_TIBS', 'ING_ONION'),
('ethiopian', 'ETH_DORO_TIBS', 'ING_GARLIC'),
('ethiopian', 'ETH_DORO_TIBS', 'ING_GINGER'),
('ethiopian', 'ETH_DORO_TIBS', 'ING_NITER_KIBBEH'),

-- Shekla Tibs (clay pot)
('ethiopian', 'ETH_SHEKLA_TIBS', 'ING_BEEF'),
('ethiopian', 'ETH_SHEKLA_TIBS', 'ING_ONION'),
('ethiopian', 'ETH_SHEKLA_TIBS', 'ING_TOMATO'),
('ethiopian', 'ETH_SHEKLA_TIBS', 'ING_JALAPENO'),
('ethiopian', 'ETH_SHEKLA_TIBS', 'ING_ROSEMARY'),
('ethiopian', 'ETH_SHEKLA_TIBS', 'ING_NITER_KIBBEH'),

-- Goden Tibs (ribs)
('ethiopian', 'ETH_GODEN_TIBS', 'ING_BEEF_RIBS'),
('ethiopian', 'ETH_GODEN_TIBS', 'ING_ONION'),
('ethiopian', 'ETH_GODEN_TIBS', 'ING_GARLIC'),
('ethiopian', 'ETH_GODEN_TIBS', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_GODEN_TIBS', 'ING_BERBERE'),

-- Goat Tibs
('ethiopian', 'ETH_GOAT_TIBS', 'ING_GOAT'),
('ethiopian', 'ETH_GOAT_TIBS', 'ING_ONION'),
('ethiopian', 'ETH_GOAT_TIBS', 'ING_GARLIC'),
('ethiopian', 'ETH_GOAT_TIBS', 'ING_GINGER'),
('ethiopian', 'ETH_GOAT_TIBS', 'ING_NITER_KIBBEH'),

-- Quanta Fir Fir
('ethiopian', 'ETH_QUANTA_FIR_FIR', 'ING_BEEF'),
('ethiopian', 'ETH_QUANTA_FIR_FIR', 'ING_INJERA'),
('ethiopian', 'ETH_QUANTA_FIR_FIR', 'ING_BERBERE'),
('ethiopian', 'ETH_QUANTA_FIR_FIR', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_QUANTA_FIR_FIR', 'ING_ONION'),

-- ============================================
-- VEGETARIAN/FASTING DISHES
-- ============================================
-- Shiro
('ethiopian', 'ETH_SHIRO', 'ING_CHICKPEA'),
('ethiopian', 'ETH_SHIRO', 'ING_ONION'),
('ethiopian', 'ETH_SHIRO', 'ING_GARLIC'),
('ethiopian', 'ETH_SHIRO', 'ING_BERBERE'),
('ethiopian', 'ETH_SHIRO', 'ING_NITER_KIBBEH'),

-- Misir Wat
('ethiopian', 'ETH_MISIR_WAT', 'ING_RED_LENTILS'),
('ethiopian', 'ETH_MISIR_WAT', 'ING_ONION'),
('ethiopian', 'ETH_MISIR_WAT', 'ING_BERBERE'),
('ethiopian', 'ETH_MISIR_WAT', 'ING_GARLIC'),
('ethiopian', 'ETH_MISIR_WAT', 'ING_GINGER'),

-- Gomen
('ethiopian', 'ETH_GOMEN', 'ING_COLLARD_GREENS'),
('ethiopian', 'ETH_GOMEN', 'ING_GARLIC'),
('ethiopian', 'ETH_GOMEN', 'ING_GINGER'),
('ethiopian', 'ETH_GOMEN', 'ING_ONION'),

-- Kolo
('ethiopian', 'ETH_KOLO', 'ING_BARLEY'),
('ethiopian', 'ETH_KOLO', 'ING_CHICKPEA'),
('ethiopian', 'ETH_KOLO', 'ING_SALT'),

-- Atkilt
('ethiopian', 'ETH_ATKILT', 'ING_CABBAGE'),
('ethiopian', 'ETH_ATKILT', 'ING_CARROT'),
('ethiopian', 'ETH_ATKILT', 'ING_POTATO'),
('ethiopian', 'ETH_ATKILT', 'ING_ONION'),
('ethiopian', 'ETH_ATKILT', 'ING_TURMERIC'),

-- Tikil Gomen
('ethiopian', 'ETH_TIKIL_GOMEN', 'ING_CABBAGE'),
('ethiopian', 'ETH_TIKIL_GOMEN', 'ING_CARROT'),
('ethiopian', 'ETH_TIKIL_GOMEN', 'ING_TURMERIC'),
('ethiopian', 'ETH_TIKIL_GOMEN', 'ING_GINGER'),
('ethiopian', 'ETH_TIKIL_GOMEN', 'ING_GARLIC'),

-- Azifa
('ethiopian', 'ETH_AZIFA', 'ING_LENTILS'),
('ethiopian', 'ETH_AZIFA', 'ING_LIME'),
('ethiopian', 'ETH_AZIFA', 'ING_JALAPENO'),
('ethiopian', 'ETH_AZIFA', 'ING_ONION'),
('ethiopian', 'ETH_AZIFA', 'ING_MUSTARD'),

-- Beyaynetu (combo platter)
('ethiopian', 'ETH_BEYAYNETU', 'ING_INJERA'),
('ethiopian', 'ETH_BEYAYNETU', 'ING_RED_LENTILS'),
('ethiopian', 'ETH_BEYAYNETU', 'ING_COLLARD_GREENS'),
('ethiopian', 'ETH_BEYAYNETU', 'ING_CABBAGE'),
('ethiopian', 'ETH_BEYAYNETU', 'ING_CHICKPEA'),
('ethiopian', 'ETH_BEYAYNETU', 'ING_POTATO'),

-- Dinich Wat
('ethiopian', 'ETH_DINICH_WAT', 'ING_POTATO'),
('ethiopian', 'ETH_DINICH_WAT', 'ING_ONION'),
('ethiopian', 'ETH_DINICH_WAT', 'ING_BERBERE'),
('ethiopian', 'ETH_DINICH_WAT', 'ING_GARLIC'),

-- Buticha
('ethiopian', 'ETH_BUTICHA', 'ING_CHICKPEA'),
('ethiopian', 'ETH_BUTICHA', 'ING_LEMON'),
('ethiopian', 'ETH_BUTICHA', 'ING_OLIVE_OIL'),
('ethiopian', 'ETH_BUTICHA', 'ING_GARLIC'),

-- ============================================
-- BREADS
-- ============================================
-- Injera
('ethiopian', 'ETH_INJERA', 'ING_TEFF_FLOUR'),
('ethiopian', 'ETH_INJERA', 'ING_WATER'),
('ethiopian', 'ETH_INJERA', 'ING_SALT'),

-- Kocho
('ethiopian', 'ETH_KOCHO', 'ING_WATER'),
('ethiopian', 'ETH_KOCHO', 'ING_SALT'),

-- Ambasha
('ethiopian', 'ETH_AMBASHA', 'ING_FLOUR'),
('ethiopian', 'ETH_AMBASHA', 'ING_YEAST'),
('ethiopian', 'ETH_AMBASHA', 'ING_SUGAR'),
('ethiopian', 'ETH_AMBASHA', 'ING_CARDAMOM'),
('ethiopian', 'ETH_AMBASHA', 'ING_KORERIMA'),

-- ============================================
-- SALADS
-- ============================================
-- Ethiopian Salad
('ethiopian', 'ETH_ETHIOPIAN_SALAD', 'ING_TOMATO'),
('ethiopian', 'ETH_ETHIOPIAN_SALAD', 'ING_ONION'),
('ethiopian', 'ETH_ETHIOPIAN_SALAD', 'ING_JALAPENO'),
('ethiopian', 'ETH_ETHIOPIAN_SALAD', 'ING_LEMON'),
('ethiopian', 'ETH_ETHIOPIAN_SALAD', 'ING_OLIVE_OIL'),

-- Ayib (cheese)
('ethiopian', 'ETH_AYIB', 'ING_AYIB'),

-- Fit Fit
('ethiopian', 'ETH_FIT_FIT', 'ING_INJERA'),
('ethiopian', 'ETH_FIT_FIT', 'ING_BERBERE'),
('ethiopian', 'ETH_FIT_FIT', 'ING_NITER_KIBBEH'),
('ethiopian', 'ETH_FIT_FIT', 'ING_ONION'),

-- Kategna
('ethiopian', 'ETH_KATEGNA', 'ING_INJERA'),
('ethiopian', 'ETH_KATEGNA', 'ING_BERBERE'),
('ethiopian', 'ETH_KATEGNA', 'ING_NITER_KIBBEH'),

-- ============================================
-- BEVERAGES
-- ============================================
-- Tej (honey wine)
('ethiopian', 'ETH_TEJ', 'ING_HONEY'),
('ethiopian', 'ETH_TEJ', 'ING_GESHO'),
('ethiopian', 'ETH_TEJ', 'ING_WATER'),

-- Tella (beer)
('ethiopian', 'ETH_TELLA', 'ING_TEFF_FLOUR'),
('ethiopian', 'ETH_TELLA', 'ING_BARLEY'),
('ethiopian', 'ETH_TELLA', 'ING_GESHO'),
('ethiopian', 'ETH_TELLA', 'ING_WATER'),

-- Buna (coffee)
('ethiopian', 'ETH_BUNA', 'ING_COFFEE'),

-- Atmit (porridge drink)
('ethiopian', 'ETH_ATMIT', 'ING_OATS'),
('ethiopian', 'ETH_ATMIT', 'ING_BARLEY'),
('ethiopian', 'ETH_ATMIT', 'ING_HONEY'),
('ethiopian', 'ETH_ATMIT', 'ING_CARDAMOM')

ON CONFLICT DO NOTHING;
