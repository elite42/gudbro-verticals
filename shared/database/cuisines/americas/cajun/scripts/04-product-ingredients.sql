-- Cajun/Creole Cuisine - Product Ingredients
-- GUDBRO Database Standards v1.7
-- Links dishes to ingredients with quantities

-- Clear existing links for cajun
DELETE FROM product_ingredients WHERE product_type = 'cajun';

-- =====================
-- GUMBO
-- =====================

-- CAJ_CHICKEN_ANDOUILLE_GUMBO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_CHICKEN_THIGH', 500, 'g', 'main', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_ANDOUILLE', 250, 'g', 'main', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_FLOUR', 100, 'g', 'secondary', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_VEGETABLE_OIL', 100, 'ml', 'secondary', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_ONION', 200, 'g', 'secondary', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_CELERY', 100, 'g', 'secondary', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_BELL_PEPPER', 150, 'g', 'secondary', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_OKRA', 200, 'g', 'secondary', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_GARLIC', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_CHICKEN_BROTH', 1500, 'ml', 'secondary', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_CAJUN_SEASONING', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_BAY_LEAF', 2, 'unit', 'seasoning', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_THYME', 5, 'g', 'seasoning', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_FILE_POWDER', 10, 'g', 'seasoning', true),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_RICE', 300, 'g', 'secondary', false),
('cajun', 'CAJ_CHICKEN_ANDOUILLE_GUMBO', 'ING_SCALLION', 30, 'g', 'garnish', false);

-- CAJ_SEAFOOD_GUMBO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_SHRIMP', 300, 'g', 'main', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_BLUE_CRAB', 250, 'g', 'main', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_OYSTER', 150, 'g', 'main', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_FLOUR', 80, 'g', 'secondary', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_VEGETABLE_OIL', 80, 'ml', 'secondary', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_ONION', 200, 'g', 'secondary', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_CELERY', 100, 'g', 'secondary', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_BELL_PEPPER', 150, 'g', 'secondary', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_OKRA', 150, 'g', 'secondary', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_GARLIC', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_FISH_STOCK', 1500, 'ml', 'secondary', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_TOMATO', 200, 'g', 'secondary', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_CAJUN_SEASONING', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_SEAFOOD_GUMBO', 'ING_RICE', 300, 'g', 'secondary', false);

-- CAJ_GUMBO_ZHERBES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_TASSO', 200, 'g', 'main', true),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_COLLARD_GREENS', 200, 'g', 'main', false),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_MUSTARD_GREENS', 150, 'g', 'main', false),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_SPINACH', 150, 'g', 'main', false),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_CABBAGE', 150, 'g', 'main', false),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_FLOUR', 60, 'g', 'secondary', false),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_VEGETABLE_OIL', 60, 'ml', 'secondary', false),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_ONION', 150, 'g', 'secondary', false),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_GARLIC', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_CHICKEN_BROTH', 1200, 'ml', 'secondary', false),
('cajun', 'CAJ_GUMBO_ZHERBES', 'ING_RICE', 300, 'g', 'secondary', false);

-- =====================
-- RICE DISHES
-- =====================

-- CAJ_JAMBALAYA_CAJUN
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_CHICKEN_THIGH', 400, 'g', 'main', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_ANDOUILLE', 300, 'g', 'main', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_RICE', 400, 'g', 'main', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_ONION', 200, 'g', 'secondary', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_CELERY', 100, 'g', 'secondary', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_BELL_PEPPER', 150, 'g', 'secondary', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_GARLIC', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_CHICKEN_BROTH', 700, 'ml', 'secondary', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_CAJUN_SEASONING', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_BAY_LEAF', 2, 'unit', 'seasoning', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_THYME', 5, 'g', 'seasoning', false),
('cajun', 'CAJ_JAMBALAYA_CAJUN', 'ING_SCALLION', 30, 'g', 'garnish', false);

-- CAJ_JAMBALAYA_CREOLE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_SHRIMP', 300, 'g', 'main', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_CHICKEN_THIGH', 300, 'g', 'main', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_ANDOUILLE', 250, 'g', 'main', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_RICE', 400, 'g', 'main', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_ONION', 200, 'g', 'secondary', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_CELERY', 100, 'g', 'secondary', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_BELL_PEPPER', 150, 'g', 'secondary', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_TOMATO', 300, 'g', 'secondary', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_TOMATO_PASTE', 30, 'g', 'seasoning', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_GARLIC', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_CHICKEN_BROTH', 600, 'ml', 'secondary', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_CAJUN_SEASONING', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_JAMBALAYA_CREOLE', 'ING_SCALLION', 30, 'g', 'garnish', false);

