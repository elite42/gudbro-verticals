# Coding Standards GUDBRO

> Convenzioni e best practices per il codice.
> Seguire queste convenzioni garantisce consistenza nel codebase.

---

## TypeScript

### Strict Mode

Il progetto usa TypeScript in strict mode. Non ignorare errori con `@ts-ignore`.

```typescript
// ❌ Evita
// @ts-ignore
const data = response.data;

// ✅ Preferisci
const data = response.data as ExpectedType;
// oppure gestisci il tipo correttamente
```

### Tipi Espliciti

Definisci sempre i tipi per props, return values, e variabili complesse.

```typescript
// ❌ Evita
function getUser(id) {
  return users.find((u) => u.id === id);
}

// ✅ Preferisci
function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
```

### Interface vs Type

- **Interface** per oggetti che possono essere estesi
- **Type** per union types, tuples, computed types

```typescript
// Interface per entità
interface Merchant {
  id: string;
  name: string;
  slug: string;
}

// Type per varianti
type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
```

---

## React Components

### Componenti Funzionali

Usa sempre componenti funzionali con hooks.

```typescript
// ❌ Evita classi
class MyComponent extends React.Component { }

// ✅ Preferisci
function MyComponent({ title }: { title: string }) {
  return <h1>{title}</h1>;
}
```

### Props Interface

Definisci sempre l'interface delle props.

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ label, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button
      className={cn('btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary')}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
```

### 'use client' Directive

Usa `'use client'` solo quando necessario (hooks, eventi, browser APIs).

```typescript
// Solo se usi useState, useEffect, onClick, etc.
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```

---

## File Naming

| Tipo       | Convenzione    | Esempio                      |
| ---------- | -------------- | ---------------------------- |
| Componenti | PascalCase     | `QRPreview.tsx`              |
| Utilities  | kebab-case     | `rate-limiter.ts`            |
| Types      | kebab-case     | `qr-types.ts`                |
| Test       | same-name.test | `rate-limiter.test.ts`       |
| API Routes | route.ts       | `app/api/merchants/route.ts` |

---

## Import Organization

Ordine degli import:

```typescript
// 1. React/Next
import { useState, useEffect } from 'react';
import { NextRequest, NextResponse } from 'next/server';

// 2. External libraries
import { format } from 'date-fns';
import { Redis } from '@upstash/redis';

// 3. Internal - absolute imports
import { Button } from '@/components/ui/Button';
import { redis } from '@/lib/cache';

// 4. Internal - relative imports
import { localHelper } from './helpers';

// 5. Types (last)
import type { Merchant, Order } from '@/types';
```

### Alias @/

Usa sempre `@/` per import dal root del progetto.

```typescript
// ❌ Evita
import { Button } from '../../../components/ui/Button';

// ✅ Preferisci
import { Button } from '@/components/ui/Button';
```

---

## API Routes

### Pattern Standard

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '@/lib/security/rate-limiter';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // 1. Rate limiting
  const rateLimitResponse = await withRateLimit(request, 'api');
  if (rateLimitResponse) return rateLimitResponse;

  // 2. Try-catch wrapper
  try {
    // 3. Parse body
    const body = await request.json();

    // 4. Validate input
    if (!body.merchantId) {
      return NextResponse.json(
        { error: 'Missing required field: merchantId' },
        { status: 400 }
      );
    }

    // 5. Business logic
    const result = await doSomething(body);

    // 6. Success response
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    // 7. Error handling
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

### Response Format

```typescript
// Success
{ success: true, data: {...} }

// Error
{ error: 'Human readable message', code: 'ERROR_CODE' }

// List con pagination
{ success: true, data: [...], pagination: { page, total, hasMore } }
```

---

## Database / SQL

### Supabase Client

```typescript
// Server component / API route
import { createServerClient } from '@supabase/ssr';

// Client component
import { createBrowserClient } from '@supabase/ssr';

// Admin operations (bypass RLS)
import { supabaseAdmin } from '@/lib/supabase-admin';
```

### Query Pattern

```typescript
// ✅ Buono - join in una query
const { data } = await supabase
  .from('merchants')
  .select(
    `
    *,
    locations (*),
    menu_categories (
      *,
      menu_items (*)
    )
  `
  )
  .eq('id', merchantId)
  .single();

