# GUDBRO Verticals: Infrastructure Scaling Roadmap

> **From 100 to 10M Users - A Phased Approach**

**Document Version:** 1.0
**Created:** 2026-01-17
**Author:** Infrastructure Architecture Team
**Status:** Strategic Planning Document

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Phase 1: Foundation (100 to 1K users)](#phase-1-foundation-100--1k-users---week-1-4)
4. [Phase 2: Growth (1K to 10K users)](#phase-2-growth-1k--10k-users---month-2-3)
5. [Phase 3: Scale (10K to 100K users)](#phase-3-scale-10k--100k-users---month-4-6)
6. [Phase 4: Hyper-scale (100K to 1M users)](#phase-4-hyper-scale-100k--1m-users---month-7-12)
7. [Phase 5: Massive Scale (1M to 10M users)](#phase-5-massive-scale-1m--10m-users---year-2)
8. [Technology Recommendations](#technology-recommendations)
9. [Cost Projections](#cost-projections)
10. [Team Scaling](#team-scaling)
11. [Critical Path Analysis](#critical-path-analysis)
12. [Risk Matrix](#risk-matrix)

---

## Executive Summary

GUDBRO Verticals is a Next.js + Supabase multi-tenant SaaS platform serving coffee shops, wellness centers, and rental businesses. This roadmap addresses 10 critical infrastructure gaps identified in the current audit and provides a phased approach to scale from ~100 users to 10M users over 2 years.

### Key Findings

| Problem                        | Severity | Phase to Fix |
| ------------------------------ | -------- | ------------ |
| Zero caching (no Redis)        | CRITICAL | Phase 1      |
| N+1 queries everywhere         | HIGH     | Phase 1-2    |
| Synchronous notifications      | HIGH     | Phase 1      |
| No rate limiting               | CRITICAL | Phase 1      |
| ~32% test coverage             | MEDIUM   | Phase 1-2    |
| No background job system       | HIGH     | Phase 2      |
| Polling instead of WebSocket   | MEDIUM   | Phase 2      |
| Missing database indexes       | HIGH     | Phase 1      |
| No CDN                         | MEDIUM   | Phase 1      |
| No observability (console.log) | HIGH     | Phase 1      |

### Investment Summary

| Phase   | Duration | Engineering Effort | Est. Monthly Cost  |
| ------- | -------- | ------------------ | ------------------ |
| Phase 1 | 4 weeks  | 8-12 weeks         | $50-150/mo         |
| Phase 2 | 8 weeks  | 16-24 weeks        | $200-500/mo        |
| Phase 3 | 12 weeks | 32-48 weeks        | $1,000-3,000/mo    |
| Phase 4 | 24 weeks | 64-96 weeks        | $5,000-15,000/mo   |
| Phase 5 | 52 weeks | 120-180 weeks      | $30,000-100,000/mo |

---

## Current State Analysis

### Architecture Overview

```
Current Stack:
- Frontend: Next.js 14.2 on Vercel
- Backend: Next.js API Routes + Supabase Edge Functions
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Storage: Supabase Storage
- AI: OpenAI GPT-4

Monorepo Structure:
apps/
  backoffice/     # Admin dashboard (:3023)
  coffeeshop/     # Digital menu PWA (:3004)
  website/        # Marketing site (:3000)
  rentals/        # Rental services
  wellness/       # Wellness services
shared/
  database/       # ~100 tables, 42 migrations
  core/           # Shared utilities
```

### Current Metrics

| Metric          | Current Value | Target (Phase 5) |
| --------------- | ------------- | ---------------- |
| Users           | ~100          | 10,000,000       |
| Merchants       | ~10           | 100,000          |
| API Latency P95 | ~800ms        | <100ms           |
| Database Tables | ~100          | ~150             |
| Test Coverage   | ~32%          | 80%              |
| Uptime          | Unknown       | 99.99%           |
| Error Rate      | Unknown       | <0.01%           |

### Identified Technical Debt

```typescript
// Example: Current N+1 Query Pattern (ANTI-PATTERN)
// Found in multiple services
async function getMerchantMenu(merchantId: string) {
  const categories = await supabase.from('menu_categories').select('*');
  for (const category of categories) {
    // N+1: One query per category
    category.items = await supabase
      .from('menu_items')
      .select('*')
      .eq('category_id', category.id);
  }
  return categories;
}

// Example: Synchronous Notification (ANTI-PATTERN)
// Found in events-service.ts, actions-service.ts
async function createOrder(order: Order) {
  await saveOrder(order);
  await sendEmailNotification(order); // BLOCKS request
  await sendPushNotification(order); // BLOCKS request
  await updateAnalytics(order); // BLOCKS request
  return order;
}
```

---

## Phase 1: Foundation (100 to 1K users) - Week 1-4

> **Goal:** Establish baseline infrastructure, fix critical gaps, enable observability

### 1.1 Infrastructure Changes

#### Caching Layer (Week 1)

**Technology Choice: Upstash Redis**

Rationale: Serverless, Vercel-native integration, no infrastructure management, pay-per-request pricing ideal for early stage.

```typescript
// lib/cache/redis.ts
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache patterns
export const CacheKeys = {
  merchantMenu: (slug: string) => `menu:${slug}`,
  merchantConfig: (id: string) => `merchant:${id}:config`,
  userSession: (id: string) => `session:${id}`,
  rateLimit: (ip: string, endpoint: string) => `ratelimit:${ip}:${endpoint}`,
} as const;

export const CacheTTL = {
  MENU: 300, // 5 minutes
  CONFIG: 3600, // 1 hour
  SESSION: 86400, // 24 hours
  RATE_LIMIT: 60, // 1 minute
} as const;
```

**Implementation Priority:**

1. Menu data caching (highest read frequency)
2. Merchant configuration caching
3. Session caching
4. Rate limiting tokens

#### Rate Limiting (Week 1)

```typescript
// lib/security/rate-limiter.ts
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '../cache/redis';

export const rateLimiters = {
  // API routes: 100 requests per minute
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1m'),
    prefix: 'ratelimit:api',
  }),

  // Auth endpoints: 10 requests per minute
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1m'),
    prefix: 'ratelimit:auth',
  }),

  // AI endpoints: 20 requests per minute (expensive)
  ai: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1m'),
    prefix: 'ratelimit:ai',
  }),
};

// Middleware integration
export async function withRateLimit(
  req: Request,
  limiter: Ratelimit
): Promise<{ success: boolean; remaining: number }> {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  return limiter.limit(ip);
}
```

#### CDN Configuration (Week 1)

```javascript
// next.config.js - Vercel Edge Network + Image Optimization
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    minimumCacheTTL: 31536000, // 1 year for immutable assets
  },
  headers: async () => [
    {
      source: '/api/menu/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 's-maxage=300, stale-while-revalidate=600',
        },
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
};
```

### 1.2 Code Changes

#### Query Optimization (Week 2)

```typescript
// lib/repositories/menu-repository.ts
// BEFORE: N+1 Query Pattern
async function getMenuOld(merchantSlug: string) {
  const merchant = await supabase
    .from('merchants')
    .select('*')
    .eq('slug', merchantSlug)
    .single();
  const categories = await supabase
    .from('menu_categories')
    .select('*')
    .eq('merchant_id', merchant.id);
  for (const cat of categories) {
    cat.items = await supabase
      .from('menu_items')
      .select('*')
      .eq('category_id', cat.id);
  }
  return { merchant, categories };
}

// AFTER: Single Optimized Query with Cache
async function getMenu(merchantSlug: string) {
  // Check cache first
  const cacheKey = CacheKeys.merchantMenu(merchantSlug);
  const cached = await redis.get<MenuData>(cacheKey);
  if (cached) return cached;

  // Single query with joins
  const { data, error } = await supabase
    .from('merchants')
    .select(
      `
      *,
      menu_categories!inner (
        *,
        menu_items (*)
      )
    `
    )
    .eq('slug', merchantSlug)
    .eq('menu_categories.is_active', true)
    .eq('menu_categories.menu_items.is_active', true)
    .order('display_order', { foreignTable: 'menu_categories' })
    .order('display_order', { foreignTable: 'menu_categories.menu_items' })
    .single();

  if (data) {
    await redis.set(cacheKey, data, { ex: CacheTTL.MENU });
  }
  return data;
}
```

#### Async Notification Pattern (Week 2)

```typescript
// lib/notifications/async-notifier.ts
// Use Supabase Edge Functions for async processing

interface NotificationJob {
  type: 'email' | 'push' | 'webhook';
  payload: Record<string, unknown>;
  priority: 'high' | 'normal' | 'low';
  scheduledFor?: Date;
}

export async function queueNotification(job: NotificationJob) {
  // Insert into notification_queue table
  // Supabase scheduled function processes queue
  const { error } = await supabase.from('notification_queue').insert({
    type: job.type,
    payload: job.payload,
    priority: job.priority,
    scheduled_for: job.scheduledFor ?? new Date(),
    status: 'pending',
  });

  if (error) {
    console.error('Failed to queue notification:', error);
    // Fallback to sync (degraded mode)
    await sendNotificationSync(job);
  }
}

// Usage: Non-blocking order creation
async function createOrder(order: Order) {
  const result = await saveOrder(order);

  // Queue notifications - doesn't block
  await Promise.all([
    queueNotification({
      type: 'email',
      payload: { orderId: result.id },
      priority: 'high',
    }),
    queueNotification({
      type: 'push',
      payload: { orderId: result.id },
      priority: 'normal',
    }),
  ]);

  return result;
}
```

### 1.3 Database Changes

#### Critical Indexes (Week 1)

```sql
-- Migration: 050-performance-indexes.sql
-- Purpose: Add missing indexes for common query patterns

-- Menu queries (highest frequency)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_menu_items_merchant_category_active
  ON menu_items (merchant_id, category_id, is_active)
  WHERE is_active = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_menu_categories_merchant_active_order
  ON menu_categories (merchant_id, is_active, display_order)
  WHERE is_active = true;

-- Analytics queries (time-series)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_merchant_created
  ON analytics_events (merchant_id, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_type_created
  ON analytics_events (event_type, created_at DESC);

-- Order queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_merchant_status_created
  ON orders (merchant_id, status, created_at DESC);

-- User lookups
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_accounts_email_lower
  ON accounts (LOWER(email));

-- JSONB indexes for filters
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_menu_items_dietary_flags
  ON menu_items USING GIN (dietary_flags jsonb_path_ops);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_menu_items_allergens
  ON menu_items USING GIN (allergens jsonb_path_ops);

-- Notification queue processing
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notification_queue_pending
  ON notification_queue (status, priority, scheduled_for)
  WHERE status = 'pending';
```

#### Notification Queue Table

```sql
-- Migration: 051-notification-queue.sql
CREATE TABLE notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('email', 'push', 'webhook', 'sms')),
  payload JSONB NOT NULL DEFAULT '{}',
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('high', 'normal', 'low')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  scheduled_for TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  last_error TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_only" ON notification_queue
  FOR ALL USING (auth.role() = 'service_role');
```

### 1.4 Observability Setup

#### Structured Logging (Week 1)

```typescript
// lib/observability/logger.ts
import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  transport: isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: { colorize: true },
      },
  base: {
    env: process.env.NODE_ENV,
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7),
  },
  redact: ['password', 'token', 'apiKey', 'authorization'],
});

// Request context logger
export function createRequestLogger(req: Request) {
  return logger.child({
    requestId: crypto.randomUUID(),
    path: new URL(req.url).pathname,
    method: req.method,
    userAgent: req.headers.get('user-agent'),
  });
}

// Usage in API routes
export async function GET(req: Request) {
  const log = createRequestLogger(req);
  log.info('Processing request');

  try {
    const result = await processRequest();
    log.info({ duration: Date.now() - start }, 'Request completed');
    return Response.json(result);
  } catch (error) {
    log.error({ error }, 'Request failed');
    throw error;
  }
}
```

#### Error Tracking with Sentry (Week 1)

```typescript
// lib/observability/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of requests for performance
  beforeSend(event) {
    // Scrub sensitive data
    if (event.request?.headers) {
      delete event.request.headers['authorization'];
      delete event.request.headers['cookie'];
    }
    return event;
  },
});

// Custom error boundary for AI services
export function captureAIError(error: Error, context: Record<string, unknown>) {
  Sentry.withScope((scope) => {
    scope.setTag('service', 'ai');
    scope.setContext('ai_context', context);
    Sentry.captureException(error);
  });
}
```

#### Metrics Collection (Week 2)

```typescript
// lib/observability/metrics.ts
// Using Vercel Analytics + Custom Metrics

export const metrics = {
  async trackApiLatency(endpoint: string, duration: number) {
    // Send to Vercel Analytics
    if (typeof window !== 'undefined') {
      window.va?.track('api_latency', { endpoint, duration });
    }
    // Also log for server-side collection
    logger.info({ metric: 'api_latency', endpoint, duration });
  },

  async trackCacheHit(key: string, hit: boolean) {
    logger.info({ metric: 'cache', key, hit });
  },

  async trackDatabaseQuery(query: string, duration: number) {
    logger.info({ metric: 'db_query', query, duration });
  },

  async trackRateLimit(ip: string, endpoint: string, limited: boolean) {
    logger.info({
      metric: 'rate_limit',
      ip: ip.slice(0, 8),
      endpoint,
      limited,
    });
  },
};
```

### 1.5 Estimated Effort

| Task                                | Engineering Weeks | Dependency   |
| ----------------------------------- | ----------------- | ------------ |
| Upstash Redis setup                 | 0.5               | None         |
| Rate limiting implementation        | 1                 | Redis        |
| CDN configuration                   | 0.5               | None         |
| Query optimization (top 10 queries) | 2                 | None         |
| Async notifications                 | 1.5               | DB migration |
| Database indexes                    | 0.5               | None         |
| Logging infrastructure              | 1                 | None         |
| Sentry integration                  | 0.5               | None         |
| Metrics collection                  | 1                 | Logging      |
| Test coverage improvement (40%)     | 2                 | None         |
| **Total**                           | **10.5 weeks**    |              |

### 1.6 Key Metrics to Track

| Metric                  | Current | Target | Alert Threshold |
| ----------------------- | ------- | ------ | --------------- |
| API P95 Latency         | ~800ms  | <400ms | >500ms          |
| Cache Hit Rate          | 0%      | >70%   | <50%            |
| Error Rate              | Unknown | <1%    | >2%             |
| Database Query Time P95 | Unknown | <100ms | >200ms          |
| Test Coverage           | 32%     | 40%    | <35%            |

### 1.7 Warning Signs (Move to Phase 2)

- API latency consistently >300ms
- Cache hit rate plateaus at <60%
- Error rate exceeds 0.5%
- Database CPU >50% during peak
- User complaints about speed
- Vercel function timeouts occurring

---

## Phase 2: Growth (1K to 10K users) - Month 2-3

> **Goal:** Implement background processing, real-time capabilities, database optimization

### 2.1 Infrastructure Changes

#### Background Job System

**Technology Choice: Trigger.dev (Recommended) or Inngest**

Rationale: Both are serverless-first, integrate well with Vercel/Next.js. Trigger.dev has better Supabase integration. Inngest is simpler for basic use cases.

```typescript
// lib/jobs/trigger.ts
import { TriggerClient, eventTrigger } from '@trigger.dev/sdk';

export const client = new TriggerClient({
  id: 'gudbro-verticals',
  apiKey: process.env.TRIGGER_API_KEY!,
});

// Define background jobs
client.defineJob({
  id: 'process-notification',
  name: 'Process Notification Queue',
  version: '1.0.0',
  trigger: eventTrigger({
    name: 'notification.queued',
  }),
  run: async (payload, io) => {
    const { notificationId } = payload;

    await io.runTask('fetch-notification', async () => {
      return supabase
        .from('notification_queue')
        .select('*')
        .eq('id', notificationId)
        .single();
    });

    await io.runTask('send-notification', async () => {
      // Send based on type
    });

    await io.runTask('mark-complete', async () => {
      await supabase
        .from('notification_queue')
        .update({ status: 'completed', processed_at: new Date() })
        .eq('id', notificationId);
    });
  },
});

// Scheduled jobs
client.defineJob({
  id: 'daily-analytics-aggregation',
  name: 'Daily Analytics Aggregation',
  version: '1.0.0',
  trigger: cronTrigger({
    cron: '0 2 * * *', // 2 AM daily
  }),
  run: async (payload, io) => {
    // Aggregate yesterday's analytics into daily_aggregates
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    await io.runTask('aggregate-events', async () => {
      return supabase.rpc('aggregate_daily_analytics', {
        target_date: yesterday.toISOString().split('T')[0],
      });
    });
  },
});

// AI briefing generation
client.defineJob({
  id: 'generate-daily-briefings',
  name: 'Generate AI Daily Briefings',
  version: '1.0.0',
  trigger: cronTrigger({
    cron: '0 6 * * *', // 6 AM daily
  }),
  run: async (payload, io) => {
    const merchants = await io.runTask('fetch-active-merchants', async () => {
      return supabase.from('merchants').select('id').eq('is_active', true);
    });

    for (const merchant of merchants.data ?? []) {
      await io.runTask(`briefing-${merchant.id}`, async () => {
        await generateDailyBriefing(merchant.id);
      });
    }
  },
});
```

#### WebSocket for Real-time (Supabase Realtime)

```typescript
// lib/realtime/chat-channel.ts
import { createClient } from '@supabase/supabase-js';
import type { RealtimeChannel } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function subscribeToChatMessages(
  conversationId: string,
  onMessage: (message: ChatMessage) => void
): RealtimeChannel {
  return supabase
    .channel(`chat:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        onMessage(payload.new as ChatMessage);
      }
    )
    .subscribe();
}

// React hook
export function useChatMessages(conversationId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const channel = subscribeToChatMessages(conversationId, (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [conversationId]);

  return messages;
}
```

#### Database Read Replicas (Supabase)

```typescript
// lib/supabase/read-replica.ts
// Supabase Pro plan includes read replicas

const readClient = createClient(
  process.env.SUPABASE_READ_REPLICA_URL!, // Provided by Supabase
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Use read replica for heavy read operations
export async function getAnalyticsDashboard(merchantId: string) {
  // Route to read replica
  return readClient
    .from('analytics_daily_aggregates')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('date', { ascending: false })
    .limit(30);
}

// Write operations still use primary
export async function trackEvent(event: AnalyticsEvent) {
  return supabase // Primary client
    .from('analytics_events')
    .insert(event);
}
```

### 2.2 Code Changes

#### Optimistic Updates Pattern

```typescript
// components/menu/MenuItemEditor.tsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function MenuItemEditor({ item }: { item: MenuItem }) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<MenuItem>) => {
      const response = await fetch(`/api/menu-items/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
      return response.json();
    },
    onMutate: async (updates) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['menu-item', item.id] });

      // Snapshot previous value
      const previous = queryClient.getQueryData(['menu-item', item.id]);

      // Optimistically update
      queryClient.setQueryData(['menu-item', item.id], (old: MenuItem) => ({
        ...old,
        ...updates,
      }));

      return { previous };
    },
    onError: (err, updates, context) => {
      // Rollback on error
      queryClient.setQueryData(['menu-item', item.id], context?.previous);
      toast.error('Failed to update item');
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['menu-item', item.id] });
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      updateMutation.mutate(formData);
    }}>
      {/* Form fields */}
    </form>
  );
}
```

#### Connection Pooling via Supabase

```typescript
// lib/supabase/pooled-client.ts
// Supabase handles connection pooling automatically via PgBouncer
// For direct Postgres access (e.g., migrations, admin tasks):

import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// For Supabase client, connection pooling is automatic
// Just ensure you're not creating new clients per request
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'x-connection-type': 'pooled',
      },
    },
  }
);
```

### 2.3 Database Changes

#### Partitioning for Analytics

```sql
-- Migration: 055-analytics-partitioning.sql
-- Partition analytics_events by month for better query performance

-- Create partitioned table
CREATE TABLE analytics_events_partitioned (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create partitions for next 12 months
CREATE TABLE analytics_events_2026_01 PARTITION OF analytics_events_partitioned
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE analytics_events_2026_02 PARTITION OF analytics_events_partitioned
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
-- ... continue for each month

-- Create partition maintenance function
CREATE OR REPLACE FUNCTION create_analytics_partition()
RETURNS void AS $$
DECLARE
  partition_date DATE := DATE_TRUNC('month', NOW() + INTERVAL '1 month');
  partition_name TEXT;
  start_date TEXT;
  end_date TEXT;
BEGIN
  partition_name := 'analytics_events_' || TO_CHAR(partition_date, 'YYYY_MM');
  start_date := TO_CHAR(partition_date, 'YYYY-MM-DD');
  end_date := TO_CHAR(partition_date + INTERVAL '1 month', 'YYYY-MM-DD');

  EXECUTE FORMAT(
    'CREATE TABLE IF NOT EXISTS %I PARTITION OF analytics_events_partitioned
     FOR VALUES FROM (%L) TO (%L)',
    partition_name, start_date, end_date
  );
END;
$$ LANGUAGE plpgsql;

-- Schedule monthly partition creation
-- (Run via Trigger.dev or pg_cron)
```

#### Materialized Views for Dashboards

```sql
-- Migration: 056-materialized-views.sql

-- Daily merchant summary (refreshed hourly)
CREATE MATERIALIZED VIEW mv_merchant_daily_summary AS
SELECT
  merchant_id,
  DATE(created_at) as date,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(*) FILTER (WHERE event_type = 'menu_view') as menu_views,
  COUNT(*) FILTER (WHERE event_type = 'item_click') as item_clicks,
  COUNT(*) FILTER (WHERE event_type = 'order_placed') as orders,
  SUM((event_data->>'order_total')::DECIMAL) FILTER (WHERE event_type = 'order_placed') as revenue
FROM analytics_events
WHERE created_at >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY merchant_id, DATE(created_at);

CREATE UNIQUE INDEX ON mv_merchant_daily_summary (merchant_id, date);

-- Refresh function
CREATE OR REPLACE FUNCTION refresh_merchant_summary()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_merchant_daily_summary;
END;
$$ LANGUAGE plpgsql;
```

### 2.4 Monitoring Additions

#### Custom Dashboards (Grafana Cloud Free Tier)

```typescript
// lib/observability/grafana.ts
// Push metrics to Grafana Cloud

const GRAFANA_PUSH_URL = process.env.GRAFANA_PUSH_URL;
const GRAFANA_USER = process.env.GRAFANA_USER;
const GRAFANA_PASSWORD = process.env.GRAFANA_PASSWORD;

export async function pushMetric(
  name: string,
  value: number,
  labels: Record<string, string> = {}
) {
  const labelString = Object.entries(labels)
    .map(([k, v]) => `${k}="${v}"`)
    .join(',');

  const body = `${name}{${labelString}} ${value} ${Date.now() * 1000000}`;

  await fetch(GRAFANA_PUSH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      Authorization: `Basic ${Buffer.from(`${GRAFANA_USER}:${GRAFANA_PASSWORD}`).toString('base64')}`,
    },
    body,
  });
}

// Usage
pushMetric('api_request_duration_seconds', 0.245, {
  endpoint: '/api/menu',
  status: '200',
});
```

#### Alert Rules

```yaml
# alerts/critical.yaml
groups:
  - name: critical
    rules:
      - alert: HighErrorRate
        expr: rate(api_errors_total[5m]) / rate(api_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: High error rate detected (>5%)

      - alert: DatabaseConnectionPoolExhausted
        expr: pg_pool_available_connections < 2
        for: 2m
        labels:
          severity: critical

      - alert: CacheHitRateLow
        expr: redis_cache_hit_rate < 0.5
        for: 10m
        labels:
          severity: warning

      - alert: APILatencyHigh
        expr: histogram_quantile(0.95, api_request_duration_seconds) > 0.5
        for: 5m
        labels:
          severity: warning
```

### 2.5 Estimated Effort

| Task                         | Engineering Weeks | Dependency   |
| ---------------------------- | ----------------- | ------------ |
| Trigger.dev setup            | 1                 | None         |
| Notification job migration   | 1.5               | Trigger.dev  |
| Analytics aggregation jobs   | 1                 | Trigger.dev  |
| AI briefing jobs             | 1                 | Trigger.dev  |
| WebSocket/Realtime for chat  | 2                 | None         |
| Read replica configuration   | 0.5               | Supabase Pro |
| Query routing implementation | 1                 | Read replica |
| Analytics partitioning       | 1                 | None         |
| Materialized views           | 1                 | None         |
| Grafana integration          | 1                 | None         |
| Alert configuration          | 0.5               | Grafana      |
| Test coverage (50%)          | 3                 | None         |
| Performance testing suite    | 2                 | None         |
| **Total**                    | **16.5 weeks**    |              |

### 2.6 Key Metrics to Track

| Metric                       | Phase 1 Target | Phase 2 Target | Alert Threshold |
| ---------------------------- | -------------- | -------------- | --------------- |
| API P95 Latency              | <400ms         | <200ms         | >300ms          |
| Cache Hit Rate               | >70%           | >80%           | <70%            |
| Error Rate                   | <1%            | <0.5%          | >1%             |
| Background Job Success Rate  | N/A            | >99%           | <98%            |
| WebSocket Connection Success | N/A            | >99%           | <98%            |
| Database Replication Lag     | N/A            | <100ms         | >500ms          |

### 2.7 Warning Signs (Move to Phase 3)

- Database CPU consistently >70%
- API latency spikes during peak hours
- Background job queue depth >1000
- WebSocket connection drops >5%
- Supabase approaching plan limits
- Multiple concurrent deploys needed

---

## Phase 3: Scale (10K to 100K users) - Month 4-6

> **Goal:** Horizontal scaling, advanced caching, database sharding preparation

### 3.1 Infrastructure Changes

#### Multi-Region Deployment

```typescript
// vercel.json - Multi-region configuration
{
  "regions": ["iad1", "sfo1", "sin1"], // US East, US West, Singapore
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30,
      "memory": 1024
    },
    "app/api/ai/**/*.ts": {
      "maxDuration": 60,
      "memory": 3008
    }
  }
}
```

#### Edge Caching with Vercel KV

```typescript
// lib/cache/edge-cache.ts
import { kv } from '@vercel/kv';

// Edge-optimized caching for static-ish data
export const edgeCache = {
  async getMenu(merchantSlug: string) {
    const key = `menu:${merchantSlug}`;
    const cached = await kv.get(key);

    if (cached) {
      return { data: cached, source: 'cache' };
    }

    const data = await fetchMenuFromDB(merchantSlug);
    await kv.set(key, data, { ex: 300 }); // 5 min TTL

    return { data, source: 'db' };
  },

  async invalidateMenu(merchantSlug: string) {
    await kv.del(`menu:${merchantSlug}`);
    // Also invalidate related keys
    await kv.del(`merchant:${merchantSlug}:config`);
  },
};

// Edge middleware for cache
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/menu/')) {
    const merchantSlug = pathname.split('/')[3];
    const { data, source } = await edgeCache.getMenu(merchantSlug);

    if (source === 'cache') {
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'HIT',
          'Cache-Control': 's-maxage=300',
        },
      });
    }
  }

  return NextResponse.next();
}
```

#### Queue-Based Architecture for High-Volume Operations

```typescript
// lib/queue/event-processor.ts
import { QStash } from '@upstash/qstash';

const qstash = new QStash({
  token: process.env.QSTASH_TOKEN!,
});

export async function queueBulkOperation(
  operation: 'import' | 'export' | 'sync',
  payload: BulkOperationPayload
) {
  await qstash.publishJSON({
    url: `${process.env.VERCEL_URL}/api/workers/${operation}`,
    body: payload,
    retries: 3,
    delay: '0s',
  });
}

// Worker endpoint
// app/api/workers/import/route.ts
export async function POST(request: Request) {
  const payload = await request.json();
  const signature = request.headers.get('upstash-signature');

  // Verify signature
  const isValid = await verifyQStashSignature(signature, payload);
  if (!isValid) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Process in chunks
  const results = await processImportChunks(payload);
  return Response.json({ success: true, processed: results.length });
}
```

### 3.2 Code Changes

#### Request Coalescing

```typescript
// lib/cache/request-coalescing.ts
import { LRUCache } from 'lru-cache';

const inFlightRequests = new LRUCache<string, Promise<any>>({
  max: 1000,
  ttl: 10000, // 10 seconds
});

export async function coalescedFetch<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  // Check if request is already in flight
  const existing = inFlightRequests.get(key);
  if (existing) {
    return existing as Promise<T>;
  }

  // Create new request and store it
  const promise = fetcher().finally(() => {
    inFlightRequests.delete(key);
  });

  inFlightRequests.set(key, promise);
  return promise;
}

// Usage - prevents thundering herd
export async function getMenu(slug: string) {
  return coalescedFetch(`menu:${slug}`, async () => {
    // Only one DB call even with 100 concurrent requests
    return supabase.from('menus').select('*').eq('slug', slug).single();
  });
}
```

#### Tenant Isolation Improvements

```typescript
// lib/tenancy/tenant-context.ts
import { AsyncLocalStorage } from 'async_hooks';

interface TenantContext {
  merchantId: string;
  brandId?: string;
  locationId?: string;
  tier: 'digital_menu' | 'pre_ordering' | 'full_suite';
  features: string[];
}

const tenantStorage = new AsyncLocalStorage<TenantContext>();

export function runWithTenant<T>(
  context: TenantContext,
  fn: () => T | Promise<T>
): T | Promise<T> {
  return tenantStorage.run(context, fn);
}

export function getTenant(): TenantContext | undefined {
  return tenantStorage.getStore();
}

export function requireTenant(): TenantContext {
  const tenant = getTenant();
  if (!tenant) {
    throw new Error('No tenant context available');
  }
  return tenant;
}

// Middleware to set tenant context
export async function tenantMiddleware(request: Request) {
  const merchantId = await getMerchantFromRequest(request);
  const merchant = await getMerchantDetails(merchantId);

  return runWithTenant(
    {
      merchantId,
      brandId: merchant.brand_id,
      locationId: merchant.location_id,
      tier: merchant.tier,
      features: merchant.features,
    },
    () => handleRequest(request)
  );
}
```

### 3.3 Database Changes

#### Logical Sharding Preparation

```sql
-- Migration: 060-sharding-preparation.sql

-- Add shard key to all tenant tables
ALTER TABLE merchants ADD COLUMN shard_id INTEGER NOT NULL DEFAULT 0;
ALTER TABLE menu_items ADD COLUMN shard_id INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN shard_id INTEGER NOT NULL DEFAULT 0;
ALTER TABLE analytics_events ADD COLUMN shard_id INTEGER NOT NULL DEFAULT 0;

-- Shard assignment function
CREATE OR REPLACE FUNCTION assign_shard(merchant_id UUID)
RETURNS INTEGER AS $$
BEGIN
  -- Consistent hashing based on merchant_id
  RETURN abs(hashtext(merchant_id::text)) % 16; -- 16 logical shards
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to auto-assign shard on insert
CREATE OR REPLACE FUNCTION set_shard_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.shard_id = 0 AND NEW.merchant_id IS NOT NULL THEN
    NEW.shard_id := assign_shard(NEW.merchant_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_shard_id
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION set_shard_id();

-- Index on shard_id for future routing
CREATE INDEX CONCURRENTLY idx_orders_shard ON orders (shard_id);
CREATE INDEX CONCURRENTLY idx_analytics_shard ON analytics_events (shard_id);
```

#### Archive Strategy

```sql
-- Migration: 061-archive-strategy.sql

-- Archive table for old analytics
CREATE TABLE analytics_events_archive (
  LIKE analytics_events INCLUDING ALL
);

-- Move data older than 1 year to archive
CREATE OR REPLACE FUNCTION archive_old_analytics()
RETURNS void AS $$
BEGIN
  INSERT INTO analytics_events_archive
  SELECT * FROM analytics_events
  WHERE created_at < NOW() - INTERVAL '1 year';

  DELETE FROM analytics_events
  WHERE created_at < NOW() - INTERVAL '1 year';
END;
$$ LANGUAGE plpgsql;

-- Archive table for completed orders (older than 6 months)
CREATE TABLE orders_archive (
  LIKE orders INCLUDING ALL
);

-- Cold storage for rarely accessed data
CREATE SCHEMA cold_storage;

CREATE TABLE cold_storage.analytics_events_historical (
  year INTEGER,
  month INTEGER,
  data JSONB COMPRESSED
);
```

### 3.4 Monitoring Additions

#### Distributed Tracing

```typescript
// lib/observability/tracing.ts
import { trace, context, SpanStatusCode } from '@opentelemetry/api';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const tracer = trace.getTracer('gudbro-verticals');

export function withTracing<T>(
  name: string,
  fn: () => Promise<T>,
  attributes?: Record<string, string>
): Promise<T> {
  return tracer.startActiveSpan(name, async (span) => {
    try {
      if (attributes) {
        span.setAttributes(attributes);
      }
      const result = await fn();
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) });
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end();
    }
  });
}

// Usage
export async function getMenu(slug: string) {
  return withTracing(
    'getMenu',
    async () => {
      return withTracing('cache.get', async () => {
        return redis.get(`menu:${slug}`);
      });

      // ... cache miss logic with nested spans
    },
    { 'merchant.slug': slug }
  );
}
```

#### Performance Budgets

```typescript
// lib/observability/performance-budgets.ts
export const PerformanceBudgets = {
  api: {
    menu: { p50: 50, p95: 150, p99: 300 },
    orders: { p50: 100, p95: 300, p99: 500 },
    ai: { p50: 500, p95: 2000, p99: 5000 },
  },
  database: {
    simple: { p50: 5, p95: 20, p99: 50 },
    complex: { p50: 50, p95: 150, p99: 300 },
    aggregate: { p50: 100, p95: 500, p99: 1000 },
  },
} as const;

export function checkBudget(
  category: keyof typeof PerformanceBudgets,
  operation: string,
  duration: number
): { passed: boolean; violation?: string } {
  const budget = PerformanceBudgets[category][operation];
  if (!budget) return { passed: true };

  if (duration > budget.p99) {
    return {
      passed: false,
      violation: `P99 exceeded: ${duration}ms > ${budget.p99}ms`,
    };
  }
  return { passed: true };
}
```

### 3.5 Estimated Effort

| Task                          | Engineering Weeks | Dependency  |
| ----------------------------- | ----------------- | ----------- |
| Multi-region deployment       | 2                 | None        |
| Edge caching implementation   | 2                 | None        |
| Queue-based architecture      | 3                 | Trigger.dev |
| Request coalescing            | 1                 | None        |
| Tenant isolation improvements | 2                 | None        |
| Sharding preparation          | 2                 | None        |
| Archive strategy              | 1.5               | None        |
| Distributed tracing           | 2                 | None        |
| Performance budgets           | 1                 | Tracing     |
| Test coverage (60%)           | 4                 | None        |
| Load testing infrastructure   | 3                 | None        |
| **Total**                     | **23.5 weeks**    |             |

### 3.6 Key Metrics

| Metric               | Phase 2 Target | Phase 3 Target | Alert Threshold |
| -------------------- | -------------- | -------------- | --------------- |
| API P95 Latency      | <200ms         | <150ms         | >200ms          |
| Cache Hit Rate       | >80%           | >90%           | <85%            |
| Error Rate           | <0.5%          | <0.1%          | >0.3%           |
| Cross-Region Latency | N/A            | <50ms          | >100ms          |
| Archive Success Rate | N/A            | 100%           | <99%            |

### 3.7 Warning Signs (Move to Phase 4)

- Single region latency unacceptable
- Database storage approaching limits
- Need for more than 10 background workers
- Multi-brand/multi-location features requested
- Enterprise sales pipeline active
- Compliance requirements emerging (SOC2, GDPR)

---

## Phase 4: Hyper-scale (100K to 1M users) - Month 7-12

> **Goal:** True horizontal scaling, enterprise features, compliance

### 4.1 Infrastructure Changes

#### Database Sharding (Citus or Supabase Enterprise)

```sql
-- If using Citus (PostgreSQL extension for sharding)
-- Migration: 070-citus-sharding.sql

-- Distribute tables by merchant_id
SELECT create_distributed_table('merchants', 'id');
SELECT create_distributed_table('menu_items', 'merchant_id');
SELECT create_distributed_table('orders', 'merchant_id');
SELECT create_distributed_table('analytics_events', 'merchant_id');

-- Reference tables (replicated to all shards)
SELECT create_reference_table('countries');
SELECT create_reference_table('languages');
SELECT create_reference_table('currencies');

-- Colocate related tables
SELECT colocation_id FROM pg_dist_colocation
WHERE colocation_id = (
  SELECT colocation_id FROM pg_dist_partition
  WHERE logicalrelid = 'orders'::regclass
);
```

#### Event-Driven Architecture

```typescript
// lib/events/event-bus.ts
import { SNS } from '@aws-sdk/client-sns';
import { SQS } from '@aws-sdk/client-sqs';

// Or use Upstash Kafka for simpler setup
import { Kafka } from '@upstash/kafka';

const kafka = new Kafka({
  url: process.env.UPSTASH_KAFKA_REST_URL!,
  username: process.env.UPSTASH_KAFKA_REST_USERNAME!,
  password: process.env.UPSTASH_KAFKA_REST_PASSWORD!,
});

export const eventBus = {
  async publish(topic: string, event: DomainEvent) {
    await kafka.producer().produce(
      topic,
      JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        version: '1.0',
      })
    );
  },

  async subscribe(
    topic: string,
    handler: (event: DomainEvent) => Promise<void>
  ) {
    const consumer = kafka.consumer();
    // Consume in batches for efficiency
    const messages = await consumer.consume({
      consumerGroupId: `gudbro-${topic}-consumer`,
      instanceId: process.env.INSTANCE_ID,
      topics: [topic],
      autoOffsetReset: 'latest',
    });

    for (const message of messages) {
      await handler(JSON.parse(message.value));
    }
  },
};

// Domain events
interface DomainEvent {
  type: string;
  aggregateId: string;
  aggregateType: string;
  payload: Record<string, unknown>;
  metadata: {
    correlationId: string;
    causationId: string;
    userId?: string;
    merchantId?: string;
  };
}

// Event types
export const EventTypes = {
  ORDER_CREATED: 'order.created',
  ORDER_COMPLETED: 'order.completed',
  MENU_UPDATED: 'menu.updated',
  MERCHANT_ONBOARDED: 'merchant.onboarded',
  AI_INSIGHT_GENERATED: 'ai.insight.generated',
} as const;
```

#### Service Mesh for Microservices

```yaml
# kubernetes/istio-config.yaml (if moving to K8s)
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: menu-service
spec:
  hosts:
    - menu-service
  http:
    - match:
        - headers:
            x-canary:
              exact: 'true'
      route:
        - destination:
            host: menu-service
            subset: canary
    - route:
        - destination:
            host: menu-service
            subset: stable
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: menu-service
spec:
  host: menu-service
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        h2UpgradePolicy: UPGRADE
    circuitBreaker:
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 30s
```

### 4.2 Code Changes

#### CQRS Pattern Implementation

```typescript
// lib/cqrs/commands.ts
interface Command {
  type: string;
  payload: Record<string, unknown>;
  metadata: CommandMetadata;
}

interface CommandMetadata {
  correlationId: string;
  timestamp: Date;
  userId: string;
  merchantId: string;
}

// Command handlers
const commandHandlers: Record<string, CommandHandler> = {
  CreateOrder: async (cmd: CreateOrderCommand) => {
    // Validate
    const validation = await validateOrder(cmd.payload);
    if (!validation.success) {
      throw new ValidationError(validation.errors);
    }

    // Execute
    const order = await orderRepository.create(cmd.payload);

    // Emit events
    await eventBus.publish(EventTypes.ORDER_CREATED, {
      type: EventTypes.ORDER_CREATED,
      aggregateId: order.id,
      aggregateType: 'Order',
      payload: order,
      metadata: cmd.metadata,
    });

    return order;
  },
  // ... other handlers
};

// lib/cqrs/queries.ts
interface Query {
  type: string;
  filters: Record<string, unknown>;
  pagination?: PaginationParams;
}

// Query handlers use read models
const queryHandlers: Record<string, QueryHandler> = {
  GetMerchantDashboard: async (query: GetMerchantDashboardQuery) => {
    // Use read replica and materialized views
    return readDb
      .from('mv_merchant_dashboard')
      .select('*')
      .eq('merchant_id', query.filters.merchantId)
      .single();
  },
  // ... other handlers
};
```

#### Feature Flags System

```typescript
// lib/features/feature-flags.ts
import { Statsig } from 'statsig-node';

await Statsig.initialize(process.env.STATSIG_SERVER_KEY!);

export const featureFlags = {
  async isEnabled(
    flagName: string,
    context: { userId?: string; merchantId?: string; tier?: string }
  ): Promise<boolean> {
    const user = {
      userID: context.userId ?? 'anonymous',
      custom: {
        merchantId: context.merchantId,
        tier: context.tier,
      },
    };

    return Statsig.checkGate(user, flagName);
  },

  async getConfig(
    configName: string,
    context: { userId?: string; merchantId?: string }
  ): Promise<Record<string, unknown>> {
    const user = {
      userID: context.userId ?? 'anonymous',
      custom: { merchantId: context.merchantId },
    };

    const config = Statsig.getConfig(user, configName);
    return config.value;
  },
};

// Usage
const isNewCheckoutEnabled = await featureFlags.isEnabled('new_checkout_flow', {
  merchantId,
  tier: merchant.tier,
});
```

### 4.3 Database Changes

#### Read/Write Split with Proper Routing

```typescript
// lib/database/connection-router.ts
type QueryIntent = 'read' | 'write' | 'aggregate';

interface RoutedConnection {
  primary: SupabaseClient;
  replicas: SupabaseClient[];
  replicaIndex: number;
}

class ConnectionRouter {
  private connections: Map<string, RoutedConnection> = new Map();

  getConnection(merchantId: string, intent: QueryIntent): SupabaseClient {
    const shard = this.getShardForMerchant(merchantId);
    const routed = this.connections.get(shard);

    if (intent === 'write') {
      return routed.primary;
    }

    // Round-robin for reads
    routed.replicaIndex = (routed.replicaIndex + 1) % routed.replicas.length;
    return routed.replicas[routed.replicaIndex];
  }

  private getShardForMerchant(merchantId: string): string {
    const shardId = Math.abs(hashCode(merchantId)) % 16;
    return `shard-${shardId}`;
  }
}

export const connectionRouter = new ConnectionRouter();
```

### 4.4 Enterprise Features

#### Audit Logging

```sql
-- Migration: 075-audit-logging.sql

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partition by month
CREATE TABLE audit_log_partitioned (
  LIKE audit_log INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- Trigger for automatic audit logging
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (
    merchant_id,
    user_id,
    action,
    resource_type,
    resource_id,
    old_values,
    new_values
  ) VALUES (
    COALESCE(NEW.merchant_id, OLD.merchant_id),
    current_setting('app.current_user_id', true)::UUID,
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply to sensitive tables
CREATE TRIGGER audit_merchants AFTER INSERT OR UPDATE OR DELETE ON merchants
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER audit_orders AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

#### Compliance (GDPR, SOC2)

```typescript
// lib/compliance/gdpr.ts
export const gdpr = {
  async exportUserData(userId: string): Promise<UserDataExport> {
    const [profile, orders, analytics, preferences] = await Promise.all([
      db.from('accounts').select('*').eq('id', userId).single(),
      db.from('orders').select('*').eq('user_id', userId),
      db.from('analytics_events').select('*').eq('user_id', userId),
      db.from('user_preferences').select('*').eq('user_id', userId).single(),
    ]);

    return {
      profile: sanitizeForExport(profile),
      orders: orders.map(sanitizeForExport),
      analytics: analytics.map(sanitizeForExport),
      preferences: sanitizeForExport(preferences),
      exportedAt: new Date().toISOString(),
    };
  },

  async deleteUserData(userId: string): Promise<DeletionReceipt> {
    // Soft delete with anonymization
    await db.rpc('anonymize_user_data', { user_id: userId });

    // Schedule hard delete after retention period
    await queueJob(
      'hard_delete_user',
      { userId },
      {
        delay: '90 days', // Legal retention period
      }
    );

    return {
      userId,
      requestedAt: new Date().toISOString(),
      scheduledDeletionAt: add(new Date(), { days: 90 }).toISOString(),
    };
  },
};
```

### 4.5 Estimated Effort

| Task                      | Engineering Weeks | Dependency    |
| ------------------------- | ----------------- | ------------- |
| Database sharding         | 6                 | None          |
| Event-driven architecture | 4                 | None          |
| Microservices extraction  | 8                 | Event bus     |
| CQRS implementation       | 4                 | Event bus     |
| Feature flags system      | 2                 | None          |
| Connection routing        | 2                 | Sharding      |
| Audit logging             | 2                 | None          |
| GDPR compliance           | 3                 | Audit logging |
| SOC2 preparation          | 4                 | Audit logging |
| Test coverage (70%)       | 6                 | None          |
| Chaos engineering setup   | 4                 | None          |
| **Total**                 | **45 weeks**      |               |

### 4.6 Key Metrics

| Metric               | Phase 3 Target | Phase 4 Target | Alert Threshold |
| -------------------- | -------------- | -------------- | --------------- |
| API P95 Latency      | <150ms         | <100ms         | >150ms          |
| Cache Hit Rate       | >90%           | >95%           | <90%            |
| Error Rate           | <0.1%          | <0.05%         | >0.1%           |
| Shard Balance        | N/A            | <10% variance  | >20% variance   |
| Event Processing Lag | N/A            | <1s            | >5s             |
| Compliance Coverage  | N/A            | 100%           | <100%           |

### 4.7 Warning Signs (Move to Phase 5)

- Need for geographic data residency
- Multi-cloud requirements
- > 50 microservices complexity
- Sub-50ms latency requirements
- 10M+ daily active users projected
- International expansion with local regulations

---

## Phase 5: Massive Scale (1M to 10M users) - Year 2

> **Goal:** Global scale, multi-cloud resilience, platform economics

### 5.1 Infrastructure Changes

#### Global Data Mesh

```typescript
// lib/data-mesh/federation.ts
interface DataProduct {
  domain: string;
  name: string;
  schema: JSONSchema;
  sla: {
    latency: number;
    availability: number;
    freshness: number;
  };
  owner: string;
  consumers: string[];
}

const dataProducts: DataProduct[] = [
  {
    domain: 'menu',
    name: 'merchant-menus',
    schema: merchantMenuSchema,
    sla: { latency: 50, availability: 99.99, freshness: 60 },
    owner: 'menu-team',
    consumers: ['customer-app', 'analytics', 'ai-services'],
  },
  {
    domain: 'orders',
    name: 'order-events',
    schema: orderEventSchema,
    sla: { latency: 100, availability: 99.99, freshness: 5 },
    owner: 'orders-team',
    consumers: ['kitchen-display', 'analytics', 'notifications'],
  },
  // ... more data products
];
```

#### Multi-Cloud Strategy

```yaml
# terraform/multi-cloud.tf
module "primary_region" {
source = "./modules/vercel-region"

region = "iad1"
database = {
provider = "supabase"
tier = "enterprise"
}
cache = {
provider = "upstash"
tier = "enterprise"
}
}

module "apac_region" {
source = "./modules/aws-region"

region = "ap-southeast-1"
database = {
provider = "aws-aurora"
instance_class = "db.r6g.2xlarge"
replica_count = 3
}
cache = {
provider = "elasticache"
node_type = "cache.r6g.xlarge"
}
}

module "eu_region" {
source = "./modules/gcp-region"

region = "europe-west1"
database = {
provider = "cloud-sql"
tier = "db-custom-8-32768"
}
cache = {
provider = "memorystore"
memory_size_gb = 16
}
}
```

#### Edge Computing for Ultra-Low Latency

```typescript
// Edge workers for menu serving
// Deployed to 200+ edge locations via Cloudflare/Vercel Edge

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const merchantSlug = url.pathname.split('/')[2];

    // Check edge cache (0-5ms)
    const cached = await env.MENU_CACHE.get(merchantSlug);
    if (cached) {
      return new Response(cached, {
        headers: { 'X-Cache': 'HIT', 'X-Edge-Location': env.CF_REGION },
      });
    }

    // Fetch from nearest regional cache (10-50ms)
    const regional = await env.REGIONAL_CACHE.get(merchantSlug);
    if (regional) {
      await env.MENU_CACHE.put(merchantSlug, regional, { expirationTtl: 60 });
      return new Response(regional, {
        headers: { 'X-Cache': 'REGIONAL', 'X-Edge-Location': env.CF_REGION },
      });
    }

    // Fetch from origin (100-500ms)
    const origin = await fetchFromOrigin(merchantSlug);
    await Promise.all([
      env.MENU_CACHE.put(merchantSlug, origin, { expirationTtl: 60 }),
      env.REGIONAL_CACHE.put(merchantSlug, origin, { expirationTtl: 300 }),
    ]);

    return new Response(origin, {
      headers: { 'X-Cache': 'MISS', 'X-Edge-Location': env.CF_REGION },
    });
  },
};
```

### 5.2 Platform Economics

#### Marketplace Architecture

```typescript
// lib/marketplace/app-platform.ts
interface MarketplaceApp {
  id: string;
  name: string;
  developer: {
    id: string;
    name: string;
    verified: boolean;
  };
  category: 'integration' | 'analytics' | 'marketing' | 'operations';
  pricing: {
    model: 'free' | 'paid' | 'freemium';
    monthlyPrice?: number;
    usagePrice?: {
      unit: string;
      price: number;
    };
  };
  permissions: string[];
  webhooks: WebhookConfig[];
}

export const marketplace = {
  async installApp(merchantId: string, appId: string): Promise<Installation> {
    const app = await getApp(appId);

    // Create OAuth credentials for app
    const credentials = await createAppCredentials(merchantId, app);

    // Register webhooks
    for (const webhook of app.webhooks) {
      await registerWebhook(merchantId, webhook);
    }

    // Track installation
    await db.from('app_installations').insert({
      merchant_id: merchantId,
      app_id: appId,
      credentials_id: credentials.id,
      installed_at: new Date(),
    });

    // Emit event
    await eventBus.publish('marketplace.app.installed', {
      merchantId,
      appId,
      developerId: app.developer.id,
    });

    return { credentials, status: 'installed' };
  },
};
```

### 5.3 Estimated Effort

| Task                        | Engineering Weeks | Dependency  |
| --------------------------- | ----------------- | ----------- |
| Global data mesh            | 12                | None        |
| Multi-cloud deployment      | 16                | None        |
| Edge computing layer        | 8                 | None        |
| Data residency compliance   | 8                 | Multi-cloud |
| Marketplace platform        | 16                | None        |
| API gateway (public APIs)   | 8                 | None        |
| Self-healing infrastructure | 8                 | All         |
| Test coverage (80%)         | 12                | None        |
| **Total**                   | **88 weeks**      |             |

---

## Technology Recommendations

### Recommended Stack by Phase

| Category          | Phase 1-2                 | Phase 3-4            | Phase 5                       |
| ----------------- | ------------------------- | -------------------- | ----------------------------- |
| **Caching**       | Upstash Redis             | Upstash + Vercel KV  | Multi-region Redis Enterprise |
| **Queue**         | Trigger.dev               | Trigger.dev + QStash | Kafka (Upstash/Confluent)     |
| **Database**      | Supabase                  | Supabase + Citus     | Multi-cloud Postgres + Citus  |
| **CDN**           | Vercel Edge               | Vercel Edge          | Cloudflare + Vercel           |
| **Observability** | Sentry + Vercel Analytics | Grafana Cloud        | Datadog Enterprise            |
| **Feature Flags** | Env vars                  | Statsig              | LaunchDarkly Enterprise       |
| **Auth**          | Supabase Auth             | Supabase Auth        | Auth0 Enterprise              |
| **Search**        | Postgres FTS              | Typesense            | Elasticsearch                 |

### Tool Comparison Matrix

#### Caching: Upstash vs Vercel KV vs Momento

| Feature            | Upstash         | Vercel KV     | Momento         |
| ------------------ | --------------- | ------------- | --------------- |
| Serverless         | Yes             | Yes           | Yes             |
| Global             | Yes             | Yes (limited) | Yes             |
| Pricing            | Pay-per-request | Included\*    | Pay-per-request |
| Max Size           | 100MB           | 256KB         | 1MB             |
| Vercel Integration | Excellent       | Native        | Good            |
| **Recommendation** | **Phase 1-3**   | Edge only     | Phase 4+        |

#### Background Jobs: Trigger.dev vs Inngest vs BullMQ

| Feature              | Trigger.dev       | Inngest           | BullMQ           |
| -------------------- | ----------------- | ----------------- | ---------------- |
| Serverless           | Yes               | Yes               | No (needs Redis) |
| Supabase Integration | Excellent         | Good              | Manual           |
| Cron Jobs            | Yes               | Yes               | Yes              |
| Durability           | Yes               | Yes               | Yes              |
| Pricing              | Free tier + usage | Free tier + usage | Self-hosted      |
| **Recommendation**   | **Phase 1-4**     | Simple use cases  | Self-hosted only |

---

## Cost Projections

### Monthly Infrastructure Costs by Phase

| Service       | Phase 1 | Phase 2  | Phase 3    | Phase 4     | Phase 5     |
| ------------- | ------- | -------- | ---------- | ----------- | ----------- |
| Vercel        | $20     | $150     | $500       | $2,000      | $10,000     |
| Supabase      | $25     | $75      | $500       | $2,500      | $15,000     |
| Upstash Redis | $0      | $50      | $200       | $500        | $2,000      |
| Trigger.dev   | $0      | $29      | $99        | $399        | $999        |
| Sentry        | $0      | $29      | $89        | $399        | $999        |
| Grafana Cloud | $0      | $0       | $99        | $499        | $2,000      |
| OpenAI        | $50     | $200     | $1,000     | $5,000      | $30,000     |
| CDN/Edge      | $0      | $0       | $100       | $500        | $5,000      |
| Other         | $0      | $50      | $200       | $1,000      | $10,000     |
| **Total**     | **$95** | **$583** | **$2,787** | **$12,797** | **$75,998** |

### Cost Per User

| Phase   | Users      | Monthly Cost | Cost/User |
| ------- | ---------- | ------------ | --------- |
| Phase 1 | 1,000      | $95          | $0.095    |
| Phase 2 | 10,000     | $583         | $0.058    |
| Phase 3 | 100,000    | $2,787       | $0.028    |
| Phase 4 | 1,000,000  | $12,797      | $0.013    |
| Phase 5 | 10,000,000 | $75,998      | $0.008    |

---

## Team Scaling

### Engineering Team Size by Phase

| Phase   | Users | Engineers | Ratio  |
| ------- | ----- | --------- | ------ |
| Phase 1 | 1K    | 2-3       | 1:500  |
| Phase 2 | 10K   | 4-6       | 1:2K   |
| Phase 3 | 100K  | 8-12      | 1:10K  |
| Phase 4 | 1M    | 20-30     | 1:40K  |
| Phase 5 | 10M   | 50-80     | 1:150K |

### Role Distribution (Phase 4+)

```
Engineering Organization (~30 engineers)

Platform Team (8)
├── Infrastructure (3)
├── Database/Data (3)
└── Developer Experience (2)

Product Teams (18)
├── Merchant Experience (6)
├── Customer Experience (4)
├── AI/ML (4)
└── Integrations (4)

Reliability Team (4)
├── SRE (2)
└── Security (2)
```

---

## Critical Path Analysis

### Phase 1 Critical Path

```
Week 1: Redis + Rate Limiting + Sentry
        ↓
Week 2: Query Optimization + Indexes
        ↓
Week 3: Async Notifications + Logging
        ↓
Week 4: CDN Configuration + Testing
```

**Blockers:**

1. Redis setup blocks rate limiting
2. Database migrations block query optimization
3. All Phase 1 blocks Phase 2

### Phase 2 Critical Path

```
Week 1-2: Trigger.dev Setup
          ↓
Week 3-4: Background Job Migration
          ↓
Week 5-6: WebSocket Implementation
          ↓
Week 7-8: Database Partitioning + Views
```

**Blockers:**

1. Background jobs block analytics aggregation
2. Supabase Pro required for read replicas
3. Materialized views block dashboard performance

---

## Risk Matrix

| Risk                        | Probability | Impact   | Mitigation                       |
| --------------------------- | ----------- | -------- | -------------------------------- |
| Supabase scaling limits     | Medium      | High     | Plan migration path to Citus     |
| Vercel cold starts          | Low         | Medium   | Edge caching, keep-alive         |
| OpenAI rate limits          | Medium      | High     | Queue + retry, multi-provider    |
| Database migration failures | Medium      | Critical | Blue-green deployments           |
| Cache invalidation bugs     | High        | Medium   | TTL-based, event-driven          |
| GDPR compliance gaps        | Medium      | Critical | Audit early, legal review        |
| Cost overruns               | Medium      | Medium   | Budgets + alerts + kill switches |
| Team scaling friction       | High        | High     | Document + automate everything   |

---

## Appendix A: Migration Checklists

### Phase 1 Go-Live Checklist

- [ ] Upstash Redis configured and tested
- [ ] Rate limiting deployed to all API routes
- [ ] Top 10 N+1 queries fixed
- [ ] Critical indexes created
- [ ] Sentry error tracking active
- [ ] Structured logging deployed
- [ ] Cache hit rate >50%
- [ ] API P95 <400ms
- [ ] All integration tests passing
- [ ] Runbook for common issues documented

### Phase 2 Go-Live Checklist

- [ ] Trigger.dev jobs processing reliably
- [ ] All notifications async
- [ ] WebSocket chat functional
- [ ] Analytics aggregation automated
- [ ] Read replica configured and routed
- [ ] Grafana dashboards active
- [ ] Alert rules configured
- [ ] Load tested to 2x expected traffic
- [ ] Rollback procedures tested

---

## Appendix B: Key SQL Migrations Summary

| Migration | Phase | Purpose                |
| --------- | ----- | ---------------------- |
| 050       | 1     | Performance indexes    |
| 051       | 1     | Notification queue     |
| 055       | 2     | Analytics partitioning |
| 056       | 2     | Materialized views     |
| 060       | 3     | Sharding preparation   |
| 061       | 3     | Archive strategy       |
| 070       | 4     | Citus distribution     |
| 075       | 4     | Audit logging          |

---

## Appendix C: Monitoring Dashboard Template

### Essential Metrics (All Phases)

1. **API Health**
   - Request rate
   - Error rate
   - P50/P95/P99 latency

2. **Cache Health**
   - Hit rate
   - Miss rate
   - Eviction rate

3. **Database Health**
   - Connection pool usage
   - Query time percentiles
   - Replication lag

4. **Business Metrics**
   - Active merchants
   - Orders per minute
   - Revenue per hour

---

**Document Changelog:**

| Version | Date       | Changes                 |
| ------- | ---------- | ----------------------- |
| 1.0     | 2026-01-17 | Initial roadmap created |

---

_This document should be reviewed and updated quarterly or when significant infrastructure changes occur._
