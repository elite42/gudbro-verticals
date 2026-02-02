# GUDBRO Database Inventory

> **SOURCE OF TRUTH** per tutti i database food del progetto GUDBRO.
> Claude DEVE consultare questo file prima di lavorare sui database.

## REGOLA OBBLIGATORIA

Prima di creare o modificare QUALSIASI database food/bevande:
1. **LEGGI** `shared/database/DATABASE-STANDARDS.md` (v1.0 - DEFINITIVO)
2. **SEGUI** tutte le regole senza eccezioni
3. **AGGIORNA** questo inventory dopo ogni modifica

---

## Quick Status (2025-12-20)

| Database | Records | Schema | Batches | Supabase | Last Updated |
|----------|---------|--------|---------|----------|--------------|
| **Master Ingredients** | **~1756** | ✅ | ✅ 12 batch | ✅ | 2025-12-19 |
| Cocktails | 227 | ✅ | ✅ | ✅ | 2025-12-15 |
| **Spirits** | **197** | ✅ v1.1 | ✅ | ✅ | 2025-12-18 |
| **Wines** | **143** | ✅ | ✅ | ✅ | 2025-12-17 |
| **Japanese** | **173** | ✅ v1.1 | ✅ | ✅ LIVE | 2025-12-19 |
| **Turkish** | **98** | ✅ v1.2 | ✅ | ✅ LIVE | 2025-12-19 |
| **Lebanese** | **94** | ✅ v1.2 | ✅ | ✅ LIVE | 2025-12-19 |
| **Brazilian** | **91** | ✅ v1.2 | ✅ | ✅ LIVE | 2025-12-19 |
| Pasta | 87 | ✅ | ✅ 9 batch | ✅ | 2025-12-15 |
| **Korean** | **77** | ✅ v1.1 | ✅ | ✅ LIVE | 2025-12-19 |
| **Coffee** | **76** | ✅ | ✅ 4 batch | ✅ | 2025-12-17 |
| **Greek** | **74** | ✅ v1.2 | ✅ | ✅ LIVE | 2025-12-19 |
| **Georgian** | **74** | ✅ v1.2 | ✅ | ✅ LIVE | 2025-12-19 |
| **Steaks & Grills** | **74** | ✅ v3.0 | ✅ | ✅ | 2025-12-18 (verified) |
| **Chinese** | **73** | ✅ v1.1 | ✅ | ✅ | 2025-12-19 |
| **Vietnamese** | **72** | ✅ v1.1 | ✅ | ✅ LIVE | 2025-12-19 |
| **Thai** | **69** | ✅ v1.1 | ✅ | ✅ | 2025-12-19 |
| **Mexican** | **66** | ✅ v1.1 | ✅ | ✅ | 2025-12-18 |
| **Vegetarian** | **65** | ✅ v1.1 | ✅ | ✅ | 2025-12-18 |
| **Breakfast** | **65** | ✅ v1.1 | ✅ | ✅ | 2025-12-18 |
| **Indian** | **65** | ✅ v1.1 | ✅ | ✅ | 2025-12-18 |
| **Waters** | **64** | ✅ v1.3 | ✅ | ✅ LIVE | 2025-12-20 |
| **Seafood** | **63** | ✅ v1.0 | ✅ | ✅ | 2025-12-18 |
| Pizzas | 62 | ✅ | ✅ 13 batch | ✅ | 2025-12-15 |
| **Tea & Infusions** | **62** | ✅ | ✅ 5 batch | ✅ | 2025-12-17 |
| Salads | 52 | ✅ | ✅ 9 batch | ✅ | 2025-12-15 |
| Appetizers | 51 | ✅ | ✅ 6 batch | ✅ | 2025-12-16 |
| Sandwiches | 50 | ✅ | ✅ 5 batch | ✅ | 2025-12-15 |
| **Fried Foods** | **48** | ✅ v1.1 | ✅ | ✅ | 2025-12-18 |
| Beers | 45 | ✅ | ✅ | ✅ | 2025-12-15 |
| Burgers | 45 | ✅ | ✅ 5 batch | ✅ | 2025-12-15 |
| Soups | 39 | ✅ | ✅ 4 batch | ✅ | 2025-12-15 |
| **Soft Drinks** | **35** | ✅ v1.3 | ✅ | ✅ LIVE | 2025-12-20 |
| Desserts | 35 | ✅ | ✅ 4 batch | ✅ | 2025-12-16 |
| Risotti | 27 | ✅ | ✅ 3 batch | ✅ | 2025-12-15 |
| Dumplings | 20 | ✅ | ✅ 2 batch | ✅ | 2025-12-15 |
| **TOTALE PRODOTTI** | **2658** | | | | |
| **TOTALE INGREDIENTI** | **~1775** | | | | |
| **PRODUCT_INGREDIENTS** | **~13950** | | | | |
| **TOTAL DATABASES** | **34** | | | | |

---

## Junction & System Tables

| Table | Status | Records | Note |
|-------|--------|---------|------|
| `product_ingredients` | ✅ LIVE | **~13,950** | 33 product types collegati (waters escluso - no ingredients) |
| `product_taxonomy` | ✅ LIVE | **34** | Classificazione unificata |
| `translations` | ⏳ Pending | 0 | Da popolare (it, vi, ko, ja) |

### product_ingredients Breakdown

| product_type | products | ingredient_links | avg/product |
|--------------|----------|------------------|-------------|
| cocktails | 227 | 898 | ~4 |
| pizzas | 62 | 469 | ~7.5 |
| salads | 52 | 416 | ~8 |
| pasta | 49 | 394 | ~8 |
| appetizers | 51 | 241 | ~4.7 |
| coffee | 76 | 225 | ~3 |
| wines | 143 | 212 | ~1.5 |
| soups | 39 | 78 | ~2 |
| risotti | 27 | 89 | ~3.3 |
| beers | 45 | 172 | ~3.8 |
| burgers | 45 | 173 | ~4 |
| tea | 61 | 173 | ~3 |
| sandwiches | 49 | 155 | ~3 |
| desserts | 35 | 149 | ~4.3 |
| dumplings | 20 | 16 | ~0.8 |
| japanese | 173 | 998 | ~5.8 |
| steaks | 74 | ~320 | ~4.3 |
| seafood | 63 | ~380 | ~6 |
| mexican | 66 | 455 | ~6.9 |
| vegetarian | 65 | 530 | ~8.2 |
| fried | 48 | ~420 | ~8.8 |
| breakfast | 65 | 499 | ~7.7 |
| indian | 65 | 705 | ~10.8 |
| thai | 69 | 693 | ~10.0 |
| chinese | 73 | 589 | ~8.1 |
| korean | 77 | 560 | ~7.3 |
| vietnamese | 72 | 800 | ~11.1 |
| greek | 74 | ~450 | ~6.1 |
| lebanese | 94 | ~560 | ~6.0 |
| georgian | 74 | ~440 | ~5.9 |
| turkish | 98 | ~590 | ~6.0 |
| brazilian | 91 | 190 | ~2.1 |
| softdrinks | 35 | 202 | ~5.8 |
| waters | 64 | 0 | N/A (no ingredients) |
| **TOTAL** | **2658** | **~13,950** | ~5.4 |

### Tutti i database collegati ✅

Tutti i **34 product types** sono ora collegati alla master ingredients table tramite `product_ingredients`.
- **33 con ingredienti**: cocktails, pizzas, pasta, etc.
- **1 senza ingredienti**: waters (prodotti semplici, minerali naturali)

---

## Database Details

### Product Taxonomy (18 entries) - NEW 2025-12-18
- **Path**: `shared/database/taxonomy/`
- **Status**: Ready to import
- **Purpose**: Unified classification system for all 18 product databases
- **Architecture**: Hierarchical (service_type → menu_type → category → subcategory)
- **Classification Levels**:
  - Level 1 - Service Type: `food` | `beverage`
  - Level 2 - Menu Type: `traditional_course` | `standalone` | `bar_menu` | `cafe_menu` | `side_dish`
  - Level 3 - Category: 18 categories (appetizer, first_course, second_course, pizza, cocktail, etc.)
  - Level 4 - Subcategory: pasta, risotto, soup, meat, fish, salad (optional)
- **Enables**:
  - Unified queries: "Get all main courses" across steaks, seafood
  - Menu building: Traditional multi-course meal ordering
  - Filtering: alcoholic vs non-alcoholic, hot vs cold
- **Scripts**:
  - `taxonomy/scripts/taxonomy-complete-import.sql` - Schema + 18 entries
- **Types**: `taxonomy/types.ts` (ProductTaxonomy interface)
- **Multilingual**: display_name in en, it, vi, ko, ja

### Master Ingredients (1006)
- **Path**: `shared/database/ingredients/master/`
- **Status**: LIVE IN SUPABASE
- **Tabelle create**:
  - `ingredients` - 1006 ingredienti unici (solo inglese)
  - `translations` - traduzioni multilingua (vuota, da popolare)
  - `product_ingredients` - junction table (4,360 links)
- **Schema**: `ingredients/master/schema-v2.sql`
- **Batches**: `ingredients/master/batches/` (12 batch files)
- **Types**: `ingredients/master/types.ts`
- **Categorie**: 30 (spirits, liqueurs, wines, proteins, seafood, cheese, vegetables, fruits, herbs, spices, pasta, etc.)
- **Migrazione completata**: Tutti i database food ora usano `ingredient_ids` invece di raw strings

### Cocktails (227)
- **Path**: `shared/database/cocktails/`
- **Source**: IBA Official Cocktails
- **Categories**: Unforgettables, Contemporary Classics, New Era Drinks
- **Schema**: `cocktails/schema/`
- **Batches**: `cocktails/scripts/batches/`

### Soft Drinks (35) - NEW 2025-12-20
- **Path**: `shared/database/softdrinks/`
- **Status**: ✅ LIVE in Supabase
- **Schema**: v1.3 compliant (TEXT+CHECK)
- **Categories**: cola, lemon_lime, orange, ginger, energy, tonic, root_beer, cream_soda, other
- **Prefix**: `SDR_`
- **Product_Ingredients**: 202 links (~5.8 per drink)
- **New Ingredients**: 19 (guarana, taurine, quinine, etc.)
- **Scripts**:
  - `softdrinks/scripts/01-softdrinks-schema.sql`
  - `softdrinks/scripts/02-softdrinks-data.sql`
  - `softdrinks/scripts/03-softdrinks-missing-ingredients.sql`
  - `softdrinks/scripts/04-softdrinks-product-ingredients.sql`
- **Note**: 3 acque (San Pellegrino, Perrier, Schweppes Soda) migrate in Waters

### Waters (64) - NEW 2025-12-20
- **Path**: `shared/database/waters/`
- **Status**: ✅ LIVE in Supabase
- **Schema**: v1.3 compliant (TEXT+CHECK)
- **Categories**: still_natural(12), sparkling_natural(8), sparkling_added(9), mineral_rich(7), low_mineral(7), alkaline(6), flavored(15)
- **Prefix**: `WTR_`
- **Product_Ingredients**: N/A (acque sono prodotti semplici senza ingredienti)
- **Special Fields**:
  - `carbonation`: none, natural, added
  - `source_type`: spring, artesian, glacier, volcanic, mineral, iceberg, well
  - `tds_mg_l`: Total Dissolved Solids (residuo fisso)
  - `ph_level`: pH (6.0-9.5)
  - Minerals: calcium, magnesium, sodium, potassium, bicarbonate, silica (mg/L)
- **Scripts**:
  - `waters/scripts/01-waters-schema.sql`
  - `waters/scripts/02-cleanup-softdrinks.sql` (rimuove acque da softdrinks)
  - `waters/scripts/03-waters-data.sql`
  - `waters/scripts/04-verify-import.sql`
- **Brands**: Evian, Fiji, Voss, San Pellegrino, Perrier, Badoit, Gerolsteiner, Ferrarelle, Levissima, Lauretana, Sant'Anna, Essentia, LaCroix, Hint Water

### Beers (54)
- **Path**: `shared/database/beers/`
- **Styles**: Lagers, Ales, IPAs, Stouts, Belgian, German, etc.
- **Schema**: `beers/schema/`
- **Batches**: `beers/scripts/batches/`

### Pizzas (65)
- **Path**: `shared/database/pizzas/`
- **Collections**:
  - Italian Classic
  - American
  - Gourmet
  - Regional Italian
  - International Fusion
- **Schema**: `pizzas/schema/pizzas-schema.sql`
- **Batches**: `pizzas/scripts/batches/` (13 batch files)
- **Generator**: `pizzas/scripts/generate-pizza-batches.ts`

### Salads (55)
- **Path**: `shared/database/salads/`
- **Collections**:
  - Classic International (11)
  - Italian (9)
  - Mediterranean (8)
  - Asian (8)
  - Bowl & Poke (10)
  - Healthy & Signature (9)
- **Schema**: `salads/schema/create-salads-table.sql`
- **Batches**: `salads/scripts/batches/` (9 batch files + all-salads.sql)
- **Generator**: `salads/scripts/generate-sql-batches.ts`

### Pasta (87)
- **Path**: `shared/database/pasta/`
- **Collections**:
  - Italian Classic
  - Italian Regional
  - Italian Seafood
  - Asian Noodles
- **Schema**: `pasta/schema/create-pasta-table.sql`
- **Batches**: `migrations/food-batches/pasta/` (9 batch files)
- **Note**: Fixed TEXT id (was UUID), added 'active' to enum

### Risotti (27)
- **Path**: `shared/database/risotti/`
- **Styles**: Classic, Regional, Seafood, Vegetarian
- **Schema**: `risotti/schema/create-risotti-table.sql`
- **Batches**: `migrations/food-batches/risotti/` (3 batch files)

### Dumplings (20)
- **Path**: `shared/database/dumplings/`
- **Styles**: Chinese, Japanese, Korean, European
- **Schema**: `dumplings/schema/create-dumplings-table.sql`
- **Batches**: `migrations/food-batches/dumplings/` (2 batch files)

### Soups (39)
- **Path**: `shared/database/soups/`
- **Collections**:
  - Italian (5)
  - Asian (8)
  - Vietnamese Pho (17) - Enhanced for Vietnam market
  - European (9)
- **Schema**: `soups/schema/create-soups-table.sql`
- **Batches**: `migrations/food-batches/soups/` (4 batch files)

### Appetizers (51) - NEW 2025-12-16
- **Path**: `shared/database/appetizers/`
- **Collections**:
  - Italian Antipasti (19): Bruschette, Fritti, Carpacci, Affettati, Mare
  - Spanish Tapas (15): Patatas Bravas, Gambas, Tortilla, Croquetas, etc.
  - International (17): Greek Mezze, Middle Eastern, Asian, French
- **Schema**: `appetizers/schema/create-appetizers-table.sql`
- **Batches**: `appetizers/scripts/batches/` (6 batch files)
- **Generator**: `appetizers/scripts/generate-appetizer-batches.ts`

### Desserts (35) - NEW 2025-12-16
- **Path**: `shared/database/desserts/`
- **Collections**:
  - Italian Dolci (14): Tiramisu, Panna Cotta, Cannoli, Gelato, etc.
  - French Patisserie (10): Creme Brulee, Mousse, Macarons, Eclair, etc.
  - International (11): American, Asian, Middle Eastern, British, German
- **Schema**: `desserts/schema/create-desserts-table.sql`
- **Batches**: `desserts/scripts/batches/` (4 batch files)
- **Generator**: `desserts/scripts/generate-dessert-batches.ts`

### Steaks & Grills (74) - LIVE 2025-12-18 (VERIFIED)
- **Path**: `shared/database/steaks/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v3.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (74 products, ~320 ingredient links) - **VERIFIED 2025-12-18**
- **Collections** (by category):
  - beef_steak (10): Ribeye, Filet Mignon, NY Strip, Porterhouse, T-Bone, Tomahawk, Prime Rib, Wagyu, etc.
  - italian_grill (8): Bistecca alla Fiorentina, Tagliata, Costata, Ossobuco, Cotoletta Milanese, etc.
  - south_american_grill (9): Picanha, Asado, Churrasco, Parrillada, Chimichurri cuts, etc.
  - asian_grill (9): Korean BBQ (Bulgogi, Galbi), Japanese (Wagyu, Yakiniku, Yakitori), etc.
  - lamb_game (8): Rack of Lamb, Lamb Chops, Lamb Shank, Leg of Lamb, Venison, Duck
  - ribs_bbq (6): Baby Back Ribs, St. Louis Style, Texas Beef Ribs, Brisket, Burnt Ends, etc.
  - middle_eastern_grill (8): Adana Kebab, Iskender, Shish Taouk, Kofta, Shawarma, etc.
  - european_grill (9): Wiener Schnitzel, Beef Wellington, Entrecôte, Steak Tartare, etc.
  - poultry_grill (7): Roast Chicken, Piri Piri, Tandoori, Jerk Chicken, Pollo alla Diavola, etc.
- **Cuisines**: American, Italian, French, Turkish, Korean, Brazilian, Argentinian, British, Spanish, Portuguese, Persian, Middle Eastern, Japanese, Jamaican, Indian, German, International, Australian
- **Origin Countries**: 18+ countries
- **Cuts**: 32+ types (beef cuts, lamb cuts, pork, poultry, veal)
- **Scripts**:
  - `steaks/scripts/steaks-complete-import-v2.sql` - Schema + 74 records (CURRENT)
  - `steaks/scripts/steaks-complete-import.sql` - Old version with 46 records (DEPRECATED)
- **Types**: `steaks/types.ts` (SteakItem interface)
- **Data Files**: 9 files in `steaks/data/` (beef-steaks.ts, italian-grills.ts, south-american-grills.ts, asian-grills.ts, lamb-game.ts, ribs-bbq.ts, middle-eastern-grills.ts, european-grills.ts, poultry-grills.ts)
- **Note**: First database with TEXT+CHECK pattern (no ENUM). **Discrepancy fixed 2025-12-18**: original SQL had only 46 records, regenerated from TypeScript source with all 74.

### Sushi (100) - Renamed 2025-12-18
- **Path**: `shared/database/sushi/` (renamed from japanese/)
- **Architecture**: English only, translations separate, Sistema 5 Dimensioni, Japanese names in romaji/kanji
- **Renamed**: `japanese` → `sushi` for naming consistency (all databases use dish type, not cuisine origin)
- **Collections**:
  - Nigiri (17): Maguro, Chutoro, Otoro, Sake, Hamachi, Tai, Ebi, Unagi, Hotate, Tako, Tamago, etc.
  - Sashimi (12): Tuna, Salmon, Yellowtail, Sea Bream, Scallop, Uni, Tataki, Shime Saba, Moriawase
  - Maki (14): Tekka, Kappa, Sake, Negitoro, Natto, Futomaki, Ehomaki, Spicy Tuna, etc.
  - Specialty Rolls (17): California, Philadelphia, Dragon, Rainbow, Spider, Caterpillar, Volcano, etc.
  - Temaki & Gunkan (16): Hand rolls, Ikura, Uni, Tobiko, Negitoro, Corn Mayo, Crab Salad
  - Donburi & Chirashi (12): Tekkadon, Negitoro Don, Sake Don, Unadon, Kaisendon, Poke Don
  - Other Styles (12): Inari, Temari, Oshizushi (Battera, Hakozushi, Kakinoha), Sushi Cake, Omakase
- **Categories**: nigiri, sashimi, maki, uramaki, temaki, gunkan, chirashi, donburi, specialty_roll, inari, oshizushi, temari
- **Protein Types**: 42 types (maguro variants, sake, hamachi, tai, hirame, unagi, ebi, hotate, ika, tako, ikura, uni, tobiko, etc.)
- **Preparations**: raw, seared, cured, marinated, grilled, tempura, torched, smoked, pressed, cooked, pickled
- **Schema**: `sushi/schema/create-japanese-table.sql`
- **Data Files**: `sushi/data/` (7 files: nigiri.ts, sashimi.ts, maki.ts, specialty-rolls.ts, temaki-gunkan.ts, donburi-chirashi.ts, other-styles.ts)
- **Batches**: `sushi/scripts/import-all.sql` (schema), `sushi/scripts/data-import.sql` (100 records)
- **Migration**: `sushi/scripts/migrate-japanese-to-sushi.sql`
- **Supabase**: ✅ LIVE (100 products, 500 ingredient links)
- **Note**: Comprehensive sushi database with authentic names in romaji/kanji, seasonal fish, sake pairings

### Mexican (66) - NEW 2025-12-18
- **Path**: `shared/database/mexican/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (66 dishes, 455 ingredient links, ~60 new ingredients)
- **Collections** (by category):
  - tacos (10): Al Pastor, Carne Asada, Carnitas, Barbacoa, Birria, Pescado, Camarones, Chorizo, Lengua, Suadero
  - burritos (6): Carne Asada, Pollo, Carnitas, California, Bean & Cheese, Wet
  - enchiladas (7): Rojas, Verdes, Suizas, Mole, Enmoladas, Enfrijoladas, Entomatadas
  - antojitos (15): Quesadillas (3 types), Tostadas, Sopes, Gorditas, Flautas, Tlayuda, Chalupa, Memela, Panucho, Salbute, Tlacoyo, Huarache
  - main_dishes (16): Mole Poblano, Mole Negro, Chiles Rellenos, Carnitas, Cochinita Pibil, Barbacoa, Birria, Pozole (Rojo/Verde), Tamales (2), Chile en Nogada, Carne Asada, Cabrito, Chilaquiles (Rojos/Verdes)
  - sides_salsas (12): Guacamole, Salsas (Roja, Verde, Habanero), Pico de Gallo, Queso Fundido, Frijoles (Refritos, Negros), Arroz Rojo, Elote, Esquites, Nachos
