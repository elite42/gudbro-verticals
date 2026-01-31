# Phase 23: Service Ordering - Research

**Researched:** 2026-01-31
**Mode:** Ecosystem (codebase-focused)
**Overall confidence:** HIGH

## Executive Summary

Phase 23 builds the full service ordering flow (guest catalog, cart, checkout, order tracking) and owner management (catalog CRUD, order management) on top of existing database tables created in Phase 18 (migration 077) and extended in Phase 21 (migration 083). The codebase already provides strong patterns for every major component: the ServicesCarousel for catalog display, the ChargesManager for CRUD forms, the booking status state machine for order lifecycle, and the stay API layer for guest authentication. This is primarily a UI/API assembly phase with well-established precedents -- the main risk is scope creep, not technical unknowns.

The existing database schema covers ~90% of needs. One migration (086) is required to add `automation_level` to `accom_service_categories`. The guest authentication system (JWT via `useStaySession` + `verifyGuestToken`) is production-ready and needs only a SECURITY DEFINER function for order creation since RLS blocks anon inserts by design.

## Key Findings

### 1. Database Schema Already Exists (HIGH confidence)

**Tables ready for use:**

| Table                        | Migration | Key Columns                                                                                             | Status              |
| ---------------------------- | --------- | ------------------------------------------------------------------------------------------------------- | ------------------- |
| `accom_service_categories`   | 077       | id, property_id, name, slug, icon, display_order, is_active                                             | Ready               |
| `accom_service_items`        | 077       | id, category_id, property_id, name, price (INT minor), is_always_available, available_from/until (TIME) | Ready               |
| `accom_service_orders`       | 083       | id, booking_id, property_id, status, requested_time, delivery_notes, payment_method, subtotal/tax/total | Ready               |
| `accom_service_order_items`  | 083       | id, order_id, service_item_id, name (snapshot), quantity, unit_price (snapshot), total, notes           | Ready               |
| `accom_service_translations` | 077       | entity_type, entity_id, language_code, name, description                                                | Ready (UI deferred) |

**Order status values (from migration 083 CHECK constraint):**

```
'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
```

Note: The PRD says "submitted" but the DB uses "pending". The CONTEXT.md step labels (Submitted > Confirmed > Preparing > Ready > Delivered) should map to DB values (pending > confirmed > preparing > ready > delivered). Display "Submitted" in UI but store "pending" in DB.

**Missing column (requires migration 086):**

- `accom_service_categories.automation_level` -- TEXT NOT NULL DEFAULT 'manual' CHECK ('auto_confirm', 'manual', 'whatsapp_notify')

**Price storage pattern:**

- Prices stored as INTEGER in minor currency units (cents/dong)
- `formatPrice()` helper already exists in ServicesCarousel and RestaurantSection
- ZERO_DECIMAL_CURRENCIES set already handles VND, JPY, KRW etc.
- This pattern MUST be followed: store minor units in DB, display major units in UI

**RLS policies (existing):**

- Service categories/items: anon can SELECT active, authenticated owner manages all
- Service orders/order items: authenticated owner manages via property ownership chain, NO anon access
- Guest order creation requires a SECURITY DEFINER function (same pattern as `verify_booking_access`)

### 2. Guest-Side Patterns (HIGH confidence)

**Authentication flow:**

- Guest verifies via booking code + last name at `/api/stay/verify`
- Receives JWT with `{ bookingId, propertyId, checkoutDate }`
- Token stored in localStorage via `useStaySession` hook
- All protected API routes use `authenticateGuest()` which extracts `Bearer` token and calls `verifyGuestToken()`
- propertyId comes from token, NOT URL (security pattern)

**Existing ServicesCarousel component** (`apps/accommodations/frontend/components/stay/ServicesCarousel.tsx`):

- Props: `{ bookingCode, token }`
- Fetches `GET /api/stay/[code]/services` via `fetchStayAPI` wrapper
- Renders categories with horizontal scrollable item cards
- Already handles loading, error, and empty states
- Uses `ServiceCategoryWithItems` and `ServiceItemResponse` types
- Currently display-only (no add-to-cart)

**Existing service API endpoint** (`apps/accommodations/frontend/app/api/stay/[code]/services/route.ts`):

- Uses `getSupabaseAdmin()` for Supabase queries
- Queries `accom_service_categories` with nested `accom_service_items` select
- Filters active items, sorts by sort_order
- Maps snake_case DB columns to camelCase response
- Returns `{ data: { categories: ServiceCategoryWithItems[] } }`

**The `fetchStayAPI` helper** (`apps/accommodations/frontend/lib/stay-api.ts`):

- Generic `fetchStayAPI<T>(path, token)` sends GET with Bearer token
- Returns `{ data, error }` shape
- Used by all stay endpoints (services, deals, property, useful-numbers)
- For POST (order creation), a new `postStayAPI<T>(path, token, body)` variant is needed

**In-Stay Dashboard page** (`apps/accommodations/frontend/app/stay/[code]/page.tsx`):

- Renders sections in order: WifiCard, WelcomeCard, VisaStatusCard, QuickActions, RestaurantSection, ServicesCarousel, LocalDeals, UsefulNumbers, ReturnGuestBanner, CheckoutInfo, ContactSheet
- ServicesCarousel receives `bookingCode` and `token`
- BottomNav at bottom with tabs: home, map, menu, services, profile
- "services" tab already exists in BottomNav -- currently unused but ready for full catalog view
- The dashboard needs: (a) evolve ServicesCarousel to open full catalog, (b) add cart FAB, (c) add active orders section

**BottomNav** (`apps/accommodations/frontend/components/BottomNav.tsx`):

- 5 tabs: home, map, menu, services, profile
- "services" tab has gift icon -- natural entry point for full service catalog
- Currently all tabs are handled via `activeTab` state in dashboard page
- Can use services tab to show full catalog view/drawer

### 3. Coffeeshop Cart Pattern (HIGH confidence)

**Cart store** (`apps/coffeeshop/frontend/lib/cart-store.ts`):

- Uses localStorage persistence with `window.dispatchEvent(new Event('cart-updated'))` for reactivity
- `CartItem`: id, dish, quantity, extras, addedAt, sessionId
- Methods: add, remove, updateQuantity, clear, count, getTotal, getOrderData
- `generateCartItemId()` creates unique ID from dish + extras combination

**For accommodations, simpler approach:**

- No extras/customization needed
- No split bill
- React state only (session-scoped, as per CONTEXT.md decision)
- Cart item: serviceItemId, name (snapshot), unitPrice, quantity, notes
- Simpler than coffeeshop -- no localStorage needed

**StickyCartBar** (`apps/coffeeshop/frontend/components/StickyCartBar.tsx`):

- Floating bar at `bottom-20` (above BottomNav)
- Collapsed: item count + total + "Procedi" button
- Expanded: scrollable items list + total + confirm button
- Confirmation modal with order summary
- Success toast notification
- Good pattern for the floating cart FAB in accommodations

### 4. Owner-Side Patterns (HIGH confidence)

**ChargesManager** (`apps/backoffice/components/settings/ChargesManager.tsx`):

- The canonical CRUD component pattern for backoffice
- Props: `{ merchantId, onChargesChange }`
- State: charges array, isLoading, isSaving, error, saveSuccess, editingId, editForm, isAdding, newCharge
- CRUD via fetch to `/api/settings/charges` (GET, POST, PUT, DELETE)
- Grouped by type with expandable sections
- Inline edit forms with save/cancel
- Add new with dashed-border placeholder
- Toggle enabled/disabled per item
- Confirmation for delete
- Success/error banners

**Charges API route** (`apps/backoffice/app/api/settings/charges/route.ts`):

- GET: query by merchantId, ordered by type + sort_order
- POST: create with auto sort_order, handle defaults
- PUT: verify ownership, map camelCase->snake_case, update
- DELETE: verify ownership, delete
- Uses `createClient` from supabase-server (backoffice pattern)

**Booking status management** (`apps/backoffice/lib/accommodations/helpers.ts`):

- State machine pattern: `VALID_TRANSITIONS` map defines allowed transitions
- `ACTION_TO_STATUS` maps user actions to DB status values
- `BOOKING_STATUS_COLORS` for badge styling
- `BookingStatusBadge` component: simple colored pill
- `buildWhatsAppUrl()` utility for notification deep-links
- Booking detail PATCH API validates transitions before applying

**This exact pattern should be replicated for order management:**

```typescript
// Order Status State Machine
export const ORDER_VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['preparing', 'cancelled'],
  preparing: ['ready'],
  ready: ['delivered'],
};

export const ORDER_ACTION_TO_STATUS: Record<string, string> = {
  confirm: 'confirmed',
  reject: 'cancelled',
  start_preparing: 'preparing',
  mark_ready: 'ready',
  mark_delivered: 'delivered',
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-indigo-100 text-indigo-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-800',
};
```

