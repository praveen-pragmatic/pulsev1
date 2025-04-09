import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext'; 
import useStore from '../store/store';
import { FiUpload, FiFile, FiFolder, FiCheck, FiAlertTriangle, FiClock, FiDatabase, FiSettings, FiStar, FiX, FiZap, FiCloud } from 'react-icons/fi';

const dataSources = [
  {
    category: 'Alt.Data',
    sources: [
      { name: 'StratRoom', icon: '📊', description: 'Strategic planning and multi-governance data platform' },
      { name: '10Decoders AI', icon: '🧬', description: 'Clinical research and HIPAA compliance AI platform' },
      { name: 'Thurro', icon: '📊', description: 'Alternative data platform for financial markets' },
      { name: 'Auto Analytics', icon: '🚗', description: 'Vehicle registration and sales data' },
      { name: 'Banking Flows', icon: '🏦', description: 'Banking transactions and payment flows' }
    ]
  },
  {
    category: 'CRM',
    sources: [
      { name: 'Salesforce', icon: '💼', description: 'Customer relationship management data' },
      { name: 'HubSpot', icon: '🎯', description: 'Marketing and sales platform' },
      { name: 'Zoho', icon: '📊', description: 'Business and customer data' }
    ]
  },
  {
    category: 'Finance',
    sources: [
      { name: 'QuickBooks', icon: '💰', description: 'Accounting and financial data' },
      { name: 'Xero', icon: '📈', description: 'Business accounting platform' },
      { name: 'SAP', icon: '🏢', description: 'Enterprise resource planning' }
    ]
  },
  {
    category: 'ERP',
    sources: [
      { name: 'Oracle', icon: '🔄', description: 'Enterprise business processes' },
      { name: 'Microsoft Dynamics', icon: '⚡', description: 'Business applications platform' },
      { name: 'NetSuite', icon: '🌐', description: 'Cloud business management' }
    ]
  },
  {
    category: 'Back Office',
    sources: [
      { name: 'DocuSign', icon: '📝', description: 'Document management' },
      { name: 'Workday', icon: '📅', description: 'HR and finance operations' },
      { name: 'ServiceNow', icon: '🔧', description: 'IT service management' }
    ]
  },
  {
    category: 'HRMS',
    sources: [
      { name: 'BambooHR', icon: '👥', description: 'HR management system' },
      { name: 'Workday HCM', icon: '👔', description: 'Human capital management' },
      { name: 'ADP', icon: '💼', description: 'Payroll and HR services' }
    ]
  }
];

const reviews = [
  {
    name: "David Wilson",
    company: "Strategic Solutions Ltd",
    rating: 5,
    comment: "StratRoom's API integration has transformed our strategic planning process. The data synchronization is seamless.",
    date: "2025-03-20"
  },
  {
    name: "Sarah Johnson",
    company: "TechCorp Inc.",
    rating: 5,
    comment: "Seamless integration with our CRM. The automated data collection saved us hours of manual work.",
    date: "2025-03-15"
  },
  {
    name: "Michael Chen",
    company: "Global Finance Ltd",
    rating: 4,
    comment: "Great tool for financial data analysis. The scheduling features are particularly useful.",
    date: "2025-03-10"
  },
  {
    name: "Emma Davis",
    company: "HR Solutions",
    rating: 5,
    comment: "Perfect for our HRMS integration needs. The configuration options are comprehensive.",
    date: "2025-03-05"
  }
];

