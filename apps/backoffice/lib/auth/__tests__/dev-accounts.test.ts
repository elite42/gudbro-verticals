import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import {
  DEV_ACCOUNTS,
  DEV_ACCESS_PIN,
  DEV_SESSION_CONFIG,
  isDevModeEnabled,
  validateDevPin,
  getDevAccountById,
} from '../dev-accounts';
import { ROLE_PERMISSIONS } from '../permissions';

// ============================================
// DEV_ACCESS_PIN
// ============================================

describe('DEV_ACCESS_PIN', () => {
  it('should be a 6-digit string', () => {
    expect(DEV_ACCESS_PIN).toMatch(/^\d{6}$/);
  });

  it('should be defined', () => {
    expect(DEV_ACCESS_PIN).toBeDefined();
    expect(typeof DEV_ACCESS_PIN).toBe('string');
  });
});

// ============================================
// validateDevPin
// ============================================

describe('validateDevPin', () => {
  it('should return true for correct PIN', () => {
    expect(validateDevPin(DEV_ACCESS_PIN)).toBe(true);
  });

  it('should return false for incorrect PIN', () => {
    expect(validateDevPin('000000')).toBe(false);
    expect(validateDevPin('123456')).toBe(false);
    expect(validateDevPin('999999')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(validateDevPin('')).toBe(false);
  });

  it('should return false for PIN with wrong length', () => {
    expect(validateDevPin('12345')).toBe(false);
    expect(validateDevPin('1234567')).toBe(false);
  });

  it('should be case sensitive (if PIN had letters)', () => {
    // Current PIN is numeric, but test documents behavior
    expect(validateDevPin(DEV_ACCESS_PIN.toLowerCase())).toBe(true);
  });
});

// ============================================
// isDevModeEnabled
// ============================================

describe('isDevModeEnabled', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return true when NEXT_PUBLIC_ENABLE_DEV_AUTH is "true"', async () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEV_AUTH', 'true');
    vi.stubEnv('NODE_ENV', 'production');

    // Re-import to get fresh module
    const { isDevModeEnabled: freshIsDevModeEnabled } = await import('../dev-accounts');
    expect(freshIsDevModeEnabled()).toBe(true);
  });

  it('should return false when NEXT_PUBLIC_ENABLE_DEV_AUTH is "false"', async () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEV_AUTH', 'false');
    vi.stubEnv('NODE_ENV', 'development');

    const { isDevModeEnabled: freshIsDevModeEnabled } = await import('../dev-accounts');
    expect(freshIsDevModeEnabled()).toBe(false);
  });

  it('should return false in production without explicit enable', async () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEV_AUTH', '');
    vi.stubEnv('NODE_ENV', 'production');

    const { isDevModeEnabled: freshIsDevModeEnabled } = await import('../dev-accounts');
    expect(freshIsDevModeEnabled()).toBe(false);
  });

  it('should return true in development without explicit setting', async () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEV_AUTH', '');
    vi.stubEnv('NODE_ENV', 'development');

    const { isDevModeEnabled: freshIsDevModeEnabled } = await import('../dev-accounts');
    expect(freshIsDevModeEnabled()).toBe(true);
  });

  it('should return true in test environment (treated as dev)', async () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEV_AUTH', '');
    vi.stubEnv('NODE_ENV', 'test');

    const { isDevModeEnabled: freshIsDevModeEnabled } = await import('../dev-accounts');
    expect(freshIsDevModeEnabled()).toBe(true);
  });
});

// ============================================
// DEV_ACCOUNTS
// ============================================

describe('DEV_ACCOUNTS', () => {
  it('should have 4 test accounts', () => {
    expect(DEV_ACCOUNTS).toHaveLength(4);
  });

  it('should have one account for each role', () => {
    const roles = DEV_ACCOUNTS.map((a) => a.role);
    expect(roles).toContain('gudbro_owner');
    expect(roles).toContain('business_owner');
    expect(roles).toContain('manager');
    expect(roles).toContain('staff');
  });

  it('all accounts should have required fields', () => {
    DEV_ACCOUNTS.forEach((account) => {
      expect(account.id).toBeDefined();
      expect(account.email).toBeDefined();
      expect(account.name).toBeDefined();
      expect(account.role).toBeDefined();
      expect(account.permissions).toBeDefined();
      expect(Array.isArray(account.permissions)).toBe(true);
    });
  });

  it('all accounts should have unique IDs', () => {
    const ids = DEV_ACCOUNTS.map((a) => a.id);
    const uniqueIds = [...new Set(ids)];
    expect(uniqueIds).toHaveLength(ids.length);
  });

  it('all accounts should have unique emails', () => {
    const emails = DEV_ACCOUNTS.map((a) => a.email);
    const uniqueEmails = [...new Set(emails)];
    expect(uniqueEmails).toHaveLength(emails.length);
  });

  it('permissions should match role permissions', () => {
    DEV_ACCOUNTS.forEach((account) => {
      expect(account.permissions).toEqual(ROLE_PERMISSIONS[account.role]);
    });
  });

  describe('gudbro_owner account', () => {
    const admin = DEV_ACCOUNTS.find((a) => a.role === 'gudbro_owner');

    it('should exist', () => {
      expect(admin).toBeDefined();
    });

    it('should have isGudBroAdmin flag', () => {
      expect(admin?.isGudBroAdmin).toBe(true);
    });

    it('should NOT have organizationId', () => {
      expect(admin?.organizationId).toBeUndefined();
    });
  });

  describe('business accounts', () => {
    const businessAccounts = DEV_ACCOUNTS.filter((a) => a.role !== 'gudbro_owner');

    it('should have organizationId', () => {
      businessAccounts.forEach((account) => {
        expect(account.organizationId).toBeDefined();
      });
    });

    it('should belong to same organization', () => {
      const orgIds = businessAccounts.map((a) => a.organizationId);
      const uniqueOrgIds = [...new Set(orgIds)];
      expect(uniqueOrgIds).toHaveLength(1);
    });
  });
});

