import { StateCreator } from 'zustand';
import { StoreState, Activity } from '../../types';

export interface ActivitySlice {
  activities: Record<string, Activity[]>;
  addActivity: (clientId: string, activity: Activity) => void;
  getRecentActivities: (clientId: string) => Activity[];
}

export const createActivitySlice: StateCreator<
  StoreState,
  [],
  [],
  ActivitySlice
> = (set, get) => ({
  activities: {},
  addActivity: (clientId, activity) =>
    set((state) => ({
      activities: {
        ...state.activities,
        [clientId]: [activity, ...(state.activities[clientId] || [])]
      }
    })),
  getRecentActivities: (clientId) => {
    const client = get().getClientById(clientId);
    if (!client) return [];
    return [
      {
        type: 'document',
        icon: 'upload',
        iconBg: 'bg-blue-100',
        message: `${client.metrics?.completedActions || 0} diagnostic actions completed`,
        timestamp: '2 hours ago'
      },
      {
        type: 'analysis',
        icon: 'chart',
        iconBg: 'bg-green-100',
        message: `${client.metrics?.pendingActions || 0} actions pending completion`,
        timestamp: '1 day ago'
      },
      {
        type: 'response',
        icon: 'users',
        iconBg: 'bg-purple-100',
        message: `Diagnostic progress: ${client.metrics?.diagnosticProgress || 0}% complete`,
        timestamp: '3 days ago'
      }
    ];
  },
});