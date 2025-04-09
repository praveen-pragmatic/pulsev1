import React, { useState } from 'react';
import { FiUsers, FiCalendar, FiFileText, FiX, FiCheck } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import { mockUsers } from '../auth/mockUsers';
import useStore from '../store/store';
import { RfpService } from '../services/db/RfpService';

const rfpService = RfpService.getInstance();

const RFP_STAGES = {
  new: {
    name: 'New RFPs',
    description: 'Newly submitted RFPs pending initial review',
    color: 'blue',
    actions: [
      { id: 'approve', label: 'Start Review', primary: true, nextStage: 'enrichment' },
      { id: 'reject', label: 'Reject', primary: false, nextStage: 'rejected' }
    ]
  },
  enrichment: {
    name: 'Enrichment',
    description: 'Enrich RFP with additional details and requirements',
    color: 'indigo',
    actions: [
      { id: 'approve', label: 'Requirements Complete', primary: true, nextStage: 'approved' },
      { id: 'request_info', label: 'Request Changes', primary: false, nextStage: 'changes_requested' }
    ]
  },
  prototype: {
    name: 'Prototype',
    description: 'Create and validate solution prototype',
    color: 'cyan',
    actions: [
      { id: 'approve_prototype', label: 'Approve Prototype', primary: true, nextStage: 'evaluation' },
      { id: 'revise_prototype', label: 'Request Revision', primary: false }
    ]
  },
  evaluation: {
    name: 'Evaluation',
    description: 'Evaluate requirements and create selection matrix',
    color: 'purple',
    actions: [
      { id: 'complete_evaluation', label: 'Complete Evaluation', primary: true, nextStage: 'approved' },
      { id: 'request_changes', label: 'Request Changes', primary: false }
    ]
  },
  approved: {
    name: 'Approved',
    description: 'RFP requirements approved',
    color: 'green',
    actions: [
      { id: 'view_details', label: 'View Details', primary: true }
    ]
  }
};

