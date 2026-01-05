# Backlog Kanban

Sistema di task management per GUDBRO.

## Struttura

```
docs/backlog/
├── 1-TODO.md         📋 Task da fare (ordinate per priorità)
├── 2-IN-PROGRESS.md  🔄 Task in lavorazione (max 3)
├── 3-TESTING.md      🧪 Task da testare/validare
├── 4-DONE.md         ✅ Archivio completati
└── README.md         📖 Questo file
```

## Workflow

```
1-TODO → 2-IN-PROGRESS → 3-TESTING → 4-DONE
```

1. **Prendi** task da TODO
2. **Sposta** in IN-PROGRESS quando inizi
3. **Sposta** in TESTING quando finisci il codice
4. **Sposta** in DONE dopo validazione

## Regole

- **Max 3 IN-PROGRESS** alla volta
- **Priorità**: P0 > P1 > P2 > P3
- **Aggiorna** Last Updated quando modifichi
- **Non eliminare** da DONE (è lo storico)

## Per Claude

```
INIZIO SESSIONE:
1. Leggi 2-IN-PROGRESS.md (cosa stiamo facendo)
2. Leggi 3-TESTING.md (cosa testare)
3. Leggi 1-TODO.md (prossime task)

DURANTE:
- Aggiorna status quando lavori

FINE SESSIONE:
- Sposta task completate
- Aggiorna Last Updated
```
