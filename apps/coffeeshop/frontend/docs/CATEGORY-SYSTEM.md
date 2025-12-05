# GUDBRO Category System v1.0

## Overview

Il sistema di categorie garantisce che i prodotti appaiano sempre nel tab corretto (Drinks/Food/Merch) e fornisce warning in development quando ci sono problemi.

## Architettura

```
┌─────────────────────────────────────────────────────────────────┐
│                     SINGLE SOURCE OF TRUTH                       │
│                                                                   │
│   /data/categories.ts                                            │
│   - Definisce TUTTE le categorie valide                          │
│   - Ogni categoria ha un menuType: 'food' | 'drinks' | 'merch'   │
│   - Include traduzioni (en/it/vi), icone, subcategorie           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CATEGORY SYSTEM                              │
│                                                                   │
│   /lib/category-system.ts                                        │
│   - getProductMenuType(categoryId) → MenuType                    │
│   - validateProducts(products) → Errors/Warnings                 │
│   - Dynamic categories (Popular, New, Favorites)                 │
│   - Type-safe category IDs                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MENU CLIENT                                   │
│                                                                   │
│   /app/menu/MenuClient.tsx                                       │
│   - Importa getProductMenuType da category-system               │
│   - Valida prodotti in development con warning console           │
│   - Filtra per menuType usando il sistema centralizzato          │
└─────────────────────────────────────────────────────────────────┘
```

## File Chiave

### 1. `/data/categories.ts` - Definizione Categorie

```typescript
// Ogni categoria DEVE avere:
{
  id: 'hot-coffee',           // ID unico (usato nei prodotti)
  slug: 'hot-coffee',         // URL-friendly
  name: { en, it, vi },       // Traduzioni nome
  menuType: 'drinks',         // 👈 OBBLIGATORIO: determina il tab
  temperature: 'hot',
  icon: '☕',
  // ...
}
```

**Menu Types:**
- `'drinks'` → Tab "Drinks" (bevande, caffè, tè, smoothie, milkshake)
- `'food'` → Tab "Food" (cibo, dessert)
- `'merchandise'` → Tab "Merch" (gadget, chicchi caffè)

### 2. `/lib/category-system.ts` - Logica e Validazione

```typescript
// Funzioni principali
getProductMenuType(categoryId)  // Ritorna il menuType per un prodotto
validateProducts(products)       // Valida i prodotti e ritorna errori/warning
isValidCategory(categoryId)      // Controlla se la categoria esiste
```

### 3. Categorie Dinamiche

Gestite centralmente in `category-system.ts`:

| ID | Nome | Comportamento |
|----|------|--------------|
| `all` | Tutti | Sempre visibile |
| `popular` | Popolari | Mostra se ci sono prodotti popolari |
| `new` | Nuovi | Mostra se ci sono prodotti con `isNew=true` e `newUntil > now` |
| `favorites` | Preferiti | Mostra se l'utente ha preferiti salvati |

## Come Aggiungere una Nuova Categoria

### Step 1: Aggiungi in `categories.ts`

```typescript
// In /data/categories.ts, aggiungi nell'array categories:
{
  id: 'new-category',
  slug: 'new-category',
  name: {
    en: 'New Category',
    it: 'Nuova Categoria',
    vi: 'Danh Mục Mới'
  },
  description: { en: '...', it: '...', vi: '...' },
  icon: '🆕',
  temperature: 'both',
  menuType: 'drinks',  // 👈 IMPORTANTE: scegli il tab corretto
  image: '/categories/new-category.jpg',
  sortOrder: 10,
  isVisible: true,
  quickPrompts: { en: [], it: [], vi: [] },
  tags: [],
  defaultTimeSlots: ['all-day']
}
```

### Step 2: Verifica

1. Riavvia il dev server
2. Apri la console del browser
3. Se ci sono errori/warning, appariranno automaticamente

## Validazione Automatica

In **development mode**, il sistema:

1. Valida tutti i prodotti al caricamento
2. Mostra warning in console per categorie non trovate
3. Mostra errori per prodotti con categoria senza menuType

```
🚨 Category Validation Errors: [
  { type: 'unknown_category', category: 'typo-category', ... }
]

⚠️ Category Validation Warnings: [
  { type: 'empty_category', category: 'merch', ... }
]
```

## Regole di Fallback

Se un prodotto ha una categoria non definita in `categories.ts`:

1. **Prima**: cerca nel file categories.ts
2. **Poi**: controlla mappature legacy (antipasti, primi, etc.)
3. **Default**: ritorna `'drinks'` (per coffee shop)

## Troubleshooting

### "Prodotto non appare nel menu"

1. Controlla la console per errori di validazione
2. Verifica che la categoria del prodotto esista in `categories.ts`
3. Verifica che la categoria abbia `menuType` corretto

### "Prodotto appare nel tab sbagliato"

1. Apri `data/categories.ts`
2. Trova la categoria del prodotto
3. Verifica/correggi il campo `menuType`

### "Warning: legacy_category"

Significa che stai usando una categoria non definita in `categories.ts`.
Soluzione: aggiungi la categoria al file oppure aggiorna i prodotti.

## Best Practices

1. **MAI** hardcodare mapping categoria→menuType in altri file
2. **SEMPRE** aggiungere nuove categorie in `categories.ts`
3. **SEMPRE** includere il campo `menuType` nelle nuove categorie
4. **SEMPRE** testare in development prima di deployare
5. **CONTROLLARE** la console per warning/errori

## Migrazione da Sistema Precedente

Il vecchio sistema aveva:
- Mapping hardcoded in `MenuClient.tsx`
- Nessuna validazione
- Nessun warning per categorie mancanti

Il nuovo sistema:
- Single source of truth in `categories.ts`
- Validazione automatica in development
- Warning espliciti in console
- Type-safety per categoryId
