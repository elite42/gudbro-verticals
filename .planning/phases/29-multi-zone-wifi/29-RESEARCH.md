# Phase 29: Multi-Zone WiFi - Research

**Researched:** 2026-02-01
**Domain:** JSONB schema extension, accommodations frontend/backoffice, WiFi zone management
**Confidence:** HIGH

## Summary

Phase 29 adds multi-zone WiFi support to the accommodations vertical. Currently, properties store a single `wifi_network` + `wifi_password` on `accom_properties` (confirmed in migration 077, renamed in 081). Rooms have no WiFi override columns. The guest-facing `WifiCard.tsx` is a simple single-network component with a gradient teal card and copy-password button.

The implementation requires: (1) a new `wifi_zones` JSONB column on `accom_properties`, (2) two new nullable columns on `accom_rooms` for per-room WiFi overrides, (3) a data migration moving existing WiFi into the first zone entry, (4) updates to 4 API routes that serve WiFi data, (5) a new backoffice WiFi zone management section, and (6) a redesigned multi-zone WifiCard for the guest dashboard.

**Primary recommendation:** Keep `wifi_network` + `wifi_password` columns as legacy fallback. Add `wifi_zones` JSONB alongside them. API routes resolve WiFi with priority: room override > wifi_zones > legacy columns. Migration number: 092.

## Standard Stack

### Core

| Library               | Version | Purpose                                | Why Standard                               |
| --------------------- | ------- | -------------------------------------- | ------------------------------------------ |
| Supabase (PostgreSQL) | -       | JSONB column for wifi_zones            | Already the database for all accom tables  |
| Next.js 14.2.33       | 14.2.33 | API routes + pages                     | Existing stack                             |
| Phosphor Icons        | -       | Zone type icons (Bed, ForkKnife, etc.) | Already preferred icon library (CLAUDE.md) |
| Tailwind CSS          | -       | Styling                                | Existing stack                             |

### Supporting

| Library       | Version | Purpose | When to Use                    |
| ------------- | ------- | ------- | ------------------------------ |
| (none needed) | -       | -       | Zero new npm packages required |

**No new dependencies.** All features implementable with existing stack. The shared/core `WiFiCard.tsx` uses `MultiLangText` and `LanguageCode` types from the translation engine, plus QR generation -- too heavyweight for this phase. Build fresh in the accommodations component.

## Architecture Patterns

### Data Flow: WiFi Resolution

```
Guest scans QR
    |
    v
API route fetches property (wifi_zones, wifi_network, wifi_password)
    + room data (wifi_ssid_override, wifi_password_override)
    |
    v
API builds WifiInfo[] array:
    1. If room has override -> add as first entry with isRoomNetwork: true
    2. If wifi_zones exists and non-empty -> add all zones, mark zone_type='room' as highlighted
    3. Else fallback to wifi_network + wifi_password (legacy single network)
    |
    v
Frontend WifiCard receives WifiInfo[] (or single WifiInfo for backward compat)
    - If 1 network: render current simple card
    - If 2+ networks: render flat list with room highlight
```

### JSONB Zone Schema

```typescript
// Each zone in the wifi_zones JSONB array
interface WifiZone {
  zone_id: string; // UUID or nanoid, stable identifier
  label: string; // "Pool Area", "Room WiFi", custom text
  zone_type: string; // 'room' | 'restaurant' | 'pool' | 'lobby' | 'garden' | 'rooftop' | 'coworking' | 'custom'
  icon: string; // Phosphor icon name: 'Bed', 'ForkKnife', 'SwimmingPool', etc.
  ssid: string; // WiFi network name
  password: string; // WiFi password
  sort_order: number; // Display order (0-based)
}
```

### Updated WifiInfo Type

```typescript
// Updated types/stay.ts
export interface WifiZoneInfo {
  zoneId: string;
  label: string;
  zoneType: string;
  icon: string;
  ssid: string;
  password: string;
  sortOrder: number;
  isRoomNetwork?: boolean; // true for room override or room-tagged zone
}

// Backward-compatible: keep WifiInfo, add WifiZonesInfo
export interface WifiInfo {
  network: string | null;
  password: string | null;
  zones?: WifiZoneInfo[]; // New: multi-zone data
}
```

### API Routes to Update

