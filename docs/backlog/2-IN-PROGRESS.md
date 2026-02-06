# 🔄 IN PROGRESS

> Task attualmente in lavorazione.
> **Max 3 task** alla volta per focus.
> Quando completata → spostala in `3-TESTING.md` o `4-DONE.md`

**Last Updated:** 2026-02-06

---

| ID             | Feature                 | Descrizione                                             | Priority | Started    | Assignee |
| -------------- | ----------------------- | ------------------------------------------------------- | -------- | ---------- | -------- |
| ACCOM-PWA-TEST | Test PWA Accommodations | Test completo della PWA in-stay dopo bugfix session     | P1       | 2026-02-02 | Claude   |
| OPENCLAW-SETUP | OpenClaw Installazione  | Progetto separato in `~/openclaw/` — vedi CLAUDE.md li' | P1       | 2026-02-03 | Claude   |

---

## ACCOM-PWA-TEST — Dettaglio

**Contesto:** Session del 2026-02-02 — trovati e fixati bug critici nella PWA accommodations.

### Fix applicate (committate in `97d03e4`)

1. ~~**Token null safety** — aggiunto `!token` al guard in `page.tsx:158`, rimossi tutti `token!`~~
2. ~~**Empty card spaces** — aggiunto `empty:hidden` Tailwind ai wrapper div~~
3. ~~**Workspace resolution** — aggiunto `apps/accommodations/*` a `pnpm-workspace.yaml`~~
4. ~~**Path alias** — aggiunto `@shared/*` al tsconfig di accommodations~~
5. ~~**WiFi import** — cambiato import in `WifiCard.tsx` da `@shared/utils/qr/wifi` a `@gudbro/utils`~~

### Da testare

- [ ] Ri-autenticarsi su `/stay/BK-T3ST01`
- [ ] Verificare Services (Breakfast, Minibar, Laundry)
- [ ] Verificare card vuote nascoste
- [ ] WiFi card + QR code
- [ ] Restaurant, Documents, Orders, Concierge, bottom nav
- [ ] Test responsive mobile

---

## OPENCLAW-SETUP — Progetto Separato

> In `~/openclaw/` — sessione Claude Code dedicata.
> Step 1 completato (2026-02-03). Step 2 (installazione) next.
