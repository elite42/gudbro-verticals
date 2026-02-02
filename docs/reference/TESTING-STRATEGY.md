# GUDBRO Verticals Testing Strategy

> **Comprehensive Testing Roadmap for Production-Grade Quality**
>
> Target: 10M Users | Current Coverage: ~1.5%
>
> Last Updated: 2026-01-17

---

## Executive Summary

This document outlines a phased approach to achieve production-grade test coverage for the GUDBRO Verticals platform. With 1,791 source files and only 32 test files (~950 test cases), we need strategic investment in testing infrastructure to support 10M users.

### Current State

| Metric            | Value | Notes                                |
| ----------------- | ----- | ------------------------------------ |
| Source Files      | 1,791 | Excluding node_modules, .next, .d.ts |
| Test Files        | 32    | Good quality where they exist        |
| Test Cases        | ~950  | Comprehensive unit tests             |
| Coverage          | ~1.5% | File-based coverage                  |
| Integration Tests | 0     | Critical gap                         |
| E2E Tests         | 0     | Critical gap                         |
| CI/CD Enforcement | None  | No test gates on merge               |

### Target State (6 months)

| Metric                 | Target            | Priority |
| ---------------------- | ----------------- | -------- |
| Critical Path Coverage | 80%               | P0       |
| Service Layer Coverage | 60%               | P1       |
| API Route Coverage     | 40%               | P1       |
| Component Coverage     | 30%               | P2       |
| Integration Tests      | 50+ scenarios     | P0       |
| E2E Tests              | 25+ user journeys | P1       |

---

## Phase 1: Critical Path Testing (Weeks 1-2)

### Objective

Secure financial and authentication flows with comprehensive testing before any production release.

### 1.1 Priority 0: Financial Services (MUST TEST FIRST)

These services handle money and MUST have near-complete coverage before production.

#### `wallet-service.ts` - 741 LOC, 0% coverage

**Location:** `/apps/backoffice/lib/wallet-service.ts`

| Function                 | Priority | Test Type          | Risk Level |
| ------------------------ | -------- | ------------------ | ---------- |
| `getOrCreateWallet()`    | P0       | Unit + Integration | HIGH       |
| `getWalletBalance()`     | P0       | Unit               | HIGH       |
| `calculateBonus()`       | P0       | Unit               | HIGH       |
| `processCashTopUp()`     | P0       | Unit + Integration | CRITICAL   |
| `completeStripeTopUp()`  | P0       | Unit + Integration | CRITICAL   |
| `useWalletForPayment()`  | P0       | Unit + Integration | CRITICAL   |
| `refundToWallet()`       | P0       | Unit + Integration | CRITICAL   |
| `formatCurrency()`       | P0       | Unit               | MEDIUM     |
| `parseCurrencyToCents()` | P0       | Unit               | HIGH       |

**Test Cases Required:**

```
wallet-service.test.ts (~150 test cases)
- Wallet creation/retrieval (15 cases)
- Balance calculations (20 cases)
- Bonus tier calculations (25 cases)
- Cash top-up flow (30 cases)
- Stripe top-up flow (25 cases)
- Payment processing (25 cases)
- Refund processing (15 cases)
- Currency formatting edge cases (15 cases)
```

**Mocking Strategy:**

```typescript
// Mock Supabase Admin
vi.mock('@/lib/supabase-admin', () => ({
  getSupabaseAdmin: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
    rpc: vi.fn(),
  })),
}));
```

#### `loyalty-service.ts` - 677 LOC, 0% coverage

**Location:** `/apps/backoffice/lib/loyalty-service.ts`

| Function                | Priority | Test Type          | Risk Level |
| ----------------------- | -------- | ------------------ | ---------- |
| `getOrCreateProgram()`  | P0       | Unit               | HIGH       |
| `getOrCreateAccount()`  | P0       | Unit               | HIGH       |
| `awardPoints()`         | P0       | Unit + Integration | CRITICAL   |
| `redeemPoints()`        | P0       | Unit + Integration | CRITICAL   |
| `awardPurchasePoints()` | P0       | Unit               | HIGH       |
| `calculateTier()`       | P0       | Unit               | MEDIUM     |
| `getTierMultiplier()`   | P0       | Unit               | MEDIUM     |

**Test Cases Required:**

```
loyalty-service.test.ts (~120 test cases)
- Program CRUD (15 cases)
- Account management (20 cases)
- Points awarding (30 cases)
- Points redemption (25 cases)
- Tier calculations (15 cases)
- Multiplier logic (15 cases)
```

### 1.2 Priority 0: Authentication & Security

#### `supabase-admin.ts` - 80 LOC, 0% coverage

**Location:** `/apps/backoffice/lib/supabase-admin.ts`

| Function             | Priority | Test Type | Risk Level |
| -------------------- | -------- | --------- | ---------- |
| `initializeAdmin()`  | P0       | Unit      | CRITICAL   |
| `getSupabaseAdmin()` | P0       | Unit      | CRITICAL   |
| Proxy behavior       | P0       | Unit      | HIGH       |

**Test Cases Required:**

```
supabase-admin.test.ts (~25 test cases)
- Lazy initialization (5 cases)
- Error handling without env vars (5 cases)
- Proxy access patterns (10 cases)
- Service role key validation (5 cases)
```

#### `supabase-server.ts` - 165 LOC, 0% coverage

**Location:** `/apps/backoffice/lib/supabase-server.ts`

| Function                    | Priority | Test Type          | Risk Level |
| --------------------------- | -------- | ------------------ | ---------- |
| `createClient()`            | P0       | Unit               | HIGH       |
| `getSession()`              | P0       | Unit + Integration | CRITICAL   |
| `getUser()`                 | P0       | Unit               | HIGH       |
| `getDevSessionFromCookie()` | P0       | Unit               | MEDIUM     |
| `isDevModeEnabled()`        | P0       | Unit               | LOW        |

**Test Cases Required:**

```
supabase-server.test.ts (~40 test cases)
- Server client creation (10 cases)
- Session retrieval - Supabase auth (10 cases)
- Session retrieval - Dev mode (10 cases)
- User retrieval (5 cases)
- Cookie handling (5 cases)
```

#### Auth Module - `lib/auth/`

**Files:**

- `dev-accounts.ts` - Has tests, expand coverage
- `permissions.ts` - Has tests, expand coverage
- `types.ts` - Type definitions
- `index.ts` - Exports

**Expand existing tests:**

```
permissions.test.ts - Add 20 more cases for edge cases
dev-accounts.test.ts - Add 15 more cases for validation
```

### 1.3 Blocking Integration Tests

These integration tests MUST pass before any production deployment:

#### Auth Flow Integration

```typescript
// __tests__/integration/auth-flow.test.ts
describe('Authentication Flow', () => {
  describe('Supabase Auth', () => {
    it('should create session on successful login');
    it('should refresh token before expiry');
    it('should handle expired tokens');
    it('should logout and clear session');
  });

  describe('Dev Mode Auth', () => {
    it('should accept dev cookie in development');
    it('should reject dev cookie in production');
    it('should switch between dev accounts');
  });

  describe('API Route Protection', () => {
    it('should reject unauthenticated requests');
    it('should accept valid session tokens');
    it('should handle RLS policies correctly');
  });
});
```

#### Wallet Transaction Integration

```typescript
// __tests__/integration/wallet-transactions.test.ts
describe('Wallet Transactions', () => {
  describe('Top-up Flow', () => {
    it('should create wallet on first top-up');
    it('should calculate and apply bonuses correctly');
    it('should update balance atomically');
    it('should create transaction record');
    it('should handle concurrent top-ups');
  });

  describe('Payment Flow', () => {
    it('should deduct from balance correctly');
    it('should use bonus balance first when configured');
    it('should reject insufficient balance');
    it('should handle partial payments');
  });

  describe('Refund Flow', () => {
    it('should credit refund to wallet');
    it('should create refund transaction');
    it('should not exceed original payment');
  });
});
```

### 1.4 Phase 1 Deliverables

| Deliverable                             | Files | Test Cases | Effort        |
| --------------------------------------- | ----- | ---------- | ------------- |
| wallet-service.test.ts                  | 1     | 150        | 3 days        |
| loyalty-service.test.ts                 | 1     | 120        | 2 days        |
| supabase-admin.test.ts                  | 1     | 25         | 0.5 days      |
| supabase-server.test.ts                 | 1     | 40         | 1 day         |
| auth-flow.integration.test.ts           | 1     | 30         | 2 days        |
| wallet-transactions.integration.test.ts | 1     | 25         | 2 days        |
| **TOTAL**                               | **6** | **390**    | **10.5 days** |

---

## Phase 2: Coverage Growth (Weeks 3-6)

### 2.1 Service Layer Testing

#### Calendar & Scheduling Services

**Files:**

- `calendar-service.ts` - 627 LOC, 0% coverage
- `schedule-service.ts` - Has tests, expand

```
calendar-service.test.ts (~80 test cases)
- Schedule override CRUD (20 cases)
- Merged schedule calculation (25 cases)
- iCal export generation (15 cases)
- isLocationOpenNow logic (20 cases)
```

#### Reservations Module

**Location:** `/apps/backoffice/lib/reservations/`

| File                        | LOC  | Priority | Test Cases |
| --------------------------- | ---- | -------- | ---------- |
| reservations-service.ts     | ~200 | P1       | 50         |
| table-management-service.ts | ~150 | P1       | 40         |
| hours-utils.ts              | ~100 | P1       | 25         |
| timezone-utils.ts           | ~80  | P2       | 20         |

