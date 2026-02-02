# Benvenuto in GUDBRO

> **Guida di onboarding per nuovi membri del team.**
> Tempo stimato: 3 giorni per essere operativo.

---

## Panoramica Progetto

**GUDBRO** è una piattaforma SaaS B2B per la ristorazione che include:

- **Digital Menu PWA** - Menu digitale per clienti (scan QR)
- **Backoffice** - Dashboard gestionale per merchant
- **AI Co-Manager** - Assistente AI per operazioni quotidiane
- **Sistema Prenotazioni** - Booking tavoli con floor plan
- **Customer Chat** - Chat multi-canale (Telegram, WhatsApp, LINE, Zalo)

**Target:** Coffee shop, ristoranti, bar in Vietnam e Sud-Est asiatico.

---

## Giorno 1: Orientamento (4h)

### Mattina: Comprendi il Prodotto

- [ ] **Leggi PRODUCT.md** - Sezioni 0-3 (Vision, Personas, UX Principles)

  ```bash
  # ~30 min di lettura
  open docs/PRODUCT.md
  ```

- [ ] **Leggi GIANFRANCO.md** - Contesto founder e preferenze
  ```bash
  # ~10 min di lettura
  open docs/GIANFRANCO.md
  ```

### Pomeriggio: Setup Ambiente

- [ ] **Segui docs/dev/SETUP.md** - Configura ambiente locale
  - Installa dipendenze
  - Configura variabili ambiente
  - Avvia server di sviluppo

- [ ] **Esplora l'app come utente**
  - Apri backoffice: http://localhost:3023
  - Apri PWA: http://localhost:3004
  - Naviga tutte le sezioni principali

---

## Giorno 2: Comprendi il Codice (4h)

### Mattina: Workflow e Architettura

- [ ] **Leggi CLAUDE.md** - Sezioni 0-5
  - Sezione 0: Current Focus
  - Sezione 1: Startup Command
  - Sezione 2: Development Workflow
  - Sezione 3: Validation Gates
  - Sezione 3.5: Compounding Engineering (IMPORTANTE!)

- [ ] **Leggi docs/dev/ARCHITECTURE.md** - Overview sistema

### Pomeriggio: Coding Standards

- [ ] **Leggi docs/dev/CODING-STANDARDS.md** - Convenzioni codice

- [ ] **Esplora il codice**

  ```bash
  # Struttura principale
  ls -la apps/
  ls -la shared/database/

  # Un componente tipico
  cat apps/backoffice/components/ui/Button.tsx

  # Un API route tipico
  cat apps/backoffice/app/api/merchants/route.ts
  ```

---

## Giorno 3: Prima Contribuzione (4h)

### Mattina: Task Guidata

- [ ] **Completa docs/dev/FIRST-TASK.md** - Prima PR guidata
  - Task semplice ma completa
  - Impara il workflow di PR
  - Ricevi feedback

### Pomeriggio: Task Reale

- [ ] **Prendi una task dal backlog**

  ```bash
  # Leggi task disponibili
  cat docs/backlog/1-TODO.md
  ```

- [ ] **Segui il workflow standard**
  1. Leggi la spec (se esiste)
  2. Crea branch: `git checkout -b feature/nome-task`
  3. Implementa seguendo CLAUDE.md
  4. Testa localmente
  5. Crea PR

---

## Risorse Chiave

### Documenti da Tenere Aperti

| Documento                      | Quando                  |
| ------------------------------ | ----------------------- |
| `CLAUDE.md`                    | Sempre durante sviluppo |
| `docs/DATABASE-SCHEMA.md`      | Prima di scrivere SQL   |
| `docs/backlog/1-TODO.md`       | Per scegliere task      |
| `docs/dev/CODING-STANDARDS.md` | Per convenzioni         |

### Comandi Utili

```bash
# Avvia sviluppo
pnpm dev:backoffice    # http://localhost:3023
pnpm dev:coffeeshop    # http://localhost:3004

# Verifica codice
pnpm typecheck         # TypeScript check
pnpm build             # Build completo

# Database
# Usa Supabase MCP per query SQL
```

### Canali Comunicazione

- **Domande tecniche:** Chiedi a Claude Code (ha tutto il contesto)
- **Domande prodotto:** Chiedi a Gianfranco
- **Bug/Issues:** Crea issue su GitHub

---

## Checklist Completamento Onboarding

Prima di considerarti "onboarded", assicurati di:

- [ ] Ambiente locale funzionante
- [ ] Navigato tutte le sezioni del backoffice
- [ ] Letto CLAUDE.md sezioni 0-5
- [ ] Letto PRODUCT.md sezioni 0-3
- [ ] Completato prima task guidata
- [ ] Fatto almeno 1 PR approvata
- [ ] Capito il sistema di backlog

---

## FAQ Nuovi Dev

**Q: Dove trovo le credenziali per sviluppo?**
A: File `.env.example` in `apps/backoffice/`. Copia in `.env.local` e chiedi le credenziali.

**Q: Come funziona l'AI Co-Manager?**
A: Leggi `apps/backoffice/lib/ai/` - 15 services che usano OpenAI GPT-4.

**Q: Posso usare Claude Code?**
A: Sì! Il progetto è ottimizzato per Claude Code. Leggi CLAUDE.md per il workflow.

**Q: Cosa faccio se rompo qualcosa?**
A: Non preoccuparti. Git salva tutto. In caso di dubbio: `git stash` e chiedi aiuto.

**Q: Quanto tempo ci vuole per essere produttivo?**
A: ~1 settimana per task semplici, ~2-3 settimane per feature complesse.

---

**Benvenuto nel team!** 🚀
