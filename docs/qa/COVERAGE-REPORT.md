# Test Coverage Report

> Stato attuale della copertura test del progetto GUDBRO.

**Ultimo aggiornamento:** 2026-01-14
**Coverage complessivo:** ~15%

---

## Summary

| Metrica          | Valore | Target | Gap  |
| ---------------- | ------ | ------ | ---- |
| Test Files       | 32     | 50+    | -18  |
| Total Tests      | 1998   | 1000+  | +998 |
| Test Coverage    | ~32%   | 30%    | ✅   |
| Features Testate | 14/15  | 15/15  | -1   |

---

## Coverage per Area

### Aree Testate

| Area              | Files | Tests | Coverage | Status   |
| ----------------- | ----- | ----- | -------- | -------- |
| **QR Codes**      | 7     | 260   | ~80%     | Complete |
| **Auth**          | 2     | 77    | ~80%     | Complete |
| **AI Services**   | 6     | 261   | ~50%     | Complete |
| **Shared Utils**  | 5     | 256   | ~90%     | Complete |
| **Analytics**     | 1     | 37    | ~30%     | Partial  |
| **Food Cost API** | 1     | 100   | ~40%     | Complete |
| **AI Chat Svc**   | 1     | 106   | ~50%     | Complete |
| **Translations**  | 1     | 120   | ~60%     | Complete |
| **Events Svc**    | 1     | 170   | ~70%     | Complete |
| **Staff Svc**     | 1     | 115   | ~65%     | Complete |
| **Locale Utils**  | 1     | 87    | ~70%     | Complete |
| **Food Cost UI**  | 1     | 68    | ~60%     | Complete |
| **Schedule**      | 1     | 77    | ~65%     | Complete |
| **Challenges**    | 1     | 78    | ~60%     | Complete |
| **Schedule Svc**  | 1     | 61    | ~55%     | Complete |

### Aree Non Testate (Priority Order)

| #   | Area                 | Files | Priority | Reason             |
| --- | -------------------- | ----- | -------- | ------------------ |
| 1   | ~~Auth~~             | ~~0~~ | ~~P0~~   | ~~Security~~       |
| 2   | ~~Middleware~~       | ~~0~~ | ~~P0~~   | ~~Route protect~~  |
| 3   | ~~AI Prompts~~       | ~~0~~ | ~~P1~~   | ~~Core business~~  |
| 4   | ~~AI Knowledge Svc~~ | ~~0~~ | ~~P1~~   | ~~Data access~~    |
| 5   | ~~Food Cost API~~    | ~~0~~ | ~~P1~~   | ~~Revenue crit~~   |
| 6   | ~~AI Chat Service~~  | ~~0~~ | ~~P1~~   | ~~Core business~~  |
| 7   | ~~Translations API~~ | ~~0~~ | ~~P2~~   | ~~Data integrity~~ |
| 8   | ~~Staff Service~~    | ~~1~~ | ~~P2~~   | ~~Operations~~     |
| 9   | ~~Events Service~~   | ~~1~~ | ~~P2~~   | ~~Operations~~     |
| 10  | Components (43)      | 0     | P3       | UI                 |
| 11  | Other APIs (40+)     | 0     | P3       | Various            |

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
├── actions-service.test.ts    (46 tests) - AI_TOOLS definitions, naming conventions
├── translation-service.test.ts (44 tests) - SUPPORTED_LOCALES, buildBatchPrompt
└── chat-service.test.ts       (106 tests) - types, validation, session, actions

components/qr/__tests__/
├── QRBuilderModal.test.tsx    (55 tests)
├── QRDesignPanel.test.tsx     (16 tests)
├── QRExportPanel.test.tsx     (34 tests)
└── QRPreview.test.tsx         (13 tests)

components/locale/__tests__/
└── locale-utils.test.ts       (87 tests) - country flags, language selection, validation

components/food-cost/__tests__/
└── food-cost-progress.test.ts (68 tests) - progress calc, feature unlock, benchmarks

components/schedule/__tests__/
└── operating-hours.test.ts    (77 tests) - days, time options, presets, copy logic