There are **4 API routes** that serve WiFi data to guests, plus 1 email template:

1. **`/api/stay/room/[roomCode]/route.ts`** (GET) - Room QR resolution, browse tier
   - Currently: `propertyData.wifi_network`, `propertyData.wifi_password`
   - Change: Also fetch `wifi_zones` from property + `wifi_ssid_override, wifi_password_override` from room
   - Also needs room_id to query room overrides

2. **`/api/stay/verify/route.ts`** (POST) - Booking code verification, full tier
   - Currently: `rawProperty.wifi_network`, `rawProperty.wifi_password`
   - Change: Add wifi_zones to SELECT, add room override fields to accom_rooms join

3. **`/api/stay/room/[roomCode]/verify/route.ts`** (POST) - Room code + verification
   - Currently: same pattern as verify
   - Change: same as above

4. **`/api/stay/[code]/property/route.ts`** (GET) - Property data refresh
   - Currently: `data.wifi_network`, `data.wifi_password`
   - Change: Add wifi_zones to SELECT. Note: this route has no room context (no room_id in JWT), so room overrides must come from routes 1-3

5. **`/lib/email-templates.ts`** - Pre-arrival email
   - Currently: `wifiName`, `wifiPassword` single values
   - Change: Include all zones in email, or just the primary/room zone

### Backoffice Updates

**Property settings page** (`apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx`):

- Add a new "WiFi Zones" section below Contact or as its own card
- Zone list with add/remove/reorder controls
- Each zone row: icon selector dropdown, label input, SSID input, password input (with show/hide toggle)
- The settings page currently uses individual state variables (not form library) - follow same pattern

**Property API route** (`apps/backoffice/app/api/accommodations/property/route.ts`):

- GET: Add `wifi_zones` to SELECT
- PUT: Add `wifi_zones` to allowedFields

**Rooms API route** (`apps/backoffice/app/api/accommodations/rooms/route.ts`):

- GET: Add `wifi_ssid_override, wifi_password_override` to SELECT
- PUT: Add `wifi_ssid_override, wifi_password_override` to allowedFields
- POST: Add optional wifi fields to insert

### Recommended Project Structure (changes only)

```
shared/database/migrations/schema/
  092-multi-zone-wifi.sql                    # New migration

apps/accommodations/frontend/
  types/stay.ts                              # Update WifiInfo, add WifiZoneInfo
  components/stay/WifiCard.tsx               # Rewrite: multi-zone support
  app/api/stay/room/[roomCode]/route.ts      # Update WiFi resolution
  app/api/stay/verify/route.ts               # Update WiFi resolution
  app/api/stay/room/[roomCode]/verify/route.ts  # Update WiFi resolution
  app/api/stay/[code]/property/route.ts      # Update WiFi data
  lib/email-templates.ts                     # Update pre-arrival email

apps/backoffice/
  app/(dashboard)/accommodations/settings/page.tsx  # Add WiFi zones section
  app/api/accommodations/property/route.ts   # Add wifi_zones to allowed fields
  app/api/accommodations/rooms/route.ts      # Add wifi override fields
```

### Anti-Patterns to Avoid

- **Separate wifi_zones table:** JSONB on the property row is simpler and avoids joins. Zones are property-specific, max 8, always read together. No need for a normalized table.
- **Breaking WifiInfo type backward compatibility:** Keep `network` and `password` fields, add `zones` as optional. Old consumers that only read `network/password` still work.
- **Removing legacy wifi_network/wifi_password columns:** Keep them. The migration populates wifi_zones FROM these columns, but legacy code in email templates and any external consumers still reads them.

## Don't Hand-Roll

| Problem                     | Don't Build                                          | Use Instead                                             | Why                                                                                                              |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| UUID generation for zone_id | Custom random string                                 | `crypto.randomUUID()` in JS, `gen_random_uuid()` in SQL | Standard, collision-safe                                                                                         |
| Icon picker component       | Custom icon grid                                     | Simple `<select>` with predefined zone types            | Only 8 options, not worth a complex picker                                                                       |
| Drag-to-reorder             | Full DnD library                                     | Up/down arrow buttons (move item in array)              | Decision from CONTEXT.md allows this; saves a dependency                                                         |
| WiFi QR codes               | QR generation library                                | Skip entirely                                           | Explicitly deferred to Phase 31                                                                                  |
| Shared WiFiCard reuse       | Adapting shared/core/modules/components/WiFiCard.tsx | Build fresh in accommodations                           | Shared component uses translation engine types, QR placeholder, different styling. Simpler to build purpose-fit. |

