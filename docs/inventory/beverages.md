# Beverages Database Inventory

> Tutti i database bevande del progetto GUDBRO

**Last Updated**: 2025-12-20

---

## Quick Stats

| Database | Records | Schema | Status | Path |
|----------|---------|--------|--------|------|
| Cocktails | 227 | ✅ | LIVE | `cocktails/` |
| Spirits | 197 | v1.1 | LIVE | `spirits/` |
| Wines | 143 | ✅ | LIVE | `wines/` |
| Coffee | 76 | ✅ | LIVE | `coffee/` |
| Waters | 64 | v1.3 | LIVE | `waters/` |
| Tea | 62 | ✅ | LIVE | `tea/` |
| Beers | 45 | ✅ | LIVE | `beers/` |
| Soft Drinks | 35 | v1.3 | LIVE | `softdrinks/` |
| **TOTAL** | **849** | | | |

---

## Cocktails (227)

- **Path**: `shared/database/cocktails/`
- **Source**: IBA Official Cocktails
- **Categories**: Unforgettables, Contemporary Classics, New Era Drinks
- **Prefix**: `CTL_`
- **Schema**: `cocktails/schema/`
- **Product_Ingredients**: 898 links (~4 per drink)

---

## Spirits (197)

- **Path**: `shared/database/spirits/`
- **Status**: v1.1 compliant (TEXT+CHECK)
- **Categories**: whisky(34), gin(18), rum(25), amari_liqueurs(43), vodka(15), tequila_mezcal(20), brandy_cognac(25), rare_premium(17)
- **Prefix**: `SPR_`
- **Special**: Grappe italiane (13), Baijiu cinesi (5), Ultra-Premium (17)
- **Product_Ingredients**: N/A (spirits sono ingredienti base)

---

## Wines (143)

- **Path**: `shared/database/wines/`
- **Categories**: Red, White, Rosé, Sparkling, Dessert
- **Prefix**: `WIN_`
- **Product_Ingredients**: 212 links (~1.5 per wine)

---

## Coffee (76)

- **Path**: `shared/database/coffee/`
- **Categories**: Espresso-based, Filter, Cold, Specialty
- **Prefix**: `COF_`
- **Batches**: 4 batch files
- **Product_Ingredients**: 225 links (~3 per drink)

---

## Waters (64) - NEW 2025-12-20

- **Path**: `shared/database/waters/`
- **Status**: v1.3 compliant (TEXT+CHECK)
- **Categories**:
  - still_natural (12)
  - sparkling_natural (8)
  - sparkling_added (9)
  - mineral_rich (7)
  - low_mineral (7)
  - alkaline (6)
  - flavored (15)
- **Prefix**: `WTR_`
- **Special Fields**: TDS, pH, minerals (Ca, Mg, Na, K, HCO₃, SiO₂)
- **Product_Ingredients**: N/A (acque sono prodotti semplici)
- **Brands**: Evian, Fiji, Voss, San Pellegrino, Perrier, Gerolsteiner, LaCroix

---

## Tea & Infusions (62)

- **Path**: `shared/database/tea/`
- **Categories**: Black, Green, White, Oolong, Herbal, Specialty
- **Prefix**: `TEA_`
- **Batches**: 5 batch files
- **Product_Ingredients**: 173 links (~3 per tea)

---

## Beers (45)

- **Path**: `shared/database/beers/`
- **Styles**: Lagers, Ales, IPAs, Stouts, Belgian, German
- **Prefix**: `BER_`
- **Product_Ingredients**: 172 links (~3.8 per beer)

---

## Soft Drinks (35) - NEW 2025-12-20

- **Path**: `shared/database/softdrinks/`
- **Status**: v1.3 compliant (TEXT+CHECK)
- **Categories**: cola, lemon_lime, orange, ginger, energy, tonic, root_beer, cream_soda
- **Prefix**: `SDR_`
- **Product_Ingredients**: 202 links (~5.8 per drink)
- **New Ingredients**: 19 (guarana, taurine, quinine, etc.)
- **Note**: 3 acque migrate in Waters database

