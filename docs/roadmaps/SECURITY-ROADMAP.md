# Security Hardening Roadmap

> **Target:** 10M users
> **Platform:** Next.js 14 + Supabase + Vercel
> **Document Version:** 1.0
> **Last Updated:** 2026-01-17

---

## Executive Summary

This roadmap addresses 10 critical security issues identified in the audit and provides a phased approach to enterprise-grade security. The plan prioritizes immediate threats while building toward SOC2 compliance.

### Current Security Posture: HIGH RISK

| Issue                                  | Severity | Phase |
| -------------------------------------- | -------- | ----- |
| Webhook signature verification missing | CRITICAL | 1     |
| No input validation library            | HIGH     | 1     |
| Error messages leak database schema    | HIGH     | 1     |
| No rate limiting                       | HIGH     | 2     |
| No security headers                    | MEDIUM   | 2     |
| 629+ console.log statements            | MEDIUM   | 2     |
| No error boundaries                    | MEDIUM   | 2     |
| Dev session cookies not HTTPOnly       | HIGH     | 1     |
| CORS wildcard on endpoints             | HIGH     | 1     |
| Logo URLs not validated (XSS risk)     | MEDIUM   | 2     |

---

## Phase 1: Critical Fixes (Week 1-2)

> **Goal:** Block active attack vectors before any production traffic

### 1.1 Webhook Signature Verification

#### Problem

The Telegram and WhatsApp webhook endpoints accept POST requests without verifying the request origin.

**Affected Files:**

- `/apps/backoffice/app/api/chat/webhook/telegram/route.ts`
- `/apps/backoffice/app/api/chat/webhook/whatsapp/route.ts`

#### Telegram Webhook Fix

```typescript
// apps/backoffice/app/api/chat/webhook/telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

/**
 * Verify Telegram webhook by checking the secret_token header
 * @see https://core.telegram.org/bots/api#setwebhook
 */
function verifyTelegramWebhook(request: NextRequest): boolean {
  const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
  const expectedToken = crypto
    .createHash('sha256')
    .update(TELEGRAM_BOT_TOKEN)
    .digest('hex')
    .slice(0, 32);

  return secretToken === expectedToken;
}

export async function POST(request: NextRequest) {
  // SECURITY: Verify webhook origin
  if (!verifyTelegramWebhook(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ... existing handler code
}
```

#### WhatsApp Webhook Fix

```typescript
// apps/backoffice/app/api/chat/webhook/whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const WHATSAPP_APP_SECRET = process.env.WHATSAPP_APP_SECRET!;

/**
 * Verify WhatsApp/Meta webhook signature
 * @see https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
 */
function verifyWhatsAppSignature(request: NextRequest, body: string): boolean {
  const signature = request.headers.get('X-Hub-Signature-256');
  if (!signature) return false;

  const expectedSignature =
    'sha256=' +
    crypto.createHmac('sha256', WHATSAPP_APP_SECRET).update(body).digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();

  // SECURITY: Verify webhook signature
  if (!verifyWhatsAppSignature(request, body)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(body);
  // ... existing handler code
}
```

**Required Environment Variables:**

```bash
# .env.local and Vercel
TELEGRAM_BOT_TOKEN=your_bot_token
WHATSAPP_APP_SECRET=your_app_secret
```

---

### 1.2 Input Validation Strategy

#### Problem

No consistent input validation. The `website` app has Zod, but `backoffice` and `coffeeshop` do not.

**Current State:**

- `apps/website/package.json` - Has `zod: ^3.23.0`
- `apps/backoffice/package.json` - No validation library
- `apps/coffeeshop/frontend/package.json` - No validation library

#### Solution: Unified Zod Implementation

```bash
# Install Zod across all apps
cd apps/backoffice && pnpm add zod
cd apps/coffeeshop/frontend && pnpm add zod
```

**Create shared validation schemas:**