**Backoffice sidebar** already has Accommodations section with children:

- Bookings, Calendar & Pricing, Rooms, Settings, QR Codes
- Need to add: "Services" and "Orders" entries

**Backoffice API auth pattern:**

- `validateAdminApiKey(request)` checks Bearer token against ADMIN_API_KEY
- Used consistently across all `/api/accommodations/*` routes
- Service catalog and order management APIs should follow this pattern

### 5. Security Considerations (HIGH confidence)

**Guest order creation needs SECURITY DEFINER function:**

- RLS on `accom_service_orders` only allows authenticated (owner) access
- Guests are unauthenticated (anon role in Supabase) -- they use guest JWT tokens
- Pattern established by `verify_booking_access()` in migration 077
- Need: `create_service_order(p_booking_id, p_items JSONB, p_requested_time, p_delivery_notes)` function
- Function validates booking_id exists + is active, creates order + items atomically
- Called from API route that verifies guest JWT first

**Guest order reading also needs SECURITY DEFINER:**

- Need: `get_booking_orders(p_booking_id)` function
- Returns orders for a specific booking
- API route verifies JWT, extracts bookingId, calls function

**Existing pattern from services endpoint:**

- API route authenticates guest via JWT
- Uses `getSupabaseAdmin()` to query (bypasses RLS)
- This works for READ operations but for WRITE, SECURITY DEFINER is cleaner

**Recommended approach for order creation:**

- API route: verify guest JWT, extract bookingId + propertyId
- Use `getSupabaseAdmin()` to INSERT directly (like backoffice pattern)
- This is simpler than SECURITY DEFINER and follows existing service API pattern
- The API route IS the security boundary (JWT verification)

### 6. WhatsApp Notification Pattern (HIGH confidence)

**Existing pattern in codebase:**

- `buildWhatsAppUrl(phone, message)` in `apps/backoffice/lib/accommodations/helpers.ts`
- QuickActions component builds WhatsApp URLs with pre-filled messages
- No actual WhatsApp API integration -- purely deep-link `wa.me/` URLs

**For service orders:**

- On order creation (when automation_level != 'auto_confirm'), generate WhatsApp deep-link
- Display in owner dashboard as clickable link/button
- Message template: "New order from Room {number}: {item_count} items, {total} {currency}. View: {dashboard_url}"
- The deep-link is shown to the owner in the backoffice, not sent automatically

### 7. Polling Pattern for Order Tracking (MEDIUM confidence)

**No existing polling pattern in accommodations codebase.**

The coffeeshop has order tracking hooks but they're not in the accommodations app. For MVP:

- Simple `useEffect` with `setInterval(fetchOrderStatus, 30000)`
- Cleanup on unmount
- No WebSocket overhead
- Pattern:

```typescript
function useOrderPolling(bookingCode: string, token: string) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await fetchStayAPI(
        `/api/stay/${bookingCode}/orders`,
        token
      );
      if (data) setOrders(data.orders);
    };

    fetchOrders(); // Initial fetch
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [bookingCode, token]);

  return orders;
}
```

## Architecture

### Component Structure (Guest PWA)

```
apps/accommodations/frontend/
  components/stay/
    ServicesCarousel.tsx          # EXISTS - evolve to add "View All" + add-to-cart
    ServiceCatalog.tsx            # NEW - full-page catalog (drawer/sheet)
    ServiceItemCard.tsx           # NEW - individual item with add-to-cart
    CartDrawer.tsx                # NEW - bottom sheet cart view
    CartFAB.tsx                   # NEW - floating cart button
    OrderStatusTimeline.tsx       # NEW - status step indicator
    ActiveOrders.tsx              # NEW - dashboard section showing recent orders
  hooks/
    useServiceCart.ts             # NEW - React state cart (no localStorage)
    useOrderPolling.ts            # NEW - polling for order status
  lib/
    stay-api.ts                   # EXTEND - add order creation + order fetching
  types/
    stay.ts                       # EXTEND - add order types
  app/api/stay/[code]/
    orders/route.ts               # NEW - GET orders for booking, POST create order
    orders/[orderId]/route.ts     # NEW - GET single order status
```

### Component Structure (Backoffice)

