# End Session Checklist System

> **Sistema checklist fine sessione condizionale**
> **Obiettivo:** Prevenire dimenticanze, accumulare conoscenza (compounding engineering)

---

## Quick Reference

| Categoria  | Trigger                       | Comando                 |
| ---------- | ----------------------------- | ----------------------- |
| `feature`  | Nuova funzionalita completata | `/end-session feature`  |
| `bugfix`   | Bug risolto                   | `/end-session bugfix`   |
| `database` | Migration applicata           | `/end-session database` |
| `infra`    | Config Vercel/CI/Deploy       | `/end-session infra`    |
| `refactor` | Refactoring significativo     | `/end-session refactor` |
| `ai`       | Modifiche AI Co-Manager       | `/end-session ai`       |
| `security` | Hardening/fix sicurezza       | `/end-session security` |
| `docs`     | Solo documentazione           | `/end-session docs`     |

---

## Checklist per Categoria

### Feature (`/end-session feature`)

```
[ ] Spostare task da 2-IN-PROGRESS -> 4-DONE
[ ] Aggiornare SESSION-LOG.md (data, focus, completato, commits)
[ ] Se impatta UX: aggiornare PRODUCT.md sezione Features Map
[ ] Se nuova migration: aggiornare conteggio in DATABASE-SCHEMA.md
[ ] Elencare file creati/modificati
[ ] Proporre commit message
[ ] Chiedere se pushare
```

**Documenti coinvolti:** 4-DONE.md, SESSION-LOG.md, PRODUCT.md (se impatta UX)

---

### Bugfix (`/end-session bugfix`)

```
[ ] Se errore evitabile: aggiungere a LESSONS-LEARNED.md
[ ] Aggiornare SESSION-LOG.md
[ ] Proporre commit message
[ ] Chiedere se pushare
```

**Documenti coinvolti:** LESSONS-LEARNED.md (se errore evitabile), SESSION-LOG.md

---

### Database (`/end-session database`)

```
[ ] Verificare migration applicata con successo
[ ] Aggiornare conteggio migrations in CLAUDE.md sezione 5
[ ] Aggiornare DATABASE-SCHEMA.md se schema cambiato
[ ] Check security advisors (get_advisors)
[ ] Spostare task se presente
[ ] Proporre commit message
[ ] Chiedere se pushare
```

**Documenti coinvolti:** DATABASE-SCHEMA.md, CLAUDE.md (sezione 5)

---

### Infra (`/end-session infra`)

```
[ ] Aggiornare VERCEL-SETUP.md se config cambiata
[ ] Aggiornare RUNBOOK.md se nuova procedura
[ ] Aggiornare SESSION-LOG.md
[ ] Testare deploy funzionante
[ ] Proporre commit message
[ ] Chiedere se pushare
```

**Documenti coinvolti:** VERCEL-SETUP.md, RUNBOOK.md, SESSION-LOG.md

---

### Refactor (`/end-session refactor`)

```
[ ] Aggiornare SESSION-LOG.md
[ ] Documentare pattern/decisione se significativo
[ ] Proporre commit message
[ ] Chiedere se pushare
```

**Documenti coinvolti:** SESSION-LOG.md

---

### AI (`/end-session ai`)

```
[ ] Aggiornare AI-SYSTEM.md
[ ] Aggiornare SESSION-LOG.md
[ ] Proporre commit message
[ ] Chiedere se pushare
```

**Documenti coinvolti:** AI-SYSTEM.md, SESSION-LOG.md

---

### Security (`/end-session security`)

```
[ ] Aggiornare SECURITY-ROADMAP.md
[ ] Aggiungere a LESSONS-LEARNED.md se pattern riusabile
[ ] Aggiornare SESSION-LOG.md
[ ] Proporre commit message
[ ] Chiedere se pushare
```

**Documenti coinvolti:** SECURITY-ROADMAP.md, LESSONS-LEARNED.md, SESSION-LOG.md

---

### Docs (`/end-session docs`)

```
[ ] Verificare markdown valido
[ ] Proporre commit message
[ ] Chiedere se pushare
```

**Documenti coinvolti:** Nessun update automatico richiesto

---

## Checklist Universale (sempre eseguita)

```
[ ] Git status - ci sono modifiche non committate?
[ ] Esistono file nuovi non tracciati?
[ ] Il build passa? (pnpm build)
[ ] Aggiornare CLAUDE.md sezione 0 se task focus cambiata
```

---

## Compounding Engineering

> "Se hai imparato qualcosa in questa sessione che potrebbe servire in futuro, documentalo prima di chiudere."

Il sistema accumula valore nel tempo. Ogni sessione arricchisce la **Knowledge Base**:

| Tipo Conoscenza | Dove Documentare | Compound Effect |
|-----------------|------------------|-----------------|
| **Errori** | `docs/core/lessons/*.md` | Non si ripetono |
| **Sistemi** | `docs/knowledge/systems/` | Non si riesplorano |
| **Pattern** | `docs/knowledge/patterns/` | Si riusano |
| **Decisioni** | `docs/knowledge/decisions/` | Non si ridiscutono |

### Come Applicare

1. **Rispondi alle domande** in [CONTRIBUTING.md](../knowledge/CONTRIBUTING.md) (sezione "Domande Fine Sessione")
2. **Se hai tempo**: crea documento completo in `docs/knowledge/`
3. **Se non hai tempo**: quick capture in [INBOX.md](../knowledge/INBOX.md)

### Domande Chiave

| Domanda | Se SI → Azione |
|---------|----------------|
| Ho scoperto come funziona un sistema? | `knowledge/systems/` |
| Ho usato un pattern riutilizzabile? | `knowledge/patterns/` |
| Ho scelto tra alternative tecniche? | `knowledge/decisions/` |
| Ho fatto errori da non ripetere? | `core/lessons/*.md` |
| Cosa avrei voluto sapere all'inizio? | Quella è doc mancante |

**Guida completa:** [docs/knowledge/CONTRIBUTING.md](../knowledge/CONTRIBUTING.md)