```typescript
// shared/validation/schemas/index.ts
import { z } from 'zod';

// ============================================================================
// Common Schemas
// ============================================================================

export const uuidSchema = z.string().uuid();

export const emailSchema = z.string().email().max(255);

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format (E.164)');

export const urlSchema = z.string().url().max(2048);

export const safeUrlSchema = urlSchema.refine((url) => {
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}, 'URL must use http or https protocol');

// Logo/Image URL - prevents javascript: and data: XSS
export const imageUrlSchema = z
  .string()
  .max(2048)
  .refine((url) => {
    try {
      const parsed = new URL(url);
      // Only allow https in production
      const allowedProtocols =
        process.env.NODE_ENV === 'production'
          ? ['https:']
          : ['https:', 'http:'];
      // Block javascript:, data:, vbscript:, etc.
      return allowedProtocols.includes(parsed.protocol);
    } catch {
      return false;
    }
  }, 'Invalid image URL - must be HTTPS');

export const slugSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format');

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ============================================================================
// API Request Schemas
// ============================================================================

export const merchantIdSchema = z.object({
  merchantId: uuidSchema,
});

export const locationIdSchema = z.object({
  locationId: uuidSchema,
});

// ============================================================================
// Webhook Schemas
// ============================================================================

export const telegramMessageSchema = z.object({
  update_id: z.number(),
  message: z
    .object({
      message_id: z.number(),
      from: z.object({
        id: z.number(),
        first_name: z.string(),
        last_name: z.string().optional(),
        username: z.string().optional(),
      }),
      chat: z.object({
        id: z.number(),
        type: z.enum(['private', 'group', 'supergroup', 'channel']),
      }),
      text: z.string().optional(),
    })
    .optional(),
});

export const whatsappMessageSchema = z.object({
  object: z.literal('whatsapp_business_account'),
  entry: z.array(
    z.object({
      id: z.string(),
      changes: z.array(
        z.object({
          field: z.string(),
          value: z.object({
            messaging_product: z.string(),
            metadata: z.object({
              display_phone_number: z.string(),
              phone_number_id: z.string(),
            }),
            messages: z
              .array(
                z.object({
                  from: z.string(),
                  id: z.string(),
                  type: z.string(),
                  text: z.object({ body: z.string() }).optional(),
                })
              )
              .optional(),
          }),
        })
      ),
    })
  ),
});
```

**Usage in API routes:**

```typescript
// apps/backoffice/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { merchantIdSchema } from '@/shared/validation/schemas';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Validate input
  const result = merchantIdSchema.safeParse({
    merchantId: searchParams.get('merchantId'),
  });

  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { merchantId } = result.data;
  // ... continue with validated data
}
```

---

### 1.3 Secure Error Handling

#### Problem

Error messages expose database schema, table names, and internal paths.

**Create standardized error handler:**

```typescript
// shared/utils/api-error.ts
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { createLogger } from './logger';

const logger = createLogger({ service: 'api-error' });

// Error codes for client consumption
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_REQUIRED = 'AUTHENTICATION_REQUIRED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RATE_LIMITED = 'RATE_LIMITED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

interface ApiError {
  code: ErrorCode;
  message: string;
  details?: unknown;
}

// Safe error messages that don't leak internals
const SAFE_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.VALIDATION_ERROR]: 'The request contains invalid data',
  [ErrorCode.AUTHENTICATION_REQUIRED]: 'Authentication is required',
  [ErrorCode.PERMISSION_DENIED]:
    'You do not have permission to perform this action',
  [ErrorCode.RESOURCE_NOT_FOUND]: 'The requested resource was not found',
  [ErrorCode.RATE_LIMITED]: 'Too many requests. Please try again later',
  [ErrorCode.INTERNAL_ERROR]: 'An unexpected error occurred',
  [ErrorCode.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable',
};

const STATUS_CODES: Record<ErrorCode, number> = {
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.AUTHENTICATION_REQUIRED]: 401,
  [ErrorCode.PERMISSION_DENIED]: 403,
  [ErrorCode.RESOURCE_NOT_FOUND]: 404,
  [ErrorCode.RATE_LIMITED]: 429,
  [ErrorCode.INTERNAL_ERROR]: 500,
  [ErrorCode.SERVICE_UNAVAILABLE]: 503,
};

/**
 * Handle errors in API routes without leaking internal details
 */
export function handleApiError(
  error: unknown,
  requestId?: string
): NextResponse<ApiError> {
  // Generate request ID for correlation
  const reqId = requestId || crypto.randomUUID();

  // Log the full error internally
  logger.error('API Error', error, { requestId: reqId });

  // Zod validation errors - safe to expose field names
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        code: ErrorCode.VALIDATION_ERROR,
        message: SAFE_MESSAGES[ErrorCode.VALIDATION_ERROR],
        details: error.flatten(),
      },
      {
        status: STATUS_CODES[ErrorCode.VALIDATION_ERROR],
        headers: { 'X-Request-ID': reqId },
      }
    );
  }

  // Supabase/Postgres errors - NEVER expose details
  if (isPostgresError(error)) {
    // Log full error for debugging
    logger.error('Database error', error, {
      requestId: reqId,
      code: (error as { code?: string }).code,
    });

    // Return generic message
    return NextResponse.json(
      {
        code: ErrorCode.INTERNAL_ERROR,
        message: SAFE_MESSAGES[ErrorCode.INTERNAL_ERROR],
      },
      {
        status: 500,
        headers: { 'X-Request-ID': reqId },
      }
    );
  }

  // Default: internal error
  return NextResponse.json(
    {
      code: ErrorCode.INTERNAL_ERROR,
      message: SAFE_MESSAGES[ErrorCode.INTERNAL_ERROR],
    },
    {
      status: 500,
      headers: { 'X-Request-ID': reqId },
    }
  );
}

function isPostgresError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const code = (error as { code?: string }).code;
  // Postgres error codes start with digits
  return typeof code === 'string' && /^\d{5}$/.test(code);
}

/**
 * Create a typed error response
 */
export function apiError(
  code: ErrorCode,
  customMessage?: string
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      code,
      message: customMessage || SAFE_MESSAGES[code],
    },
    { status: STATUS_CODES[code] }
  );
}
```

---

### 1.4 HTTPOnly Cookies for Dev Session

#### Problem

Dev session cookies lack `httpOnly` and `secure` flags, making them vulnerable to XSS theft.

**File:** `/apps/backoffice/lib/auth/dev-accounts.ts`

**Fix:**

```typescript
// apps/backoffice/lib/auth/dev-accounts.ts
export const DEV_SESSION_CONFIG = {
  name: 'gudbro_dev_session',
  maxAge: 86400, // 24 hours
  path: '/',
  // SECURITY: Always use secure cookie settings
  httpOnly: true, // Prevents JavaScript access (XSS protection)
  secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
  sameSite: 'strict' as const, // CSRF protection
} as const;
```

---

### 1.5 CORS Lockdown

**Create centralized CORS configuration:**

```typescript
// shared/utils/cors.ts
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://gudbro.com',
  'https://app.gudbro.com',
  'https://backoffice.gudbro.com',
  ...(process.env.NODE_ENV === 'development'
    ? [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3004',
        'http://localhost:3023',
        'http://localhost:3024',
      ]
    : []),
];

export function corsHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get('origin') || '';

  // Only allow whitelisted origins
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Request-ID',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
}

export function handleCors(request: NextRequest): NextResponse | null {
  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }
  return null;
}
```

---

## Phase 2: Production Ready (Week 3-4)

### 2.1 Rate Limiting

**Recommended Library:** `@upstash/ratelimit` (Vercel-optimized, Edge-compatible)

```bash
pnpm add @upstash/ratelimit @upstash/redis
```

**Implementation:**

```typescript
// shared/utils/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limit configurations per endpoint type
export const rateLimits = {
  // Public API endpoints
  public: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 req/min
    prefix: 'ratelimit:public',
  }),

  // Authentication endpoints (prevent brute force)
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 req/min
    prefix: 'ratelimit:auth',
  }),

  // Webhook endpoints
  webhook: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, '1 m'), // 1000 req/min
    prefix: 'ratelimit:webhook',
  }),

  // AI/LLM endpoints (expensive operations)
  ai: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 req/min
    prefix: 'ratelimit:ai',
  }),

  // File upload endpoints
  upload: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 h'), // 10 uploads/hour
    prefix: 'ratelimit:upload',
  }),

  // Payment endpoints
  payment: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1 m'), // 20 req/min
    prefix: 'ratelimit:payment',
  }),
};

// Rate limit per endpoint type
export const ENDPOINT_LIMITS: Record<string, keyof typeof rateLimits> = {
  '/api/auth': 'auth',
  '/api/login': 'auth',
  '/api/chat/webhook': 'webhook',
  '/api/ai': 'ai',
  '/api/upload': 'upload',
  '/api/payment': 'payment',
  '/api/billing': 'payment',
  '/api/wallet': 'payment',
};

export async function rateLimit(
  request: NextRequest,
  type: keyof typeof rateLimits = 'public'
): Promise<NextResponse | null> {
  const ip =
    request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous';
  const limiter = rateLimits[type];

  const { success, limit, remaining, reset } = await limiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        retryAfter: Math.ceil((reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  return null;
}
```

**Middleware integration:**

```typescript
// apps/backoffice/middleware.ts (add to existing)
import { rateLimit, ENDPOINT_LIMITS } from '@/shared/utils/rate-limit';

// In middleware function, add:
export async function middleware(request: NextRequest) {
  // ... existing code ...

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const limitType =
      Object.entries(ENDPOINT_LIMITS).find(([prefix]) =>
        pathname.startsWith(prefix)
      )?.[1] || 'public';

    const rateLimitResponse = await rateLimit(request, limitType);
    if (rateLimitResponse) return rateLimitResponse;
  }

  // ... rest of middleware
}
```

---

### 2.2 Security Headers

**Update Next.js config for all apps:**

```javascript
// next.config.js (apply to all apps)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config ...

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // XSS Protection (legacy browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Prevent MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions policy (disable sensitive APIs)
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(self), payment=(self)',
          },
          // HSTS (HTTP Strict Transport Security)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://cdn.gudbro.com https://flagcdn.com https://img.vietqr.io https://api.qrserver.com https://*.tile.openstreetmap.org",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.openai.com https://api.stripe.com https://api.visual-crossing-weather.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ];
  },
};
```

**Files to update:**

- `/apps/backoffice/next.config.js`
- `/apps/coffeeshop/frontend/next.config.js`
- `/apps/website/next.config.js`
- `/apps/wellness/frontend/next.config.js`
- `/apps/rentals/frontend/next.config.js`

---

### 2.3 Centralized Logging

**Current State:** Logger exists at `/shared/utils/logger.ts` but 629+ raw `console.log` statements remain.

**Migration Plan:**

1. **Create ESLint rule to prevent new console.log:**

```javascript
// .eslintrc.js (add to rules)
{
  "rules": {
    "no-console": ["error", {
      "allow": ["warn", "error"]
    }]
  }
}
```

2. **Batch migration script:**

```bash
# Find all console.log statements
grep -r "console\.log" apps/ shared/ --include="*.ts" --include="*.tsx" -l | wc -l
# Expected: ~100 files

# Priority order for migration:
# 1. API routes (security-sensitive)
# 2. Services (business logic)
# 3. Components (UI feedback)
```

3. **Logging format for production:**

```typescript
// Log format for Vercel/Datadog ingestion
interface StructuredLog {
  timestamp: string; // ISO 8601
  level: 'debug' | 'info' | 'warn' | 'error';
  service: string; // 'backoffice' | 'pwa' | 'website'
  message: string;
  requestId?: string; // Correlation ID
  userId?: string; // Authenticated user
  merchantId?: string; // Multi-tenant context
  duration?: number; // For performance tracking
  error?: {
    name: string;
    message: string;
    stack?: string; // Only in development
    code?: string;
  };
  metadata?: Record<string, unknown>;
}
```

---

### 2.4 React Error Boundaries

**Create global error boundary:**

