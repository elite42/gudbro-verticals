-- =============================================
-- STEAKS EXPANSION - Premium Cuts & Achuras
-- Adds ~26 essential steakhouse items
-- Using correct steaks table schema
-- =============================================

INSERT INTO steaks (
    id, slug, name, description, category, status, style, cut,
    weight_g, bone_in, grade, cooking_method, recommended_doneness,
    internal_temp_c, origin_country, origin_region, serves,
    recommended_sides, wine_pairing, ingredient_ids, allergens,
    is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian,
    is_halal, is_kosher, calories_per_serving, protein_g, carbs_g, fat_g,
    spice_level, tags, popularity
) VALUES

-- =============================================
-- PREMIUM BEEF CUTS
-- =============================================

-- CHATEAUBRIAND
('STK_CHATEAUBRIAND', 'chateaubriand',
 '{"en": "Chateaubriand", "it": "Chateaubriand", "vi": "Chateaubriand"}'::jsonb,
 '{"en": "Centre-cut beef tenderloin for two, roasted and carved tableside", "it": "Filetto di manzo taglio centrale per due, arrosto e servito al tavolo", "vi": "Thăn bò cắt giữa cho hai người, nướng và thái tại bàn"}'::jsonb,
 'beef_steak', 'classic', 'french', 'tenderloin',
 680, false, 'usda_prime', 'roasted', 'medium_rare',
 54, 'France', 'National', 2,
 ARRAY['mashed_potatoes', 'green_beans', 'bearnaise_sauce'],
 ARRAY['burgundy', 'bordeaux', 'pinot_noir'],
 ARRAY['ING_BEEF_TENDERLOIN', 'ING_BUTTER', 'ING_THYME', 'ING_SHALLOT'],
 ARRAY[]::text[],
 true, false, true, false, false, true, false,
 750, 65.0, 0.0, 52.0, 0,
 ARRAY['french', 'sharing', 'elegant', 'premium', 'tableside'], 85),

-- COWBOY RIBEYE
('STK_COWBOY_RIBEYE', 'cowboy-ribeye',
 '{"en": "Cowboy Ribeye", "it": "Ribeye Cowboy", "vi": "Ribeye Cowboy"}'::jsonb,
 '{"en": "Bone-in ribeye with French-trimmed bone, heavily marbled", "it": "Ribeye con osso alla francese, altamente marmorizzato", "vi": "Ribeye có xương cắt kiểu Pháp, vân mỡ đậm"}'::jsonb,
 'beef_steak', 'classic', 'american', 'ribeye',
 570, true, 'usda_prime', 'grilled', 'medium_rare',
 54, 'United States', 'Texas', 1,
 ARRAY['baked_potato', 'creamed_spinach', 'onion_rings'],
 ARRAY['cabernet_sauvignon', 'malbec', 'zinfandel'],
 ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_BUTTER'],
 ARRAY[]::text[],
 true, false, true, false, false, true, false,
 850, 58.0, 0.0, 68.0, 0,
 ARRAY['american', 'bone_in', 'marbled', 'steakhouse'], 88),

-- DELMONICO
('STK_DELMONICO', 'delmonico',
 '{"en": "Delmonico Steak", "it": "Delmonico", "vi": "Steak Delmonico"}'::jsonb,
 '{"en": "Classic American boneless ribeye, thick-cut", "it": "Classico ribeye americano senza osso, taglio spesso", "vi": "Ribeye Mỹ cổ điển không xương, cắt dày"}'::jsonb,
 'beef_steak', 'classic', 'american', 'ribeye',
 450, false, 'usda_choice', 'grilled', 'medium_rare',
 54, 'United States', 'New York', 1,
 ARRAY['hash_browns', 'asparagus', 'mushrooms'],
 ARRAY['cabernet_sauvignon', 'merlot'],
 ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_GARLIC'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 680, 48.0, 0.0, 52.0, 0,
 ARRAY['american', 'classic', 'new_york', 'steakhouse'], 82),

