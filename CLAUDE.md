# GUDBRO Verticals

> **IMPORTANTE:** Prima di ogni nuova feature, consulta `docs/inventory.md`

## Quick Reference

| App | URL | Port | Status |
|-----|-----|------|--------|
| Coffeeshop PWA | gudbro-coffeeshop-pwa.vercel.app | 3004 | LIVE |
| Backoffice | gudbro-backoffice.vercel.app | 3001 | LIVE |
| Website | gudbro-website.vercel.app | 3000 | LIVE |

## Stack

- **Framework:** Next.js 14.2.33, React 18.3.1
- **Styling:** Tailwind CSS 3.4.1
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma 5.22.0 (backoffice only)
- **Deployment:** Vercel

## Repository Structure

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/frontend/  # Digital Menu PWA
│   ├── backoffice/           # Admin Dashboard
│   └── website/              # Marketing Site
├── shared/database/          # Migrations, types, filters
├── docs/                     # Extended documentation
│   ├── inventory.md          # CRITICAL: All features list
│   └── sprints/              # Sprint tracking
└── .claude/commands/         # Workflow slash commands
```

## Session Protocol

### Start Session
1. Read `docs/inventory.md` - see what exists
2. Ask user what to work on
3. Create todo list

### End Session
1. Update `docs/inventory.md` with new features
2. Commit with: `docs: update inventory`

## Key Systems (Summary)

| System | Status | Details |
|--------|--------|---------|
| Multi-Locale | ✅ | 197 countries, 111 languages, 6 RTL |
| Multi-Tenant | ✅ | Partner → Org → Brand → Location |
| Currency | ✅ | 33 currencies, manual refresh |
| Translations | ✅ | Inline editor + CSV import |
| Food Costs | ✅ | 69 ingredients with VND costs |
| Recipes | ✅ | 22 barista recipes |
| Design System | ✅ | CVA + shadcn/ui pattern |

## Environment Variables

### Coffeeshop
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### Backoffice
```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

## Commands

```bash
# Dev servers
cd apps/coffeeshop/frontend && npm run dev  # :3004
cd apps/backoffice && npm run dev           # :3001

# Build
npm run build

# Deploy (auto on push to main)
git push origin main
```

## Conventions

- **Commits:** emoji + descrizione concisa
- **PR:** Summary + Test Plan + `Generated with Claude Code`
- **No emojis** in code/files unless requested

## Documentation

| File | Purpose |
|------|---------|
| `docs/inventory.md` | Complete feature inventory |
| `docs/CLAUDE-archive-*.md` | Historical context |
| `apps/*/CLAUDE.md` | App-specific context |

## Auto-Update Rule

Claude DEVE aggiornare `docs/inventory.md` dopo ogni:
- Nuova feature implementata
- File creato/modificato significativamente
- Sprint completato

---

**Last Updated:** 2025-12-07
