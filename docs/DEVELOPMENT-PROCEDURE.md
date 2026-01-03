# GUDBRO Development Procedures

> **Complete workflow guide for all project components**
>
> **Version:** 1.0 (2025-01-03)

---

## Table of Contents

1. [Overview](#overview)
2. [Project Architecture](#project-architecture)
3. [Before Development](#before-development)
4. [During Development](#during-development)
5. [After Development](#after-development)
6. [Component-Specific Procedures](#component-specific-procedures)
7. [Best Practices Comparison](#best-practices-comparison)

---

## Overview

### Project Components

| Component | Path | Description | Port |
|-----------|------|-------------|------|
| **PWA (Coffeeshop)** | `apps/coffeeshop/frontend/` | Digital Menu PWA | 3004 |
| **Website** | `apps/website/` | Marketing Site + APIs | 3024 |
| **Backoffice** | `apps/backoffice/` | Admin Dashboard | 3023 |
| **Database** | `shared/database/` | Supabase PostgreSQL | - |
| **Shared** | `shared/` | Common components, types | - |

### Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Next.js 14.2, React 18.3
- **Styling:** Tailwind CSS 3.4
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Language:** TypeScript 5.2
- **Package Manager:** npm with workspaces

---

## Project Architecture

```
gudbro-verticals/
├── .github/
│   └── workflows/              # CI/CD pipelines
│       └── ci.yml              # Type check, lint, build
├── .husky/                     # Git hooks
│   └── pre-commit              # Format & lint on commit
├── apps/
│   ├── coffeeshop/frontend/    # PWA - Digital Menu
│   │   ├── app/                # Next.js App Router
│   │   ├── components/         # UI components
│   │   ├── lib/                # Utilities, Supabase client
│   │   └── hooks/              # React hooks
│   │
│   ├── website/                # Marketing + API Backend
│   │   ├── app/
│   │   │   ├── api/            # 79+ API endpoints
│   │   │   └── (pages)/        # Public pages
│   │   ├── components/         # UI components
│   │   └── lib/                # Services, utilities
│   │
│   └── backoffice/             # Admin Dashboard
│       ├── app/                # Protected routes
│       ├── components/         # Admin UI
│       └── lib/                # Admin services
│
├── shared/
│   ├── config/                 # Environment validation (Zod)
│   ├── types/                  # Shared TypeScript types
│   │   ├── supabase.ts         # Database types
│   │   └── custom.ts           # App-specific types
│   ├── database/               # Database v6.0
│   │   ├── migrations/         # SQL migrations (18+)
│   │   ├── cuisines/           # Product data by region
│   │   ├── ingredients/        # Master ingredients (2548)
│   │   └── _system/            # Types, scripts, docs
│   │
│   └── menu-template/          # Shared menu components
│
├── docs/                       # Project documentation
├── config/                     # Environment configs
├── tsconfig.base.json          # Shared TypeScript config
├── .prettierrc                 # Code formatting rules
└── package.json                # Workspace root
```

---

## Before Development

### 1. Session Start Checklist

```markdown
[ ] Read CLAUDE.md (project context)
[ ] Read docs/BACKLOG.md (pending tasks)
[ ] Read docs/DATABASE-INVENTORY.md (current state)
[ ] Check git status (uncommitted changes?)
[ ] Identify target component(s)
```

### 2. Understanding the Task

```markdown
[ ] Clarify requirements with user if ambiguous
[ ] Identify which components need changes
[ ] Check for existing similar implementations
[ ] Review related documentation
```

### 3. Pre-Work Research

| Task Type | Research Steps |
|-----------|----------------|
| **New Feature** | Check existing patterns in codebase, review similar features |
| **Bug Fix** | Reproduce issue, identify root cause, check related code |
| **Database** | Read PROCEDURE-NEW-DATABASE.md, check LESSONS-LEARNED.md |
| **API** | Review existing endpoints pattern, check RLS policies |

### 4. Planning Complex Tasks

For multi-step tasks:
1. Create todo list with specific items
2. Break into atomic units of work
3. Identify dependencies between steps
4. Plan testing approach

---

## During Development

### 1. Coding Standards

#### TypeScript
- Use strict typing (avoid `any`)
- Prefer interfaces over types for objects
- Export types from dedicated files

#### React/Next.js
- Use App Router patterns (not Pages Router)
- Prefer server components when possible
- Use `"use client"` only when needed

#### Naming Conventions
```typescript
// Files: kebab-case
user-profile.tsx
stripe-service.ts

// Components: PascalCase
function UserProfile() {}

// Functions: camelCase
function getUserProfile() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;

// Database IDs: UPPER_SNAKE_CASE with prefix
ING_CHICKEN_BREAST
BADGE_EXPLORER_ROOKIE
```

### 2. API Development Pattern

```typescript
// Standard API route structure (apps/website/app/api/...)
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // 1. Auth check (if protected)
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse params
    const { searchParams } = new URL(request.url);

    // 3. Database query
    const { data, error } = await supabase.from('table').select('*');

    // 4. Error handling
    if (error) {
      console.error('[EndpointName] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 5. Response transformation
    return NextResponse.json({ data });

  } catch (err) {
    console.error('[EndpointName] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### 3. Database Development

See `shared/database/PROCEDURE-NEW-DATABASE.md` for full details.

Key points:
- All text in English
- Use TEXT + CHECK instead of ENUM
- Metrics in metric units (g, ml)
- IDs in UPPER_SNAKE_CASE with prefixes
- Always include RLS policies

### 4. Incremental Commits

Commit frequently with meaningful messages:

```bash
# Pattern: emoji + concise description
git commit -m "feat: add badge progress API endpoint"
git commit -m "fix: correct allergen null handling"
git commit -m "docs: update DATABASE-INVENTORY with hawaiian"
```

#### Commit Prefixes
| Prefix | Use Case |
|--------|----------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `refactor:` | Code restructure |
| `style:` | Formatting |
| `test:` | Tests |
| `chore:` | Maintenance |

### 5. Testing During Development

```bash
# TypeScript check
npx tsc --noEmit

# Run specific app
npm run dev:website
npm run dev:coffeeshop
npm run dev:backoffice

# Build check
npm run build:website
```

---

## After Development

### 1. Code Review Checklist

```markdown
[ ] TypeScript compiles without errors
[ ] No console.log statements in production code
[ ] Error handling is comprehensive
[ ] Auth checks on protected endpoints
[ ] RLS policies for new tables
[ ] No hardcoded secrets or credentials
[ ] Consistent naming conventions
```

### 2. Documentation Updates

| Change Type | Update Required |
|-------------|-----------------|
| New database/tables | `docs/DATABASE-INVENTORY.md` |
| New API endpoints | Update API count in BACKLOG.md |
| New features | `docs/BACKLOG.md` (completed section) |
| New ingredients | `ingredients/master-ingredients-cache.ts` |
| Architecture changes | `docs/ECOSYSTEM-MAP.md` |

### 3. Commit & Push

```bash
# Check status
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: implement premium subscription system

- Add 6 subscription plans
- Create Stripe integration service
- Add billing API endpoints
- Add webhook handler

🤖 Generated with Claude Code"

# Push to remote
git push origin main
```

### 4. Post-Deploy Verification

```markdown
[ ] Verify Vercel deployment succeeded
[ ] Test critical paths in production
[ ] Check Supabase logs for errors
[ ] Verify RLS policies work correctly
```

---

## Component-Specific Procedures

### PWA (Coffeeshop)

```bash
cd apps/coffeeshop/frontend
npm run dev  # Port 3004
```

**Focus areas:**
- Mobile-first responsive design
- PWA manifest and service worker
- Offline capability
- Performance optimization

**Key files:**
- `app/layout.tsx` - Root layout with PWA meta
- `components/` - Reusable UI components
- `lib/supabase.ts` - Database client
- `hooks/` - Custom React hooks

### Website

```bash
cd apps/website
npm run dev  # Port 3024
```

**Focus areas:**
- API endpoints in `app/api/`
- SEO optimization
- Marketing pages
- User authentication flows

**Key files:**
- `app/api/` - 79+ API endpoints
- `lib/` - Services (stripe, premium-access, etc.)
- `components/` - Marketing UI

### Backoffice

```bash
cd apps/backoffice
npm run dev  # Port 3023
```

**Focus areas:**
- Admin authentication (middleware.ts)
- Dashboard analytics
- Content management
- User/merchant management

**Key files:**
- `middleware.ts` - Auth protection
- `app/` - Admin pages
- `lib/` - Admin services

### Database

**Always follow:** `shared/database/PROCEDURE-NEW-DATABASE.md`

**Key directories:**
- `migrations/` - SQL schema changes
- `cuisines/` - Product data by region
- `ingredients/` - Master ingredients
- `_system/docs/LESSONS-LEARNED.md` - Critical reference

---

## Best Practices Comparison

### Current State vs Industry Standards

| Area | Industry Best Practice | GUDBRO Status | Gap Analysis |
|------|----------------------|---------------|--------------|
| **Monorepo** | Turborepo + pnpm | npm workspaces | Consider Turborepo for caching |
| **TypeScript** | Strict mode + shared config | **Implemented** | `tsconfig.base.json` |
| **Testing** | Jest + RTL | Not configured | Add test framework |
| **CI/CD** | GitHub Actions | **Implemented** | `.github/workflows/ci.yml` |
| **Linting** | ESLint + Prettier | **Implemented** | `.prettierrc` + lint-staged |
| **Database Types** | Auto-generated | **Implemented** | `shared/types/supabase.ts` |
| **Environment** | Validated with Zod | **Implemented** | `shared/config/env.ts` |
| **Pre-commit Hooks** | Husky + lint-staged | **Implemented** | `.husky/pre-commit` |
| **Error Tracking** | Sentry | Console only | Add error service |

### Implemented Tooling

#### Shared Types (`shared/types/`)
```typescript
// Import in any app
import { Account, Badge, Subscription } from '@gudbro/types';
import { ApiResponse, PointsBalance } from '@gudbro/types';
```

#### Environment Validation (`shared/config/`)
```typescript
// Validates at startup, type-safe access
import { env, validateEnv } from '@gudbro/config';

// In API routes or server components
const url = env.supabaseUrl;
const key = env.supabaseServiceKey;
```

#### Prettier (auto-format on save)
```bash
npm run format        # Format all files
npm run format:check  # Check without writing
```

#### GitHub Actions CI
- Type checking all apps on push/PR
- Lint checking
- Build verification

#### Pre-commit Hooks
- Auto-formats staged files
- Runs ESLint with --fix
- Blocks commit if errors

### Remaining Improvements

#### Priority 1: Important
```markdown
[ ] Create shared UI component library
[ ] Add shared error handling utility
```

#### Priority 2: Nice to Have
```markdown
[ ] Migrate to pnpm + Turborepo
[ ] Add Sentry error tracking
[ ] Add Jest + React Testing Library
[ ] Add Storybook for component docs
```

---

## Quick Reference Commands

```bash
# Development
npm run dev:coffeeshop   # PWA on :3004
npm run dev:website      # Website on :3024
npm run dev:backoffice   # Admin on :3023

# Build
npm run build:coffeeshop
npm run build:website
npm run build:backoffice

# Type Check
npm run typecheck        # Current directory
npm run typecheck:all    # All workspaces

# Formatting
npm run format           # Format all files
npm run format:check     # Check formatting

# Lint
npm run lint:all

# Type Generation
npm run generate:types   # Generate Supabase types (requires login)

# Clean
npm run clean

# Database seed
npm run seed:cocktails

# Setup (after clone)
npm install              # Also runs husky install via prepare
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Type errors after DB change | Restart TS server, clear .next |
| Supabase connection fail | Check .env.local, verify RLS |
| Build fails | Check console for specific error |
| API 401 Unauthorized | Verify token in auth header |
| RLS violation | Check policy conditions |

### Debug Commands

```bash
# Clear Next.js cache
rm -rf apps/*/next

# Reinstall dependencies
npm run clean && npm install

# Check Supabase connection
curl -X GET "https://[project].supabase.co/rest/v1/health"
```

---

## Session End Checklist

```markdown
[ ] All changes committed
[ ] Documentation updated
[ ] BACKLOG.md updated with completed items
[ ] No uncommitted changes (git status clean)
[ ] User informed of what was done
```

---

**File:** `docs/DEVELOPMENT-PROCEDURE.md`
**Version:** 1.0
**Created:** 2025-01-03
