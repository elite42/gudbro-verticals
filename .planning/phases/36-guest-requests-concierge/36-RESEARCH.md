# Phase 36: Guest Requests + Concierge - Research

**Researched:** 2026-02-02
**Domain:** Accommodations PWA Concierge Hub + Backoffice Toggles
**Confidence:** HIGH

## Summary

This phase builds the Tourist Concierge hub as the central discovery point for guests, accessible from the existing BottomNav center button ("Services" tab at index 2, currently using `CallBell` icon). The hub combines 5 sections (Discover, Emergency, Safety, Culture, Transport) plus quick links to WiFi, Documents, and Contacts. The merchant controls section visibility via backoffice toggles.

The codebase is well-prepared for this phase. Key infrastructure already exists: the `BottomNav.tsx` component with 4 tabs (Home, Explore, Services/center, Profile), the `UsefulNumbers` component and API (`/api/stay/[code]/useful-numbers`), the database schema (migration 073) with emergency_numbers, city_useful_numbers, and merchant_useful_numbers tables with RLS, and a comprehensive safety guide document (`docs/features/TOURIST-SAFETY-GUIDE.md`) with all content for Vietnam. The main work is: (1) repurposing the center BottomNav button to open the Concierge hub instead of the ServiceCatalog, (2) building the Concierge hub page with 5 section cards, (3) building sub-pages for each section, (4) adding concierge_sections toggle to `accom_properties`, and (5) building the backoffice toggle UI.

**Primary recommendation:** Build the Concierge hub as a full-screen overlay (same pattern as `ServiceCatalog`) triggered by the center BottomNav button, with section cards that navigate to dedicated sub-views. Store concierge toggles as a JSONB column on `accom_properties` with 5 macro-level boolean flags.

## Standard Stack

This phase uses NO new libraries. Everything is built with the existing stack.

### Core

| Library               | Version  | Purpose                                    | Why Standard                   |
| --------------------- | -------- | ------------------------------------------ | ------------------------------ |
| Next.js               | 14.2.33  | App router, API routes                     | Already in use                 |
| @phosphor-icons/react | latest   | Icons (Compass, Phone, Shield, Globe, Bus) | Project standard per CLAUDE.md |
| Supabase              | existing | Database + RLS                             | Already in use                 |
| Tailwind CSS          | existing | Styling                                    | Already in use                 |

### Supporting

| Library   | Version  | Purpose         | When to Use                  |
| --------- | -------- | --------------- | ---------------------------- |
| next-intl | existing | i18n for labels | Already in use in backoffice |

### Alternatives Considered

None -- this phase is purely feature development using existing patterns.

**Installation:**

```bash
# No new dependencies needed
```

## Architecture Patterns

### Recommended Project Structure

```
apps/accommodations/frontend/
├── components/
│   ├── BottomNav.tsx                    # MODIFY: center button opens Concierge
│   └── stay/
│       ├── ConciergeHub.tsx             # NEW: full-screen overlay with section cards
│       ├── ConciergeEmergency.tsx       # NEW: emergency numbers + embassies with click-to-call
│       ├── ConciergeSafety.tsx          # NEW: safety tips accordion by category
│       ├── ConciergeCulture.tsx         # NEW: dos/don'ts + recommended apps
│       ├── ConciergeTransport.tsx       # NEW: transport info + tips
│       ├── ConciergeDiscover.tsx        # NEW: placeholder for Explore/Map (plan 36-03)
│       └── UsefulNumbers.tsx            # EXISTS: reuse/enhance for dedicated page
├── app/
│   └── api/stay/[code]/
│       └── concierge/
│           └── route.ts                 # NEW: returns concierge config + section visibility
├── lib/
│   └── concierge-data.ts               # NEW: static content (safety tips, cultural tips, etc.)
└── types/
    └── stay.ts                          # MODIFY: add concierge types

apps/backoffice/
├── app/(dashboard)/settings/
│   └── concierge/
│       └── page.tsx                     # NEW: concierge section toggle settings
├── components/
│   └── settings/
│       └── ConciergeToggles.tsx         # NEW: toggle UI component
└── app/api/settings/
    └── concierge/
        └── route.ts                     # NEW: GET/PUT concierge settings

shared/database/migrations/schema/
└── 0XX-concierge-sections.sql           # NEW: add concierge_sections JSONB to accom_properties
```

