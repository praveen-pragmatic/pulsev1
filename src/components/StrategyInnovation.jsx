import React, { useState, useMemo, useEffect } from 'react';
import { FiFileText, FiDownload, FiSend, FiClock, FiCheckCircle, FiUsers } from 'react-icons/fi';
import useStore from '../store/store';
import { downloadMarkdown } from '../utils/downloadMarkdown';
import { useAuth } from '../auth/AuthContext';
import { mockUsers } from '../auth/mockUsers';

const StrategyInnovation = () => {
  const { currentUser } = useAuth();
  const [selectedClient, setSelectedClient] = useState('all');
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const adminRfps = useStore((state) => {
    const rfps = state.adminRfps || [];
    // Show all RFPs that are pending review or new
    return rfps.filter(rfp => rfp.status === 'pending_review' || rfp.status === 'new');
  });
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [showConfirmSend, setShowConfirmSend] = useState(false);
  const assignRfpToPartner = useStore((state) => state.assignRfpToPartner);
  const updateAdminRfp = useStore((state) => state.updateAdminRfp);

  
  // Get unique client names from RFPs
  const clients = useMemo(() => {
    const uniqueClients = [...new Set(adminRfps.map(rfp => rfp.clientName))];
    return ['all', ...uniqueClients];
  }, [adminRfps]);
  
  // Filter RFPs based on selected client
  const filteredRfps = useMemo(() => {
    if (selectedClient === 'all') return adminRfps;
    return adminRfps.filter(rfp => rfp.clientName === selectedClient);
  }, [adminRfps, selectedClient]);

  const handleDownload = (rfp) => {
    downloadMarkdown(rfp.content, `${rfp.title.toLowerCase().replace(/\s+/g, '-')}.md`);
  };

  const handleAssignPartners = () => {
    // Update the RFP with new partner assignments
    updateAdminRfp(selectedRfp.rfpId, {
      assignedPartners: selectedPartners,
      status: 'assigned'
    });
    
    // Assign RFP to each selected partner
    selectedPartners.forEach(partnerId => assignRfpToPartner(selectedRfp.rfpId, partnerId));
    
    setShowConfirmSend(true);
  };

  const handleSendToPartners = () => {
    // Update RFP status to sent
    updateAdminRfp(selectedRfp.rfpId, {
      visibleToAdmin: true,
      status: 'sent',
      sentAt: new Date().toISOString()
    });
    
    setShowConfirmSend(false);
    setShowPartnerModal(false);
    setSelectedRfp(null);
    setSelectedPartners([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Strategy & Innovation</h2>
            <p className="text-gray-600">Review and manage transformation requirements</p>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              {clients.length > 1 && (
                <select
                  className="input-field text-sm"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  {clients.map(clientName => (
                    <option key={clientName} value={clientName}>
                      {clientName === 'all' ? 'All Pending RFPs' : clientName}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {filteredRfps.length} {filteredRfps.length === 1 ? 'RFP' : 'RFPs'} pending review
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRfps.map((rfp) => (
            <div key={rfp.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{rfp.title}</h3>
                  <p className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded mt-1">
                    {rfp.rfpId}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      Client: {rfp.clientName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Received: {new Date(rfp.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {rfp.status === 'pending_review' ? 'Pending Review' : rfp.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDownload(rfp)}
                    className="btn btn-secondary text-sm"
                  >
                    <FiDownload className="mr-2" /> Download
                  </button>
                  {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      setSelectedRfp(rfp);
                      setSelectedPartners(rfp.assignedPartners || []);
                      setShowPartnerModal(true);
                    }}
                    className="btn btn-primary text-sm"
                  >
                    <FiUsers className="mr-2" />
                    {rfp.status === 'sent' ? 'View Partners' :
                     rfp.assignedPartners?.length ? 'Update Partners' : 
                     'Assign Partners'}
                  </button>
                  )}
                  {rfp.status === 'assigned' && (
                    <button
                      onClick={() => {
                        setSelectedRfp(rfp);
                        setShowConfirmSend(true);
                      }}
                      className="btn btn-primary text-sm"
                    >
                      <FiSend className="mr-2" /> Send to Partners
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const url = `https://pragmabizide.netlify.app/?intent=mvp&data=${encodeURIComponent(JSON.stringify({
                        title: rfp.title,
                        requirements: rfp.requirements,
                        phases: rfp.phases
                      }))}`;
                      window.open(url, '_blank');
                    }}
                    className="btn btn-primary text-sm"
                  >
                    Generate MVP
                  </button>
                </div>
              </div>

              {rfp.requirements && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements Overview</h4>
                  <div className="space-y-4">
                    {rfp.requirements.map((req) => (
                      <div key={req.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                                {req.requirementId}
                              </span>
                              <h5 className="font-medium text-gray-900">{req.title}</h5>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Area: {req.area}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            req.priority === 'high' ? 'bg-red-100 text-red-800' :
                            req.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {req.priority.charAt(0).toUpperCase() + req.priority.slice(1)} Priority
                          </span>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div>
                            <h6 className="text-xs font-medium text-gray-700 uppercase">Impact</h6>
                            <p className="text-sm text-gray-600">{req.impact}</p>
                          </div>
                          <div>
                            <h6 className="text-xs font-medium text-gray-700 uppercase">Recommendation</h6>
                            <p className="text-sm text-gray-600">{req.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredRfps.length === 0 && (
            <div className="text-center py-8">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No RFPs Available</h3>
              <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                {currentUser.role === 'admin' 
                  ? 'No RFPs are currently pending review. New RFPs from clients will appear here.'
                  : 'No RFPs have been submitted yet. RFPs sent by clients will appear here for review.'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Partner Assignment Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Partner Selection</h3>
                <p className="text-sm text-gray-600 mt-1">Select partners to review and bid on this RFP</p>
              </div>
              <button onClick={() => setShowPartnerModal(false)} className="text-gray-400 hover:text-gray-500">×</button>
            </div>
            
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">RFP Details</h4>
              <p className="text-sm text-gray-600">{selectedRfp.title}</p>
              <p className="text-sm font-mono text-primary-600">{selectedRfp.rfpId}</p>
              <p className="text-sm text-gray-500 mt-2">Client: {selectedRfp.clientName}</p>
            </div>
            
            <div className="space-y-4 flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-700">Available Partners</h4>
                <span className="text-sm text-gray-500">
                  {selectedPartners.length} selected
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 overflow-y-auto p-2" style={{ maxHeight: 'calc(100vh - 400px)' }}>
                {mockUsers.filter(user => user.role === 'partner').map((partner) => (
                  <label 
                    key={partner.id} 
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPartners.includes(partner.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedPartners.includes(partner.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPartners([...selectedPartners, partner.id]);
                        } else {
                          setSelectedPartners(selectedPartners.filter(id => id !== partner.id));
                        }
                      }}
                      className="h-4 w-4 text-primary-600 rounded border-gray-300"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {partner.name} • {partner.companyDetails.location}
                        {selectedPartners.includes(partner.id) && (
                          <span className="ml-2 text-xs text-green-600">(Selected)</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Team Size: {partner.companyDetails.teamSize} • Since {partner.companyDetails.established}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {partner.companyDetails.expertise.map((exp, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3 pt-4 border-t">
              <button onClick={() => setShowPartnerModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button 
                onClick={handleAssignPartners} 
                className="btn btn-primary"
                disabled={selectedPartners.length === 0}
              >
                {selectedPartners.length > 0 ? `Assign ${selectedPartners.length} Partner${selectedPartners.length > 1 ? 's' : ''} & Continue` : 'Select Partners'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Send Confirmation Modal */}
      {showConfirmSend && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <FiSend className="mx-auto h-12 w-12 text-primary-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Send RFP to Selected Partners?</h3>
              <p className="mt-2 text-sm text-gray-600">
                This will notify {selectedPartners.length} partner{selectedPartners.length !== 1 ? 's' : ''} about the new RFP.
                They will be able to review the requirements and submit their bids.
              </p>
              
              <div className="mt-6 flex justify-center space-x-3">
                <button 
                  onClick={() => setShowConfirmSend(false)} 
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendToPartners}
                  className="btn btn-primary"
                >
                  Send RFP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyInnovation;