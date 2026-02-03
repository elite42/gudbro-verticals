/**
 * Staff Management Service
 *
 * Handles staff invitations and role management
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Lazy accessor — throws if SERVICE_ROLE_KEY is missing (no ANON fallback)
function supabase() {
  return getSupabaseAdmin();
}

export interface StaffMember {
  roleId: string;
  accountId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
  permissions: Record<string, boolean>;
  isActive: boolean;
  invitedAt?: string;
  acceptedAt?: string;
  lastLoginAt?: string;
  inviterEmail?: string;
  inviterName?: string;
}

export interface StaffInvitation {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roleTitle: string;
  permissions: Record<string, boolean>;
  status: 'pending' | 'accepted' | 'declined' | 'expired' | 'revoked';
  createdAt: string;
  expiresAt: string;
  message?: string;
  inviterEmail: string;
  inviterName?: string;
}

export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, boolean>;
}

/**
 * Get staff members for an organization
 */
export async function getStaffMembers(organizationId: string): Promise<StaffMember[]> {
  const { data, error } = await supabase()
    .from('v_organization_staff')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[StaffService] Get staff error:', error);
    return [];
  }

  return (data || []).map((s: Record<string, unknown>) => ({
    roleId: s.role_id as string,
    accountId: s.account_id as string,
    email: s.email as string,
    firstName: s.first_name as string | undefined,
    lastName: s.last_name as string | undefined,
    displayName: s.display_name as string | undefined,
    avatarUrl: s.avatar_url as string | undefined,
    permissions: (s.permissions as Record<string, boolean>) || {},
    isActive: s.is_active as boolean,
    invitedAt: s.invited_at as string | undefined,
    acceptedAt: s.accepted_at as string | undefined,
    lastLoginAt: s.last_login_at as string | undefined,
    inviterEmail: s.inviter_email as string | undefined,
    inviterName: s.inviter_name as string | undefined,
  }));
}

/**
 * Get pending invitations for an organization
 */
export async function getPendingInvitations(organizationId: string): Promise<StaffInvitation[]> {
  const { data, error } = await supabase()
    .from('v_pending_staff_invitations')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[StaffService] Get invitations error:', error);
    return [];
  }

  return (data || []).map((i: Record<string, unknown>) => ({
    id: i.id as string,
    email: i.email as string,
    firstName: i.first_name as string | undefined,
    lastName: i.last_name as string | undefined,
    roleTitle: i.role_title as string,
    permissions: (i.permissions as Record<string, boolean>) || {},
    status: i.status as 'pending' | 'accepted' | 'declined' | 'expired' | 'revoked',
    createdAt: i.created_at as string,
    expiresAt: i.expires_at as string,
    message: i.message as string | undefined,
    inviterEmail: i.inviter_email as string,
    inviterName: i.inviter_name as string | undefined,
  }));
}

/**
 * Get role templates
 */
export async function getRoleTemplates(): Promise<RoleTemplate[]> {
  const { data, error } = await supabase()
    .from('role_templates')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[StaffService] Get templates error:', error);
    return [];
  }

  return (data || []).map((t: Record<string, unknown>) => ({
    id: t.id as string,
    name: t.name as string,
    description: t.description as string,
    permissions: t.permissions as Record<string, boolean>,
  }));
}

/**
 * Invite a new staff member
 */
