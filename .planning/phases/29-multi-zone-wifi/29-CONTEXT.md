# Phase 29: Multi-Zone WiFi - Context

**Gathered:** 2026-02-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Guests see WiFi credentials organized by zone, with their room network highlighted prominently. Owners can configure multiple WiFi networks with zone labels from the backoffice. Currently the system supports a single WiFi network per property (wifi_network + wifi_password on accom_properties). This phase adds multi-zone support and room-level overrides.

</domain>

<decisions>
## Implementation Decisions

### Data model — WiFi zones

- Store zones as JSONB array on `accom_properties` (column: `wifi_zones`)
- Each zone object: `{ zone_id, label, icon, ssid, password, sort_order }`
- Predefined zone types with icons: room (Bed), restaurant (ForkKnife), pool (SwimmingPool), lobby (Buildings), garden (Tree), rooftop (CloudSun), coworking (Laptop)
- Owner can also add custom labels (free text) with a generic WiFi icon
- Max 8 zones per property (practical limit, not hard-enforced)
- Migrate existing `wifi_network` + `wifi_password` into the first zone entry (label: "Property WiFi") during migration

### Room WiFi override

- Add `wifi_ssid_override` and `wifi_password_override` nullable columns to `accom_rooms`
- If a room has overrides, the guest sees that as "Your Room WiFi" at the top
- If no room override exists, the zone tagged as "room" type (if any) shows as the highlighted network
- Fallback: if neither exists, no highlight — all zones shown equally

### Backoffice WiFi zone management

- New section in the existing accommodations settings page (not a separate page)
- Inline list of zones with add/remove/reorder
- Each zone row: icon selector (from predefined set), label input, SSID input, password input
- Drag to reorder (or up/down arrows for simplicity — Claude's discretion on interaction)
- Room-level WiFi override: editable per room in the room edit form (2 optional fields: SSID + password)
- Show/hide password toggle on each zone

### Guest-facing display

- Replace current single WifiCard with a multi-zone WifiCard
- Room-specific network (override or room-tagged zone) appears first, visually highlighted with a colored badge "Your Room"
- Other zones listed below, each as a compact row: icon + label + SSID + copy-password button
- If only 1 zone exists, display as current simple card (no accordion, no zone label needed)
- If 2+ zones, show all in a flat list (not accordion — WiFi info should be immediately visible, not hidden behind taps)
- Each network has a copy-password button (existing pattern from WifiCard)
- No QR code per network in this phase (Phase 31 handles WiFi QR as part of BUG-09/INF-02)

### Claude's Discretion

- Exact migration number (next available after current schema)
- JSONB validation approach (CHECK constraint vs application-level)
- Whether to use `resolve_room_access()` update or a separate function for WiFi resolution
- Component internal structure and styling details
- How to handle the shared/core WiFiCard.tsx (exists but unused — evaluate reuse vs keep current pattern)

</decisions>

<specifics>
## Specific Ideas

- The existing `WifiCard.tsx` in accommodations uses a gradient teal card (`from-[#3D8B87] to-[#2D7A76]`). The room-highlighted network should keep this premium feel; other zones can use a lighter, secondary style.
- There's an unused `shared/core/modules/components/WiFiCard.tsx` with multi-network support, show/hide, and QR generation. Researcher should evaluate if it's worth adapting vs building fresh in the accommodations component.
- Phosphor Icons has exact matches for zone types: `Bed`, `ForkKnife`, `SwimmingPool`, `Buildings`, `Tree`, `CloudSun`, `Laptop`, `WifiHigh` (generic).
- Keep backward compatibility: if `wifi_zones` is null/empty, fall back to reading `wifi_network` + `wifi_password` (legacy columns) until all properties are migrated.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 29-multi-zone-wifi_
_Context gathered: 2026-02-01_
