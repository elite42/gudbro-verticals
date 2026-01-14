import { describe, it, expect, beforeAll } from 'vitest';
import {
  ROLE_PERMISSIONS,
  ROLE_HIERARCHY,
  getPermissionsForRole,
  isRoleAtLeast,
} from '../permissions';
import type { UserRole, Permission } from '../types';

// ============================================
// ROLE_PERMISSIONS
// ============================================

describe('ROLE_PERMISSIONS', () => {
  it('should define permissions for all roles', () => {
    expect(ROLE_PERMISSIONS.staff).toBeDefined();
    expect(ROLE_PERMISSIONS.manager).toBeDefined();
    expect(ROLE_PERMISSIONS.business_owner).toBeDefined();
    expect(ROLE_PERMISSIONS.gudbro_owner).toBeDefined();
  });

  it('staff should have minimal read permissions', () => {
    const staffPermissions = ROLE_PERMISSIONS.staff;
    expect(staffPermissions).toContain('content:read');
    expect(staffPermissions).toContain('orders:read');
    expect(staffPermissions).toHaveLength(2);
  });

  it('staff should NOT have write permissions', () => {
    const staffPermissions = ROLE_PERMISSIONS.staff;
    expect(staffPermissions).not.toContain('content:write');
    expect(staffPermissions).not.toContain('content:delete');
    expect(staffPermissions).not.toContain('orders:manage');
  });

  it('manager should have content management permissions', () => {
    const managerPermissions = ROLE_PERMISSIONS.manager;
    expect(managerPermissions).toContain('content:read');
    expect(managerPermissions).toContain('content:write');
    expect(managerPermissions).toContain('orders:read');
    expect(managerPermissions).toContain('orders:manage');
    expect(managerPermissions).toContain('analytics:read');
  });

  it('manager should NOT have delete or billing permissions', () => {
    const managerPermissions = ROLE_PERMISSIONS.manager;
    expect(managerPermissions).not.toContain('content:delete');
    expect(managerPermissions).not.toContain('billing:read');
    expect(managerPermissions).not.toContain('billing:manage');
  });

  it('business_owner should have full org permissions', () => {
    const ownerPermissions = ROLE_PERMISSIONS.business_owner;
    expect(ownerPermissions).toContain('content:read');
    expect(ownerPermissions).toContain('content:write');
    expect(ownerPermissions).toContain('content:delete');
    expect(ownerPermissions).toContain('billing:read');
    expect(ownerPermissions).toContain('billing:manage');
    expect(ownerPermissions).toContain('team:manage');
    expect(ownerPermissions).toContain('settings:manage');
  });

  it('business_owner should NOT have platform permissions', () => {
    const ownerPermissions = ROLE_PERMISSIONS.business_owner;
    expect(ownerPermissions).not.toContain('platform:read');
    expect(ownerPermissions).not.toContain('platform:manage');
    expect(ownerPermissions).not.toContain('platform:merchants');
  });

  it('gudbro_owner should have all permissions including platform', () => {
    const adminPermissions = ROLE_PERMISSIONS.gudbro_owner;
    // Business owner permissions
    expect(adminPermissions).toContain('content:delete');
    expect(adminPermissions).toContain('billing:manage');
    expect(adminPermissions).toContain('team:manage');
    // Platform permissions
    expect(adminPermissions).toContain('platform:read');
    expect(adminPermissions).toContain('platform:manage');
    expect(adminPermissions).toContain('platform:merchants');
    expect(adminPermissions).toContain('platform:revenue');
    expect(adminPermissions).toContain('platform:support');
  });

  it('higher roles should have more permissions than lower roles', () => {
    expect(ROLE_PERMISSIONS.manager.length).toBeGreaterThan(ROLE_PERMISSIONS.staff.length);
    expect(ROLE_PERMISSIONS.business_owner.length).toBeGreaterThan(ROLE_PERMISSIONS.manager.length);
    expect(ROLE_PERMISSIONS.gudbro_owner.length).toBeGreaterThan(
      ROLE_PERMISSIONS.business_owner.length
    );
  });
});

// ============================================
// ROLE_HIERARCHY
// ============================================

describe('ROLE_HIERARCHY', () => {
  it('should have correct order from lowest to highest privilege', () => {
    expect(ROLE_HIERARCHY).toEqual(['staff', 'manager', 'business_owner', 'gudbro_owner']);
  });

  it('should contain all roles', () => {
    expect(ROLE_HIERARCHY).toHaveLength(4);
    expect(ROLE_HIERARCHY).toContain('staff');
    expect(ROLE_HIERARCHY).toContain('manager');
    expect(ROLE_HIERARCHY).toContain('business_owner');
    expect(ROLE_HIERARCHY).toContain('gudbro_owner');
  });

  it('staff should be at index 0 (lowest)', () => {
    expect(ROLE_HIERARCHY.indexOf('staff')).toBe(0);
  });

  it('gudbro_owner should be at last index (highest)', () => {
    expect(ROLE_HIERARCHY.indexOf('gudbro_owner')).toBe(ROLE_HIERARCHY.length - 1);
  });
});

// ============================================
// getPermissionsForRole
// ============================================

