# Phase 33: Guest Dashboard Redesign - Research

**Researched:** 2026-02-01
**Domain:** React component architecture, card-based UI layout, state preservation
**Confidence:** HIGH

## Summary

Phase 33 transforms the guest in-stay dashboard from a vertical scrolling list of ~14 sections into a card-based homepage with 6-8 clickable cards, adds WiFi dismiss/recover logic, restructures navigation (check-in/out into house rules, contact host to header), and builds a Profile page. The codebase is mature with 22 stay components, established patterns, and a single 386-line `InStayDashboard` page component managing 15+ state variables.

The primary challenge is **not building new features** but **reorganizing existing components** without breaking state contracts. The current page.tsx is both a state manager and a renderer. The redesign must split these concerns: keep all state management in page.tsx, but change what renders in the "home" tab from a vertical list to a card grid that links to detail views.

**Primary recommendation:** Create a DashboardGrid component that renders clickable cards (not the full components inline). Each card navigates to a detail view or opens an overlay. WiFi dismiss uses localStorage. Profile page assembles existing data from `stay` + `documents` + `orders`. No new npm packages, no new API endpoints, no database migration required for MVP (dashboard_layout JSONB is optional, defer to backoffice settings phase).

## Standard Stack

### Core (Already in Codebase)

| Library        | Version               | Purpose                                       | Why Standard                   |
| -------------- | --------------------- | --------------------------------------------- | ------------------------------ |
| Next.js        | 14.2.33               | App router, page-level state                  | Already deployed               |
| Tailwind CSS   | 3.x                   | All styling, responsive grid                  | Already deployed               |
| Phosphor Icons | @phosphor-icons/react | Icon system (duotone weight)                  | Project standard per CLAUDE.md |
| date-fns       | 3.x                   | Date formatting (WelcomeCard, VisaStatusCard) | Already used                   |

### Supporting (Already Available)

| Library               | Version | Purpose                | When to Use                |
| --------------------- | ------- | ---------------------- | -------------------------- |
| qrcode                | 1.x     | WiFi QR generation     | Already in WifiCard        |
| @shared/utils/qr/wifi | local   | WiFi string generation | Already imported           |
| @shared/payment       | local   | Currency config        | Already in DashboardHeader |

### Alternatives Considered

| Instead of                    | Could Use              | Tradeoff                                                                            |
| ----------------------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| CSS Grid (Tailwind)           | react-grid-layout      | Overkill -- no drag-and-drop needed, plain CSS grid is sufficient                   |
| localStorage for WiFi dismiss | Cookie or server state | localStorage is simpler, already used by ReturnGuestBanner for same dismiss pattern |
| New routing for profile       | Tab-based rendering    | Tab rendering already exists (activeTab state), keep pattern consistent             |

**Installation:** None required. Zero new npm packages.

## Architecture Patterns

### Current Architecture (What Exists)

The `InStayDashboard` page (`app/stay/[code]/page.tsx`) is a single component managing:

**State Variables (15 total):**

1. `token` -- from useStaySession hook
2. `stay` -- from useStaySession hook
3. `isLoading` -- from useStaySession hook
4. `isAuthenticated` -- from useStaySession hook
5. `propertyExtended` -- fetched property data
6. `_propertyLoading` -- property fetch loading state
7. `activeTab` -- current bottom nav tab ('home' | 'map' | 'services' | 'menu' | 'profile')
8. `cart` -- from useServiceCart hook (items, addItem, removeItem, etc.)
9. `showCatalog` -- service catalog overlay visibility
10. `showCart` -- cart drawer visibility
11. `serviceCategories` -- loaded service categories
12. `serviceTimezone` -- timezone for services
13. `selectedCurrency` -- user currency preference
14. `documents` -- guest uploaded documents
15. `showUpload` -- document upload form visibility
16. `orders` -- from useOrderPolling hook

**Data sources (3 hooks + 2 API calls):**

- `useStaySession()` -- JWT session management
- `useServiceCart()` -- cart state
- `useOrderPolling()` -- order polling
- `fetchProperty()` -- property extended data
- `fetchDocuments()` -- guest documents

**Tab system:**

- BottomNav has 5 tabs: Home, Map, Services, Menu, Profile
- Map and Profile are placeholder "coming soon" screens
- Services tab opens ServiceCatalog overlay
- Menu tab triggers onMenuToggle (currently no-op)

