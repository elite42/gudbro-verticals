# Naming Conventions

> Standard di naming per ID, slug e nomi in GUDBRO

---

## ID Format

| Tipo | Formato | Esempio |
|------|---------|---------|
| Products | `{PREFIX}_{NAME}` | `STK_RIBEYE`, `GER_SCHNITZEL` |
| Ingredients | `ING_{NAME}` | `ING_BEEF_RIBEYE`, `ING_MILK_OAT` |

**Regole:**
- UPPERCASE sempre
- Underscore `_` come separatore (MAI hyphen `-`)
- Max 50 caratteri
- Solo lettere ASCII, numeri, underscore

---

## Prefissi Database

| Database | Prefix | Database | Prefix |
|----------|--------|----------|--------|
| Steaks | STK | Japanese | JPN |
| Seafood | SEA | Korean | KOR |
| Coffee | COF | Vietnamese | VIE |
| Tea | TEA | Thai | THA |
| Cocktails | CTL | Chinese | CHN |
| Pasta | PST | Turkish | TRK |
| Pizza | PIZ | Lebanese | LEB |
| Burger | BRG | Greek | GRK |
| Salad | SLD | Georgian | GEO |
| Appetizer | APT | Brazilian | BRA |
| Dessert | DST | Caribbean | CAR |
| Soup | SOP | Moroccan | MOR |
| Sandwich | SND | Ethiopian | ETH |
| Risotto | RST | Spanish | SPA |
| Dumpling | DMP | French | FRE |
| Mexican | MEX | Italian | ITA |
| Indian | IND | British | BRI |
| Breakfast | BRK | German | GER |
| Fried | FRD | Waters | WTR |
| Vegetarian | VEG | Soft Drinks | SDR |
| Wine | WIN | Smoothies | SMO |
| Beer | BER | Milkshakes | MKS |
| Spirits | SPR | Hot Beverages | HBV |
| Ingredients | ING | | |

---

## Convenzioni Ingredienti

> Stabilito durante Cleanup 2025-12-20 (63 duplicati consolidati)

| Regola | Corretto | Sbagliato |
|--------|----------|-----------|
| US English | `ING_SCALLION` | ~~ING_SPRING_ONION~~ |
| Singolare | `ING_EGG` | ~~ING_EGGS~~ |
| Descrittivo prima | `ING_GROUND_BEEF` | ~~ING_BEEF_GROUND~~ |
| Nome completo | `ING_SHIITAKE_MUSHROOMS` | ~~ING_SHIITAKE~~ |

**US English:**
- `ING_SCALLION` (non spring_onion)
- `ING_SHRIMP` (non prawns)
- `ING_CILANTRO` per foglie (coriander = semi)

---

## Slug Format

```
lowercase-with-hyphens
```

| Regola | Corretto | Sbagliato |
|--------|----------|-----------|
| Lowercase | `classic-ribeye` | `Classic-Ribeye` |
| Hyphens | `beef-steak` | `beef_steak` |
| URL-safe | `pho-bo` | `phở-bò` |

---

## Name Format

```
Title Case in English
```

**Nomi propri:** Mantieni lingua originale se iconici:
- `Pad Thai` (non "Thai Stir-Fried Noodles")
- `Spaghetti alla Carbonara` (non "Carbonara Spaghetti")

---

**File:** `docs/STANDARDS/01-naming-conventions.md`
