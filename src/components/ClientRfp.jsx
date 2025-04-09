import React, { useState, useEffect } from 'react';
import { FiFileText, FiDownload, FiSend, FiClock, FiCheckCircle } from 'react-icons/fi';
import useStore from '../store/store';
import { useAuth } from '../auth/AuthContext';
import { downloadMarkdown } from '../utils/downloadMarkdown';
import { mockUsers } from '../auth/mockUsers';
import RfpManagement from './RfpManagement';
import { RfpService } from '../services/db/RfpService';

const rfpService = RfpService.getInstance();

const STORAGE_KEY = 'jarvis-store';

const ClientRfp = () => {
  const { currentUser } = useAuth();
  const adminRfps = useStore((state) => {
    let rfps = state.adminRfps || [];
    // Filter RFPs for current client and sort by date
    if (currentUser.role === 'client') {
      rfps = rfps.filter(rfp => 
        rfp.clientId === currentUser.clientId || 
        rfp.clientName === currentUser.companyName
      );
    } else {
      rfps = rfps.filter(rfp => rfp.visibleToAdmin);
    }
    return [...rfps].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastChecked, setLastChecked] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const rfpNotifications = useStore((state) => state.rfpNotifications);
  const [selectedClient, setSelectedClient] = useState('all');
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [showConfirmSend, setShowConfirmSend] = useState(false);
  const { setAdminRfps, setActiveSection, updateAdminRfp } = useStore();

  // Get unique client list from RFPs
  const clients = React.useMemo(() => {
    const uniqueClients = [...new Set(adminRfps.map(rfp => rfp.clientName))];
    return ['all', ...uniqueClients].sort();
  }, [adminRfps]);
  
  // Filter RFPs based on selected client
  const filteredRfps = React.useMemo(() => {
    if (selectedClient === 'all') return adminRfps;
    return adminRfps.filter(rfp => rfp.clientName === selectedClient);
  }, [adminRfps, selectedClient]);

  // Load RFPs when component mounts
  useEffect(() => {
    loadRfpsFromDB();
  }, []);

  const loadRfpsFromDB = async () => {
    setIsLoading(true);
    try {
      let rfps = [];
      if (currentUser.role === 'client') {
        rfps = await rfpService.getByClient(currentUser.clientId);
      } else {
        rfps = await rfpService.getAll();
      }
      
      if (rfps?.length) {
        setAdminRfps(rfps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
      
      setLastChecked(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error loading RFPs:', error);
      setErrorMessage('Error loading RFPs from database');
      setShowError(true);
      
      // Fallback to localStorage if DB fails
      loadLatestRfps();
    } finally {
      setIsLoading(false);
    }
  };

  const loadLatestRfps = () => {
    setIsLoading(true);
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data.state?.adminRfps?.length) {
          const newRfps = data.state.adminRfps.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          );

          setAdminRfps(newRfps);
          console.log('Loaded RFPs:', newRfps.length);
        }
      }
      setLastChecked(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error loading RFPs:', error);
      setErrorMessage('Error loading RFPs');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (rfp) => {
    downloadMarkdown(rfp.content, `${rfp.title.toLowerCase().replace(/\s+/g, '-')}.md`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center">
            <FiClock className="mr-1" /> New
          </span>
        );
      case 'pending_review':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center">
            <FiClock className="mr-1" /> Pending Review
          </span>
        );
      case 'assigned':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center">
            Partners Assigned
          </span>
        );
      case 'sent':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center">
            <FiCheckCircle className="mr-1" /> Sent to Partners
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Status Banner */}
        {selectedRfp && rfpNotifications[selectedRfp.rfpId]?.length > 0 && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-900">RFP Status Updates</h4>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                {showNotifications ? 'Hide History' : 'Show History'}
              </button>
            </div>
            {showNotifications ? (
              <div className="space-y-2">
                {rfpNotifications[selectedRfp.rfpId].map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-2 rounded-lg text-sm ${
                      notification.type === 'error' ? 'bg-red-50 text-red-800' :
                      notification.type === 'success' ? 'bg-green-50 text-green-800' :
                      'bg-blue-50 text-blue-800'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{notification.message}</span>
                      <span className="text-xs">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-2 rounded-lg text-sm ${
                rfpNotifications[selectedRfp.rfpId].slice(-1)[0].type === 'error' ? 'bg-red-50 text-red-800' :
                rfpNotifications[selectedRfp.rfpId].slice(-1)[0].type === 'success' ? 'bg-green-50 text-green-800' :
                'bg-blue-50 text-blue-800'
              }`}>
                {rfpNotifications[selectedRfp.rfpId].slice(-1)[0].message}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentUser.role === 'admin' ? 'Client RFPs' : 'Your RFPs'}
            </h2>
            <p className="text-gray-600">
              {currentUser.role === 'admin' 
                ? 'Review all RFPs submitted by clients' 
                : 'Track and manage your RFPs sent to Pragmatic'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="input-field text-sm"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              {clients.map(clientName => (
                <option key={clientName} value={clientName}>
                  {clientName === 'all' ? 'All Clients' : clientName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading RFPs...</p>
            </div>
          ) : filteredRfps.length > 0 ? (
            filteredRfps.map((rfp) => (
              <div key={rfp.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{rfp.title}</h3>
                    <p className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded mt-2">
                      {rfp.rfpId}
                    </p>
                  </div>
                  {getStatusBadge(rfp.status)}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <p className="font-medium text-gray-800">{rfp.projectType}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiClock className="text-gray-400" />
                    <span>Submitted {new Date(rfp.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-600">Requirements</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-semibold text-gray-900">{rfp.requirements?.length || 0}</p>
                        <div className="flex items-center space-x-1">
                          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                            {rfp.requirements?.filter(r => r.priority === 'high').length || 0} High
                          </span>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            {rfp.requirements?.filter(r => r.priority === 'medium').length || 0} Med
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-600">Status</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(rfp.status)}
                          {rfp.stageHistory && (
                            <span className="text-xs text-gray-500">
                              {new Date(rfp.stageHistory[rfp.stageHistory.length - 1].timestamp).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleDownload(rfp)}
                    className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
                  >
                    <FiDownload className="mr-1" /> Download
                  </button>
                  <button
                    onClick={() => setSelectedRfp(rfp)}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No RFPs Submitted</h3>
              {currentUser.role === 'client' ? (
                <div className="mt-1 text-sm text-gray-500">
                  <p>You haven't submitted any RFPs yet.</p>
                  <p className="mt-2">
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('setActiveSection', { detail: 'transform' }))}
                      className="text-primary-600 hover:text-primary-800 font-medium"
                    >
                      Go to Transform section
                    </button>
                    {' '}to create and submit your requirements.
                  </p>
                </div>
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  No RFPs have been submitted by any clients yet.
                </p>
              )}
            </div>
          )}

        </div>
      </div>

      {/* RFP Details Modal */}
      {selectedRfp && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedRfp.title}</h3>
                <p className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded mt-2 inline-block">
                  {selectedRfp.rfpId}
                </p>
              </div>
              <button 
                onClick={() => setSelectedRfp(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Requirements */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Requirements</h4>
                <div className="space-y-4">
                  {selectedRfp.requirements?.map((req) => (
                    <div key={req.id} className="bg-white p-4 rounded-lg shadow-sm">
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
                      <div className="mt-4 space-y-3">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientRfp;