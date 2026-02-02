# Phase 41: Shared Foundation - Research

**Researched:** 2026-02-02
**Domain:** Monorepo code consolidation (hooks, utils, configs, UI, types)
**Confidence:** HIGH

## Summary

This phase consolidates duplicated code across 5+ PWAs into the existing `shared/` workspace packages. The codebase already has a well-established shared package structure (`@gudbro/ui`, `@gudbro/types`, `@gudbro/config`, `@gudbro/utils`) with pnpm workspaces, Turborepo, and a root `tsconfig.base.json`. The consolidation work is primarily about moving duplicated implementations into these existing packages, making them configurable where needed, and deleting local copies.

Key findings from codebase analysis:

- **usePriceFormat**: 5 copies exist (coffeeshop, gym, laundry, pharmacy, workshops). Coffeeshop is the most documented version. Workshops has a significantly divergent API (different function names, different currency-preferences interface). The 4 non-workshop copies are nearly identical.
- **currency-converter**: 5 copies exist. Coffeeshop is the most complete (Supabase + API + fallback). Gym has "M" format for millions. Workshops has the simplest implementation. All share the same core logic but differ in config imports, storage keys, and VND formatting.
- **currency-preferences**: 5 copies exist. Coffeeshop/gym/laundry/pharmacy use the `currencyPreferencesStore` pattern. Workshops uses a completely different functional API (`getCurrencyPreference`/`setCurrencyPreference`/`onCurrencyChange`).
- **BottomNav**: 4+ implementations (gym, laundry, pharmacy, workshops). Also exists in `shared/menu-template/components/BottomNav.tsx` (different architecture, scroll-hide behavior). All app-specific versions share the same rendering structure but differ in nav items, active color CSS variable, and center button behavior.
- **tsconfig**: Inconsistent - coffeeshop extends `tsconfig.base.json` with shared package paths, but gym/laundry/pharmacy do NOT extend the base and lack `@gudbro/*` path aliases.
- **next.config.js**: All 8+ apps have nearly identical configs differing only in port number. Coffeeshop has the most complete image config.
- **tailwind.config**: Coffeeshop has the most extensive config (theme system with CSS variables, animations). Others are minimal.

**Primary recommendation:** Use the coffeeshop implementation as the base for all consolidations (most complete, best documented), parameterize the app-specific differences (storage keys, base currency source, color variables), and migrate in dependency order: types first, then utils, then hooks (depends on utils), then config, then UI components.

## Standard Stack

This phase uses no new libraries. It works entirely within the existing monorepo toolchain.

### Core (Already in Monorepo)

| Library         | Version | Purpose              | Why Standard                                      |
| --------------- | ------- | -------------------- | ------------------------------------------------- |
| pnpm workspaces | 10.0.0  | Package linking      | Already configured, `workspace:*` protocol        |
| Turborepo       | 2.7.3   | Build orchestration  | Already configured with `^build` dependency chain |
| TypeScript      | 5.2.2+  | Type checking        | Already configured with `tsconfig.base.json`      |
| Tailwind CSS    | 3.3.5   | Styling with presets | Already pinned via pnpm overrides                 |
| Next.js         | 14.x    | Framework configs    | Already the standard across all PWAs              |

### Supporting

| Library | Version | Purpose           | When to Use                                                   |
| ------- | ------- | ----------------- | ------------------------------------------------------------- |
| zod     | 3.23.0+ | Config validation | Already in `@gudbro/config`, use for shared config validation |

### Alternatives Considered

| Instead of                          | Could Use                          | Tradeoff                                                                                |
| ----------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------- |
| Barrel exports from shared packages | Direct deep imports                | Barrel exports are already the pattern in `@gudbro/ui`, `@gudbro/types` - stick with it |
| Tailwind plugin for preset          | `presets` array in tailwind.config | Presets are simpler and Tailwind's built-in mechanism - use presets                     |
| Monorepo-wide tsconfig paths        | Per-app tsconfig paths             | Per-app paths are already the pattern (coffeeshop does this) - standardize it           |

## Architecture Patterns

### Recommended Shared Package Structure

```
shared/
├── hooks/                    # NEW: @gudbro/hooks
│   ├── package.json
│   ├── index.ts              # Barrel export
│   ├── use-price-format.ts   # Consolidated hook
│   └── tsconfig.json
├── utils/                    # EXISTING: @gudbro/utils (extend)
│   ├── currency-converter.ts # NEW: Consolidated converter
│   ├── currency-preferences.ts # NEW: Consolidated preferences
│   ├── index.ts              # Updated barrel
│   └── ...existing files
├── config/                   # EXISTING: @gudbro/config (extend)
│   ├── tsconfig.app.json     # NEW: Base tsconfig for all PWA apps
│   ├── tailwind.preset.js    # NEW: Shared Tailwind preset
│   ├── next.config.base.js   # NEW: Shared Next.js config factory
│   ├── index.ts              # Existing barrel (unchanged)
│   └── ...existing files
├── ui/                       # EXISTING: @gudbro/ui (extend)
│   ├── components/
│   │   ├── bottom-nav.tsx    # NEW: Configurable BottomNav
│   │   └── ...existing
│   └── index.ts              # Updated barrel
├── types/                    # EXISTING: @gudbro/types (extend)
│   ├── domain.ts             # NEW: MenuItem, Order, MerchantCharge
│   ├── index.ts              # Updated barrel
│   └── ...existing files
└── ...other existing packages
```

### Pattern 1: Parameterized Shared Modules

**What:** Shared modules that accept app-specific configuration instead of hardcoding it.
**When to use:** When implementations are identical except for config values (storage keys, base currency, color vars).

```typescript
// shared/utils/currency-preferences.ts
// Source: Derived from analysis of 5 app implementations

export interface CurrencyPreferences {
  enabled: boolean;
  selectedCurrency: string;
  baseCurrency: string;
}

export interface CurrencyPreferencesConfig {
  storageKeyPrefix: string; // e.g., 'gudbro-gym' -> 'gudbro-gym-currency-preferences'
  baseCurrency: string; // e.g., 'VND'
}

export function createCurrencyPreferencesStore(
  config: CurrencyPreferencesConfig
) {
  const STORAGE_KEY = `${config.storageKeyPrefix}-currency-preferences`;
  const DEFAULT_PREFERENCES: CurrencyPreferences = {
    enabled: false,
    selectedCurrency: config.baseCurrency,
    baseCurrency: config.baseCurrency,
  };

  return {
    get(): CurrencyPreferences {
      /* ... */
    },
    set(preferences: Partial<CurrencyPreferences>): void {
      /* ... */
    },
    clear(): void {
      /* ... */
    },
    getCurrencyInfo(code: string) {
      /* ... */
    },
  };
}

// Each app creates its instance:
// const currencyPreferencesStore = createCurrencyPreferencesStore({
//   storageKeyPrefix: 'gudbro-gym',
//   baseCurrency: gymConfig.i18n.baseCurrency,
// });
```

### Pattern 2: Configurable UI Components via Props

**What:** Shared UI components that accept per-app customization through props, not forks.
**When to use:** When component structure is identical but nav items, colors, and behaviors differ.

```typescript
// shared/ui/components/bottom-nav.tsx
// Source: Derived from analysis of 4 BottomNav implementations

export interface NavItem {
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
  isCenter?: boolean;
}

export interface BottomNavProps {
  items: NavItem[];
  activeColor: string; // CSS variable, e.g., 'var(--orange-hex)'
  borderColor?: string; // CSS variable, e.g., 'var(--cloud-dark)'
  onCenterClick?: () => void; // Optional center button handler
  badge?: { count: number }; // Optional badge on center item
}
```

### Pattern 3: Config Inheritance with `extends` and Factory Functions

**What:** Base configs that apps extend, with only per-app overrides.
**When to use:** For tsconfig, tailwind.config, and next.config standardization.

```javascript
// shared/config/next.config.base.js
// Source: Derived from analysis of 11 next.config.js files

/** @param {{ port: number }} options */
function createNextConfig({ port }) {
  return {
    reactStrictMode: true,
    images: {
      domains: [
        'images.unsplash.com',
        'cdn.gudbro.com',
        'img.vietqr.io',
        'flagcdn.com',
        'api.qrserver.com',
      ],
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    env: {
      NEXT_PUBLIC_API_URL:
        process.env.NEXT_PUBLIC_API_URL || `http://localhost:${port}`,
    },
  };
}

