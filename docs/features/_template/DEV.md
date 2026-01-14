# [Nome Feature] - Documentazione Tecnica

> Documentazione per sviluppatori che lavorano su questa feature.

---

## Architettura

### Overview

```
[Diagramma ASCII o descrizione del flusso dati]

User → UI Component → API Route → Service → Database
                                     ↓
                              External Service
```

### Componenti

| Componente | Path           | Responsabilità |
| ---------- | -------------- | -------------- |
| [Nome]     | `path/to/file` | [Cosa fa]      |
| [Nome]     | `path/to/file` | [Cosa fa]      |

---

## File Principali

### UI (Frontend)

| File                                 | Tipo      | Descrizione   |
| ------------------------------------ | --------- | ------------- |
| `app/(dashboard)/[feature]/page.tsx` | Page      | Main page     |
| `components/[feature]/Component.tsx` | Component | [Descrizione] |

### API (Backend)

| File                              | Metodi             | Descrizione   |
| --------------------------------- | ------------------ | ------------- |
| `app/api/[feature]/route.ts`      | GET, POST          | [Descrizione] |
| `app/api/[feature]/[id]/route.ts` | GET, PATCH, DELETE | [Descrizione] |

### Services

| File                       | Funzioni Esportate       |
| -------------------------- | ------------------------ |
| `lib/[feature]-service.ts` | `function1`, `function2` |

---

## API Reference

### GET /api/[feature]

**Descrizione:** [Cosa fa]

**Query Parameters:**
| Param | Tipo | Required | Default | Descrizione |
|-------|------|----------|---------|-------------|
| `param1` | string | Yes | - | [Desc] |
| `param2` | number | No | 10 | [Desc] |

**Response:**

```json
{
  "success": true,
  "data": [...],
  "total": 42
}
```

**Errors:**
| Status | Code | Descrizione |
|--------|------|-------------|
| 400 | `INVALID_PARAM` | [Quando accade] |
| 404 | `NOT_FOUND` | [Quando accade] |
| 500 | `INTERNAL_ERROR` | [Quando accade] |

### POST /api/[feature]

**Descrizione:** [Cosa fa]

**Request Body:**

```json
{
  "field1": "value",
  "field2": 123
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": { "id": "uuid", ... }
}
```

---

## Database

### Tabelle

| Tabella        | Migration      | Descrizione   |
| -------------- | -------------- | ------------- |
| `[table_name]` | `XXX-name.sql` | [Descrizione] |

### Schema

```sql
CREATE TABLE [table_name] (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field1 TEXT NOT NULL,
  field2 INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS Policies

| Policy   | Operation | Condizione                      |
| -------- | --------- | ------------------------------- |
| `[name]` | SELECT    | `auth.uid() = user_id`          |
| `[name]` | INSERT    | `auth.role() = 'authenticated'` |

---

## Test

### File di Test

| File                        | Coverage | Tipo      |
| --------------------------- | -------- | --------- |
| `__tests__/[name].test.ts`  | X%       | Unit      |
| `__tests__/[name].test.tsx` | X%       | Component |

### Come Eseguire

```bash
# Tutti i test della feature
pnpm test apps/backoffice/[path]

# Con coverage
pnpm test:coverage apps/backoffice/[path]

# Watch mode
pnpm test apps/backoffice/[path] --watch
```

### Pattern di Test

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('[Feature]', () => {
  it('should [behavior]', async () => {
    // Arrange
    const input = {...};

    // Act
    const result = await functionUnderTest(input);

    // Assert
    expect(result).toEqual(expected);
  });
});
```

---

## Dipendenze

### Interne

- `lib/supabase.ts` - Database client
- `lib/auth/` - Authentication
- `types/[feature].ts` - TypeScript types

### Esterne

- [Package] - [Perché]

---

## Error Handling

### Pattern

```typescript
try {
  const result = await operation();
  return NextResponse.json({ success: true, data: result });
} catch (error) {
  console.error('[Feature] Error:', error);
  return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
}
```

### Error Codes

| Code     | HTTP | Descrizione | Soluzione |
| -------- | ---- | ----------- | --------- |
| `[CODE]` | 400  | [Desc]      | [Fix]     |

---

## Performance

### Considerazioni

- [Considerazione 1]
- [Considerazione 2]

### Ottimizzazioni Applicate

- [Ottimizzazione 1]
- [Ottimizzazione 2]

---

## Security

### Checklist

- [ ] RLS policies complete
- [ ] Input validation
- [ ] Auth check su endpoints
- [ ] No secrets in code

### Note di Sicurezza

[Eventuali note specifiche]

---

## TODOs & Known Issues

- [ ] TODO: [Descrizione]
- [ ] BUG: [Descrizione]

---

## Changelog

| Data       | Versione | Modifiche              |
| ---------- | -------- | ---------------------- |
| YYYY-MM-DD | 1.0      | Initial implementation |

---

_Ultimo aggiornamento: YYYY-MM-DD_
