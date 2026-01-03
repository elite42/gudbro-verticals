'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { LoyaltyCard } from './LoyaltyCard';
import { ReferralShare } from './ReferralShare';
import { IngredientContributionForm } from './IngredientContributionForm';
import { MyContributions } from './MyContributions';
import { getCurrentUser, type AuthUser } from '../lib/auth-service';

interface AccountSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPreferences?: () => void;
  onOpenSettings?: () => void;
}

export function AccountSidebar({
  isOpen,
  onClose,
  onOpenPreferences,
  onOpenSettings
}: AccountSidebarProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoyaltyDetails, setShowLoyaltyDetails] = useState(false);
  const [showContributions, setShowContributions] = useState(false);
  const [showContributionForm, setShowContributionForm] = useState(false);
  const isGuest = !user;
  const displayName = user?.name || user?.email?.split('@')[0] || 'Ospite';

  // Fetch current user on mount
  useEffect(() => {
    async function loadUser() {
      setIsLoading(true);
      try {
        const authUser = await getCurrentUser();
        setUser(authUser);
      } finally {
        setIsLoading(false);
      }
    }
    if (isOpen) {
      loadUser();
    }
  }, [isOpen]);

  // Close sidebar when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById('account-sidebar');
      if (sidebar && !sidebar.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity" />

      {/* Sidebar */}
      <div
        id="account-sidebar"
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-theme-bg-elevated shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-theme-bg-tertiary p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-theme-text-primary">Account</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-theme-bg-secondary rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Status */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {isGuest ? '👤' : displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-theme-text-primary">{displayName}</p>
              <p className="text-sm text-theme-text-secondary">{isGuest ? 'Utente Ospite' : 'Membro'}</p>
            </div>
          </div>

          {/* Loyalty Card (compact) - only for logged in users */}
          {!isGuest && (
            <div className="mt-4">
              <LoyaltyCard compact showTransactions={false} />
            </div>
          )}

          {/* Login/Register Buttons (if guest) */}
          {isGuest && (
            <div className="flex gap-2">
              <button className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors font-semibold text-sm">
                Accedi
              </button>
              <button className="flex-1 bg-theme-bg-elevated text-pink-600 border-2 border-pink-600 py-2 px-4 rounded-lg hover:bg-pink-50 transition-colors font-semibold text-sm">
                Registrati
              </button>
            </div>
          )}
        </div>

        {/* Menu Sections */}
        <div className="p-4">
          {/* Preferences Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-theme-text-tertiary uppercase tracking-wider mb-3 px-2">
              Preferenze
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenPreferences?.();
                }}
                className="w-full px-4 py-3 text-left hover:bg-green-50 rounded-lg transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center transition-colors">
                  <span className="text-xl">🌱</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-theme-text-primary text-sm">Preferenze Dietetiche</div>
                  <div className="text-xs text-theme-text-tertiary">Allergeni, intolleranze, diete</div>
                </div>
                <svg className="w-5 h-5 text-theme-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenSettings?.();
                }}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
                  <span className="text-xl">⚙️</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-theme-text-primary text-sm">Impostazioni</div>
                  <div className="text-xs text-theme-text-tertiary">Lingua, valuta</div>
                </div>
                <svg className="w-5 h-5 text-theme-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Account Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-theme-text-tertiary uppercase tracking-wider mb-3 px-2">
              Il Mio Account
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setShowLoyaltyDetails(!showLoyaltyDetails)}
                className="w-full px-4 py-3 text-left hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center transition-colors">
                  <span className="text-xl">🎁</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-theme-text-primary text-sm">Programma Fedeltà</div>
                  <div className="text-xs text-theme-text-tertiary">Punti e premi</div>
                </div>
                <svg
                  className={`w-5 h-5 text-theme-text-tertiary transition-transform ${showLoyaltyDetails ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Expanded Loyalty Details */}
              {showLoyaltyDetails && (
                <div className="px-2 pb-4">
                  <LoyaltyCard showTransactions={true} />
                </div>
              )}

              <button className="w-full px-4 py-3 text-left hover:bg-theme-brand-secondary rounded-lg transition-colors flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-theme-brand-secondary group-hover:bg-theme-brand-accent flex items-center justify-center transition-colors">
                  <span className="text-xl">📋</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-theme-text-primary text-sm">Cronologia Ordini</div>
                  <div className="text-xs text-theme-text-tertiary">I tuoi ordini passati</div>
                </div>
                <svg className="w-5 h-5 text-theme-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                  <span className="text-xl">❤️</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-theme-text-primary text-sm">Preferiti</div>
                  <div className="text-xs text-theme-text-tertiary">Piatti salvati</div>
                </div>
                <svg className="w-5 h-5 text-theme-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Contributi Ingredienti - only for logged in users */}
              {!isGuest && (
                <button
                  onClick={() => setShowContributions(!showContributions)}
                  className="w-full px-4 py-3 text-left hover:bg-green-50 rounded-lg transition-colors flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center transition-colors">
                    <span className="text-xl">🥬</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-theme-text-primary text-sm">Contributi Ingredienti</div>
                    <div className="text-xs text-theme-text-tertiary">Aggiungi nuovi ingredienti</div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-theme-text-tertiary transition-transform ${showContributions ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Expanded Contributions Section */}
              {showContributions && !isGuest && (
                <div className="px-2 pb-4">
                  <MyContributions onAddNew={() => setShowContributionForm(true)} />
                </div>
              )}
            </div>
          </div>

          {/* Referral Section - only for logged in users */}
          {!isGuest && (
            <div className="mb-6 px-2">
              <ReferralShare compact />
            </div>
          )}

          {/* Help Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-theme-text-tertiary uppercase tracking-wider mb-3 px-2">
              Assistenza
            </h3>
            <div className="space-y-1">
              <button className="w-full px-4 py-3 text-left hover:bg-theme-bg-secondary rounded-lg transition-colors flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-theme-bg-secondary group-hover:bg-theme-bg-tertiary flex items-center justify-center transition-colors">
                  <span className="text-xl">❓</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-theme-text-primary text-sm">Centro Assistenza</div>
                  <div className="text-xs text-theme-text-tertiary">FAQ e supporto</div>
                </div>
                <svg className="w-5 h-5 text-theme-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full px-4 py-3 text-left hover:bg-theme-bg-secondary rounded-lg transition-colors flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-theme-bg-secondary group-hover:bg-theme-bg-tertiary flex items-center justify-center transition-colors">
                  <span className="text-xl">📞</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-theme-text-primary text-sm">Contattaci</div>
                  <div className="text-xs text-theme-text-tertiary">Scrivici un messaggio</div>
                </div>
                <svg className="w-5 h-5 text-theme-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Logout Button (if logged in) */}
          {!isGuest && (
            <div className="mt-6 pt-6 border-t border-theme-bg-tertiary">
              <button className="w-full px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3 text-red-600 group">
                <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div className="font-semibold text-sm">Esci</div>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-theme-bg-tertiary bg-theme-bg-secondary">
          <p className="text-xs text-theme-text-tertiary text-center">
            Caffè Dolce Vita © 2025
          </p>
          <p className="text-xs text-theme-text-tertiary text-center mt-1">
            v1.0.0
          </p>
        </div>
      </div>

      {/* Ingredient Contribution Form Modal */}
      {showContributionForm && (
        <IngredientContributionForm
          onClose={() => setShowContributionForm(false)}
          onSuccess={() => {
            setShowContributionForm(false);
            // Refresh contributions list
            setShowContributions(false);
            setTimeout(() => setShowContributions(true), 100);
          }}
        />
      )}
    </>
  );
}
