// Permission utilities
export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_CLIENTS: 'manage_clients',
  MANAGE_PARTNERS: 'manage_partners',
  VIEW_REPORTS: 'view_reports',
  EDIT_SETTINGS: 'edit_settings',
  ADMIN_ACCESS: 'admin_access',
  VIEW_RFPS: 'view_rfps',
  SUBMIT_BIDS: 'submit_bids',
  VIEW_DOCUMENTS: 'view_documents'
};

export const ROLE_PERMISSIONS = {
  admin: Object.values(PERMISSIONS),
  senior_consultant: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_CLIENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_DOCUMENTS
  ],
  junior_consultant: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_DOCUMENTS
  ],
  client: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_DOCUMENTS
  ],
  partner: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_RFPS,
    PERMISSIONS.SUBMIT_BIDS,
    PERMISSIONS.VIEW_DOCUMENTS
  ]
};

export const hasPermission = (user, permission) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return ROLE_PERMISSIONS[user.role].includes(permission);
};

export const canAccessRoute = (user, route) => {
  if (!user) return false;
  
  // Partner-specific route restrictions
  if (user.role === 'partner') {
    const allowedRoutes = ['dashboard', 'rfps', 'profile'];
    return allowedRoutes.some(r => route.includes(r));
  }
  
  return true;
};