export async function inviteStaffMember(
  inviterAccountId: string,
  organizationId: string,
  email: string,
  options?: {
    roleTitle?: string;
    permissions?: Record<string, boolean>;
    firstName?: string;
    lastName?: string;
    message?: string;
    brandId?: string;
    locationId?: string;
  }
): Promise<{ success: boolean; invitationId?: string; inviteToken?: string; error?: string }> {
  // Get inviter and organization details for email
  const [inviterResult, orgResult] = await Promise.all([
    supabase()
      .from('accounts')
      .select('email, display_name, first_name')
      .eq('id', inviterAccountId)
      .single(),
    supabase().from('organizations').select('name').eq('id', organizationId).single(),
  ]);

  const { data, error } = await supabase().rpc('invite_staff_member', {
    p_inviter_account_id: inviterAccountId,
    p_organization_id: organizationId,
    p_email: email,
    p_role_title: options?.roleTitle || 'staff',
    p_permissions: options?.permissions || {},
    p_first_name: options?.firstName || null,
    p_last_name: options?.lastName || null,
    p_message: options?.message || null,
    p_brand_id: options?.brandId || null,
    p_location_id: options?.locationId || null,
  });

  if (error) {
    console.error('[StaffService] Invite error:', error);
    return { success: false, error: error.message };
  }

  if (data && data.length > 0) {
    const result = data[0];

    // Send invitation email (async, don't wait)
    if (result.success && result.invite_token) {
      const inviter = inviterResult.data;
      const org = orgResult.data;

      // Calculate expiry (7 days from now)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      sendStaffInviteEmail({
        email,
        name: options?.firstName || undefined,
        organizationName: org?.name || 'Organizzazione',
        roleTitle: options?.roleTitle || 'staff',
        inviterName: inviter?.display_name || inviter?.first_name || 'Team',
        inviteToken: result.invite_token,
        message: options?.message,
        expiresAt: expiresAt.toISOString(),
      }).catch((err) => {
        console.error('[StaffService] Email send failed:', err);
      });
    }

    return {
      success: result.success,
      invitationId: result.invitation_id,
      inviteToken: result.invite_token,
      error: result.error_message,
    };
  }

  return { success: false, error: 'Unknown error' };
}

/**
 * Send staff invitation email via Resend
 */
async function sendStaffInviteEmail(params: {
  email: string;
  name?: string;
  organizationName: string;
  roleTitle: string;
  inviterName: string;
  inviteToken: string;
  message?: string;
  expiresAt: string;
}): Promise<void> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.warn('[StaffService] Resend API key not configured, skipping email');
    return;
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gudbro-website.vercel.app';
  const inviteUrl = `${BASE_URL}/invite?token=${params.inviteToken}`;
  const expiryDate = new Date(params.expiresAt).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const roleIcons: Record<string, string> = {
    owner: '👑',
    manager: '💼',
    chef: '👨‍🍳',
    waiter: '🍽️',
    viewer: '👁️',
    staff: '👤',
  };
  const roleIcon = roleIcons[params.roleTitle.toLowerCase()] || '👤';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GUDBRO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; padding: 20px 0; border-bottom: 1px solid #e5e7eb;">
        <div style="font-size: 24px; font-weight: bold; color: #111827;">📱 GUDBRO</div>
      </div>

      <div style="padding: 30px 20px;">
        <h1 style="font-size: 24px; font-weight: 600; color: #111827; margin: 0 0 16px 0;">Sei stato invitato!</h1>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
          Ciao${params.name ? ` ${params.name}` : ''},
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
          <strong>${params.inviterName}</strong> ti ha invitato a unirti al team di <strong>${params.organizationName}</strong> su GUDBRO.
        </p>

        <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 32px;">${roleIcon}</span>
            <div>
              <p style="margin: 0; font-weight: 600; color: #111827;">${params.organizationName}</p>
              <p style="margin: 4px 0 0 0; color: #6b7280; text-transform: capitalize;">${params.roleTitle}</p>
            </div>
          </div>
        </div>

        ${
          params.message
            ? `
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">Messaggio personale:</p>
          <p style="margin: 8px 0 0 0; color: #78350f; font-style: italic;">"${params.message}"</p>
        </div>
        `
            : ''
        }

        <div style="text-align: center; margin: 30px 0;">
          <a href="${inviteUrl}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Accetta Invito</a>
        </div>

        <p style="font-size: 14px; color: #9ca3af; text-align: center;">
          Questo invito scade il ${expiryDate}
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

        <p style="font-size: 14px; color: #9ca3af;">
          Se non ti aspettavi questo invito, puoi ignorare questa email.
          <br><br>
          Link diretto: <a href="${inviteUrl}" style="color: #8b5cf6;">${inviteUrl}</a>
        </p>
      </div>

      <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px;">
        <p style="margin: 0 0 8px 0;">© ${new Date().getFullYear()} GUDBRO. Tutti i diritti riservati.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'GUDBRO <noreply@gudbro.com>',
      to: [params.email],
      subject: `${params.inviterName} ti ha invitato a ${params.organizationName}`,
      html,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  await response.json();
}

