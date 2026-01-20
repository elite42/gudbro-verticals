#!/bin/bash

# Custom Vercel Ignored Build Step script for backoffice
# This script determines whether to skip or proceed with the build
#
# Exit codes:
# - 0: Skip the build
# - 1: Proceed with the build
#
# Vercel runs this from apps/backoffice directory (Root Directory setting)
# We need to go to repo root for git commands

echo "🔍 Checking if backoffice needs to be built..."

# Move to repo root (Vercel sets Root Directory to apps/backoffice)
cd ../.. 2>/dev/null || true

# Get the comparison ref (last successful deployment SHA from Vercel)
COMPARE_REF="${VERCEL_GIT_PREVIOUS_SHA:-}"

if [ -z "$COMPARE_REF" ]; then
  echo "⚠️  No VERCEL_GIT_PREVIOUS_SHA found (first deploy or no previous deployment)"
  echo "🚀 Proceeding with build..."
  exit 1  # Proceed with build
fi

echo "📊 Comparing HEAD to $COMPARE_REF"

# Check if any files in apps/backoffice have changed
CHANGED_FILES=$(git diff --name-only "$COMPARE_REF" HEAD -- apps/backoffice/ 2>/dev/null)

if [ -n "$CHANGED_FILES" ]; then
  CHANGE_COUNT=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')
  echo "✅ Found $CHANGE_COUNT changed files in apps/backoffice:"
  echo "$CHANGED_FILES" | head -15
  if [ "$CHANGE_COUNT" -gt 15 ]; then
    echo "... and $((CHANGE_COUNT - 15)) more"
  fi
  echo ""
  echo "🚀 Proceeding with build..."
  exit 1  # Proceed with build
fi

# Also check shared packages that backoffice depends on
SHARED_CHANGES=$(git diff --name-only "$COMPARE_REF" HEAD -- \
  shared/types/ \
  shared/utils/ \
  shared/ui/ \
  shared/database/migrations/ \
  packages/ \
  2>/dev/null)

if [ -n "$SHARED_CHANGES" ]; then
  echo "✅ Changes detected in shared dependencies:"
  echo "$SHARED_CHANGES" | head -10
  echo ""
  echo "🚀 Proceeding with build (shared deps changed)..."
  exit 1  # Proceed with build
fi

echo "⏭️  No relevant changes detected, skipping build"
exit 0  # Skip build
