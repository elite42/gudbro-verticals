# GUDBRO Tours - Design System

> **Aesthetic:** Tropical Adventure
> **Target:** International tourists scanning QR codes in Vietnam
> **Priority:** Mobile-first, fast load, high readability in sunlight

---

## 1. Design Philosophy

### Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Trust** | Verified badges, reviews, operator photos |
| **Clarity** | Multi-language, multi-currency, clear pricing |
| **Speed** | < 3s load, optimized images, minimal JS |
| **Touch-friendly** | 44px+ tap targets, large buttons |
| **Sunlight readable** | High contrast, warm tones |

### Visual Identity

```
TROPICAL ADVENTURE

Inspired by:
- Vietnamese lanterns (warm amber glow)
- Motorbike freedom (dynamic movement)
- Jungle greens (nature, trust)
- Golden hour sunsets (premium feel)

NOT:
- Generic blue/purple gradients
- Corporate sterility
- Cluttered interfaces
- Dark themes (tourists outdoors)
```

---

## 2. Color Palette

### Primary Colors

| Name | Hex | HSL | Usage |
|------|-----|-----|-------|
| **Burnt Orange** | `#E07B39` | `24 90% 50%` | CTAs, active states, brand |
| **Forest Green** | `#2C5F2D` | `122 38% 28%` | Trust signals, inclusions |
| **Golden Sun** | `#FFB400` | `43 100% 50%` | Premium, highlights, stars |

### Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Warm Cream** | `#FAFAF8` | Background |
| **Near Black** | `#1A1A1A` | Primary text |
| **Grey** | `#666666` | Secondary text |
| **Light Grey** | `#999999` | Subtle text |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Success** | `#22C55E` | Confirmations, verified |
| **Error** | `#EF4444` | Errors, exclusions |
| **Warning** | `#F59E0B` | Pending, alerts |

---

## 3. Typography

### Font Stack

```css
--font-display: 'Fraunces', Georgia, serif;
--font-body: 'DM Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Hero title | Display | 2rem | 700 |
| Section heading | Display | 1.5rem | 600 |
| Card title | Display | 1.125rem | 600 |
| Body | Body | 1rem | 400 |
| Small | Body | 0.875rem | 400 |
| Caption | Body | 0.75rem | 400 |
| Price | Display | varies | 700 |

### Why These Fonts

- **Fraunces:** Elegant yet friendly. Has "warmth" through its curves. Not boring like Inter.
- **DM Sans:** Clean, modern, highly readable on small screens.
- **JetBrains Mono:** For prices and codes - tabular numbers.

---

## 4. Spacing & Layout

### Spacing Scale

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
```

### Border Radius

```css
--radius-sm: 8px;   /* Badges, small elements */
--radius-md: 12px;  /* Inputs, buttons */
--radius-lg: 16px;  /* Cards */
--radius-xl: 24px;  /* Large cards, modals */
--radius-full: 9999px; /* Pills, avatars */
```

### Mobile-First Breakpoints

```css
/* Default: Mobile (< 640px) */
/* sm: 640px+ */
/* md: 768px+ */
/* lg: 1024px+ */
```

---

## 5. Components

### Buttons

```
PRIMARY
┌─────────────────────────────────────┐
│  [  📅 BOOK NOW  ]                  │
└─────────────────────────────────────┘
• Gradient: primary → lighter orange
• Shadow: orange glow
• Hover: scale(1.02), deeper shadow
• Active: scale(0.98)

SECONDARY
┌─────────────────────────────────────┐
│  [  View Details  ]                 │
└─────────────────────────────────────┘
• Solid forest green
• White text
• Subtle shadow

GHOST
• Transparent background
• Text only with hover bg
```

### Cards

```
TOUR CARD
┌─────────────────────────────────────┐
│ [Image 4:3 aspect ratio]            │
│ ┌─────┐                     ┌─────┐ │
│ │Cat. │                     │Feat.│ │
│ └─────┘                     └─────┘ │
│ Duration · Distance overlay         │
├─────────────────────────────────────┤
│ Tour Name                           │
│ ⭐ 4.9 (89 reviews)                 │
│ ─────────────────────               │
│ 250,000₫ · $10 /person    View →   │
│ 1-4 people                          │
└─────────────────────────────────────┘
│ [Gradient accent bar on hover]      │
└─────────────────────────────────────┘
```

