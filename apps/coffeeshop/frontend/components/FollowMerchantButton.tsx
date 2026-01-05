'use client';

import { useState, useEffect } from 'react';
import {
  followMerchant,
  unfollowMerchant,
  isFollowingMerchant,
  needsVisitorTypeSelection,
  isReturningTourist,
} from '@/lib/follower-service';
import { getCurrentUser } from '@/lib/auth-service';
import { VisitorTypeModal } from './VisitorTypeModal';
import { WelcomeBackTouristModal } from './WelcomeBackTouristModal';

interface FollowMerchantButtonProps {
  merchantId: string;
  merchantName?: string;
  variant?: 'default' | 'compact';
  onFollowChange?: (isFollowing: boolean) => void;
}

export function FollowMerchantButton({
  merchantId,
  merchantName,
  variant = 'default',
  onFollowChange,
}: FollowMerchantButtonProps) {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Tourist lifecycle modals
  const [showVisitorTypeModal, setShowVisitorTypeModal] = useState(false);
  const [showWelcomeBackModal, setShowWelcomeBackModal] = useState(false);
  const [returningTouristData, setReturningTouristData] = useState<{
    previousVisits: number;
    wasArchived: boolean;
  } | null>(null);

  // Check follow status on mount
  useEffect(() => {
    const checkStatus = async () => {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);

      if (user) {
        const following = await isFollowingMerchant(merchantId);
        setIsFollowing(following);

        // Check if returning tourist needs welcome back flow
        if (following) {
          const returningData = await isReturningTourist(merchantId);
          if (returningData.isReturning) {
            setReturningTouristData({
              previousVisits: returningData.previousVisits,
              wasArchived: returningData.wasArchived,
            });
            setShowWelcomeBackModal(true);
          }
        }
      } else {
        setIsFollowing(false);
      }
    };

    checkStatus();
  }, [merchantId]);

  const handleClick = async () => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }

    if (isFollowing === null || isLoading) return;

    setIsLoading(true);

    try {
      if (isFollowing) {
        const result = await unfollowMerchant(merchantId);
        if (result.success) {
          setIsFollowing(false);
          onFollowChange?.(false);
        }
      } else {
        const result = await followMerchant(merchantId, 'qr_scan');
        if (result.success) {
          setIsFollowing(true);
          onFollowChange?.(true);

          // Check if we need to show visitor type modal
          const needsSelection = await needsVisitorTypeSelection(merchantId);
          if (needsSelection) {
            setShowVisitorTypeModal(true);
          }
        }
      }
    } catch (error) {
      console.error('Follow action error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isFollowing === null) {
    return (
      <button
        disabled
        className={`${
          variant === 'compact' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
        } bg-theme-bg-secondary border-theme-border-light text-theme-text-tertiary animate-pulse rounded-xl border`}
      >
        ...
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={` ${variant === 'compact' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} flex items-center gap-2 rounded-xl font-medium transition-all duration-200 ${
          isFollowing
            ? 'bg-theme-bg-secondary border-theme-border-medium text-theme-text-primary border hover:border-red-300 hover:text-red-500'
            : 'bg-pink-500 text-white hover:bg-pink-600'
        } ${isLoading ? 'cursor-not-allowed opacity-50' : ''} `}
      >
        {isLoading ? (
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : isFollowing ? (
          <>
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Seguendo</span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Segui {merchantName || 'Locale'}</span>
          </>
        )}
      </button>

      {/* Auth Prompt Modal */}
      {showAuthPrompt && (
        <>
          <div
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAuthPrompt(false)}
          />
          <div className="bg-theme-bg-elevated fixed inset-x-4 top-1/2 z-[10001] mx-auto max-w-sm -translate-y-1/2 rounded-2xl p-6 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
                <svg
                  className="h-8 w-8 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-theme-text-primary mb-2 text-lg font-semibold">
                Accedi per seguire
              </h3>
              <p className="text-theme-text-secondary mb-6 text-sm">
                Crea un account GudBro per seguire i tuoi locali preferiti e ricevere offerte
                esclusive.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAuthPrompt(false)}
                  className="bg-theme-bg-secondary text-theme-text-primary hover:bg-theme-bg-tertiary flex-1 rounded-xl px-4 py-2.5 font-medium transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={() => {
                    setShowAuthPrompt(false);
                    // Navigate to account page with auth modal open
                    window.location.href = '/account?auth=login';
                  }}
                  className="flex-1 rounded-xl bg-pink-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-pink-600"
                >
                  Accedi
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Visitor Type Modal - shown after first follow */}
      <VisitorTypeModal
        isOpen={showVisitorTypeModal}
        onClose={() => setShowVisitorTypeModal(false)}
        onComplete={() => setShowVisitorTypeModal(false)}
        merchantId={merchantId}
        merchantName={merchantName}
      />

      {/* Welcome Back Tourist Modal - shown when returning tourist detected */}
      {returningTouristData && (
        <WelcomeBackTouristModal
          isOpen={showWelcomeBackModal}
          onClose={() => {
            setShowWelcomeBackModal(false);
            setReturningTouristData(null);
          }}
          onComplete={() => {
            setShowWelcomeBackModal(false);
            setReturningTouristData(null);
          }}
          merchantId={merchantId}
          merchantName={merchantName}
          previousVisits={returningTouristData.previousVisits}
          wasArchived={returningTouristData.wasArchived}
        />
      )}
    </>
  );
}
