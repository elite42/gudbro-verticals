# GUDBRO Database Inventory

> **SOURCE OF TRUTH** per tutti i database food del progetto GUDBRO.

**Last Updated**: 2026-01-02

---

## Quick Reference

Prima di creare o modificare QUALSIASI database:

1. **LEGGI** `shared/database/DATABASE-STANDARDS.md`
2. **LEGGI** `shared/database/PROCEDURE-NEW-DATABASE.md`
3. **AGGIORNA** questo inventory dopo ogni modifica

---

## Summary (2026-01-05)

| Metric                         | Count       |
| ------------------------------ | ----------- |
| **Total Databases**            | 75          |
| **Total Products**             | 4653        |
| **Total Ingredients**          | 2551        |
| **Ingredients with Nutrition** | 2551 (100%) |
| **Total Links**                | ~25169      |
| **Cheeses**                    | 226         |

### Recent Updates

| Date       | Change         | Notes                                                                                                              |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------ |
| 2026-01-06 | Translations   | 1684 ingredient translations (137 core ingredients × 13 languages: it, vi, ko, ja, ru, zh, th, fr, es, pt, de, tr) |
| 2026-01-05 | Seed Data      | Test data for AI Co-Manager (organizations, brands, locations, accounts, merchants, AI tables P8-P12)              |
| 2026-01-05 | AI Migrations  | 10 migrations (027-036) for AI Co-Manager features                                                                 |
| 2026-01-02 | +3 ingredients | Dalky Kafe support (Peach Tea, Lychee Tea, Nem Nướng)                                                              |
| 2026-01-02 | Cleanup        | Rimossi file storici obsoleti (master/, extraction/, nutrition-batches/, nutrition-results/)                       |

---

## Databases by Category

### [Beverages](inventory/beverages.md) (1015 products)

| Database      | Records | Status              |
| ------------- | ------- | ------------------- |
| Cocktails     | 227     | ✅                  |
| Spirits       | 230     | ✅ v1.2 (+33 Asian) |
| Wines         | 143     | ✅                  |
| Coffee        | 76      | ✅                  |
| Waters        | 64      | ✅ v1.3             |
| Tea           | 62      | ✅                  |
| Smoothies     | 45      | ✅ v1.3 NEW         |
| Beers         | 45      | ✅                  |
| Mocktails     | 38      | ✅ v1.3             |
| Soft Drinks   | 35      | ✅ v1.3             |
| Milkshakes    | 25      | ✅ v1.3 NEW         |
| Hot Beverages | 25      | ✅ v1.3 NEW         |

→ [Full details](inventory/beverages.md)

---

### [Asian Cuisines](inventory/cuisines-asian.md) (700 products)

| Database   | Records | Status      |
| ---------- | ------- | ----------- |
| Japanese   | 173     | ✅ v1.1     |
| Korean     | 77      | ✅ v1.1     |
| Chinese    | 73      | ✅ v1.1     |
| Vietnamese | 72      | ✅ v1.1     |
| Thai       | 69      | ✅ v1.1     |
| Indian     | 65      | ✅ v1.1     |
| Filipino   | 59      | ✅ v1.7 NEW |
| Malaysian  | 57      | ✅ v1.7     |
| Indonesian | 55      | ✅ v1.7     |

→ [Full details](inventory/cuisines-asian.md)

---

### [European Cuisines](inventory/cuisines-european.md) (971 products)

| Database     | Records | Status      |
| ------------ | ------- | ----------- |
| Italian      | 102     | ✅ v1.7     |
| Turkish      | 98      | ✅ v1.2     |
| Lebanese     | 94      | ✅ v1.2     |
| Scandinavian | 78      | ✅ v1.7     |
| Greek        | 74      | ✅ v1.2     |
| Georgian     | 74      | ✅ v1.2     |
| French       | 58      | ✅ v1.3     |
| Russian      | 55      | ✅ v1.7     |
| Spanish      | 55      | ✅ v1.3     |
| German       | 50      | ✅ v1.7     |
| British      | 44      | ✅ v1.7     |
| Polish       | 42      | ✅ v1.7     |
| Portuguese   | 39      | ✅ v1.7     |
| Dutch        | 38      | ✅ v1.7 NEW |
| Swiss        | 38      | ✅ v1.7     |
| Belgian      | 32      | ✅ v1.7     |

