'use client';

import { EmptyState } from '@/components/ui/empty-state';
import { PendingInvitationsList } from '@/components/team/StaffInviteModal';
import { StaffCard } from './StaffCard';
import type { StaffProfile, StaffInvitation } from './types';

interface MembersTabProps {
  profiles: StaffProfile[];
  onAddStaff: () => void;
  onEditStaff: (profile: StaffProfile) => void;
  onInviteStaff: () => void;
  pendingInvitations: StaffInvitation[];
  isInvitationsLoading: boolean;
  onRevokeInvitation: (invitationId: string) => void;
  onRefreshInvitations: () => void;
  organizationId?: string;
}

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
}: MembersTabProps) {
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

export { MembersTab };
