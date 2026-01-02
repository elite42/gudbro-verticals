/**
 * GUDBRO Menu Management Types
 *
 * TypeScript types matching the PostgreSQL schema in:
 * shared/database/schema/001-menu-management.sql
 *
 * These types are used by:
 * - Backoffice: Menu builder, product editor
 * - PWA: Digital menu display
 * - API: Repository pattern for data access
 *
 * Integrated with Sistema 5 Dimensioni v3.0
 */

import type {
  MultiLangText,
  AllergenFlags,
  IntoleranceFlags,
  DietaryFlags,
  SpiceLevel,
  ProductCustomization,
} from './index';

// ============================================================================
// ENUMS (Matching SQL CHECK constraints)
// ============================================================================

/**
 * SaaS tier levels - determines feature availability
 */
export type SaaSTier = 'digital_menu' | 'pre_ordering' | 'full_suite';

/**
 * User roles for backoffice access
 */
export type MerchantUserRole = 'owner' | 'admin' | 'manager' | 'staff';

/**
 * Authentication providers (provider-agnostic design)
 */
export type AuthProvider = 'email' | 'google' | 'supabase' | 'firebase';

/**
 * WiFi security types
 */
export type WiFiSecurity = 'WPA' | 'WPA2' | 'WPA3' | 'WEP' | 'OPEN';

/**
 * How safety data was determined
 */
export type SafetyDataSource = 'manual' | 'computed' | 'recipe';

// ============================================================================
// MERCHANT (Tenant)
// ============================================================================

/**
 * Merchant - the main tenant in the SaaS platform
 * Each merchant has their own menu, users, and settings
 */
export interface Merchant {
  // Primary key
  id: string; // UUID

  // Basic Info
  slug: string; // URL-friendly identifier (e.g., "roots-danang")
  name: string;
  description?: string;

  // Contact
  email: string;
  phone?: string;
  website?: string;

  // Location
  address?: string;
  city?: string;
  country?: string; // ISO 3166-1 alpha-2 (e.g., "VN", "IT")
  timezone: string; // e.g., "Asia/Ho_Chi_Minh"

  // Branding
  logoUrl?: string;
  coverImageUrl?: string;
  primaryColor: string; // Hex color (e.g., "#000000")
  secondaryColor: string;

  // Business Settings
  currency: string; // ISO 4217 (e.g., "VND", "EUR")
  defaultLanguage: string; // ISO 639-1 (e.g., "en")
  supportedLanguages: string[];

  // SaaS Tier
  tier: SaaSTier;
  tierExpiresAt?: string; // ISO 8601 datetime

  // WiFi (for Tier 2+)
  wifiEnabled: boolean;
  wifiSsid?: string;
  wifiPassword?: string;
  wifiSecurity: WiFiSecurity;

  // Status
  isActive: boolean;
  isVerified: boolean;

  // Metadata
  createdAt: string; // ISO 8601
  updatedAt: string;
}

/**
 * Merchant creation input (without auto-generated fields)
 */
export interface CreateMerchantInput {
  slug: string;
  name: string;
  email: string;
  description?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  timezone?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  currency?: string;
  defaultLanguage?: string;
  supportedLanguages?: string[];
  tier?: SaaSTier;
  wifiEnabled?: boolean;
  wifiSsid?: string;
  wifiPassword?: string;
  wifiSecurity?: WiFiSecurity;
}

/**
 * Merchant update input (all fields optional)
 */
export type UpdateMerchantInput = Partial<Omit<CreateMerchantInput, 'slug'>>;

// ============================================================================
// MERCHANT USER (Staff/Owners with backoffice access)
// ============================================================================

/**
 * Merchant User - staff member with backoffice access
 */
export interface MerchantUser {
  id: string;
  merchantId: string;

  // Auth (provider-agnostic)
  authProvider: AuthProvider;
  authProviderId?: string; // External auth system ID

  // Profile
  email: string;
  name?: string;
  avatarUrl?: string;
  phone?: string;

  // Role & Permissions
  role: MerchantUserRole;
  permissions: Record<string, boolean>; // Granular permissions if needed