- **Regions**: Northern, Central, Yucatán, Oaxaca, Coastal, Western, Tex-Mex, International
- **Protein Types**: beef, pork, chicken, fish, shrimp, chorizo, goat, cheese, beans, vegetarian, mixed
- **Tortilla Types**: corn, flour, none
- **Scripts** (numbered for execution order):
  - `01-mexican-missing-ingredients.sql` - ~60 new ingredients (RECOMMENDED naming for future)
  - `02-mexican-complete-import.sql` - Schema + 66 records
  - `03-mexican-product-ingredients.sql` - 455 junction table links
- **Types**: `mexican/types.ts` (MexicanItem interface)
- **Data Files**: `mexican/data/` (6 files: tacos.ts, burritos.ts, enchiladas.ts, antojitos.ts, main-dishes.ts, sides-salsas.ts)
- **Lessons Learned**:
  - File naming: Use numeric prefixes (01-, 02-, 03-) to indicate execution order
  - JSONB format: `allergens`, `intolerances`, `dietary` are JSONB objects (`{"milk": true}`), not TEXT arrays
  - Always verify ingredients table schema before generating INSERT statements

### Vegetarian (65) - NEW 2025-12-18
- **Path**: `shared/database/vegetarian/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (65 dishes, 530 ingredient links, ~80 new ingredients)
- **Collections** (by category):
  - tofu_dishes (8): Mapo Tofu, Kung Pao Tofu, Agedashi Tofu, Thai Basil Tofu, Teriyaki Tofu, Tofu Tikka Masala, Sundubu Jjigae
  - tempeh_dishes (4): Tempeh Bacon, Indonesian Stir-Fry, BBQ Tempeh, Tempeh Tacos
  - seitan_dishes (5): Seitan Steak, Seitan Gyros, Buffalo Wings, Schnitzel, Kebabs
  - legume_dishes (8): Chana Masala, Dal Tadka, Falafel, Black Bean Burger, Lentil Soup, Rajma, Hummus Bowl, Vegan Feijoada
  - grain_bowls (8): Buddha Bowl, Bibimbap, Falafel Bowl, Burrito Bowl, Poke Bowl, Macrobiotic Bowl, Thai Peanut Bowl, Harvest Bowl
  - vegetable_mains (8): Cauliflower Steak, Portobello Burger, Jackfruit Pulled Pork, Stuffed Peppers, Mushroom Stroganoff, Eggplant Parmesan, Ratatouille
  - indian_mains (8): Palak Paneer, Matar Paneer, Paneer Tikka, Baingan Bharta, Aloo Gobi, Malai Kofta, Sambar, Paneer Butter Masala
  - asian_mains (8): Pad Thai, Green Curry, Lo Mein, Dan Dan Noodles, Tempura, Massaman Curry, Singapore Noodles, Japchae
  - mediterranean_mains (8): Moussaka, Shakshuka, Spanakopita, Dolmas, Imam Bayildi, Mujaddara, Koshari, Fatteh
- **Protein Sources**: tofu, tempeh, seitan, legumes, paneer, eggs, mushrooms, jackfruit, cauliflower, nuts_seeds, quinoa, mixed
- **Cuisines**: Indian, Thai, Chinese, Japanese, Korean, Vietnamese, Mediterranean, Middle Eastern, Mexican, American, Italian, Ethiopian, International, Fusion
- **Scripts** (numbered for execution order):
  - `01-vegetarian-missing-ingredients.sql` - ~80 new ingredients
  - `01b-vegetarian-fix-missing-ingredients.sql` - Fix for duplicate slugs
  - `02-vegetarian-complete-import.sql` - Schema + 65 records
  - `03-vegetarian-product-ingredients.sql` - 530 junction table links
- **Types**: `vegetarian/types.ts` (VegetarianItem interface)
- **Data Files**: `vegetarian/data/` (8 files: tofu-dishes.ts, tempeh-seitan.ts, legume-dishes.ts, grain-bowls.ts, vegetable-mains.ts, indian-mains.ts, asian-mains.ts, mediterranean-mains.ts)
- **Note**: Fourth database with TEXT+CHECK pattern (no ENUM). Comprehensive vegetarian/vegan dishes from global cuisines. Used 183 unique ingredients.

### Fried Foods (48) - NEW 2025-12-18
- **Path**: `shared/database/fried/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (48 dishes, ~420 ingredient links, ~50 new ingredients)
- **Collections** (by category):
  - fried_chicken (8): Southern Fried, Korean Yangnyeom, Japanese Karaage, Buffalo Wings, Nashville Hot, Chicken Tenders, Nuggets, Chicharron
  - fried_seafood (8): Fish & Chips, Calamari Fritti, Popcorn Shrimp, Coconut Shrimp, Soft Shell Crab, Fritto Misto, Ebi Katsu, Crab Cakes
  - fried_vegetables (8): Vegetable Tempura, Onion Rings, Zucchini Sticks, Fried Pickles, Blooming Onion, Fried Green Tomatoes, Fried Okra, Onion Bhaji
  - fried_appetizers (8): Mozzarella Sticks, Jalapeno Poppers, Arancini, Croquetas, Scotch Egg, Fried Cheese Curds, Bitterballen, Mac & Cheese Bites
  - fried_snacks (8): French Fries, Belgian Frites, Spring Rolls, Churros, Donuts, Tater Tots, Hash Browns, Corn Dogs
  - fried_international (8): Falafel, Samosa, Empanada, Pakora, Fried Gyoza, Tonkatsu, Wiener Schnitzel, Lumpia
- **Origins**: American, Southern US, British, Italian, Japanese, Korean, Chinese, Spanish, French, Indian, Middle Eastern, Latin American, International
- **Frying Methods**: deep_fried, pan_fried, double_fried, shallow_fried
- **Scripts** (numbered for execution order):
  - `01-fried-missing-ingredients.sql` - ~50 new ingredients
  - `02-fried-complete-import.sql` - Schema + 48 records
  - `03-fried-product-ingredients.sql` - ~420 junction table links
- **Types**: `fried/types.ts` (FriedItem interface)
- **Data Files**: `fried/data/` (6 files: fried-chicken.ts, fried-seafood.ts, fried-vegetables.ts, fried-appetizers.ts, fried-snacks.ts, fried-international.ts)
- **Note**: Fifth v1.1-compliant database. First import without any errors! Includes crispy_rating (1-5) and dipping_sauces fields.

### Breakfast (65) - NEW 2025-12-18
- **Path**: `shared/database/breakfast/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (65 dishes, 499 ingredient links, 58 new ingredients)
- **Collections** (by category):
  - eggs (10): Eggs Benedict, Eggs Florentine, Eggs Royale, Western Omelette, French Omelette, Frittata, Shakshuka, Huevos Rancheros, Scrambled Eggs, Fried Eggs
  - pancakes_waffles (10): American Pancakes, Buttermilk Pancakes, Belgian Waffles, Liege Waffles, French Crepes, Dutch Baby, German Pancakes, Japanese Souffle Pancakes, Swedish Pancakes, French Toast
  - pastries (10): Croissant, Pain au Chocolat, Almond Croissant, Danish Pastry, Cinnamon Roll, Sticky Buns, Brioche, Kouign-Amann, Beignets, Sfogliatella
  - cereals_bowls (10): Acai Bowl, Smoothie Bowl, Overnight Oats, Bircher Muesli, Granola Parfait, Chia Pudding, Congee, Oatmeal, Steel Cut Oats, Quinoa Porridge
  - savory (10): Full English Breakfast, Full Irish Breakfast, Scottish Breakfast, Breakfast Burrito, Avocado Toast, Bacon Egg & Cheese, Country Fried Steak, Corned Beef Hash, Croque Madame, Eggs in a Basket
  - international (15): Japanese Breakfast, Turkish Breakfast, Israeli Breakfast, Korean Breakfast, Vietnamese Breakfast, Brazilian Breakfast, Spanish Breakfast, Mexican Chilaquiles, Swedish Breakfast, Scandinavian Breakfast, Chinese Dim Sum Breakfast, Indian Breakfast, German Breakfast, Australian Breakfast, Middle Eastern Breakfast
- **Origins**: American, French, Belgian, Japanese, Turkish, Israeli, Korean, Vietnamese, Brazilian, Spanish, Mexican, Swedish, Scandinavian, Chinese, Indian, German, Australian, Middle Eastern, British, Scottish, Irish, Dutch, Italian
- **Preparation Types**: pan_fried, poached, scrambled, baked, boiled, toasted, steamed, grilled, raw
- **Scripts** (numbered for execution order):
  - `01-breakfast-missing-ingredients.sql` - 58 new ingredients
  - `02-breakfast-complete-import.sql` - Schema + 65 records
  - `03-breakfast-product-ingredients.sql` - 499 junction table links
- **Types**: `breakfast/types.ts` (BreakfastItem interface)
- **Data Files**: `breakfast/data/` (6 files: eggs.ts, pancakes-waffles.ts, pastries.ts, cereals-bowls.ts, savory.ts, international.ts)
- **Note**: Sixth v1.1-compliant database. Comprehensive breakfast dishes from global cuisines. Local ingredients cache system added.

### Indian (65) - NEW 2025-12-18
- **Path**: `shared/database/indian/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (65 dishes, 705 ingredient links, 40 new ingredients)
- **Collections** (by category):
  - curries (12): Butter Chicken, Chicken Tikka Masala, Lamb Rogan Josh, Chicken Korma, Lamb Vindaloo, Chicken Madras, Lamb Saag, Chicken Chettinad, Lamb Keema, Fish Curry, Prawn Masala, Kadai Chicken
  - biryani_rice (9): Hyderabadi Biryani, Lucknowi Biryani, Chicken Biryani, Kolkata Biryani, Vegetable Biryani, Thalassery Biryani, Jeera Rice, Pulao, Lamb Boti Kebab
  - tandoori (9): Tandoori Chicken, Chicken Tikka, Seekh Kebab, Malai Kebab, Fish Tikka, Paneer Tikka, Reshmi Kebab, Tandoori Prawns, Hariyali Tikka
  - breads (8): Garlic Naan, Butter Naan, Roti, Paratha, Aloo Paratha, Puri, Bhatura, Kulcha
  - appetizers (7): Samosa, Onion Pakora, Vegetable Pakora, Aloo Tikki, Onion Bhaji, Chicken Pakora, Paneer Pakora
  - dals (6): Dal Makhani, Dal Tadka, Chana Masala, Rajma, Sambar, Dal Fry
  - vegetarian (8): Palak Paneer, Matar Paneer, Paneer Butter Masala, Aloo Gobi, Kadai Paneer, Shahi Paneer, Baingan Bharta, Malai Kofta
  - street_food (6): Pav Bhaji, Vada Pav, Pani Puri, Bhel Puri, Dosa, Idli