### Recommended Redesign Pattern

**Pattern: Card Grid with Detail Navigation**

The home tab currently renders ~14 sections inline. Redesign replaces this with a grid of 6-8 clickable cards. Each card is a visual entry point (icon + label + optional status badge), not the full component.

```
BEFORE (scrolling wall):                AFTER (card grid):
+--------------------------+            +--------------------------+
| WiFi Card (full)         |            | WiFi Card (compact/dismiss)|
| Welcome Card (full)      |            | Welcome/Stay Summary      |
| Visa Status (full)       |            +------------+-------------+
| Quick Actions (full)     |            | WiFi       | Services    |
| Restaurant (full)        |            | (icon+ssid)| (icon+count)|
| Services Carousel (full) |            +------------+-------------+
| Active Orders (full)     |            | Orders     | House Rules |
| Documents (full)         |            | (badge)    | (checkin/out)|
| Local Deals (full)       |            +------------+-------------+
| Useful Numbers (full)    |            | Documents  | Concierge   |
| Return Banner (full)     |            | (count)    | (contact+#s)|
| Checkout Info (full)     |            +------------+-------------+
| Contact Host (full)      |            | [Deals banner if active]  |
+--------------------------+            +--------------------------+
```

**Where do full components go?**

- WiFi: Tapping WiFi card shows full WifiCard (expand inline or sheet)
- Services: Tapping opens ServiceCatalog overlay (existing)
- Orders: Tapping opens order list (new simple view or overlay)
- House Rules: Tapping shows CheckoutInfo content (now including check-in/out times)
- Documents: Tapping opens document list with upload (existing DocumentUpload)
- Concierge: Tapping opens contact + useful numbers (combine ContactSheet + UsefulNumbers)
- Profile tab: Full page with personal data, documents, history

### Recommended Project Structure

```
components/stay/
  DashboardGrid.tsx         # NEW - Card grid layout component
  DashboardCard.tsx         # NEW - Individual clickable card
  HouseRulesSheet.tsx       # NEW - Combined check-in/out + house rules
  ProfileView.tsx           # NEW - Profile tab content
  WifiCard.tsx              # MODIFY - Add dismiss/recover logic
  CheckoutInfo.tsx          # MODIFY - Accept check-in time prop
  ContactSheet.tsx          # MODIFY - Move trigger to header
  DashboardHeader.tsx       # MODIFY - Add contact host button
  BottomNav.tsx             # NO CHANGE (nav restructure deferred to Phase 36)
  [all other components]    # NO CHANGE - used as detail views
```

### Pattern 1: DashboardGrid Component

**What:** A responsive CSS grid that renders colored cards, each with an icon, label, and optional badge
**When to use:** Homepage "home" tab rendering

```tsx
// DashboardGrid.tsx
interface DashboardCardConfig {
  id: string;
  label: string;
  icon: PhosphorIcon;
  iconWeight?: 'regular' | 'duotone' | 'fill';
  color: string; // Tailwind bg class e.g. 'bg-teal-500'
  badge?: string | number; // e.g. "2 active" for orders
  visible: boolean;
  onClick: () => void;
}

function DashboardGrid({ cards }: { cards: DashboardCardConfig[] }) {
  const visibleCards = cards.filter((c) => c.visible);
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {visibleCards.map((card) => (
        <DashboardCard key={card.id} {...card} />
      ))}
    </div>
  );
}
```

### Pattern 2: WiFi Dismiss/Recover (localStorage)

**What:** WiFi card shows at top, guest taps X to hide, can recover from Concierge section
**When to use:** NAV-02 requirement

```tsx
// Already established pattern in ReturnGuestBanner.tsx
const WIFI_DISMISSED_KEY = 'gudbro_wifi_dismissed';

// In WifiCard: add dismiss button (X icon), write to localStorage
// In Concierge card detail: check localStorage, show "Show WiFi" button if dismissed
```

### Pattern 3: Profile Page Assembly

**What:** Profile tab shows data from existing sources, no new API
**When to use:** NAV-08 requirement

```tsx
// Profile assembles from:
// 1. stay.booking -> guestName, guestCount, checkIn, checkOut, code
// 2. stay.room -> number, name, floor
// 3. documents[] -> uploaded passport/visa
// 4. orders[] -> order history (all statuses)
// No new API endpoint needed -- all data already loaded
```

