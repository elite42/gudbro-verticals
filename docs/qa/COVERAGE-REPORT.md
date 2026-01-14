# Test Coverage Report

> Stato attuale della copertura test del progetto GUDBRO.

**Ultimo aggiornamento:** 2026-01-14
**Coverage complessivo:** ~5%

---

## Summary

| Metrica          | Valore | Target | Gap  |
| ---------------- | ------ | ------ | ---- |
| Test Files       | 10     | 50+    | -40  |
| Total Tests      | 414    | 1000+  | -586 |
| Test Coverage    | ~5%    | 30%    | -25% |
| Features Testate | 2/15   | 15/15  | -13  |

---

## Coverage per Area

### Aree Testate

| Area            | Files | Tests | Coverage | Status   |
| --------------- | ----- | ----- | -------- | -------- |
| **QR Codes**    | 7     | 260   | ~80%     | Complete |
| **Auth**        | 2     | 77    | ~80%     | Complete |
| **Error Utils** | 1     | 24    | ~90%     | Complete |

### Aree Non Testate (Priority Order)

| #   | Area                 | Files | Priority | Reason           |
| --- | -------------------- | ----- | -------- | ---------------- |
| 1   | ~~Auth~~             | ~~0~~ | ~~P0~~   | ~~Security~~     |
| 2   | Middleware           | 0     | P0       | Route protection |
| 3   | AI Chat Service      | 0     | P1       | Core business    |
| 4   | AI Knowledge Service | 0     | P1       | Data access      |
| 5   | Food Cost API        | 0     | P1       | Revenue critical |
| 6   | Translations API     | 0     | P2       | Data integrity   |
| 7   | Staff Service        | 0     | P2       | Operations       |
| 8   | Events Service       | 0     | P2       | Operations       |
| 9   | Components (43)      | 0     | P3       | UI               |
| 10  | Other APIs (40+)     | 0     | P3       | Various          |

---

## Test Files Esistenti

### apps/backoffice/

```
lib/auth/__tests__/
├── permissions.test.ts        (39 tests) - ROLE_PERMISSIONS, isRoleAtLeast
└── dev-accounts.test.ts       (38 tests) - validateDevPin, isDevModeEnabled

components/qr/__tests__/
├── QRBuilderModal.test.tsx    (55 tests)
├── QRDesignPanel.test.tsx     (16 tests)
├── QRExportPanel.test.tsx     (34 tests)
└── QRPreview.test.tsx         (13 tests)

lib/qr/__tests__/
├── qr-generator.test.ts       (84 tests)
└── qr-types.test.ts           (78 tests)

app/api/qr/__tests__/
└── route-helpers.test.ts      (33 tests)
```

### shared/

```
utils/__tests__/
└── errors.test.ts             (24 tests)
```

---

## Target per Fase

### Fase 2 Target (30% su aree critiche)

| Area        | Attuale | Target | Status             |
| ----------- | ------- | ------ | ------------------ |
| Auth        | ~80%    | 80%    | **Complete**       |
| AI Services | 0%      | 40%    | 5-6 files needed   |
| API Routes  | ~5%     | 30%    | 10-15 files needed |
| Components  | ~15%    | 20%    | 4-5 files needed   |

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

1. [x] Creare test per `lib/auth/` - **Complete (77 tests)**
2. [ ] Creare test per `middleware.ts`
3. [ ] Creare test per `lib/ai/chat-service.ts`
4. [ ] Creare test per `api/food-cost/` (validation logic)
5. [ ] Creare test per `lib/ai/knowledge-service.ts`

---

## Storico

| Data       | Coverage | Tests | Note                              |
| ---------- | -------- | ----- | --------------------------------- |
| 2026-01-14 | ~5%      | 414   | Auth tests complete, security fix |
| 2026-01-14 | ~2%      | 320   | Baseline iniziale (FASE 1 audit)  |

---

_Generato da: Audit Fase 0_