→ [Full details](inventory/cuisines-european.md)

---

### [American Cuisines](inventory/cuisines-americas.md) (602 products)

| Database         | Records | Status      |
| ---------------- | ------- | ----------- |
| Caribbean        | 139     | ✅ v1.3     |
| Brazilian        | 91      | ✅ v1.2     |
| Mexican          | 66      | ✅ v1.1     |
| Argentinian      | 47      | ✅ v1.7     |
| Tex-Mex          | 46      | ✅ v1.7     |
| Colombian        | 45      | ✅ v1.7     |
| Cuban            | 44      | ✅ v1.7     |
| Chilean          | 43      | ✅ v1.7     |
| **Cajun/Creole** | **42**  | ✅ v1.7 NEW |
| Venezuelan       | 39      | ✅ v1.7     |

---

### Fusion Cuisines (86 products)

| Database       | Records | Status      |
| -------------- | ------- | ----------- |
| Korean-Mexican | 21      | ✅ v1.7 NEW |
| Indo-Chinese   | 35      | ✅ v1.7     |
| Nikkei         | 30      | ✅ v1.7     |

---

### Oceania Cuisines (58 products)

| Database   | Records | Status      |
| ---------- | ------- | ----------- |
| Australian | 29      | ✅ v1.7 NEW |
| Hawaiian   | 29      | ✅ v1.7 NEW |

---

### [African Cuisines](inventory/cuisines-african.md) (217 products)

| Database      | Records | Status  |
| ------------- | ------- | ------- |
| Moroccan      | 55      | ✅ v1.3 |
| Nigerian      | 49      | ✅ v1.7 |
| Ethiopian     | 45      | ✅ v1.3 |
| South African | 40      | ✅ v1.7 |
| Senegalese    | 28      | ✅ v1.7 |

→ [Full details](inventory/cuisines-african.md)

---

### [Main Dishes](inventory/main-dishes.md) (556 products)

| Database    | Records | Status                              |
| ----------- | ------- | ----------------------------------- |
| Pasta       | 87      | ✅                                  |
| Steaks      | 100     | ✅ v1.1 (+26 premium cuts, achuras) |
| Vegetarian  | 65      | ✅ v1.1                             |
| Breakfast   | 65      | ✅ v1.1                             |
| Seafood     | 63      | ✅ v1.1                             |
| Pizzas      | 62      | ✅                                  |
| Fried Foods | 48      | ✅ v1.1                             |
| Burgers     | 45      | ✅                                  |
| Risotti     | 27      | ✅                                  |
| Dumplings   | 20      | ✅                                  |

→ [Full details](inventory/main-dishes.md)

---

### [Sides, Starters & Desserts](inventory/sides-starters.md) (383 products)

| Database   | Records | Status                  |
| ---------- | ------- | ----------------------- |
| Salads     | 52      | ✅                      |
| Appetizers | 54      | ✅ v1.1 (+3 steakhouse) |
| Sandwiches | 50      | ✅                      |
| Bakery     | 45      | ✅ v1.3 NEW             |
| Sauces     | 42      | ✅ v1.3 NEW             |
| Soups      | 39      | ✅                      |
| Sides      | 36      | ✅ v1.3                 |
| Desserts   | 35      | ✅                      |
| Ice Cream  | 34      | ✅ v1.3 NEW             |

→ [Full details](inventory/sides-starters.md)

---

### [System Tables](inventory/system-tables.md)

