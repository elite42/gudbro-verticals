# Sistema 50 Filtri GUDBRO

**Versione:** 2.0 (Dicembre 2025)
**Ultimo Aggiornamento:** 2025-12-04
**Autore:** Claude Code + Team GUDBRO

---

## Overview

Il Sistema Filtri GUDBRO gestisce 50 filtri di sicurezza alimentare divisi in 3 categorie:
- **26 Allergeni** - Reazioni immuno-mediate
- **10 Intolleranze** - Reazioni non immuno-mediate (digestive/metaboliche)
- **14 Diete** - Scelte di stile di vita, religiose o salutistiche

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

## Storia delle Modifiche

### v2.0 (2025-12-04)
- Rimossi 9 filtri ridondanti/errati
- Rinominato `msg-intolerance` -> `msg`
- Aggiunta documentazione dettagliata
- Totale: 59 -> 50 filtri

### v1.0 (2025-11-xx)
- Versione iniziale con 51 filtri pianificati
- Cresciuto a 59 filtri senza controllo qualita

---

## Riferimenti

- [EU Regulation 1169/2011](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32011R1169) - 14 allergeni obbligatori
- [FDA Major Food Allergens](https://www.fda.gov/food/food-allergies/food-allergen-labeling-and-consumer-protection-act-2004-falcpa) - 9 allergeni USA
- [FODMAP Diet](https://www.monashfodmap.com/) - Intolleranze fermentabili
