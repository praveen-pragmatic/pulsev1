import { StateCreator } from 'zustand';
import { StoreState } from '../../types';

export interface SettingsSlice {
  settingsMenu: {
    isOpen: boolean;
    activeSection: string | null;
  };
  openSettings: () => void;
  closeSettings: () => void;
  setActiveSection: (section: string | null) => void;
}

export const createSettingsSlice: StateCreator<
  StoreState,
  [],
  [],
  SettingsSlice
> = (set) => ({
  settingsMenu: {
    isOpen: false,
    activeSection: null,
  },
  openSettings: () => set((state) => ({
    settingsMenu: {
      ...state.settingsMenu,
      isOpen: true,
    }
  })),
  closeSettings: () => set((state) => ({
    settingsMenu: {
      ...state.settingsMenu,
      isOpen: false,
      activeSection: null,
    }
  })),
  setActiveSection: (section) => set((state) => ({
    settingsMenu: {
      ...state.settingsMenu,
      activeSection: section,
    }
  })),
});