-- CAJ_RED_BEANS_RICE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_KIDNEY_BEANS', 500, 'g', 'main', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_HAM_HOCK', 300, 'g', 'main', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_ANDOUILLE', 200, 'g', 'secondary', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_ONION', 200, 'g', 'secondary', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_CELERY', 100, 'g', 'secondary', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_BELL_PEPPER', 100, 'g', 'secondary', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_GARLIC', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_BAY_LEAF', 2, 'unit', 'seasoning', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_THYME', 5, 'g', 'seasoning', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_CAYENNE', 3, 'g', 'seasoning', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_RICE', 400, 'g', 'secondary', false),
('cajun', 'CAJ_RED_BEANS_RICE', 'ING_SCALLION', 30, 'g', 'garnish', false);

-- CAJ_DIRTY_RICE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_DIRTY_RICE', 'ING_CHICKEN_LIVER', 200, 'g', 'main', false),
('cajun', 'CAJ_DIRTY_RICE', 'ING_GROUND_PORK', 250, 'g', 'main', false),
('cajun', 'CAJ_DIRTY_RICE', 'ING_RICE', 400, 'g', 'main', false),
('cajun', 'CAJ_DIRTY_RICE', 'ING_ONION', 150, 'g', 'secondary', false),
('cajun', 'CAJ_DIRTY_RICE', 'ING_CELERY', 80, 'g', 'secondary', false),
('cajun', 'CAJ_DIRTY_RICE', 'ING_BELL_PEPPER', 100, 'g', 'secondary', false),
('cajun', 'CAJ_DIRTY_RICE', 'ING_GARLIC', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_DIRTY_RICE', 'ING_CHICKEN_BROTH', 500, 'ml', 'secondary', false),
('cajun', 'CAJ_DIRTY_RICE', 'ING_CAJUN_SEASONING', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_DIRTY_RICE', 'ING_SCALLION', 30, 'g', 'garnish', false);

-- =====================
-- SEAFOOD
-- =====================

-- CAJ_CRAWFISH_ETOUFFEE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_CRAWFISH', 500, 'g', 'main', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_BUTTER', 100, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_FLOUR', 40, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_ONION', 200, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_CELERY', 100, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_BELL_PEPPER', 100, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_GARLIC', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_TOMATO_PASTE', 30, 'g', 'seasoning', true),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_CHICKEN_BROTH', 400, 'ml', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_CAJUN_SEASONING', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_WORCESTERSHIRE', 15, 'ml', 'seasoning', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_RICE', 300, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_ETOUFFEE', 'ING_SCALLION', 30, 'g', 'garnish', false);

-- CAJ_SHRIMP_CREOLE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_SHRIMP', 500, 'g', 'main', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_TOMATO', 400, 'g', 'main', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_TOMATO_PASTE', 45, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_ONION', 200, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_CELERY', 100, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_BELL_PEPPER', 150, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_GARLIC', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_CAJUN_SEASONING', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_BAY_LEAF', 2, 'unit', 'seasoning', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_TABASCO', 5, 'ml', 'seasoning', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_RICE', 300, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_CREOLE', 'ING_PARSLEY', 20, 'g', 'garnish', false);

-- CAJ_CRAWFISH_BOIL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_CRAWFISH', 2000, 'g', 'main', false),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_CORN', 4, 'unit', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_POTATO', 500, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_ONION', 300, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_GARLIC', 50, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_LEMON', 3, 'unit', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_CAJUN_SEASONING', 100, 'g', 'seasoning', false),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_CAYENNE', 30, 'g', 'seasoning', false),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_BAY_LEAF', 5, 'unit', 'seasoning', false),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_ANDOUILLE', 300, 'g', 'secondary', true),
('cajun', 'CAJ_CRAWFISH_BOIL', 'ING_BUTTER', 100, 'g', 'garnish', true);