const DataIngestion = () => {
  const { currentUser } = useAuth();
  const { uploadedFiles = {}, addUploadedFile } = useStore();
  const clientFiles = uploadedFiles[currentUser?.clientId] || [];
  const [uploading, setUploading] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedClient, setSelectedClient] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  
  const handleUpload = () => {
    // Trigger the hidden file input
    document.getElementById('file-upload').click();
  };
  
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      addUploadedFile(file, currentUser?.clientId);
    });
  };

  // Filter Freemium clients from Dashboard data
  const freemiumClients = [
    { id: 3, name: 'Global Investments Ltd' },
    { id: 6, name: 'Future Finance Tech' },
    { id: 10, name: 'Credit Union Central' },
    { id: 13, name: 'Fintech Innovations Hub' },
    { id: 18, name: 'Pension Fund Services' },
    { id: 21, name: 'Digital Payments Plus' },
    { id: 26, name: 'NextGen Banking Solutions' }
  ];

  const [connectedSources, setConnectedSources] = useState([
    { id: 1, name: 'SharePoint - Finance', status: 'active', lastSync: '10 minutes ago' },
    { id: 2, name: 'Google Drive - Executive', status: 'active', lastSync: '1 hour ago' },
    { id: 3, name: 'Salesforce', status: 'inactive', lastSync: 'Never' }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete':
        return <FiCheck className="text-green-500" />;
      case 'processing':
        return <div className="animate-spin h-4 w-4 border-2 border-primary-500 rounded-full border-t-transparent"></div>;
      case 'error':
        return <FiAlertTriangle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <div className="bg-red-100 text-red-800 p-2 rounded">PDF</div>;
      case 'excel':
        return <div className="bg-green-100 text-green-800 p-2 rounded">XLS</div>;
      case 'csv':
        return <div className="bg-blue-100 text-blue-800 p-2 rounded">CSV</div>;
      case 'archive':
        return <div className="bg-yellow-100 text-yellow-800 p-2 rounded">ZIP</div>;
      default:
        return <div className="bg-gray-100 text-gray-800 p-2 rounded">FILE</div>;
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar key={index} className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Data Ingestion</h2>
            <p className="text-gray-600">Upload or connect to data sources to begin the diagnostic process.</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
              <FiZap className="mr-2" />
              <span>Jarvis Mode: Managed</span>
            </div>
          </div>
        </div>
        
        {currentUser.role !== 'client' && (
          <div className="mb-6">
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
              Select Freemium Client
            </label>
            <select
              id="client"
              className="input-field"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="">Select a client</option>
              {freemiumClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            <FiUpload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Drag and drop files here or click to browse
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            <button 
              onClick={handleUpload}
              disabled={uploading}
              className="btn btn-primary"
            >
              {uploading ? 'Uploading...' : 'Select Files'}
            </button>
            <button
              onClick={() => window.open('https://dataingestagent-s3.lovable.app/', '_blank')}
              className="btn btn-primary flex items-center"
            >
              <FiCloud className="mr-2" /> AWS S3 Secure Data Store
            </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supports PDF, Excel, CSV, and ZIP files up to 100MB
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Data Sources</h3>
            <div className="space-y-4">
              {connectedSources.map(source => (
                <div key={source.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <FiFolder className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{source.name}</p>
                      <p className="text-xs text-gray-500">Last sync: {source.lastSync}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      source.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {source.status}
                    </span>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => {
                  setActiveTab('integrations');
                  document.getElementById('integrations').scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-secondary w-full mt-4"
              >
                Connect New Source
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Uploaded Files</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientFiles.map(file => (
                    <tr key={file.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            <div className="text-sm text-gray-500">{file.type.toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon('complete')}
                          <span className="ml-2 text-sm text-gray-500 capitalize">Complete</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6" id="integrations">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Data Source Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSources.map((category) => (
            <div key={category.category} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">{category.category}</h3>
              <div className="space-y-3">
                {category.sources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{source.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{source.name}</p>
                        <p className="text-sm text-gray-500">{source.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSource(source);
                        setShowConfigModal(true);
                      }}
                      className="btn btn-secondary text-sm"
                    >
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showConfigModal && selectedSource && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Configure {selectedSource.name} Integration</h3>
              <button onClick={() => setShowConfigModal(false)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close</span>
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">API Credentials</label>
                <input type="text" placeholder="API Key" className="input-field mt-1" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Refresh Interval</label>
                <select className="input-field mt-1">
                  <option>Every 15 minutes</option>
                  <option>Every hour</option>
                  <option>Every 6 hours</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Cron Schedule</label>
                <input type="text" placeholder="*/15 * * * *" className="input-field mt-1" />
                <p className="text-sm text-gray-500 mt-1">Custom cron expression for advanced scheduling</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Fields</label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Basic Information</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Transaction History</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">User Analytics</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setShowConfigModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button className="btn btn-primary">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataIngestion;