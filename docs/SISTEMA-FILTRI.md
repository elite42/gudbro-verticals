# Sistema 5 Dimensioni GUDBRO

**Versione:** 3.0 (Dicembre 2025)
**Ultimo Aggiornamento:** 2025-12-13
**Autore:** Claude Code + Team GUDBRO

---

## REGOLA D'ORO

> **Ogni volta che si parla di filtri prodotto, sicurezza alimentare, o compatibilità dietetica, TUTTE le 5 dimensioni devono essere considerate.**

Quando riassumi, puoi usare **(5 dimensioni)** come shorthand.

---

## Overview

Il Sistema GUDBRO gestisce **5 dimensioni** di sicurezza alimentare:

| # | Dimensione | Elementi | Descrizione |
|---|------------|----------|-------------|
| 1 | **Allergeni** | 30 | Reazioni immuno-mediate (EU 14 + Korea 7 + Japan 7 + GUDBRO 2) |
| 2 | **Intolleranze** | 10 | Reazioni non immuno-mediate (digestive/metaboliche) |
| 3 | **Diete** | 11 | Scelte di stile di vita, religiose o salutistiche |
| 4 | **Fattori Nutrizionali** | 9 | Valori nutrizionali per porzione |
| 5 | **Piccantezza** | 6 livelli | Scala 0-5 con riferimento Scoville |

**Totale Parametri: 66**

---

## Posizioni del File

Il file `safety-filters.ts` e sincronizzato in 4 posizioni:

```
gudbro-verticals/
├── shared/database/safety-filters.ts          # SOURCE OF TRUTH
├── apps/coffeeshop/safety-filters.ts          # Copia per app
├── apps/coffeeshop/frontend/lib/safety/safety-filters.ts  # Copia frontend
└── apps/backoffice/lib/shared/safety-filters.ts  # Copia backoffice
```

**IMPORTANTE:** Modificare SEMPRE il file in `shared/database/` e poi sincronizzare.

---

## Struttura dei Filtri

### Tipo SafetyFilter

```typescript
export type FilterType = 'allergen' | 'intolerance' | 'diet';

export interface SafetyFilter {
    id: string;           // ID univoco (kebab-case)
    label: {
        en: string;       // Inglese
        it: string;       // Italiano
        vi: string;       // Vietnamita
    };
    type: FilterType;     // allergen | intolerance | diet
    icon?: string;        // Emoji
    description?: {       // Descrizione opzionale
        en: string;
        it: string;
        vi: string;
    };
}
```

---

## Categorie Dettagliate

### LIVELLO 1: ALLERGENI (26 totali)

Gli allergeni causano **reazioni immuno-mediate** (IgE) potenzialmente gravi.

#### EU 14 Allergeni Obbligatori (Regolamento 1169/2011)

| ID | EN | IT | Icon |
|---|---|---|---|
| gluten | Gluten | Glutine | 🌾 |
| crustaceans | Crustaceans | Crostacei | 🦐 |
| eggs | Eggs | Uova | 🥚 |
| fish | Fish | Pesce | 🐟 |
| peanuts | Peanuts | Arachidi | 🥜 |
| soy | Soy | Soia | 🫘 |
| milk | Milk | Latte | 🥛 |
| nuts | Tree Nuts | Frutta a guscio | 🌰 |
| celery | Celery | Sedano | 🥬 |
| mustard | Mustard | Senape | 🌭 |
| sesame | Sesame | Sesamo | 🥯 |
| sulphites | Sulphites | Solfiti | 🍷 |
| lupin | Lupin | Lupini | 🌸 |
| molluscs | Molluscs | Molluschi | 🐚 |

#### Allergeni Specifici Asia (5)

Importanti per cucina vietnamita/asiatica:

| ID | EN | IT | Icon |
|---|---|---|---|
| shellfish | Shellfish | Frutti di mare | 🦞 |
| squid | Squid | Calamari | 🦑 |
| shrimp | Shrimp | Gamberetti | 🍤 |
| shrimp-paste | Shrimp Paste | Pasta di Gamberetti | 🥣 |
| buckwheat | Buckwheat | Grano saraceno | 🌾 |

#### Altri Allergeni Riconosciuti (7)

Clinicamente significativi ma non EU14:

| ID | EN | IT | Icon |
|---|---|---|---|
| peach | Peach | Pesca | 🍑 |
| tomato | Tomato | Pomodoro | 🍅 |
| seeds | Seeds | Semi | 🌻 |
| coconut | Coconut | Cocco | 🥥 |
| corn | Corn | Mais | 🌽 |
| garlic | Garlic | Aglio | 🧄 |
| onion | Onion | Cipolla | 🧅 |

---

### LIVELLO 2: INTOLLERANZE (10 totali)

Le intolleranze causano **reazioni non immuno-mediate** (digestive, metaboliche).

| ID | EN | IT | Icon | Note |
|---|---|---|---|---|
| lactose | Lactose | Lattosio | 🥛 | Deficienza enzimatica |
| gluten-sensitivity | Gluten Sensitivity | Sensibilita al Glutine | 🍞 | NON celiachia |
| fodmap | FODMAP | FODMAP | 🍏 | Carboidrati fermentabili |
| histamine | Histamine | Istamina | 🧀 | Formaggi, vino, pesce |
| fructose | Fructose | Fruttosio | 🍇 | Malassorbimento |
| caffeine | Caffeine | Caffeina | ☕ | Sensibilita |
| alcohol | Alcohol | Alcool | 🍷 | Intolleranza metabolica |
| msg | MSG | Glutammato | 🧂 | Monosodio glutammato |
| sulphites-sensitivity | Sulphites Sensitivity | Sensibilita Solfiti | 🍾 | Diverso da allergia |
| spiciness | Spiciness | Piccantezza | 🌶️ | Sensibilita capsaicina |

---

### LIVELLO 3: DIETE (14 totali)

Scelte alimentari per lifestyle, religione o salute.

#### Diete Lifestyle (4)

| ID | EN | IT | Icon |
|---|---|---|---|
| vegan | Vegan | Vegano | 🌱 |
| vegetarian | Vegetarian | Vegetariano | 🥗 |
| pescatarian | Pescatarian | Pescetariano | 🐟 |
| raw | Raw | Crudista | 🥬 |

#### Diete Religiose (4)

| ID | EN | IT | Icon |
|---|---|---|---|
| halal | Halal | Halal | 🕌 |
| kosher | Kosher | Kosher | ✡️ |
| buddhist | Buddhist | Buddista | ☸️ |
| pork-free | Pork Free | Senza Maiale | 🐖 |

#### Diete Salutistiche (6)

| ID | EN | IT | Icon |
|---|---|---|---|
| gluten-free | Gluten Free | Senza Glutine | 🌾 |
| dairy-free | Dairy Free | Senza Latticini | 🥛 |
| nut-free | Nut Free | Senza Frutta a Guscio | 🌰 |
| low-carb | Low Carb | Low Carb | 🥑 |
| keto | Keto | Chetogenica | 🥓 |
| paleo | Paleo | Paleo | 🦴 |

---

## Regole per Aggiungere Nuovi Filtri

### DO (Cosa Fare)

1. **Verificare legittimita medica** - Il filtro deve essere riconosciuto clinicamente
2. **Verificare unicita** - Non deve duplicare filtri esistenti
3. **Usare ID kebab-case** - es. `shrimp-paste`, non `shrimpPaste`
4. **Tradurre in tutte le lingue** - EN, IT, VI obbligatori
5. **Assegnare icona appropriata** - Emoji rappresentativo
6. **Categorizzare correttamente**:
   - `allergen` = reazione immunitaria IgE
   - `intolerance` = reazione digestiva/metabolica
   - `diet` = scelta volontaria

### DON'T (Cosa NON Fare)

1. **NON duplicare** - Esempi di errori passati:
   - ❌ `wheat` (ridondante con `gluten`)
   - ❌ `mackerel` (ridondante con `fish`)
   - ❌ `crab` (ridondante con `crustaceans`)
   - ❌ `sesame-oil` (ridondante con `sesame`)
   - ❌ `peanut-oil` (ridondante con `peanuts`)

