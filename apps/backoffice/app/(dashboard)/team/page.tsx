'use client';

import { useState, useEffect } from 'react';
import {
  getStaffMembers,
  getPendingInvitations,
  getRoleTemplates,
  inviteStaffMember,
  revokeInvitation,
  removeStaffMember,
  updateStaffPermissions,
  PERMISSION_LABELS,
  type StaffMember,
  type StaffInvitation,
  type RoleTemplate,
} from '@/lib/staff-service';
import { useTenant } from '@/lib/contexts/TenantContext';
import { EmptyState } from '@/components/ui/empty-state';

export default function TeamPage() {
  const { organization } = useTenant();
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [pendingInvitations, setPendingInvitations] = useState<StaffInvitation[]>([]);
  const [roleTemplates, setRoleTemplates] = useState<RoleTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteFirstName, setInviteFirstName] = useState('');
  const [inviteLastName, setInviteLastName] = useState('');
  const [inviteRole, setInviteRole] = useState('waiter');
  const [inviteMessage, setInviteMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mock current user - in production from auth
  const currentAccountId = '00000000-0000-0000-0000-000000000000';

  useEffect(() => {
    if (organization?.id) {
      loadData();
    }
  }, [organization?.id]);

  const loadData = async () => {
    if (!organization?.id) return;

    setIsLoading(true);
    const [staff, invitations, templates] = await Promise.all([
      getStaffMembers(organization.id),
      getPendingInvitations(organization.id),
      getRoleTemplates(),
    ]);
    setStaffMembers(staff);
    setPendingInvitations(invitations);
    setRoleTemplates(templates);
    setIsLoading(false);
  };

  const handleInvite = async () => {
    if (!organization?.id || !inviteEmail) return;

    setIsSubmitting(true);
    setError(null);

    const template = roleTemplates.find((t) => t.id === inviteRole);
    const result = await inviteStaffMember(currentAccountId, organization.id, inviteEmail, {
      roleTitle: template?.name || 'Staff',
      permissions: template?.permissions || {},
      firstName: inviteFirstName || undefined,
      lastName: inviteLastName || undefined,
      message: inviteMessage || undefined,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSuccess(`Invitation sent to ${inviteEmail}`);
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteFirstName('');
      setInviteLastName('');
      setInviteMessage('');
      loadData();
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to send invitation');
    }
  };

  const handleRevokeInvitation = async (invitationId: string) => {
    if (!confirm('Are you sure you want to revoke this invitation?')) return;

    const success = await revokeInvitation(invitationId, currentAccountId);
    if (success) {
      loadData();
    }
  };

  const handleRemoveMember = async (roleId: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from the team?`)) return;

    const success = await removeStaffMember(roleId, currentAccountId);
    if (success) {
      loadData();
    }
  };

  const handleUpdatePermissions = async () => {
    if (!selectedMember) return;

    // For now, just close the modal - full implementation would update permissions
    setShowPermissionsModal(false);
    setSelectedMember(null);
  };

  const getRoleColor = (permissions: Record<string, boolean>) => {
    if (permissions.is_owner) return 'bg-purple-100 text-purple-700';
    if (permissions.staff_manage) return 'bg-blue-100 text-blue-700';
    if (permissions.menu_edit) return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getRoleTitle = (permissions: Record<string, boolean>) => {
    if (permissions.is_owner) return 'Owner';
    if (permissions.staff_manage && permissions.billing_manage) return 'Manager';
    if (permissions.menu_edit && !permissions.orders_manage) return 'Chef';
    if (permissions.orders_manage && !permissions.menu_edit) return 'Waiter';
    if (permissions.analytics_view && !permissions.menu_edit) return 'Viewer';
    return 'Staff';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTimeAgo = (dateStr: string | undefined) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 5) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateStr);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="mt-1 text-sm text-gray-500">Manage who has access to your GUDBRO account</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Invite Member
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-yellow-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Pending Invitations ({pendingInvitations.length})
          </h3>
          <div className="space-y-2">
            {pendingInvitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex items-center justify-between rounded-lg bg-white p-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{invitation.email}</p>
                  <p className="text-sm text-gray-500">
                    {invitation.roleTitle} · Expires {formatDate(invitation.expiresAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      /* Resend logic */
                    }}
                    className="rounded-lg px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50"
                  >
                    Resend
                  </button>
                  <button
                    onClick={() => handleRevokeInvitation(invitation.id)}
                    className="rounded-lg px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Members */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Team Members ({staffMembers.length})</h2>
        </div>

        {staffMembers.length === 0 ? (
          <EmptyState
            icon={<span className="text-5xl">👥</span>}
            title="No team members yet"
            description="Invite your first team member to help manage your business."
            action={{ label: 'Invite Member', onClick: () => setShowInviteModal(true) }}
            variant="minimal"
            size="default"
          />
        ) : (
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staffMembers.map((member) => (
                <tr key={member.roleId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 font-medium text-white">
                        {(member.displayName || member.firstName || member.email)
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {member.displayName ||
                            `${member.firstName || ''} ${member.lastName || ''}`.trim() ||
                            member.email.split('@')[0]}
                        </p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getRoleColor(member.permissions)}`}
                    >
                      {getRoleTitle(member.permissions)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {member.acceptedAt ? formatDate(member.acceptedAt) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {getTimeAgo(member.lastLoginAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {!member.permissions.is_owner ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedMember(member);
                            setShowPermissionsModal(true);
                          }}
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          title="Edit permissions"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemoveMember(member.roleId, member.email)}
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Remove member"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Owner</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Role Templates */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-1 font-semibold text-gray-900">Role Templates</h3>
        <p className="mb-4 text-sm text-gray-500">Predefined permission sets for common roles</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {roleTemplates.map((template) => (
            <div
              key={template.id}
              className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300"
            >
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getRoleColor(template.permissions)}`}
              >
                {template.name}
              </span>
              <p className="mt-2 text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white">
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
              <p className="text-sm text-gray-500">Send an invitation to join your team</p>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@restaurant.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={inviteFirstName}
                    onChange={(e) => setInviteFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={inviteLastName}
                    onChange={(e) => setInviteLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  {roleTemplates
                    .filter((t) => t.id !== 'owner')
                    .map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  {roleTemplates.find((t) => t.id === inviteRole)?.description}
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Personal Message (optional)
                </label>
                <textarea
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder="Hey, I'd like you to join our team on GUDBRO..."
                  rows={2}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 border-t border-gray-200 p-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={isSubmitting || !inviteEmail}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Invitation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white">
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit Permissions</h3>
              <p className="text-sm text-gray-500">{selectedMember.email}</p>
            </div>

            <div className="space-y-3 p-6">
              {Object.entries(PERMISSION_LABELS).map(([key, { label, description }]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-start gap-3 rounded-lg p-3 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedMember.permissions[key] === true}
                    onChange={() => {
                      setSelectedMember({
                        ...selectedMember,
                        permissions: {
                          ...selectedMember.permissions,
                          [key]: !selectedMember.permissions[key],
                        },
                      });
                    }}
                    className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{label}</p>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-3 border-t border-gray-200 p-6">
              <button
                onClick={() => {
                  setShowPermissionsModal(false);
                  setSelectedMember(null);
                }}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePermissions}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