#### AI Services

**Location:** `/apps/backoffice/lib/ai/`

Existing tested services (expand coverage):

- `chat-service.ts` - Has 1000+ LOC tests, add integration
- `knowledge-service.ts` - Has tests, expand
- `onboarding-service.ts` - Has tests, expand
- `actions-service.ts` - Has tests, expand
- `translation-service.ts` - Has tests, expand
- `weather-service.ts` - Has tests, expand

New tests needed:
| File | Priority | Test Cases |
|------|----------|------------|
| proactivity-service.ts | P2 | 40 |
| financial-service.ts | P1 | 60 |
| inventory-negotiation-service.ts | P1 | 50 |
| social-media-service.ts | P2 | 35 |
| customer-intelligence-service.ts | P2 | 45 |

### 2.2 API Route Testing

#### Critical API Routes (Priority Order)

| Route                 | Priority | Test Type          |
| --------------------- | -------- | ------------------ |
| `/api/ai/chat`        | P1       | Unit + Integration |
| `/api/reservations`   | P1       | Unit + Integration |
| `/api/merchants`      | P1       | Unit               |
| `/api/organizations`  | P1       | Unit               |
| `/api/products`       | P1       | Unit               |
| `/api/settings/*`     | P2       | Unit               |
| `/api/chat/webhook/*` | P1       | Integration        |

**Test Pattern for API Routes:**

```typescript
// apps/backoffice/app/api/reservations/__tests__/route.test.ts
import { describe, it, expect, vi } from 'vitest';
import { GET, POST, PATCH, DELETE } from '../route';
import { NextRequest } from 'next/server';

describe('Reservations API', () => {
  describe('GET /api/reservations', () => {
    it('should return 401 without authentication');
    it('should return reservations for authenticated merchant');
    it('should filter by date range');
    it('should paginate results');
  });

  describe('POST /api/reservations', () => {
    it('should create reservation with valid data');
    it('should validate required fields');
    it('should check table availability');
    it('should send confirmation notification');
  });
});
```

### 2.3 Component Testing

Expand existing component tests:
| Component | Current | Target | Priority |
|-----------|---------|--------|----------|
| QR Components | 4 files | 8 files | P2 |
| Schedule Components | 1 file | 4 files | P2 |
| Food Cost Components | 1 file | 3 files | P2 |

New component tests needed:

- Settings panels
- AI Chat interface
- Reservation management
- Dashboard widgets

### 2.4 E2E Test Setup

**Recommendation: Playwright over Cypress**

| Factor          | Playwright                    | Cypress                   |
| --------------- | ----------------------------- | ------------------------- |
| Multi-browser   | Chrome, Firefox, Safari, Edge | Chrome, Firefox, Edge     |
| Mobile testing  | Built-in device emulation     | Limited                   |
| Speed           | Faster, parallel by default   | Slower                    |
| Next.js support | Official support              | Community plugins         |
| Auto-wait       | Built-in                      | Manual waits often needed |
| TypeScript      | First-class                   | Supported                 |
| Cost            | Free, open source             | Free tier limited         |

**Playwright Setup:**

```bash
pnpm add -D @playwright/test
npx playwright install
```

**Configuration:**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3023',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'pnpm dev:backoffice',
    url: 'http://localhost:3023',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Initial E2E Test Scenarios:**

```
e2e/
  auth/
    login.spec.ts (5 scenarios)
    logout.spec.ts (3 scenarios)
    session-management.spec.ts (5 scenarios)
  merchant/
    onboarding.spec.ts (8 scenarios)
    settings.spec.ts (6 scenarios)
  reservations/
    create-reservation.spec.ts (10 scenarios)
    manage-tables.spec.ts (8 scenarios)
  ai-chat/
    basic-conversation.spec.ts (6 scenarios)
    action-execution.spec.ts (8 scenarios)
```

### 2.5 Coverage Targets by Area

| Area               | Current | Week 4 | Week 6 |
| ------------------ | ------- | ------ | ------ |
| Auth/Security      | 0%      | 60%    | 80%    |
| Financial Services | 0%      | 70%    | 85%    |
| Core Services      | ~5%     | 30%    | 50%    |
| AI Services        | ~10%    | 25%    | 40%    |
| API Routes         | ~2%     | 20%    | 35%    |
| Components         | ~9%     | 15%    | 25%    |

### 2.6 Phase 2 Deliverables

| Deliverable                      | Files  | Test Cases | Effort        |
| -------------------------------- | ------ | ---------- | ------------- |
| calendar-service.test.ts         | 1      | 80         | 2 days        |
| reservations-service.test.ts     | 1      | 50         | 1.5 days      |
| table-management-service.test.ts | 1      | 40         | 1 day         |
| API route tests (6 routes)       | 6      | 120        | 4 days        |
| Component tests (8 components)   | 8      | 80         | 3 days        |
| E2E setup + 10 scenarios         | 5      | 50         | 4 days        |
| Integration tests (5 flows)      | 5      | 60         | 3 days        |
| **TOTAL**                        | **27** | **480**    | **18.5 days** |