// ❌ Evita - N+1 queries
const merchant = await supabase.from('merchants').select('*');
for (const m of merchant.data) {
  m.locations = await supabase
    .from('locations')
    .select('*')
    .eq('merchant_id', m.id);
}
```

### SQL Conventions

- **Array syntax:** `'{a,b,c}'` non `'["a","b","c"]'`
- **UUID:** Solo caratteri hex (0-9, a-f)
- **Naming:** snake_case per tabelle e colonne

---

## Styling (Tailwind)

### Class Order

Segui l'ordine logico:

1. Layout (flex, grid, position)
2. Sizing (w, h, p, m)
3. Typography (text, font)
4. Visual (bg, border, shadow)
5. States (hover, focus)

```typescript
// ✅ Ordinato
<div className="flex items-center gap-4 p-4 text-sm text-gray-700 bg-white rounded-lg shadow-sm hover:shadow-md">

// ❌ Disordinato
<div className="hover:shadow-md bg-white p-4 flex shadow-sm rounded-lg text-gray-700 gap-4 items-center text-sm">
```

### cn() Helper

Usa `cn()` per classi condizionali.

```typescript
import { cn } from '@/lib/utils';

<button
  className={cn(
    'px-4 py-2 rounded',
    variant === 'primary' && 'bg-blue-500 text-white',
    variant === 'secondary' && 'bg-gray-100 text-gray-700',
    disabled && 'opacity-50 cursor-not-allowed'
  )}
>
```

---

## Error Handling

### Try-Catch Pattern

```typescript
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  // Log con contesto
  console.error('[ServiceName] Operation failed:', error);

  // Re-throw con messaggio utile
  throw new Error(
    `Failed to do X: ${error instanceof Error ? error.message : 'Unknown'}`
  );
}
```

### Non Silenziare Errori

```typescript
// ❌ Evita
try {
  await something();
} catch (e) {
  // silenzioso
}

// ✅ Preferisci
try {
  await something();
} catch (error) {
  console.error('Something failed:', error);
  // Gestisci o propaga
}
```

---

## Comments

### Quando Commentare

- Logica non ovvia
- Workaround temporanei (con TODO)
- API pubbliche (JSDoc)

```typescript
/**
 * Calcola il prezzo finale applicando sconti e tasse.
 * @param basePrice - Prezzo base in centesimi
 * @param discountPercent - Sconto percentuale (0-100)
 * @returns Prezzo finale in centesimi
 */
function calculateFinalPrice(
  basePrice: number,
  discountPercent: number
): number {
  // Apply discount first, then tax (Vietnam VAT 10%)
  const discounted = basePrice * (1 - discountPercent / 100);
  return Math.round(discounted * 1.1);
}
```

### TODO Format

```typescript
// TODO: [TASK-ID] Descrizione breve
// TODO: [SEC-ZOD] Add Zod validation here
```

---

## Testing

### File Structure

```
lib/
├── rate-limiter.ts
└── __tests__/
    └── rate-limiter.test.ts
```

### Test Pattern

```typescript
import { describe, it, expect, vi } from 'vitest';
import { calculatePrice } from '../price-calculator';

describe('calculatePrice', () => {
  it('should apply discount correctly', () => {
    const result = calculatePrice(1000, 10);
    expect(result).toBe(990);
  });

  it('should handle zero discount', () => {
    const result = calculatePrice(1000, 0);
    expect(result).toBe(1100); // with 10% tax
  });
});
```

---

## Git Conventions

### Branch Naming

```
feature/nome-feature     # Nuova feature
fix/descrizione-bug      # Bug fix
refactor/cosa-refactor   # Refactoring
docs/cosa-documenti      # Documentazione
```

### Commit Messages

```
feat: add QR code export to PDF
fix: resolve reservation overlap issue
refactor: extract cache logic to separate module
docs: update onboarding guide
chore: update dependencies
```

### PR Template

```markdown
## Summary

- What this PR does

## Test Plan

- [ ] Manual testing done
- [ ] Unit tests added/updated

## Screenshots (if UI changes)
```

---

## Anti-Patterns da Evitare

| Anti-Pattern             | Problema          | Soluzione               |
| ------------------------ | ----------------- | ----------------------- |
| `any` type               | Perde type safety | Definisci tipo corretto |
| N+1 queries              | Performance       | Join in una query       |
| `console.log` in prod    | Rumore nei log    | Usa logging strutturato |
| Magic numbers            | Non chiaro        | Usa costanti con nomi   |
| Catch silenzioso         | Bug nascosti      | Log e gestisci          |
| Import relativi profondi | Fragili           | Usa alias `@/`          |

---

## Riferimenti

- `CLAUDE.md` Sezione 3.5 - Compounding Engineering (errori passati)
- `docs/DATABASE-SCHEMA.md` - Schema database
- `docs/PROCEDURE-CHECKLIST.md` - Checklist per task