### Pattern 1: Full-Screen Overlay (like ServiceCatalog)

**What:** The Concierge hub opens as a full-screen overlay triggered by the center BottomNav button, exactly like how ServiceCatalog works today.
**When to use:** When the center BottomNav button is tapped.
**Example:**

```typescript
// Source: existing pattern in apps/accommodations/frontend/app/stay/[code]/page.tsx
// Lines 108-116: handleTabChange already handles 'services' -> open overlay
const handleTabChange = useCallback(
  (tab: string) => {
    setActiveTab(tab);
    if (tab === 'services') {
      setShowConcierge(true); // was setShowCatalog(true)
    }
  },
  []
);

// Render overlay:
{showConcierge && (
  <ConciergeHub
    bookingCode={params.code}
    token={token!}
    property={property}
    onClose={() => {
      setShowConcierge(false);
      setActiveTab('home');
    }}
  />
)}
```

### Pattern 2: JSONB Toggle Column on accom_properties

**What:** Store concierge section visibility as JSONB on `accom_properties`, following the same pattern as `social_links`, `operating_hours`, and `quick_actions` columns.
**When to use:** For merchant-controlled section toggles.
**Example:**

```sql
-- Source: follows pattern from 094-property-data-onboarding.sql
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS concierge_sections JSONB DEFAULT '{
    "discover": true,
    "emergency": true,
    "safety": true,
    "culture": true,
    "transport": true
  }'::jsonb;

COMMENT ON COLUMN accom_properties.concierge_sections IS
  'JSONB: { discover: bool, emergency: bool, safety: bool, culture: bool, transport: bool }';
```

### Pattern 3: Static Content Module

**What:** Safety tips, cultural tips, and transport info are static content (currently Vietnam-specific), stored as TypeScript constants in a dedicated module, NOT in the database. This keeps the DB lean and content easy to maintain.
**When to use:** For all concierge content that is country-specific but not merchant-specific.
**Example:**

```typescript
// lib/concierge-data.ts
export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  howToProtect: string[];
  where?: string;
}

export interface SafetyCategory {
  id: string;
  label: string;
  icon: string; // Phosphor icon name
  tips: SafetyTip[];
}

export const SAFETY_CATEGORIES: SafetyCategory[] = [
  {
    id: 'transport',
    label: 'Transport',
    icon: 'Car',
    tips: [
      {
        id: 'taxi-meter',
        title: 'Taxi with rigged meter',
        description: 'The meter runs faster than normal...',
        howToProtect: [
          'Use Grab, Be, or Xanh SM apps',
          'Only Vinasun (white) or Mai Linh (green)',
        ],
        where: 'Airports, train stations, tourist zones',
      },
      // ... from TOURIST-SAFETY-GUIDE.md
    ],
  },
  // ... 10 more categories
];
```

### Pattern 4: Backoffice Settings Tab

**What:** Add a "Concierge" tab to the settings layout alongside General, Site Builder, Hours, etc. This follows the existing tab pattern in `apps/backoffice/app/(dashboard)/settings/layout.tsx`.
**When to use:** For the backoffice concierge toggle UI.
**Example:**

```typescript
// Add to settingsTabs array in layout.tsx
{ name: 'Concierge', href: '/settings/concierge', icon: Compass },
```

### Pattern 5: Click-to-Call

**What:** Emergency numbers and embassies use `<a href="tel:NUMBER">` for native phone dialing, same pattern already used in `UsefulNumbers.tsx`.
**When to use:** All phone numbers in the Concierge hub.
**Example:**

```typescript
// Source: existing pattern in UsefulNumbers.tsx line 77-78
<a
  href={`tel:${num.phoneNumber}`}
  className="flex items-center gap-1.5 rounded-lg bg-[#E07A5F]/10 px-3 py-1.5 text-sm font-semibold text-[#E07A5F]"
>
  <Phone size={16} weight="fill" />
  {num.phoneNumber}
</a>
```

### Anti-Patterns to Avoid

- **Storing static safety content in the database:** The safety guide content (600+ lines) is read-only, country-specific, and changes infrequently. Keep it as TypeScript constants, not DB rows. The DB should only store toggles.
- **Granular sub-section toggles:** The context says 5 macro sections. Adding sub-toggles (e.g., toggling individual safety categories) creates complexity without value. Start with 5 macro toggles.
- **Building the Explore/Map page with real map integration in this phase:** The existing "Explore" tab already shows a placeholder. Phase 36-03 should build a card-based attractions page with deep-links, NOT a full map integration.
- **Duplicating center button behavior:** The center BottomNav button currently opens ServiceCatalog. Phase 36 MUST change it to open Concierge. Services remain accessible from the Home tab's DashboardCard and ServicesCarousel.

## Don't Hand-Roll

| Problem                    | Don't Build                  | Use Instead                                            | Why                                                                        |
| -------------------------- | ---------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| Accordion expand/collapse  | Custom state management      | HTML `<details>`/`<summary>` or simple useState toggle | Native HTML accordion works perfectly, no library needed                   |
| Phone number formatting    | Custom formatter             | `<a href="tel:">` with raw numbers                     | Browser handles dialing natively                                           |
| Section toggle persistence | Custom state solution        | JSONB column on accom_properties                       | Follows existing property settings pattern (social_links, operating_hours) |
| Safety content i18n        | Database-driven translations | Static TypeScript modules per language                 | Content is curated, not auto-translated; keeps it maintainable             |

**Key insight:** This phase is primarily a UI/content delivery feature. The database work is minimal (one JSONB column + migration). The bulk of work is building components and organizing static content from the existing TOURIST-SAFETY-GUIDE.md.

## Common Pitfalls

### Pitfall 1: Breaking ServiceCatalog Access

**What goes wrong:** Repurposing the center BottomNav button for Concierge removes direct access to ServiceCatalog.
**Why it happens:** The center button currently opens ServiceCatalog; guests rely on it.
**How to avoid:** Ensure services remain accessible via: (1) DashboardCard "Services" on the home tab grid, (2) ServicesCarousel "View All" button, (3) CartFAB when cart has items. The Concierge hub can ALSO have a "Room Service" quick link that opens ServiceCatalog.
**Warning signs:** If the Concierge hub has no path back to ordering services, the UX is broken.

### Pitfall 2: BottomNav Icon Confusion

**What goes wrong:** Changing the center button icon/label without clear visual distinction makes guests confused about what it does.
**Why it happens:** CallBell (services) vs Compass (concierge) are different concepts.
**How to avoid:** Use Phosphor `Compass` icon with "Concierge" label. The icon change clearly signals a new destination. The existing `CallBell` / "Services" was already defined in Phase 33's nav restructure notes.
**Warning signs:** If user testing shows confusion between old and new center button.

### Pitfall 3: Hardcoded Vietnam Content

**What goes wrong:** Safety tips, emergency numbers, and cultural content are hardcoded for Vietnam only.
**Why it happens:** TOURIST-SAFETY-GUIDE.md is Vietnam-specific.
**How to avoid:** Structure the static content module with country as the top-level key. For now, only Vietnam is populated. The architecture supports adding more countries later. Emergency numbers already come from the DB (country_code-based).
**Warning signs:** Any country reference in component JSX rather than in the data module.

### Pitfall 4: Toggle Not Affecting PWA Rendering

**What goes wrong:** Merchant toggles off a section in backoffice but it still shows in the PWA.
**Why it happens:** Forgetting to pass concierge_sections to the guest-facing API, or forgetting to filter in the frontend.
**How to avoid:** The `/api/stay/[code]/concierge` endpoint MUST include the toggle state. ConciergeHub MUST filter sections based on the response. Add verification: if `sections.emergency === false`, the Emergency card must not render.
**Warning signs:** No conditional rendering based on toggle state in ConciergeHub component.

### Pitfall 5: Overwhelming Content Volume

**What goes wrong:** Dumping all 600+ lines of safety tips on one page makes it unusable on mobile.
**Why it happens:** The TOURIST-SAFETY-GUIDE.md is comprehensive.
**How to avoid:** Use accordion pattern (collapsed by default). Show category cards first (Transport, Money, Food, etc.), each expands to show individual tips. Each tip has a brief title visible, and full content expands on tap.
**Warning signs:** Any section rendering more than 3-4 visible items without pagination or accordion.

