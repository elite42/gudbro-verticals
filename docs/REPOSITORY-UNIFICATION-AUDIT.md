# Audit Unificazione Repository GUDBRO

**Data Analisi:** 2025-12-13
**Analista:** Claude Code (Audit Approfondito)

---

## Executive Summary

Esistono **4 cartelle separate** sul Desktop che fanno parte dello stesso progetto GUDBRO:

| Cartella | Dimensione | Ultimo Update | Contenuto Principale |
|----------|-----------|---------------|---------------------|
| `gudbro-verticals` | ~1.5 GB | OGGI | Repository ATTIVO - Verticals + Shared DB |
| `gudbro-qr-core` | 889 MB | 4 Dic 2025 | QR Platform Core - 19 tipi QR + Frontend |
| `qr-platform-complete` | 2.4 GB | 27 Nov 2025 | MONOREPO ORIGINALE (pre-split) |
| `docs and research gudbro` | 620 KB | 4 Nov 2025 | Documentazione strategica + Ricerche |

**Problema:** Il progetto è frammentato in 4 location separate, causando:
- Duplicazione di codice e documentazione
- Confusione su quale sia la "fonte di verità"
- Rischio di disallineamento tra versioni
- Difficoltà nel mantenere sincronizzazione

---

## Analisi Dettagliata per Cartella

### 1. gudbro-qr-core (889 MB)

**Status:** Repository Git ATTIVO (6 commit, ultimo 4 Dic 2025)
**Deployato:** Frontend su Vercel (LIVE)

#### Contenuto Chiave:
- **Frontend Next.js 15.5.7** - Admin UI per QR platform
- **19 tipi QR** implementati (URL, WiFi, vCard, VietQR, WeChat Pay, Zalo, KakaoTalk, LINE, etc.)
- **QR Engine** - Core generation con AI Artistic (Replicate)
- **13 microservizi** (6 attivi, 5 stub)

#### Moduli Attivi:
| Modulo | Porta | Status | Note |
|--------|-------|--------|------|
| QR Engine | 3001 | ✅ Production | 2920 righe route, 17 test |
| Auth | 3003 | ✅ Production | JWT + bcrypt |
| Hub | 3010 | ✅ Production | Link-in-bio, 21 template |
| i18n | 3011 | ✅ Complete | VN/KO/CN/EN |
| Menu | 3012 | ✅ Production | JSONB translations |
| Frontend | 3000 | ✅ Deployed | 25 pages, Vercel live |

#### Moduli Stub (Non implementati):
- Analytics (3002), API Gateway (3000), Bulk (3006), Customization (3007), Filters (3009)

#### Documentazione Critica:
- `/CLAUDE.md` - Contesto completo 12KB
- `/docs/MODULE-REGISTRY.md` - Registro tutti moduli
- `/docs/PORT-REGISTRY.json` - Mapping porte
- `/docs/memory/` - Decisioni architetturali

---

### 2. qr-platform-complete (2.4 GB)

**Status:** MONOREPO ORIGINALE (pre-split 28 Nov 2025)
**Nota:** Dichiarato "ARCHIVED" nel CLAUDE.md di qr-core

#### Contenuto:
- **Tutto ciò che è in gudbro-qr-core** (versione precedente)
- **Verticals:** Coffeeshop, Rentals, Wellness (versioni più vecchie)
- **Docker Compose** con 13 servizi orchestrati
- **Brand Guidelines PDF** (1.4 MB)
- **Mockups interattivi** (savings calculator)

#### File Importanti NON in altri repo:
| File | Dimensione | Valore |
|------|-----------|--------|
| `Gudbro_BrandGuidelines.pdf` | 1.4 MB | Brand ufficiale |
| `mockups/savings-calculator-v3.html` | 69 KB | Prototipo interattivo |
| `Customer_Journey.md` | 8 KB | UX mapping |
| `COFFEESHOP-AUDIT-*.md` | 54 KB | Audit quality insights |
| `docker-compose.yml` | 7.5 KB | Orchestrazione 13 servizi |

#### Database Schema:
- Schema principale: 363 righe
- 9 migration versionate
- Seed data multi-venue

---

### 3. docs and research gudbro (620 KB)

**Status:** Documentazione strategica e ricerche di mercato

#### File e Valutazione:

| File | Tipo | Rilevanza | Azione |
|------|------|-----------|--------|
| **GUDBRO_Paper_v6.1_FINAL_with_ExecSummary.docx** | Strategia | CRITICA | INTEGRARE |
| **SEA_Allergen_Regulations_Research.md** | Compliance | CRITICA | INTEGRARE |
| **Thai_Competitor_Analysis_Deep_Dive.md** | Market Intel | MOLTO ALTA | INTEGRARE |
| **Instant Feedback System...docx** | Prodotto | ALTA | INTEGRARE |
| **Philippines_Competitor_Analysis.md** | Market Intel | ALTA | INTEGRARE |
| **GUDBRO_Ecosistema_Digitale.md** | Strategia | MOLTO ALTA | INTEGRARE |
| **QR_ENGINE_DEV_BRIEF.md** | Tech Spec | MEDIA-ALTA | INTEGRARE |
| **Ricerca_NFC_vs_QR.md** | Research | MEDIA-ALTA | INTEGRARE |
| **Ricerca_ROI_Menu_Digitali.md** | Business Case | ALTA | INTEGRARE |
| GUDBRO_Paper_v4.0.docx | Strategia | Obsoleta | ARCHIVIARE |
| GUDBRO_Paper_v6.0.docx | Strategia | Obsoleta | ARCHIVIARE |

---

## Duplicazioni Identificate

### Codice Duplicato

| Componente | gudbro-verticals | qr-core | qr-platform-complete |
|------------|------------------|---------|---------------------|
| Frontend QR | NO | ✅ Attivo | ✅ Vecchio |
| QR Engine | NO | ✅ Attivo | ✅ Vecchio |
| Coffeeshop | ✅ Attivo | NO | ✅ Vecchio |
| Rentals | ✅ Attivo | NO | ✅ Vecchio |
| Wellness | ✅ Attivo | NO | ✅ Vecchio |
| Shared DB | ✅ Attivo | Partial | ✅ Vecchio |
| menu-template | ✅ | ✅ | ✅ |
| Health Filters | ✅ 5 Dimensioni | Partial | ✅ 51 Filtri |

### Documentazione Duplicata

| Documento | Locations | Versione più recente |
|-----------|-----------|---------------------|
| MODULE-REGISTRY.md | qr-core, qr-platform | Identiche |
| PORT-REGISTRY.json | qr-core, qr-platform | Identiche |
| CLAUDE.md | Tutti e 3 | gudbro-verticals |
| Health Filters docs | verticals, qr-platform | verticals (5 Dimensioni) |

---

## Raccomandazione: Piano di Unificazione

### OPZIONE A: Monorepo Unificato (CONSIGLIATA)

Unificare tutto in `gudbro-verticals` con struttura:

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/          # ✅ Già presente
│   ├── backoffice/          # ✅ Già presente
│   ├── website/             # ✅ Già presente
│   ├── rentals/             # ✅ Già presente
│   ├── wellness/            # ✅ Già presente
│   └── qr-platform/         # 🆕 DA qr-core/frontend
│
├── packages/
│   ├── qr-engine/           # 🆕 DA qr-core/packages/qr-engine
│   ├── hub/                 # 🆕 DA qr-core/packages/hub
│   ├── auth/                # 🆕 DA qr-core/packages/auth
│   └── i18n/                # 🆕 DA qr-core/packages/i18n
│
├── shared/
│   ├── database/            # ✅ Già presente (estendere)
│   ├── core/                # ✅ Già presente
│   ├── seo/                 # ✅ Già presente
│   └── menu-template/       # ✅ Già presente
│
├── docs/
│   ├── strategic/           # 🆕 DA docs-research (v6.1, Ecosistema)
│   ├── market-research/     # 🆕 DA docs-research (Thai, Philippines)
│   ├── compliance/          # 🆕 DA docs-research (SEA Allergens)
│   ├── research/            # 🆕 DA docs-research (NFC, ROI)
│   ├── products/            # 🆕 DA docs-research (Instant Feedback)
│   ├── sprints/             # ✅ Già presente
│   └── _archive/            # Versioni obsolete
│
├── assets/
│   ├── brand/               # 🆕 DA qr-platform (BrandGuidelines.pdf)
│   └── mockups/             # 🆕 DA qr-platform (savings-calculator)
│
└── infrastructure/
    └── docker/              # 🆕 DA qr-platform (docker-compose.yml)
```

### OPZIONE B: Due Repository Separati

Mantenere separazione attuale ma sincronizzare:
- `gudbro-verticals` = Applicazioni verticali (Coffeeshop, Rentals, Wellness)
- `gudbro-qr-core` = Piattaforma QR core

**Pro:** Separazione concerns
**Contro:** Duplicazione shared, complessità sync

---

## Piano di Migrazione (se Opzione A)

### Fase 1: Preparazione (1-2 ore)

1. Backup completo di tutte le cartelle
2. Creare branch `feature/unification` in gudbro-verticals
3. Verificare che gudbro-verticals build passi

### Fase 2: Migrazione Documentazione (30 min)

```bash
# Creare struttura
mkdir -p docs/strategic docs/market-research docs/compliance docs/research docs/products

