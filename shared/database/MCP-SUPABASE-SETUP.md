# MCP Supabase Setup per Claude Code

> **Guida per configurare e risolvere problemi con il server MCP Supabase**
>
> Creato: 2025-12-18

---

## Cos'è MCP Supabase

Il Model Context Protocol (MCP) permette a Claude Code di interagire direttamente con Supabase:
- Eseguire query SQL
- Creare/modificare tabelle
- Gestire migrazioni
- Debuggare con i log

---

## Setup Iniziale

### 1. Aggiungere il Server MCP

```bash
claude mcp add-json supabase --scope user '{"type":"http","url":"https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF&read_only=false"}'
```

**Per GUDBRO:**
```bash
claude mcp add-json supabase --scope user '{"type":"http","url":"https://mcp.supabase.com/mcp?project_ref=vnaonebbueezrvjekqxs&read_only=false"}'
```

### 2. Verificare lo Stato

```bash
claude mcp list
```

Possibili stati:
- ✓ Connected - Funziona!
- ⚠ Needs authentication - Richiede login
- ✗ Failed to connect - Problema di configurazione

---

## Autenticazione

### Metodo 1: OAuth (Consigliato)

1. Avvia Claude Code: `claude`
2. Digita `/mcp`
3. Si aprirà il browser per login Supabase
4. Autorizza l'accesso
5. **IMPORTANTE:** Riavvia Claude Code dopo l'autenticazione

```bash
# Dopo autenticazione
# Esci da Claude Code (Ctrl+C o /exit)
# Riavvia
claude
```

### Metodo 2: Personal Access Token (PAT)

Se OAuth non funziona (es. ambiente CI):

1. Vai su https://supabase.com/dashboard
2. Click profilo in alto a destra → **Account Preferences**
3. Vai su **Access Tokens**
4. Crea nuovo token
5. Configura MCP con il token:

```bash
claude mcp remove supabase -s user

claude mcp add-json supabase --scope user '{
  "type": "http",
  "url": "https://mcp.supabase.com/mcp?project_ref=vnaonebbueezrvjekqxs",
  "headers": {
    "Authorization": "Bearer YOUR_PAT_TOKEN_HERE"
  }
}'
```

---

## Troubleshooting

### Problema: "Failed to connect"

**Causa comune:** URL malformato o spezzato su più righe

**Soluzione:**
```bash
# Rimuovi configurazione corrotta
claude mcp remove supabase -s user

# Riaggiungi con URL corretto (tutto su una riga!)
claude mcp add-json supabase --scope user '{"type":"http","url":"https://mcp.supabase.com/mcp?project_ref=vnaonebbueezrvjekqxs&read_only=false"}'
```

### Problema: "Needs authentication"

**Soluzione:**
1. Digita `/mcp` in Claude Code
2. Completa il login nel browser
3. **Riavvia Claude Code** (obbligatorio!)

### Problema: Autenticazione OK ma non funziona

**Soluzione:**
```bash
# Riavvia Claude Code
claude --continue  # Per riprendere la conversazione precedente
```

### Problema: Tool MCP non disponibili

Dopo la connessione, i tool MCP iniziano con `mcp__supabase__`. Se non li vedi:
1. Verifica connessione: `claude mcp list`
2. Riavvia Claude Code
3. I tool dovrebbero apparire automaticamente

---

## Comandi MCP Disponibili

Una volta connesso, Claude Code può usare:

| Tool | Descrizione |
|------|-------------|
| `mcp__supabase__execute_sql` | Eseguire query SQL |
| `mcp__supabase__list_tables` | Elencare tabelle |
| `mcp__supabase__get_table_schema` | Schema di una tabella |
| `mcp__supabase__list_projects` | Elencare progetti |

---

## Comandi Utili Claude Code

```bash
# Verificare server MCP configurati
claude mcp list

# Dettagli di un server specifico
claude mcp get supabase

# Rimuovere un server
claude mcp remove supabase -s user

# Avviare con debug MCP
claude --mcp-debug

# Riprendere ultima conversazione
claude --continue
```

---

## Configurazione GUDBRO

```
Project Ref: vnaonebbueezrvjekqxs
URL: https://vnaonebbueezrvjekqxs.supabase.co
Read Only: false (per permettere INSERT/UPDATE/DELETE)
```

---

## Note di Sicurezza

- MCP Supabase è pensato per **sviluppo/test**, non produzione
- Abilita "read_only=true" se vuoi solo leggere dati
- Rivedi sempre le query prima dell'esecuzione
- Non usare su database con dati sensibili di produzione

---

## Sources

- [Supabase MCP Docs](https://supabase.com/docs/guides/getting-started/mcp)
- [Claude Code MCP Tips](https://cloudartisan.com/posts/2025-04-12-adding-mcp-servers-claude-code/)
- [GitHub Discussion - Authentication](https://github.com/orgs/supabase/discussions/39266)

---

**File:** `shared/database/MCP-SUPABASE-SETUP.md`
**Created:** 2025-12-18
**Based on:** Setup reale e troubleshooting durante sessione GUDBRO
