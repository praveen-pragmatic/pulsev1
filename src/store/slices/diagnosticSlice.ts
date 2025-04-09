import { StateCreator } from 'zustand';
import { StoreState, DiagnosticData } from '../../types';

export interface DiagnosticSlice {
  diagnostics: Record<string, DiagnosticData>;
  diagnosticProjects: DiagnosticData[];
  updateDiagnostic: (clientId: string, data: Partial<DiagnosticData>) => void;
}

export const createDiagnosticSlice: StateCreator<
  StoreState,
  [],
  [],
  DiagnosticSlice
> = (set, get) => ({
  diagnostics: {},
  diagnosticProjects: [],
  updateDiagnostic: (clientId, data) => 
    set((state) => ({
      diagnostics: {
        ...state.diagnostics,
        [clientId]: { ...state.diagnostics[clientId], ...data }
      }
    })),
});