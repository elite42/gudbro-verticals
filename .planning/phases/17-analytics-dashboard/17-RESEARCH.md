# Phase 17: Analytics Dashboard - Research

**Researched:** 2026-01-30
**Domain:** Admin analytics dashboard with charts, KPI cards, and SQL aggregation queries over fb_submissions and fb_tasks
**Confidence:** HIGH

## Summary

This phase builds an analytics dashboard page for platform admins to visualize feedback data from the existing `fb_submissions` and `fb_tasks` tables. The four requirements are: (1) submission volume over time chart, (2) breakdown by type and vertical, (3) top requested features ranked by linked submission count, and (4) average response time metrics. No new data collection is needed -- all data exists in the schema from migration 082.

The critical discovery is that **no charting library is currently installed** in the backoffice. The existing platform page (`/platform`) uses only static mock data with progress bars (CSS `div` with percentage widths) -- no actual charts. We need to add a charting library. **Recharts** is the recommendation: it is the most popular React charting library, built specifically for React's component model, uses SVG rendering (good for the data volumes we'll have -- hundreds to low thousands of feedback entries, not millions), and has excellent TypeScript support. It is declarative and composable, matching the existing codebase patterns.

The SQL aggregation queries are straightforward. All four requirements map directly to columns on `fb_submissions` (for volume over time, breakdown by type/vertical) and `fb_tasks` (for top features ranked by `submission_count`, and response time calculated from `created_at` to `resolved_at` or notification `created_at`). The existing API route pattern (auth check via `createClient()`, query via `supabaseAdmin`) from Phase 16 should be followed exactly.

**Primary recommendation:** Install `recharts` for charting. Build two new API routes (analytics/volume and analytics/summary) that return pre-aggregated data from SQL. Build the dashboard page at `/platform/feedback-analytics` with KPI cards at top, time-series line chart, breakdown bar/pie charts, and a top features table. Follow the existing platform page card styling (`rounded-xl border border-gray-200 bg-white p-6`).

## Standard Stack

### Core

| Library                 | Version             | Purpose                        | Why Standard                                                                                                                       |
| ----------------------- | ------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `recharts`              | ^2.15               | Charts (line, bar, pie)        | Most popular React charting library; declarative, composable, SVG-based; excellent for admin dashboards with moderate data volumes |
| `date-fns`              | ^4.1.0 (installed)  | Date formatting and arithmetic | Already used across backoffice for relative dates, date ranges                                                                     |
| `@supabase/supabase-js` | ^2.86.2 (installed) | Database queries               | Already used; supabaseAdmin for cross-merchant admin access                                                                        |

### Supporting

| Library                   | Version              | Purpose                       | When to Use                |
| ------------------------- | -------------------- | ----------------------------- | -------------------------- |
| `lucide-react`            | ^0.555.0 (installed) | Icons for KPI cards           | Trend arrows, metric icons |
| `@radix-ui/react-tooltip` | ^1.1.0 (installed)   | Info tooltips on metric cards | Explain what metrics mean  |

### Alternatives Considered

| Instead of              | Could Use                        | Tradeoff                                                                                                      |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `recharts`              | `react-chartjs-2` (Chart.js)     | Canvas-based = better for huge datasets, but less React-native feel; Recharts is simpler for our data volumes |
| `recharts`              | `tremor`                         | Even simpler API but more opinionated styling; harder to match existing Tailwind patterns                     |
| `recharts`              | CSS-only bar charts (div widths) | Already used in platform page; insufficient for time-series line charts                                       |
| Server-side aggregation | Client-side aggregation          | Client-side would require fetching all raw submissions; server-side SQL aggregation is far more efficient     |

**Installation:**

```bash
cd apps/backoffice && pnpm add recharts
```

Note: Recharts ships with its own types. No `@types/recharts` needed.

## Architecture Patterns

### Recommended Project Structure

```
apps/backoffice/
├── app/
│   ├── (dashboard)/platform/feedback-analytics/
│   │   └── page.tsx                          # NEW - Analytics dashboard page
│   └── api/feedback/analytics/
│       ├── volume/route.ts                   # NEW - Time-series submission volume
│       └── summary/route.ts                  # NEW - Breakdown, top features, response times
├── components/feedback-analytics/
│   ├── AnalyticsDashboard.tsx                # NEW - Main dashboard client component
│   ├── VolumeChart.tsx                       # NEW - Line chart: submissions over time
│   ├── TypeBreakdown.tsx                     # NEW - Bar or pie chart: by type
│   ├── VerticalBreakdown.tsx                 # NEW - Bar chart: by vertical
│   ├── TopFeatures.tsx                       # NEW - Ranked list: features by submission_count
│   ├── ResponseTimeMetrics.tsx               # NEW - KPI cards: avg acknowledgment + resolution time
│   └── TimeRangeSelector.tsx                 # NEW - Time range filter (7d, 30d, 90d, custom)
└── lib/feedback/
    └── notification-utils.ts                 # EXISTING - unchanged
```

