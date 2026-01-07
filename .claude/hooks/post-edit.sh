#!/bin/bash
# Post-Edit Hook - Auto-format + verification after file edits
# Inspired by Boris Cherny's Claude Code setup
# Runs after Edit/Write tool usage

set -e

# Read JSON input from stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null || echo "")

# Exit silently if no file path
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Get file extension
EXT="${FILE_PATH##*.}"

# ============================================================================
# AUTO-FORMAT (Boris's approach: format after every edit)
# ============================================================================

# TypeScript/JavaScript/JSON/Markdown files - auto-format with Prettier
if [[ "$EXT" == "ts" ]] || [[ "$EXT" == "tsx" ]] || [[ "$EXT" == "js" ]] || [[ "$EXT" == "jsx" ]] || [[ "$EXT" == "json" ]] || [[ "$EXT" == "md" ]]; then
  # Run prettier on the specific file (non-blocking with || true)
  cd "$CLAUDE_PROJECT_DIR" && npx prettier --write "$FILE_PATH" > /dev/null 2>&1 || true
fi

# ============================================================================
# CONTEXT REMINDERS (additional guidance for Claude)
# ============================================================================

# TypeScript/JavaScript files - suggest typecheck
if [[ "$EXT" == "ts" ]] || [[ "$EXT" == "tsx" ]] || [[ "$EXT" == "js" ]] || [[ "$EXT" == "jsx" ]]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"File auto-formatted. Consider running /typecheck or /verify after completing changes."}}'
  exit 0
fi

# SQL files - remind about validation
if [[ "$EXT" == "sql" ]]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"SQL file modified. Remember: UUID only hex (0-9,a-f), array syntax is {a,b} not [a,b]."}}'
  exit 0
fi

# Markdown in docs - remind to keep backlog updated
if [[ "$FILE_PATH" == *"docs/"* ]] && [[ "$EXT" == "md" ]]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"Documentation auto-formatted. Keep backlog and CLAUDE.md in sync."}}'
  exit 0
fi

exit 0