  // Status
  isActive: boolean;
  lastLoginAt?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Permissions map for granular access control
 */
export interface MerchantUserPermissions {
  // Menu management
  canViewMenu: boolean;
  canEditMenu: boolean;
  canDeleteMenuItems: boolean;
  canManageCategories: boolean;

  // Orders (future)
  canViewOrders: boolean;
  canManageOrders: boolean;

  // Analytics
  canViewAnalytics: boolean;

  // Settings
  canEditSettings: boolean;
  canManageBilling: boolean;
  canManageTeam: boolean;

  // Translations
  canManageTranslations: boolean;

  // QR Codes
  canManageQRCodes: boolean;
}

/**
 * Create merchant user input
 */
export interface CreateMerchantUserInput {
  merchantId: string;
  email: string;
  name?: string;
  role?: MerchantUserRole;
  authProvider?: AuthProvider;
  authProviderId?: string;
  permissions?: Partial<MerchantUserPermissions>;
}

// ============================================================================
// MENU CATEGORY
// ============================================================================

/**
 * Menu Category - groups related menu items
 */
export interface MenuCategory {
  id: string;
  merchantId: string;

  // Basic Info
  slug: string;
  name: MultiLangText; // {"en": "Hot Coffee", "vi": "Cà phê nóng"}
  description?: MultiLangText;

  // Visual
  icon?: string; // Emoji
  imageUrl?: string;
  color?: string; // Hex color

  // Display
  displayOrder: number;
  isActive: boolean;

  // Time-based visibility
  visibleFrom?: string; // TIME format "HH:MM:SS"
  visibleTo?: string;
  visibleDays?: number[]; // 0=Sunday, 6=Saturday

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Create menu category input
 */
export interface CreateMenuCategoryInput {
  merchantId: string;
  slug: string;
  name: MultiLangText;
  description?: MultiLangText;
  icon?: string;
  imageUrl?: string;
  color?: string;
  displayOrder?: number;
  isActive?: boolean;
  visibleFrom?: string;
  visibleTo?: string;
  visibleDays?: number[];
}

/**
 * Update menu category input
 */
export type UpdateMenuCategoryInput = Partial<Omit<CreateMenuCategoryInput, 'merchantId'>>;

// ============================================================================
// MENU ITEM (Product in merchant's menu)
// ============================================================================

/**
 * Menu Item - a product in the merchant's digital menu
 * Integrated with Sistema 5 Dimensioni for allergen/dietary safety
 */
export interface MenuItem {
  id: string;
  merchantId: string;
  categoryId?: string;

  // Basic Info
  slug: string;
  name: MultiLangText;
  description?: MultiLangText;
  shortDescription?: MultiLangText;

  // Pricing
  price: number; // Decimal (e.g., 85000 for 85,000 VND)
  compareAtPrice?: number; // Original price for discounts
  currency: string;

  // Images
  imageUrl?: string;
  thumbnailUrl?: string;
  galleryUrls?: string[];

  // ========== SISTEMA 51 FILTRI ==========
  allergens: AllergenFlags;
  intolerances: IntoleranceFlags;
  dietaryFlags: DietaryFlags;
  spiceLevel: SpiceLevel;
  basedOnRecipeId?: string; // Reference to master recipe if using centralized database
  safetyDataSource: SafetyDataSource;
  // =======================================

  // Nutrition (optional)
  calories?: number;
  nutritionInfo?: MenuItemNutrition;

  // Customizations (milk type, size, extras)
  customizations: ProductCustomization[];

  // Inventory
  trackInventory: boolean;
  inventoryCount?: number;
  lowStockThreshold: number;

  // Availability
  isAvailable: boolean;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  newUntil?: string; // DATE format

  // Time-based availability
  availableFrom?: string; // TIME format
  availableTo?: string;
  availableDays?: number[];

  // Display
  displayOrder: number;
  tags: string[];