---

## Phase 3: Production Grade (Month 2-3)

### 3.1 Load Testing Strategy

**Tool: k6 (Grafana k6)**

| Factor                | Why k6                    |
| --------------------- | ------------------------- |
| JavaScript/TypeScript | Native syntax             |
| Cloud integration     | Grafana Cloud for scaling |
| CI/CD ready           | GitHub Actions support    |
| Real-time metrics     | Built-in dashboards       |
| Cost                  | Open source core          |

**Installation:**

```bash
brew install k6  # macOS
# or
pnpm add -D @types/k6  # Types for TypeScript
```

**Load Test Scenarios:**

```javascript
// load-tests/api-endpoints.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up more
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% under 500ms
    http_req_failed: ['rate<0.01'], // <1% failure rate
  },
};

export default function () {
  // Menu API - Most frequent
  const menuRes = http.get(`${__ENV.BASE_URL}/api/menu/demo-merchant`);
  check(menuRes, {
    'menu status 200': (r) => r.status === 200,
    'menu response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);

  // AI Chat - Heavy endpoint
  const chatRes = http.post(
    `${__ENV.BASE_URL}/api/ai/chat`,
    JSON.stringify({
      merchantId: 'demo',
      accountId: 'test',
      sessionId: 'load-test',
      message: "What are today's specials?",
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(chatRes, {
    'chat status 200': (r) => r.status === 200,
    'chat response time < 3000ms': (r) => r.timings.duration < 3000,
  });

  sleep(2);
}
```

**Load Test Targets for 10M Users:**

| Scenario           | Target RPS | P95 Latency | Error Rate |
| ------------------ | ---------- | ----------- | ---------- |
| Menu Read          | 5,000      | <200ms      | <0.1%      |
| Product Search     | 2,000      | <300ms      | <0.1%      |
| Reservation Create | 500        | <500ms      | <0.01%     |
| AI Chat            | 200        | <3000ms     | <1%        |
| Wallet Top-up      | 100        | <500ms      | <0.001%    |
| Analytics Query    | 100        | <1000ms     | <0.5%      |

### 3.2 Chaos Engineering Basics

**Tool: Chaos Toolkit** (or manual fault injection)

**Experiment 1: Database Connection Failure**

```yaml
# chaos/database-failure.yaml
title: 'Database Connection Resilience'
description: 'Verify app handles DB connection failures gracefully'

steady-state-hypothesis:
  title: 'App is healthy'
  probes:
    - type: http
      name: 'health-check'
      provider:
        type: http
        url: 'http://localhost:3023/api/health'
      tolerance: 200

method:
  - type: action
    name: 'Kill Supabase connection'
    provider:
      type: process
      path: 'kill-db-connections.sh'
    pauses:
      after: 30

rollbacks:
  - type: action
    name: 'Restore connections'
    provider:
      type: process
      path: 'restore-db-connections.sh'
```

**Experiment 2: Third-party API Failure**

```typescript
// chaos/openai-failure.test.ts
describe('OpenAI Failure Resilience', () => {
  it('should fallback gracefully when OpenAI is unavailable', async () => {
    // Mock OpenAI timeout
    vi.mock('openai', () => ({
      OpenAI: vi.fn().mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockRejectedValue(new Error('timeout')),
          },
        },
      })),
    }));

    const response = await chatService.sendMessage({
      merchantId: 'test',
      message: 'Hello',
    });

    expect(response.status).toBe('degraded');
    expect(response.message).toContain('temporarily unavailable');
  });
});
```

**Experiment 3: High Memory Pressure**

```javascript
// chaos/memory-pressure.js
// Run with: node --max-old-space-size=256 chaos/memory-pressure.js

const loadTest = async () => {
  const results = [];

  // Simulate high memory usage
  const largeArray = new Array(10_000_000).fill('x');

  // Test critical endpoints under pressure
  for (let i = 0; i < 100; i++) {
    const start = Date.now();
    const res = await fetch('http://localhost:3023/api/menu/demo');
    results.push({
      duration: Date.now() - start,
      status: res.status,
      memory: process.memoryUsage().heapUsed / 1024 / 1024,
    });
  }

  console.log('Results:', results);
};
```

### 3.3 Contract Testing for APIs

**Tool: Pact** for consumer-driven contract testing

**Setup:**

```bash
pnpm add -D @pact-foundation/pact
```

**Consumer Contract (Frontend consuming Backend API):**

