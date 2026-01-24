'use client';

/**
 * AccountPage v2
 *
 * Pagina account utente con design system v2.
 * Mostra profilo, preferenze, ordini passati e opzioni account.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Envelope,
  SignOut,
  Heart,
  ClockCounterClockwise,
  Gear,
  Bell,
  ShieldCheck,
  Fingerprint,
  Globe,
  CurrencyCircleDollar,
  Leaf,
  CaretRight,
  Star,
  Gift,
} from '@phosphor-icons/react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { AuthModal } from './AuthModal';
import { TierGate } from './TierGate';
import { useAuth } from '@/lib/hooks/useAuth';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

interface AccountPageProps {
  onThemeToggle: () => void;
  isDark: boolean;
  cartCount?: number;
  /** Navigation for demo mode */
  activePage?: string;
  onNavigate?: (pageId: string) => void;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  badge?: string;
}

function MenuItem({ icon, label, description, onClick, rightElement, badge }: MenuItemProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="flex w-full items-center gap-4 rounded-xl p-4 text-left transition-colors"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {label}
          </span>
          {badge && (
            <span
              className="rounded-full px-2 py-0.5 text-xs font-bold"
              style={{ background: 'var(--status-success)', color: 'white' }}
            >
              {badge}
            </span>
          )}
        </div>
        {description && (
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            {description}
          </span>
        )}
      </div>
      {rightElement || <CaretRight size={20} style={{ color: 'var(--text-tertiary)' }} />}
    </motion.button>
  );
}

export function AccountPage({
  onThemeToggle,
  isDark,
  cartCount = 0,
  activePage,
  onNavigate,
}: AccountPageProps) {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header
        merchantName={coffeeshopConfig.business.name}
        merchantLogo={coffeeshopConfig.business.logo}
        showSearch={false}
        onThemeToggle={onThemeToggle}
        isDark={isDark}
      />

      <main className="container-app safe-area-bottom pb-8 pt-4">
        {/* Profile Section */}
        {isLoading ? (
          <div className="mb-6 animate-pulse">
            <div className="h-32 rounded-2xl" style={{ background: 'var(--bg-secondary)' }} />
          </div>
        ) : isAuthenticated && user ? (
          /* Logged In State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-6 p-6"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ background: 'var(--brand-warm)' }}
              >
                {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
              </div>

              <div className="min-w-0 flex-1">
                <h2
                  className="font-display text-xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {user.name || 'Utente'}
                </h2>
                <p className="truncate text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {user.email}
                </p>
                {user.isEmailVerified && (
                  <span
                    className="mt-1 inline-flex items-center gap-1 text-xs"
                    style={{ color: 'var(--status-success)' }}
                  >
                    <ShieldCheck size={12} weight="fill" />
                    Verificato
                  </span>
                )}
              </div>
            </div>

            {/* Loyalty Points - Tier Gated */}
            <TierGate feature="enableEngagementSystem">
              <div
                className="mt-4 flex items-center justify-between rounded-xl p-4"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <div className="flex items-center gap-3">
                  <Gift size={24} style={{ color: 'var(--brand-warm)' }} />
                  <div>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      Punti fedeltà
                    </p>
                    <p
                      className="font-display text-xl font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      0 pts
                    </p>
                  </div>
                </div>
                <button
                  className="rounded-lg px-4 py-2 text-sm font-medium"
                  style={{ background: 'var(--brand-warm)', color: 'white' }}
                >
                  Riscatta
                </button>
              </div>
            </TierGate>
          </motion.div>
        ) : (
          /* Logged Out State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-6 p-6 text-center"
          >
            <div
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <User size={40} style={{ color: 'var(--text-tertiary)' }} />
            </div>

            <h2
              className="font-display text-xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Benvenuto!
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Accedi per salvare i tuoi preferiti e accumulare punti
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleLogin}
                className="flex-1 rounded-xl px-4 py-3 font-medium"
                style={{ background: 'var(--brand-warm)', color: 'white' }}
              >
                Accedi
              </button>
              <button
                onClick={handleSignUp}
                className="flex-1 rounded-xl px-4 py-3 font-medium"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                }}
              >
                Registrati
              </button>
            </div>
          </motion.div>
        )}

        {/* Menu Sections */}
        <div className="space-y-6">
          {/* Quick Links */}
          <section>
            <h3
              className="mb-3 text-sm font-semibold uppercase tracking-wide"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Rapido
            </h3>
            <div className="space-y-2">
              <MenuItem
                icon={<Heart size={20} />}
                label="I tuoi preferiti"
                description="Piatti salvati"
                onClick={() => onNavigate?.('favorites')}
              />
              <MenuItem
                icon={<ClockCounterClockwise size={20} />}
                label="Cronologia ordini"
                description="Ordini passati"
                onClick={() => onNavigate?.('orders')}
              />
            </div>
          </section>

          {/* Preferences */}
          <section>
            <h3
              className="mb-3 text-sm font-semibold uppercase tracking-wide"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Preferenze
            </h3>
            <div className="space-y-2">
              <MenuItem
                icon={<Globe size={20} />}
                label="Lingua"
                description={coffeeshopConfig.i18n.defaultLanguage.toUpperCase()}
              />
              <MenuItem
                icon={<CurrencyCircleDollar size={20} />}
                label="Valuta"
                description={coffeeshopConfig.i18n.baseCurrency}
              />
              <MenuItem
                icon={<Leaf size={20} />}
                label="Dieta e allergeni"
                description="Imposta le tue preferenze"
              />
              <MenuItem icon={<Bell size={20} />} label="Notifiche" description="Push e email" />
            </div>
          </section>

          {/* Security - Only for logged in users */}
          {isAuthenticated && (
            <section>
              <h3
                className="mb-3 text-sm font-semibold uppercase tracking-wide"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Sicurezza
              </h3>
              <div className="space-y-2">
                <MenuItem
                  icon={<Fingerprint size={20} />}
                  label="Passkey"
                  description="Face ID, Touch ID"
                  badge="Nuovo"
                />
                <MenuItem icon={<ShieldCheck size={20} />} label="Privacy e dati" />
              </div>
            </section>
          )}

          {/* Support */}
          <section>
            <h3
              className="mb-3 text-sm font-semibold uppercase tracking-wide"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Supporto
            </h3>
            <div className="space-y-2">
              <MenuItem icon={<Star size={20} />} label="Valuta l'app" />
              <MenuItem
                icon={<Envelope size={20} />}
                label="Contattaci"
                description={coffeeshopConfig.contact.email}
              />
            </div>
          </section>

          {/* Sign Out */}
          {isAuthenticated && (
            <section>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl p-4 font-medium transition-colors"
                style={{
                  background: 'var(--status-error-bg)',
                  color: 'var(--status-error)',
                }}
              >
                <SignOut size={20} />
                <span>Esci</span>
              </button>
            </section>
          )}

          {/* App Version */}
          <p className="pt-4 text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {coffeeshopConfig.business.name} v2.0 • Tier: {coffeeshopConfig.tierInfo.badge}
          </p>
        </div>
      </main>

      <BottomNav cartCount={cartCount} activePage={activePage} onNavigate={onNavigate} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        defaultMode={authMode}
      />
    </div>
  );
}

export default AccountPage;
