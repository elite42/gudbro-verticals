#!/bin/bash
# =============================================================================
# GUDBRO MVP Build Script
# =============================================================================
# Builds only the coffeeshop MVP apps, excluding deferred verticals.
#
# Apps included:
#   - coffeeshop (PWA)
#   - backoffice (Admin dashboard)
#   - waiter (Staff app - optional)
#
# Apps excluded:
#   - accommodations, tours, wellness, gym, pharmacy, laundry, workshops, rentals
#
# Usage:
#   ./scripts/build-mvp.sh           # Build coffeeshop + backoffice
#   ./scripts/build-mvp.sh --full    # Build all apps (for comparison)
# =============================================================================

set -e

echo "=================================================="
echo "  GUDBRO MVP Build"
echo "=================================================="

# Check if --full flag is passed
if [ "$1" == "--full" ]; then
    echo "Building ALL apps (full mode)..."
    pnpm turbo build
    exit 0
fi

echo "Building MVP apps only (coffeeshop + backoffice)..."
echo ""

# Build only MVP apps using turbo filter
# --filter syntax: https://turbo.build/repo/docs/core-concepts/monorepos/filtering
pnpm turbo build \
    --filter=@gudbro/coffeeshop \
    --filter=backoffice \
    --filter=waiter \
    --filter=@gudbro/utils \
    --filter=@gudbro/types \
    --filter=@gudbro/ui \
    --filter=@gudbro/hooks \
    --filter=@gudbro/config

echo ""
echo "=================================================="
echo "  MVP Build Complete!"
echo "=================================================="
echo ""
echo "Apps built:"
echo "  - coffeeshop (PWA)"
echo "  - backoffice (Admin)"
echo "  - waiter (Staff)"
echo "  - shared packages"
echo ""
echo "Excluded from build:"
echo "  - accommodations"
echo "  - tours, wellness, gym, pharmacy"
echo "  - laundry, workshops, rentals"
echo ""
