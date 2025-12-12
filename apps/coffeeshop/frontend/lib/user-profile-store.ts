/**
 * User Profile Store
 * Manages user profile data with localStorage persistence
 * Tracks visits and personalization
 */

export interface UserProfile {
  id: string; // Unique user ID (generated on first visit)
  name?: string; // User's name (if provided)
  email?: string; // User's email (if registered)
  isRegistered: boolean; // Whether user has a GudBro account
  visitCount: number; // Number of visits
  firstVisit: string; // ISO date string of first visit
  lastVisit: string; // ISO date string of last visit
}

const STORAGE_KEY = 'roots-user-profile';

// Generate unique user ID
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const DEFAULT_PROFILE: UserProfile = {
  id: generateUserId(),
  name: undefined,
  isRegistered: false,
  visitCount: 0,
  firstVisit: new Date().toISOString(),
  lastVisit: new Date().toISOString(),
};

/**
 * User Profile Store
 */
export const userProfileStore = {
  get(): UserProfile {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // First time visitor - initialize with visit count 1 and unique ID
        const newProfile: UserProfile = {
          id: generateUserId(), // Generate unique ID for each new user
          name: undefined,
          isRegistered: false,
          visitCount: 1,
          firstVisit: new Date().toISOString(),
          lastVisit: new Date().toISOString(),
        };
        this.set(newProfile);
        return newProfile;
      }

      const parsed = JSON.parse(stored);
      // Increment visit count and update last visit
      const updated = {
        ...DEFAULT_PROFILE,
        ...parsed,
        visitCount: parsed.visitCount + 1,
        lastVisit: new Date().toISOString(),
      };
      this.set(updated);
      return updated;
    } catch (error) {
      console.error('Failed to load user profile:', error);
      return DEFAULT_PROFILE;
    }
  },

  set(profile: Partial<UserProfile>): void {
    if (typeof window === 'undefined') return;

    try {
      const current = this.getRaw(); // Get without incrementing visit
      const updated = { ...current, ...profile };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Dispatch event for reactive updates
      window.dispatchEvent(new Event('user-profile-updated'));
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  },

  // Get raw data without side effects (no visit increment)
  getRaw(): UserProfile {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_PROFILE;

      const parsed = JSON.parse(stored);
      return { ...DEFAULT_PROFILE, ...parsed };
    } catch (error) {
      console.error('Failed to load user profile:', error);
      return DEFAULT_PROFILE;
    }
  },

  setName(name: string): void {
    this.set({ name });
  },

  getName(): string | undefined {
    return this.getRaw().name;
  },

  isReturningVisitor(): boolean {
    const profile = this.getRaw();
    return profile.visitCount > 1;
  },

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('user-profile-updated'));
    } catch (error) {
      console.error('Failed to clear user profile:', error);
    }
  },
};
