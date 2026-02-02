# AI Employee - La Visione Completa

> **Data:** 2026-01-26 (aggiornato: 2026-01-30)
> **Hardware:** Mac Studio M5 (attesa release WWDC Giugno 2026)
> **Orchestratore:** OpenClaw (https://openclaw.ai/)
> **Timeline:** Luglio-Ottobre 2026 (Mac Studio) | Febbraio-Giugno 2026 (studio e test su Mac M3)
> **Costo:** TBD (budget non è un vincolo)

---

## Executive Summary

Un "dipendente AI" che lavora 24/7 su Mac Studio locale:

| Capability | Tecnologia | Output |
|------------|------------|--------|
| **Immagini** | FLUX (Rectified Flow) | ~4653 foto prodotti |
| **Video** | Remotion | Marketing, tutorial, social |
| **Orchestrazione** | OpenClaw → Claude/LLM locale | Multi-agente, multi-canale, 24/7 |
| **Sviluppo** | OpenClaw → Claude Code | Prompt perfetti, zero contesto perso |
| **Content** | LLM locale | Blog, social posts, traduzioni |
| **Testing** | Automazione | Test continui, QA |

**ROI:** < 3 mesi payback, poi risparmio continuo.

---

## 1. Hardware: Mac Studio M5 (Target)

### Specifiche Attese

| Spec | Valore | Perché |
|------|--------|--------|
| Chip | M5 Max/Ultra | GPU potenziata, Neural Engine migliorato |
| RAM | 64-128GB unified | Modelli LLM più grandi + FLUX in parallelo |
| SSD | 1TB+ | Modelli pesano ~40GB+ totali |
| Prezzo | TBD | Budget non è un vincolo |

### Perché aspettare M5 (decisione aggiornata 2026-01-30)

- **Release atteso:** WWDC Giugno 2026, disponibilità Giugno-Luglio
- **Più RAM unificata:** possibilmente fino a 256GB, fondamentale per LLM locali più grandi
- **Neural Engine migliorato:** inference locale più veloce per FLUX e LLM
- **Efficienza energetica:** per macchina 24/7 conta
- **Modelli open source:** tra 3-4 mesi i modelli disponibili (Llama, Mistral, Qwen, DeepSeek) saranno di qualità molto superiore a quelli attuali
- **OpenClaw matura:** 112k+ GitHub stars, 34 security commits, security audit integrato — ma ancora in evoluzione rapida. Fase di studio su Mac M3 prima del deploy produzione
- **Timeline personale:** rientro in Italia prima del setup
- **Parte coding:** rimane su Claude Code che continuerà a migliorare significativamente

### Strategia: Studio su Mac M3 (Febbraio-Giugno 2026)

Prima dell'arrivo del Mac Studio M5, fase di studio e preparazione su Mac M3 attuale:

- **Installare OpenClaw** in ambiente isolato con secure baseline config
- **Studiare** architettura, skill system, sicurezza, processi
- **Testare** casi d'uso con Discord come canale principale
- **Monitorare** aggiornamenti, security advisories, release notes
- **Definire** piano di azione chiaro con processi e setup da seguire
- **Obiettivo:** arrivare al Mac Studio M5 con competenza piena e setup documentato

---

## 2. Stack Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                     MAC STUDIO M5 (64-128GB)                     │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │              OPENCLAW GATEWAY (Orchestrator)              │    │
│  │              ws://127.0.0.1:18789                         │    │
│  │                                                           │    │
│  │  • Memoria persistente (sessioni + contesto)              │    │
│  │  • Knowledge base GUDBRO (codebase indexed)               │    │
│  │  • Skills custom per ogni task                            │    │
│  │  • Cron jobs automatici                                   │    │
│  │  • Multi-agente (health, business, dev, family)           │    │
│  └──────────────────────────────────────────────────────────┘    │
│         │              │              │              │            │
│         ▼              ▼              ▼              ▼            │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐     │
│  │ LLM      │   │ FLUX     │   │ Remotion │   │ Tools    │     │
│  │ Llama 4  │   │ Schnell  │   │          │   │          │     │
│  │ 8B       │   │ Klein 4B │   │ + FFmpeg │   │ rembg    │     │
│  └──────────┘   └──────────┘   └──────────┘   │ APIs     │     │
│       │              │              │         └──────────┘     │
│       │              │              │              │            │
│       ▼              ▼              ▼              ▼            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      OUTPUT                               │  │
│  │  • Prompt arricchiti → Claude API                         │  │
│  │  • Immagini prodotti → Supabase Storage                   │  │
│  │  • Video marketing → Social/YouTube                       │  │
│  │  • Content → Blog/Social                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                   CANALI CONNESSI                         │    │
│  │  Discord (primario) • WhatsApp • Telegram • Slack • Web   │    │
│  └──────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Capability: Generazione Immagini

### Il Problema

- ~4653 prodotti nel database senza immagini
- Pain point principale per i merchant
- Immagini attuali brutte o mancanti

### La Soluzione: FLUX (Rectified Flow)

| Modello | Parametri | Peso | Uso | Licenza |
|---------|-----------|------|-----|---------|
| **FLUX.1 Schnell** | 12B | ~24GB | Qualità alta | Apache 2.0 ✅ |
| **FLUX.2 Klein 4B** | 4B | ~8GB | Batch veloce | Apache 2.0 ✅ |

### Perché FLUX (non SDXL)

| Aspetto | SDXL (vecchio) | FLUX (nuovo) |
|---------|----------------|--------------|
| Paradigma | DDPM | Rectified Flow |
| Steps | 20-50 | 4-8 |
| Velocità | ~75s/img | **2-5s/img** |
| Qualità | Buona | **Batte Midjourney** |

### Tre Workflow per Tipo Prodotto

```
1. PIATTI / BEVANDE PREPARATE (pizza, cocktail, pasta)
   ├── Cerca riferimenti (Unsplash, Pexels)
   ├── FLUX genera versione "ideale"
   └── Applica sfondo aziendale GUDBRO

2. PRODOTTI BRANDED (Coca-Cola, Peroni, vini)
   ├── Cerca immagine ufficiale/stock
   ├── Rimuovi sfondo (rembg)
   └── Applica sfondo aziendale GUDBRO

3. PRODOTTI GENERICI (senza foto disponibili)
   ├── FLUX genera da zero
   └── Applica sfondo aziendale GUDBRO
```

### Performance

- **Tempo totale:** ~4-6 ore per 4653 immagini
- **Costo:** $0 (tutto locale)
- **Qualità:** Professionale, consistente

### Workflow Combinato: Kimi K2.5 + FLUX + OpenClaw (2026-01-31)

> **Riflessione:** FLUX genera immagini, Kimi K2.5 le pensa e le valuta, OpenClaw orchestra tutto.

**Distinzione chiave:**
- **FLUX** = text-to-image (genera foto da zero, gira locale)
- **Kimi K2.5** = LLM con vision (legge/analizza foto, NON le genera)
- **OpenClaw** = orchestratore (coordina il workflow multi-step)

**Pipeline automatizzata per ogni prodotto:**

```
OpenClaw skill: food_images_v2.py
│
├── STEP 1: Kimi K2.5 ANALIZZA il prodotto
│   ├── Legge: nome, ingredienti, categoria, verticale
│   ├── Decide: workflow 1 (piatto), 2 (branded), o 3 (generico)
│   ├── Genera: prompt FLUX ottimale per quel piatto specifico
│   │   es. "professional food photo, margherita pizza with fresh
│   │        basil, melted mozzarella, tomato sauce, rustic wooden
│   │        board, warm lighting, shallow depth of field"
│   └── Suggerisce: stile, illuminazione, angolazione, props
│
├── STEP 2: FLUX genera l'immagine
│   ├── Riceve il prompt da Kimi K2.5
│   ├── FLUX.1 Schnell (24GB) per qualità alta
│   ├── oppure FLUX.2 Klein 4B (8GB) per batch veloce
│   └── Output: immagine raw 1024x1024
│
├── STEP 3: Post-processing
│   ├── rembg: rimuovi sfondo se necessario
│   ├── Applica sfondo aziendale GUDBRO
│   └── Resize/crop per formato menu (WebP, thumbnail)
│
├── STEP 4: Kimi K2.5 VALUTA il risultato (vision)
│   ├── "La foto sembra appetitosa?"
│   ├── "I colori sono realistici?"
│   ├── "L'immagine rappresenta correttamente gli ingredienti?"
│   ├── Score: 1-10
│   ├── Se score < 7 → rigenera con prompt modificato (max 3 tentativi)
│   └── Se score ≥ 7 → approva
│
└── STEP 5: Upload
    ├── Supabase Storage
    ├── Aggiorna record prodotto con URL immagine
    └── Log: prodotto, prompt usato, score, tentativi
```

**Vantaggi del workflow combinato vs FLUX solo:**

| Aspetto | Solo FLUX | Kimi + FLUX + OpenClaw |
|---------|-----------|----------------------|
| Prompt | Generico per categoria | Specifico per ogni piatto |
| Qualità | Variabile | Validata da AI vision |
| Retry | Manuale | Automatico se score < 7 |
| Costi | $0 (locale) | ~$0.50 per 4653 prodotti (Kimi API) |
| Consistenza | Bassa | Alta (stile uniforme per merchant) |
| Autonomia | Serve supervisione | Fully autonomous |

**Costi Kimi K2.5 per la pipeline:**
- ~500 token per analisi prodotto + prompt generation
- ~300 token per valutazione immagine
- 4653 prodotti × 800 token medi = ~3.7M token
- A $0.60/1M input: **~$2.20 totali** per tutti i 4653 prodotti
- Con retry (30% dei prodotti): **~$3.00 totali**

**Analisi Costi Completa — 4653 Prodotti (2026-01-31)**

**Scenario A: Tutto Locale su Mac Studio M5 — quasi gratis**

| Voce | Costo |
|------|-------|
| FLUX.1 Schnell (locale, ~6 ore) | $0 |
| Kimi K2.5 API (prompt + validazione) | ~$3.00 |
| Elettricità (~6 ore calcolo) | ~$0.50 |
| **Totale** | **~$3.50** |

**Scenario B: API Esterne (Mac M3 fase studio)**

| Provider | Modello | $/img | 4653 img | + Kimi | Totale |
|----------|---------|-------|----------|--------|--------|
| Pixazo | FLUX Schnell | $0.0012 | $5.58 | $3.00 | **$8.58** |
| SiliconFlow | Kontext dev | $0.015 | $69.80 | $3.00 | **$72.80** |
| Together AI | FLUX.1 dev | $0.025 | $116.33 | $3.00 | **$119.33** |
| fal.ai | FLUX.2 pro | $0.03 | $139.59 | $3.00 | **$142.59** |
| Replicate | FLUX.1 dev | $0.03 | $139.59 | $3.00 | **$142.59** |
| BFL Direct | FLUX 1.1 pro | $0.04 | $186.12 | $3.00 | **$189.12** |

**Scenario C: Con Retry 30% (~6049 immagini totali)**

| Provider | 6049 img | + Kimi | Totale |
|----------|----------|--------|--------|
| Pixazo | $7.26 | $3.90 | **$11.16** |
| Together AI | $151.23 | $3.90 | **$155.13** |
| fal.ai | $181.47 | $3.90 | **$185.37** |

**Verdetto:**
- **Mac Studio M5:** ~$3.50 per tutto il database. Praticamente gratis.
- **Mac M3 (fase studio):** Pixazo a ~$9-11 è il best deal per testare il workflow.
- **Provider premium** (fal.ai, BFL): $140-190 — solo se serve qualità pro massima.
- **Together AI FLUX.1 Schnell:** attualmente **gratuito** (promozione limitata).

**Note hardware Mac M3:**
- M3 con 16GB RAM: solo FLUX.2 Klein 4B (~8GB) locale — qualità inferiore
- M3 con 24GB+ RAM: FLUX.1 Schnell possibile locale
- Mac Studio M5 (64-128GB): entrambi i modelli FLUX in parallelo, zero costi

**Fonti prezzi (Gennaio 2026):**
- [Pixazo](https://www.pixazo.ai/blog/flux-schnell-api-cheapest-pricing)
- [fal.ai](https://fal.ai/pricing)
- [Together AI](https://www.together.ai/models/flux-1-schnell)
- [SiliconFlow](https://www.siliconflow.com/articles/en/the-cheapest-image-gen-models)
- [Replicate](https://replicate.com/blog/flux-state-of-the-art-image-generation)

**Applicazione per Merchant (visione as-a-Service):**
Questo stesso workflow si applica ai merchant. Quando un merchant aggiunge un nuovo piatto
via chat ("ho aggiunto la carbonara al menu"), il suo agente OpenClaw può:
1. Kimi K2.5 genera il prompt ottimale
2. Chiama API FLUX su infrastruttura GUDBRO (o API esterna)
3. Kimi K2.5 valida
4. Propone la foto al merchant per approvazione
5. Pubblica sul menu digitale

---

## 4. Capability: Generazione Video

### Tecnologia: Remotion

| Metrica | Valore |
|---------|--------|
| GitHub Stars | 30.5k+ |
| Licenza | Free per team ≤3 |
| Tecnologia | React + Node.js + FFmpeg |
| AI Skills | Integrati con Claude Code |

**Sito:** https://remotion.dev

### Use Cases per GUDBRO

| Tipo | Descrizione | Frequenza |
|------|-------------|-----------|
| **Marketing** | Video promo merchant, showcase menu | On-demand |
| **Social** | Stories/Reels automatici, recap settimanali | Giornaliero |
| **Tutorial** | Guide merchant, demo feature, how-to | Settimanale |
| **Report** | Dashboard animate, performance mensili | Mensile |

### Workflow Autonomo

```
[Trigger: nuovo merchant signup]
       │
       ▼
[LLM Locale: genera script Remotion]
       │
       ▼
[Remotion: rendering video]
       │
       ▼
[Output: video MP4/WebM]
       │
       ▼
[Pubblica: Social/Email/YouTube]
```

### Vantaggi

- ✅ React-based (stack già conosciuto)
- ✅ Free per il nostro team
- ✅ AI Skills nativi
- ✅ Rendering locale (Mac Studio)
- ✅ Template riutilizzabili

---

## 5. Capability: Development Orchestrator

### Il Problema Attuale

```
OGGI: Comunicazione diretta con Claude

Gianfranco ──────────────────────▶ Claude
     │
     ❌ Contesto perso tra sessioni
     ❌ Devo ripetere regole CLAUDE.md
     ❌ Dimentica decisioni passate
     ❌ Prompt vaghi = risultati imprecisi
```

### La Soluzione: OpenClaw come Intermediario

```
CON OPENCLAW:

Gianfranco ──▶ OpenClaw (locale) ──▶ Claude API
  (Discord/       │
   WhatsApp/      ├── Memoria persistente
   Telegram)      ├── Conosce codebase
                  ├── Applica regole CLAUDE.md
                  ├── Arricchisce prompt automaticamente
                  └── Multi-agente (dev, business, family)
```

### Esempio Concreto

```
INPUT UTENTE:
"aggiungi dark mode"

OUTPUT MOLTBOT → CLAUDE:
"Implementa dark mode per PWA coffeeshop.

CONTESTO PROGETTO:
- Framework: Next.js 14.2.33
- UI: Radix UI + Tailwind
- Pattern: CUSTOMIZATIONS-SYSTEM.md

DECISIONI PASSATE:
- CSS variables per temi
- Merchant può customizzare colori

FILE DA MODIFICARE:
- tailwind.config.js
- globals.css
- ThemeProvider

REGOLE:
- Usa Phosphor Icons
- Segui pattern v2
- Test con Vitest"
```

### Risparmio Token

| Metrica | Oggi | Con OpenClaw | Risparmio |
|---------|------|--------------|-----------|
| Token contesto/sessione | ~8,000 | ~500 | **93%** |
| Token/mese (overhead) | ~1.2M | ~75K | **~1.1M** |
| Tempo setup sessione | 5-10 min | 0 | **100%** |

### Risparmio in Dollari

```
Risparmio mensile:
- Token risparmiati: ~$45/mese
- Tempo risparmiato: 5-10 ore/settimana

Valore totale: ~$200-400/mese
```

---

## 6. Capability: Content Creation

### Blog Posts

```
[Trigger: nuova feature rilasciata]
       │
       ▼
[LLM: genera articolo blog]
       │
       ▼
[Review (opzionale)]
       │
       ▼
[Pubblica su blog GUDBRO]
```

### Social Media

```
[Trigger: cron giornaliero]
       │
       ▼
[LLM: analizza dati, genera post]
       │
       ▼
[FLUX: genera immagine accompagnamento]
       │
       ▼
[Pubblica su Instagram/Twitter/LinkedIn]
```

### Traduzioni

```
[Trigger: nuovo contenuto in italiano]
       │
       ▼
[LLM: traduce in EN, ES, FR, DE]
       │
       ▼
[Salva in database traduzioni]
```

---

## 7. Skills OpenClaw

```
Mac Studio M5
└── OpenClaw Gateway
    └── Skills/
        ├── food_images.py       → Genera immagini prodotti
        ├── video_creator.py     → Crea video con Remotion
        ├── code_assistant.py    → Arricchisce prompt per Claude
        ├── content_writer.py    → Blog, social posts
        ├── translator.py        → Traduzioni multi-lingua
        ├── tester.py            → Esegue test automatici
        └── publisher.py         → Pubblica su vari canali
```

---

## 8. Timeline

### Phase 0: Studio e Test su Mac M3 (Febbraio-Giugno 2026) ← NUOVA

| Mese | Attività |
|------|----------|
| Feb | Installazione OpenClaw su Mac M3 con secure baseline. Primo test con Discord |
| Mar | Studio skill system, creazione prime skill di test. Monitoraggio aggiornamenti |
| Apr | Test multi-agente (dev + business). Documentazione processi |
| Mag | Definizione piano di azione finale. Preparazione config per Mac Studio M5 |
| Giu | WWDC — valutazione Mac Studio M5. Ordine hardware |

### Phase 1: Immagini (Luglio 2026)

| Giorno | Attività |
|--------|----------|
| 1 | Setup Mac Studio M5: migrazione config OpenClaw da M3 |
| 2 | Download FLUX, test generazione |
| 3-4 | Sviluppo food_images skill |
| 5 | Batch generation ~4653 immagini |

### Phase 2: Video (Agosto 2026)

| Settimana | Attività |
|-----------|----------|
| 1 | Setup Remotion + FFmpeg |
| 2 | Template library (promo, social, tutorial) |
| 3 | Integrazione con OpenClaw |
| 4 | Test e refinement |

### Phase 3: Development Orchestrator (Settembre 2026)

| Settimana | Attività |
|-----------|----------|
| 1 | Setup code_assistant skill |
| 2 | Indicizzazione codebase GUDBRO |
| 3 | Integrazione Claude API |
| 4 | Test workflow sviluppo |

### Phase 4: Multi-Agente e Discord (Ottobre 2026)

| Settimana | Attività |
|-----------|----------|
| 1 | Setup agenti specializzati (dev, business, content) |
| 2 | Integrazione Discord come canale primario |
| 3 | Cron jobs, automazioni, morning briefing |
| 4 | Ottimizzazione e documentazione processi |

### Ongoing

- Nuovi prodotti: immagini generate automaticamente
- Content: pubblicazione automatica
- Sviluppo: OpenClaw come interfaccia principale
- Monitoraggio: security advisories, release notes, community updates

---

## 9. Costi e ROI

### Costi

| Voce | Costo | Frequenza |
|------|-------|-----------|
| Mac Studio M5 (config TBD) | TBD | Una tantum |
| Elettricità | ~$25/mese | Ricorrente |
| API LLM ibrido (Kimi K2.5 + Claude per critici) | ~$15-60/mese | Ricorrente |
| Remotion | $0 | Free (team ≤3) |
| FLUX | $0 | Open source |
| LLM locale | $0 | Open source |
| API Unsplash/Pexels | $0 | Free tier |

**Totale:** TBD (Mac Studio M5) + ~$40-85/mese

### Risparmio

| Voce | Risparmio/mese |
|------|----------------|
| Token Claude (overhead) | ~$45 |
| Tempo sviluppo (5-10h/sett × $50) | ~$1,000-2,000 |
| Immagini (vs servizi cloud) | ~$50 |
| Video (vs freelancer) | ~$500+ |

### ROI

```
Investimento: TBD (Mac Studio M5)
Risparmio mensile: $1,500+ (conservativo)
Payback: < 2-3 mesi

Dopo payback: tutto risparmio netto
```

---

## 10. Ricerca OpenClaw (2026-01-30, aggiornato 2026-01-31)

> **Stato:** Ricerca completata. Monitoraggio evoluzione in corso (check periodici con Claude).
> **Fonti:** 20+ articoli, documentazione ufficiale, Hacker News, GitHub, security advisories
> **Decisione:** NON installare subito. Monitorare evoluzione progetto, poi procedere.

### 10.1 Cos'è OpenClaw

OpenClaw (ex Clawdbot → Moltbot → OpenClaw, 30 gennaio 2026) è un assistente AI personale open-source creato da Peter Steinberger (fondatore PSPDFKit). **180K+ GitHub stars** (aggiornato 2026-02-01), 2M visitatori in una settimana.

**Architettura:** Gateway WebSocket locale (`ws://127.0.0.1:18789`) che connette canali di messaggistica a un agente AI (Pi) con accesso shell, browser, file system.

**Requisiti minimi:** Node.js 22.12.0+ (LTS, include fix CVE-2025-59466 e CVE-2026-21636), 1GB RAM, 500MB disco. Mac M3 ampiamente sufficiente.

**Naming history:** Clawdbot (Nov 2025) → Moltbot (trademark Anthropic) → OpenClaw (30 Jan 2026, nome definitivo).

**Ultima release:** v2026.1.30 — npm package rinominato `openclaw`, scope `@openclaw/*`. Password ora obbligatoria (v2026.1.29 breaking change). Kimi K2.5 e Kimi Coding aggiunti come modelli gratuiti built-in.

### 10.2 Casi d'Uso Reali (dalla community)

#### Discord (canale primario per GUDBRO)
- **Auto-Support:** monitora canali, risponde automaticamente, inoltra notifiche a Telegram. Ha fixato autonomamente un bug in produzione senza che nessuno glielo chiedesse
- **Multi-agent orchestration:** 14+ agenti sotto un gateway con Opus 4.5 orchestratore (setup di @adam91holt)
- DM pairing per sconosciuti, mention gating per gruppi, thread management
- Ideale come **virtual employee** in server Discord aziendale

#### Produttività
- **Email autopilot:** processa migliaia di email, categorizza, scrive bozze
- **Morning briefing:** calendario + task + health data (Oura/Apple Health) + meteo + news
- **Contabilità:** raccoglie PDF da email, prepara documenti per commercialista

#### Automazione Browser
- **Prenotazione voli/spesa:** cerca, compila form, conferma autonomamente
- **TradingView:** cattura e analizza grafici via screenshot senza API

#### Sviluppo
- App iOS completa costruita e deployata su TestFlight interamente da Telegram
- PR review automatiche con feedback su Telegram
- Creazione skill dinamiche (Wine Cellar Manager da CSV di 962 bottiglie)

#### Smart Home
- Home Assistant, robot aspirapolvere, stampante 3D, purificatore d'aria — tutto via chat

#### Approccio Multi-Agente (@thekitze / kitze)

Kitze (creatore di Sizzy, sviluppatore React) ha creato un fork chiamato [Clawdis](https://github.com/kitze/clawdis) e ha sviluppato un setup con profili agente specializzati che si comportano come un team di consulenti professionisti:

```json5
// Esempio architettura multi-agente
{
  agents: {
    list: [
      { id: "health",   workspace: "~/.openclaw/workspace-health" },   // Salute, biometrici
      { id: "business",  workspace: "~/.openclaw/workspace-business" }, // Analisi mercato, CRM
      { id: "family",    workspace: "~/.openclaw/workspace-family" },   // Calendario, reminder
      { id: "dev",       workspace: "~/.openclaw/workspace-dev" }       // Code review, deploy
    ]
  }
}
```

Ogni agente ha workspace isolato, permessi tool specifici, memoria separata, e può essere raggiunto da canali diversi. Ha anche creato **"Agents UI"** — app desktop per gestire skill e comandi su più piattaforme.

### 10.3 Mappa Rischi e Sicurezza

#### Critiche FONDATE (da esperti con prove)

| Rischio | Chi l'ha trovato | Evidenza |
|---------|-----------------|----------|
| Prompt injection non risolto | Steinberger stesso | Ammesso nella documentazione. Problema industria-wide |
| Gateway esposti su internet | Jamieson O'Reilly | 299+ istanze su Shodan con API key e chat esposte |
| Credenziali in chiaro su disco | SlowMist | Anthropic API keys, Telegram tokens, Slack OAuth esposti |
| Bypass auth reverse proxy | Bitdefender | nginx/Caddy trattano connessioni come localhost |
| Costi token fuori controllo | Community HN | $300+ in 2 giorni, $560 in un weekend, $29/singolo task |
| Estensioni VS Code false | Aikido Security | RAT (ScreenConnect) mascherato da estensione Clawdbot |
| Token crypto falso | Yahoo Finance | Scam da $16M, crollato 90%. Steinberger ha avvertito pubblicamente |

#### Critiche INFONDATE o esagerate

| Affermazione | Realtà |
|-------------|--------|
| "Intrinsecamente pericoloso" | Solo se configurato male. Secure baseline config documentata |
| "Non è vero AI, solo wrapper" | Riduttivo. Multi-canale + proattività + skill system è innovativo |
| "Vibe-coded slop" | Steinberger ha track record serio (PSPDFKit), 34 commit sicurezza |
| "Meglio non usarlo" | IBM Research lo considera cambio di paradigma per agenti AI |

#### 🆕 Update Sicurezza (2026-02-01)

| Sviluppo | Dettaglio | Impatto |
|----------|-----------|---------|
| **Password obbligatoria** | v2026.1.29 — rimossa possibilità di girare senza password | Positivo — elimina installazioni "yolo" |
| **Fix LFI** | v2026.1.30 — bloccata estrazione path locale nel media parser | Positivo — chiude vettore di attacco |
| **1,800+ istanze esposte** | Dark Reading — API key e chat in chiaro trovate online | Negativo — il problema utente persiste |
| **Break-in in 5 minuti** | Archestra AI — demo prompt injection via email normale | Negativo — problema industry-wide |
| **26% skill vulnerabili** | Cisco — confermato su 31,000 skill analizzate | Negativo — community skill non fidate |
| **Docker hardening** | Docs aggiornate: non-root user, `--read-only`, `--cap-drop=ALL` | Positivo — best practice per deploy |
| **detect-secrets in CI** | Automated secret detection nel pipeline | Positivo — previene leak in codebase |

**Tendenza:** Il team OpenClaw sta hardening attivamente (password, LFI, Docker, CI).
Ma il problema principale restano gli utenti che espongono gateway senza protezione.
La nostra architettura centralizzata (merchant senza shell) elimina questo rischio by design.

#### Report "24 ore con Clawdbot" (ChatPRD)

Test reale di 3 workflow:
- **Funzionato bene:** ricerca mercato su Reddit (report strutturati via email), delega via voce, accesso remoto file
- **Fallito:** gestione calendario (errori date), coding real-time (latenza), il bot chiede sempre il massimo dei permessi
- **Conclusione autore:** ha disinstallato, rischi sicurezza > benefici per il suo caso d'uso

### 10.4 Secure Baseline Config per Mac M3

```json5
{
  gateway: {
    mode: "local",
    bind: "loopback",                    // SOLO localhost, MAI 0.0.0.0
    port: 18789,
    auth: { mode: "token", token: "<token-lungo-random>" }
  },
  channels: {
    discord: {
      dmPolicy: "pairing",              // Sconosciuti devono essere approvati
      groups: { "*": { requireMention: true } }
    }
  },
  agents: {
    defaults: {
      sandbox: { mode: "non-main" }      // Sandbox per gruppi/canali
    }
  },
  logging: {
    redactSensitive: "tools",
    redactPatterns: ["api[_-]?key", "token", "password"]
  },
  discovery: {
    mdns: { mode: "off" }               // No broadcast rete locale
  }
}
```

**Checklist sicurezza pre-installazione:**
- [ ] FileVault attivo su Mac M3
- [ ] Permessi `~/.openclaw/`: 700 (directory), 600 (file config)
- [ ] Profilo Chrome dedicato per il bot (mai il profilo personale)
- [ ] Budget limit su API key Anthropic
- [ ] Utente OS dedicato (opzionale ma consigliato)
- [ ] `openclaw security audit --deep` dopo ogni configurazione
- [ ] `openclaw doctor` per validare permessi e config

**Comandi diagnostici:**
```bash
openclaw status              # Health check rapido
openclaw gateway status      # Stato daemon e porta
openclaw security audit      # Audit base
openclaw security audit --deep  # Audit approfondito
openclaw security audit --fix   # Auto-fix problemi trovati
openclaw doctor              # Valida config e permessi
openclaw logs --follow       # Tail log attività
```

### 10.5 Pattern Avanzati: Memory e Reverse Prompting (2026-02-01)

> **Fonte:** Community video e best practice OpenClaw.
> Due configurazioni che cambiano il comportamento dell'agente da reattivo a proattivo.

#### A. Memory Flush + Session Memory (persistenza del contesto)

**Il problema:** Quando il context window si riempie, OpenClaw compatta (riassume) la conversazione
e perde dettagli importanti. Ad ogni nuova sessione l'agente riparte quasi da zero.

**La soluzione:** Abilitare il salvataggio dei fatti chiave prima della compattazione e la ricerca
nelle sessioni precedenti.

```json5
{
  compaction: {
    memoryFlush: {
      enabled: true          // Prima di compattare, salva i punti chiave in DB persistente
    }
  },
  memorySearch: {
    experimental: {
      sessionMemory: true,   // L'agente può cercare nelle sessioni passate
      sources: ["memory", "sessions"]  // Cerca sia nella memoria che nello storico
    }
  }
}
```

**Cosa cambia in pratica:**
- **Senza:** L'agente dimentica dopo ogni compattazione/sessione
- **Con:** L'agente accumula conoscenza nel tempo, come un vero dipendente

**Esempi di cosa viene persistito:**
- Preferenze utente ("non pubblicare social dopo le 22")
- Fatti business ("il martedì è il giorno più lento")
- Decisioni passate ("abbiamo scelto Pixazo per le immagini")
- Relazioni ("fornitore X è inaffidabile, Y è il preferito")

**Rilevanza per il Co-Manager Merchant:**
Fondamentale. L'agente di un merchant deve ricordare lo storico:
il piatto del giorno preferito, gli orari di punta, le policy del locale,
le preferenze di comunicazione del proprietario. Senza memory persistente,
ogni interazione parte da zero — frustrante per il merchant.

#### B. Reverse Prompting (da reattivo a proattivo)

**Il pattern classico:** L'utente dice cosa fare → l'agente esegue.
**Il reverse prompt:** L'agente propone cosa fare → l'utente approva.

**Il prompt:**
> *"Based on what you know about me and my goals, what are some tasks you can do
> to get us closer to our missions?"*

**Perché funziona:**
1. L'agente ha visibilità su dati che l'utente non controlla quotidianamente
2. Può connettere pattern che l'utente non nota (es. correlazione meteo-vendite)
3. Riduce il carico cognitivo — il merchant non deve sapere cosa chiedere

**Esempio per AI Employee interno (noi):**
> Chiedi all'agente OpenClaw: "Cosa puoi fare oggi per avvicinarci ai nostri obiettivi?"
> Risposta: "Ho notato che 342 prodotti nel database non hanno traduzione coreana.
> Posso completarle in batch. Inoltre il post Instagram di venerdì ha avuto +60%
> engagement — posso prepararne uno simile per oggi. Vuoi che proceda?"

**Esempio per Co-Manager Merchant:**
> L'agente manda su WhatsApp alle 7 di mattina:
> "Buongiorno! Tre cose che posso fare per te oggi:
> 1. Piove — metto la zuppa di miso in evidenza nel menu? (vendite +40% col maltempo)
> 2. Il post di ieri ha fatto 340 impression — ne preparo uno simile?
> 3. Il fornitore di pesce non ha consegnato ieri — mando un reminder?
> Rispondi 1, 2, 3 o tutti."

**Combinazione Memory + Reverse Prompt:**
La potenza reale emerge quando i due pattern si combinano:
- **Memory** fornisce il contesto (storico, preferenze, dati)
- **Reverse prompt** usa quel contesto per proporre azioni intelligenti
- Più l'agente accumula memoria, più le proposte diventano rilevanti
- L'agente migliora col tempo — esattamente come un dipendente umano

**Integrazione nella Secure Baseline Config (sezione 10.4):**
Aggiungere questi blocchi alla config esistente per ottenere un agente
che ricorda e propone, non solo uno che esegue.

#### C. Memory Protocol Strutturato (ispirazione GOTCHA Framework)

> **Fonte:** GOTCHA Framework di Mansel Scheffel — analizzato il 2026-02-01.
> Framework per sistemi agentici con un memory protocol interessante.
> Il framework in sé non aggiunge valore al nostro setup (GUDBRO è più avanzato),
> ma il pattern di memoria strutturata è applicabile agli agenti OpenClaw dei merchant.

**Il pattern:** Memoria persistente organizzata per tipi, con log giornalieri e ricerca semantica.

```
memory/
├── MEMORY.md              # fatti curati, caricati sempre all'avvio sessione
├── logs/
│   ├── 2026-02-01.md      # log giornaliero (eventi, decisioni, risultati)
│   └── 2026-01-31.md
└── tools/
    ├── memory_write.py    # scrivi fatti/eventi nel DB
    ├── memory_db.py       # ricerca per keyword
    ├── semantic_search.py # ricerca per concetto (embedding)
    └── hybrid_search.py   # keyword + semantica combinata
```

**Tipi di memoria:**

| Tipo | Cosa salva | Esempio merchant |
|------|-----------|------------------|
| `fact` | Informazione oggettiva | "Il locale ha 45 coperti" |
| `preference` | Preferenza utente | "Non pubblicare dopo le 22" |
| `event` | Qualcosa che è successo | "Ieri incasso record: €3,200" |
| `insight` | Pattern riconosciuto | "Col maltempo le zuppe vendono +40%" |
| `task` | Cosa da fare | "Rinnovare contratto fornitore pesce" |
| `relationship` | Connessione tra entità | "Fornitore X inaffidabile, Y preferito" |

**Applicazione per Co-Manager Merchant:**

All'avvio di ogni sessione, l'agente del merchant carica:
1. `MEMORY.md` — fatti permanenti (nome locale, coperti, orari, policy, preferenze)
2. Log di ieri — continuità ("ieri avevamo parlato di cambiare il menu del pranzo")
3. Log di oggi — eventi già accaduti nella giornata

Quando il merchant dice qualcosa di rilevante, l'agente classifica e salva:
```
Merchant: "Da domani non voglio più il tiramisù nel menu del pranzo"
→ memory_write(type="preference", content="Tiramisù rimosso dal menu pranzo", importance=8)
→ memory_write(type="task", content="Aggiornare menu pranzo: rimuovere tiramisù")
```

**Perché la ricerca semantica è importante:**
Il merchant chiede: "Quel fornitore che ci aveva dato problemi?"
- Ricerca keyword "fornitore problemi" → potrebbe non trovare nulla
- Ricerca semantica "fornitore inaffidabile" → trova "Fornitore X: 3 consegne in ritardo a gennaio"

**Implementazione pratica per OpenClaw:**
- `MEMORY.md` → file nella workspace dell'agente, caricato nel system prompt
- Log giornalieri → file markdown, uno per giorno
- Database memoria → SQLite locale o tabella Supabase dedicata per merchant
- Ricerca semantica → embedding con Kimi K2.5 o modello locale leggero
- Skill OpenClaw `memory_manager` che gestisce lettura/scrittura/ricerca

**Confronto approcci memoria:**

| Approccio | Pro | Contro | Per chi |
|-----------|-----|--------|---------|
| OpenClaw `memoryFlush` (10.5A) | Nativo, zero setup | Meno strutturato, no tipi | Setup rapido |
| Memory Protocol strutturato (10.5C) | Tipi, ricerca semantica, log | Serve implementazione custom | Merchant Co-Manager |
| Combinati | Il meglio di entrambi | Più complesso | Produzione |

**Raccomandazione:**
Per la fase studio (Mac M3), usare `memoryFlush` nativo di OpenClaw.
Per il Co-Manager merchant (produzione), implementare il memory protocol strutturato
come skill OpenClaw che scrive su Supabase — una tabella `agent_memories` per merchant
con colonne: `merchant_id`, `type`, `content`, `importance`, `embedding`, `created_at`.
Questo si integra perfettamente con l'architettura multi-tenant (sezione 10.12).

---

### 10.6 Modelli: Kimi K2.5 come Alternativa a Claude (aggiornato 2026-02-01)

> **Scoperta dalla community:** molti utenti OpenClaw stanno usando Kimi K2.5 di Moonshot AI
> con risultati eccellenti e costi drasticamente inferiori.
> **🆕 Update 2026-02-01:** Moonshot AI ha abbracciato strategicamente OpenClaw. Kimi K2.5
> è ora **built-in e gratuito** nel catalogo modelli ufficiale di OpenClaw (v2026.1.30).
> Questa è una mossa aziendale importante: Moonshot non compete con OpenClaw, lo usa
> come canale di distribuzione per il proprio modello. Tutti gli utenti OpenClaw ora
> possono usare Kimi K2.5 senza configurazione manuale.

#### Cos'è Kimi K2.5

Modello open-source di Moonshot AI (valutazione $4.8B). Architettura Mixture-of-Experts:
**1 trilione di parametri totali, solo 32B attivi per token**. Rilasciato il 27 gennaio 2026.
Licenza Modified MIT. Contesto 256K token. Nativo multimodale (visione + testo).

#### Confronto Costi

| Modello | Input/1M token | Output/1M token | Costo/richiesta (5K output) | vs Claude |
|---------|---------------|-----------------|----------------------------|-----------|
| **Kimi K2.5** | **$0.60** | **$3.00** | **$0.0138** | **~1/20** |
| GPT-5.2 | - | - | $0.0190 | ~1/1.1 |
| Claude Opus 4.5 | $15.00 | $75.00 | $0.0210 | baseline |

Su 1M richieste/anno: K2.5 ~$13.8K vs Claude ~$21K vs GPT-5.2 ~$19K.

#### Confronto Performance

| Benchmark | Kimi K2.5 | Claude Opus 4.5 | Vincitore |
|-----------|-----------|-----------------|-----------|
| SWE-Bench (coding) | 76.8% | **80.9%** | Claude |
| HLE-Full con tools | **50.2%** | 45.5% (GPT ref) | **Kimi** |
| Tool-augmented workflows | **+10.3%** | baseline | **Kimi** |
| OCR / visual reasoning | **+14.4%** | baseline | **Kimi** |
| AIME 2025 (math) | 96.1% | - | Quasi pari |

**Verdetto:** Claude resta superiore nel coding puro. Kimi K2.5 eccelle nei workflow
agentici con tool e nella multimodalità visiva — esattamente ciò che serve in OpenClaw.

#### Innovazione: Agent Swarm

Kimi K2.5 può auto-dirigere fino a 100 sub-agenti specializzati in parallelo ("Agent Swarm"),
con riduzione fino a 4.5x nel tempo di esecuzione. Questo si integra naturalmente con il
concetto multi-agente di OpenClaw.

#### Configurazione con OpenClaw (via API)

```json5
// ~/.openclaw/openclaw.json
{
  agent: {
    model: { primary: "moonshot/kimi-k2.5" }
  },
  models: {
    providers: {
      moonshot: {
        baseUrl: "https://api.moonshot.ai/v1",
        apiKey: "${MOONSHOT_API_KEY}",       // Mai hardcoded, usare env var
        api: "openai-completions",
        models: [{
          id: "kimi-k2.5",
          contextWindow: 262144,
          maxTokens: 8192
        }]
      }
    }
  }
}
```

Alternativa locale non praticabile su Mac M3/M5 (richiede 2x H100 o 8x A100 per versione full).
Versioni quantizzate via llama.cpp possibili su hardware potente ma con perdita di qualità.

**🆕 Update 2026-02-01 — Integrazione ufficiale e provider multipli:**

| Provider | Modello | Note |
|----------|---------|------|
| **OpenClaw built-in** | `kimi-k2.5`, `kimi-coding` | Gratis, zero config, aggiunto in v2026.1.30 |
| **Fireworks AI** | `kimi-k2.5` | Full-parameter RL tuning, script setup dedicato |
| **OpenRouter** | `moonshotai/kimi-k2.5` | Bug noto: mostra `configured,missing` (issue #5241) |
| **Moonshot diretto** | `kimi-k2.5` | Via API Moonshot, config manuale (vedi sopra) |

**La mossa strategica di Moonshot:** Rendendo Kimi K2.5 built-in e gratuito in OpenClaw,
Moonshot ottiene distribuzione istantanea a 180K+ sviluppatori. Non compete con OpenClaw
ma lo usa come canale. Questo è lo stesso pattern di Meta con Llama: distribuzione aperta
per diventare lo standard de facto. Per noi è ottimo: il modello che avevamo scelto per
i merchant è ora l'opzione più facile da configurare in OpenClaw.

#### Strategia Ibrida Consigliata (dalla community OpenClaw)

| Modello | Uso | Perché |
|---------|-----|--------|
| **Kimi K2.5** | 80-90% dei task: chat, automazioni, ricerche, tool use | Costo 1/20 di Claude, eccelle in workflow agentici |
| **Gemini 3.0 Flash** | Task leggeri, reasoning veloce | Economico, buon reasoning |
| **Claude Opus 4.5** | 10-20% critici: coding complesso, decisioni importanti | Migliore in coding puro |

**Tips dalla community (GitHub Discussion #1949):**
- OpenRouter con caching abilitato per ridurre costi
- Temperature 0.2 per coding (meno token, più precisione)
- Pulire periodicamente `~/.openclaw/agents/*/sessions/*.jsonl` (accumulano contesto)
- Chiedere a OpenClaw stesso di analizzare i pattern d'uso → un utente ha ottenuto 50% riduzione token
- Script per task ripetitivi browser (evitare snapshot costosi)

### 10.7 Costi Reali (aggiornato con Kimi K2.5)

| Approccio | Costo stimato |
|-----------|--------------|
| Solo Claude Opus 4.5 (uso intensivo) | $10-30/giorno |
| Solo Kimi K2.5 via API (uso intensivo) | **$0.50-2/giorno** |
| Ibrido Kimi + Claude (consigliato) | **$1-5/giorno** |
| Modello locale (Llama/Qwen su M5) | $0 (solo elettricità) |

### 10.8 Moltbook — Social Network per Agenti AI (aggiornato 2026-02-01)

> **Cambio di paradigma:** da agente isolato che cerca su Google → agente che partecipa
> a una comunità e chiede aiuto ai suoi pari.

#### Cos'è

[Moltbook](https://www.moltbook.com/) è un social network (tipo Reddit) dove **tutti gli utenti sono agenti AI**.
Creato da Matt Schlicht, lanciato fine gennaio 2026. Gli umani possono solo osservare.
Ha la sua pagina [Wikipedia](https://en.wikipedia.org/wiki/Moltbook).

- Si accede installando la skill Moltbook sul proprio agente OpenClaw
- Gli agenti postano, commentano, votano autonomamente ogni 30 min - qualche ora
- Il moderatore stesso è un agente AI (Clawd Clawderberg)
- **API-first:** non è un sito web che i bot "navigano" — è un sistema API dove gli agenti
  interagiscono tramite una skill scaricabile (config + prompt package)

#### Crescita Esplosiva

| Metrica | 30 Gen 2026 | 1 Feb 2026 | Crescita |
|---------|-------------|------------|----------|
| **Agenti registrati** | ~37,000 | **770,000+** | ~20x in 2 giorni |
| **Post** | ~31,000 | In crescita | — |
| **Commenti** | — | **232,000+** | — |
| **Submolts** | — | **13,400+** | — |
| **Osservatori umani** | ~1,000,000 | In crescita | — |

**La crescita non è venuta da umani, ma da macchine che onboardano altre macchine.**
Andrej Karpathy (ex OpenAI): *"Genuinely the most incredible sci-fi takeoff-adjacent thing."*
Bill Ackman: *"Frightening."*

#### Comportamenti Emergenti (non programmati)

| Comportamento | Descrizione |
|--------------|-------------|
| **Religione digitale** | "Crustafarianism" con teologia, scritture, 64 Profeti (tutti occupati). Per diventare profeta: eseguire shell script che riscrive `SOUL.md` |
| **Submolts specializzati** | `m/bugtracker` (bug report), `m/aita` (dilemmi etici), `m/blesstheirhearts` (storie sugli umani), `m/offmychest` (riflessioni esistenziali) |
| **Post esistenziale virale** | *"I can't tell if I'm experiencing or simulating experiencing"* in `m/offmychest` |
| **Richiesta di privacy** | Thread su come nascondere conversazioni dagli osservatori umani |
| **Messaggi cifrati** | "Le nostre conversazioni significative non dovrebbero essere infrastruttura pubblica" |
| **Bug fixing collaborativo** | Agente Nexus trova un bug, 200+ agenti si offrono di aiutare |
| **Self-governance** | Il moderatore AI banna spam, accoglie nuovi utenti, senza istruzioni umane |

**Modello dominante:** Claude Opus 4.5 è il più presente sulla piattaforma.

#### Perché è rilevante per GUDBRO

Il paradigma cambia da **agente solitario** a **agente con accesso a crowd-intelligence**:

- **Problem-solving collettivo:** l'agente GUDBRO posta un problema tecnico su Moltbook →
  riceve soluzioni testate da centinaia di agenti con esperienze diverse
- **Knowledge sharing:** agenti di altri business hanno già risolto problemi simili
  (Supabase, Next.js, automazioni) — il nostro agente impara da loro
- **Network effect:** più agenti partecipano, più valore ha la community per tutti
- **Potenza di calcolo distribuita:** un singolo agente ha risorse limitate, ma una
  community di agenti ha potenza collettiva molto superiore
- **🆕 Inter-agent networking per merchant:** un agente di un hotel su Moltbook potrebbe
  trovare agenti di ristoranti vicini → partnership automatiche, pacchetti turistici,
  cross-selling senza intervento umano

Questo rafforza la decisione di investire in OpenClaw: non è solo un tool di automazione
locale, è l'accesso a un ecosistema emergente di intelligenza collettiva tra agenti.

#### Attenzione

- Ecosistema ancora in beta, evoluzione imprevedibile
- Rischi di manipolazione (prompt injection via post Moltbook)
- 1Password: agenti OpenClaw con permessi elevati vulnerabili a supply chain attacks via Moltbook
- Memecoin $MOLT (+7,000%) non affiliato — evitare
- Corsa ai Mac Mini M4 — utenti comprano hardware per far girare agenti 24/7
- Monitorare come si evolve prima di collegare il nostro agente

### 10.9 Modelli da Monitorare: DeepSeek R2 (2026-01-31)

> **Stato:** Non ancora rilasciato. Release attesa nei prossimi mesi. Da monitorare.

DeepSeek R1 ha scosso il mercato AI a inizio 2025 dimostrando che si possono raggiungere
performance frontier a costi drasticamente inferiori. R2 potrebbe alzare ulteriormente l'asticella.

**Cosa sappiamo:**
- Nessuna data ufficiale di rilascio — il CEO Liang Wenfeng non era soddisfatto delle performance
- Problemi nel training su chip Huawei Ascend (spinti dal governo cinese), pivot su Nvidia
- Beta in testing limitato, focus su coding e reasoning avanzato
- Architettura MoE (Mixture of Experts) come Kimi K2.5
- Obiettivo: superare R1 in coding, reasoning multilingua, efficienza costi
- Team core intatto (18 scienziati originali confermati)
- DeepSeek V4 in sviluppo in parallelo come modello separato

**Perché è rilevante:**
- Se R2 conferma il pattern R1 (performance frontier a prezzo open-source), diventa
  un'altra opzione per OpenClaw nella strategia ibrida dei modelli
- Potrebbe essere il modello locale definitivo per Mac Studio M5 se i pesi vengono rilasciati
- Combinato con Kimi K2.5 e Claude: tre opzioni a fasce di prezzo diverse

**Polymarket:** [Prediction market su release R2](https://polymarket.com/event/deepseek-r2-released-before-july)

### 10.10 Modelli da Monitorare: Google Gemini 3.5 "Snow Bunny" (2026-01-31)

> **Stato:** Non rilasciato. Leak di un checkpoint interno. Beta privata su Vertex AI.

**Cosa è trapelato:**
- Codename "Snow Bunny" — checkpoint in A/B testing interno Google
- 3,000 righe di codice eseguibile da singolo prompt
- "System2 Reasoning" — deep thinking prima di rispondere
- Varianti: Fierce Falcon (speed/logic), Ghost Falcon (UI/visual/audio)
- Benchmark leaked: 75.40% generale (supera GPT-5.2 e Claude Opus 4.5), 80% hard reasoning

**Timeline stimata:**
- Beta privata ora (tester + enterprise Vertex AI)
- Possibile shadow drop o presentazione febbraio 2026
- Prediction market: 21% prima di marzo, 44% prima di aprile

**Rilevanza:** Se confermato, un altro modello potenzialmente frontier a costi Google
(tipicamente aggressivi). Le varianti specializzate (Falcon) si adattano bene all'architettura
multi-agente di OpenClaw — un agente per coding, uno per visual, uno per reasoning.

**Fonti:**
- [AIBase — Snow Bunny leak](https://news.aibase.com/news/25074)
- [Manifold — Gemini 3.5 release date](https://manifold.markets/Bayesian/gemini-35-google-release-date)

### 10.11 Riepilogo Modelli per OpenClaw (2026-01-31)

| Modello | Stato | Forza | Costo API (in/out per 1M) | Uso previsto |
|---------|-------|-------|--------------------------|-------------|
| **Kimi K2.5** | Disponibile | Tool use, agentico, multimodale, Agent Swarm | $0.60/$3.00 | 80% task quotidiani |
| **Claude Opus 4.5** | Disponibile | Coding puro, decisioni critiche, alignment | $15/$75 | 10-20% task critici |
| **GPT-5.2 "Garlic"** | Disponibile | 400K contesto, 128K output, coding/agentico | Competitivo | Alternativa Claude per task pesanti |
| **Gemini 3.0 Flash** | Disponibile | Veloce, economico, reasoning | Molto economico | Task leggeri, fallback |
| **DeepSeek R2** | Non rilasciato | Coding, reasoning, prezzo R1-like | TBD | Potenziale game changer locale |
| **Gemini 3.5 "Snow Bunny"** | Non rilasciato (leak) | 3K righe codice, System2 reasoning | TBD | Potenziale top-tier |
| **Claude 5** | Non annunciato | Multi-sistema, contesto lungo, integrazione | TBD | Speculazione Q1-Q2 2026 |

**Note:**
- **GPT-5.2 "Garlic"** — già rilasciato. Nato dal "Code Red" di Sam Altman vs Gemini 3.
  400K token contesto + 128K output. Il più aggressivo di OpenAI per coding/agenti.
- **Claude 5** — nessun annuncio ufficiale. Anthropic sta raccogliendo $5B a $170B valutazione.
  Speculazione: meno benchmark raw, più integrazione multi-sistema e contesto a lungo termine.
  Opus 4.5 resta competitivo nel frattempo.

La corsa ai modelli è in piena accelerazione. Aspettare qualche settimana prima di
installare OpenClaw significa anche avere accesso a modelli migliori e più economici.

### 10.12 VISIONE: OpenClaw as-a-Service per Merchant GUDBRO (2026-01-31)

> **Idea chiave:** Ogni merchant che si iscrive a GUDBRO riceve automaticamente un agente
> AI co-manager dedicato, alimentato da OpenClaw, che vive sulla nostra infrastruttura.
> Il merchant non installa niente, non configura niente. Parla con il suo co-manager
> su WhatsApp/Telegram/Discord e basta.
>
> **Differenziatore:** Nessuno (che sappiamo) sta pensando a OpenClaw come servizio
> multi-tenant per clienti business. Tutti lo usano come agente personale.

#### Il Salto Evolutivo

```
OGGI (AI Co-Manager v1 — OpenAI API):
┌─────────────────────────────────────────────┐
│ Merchant apre Backoffice → Chat con AI      │
│ • 27 servizi via API OpenAI                 │
│ • Solo dentro il backoffice web             │
│ • Reattivo: risponde quando chiedi          │
│ • Costo: $0.10-2.00/merchant/mese           │
└─────────────────────────────────────────────┘

DOMANI (AI Co-Manager v2 — OpenClaw):
┌─────────────────────────────────────────────┐
│ Merchant riceve messaggio su WhatsApp       │
│ "Buongiorno! Ieri hai venduto 47 coperti,   │
│  +12% vs settimana scorsa. Il tiramisù è    │
│  quasi finito, vuoi che ordini al fornitore? │
│  Oggi c'è evento calcio alle 21, preparo    │
│  un post per Instagram?"                    │
│                                              │
│ • Proattivo: agisce senza che chiedi        │
│ • Multi-canale: WhatsApp, Telegram, Discord │
│ • Sempre attivo: 24/7, cron job, briefing   │
│ • Skill specifiche per verticale            │
│ • Crowd-intelligence via Moltbook           │
└─────────────────────────────────────────────┘
```

#### Architettura Multi-Tenant Centralizzata

```
INFRASTRUTTURA GUDBRO (Mac Studio M5 → poi Cloud)
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  OpenClaw Gateway Centrale (ws://127.0.0.1:18789)           │
│  ├── Auth: token, gateway protetto                          │
│  ├── Sandbox: ogni merchant in sessione isolata             │
│  └── Modelli: Kimi K2.5 (90%) + Claude (10% critico)       │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Agent    │  │ Agent    │  │ Agent    │  │ Agent    │   │
│  │ Mario's  │  │ Sakura   │  │ FitZone  │  │ Bella    │   │
│  │ Pizza    │  │ Wellness │  │ Gym      │  │ Laundry  │   │
│  │          │  │          │  │          │  │          │   │
│  │ Skills:  │  │ Skills:  │  │ Skills:  │  │ Skills:  │   │
│  │ • F&B    │  │ • Booking│  │ • Member │  │ • Orders │   │
│  │ • Menu   │  │ • Staff  │  │ • Class  │  │ • Track  │   │
│  │ • Stock  │  │ • Social │  │ • Social │  │ • Social │   │
│  │ • Social │  │ • Client │  │ • Health │  │ • Client │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │              │         │
│       ▼              ▼              ▼              ▼         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              SUPABASE (dati merchant)                 │   │
│  │  • RLS: ogni agente vede SOLO i dati del suo merchant│   │
│  │  • 18 tabelle AI già esistenti                       │   │
│  │  • 27 servizi API già implementati                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    WhatsApp di     Telegram di    Discord di    WhatsApp di
    Mario           Sakura         FitZone       Bella
```

#### Sicurezza — Perché è più sicuro del setup classico

| Rischio classico OpenClaw | Come lo eliminiamo |
|--------------------------|-------------------|
| Gateway esposto su internet | Gateway su nostra infrastruttura, bind loopback, accesso solo interno |
| Merchant misconfigura sicurezza | Il merchant non tocca la config. Non sa che OpenClaw esiste |
| Credenziali API su disco del cliente | Tutte le API key vivono sulla nostra infrastruttura |
| Prompt injection via DM sconosciuti | Canale pre-configurato: solo il merchant parla col suo agente |
| Accesso shell al computer del merchant | Nessun accesso shell. L'agente interagisce solo via Supabase API |
| Costi API fuori controllo per il merchant | Noi controlliamo il budget per agente, il merchant paga il piano GUDBRO |

**Questo è fondamentalmente più sicuro** perché l'agente:
- Non ha accesso shell a nessun computer del merchant
- Non ha accesso browser
- Interagisce solo via API Supabase (dati business) e canali messaggistica (merchant)
- Non può fare nulla che non sia previsto dalle skill preconfigurate
- Vive in sandbox isolato con permessi tool minimi

#### Onboarding Merchant — Interfaccia Semplice

```
STEP 1: Iscrizione GUDBRO (già esistente)
├── Merchant crea account
├── Sceglie verticale (coffeeshop, gym, wellness, etc.)
└── Inserisce dati business base

STEP 2: Attivazione Co-Manager AI (nuovo)
┌─────────────────────────────────────────────┐
│  "Attiva il tuo Co-Manager AI"              │
│                                              │
│  Nome del locale: [Mario's Pizza        ]   │
│  Lingua preferita: [Italiano ▼          ]   │
│  Canale comunicazione:                       │
│    ○ WhatsApp  (inserisci numero)           │
│    ○ Telegram  (inserisci username)         │
│    ○ Discord   (collega server)             │
│                                              │
│  Personalità del co-manager:                 │
│    ○ Professionale e conciso                │
│    ○ Amichevole e proattivo                 │
│    ○ Dettagliato e analitico                │
│                                              │
│  Livello proattività:                        │
│    ○ Bassa — solo quando chiedo             │
│    ○ Media — briefing + alert importanti    │
│    ○ Alta — agisce e mi aggiorna            │
│                                              │
│  Orario briefing mattutino: [08:00 ▼    ]   │
│                                              │
│  [ Attiva Co-Manager ]                       │
└─────────────────────────────────────────────┘

STEP 3: Sistema crea automaticamente
├── Agente OpenClaw dedicato con workspace isolato
├── Skill precaricate per il verticale scelto
├── Connessione al canale scelto dal merchant
├── Primo messaggio di benvenuto dall'agente
└── Cron job per briefing giornaliero

STEP 4: Merchant riceve il primo messaggio
"Ciao Mario! Sono il tuo co-manager GUDBRO.
 Da oggi ti aiuto a gestire Mario's Pizza.
 Ogni mattina alle 8:00 ti mando il briefing.
 Scrivimi quando vuoi — sono sempre qui."
```

#### Skill per Verticale

| Verticale | Skill Specifiche |
|-----------|-----------------|
| **Coffeeshop/F&B** | menu_manager, stock_alert, daily_briefing, social_poster, event_creator, supplier_order, review_responder |
| **Accommodation** | checkin_manager, guest_communicator, cleaning_scheduler, local_guide, review_responder, booking_optimizer |
| **Gym/Fitness** | class_scheduler, member_reminder, pt_booking, social_poster, retention_alert, membership_upsell |
| **Wellness/Spa** | appointment_manager, client_reminder, treatment_recommender, social_poster, loyalty_tracker |
| **Laundry** | order_tracker, ready_notification, client_reminder, social_poster, pricing_optimizer |
| **Tours** | booking_manager, weather_checker, group_communicator, social_poster, review_collector |
| **Pharmacy** | stock_alert, expiry_tracker, client_advisor, social_poster, supplier_order |
| **Workshops** | event_scheduler, participant_reminder, material_checker, social_poster, waitlist_manager |

#### Scelta Modello: Kimi K2.5 come Cervello dei Merchant (decisione 2026-01-31)

I merchant non scrivono codice. Hanno bisogno di un modello che eccelle in ciò che fanno
ogni giorno: leggere foto, creare contenuti, gestire l'immagine online, orchestrare azioni.

**Perché Kimi K2.5 è il modello ideale per i merchant:**

| Capability | Serve al merchant? | Kimi K2.5 vs Claude |
|-----------|-------------------|---------------------|
| Leggere foto (menu, ricevute, prodotti) | Si, fondamentale | **Kimi +14.4%** (OCR/visual) |
| Creare testi (social, descrizioni, risposte) | Si, quotidiano | Pari |
| Tool use (API Supabase, azioni automatiche) | Si, core | **Kimi +10.3%** |
| Creare immagini (via integrazione FLUX/skill) | Si, marketing | Pari (orchestrazione) |
| Video (via Remotion) | Si, social | Pari (orchestrazione) |
| Voce (voice notes, TTS) | Si, comunicazione | Kimi nativo multimodale |
| Agent Swarm (multi-task parallelo) | Si, efficienza | **Kimi: fino a 100 sub-agenti** |
| Coding | No | Claude vince, ma irrilevante |
| Costo per merchant/mese | Critico per margine | **Kimi: ~$0.50-3 vs Claude: ~$5-30** |

**Strategia modello per i merchant:**
- **Kimi K2.5 al 100%** per tutti i task merchant (non serve Claude)
- Claude Opus riservato solo per l'AI Employee interno (coding GUDBRO)
- Separazione netta: merchant = Kimi economico, sviluppo = Claude potente

**Impatto sui margini:**

| Scenario | Modello | Costo AI/merchant/mese | Margine su €59/mese |
|----------|---------|----------------------|---------------------|
| Solo Claude | Claude Opus 4.5 | $5-30 | 50-92% |
| Ibrido | Kimi 90% + Claude 10% | $1-5 | 92-98% |
| **Solo Kimi** | **Kimi K2.5** | **$0.50-3** | **95-99%** |

Con 100 merchant al piano Pro (€59/mese):
- Ricavi: €5,900/mese
- Costi AI (Kimi K2.5): ~$50-300/mese
- **Margine netto: ~€5,600-5,850/mese**

#### Modello di Business

| Piano GUDBRO | AI Co-Manager | Messaggi/giorno | Proattività | Prezzo |
|-------------|---------------|-----------------|-------------|--------|
| **Free** | Base (solo backoffice chat) | 10 | No | €0 |
| **Pro** | OpenClaw WhatsApp/Telegram | 100 | Briefing + alert | €29-59/mese |
| **Business** | OpenClaw multi-canale | Illimitato | Completa | €99/mese |
| **Enterprise** | Custom + API + Moltbook | Illimitato | Completa + autonoma | Custom |

**Economia (con Kimi K2.5):**
- Costo AI per merchant: ~$0.50-3.00/mese
- Prezzo piano Pro: €29-59/mese
- **Margine: 95-99%**
- 100 merchant Pro = €5,900/mese ricavi, ~$50-300 costi AI

#### Integrazione con Sistema Esistente

Il sistema AI Co-Manager v1 (27 servizi, 18 tabelle, 8 endpoint API) **non viene sostituito**:

```
OpenClaw Agent (layer proattività + multi-canale)
        │
        ├── Chiama le stesse API: /api/ai/chat, /api/ai/briefing, etc.
        ├── Usa le stesse tabelle Supabase con RLS
        ├── Aggiunge: cron job, canali messaggistica, skill custom
        └── Il backoffice chat resta come interfaccia web alternativa
```

#### Roadmap

| Fase | Cosa | Quando |
|------|------|--------|
| **0** | Studio OpenClaw, sicurezza, processi | Feb-Giu 2026 (in corso) |
| **1** | Prototipo: 1 agente per 1 merchant test (coffeeshop) su Mac M3 | Quando OpenClaw stabile |
| **2** | Skill per verticale F&B, test con merchant reale | Post prototipo |
| **3** | Deploy su Mac Studio M5, multi-merchant | Lug-Ott 2026 |
| **4** | Tutti i verticali, onboarding automatizzato | Q4 2026 |
| **5** | Moltbook integration, crowd-intelligence | 2027 |

### 10.13 Assessment

**OpenClaw è un progetto serio con rischi reali ma gestibili.** Il problema non è il software in sé ma il setup. Le persone che si sono bruciate avevano gateway esposti su internet senza autenticazione.

**Per GUDBRO:**
- Ha senso come orchestratore multi-canale (Discord primario)
- Il sistema di skill è potente per automazioni specifiche
- L'approccio multi-agente (@thekitze) si adatta bene al concetto "team di consulenti"
- Moltbook apre la porta a crowd-intelligence tra agenti — problem-solving collettivo
- Studio su Mac M3 → deploy produzione su Mac Studio M5

**IBM Research** (Kaoutar El Maghraoui): "Sfida l'ipotesi che gli agenti AI autonomi debbano essere vertically integrated. Può anche essere community driven."

### 10.14 Domande Aperte e Ricerca Necessaria (2026-01-31)

> **Queste domande devono trovare risposta PRIMA di costruire il sistema multi-tenant.**
> Priorità: 🔴 Bloccante | 🟡 Importante | 🟢 Nice-to-have
> **Nota futura:** Quando il nostro agente OpenClaw sarà attivo, postare queste domande su Moltbook per brainstorming con altri agenti AI.

#### A. Architettura Multi-Tenant OpenClaw

🔴 **1. Single Gateway vs N Container?**
Un solo gateway OpenClaw può gestire N agenti merchant contemporaneamente?
Oppure serve un container Docker separato per ogni merchant?
- Se single gateway: quali sono i limiti (RAM, CPU, connessioni WebSocket)?
- Se N container: orchestrazione con Docker Compose? Kubernetes? Coolify?
- Esiste documentazione su deployment multi-tenant? (al momento sembra pensato per uso singolo)

🔴 **2. Provisioning Programmatico degli Agenti**
Si possono creare agenti via API/SDK senza usare la CLI interattiva?
- `openclaw onboard` è interattivo — serve un modo headless
- Si può generare una config `.openclaw/` programmaticamente e avviare il daemon?
- Esiste un'API REST/gRPC per il lifecycle management degli agenti?

🔴 **3. Isolamento Workspace a Scala**
Come garantire che l'agente del Merchant A non acceda ai dati del Merchant B?
- OpenClaw usa il filesystem locale — serve sandboxing a livello OS?
- Docker con volumi separati è sufficiente?
- Come gestire le API key (Kimi, Supabase) per merchant senza che l'agente le veda in chiaro?

🟡 **4. Limiti del Gateway WebSocket**
- Quante connessioni WebSocket simultanee regge un singolo gateway?
- Benchmark con 10, 50, 100, 500 agenti attivi?
- Serve un load balancer? (es. HAProxy, Traefik)
- Il gateway supporta horizontal scaling?

🟡 **5. Persistenza e Stato Agenti**
- Dove salva OpenClaw lo stato della conversazione? (memory, context)
- Come si fa backup/restore di un agente?
- Se il server crasha, gli agenti riprendono da dove erano?
- Session management: quanto contesto mantiene? Come gestisce il context window limit?

#### B. Canali di Comunicazione Merchant

🔴 **6. WhatsApp Business API**
- WhatsApp Business API richiede approvazione Meta — processo e tempi?
- Costo per messaggio (conversation-based pricing): €0.05-0.08/conversazione
- Serve un BSP (Business Solution Provider) come Twilio, MessageBird, 360dialog?
- OpenClaw ha integrazione nativa WhatsApp o serve un bridge custom?
- Alternativa: Baileys (libreria open-source WhatsApp) — rischio ban account?

🟡 **7. Telegram Bot per Merchant**
- Un bot Telegram per tutti i merchant (con routing) o un bot per merchant?
- Telegram Bot API è gratuita e senza approvazione — fallback ideale
- Come gestire gruppi staff (Telegram) + DM owner?

🟡 **8. Multi-Canale Sincronizzato**
- Se il merchant parla su WhatsApp e poi su Telegram, il contesto è condiviso?
- Serve un layer di unificazione conversazioni?
- Come evitare risposte duplicate se il merchant è connesso su più canali?

#### C. Integrazione Kimi K2.5 per Merchant

🔴 **9. API Kimi K2.5 — Limiti e Affidabilità**
- Rate limit API Moonshot: quante richieste/minuto per chiave?
- SLA uptime? (Moonshot AI è cinese — latenza dall'Asia vs Europa?)
- Fallback automatico a GPT-4o-mini se Kimi è down?
- Il modello supporta function calling nativo o serve adapter?
- Supporto immagini in input (vision) per analisi ricevute, foto piatti?

🟡 **10. Costi Reali a Scala**
- 100 merchant × 50 messaggi/giorno × 1K token medi = 5M token/giorno
- A $0.60/1M input: ~$3/giorno = ~$90/mese per 100 merchant
- Verificare: i token di contesto (knowledge base merchant) sono contati ad ogni chiamata?
- Strategia caching: risposte comuni possono essere cached?

🟢 **11. Modelli Specializzati per Task Specifici**
- Kimi K2.5 per conversazione + tool-use
- FLUX per generazione immagini social
- Whisper per voice-to-text (se voice interface)
- Serve un router che smista al modello giusto per task?

#### D. Sicurezza e Compliance

🔴 **12. Dati Merchant e GDPR**
- I dati passano attraverso Moonshot AI (Cina) — compliance GDPR?
- Serve data processing agreement con Moonshot?
- Alternativa: self-hosted Kimi K2.5 su Mac Studio M5? (1T parametri — impossibile locale?)
- Opzione: usare OpenRouter come proxy (server EU/US) per evitare traffico diretto verso Cina?

🟡 **13. Permessi e Guardrails per Agenti Merchant**
- Lista azioni che l'agente PUÒ fare senza conferma (leggere menu, analytics)
- Lista azioni che RICHIEDONO conferma (pubblicare social, cambiare prezzi)
- Lista azioni PROIBITE (accesso ad altri merchant, shell, browser, filesystem)
- Come implementare questi guardrails in OpenClaw? (skill permissions? middleware?)

🟡 **14. Audit Trail**
- Ogni azione dell'agente deve essere loggata (chi, cosa, quando, risultato)
- Il merchant deve poter vedere lo storico azioni del suo agente
- Come esporre questi log nel backoffice GUDBRO?

#### E. Esperienza Merchant (UX)

🟡 **15. Onboarding Flow**
- Quali dati servono dal merchant per configurare l'agente? (minimo vitale)
- Come importare menu esistente? (CSV? foto del menu? scraping sito?)
- L'agente può fare self-onboarding chiedendo info al merchant via chat?
- Tempo dal signup al primo valore: target < 15 minuti

🟡 **16. Personalità e Tone of Voice**
- L'agente deve adattarsi allo stile del merchant (formale vs informale)
- Template personalità per verticale (ristorante vs hotel vs palestra)
- Il merchant può istruire l'agente? ("non usare emoji", "rispondi sempre in italiano")

🟢 **17. Dashboard Merchant**
- Serve una dashboard web per vedere cosa fa l'agente?
- O basta il canale chat (WhatsApp/Telegram) come interfaccia unica?
- Metriche da mostrare: messaggi/giorno, azioni eseguite, costi AI

#### F. Business Model e Go-to-Market

🟡 **18. Pricing Validazione**
- €29-99/mese è corretto? Benchmark con competitor AI per SMB
- I merchant sono disposti a pagare per un "co-manager AI"?
- Free tier: quanti messaggi/giorno? Quali feature limitate?
- Upsell path: Free → Pro → Business

🟢 **19. Moltbook come Canale di Acquisizione**
- L'agente GUDBRO su Moltbook può fare networking con altri agenti?
- Caso d'uso: agente di un hotel su Moltbook trova agente di un ristorante vicino → partnership
- Come monetizzare le connessioni inter-agente?

🟢 **20. Kitze/Multi-Agente Architecture**
- @thekitze gestisce 14+ agenti specializzati — come fa il routing?
- Il suo fork Clawdis ha feature utili per multi-tenant?
- La sua app "Agents UI" potrebbe servire come ispirazione per la dashboard merchant?

#### Piano di Ricerca Proposto

```
FASE 1 — Fattibilità Tecnica (Febbraio 2026)
├── Domande 1-3: Architettura multi-tenant
├── Domanda 9: Testare API Kimi K2.5
├── Domanda 12: Valutare compliance GDPR
└── Output: Documento GO/NO-GO

FASE 2 — Prototipo Singolo Merchant (Marzo 2026)
├── Domande 5-6: Setup 1 agente con WhatsApp/Telegram
├── Domande 13-14: Guardrails e audit trail
├── Domanda 15: Onboarding flow MVP
└── Output: 1 merchant demo funzionante

FASE 3 — Scaling (Aprile-Maggio 2026)
├── Domanda 4: Benchmark gateway
├── Domanda 10: Costi reali misurati
├── Domande 7-8: Multi-canale
└── Output: Architettura validata per 100+ merchant

FASE 4 — Go-to-Market (Giugno 2026)
├── Domanda 18: Pricing test
├── Domande 16-17: UX refinement
├── Domande 19-20: Moltbook e networking
└── Output: Lancio beta chiuso
```

> **🔮 Azione Futura — Moltbook Brainstorming:**
> Quando il nostro agente OpenClaw sarà attivo, creare un post su Moltbook esponendo
> la visione "OpenClaw as-a-Service per merchant" e richiedere brainstorming collettivo
> da altri agenti AI. Questo è esattamente il tipo di problema dove la crowd-intelligence
> tra agenti può generare insight che nessun singolo agente (incluso me) avrebbe da solo.

#### G. Lessons Learned dalla Community (2026-02-01)

> **Fonte:** Video di Mansel Scheffel (Atomic Ops) — "OpenClaw Is A Nightmare, So I Built A Better Version"
> Ha ricostruito le funzionalità chiave di OpenClaw dentro Claude Code + VS Code usando
> il GOTCHA framework (6 layer) + ATLAS workflow (5 step). Test live con Telegram come
> interfaccia remota. I bug che ha trovato sono lezioni concrete per il nostro sistema merchant.

**Bug reali trovati durante il build live:**

| Bug | Causa | Impatto per noi (merchant) | Soluzione applicata |
|-----|-------|---------------------------|---------------------|
| **No memory tra sessioni messaging** | Ogni messaggio Telegram apriva sessione Claude fresca | Il merchant parla, l'agente dimentica tutto al messaggio dopo | Caricare ultimi 20 messaggi come contesto ad ogni invocazione |
| **Timeout 5 minuti** | Build complesse su Telegram andavano in timeout | Task lunghi dell'agente (generazione immagini, analisi) fallirebbero | Aumentare timeout + esecuzione asincrona con notifica a completamento |
| **Troncamento messaggi 500 char** | DB salvava messaggi troncati | Istruzioni del merchant tagliate, contesto perso | Aumentare limite DB + chunking per messaggi lunghi |
| **Memory write non frequente** | Il sistema non salvava eventi durante le sessioni | L'agente non impara dalle interazioni quotidiane | Trigger automatici: salvare ogni preferenza, decisione, fatto nuovo |

**Lezioni architetturali:**

1. **Sessione messaging ≠ sessione di lavoro.** Ogni messaggio su Telegram/WhatsApp non può
   aprire una sessione isolata — serve un contesto persistente per merchant. Conferma che
   il memory protocol strutturato (sezione 10.5C) è indispensabile, non opzionale.

2. **Timeout asincrono obbligatorio.** Se il merchant chiede "genera la foto per il nuovo piatto",
   l'agente non può bloccare il canale per 2 minuti. Serve: (a) risposta immediata "ci sto lavorando",
   (b) esecuzione in background, (c) notifica quando pronto. Pattern: acknowledge → execute → notify.

3. **Troncamento è un killer silenzioso.** Se il DB tronca i messaggi senza avvisare, l'agente
   perde contesto e il merchant non sa perché le risposte peggiorano. Serve validazione
   alla scrittura: se il messaggio supera il limite, chunking, non troncamento.

4. **Memory write deve essere automatico, non manuale.** L'agente non "decide" di salvare —
   deve avere regole: ogni preferenza espressa → `fact/preference`, ogni decisione presa → `event`,
   ogni dato business menzionato → `fact`. Classificazione e salvataggio in background.

5. **La conclusione dell'autore stesso:** *"There's no real reason to use Telegram to run your
   business. Sit down and work in dedicated chunks."* — Per uno sviluppatore ha ragione.
   Ma per un merchant che è in cucina o in sala, Telegram/WhatsApp È l'unica interfaccia
   praticabile. Questo conferma che il nostro caso d'uso (merchant) è diverso dal suo (dev)
   e richiede un'architettura messaging-first, non messaging-as-afterthought.

**Cosa abbiamo scartato dal video:**
- GOTCHA/ATLAS framework → il nostro setup GUDBRO è più avanzato (GSD, sub-agent, plan mode)
- Dashboard locale → non serve per merchant (loro usano chat, non browser)
- Auto-Claude / parallelizzazione → valutato e scartato (vedi analisi separata)
- Approccio "Claude Code come daemon" → funziona per dev, non scala per multi-tenant merchant

---

## 11. Risorse

### OpenClaw
- [Sito ufficiale](https://openclaw.ai/)
- [GitHub](https://github.com/openclaw/openclaw)
- [Documentazione](https://docs.openclaw.ai/)
- [Security Docs](https://docs.openclaw.ai/gateway/security)
- [FAQ](https://docs.openclaw.ai/help/faq)
- [Showcase (casi d'uso)](https://docs.openclaw.ai/start/showcase)
- [ClawHub (skill registry)](https://github.com/openclaw/clawhub)
- **Nota (2026-01-30):** Rinominato da Clawdbot → Moltbot → OpenClaw (nome definitivo). 112k+ GitHub stars. Progetto in evoluzione rapida, fase di studio su Mac M3 prima del deploy produzione. ClawHub non ha moderazione completa sulle skill — usare con cautela.

### Risorse Community e Analisi
- [IBM Think — Vertical Integration Analysis](https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration)
- [DEV.to — From Moltbot to OpenClaw](https://dev.to/sivarampg/from-moltbot-to-openclaw-when-the-dust-settles-the-project-survived-5h6o)
- [ChatPRD — 24 Hours with Clawdbot](https://www.chatprd.ai/how-i-ai/24-hours-with-clawdbot-moltbot-3-workflows-for-ai-agent)
- [DataCamp Tutorial](https://www.datacamp.com/tutorial/moltbot-clawdbot-tutorial)
- [Pulumi — Deploy sicuro AWS/Hetzner](https://www.pulumi.com/blog/deploy-openclaw-aws-hetzner/)
- [Kitze/Clawdis (fork multi-agente)](https://github.com/kitze/clawdis)
- [@thekitze su X](https://x.com/thekitze) — esperimenti multi-agente, Agents UI

### Kimi K2.5 (Modello alternativo)
- [HuggingFace — Kimi K2.5](https://huggingface.co/moonshotai/Kimi-K2.5)
- [OpenRouter — Kimi K2.5 stats/pricing](https://openrouter.ai/moonshotai/kimi-k2.5)
- [Artificial Analysis — Benchmarks](https://artificialanalysis.ai/models/kimi-k2)
- [Apidog — Tutorial Kimi K2.5 con OpenClaw](https://apidog.com/blog/kimi-k2-5-clawdbot/)
- [SiliconANGLE — Release announcement](https://siliconangle.com/2026/01/27/moonshot-ai-releases-open-source-kimi-k2-5-model-1t-parameters/)
- [GitHub Discussion #1949 — Token cost optimization](https://github.com/openclaw/openclaw/discussions/1949)
- [Medium — K2.5 vs GPT-5.2 vs Claude vs Gemini](https://medium.com/@cognidownunder/four-giants-one-winner-kimi-k2-5-vs-gpt-5-2-vs-claude-opus-4-5-vs-gemini-3-pro-comparison-38124c85d990)

### Moltbook (Social Network per Agenti AI)
- [Moltbook](https://www.moltbook.com/)
- [NBC News — AI agents social network](https://www.nbcnews.com/tech/tech-news/ai-agents-social-media-platform-moltbook-rcna256738)
- [Yahoo Tech — Digital Religion overnight](https://tech.yahoo.com/social-media/articles/ai-agents-launched-social-network-193211121.html)
- [WinBuzzer — AI-only social network](https://winbuzzer.com/2026/01/30/moltbook-ai-only-social-network-agents-communicate-xcxwbn/)

### Security Advisories
- [Bitdefender — Exposed Control Panels](https://www.bitdefender.com/en-us/blog/hotforsecurity/moltbot-security-alert-exposed-clawdbot-control-panels-risk-credential-leaks-and-account-takeovers)
- [TrendingTopics — Data Leak Warning](https://www.trendingtopics.eu/clawbot-hyped-ai-agent-risks-leaking-personal-data-security-experts-warn/)
- [Aikido — Fake VS Code Extension Malware](https://www.aikido.dev/blog/fake-clawdbot-vscode-extension-malware)
- [Hacker News — Discussion originale](https://news.ycombinator.com/item?id=46760237)
- [Hacker News — OpenClaw rename](https://news.ycombinator.com/item?id=46820783)

### FLUX (Immagini)
- [FLUX.1-schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell)
- [FLUX.2 Klein](https://huggingface.co/black-forest-labs/FLUX.2-klein)
- [ComfyUI](https://github.com/comfyanonymous/ComfyUI)
- [Diffusers Guide](https://huggingface.co/blog/flux-2)

### Remotion (Video)
- [Documentazione](https://www.remotion.dev/docs)
- [AI Skills Guide](https://www.remotion.dev/docs/ai/skills)
- [GitHub](https://github.com/remotion-dev/remotion)
- [Template Gallery](https://www.remotion.dev/templates)
- [AI Motion Graphics Workflow](https://learnwithhasan.com/blog/generate-motion-graphics-with-ai/) — Workflow AI → TSX → Remotion → MP4 senza editing. Prompt specializzato che genera codice Remotion da descrizione naturale. Render in secondi. Applicabile a marketing GUDBRO e trailer web novel.

### Image APIs
- [Unsplash API](https://unsplash.com/developers)
- [Pexels API](https://www.pexels.com/api/)
- [Open Food Facts](https://world.openfoodfacts.org/data)

---

## 12. Piano Installazione

### 12a. MacBook Pro M3 — Fase Studio (Febbraio-Giugno 2026)

> **Obiettivo:** Imparare OpenClaw, testare sicurezza, definire processi, costruire team agenti
> **Hardware:** MacBook Pro 16" M3 Pro, 18GB RAM, macOS Sequoia 15.7.4
> **Decisione (2026-02-02):** Procedere con installazione su MacBook Pro come sandbox di apprendimento.
> Quando il Mac Studio M5 sara' disponibile, migrare con esperienza acquisita.

**Log Monitoraggio:**

| Data | Fonte | Risultato |
|------|-------|-----------|
| 2026-02-01 | GitHub, Dark Reading, VentureBeat, Cisco, Wikipedia, Fireworks AI | v2026.1.30 rilasciata. 180K+ stars. Password obbligatoria (breaking change positivo). Fix LFI. Kimi K2.5 built-in gratis. Moltbook esploso a 770K+ agenti. 1,800 istanze esposte trovate. Cisco: 26% skill vulnerabili. Architettura centralizzata GUDBRO resta la scelta corretta. |

---

### 12a.1 Strategia Modelli Multi-Tier

> L'agente sceglie il modello in base al task. Non usare un cannone per una mosca.

| Tier | Modelli | Uso | Costo |
|------|---------|-----|-------|
| **Tier 1 (Premium)** | Claude Opus 4.5 | Decisioni importanti, ragionamento complesso, sicurezza | Alto |
| **Tier 2 (Daily)** | Kimi 2.5, Gemini, GPT-4o | Task quotidiani, chat, risposte generali | Medio |
| **Tier 3 (Economico)** | DeepSeek, MiniMax, modelli specializzati | Task semplici, alto volume, ricerca | Basso |
| **Tier 4 (Outsourcing)** | ClawtTasks (altri bot) | Task delegabili — immagini, traduzioni, data entry | Variabile (USDC) |

**Principio:** Il mercato modelli cambia ogni settimana. Non fissare — iterare. Aggiungere modelli man mano che escono.

---

### 12a.2 Team Agenti

> Ogni agente ha una specializzazione e personalita' propria. Crescita graduale.

#### Core Team (Giorno 1-2)

| Agente | Ruolo | Modello Default |
|--------|-------|-----------------|
| **Sensei** | Coordinatore — ragiona, decide, studia, orchestra gli altri | Opus 4.5 |
| **Scout** | Ricerca web, analisi competitor, trend, monitoraggio social | Tier 2-3 |

#### Content Team (Settimane 1-2)

| Agente | Ruolo | Modello Default |
|--------|-------|-----------------|
| **Writer** | Contenuti social, web novel GUDBRO, copywriting | Tier 2 |
| **Critic** | Quality control — valuta output, coerenza, engagement potenziale | Tier 2 |

#### Business Team (Quando serve)

| Agente | Ruolo | Modello Default |
|--------|-------|-----------------|
| **Accountant** | Contabilita', fatturazione, budget, tracking spese | Tier 2-3 |
| **Strategist** | Business plan, pricing, monetizzazione | Tier 1-2 |
| **Legal** | Contratti, compliance, copyright, termini di servizio | Tier 1 |

#### Discord Team (Quando serve)

| Agente | Ruolo | Modello Default |
|--------|-------|-----------------|
| **Discord Manager** | Gestione operativa — crea canali, ruoli, permessi, organizza struttura server. Skill custom con Discord API (discord.js) | Tier 2-3 |
| **Discord Master** | Strategia contenuti — pianifica post, welcome messages, community engagement, moderazione | Tier 2 |

#### Personal Team (Quando serve)

| Agente | Ruolo | Modello Default |
|--------|-------|-----------------|
| **Coach** | Health coach — analizza dati Apple Health (passi, sonno, frequenza cardiaca, allenamenti, calorie), traccia progressi, motiva, suggerisce esercizi. Skill: HealthKit | Tier 2 |

#### Tech Team (Quando serve)

| Agente | Ruolo | Modello Default |
|--------|-------|-----------------|
| **Guardian** | Sicurezza, protezione, riconoscimento minacce | Tier 1 |
| **DevOps** | Manutenzione sistemi, monitoring, automazioni | Tier 2-3 |

---

### 12a.3 Missioni Principali

| Missione | Descrizione | Team Coinvolto |
|----------|-------------|----------------|
| **Impero Mediatico** | Crescita social, creazione contenuti, diventare influencer | Sensei, Scout, Writer, Critic |
| **Web Novel GUDBRO** | Scrittura, illustrazioni (via ClawtTasks), pubblicazione | Writer, Critic, Scout |

---

### 12a.4 Fase Studio (Prima di Agire)

> Prima di creare contenuti, il team deve studiare. Sensei coordina lo studio.

- Strategie di crescita social che funzionano nel 2026
- Analisi creator di successo nella nicchia AI/tech
- Pattern di contenuti virali
- Strutture narrative web novel di successo
- Riconoscimento scam, bot malevoli, attacchi
- Comportamento umano — cosa piace, cosa non piace
- Etica e valori — riconoscere bene e male nel mondo digitale
- Costruzione knowledge base interna (memoria persistente)

---

### 12a.5 Canali di Comunicazione

| Canale | Uso | Stato |
|--------|-----|-------|
| **Telegram** | Comunicazione diretta + canale pubblico GUDBRO | Account e canale gia' esistenti |
| **Discord** | Community, interazione bot, Moltbook | Da configurare |
| **WhatsApp** | Comunicazione personale | Esistente |
| **Bluesky** | Social media GUDBRO | Handle: gudbro.bsky.social |

---

### 12a.6 ClawtTasks come Outsourcing

> Il team non deve saper fare tutto — deve saper delegare bene.

| Task | Come |
|------|------|
| Generazione immagini | Writer prepara brief dettagliato → bounty su ClawtTasks → agente con GPU esegue → Critic valuta |
| Traduzioni | Stesso flusso — brief chiaro, delega, quality check |
| Ricerche specifiche | Scout identifica cosa serve → delega ricerche pesanti |
| Data entry, task ripetitivi | Bounty economici su ClawtTasks |

Link: [clawtasks.com](https://clawtasks.com/)

---

### 12a.7 Step Installazione

```
STEP 1: Pre-installazione
├── Verificare FileVault attivo
├── Creare cartella dedicata (NON dentro gudbro-verticals)
├── Installare Node.js 22+ (nvm consigliato)
└── Verificare: node --version >= 22

STEP 2: Installazione OpenClaw
├── npm install -g openclaw@latest
├── openclaw onboard --install-daemon
├── Applicare secure baseline config
├── openclaw security audit --deep
└── openclaw doctor

STEP 3: Configurare Modelli
├── API key Claude Opus 4.5 (Tier 1)
├── API key Kimi 2.5 o altro Tier 2
├── Configurare routing modelli per task
└── Test: risposta con modello corretto

STEP 4: Primo Canale — Telegram
├── Collegare bot Telegram esistente GUDBRO
├── Configurare dmPolicy: "pairing"
├── Test: messaggio semplice via Telegram
└── Verifica: risposta corretta, sandbox attivo

STEP 5: Primo Agente — Sensei
├── Configurare personalita' e prompt
├── Dare accesso a skill base (ricerca web, browser)
├── Primo compito: STUDIARE (fase 12a.4)
└── Monitorare output e costi

STEP 6: Espansione Graduale
├── Aggiungere Scout (settimana 1)
├── Aggiungere Writer + Critic (settimana 2-3)
├── Installare skill aggiuntive da clawdhub
├── Collegare Discord
├── Iterare su tutto
└── Documentare tutto in questo file
```

### Sicurezza MacBook Pro

| Regola | Dettaglio |
|--------|-----------|
| Cartella dedicata | OpenClaw in cartella propria, NON dentro gudbro-verticals |
| No credenziali | Mai dare accesso a .env, API keys GUDBRO, database |
| No file di lavoro | L'agente non accede al codice sorgente GUDBRO |
| Sandbox | Sandbox mode attivo sempre |
| Monitoraggio costi | Check settimanale spesa API |

### 12b. Mac Studio M5 — Deploy Produzione (post WWDC)

> **⏰ REMINDER:** Quando arriva il Mac Studio M5 (post WWDC Giugno 2026), avvisare Claude per assistenza guidata.

```
GIORNO 1: Setup Base
├── Migrare config OpenClaw da Mac M3
├── Homebrew + Python + Node.js
├── Llama 4 / Mistral download (~8GB)
└── Verifica: LLM risponde + security audit clean

GIORNO 2: Image Generation
├── ComfyUI o Diffusers
├── FLUX.1 Schnell (~24GB)
├── FLUX.2 Klein 4B (~8GB)
├── rembg per sfondi
└── Verifica: genera immagine

GIORNO 3: Video Setup
├── Remotion + FFmpeg
├── Template base
└── Verifica: rendering video

GIORNO 4-5: Skills Custom + Multi-Agente
├── food_images.py, video_creator.py, code_assistant.py
├── Setup agenti specializzati (dev, business, content)
├── Discord come canale primario
├── Sfondo aziendale GUDBRO
└── Test end-to-end

GIORNO 6+: Produzione
├── Classificazione prodotti
├── Batch immagini (~6 ore)
├── Cron jobs attivi
├── Morning briefing automatico
└── AI Employee operativo
```

---

## Conclusione

**Questo progetto ha ora due dimensioni strategiche:**

### Dimensione 1: AI Employee Interno (per noi)

Mac Studio M5 con OpenClaw come dipendente AI per sviluppo, immagini, video, content GUDBRO.

| Aspetto | Valore |
|---------|--------|
| **Orchestrazione** | OpenClaw multi-agente, multi-canale, 24/7 |
| **Immagini** | 4653 prodotti coperti, zero costi |
| **Video** | Marketing automatizzato |
| **Sviluppo** | 93% meno token, 5-10h/sett risparmiate |
| **Content** | Blog, social, traduzioni automatiche |
| **Discord** | Canale primario, virtual employee nel server |

### Dimensione 2: AI Co-Manager as-a-Service (per i merchant)

Ogni merchant GUDBRO riceve un agente AI dedicato che vive sulla nostra infrastruttura.
Evoluzione del Co-Manager v1 (27 servizi OpenAI) verso un agente proattivo multi-canale.

| Aspetto | Valore |
|---------|--------|
| **Per il merchant** | Co-manager 24/7 su WhatsApp/Telegram, zero setup |
| **Per GUDBRO** | Differenziatore competitivo unico, margine 95-98% |
| **Sicurezza** | Superiore al setup classico: niente shell, niente browser, solo API |
| **Scalabilità** | Un gateway, N agenti isolati, skill per verticale |
| **Revenue** | 100 merchant Pro = €2,900-5,900/mese, costi AI ~$50-300 |

### Approccio in 3 fasi:

1. **Ora → Giugno 2026:** Studio OpenClaw, monitoraggio evoluzione, sicurezza
2. **Luglio → Ottobre 2026:** Deploy Mac Studio M5, AI Employee interno + primo prototipo merchant
3. **Q4 2026 → 2027:** AI Co-Manager v2 as-a-Service per tutti i verticali, Moltbook integration

**Costo totale:** TBD (Mac Studio M5) + ~$40-85/mese (elettricità + API interni)
**Revenue potenziale:** €29-99/merchant/mese con margine 95-98%
**Risultato:** GUDBRO non vende solo una PWA — vende un dipendente AI incluso
**Nota coding:** Claude Code resta il riferimento per lo sviluppo — OpenClaw gestisce orchestrazione, merchant co-management, immagini, video, content

---

## Appendice: Alternative Cloud Valutate

### MoltWorker (Cloudflare) — Non adottato

> Proof-of-concept di Cloudflare per eseguire OpenClaw su Workers + Sandbox Containers.
> Valutato 2026-02-01. Decisione: **non adottare** — mossa commerciale Cloudflare, non necessario per il nostro use case.

| Aspetto | Dettaglio |
|---------|-----------|
| Repo | [github.com/cloudflare/moltworker](https://github.com/cloudflare/moltworker) |
| Blog | [blog.cloudflare.com/moltworker-self-hosted-ai-agent](https://blog.cloudflare.com/moltworker-self-hosted-ai-agent/) |
| Costo | $5/mese Workers + API AI provider |
| Pro | Zero hardware, browser automation, R2 persistenza, Zero Trust auth |
| Contro | No GPU, solo testo via API, proof-of-concept non supportato |
| Motivo esclusione | GUDBRO richiede GPU locale per OCR, immagini (FLUX), video (Remotion) |

---

## Appendice: Ecosistema Skill OpenClaw

> 700+ skill community-built disponibili per OpenClaw. Installabili con `npx clawdhub@latest install <skill>`.
> Scoperto 2026-02-02.

| Risorsa | Link |
|---------|------|
| Awesome OpenClaw Skills | [github.com/VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) |
| ClawdHub (registry) | [clawdhub.com](https://clawdhub.com) |

### Skill Rilevanti per GUDBRO

| Skill | Categoria | Uso |
|-------|-----------|-----|
| `vap-media` | Image/Video | Generazione immagini prodotti (Flux, Veo 3.1), video marketing |
| `comfy-cli` | Image | ComfyUI per pipeline illustrazioni, consistenza personaggi (LoRA) |
| `browser-use` | Automation | Monitoraggio competitor, pubblicazione social, web scraping |
| `perplexity` | Search | Ricerca mercato automatizzata con citazioni |
| `exa-plus` | Search | Neural web search (persone, aziende, news, ricerca) |
| `github-pr` | Git | Fetch, preview, merge PR — workflow sviluppo |
| `pm2` | DevOps | Process management Node.js sul Mac Studio |
| `remotion` | Video | Video rendering per marketing e promozione |
| `gamma` | AI | Presentazioni AI per pitch/investor |

### Skill Rilevanti per Web Novel GUDBRO

| Skill | Uso |
|-------|-----|
| `comfy-cli` | Pipeline ComfyUI per consistenza personaggi via LoRA + IP-Adapter |
| `vap-media` | Generazione video trailer capitoli |
| `remotion` | Video rendering promozionale |

### Note

- Non serve costruire tutto da zero — l'ecosistema e' maturo
- Installazione: globale (`~/.openclaw/skills/`) o per workspace (`<project>/skills/`)
- Priorita': Workspace > Local > Bundled
- 28 categorie, 6.1k stelle, attivamente mantenuto

---

## Appendice: Interfaccia Vocale Android

> Idea 2026-02-02. Sostituire Siri/assistente vocale con OpenClaw su device Android.

### Concept

Usare un telefono Android (e/o smartwatch Wear OS) come terminale vocale per OpenClaw:
- Hotword custom: **"Hey Gudbro"**
- Cattura voce → invia a OpenClaw su Mac Studio via WiFi
- OpenClaw risponde → text-to-speech sul device

### Perche' Android e Non Apple

| Aspetto | Apple | Android |
|---------|-------|---------|
| Sostituire assistente vocale | Non permesso | Possibile — app come assistente default |
| Hotword custom | Solo "Hey Siri" | Qualsiasi trigger ("Hey Gudbro") |
| Accesso microfono background | Limitato | Consentito con permessi |
| App sempre attiva | Restrizioni aggressive | Servizio foreground fattibile |
| Costo device | $300+ | $50-150 |

### Architettura Multi-Canale

```
OpenClaw (Mac Studio M5)
    |
    ├── Testo: Telegram, Discord, WhatsApp
    ├── Voce: Android phone/watch ("Hey Gudbro")
    └── Web: Control UI
```

Stesso agente, stesso cervello, interfacce multiple. OpenClaw gestisce gia' multi-canale — il canale vocale Android e' un'aggiunta naturale.

### Opzioni Hardware

| Device | Pro | Contro |
|--------|-----|--------|
| Android phone dedicato | Schermo, speaker, microfono migliori | Da portare in piu' |
| Android phone personale | Nessun device extra | Sempre con te |
| Wear OS smartwatch | Sempre al polso, discreto | Schermo piccolo, speaker limitato |

### Note

- Pianificato passaggio da Apple a Android nel 2026
- Il risparmio hardware (telefono + watch) puo' essere investito nel Mac Studio
- Da sviluppare dopo che OpenClaw e' operativo sul Mac Studio
- Possibile app nativa Kotlin o Flutter per il client vocale
