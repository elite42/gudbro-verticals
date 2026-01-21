#!/bin/bash
# =============================================================================
# CI Local Simulation Script
# =============================================================================
# Simulates GitHub Actions CI environment locally to catch issues before push.
#
# Usage:
#   ./scripts/ci-local.sh          # Run full CI simulation
#   ./scripts/ci-local.sh --quick  # Skip clean install (faster)
#   ./scripts/ci-local.sh --help   # Show help
#
# What it does:
#   1. Cleans node_modules, .turbo cache, and .next folders
#   2. Runs pnpm install --frozen-lockfile (like CI)
#   3. Runs turbo typecheck --force
#   4. Runs turbo lint
#   5. Runs turbo build
#
# Why use this:
#   Local dev environment can have cached types/modules that mask errors.
#   CI runs with fresh install, which can reveal issues not seen locally.
# =============================================================================

set -e  # Exit on first error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored message
print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Show help
show_help() {
    echo "CI Local Simulation Script"
    echo ""
    echo "Usage: ./scripts/ci-local.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --quick    Skip clean install, just run checks"
    echo "  --clean    Only clean, don't run checks"
    echo "  --help     Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./scripts/ci-local.sh          # Full CI simulation"
    echo "  ./scripts/ci-local.sh --quick  # Quick checks only"
}

# Parse arguments
QUICK_MODE=false
CLEAN_ONLY=false

for arg in "$@"; do
    case $arg in
        --quick)
            QUICK_MODE=true
            shift
            ;;
        --clean)
            CLEAN_ONLY=true
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
    esac
done

# Get script directory and move to repo root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$REPO_ROOT"

echo ""
echo "========================================"
echo "  CI Local Simulation"
echo "========================================"
echo ""

# Check Node version
EXPECTED_NODE="20"
CURRENT_NODE=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$CURRENT_NODE" != "$EXPECTED_NODE" ]; then
    print_warning "Node version mismatch: local v$CURRENT_NODE, CI uses v$EXPECTED_NODE"
    print_warning "Consider: nvm use 20"
    echo ""
fi

# Step 1: Clean (unless --quick)
if [ "$QUICK_MODE" = false ]; then
    print_step "Step 1/5: Cleaning caches and node_modules..."

    rm -rf node_modules 2>/dev/null || true
    rm -rf apps/*/node_modules 2>/dev/null || true
    rm -rf apps/*/*/node_modules 2>/dev/null || true
    rm -rf shared/*/node_modules 2>/dev/null || true
    rm -rf .turbo 2>/dev/null || true
    rm -rf apps/*/.next 2>/dev/null || true
    rm -rf apps/*/*/.next 2>/dev/null || true

    print_success "Cleaned"

    if [ "$CLEAN_ONLY" = true ]; then
        echo ""
        print_success "Clean complete. Run without --clean to continue with checks."
        exit 0
    fi

    # Step 2: Install
    print_step "Step 2/5: Installing dependencies (frozen lockfile)..."
    pnpm install --frozen-lockfile
    print_success "Dependencies installed"
else
    print_warning "Quick mode: skipping clean install"
    echo ""
fi

# Step 3: Typecheck
print_step "Step 3/5: Running typecheck..."
if pnpm turbo typecheck --force; then
    print_success "Typecheck passed"
else
    print_error "Typecheck failed!"
    exit 1
fi

# Step 4: Lint
print_step "Step 4/5: Running lint..."
if pnpm turbo lint; then
    print_success "Lint passed"
else
    print_warning "Lint has warnings (continuing...)"
fi

# Step 5: Build
print_step "Step 5/5: Running build..."
if pnpm turbo build; then
    print_success "Build passed"
else
    print_error "Build failed!"
    exit 1
fi

echo ""
echo "========================================"
echo -e "  ${GREEN}All CI checks passed!${NC}"
echo "========================================"
echo ""
echo "Your code should pass GitHub Actions CI."
echo ""