2. **NON confondere categorie**:
   - ❌ `msg-allergen` - MSG e intolleranza, NON allergia
   - ❌ `pork-allergen` - Maiale e scelta religiosa/dietetica, NON allergia
   - ❌ `chicken`/`beef` come allergen - Sono rarissime allergie, meglio come diete

3. **NON aggiungere filtri troppo specifici**:
   - ❌ Singoli tipi di noci (macadamia, cashew) - Usare `nuts` generico
   - ❌ Singoli tipi di pesce (salmon, tuna) - Usare `fish` generico

---

## Funzioni Helper Disponibili

```typescript
// Ottenere filtro per ID
getFilterById('gluten') // SafetyFilter | undefined

// Ottenere tutti i filtri di un tipo
getFiltersByType('allergen') // SafetyFilter[]

// Funzioni specifiche
getAllergens()    // SafetyFilter[] - 26 elementi
getIntolerances() // SafetyFilter[] - 10 elementi
getDiets()        // SafetyFilter[] - 14 elementi

// Conteggi
FILTER_COUNTS = {
    allergens: 26,
    intolerances: 10,
    diets: 14,
    total: 50
}
```

---

## Sincronizzazione Files

Quando modifichi `shared/database/safety-filters.ts`, sincronizza con:

```bash
# Dalla root del monorepo
cp shared/database/safety-filters.ts apps/coffeeshop/safety-filters.ts
cp shared/database/safety-filters.ts apps/coffeeshop/frontend/lib/safety/safety-filters.ts
cp shared/database/safety-filters.ts apps/backoffice/lib/shared/safety-filters.ts
```

---

## DIMENSIONE 4: FATTORI NUTRIZIONALI (9 parametri)

Valori nutrizionali per porzione o per 100g.

| ID | Italiano | English | Unità | Note |
|----|----------|---------|-------|------|
| `calories` | Calorie | Calories | kcal | Energia totale |
| `protein` | Proteine | Protein | g | Macronutriente |
| `carbs` | Carboidrati | Carbohydrates | g | Macronutriente |
| `sugar` | Zuccheri | Sugar | g | Sottocategoria carbs |
| `fat` | Grassi | Fat | g | Macronutriente |
| `saturated_fat` | Grassi Saturi | Saturated Fat | g | Sottocategoria fat |
| `fiber` | Fibre | Fiber | g | |
| `salt` | Sale | Salt | g | |
| `sodium` | Sodio | Sodium | mg | Alternativo a sale |

### Filtri Nutrizionali Supportati

```typescript
{
  maxCalories?: number;    // Calorie massime per porzione
  minProtein?: number;     // Proteine minime (g)
  maxCarbs?: number;       // Carboidrati massimi (g)
  maxSugar?: number;       // Zuccheri massimi (g)
  maxFat?: number;         // Grassi massimi (g)
  minFiber?: number;       // Fibre minime (g)
  maxSalt?: number;        // Sale massimo (g)
  maxSodium?: number;      // Sodio massimo (mg)
}
```

---

## DIMENSIONE 5: PICCANTEZZA (6 livelli)

Scala di piccantezza con riferimento alla scala Scoville.

| Livello | Italiano | English | Vietnamese | Scoville (SHU) | Esempio |
|---------|----------|---------|------------|----------------|---------|
| 0 | Nessuna | None | Không cay | 0 | Pane, latte |
| 1 | Lieve | Mild | Ít cay | 1-1,000 | Peperoncino dolce |
| 2 | Media | Medium | Cay vừa | 1,000-10,000 | Jalapeño |
| 3 | Forte | Hot | Cay | 10,000-50,000 | Serrano, Cayenne |
| 4 | Extra Forte | Extra Hot | Rất cay | 50,000-100,000 | Thai chili |
| 5 | Estremo | Extreme | Cực cay | 100,000+ | Habanero, Ghost pepper |

### Tipo TypeScript

```typescript
type SpiceLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface SpiceInfo {
  level: SpiceLevel;
  scoville?: number;        // Valore Scoville opzionale
  description?: MultiLangText;
}
```

