# Phase 2: UI/UX Harmony - Research

**Researched:** 2026-01-29
**Domain:** PWA UI/UX consistency, vertical design systems, component patterns
**Confidence:** HIGH

## Summary

This research investigated UI/UX patterns across 8 vertical PWAs to identify inconsistencies and establish standardization requirements. The audit revealed a clear **template pattern** (flat BottomNav with center element) used by 6 newer verticals, while Coffeeshop v2 uses an advanced Phosphor-based pattern and Tours uses a bento-grid approach. Accommodations lacks a BottomNav entirely, and Wellness contains legacy /gym routes despite gym being a standalone vertical.

All verticals follow a shared brand color system with vertical-specific primary colors, DM Sans body font (except Coffeeshop v2), and safe area padding utility classes (`.pb-safe`). However, safe area padding is not consistently applied to BottomNav components.

**Primary recommendation:** Standardize on the template BottomNav pattern (with Phosphor icons upgrade) across all verticals, ensure all BottomNavs use `.pb-safe`, remove wellness /gym routes, and create Accommodations BottomNav following the template.

## Standard Stack

The established libraries/tools for PWA UI/UX in this codebase:

### Core

| Library               | Version | Purpose           | Why Standard                                                             |
| --------------------- | ------- | ----------------- | ------------------------------------------------------------------------ |
| @phosphor-icons/react | Latest  | Icon system       | 9,000+ icons, 6 weights, preferred over Lucide (Coffeeshop v2 uses this) |
| Tailwind CSS          | 3.x     | Utility-first CSS | All verticals use this                                                   |
| Framer Motion         | Latest  | Animations        | Used in Coffeeshop v2 BottomNav for layoutId transitions                 |
| Next.js 14            | 14.2.33 | Framework         | Server Components + Client Components pattern                            |

### Supporting

| Library            | Version      | Purpose           | When to Use                                           |
| ------------------ | ------------ | ----------------- | ----------------------------------------------------- |
| CSS Variables      | Native       | Theming           | All verticals define brand colors in globals.css      |
| env() CSS function | Native       | Safe area padding | iOS notch/home indicator handling                     |
| DM Sans font       | Google Fonts | Body typography   | Shared across 7/8 verticals (Coffeeshop v2 exception) |

### Alternatives Considered

| Instead of         | Could Use            | Tradeoff                                                       |
| ------------------ | -------------------- | -------------------------------------------------------------- |
| Phosphor Icons     | Lucide React         | Phosphor has 3x more icons and better duotone support          |
| CSS Variables      | Tailwind colors only | CSS Variables enable runtime theming and brand color isolation |
| Template BottomNav | Bento grid (Tours)   | Bento grid is visually distinct but breaks uniformity          |

**Installation:**

```bash
# Already installed in monorepo
pnpm add @phosphor-icons/react framer-motion
```

## Architecture Patterns

### Current BottomNav Patterns (3 Variants)

#### Pattern A: Template (Used by 6 verticals)

**Verticals:** Gym, Wellness, Laundry, Pharmacy, Workshops, Waiter
**Structure:**

```
[Tab 1] [Tab 2] [Center CTA] [Tab 3] [Tab 4]
```

**Key characteristics:**

- 5 items: 2 left, 1 center (special), 2 right
- Inline SVG icons (not Phosphor)
- Active state: `scale(1.1)` + brand color
- Center item: sometimes clickable menu, sometimes main feature
- Uses `pb-safe` class (partially - not all have it)
- Brand color via CSS variable (e.g. `var(--orange-hex)`, `var(--blue-hex)`)

**Source code pattern:**

```typescript
// Example: apps/gym/frontend/components/BottomNav.tsx
const navItems = [
  { label: 'Home', href: '/', icon: (active) => <svg.../> },
  { label: 'Courses', href: '/courses', icon: (active) => <svg.../> },
  { label: 'Day Pass', href: '#', isCenter: true, icon: (active) => <svg.../> },
  { label: 'Shop', href: '/shop', icon: (active) => <svg.../> },
  { label: 'Account', href: '/account', icon: (active) => <svg.../> },
];

<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t pb-safe">
  <div className="max-w-lg mx-auto flex items-center justify-around">
    {navItems.map((item) => {
      const isActive = pathname.startsWith(item.href);
      return (
        <Link
          style={{
            color: isActive ? 'var(--orange-hex)' : 'var(--charcoal-muted)',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {item.icon(isActive)}
          <span className="text-[10px]">{item.label}</span>
        </Link>
      );
    })}
  </div>
</nav>
```

