'use client';

import { useState, useEffect, useCallback } from 'react';
import type { StayData, VerifyResponse, ApiResponse } from '@/types/stay';

const TOKEN_KEY = 'gudbro_stay_token';
const STAY_KEY = 'gudbro_stay_data';

export interface StaySession {
  token: string | null;
  stay: StayData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  verify: (bookingCode: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

/**
 * Decode JWT payload using atob (client-side only, no verification).
 * Returns null if decode fails.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

/**
 * Check if a JWT token is expired by reading the `exp` claim.
 */
function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') return true;
  // exp is in seconds, Date.now() is in milliseconds
  return payload.exp * 1000 < Date.now();
}

/**
 * Session management hook for guest stay authentication.
 *
 * Manages JWT lifecycle: store after verify, retrieve on mount,
 * clear on expire. Prevents redirect loops by starting isLoading=true
 * until localStorage check completes.
 */
export function useStaySession(): StaySession {
  const [token, setToken] = useState<string | null>(null);
  const [stay, setStay] = useState<StayData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: check localStorage for existing valid session
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedStay = localStorage.getItem(STAY_KEY);

      if (storedToken && storedStay) {
        if (isTokenExpired(storedToken)) {
          // Token expired — clear everything
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(STAY_KEY);
        } else {
          // Valid token — restore session
          setToken(storedToken);
          setStay(JSON.parse(storedStay));
        }
      }
    } catch {
      // localStorage access can fail (private browsing, etc.)
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(STAY_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verify = useCallback(
    async (
      bookingCode: string,
      lastName: string
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const res = await fetch('/api/stay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingCode, lastName }),
        });

        const json: ApiResponse<VerifyResponse> = await res.json();

        if (!res.ok || json.error || !json.data) {
          const errorMessage =
            json.error === 'verification_failed'
              ? "We couldn't find your booking. Please check your code and last name."
              : 'Something went wrong. Please try again.';
          return { success: false, error: errorMessage };
        }

        // Save session to localStorage + state
        localStorage.setItem(TOKEN_KEY, json.data.token);
        localStorage.setItem(STAY_KEY, JSON.stringify(json.data.stay));
        setToken(json.data.token);
        setStay(json.data.stay);

        return { success: true };
      } catch {
        return {
          success: false,
          error: 'Network error. Please check your connection and try again.',
        };
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STAY_KEY);
    setToken(null);
    setStay(null);
  }, []);

  return {
    token,
    stay,
    isLoading,
    isAuthenticated: !!token && !!stay,
    verify,
    logout,
  };
}