---

## Regole di Implementazione

### REGOLA 1: Sempre Tutte e 5

Quando implementi filtri, UI, o API, **includi sempre tutte e 5 le dimensioni**:

```typescript
// ✅ CORRETTO - Tutte e 5 le dimensioni
interface ProductFilters {
  // 1. Allergeni
  allergenFree?: string[];

  // 2. Intolleranze
  intoleranceFree?: string[];

  // 3. Diete
  suitableForDiets?: string[];

  // 4. Fattori Nutrizionali
  maxCalories?: number;
  minProtein?: number;
  maxCarbs?: number;
  maxSugar?: number;
  maxFat?: number;

  // 5. Piccantezza
  maxSpiceLevel?: 0 | 1 | 2 | 3 | 4 | 5;
}

// ❌ SBAGLIATO - Mancano dimensioni
interface ProductFilters {
  allergenFree?: string[];     // Solo allergeni
  suitableForDiets?: string[]; // Solo diete
  // Mancano: intolleranze, nutrizione, piccantezza!
}
```

### REGOLA 2: Computed Data nei Prodotti

Ogni prodotto DEVE avere tutti i campi computed:

```typescript
computed: {
  allergens: string[];           // Lista allergeni presenti
  intolerances: string[];        // Lista intolleranze
  suitable_for_diets: string[];  // Diete compatibili
  spice_level: SpiceLevel;       // Livello 0-5
}

// + nutrition_per_serving per i fattori nutrizionali
nutrition_per_serving?: {
  serving_size_g?: number;
  calories_kcal?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  fiber_g?: number;
}
```

### REGOLA 3: Checklist Code Review

Prima di approvare codice che tocca filtri/sicurezza alimentare:

- [ ] Sono considerate tutte e 5 le dimensioni?
- [ ] Gli ID usati sono corretti (vedi tabelle sopra)?
- [ ] La documentazione menziona "(5 dimensioni)"?
- [ ] I test coprono tutte e 5 le dimensioni?
- [ ] L'UI mostra tutte e 5 le dimensioni all'utente?

---

## File di Riferimento

| File | Contenuto |
|------|-----------|
| `shared/database/types/index.ts` | Interfacce TypeScript per le 5 dimensioni |
| `shared/database/utils/auto-compute.ts` | Auto-calcolo delle 5 dimensioni dagli ingredienti |
| `shared/database/utils/product-search.ts` | API di ricerca con filtri 5 dimensioni |
| `shared/database/safety-filters.ts` | Icone e label per allergeni/diete |
| `docs/SISTEMA-FILTRI.md` | Questo documento (SOURCE OF TRUTH) |

---

## Storia delle Modifiche

### v3.0 (2025-12-13)
- Rinominato da "Sistema 50 Filtri" a "Sistema 5 Dimensioni"
- Aggiunte dimensioni 4 (Fattori Nutrizionali) e 5 (Piccantezza)
- Aggiornato allergeni: 26 -> 30 (aggiunto Korea 7 + Japan 7 + GUDBRO 2)
- Aggiunte Regole di Implementazione
- Aggiunta REGOLA D'ORO
- Totale: 50 -> 66 parametri

### v2.0 (2025-12-04)
- Rimossi 9 filtri ridondanti/errati
- Rinominato `msg-intolerance` -> `msg`
- Aggiunta documentazione dettagliata
- Totale: 59 -> 50 filtri

### v1.0 (2025-11-xx)
- Versione iniziale con 51 filtri pianificati
- Cresciuto a 59 filtri senza controllo qualità

---

## Riferimenti

- [EU Regulation 1169/2011](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32011R1169) - 14 allergeni obbligatori
- [FDA Major Food Allergens](https://www.fda.gov/food/food-allergies/food-allergen-labeling-and-consumer-protection-act-2004-falcpa) - 9 allergeni USA
- [FODMAP Diet](https://www.monashfodmap.com/) - Intolleranze fermentabili
- [Scoville Scale](https://en.wikipedia.org/wiki/Scoville_scale) - Scala piccantezza
