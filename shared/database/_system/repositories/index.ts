/**
 * GUDBRO Database Repositories
 *
 * Provider-agnostic data access layer.
 * Currently using mock repositories for offline development.
 *
 * When ready for production, swap implementations:
 * - Supabase: shared/database/repositories/supabase/
 * - Firebase: shared/database/repositories/firebase/
 * - Cloud SQL: shared/database/repositories/cloudsql/
 */

// ============================================================================
// MOCK REPOSITORIES (For offline development)
// ============================================================================

export {
  MockMenuRepository,
  mockMenuRepository,
  resetMockData,
} from './mock-menu-repository';

export {
  MockMerchantRepository,
  mockMerchantRepository,
  resetMockMerchants,
} from './mock-merchant-repository';

// ============================================================================
// SUPABASE REPOSITORIES (Production)
// ============================================================================

export {
  SupabaseMenuRepository,
  supabaseMenuRepository,
  getSupabaseClient,
  createSupabaseClient,
  getSupabaseAdminClient,
} from './supabase';

// ============================================================================
// MOCK DATA
// ============================================================================

export {
  demoMerchant,
  demoMerchantUsers,
  demoCategories,
  demoMenuItems,
  demoMenuItemIngredients,
  mockDataBundle,
} from './mock-data';

// ============================================================================
// REPOSITORY FACTORY
// ============================================================================

import type { IMerchantRepository, IMenuRepository } from '../types';
import { mockMerchantRepository } from './mock-merchant-repository';
import { mockMenuRepository } from './mock-menu-repository';
import { supabaseMenuRepository } from './supabase';

/**
 * Database provider types
 */
export type DatabaseProvider = 'mock' | 'supabase' | 'firebase' | 'cloudsql';

/**
 * Repository configuration
 */
export interface RepositoryConfig {
  provider: DatabaseProvider;
  connectionString?: string;
  projectId?: string; // For Firebase
  apiKey?: string;
}

/**
 * Get merchant repository based on provider
 */
export function getMerchantRepository(
  config?: RepositoryConfig
): IMerchantRepository {
  const provider = config?.provider ?? 'mock';

  switch (provider) {
    case 'supabase':
      // TODO: Import and return Supabase implementation
      console.warn('Supabase repository not implemented, using mock');
      return mockMerchantRepository;

    case 'firebase':
      // TODO: Import and return Firebase implementation
      console.warn('Firebase repository not implemented, using mock');
      return mockMerchantRepository;

    case 'cloudsql':
      // TODO: Import and return Cloud SQL implementation
      console.warn('Cloud SQL repository not implemented, using mock');
      return mockMerchantRepository;

    case 'mock':
    default:
      return mockMerchantRepository;
  }
}

/**
 * Get menu repository based on provider
 */
export function getMenuRepository(config?: RepositoryConfig): IMenuRepository {
  const provider = config?.provider ?? 'mock';

  switch (provider) {
    case 'supabase':
      return supabaseMenuRepository;

    case 'firebase':
      // TODO: Import and return Firebase implementation
      console.warn('Firebase repository not implemented, using mock');
      return mockMenuRepository;

    case 'cloudsql':
      // TODO: Import and return Cloud SQL implementation
      console.warn('Cloud SQL repository not implemented, using mock');
      return mockMenuRepository;

    case 'mock':
    default:
      return mockMenuRepository;
  }
}

/**
 * Initialize all repositories with given configuration
 */
export function initializeRepositories(config?: RepositoryConfig): {
  merchantRepository: IMerchantRepository;
  menuRepository: IMenuRepository;
} {
  return {
    merchantRepository: getMerchantRepository(config),
    menuRepository: getMenuRepository(config),
  };
}
