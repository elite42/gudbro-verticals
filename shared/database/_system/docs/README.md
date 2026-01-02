# Database Documentation

> **Documentazione modulare per il sistema database GUDBRO**
>
> **Ultimo aggiornamento:** 2025-12-20

---

## Indice File

| File | Descrizione | Righe |
|------|-------------|-------|
| [../PROCEDURE-NEW-DATABASE.md](../PROCEDURE-NEW-DATABASE.md) | Guida step-by-step per creare nuovi database | ~315 |
| [../DATABASE-STANDARDS.md](../DATABASE-STANDARDS.md) | Standard e convenzioni (v1.3) | ~400 |
| [LESSONS-LEARNED.md](LESSONS-LEARNED.md) | Tutte le lezioni apprese (#1-37) | ~230 |
| [VALIDATION-CHECKLIST.md](VALIDATION-CHECKLIST.md) | Checklist pre/post import | ~120 |
| [SUPABASE-COMMANDS.md](SUPABASE-COMMANDS.md) | Comandi Supabase testati | ~180 |

---

## Come Usare Questa Documentazione

### Per Creare un Nuovo Database

1. Leggi `PROCEDURE-NEW-DATABASE.md` (procedura principale)
2. Consulta `DATABASE-STANDARDS.md` per convenzioni
3. Usa `VALIDATION-CHECKLIST.md` per pre/post checks
4. Consulta `SUPABASE-COMMANDS.md` per query

### Per Risolvere Errori

1. Consulta `LESSONS-LEARNED.md` - contiene 37 lezioni documentate
2. Ogni lezione ha: problema, causa, soluzione

### Per Comandi Supabase

1. Usa `SUPABASE-COMMANDS.md` - tutti i comandi sono testati
2. Credenziali e pattern già pronti

---

## Struttura Modulare

```
shared/database/
├── PROCEDURE-NEW-DATABASE.md   ← Procedura principale (slim)
├── DATABASE-STANDARDS.md       ← Standard e convenzioni
├── docs/
│   ├── README.md               ← Questo file (indice)
│   ├── LESSONS-LEARNED.md      ← Lezioni apprese
│   ├── VALIDATION-CHECKLIST.md ← Checklist validazione
│   └── SUPABASE-COMMANDS.md    ← Comandi Supabase
└── ...database folders...
```

---

## Changelog Modularizzazione

| Data | Modifica |
|------|----------|
| 2025-12-20 | Estratto LESSONS-LEARNED.md (37 lezioni) |
| 2025-12-20 | Estratto VALIDATION-CHECKLIST.md |
| 2025-12-20 | Estratto SUPABASE-COMMANDS.md |
| 2025-12-20 | Riscritto PROCEDURE-NEW-DATABASE.md (da ~1230 a ~315 righe) |
| 2025-12-20 | Creato README.md (questo file) |

---

**Directory:** `shared/database/docs/`
