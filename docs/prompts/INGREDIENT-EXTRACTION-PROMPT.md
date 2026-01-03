# GudBro Ingredient Extraction Prompt

> **Versione:** 1.0.0
> **Data:** 2026-01-03
> **Uso:** Copia questo prompt in Gemini/ChatGPT insieme alla foto dell'etichetta nutrizionale

---

## Prompt per l'utente

Copia il testo seguente e incollalo in Gemini o ChatGPT insieme alla foto dell'etichetta:

---

```
Analizza questa etichetta nutrizionale e restituisci un JSON con i dati dell'ingrediente.

REGOLE IMPORTANTI:
1. Tutti i valori nutrizionali devono essere PER 100g (normalizza se necessario)
2. Usa SOLO unità metriche (g, mg, mcg, kcal)
3. Il nome deve essere in INGLESE
4. Se un valore non è presente, usa null
5. Categoria deve essere una di: proteins, dairy, vegetables, fruits, grains, legumes, nuts_seeds, herbs_spices, oils_fats, sweeteners, condiments, beverages, seafood, baking, cured_meats, sausages, cheese, poultry, red_meat, game, offal

FORMATO JSON RICHIESTO:

{
  "name": "Nome ingrediente in inglese",
  "category": "categoria",
  "subcategory": "sottocategoria opzionale",
  "nutrition": {
    "calories": numero,
    "protein": numero,
    "carbohydrates": numero,
    "sugar": numero,
    "fiber": numero,
    "fat": numero,
    "saturated_fat": numero,
    "monounsaturated_fat": numero,
    "polyunsaturated_fat": numero,
    "trans_fat": numero,
    "cholesterol": numero,
    "sodium": numero,
    "potassium": numero,
    "calcium": numero,
    "iron": numero,
    "vitamin_a": numero,
    "vitamin_c": numero,
    "vitamin_d": numero,
    "vitamin_e": numero,
    "vitamin_k": numero,
    "vitamin_b6": numero,
    "vitamin_b12": numero,
    "folate": numero,
    "magnesium": numero,
    "zinc": numero,
    "selenium": numero,
    "phosphorus": numero
  },
  "allergens": ["array di allergeni se presenti"],
  "is_vegan": true/false,
  "is_vegetarian": true/false,
  "is_gluten_free": true/false,
  "is_dairy_free": true/false,
  "description": "Breve descrizione dell'ingrediente",
  "origin_country": "Codice ISO 2 lettere se noto, es: IT, US, JP",
  "brand": "Marca del prodotto se visibile"
}

ALLERGENI VALIDI:
- gluten, wheat, dairy, milk, eggs, fish, shellfish, crustaceans
- tree_nuts, peanuts, soy, sesame, mustard, celery, lupin, mollusks, sulfites

Restituisci SOLO il JSON, senza spiegazioni.
```

---

## Esempio di Output Atteso

```json
{
  "name": "Greek Yogurt",
  "category": "dairy",
  "subcategory": "yogurt",
  "nutrition": {
    "calories": 97,
    "protein": 9,
    "carbohydrates": 3.6,
    "sugar": 3.2,
    "fiber": 0,
    "fat": 5,
    "saturated_fat": 3.2,
    "monounsaturated_fat": 1.3,
    "polyunsaturated_fat": 0.2,
    "trans_fat": 0,
    "cholesterol": 13,
    "sodium": 36,
    "potassium": 141,
    "calcium": 100,
    "iron": 0,
    "vitamin_a": 26,
    "vitamin_c": 0,
    "vitamin_d": 0,
    "vitamin_e": null,
    "vitamin_k": null,
    "vitamin_b6": null,
    "vitamin_b12": 0.75,
    "folate": null,
    "magnesium": 11,
    "zinc": 0.5,
    "selenium": null,
    "phosphorus": 135
  },
  "allergens": ["dairy", "milk"],
  "is_vegan": false,
  "is_vegetarian": true,
  "is_gluten_free": true,
  "is_dairy_free": false,
  "description": "Thick, creamy strained yogurt with high protein content",
  "origin_country": "GR",
  "brand": "Fage"
}
```

---

## Note per gli Sviluppatori

### Validazione JSON (frontend)

```typescript
interface IngredientSubmission {
  name: string;
  category: string;
  subcategory?: string;
  nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    sugar?: number;
    fiber?: number;
    fat: number;
    saturated_fat?: number;
    // ... altri campi opzionali
  };
  allergens?: string[];
  is_vegan?: boolean;
  is_vegetarian?: boolean;
  is_gluten_free?: boolean;
  is_dairy_free?: boolean;
  description?: string;
  origin_country?: string;
  brand?: string;
}

const VALID_CATEGORIES = [
  'proteins', 'dairy', 'vegetables', 'fruits', 'grains', 'legumes',
  'nuts_seeds', 'herbs_spices', 'oils_fats', 'sweeteners', 'condiments',
  'beverages', 'seafood', 'baking', 'cured_meats', 'sausages', 'cheese',
  'poultry', 'red_meat', 'game', 'offal'
];

const VALID_ALLERGENS = [
  'gluten', 'wheat', 'dairy', 'milk', 'eggs', 'fish', 'shellfish',
  'crustaceans', 'tree_nuts', 'peanuts', 'soy', 'sesame', 'mustard',
  'celery', 'lupin', 'mollusks', 'sulfites'
];

function validateIngredientJson(json: unknown): IngredientSubmission | null {
  // Implementare validazione
}
```

### Campi Obbligatori

- `name` (string, non vuoto)
- `category` (string, da lista valida)
- `nutrition.calories` (number >= 0)
- `nutrition.protein` (number >= 0)
- `nutrition.carbohydrates` (number >= 0)
- `nutrition.fat` (number >= 0)

### Workflow Completo

1. Utente cerca ingrediente → non trovato
2. Click "Aggiungi ingrediente"
3. Upload foto etichetta nutrizionale
4. Copia prompt → incolla in Gemini/ChatGPT con foto
5. AI restituisce JSON
6. Utente incolla JSON nel form
7. Sistema valida JSON
8. Opzioni:
   - "Usa subito" → ingrediente temporaneo per questo piatto
   - "Invia per review" → va in coda admin, 50 punti se approvato

### Status Contribution

- `pending` - In attesa di review
- `approved` - Approvato, aggiunto al DB globale, punti assegnati
- `merged` - Unito a ingrediente esistente (era quasi-duplicato)
- `rejected` - Rifiutato (dati errati, duplicato esatto, spam)
