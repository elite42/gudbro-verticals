# GUDBRO Verticals

Digital menu applications and centralized food database built on GUDBRO's QR platform.

## Quick Reference

| App | URL | Port | Status |
|-----|-----|------|--------|
| Website | gudbro-website.vercel.app | 3000 | LIVE |
| Backoffice | gudbro-backoffice.vercel.app | 3001 | LIVE |
| Coffeeshop PWA | gudbro-coffeeshop-pwa.vercel.app | 3004 | LIVE |

## Repository Structure

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/frontend/  # Digital Menu PWA
│   ├── backoffice/           # Admin Dashboard
│   └── website/              # Marketing Site
├── shared/database/          # Centralized food databases
│   ├── ingredients/master/   # 598 master ingredients
│   ├── cocktails/            # 227 IBA cocktails
│   ├── pasta/                # 87 recipes
│   ├── pizzas/               # 62 recipes
│   └── ...                   # 12 food categories total
├── docs/                     # Documentation
└── .claude/commands/         # Workflow slash commands
```

## Stack

- **Framework:** Next.js 14.2.33, React 18.3.1
- **Styling:** Tailwind CSS 3.4.1
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma 5.22.0 (backoffice only)
- **Deployment:** Vercel

## Development

```bash
# Coffeeshop PWA
cd apps/coffeeshop/frontend && npm run dev  # :3004

# Backoffice
cd apps/backoffice && npm run dev           # :3001

# Build
npm run build

# Deploy (auto on push to main)
git push origin main
```

## Food Database Summary

| Database | Records | Status |
|----------|---------|--------|
| Master Ingredients | 598 | In Supabase |
| Cocktails | 227 | In Supabase |
| Pasta | 87 | In Supabase |
| Pizzas | 62 | In Supabase |
| Salads | 52 | In Supabase |
| Appetizers | 51 | In Supabase |
| Sandwiches | 50 | In Supabase |
| Beers | 45 | In Supabase |
| Burgers | 45 | In Supabase |
| Soups | 39 | In Supabase |
| Desserts | 35 | In Supabase |
| Risotti | 27 | In Supabase |
| Dumplings | 20 | In Supabase |
| **TOTAL** | **838** | |

## Documentation

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI assistant context |
| `docs/inventory.md` | Complete feature inventory |
| `docs/DATABASE-INVENTORY.md` | Food databases status |
| `docs/BACKLOG.md` | Pending tasks |
| `docs/SISTEMA-FILTRI.md` | Sistema 5 Dimensioni (66 safety parameters) |

## Related Repositories

- **gudbro-qr-core** - QR platform, microservices, admin UI

## License

UNLICENSED - Proprietary software

---

**Last Updated:** 2025-12-16
