// Types shared across team page components

export interface StaffInvitation {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roleTitle: string;
  permissions: Record<string, boolean>;
  status: string;
  createdAt: string;
  expiresAt: string;
  message?: string;
}

export interface StaffProfile {
  id: string;
  accountId: string;
  displayName: string;
  photoUrl?: string;
  jobTitle: string;
  specialties: string[];
  employmentType: string;
  isPublic: boolean;
  status: string;
  totalReviews: number;
  averageRating: number;
  positiveReviewRate: number;
}

export interface TeamSettings {
  locationId: string;
  showTeamOnMenu: boolean;
  teamDisplayStyle: 'cards' | 'list' | 'minimal';
  allowStaffReviews: boolean;
  reviewRequiresOrder: boolean;
  allowAnonymousReviews: boolean;
  enableWeeklyRecognition: boolean;
  recognitionRewardType: string;
}

export interface TopPerformer {
  staffId: string;
  displayName: string;
  photoUrl?: string;
  jobTitle: string;
  averageRating: number;
  reviewsCount: number;
  rankInLocation: number;
  topCategories: string[];
}

export interface WeeklyReport {
  periodStart: string;
  periodEnd: string;
  topPerformers: {
    byRating: TopPerformer | null;
    byReviews: TopPerformer | null;
    mostImproved: TopPerformer | null;
  };
  teamStats: {
    totalReviews: number;
    averageRating: number;
    positiveRate: number;
    topCategories: { category: string; count: number }[];
  };
  alerts: { type: string; staffName?: string; message: string }[];
  aiSuggestion?: string;
}

// Tip distribution types
export interface TipDistributionSettings {
  id?: string;
  merchantId: string;
  distributionMode: 'individual' | 'pool' | 'none';
  poolType: 'equal' | 'by_role' | 'custom';
  rolePercentages: Record<string, number>;
  distributionPeriod: 'weekly' | 'biweekly' | 'monthly' | 'custom';
  distributionDay: number;
  includeServiceCharge: boolean;
  requireMinimumHours: boolean;
  minimumHoursPerPeriod: number;
}

export interface TipPoolMember {
  id: string;
  merchantId: string;
  staffId: string;
  staffName: string;
  staffPhoto?: string;
  jobTitle: string;
  isIncluded: boolean;
  exclusionReason?: string;
  customPercentage?: number;
  tipRole?: string;
}

export interface TipPoolPeriod {
  id: string;
  merchantId: string;
  periodStart: string;
  periodEnd: string;
  status: 'open' | 'closed' | 'distributed';
  totalTips: number;
  totalServiceCharges: number;
  totalDistributed: number;
  closedAt?: string;
  distributedAt?: string;
  notes?: string;
}

export interface DistributionPreview {
  staffId: string;
  staffName: string;
  staffPhoto?: string;
  tipRole: string;
  allocationAmount: number;
  percentageShare: number;
}

// Category labels
export const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  friendly: { label: 'Cordiale', emoji: '😊' },
  fast: { label: 'Veloce', emoji: '⚡' },
  helpful: { label: 'Disponibile', emoji: '🤝' },
  knowledgeable: { label: 'Preparato', emoji: '🎓' },
  attentive: { label: 'Attento', emoji: '👀' },
  professional: { label: 'Professionale', emoji: '💼' },
  patient: { label: 'Paziente', emoji: '🙏' },
  welcoming: { label: 'Accogliente', emoji: '🏠' },
};

// Tab definitions
export const TABS = [
  { id: 'members', label: 'Team', icon: '👥' },
  { id: 'assignments', label: 'Assegnazioni', icon: '📋' },
  { id: 'performance', label: 'Performance', icon: '📊' },
  { id: 'tips', label: 'Mance', icon: '💰' },
  { id: 'settings', label: 'Impostazioni', icon: '⚙️' },
] as const;

export type TabId = (typeof TABS)[number]['id'];