## Common Pitfalls

### Pitfall 1: JSONB Column Not Being Validated

**What goes wrong:** Invalid JSON shapes get stored (missing ssid, wrong types)
**Why it happens:** JSONB accepts any valid JSON, no schema enforcement
**How to avoid:** Add a CHECK constraint on `wifi_zones` that validates the array shape using `jsonb_typeof` and key existence checks. Application-level validation as primary gate, CHECK as safety net.
**Recommended approach:**

```sql
-- Lightweight CHECK: verify it's an array and each element has required keys
ALTER TABLE accom_properties ADD CONSTRAINT wifi_zones_valid CHECK (
  wifi_zones IS NULL
  OR (
    jsonb_typeof(wifi_zones) = 'array'
    AND jsonb_array_length(wifi_zones) <= 8
  )
);
```

Keep it simple: validate array type and max length in SQL; validate individual zone shape in the API layer (TypeScript).

### Pitfall 2: Forgetting to Update ALL 4 API Routes

**What goes wrong:** One route returns old WifiInfo shape, frontend crashes or shows stale data
**Why it happens:** WiFi data is fetched in 4 separate routes, easy to miss one
**How to avoid:** Create a shared `buildWifiInfo()` helper function in `lib/wifi-utils.ts` that all 4 routes call
**Warning signs:** WifiCard works in one flow (room QR) but not another (booking code)

### Pitfall 3: Room Override Resolution with No Room Context

**What goes wrong:** The `/api/stay/[code]/property` route has no room_id in the JWT, so it cannot resolve room overrides
**Why it happens:** This is a property-data refresh endpoint, not a room-specific one
**How to avoid:** Room override is resolved at initial resolution time (routes 1-3). The property route returns all zones but no room override. The frontend should cache the room override from the initial response and merge it client-side.
**Alternative:** Add roomId to the JWT payload (already has propertyId). This is cleaner but requires JWT schema change.

### Pitfall 4: Migration Ordering with Existing Data

**What goes wrong:** Migration fails if wifi_network is NULL for some properties
**Why it happens:** Not all properties have WiFi configured
**How to avoid:** The migration's data copy should be conditional: only create a zone entry when wifi_network IS NOT NULL

```sql
UPDATE accom_properties
SET wifi_zones = jsonb_build_array(
  jsonb_build_object(
    'zone_id', gen_random_uuid()::TEXT,
    'label', 'Property WiFi',
    'zone_type', 'room',
    'icon', 'WifiHigh',
    'ssid', wifi_network,
    'password', COALESCE(wifi_password, ''),
    'sort_order', 0
  )
)
WHERE wifi_network IS NOT NULL AND wifi_network != '';
```

### Pitfall 5: Backoffice Settings Page State Management

**What goes wrong:** WiFi zones state gets out of sync with save payload
**Why it happens:** The settings page uses individual `useState` calls, not a form library. Adding array state (zones) with add/remove/reorder is more complex.
**How to avoid:** Use a single `useState<WifiZone[]>` for zones. Each mutation (add, remove, reorder, edit field) creates a new array. Serialize to JSONB on save.

## Code Examples

### Migration 092: Multi-Zone WiFi