#### Pattern B: Coffeeshop v2 (Advanced Phosphor)

**Vertical:** Coffeeshop
**Structure:**

```
[Home] [Menu] [Favorites] [Cart*] [Account]
*Cart conditionally hidden based on tier
```

**Key characteristics:**

- Phosphor icons with weight="fill" for active state
- Framer Motion `layoutId="activeTab"` for animated indicator
- Feature gating via `useTierFeature('enableCart')`
- CSS Variables for all colors (`var(--interactive-primary)`)
- Safe area: `paddingBottom: 'var(--safe-area-bottom)'` (inline style)
- Cart badge (red dot, only when count > 0)

**Source code pattern:**

```typescript
// apps/coffeeshop/frontend/components/v2/BottomNav.tsx
import { House, ForkKnife, Heart, ShoppingBag, User } from '@phosphor-icons/react';

const navItems: NavItem[] = [
  { id: 'home', href: '/', icon: House, label: 'Home' },
  { id: 'cart', href: '/cart', icon: ShoppingBag, badge: cartCount, requiredFeature: 'enableCart' },
];

const visibleNavItems = navItems.filter((item) =>
  !item.requiredFeature || isEnabled(item.requiredFeature)
);

<nav style={{ paddingBottom: 'var(--safe-area-bottom)' }}>
  {visibleNavItems.map((item) => {
    const Icon = item.icon;
    return (
      <>
        {active && (
          <motion.div layoutId="activeTab" className="h-1 bg-[var(--interactive-primary)]" />
        )}
        <Icon size={24} weight={active ? 'fill' : 'regular'} />
      </>
    );
  })}
</nav>
```

#### Pattern C: Tours (Bento Grid)

**Vertical:** Tours
**Structure:**

```
[Home] [Map] [◎ Bento Menu] [Deals] [Profile]
```

**Key characteristics:**

- Center element is 9-dot bento grid (not a tab)
- `pb-safe-bottom` class (different from `.pb-safe`)
- Burnt orange active color (`text-amber-500`)
- Icons only (no labels)
- Scale effect on active (`scale-110`)

### Recommended Pattern (Unified Template + Phosphor)

Standardize all verticals to this pattern:

