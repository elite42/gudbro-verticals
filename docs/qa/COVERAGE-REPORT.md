# Test Coverage Report

> Stato attuale della copertura test del progetto GUDBRO.

**Ultimo aggiornamento:** 2026-01-14
**Coverage complessivo:** ~14%

---

## Summary

| Metrica          | Valore | Target | Gap  |
| ---------------- | ------ | ------ | ---- |
| Test Files       | 19     | 50+    | -31  |
| Total Tests      | 847    | 1000+  | -153 |
| Test Coverage    | ~14%   | 30%    | -16% |
| Features Testate | 5/15   | 15/15  | -10  |

---

## Coverage per Area

### Aree Testate

| Area             | Files | Tests | Coverage | Status   |
| ---------------- | ----- | ----- | -------- | -------- |
| **QR Codes**     | 7     | 260   | ~80%     | Complete |
| **Auth**         | 2     | 77    | ~80%     | Complete |
| **AI Services**  | 5     | 217   | ~45%     | Complete |
| **Shared Utils** | 4     | 203   | ~90%     | Complete |
| **Analytics**    | 1     | 37    | ~30%     | Partial  |

### Aree Non Testate (Priority Order)

| #   | Area                 | Files | Priority | Reason            |
| --- | -------------------- | ----- | -------- | ----------------- |
| 1   | ~~Auth~~             | ~~0~~ | ~~P0~~   | ~~Security~~      |
| 2   | ~~Middleware~~       | ~~0~~ | ~~P0~~   | ~~Route protect~~ |
| 3   | ~~AI Prompts~~       | ~~0~~ | ~~P1~~   | ~~Core business~~ |
| 4   | ~~AI Knowledge Svc~~ | ~~0~~ | ~~P1~~   | ~~Data access~~   |
| 5   | Food Cost API        | 0     | P1       | Revenue critical  |
| 6   | AI Chat Service      | 0     | P1       | Core business     |
| 7   | Translations API     | 0     | P2       | Data integrity    |
| 8   | Staff Service        | 0     | P2       | Operations        |
| 9   | Events Service       | 0     | P2       | Operations        |
| 10  | Components (43)      | 0     | P3       | UI                |
| 11  | Other APIs (40+)     | 0     | P3       | Various           |

---

## Test Files Esistenti

### apps/backoffice/

```
lib/auth/__tests__/
├── permissions.test.ts        (39 tests) - ROLE_PERMISSIONS, isRoleAtLeast
└── dev-accounts.test.ts       (38 tests) - validateDevPin, isDevModeEnabled

lib/ai/__tests__/
├── prompts.test.ts            (55 tests) - buildSystemPrompt, QUICK_ACTIONS
├── knowledge-service.test.ts  (40 tests) - formatKnowledgeForAI
├── openai.test.ts             (36 tests) - calculateCost, MODEL_PRICING, MODEL_LIMITS
├── onboarding-service.test.ts (40 tests) - buildOnboardingPrompt, ONBOARDING_TOOLS
└── actions-service.test.ts    (46 tests) - AI_TOOLS definitions, naming conventions

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

lib/__tests__/
└── analytics-service.test.ts  (37 tests) - getDateRange, calculateMetrics, calculateChange
```

### shared/

```
utils/__tests__/
├── errors.test.ts             (24 tests) - AppError, ValidationError, etc.
└── result.test.ts             (61 tests) - Result type, ok, err, map, andThen

lib/shared/__tests__/
└── safety-filters.test.ts     (61 tests) - Allergens, intolerances, diets

lib/shared/utils/__tests__/
└── auto-compute.test.ts       (57 tests) - SAFETY-CRITICAL allergen computation
```

---

## Target per Fase

### Fase 2 Target (30% su aree critiche)

| Area        | Attuale | Target | Status             |
| ----------- | ------- | ------ | ------------------ |
| Auth        | ~80%    | 80%    | **Complete**       |
| AI Services | ~30%    | 40%    | In Progress (+95)  |
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
2. [x] Creare test per `lib/ai/prompts.ts` - **Complete (55 tests)**
3. [x] Creare test per `lib/ai/knowledge-service.ts` - **Complete (40 tests)**
4. [x] Creare test per `lib/shared/safety-filters.ts` - **Complete (61 tests)**
5. [x] Creare test per `lib/shared/utils/auto-compute.ts` - **Complete (57 tests) SAFETY-CRITICAL**
6. [x] Creare test per `lib/ai/openai.ts` - **Complete (36 tests)**
7. [x] Creare test per `lib/ai/onboarding-service.ts` - **Complete (40 tests)**
8. [x] Creare test per `lib/analytics-service.ts` - **Complete (37 tests)**
9. [ ] Creare test per `api/food-cost/` (validation logic)
10. [ ] Creare test per `lib/ai/chat-service.ts`

---

## Storico

| Data       | Coverage | Tests | Note                                                    |
| ---------- | -------- | ----- | ------------------------------------------------------- |
| 2026-01-14 | ~14%     | 847   | Analytics service (+37): getDateRange, calculateMetrics |
| 2026-01-14 | ~13%     | 810   | Actions service (+46): AI_TOOLS validation              |
| 2026-01-14 | ~12%     | 764   | Onboarding service (+40): buildOnboardingPrompt         |
| 2026-01-14 | ~11%     | 724   | OpenAI utilities (+36): calculateCost, pricing          |
| 2026-01-14 | ~10%     | 688   | Safety-filters (+61), auto-compute SAFETY-CRIT (+57)    |
| 2026-01-14 | ~8%      | 570   | Result utility tests (+61), AI services                 |
| 2026-01-14 | ~7%      | 509   | AI services tests (prompts, knowledge-svc)              |
| 2026-01-14 | ~5%      | 414   | Auth tests complete, security fix                       |
| 2026-01-14 | ~2%      | 320   | Baseline iniziale (FASE 1 audit)                        |

---

_Generato da: Audit Fase 0_
