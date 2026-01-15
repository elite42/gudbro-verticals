/**
 * Staff Service Tests
 *
 * Tests for staff management types, interfaces, constants, and validation logic.
 */

import { describe, it, expect } from 'vitest';

// ============================================================================
// TYPE DEFINITIONS (Testing interface structures)
// ============================================================================

/**
 * StaffMember interface structure
 */
interface StaffMember {
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

/**
 * StaffInvitation interface structure
 */
interface StaffInvitation {
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

/**
 * RoleTemplate interface structure
 */
interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, boolean>;
}

/**
 * InviteOptions interface structure
 */
interface InviteOptions {
  roleTitle?: string;
  permissions?: Record<string, boolean>;
  firstName?: string;
  lastName?: string;
  message?: string;
  brandId?: string;
  locationId?: string;
}

/**
 * InviteResult interface structure
 */
interface InviteResult {
  success: boolean;
  invitationId?: string;
  inviteToken?: string;
  error?: string;
}

/**
 * AcceptResult interface structure
 */
interface AcceptResult {
  success: boolean;
  accountId?: string;
  organizationId?: string;
  error?: string;
}

// ============================================================================
// PERMISSION LABELS (Mirrored from source)
// ============================================================================

const PERMISSION_LABELS: Record<string, { label: string; description: string }> = {
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

// ============================================================================
// INVITATION STATUSES
// ============================================================================

const INVITATION_STATUSES = ['pending', 'accepted', 'declined', 'expired', 'revoked'] as const;
type InvitationStatus = (typeof INVITATION_STATUSES)[number];

// ============================================================================
// ROLE ICONS (From email template)
// ============================================================================

const ROLE_ICONS: Record<string, string> = {
  owner: '👑',
  manager: '💼',
  chef: '👨‍🍳',
  waiter: '🍽️',
  viewer: '👁️',
  staff: '👤',
};

// ============================================================================
// PREDEFINED ROLE TEMPLATES
// ============================================================================

const PREDEFINED_ROLES = {
  owner: {
    permissions: {
      menu_view: true,
      menu_edit: true,
      orders_view: true,
      orders_manage: true,
      analytics_view: true,
      staff_manage: true,
      billing_manage: true,
      settings_manage: true,
    },
  },
  manager: {
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
  chef: {
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
  waiter: {
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
  viewer: {
    permissions: {
      menu_view: true,
      menu_edit: false,
      orders_view: true,
      orders_manage: false,
      analytics_view: true,
      staff_manage: false,
      billing_manage: false,
      settings_manage: false,
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS (Data transformation logic from service)
// ============================================================================

/**
 * Transform raw database staff data to StaffMember
 */
function mapToStaffMember(raw: any): StaffMember {
  return {
    roleId: raw.role_id,
    accountId: raw.account_id,
    email: raw.email,
    firstName: raw.first_name,
    lastName: raw.last_name,
    displayName: raw.display_name,
    avatarUrl: raw.avatar_url,
    permissions: raw.permissions || {},
    isActive: raw.is_active,
    invitedAt: raw.invited_at,
    acceptedAt: raw.accepted_at,
    lastLoginAt: raw.last_login_at,
    inviterEmail: raw.inviter_email,
    inviterName: raw.inviter_name,
  };
}

/**
 * Transform raw database invitation data to StaffInvitation
 */
function mapToStaffInvitation(raw: any): StaffInvitation {
  return {
    id: raw.id,
    email: raw.email,
    firstName: raw.first_name,
    lastName: raw.last_name,
    roleTitle: raw.role_title,
    permissions: raw.permissions || {},
    status: raw.status,
    createdAt: raw.created_at,
    expiresAt: raw.expires_at,
    message: raw.message,
    inviterEmail: raw.inviter_email,
    inviterName: raw.inviter_name,
  };
}

/**
 * Transform raw database template data to RoleTemplate
 */
function mapToRoleTemplate(raw: any): RoleTemplate {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    permissions: raw.permissions,
  };
}

/**
 * Get role icon for email template
 */
function getRoleIcon(roleTitle: string): string {
  return ROLE_ICONS[roleTitle.toLowerCase()] || '👤';
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate UUID format
 */
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Check if invitation is expired
 */
function isInvitationExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

/**
 * Calculate invitation expiry date (7 days from now)
 */
function calculateExpiryDate(): Date {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  return expiresAt;
}

/**
 * Format expiry date for Italian locale
 */
function formatExpiryDate(date: Date): string {
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Build invite URL
 */
function buildInviteUrl(baseUrl: string, token: string): string {
  return `${baseUrl}/invite?token=${token}`;
}

/**
 * Get display name for staff member
 */
function getDisplayName(member: StaffMember): string {
  if (member.displayName) return member.displayName;
  if (member.firstName && member.lastName) return `${member.firstName} ${member.lastName}`;
  if (member.firstName) return member.firstName;
  return member.email;
}

/**
 * Check if user has permission
 */
function hasPermission(permissions: Record<string, boolean>, permission: string): boolean {
  return permissions[permission] === true;
}

/**
 * Count active permissions
 */
function countActivePermissions(permissions: Record<string, boolean>): number {
  return Object.values(permissions).filter(Boolean).length;
}

// ============================================================================
// TESTS
// ============================================================================

describe('Staff Service', () => {
  // ==========================================================================
  // StaffMember Interface Tests
  // ==========================================================================

  describe('StaffMember Interface', () => {
    it('should have required fields', () => {
      const member: StaffMember = {
        roleId: '123e4567-e89b-12d3-a456-426614174000',
        accountId: '123e4567-e89b-12d3-a456-426614174001',
        email: 'staff@example.com',
        permissions: {},
        isActive: true,
      };

      expect(member.roleId).toBeDefined();
      expect(member.accountId).toBeDefined();
      expect(member.email).toBeDefined();
      expect(member.permissions).toBeDefined();
      expect(member.isActive).toBeDefined();
    });

    it('should allow optional profile fields', () => {
      const member: StaffMember = {
        roleId: '123e4567-e89b-12d3-a456-426614174000',
        accountId: '123e4567-e89b-12d3-a456-426614174001',
        email: 'staff@example.com',
        firstName: 'Mario',
        lastName: 'Rossi',
        displayName: 'Mario R.',
        avatarUrl: 'https://example.com/avatar.jpg',
        permissions: { menu_view: true },
        isActive: true,
      };

      expect(member.firstName).toBe('Mario');
      expect(member.lastName).toBe('Rossi');
      expect(member.displayName).toBe('Mario R.');
      expect(member.avatarUrl).toBe('https://example.com/avatar.jpg');
    });

    it('should allow optional timestamp fields', () => {
      const member: StaffMember = {
        roleId: '123e4567-e89b-12d3-a456-426614174000',
        accountId: '123e4567-e89b-12d3-a456-426614174001',
        email: 'staff@example.com',
        permissions: {},
        isActive: true,
        invitedAt: '2026-01-14T10:00:00Z',
        acceptedAt: '2026-01-14T11:00:00Z',
        lastLoginAt: '2026-01-14T12:00:00Z',
      };

      expect(member.invitedAt).toBe('2026-01-14T10:00:00Z');
      expect(member.acceptedAt).toBe('2026-01-14T11:00:00Z');
      expect(member.lastLoginAt).toBe('2026-01-14T12:00:00Z');
    });

    it('should allow optional inviter fields', () => {
      const member: StaffMember = {
        roleId: '123e4567-e89b-12d3-a456-426614174000',
        accountId: '123e4567-e89b-12d3-a456-426614174001',
        email: 'staff@example.com',
        permissions: {},
        isActive: true,
        inviterEmail: 'owner@example.com',
        inviterName: 'Owner',
      };

      expect(member.inviterEmail).toBe('owner@example.com');
      expect(member.inviterName).toBe('Owner');
    });

    it('should handle permissions as Record<string, boolean>', () => {
      const member: StaffMember = {
        roleId: '123e4567-e89b-12d3-a456-426614174000',
        accountId: '123e4567-e89b-12d3-a456-426614174001',
        email: 'staff@example.com',
        permissions: {
          menu_view: true,
          menu_edit: false,
          orders_view: true,
          orders_manage: false,
        },
        isActive: true,
      };

      expect(member.permissions.menu_view).toBe(true);
      expect(member.permissions.menu_edit).toBe(false);
      expect(member.permissions.orders_view).toBe(true);
      expect(member.permissions.orders_manage).toBe(false);
    });
  });

  // ==========================================================================
  // StaffInvitation Interface Tests
  // ==========================================================================

  describe('StaffInvitation Interface', () => {
    it('should have required fields', () => {
      const invitation: StaffInvitation = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'newstaff@example.com',
        roleTitle: 'waiter',
        permissions: { menu_view: true, orders_view: true },
        status: 'pending',
        createdAt: '2026-01-14T10:00:00Z',
        expiresAt: '2026-01-21T10:00:00Z',
        inviterEmail: 'owner@example.com',
      };

      expect(invitation.id).toBeDefined();
      expect(invitation.email).toBeDefined();
      expect(invitation.roleTitle).toBeDefined();
      expect(invitation.permissions).toBeDefined();
      expect(invitation.status).toBeDefined();
      expect(invitation.createdAt).toBeDefined();
      expect(invitation.expiresAt).toBeDefined();
      expect(invitation.inviterEmail).toBeDefined();
    });

    it('should allow optional name fields', () => {
      const invitation: StaffInvitation = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'newstaff@example.com',
        firstName: 'Luigi',
        lastName: 'Verdi',
        roleTitle: 'chef',
        permissions: {},
        status: 'pending',
        createdAt: '2026-01-14T10:00:00Z',
        expiresAt: '2026-01-21T10:00:00Z',
        inviterEmail: 'owner@example.com',
        inviterName: 'Owner',
      };

      expect(invitation.firstName).toBe('Luigi');
      expect(invitation.lastName).toBe('Verdi');
      expect(invitation.inviterName).toBe('Owner');
    });

    it('should allow optional message', () => {
      const invitation: StaffInvitation = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'newstaff@example.com',
        roleTitle: 'staff',
        permissions: {},
        status: 'pending',
        createdAt: '2026-01-14T10:00:00Z',
        expiresAt: '2026-01-21T10:00:00Z',
        inviterEmail: 'owner@example.com',
        message: 'Benvenuto nel team!',
      };

      expect(invitation.message).toBe('Benvenuto nel team!');
    });

    it('should enforce valid status values', () => {
      const validStatuses: InvitationStatus[] = [
        'pending',
        'accepted',
        'declined',
        'expired',
        'revoked',
      ];

      validStatuses.forEach((status) => {
        const invitation: StaffInvitation = {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'test@example.com',
          roleTitle: 'staff',
          permissions: {},
          status,
          createdAt: '2026-01-14T10:00:00Z',
          expiresAt: '2026-01-21T10:00:00Z',
          inviterEmail: 'owner@example.com',
        };

        expect(INVITATION_STATUSES).toContain(invitation.status);
      });
    });
  });

  // ==========================================================================
  // RoleTemplate Interface Tests
  // ==========================================================================

  describe('RoleTemplate Interface', () => {
    it('should have required fields', () => {
      const template: RoleTemplate = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Manager',
        description: 'Can manage staff and menu',
        permissions: {
          menu_view: true,
          menu_edit: true,
          staff_manage: true,
        },
      };

      expect(template.id).toBeDefined();
      expect(template.name).toBeDefined();
      expect(template.description).toBeDefined();
      expect(template.permissions).toBeDefined();
    });

    it('should handle empty permissions', () => {
      const template: RoleTemplate = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Empty',
        description: 'No permissions',
        permissions: {},
      };

      expect(Object.keys(template.permissions)).toHaveLength(0);
    });

    it('should handle full permissions', () => {
      const template: RoleTemplate = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Owner',
        description: 'Full access',
        permissions: {
          menu_view: true,
          menu_edit: true,
          orders_view: true,
          orders_manage: true,
          analytics_view: true,
          staff_manage: true,
          billing_manage: true,
          settings_manage: true,
        },
      };

      expect(Object.keys(template.permissions)).toHaveLength(8);
      expect(Object.values(template.permissions).every(Boolean)).toBe(true);
    });
  });

  // ==========================================================================
  // InviteOptions Interface Tests
  // ==========================================================================

  describe('InviteOptions Interface', () => {
    it('should be completely optional', () => {
      const options: InviteOptions = {};
      expect(Object.keys(options)).toHaveLength(0);
    });

    it('should accept roleTitle', () => {
      const options: InviteOptions = { roleTitle: 'manager' };
      expect(options.roleTitle).toBe('manager');
    });

    it('should accept permissions', () => {
      const options: InviteOptions = {
        permissions: { menu_view: true, menu_edit: true },
      };
      expect(options.permissions?.menu_view).toBe(true);
    });

    it('should accept name fields', () => {
      const options: InviteOptions = {
        firstName: 'Mario',
        lastName: 'Rossi',
      };
      expect(options.firstName).toBe('Mario');
      expect(options.lastName).toBe('Rossi');
    });

    it('should accept message', () => {
      const options: InviteOptions = {
        message: 'Welcome to the team!',
      };
      expect(options.message).toBe('Welcome to the team!');
    });

    it('should accept scope fields', () => {
      const options: InviteOptions = {
        brandId: '123e4567-e89b-12d3-a456-426614174000',
        locationId: '123e4567-e89b-12d3-a456-426614174001',
      };
      expect(options.brandId).toBeDefined();
      expect(options.locationId).toBeDefined();
    });

    it('should accept all fields together', () => {
      const options: InviteOptions = {
        roleTitle: 'chef',
        permissions: { menu_view: true, menu_edit: true, orders_view: true },
        firstName: 'Luigi',
        lastName: 'Verdi',
        message: 'Benvenuto in cucina!',
        brandId: '123e4567-e89b-12d3-a456-426614174000',
        locationId: '123e4567-e89b-12d3-a456-426614174001',
      };

      expect(options.roleTitle).toBe('chef');
      expect(options.firstName).toBe('Luigi');
      expect(options.message).toBe('Benvenuto in cucina!');
    });
  });

  // ==========================================================================
  // InviteResult Interface Tests
  // ==========================================================================

  describe('InviteResult Interface', () => {
    it('should handle success case', () => {
      const result: InviteResult = {
        success: true,
        invitationId: '123e4567-e89b-12d3-a456-426614174000',
        inviteToken: 'abc123xyz',
      };

      expect(result.success).toBe(true);
      expect(result.invitationId).toBeDefined();
      expect(result.inviteToken).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should handle failure case', () => {
      const result: InviteResult = {
        success: false,
        error: 'Email already invited',
      };

      expect(result.success).toBe(false);
      expect(result.error).toBe('Email already invited');
      expect(result.invitationId).toBeUndefined();
      expect(result.inviteToken).toBeUndefined();
    });

    it('should handle partial success (token but with warning)', () => {
      const result: InviteResult = {
        success: true,
        invitationId: '123e4567-e89b-12d3-a456-426614174000',
        inviteToken: 'abc123xyz',
        error: 'Email delivery failed, but invitation created',
      };

      expect(result.success).toBe(true);
      expect(result.invitationId).toBeDefined();
      expect(result.error).toBeDefined();
    });
  });

  // ==========================================================================
  // AcceptResult Interface Tests
  // ==========================================================================

  describe('AcceptResult Interface', () => {
    it('should handle success case', () => {
      const result: AcceptResult = {
        success: true,
        accountId: '123e4567-e89b-12d3-a456-426614174000',
        organizationId: '123e4567-e89b-12d3-a456-426614174001',
      };

      expect(result.success).toBe(true);
      expect(result.accountId).toBeDefined();
      expect(result.organizationId).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should handle failure case', () => {
      const result: AcceptResult = {
        success: false,
        error: 'Invitation expired',
      };

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invitation expired');
      expect(result.accountId).toBeUndefined();
      expect(result.organizationId).toBeUndefined();
    });
  });

  // ==========================================================================
  // PERMISSION_LABELS Tests
  // ==========================================================================

  describe('PERMISSION_LABELS', () => {
    it('should have 8 permissions defined', () => {
      expect(Object.keys(PERMISSION_LABELS)).toHaveLength(8);
    });

    it('should have menu permissions', () => {
      expect(PERMISSION_LABELS.menu_view).toBeDefined();
      expect(PERMISSION_LABELS.menu_view.label).toBe('View Menu');
      expect(PERMISSION_LABELS.menu_edit).toBeDefined();
      expect(PERMISSION_LABELS.menu_edit.label).toBe('Edit Menu');
    });

    it('should have orders permissions', () => {
      expect(PERMISSION_LABELS.orders_view).toBeDefined();
      expect(PERMISSION_LABELS.orders_view.label).toBe('View Orders');
      expect(PERMISSION_LABELS.orders_manage).toBeDefined();
      expect(PERMISSION_LABELS.orders_manage.label).toBe('Manage Orders');
    });

    it('should have analytics permission', () => {
      expect(PERMISSION_LABELS.analytics_view).toBeDefined();
      expect(PERMISSION_LABELS.analytics_view.label).toBe('View Analytics');
    });

    it('should have management permissions', () => {
      expect(PERMISSION_LABELS.staff_manage).toBeDefined();
      expect(PERMISSION_LABELS.staff_manage.label).toBe('Manage Staff');
      expect(PERMISSION_LABELS.billing_manage).toBeDefined();
      expect(PERMISSION_LABELS.billing_manage.label).toBe('Manage Billing');
      expect(PERMISSION_LABELS.settings_manage).toBeDefined();
      expect(PERMISSION_LABELS.settings_manage.label).toBe('Manage Settings');
    });

    it('should have label and description for each permission', () => {
      Object.entries(PERMISSION_LABELS).forEach(([key, value]) => {
        expect(value.label).toBeDefined();
        expect(value.label.length).toBeGreaterThan(0);
        expect(value.description).toBeDefined();
        expect(value.description.length).toBeGreaterThan(0);
      });
    });

    it('should have descriptions that explain capabilities', () => {
      expect(PERMISSION_LABELS.menu_view.description).toContain('view');
      expect(PERMISSION_LABELS.menu_edit.description).toContain('edit');
      expect(PERMISSION_LABELS.orders_manage.description).toContain('accept');
      expect(PERMISSION_LABELS.staff_manage.description).toContain('invite');
    });
  });

  // ==========================================================================
  // INVITATION_STATUSES Tests
  // ==========================================================================

  describe('INVITATION_STATUSES', () => {
    it('should have 5 statuses', () => {
      expect(INVITATION_STATUSES).toHaveLength(5);
    });

    it('should include pending', () => {
      expect(INVITATION_STATUSES).toContain('pending');
    });

    it('should include accepted', () => {
      expect(INVITATION_STATUSES).toContain('accepted');
    });

    it('should include declined', () => {
      expect(INVITATION_STATUSES).toContain('declined');
    });

    it('should include expired', () => {
      expect(INVITATION_STATUSES).toContain('expired');
    });

    it('should include revoked', () => {
      expect(INVITATION_STATUSES).toContain('revoked');
    });
  });

  // ==========================================================================
  // ROLE_ICONS Tests
  // ==========================================================================

  describe('ROLE_ICONS', () => {
    it('should have 6 roles defined', () => {
      expect(Object.keys(ROLE_ICONS)).toHaveLength(6);
    });

    it('should have owner icon', () => {
      expect(ROLE_ICONS.owner).toBe('👑');
    });

    it('should have manager icon', () => {
      expect(ROLE_ICONS.manager).toBe('💼');
    });

    it('should have chef icon', () => {
      expect(ROLE_ICONS.chef).toBe('👨‍🍳');
    });

    it('should have waiter icon', () => {
      expect(ROLE_ICONS.waiter).toBe('🍽️');
    });

    it('should have viewer icon', () => {
      expect(ROLE_ICONS.viewer).toBe('👁️');
    });

    it('should have staff icon', () => {
      expect(ROLE_ICONS.staff).toBe('👤');
    });
  });

  // ==========================================================================
  // PREDEFINED_ROLES Tests
  // ==========================================================================

  describe('PREDEFINED_ROLES', () => {
    it('should have 5 predefined roles', () => {
      expect(Object.keys(PREDEFINED_ROLES)).toHaveLength(5);
    });

    describe('owner role', () => {
      it('should have all permissions enabled', () => {
        const { permissions } = PREDEFINED_ROLES.owner;
        expect(Object.values(permissions).every(Boolean)).toBe(true);
      });

      it('should have 8 permissions', () => {
        expect(Object.keys(PREDEFINED_ROLES.owner.permissions)).toHaveLength(8);
      });
    });

    describe('manager role', () => {
      it('should not have billing_manage', () => {
        expect(PREDEFINED_ROLES.manager.permissions.billing_manage).toBe(false);
      });

      it('should have staff_manage', () => {
        expect(PREDEFINED_ROLES.manager.permissions.staff_manage).toBe(true);
      });

      it('should have settings_manage', () => {
        expect(PREDEFINED_ROLES.manager.permissions.settings_manage).toBe(true);
      });
    });

    describe('chef role', () => {
      it('should have menu permissions', () => {
        expect(PREDEFINED_ROLES.chef.permissions.menu_view).toBe(true);
        expect(PREDEFINED_ROLES.chef.permissions.menu_edit).toBe(true);
      });

      it('should have orders permissions', () => {
        expect(PREDEFINED_ROLES.chef.permissions.orders_view).toBe(true);
        expect(PREDEFINED_ROLES.chef.permissions.orders_manage).toBe(true);
      });

      it('should not have management permissions', () => {
        expect(PREDEFINED_ROLES.chef.permissions.analytics_view).toBe(false);
        expect(PREDEFINED_ROLES.chef.permissions.staff_manage).toBe(false);
        expect(PREDEFINED_ROLES.chef.permissions.billing_manage).toBe(false);
        expect(PREDEFINED_ROLES.chef.permissions.settings_manage).toBe(false);
      });
    });

    describe('waiter role', () => {
      it('should have view permissions', () => {
        expect(PREDEFINED_ROLES.waiter.permissions.menu_view).toBe(true);
        expect(PREDEFINED_ROLES.waiter.permissions.orders_view).toBe(true);
      });

      it('should have orders_manage', () => {
        expect(PREDEFINED_ROLES.waiter.permissions.orders_manage).toBe(true);
      });

      it('should not have menu_edit', () => {
        expect(PREDEFINED_ROLES.waiter.permissions.menu_edit).toBe(false);
      });

      it('should not have management permissions', () => {
        expect(PREDEFINED_ROLES.waiter.permissions.analytics_view).toBe(false);
        expect(PREDEFINED_ROLES.waiter.permissions.staff_manage).toBe(false);
      });
    });

    describe('viewer role', () => {
      it('should have view-only permissions', () => {
        expect(PREDEFINED_ROLES.viewer.permissions.menu_view).toBe(true);
        expect(PREDEFINED_ROLES.viewer.permissions.orders_view).toBe(true);
        expect(PREDEFINED_ROLES.viewer.permissions.analytics_view).toBe(true);
      });

      it('should not have edit permissions', () => {
        expect(PREDEFINED_ROLES.viewer.permissions.menu_edit).toBe(false);
        expect(PREDEFINED_ROLES.viewer.permissions.orders_manage).toBe(false);
        expect(PREDEFINED_ROLES.viewer.permissions.staff_manage).toBe(false);
        expect(PREDEFINED_ROLES.viewer.permissions.billing_manage).toBe(false);
        expect(PREDEFINED_ROLES.viewer.permissions.settings_manage).toBe(false);
      });
    });
  });

  // ==========================================================================
  // mapToStaffMember Tests
  // ==========================================================================

  describe('mapToStaffMember', () => {
    it('should transform snake_case to camelCase', () => {
      const raw = {
        role_id: 'role-123',
        account_id: 'account-123',
        email: 'test@example.com',
        first_name: 'Mario',
        last_name: 'Rossi',
        display_name: 'Mario R.',
        avatar_url: 'https://example.com/avatar.jpg',
        permissions: { menu_view: true },
        is_active: true,
        invited_at: '2026-01-14T10:00:00Z',
        accepted_at: '2026-01-14T11:00:00Z',
        last_login_at: '2026-01-14T12:00:00Z',
        inviter_email: 'owner@example.com',
        inviter_name: 'Owner',
      };

      const result = mapToStaffMember(raw);

      expect(result.roleId).toBe('role-123');
      expect(result.accountId).toBe('account-123');
      expect(result.email).toBe('test@example.com');
      expect(result.firstName).toBe('Mario');
      expect(result.lastName).toBe('Rossi');
      expect(result.displayName).toBe('Mario R.');
      expect(result.avatarUrl).toBe('https://example.com/avatar.jpg');
      expect(result.permissions).toEqual({ menu_view: true });
      expect(result.isActive).toBe(true);
      expect(result.invitedAt).toBe('2026-01-14T10:00:00Z');
      expect(result.acceptedAt).toBe('2026-01-14T11:00:00Z');
      expect(result.lastLoginAt).toBe('2026-01-14T12:00:00Z');
      expect(result.inviterEmail).toBe('owner@example.com');
      expect(result.inviterName).toBe('Owner');
    });

    it('should handle null permissions', () => {
      const raw = {
        role_id: 'role-123',
        account_id: 'account-123',
        email: 'test@example.com',
        permissions: null,
        is_active: true,
      };

      const result = mapToStaffMember(raw);
      expect(result.permissions).toEqual({});
    });

    it('should handle undefined optional fields', () => {
      const raw = {
        role_id: 'role-123',
        account_id: 'account-123',
        email: 'test@example.com',
        permissions: {},
        is_active: false,
      };

      const result = mapToStaffMember(raw);
      expect(result.firstName).toBeUndefined();
      expect(result.lastName).toBeUndefined();
      expect(result.displayName).toBeUndefined();
      expect(result.avatarUrl).toBeUndefined();
      expect(result.invitedAt).toBeUndefined();
      expect(result.acceptedAt).toBeUndefined();
      expect(result.lastLoginAt).toBeUndefined();
    });
  });

  // ==========================================================================
  // mapToStaffInvitation Tests
  // ==========================================================================

  describe('mapToStaffInvitation', () => {
    it('should transform snake_case to camelCase', () => {
      const raw = {
        id: 'inv-123',
        email: 'newstaff@example.com',
        first_name: 'Luigi',
        last_name: 'Verdi',
        role_title: 'chef',
        permissions: { menu_view: true, menu_edit: true },
        status: 'pending',
        created_at: '2026-01-14T10:00:00Z',
        expires_at: '2026-01-21T10:00:00Z',
        message: 'Welcome!',
        inviter_email: 'owner@example.com',
        inviter_name: 'Owner',
      };

      const result = mapToStaffInvitation(raw);

      expect(result.id).toBe('inv-123');
      expect(result.email).toBe('newstaff@example.com');
      expect(result.firstName).toBe('Luigi');
      expect(result.lastName).toBe('Verdi');
      expect(result.roleTitle).toBe('chef');
      expect(result.permissions).toEqual({ menu_view: true, menu_edit: true });
      expect(result.status).toBe('pending');
      expect(result.createdAt).toBe('2026-01-14T10:00:00Z');
      expect(result.expiresAt).toBe('2026-01-21T10:00:00Z');
      expect(result.message).toBe('Welcome!');
      expect(result.inviterEmail).toBe('owner@example.com');
      expect(result.inviterName).toBe('Owner');
    });

    it('should handle null permissions', () => {
      const raw = {
        id: 'inv-123',
        email: 'test@example.com',
        role_title: 'staff',
        permissions: null,
        status: 'pending',
        created_at: '2026-01-14T10:00:00Z',
        expires_at: '2026-01-21T10:00:00Z',
        inviter_email: 'owner@example.com',
      };

      const result = mapToStaffInvitation(raw);
      expect(result.permissions).toEqual({});
    });

    it('should handle undefined optional fields', () => {
      const raw = {
        id: 'inv-123',
        email: 'test@example.com',
        role_title: 'staff',
        permissions: {},
        status: 'pending',
        created_at: '2026-01-14T10:00:00Z',
        expires_at: '2026-01-21T10:00:00Z',
        inviter_email: 'owner@example.com',
      };

      const result = mapToStaffInvitation(raw);
      expect(result.firstName).toBeUndefined();
      expect(result.lastName).toBeUndefined();
      expect(result.message).toBeUndefined();
      expect(result.inviterName).toBeUndefined();
    });
  });

  // ==========================================================================
  // mapToRoleTemplate Tests
  // ==========================================================================

  describe('mapToRoleTemplate', () => {
    it('should transform to RoleTemplate', () => {
      const raw = {
        id: 'template-123',
        name: 'Manager',
        description: 'Can manage staff',
        permissions: { staff_manage: true },
      };

      const result = mapToRoleTemplate(raw);

      expect(result.id).toBe('template-123');
      expect(result.name).toBe('Manager');
      expect(result.description).toBe('Can manage staff');
      expect(result.permissions).toEqual({ staff_manage: true });
    });
  });

  // ==========================================================================
  // getRoleIcon Tests
  // ==========================================================================

  describe('getRoleIcon', () => {
    it('should return correct icon for owner', () => {
      expect(getRoleIcon('owner')).toBe('👑');
    });

    it('should return correct icon for manager', () => {
      expect(getRoleIcon('manager')).toBe('💼');
    });

    it('should return correct icon for chef', () => {
      expect(getRoleIcon('chef')).toBe('👨‍🍳');
    });

    it('should return correct icon for waiter', () => {
      expect(getRoleIcon('waiter')).toBe('🍽️');
    });

    it('should return correct icon for viewer', () => {
      expect(getRoleIcon('viewer')).toBe('👁️');
    });

    it('should return correct icon for staff', () => {
      expect(getRoleIcon('staff')).toBe('👤');
    });

    it('should be case-insensitive', () => {
      expect(getRoleIcon('OWNER')).toBe('👑');
      expect(getRoleIcon('Manager')).toBe('💼');
      expect(getRoleIcon('CHEF')).toBe('👨‍🍳');
    });

    it('should return default icon for unknown roles', () => {
      expect(getRoleIcon('unknown')).toBe('👤');
      expect(getRoleIcon('custom_role')).toBe('👤');
      expect(getRoleIcon('')).toBe('👤');
    });
  });

  // ==========================================================================
  // isValidEmail Tests
  // ==========================================================================

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.com')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
      expect(isValidEmail('user@subdomain.domain.com')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test@.com')).toBe(false);
      expect(isValidEmail('test @example.com')).toBe(false);
    });
  });

  // ==========================================================================
  // isValidUUID Tests
  // ==========================================================================

  describe('isValidUUID', () => {
    it('should validate correct UUID formats', () => {
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(isValidUUID('00000000-0000-0000-0000-000000000000')).toBe(true);
      expect(isValidUUID('ffffffff-ffff-ffff-ffff-ffffffffffff')).toBe(true);
    });

    it('should be case-insensitive', () => {
      expect(isValidUUID('123E4567-E89B-12D3-A456-426614174000')).toBe(true);
      expect(isValidUUID('123e4567-E89B-12d3-A456-426614174000')).toBe(true);
    });

    it('should reject invalid UUID formats', () => {
      expect(isValidUUID('')).toBe(false);
      expect(isValidUUID('invalid')).toBe(false);
      expect(isValidUUID('123e4567-e89b-12d3-a456')).toBe(false);
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000-extra')).toBe(false);
      expect(isValidUUID('123e4567e89b12d3a456426614174000')).toBe(false);
      expect(isValidUUID('gggggggg-gggg-gggg-gggg-gggggggggggg')).toBe(false);
    });
  });

  // ==========================================================================
  // isInvitationExpired Tests
  // ==========================================================================

  describe('isInvitationExpired', () => {
    it('should return true for past dates', () => {
      expect(isInvitationExpired('2020-01-01T00:00:00Z')).toBe(true);
      expect(isInvitationExpired('2025-01-01T00:00:00Z')).toBe(true);
    });

    it('should return false for future dates', () => {
      expect(isInvitationExpired('2030-01-01T00:00:00Z')).toBe(false);
      expect(isInvitationExpired('2099-12-31T23:59:59Z')).toBe(false);
    });
  });

  // ==========================================================================
  // calculateExpiryDate Tests
  // ==========================================================================

  describe('calculateExpiryDate', () => {
    it('should return a date 7 days in the future', () => {
      const now = new Date();
      const expiry = calculateExpiryDate();
      const diffDays = Math.round((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(7);
    });

    it('should return a Date object', () => {
      const expiry = calculateExpiryDate();
      expect(expiry).toBeInstanceOf(Date);
    });
  });

  // ==========================================================================
  // formatExpiryDate Tests
  // ==========================================================================

  describe('formatExpiryDate', () => {
    it('should format date in Italian locale', () => {
      const date = new Date('2026-01-21T10:00:00Z');
      const formatted = formatExpiryDate(date);
      expect(formatted).toContain('2026');
      expect(formatted).toContain('21');
    });

    it('should include month name', () => {
      const date = new Date('2026-01-21T10:00:00Z');
      const formatted = formatExpiryDate(date);
      // Italian month name for January
      expect(formatted.toLowerCase()).toContain('gennaio');
    });
  });

  // ==========================================================================
  // buildInviteUrl Tests
  // ==========================================================================

  describe('buildInviteUrl', () => {
    it('should build correct URL', () => {
      const url = buildInviteUrl('https://example.com', 'abc123');
      expect(url).toBe('https://example.com/invite?token=abc123');
    });

    it('should handle different base URLs', () => {
      const url1 = buildInviteUrl('https://gudbro.com', 'token1');
      expect(url1).toBe('https://gudbro.com/invite?token=token1');

      const url2 = buildInviteUrl('http://localhost:3000', 'token2');
      expect(url2).toBe('http://localhost:3000/invite?token=token2');
    });

    it('should preserve token characters', () => {
      const url = buildInviteUrl('https://example.com', 'abc-123_XYZ');
      expect(url).toContain('abc-123_XYZ');
    });
  });

  // ==========================================================================
  // getDisplayName Tests
  // ==========================================================================

  describe('getDisplayName', () => {
    it('should return displayName if present', () => {
      const member: StaffMember = {
        roleId: 'role-123',
        accountId: 'account-123',
        email: 'test@example.com',
        firstName: 'Mario',
        lastName: 'Rossi',
        displayName: 'SuperMario',
        permissions: {},
        isActive: true,
      };

      expect(getDisplayName(member)).toBe('SuperMario');
    });

    it('should return full name if no displayName', () => {
      const member: StaffMember = {
        roleId: 'role-123',
        accountId: 'account-123',
        email: 'test@example.com',
        firstName: 'Mario',
        lastName: 'Rossi',
        permissions: {},
        isActive: true,
      };

      expect(getDisplayName(member)).toBe('Mario Rossi');
    });

    it('should return firstName if only firstName present', () => {
      const member: StaffMember = {
        roleId: 'role-123',
        accountId: 'account-123',
        email: 'test@example.com',
        firstName: 'Mario',
        permissions: {},
        isActive: true,
      };

      expect(getDisplayName(member)).toBe('Mario');
    });

    it('should return email as fallback', () => {
      const member: StaffMember = {
        roleId: 'role-123',
        accountId: 'account-123',
        email: 'test@example.com',
        permissions: {},
        isActive: true,
      };

      expect(getDisplayName(member)).toBe('test@example.com');
    });
  });

  // ==========================================================================
  // hasPermission Tests
  // ==========================================================================

  describe('hasPermission', () => {
    it('should return true for enabled permissions', () => {
      const permissions = { menu_view: true, menu_edit: true };
      expect(hasPermission(permissions, 'menu_view')).toBe(true);
      expect(hasPermission(permissions, 'menu_edit')).toBe(true);
    });

    it('should return false for disabled permissions', () => {
      const permissions = { menu_view: true, menu_edit: false };
      expect(hasPermission(permissions, 'menu_edit')).toBe(false);
    });

    it('should return false for missing permissions', () => {
      const permissions = { menu_view: true };
      expect(hasPermission(permissions, 'staff_manage')).toBe(false);
    });

    it('should return false for empty permissions', () => {
      const permissions = {};
      expect(hasPermission(permissions, 'menu_view')).toBe(false);
    });
  });

  // ==========================================================================
  // countActivePermissions Tests
  // ==========================================================================

  describe('countActivePermissions', () => {
    it('should count enabled permissions', () => {
      const permissions = {
        menu_view: true,
        menu_edit: true,
        orders_view: false,
        orders_manage: true,
      };
      expect(countActivePermissions(permissions)).toBe(3);
    });

    it('should return 0 for all disabled', () => {
      const permissions = {
        menu_view: false,
        menu_edit: false,
      };
      expect(countActivePermissions(permissions)).toBe(0);
    });

    it('should return 0 for empty permissions', () => {
      expect(countActivePermissions({})).toBe(0);
    });

    it('should count all for full permissions', () => {
      const permissions = {
        menu_view: true,
        menu_edit: true,
        orders_view: true,
        orders_manage: true,
        analytics_view: true,
        staff_manage: true,
        billing_manage: true,
        settings_manage: true,
      };
      expect(countActivePermissions(permissions)).toBe(8);
    });
  });

  // ==========================================================================
  // Role Hierarchy Tests
  // ==========================================================================

  describe('Role Hierarchy', () => {
    it('should have owner with most permissions', () => {
      const ownerCount = countActivePermissions(PREDEFINED_ROLES.owner.permissions);
      const managerCount = countActivePermissions(PREDEFINED_ROLES.manager.permissions);
      const chefCount = countActivePermissions(PREDEFINED_ROLES.chef.permissions);
      const waiterCount = countActivePermissions(PREDEFINED_ROLES.waiter.permissions);
      const viewerCount = countActivePermissions(PREDEFINED_ROLES.viewer.permissions);

      expect(ownerCount).toBeGreaterThan(managerCount);
      expect(managerCount).toBeGreaterThan(chefCount);
      expect(chefCount).toBeGreaterThan(waiterCount);
      expect(waiterCount).toBeGreaterThanOrEqual(viewerCount);
    });

    it('should have owner with all permissions', () => {
      expect(countActivePermissions(PREDEFINED_ROLES.owner.permissions)).toBe(8);
    });

    it('should have viewer with only view permissions', () => {
      const viewerPerms = PREDEFINED_ROLES.viewer.permissions;
      expect(viewerPerms.menu_view).toBe(true);
      expect(viewerPerms.orders_view).toBe(true);
      expect(viewerPerms.analytics_view).toBe(true);
      expect(viewerPerms.menu_edit).toBe(false);
      expect(viewerPerms.orders_manage).toBe(false);
    });
  });

  // ==========================================================================
  // Email Template Tests
  // ==========================================================================

  describe('Email Template Elements', () => {
    it('should have appropriate role icons for all defined roles', () => {
      const definedRoles = Object.keys(PREDEFINED_ROLES);
      definedRoles.forEach((role) => {
        const icon = getRoleIcon(role);
        expect(icon).toBeDefined();
        expect(icon.length).toBeGreaterThan(0);
      });
    });

    it('should format expiry dates correctly', () => {
      const testDates = [
        new Date('2026-01-21T10:00:00Z'),
        new Date('2026-06-15T14:30:00Z'),
        new Date('2026-12-25T00:00:00Z'),
      ];

      testDates.forEach((date) => {
        const formatted = formatExpiryDate(date);
        expect(formatted).toContain(date.getFullYear().toString());
      });
    });
  });

  // ==========================================================================
  // Data Integrity Tests
  // ==========================================================================

  describe('Data Integrity', () => {
    it('should have consistent permission keys across labels and roles', () => {
      const labelKeys = Object.keys(PERMISSION_LABELS);
      const ownerPermKeys = Object.keys(PREDEFINED_ROLES.owner.permissions);

      // All owner permissions should have labels
      ownerPermKeys.forEach((key) => {
        expect(labelKeys).toContain(key);
      });
    });

    it('should have all statuses as valid InvitationStatus', () => {
      INVITATION_STATUSES.forEach((status) => {
        const invitation: StaffInvitation = {
          id: 'test',
          email: 'test@example.com',
          roleTitle: 'staff',
          permissions: {},
          status,
          createdAt: '2026-01-14T10:00:00Z',
          expiresAt: '2026-01-21T10:00:00Z',
          inviterEmail: 'owner@example.com',
        };
        expect(invitation.status).toBe(status);
      });
    });

    it('should have matching icons for all predefined roles', () => {
      Object.keys(PREDEFINED_ROLES).forEach((role) => {
        expect(ROLE_ICONS[role]).toBeDefined();
      });
    });
  });

  // ==========================================================================
  // Edge Cases Tests
  // ==========================================================================

  describe('Edge Cases', () => {
    it('should handle staff member with empty email', () => {
      const member: StaffMember = {
        roleId: 'role-123',
        accountId: 'account-123',
        email: '',
        permissions: {},
        isActive: true,
      };

      expect(getDisplayName(member)).toBe('');
    });

    it('should handle invitation with very long message', () => {
      const longMessage = 'A'.repeat(1000);
      const invitation: StaffInvitation = {
        id: 'test',
        email: 'test@example.com',
        roleTitle: 'staff',
        permissions: {},
        status: 'pending',
        createdAt: '2026-01-14T10:00:00Z',
        expiresAt: '2026-01-21T10:00:00Z',
        inviterEmail: 'owner@example.com',
        message: longMessage,
      };

      expect(invitation.message?.length).toBe(1000);
    });

    it('should handle permissions with many custom keys', () => {
      const permissions: Record<string, boolean> = {};
      for (let i = 0; i < 50; i++) {
        permissions[`custom_permission_${i}`] = i % 2 === 0;
      }

      expect(countActivePermissions(permissions)).toBe(25);
    });

    it('should handle URL building with special characters in token', () => {
      // Though tokens shouldn't have these, testing robustness
      const url = buildInviteUrl('https://example.com', 'token-with_special.chars');
      expect(url).toContain('token-with_special.chars');
    });
  });

  // ==========================================================================
  // Validation Pattern Tests
  // ==========================================================================

  describe('Validation Patterns', () => {
    it('should validate real-world email patterns', () => {
      const validEmails = [
        'simple@example.com',
        'very.common@example.com',
        'disposable.style.email.with+symbol@example.com',
        'other.email-with-hyphen@example.com',
        'fully-qualified-domain@example.com',
        'user.name+tag+sorting@example.com',
        'x@example.com',
        'example-indeed@strange-example.com',
      ];

      validEmails.forEach((email) => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    it('should reject invalid real-world email patterns', () => {
      // Note: Simple regex only catches obvious invalid patterns
      // More complex invalid emails may pass simple validation
      const invalidEmails = [
        '',
        'plaintext',
        '@nodomain.com',
        'missing@.com',
        'spaces in@email.com',
        'double@@at.com',
      ];

      invalidEmails.forEach((email) => {
        expect(isValidEmail(email)).toBe(false);
      });
    });

    it('should validate standard UUID v4 format', () => {
      const validUUIDs = [
        '550e8400-e29b-41d4-a716-446655440000',
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
      ];

      validUUIDs.forEach((uuid) => {
        expect(isValidUUID(uuid)).toBe(true);
      });
    });
  });
});
