'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { StaffInviteModal } from '@/components/team/StaffInviteModal';
import { StaffAssignmentsTab } from '@/components/team/StaffAssignmentsTab';

// Local components
import { MembersTab } from './components/MembersTab';
import { PerformanceTab } from './components/PerformanceTab';
import { SettingsTab } from './components/SettingsTab';
import { StaffFormModal } from './components/StaffFormModal';
import { TipsTab } from './components/TipsTab';
import { TABS } from './components/types';
import type {
  TabId,
  StaffProfile,
  StaffInvitation,
  TeamSettings,
  WeeklyReport,
  TopPerformer,
  TipDistributionSettings,
  TipPoolMember,
  TipPoolPeriod,
  DistributionPreview,
} from './components/types';

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
          accountId: editingStaff?.accountId || `temp-${Date.now()}`,
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
