# Architecture Decision Records (ADR)

Questo folder contiene le decisioni architetturali significative del progetto GUDBRO.

## Formato

Ogni ADR segue questo template:

```markdown
# ADR-XXX: Titolo

**Status:** Accepted | Proposed | Deprecated
**Date:** YYYY-MM-DD

## Context
Qual era il problema o la situazione?

## Decision
Cosa abbiamo deciso?

## Consequences
Quali sono le implicazioni (positive e negative)?
```

## Indice

| ADR | Titolo | Status | Data |
|-----|--------|--------|------|
| [001](./001-standalone-vertical-templates.md) | Standalone Vertical Templates | Accepted | 2025-11 |
| [002](./002-english-only-database.md) | English-Only Database | Accepted | 2025-12-16 |
| [003](./003-master-ingredients-architecture.md) | Master Ingredients Architecture | Accepted | 2025-12-16 |
| [004](./004-sistema-5-dimensioni.md) | Sistema 5 Dimensioni | Accepted | 2025-12-16 |

## Quando creare un ADR

- Decisioni che impattano l'architettura del sistema
- Scelte tecnologiche significative
- Pattern che devono essere seguiti in tutto il codebase
- Decisioni che potrebbero essere messe in discussione in futuro