```typescript
// Unified BottomNav pattern
import { House, Squares, Gift, MagnifyingGlass, User } from '@phosphor-icons/react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType; // Phosphor icon component
  isCenter?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Browse', href: '/browse', icon: Squares },
  { label: 'Menu', href: '#', icon: Squares, isCenter: true }, // Center CTA
  { label: 'Offers', href: '/promotions', icon: Gift },
  { label: 'Search', href: '/search', icon: MagnifyingGlass },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t pb-safe md:hidden">
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 transition-all"
              style={{
                color: isActive ? 'var(--primary-color)' : 'var(--charcoal-muted)',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
              <span
                className="text-[10px]"
                style={{ fontWeight: isActive ? 700 : 500 }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

**Key improvements:**

1. **Phosphor icons** instead of inline SVG (cleaner, consistent)
2. **`.pb-safe` class** on nav element (iOS safe area)
3. **`var(--primary-color)`** for brand color (each vertical defines this)
4. **5-item flat layout** (uniform across all verticals)
5. **Weight fill/regular** instead of strokeWidth changes

### Safe Area Padding Pattern

**Current state:** Inconsistent implementation

- ✅ Coffeeshop v2: `paddingBottom: 'var(--safe-area-bottom)'` (inline)
- ✅ Tours: `pb-safe-bottom` class
- ✅ Template verticals: `pb-safe` class on nav
- ❌ Some globals.css define `.pb-safe`, others don't

**Recommended approach:**

```css
/* globals.css - ALL verticals should have this */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.safe-area-pb {
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 0.5rem);
}
```

**Viewport meta tag (required):**

```html
<!-- layout.tsx head -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>
```

**Sources:**

- [Make Your PWAs Look Handsome on iOS](https://dev.to/karmasakshi/make-your-pwas-look-handsome-on-ios-1o08)
- [Avoid notches in your PWA with just CSS](https://dev.to/marionauta/avoid-notches-in-your-pwa-with-just-css-al7)
- [PWA Design Tips - firt.dev](https://firt.dev/pwa-design-tips/)

### Brand Color System

Each vertical defines a primary brand color in `globals.css`:

| Vertical       | Primary Color    | CSS Variable            | Hex Value                |
| -------------- | ---------------- | ----------------------- | ------------------------ |
| Accommodations | Terracotta       | `--primary`             | hsl(15 80% 55%) ~#E07B39 |
| Tours          | Burnt Orange     | `--primary`             | hsl(24 90% 50%) #E07B39  |
| Gym            | Energetic Orange | `--orange-hex`          | #E85D04                  |
| Wellness       | Sage Green       | `--sage-hex`            | #8BA888                  |
| Laundry        | Blue             | `--blue-hex`            | #4A90D9                  |
| Pharmacy       | Medical Green    | `--green-hex`           | #2D9F83                  |
| Workshops      | Terracotta       | `--terracotta`          | #C2703E                  |
| Coffeeshop v2  | Green            | `--interactive-primary` | #22C55E                  |

**Pattern:** All define a primary color variable, most use `-hex` suffix (wellness and accommodations use hsl format). BottomNav active state should use this variable.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem                | Don't Build                    | Use Instead                                                | Why                                                                   |
| ---------------------- | ------------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| Icon system            | Custom SVG per icon            | @phosphor-icons/react                                      | 9,000+ icons, 6 weights, tree-shakable, consistent sizing             |
| Safe area padding      | Manual pixel calculations      | `env(safe-area-inset-bottom)` + viewport-fit=cover         | Native browser API, handles all devices (iPhone X+, Android gestures) |
| Active state animation | Custom transitions             | Framer Motion layoutId                                     | Smooth shared element transition, no jank                             |
| Tab active detection   | Complex regex on pathname      | `pathname.startsWith(item.href)` with special case for '/' | Simple, works for nested routes                                       |
| Brand color theming    | Hardcoded colors per component | CSS Variables in globals.css                               | Runtime theming, easy to maintain, DRY                                |

**Key insight:** PWA UI patterns are well-established. Don't reinvent BottomNav, safe area handling, or icon systems. The template pattern works because it's mobile-first thumb-zone optimized.

## Common Pitfalls

### Pitfall 1: Inconsistent Safe Area Handling

**What goes wrong:** BottomNav overlaps iOS home indicator or content gets clipped by notch
**Why it happens:**

- Forgot `viewport-fit=cover` in meta tag
- Used fixed pixel padding instead of `env()`
- Applied safe area padding to wrong element (page content instead of nav)
  **How to avoid:**
- Add `viewport-fit=cover` to viewport meta tag in root layout
- Use `.pb-safe` class on BottomNav itself
- Test on iPhone with notch (Safari DevTools responsive mode has safe area simulation)
  **Warning signs:**
- BottomNav overlaps home indicator on iOS
- Content scrolls under the nav

### Pitfall 2: Active State Detection Fails for Nested Routes

**What goes wrong:** `/menu/category/burgers` doesn't highlight "Menu" tab
**Why it happens:** Using exact match (`pathname === item.href`) instead of prefix match
**How to avoid:**

```typescript
// ✅ CORRECT
const isActive =
  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

// ❌ WRONG
const isActive = pathname === item.href; // Only works for exact match
```

**Warning signs:** Tab not highlighted when on nested route

### Pitfall 3: Brand Color Hardcoded Instead of CSS Variable

**What goes wrong:** Changing brand color requires updating 20+ files
**Why it happens:** Using Tailwind colors (`text-blue-500`) or hex values directly
**How to avoid:** Define `--primary-color` or `--{vertical}-hex` in globals.css, use via inline style

```typescript
// ✅ CORRECT
style={{ color: isActive ? 'var(--blue-hex)' : 'var(--charcoal-muted)' }}

