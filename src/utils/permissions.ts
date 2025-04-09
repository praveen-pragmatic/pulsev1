// Permission utilities
import { User, UserRole } from '../types';

export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_CLIENTS: 'manage_clients',
  MANAGE_PARTNERS: 'manage_partners',
  VIEW_REPORTS: 'view_reports',
  EDIT_SETTINGS: 'edit_settings',
  ADMIN_ACCESS: 'admin_access'
} as const;

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: Object.values(PERMISSIONS),
  senior_consultant: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_CLIENTS,
    PERMISSIONS.VIEW_REPORTS
  ],
  junior_analyst: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_REPORTS
  ],
  client: [
    PERMISSIONS.VIEW_DASHBOARD
  ]
};

export const hasPermission = (user: User, permission: string): boolean => {
  if (user.role === 'admin') return true;
  return ROLE_PERMISSIONS[user.role].includes(permission);
};

export const canAccessRoute = (user: User, route: string): boolean => {
  // Add route-specific permission checks
  return true;
};