- **Regions**: North, South, East, West, Central, Mughlai, Coastal, Punjabi, Hyderabadi, Kashmiri, Indo-Chinese, International
- **Protein Types**: chicken, lamb, beef, pork, fish, prawns, paneer, lentils, vegetables, mixed
- **Cooking Methods**: tandoor, curry, stir_fry, deep_fry, steamed, grilled, baked, slow_cooked
- **Scripts** (numbered for execution order):
  - `01-indian-missing-ingredients.sql` - 40 new ingredients
  - `02-indian-complete-import.sql` - Schema + 65 records
  - `03-indian-product-ingredients.sql` - 705 junction table links
- **Types**: `indian/types.ts` (IndianItem interface)
- **Data Files**: `indian/data/` (8 files: curries.ts, biryani-rice.ts, tandoori.ts, breads.ts, appetizers.ts, dals.ts, vegetarian.ts, street-food.ts)
- **Note**: Seventh v1.1-compliant database. Authentic Indian dishes with hindi_name field for native names. Fixed ING_SEV category from 'snacks' to 'grains'.

### Seafood (63) - NEW 2025-12-18
- **Path**: `shared/database/seafood/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (63 dishes, ~380 ingredient links, ~80 new ingredients)
- **Collections** (by category):
  - fish (19): Grilled Salmon, Fish & Chips, Sole Meuniere, Sea Bass, Branzino, Halibut, Swordfish, etc.
  - shellfish (13): Moules Marinières, Vongole, Oysters Rockefeller, Clam Chowder, Coquilles St-Jacques, etc.
  - crustaceans (15): Lobster Thermidor, Shrimp Scampi, Crab Cakes, Soft Shell Crab, Gambas al Ajillo, etc.
  - sushi_sashimi (8): Chirashi, Sashimi Platter, Poke Bowl, Ceviche, Tartare, etc.
  - mixed_seafood (8): Paella de Mariscos, Cioppino, Bouillabaisse, Cataplana, Seafood Platter, etc.
- **Cuisines**: American, French, Italian, Spanish, Portuguese, Japanese, Thai, Korean, Vietnamese, Cajun, British, Greek, Peruvian, Brazilian, Singaporean, Australian
- **Cooking Methods**: grilled, pan_fried, deep_fried, steamed, baked, raw, poached, broiled, sauteed, stewed
- **Origin Countries**: 16+ countries (USA, France, Italy, Spain, Portugal, UK, Japan, Thailand, Peru, etc.)
- **Scripts**:
  - `seafood/scripts/seafood-complete-import.sql` - Schema + 63 records
  - `seafood/scripts/seafood-missing-ingredients.sql` - ~80 new ingredients
  - `seafood/scripts/seafood-product-ingredients.sql` - Junction table links
- **Types**: `seafood/types.ts` (SeafoodItem interface)
- **Data Files**: `seafood/data/` (5 files: fish.ts, shellfish.ts, crustaceans.ts, sushi-sashimi.ts, mixed-seafood.ts)
- **Note**: Second database with TEXT+CHECK pattern (no ENUM). Comprehensive seafood from global cuisines.

### Chinese (73) - NEW 2025-12-19
- **Path**: `shared/database/chinese/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (73 dishes, 589 ingredient links, 42 new ingredients)
- **Collections** (by category):
  - stir_fries (10): Kung Pao Chicken, Mapo Tofu, Sweet & Sour Pork, Beef & Broccoli, Mongolian Beef, Twice Cooked Pork, Mu Shu Pork, General Tso's Chicken, Orange Chicken, Cashew Chicken
  - noodles (8): Chow Mein, Lo Mein, Dan Dan Noodles, Zhajiang Noodles, Beef Noodle Soup, Lanzhou Hand-Pulled Noodles, Wonton Noodles, Singapore Noodles
  - dim_sum (10): Siu Mai, Har Gow, Char Siu Bao, Cheung Fun, Xiaolongbao, Turnip Cake, Chicken Feet, Spring Rolls, Egg Tart, Steamed Spare Ribs
  - rice_dishes (6): Yangzhou Fried Rice, Claypot Rice, Congee, Hainanese Chicken Rice, Lo Mai Gai, Zongzi
  - roasted (6): Peking Duck, Char Siu, Cantonese Roast Duck, Siu Yuk, Roast Goose, White Cut Chicken
  - soups (7): Hot and Sour Soup, Wonton Soup, Egg Drop Soup, Corn Soup with Crab, Winter Melon Soup, Sichuan Hot Pot, Herbal Chicken Soup
  - braised (6): Hong Shao Rou, Dongpo Pork, Soy Sauce Chicken, Braised Beef Brisket, Lion's Head Meatballs, Yu Xiang Eggplant
  - seafood (7): Cantonese Steamed Fish, Kung Pao Shrimp, Salt & Pepper Squid, Lobster with Ginger Scallion, Crab with XO Sauce, Shrimp with Eggs, Steamed Prawns
  - appetizers (7): Scallion Pancakes, Potstickers, Jianbing, Cold Noodles, Smashed Cucumber, Century Egg Tofu, Drunken Chicken
  - desserts (6): Mango Pudding, Sesame Balls, Tang Yuan, Mooncake, Double Skin Milk, Red Bean Soup
- **Regions**: cantonese, sichuan, hunan, shandong, jiangsu, fujian, anhui, zhejiang, beijing, northeastern, xinjiang, hakka, taiwanese, hong_kong, international
- **Cuisine Styles**: cantonese, sichuan, hunan, shanghai, beijing, hakka, chaozhou, dim_sum, american_chinese, fusion
- **Protein Types**: chicken, pork, beef, duck, lamb, shrimp, fish, squid, crab, lobster, mixed_seafood, tofu, vegetables, egg, mixed
- **Cooking Methods**: stir_fried, deep_fried, steamed, braised, roasted, boiled, smoked, clay_pot, hot_pot, raw
- **Special Fields**: `chinese_name` (Pinyin romanization), `chinese_script` (Chinese characters 汉字), `is_dim_sum`
- **Scripts** (numbered for execution order):
  - `01-chinese-missing-ingredients.sql` - 42 new ingredients
  - `02-chinese-schema.sql` - Schema with TEXT+CHECK
  - `03-chinese-data.sql` - 73 dishes
  - `04-chinese-product-ingredients.sql` - 589 junction table links
- **Types**: `chinese/types.ts` (ChineseItem interface)
- **Data Files**: `chinese/data/` (10 files: stir-fries.ts, noodles.ts, dim-sum.ts, rice-dishes.ts, roasted.ts, soups.ts, braised.ts, seafood.ts, appetizers.ts, desserts.ts)
- **Generators**: `generate-sql.py`, `04-chinese-product-ingredients.py`
- **Note**: Tenth v1.1-compliant database. Comprehensive Chinese dishes with authentic names in Pinyin and Chinese characters. Includes regional cuisines from Cantonese to Sichuan.