### Pattern 1: Admin API Route with SQL Aggregation

**What:** API routes that use `supabaseAdmin` to run aggregation queries across all merchants. Auth check first, then SQL via Supabase's `.rpc()` or direct queries with `.select()` and grouping.
**When to use:** All analytics API routes.
**Example:**

```typescript
// app/api/feedback/analytics/volume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { subDays, format } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Auth check
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse time range from query params
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '30', 10);
  const startDate = subDays(new Date(), days).toISOString();

  // Query: submission count per day
  const { data, error } = await supabaseAdmin
    .from('fb_submissions')
    .select('created_at')
    .gte('created_at', startDate)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Aggregate client-side (group by date) -- for moderate data volumes
  // Alternatively use a Postgres function for large volumes
  const volumeByDay: Record<string, number> = {};
  for (const row of data || []) {
    const day = format(new Date(row.created_at), 'yyyy-MM-dd');
    volumeByDay[day] = (volumeByDay[day] || 0) + 1;
  }

  const series = Object.entries(volumeByDay).map(([date, count]) => ({
    date,
    count,
  }));

  return NextResponse.json({ volume: series });
}
```

### Pattern 2: Recharts Line Chart Component

**What:** A declarative Recharts `LineChart` for submission volume over time. Uses `ResponsiveContainer` for auto-sizing.
**When to use:** The volume-over-time chart.
**Example:**

