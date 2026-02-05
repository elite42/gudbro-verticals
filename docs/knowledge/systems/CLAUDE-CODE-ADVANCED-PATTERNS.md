# Claude Code: Pattern Avanzati (Corretti)

## Hooks Self-Validation, Task System, Prompt/Agent Hooks

**Data:** 2026-02-05
**Fonte originale:** Analisi video Agentic Engineer (Disler) - corretta e verificata contro documentazione ufficiale
**Documentazione ufficiale:** https://code.claude.com/docs/en/hooks

---

## Indice

1. [Reference: Sintassi Corretta degli Hooks](#1-reference-sintassi-corretta-degli-hooks)
2. [Reference: Task System](#2-reference-task-system)
3. [Feature che GUDBRO non usa ancora](#3-feature-che-gudbro-non-usa-ancora)
4. [Proposte di implementazione per GUDBRO](#4-proposte-di-implementazione-per-gudbro)

---

## 1. Reference: Sintassi Corretta degli Hooks

### 1.1 Dove si definiscono gli hooks

| Location                                                | Scope                     | Shareable       |
| ------------------------------------------------------- | ------------------------- | --------------- |
| `~/.claude/settings.json`                               | Tutti i progetti          | No              |
| `.claude/settings.json`                                 | Progetto corrente         | Si (repo)       |
| `.claude/settings.local.json`                           | Progetto corrente         | No (gitignored) |
| Plugin `hooks/hooks.json`                               | Dove il plugin e' attivo  | Si              |
| Frontmatter di **Skills** (`.claude/skills/*/SKILL.md`) | Mentre la skill e' attiva | Si              |
| Frontmatter di **Agents** (`.claude/agents/*.md`)       | Mentre l'agent e' attivo  | Si              |

> **NOTA:** I custom slash commands (`.claude/commands/`) sono stati mergiati nelle Skills.
> Supportano lo stesso frontmatter delle skills, inclusi gli hooks.

### 1.2 Hook Events (nomi PascalCase)

| Event                | Quando scatta                    | Supporta matcher                | Puo' bloccare |
| -------------------- | -------------------------------- | ------------------------------- | ------------- |
| `SessionStart`       | Inizio/resume sessione           | startup, resume, clear, compact | No            |
| `UserPromptSubmit`   | Utente invia prompt              | No                              | Si            |
| `PreToolUse`         | Prima dell'esecuzione di un tool | Nome del tool (regex)           | Si            |
| `PermissionRequest`  | Dialog di permesso               | Nome del tool (regex)           | Si            |
| `PostToolUse`        | Dopo esecuzione tool riuscita    | Nome del tool (regex)           | No (feedback) |
| `PostToolUseFailure` | Dopo esecuzione tool fallita     | Nome del tool (regex)           | No (feedback) |
| `Notification`       | Notifica inviata                 | Tipo notifica                   | No            |
| `SubagentStart`      | Subagent creato                  | Nome agent type                 | No            |
| `SubagentStop`       | Subagent completato              | Nome agent type                 | Si            |
| `Stop`               | Claude finisce di rispondere     | No                              | Si            |
| `PreCompact`         | Prima della compaction           | manual, auto                    | No            |
| `SessionEnd`         | Fine sessione                    | Motivo uscita                   | No            |

### 1.3 Matcher: Regex, NON Python

```json
// CORRETTO - regex con pipe
"matcher": "Edit|Write"
"matcher": "Bash"
"matcher": "mcp__supabase__.*"
"matcher": "Edit|Write|MultiEdit"

// SBAGLIATO - NON e' Python
"matcher": "tool in ['read', 'write', 'edit']"
"matcher": "tool == 'write' and '.json' in tool_input"
```

I matcher filtrano SOLO sul nome del tool (o agent type per SubagentStart/Stop).
Non puoi filtrare sul contenuto di tool_input nel matcher.

### 1.4 Tre tipi di Hook Handler

| Type      | Cosa fa                                        | Quando usare                           |
| --------- | ---------------------------------------------- | -------------------------------------- |
| `command` | Esegue un comando shell                        | Validazioni, formatting, script custom |
| `prompt`  | Invia prompt a un modello Claude (single-turn) | Decisioni yes/no basate su contesto    |
| `agent`   | Spawna subagent con tool access (multi-turn)   | Verifiche che richiedono lettura file  |

### 1.5 Struttura in settings.json

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/my-script.sh",
            "timeout": 30
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Verifica se tutti i task sono completati. Contesto: $ARGUMENTS. Rispondi con {\"ok\": true} o {\"ok\": false, \"reason\": \"motivo\"}.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### 1.6 Struttura in Frontmatter (Skills e Agents)

```yaml
---
name: my-skill
description: Descrizione della skill
hooks:
  PostToolUse:
    - matcher: 'Write|Edit'
      hooks:
        - type: command
          command: './scripts/validate.sh'
  Stop:
    - hooks:
        - type: prompt
          prompt: 'Verifica completamento. $ARGUMENTS'
---
```

> In agents, `Stop` viene convertito automaticamente in `SubagentStop`.

### 1.7 Input: JSON via stdin (NON variabili d'ambiente)

Gli hook scripts ricevono un JSON via **stdin**, non tramite variabili d'ambiente.

```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/path/to/project",
  "permission_mode": "default",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.ts",
    "content": "..."
  },
  "tool_response": {
    "filePath": "/path/to/file.ts",
    "success": true
  }
}
```

**Variabili d'ambiente disponibili:**

| Variabile               | Disponibilita'              | Descrizione                  |
| ----------------------- | --------------------------- | ---------------------------- |
| `$CLAUDE_PROJECT_DIR`   | Ovunque nel campo `command` | Root del progetto            |
| `${CLAUDE_PLUGIN_ROOT}` | Solo plugin hooks           | Root del plugin              |
| `$CLAUDE_ENV_FILE`      | Solo SessionStart hooks     | File per persistere env vars |
| `$CLAUDE_CODE_REMOTE`   | Ambienti remoti             | "true" in web environments   |

> **`$TOOL_INPUT_PATH` NON ESISTE.** Il tool input arriva via stdin come JSON.

### 1.8 Exit Codes

| Exit code | Significato          | Comportamento                             |
| --------- | -------------------- | ----------------------------------------- |
| `0`       | Successo             | Stdout parsato come JSON (se presente)    |
| `2`       | Errore bloccante     | Stderr mostrato a Claude, azione bloccata |
| `altro`   | Errore non bloccante | Stderr visibile in verbose mode, continua |

### 1.9 Script Template (Bash)

```bash
#!/bin/bash
# Template per hook script

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Logica di validazione
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Successo con context
echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"Info per Claude"}}'
exit 0

# Oppure: blocco con errore
# echo "Errore: descrizione" >&2
# exit 2
```

### 1.10 Script Template (Python)

```python
#!/usr/bin/env python3
import json, sys

def main():
    input_data = json.load(sys.stdin)
    tool_name = input_data.get("tool_name", "")
    tool_input = input_data.get("tool_input", {})
    file_path = tool_input.get("file_path", "")

    # Logica di validazione
    if not file_path:
        sys.exit(0)

    # Successo con context
    result = {
        "hookSpecificOutput": {
            "hookEventName": input_data.get("hook_event_name"),
            "additionalContext": "Info per Claude"
        }
    }
    print(json.dumps(result))
    sys.exit(0)

    # Oppure: blocco con errore
    # print("Errore: descrizione", file=sys.stderr)
    # sys.exit(2)

if __name__ == "__main__":
    main()
```

---

## 2. Reference: Task System

### 2.1 Tool disponibili

| Tool         | Descrizione                                       |
| ------------ | ------------------------------------------------- |
| `TaskCreate` | Crea un task con subject, description, activeForm |
| `TaskUpdate` | Aggiorna stato, dipendenze, owner                 |
| `TaskList`   | Lista tutti i task                                |
| `TaskGet`    | Dettagli di un task specifico                     |

### 2.2 Dipendenze

```
TaskUpdate(taskId: "2", addBlockedBy: ["1"])  // Task 2 aspetta task 1
TaskUpdate(taskId: "1", addBlocks: ["2"])     // Equivalente inverso
```

I task formano un DAG (directed acyclic graph). Quando un task bloccante viene completato,
i task dipendenti vengono automaticamente sbloccati.

### 2.3 Multi-sessione

Impostando `CLAUDE_CODE_TASK_LIST_ID`, piu' sessioni Claude Code condividono la stessa task list:

```bash
CLAUDE_CODE_TASK_LIST_ID=my-shared-list claude
```

### 2.4 Pattern Builder + Validator

Non e' un pattern ufficiale, ma e' un approccio valido:

1. Un agent (o sessione) "builder" implementa il codice
2. Un agent (o sessione) "validator" verifica il risultato
3. Comunicano tramite task list condivisa

> **Per GUDBRO:** GSD gia' gestisce questo pattern internamente con research, planning,
> e execution agents. Il Task System potrebbe complementare GSD per coordinazione
> tra worktree paralleli.

---

## 3. Feature che GUDBRO non usa ancora

### 3.1 Prompt-based Hooks (type: "prompt")

**Cosa sono:** Hook che inviano un prompt a un modello Claude (Haiku di default) per una decisione yes/no, senza eseguire uno script shell.

**Stato attuale GUDBRO:** Tutti e 3 gli hook attuali sono `type: "command"`.

**Vantaggio:** Decisioni intelligenti basate su contesto naturale, senza scrivere script.

**Esempio - Stop hook intelligente:**

```json
{
  "type": "prompt",
  "prompt": "Analizza la conversazione e verifica: 1) Tutti i task richiesti sono completati? 2) Ci sono errori non risolti? 3) Il backlog e' aggiornato? Contesto: $ARGUMENTS",
  "timeout": 30
}
```

Il modello risponde con `{"ok": true}` o `{"ok": false, "reason": "..."}`.

### 3.2 Agent-based Hooks (type: "agent")

**Cosa sono:** Come i prompt hooks, ma con accesso multi-turn a tool (Read, Grep, Glob). Un subagent esplora il codice prima di decidere.

**Vantaggio:** Verifiche che richiedono ispezione di file reali, non solo il contesto dell'hook.

**Esempio - Stop hook che verifica test:**

```json
{
  "type": "agent",
  "prompt": "Verifica che tutti i test unitari passino. Esegui la test suite e controlla i risultati. $ARGUMENTS",
  "timeout": 120
}
```

### 3.3 Hooks in Agent Frontmatter

**Stato attuale GUDBRO:** I 6 agents non hanno hooks nel loro frontmatter.
Gli hooks sono solo in `settings.json` (globali).

**Vantaggio:** Hooks scoped - attivi solo quando l'agent gira, cleanup automatico.

**Esempio - verify-app con hooks:**

```yaml
---
name: verify-app
description: Verifica completa post-modifiche
tools: Read, Bash, Grep, Glob
hooks:
  PostToolUse:
    - matcher: 'Bash'
      hooks:
        - type: command
          command: '"$CLAUDE_PROJECT_DIR"/.claude/hooks/capture-test-failures.sh'
  Stop:
    - hooks:
        - type: prompt
          prompt: 'L''agent verify-app sta per terminare. Verifica che abbia controllato: 1) typecheck 2) build 3) security advisors 4) test suite. Se manca qualcosa, rispondi {"ok": false, "reason": "Manca: ..."}. Contesto: $ARGUMENTS'
---
```

### 3.4 Hooks in Skills Frontmatter

**Stato attuale GUDBRO:** 3 skills esistono ma non hanno hooks nel frontmatter.
I 14 commands non hanno hooks.

**Vantaggio:** Validazione automatica scoped alla skill/command specifica.

### 3.5 Async Hooks (Background)

**Cosa sono:** Hook con `"async": true` che girano in background senza bloccare Claude.

**Vantaggio:** Test suite o validazioni lunghe che non interrompono il flusso.

**Esempio:**

```json
{
  "type": "command",
  "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/run-tests-background.sh",
  "async": true,
  "timeout": 300
}
```

### 3.6 Hook `once` per Skills

**Cosa:** Il campo `"once": true` fa eseguire l'hook una sola volta per sessione, poi lo rimuove.

**Utile per:** Setup iniziale, controlli one-shot all'attivazione di una skill.

### 3.7 Persistent Memory per Agents

**Cosa:** Campo `memory` nel frontmatter degli agents (user/project/local).

**Stato attuale GUDBRO:** Non usato.

**Vantaggio:** L'agent accumula conoscenza tra sessioni. Esempio: il code-reviewer impara
i pattern ricorrenti del progetto.

---

## 4. Proposte di implementazione per GUDBRO

### Proposta A: Prompt-based Stop Hook (Completamento Intelligente)

**Problema:** L'attuale Stop hook gestisce solo ralph-loop. Se Claude si ferma senza
aver completato il lavoro (fuori da ralph-loop), non c'e' nessun controllo.

**Soluzione:** Aggiungere un prompt-based Stop hook che verifica il completamento:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/stop-hook.sh"
          }
        ]
      },
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Claude sta per terminare. Analizza il transcript e verifica: 1) Il task richiesto dall'utente e' stato completato? 2) Ci sono errori non risolti? 3) Se l'utente ha chiesto un commit, e' stato fatto? Rispondi {\"ok\": true} se tutto e' completo, oppure {\"ok\": false, \"reason\": \"motivo\"} se serve altro lavoro. Contesto: $ARGUMENTS",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**Rischio:** Potrebbe rallentare la fine di ogni turno. Il `stop_hook_active` flag nel JSON input previene loop infiniti.

**Impatto:** Medio - previene incomplete work, soprattutto con GSD.

### Proposta B: SQL Validator Hook (PostToolUse)

**Problema:** Il post-edit.sh attuale mostra solo un reminder testuale per file SQL.
Non valida realmente il contenuto.

**Soluzione:** Script che valida pattern SQL critici:

```bash
#!/bin/bash
# .claude/hooks/sql-validator.sh
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ "$FILE_PATH" != *.sql ]]; then
  exit 0
fi

CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // .tool_input.new_string // empty')
ERRORS=""

# Check UUID format (solo hex)
if echo "$CONTENT" | grep -qE "'[0-9a-fA-F-]{36}'" 2>/dev/null; then
  BAD_UUIDS=$(echo "$CONTENT" | grep -oE "'[^']{36}'" | grep -vE "^'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'$")
  if [ -n "$BAD_UUIDS" ]; then
    ERRORS="$ERRORS\n- UUID non valido (solo hex 0-9,a-f): $BAD_UUIDS"
  fi
fi

# Check array syntax
if echo "$CONTENT" | grep -qE "'\[" 2>/dev/null; then
  ERRORS="$ERRORS\n- Array syntax errata: usa '{\"a\",\"b\"}' NON '[\"a\",\"b\"]'"
fi

if [ -n "$ERRORS" ]; then
  echo -e "SQL Validation errors in $FILE_PATH:$ERRORS" >&2
  exit 2
fi

echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"SQL validated."}}'
exit 0
```

**Integrazione:** Aggiungere come secondo handler nel PostToolUse esistente, con matcher `"Edit|Write"`.

**Impatto:** Alto - previene errori SQL ricorrenti (vedi docs/core/lessons/database.md).

### Proposta C: Agent Memory per verify-app

**Problema:** Il verify-app agent non ricorda errori ricorrenti tra sessioni.

**Soluzione:** Aggiungere `memory: project` al frontmatter:

```yaml
---
name: verify-app
description: Verifica completa post-modifiche (typecheck, build, security, test)
tools: Read, Bash, Grep, Glob
model: inherit
memory: project
---

... (prompt esistente) ...

**Update your agent memory** con pattern di errori ricorrenti, build failures comuni,
e soluzioni trovate. Questo migliora le verifiche nelle sessioni future.
```

**Vantaggio:** Il verify-app costruisce una knowledge base di errori ricorrenti.

**Impatto:** Basso costo, alto valore nel tempo.

### Proposta D: Hooks Scoped in db-status Command

**Problema:** Il comando `/db-status` potrebbe auto-validare i risultati delle query.

**Soluzione:** Convertire `db-status.md` da command a skill con hooks:

```yaml
---
name: db-status
description: Stato database, traduzioni, security e performance
allowed-tools: Bash, Read
hooks:
  PostToolUse:
    - matcher: 'Bash'
      hooks:
        - type: command
          command: '"$CLAUDE_PROJECT_DIR"/.claude/hooks/validate-db-output.sh'
          once: true
---
```

**Impatto:** Basso - miglioramento incrementale.

### Proposta E: Async Test Runner dopo File Edit

**Problema:** Dopo ogni modifica a file TS, i test non vengono eseguiti automaticamente.
L'utente deve ricordarsi di eseguire `/verify`.

**Soluzione:** Hook async PostToolUse che esegue i test in background:

```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/async-test-runner.sh",
      "async": true,
      "timeout": 120,
      "statusMessage": "Running tests in background..."
    }
  ]
}
```

Lo script esegue `pnpm test:run` solo se il file modificato e' .ts/.tsx e riporta
i risultati come `systemMessage` al turno successivo.

**Rischio:** Potrebbe essere rumoroso su edit frequenti. Valutare filtro per frequenza.

**Impatto:** Alto - catch errori in tempo reale senza interrompere il flusso.

### Riepilogo priorita'

| Proposta                   | Priorita' | Sforzo | Impatto                    |
| -------------------------- | --------- | ------ | -------------------------- |
| B: SQL Validator           | Alta      | Basso  | Previene errori ricorrenti |
| C: Agent Memory verify-app | Alta      | Minimo | Knowledge persistente      |
| A: Prompt Stop Hook        | Media     | Basso  | Previene lavoro incompleto |
| E: Async Test Runner       | Media     | Medio  | Feedback in tempo reale    |
| D: Hooks in db-status      | Bassa     | Basso  | Miglioramento incrementale |

---

## Appendice: Errori del Report Originale

Il report originale (analisi video Disler) conteneva errori significativi nella sintassi.
Questo documento li corregge. Per reference, i principali errori erano:

| Aspetto              | Report originale (errato)              | Corretto                                         |
| -------------------- | -------------------------------------- | ------------------------------------------------ |
| Event names          | `post_tool_use` (snake_case)           | `PostToolUse` (PascalCase)                       |
| Matcher              | `"tool in ['read', 'write']"` (Python) | `"Read\|Write"` (regex)                          |
| Handler key          | `script: "path.sh"`                    | `hooks: [{ type: command, command: "path.sh" }]` |
| Input method         | `$TOOL_INPUT_PATH` (env var)           | JSON via stdin                                   |
| Hook types           | Solo `command` menzionato              | `command`, `prompt`, `agent`                     |
| Slash commands hooks | Dichiarato supportato                  | Supportato solo come skills (merge avvenuto)     |
