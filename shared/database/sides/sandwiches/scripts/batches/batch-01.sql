-- SANDWICHES Batch 1
-- Items: 1 to 10 of 50
-- Generated: 2025-12-15T12:52:44.857Z

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-panino-prosciutto-mozzarella', 'panino-prosciutto-mozzarella', '{"en":"Prosciutto & Mozzarella Panino","it":"Panino Prosciutto e Mozzarella","vi":"Bánh Mì Ý Prosciutto Mozzarella"}'::jsonb, '{"en":"Classic Italian panino with prosciutto crudo, fresh mozzarella, tomatoes, and basil on ciabatta","it":"Classico panino italiano con prosciutto crudo, mozzarella fresca, pomodori e basilico su ciabatta","vi":"Bánh mì Ý cổ điển với prosciutto, mozzarella tươi, cà chua và húng quế trên bánh ciabatta"}'::jsonb, NULL, 'classic', 'italian', '{"italian","cold","prosciutto","classic"}', 'ciabatta', false, false, '{"prosciutto_crudo"}', '{"mozzarella_fresh"}', '{"tomato","basil"}', '{"olive_oil","balsamic_glaze"}', false, false, '{"country":"Italy","country_code":"IT","region":"Various"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["prosecco","sparkling_water"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk"],"calories_estimate":480,"protein_g":28,"carbs_g":42,"fat_g":22,"fiber_g":3}'::jsonb, NULL, '{}', 92, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-piadina-romagnola', 'piadina-romagnola', '{"en":"Piadina Romagnola","it":"Piadina Romagnola","vi":"Piadina Romagnola"}'::jsonb, '{"en":"Traditional flatbread from Romagna filled with squacquerone cheese, prosciutto crudo, and arugula","it":"Tradizionale piadina romagnola farcita con squacquerone, prosciutto crudo e rucola","vi":"Bánh dẹt truyền thống vùng Romagna nhân phô mai squacquerone, prosciutto và rau arugula"}'::jsonb, NULL, 'traditional', 'italian', '{"italian","romagna","piadina","traditional"}', 'piadina', false, true, '{"prosciutto_crudo"}', '{"squacquerone"}', '{"arugula"}', '{}', true, false, '{"country":"Italy","country_code":"IT","region":"Emilia-Romagna"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["sangiovese","lambrusco"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk"],"calories_estimate":520,"protein_g":26,"carbs_g":48,"fat_g":24,"fiber_g":2}'::jsonb, NULL, '{}', 88, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-focaccia-di-recco', 'focaccia-di-recco', '{"en":"Focaccia di Recco","it":"Focaccia di Recco","vi":"Focaccia di Recco"}'::jsonb, '{"en":"Thin crispy focaccia from Recco filled with creamy stracchino cheese","it":"Sottile focaccia croccante di Recco ripiena di cremoso stracchino","vi":"Bánh focaccia mỏng giòn từ Recco nhân phô mai stracchino kem"}'::jsonb, NULL, 'traditional', 'italian', '{"italian","liguria","focaccia","vegetarian","cheese"}', 'focaccia_thin', false, false, '{}', '{"stracchino"}', '{}', '{}', true, false, '{"country":"Italy","country_code":"IT","region":"Liguria","city":"Recco"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":true,"recommended_pairing":["vermentino","prosecco"]}'::jsonb, '{"is_vegetarian":true,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":false,"allergens":["gluten","milk"],"calories_estimate":380,"protein_g":14,"carbs_g":38,"fat_g":18,"fiber_g":2}'::jsonb, NULL, '{}', 82, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-tramezzino-classico', 'tramezzino-classico', '{"en":"Classic Tramezzino","it":"Tramezzino Classico","vi":"Tramezzino Cổ Điển"}'::jsonb, '{"en":"Soft crustless white bread triangle sandwich with tuna, mayonnaise, and capers - Venetian classic","it":"Morbido tramezzino triangolare senza crosta con tonno, maionese e capperi - classico veneziano","vi":"Bánh mì trắng mềm tam giác không vỏ với cá ngừ, mayonnaise và nụ bạch hoa - cổ điển Venice"}'::jsonb, NULL, 'classic', 'italian', '{"italian","venice","tramezzino","tuna","aperitivo"}', 'white_bread_crustless', false, false, '{"tuna"}', '{}', '{"capers"}', '{"mayonnaise"}', false, false, '{"country":"Italy","country_code":"IT","region":"Veneto","city":"Venice"}'::jsonb, NULL, '{"portion_size":"small","is_shareable":false,"recommended_pairing":["prosecco","spritz"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","fish","eggs"],"calories_estimate":320,"protein_g":18,"carbs_g":28,"fat_g":16,"fiber_g":1}'::jsonb, NULL, '{}', 78, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-panino-porchetta', 'panino-porchetta', '{"en":"Porchetta Panino","it":"Panino con Porchetta","vi":"Bánh Mì Porchetta"}'::jsonb, '{"en":"Rustic panino with slow-roasted porchetta, crispy skin, and salsa verde on rosetta bread","it":"Rustico panino con porchetta arrosto, pelle croccante e salsa verde su rosetta","vi":"Bánh mì mộc mạc với thịt heo quay porchetta, da giòn và sốt salsa verde trên bánh rosetta"}'::jsonb, NULL, 'traditional', 'italian', '{"italian","porchetta","pork","street_food","lazio"}', 'rosetta', false, false, '{"porchetta"}', '{}', '{}', '{"salsa_verde"}', true, false, '{"country":"Italy","country_code":"IT","region":"Lazio / Umbria"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["red_wine","beer"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten"],"calories_estimate":580,"protein_g":35,"carbs_g":45,"fat_g":28,"fiber_g":2}'::jsonb, NULL, '{}', 85, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-panino-caprese', 'panino-caprese', '{"en":"Caprese Panino","it":"Panino Caprese","vi":"Bánh Mì Caprese"}'::jsonb, '{"en":"Fresh mozzarella, ripe tomatoes, basil, and extra virgin olive oil on ciabatta","it":"Mozzarella fresca, pomodori maturi, basilico e olio extravergine su ciabatta","vi":"Mozzarella tươi, cà chua chín, húng quế và dầu olive nguyên chất trên bánh ciabatta"}'::jsonb, NULL, 'classic', 'italian', '{"italian","vegetarian","caprese","fresh","summer"}', 'ciabatta', false, false, '{}', '{"mozzarella_fresh"}', '{"tomato","basil"}', '{"olive_oil","balsamic_glaze"}', false, false, '{"country":"Italy","country_code":"IT","region":"Campania","city":"Capri"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","prosecco"]}'::jsonb, '{"is_vegetarian":true,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":false,"allergens":["gluten","milk"],"calories_estimate":420,"protein_g":18,"carbs_g":40,"fat_g":22,"fiber_g":3}'::jsonb, NULL, '{}', 90, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-panino-mortadella', 'panino-mortadella', '{"en":"Mortadella Panino","it":"Panino con Mortadella","vi":"Bánh Mì Mortadella"}'::jsonb, '{"en":"Thick slices of authentic Bologna mortadella with pistachios on fresh focaccia","it":"Fette spesse di autentica mortadella di Bologna con pistacchi su focaccia fresca","vi":"Lát dày mortadella Bologna chính gốc với hạt dẻ cười trên bánh focaccia tươi"}'::jsonb, NULL, 'classic', 'italian', '{"italian","bologna","mortadella","classic"}', 'focaccia', false, false, '{"mortadella"}', '{}', '{}', '{}', false, false, '{"country":"Italy","country_code":"IT","region":"Emilia-Romagna","city":"Bologna"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["lambrusco","prosecco"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":false,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","pistachios"],"calories_estimate":520,"protein_g":22,"carbs_g":44,"fat_g":28,"fiber_g":2}'::jsonb, NULL, '{}', 86, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-panino-salame-toscano', 'panino-salame-toscano', '{"en":"Tuscan Salami Panino","it":"Panino con Salame Toscano","vi":"Bánh Mì Salami Tuscany"}'::jsonb, '{"en":"Tuscan salami with pecorino cheese and unsalted Tuscan bread","it":"Salame toscano con pecorino e pane toscano senza sale","vi":"Salami Tuscan với phô mai pecorino và bánh mì Tuscan không muối"}'::jsonb, NULL, 'traditional', 'italian', '{"italian","tuscany","salami","pecorino","traditional"}', 'tuscan_bread', false, false, '{"salame_toscano"}', '{"pecorino"}', '{}', '{}', false, false, '{"country":"Italy","country_code":"IT","region":"Tuscany"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["chianti","red_wine"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk"],"calories_estimate":490,"protein_g":26,"carbs_g":38,"fat_g":26,"fiber_g":2}'::jsonb, NULL, '{}', 80, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-panino-lampredotto', 'panino-lampredotto', '{"en":"Lampredotto Panino","it":"Panino col Lampredotto","vi":"Bánh Mì Lampredotto"}'::jsonb, '{"en":"Florentine street food: slow-cooked tripe in broth, served on semelle bread with salsa verde","it":"Street food fiorentino: trippa cotta lentamente in brodo, servita su semelle con salsa verde","vi":"Món đường phố Florence: dạ dày bò hầm trong nước dùng, phục vụ trên bánh semelle với salsa verde"}'::jsonb, NULL, 'traditional', 'italian', '{"italian","florence","street_food","tripe","traditional"}', 'semelle', false, false, '{"lampredotto"}', '{}', '{}', '{"salsa_verde","spicy_sauce"}', true, false, '{"country":"Italy","country_code":"IT","region":"Tuscany","city":"Florence"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["chianti","red_wine"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":true,"is_nut_free":true,"is_halal":false,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten"],"calories_estimate":420,"protein_g":28,"carbs_g":42,"fat_g":14,"fiber_g":2}'::jsonb, NULL, '{}', 72, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();