-- CAJ_BBQ_SHRIMP
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_BBQ_SHRIMP', 'ING_SHRIMP', 600, 'g', 'main', false),
('cajun', 'CAJ_BBQ_SHRIMP', 'ING_BUTTER', 150, 'g', 'main', false),
('cajun', 'CAJ_BBQ_SHRIMP', 'ING_WORCESTERSHIRE', 60, 'ml', 'seasoning', false),
('cajun', 'CAJ_BBQ_SHRIMP', 'ING_GARLIC', 30, 'g', 'seasoning', false),
('cajun', 'CAJ_BBQ_SHRIMP', 'ING_BLACK_PEPPER', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_BBQ_SHRIMP', 'ING_LEMON_JUICE', 30, 'ml', 'seasoning', false),
('cajun', 'CAJ_BBQ_SHRIMP', 'ING_TABASCO', 10, 'ml', 'seasoning', false),
('cajun', 'CAJ_BBQ_SHRIMP', 'ING_ROSEMARY', 5, 'g', 'seasoning', false),
('cajun', 'CAJ_BBQ_SHRIMP', 'ING_BAGUETTE', 1, 'unit', 'secondary', false);

-- CAJ_OYSTERS_ROCKEFELLER
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_OYSTERS_ROCKEFELLER', 'ING_OYSTER', 24, 'unit', 'main', false),
('cajun', 'CAJ_OYSTERS_ROCKEFELLER', 'ING_BUTTER', 100, 'g', 'secondary', false),
('cajun', 'CAJ_OYSTERS_ROCKEFELLER', 'ING_SPINACH', 200, 'g', 'secondary', false),
('cajun', 'CAJ_OYSTERS_ROCKEFELLER', 'ING_SCALLION', 50, 'g', 'secondary', false),
('cajun', 'CAJ_OYSTERS_ROCKEFELLER', 'ING_PARSLEY', 30, 'g', 'secondary', false),
('cajun', 'CAJ_OYSTERS_ROCKEFELLER', 'ING_BREADCRUMBS', 50, 'g', 'secondary', false),
('cajun', 'CAJ_OYSTERS_ROCKEFELLER', 'ING_PERNOD', 30, 'ml', 'seasoning', false),
('cajun', 'CAJ_OYSTERS_ROCKEFELLER', 'ING_TABASCO', 5, 'ml', 'seasoning', false),
('cajun', 'CAJ_OYSTERS_ROCKEFELLER', 'ING_LEMON', 1, 'unit', 'garnish', false);

-- CAJ_FRIED_CATFISH
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_FRIED_CATFISH', 'ING_CATFISH', 600, 'g', 'main', false),
('cajun', 'CAJ_FRIED_CATFISH', 'ING_CORNMEAL', 200, 'g', 'secondary', false),
('cajun', 'CAJ_FRIED_CATFISH', 'ING_CAJUN_SEASONING', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_FRIED_CATFISH', 'ING_BUTTERMILK', 250, 'ml', 'secondary', false),
('cajun', 'CAJ_FRIED_CATFISH', 'ING_VEGETABLE_OIL', 500, 'ml', 'secondary', false),
('cajun', 'CAJ_FRIED_CATFISH', 'ING_LEMON', 2, 'unit', 'garnish', false),
('cajun', 'CAJ_FRIED_CATFISH', 'ING_TARTAR_SAUCE', 100, 'g', 'secondary', false);

-- CAJ_CRAB_CAKES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_CRAB_CAKES', 'ING_BLUE_CRAB', 400, 'g', 'main', false),
('cajun', 'CAJ_CRAB_CAKES', 'ING_MAYONNAISE', 60, 'g', 'secondary', false),
('cajun', 'CAJ_CRAB_CAKES', 'ING_EGG', 1, 'unit', 'secondary', false),
('cajun', 'CAJ_CRAB_CAKES', 'ING_BREADCRUMBS', 60, 'g', 'secondary', false),
('cajun', 'CAJ_CRAB_CAKES', 'ING_CREOLE_MUSTARD', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_CRAB_CAKES', 'ING_CAJUN_SEASONING', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_CRAB_CAKES', 'ING_SCALLION', 30, 'g', 'secondary', false),
('cajun', 'CAJ_CRAB_CAKES', 'ING_BUTTER', 50, 'g', 'secondary', false),
('cajun', 'CAJ_CRAB_CAKES', 'ING_REMOULADE', 100, 'g', 'secondary', false);

-- CAJ_CRAWFISH_PIE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_CRAWFISH', 400, 'g', 'main', false),
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_BUTTER', 80, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_FLOUR', 40, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_ONION', 150, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_CELERY', 80, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_BELL_PEPPER', 80, 'g', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_HEAVY_CREAM', 200, 'ml', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_CAJUN_SEASONING', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_PIE_CRUST', 2, 'unit', 'secondary', false),
('cajun', 'CAJ_CRAWFISH_PIE', 'ING_SCALLION', 20, 'g', 'garnish', false);

-- =====================
-- SANDWICHES
-- =====================

-- CAJ_SHRIMP_POBOY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_SHRIMP', 250, 'g', 'main', false),
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_BAGUETTE', 1, 'unit', 'main', false),
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_CORNMEAL', 100, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_FLOUR', 50, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_CAJUN_SEASONING', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_VEGETABLE_OIL', 400, 'ml', 'secondary', false),
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_LETTUCE', 50, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_TOMATO', 80, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_REMOULADE', 60, 'g', 'secondary', false),
('cajun', 'CAJ_SHRIMP_POBOY', 'ING_DILL_PICKLE', 30, 'g', 'secondary', true);