module.exports = { createNextConfig };

// Per-app usage:
// const { createNextConfig } = require('../../../shared/config/next.config.base');
// module.exports = createNextConfig({ port: 3033 });
```

### Anti-Patterns to Avoid

- **Importing shared modules via relative paths:** Always use `@gudbro/*` package names (e.g., `@gudbro/utils`) not `../../../shared/utils`. The pnpm workspace protocol handles resolution.
- **App-specific storage keys hardcoded in shared code:** Pass them as config parameters. Each app must have its own localStorage namespace.
- **Copying the coffeeshop Supabase-fetching currency logic to all apps:** Only coffeeshop currently has the Supabase integration. The shared module should support an optional Supabase fetch function passed as config, not import Supabase directly.
- **Breaking the workshops API without migration:** Workshops has a divergent `usePriceFormat` API (`format`/`formatDual` vs `formatPrice`/`formatPriceCompact`). The shared hook must export both signatures or workshops consumers must be updated.

## Don't Hand-Roll

| Problem                     | Don't Build                               | Use Instead                                  | Why                                                                  |
| --------------------------- | ----------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------- |
| Tailwind config sharing     | Copy-paste colors/animations between apps | `presets` array in tailwind.config.js        | Built-in Tailwind feature, auto-merges with app overrides            |
| tsconfig sharing            | Duplicate compiler options in each app    | `"extends"` in tsconfig.json                 | Native TypeScript feature, already used by coffeeshop                |
| Next.js config sharing      | Copy-paste identical image domains        | Factory function in shared/config            | Simple JS, avoids `next.config.js` merge complexity                  |
| Currency formatter creation | Intl.NumberFormat from scratch            | The existing `formatConvertedPrice` function | Already handles VND "k" format, JPY/KRW zero-decimal, all edge cases |
| Package linking             | Symlinks or manual file copying           | pnpm `workspace:*` protocol                  | Already the standard in this monorepo                                |

**Key insight:** This monorepo already has all the infrastructure for sharing code (pnpm workspaces, Turborepo, tsconfig.base.json, @gudbro/\* packages). The problem is not infrastructure -- it is that newer PWAs were scaffolded by copying files instead of importing from shared packages.

## Common Pitfalls

### Pitfall 1: Breaking Import Paths During Migration

**What goes wrong:** Replacing `@/lib/currency-converter` with `@gudbro/utils` in an app causes build failures because the tsconfig paths or package.json dependencies are not updated.
**Why it happens:** Three things must be updated in sync: (1) tsconfig.json paths, (2) package.json workspace dependency, (3) import statements.
**How to avoid:** For each app migration, always update in this order: package.json first (add `"@gudbro/utils": "workspace:*"`), then tsconfig.json paths, then run `pnpm install`, then update imports, then delete local file.
**Warning signs:** `Module not found` errors, `Cannot find module '@gudbro/...'` in IDE.

### Pitfall 2: Shared Hook Requires Client-Only Dependencies

**What goes wrong:** `usePriceFormat` uses `useState`, `useEffect`, and `window.addEventListener` -- it is a client component. If the shared package does not declare `'use client'` correctly, Next.js SSR will fail.
**Why it happens:** Shared packages may not be processed the same way as app-local files by Next.js bundler.
**How to avoid:** Every client-side file in shared packages MUST have `'use client'` directive at the top. The `@gudbro/ui` package already does this correctly -- follow that pattern.
**Warning signs:** Hydration mismatches, `window is not defined` errors during build.

### Pitfall 3: Divergent Workshops Implementation

**What goes wrong:** Workshops uses a completely different currency system: functional API (`getCurrencyPreference`/`setCurrencyPreference`), different event names (`gudbro-currency-change` vs `currency-preferences-updated`), different storage key format, and `CurrencyCode` type union instead of string.
**Why it happens:** Workshops was likely built by a different developer or at a different time with different patterns.
**How to avoid:** The shared module should use the store-based pattern (used by 4/5 apps). Workshops consumers must be migrated to the new API. Do NOT try to support both APIs in the shared module.
**Warning signs:** Workshops currency conversion stops working after migration.

### Pitfall 4: localStorage Key Collision After Consolidation

**What goes wrong:** If all apps use the same localStorage key (e.g., `gudbro-currency-preferences`), a user who visits multiple GUDBRO apps on the same domain would have their preferences overwritten.
**Why it happens:** Currently each app uses a unique key prefix (`gudbro-gym-*`, `gudbro-laundry-*`). If the shared module uses a single key, this isolation is lost.
**How to avoid:** The shared module MUST accept a `storageKeyPrefix` parameter. Each app passes its own prefix. Never hardcode a universal storage key.
**Warning signs:** Currency preferences "resetting" when switching between apps.

### Pitfall 5: Circular Dependencies Between Shared Packages

**What goes wrong:** `@gudbro/hooks` depends on `@gudbro/utils` (for currency functions). If `@gudbro/utils` also imports from `@gudbro/hooks`, Turborepo build fails.
**Why it happens:** Shared packages form a dependency graph. Hooks naturally depend on utils, not the other way around.
**How to avoid:** Dependency direction must be: types -> config -> utils -> hooks -> ui. Never import "upstream" in this chain.
**Warning signs:** Turborepo infinite loops, circular dependency warnings.

### Pitfall 6: Tailwind Preset Not Scoping Content Paths

**What goes wrong:** The shared tailwind preset includes `content` paths that do not match the actual file locations, causing styles to be purged or classes to not work.
**Why it happens:** Tailwind presets can define theme extensions but content paths are relative to the app's tailwind.config.js, not the preset file.
**How to avoid:** The tailwind preset should only define `theme.extend` values (colors, animations, keyframes). Content paths stay in each app's tailwind.config.js. Apps must also add the shared UI package path: `'../../shared/ui/**/*.{ts,tsx}'`.
**Warning signs:** Shared UI component styles not appearing, Tailwind classes being purged.

