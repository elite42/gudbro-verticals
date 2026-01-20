---
description: 'Start Ralph Wiggum loop - iterative self-referential development'
argument-hint: 'PROMPT [--max-iterations N] [--completion-promise TEXT]'
allowed-tools:
  ['Bash("$CLAUDE_PROJECT_DIR"/.claude/scripts/setup-ralph-loop.sh:*)']
---

# Ralph Loop Command

Execute the setup script to initialize the Ralph loop:

```bash
"$CLAUDE_PROJECT_DIR"/.claude/scripts/setup-ralph-loop.sh $ARGUMENTS
```

Please work on the task. When you try to exit, the Ralph loop will feed the SAME PROMPT back to you for the next iteration. You'll see your previous work in files and git history, allowing you to iterate and improve.

CRITICAL RULE: If a completion promise is set, you may ONLY output it when the statement is completely and unequivocally TRUE. Do not output false promises to escape the loop.

## Examples

```bash
/ralph-loop Build a REST API --completion-promise 'DONE' --max-iterations 20
/ralph-loop Fix all TypeScript errors --max-iterations 10
/ralph-loop Translate remaining ingredients --completion-promise 'ALL_TRANSLATED'
```
