# PWA-FULL-SITE: Responsive Evolution Plan

> **Status:** P0.5 - Architecture Review Required
> **Created:** 2026-01-06
> **Author:** Claude Code

---

## 1. Executive Summary

Transform the PWA from a mobile-first "digital menu" to a fully responsive "F&B website" that works seamlessly across mobile, tablet, and desktop.

---

## 2. Current State Analysis

### 2.1 Page Structure

| Page    | Route      | Current State                                       |
| ------- | ---------- | --------------------------------------------------- |
| Home    | `/`        | Mobile-optimized, vertical sections                 |
| Menu    | `/menu`    | Single column grid, categories as horizontal scroll |
| Cart    | `/cart`    | Full-page cart view                                 |
| Account | `/account` | Vertical profile layout                             |
| Orders  | `/orders`  | Order history list                                  |
| Events  | `/events`  | Event cards vertical                                |
| Team    | `/team`    | Staff cards                                         |
| Offers  | `/offers`  | Promo cards                                         |

### 2.2 Navigation

**Current:** `BottomNavLocal.tsx`

- Fixed bottom bar (56px height)
- 5 items: Home, Menu, More, Order, Account
- Hides on scroll down, shows on scroll up
- Mobile-only pattern

### 2.3 Viewport Configuration

```tsx
// Current layout.tsx
export const viewport: Viewport = {
  userScalable: false, // ❌ Blocks desktop zoom
  maximumScale: 1, // ❌ Prevents scaling
};
```

### 2.4 Container Widths

- Home page: `max-w-screen-xl mx-auto` (limited to 1280px)
- Menu page: Full width cards
- No sidebar for categories

---

## 3. Target State

### 3.1 Breakpoint Strategy

| Breakpoint | Width      | Layout                              |
| ---------- | ---------- | ----------------------------------- |
| Mobile     | < 640px    | Current mobile design               |
| Tablet     | 640-1024px | 2-column grid, collapsible sidebar  |
| Desktop    | > 1024px   | Full layout with persistent sidebar |

### 3.2 Navigation Evolution

| Device  | Navigation                               |
| ------- | ---------------------------------------- |
| Mobile  | Bottom nav (current)                     |
| Tablet  | Bottom nav + hamburger for sidebar       |
| Desktop | Top header nav + persistent left sidebar |

### 3.3 New Desktop Header

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] ROOTS Cafe    [Home] [Menu] [Events] [About]    [Cart] [Account] │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Desktop Layout (Menu Page)

```
┌──────────────────────────────────────────────────────────────────────┐
│                           HEADER                                      │
├────────────┬─────────────────────────────────────────────────────────┤
│            │                                                          │
│  SIDEBAR   │                    MAIN CONTENT                         │
│            │                                                          │
│ Categories │    ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                     │
│ ☕ Coffee  │    │     │ │     │ │     │ │     │                     │
│ 🍵 Tea     │    └─────┘ └─────┘ └─────┘ └─────┘                     │
│ 🥤 Drinks  │    ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                     │
│ 🥗 Food    │    │     │ │     │ │     │ │     │                     │
│ 🍰 Desserts│    └─────┘ └─────┘ └─────┘ └─────┘                     │
│            │                                                          │
│ Filters    │                                                          │
│ ○ Vegan    │                                                          │
│ ○ Gluten-F │                                                          │
│            │                                                          │
└────────────┴─────────────────────────────────────────────────────────┘
```

---

## 4. Implementation Phases

### Phase 1: Foundation (Responsive Infrastructure)

**Files to modify:**

1. `app/layout.tsx`
   - Remove `userScalable: false`
   - Add responsive meta viewport

2. Create `components/ResponsiveLayout.tsx`
   - Detect breakpoint (mobile/tablet/desktop)
   - Conditionally render nav components
   - Provide layout context

3. Create `components/DesktopNav.tsx`
   - Horizontal top navigation
   - Logo, main links, cart/account

4. Create `components/CategorySidebar.tsx`
   - Desktop: Always visible (240px width)
   - Tablet: Collapsible overlay
   - Mobile: Hidden (use existing horizontal scroll)

### Phase 2: Menu Page Responsive

**Modify `app/menu/page.tsx`:**

