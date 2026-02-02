# Knowledge Base - Guida alla Manutenzione

> **Regole per modificare, espandere e mantenere la Knowledge Base.**

---

## Quando Creare Nuova Documentazione

### DEVI creare documentazione quando:

| Trigger | Tipo Documento | Esempio |
|---------|----------------|---------|
| Implementi un **nuovo sistema** | `systems/*.md` | Nuovo payment system |
| Scopri un **pattern riutilizzabile** | `patterns/*.md` | Pattern per form validation |
| Prendi una **decisione architetturale** | `decisions/adr-*.md` | Scelta di una libreria |
| Un sistema esistente cambia **significativamente** | Aggiorna esistente | Nuovo flusso ordini |

### NON creare documentazione per:

- Bug fix minori
- Refactoring che non cambia comportamento
- Aggiunte di feature già documentate nel pattern esistente
- Informazioni già presenti in `docs/core/lessons/`

---

## Struttura Documenti

### Systems (`systems/*.md`)

Documenta **come funziona** un sistema end-to-end.

```markdown
# Nome Sistema

> **Descrizione breve** del sistema.

---

## Architettura

[Diagramma ASCII o descrizione del flusso]

---

## 1. Database

### Tabelle coinvolte
[Schema SQL o riferimento a migration]

---

## 2. API/Servizi

### Endpoints
[Path, metodi, payload]

---

## 3. Frontend

### Hooks/Components
[Path file, snippet uso]

---

## 4. Flusso Completo

[Sequenza operazioni]

---

## 5. File Chiave

| File | Descrizione |
|------|-------------|
| path/to/file | Cosa fa |

---

**Version:** 1.0
**Last Updated:** YYYY-MM-DD
```

### Patterns (`patterns/*.md`)

Documenta **pattern riutilizzabili** con esempi concreti.

```markdown
# Pattern: Nome Pattern

> **Quando usare:** [situazione]

---

## Problema

[Cosa risolve questo pattern]

---

## Soluzione

[Descrizione approccio]

---

## Implementazione

### Esempio Base
```typescript
// Codice minimo
```

### Esempio Completo
```typescript
// Codice reale dal progetto con path
```

---

## Varianti

| Variante | Quando | Differenza |
|----------|--------|------------|

---

## Anti-Pattern

```typescript
// ❌ NON fare così
```

---

## File di Riferimento

- `path/to/example.ts` - Implementazione reale

---

**Version:** 1.0
**Last Updated:** YYYY-MM-DD
```

### Decisions (`decisions/adr-NNN-*.md`)

Documenta **perché** una scelta architetturale.

```markdown
# ADR-NNN: Titolo Decisione

> **Status:** Accepted | Proposed | Deprecated | Superseded
> **Date:** YYYY-MM-DD
> **Deciders:** [chi ha deciso]

---

## Context

[Situazione che ha portato alla decisione]

---

## Decision

[Cosa abbiamo deciso]

---

## Alternatives Considered

### Opzione A
- Pro: ...
- Con: ...

### Opzione B (scelta)
- Pro: ...
- Con: ...

---

## Consequences

### Positive
- ...

### Negative
- ...

---

## References

- [link a issue/PR/doc]
```

---

## Struttura & Dimensioni

### Regole Dimensione

| Metrica | Limite | Azione se superato |
|---------|--------|-------------------|
| Righe per file | **< 300** | Splitta in file separati |
| Sezioni per file | **< 8** | Estrai sezioni in file dedicati |
| Livelli heading | **< 4** | Troppo annidato = splitta |

### Quando Splittare

```
❌ TROPPO GRANDE:
systems/ORDER-SYSTEM.md (500 righe)
  - Database schema
  - API endpoints
  - Frontend components
  - Payment flow
  - Notifications
  - Analytics

✅ SPLITTATO:
systems/order/
  ├── README.md (overview + link ai sotto-file)
  ├── database.md
  ├── api.md
  ├── frontend.md
  ├── payment.md
  └── notifications.md
```

### Link Incrociati

Usa link relativi per collegare documenti correlati:

```markdown
<!-- In systems/order/api.md -->
## Payment Processing

Per dettagli sul flusso pagamento, vedi [payment.md](./payment.md).

Per schema database ordini, vedi [database.md](./database.md#orders-table).
```

**Convenzioni link:**
- `[testo](./file.md)` - stesso folder
- `[testo](../altro-folder/file.md)` - folder diverso
- `[testo](./file.md#sezione)` - link a heading specifico

### Principio "Single Source of Truth"

| Situazione | Sbagliato | Corretto |
|------------|-----------|----------|
| Stesso concetto in 2 posti | Duplicare contenuto | Link al documento master |
| Riferimento a sistema | Copiare spiegazione | `Vedi [SYSTEM.md](path)` |
| Pattern usato più volte | Ripetere ogni volta | Link a `patterns/*.md` |

---

## Convenzioni

### Naming

| Tipo | Formato | Esempio |
|------|---------|---------|
| Systems | `NOME-SYSTEM.md` | `CUSTOMIZATIONS-SYSTEM.md` |
| Patterns | `nome-pattern.md` | `connected-component.md` |
| Decisions | `adr-NNN-slug.md` | `adr-001-zustand.md` |

### Contenuto