```typescript
// contracts/consumer/menu-api.pact.ts
import { Pact, Matchers } from '@pact-foundation/pact';

const provider = new Pact({
  consumer: 'Backoffice Frontend',
  provider: 'Backoffice API',
  port: 1234,
});

describe('Menu API Contract', () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  describe('GET /api/menu/:merchantSlug', () => {
    beforeEach(() => {
      return provider.addInteraction({
        state: 'merchant exists with menu',
        uponReceiving: 'a request for menu',
        withRequest: {
          method: 'GET',
          path: '/api/menu/demo-cafe',
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: Matchers.like({
            merchant: Matchers.like({
              id: Matchers.uuid(),
              name: Matchers.string('Demo Cafe'),
              slug: 'demo-cafe',
            }),
            sections: Matchers.eachLike({
              id: Matchers.uuid(),
              name: Matchers.string('Beverages'),
              products: Matchers.eachLike({
                id: Matchers.uuid(),
                name: Matchers.string('Espresso'),
                price: Matchers.decimal(2.5),
              }),
            }),
          }),
        },
      });
    });

    it('returns menu data', async () => {
      const response = await fetch('http://localhost:1234/api/menu/demo-cafe');
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.merchant.slug).toBe('demo-cafe');
    });
  });
});
```

**Provider Verification:**

```typescript
// contracts/provider/verify.ts
import { Verifier } from '@pact-foundation/pact';

describe('Provider Verification', () => {
  it('validates the expectations of Menu API Consumer', async () => {
    const verifier = new Verifier({
      providerBaseUrl: 'http://localhost:3023',
      pactUrls: ['./contracts/pacts/backoffice_frontend-backoffice_api.json'],
      stateHandlers: {
        'merchant exists with menu': async () => {
          // Set up test data
          await seedTestMerchant();
        },
      },
    });

    await verifier.verifyProvider();
  });
});
```

### 3.4 Phase 3 Deliverables

| Deliverable              | Description        | Effort      |
| ------------------------ | ------------------ | ----------- |
| k6 load tests            | 10 scenarios       | 5 days      |
| Load test CI integration | GitHub Actions     | 1 day       |
| Chaos experiments        | 5 experiments      | 3 days      |
| Pact contracts           | 8 API contracts    | 4 days      |
| Contract verification    | Provider tests     | 2 days      |
| Performance monitoring   | Grafana dashboards | 2 days      |
| **TOTAL**                |                    | **17 days** |

---

## Phase 4: Scale Testing (Month 4+)

### 4.1 Performance Regression Tests

**Strategy: Baseline + Threshold Enforcement**

```typescript
// perf/baseline.ts
export const PERFORMANCE_BASELINES = {
  'GET /api/menu/:slug': {
    p50: 50, // ms
    p95: 150, // ms
    p99: 300, // ms
  },
  'POST /api/ai/chat': {
    p50: 1000, // ms
    p95: 2500, // ms
    p99: 4000, // ms
  },
  'POST /api/reservations': {
    p50: 100, // ms
    p95: 250, // ms
    p99: 500, // ms
  },
  'GET /api/analytics/summary': {
    p50: 200, // ms
    p95: 500, // ms
    p99: 1000, // ms
  },
};

// perf/regression.test.ts
import { PERFORMANCE_BASELINES } from './baseline';

describe('Performance Regression Tests', () => {
  for (const [endpoint, thresholds] of Object.entries(PERFORMANCE_BASELINES)) {
    describe(endpoint, () => {
      it(`should meet p95 threshold of ${thresholds.p95}ms`, async () => {
        const results = await runLoadTest(endpoint, { iterations: 100 });
        expect(results.p95).toBeLessThanOrEqual(thresholds.p95 * 1.1); // 10% buffer
      });
    });
  }
});
```

**CI Integration:**

```yaml
# .github/workflows/perf-regression.yml
name: Performance Regression

on:
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * *' # Daily at 6 AM

jobs:
  perf-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup k6
        run: |
          curl -L https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz | tar xvz
          sudo mv k6-v0.47.0-linux-amd64/k6 /usr/local/bin/

      - name: Run Performance Tests
        run: k6 run perf/regression.js --out json=results.json

      - name: Check Thresholds
        run: node perf/check-thresholds.js results.json

      - name: Upload Results
        uses: actions/upload-artifact@v4
        with:
          name: perf-results
          path: results.json
```

### 4.2 Multi-tenant Isolation Tests

