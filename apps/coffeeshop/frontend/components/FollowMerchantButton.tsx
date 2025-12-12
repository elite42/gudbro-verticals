'use client';

import { useState, useEffect } from 'react';
import { followMerchant, unfollowMerchant, isFollowingMerchant } from '@/lib/follower-service';
import { getCurrentUser } from '@/lib/auth-service';

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

  // Check follow status on mount
  useEffect(() => {
    const checkStatus = async () => {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);

      if (user) {
        const following = await isFollowingMerchant(merchantId);
        setIsFollowing(following);
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
        } rounded-xl bg-theme-bg-secondary border border-theme-border-light text-theme-text-tertiary animate-pulse`}
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
        className={`
          ${variant === 'compact' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}
          rounded-xl font-medium transition-all duration-200 flex items-center gap-2
          ${
            isFollowing
              ? 'bg-theme-bg-secondary border border-theme-border-medium text-theme-text-primary hover:border-red-300 hover:text-red-500'
              : 'bg-pink-500 text-white hover:bg-pink-600'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : isFollowing ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Seguendo</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Segui {merchantName || 'Locale'}</span>
          </>
        )}
      </button>

      {/* Auth Prompt Modal */}
      {showAuthPrompt && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
            onClick={() => setShowAuthPrompt(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-theme-bg-elevated rounded-2xl shadow-2xl z-[10001] max-w-sm mx-auto p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-theme-text-primary mb-2">
                Accedi per seguire
              </h3>
              <p className="text-sm text-theme-text-secondary mb-6">
                Crea un account GudBro per seguire i tuoi locali preferiti e ricevere offerte esclusive.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAuthPrompt(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-theme-bg-secondary text-theme-text-primary font-medium hover:bg-theme-bg-tertiary transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={() => {
                    setShowAuthPrompt(false);
                    // Navigate to account page with auth modal open
                    window.location.href = '/account?auth=login';
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
                >
                  Accedi
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