```typescript
// shared/components/ErrorBoundary.tsx
'use client';

import React, { Component, ReactNode } from 'react';
import { createLogger } from '@/shared/utils/logger';

const logger = createLogger({ service: 'error-boundary' });

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to monitoring service
    logger.error('React Error Boundary caught error', error, {
      componentStack: errorInfo.componentStack,
    });

    // TODO: Send to Sentry/Datadog in production
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { extra: errorInfo });
    // }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Add to app layouts:**

```typescript
// apps/backoffice/app/layout.tsx
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

---

### 2.5 URL Validation for Logo/Images

**Problem:** Logo URLs from database are rendered without validation, allowing XSS via `javascript:` URLs.

**Solution:** Use the `imageUrlSchema` from Section 1.2 and sanitize before render:

```typescript
// shared/utils/sanitize-url.ts
const ALLOWED_IMAGE_PROTOCOLS = ['https:', 'http:'];
const ALLOWED_IMAGE_HOSTS = [
  'images.unsplash.com',
  'cdn.gudbro.com',
  'flagcdn.com',
  'img.vietqr.io',
  'api.qrserver.com',
  // Partner domains loaded from database
];

export function sanitizeImageUrl(
  url: string | null | undefined
): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    // Block dangerous protocols
    if (!ALLOWED_IMAGE_PROTOCOLS.includes(parsed.protocol)) {
      console.warn('Blocked unsafe image URL protocol:', parsed.protocol);
      return null;
    }

    // In production, optionally restrict to known hosts
    // if (process.env.NODE_ENV === 'production' && !ALLOWED_IMAGE_HOSTS.includes(parsed.host)) {
    //   return null;
    // }

    return url;
  } catch {
    return null;
  }
}
```

**Usage in components:**

```tsx
// Before
<img src={partner.logo_url} />;

// After
import { sanitizeImageUrl } from '@/shared/utils/sanitize-url';
<img src={sanitizeImageUrl(partner.logo_url) || '/placeholder-logo.png'} />;
```

---

## Phase 3: Enterprise Grade (Month 2-3)

### 3.1 SOC2 Preparation Considerations

| Control Area          | Current Gap          | Required Action                                     |
| --------------------- | -------------------- | --------------------------------------------------- |
| **Access Control**    | Dev accounts in prod | Remove before SOC2 audit                            |
| **Audit Logging**     | Partial logging      | Full audit trail for data access                    |
| **Encryption**        | TLS in transit       | Document encryption at rest (Supabase handles)      |
| **Change Management** | No formal process    | Document change control procedures                  |
| **Incident Response** | None                 | Create IR plan (see Section 6)                      |
| **Vendor Management** | Informal             | Document Supabase, Vercel, Stripe security postures |
| **Data Retention**    | Undefined            | Define and implement retention policies             |

**Key Files to Create:**

- `docs/security/SOC2-CONTROLS.md`
- `docs/security/DATA-RETENTION-POLICY.md`
- `docs/security/INCIDENT-RESPONSE-PLAN.md`

---

### 3.2 Penetration Testing Recommendations

**Recommended Firms (Vercel/Supabase ecosystem experience):**

- HackerOne (managed bug bounty)
- Cobalt (Pentesting as a Service)
- Bishop Fox (enterprise)

**Scope for First Pentest:**

1. **Web Application Testing**
   - Authentication bypass
   - Session management
   - Input validation (SQLi, XSS, SSRF)
   - Business logic flaws
   - File upload vulnerabilities

2. **API Security**
   - Rate limiting effectiveness
   - Authorization checks (BOLA/IDOR)
   - Webhook security
   - JWT/session token security

3. **Cloud Configuration**
   - Supabase RLS policy review
   - Vercel environment variable exposure
   - Storage bucket permissions

**Pre-Pentest Checklist:**

- [ ] All Phase 1 & 2 fixes deployed
- [ ] Staging environment available
- [ ] Test data seeded (no production data)
- [ ] Monitoring/alerting active
- [ ] Rollback plan ready

---

### 3.3 Advanced Security Headers