## Code Examples

### Consolidated usePriceFormat Hook

```typescript
// shared/hooks/use-price-format.ts
// Base: coffeeshop implementation (most complete, used by 4/5 apps)
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CurrencyPreferencesStore } from '@gudbro/utils';

interface UsePriceFormatOptions {
  store: CurrencyPreferencesStore;
  formatConvertedPrice: (price: number, currency: string) => string;
  getBaseCurrency: () => string;
}

export function usePriceFormat({
  store,
  formatConvertedPrice,
  getBaseCurrency,
}: UsePriceFormatOptions) {
  const [currencyPrefs, setCurrencyPrefs] = useState(store.get());
  const baseCurrency = getBaseCurrency();

  useEffect(() => {
    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(store.get());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener(
        'currency-preferences-updated',
        handleCurrencyUpdate
      );
      return () =>
        window.removeEventListener(
          'currency-preferences-updated',
          handleCurrencyUpdate
        );
    }
  }, [store]);

  const formatPrice = useCallback(
    (price: number): string => {
      if (
        currencyPrefs.enabled &&
        currencyPrefs.selectedCurrency !== baseCurrency
      ) {
        return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
      }
      return formatConvertedPrice(price, baseCurrency);
    },
    [currencyPrefs, baseCurrency, formatConvertedPrice]
  );

  const formatPriceCompact = useCallback(
    (price: number): string => {
      return formatPrice(price);
    },
    [formatPrice]
  );

  return {
    formatPrice,
    formatPriceCompact,
    currencyPrefs,
    baseCurrency,
  };
}
```

### Shared Next.js Config Factory

```javascript
// shared/config/next.config.base.js

/**
 * Create a shared Next.js config with common settings.
 * @param {object} options
 * @param {number} options.port - Dev server port
 * @param {string[]} [options.additionalDomains] - Extra image domains
 * @param {object} [options.overrides] - Deep merge overrides
 */
function createNextConfig({ port, additionalDomains = [], overrides = {} }) {
  const base = {
    reactStrictMode: true,
    images: {
      domains: [
        'images.unsplash.com',
        'cdn.gudbro.com',
        'img.vietqr.io',
        ...additionalDomains,
      ],
      formats: ['image/avif', 'image/webp'],
    },
    env: {
      NEXT_PUBLIC_API_URL:
        process.env.NEXT_PUBLIC_API_URL || `http://localhost:${port}`,
    },
  };

  return { ...base, ...overrides };
}

