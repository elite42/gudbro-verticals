# Phase 24: Analytics, Deals & Communication - Research

**Researched:** 2026-01-31
**Domain:** Owner analytics dashboard, local deals CRUD with click tracking, transactional email (booking confirmation + pre-arrival QR), WhatsApp deep-links
**Confidence:** HIGH

## Summary

This phase spans four distinct sub-domains: (1) owner analytics with charts, (2) local deals management, (3) transactional email with QR codes, and (4) WhatsApp deep-links. The codebase already has strong foundations for all four:

- **recharts ^3.7.0** is already installed in backoffice with a working analytics dashboard pattern (`AnalyticsDashboard.tsx`) using LineChart, BarChart, ResponsiveContainer, and time-range selectors.
- **Local Deals** already have a guest-facing component (`LocalDeals.tsx`) and API route reading from `partner_conventions`. The CONTEXT.md decision changes this to owner-managed deals with a new `accom_deals` table, replacing the partner_conventions approach.
- **Email sending** via Resend API is already implemented in `lib/notifications/providers/email-provider.ts` with fallback to SendGrid. The `qrcode` library is already installed for QR generation.
- **WhatsApp** deep-links (`wa.me/`) are already used in `ContactSheet.tsx` and `BookingConfirmation.tsx` with pre-filled messages.

**Primary recommendation:** This phase is mostly assembly of existing patterns. The main new work is: (a) SQL aggregation queries for analytics KPIs, (b) a new `accom_deals` table + CRUD, (c) email HTML templates, and (d) a cron/trigger mechanism for pre-arrival emails.

## Standard Stack

### Core

| Library    | Version   | Purpose                                  | Why Standard                                                |
| ---------- | --------- | ---------------------------------------- | ----------------------------------------------------------- |
| recharts   | ^3.7.0    | Bar/line charts for analytics            | Already installed in backoffice, existing dashboard pattern |
| qrcode     | ^1.5.4    | QR code generation for pre-arrival email | Already installed in backoffice, used in qr-generator.ts    |
| Resend API | via fetch | Transactional email sending              | Already integrated in email-provider.ts, no SDK needed      |
| date-fns   | ^4.1.0    | Date manipulation for analytics periods  | Already installed in backoffice                             |

### Supporting

| Library               | Version | Purpose                                    | When to Use                             |
| --------------------- | ------- | ------------------------------------------ | --------------------------------------- |
| @phosphor-icons/react | ^2.1.7  | Icons for analytics cards, deal management | Already used in accommodations frontend |
| zod                   | ^3.23.0 | Request validation for deal CRUD           | Already in backoffice                   |

### Alternatives Considered

| Instead of       | Could Use                | Tradeoff                                                 |
| ---------------- | ------------------------ | -------------------------------------------------------- |
| recharts         | tremor, shadcn/ui charts | recharts already installed and has working patterns      |
| Resend via fetch | resend npm SDK           | fetch is simpler, already working, no extra dependency   |
| Plain HTML email | react-email              | react-email is nicer but adds complexity for 2 templates |

**Installation:**
No new packages needed. Everything is already in the dependency tree.

## Architecture Patterns

### Recommended Project Structure

#### Backoffice (Analytics + Deals Management)

```
apps/backoffice/
├── app/(dashboard)/accommodations/
│   ├── analytics/
│   │   └── page.tsx                    # Analytics dashboard page
│   └── deals/
│       └── page.tsx                    # Deals CRUD page
├── app/api/accommodations/
│   ├── analytics/
│   │   ├── kpis/route.ts              # 4 KPI cards + trends
│   │   ├── revenue-chart/route.ts     # Stacked bar chart data
│   │   └── occupancy-chart/route.ts   # Line chart data
│   └── deals/
│       ├── route.ts                   # GET list, POST create
│       └── [id]/route.ts             # PUT update, DELETE
└── components/accommodations/
    ├── AnalyticsDashboard.tsx          # Main analytics component
    ├── KPICard.tsx                     # Individual KPI with trend
    └── DealsManager.tsx               # CRUD deals list
```

#### Accommodations Frontend (Guest-facing + Email)

```
apps/accommodations/frontend/
├── app/api/
│   ├── stay/[code]/deals/route.ts     # EXISTING - update to use accom_deals
│   ├── email/
│   │   ├── booking-confirmation/route.ts  # Send confirmation email
│   │   └── pre-arrival/route.ts           # Send pre-arrival email (cron target)
│   └── deals/[id]/click/route.ts      # Click tracking redirect
├── components/stay/
│   ├── LocalDeals.tsx                  # EXISTING - update for new deal format + click tracking
│   └── ContactSheet.tsx               # EXISTING - already has WhatsApp
└── lib/
    └── email-templates.ts             # HTML email templates
```

### Pattern 1: Server-Computed Analytics with Period Selector

**What:** API routes compute aggregates via SQL, not client-side. Period selector passes `days` param.
**When to use:** Analytics dashboard.
**Example:** (follows existing AnalyticsDashboard.tsx pattern)

```typescript
// API route: compute KPIs server-side
const kpis = await supabaseAdmin.rpc('accom_analytics_kpis', {
  p_property_id: propertyId,
  p_start_date: startDate,
  p_end_date: endDate,
});

// Client: period selector (same pattern as feedback analytics)
const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
```

### Pattern 2: CRUD with Admin API Key Validation

**What:** Backoffice API routes use `validateAdminApiKey()` for auth, Supabase Admin for DB access.
**When to use:** All backoffice API routes (deals CRUD, analytics).
**Example:** (follows existing bookings/rooms/services API pattern)

```typescript
export async function POST(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;
  // ... CRUD logic with supabaseAdmin
}
```

### Pattern 3: Click Tracking via API Redirect

**What:** Guest clicks deal link -> hits `/api/deals/[id]/click` -> logs click -> redirects to external URL.
**When to use:** Deal click tracking (DEAL-03).

```typescript
// API route: log click and redirect
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const guest = await authenticateGuest(request);
  await supabaseAdmin.from('accom_deal_clicks').insert({
    deal_id: params.id,
    guest_id: guest?.bookingId || null,
    clicked_at: new Date().toISOString(),
  });
  // Get deal URL and redirect
  const { data } = await supabaseAdmin
    .from('accom_deals')
    .select('url')
    .eq('id', params.id)
    .single();
  return NextResponse.redirect(data.url);
}
```

### Pattern 4: Transactional Email with Fallback

**What:** Use existing `sendEmail()` from email-provider.ts. Email is enhancement, not gate.
**When to use:** Booking confirmation (COMM-03), pre-arrival (COMM-04).

```typescript
import { sendEmail, textToHtml } from '@/lib/notifications/providers/email-provider';
// or build custom HTML template function for richer emails
const result = await sendEmail({
  to: guestEmail,
  subject: `Booking Confirmed - ${bookingCode}`,
  text: plainTextVersion,
  html: buildConfirmationHtml({ bookingCode, propertyName, dates, ... }),
});
// Log result but don't block booking flow
if (!result.success) console.error('Email send failed:', result.error);
```

### Anti-Patterns to Avoid

- **Client-side analytics calculation:** All aggregation must happen in SQL/API. Never fetch raw bookings to compute occupancy in the browser.
- **Blocking on email send:** Booking confirmation page must render regardless of email success. Email is fire-and-forget with logging.
- **Custom WhatsApp API integration:** Use `wa.me/` deep-links only. No WhatsApp Business API needed for v1.
- **Complex deal categories/expiration:** v1 is intentionally simple: active/inactive toggle only.

## Don't Hand-Roll

| Problem               | Don't Build              | Use Instead                            | Why                                                     |
| --------------------- | ------------------------ | -------------------------------------- | ------------------------------------------------------- |
| Chart rendering       | Custom SVG/Canvas charts | recharts (already installed)           | Complex math, responsive, tooltips, accessibility       |
| QR code generation    | Custom QR encoder        | `qrcode` library (already installed)   | QR is a complex standard with error correction          |
| Email HTML rendering  | Build from scratch       | Reuse `textToHtml()` pattern + extend  | Email HTML is notoriously tricky (Outlook, Gmail, etc.) |
| Occupancy calculation | Client-side date math    | PostgreSQL daterange + generate_series | SQL handles gaps, partial periods, timezones correctly  |
| WhatsApp messaging    | WhatsApp Business API    | `wa.me/` deep-links                    | Deep-links are free, instant, no approval process       |

**Key insight:** The email-provider.ts and AnalyticsDashboard.tsx patterns in the codebase already solve the hard problems. This phase is about applying these patterns to the accommodations vertical.

## Common Pitfalls

### Pitfall 1: Occupancy Rate Calculation Edge Cases

**What goes wrong:** Occupancy calculated incorrectly for partial months, future dates, or properties with varying room counts.
**Why it happens:** Naive calculation (bookings / total_days \* rooms) ignores rooms added/removed mid-period.
**How to avoid:** Use PostgreSQL `generate_series` to create a date grid, then LEFT JOIN bookings. Count only active rooms per date. Exclude future dates from denominator.
**Warning signs:** Occupancy > 100%, or 0% when bookings exist.

### Pitfall 2: Stacked Bar Chart Data Shape

**What goes wrong:** recharts stacked bars don't render when data shape doesn't match expected format.
**Why it happens:** Each data point needs all category keys, even if 0. Missing keys cause bars to disappear.
**How to avoid:** API must return complete data shape: `{ month: 'Jan', studio: 500, double: 800, suite: 200, services: 150 }` with all room types present.
**Warning signs:** Bars partially render or disappear for some months.

### Pitfall 3: Email Deliverability

**What goes wrong:** Emails land in spam or don't arrive at all.
**Why it happens:** Missing DKIM/SPF records, bad sender domain, or generic from address.
**How to avoid:** Use verified domain in Resend (noreply@gudbro.com already configured). Keep email content clean (no excessive links, images). Include plain text fallback alongside HTML.
**Warning signs:** Resend dashboard shows low delivery rate.

### Pitfall 4: Pre-Arrival Email Timing

**What goes wrong:** Pre-arrival email sent at wrong time due to timezone mismatch.
**Why it happens:** Property timezone (Asia/Ho_Chi_Minh) differs from server timezone (UTC).
**How to avoid:** Store check_in_date as DATE (no timezone). Compute "1 day before" in property timezone using `accom_properties.timezone`. Use a cron job that runs hourly and checks for tomorrow's check-ins in each property's timezone.
**Warning signs:** Guest receives email 2 days early or day-of.

### Pitfall 5: Click Tracking Authentication

**What goes wrong:** Click tracking fails because guest JWT is not included in redirect URL.
**Why it happens:** External link `<a href>` doesn't carry JWT. API route can't authenticate.
**How to avoid:** Two options: (a) include booking_id as query param in click URL (simpler, no auth needed), or (b) use a tracking pixel approach. Recommend option (a): `/api/deals/[id]/click?bid=<booking_id>` since deals are not sensitive data.
**Warning signs:** Click logs have null guest_id.

### Pitfall 6: ADR (Average Daily Rate) with Zero Bookings

**What goes wrong:** Division by zero when calculating ADR for periods with no bookings.
**Why it happens:** ADR = total_revenue / total_room_nights. If total_room_nights = 0, crash or NaN.
**How to avoid:** SQL: `COALESCE(SUM(total_price)::NUMERIC / NULLIF(SUM(num_nights), 0), 0)`. Frontend: show "N/A" when null.
**Warning signs:** NaN displayed in KPI card.

## Code Examples

### KPI SQL Query (PostgreSQL)

```sql
-- Occupancy rate for a property over a date range
WITH date_grid AS (
  SELECT d::DATE AS stay_date
  FROM generate_series($2::DATE, $3::DATE - 1, '1 day') AS d
),
active_rooms AS (
  SELECT COUNT(*) AS room_count
  FROM accom_rooms
  WHERE property_id = $1 AND is_active = true
),
occupied AS (
  SELECT dg.stay_date, COUNT(DISTINCT b.room_id) AS rooms_occupied
  FROM date_grid dg
  LEFT JOIN accom_bookings b ON b.property_id = $1
    AND b.check_in_date <= dg.stay_date
    AND b.check_out_date > dg.stay_date
    AND b.status IN ('confirmed', 'checked_in', 'checked_out')
  GROUP BY dg.stay_date
)
SELECT
  ROUND(AVG(o.rooms_occupied::NUMERIC / NULLIF(ar.room_count, 0)) * 100, 1) AS occupancy_rate
FROM occupied o, active_rooms ar;
```

### Revenue Summary SQL