1. **Path file reali** - Sempre includere path completi dal root
2. **Snippet funzionanti** - Codice copiabile, non pseudo-codice
3. **Tabelle** - Preferire tabelle per riferimenti rapidi
4. **Versioning** - Footer con Version e Last Updated

### Lingua

- **Titoli e heading:** Inglese
- **Contenuto:** Italiano (come resto docs)
- **Codice/commenti:** Inglese

---

## Processo di Modifica

### Aggiungere Nuovo Documento

1. Identifica la categoria (systems/patterns/decisions)
2. Crea file seguendo template sopra
3. Aggiungi entry in `README.md`
4. Aggiorna `CLAUDE.md` se documento è di uso frequente

### Aggiornare Documento Esistente

1. Incrementa Version (1.0 → 1.1 per minor, 2.0 per major)
2. Aggiorna Last Updated
3. Se cambio breaking, aggiungi nota in changelog interno

### Deprecare Documento

1. Aggiungi banner in cima:
   ```markdown
   > ⚠️ **DEPRECATED:** Questo documento è obsoleto. Vedi [nuovo-doc.md] invece.
   ```
2. Sposta in `archive/` dopo 30 giorni

---

## Trigger Automatici

### Durante Sviluppo

| Situazione | Azione |
|------------|--------|
| Creo nuovo sistema con 3+ file | Valuta `systems/*.md` |
| Ripeto stesso pattern 3+ volte | Crea `patterns/*.md` |
| Scelgo tra 2+ alternative significative | Crea `decisions/adr-*.md` |
| Modifico sistema documentato | Aggiorna doc esistente |

---

## Domande Fine Sessione (Knowledge Capture)

> **IMPORTANTE:** A fine sessione, rispondi a queste domande per triggerare miglioramenti alla Knowledge Base.

### 1. Apprendimento

| Domanda | Se SI → Azione |
|---------|----------------|
| Ho scoperto come funziona un sistema che non conoscevo? | Documenta in `systems/` |
| Ho capito un pattern che prima non mi era chiaro? | Documenta in `patterns/` |
| Ho trovato documentazione esistente incompleta/errata? | Aggiorna il documento |

### 2. Errori & Soluzioni

| Domanda | Se SI → Azione |
|---------|----------------|
| Ho fatto un errore che potrei rifare in futuro? | Aggiungi a `docs/core/lessons/[topic].md` |
| Ho risolto un problema in modo non ovvio? | Documenta soluzione in lessons o patterns |
| Ho perso tempo per mancanza di documentazione? | Crea la documentazione mancante |

### 3. Decisioni

| Domanda | Se SI → Azione |
|---------|----------------|
| Ho scelto tra 2+ alternative tecniche? | Crea `decisions/adr-*.md` |
| Ho cambiato approccio a metà sessione? Perché? | Documenta il "perché" in ADR |
| Ho scartato un'opzione per motivi importanti? | Documenta in "Alternatives Considered" |

### 4. Sistemi & Codice

| Domanda | Se SI → Azione |
|---------|----------------|
| Ho toccato un sistema complesso non documentato? | Crea `systems/` |
| Ho modificato significativamente un sistema esistente? | Aggiorna doc + incrementa version |
| Ho creato un nuovo flusso end-to-end? | Documenta il flusso in systems |

### 5. Riusabilità

| Domanda | Se SI → Azione |
|---------|----------------|
| Ho scritto codice che potrebbe essere riusato? | Valuta `patterns/` |
| Ho copiato/adattato codice da un altro file? | Il pattern merita documentazione |
| Ho creato un hook/utility/helper generico? | Documenta in patterns |

### 6. Retrospettiva

| Domanda | Se SI → Azione |
|---------|----------------|
| Cosa avrei voluto sapere all'inizio della sessione? | Quella è documentazione mancante |
| Dove ho perso più tempo? | Migliora quella area della KB |
| Cosa farei diversamente la prossima volta? | Aggiungi a lessons o patterns |

---

### Quick Capture Template

Se una domanda triggera un'azione ma non hai tempo di documentare completamente, usa questo template rapido in `docs/knowledge/INBOX.md`:

```markdown
## [Data] - [Titolo breve]

**Tipo:** system | pattern | decision | lesson
**Priorità:** alta | media | bassa
**Contesto:** [1-2 frasi su cosa stavi facendo]
**Insight:** [cosa hai imparato/deciso]
**File coinvolti:** [path principali]
**TODO:** [ ] Espandere in documento completo
```

Questo permette di catturare l'insight senza bloccare la sessione, per poi espanderlo in seguito.

---

## Quality Checklist

Prima di committare documentazione:

```
[ ] Path file sono corretti e verificati
[ ] Snippet di codice sono testati/copiati da file reali
[ ] Tabelle hanno header allineati
[ ] Version e Last Updated presenti
[ ] README.md aggiornato se nuovo file
[ ] CLAUDE.md aggiornato se documento di uso frequente
```

---

## Manutenzione Periodica

### Mensile
- Review documenti non aggiornati da 60+ giorni
- Verifica path file ancora validi
- Consolida patterns simili

### Trimestrale
- Audit completo knowledge base
- Archivia documenti obsoleti
- Aggiorna README.md con priorità

---

**Version:** 1.0
**Last Updated:** 2026-01-26