### Badges

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Primary | `primary/10` | `primary` | none |
| Secondary | `secondary/10` | `secondary` | none |
| Accent | `amber-100` | `amber-800` | none |
| Success | `emerald-100` | `emerald-700` | none |
| Outline | transparent | `foreground-muted` | `2px current` |

### Input Fields

```
┌─────────────────────────────────────┐
│ Label *                             │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 🔍 Placeholder text...          │ │
│ └─────────────────────────────────┘ │
│ Hint text goes here                 │
└─────────────────────────────────────┘

• 48px minimum height (touch-friendly)
• 2px border, rounds to radius-xl
• Focus: primary border + ring glow
• Error: red border, error message below
```

---

## 6. Animations

### Entry Animations

```css
/* Staggered fade-slide */
.animate-in {
  animation: animate-in 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

/* Delays for stagger */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
/* ... */
```

### Micro-interactions

| Element | Trigger | Animation |
|---------|---------|-----------|
| Button (primary) | Hover | scale(1.02), shadow increase |
| Button | Active | scale(0.98) |
| Card | Hover | translateY(-4px), shadow increase |
| Card accent bar | Hover | opacity 0 → 1 |
| Dropdown | Open | scale-in from top-right |

### Celebration

```javascript
// Confetti on booking confirmation
confetti({
  particleCount: 100,
  colors: ['#E07B39', '#FFB400', '#2C5F2D', '#22C55E']
})
```

---

## 7. Iconography

### Primary: Phosphor Icons

```tsx
import { MapPin, Clock, Users, Star } from '@phosphor-icons/react'

<MapPin size={20} weight="duotone" />
```

### Icon Weights

| Context | Weight |
|---------|--------|
| UI elements | Regular |
| Buttons | Regular or Bold |
| Decorative | Duotone |
| Selected state | Fill |

### Custom Icons

- Category icons use emoji for universal recognition
- 🏍️ Day Tours
- 🚗 Transport
- 🎨 Experiences
- 📅 Multi-Day

---

## 8. Key Screens

### 1. Tour Menu (Home)

```
Priority: Fast scan → browse → select
Key elements:
- Operator header with trust signals
- Category filter pills
- Tour cards with essential info
- Contact footer
```

### 2. Tour Detail

```
Priority: Complete information → Book
Key elements:
- Full-bleed photo gallery
- Price prominent
- Included/Excluded clear split
- Route map
- Reviews with country flags
- Sticky "Book Now" bar
```

### 3. Booking Form

```
Priority: Quick, error-free completion
Key elements:
- 2-step flow (details → contact)
- Date picker (horizontal scroll)
- Time pills
- People counter
- Live price summary
- Clear validation
```

### 4. Confirmation

```
Priority: Reassurance → Next steps
Key elements:
- Animated success checkmark
- Confetti celebration
- Booking summary
- Operator contact prominent
- WhatsApp/Zalo buttons
- Clear next steps
```

### 5. Operator Dashboard

```
Priority: Simple management
Key elements:
- Stats at glance
- Pending alerts
- Tour list
- Booking list with actions
- QR code download
```

---

## 9. Accessibility

### Requirements

- **WCAG 2.1 AA** minimum
- **Color contrast:** 4.5:1 for text
- **Touch targets:** 44x44px minimum
- **Focus states:** Visible ring
- **Screen readers:** ARIA labels

### Testing

```bash
# Lighthouse accessibility audit
# Manual testing with VoiceOver/TalkBack
# High contrast mode verification
```

---

## 10. Performance

### Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| TTI | < 3s on 3G |

### Optimizations

- Lazy load images below fold
- Preconnect to font/image CDNs
- Minimize JS bundle
- Use skeleton loaders
- Cache aggressively

---

## File Structure

```
components/
├── ui/              # Primitive components
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   └── ...
├── layout/          # Layout components
│   ├── Header.tsx
│   └── Footer.tsx
├── tours/           # Tour-specific
│   ├── TourCard.tsx
│   ├── TourDetail.tsx
│   └── CategoryFilter.tsx
├── booking/         # Booking flow
│   ├── BookingForm.tsx
│   └── BookingConfirmation.tsx
└── dashboard/       # Operator dashboard
    └── OperatorDashboard.tsx
```

---

**Version:** 1.0
**Created:** 2026-01-26
**Last Updated:** 2026-01-26