```sql
-- Revenue by room type and service revenue
SELECT
  r.room_type,
  SUM(b.total_price) AS booking_revenue,
  COUNT(b.id) AS booking_count
FROM accom_bookings b
JOIN accom_rooms r ON r.id = b.room_id
WHERE b.property_id = $1
  AND b.check_in_date >= $2
  AND b.check_in_date < $3
  AND b.status IN ('confirmed', 'checked_in', 'checked_out')
GROUP BY r.room_type;

-- Service revenue by category
SELECT
  sc.name AS category_name,
  SUM(so.total) AS service_revenue,
  COUNT(so.id) AS order_count
FROM accom_service_orders so
JOIN accom_service_order_items soi ON soi.order_id = so.id
JOIN accom_service_items si ON si.id = soi.service_item_id
JOIN accom_service_categories sc ON sc.id = si.category_id
WHERE so.property_id = $1
  AND so.created_at >= $2
  AND so.created_at < $3
  AND so.status != 'cancelled'
GROUP BY sc.name;
```

### Stacked Bar Chart (recharts)

```typescript
// Source: existing AnalyticsDashboard.tsx pattern + recharts docs
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ROOM_TYPE_COLORS: Record<string, string> = {
  studio: '#3b82f6',
  single: '#8b5cf6',
  double: '#10b981',
  twin: '#f59e0b',
  suite: '#ef4444',
  services: '#6b7280',
};

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={revenueData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
    <Legend />
    {roomTypes.map((type) => (
      <Bar key={type} dataKey={type} stackId="revenue" fill={ROOM_TYPE_COLORS[type]} />
    ))}
    <Bar dataKey="services" stackId="revenue" fill={ROOM_TYPE_COLORS.services} />
  </BarChart>
</ResponsiveContainer>
```

### Deal Click Tracking

```typescript
// /api/deals/[id]/click/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const bookingId = request.nextUrl.searchParams.get('bid');
  const supabase = getSupabaseAdmin();

  // Log click (fire and forget)
  await supabase.from('accom_deal_clicks').insert({
    deal_id: params.id,
    booking_id: bookingId,
  });

  // Get deal URL
  const { data } = await supabase
    .from('accom_deals')
    .select('url')
    .eq('id', params.id)
    .single();

  if (!data?.url) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.redirect(data.url);
}
```

### WhatsApp Deep-Link Pattern

```typescript
// Already established in ContactSheet.tsx and BookingConfirmation.tsx
const whatsappNumber = phone.replace(/[\s\-+]/g, '');
const prefilledMessage = `Hi, I'm staying in Room ${roomNumber} at ${propertyName}. `;
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`;
```

### Email HTML Template Pattern

```typescript
// Extend existing textToHtml pattern from email-provider.ts
export function buildBookingConfirmationHtml(data: {
  bookingCode: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  totalPrice: number;
  currency: string;
  propertyAddress?: string;
  hostWhatsapp?: string;
  brandColor?: string;
}): string {
  const color = data.brandColor || '#3D8B87';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden;">
    <div style="background: ${color}; color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Booking Confirmed</h1>
      <p style="margin: 8px 0 0; font-size: 32px; font-weight: bold;">${data.bookingCode}</p>
    </div>
    <div style="padding: 30px;">
      <!-- Content rows -->
    </div>
  </div>
</body>
</html>`;
}
```

### QR Code for Pre-Arrival Email

```typescript
import QRCode from 'qrcode';

// Generate QR code as data URL for embedding in email
const stayUrl = `https://stay.gudbro.com/stay/${bookingCode}`;
const qrDataUrl = await QRCode.toDataURL(stayUrl, {
  width: 200,
  margin: 2,
  color: { dark: '#2D2016', light: '#ffffff' },
});
// Embed in email: <img src="${qrDataUrl}" alt="QR Code" />
```

## Database Schema Design

### New Tables Required

#### accom_deals (Owner-managed local deals)

```sql
CREATE TABLE accom_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  partner_name TEXT NOT NULL,
  discount_description TEXT NOT NULL,
  description TEXT,
  url TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### accom_deal_clicks (Click tracking)

```sql
CREATE TABLE accom_deal_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES accom_deals(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES accom_bookings(id) ON DELETE SET NULL,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### accom_email_logs (Email send tracking)

```sql
CREATE TABLE accom_email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL CHECK (email_type IN ('booking_confirmation', 'pre_arrival')),
  recipient_email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'skipped')),
  provider_message_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### No New Tables Needed For

- **Analytics:** All data comes from existing `accom_bookings`, `accom_rooms`, `accom_service_orders` tables via aggregation queries
- **WhatsApp:** Pure frontend deep-links, no DB involved

## Pre-Arrival Email Scheduling Strategy

