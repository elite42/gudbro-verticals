---
phase: 02-ui-ux-harmony
plan: 02
type: summary
subsystem: frontend
tags: [ui, component-extraction, css-variables, mobile-nav, accommodations]

requires:
  - 01-01-typescript-fixes

provides:
  - accommodations-bottomnav-component
  - accommodations-css-variables
  - accommodations-pb-safe-utility

affects:
  - future-accommodations-nav-updates
  - accommodations-brand-consistency

tech-stack:
  added: []
  patterns:
    - tab-based-navigation-with-props
    - css-variable-based-theming
    - ios-safe-area-handling

key-files:
  created:
    - apps/accommodations/frontend/components/BottomNav.tsx
  modified:
    - apps/accommodations/frontend/styles/globals.css
    - apps/accommodations/frontend/app/page.tsx

decisions:
  - decision: Use tab-based navigation props (activeTab, onTabChange, onMenuToggle)
    rationale: Accommodations uses single-page tab switching, not Next.js routing like other verticals
    alternatives: Could have used Next.js routing, but would require multi-page refactor
    impact: BottomNav pattern adapted for stateful tab management

  - decision: Keep Bento Menu Drawer in page.tsx
    rationale: Menu drawer is tightly coupled to page content and state
    alternatives: Could extract to separate component, but adds unnecessary complexity
    impact: Component separation clear and maintainable

metrics:
  duration: 150s
  tasks-completed: 2
  commits: 2
  files-changed: 3
  completed: 2026-01-29
---

# Phase 02 Plan 02: Accommodations BottomNav Component Summary

> Extract BottomNav component from inline markup and standardize brand colors using CSS variables.

## One-liner

Accommodations PWA now has a reusable BottomNav component with CSS variable-based theming (--primary-hex, --charcoal-muted) and pb-safe iOS safe area support, matching the pattern used by 6 other verticals.

## What Was Built

### Components Created

1. **BottomNav.tsx** - Tab-based navigation component
   - 5 nav items: Home, Map, Center Menu, Services, Profile
   - Props: `activeTab`, `onTabChange`, `onMenuToggle`
   - CSS variable theming for brand colors
   - iOS safe area handling with `pb-safe` class
   - Desktop hiding with `md:hidden`
   - Scale animation on active state (1.1x)

### CSS Updates

1. **globals.css** - Added CSS variables and utility classes
   - `--primary-hex: #e07a5f` - Primary brand color (hex format for direct use)
   - `--charcoal-muted: #6b6560` - Muted text color
   - `--cloud-dark: #e8e4df` - Border color
   - `.pb-safe` - iOS safe area inset utility

### Refactoring

1. **page.tsx** - Replaced 112 lines of inline nav with component
   - Before: Inline `<nav>` with 5 hardcoded buttons (lines 851-962)
   - After: `<BottomNav>` component with 3 props
   - Removed hardcoded colors `#E07A5F` and `#6B6560`
   - Replaced `pb-safe-bottom` (non-standard) with `pb-safe` (standard)

## Key Patterns Established

### Tab-Based Navigation Pattern

```tsx
// Accommodations uses stateful tabs, not routing
<BottomNav
  activeTab={activeTab} // 'home' | 'map' | 'services' | 'profile'
  onTabChange={setActiveTab} // State setter for tabs
  onMenuToggle={() => setShowMenu()} // Toggle bento menu drawer
/>
```

**Contrast with other verticals:**

```tsx
// Pharmacy, Workshops, etc. use Next.js routing
<BottomNav /> // Uses usePathname() internally, no props needed
```

### CSS Variable Color Pattern

```tsx
// Active color uses CSS variable with fallback
style={{
  color: isActive
    ? 'var(--primary-hex, #E07A5F)'     // Variable + fallback
    : 'var(--charcoal-muted, #6B6560)'
}}
```

**Benefits:**

- Theme changes in one place (globals.css)
- Fallback ensures graceful degradation
- No hardcoded colors in components

## Architectural Decisions

### Decision 1: Tab-Based Props vs Routing

**Chosen:** Pass `activeTab` and `onTabChange` as props

**Rationale:**

- Accommodations is a single-page app with tab-based views
- All content rendered conditionally based on `activeTab` state
- Switching to Next.js routing would require multi-page refactor (out of scope)

**Alternatives considered:**

- Use Next.js routing like other verticals (requires full page refactor)
- Use React Context for state (overkill for simple tab state)

**Impact:**

- BottomNav pattern slightly different from other verticals
- Future: If Accommodations moves to multi-page, can migrate to routing pattern

### Decision 2: Keep Bento Menu in page.tsx

**Chosen:** Bento Menu Drawer stays in page.tsx, not extracted

**Rationale:**

- Menu content is page-specific (breakfast, minibar, laundry services)
- Menu state (`showMenu`) already in page.tsx
- Menu drawer renders over page content

**Alternatives considered:**