### Thai (69) - NEW 2025-12-19
- **Path**: `shared/database/thai/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (69 dishes, 693 ingredient links, 72 new ingredients)
- **Collections** (by category):
  - curries (8): Green Curry, Red Curry, Massaman, Panang, Yellow Curry, Jungle Curry, Khao Soi, Green Curry Shrimp
  - stir_fries (9): Pad Thai, Pad See Ew, Pad Kra Pao, Pad Prik King, Pad Pak, Pad Cashew, Pad Ginger, Pad Thai Goong Sod, Pad Woon Sen
  - soups (6): Tom Yum Goong, Tom Kha Gai, Tom Yum Nam Khon, Gaeng Jued, Tom Sap, Po Taek
  - salads (7): Som Tam, Yum Woon Sen, Larb Moo, Larb Gai, Yum Neua, Yum Pla Dook Foo, Nam Tok
  - noodles (6): Guay Teow Reua, Guay Teow Tom Yum, Kuay Chap, Rad Na, Guay Teow Haeng, Ba Mee Haeng
  - rice_dishes (7): Khao Pad, Khao Man Gai, Khao Moo Daeng, Khao Ka Moo, Khao Pad Krapao, Khao Na Ped, Khao Niao
  - appetizers (7): Satay, Spring Rolls, Fresh Rolls, Tod Mun Pla, Mieng Kum, Goong Sarong, Gai Ho Bai Toey
  - grilled (6): Gai Yang, Moo Ping, Kor Moo Yang, Pla Pao, Goong Yang, See Krong Moo Yang
  - seafood (7): Pla Rad Prik, Pla Neung Manao, Goong Ob Woon Sen, Hoy Lai Pad Nam Prik Pao, Pla Meuk Pad Khai Kem, Poo Pad Pong Kari, Hoy Thod
  - desserts (6): Mango Sticky Rice, Roti Banana, Tub Tim Krob, Khanom Krok, Thai Tea Panna Cotta, Bingsu Thai
- **Regions**: central, northern, northeastern, southern, royal, street, international
- **Protein Types**: chicken, pork, beef, duck, shrimp, fish, squid, crab, mixed_seafood, tofu, vegetables, egg, mixed
- **Cooking Methods**: stir_fried, boiled, grilled, deep_fried, steamed, raw, simmered, roasted
- **Curry Types**: green, red, yellow, massaman, panang, jungle, none
- **Scripts** (numbered for execution order):
  - `01-thai-missing-ingredients.sql` - 72 new ingredients
  - `02-thai-schema.sql` - Schema with TEXT+CHECK
  - `03-thai-data.sql` - 69 dishes
  - `04-thai-product-ingredients.sql` - 693 junction table links
- **Types**: `thai/types.ts` (ThaiItem interface)
- **Data Files**: `thai/data/` (10 files: curries.ts, stir-fries.ts, soups.ts, salads.ts, noodles.ts, rice-dishes.ts, appetizers.ts, grilled.ts, seafood.ts, desserts.ts)
- **Note**: Ninth v1.1-compliant database. Authentic Thai dishes with thai_name and thai_script fields for native names. Fixed product_ingredients schema (role/sort_order instead of is_primary/display_order).

### Korean (77) - NEW 2025-12-19
- **Path**: `shared/database/korean/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (77 dishes, 560 ingredient links, 45 new ingredients)
- **Collections** (by category):
  - bbq (8): Samgyeopsal, Bulgogi, Galbi, Dwaeji Galbi, Dakgalbi, Chadolbaegi, Gopchang, Makchang
  - rice_dishes (8): Bibimbap, Dolsot Bibimbap, Kimchi Bokkeumbap, Gimbap, Chamchi Gimbap, Bokkeumbap, Omurice, Nurungji
  - stews_soups (10): Kimchi Jjigae, Doenjang Jjigae, Sundubu Jjigae, Budae Jjigae, Gamjatang, Samgyetang, Galbitang, Seolleongtang, Yukgaejang, Daktoritang
  - noodles (8): Japchae, Naengmyeon, Bibim Naengmyeon, Kalguksu, Jajangmyeon, Jjamppong, Ramyeon, Kongguksu
  - pancakes (7): Pajeon, Haemul Pajeon, Kimchi Jeon, Bindaetteok, Hobak Jeon, Dongtae Jeon, Gamja Jeon
  - fried_chicken (8): Yangnyeom Chicken, Huraideu Chicken, Garlic Soy Chicken, Honey Butter Chicken, Snow Cheese Chicken, Bburinkle Chicken, Padak, Dakgangjeong
  - street_food (10): Tteokbokki, Rabokki, Odeng, Hotteok, Bungeoppang, Twigim, Sundae, Gyeranppang, Dakkochi, Tornado Potato
  - side_dishes/fermented (10): Baechu Kimchi, Kkakdugi, Nabak Kimchi, Kongnamul, Sigeumchi Namul, Musaengchae, Gyeranjjim, Japchae Banchan, Myeolchi Bokkeum, Gamja Jorim
  - desserts (8): Patbingsu, Injeolmi Bingsu, Songpyeon, Yakgwa, Dasik, Sujeonggwa, Sikhye, Hwajeon
- **Regions**: seoul, busan, jeju, jeonju, gyeongsang, jeolla, gangwon, national, royal_cuisine
- **Protein Types**: beef, pork, chicken, seafood, tofu, mixed, none
- **Cooking Methods**: grilled, braised, stir_fried, deep_fried, steamed, boiled, raw, fermented, pan_fried
- **Special Fields**: `korean_name` (Romanized), `korean_script` (Hangul 한글), `is_fermented`, `is_street_food`, `has_banchan`
- **Scripts** (numbered for execution order):
  - `00-korean-schema.sql` - Schema with TEXT+CHECK
  - `01-korean-missing-ingredients.sql` - 45 new ingredients
  - `02-korean-data.sql` - 77 dishes
  - `03-korean-product-ingredients.sql` - 560 junction table links
  - `complete-korean-import.sql` - All combined for single import
- **Types**: `korean/types.ts` (KoreanItem interface)
- **Data Files**: `korean/data/` (9 files: bbq.ts, rice.ts, stews.ts, noodles.ts, pancakes.ts, chicken.ts, street-food.ts, banchan.ts, desserts.ts)
- **Note**: Eleventh v1.1-compliant database. Comprehensive Korean dishes with authentic names in Romanization and Hangul. Includes popular BBQ, iconic fried chicken, and traditional fermented foods.
- **Lesson Learned**: Sequential file execution (00→01→02→03) is preferred over combined import file for easier debugging. 4 schema errors were encountered and documented in PROCEDURE-NEW-DATABASE.md.