| Table               | Records | Purpose                                      |
| ------------------- | ------- | -------------------------------------------- |
| ingredients         | ~2471   | Master ingredients (27 categories)           |
| product_ingredients | ~25169  | Junction table                               |
| product_taxonomy    | 75      | Classification                               |
| translations        | 548     | Multilingual (137 ingredients × 4 languages) |

#### Ingredient Categories (v2.1)

| Category        | Count  | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| vegetables      | 235    | Fresh vegetables                                 |
| fruits          | 264    | Fresh, dried & tropical fruits                   |
| cheese          | 226    | All cheeses                                      |
| spices          | 154    | Spices & seasonings                              |
| grains          | 144    | Grains & flours                                  |
| other           | 142    | Miscellaneous                                    |
| sauces          | 108    | Prepared sauces                                  |
| proteins        | 108    | Prepared: tofu, broths + edible insects          |
| **red_meat**    | **92** | **Beef, pork, lamb, veal, goat**                 |
| **cured_meats** | **89** | **Prosciutto, bresaola, bacon, salami**          |
| herbs           | 87     | Fresh & dried herbs                              |
| **sausages**    | **86** | **Bratwurst, kielbasa, chorizo**                 |
| seafood         | 69     | Fish & shellfish                                 |
| condiments      | 68     | Condiments                                       |
| spirits         | 55     | Distilled spirits                                |
| dairy           | 54     | Dairy products                                   |
| sweeteners      | 48     | Sugars & syrups                                  |
| legumes         | 43     | Beans & lentils                                  |
| liqueurs        | 42     | Liqueurs                                         |
| pasta           | 38     | Dried pasta                                      |
| **offal**       | **35** | **Liver, kidney, heart, tripe**                  |
| bread           | 29     | Bread products                                   |
| juices          | 28     | Fruit juices                                     |
| **poultry**     | **27** | **Chicken, duck, turkey, goose**                 |
| nuts            | 36     | Tree nuts (almonds, walnuts, etc.)               |
| tea             | 20     | Tea varieties                                    |
| **game**        | **33** | **Venison, bison, ostrich, pheasant, frog legs** |

> **Note (2025-12-27):** `proteins` category restructured into 6 specific meat categories. See migration `2025-12-27-charcuterie-category/`.

→ [Full details](inventory/system-tables.md)

---

## File Structure

### Database (shared/database/)

```
shared/database/
├── cuisines/              # Cucine nazionali/regionali
│   ├── asian/             # japanese, korean, chinese, thai, vietnamese, etc.
│   ├── european/          # italian, french, spanish, german, british, etc.
│   ├── americas/          # mexican, brazilian, caribbean, cajun, etc.
│   ├── african/           # moroccan, ethiopian, nigerian, etc.
│   ├── oceania/           # australian, hawaiian
│   └── fusion/            # nikkei, indochinese, koreanmex, texmex
├── beverages/             # cocktails, wines, spirits, coffee, tea, etc.
├── dishes/                # pasta, pizzas, steaks, burgers, seafood, etc.
├── sides/                 # salads, soups, desserts, appetizers, etc.
├── ingredients/           # Master ingredients (2548)
├── migrations/            # schema/, ingredients/, nutrition/
└── _system/               # types, scripts, docs, schema, utils
```

### Documentation (docs/)

```
docs/
├── DATABASE-INVENTORY.md  ← You are here (index)
└── inventory/
    ├── beverages.md       # Cocktails, Wines, Coffee, etc.
    ├── cuisines-asian.md  # Japanese, Korean, Chinese, etc.
    ├── cuisines-european.md # Italian, French, Spanish, etc.
    ├── cuisines-americas.md # Mexican, Brazilian, etc.
    ├── main-dishes.md     # Pasta, Steaks, Pizzas, etc.
    ├── sides-starters.md  # Salads, Soups, Desserts, etc.
    └── system-tables.md   # Ingredients, Taxonomy, etc.
```

