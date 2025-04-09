import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { rfpDB, optimizeDB } from '../services/db';
import { generateRfpId, generateTransformMarkdown, generateCrmRequirements } from '../utils/exportTransform';

const useStore = create(
  persist(
    (set, get) => ({
      // Demo Mode state
      demoMode: false,
      toggleDemoMode: () => set(state => ({ demoMode: !state.demoMode })),
      
      // Subscription state
      clientSubscriptions: {},
      updateSubscription: (clientId, tierName) => set((state) => ({
        clientSubscriptions: {
          ...state.clientSubscriptions,
          [clientId]: tierName
        }
      })),
      
      // File upload state
      uploadedFiles: {}, // Client ID -> Array of files mapping
      addUploadedFile: (file, clientId) => set((state) => ({
        uploadedFiles: {
          ...state.uploadedFiles,
          [clientId]: [...(state.uploadedFiles[clientId] || []), {
            id: Date.now(),
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            status: 'uploaded'
          }]
        }
      })),
      
      // Transform and Optimize items state
      transformItems: {},
      optimizeItems: {},
      optimizeAssignments: {},
      
      addTransformItem: (clientId, item) => set((state) => {
        const clientItems = state.transformItems[clientId] || [];
        const requirementId = `REQ-${String(clientItems.length + 1).padStart(3, '0')}`;
        return {
          transformItems: {
            ...state.transformItems,
            [clientId]: [...clientItems, {
              ...item,
              requirementId,
              status: 'new',
              priority: item.severity === 'critical' ? 'high' : 
                       item.severity === 'high' ? 'medium' : 'low',
              createdAt: new Date().toISOString()
            }]
          }
        };
      }),
      
      addOptimizeItem: (clientId, item) => set((state) => {
        const clientItems = state.optimizeItems[clientId] || [];
        const newItem = {
          ...item,
          optimizeId: `OPT-${String(clientItems.length + 1).padStart(3, '0')}`,
          status: 'new',
          priority: item.severity === 'critical' ? 'high' : 
                   item.severity === 'high' ? 'medium' : 'low',
          createdAt: new Date().toISOString()
        };

        // Save to IndexedDB
        optimizeDB.saveItems(clientId, [...clientItems, newItem])
          .catch(console.error);

        return {
          optimizeItems: {
            ...state.optimizeItems, 
            [clientId]: [...clientItems, newItem]
          }
        };
      }),
      
      // Project Management state
      projects: [],
      tasks: {},
      milestones: {},
      requirements: {},
      
      addProject: (project) => set((state) => ({
        projects: [...state.projects, {
          id: Date.now(),
          createdAt: new Date().toISOString(),
          status: 'active',
          ...project
        }]
      })),
      
      updateProject: (projectId, updates) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === projectId ? { ...p, ...updates } : p
        )
      })),
      
      addTask: (projectId, task) => set((state) => ({
        tasks: {
          ...state.tasks,
          [projectId]: [...(state.tasks[projectId] || []), {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'todo',
            ...task
          }]
        }
      })),
      
      updateTask: (projectId, taskId, updates) => set((state) => ({
        tasks: {
          ...state.tasks,
          [projectId]: state.tasks[projectId].map(t =>
            t.id === taskId ? { ...t, ...updates } : t
          )
        }
      })),
      
      addMilestone: (projectId, milestone) => set((state) => ({
        milestones: {
          ...state.milestones,
          [projectId]: [...(state.milestones[projectId] || []), {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'pending',
            ...milestone
          }]
        }
      })),
      
      updateMilestone: (projectId, milestoneId, updates) => set((state) => ({
        milestones: {
          ...state.milestones,
          [projectId]: state.milestones[projectId].map(m =>
            m.id === milestoneId ? { ...m, ...updates } : m
          )
        }
      })),
      
      addRequirement: (projectId, requirement) => set((state) => ({
        requirements: {
          ...state.requirements,
          [projectId]: [...(state.requirements[projectId] || []), {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'draft',
            ...requirement
          }]
        }
      })),
      
      updateRequirement: (projectId, requirementId, updates) => set((state) => ({
        requirements: {
          ...state.requirements,
          [projectId]: state.requirements[projectId].map(r =>
            r.id === requirementId ? { ...r, ...updates } : r
          )
        }
      })),
      
      // Get items for specific client
      getClientItems: (clientId) => ({
        uploadedFiles: Array.isArray(get().uploadedFiles[clientId]) ? get().uploadedFiles[clientId] : [],
        transformItems: get().transformItems[clientId] || [],
        optimizeItems: get().optimizeItems[clientId] || []
      }),
      
      // Client state
      selectedClient: null,
      setSelectedClient: (client) => set({ selectedClient: client }),
      setActiveSection: (section) => window.dispatchEvent(new CustomEvent('setActiveSection', { detail: section })),
      
      // Modal state
      modals: {
        ekyc: false,
        partner: false,
        settings: false,
        profile: false,
        rfp: false
      },
      
      // RFP state
      rfps: [],
      bids: {},
      rfpNotifications: {},
      adminRfps: [],
      setAdminRfps: (rfps) => set({ adminRfps: rfps }),
      
      // Add notification for RFP status change
      addRfpNotification: (rfpId, message, type = 'info') => set((state) => ({
        rfpNotifications: {
          ...state.rfpNotifications,
          [rfpId]: [...(state.rfpNotifications[rfpId] || []), {
            id: Date.now(),
            message,
            type,
            timestamp: new Date().toISOString()
          }]
        }
      })),
      
      updateAdminRfp: async (rfpId, updates) => set((state) => {
        try {
          // Update in IndexedDB
          rfpDB.update(rfpId, updates).catch(console.error);
          
          // Generate notification message based on status change
          if (updates.status && updates.status !== state.adminRfps.find(r => r.rfpId === rfpId)?.status) {
            const statusMessages = {
              enrichment: 'Your RFP is being reviewed and enriched by our team',
              prototype: 'Solution prototype is being created for your RFP',
              evaluation: 'Your RFP is under evaluation',
              approved: 'Your RFP has been approved',
              rejected: 'Your RFP has been rejected'
            };
            
            if (statusMessages[updates.status]) {
              get().addRfpNotification(
                rfpId, 
                statusMessages[updates.status],
                updates.status === 'rejected' ? 'error' : 'info'
              );
            }
          }
          
          const updatedRfps = state.adminRfps.map(rfp => 
            rfp.rfpId === rfpId ? { 
              ...rfp, 
              ...updates,
              version: (rfp.version || 1) + 1,
              lastModified: new Date().toISOString()
            } : rfp
          );
          
          return {
            adminRfps: updatedRfps,
            rfps: state.rfps.map(rfp =>
              rfp.rfpId === rfpId ? updatedRfps.find(r => r.rfpId === rfpId) : rfp
            )
          };
        } catch (error) {
          console.error('Error updating RFP:', error);
          throw error;
        }
      }),
      
      addAdminRfp: async (rfp) => {
        const newRfp = {
          ...rfp,
          projectType: rfp.projectType || 'Transform',
          requirements: rfp.requirements.map(req => ({
            ...req,
            requirementId: req.requirementId,
            title: req.title,
            area: req.area,
            priority: req.priority,
            impact: req.impact,
            recommendation: req.recommendation
          }))
        };

        

        try {
          // Store in IndexedDB
          await rfpDB.add(newRfp);
          
          // Update state
          set((state) => {
            const updatedAdminRfps = [newRfp, ...(state.adminRfps || [])];
            const updatedRfps = [newRfp, ...(state.rfps || [])];
            
            // Ensure state is properly updated before saving
            localStorage.setItem('jarvis-store', JSON.stringify({
              ...state,
              adminRfps: updatedAdminRfps,
              rfps: updatedRfps
            }));
            
            return {
              adminRfps: updatedAdminRfps,
              rfps: updatedRfps
            };
          });


          return newRfp;
        } catch (error) {
          console.error('Error adding RFP:', error);
          throw error;
        }
      },

      // Clear store
      clearStore: () => set({
        uploadedFiles: {},
        transformItems: {},
        projects: [],
        tasks: {},
        milestones: {},
        requirements: {},
        clientSubscriptions: {},
        selectedClient: null,
        showProfile: false,
        modals: {
          ekyc: false,
          partner: false,
          profile: false
        },
        demoMode: false
      }, false, () => {
        // Clear IndexedDB
        indexedDB.deleteDatabase('rfp-store');
        // Clear localStorage
        localStorage.removeItem('jarvis-store');
      }),

      toggleModal: (modalName) =>
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: !state.modals[modalName]
          }
        })),
      
      // Profile state  
      showProfile: false,
      setShowProfile: (show) => set({ showProfile: show })
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
        adminRfps: state.adminRfps || [],
        rfps: state.rfps || []
      })
    }
  )
);

export default useStore;