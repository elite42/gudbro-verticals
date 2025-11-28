/**
 * Engagement Store
 * Manages user engagement actions (reviews, social shares, etc.)
 * with localStorage persistence, discount code generation, and device fingerprinting
 */

export type EngagementAction = 'review' | 'photo' | 'checkin' | 'follow';

export interface EngagementRecord {
  id: string;
  userId: string;
  deviceId: string; // Device fingerprint for anti-abuse
  action: EngagementAction;
  rating?: 1 | 2 | 3 | 4 | 5;
  feedbackText?: string;
  suggestions?: string;
  contactRequested?: boolean;
  platform?: 'google' | 'tripadvisor' | 'facebook' | 'instagram';
  instagramUsername?: string;
  postUrl?: string;
  email?: string; // Optional email for sending discount code
  discountCode: string;
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  used: boolean;
  createdAt: string;
  expiresAt: string;
}

const STORAGE_KEY = 'roots-engagement';
const DEVICE_ID_KEY = 'roots-device-id';

/**
 * Generate device fingerprint for anti-abuse
 */
function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server';

  // Check if we already have a device ID
  const stored = localStorage.getItem(DEVICE_ID_KEY);
  if (stored) return stored;

  // Generate device fingerprint
  const userAgent = navigator.userAgent || 'unknown';
  const language = navigator.language || 'unknown';
  const screenResolution = `${screen.width}x${screen.height}`;
  const colorDepth = screen.colorDepth || 24;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';

  // Create fingerprint string
  const fingerprint = `${userAgent}-${language}-${screenResolution}-${colorDepth}-${timezone}`;

  // Hash it (simple base64 encoding for now, in production use better hashing)
  const hashed = btoa(fingerprint).substring(0, 32);

  // Create unique device ID
  const deviceId = `device_${hashed}_${Date.now()}`;

  // Store for future use
  localStorage.setItem(DEVICE_ID_KEY, deviceId);

  return deviceId;
}

/**
 * Generate a unique discount code
 */
function generateDiscountCode(action: EngagementAction, rating?: number): string {
  const prefix = action === 'review'
    ? (rating && rating >= 4 ? 'REVIEW' : 'FEEDBACK')
    : action === 'photo'
    ? 'PHOTO'
    : action === 'checkin'
    ? 'CHECKIN'
    : 'FOLLOW';

  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${random}`;
}

/**
 * Get discount value based on action and rating
 */
function getDiscountValue(action: EngagementAction, rating?: number): number {
  if (action === 'review') {
    return rating && rating < 4 ? 15 : 10; // 15% for feedback, 10% for review
  }
  if (action === 'photo') return 10;
  if (action === 'checkin') return 5;
  if (action === 'follow') return 5;
  return 0;
}

/**
 * Calculate expiration date (30 days from now)
 */
function getExpirationDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString();
}

/**
 * Engagement Store
 */
export const engagementStore = {
  /**
   * Get all engagement records for current user
   */
  getAll(): EngagementRecord[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to load engagement records:', error);
      return [];
    }
  },

  /**
   * Check if user/device has already completed an action
   * Uses device fingerprinting to prevent abuse
   */
  hasCompleted(action: EngagementAction): boolean {
    const records = this.getAll();
    const deviceId = getDeviceId();

    return records.some(r =>
      r.action === action &&
      (r.deviceId === deviceId || r.userId === deviceId)
    );
  },

  /**
   * Create a new engagement record
   */
  create(data: {
    userId: string;
    action: EngagementAction;
    rating?: 1 | 2 | 3 | 4 | 5;
    feedbackText?: string;
    suggestions?: string;
    contactRequested?: boolean;
    platform?: 'google' | 'tripadvisor' | 'facebook' | 'instagram';
    instagramUsername?: string;
    postUrl?: string;
    email?: string;
  }): EngagementRecord {
    if (typeof window === 'undefined') {
      throw new Error('Cannot create engagement record on server');
    }

    const deviceId = getDeviceId();
    const discountCode = generateDiscountCode(data.action, data.rating);
    const discountValue = getDiscountValue(data.action, data.rating);

    const record: EngagementRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2)}`,
      ...data,
      deviceId,
      discountCode,
      discountValue,
      discountType: 'percentage',
      used: false,
      createdAt: new Date().toISOString(),
      expiresAt: getExpirationDate(),
    };

    try {
      const records = this.getAll();
      records.push(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));

      // Dispatch event for reactive updates
      window.dispatchEvent(new Event('engagement-updated'));

      return record;
    } catch (error) {
      console.error('Failed to save engagement record:', error);
      throw error;
    }
  },

  /**
   * Mark a discount code as used
   */
  markAsUsed(discountCode: string): void {
    if (typeof window === 'undefined') return;

    try {
      const records = this.getAll();
      const record = records.find(r => r.discountCode === discountCode);

      if (record) {
        record.used = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        window.dispatchEvent(new Event('engagement-updated'));
      }
    } catch (error) {
      console.error('Failed to mark discount as used:', error);
    }
  },

  /**
   * Get active (unused and not expired) discount codes
   */
  getActiveCodes(): EngagementRecord[] {
    const records = this.getAll();
    const now = new Date();

    return records.filter(r => {
      const expiresAt = new Date(r.expiresAt);
      return !r.used && expiresAt > now;
    });
  },

  /**
   * Clear all engagement records
   */
  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('engagement-updated'));
    } catch (error) {
      console.error('Failed to clear engagement records:', error);
    }
  },
};
