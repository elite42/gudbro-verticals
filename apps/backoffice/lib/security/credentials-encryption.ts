/**
 * Credentials Encryption Utility
 *
 * Provides symmetric AES encryption for API credentials stored in the database.
 * Uses application-level encryption with crypto-js.
 *
 * IMPORTANT: Set CREDENTIALS_ENCRYPTION_KEY environment variable (min 32 chars)
 */

import CryptoJS from 'crypto-js';

const getEncryptionKey = (): string => {
  const key = process.env.CREDENTIALS_ENCRYPTION_KEY;
  if (!key) {
    throw new Error('CREDENTIALS_ENCRYPTION_KEY environment variable is not set');
  }
  if (key.length < 32) {
    throw new Error('CREDENTIALS_ENCRYPTION_KEY must be at least 32 characters');
  }
  return key;
};

/**
 * Encrypt credentials object to string
 */
export function encryptCredentials(data: Record<string, string>): string {
  const key = getEncryptionKey();
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, key).toString();
}

/**
 * Decrypt credentials string to object
 */
export function decryptCredentials(encryptedData: string): Record<string, string> {
  const key = getEncryptionKey();

  // Handle legacy unencrypted JSON data
  if (encryptedData.startsWith('{')) {
    try {
      return JSON.parse(encryptedData);
    } catch {
      throw new Error('Invalid credentials format');
    }
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedString) {
      throw new Error('Decryption failed - invalid key or corrupted data');
    }
    return JSON.parse(decryptedString);
  } catch (error) {
    throw new Error(
      `Failed to decrypt credentials: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Check if encryption key is configured
 */
export function isEncryptionConfigured(): boolean {
  try {
    getEncryptionKey();
    return true;
  } catch {
    return false;
  }
}

/**
 * Migrate unencrypted credentials to encrypted format
 * Returns null if already encrypted or if encryption is not configured
 */
export function migrateToEncrypted(data: string): string | null {
  if (!isEncryptionConfigured()) {
    return null;
  }

  // Check if already encrypted (doesn't start with {)
  if (!data.startsWith('{')) {
    return null;
  }

  try {
    const parsed = JSON.parse(data);
    return encryptCredentials(parsed);
  } catch {
    return null;
  }
}
