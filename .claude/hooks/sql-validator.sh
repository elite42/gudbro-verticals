#!/bin/bash
# SQL Validator Hook - PostToolUse
# Validates SQL files on Edit/Write for common GUDBRO errors:
# - UUID format (only hex 0-9, a-f)
# - Array syntax ('{a,b}' not '[a,b]')
# - ENUM usage (use TEXT + CHECK instead)
#
# Reads JSON from stdin. Exit 2 = blocking error.

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null || echo "")

# Only validate .sql files
if [[ "$FILE_PATH" != *.sql ]]; then
  exit 0
fi

# Extract content from Write or Edit operations
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
if [ "$TOOL_NAME" = "Write" ]; then
  CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // empty')
elif [ "$TOOL_NAME" = "Edit" ]; then
  CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // empty')
else
  exit 0
fi

if [ -z "$CONTENT" ]; then
  exit 0
fi

ERRORS=""

# Check 1: UUID format - only hex characters (0-9, a-f)
# Find UUIDs that contain non-hex characters (g-z)
BAD_UUIDS=$(echo "$CONTENT" | grep -oE "'[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}'" | grep -i '[g-zG-Z]' || true)
if [ -n "$BAD_UUIDS" ]; then
  ERRORS="${ERRORS}- UUID con caratteri non-hex (solo 0-9, a-f ammessi): ${BAD_UUIDS}\n"
fi

# Check 2: Array syntax - must use '{"a","b"}' not '["a","b"]'
if echo "$CONTENT" | grep -qE "'\[" 2>/dev/null; then
  ERRORS="${ERRORS}- Array syntax errata: usa '{\"a\",\"b\"}' NON '[\"a\",\"b\"]' per array PostgreSQL\n"
fi

# Check 3: ENUM usage - GUDBRO uses TEXT + CHECK, not ENUM
if echo "$CONTENT" | grep -qiE "CREATE\s+TYPE.*AS\s+ENUM" 2>/dev/null; then
  ERRORS="${ERRORS}- Non usare ENUM. GUDBRO usa TEXT + CHECK constraint (ADR #003). Esempio: column TEXT CHECK (column IN ('a','b','c'))\n"
fi

# Check 4: Missing RLS - tables should have RLS enabled
if echo "$CONTENT" | grep -qiE "CREATE\s+TABLE" 2>/dev/null; then
  if ! echo "$CONTENT" | grep -qiE "ALTER\s+TABLE.*ENABLE\s+ROW\s+LEVEL\s+SECURITY" 2>/dev/null; then
    ERRORS="${ERRORS}- CREATE TABLE senza ENABLE ROW LEVEL SECURITY. Tutte le tabelle GUDBRO richiedono RLS.\n"
  fi
fi

if [ -n "$ERRORS" ]; then
  echo -e "SQL Validation errors in $FILE_PATH:\n$ERRORS" >&2
  exit 2
fi

echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"SQL file validated: UUID format OK, array syntax OK, no ENUM usage."}}'
exit 0