```typescript
// components/feedback-analytics/VolumeChart.tsx
'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface VolumeDataPoint {
  date: string;
  count: number;
}

export function VolumeChart({ data }: { data: VolumeDataPoint[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Submission Volume
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(val) => {
              const d = new Date(val);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
          />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### Pattern 3: KPI Metric Card (Existing Platform Page Style)

**What:** Stat cards matching the existing platform page pattern. Same styling: `rounded-xl border border-gray-200 bg-white p-6`.
**When to use:** Top-level KPI row (total submissions, avg response time, etc).
**Example:**

```typescript
// Reusable metric card following existing platform page pattern
function MetricCard({
  label,
  value,
  subtitle,
  subtitleColor = 'text-gray-500',
}: {
  label: string;
  value: string | number;
  subtitle: string;
  subtitleColor?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className={`mt-1 text-sm ${subtitleColor}`}>{subtitle}</p>
    </div>
  );
}
```

### Pattern 4: Time Range Selector

**What:** Preset buttons (7d, 30d, 90d, All) for selecting the analytics time window. Simple button group, no date picker needed for v1.
**When to use:** Top of analytics page, passed as query param to API.
**Example:**

```typescript
const TIME_RANGES = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: '90 days', value: 90 },
  { label: 'All time', value: 0 },
] as const;
```

### Anti-Patterns to Avoid

- **Client-side aggregation of raw submissions:** Do NOT fetch all fb_submissions to the client and aggregate in JavaScript. Use SQL aggregation on the server. Even for moderate volumes, this is wasteful and slow.
- **Separate API call per chart:** Do NOT make 4+ separate API calls (one per chart). Batch related metrics into 1-2 API routes (volume endpoint + summary endpoint). This reduces waterfalls and auth checks.
- **Using Recharts SSR:** Recharts uses SVG and requires the DOM. It must be in a `'use client'` component. Do not try to server-render Recharts -- it will fail.
- **Installing Chart.js AND Recharts:** Pick one. Recharts is sufficient for all four requirements. Don't add two charting libraries.
- **Hard-coding time ranges in SQL:** Always parameterize the date range. Use query params to let the frontend control the time window.

## Don't Hand-Roll

| Problem                 | Don't Build                              | Use Instead                                     | Why                                                         |
| ----------------------- | ---------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| Line/bar/pie charts     | Custom SVG rendering                     | `recharts` components                           | 100+ edge cases (axes, tooltips, responsiveness, animation) |
| Date arithmetic         | Manual date math                         | `date-fns` (subDays, format, differenceInHours) | Already installed; handles timezone, DST edge cases         |
| Responsive chart sizing | Manual resize listeners                  | `ResponsiveContainer` from recharts             | Handles resize, debouncing, parent container detection      |
| SQL date grouping       | Custom GROUP BY with string manipulation | `date_trunc('day', created_at)` in Postgres     | Built-in Postgres function, handles timezones correctly     |
| Number formatting       | Manual toLocaleString everywhere         | Reusable `formatNumber()` helper                | Consistent formatting, locale-aware                         |

**Key insight:** The analytics data model is already built. `fb_submissions` has `created_at`, `type`, `vertical`, `status`, `processed_at`. `fb_tasks` has `submission_count`, `created_at`, `resolved_at`, `type`. All four requirements map directly to SQL queries on existing columns.

## Common Pitfalls

### Pitfall 1: Recharts in Server Components

**What goes wrong:** Import error or hydration mismatch when Recharts components are used in a Server Component.
**Why it happens:** Recharts requires browser DOM APIs (SVG rendering). Next.js 14 defaults to Server Components.
**How to avoid:** All chart components MUST have `'use client'` directive. The page.tsx can be a Server Component that renders a client component wrapper.
**Warning signs:** "window is not defined" error, hydration mismatch warnings.

### Pitfall 2: Empty State When No Data Exists

**What goes wrong:** Charts render with empty axes, broken tooltips, or throw errors when the data array is empty.
**Why it happens:** Recharts doesn't always handle `data={[]}` gracefully. Empty arrays can cause XAxis/YAxis to render with NaN ticks.
**How to avoid:** Check `data.length === 0` before rendering chart. Show an empty state component with a message like "No submissions in this time range."
**Warning signs:** Charts showing NaN labels, blank areas, console errors about invalid data.

### Pitfall 3: Response Time Calculation Without Acknowledgment Timestamp

**What goes wrong:** FBAN-04 asks for "time from submission to acknowledgment" but there is no explicit `acknowledged_at` timestamp on `fb_submissions`.
**Why it happens:** The schema stores `processed_at` (when AI processed the submission) and links to `fb_tasks` which has `created_at` (when the task was created from the submission). For "acknowledgment", the closest proxy is either `fb_submissions.processed_at` (AI acknowledged) or the first `fb_merchant_notifications` of type `'acknowledged'`.
**How to avoid:** Define "acknowledgment time" as `fb_submissions.processed_at - fb_submissions.created_at` (time for AI to process). Define "resolution time" as `fb_tasks.resolved_at - fb_tasks.created_at` (time from task creation to resolution). Document these definitions clearly in the UI with tooltips.
**Warning signs:** Misleading metrics if undefined; users expecting manual acknowledgment tracking.

### Pitfall 4: N+1 Query Pattern for Analytics

**What goes wrong:** Making one query per task to count submissions, or one query per day for volume counts. Extremely slow for any meaningful data volume.
**Why it happens:** Using the existing task-detail API pattern (fetch one, then fetch related) instead of aggregate queries.
**How to avoid:** Use aggregate SQL: `GROUP BY date_trunc('day', created_at)` for volume, `GROUP BY type` for breakdown, `ORDER BY submission_count DESC LIMIT N` for top features. One query per metric group, not per row.
**Warning signs:** API response times >1s; N database calls in the API handler.

### Pitfall 5: Time Range Not Filling Gaps

**What goes wrong:** Volume chart shows data points only for days that have submissions. Days with zero submissions are missing, making the line chart jump across gaps.
**Why it happens:** SQL `GROUP BY date_trunc()` only returns rows that exist. Days with no submissions have no row.
**How to avoid:** After querying, fill in missing dates in the series with `count: 0`. Generate the full date range with `date-fns` (eachDayOfInterval) and merge with query results.
**Warning signs:** Line chart x-axis has irregular spacing; sudden jumps between distant dates.

### Pitfall 6: Supabase .rpc() vs Direct Queries for Aggregation

**What goes wrong:** Complex aggregation queries (GROUP BY, date_trunc, AVG, multiple JOINs) are awkward to express with Supabase's query builder (.select(), .gte(), etc.).
**Why it happens:** Supabase's JavaScript client is optimized for CRUD, not analytics queries. Complex aggregations require `.rpc()` to call a Postgres function.
**How to avoid:** For simple queries (filter + count), use the query builder. For complex aggregations (GROUP BY type + date, AVG with NULLs), create a Postgres RPC function or use `.rpc()` with a raw SQL function. Alternatively, fetch filtered raw data and aggregate in the API route (acceptable for <10K rows).
**Warning signs:** Convoluted chains of `.select()` that don't produce the right shape; inability to use date_trunc or GROUP BY.

## Code Examples

### SQL: Submission Volume by Day

```sql
-- Volume over time (for VolumeChart)
SELECT
  date_trunc('day', created_at)::date AS date,
  COUNT(*) AS count
