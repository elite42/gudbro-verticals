-- ============================================================================
-- GLOBAL SALUMI & INSACCATI EXPANSION
-- Date: 2025-12-26
-- Description: Add ~90 new cured meats and sausages from around the world
-- Categories: proteins (charcuterie items stored as proteins for consistency)
-- ============================================================================

BEGIN;

-- ============================================================================
-- ITALY - Premium Italian Salumi
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
-- Already exists: PROSCIUTTO (4 variants), BRESAOLA, SPECK, PANCETTA, GUANCIALE,
--                 MORTADELLA, SALAMI, COTECHINO, NDUJA
('ING_COPPA', 'Coppa', 'coppa', 'proteins',
 'Cured pork neck/shoulder from Emilia-Romagna and Calabria, DOP protected',
 '{"calories": 380, "protein": 22, "fat": 32, "carbs": 0, "fiber": 0, "sodium": 1500}'::jsonb),

('ING_CULATELLO', 'Culatello di Zibello', 'culatello', 'proteins',
 'The king of Italian salumi, aged pork loin from Parma region, DOP protected',
 '{"calories": 340, "protein": 26, "fat": 26, "carbs": 0, "fiber": 0, "sodium": 1800}'::jsonb),

('ING_SOPPRESSATA', 'Soppressata', 'soppressata', 'proteins',
 'Dry-cured Italian salami, typically from Calabria or Basilicata',
 '{"calories": 425, "protein": 23, "fat": 36, "carbs": 1, "fiber": 0, "sodium": 1750}'::jsonb),

('ING_CAPOCOLLO', 'Capocollo', 'capocollo', 'proteins',
 'Cured pork shoulder/neck, also known as coppa or capicola in some regions',
 '{"calories": 390, "protein": 21, "fat": 34, "carbs": 0, "fiber": 0, "sodium": 1600}'::jsonb),

('ING_LARDO', 'Lardo di Colonnata', 'lardo', 'fats',
 'Cured pork fatback from Colonnata, Tuscany, aged in marble basins with herbs',
 '{"calories": 890, "protein": 2, "fat": 98, "carbs": 0, "fiber": 0, "sodium": 1200}'::jsonb),

('ING_LONZA', 'Lonza', 'lonza', 'proteins',
 'Cured pork loin, similar to Canadian bacon, from Central Italy',
 '{"calories": 195, "protein": 32, "fat": 7, "carbs": 0, "fiber": 0, "sodium": 1400}'::jsonb),

('ING_FINOCCHIONA', 'Finocchiona', 'finocchiona', 'proteins',
 'Tuscan salami flavored with wild fennel seeds, soft texture',
 '{"calories": 410, "protein": 24, "fat": 35, "carbs": 1, "fiber": 0, "sodium": 1650}'::jsonb),

('ING_SALAME_FELINO', 'Salame Felino', 'salame-felino', 'proteins',
 'Prestigious salami from Felino near Parma, delicate sweet flavor',
 '{"calories": 385, "protein": 26, "fat": 31, "carbs": 0, "fiber": 0, "sodium": 1550}'::jsonb),

('ING_SALAME_MILANO', 'Salame Milano', 'salame-milano', 'proteins',
 'Fine-grained salami from Milan, mild flavor, widely exported',
 '{"calories": 370, "protein": 25, "fat": 30, "carbs": 0, "fiber": 0, "sodium": 1600}'::jsonb),

('ING_VENTRICINA', 'Ventricina', 'ventricina', 'proteins',
 'Spicy spreadable salami from Abruzzo, similar to nduja',
 '{"calories": 450, "protein": 20, "fat": 42, "carbs": 1, "fiber": 0, "sodium": 1400}'::jsonb),

('ING_CIAUSCOLO', 'Ciauscolo', 'ciauscolo', 'proteins',
 'Soft, spreadable salami from Marche region, IGP protected',
 '{"calories": 430, "protein": 22, "fat": 38, "carbs": 1, "fiber": 0, "sodium": 1500}'::jsonb),

