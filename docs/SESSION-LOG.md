# Session Log - GUDBRO Verticals

> Diario di bordo delle sessioni di sviluppo.
> Nuove entry in cima (ordine cronologico inverso).

---

## 2026-01-10 - Sessione Strategica: Modelli di Servizio

**Focus:** Discussione strategica su modelli di servizio locali e impatto su prodotto
**Durata:** ~2h
**Tipo:** Product strategy / Discovery

### Completato

- Mappatura 5 modelli di servizio (Table Service, Counter+Delivery, Counter+Pickup, Counter+Menu Illuminato, QR Ordering)
- Definizione tier "Menu Only" per merchant che non vogliono cambiare flusso
- Concept AI Conversational Onboarding (chat-based onboarding che diventa co-manager)
- Sistema notifiche "Ordine Pronto" (sostituzione buzzer hardware)
- Percorso upgrade cliente: Menu Only → Table Ordering → Notifiche
- Aggiunto backlog items in `docs/backlog/1-TODO.md` sezione P0.5

### Decisioni

- **Modello di servizio come prima domanda onboarding**: determina feature mostrate e pain point rilevanti
- **Menu Only come entry tier**: mercato più ampio, conversione più facile, upsell futuro
- **WhatsApp/Zalo/LINE per notifiche in Asia**: tutti li hanno aperti, zero costo
- **AI onboarding = demo live del prodotto**: il prospect sperimenta prima di pagare

### Lezioni Apprese (Cosa Claude ha imparato)

| Lezione                                     | Insight                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Regional market awareness**               | Asia ha piattaforme diverse (Zalo, LINE, KakaoTalk, WeChat). Non assumere default occidentali.        |
| **Modelli di servizio ≠ one-size-fits-all** | Ogni tipo di locale ha bisogno di feature diverse. L'onboarding deve capirlo subito.                  |
| **QR ha valore indipendente dall'ordering** | Anche senza ordering digitale, QR menu offre: accessibilità, discovery, pre-decisione.                |
| **Resistenza psicologica = costi nascosti** | Cliente che deve rialzarsi per ordinare di nuovo → meno secondi ordini. Frizione invisibile ma reale. |
| **Entry tier → upgrade path**               | Menu Only non è un tier "povero", è un piede nella porta per upsell futuro.                           |
| **AI onboarding = demo + configurazione**   | L'AI che fa onboarding È il prodotto. Il prospect lo prova prima di pagare.                           |
| **Sostituire hardware con software**        | Buzzer → notifiche telefono. Meno costi, meno manutenzione per merchant.                              |
| **UX Settings: tabs > sidebar submenu**     | Meno click, tutto vicino, meno movimento mouse. Pattern da applicare ovunque.                         |

### Argomenti di Vendita Scoperti

| Target                    | Argomento                                                          |
| ------------------------- | ------------------------------------------------------------------ |
| Counter + Menu Illuminato | "I tuoi clienti scoprono di più, ordinano di più, code più veloci" |
| Chi ha buzzer hardware    | "Elimina batterie e dispositivi persi. Il telefono è il buzzer"    |
| Chi non vuole cambiare    | "Non cambi nulla. Solo un QR sul tavolo. Risultati subito"         |

### Note

- Sessione più strategica che tecnica - focus su product thinking
- L'utente ha fatto una passeggiata per "schiarirsi la mente" e ha avuto insight importanti
- Discussione emergente, non pianificata - valore alto

### Prossima sessione

- Review backoffice changes (tabbed settings, social page)
- Eventuale implementazione delle feature discusse

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
