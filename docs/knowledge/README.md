# Knowledge Base

> **Second Brain** per persistere conoscenze chiave tra sessioni Claude.

---

## Struttura

```
knowledge/
├── systems/              # Come funzionano i sistemi
│   ├── CUSTOMIZATIONS-SYSTEM.md    # Colori, loghi, temi, sezioni PWA
│   └── V2-MIGRATION-GUIDE.md       # Pattern v2, differenze v1
├── patterns/             # Pattern ricorrenti (TODO)
└── decisions/            # ADR - Architecture Decision Records (TODO)
```

---

## Systems (Documentati)

| File | Descrizione | Quando Usare |
|------|-------------|--------------|
| `systems/CUSTOMIZATIONS-SYSTEM.md` | Brand colors, themes, site sections, product customizations | Modifiche a personalizzazioni merchant |
| `systems/V2-MIGRATION-GUIDE.md` | Architettura 4-tier, middleware redirect, feature gating | Lavoro su PWA v2 |

---

## Systems (Da Creare)

| File | Descrizione | Priorità |
|------|-------------|----------|
| `systems/TIER-SYSTEM.md` | Come funziona il sistema tier/pricing | Media |
| `systems/MULTI-TENANT.md` | Domain resolution, brand/location/org | Media |
| `systems/ORDER-FLOW.md` | Flusso ordine end-to-end | Media |

---

## Patterns (Da Creare)

| File | Descrizione |
|------|-------------|
| `patterns/connected-component.md` | Pattern Connected/Presentational |
| `patterns/tier-gating.md` | Pattern useTierFeature + TierGate |
| `patterns/store-sync.md` | Pattern sync v1 stores in v2 |

---

## Decisions (ADR - Da Creare)

| File | Decisione |
|------|-----------|
| `decisions/adr-001-zustand.md` | Perché Zustand invece di Redux |
| `decisions/adr-002-phosphor.md` | Perché Phosphor invece di Lucide |
| `decisions/adr-003-v2-arch.md` | Perché architettura 4-tier |

---

## Come Contribuire

**Vedi `CONTRIBUTING.md` per regole complete.**

### Domande Fine Sessione

| Domanda | Se SI → Azione |
|---------|----------------|
| Ho scoperto come funziona un sistema? | `systems/*.md` |
| Ho capito un pattern riutilizzabile? | `patterns/*.md` |
| Ho scelto tra alternative tecniche? | `decisions/adr-*.md` |
| Ho fatto errori da non ripetere? | `docs/core/lessons/*.md` |
| Cosa avrei voluto sapere all'inizio? | Quella è doc mancante |

### Quick Capture

Non hai tempo? Aggiungi in `INBOX.md`:
```markdown
## [Data] - [Titolo]
**Tipo:** system | pattern | decision | lesson
**Insight:** [cosa hai imparato]
**TODO:** [ ] Espandere
```
