/**
 * GudBro Passkey Service
 *
 * WebAuthn/Passkey authentication for passwordless login:
 * - Register new passkeys (Face ID, Touch ID, Windows Hello, etc.)
 * - Authenticate with passkeys
 * - Manage registered passkeys
 *
 * Uses @simplewebauthn/browser for client-side WebAuthn operations
 */

import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
  browserSupportsWebAuthnAutofill,
} from '@simplewebauthn/browser';
import type {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
} from '@simplewebauthn/types';

// ============================================================================
// TYPES
// ============================================================================

export interface PasskeyInfo {
  id: string;
  friendlyName: string | null;
  deviceType: 'platform' | 'cross-platform' | null;
  transports: string[] | null;
  lastUsedAt: string | null;
  createdAt: string;
}

export interface PasskeyResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

export interface PasskeyAuthResult extends PasskeyResult {
  user?: {
    id: string;
    email: string;
  };
  session?: unknown;
}

// ============================================================================
// FEATURE DETECTION
// ============================================================================

/**
 * Check if passkeys are supported in the current browser
 */
export function isPasskeySupported(): boolean {
  return browserSupportsWebAuthn();
}

/**
 * Check if passkey autofill is supported (conditional UI)
 */
export async function isPasskeyAutofillSupported(): Promise<boolean> {
  return browserSupportsWebAuthnAutofill();
}

/**
 * Check if passkeys are enabled via feature flag
 */
export function isPasskeyEnabled(): boolean {
  return process.env.NEXT_PUBLIC_PASSKEYS_ENABLED === 'true';
}

// ============================================================================
// REGISTRATION (Add new passkey to account)
// ============================================================================

/**
 * Start passkey registration for authenticated user
 * @param friendlyName Optional device name (e.g., "iPhone di Gianfranco")
 */
export async function registerPasskey(friendlyName?: string): Promise<PasskeyResult> {
  if (!isPasskeySupported()) {
    return { success: false, error: 'Il tuo browser non supporta Passkey' };
  }

  if (!isPasskeyEnabled()) {
    return { success: false, error: 'Passkey non abilitato' };
  }

  try {
    // 1. Get registration options from server
    const optionsRes = await fetch('/api/auth/passkey/register/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friendlyName }),
    });

    if (!optionsRes.ok) {
      const error = await optionsRes.json();
      return { success: false, error: error.message || 'Errore durante la registrazione' };
    }

    const options: PublicKeyCredentialCreationOptionsJSON = await optionsRes.json();

    // 2. Create credential with browser WebAuthn API
    let credential: RegistrationResponseJSON;
    try {
      credential = await startRegistration({ optionsJSON: options });
    } catch (err) {
      // User cancelled or error
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          return { success: false, error: 'Registrazione annullata' };
        }
        return { success: false, error: err.message };
      }
      return { success: false, error: 'Errore durante la creazione della passkey' };
    }

    // 3. Send credential to server for verification
    const verifyRes = await fetch('/api/auth/passkey/register/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential, friendlyName }),
    });

    if (!verifyRes.ok) {
      const error = await verifyRes.json();
      return { success: false, error: error.message || 'Verifica fallita' };
    }

    return { success: true };
  } catch (err) {
    console.error('Passkey registration error:', err);
    return { success: false, error: 'Si è verificato un errore. Riprova.' };
  }
}

// ============================================================================
// AUTHENTICATION (Login with passkey)
// ============================================================================

/**
 * Authenticate with passkey
 * @param email Optional email to hint which passkeys to show
 */
export async function authenticateWithPasskey(email?: string): Promise<PasskeyAuthResult> {
  if (!isPasskeySupported()) {
    return { success: false, error: 'Il tuo browser non supporta Passkey' };
  }

  if (!isPasskeyEnabled()) {
    return { success: false, error: 'Passkey non abilitato' };
  }

  try {
    // 1. Get authentication options from server
    const optionsRes = await fetch('/api/auth/passkey/authenticate/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!optionsRes.ok) {
      const error = await optionsRes.json();
      return { success: false, error: error.message || 'Errore durante il login' };
    }

    const options: PublicKeyCredentialRequestOptionsJSON = await optionsRes.json();

    // 2. Authenticate with browser WebAuthn API
    let credential: AuthenticationResponseJSON;
    try {
      credential = await startAuthentication({ optionsJSON: options });
    } catch (err) {
      // User cancelled or error
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          return { success: false, error: 'Autenticazione annullata' };
        }
        return { success: false, error: err.message };
      }
      return { success: false, error: "Errore durante l'autenticazione" };
    }

    // 3. Send credential to server for verification
    const verifyRes = await fetch('/api/auth/passkey/authenticate/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });

    if (!verifyRes.ok) {
      const error = await verifyRes.json();
      return { success: false, error: error.message || 'Verifica fallita' };
    }

    const result = await verifyRes.json();

    return {
      success: true,
      user: result.user,
      session: result.session,
    };
  } catch (err) {
    console.error('Passkey authentication error:', err);
    return { success: false, error: 'Si è verificato un errore. Riprova.' };
  }
}

// ============================================================================
// MANAGEMENT (List/Delete passkeys)
// ============================================================================

/**
 * Get list of registered passkeys for current user
 */
export async function getPasskeys(): Promise<{
  success: boolean;
  passkeys?: PasskeyInfo[];
  error?: string;
}> {
  try {
    const res = await fetch('/api/auth/passkey/manage', {
      method: 'GET',
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message || 'Errore durante il caricamento' };
    }

    const data = await res.json();
    return { success: true, passkeys: data.passkeys };
  } catch (err) {
    console.error('Get passkeys error:', err);
    return { success: false, error: 'Si è verificato un errore. Riprova.' };
  }
}

/**
 * Delete a registered passkey
 * @param passkeyId The UUID of the passkey to delete
 */
export async function deletePasskey(passkeyId: string): Promise<PasskeyResult> {
  try {
    const res = await fetch(`/api/auth/passkey/manage?id=${passkeyId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message || "Errore durante l'eliminazione" };
    }

    return { success: true };
  } catch (err) {
    console.error('Delete passkey error:', err);
    return { success: false, error: 'Si è verificato un errore. Riprova.' };
  }
}

/**
 * Update passkey friendly name
 * @param passkeyId The UUID of the passkey to update
 * @param friendlyName New friendly name
 */
export async function updatePasskeyName(
  passkeyId: string,
  friendlyName: string
): Promise<PasskeyResult> {
  try {
    const res = await fetch('/api/auth/passkey/manage', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: passkeyId, friendlyName }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message || "Errore durante l'aggiornamento" };
    }

    return { success: true };
  } catch (err) {
    console.error('Update passkey error:', err);
    return { success: false, error: 'Si è verificato un errore. Riprova.' };
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get user-friendly device type label
 */
export function getDeviceTypeLabel(deviceType: string | null): string {
  switch (deviceType) {
    case 'platform':
      return 'Dispositivo integrato';
    case 'cross-platform':
      return 'Chiave esterna';
    default:
      return 'Dispositivo';
  }
}

/**
 * Get icon name for device type
 */
export function getDeviceTypeIcon(deviceType: string | null): string {
  switch (deviceType) {
    case 'platform':
      return 'smartphone'; // Face ID, Touch ID, Windows Hello
    case 'cross-platform':
      return 'key'; // USB security key
    default:
      return 'shield';
  }
}