```typescript
// tests/multi-tenant/isolation.test.ts
describe('Multi-tenant Isolation', () => {
  describe('Data Isolation', () => {
    it('should not leak merchant A data to merchant B', async () => {
      // Create data for Merchant A
      const merchantA = await createMerchant('A');
      const productA = await createProduct(merchantA.id, 'Secret Recipe');

      // Query as Merchant B
      const merchantB = await createMerchant('B');
      const products = await getProducts(merchantB.id);

      expect(products).not.toContainEqual(
        expect.objectContaining({ id: productA.id })
      );
    });

    it('should enforce RLS on all tables', async () => {
      const tables = [
        'products',
        'orders',
        'reservations',
        'customer_wallets',
        'loyalty_programs',
        'events',
        'ai_chat_sessions',
      ];

      for (const table of tables) {
        await expect(queryAsWrongMerchant(table)).rejects.toThrow(
          /permission denied|no rows/
        );
      }
    });

    it('should isolate AI chat contexts', async () => {
      const merchantA = await createMerchant('A');
      const merchantB = await createMerchant('B');

      // Chat with Merchant A context
      await chatService.sendMessage({
        merchantId: merchantA.id,
        message: 'What is my secret recipe?',
      });

      // Chat with Merchant B should not have A's context
      const response = await chatService.sendMessage({
        merchantId: merchantB.id,
        message: 'Tell me about secret recipe',
      });

      expect(response.message).not.toContain('Merchant A');
    });
  });

  describe('Resource Isolation', () => {
    it('should enforce rate limits per tenant', async () => {
      const merchantA = await createMerchant('A');

      // Make many requests
      const promises = Array(100)
        .fill(null)
        .map(() => callApi(merchantA.id, '/api/ai/chat'));

      const results = await Promise.allSettled(promises);
      const rateLimited = results.filter(
        (r) => r.status === 'rejected' && r.reason.status === 429
      );

      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });
});
```

### 4.3 Data Consistency Tests

```typescript
// tests/consistency/data-integrity.test.ts
describe('Data Consistency', () => {
  describe('Wallet Balance Consistency', () => {
    it('should maintain balance consistency under concurrent operations', async () => {
      const wallet = await createWallet({ balance: 10000 }); // 100.00

      // Concurrent operations
      const operations = [
        topUp(wallet.id, 5000), // +50.00
        topUp(wallet.id, 3000), // +30.00
        useBalance(wallet.id, 2000), // -20.00
        topUp(wallet.id, 1000), // +10.00
        useBalance(wallet.id, 5000), // -50.00
      ];

      await Promise.all(operations);

      const finalWallet = await getWallet(wallet.id);
      const transactions = await getTransactions(wallet.id);

      // Balance should be sum of all transactions
      const expectedBalance = transactions.reduce(
        (sum, t) => sum + t.amount_cents,
        10000
      );

      expect(finalWallet.balance_cents).toBe(expectedBalance);
    });

    it('should handle race conditions in bonus calculations', async () => {
      const wallet = await createWallet();

      // Two top-ups at exact same time
      const [result1, result2] = await Promise.all([
        topUp(wallet.id, 10000), // Should get 10% bonus
        topUp(wallet.id, 10000), // Should get 10% bonus
      ]);

      const finalWallet = await getWallet(wallet.id);

      // Both should have gotten bonuses
      expect(finalWallet.balance_cents).toBe(20000);
      expect(finalWallet.bonus_balance_cents).toBe(2000);
    });
  });

  describe('Reservation Conflict Detection', () => {
    it('should prevent double-booking same table', async () => {
      const table = await createTable({ capacity: 4 });
      const time = '2026-01-20T19:00:00';

      // Concurrent reservations for same table/time
      const results = await Promise.allSettled([
        createReservation({ tableId: table.id, time, partySize: 4 }),
        createReservation({ tableId: table.id, time, partySize: 4 }),
      ]);

      const succeeded = results.filter((r) => r.status === 'fulfilled');
      const failed = results.filter((r) => r.status === 'rejected');

      expect(succeeded).toHaveLength(1);
      expect(failed).toHaveLength(1);
    });
  });

  describe('Points/Loyalty Consistency', () => {
    it('should not allow negative point balance', async () => {
      const account = await createLoyaltyAccount({ points: 100 });

      await expect(redeemPoints(account.id, 200)).rejects.toThrow(
        /insufficient points/i
      );

      const finalAccount = await getLoyaltyAccount(account.id);
      expect(finalAccount.points_balance).toBe(100);
    });
  });
});
```

### 4.4 Phase 4 Deliverables

| Deliverable           | Description             | Effort      |
| --------------------- | ----------------------- | ----------- |
| Performance baselines | All endpoints           | 3 days      |
| Regression test suite | 20 scenarios            | 4 days      |
| Multi-tenant tests    | Isolation verification  | 5 days      |
| Consistency tests     | Concurrent operations   | 5 days      |
| Monitoring alerts     | Performance degradation | 2 days      |
| **TOTAL**             |                         | **19 days** |

---

## Mocking Strategies

### Supabase Mocking

