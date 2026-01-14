# Test Coverage Report

> Stato attuale della copertura test del progetto GUDBRO.

**Ultimo aggiornamento:** 2026-01-14
**Coverage complessivo:** ~2%

---

## Summary

| Metrica          | Valore | Target | Gap  |
| ---------------- | ------ | ------ | ---- |
| Test Files       | 8      | 50+    | -42  |
| Test Coverage    | ~2%    | 30%    | -28% |
| Features Testate | 1/15   | 15/15  | -14  |

---

## Coverage per Area

### Aree Testate

| Area            | Files | Coverage | Status   |
| --------------- | ----- | -------- | -------- |
| **QR Codes**    | 6     | ~80%     | Complete |
| **Error Utils** | 1     | ~90%     | Complete |

### Aree Non Testate (Priority Order)

| #   | Area                 | Files | Priority | Reason            |
| --- | -------------------- | ----- | -------- | ----------------- |
| 1   | Auth                 | 0     | P0       | Security critical |
| 2   | Middleware           | 0     | P0       | Route protection  |
| 3   | AI Chat Service      | 0     | P1       | Core business     |
| 4   | AI Knowledge Service | 0     | P1       | Data access       |
| 5   | Food Cost API        | 0     | P1       | Revenue critical  |
| 6   | Translations API     | 0     | P2       | Data integrity    |
| 7   | Staff Service        | 0     | P2       | Operations        |
| 8   | Events Service       | 0     | P2       | Operations        |
| 9   | Components (43)      | 0     | P3       | UI                |
| 10  | Other APIs (40+)     | 0     | P3       | Various           |

---

## Test Files Esistenti

### apps/backoffice/

```
components/qr/__tests__/
├── QRBuilderModal.test.tsx    (~295 LOC)
├── QRDesignPanel.test.tsx     (~210 LOC)
├── QRExportPanel.test.tsx     (~415 LOC)
└── QRPreview.test.tsx         (~175 LOC)

lib/qr/__tests__/
├── qr-generator.test.ts       (~315 LOC)
└── qr-types.test.ts           (~345 LOC)

app/api/qr/__tests__/
└── route-helpers.test.ts      (~473 LOC)
```

### shared/

```
utils/__tests__/
└── errors.test.ts             (~210 LOC)
```

---

## Target per Fase

### Fase 2 Target (30% su aree critiche)

| Area        | Attuale | Target | Files da Creare |
| ----------- | ------- | ------ | --------------- |
| Auth        | 0%      | 80%    | 3-4 files       |
| AI Services | 0%      | 40%    | 5-6 files       |
| API Routes  | 2%      | 30%    | 10-15 files     |
| Components  | 9%      | 20%    | 8-10 files      |

---

## Come Eseguire Test

```bash
# Tutti i test
pnpm test:run

# Con coverage
pnpm test:coverage

# Watch mode (sviluppo)
pnpm test

# UI visual
pnpm test:ui

# File specifico
pnpm test apps/backoffice/components/qr
```

---

## Pattern di Test (Riferimento)

I test QR sono ben strutturati e possono servire da template:

```typescript
// Component test example
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Result')).toBeInTheDocument();
  });
});
```

---

## Prossimi Passi

1. [ ] Creare test per `lib/auth/`
2. [ ] Creare test per `middleware.ts`
3. [ ] Creare test per `lib/ai/chat-service.ts`
4. [ ] Creare test per `api/food-cost/`
5. [ ] Aggiornare coverage report

---

## Storico

| Data       | Coverage | Note              |
| ---------- | -------- | ----------------- |
| 2026-01-14 | ~2%      | Baseline iniziale |

---

_Generato da: Audit Fase 0_
