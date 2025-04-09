import { StateCreator } from 'zustand';
import { User, StoreState } from '../../types';

export interface ClientSlice {
  clients: User[];
  selectedClient: string | null;
  setSelectedClient: (client: string | null) => void;
  getClientById: (clientId: string) => User | undefined;
}

export const createClientSlice: StateCreator<
  StoreState,
  [],
  [],
  ClientSlice
> = (set, get) => ({
  clients: [],
  selectedClient: null,
  setSelectedClient: (client) => set({ selectedClient: client }),
  getClientById: (clientId) => get().clients.find(client => client.clientId === clientId),
});