```
apps/backoffice/
  app/(dashboard)/accommodations/
    services/page.tsx              # NEW - service catalog CRUD
    orders/page.tsx                # NEW - order management
  app/api/accommodations/
    services/route.ts              # NEW - CRUD API for categories + items
    orders/route.ts                # NEW - GET orders list, PATCH status
    orders/[id]/route.ts           # NEW - GET order detail, PATCH action
  components/accommodations/
    ServiceCatalogManager.tsx      # NEW - ChargesManager-style CRUD
    OrderManagement.tsx            # NEW - order table + actions
    OrderStatusBadge.tsx           # NEW - colored pill badge
    OrderDetailPanel.tsx           # NEW - slide-out detail view
  lib/accommodations/
    helpers.ts                     # EXTEND - add order state machine + colors
  components/layout/
    Sidebar.tsx                    # MODIFY - add Services + Orders nav items
```

### Data Flow

```
Guest Flow:
  BottomNav "Services" tab
    -> ServiceCatalog (full page/drawer)
      -> ServiceItemCard (add to cart)
        -> useServiceCart (React state)
          -> CartFAB (badge count)
            -> CartDrawer (review + checkout)
              -> POST /api/stay/[code]/orders
                -> supabaseAdmin INSERT accom_service_orders + order_items
                  -> If auto_confirm: set status='confirmed'
                  -> Return order with status
              -> OrderStatusTimeline (polling)

Owner Flow:
  Sidebar "Services"
    -> ServiceCatalogManager
      -> GET/POST/PUT/DELETE /api/accommodations/services
        -> supabaseAdmin CRUD accom_service_categories + items

  Sidebar "Orders"
    -> OrderManagement
      -> GET /api/accommodations/orders
      -> PATCH /api/accommodations/orders/[id] (action-based)
        -> Validate transition via ORDER_VALID_TRANSITIONS
        -> Update status
      -> WhatsApp deep-link notification
```

### Migration 086

```sql
ALTER TABLE accom_service_categories
  ADD COLUMN IF NOT EXISTS automation_level TEXT NOT NULL DEFAULT 'manual'
    CHECK (automation_level IN ('auto_confirm', 'manual', 'whatsapp_notify'));

COMMENT ON COLUMN accom_service_categories.automation_level IS
  'Order handling: auto_confirm (instant), manual (owner confirms), whatsapp_notify (auto+notify)';
```

## Pitfalls

### Critical: Price Snapshot Integrity

**What goes wrong:** If order items reference live prices instead of snapshot prices, historical orders become inaccurate when prices change.

**Prevention:** The schema already handles this -- `accom_service_order_items` has `name TEXT`, `unit_price INTEGER`, `total INTEGER` columns. The API route MUST snapshot the current price at order creation time, NOT store a reference to the item's current price. The `service_item_id` FK is for reference only, not for price lookup.

### Critical: RLS Bypass for Guest Order Creation

**What goes wrong:** Guest (anon role) cannot INSERT into `accom_service_orders` due to RLS policy (owner-only). Attempting direct Supabase client INSERT will silently fail or return 0 rows.

**Prevention:** Use `getSupabaseAdmin()` in the API route (bypasses RLS). The API route validates the guest JWT -- that IS the security boundary. This is the same pattern used by the existing services endpoint.

### Moderate: Time Zone Handling for Availability Hours

**What goes wrong:** Service items have `available_from` and `available_until` as TIME columns. Comparing against "current time" requires knowing the property's timezone. A guest in a different timezone seeing their local time compared to the property's availability hours will get wrong results.

**Prevention:**

- `accom_properties.timezone` already exists (default `Asia/Ho_Chi_Minh`)
- Always compare against property timezone, not guest's browser timezone
- Pass property timezone in the services API response
- Use server-side time comparison when validating order submission

### Moderate: Status Race Conditions

**What goes wrong:** Owner clicks "Confirm" twice, or guest refreshes while owner is updating status. Could lead to invalid state transitions.

**Prevention:**

- Use the state machine pattern (VALID_TRANSITIONS) server-side
- PATCH endpoint validates current status before applying transition
- Return error with current status if transition is invalid
- Frontend optimistically updates but rolls back on error

### Minor: Cart State Loss on Navigation

**What goes wrong:** Guest adds items to cart, navigates away from services tab, cart is empty when they return.

**Prevention:** Cart state should live at the dashboard page level (lifted state), not inside the ServiceCatalog component. Pass cart state down via props or context. Since CONTEXT.md says "React state, no localStorage", the state must be lifted to the page component to survive tab changes.

### Minor: Missing `currency` in Order Items

**What goes wrong:** The `accom_service_order_items` table has no `currency` column. If a property has items in mixed currencies (unlikely but possible), order totals may be wrong.