## Code Examples

### Concierge Hub Section Card

```typescript
// ConciergeHub.tsx - section card pattern
interface SectionCardProps {
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  count?: number;
  onClick: () => void;
}

function SectionCard({ icon: Icon, label, description, color, count, onClick }: SectionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={24} weight="duotone" style={{ color }} />
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-[#2D2016]">{label}</h3>
        <p className="text-xs text-[#8B7355]">{description}</p>
      </div>
      {count !== undefined && (
        <span className="rounded-full bg-[#FAF8F5] px-2.5 py-1 text-xs font-medium text-[#8B7355]">
          {count}
        </span>
      )}
    </button>
  );
}
```

### Safety Tips Accordion

```typescript
// ConciergeSafety.tsx - accordion pattern
import { useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E8E2D9] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-[#2D2016]">{title}</span>
        {isOpen ? (
          <CaretUp size={16} weight="bold" className="text-[#8B7355]" />
        ) : (
          <CaretDown size={16} weight="bold" className="text-[#8B7355]" />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4 text-sm text-[#6B6560]">{children}</div>}
    </div>
  );
}
```

### Backoffice Toggle UI

```typescript
// ConciergeToggles.tsx - follows existing backoffice patterns
const CONCIERGE_SECTIONS = [
  { key: 'discover', label: 'Discover', description: 'Local attractions and points of interest', icon: MapPin },
  { key: 'emergency', label: 'Emergency', description: 'Emergency numbers and embassy contacts', icon: Phone },
  { key: 'safety', label: 'Safety Tips', description: 'Scam alerts and practical safety advice', icon: Shield },
  { key: 'culture', label: 'Culture', description: 'Cultural tips, dos/don\'ts, recommended apps', icon: Globe },
  { key: 'transport', label: 'Transport', description: 'How to get around, correct fares', icon: Bus },
] as const;

// Toggle rendering pattern (follows backoffice notification toggle pattern):
{CONCIERGE_SECTIONS.map((section) => (
  <div key={section.key} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
    <div className="flex items-center gap-3">
      <section.icon size={20} weight="duotone" className="text-gray-600" />
      <div>
        <p className="font-medium text-gray-900">{section.label}</p>
        <p className="text-sm text-gray-500">{section.description}</p>
      </div>
    </div>
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={sections[section.key]}
        onChange={(e) => updateSection(section.key, e.target.checked)}
        className="peer sr-only"
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 ..." />
    </label>
  </div>
))}
```

### Database Migration

```sql
-- 0XX-concierge-sections.sql
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS concierge_sections JSONB DEFAULT '{
    "discover": true,
    "emergency": true,
    "safety": true,
    "culture": true,
    "transport": true
  }'::jsonb;

COMMENT ON COLUMN accom_properties.concierge_sections IS
  'JSONB toggles for Concierge hub sections visible to guests. All default ON.';
```

### Concierge API Endpoint

```typescript
// /api/stay/[code]/concierge/route.ts
// Follows exact same pattern as /api/stay/[code]/useful-numbers/route.ts
export async function GET(request: NextRequest) {
  const guest = await authenticateGuest(request);
  if (!guest) {
    return NextResponse.json<ApiResponse<null>>(
      { error: 'session_expired' },
      { status: 401 }
    );
  }

  const supabase = getSupabaseAdmin();

  // Fetch property with concierge settings
  const { data: property } = await supabase
    .from('accom_properties')
    .select('country, city, concierge_sections')
    .eq('id', guest.propertyId)
    .single();

  // Return sections visibility + country for content lookup
  return NextResponse.json({
    data: {
      sections: property?.concierge_sections || DEFAULT_SECTIONS,
      country: property?.country || 'VN',
      city: property?.city || '',
    },
  });
}
```

## State of the Art

| Old Approach                            | Current Approach                             | When Changed | Impact                                         |
| --------------------------------------- | -------------------------------------------- | ------------ | ---------------------------------------------- |
| Center button = ServiceCatalog          | Center button = Concierge Hub                | Phase 36     | Services move to DashboardCard + carousel only |
| UsefulNumbers as scroll section on home | UsefulNumbers as dedicated page in Concierge | Phase 36     | Better discoverability, organized by context   |
| No safety/cultural info                 | Full safety guide + cultural tips            | Phase 36     | Major value-add for tourist guests             |