1. Grid responsive classes:
   - Mobile: `grid-cols-1`
   - Tablet: `grid-cols-2`
   - Desktop: `grid-cols-3` or `grid-cols-4`

2. Sidebar integration
3. Filter panel (desktop: sidebar, mobile: modal)

### Phase 3: Home Page Desktop

1. Hero section (full-width on desktop)
2. Two-column feature sections
3. Contact/Map side-by-side

### Phase 4: New Sections

1. `/about` - About us page
2. `/contact` - Contact with embedded map
3. `/reservations` - Booking form (depends on RESERVATIONS-SYSTEM)

---

## 5. Component Inventory

### New Components Required

| Component          | Purpose                             | Priority |
| ------------------ | ----------------------------------- | -------- |
| `ResponsiveLayout` | Breakpoint detection, nav switching | P0       |
| `DesktopNav`       | Top navigation for desktop          | P0       |
| `CategorySidebar`  | Persistent category filter          | P0       |
| `DesktopFooter`    | Site footer with links              | P1       |
| `HeroSection`      | Homepage hero banner                | P1       |
| `AboutSection`     | About us content                    | P2       |
| `MapEmbed`         | Google Maps integration             | P2       |

### Components to Modify

| Component        | Changes Needed              |
| ---------------- | --------------------------- |
| `BottomNavLocal` | Hide on desktop (lg:hidden) |
| `HomeHeader`     | Adapt for desktop or hide   |
| `DishCard`       | Responsive sizing           |
| `MenuClient`     | Grid column responsiveness  |

---

## 6. CSS Strategy

### 6.1 Tailwind Breakpoints (Default)

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### 6.2 Key Responsive Classes

```tsx
// Navigation visibility
<BottomNavLocal className="lg:hidden" />
<DesktopNav className="hidden lg:block" />

// Grid columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

// Sidebar
<aside className="hidden lg:block lg:w-60 lg:fixed lg:left-0 lg:top-16">

// Main content with sidebar offset
<main className="lg:ml-60">
```

---

## 7. Typography Scale

| Element | Mobile   | Tablet   | Desktop  |
| ------- | -------- | -------- | -------- |
| H1      | 2rem     | 2.5rem   | 3rem     |
| H2      | 1.5rem   | 1.75rem  | 2rem     |
| Body    | 1rem     | 1rem     | 1rem     |
| Small   | 0.875rem | 0.875rem | 0.875rem |

---

## 8. Dependencies

### Blockers

- None (can start independently)

### Related Tasks

- `RESERVATIONS-SYSTEM` - Required for reservations page
- `SITE-CUSTOMIZATION` - For merchant-editable sections
- `AI-CUSTOMER-CHAT` - Chat widget integration

---

## 9. Testing Checklist

- [ ] Mobile Chrome (iOS Safari behavior)
- [ ] Tablet portrait (768px)
- [ ] Tablet landscape (1024px)
- [ ] Desktop small (1280px)
- [ ] Desktop large (1920px)
- [ ] Desktop ultra-wide (2560px)

---

## 10. Success Metrics

| Metric              | Current | Target   |
| ------------------- | ------- | -------- |
| Mobile usability    | 95%     | Maintain |
| Tablet usability    | 60%     | 90%      |
| Desktop usability   | 30%     | 90%      |
| Desktop bounce rate | High    | < 40%    |

---

## 11. Estimated Effort

| Phase                  | Effort   | Dependencies |
| ---------------------- | -------- | ------------ |
| Phase 1 (Foundation)   | 2-3 days | None         |
| Phase 2 (Menu)         | 1-2 days | Phase 1      |
| Phase 3 (Home)         | 1-2 days | Phase 1      |
| Phase 4 (New sections) | 3-5 days | Phase 1-3    |

**Total:** 7-12 days development

---

## 12. Next Steps

1. [ ] UX Review: Get design mockups/references for desktop layout
2. [ ] Create `ResponsiveLayout` component
3. [ ] Build `DesktopNav` component
4. [ ] Test with existing pages
5. [ ] Iterate based on feedback

---

## 13. References

- Current PWA: `apps/coffeeshop/frontend/`
- Backoffice (good desktop reference): `apps/backoffice/`
- Tailwind docs: https://tailwindcss.com/docs/responsive-design