**Prevention:** The `accom_service_orders` table has `currency`. Ensure all items in a single order share the same currency. Validate at order creation time. For MVP, assume property currency is uniform.

## Implications for Roadmap

Based on research, suggested task structure:

1. **Migration + Types** - Create migration 086, extend TypeScript types for orders
   - Small, foundational, unblocks everything else
   - Addresses: automation_level column

2. **Guest Service Catalog** - Evolve ServicesCarousel into full catalog with cart
   - Biggest UI piece, but well-patterned
   - Addresses: SERV-01, SERV-02, SERV-03

3. **Guest Order Submission + Tracking** - API route for order creation + polling UI
   - Depends on catalog + cart being ready
   - Addresses: SERV-04, SERV-05, SERV-08

4. **Owner Service Catalog CRUD** - Backoffice page for managing categories/items
   - Follow ChargesManager pattern closely
   - Addresses: OMGMT-03, OMGMT-05

5. **Owner Order Management** - Backoffice page for managing incoming orders
   - State machine, status actions, WhatsApp notification
   - Addresses: SERV-06, SERV-07

6. **Cross-Vertical Deep-Links** - Configurable URL buttons in dashboard
   - Lightweight, mostly UI
   - Addresses: SERV-09

**Phase ordering rationale:**

- Migration must come first (schema dependency)
- Guest catalog before orders (need UI to create orders)
- Owner catalog and order management can be parallel but catalog first (need items to order)
- Cross-vertical links are independent and can slot anywhere

## Confidence Assessment

| Area                   | Confidence | Notes                                                            |
| ---------------------- | ---------- | ---------------------------------------------------------------- |
| Database schema        | HIGH       | Directly read migration SQL files                                |
| Guest auth pattern     | HIGH       | Read JWT implementation + all API routes                         |
| Service API pattern    | HIGH       | Existing endpoint serves as template                             |
| Cart pattern           | HIGH       | Coffeeshop cart-store well understood                            |
| Owner CRUD pattern     | HIGH       | ChargesManager is exact template                                 |
| Order state machine    | HIGH       | Booking state machine pattern directly applicable                |
| Polling approach       | MEDIUM     | No existing polling pattern in accom, but standard React pattern |
| WhatsApp notifications | HIGH       | Deep-link pattern used in QuickActions + helpers                 |
| Migration scope        | HIGH       | Single column addition, minimal risk                             |

## Gaps to Address

- No existing service order API routes in either PWA or backoffice -- all must be created from scratch
- No existing "drawer/sheet" UI component in accommodations -- may need to create one or use Radix Dialog with mobile styling
- Polling interval (30s) is a guess -- may need adjustment based on real-world usage
- Image upload for service items deferred -- URL-based only for now

## Sources

All findings sourced from direct codebase inspection:

- `shared/database/migrations/schema/077-accommodations-schema.sql` (service tables)
- `shared/database/migrations/schema/083-accommodations-v2-foundation.sql` (order tables)
- `apps/accommodations/frontend/components/stay/ServicesCarousel.tsx`
- `apps/accommodations/frontend/lib/stay-api.ts`
- `apps/accommodations/frontend/types/stay.ts`
- `apps/accommodations/frontend/app/api/stay/[code]/services/route.ts`
- `apps/accommodations/frontend/app/api/stay/verify/route.ts`
- `apps/accommodations/frontend/lib/auth.ts`
- `apps/accommodations/frontend/hooks/useStaySession.ts`
- `apps/accommodations/frontend/app/stay/[code]/page.tsx`
- `apps/accommodations/frontend/components/BottomNav.tsx`
- `apps/accommodations/frontend/components/stay/QuickActions.tsx`
- `apps/accommodations/frontend/components/stay/RestaurantSection.tsx`
- `apps/backoffice/components/settings/ChargesManager.tsx`
- `apps/backoffice/app/api/settings/charges/route.ts`
- `apps/backoffice/app/api/accommodations/bookings/[id]/route.ts`
- `apps/backoffice/lib/accommodations/helpers.ts`
- `apps/backoffice/components/accommodations/BookingStatusBadge.tsx`
- `apps/backoffice/components/layout/Sidebar.tsx`
- `apps/coffeeshop/frontend/lib/cart-store.ts`
- `apps/coffeeshop/frontend/components/StickyCartBar.tsx`

---

_Phase: 23-service-ordering_
_Research completed: 2026-01-31_
