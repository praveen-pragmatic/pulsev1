import { useAuth } from './useAuth';
import { hasPermission, canAccessRoute } from '../utils/permissions';

export const usePermissions = () => {
  const { currentUser } = useAuth();
  
  return {
    hasPermission: (permission: string) => hasPermission(currentUser, permission),
    canAccessRoute: (route: string) => canAccessRoute(currentUser, route),
    isAdmin: currentUser?.role === 'admin',
    isConsultant: currentUser?.role === 'senior_consultant',
    isAnalyst: currentUser?.role === 'junior_analyst',
    isClient: currentUser?.role === 'client'
  };
};