/**
 * TOTP Service for Two-Factor Authentication
 *
 * Provides TOTP generation, verification, and encryption utilities
 * for the 2FA system. Uses otplib for TOTP operations and
 * AES-256-GCM for secret encryption at rest.
 */

import { generateSecret, generateURI, verifySync } from 'otplib';
import crypto from 'crypto';

// ============================================================================
// CONFIGURATION
// ============================================================================

const APP_NAME = 'GUDBRO';
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const RECOVERY_CODE_COUNT = 8;
const RECOVERY_CODE_LENGTH = 8; // 8 hex chars = 32 bits

// ============================================================================
// ENCRYPTION KEY MANAGEMENT
// ============================================================================

/**
 * Get TOTP encryption key from environment
 * @throws Error if key is not configured or too short
 */
function getEncryptionKey(): Buffer {
  const key = process.env.TOTP_ENCRYPTION_KEY;

  if (!key) {
    throw new Error(
      'TOTP_ENCRYPTION_KEY environment variable is not set. ' +
        'Generate with: openssl rand -hex 32'
    );
  }

  if (key.length < 64) {
    throw new Error(
      'TOTP_ENCRYPTION_KEY must be at least 64 hex characters (32 bytes). ' +
        'Generate with: openssl rand -hex 32'
    );
  }

  return Buffer.from(key, 'hex');
}

// ============================================================================
// TOTP GENERATION
// ============================================================================

/**
 * Generate a new TOTP secret and otpauth URI
 * @param email - User's email address for the URI
 * @returns Object with secret and otpauth URI for QR code
 */
export function generateTOTPSecret(email: string): {
  secret: string;
  otpauth: string;
} {
  const secret = generateSecret();
  const otpauth = generateURI({
    issuer: APP_NAME,
    label: email,
    secret,
  });

  return { secret, otpauth };
}

/**
 * Verify a TOTP code against a secret
 * @param secret - The TOTP secret
 * @param code - The 6-digit code to verify
 * @returns Boolean indicating if code is valid
 */
export function verifyTOTPCode(secret: string, code: string): boolean {
  try {
    // Clean the code (remove spaces, ensure string)
    const cleanCode = String(code).replace(/\s/g, '').trim();

    // Validate code format (6 digits)
    if (!/^\d{6}$/.test(cleanCode)) {
      return false;
    }

    const result = verifySync({ token: cleanCode, secret });
    return result.valid;
  } catch (error) {
    console.error('TOTP verification error:', error);
    return false;
  }
}

// ============================================================================
// RECOVERY CODES
// ============================================================================

/**
 * Generate one-time recovery codes
 * @returns Array of 8 recovery codes (uppercase hex)
 */
export function generateRecoveryCodes(): string[] {
  return Array.from({ length: RECOVERY_CODE_COUNT }, () =>
    crypto
      .randomBytes(RECOVERY_CODE_LENGTH / 2)
      .toString('hex')
      .toUpperCase()
  );
}

/**
 * Hash a recovery code for storage
 * @param code - Plain text recovery code
 * @returns SHA-256 hash of the code
 */
export function hashRecoveryCode(code: string): string {
  return crypto.createHash('sha256').update(code.toUpperCase()).digest('hex');
}

/**
 * Verify a recovery code against stored hashes
 * @param code - Plain text recovery code to verify
 * @param storedHashes - Array of stored hashed codes
 * @returns Index of matched code, or -1 if not found
 */
export function verifyRecoveryCode(code: string, storedHashes: string[]): number {
  const cleanCode = code.replace(/\s/g, '').toUpperCase();
  const inputHash = hashRecoveryCode(cleanCode);

  return storedHashes.findIndex((hash) => hash === inputHash);
}

// ============================================================================
// SECRET ENCRYPTION (AES-256-GCM)
// ============================================================================

/**
 * Encrypt a TOTP secret for database storage
 * Format: iv:authTag:encryptedData (all hex encoded)
 * @param secret - Plain text TOTP secret
 * @returns Encrypted string safe for storage
 */
export function encryptSecret(secret: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(secret, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  // Format: iv:authTag:encryptedData
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypt an encrypted TOTP secret
 * @param encryptedData - Encrypted string from database
 * @returns Plain text TOTP secret
 * @throws Error if decryption fails
 */
export function decryptSecret(encryptedData: string): string {
  const key = getEncryptionKey();

  const parts = encryptedData.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format');
  }

  const [ivHex, authTagHex, encrypted] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if TOTP encryption is properly configured
 * @returns Boolean indicating if encryption key is available
 */
export function isTOTPConfigured(): boolean {
  try {
    getEncryptionKey();
    return true;
  } catch {
    return false;
  }
}

/**
 * Format recovery codes for display (groups of 4)
 * @param codes - Array of recovery codes
 * @returns Formatted codes for display
 */
export function formatRecoveryCodes(codes: string[]): string[] {
  return codes.map((code) => {
    // Format: XXXX-XXXX
    return `${code.slice(0, 4)}-${code.slice(4)}`;
  });
}

/**
 * Parse a formatted recovery code back to plain format
 * @param formattedCode - Code with possible dashes/spaces
 * @returns Clean uppercase code
 */
export function parseRecoveryCode(formattedCode: string): string {
  return formattedCode.replace(/[-\s]/g, '').toUpperCase();
}

// ============================================================================
// TYPES
// ============================================================================

export interface TOTPSetupData {
  secret: string;
  otpauth: string;
  qrCodeDataUrl?: string;
}

export interface TOTPVerifyResult {
  success: boolean;
  error?: string;
}

export interface RecoveryCodesResult {
  codes: string[];
  formattedCodes: string[];
  hashedCodes: string[];
}

/**
 * Generate recovery codes with all necessary formats
 * @returns Object with plain, formatted, and hashed codes
 */
export function generateRecoveryCodesWithHashes(): RecoveryCodesResult {
  const codes = generateRecoveryCodes();
  const formattedCodes = formatRecoveryCodes(codes);
  const hashedCodes = codes.map(hashRecoveryCode);

  return { codes, formattedCodes, hashedCodes };
}