### Anti-Patterns to Avoid

- **Moving state management into child components:** Keep all 15+ state vars in page.tsx. DashboardGrid is presentation-only.
- **Creating new API endpoints for profile data:** All data is already fetched. Profile page just renders it differently.
- **Adding dashboard_layout JSONB migration now:** The roadmap mentions it but it's owner-facing config. For Phase 33 MVP, use hardcoded card list. Add DB config when backoffice dashboard settings are built.
- **Breaking the ServiceCatalog overlay flow:** The cart + catalog overlay system works. Cards should open the same overlay, not a new page.

## Don't Hand-Roll

| Problem               | Don't Build            | Use Instead                                               | Why                                           |
| --------------------- | ---------------------- | --------------------------------------------------------- | --------------------------------------------- |
| WiFi dismiss state    | Custom context/reducer | localStorage + useState (copy ReturnGuestBanner pattern)  | Exact same pattern already exists in codebase |
| Card grid layout      | Custom grid system     | Tailwind `grid grid-cols-2 gap-3`                         | CSS grid handles this perfectly               |
| Check-in/out display  | New component          | Modify CheckoutInfo to accept checkIn prop                | Component already renders house rules         |
| Contact in header     | New header component   | Add button to existing DashboardHeader                    | Component already has currency selector slot  |
| Profile data assembly | New API endpoint       | Compose from existing useStaySession + documents + orders | All data already loaded at page level         |

**Key insight:** This phase is 90% reorganization and 10% new code. The existing components are well-built. The problem is layout, not functionality.

## Common Pitfalls

### Pitfall 1: Breaking State Contracts

**What goes wrong:** Refactoring page.tsx to use DashboardGrid disrupts the cart, service catalog, or order polling.
**Why it happens:** Page.tsx is both state container and renderer. Moving rendering can accidentally break prop drilling.
**How to avoid:** Keep page.tsx as the single state owner. Pass callbacks to DashboardGrid cards via closure. Never move useState calls out of page.tsx.
**Warning signs:** Cart stops working after tab switch, orders stop polling, service categories not available for catalog.

### Pitfall 2: Double-Wrapping Cards

**What goes wrong:** Each existing component already has `rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm` wrapping in page.tsx. DashboardGrid cards add their own wrapping. Double borders, extra padding.
**Why it happens:** The current page wraps each component in a card div. The new grid cards are themselves card-shaped elements.
**How to avoid:** DashboardGrid cards are the new visual elements (colored icon tiles). When a card opens a detail view, the detail view renders the existing component WITHOUT the outer card wrapper from page.tsx.
**Warning signs:** Nested rounded borders, inconsistent spacing, "card inside a card" visual.

### Pitfall 3: WiFi Dismiss Flash

**What goes wrong:** WiFi card briefly shows then disappears on page load because localStorage check is async.
**Why it happens:** useState defaults to showing, useEffect reads localStorage after first render.
**How to avoid:** Default to hidden (`useState(true)` for dismissed), same pattern as ReturnGuestBanner which starts `dismissed=true` and then shows if not dismissed.
**Warning signs:** Brief flash of WiFi card on every page load for users who dismissed it.

### Pitfall 4: Forgetting to Preserve Services Tab Flow

**What goes wrong:** Services card tap doesn't open ServiceCatalog because the `handleTabChange` + `showCatalog` wiring was disrupted.
**Why it happens:** Moving from inline rendering to card-grid changes how the catalog overlay gets triggered.
**How to avoid:** Card onClick for "Services" should call the same `setShowCatalog(true)` that currently exists. Test: tap Services card -> catalog opens with categories loaded.
**Warning signs:** Services card opens but catalog is empty (categories not loaded yet).

### Pitfall 5: Profile Tab Without Data

**What goes wrong:** Profile tab renders but shows empty state because documents and orders haven't loaded.
**Why it happens:** Documents fetch and order polling are already running, but Profile needs to handle loading states.
**How to avoid:** Profile component receives documents and orders as props from page.tsx (already loaded). Show loading skeleton while page-level fetches complete.
**Warning signs:** Profile shows "No documents" initially, then updates after fetch completes (jarring flash).