### Spirits (197) - NEW 2025-12-18
- **Path**: `shared/database/spirits/`
- **Architecture**: DATABASE-STANDARDS v1.1 compliant (TEXT+CHECK, no ENUM)
- **Schema Version**: v1.0 (TEXT + CHECK constraints)
- **Supabase**: ✅ LIVE (197 spirits)
- **Collections** (by category):
  - Whisky (34): Scotch Single Malt (Glenfiddich, Macallan, Lagavulin, Talisker), Scotch Blended (Johnnie Walker, Chivas), Bourbon (Maker's Mark, Woodford, Buffalo Trace), Irish (Jameson, Redbreast), Japanese (Yamazaki, Hakushu, Nikka), Rye, Canadian
  - Gin (18): London Dry (Tanqueray, Beefeater, Bombay), Contemporary (Hendrick's, Monkey 47), Navy Strength, Old Tom, Sloe Gin
  - Rum (25): White (Bacardi, Havana Club), Gold, Dark (Myers's, Goslings), Spiced (Kraken, Captain Morgan), Agricole (Rhum Clement), Cachaça
  - Amari & Liqueurs (43): Amaro (Averna, Montenegro, Fernet-Branca, Campari, Aperol), Alpine (Braulio), Limoncello (Villa Massa, Pallini, Luxardo), Liqueurs (Chartreuse, Cointreau, Grand Marnier, Kahlúa, Baileys, Amaretto)
  - Vodka (15): French (Grey Goose, Cîroc), Polish (Belvedere, Chopin, Żubrówka), Swedish (Absolut), Russian (Stolichnaya), American (Tito's), Japanese (Haku)
  - Tequila & Mezcal (20): Blanco (Patrón, Don Julio, Casamigos), Reposado, Añejo, Extra Añejo (Don Julio 1942), Mezcal Joven (Del Maguey, Ilegal)
  - Brandy & Cognac (25): Cognac VS/VSOP/XO (Hennessy, Rémy Martin, Courvoisier, Martell), Armagnac (Delord), Calvados (Boulard), **Grappa (13)** (Nonino Monovitigno & Riserva, Poli Barrique & Sarpa, Nardini Bianca & Riserva, Berta Tre Soli Tre & Roccanivo, Marolo Barolo & Amarone, Capovilla Prosecco, Bocchino Sigillo Nero, Bepi Tosolini), Pisco
  - **Rare & Ultra-Premium (17)**:
    - Chinese Baijiu (5): Moutai Flying Fairy, Moutai Vintage 1980 ($300k+), Wuliangye, Luzhou Laojiao 1573, Fenjiu 30 Year
    - Ultra-Premium Whisky (7): Yamazaki 25, Hibiki 30, Macallan 25 & 30, Dalmore 25, Pappy Van Winkle 23, Glenfiddich 40
    - Ultra-Premium Cognac (3): Louis XIII, Hennessy Paradis, Richard Hennessy
    - Rare Specialty (2): Chartreuse V.E.P. Green, Armagnac Vintage 1900
- **Price Tiers**: budget, standard, premium, ultra_premium, luxury
- **Countries**: 20+ (Scotland, Ireland, USA, Japan, France, Italy, Mexico, Poland, Sweden, Russia, China, etc.)
- **Scripts**:
  - `spirits/scripts/01-spirits-schema.sql` - Schema with TEXT+CHECK
  - `spirits/scripts/02-spirits-data.sql` - 197 INSERT statements
  - `spirits/scripts/generate-sql.py` - Python generator from TypeScript
- **Types**: `spirits/types.ts` (SpiritItem interface)
- **Data Files**: 8 files in `spirits/data/` (whisky.ts, gin.ts, rum.ts, amari-liqueurs.ts, vodka.ts, tequila-mezcal.ts, brandy-cognac.ts, rare-premium.ts)
- **Note**: Comprehensive spirits database with 13 Italian grappe, 5 Chinese baijiu, and ultra-rare collectors' items

### Wines (144) - EXPANDED 2025-12-16
- **Path**: `shared/database/wines/`
- **Architecture**: English only, translations separate, Sistema 5 Dimensioni
- **Countries Covered**: 49 wine-producing countries (GLOBAL COVERAGE - all 42 ChatGPT-listed countries + 7 extra)
- **Collections**:
  - Red Wines (19): Italian DOCG (Barolo, Brunello, Amarone, Chianti), French (Bordeaux, Burgundy, Rhône), Spanish (Rioja, Ribera, Priorat), New World (Napa, Mendoza, Barossa)
  - White Wines (22): French (Chablis, Meursault, Sancerre, Alsace), German (Mosel, Rheingau Riesling), Italian (Pinot Grigio, Gavi, Verdicchio, Fiano), Spanish (Albariño, Verdejo), New World (NZ Sauvignon Blanc, Napa Chardonnay)
  - Sparkling Wines (12): Champagne (Brut, Blanc de Blancs, Rosé), Italian (Prosecco, Franciacorta, Moscato), Spanish (Cava), Crémant (Alsace, Bourgogne)
  - Rosé Wines (4): Provence, Tavel, Rioja Rosado, Cerasuolo
  - Dessert Wines (5): Sauternes, TBA, Tokaji, Vin Santo, Icewine
  - Fortified Wines (7): Port (Ruby, Tawny, Vintage), Sherry (Fino, Oloroso), Madeira, Marsala
  - Emerging Europe (21): Georgia (Saperavi, Rkatsiteli Qvevri), Croatia (Plavac Mali, Malvazija), Slovenia (Rebula), Romania (Feteasca), Bulgaria (Mavrud, Melnik), Greece (Xinomavro, Assyrtiko), Hungary (Bikavér, Furmint), Moldova, Serbia, Armenia
  - Extended World (32): UK (English Sparkling), Lebanon (Bekaa Valley), Israel (Golan Heights), Turkey (Öküzgözü, Boğazkere), China (Ningxia), Japan (Koshu), India (Nashik), Uruguay (Tannat), Brazil (Serra Gaúcha), South Africa (Pinotage, Chenin Blanc), Morocco, Switzerland (Chasselas), Mexico (Valle de Guadalupe), Canada (Icewine, Okanagan), Austria (Grüner Veltliner, Blaufränkisch)
  - Additional Regions (22): Czech Republic (Moravian Riesling, Pálava), Slovakia (Frankovka), Ukraine (Odessa, Shabo), Cyprus (Commandaria - oldest named wine in world!, Xynisteri), Tunisia (Mornag, Muscat de Kélibia), Algeria (Médéa), Peru (Ica Tannat, Quebranta), Bolivia (Tarija high-altitude - world's highest vineyards), Thailand (Khao Yai, Hua Hin), Vietnam (Da Lat), Indonesia (Bali wines), Belgium (Wallonia), Luxembourg (Moselle, Crémant), Malta (Gellewża)
- **Schema**: `wines/schema/create-wines-table.sql`
- **Batches**: ⏳ Pending
- **Data Files**:
  - `red-wines.ts`, `white-wines.ts`, `sparkling-wines.ts`, `rose-dessert-fortified.ts`
  - `emerging-europe-wines.ts`
  - `extended-world-wines.ts`
  - `additional-regions-wines.ts` (NEW - rare/unique wines as differentiators)
- **Note**: Most comprehensive global wine database covering 48 countries. Includes rare wines (Commandaria, Bolivian high-altitude, Thai monsoon wines) as differentiators for restaurants seeking unique offerings

---

## File Structure

```
shared/database/
├── cocktails/
│   ├── data/
│   ├── schema/
│   └── scripts/batches/
├── beers/
│   ├── data/
│   ├── schema/
│   └── scripts/batches/
├── pizzas/
│   ├── data/
│   │   ├── italian-classic-pizzas.ts
│   │   ├── american-pizzas.ts
│   │   ├── gourmet-pizzas.ts
│   │   ├── regional-italian-pizzas.ts
│   │   ├── international-fusion-pizzas.ts
│   │   └── index.ts
│   ├── schema/pizzas-schema.sql
│   └── scripts/batches/ (13 files)
├── salads/
│   ├── data/
│   │   ├── classic-salads.ts
│   │   ├── italian-salads.ts
│   │   ├── mediterranean-salads.ts
│   │   ├── asian-salads.ts
│   │   ├── bowl-salads.ts
│   │   ├── healthy-salads.ts
│   │   └── index.ts
│   ├── schema/create-salads-table.sql
│   └── scripts/batches/ (9 files)
├── pasta/
│   ├── data/
│   └── schema/create-pasta-table.sql
├── risotti/
│   ├── data/
│   └── schema/create-risotti-table.sql
├── dumplings/
│   ├── data/
│   └── schema/create-dumplings-table.sql
├── soups/
│   ├── data/
│   └── schema/create-soups-table.sql
├── migrations/
│   ├── food-batches/
│   │   ├── pasta/ (9 batch files)
│   │   ├── risotti/ (3 batch files)
│   │   ├── dumplings/ (2 batch files)
│   │   └── soups/ (4 batch files)
│   ├── 020-food-databases-schema.sql
│   └── 020a-fix-pasta-table.sql
└── scripts/
    └── generate-all-food-batches.ts
```

---

## Supabase Tables

### Verifica Query
```sql
SELECT
    'cocktails' as tabella, COUNT(*) as record FROM cocktails
UNION ALL SELECT 'beers', COUNT(*) FROM beers
UNION ALL SELECT 'pizzas', COUNT(*) FROM pizzas
UNION ALL SELECT 'salads', COUNT(*) FROM salads
UNION ALL SELECT 'pasta', COUNT(*) FROM pasta
UNION ALL SELECT 'risotti', COUNT(*) FROM risotti
UNION ALL SELECT 'dumplings', COUNT(*) FROM dumplings
UNION ALL SELECT 'soups', COUNT(*) FROM soups
ORDER BY record DESC;
```

---

## Sistema 5 Dimensioni

Tutti i database food implementano il **Sistema 5 Dimensioni** per i filtri di sicurezza alimentare:

| Dimensione | Parametri |
|------------|-----------|
| Allergeni | 30 (EU 14 + Korea 7 + Japan 7 + GUDBRO 2) |
| Intolleranze | 10 |
| Diete | 11 |
| Nutrizione | 9 |
| Piccantezza | 6 livelli |

**Totale: 66 parametri per prodotto**

---

## Changelog

### 2025-12-19 - Mediterranean & South American Databases
- [x] **Greek: 74 NEW** - v1.2 compliant (TEXT+CHECK)
  - mezedes (12), souvlakia (8), seafood (10), main_dishes (12), pites (8), vegetarian (8), soups_salads (8), desserts (8)
  - ~50 new ingredients added (Greek cheeses, herbs, phyllo, specific meats)
  - ~450 product_ingredients links created (~6.1 per dish)
- [x] **Lebanese: 94 NEW** - v1.2 compliant (TEXT+CHECK)
  - mezze (18), grilled (14), wraps_sandwiches (10), rice_dishes (10), stews (10), salads (10), vegetarian (12), desserts (10)
  - ~60 new ingredients added (tahini, sumac, za'atar, pomegranate molasses, etc.)
  - ~560 product_ingredients links created (~6.0 per dish)
- [x] **Georgian: 74 NEW** - v1.2 compliant (TEXT+CHECK)
  - khachapuri (8), khinkali (8), mtsvadi_grills (10), stews (10), salads_appetizers (10), breads (8), vegetarian (10), desserts (10)
  - ~45 new ingredients added (Georgian spices, walnut paste, tkemali, etc.)
  - ~440 product_ingredients links created (~5.9 per dish)
- [x] **Turkish: 98 NEW** - v1.2 compliant (TEXT+CHECK)
  - kebabs (15), pide_lahmacun (8), mezes (15), seafood (10), vegetarian (10), rice_dishes (8), soups (8), borek_pastries (8), desserts (10), breakfast (6)
  - ~55 new ingredients added (Turkish spices, cheeses, specific meats)
  - ~590 product_ingredients links created (~6.0 per dish)
- [x] **Brazilian: 91 NEW** - v1.2 compliant (TEXT+CHECK)
  - churrasco (10), feijoada (7), street_food (10), seafood (10), rice_beans (8), northeastern (10), soups_stews (8), desserts (10), snacks (8), drinks (10)
  - ~55 new ingredients added (picanha, cachaça, dendê oil, cassava, etc.)
  - 190 product_ingredients links created (~2.1 per dish)
- [x] Total products: 2128 → **2559** (+431)
- [x] Total ingredients: ~1546 → **~1756** (+210)
- [x] Total ingredient links: ~10,669 → **~13,750** (+3,081)
- [x] Total databases: 27 → **32** (+5)

### 2025-12-19 - Korean Database
- [x] **Korean: 77 NEW** - Eleventh database conforme a v1.1 (TEXT+CHECK)
  - BBQ: 8 (Samgyeopsal, Bulgogi, Galbi, Dwaeji Galbi, Dakgalbi, Chadolbaegi, Gopchang, Makchang)
  - Rice Dishes: 8 (Bibimbap, Dolsot Bibimbap, Kimchi Bokkeumbap, Gimbap, Chamchi Gimbap, Bokkeumbap, Omurice, Nurungji)
  - Stews & Soups: 10 (Kimchi Jjigae, Doenjang Jjigae, Sundubu Jjigae, Budae Jjigae, Gamjatang, Samgyetang, etc.)
  - Noodles: 8 (Japchae, Naengmyeon, Bibim Naengmyeon, Kalguksu, Jajangmyeon, Jjamppong, Ramyeon, Kongguksu)
  - Pancakes: 7 (Pajeon, Haemul Pajeon, Kimchi Jeon, Bindaetteok, Hobak Jeon, Dongtae Jeon, Gamja Jeon)
  - Fried Chicken: 8 (Yangnyeom, Huraideu, Garlic Soy, Honey Butter, Snow Cheese, Bburinkle, Padak, Dakgangjeong)
  - Street Food: 10 (Tteokbokki, Rabokki, Odeng, Hotteok, Bungeoppang, Twigim, Sundae, Gyeranppang, Dakkochi, Tornado Potato)
  - Banchan/Fermented: 10 (Baechu Kimchi, Kkakdugi, Nabak Kimchi, Kongnamul, Sigeumchi Namul, Musaengchae, etc.)
  - Desserts: 8 (Patbingsu, Injeolmi Bingsu, Songpyeon, Yakgwa, Dasik, Sujeonggwa, Sikhye, Hwajeon)
- [x] 45 new ingredients added (Korean sauces, fermented items, specialty proteins)
- [x] 560 product_ingredients links created (~7.3 per dish)
- [x] Schema v1.0 with TEXT+CHECK (no ENUM)
- [x] Special fields: `korean_name` (Romanized), `korean_script` (Hangul 한글), `is_fermented`, `is_street_food`, `has_banchan`
- [x] 9 Korean regions covered (Seoul, Busan, Jeju, Jeonju, Gyeongsang, Jeolla, Gangwon, National, Royal Cuisine)
- [x] Total products: 1906 → **1983** (+77)
- [x] Total ingredient links: ~8,811 → **~9,371** (+560)
- [x] Total ingredients: ~1454 → **~1499** (+45)
- [x] Total databases: 26 → **27**

### 2025-12-19 - Chinese Database
- [x] **Chinese: 73 NEW** - Tenth database conforme a v1.1 (TEXT+CHECK)
  - Stir-fries: 10 (Kung Pao Chicken, Mapo Tofu, Sweet & Sour Pork, Beef & Broccoli, Mongolian Beef, etc.)
  - Noodles: 8 (Chow Mein, Lo Mein, Dan Dan Noodles, Beef Noodle Soup, Lanzhou Hand-Pulled, etc.)
  - Dim Sum: 10 (Siu Mai, Har Gow, Char Siu Bao, Cheung Fun, Xiaolongbao, Turnip Cake, etc.)
  - Rice Dishes: 6 (Yangzhou Fried Rice, Claypot Rice, Congee, Hainanese Chicken Rice, etc.)
  - Roasted: 6 (Peking Duck, Char Siu, Cantonese Roast Duck, Siu Yuk, Roast Goose, White Cut Chicken)
  - Soups: 7 (Hot and Sour Soup, Wonton Soup, Egg Drop Soup, Sichuan Hot Pot, Herbal Soup, etc.)
  - Braised: 6 (Hong Shao Rou, Dongpo Pork, Soy Sauce Chicken, Lion's Head Meatballs, etc.)
  - Seafood: 7 (Cantonese Steamed Fish, Kung Pao Shrimp, Lobster with Ginger Scallion, etc.)
  - Appetizers: 7 (Scallion Pancakes, Potstickers, Jianbing, Smashed Cucumber, Century Egg Tofu, etc.)
  - Desserts: 6 (Mango Pudding, Sesame Balls, Tang Yuan, Mooncake, Double Skin Milk, Red Bean Soup)
- [x] 42 new ingredients added (Chinese herbs, sauces, specialty items like XO Sauce, Chu Hou Paste, etc.)
- [x] 589 product_ingredients links created (~8.1 per dish)
- [x] Schema v1.0 with TEXT+CHECK (no ENUM)
- [x] Special fields: `chinese_name` (Pinyin), `chinese_script` (汉字), `is_dim_sum`
- [x] 15 regional cuisines covered (Cantonese, Sichuan, Hunan, Beijing, Shanghai, Hong Kong, etc.)
- [x] Total products: 1833 → **1906** (+73)
- [x] Total ingredient links: ~8,222 → **~8,811** (+589)
- [x] Total ingredients: ~1412 → **~1454** (+42)
- [x] Total databases: 25 → **26**

### 2025-12-19 - Thai Database
- [x] **Thai: 69 NEW** - Ninth database conforme a v1.1 (TEXT+CHECK)
  - Curries: 8 (Green, Red, Massaman, Panang, Yellow, Jungle, Khao Soi, Green Curry Shrimp)
  - Stir-fries: 9 (Pad Thai, Pad See Ew, Pad Kra Pao, Pad Prik King, Pad Pak, Pad Cashew, etc.)
  - Soups: 6 (Tom Yum Goong, Tom Kha Gai, Tom Yum Nam Khon, Gaeng Jued, Tom Sap, Po Taek)
  - Salads: 7 (Som Tam, Yum Woon Sen, Larb Moo, Larb Gai, Yum Neua, Yum Pla Dook Foo, Nam Tok)
  - Noodles: 6 (Guay Teow Reua, Guay Teow Tom Yum, Kuay Chap, Rad Na, Guay Teow Haeng, Ba Mee Haeng)
  - Rice Dishes: 7 (Khao Pad, Khao Man Gai, Khao Moo Daeng, Khao Ka Moo, Khao Pad Krapao, Khao Na Ped, Khao Niao)
  - Appetizers: 7 (Satay, Spring Rolls, Fresh Rolls, Tod Mun Pla, Mieng Kum, Goong Sarong, Gai Ho Bai Toey)
  - Grilled: 6 (Gai Yang, Moo Ping, Kor Moo Yang, Pla Pao, Goong Yang, See Krong Moo Yang)
  - Seafood: 7 (Pla Rad Prik, Pla Neung Manao, Goong Ob Woon Sen, Hoy Lai Pad Nam Prik Pao, etc.)
  - Desserts: 6 (Mango Sticky Rice, Roti Banana, Tub Tim Krob, Khanom Krok, Thai Tea Panna Cotta, Bingsu Thai)
- [x] 72 new ingredients added (Thai herbs, curry pastes, specialty items)
- [x] 693 product_ingredients links created (~10.0 per dish)
- [x] Schema v1.0 with TEXT+CHECK (no ENUM)
- [x] **Lesson learned**: product_ingredients uses `role`/`sort_order` instead of `is_primary`/`display_order`
- [x] Total products: 1764 → **1833** (+69)
- [x] Total ingredient links: ~7,669 → **~8,222** (+693)
- [x] Total ingredients: ~1343 → **~1412** (+69)
- [x] Total databases: 24 → **25**

### 2025-12-18 - Spirits Database
- [x] **Spirits: 197 NEW** - Eighth database conforme a v1.1 (TEXT+CHECK)
  - Whisky: 34 (Scotch Single Malt, Blended, Bourbon, Irish, Japanese, Rye, Canadian)
  - Gin: 18 (London Dry, Contemporary, Navy Strength, Old Tom, Sloe)
  - Rum: 25 (White, Gold, Dark, Spiced, Agricole, Cachaça)
  - Amari & Liqueurs: 43 (Amaro, Alpine, Limoncello, Cream, Herbal, Coffee, Anise)
  - Vodka: 15 (French, Polish, Swedish, Russian, American, Japanese)
  - Tequila & Mezcal: 20 (Blanco, Reposado, Añejo, Extra Añejo, Mezcal Joven)
  - Brandy & Cognac: 25 (Cognac VS/VSOP/XO, Armagnac, Calvados, **13 Grappe**, Pisco)
  - **Rare & Ultra-Premium: 17** (Baijiu, Ultra-Premium Whisky, Ultra-Premium Cognac, Rare Specialty)
- [x] **Grappa expanded from 2 to 13**: Nonino (2), Poli (2), Nardini (2), Berta (2), Marolo (2), Capovilla, Bocchino, Bepi Tosolini
- [x] **Chinese Baijiu added**: Moutai (2), Wuliangye, Luzhou Laojiao 1573, Fenjiu 30 Year
- [x] **Ultra-Premium collection**: Yamazaki 25, Hibiki 30, Macallan 25 & 30, Dalmore 25, Pappy Van Winkle 23, Glenfiddich 40, Louis XIII, Hennessy Paradis & Richard, Chartreuse V.E.P., Armagnac 1900
- [x] Schema v1.0 with TEXT+CHECK (no ENUM)
- [x] Python generator: `generate-sql.py` for TypeScript → SQL conversion
- [x] Total products: 1567 → **1764** (+197)
- [x] Total databases: 23 → **24**

### 2025-12-18 - Indian Database
- [x] **Indian: 65 NEW** - Seventh database conforme a v1.1 (TEXT+CHECK)
  - Curries: 12 (Butter Chicken, Chicken Tikka Masala, Lamb Rogan Josh, Korma, Vindaloo, Madras, etc.)
  - Biryani & Rice: 9 (Hyderabadi, Lucknowi, Chicken, Kolkata, Vegetable, Thalassery, Jeera Rice, Pulao, etc.)
  - Tandoori: 9 (Tandoori Chicken, Chicken Tikka, Seekh Kebab, Malai Kebab, Fish Tikka, Paneer Tikka, etc.)
  - Breads: 8 (Garlic Naan, Butter Naan, Roti, Paratha, Aloo Paratha, Puri, Bhatura, Kulcha)
  - Appetizers: 7 (Samosa, Onion Pakora, Vegetable Pakora, Aloo Tikki, Onion Bhaji, Chicken Pakora, Paneer Pakora)
  - Dals: 6 (Dal Makhani, Dal Tadka, Chana Masala, Rajma, Sambar, Dal Fry)
  - Vegetarian: 8 (Palak Paneer, Matar Paneer, Paneer Butter Masala, Aloo Gobi, Kadai Paneer, Shahi Paneer, etc.)
  - Street Food: 6 (Pav Bhaji, Vada Pav, Pani Puri, Bhel Puri, Dosa, Idli)
- [x] 40 new ingredients added (Indian spices, chutneys, specialty items)
- [x] 705 product_ingredients links created (~10.8 per dish - highest average!)
- [x] Schema v1.0 with TEXT+CHECK (no ENUM)
- [x] **Lesson learned**: ING_SEV category 'snacks' doesn't exist → changed to 'grains'
- [x] Total products: 1502 → **1567** (+65)
- [x] Total ingredient links: ~6,964 → **~7,669** (+705)
- [x] Total ingredients: ~1303 → **~1343** (+40)
- [x] Total databases: 22 → **23**

### 2025-12-18 - Breakfast Database
- [x] **Breakfast: 65 NEW** - Sixth database conforme a v1.1 (TEXT+CHECK)
  - Eggs: 10 (Eggs Benedict, Florentine, Royale, Omelettes, Frittata, Shakshuka, Huevos Rancheros, etc.)
  - Pancakes & Waffles: 10 (American, Buttermilk, Belgian, Liege, Crepes, Dutch Baby, Souffle, etc.)
  - Pastries: 10 (Croissant, Pain au Chocolat, Danish, Cinnamon Roll, Brioche, Kouign-Amann, etc.)
  - Cereals & Bowls: 10 (Acai Bowl, Smoothie Bowl, Overnight Oats, Congee, Granola Parfait, etc.)
  - Savory: 10 (Full English, Full Irish, Breakfast Burrito, Avocado Toast, Croque Madame, etc.)
  - International: 15 (Japanese, Turkish, Israeli, Korean, Vietnamese, Brazilian, Spanish, Indian, German, etc.)
- [x] 58 new ingredients added (Canadian bacon, English muffins, pearl sugar, yuzu kosho, etc.)
- [x] 499 product_ingredients links created
- [x] Schema v1.0 with TEXT+CHECK (no ENUM)
- [x] Local ingredients cache system created (1303 ingredients synced)
- [x] **PROCEDURE-NEW-DATABASE.md updated** with lessons learned:
  - Added required fields documentation for ingredients INSERT (slug, description)
  - Added new error types to troubleshooting table
  - Added best practice #14 about required ingredient columns
- [x] Total products: 1437 → **1502** (+65)
- [x] Total ingredient links: ~6,465 → **~6,964** (+499)
- [x] Total ingredients: ~1245 → **~1303** (+58)
- [x] Total databases: 21 → **22**

### 2025-12-18 - Vegetarian Database
- [x] **Vegetarian: 65 NEW** - Fourth database conforme a v1.1 (TEXT+CHECK)
  - Tofu Dishes: 8 (Mapo Tofu, Kung Pao, Agedashi, Thai Basil, Teriyaki, Tikka Masala, Sundubu Jjigae)
  - Tempeh Dishes: 4 (Bacon, Indonesian Stir-Fry, BBQ, Tacos)
  - Seitan Dishes: 5 (Steak, Gyros, Buffalo Wings, Schnitzel, Kebabs)
  - Legume Dishes: 8 (Chana Masala, Dal Tadka, Falafel, Black Bean Burger, Lentil Soup, Rajma, Hummus Bowl, Vegan Feijoada)
  - Grain Bowls: 8 (Buddha Bowl, Bibimbap, Falafel Bowl, Burrito Bowl, Poke Bowl, Macrobiotic, Thai Peanut, Harvest)
  - Vegetable Mains: 8 (Cauliflower Steak, Portobello Burger, Jackfruit Pulled Pork, Stuffed Peppers, Mushroom Stroganoff, Eggplant Parmesan, Ratatouille)
  - Indian Mains: 8 (Palak Paneer, Matar Paneer, Paneer Tikka, Baingan Bharta, Aloo Gobi, Malai Kofta, Sambar, Paneer Butter Masala)
  - Asian Mains: 8 (Pad Thai, Green Curry, Lo Mein, Dan Dan Noodles, Tempura, Massaman Curry, Singapore Noodles, Japchae)
  - Mediterranean Mains: 8 (Moussaka, Shakshuka, Spanakopita, Dolmas, Imam Bayildi, Mujaddara, Koshari, Fatteh)
- [x] ~80 new ingredients added (tofu varieties, tempeh, seitan, paneer, Indian spices, Asian sauces)
- [x] 530 product_ingredients links created
- [x] 183 unique ingredients used
- [x] Schema v1.0 with TEXT+CHECK (no ENUM)
- [x] **Lessons learned**:
  - ING_PEPPER vs ING_BLACK_PEPPER - check existing ingredient IDs before using in data
  - Some ingredients had duplicate slugs causing ON CONFLICT to skip them
- [x] Total products: 1324 → **1389** (+65)
- [x] Total ingredient links: ~5,437 → **~5,967** (+530)
- [x] Total databases: 19 → **20**

### 2025-12-18 - Mexican Database
- [x] **Mexican: 66 NEW** - Third database conforme a v1.1 (TEXT+CHECK)
  - Tacos: 10 (Al Pastor, Carne Asada, Carnitas, Barbacoa, Birria, Pescado, Camarones, Chorizo, Lengua, Suadero)
  - Burritos: 6 (Carne Asada, Pollo, Carnitas, California, Bean & Cheese, Wet)
  - Enchiladas: 7 (Rojas, Verdes, Suizas, Mole, Enmoladas, Enfrijoladas, Entomatadas)
  - Antojitos: 15 (Quesadillas, Tostadas, Sopes, Gorditas, Flautas, Tlayuda, etc.)
  - Main Dishes: 16 (Mole Poblano, Cochinita Pibil, Pozole, Tamales, Chile en Nogada, etc.)
  - Sides & Salsas: 12 (Guacamole, Salsas, Frijoles, Elote, Esquites, Nachos)
- [x] ~60 new ingredients added (chiles, Mexican cheeses, herbs, proteins)
- [x] 455 product_ingredients links created
- [x] Schema v1.0 with TEXT+CHECK (no ENUM)
- [x] **Lessons learned**:
  - File naming: Use numeric prefixes (01-, 02-, 03-) to indicate execution order
  - JSONB format: ingredients table uses JSONB for allergens/intolerances/dietary, not TEXT[]
  - Always verify existing schema with `SELECT * FROM table LIMIT 1` before generating INSERTs
- [x] Total products: 1258 → **1324** (+66)
- [x] Total ingredient links: ~4,982 → **~5,437** (+455)
- [x] Total databases: 18 → **19**

### 2025-12-18 - Product Taxonomy System + Sushi Rename
- [x] **Product Taxonomy: NEW** - Sistema di classificazione unificato per tutti i 18 database
  - Hierarchical structure: service_type → menu_type → category → subcategory
  - Distingue food vs beverage
  - Distingue traditional_course vs standalone vs bar_menu vs cafe_menu
  - Course ordering: appetizer(1) → first(2) → second(3) → dessert(4)
  - Multilingual display names (en, it, vi, ko, ja)
- [x] Created `shared/database/taxonomy/` directory structure
- [x] Schema: `taxonomy/schema/create-product-taxonomy-table.sql`
- [x] Import: `taxonomy/scripts/taxonomy-complete-import.sql`
- [x] Types: `taxonomy/types.ts` with full TypeScript support
- [x] Documentation: `taxonomy/README.md`
- [x] **Renamed: japanese → sushi** - Per coerenza naming (dish type, not cuisine origin)
  - Tabella rinominata in Supabase
  - product_ingredients aggiornato
  - product_taxonomy aggiornato
  - Cartella locale: `japanese/` → `sushi/`
  - Migration script: `sushi/scripts/migrate-japanese-to-sushi.sql`

### 2025-12-18 - Seafood Database
- [x] **Seafood: 63 NEW** - Second database conforme a v1.1 (TEXT+CHECK)
  - Fish: 19 (Salmon, Sea Bass, Branzino, Halibut, Swordfish, Cod, Trout, etc.)
  - Shellfish: 13 (Mussels, Clams, Oysters, Scallops, etc.)
  - Crustaceans: 15 (Lobster, Shrimp, Crab, Crawfish, etc.)
  - Sushi/Sashimi: 8 (Chirashi, Poke Bowl, Ceviche, Tartare, etc.)
  - Mixed Seafood: 8 (Paella, Cioppino, Bouillabaisse, Cataplana, etc.)
- [x] ~80 new ingredients added (fish species, shellfish, crustaceans, sauces)
- [x] ~380 product_ingredients links created
- [x] Schema v1.0 with TEXT+CHECK (no ENUM)
- [x] Lessons learned documented in PROCEDURE-NEW-DATABASE.md:
  - Valid ingredient categories (no 'stocks', 'alcohol')
  - Correct column names: product_type, sort_order, is_signature
- [x] Total records: 1176 → **1239** (+63)
- [x] Total ingredient links: 4,602 → **~4,982** (+~380)

### 2025-12-17 (Session 4) - DATABASE-STANDARDS v1.0
- [x] **DATABASE-STANDARDS.md v1.0 DEFINITIVO** - Linee guida complete per tutti i database
  - 12 sezioni: Naming, Schema, Data Format, Ingredients, Sistema 5 Dimensioni, Language, SQL, File Structure, Checklists, Errori, Versioning, Edge Cases
  - Review collaborativa con Claude Opus Browser
  - Decisioni architetturali confermate: TEXT per name/description, PREFIX_NAME per ID, popularity 0-100, TIMESTAMPTZ
- [x] **Steaks & Grills: 55 NEW** - Primo database conforme a v1.0
  - Beef Steaks: 10 (American classics, French bistro)
  - Italian Grills: 5 (Fiorentina, Tagliata, Ossobuco)
  - South American: 4 (Asado, Picanha, Churrasco)
  - Asian: 3 (Wagyu A5, Korean BBQ)
  - Lamb & Game: 4 (Rack, Chops, Shank)
  - Ribs & BBQ: 4 (Texas style, Kansas City)
  - Middle Eastern: 5 (Kebabs, Shawarma)
  - European: 5 (Schnitzel, Wellington)
  - Poultry: 5 (Tandoori, Jerk, Piri Piri)
- [x] Schema v2.0 allineato a standards: RLS, GIN indexes, search_path, TIMESTAMPTZ
- [x] DATABASE-CREATION-GUIDE.md creato come quick reference
- [ ] **Security fixes pendenti**: 9 tabelle senza RLS, 21 funzioni senza search_path
- [x] Total records: 1121 → **1176** (+55)

### 2025-12-16 (Session 3)
- [x] **Wines EXPANDED: 69 → 122** (+53 wines, +77%)
  - NEW: Emerging Europe (21): Georgia, Croatia, Slovenia, Romania, Bulgaria, Greece, Hungary, Moldova, Serbia, Armenia
  - NEW: Extended World (32): UK, Lebanon, Israel, Turkey, China, Japan, India, Uruguay, Brazil, South Africa, Morocco, Switzerland, Mexico, Canada, Austria
  - **Total Countries**: 35 wine-producing nations covered
- [x] Created `emerging-europe-wines.ts` with indigenous varieties (Saperavi, Rkatsiteli, Plavac Mali, Xinomavro, etc.)
- [x] Created `extended-world-wines.ts` with global wines (English Sparkling, Tannat, Koshu, Pinotage, etc.)
- [x] Total records: 839 → **892** (+53)

### 2025-12-16 (Session 2)
- [x] **Wines: 69 NEW** - Initial comprehensive wine database
  - Red: 19 (Italian DOCG, French, Spanish, New World)
  - White: 22 (French, German, Italian, Spanish, New World)
  - Sparkling: 12 (Champagne, Prosecco, Cava, Crémant)
  - Rosé: 4 (Provence, Tavel, Spanish, Italian)
  - Dessert: 5 (Sauternes, TBA, Tokaji, Vin Santo, Icewine)
  - Fortified: 7 (Port, Sherry, Madeira, Marsala)
- [x] Created comprehensive types.ts with wine-specific enums
- [x] Created SQL schema with Sistema 5 Dimensioni integration
- [x] Total records: 770 → **839** (+69)

### 2025-12-16 (Session 1)
- [x] **Appetizers: 51 NEW** (Italian, Spanish Tapas, International)
  - Italian: 19 (Bruschette, Fritti, Carpacci, Affettati, Mare)
  - Spanish: 15 (Tapas classics)
  - International: 17 (Greek, Middle Eastern, Asian, French)
- [x] **Desserts: 35 NEW** (Italian, French, International)
  - Italian: 14 (Tiramisu, Panna Cotta, Gelato, Cannoli, etc.)
  - French: 10 (Creme Brulee, Macarons, Tarte Tatin, etc.)
  - International: 11 (American, Asian, Middle Eastern)
- [x] Created seeding script: `scripts/seed-appetizers-desserts.ts`
- [x] Total records: 684 → **770** (+86)
- [x] Master Ingredients Migration: 842 ingredient references migrated to ING_* IDs

### 2025-12-15
- [x] Pasta: 87 recipes seeded to Supabase
- [x] Risotti: 27 recipes seeded to Supabase
- [x] Dumplings: 20 recipes seeded to Supabase
- [x] Soups: 39 recipes seeded to Supabase (including 17 Vietnamese Pho)
- [x] Fixed pasta table: UUID → TEXT id
- [x] Added 'active' to pasta_status enum
- [x] Fixed generatePastaInsert for nested fields mapping
- [x] **Sandwiches: 30 → 50** (added 20 Piadine Romagnole)
- [x] **Burgers: 45 NEW** (Classic, Gourmet, Alternative)
- [x] Fixed burger_status enum ('gourmet' → 'signature')
- [x] Total records: 559 → **684** (+125)

### 2025-12-14
- [x] Pizzas: 65 recipes created and seeded
- [x] Salads: 55 recipes created and seeded
- [x] Beers: Database completed
- [x] Cocktails: IBA collection completed

---

## Notes for Future Sessions

1. **Before adding new food database:**
   - Check this inventory first
   - Verify if batches already exist in `*/scripts/batches/`
   - Check both `migrations/food-batches/` AND `{database}/scripts/batches/`

2. **Batch locations vary:**
   - Pizzas, Salads, Beers, Cocktails: `{database}/scripts/batches/`
   - Pasta, Risotti, Dumplings, Soups: `migrations/food-batches/{database}/`

3. **Generator scripts:**
   - Unified: `scripts/generate-all-food-batches.ts` (pasta, risotti, dumplings, soups)
   - Individual: `{database}/scripts/generate-*.ts`

---

**Last Updated:** 2025-12-19 (Greek, Lebanese, Georgian, Turkish, Brazilian databases added - 32 databases total, 2559 products)
