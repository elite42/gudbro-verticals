'use client';

import { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  avatar: string | null;
  status: 'active' | 'pending';
  lastActive: string | null;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Gian Franco',
    email: 'gian@gudbro.com',
    role: 'owner',
    avatar: null,
    status: 'active',
    lastActive: 'Now',
  },
  {
    id: '2',
    name: 'Minh Nguyen',
    email: 'minh@rootscafe.vn',
    role: 'admin',
    avatar: null,
    status: 'active',
    lastActive: '2 hours ago',
  },
  {
    id: '3',
    name: 'Sarah Kim',
    email: 'sarah@rootscafe.vn',
    role: 'editor',
    avatar: null,
    status: 'pending',
    lastActive: null,
  },
];

const roles = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Full access to everything, including billing and team management',
    color: 'purple',
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Can manage content, QR codes, translations, and view analytics',
    color: 'blue',
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can create and edit content and translations',
    color: 'green',
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Can only view content and analytics',
    color: 'gray',
  },
];

export default function TeamPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('editor');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-700';
      case 'admin':
        return 'bg-blue-100 text-blue-700';
      case 'editor':
        return 'bg-green-100 text-green-700';
      case 'viewer':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage who has access to your GUDBRO account
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Invite Member
        </button>
      </div>

      {/* Plan Limit Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">👥</span>
          <div className="flex-1">
            <p className="font-medium text-yellow-800">Team Member Limit</p>
            <p className="text-sm text-yellow-700">
              Your Starter plan allows up to 3 team members. Upgrade to Pro for up to 10 members.
            </p>
          </div>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700">
            Upgrade
          </button>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Member</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Role</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Last Active</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {member.status === 'active' ? (
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-yellow-600">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {member.lastActive || 'Never'}
                </td>
                <td className="px-6 py-4 text-right">
                  {member.role !== 'owner' ? (
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                        ✏️
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                        🗑️
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roles Explanation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Role Permissions</h3>
        <p className="text-sm text-gray-500">Understand what each role can do</p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <div key={role.id} className="p-4 border border-gray-200 rounded-lg">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(role.id)}`}>
                {role.name}
              </span>
              <p className="mt-2 text-sm text-gray-600">{role.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
            <p className="text-sm text-gray-500">Send an invitation to join your team</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  {roles.find((r) => r.id === inviteRole)?.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
