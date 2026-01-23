'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useTenant } from '@/lib/contexts/TenantContext';
import { EmptyState } from '@/components/ui/empty-state';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { StaffInviteModal, PendingInvitationsList } from '@/components/team/StaffInviteModal';
import { StaffAssignmentsTab } from '@/components/team/StaffAssignmentsTab';
import { EscalationSettings } from '@/components/team/EscalationSettings';

// Types
interface StaffInvitation {
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
interface StaffProfile {
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

interface TeamSettings {
  locationId: string;
  showTeamOnMenu: boolean;
  teamDisplayStyle: 'cards' | 'list' | 'minimal';
  allowStaffReviews: boolean;
  reviewRequiresOrder: boolean;
  allowAnonymousReviews: boolean;
  enableWeeklyRecognition: boolean;
  recognitionRewardType: string;
}

interface TopPerformer {
  staffId: string;
  displayName: string;
  photoUrl?: string;
  jobTitle: string;
  averageRating: number;
  reviewsCount: number;
  rankInLocation: number;
  topCategories: string[];
}

interface WeeklyReport {
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

// Tab definitions
const TABS = [
  { id: 'members', label: 'Team', icon: '👥' },
  { id: 'assignments', label: 'Assegnazioni', icon: '📋' },
  { id: 'performance', label: 'Performance', icon: '📊' },
  { id: 'tips', label: 'Mance', icon: '💰' },
  { id: 'settings', label: 'Impostazioni', icon: '⚙️' },
] as const;

type TabId = (typeof TABS)[number]['id'];

// Tip distribution types
interface TipDistributionSettings {
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

interface TipPoolMember {
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

interface TipPoolPeriod {
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

interface DistributionPreview {
  staffId: string;
  staffName: string;
  staffPhoto?: string;
  tipRole: string;
  allocationAmount: number;
  percentageShare: number;
}

// Category labels
const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  friendly: { label: 'Cordiale', emoji: '😊' },
  fast: { label: 'Veloce', emoji: '⚡' },
  helpful: { label: 'Disponibile', emoji: '🤝' },
  knowledgeable: { label: 'Preparato', emoji: '🎓' },
  attentive: { label: 'Attento', emoji: '👀' },
  professional: { label: 'Professionale', emoji: '💼' },
  patient: { label: 'Paziente', emoji: '🙏' },
  welcoming: { label: 'Accogliente', emoji: '🏠' },
};

export default function TeamPage() {
  const t = useTranslations('teamPage');
  const { location, brand } = useTenant();
  const locationId = location?.id || brand?.id;

  const [activeTab, setActiveTab] = useState<TabId>('members');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data state
  const [staffProfiles, setStaffProfiles] = useState<StaffProfile[]>([]);
  const [teamSettings, setTeamSettings] = useState<TeamSettings | null>(null);
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReport | null>(null);
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([]);

  // Tips data state
  const [tipSettings, setTipSettings] = useState<TipDistributionSettings | null>(null);
  const [tipPoolMembers, setTipPoolMembers] = useState<TipPoolMember[]>([]);
  const [tipPeriods, setTipPeriods] = useState<TipPoolPeriod[]>([]);
  const [distributionPreview, setDistributionPreview] = useState<DistributionPreview[] | null>(
    null
  );
  const [isTipsLoading, setIsTipsLoading] = useState(false);

  // Modal state
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Staff invitations state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [pendingInvitations, setPendingInvitations] = useState<StaffInvitation[]>([]);
  const [isInvitationsLoading, setIsInvitationsLoading] = useState(false);

  // Get organization ID from tenant context
  const organizationId = brand?.id || location?.id;

  // Open modal for new staff
  const handleAddStaff = () => {
    setEditingStaff(null);
    setShowStaffModal(true);
  };

  // Open modal for editing existing staff
  const handleEditStaff = (profile: StaffProfile) => {
    setEditingStaff(profile);
    setShowStaffModal(true);
  };

  // Save staff profile
  const handleSaveStaff = async (data: {
    displayName: string;
    jobTitle: string;
    specialties: string[];
    employmentType: string;
    isPublic: boolean;
    status: string;
    photoUrl?: string;
  }) => {
    if (!locationId) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upsertProfile',
          locationId,
          accountId: editingStaff?.accountId || `temp-${Date.now()}`, // Generate temp ID for new staff
          ...data,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setSaveSuccess(editingStaff ? 'Staff aggiornato!' : 'Staff aggiunto!');
        setTimeout(() => setSaveSuccess(null), 3000);
        setShowStaffModal(false);
        setEditingStaff(null);
        loadData();
      } else {
        setError(result.error || 'Errore nel salvataggio');
      }
    } catch (err) {
      setError('Errore nel salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Load data
  const loadData = useCallback(async () => {
    if (!locationId) return;

    setIsLoading(true);
    setError(null);

    try {
      // Load profiles
      const profilesRes = await fetch(`/api/staff?locationId=${locationId}&type=profiles`);
      const profilesData = await profilesRes.json();
      if (profilesData.success) setStaffProfiles(profilesData.profiles);

      // Load settings
      const settingsRes = await fetch(`/api/staff?locationId=${locationId}&type=settings`);
      const settingsData = await settingsRes.json();
      if (settingsData.success) setTeamSettings(settingsData.settings);

      // Load performance
      const perfRes = await fetch(`/api/staff?locationId=${locationId}&type=performance`);
      const perfData = await perfRes.json();
      if (perfData.success) {
        setTopPerformers(perfData.topPerformers);
        setWeeklyReport(perfData.report);
      }
    } catch (err) {
      setError('Errore nel caricamento dei dati');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Load pending invitations
  const loadInvitations = useCallback(async () => {
    if (!organizationId) return;

    setIsInvitationsLoading(true);
    try {
      const res = await fetch(`/api/staff/invite?organizationId=${organizationId}`);
      const data = await res.json();
      if (data.success) {
        setPendingInvitations(data.invitations || []);
      }
    } catch (err) {
      console.error('Error loading invitations:', err);
    } finally {
      setIsInvitationsLoading(false);
    }
  }, [organizationId]);

  // Load invitations when members tab is active
  useEffect(() => {
    if (activeTab === 'members') {
      loadInvitations();
    }
  }, [activeTab, loadInvitations]);

  // Handle invitation sent
  const handleInvitationSent = () => {
    setSaveSuccess('Invito inviato con successo!');
    setTimeout(() => setSaveSuccess(null), 3000);
    loadInvitations();
  };

  // Handle invitation revoked
  const handleInvitationRevoked = (invitationId: string) => {
    setPendingInvitations((prev) => prev.filter((i) => i.id !== invitationId));
    setSaveSuccess('Invito revocato');
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  // Load tips data
  const loadTipsData = useCallback(async () => {
    if (!locationId) return;

    setIsTipsLoading(true);
    try {
      const res = await fetch(`/api/tips?merchantId=${locationId}`);
      const data = await res.json();
      if (data.success) {
        setTipSettings(data.settings);
        setTipPoolMembers(data.members || []);
        setTipPeriods(data.periods || []);
      }
    } catch (err) {
      console.error('Error loading tips data:', err);
    } finally {
      setIsTipsLoading(false);
    }
  }, [locationId]);

  // Load tips when tab is active
  useEffect(() => {
    if (activeTab === 'tips') {
      loadTipsData();
    }
  }, [activeTab, loadTipsData]);

  // Save tip settings
  const handleSaveTipSettings = async (newSettings: Partial<TipDistributionSettings>) => {
    if (!locationId) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/tips', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateSettings',
          merchantId: locationId,
          data: newSettings,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setSaveSuccess('Impostazioni mance salvate!');
        setTimeout(() => setSaveSuccess(null), 3000);
        loadTipsData();
      }
    } catch (err) {
      setError('Errore nel salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Update pool member
  const handleUpdatePoolMember = async (memberId: string, data: Partial<TipPoolMember>) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/tips', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateMember',
          merchantId: locationId,
          data: { id: memberId, ...data },
        }),
      });

      const result = await res.json();
      if (result.success) {
        setSaveSuccess('Membro aggiornato!');
        setTimeout(() => setSaveSuccess(null), 3000);
        loadTipsData();
      }
    } catch (err) {
      setError('Errore nel salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Sync pool members from staff
  const handleSyncPoolMembers = async () => {
    if (!locationId) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'syncMembers',
          merchantId: locationId,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setSaveSuccess(`${result.added} membri sincronizzati!`);
        setTimeout(() => setSaveSuccess(null), 3000);
        loadTipsData();
      }
    } catch (err) {
      setError('Errore nella sincronizzazione');
    } finally {
      setIsSaving(false);
    }
  };

  // Close period
  const handleClosePeriod = async (periodId: string) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/tips', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'closePeriod',
          merchantId: locationId,
          data: { periodId },
        }),
      });

      const result = await res.json();
      if (result.success) {
        setSaveSuccess('Periodo chiuso!');
        setTimeout(() => setSaveSuccess(null), 3000);
        loadTipsData();
      }
    } catch (err) {
      setError('Errore nella chiusura periodo');
    } finally {
      setIsSaving(false);
    }
  };

  // Preview distribution
  const handlePreviewDistribution = async (periodId: string) => {
    try {
      const res = await fetch(`/api/tips/distribute?merchantId=${locationId}&periodId=${periodId}`);
      const data = await res.json();
      if (data.success) {
        setDistributionPreview(data.preview.allocations);
      }
    } catch (err) {
      console.error('Error previewing distribution:', err);
    }
  };

  // Distribute tips
  const handleDistributeTips = async (periodId: string) => {
    if (!locationId) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/tips/distribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: locationId,
          periodId,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setSaveSuccess(result.message);
        setTimeout(() => setSaveSuccess(null), 3000);
        setDistributionPreview(null);
        loadTipsData();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Errore nella distribuzione');
    } finally {
      setIsSaving(false);
    }
  };

  // Create new period
  const handleCreatePeriod = async () => {
    if (!locationId) return;

    const today = new Date();
    const periodStart = today.toISOString().split('T')[0];
    const periodEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    setIsSaving(true);
    try {
      const res = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'createPeriod',
          merchantId: locationId,
          data: { periodStart, periodEnd },
        }),
      });

      const result = await res.json();
      if (result.success) {
        setSaveSuccess('Nuovo periodo creato!');
        setTimeout(() => setSaveSuccess(null), 3000);
        loadTipsData();
      }
    } catch (err) {
      setError('Errore nella creazione periodo');
    } finally {
      setIsSaving(false);
    }
  };

  // Save settings
  const handleSaveSettings = async (newSettings: Partial<TeamSettings>) => {
    if (!locationId) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateSettings',
          locationId,
          ...newSettings,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTeamSettings((prev) => (prev ? { ...prev, ...newSettings } : null));
        setSaveSuccess('Impostazioni salvate!');
        setTimeout(() => setSaveSuccess(null), 3000);
      }
    } catch (err) {
      setError('Errore nel salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Generate report
  const handleGenerateReport = async () => {
    if (!locationId) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateReport',
          locationId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setWeeklyReport(data.report);
        setSaveSuccess('Report generato!');
        setTimeout(() => setSaveSuccess(null), 3000);
      }
    } catch (err) {
      setError('Errore nella generazione del report');
    } finally {
      setIsSaving(false);
    }
  };

  // Auto award achievements
  const handleAutoAward = async () => {
    if (!locationId) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'autoAwardAchievements',
          locationId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccess(`${data.count} premi assegnati!`);
        setTimeout(() => setSaveSuccess(null), 3000);
        loadData();
      }
    } catch (err) {
      setError("Errore nell'assegnazione premi");
    } finally {
      setIsSaving(false);
    }
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="nav.team" kbPageId="team" />
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {saveSuccess && (
        <div className="animate-fade-in rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          ✅ {saveSuccess}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          ❌ {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'members' && (
        <MembersTab
          profiles={staffProfiles}
          onAddStaff={handleAddStaff}
          onEditStaff={handleEditStaff}
          onInviteStaff={() => setShowInviteModal(true)}
          pendingInvitations={pendingInvitations}
          isInvitationsLoading={isInvitationsLoading}
          onRevokeInvitation={handleInvitationRevoked}
          onRefreshInvitations={loadInvitations}
          organizationId={organizationId}
        />
      )}

      {activeTab === 'assignments' && locationId && (
        <StaffAssignmentsTab locationId={locationId} staffProfiles={staffProfiles} />
      )}

      {activeTab === 'performance' && (
        <PerformanceTab
          report={weeklyReport}
          topPerformers={topPerformers}
          onGenerateReport={handleGenerateReport}
          onAutoAward={handleAutoAward}
          isSaving={isSaving}
          renderStars={renderStars}
        />
      )}

      {activeTab === 'tips' && (
        <TipsTab
          settings={tipSettings}
          members={tipPoolMembers}
          periods={tipPeriods}
          staffProfiles={staffProfiles}
          isLoading={isTipsLoading}
          isSaving={isSaving}
          distributionPreview={distributionPreview}
          onSaveSettings={handleSaveTipSettings}
          onUpdateMember={handleUpdatePoolMember}
          onSyncMembers={handleSyncPoolMembers}
          onClosePeriod={handleClosePeriod}
          onPreviewDistribution={handlePreviewDistribution}
          onDistribute={handleDistributeTips}
          onCreatePeriod={handleCreatePeriod}
          onClearPreview={() => setDistributionPreview(null)}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsTab
          settings={teamSettings}
          onSave={handleSaveSettings}
          isSaving={isSaving}
          onShowTooltip={() => setShowSettingsTooltip(true)}
          merchantId={locationId}
        />
      )}

      {/* Settings Tooltip Modal */}
      <Dialog open={showSettingsTooltip} onOpenChange={setShowSettingsTooltip}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>💡 Perché attivare il Team pubblico?</DialogTitle>
            <DialogDescription>
              Scopri i vantaggi di mostrare il tuo team ai clienti
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h4 className="mb-2 font-medium text-green-700">✅ Vantaggi</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>📈 Staff motivato a fornire servizio migliore</li>
                <li>💬 Feedback diretto dai clienti</li>
                <li>🏆 Sistema di riconoscimento aumenta la retention</li>
                <li>📱 Clienti usano di più il menu digitale</li>
                <li>🗣️ Passaparola: clienti soddisfatti condividono</li>
                <li>📊 Dati per decisioni su bonus e promozioni</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-medium text-amber-700">⚠️ Considerazioni</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>⏰ Richiede tempo iniziale per setup profili</li>
                <li>📝 Review negative possono demotivare (ma puoi moderarle)</li>
                <li>🔒 Privacy staff: consenso richiesto per foto pubbliche</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <h4 className="mb-2 font-medium text-blue-700">💡 Consigli</h4>
              <ul className="space-y-1 text-sm text-blue-600">
                <li>• Inizia con bonus settimanali piccoli (es. caffè gratis)</li>
                <li>• Mostra le review positive nel break room</li>
                <li>• Usa le categorie più votate per training</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setShowSettingsTooltip(false)}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Ho capito
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Staff Modal */}
      <StaffFormModal
        open={showStaffModal}
        onOpenChange={setShowStaffModal}
        staff={editingStaff}
        onSave={handleSaveStaff}
        isSaving={isSaving}
        locationId={locationId}
      />

      {/* Staff Invite Modal */}
      {organizationId && (
        <StaffInviteModal
          open={showInviteModal}
          onOpenChange={setShowInviteModal}
          organizationId={organizationId}
          locationId={locationId}
          brandId={brand?.id}
          onInviteSent={handleInvitationSent}
        />
      )}
    </div>
  );
}

