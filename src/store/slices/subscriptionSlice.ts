import { StateCreator } from 'zustand';
import { StoreState } from '../../types';

export interface SubscriptionTier {
  name: 'Freemium' | 'Professional' | 'Enterprise';
  price: string;
  features: string[];
  limits: {
    users: number;
    storage: number;
    apiCalls: number;
  };
}

export interface SubscriptionState {
  tiers: Record<string, SubscriptionTier>;
  clientSubscriptions: Record<string, string>; // clientId -> tierName
  updateSubscription: (clientId: string, tierName: string) => void;
  getTierDetails: (tierName: string) => SubscriptionTier | null;
}

const defaultTiers: Record<string, SubscriptionTier> = {
  Freemium: {
    name: 'Freemium',
    price: '₹1.5L',
    features: [
      'Basic diagnostic tools',
      'Limited data ingestion',
      'Standard reports',
      'Email support'
    ],
    limits: {
      users: 5,
      storage: 5, // GB
      apiCalls: 1000 // per month
    }
  },
  Professional: {
    name: 'Professional',
    price: '₹3.0L',
    features: [
      'Advanced diagnostics',
      'Unlimited data sources',
      'Custom reports',
      'Priority support',
      'API access'
    ],
    limits: {
      users: 20,
      storage: 50,
      apiCalls: 10000
    }
  },
  Enterprise: {
    name: 'Enterprise',
    price: '₹12.0L',
    features: [
      'Full platform access',
      'Dedicated support team',
      'Custom integrations',
      'White-label options',
      'SLA guarantees'
    ],
    limits: {
      users: -1, // unlimited
      storage: 500,
      apiCalls: -1 // unlimited
    }
  }
};

export const createSubscriptionSlice: StateCreator<
  StoreState,
  [],
  [],
  SubscriptionState
> = (set, get) => ({
  tiers: defaultTiers,
  clientSubscriptions: {},
  
  updateSubscription: (clientId, tierName) => 
    set((state) => ({
      clientSubscriptions: {
        ...state.clientSubscriptions,
        [clientId]: tierName
      }
    })),
    
  getTierDetails: (tierName) => {
    const state = get();
    return state.tiers[tierName] || null;
  }
});