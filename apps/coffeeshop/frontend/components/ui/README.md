# Design System - UI Components

Sistema di design completo e type-safe per il progetto ROOTS Coffeeshop, costruito con Class Variance Authority (CVA).

## Indice

- [Panoramica](#panoramica)
- [Installazione](#installazione)
- [Componenti](#componenti)
  - [Button](#button)
  - [Card](#card)
  - [Input & Textarea](#input--textarea)
  - [Badge](#badge)
  - [Alert](#alert)
- [Best Practices](#best-practices)
- [Esempi d'Uso](#esempi-duso)

---

## Panoramica

Questo Design System fornisce:

- **Single Source of Truth**: Modifica lo stile di un componente in 1 solo file
- **Type-Safe**: TypeScript autocomplete per tutte le varianti
- **Consistenza**: Tutti i componenti usano lo stesso design language
- **Manutenibilità**: Facile aggiornare tutti i bottoni/card/input di un tipo specifico
- **Performance**: Styling ottimizzato con Tailwind CSS

### Tecnologie

- **Class Variance Authority (CVA)**: Gestione varianti type-safe
- **Tailwind CSS**: Utility-first CSS framework
- **tailwind-merge**: Merge intelligente di classi Tailwind
- **clsx**: Conditional class names

---

## Installazione

Le dipendenze sono già installate:

```json
{
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.4"
}
```

---

## Componenti

### Button

Bottone con 6 varianti e 4 taglie.

**Varianti**: `primary`, `secondary`, `danger`, `ghost`, `link`, `outline`
**Taglie**: `sm`, `md`, `lg`, `icon`

```tsx
import { Button } from '@/components/ui'

// Primary button (default)
<Button>Clicca qui</Button>

// Secondary button
<Button variant="secondary">Annulla</Button>

// Danger button
<Button variant="danger">Elimina</Button>

// Ghost button
<Button variant="ghost">Chiudi</Button>

// Large button
<Button size="lg">Grande</Button>

// Icon button
<Button variant="ghost" size="icon">
  <svg>...</svg>
</Button>
```

**File**: `components/ui/button.tsx`

---

### Card

Card con 5 varianti, 4 padding, e sub-componenti semantici.

**Varianti**: `default`, `elevated`, `interactive`, `selected`, `ghost`
**Padding**: `none`, `sm`, `md`, `lg`
**Sub-componenti**: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'

// Basic card
<Card>
  <CardContent>Contenuto qui</CardContent>
</Card>

// Elevated card (modals, dropdowns)
<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Titolo</CardTitle>
    <CardDescription>Descrizione</CardDescription>
  </CardHeader>
  <CardContent>Contenuto</CardContent>
</Card>

// Interactive card (clickable)
<Card variant="interactive" onClick={handleClick}>
  <CardContent>Click me</CardContent>
</Card>

// Selected state
<Card variant={isSelected ? "selected" : "interactive"}>
  <CardContent>Metodo di pagamento</CardContent>
</Card>
```

**File**: `components/ui/card.tsx`

---

### Input & Textarea

Input e textarea con validazione visiva.

**Varianti**: `default`, `error`, `success`, `ghost`
**Taglie**: `sm`, `md`, `lg`

```tsx
import { Input, Textarea } from '@/components/ui'

// Standard input
<Input placeholder="Nome" />

// Input con errore
<Input
  variant="error"
  error="Campo obbligatorio"
  placeholder="Email"
/>

// Input success
<Input variant="success" value="test@example.com" />

// Large input
<Input inputSize="lg" placeholder="Cerca..." />

// Textarea
<Textarea
  placeholder="Messaggio"
  rows={4}
/>

// Textarea con errore
<Textarea
  error="Messaggio troppo corto"
  placeholder="Descrizione"
/>
```

**File**: `components/ui/input.tsx`

---

### Badge

Badge/tag per status, labels, categorie.

**Varianti**: `default`, `primary`, `success`, `warning`, `error`, `info`, `outline`, `ghost`
**Taglie**: `sm`, `md`, `lg`

```tsx
import { Badge } from '@/components/ui'

// Status badges
<Badge variant="success">Disponibile</Badge>
<Badge variant="warning">In Preparazione</Badge>
<Badge variant="error">Esaurito</Badge>

// Info badge
<Badge variant="info">Nuovo</Badge>

// Primary badge
<Badge variant="primary">In Evidenza</Badge>

// Outline badge
<Badge variant="outline">Vegetariano</Badge>

// Size variants
<Badge size="sm">Piccolo</Badge>
<Badge size="lg">Grande</Badge>
```

**File**: `components/ui/badge.tsx`

---

### Alert

Alert/notifiche per messaggi informativi.

**Varianti**: `default`, `info`, `success`, `warning`, `error`
**Sub-componenti**: `AlertTitle`, `AlertDescription`

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui'

// Info alert
<Alert variant="info">
  <AlertTitle>Informazione</AlertTitle>
  <AlertDescription>
    Il tuo ordine è stato ricevuto.
  </AlertDescription>
</Alert>

// Success alert
<Alert variant="success">
  <AlertTitle>Successo!</AlertTitle>
  <AlertDescription>
    Pagamento completato con successo.
  </AlertDescription>
</Alert>

// Warning alert
<Alert variant="warning">
  <AlertTitle>Attenzione</AlertTitle>
  <AlertDescription>
    Alcuni piatti potrebbero richiedere più tempo.
  </AlertDescription>
</Alert>

// Error alert
<Alert variant="error">
  <AlertTitle>Errore</AlertTitle>
  <AlertDescription>
    Si è verificato un errore durante l'elaborazione.
  </AlertDescription>
</Alert>
```

**File**: `components/ui/alert.tsx`

---

## Best Practices

### 1. Import Centralizzato

Usa sempre l'import centralizzato:

```tsx
// ✅ Corretto
import { Button, Card, Input, Badge } from '@/components/ui';

// ❌ Evitare
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

### 2. Modifiche Centralizzate

Per modificare TUTTI i bottoni di un tipo:

```tsx
// File: components/ui/button.tsx:22
primary: 'bg-theme-brand-primary hover:bg-theme-brand-primary-hover ...';
// Modifica qui → tutti i bottoni primary nell'app cambiano
```

### 3. Estendi con className

Puoi sempre aggiungere classi personalizzate:

```tsx
<Button className="w-full mt-4">
  Bottone Full Width
</Button>

<Card className="max-w-md mx-auto">
  Card Centrata
</Card>
```

### 4. Composizione

Componi i componenti per creare UI complesse:

```tsx
<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Ordine #1234</CardTitle>
    <CardDescription>
      <Badge variant="warning">In Preparazione</Badge>
    </CardDescription>
  </CardHeader>

  <CardContent>
    <Alert variant="info">
      <AlertDescription>Tempo stimato: 15 minuti</AlertDescription>
    </Alert>
  </CardContent>

  <CardFooter>
    <Button variant="secondary" className="flex-1">
      Annulla
    </Button>
    <Button variant="primary" className="flex-1">
      Conferma
    </Button>
  </CardFooter>
</Card>
```

### 5. Refactoring Incrementale

NON riscrivere tutto subito. Quando tocchi un file:

1. Sostituisci i `<button>` con `<Button>`
2. Sostituisci le `<div>` card con `<Card>`
3. Gradualmente converti tutta l'app

---

## Esempi d'Uso

### Esempio 1: Form di Login

```tsx
import {
  Input,
  Button,
  Alert,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui';

function LoginForm() {
  const [error, setError] = useState('');

  return (
    <Card variant="elevated" padding="lg" className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Accedi</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="error">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Input type="email" placeholder="Email" inputSize="lg" />

        <Input type="password" placeholder="Password" inputSize="lg" />

        <Button variant="primary" size="lg" className="w-full">
          Accedi
        </Button>

        <Button variant="ghost" className="w-full">
          Password dimenticata?
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Esempio 2: Lista Prodotti

```tsx
import { Card, Badge, Button } from '@/components/ui';

function ProductCard({ product }) {
  return (
    <Card variant="interactive" className="relative">
      <CardContent className="p-4">
        {product.isNew && (
          <Badge variant="info" className="absolute right-2 top-2">
            Nuovo
          </Badge>
        )}

        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-theme-text-secondary mt-1 text-sm">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">${product.price}</span>

          <div className="flex gap-2">
            <Badge variant={product.available ? 'success' : 'error'} size="sm">
              {product.available ? 'Disponibile' : 'Esaurito'}
            </Badge>

            <Button size="sm" disabled={!product.available}>
              Aggiungi
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Esempio 3: Backoffice Dashboard

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Alert,
} from '@/components/ui';

function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Stat Cards */}
      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="text-theme-text-secondary text-sm">Ordini Oggi</div>
          <div className="mt-2 text-3xl font-bold">142</div>
          <Badge variant="success" className="mt-2">
            +12%
          </Badge>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="text-theme-text-secondary text-sm">Ricavi</div>
          <div className="mt-2 text-3xl font-bold">€2,450</div>
          <Badge variant="success" className="mt-2">
            +8%
          </Badge>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="text-theme-text-secondary text-sm">Tempo Medio</div>
          <div className="mt-2 text-3xl font-bold">18 min</div>
          <Badge variant="warning" className="mt-2">
            -5%
          </Badge>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card variant="default" className="col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Ordini Recenti</CardTitle>
            <Button variant="outline">Vedi tutti</Button>
          </div>
        </CardHeader>
        <CardContent>{/* Order items here */}</CardContent>
      </Card>
    </div>
  );
}
```

---

## Utility: cn()

La funzione `cn()` in `lib/utils/cn.ts` è usata internamente per mergere le classi Tailwind in modo intelligente:

```tsx
import { cn } from '@/lib/utils/cn';

// Merge classi con conflict resolution
cn('px-2', 'px-4'); // → "px-4" (l'ultimo vince)

// Con condizioni
cn('px-2', isActive && 'bg-blue-500'); // → "px-2 bg-blue-500" (se isActive=true)

// Con array
cn(['px-2', 'py-1'], className); // → merge con className esterno
```

---

## Modificare lo Stile Globale

Per cambiare il theme globale (colori, border-radius, etc.):

1. **Colori**: Modifica `app/globals-v2.css` con le variabili CSS theme-\*
2. **Border Radius**: Modifica `rounded-xl` nei file components/ui/\*.tsx
3. **Font**: Modifica `font-semibold` nei file components/ui/\*.tsx
4. **Spacing**: Modifica padding/margin nei variants

---

## Aggiungere Nuovi Componenti

Per aggiungere un nuovo componente al Design System:

1. Crea il file `components/ui/nuovo-componente.tsx`
2. Usa il pattern CVA con variants
3. Esporta da `components/ui/index.ts`
4. Documenta in questo README
5. Aggiorna `CLAUDE.md` se necessario

---

## File Structure

```
components/ui/
├── README.md           # Questa documentazione
├── index.ts            # Export centralizzato
├── button.tsx          # Button component
├── card.tsx            # Card component
├── input.tsx           # Input & Textarea components
├── badge.tsx           # Badge component
└── alert.tsx           # Alert component

lib/utils/
└── cn.ts              # Class name utility
```

---

## Link Utili

- [Class Variance Authority](https://cva.style/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) - Ispirazione per questo design system

---

**Ultima Modifica**: 2025-11-19
**Versione**: 1.0.0