-- CAJ_OYSTER_POBOY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_OYSTER_POBOY', 'ING_OYSTER', 200, 'g', 'main', false),
('cajun', 'CAJ_OYSTER_POBOY', 'ING_BAGUETTE', 1, 'unit', 'main', false),
('cajun', 'CAJ_OYSTER_POBOY', 'ING_CORNMEAL', 100, 'g', 'secondary', false),
('cajun', 'CAJ_OYSTER_POBOY', 'ING_FLOUR', 50, 'g', 'secondary', false),
('cajun', 'CAJ_OYSTER_POBOY', 'ING_CAJUN_SEASONING', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_OYSTER_POBOY', 'ING_VEGETABLE_OIL', 400, 'ml', 'secondary', false),
('cajun', 'CAJ_OYSTER_POBOY', 'ING_LETTUCE', 50, 'g', 'secondary', false),
('cajun', 'CAJ_OYSTER_POBOY', 'ING_TOMATO', 80, 'g', 'secondary', false),
('cajun', 'CAJ_OYSTER_POBOY', 'ING_TABASCO', 5, 'ml', 'seasoning', true);

-- CAJ_ROAST_BEEF_POBOY
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_BEEF_CHUCK', 1000, 'g', 'main', false),
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_BAGUETTE', 4, 'unit', 'main', false),
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_ONION', 200, 'g', 'secondary', false),
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_GARLIC', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_BEEF_BROTH', 500, 'ml', 'secondary', false),
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_CAJUN_SEASONING', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_WORCESTERSHIRE', 30, 'ml', 'seasoning', false),
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_LETTUCE', 80, 'g', 'secondary', true),
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_TOMATO', 100, 'g', 'secondary', true),
('cajun', 'CAJ_ROAST_BEEF_POBOY', 'ING_MAYONNAISE', 60, 'g', 'secondary', true);

-- CAJ_MUFFULETTA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_MUFFULETTA', 'ING_BREAD', 1, 'unit', 'main', false),
('cajun', 'CAJ_MUFFULETTA', 'ING_MORTADELLA', 100, 'g', 'main', false),
('cajun', 'CAJ_MUFFULETTA', 'ING_SALAMI', 100, 'g', 'main', false),
('cajun', 'CAJ_MUFFULETTA', 'ING_HAM', 100, 'g', 'main', false),
('cajun', 'CAJ_MUFFULETTA', 'ING_PROVOLONE', 100, 'g', 'secondary', false),
('cajun', 'CAJ_MUFFULETTA', 'ING_MOZZARELLA', 80, 'g', 'secondary', false),
('cajun', 'CAJ_MUFFULETTA', 'ING_OLIVE', 100, 'g', 'secondary', false),
('cajun', 'CAJ_MUFFULETTA', 'ING_GIARDINIERA', 80, 'g', 'secondary', false),
('cajun', 'CAJ_MUFFULETTA', 'ING_OLIVE_OIL', 30, 'ml', 'seasoning', false),
('cajun', 'CAJ_MUFFULETTA', 'ING_GARLIC', 10, 'g', 'seasoning', false);

-- =====================
-- MEAT
-- =====================

-- CAJ_BOUDIN
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_BOUDIN', 'ING_PORK_SHOULDER', 500, 'g', 'main', false),
('cajun', 'CAJ_BOUDIN', 'ING_PORK_LIVER', 200, 'g', 'main', false),
('cajun', 'CAJ_BOUDIN', 'ING_RICE', 300, 'g', 'main', false),
('cajun', 'CAJ_BOUDIN', 'ING_ONION', 200, 'g', 'secondary', false),
('cajun', 'CAJ_BOUDIN', 'ING_CELERY', 100, 'g', 'secondary', false),
('cajun', 'CAJ_BOUDIN', 'ING_BELL_PEPPER', 100, 'g', 'secondary', false),
('cajun', 'CAJ_BOUDIN', 'ING_GARLIC', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_BOUDIN', 'ING_SCALLION', 50, 'g', 'secondary', false),
('cajun', 'CAJ_BOUDIN', 'ING_CAJUN_SEASONING', 25, 'g', 'seasoning', false),
('cajun', 'CAJ_BOUDIN', 'ING_SAUSAGE_CASING', 2, 'meter', 'secondary', false);

-- CAJ_BOUDIN_BALLS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_PORK_SHOULDER', 400, 'g', 'main', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_PORK_LIVER', 150, 'g', 'main', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_RICE', 250, 'g', 'main', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_ONION', 150, 'g', 'secondary', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_CELERY', 80, 'g', 'secondary', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_CAJUN_SEASONING', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_FLOUR', 100, 'g', 'secondary', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_EGG', 2, 'unit', 'secondary', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_BREADCRUMBS', 150, 'g', 'secondary', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_VEGETABLE_OIL', 500, 'ml', 'secondary', false),
('cajun', 'CAJ_BOUDIN_BALLS', 'ING_CREOLE_MUSTARD', 60, 'g', 'secondary', false);

-- CAJ_GRILLADES_GRITS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_BEEF', 600, 'g', 'main', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_GRITS', 200, 'g', 'main', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_TOMATO', 300, 'g', 'secondary', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_ONION', 150, 'g', 'secondary', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_CELERY', 80, 'g', 'secondary', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_BELL_PEPPER', 100, 'g', 'secondary', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_GARLIC', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_BEEF_BROTH', 300, 'ml', 'secondary', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_BUTTER', 60, 'g', 'secondary', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_HEAVY_CREAM', 100, 'ml', 'secondary', false),
('cajun', 'CAJ_GRILLADES_GRITS', 'ING_CAJUN_SEASONING', 15, 'g', 'seasoning', false);

-- CAJ_FRIED_ALLIGATOR
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_FRIED_ALLIGATOR', 'ING_ALLIGATOR', 500, 'g', 'main', false),
('cajun', 'CAJ_FRIED_ALLIGATOR', 'ING_BUTTERMILK', 250, 'ml', 'secondary', false),
('cajun', 'CAJ_FRIED_ALLIGATOR', 'ING_FLOUR', 150, 'g', 'secondary', false),
('cajun', 'CAJ_FRIED_ALLIGATOR', 'ING_CAJUN_SEASONING', 20, 'g', 'seasoning', false),
('cajun', 'CAJ_FRIED_ALLIGATOR', 'ING_GARLIC_POWDER', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_FRIED_ALLIGATOR', 'ING_VEGETABLE_OIL', 500, 'ml', 'secondary', false),
('cajun', 'CAJ_FRIED_ALLIGATOR', 'ING_REMOULADE', 80, 'g', 'secondary', false),
('cajun', 'CAJ_FRIED_ALLIGATOR', 'ING_LEMON', 2, 'unit', 'garnish', false);

-- CAJ_BLACKENED_CHICKEN
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_BLACKENED_CHICKEN', 'ING_CHICKEN_BREAST', 600, 'g', 'main', false),
('cajun', 'CAJ_BLACKENED_CHICKEN', 'ING_BUTTER', 100, 'g', 'secondary', false),
('cajun', 'CAJ_BLACKENED_CHICKEN', 'ING_CAJUN_SEASONING', 30, 'g', 'seasoning', false),
('cajun', 'CAJ_BLACKENED_CHICKEN', 'ING_PAPRIKA', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_BLACKENED_CHICKEN', 'ING_CAYENNE', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_BLACKENED_CHICKEN', 'ING_GARLIC_POWDER', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_BLACKENED_CHICKEN', 'ING_THYME', 5, 'g', 'seasoning', false);

-- CAJ_BLACKENED_REDFISH
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_BLACKENED_REDFISH', 'ING_CATFISH', 600, 'g', 'main', false),
('cajun', 'CAJ_BLACKENED_REDFISH', 'ING_BUTTER', 150, 'g', 'secondary', false),
('cajun', 'CAJ_BLACKENED_REDFISH', 'ING_CAJUN_SEASONING', 30, 'g', 'seasoning', false),
('cajun', 'CAJ_BLACKENED_REDFISH', 'ING_PAPRIKA', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_BLACKENED_REDFISH', 'ING_CAYENNE', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_BLACKENED_REDFISH', 'ING_THYME', 5, 'g', 'seasoning', false),
('cajun', 'CAJ_BLACKENED_REDFISH', 'ING_OREGANO', 5, 'g', 'seasoning', false),
('cajun', 'CAJ_BLACKENED_REDFISH', 'ING_LEMON', 2, 'unit', 'garnish', false);

-- =====================
-- DESSERTS
-- =====================

-- CAJ_BEIGNETS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_BEIGNETS', 'ING_FLOUR', 400, 'g', 'main', false),
('cajun', 'CAJ_BEIGNETS', 'ING_MILK', 250, 'ml', 'secondary', false),
('cajun', 'CAJ_BEIGNETS', 'ING_EGG', 1, 'unit', 'secondary', false),
('cajun', 'CAJ_BEIGNETS', 'ING_SUGAR', 50, 'g', 'secondary', false),
('cajun', 'CAJ_BEIGNETS', 'ING_BUTTER', 40, 'g', 'secondary', false),
('cajun', 'CAJ_BEIGNETS', 'ING_ACTIVE_YEAST', 7, 'g', 'secondary', false),
('cajun', 'CAJ_BEIGNETS', 'ING_VEGETABLE_OIL', 500, 'ml', 'secondary', false),
('cajun', 'CAJ_BEIGNETS', 'ING_POWDERED_SUGAR', 200, 'g', 'garnish', false);

-- CAJ_PRALINES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_PRALINES', 'ING_BROWN_SUGAR', 300, 'g', 'main', false),
('cajun', 'CAJ_PRALINES', 'ING_SUGAR', 150, 'g', 'main', false),
('cajun', 'CAJ_PRALINES', 'ING_PECAN', 200, 'g', 'main', false),
('cajun', 'CAJ_PRALINES', 'ING_HEAVY_CREAM', 180, 'ml', 'secondary', false),
('cajun', 'CAJ_PRALINES', 'ING_BUTTER', 60, 'g', 'secondary', false),
('cajun', 'CAJ_PRALINES', 'ING_VANILLA_EXTRACT', 10, 'ml', 'seasoning', false);

-- CAJ_BANANAS_FOSTER
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_BANANAS_FOSTER', 'ING_BANANA', 4, 'unit', 'main', false),
('cajun', 'CAJ_BANANAS_FOSTER', 'ING_BUTTER', 60, 'g', 'secondary', false),
('cajun', 'CAJ_BANANAS_FOSTER', 'ING_BROWN_SUGAR', 100, 'g', 'secondary', false),
('cajun', 'CAJ_BANANAS_FOSTER', 'ING_DARK_RUM', 60, 'ml', 'secondary', false),
('cajun', 'CAJ_BANANAS_FOSTER', 'ING_BANANA_LIQUEUR', 30, 'ml', 'secondary', false),
('cajun', 'CAJ_BANANAS_FOSTER', 'ING_CINNAMON', 3, 'g', 'seasoning', false),
('cajun', 'CAJ_BANANAS_FOSTER', 'ING_VANILLA_ICE_CREAM', 200, 'g', 'secondary', false);

-- CAJ_BREAD_PUDDING
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_BREAD_PUDDING', 'ING_BAGUETTE', 400, 'g', 'main', false),
('cajun', 'CAJ_BREAD_PUDDING', 'ING_MILK', 500, 'ml', 'secondary', false),
('cajun', 'CAJ_BREAD_PUDDING', 'ING_HEAVY_CREAM', 250, 'ml', 'secondary', false),
('cajun', 'CAJ_BREAD_PUDDING', 'ING_EGG', 4, 'unit', 'secondary', false),
('cajun', 'CAJ_BREAD_PUDDING', 'ING_SUGAR', 200, 'g', 'secondary', false),
('cajun', 'CAJ_BREAD_PUDDING', 'ING_BUTTER', 60, 'g', 'secondary', false),
('cajun', 'CAJ_BREAD_PUDDING', 'ING_VANILLA_EXTRACT', 15, 'ml', 'seasoning', false),
('cajun', 'CAJ_BREAD_PUDDING', 'ING_CINNAMON', 5, 'g', 'seasoning', false),
('cajun', 'CAJ_BREAD_PUDDING', 'ING_RAISIN', 80, 'g', 'secondary', true),
('cajun', 'CAJ_BREAD_PUDDING', 'ING_BOURBON', 60, 'ml', 'secondary', false);

-- CAJ_KING_CAKE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_KING_CAKE', 'ING_FLOUR', 500, 'g', 'main', false),
('cajun', 'CAJ_KING_CAKE', 'ING_MILK', 180, 'ml', 'secondary', false),
('cajun', 'CAJ_KING_CAKE', 'ING_BUTTER', 120, 'g', 'secondary', false),
('cajun', 'CAJ_KING_CAKE', 'ING_EGG', 4, 'unit', 'secondary', false),
('cajun', 'CAJ_KING_CAKE', 'ING_SUGAR', 150, 'g', 'secondary', false),
('cajun', 'CAJ_KING_CAKE', 'ING_ACTIVE_YEAST', 14, 'g', 'secondary', false),
('cajun', 'CAJ_KING_CAKE', 'ING_CINNAMON', 15, 'g', 'seasoning', false),
('cajun', 'CAJ_KING_CAKE', 'ING_CREAM_CHEESE', 200, 'g', 'secondary', true),
('cajun', 'CAJ_KING_CAKE', 'ING_POWDERED_SUGAR', 300, 'g', 'garnish', false);

-- CAJ_PECAN_PIE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_PECAN_PIE', 'ING_PECAN', 250, 'g', 'main', false),
('cajun', 'CAJ_PECAN_PIE', 'ING_CORN_SYRUP', 200, 'ml', 'main', false),
('cajun', 'CAJ_PECAN_PIE', 'ING_BROWN_SUGAR', 100, 'g', 'secondary', false),
('cajun', 'CAJ_PECAN_PIE', 'ING_BUTTER', 60, 'g', 'secondary', false),
('cajun', 'CAJ_PECAN_PIE', 'ING_EGG', 3, 'unit', 'secondary', false),
('cajun', 'CAJ_PECAN_PIE', 'ING_VANILLA_EXTRACT', 10, 'ml', 'seasoning', false),
('cajun', 'CAJ_PECAN_PIE', 'ING_BOURBON', 30, 'ml', 'seasoning', true),
('cajun', 'CAJ_PECAN_PIE', 'ING_PIE_CRUST', 1, 'unit', 'secondary', false);

-- =====================
-- BEVERAGES
-- =====================

-- CAJ_CHICORY_COFFEE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_CHICORY_COFFEE', 'ING_COFFEE', 30, 'g', 'main', false),
('cajun', 'CAJ_CHICORY_COFFEE', 'ING_CHICORY', 10, 'g', 'main', false),
('cajun', 'CAJ_CHICORY_COFFEE', 'ING_WATER', 240, 'ml', 'secondary', false);

-- CAJ_CAFE_AU_LAIT
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_CAFE_AU_LAIT', 'ING_COFFEE', 30, 'g', 'main', false),
('cajun', 'CAJ_CAFE_AU_LAIT', 'ING_CHICORY', 10, 'g', 'main', false),
('cajun', 'CAJ_CAFE_AU_LAIT', 'ING_MILK', 120, 'ml', 'main', false),
('cajun', 'CAJ_CAFE_AU_LAIT', 'ING_WATER', 120, 'ml', 'secondary', false);

-- CAJ_HURRICANE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_HURRICANE', 'ING_RUM_LIGHT', 60, 'ml', 'main', false),
('cajun', 'CAJ_HURRICANE', 'ING_DARK_RUM', 60, 'ml', 'main', false),
('cajun', 'CAJ_HURRICANE', 'ING_PASSION_FRUIT', 60, 'ml', 'secondary', false),
('cajun', 'CAJ_HURRICANE', 'ING_ORANGE_JUICE', 60, 'ml', 'secondary', false),
('cajun', 'CAJ_HURRICANE', 'ING_LIME_JUICE', 30, 'ml', 'secondary', false),
('cajun', 'CAJ_HURRICANE', 'ING_GRENADINE', 15, 'ml', 'secondary', false),
('cajun', 'CAJ_HURRICANE', 'ING_SIMPLE_SYRUP', 15, 'ml', 'secondary', false),
('cajun', 'CAJ_HURRICANE', 'ING_ORANGE', 1, 'slice', 'garnish', false),
('cajun', 'CAJ_HURRICANE', 'ING_CHERRY', 1, 'unit', 'garnish', false);

-- CAJ_SAZERAC
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_SAZERAC', 'ING_RYE_WHISKEY', 60, 'ml', 'main', false),
('cajun', 'CAJ_SAZERAC', 'ING_ABSINTHE', 5, 'ml', 'secondary', false),
('cajun', 'CAJ_SAZERAC', 'ING_SIMPLE_SYRUP', 10, 'ml', 'secondary', false),
('cajun', 'CAJ_SAZERAC', 'ING_PEYCHAUDS_BITTERS', 4, 'dash', 'seasoning', false),
('cajun', 'CAJ_SAZERAC', 'ING_LEMON_ZEST', 1, 'unit', 'garnish', false);

-- CAJ_RAMOS_GIN_FIZZ
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_RAMOS_GIN_FIZZ', 'ING_GIN', 60, 'ml', 'main', false),
('cajun', 'CAJ_RAMOS_GIN_FIZZ', 'ING_HEAVY_CREAM', 30, 'ml', 'secondary', false),
('cajun', 'CAJ_RAMOS_GIN_FIZZ', 'ING_EGG_WHITE', 1, 'unit', 'secondary', false),
('cajun', 'CAJ_RAMOS_GIN_FIZZ', 'ING_LEMON_JUICE', 15, 'ml', 'secondary', false),
('cajun', 'CAJ_RAMOS_GIN_FIZZ', 'ING_LIME_JUICE', 15, 'ml', 'secondary', false),
('cajun', 'CAJ_RAMOS_GIN_FIZZ', 'ING_SIMPLE_SYRUP', 20, 'ml', 'secondary', false),
('cajun', 'CAJ_RAMOS_GIN_FIZZ', 'ING_ORANGE_BLOSSOM', 3, 'drop', 'seasoning', false),
('cajun', 'CAJ_RAMOS_GIN_FIZZ', 'ING_SODA_WATER', 60, 'ml', 'secondary', false);

-- =====================
-- SIDES
-- =====================

-- CAJ_HUSH_PUPPIES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_HUSH_PUPPIES', 'ING_CORNMEAL', 200, 'g', 'main', false),
('cajun', 'CAJ_HUSH_PUPPIES', 'ING_FLOUR', 50, 'g', 'secondary', false),
('cajun', 'CAJ_HUSH_PUPPIES', 'ING_ONION', 80, 'g', 'secondary', false),
('cajun', 'CAJ_HUSH_PUPPIES', 'ING_EGG', 1, 'unit', 'secondary', false),
('cajun', 'CAJ_HUSH_PUPPIES', 'ING_BUTTERMILK', 180, 'ml', 'secondary', false),
('cajun', 'CAJ_HUSH_PUPPIES', 'ING_BAKING_POWDER', 5, 'g', 'secondary', false),
('cajun', 'CAJ_HUSH_PUPPIES', 'ING_CAJUN_SEASONING', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_HUSH_PUPPIES', 'ING_VEGETABLE_OIL', 500, 'ml', 'secondary', false);

-- CAJ_FRIED_GREEN_TOMATOES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_FRIED_GREEN_TOMATOES', 'ING_TOMATO', 400, 'g', 'main', false),
('cajun', 'CAJ_FRIED_GREEN_TOMATOES', 'ING_CORNMEAL', 150, 'g', 'secondary', false),
('cajun', 'CAJ_FRIED_GREEN_TOMATOES', 'ING_EGG', 2, 'unit', 'secondary', false),
('cajun', 'CAJ_FRIED_GREEN_TOMATOES', 'ING_BUTTERMILK', 120, 'ml', 'secondary', false),
('cajun', 'CAJ_FRIED_GREEN_TOMATOES', 'ING_CAJUN_SEASONING', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_FRIED_GREEN_TOMATOES', 'ING_VEGETABLE_OIL', 400, 'ml', 'secondary', false),
('cajun', 'CAJ_FRIED_GREEN_TOMATOES', 'ING_REMOULADE', 100, 'g', 'secondary', false);

-- CAJ_MAQUE_CHOUX
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_MAQUE_CHOUX', 'ING_CORN', 500, 'g', 'main', false),
('cajun', 'CAJ_MAQUE_CHOUX', 'ING_ONION', 150, 'g', 'secondary', false),
('cajun', 'CAJ_MAQUE_CHOUX', 'ING_CELERY', 80, 'g', 'secondary', false),
('cajun', 'CAJ_MAQUE_CHOUX', 'ING_BELL_PEPPER', 100, 'g', 'secondary', false),
('cajun', 'CAJ_MAQUE_CHOUX', 'ING_TOMATO', 150, 'g', 'secondary', false),
('cajun', 'CAJ_MAQUE_CHOUX', 'ING_BUTTER', 50, 'g', 'secondary', false),
('cajun', 'CAJ_MAQUE_CHOUX', 'ING_HEAVY_CREAM', 120, 'ml', 'secondary', false),
('cajun', 'CAJ_MAQUE_CHOUX', 'ING_CAJUN_SEASONING', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_MAQUE_CHOUX', 'ING_SCALLION', 30, 'g', 'garnish', false);

-- CAJ_CHEESE_GRITS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_CHEESE_GRITS', 'ING_GRITS', 200, 'g', 'main', false),
('cajun', 'CAJ_CHEESE_GRITS', 'ING_CHEDDAR', 150, 'g', 'secondary', false),
('cajun', 'CAJ_CHEESE_GRITS', 'ING_BUTTER', 60, 'g', 'secondary', false),
('cajun', 'CAJ_CHEESE_GRITS', 'ING_MILK', 500, 'ml', 'secondary', false),
('cajun', 'CAJ_CHEESE_GRITS', 'ING_HEAVY_CREAM', 120, 'ml', 'secondary', false),
('cajun', 'CAJ_CHEESE_GRITS', 'ING_GARLIC', 10, 'g', 'seasoning', true),
('cajun', 'CAJ_CHEESE_GRITS', 'ING_CAYENNE', 2, 'g', 'seasoning', true);

-- CAJ_COLESLAW
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_COLESLAW', 'ING_CABBAGE', 400, 'g', 'main', false),
('cajun', 'CAJ_COLESLAW', 'ING_CARROT', 100, 'g', 'secondary', false),
('cajun', 'CAJ_COLESLAW', 'ING_MAYONNAISE', 120, 'g', 'secondary', false),
('cajun', 'CAJ_COLESLAW', 'ING_CREOLE_MUSTARD', 30, 'g', 'seasoning', false),
('cajun', 'CAJ_COLESLAW', 'ING_APPLE_CIDER_VINEGAR', 30, 'ml', 'seasoning', false),
('cajun', 'CAJ_COLESLAW', 'ING_CAJUN_SEASONING', 10, 'g', 'seasoning', false),
('cajun', 'CAJ_COLESLAW', 'ING_TABASCO', 5, 'ml', 'seasoning', true);

-- CAJ_CORNBREAD
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional) VALUES
('cajun', 'CAJ_CORNBREAD', 'ING_CORNMEAL', 200, 'g', 'main', false),
('cajun', 'CAJ_CORNBREAD', 'ING_FLOUR', 100, 'g', 'secondary', false),
('cajun', 'CAJ_CORNBREAD', 'ING_BUTTERMILK', 250, 'ml', 'secondary', false),
('cajun', 'CAJ_CORNBREAD', 'ING_EGG', 2, 'unit', 'secondary', false),
('cajun', 'CAJ_CORNBREAD', 'ING_BUTTER', 80, 'g', 'secondary', false),
('cajun', 'CAJ_CORNBREAD', 'ING_SUGAR', 40, 'g', 'secondary', false),
('cajun', 'CAJ_CORNBREAD', 'ING_BAKING_POWDER', 8, 'g', 'secondary', false);

-- Verification
SELECT 'Inserted ' || COUNT(*) || ' product ingredients for Cajun' AS status
FROM product_ingredients WHERE product_type = 'cajun';