-- BONE-IN FILET
('STK_BONE_IN_FILET', 'bone-in-filet',
 '{"en": "Bone-In Filet Mignon", "it": "Filetto Mignon con Osso", "vi": "Filet Mignon Có Xương"}'::jsonb,
 '{"en": "Rare bone-in tenderloin cut, exceptionally tender", "it": "Raro taglio di filetto con osso, eccezionalmente tenero", "vi": "Thăn bò có xương hiếm, cực kỳ mềm"}'::jsonb,
 'beef_steak', 'classic', 'american', 'tenderloin',
 400, true, 'usda_prime', 'grilled', 'medium_rare',
 54, 'United States', 'Nebraska', 1,
 ARRAY['truffle_fries', 'bearnaise_sauce', 'asparagus'],
 ARRAY['pinot_noir', 'burgundy'],
 ARRAY['ING_BEEF_TENDERLOIN', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_BUTTER'],
 ARRAY[]::text[],
 true, false, true, false, false, true, false,
 520, 45.0, 0.0, 35.0, 0,
 ARRAY['premium', 'bone_in', 'tender', 'rare_cut'], 80),

-- COULOTTE
('STK_COULOTTE', 'coulotte',
 '{"en": "Coulotte Steak", "it": "Coulotte", "vi": "Steak Coulotte"}'::jsonb,
 '{"en": "Top sirloin cap, Brazilian picanha without the fat cap", "it": "Cappello del controfiletto, picanha brasiliana senza cappello di grasso", "vi": "Nắp thăn trên, picanha Brazil không có lớp mỡ"}'::jsonb,
 'beef_steak', 'classic', 'brazilian', 'sirloin',
 340, false, 'usda_choice', 'grilled', 'medium_rare',
 54, 'Brazil', 'Sao Paulo', 1,
 ARRAY['farofa', 'vinaigrette', 'rice'],
 ARRAY['malbec', 'tempranillo'],
 ARRAY['ING_BEEF_SIRLOIN', 'ING_SEA_SALT', 'ING_BLACK_PEPPER'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 420, 38.0, 0.0, 28.0, 0,
 ARRAY['brazilian', 'lean', 'flavorful'], 75),

-- TRI-TIP
('STK_TRI_TIP', 'tri-tip',
 '{"en": "Tri-Tip", "it": "Tri-Tip", "vi": "Tri-Tip"}'::jsonb,
 '{"en": "California Santa Maria-style bottom sirloin", "it": "Controfiletto inferiore stile Santa Maria della California", "vi": "Thăn dưới kiểu Santa Maria California"}'::jsonb,
 'beef_steak', 'classic', 'american', 'sirloin',
 450, false, 'usda_choice', 'grilled', 'medium',
 60, 'United States', 'California', 2,
 ARRAY['pinquito_beans', 'salsa', 'garlic_bread'],
 ARRAY['zinfandel', 'syrah'],
 ARRAY['ING_BEEF_SIRLOIN', 'ING_GARLIC', 'ING_BLACK_PEPPER', 'ING_PAPRIKA'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 520, 42.0, 0.0, 36.0, 0,
 ARRAY['california', 'santa_maria', 'bbq', 'american'], 78),

-- DENVER STEAK
('STK_DENVER', 'denver-steak',
 '{"en": "Denver Steak", "it": "Denver Steak", "vi": "Steak Denver"}'::jsonb,
 '{"en": "Well-marbled cut from the chuck, incredibly tender", "it": "Taglio ben marmorizzato dalla spalla, incredibilmente tenero", "vi": "Thịt vai vân mỡ đẹp, cực kỳ mềm"}'::jsonb,
 'beef_steak', 'modern', 'american', 'other',
 280, false, 'usda_choice', 'grilled', 'medium_rare',
 54, 'United States', 'Colorado', 1,
 ARRAY['roasted_vegetables', 'chimichurri'],
 ARRAY['malbec', 'cabernet_sauvignon'],
 ARRAY['ING_BEEF_CHUCK', 'ING_SEA_SALT', 'ING_BLACK_PEPPER'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 380, 32.0, 0.0, 26.0, 0,
 ARRAY['american', 'tender', 'value', 'marbled'], 72),

-- TERES MAJOR
('STK_TERES_MAJOR', 'teres-major',
 '{"en": "Teres Major (Petite Tender)", "it": "Teres Major (Petite Tender)", "vi": "Teres Major (Thịt Mềm Nhỏ)"}'::jsonb,
 '{"en": "Small shoulder muscle, second most tender cut after tenderloin", "it": "Piccolo muscolo della spalla, secondo taglio più tenero dopo il filetto", "vi": "Cơ vai nhỏ, mềm thứ hai sau thăn"}'::jsonb,
 'beef_steak', 'modern', 'american', 'shoulder',
 225, false, 'usda_choice', 'grilled', 'medium_rare',
 54, 'United States', 'National', 1,
 ARRAY['roasted_potatoes', 'green_beans'],
 ARRAY['pinot_noir', 'merlot'],
 ARRAY['ING_BEEF_SHOULDER', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_ROSEMARY'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 320, 28.0, 0.0, 20.0, 0,
 ARRAY['tender', 'value', 'chef_favorite'], 68),

-- BAVETTE
('STK_BAVETTE', 'bavette',
 '{"en": "Bavette Steak", "it": "Bavette", "vi": "Steak Bavette"}'::jsonb,
 '{"en": "French flap steak, intensely beefy flavor", "it": "Bistecca bavette francese, sapore intenso di manzo", "vi": "Steak bavette Pháp, vị bò đậm đà"}'::jsonb,
 'beef_steak', 'classic', 'french', 'flank',
 340, false, 'usda_choice', 'grilled', 'medium_rare',
 54, 'France', 'National', 1,
 ARRAY['shallot_sauce', 'frites', 'salad'],
 ARRAY['burgundy', 'cotes_du_rhone'],
 ARRAY['ING_BEEF_FLANK', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_SHALLOT'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 420, 36.0, 0.0, 28.0, 0,
 ARRAY['french', 'bistro', 'flavorful'], 74),

-- ONGLET
('STK_ONGLET', 'onglet',
 '{"en": "Onglet (Butchers Steak)", "it": "Onglet (Bistecca del Macellaio)", "vi": "Onglet (Steak Đồ Tể)"}'::jsonb,
 '{"en": "French hanger steak, rich mineral flavor", "it": "Bistecca hanger francese, ricco sapore minerale", "vi": "Steak treo Pháp, vị khoáng đậm"}'::jsonb,
 'beef_steak', 'classic', 'french', 'hanger',
 280, false, 'usda_choice', 'grilled', 'medium_rare',
 54, 'France', 'Paris', 1,
 ARRAY['shallot_sauce', 'frites'],
 ARRAY['burgundy', 'beaujolais'],
 ARRAY['ING_BEEF_HANGER', 'ING_SEA_SALT', 'ING_BLACK_PEPPER', 'ING_RED_WINE'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 380, 32.0, 0.0, 24.0, 0,
 ARRAY['french', 'bistro', 'offal_adjacent'], 70),

-- =============================================
-- ARGENTINE/BRAZILIAN CUTS
-- =============================================

-- MAMINHA
('STK_MAMINHA', 'maminha',
 '{"en": "Maminha", "it": "Maminha", "vi": "Maminha"}'::jsonb,
 '{"en": "Brazilian rump steak, tender and flavorful", "it": "Bistecca di scamone brasiliana, tenera e saporita", "vi": "Steak mông bò Brazil, mềm và đậm vị"}'::jsonb,
 'beef_steak', 'classic', 'brazilian', 'other',
 400, false, 'usda_choice', 'grilled', 'medium_rare',
 54, 'Brazil', 'Rio Grande do Sul', 1,
 ARRAY['farofa', 'rice', 'black_beans'],
 ARRAY['malbec', 'carmenere'],
 ARRAY['ING_BEEF_RUMP', 'ING_COARSE_SALT'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 450, 40.0, 0.0, 30.0, 0,
 ARRAY['brazilian', 'churrasco', 'tender'], 76),

-- ALCATRA
('STK_ALCATRA', 'alcatra',
 '{"en": "Alcatra", "it": "Alcatra", "vi": "Alcatra"}'::jsonb,
 '{"en": "Brazilian top sirloin, prized for churrasco", "it": "Controfiletto superiore brasiliano, pregiato per il churrasco", "vi": "Thăn trên Brazil, quý cho churrasco"}'::jsonb,
 'beef_steak', 'classic', 'brazilian', 'sirloin',
 450, false, 'usda_choice', 'grilled', 'medium_rare',
 54, 'Brazil', 'Sao Paulo', 1,
 ARRAY['farofa', 'vinaigrette', 'pao_de_queijo'],
 ARRAY['malbec', 'tempranillo'],
 ARRAY['ING_BEEF_SIRLOIN', 'ING_COARSE_SALT'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 480, 42.0, 0.0, 32.0, 0,
 ARRAY['brazilian', 'churrasco', 'classic'], 80),

-- CUADRIL
('STK_CUADRIL', 'cuadril',
 '{"en": "Cuadril", "it": "Cuadril", "vi": "Cuadril"}'::jsonb,
 '{"en": "Argentine rump steak, lean and tasty", "it": "Bistecca di scamone argentina, magra e gustosa", "vi": "Steak mông Argentina, nạc và ngon"}'::jsonb,
 'beef_steak', 'classic', 'argentinian', 'other',
 400, false, 'usda_choice', 'grilled', 'medium_rare',
 54, 'Argentina', 'Buenos Aires', 1,
 ARRAY['chimichurri', 'provoleta', 'salad'],
 ARRAY['malbec', 'bonarda'],
 ARRAY['ING_BEEF_RUMP', 'ING_COARSE_SALT', 'ING_CHIMICHURRI'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 420, 38.0, 0.0, 28.0, 0,
 ARRAY['argentine', 'parrilla', 'lean'], 74),

-- MATAMBRE
('STK_MATAMBRE', 'matambre',
 '{"en": "Matambre", "it": "Matambre", "vi": "Matambre"}'::jsonb,
 '{"en": "Argentine flank steak, often rolled and stuffed", "it": "Bistecca di pancia argentina, spesso arrotolata e farcita", "vi": "Steak bụng Argentina, thường cuộn và nhồi"}'::jsonb,
 'beef_steak', 'traditional', 'argentinian', 'flank',
 450, false, 'usda_choice', 'grilled', 'medium',
 60, 'Argentina', 'Pampa', 2,
 ARRAY['chimichurri', 'salad', 'bread'],
 ARRAY['malbec', 'cabernet_sauvignon'],
 ARRAY['ING_BEEF_FLANK', 'ING_BELL_PEPPER', 'ING_EGG', 'ING_CARROT'],
 ARRAY['eggs'],
 true, true, true, false, false, true, false,
 480, 40.0, 5.0, 32.0, 0,
 ARRAY['argentine', 'stuffed', 'unique'], 72),

-- =============================================
-- ACHURAS (Argentine Offal/Variety Meats)
-- =============================================

-- MOLLEJAS
('STK_MOLLEJAS', 'mollejas',
 '{"en": "Mollejas (Sweetbreads)", "it": "Mollejas (Animelle)", "vi": "Mollejas (Tuyến Ức)"}'::jsonb,
 '{"en": "Grilled veal or beef sweetbreads, crispy outside, creamy inside", "it": "Animelle di vitello o manzo alla griglia, croccanti fuori, cremose dentro", "vi": "Tuyến ức bò nướng, giòn bên ngoài, béo bên trong"}'::jsonb,
 'mixed_grill', 'classic', 'argentinian', 'other',
 225, false, null, 'grilled', 'well_done',
 74, 'Argentina', 'Buenos Aires', 1,
 ARRAY['lemon', 'chimichurri', 'salad'],
 ARRAY['torrontes', 'sauvignon_blanc'],
 ARRAY['ING_SWEETBREAD', 'ING_LEMON', 'ING_SEA_SALT'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 280, 18.0, 0.0, 22.0, 0,
 ARRAY['argentine', 'achuras', 'delicacy', 'crispy'], 78),

-- CHINCHULINES
('STK_CHINCHULINES', 'chinchulines',
 '{"en": "Chinchulines", "it": "Chinchulines (Intestino)", "vi": "Chinchulines (Ruột Bò)"}'::jsonb,
 '{"en": "Grilled beef small intestines, crispy Argentine delicacy", "it": "Intestino tenue di manzo alla griglia, croccante prelibatezza argentina", "vi": "Ruột non bò nướng, món ngon giòn Argentina"}'::jsonb,
 'mixed_grill', 'traditional', 'argentinian', 'other',
 170, false, null, 'grilled', 'well_done',
 74, 'Argentina', 'Buenos Aires', 1,
 ARRAY['lemon', 'chimichurri'],
 ARRAY['malbec', 'bonarda'],
 ARRAY['ING_BEEF_INTESTINE', 'ING_SEA_SALT', 'ING_LEMON'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 220, 15.0, 0.0, 16.0, 0,
 ARRAY['argentine', 'achuras', 'crispy', 'traditional'], 65),

-- RINONES
('STK_RINONES', 'rinones',
 '{"en": "Riñones a la Parrilla", "it": "Rognoni alla Griglia", "vi": "Thận Bò Nướng"}'::jsonb,
 '{"en": "Grilled beef kidneys with herbs", "it": "Rognoni di manzo alla griglia con erbe", "vi": "Thận bò nướng với thảo mộc"}'::jsonb,
 'mixed_grill', 'traditional', 'argentinian', 'other',
 225, false, null, 'grilled', 'medium',
 60, 'Argentina', 'Mendoza', 1,
 ARRAY['lemon', 'parsley', 'chimichurri'],
 ARRAY['malbec'],
 ARRAY['ING_BEEF_KIDNEY', 'ING_PARSLEY', 'ING_GARLIC', 'ING_LEMON'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 180, 22.0, 1.0, 8.0, 0,
 ARRAY['argentine', 'achuras', 'grilled'], 62),

-- MORCILLA
('STK_MORCILLA', 'morcilla',
 '{"en": "Morcilla", "it": "Sanguinaccio Argentino", "vi": "Dồi Tiết Argentina"}'::jsonb,
 '{"en": "Argentine blood sausage with rice and spices", "it": "Sanguinaccio argentino con riso e spezie", "vi": "Dồi tiết Argentina với gạo và gia vị"}'::jsonb,
 'mixed_grill', 'traditional', 'argentinian', 'other',
 170, false, null, 'grilled', 'well_done',
 74, 'Argentina', 'Buenos Aires', 1,
 ARRAY['bread', 'chimichurri'],
 ARRAY['malbec', 'bonarda'],
 ARRAY['ING_PORK_BLOOD', 'ING_RICE', 'ING_ONION', 'ING_SPICES'],
 ARRAY[]::text[],
 true, true, true, false, false, false, false,
 250, 12.0, 15.0, 18.0, 1,
 ARRAY['argentine', 'asado', 'sausage', 'traditional'], 75),

-- CHORIZO ARGENTINO
('STK_CHORIZO_ARGENTINO', 'chorizo-argentino',
 '{"en": "Chorizo Argentino", "it": "Chorizo Argentino", "vi": "Chorizo Argentina"}'::jsonb,
 '{"en": "Fresh Argentine pork sausage for asado", "it": "Salsiccia di maiale argentina fresca per asado", "vi": "Xúc xích heo tươi Argentina cho asado"}'::jsonb,
 'mixed_grill', 'classic', 'argentinian', 'other',
 170, false, null, 'grilled', 'well_done',
 74, 'Argentina', 'Buenos Aires', 1,
 ARRAY['bread', 'chimichurri', 'salsa_criolla'],
 ARRAY['malbec', 'tempranillo'],
 ARRAY['ING_PORK', 'ING_GARLIC', 'ING_PAPRIKA', 'ING_OREGANO'],
 ARRAY[]::text[],
 true, true, true, false, false, false, false,
 320, 14.0, 2.0, 28.0, 1,
 ARRAY['argentine', 'asado', 'sausage', 'classic'], 88),

-- PROVOLETA
('STK_PROVOLETA', 'provoleta',
 '{"en": "Provoleta", "it": "Provoleta", "vi": "Provoleta"}'::jsonb,
 '{"en": "Grilled provolone cheese with oregano and chili", "it": "Provolone alla griglia con origano e peperoncino", "vi": "Phô mai provolone nướng với oregano và ớt"}'::jsonb,
 'mixed_grill', 'classic', 'argentinian', 'other',
 170, false, null, 'grilled', 'well_done',
 null, 'Argentina', 'Buenos Aires', 2,
 ARRAY['bread', 'chimichurri'],
 ARRAY['malbec', 'torrontes'],
 ARRAY['ING_PROVOLONE', 'ING_OREGANO', 'ING_CHILI_FLAKES', 'ING_OLIVE_OIL'],
 ARRAY['dairy'],
 true, false, true, false, true, true, false,
 280, 18.0, 2.0, 22.0, 1,
 ARRAY['argentine', 'asado', 'other', 'vegetarian'], 85),

-- =============================================
-- DRY-AGED PREMIUM CUTS
-- =============================================

-- DRY-AGED RIBEYE 45 DAYS
('STK_DRY_AGED_RIBEYE_45', 'dry-aged-ribeye-45',
 '{"en": "Dry-Aged Ribeye 45 Days", "it": "Ribeye Frollato 45 Giorni", "vi": "Ribeye Ủ Khô 45 Ngày"}'::jsonb,
 '{"en": "45-day dry-aged ribeye with intense nutty flavor", "it": "Ribeye frollato 45 giorni con intenso sapore di noce", "vi": "Ribeye ủ khô 45 ngày với vị hạt đậm đà"}'::jsonb,
 'beef_steak', 'classic', 'american', 'ribeye',
 510, false, 'usda_prime', 'grilled', 'medium_rare',
 54, 'United States', 'Nebraska', 1,
 ARRAY['bone_marrow', 'truffle_butter', 'roasted_mushrooms'],
 ARRAY['barolo', 'cabernet_sauvignon'],
 ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 780, 52.0, 0.0, 62.0, 0,
 ARRAY['dry_aged', 'premium', 'nutty', 'luxury'], 82),

-- DRY-AGED NY STRIP 30 DAYS
('STK_DRY_AGED_STRIP_30', 'dry-aged-strip-30',
 '{"en": "Dry-Aged NY Strip 30 Days", "it": "NY Strip Frollato 30 Giorni", "vi": "NY Strip Ủ Khô 30 Ngày"}'::jsonb,
 '{"en": "30-day dry-aged strip steak with concentrated beef flavor", "it": "Bistecca strip frollata 30 giorni con sapore di manzo concentrato", "vi": "Strip steak ủ khô 30 ngày với vị bò đậm đặc"}'::jsonb,
 'beef_steak', 'classic', 'american', 'new_york_strip',
 450, false, 'usda_prime', 'grilled', 'medium_rare',
 54, 'United States', 'Kansas', 1,
 ARRAY['peppercorn_sauce', 'truffle_fries', 'asparagus'],
 ARRAY['cabernet_sauvignon', 'bordeaux'],
 ARRAY['ING_BEEF_STRIP', 'ING_SEA_SALT', 'ING_BLACK_PEPPER'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 720, 48.0, 0.0, 56.0, 0,
 ARRAY['dry_aged', 'premium', 'classic'], 80),

-- DRY-AGED PORTERHOUSE 60 DAYS
('STK_DRY_AGED_PORTERHOUSE_60', 'dry-aged-porterhouse-60',
 '{"en": "Dry-Aged Porterhouse 60 Days", "it": "Porterhouse Frollata 60 Giorni", "vi": "Porterhouse Ủ Khô 60 Ngày"}'::jsonb,
 '{"en": "60-day dry-aged porterhouse, the ultimate steak experience", "it": "Porterhouse frollata 60 giorni, l''esperienza definitiva della bistecca", "vi": "Porterhouse ủ khô 60 ngày, trải nghiệm steak tối thượng"}'::jsonb,
 'beef_steak', 'classic', 'american', 'porterhouse',
 900, true, 'usda_prime', 'grilled', 'medium_rare',
 54, 'United States', 'Nebraska', 2,
 ARRAY['creamed_spinach', 'baked_potato', 'bearnaise_sauce'],
 ARRAY['barolo', 'brunello', 'napa_cabernet'],
 ARRAY['ING_BEEF_PORTERHOUSE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER'],
 ARRAY[]::text[],
 true, true, true, false, false, true, false,
 1100, 75.0, 0.0, 85.0, 0,
 ARRAY['dry_aged', 'premium', 'sharing', 'ultimate'], 78),

-- =============================================
-- SPECIALTY PREPARATIONS
-- =============================================

-- STEAK DIANE
('STK_STEAK_DIANE', 'steak-diane',
 '{"en": "Steak Diane", "it": "Steak Diane", "vi": "Steak Diane"}'::jsonb,
 '{"en": "Pan-fried steak with cognac, cream and mushroom sauce", "it": "Bistecca in padella con cognac, panna e salsa ai funghi", "vi": "Steak chiên với cognac, kem và nấm"}'::jsonb,
 'beef_steak', 'classic', 'american', 'tenderloin',
 280, false, 'usda_prime', 'pan_seared', 'medium_rare',
 54, 'United States', 'New York', 1,
 ARRAY['mashed_potatoes', 'green_beans'],
 ARRAY['burgundy', 'pinot_noir'],
 ARRAY['ING_BEEF_TENDERLOIN', 'ING_COGNAC', 'ING_HEAVY_CREAM', 'ING_MUSHROOM', 'ING_SHALLOT'],
 ARRAY['dairy'],
 true, false, true, false, false, true, false,
 580, 35.0, 8.0, 42.0, 0,
 ARRAY['classic', 'tableside', 'flambe', 'retro'], 75),

-- STEAK AU POIVRE
('STK_STEAK_AU_POIVRE', 'steak-au-poivre',
 '{"en": "Steak au Poivre", "it": "Steak al Pepe", "vi": "Steak Tiêu Đen"}'::jsonb,
 '{"en": "Pepper-crusted steak with cognac cream sauce", "it": "Bistecca in crosta di pepe con salsa al cognac e panna", "vi": "Steak vỏ tiêu với sốt kem cognac"}'::jsonb,
 'beef_steak', 'classic', 'french', 'new_york_strip',
 340, false, 'usda_prime', 'pan_seared', 'medium_rare',
 54, 'France', 'Paris', 1,
 ARRAY['frites', 'haricots_verts'],
 ARRAY['burgundy', 'cotes_du_rhone'],
 ARRAY['ING_BEEF_STRIP', 'ING_BLACK_PEPPER', 'ING_COGNAC', 'ING_HEAVY_CREAM'],
 ARRAY['dairy'],
 true, false, true, false, false, true, false,
 620, 40.0, 6.0, 48.0, 2,
 ARRAY['french', 'bistro', 'peppercorn', 'classic'], 82),

-- CARPETBAGGER
('STK_CARPETBAGGER', 'carpetbagger',
 '{"en": "Carpetbagger Steak", "it": "Steak Carpetbagger", "vi": "Steak Carpetbagger"}'::jsonb,
 '{"en": "Filet stuffed with oysters, Australian steakhouse classic", "it": "Filetto farcito con ostriche, classico steakhouse australiano", "vi": "Filet nhồi hàu, món kinh điển nhà hàng bít tết Úc"}'::jsonb,
 'beef_steak', 'classic', 'international', 'tenderloin',
 400, false, 'wagyu_a5', 'grilled', 'medium_rare',
 54, 'Australia', 'Victoria', 1,
 ARRAY['chips', 'salad', 'bearnaise_sauce'],
 ARRAY['chardonnay', 'pinot_noir'],
 ARRAY['ING_BEEF_TENDERLOIN', 'ING_OYSTER', 'ING_BUTTER', 'ING_WORCESTERSHIRE'],
 ARRAY['shellfish'],
 true, false, true, false, false, false, false,
 520, 42.0, 4.0, 36.0, 0,
 ARRAY['australian', 'stuffed', 'surf_turf', 'unique'], 70)

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- Summary: 26 new steaks items added
-- Categories:
-- - Premium Beef Cuts: 10 (Chateaubriand, Cowboy Ribeye, Delmonico, Bone-In Filet, Coulotte, Tri-Tip, Denver, Teres Major, Bavette, Onglet)
-- - Argentine/Brazilian Cuts: 4 (Maminha, Alcatra, Cuadril, Matambre)
-- - Achuras (Offal): 6 (Mollejas, Chinchulines, Rinones, Morcilla, Chorizo Argentino, Provoleta)
-- - Dry-Aged Premium: 3 (Ribeye 45d, Strip 30d, Porterhouse 60d)
-- - Specialty Preparations: 3 (Steak Diane, Steak au Poivre, Carpetbagger)
-- =============================================