**Approach:** Vercel Cron Job (via `vercel.json`) that runs daily, checking for tomorrow's check-ins.

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/pre-arrival-emails",
      "schedule": "0 8 * * *"
    }
  ]
}
```

The cron endpoint:

1. Queries bookings where `check_in_date = CURRENT_DATE + 1` and no pre-arrival email logged yet
2. For each booking, generates QR code, builds HTML email, sends via Resend
3. Logs result to `accom_email_logs`
4. Runs at 8 AM UTC (adjust based on property timezone distribution)

**Alternative:** Trigger.dev (already in backoffice) for more sophisticated scheduling per-timezone. But Vercel Cron is simpler for v1.

## Backoffice Sidebar Navigation Update

The accommodations sidebar (in `components/layout/Sidebar.tsx`) currently has:

```
Bookings, Orders, Calendar & Pricing, Rooms, Services, Settings, QR Codes
```

Add two new items:

```
Bookings, Orders, Calendar & Pricing, Rooms, Services, Analytics, Deals, Settings, QR Codes
```

## State of the Art

| Old Approach                  | Current Approach                | When Changed              | Impact                                               |
| ----------------------------- | ------------------------------- | ------------------------- | ---------------------------------------------------- |
| partner_conventions for deals | Owner-managed accom_deals table | This phase                | Simpler, owner-controlled, no cross-table complexity |
| No email communication        | Resend transactional emails     | This phase                | Key guest touchpoint for In-Stay adoption            |
| Manual WhatsApp               | Pre-filled deep-links           | Phase 21 (already exists) | ContactSheet.tsx already implements this             |

**Already implemented (no work needed):**

- WhatsApp deep-links in ContactSheet.tsx and BookingConfirmation.tsx (COMM-01 partially done)
- LocalDeals component in In-Stay Dashboard (needs update for new data source)
- Email provider with Resend integration (needs email templates)

## Open Questions

1. **Pre-arrival email timezone handling**
   - What we know: Properties have a `timezone` field (default Asia/Ho_Chi_Minh)
   - What's unclear: Should cron run once at UTC or per-timezone? What if property timezone changes?
   - Recommendation: Run cron at 8 AM UTC. For v1, this covers Asia/Ho_Chi_Minh well (3 PM local). Can refine later.

2. **Deal image storage**
   - What we know: CONTEXT.md says "optional image" for deals
   - What's unclear: Upload to Supabase Storage or external URL only?
   - Recommendation: URL-only for v1 (simpler). Owner pastes image URL. Can add upload later.

3. **Analytics for properties with no data**
   - What we know: New properties will have zero bookings
   - What's unclear: How to handle empty state gracefully
   - Recommendation: Show "No data yet" empty state (follow existing AnalyticsDashboard.tsx empty state pattern)

4. **Booking confirmation email trigger**
   - What we know: Email should be sent on booking creation
   - What's unclear: Trigger from booking API route directly, or via DB trigger + Edge Function?
   - Recommendation: Call email function directly from the booking creation API route. Simpler, already in same server context.

## Sources

### Primary (HIGH confidence)

- Existing codebase: `apps/backoffice/components/feedback-analytics/AnalyticsDashboard.tsx` - recharts patterns
- Existing codebase: `apps/backoffice/lib/notifications/providers/email-provider.ts` - Resend integration
- Existing codebase: `apps/accommodations/frontend/components/stay/ContactSheet.tsx` - WhatsApp deep-links
- Existing codebase: `apps/accommodations/frontend/components/stay/LocalDeals.tsx` - Deal display pattern
- Existing codebase: `shared/database/migrations/schema/077-accommodations-schema.sql` - Core schema
- Existing codebase: `shared/database/migrations/schema/083-accommodations-v2-foundation.sql` - Service orders schema

### Secondary (MEDIUM confidence)

- [Recharts stacked bar chart docs](https://recharts.github.io/en-US/examples/StackedBarChart/) - Stacked bar API
- [Resend Next.js integration](https://resend.com/docs/send-with-nextjs) - Email sending API

### Tertiary (LOW confidence)

- None - all findings verified against codebase

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - all libraries already installed and used in codebase
- Architecture: HIGH - follows established backoffice patterns exactly
- Analytics SQL: MEDIUM - SQL patterns are standard but untested against actual data
- Email templates: MEDIUM - HTML email rendering varies across clients
- Pitfalls: HIGH - based on common PostgreSQL analytics and email patterns

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable - no fast-moving dependencies)