**Add these headers after Phase 2 basics:**

```javascript
// next.config.js (enhanced CSP)
{
  key: 'Content-Security-Policy-Report-Only',
  value: [
    // Same as CSP but in report-only mode first
    "report-uri https://gudbro.report-uri.com/r/d/csp/enforce",
    "report-to csp-endpoint",
  ].join('; '),
},
{
  key: 'Report-To',
  value: JSON.stringify({
    group: 'csp-endpoint',
    max_age: 10886400,
    endpoints: [{ url: 'https://gudbro.report-uri.com/r/d/csp/enforce' }],
  }),
},
// Expect-CT (Certificate Transparency)
{
  key: 'Expect-CT',
  value: 'max-age=86400, enforce',
},
```

---

## Phase 4: Scale Security (Month 4+)

### 4.1 DDoS Protection

**Vercel's Built-in Protection:**

- Vercel Edge Network provides basic DDoS mitigation
- For enterprise: Vercel Enterprise includes advanced DDoS protection

**Additional Layer: Cloudflare (Optional)**

- Place Cloudflare in front of Vercel
- Enable Under Attack Mode for critical endpoints
- Configure rate limiting rules at edge

**Application-Level Protection:**

```typescript
// middleware.ts - Add progressive backoff
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

async function checkSuspiciousActivity(ip: string): Promise<boolean> {
  const key = `suspicious:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 3600); // 1 hour window
  }

  // Block if > 1000 requests in an hour (adjust threshold)
  if (count > 1000) {
    await redis.setex(`blocked:${ip}`, 86400, '1'); // Block for 24h
    return true;
  }

  return false;
}
```

---

### 4.2 Bot Detection

**Recommended: Vercel WAF + Custom Fingerprinting**

```typescript
// shared/utils/bot-detection.ts
interface BotSignals {
  userAgent: string;
  acceptLanguage: string;
  acceptEncoding: string;
  hasMouseMovement?: boolean;
  hasKeyboardEvents?: boolean;
  hasTouch?: boolean;
  connectionType?: string;
}

export function calculateBotScore(signals: BotSignals): number {
  let score = 0;

  // User-Agent checks
  const ua = signals.userAgent.toLowerCase();
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
    score += 50;
  }
  if (ua.includes('headless')) {
    score += 40;
  }
  if (!signals.acceptLanguage) {
    score += 20;
  }

  // Behavioral signals (from client-side)
  if (signals.hasMouseMovement === false && signals.hasTouch === false) {
    score += 30;
  }

  return Math.min(score, 100);
}

// Usage: Block if score > 70
```

**Client-side fingerprinting (optional):**

```typescript
// components/BotDetection.tsx
'use client';

import { useEffect } from 'react';

export function BotDetection() {
  useEffect(() => {
    const signals = {
      hasMouseMovement: false,
      hasKeyboardEvents: false,
      hasTouch: false,
    };

    const handlers = {
      mousemove: () => {
        signals.hasMouseMovement = true;
      },
      keydown: () => {
        signals.hasKeyboardEvents = true;
      },
      touchstart: () => {
        signals.hasTouch = true;
      },
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      window.addEventListener(event, handler, { once: true });
    });

    // Send signals after 5 seconds
    setTimeout(() => {
      fetch('/api/signals', {
        method: 'POST',
        body: JSON.stringify(signals),
      });
    }, 5000);

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        window.removeEventListener(event, handler);
      });
    };
  }, []);

  return null;
}
```

---

### 4.3 Fraud Prevention for Payment Flows

**Stripe Radar Integration (Already available with Stripe):**

```typescript
// apps/website/lib/stripe-service.ts - Enhance checkout
export async function createCheckoutSession(params: CheckoutParams) {
  const session = await stripe.checkout.sessions.create({
    // ... existing params

    // Enable Stripe Radar fraud protection
    payment_intent_data: {
      metadata: {
        // Include fraud signals
        customer_ip: params.customerIp,
        user_agent: params.userAgent,
        account_age_days: params.accountAgeDays,
        previous_orders: params.previousOrderCount,
      },
      // Enable 3D Secure for high-risk transactions
      setup_future_usage: 'off_session',
    },

    // Collect billing details for fraud prevention
    billing_address_collection: 'required',
    phone_number_collection: { enabled: true },
  });

  return session;
}
```

**Custom Fraud Rules:**

```typescript
// shared/utils/fraud-detection.ts
interface TransactionSignals {
  amount: number;
  currency: string;
  userId: string;
  ip: string;
  country: string;
  accountAgeDays: number;
  previousSuccessfulPayments: number;
  failedPaymentsLast24h: number;
}

