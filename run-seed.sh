#!/bin/bash
source .env.seed
export SERVICE_ROLE_KEY
npx tsx shared/database/cocktails/scripts/seed-all-cocktails.ts
