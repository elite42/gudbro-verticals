# Session Log - GUDBRO Verticals

> Diario di bordo delle sessioni di sviluppo.
> Nuove entry in cima (ordine cronologico inverso).

---

## 2026-01-09

**Focus:** Vercel deployment fixes
**Durata:** ~2h (sessione continuata)

### Completato

- Fix website build su Vercel (mancava vercel.json per pnpm monorepo)
- Fix login backoffice su Vercel (aggiunto ENABLE_DEV_AUTH env var)
- Fix DevRoleSwitcher non visibile su Vercel (ora controlla cookie invece di NODE_ENV)
- Aggiornato docs/backlog/4-DONE.md con task completate
- Aggiunte 3 lezioni a Compounding Engineering

### Commits

- `d5b7b77` - fix(DevRoleSwitcher): show when dev session cookie exists
- `f5663a4` - feat(auth): allow dev mode via ENABLE_DEV_AUTH env var
- `b699956` - fix(website): add vercel.json for pnpm monorepo support

### Decisioni

- DevRoleSwitcher usa cookie `gudbro_dev_session` per rilevare dev mode (non NODE_ENV)
- ENABLE_DEV_AUTH=true settato su Vercel backoffice per staging/demo
- Creato SESSION-LOG.md come alternativa a Pieces MCP (non funzionante)

### Note tecniche

- Pattern per client components che devono sapere se dev mode: controllare cookie, non env vars
- Vercel monorepo: ogni app deve avere vercel.json con installCommand e buildCommand

### Prossima sessione

- Verificare che DevRoleSwitcher appaia su Vercel dopo deploy
- Continuare con task da backlog

---

## 2026-01-09 (mattina)

**Focus:** QR Builder v2 + UI improvements
**Durata:** ~4h

### Completato

- QR Builder v2 completo (313 test, 4-step wizard, export PNG/SVG/PDF)
- Sidebar collapsible con pin/unpin e hover expand
- Account page con profilo, ruoli, loyalty points
- DevRoleSwitcher per testing ruoli in development

### Commits

- `a79f2d5` - feat: QR Builder v2 + Sidebar improvements + Account page

### Decisioni

- QR usa merchant subdomain (qr.pizzeria.gudbro.com)
- Export con preset per materiali stampa (paper, tshirt, sticker, etc.)
- Sidebar state persistito in localStorage

### Files principali

- `apps/backoffice/components/qr/*` - QR Builder components
- `apps/backoffice/lib/qr/*` - QR service layer
- `apps/backoffice/components/layout/Sidebar.tsx` - New sidebar
- `apps/backoffice/app/(dashboard)/account/page.tsx` - Account page

---

## Template Entry

```markdown
## YYYY-MM-DD

**Focus:** [Cosa si e' lavorato]
**Durata:** ~Xh

### Completato

- [Task 1]
- [Task 2]

### Commits

- `hash` - message

### Decisioni

- [Decisione]: [Motivazione]

### Note tecniche

- [Pattern, soluzione, lesson learned]

### Prossima sessione

- [Cosa fare dopo]
```