# Migrare da "docs and research gudbro"
cp "docs and research gudbro/GUDBRO_Paper_v6.1_FINAL_with_ExecSummary.docx" docs/strategic/
cp "docs and research gudbro/GUDBRO*.md" docs/strategic/
cp "docs and research gudbro/Thai_Competitor_Analysis_Deep_Dive.md" docs/market-research/
cp "docs and research gudbro/Philippines_Competitor_Analysis.md" docs/market-research/
cp "docs and research gudbro/SEA_Allergen_Regulations_Research*.md" docs/compliance/
cp "docs and research gudbro/Ricerca*.md" docs/research/
cp "docs and research gudbro/Instant Feedback*.docx" docs/products/
cp "docs and research gudbro/QR_ENGINE_DEV_BRIEF.md" docs/products/
```

### Fase 3: Migrazione Assets (15 min)

```bash
# Da qr-platform-complete
mkdir -p assets/brand assets/mockups
cp "qr-platform-complete/Gudbro_BrandGuidelines.pdf" assets/brand/
cp -r "qr-platform-complete/mockups/" assets/mockups/
```

### Fase 4: Migrazione QR Engine (1-2 ore)

```bash
# Opzione: Git subtree o copia manuale
# Da gudbro-qr-core
cp -r gudbro-qr-core/packages/qr-engine packages/
cp -r gudbro-qr-core/packages/hub packages/
cp -r gudbro-qr-core/packages/auth packages/
cp -r gudbro-qr-core/frontend apps/qr-platform
```

### Fase 5: Cleanup (30 min)

1. Rimuovere duplicati
2. Aggiornare import paths
3. Verificare build
4. Commit e push

### Fase 6: Archiviazione (post-migrazione)

```bash
# Rinominare cartelle originali come backup
mv gudbro-qr-core gudbro-qr-core-ARCHIVED-2025-12-13
mv qr-platform-complete qr-platform-complete-ARCHIVED-2025-12-13
mv "docs and research gudbro" "docs-research-ARCHIVED-2025-12-13"
```

---

## Priorità Immediata: File Critici da Integrare SUBITO

### 1. SEA_Allergen_Regulations (CRITICO)
- **Perché:** Contiene 21 allergeni + timeline Cina 2027
- **Action:** Verificare se molluschi (21°) già in 5 Dimensioni
- **Dove:** `/docs/compliance/SEA_Allergen_Regulations_2025.md`

### 2. Thai Competitor Analysis (CRITICO)
- **Perché:** Wongnai = threat principale, 12-18 mesi window
- **Action:** Setup monitoring Wongnai product launches
- **Dove:** `/docs/market-research/thailand/`

### 3. Brand Guidelines PDF (IMPORTANTE)
- **Perché:** Unica fonte brand ufficiale
- **Dove:** `/assets/brand/Gudbro_BrandGuidelines.pdf`

### 4. GUDBRO Paper v6.1 (IMPORTANTE)
- **Perché:** Documento strategico definitivo
- **Dove:** `/docs/strategic/GUDBRO_Paper_v6.1_FINAL.docx`

---

## Decisione Richiesta

Prima di procedere con l'unificazione, confermare:

1. **Quale opzione preferisci?**
   - [ ] Opzione A: Monorepo unificato in gudbro-verticals
   - [ ] Opzione B: Mantenere repository separati

2. **Cosa fare con qr-platform-complete (2.4GB)?**
   - [ ] Archiviare (rinominare + non toccare)
   - [ ] Eliminare dopo migrazione
   - [ ] Mantenere come backup offline

3. **Priorità migrazione QR Engine?**
   - [ ] Ora (include nella unificazione)
   - [ ] Dopo (mantieni qr-core separato per ora)

---

## Appendice: Inventario Completo File Critici

### Da gudbro-qr-core
| Path | Dimensione | Descrizione |
|------|-----------|-------------|
| `/packages/qr-engine/` | 796 KB | Core QR generation |
| `/packages/hub/` | 148 KB | Link-in-bio |
| `/packages/auth/` | 52 KB | JWT auth |
| `/frontend/` | 841 MB | Next.js Admin UI |
| `/CLAUDE.md` | 12 KB | Context file |

### Da qr-platform-complete
| Path | Dimensione | Descrizione |
|------|-----------|-------------|
| `/Gudbro_BrandGuidelines.pdf` | 1.4 MB | Brand ufficiale |
| `/docker-compose.yml` | 7.5 KB | Orchestrazione |
| `/mockups/` | 85 KB | Prototipi |
| `/COFFEESHOP-AUDIT-*.md` | 54 KB | Quality audits |

### Da docs and research gudbro
| Path | Dimensione | Descrizione |
|------|-----------|-------------|
| `/SEA_Allergen_Regulations*.md` | 29 KB | Compliance SEA |
| `/Thai_Competitor_Analysis*.md` | 19 KB | Market intel |
| `/GUDBRO_Paper_v6.1*.docx` | 79 KB | Strategia finale |
| `/Instant Feedback*.docx` | 324 KB | Product spec |

---

**Prossimo Step:** Conferma delle decisioni sopra per procedere con migrazione.