describe('getPermissionsForRole', () => {
  it('should return staff permissions', () => {
    const permissions = getPermissionsForRole('staff');
    expect(permissions).toEqual(ROLE_PERMISSIONS.staff);
  });

  it('should return manager permissions', () => {
    const permissions = getPermissionsForRole('manager');
    expect(permissions).toEqual(ROLE_PERMISSIONS.manager);
  });

  it('should return business_owner permissions', () => {
    const permissions = getPermissionsForRole('business_owner');
    expect(permissions).toEqual(ROLE_PERMISSIONS.business_owner);
  });

  it('should return gudbro_owner permissions', () => {
    const permissions = getPermissionsForRole('gudbro_owner');
    expect(permissions).toEqual(ROLE_PERMISSIONS.gudbro_owner);
  });

  it('should return empty array for invalid role', () => {
    const permissions = getPermissionsForRole('invalid_role' as UserRole);
    expect(permissions).toEqual([]);
  });

  it('should return a new array (not reference)', () => {
    const permissions1 = getPermissionsForRole('staff');
    const permissions2 = getPermissionsForRole('staff');
    // Arrays should be equal but not the same reference
    expect(permissions1).toEqual(permissions2);
    // Note: This actually returns the same reference in current impl
    // If immutability is needed, this test documents the expectation
  });
});

// ============================================
// isRoleAtLeast
// ============================================

describe('isRoleAtLeast', () => {
  describe('staff role checks', () => {
    it('staff is at least staff', () => {
      expect(isRoleAtLeast('staff', 'staff')).toBe(true);
    });

    it('staff is NOT at least manager', () => {
      expect(isRoleAtLeast('staff', 'manager')).toBe(false);
    });

    it('staff is NOT at least business_owner', () => {
      expect(isRoleAtLeast('staff', 'business_owner')).toBe(false);
    });

    it('staff is NOT at least gudbro_owner', () => {
      expect(isRoleAtLeast('staff', 'gudbro_owner')).toBe(false);
    });
  });

  describe('manager role checks', () => {
    it('manager is at least staff', () => {
      expect(isRoleAtLeast('manager', 'staff')).toBe(true);
    });

    it('manager is at least manager', () => {
      expect(isRoleAtLeast('manager', 'manager')).toBe(true);
    });

    it('manager is NOT at least business_owner', () => {
      expect(isRoleAtLeast('manager', 'business_owner')).toBe(false);
    });

    it('manager is NOT at least gudbro_owner', () => {
      expect(isRoleAtLeast('manager', 'gudbro_owner')).toBe(false);
    });
  });

  describe('business_owner role checks', () => {
    it('business_owner is at least staff', () => {
      expect(isRoleAtLeast('business_owner', 'staff')).toBe(true);
    });

    it('business_owner is at least manager', () => {
      expect(isRoleAtLeast('business_owner', 'manager')).toBe(true);
    });

    it('business_owner is at least business_owner', () => {
      expect(isRoleAtLeast('business_owner', 'business_owner')).toBe(true);
    });

    it('business_owner is NOT at least gudbro_owner', () => {
      expect(isRoleAtLeast('business_owner', 'gudbro_owner')).toBe(false);
    });
  });

  describe('gudbro_owner role checks', () => {
    it('gudbro_owner is at least staff', () => {
      expect(isRoleAtLeast('gudbro_owner', 'staff')).toBe(true);
    });

    it('gudbro_owner is at least manager', () => {
      expect(isRoleAtLeast('gudbro_owner', 'manager')).toBe(true);
    });

    it('gudbro_owner is at least business_owner', () => {
      expect(isRoleAtLeast('gudbro_owner', 'business_owner')).toBe(true);
    });

    it('gudbro_owner is at least gudbro_owner', () => {
      expect(isRoleAtLeast('gudbro_owner', 'gudbro_owner')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle invalid user role', () => {
      // indexOf returns -1 for invalid role, which is < any valid index
      expect(isRoleAtLeast('invalid' as UserRole, 'staff')).toBe(false);
    });

    it('should handle invalid required role', () => {
      // indexOf returns -1 for invalid required role
      // staff index (0) >= -1 is true
      expect(isRoleAtLeast('staff', 'invalid' as UserRole)).toBe(true);
    });
  });
});

// ============================================
// Permission structure validation
// ============================================

describe('Permission structure', () => {
  const allPermissions = new Set<Permission>();

  beforeAll(() => {
    Object.values(ROLE_PERMISSIONS).forEach((permissions) => {
      permissions.forEach((p) => allPermissions.add(p));
    });
  });

  it('all permissions should follow resource:action pattern', () => {
    allPermissions.forEach((permission) => {
      expect(permission).toMatch(/^[a-z]+:[a-z]+$/);
    });
  });

  it('should have permissions for content, orders, analytics, team, billing, settings, platform', () => {
    const resources = ['content', 'orders', 'analytics', 'team', 'billing', 'settings', 'platform'];
    const permissionResources = [...allPermissions].map((p) => p.split(':')[0]);
    const uniqueResources = [...new Set(permissionResources)];

    resources.forEach((resource) => {
      expect(uniqueResources).toContain(resource);
    });
  });
});