```typescript
// __mocks__/supabase.ts
import { vi } from 'vitest';

export const createMockSupabaseClient = () => ({
  from: vi.fn((table: string) => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
    single: vi.fn(),
    maybeSingle: vi.fn(),
  })),
  rpc: vi.fn(),
  auth: {
    getSession: vi.fn(),
    getUser: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
  },
});

// Usage in tests
vi.mock('@/lib/supabase', () => ({
  supabase: createMockSupabaseClient(),
}));

vi.mock('@/lib/supabase-admin', () => ({
  getSupabaseAdmin: () => createMockSupabaseClient(),
  supabaseAdmin: createMockSupabaseClient(),
}));
```

### OpenAI Mocking

```typescript
// __mocks__/openai.ts
import { vi } from 'vitest';

export const createMockOpenAI = (responses?: Record<string, string>) => ({
  chat: {
    completions: {
      create: vi.fn().mockImplementation(async ({ messages }) => {
        const lastMessage = messages[messages.length - 1].content;
        return {
          id: 'mock-completion-id',
          choices: [
            {
              message: {
                role: 'assistant',
                content: responses?.[lastMessage] || 'Mock AI response',
              },
              finish_reason: 'stop',
            },
          ],
          usage: {
            prompt_tokens: 100,
            completion_tokens: 50,
            total_tokens: 150,
          },
        };
      }),
    },
  },
});

// Usage
vi.mock('@/lib/ai/openai', () => ({
  getOpenAIClient: () =>
    createMockOpenAI({
      'What are the specials?': 'Today we have pasta carbonara on special!',
    }),
  DEFAULT_MODEL: 'gpt-4o-mini',
  calculateCost: vi.fn(() => 0.001),
}));
```

### External API Mocking (MSW)

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Visual Crossing Weather API
  http.get(
    'https://weather.visualcrossing.com/VisualCrossingWebServices/*',
    () => {
      return HttpResponse.json({
        days: [
          {
            datetime: '2026-01-17',
            temp: 25,
            conditions: 'Clear',
            icon: 'clear-day',
          },
        ],
      });
    }
  ),

  // Stripe
  http.post('https://api.stripe.com/v1/payment_intents', () => {
    return HttpResponse.json({
      id: 'pi_mock_123',
      status: 'succeeded',
      amount: 5000,
    });
  }),

  // Google Places
  http.get('https://maps.googleapis.com/maps/api/place/*', () => {
    return HttpResponse.json({
      status: 'OK',
      results: [
        {
          place_id: 'mock_place_id',
          name: 'Mock Restaurant',
          formatted_address: '123 Mock Street',
        },
      ],
    });
  }),
];

// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// vitest.setup.ts
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## CI/CD Pipeline Recommendations

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: test-${{ github.ref }}
  cancel-in-progress: true

env:
  NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.TEST_SUPABASE_ANON_KEY }}
  SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.TEST_SUPABASE_SERVICE_ROLE_KEY }}

