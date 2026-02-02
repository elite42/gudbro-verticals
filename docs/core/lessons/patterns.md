# Lessons: Workflow & Patterns

## Errori Comuni

| Errore                       | Causa                              | Soluzione                                |
| ---------------------------- | ---------------------------------- | ---------------------------------------- |
| Feature già esistente        | Non cercato prima                  | Grep/Glob PRIMA di implementare          |
| Tentare senza verificare     | Confidenza < 95% ma procedo        | **VERIFY online** prima                  |
| Warning ignorati             | Visti ma non agiti                 | **Agire subito** su warning/error        |
| Doc grandi → qualità persa   | Processare tutto insieme           | **Layered approach**                     |
| Blocco senza commit          | Task troppo lunga senza checkpoint | **Commit incrementali** ogni ~30 min     |
| CLAUDE.md non trovato        | Sessione avviata da ~              | `cd progetto && claude` o alias          |
| Roadmap/docs non committati  | Sessione lunga senza commit        | **Commit docs subito**                   |
| Backlog non sync con roadmap | Task create ma non aggiunte        | **Sync backlog** dopo planning           |
| Rimuovere link per fix 404   | Link → 404                         | **Creare la pagina**, non rimuovere link |
| Audit incompleto 75%         | Route groups non considerati       | **Glob fresh** su `**/page.tsx`          |
| **Procedere per tentativi**  | Ipotesi senza dati/log             | **LEGGI I LOG PRIMA** di ipotizzare      |
| File non committati          | Creati ma non `git add`            | **`git status`** prima di debug build    |
| Debug cieco su CI/Deploy     | Non ho accesso diretto ai log      | **CHIEDI i log all'utente** subito       |

## Patterns Corretti

| Area            | Pattern Corretto                       | Anti-Pattern                  |
| --------------- | -------------------------------------- | ----------------------------- |
| Error handling  | `try/catch` con logging                | Silent failures               |
| Warnings/Errors | Agire subito, fix o segnala            | Ignorare e proseguire         |
| Doc grandi      | Layered: sezioni rilevanti solo        | Leggere/processare tutto      |
| Task lunghe     | Commit ogni ~30 min                    | Task 2h+ senza checkpoint     |
| MCP heavy ops   | Prima commit, poi type gen             | Type gen durante sviluppo     |
| Dev server port | Verifica `lsof -i :3023` prima         | Assumere porta libera         |
| Hydration SSR   | `mounted` state + useEffect            | localStorage a render         |
| Feature 404     | Creare la pagina mancante              | Rimuovere il link             |
| Dev-only logic  | Componente separato `DevX`             | if(isDev) dentro comp prod    |
| Planning docs   | Commit roadmaps/specs subito           | Creare file senza commit      |
| Backlog sync    | Aggiorna 1-TODO + 4-DONE dopo planning | Roadmap senza sync            |
| Session start   | `cd progetto && claude` o alias        | Avviare Claude da ~           |
| KB Backoffice   | Aggiorna `lib/kb/kb-content.ts`        | Dimenticare docs utente       |
| **Debug CI**    | **Dati → Analisi → Piano → Azione**    | Tentativi casuali senza dati  |
| **Pre-deploy**  | `git status` per file non committati   | Debug build senza check files |
| **Log access**  | Chiedi log all'utente se serve         | Ipotizzare per ore senza dati |

## UX Patterns

| Area            | Pattern Corretto                 | Anti-Pattern            |
| --------------- | -------------------------------- | ----------------------- |
| Settings UX     | Tabs orizzontali                 | Submenu sidebar         |
| Regional market | Considera piattaforme Asia       | Default occidentali     |
| Service models  | Capire modello servizio locale   | One-size-fits-all       |
| Entry tier      | Tier base come piede nella porta | Forzare full package    |
| QR value        | QR utile anche senza ordering    | QR = solo ordering      |
| UA/Regex check  | Specifici prima, generici dopo   | Chrome prima di Samsung |