const RfpManagement = () => {
  const { currentUser } = useAuth();
  const adminRfps = useStore((state) => state.adminRfps || []);
  const [selectedClient, setSelectedClient] = useState('all');
  const updateAdminRfp = useStore((state) => state.updateAdminRfp);
  const setAdminRfps = useStore((state) => state.setAdminRfps);
  const addRfpNotification = useStore((state) => state.addRfpNotification);
  
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [currentStage, setCurrentStage] = useState('pending_review');
  
  const [stageTransitions, setStageTransitions] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  
  // Get unique client list from RFPs
  const clients = React.useMemo(() => {
    const uniqueClients = [...new Set(adminRfps.map(rfp => rfp.clientName))];
    return ['all', ...uniqueClients].sort();
  }, [adminRfps]);

  // Get RFPs for current stage
  const stageRfps = React.useMemo(() => {
    return adminRfps.filter(rfp => {
      const matchesStage = rfp.status === currentStage;
      const matchesClient = selectedClient === 'all' || rfp.clientName === selectedClient;
      return matchesStage && matchesClient;
    });
  }, [adminRfps, currentStage, selectedClient]);

  // Get counts for each stage
  const stageCounts = React.useMemo(() => {
    return Object.keys(RFP_STAGES).reduce((acc, stage) => {
      acc[stage] = adminRfps.filter(rfp => rfp.status === stage).length;
      return acc;
    }, {});
  }, [adminRfps]);

  const handleCheckNewRfps = async () => {
    setIsChecking(true);
    try {
      const storedData = localStorage.getItem('jarvis-store');
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data.state?.adminRfps) {
          const newRfps = data.state.adminRfps.map(rfp => ({
            ...rfp,
            status: rfp.status === 'new' ? 'pending_review' : rfp.status
          }));

          setAdminRfps(newRfps);
        }
      }
      setLastChecked(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error checking for new RFPs:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleStageAction = async (rfp, action) => {
    const now = new Date().toISOString();
    let updates = {};
    let nextStage = '';
    let notificationType = 'info';
    let notificationMessage = '';
    
    // Add review checklist
    const reviewChecklist = {
      completeness: false,
      clarity: false,
      feasibility: false,
      compliance: false,
      budget: false,
      timeline: false
    };

    switch(action) {
      case 'approve':
        nextStage = 'partner_selection';
        updates = {
          status: nextStage,
          reviewChecklist,
          reviewNotes: '',
          notificationType: 'info',
          notificationMessage: 'Your RFP has been approved for enrichment',
          stageHistory: [
            ...(rfp.stageHistory || []),
            {
              from: rfp.status,
              to: nextStage,
              timestamp: now,
              note: 'Requirements review completed, ready for partner selection'
            }
          ]
        };
        break;

      case 'approve_prototype':
        nextStage = 'evaluation';
        updates = {
          status: nextStage,
          evaluationMatrix: {
            technicalFit: 0,
            costEffectiveness: 0,
            timeline: 0,
            riskProfile: 0,
            vendorCapability: 0
          },
          notificationType: 'info',
          notificationMessage: 'Your RFP prototype has been approved and is now under evaluation',
          stageHistory: [
            ...(rfp.stageHistory || []),
            {
              from: 'prototype',
              to: nextStage,
              timestamp: now,
              note: 'Prototype approved, moving to evaluation'
            }
          ]
        };
        break;

      case 'reject':
        nextStage = 'rejected';
        notificationType = 'error';
        notificationMessage = 'Your RFP has been rejected. Our team will contact you with more details.';
        break;
    }

    if (Object.keys(updates).length > 0) {
      // Add notification
      if (notificationMessage) {
        addRfpNotification(rfp.rfpId, notificationMessage, notificationType);
      }
      
      updateAdminRfp(rfp.rfpId, updates);
      // Update stage transitions
      setStageTransitions(prev => ({
        ...prev,
        [rfp.rfpId]: nextStage
      }));
      // Update current stage if this was the last RFP in current stage
      const remainingInStage = adminRfps.filter(r => 
        r.status === currentStage && r.rfpId !== rfp.rfpId
      ).length;
      if (remainingInStage === 0) {
        setCurrentStage(nextStage);
      }
    }
  };

  const getStageActions = (rfp) => {
    const currentStageInfo = RFP_STAGES[rfp.status];
    if (!currentStageInfo || !currentStageInfo.actions) {
      console.warn(`No actions found for stage: ${rfp.status}`);
      return [];
    }
    return currentStageInfo.actions;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        {/* RFP Details Modal */}
        {selectedRfp && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedRfp.title}</h3>
                  <p className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded mt-2">
                    {selectedRfp.rfpId}
                  </p>
                </div>
                <button onClick={() => setSelectedRfp(null)} className="text-gray-500 hover:text-gray-700">×</button>
              </div>

              <div className="space-y-6">
                {/* Review Checklist */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Review Checklist</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedRfp.reviewChecklist || {}).map(([key, checked]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const updatedChecklist = {
                              ...selectedRfp.reviewChecklist,
                              [key]: e.target.checked
                            };
                            updateAdminRfp(selectedRfp.rfpId, { reviewChecklist: updatedChecklist });
                          }}
                          className="rounded border-gray-300 text-primary-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Review Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                  <textarea
                    value={selectedRfp.reviewNotes || ''}
                    onChange={(e) => updateAdminRfp(selectedRfp.rfpId, { reviewNotes: e.target.value })}
                    className="input-field"
                    rows="4"
                    placeholder="Add review notes..."
                  ></textarea>
                </div>

                {/* Evaluation Matrix */}
                {selectedRfp.status === 'evaluation' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Evaluation Matrix</h4>
                    <div className="space-y-4">
                      {Object.entries(selectedRfp.evaluationMatrix || {}).map(([criterion, score]) => (
                        <div key={criterion}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {criterion.split(/(?=[A-Z])/).join(' ')}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            value={score}
                            onChange={(e) => {
                              const updatedMatrix = {
                                ...selectedRfp.evaluationMatrix,
                                [criterion]: parseInt(e.target.value)
                              };
                              updateAdminRfp(selectedRfp.rfpId, { evaluationMatrix: updatedMatrix });
                            }}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>0</span>
                            <span>{score}</span>
                            <span>10</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">RFP Management</h2>
            <p className="text-gray-600">Review and process RFPs through stages</p>
            <div className="mt-2 grid grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800">New RFPs</p>
                <p className="text-2xl font-bold text-blue-900">{stageCounts.new || 0}</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-indigo-800">In Review</p>
                <p className="text-2xl font-bold text-indigo-900">{stageCounts.enrichment || 0}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-green-800">In Bidding</p>
                <p className="text-2xl font-bold text-green-900">{stageCounts.bidding || 0}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-800">In Evaluation</p>
                <p className="text-2xl font-bold text-orange-900">{stageCounts.evaluation || 0}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="input-field text-sm min-w-[200px] whitespace-normal"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              {clients.map(clientName => (
                <option key={clientName} value={clientName} className="whitespace-normal py-2">
                  {clientName === 'all' ? 'All Clients' : clientName}
                </option>
              ))}
            </select>
            <button 
              onClick={handleCheckNewRfps}
              disabled={isChecking}
              className={`btn ${isChecking ? 'btn-secondary' : 'btn-primary'} flex items-center`}
            >
              {isChecking ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                  Checking...
                </>
              ) : (
                <>
                  <FiFileText className="mr-2" />
                  Check for new RFP
                </>
              )}
            </button>
            {lastChecked && (
              <span className="text-sm text-gray-500">
                Last checked: {lastChecked}
              </span>
            )}
          </div>
        </div>

        {/* Stage Navigation */}
        <div className="mb-8 mt-8">
          <div className="flex justify-between items-center relative">
            {Object.entries(RFP_STAGES).map(([stage, info], index) => (
              <div
                key={stage}
                onClick={() => setCurrentStage(stage)}
                className={`flex flex-col items-center relative z-10 cursor-pointer ${
                  currentStage === stage ? `text-${info.color}-600` : 'text-gray-400'
                } transition-colors`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStage === stage ? `bg-${info.color}-100` : 'bg-gray-100'
                }`}>
                  {index + 1}
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm font-medium block">{info.name}</span>
                  <p className="text-xs text-gray-500 mt-1 max-w-[120px]">{info.description}</p>
                  <div className="mt-1 text-xs font-medium">
                    {stageCounts[stage] || 0} RFPs
                  </div>
                </div>
              </div>
            ))}
            <div 
              className="absolute top-5 left-0 h-0.5 bg-gray-200 w-full -z-10"
              style={{
                background: `linear-gradient(to right, #10B981 ${((Object.keys(RFP_STAGES).indexOf(currentStage)) / (Object.keys(RFP_STAGES).length - 1)) * 100}%, #E5E7EB ${((Object.keys(RFP_STAGES).indexOf(currentStage)) / (Object.keys(RFP_STAGES).length - 1)) * 100}%)`
              }}
            />
          </div>
        </div>

        {/* RFP List by Stage */}
        <div className="space-y-4 mb-8">
          {stageRfps.map((rfp) => (
            <div key={rfp.id} className="border rounded-lg p-6 hover:border-primary-200 transition-colors">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{rfp.title}</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm text-gray-600">{rfp.clientName}</p>
                      <p className="text-xs text-gray-500">
                        Submitted: {new Date(rfp.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Requirements: {rfp.requirements?.length || 0} • 
                        High Priority: {rfp.requirements?.filter(r => r.priority === 'high').length || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {getStageActions(rfp).map(({ id, label, primary }) => (
                      <button
                        key={id}
                        onClick={() => handleStageAction(rfp, id)}
                        className={`btn ${primary ? 'btn-primary' : 'btn-secondary'} text-sm`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stage-specific content */}
                {currentStage === 'enrichment' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements Overview</h4>
                    <div className="space-y-2">
                      {rfp.requirements?.map((req, idx) => (
                        <div key={idx} className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium">{req.title}</p>
                            <p className="text-xs text-gray-600">{req.area}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            req.priority === 'high' ? 'bg-red-100 text-red-800' :
                            req.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {req.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RfpManagement;