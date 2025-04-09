import { StateCreator } from 'zustand';
import { StoreState, ModalState } from '../../types';

export interface UISlice {
  modals: ModalState;
  toggleModal: (modalName: keyof ModalState) => void;
  clearStore: () => void;
}

export const createUISlice: StateCreator<
  StoreState,
  [],
  [],
  UISlice
> = (set) => ({
  modals: {
    ekyc: false,
    partner: false,
    settings: false,
    profile: false
  },
  toggleModal: (modalName) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: !state.modals[modalName]
      }
    })),
  clearStore: () => set({
    modals: {
      ekyc: false,
      partner: false,
      settings: false,
      profile: false
    }
  }),
});