('ING_ZAMPONE', 'Zampone', 'zampone', 'proteins',
 'Stuffed pig trotter from Modena, traditional New Year dish',
 '{"calories": 320, "protein": 18, "fat": 27, "carbs": 1, "fiber": 0, "sodium": 1200}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- FRANCE - French Charcuterie
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
-- Already exists: PATE, LARDONS
('ING_SAUCISSON_SEC', 'Saucisson Sec', 'saucisson-sec', 'proteins',
 'Classic French dry-cured sausage, typically made with pork and garlic',
 '{"calories": 418, "protein": 27, "fat": 33, "carbs": 2, "fiber": 0, "sodium": 1800}'::jsonb),

('ING_JAMBON_BAYONNE', 'Jambon de Bayonne', 'jambon-bayonne', 'proteins',
 'Dry-cured ham from Basque Country, IGP protected, aged 7-12 months',
 '{"calories": 230, "protein": 21, "fat": 16, "carbs": 0.5, "fiber": 0, "sodium": 2200}'::jsonb),

('ING_ANDOUILLE', 'Andouille', 'andouille', 'proteins',
 'French tripe sausage from Vire or Guémené, smoked and served cold',
 '{"calories": 220, "protein": 19, "fat": 16, "carbs": 0.3, "fiber": 0, "sodium": 1100}'::jsonb),

('ING_ANDOUILLETTE', 'Andouillette', 'andouillette', 'proteins',
 'Coarse-grained French tripe sausage, typically grilled and served hot',
 '{"calories": 260, "protein": 17, "fat": 21, "carbs": 0.5, "fiber": 0, "sodium": 900}'::jsonb),

('ING_RILLETTES', 'Rillettes', 'rillettes', 'proteins',
 'Slow-cooked shredded pork or duck preserved in fat, spreadable',
 '{"calories": 435, "protein": 15, "fat": 42, "carbs": 0.1, "fiber": 0, "sodium": 900}'::jsonb),

('ING_PATE_CAMPAGNE', 'Pâté de Campagne', 'pate-campagne', 'proteins',
 'Rustic French country pâté with coarsely ground pork and liver',
 '{"calories": 330, "protein": 15, "fat": 30, "carbs": 2, "fiber": 0, "sodium": 850}'::jsonb),

('ING_SAUCISSE_TOULOUSE', 'Saucisse de Toulouse', 'saucisse-toulouse', 'proteins',
 'Fresh pork sausage from Toulouse, key ingredient in cassoulet',
 '{"calories": 328, "protein": 14, "fat": 30, "carbs": 0.6, "fiber": 0, "sodium": 900}'::jsonb),

('ING_BOUDIN_BLANC', 'Boudin Blanc', 'boudin-blanc', 'proteins',
 'French white sausage made with pork, milk, and eggs',
 '{"calories": 250, "protein": 12, "fat": 20, "carbs": 5, "fiber": 0, "sodium": 700}'::jsonb),

('ING_BOUDIN_NOIR', 'Boudin Noir', 'boudin-noir', 'proteins',
 'French blood sausage with pork blood, onions, and spices',
 '{"calories": 280, "protein": 14, "fat": 22, "carbs": 6, "fiber": 0, "sodium": 800}'::jsonb),

('ING_SAUCISSE_MORTEAU', 'Saucisse de Morteau', 'saucisse-morteau', 'proteins',
 'Smoked pork sausage from Franche-Comté, IGP protected',
 '{"calories": 340, "protein": 16, "fat": 30, "carbs": 1, "fiber": 0, "sodium": 1100}'::jsonb),

('ING_ROSETTE_LYON', 'Rosette de Lyon', 'rosette-lyon', 'proteins',
 'Large dry-cured sausage from Lyon, aged 2-3 months',
 '{"calories": 400, "protein": 25, "fat": 33, "carbs": 1, "fiber": 0, "sodium": 1700}'::jsonb),

('ING_TERRINE', 'Terrine', 'terrine', 'proteins',
 'French baked meat loaf, typically pork with liver and spices',
 '{"calories": 290, "protein": 14, "fat": 24, "carbs": 3, "fiber": 0, "sodium": 750}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SPAIN - Spanish Embutidos
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
-- Already exists: CHORIZO, JAMON_SERRANO, LOMO, MORCILLA, SOBRASADA
('ING_JAMON_IBERICO', 'Jamón Ibérico', 'jamon-iberico', 'proteins',
 'Premium Spanish ham from Iberian pigs, acorn-fed version is most prized',
 '{"calories": 300, "protein": 30, "fat": 20, "carbs": 0, "fiber": 0, "sodium": 2300}'::jsonb),

('ING_FUET', 'Fuet', 'fuet', 'proteins',
 'Thin Catalan dry-cured sausage, white mold rind, mild flavor',
 '{"calories": 464, "protein": 26, "fat": 38, "carbs": 2.4, "fiber": 0, "sodium": 1900}'::jsonb),

('ING_SALCHICHON', 'Salchichón', 'salchichon', 'proteins',
 'Spanish dry-cured sausage with black pepper, similar to Italian salami',
 '{"calories": 410, "protein": 24, "fat": 35, "carbs": 1, "fiber": 0, "sodium": 1700}'::jsonb),

('ING_BUTIFARRA', 'Butifarra', 'butifarra', 'proteins',
 'Catalan fresh or cured pork sausage, white or black varieties',
 '{"calories": 290, "protein": 18, "fat": 24, "carbs": 0.5, "fiber": 0, "sodium": 950}'::jsonb),

('ING_TXISTORRA', 'Txistorra', 'txistorra', 'proteins',
 'Thin Basque fresh chorizo sausage, typically grilled',
 '{"calories": 380, "protein": 20, "fat": 33, "carbs": 2, "fiber": 0, "sodium": 1200}'::jsonb),

('ING_LACÓN', 'Lacón', 'lacon', 'proteins',
 'Galician cured pork shoulder, smoked and boiled, similar to ham hock',
 '{"calories": 215, "protein": 25, "fat": 12, "carbs": 0, "fiber": 0, "sodium": 1800}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- GERMANY - German Wurst
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
('ING_BRATWURST', 'Bratwurst', 'bratwurst', 'proteins',
 'German grilled pork sausage, many regional varieties',
 '{"calories": 333, "protein": 13, "fat": 30, "carbs": 2, "fiber": 0, "sodium": 800}'::jsonb),

('ING_LEBERWURST', 'Leberwurst', 'leberwurst', 'proteins',
 'German liver sausage, spreadable pâté-style',
 '{"calories": 326, "protein": 14, "fat": 29, "carbs": 2, "fiber": 0, "sodium": 950}'::jsonb),

('ING_BOCKWURST', 'Bockwurst', 'bockwurst', 'proteins',
 'German veal and pork sausage, served with bock beer',
 '{"calories": 278, "protein": 11, "fat": 25, "carbs": 1, "fiber": 0, "sodium": 780}'::jsonb),

('ING_METTWURST', 'Mettwurst', 'mettwurst', 'proteins',
 'German spreadable smoked pork sausage, served raw on bread',
 '{"calories": 340, "protein": 14, "fat": 31, "carbs": 1, "fiber": 0, "sodium": 1100}'::jsonb),

('ING_BLUTWURST', 'Blutwurst', 'blutwurst', 'proteins',
 'German blood sausage with onions and barley',
 '{"calories": 285, "protein": 15, "fat": 23, "carbs": 3, "fiber": 0, "sodium": 720}'::jsonb),

('ING_FRANKFURTER', 'Frankfurter', 'frankfurter', 'proteins',
 'Frankfurt pork sausage in casing, smoked and scalded',
 '{"calories": 290, "protein": 12, "fat": 26, "carbs": 1, "fiber": 0, "sodium": 1000}'::jsonb),

('ING_KNACKWURST', 'Knackwurst', 'knackwurst', 'proteins',
 'German sausage with distinctive snap when bitten, garlic-flavored',
 '{"calories": 310, "protein": 12, "fat": 28, "carbs": 2, "fiber": 0, "sodium": 920}'::jsonb),

('ING_TEEWURST', 'Teewurst', 'teewurst', 'proteins',
 'German spreadable smoked pork sausage, traditionally served at teatime',
 '{"calories": 375, "protein": 15, "fat": 35, "carbs": 1, "fiber": 0, "sodium": 1050}'::jsonb),

('ING_WEISSWURST', 'Weisswurst', 'weisswurst', 'proteins',
 'Bavarian white sausage with veal and pork, served with sweet mustard',
 '{"calories": 260, "protein": 14, "fat": 22, "carbs": 1, "fiber": 0, "sodium": 650}'::jsonb),

('ING_CURRYWURST', 'Currywurst', 'currywurst', 'proteins',
 'German sliced sausage with curry ketchup sauce, Berlin specialty',
 '{"calories": 280, "protein": 12, "fat": 22, "carbs": 8, "fiber": 0, "sodium": 850}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- AUSTRIA, SWITZERLAND, NETHERLANDS, BELGIUM
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
-- Austria
('ING_KASEKRAINER', 'Käsekrainer', 'kasekrainer', 'proteins',
 'Austrian cheese-stuffed sausage, popular street food',
 '{"calories": 345, "protein": 16, "fat": 30, "carbs": 1, "fiber": 0, "sodium": 1100}'::jsonb),

('ING_EXTRAWURST', 'Extrawurst', 'extrawurst', 'proteins',
 'Austrian mild scalded sausage, often used in cold cuts',
 '{"calories": 265, "protein": 12, "fat": 23, "carbs": 2, "fiber": 0, "sodium": 900}'::jsonb),

('ING_TIROLER_SPECK', 'Tiroler Speck', 'tiroler-speck', 'proteins',
 'Tyrolean cured and smoked pork belly, IGP protected',
 '{"calories": 380, "protein": 19, "fat": 34, "carbs": 0, "fiber": 0, "sodium": 2000}'::jsonb),

-- Switzerland
('ING_CERVELAT', 'Cervelat', 'cervelat', 'proteins',
 'Swiss national sausage, pork and beef with bacon',
 '{"calories": 280, "protein": 12, "fat": 25, "carbs": 1, "fiber": 0, "sodium": 900}'::jsonb),

('ING_LANDJAGER', 'Landjäger', 'landjager', 'proteins',
 'Swiss/German semi-dry smoked sausage, popular hiking snack',
 '{"calories": 415, "protein": 23, "fat": 35, "carbs": 1, "fiber": 0, "sodium": 1600}'::jsonb),

('ING_SALSIZ', 'Salsiz', 'salsiz', 'proteins',
 'Swiss-Graubünden raw sausage, air-dried, similar to salami',
 '{"calories": 425, "protein": 24, "fat": 36, "carbs": 1, "fiber": 0, "sodium": 1750}'::jsonb),

('ING_BUNDNERFLEISCH', 'Bündnerfleisch', 'bundnerfleisch', 'proteins',
 'Swiss air-dried beef from Graubünden, similar to bresaola',
 '{"calories": 200, "protein": 36, "fat": 6, "carbs": 0, "fiber": 0, "sodium": 1900}'::jsonb),

-- Netherlands
('ING_FRIKANDEL', 'Frikandel', 'frikandel', 'proteins',
 'Dutch deep-fried skinless sausage, made from mixed meats',
 '{"calories": 220, "protein": 9, "fat": 15, "carbs": 12, "fiber": 0, "sodium": 650}'::jsonb),

('ING_GELDERSE_WORST', 'Gelderse Worst', 'gelderse-worst', 'proteins',
 'Dutch smoked pork sausage from Gelderland, often in stamppot',
 '{"calories": 295, "protein": 13, "fat": 26, "carbs": 1, "fiber": 0, "sodium": 1000}'::jsonb),

('ING_LEVERWORST', 'Leverworst', 'leverworst', 'proteins',
 'Dutch liver sausage, spreadable, similar to German leberwurst',
 '{"calories": 310, "protein": 13, "fat": 28, "carbs": 2, "fiber": 0, "sodium": 850}'::jsonb),

-- Belgium
('ING_JAMBON_ARDENNE', 'Jambon d''Ardenne', 'jambon-ardenne', 'proteins',
 'Belgian smoked and aged ham from the Ardennes region, IGP protected',
 '{"calories": 235, "protein": 28, "fat": 13, "carbs": 0, "fiber": 0, "sodium": 2100}'::jsonb),

('ING_BOUDIN_BLANC_LIEGE', 'Boudin Blanc de Liège', 'boudin-blanc-liege', 'proteins',
 'Belgian white sausage from Liège, Christmas specialty',
 '{"calories": 255, "protein": 13, "fat": 21, "carbs": 4, "fiber": 0, "sodium": 720}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- POLAND, RUSSIA, SCANDINAVIA, UK, BALKANS
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
-- Poland
('ING_KABANOS', 'Kabanos', 'kabanos', 'proteins',
 'Polish thin dry pork sausage, smoky and slightly sweet',
 '{"calories": 410, "protein": 25, "fat": 34, "carbs": 1, "fiber": 0, "sodium": 1650}'::jsonb),

('ING_MYSLIWSKA', 'Kiełbasa Myśliwska', 'mysliwska', 'proteins',
 'Polish hunter''s sausage with juniper, smoked and dried',
 '{"calories": 390, "protein": 23, "fat": 32, "carbs": 2, "fiber": 0, "sodium": 1550}'::jsonb),

('ING_KRAKOWSKA', 'Krakowska', 'krakowska', 'proteins',
 'Polish garlicky smoked sausage from Krakow',
 '{"calories": 320, "protein": 18, "fat": 27, "carbs": 1, "fiber": 0, "sodium": 1100}'::jsonb),

-- Russia
('ING_DOKTORSKAYA', 'Doktorskaya Kolbasa', 'doktorskaya', 'proteins',
 'Russian bologna-style sausage, created for dietary purposes in 1936',
 '{"calories": 250, "protein": 12, "fat": 22, "carbs": 2, "fiber": 0, "sodium": 850}'::jsonb),

('ING_KAZY', 'Kazy', 'kazy', 'proteins',
 'Central Asian horse meat sausage, traditional Kazakh delicacy',
 '{"calories": 340, "protein": 19, "fat": 29, "carbs": 0, "fiber": 0, "sodium": 1200}'::jsonb),

('ING_SALO', 'Salo', 'salo', 'fats',
 'Eastern European cured pork fat, often with garlic and herbs',
 '{"calories": 841, "protein": 1.5, "fat": 90, "carbs": 0, "fiber": 0, "sodium": 1500}'::jsonb),

-- Scandinavia
('ING_MEDISTERPOLSE', 'Medisterpølse', 'medisterpolse', 'proteins',
 'Danish coarsely ground pork sausage, pan-fried',
 '{"calories": 295, "protein": 14, "fat": 26, "carbs": 1, "fiber": 0, "sodium": 800}'::jsonb),

('ING_FALUKORV', 'Falukorv', 'falukorv', 'proteins',
 'Swedish smoked sausage, protected designation since 2001',
 '{"calories": 270, "protein": 11, "fat": 24, "carbs": 3, "fiber": 0, "sodium": 950}'::jsonb),

('ING_FENALAR', 'Fenalår', 'fenalar', 'proteins',
 'Norwegian cured leg of lamb, similar to prosciutto',
 '{"calories": 225, "protein": 33, "fat": 10, "carbs": 0, "fiber": 0, "sodium": 1800}'::jsonb),

('ING_RULLEPOLSE', 'Rullepølse', 'rullepolse', 'proteins',
 'Danish rolled spiced pork belly, sliced thin for smørrebrød',
 '{"calories": 310, "protein": 15, "fat": 27, "carbs": 1, "fiber": 0, "sodium": 1400}'::jsonb),

('ING_LEVERPOSTEJ', 'Leverpostej', 'leverpostej', 'proteins',
 'Danish liver pâté, essential for open-faced sandwiches',
 '{"calories": 285, "protein": 12, "fat": 25, "carbs": 3, "fiber": 0, "sodium": 750}'::jsonb),

-- UK/Ireland
('ING_CUMBERLAND_SAUSAGE', 'Cumberland Sausage', 'cumberland-sausage', 'proteins',
 'English coiled pork sausage with black pepper, PGI protected',
 '{"calories": 295, "protein": 13, "fat": 26, "carbs": 3, "fiber": 0, "sodium": 900}'::jsonb),

('ING_GAMMON', 'Gammon', 'gammon', 'proteins',
 'British cured or smoked ham, typically served as steak',
 '{"calories": 195, "protein": 24, "fat": 10, "carbs": 0, "fiber": 0, "sodium": 1600}'::jsonb),

('ING_BLACK_PUDDING', 'Black Pudding', 'black-pudding', 'proteins',
 'British blood sausage with oatmeal, breakfast staple',
 '{"calories": 297, "protein": 12, "fat": 22, "carbs": 14, "fiber": 2, "sodium": 750}'::jsonb),

('ING_WHITE_PUDDING', 'White Pudding', 'white-pudding', 'proteins',
 'Irish/Scottish oatmeal and pork fat sausage, no blood',
 '{"calories": 265, "protein": 7, "fat": 17, "carbs": 20, "fiber": 2, "sodium": 650}'::jsonb),

-- Balkans/Hungary
('ING_KULEN', 'Kulen', 'kulen', 'proteins',
 'Croatian spicy paprika sausage from Slavonia, similar to nduja',
 '{"calories": 400, "protein": 22, "fat": 34, "carbs": 2, "fiber": 0, "sodium": 1600}'::jsonb),

('ING_CEVAPI', 'Ćevapi', 'cevapi', 'proteins',
 'Balkan grilled minced meat sausages, served with onions',
 '{"calories": 280, "protein": 18, "fat": 22, "carbs": 1, "fiber": 0, "sodium": 650}'::jsonb),

('ING_GYULAI_KOLBASZ', 'Gyulai Kolbász', 'gyulai-kolbasz', 'proteins',
 'Hungarian smoked sausage from Gyula, PDO protected',
 '{"calories": 380, "protein": 20, "fat": 33, "carbs": 1, "fiber": 0, "sodium": 1400}'::jsonb),

('ING_CSABAI_KOLBASZ', 'Csabai Kolbász', 'csabai-kolbasz', 'proteins',
 'Hungarian smoked paprika sausage from Békéscsaba',
 '{"calories": 365, "protein": 19, "fat": 31, "carbs": 2, "fiber": 0, "sodium": 1350}'::jsonb),

('ING_TELISZALAMI', 'Téliszalámi', 'teliszalami', 'proteins',
 'Hungarian winter salami, premium aged pork sausage with white mold',
 '{"calories": 450, "protein": 26, "fat": 38, "carbs": 1, "fiber": 0, "sodium": 1800}'::jsonb),

('ING_LOUKANIKO', 'Loukaniko', 'loukaniko', 'proteins',
 'Greek pork sausage with orange zest and fennel',
 '{"calories": 310, "protein": 16, "fat": 27, "carbs": 1, "fiber": 0, "sodium": 900}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PORTUGAL, TURKEY, CAUCASUS, MIDDLE EAST
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
-- Portugal (some already exist: LINGUICA, CHOURICO, ALHEIRA)
('ING_PRESUNTO', 'Presunto', 'presunto', 'proteins',
 'Portuguese dry-cured ham, similar to Spanish jamón',
 '{"calories": 240, "protein": 27, "fat": 14, "carbs": 0, "fiber": 0, "sodium": 2000}'::jsonb),

('ING_PAIO', 'Paio', 'paio', 'proteins',
 'Portuguese smoked pork loin sausage with paprika',
 '{"calories": 320, "protein": 22, "fat": 25, "carbs": 1, "fiber": 0, "sodium": 1400}'::jsonb),

('ING_SALPICAO', 'Salpicão', 'salpicao', 'proteins',
 'Portuguese smoked pork loin sausage from Trás-os-Montes',
 '{"calories": 310, "protein": 24, "fat": 23, "carbs": 1, "fiber": 0, "sodium": 1500}'::jsonb),

('ING_FARINHEIRA', 'Farinheira', 'farinheira', 'proteins',
 'Portuguese smoked sausage with flour, traditional in feijoada',
 '{"calories": 280, "protein": 10, "fat": 22, "carbs": 12, "fiber": 1, "sodium": 1100}'::jsonb),

('ING_MORCELA_PT', 'Morcela', 'morcela-pt', 'proteins',
 'Portuguese blood sausage with rice and spices',
 '{"calories": 290, "protein": 12, "fat": 24, "carbs": 6, "fiber": 0, "sodium": 850}'::jsonb),

-- Turkey
('ING_SUCUK', 'Sucuk', 'sucuk', 'proteins',
 'Turkish dry-cured beef sausage with garlic and spices',
 '{"calories": 385, "protein": 20, "fat": 33, "carbs": 2, "fiber": 0, "sodium": 1300}'::jsonb),

('ING_PASTIRMA', 'Pastırma', 'pastirma', 'proteins',
 'Turkish air-dried cured beef coated in çemen paste',
 '{"calories": 230, "protein": 34, "fat": 10, "carbs": 1, "fiber": 0, "sodium": 2200}'::jsonb),

('ING_KAVURMA', 'Kavurma', 'kavurma', 'proteins',
 'Turkish preserved meat cooked in its own fat',
 '{"calories": 410, "protein": 25, "fat": 34, "carbs": 0, "fiber": 0, "sodium": 900}'::jsonb),

-- Caucasus
('ING_KUPATI', 'Kupati', 'kupati', 'proteins',
 'Georgian spiced pork sausage with pomegranate',
 '{"calories": 295, "protein": 17, "fat": 24, "carbs": 2, "fiber": 0, "sodium": 850}'::jsonb),

('ING_BASTURMA', 'Basturma', 'basturma', 'proteins',
 'Armenian air-dried cured beef with fenugreek coating',
 '{"calories": 240, "protein": 36, "fat": 10, "carbs": 2, "fiber": 0, "sodium": 2100}'::jsonb),

('ING_SUJUKH', 'Sujukh', 'sujukh', 'proteins',
 'Armenian sweet sausage of walnuts in grape molasses, churchkhela-style',
 '{"calories": 420, "protein": 8, "fat": 28, "carbs": 38, "fiber": 3, "sodium": 50}'::jsonb),

-- Middle East
('ING_MAKANEK', 'Makanek', 'makanek', 'proteins',
 'Lebanese small lamb sausages with pine nuts and pomegranate',
 '{"calories": 320, "protein": 16, "fat": 28, "carbs": 1, "fiber": 0, "sodium": 900}'::jsonb),

('ING_AWARMA', 'Awarma', 'awarma', 'proteins',
 'Lebanese preserved lamb in fat, similar to confit',
 '{"calories": 450, "protein": 22, "fat": 40, "carbs": 0, "fiber": 0, "sodium": 800}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- LATIN AMERICA
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
-- Brazil (PAIO already exists as ING_PAIO)
('ING_MORTADELA_BR', 'Mortadela Brasileira', 'mortadela-brasileira', 'proteins',
 'Brazilian mortadella, often with pistachios, served in sandwiches',
 '{"calories": 310, "protein": 13, "fat": 28, "carbs": 2, "fiber": 0, "sodium": 1100}'::jsonb),

('ING_COPA_LOMBO', 'Copa Lombo', 'copa-lombo', 'proteins',
 'Brazilian cured pork loin, similar to capocollo',
 '{"calories": 340, "protein": 24, "fat": 26, "carbs": 0, "fiber": 0, "sodium": 1500}'::jsonb),

-- Argentina
('ING_BONDIOLA', 'Bondiola', 'bondiola', 'proteins',
 'Argentine cured pork neck/shoulder, similar to coppa',
 '{"calories": 350, "protein": 22, "fat": 28, "carbs": 1, "fiber": 0, "sodium": 1450}'::jsonb),

('ING_CHORIZO_ARGENTINO', 'Chorizo Argentino', 'chorizo-argentino', 'proteins',
 'Argentine fresh pork sausage, essential for asado',
 '{"calories": 295, "protein": 14, "fat": 26, "carbs": 1, "fiber": 0, "sodium": 820}'::jsonb),

('ING_MORCILLA_ARGENTINA', 'Morcilla Argentina', 'morcilla-argentina', 'proteins',
 'Argentine blood sausage, usually sweet with nuts and raisins',
 '{"calories": 310, "protein": 11, "fat": 26, "carbs": 8, "fiber": 0, "sodium": 750}'::jsonb),

('ING_SALAME_TANDIL', 'Salame de Tandil', 'salame-tandil', 'proteins',
 'Argentine dry-cured salami from Tandil, Italian influence',
 '{"calories": 395, "protein": 24, "fat": 32, "carbs": 1, "fiber": 0, "sodium": 1600}'::jsonb),

-- Chile
('ING_LONGANIZA_CHILENA', 'Longaniza Chilena', 'longaniza-chilena', 'proteins',
 'Chilean fresh pork sausage, used in choripán',
 '{"calories": 290, "protein": 14, "fat": 25, "carbs": 1, "fiber": 0, "sodium": 850}'::jsonb),

('ING_PRIETA', 'Prieta', 'prieta', 'proteins',
 'Chilean blood sausage with rice and onions',
 '{"calories": 280, "protein": 11, "fat": 22, "carbs": 8, "fiber": 0, "sodium": 800}'::jsonb),

-- Colombia
('ING_CHORIZO_COLOMBIANO', 'Chorizo Colombiano', 'chorizo-colombiano', 'proteins',
 'Colombian pork sausage with potatoes and peas inside',
 '{"calories": 275, "protein": 13, "fat": 22, "carbs": 6, "fiber": 1, "sodium": 780}'::jsonb),

('ING_MORCILLA_COLOMBIANA', 'Morcilla Colombiana', 'morcilla-colombiana', 'proteins',
 'Colombian blood sausage with rice and peas',
 '{"calories": 260, "protein": 10, "fat": 19, "carbs": 12, "fiber": 1, "sodium": 720}'::jsonb),

('ING_BUTIFARRA_SOLEDEÑA', 'Butifarra Soledeña', 'butifarra-soledena', 'proteins',
 'Colombian sausage from Soledad, served with bollo and suero',
 '{"calories": 285, "protein": 15, "fat": 24, "carbs": 2, "fiber": 0, "sodium": 850}'::jsonb),

-- Venezuela
('ING_CHORIZO_VENEZOLANO', 'Chorizo Venezolano', 'chorizo-venezolano', 'proteins',
 'Venezuelan pork sausage, smoky and garlicky',
 '{"calories": 310, "protein": 14, "fat": 27, "carbs": 1, "fiber": 0, "sodium": 920}'::jsonb),

('ING_MORCILLA_VENEZOLANA', 'Morcilla Venezolana', 'morcilla-venezolana', 'proteins',
 'Venezuelan blood sausage with rice and raisins',
 '{"calories": 285, "protein": 10, "fat": 22, "carbs": 10, "fiber": 0, "sodium": 750}'::jsonb),

-- Peru
('ING_SALCHICHA_HUACHANA', 'Salchicha Huachana', 'salchicha-huachana', 'proteins',
 'Peruvian pork sausage from Huacho, often in sandwiches',
 '{"calories": 295, "protein": 14, "fat": 26, "carbs": 1, "fiber": 0, "sodium": 900}'::jsonb),

('ING_RELLENO_PE', 'Relleno Peruano', 'relleno-peruano', 'proteins',
 'Peruvian blood sausage, regional variations',
 '{"calories": 270, "protein": 12, "fat": 21, "carbs": 6, "fiber": 0, "sodium": 780}'::jsonb),

-- Mexico (CECINA already exists)
('ING_CHORIZO_MEXICANO', 'Chorizo Mexicano', 'chorizo-mexicano', 'proteins',
 'Mexican fresh pork sausage with chiles and vinegar',
 '{"calories": 340, "protein": 15, "fat": 30, "carbs": 2, "fiber": 0, "sodium": 950}'::jsonb),

('ING_LONGANIZA_MEXICANA', 'Longaniza Mexicana', 'longaniza-mexicana', 'proteins',
 'Mexican pork sausage, longer and thinner than chorizo',
 '{"calories": 310, "protein": 14, "fat": 27, "carbs": 2, "fiber": 0, "sodium": 900}'::jsonb),

('ING_MORONGA', 'Moronga', 'moronga', 'proteins',
 'Mexican blood sausage with chiles and herbs',
 '{"calories": 265, "protein": 13, "fat": 20, "carbs": 6, "fiber": 0, "sodium": 820}'::jsonb),

('ING_MACHACA', 'Machaca', 'machaca', 'proteins',
 'Mexican dried shredded beef, similar to jerky',
 '{"calories": 225, "protein": 42, "fat": 5, "carbs": 1, "fiber": 0, "sodium": 1800}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- ASIA & AFRICA
-- ============================================================================
INSERT INTO ingredients (id, name, slug, category, description, nutrition) VALUES
-- China
('ING_LAP_CHEONG', 'Lap Cheong', 'lap-cheong', 'proteins',
 'Chinese dried pork sausage, sweet and savory',
 '{"calories": 420, "protein": 18, "fat": 36, "carbs": 6, "fiber": 0, "sodium": 1100}'::jsonb),

('ING_LAP_YUK', 'Lap Yuk', 'lap-yuk', 'proteins',
 'Chinese cured pork belly, similar to bacon',
 '{"calories": 510, "protein": 12, "fat": 50, "carbs": 2, "fiber": 0, "sodium": 1300}'::jsonb),

-- Vietnam
('ING_NEM_CHUA', 'Nem Chua', 'nem-chua', 'proteins',
 'Vietnamese fermented pork roll with chili and garlic',
 '{"calories": 245, "protein": 18, "fat": 16, "carbs": 8, "fiber": 0, "sodium": 950}'::jsonb),

('ING_GIO_LUA', 'Giò Lụa', 'gio-lua', 'proteins',
 'Vietnamese pork roll wrapped in banana leaf, steamed',
 '{"calories": 190, "protein": 20, "fat": 11, "carbs": 2, "fiber": 0, "sodium": 750}'::jsonb),

-- Korea
('ING_SUNDAE', 'Sundae', 'sundae', 'proteins',
 'Korean blood sausage with glass noodles and vegetables',
 '{"calories": 250, "protein": 14, "fat": 16, "carbs": 14, "fiber": 1, "sodium": 650}'::jsonb),

-- Philippines
('ING_LONGGANISA', 'Longganisa', 'longganisa', 'proteins',
 'Filipino sweet or garlicky pork sausage, regional variations',
 '{"calories": 310, "protein": 14, "fat": 26, "carbs": 5, "fiber": 0, "sodium": 880}'::jsonb),

('ING_CHORIZO_CEBU', 'Chorizo de Cebu', 'chorizo-cebu', 'proteins',
 'Sweet Filipino pork sausage from Cebu',
 '{"calories": 295, "protein": 13, "fat": 24, "carbs": 6, "fiber": 0, "sodium": 820}'::jsonb),

-- Indonesia
('ING_URUTAN', 'Urutan', 'urutan', 'proteins',
 'Balinese smoked pork sausage with spices',
 '{"calories": 280, "protein": 16, "fat": 23, "carbs": 2, "fiber": 0, "sodium": 850}'::jsonb),

-- Morocco
('ING_KHLII', 'Khlii', 'khlii', 'proteins',
 'Moroccan preserved dried meat in fat, similar to confit',
 '{"calories": 420, "protein": 35, "fat": 30, "carbs": 0, "fiber": 0, "sodium": 1500}'::jsonb),

-- Ethiopia
('ING_QUANTA', 'Quanta', 'quanta', 'proteins',
 'Ethiopian dried beef jerky, used in kitfo and stews',
 '{"calories": 215, "protein": 45, "fat": 3, "carbs": 0, "fiber": 0, "sodium": 1600}'::jsonb),

-- Nigeria
('ING_KILISHI', 'Kilishi', 'kilishi', 'proteins',
 'Nigerian spiced dried beef, similar to jerky',
 '{"calories": 230, "protein": 48, "fat": 4, "carbs": 2, "fiber": 0, "sodium": 1400}'::jsonb),

-- South Africa
('ING_BILTONG', 'Biltong', 'biltong', 'proteins',
 'South African cured and dried beef, vinegar and spice marinade',
 '{"calories": 240, "protein": 52, "fat": 3, "carbs": 1, "fiber": 0, "sodium": 1200}'::jsonb),

('ING_DROEWORS', 'Droëwors', 'droewors', 'proteins',
 'South African dried sausage, made with beef and coriander',
 '{"calories": 380, "protein": 42, "fat": 22, "carbs": 2, "fiber": 0, "sodium": 1400}'::jsonb),

('ING_BOEREWORS', 'Boerewors', 'boerewors', 'proteins',
 'South African fresh coiled beef and pork sausage',
 '{"calories": 290, "protein": 15, "fat": 25, "carbs": 1, "fiber": 0, "sodium": 850}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- FIX: ING_PEPPERONI wrong category (was 'vegetables', should be 'proteins')
-- ============================================================================
UPDATE ingredients SET category = 'proteins' WHERE id = 'ING_PEPPERONI' AND category = 'vegetables';

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- SELECT COUNT(*) AS new_salumi FROM ingredients WHERE id LIKE 'ING_%' AND
--   (name ILIKE '%sausage%' OR name ILIKE '%salami%' OR name ILIKE '%ham%' OR
--    name ILIKE '%prosciutto%' OR name ILIKE '%chorizo%' OR name ILIKE '%saucisson%');
-- SELECT * FROM ingredients WHERE id IN ('ING_COPPA', 'ING_CULATELLO', 'ING_SAUCISSON_SEC', 'ING_JAMON_IBERICO');