  // Stats
  totalOrders: number;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Nutrition info for a menu item
 */
export interface MenuItemNutrition {
  servingSize?: string;
  servingSizeGrams?: number;
  calories?: number;
  protein?: number; // grams
  carbohydrates?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number; // mg
}

/**
 * Create menu item input
 */
export interface CreateMenuItemInput {
  merchantId: string;
  categoryId?: string;
  slug: string;
  name: MultiLangText;
  price: number;
  description?: MultiLangText;
  shortDescription?: MultiLangText;
  compareAtPrice?: number;
  currency?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  galleryUrls?: string[];
  allergens?: AllergenFlags;
  intolerances?: IntoleranceFlags;
  dietaryFlags?: DietaryFlags;
  spiceLevel?: SpiceLevel;
  basedOnRecipeId?: string;
  safetyDataSource?: SafetyDataSource;
  calories?: number;
  nutritionInfo?: MenuItemNutrition;
  customizations?: ProductCustomization[];
  trackInventory?: boolean;
  inventoryCount?: number;
  lowStockThreshold?: number;
  isAvailable?: boolean;
  isActive?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  newUntil?: string;
  availableFrom?: string;
  availableTo?: string;
  availableDays?: number[];
  displayOrder?: number;
  tags?: string[];
}

/**
 * Update menu item input
 */
export type UpdateMenuItemInput = Partial<Omit<CreateMenuItemInput, 'merchantId' | 'slug'>>;

// ============================================================================
// MENU ITEM INGREDIENT (For auto-computing safety data)
// ============================================================================

/**
 * Menu Item Ingredient - links menu items to master ingredients
 * Used for auto-computing allergens/intolerances from ingredients
 */
export interface MenuItemIngredient {
  id: string;
  menuItemId: string;

  // Reference to master ingredient (from shared food-database)
  masterIngredientId?: string;

  // Or manual entry
  ingredientName?: MultiLangText;

  // Quantity
  quantity?: number;
  unit?: string;

  // Flags from ingredient (cached for performance)
  allergens: AllergenFlags;
  intolerances: IntoleranceFlags;
  dietaryFlags: DietaryFlags;

  isOptional: boolean;
  displayOrder: number;

  createdAt: string;
}

/**
 * Create menu item ingredient input
 */
export interface CreateMenuItemIngredientInput {
  menuItemId: string;
  masterIngredientId?: string;
  ingredientName?: MultiLangText;
  quantity?: number;
  unit?: string;
  allergens?: AllergenFlags;
  intolerances?: IntoleranceFlags;
  dietaryFlags?: DietaryFlags;
  isOptional?: boolean;
  displayOrder?: number;
}

// ============================================================================
// PWA VIEW TYPES (For frontend consumption)
// ============================================================================

/**
 * Full menu for PWA display
 * Matches the v_merchant_menu SQL view
 */
export interface MerchantMenuView {
  merchantSlug: string;
  merchantName: string;
  logoUrl?: string;
  primaryColor: string;
  currency: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  wifiEnabled: boolean;
  wifiSsid?: string;
  categories: MenuCategoryWithItems[];
}

/**
 * Category with its items for display
 */
export interface MenuCategoryWithItems {
  id: string;
  slug: string;
  name: MultiLangText;
  icon?: string;
  displayOrder: number;
  items: MenuItemSummary[];
}

/**
 * Menu item summary for list display
 */
export interface MenuItemSummary {
  id: string;
  slug: string;
  name: MultiLangText;
  description?: MultiLangText;
  price: number;
  imageUrl?: string;
  allergens: AllergenFlags;
  intolerances: IntoleranceFlags;
  dietaryFlags: DietaryFlags;
  spiceLevel: SpiceLevel;
  customizations: ProductCustomization[];
  isFeatured: boolean;
  isNew: boolean;
  displayOrder: number;
}

/**
 * Menu item full detail for single item view
 */
export interface MenuItemFullView extends MenuItem {
  category?: MenuCategory;
  merchant?: Pick<Merchant, 'slug' | 'name' | 'currency' | 'defaultLanguage'>;
  ingredients?: MenuItemIngredient[];
}

// ============================================================================
// FILTER TYPES (For PWA filtering)
// ============================================================================

/**
 * User dietary preferences for filtering
 */
export interface UserDietaryPreferences {
  // Allergens to avoid
  excludeAllergens: (keyof AllergenFlags)[];

  // Intolerances to consider
  excludeIntolerances: (keyof IntoleranceFlags)[];

  // Required dietary flags
  requiredDiets: (keyof DietaryFlags)[];