- Extract to separate `<BentoMenu>` component (unnecessary abstraction)
- Move to BottomNav component (wrong separation of concerns)

**Impact:**

- Clear component boundaries: BottomNav = navigation shell, page.tsx = content + overlays
- Menu can evolve independently without touching BottomNav

## Consistency Achieved

### Before (Inconsistent)

| Aspect          | Accommodations                    | Other Verticals             |
| --------------- | --------------------------------- | --------------------------- |
| Component file  | ❌ Inline in page.tsx             | ✅ components/BottomNav.tsx |
| Brand colors    | ❌ Hardcoded `#E07A5F`, `#6B6560` | ✅ CSS variables            |
| Safe area class | ❌ `pb-safe-bottom` (custom)      | ✅ `pb-safe` (standard)     |
| Pattern         | Tab-based (state)                 | Routing-based (Next.js)     |

### After (Consistent)

| Aspect          | Accommodations              | Other Verticals             | Status                     |
| --------------- | --------------------------- | --------------------------- | -------------------------- |
| Component file  | ✅ components/BottomNav.tsx | ✅ components/BottomNav.tsx | ✅ Match                   |
| Brand colors    | ✅ CSS variables            | ✅ CSS variables            | ✅ Match                   |
| Safe area class | ✅ `pb-safe`                | ✅ `pb-safe`                | ✅ Match                   |
| Pattern         | Tab-based (state)           | Routing-based (Next.js)     | ⚠️ Different (intentional) |

**Pattern difference justified:** Accommodations has different navigation architecture (tab-based single-page vs multi-page routing). The component interface adapts to this, which is correct architecture.

## Files Changed

### Created

- `apps/accommodations/frontend/components/BottomNav.tsx` (157 lines)
  - Extracted from page.tsx inline nav
  - Tab-based navigation with props
  - CSS variable theming

### Modified

- `apps/accommodations/frontend/styles/globals.css`
  - Added 3 CSS variables (--primary-hex, --charcoal-muted, --cloud-dark)
  - Added `.pb-safe` utility class

- `apps/accommodations/frontend/app/page.tsx`
  - Added BottomNav import
  - Replaced 112 lines of inline nav with 5 lines of component usage
  - Net: -107 lines

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

### What's Ready

- ✅ Accommodations now has a reusable BottomNav component
- ✅ Brand colors use CSS variables (easy to theme)
- ✅ iOS safe area handling standardized
- ✅ Pattern documented for future verticals

### Blockers/Concerns

None.

### Recommendations for Next Plans

1. **Apply same pattern to Tours** - Tours also has inline nav that could be extracted
2. **Consider routing migration for Accommodations** - If/when Accommodations needs multi-page structure, migrate from tab-based to routing-based navigation
3. **Document tab-based pattern** - Add to knowledge base for future verticals that need single-page tab navigation

## Testing Notes

### Manual Testing Required

- [ ] Visual QA: BottomNav renders correctly on mobile
- [ ] Interaction: Tab switching works (Home, Map, Services, Profile)
- [ ] Interaction: Center button opens Bento Menu drawer
- [ ] iOS: Safe area insets work correctly (no nav overlap on iPhone X+)
- [ ] Desktop: BottomNav hidden on desktop (md:hidden)
- [ ] Theme: Brand colors match design system

### TypeScript

✅ Typecheck passed (verified in commit hook)

## Knowledge Captured

### Patterns to Reuse

1. **CSS Variable Theming Pattern**

   ```css
   /* globals.css */
   --primary-hex: #e07a5f;
   --charcoal-muted: #6b6560;
   ```

   ```tsx
   /* component */
   style={{ color: 'var(--primary-hex, #E07A5F)' }}
   ```

2. **iOS Safe Area Pattern**

   ```css
   .pb-safe {
     padding-bottom: env(safe-area-inset-bottom, 0px);
   }
   ```

3. **Tab-Based Navigation Pattern** (for single-page apps)
   ```tsx
   <BottomNav
     activeTab={state}
     onTabChange={setState}
     onMenuToggle={toggleDrawer}
   />
   ```

### Anti-Patterns Avoided

- ❌ Hardcoding brand colors in components
- ❌ Non-standard CSS class names (pb-safe-bottom → pb-safe)
- ❌ Inline navigation markup (112 lines → 5 lines component)

## Commits

1. `8b9cfcd` - chore(02-02): add pb-safe utility and color variables to Accommodations
2. `598a066` - feat(02-02): extract BottomNav component for Accommodations

## Metrics

- **Duration:** 2m 30s
- **Tasks completed:** 2/2
- **Commits:** 2 (atomic, per task)
- **Files changed:** 3
- **Lines removed:** 112 (inline nav)
- **Lines added:** 167 (component + CSS)
- **Net change:** +55 lines (worth it for reusability)

---

**Status:** ✅ Complete
**Phase 02 Progress:** 1 of ? plans complete