## Code Examples

### Card Grid with Tailwind CSS Grid

```tsx
// Source: Tailwind CSS grid (codebase pattern)
<div className="grid grid-cols-2 gap-3 px-4 py-4">
  {/* Each card is ~equal size */}
  <button
    onClick={onWifiTap}
    className="flex flex-col items-center gap-2 rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition-all hover:shadow-md active:scale-95"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
      <WifiHigh size={28} weight="duotone" className="text-teal-600" />
    </div>
    <span className="text-sm font-medium text-[#2D2016]">WiFi</span>
    {wifiSsid && (
      <span className="max-w-full truncate text-[10px] text-[#8B7355]">
        {wifiSsid}
      </span>
    )}
  </button>
  {/* ... more cards */}
</div>
```

### WiFi Dismiss/Recover Pattern (from ReturnGuestBanner)

```tsx
// Source: components/stay/ReturnGuestBanner.tsx (existing pattern)
const WIFI_DISMISSED_KEY = 'gudbro_wifi_dismissed';

// Dismiss: starts hidden to avoid flash
const [wifiDismissed, setWifiDismissed] = useState(true);

useEffect(() => {
  try {
    const wasDismissed = localStorage.getItem(WIFI_DISMISSED_KEY) === 'true';
    setWifiDismissed(wasDismissed);
  } catch {
    setWifiDismissed(false);
  }
}, []);

const handleDismissWifi = () => {
  setWifiDismissed(true);
  try {
    localStorage.setItem(WIFI_DISMISSED_KEY, 'true');
  } catch {}
};

const handleRecoverWifi = () => {
  setWifiDismissed(false);
  try {
    localStorage.removeItem(WIFI_DISMISSED_KEY);
  } catch {}
};
```

### Contact Host in Header

```tsx
// Source: components/stay/DashboardHeader.tsx (modify existing)
// Add a phone/chat icon button next to currency selector
import { ChatCircleDots } from '@phosphor-icons/react';

// In DashboardHeader, add prop:
interface DashboardHeaderProps {
  property: PropertyInfo;
  defaultCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
  onContactHost?: () => void; // NEW
}

// Render next to currency selector:
{
  onContactHost && (
    <button
      onClick={onContactHost}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100"
      aria-label="Contact host"
    >
      <ChatCircleDots size={18} weight="duotone" className="text-[#3D8B87]" />
    </button>
  );
}
```

### Check-in/out Inside House Rules

```tsx
// Source: components/stay/CheckoutInfo.tsx (modify existing)
// Add checkInTime prop, rename to HouseRulesSheet or modify CheckoutInfo
interface CheckoutInfoProps {
  checkInTime?: string; // NEW - from booking or property
  checkoutTime: string;
  checkoutProcedure?: string;
  houseRules?: string[];
}

// Render check-in time alongside checkout time:
<div className="flex gap-3">
  {checkInTime && (
    <div className="flex-1 rounded-xl bg-[#FAF8F5] p-3">
      <p className="text-[10px] uppercase tracking-wide text-[#8B7355]">
        Check-in
      </p>
      <p className="text-base font-semibold text-[#2D2016]">{checkInTime}</p>
    </div>
  )}
  <div className="flex-1 rounded-xl bg-[#FAF8F5] p-3">
    <p className="text-[10px] uppercase tracking-wide text-[#8B7355]">
      Check-out
    </p>
    <p className="text-base font-semibold text-[#2D2016]">{checkoutTime}</p>
  </div>
</div>;
```

## State of the Art

| Old Approach                       | Current Approach         | When Changed | Impact                                                    |
| ---------------------------------- | ------------------------ | ------------ | --------------------------------------------------------- |
| Vertical scroll list               | Card-based grid homepage | Phase 33     | All competitors use card UI -- current design is outdated |
| Check-in/out as separate section   | Inside House Rules       | Phase 33     | Reduces homepage clutter, logical grouping                |
| Contact Host prominent on homepage | Header icon button       | Phase 33     | Frees homepage space, always accessible from any tab      |
| Profile tab "coming soon"          | Functional profile page  | Phase 33     | Guests can see their data, documents, history             |

**Not changing (stable):**

- useStaySession JWT pattern -- works well
- useServiceCart hook -- cart survives tab navigation
- useOrderPolling hook -- real-time order updates
- All API endpoints -- no backend changes needed

