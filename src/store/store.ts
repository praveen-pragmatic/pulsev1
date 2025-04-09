import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  createActivitySlice,
  createClientSlice, 
  createDiagnosticSlice,
  createSettingsSlice,
  createUISlice,
  createSubscriptionSlice
} from './slices';

const useStore = create(
  persist(
    (set, get) => ({
      ...createActivitySlice(set, get),
      ...createClientSlice(set, get),
      ...createDiagnosticSlice(set, get),
      ...createSettingsSlice(set, get),
      ...createUISlice(set, get),
      ...createSubscriptionSlice(set, get)
    }),
    {
      name: 'jarvis-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        clientSubscriptions: state.clientSubscriptions,
        uploadedFiles: state.uploadedFiles,
        transformItems: state.transformItems,
        optimizeItems: state.optimizeItems, 
        selectedClient: state.selectedClient,
        adminRfps: state.adminRfps || []
      })
    }
  )
);

export default useStore;