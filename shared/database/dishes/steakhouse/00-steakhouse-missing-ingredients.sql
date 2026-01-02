-- =============================================
-- STEAKHOUSE - Missing Ingredients
-- Required for appetizers and steaks expansion
-- =============================================

INSERT INTO ingredients (id, slug, name, description, category) VALUES

-- Beef cuts
('ING_BEEF_SHOULDER', 'beef-shoulder', 'Beef Shoulder', 'Shoulder cut from beef, contains teres major', 'proteins'),
('ING_BEEF_RUMP', 'beef-rump', 'Beef Rump', 'Rump section of beef, lean and flavorful', 'proteins'),

-- Offal/Variety meats
('ING_SWEETBREAD', 'sweetbread', 'Sweetbread', 'Thymus gland from veal or beef', 'proteins'),
('ING_BEEF_KIDNEY', 'beef-kidney', 'Beef Kidney', 'Beef kidney for grilling or braising', 'proteins'),

-- Seafood (for appetizers)
('ING_MIGNONETTE', 'mignonette', 'Mignonette Sauce', 'Shallot and vinegar sauce for oysters', 'sauces'),
('ING_COCKTAIL_SAUCE', 'cocktail-sauce', 'Cocktail Sauce', 'Tomato-based sauce with horseradish for seafood', 'sauces'),
('ING_REMOULADE', 'remoulade', 'Remoulade Sauce', 'Creamy mayo-based sauce with pickles and capers', 'sauces')

ON CONFLICT (id) DO NOTHING;
