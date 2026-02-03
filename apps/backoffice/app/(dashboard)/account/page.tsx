'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useAccountRoles } from '@/lib/hooks/useAccountRoles';
import { User, Envelope, Shield, Star, Camera, FloppyDisk } from '@phosphor-icons/react';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export default function AccountPage() {
  const { user } = useAuth();
  const { account, roles, currentRole, isLoading } = useAccountRoles();
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: account?.first_name || user?.name?.split(' ')[0] || '',
    lastName: account?.last_name || user?.name?.split(' ').slice(1).join(' ') || '',
    displayName: account?.display_name || user?.name || '',
  });

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement save to database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const getRoleBadgeColor = (roleType: string) => {
    switch (roleType) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'merchant':
        return 'bg-green-100 text-green-700';
      case 'consumer':
        return 'bg-blue-100 text-blue-700';
      case 'contributor':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <InfoTooltip contentKey="pages.account" kbPageId="account" />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <User className="h-5 w-5 text-gray-400" />
            Profile Information
          </h2>

          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-3xl font-bold text-white">
                  {formData.displayName?.charAt(0).toUpperCase() ||
                    user?.email?.charAt(0).toUpperCase() ||
                    'U'}
                </div>
                <button className="absolute bottom-0 right-0 rounded-full border border-gray-200 bg-white p-1.5 shadow-lg hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="grid flex-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Display Name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How you want to be called"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <FloppyDisk className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Email Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Envelope className="h-5 w-5 text-gray-400" />
            Email Address
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.email || 'No email'}</p>
              <p className="mt-0.5 text-xs text-gray-500">
                Your email is used for login and notifications
              </p>
            </div>
            <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
              Verified
            </span>
          </div>
        </div>

        {/* Roles Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Shield className="h-5 w-5 text-gray-400" />
            Account Roles
          </h2>

          {isLoading ? (
            <div className="text-sm text-gray-500">Loading roles...</div>
          ) : roles.length === 0 ? (
            <div className="text-sm text-gray-500">No roles assigned yet</div>
          ) : (
            <div className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`flex items-center justify-between rounded-lg border p-3 ${
                    currentRole?.id === role.id ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium capitalize ${getRoleBadgeColor(role.role_type)}`}
                    >
                      {role.role_type}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {role.tenant_name || role.role_type}
                      </p>
                      {role.tenant_type && (
                        <p className="text-xs capitalize text-gray-500">{role.tenant_type}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {role.is_primary && <span className="text-xs text-gray-500">Primary</span>}
                    {currentRole?.id === role.id && (
                      <span className="text-xs font-medium text-blue-600">Active</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Loyalty Section */}
        {account && account.total_points > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Star className="h-5 w-5 text-gray-400" />
              Loyalty Program
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">
                  {account.total_points.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Tier</p>
                <p
                  className={`text-2xl font-bold capitalize ${
                    account.loyalty_tier === 'platinum'
                      ? 'text-purple-600'
                      : account.loyalty_tier === 'gold'
                        ? 'text-yellow-600'
                        : account.loyalty_tier === 'silver'
                          ? 'text-gray-600'
                          : 'text-orange-600'
                  }`}
                >
                  {account.loyalty_tier}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div className="rounded-xl border border-red-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-red-600">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Delete Account</p>
              <p className="mt-0.5 text-xs text-gray-500">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
