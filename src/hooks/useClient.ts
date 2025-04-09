import useStore from '../store/store';

export const useClient = (clientId: string) => {
  const store = useStore();
  
  return {
    client: store.getClientById(clientId),
    activities: store.getRecentActivities(clientId),
    diagnostics: store.diagnostics[clientId],
    updateDiagnostic: (data: any) => store.updateDiagnostic(clientId, data),
    addActivity: (activity: any) => store.addActivity(clientId, activity),
  };
};