INSERT INTO sandwiches (id, slug, name, description, tagline, status, style, tags, bread_type, bread_is_toasted, bread_is_grilled, proteins, cheeses, vegetables, condiments, is_hot, is_pressed, origin, history, serving, dietary, customization, variations, popularity, related_sandwiches, media, pricing)
VALUES ('sandwich-panino-bresaola', 'panino-bresaola', '{"en":"Bresaola & Rucola Panino","it":"Panino Bresaola e Rucola","vi":"Bánh Mì Bresaola Rucola"}'::jsonb, '{"en":"Air-dried beef bresaola with arugula, shaved parmesan, lemon, and olive oil on ciabatta","it":"Bresaola stagionata con rucola, scaglie di parmigiano, limone e olio su ciabatta","vi":"Thịt bò khô bresaola với rau arugula, parmesan bào, chanh và dầu olive trên bánh ciabatta"}'::jsonb, NULL, 'classic', 'italian', '{"italian","bresaola","healthy","lean","lombardy"}', 'ciabatta', false, false, '{"bresaola"}', '{"parmesan"}', '{"arugula"}', '{"olive_oil","lemon_juice"}', false, false, '{"country":"Italy","country_code":"IT","region":"Lombardy","city":"Valtellina"}'::jsonb, NULL, '{"portion_size":"regular","is_shareable":false,"recommended_pairing":["white_wine","prosecco"]}'::jsonb, '{"is_vegetarian":false,"is_vegan":false,"is_gluten_free":false,"is_dairy_free":false,"is_nut_free":true,"is_halal":true,"is_kosher":false,"is_low_carb":false,"is_keto_friendly":false,"is_high_protein":true,"allergens":["gluten","milk"],"calories_estimate":380,"protein_g":32,"carbs_g":36,"fat_g":12,"fiber_g":2}'::jsonb, NULL, '{}', 84, '{}', NULL, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();