## Critical State Contract Map

These are the state variables and their consumers that MUST be preserved:

| State                      | Set By                                                | Consumed By                                                    | Risk if Broken        |
| -------------------------- | ----------------------------------------------------- | -------------------------------------------------------------- | --------------------- |
| `cart` (useServiceCart)    | ServicesCarousel, ServiceCatalog                      | CartFAB, CartDrawer, ServiceCatalog                            | Cannot place orders   |
| `showCatalog`              | BottomNav "services" tab, ServicesCarousel "View All" | ServiceCatalog overlay render                                  | Services inaccessible |
| `serviceCategories`        | ServicesCarousel onCategoriesLoaded                   | ServiceCatalog, BottomNav services tab check                   | Catalog opens empty   |
| `orders` (useOrderPolling) | Auto-polling hook                                     | ActiveOrders                                                   | Orders not visible    |
| `documents`                | fetchDocuments + loadDocuments callback               | Documents section, DocumentUpload onComplete                   | Upload breaks         |
| `token`                    | useStaySession                                        | All API calls (fetchProperty, fetchServices, fetchDeals, etc.) | All fetches fail      |
| `activeTab`                | BottomNav, handleTabChange                            | renderTabContent switch                                        | Wrong tab renders     |

## Open Questions

1. **dashboard_layout JSONB: Now or later?**
   - What we know: ARCHITECTURE.md specifies it on accom_properties, migration 095
   - What's unclear: Is this needed for Phase 33 MVP or can it wait for backoffice settings?
   - Recommendation: **Defer.** Use hardcoded card list. No owner can configure it until backoffice UI exists. Add the column and backoffice toggle in a future phase.

2. **Card detail views: Inline expand vs. sheet vs. route?**
   - What we know: ServiceCatalog uses full overlay. ContactSheet uses bottom sheet.
   - What's unclear: Should WiFi/House Rules/Documents use bottom sheet or inline expand?
   - Recommendation: **Bottom sheet** for consistency with ContactSheet pattern. Lightweight, no routing changes.

3. **Concierge card scope: Phase 33 or Phase 36?**
   - What we know: NAV-02 says WiFi recoverable from Concierge hub. Phase 36 builds the full Concierge hub.
   - What's unclear: Does Phase 33 need a mini Concierge, or just a card that combines contact + useful numbers?
   - Recommendation: Phase 33 creates a "Concierge" card that opens a sheet with Contact Host + Useful Numbers + WiFi recover link. Phase 36 upgrades this to the full hub.

4. **Property check-in time: Available in data?**
   - What we know: `property.checkoutTime` exists. Check-in time is not in PropertyInfo type.
   - What's unclear: Does the database have check-in time? Or is it in houseRules string array?
   - Recommendation: Check if check-in time exists in DB. If not, parse from houseRules or add a simple text field. For MVP, can show "Check-in: 2:00 PM" as the most common default if no data exists.

## Sources

### Primary (HIGH confidence)

- Direct codebase analysis of `apps/accommodations/frontend/` -- all 22 stay components read
- `app/stay/[code]/page.tsx` -- 386 lines, 15+ state variables mapped
- `.planning/research/ARCHITECTURE.md` -- Section 3.6 (Homepage Redesign architecture decision)
- `.planning/REQUIREMENTS.md` -- NAV-01 through NAV-08 definitions
- `.planning/ROADMAP.md` -- Phase 33 success criteria and plan descriptions

### Secondary (MEDIUM confidence)

- `.planning/research/SUMMARY.md` -- Research summary with DashboardGrid decision
- Existing dismiss pattern in `ReturnGuestBanner.tsx` -- proven localStorage approach

### Tertiary (LOW confidence)

- dashboard_layout JSONB migration timing -- mentioned in ARCHITECTURE.md but not yet created

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- zero new packages, all existing
- Architecture: HIGH -- codebase fully analyzed, all 22 components read, state contracts mapped
- Pitfalls: HIGH -- derived from actual code analysis (state coupling, flash issues, double-wrapping)
- Profile page: MEDIUM -- depends on available data (check-in time availability uncertain)

**Research date:** 2026-02-01
**Valid until:** 2026-03-01 (stable codebase, no external dependencies)