FROM fb_submissions
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY date_trunc('day', created_at)::date
ORDER BY date ASC;
```

### SQL: Breakdown by Type

```sql
-- Breakdown by type (for TypeBreakdown chart)
SELECT
  COALESCE(type, 'unclassified') AS type,
  COUNT(*) AS count
FROM fb_submissions
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND status = 'processed'
GROUP BY type
ORDER BY count DESC;
```

### SQL: Breakdown by Vertical

```sql
-- Breakdown by vertical (for VerticalBreakdown chart)
SELECT
  COALESCE(vertical, 'unknown') AS vertical,
  COUNT(*) AS count
FROM fb_submissions
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY vertical
ORDER BY count DESC;
```

### SQL: Top Requested Features

```sql
-- Top features by linked submission count (for TopFeatures list)
SELECT
  id, title, type, submission_count, priority, status,
  created_at, last_submitted_at
FROM fb_tasks
WHERE type = 'feature_request'
ORDER BY submission_count DESC
LIMIT 10;
```

### SQL: Average Response Times

```sql
-- Average processing time (submission -> AI processed)
SELECT
  AVG(EXTRACT(EPOCH FROM (processed_at - created_at)) / 3600)::NUMERIC(10,1)
    AS avg_processing_hours
FROM fb_submissions
WHERE processed_at IS NOT NULL
  AND created_at >= NOW() - INTERVAL '30 days';

-- Average resolution time (task created -> resolved)
SELECT
  AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 3600)::NUMERIC(10,1)
    AS avg_resolution_hours
FROM fb_tasks
WHERE resolved_at IS NOT NULL
  AND created_at >= NOW() - INTERVAL '30 days';
```

### Supabase Approach: Fetch + Aggregate in API Route

```typescript
// For moderate data volumes, fetch filtered rows and aggregate in JS
// This avoids needing Postgres RPC functions

// Volume by day
const { data: submissions } = await supabaseAdmin
  .from('fb_submissions')
  .select('created_at, type, vertical')
  .gte('created_at', startDate);

// Group by day in JS
const volumeByDay = new Map<string, number>();
for (const sub of submissions || []) {
  const day = format(new Date(sub.created_at), 'yyyy-MM-dd');
  volumeByDay.set(day, (volumeByDay.get(day) || 0) + 1);
}

// Group by type in JS
const byType = new Map<string, number>();
for (const sub of submissions || []) {
  const type = sub.type || 'unclassified';
  byType.set(type, (byType.get(type) || 0) + 1);
}
```

### Recharts: Bar Chart for Type Breakdown

```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TYPE_COLORS: Record<string, string> = {
  bug: '#ef4444',
  feature_request: '#3b82f6',
  improvement: '#8b5cf6',
  complaint: '#f59e0b',
  praise: '#10b981',
  operational: '#6b7280',
};