```sql
-- Add wifi_zones JSONB column to properties
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS wifi_zones JSONB DEFAULT NULL;

-- Lightweight validation
ALTER TABLE accom_properties ADD CONSTRAINT wifi_zones_valid CHECK (
  wifi_zones IS NULL
  OR (
    jsonb_typeof(wifi_zones) = 'array'
    AND jsonb_array_length(wifi_zones) <= 8
  )
);

-- Add room WiFi override columns
ALTER TABLE accom_rooms
  ADD COLUMN IF NOT EXISTS wifi_ssid_override TEXT,
  ADD COLUMN IF NOT EXISTS wifi_password_override TEXT;

-- Migrate existing single WiFi to first zone entry
UPDATE accom_properties
SET wifi_zones = jsonb_build_array(
  jsonb_build_object(
    'zone_id', gen_random_uuid()::TEXT,
    'label', 'Property WiFi',
    'zone_type', 'room',
    'icon', 'WifiHigh',
    'ssid', wifi_network,
    'password', COALESCE(wifi_password, ''),
    'sort_order', 0
  )
)
WHERE wifi_network IS NOT NULL AND wifi_network != '';

COMMENT ON COLUMN accom_properties.wifi_zones IS 'JSONB array of WiFi zone objects: [{zone_id, label, zone_type, icon, ssid, password, sort_order}]. Max 8 zones.';
COMMENT ON COLUMN accom_rooms.wifi_ssid_override IS 'Room-specific WiFi SSID override. Takes precedence over property wifi_zones.';
COMMENT ON COLUMN accom_rooms.wifi_password_override IS 'Room-specific WiFi password override.';
```

### WiFi Resolution Helper

```typescript
// apps/accommodations/frontend/lib/wifi-utils.ts
import type { WifiInfo, WifiZoneInfo } from '@/types/stay';

interface RawWifiData {
  wifi_network: string | null;
  wifi_password: string | null;
  wifi_zones: WifiZone[] | null;
}

interface RawRoomOverride {
  wifi_ssid_override: string | null;
  wifi_password_override: string | null;
}

interface WifiZone {
  zone_id: string;
  label: string;
  zone_type: string;
  icon: string;
  ssid: string;
  password: string;
  sort_order: number;
}

export function buildWifiInfo(
  property: RawWifiData,
  roomOverride?: RawRoomOverride | null
): WifiInfo {
  const zones: WifiZoneInfo[] = [];

  // 1. Room override takes top priority
  if (roomOverride?.wifi_ssid_override) {
    zones.push({
      zoneId: 'room-override',
      label: 'Your Room',
      zoneType: 'room',
      icon: 'Bed',
      ssid: roomOverride.wifi_ssid_override,
      password: roomOverride.wifi_password_override || '',
      sortOrder: -1,
      isRoomNetwork: true,
    });
  }

  // 2. Property zones
  if (
    property.wifi_zones &&
    Array.isArray(property.wifi_zones) &&
    property.wifi_zones.length > 0
  ) {
    for (const zone of property.wifi_zones) {
      const isRoom =
        !roomOverride?.wifi_ssid_override && zone.zone_type === 'room';
      zones.push({
        zoneId: zone.zone_id,
        label: zone.label,
        zoneType: zone.zone_type,
        icon: zone.icon,
        ssid: zone.ssid,
        password: zone.password,
        sortOrder: zone.sort_order,
        isRoomNetwork: isRoom,
      });
    }
  }

  // 3. Legacy fallback
  if (zones.length === 0 && property.wifi_network) {
    return {
      network: property.wifi_network,
      password: property.wifi_password,
    };
  }

  // Sort: room network first, then by sort_order
  zones.sort((a, b) => {
    if (a.isRoomNetwork && !b.isRoomNetwork) return -1;
    if (!a.isRoomNetwork && b.isRoomNetwork) return 1;
    return a.sortOrder - b.sortOrder;
  });

  return {
    network: zones[0]?.ssid || property.wifi_network || null,
    password: zones[0]?.password || property.wifi_password || null,
    zones: zones.length > 0 ? zones : undefined,
  };
}
```

### Multi-Zone WifiCard Component (structure)

```tsx
// Key patterns for the updated WifiCard
// - Single zone: current gradient teal card
// - Multiple zones: room network as gradient card, others as compact rows

// Zone icon mapping using Phosphor Icons
const ZONE_ICONS: Record<string, React.ComponentType<IconProps>> = {
  Bed: Bed,
  ForkKnife: ForkKnife,
  SwimmingPool: SwimmingPool,
  Buildings: Buildings,
  Tree: Tree,
  CloudSun: CloudSun,
  Laptop: Laptop,
  WifiHigh: WifiHigh,
};
```

### Backoffice Zone Management (state pattern)