jobs:
  # Stage 1: Fast checks
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  # Stage 2: Unit tests
  unit-tests:
    runs-on: ubuntu-latest
    needs: lint-typecheck
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:run --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: coverage/coverage-final.json
          fail_ci_if_error: true
      - name: Check coverage thresholds
        run: |
          node -e "
            const coverage = require('./coverage/coverage-summary.json');
            const total = coverage.total;

            const thresholds = {
              statements: 40,
              branches: 35,
              functions: 40,
              lines: 40,
            };

            let failed = false;
            for (const [key, min] of Object.entries(thresholds)) {
              if (total[key].pct < min) {
                console.error(\`Coverage for \${key} (\${total[key].pct}%) is below threshold (\${min}%)\`);
                failed = true;
              }
            }

            if (failed) process.exit(1);
          "

  # Stage 3: Integration tests
  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    services:
      postgres:
        image: supabase/postgres:15.1.0.55
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - name: Setup test database
        run: |
          psql postgresql://postgres:postgres@localhost:5432/postgres -f ./scripts/setup-test-db.sql
      - run: pnpm test:integration

  # Stage 4: E2E tests (on PRs to main only)
  e2e-tests:
    runs-on: ubuntu-latest
    needs: integration-tests
    if: github.base_ref == 'main'
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: npx playwright install --with-deps
      - run: pnpm build:backoffice
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

  # Stage 5: Performance tests (nightly)
  perf-tests:
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule'
    steps:
      - uses: actions/checkout@v4
      - name: Setup k6
        run: |
          curl -L https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz | tar xvz
          sudo mv k6-v0.47.0-linux-amd64/k6 /usr/local/bin/
      - run: k6 run load-tests/smoke.js
      - run: k6 run load-tests/stress.js
      - uses: actions/upload-artifact@v4
        with:
          name: k6-results
          path: results/
```

### Coverage Thresholds (vitest.config.ts)

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'shared/database/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/__mocks__/**',
        '**/e2e/**',
      ],
      // Phase 1 thresholds (increase over time)
      thresholds: {
        global: {
          statements: 40,
          branches: 35,
          functions: 40,
          lines: 40,
        },
        // Per-directory thresholds
        'apps/backoffice/lib/wallet-service.ts': {
          statements: 80,
          branches: 75,
          functions: 80,
          lines: 80,
        },
        'apps/backoffice/lib/loyalty-service.ts': {
          statements: 80,
          branches: 75,
          functions: 80,
          lines: 80,
        },
        'apps/backoffice/lib/supabase-*.ts': {
          statements: 70,
          branches: 65,
          functions: 70,
          lines: 70,
        },
      },
    },
  },
});
```

---

## Effort Summary

### Phase 1: Critical Path (Weeks 1-2)

| Item               | Test Cases | Days     |
| ------------------ | ---------- | -------- |
| Financial Services | 270        | 5.5      |
| Auth & Security    | 65         | 1.5      |
| Integration Tests  | 55         | 4        |
| **Total**          | **390**    | **10.5** |

### Phase 2: Coverage Growth (Weeks 3-6)

| Item          | Test Cases | Days     |
| ------------- | ---------- | -------- |
| Service Layer | 215        | 6.5      |
| API Routes    | 120        | 4        |
| Components    | 80         | 3        |
| E2E Setup     | 50         | 4        |
| **Total**     | **480**    | **18.5** |

### Phase 3: Production Grade (Month 2-3)

| Item              | Days   |
| ----------------- | ------ |
| Load Testing      | 6      |
| Chaos Engineering | 3      |
| Contract Testing  | 6      |
| Monitoring        | 2      |
| **Total**         | **17** |

### Phase 4: Scale Testing (Month 4+)

| Item                   | Days   |
| ---------------------- | ------ |
| Performance Regression | 7      |
| Multi-tenant Tests     | 5      |
| Consistency Tests      | 5      |
| Monitoring             | 2      |
| **Total**              | **19** |

### Grand Total

| Phase     | Weeks         | Developer Days |
| --------- | ------------- | -------------- |
| Phase 1   | 2             | 10.5           |
| Phase 2   | 4             | 18.5           |
| Phase 3   | 4             | 17             |
| Phase 4   | 4+            | 19             |
| **Total** | **~14 weeks** | **~65 days**   |

---

## Appendix A: Priority File List

### P0 - Must Test First (Week 1-2)

```
apps/backoffice/lib/wallet-service.ts
apps/backoffice/lib/loyalty-service.ts
apps/backoffice/lib/supabase-admin.ts
apps/backoffice/lib/supabase-server.ts
apps/backoffice/lib/supabase-browser.ts
apps/backoffice/lib/auth/permissions.ts
apps/backoffice/lib/auth/dev-accounts.ts
```

### P1 - High Priority (Week 3-4)

```
apps/backoffice/lib/calendar-service.ts
apps/backoffice/lib/reservations/reservations-service.ts
apps/backoffice/lib/reservations/table-management-service.ts
apps/backoffice/lib/ai/financial-service.ts
apps/backoffice/lib/ai/inventory-negotiation-service.ts
apps/backoffice/app/api/ai/chat/route.ts
apps/backoffice/app/api/reservations/route.ts
apps/backoffice/app/api/merchants/route.ts
apps/backoffice/app/api/chat/webhook/*/route.ts
```

### P2 - Medium Priority (Week 5-6)

```
apps/backoffice/lib/schedule-service.ts
apps/backoffice/lib/events-service.ts
apps/backoffice/lib/staff-service.ts
apps/backoffice/lib/analytics-service.ts
apps/backoffice/lib/ai/proactivity-service.ts
apps/backoffice/lib/ai/social-media-service.ts
apps/backoffice/lib/ai/customer-intelligence-service.ts
apps/backoffice/lib/notifications/notification-dispatcher.ts
apps/backoffice/app/api/settings/*/route.ts
```

### P3 - Lower Priority (Month 2+)

```
apps/backoffice/lib/partner-service.ts
apps/backoffice/lib/domain-resolution-service.ts
apps/backoffice/lib/geocoding-service.ts
apps/backoffice/lib/google-places.ts
apps/backoffice/lib/vercel-api.ts
apps/backoffice/lib/qr/qr-service.ts
```

---

## Appendix B: Test File Naming Convention

```
__tests__/
  unit/
    wallet-service.test.ts        # Unit tests
    loyalty-service.test.ts
  integration/
    auth-flow.integration.test.ts # Integration tests
    wallet-transactions.integration.test.ts
  e2e/
    auth.spec.ts                  # E2E tests (Playwright)
    reservations.spec.ts

# Pattern:
# - Unit tests: [name].test.ts
# - Integration tests: [name].integration.test.ts
# - E2E tests: [name].spec.ts
```

---

**Document Version:** 1.0
**Created:** 2026-01-17
**Author:** QA Architecture Team