export function calculateFraudRisk(
  signals: TransactionSignals
): 'low' | 'medium' | 'high' {
  let riskScore = 0;

  // New account + high value
  if (signals.accountAgeDays < 1 && signals.amount > 100) {
    riskScore += 30;
  }

  // Multiple failed payments recently
  if (signals.failedPaymentsLast24h >= 3) {
    riskScore += 40;
  }

  // First purchase over threshold
  if (signals.previousSuccessfulPayments === 0 && signals.amount > 500) {
    riskScore += 25;
  }

  // High-risk country (customize list)
  const highRiskCountries = ['XX']; // Add based on your data
  if (highRiskCountries.includes(signals.country)) {
    riskScore += 20;
  }

  if (riskScore >= 50) return 'high';
  if (riskScore >= 25) return 'medium';
  return 'low';
}
```

---

## 5. Compliance Considerations

### 5.1 GDPR (EU Users)

| Requirement        | Implementation                              |
| ------------------ | ------------------------------------------- |
| Right to Access    | API endpoint: `GET /api/user/data-export`   |
| Right to Delete    | API endpoint: `DELETE /api/user/account`    |
| Consent Management | Cookie banner with granular controls        |
| Data Minimization  | Audit stored PII, remove unnecessary fields |
| Privacy Policy     | Update `gudbro.com/privacy`                 |

**Key Files to Create:**

- `/apps/website/app/api/user/data-export/route.ts`
- `/apps/website/app/api/user/account/route.ts` (DELETE handler)
- `/shared/database/migrations/schema/XXX-gdpr-compliance.sql`

---

### 5.2 PCI DSS (Payment Processing)

**Current State:** Using Stripe Checkout/Elements = PCI scope is minimized (SAQ A eligible)

| Requirement             | Status                             |
| ----------------------- | ---------------------------------- |
| No card data on servers | COMPLIANT (Stripe handles)         |
| TLS everywhere          | COMPLIANT (Vercel default)         |
| Secure API keys         | NEEDS AUDIT (check env var access) |
| Access logging          | NEEDS IMPLEMENTATION               |
| Security testing        | PENDING (Phase 3)                  |

**Action Items:**

1. Audit all Stripe key access
2. Ensure `STRIPE_SECRET_KEY` is never logged
3. Implement PCI-specific audit logging for payment endpoints
4. Document PCI scope in `docs/security/PCI-SCOPE.md`

---

## 6. Incident Response Basics

### 6.1 Incident Classification

| Severity | Description                            | Response Time | Example                  |
| -------- | -------------------------------------- | ------------- | ------------------------ |
| P0       | Data breach, system down               | 15 minutes    | Customer data exposed    |
| P1       | Partial outage, security vulnerability | 1 hour        | Auth bypass discovered   |
| P2       | Performance degradation                | 4 hours       | Slow API responses       |
| P3       | Minor issue                            | 24 hours      | Logging misconfiguration |

### 6.2 Response Playbook

```markdown
## Incident Response Checklist

### 1. Detection (0-15 min)