  // Max spice level
  maxSpiceLevel?: SpiceLevel;
}

/**
 * Menu filter options
 */
export interface MenuFilterOptions {
  // Category filter
  categoryId?: string;
  categorySlug?: string;

  // Search
  searchQuery?: string;

  // Price range
  minPrice?: number;
  maxPrice?: number;

  // Dietary preferences
  dietary?: UserDietaryPreferences;

  // Availability
  availableOnly?: boolean;
  featuredOnly?: boolean;
  newOnly?: boolean;

  // Sorting
  sortBy?: 'displayOrder' | 'price' | 'name' | 'popularity';
  sortOrder?: 'asc' | 'desc';

  // Pagination
  limit?: number;
  offset?: number;
}

/**
 * Filtered menu result
 */
export interface FilteredMenuResult {
  items: MenuItemSummary[];
  total: number;
  hasMore: boolean;
  appliedFilters: MenuFilterOptions;
}

// ============================================================================
// REPOSITORY INTERFACE (For data access abstraction)
// ============================================================================

/**
 * Merchant Repository Interface
 * Can be implemented with Supabase, Firebase, Cloud SQL, etc.
 */
export interface IMerchantRepository {
  // Read
  findBySlug(slug: string): Promise<Merchant | null>;
  findById(id: string): Promise<Merchant | null>;
  list(options?: { limit?: number; offset?: number }): Promise<Merchant[]>;

  // Write
  create(input: CreateMerchantInput): Promise<Merchant>;
  update(id: string, input: UpdateMerchantInput): Promise<Merchant>;
  delete(id: string): Promise<void>;
}

/**
 * Menu Repository Interface
 */
export interface IMenuRepository {
  // Categories
  listCategories(merchantId: string): Promise<MenuCategory[]>;
  getCategory(id: string): Promise<MenuCategory | null>;
  createCategory(input: CreateMenuCategoryInput): Promise<MenuCategory>;
  updateCategory(id: string, input: UpdateMenuCategoryInput): Promise<MenuCategory>;
  deleteCategory(id: string): Promise<void>;
  reorderCategories(merchantId: string, categoryIds: string[]): Promise<void>;

  // Menu Items
  listItems(merchantId: string, options?: MenuFilterOptions): Promise<FilteredMenuResult>;
  getItem(id: string): Promise<MenuItemFullView | null>;
  getItemBySlug(merchantId: string, slug: string): Promise<MenuItemFullView | null>;
  createItem(input: CreateMenuItemInput): Promise<MenuItem>;
  updateItem(id: string, input: UpdateMenuItemInput): Promise<MenuItem>;
  deleteItem(id: string): Promise<void>;
  reorderItems(categoryId: string, itemIds: string[]): Promise<void>;

  // Item Ingredients
  listItemIngredients(menuItemId: string): Promise<MenuItemIngredient[]>;
  addItemIngredient(input: CreateMenuItemIngredientInput): Promise<MenuItemIngredient>;
  removeItemIngredient(id: string): Promise<void>;
  recomputeItemSafety(menuItemId: string): Promise<MenuItem>;

  // Full Menu (for PWA)
  getFullMenu(merchantSlug: string): Promise<MerchantMenuView | null>;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  // Enums
  SaaSTier,
  MerchantUserRole,
  AuthProvider,
  WiFiSecurity,
  SafetyDataSource,

  // Merchant
  Merchant,
  CreateMerchantInput,
  UpdateMerchantInput,

  // Merchant User
  MerchantUser,
  MerchantUserPermissions,
  CreateMerchantUserInput,

  // Menu Category
  MenuCategory,
  CreateMenuCategoryInput,
  UpdateMenuCategoryInput,

  // Menu Item
  MenuItem,
  MenuItemNutrition,
  CreateMenuItemInput,
  UpdateMenuItemInput,

  // Menu Item Ingredient
  MenuItemIngredient,
  CreateMenuItemIngredientInput,

  // PWA Views
  MerchantMenuView,
  MenuCategoryWithItems,
  MenuItemSummary,
  MenuItemFullView,

  // Filters
  UserDietaryPreferences,
  MenuFilterOptions,
  FilteredMenuResult,

  // Repositories
  IMerchantRepository,
  IMenuRepository,
};
