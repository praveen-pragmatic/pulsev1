import { StateCreator } from 'zustand';
import { RfpService } from '../../services/db/RfpService';
import { StoreState, RfpData, RfpStatus } from '../../types';

const rfpService = RfpService.getInstance();

export interface RfpSlice {
  rfps: RfpData[];
  adminRfps: RfpData[];
  partnerRfps: Record<string, string[]>;
  bids: Record<string, any[]>;
  
  setAdminRfps: (rfps: RfpData[]) => void;
  addAdminRfp: (rfp: RfpData) => Promise<void>;
  updateAdminRfp: (rfpId: string, updates: Partial<RfpData>) => Promise<void>;
  assignRfpToPartner: (rfpId: string, partnerId: string) => void;
  submitBid: (rfpId: string, bid: any) => void;
  clearStore: () => Promise<void>;
}

export const createRfpSlice: StateCreator<
  StoreState,
  [],
  [],
  RfpSlice
> = (set, get) => ({
  rfps: [],
  adminRfps: [],
  partnerRfps: {},
  bids: {},

  setAdminRfps: (rfps) => set({ adminRfps: rfps }),

  addAdminRfp: async (rfp) => {
    const newRfp = {
      ...rfp,
      assignedPartners: rfp.assignedPartners || [],
      status: rfp.status || 'new',
      createdAt: rfp.createdAt || new Date().toISOString(),
      visibleToAdmin: true,
      bidDetails: rfp.bidDetails || null,
      version: 1,
      lastModified: new Date().toISOString()
    };

    await rfpService.add(newRfp);

    set((state) => ({ 
      adminRfps: [...state.adminRfps, newRfp],
      rfps: [...state.rfps, newRfp]
    }));
  },

  updateAdminRfp: async (rfpId, updates) => {
    const updatedRfp = await rfpService.update(rfpId, updates);

    set((state) => ({
      adminRfps: state.adminRfps.map(rfp => 
        rfp.rfpId === rfpId ? updatedRfp : rfp
      ),
      rfps: state.rfps.map(rfp =>
        rfp.rfpId === rfpId ? updatedRfp : rfp
      )
    }));
  },

  assignRfpToPartner: (rfpId, partnerId) => {
    set((state) => {
      const rfp = state.adminRfps.find(r => r.rfpId === rfpId);
      if (!rfp) return state;

      const updatedRfps = state.adminRfps.map(r => 
        r.rfpId === rfpId 
          ? { 
              ...r, 
              assignedPartners: [...(r.assignedPartners || []), partnerId]
            } 
          : r
      );

      return {
        adminRfps: updatedRfps,
        partnerRfps: {
          ...state.partnerRfps,
          [partnerId]: [...(state.partnerRfps[partnerId] || []), rfp.rfpId]
        }
      };
    });
  },

  submitBid: (rfpId, bid) => {
    set((state) => ({
      bids: {
        ...state.bids,
        [rfpId]: [...(state.bids[rfpId] || []), {
          id: Date.now(),
          status: 'submitted',
          submittedAt: new Date().toISOString(),
          ...bid
        }]
      }
    }));
  },

  clearStore: async () => {
    await rfpService.clearAll();
    set({
      rfps: [],
      adminRfps: [],
      partnerRfps: {},
      bids: {}
    });
  }
});