```typescript
// Follow existing settings page pattern: individual useState
const [wifiZones, setWifiZones] = useState<WifiZone[]>([]);

// Add zone
const addZone = () => {
  if (wifiZones.length >= 8) return;
  setWifiZones([
    ...wifiZones,
    {
      zone_id: crypto.randomUUID(),
      label: '',
      zone_type: 'custom',
      icon: 'WifiHigh',
      ssid: '',
      password: '',
      sort_order: wifiZones.length,
    },
  ]);
};

// Remove zone
const removeZone = (zoneId: string) => {
  setWifiZones(
    wifiZones
      .filter((z) => z.zone_id !== zoneId)
      .map((z, i) => ({ ...z, sort_order: i }))
  );
};

// Move zone up/down
const moveZone = (index: number, direction: 'up' | 'down') => {
  const newZones = [...wifiZones];
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= newZones.length) return;
  [newZones[index], newZones[targetIndex]] = [
    newZones[targetIndex],
    newZones[index],
  ];
  setWifiZones(newZones.map((z, i) => ({ ...z, sort_order: i })));
};
```

## State of the Art

| Old Approach                        | Current Approach               | When Changed          | Impact                                       |
| ----------------------------------- | ------------------------------ | --------------------- | -------------------------------------------- |
| Single wifi_network + wifi_password | wifi_zones JSONB array         | Phase 29 (this phase) | Multi-zone support, room overrides           |
| WifiInfo with network/password      | WifiInfo with optional zones[] | Phase 29              | Backward compatible, progressive enhancement |

**Preserved for backward compatibility:**

- `wifi_network` + `wifi_password` columns remain on `accom_properties`
- `WifiInfo.network` + `WifiInfo.password` remain as top-level fields
- Legacy consumers (email templates) continue to work reading legacy columns

## Open Questions

1. **Should the JWT include roomId?**
   - What we know: Current JWT has `bookingId`, `propertyId`, `checkoutDate`, `accessTier`, `roomCode`
   - What's unclear: `roomCode` is present but not `roomId`. The property route (`/api/stay/[code]/property`) would need roomId to resolve room overrides.
   - Recommendation: For this phase, resolve room override in routes 1-3 (which already have room context) and have the frontend cache it. The property refresh route returns zones without room override. This avoids JWT changes.

2. **Pre-arrival email: show all zones or just primary?**
   - What we know: Email currently shows single wifiName/wifiPassword
   - Recommendation: Show the first zone (room-tagged or first by sort_order) in the email. Keep it simple -- guests get full zone list in the dashboard.

## Sources

### Primary (HIGH confidence)

- `shared/database/migrations/schema/077-accommodations-schema.sql` - Original accom schema (wifi_ssid, wifi_password columns)
- `shared/database/migrations/schema/081-schema-api-alignment.sql` - Renamed wifi_ssid to wifi_network
- `shared/database/migrations/schema/091-guest-documents.sql` - Latest migration (confirms next is 092)
- `apps/accommodations/frontend/components/stay/WifiCard.tsx` - Current single-network component
- `apps/accommodations/frontend/types/stay.ts` - WifiInfo type definition
- `apps/accommodations/frontend/app/api/stay/room/[roomCode]/route.ts` - Room QR resolution
- `apps/accommodations/frontend/app/api/stay/verify/route.ts` - Booking verification
- `apps/accommodations/frontend/app/api/stay/room/[roomCode]/verify/route.ts` - Room verification
- `apps/accommodations/frontend/app/api/stay/[code]/property/route.ts` - Property data refresh
- `apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx` - Current settings UI
- `apps/backoffice/app/api/accommodations/property/route.ts` - Backoffice property API
- `apps/backoffice/app/api/accommodations/rooms/route.ts` - Backoffice rooms API
- `shared/core/modules/components/WiFiCard.tsx` - Shared WiFi component (evaluated, not reusing)
- `shared/core/modules/types.ts` - WiFiNetwork and WiFiConfig types from shared core

### Secondary (MEDIUM confidence)

- PostgreSQL JSONB documentation - CHECK constraint syntax for JSONB validation

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - All code examined directly, no new dependencies
- Architecture: HIGH - All 4 API routes read and data flow traced end-to-end
- Pitfalls: HIGH - Based on actual code patterns observed (4 duplicate WiFi fetch points, settings page state pattern)
- Migration: HIGH - Latest migration number confirmed (091), column names verified

**Research date:** 2026-02-01
**Valid until:** 2026-03-01 (stable domain, no external dependencies)
