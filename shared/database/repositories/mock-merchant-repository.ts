/**
 * Mock Merchant Repository
 *
 * In-memory implementation of IMerchantRepository for offline development.
 */

import type {
  IMerchantRepository,
  Merchant,
  CreateMerchantInput,
  UpdateMerchantInput,
} from '../types';

import { demoMerchant } from './mock-data';

// ============================================================================
// IN-MEMORY STORAGE
// ============================================================================

let merchants: Merchant[] = [JSON.parse(JSON.stringify(demoMerchant))];

// UUID generator
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// ============================================================================
// MOCK MERCHANT REPOSITORY
// ============================================================================

export class MockMerchantRepository implements IMerchantRepository {
  async findBySlug(slug: string): Promise<Merchant | null> {
    return merchants.find((m) => m.slug === slug) || null;
  }

  async findById(id: string): Promise<Merchant | null> {
    return merchants.find((m) => m.id === id) || null;
  }

  async list(options?: {
    limit?: number;
    offset?: number;
  }): Promise<Merchant[]> {
    const offset = options?.offset ?? 0;
    const limit = options?.limit ?? 50;

    return merchants
      .filter((m) => m.isActive)
      .slice(offset, offset + limit);
  }

  async create(input: CreateMerchantInput): Promise<Merchant> {
    // Check for duplicate slug
    if (merchants.find((m) => m.slug === input.slug)) {
      throw new Error(`Merchant with slug "${input.slug}" already exists`);
    }

    const now = new Date().toISOString();
    const newMerchant: Merchant = {
      id: generateUUID(),
      slug: input.slug,
      name: input.name,
      email: input.email,
      description: input.description,
      phone: input.phone,
      website: input.website,
      address: input.address,
      city: input.city,
      country: input.country,
      timezone: input.timezone ?? 'Asia/Ho_Chi_Minh',
      logoUrl: input.logoUrl,
      coverImageUrl: input.coverImageUrl,
      primaryColor: input.primaryColor ?? '#000000',
      secondaryColor: input.secondaryColor ?? '#ffffff',
      currency: input.currency ?? 'VND',
      defaultLanguage: input.defaultLanguage ?? 'en',
      supportedLanguages: input.supportedLanguages ?? ['en'],
      tier: input.tier ?? 'digital_menu',
      tierExpiresAt: undefined,
      wifiEnabled: input.wifiEnabled ?? false,
      wifiSsid: input.wifiSsid,
      wifiPassword: input.wifiPassword,
      wifiSecurity: input.wifiSecurity ?? 'WPA2',
      isActive: true,
      isVerified: false,
      createdAt: now,
      updatedAt: now,
    };

    merchants.push(newMerchant);
    return newMerchant;
  }

  async update(id: string, input: UpdateMerchantInput): Promise<Merchant> {
    const index = merchants.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Merchant not found: ${id}`);
    }

    const updated: Merchant = {
      ...merchants[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };

    merchants[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<void> {
    const index = merchants.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Merchant not found: ${id}`);
    }

    // Soft delete
    merchants[index] = {
      ...merchants[index],
      isActive: false,
      updatedAt: new Date().toISOString(),
    };
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const mockMerchantRepository = new MockMerchantRepository();

// ============================================================================
// RESET FUNCTION (for testing)
// ============================================================================

export const resetMockMerchants = (): void => {
  merchants = [JSON.parse(JSON.stringify(demoMerchant))];
};
