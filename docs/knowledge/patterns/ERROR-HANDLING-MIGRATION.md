# Error Handling Migration Pattern

> Come migrare API routes al sistema `withErrorHandling` + `AppError`.
> **Riferimento:** `apps/backoffice/app/api/audit-logs/route.ts` (primo route migrato)

**Last Updated:** 2026-02-06

---

## Quick Start

### Backoffice Routes

```typescript
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  AuthorizationError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const GET = withErrorHandling(
  async (request: Request) => {
    // ... business logic, throw errors instead of returning them
    return successResponse(data);
  },
  { context: 'route-name', logger: backofficeLogger }
);
```

### Dynamic Routes (con `[id]`, `[slug]`, etc.)

```typescript
import {
  withErrorHandlingDynamic,
  successResponse,
  NotFoundError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const PATCH = withErrorHandlingDynamic<unknown, { itemId: string }>(
  async (request, { params }) => {
    const { itemId } = await params;
    // ... business logic
    return successResponse(data);
  },
  { context: 'orders/items/status', logger: backofficeLogger }
);
```

### Coffeeshop / Accommodations Routes (no Pino)

```typescript
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
} from '@gudbro/utils';

export const GET = withErrorHandling(
  async (request: Request) => {
    // ... business logic
    return successResponse(data);
  },
  'route-name' // string shorthand (no custom logger needed)
);
```

---

## Regole di Trasformazione

### 1. Error Mapping (HTTP Status -> AppError)

| Prima (manuale)                                               | Dopo (throw)                                           |
| ------------------------------------------------------------- | ------------------------------------------------------ |
| `return NextResponse.json({ error: '...' }, { status: 400 })` | `throw new ValidationError('message', errors?)`        |
| `return NextResponse.json({ error: '...' }, { status: 401 })` | `throw new AuthenticationError('message?')`            |
| `return NextResponse.json({ error: '...' }, { status: 403 })` | `throw new AuthorizationError('message?')`             |
| `return NextResponse.json({ error: '...' }, { status: 404 })` | `throw new NotFoundError('resource?')`                 |
| `return NextResponse.json({ error: '...' }, { status: 409 })` | `throw new ConflictError('message')`                   |
| `return NextResponse.json({ error: '...' }, { status: 429 })` | `throw new RateLimitError('message?', retryAfter?)`    |
| `return NextResponse.json({ error: '...' }, { status: 500 })` | `throw new DatabaseError('message', { cause: error })` |
| `return NextResponse.json({ error: '...' }, { status: 502 })` | `throw new ExternalServiceError('service', 'message')` |
| `catch { console.error(); return 500 }`                       | Gestito automaticamente da `withErrorHandling`         |

### 2. Success Response Mapping

| Prima                                             | Dopo                                                      |
| ------------------------------------------------- | --------------------------------------------------------- |
| `return NextResponse.json(data)`                  | `return successResponse(data)`                            |
| `return NextResponse.json(data, { status: 201 })` | `return createdResponse(data)`                            |
| `return new NextResponse(null, { status: 204 })`  | `return noContentResponse()`                              |
| `return NextResponse.json({ items, total, ... })` | `return paginatedResponse(items, { page, limit, total })` |

### 3. Body Parsing

| Prima                                                 | Dopo                                            |
| ----------------------------------------------------- | ----------------------------------------------- |
| `const body = await request.json()`                   | `const body = await parseBody(request, schema)` |
| `const body = await request.json().catch(() => ({}))` | `const body = await parseBody(request, schema)` |
| Manual validation after parse                         | Zod schema validates automatically              |

### 4. Query Parsing

| Prima                                           | Dopo                                        |
| ----------------------------------------------- | ------------------------------------------- |
| `const { searchParams } = new URL(request.url)` | `const query = parseQuery(request, schema)` |
| Manual parseInt/validation                      | Zod schema coerces + validates              |

---

## Cosa Cambia nella Response

### Error Response (prima)

Ogni route ritornava un formato diverso:

```json
{ "error": "Unauthorized" }
{ "error": "Failed to fetch logs" }
{ "message": "Something went wrong" }
```

### Error Response (dopo)

Formato standardizzato:

```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Authentication required"
  }
}
```

Con validation details:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["Invalid email format"],
      "name": ["Required"]
    }
  }
}
```

### Success Response (dopo)

```json
{
  "success": true,
  "data": { ... }
}
```

---

## Esempio Completo: audit-logs

### PRIMA (69 righe, 2 console.error, formato inconsistente)

```typescript
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // ... business logic
    if (error) {
      console.error('Audit logs fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch logs' },
        { status: 500 }
      );
    }
    return NextResponse.json({ logs, total, limit, offset });
  } catch (error) {
    console.error('Audit logs API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### DOPO (73 righe, 0 console.error, formato standardizzato)

```typescript
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  AuthorizationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const GET = withErrorHandling(
  async (request: Request) => {
    const session = await getSession();
    if (!session?.user) {
      throw new AuthenticationError();
    }
    // ... business logic (invariata)
    if (error) {
      throw new DatabaseError('Failed to fetch audit logs', { cause: error });
    }
    return successResponse({ logs, total, limit, offset });
  },
  { context: 'audit-logs', logger: backofficeLogger }
);
```

### Cosa cambia

1. **try/catch esterno rimosso** - gestito da `withErrorHandling`
2. **console.error rimossi** - logging automatico via `backofficeLogger` (Pino)
3. **401/403 diventano throw** - `AuthenticationError`, `AuthorizationError`
4. **500 su DB error diventa throw** - `DatabaseError` con causa originale
5. **NextResponse.json diventa successResponse** - formato standardizzato
6. **export async function -> export const** - handler wrappato

---

## Backoffice Logger (Pino Adapter)

Il backoffice usa Pino (structured logging), non il shared Logger.
L'adapter in `@/lib/api/error-handler` mappa automaticamente:

```typescript
import { backofficeLogger } from '@/lib/api/error-handler';

// Usalo sempre nelle options:
withErrorHandling(handler, { context: 'route-name', logger: backofficeLogger });
```

Per coffeeshop/accommodations non serve: usano il shared Logger di default.

---

## Checklist Migrazione

Per ogni route:

- [ ] Wrap handler con `withErrorHandling` o `withErrorHandlingDynamic`
- [ ] Rimuovere try/catch esterno
- [ ] Sostituire `return NextResponse.json({error}, status)` con `throw new AppError`
- [ ] Sostituire `console.error` (gestito dal wrapper)
- [ ] Sostituire `NextResponse.json(data)` con `successResponse(data)`
- [ ] Se backoffice: aggiungere `logger: backofficeLogger`
- [ ] Se body parsing: usare `parseBody(request, zodSchema)`
- [ ] Verificare typecheck