**Deprecated/outdated:**

- The `QuickActions` component (line 17-31 of QuickActions.tsx) references a "Concierge" action that sends a WhatsApp message. This WhatsApp-based concierge concept is being replaced by the in-app Concierge hub. The QuickAction named "concierge" should either be removed or renamed to avoid confusion.

## Open Questions

1. **Explore/Map page depth (Plan 36-03)**
   - What we know: The existing "Explore" tab shows a placeholder. The roadmap says "local attractions, tours, experiences."
   - What's unclear: Whether this should integrate with Google Maps, or be a card-based list of curated attractions, or link to the Tours vertical.
   - Recommendation: Start with card-based curated attractions (name, description, image, distance, deep-link). No map integration in this phase. Cross-vertical deep-links to Tours PWA where applicable.

2. **Multi-country content expansion**
   - What we know: TOURIST-SAFETY-GUIDE.md is Vietnam-only. The architecture should support other countries.
   - What's unclear: When other countries will be needed, which ones first.
   - Recommendation: Structure content module with `country: string` key. Populate only Vietnam now. Add countries as GUDBRO expands.

3. **BottomNav center button visual treatment**
   - What we know: Current BottomNav has 4 equal-sized items. The "Services" item at index 2 has `isCenter: true` but no special styling.
   - What's unclear: Whether the Concierge button should have a visually distinct treatment (raised, larger, different color) to signal its importance.
   - Recommendation: Keep it simple -- same size as other tabs, but use Phosphor `Compass` icon with "Concierge" label. Visual distinction can be added later if needed.

4. **Existing UsefulNumbers component reuse**
   - What we know: `UsefulNumbers.tsx` already renders emergency + city numbers with click-to-call. It's currently embedded in the home tab scroll.
   - What's unclear: Should the Concierge "Emergency" section reuse this component, or should a new `ConciergeEmergency` component be built with richer layout (embassies, tourist hotline, etc.)?
   - Recommendation: Build `ConciergeEmergency` as a new, richer component that includes embassy contacts and tourist hotlines from the safety guide. The existing `UsefulNumbers` component can remain on the home tab as a compact summary, or be replaced with a link to the Concierge hub.

## Sources

### Primary (HIGH confidence)

- Codebase inspection: `apps/accommodations/frontend/components/BottomNav.tsx` -- current 4-tab nav
- Codebase inspection: `apps/accommodations/frontend/app/stay/[code]/page.tsx` -- dashboard page with overlay patterns
- Codebase inspection: `apps/accommodations/frontend/components/stay/UsefulNumbers.tsx` -- existing useful numbers UI
- Codebase inspection: `apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts` -- existing API
- Codebase inspection: `shared/database/migrations/schema/073-useful-numbers.sql` -- DB schema with RLS
- Codebase inspection: `shared/database/migrations/schema/094-property-data-onboarding.sql` -- JSONB column pattern
- Codebase inspection: `apps/backoffice/components/settings/UsefulNumbersManager.tsx` -- backoffice UI patterns
- Codebase inspection: `apps/backoffice/app/(dashboard)/settings/layout.tsx` -- settings tab layout
- Content source: `docs/features/TOURIST-SAFETY-GUIDE.md` -- 600+ lines of Vietnam safety content
- Content source: `docs/backlog/specs/P2/USEFUL-NUMBERS.md` -- useful numbers spec

### Secondary (MEDIUM confidence)

- Codebase patterns: toggle UI pattern derived from backoffice settings page notification toggles

### Tertiary (LOW confidence)

- None

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- no new libraries, all existing patterns
- Architecture: HIGH -- directly follows existing overlay, JSONB column, and settings tab patterns
- Pitfalls: HIGH -- derived from actual codebase analysis (e.g., ServiceCatalog displacement)
- Content structure: HIGH -- TOURIST-SAFETY-GUIDE.md provides all content

**Research date:** 2026-02-02
**Valid until:** 2026-03-02 (30 days -- stable patterns, no external dependencies)