// ❌ WRONG
className={isActive ? 'text-blue-500' : 'text-gray-400'}
```

**Warning signs:** Can't find brand color definition in one place

### Pitfall 4: Mixing Icon Systems (Phosphor + Inline SVG)

**What goes wrong:** Inconsistent sizing, weights, and visual style across tabs
**Why it happens:** Copy-pasting from different sources, gradual migration
**How to avoid:** Standardize on Phosphor icons, use `size={22}` and `weight="fill"|"regular"` consistently
**Warning signs:** Some icons look bolder or larger than others at same size

### Pitfall 5: Center Element Inconsistency

**What goes wrong:** Some verticals treat center as active tab, others as modal trigger
**Why it happens:** Template pattern unclear about center element behavior
**How to avoid:**

- If center opens a modal/sheet: `href="#"`, `onClick` handler, no active state
- If center is a real route: treat like other tabs with active state
  **Warning signs:** Center element sometimes highlighted, sometimes not

### Pitfall 6: Missing Wellness /gym Route Cleanup

**What goes wrong:** Wellness PWA has `/gym` routes even though Gym is standalone
**Why it happens:** Gym was extracted from Wellness but routes not removed
**How to avoid:**

- Search for `/gym` in wellness codebase
- Delete `app/gym/` directory
- Remove BottomNav links to `/gym`
  **Warning signs:**
- `apps/wellness/frontend/app/gym/` directory exists
- BottomNav has "Gym" tab in wellness

## Code Examples

Verified patterns from codebase:

### Unified BottomNav Component (Template + Phosphor)

```typescript
// Source: Synthesized from apps/gym/frontend/components/BottomNav.tsx + apps/coffeeshop/frontend/components/v2/BottomNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Squares, Gift, MagnifyingGlass, User } from '@phosphor-icons/react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  isCenter?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Services', href: '/services', icon: Squares },
  { label: 'Menu', href: '#', icon: Squares, isCenter: true },
  { label: 'Offers', href: '/promotions', icon: Gift },
  { label: 'Search', href: '/search', icon: MagnifyingGlass },
];

