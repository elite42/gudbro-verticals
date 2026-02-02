'use client';

import { useState } from 'react';
import Link from 'next/link';
import { List, X } from '@phosphor-icons/react';

const navigation = [
  { name: 'Coffeeshop', href: '/coffeeshop' },
  { name: 'Tours', href: '/tours' },
  { name: 'Stays', href: '/stays' },
  { name: 'Wellness', href: '/wellness' },
  { name: 'Rentals', href: '/rentals' },
  { name: 'Pricing', href: '/pricing' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]">
              <span className="text-xl font-bold text-white">G</span>
            </div>
            <span className="text-xl font-bold text-[var(--neutral-900)]">GUDBRO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--neutral-600)] transition-colors hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-900)]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--neutral-700)] transition-colors hover:text-[var(--primary)]"
            >
              Log in
            </Link>
            <Link href="/signup" className="btn btn-primary btn-sm">
              Start Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-lg p-2 text-[var(--neutral-600)] md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-[var(--neutral-200)] py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-base font-medium text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-2 border-[var(--neutral-200)]" />
              <Link
                href="/login"
                className="rounded-lg px-4 py-3 text-base font-medium text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]"
              >
                Log in
              </Link>
              <div className="px-4 pt-2">
                <Link href="/signup" className="btn btn-primary w-full">
                  Start Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