---

## Changelog

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-01-05 | **AI Co-Manager Seed Data**: Created test data scripts (`000-prepare-seed.sql`, `001-test-data.sql`) with 3 organizations, 4 brands, 4 locations, 4 accounts, 3 merchants, AI preferences, events, feedback, briefings, financial summaries, suppliers, inventory items, workflow definitions, delegated tasks, social posts. Located in `migrations/seeds/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-01-05 | **AI Co-Manager Complete (P1-P13)**: 10 migrations (027-036), 13 services in `/lib/ai/`, 13 API routes in `/api/ai/`. Features: Chat, Knowledge Base, Actions, Proactivity, Feedback Loop, Bootstrap, Market Intelligence, Social Media, Financial Management, Task Delegation, Agentic Workflows, Inventory & Negotiation, Onboarding.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2025-12-28 | **Folder Restructuring (v6.0)**: Riorganizzata struttura cartelle database. Cucine in `cuisines/` (asian, european, americas, african, oceania, fusion). Bevande in `beverages/`. Piatti in `dishes/`. Contorni in `sides/`. Sistema in `_system/`. Migrations in `migrations/` (schema, ingredients, nutrition).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2025-12-28 | **Nutrition 100% Complete**: Final batch of 58 ingredients (beef steaks, lamb cuts, British foods, misc). Fixed corrupted ING_PASSO record (deleted). Coverage: 98%→100% (2548/2548 ingredients with nutrition). Migration: `migrations/nutrition/2025-12-28-nutrition-final-100/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2025-12-28 | **Nutrition Backfill Round 2**: Added nutrition data for 210 ingredients via AI-assisted workflow (Gemini/ChatGPT). Batches 1-6: 154 ingredients. Batches 7-9: 56 ingredients with empty `{}`. Coverage: 92%→98%.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2025-12-27 | **Fruits & Nuts Expansion**: Added 47 ingredients. Melons (5): cantaloupe, honeydew, galia. Citrus (8): nectarine, clementine, tangerine, pomelo, blood orange. Tropical (13): durian, rambutan, longan, mangosteen, starfruit. Berries (9): mulberry, gooseberry, boysenberry, elderberry. Nuts (9): brazil nut, coconut meat, roasted varieties. Seeds (10): poppy, caraway, lotus, quinoa, sacha inchi. Fixed ING_CASHEW (other→nuts), ING_CHESTNUT (spices→nuts). `fruits`: 232→264, `nuts`: 25→36.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2025-12-27 | **Exotic Proteins Expansion**: Added 33 exotic ingredients. Mammals (11): bison, buffalo, yak, venison, moose, elk, antelope, hare, wild boar, camel, horse. Birds (7): ostrich, quail, guinea fowl, pheasant, partridge, pigeon, grouse. Reptiles/Amphibians (5): crocodile, frog legs, turtle, snake, iguana. Edible Insects (10): crickets, cricket flour, grasshoppers, mealworms, silkworms, ants, locusts, scorpions, bamboo worms, water bugs. All with nutrition data. `game`: 12→33, `proteins`: 98→108.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2025-12-27 | **Protein Category Restructuring**: Split generic `proteins` (439 items) into 6 specific meat categories: `red_meat` (92), `cured_meats` (89), `sausages` (86), `offal` (35), `poultry` (27), `game` (12). Database Standards updated to v2.1. Migration scripts in `migrations/2025-12-27-charcuterie-category/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2025-12-27 | **Hawaiian** (29 dishes: poke 4, plate_lunch 5, pupu 5, loco_moco 3, dessert 5, beverage 4, luau 3). Regions: Oahu, Maui, Big Island. Added 8 Hawaiian ingredients (poi, kalua pork, lomi salmon, haupia, macadamia, lilikoi, li hing mui, spam). ~210 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2025-12-27 | **Cajun/Creole** (42 dishes: gumbo 3, rice 4, seafood 8, fried 7, meat 6, dessert 6, beverage 5, sides 3). Origin: cajun 16, creole 21, both 5. Added 11 Louisiana ingredients (tasso, alligator, filé powder, creole mustard, cajun seasoning, blue crab, praline, louisiana hot sauce, grits, corn syrup, mustard greens). 384 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2025-12-27 | **Australian** (29 dishes: pie 3, bbq 4, seafood 4, pub 3, bush_tucker 3, snack 3, dessert 4, bread 2, beverage 3). Regions: National, SA, NSW, NT, Outback, QLD. Added 9 native Australian ingredients (kangaroo, emu, barramundi, vegemite, tim tam, lemon myrtle, bush tomato, beef sausage, lamb chop). ~200 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2025-12-26 | **Global Cheese Expansion** (~140 new cheeses): Italy 13 (Grana Padano, Asiago, Caciocavallo, Montasio, etc.), France 15 (Beaufort, Reblochon, Morbier, Munster, Époisses, etc.), Spain 14 (Cabrales, Mahón, Torta del Casar, etc.), Germany 8 (Allgäuer Bergkäse, Limburger, Tilsiter, etc.), Switzerland 7 (Appenzeller, Sbrinz, Tête de Moine, etc.), Netherlands 6 (Leyden, Maasdam, Boerenkaas, etc.), Belgium 4, Austria 6, UK 8 (Stilton, Wensleydale, etc.), Ireland 5 (Cashel Blue, Dubliner, etc.), Greece 6 (Graviera, Manouri, etc.), Turkey 5, Portugal 8 (Serra da Estrela, Azeitão, etc.), Scandinavia 10 (Jarlsberg, Gjetost, Havarti, etc.), Americas 12 (Queso Panela, Reggianito, Provoleta, etc.), Middle East/Africa 8, Asia 8 (Rushan, Sakura, Chhurpi, etc.). Total cheeses: 86→226. Category cleanup: fixed 36 cheeses from dairy→cheese, fixed ING_BUTTER_LETTUCE→vegetables, merged ING_FETA_CHEESE duplicate. |
| 2025-12-26 | **Global Salumi Expansion** (~90 new ingredients): Italian 12 (coppa, culatello, soppressata, etc.), French 12 (saucisson, jambon bayonne, andouille, etc.), Spanish 6 (jamón ibérico, fuet, salchichón, etc.), German 10 (bratwurst, leberwurst, weisswurst, etc.), Central Europe 12 (käsekrainer, cervelat, landjäger, etc.), Poland/Russia/Scandinavia 15, Balkans 6, Portugal/Turkey/Caucasus 13, Latin America 19, Asia/Africa 14. All with nutrition data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2025-12-26 | **Venezuelan** (39 dishes: arepa 7, main 6, soup 4, street_food 7, seafood 4, dessert 6, beverage 5). Regions: Caracas, Zulia, Llanos, Costa, Oriente. No new ingredients. ~240 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2025-12-26 | **Colombian** (45 dishes: soup 6, main 8, breakfast 5, street_food 8, seafood 5, dessert 7, beverage 6). Regions: Bogotá, Antioquia, Valle del Cauca, Costa Caribe, Santander, Tolima, Boyacá. Added 5 ingredients (AREPA, PANELA, LULO, SOURSOP, TILAPIA). ~290 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2025-12-26 | **Argentinian** (47 dishes: asado 8, empanada 7, main 7, pasta 6, soup 5, appetizer 5, dessert 9, beverage 5). Regions: Buenos Aires, Salta, Tucumán, Córdoba, Mendoza. No new ingredients. ~280 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2025-12-26 | **Korean-Mexican** (21 dishes: taco 5, burrito 3, bowl 4, quesadilla 3, appetizer 3, side 3). Kogi-style fusion. No new ingredients. 185 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2025-12-25 | **Indo-Chinese** (35 dishes: manchurian 6, chilli 6, noodles 6, rice 5, soup 5, starter 7). Hakka-Indian fusion. Added 1 ingredient (ING_SCHEZWAN_SAUCE). 352 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2025-12-25 | **Nikkei** (30 dishes: tiradito 5, ceviche 5, maki 5, mains 6, anticuchos 4, sides 5). Japanese-Peruvian fusion. No new ingredients. 228 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2025-12-25 | **Tex-Mex** (46 dishes: tacos 5, burritos 5, enchiladas 5, nachos 4, fajitas 5, quesadillas 5, sides 5, dips 6, mains 6). Fusion American-Mexican. No new ingredients. 323 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2025-12-25 | Added Dutch (38 dishes: stamppot 5, snacks 8, mains 5, soups 3, seafood 5, pancakes 4, desserts 8). Regions: Holland, Friesland, Limburg, Zeeland, Amsterdam. Added 7 Dutch ingredients. 292 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2025-12-25 | Added Belgian (32 dishes: mains 8, seafood 5, frites 4, waffles 4, desserts 6, appetizers 5). Regions: Flanders, Wallonia, Brussels, Liège, Coast. Added 7 Belgian ingredients. 226 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2025-12-25 | Added Swiss (38 dishes: cheese 5, mains 6, sides 4, sausages 5, soups 3, desserts 6, pastries 6, breakfast 3). Regions: Zurich, Bern, Valais, Graubünden, Vaud, Ticino. Added 12 Swiss ingredients. ~280 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2025-12-24 | Added Scandinavian (78 dishes: mains 21, fish 10, open_sandwich 8, soups 10, sides 5, pastries 10, desserts 14). Countries: Sweden, Norway, Denmark, Finland. Added 12 new ingredients. 496 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2025-12-24 | Added Polish (42 dishes: dumplings 8, soups 8, mains 10, sides 5, street_food 3, desserts 8). Added 12 Polish ingredients. 299 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2025-12-24 | Added Portuguese (39 dishes: bacalhau 8, seafood 7, meat 8, soup 4, sandwich 4, dessert 8). Added 15 Portuguese-specific ingredients. 277 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2025-12-24 | Added German (50 dishes: sausages, mains, sides, soups, baked, desserts). Product_ingredients links populated.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2025-12-24 | **NUTRITION-BACKFILL completato.** 2026/2053 ingredienti (98.7%) hanno dati nutrizionali. Workflow AI-assisted: 78 batch → Gemini/ChatGPT → JSON → 4 script SQL.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2025-12-23 | Added British (44 dishes: breakfast, mains, pub, seafood, regional, desserts). Added 25 British-specific ingredients. 323 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2025-12-23 | Added Italian (102 dishes: antipasti, secondi carne/pesce, zuppe, contorni, dolci). Added 29 new Italian-specific ingredients. 562 product_ingredients links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2025-12-21 | Steakhouse expansion: Steaks 74→100 (+26 premium cuts, achuras), Appetizers 51→54 (+3 meat-focused), Sides 0→36 (executed pending scripts).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2025-12-21 | Added Spanish (55), French (58). Added 'fats' category to ingredients ENUM. Migrated 8 ingredients from oils/proteins to fats.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2025-12-21 | Added Ethiopian (45), Moroccan (55), Sauces (42), Sides (35), Bakery (45), Ice Cream (34), Smoothies (45), Milkshakes (25), Hot Beverages (25).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2025-12-20 | Added Asian Spirits (+33: sake 10, soju 8, shochu 7, baijiu 3, umeshu 5). Mocktails (38), Caribbean (139), Waters (64), Soft Drinks (35).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2025-12-19 | Added Greek, Lebanese, Georgian, Turkish, Brazilian                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2025-12-18 | Added Spirits, Indian, Breakfast, Korean                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2025-12-17 | Added Seafood, Mexican, Vegetarian, Fried Foods                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