// ============================================
// Members Tab
// ============================================
function MembersTab({
  profiles,
  onAddStaff,
  onEditStaff,
  onInviteStaff,
  pendingInvitations,
  isInvitationsLoading,
  onRevokeInvitation,
  onRefreshInvitations,
  organizationId,
}: {
  profiles: StaffProfile[];
  onAddStaff: () => void;
  onEditStaff: (profile: StaffProfile) => void;
  onInviteStaff: () => void;
  pendingInvitations: StaffInvitation[];
  isInvitationsLoading: boolean;
  onRevokeInvitation: (invitationId: string) => void;
  onRefreshInvitations: () => void;
  organizationId?: string;
}) {
  if (profiles.length === 0 && pendingInvitations.length === 0) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon={<span className="text-5xl">👥</span>}
          title="Nessun membro del team"
          description="Aggiungi i profili del tuo staff o invita nuovi membri via email."
          action={{ label: 'Invita Staff', onClick: onInviteStaff }}
          variant="default"
          size="default"
        />
        <div className="flex justify-center">
          <button onClick={onAddStaff} className="text-sm text-gray-500 hover:text-gray-700">
            oppure aggiungi manualmente →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {profiles.length} {profiles.length === 1 ? 'membro' : 'membri'} nel team
        </p>
        <div className="flex gap-2">
          <button
            onClick={onInviteStaff}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Invita via Email
          </button>
          <button
            onClick={onAddStaff}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Aggiungi Manualmente
          </button>
        </div>
      </div>

      {/* Pending Invitations */}
      {organizationId && (
        <PendingInvitationsList
          organizationId={organizationId}
          invitations={pendingInvitations}
          isLoading={isInvitationsLoading}
          onRevokeInvitation={onRevokeInvitation}
          onRefresh={onRefreshInvitations}
        />
      )}

      {/* Staff Grid */}
      {profiles.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <StaffCard key={profile.id} profile={profile} onEdit={() => onEditStaff(profile)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Staff Card Component
// ============================================
function StaffCard({ profile, onEdit }: { profile: StaffProfile; onEdit: () => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-700';
      case 'terminated':
        return 'bg-gray-100 text-gray-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Attivo';
      case 'on_leave':
        return 'In ferie';
      case 'terminated':
        return 'Non attivo';
      default:
        return status;
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
      {/* Header with photo */}
      <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.displayName}
                className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/20 text-xl font-bold text-white shadow-lg">
                {profile.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-white">{profile.displayName}</h3>
              <p className="text-sm text-white/80">{profile.jobTitle}</p>
            </div>
          </div>
          {profile.isPublic && (
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white">
              👁️ Pubblico
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-4 w-4 ${star <= profile.averageRating ? 'text-yellow-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm font-medium text-gray-700">
              {profile.averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-gray-500">{profile.totalReviews} review</span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-gray-500">Positive rate</span>
            <span className="font-medium text-gray-700">
              {profile.positiveReviewRate.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${profile.positiveReviewRate}%` }}
            />
          </div>
        </div>

        {/* Specialties */}
        {profile.specialties.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {profile.specialties.slice(0, 3).map((s) => (
              <span key={s} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                {s}
              </span>
            ))}
            {profile.specialties.length > 3 && (
              <span className="text-xs text-gray-400">+{profile.specialties.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(profile.status)}`}
          >
            {getStatusLabel(profile.status)}
          </span>
          <button onClick={onEdit} className="text-xs text-blue-600 hover:text-blue-700">
            Modifica →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Performance Tab
// ============================================
function PerformanceTab({
  report,
  topPerformers,
  onGenerateReport,
  onAutoAward,
  isSaving,
  renderStars,
}: {
  report: WeeklyReport | null;
  topPerformers: TopPerformer[];
  onGenerateReport: () => void;
  onAutoAward: () => void;
  isSaving: boolean;
  renderStars: (rating: number) => React.ReactNode;
}) {
  if (!report) {
    return (
      <EmptyState
        icon={<span className="text-5xl">📊</span>}
        title="Nessun report disponibile"
        description="Genera il primo report settimanale per vedere le performance del team."
        action={{ label: 'Genera Report', onClick: onGenerateReport }}
        variant="default"
        size="default"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onAutoAward}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          🏆 Assegna Premi
        </button>
        <button
          onClick={onGenerateReport}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          🔄 Aggiorna Report
        </button>
      </div>

      {/* Period */}
      <div className="text-sm text-gray-500">
        Periodo: {new Date(report.periodStart).toLocaleDateString('it-IT')} -{' '}
        {new Date(report.periodEnd).toLocaleDateString('it-IT')}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard
          label="Review Totali"
          value={report.teamStats.totalReviews.toString()}
          icon="📝"
          color="blue"
        />
        <StatCard
          label="Rating Medio"
          value={report.teamStats.averageRating.toFixed(1)}
          icon="⭐"
          color="yellow"
          suffix="/5"
        />
        <StatCard
          label="Positive Rate"
          value={report.teamStats.positiveRate.toFixed(0)}
          icon="👍"
          color="green"
          suffix="%"
        />
        <StatCard
          label="Top Performer"
          value={report.topPerformers.byRating?.displayName || '-'}
          icon="🏆"
          color="purple"
        />
      </div>

      {/* Top Performers */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900">🏆 Top Performers della Settimana</h3>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* By Rating */}
          <PerformerCard
            title="Miglior Rating"
            performer={report.topPerformers.byRating}
            metric={
              report.topPerformers.byRating
                ? `${report.topPerformers.byRating.averageRating.toFixed(1)}/5`
                : '-'
            }
            icon="⭐"
          />
          {/* By Reviews */}
          <PerformerCard
            title="Più Feedback"
            performer={report.topPerformers.byReviews}
            metric={
              report.topPerformers.byReviews
                ? `${report.topPerformers.byReviews.reviewsCount} review`
                : '-'
            }
            icon="📊"
          />
          {/* Most Improved */}
          <PerformerCard
            title="Most Improved"
            performer={report.topPerformers.mostImproved}
            metric="Miglioramento"
            icon="📈"
          />
        </div>
      </div>

      {/* Top Categories */}
      {report.teamStats.topCategories.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="mb-4 font-semibold text-gray-900">🏷️ Categorie più votate</h3>
          <div className="flex flex-wrap gap-2">
            {report.teamStats.topCategories.map(({ category, count }) => (
              <span
                key={category}
                className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-sm"
              >
                <span>{CATEGORY_LABELS[category]?.emoji || '📌'}</span>
                <span className="font-medium text-blue-700">
                  {CATEGORY_LABELS[category]?.label || category}
                </span>
                <span className="text-blue-500">({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Alerts */}
      {report.alerts.length > 0 && (
        <div className="space-y-2">
          {report.alerts.map((alert, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 ${
                alert.type === 'warning'
                  ? 'border border-amber-200 bg-amber-50 text-amber-700'
                  : alert.type === 'success'
                    ? 'border border-green-200 bg-green-50 text-green-700'
                    : 'border border-blue-200 bg-blue-50 text-blue-700'
              }`}
            >
              {alert.message}
            </div>
          ))}
        </div>
      )}

      {/* AI Suggestion */}
      {report.aiSuggestion && (
        <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-purple-900">Suggerimento AI</h4>
              <p className="mt-1 text-sm text-purple-700">{report.aiSuggestion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// Stat Card
// ============================================
function StatCard({
  label,
  value,
  icon,
  color,
  suffix,
}: {
  label: string;
  value: string;
  icon: string;
  color: 'blue' | 'yellow' | 'green' | 'purple';
  suffix?: string;
}) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-400 to-orange-500',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-indigo-600',
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className={`bg-gradient-to-r ${colors[color]} p-3`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">
          {value}
          {suffix && <span className="text-base font-normal text-gray-500">{suffix}</span>}
        </p>
      </div>
    </div>
  );
}

// ============================================
// Performer Card
// ============================================
function PerformerCard({
  title,
  performer,
  metric,
  icon,
}: {
  title: string;
  performer: TopPerformer | null;
  metric: string;
  icon: string;
}) {
  return (
    <div className="p-4 text-center">
      <p className="text-xs text-gray-500">{title}</p>
      {performer ? (
        <>
          <div className="my-3 flex justify-center">
            {performer.photoUrl ? (
              <img
                src={performer.photoUrl}
                alt={performer.displayName}
                className="h-16 w-16 rounded-full border-2 border-blue-100 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">
                {performer.displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <p className="font-semibold text-gray-900">{performer.displayName}</p>
          <p className="text-sm text-gray-500">{performer.jobTitle}</p>
          <p className="mt-2 text-lg font-bold text-blue-600">
            {icon} {metric}
          </p>
        </>
      ) : (
        <div className="py-8 text-gray-400">
          <span className="text-4xl opacity-30">{icon}</span>
          <p className="mt-2 text-sm">Nessun dato</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// Settings Tab
// ============================================
function SettingsTab({
  settings,
  onSave,
  isSaving,
  onShowTooltip,
  merchantId,
}: {
  settings: TeamSettings | null;
  onSave: (settings: Partial<TeamSettings>) => void;
  isSaving: boolean;
  onShowTooltip: () => void;
  merchantId?: string;
}) {
  const [localSettings, setLocalSettings] = useState<TeamSettings | null>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  if (!localSettings) return null;

  const handleToggle = (key: keyof TeamSettings) => {
    setLocalSettings((prev) => {
      if (!prev) return prev;
      const newSettings = { ...prev, [key]: !prev[key] };
      onSave({ [key]: newSettings[key] });
      return newSettings;
    });
  };

  return (
    <div className="space-y-6">
      {/* Team Visibility */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">👥 Visibilità Team</h3>
            <button onClick={onShowTooltip} className="text-sm text-blue-600 hover:text-blue-700">
              Perché attivarlo? →
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Controlla se i clienti possono vedere il tuo team sul menu digitale
          </p>
        </div>
        <div className="space-y-4 p-4">
          <SettingToggle
            label="Mostra team sul menu"
            description="I clienti vedranno le schede del team con foto e nome"
            enabled={localSettings.showTeamOnMenu}
            onToggle={() => handleToggle('showTeamOnMenu')}
            disabled={isSaving}
          />

          {localSettings.showTeamOnMenu && (
            <div className="ml-10">
              <label className="block text-sm font-medium text-gray-700">
                Stile visualizzazione
              </label>
              <select
                value={localSettings.teamDisplayStyle}
                onChange={(e) => {
                  const value = e.target.value as 'cards' | 'list' | 'minimal';
                  setLocalSettings((prev) => prev && { ...prev, teamDisplayStyle: value });
                  onSave({ teamDisplayStyle: value });
                }}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="cards">Cards (con foto)</option>
                <option value="list">Lista compatta</option>
                <option value="minimal">Minimo (solo nome)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Review Settings */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900">⭐ Impostazioni Review</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configura come i clienti possono lasciare feedback sullo staff
          </p>
        </div>
        <div className="space-y-4 p-4">
          <SettingToggle
            label="Permetti review staff"
            description="I clienti possono valutare singoli membri del team"
            enabled={localSettings.allowStaffReviews}
            onToggle={() => handleToggle('allowStaffReviews')}
            disabled={isSaving}
          />

          {localSettings.allowStaffReviews && (
            <>
              <SettingToggle
                label="Richiedi ordine verificato"
                description="Solo chi ha ordinato può lasciare una review"
                enabled={localSettings.reviewRequiresOrder}
                onToggle={() => handleToggle('reviewRequiresOrder')}
                disabled={isSaving}
              />

              <SettingToggle
                label="Permetti review anonime"
                description="I clienti possono lasciare feedback senza identificarsi (no punti)"
                enabled={localSettings.allowAnonymousReviews}
                onToggle={() => handleToggle('allowAnonymousReviews')}
                disabled={isSaving}
              />
            </>
          )}
        </div>
      </div>

      {/* Recognition Settings */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900">🏆 Riconoscimenti</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configura il sistema di premi e riconoscimenti per lo staff
          </p>
        </div>
        <div className="space-y-4 p-4">
          <SettingToggle
            label="Riconoscimenti settimanali"
            description="L'AI suggerisce automaticamente i migliori della settimana"
            enabled={localSettings.enableWeeklyRecognition}
            onToggle={() => handleToggle('enableWeeklyRecognition')}
            disabled={isSaving}
          />

          {localSettings.enableWeeklyRecognition && (
            <div className="ml-10">
              <label className="block text-sm font-medium text-gray-700">
                Tipo di premio predefinito
              </label>
              <select
                value={localSettings.recognitionRewardType}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocalSettings((prev) => prev && { ...prev, recognitionRewardType: value });
                  onSave({ recognitionRewardType: value });
                }}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="badge">Badge digitale</option>
                <option value="bonus">Bonus economico</option>
                <option value="time_off">Ore extra di riposo</option>
                <option value="meal">Pasto omaggio</option>
                <option value="custom">Personalizzato</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Loyalty Points Info */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💎</span>
          <div>
            <h4 className="font-semibold text-blue-900">Sistema Punti Fedeltà</h4>
            <p className="mt-1 text-sm text-blue-700">
              I clienti guadagnano punti quando lasciano review identificate:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-600">
              <li>
                • <strong>10 punti</strong> - Review base
              </li>
              <li>
                • <strong>+5 punti</strong> - Con ordine verificato
              </li>
              <li>
                • <strong>+5 punti</strong> - Con commento dettagliato
              </li>
            </ul>
            <p className="mt-2 text-xs text-blue-500">
              Le review anonime non danno punti ma sono comunque registrate.
            </p>
          </div>
        </div>
      </div>

      {/* Escalation Settings */}
      {merchantId && (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <EscalationSettings merchantId={merchantId} />
        </div>
      )}
    </div>
  );
}

// ============================================
// Setting Toggle
// ============================================
function SettingToggle({
  label,
  description,
  enabled,
  onToggle,
  disabled,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

// ============================================
// Staff Form Modal
// ============================================
function StaffFormModal({
  open,
  onOpenChange,
  staff,
  onSave,
  isSaving,
  locationId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffProfile | null;
  onSave: (data: {
    displayName: string;
    jobTitle: string;
    specialties: string[];
    employmentType: string;
    isPublic: boolean;
    status: string;
    photoUrl?: string;
  }) => void;
  isSaving: boolean;
  locationId?: string;
}) {
  const [formData, setFormData] = useState({
    displayName: '',
    jobTitle: '',
    specialties: [] as string[],
    employmentType: 'full_time',
    isPublic: true,
    status: 'active',
    photoUrl: '',
  });
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Per favore seleziona un file immagine (PNG, JPEG, WebP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Il file è troppo grande. Massimo 2MB');
      return;
    }

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      if (locationId) formDataUpload.append('locationId', locationId);
      if (staff?.id) formDataUpload.append('staffId', staff.id);

      const res = await fetch('/api/upload/staff-photo', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, photoUrl: data.url }));
      } else {
        alert(data.error || "Errore durante l'upload");
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert("Errore durante l'upload");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  // Reset form when modal opens/closes or staff changes
  useEffect(() => {
    if (staff) {
      setFormData({
        displayName: staff.displayName,
        jobTitle: staff.jobTitle,
        specialties: staff.specialties,
        employmentType: staff.employmentType,
        isPublic: staff.isPublic,
        status: staff.status,
        photoUrl: staff.photoUrl || '',
      });
    } else {
      setFormData({
        displayName: '',
        jobTitle: '',
        specialties: [],
        employmentType: 'full_time',
        isPublic: true,
        status: 'active',
        photoUrl: '',
      });
    }
    setSpecialtyInput('');
  }, [staff, open]);

  const addSpecialty = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, specialtyInput.trim()],
      }));
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.displayName.trim() || !formData.jobTitle.trim()) return;
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{staff ? 'Modifica Staff' : 'Aggiungi Staff'}</DialogTitle>
          <DialogDescription>
            {staff
              ? 'Modifica le informazioni del membro del team'
              : 'Aggiungi un nuovo membro al team'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome visualizzato *</label>
            <input
              type="text"
              required
              value={formData.displayName}
              onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Es: Marco R."
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ruolo *</label>
            <input
              type="text"
              required
              value={formData.jobTitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Es: Barista, Cameriere, Chef"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo contratto</label>
            <select
              value={formData.employmentType}
              onChange={(e) => setFormData((prev) => ({ ...prev, employmentType: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="seasonal">Stagionale</option>
              <option value="intern">Stagista</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Stato</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="active">Attivo</option>
              <option value="on_leave">In ferie</option>
              <option value="terminated">Non attivo</option>
            </select>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Specialità</label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSpecialty();
                  }
                }}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Es: Latte Art, Cocktail"
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                +
              </button>
            </div>
            {formData.specialties.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {formData.specialties.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(s)}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-1 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : formData.photoUrl
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
              {isUploading ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  Caricamento...
                </div>
              ) : formData.photoUrl ? (
                <div className="flex items-center gap-3">
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-green-700">Foto caricata</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData((prev) => ({ ...prev, photoUrl: '' }));
                      }}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <svg
                    className="mb-2 h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600">Clicca</span> o trascina una foto
                  </p>
                  <p className="mt-1 text-xs text-gray-400">PNG, JPEG, WebP (max 2MB)</p>
                </>
              )}
            </div>
          </div>

          {/* Public Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Visibile ai clienti</p>
              <p className="text-xs text-gray-500">Il profilo sarà visibile sul menu digitale</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.isPublic}
              onClick={() => setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }))}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                formData.isPublic ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.isPublic ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={isSaving || !formData.displayName.trim() || !formData.jobTitle.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? 'Salvataggio...' : staff ? 'Salva Modifiche' : 'Aggiungi'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// Tips Tab
// ============================================
function TipsTab({
  settings,
  members,
  periods,
  staffProfiles,
  isLoading,
  isSaving,
  distributionPreview,
  onSaveSettings,
  onUpdateMember,
  onSyncMembers,
  onClosePeriod,
  onPreviewDistribution,
  onDistribute,
  onCreatePeriod,
  onClearPreview,
}: {
  settings: TipDistributionSettings | null;
  members: TipPoolMember[];
  periods: TipPoolPeriod[];
  staffProfiles: StaffProfile[];
  isLoading: boolean;
  isSaving: boolean;
  distributionPreview: DistributionPreview[] | null;
  onSaveSettings: (settings: Partial<TipDistributionSettings>) => void;
  onUpdateMember: (memberId: string, data: Partial<TipPoolMember>) => void;
  onSyncMembers: () => void;
  onClosePeriod: (periodId: string) => void;
  onPreviewDistribution: (periodId: string) => void;
  onDistribute: (periodId: string) => void;
  onCreatePeriod: () => void;
  onClearPreview: () => void;
}) {
  const [localSettings, setLocalSettings] = useState<Partial<TipDistributionSettings>>(
    settings || {
      distributionMode: 'individual',
      poolType: 'equal',
      rolePercentages: { waiter: 60, kitchen: 25, manager: 15 },
      distributionPeriod: 'weekly',
      distributionDay: 1,
      includeServiceCharge: true,
      requireMinimumHours: false,
      minimumHoursPerPeriod: 20,
    }
  );
  const [activeSection, setActiveSection] = useState<'config' | 'members' | 'periods'>('config');

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleSave = () => {
    onSaveSettings(localSettings);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {[
          { id: 'config', label: 'Configurazione', icon: '⚙️' },
          { id: 'members', label: 'Membri Pool', icon: '👥' },
          { id: 'periods', label: 'Periodi', icon: '📅' },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as typeof activeSection)}
            className={`flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <span>{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Configuration Section */}
      {activeSection === 'config' && (
        <div className="space-y-6">
          {/* Distribution Mode */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">💰 Modalità Distribuzione</h3>
              <p className="mt-1 text-sm text-gray-500">
                Come vengono distribuite le mance al team
              </p>
            </div>
            <div className="space-y-4 p-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    value: 'individual',
                    label: 'Individuale',
                    desc: '100% al cameriere che serve',
                    icon: '👤',
                  },
                  {
                    value: 'pool',
                    label: 'Pool Condiviso',
                    desc: 'Condiviso tra tutto lo staff',
                    icon: '👥',
                  },
                  {
                    value: 'none',
                    label: 'Non Distribuite',
                    desc: "Le mance vanno all'azienda",
                    icon: '🏢',
                  },
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() =>
                      setLocalSettings({
                        ...localSettings,
                        distributionMode: mode.value as 'individual' | 'pool' | 'none',
                      })
                    }
                    className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
                      localSettings.distributionMode === mode.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mb-2 text-2xl">{mode.icon}</span>
                    <span className="font-medium text-gray-900">{mode.label}</span>
                    <span className="mt-1 text-center text-xs text-gray-500">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pool Configuration (if pool mode) */}
          {localSettings.distributionMode === 'pool' && (
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900">📊 Configurazione Pool</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Come dividere le mance tra i membri del pool
                </p>
              </div>
              <div className="space-y-4 p-4">
                {/* Pool Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo di divisione
                  </label>
                  <select
                    value={localSettings.poolType}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        poolType: e.target.value as 'equal' | 'by_role' | 'custom',
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="equal">Equo - Tutti ricevono la stessa quota</option>
                    <option value="by_role">Per Ruolo - Percentuali basate sul ruolo</option>
                    <option value="custom">Custom - Percentuali individuali</option>
                  </select>
                </div>

                {/* Role Percentages (if by_role) */}
                {localSettings.poolType === 'by_role' && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Percentuali per Ruolo
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(localSettings.rolePercentages || {}).map(([role, pct]) => (
                        <div key={role} className="flex items-center gap-2">
                          <span className="w-20 text-sm capitalize text-gray-600">{role}</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={pct}
                            onChange={(e) =>
                              setLocalSettings({
                                ...localSettings,
                                rolePercentages: {
                                  ...localSettings.rolePercentages,
                                  [role]: parseInt(e.target.value) || 0,
                                },
                              })
                            }
                            className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm"
                          />
                          <span className="text-sm text-gray-500">%</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Totale:{' '}
                      {Object.values(localSettings.rolePercentages || {}).reduce(
                        (a, b) => a + b,
                        0
                      )}
                      %
                    </p>
                  </div>
                )}

                {/* Include Service Charge */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Includi Coperto nel Pool</p>
                    <p className="text-xs text-gray-500">
                      Il coperto viene aggiunto alle mance da distribuire
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={localSettings.includeServiceCharge}
                    onClick={() =>
                      setLocalSettings({
                        ...localSettings,
                        includeServiceCharge: !localSettings.includeServiceCharge,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      localSettings.includeServiceCharge ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        localSettings.includeServiceCharge ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Distribution Period */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">📅 Periodo Distribuzione</h3>
              <p className="mt-1 text-sm text-gray-500">Quando vengono distribuite le mance</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Periodo</label>
                <select
                  value={localSettings.distributionPeriod}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      distributionPeriod: e.target.value as
                        | 'weekly'
                        | 'biweekly'
                        | 'monthly'
                        | 'custom',
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="weekly">Settimanale</option>
                  <option value="biweekly">Bisettimanale</option>
                  <option value="monthly">Mensile</option>
                  <option value="custom">Personalizzato</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Giorno{' '}
                  {localSettings.distributionPeriod === 'monthly' ? 'del mese' : 'della settimana'}
                </label>
                <select
                  value={localSettings.distributionDay}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      distributionDay: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  {localSettings.distributionPeriod === 'monthly' ? (
                    Array.from({ length: 28 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="1">Lunedì</option>
                      <option value="2">Martedì</option>
                      <option value="3">Mercoledì</option>
                      <option value="4">Giovedì</option>
                      <option value="5">Venerdì</option>
                      <option value="6">Sabato</option>
                      <option value="7">Domenica</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Salvataggio...' : 'Salva Impostazioni'}
            </button>
          </div>
        </div>
      )}

      {/* Members Section */}
      {activeSection === 'members' && (
        <div className="space-y-4">
          {/* Actions */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{members.length} membri nel pool</p>
            <button
              onClick={onSyncMembers}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              🔄 Sincronizza da Staff
            </button>
          </div>

          {members.length === 0 ? (
            <EmptyState
              icon={<span className="text-5xl">👥</span>}
              title="Nessun membro nel pool"
              description="Sincronizza i membri dello staff per aggiungerli al pool delle mance."
              action={{ label: 'Sincronizza Staff', onClick: onSyncMembers }}
              variant="default"
              size="default"
            />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className={`rounded-xl border p-4 transition-all ${
                    member.isIncluded
                      ? 'border-gray-200 bg-white'
                      : 'border-gray-100 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {member.staffPhoto ? (
                        <img
                          src={member.staffPhoto}
                          alt={member.staffName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                          {member.staffName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{member.staffName}</p>
                        <p className="text-xs text-gray-500">{member.tipRole || member.jobTitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onUpdateMember(member.id, { isIncluded: !member.isIncluded })}
                      className={`rounded-lg px-2 py-1 text-xs font-medium ${
                        member.isIncluded
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {member.isIncluded ? '✓ Incluso' : 'Escluso'}
                    </button>
                  </div>

                  {/* Custom Percentage (if custom mode) */}
                  {settings?.poolType === 'custom' && member.isIncluded && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm text-gray-600">Percentuale:</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={member.customPercentage || 0}
                        onChange={(e) =>
                          onUpdateMember(member.id, {
                            customPercentage: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  )}

                  {/* Exclusion Reason */}
                  {!member.isIncluded && member.exclusionReason && (
                    <p className="mt-2 text-xs text-gray-400">Motivo: {member.exclusionReason}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Periods Section */}
      {activeSection === 'periods' && (
        <div className="space-y-4">
          {/* Actions */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{periods.length} periodi</p>
            <button
              onClick={onCreatePeriod}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              + Nuovo Periodo
            </button>
          </div>

          {periods.length === 0 ? (
            <EmptyState
              icon={<span className="text-5xl">📅</span>}
              title="Nessun periodo"
              description="Crea un nuovo periodo per iniziare a tracciare le mance."
              action={{ label: 'Crea Periodo', onClick: onCreatePeriod }}
              variant="default"
              size="default"
            />
          ) : (
            <div className="space-y-3">
              {periods.map((period) => (
                <div key={period.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            period.status === 'open'
                              ? 'bg-green-100 text-green-700'
                              : period.status === 'closed'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {period.status === 'open'
                            ? '🟢 Aperto'
                            : period.status === 'closed'
                              ? '🟡 Chiuso'
                              : '✅ Distribuito'}
                        </span>
                        <span className="font-medium text-gray-900">
                          {new Date(period.periodStart).toLocaleDateString('it-IT')} -{' '}
                          {new Date(period.periodEnd).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                        <span>💰 Mance: €{period.totalTips.toFixed(2)}</span>
                        <span>🍽️ Coperto: €{period.totalServiceCharges.toFixed(2)}</span>
                        {period.status === 'distributed' && (
                          <span>✅ Distribuito: €{period.totalDistributed.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {period.status === 'open' && (
                        <button
                          onClick={() => onClosePeriod(period.id)}
                          disabled={isSaving}
                          className="rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-700 hover:bg-yellow-100 disabled:opacity-50"
                        >
                          Chiudi Periodo
                        </button>
                      )}
                      {period.status === 'closed' && (
                        <>
                          <button
                            onClick={() => onPreviewDistribution(period.id)}
                            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Anteprima
                          </button>
                          <button
                            onClick={() => onDistribute(period.id)}
                            disabled={isSaving}
                            className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            Distribuisci
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Distribution Preview Modal */}
          {distributionPreview && (
            <Dialog open={true} onOpenChange={() => onClearPreview()}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>📊 Anteprima Distribuzione</DialogTitle>
                  <DialogDescription>Ecco come verranno distribuite le mance</DialogDescription>
                </DialogHeader>
                <div className="max-h-80 space-y-2 overflow-y-auto py-4">
                  {distributionPreview.map((alloc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                    >
                      <div className="flex items-center gap-3">
                        {alloc.staffPhoto ? (
                          <img
                            src={alloc.staffPhoto}
                            alt={alloc.staffName}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                            {alloc.staffName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{alloc.staffName}</p>
                          <p className="text-xs text-gray-500">
                            {alloc.tipRole} • {alloc.percentageShare.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        €{alloc.allocationAmount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <button
                    onClick={() => onClearPreview()}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Chiudi
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
}
