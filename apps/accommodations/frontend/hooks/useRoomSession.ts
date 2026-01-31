'use client';

import { useState, useEffect, useCallback } from 'react';
import type { RoomStayData, RoomResolveResponse, ApiResponse } from '@/types/stay';

const TOKEN_KEY = 'gudbro_stay_token';
const STAY_KEY = 'gudbro_stay_data';

export interface RoomSession {
  token: string | null;
  stay: RoomStayData | null;
  isLoading: boolean;
  hasActiveBooking: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Decode JWT payload using atob (client-side only, no verification).
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
  return payload.exp * 1000 < Date.now();
}

/**
 * Check if a stored session is a room session for the given room code.
 */
function isMatchingRoomSession(token: string, roomCode: string): boolean {
  const payload = decodeJwtPayload(token);
  return payload?.roomCode === roomCode && payload?.accessTier === 'browse';
}

/**
 * Session management hook for room-based QR access (browse tier).
 *
 * Unlike useStaySession which requires explicit verify(),
 * this hook auto-resolves the room code on mount.
 *
 * Uses the same localStorage keys as useStaySession -- a room session
 * overwrites a booking session and vice versa. This is intentional:
 * the guest should see whichever session they accessed most recently.
 */
export function useRoomSession(roomCode: string): RoomSession {
  const [token, setToken] = useState<string | null>(null);
  const [stay, setStay] = useState<RoomStayData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolveRoom = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`/api/stay/room/${roomCode}`);
      const json: ApiResponse<RoomResolveResponse> = await res.json();

      if (!res.ok || json.error || !json.data) {
        if (res.status === 404) {
          setError('This room code is not valid. Please scan the QR code in your room.');
        } else {
          setError('Something went wrong. Please try again.');
        }
        // Clear any stale session
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(STAY_KEY);
        return;
      }

      // Store session
      localStorage.setItem(TOKEN_KEY, json.data.token);
      localStorage.setItem(STAY_KEY, JSON.stringify(json.data.stay));
      setToken(json.data.token);
      setStay(json.data.stay);
    } catch {
      setError('Network error. Please check your connection and try again.');
    }
  }, [roomCode]);

  // On mount: check for existing valid session or resolve fresh
  useEffect(() => {
    async function init() {
      setIsLoading(true);

      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedStay = localStorage.getItem(STAY_KEY);

        // Reuse existing session if it's valid and matches this room
        if (storedToken && storedStay && !isTokenExpired(storedToken)) {
          if (isMatchingRoomSession(storedToken, roomCode)) {
            setToken(storedToken);
            setStay(JSON.parse(storedStay));
            setIsLoading(false);
            return;
          }
        }

        // No valid matching session -- resolve fresh from API
        await resolveRoom();
      } catch {
        setError('Failed to initialize session.');
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, [roomCode, resolveRoom]);

  return {
    token,
    stay,
    isLoading,
    hasActiveBooking: stay?.hasActiveBooking ?? false,
    error,
    refresh: resolveRoom,
  };
}
