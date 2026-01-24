'use client';
import Link from 'next/link';
import { MagnifyingGlass, Sun, Moon } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  merchantName?: string;
  merchantLogo?: string;
  tableNumber?: string;
  showSearch?: boolean;
  onSearchClick?: () => void;
  onThemeToggle?: () => void;
  isDark?: boolean;
}

export function Header({
  merchantName = 'Restaurant',
  merchantLogo,
  tableNumber,
  showSearch = true,
  onSearchClick,
  onThemeToggle,
  isDark = false,
}: HeaderProps) {
  return (
    <header
      className="glass sticky top-0 z-40"
      style={{ borderBottom: '1px solid var(--border-light)' }}
    >
      <div className="container-app">
        <div className="flex items-center justify-between py-3">
          {/* Left: Logo + Name */}
          <Link href="/" className="flex items-center gap-3">
            {merchantLogo ? (
              <img
                src={merchantLogo}
                alt={merchantName}
                className="h-10 w-10 rounded-xl object-cover"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              />
            ) : (
              <div
                className="font-display flex h-10 w-10 items-center justify-center rounded-xl text-lg font-semibold"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                }}
              >
                {merchantName.charAt(0)}
              </div>
            )}

            <div>
              <h1
                className="font-display text-lg font-semibold leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {merchantName}
              </h1>
              {tableNumber && (
                <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                  Table {tableNumber}
                </span>
              )}
            </div>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            {/* Search button */}
            {showSearch && (
              <button
                onClick={onSearchClick}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Search menu"
              >
                <MagnifyingGlass size={22} weight="regular" />
              </button>
            )}

            {/* Theme toggle */}
            <button
              onClick={onThemeToggle}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Moon size={22} weight="fill" /> : <Sun size={22} weight="regular" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Language button removed - V-005 fix: duplicates floating button on mobile */}
          </div>
        </div>
      </div>

      {/* Table context banner */}
      {tableNumber && (
        <div
          className="py-2 text-center text-sm font-medium"
          style={{
            background: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ color: 'var(--brand-warm)' }}>●</span> Ordering for Table {tableNumber}
        </div>
      )}
    </header>
  );
}