- [ ] Confirm incident is real (not false positive)
- [ ] Classify severity (P0-P3)
- [ ] Create incident channel (Slack: #incident-YYYY-MM-DD)
- [ ] Notify on-call engineer

### 2. Containment (15-60 min)

- [ ] Identify affected systems
- [ ] Implement temporary fix/rollback if needed
- [ ] Block malicious IPs if applicable
- [ ] Preserve evidence (logs, screenshots)

### 3. Eradication (1-4 hours)

- [ ] Identify root cause
- [ ] Develop permanent fix
- [ ] Test fix in staging
- [ ] Deploy fix to production

### 4. Recovery (4-24 hours)

- [ ] Verify fix is effective
- [ ] Monitor for recurrence
- [ ] Restore normal operations
- [ ] User communication if needed

### 5. Post-Mortem (24-48 hours)

- [ ] Document timeline
- [ ] Identify improvements
- [ ] Update runbooks
- [ ] Share learnings (blameless)
```

### 6.3 Key Contacts

```markdown
## Incident Contacts

| Role             | Contact              | Escalation      |
| ---------------- | -------------------- | --------------- |
| On-call Engineer | PagerDuty            | Auto            |
| Security Lead    | TBD                  | P0-P1           |
| CTO              | TBD                  | P0 only         |
| Legal (breach)   | TBD                  | Data breach     |
| Stripe Support   | support@stripe.com   | Payment issues  |
| Supabase Support | support@supabase.com | Database issues |
| Vercel Support   | support@vercel.com   | Infrastructure  |
```

---

## 7. Implementation Checklist

### Phase 1 (Week 1-2)

- [ ] Telegram webhook signature verification
- [ ] WhatsApp webhook signature verification
- [ ] Add Zod to backoffice and coffeeshop
- [ ] Create shared validation schemas
- [ ] Implement standardized error handling
- [ ] Fix dev session cookie settings (httpOnly, secure)
- [ ] Create CORS whitelist configuration
- [ ] Add required environment variables to Vercel

### Phase 2 (Week 3-4)

- [ ] Set up Upstash Redis for rate limiting
- [ ] Implement rate limiting middleware
- [ ] Add security headers to all next.config.js
- [ ] Create ErrorBoundary component
- [ ] Add ErrorBoundary to all app layouts
- [ ] Create image URL sanitization utility
- [ ] Add ESLint no-console rule
- [ ] Migrate top 20 files from console.log to logger

### Phase 3 (Month 2-3)

- [ ] Create SOC2 controls documentation
- [ ] Define data retention policy
- [ ] Write incident response plan
- [ ] Schedule penetration test
- [ ] Add CSP report-uri endpoint
- [ ] Implement audit logging for sensitive operations

### Phase 4 (Month 4+)

- [ ] Evaluate Cloudflare for DDoS protection
- [ ] Implement bot detection signals
- [ ] Add Stripe Radar metadata
- [ ] Create fraud scoring system
- [ ] GDPR data export endpoint
- [ ] GDPR account deletion endpoint
- [ ] Complete PCI DSS documentation

---

## 8. Monitoring & Alerting

### Recommended Stack

| Tool             | Purpose                     | Priority          |
| ---------------- | --------------------------- | ----------------- |
| Vercel Analytics | Traffic, Core Web Vitals    | Already available |
| Sentry           | Error tracking, performance | Week 3            |
| Datadog or Axiom | Log aggregation, APM        | Week 4            |
| Upstash          | Rate limiting, caching      | Week 3            |
| PagerDuty        | Incident management         | Month 2           |

### Key Alerts to Configure

```yaml
alerts:
  - name: High Error Rate
    condition: error_rate > 5% for 5 minutes
    severity: P1

  - name: Auth Failures Spike
    condition: auth_failures > 100 in 1 minute
    severity: P0

  - name: Rate Limit Triggered
    condition: rate_limit_blocks > 1000 in 5 minutes
    severity: P2

  - name: Webhook Signature Failure
    condition: webhook_signature_failures > 10 in 1 minute
    severity: P1

  - name: Database Connection Errors
    condition: db_connection_errors > 0 for 2 minutes
    severity: P0
```

---

## Document History

| Version | Date       | Changes                  |
| ------- | ---------- | ------------------------ |
| 1.0     | 2026-01-17 | Initial security roadmap |

---

**Next Review:** 2026-02-17
**Owner:** Security Engineering
**Approval Required For Changes:** CTO