/**
 * Revoke a pending invitation
 */
export async function revokeInvitation(
  invitationId: string,
  revokerAccountId: string
): Promise<boolean> {
  const { data, error } = await supabase().rpc('revoke_staff_invitation', {
    p_invitation_id: invitationId,
    p_revoker_account_id: revokerAccountId,
  });

  if (error) {
    console.error('[StaffService] Revoke error:', error);
    return false;
  }

  return data === true;
}

/**
 * Remove a staff member
 */
export async function removeStaffMember(
  roleId: string,
  removerAccountId: string
): Promise<boolean> {
  const { data, error } = await supabase().rpc('remove_staff_member', {
    p_role_id: roleId,
    p_remover_account_id: removerAccountId,
  });

  if (error) {
    console.error('[StaffService] Remove error:', error);
    return false;
  }

  return data === true;
}

/**
 * Update staff permissions
 */
export async function updateStaffPermissions(
  roleId: string,
  updaterAccountId: string,
  newPermissions: Record<string, boolean>,
  newTitle?: string
): Promise<boolean> {
  const { data, error } = await supabase().rpc('update_staff_permissions', {
    p_role_id: roleId,
    p_updater_account_id: updaterAccountId,
    p_new_permissions: newPermissions,
    p_new_title: newTitle || null,
  });

  if (error) {
    console.error('[StaffService] Update permissions error:', error);
    return false;
  }

  return data === true;
}

/**
 * Accept an invitation (for invite page)
 */
export async function acceptInvitation(
  inviteToken: string,
  authId?: string
): Promise<{ success: boolean; accountId?: string; organizationId?: string; error?: string }> {
  const { data, error } = await supabase().rpc('accept_staff_invitation', {
    p_invite_token: inviteToken,
    p_auth_id: authId || null,
  });

  if (error) {
    console.error('[StaffService] Accept error:', error);
    return { success: false, error: error.message };
  }

  if (data && data.length > 0) {
    const result = data[0];
    return {
      success: result.success,
      accountId: result.account_id,
      organizationId: result.organization_id,
      error: result.error_message,
    };
  }

  return { success: false, error: 'Unknown error' };
}

/**
 * Get invitation by token (for invite page)
 */
export async function getInvitationByToken(token: string): Promise<StaffInvitation | null> {
  const { data, error } = await supabase()
    .from('staff_invitations')
    .select(
      `
      *,
      organizations!inner(name),
      accounts!staff_invitations_inviter_account_id_fkey(email, display_name)
    `
    )
    .eq('invite_token', token)
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
    roleTitle: data.role_title,
    permissions: data.permissions || {},
    status: data.status,
    createdAt: data.created_at,
    expiresAt: data.expires_at,
    message: data.message,
    inviterEmail: data.accounts?.email || '',
    inviterName: data.accounts?.display_name,
  };
}

/**
 * Permission labels for UI
 */
export const PERMISSION_LABELS: Record<string, { label: string; description: string }> = {
  menu_view: { label: 'View Menu', description: 'Can view menu items' },
  menu_edit: { label: 'Edit Menu', description: 'Can add, edit, and remove menu items' },
  orders_view: { label: 'View Orders', description: 'Can see incoming orders' },
  orders_manage: {
    label: 'Manage Orders',
    description: 'Can accept, prepare, and complete orders',
  },
  analytics_view: { label: 'View Analytics', description: 'Can see reports and statistics' },
  staff_manage: { label: 'Manage Staff', description: 'Can invite and remove team members' },
  billing_manage: { label: 'Manage Billing', description: 'Can access subscription and payments' },
  settings_manage: { label: 'Manage Settings', description: 'Can change organization settings' },
};
