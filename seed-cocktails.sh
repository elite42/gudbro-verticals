#!/bin/bash
# Script per inserire i cocktails in Supabase

if [ -z "$SERVICE_ROLE_KEY" ]; then
  echo "Error: SERVICE_ROLE_KEY environment variable is not set."
  echo "Usage: SERVICE_ROLE_KEY=your-key-here ./seed-cocktails.sh"
  exit 1
fi

npx tsx shared/database/cocktails/scripts/seed-all-cocktails.ts
