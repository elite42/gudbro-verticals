# ADR-001: Standalone Vertical Templates

**Status:** Accepted
**Date:** 2025-11

## Context

GUDBRO sviluppa applicazioni verticali (coffeeshop, wellness, rentals) per diversi settori. Dovevamo decidere se:
- A) Integrare tutto in un monolite con il core platform
- B) Creare template standalone per ogni verticale

## Decision

Abbiamo scelto **B) Standalone Vertical Templates**.

Ogni verticale (es. coffeeshop) è un'applicazione Next.js indipendente che:
- Ha il proprio `package.json` e dipendenze
- Può essere deployata separatamente
- Condivide solo codice esplicitamente importato da `shared/`

## Consequences

**Positivi:**
- Deploy indipendente per ogni cliente
- Customizzazione più facile per verticale
- Nessun rischio di breaking changes cross-verticale
- Team possono lavorare in parallelo

**Negativi:**
- Duplicazione di alcuni pattern (es. i18n nel coffeeshop vs Module 10)
- Aggiornamenti shared richiedono sync manuale
- Più repository/folder da mantenere

## Note

Il coffeeshop ha un sistema i18n standalone (EN/VI/IT) invece di usare Module 10 del core. Questa è una conseguenza accettata della decisione - la migrazione avverrà quando sarà necessaria una 5a lingua.
