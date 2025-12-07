# Deploy Protocol

For deploying to Vercel:

## Coffeeshop PWA
```bash
cd apps/coffeeshop/frontend
npm run build
# If successful, push to main for auto-deploy
git push origin main
```

## Backoffice
```bash
cd apps/backoffice
npm run build
# If successful, push to main for auto-deploy
git push origin main
```

## Pre-Deploy Checklist
- [ ] Build passes locally
- [ ] No TypeScript errors (or ignored intentionally)
- [ ] Environment variables set on Vercel
- [ ] CLAUDE.md updated with changes

## URLs
- PWA: https://gudbro-coffeeshop-pwa.vercel.app
- Backoffice: https://gudbro-backoffice.vercel.app
- Website: https://gudbro-website.vercel.app