export default function BottomNav({ onCenterClick }: { onCenterClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t pb-safe md:hidden"
      style={{ borderColor: 'var(--cloud-dark)' }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isCenter && (
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          );

          if (item.isCenter) {
            return (
              <button
                key={item.label}
                onClick={onCenterClick}
                className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                <Icon size={22} weight="regular" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-all"
              style={{
                color: isActive ? 'var(--primary-color)' : 'var(--charcoal-muted)',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
              <span
                className="text-[10px]"
                style={{ fontWeight: isActive ? 700 : 500 }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### Safe Area CSS (globals.css)

```css
/* Source: apps/gym/frontend/app/globals.css (line 98-104) */

/* Safe Area (PWA bottom nav) */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.safe-area-pb {
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 0.5rem);
}
```

### Viewport Meta Tag (layout.tsx)

```tsx
// Source: Next.js PWA best practices
// https://github.com/vercel/next.js/discussions/81264

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>
```

### Brand Color CSS Variable Pattern

```css
/* Source: apps/laundry/frontend/app/globals.css (line 18-22) */
:root {
  /* Primary: Azzurro/Blu */
  --blue: #4a90d9;
  --blue-light: #e8f1fb;
  --blue-dark: #2d6cb5;
  --blue-hex: #4a90d9;

  /* For BottomNav active state */
  --primary-color: var(--blue-hex);
}
```

## State of the Art

| Old Approach           | Current Approach            | When Changed             | Impact                                              |
| ---------------------- | --------------------------- | ------------------------ | --------------------------------------------------- |
| Lucide icons           | Phosphor icons              | Coffeeshop v2 (Jan 2026) | 9,000+ icons vs 1,500, better duotone support       |
| Inline SVG icons       | Phosphor React components   | Coffeeshop v2            | Tree-shakable, consistent sizing, weight variants   |
| Hardcoded px padding   | env(safe-area-inset-bottom) | iOS 11+ (2017)           | Handles all device notches/indicators automatically |
| viewport-fit=auto      | viewport-fit=cover          | iOS 11+ (2017)           | Enables full screen with safe area insets           |
| Tailwind color classes | CSS Variables for brand     | Industry standard        | Runtime theming, easier maintenance                 |
| 3 BottomNav patterns   | Should be 1 unified pattern | Need to standardize      | Consistency, easier onboarding                      |

**Deprecated/outdated:**

- **Inline SVG for icons**: Replaced by Phosphor icons in modern verticals (Coffeeshop v2 leads)
- **Fixed pixel safe area padding**: Use `env(safe-area-inset-bottom)` instead
- **Multiple BottomNav patterns**: Should converge to unified template + Phosphor pattern

## Open Questions

Things that couldn't be fully resolved:

1. **Accommodations BottomNav Design**
   - What we know: Accommodations has no BottomNav, but has booking flow + in-stay dashboard
   - What's unclear: Should it follow 5-item template pattern, or custom 3-item pattern for booking mode?
   - Recommendation: Follow template pattern with 5 items (Home, Search, Book Now, Stays, Profile) to match other verticals

2. **Waiter PWA BottomNav Pattern**
   - What we know: Waiter has a BottomNav at `apps/waiter/components/layout/BottomNav.tsx`
   - What's unclear: Waiter not audited in detail (staff-facing app, different UX requirements)
   - Recommendation: QA separately, may need different pattern since it's staff-facing not customer-facing

3. **Coffeeshop v2 Advanced Pattern Adoption**
   - What we know: Coffeeshop v2 has Phosphor icons, Framer Motion animations, feature gating
   - What's unclear: Should all verticals adopt advanced features (layoutId animation, tier checks)?
   - Recommendation: Phase 1 (this phase) = template + Phosphor. Phase 2 (future) = Framer Motion animations if needed

4. **Tours Bento Grid Pattern**
   - What we know: Tours has unique bento grid center element, visually distinct
   - What's unclear: Keep bento grid as Tours brand identity, or standardize to flat layout?
   - Recommendation: Keep Tours as-is (only 1 page, low priority), focus on accommodations/wellness first

## Sources

### Primary (HIGH confidence)

- **Codebase audit**: All 8 vertical BottomNav components examined directly
- **globals.css audit**: All 8 vertical CSS files for brand colors and safe area utilities
- **V2 Migration Guide**: `docs/knowledge/systems/V2-MIGRATION-GUIDE.md` for Coffeeshop v2 patterns

### Secondary (MEDIUM confidence)

- [How To Decide Which PWA Elements Should Stick — Smashing Magazine](https://www.smashingmagazine.com/2020/01/mobile-pwa-sticky-bars-elements/) - Bottom nav best practices
- [Make Your PWAs Look Handsome on iOS - DEV Community](https://dev.to/karmasakshi/make-your-pwas-look-handsome-on-ios-1o08) - iOS safe area handling
- [Avoid notches in your PWA with just CSS - DEV Community](https://dev.to/marionauta/avoid-notches-in-your-pwa-with-just-css-al7) - Safe area CSS patterns
- [PWA Design Tips - firt.dev](https://firt.dev/pwa-design-tips/) - General PWA UX best practices

### Tertiary (LOW confidence)

- [Next.js PWA discussions](https://github.com/vercel/next.js/discussions/81264) - Safe area issues with next/link

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Direct codebase examination, all libraries verified in package.json files
- Architecture: HIGH - All BottomNav components read and compared, patterns documented from source
- Pitfalls: MEDIUM - Inferred from code inconsistencies, not from production bug reports

**Research date:** 2026-01-29
**Valid until:** 60 days (stable domain - PWA UI patterns change slowly)

---

**Key Findings Summary:**

1. **3 BottomNav patterns exist** - Template (6 verticals), Coffeeshop v2 (advanced Phosphor), Tours (bento grid)
2. **Accommodations missing BottomNav** - Needs to be created
3. **Wellness has legacy /gym routes** - Directory `app/gym/` exists with 2 pages
4. **Safe area padding inconsistent** - Some use `.pb-safe`, some use inline styles, some missing
5. **Brand colors well-defined** - All verticals have CSS variables for primary color
6. **Template pattern is standard** - 6/8 verticals use it, should be the baseline
7. **Phosphor icons preferred** - Coffeeshop v2 proves this works, cleaner than inline SVG

**Next Steps for Planner:**

- Task 1: Standardize template BottomNav pattern (migrate to Phosphor icons)
- Task 2: Create Accommodations BottomNav
- Task 3: Remove wellness /gym routes
- Task 4: Ensure all BottomNavs have `.pb-safe` class
- Task 5: Verify all brand colors use CSS variables in active states