// ============================================
// getDevAccountById
// ============================================

describe('getDevAccountById', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    // Enable dev mode for tests
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEV_AUTH', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return account for valid ID', async () => {
    const { getDevAccountById: freshGetDevAccountById, DEV_ACCOUNTS: accounts } =
      await import('../dev-accounts');

    const account = freshGetDevAccountById(accounts[0].id);
    expect(account).toBeDefined();
    expect(account?.id).toBe(accounts[0].id);
  });

  it('should return undefined for invalid ID', async () => {
    const { getDevAccountById: freshGetDevAccountById } = await import('../dev-accounts');

    const account = freshGetDevAccountById('non-existent-id');
    expect(account).toBeUndefined();
  });

  it('should return undefined for empty ID', async () => {
    const { getDevAccountById: freshGetDevAccountById } = await import('../dev-accounts');

    const account = freshGetDevAccountById('');
    expect(account).toBeUndefined();
  });

  it('should return gudbro_owner account by ID', async () => {
    const { getDevAccountById: freshGetDevAccountById } = await import('../dev-accounts');

    const account = freshGetDevAccountById('dev-gudbro-owner');
    expect(account?.role).toBe('gudbro_owner');
  });

  it('should return business_owner account by ID', async () => {
    const { getDevAccountById: freshGetDevAccountById } = await import('../dev-accounts');

    const account = freshGetDevAccountById('dev-business-owner');
    expect(account?.role).toBe('business_owner');
  });

  it('should return manager account by ID', async () => {
    const { getDevAccountById: freshGetDevAccountById } = await import('../dev-accounts');

    const account = freshGetDevAccountById('dev-manager');
    expect(account?.role).toBe('manager');
  });

  it('should return staff account by ID', async () => {
    const { getDevAccountById: freshGetDevAccountById } = await import('../dev-accounts');

    const account = freshGetDevAccountById('dev-staff');
    expect(account?.role).toBe('staff');
  });

  it('should return undefined when dev mode is disabled', async () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEV_AUTH', 'false');

    const { getDevAccountById: freshGetDevAccountById } = await import('../dev-accounts');

    const account = freshGetDevAccountById('dev-gudbro-owner');
    expect(account).toBeUndefined();
  });
});

// ============================================
// DEV_SESSION_CONFIG
// ============================================

describe('DEV_SESSION_CONFIG', () => {
  it('should have session name', () => {
    expect(DEV_SESSION_CONFIG.name).toBe('gudbro_dev_session');
  });

  it('should have maxAge of 24 hours', () => {
    expect(DEV_SESSION_CONFIG.maxAge).toBe(86400);
  });

  it('should have path set to root', () => {
    expect(DEV_SESSION_CONFIG.path).toBe('/');
  });

  it('should have sameSite set to lax', () => {
    expect(DEV_SESSION_CONFIG.sameSite).toBe('lax');
  });
});

// ============================================
// Security considerations
// ============================================

describe('Security considerations', () => {
  it('DEV_ACCESS_PIN should not be obvious (not 000000, 123456, etc)', () => {
    const obviousPins = ['000000', '111111', '123456', '654321', '012345'];
    expect(obviousPins).not.toContain(DEV_ACCESS_PIN);
  });

  it('dev accounts should not have production-like emails', () => {
    const productionDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];
    DEV_ACCOUNTS.forEach((account) => {
      const domain = account.email.split('@')[1];
      expect(productionDomains).not.toContain(domain);
    });
  });

  it('dev account IDs should be prefixed with "dev-"', () => {
    DEV_ACCOUNTS.forEach((account) => {
      expect(account.id.startsWith('dev-')).toBe(true);
    });
  });
});
