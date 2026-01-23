'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { PERMISSION_LABELS } from '@/lib/staff-service';

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

interface StaffInviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
  locationId?: string;
  brandId?: string;
  onInviteSent: () => void;
}

const ROLE_TEMPLATES: Array<{
  id: string;
  name: string;
  icon: string;
  description: string;
  permissions: Record<string, boolean>;
}> = [
  {
    id: 'manager',
    name: 'Manager',
    icon: '💼',
    description: 'Accesso completo, può gestire staff',
    permissions: {
      menu_view: true,
      menu_edit: true,
      orders_view: true,
      orders_manage: true,
      analytics_view: true,
      staff_manage: true,
      billing_manage: false,
      settings_manage: true,
    },
  },
  {
    id: 'chef',
    name: 'Chef',
    icon: '👨‍🍳',
    description: 'Gestisce menu e visualizza ordini',
    permissions: {
      menu_view: true,
      menu_edit: true,
      orders_view: true,
      orders_manage: true,
      analytics_view: false,
      staff_manage: false,
      billing_manage: false,
      settings_manage: false,
    },
  },
  {
    id: 'waiter',
    name: 'Cameriere',
    icon: '🍽️',
    description: 'Visualizza menu e gestisce ordini',
    permissions: {
      menu_view: true,
      menu_edit: false,
      orders_view: true,
      orders_manage: true,
      analytics_view: false,
      staff_manage: false,
      billing_manage: false,
      settings_manage: false,
    },
  },
  {
    id: 'staff',
    name: 'Staff',
    icon: '👤',
    description: 'Accesso base, solo visualizzazione',
    permissions: {
      menu_view: true,
      menu_edit: false,
      orders_view: true,
      orders_manage: false,
      analytics_view: false,
      staff_manage: false,
      billing_manage: false,
      settings_manage: false,
    },
  },
];

export function StaffInviteModal({
  open,
  onOpenChange,
  organizationId,
  locationId,
  brandId,
  onInviteSent,
}: StaffInviteModalProps) {
  const [step, setStep] = useState<'form' | 'permissions'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    roleTitle: 'staff',
    message: '',
  });

  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    menu_view: true,
    orders_view: true,
  });

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setStep('form');
      setError(null);
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        roleTitle: 'staff',
        message: '',
      });
      setPermissions({
        menu_view: true,
        orders_view: true,
      });
    }
  }, [open]);

  // Update permissions when role changes
  const handleRoleChange = (roleId: string) => {
    const template = ROLE_TEMPLATES.find((r) => r.id === roleId);
    if (template) {
      setFormData((prev) => ({ ...prev, roleTitle: roleId }));
      setPermissions(template.permissions);
    }
  };

  const handleSubmit = async () => {
    if (!formData.email.trim()) {
      setError('Email richiesta');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/staff/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          locationId,
          brandId,
          email: formData.email.trim().toLowerCase(),
          firstName: formData.firstName.trim() || undefined,
          lastName: formData.lastName.trim() || undefined,
          roleTitle: formData.roleTitle,
          permissions,
          message: formData.message.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        onInviteSent();
        onOpenChange(false);
      } else {
        setError(data.error || "Errore nell'invio dell'invito");
      }
    } catch (err) {
      setError("Errore nell'invio dell'invito");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{step === 'form' ? '✉️ Invita Staff' : '🔐 Permessi'}</DialogTitle>
          <DialogDescription>
            {step === 'form'
              ? 'Invia un invito via email per aggiungere un nuovo membro al team'
              : 'Configura i permessi per questo membro'}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {step === 'form' ? (
          <div className="space-y-4 py-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="mario@esempio.it"
              />
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Mario"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cognome</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Rossi"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Ruolo</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {ROLE_TEMPLATES.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleChange(role.id)}
                    className={`flex items-start gap-2 rounded-lg border-2 p-3 text-left transition-all ${
                      formData.roleTitle === role.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl">{role.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900">{role.name}</p>
                      <p className="truncate text-xs text-gray-500">{role.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Messaggio personale (opzionale)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                rows={2}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ciao! Ti invito a unirti al nostro team..."
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {/* Permission toggles */}
            <div className="space-y-3">
              {Object.entries(PERMISSION_LABELS).map(([key, { label, description }]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={permissions[key]}
                    onClick={() => setPermissions((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      permissions[key] ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        permissions[key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          {step === 'permissions' && (
            <button
              type="button"
              onClick={() => setStep('form')}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Indietro
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annulla
          </button>
          {step === 'form' ? (
            <button
              type="button"
              onClick={() => setStep('permissions')}
              disabled={!formData.email.trim()}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Personalizza Permessi
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !formData.email.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Invio...' : 'Invia Invito'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// Pending Invitations List Component
// ============================================
interface PendingInvitationsListProps {
  organizationId: string;
  invitations: StaffInvitation[];
  isLoading: boolean;
  onRevokeInvitation: (invitationId: string) => void;
  onRefresh: () => void;
}

export function PendingInvitationsList({
  organizationId,
  invitations,
  isLoading,
  onRevokeInvitation,
  onRefresh,
}: PendingInvitationsListProps) {
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const handleRevoke = async (invitationId: string) => {
    setRevokingId(invitationId);
    try {
      const res = await fetch(`/api/staff/invite?invitationId=${invitationId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        onRevokeInvitation(invitationId);
        onRefresh();
      }
    } catch (err) {
      console.error('Error revoking invitation:', err);
    } finally {
      setRevokingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (invitations.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50">
      <div className="border-b border-amber-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-amber-900">
            ⏳ Inviti in Attesa ({invitations.length})
          </h3>
          <button onClick={onRefresh} className="text-sm text-amber-700 hover:text-amber-900">
            🔄 Aggiorna
          </button>
        </div>
      </div>
      <div className="divide-y divide-amber-200">
        {invitations.map((invitation) => (
          <div key={invitation.id} className="flex items-center justify-between p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  {invitation.firstName
                    ? `${invitation.firstName} ${invitation.lastName || ''}`
                    : invitation.email}
                </span>
                {isExpired(invitation.expiresAt) && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">
                    Scaduto
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                <span>{invitation.email}</span>
                <span>•</span>
                <span className="capitalize">{invitation.roleTitle}</span>
                <span>•</span>
                <span>Scade: {formatDate(invitation.expiresAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRevoke(invitation.id)}
                disabled={revokingId === invitation.id}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100 disabled:opacity-50"
              >
                {revokingId === invitation.id ? '...' : 'Revoca'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