lib/qr/__tests__/
├── qr-generator.test.ts       (84 tests)
└── qr-types.test.ts           (78 tests)

app/api/qr/__tests__/
└── route-helpers.test.ts      (33 tests)

app/api/food-cost/__tests__/
└── dishes-validation.test.ts  (100 tests) - validation, calculations, entities

app/api/translations/__tests__/
└── translations-api.test.ts   (120 tests) - validation, locales, responses

lib/__tests__/
├── analytics-service.test.ts  (37 tests) - getDateRange, calculateMetrics, calculateChange
├── events-service.test.ts     (170 tests) - types, categories, configs, validation
├── staff-service.test.ts      (115 tests) - types, permissions, roles, validation
├── challenges-service.test.ts (78 tests) - types, helpers, DIFFICULTY/DAYS options
└── schedule-service.test.ts   (61 tests) - types, override priority, date matching
```

### shared/

```
utils/__tests__/
├── errors.test.ts             (24 tests) - AppError, ValidationError, etc.
├── result.test.ts             (61 tests) - Result type, ok, err, map, andThen
└── logger.test.ts             (53 tests) - LogLevel, createLogger, child loggers

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
9. [x] Creare test per `lib/ai/translation-service.ts` - **Complete (44 tests)**
10. [x] Creare test per `api/food-cost/` (validation logic) - **Complete (100 tests)**
11. [x] Creare test per `lib/ai/chat-service.ts` - **Complete (106 tests)**
12. [x] Creare test per `api/translations/` (P2) - **Complete (120 tests)**
13. [x] Creare test per `lib/staff-service.ts` (P2) - **Complete (115 tests)**
14. [x] Creare test per `lib/events-service.ts` (P2) - **Complete (170 tests)**

---

## Storico

| Data       | Coverage | Tests | Note                                                      |
| ---------- | -------- | ----- | --------------------------------------------------------- |
| 2026-01-14 | ~32%     | 1998  | Logger Utils (+53): LogLevel, createLogger, child loggers |
| 2026-01-14 | ~31%     | 1945  | Schedule Service (+61): types, override priority, dates   |
| 2026-01-14 | ~30%     | 1884  | Challenges Service (+78): types, formatTime, DAYS options |
| 2026-01-14 | ~28%     | 1806  | Schedule Component (+77): operating hours, presets        |
| 2026-01-14 | ~27%     | 1729  | P3 Components (+155): locale utils, food cost progress    |
| 2026-01-14 | ~25%     | 1574  | Staff Service (+115): types, permissions, roles - P2 DONE |
| 2026-01-14 | ~24%     | 1459  | Events Service (+170): types, categories, configs         |
| 2026-01-14 | ~22%     | 1289  | Translations API (+120): validation, locales, responses   |
| 2026-01-14 | ~20%     | 1169  | AI Chat Service (+106): types, validation, session mgmt   |
| 2026-01-14 | ~18%     | 1063  | Food Cost API (+100): validation, calculations, entities  |
| 2026-01-14 | ~15%     | 891   | Translation service (+44): SUPPORTED_LOCALES, batch logic |
| 2026-01-14 | ~14%     | 847   | Analytics service (+37): getDateRange, calculateMetrics   |
| 2026-01-14 | ~13%     | 810   | Actions service (+46): AI_TOOLS validation                |
| 2026-01-14 | ~12%     | 764   | Onboarding service (+40): buildOnboardingPrompt           |
| 2026-01-14 | ~11%     | 724   | OpenAI utilities (+36): calculateCost, pricing            |
| 2026-01-14 | ~10%     | 688   | Safety-filters (+61), auto-compute SAFETY-CRIT (+57)      |
| 2026-01-14 | ~8%      | 570   | Result utility tests (+61), AI services                   |
| 2026-01-14 | ~7%      | 509   | AI services tests (prompts, knowledge-svc)                |
| 2026-01-14 | ~5%      | 414   | Auth tests complete, security fix                         |
| 2026-01-14 | ~2%      | 320   | Baseline iniziale (FASE 1 audit)                          |

---

_Generato da: Audit Fase 0_