module.exports = { createNextConfig };
```

### Shared Tailwind Preset

```javascript
// shared/config/tailwind.preset.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        theme: {
          bg: {
            primary: 'var(--color-bg-primary)',
            secondary: 'var(--color-bg-secondary)',
            tertiary: 'var(--color-bg-tertiary)',
            elevated: 'var(--color-bg-elevated)',
          },
          text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            tertiary: 'var(--color-text-tertiary)',
            inverse: 'var(--color-text-inverse)',
          },
          border: {
            light: 'var(--color-border-light)',
            medium: 'var(--color-border-medium)',
            heavy: 'var(--color-border-heavy)',
          },
          interactive: {
            primary: 'var(--color-interactive-primary)',
            'primary-hover': 'var(--color-interactive-primary-hover)',
            secondary: 'var(--color-interactive-secondary)',
            'secondary-hover': 'var(--color-interactive-secondary-hover)',
            danger: 'var(--color-interactive-danger)',
            success: 'var(--color-interactive-success)',
            warning: 'var(--color-interactive-warning)',
          },
        },
      },
      animation: {
        'bounce-once': 'bounce 0.5s ease-in-out 1',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
};

// Per-app usage:
// const sharedPreset = require('../../../shared/config/tailwind.preset');
// module.exports = {
//   presets: [sharedPreset],
//   content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
//   theme: { extend: { colors: { primary: '#E85D04' } } }, // app-specific overrides
// };
```

### Shared Base tsconfig for PWA Apps

```jsonc
// shared/config/tsconfig.app.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@gudbro/types": ["../../shared/types"],
      "@gudbro/config": ["../../shared/config"],
      "@gudbro/utils": ["../../shared/utils"],
      "@gudbro/ui": ["../../shared/ui"],
      "@gudbro/hooks": ["../../shared/hooks"],
    },
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"],
}
```

Note: The `paths` in this base tsconfig use `../../shared/*` assuming apps are at `apps/[name]/frontend/`. Apps at `apps/[name]/` (like backoffice, waiter) need to adjust the path depth. This may require two base configs or per-app path overrides.

### Configurable BottomNav Component

```typescript
// shared/ui/components/bottom-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
  icon: (active: boolean) => ReactNode;
  isCenter?: boolean;
}

export interface BottomNavProps {
  items: NavItem[];
  activeColor: string;
  borderColor?: string;
  onCenterClick?: () => void;
  centerBadge?: number;
}

export function BottomNav({
  items,
  activeColor,
  borderColor = 'var(--cloud-dark)',
  onCenterClick,
  centerBadge,
}: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t pb-safe md:hidden"
      style={{ borderColor }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive =
            !item.isCenter &&
            (item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href));

          if (item.isCenter && onCenterClick) {
            return (
              <button
                key={item.label}
                onClick={onCenterClick}
                className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                {item.icon(false)}
                <span className="text-[10px] font-medium">{item.label}</span>
                {centerBadge != null && centerBadge > 0 && (
                  <span className="absolute -top-0.5 right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
                    style={{ backgroundColor: activeColor }}>
                    {centerBadge}
                  </span>
                )}
              </button>
            );
          }

          if (item.isCenter) {
            const isCenterActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-all"
                style={{
                  color: isCenterActive ? activeColor : 'var(--charcoal-muted)',
                  transform: isCenterActive ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {item.icon(isCenterActive)}
                <span className="text-[10px]" style={{ fontWeight: isCenterActive ? 700 : 500 }}>
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-all"
              style={{
                color: isActive ? activeColor : 'var(--charcoal-muted)',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {item.icon(isActive)}
              <span className="text-[10px]" style={{ fontWeight: isActive ? 700 : 500 }}>
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

## State of the Art

| Old Approach                                | Current Approach                              | When Changed | Impact                                           |
| ------------------------------------------- | --------------------------------------------- | ------------ | ------------------------------------------------ |
| Copy files between apps                     | Import from `@gudbro/*` workspace packages    | Phase 41     | Eliminates duplication, single source of truth   |
| Each app defines own tsconfig from scratch  | Extend `shared/config/tsconfig.app.json`      | Phase 41     | Consistent compiler options, shared path aliases |
| Duplicate tailwind colors in each app       | Use `presets` array with shared preset        | Phase 41     | Design system tokens in one place                |
| Per-app next.config with duplicated domains | Factory function `createNextConfig({ port })` | Phase 41     | New image domains added once, all apps get them  |

**Notes on existing shared packages:**

- `@gudbro/ui` is well-established with shadcn/ui patterns -- BottomNav should follow the same conventions
- `@gudbro/types` already has `MenuItem` and other types -- check for conflicts with domain types to add
- `@gudbro/config` currently has env validation and constants -- config files (tsconfig, tailwind, next) are a different concern but same package
- `@gudbro/utils` currently has errors, logger, result, api-response -- currency modules fit naturally here
- `shared/hooks/` does NOT exist yet as a package -- needs to be created as `@gudbro/hooks`

## Codebase Divergence Analysis

### usePriceFormat Divergence

| App           | API Shape                                                          | Dependencies                                                                                             | Notes                                             |
| ------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| coffeeshop    | `{ formatPrice, formatPriceCompact, currencyPrefs, baseCurrency }` | `currencyPreferencesStore`, `formatConvertedPrice`, `getBaseCurrency`                                    | Most documented, best JSDoc                       |
| gym           | Same as coffeeshop                                                 | Same pattern, imports from `gymConfig`                                                                   | Identical logic                                   |
| laundry       | Same as coffeeshop                                                 | Same pattern, imports from `laundryConfig`                                                               | Identical logic                                   |
| pharmacy      | Same as coffeeshop                                                 | Same pattern, imports from `pharmacyConfig`                                                              | Identical logic                                   |
| **workshops** | `{ currency, format, formatDual, formatVND }`                      | `getCurrencyPreference`, `onCurrencyChange`, `formatConvertedPrice`, `formatDualPrice`, `formatVNDPrice` | **DIVERGENT** - different API, uses `useCallback` |

**Recommendation:** Use the coffeeshop/gym/laundry/pharmacy API as the shared hook. Add `formatDual` from workshops as an additional export. Update workshops consumers to use the new API.

### currency-converter Divergence

| App        | Key Differences                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| coffeeshop | Supabase fetch + API fallback + hardcoded fallback. VND as "Xk" format. Full `ExchangeRates` interface.  |
| gym        | API fallback + hardcoded. Has "M" format for VND >= 1M. No Supabase fetch.                               |
| laundry    | Same as gym (simpler).                                                                                   |
| pharmacy   | Same as laundry.                                                                                         |
| workshops  | Simplest. No async fetch. Just hardcoded rates. Different VND format (uses `Intl.NumberFormat` not "k"). |

**Recommendation:** Use coffeeshop as base. Add gym's "M" format for large VND values (good feature). Make Supabase fetch optional (passed as config). Standardize to "k"/"M" VND format across all apps.

### BottomNav Divergence

| App           | Color Var      | Center Behavior                  | Extra Features        |
| ------------- | -------------- | -------------------------------- | --------------------- |
| gym           | `--orange-hex` | `onCenterClick` handler (button) | None                  |
| laundry       | `--blue-hex`   | `onCenterClick` handler (button) | Badge count on center |
| pharmacy      | `--green-hex`  | Center is a Link (navigates)     | None                  |
| workshops     | `--terracotta` | Center is a Link (navigates)     | None                  |
| menu-template | Gradient BG    | Center has raised circle         | Scroll-hide behavior  |

**Recommendation:** Shared component supports both behaviors (button with `onCenterClick` OR Link navigation) via props. The `shared/menu-template` BottomNav is too different (different design language) and should be kept separate or deprecated.

### tsconfig Divergence

| App        | Extends Base?                       | Has @gudbro/\* paths? | Depth from root                      |
| ---------- | ----------------------------------- | --------------------- | ------------------------------------ |
| coffeeshop | YES (`../../../tsconfig.base.json`) | YES (all 4 packages)  | `apps/coffeeshop/frontend/`          |
| gym        | NO                                  | NO                    | `apps/gym/frontend/`                 |
| laundry    | NO                                  | NO                    | `apps/laundry/frontend/`             |
| pharmacy   | NO                                  | NO                    | `apps/pharmacy/frontend/`            |
| workshops  | NO (assumed)                        | NO (assumed)          | `apps/workshops/frontend/`           |
| backoffice | ?                                   | ?                     | `apps/backoffice/` (2 levels, not 3) |
| waiter     | ?                                   | ?                     | `apps/waiter/` (2 levels, not 3)     |

**Recommendation:** Create `shared/config/tsconfig.app.json` that extends the root base. Per-app tsconfig extends this. Path depth issue: apps at `apps/X/frontend/` are 3 levels deep; apps at `apps/X/` are 2 levels deep. Handle with two base configs or document the override needed.

## Open Questions

1. **Should `@gudbro/hooks` be a new package or live inside `@gudbro/ui`?**
   - What we know: `@gudbro/ui` already has a `hooks/` directory (`use-toast.ts`). Adding `usePriceFormat` there would mean the UI package depends on currency utils.
   - What's unclear: Whether coupling UI with business logic hooks is desirable.
   - Recommendation: Create a separate `@gudbro/hooks` package. The `use-toast` hook is UI-specific and belongs in `@gudbro/ui`. Business hooks like `usePriceFormat` are domain logic and belong in `@gudbro/hooks`. This keeps dependencies clean.

2. **How to handle the `shared/menu-template` BottomNav vs the new shared BottomNav?**
   - What we know: `shared/menu-template/components/BottomNav.tsx` exists with a very different design (gradient center button, scroll-hide, vertical-config-based). It uses a `VerticalConfig` type.
   - What's unclear: Whether any apps currently use the menu-template BottomNav in production.
   - Recommendation: Keep menu-template BottomNav as-is for now. The new `@gudbro/ui` BottomNav replaces the per-app copies (gym, laundry, pharmacy, workshops). Document that menu-template BottomNav may be deprecated later.

3. **tsconfig path depth inconsistency**
   - What we know: Apps like coffeeshop/gym/laundry are at `apps/X/frontend/` (3 levels deep), while backoffice/waiter are at `apps/X/` (2 levels deep).
   - What's unclear: Whether a single shared tsconfig.app.json can serve both depths.
   - Recommendation: Create the shared tsconfig with `../../shared/*` paths (for 3-level apps). 2-level apps (backoffice, waiter) extend it but override the `paths` section. This is a minor inconvenience but avoids the complexity of multiple base configs.

4. **Order type location - shared/types/custom.ts already has MenuItem**
   - What we know: `shared/types/custom.ts` already defines `MenuItem` and `MenuCategory`. The SHR-09 requirement asks for `MenuItem`, `Order`, and `MerchantCharge` in `shared/types/`.
   - What's unclear: Whether the existing `MenuItem` type matches what apps actually use, or if apps have local `MenuItem` types that diverge.
   - Recommendation: During implementation, compare the shared `MenuItem` with app-local types. If they match, just re-export. If they diverge, merge and update consumers.

## Sources

### Primary (HIGH confidence)

- Direct codebase analysis of all files listed above - this is the most authoritative source since the research is about consolidating THIS codebase's own code
- `tsconfig.base.json` at repo root - verified compiler options and extends pattern
- `pnpm-workspace.yaml` - verified workspace package configuration
- `turbo.json` - verified build dependency chain

### Secondary (MEDIUM confidence)

- Tailwind CSS `presets` feature - known stable feature in Tailwind 3.x, verified by existing documentation patterns

### Tertiary (LOW confidence)

- None - all findings are from direct codebase analysis

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - analyzed actual codebase, no external dependencies to research
- Architecture: HIGH - patterns derived directly from comparing 5+ implementations
- Pitfalls: HIGH - identified from actual divergences found in code analysis
- Code examples: MEDIUM - synthesized from existing implementations, need validation during implementation

**Research date:** 2026-02-02
**Valid until:** 2026-03-02 (stable - internal codebase consolidation, not dependent on external library changes)