export function TypeBreakdown({ data }: { data: { type: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="type" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

## Database Schema Reference

### fb_submissions (key columns for analytics)

| Column         | Type                                                                     | Analytics Use                                   |
| -------------- | ------------------------------------------------------------------------ | ----------------------------------------------- |
| `created_at`   | TIMESTAMPTZ                                                              | Volume over time (X axis)                       |
| `type`         | TEXT (bug, feature_request, improvement, complaint, praise, operational) | Breakdown by type                               |
| `vertical`     | TEXT (nullable)                                                          | Breakdown by vertical                           |
| `status`       | TEXT (pending, processing, processed, failed)                            | Filter to processed only for type breakdown     |
| `processed_at` | TIMESTAMPTZ (nullable)                                                   | Acknowledgment time = processed_at - created_at |
| `sentiment`    | TEXT (positive, neutral, negative)                                       | Optional sentiment distribution                 |
| `task_id`      | UUID (nullable)                                                          | Link to aggregated task                         |

### fb_tasks (key columns for analytics)

| Column             | Type                   | Analytics Use                              |
| ------------------ | ---------------------- | ------------------------------------------ |
| `type`             | TEXT                   | Filter to feature_request for top features |
| `submission_count` | INTEGER                | Rank features by popularity                |
| `created_at`       | TIMESTAMPTZ            | Resolution time start                      |
| `resolved_at`      | TIMESTAMPTZ (nullable) | Resolution time end                        |
| `status`           | TEXT                   | Filter resolved tasks for response time    |
| `title`            | TEXT                   | Display in top features list               |
| `priority`         | INTEGER (1-5)          | Display in top features list               |

### fb_merchant_notifications (key columns for analytics)

| Column          | Type                                                    | Analytics Use                               |
| --------------- | ------------------------------------------------------- | ------------------------------------------- |
| `type`          | TEXT (acknowledged, status_changed, resolved, rejected) | Acknowledgment time via 'acknowledged' type |
| `created_at`    | TIMESTAMPTZ                                             | When notification was sent                  |
| `submission_id` | UUID                                                    | Link back to submission                     |

## State of the Art

| Old Approach                         | Current Approach                              | When Changed      | Impact                                     |
| ------------------------------------ | --------------------------------------------- | ----------------- | ------------------------------------------ |
| jQuery chart plugins                 | React charting libraries (Recharts, Chart.js) | 2018+             | Component-based, declarative, type-safe    |
| Client-side data fetching for charts | Server-side aggregation + client rendering    | Standard practice | Prevents downloading raw data; faster load |
| Fixed time ranges                    | Configurable time range with presets          | Standard practice | User flexibility without complexity        |
| No empty state handling              | Empty state + zero-fill for gaps              | Standard practice | Prevents broken charts                     |

**Deprecated/outdated:**

- `react-chartist`: Abandoned, do not use
- `react-vis` (Uber): Not actively maintained since 2021
- `react-google-charts`: Requires Google CDN, not suitable for admin dashboards

## Open Questions

1. **Sidebar navigation for analytics page**
   - What we know: The platform section has children: Overview, Merchants, Revenue, Countries, Support. The feedback-tasks page exists at `/platform/feedback-tasks` but is NOT in the sidebar children list (likely accessed from within the platform page).
   - What's unclear: Whether to add "Feedback Analytics" to the platform sidebar children or keep it as a link from the feedback-tasks page.
   - Recommendation: Add `{ name: 'Feedback Analytics', href: '/platform/feedback-analytics' }` to the platformNavigation children array. This is consistent with how other platform sub-pages are organized.

2. **Data volume for client-side vs SQL aggregation**
   - What we know: The system is early-stage. Likely hundreds to low thousands of submissions. Supabase's query builder doesn't natively support GROUP BY.
   - What's unclear: Whether to use Postgres RPC functions for aggregation or fetch filtered rows and aggregate in the API route handler.
   - Recommendation: For v1, fetch filtered rows via Supabase query builder and aggregate in the API route (JavaScript). This is simpler, avoids creating migration files for RPC functions, and is performant for <10K rows. If data grows beyond 10K, migrate to Postgres RPC functions later.

3. **Period-over-period comparison**
   - What we know: CONTEXT.md lists "period-over-period comparison" as discretionary.
   - What's unclear: Whether to show it in v1.
   - Recommendation: Skip for v1. Add simple trend indicators (up/down arrow + percentage) comparing current period to previous period of same length. Full period-over-period is a nice-to-have for v2.

## Sources

### Primary (HIGH confidence)

- `shared/database/migrations/schema/082-feedback-intelligence.sql` - Complete schema for fb_submissions, fb_tasks, fb_merchant_notifications with all columns, types, constraints, indexes
- `apps/backoffice/package.json` - Confirmed no charting library installed; confirmed date-fns ^4.1.0, lucide-react, Radix UI available
- `apps/backoffice/app/api/feedback/tasks/route.ts` - Existing API route pattern: createClient auth check + supabaseAdmin query
- `apps/backoffice/app/(dashboard)/platform/page.tsx` - Existing platform page styling: metric cards, progress bars, table patterns
- `apps/backoffice/components/feedback-kanban/KanbanBoard.tsx` - Phase 16 implementation confirming fb_tasks schema usage
- `apps/backoffice/components/layout/Sidebar.tsx` - Platform navigation structure with children array
- `apps/backoffice/lib/supabase-admin.ts` - supabaseAdmin pattern for bypassing RLS

### Secondary (MEDIUM confidence)

- [Recharts ecosystem consensus](https://ably.com/blog/top-react-chart-libraries) - Multiple sources confirm Recharts as the most popular React charting library for dashboards
- [Best React chart libraries 2026](https://embeddable.com/blog/react-chart-libraries) - Recharts recommended for small-to-medium data volumes with React-native feel

### Tertiary (LOW confidence)

- None -- all findings verified from codebase inspection or multiple authoritative sources

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Recharts well-established; all other libraries already installed in codebase
- Architecture: HIGH - API route patterns, page structure, component patterns all directly observed from Phase 16 and platform page
- SQL queries: HIGH - All columns verified against migration 082 schema; queries are standard Postgres aggregation
- Pitfalls: HIGH - Identified from direct schema analysis (missing acknowledged_at), Recharts SSR known limitation, and standard analytics patterns

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (stable patterns, well-established libraries)
